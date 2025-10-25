# 🌳 PinMind Git Workflow Guide

**Repository**: https://github.com/hhalilikurnaz/pinmind-web  
**Date Established**: October 25, 2025  
**Status**: ✅ Active

---

## 📋 Branch Structure

### `main` — Production Branch 🔒
- **Purpose**: Stable, production-ready code
- **Protection**: Protected branch (no direct pushes)
- **Updates**: Only via Pull Requests from `dev`
- **Status**: Currently at commit `27cae0f`

### `dev` — Development Branch 🚀
- **Purpose**: Active development and testing
- **Protection**: Open for direct commits
- **Updates**: All feature development happens here
- **Status**: Currently tracking `origin/dev`

### `backup/landing-v1` — Safety Backup 🛡️
- **Purpose**: Frozen snapshot for emergency rollback
- **Protection**: Read-only (do not modify)
- **Updates**: Never (permanent safety copy)
- **Status**: Preserved at initial project state

---

## 🔄 Daily Workflow

### 1. Starting Work (Always on `dev`)

```bash
# Make sure you're on dev branch
git checkout dev

# Get latest changes from remote
git pull origin dev

# Verify you're on dev
git branch --show-current  # Should output: dev
```

### 2. Making Changes

```bash
# Make your code changes in VS Code

# Check what changed
git status

# Stage your changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"
```

### 3. Pushing Changes

```bash
# Push to dev branch
git push origin dev
```

---

## 🔀 Merging to Production

### When Ready to Deploy

1. **Test Everything** on `dev` branch
2. **Create Pull Request** on GitHub:
   - Go to: https://github.com/hhalilikurnaz/pinmind-web/pulls
   - Click "New Pull Request"
   - Base: `main` ← Compare: `dev`
   - Add description of changes
   - Submit PR

3. **Review and Merge**:
   - Check all changes carefully
   - Merge PR into `main`
   - Delete remote branch after merge (optional)

4. **Sync Local Main**:
```bash
git checkout main
git pull origin main
git checkout dev
```

---

## 🚨 Emergency Rollback

### If Something Breaks in Production

```bash
# Option 1: Rollback to backup
git checkout backup/landing-v1
git checkout -b emergency-fix
# Fix issue, then merge

# Option 2: Revert last commit on main
git checkout main
git revert HEAD
git push origin main
```

---

## 📝 Commit Message Guidelines

### Format
```
<type>: <short description>

<detailed description if needed>
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Build process or auxiliary tool changes

### Examples
```bash
git commit -m "feat: add prototype animation timeline"
git commit -m "fix: resolve Team section visibility issue"
git commit -m "docs: update README with deployment instructions"
```

---

## 🛠️ Useful Commands

### Check Current Status
```bash
# Which branch am I on?
git branch --show-current

# What changed?
git status

# View commit history
git log --oneline -10
```

### Branch Operations
```bash
# List all branches
git branch -a

# Switch branches
git checkout main
git checkout dev

# Create new feature branch from dev
git checkout dev
git checkout -b feature/new-feature
```

### Syncing
```bash
# Get latest from remote
git fetch origin

# Pull changes
git pull origin dev

# Push changes
git push origin dev
```

---

## 🔐 Branch Protection Rules

### Main Branch (`main`)
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ❌ Allow force pushes: **Disabled**
- ❌ Allow deletions: **Disabled**

### Dev Branch (`dev`)
- ✅ Allow direct pushes
- ✅ Allow force pushes (use carefully!)
- ✅ Continuous integration testing

### Backup Branch (`backup/landing-v1`)
- 🔒 **Read-only** — Never modify
- 🔒 **No force pushes**
- 🔒 **No deletions**

---

## 📊 Current Repository State

```
Repository Structure:
├── main (protected, production)
├── dev (active development) ⭐ YOU ARE HERE
└── backup/landing-v1 (frozen snapshot)

Remote: https://github.com/hhalilikurnaz/pinmind-web.git
Local Path: /Users/halilibrahimkurnaz/Desktop/mobil/pinmind-web

Latest Commit on Main:
27cae0f - fix: update scroll timeline ranges for Prototype & Vision visibility
```

---

## 🎯 Quick Reference Card

| Task | Command |
|------|---------|
| Check current branch | `git branch --show-current` |
| Switch to dev | `git checkout dev` |
| Stage all changes | `git add .` |
| Commit changes | `git commit -m "message"` |
| Push to dev | `git push origin dev` |
| Get latest changes | `git pull origin dev` |
| View status | `git status` |
| View history | `git log --oneline -5` |

---

## 🆘 Troubleshooting

### Forgot which branch I'm on?
```bash
git branch --show-current
```

### Accidentally committed to wrong branch?
```bash
# Undo last commit (keeps changes)
git reset --soft HEAD~1

# Switch to correct branch
git checkout dev

# Commit again
git add .
git commit -m "message"
```

### Need to discard local changes?
```bash
# Discard all uncommitted changes
git reset --hard HEAD

# Discard specific file
git checkout -- filename.js
```

### Merge conflict?
```bash
# After resolving conflicts in VS Code
git add .
git commit -m "merge: resolve conflicts"
git push origin dev
```

---

## 📞 Support

- **GitHub Issues**: https://github.com/hhalilikurnaz/pinmind-web/issues
- **Documentation**: See all `*.md` files in repository root

---

**Remember**: Always work on `dev` branch for daily development! 🚀
