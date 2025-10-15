# Onyma Landing Page

A stunning, modern landing page for Onyma with animated background effects, gooey text morphing, and liquid glass UI components.

## ✨ Features

- **Animated Background**: Floating SVG paths with smooth animations
- **Gooey Text Effect**: Morphing text that cycles through "Welcome", "to", "Onyma"
- **Liquid Glass Button**: Interactive button with glassmorphism effects
- **Waitlist Modal**: Email collection system with validation
- **Responsive Design**: Works perfectly on all devices
- **Georgia Serif Font**: Elegant typography throughout
- **Tab Switching Fixes**: Smooth animations even when switching tabs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd onyma-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
onyma-landing/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── background-paths.jsx      # Animated background
│   │   │   ├── gooey-text-morphing.jsx   # Text morphing effect
│   │   │   ├── liquid-glass-button.jsx   # Glass button
│   │   │   └── WaitlistModal.jsx          # Email collection modal
│   │   ├── Header.jsx            # Site header
│   │   └── Footer.jsx            # Site footer
│   ├── pages/
│   │   ├── BackgroundPathsDemo.jsx  # Main demo page
│   │   └── Home.jsx              # Alternative home page
│   ├── styles/
│   │   └── globals.css           # Global styles + Tailwind
│   └── lib/
│       └── utils.js              # Utility functions
├── public/                       # Static assets
├── package.json                  # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── vite.config.js               # Vite configuration
```

## 🎨 Key Components

### BackgroundPaths
- Animated floating SVG paths
- Multiple layers for depth
- Smooth transitions and loops

### GooeyText
- Morphs between different text strings
- Blur and opacity transitions
- Tab switching animation fixes

### LiquidButton
- Glassmorphism effects
- Rounded pill shape
- Interactive hover states

### WaitlistModal
- Email validation
- Success/error states
- Local storage integration

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 🎯 Customization

### Changing Text
Edit `src/pages/BackgroundPathsDemo.jsx`:
```jsx
<GooeyText
  texts={["Welcome", "to", "Onyma"]}  // Change these words
  morphTime={1.5}                     // Morph duration
  cooldownTime={1}                    // Pause between morphs
/>
```

### Styling
- Global styles: `src/styles/globals.css`
- Component styles: Individual `.css` files
- Tailwind classes: Inline or component files

### Adding Features
- New components: `src/components/`
- New pages: `src/pages/`
- Utilities: `src/lib/`

## 📧 Waitlist Integration

The current setup uses localStorage for demo purposes. To integrate with a real backend:

1. Update `src/components/ui/WaitlistModal.jsx`
2. Replace the mock API call with your backend endpoint
3. See `WAITLIST_SETUP.md` for detailed instructions

## 🐛 Troubleshooting

### Common Issues

**Tailwind CSS errors**: Make sure you're using Tailwind v3.4.16
```bash
npm install -D tailwindcss@3.4.16
```

**Font loading issues**: Check `src/styles/globals.css` for Google Fonts import

**Animation glitches**: The gooey text has been fixed for tab switching

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Create a Pull Request

## 📝 Notes

- The project uses ES modules (`"type": "module"` in package.json)
- All animations are optimized for performance
- The design is fully responsive
- Georgia serif font is used throughout for elegance

## 🎉 What's Working

✅ Animated background paths  
✅ Gooey text morphing  
✅ Liquid glass button  
✅ Waitlist modal  
✅ Responsive design  
✅ Tab switching fixes  
✅ Email validation  
✅ Local storage integration  

---

**Ready to collaborate!** 🚀 Your friend can now clone this repo and start contributing immediately.
