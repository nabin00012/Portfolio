# Premium Portfolio Website

A stunning, award-winning portfolio website built with React and Lenis smooth scrolling. Features buttery-smooth momentum scrolling, parallax effects, and sophisticated animations.

## ✨ Features

- **Lenis Smooth Scrolling**: Premium momentum-based scrolling that feels like butter
- **Parallax Effects**: Multi-layer parallax animations throughout the site
- **Scroll-Triggered Animations**: Elements fade and slide in as you scroll
- **Glassmorphism UI**: Modern frosted glass aesthetic with backdrop blur
- **Dark Mode Design**: Vibrant gradients on dark backgrounds
- **Fully Responsive**: Optimized for all devices
- **Performance Optimized**: GPU-accelerated transforms, lazy loading, 60fps animations

## 🎨 Design Features

- Large, bold typography (4-8rem headlines)
- Vibrant gradient color scheme (purple, pink, cyan)
- Generous whitespace and padding
- Smooth hover effects with lift and glow
- Full-bleed images with overlay effects
- Professional glassmorphic cards

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The site will be available at `http://localhost:5173`

## 📁 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Portfolio.jsx      # Main portfolio component
│   │   └── Portfolio.css      # Component styles
│   ├── App.jsx                # App wrapper
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js           # Vite configuration
```

## 🎯 Customization

### Replace Content

1. **Hero Section**: Update the title and subtitle in `Portfolio.jsx` (lines 65-85)
2. **About Section**: Modify the description and stats (lines 105-130)
3. **Projects**: Edit the `projects` array with your own projects (lines 54-75)
4. **Skills**: Update the `skills` array with your expertise (lines 77-86)
5. **Contact Form**: Connect the form to your backend/email service
6. **Social Links**: Add your social media URLs in the contact section

### Adjust Colors

The color scheme uses CSS custom properties. Main gradients:
- Primary: Purple to Pink (`#8b5cf6` to `#ec4899`)
- Accent: Cyan (`#06b6d4`)
- Background: Dark navy to black

### Modify Animations

- **Scroll speed**: Adjust parallax multipliers in inline styles (0.3-0.5)
- **Fade-in threshold**: Change IntersectionObserver threshold (default: 0.2)
- **Animation duration**: Update CSS transition durations in `Portfolio.css`

### Lenis Configuration

Customize smooth scroll behavior in `Portfolio.jsx` (lines 22-33):
- `duration`: Scroll animation speed (default: 1.2)
- `easing`: Custom easing function
- `smooth`: Enable/disable smoothing

## 🎨 Section Descriptions

### Hero Section
Full-viewport hero with animated gradient background, large typography, and scroll indicator.

### About Section
Personal introduction with parallax background, statistics, and elegant typography.

### Projects Section
Grid of project cards with hover effects, tags, and project images from Unsplash.

### Skills Section
Grid of skill cards with progress bars, icons, and hover animations.

### Contact Section
Beautiful contact form with glassmorphic inputs and social media links.

## 🔧 Technologies

- **React 18**: Latest React with hooks
- **Lenis**: Premium smooth scrolling library
- **Vite**: Next-generation frontend tooling
- **CSS3**: Modern CSS with transforms and animations
- **IntersectionObserver**: Scroll-triggered animations

## 📱 Responsive Breakpoints

- Desktop: 1400px+
- Tablet: 768px - 1399px
- Mobile: < 768px

## ⚡ Performance

- GPU-accelerated transforms (translateY, scale, opacity)
- Lazy loading for images
- Optimized animations (60fps target)
- Reduced motion support for accessibility
- Debounced scroll events via Lenis

## 🎓 Best Practices Implemented

- Semantic HTML
- Accessible form labels
- Keyboard navigation support
- Reduced motion media query
- Mobile-first responsive design
- Modern CSS with custom properties
- Component-based architecture

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙏 Credits

- Smooth scrolling powered by [Lenis](https://github.com/studio-freight/lenis)
- Images from [Unsplash](https://unsplash.com)
- Font: Inter from Google Fonts

---

**Made with ❤️ and lots of smooth scrolling**

