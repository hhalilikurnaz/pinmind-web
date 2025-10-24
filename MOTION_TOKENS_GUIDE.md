# 🎨 Motion Token Quick Reference

## Import Statement
```javascript
import { motionTokens, easings, durations } from '../styles/motionTokens';
```

## Usage Examples

### **Fade In (Content Loading)**
```jsx
<motion.div {...motionTokens.fadeInSoft}>
  Content here
</motion.div>
```

### **Fade Up (Cards & Sections)**
```jsx
<motion.div {...motionTokens.fadeUp}>
  Card content
</motion.div>
```

### **Zoom Transition (Page Entry)**
```jsx
<motion.div {...motionTokens.zoomInFlow}>
  Page content
</motion.div>
```

### **Hover Effects**
```jsx
<motion.div {...motionTokens.tiltHover}>
  Hover me for 3D tilt
</motion.div>
```

### **Glowing Animation (Trending)**
```jsx
<motion.div {...motionTokens.glowPulse}>
  Trending badge
</motion.div>
```

### **Staggered Lists**
```jsx
<motion.div {...motionTokens.staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} {...motionTokens.staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### **Sidebar Slide**
```jsx
<motion.div {...motionTokens.slideInRight}>
  Sidebar content
</motion.div>
```

### **Modal Pop-In**
```jsx
<motion.div {...motionTokens.scaleUp}>
  Modal content
</motion.div>
```

### **Exit Animation**
```jsx
<motion.div {...motionTokens.dustExit}>
  Exiting element
</motion.div>
```

## Custom Timings

### **Using Durations**
```jsx
<motion.div
  {...motionTokens.fadeInSoft}
  transition={{ ...motionTokens.fadeInSoft.transition, duration: durations.slow }}
>
  Slower fade
</motion.div>
```

### **Using Easings**
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, ease: easings.bounce }}
>
  Bouncy animation
</motion.div>
```

## Combining Tokens

```jsx
<motion.div
  {...motionTokens.fadeUp}
  {...motionTokens.tiltHover}
  className="trending-glow"
>
  Trending card with fade-up, tilt hover, and glowing border
</motion.div>
```

## CSS Classes

### **Trending Glow Border**
```jsx
className="trending-glow"
```

### **Glass Morphism**
```jsx
className="glass"
```

### **Grid Pattern Background**
```jsx
className="grid-pattern"
```

### **Professional Card**
```jsx
className="idea-card"
```

### **Handwriting Font**
```jsx
className="font-handwriting"
// or
className="handwriting"
```

## Available Tokens

| Token | Duration | Use Case |
|-------|----------|----------|
| `fadeInSoft` | 0.4s | Content loading |
| `fadeUp` | 0.5s | Cards, sections |
| `zoomInFlow` | 0.6s | Page transitions |
| `glowPulse` | 2s (infinite) | Trending badges |
| `tiltHover` | 0.2s | Card hover effects |
| `dustExit` | 0.5s | Chalk-dust exit |
| `staggerContainer` | - | List wrapper |
| `staggerItem` | 0.5s | List items |
| `slideInRight` | 0.4s | Sidebar animations |
| `scaleUp` | 0.3s | Modal pop-ins |

## Timing Presets

```javascript
durations.fast      // 0.2s
durations.normal    // 0.4s
durations.slow      // 0.6s
durations.verySlow  // 0.8s
```

## Easing Functions

```javascript
easings.smooth  // [0.4, 0, 0.2, 1] - Default
easings.bounce  // [0.68, -0.55, 0.265, 1.55] - Playful
easings.sharp   // [0.4, 0, 0.6, 1] - Quick
easings.soft    // [0.25, 0.46, 0.45, 0.94] - Gentle
```

## Best Practices

1. **Use tokens first**, custom animations only when needed
2. **Combine tokens** for complex effects
3. **Keep stagger delays** at 0.08s for optimal flow
4. **Use glowPulse** sparingly (trending items only)
5. **Test on mobile** - reduce motion if needed
6. **Accessibility** - respect `prefers-reduced-motion`

---

**Pro Tip**: All motion tokens are designed to work together. Mix and match to create sophisticated, consistent animations throughout your app!
