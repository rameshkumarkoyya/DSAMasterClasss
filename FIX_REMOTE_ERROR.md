# Fix Remote URL Error

## The Error You're Seeing:
```
Error (UNKNOWN) adding origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git as a remote.
```

## Solution - Try These Commands:

### Option 1: Remove existing origin and add new one
```bash
git remote remove origin
git remote add origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git
```

### Option 2: Set the URL directly
```bash
git remote set-url origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git
```

### Option 3: Check current remotes first
```bash
git remote -v
```
This shows existing remotes. If you see an origin already, use Option 1 or 2.

## Complete Push Sequence:
```bash
# Fix the remote
git remote remove origin
git remote add origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git

# Add and commit files
git add .
git commit -m "Complete DSA Learning Platform with single-command setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

## If Still Getting Errors:
1. Make sure the repository exists on GitHub
2. Check you have write access to the repository
3. Verify the URL is correct (note: your repo name has "DSAMasterClasss" with double 's')

Your repository URL: https://github.com/rameshkumarkoyya/DSAMasterClasss.git