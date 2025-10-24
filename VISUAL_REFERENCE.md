# 🎨 PinMind Visual Reference Guide

## Color Swatches

### Muted Card Palette
```
#E8E2D0 - Beige (warm, neutral)
#F6D7D7 - Soft Pink (gentle, creative)
#C5E4D0 - Mint (fresh, calm)
#E8DCEC - Lavender (dreamy, soft)
#D0E8E4 - Teal (cool, organized)
```

### Background
```
#0D0D0D - Deep black (base)
#1C1C1C - Dark gray (gradient end)
```

### Text Opacity
```
rgba(255, 255, 255, 0.90) - Titles
rgba(255, 255, 255, 0.85) - Body text
rgba(255, 255, 255, 0.80) - Subheaders
```

## Typography

### Font Families
```
Primary: Inter (clean, modern)
Accent: Caveat (handwriting, creative)
```

### Font Sizes
```
Title: 1.75rem (Your Idea Wall)
Subheader: 0.875rem
Body: 1rem
Card Title: 1.5rem (handwriting)
```

## Spacing & Sizing

### Border Radius
```
Cards: 1rem (rounded-2xl)
Buttons: 0.75rem (rounded-xl)
Modals: 1rem (rounded-2xl)
```

### Shadows
```
Normal: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Hover: 0 10px 15px -3px rgba(0, 0, 0, 0.2)
Glass: inset 0 0 12px rgba(255, 255, 255, 0.05)
```

## Motion Timings

### Durations
```
Fast: 0.2s (micro-interactions)
Normal: 0.4s (standard transitions)
Slow: 0.6s (page transitions)
Erase: 0.9s (chalk-dust exit)
```

### Easings
```
easeOut - Most animations
easeInOut - Bidirectional (slide)
easeIn - Exit animations
```

## Z-Index Hierarchy
```
0  - Chalk particles
1  - Board background
10 - Idea cards
40 - Floating buttons
50 - Navbar, modals, overlays
```

## Layout Breakpoints

### IdeaSpace
```
Chat Closed: FlowWorkspace 100% width
Chat Open:   FlowWorkspace 60% | ChatBar 40%
```

### Grid
```
Desktop: 3 columns (lg:grid-cols-3)
Tablet:  2 columns (md:grid-cols-2)
Mobile:  1 column (grid-cols-1)
```

## Component States

### Card Hover
```
rotate: 0.5° - 1.5° (random jitter)
scale: 1.02
y: -4px
transition: 0.2s ease-out
```

### Trending Badge
```
Glow animation: 3s linear infinite
Opacity: 0.5
Color: rgba(91, 159, 237, 0.4)
```

## Animation Patterns

### Entry Sequence
```
1. Chalk particles fade in (background)
2. Board fades in (0.4s)
3. Cards stagger (0.08s delay between)
4. Trending cards pulse (infinite)
```

### Exit Sequence
```
1. Chalk-erase effect (0.9s)
2. Progressive blur (0px → 8px)
3. Fade to opacity 0
4. Navigate after animation
```

## Accessibility

### Focus States
```
outline: 2px solid rgba(99, 102, 241, 0.5)
outline-offset: 2px
```

### Reduced Motion
```
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

## Best Practices

✅ Use motionTokens for all animations
✅ Keep text opacity at 80-85%
✅ Only trending items get glowPulse
✅ Cards have subtle rotation jitter (not static)
✅ All modals have backdrop blur
✅ Navbar always transparent + fixed
✅ ChalkParticles always in background (z-0)
✅ No overlapping panels (use flexbox)

---

**Quick Start**: Import `motionTokens` and apply with spread operator:
```jsx
<motion.div {...motionTokens.fadeInSoft}>
```
