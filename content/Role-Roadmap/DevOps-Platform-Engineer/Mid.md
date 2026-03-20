
# DevOps / Platform Engineer – Mid Concept Reference

This document provides in-depth explanations of the core concepts covered at the Mid level. Use it alongside the resources in the learning path to deepen your technical knowledge before moving on to the Senior level.

---

## 1. YAML CI/CD Pipelines – Structure, Jobs and Steps

Modern CI/CD platforms commonly define pipelines in YAML files stored alongside application code. The exact filename varies by platform — for example `.github/workflows/ci.yml`, `.gitlab-ci.yml`, or another repository-local pipeline file. Regardless of platform, the core concepts are similar: a pipeline is triggered by repository events, contains one or more jobs, and each job contains a sequence of steps. Some platforms also group jobs into higher-level stages for approval or environment flow.

Here is a minimal platform-neutral example showing the hierarchy:

```yaml
on:
  push:
    branches:
      - main

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - run: dotnet build
      - run: dotnet test --no-build

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - run: echo "Deploying to staging"
```

The exact keywords vary by platform, but the same ideas appear everywhere: one block defines what events start the pipeline, one defines where jobs run, and dependency keys control sequencing.

**Why it matters:**

YAML pipelines are the primary mechanism for automating builds, tests, and deployments in modern delivery platforms. Being able to read, write, debug, and refactor pipeline definitions is a core daily skill. Understanding the structural hierarchy prevents common mistakes around variable scoping, parallelism, and environment targeting.

**Key things to understand:**

- The hierarchy is typically: pipeline > stage (optional) > job > step. Each level can define its own variables and conditions.
- Dependency keys such as `needs` or `dependsOn` control sequencing between stages and jobs.
- Templates allow you to extract reusable stage, job, or step definitions into separate files and reference them with parameters.
- Shared variables and secret stores let you inject runtime configuration without hardcoding values in the pipeline definition.
- Environments represent deployment targets (such as staging or production) and often support approvals, protection rules, and deployment history.
- Hosted runners are ephemeral and reset between runs; self-hosted runners persist state between runs.

**Common pitfalls:**

- Hardcoding environment-specific values instead of using variables or parameters.
- Not using templates, leading to duplicated pipeline code across repositories.
- Storing secrets as plain-text pipeline variables instead of linking to a secret store or cloud vault.
- Forgetting that jobs in the same stage share no file system state unless artifacts are explicitly published and downloaded.

---

## 2. Azure Cloud Fundamentals – Compute, Storage, Networking and IAM

Azure is Microsoft's public cloud platform. Its core building blocks are compute (virtual machines, App Service, Azure Kubernetes Service, Azure Functions), storage (Blob Storage, Azure Files, managed disks), networking (Virtual Networks, subnets, Network Security Groups, Azure Load Balancer, DNS), and identity and access management (Microsoft Entra ID (formerly Azure Active Directory), role-based access control). Understanding these primitives is prerequisite knowledge for designing and deploying any workload on Azure.

Resources are always contained within a resource group, which in turn belongs to a subscription. Subscriptions sit within a management group hierarchy. This three-level nesting (management group > subscription > resource group) is where policies, budgets, and RBAC assignments are applied.

**Code walkthrough:**

```bash
# Step 1: Provision a resource group, VNet and subnet using Azure CLI
# Why: understanding the CLI commands maps directly to IaC definitions later

# Step 2: Create a resource group — the container for all related resources
az group create \
  --name myapp-rg \
  --location westeurope

# Step 3: Create a Virtual Network — isolates your workload's network traffic
az network vnet create \
  --resource-group myapp-rg \
  --name myapp-vnet \
  --address-prefix 10.0.0.0/16

# Step 4: Create a subnet — segments the VNet for different workload tiers
az network vnet subnet create \
  --resource-group myapp-rg \
  --vnet-name myapp-vnet \
  --name app-subnet \
  --address-prefixes 10.0.1.0/24

# Step 5: Create a Network Security Group — controls inbound/outbound traffic
az network nsg create \
  --resource-group myapp-rg \
  --name app-nsg

# Step 6: Allow HTTPS traffic only — deny all else by default
az network nsg rule create \
  --resource-group myapp-rg \
  --nsg-name app-nsg \
  --name AllowHTTPS \
  --priority 100 \
  --direction Inbound \
  --access Allow \
  --protocol Tcp \
  --destination-port-ranges 443

# Step 7: Assign managed identity for secure service-to-service auth
# Why: managed identities eliminate the need to store credentials
az identity create \
  --resource-group myapp-rg \
  --name myapp-identity
```

**Why it matters:**

As a DevOps or platform engineer on Azure, you provision and configure these resources using infrastructure-as-code tools. You need to understand what each resource type does, how resources communicate with each other, and how access is controlled before you can write correct Bicep or Terraform definitions.

**Key things to understand:**

- Resources are organised into resource groups; resource groups are organised into subscriptions; subscriptions belong to a management group hierarchy.
- Virtual Networks (VNets) isolate network traffic. Subnets segment VNets. Network Security Groups (NSGs) apply inbound and outbound rules at the subnet or NIC level.
- Azure RBAC assigns roles (Owner, Contributor, Reader, or custom roles) to security principals (users, groups, managed identities, service principals) at a specific scope.
- Managed identities allow Azure resources to authenticate to other Azure services without storing credentials.
- Azure regions and availability zones are distinct failure domains; deploying across zones improves resilience.

**Common pitfalls:**

- Granting Contributor or Owner scope at the subscription level when a narrower scope would suffice.
- Not using managed identities for service-to-service authentication, and using client secrets instead.
- Overlooking egress costs when designing storage and networking topologies.
- Confusing service endpoints with private endpoints; private endpoints are the preferred approach for securing PaaS services.

**Azure Key Vault:**

Azure Key Vault is the managed service for storing and accessing secrets, certificates, and encryption keys. Pipelines and applications should retrieve secrets from Key Vault at runtime rather than storing them in configuration files or pipeline variables. In Bicep you can reference Key Vault secrets as secure parameters; in Terraform you use the `azurerm_key_vault_secret` data source. Most CI/CD platforms can inject secrets from their own secret store or from a cloud vault during pipeline execution. Access to Key Vault should be granted through managed identities and scoped RBAC roles (Key Vault Secrets User, Key Vault Crypto User) rather than broad access policies.

---

## 3. Infrastructure as Code – Principles and Why It Matters

Infrastructure as Code (IaC) is the practice of defining and managing infrastructure resources – servers, networks, databases, and more – using machine-readable definition files rather than manual configuration or interactive tools. The definition files are stored in version control, reviewed like application code, and applied by automated tools that reconcile the desired state with the actual state of the infrastructure.

The key property that distinguishes good IaC from a bag of scripts is idempotency: applying the same definition multiple times must produce the same result. This is what makes IaC safe to run in automated pipelines without human supervision.

**Code walkthrough:**

```hcl
# Step 1: A Terraform module that demonstrates IaC principles
# Why: modules are the building blocks of maintainable, reusable IaC

# --- modules/storage/variables.tf ---
# Step 2: Define the interface — what inputs does this module accept?
# Why: separating variables from resources makes the module reusable across environments
variable "environment" {
  type        = string
  description = "Environment name (dev, staging, prod)"
}

variable "location" {
  type    = string
  default = "westeurope"
}

# --- modules/storage/main.tf ---
# Step 3: Declare the desired end state — Terraform figures out how to get there
# Why: declarative IaC is idempotent — applying it twice produces the same result
resource "azurerm_storage_account" "this" {
  name                     = "myapp${var.environment}store"
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = var.environment == "prod" ? "GRS" : "LRS"

  # Step 4: Tags enable cost tracking and resource ownership
  tags = {
    environment = var.environment
    managed_by  = "terraform"
  }
}

# --- modules/storage/outputs.tf ---
# Step 5: Outputs let other modules reference this resource
output "storage_account_id" {
  value = azurerm_storage_account.this.id
}

# --- environments/prod/main.tf ---
# Step 6: Use the module with environment-specific values
# Why: the same module serves dev, staging, and prod with different parameters
module "storage" {
  source              = "../../modules/storage"
  environment         = "prod"
  resource_group_name = azurerm_resource_group.main.name
}
```

**Why it matters:**

IaC is the foundation of repeatable, auditable, and scalable infrastructure management. Without it, environments drift apart over time, incidents are hard to reproduce, and changes have no audit trail. With IaC, every change to infrastructure goes through a pull request, is reviewed, and is applied consistently across environments.

**Key things to understand:**

- Declarative IaC (Bicep, Terraform, ARM) describes the desired end state; the tool works out the sequence of API calls needed to reach it.
- Imperative IaC (scripts) describes the exact sequence of steps; it requires the author to handle ordering and idempotency manually.
- Idempotency means applying the same definition multiple times produces the same result; this is a required property of good IaC.
- Treat IaC code with the same quality standards as application code: review, testing, linting, and modularisation.
- Separate environment-specific values (subscriptions, names, sizes) from the structural template using parameter files or variable inputs.

**Common pitfalls:**

- Making manual changes to resources outside the IaC tool, causing state drift.
- Not storing state securely (relevant for Terraform); state files can contain sensitive values.
- Writing monolithic templates that are difficult to maintain; prefer small, composable modules.
- Skipping a plan or preview step before applying changes in production.

---

## 4. Bicep – Templates, Modules and Deployment

Bicep is a domain-specific language (DSL) developed by Microsoft for deploying Azure resources declaratively. It compiles to Azure Resource Manager (ARM) JSON templates, giving access to the full ARM API surface while providing a cleaner, more readable syntax. Bicep supports modules (reusable template fragments), parameters, variables, outputs, and conditions.

A minimal Bicep resource definition looks like this:

```bicep
param location string = resourceGroup().location
param storageAccountName string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
  }
}

output storageAccountId string = storageAccount.id
```

Every resource block specifies a `type` (the ARM resource type and API version), a `name`, a `location`, and the resource-specific `properties`. Parameters supply environment-specific values; outputs expose values for use in other templates or pipelines.

**Why it matters:**

Bicep is the first-class IaC language for Azure. It is tightly integrated with Azure CLI and modern CI/CD platforms, making it the natural choice for Azure-native teams. Understanding Bicep lets you define, review, and deploy Azure resources reproducibly.

**Key things to understand:**

- A Bicep file declares resources with `resource` blocks, inputs with `param`, computed values with `var`, and return values with `output`.
- Modules split large templates into smaller, reusable files referenced with the `module` keyword.
- The `targetScope` determines whether the template deploys to a resource group, subscription, management group, or tenant.
- The `az deployment` command family deploys Bicep; the `--what-if` flag previews changes without applying them.
- Parameter files (`.bicepparam` or JSON) supply environment-specific values to a template at deployment time.
- Conditions (`if`) and loops (`for`) allow dynamic resource definitions within a single template.

**Common pitfalls:**

- Not using `--what-if` before applying changes to production, leading to unexpected resource modifications or deletions.
- Embedding secrets as plain-text parameters instead of referencing Key Vault secrets.
- Creating deep module nesting that makes the template hard to follow.
- Forgetting that some Azure resource properties are not idempotent; re-deploying can cause downtime if not handled carefully.

---

## 5. Terraform – Providers, State, Plan and Apply

Terraform is an open-source IaC tool by HashiCorp that uses a declarative configuration language (HCL – HashiCorp Configuration Language) to define infrastructure across multiple cloud providers and services. Terraform tracks the current state of managed infrastructure in a state file (`terraform.tfstate`) and calculates the difference between the current state and the desired configuration to produce a plan of changes before applying them.

A minimal Terraform configuration for an Azure resource group and storage account:

```hcl
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "tfstate-rg"
    storage_account_name = "tfstateaccount"
    container_name       = "tfstate"
    key                  = "prod.terraform.tfstate"
  }
}

provider "azurerm" {
  # The features block is optional in v4 of the AzureRM provider
}

resource "azurerm_resource_group" "main" {
  name     = "my-app-rg"
  location = "West Europe"
}

resource "azurerm_storage_account" "main" {
  name                     = "myappstore001"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
```

The workflow is always: `terraform init` (download providers) → `terraform plan` (preview changes) → `terraform apply` (execute changes). Never skip `plan` in production.

**Why it matters:**

Terraform is the dominant multi-cloud IaC tool and is widely used even in Azure-primary environments, particularly when infrastructure spans multiple providers. Understanding Terraform's state model, provider ecosystem, and plan/apply workflow is essential for operating it safely at scale.

**Key things to understand:**

- Providers are plugins that define the resource types available; the AzureRM provider covers Azure resources.
- State is stored in a backend (locally by default; remotely in Azure Blob Storage or Terraform Cloud in team environments). Remote state is required for collaboration.
- `terraform plan` computes the change set; `terraform apply` executes it. Never skip the plan step in production workflows.
- State locking prevents concurrent modifications; remote backends support locking natively.
- Modules group related resources for reuse; input variables and output values define their interface.
- `terraform import` brings existing resources under Terraform management without recreating them.

**Common pitfalls:**

- Using local state in team environments, causing state conflicts when multiple engineers run Terraform simultaneously.
- Not protecting the state file; it can contain sensitive values such as connection strings and passwords.
- Running `terraform apply` without reviewing the plan output, risking accidental resource destruction.
- Overusing `depends_on` instead of relying on implicit dependencies through resource attribute references.

---

## 6. PowerShell – Automation and Azure Management

PowerShell is a cross-platform scripting language and shell built on .NET. It is object-oriented: commands (called cmdlets) output structured objects rather than text, making it easier to filter, sort, and transform data without fragile string parsing. The `Az` PowerShell module provides cmdlets for managing every Azure resource type. PowerShell is the dominant scripting language in Windows-centric and Azure-heavy environments.

**Code walkthrough:**

```powershell
# Step 1: A PowerShell script that automates Azure resource management
# Why: PowerShell passes objects (not text), making it ideal for Azure automation

# Step 2: Use strict error handling — never let failures pass silently
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# Step 3: Authenticate using a managed identity (not interactive login)
# Why: pipelines and automation must use non-interactive authentication
Connect-AzAccount -Identity

# Step 4: Get all resource groups tagged for a specific environment
# Why: object pipeline lets you filter, transform, and act on structured data
$stagingResources = Get-AzResourceGroup |
    Where-Object { $_.Tags["environment"] -eq "staging" } |
    Select-Object ResourceGroupName, Location, Tags

# Step 5: Check each resource group for resources that are running
foreach ($rg in $stagingResources) {
    $vms = Get-AzVM -ResourceGroupName $rg.ResourceGroupName -Status |
        Where-Object { $_.PowerState -eq "VM running" }

    if ($vms.Count -gt 0) {
        Write-Verbose "Found $($vms.Count) running VMs in $($rg.ResourceGroupName)"
        # Step 6: Stop VMs in staging outside business hours to save cost
        foreach ($vm in $vms) {
            try {
                Stop-AzVM -ResourceGroupName $rg.ResourceGroupName `
                          -Name $vm.Name -Force
                Write-Verbose "Stopped VM: $($vm.Name)"
            }
            catch {
                Write-Error "Failed to stop $($vm.Name): $_"
            }
        }
    }
}
```

**Why it matters:**

Many organisations use PowerShell for Azure management tasks, release automation, and operational scripts. Most CI/CD platforms support PowerShell steps natively. Being able to write, read, and debug PowerShell scripts is necessary for working in these environments and for understanding existing automation.

**Key things to understand:**

- Cmdlets follow a Verb-Noun naming convention: `Get-AzResourceGroup`, `New-AzStorageAccount`, `Remove-AzWebApp`.
- The pipeline (`|`) passes objects, not text, between cmdlets. `Where-Object` filters, `Select-Object` projects, `ForEach-Object` iterates.
- Variables are prefixed with `$`. Arrays use `@()`. Hash tables (dictionaries) use `@{}`.
- `try / catch / finally` handles errors; `$_` inside a catch block refers to the current exception.
- `Connect-AzAccount` authenticates to Azure; in pipelines, use a service principal or managed identity instead of interactive login.
- Always use `Write-Verbose` and `Write-Error` rather than `Write-Host` in reusable scripts to support proper output handling.

**Common pitfalls:**

- Using `Write-Host` in scripts that are consumed programmatically; its output cannot be captured in a pipeline.
- Ignoring error handling, allowing scripts to continue silently after failures.
- Hardcoding credentials or subscription IDs in scripts instead of using parameters or environment variables.
- Not using `-ErrorAction Stop` when calling cmdlets that do not throw terminating errors by default.

---

## 7. Kubernetes – Pods, Deployments, Services and Ingress

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerised applications. It introduces a set of resource types with distinct roles: the Pod is the smallest deployable unit; a Deployment manages a fleet of identical Pods; a Service provides a stable network address for reaching those Pods; an Ingress exposes HTTP/HTTPS routes from outside the cluster to Services.

Understanding the difference between these four resource types is the foundation of working with Kubernetes:

| Resource | Role |
|---|---|
| **Pod** | One or more containers that share a network namespace, storage volumes, and lifecycle. The atomic unit Kubernetes schedules and restarts. |
| **Deployment** | Declares a desired number of Pod replicas and manages rolling updates and rollbacks. You almost never create Pods directly; you create Deployments. |
| **Service** | A stable virtual IP and DNS name that load-balances traffic across all healthy Pods matching a label selector. Pods come and go; the Service address stays constant. |
| **Ingress** | Routes external HTTP/HTTPS traffic to Services based on hostname or path rules. Requires an Ingress controller (such as NGINX or the Azure Application Gateway Ingress Controller) to be installed in the cluster. |

The `kubectl` command-line tool is used to interact with a cluster: `kubectl apply -f manifest.yaml`, `kubectl get pods`, `kubectl describe deployment`, `kubectl logs`.

**Code walkthrough:**

```yaml
# Step 1: A complete Kubernetes manifest for a production-ready web application
# Why: this shows how Deployment, Service and Ingress work together
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: order-api
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: order-api
  template:
    metadata:
      labels:
        app: order-api
    spec:
      containers:
        - name: order-api
          image: myregistry.azurecr.io/order-api:v1.4.0
          ports:
            - containerPort: 8080
          # Step 2: Resource requests and limits — required for reliable scheduling
          # Why: without these, one pod can starve others on the same node
          resources:
            requests:
              cpu: "250m"
              memory: "256Mi"
            limits:
              cpu: "500m"
              memory: "512Mi"
          # Step 3: Readiness probe — Kubernetes only sends traffic when the pod is ready
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 10
          # Step 4: Liveness probe — Kubernetes restarts the pod if it becomes unhealthy
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 15
            periodSeconds: 20
          # Step 5: Inject config and secrets without baking them into the image
          envFrom:
            - configMapRef:
                name: order-api-config
            - secretRef:
                name: order-api-secrets
---
# Step 6: Service provides a stable address — pods come and go, the Service stays
apiVersion: v1
kind: Service
metadata:
  name: order-api
  namespace: production
spec:
  selector:
    app: order-api
  ports:
    - port: 80
      targetPort: 8080
---
# Step 7: Ingress routes external HTTPS traffic to the Service
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: order-api
  namespace: production
  annotations:
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /orders
            pathType: Prefix
            backend:
              service:
                name: order-api
                port:
                  number: 80
```

**Why it matters:**

Kubernetes is the standard platform for running containerised workloads in production. DevOps engineers provision clusters, write manifest files, configure deployments, manage secrets, and troubleshoot running workloads. Azure Kubernetes Service (AKS) is the managed offering on Azure, but understanding the underlying Kubernetes concepts is necessary to use it effectively.

**Key things to understand:**

- A Pod wraps one or more containers that share a network namespace and storage. Pods are ephemeral; when a Pod dies, its local storage is lost.
- A Deployment manages a ReplicaSet of Pods and performs rolling updates by default; `maxUnavailable` and `maxSurge` control the update strategy.
- A Service selects Pods by label and provides a stable cluster-internal DNS name and virtual IP; type `LoadBalancer` exposes it externally.
- Namespaces partition a cluster into logical groups; use them to separate environments or teams on shared clusters.
- ConfigMaps and Secrets inject configuration and sensitive values into Pods without baking them into images.
- Resource requests and limits control how much CPU and memory a Pod can use; setting them correctly is required for reliable scheduling.
- Liveness and readiness probes tell Kubernetes when to restart a container and when to send it traffic.

**Common pitfalls:**

- Creating Pods directly instead of using a Deployment; bare Pods are not restarted if they fail.
- Running Pods with no resource requests or limits, allowing one workload to starve others on the node.
- Storing secrets in ConfigMaps (plain text) instead of Kubernetes Secrets, or not integrating with an external secrets manager.
- Not setting readiness probes, causing traffic to be routed to Pods that are not yet ready to serve.
- Applying manifests directly to production clusters without a pipeline, bypassing audit and approval controls.

**Azure Container Registry (ACR):**

Azure Container Registry is a managed Docker registry for storing and distributing container images. ACR integrates natively with AKS – you can attach an ACR instance to a cluster so that nodes pull images without separate credentials. ACR supports automated vulnerability scanning through Microsoft Defender for Containers, image signing for supply chain integrity, and geo-replication for multi-region deployments. In a typical workflow, the CI pipeline builds an image, pushes it to ACR, and the CD pipeline deploys from ACR to AKS.

---

## 8. Observability – Metrics, Logs, Traces and the Three Pillars

Observability is the ability to understand the internal state of a system from its external outputs. The three pillars are metrics, logs, and traces. Each pillar answers a different kind of question: metrics tell you something is wrong, logs tell you what happened, and traces tell you where it happened across service boundaries.

- **Metrics** are numerical measurements aggregated over time (request rate, error rate, CPU usage, latency percentiles). They are cheap to store at scale and ideal for alerting on known failure modes.
- **Logs** are timestamped event records emitted by running software. Structured logs (formatted as JSON) are far easier to query and filter than unstructured text lines.
- **Traces** record the journey of a single request through a distributed system. Each operation is a span; spans are linked by a shared trace ID propagated through HTTP headers. Traces are essential in microservice architectures where a single user action touches many services.

Together these three signals allow engineers to detect problems (metrics), understand their context (logs), and identify where in the call graph they originated (traces).

**Code walkthrough:**

```yaml
# Step 1: A Prometheus alerting rules file that implements the RED method
# Why: alerting on user-facing symptoms (not internal metrics) reduces false positives

groups:
  - name: order-api-alerts
    rules:
      # Step 2: Alert on high error rate — the "E" in RED
      # Why: a sudden spike in 5xx errors means users are failing right now
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{service="order-api", status=~"5.."}[5m]))
          /
          sum(rate(http_requests_total{service="order-api"}[5m]))
          > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "order-api error rate above 5% for 2 minutes"

      # Step 3: Alert on high latency — the "D" in RED (Duration)
      # Why: p99 latency catches the worst user experiences, not just the average
      - alert: HighLatencyP99
        expr: |
          histogram_quantile(0.99,
            sum(rate(http_request_duration_seconds_bucket{service="order-api"}[5m]))
            by (le)
          ) > 2.0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "order-api p99 latency above 2 seconds"

      # Step 4: Alert on low request rate — the "R" in RED
      # Why: a sudden drop in traffic may indicate an upstream failure or DNS issue
      - alert: LowRequestRate
        expr: |
          sum(rate(http_requests_total{service="order-api"}[5m])) < 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "order-api receiving fewer than 10 req/s — possible upstream issue"
```

**Why it matters:**

You cannot operate a system you cannot observe. A DevOps engineer is responsible for ensuring that production systems emit sufficient telemetry and that the tooling to collect, store, and query that telemetry is in place. Without observability, incidents take longer to detect and resolve.

**Key things to understand:**

- Metrics are cheap to store and query at scale; they are ideal for alerting on known failure modes (error rate, latency, saturation).
- Logs provide context for individual events; structured logs (JSON) are far easier to query than unstructured text.
- Traces correlate work across service boundaries using a trace ID propagated through requests; they are essential in microservice architectures.
- The RED method for services: Rate (requests per second), Errors (error rate), Duration (latency).
- The USE method for resources: Utilisation, Saturation, Errors.
- Service Level Indicators (SLIs), Service Level Objectives (SLOs), and error budgets provide a principled framework for reliability targets.

**Common pitfalls:**

- Logging too much (noise) or too little (blindness); aim for actionable, structured events.
- Alerting on symptoms that are not user-facing, generating alert fatigue without improving reliability.
- Not propagating trace context across service calls, producing disconnected traces.
- Collecting metrics and logs but never defining SLOs, leaving no shared definition of "good enough".

---

## 9. Azure Monitor and Application Insights

Azure Monitor is the unified observability platform for Azure. It collects metrics and logs from Azure resources, virtual machines, containers, and custom applications. Log Analytics workspaces store log data and expose it via the Kusto Query Language (KQL) for ad hoc analysis and alerting. Application Insights is a feature of Azure Monitor focused on application performance monitoring: it collects request rates, dependency calls, exceptions, and custom events from instrumented applications.

**Code walkthrough:**

```kusto
// Step 1: KQL queries for Azure Monitor / Log Analytics
// Why: KQL is the query language for investigating incidents in Azure

// Step 2: Find all 5xx errors in the last hour, grouped by endpoint
// Why: this tells you which endpoint is failing and how often
requests
| where timestamp > ago(1h)
| where resultCode startswith "5"
| summarize errorCount = count() by name, resultCode
| order by errorCount desc

// Step 3: Calculate p95 latency per endpoint over the last 24 hours
// Why: latency percentiles reveal user experience better than averages
requests
| where timestamp > ago(24h)
| summarize p95_ms = percentile(duration, 95) by name
| order by p95_ms desc

// Step 4: Correlate exceptions with the requests that triggered them
// Why: joining traces and exceptions pinpoints root causes
requests
| where timestamp > ago(1h)
| where success == false
| join kind=inner (
    exceptions
    | where timestamp > ago(1h)
) on operation_Id
| project timestamp, name, resultCode, type, outerMessage
| take 50

// Step 5: Create an alert rule condition — error rate exceeding threshold
// Why: this KQL becomes the condition in an Azure Monitor alert rule
requests
| where timestamp > ago(5m)
| summarize totalRequests = count(),
            failedRequests = countif(resultCode startswith "5")
| extend errorRate = round(100.0 * failedRequests / totalRequests, 2)
| where errorRate > 5
```

**Why it matters:**

Azure Monitor is the first place to look when something is wrong with a workload running on Azure. DevOps engineers configure diagnostic settings to route resource logs to Log Analytics, write KQL queries to investigate incidents, create alert rules to notify on-call engineers, and build dashboards to communicate system health to stakeholders.

**Key things to understand:**

- Diagnostic settings on each Azure resource control which categories of metrics and logs are sent to which destinations (Log Analytics, Storage, Event Hub).
- KQL is the query language for Log Analytics; understanding `where`, `summarize`, `project`, `join`, and `render` covers most operational needs.
- Alert rules define a condition (a KQL query or a metric threshold), an evaluation frequency, and an action group (email, webhook, PagerDuty).
- Application Insights uses a connection string (not an instrumentation key in modern SDKs) to identify where to send telemetry.
- Workbooks provide interactive, parameterised dashboards built on KQL queries and Azure resource data.
- Availability tests in Application Insights run synthetic HTTP checks against public endpoints and alert on failures.

**Common pitfalls:**

- Not enabling diagnostic settings, leaving resources with no log data in Log Analytics.
- Writing alert rules on raw log counts without accounting for periods of low traffic, causing false positives or false negatives.
- Sampling telemetry too aggressively in Application Insights, losing rare but important events.
- Treating dashboards as a one-time setup; they need to evolve as the system and its failure modes change.

---

## 10. OpenTelemetry – Instrumentation and Vendor-Neutral Telemetry

OpenTelemetry is a CNCF (Cloud Native Computing Foundation) project that provides a vendor-neutral set of APIs, SDKs, and tooling for generating, collecting, and exporting telemetry data – traces, metrics, and logs – from applications and infrastructure. It emerged from the merger of OpenTracing and OpenCensus and is now the standard approach to instrumentation. Applications are instrumented with the OpenTelemetry SDK; telemetry is collected by the OpenTelemetry Collector and exported to any compatible backend.

The separation between instrumentation (SDK in the application) and export (Collector to backend) is the key design decision. You instrument code once and then route the telemetry to any backend – Azure Monitor, Jaeger, Prometheus, Grafana – by reconfiguring the Collector, with no code changes needed.

**Code walkthrough:**

```yaml
# Step 1: OpenTelemetry Collector configuration
# Why: the Collector decouples instrumentation from the observability backend

receivers:
  # Step 2: Receive telemetry from applications via OTLP protocol
  # Why: OTLP is the standard protocol — all OpenTelemetry SDKs speak it
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  # Step 3: Batch telemetry to reduce export overhead
  # Why: sending one span at a time is expensive; batching improves throughput
  batch:
    send_batch_size: 1024
    timeout: 5s

  # Step 4: Add resource attributes to identify the source of telemetry
  # Why: without service.name, you cannot filter by service in the backend
  resource:
    attributes:
      - key: deployment.environment
        value: "production"
        action: upsert

exporters:
  # Step 5: Export to Azure Monitor (Application Insights)
  # Why: this is the recommended integration path for Azure workloads
  azuremonitor:
    connection_string: "${APPLICATIONINSIGHTS_CONNECTION_STRING}"

  # Step 6: Export metrics to Prometheus for Grafana dashboards
  # Why: you can send to multiple backends without changing application code
  prometheus:
    endpoint: 0.0.0.0:8889

service:
  pipelines:
    # Step 7: Wire receivers → processors → exporters for each signal type
    traces:
      receivers: [otlp]
      processors: [batch, resource]
      exporters: [azuremonitor]
    metrics:
      receivers: [otlp]
      processors: [batch, resource]
      exporters: [azuremonitor, prometheus]
```

**Why it matters:**

OpenTelemetry decouples instrumentation from the observability backend. For a DevOps engineer, this means less vendor lock-in and the ability to change observability tooling independently of application releases.

**Key things to understand:**

- The OpenTelemetry SDK instruments application code; automatic instrumentation libraries handle common frameworks (HTTP clients, database drivers) without code changes.
- The OpenTelemetry Collector is a standalone agent or gateway that receives, processes, and exports telemetry. It supports multiple receivers, processors, and exporters.
- Context propagation carries trace context (trace ID, span ID) across process boundaries via HTTP headers (W3C TraceContext standard).
- The Azure Monitor Exporter sends OpenTelemetry data to Application Insights; this is the recommended integration path for Azure workloads.
- Semantic conventions define standard attribute names for common concepts (HTTP method, database name, error type), enabling consistent querying across services.
- Resource attributes describe the source of telemetry: service name, version, environment. These are attached to all spans and metrics from a service.

**Common pitfalls:**

- Confusing the OpenTelemetry SDK (instrumentation in the application) with the Collector (collection and export pipeline); they are separate components with different deployment patterns.
- Not setting the service name resource attribute, making it impossible to filter telemetry by service in the backend.
- Sampling traces at the SDK level without considering the impact on tail-latency analysis and rare error investigation.
- Overlooking log correlation; structured logs need to include the trace ID to be joinable with trace data in the backend.

---
