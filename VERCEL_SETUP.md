# Vercel Deployment Setup Guide

This guide will help you connect your SkiApp web landing page to Vercel and configure the `getalpline.com` domain.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Access to your `getalpline.com` domain DNS settings
3. GitHub repository connected to Vercel

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your `alpline-web` repository from GitHub
4. Vercel will auto-detect Next.js framework

## Step 2: Configure Build Settings

Vercel should auto-detect Next.js, but verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (or `alpline-web` if in monorepo)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm ci` (recommended)

## Step 3: Set Environment Variables

In Vercel project settings → Environment Variables, add:

```
NEXT_PUBLIC_APP_URL=https://getalpline.com
```

If using Mapbox:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## Step 4: Configure Domain (getalpline.com)

### Option A: Add Domain in Vercel Dashboard

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter `getalpline.com`
4. Vercel will provide DNS records to add

### Option B: Configure DNS Records

Add these DNS records to your domain registrar:

**For getalpline.com (Apex Domain):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www.getalpline.com (Subdomain):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Or use Vercel's nameservers (recommended):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Option C: Redirect www to non-www (or vice versa)

In Vercel project settings → Domains:
- Add both `getalpline.com` and `www.getalpline.com`
- Set one as primary and redirect the other

## Step 5: Configure GitHub Secrets

For CI/CD workflows, add these secrets in GitHub repository settings:

1. Go to Settings → Secrets and variables → Actions
2. Add the following secrets:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

To get these values:
- **VERCEL_TOKEN**: Vercel Dashboard → Settings → Tokens → Create Token
- **VERCEL_ORG_ID**: Found in Vercel project settings URL or API
- **VERCEL_PROJECT_ID**: Found in Vercel project settings → General

## Step 6: Enable Vercel Features

In Vercel project settings, enable:

1. **Analytics**: Project Settings → Analytics → Enable
2. **Speed Insights**: Project Settings → Speed Insights → Enable
3. **Preview Deployments**: Automatically enabled for PRs

## Step 7: Test Deployment

1. Push to `main` branch - Vercel will auto-deploy
2. Check deployment in Vercel dashboard
3. Visit https://getalpline.com to verify
4. Check SSL certificate (should be automatic)

## Step 8: Verify Configuration

After deployment, verify:

- [ ] Site loads at https://getalpline.com
- [ ] SSL certificate is valid (green lock icon)
- [ ] www.getalpline.com redirects to getalpline.com (or vice versa)
- [ ] All environment variables are set
- [ ] Analytics and Speed Insights are working
- [ ] Preview deployments work for PRs

## Troubleshooting

### Domain Not Resolving

1. Wait 24-48 hours for DNS propagation
2. Check DNS records are correct
3. Verify domain is added in Vercel dashboard
4. Check domain status in Vercel dashboard

### SSL Certificate Issues

1. Vercel automatically provisions SSL certificates
2. Wait a few minutes after adding domain
3. Check SSL status in Vercel dashboard → Domains

### Build Failures

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Test build locally: `npm run build`
4. Check Node.js version (should be 20.x)

### Environment Variables Not Working

1. Ensure variables start with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding new environment variables
3. Check variable names match exactly (case-sensitive)

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Custom Domain Setup](https://vercel.com/docs/concepts/projects/domains)

## CI/CD Workflow

The repository includes GitHub Actions workflows for:
- Automated testing on PRs
- Automated deployment to Vercel on push to main
- Code review automation with Claude

Workflows are configured in `.github/workflows/`:
- `test.yml` - Runs tests, linting, and type checking
- `deploy-vercel.yml` - Deploys to Vercel production
