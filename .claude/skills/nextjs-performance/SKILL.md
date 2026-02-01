## name: nextjs-vercel-performance-expert
description: Expert in Next.js 14+ App Router optimization, Vercel deployment, performance tuning, and production best practices for SkiApp web landing page. Focuses on achieving optimal Lighthouse scores and Core Web Vitals.
allowed-tools: Read, Grep, Glob, Bash(npm:test), Bash(npm run build), Bash(npm run lint), Bash(npx next:*)

# SkiApp Web Next.js & Vercel Performance Skill

This skill governs the performance optimization, deployment configuration, and production best practices for the Next.js landing page deployed on Vercel.

## Overview

The landing page must load quickly, perform well on all devices, and maintain excellent Core Web Vitals scores. It should leverage Next.js App Router features and Vercel's edge network for optimal global performance.

**Technology Stack:**

* **Framework**: Next.js 14.2.7 with App Router
* **Deployment**: Vercel (automatic deployments)
* **Domain**: skimate.app (configured in Vercel)
* **Styling**: Tailwind CSS
* **Components**: Radix UI, Framer Motion
* **Maps**: Mapbox GL JS

## Implementation Standards

### 1. Next.js App Router Optimization

**Location**: `src/app/` directory structure

* [ ] **Server Components**: Use Server Components by default. Only add `'use client'` when necessary:
  - Client-side interactivity (onClick, useState, useEffect)
  - Browser-only APIs (window, document, localStorage)
  - Third-party libraries that require client-side rendering
  - Framer Motion animations (requires client)

* [ ] **Image Optimization**: Always use `next/image`:
  - Configure `remotePatterns` in `next.config.mjs` for external images
  - Use appropriate `width` and `height` props to prevent layout shift
  - Use `priority` prop for above-the-fold images (hero image)
  - Use `loading="lazy"` for below-the-fold images
  - Provide `alt` text for all images

* [ ] **Font Optimization**: Use `next/font` for custom fonts:
  - Already using Inter font - ensure proper configuration
  - Use `display: 'swap'` to prevent FOIT (Flash of Invisible Text)
  - Preload font files for critical text

* [ ] **Dynamic Imports**: Lazy load heavy components:
  - Mapbox map components (use `next/dynamic` with `ssr: false`)
  - Heavy animations or third-party widgets
  - Components below the fold

### 2. Vercel Deployment Configuration

**Location**: `vercel.json` (if needed) and Vercel dashboard

* [ ] **Domain Configuration**: Configure in Vercel dashboard:
  - Primary domain: `skimate.app`
  - Redirect `www.skimate.app` to `skimate.app` (or vice versa)
  - Ensure SSL/TLS is enabled (automatic with Vercel)

* [ ] **Environment Variables**: Store in Vercel dashboard:
  - `NEXT_PUBLIC_APP_URL`: https://skimate.app
  - `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox access token (if used)
  - Any API keys or secrets (never commit to repo)

* [ ] **Build Settings**: Configure in Vercel:
  - Framework Preset: Next.js
  - Build Command: `npm run build` (default)
  - Output Directory: `.next` (default)
  - Install Command: `npm ci` (for faster, reliable installs)

* [ ] **Preview Deployments**: Enable preview deployments for:
  - All pull requests (automatic)
  - Branch deployments for staging/testing

### 3. Performance Optimization

**Location**: `next.config.mjs` and component files

* [ ] **Bundle Analysis**: Use `@next/bundle-analyzer` to monitor bundle size:
  - Keep main bundle under 200KB gzipped
  - Identify and split large dependencies
  - Use dynamic imports for code splitting

* [ ] **Static Generation**: Prefer Static Site Generation (SSG):
  - Landing page should be fully static
  - Use `generateStaticParams` for dynamic routes (if any)
  - Export static pages at build time

* [ ] **Incremental Static Regeneration**: Use ISR for content that updates:
  - Pricing information (revalidate: 3600 - 1 hour)
  - Feature updates (revalidate: 86400 - 1 day)
  - Blog posts or news (if added in future)

* [ ] **Edge Runtime**: Use Edge Runtime for API routes when possible:
  - Configure with `export const runtime = 'edge'`
  - Better global performance on Vercel Edge Network
  - Lower latency for API responses

### 4. Mapbox Integration Optimization

**Location**: `src/components/map-feature/Map.tsx`

* [ ] **Lazy Loading**: Lazy load Mapbox GL JS:
  ```tsx
  const Map = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => <MapSkeleton />
  });
  ```

* [ ] **API Key Security**: Store Mapbox token in environment variables:
  - Never commit tokens to repository
  - Use `NEXT_PUBLIC_MAPBOX_TOKEN` for client-side usage
  - Or use API route to proxy map requests (more secure)

* [ ] **Tile Optimization**: Configure map for performance:
  - Use vector tiles instead of raster
  - Set appropriate min/max zoom levels
  - Limit visible layers to reduce rendering overhead

* [ ] **Map Initialization**: Initialize map only when visible:
  - Use Intersection Observer API
  - Or load map on user interaction (button click)

### 5. Code Splitting & Bundle Optimization

* [ ] **Route-Based Splitting**: Next.js automatically splits by route. Ensure:
  - Each route has minimal shared dependencies
  - Heavy libraries are imported only where needed

* [ ] **Component Splitting**: Split large components:
  - Extract heavy logic to separate modules
  - Use dynamic imports for conditional components
  - Split vendor chunks for better caching

* [ ] **Tree Shaking**: Ensure proper tree shaking:
  - Use ES modules for imports
  - Avoid importing entire libraries when only need specific functions
  - Configure sideEffects in package.json if needed

### 6. Caching Strategy

* [ ] **Static Assets**: Leverage Vercel's automatic caching:
  - Images, fonts, and static files are cached on CDN
  - Use appropriate cache headers for API routes

* [ ] **API Route Caching**: Configure cache headers:
  ```tsx
  export async function GET() {
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  }
  ```

* [ ] **Browser Caching**: Use appropriate cache strategies:
  - Static assets: Long cache (1 year) with versioning
  - HTML: Short cache with revalidation
  - API responses: Based on data freshness needs

## Vercel-Specific Features

### Analytics & Monitoring

* [ ] **Vercel Analytics**: Enable in Vercel dashboard:
  - Track page views and user interactions
  - Monitor Core Web Vitals in production
  - Get performance insights

* [ ] **Speed Insights**: Enable Vercel Speed Insights:
  - Real User Monitoring (RUM) data
  - Core Web Vitals tracking
  - Performance score monitoring

### Edge Functions

* [ ] **Edge Runtime**: Consider Edge Functions for:
  - Lightweight API routes
  - Global distribution needs
  - Low latency requirements

### Preview Deployments

* [ ] **PR Previews**: Use preview deployments for:
  - Testing changes before merge
  - Sharing with stakeholders
  - QA testing

## Performance Targets

* **Lighthouse Scores**:
  - Performance: 90+
  - SEO: 95+
  - Accessibility: 90+
  - Best Practices: 90+

* **Core Web Vitals**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID/INP (Interaction to Next Paint): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1

* **Load Times**:
  - First Contentful Paint: < 1.8s
  - Time to Interactive: < 3.8s
  - Full page load: < 3s on 4G

* **Bundle Sizes**:
  - Main bundle: < 200KB gzipped
  - Total JavaScript: < 500KB gzipped
  - Initial load: < 1MB total

## Performance Red Flags

* [ ] **Large Bundle Size**: Monitor with bundle analyzer. Split large dependencies.
* [ ] **Unused Dependencies**: Regularly audit and remove unused packages.
* [ ] **Render Blocking**: Minimize render-blocking CSS and JavaScript.
* [ ] **Excessive Re-renders**: Profile with React DevTools. Optimize with memoization.
* [ ] **Large Images**: Optimize images. Use WebP/AVIF formats. Provide appropriate sizes.

---
