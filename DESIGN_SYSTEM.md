# Backflow Exam Prep - Design System & Micro-Interactions

## 🎨 Visual Language

### Colors
- **Primary Background**: `#030712` (Dark Space)
- **Secondary Background**: `#071322` (Deep Navy)
- **Tertiary Background**: `#0B1D33` (Dark Blue)
- **Primary Accent**: `#3B82F6` (Electric Blue)
- **Secondary Accent**: `#38BDF8` (Cyan)
- **Text**: White, Soft Gray (`#9CA3AF`)

### Spacing & Corners
- **Border Radius**: 16px (1rem) for cards, 8px for buttons
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px
- **Padding**: Cards use 24px (1.5rem)

### Typography
- **Heading 1**: `clamp(1.875rem, 5vw, 3.75rem)` - Hero text
- **Heading 2**: `clamp(1.875rem, 5vw, 2.25rem)` - Section heads
- **Subtext**: `clamp(1rem, 2vw, 1.25rem)` - Descriptive text
- **Font Weight**: 700 (headings), 500 (body)

---

## ✨ Micro-Interactions

### 1. **Earth Rotation (GlobeHero)**
- Smooth, continuous rotation at `autoRotateSpeed: 0.6`
- Subtle background float animation (20s loop)
- Twinkling stars background with staggered animation

```css
@keyframes subtle-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
```

### 2. **Button Hover Glow**
- **Primary Buttons**: Emit soft blue glow on hover
- **Effect**: `box-shadow: 0 0 30px rgba(59, 130, 246, 0.5)`
- **Animation**: `glow-pulse 2s ease-in-out infinite`
- **Transform**: Lift up 2px (`translateY(-2px)`)

```css
.btn-primary:hover {
  animation: glow-pulse 2s ease-in-out infinite;
  transform: translateY(-2px);
}
```

### 3. **Card Lift & Shadow**
- **On Hover**: Cards lift 8px with enhanced shadow
- **Shadow Transform**: `0 20px 50px rgba(59, 130, 246, 0.2)`
- **Duration**: 0.4s cubic-bezier easing

```css
.glass-card:hover {
  animation: card-lift 0.4s ease-out forwards, 
             card-shadow 0.4s ease-out forwards;
}
```

### 4. **Button Ripple Effect**
- **On Click**: Radial ripple expands from center
- **Duration**: 0.6s ease-out
- **Opacity**: Fades from 1 to 0

```css
@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}
```

### 5. **Dropdown Fade & Slide**
- **Entry Animation**: `slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- **Opacity**: Fade in smoothly
- **Transform**: Slide from -10px left to 0

```css
.dropdown-enter {
  animation: slide-in-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 6. **Page Section Transitions**
- **Fade In**: All sections animate on load with `fade-in-up`
- **Stagger**: Each section delays by 100ms
- **Effect**: Smooth scroll entrance

```css
section {
  animation: fade-in-up 0.6s ease-out forwards;
  animation-delay: 100ms;
}
```

### 7. **Icon Scale & Color Transitions**
- **Scale**: Icons grow 125% on hover (300ms)
- **Color**: Titles shift to secondary accent on hover
- **Arrow**: Slides right with opacity fade-in

```css
.group-hover:scale-125 {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🎬 Animation Timeline

| Interaction | Duration | Easing | Effect |
|---|---|---|---|
| Earth Rotate | Continuous | Linear | Orbital motion |
| Star Twinkle | 3-6s | ease-in-out | Fade in/out |
| Button Hover | 0.3s | cubic-bezier | Lift + Glow |
| Card Hover | 0.4s | ease-out | Lift + Shadow |
| Click Ripple | 0.6s | ease-out | Radial expand |
| Dropdown | 0.3s | cubic-bezier | Slide + Fade |
| Page Load | 0.8s | ease-out | Fade + Slide Up |
| Section Stagger | 100ms delay | - | Sequential reveal |

---

## 🎯 Premium Motion Principles

### Slow & Calm
- No rapid animations
- Easing functions: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth entry
- Durations: 0.3s - 0.8s range

### Orbital
- Earth rotation mimics planetary motion
- Stars twinkle at different intervals
- Cards float subtly on background

### Nothing Bouncy
- No bounce easing (`cubic-bezier(0.34, 1.56, 0.64, 1)`)
- All motions feel intentional and controlled
- Smooth deceleration at end of animations

### Premium Feel
- Glow effects on interactive elements
- Depth through shadows and transforms
- Subtle parallax and layering

---

## 🧬 Component Animations

### GlobeHero
- Twinkling star field (20 stars, random positions)
- Background subtle float (20s loop)
- Text fade-in on load with staggered delays

### ProductOverview Cards
- **Staggered Entry**: Each card delays by 100ms
- **Icon Scale**: 125% on hover
- **Title Color**: White → Cyan on hover
- **Arrow Fade**: 0% → 100% opacity on hover

### Navbar
- Dropdown items slide-in from left
- Status dot pulses (custom animation ready)
- Icons smooth color transitions

### Onboarding Flow
- Progress bar animates as step advances
- Form inputs focus with subtle glow
- Cards lift on hover throughout flow

### Buttons
- **Primary**: Glow pulse + lift on hover
- **Secondary**: Border color change + lift
- **Ghost**: Text color fade to secondary
- **All**: Ripple effect on click

---

## 📱 Responsive Behavior

All animations scale responsively:
- Mobile: Slightly faster (0.2s faster) to avoid lag
- Tablet: Standard speeds
- Desktop: Full micro-interaction suite

---

## 🛠️ Implementation Details

### CSS Features Used
- `@keyframes` for custom animations
- `cubic-bezier()` for premium easing
- `backdrop-filter: blur(12px)` for glassmorphism
- `box-shadow` with rgba colors for depth
- `transform` for smooth hardware-accelerated motion

### Performance
- All animations use `transform` and `opacity` for 60fps
- Avoid animating `width`, `height`, `left`, `right`
- GPU acceleration via `will-change: transform`

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with GPU acceleration

---

## 🎨 Design Tokens

Stored in `app/globals.css` CSS custom properties:
```css
:root {
  --primary: #3b82f6;
  --secondary: #38bdf8;
  --dark-1: #030712;
  --dark-2: #071322;
  --dark-3: #0b1d33;
}
```

---

## 📚 Usage Examples

### Add fade-in animation to any element
```jsx
style={{ animation: "fade-in-up 0.8s ease-out" }}
```

### Stagger multiple items
```jsx
{items.map((item, idx) => (
  <div style={{ animation: `fade-in-up 0.8s ease-out ${0.1 * idx}s both` }}>
    {item}
  </div>
))}
```

### Add glow effect to buttons
Use `.btn-primary` class - glow is built-in

### Add twinkle to elements
Add `.star` class, or use:
```jsx
style={{ animation: "twinkle 3s ease-in-out infinite" }}
```

---

## 🎯 Future Enhancements

- [ ] Scroll-triggered animations using `animation-timeline: view()`
- [ ] Parallax effects on scroll
- [ ] Gesture-based animations (mobile)
- [ ] Sound effects (optional, accessibility consideration)
- [ ] Dark mode toggle animation

---

**Last Updated**: 2026-07-01
**Status**: ✅ Complete & Production Ready
