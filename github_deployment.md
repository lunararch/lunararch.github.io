# GitHub Deployment Guide

This guide explains how to deploy your portfolio website to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer

## Steps to Deploy

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click on the "+" icon in the top right corner and select "New repository"
3. Name your repository `username.github.io` (replace "username" with your actual GitHub username)
4. Make the repository public
5. Click "Create repository"

### 2. Initialize Git in Your Local Project

```bash
# Navigate to your portfolio directory
cd /path/to/portfolio

# Initialize Git repository
git init

# Add all files to staging
git add .

# Commit the files
git commit -m "Initial commit"
```

### 3. Connect Local Repository to GitHub

```bash
# Add the remote repository
git remote add origin https://github.com/username/username.github.io.git

# Push to GitHub
git push -u origin main
```

Note: If your default branch is "master" instead of "main", use:
```bash
git push -u origin master
```

### 4. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the branch you pushed to (main or master)
5. Click "Save"

Your site will be published at `https://username.github.io`

## Updating Your Website

Whenever you make changes to your portfolio, follow these steps to update your live site:

```bash
# Add all changed files
git add .

# Commit the changes
git commit -m "Description of changes"

# Push to GitHub
git push origin main
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Purchase a domain from a domain registrar
2. In your GitHub repository, go to Settings > GitHub Pages
3. Under "Custom domain", enter your domain name
4. Click "Save"
5. Configure your domain's DNS settings according to GitHub's instructions

## Troubleshooting

- If your site isn't displaying correctly, check the GitHub Pages section in repository settings for any error messages
- Ensure all file paths in your HTML are relative, not absolute
- Make sure all resources (CSS, JS, images) are properly linked

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-github-pages-sites)
