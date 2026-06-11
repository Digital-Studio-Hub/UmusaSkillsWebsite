# Umusa Skills Website - Google Cloud Run Deployment Guide

## Overview

This guide provides step-by-step instructions for deploying the Umusa Skills Website to Google Cloud Run with proper configuration, email integration, and domain management through Cloudflare.

## Architecture & Key Fixes

This deployment addresses three critical issues from previous failed attempts:

### 1. **Vite Import Chain Issue** ✅ FIXED
**Problem:** `server/vite.ts` was importing `vite.config.ts` at the top level, causing esbuild to bundle `vite` (and all its dependencies) into the production bundle, even though it's only used in development.

**Solution:** Changed all vite imports to use dynamic `await import()` calls that execute only in development mode.

### 2. **reusePort Socket Option** ✅ FIXED
**Problem:** The server was using `reusePort: true`, which is not supported in Google Cloud Run's sandboxed environment, causing port binding failures.

**Solution:** Added `DISABLE_REUSE_PORT` environment variable (set to `true` in Dockerfile) that disables this option in production.

### 3. **Production Dependency Bundling** ✅ FIXED
**Problem:** The multi-stage build wasn't properly isolating production dependencies from dev-only packages.

**Solution:** Implemented a proper two-stage Docker build:
- **Stage 1 (Builder):** Installs all dependencies and builds the application
- **Stage 2 (Production):** Only installs production dependencies using `npm ci --omit=dev`

## Prerequisites

- Google Cloud Project with billing enabled
- Google Cloud CLI (`gcloud`) installed locally
- Docker installed (for local testing)
- GitHub repository for source code
- Cloudflare account for DNS management
- Inbound.new account for email delivery

## Step 1: Prepare Your Local Environment

### 1.1 Install Dependencies

```bash
npm ci
```

### 1.2 Get Your Inbound.new API Key

1. Go to [https://inbound.new/settings](https://inbound.new/settings)
2. Click "Create API Key"
3. Give it a name (e.g., "Umusa Skills Website")
4. Copy the API key
5. Add it to `.env` locally for testing

```bash
echo "INBOUND_API_KEY=your_key_here" >> .env.local
```

### 1.3 Test Locally

```bash
# Start dev server
npm run dev

# In another terminal, test the contact endpoint
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "2712345678",
    "course": "TEFL"
  }'
```

## Step 2: Build and Test Docker Locally

### 2.1 Build the Docker Image

```bash
docker build -t umusa-skills-website:latest .
```

### 2.2 Run the Container Locally

```bash
# Without email (to test server startup)
docker run -it -p 8080:8080 \
  -e PORT=8080 \
  -e DISABLE_REUSE_PORT=true \
  -e NODE_ENV=production \
  umusa-skills-website:latest

# With email enabled (for full testing)
docker run -it -p 8080:8080 \
  -e PORT=8080 \
  -e DISABLE_REUSE_PORT=true \
  -e NODE_ENV=production \
  -e INBOUND_API_KEY=your_key_here \
  umusa-skills-website:latest
```

### 2.3 Verify the Container

```bash
# Test the health endpoint
curl http://localhost:8080/health

# Test the contact endpoint
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "2712345678",
    "course": "TEFL"
  }'

# Test static assets
curl http://localhost:8080/
```

## Step 3: Push to Google Container Registry

### 3.1 Authenticate with Google Cloud

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 3.2 Set Up Docker Authentication

```bash
gcloud auth configure-docker gcr.io
```

### 3.3 Build and Push the Image

```bash
# Build with gcr.io tag
docker build -t gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest

# Alternatively, use Cloud Build (recommended for CI/CD)
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest
```

## Step 4: Deploy to Google Cloud Run

### 4.1 First Deployment

```bash
gcloud run deploy umusa-skills-website \
  --image gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60 \
  --max-instances 10 \
  --set-env-vars "NODE_ENV=production,DISABLE_REUSE_PORT=true"
```

### 4.2 Add Secrets

After the first deployment, add your Inbound.new API key:

```bash
# Using Secret Manager (recommended)
echo -n "your_inbound_api_key_here" | gcloud secrets create inbound-api-key --data-file=-

# Update the Cloud Run service to use the secret
gcloud run services update umusa-skills-website \
  --region us-central1 \
  --set-secrets INBOUND_API_KEY=inbound-api-key:latest
```

Or add directly as an environment variable (less secure):

```bash
gcloud run services update umusa-skills-website \
  --region us-central1 \
  --set-env-vars "INBOUND_API_KEY=your_key_here"
```

### 4.3 Verify Deployment

```bash
# Get the service URL
gcloud run services describe umusa-skills-website --region us-central1

# Test the deployed service
curl https://umusa-skills-website-xxxxx.run.app/health
```

## Step 5: Set Up Custom Domain with Cloudflare

### 5.1 Add Custom Domain to Cloud Run

```bash
gcloud run domain-mappings create \
  --service umusa-skills-website \
  --domain yourdomain.co.za \
  --region us-central1
```

Or through the Google Cloud Console:
1. Go to Cloud Run → Select service → Set up custom domain
2. Enter your domain
3. Cloud Run will provide a verification token

### 5.2 Configure Cloudflare DNS

1. Log in to Cloudflare
2. Go to your domain's DNS settings
3. Add a CNAME record:
   - **Name:** `www` (or your subdomain)
   - **Target:** The Cloud Run service URL (from step 4.3)
   - **TTL:** Auto
   - **Proxy status:** Proxied (orange cloud)
4. For root domain, use an ALIAS record if Cloudflare supports it, or CNAME flattening

### 5.3 SSL/TLS Configuration

Cloudflare automatically handles SSL/TLS:
1. In Cloudflare, go to SSL/TLS → Overview
2. Ensure "Full" or "Full (strict)" mode is selected
3. Wait for certificate provisioning (usually within minutes)

## Step 6: Continuous Deployment (CI/CD)

### 6.1 GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

env:
  REGION: us-central1
  SERVICE_NAME: umusa-skills-website
  REGISTRY: gcr.io

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: ${{ secrets.GCP_PROJECT_ID }}
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          export_default_credentials: true

      - name: Configure Docker for GCR
        run: gcloud auth configure-docker gcr.io

      - name: Build Docker image
        run: |
          docker build -t ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:${{ github.sha }} .
          docker tag ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:${{ github.sha }} \
                     ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:latest

      - name: Push to Container Registry
        run: |
          docker push ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:${{ github.sha }}
          docker push ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ${{ env.SERVICE_NAME }} \
            --image ${{ env.REGISTRY }}/${{ secrets.GCP_PROJECT_ID }}/${{ env.SERVICE_NAME }}:${{ github.sha }} \
            --region ${{ env.REGION }} \
            --platform managed \
            --allow-unauthenticated
```

### 6.2 Set up GitHub Secrets

In GitHub repository settings, add:
- `GCP_PROJECT_ID`: Your Google Cloud Project ID
- `GCP_SA_KEY`: Service account JSON key (from Google Cloud)

## Monitoring & Debugging

### View Logs

```bash
# Stream recent logs
gcloud run services logs read umusa-skills-website --limit 100 --region us-central1

# View logs in Cloud Logging
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=umusa-skills-website" \
  --limit 100 \
  --format json
```

### Common Issues & Solutions

#### Container fails to start with "Failed to listen on PORT 8080"
- Ensure `DISABLE_REUSE_PORT=true` is set
- Check that `server/vite.ts` uses dynamic imports only
- Verify health check endpoint exists at `/health`

#### "Cannot find package 'vite'"
- Ensure `server/vite.ts` uses `await import()` for vite
- Confirm `vite` is NOT in the build.ts allowlist

#### Email not sending
- Verify `INBOUND_API_KEY` is set correctly
- Check Cloud Logging for "INBOUND_API_KEY not found" warning
- Confirm inbound.new API key hasn't expired

#### Static files returning 404
- Ensure `public/` directory exists after build
- Check that `npm run build` completed successfully
- Verify Dockerfile copies `dist/public` correctly

### Performance Optimization

```bash
# Update Cloud Run memory and CPU for better performance
gcloud run services update umusa-skills-website \
  --region us-central1 \
  --memory 1Gi \
  --cpu 2

# Set up autoscaling
gcloud run services update umusa-skills-website \
  --region us-central1 \
  --min-instances 0 \
  --max-instances 20
```

## Backup & Disaster Recovery

```bash
# Export service configuration
gcloud run services describe umusa-skills-website \
  --region us-central1 \
  --format yaml > umusa-skills-service-backup.yaml

# View image history
gcloud container images list-tags gcr.io/YOUR_PROJECT_ID/umusa-skills-website

# Rollback to previous image
gcloud run deploy umusa-skills-website \
  --image gcr.io/YOUR_PROJECT_ID/umusa-skills-website:previous_sha \
  --region us-central1
```

## Cleaning Up

```bash
# Delete the Cloud Run service
gcloud run services delete umusa-skills-website --region us-central1

# Delete the container image
gcloud container images delete gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest

# Delete the domain mapping
gcloud run domain-mappings delete yourdomain.co.za
```

## Next Steps

1. ✅ Commit all changes to GitHub
2. ✅ Set up GitHub Actions for continuous deployment
3. ✅ Monitor Cloud Run logs for any issues
4. ✅ Test contact form functionality end-to-end
5. ✅ Set up Cloudflare rate limiting and WAF rules
6. ✅ Enable Cloud Run advanced monitoring

## Support & Resources

- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Inbound.new Documentation](https://inbound.new/docs)
- [Cloudflare DNS Management](https://developers.cloudflare.com/dns/)
- [Project Repository](https://github.com/yourusername/umusa-skills-website)

---

**Last Updated:** June 2024
**Tested On:** Node 20 Alpine, Google Cloud Run
