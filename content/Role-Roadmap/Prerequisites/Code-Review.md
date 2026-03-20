# Code Review


Code review is a shared responsibility. A good review improves quality, spreads knowledge, and catches issues before they reach production. This guide covers what to write in a PR, what to look for as a reviewer, and how to give and receive feedback effectively.

---

## Writing a Good Pull Request

A PR description is not optional. It exists so reviewers understand the context without reading every line of code.

**A good PR description includes:**

- **What** was changed and why.
- **How** to test or verify the change.
- Any **known limitations** or follow-up work.
- A link to the related issue or ticket if your team uses one.

**Example structure:**

```
## What
Added a login button to the navigation bar. Routes to /login on click.

## Why
Required by feature #123 – User Authentication.

## How to test
1. Run the app locally.
2. Confirm the login button appears in the nav.
3. Click it and verify redirect to /login.

## Notes
The button is hidden on mobile for now — tracked in #145.
```

Keep PRs small. A PR that changes one thing is easier to review than one that changes ten. If a PR is growing large, split it.

---

## What Reviewers Check

### Correctness
- Does the code do what it is supposed to do?
- Are edge cases handled?
- Are there obvious bugs or off-by-one errors?

### Security
- Is user input validated and sanitised?
- Are secrets or credentials hardcoded anywhere?
- Does the change introduce any OWASP-class vulnerability (injection, broken auth, exposed data)?

### Readability
- Is the code easy to understand without excessive comments?
- Are names clear and consistent with the rest of the codebase?
- Is the logic straightforward, or unnecessarily complex?

### Tests
- Are there tests covering the new behaviour?
- Do existing tests still pass?
- Are the tests meaningful, or do they only test happy paths?

### Design
- Does the change fit the existing architecture?
- Is there duplication that could be avoided?
- Are responsibilities clearly separated?

---

## Review Etiquette

**As a reviewer:**
- Comment on the code, not the person.
- Distinguish between blocking issues and suggestions. Use prefixes like `Blocking:` or `Suggestion:` if it helps.
- Ask questions before assuming. "Why is this done this way?" is better than "This is wrong."
- Approve promptly. Do not let PRs sit unreviewed for more than one working day.

**As the author:**
- Do not take comments personally. They are about the code.
- Respond to every comment — either with a fix or a clear explanation.
- Resolve comments after addressing them so reviewers know what is done.
- Do not push unrelated changes to a PR under review.

---

## Checklist Before Requesting Review

- [ ] The PR description is complete.
- [ ] The related issue or ticket is linked, if applicable.
- [ ] The code builds and tests pass locally.
- [ ] There are no leftover debug logs, commented-out code, or TODO items that were not intentional.
- [ ] New functionality has tests.
- [ ] Secrets or credentials are not committed.
- [ ] The branch is up to date with master/main.

---

## Related

- [Branching Strategy](Branching-Strategy.md)
- [Git Collaboration Workflow](Git-Collaboration-Workflow.md)
