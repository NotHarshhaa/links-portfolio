# 🌐 Harshhaa Vardhan Reddy - DevOps Engineer Links Portfolio

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

A modern, beautifully designed web application to showcase social media profiles and professional networks, making it easy for others to connect online.

🔗 **Live Preview:** [link.notharshhaa.site](https://link.notharshhaa.site)

![Preview](https://imgur.com/MwgaHXp.png)

---

## ✨ Features

### 🎨 Modern UI/UX
- **Glass Morphism Design** - Beautiful frosted glass effects with backdrop blur
- **Gradient Backgrounds** - Dynamic gradient overlays and decorative elements
- **Smooth Animations** - Powered by Framer Motion for delightful micro-interactions
- **Dark/Light Theme** - System-aware theme switching with manual toggle
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop

### 🔍 Search & Navigation
- **Quick Search** - Filter links instantly with keyboard shortcut (`Ctrl/Cmd + K`)
- **Categorized Sections** - Links organized into Featured, Personal Network, and Professional Network
- **Smooth Scrolling** - Seamless navigation between sections

### 📱 Mobile-First Experience
- **Touch-Optimized** - All buttons and interactions work perfectly on touch devices
- **Compact Layout** - Optimized spacing and sizing for mobile screens
- **Native Share** - Uses Web Share API on supported devices

### 🔗 Link Management
- **Copy to Clipboard** - One-click copy with visual feedback and toast notifications
- **Share Links** - Native sharing on mobile, clipboard fallback on desktop
- **Click Tracking** - Local storage based analytics for link interactions
- **External Link Indicators** - Clear visual cues for outbound links

### ⚡ Performance
- **Lazy Loading** - Components load as you scroll using Intersection Observer
- **Optimized Bundle** - Code splitting and tree shaking for fast load times
- **Static Generation** - Pre-rendered pages for instant loading
- **Core Web Vitals** - Performance monitoring built-in

### ♿ Accessibility
- **Keyboard Navigation** - Full keyboard support for all interactions
- **Focus Indicators** - Clear focus states for screen reader users
- **ARIA Labels** - Proper semantic markup and accessibility attributes
- **Reduced Motion** - Respects user's motion preferences

### 🛡️ Error Handling
- **Error Boundaries** - Graceful error recovery with styled fallback UI
- **Loading States** - Skeleton loaders and loading indicators

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Radix UI** | Accessible UI primitives |
| **Lucide React** | Beautiful icons |
| **Sonner** | Toast notifications |
| **next-themes** | Theme management |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NotHarsworked/links-portfolio.git
   cd links-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with providers
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── components/
│   ├── header.tsx      # Navigation header
│   ├── footer.tsx      # Site footer
│   ├── card-link.tsx   # Link card component
│   ├── search-bar.tsx  # Search functionality
│   ├── share-link.tsx  # Share button component
│   └── ...             # Other UI components
├── hooks/
│   ├── use-link-tracker.ts    # Link click tracking
│   └── use-keyboard-navigation.ts
├── lib/
│   ├── utils.ts        # Utility functions
│   └── scroll-utils.ts # Smooth scroll helpers
└── data/
    └── index.ts        # Links data configuration
```

---

## ⚙️ Customization

### Adding/Editing Links

Edit the `src/data/index.ts` file to customize your links:

```typescript
export const links = {
  featured: [
    {
      title: 'Your Link Title',
      url: 'https://your-link.com',
      icon: YourIcon,
      description: 'Optional description'
    }
  ],
  // ... more categories
}
```

### Theming

The site uses CSS variables for theming. Modify `src/app/globals.css` to customize colors:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  /* ... more variables */
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  /* ... more variables */
}
```

---

## 📊 Performance

- ⚡ **Lighthouse Score:** 95+ across all metrics
- 📦 **First Load JS:** ~170KB (gzipped)
- 🎯 **Core Web Vitals:** Optimized for LCP, FID, and CLS

---

## 🙌 Special Thanks

Big thanks to [Emanuel Peire](https://github.com/emapeire) for the inspiration and contributions.

---

## 📄 License

MIT License - feel free to use this project for your own portfolio!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/NotHarshhaa">Harshhaa</a>
</p>
