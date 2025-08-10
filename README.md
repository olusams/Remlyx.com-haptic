# Remlyx Next.js Website

A modern, responsive website for Remlyx - a web design and development agency based in Leeds, West Yorkshire.

## 🚀 Features

- **Modern React Architecture**: Built with Next.js 14 and React 18
- **TypeScript**: Full type safety and better developer experience
- **Tailwind CSS**: Modern, utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Built-in SEO features with Next.js
- **Performance**: Automatic code splitting and optimization

## 📁 Project Structure

```
remlyx-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── globals.css        # Global styles
│   │   ├── about/page.tsx     # About page
│   │   ├── services/page.tsx  # Services page
│   │   ├── portfolio/page.tsx # Portfolio page
│   │   ├── blog/page.tsx      # Blog page
│   │   └── contact/page.tsx   # Contact page
│   └── components/            # Reusable components
│       ├── Header.tsx         # Navigation header
│       ├── Hero.tsx           # Hero section
│       ├── Services.tsx       # Services showcase
│       ├── About.tsx          # About section
│       ├── Portfolio.tsx      # Portfolio showcase
│       ├── Testimonials.tsx   # Client testimonials
│       ├── Awards.tsx         # Awards & recognition
│       └── Footer.tsx         # Footer component
├── public/
│   └── assets/               # Static assets (images, fonts, etc.)
├── package.json              # Dependencies and scripts
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sufficient disk space (at least 2GB free)

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Orange gradient (#f97316 to #ea580c)
- **Secondary**: Gray scale (#f8fafc to #0f172a)
- **Accent**: Various shades for different purposes

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold weights (600-900)
- **Body**: Regular weight (400)

### Components
- **Buttons**: Primary and secondary variants with hover effects
- **Cards**: Rounded corners with shadows and hover animations
- **Forms**: Styled inputs with focus states
- **Navigation**: Responsive header with mobile menu

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Adding New Pages
1. Create a new folder in `src/app/`
2. Add a `page.tsx` file
3. Export a default component

### Adding New Components
1. Create a new file in `src/components/`
2. Import and use in your pages

### Styling
- Use Tailwind CSS classes
- Custom styles in `src/app/globals.css`
- Component-specific styles in individual component files

## 📊 Performance Features

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Lazy Loading**: Components load as needed
- **SEO**: Built-in metadata and sitemap generation

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 📞 Contact Information

- **Email**: remsams29@yahoo.com
- **Phone**: 07448 429748
- **Address**: Highfield Crescent, Leeds, LS12 4DA

## 🛠️ Troubleshooting

### Disk Space Issues
If you encounter "ENOSPC" errors:
1. Clear npm cache: `npm cache clean --force`
2. Delete node_modules: `rm -rf node_modules`
3. Free up disk space
4. Reinstall: `npm install`

### Build Issues
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

## 📝 License

This project is proprietary to Remlyx. All rights reserved.

---

**Built with ❤️ by Remlyx Web Design Agency** 