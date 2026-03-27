export const labs = [
  // ============================================================
  // MT-LAB-1: Analytics Dashboard (from interactiveLabs.js)
  // ============================================================
  {
    id: 'mt-lab-1',
    roleId: 'marketing-technology-developer',
    level: 'beginner',
    title: 'Analytics Dashboard',
    description: 'Build a tracking plan, event collector, and basic analytics aggregation pipeline.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building an analytics dashboard, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library (including time and collections) — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.12.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Define a Tracking Plan',
        instruction: 'Create a tracking plan schema that validates analytics events before they are collected.',
        starterCode: `# Marketing Analytics — Step 2: Tracking Plan

tracking_plan = {
    "page_view": {
        "required": ["page_url", "page_title"],
        "optional": ["referrer", "utm_source", "utm_medium"],
    },
    "button_click": {
        "required": ["button_id", "button_text", "page_url"],
        "optional": ["section"],
    },
    "form_submit": {
        "required": ["form_id", "form_name", "page_url"],
        "optional": ["field_count", "time_to_complete_ms"],
    },
}

def validate_event(event_name, properties, plan):
    """Validate an event against the tracking plan.
    Returns: (is_valid, errors_list)
    """
    # TODO: Check event exists in plan
    # TODO: Check all required properties are present
    # TODO: Warn about unknown properties
    pass

# Test validation
events = [
    ("page_view", {"page_url": "/home", "page_title": "Home"}),
    ("button_click", {"button_id": "cta-1"}),  # Missing required fields
    ("unknown_event", {"foo": "bar"}),  # Unknown event
]

for name, props in events:
    valid, errors = validate_event(name, props, tracking_plan)
    status = "✓" if valid else "✗"
    print(f"  {status} {name}: {errors if errors else 'OK'}")`,
        hints: [
          'Check if event_name is in plan dict first',
          'Use set operations: required - set(properties.keys()) gives missing fields',
          'Unknown props: set(properties.keys()) - set(required + optional)'
        ],
        expectedOutput: `  ✓ page_view: OK
  ✗ button_click: ['Missing: button_text', 'Missing: page_url']
  ✗ unknown_event: ['Unknown event type']`,
        solution: `def validate_event(event_name, properties, plan):
    errors = []

    if event_name not in plan:
        return False, ["Unknown event type"]

    schema = plan[event_name]
    prop_keys = set(properties.keys())
    required = set(schema["required"])
    optional = set(schema.get("optional", []))

    missing = required - prop_keys
    for field in sorted(missing):
        errors.append(f"Missing: {field}")

    unknown = prop_keys - required - optional
    for field in sorted(unknown):
        errors.append(f"Unknown property: {field}")

    return len(errors) == 0, errors

for name, props in events:
    valid, errors = validate_event(name, props, tracking_plan)
    status = "✓" if valid else "✗"
    print(f"  {status} {name}: {errors if errors else 'OK'}")`
      },
      {
        title: 'Step 3: Collect and Aggregate Events',
        instruction: 'Build an event collector that stores events and computes basic metrics.',
        starterCode: `# Marketing Analytics — Step 3: Event Collector

class EventCollector:
    def __init__(self, tracking_plan):
        self.plan = tracking_plan
        self.events = []

    def track(self, event_name, properties, timestamp=None):
        """Track an event. Validate against plan, store if valid."""
        # TODO: Validate, add timestamp, store event
        pass

    def get_metrics(self):
        """Compute basic metrics from collected events.
        Returns: dict with event counts, top pages, conversion funnel
        """
        # TODO: Count events by type, find top pages, compute rates
        pass

# Simulate a user session
collector = EventCollector(tracking_plan)
collector.track("page_view", {"page_url": "/home", "page_title": "Home"})
collector.track("page_view", {"page_url": "/products", "page_title": "Products"})
collector.track("button_click", {"button_id": "add-cart", "button_text": "Add to Cart", "page_url": "/products"})
collector.track("page_view", {"page_url": "/checkout", "page_title": "Checkout"})
collector.track("form_submit", {"form_id": "checkout-form", "form_name": "Checkout", "page_url": "/checkout"})

metrics = collector.get_metrics()
print(f"Total events: {metrics['total']}")
print(f"Event breakdown: {metrics['by_type']}")
print(f"Top pages: {metrics['top_pages']}")`,
        hints: [
          'Use time.time() for default timestamp if None',
          'Store events as dicts: {"name": ..., "properties": ..., "timestamp": ...}',
          'For top pages, count page_url across page_view events using Counter'
        ],
        expectedOutput: `Total events: 5
Event breakdown: {'page_view': 3, 'button_click': 1, 'form_submit': 1}
Top pages: [('/home', 1), ('/products', 1), ('/checkout', 1)]`,
        solution: `import time
from collections import Counter

class EventCollector:
    def __init__(self, tracking_plan):
        self.plan = tracking_plan
        self.events = []

    def track(self, event_name, properties, timestamp=None):
        valid, errors = validate_event(event_name, properties, self.plan)
        if not valid:
            print(f"Rejected {event_name}: {errors}")
            return False

        self.events.append({
            "name": event_name,
            "properties": properties,
            "timestamp": timestamp or time.time()
        })
        return True

    def get_metrics(self):
        by_type = Counter(e["name"] for e in self.events)
        page_views = [e for e in self.events if e["name"] == "page_view"]
        top_pages = Counter(e["properties"]["page_url"] for e in page_views).most_common(5)

        return {
            "total": len(self.events),
            "by_type": dict(by_type),
            "top_pages": top_pages,
        }

collector = EventCollector(tracking_plan)
collector.track("page_view", {"page_url": "/home", "page_title": "Home"})
collector.track("page_view", {"page_url": "/products", "page_title": "Products"})
collector.track("button_click", {"button_id": "add-cart", "button_text": "Add to Cart", "page_url": "/products"})
collector.track("page_view", {"page_url": "/checkout", "page_title": "Checkout"})
collector.track("form_submit", {"form_id": "checkout-form", "form_name": "Checkout", "page_url": "/checkout"})

metrics = collector.get_metrics()
print(f"Total events: {metrics['total']}")
print(f"Event breakdown: {metrics['by_type']}")
print(f"Top pages: {metrics['top_pages']}")`
      }
    ]
  },

  // ============================================================
  // MT-LAB-2: GA4 Event Tracking (from martech-1)
  // ============================================================
  {
    id: 'mt-lab-2',
    roleId: 'marketing-technology-developer',
    level: 'beginner',
    title: 'GA4 Custom Event Tracking',
    description: 'Implement Google Analytics 4 custom event tracking for e-commerce and user engagement, following 2025 GA4 best practices with consent-aware firing.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before implementing GA4 event tracking, ensure your browser environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern browser (Chrome recommended) with DevTools open, a GA4 property with a Measurement ID, and the GA4 Global Site Tag (gtag.js) loaded on your page. Complete all setup steps before continuing.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Open Chrome DevTools (F12) → Network tab to verify gtag.js loads',
          'In DevTools Console, run `window.dataLayer` to confirm it is initialised as an array'
        ],
        expectedOutput: 'Chrome DevTools open\nwindow.dataLayer initialized: []\ngtag.js loaded from Google servers',
        solution: null
      },
      {
        title: 'Step 2: Initialize GA4 and Send a Page View',
        instruction: 'GA4 replaces Universal Analytics and uses an event-based model. Every interaction—including page views—is an event. In this step, initialize the gtag.js script and send your first page_view event. The Measurement ID (G-XXXXXXXXXX) identifies your GA4 property. Never hardcode this; load it from an environment variable or a server-rendered config object.',
        starterCode: `// GA4 Setup — Step 2: Initialize and track page view
// WHY: GA4 uses event-based measurement; all hits are events.
// HOW: Load gtag.js async, configure the property, then fire page_view.

// Simulated environment config (in production, inject from server)
const config = {
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX', // Replace with your Measurement ID
};

// TODO: Write an initGA4(measurementId) function that:
//   1. Creates a <script> tag loading https://www.googletagmanager.com/gtag/js?id=<measurementId> (async)
//   2. Initialises window.dataLayer = window.dataLayer || []
//   3. Defines window.gtag as a function that pushes to dataLayer
//   4. Calls gtag('js', new Date()) and gtag('config', measurementId)
function initGA4(measurementId) {
  // TODO
}

initGA4(config.GA4_MEASUREMENT_ID);
console.log('dataLayer after init:', JSON.stringify(window.dataLayer, null, 2));`,
        hints: [
          'window.dataLayer = window.dataLayer || [] must come BEFORE defining gtag()',
          'function gtag(){dataLayer.push(arguments);} — use arguments, not rest params, to preserve the Arguments object GA4 expects',
          'The <script> src must include ?id=<measurementId> so GA4 knows which property to associate with'
        ],
        expectedOutput: `dataLayer after init: [
  { "0": "js", "1": "<Date>" },
  { "0": "config", "1": "G-XXXXXXXXXX" }
]`,
        solution: `function initGA4(measurementId) {
  // 1. Inject the gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = \`https://www.googletagmanager.com/gtag/js?id=\${measurementId}\`;
  document.head.appendChild(script);

  // 2. Initialise dataLayer
  window.dataLayer = window.dataLayer || [];

  // 3. Define gtag helper
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // 4. Configure the property
  gtag('js', new Date());
  gtag('config', measurementId);
}

initGA4(config.GA4_MEASUREMENT_ID);
console.log('dataLayer after init:', JSON.stringify(window.dataLayer, null, 2));`
      },
      {
        title: 'Step 3: Track E-commerce Events',
        instruction: 'GA4 has a standard e-commerce schema. Using the correct event names and parameter structure ensures your data appears in GA4 e-commerce reports automatically. The purchase event requires value, currency, transaction_id, and an items array. Each item must have item_id and item_name at minimum. Incorrect schemas silently drop data in GA4.',
        starterCode: `// GA4 Setup — Step 3: E-commerce event tracking

// TODO: Implement these three tracking functions using gtag('event', ...)
// Each must follow the GA4 recommended event schema exactly.

// 1. trackAddToCart(item) — fires 'add_to_cart' with correct items array
function trackAddToCart(item) {
  // item: { id, name, price, quantity, brand, category }
  // TODO
}

// 2. trackPurchase(order) — fires 'purchase' with transaction data
function trackPurchase(order) {
  // order: { transactionId, value, currency, items[] }
  // TODO
}

// 3. trackVideoEngagement(video, action) — fires 'video_start' or 'video_complete'
function trackVideoEngagement(video, action) {
  // video: { id, title, durationSec }
  // action: 'start' | 'complete'
  // TODO
}

// Test your implementations
trackAddToCart({ id: 'SKU-001', name: 'Running Shoes', price: 89.99, quantity: 1, brand: 'SpeedRun', category: 'Footwear' });
trackPurchase({
  transactionId: 'TXN-20250101-001',
  value: 89.99,
  currency: 'USD',
  items: [{ id: 'SKU-001', name: 'Running Shoes', price: 89.99, quantity: 1 }]
});
trackVideoEngagement({ id: 'vid-promo-q1', title: 'Spring Collection', durationSec: 45 }, 'start');`,
        hints: [
          'GA4 items array keys are item_id, item_name, price, quantity — not id or name',
          'purchase event requires transaction_id at the top level, not inside items',
          'Video events in GA4: video_start and video_complete are recommended event names; include video_duration as a parameter'
        ],
        expectedOutput: `gtag fired: add_to_cart → { currency: "USD", value: 89.99, items: [{ item_id: "SKU-001", item_name: "Running Shoes", ... }] }
gtag fired: purchase → { transaction_id: "TXN-20250101-001", value: 89.99, currency: "USD", items: [...] }
gtag fired: video_start → { video_id: "vid-promo-q1", video_title: "Spring Collection", video_duration: 45 }`,
        solution: `function trackAddToCart(item) {
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: item.price * item.quantity,
    items: [{
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity,
      item_brand: item.brand,
      item_category: item.category
    }]
  });
}

function trackPurchase(order) {
  gtag('event', 'purchase', {
    transaction_id: order.transactionId,
    value: order.value,
    currency: order.currency,
    items: order.items.map(i => ({
      item_id: i.id,
      item_name: i.name,
      price: i.price,
      quantity: i.quantity
    }))
  });
}

function trackVideoEngagement(video, action) {
  const eventName = action === 'complete' ? 'video_complete' : 'video_start';
  gtag('event', eventName, {
    video_id: video.id,
    video_title: video.title,
    video_duration: video.durationSec
  });
}

trackAddToCart({ id: 'SKU-001', name: 'Running Shoes', price: 89.99, quantity: 1, brand: 'SpeedRun', category: 'Footwear' });
trackPurchase({
  transactionId: 'TXN-20250101-001',
  value: 89.99,
  currency: 'USD',
  items: [{ id: 'SKU-001', name: 'Running Shoes', price: 89.99, quantity: 1 }]
});
trackVideoEngagement({ id: 'vid-promo-q1', title: 'Spring Collection', durationSec: 45 }, 'start');`
      },
      {
        title: 'Step 4: Consent-Aware Firing with gtag Consent Mode',
        instruction: 'In 2025, firing GA4 before obtaining user consent violates GDPR and ePrivacy regulations. GA4 Consent Mode v2 allows you to signal consent state to Google before any tracking fires. When analytics_storage is "denied", GA4 uses cookieless modelling instead of full measurement. Always set default consent to denied and update it only after the user accepts.',
        starterCode: `// GA4 Setup — Step 4: Consent Mode v2

// TODO: Implement a consent-aware GA4 wrapper with two functions:

// 1. setDefaultConsent() — call BEFORE gtag('config', ...) to deny all storage by default
function setDefaultConsent() {
  // Use gtag('consent', 'default', { ... })
  // Deny: analytics_storage, ad_storage, ad_user_data, ad_personalization
  // TODO
}

// 2. updateConsent(preferences) — call after user accepts/rejects the cookie banner
// preferences: { analytics: true|false, marketing: true|false }
function updateConsent(preferences) {
  // Use gtag('consent', 'update', { ... })
  // Map analytics → analytics_storage
  // Map marketing → ad_storage, ad_user_data, ad_personalization
  // TODO
}

// Simulate the correct initialisation order:
// 1. Set default consent (denied)
// 2. Init GA4
// 3. User accepts analytics only
setDefaultConsent();
initGA4(config.GA4_MEASUREMENT_ID);
console.log('Consent defaulted to denied — GA4 in cookieless mode');

updateConsent({ analytics: true, marketing: false });
console.log('Consent updated — analytics enabled, marketing denied');`,
        hints: [
          'gtag("consent", "default", { analytics_storage: "denied" }) must run before gtag("config", ...)',
          'The four Consent Mode v2 parameters are: analytics_storage, ad_storage, ad_user_data, ad_personalization',
          'Map true → "granted" and false → "denied" when building the update payload'
        ],
        expectedOutput: `Consent defaulted to denied — GA4 in cookieless mode
Consent updated — analytics enabled, marketing denied
dataLayer contains consent update: { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" }`,
        solution: `function setDefaultConsent() {
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
}

function updateConsent(preferences) {
  gtag('consent', 'update', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied'
  });
}

setDefaultConsent();
initGA4(config.GA4_MEASUREMENT_ID);
console.log('Consent defaulted to denied — GA4 in cookieless mode');

updateConsent({ analytics: true, marketing: false });
console.log('Consent updated — analytics enabled, marketing denied');`
      }
    ]
  },

  // ============================================================
  // MT-LAB-3: A/B Test Implementation (from martech-2)
  // ============================================================
  {
    id: 'mt-lab-3',
    roleId: 'marketing-technology-developer',
    level: 'mid',
    title: 'Statistical A/B Testing Framework',
    description: 'Build a rigorous A/B testing framework in Python using statistical inference, sample size calculation, and result interpretation for real marketing experiments.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a statistical A/B testing framework, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, a virtual environment, and the scipy and numpy packages installed (`pip install scipy numpy`).',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Run `pip install scipy numpy` then verify: `python -c "import scipy, numpy; print(scipy.__version__, numpy.__version__)"`'
        ],
        expectedOutput: 'Python 3.12.x\nscipy 1.x.x\nnumpy 1.x.x',
        solution: null
      },
      {
        title: 'Step 2: Calculate Required Sample Size',
        instruction: 'A common mistake in A/B testing is stopping a test too early (peeking). Before running an experiment, calculate the minimum sample size per variant required to detect a given effect with sufficient statistical power. Power of 80% (beta=0.2) and significance level of 5% (alpha=0.05) are the industry standard. Underpowered tests produce misleading results that waste marketing budget.',
        starterCode: `# A/B Testing — Step 2: Sample Size Calculation
import math

def calculate_sample_size(baseline_rate, minimum_detectable_effect, alpha=0.05, power=0.8):
    """
    Calculate the minimum number of users needed per variant.

    Args:
        baseline_rate: Current conversion rate (e.g., 0.05 for 5%)
        minimum_detectable_effect: Smallest relative improvement worth detecting (e.g., 0.10 for 10%)
        alpha: Significance level (default 0.05)
        power: Statistical power (default 0.8)

    Returns:
        sample_size_per_variant (int)
    """
    # TODO:
    # 1. Compute the variant rate: baseline * (1 + minimum_detectable_effect)
    # 2. Get z-scores: z_alpha = 1.96 for two-tailed alpha=0.05, z_beta = 0.84 for power=0.8
    # 3. Apply the two-proportion z-test formula:
    #    n = (z_alpha * sqrt(2 * p_avg * (1-p_avg)) + z_beta * sqrt(p1*(1-p1) + p2*(1-p2)))^2 / (p2-p1)^2
    pass

# Test scenarios
scenarios = [
    (0.05, 0.10, "Homepage CTA — detect 10% lift over 5% baseline"),
    (0.02, 0.20, "Email signup — detect 20% lift over 2% baseline"),
    (0.15, 0.05, "Checkout page — detect 5% lift over 15% baseline"),
]

for baseline, mde, label in scenarios:
    n = calculate_sample_size(baseline, mde)
    print(f"{label}")
    print(f"  → Need {n:,} users per variant ({2*n:,} total)\\n")`,
        hints: [
          'z_alpha_2 = 1.96 for a two-tailed test at alpha=0.05; z_beta = 0.84 for 80% power',
          'p_avg = (baseline_rate + variant_rate) / 2 — the pooled proportion',
          'Round up with math.ceil() because sample sizes must be whole numbers'
        ],
        expectedOutput: `Homepage CTA — detect 10% lift over 5% baseline
  → Need 31,199 users per variant (62,398 total)

Email signup — detect 20% lift over 2% baseline
  → Need 21,085 users per variant (42,170 total)

Checkout page — detect 5% lift over 15% baseline
  → Need 36,268 users per variant (72,536 total)`,
        solution: `import math

def calculate_sample_size(baseline_rate, minimum_detectable_effect, alpha=0.05, power=0.8):
    variant_rate = baseline_rate * (1 + minimum_detectable_effect)

    # z-scores for two-tailed alpha and one-tailed beta
    z_alpha = 1.96  # for alpha=0.05, two-tailed
    z_beta = 0.84   # for power=0.80

    p1 = baseline_rate
    p2 = variant_rate
    p_avg = (p1 + p2) / 2

    numerator = (
        z_alpha * math.sqrt(2 * p_avg * (1 - p_avg)) +
        z_beta  * math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))
    ) ** 2
    denominator = (p2 - p1) ** 2

    return math.ceil(numerator / denominator)

for baseline, mde, label in scenarios:
    n = calculate_sample_size(baseline, mde)
    print(f"{label}")
    print(f"  → Need {n:,} users per variant ({2*n:,} total)\\n")`
      },
      {
        title: 'Step 3: Run the Statistical Test and Interpret Results',
        instruction: 'With sufficient data collected, run a two-proportion z-test to determine whether the observed difference is statistically significant. The p-value tells you the probability of seeing this result by chance alone. A p-value below your alpha threshold (0.05) means you can reject the null hypothesis. Always also report the confidence interval — statistical significance does not tell you the size of the effect.',
        starterCode: `# A/B Testing — Step 3: Statistical Analysis
import numpy as np
from scipy import stats
from scipy.stats import proportions_ztest

class ABTest:
    def __init__(self, control_name, variant_name):
        self.control_name = control_name
        self.variant_name = variant_name
        self.control_conversions = 0
        self.control_visitors = 0
        self.variant_conversions = 0
        self.variant_visitors = 0

    def add_results(self, control_conv, control_vis, variant_conv, variant_vis):
        """Add aggregate results (conversions and visitors per variant)."""
        self.control_conversions = control_conv
        self.control_visitors = control_vis
        self.variant_conversions = variant_conv
        self.variant_visitors = variant_vis

    def analyse(self, alpha=0.05):
        """
        Run a two-proportion z-test and return a results dict with:
        - control_rate, variant_rate
        - relative_lift (%)
        - z_stat, p_value
        - significant (bool)
        - ci_lower, ci_upper (95% confidence interval on absolute difference)
        - recommendation (string)
        """
        # TODO: Compute rates, z-stat, p-value, CI, and recommendation
        pass

    def print_report(self):
        results = self.analyse()
        if results is None:
            print("No results to report.")
            return
        print(f"\\n=== A/B Test Report: {self.control_name} vs {self.variant_name} ===")
        print(f"Control:  {results['control_rate']:.2%} ({self.control_conversions}/{self.control_visitors})")
        print(f"Variant:  {results['variant_rate']:.2%} ({self.variant_conversions}/{self.variant_visitors})")
        print(f"Lift:     {results['relative_lift']:+.1f}%")
        print(f"p-value:  {results['p_value']:.4f} ({'SIGNIFICANT' if results['significant'] else 'not significant'})")
        print(f"95% CI:   [{results['ci_lower']:+.4f}, {results['ci_upper']:+.4f}] absolute difference")
        print(f"\\nRecommendation: {results['recommendation']}")

# Simulate a landing page test
test = ABTest('Original Landing Page', 'New Hero Image Variant')
test.add_results(
    control_conv=412, control_vis=8200,
    variant_conv=489, variant_vis=8150
)
test.print_report()`,
        hints: [
          'Two-proportion z-test: from scipy.stats import proportions_ztest; stat, p = proportions_ztest([conv_a, conv_b], [n_a, n_b])',
          'Relative lift = (variant_rate - control_rate) / control_rate * 100',
          'CI for difference: diff ± 1.96 * sqrt(p1*(1-p1)/n1 + p2*(1-p2)/n2)'
        ],
        expectedOutput: `=== A/B Test Report: Original Landing Page vs New Hero Image Variant ===
Control:  5.02% (412/8200)
Variant:  6.00% (489/8150)
Lift:     +19.4%
p-value:  0.0063 (SIGNIFICANT)
95% CI:   [+0.0028, +0.0168] absolute difference

Recommendation: Ship the variant. The result is statistically significant with a 19.4% lift. Monitor for novelty effect over the next 2 weeks.`,
        solution: `import numpy as np
from scipy.stats import proportions_ztest

class ABTest:
    def __init__(self, control_name, variant_name):
        self.control_name = control_name
        self.variant_name = variant_name
        self.control_conversions = 0
        self.control_visitors = 0
        self.variant_conversions = 0
        self.variant_visitors = 0

    def add_results(self, control_conv, control_vis, variant_conv, variant_vis):
        self.control_conversions = control_conv
        self.control_visitors = control_vis
        self.variant_conversions = variant_conv
        self.variant_visitors = variant_vis

    def analyse(self, alpha=0.05):
        p1 = self.control_conversions / self.control_visitors
        p2 = self.variant_conversions / self.variant_visitors

        z_stat, p_value = proportions_ztest(
            [self.control_conversions, self.variant_conversions],
            [self.control_visitors, self.variant_visitors]
        )

        diff = p2 - p1
        se = np.sqrt(
            p1 * (1 - p1) / self.control_visitors +
            p2 * (1 - p2) / self.variant_visitors
        )
        ci_lower = diff - 1.96 * se
        ci_upper = diff + 1.96 * se

        significant = p_value < alpha
        lift = (p2 - p1) / p1 * 100

        if significant and lift > 0:
            recommendation = f"Ship the variant. The result is statistically significant with a {lift:.1f}% lift. Monitor for novelty effect over the next 2 weeks."
        elif significant and lift < 0:
            recommendation = f"Keep the control. The variant shows a {abs(lift):.1f}% degradation at p={p_value:.4f}."
        else:
            recommendation = f"Continue testing. No significant difference detected yet (p={p_value:.4f}). Check sample size requirements."

        return {
            'control_rate': p1,
            'variant_rate': p2,
            'relative_lift': lift,
            'z_stat': z_stat,
            'p_value': p_value,
            'significant': significant,
            'ci_lower': ci_lower,
            'ci_upper': ci_upper,
            'recommendation': recommendation
        }

    def print_report(self):
        results = self.analyse()
        if results is None:
            print("No results to report.")
            return
        print(f"\\n=== A/B Test Report: {self.control_name} vs {self.variant_name} ===")
        print(f"Control:  {results['control_rate']:.2%} ({self.control_conversions}/{self.control_visitors})")
        print(f"Variant:  {results['variant_rate']:.2%} ({self.variant_conversions}/{self.variant_visitors})")
        print(f"Lift:     {results['relative_lift']:+.1f}%")
        print(f"p-value:  {results['p_value']:.4f} ({'SIGNIFICANT' if results['significant'] else 'not significant'})")
        print(f"95% CI:   [{results['ci_lower']:+.4f}, {results['ci_upper']:+.4f}] absolute difference")
        print(f"\\nRecommendation: {results['recommendation']}")

test = ABTest('Original Landing Page', 'New Hero Image Variant')
test.add_results(control_conv=412, control_vis=8200, variant_conv=489, variant_vis=8150)
test.print_report()`
      },
      {
        title: 'Step 4: Guard Against Common A/B Testing Mistakes',
        instruction: 'Statistical validity depends on test hygiene. Three critical mistakes that invalidate results: (1) peeking — checking significance before the test completes, (2) stopping early — ending when you first see p < 0.05, (3) multiple comparisons — testing many variants without adjusting alpha (Bonferroni correction). Implement guardrails that warn the experimenter when these conditions are violated.',
        starterCode: `# A/B Testing — Step 4: Experiment Guardrails
from datetime import date

def check_test_validity(test_metadata):
    """
    Check an A/B test for common statistical validity issues.

    test_metadata keys:
        start_date (str, ISO format)
        current_date (str, ISO format)
        planned_duration_days (int)
        sample_size_per_variant (int)
        current_samples_per_variant (int)
        num_variants (int)  — including control
        alpha (float)  — planned significance level

    Returns: dict with 'valid' (bool), 'warnings' (list), 'adjusted_alpha' (float)
    """
    warnings = []

    # TODO: Check 1 — Has the planned duration elapsed?
    # If current_date < start_date + planned_duration_days, add a warning

    # TODO: Check 2 — Has the required sample size been reached?
    # If current_samples < sample_size_per_variant, add a warning

    # TODO: Check 3 — Multiple comparisons (Bonferroni correction)
    # If num_variants > 2, adjusted_alpha = alpha / (num_variants - 1)
    # Add an informational warning

    adjusted_alpha = test_metadata['alpha']  # update in Check 3
    valid = len(warnings) == 0
    return {'valid': valid, 'warnings': warnings, 'adjusted_alpha': adjusted_alpha}

# Test scenarios
scenarios = [
    {
        'label': 'Too early — peeking',
        'start_date': '2025-03-01', 'current_date': '2025-03-05',
        'planned_duration_days': 14, 'sample_size_per_variant': 15000,
        'current_samples_per_variant': 4000, 'num_variants': 2, 'alpha': 0.05
    },
    {
        'label': 'Multi-variant without correction',
        'start_date': '2025-03-01', 'current_date': '2025-03-16',
        'planned_duration_days': 14, 'sample_size_per_variant': 10000,
        'current_samples_per_variant': 11000, 'num_variants': 4, 'alpha': 0.05
    },
    {
        'label': 'Valid test',
        'start_date': '2025-03-01', 'current_date': '2025-03-16',
        'planned_duration_days': 14, 'sample_size_per_variant': 10000,
        'current_samples_per_variant': 11000, 'num_variants': 2, 'alpha': 0.05
    },
]

for scenario in scenarios:
    label = scenario.pop('label')
    result = check_test_validity(scenario)
    print(f"\\n[{label}]")
    print(f"  Valid: {result['valid']}")
    for w in result['warnings']:
        print(f"  WARNING: {w}")
    print(f"  Adjusted alpha: {result['adjusted_alpha']}")`,
        hints: [
          'Use date.fromisoformat() to parse dates, then subtract to get a timedelta; access .days on it',
          'Bonferroni: divide alpha by the number of pairwise comparisons = num_variants - 1',
          'A test can be invalid for multiple reasons — collect all warnings before returning'
        ],
        expectedOutput: `[Too early — peeking]
  Valid: False
  WARNING: Test has only run 4 of 14 planned days. Do not read results yet.
  WARNING: Only 4,000 of 15,000 required samples collected per variant (27%). Continue collecting data.
  Adjusted alpha: 0.05

[Multi-variant without correction]
  Valid: False
  WARNING: Testing 4 variants requires Bonferroni correction. Use adjusted alpha 0.0167 instead of 0.05.
  Adjusted alpha: 0.0167

[Valid test]
  Valid: True
  Adjusted alpha: 0.05`,
        solution: `from datetime import date

def check_test_validity(test_metadata):
    warnings = []

    start = date.fromisoformat(test_metadata['start_date'])
    current = date.fromisoformat(test_metadata['current_date'])
    days_elapsed = (current - start).days
    planned = test_metadata['planned_duration_days']

    # Check 1: Duration
    if days_elapsed < planned:
        warnings.append(
            f"Test has only run {days_elapsed} of {planned} planned days. Do not read results yet."
        )

    # Check 2: Sample size
    current_n = test_metadata['current_samples_per_variant']
    required_n = test_metadata['sample_size_per_variant']
    if current_n < required_n:
        pct = int(current_n / required_n * 100)
        warnings.append(
            f"Only {current_n:,} of {required_n:,} required samples collected per variant ({pct}%). Continue collecting data."
        )

    # Check 3: Multiple comparisons
    num_variants = test_metadata['num_variants']
    alpha = test_metadata['alpha']
    adjusted_alpha = alpha

    if num_variants > 2:
        comparisons = num_variants - 1
        adjusted_alpha = round(alpha / comparisons, 4)
        warnings.append(
            f"Testing {num_variants} variants requires Bonferroni correction. Use adjusted alpha {adjusted_alpha} instead of {alpha}."
        )

    valid = len(warnings) == 0
    return {'valid': valid, 'warnings': warnings, 'adjusted_alpha': adjusted_alpha}`
      }
    ]
  },

  // ============================================================
  // MT-LAB-4: Customer Segmentation with ML (from martech-3)
  // ============================================================
  {
    id: 'mt-lab-4',
    roleId: 'marketing-technology-developer',
    level: 'senior',
    title: 'ML-Powered Customer Segmentation',
    description: 'Use machine learning to segment customers by behaviour using RFM analysis and K-Means clustering, then map segments to actionable marketing personas.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building an ML-powered segmentation model, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.12+, a virtual environment, and the pandas, numpy, and scikit-learn packages installed (`pip install pandas numpy scikit-learn`).',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.12+',
          'Run `pip install pandas numpy scikit-learn` then verify: `python -c "import pandas, numpy, sklearn; print(pandas.__version__)"`'
        ],
        expectedOutput: 'Python 3.12.x\npandas 2.x.x\nnumpy 1.x.x\nscikit-learn 1.x.x',
        solution: null
      },
      {
        title: 'Step 2: Engineer RFM Features',
        instruction: 'RFM (Recency, Frequency, Monetary) is the gold standard for customer segmentation in marketing. Recency measures how recently a customer purchased, Frequency measures how often they purchase, and Monetary measures how much they spend. Before clustering, normalise all features to the same scale — otherwise distance-based algorithms are dominated by the highest-magnitude feature.',
        starterCode: `# Customer Segmentation — Step 2: RFM Feature Engineering
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

random.seed(42)
np.random.seed(42)

# Simulate 200 customers with raw transaction records
reference_date = datetime(2025, 3, 1)
records = []
for cust_id in range(1, 201):
    n_orders = random.randint(1, 30)
    for _ in range(n_orders):
        days_ago = random.randint(1, 730)
        records.append({
            'customer_id': f'CUST-{cust_id:04d}',
            'order_date': reference_date - timedelta(days=days_ago),
            'order_value': round(random.uniform(10, 500), 2)
        })

df = pd.DataFrame(records)

# TODO: Compute RFM features from df
# Create a new DataFrame rfm with columns:
#   customer_id, recency_days, frequency, monetary_avg
# recency_days = (reference_date - most_recent_order_date).days
# frequency    = number of orders
# monetary_avg = average order value

def compute_rfm(transactions, ref_date):
    """Aggregate transactions into RFM features per customer."""
    # TODO
    pass

rfm = compute_rfm(df, reference_date)
print(f"Customers processed: {len(rfm)}")
print(rfm.describe().round(2))`,
        hints: [
          'Use groupby("customer_id").agg({...}) to compute all three features in one pass',
          'For recency: max("order_date") gives the most recent purchase; subtract from ref_date and use .days',
          'Use named aggregation: recency_days=("order_date", lambda x: (ref_date - x.max()).days)'
        ],
        expectedOutput: `Customers processed: 200
       recency_days   frequency  monetary_avg
count    200.000000  200.000000    200.000000
mean     ~180.00      ~15.50        ~255.00
std      ~...         ~...          ~...
min      ~1.00        ~1.00         ~10.00
max      ~729.00      ~30.00        ~500.00`,
        solution: `def compute_rfm(transactions, ref_date):
    rfm = transactions.groupby('customer_id').agg(
        recency_days=('order_date', lambda x: (ref_date - x.max()).days),
        frequency=('order_date', 'count'),
        monetary_avg=('order_value', 'mean')
    ).reset_index()
    return rfm

rfm = compute_rfm(df, reference_date)
print(f"Customers processed: {len(rfm)}")
print(rfm.describe().round(2))`
      },
      {
        title: 'Step 3: Cluster Customers with K-Means',
        instruction: 'K-Means groups customers into k clusters by minimising within-cluster sum of squared distances. Always standardise features with StandardScaler first so that recency_days (0-730 range) does not overshadow monetary_avg (10-500 range). Use k=4 for a classic high-value / loyal / at-risk / dormant segmentation. Set n_init=10 to avoid unstable random initialisations.',
        starterCode: `# Customer Segmentation — Step 3: K-Means Clustering
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

FEATURES = ['recency_days', 'frequency', 'monetary_avg']

# TODO: Implement cluster_customers(rfm, n_clusters=4)
# Steps:
#   1. Extract the feature matrix X from rfm[FEATURES]
#   2. Standardise X with StandardScaler (fit_transform)
#   3. Fit KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
#   4. Assign cluster labels back to rfm as column 'segment'
#   5. Return (rfm, scaler) — scaler is needed to score new customers later

def cluster_customers(rfm, n_clusters=4):
    # TODO
    pass

rfm, scaler = cluster_customers(rfm, n_clusters=4)

# Summarise each segment
summary = rfm.groupby('segment')[FEATURES].mean().round(1)
summary['count'] = rfm.groupby('segment').size()
print("\\nSegment Profiles (raw feature means):")
print(summary.to_string())`,
        hints: [
          'scaler = StandardScaler(); X_scaled = scaler.fit_transform(X) — fit only on training data',
          'KMeans(n_clusters=4, random_state=42, n_init=10).fit_predict(X_scaled) returns integer labels 0-3',
          'Return both rfm and scaler so you can transform new customer data for scoring later'
        ],
        expectedOutput: `Segment Profiles (raw feature means):
         recency_days  frequency  monetary_avg  count
segment
0              ~30.0       ~5.0        ~120.0     ~45
1             ~400.0       ~3.0         ~80.0     ~55
2              ~60.0      ~22.0        ~350.0     ~50
3             ~200.0      ~12.0        ~240.0     ~50`,
        solution: `from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

FEATURES = ['recency_days', 'frequency', 'monetary_avg']

def cluster_customers(rfm, n_clusters=4):
    X = rfm[FEATURES].values
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    rfm = rfm.copy()
    rfm['segment'] = kmeans.fit_predict(X_scaled)

    return rfm, scaler

rfm, scaler = cluster_customers(rfm, n_clusters=4)

summary = rfm.groupby('segment')[FEATURES].mean().round(1)
summary['count'] = rfm.groupby('segment').size()
print("\\nSegment Profiles (raw feature means):")
print(summary.to_string())`
      },
      {
        title: 'Step 4: Name Segments and Generate Campaign Briefs',
        instruction: 'Raw cluster numbers (0, 1, 2, 3) are meaningless to marketers. Map each cluster to a human-readable persona based on its RFM centroid: Champions (recent, frequent, high-value), Potential Loyalists (recent, moderate frequency), At-Risk (once loyal, now lapsing), and Dormant (not purchased in a long time). Then generate a campaign brief per persona so the marketing team can act on the data immediately.',
        starterCode: `# Customer Segmentation — Step 4: Persona Mapping and Campaign Briefs

CAMPAIGN_BRIEFS = {
    'Champions': {
        'message': 'Exclusive early access to new arrivals + loyalty reward',
        'channel': 'Email + SMS',
        'offer': 'VIP early access, no discount needed',
        'goal': 'Retain and grow advocacy via referral programme'
    },
    'Potential Loyalists': {
        'message': 'Welcome back — here is what is new for you',
        'channel': 'Email + retargeting ads',
        'offer': '10% off next purchase',
        'goal': 'Increase purchase frequency toward Champion tier'
    },
    'At-Risk': {
        'message': 'We miss you — a personal offer just for you',
        'channel': 'Email + SMS',
        'offer': '20% win-back discount, expires in 7 days',
        'goal': 'Re-activate before full churn'
    },
    'Dormant': {
        'message': 'A lot has changed — come see what is new',
        'channel': 'Email only (cost-effective for low-value segment)',
        'offer': '25% reactivation discount',
        'goal': 'Recover a subset; suppress the rest to protect sender reputation'
    },
}

def label_segments(rfm_with_segments):
    """
    Assign a persona name to each cluster based on its RFM centroid means.

    Heuristic rules:
    - Champions:          recency_days < 90  AND frequency > 15 AND monetary_avg > 200
    - Potential Loyalists: recency_days < 120 AND frequency <= 15
    - At-Risk:            90 <= recency_days < 365 AND frequency > 5
    - Dormant:            recency_days >= 365 OR frequency <= 2
    - General:            fallback for segments not matched above
    """
    centroids = rfm_with_segments.groupby('segment')[['recency_days', 'frequency', 'monetary_avg']].mean()

    # TODO: Build segment_map = {segment_id: persona_name} using the rules above
    segment_map = {}
    # TODO

    rfm_with_segments = rfm_with_segments.copy()
    rfm_with_segments['persona'] = rfm_with_segments['segment'].map(segment_map)
    return rfm_with_segments, segment_map

rfm, segment_map = label_segments(rfm)

print("Persona Distribution:")
print(rfm['persona'].value_counts().to_string())

print("\\n=== Campaign Briefs ===")
for persona, brief in CAMPAIGN_BRIEFS.items():
    count = (rfm['persona'] == persona).sum()
    if count > 0:
        print(f"\\n[{persona}] — {count} customers")
        for k, v in brief.items():
            print(f"  {k.title()}: {v}")`,
        hints: [
          'Iterate centroids.iterrows() and apply if/elif rules per row; store result in segment_map[seg_id]',
          'Order checks from most specific (Champions) to most general (Dormant) to avoid misclassification',
          'Default to "General" when none of the rules match so every segment is labelled'
        ],
        expectedOutput: `Persona Distribution:
Champions             ~50
Potential Loyalists   ~45
At-Risk               ~55
Dormant               ~50

=== Campaign Briefs ===

[Champions] — ~50 customers
  Message: Exclusive early access to new arrivals + loyalty reward
  Channel: Email + SMS
  ...`,
        solution: `def label_segments(rfm_with_segments):
    centroids = rfm_with_segments.groupby('segment')[['recency_days', 'frequency', 'monetary_avg']].mean()
    segment_map = {}

    for seg_id, row in centroids.iterrows():
        r = row['recency_days']
        f = row['frequency']
        m = row['monetary_avg']

        if r < 90 and f > 15 and m > 200:
            segment_map[seg_id] = 'Champions'
        elif r < 120 and f <= 15:
            segment_map[seg_id] = 'Potential Loyalists'
        elif 90 <= r < 365 and f > 5:
            segment_map[seg_id] = 'At-Risk'
        elif r >= 365 or f <= 2:
            segment_map[seg_id] = 'Dormant'
        else:
            segment_map[seg_id] = 'General'

    rfm_with_segments = rfm_with_segments.copy()
    rfm_with_segments['persona'] = rfm_with_segments['segment'].map(segment_map)
    return rfm_with_segments, segment_map

rfm, segment_map = label_segments(rfm)

print("Persona Distribution:")
print(rfm['persona'].value_counts().to_string())

print("\\n=== Campaign Briefs ===")
for persona, brief in CAMPAIGN_BRIEFS.items():
    count = (rfm['persona'] == persona).sum()
    if count > 0:
        print(f"\\n[{persona}] — {count} customers")
        for k, v in brief.items():
            print(f"  {k.title()}: {v}")`
      }
    ]
  },

  // ============================================================
  // MT-LAB-5: UTM Parameter Handler (from mt-4)
  // ============================================================
  {
    id: 'mt-lab-5',
    roleId: 'marketing-technology-developer',
    level: 'mid',
    title: 'UTM Attribution System',
    description: 'Build a robust UTM parameter capture, persistence, and multi-touch attribution system that correctly credits marketing channels for conversions across sessions.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a UTM attribution system, ensure your browser environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern browser (Chrome recommended) with DevTools open. This lab uses the built-in URL API, document.cookie, and localStorage — no Node.js or npm packages required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Open Chrome DevTools (F12) → Application tab to inspect cookies and localStorage',
          'In DevTools Console, run `new URL("https://example.com?utm_source=test").searchParams.get("utm_source")` to verify the URL API'
        ],
        expectedOutput: 'Chrome DevTools open\nURL API available: "test"\nlocalStorage and document.cookie accessible',
        solution: null
      },
      {
        title: 'Step 2: Parse UTM Parameters from URLs',
        instruction: 'UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content) are the universal standard for tagging marketing traffic. When a visitor arrives via a tagged URL, capture these parameters immediately — they disappear if the user navigates away. Parse them from window.location.href using the URL API, which automatically handles percent-encoded characters.',
        starterCode: `// UTM Attribution — Step 2: Parse UTM parameters from a URL

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

/**
 * parseUTM(url)
 * Parse UTM parameters from a URL string.
 * Returns an object with only the UTM keys that are present,
 * plus 'landing_page' (pathname) and 'captured_at' (ISO timestamp).
 * Returns null if no UTM parameters are found.
 */
function parseUTM(url) {
  // TODO:
  // 1. Create a URL object from the url string
  // 2. Iterate UTM_KEYS and collect non-null values
  // 3. If any UTM params exist, add landing_page and captured_at
  // 4. Return the object, or null if no UTM params were found
}

// Test with various URLs
const testURLs = [
  'https://example.com/landing?utm_source=google&utm_medium=cpc&utm_campaign=spring-sale&utm_content=hero-banner',
  'https://example.com/blog?utm_source=newsletter&utm_medium=email',
  'https://example.com/home',  // No UTM params
  'https://example.com/?utm_source=facebook&utm_medium=social&utm_campaign=brand%20awareness',  // Encoded
];

testURLs.forEach(url => {
  const result = parseUTM(url);
  console.log(new URL(url).pathname, '->', result ? JSON.stringify(result) : 'null (no UTM)');
});`,
        hints: [
          'new URL(url).searchParams.get("utm_source") returns null if the param is absent',
          'URLSearchParams.get() already decodes percent-encoding — no need for decodeURIComponent',
          'Only add landing_page and captured_at when hasUTM is true; return null for URLs with no UTM params'
        ],
        expectedOutput: `/landing -> {"utm_source":"google","utm_medium":"cpc","utm_campaign":"spring-sale","utm_content":"hero-banner","landing_page":"/landing","captured_at":"2025-..."}
/blog -> {"utm_source":"newsletter","utm_medium":"email","landing_page":"/blog","captured_at":"2025-..."}
/home -> null (no UTM)
/ -> {"utm_source":"facebook","utm_medium":"social","utm_campaign":"brand awareness","landing_page":"/","captured_at":"2025-..."}`,
        solution: `const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function parseUTM(url) {
  const parsed = new URL(url);
  const params = parsed.searchParams;
  const utm = {};
  let hasUTM = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value !== null) {
      utm[key] = value;
      hasUTM = true;
    }
  }

  if (!hasUTM) return null;

  utm.landing_page = parsed.pathname;
  utm.captured_at = new Date().toISOString();
  return utm;
}

testURLs.forEach(url => {
  const result = parseUTM(url);
  console.log(new URL(url).pathname, '->', result ? JSON.stringify(result) : 'null (no UTM)');
});`
      },
      {
        title: 'Step 3: Persist UTM Data Across Sessions',
        instruction: 'A visitor tagged with utm_source=google might not convert on their first visit. You must persist UTM data across sessions using localStorage. Two common attribution models: first-touch (the channel that first brought the user wins all credit) and last-touch (the most recent channel wins). Implement both models and always maintain a complete touch history for multi-touch attribution reporting.',
        starterCode: `// UTM Attribution — Step 3: Cross-session persistence

const STORAGE_KEY      = 'utm_first_touch';
const STORAGE_KEY_LAST = 'utm_last_touch';
const STORAGE_KEY_ALL  = 'utm_all_touches';

/**
 * storeUTM(utmData, model)
 * Persist UTM data using the specified attribution model.
 * model: 'first-touch' — only write if no existing first-touch data
 *        'last-touch'  — always overwrite with the newest touch
 * Both models append to the all-touches history.
 */
function storeUTM(utmData, model) {
  if (!utmData) return;
  // TODO: implement first-touch, last-touch, and append to STORAGE_KEY_ALL
}

/**
 * getAttribution()
 * Return { first_touch, last_touch, all_touches } read from localStorage.
 */
function getAttribution() {
  // TODO: parse each key from localStorage (default all_touches to [])
}

// Simulate a 3-visit customer journey
const visits = [
  parseUTM('https://shop.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand'),
  parseUTM('https://shop.com/?utm_source=newsletter&utm_medium=email&utm_campaign=weekly'),
  parseUTM('https://shop.com/?utm_source=facebook&utm_medium=social&utm_campaign=retargeting'),
];

localStorage.clear();

visits.forEach((utm, i) => {
  storeUTM(utm, 'first-touch');
  storeUTM(utm, 'last-touch');
  console.log('Visit ' + (i + 1) + ': ' + utm.utm_source + ' / ' + utm.utm_medium);
});

const attribution = getAttribution();
console.log('\\nFirst touch:', attribution.first_touch?.utm_source, '/', attribution.first_touch?.utm_medium);
console.log('Last touch: ', attribution.last_touch?.utm_source,  '/', attribution.last_touch?.utm_medium);
console.log('All touches:', attribution.all_touches.length);`,
        hints: [
          'localStorage.getItem() returns null when the key does not exist — guard with a null check before JSON.parse()',
          'First-touch: only call localStorage.setItem(STORAGE_KEY, ...) when localStorage.getItem(STORAGE_KEY) === null',
          'All-touches: retrieve the array, push the new item, then write back with JSON.stringify'
        ],
        expectedOutput: `Visit 1: google / cpc
Visit 2: newsletter / email
Visit 3: facebook / social

First touch: google / cpc
Last touch:  facebook / social
All touches: 3`,
        solution: `const STORAGE_KEY      = 'utm_first_touch';
const STORAGE_KEY_LAST = 'utm_last_touch';
const STORAGE_KEY_ALL  = 'utm_all_touches';

function storeUTM(utmData, model) {
  if (!utmData) return;

  // Always append to all-touches history (deduplicate by captured_at)
  const allTouches = JSON.parse(localStorage.getItem(STORAGE_KEY_ALL) || '[]');
  if (!allTouches.find(t => t.captured_at === utmData.captured_at && t.utm_source === utmData.utm_source && t.utm_medium === utmData.utm_medium)) {
    allTouches.push(utmData);
    localStorage.setItem(STORAGE_KEY_ALL, JSON.stringify(allTouches));
  }

  if (model === 'first-touch') {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(utmData));
    }
  } else if (model === 'last-touch') {
    localStorage.setItem(STORAGE_KEY_LAST, JSON.stringify(utmData));
  }
}

function getAttribution() {
  const firstRaw = localStorage.getItem(STORAGE_KEY);
  const lastRaw  = localStorage.getItem(STORAGE_KEY_LAST);
  const allRaw   = localStorage.getItem(STORAGE_KEY_ALL);
  return {
    first_touch: firstRaw ? JSON.parse(firstRaw) : null,
    last_touch:  lastRaw  ? JSON.parse(lastRaw)  : null,
    all_touches: allRaw   ? JSON.parse(allRaw)   : []
  };
}`
      },
      {
        title: 'Step 4: Enrich Conversion Events with Attribution Data',
        instruction: 'Attribution data is only valuable when attached to conversion events sent to your analytics backend or CRM. When a purchase, form submission, or sign-up occurs, enrich the event payload with first-touch and last-touch UTM data before sending it. This lets you calculate ROI per channel. After recording a conversion, clear stored UTM data so the next visit starts a fresh attribution journey.',
        starterCode: `// UTM Attribution — Step 4: Enrich conversion events

/**
 * enrichConversionEvent(eventData)
 * Attach UTM attribution to a conversion event payload.
 * Returns the enriched object ready to POST to /api/events.
 */
function enrichConversionEvent(eventData) {
  // TODO:
  // 1. Call getAttribution()
  // 2. If any attribution data exists, spread eventData and add 'attribution' key
  //    containing: first_touch, last_touch, all_touches, touch_count
  // 3. Return enriched event (or original if no attribution found)
}

/**
 * clearAttribution()
 * Remove all UTM data from localStorage.
 * Call this only AFTER the conversion event is successfully sent.
 */
function clearAttribution() {
  // TODO: remove STORAGE_KEY, STORAGE_KEY_LAST, and STORAGE_KEY_ALL
}

// Test the full flow
async function trackPurchase(orderId, amount, currency) {
  currency = currency || 'USD';
  const rawEvent = {
    event: 'purchase',
    order_id: orderId,
    amount: amount,
    currency: currency,
    timestamp: new Date().toISOString()
  };

  const enrichedEvent = enrichConversionEvent(rawEvent);
  console.log('Sending enriched event:');
  console.log(JSON.stringify(enrichedEvent, null, 2));

  // Simulate a successful API response
  clearAttribution();
  console.log('\\nAttribution cleared after conversion.');
  return enrichedEvent;
}

// Seed attribution data for the test
localStorage.clear();
storeUTM(parseUTM('https://shop.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand'), 'first-touch');
storeUTM(parseUTM('https://shop.com/?utm_source=facebook&utm_medium=social&utm_campaign=retargeting'), 'last-touch');

trackPurchase('ORDER-2025-001', 149.99);`,
        hints: [
          'Check if at least one of first_touch or last_touch is non-null before adding the attribution block',
          'touch_count = attribution.all_touches.length — number of sessions before conversion',
          'clearAttribution removes all three keys: STORAGE_KEY, STORAGE_KEY_LAST, STORAGE_KEY_ALL'
        ],
        expectedOutput: `Sending enriched event:
{
  "event": "purchase",
  "order_id": "ORDER-2025-001",
  "amount": 149.99,
  "currency": "USD",
  "timestamp": "2025-...",
  "attribution": {
    "first_touch": { "utm_source": "google", "utm_medium": "cpc", ... },
    "last_touch": { "utm_source": "facebook", "utm_medium": "social", ... },
    "all_touches": [...],
    "touch_count": 2
  }
}

Attribution cleared after conversion.`,
        solution: `function enrichConversionEvent(eventData) {
  const attribution = getAttribution();
  const hasAttribution = attribution.first_touch || attribution.last_touch || attribution.all_touches.length > 0;

  if (!hasAttribution) return eventData;

  return {
    ...eventData,
    attribution: {
      first_touch:  attribution.first_touch,
      last_touch:   attribution.last_touch,
      all_touches:  attribution.all_touches,
      touch_count:  attribution.all_touches.length
    }
  };
}

function clearAttribution() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(STORAGE_KEY_LAST);
  localStorage.removeItem(STORAGE_KEY_ALL);
}`
      }
    ]
  },

  // ============================================================
  // MT-LAB-6: Consent Management Module (from mt-5)
  // ============================================================
  {
    id: 'mt-lab-6',
    roleId: 'marketing-technology-developer',
    level: 'senior',
    title: 'GDPR Consent Management System',
    description: 'Build a production-grade cookie consent manager compliant with GDPR and CCPA that blocks third-party tracking scripts until user consent is explicitly granted.',
    estimatedMinutes: 20,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a GDPR consent management system, ensure your browser environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: a modern browser (Chrome recommended) with DevTools open. This lab uses the built-in DOM API and document.cookie — no Node.js or npm packages required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Open Chrome DevTools (F12) → Application tab → Cookies to inspect consent cookies',
          'In DevTools Console, run `document.cookie` to verify cookie access is available'
        ],
        expectedOutput: 'Chrome DevTools open\nCookies panel accessible in DevTools Application tab\ndocument.cookie API available',
        solution: null
      },
      {
        title: 'Step 2: Model Consent Categories and Cookie Persistence',
        instruction: 'GDPR requires granular consent: users must accept analytics cookies independently of marketing cookies. Define four standard categories (necessary, functional, analytics, marketing) where "necessary" is always on and cannot be rejected. Persist preferences in a cookie — not localStorage — because cookies can be scoped to the domain, sent server-side, and have an explicit expiry. Include a version string so you can re-prompt users when your cookie policy changes.',
        starterCode: `// Consent Management — Step 2: Categories and persistence

const CONSENT_CATEGORIES = {
  necessary:  { label: 'Necessary',  required: true,  default: true  },
  functional: { label: 'Functional', required: false, default: false },
  analytics:  { label: 'Analytics',  required: false, default: false },
  marketing:  { label: 'Marketing',  required: false, default: false },
};

const COOKIE_NAME    = 'cookie_consent';
const COOKIE_VERSION = '2.0';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * saveConsent(preferences)
 * Write consent preferences to a cookie with SameSite=Lax and a 1-year expiry.
 * Always force necessary=true. Include 'version' and 'updated_at' in the payload.
 */
function saveConsent(preferences) {
  // TODO: JSON.stringify, encodeURIComponent, then set document.cookie
}

/**
 * loadConsent()
 * Parse the consent cookie.
 * Returns null if the cookie is missing OR if the stored version does not match COOKIE_VERSION.
 */
function loadConsent() {
  // TODO: read document.cookie, find COOKIE_NAME row, parse and validate version
}

/**
 * hasConsented()
 * Returns true if the user has made a consent choice for the current policy version.
 */
function hasConsented() {
  return loadConsent() !== null;
}

// Test round-trip
saveConsent({ necessary: true, functional: false, analytics: true, marketing: false });
const loaded = loadConsent();
console.log('Loaded consent:', JSON.stringify(loaded));
console.log('Has consented:', hasConsented());
console.log('Analytics allowed:', loaded?.analytics);
console.log('Marketing allowed:', loaded?.marketing);`,
        hints: [
          'document.cookie = "name=value; max-age=...; path=/; SameSite=Lax" — each attribute separated by semicolons',
          'To read: document.cookie.split("; ").find(row => row.startsWith(COOKIE_NAME + "="))?.split("=")[1]',
          'JSON.stringify the payload, encodeURIComponent before writing; decodeURIComponent then JSON.parse when reading'
        ],
        expectedOutput: `Loaded consent: {"necessary":true,"functional":false,"analytics":true,"marketing":false,"version":"2.0","updated_at":"2025-..."}
Has consented: true
Analytics allowed: true
Marketing allowed: false`,
        solution: `const CONSENT_CATEGORIES = {
  necessary:  { label: 'Necessary',  required: true,  default: true  },
  functional: { label: 'Functional', required: false, default: false },
  analytics:  { label: 'Analytics',  required: false, default: false },
  marketing:  { label: 'Marketing',  required: false, default: false },
};

const COOKIE_NAME    = 'cookie_consent';
const COOKIE_VERSION = '2.0';
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60;

function saveConsent(preferences) {
  const final = { ...preferences, necessary: true };
  const payload = encodeURIComponent(JSON.stringify({
    ...final,
    version: COOKIE_VERSION,
    updated_at: new Date().toISOString()
  }));
  document.cookie = COOKIE_NAME + '=' + payload + '; max-age=' + COOKIE_MAX_AGE + '; path=/; SameSite=Lax';
}

function loadConsent() {
  const raw = document.cookie
    .split('; ')
    .find(row => row.startsWith(COOKIE_NAME + '='))
    ?.split('=')[1];

  if (!raw) return null;

  try {
    const data = JSON.parse(decodeURIComponent(raw));
    if (data.version !== COOKIE_VERSION) return null;
    return data;
  } catch {
    return null;
  }
}

function hasConsented() {
  return loadConsent() !== null;
}`
      },
      {
        title: 'Step 3: Block and Conditionally Load Tracking Scripts',
        instruction: 'The most critical GDPR requirement is that tracking scripts must not load until the user has consented to their category. Implement a script registry: when a script is registered, check if its category is already allowed — if yes, inject it immediately; if not, queue it. When consent is granted, drain the queue for newly allowed categories. This ensures GA4, Meta Pixel, and HubSpot only fire after explicit consent.',
        starterCode: `// Consent Management — Step 3: Consent-gated script loading

class ConsentManager {
  constructor() {
    this.consent = loadConsent();
    this.pendingScripts = []; // Array of { category, src, attributes }
    this.listeners = [];
  }

  isAllowed(category) {
    if (CONSENT_CATEGORIES[category]?.required) return true;
    return this.consent?.[category] === true;
  }

  /**
   * registerScript(category, src, attributes)
   * Load the script immediately if category is allowed; otherwise queue it.
   */
  registerScript(category, src, attributes) {
    attributes = attributes || {};
    // TODO
  }

  /**
   * _injectScript(src, attributes)
   * Create a <script> element with async=true, set src and any extra attributes,
   * then append it to document.head.
   */
  _injectScript(src, attributes) {
    // TODO
  }

  /**
   * _drainPendingScripts()
   * Inject any queued scripts whose category is now allowed; keep the rest queued.
   */
  _drainPendingScripts() {
    // TODO: filter pendingScripts — inject allowed ones (return false), keep blocked ones (return true)
  }

  _applyConsent(preferences) {
    saveConsent(preferences);
    this.consent = loadConsent();
    this.listeners.forEach(cb => cb(this.consent));
    this._drainPendingScripts();
  }

  acceptAll() {
    const prefs = Object.fromEntries(Object.keys(CONSENT_CATEGORIES).map(k => [k, true]));
    this._applyConsent(prefs);
  }

  rejectAll() {
    const prefs = Object.fromEntries(
      Object.entries(CONSENT_CATEGORIES).map(([k, v]) => [k, v.required])
    );
    this._applyConsent(prefs);
  }

  onChange(callback) {
    this.listeners.push(callback);
  }
}

// Test the script blocking behaviour
const cm = new ConsentManager();

cm.registerScript('analytics', 'https://www.googletagmanager.com/gtag/js?id=GA_ID');
cm.registerScript('marketing', 'https://connect.facebook.net/en_US/fbevents.js');
console.log('Scripts pending before consent:', cm.pendingScripts.length); // expected: 2

cm.onChange(prefs => {
  console.log('Consent changed — analytics:', prefs.analytics, '| marketing:', prefs.marketing);
});
cm.acceptAll();
console.log('Scripts pending after acceptAll:', cm.pendingScripts.length); // expected: 0`,
        hints: [
          'registerScript: if this.isAllowed(category) call _injectScript(); else push to this.pendingScripts',
          '_injectScript: createElement("script"), set .src and .async = true, setAttribute for extra attrs, appendChild to document.head',
          '_drainPendingScripts: this.pendingScripts = this.pendingScripts.filter(item => { if allowed, inject and return false; else return true })'
        ],
        expectedOutput: `Scripts pending before consent: 2
Consent changed — analytics: true | marketing: true
Scripts pending after acceptAll: 0`,
        solution: `class ConsentManager {
  constructor() {
    this.consent = loadConsent();
    this.pendingScripts = [];
    this.listeners = [];
  }

  isAllowed(category) {
    if (CONSENT_CATEGORIES[category]?.required) return true;
    return this.consent?.[category] === true;
  }

  registerScript(category, src, attributes) {
    attributes = attributes || {};
    if (this.isAllowed(category)) {
      this._injectScript(src, attributes);
    } else {
      this.pendingScripts.push({ category, src, attributes });
    }
  }

  _injectScript(src, attributes) {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    Object.entries(attributes).forEach(function(entry) {
      script.setAttribute(entry[0], entry[1]);
    });
    document.head.appendChild(script);
    console.log('Injected script:', src);
  }

  _drainPendingScripts() {
    const self = this;
    this.pendingScripts = this.pendingScripts.filter(function(item) {
      if (self.isAllowed(item.category)) {
        self._injectScript(item.src, item.attributes);
        return false;
      }
      return true;
    });
  }

  _applyConsent(preferences) {
    saveConsent(preferences);
    this.consent = loadConsent();
    this.listeners.forEach(cb => cb(this.consent));
    this._drainPendingScripts();
  }

  acceptAll() {
    const prefs = Object.fromEntries(Object.keys(CONSENT_CATEGORIES).map(k => [k, true]));
    this._applyConsent(prefs);
  }

  rejectAll() {
    const prefs = Object.fromEntries(
      Object.entries(CONSENT_CATEGORIES).map(([k, v]) => [k, v.required])
    );
    this._applyConsent(prefs);
  }

  onChange(callback) {
    this.listeners.push(callback);
  }
}`
      },
      {
        title: 'Step 4: Handle Preference Updates and Consent Withdrawal',
        instruction: 'GDPR requires that withdrawing consent be as easy as giving it. Implement savePreferences() for partial acceptance — users must be able to enable analytics without enabling marketing. Also implement a renderBanner() method using safe DOM construction (createElement and textContent, not innerHTML with dynamic content) that presents Accept All, Reject All, and category-level controls. Show the banner on every page load until the user makes a choice.',
        starterCode: `// Consent Management — Step 4: Preference updates and banner

// Extend ConsentManager with savePreferences
ConsentManager.prototype.savePreferences = function(preferences) {
  /**
   * Accept partial preferences (only the categories the user explicitly toggled).
   * Always enforce required categories = true.
   * Merge with existing consent so unmentioned categories keep their current value.
   */
  // TODO
};

// Extend ConsentManager with renderBanner
ConsentManager.prototype.renderBanner = function() {
  /**
   * Build a consent banner using safe DOM methods (createElement + textContent).
   * IMPORTANT: Do not use innerHTML with dynamic/user-controlled content —
   * construct each element individually to prevent XSS.
   *
   * The banner must contain:
   *   - A description paragraph
   *   - "Accept All" button   → this.acceptAll() + remove banner
   *   - "Reject All" button   → this.rejectAll() + remove banner
   *   - One checkbox per non-required category (label set via textContent)
   *   - "Save Preferences" button → reads checkboxes, calls this.savePreferences() + remove banner
   */
  // TODO
};

// Test savePreferences
const cm2 = new ConsentManager();
cm2.savePreferences({ analytics: true, marketing: false });
const updated = loadConsent();
console.log('After partial acceptance:');
console.log('  necessary:', updated.necessary);  // true (required)
console.log('  analytics:', updated.analytics);  // true
console.log('  marketing:', updated.marketing);  // false

// Test renderBanner — only show if the user has not yet consented
if (!hasConsented()) {
  cm2.renderBanner();
  console.log('Banner rendered — awaiting user choice');
} else {
  console.log('User has already consented — no banner needed');
}`,
        hints: [
          'savePreferences: merge { ...this.consent } with incoming preferences, force required categories to true, then call _applyConsent()',
          'renderBanner: build all text with element.textContent = "..." — never set innerHTML with values that include user or URL data',
          'In Save Preferences handler: collect checkbox.checked values into a prefs object, then call this.savePreferences(prefs) and banner.remove()'
        ],
        expectedOutput: `After partial acceptance:
  necessary: true
  analytics: true
  marketing: false
User has already consented — no banner needed`,
        solution: `ConsentManager.prototype.savePreferences = function(preferences) {
  const current = this.consent || {};
  const merged = Object.assign({}, current, preferences);

  // Enforce required categories
  Object.entries(CONSENT_CATEGORIES).forEach(function(entry) {
    if (entry[1].required) merged[entry[0]] = true;
  });

  this._applyConsent(merged);
};

ConsentManager.prototype.renderBanner = function() {
  const self = this;
  const nonRequired = Object.entries(CONSENT_CATEGORIES).filter(function(e) { return !e[1].required; });

  // Build banner container
  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:2px solid #333;padding:16px 24px;z-index:9999;font-family:sans-serif;box-shadow:0 -2px 8px rgba(0,0,0,0.15);';

  // Description
  const desc = document.createElement('p');
  desc.style.margin = '0 0 12px';
  desc.textContent = 'We use cookies to improve your experience and for marketing analytics. Choose your preferences below.';
  banner.appendChild(desc);

  // Button row
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;align-items:center;';
  banner.appendChild(row);

  const removeBanner = function() { banner.remove(); };

  // Accept All button
  const acceptBtn = document.createElement('button');
  acceptBtn.textContent = 'Accept All';
  acceptBtn.style.cssText = 'padding:8px 16px;background:#333;color:#fff;border:none;border-radius:4px;cursor:pointer;';
  acceptBtn.addEventListener('click', function() { self.acceptAll(); removeBanner(); });
  row.appendChild(acceptBtn);

  // Reject All button
  const rejectBtn = document.createElement('button');
  rejectBtn.textContent = 'Reject All';
  rejectBtn.style.cssText = 'padding:8px 16px;background:#fff;color:#333;border:1px solid #333;border-radius:4px;cursor:pointer;';
  rejectBtn.addEventListener('click', function() { self.rejectAll(); removeBanner(); });
  row.appendChild(rejectBtn);

  // Category checkboxes
  const checkboxes = {};
  nonRequired.forEach(function(entry) {
    const key = entry[0];
    const cfg = entry[1];
    const label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:4px;cursor:pointer;';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'cb-' + key;
    checkbox.checked = !!(self.consent && self.consent[key]);
    checkboxes[key] = checkbox;

    const span = document.createElement('span');
    span.textContent = cfg.label;

    label.appendChild(checkbox);
    label.appendChild(span);
    row.appendChild(label);
  });

  // Save Preferences button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Preferences';
  saveBtn.style.cssText = 'padding:8px 16px;background:#0066cc;color:#fff;border:none;border-radius:4px;cursor:pointer;margin-left:auto;';
  saveBtn.addEventListener('click', function() {
    const prefs = {};
    Object.keys(checkboxes).forEach(function(key) { prefs[key] = checkboxes[key].checked; });
    self.savePreferences(prefs);
    removeBanner();
  });
  row.appendChild(saveBtn);

  document.body.appendChild(banner);
};`
      }
    ]
  }
];
