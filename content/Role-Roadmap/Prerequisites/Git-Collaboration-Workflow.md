# Git Collaboration Workflow

This guide covers a platform-neutral day-to-day workflow for collaborating on code with Git. It applies whether your repository is hosted on GitHub, GitLab, Bitbucket, or another Git platform. It assumes Git is installed and configured — see [Git Setup](git.md) if not.

---

## Cloning a Repository

1. Open the repository in your Git hosting platform.
2. Copy the HTTPS or SSH clone URL.
3. In a terminal, run:

```bash
git clone <repository-url>
cd <repository-folder>
```

If you receive a TLS/SSL error, see the [Git Setup](git.md) page for troubleshooting.

---

## Creating a Branch

Always branch from `master`/`main`. Never commit directly to `master`/`main`.

```bash
git checkout master
git pull
git checkout -b feature/123/add-login-button
```

Follow the naming convention from the [Branching Strategy](Branching-Strategy.md):

```
<type>/<id>/<short-description>
```

Where `<id>` is the related issue, ticket, or planning item ID.

Types: `feature`, `bugfix`, `refactor`, `release`

---

## Making Commits

Stage your changes and commit with a clear, descriptive message:

```bash
git add <file>
git commit -m "Add login button to navigation bar"
```

Keep commits focused. One logical change per commit.

If your team uses ticket or issue references in commit messages, include the ID:

```bash
git commit -m "Add login button #123"
```

---

## Pushing and Opening a Pull Request

Push your branch to the remote:

```bash
git push -u origin feature/123/add-login-button
```

Then in your Git hosting platform:

1. Open a new pull request or merge request.
2. Set the source branch to your feature branch and the target to `master`/`main`.
3. Fill in the title and description (see [Code Review](Code-Review.md) for description standards).
4. Link the related ticket or issue if your team uses one.
5. Add reviewers.
6. Enable automatic completion/merge when checks pass if your platform supports it.
7. Enable deletion of the source branch on completion if your platform supports it.

---

## Linking Related Work

If your team tracks work in Jira, GitHub Issues, GitLab Issues, Linear, or another system, link the relevant item to the pull request so reviewers can see the context and trace the change back to the request.

---

## Reviewing a Pull Request

When assigned as a reviewer:

1. Open the pull request.
2. Review each changed file.
3. Leave comments on specific lines where needed.
4. Mark files as reviewed if your platform supports it.
5. Approve, request changes, or leave suggestions.

See [Code Review](Code-Review.md) for what to look for when reviewing.

---

## Responding to Feedback

When you receive review comments on your pull request:

- Address each comment with a code change or a reply explaining why no change is needed.
- Resolve comments after addressing them.
- Push new commits to the same branch so the pull request updates automatically.
- Re-request review once all comments are resolved.

---

## Completing a Pull Request

Once approved and all required checks pass:

1. Merge the pull request.
2. Prefer the merge strategy defined by your team.
3. Delete the source branch after merge unless there is a clear reason to keep it.

---

## Keeping Your Branch Up to Date

If `master`/`main` has moved ahead while you are working on your branch, rebase or merge to bring in the latest changes:

```bash
git fetch origin
git rebase origin/master
```

Resolve any conflicts, then continue:

```bash
git rebase --continue
git push --force-with-lease
```

---

## Related

- [Git Setup](git.md)
- [Branching Strategy](Branching-Strategy.md)
- [Code Review](Code-Review.md)
