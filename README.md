# Zap Landing Page Dark

A **vibe-coded, dark, creator-first landing page** built with React, Next.js, and Tailwind CSS. Features a glowing gradient "spark" background, bold display fonts, smooth flowing strips, and hover-to-reveal prompts.

## ✨ Features

- **Dark theme** with purple gradient backgrounds and glowing effects
- **Google Fonts**: Unbounded (display) + Space Grotesk (body)
- **Smooth animations**: Marquee scrolling strips with hover controls
- **Interactive elements**: Hover-to-reveal prompts, like buttons, video previews
- **Responsive design**: Mobile-first approach with Tailwind CSS
- **Modern stack**: Next.js 15, React 19, TypeScript, and Tailwind CSS v4

## 🚀 Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles with marquee animations
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main landing page
public/
└── assets/zap/          # Asset placeholders (see README in folder)
```

## 🎨 Key Components

### Hero Section

- Gradient spark background with CSS mask effects
- Bold typography with call-to-action buttons
- Purple gradient orbs and dotted overlay

### Showcase Strip

- Horizontal scrolling carousel of content examples
- Hover to pause animation and reveal prompts
- Interactive like buttons and video previews

### Platform Icons

- Animated marquee of 15+ social platform icons
- React Icons for consistent styling

### Feature Sections

- Viral Toolkit: Grid of feature cards
- Out of the Box: Creative ideas showcase
- Statistics: Key metrics display

## 🛠 Customization

### Fonts

The page uses Google Fonts that load automatically:

- **Unbounded**: Bold display headings
- **Space Grotesk**: Clean body text

### Colors

Purple-themed dark palette with CSS custom properties:

- Background gradients with multiple radial overlays
- Glass morphism effects with `backdrop-blur`
- Hover states with subtle transitions

### Content

Update the `SHOWCASE` array in `page.tsx` to add your own:

- Images and videos
- Prompts and descriptions
- Like counts and metadata

### Assets

Replace placeholder images in `/public/assets/zap/` with your actual content. See the README in that folder for specifications.

## 🎯 Performance Notes

- **Font optimization**: Next.js font optimization with preload hints
- **Image optimization**: Uses Unsplash URLs for demos (replace with your CDN)
- **Animation efficiency**: CSS transforms with `will-change` for smooth scrolling
- **Video lazy loading**: `preload="none"` for better initial page load

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS backdrop-filter support (fallbacks included)
- ES2017+ JavaScript features

## 🎉 Deployment

This is a standard Next.js application. Deploy to:

- **Vercel** (recommended): `vercel --prod`
- **Netlify**: Connect your Git repository
- **Docker**: Build with `npm run build` and serve static files

---

**Made for creators and founders** ⚡

Built with the latest web technologies for maximum performance and visual impact.
