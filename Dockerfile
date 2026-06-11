# Dockerfile for Umusa Skills Website - Google Cloud Run Deployment
# Multi-stage build to minimize production image size

# Stage 1: Builder
# Install all dependencies and build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY postcss.config.js ./


# Copy source code
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY script ./script
COPY components.json ./
COPY drizzle.config.ts ./
COPY vite-plugin-meta-images.ts ./
COPY attached_assets ./attached_assets

# Install all dependencies (including dev)
RUN npm ci

# Build the application
# This runs: vite build (client) + esbuild (server)
RUN npm run build

# Stage 2: Production Runtime
# Minimal image with only production dependencies
FROM node:20-alpine

WORKDIR /app

# Set production environment flags
ENV NODE_ENV=production
ENV PORT=8080
ENV DISABLE_REUSE_PORT=true

# Copy package files for dependency installation
COPY package*.json ./

# Install only production dependencies
# This excludes devDependencies like vite, typescript, etc.
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Health check to help Cloud Run understand container status
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Cloud Run requires the container to listen on the port defined by the PORT environment variable
# Default to 8080
EXPOSE 8080

# Start the production server
CMD ["node", "dist/index.cjs"]
