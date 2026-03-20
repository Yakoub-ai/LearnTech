# Branching Strategy


All Tech-Hubben projects follow Release Flow as the standard branching strategy. It is a form of trunk-based development.

---

## Core Rules

- Do not commit directly to master/main. Direct commits should be blocked by branch protection rules.
- All code changes go through short-lived feature branches.
- Feature branches should have one developer working on them over a few days at most.
- Merge to master/main via pull requests only.
- Never hotfix directly on a release branch. Create a branch from master/main, fix it there, open a PR to master/main, then cherry-pick the change to the release branch.

---

## Branch Naming

Use the following format:

```
<type>/<id>/<short-description>
```

Where `<id>` refers to the related issue, ticket, or planning item ID.

**Examples:**

```
feature/123/add-login-button
refactor/123/cleaned-up-user-controller
bugfix/123/fix-calculation-error-in-currency-utils
release/M21
```

---

## Release Flow

Release Flow is the recommended strategy. Releases are made from dedicated release branches.

| Branch | Deploys to |
|---|---|
| Feature branch | Dynamic feature environment |
| Pull Request | Dynamic feature environment (removed on PR completion) |
| master/main | Test, then Stage |
| release branch | Test, then Stage, then Production |

Reference: [Trunk Based Development](https://trunkbaseddevelopment.com/)

---

## Release from Trunk

An alternative strategy where every commit to master/main triggers a release. Recommended for NuGet packages and applications approved for Continuous Deployment.

| Branch | Deploys to |
|---|---|
| Feature branch | Dynamic feature environment |
| Pull Request | Dynamic feature environment (removed on PR completion) |
| master/main | Stage, then Production |

For NuGet packages specifically:

| Branch | Deploys to |
|---|---|
| Feature branch | nuget-release-candidates (Nexus) |
| master/main | nuget-releases (Nexus) |

---

## Pull Requests

- Enable automatic merge as soon as the pull request is ready, if your platform supports it.
- Use Merge without fast forward.
- Enable deletion of the source branch on completion.

---

## Branch Protection (master/main)

Enforce the following protections on the master/main branch:

1. Prevent direct commits to master/main.
2. Require pull requests to link to the relevant issue or ticket when your team uses one.
3. Require all PR comments to be resolved before merge.

---

## Comparison

| | Release Flow | Release from Trunk |
|---|---|---|
| Trunk based | Yes | Yes |
| Has release branch | Yes | No |
| Release from | release branch | master/main |
| All commits to master/main released | No | Yes |
| Version in Production | Latest commit in release branch | Latest commit in master/main |
| Rollback strategy | Roll forward | Roll forward |
