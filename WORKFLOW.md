# 🌳 MyRoute Branching & Workflow Guide

## Branch Structure

```
main (production) ← Deploy from here
├── juan (Juan's development)
└── russty (Russty's development)
```

---

## 📋 Branches Explained

### `main` Branch (Production/Unified)
- **Purpose**: Stable, production-ready code
- **Who uses it**: Nobody works directly on this
- **Deployments**: 
  - Netlify deploys from `main`
  - Railway deploys from `main`
- **Updates**: Only through Pull Requests from `juan` or `russty`

### `juan` Branch (Juan's Development)
- **Purpose**: Juan's active development work
- **Who uses it**: Juan works here
- **Workflow**: 
  1. Juan makes changes on `juan` branch
  2. Commits and pushes to `juan`
  3. Creates PR to merge into `main`
  4. After review/approval, merges to `main`

### `russty` Branch (Russty's Development)
- **Purpose**: Russty's active development work
- **Who uses it**: Russty works here
- **Workflow**: 
  1. Russty makes changes on `russty` branch
  2. Commits and pushes to `russty`
  3. Creates PR to merge into `main`
  4. After review/approval, merges to `main`

---

## 🚀 Daily Workflow

### For Juan:

```bash
# 1. Make sure you're on your branch
git checkout juan

# 2. Pull latest changes
git pull origin juan

# 3. Make your changes, edit files, etc.

# 4. Stage your changes
git add .

# 5. Commit with a clear message
git commit -m "Add feature: description of what you did"

# 6. Push to your branch
git push origin juan

# 7. When ready to merge to main, create a Pull Request on GitHub
# Go to: https://github.com/juanjobarroeta/myroute/compare/main...juan
```

### For Russty:

```bash
# 1. Make sure you're on your branch
git checkout russty

# 2. Pull latest changes
git pull origin russty

# 3. Make your changes, edit files, etc.

# 4. Stage your changes
git add .

# 5. Commit with a clear message
git commit -m "Add feature: description of what you did"

# 6. Push to your branch
git push origin russty

# 7. When ready to merge to main, create a Pull Request on GitHub
# Go to: https://github.com/juanjobarroeta/myroute/compare/main...russty
```

---

## 🔄 Merging to Production (main)

### Option 1: Pull Request (Recommended)

1. **Push your branch** to GitHub
2. **Go to GitHub**: https://github.com/juanjobarroeta/myroute
3. **Click "Pull requests"** → **"New pull request"**
4. **Base**: `main` | **Compare**: `juan` or `russty`
5. **Click "Create pull request"**
6. **Add description** of what changed
7. **Request review** from the other person
8. **After approval**, click **"Merge pull request"**
9. **Auto-deploys** to Netlify & Railway! 🎉

### Option 2: Direct Merge (Quick, but be careful)

```bash
# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge your branch (replace 'juan' with 'russty' if you're Russty)
git merge juan

# Push to main (triggers auto-deploy)
git push origin main
```

---

## 🔄 Staying in Sync

### Sync your branch with main:

If `main` has new changes that you want in your branch:

```bash
# On your branch (juan or russty)
git checkout juan  # or russty

# Pull latest from main
git pull origin main

# If there are conflicts, resolve them, then:
git add .
git commit -m "Merge main into juan"

# Push updated branch
git push origin juan
```

---

## 🎯 Quick Commands Reference

```bash
# See all branches
git branch -a

# Switch branches
git checkout main
git checkout juan
git checkout russty

# See current branch
git branch

# See what changed
git status

# See commit history
git log --oneline

# Undo uncommitted changes
git checkout -- filename.js

# Pull latest changes from current branch
git pull

# Push changes to current branch
git push
```

---

## 🚦 Git Status Guide

```bash
# Run this anytime to see what's happening
git status
```

**What you'll see:**
- `modified:` - File was changed
- `new file:` - File was added
- `deleted:` - File was removed
- `Untracked files:` - New files not tracked by git

---

## ⚠️ Important Rules

1. **Never work directly on `main`** - Always use your branch
2. **Always pull before you push** - Avoids conflicts
3. **Commit often** - Small commits are easier to manage
4. **Write clear commit messages** - "Fixed bug" ❌ | "Fix login button not working" ✅
5. **Test before merging to main** - Main should always work
6. **Communicate** - Let each other know before big changes

---

## 🆘 Help! Something Went Wrong

### "I'm on the wrong branch!"

```bash
# Save your changes
git stash

# Switch to correct branch
git checkout juan

# Get your changes back
git stash pop
```

### "Merge conflict!"

1. Open the conflicted file
2. Look for `<<<<<<`, `======`, `>>>>>>` markers
3. Decide which code to keep
4. Remove the markers
5. Save the file
6. Run:
   ```bash
   git add .
   git commit -m "Resolve merge conflict"
   git push
   ```

### "I committed to the wrong branch!"

```bash
# Copy the commit hash (first 7 characters)
git log --oneline

# Switch to correct branch
git checkout juan

# Apply the commit
git cherry-pick COMMIT_HASH

# Switch back and undo on wrong branch
git checkout main
git reset --hard HEAD~1
```

### "I need to undo my last commit!"

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit AND discard changes (careful!)
git reset --hard HEAD~1
```

---

## 📞 Communication Workflow

### Before Starting New Feature:

1. **Check with your partner**: "I'm working on [feature]"
2. **Pull latest**: `git pull origin main`
3. **Create branch from main** (if needed): `git checkout -b feature-name`

### Before Merging to Main:

1. **Test thoroughly**: Make sure everything works
2. **Notify your partner**: "I'm merging [feature] to main"
3. **Create Pull Request**: Let partner review
4. **Merge after approval**

---

## 🎊 Quick Start for New Contributors

```bash
# Clone the repo
git clone https://github.com/juanjobarroeta/myroute.git
cd myroute

# See all branches
git branch -a

# Switch to your branch
git checkout juan  # or russty

# Install backend dependencies
cd backend
npm install

# Create .env file and configure
cp .env.example .env
# Edit .env with your MongoDB URI, etc.

# Start backend
npm run dev

# In another terminal, start frontend
cd ..
python3 -m http.server 8000

# Open browser to http://localhost:8000
```

---

## 🔐 Setting Up Collaboration

### Add Russty as Collaborator:

1. **Go to**: https://github.com/juanjobarroeta/myroute/settings/access
2. **Click**: "Add people"
3. **Enter**: `RusstySlice`
4. **Select role**: "Write" (can push to branches)
5. **Send invitation**

### Russty Accepts:

1. Check email for invitation
2. Click "Accept invitation"
3. Clone the repo:
   ```bash
   git clone https://github.com/juanjobarroeta/myroute.git
   cd myroute
   git checkout russty
   ```

---

## 📈 Pro Tips

- **Use descriptive branch names**: `feature/add-login`, `bugfix/map-loading`
- **Commit messages template**: `[type]: description`
  - `feat: Add user profile page`
  - `fix: Resolve map loading issue`
  - `docs: Update README`
  - `style: Format code`
- **Pull often**: Stay up to date with main
- **Push often**: Don't lose your work
- **Test locally**: Before pushing to main
- **Use .gitignore**: Don't commit secrets or node_modules

---

## 🎯 Current Setup Status

✅ **Branches Created:**
- `main` - Production branch
- `juan` - Juan's development
- `russty` - Russty's development

✅ **Deployment:**
- Configure Netlify to deploy from `main`
- Configure Railway to deploy from `main`
- Every merge to `main` triggers auto-deploy

✅ **Ready to Work:**
- Both can work independently
- Merge to main when ready
- Auto-deploys on merge

---

**Happy coding! 🚀**

Questions? Check this guide or ask your coding partner!

