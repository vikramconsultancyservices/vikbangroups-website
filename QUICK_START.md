# Quick Start Guide - Vikban Groups Website

## 🚀 Getting Started

### Option 1: Open with Live Server (Recommended)
1. Open VS Code
2. Right-click any `.html` file in `src/` folder
3. Select "Open with Live Server"
4. Website opens at `http://localhost:5500`

### Option 2: Use Python HTTP Server
```bash
cd e:\Projects\latest\vikbangroups-website\src
python -m http.server 8000
# Then open: http://localhost:8000
```

### Option 3: Use Node.js
```bash
cd e:\Projects\latest\vikbangroups-website\src
npx http-server
# Then open the displayed URL
```

## 🎨 Testing the Features

### 1. Test Dark/Light Theme
1. Look for **sun/moon icon** in top-right corner
2. Click to toggle between light and dark modes
3. Colors should smoothly transition
4. Refresh the page - theme preference is saved

### 2. Test Header Animation
1. Scroll down the page slowly
2. After scrolling ~100px, header should slide up smoothly
3. Scroll back up - header slides back down
4. Motion should be fluid with 0.3s animation

### 3. Test on Mobile
1. Open DevTools (F12)
2. Click responsive design icon
3. Select iPhone or tablet size
4. All features work identically
5. Hamburger menu still functions

## 📁 Project Structure

```
vikbangroups-website/
├── src/
│   ├── index.html              (Home page)
│   ├── about.html              (About page)
│   ├── services.html           (Services)
│   ├── portfolio.html          (Portfolio)
│   ├── contact.html            (Contact + Chat)
│   ├── ai-solutions.html       (AI Solutions)
│   ├── assets/
│   │   ├── images/             (Logos, icons)
│   │   ├── fonts/              (Custom fonts)
│   ├── components/
│   │   └── footer.html         (Footer)
│   ├── css/
│   │   └── styles.css          (Main stylesheet)
│   ├── js/
│   │   ├── main.js             (Core functionality)
│   │   ├── theme.js            (Theme system) ✨ NEW
│   │   ├── chatbot.js          (Chat widget)
│   │   ├── utils.js            (Utilities)
│   │   └── animations_.js      (Animations)
│   └── templates/
│       └── base.html           (Base template)
└── README.md
```

## ✨ What's New

### ✅ Fixed Header with Smart Scroll
- Header fixed at top
- Hides on scroll down (after 100px)
- Shows on scroll up
- Shadow effect when scrolled
- Smooth 0.3s animations

### ✅ Dark/Light Theme
- Light theme (default)
- Dark theme with auto system detection
- Toggle button in header
- Persistent user preference
- Smooth color transitions

### ✅ All Existing Features Preserved
- Navigation & active links
- Hamburger menu
- Client scrolling
- Stats counters
- Chat widget
- Responsive design

## 🎯 Key Shortcuts

| Action | Result |
|--------|--------|
| Click Sun/Moon Icon | Toggle Theme |
| Scroll Down | Header Hides |
| Scroll Up | Header Shows |
| F12 | Open DevTools |
| Ctrl+Shift+M | Mobile View |

## 🔧 Code Highlights

### Theme CSS Variables
Located in `src/css/styles.css` (lines 1-39)
```css
:root {
  --text-primary: #333333;
  --bg-primary: #ffffff;
  /* ... 10 more variables ... */
}

html.dark-theme {
  --text-primary: #e5e7eb;
  --bg-primary: #1a1a2e;
  /* ... 10 more dark theme variables ... */
}
```

### Header Scroll Logic
Located in `src/js/main.js` (lines 62-104)
```javascript
function initHeaderScroll() {
  // Detects scroll direction
  // Hides header on scroll down
  // Shows header on scroll up
  // Uses requestAnimationFrame for smooth performance
}
```

### Theme Manager
Located in `src/js/theme.js` (139 lines)
```javascript
// Auto-detects system preference
// Toggles dark/light theme
// Saves user choice to localStorage
// Updates DOM and CSS variables
```

## 🐛 Troubleshooting

### Theme not persisting?
- Check browser localStorage is enabled
- Clear browser cache and refresh
- Check browser console for errors (F12)

### Header not animating?
- Ensure JavaScript is enabled
- Check main.js is loaded (F12 Console)
- Verify scroll position > 100px before hiding

### Hamburger menu not working?
- Ensure hamburger menu CSS is loaded
- Check main.js initialization
- Verify header element exists in HTML

## 📞 Support

For issues or questions:
1. Check browser console (F12) for errors
2. Verify all files are present in `src/` folder
3. Try clearing browser cache
4. Test in a different browser

## ✅ Verification Checklist

- [ ] All 6 pages load without errors
- [ ] Theme toggle button visible in top-right
- [ ] Clicking theme button toggles between light/dark
- [ ] Header slides up when scrolling down
- [ ] Header slides down when scrolling up
- [ ] Page layout looks good on mobile
- [ ] Hamburger menu opens/closes on mobile
- [ ] Chat widget works on contact page
- [ ] All navigation links work
- [ ] Theme preference saved after page refresh

## 🎓 Learning Resources

- CSS Variables: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- localStorage API: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- requestAnimationFrame: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
- CSS Transforms: https://developer.mozilla.org/en-US/docs/Web/CSS/transform

## 📊 Performance Notes

- All animations use CSS transforms (GPU accelerated)
- Scroll listener is passive for better performance
- requestAnimationFrame limits animations to 60fps
- localStorage is synchronous but negligible impact
- No external dependencies added

## 🎉 You're All Set!

Your website now has professional-grade features:
- Modern dark/light theme system
- Smart header that saves screen space
- Smooth animations throughout
- All existing functionality intact
- Mobile responsive design maintained

Enjoy! 🚀
