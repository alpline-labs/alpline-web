## name: seo-content-optimization-expert
description: Expert in SEO optimization, content strategy, structured data, accessibility, and landing page conversion optimization for SkiApp web landing page. Focuses on maximizing organic search visibility and user engagement.
allowed-tools: Read, Grep, Glob, Bash(npm:test), Bash(npm run build), Bash(npm run lint)

# SkiApp Web SEO & Content Optimization Skill

This skill governs the SEO optimization, content structure, and accessibility of the SkiApp landing page to maximize organic search visibility and user engagement.

## Overview

The landing page must be optimized for search engines while maintaining excellent user experience. It should rank well for relevant keywords like "ski navigation app", "snowboard app", "winter sports navigation", etc.

**Technology Stack:**

* **Framework**: Next.js 14+ with App Router
* **Metadata**: Next.js Metadata API
* **Structured Data**: JSON-LD schemas
* **Analytics**: Vercel Analytics, potential Google Analytics
* **Domain**: skimate.app (primary domain)

## Implementation Standards

### 1. Metadata & SEO (Every Page)

**Location**: `src/app/**/page.tsx` and `src/app/layout.tsx`

* [ ] **Page Metadata**: Every page must export `metadata` object with:
  - `title`: Unique, descriptive (50-60 chars), include brand name
  - `description`: Compelling meta description (150-160 chars) with call-to-action
  - `keywords`: Array of relevant keywords from `siteConfig.keywords`
  - `openGraph`: Complete OG tags (title, description, image, url, type)
  - `twitter`: Twitter card metadata (card type, title, description, image)
  - `alternates.canonical`: Always use `https://skimate.app` as canonical URL

* [ ] **Structured Data**: Implement JSON-LD in `layout.tsx` or page components:
  - Organization schema (name, logo, url, contact info)
  - WebSite schema (name, url, potentialAction for search)
  - SoftwareApplication schema (name, description, applicationCategory, operatingSystem, offers)

### 2. Content Structure & Semantics

**Location**: `src/components/sections/`

* [ ] **Heading Hierarchy**: Maintain proper heading hierarchy:
  - One `<h1>` per page (in Hero section)
  - `<h2>` for main sections (Features, Benefits, Pricing, etc.)
  - `<h3>` for subsections within main sections
  - Never skip heading levels

* [ ] **Semantic HTML**: Use semantic elements:
  - `<header>` for site header/navigation
  - `<main>` for main content
  - `<section>` for each major section
  - `<footer>` for site footer
  - `<article>` for blog posts or standalone content (if applicable)
  - `<nav>` for navigation menus

* [ ] **Alt Text**: All images must have descriptive alt text:
  - Hero images: Describe the value proposition or app feature
  - Feature icons: Describe the feature (e.g., "Smart routing feature icon")
  - Screenshots: Describe what's shown in the screenshot
  - Decorative images: Use empty alt (`alt=""`)

### 3. Landing Page Sections Optimization

**Location**: `src/components/sections/` and `src/app/page.tsx`

* [ ] **Hero Section**: Must include:
  - Clear, compelling headline with primary keyword
  - Value proposition (what makes SkiApp unique)
  - Primary CTA button ("Download Now" or "Get Started")
  - Hero image/video with proper alt text
  - Trust indicators (app store badges, ratings, if available)

* [ ] **Features Section**: Each feature should have:
  - Descriptive title with relevant keywords
  - Clear benefit statement (user-focused, not feature-focused)
  - Icon or visual representation
  - Link to detailed feature page (if applicable) for internal linking

* [ ] **Social Proof**: Include:
  - Testimonials with real names, roles, and avatars (if available)
  - Press mentions with logos
  - User statistics (downloads, active users, if available)
  - App store ratings and reviews (if available)

* [ ] **FAQ Section**: Optimize FAQ for featured snippets:
  - Use proper heading structure
  - Include relevant keywords naturally
  - Answer questions users actually search for
  - Use schema.org FAQPage structured data

### 4. Accessibility (A11y) Standards

* [ ] **ARIA Labels**: Use ARIA labels for:
  - Icon-only buttons (e.g., theme toggle, menu toggle)
  - Decorative elements that need context
  - Form inputs without visible labels

* [ ] **Keyboard Navigation**: Ensure:
  - All interactive elements are keyboard accessible
  - Logical tab order throughout the page
  - Visible focus indicators for keyboard navigation
  - Skip links for main content (if page is long)

* [ ] **Color Contrast**: Maintain WCAG AA standards:
  - Text: 4.5:1 contrast ratio for normal text
  - Large text: 3:1 contrast ratio for text 18pt+ or 14pt+ bold
  - UI components: 3:1 contrast ratio for interactive elements

* [ ] **Screen Reader Support**: Test with screen readers:
  - Use semantic HTML (most important)
  - Add ARIA labels where needed
  - Ensure form labels are properly associated
  - Provide text alternatives for images

### 5. Performance & Core Web Vitals

* [ ] **LCP Optimization**: Largest Contentful Paint < 2.5s:
  - Optimize hero image (use `next/image` with `priority` prop)
  - Preload critical resources
  - Minimize render-blocking resources

* [ ] **FID/INP Optimization**: First Input Delay / Interaction to Next Paint < 100ms:
  - Minimize JavaScript execution time
  - Use code splitting for non-critical JavaScript
  - Defer non-critical scripts

* [ ] **CLS Prevention**: Cumulative Layout Shift < 0.1:
  - Always specify image dimensions
  - Reserve space for dynamic content
  - Avoid inserting content above existing content
  - Use `font-display: swap` for fonts

### 6. Mobile Optimization

* [ ] **Responsive Design**: Ensure all sections are fully responsive:
  - Test on mobile (375px width)
  - Test on tablet (768px width)
  - Test on desktop (1920px width)
  - Use mobile-first CSS approach

* [ ] **Touch Targets**: Interactive elements should be:
  - At least 44x44px for touch targets
  - Adequate spacing between touch targets
  - Easy to tap with thumb on mobile devices

* [ ] **Mobile-First Content**: Design content for mobile:
  - Short, scannable paragraphs
  - Clear headings and subheadings
  - Bullet points for lists
  - Prominent CTAs

## Content Strategy

### Keyword Integration

* **Primary Keywords**: "ski navigation app", "snowboard app", "winter sports navigation"
* **Long-tail Keywords**: "best ski app for navigation", "snowboard tracking app", "ski resort navigation"
* **Integration**: Naturally integrate keywords into:
  - Page titles and headings
  - Meta descriptions
  - Body content
  - Alt text for images
  - Internal link anchor text

### Content Freshness

* **Regular Updates**: Update content periodically to signal freshness to search engines
* **ISR**: Use Incremental Static Regeneration for content that updates occasionally
* **Blog/News**: Consider adding blog section for regular content updates (future enhancement)

## Analytics & Tracking

* **Vercel Analytics**: Enable for performance monitoring and Core Web Vitals tracking
* **Conversion Tracking**: Track key events:
  - Download button clicks
  - Form submissions
  - External link clicks (app store links)
  - Scroll depth (engagement metric)

## Performance Targets

* **Lighthouse Scores**:
  - Performance: 90+
  - SEO: 95+
  - Accessibility: 90+
  - Best Practices: 90+
* **Core Web Vitals**: All metrics in "Good" range (green)
* **Mobile-Friendly**: Pass Google Mobile-Friendly Test
* **Page Speed**: < 3 seconds load time on 4G connection

---
