# Umusa Skills Website - Google Cloud Run Deployment
## Quick Reference Guide

### ✅ What Was Fixed & Configured

**3 Critical Issues from Previous Failed Deployments - ALL FIXED:**

1. **Vite Import Chain Bug** ✅
   - **Was:** `server/vite.ts` imported vite at the top level, causing esbuild to bundle vite into production code
   - **Now:** All vite imports use `await import()` - only loads in development
   - **Impact:** Eliminates "Cannot find package 'vite'" errors at Cloud Run startup

2. **reusePort Socket Option Incompatibility** ✅
   - **Was:** `httpServer.listen({reusePort: true})` not supported in Cloud Run sandbox
   - **Now:** Controlled by `DISABLE_REUSE_PORT` environment variable
   - **Impact:** Server now binds to port 8080 correctly on Cloud Run

3. **Dev Dependencies in Production Image** ✅
   - **Was:** Multi-stage Docker build wasn't properly isolating dependencies
   - **Now:** Stage 2 uses `npm ci --omit=dev` (no vite, typescript, etc.)
   - **Impact:** Production image is lean and startup is fast

### 📦 What Was Added

**Email System (inbound.new):**
- ✅ `server/email.ts` - Email sending with inbound.new SDK
- ✅ `POST /api/contact` - Contact form API endpoint
- ✅ `GET /health` - Health check for Cloud Run monitoring
- ✅ Contact form confirmation & admin notification emails

**Docker & Deployment:**
- ✅ `Dockerfile` - Multi-stage production build
- ✅ `.dockerignore` - Optimized Docker build context
- ✅ `.env.example` - Environment variable reference
- ✅ `CLOUD_RUN_DEPLOYMENT.md` - Complete deployment guide

**Code Updates:**
- ✅ `server/vite.ts` - Dynamic vite imports
- ✅ `server/index.ts` - DISABLE_REUSE_PORT support + error handling
- ✅ `server/routes.ts` - /api/contact endpoint + validation
- ✅ `client/.../ContactForm.tsx` - Real API integration
- ✅ `script/build.ts` - inboundemail in bundled deps
- ✅ `package.json` - inboundemail dependency added

### 🚀 Deployment Steps (Summary)

```bash
# 1. Get Inbound.new API Key
# Visit: https://inbound.new/settings
# Create API Key → Copy value

# 2. Set up Google Cloud
gcloud config set project YOUR_PROJECT_ID
gcloud auth configure-docker gcr.io

# 3. Build and Push to Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest

# 4. Deploy to Cloud Run
gcloud run deploy umusa-skills-website \
  --image gcr.io/YOUR_PROJECT_ID/umusa-skills-website:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --timeout 60

# 5. Add API Key Secret
echo -n "YOUR_INBOUND_API_KEY" | gcloud secrets create inbound-api-key --data-file=-

gcloud run services update umusa-skills-website \
  --region us-central1 \
  --set-secrets INBOUND_API_KEY=inbound-api-key:latest

# 6. Set up Custom Domain with Cloudflare
# In Cloud Run Console: Add custom domain → yourdomain.co.za
# In Cloudflare: Add CNAME record → Cloud Run service URL
```

### 📋 Files Changed

**Modified (6):**
- `server/index.ts` - Error handling + DISABLE_REUSE_PORT
- `server/vite.ts` - Dynamic imports for vite modules
- `server/routes.ts` - Added /api/contact and /health endpoints
- `script/build.ts` - Added inboundemail to allowlist (removed nodemailer)
- `client/src/components/forms/ContactForm.tsx` - Real API calls
- `package.json` & `package-lock.json` - Added inboundemail dependency

**Created (5):**
- `Dockerfile` - Multi-stage production build
- `.dockerignore` - Build optimization
- `.env.example` - Environment reference
- `server/email.ts` - Email service layer
- `CLOUD_RUN_DEPLOYMENT.md` - Complete guide

### ✨ Key Features

| Feature | Status | Details |
|---------|--------|---------|
| Dynamic vite imports | ✅ | Zero vite references in production |
| reusePort handling | ✅ | Conditional based on environment |
| Health check endpoint | ✅ | `/health` for Cloud Run monitoring |
| Email integration | ✅ | inbound.new SDK (replacing zeptomail) |
| Contact form API | ✅ | Full validation + error handling |
| Multi-stage Docker | ✅ | Lean production image |
| Error logging | ✅ | Detailed server startup errors |
| Environment variables | ✅ | Proper secret management support |

### 🔍 Verification Checklist

Before deploying:
- ☑️ Build completes: `npm run build` ✅
- ☑️ No vite in bundle: No "Cannot find package 'vite'" errors
- ☑️ Health endpoint works: `GET /health` → `{"status": "healthy"}`
- ☑️ Contact endpoint works: `POST /api/contact` → Sends emails
- ☑️ All code pushed to GitHub ✅
- ☑️ INBOUND_API_KEY secret created in Cloud Run

### ⚙️ Environment Variables (Cloud Run)

**Required:**
- `INBOUND_API_KEY` - Secret from inbound.new

**Auto-Set by Dockerfile:**
- `PORT=8080` - Cloud Run requirement
- `DISABLE_REUSE_PORT=true` - Cloud Run compatibility
- `NODE_ENV=production` - Production mode

### 🎯 Next Steps

1. **Verify the API key is set:**
   ```bash
   gcloud run services describe umusa-skills-website \
     --region us-central1 | grep -i secrets
   ```

2. **Test the deployed service:**
   ```bash
   curl https://umusa-skills-website-xxxxx.run.app/health
   ```

3. **Set up Cloudflare:**
   - Enable proxying (orange cloud)
   - Set SSL/TLS to "Full (strict)"
   - Enable security features as needed

4. **Monitor in Cloud Run:**
   - Logs: `gcloud run services logs read umusa-skills-website`
   - Traffic: Cloud Run Console → Metrics
   - Errors: Cloud Logging

### 📞 Support Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [inbound.new API Docs](https://inbound.new/docs)
- [Cloudflare DNS Guide](https://developers.cloudflare.com/dns/)
- [GitHub Repository](https://github.com/Digital-Studio-Hub/UmusaSkillsWebsite)

---

## Summary

✅ **All 3 critical issues from previous Cloud Run failures have been fixed**
✅ **Complete email integration implemented with inbound.new**
✅ **Production-ready Dockerfile with multi-stage build**
✅ **All code committed and pushed to GitHub**
✅ **Comprehensive deployment guide included**

**You're ready to deploy to Google Cloud Run!**
