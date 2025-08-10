# Deployment Guide - Remlyx Next.js Website

This guide will help you deploy the Remlyx Next.js website to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git repository set up
- Sufficient disk space (2GB+ free)

### Local Development Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Built by the creators of Next.js
- Zero configuration deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for every PR

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Sign up with your GitHub account
4. Click "New Project"
5. Import your repository
6. Deploy automatically

**Environment Variables (if needed):**
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### 2. Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your repository
5. Set build command: `npm run build`
6. Set publish directory: `.next`
7. Deploy

**Netlify Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### 3. AWS Amplify

**Steps:**
1. Push code to GitHub
2. Go to AWS Amplify Console
3. Click "New app" → "Host web app"
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
6. Deploy

### 4. DigitalOcean App Platform

**Steps:**
1. Push code to GitHub
2. Go to DigitalOcean App Platform
3. Create new app
4. Connect your repository
5. Set build command: `npm run build`
6. Deploy

## 🔧 Build Configuration

### Next.js Configuration (`next.config.js`)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig
```

### Environment Variables
Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Performance Optimization

### 1. Image Optimization
- Use Next.js `Image` component
- Optimize image formats (WebP, AVIF)
- Implement lazy loading

### 2. Code Splitting
- Next.js automatically splits code
- Use dynamic imports for large components
- Implement route-based code splitting

### 3. Caching
- Implement proper cache headers
- Use CDN for static assets
- Enable browser caching

## 🔍 SEO Configuration

### 1. Metadata
Each page has proper metadata in `layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Remlyx - Web Design & Development Agency Leeds',
  description: 'Professional web design and development agency...',
  // ... more metadata
}
```

### 2. Sitemap
Next.js automatically generates sitemap at `/sitemap.xml`

### 3. Robots.txt
Create `public/robots.txt`:
```txt
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

## 🛠️ Troubleshooting

### Common Issues

**1. Build Failures**
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

**2. Image Optimization Issues**
- Check `next.config.js` image domains
- Ensure images are in `public` directory
- Use proper image formats

**3. Environment Variables**
- Ensure all required env vars are set
- Check deployment platform settings
- Use `NEXT_PUBLIC_` prefix for client-side vars

**4. Performance Issues**
- Run `npm run build` to check bundle size
- Use Lighthouse for performance audit
- Implement proper caching strategies

## 📈 Monitoring

### 1. Analytics
- Google Analytics 4
- Vercel Analytics (if using Vercel)
- Custom event tracking

### 2. Error Monitoring
- Sentry integration
- Vercel error tracking
- Custom error boundaries

### 3. Performance Monitoring
- Core Web Vitals
- Lighthouse scores
- Real User Monitoring (RUM)

## 🔐 Security

### 1. HTTPS
- Enable HTTPS on all deployments
- Redirect HTTP to HTTPS
- Use secure headers

### 2. Content Security Policy
Add to `next.config.js`:
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline';"
  }
]
```

### 3. Environment Variables
- Never commit sensitive data
- Use platform-specific secret management
- Rotate keys regularly

## 🚀 Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test contact form functionality
- [ ] Verify SEO metadata
- [ ] Test performance with Lighthouse
- [ ] Check for console errors
- [ ] Verify analytics tracking
- [ ] Test on different browsers
- [ ] Check loading speeds
- [ ] Verify SSL certificate

## 📞 Support

For deployment issues:
- Check platform-specific documentation
- Review Next.js deployment guide
- Contact platform support teams

---

**Happy Deploying! 🎉** 