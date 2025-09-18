# Zap Assets

This directory contains placeholder references for the Zap landing page demo assets.

## Directory Structure

```
/assets/zap/
├── images/
│   ├── sneaker-hero.jpg       # Studio quality hero image of a sneaker
│   ├── flatlay-skin.jpg       # Minimalist skincare flatlay
│   └── ref-based-ad.jpg       # Brand banner example
└── videos/
    ├── reel-founder.jpg       # Poster for founder reel
    ├── reel-founder.mp4       # 15 second founder reel video
    ├── reel-saas.jpg          # Poster for SaaS ad
    ├── reel-saas.mp4          # TikTok SaaS ad video
    ├── founder-story.jpg      # Poster for founder story
    └── founder-story.mp4      # One minute founder story video
```

## Replacing Placeholders

To use this landing page with real assets:

1. Replace the placeholder image and video files with your actual Zap-generated content
2. Update the file paths in `src/app/page.tsx` if needed
3. Ensure all videos are optimized for web (H.264, MP4 format recommended)
4. Consider adding multiple video formats for better browser compatibility

## Image Specifications

- **Images**: JPG or WebP format, optimized for web
- **Recommended size**: 600x760px for showcase cards
- **Videos**: MP4 format, H.264 codec
- **Video dimensions**: 9:16 aspect ratio for mobile-first content

All assets should be optimized for fast loading while maintaining visual quality.
