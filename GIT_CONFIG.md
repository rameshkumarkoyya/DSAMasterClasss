# Configure Git with Your GitHub Account

## Set Your GitHub Credentials

Run these commands to configure Git with your GitHub account:

```bash
# Set your GitHub username
git config --global user.name "rameshkumarkoyya"

# Set your GitHub email (use the email associated with your GitHub account)
git config --global user.email "your-email@example.com"
```

## Check Current Configuration

To see current Git configuration:
```bash
git config --list
```

## Complete Setup Sequence

1. **Configure Git with your credentials:**
```bash
git config --global user.name "rameshkumarkoyya"
git config --global user.email "your-github-email@example.com"
```

2. **Remove existing remote and add your repository:**
```bash
git remote remove origin
git remote add origin https://github.com/rameshkumarkoyya/DSAMasterClasss.git
```

3. **Add, commit and push:**
```bash
git add .
git commit -m "Complete DSA Learning Platform with single-command setup"
git branch -M main
git push -u origin main
```

## Authentication

When you push, GitHub will ask for authentication:
- **Username:** rameshkumarkoyya
- **Password:** Use a Personal Access Token (not your GitHub password)

### To create a Personal Access Token:
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select "repo" permissions
4. Copy the token and use it as your password when pushing

## Replace Email

Make sure to replace "your-github-email@example.com" with the actual email address associated with your GitHub account.