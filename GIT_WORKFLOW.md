# 🧩 PinMind GitHub Workflow — Protected DevOps Flow

## 🌱 Overview
This document defines how development, refactoring, and deployment are managed in the **PinMind Web Repository**.
It ensures stable collaboration between developers, prevents merge conflicts, and maintains a clean Git history.

---

## 🧠 Branch Structure
| Branch | Purpose | Rules |
|---------|----------|--------|
| `main` | Production branch (live & stable version). | ❌ No direct commits. Only Pull Requests (PRs) from `dev` allowed. |
| `dev` | Active development branch. | ✅ All new features, fixes, and refactors happen here. |
| `backup/landing-v1` | Archive of older production versions. | 🛡 Used for rollbacks or version comparison. |

---

## ⚙️ Commit Rules
1. Always work in `dev` unless instructed otherwise.  
2. Use clear and consistent commit messages:
   - `feat:` for new features → `feat: add cinematic debug overlay`
   - `fix:` for bug fixes → `fix: restore prototype visibility`
   - `refactor:` for code restructuring → `refactor: split landingPage components`
   - `docs:` for documentation → `docs: update README`
   - `chore:` for small maintenance tasks → `chore: organize assets folder`
3. Avoid committing large unrelated changes at once.
4. Run lint/build tests before pushing.

---

## 🔄 Pull Request (PR) Workflow
1. Complete changes in `dev`.
2. Push your branch → `origin/dev`.
3. Open a Pull Request from `dev` → `main`.
4. Wait for checks to pass (build/test).
5. Review and approve.
6. Merge only via **“Merge pull request”** → **Confirm merge**.
7. Delete merged branches if no longer needed.

---

## 🧩 Backup & Refactor Strategy
Before large refactors:
```bash
git checkout -b backup/refactor-<date>
git push origin backup/refactor-<date>
Then safely refactor in dev.

🤖 Copilot Instructions
Copilot must:

Never commit or push directly to main.

Always push to dev after successful build.

Suggest PR creation from dev → main after all tests pass.

Create backup branches automatically when running large refactors.

Maintain file and folder structure integrity.

🛡 Branch Protection Summary
✅ main is protected — no direct pushes
✅ dev is open for active development
✅ Backups are manual and safe
✅ All merges go through PR approval

Author: @hhalilikurnaz
Maintained by: PinMind Core Dev Team
Last Updated: Oct 25, 2025