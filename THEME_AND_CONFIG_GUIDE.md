# Theme System & Feature Flags Implementation

## Overview
This implementation adds a complete theme switching system (light/dark modes) and makes all promotional text configurable via feature flags and config values.

## 🎨 Theme System

### Light Theme (Default)
- Sage green backgrounds with cream/beige tones
- Dark brown text
- Orange accents (#ffa239)

### Dark Theme
- Pure black background (#000000)
- Yellow text (#facc15 - yellow-400)
- Bright yellow accents for headings (#fde047 - yellow-300)
- Subtle yellow glow effects

### Theme Toggle Button
- **Location**: Fixed at bottom-right corner of the page
- **Appearance**: Circular gradient button with sun/moon icons
- **Behavior**: Smooth transitions between themes with icon rotation
- **Persistence**: Theme preference saved in localStorage
- **Hover Effect**: Shows tooltip indicating current mode

## ⚙️ Configuration System

### Feature Flags Location
File: `/src/config/siteConfig.ts`

### Available Flags

```typescript
features: {
  showUrgencyBanner: true,      // Controls "EARLY ACCESS ENDING SOON!"
  showSpotsLeft: true,           // Controls "247 SPOTS LEFT" badge
  showStats: true,               // Controls stats display (Beta Signups, etc.)
  showFAQ: true,                 // Controls FAQ section visibility
  showTestimonials: true,        // Controls testimonials section
}
```

### Configurable Text Values

```typescript
content: {
  urgencyMessage: "EARLY ACCESS ENDING SOON!",
  spotsLeft: "247 SPOTS LEFT",
  stats: {
    waitlistCount: "10K+",         // Displayed as "10K+ On Waitlist"
    betaSignups: "10,000+",        // Shown in stats section
    averageRating: "4.9★",         // App rating display
    entriesLogged: "50K+",         // Total entries metric
    rewardsRedeemed: "$2M+",       // Rewards value metric
  },
}
```

## 📂 Files Modified/Created

### New Files
1. **`/src/contexts/ThemeContext.tsx`**
   - React Context for theme state management
   - Handles localStorage persistence
   - Provides useTheme() hook

2. **`/src/components/ui/ThemeToggle.tsx`**
   - Floating button component
   - Animated icon transitions
   - Tooltip on hover

### Modified Files
1. **`/src/app/layout.tsx`**
   - Wrapped with ThemeProvider
   - Added ThemeToggle component
   - Updated body className for dark mode support

2. **`/src/config/siteConfig.ts`**
   - Updated flag values to `true`
   - Set proper stat values (10K+, 10,000+, etc.)
   - Updated spotsLeft to "247 SPOTS LEFT"

3. **`/tailwind.config.ts`**
   - Added `darkMode: 'class'` configuration
   - Enables class-based dark mode

4. **`/src/app/globals.css`**
   - Added comprehensive dark mode CSS variables
   - Dark mode styles for all components
   - Smooth transitions between themes

## 🚀 Usage

### Toggling Themes
Users can click the floating button in the bottom-right corner to switch between light and dark modes. The preference is automatically saved and restored on subsequent visits.

### Updating Configuration
To modify promotional text or toggle features:

1. Open `/src/config/siteConfig.ts`
2. Update the desired values:
   ```typescript
   // To hide urgency banner
   showUrgencyBanner: false,
   
   // To change spots left text
   spotsLeft: "Only 100 Spots Remaining!",
   
   // To update waitlist count
   waitlistCount: "15K+",
   ```
3. Save the file - changes are reflected immediately

## 🎯 Key Features

### Easy Management
- ✅ All promotional text in one config file
- ✅ Simple boolean flags to show/hide sections
- ✅ No need to edit multiple component files
- ✅ Type-safe with TypeScript interfaces

### Theme System
- ✅ Smooth transitions between modes
- ✅ Persistent user preference
- ✅ Accessible toggle button
- ✅ Comprehensive dark mode styling
- ✅ Maintains brand identity in both themes

### Components Using Flags
- **UrgencyBanner**: Uses `showUrgencyBanner` and `urgencyMessage`
- **Hero**: Uses `showSpotsLeft`, `spotsLeft`, and `waitlistCount`
- **WaitlistForm**: Uses `showSpotsLeft` and `spotsLeft`
- **Testimonials**: Uses `showTestimonials` and `showStats`
- **FAQ**: Uses `showFAQ`

## 🔧 Technical Details

### Theme Context API
```typescript
const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark'
// toggleTheme: () => void
```

### CSS Class Strategy
- Root html element gets `dark` class when in dark mode
- All components use conditional dark mode classes
- Transitions handled via CSS for performance

### LocalStorage Key
Theme preference stored as: `phoop-theme`

## 📝 Notes

- The theme toggle button has a z-index of 50 to stay on top
- Dark mode maintains accessibility with high contrast (yellow on black)
- All text elements automatically adjust colors based on theme
- Gradients and special colors are theme-aware
- Images and illustrations work in both themes
