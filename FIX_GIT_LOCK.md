# Fix Git Config Lock Error

## The Problem
Git config file is locked: `.git/config: File exists`

## Solution - Run These Commands:

1. **Remove the lock file:**
```bash
rm -f .git/config.lock
```

2. **If that doesn't work, remove other lock files:**
```bash
rm -f .git/index.lock
rm -f .git/HEAD.lock
```

3. **Now add your remote:**
```bash
git remote add origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git
```

4. **Check if remote was added:**
```bash
git remote -v
```

5. **Stage and commit your files:**
```bash
git add .
git commit -m "Complete DSA Learning Platform with single-command setup"
```

6. **Push to GitHub:**
```bash
git push -u origin main
```

## Alternative Method (if locks persist):

Create a fresh Git repository:
```bash
# Remove existing git folder
rm -rf .git

# Initialize fresh git repo
git init

# Configure your account
git config user.name "rameshkumarkoyya"
git config user.email "rameshkumarkoyya@outlook.com"

# Add remote
git remote add origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git

# Add, commit and push
git add .
git commit -m "Complete DSA Learning Platform with single-command setup"
git branch -M main
git push -u origin main
```

Your Git configuration looks correct:
- user.email=rameshkumarkoyya@outlook.com
- user.name=rameshkumarkoyya