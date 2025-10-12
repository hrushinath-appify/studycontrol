# Mobile Responsive Design Guide - StudyControl

## Quick Reference for Responsive Utilities

This guide provides quick reference for the responsive design patterns used throughout the StudyControl application.

---

## 📐 Breakpoint System

```css
/* Mobile First Approach */
xs:  min-width: 475px   /* Small phones */
sm:  min-width: 640px   /* Large phones */
md:  min-width: 768px   /* Tablets */
lg:  min-width: 1024px  /* Small laptops */
xl:  min-width: 1280px  /* Desktops */
2xl: min-width: 1536px  /* Large screens */
```

---

## 🎨 Common Responsive Patterns

### Spacing

```jsx
/* Padding - Progressive Enhancement */
className="p-3 sm:p-4 md:p-6 lg:p-8"
// Mobile: 12px → Tablet: 24px → Desktop: 32px

/* Gaps */
className="gap-2 sm:gap-3 md:gap-4 lg:gap-6"
// Mobile: 8px → Desktop: 24px

/* Margins */
className="mb-2 sm:mb-3 md:mb-4 lg:mb-6"
```

### Typography

```jsx
/* Headings */
className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
// Mobile: 20px → Desktop: 36px

/* Body Text */
className="text-sm sm:text-base md:text-lg"
// Mobile: 14px → Desktop: 18px

/* Small Text */
className="text-xs sm:text-sm"
// Mobile: 12px → Tablet: 14px

/* Tiny Text (badges, etc) */
className="text-[10px] sm:text-xs"
// Mobile: 10px → Tablet: 12px
```

### Icons & Buttons

```jsx
/* Icons */
className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
// Mobile: 16px → Desktop: 24px

/* Button Heights */
className="h-8 sm:h-9 md:h-10"
// Mobile: 32px → Desktop: 40px

/* Button Padding */
className="px-3 sm:px-4 md:px-6"
```

### Layouts

```jsx
/* Grid Layouts */
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
// Mobile: 1 column → Tablet: 2 columns → Desktop: 3 columns

/* Flex Direction */
className="flex flex-col sm:flex-row"
// Mobile: Vertical stack → Tablet+: Horizontal

/* Hide/Show Elements */
className="hidden sm:block"  // Hidden on mobile, visible on tablet+
className="block sm:hidden"  // Visible on mobile only
className="hidden md:flex"   // Hidden until tablet
```

### Rounded Corners

```jsx
className="rounded-lg sm:rounded-xl md:rounded-2xl"
// Mobile: 8px → Tablet: 12px → Desktop: 16px
```

---

## 🎯 Component-Specific Patterns

### Cards

```jsx
<div className="
  bg-card/30 backdrop-blur-sm 
  border border-border/30 
  rounded-lg sm:rounded-xl 
  p-3 sm:p-4 md:p-6
  hover:bg-card/50
  transition-all duration-300
">
  {/* Card content */}
</div>
```

### Forms

```jsx
/* Input Fields */
<Input className="
  h-9 sm:h-10
  text-sm sm:text-base
  px-3 sm:px-4
" />

/* Textareas */
<textarea className="
  min-h-[100px] sm:min-h-[120px] md:min-h-[140px]
  text-sm sm:text-base
" />

/* Form Buttons */
<Button className="
  h-9 sm:h-10
  px-4 sm:px-6
  text-sm sm:text-base
  w-full sm:w-auto
">
```

### Navigation

```jsx
/* Top Bar */
<header className="
  px-3 sm:px-4 md:px-6
  py-3 sm:py-4
">
  <div className="flex items-center gap-2 sm:gap-4">
    {/* Content */}
  </div>
</header>
```

### Modal/Dialog

```jsx
<div className="
  fixed inset-0 z-50
  p-4 sm:p-6
  flex items-center justify-center
">
  <div className="
    max-w-md w-full
    rounded-lg sm:rounded-xl
    p-4 sm:p-6
  ">
    {/* Modal content */}
  </div>
</div>
```

---

## 💡 Best Practices

### 1. Touch Targets

```jsx
/* Minimum Touch Target: 44px (Apple HIG) */
className="min-h-[44px] min-w-[44px]"

/* For small interactive elements on mobile */
@media (hover: none) and (pointer: coarse) {
  .touch-target {
    min-height: 48px;
    min-width: 48px;
  }
}
```

### 2. Safe Areas (iOS Notch)

```jsx
/* Apply to main containers */
className="
  pl-safe-left
  pr-safe-right
  pt-safe-top
  pb-safe-bottom
"

/* In CSS */
padding-top: max(0.75rem, env(safe-area-inset-top));
```

### 3. Truncation

```jsx
/* Single Line */
className="truncate"  // text-overflow: ellipsis

/* Multiple Lines */
className="line-clamp-2 sm:line-clamp-3"
// 2 lines on mobile, 3 on tablet+
```

### 4. Visibility

```jsx
/* Hide on Mobile */
className="hidden sm:inline"      // Inline elements
className="hidden sm:block"       // Block elements
className="hidden md:flex"        // Flex containers

/* Show only on Mobile */
className="inline sm:hidden"
className="block sm:hidden"

/* Conditional Text */
<span className="hidden xs:inline">Full Text</span>
<span className="xs:hidden">Short</span>
```

### 5. Flex/Grid Responsive

```jsx
/* Flex - Stack on Mobile */
className="flex flex-col sm:flex-row gap-2 sm:gap-4"

/* Grid - Responsive Columns */
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"

/* Min-Width 0 for Truncation */
className="flex-1 min-w-0"
```

---

## 🎨 Example: Complete Responsive Card

```jsx
<div className="
  /* Container */
  bg-card/30 backdrop-blur-sm
  border border-border/30
  rounded-lg sm:rounded-xl md:rounded-2xl
  
  /* Padding */
  p-3 sm:p-4 md:p-6
  
  /* Spacing */
  space-y-2 sm:space-y-3 md:space-y-4
  
  /* Hover */
  hover:bg-card/50
  hover:shadow-lg
  
  /* Touch */
  active:scale-[0.98]
  
  /* Transition */
  transition-all duration-300
">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
    <h3 className="text-base sm:text-lg md:text-xl font-semibold truncate">
      Card Title
    </h3>
    <button className="
      h-8 sm:h-9
      px-3 sm:px-4
      text-xs sm:text-sm
      rounded-md sm:rounded-lg
    ">
      Action
    </button>
  </div>
  
  {/* Content */}
  <p className="
    text-xs sm:text-sm md:text-base
    text-muted-foreground
    line-clamp-2 sm:line-clamp-3
  ">
    Card content text that will be truncated appropriately
  </p>
  
  {/* Footer */}
  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
    <span className="flex items-center gap-1">
      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
      <span className="hidden xs:inline">Label</span>
    </span>
  </div>
</div>
```

---

## 🔍 Debugging Tips

### 1. Visual Breakpoint Indicator (Dev Only)

```jsx
/* Add to layout for debugging */
<div className="fixed bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded text-xs z-50">
  <span className="xs:hidden">xs</span>
  <span className="hidden xs:inline sm:hidden">xs</span>
  <span className="hidden sm:inline md:hidden">sm</span>
  <span className="hidden md:inline lg:hidden">md</span>
  <span className="hidden lg:inline xl:hidden">lg</span>
  <span className="hidden xl:inline 2xl:hidden">xl</span>
  <span className="hidden 2xl:inline">2xl</span>
</div>
```

### 2. Browser DevTools

- Use responsive mode to test different devices
- Check "Show rulers" for precise measurements
- Test on actual devices when possible

### 3. Common Issues

```jsx
/* ❌ Wrong - Content overflow */
<div className="w-full">
  <p>Very long text without truncation</p>
</div>

/* ✅ Correct - Proper truncation */
<div className="w-full min-w-0">
  <p className="truncate">Very long text with truncation</p>
</div>

/* ❌ Wrong - Fixed widths on mobile */
<div className="w-[500px]">Content</div>

/* ✅ Correct - Responsive widths */
<div className="w-full max-w-[500px]">Content</div>
```

---

## 📱 Testing Checklist

- [ ] Test on physical devices (iOS & Android)
- [ ] Check all breakpoints (xs, sm, md, lg, xl, 2xl)
- [ ] Verify touch targets (minimum 44px)
- [ ] Test landscape orientation
- [ ] Check safe areas on notched devices
- [ ] Verify text readability at all sizes
- [ ] Test form inputs on mobile keyboards
- [ ] Check scroll behavior
- [ ] Verify hover states work on touch
- [ ] Test with slow network (3G simulation)

---

## 🎯 Performance Tips

```jsx
/* 1. Conditional Loading */
const isMobile = useMediaQuery('(max-width: 768px)')
{!isMobile && <DesktopOnlyComponent />}

/* 2. Lazy Images */
<img
  loading="lazy"
  src="/image.jpg"
  className="w-full h-auto"
/>

/* 3. Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📚 Additional Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design - Layout](https://material.io/design/layout)
- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

---

**Last Updated:** October 12, 2025  
**Version:** 1.0.0

