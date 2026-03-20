
# Beginner Concept Reference – Marketing Technology Developer

This document provides in-depth explanations of the core concepts covered at the Beginner level of the Marketing Technology Developer learning path. Use it alongside the resources listed in the main learning path to build a solid foundation before progressing to the Mid level.

---

## Python for Marketing Technology – Use Cases and Key Libraries

Python is a general-purpose programming language that has become the dominant choice for data work, automation, and machine learning. Its readable syntax and extensive ecosystem of libraries make it accessible to people coming from non-engineering backgrounds while still being powerful enough for production systems.

For a marketing technology developer, Python is the primary tool for working with campaign data, automating repetitive tasks, calling external APIs, and building the data pipelines that feed dashboards and models. Understanding Python is a prerequisite for almost every other technical skill in this role.

**Why it matters:** Marketing teams generate large volumes of data from advertising platforms, CRM systems, and web analytics tools. Python lets you automate the collection and transformation of that data, run analyses that would take hours manually, and build reproducible pipelines that others can maintain. Without Python, most of the practical work in this role requires expensive third-party tools or slow manual processes.

**Key things to understand:**

- `pandas` is the standard library for loading, cleaning, and transforming tabular data such as campaign exports or CRM records.
- `numpy` provides fast numerical operations that underpin most data science libraries.
- `scikit-learn` is the go-to library for machine learning tasks such as clustering, classification, and feature preprocessing.
- `requests` is used to make HTTP calls to external APIs, which is how you fetch data from advertising platforms or push results to other systems.
- `sqlalchemy` and database connectors allow Python scripts to query data warehouses directly.
- `matplotlib` and `seaborn` provide basic charting capabilities for exploratory analysis.
- Virtual environments and `requirements.txt` keep dependencies isolated and reproducible across machines.
- Python scripts are often run on a schedule using tools such as Azure Functions or Airflow, so understanding file I/O and error handling is important.

**Code walkthrough:**

```javascript
// Step 1: Why GA4 event tracking — every user interaction needs to be
// captured as a structured event for attribution and performance analysis
// GA4 uses an event-based model: everything is an event with parameters

// Step 2: Basic GA4 event push using the dataLayer
// The dataLayer is a JavaScript array that Google Tag Manager reads
window.dataLayer = window.dataLayer || [];

// Step 3: Track a custom event when a user views a campaign landing page
// Event name follows GA4 recommended naming: snake_case, descriptive
window.dataLayer.push({
  event: 'campaign_page_view',
  campaign_id: 'camp_2026_summer',
  campaign_name: 'Summer Sale 2026',
  campaign_source: 'email',
  campaign_medium: 'newsletter',
  // Step 4: Never include PII (personally identifiable information) in events
  // No email addresses, names, or phone numbers in the dataLayer
  user_segment: 'returning_customer', // Anonymised segment is OK
});

// Step 5: Track a conversion event — e.g., user completes a signup
function trackConversion(transactionId, value, currency) {
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      value: value,
      currency: currency || 'SEK',
      // Step 6: Items array provides product-level attribution data
      items: [{
        item_id: 'PROD-001',
        item_name: 'Insurance Premium Plan',
        price: value,
        quantity: 1,
      }],
    },
  });
}
```

**Common pitfalls:**

- Not handling missing or null values before transforming data, which causes silent errors downstream.
- Writing scripts that only work on a local machine because file paths or credentials are hard-coded.
- Ignoring encoding issues when loading CSV exports from advertising platforms that use non-ASCII characters.
- Skipping version control and treating notebooks as the final deliverable rather than a stepping stone to a maintainable script.

---

## SQL – Querying, Filtering and Aggregating Marketing Data

SQL (Structured Query Language) is the standard language for interacting with relational databases and most modern data warehouses. Despite the growth of Python-based data tools, SQL remains the most direct and efficient way to retrieve and summarise large volumes of marketing data.

Marketing databases typically contain tables for customers, orders, campaign events, and channel touchpoints. Being fluent in SQL means you can answer business questions directly without moving large datasets into Python first, which is both faster and more resource-efficient.

**Why it matters:** Almost every marketing data platform — data warehouses, CDPs, analytics tools — exposes its data through SQL or a SQL-compatible interface. Writing efficient queries is the fastest path from a business question to an answer, and it is a skill expected of anyone working with marketing data professionally.

**Key things to understand:**

- `SELECT`, `FROM`, `WHERE` form the foundation of every query and filter rows before aggregation.
- `ORDER BY` sorts the result set; `LIMIT` restricts how many rows are returned, which is important when exploring large tables.
- `JOIN` combines tables — for example, linking a customer table to a purchase table to calculate revenue per segment. The four main join types are: `INNER JOIN` (returns only rows with matching records in both tables), `LEFT JOIN` (returns all rows from the left table plus any matching rows from the right), `RIGHT JOIN` (returns all rows from the right table plus any matching rows from the left), and `FULL OUTER JOIN` (returns all rows from both tables, with NULLs where there is no match).
- `GROUP BY` with aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) produces the summary statistics used in reporting.
- `HAVING` filters on aggregated values, such as showing only segments with more than 1000 customers. It is evaluated after `GROUP BY`, unlike `WHERE` which filters rows before aggregation.
- Window functions (`ROW_NUMBER`, `RANK`, `LAG`) allow calculations across related rows, which is useful for calculating time-since-last-purchase or ranking customers within a segment.
- Common Table Expressions (CTEs) using `WITH` make complex queries easier to read and maintain.

**Code walkthrough:**

```javascript
// Step 1: Why UTM parameter parsing — UTM tags in URLs tell analytics tools
// where traffic comes from. Parsing them correctly is critical for attribution.
// Example URL: https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale

function parseUTMParameters(url) {
  // Step 2: Use the URL API — don't parse query strings with regex
  // The URL API handles encoding, missing params, and edge cases correctly
  const params = new URL(url).searchParams;

  // Step 3: Extract all five standard UTM parameters
  const utm = {
    source: params.get('utm_source'),       // Where traffic comes from (google, facebook)
    medium: params.get('utm_medium'),       // Marketing medium (cpc, email, social)
    campaign: params.get('utm_campaign'),   // Campaign name (summer_sale)
    term: params.get('utm_term'),           // Paid search keyword (optional)
    content: params.get('utm_content'),     // Ad variation for A/B testing (optional)
  };

  // Step 4: Validate required fields — source and medium are mandatory
  if (!utm.source || !utm.medium) {
    console.warn('Missing required UTM parameters:', url);
    return null;
  }

  return utm;
}

// Step 5: Store UTM data in sessionStorage for attribution across page navigations
// First-touch: only store if no existing UTMs (captures the original source)
function storeFirstTouchUTM() {
  const utm = parseUTMParameters(window.location.href);
  if (utm && !sessionStorage.getItem('utm_first_touch')) {
    sessionStorage.setItem('utm_first_touch', JSON.stringify(utm));
  }
  // Step 6: Always update last-touch for comparison with first-touch attribution
  if (utm) {
    sessionStorage.setItem('utm_last_touch', JSON.stringify(utm));
  }
}
```

**Common pitfalls:**

- Using `SELECT *` in production queries, which pulls unnecessary columns and slows performance on large tables.
- Forgetting that `JOIN` without a proper key can create a Cartesian product and multiply row counts unexpectedly.
- Not understanding the difference between `WHERE` (pre-aggregation) and `HAVING` (post-aggregation).
- Assuming that NULL equals zero; aggregate functions typically ignore NULLs, which can skew results silently.

---

## APIs – How They Work and Why Marketing Platforms Use Them

An API (Application Programming Interface) is a defined contract that lets one piece of software communicate with another. In the context of marketing technology, APIs are the primary mechanism by which data moves between platforms — for example, pulling impressions from an advertising platform, pushing audience segments to an email tool, or triggering a personalisation engine when a user visits a website.

Understanding APIs means you can integrate marketing tools without relying on manual exports, and you can build automation that keeps systems in sync in near real time.

**Why it matters:** Modern marketing stacks are made up of many specialised tools — ad platforms, email systems, CRMs, analytics tools — none of which are built to talk to each other by default. APIs are the connective tissue. A marketing technology developer who understands APIs can automate data flows, build integrations, and reduce the manual work that would otherwise fall on analysts or campaign managers.

**Key things to understand:**

- REST APIs are stateless — each request contains all the information needed to process it. Resources are identified by URLs, and the HTTP method determines the action: `GET` reads data, `POST` creates a new resource, `PUT` replaces an existing resource, `PATCH` partially updates a resource, and `DELETE` removes it. Data is most commonly exchanged in JSON format.
- Authentication is typically handled with API keys, OAuth tokens, or service accounts; credentials must never be stored in code repositories.
- Rate limits control how many requests you can make in a given time window; exceeding them returns error codes such as 429 and requires retry logic with exponential back-off.
- Pagination is used when an endpoint returns large datasets in chunks; you must iterate through pages to retrieve all records.
- API documentation describes available endpoints, required parameters, expected responses, and error codes — reading it carefully before writing code saves significant debugging time.
- Webhooks are the reverse of a standard API call: the external platform pushes data to your endpoint when an event occurs, rather than you polling for updates.

**Code walkthrough:**

```javascript
// Step 1: Why a cookie consent banner — GDPR requires explicit consent
// BEFORE setting any non-essential cookies (analytics, advertising, etc.)
// Without consent, you cannot fire tracking pixels or analytics tags.

// Step 2: Check consent status before loading ANY marketing scripts
function getConsentStatus() {
  const consent = document.cookie
    .split('; ')
    .find(row => row.startsWith('cookie_consent='));

  if (!consent) return null; // No decision yet — must ask
  return JSON.parse(decodeURIComponent(consent.split('=')[1]));
}

// Step 3: Only load marketing/analytics scripts AFTER consent is granted
function loadMarketingScripts(consent) {
  if (consent?.analytics) {
    // Step 4: Dynamically inject the GA4 script — it was NOT loaded on page load
    // because we didn't have consent yet
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    script.async = true;
    document.head.appendChild(script);
  }

  if (consent?.advertising) {
    // Step 5: Only fire ad pixels with advertising consent
    // Each pixel type (Meta, Google Ads, LinkedIn) needs separate consent check
    loadAdPixel('meta');
    loadAdPixel('google_ads');
  }
}

// Step 6: Save consent and apply it
function handleConsentDecision(analytics, advertising) {
  const consent = { analytics, advertising, timestamp: new Date().toISOString() };
  // Store consent with a 1-year expiry
  document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(consent))}; max-age=31536000; path=/; SameSite=Lax`;

  loadMarketingScripts(consent);

  // Step 7: Push consent signal to GTM dataLayer for tag-level control
  window.dataLayer?.push({ event: 'consent_update', consent });
}
```

**Common pitfalls:**

- Not validating API responses before using the data, assuming the schema will always match documentation.
- Storing API keys in plain text in scripts or notebooks that end up in source control.
- Not implementing retry logic, so a single transient failure breaks an entire nightly pipeline.
- Confusing REST with GraphQL or SOAP; different platforms use different styles, and the calling pattern differs.

---

## Machine Learning in Marketing – Use Cases and Limitations

Machine learning (ML) refers to algorithms that learn patterns from data and use those patterns to make predictions or decisions without being explicitly programmed for each case. In marketing, ML is applied to problems such as predicting which customers are likely to churn, identifying which audience segments respond best to a particular message, or forecasting campaign spend efficiency.

A marketing technology developer does not need to be a research scientist, but must understand what ML can and cannot do, and how to work with data scientists to deploy models into production systems.

**Why it matters:** Manual rules and intuition-based targeting can only go so far. ML allows marketing teams to act on patterns in customer behaviour that are invisible to the human eye — predicting who will buy, who will leave, and who is most likely to respond to a specific message. Understanding ML means you can evaluate model proposals critically, integrate model outputs into pipelines, and know when a simpler approach is more appropriate.

**Key things to understand:**

- Supervised learning uses labelled historical data to train a model that predicts an outcome — for example, predicting purchase probability from browsing behaviour.
- Unsupervised learning finds structure in data without predefined labels — customer segmentation via clustering is a common marketing application.
- Key marketing use cases include: **churn prediction** (classification — identifying customers likely to stop buying), **customer segmentation** (clustering — grouping customers by behaviour or value), **recommendation systems** (collaborative filtering or content-based filtering — suggesting relevant products), **lookalike audiences** (finding prospects who resemble your best customers), **propensity models** (scoring how likely a customer is to take a specific action), and **price optimisation** (using demand signals to inform pricing decisions).
- Model performance is measured differently depending on the task; accuracy alone is misleading when one class is rare (for example, churned customers are typically a small fraction of total customers).
- Features — the input variables fed to a model — must be carefully selected and cleaned; the quality of inputs directly determines prediction quality.
- Models require retraining when the underlying data distribution changes, for example after a market shift or major campaign.
- ML is not suitable for every problem; a well-designed rule or a simple SQL query is often more reliable, faster to build, and easier to explain to stakeholders.

**Code walkthrough:**

```javascript
// Step 1: Why proper pixel implementation — marketing pixels track conversions
// and feed data back to ad platforms for optimisation. Incorrect implementation
// means wasted ad spend and broken attribution.

// --- Meta (Facebook) Pixel Implementation ---
// Step 2: The pixel should ONLY fire after cookie consent is granted
function initMetaPixel(pixelId) {
  // Step 3: Standard Meta pixel initialisation pattern
  !(function(f,b,e,v,n,t,s) {
    if(f.fbq) return; n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq) f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
    n.queue=[]; t=b.createElement(e); t.async=!0;
    t.src=v; s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  })(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', pixelId);
  fbq('track', 'PageView');
}

// Step 4: Track conversion events — these feed data back to Meta's algorithm
function trackMetaConversion(eventName, params) {
  if (typeof fbq === 'undefined') return; // Pixel not loaded (no consent)

  // Step 5: Hash PII before sending — GDPR requires this for EU users
  // Meta accepts SHA-256 hashed emails for improved matching
  const hashedParams = { ...params };
  if (params.email) {
    hashedParams.em = sha256(params.email.toLowerCase().trim());
    delete hashedParams.email; // Never send raw email
  }

  fbq('track', eventName, hashedParams);
}

// Step 6: Usage — fire on actual conversions, not page views
// trackMetaConversion('Purchase', { value: 499.00, currency: 'SEK' });
// trackMetaConversion('Lead', { content_name: 'Insurance Quote' });
```

**Common pitfalls:**

- Treating a model as a black box and deploying it without understanding what drives its predictions.
- Data leakage — accidentally including information in training data that would not be available at prediction time, producing unrealistically good metrics.
- Overfitting — building a model that performs well on training data but fails on new data because it has memorised noise.
- Neglecting to monitor model performance in production; predictions degrade over time as the world changes.

---

## Data Quality – Why It Matters and How to Assess It

Data quality refers to how well a dataset accurately, completely, and consistently represents the real-world information it is meant to capture. In marketing, data flows from many sources — advertising platforms, CRM systems, web analytics, and offline channels — and each handoff introduces the risk of errors, gaps, or inconsistencies.

Poor data quality leads directly to poor decisions: misleading attribution, inaccurate audience sizes, or incorrect performance reports. A marketing technology developer must be able to identify data quality problems and communicate their impact before they reach dashboards or models.

**Why it matters:** A model or dashboard is only as trustworthy as the data that feeds it. In marketing, bad data has direct business consequences — targeting the wrong audience, misattributing spend, or reporting false results to leadership. Identifying and communicating data quality issues early is one of the highest-value contributions a marketing technology developer can make.

**Key things to understand:**

- **Completeness:** are there missing values in critical fields such as customer ID, timestamp, or conversion flag?
- **Accuracy:** do the values represent reality? For example, are revenue figures in the correct currency and scale?
- **Consistency:** does the same concept use the same definition across systems? "Active customer" may mean different things in the CRM and the data warehouse.
- **Timeliness:** is the data fresh enough for the intended use case? A daily refresh may be acceptable for trend reporting but insufficient for real-time personalisation.
- **Uniqueness:** are records deduplicated? Duplicate rows inflate counts and distort aggregations.
- Profiling tools and simple SQL queries (null counts, distinct value checks, range checks) are the first line of defence when receiving a new dataset.

**Common pitfalls:**

- Assuming that data from a trusted source is clean without checking it.
- Treating all data quality issues as equally urgent; some will have a small impact while others invalidate entire analyses.
- Not documenting known quality issues so that downstream consumers are not caught off guard.
- Fixing quality problems in the analysis layer rather than at the source, so the same issue must be worked around repeatedly.

**Code walkthrough:**

```javascript
// Step 1: Why GDPR basics matter for marketing — every marketing data workflow
// touches personal data. Violations result in fines up to 4% of global revenue.

// Step 2: Data minimisation in practice — only collect what you genuinely need
function collectFormData(formElement) {
  const formData = new FormData(formElement);

  // Step 3: Explicitly define which fields to collect — do NOT blindly
  // forward all form data to analytics or third-party services
  const allowedFields = ['campaign_interest', 'preferred_contact_method'];
  const sanitisedData = {};

  for (const field of allowedFields) {
    if (formData.has(field)) {
      sanitisedData[field] = formData.get(field);
    }
  }

  // Step 4: If you need to process email for deduplication, hash it immediately
  // Raw PII should never be stored in analytics or marketing databases
  if (formData.has('email')) {
    sanitisedData.email_hash = sha256(formData.get('email').toLowerCase().trim());
    // Do NOT store: sanitisedData.email = formData.get('email')
  }

  return sanitisedData;
}

// Step 5: Right to erasure — your system must support deleting a user's data
// This function should be callable when a user requests data deletion
async function handleErasureRequest(userId) {
  // Delete from all marketing data stores
  await Promise.all([
    deleteFromCRM(userId),
    deleteFromAnalytics(userId),
    deleteFromEmailPlatform(userId),
    deleteFromAdAudiences(userId),
  ]);

  // Step 6: Log the erasure for compliance audit trail
  await logErasureCompleted(userId, new Date().toISOString());
}
```

### Data Privacy Basics

Marketing technology developers work with customer data daily, so a basic awareness of data privacy obligations is essential even at the beginner level. Under GDPR and similar regulations, processing personal data requires a lawful basis such as legitimate interest or explicit consent. The principle of data minimisation means you should only collect and process the data that is genuinely necessary for the task at hand. Users must be able to opt in and out of data collection through clear consent management mechanisms, and systems must support the right to erasure — the ability to delete a customer's personal data on request. These are not edge cases; they are routine requirements in any marketing data workflow. Building an early habit of asking "do we need this data, and are we allowed to use it?" will prevent costly compliance problems later.

---

## Generative AI Basics – What It Is and How It Applies to Marketing

Generative AI refers to machine learning models that can produce new content — text, images, code, or structured data — in response to a prompt. Large language models (LLMs) such as frontier models from OpenAI and Anthropic are the most widely used category in marketing contexts, capable of drafting copy, summarising reports, classifying sentiment, and assisting with data analysis.

Understanding the fundamentals of generative AI allows a marketing technology developer to identify where it genuinely adds value, use it responsibly, and avoid the class of errors that arise from misplaced trust in model outputs.

**Why it matters:** Generative AI is already embedded in marketing workflows — from content drafting and personalisation to automated reporting and customer-facing chat tools. A marketing technology developer who understands how these models work can build reliable integrations, spot failure modes before they affect customers, and make informed decisions about where AI assistance is appropriate versus where human judgement is essential.

**Key things to understand:**

- LLMs generate text by predicting the next most probable token; they do not look up facts, they interpolate from patterns learned during training.
- Prompts are the primary interface; the quality and structure of the input significantly affects the quality and reliability of the output.
- Models have a knowledge cut-off date and do not have access to real-time or proprietary data unless it is provided in the prompt or retrieved via a connected tool.
- Hallucination is the tendency for models to produce plausible-sounding but incorrect information; outputs that include factual claims must be verified.
- Token limits constrain how much text can be processed in a single call; long documents must be chunked or summarised before being sent to the model.
- Generative AI is well-suited to tasks that tolerate imperfect output and benefit from human review — drafting, ideation, and summarisation — and less well-suited to tasks requiring precise factual accuracy or auditability.

**Code walkthrough:**

```javascript
// Step 1: Why tag management matters — it decouples marketing instrumentation
// from developer release cycles. Marketing can add/modify tracking without
// code deployments, but the initial setup must be correct.

// Step 2: Basic Google Tag Manager (GTM) container snippet
// This goes in the <head> of every page — it loads the GTM container
// which then controls which tags fire based on triggers and consent
(function(w, d, s, l, i) {
  w[l] = w[l] || [];
  // Step 3: Push the default consent state BEFORE GTM loads
  // This ensures no tags fire until the user grants consent
  w[l].push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  });
  var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-XXXXXXX');

// Step 4: dataLayer is the bridge between your website and GTM
// Push structured events that GTM triggers can listen for
window.dataLayer.push({
  event: 'virtual_page_view',
  page_path: '/insurance/quote/step-2',
  page_title: 'Insurance Quote - Coverage Selection',
  // Step 5: Include business context that tags need for targeting
  user_type: 'prospect',
  quote_stage: 'coverage_selection',
});

// Step 6: Fire a custom event when something business-significant happens
document.querySelector('#get-quote-btn').addEventListener('click', () => {
  window.dataLayer.push({
    event: 'quote_started',
    product_type: 'home_insurance',
    estimated_value: 250000,
  });
});
```

**Common pitfalls:**

- Publishing AI-generated marketing content without human review, leading to factual errors or off-brand messaging.
- Sending confidential customer data in prompts to external model APIs, creating privacy and compliance risks.
- Relying on a single zero-shot prompt for a complex task instead of breaking the task into smaller, verifiable steps.
- Assuming that a model that performs well in one context will perform equally well after a prompt change or model update.
