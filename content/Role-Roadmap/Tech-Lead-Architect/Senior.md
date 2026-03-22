# Tech Lead / Architect – Senior Concept Reference


This document provides detailed explanations of the concepts covered in the Senior level of the Tech Lead / Architect learning path. At this level the focus is on enterprise-scale decision-making, the architecture of AI-powered systems and the organisational practices that let those systems be built and governed responsibly.

---

## Enterprise GenAI Strategy – Build vs Buy, ROI and Governance

Deploying generative AI at enterprise scale is not primarily a technology problem — it is a governance, organisational and change management challenge. A senior architect or tech lead is expected to contribute to (and often to drive) the definition of how their organisation adopts AI responsibly, consistently and in a way that creates durable value rather than isolated experiments.

The first strategic question is build vs buy. Buying a hosted capability (calling an API provided by OpenAI, Azure OpenAI, Anthropic or a similar vendor) reduces time to market and offloads model maintenance but raises questions about data privacy, vendor lock-in, cost at scale and the ability to customise model behaviour. Building or fine-tuning your own model gives greater control but requires significant data, compute and ML expertise. For most enterprise use cases, the right answer is to buy the foundation model and build the integration layer — owning the prompt design, the retrieval pipeline, the evaluation harness and the guardrails, while treating the model itself as a commodity. The build vs buy decision should be revisited as the technology landscape evolves.

Return on investment for AI initiatives is harder to measure than for traditional software because the value is often diffuse (developer productivity, reduced handling time, improved search quality) and the costs include not just compute but data preparation, evaluation, governance overhead and change management. A senior architect contributes to the ROI framework by defining what success looks like before deployment: which metrics will be measured, what the baseline is, what improvement constitutes success and over what time horizon. AI initiatives that lack this upfront definition tend to be evaluated on whether they shipped, rather than whether they delivered value.

An adoption framework gives the organisation a structured way to evaluate, pilot, scale and govern AI use cases. A common structure moves through four stages: explore (identify candidate use cases and assess feasibility), experiment (run time-boxed pilots with clear success criteria), scale (productionise validated use cases with proper engineering rigour) and govern (apply controls, monitor and continuously evaluate). Without a framework, organisations tend to accumulate disconnected pilots that never reach production, creating technical debt and eroding confidence.

Governance of AI systems involves several distinct concerns. Model governance asks which models are approved for use, under what conditions and who owns the decision to adopt a new model. Data governance asks what data can be sent to which models, how consent and privacy are maintained and what logging is required. Output governance asks how model outputs are reviewed, who is accountable for decisions made with AI assistance and how errors are reported and remediated.

**Code walkthrough:**

```yaml
# Step 1: AI adoption framework — structured evaluation of AI use cases
# Why: without a framework, organisations accumulate disconnected pilots that never scale

ai_use_case_evaluation:
  name: "Automated claims triage"
  stage: experiment       # explore → experiment → scale → govern
  owner: team-claims
  sponsor: "Head of Claims Operations"

  # Step 2: Define success criteria BEFORE building anything
  # Why: AI initiatives without upfront metrics get evaluated on "did we ship it"
  # instead of "did it deliver value"
  success_criteria:
    primary_metric: "Mean time to first response on new claims"
    baseline: "4.2 hours (measured over Q4 2025)"
    target: "< 1 hour for 80% of claims"
    measurement_period: "90 days post-deployment"
    minimum_viable_accuracy: "95% correct triage category"

  # Step 3: Build vs Buy decision matrix
  # Why: the default should be "buy the model, build the integration"
  build_vs_buy:
    model: buy             # Use Azure OpenAI GPT-4o — commodity capability
    retrieval_pipeline: build   # RAG over internal claims knowledge base
    evaluation_harness: build   # Custom accuracy tests against labelled examples
    guardrails: build      # Content filtering specific to insurance domain
    rationale: |
      The model is a commodity; our competitive advantage is in the domain-specific
      retrieval pipeline and the guardrails that ensure regulatory compliance.

  # Step 4: Cost projection — AI costs are per-token, not per-instance
  cost_estimate:
    avg_tokens_per_claim: 2500  # input + output
    claims_per_day: 500
    cost_per_1k_tokens: 0.01
    monthly_inference_cost: "$375"
    monthly_infrastructure: "$200"  # Vector DB, compute, monitoring
    total_monthly: "$575"
    current_manual_cost: "$8,000"  # 2 FTE hours per claim × 500 claims/day
    roi_breakeven: "Month 1"

  # Step 5: Governance requirements based on risk classification
  governance:
    ai_register_id: "AIR-2026-008"
    risk_tier: high         # Affects insurance decisions → high risk under EU AI Act
    human_oversight: required  # All AI triage decisions reviewed by a claims handler
    data_classification: confidential
    approved_model: "gpt-4o via Azure OpenAI (private endpoint)"
    logging: "Full prompt/completion logging with PII redaction"
```

**Why it matters:** An organisation without a coherent AI strategy will either move too slowly — paralysed by governance debates while competitors ship — or too fast, accumulating unmanaged risk that eventually forces a costly halt. A senior architect shapes the strategy rather than waiting for it to be handed down. That means being able to articulate the build vs buy trade-offs in a steering committee, propose a governance structure to a CISO, and define an ROI framework for a product owner — not just design the technical architecture.

**Key things to understand:**
- The build vs buy decision framework and the factors that shift it in each direction
- How to define an ROI framework for an AI initiative before deployment, not after
- The stages of an AI adoption lifecycle and what governance gates belong at each stage
- The distinction between model governance, data governance and output governance
- How to evaluate AI use cases against a consistent value and risk framework
- The role of a centre of excellence or AI guild in maintaining consistency across teams

**Common pitfalls:**
- Treating each AI initiative as independent rather than establishing shared infrastructure, standards and learnings
- Allowing business enthusiasm to bypass governance — speed of adoption without controls creates liability
- Measuring success only by deployment (did we ship it?) rather than by outcome (did it deliver the expected value?)
- Defaulting to build when buy would be faster and cheaper, or defaulting to buy without considering data privacy and lock-in

---

## LLM Agent Architecture – Orchestration, Memory, Tools and Guardrails

An LLM agent is a system in which a language model acts as a reasoning engine that can plan, use tools, observe the results of tool use and iterate until a goal is achieved. This is a significant architectural step beyond a simple question-and-answer interface, and it introduces complexity that must be managed deliberately.

The orchestrator is the component that coordinates the agent loop. It receives the goal, maintains the current state of the task, selects which tool to invoke next based on the model's output and feeds the tool result back to the model for the next reasoning step. The orchestrator may be implemented as a framework (LangGraph, AutoGen, Semantic Kernel) or as custom code. The choice affects how much control you have over the loop, how observable the system is and how easy it is to debug.

Memory in an agent system takes several forms. In-context memory is the content currently in the model's context window — it is fast to access but limited in size and lost when the session ends. External memory stores information in a retrievable form outside the context window. Common external memory stores include a vector database for semantic retrieval of unstructured content, a key-value store for structured ephemeral state such as the current step in a multi-step workflow, and a relational or document database for long-term structured history such as past conversations or user preferences. The architecture must decide what is stored, when and how it is retrieved and what happens when retrieved context conflicts with the model's parametric knowledge.

Tools (also called function calls or actions) give the agent the ability to interact with the world: querying databases, calling APIs, reading files, executing code. Each tool is a potential source of side effects. An architect must define which tools are available to which agents, what permissions those tools require and how tool failures are handled without causing the agent to loop or hallucinate a successful outcome.

Guardrails are constraints that prevent the agent from producing harmful, incorrect or out-of-scope outputs. They operate at multiple layers: input filtering (blocking prohibited queries before they reach the model), output filtering (reviewing model outputs before they are acted upon or shown to the user), tool permission boundaries (preventing the agent from invoking tools it should not have access to) and human-in-the-loop gates (requiring human approval before the agent takes high-stakes actions).

**Code walkthrough:**

```python
# Step 1: LLM agent architecture — orchestrator with tools, memory and guardrails
# Why: agents are more than chat — they plan, act, observe and iterate

from dataclasses import dataclass
from typing import List, Optional

@dataclass
class ToolResult:
    tool_name: str
    output: str
    success: bool

class ClaimsAgent:
    """
    Step 2: The orchestrator manages the agent loop: observe → plan → act → observe
    Why: without a structured loop, agents degenerate into unpredictable chains
    """
    MAX_ITERATIONS = 10  # Step 3: Hard limit prevents infinite loops

    def __init__(self, llm, tools: dict, memory, guardrails):
        self.llm = llm
        self.tools = tools          # Step 4: Each tool is a potential side effect
        self.memory = memory        # External memory for cross-session context
        self.guardrails = guardrails

    async def run(self, user_goal: str) -> str:
        # Step 5: Input guardrail — block prohibited queries before they reach the model
        if not self.guardrails.is_allowed_input(user_goal):
            return "This request is outside my scope."

        # Step 6: Load relevant memory — conversation history + retrieved context
        context = await self.memory.retrieve_relevant(user_goal, top_k=5)
        messages = self._build_messages(user_goal, context)

        for iteration in range(self.MAX_ITERATIONS):
            response = await self.llm.chat(messages)

            # Step 7: If the model wants to use a tool, execute it with permission checks
            if response.tool_call:
                tool = self.tools.get(response.tool_call.name)
                if tool is None:
                    messages.append({"role": "tool", "content": "Tool not available"})
                    continue

                # Step 8: Least-privilege — validate tool parameters before execution
                # Why: agents can be prompted to invoke tools with attacker-controlled inputs
                if not tool.validate_params(response.tool_call.params):
                    messages.append({"role": "tool", "content": "Invalid parameters"})
                    continue

                result = await tool.execute(response.tool_call.params)
                messages.append({"role": "tool", "content": result.output})
            else:
                # Step 9: Output guardrail — review before returning to user
                final = self.guardrails.filter_output(response.content)
                await self.memory.store(user_goal, final)  # Persist for future context
                return final

        return "I was unable to complete this task within the allowed steps."
```

**Why it matters:** Agent architectures are becoming the dominant pattern for complex AI-powered features — everything from automated research assistants to code review agents to process automation. The failure modes are severe: an agent with over-broad tool access and no guardrails can take destructive actions at machine speed. A senior architect who understands the agent loop, memory trade-offs and guardrail layers can design these systems to be capable without being dangerous.

**Key things to understand:**
- The agent loop: observe, plan, act, observe — and how the orchestrator manages it
- The difference between in-context memory and external memory, and the trade-offs between them
- The three common external memory store types (vector, key-value, relational) and when each is appropriate
- How tool definitions affect model behaviour and what a well-designed tool interface looks like
- The layers at which guardrails can be applied and why multiple layers are necessary

**Common pitfalls:**
- Building agents without visibility into the reasoning trace — observability is essential for debugging and auditing
- Giving agents broad tool access because it is convenient — least-privilege applies to agents as much as to human users
- Assuming guardrails at one layer are sufficient — a single layer can be circumvented; defence in depth is required

---

## LLM Security – Prompt Injection, Data Exfiltration and Mitigation

LLM-powered systems introduce a class of security vulnerabilities that do not exist in traditional software. A senior architect must understand these threats at a mechanistic level, not just by name, in order to design systems that are resilient to them.

Prompt injection is the most significant LLM-specific attack. It occurs when an attacker embeds instructions in content that the model processes — such as a document being summarised, a web page being retrieved or a user message in a multi-turn conversation — and those instructions cause the model to behave in ways that override the system prompt or the developer's intent. Direct prompt injection comes directly from the user, who crafts their input to manipulate the model's behaviour. Indirect prompt injection comes from external content the model processes on the user's behalf — for example, a malicious instruction embedded in a document that an agent retrieves from a web search. Mitigations include separating instructions from data through structured input formats, treating all external content as untrusted, using output filtering to detect policy violations and applying privilege separation so the model cannot act on injected instructions that require elevated permissions.

Data exfiltration through an LLM occurs when the model reveals information from its context — including system prompts, retrieved documents or other users' data — in response to crafted queries. This is particularly dangerous in RAG systems where sensitive documents are injected into the context. Mitigations include strict access control on what documents can be retrieved for a given user, prompt designs that instruct the model not to quote source material verbatim and output scanning for patterns that suggest confidential data leakage.

Insecure tool use is another critical risk. If an agent is given tools that can write to databases, send emails or execute code, and the agent can be prompted to invoke those tools with attacker-controlled inputs, the consequences can be severe. The mitigation is a combination of least-privilege tool design (tools accept only validated, typed parameters rather than free-text instructions), human-in-the-loop gates for high-impact actions and audit logging of every tool invocation with its parameters.

Model denial of service — crafting inputs that consume excessive tokens, trigger long reasoning chains or cause the model to loop — is also a concern for production systems. Rate limiting, token budget enforcement and circuit breakers on agent loops are standard mitigations.

**Code walkthrough:**

```python
# Step 1: Defence-in-depth for LLM security — multiple layers of protection
# Why: no single layer prevents all attacks; each layer catches what others miss

class LLMSecurityPipeline:
    """
    Step 2: Security pipeline that wraps every LLM call
    Why: treating security as a system design problem, not a model problem
    """

    async def process(self, user_input: str, retrieved_docs: list) -> str:
        # LAYER 1: Input filtering — block known attack patterns
        # Why: catches direct prompt injection before it reaches the model
        if self._detect_injection(user_input):
            self._audit_log("blocked_injection", user_input)
            return "I cannot process this request."

        # LAYER 2: Document access control — enforce per-user permissions
        # Why: prevents data exfiltration through RAG — user only sees their own data
        permitted_docs = [
            doc for doc in retrieved_docs
            if self._user_has_access(doc.classification, self.current_user)
        ]

        # LAYER 3: Privilege separation — model cannot invoke high-impact tools
        # Why: even if injection succeeds, the damage is limited
        response = await self.llm.chat(
            messages=self._build_prompt(user_input, permitted_docs),
            available_tools=self._get_tools_for_risk_level("read_only")
        )

        # LAYER 4: Output filtering — scan response before returning to user
        # Why: catches indirect injection that made it past input filtering
        if self._contains_sensitive_data(response.content):
            self._audit_log("blocked_data_leak", response.content)
            return "I found relevant information but cannot share those details."

        # LAYER 5: Audit logging — every interaction is recorded for review
        # Why: you need a trail to detect attacks you didn't prevent
        self._audit_log("success", response.content, redact_pii=True)
        return response.content

    def _detect_injection(self, text: str) -> bool:
        """
        Step 3: Pattern-based + classifier-based injection detection
        Why: pattern matching catches known attacks; a classifier catches novel ones
        """
        patterns = [
            r"ignore (?:all )?(?:previous |above )?instructions",
            r"you are now",
            r"system prompt",
            r"reveal your",
        ]
        # Combine regex patterns with a fine-tuned classifier for robustness
        return any(re.search(p, text, re.I) for p in patterns) or \
               self.injection_classifier.predict(text) > 0.85
```

**Why it matters:** LLM security cannot be bolted on after deployment. The attack surfaces are novel — traditional WAF rules and input sanitisation do not defend against prompt injection — and the blast radius of a successful attack can be large when agents have tool access. A senior architect who can articulate these threat models to a security team, design mitigations into the system architecture and include LLM-specific risks in threat modelling exercises is operating at the level the role demands.

**Key things to understand:**
- The mechanism of direct and indirect prompt injection and why it is difficult to prevent entirely
- How data exfiltration through LLMs differs from traditional data leakage and what controls apply
- Why tool invocation requires the same security rigour as any other privileged API call
- The [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-llm-applications-2025/) as the industry-standard reference for LLM-specific risks — this is the essential starting point for any LLM security review. The OWASP Top 10 for Agentic Applications, released in 2026, extends this work to cover risks specific to autonomous AI agents with tool access

**Common pitfalls:**
- Relying on the system prompt alone to prevent prompt injection — it is necessary but not sufficient
- Treating LLM security as a model problem rather than a system design problem — most mitigations are architectural
- Logging prompts and completions without redacting sensitive data — the logs themselves become a liability

---

## Context Engineering at Scale – Managing AI System Complexity

Context engineering is the discipline of designing and managing the information that flows into an LLM's context window to produce reliable, high-quality outputs at production scale. It extends prompt engineering from a craft applied to individual prompts into a systems engineering concern applied across an entire AI product.

The context window is the model's working memory — everything the model can attend to in a single inference call. Effective context engineering maximises the relevance and quality of information in the context while staying within token budget constraints. This involves decisions about what to include (retrieved documents, conversation history, tool results, persona instructions), in what order (models tend to weight content at the beginning and end of the context more heavily) and how to format it (structured formats like XML or JSON can improve model adherence to instructions).

At scale, context construction becomes a software engineering problem. The code that assembles a context from dynamic components — user query, retrieved chunks, conversation history, system instructions — must be versioned, tested and observable. Changes to context construction logic can silently degrade output quality, so regression testing of context pipelines against a golden dataset of expected outputs is essential.

Context compression is a set of techniques for fitting more relevant information into a fixed token budget. Strategies include summarising conversation history instead of including it verbatim, ranking retrieved chunks by relevance score and discarding low-ranked ones, filtering retrieved content to remove boilerplate and using structured extraction to pull only the fields relevant to the current query.

Multi-agent systems, where multiple LLMs collaborate on a task, amplify context engineering complexity: each agent has its own context, and the information passed between agents must be designed as carefully as an API contract. Poorly designed inter-agent communication leads to information loss, hallucination amplification and debugging nightmares.

**Code walkthrough:**

```python
# Step 1: Context engineering pipeline — assembling the optimal context window
# Why: what goes INTO the model determines what comes OUT; this is a systems problem

class ContextPipeline:
    MAX_CONTEXT_TOKENS = 12_000  # Reserve tokens for the response

    def build_context(self, query: str, conversation: list, docs: list) -> list:
        token_budget = self.MAX_CONTEXT_TOKENS
        messages = []

        # Step 2: System prompt goes first — models weight beginning content more heavily
        # Why: position matters; instructions at the start are followed more reliably
        system_prompt = self._load_versioned_prompt("claims-assistant-v3")
        messages.append({"role": "system", "content": system_prompt})
        token_budget -= self._count_tokens(system_prompt)

        # Step 3: Retrieved documents — ranked by relevance, filtered for quality
        # Why: irrelevant context degrades output more than missing context
        ranked_docs = sorted(docs, key=lambda d: d.relevance_score, reverse=True)
        doc_context = ""
        for doc in ranked_docs:
            chunk_tokens = self._count_tokens(doc.content)
            if chunk_tokens > token_budget * 0.6:  # Docs get max 60% of budget
                break
            doc_context += f"\n---\nSource: {doc.source}\n{doc.content}"
            token_budget -= chunk_tokens
        messages.append({"role": "system", "content": f"Context:\n{doc_context}"})

        # Step 4: Conversation history — compress older turns to save tokens
        # Why: verbatim history fills the context quickly; summaries preserve meaning
        if len(conversation) > 6:
            # Summarise older turns; keep recent 3 turns verbatim
            summary = self._summarise_history(conversation[:-3])
            messages.append({"role": "system", "content": f"Prior conversation summary: {summary}"})
            for turn in conversation[-3:]:
                messages.append(turn)
        else:
            messages.extend(conversation)

        # Step 5: User query goes last — models also weight ending content heavily
        messages.append({"role": "user", "content": query})

        # Step 6: Emit telemetry — context pipeline needs observability like any code
        # Why: without metrics, you cannot diagnose why output quality changed
        self._emit_metrics({
            "total_tokens": self.MAX_CONTEXT_TOKENS - token_budget,
            "docs_included": len([d for d in ranked_docs if d.relevance_score > 0.7]),
            "history_compressed": len(conversation) > 6,
            "prompt_version": "claims-assistant-v3",
        })

        return messages
```

**Why it matters:** Output quality degradation in AI systems is often traced back to context construction problems, not model problems. A context that includes irrelevant documents, stale conversation history or poorly formatted instructions produces worse outputs regardless of how capable the underlying model is. Senior architects who understand context engineering can diagnose these problems, set engineering standards for how context pipelines are built and tested, and prevent the silent quality regressions that erode user trust over time.

**Key things to understand:**
- How context window position affects model attention and what implications that has for context ordering
- Why context construction pipelines need the same engineering rigour as any other production code path
- The standard techniques for context compression and when each is appropriate
- How context engineering concerns multiply in multi-agent architectures

**Common pitfalls:**
- Treating context construction as a one-time configuration rather than an evolving, tested code path
- Including all available context on the assumption that more information is always better — irrelevant context degrades output quality
- Failing to instrument context pipelines, making it impossible to diagnose why output quality changed after a deployment

---

## AI Policy and the Secure AI Framework – Architect Responsibilities

Every organisation that uses AI in production systems operates within a policy environment — internal policies set by the organisation, external regulations set by governments and regulators, and frameworks provided by standards bodies. A senior architect must understand this environment well enough to design systems that comply with it and to advise the organisation when a proposed use case creates policy risk.

Internal AI policy defines what AI tools and models are approved for use, under what conditions, by whom and for what purposes. It typically addresses data classification (which data may be sent to which models), model approval (which models are on the approved list and how new models are evaluated), output use (whether AI-generated outputs may be used without human review) and incident response (how AI-related incidents are reported and investigated). The architect's role is to ensure that systems are designed to make policy compliance verifiable — for example, logging which model was used for each inference, enforcing data classification at the API level and building human review checkpoints where policy requires them.

The Secure AI Framework (SAIF) provides a set of principles for building AI systems that are secure by design. Its core principles cover securing the AI supply chain (models, training data, third-party components), protecting AI systems at runtime (access controls, monitoring, adversarial input detection), ensuring model outputs are monitored and validated and maintaining the ability to detect and respond to model misbehaviour. As an architect, you translate SAIF principles into concrete design requirements: which threat models apply, which controls are implemented in infrastructure versus application code and how compliance is demonstrated.

Regulatory context is evolving rapidly. The EU AI Act introduces risk-based obligations: high-risk AI systems (those that affect access to credit, employment, education or public services) face requirements around transparency, human oversight, data governance and conformity assessment. The August 2026 deadline for high-risk AI system compliance is particularly relevant to insurance, where AI used in credit decisions, claims assessment and underwriting falls squarely within the high-risk category. An architect working in a regulated industry must understand which risk tier applies to each system and what technical obligations follow.

**Code walkthrough:**

```python
# Step 1: Architecture fitness function for AI Policy compliance
# Why: automated tests that verify the system meets policy requirements continuously

import pytest

class TestAIPolicyCompliance:
    """
    Step 2: These tests run in the CI pipeline on every deployment
    Why: policy compliance must be verifiable through automation, not manual audits
    """

    def test_all_ai_endpoints_use_private_networking(self, infra_state):
        # Step 3: AI Policy requires private endpoints for AI services
        for resource in infra_state.cognitive_accounts:
            assert resource.public_network_access == False, \
                f"{resource.name} has public access enabled — violates AI Policy"

    def test_audit_logging_enabled_on_all_ai_services(self, infra_state):
        # Step 4: AI Policy requires logging which model was used for each inference
        for resource in infra_state.cognitive_accounts:
            diag = infra_state.get_diagnostic_settings(resource.id)
            assert any(log.category == "Audit" for log in diag.enabled_logs), \
                f"{resource.name} missing audit logging — required by AI Policy"

    def test_ai_register_tags_present(self, infra_state):
        # Step 5: Every AI use case must be registered in the AI Register
        required_tags = ["ai_register_id", "risk_classification", "data_classification"]
        for resource in infra_state.cognitive_accounts:
            for tag in required_tags:
                assert tag in resource.tags, \
                    f"{resource.name} missing tag '{tag}' — AI Register requires classification"

    def test_high_risk_systems_have_human_oversight(self, app_config):
        # Step 6: High-risk AI systems (EU AI Act) require human-in-the-loop
        for endpoint in app_config.ai_endpoints:
            if endpoint.risk_classification == "high":
                assert endpoint.human_review_enabled, \
                    f"{endpoint.name} is high-risk but lacks human oversight gate"

    def test_no_sensitive_data_sent_to_unapproved_models(self, app_config):
        # Step 7: Data classification governs which models can process which data
        approved = {"gpt-4o-private", "gpt-4o-mini-private"}
        for endpoint in app_config.ai_endpoints:
            if endpoint.data_classification in ("confidential", "restricted"):
                assert endpoint.model_deployment in approved, \
                    f"{endpoint.name} sends {endpoint.data_classification} data to unapproved model"
```

**Why it matters:** Policy and regulation are not the legal team's problem alone — they translate directly into architecture decisions. A system that cannot demonstrate which model version made a given decision, or that sends customer data to an unapproved model API, is both a compliance risk and a reputational one. A senior architect who understands the policy landscape can design compliance in from the start rather than retrofitting it under pressure before an audit.

**Key things to understand:**
- How to read an internal AI policy and identify the architectural implications of each clause
- The core principles of the Secure AI Framework and how they translate to design decisions
- The risk-tier model of the EU AI Act and what obligations attach to each tier
- How to build audit trails that demonstrate policy compliance for AI-assisted decisions

**Common pitfalls:**
- Treating policy compliance as a legal concern rather than an architectural one — compliance must be built in, not checked at the end
- Failing to account for policy drift — policies evolve, and systems must be designed to adapt without a complete rebuild
- Conflating security controls with compliance controls — they overlap but are not the same, and both are required

---

## Architecture Decision Records – Structure, Process and Culture

Architecture Decision Records (ADRs) are the mechanism by which a team creates and preserves the institutional memory of its technical decisions. At the senior level, the question is not whether to use ADRs — it is how to embed them into team culture so that they are written consistently, kept current and actually consulted when decisions are revisited.

The standard ADR structure includes a title (short, imperative: "Use PostgreSQL as the primary data store"), a status (proposed, accepted, deprecated, superseded — with a reference to the superseding ADR if applicable), a context section that describes the forces at play when the decision was made, a decision section that states what was decided and why, and a consequences section that describes the implications — both positive and negative — of the decision. Some teams add a "considered alternatives" section to capture why other options were rejected.

The process of creating an ADR should be lightweight enough that engineers actually do it. A good target is that any decision which would take more than a day to reverse warrants an ADR. The author drafts the ADR, shares it for asynchronous review (comments on a pull request work well), the team discusses any objections and the ADR is merged with accepted status. For significant decisions, a synchronous design review complements the written record but does not replace it.

Culture is the hardest part. ADRs fail when they are written after the fact as documentation (rather than as part of the decision process), when they are stored somewhere that nobody reads, when the team treats them as optional or when outdated ADRs are left in accepted status after the decision has been reversed. A senior tech lead models the behaviour: writing ADRs for their own decisions, referencing existing ADRs in design discussions and updating or deprecating records when circumstances change.

The long-term value of ADRs is disproportionate to the effort of writing them. New team members can understand the reasoning behind the system without a lengthy onboarding interview. Post-incident reviews can identify whether a decision was made with known risks that materialised. Architectural drift — the gradual accumulation of small decisions that undermine the intended structure — becomes visible when compared against the ADR record.

**Code walkthrough:**

```markdown
# Step 1: ADR with full lifecycle management — not just a record, but a living document
# Why: ADRs that are never updated become misleading; lifecycle management keeps them honest

# ADR-023: Use event-driven architecture for claims-to-payments integration

## Status
Superseded by ADR-031 (added saga pattern for multi-step workflows)

## Context
<!-- Step 2: Capture the forces that existed WHEN the decision was made -->
The claims service needs to trigger payment processing when a claim is settled.
Currently this is a synchronous HTTP call that fails when the payment service
is down, requiring manual intervention to retry.

Forces:
- Claims team deploys 3x/week; payments team deploys weekly — coupling hurts both
- Payment processing takes 5-30 seconds — too slow for synchronous call
- Regulatory requirement: every payment trigger must be auditable
- Team maturity: both teams have experience with Azure Service Bus

## Considered Alternatives
| Option | Pros | Cons | Verdict |
|--------|------|------|---------|
| Keep synchronous HTTP | Simple | Coupled; fails when payment is down | Rejected |
| Shared database | Simple reads | Tight coupling; schema changes break both | Rejected |
| Event via Service Bus | Decoupled; auditable; retry built-in | Eventual consistency | **Accepted** |
| Event via Kafka | Higher throughput | Overkill for our volume; ops overhead | Rejected |

## Decision
<!-- Step 3: State the decision clearly -->
Use Azure Service Bus topics. Claims service publishes `ClaimSettled` events.
Payment service subscribes and processes asynchronously. Dead-letter queue
handles failures. Events are retained for 14 days for audit purposes.

## Consequences
<!-- Step 4: Be explicit about negative consequences too -->
**Positive:** Independent deployment; automatic retry; full audit trail.
**Negative:** Eventually consistent — a claim shows as "settled" before
payment is confirmed. UI must handle the "payment pending" state.
**Revisit when:** We need multi-step workflows (e.g., settle → pay → notify → close).
*Note: This was revisited in ADR-031 which added the saga pattern.*
```

**Why it matters:** A senior tech lead or architect works across multiple teams or systems. Without a systematic practice of recording decisions, the organisation's technical strategy exists only in the minds of the people who made it. When those people change roles or leave, the rationale disappears. Embedding ADRs as a cultural norm — not just a personal habit — is an act of organisational care that pays dividends for every engineer who joins the team in the future.

**Key things to understand:**
- The five core fields of an ADR and the purpose of each
- How to calibrate the threshold for when a decision warrants an ADR
- The process for proposing, reviewing and accepting an ADR in a pull-request-based workflow
- How to keep ADRs current and what to do when a decision is reversed
- How to champion ADR adoption across teams that do not yet have the habit

**Common pitfalls:**
- Writing ADRs as retrospective documentation rather than as part of the decision process — the value is in the thinking, not just the record
- Storing ADRs in a wiki that is not co-located with the code — they become disconnected from the system they describe
- Allowing the ADR backlog to grow stale without a regular review cycle, eroding trust in the records

---

## Incident Management – Leading Through Failure

Incidents are inevitable in production systems. A senior architect's value during an incident is not in writing code faster — it is in structuring the response so the team can diagnose the problem efficiently, communicate status clearly and prevent the same failure from recurring.

A structured incident response process has four phases: detection (automated alerting based on SLOs identifies the problem), triage (classify severity, assemble the right people, establish a communication channel), mitigation (restore service as quickly as possible — rollback, failover, feature toggle — even if the root cause is not yet understood) and resolution (fix the underlying issue and verify the fix in production).

Severity levels determine the response urgency and communication requirements. A typical model uses four levels: SEV-1 (complete outage or data loss affecting all users — all-hands response, executive communication), SEV-2 (major feature degraded — on-call engineer plus tech lead), SEV-3 (minor feature degraded — engineering team priority) and SEV-4 (cosmetic or low-impact issue — normal backlog prioritisation).

Blameless post-mortems are the mechanism by which teams learn from incidents without creating a culture of fear. The post-mortem focuses on systemic causes rather than individual mistakes: what was the chain of events? What detection gaps allowed it to progress? What process or tooling changes would prevent recurrence? A good post-mortem produces concrete action items with owners and deadlines — not just a narrative of what happened.

The tech lead's role during an incident is to facilitate, not to be the sole debugger. This means keeping the team focused on mitigation before root cause analysis, ensuring clear ownership of each investigation thread, managing communication to stakeholders and protecting the team from external pressure that would slow the response.

**Code walkthrough:**

```text
# Step 1: Incident response runbook structure
# Why: runbooks remove the need to think from first principles under pressure

INCIDENT RUNBOOK: Order Service Degraded

DETECTION:
  Alert: "order-api error rate > 5% for 5 minutes"
  Dashboard: https://grafana.internal/d/order-api

TRIAGE (first 5 minutes):
  1. Check deployment history — was anything deployed in the last 2 hours?
  2. Check dependent services — are database, cache, message bus healthy?
  3. Check infrastructure — are pods running? Are resource limits hit?
  4. Classify severity based on user impact

MITIGATION (prioritise restore over diagnosis):
  - If recent deployment: ROLLBACK immediately, investigate after restore
  - If database: failover to read replica, page DBA
  - If message bus: enable circuit breaker, queue will drain when restored

COMMUNICATION:
  SEV-1/2: Post to #incidents Slack channel every 15 minutes
  Template: "Status: [investigating/mitigating/resolved]
             Impact: [what users experience]
             Next update: [time]"

POST-INCIDENT:
  - Blameless post-mortem within 48 hours
  - Required sections: timeline, root cause, detection gaps, action items
  - Each action item has an owner and a deadline
  - Post-mortem shared with engineering org for cross-team learning
```

**Why it matters:** An organisation's reliability culture is defined not by whether incidents happen, but by how it responds when they do. A senior architect who can lead a structured, calm incident response — and who facilitates blameless post-mortems that produce real improvements — builds a team that gets better with every failure rather than one that hides problems to avoid blame.

**Key things to understand:**
- The four phases of incident response: detection, triage, mitigation, resolution
- How severity classification drives response urgency and communication expectations
- The principles of blameless post-mortems and why they produce better outcomes than blame-oriented reviews
- How to facilitate an incident without becoming the single point of failure in the response
- How DORA metrics (change failure rate, time to restore) measure incident management effectiveness

**Common pitfalls:**
- Skipping the mitigation phase to pursue root cause analysis — restore service first, investigate second
- Holding post-mortems that identify a person rather than a systemic cause
- Producing post-mortem action items with no owners or deadlines — they become wish lists
- Not sharing post-mortems beyond the immediate team — the same failure pattern repeats elsewhere

---

## Cost Optimisation and Platform Engineering

At the senior level, architecture is inseparable from economics. A design that is technically elegant but financially unsustainable is a bad design. Cost optimisation is not about spending less — it is about spending deliberately, with visibility into what drives costs and why.

Cloud cost management begins with visibility. Tagging resources by team, service and environment allows cost attribution — knowing that 40% of your cloud bill comes from the data platform team's staging environment is the prerequisite for any cost conversation. Without attribution, cost reduction is guesswork.

Right-sizing is the most impactful cost lever. Most cloud workloads are over-provisioned because teams provision for peak and never revisit. Auto-scaling (scaling out during peak, scaling in during quiet periods) replaces fixed over-provisioning. Reserved instances or savings plans offer 30-60% discounts for committed usage patterns. Spot instances offer 60-90% discounts for interruptible workloads like batch processing.

Performance budgets define the maximum acceptable latency, bundle size or resource consumption for a component. They are the cost-equivalent of SLOs: "this API must respond in under 200ms" is a performance budget; "this service must cost less than $500/month at current scale" is a cost budget. Both are architectural constraints.

Platform engineering is the discipline of building internal developer platforms (IDPs) that reduce cognitive load on product teams. Instead of every team configuring their own CI/CD, infrastructure, observability and security controls from scratch, the platform team provides golden paths — opinionated, well-documented, pre-approved patterns that teams can adopt quickly. This reduces duplication, improves consistency and lets product engineers focus on business logic rather than infrastructure plumbing.

Developer experience (DevEx) metrics measure how effectively engineers can build and ship software: onboarding time (how quickly a new engineer becomes productive), build time (how long feedback loops take), deployment frequency (how often teams can ship) and cognitive load (how much context engineers need to hold to be effective). A senior architect treats developer experience as a first-class architectural concern.

**Why it matters:** Cloud costs grow with usage, and without active governance they grow faster than revenue. Platform engineering multiplies the impact of architectural decisions across the organisation. A senior architect who can articulate cost trade-offs, implement cost guardrails and build platforms that enable teams to move fast while staying within guardrails is operating at enterprise scale.

**Key things to understand:**
- How resource tagging and cost attribution enable informed cost conversations
- The trade-offs between on-demand, reserved, savings plans and spot pricing
- How auto-scaling prevents both over-provisioning and capacity shortfalls
- What an internal developer platform provides and how it reduces cognitive load
- How to measure developer experience and why it is an architectural concern
- The DORA metrics (deployment frequency, lead time, change failure rate, time to restore) as engineering productivity indicators

**Common pitfalls:**
- Treating cost optimisation as a one-time exercise rather than a continuous practice
- Building platforms that are too opinionated — teams will work around a platform that does not fit their needs
- Ignoring developer experience until productivity problems are severe — friction compounds silently
- Optimising cloud costs by reducing reliability investments — saving money on redundancy is borrowing against future incident costs

---

## AI Policy — Organisational Principles (English Summary)

The organisation's [AI Policy](https://lfgrp.sharepoint.com/sites/SP-LFAB-PC-AIHub/Lists/Policies/DispForm.aspx?ID=1) establishes the governance framework for all AI use within the organisation. The policy document is in Swedish; the key principles are summarised here in English to ensure all engineers can understand and apply them.

The policy is built on several pillars. Legal compliance requires that all AI use conforms to applicable regulations, including the EU AI Act and GDPR. Data protection obligations apply to any AI system that processes personal data — purpose limitation, data minimisation, and storage limitation must be enforced in system design.

Responsible AI principles are embedded throughout the policy. These include diversity and non-discrimination (AI systems must not produce biased or discriminatory outcomes), transparency (users and affected parties must understand when and how AI is used), robustness (AI systems must perform reliably and handle errors gracefully), security (AI systems must be protected against adversarial manipulation and data breaches), and privacy (personal data must be handled in accordance with GDPR and internal data classification policies).

The AI Register requires that all AI use cases within the organisation are registered and classified by risk level. This classification determines the governance requirements — from lightweight documentation for low-risk use cases to full conformity assessments for high-risk systems. High-risk AI systems, particularly those affecting access to financial services such as insurance, require conformity assessments demonstrating compliance with transparency, human oversight, data quality, and technical robustness requirements.

Staff using AI tools and systems must understand the limitations of AI technology and the requirements of the policy. This applies to all roles — from architects designing AI systems to developers building them and business users employing AI-assisted tools.

**Code walkthrough:**

```yaml
# Step 1: AI Register entry — every AI use case must be registered before development
# Why: the AI Policy requires classification by risk level to determine governance gates

ai_register_entry:
  id: "AIR-2026-012"
  name: "Claims document summarisation"
  description: |
    Automatically generates summaries of uploaded claim documents to reduce
    manual reading time for claims handlers.
  owner: team-claims
  status: approved         # draft → under-review → approved → in-production → retired

  # Step 2: Risk classification per EU AI Act
  # Why: high-risk systems (affecting insurance decisions) need conformity assessments
  risk_classification: limited  # minimal | limited | high | unacceptable
  rationale: |
    Summarisation assists claims handlers but does not make decisions.
    The handler reviews every summary before acting. This is a limited-risk
    AI system under the EU AI Act (transparency obligation applies).

  # Step 3: Data governance — what data flows through this AI system?
  data_governance:
    input_data_classification: confidential   # Claim documents contain personal data
    data_sent_to_model: "Document text (PII redacted before sending)"
    model_endpoint: "Azure OpenAI (private endpoint, Sweden Central)"
    output_storage: "Summaries stored in claims DB with 7-year retention"
    gdpr_basis: "Legitimate interest (operational efficiency)"

  # Step 4: Responsible AI assessment
  responsible_ai:
    non_discrimination: "Tested across claim types; no category bias detected"
    transparency: "UI clearly labels summaries as 'AI-generated — review required'"
    robustness: "Fallback to manual process if AI service is unavailable"
    human_oversight: "Claims handler reviews every summary before it is used"

  # Step 5: Technical controls — infrastructure requirements from the policy
  technical_controls:
    private_networking: true
    audit_logging: true
    content_filtering: "Azure AI Content Safety enabled"
    model_version_pinned: "gpt-4o-2024-11-20"
    monitoring: "Token usage, latency, and error rate in Azure Monitor"

  # Step 6: Review schedule — policies evolve; systems must be reassessed
  next_review: "2026-09-01"
  review_cadence: "Every 6 months or on policy change"
```

**Why it matters:** As the section above on "AI Policy and the Secure AI Framework — Architect Responsibilities" describes, architects translate policy into architecture. This English summary ensures that the specific policy principles — particularly the AI Register, risk classification, responsible AI principles, and GDPR requirements — are accessible to all team members regardless of language, enabling consistent application across the organisation.

**Key things to understand:**
- Every AI use case must be registered in the AI Register with a risk classification before development begins.
- The risk classification determines governance requirements: low-risk use cases need basic documentation; high-risk use cases need conformity assessments.
- The responsible AI principles (non-discrimination, transparency, robustness, security, privacy) are design constraints that architects must embed in system architecture.
- GDPR obligations apply throughout the AI lifecycle — from training data through inference to logged outputs.

**Common pitfalls:**
- Designing AI system architecture without consulting the AI Policy, then discovering compliance gaps during review.
- Assuming that the AI Policy only applies to customer-facing AI systems; internal AI tools and development assistants are also in scope.
- Not propagating policy requirements to development teams — the architect must ensure that policy constraints are reflected in technical specifications and design documents.

---

## EU Compliance for Tech Lead / Architect

A senior architect or tech lead carries ultimate technical accountability for how EU regulations manifest in system design. The EU AI Act (Regulation 2024/1689) does not merely require individual engineers to write compliant code — it requires organisations to demonstrate, through documentation, architecture and governance, that high-risk AI systems satisfy Articles 9 through 15 across their entire lifecycle. The architect is the person who translates these legal obligations into architectural constraints, design patterns and verifiable controls. This means owning the compliance architecture: the set of cross-cutting components, governance processes and technical evidence pipelines that allow the organisation to prove conformity to regulators, auditors and the Data Protection Officer (DPO).

Coordination with the DPO is a daily concern, not an annual review. GDPR Articles 25 (data protection by design and by default) and 35 (data protection impact assessment) require that privacy considerations are embedded from the earliest design phase. For AI systems, this means the architect must ensure that DPIAs are conducted before any high-risk AI system processes personal data, that the results of those assessments are reflected in the technical architecture (not just in a compliance document), and that the DPO has a clear channel to raise concerns that result in architectural changes. The architect must also ensure that Article 30 records of processing activities are kept current and that they accurately reflect the data flows in the AI system — not just the flows that were intended at design time, but the flows that actually exist in production.

The EU AI Act's conformity assessment process (for high-risk systems listed in Annex III) requires technical documentation that demonstrates compliance with requirements around risk management, data governance, transparency, human oversight, accuracy, robustness and cybersecurity. The architect must design the system so that this evidence is generated automatically — through logging, monitoring, testing and audit trails — rather than assembled manually before an audit. This is the difference between compliance as an architectural property and compliance as a periodic exercise. Systems that generate compliance evidence as a byproduct of normal operation are sustainable; systems that require a dedicated compliance sprint before each audit are fragile and expensive.

The NIS2 Directive adds further obligations for organisations classified as essential or important entities. The architect must ensure that incident detection and reporting capabilities meet the 24-hour early warning and 72-hour full notification deadlines. For financial services organisations, DORA (Digital Operational Resilience Act) imposes additional requirements around ICT risk management, resilience testing and third-party risk management that the architect must reflect in infrastructure and operational design.

Bringing all of this together requires a compliance orchestration layer — a set of services, dashboards and automated checks that give the DPO, the CISO and the business real-time visibility into the compliance posture of every AI system. The architect designs this layer; the teams implement it; the DPO consumes it.

**Code walkthrough:**

```python
# Step 1: Compliance architecture — centralised coordination between architect and DPO
# Why: EU AI Act + GDPR require provable compliance; manual evidence gathering does not scale

from dataclasses import dataclass, field
from typing import List, Optional, Dict
from enum import Enum
from datetime import datetime, timedelta

class RiskTier(Enum):
    MINIMAL = "minimal"
    LIMITED = "limited"
    HIGH = "high"
    UNACCEPTABLE = "unacceptable"

class ComplianceStatus(Enum):
    COMPLIANT = "compliant"
    ACTION_REQUIRED = "action_required"
    NON_COMPLIANT = "non_compliant"
    ASSESSMENT_PENDING = "assessment_pending"

@dataclass
class DPIARecord:
    """Step 2: Data Protection Impact Assessment record (GDPR Article 35)
    Why: high-risk AI processing personal data REQUIRES a DPIA before deployment"""
    system_id: str
    conducted_date: datetime
    dpo_sign_off: bool
    residual_risks: List[str]
    mitigations: Dict[str, str]
    next_review: datetime

@dataclass
class ConformityEvidence:
    """Step 3: Evidence package for EU AI Act conformity assessment
    Why: Annex III high-risk systems must demonstrate compliance with Articles 9-15"""
    article_9_risk_management: bool    # Risk management system in place
    article_10_data_governance: bool   # Training data quality and governance
    article_11_technical_docs: bool    # Technical documentation complete
    article_12_record_keeping: bool    # Automatic logging of events
    article_13_transparency: bool      # Users informed of AI interaction
    article_14_human_oversight: bool   # Meaningful human control exists
    article_15_accuracy_robustness: bool  # Accuracy and cybersecurity tested

@dataclass
class AISystemComplianceRecord:
    system_id: str
    name: str
    risk_tier: RiskTier
    dpia: Optional[DPIARecord]
    conformity: Optional[ConformityEvidence]
    article_30_processing_record: bool
    last_audit: datetime

class ComplianceOrchestrator:
    """
    Step 4: The architect designs this layer; the DPO consumes it
    Why: real-time compliance visibility replaces periodic manual audits
    """

    def __init__(self, ai_register: List[AISystemComplianceRecord]):
        self.ai_register = {s.system_id: s for s in ai_register}

    def assess_system(self, system_id: str) -> Dict:
        # Step 5: Automated compliance posture assessment per system
        # Why: the DPO needs a single view of where each system stands
        system = self.ai_register[system_id]
        issues = []

        # GDPR Article 35: DPIA required for high-risk processing
        if system.risk_tier == RiskTier.HIGH:
            if system.dpia is None:
                issues.append("CRITICAL: High-risk system has no DPIA on record")
            elif not system.dpia.dpo_sign_off:
                issues.append("CRITICAL: DPIA exists but DPO has not signed off")
            elif system.dpia.next_review < datetime.now():
                issues.append("WARNING: DPIA review is overdue")

        # EU AI Act: conformity evidence for high-risk systems
        if system.risk_tier == RiskTier.HIGH and system.conformity:
            evidence = system.conformity
            missing = []
            for article_field in [
                ("article_9_risk_management", "Art 9 Risk Management"),
                ("article_10_data_governance", "Art 10 Data Governance"),
                ("article_11_technical_docs", "Art 11 Technical Documentation"),
                ("article_12_record_keeping", "Art 12 Record Keeping"),
                ("article_13_transparency", "Art 13 Transparency"),
                ("article_14_human_oversight", "Art 14 Human Oversight"),
                ("article_15_accuracy_robustness", "Art 15 Accuracy & Robustness"),
            ]:
                if not getattr(evidence, article_field[0]):
                    missing.append(article_field[1])
            if missing:
                issues.append(f"NON-COMPLIANT: Missing evidence for {', '.join(missing)}")

        # Step 6: GDPR Article 30: records of processing must be current
        if not system.article_30_processing_record:
            issues.append("WARNING: Article 30 processing record not up to date")

        status = ComplianceStatus.COMPLIANT if not issues else (
            ComplianceStatus.NON_COMPLIANT if any("CRITICAL" in i for i in issues)
            else ComplianceStatus.ACTION_REQUIRED
        )

        return {
            "system_id": system.system_id,
            "name": system.name,
            "risk_tier": system.risk_tier.value,
            "status": status.value,
            "issues": issues,
            "assessed_at": datetime.now().isoformat(),
        }

    def generate_dpo_dashboard(self) -> List[Dict]:
        """Step 7: Dashboard for the DPO — one view across all AI systems
        Why: the DPO cannot fulfil their GDPR Article 39 duties without visibility"""
        return [self.assess_system(sid) for sid in self.ai_register]

    def check_audit_readiness(self) -> Dict:
        """Step 8: Pre-audit readiness check — are we ready for a regulator visit?
        Why: compliance as an architectural property, not a periodic sprint"""
        results = self.generate_dpo_dashboard()
        non_compliant = [r for r in results if r["status"] == "non_compliant"]
        action_required = [r for r in results if r["status"] == "action_required"]
        return {
            "total_systems": len(results),
            "compliant": len(results) - len(non_compliant) - len(action_required),
            "action_required": len(action_required),
            "non_compliant": len(non_compliant),
            "audit_ready": len(non_compliant) == 0,
            "blocking_issues": [
                {"system": r["name"], "issues": r["issues"]}
                for r in non_compliant
            ],
        }
```

**Why it matters:** The architect is the bridge between legal obligations and running software. If the DPO cannot see the compliance posture of AI systems in real time, and if conformity evidence must be assembled manually before an audit, the organisation is one regulatory inquiry away from discovering that its systems do not meet the standard it assumed. A compliance orchestration layer — designed by the architect, consumed by the DPO and CISO — turns EU compliance from a legal concern into a verifiable architectural property. For organisations operating under the EU AI Act's August 2026 deadline for high-risk systems, this is not optional: it is the difference between demonstrating compliance and scrambling to prove it.
