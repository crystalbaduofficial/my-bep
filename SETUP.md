# Backflow Exam Prep - Setup Guide

## Environment Variables

### Mapbox Configuration

To enable the interactive Mapbox Earth visualization on the homepage hero:

1. **Get a Mapbox Access Token**
   - Go to [Mapbox Account Tokens](https://account.mapbox.com/tokens/)
   - Create a new token (or use an existing public token)
   - Copy the token (starts with `pk_`)

2. **Configure Local Environment**
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and replace the placeholder:
     ```
     NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk_your_actual_token_here
     ```

3. **Restart Dev Server**
   ```bash
   npm run dev
   ```
   The homepage hero will now show an interactive rotating Earth map.

### Fallback Behavior

If `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is not configured or invalid:
- The hero section displays a gradient background instead
- All functionality remains intact
- Console shows a warning (check browser DevTools)

## Development

### Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run lint

# Start production server
npm start
```

### Project Structure

```
my-bep/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout (Navbar, Footer)
│   └── globals.css           # Design system & utilities
├── components/
│   ├── MapboxHero.tsx        # Hero with Mapbox Earth
│   ├── ProductOverview.tsx   # Product cards grid
│   ├── Navbar.tsx            # Sticky navigation
│   ├── Footer.tsx            # Global footer
│   ├── Button.tsx            # Reusable button component
│   └── GlassCard.tsx         # Glassmorphism card component
├── .env.example              # Template for environment variables
├── .env.local                # Local env vars (not committed)
└── tailwind.config.ts        # Tailwind configuration
```

## Design System

### Colors
- **Dark**: `#030712`, `#071322`, `#0b1d33`
- **Primary**: `#3b82f6` (Electric Blue)
- **Secondary**: `#38bdf8` (Cyan)
- **Text**: `#f0f4f8` (Light), `#9ca3af` (Gray)

### Component Classes
- `.glass` — Glassmorphic background
- `.glass-card` — Interactive card with hover effects
- `.btn-primary` — Primary action button
- `.btn-secondary` — Secondary glass button
- `.btn-ghost` — Text-only button
- `.heading-1`, `.heading-2` — Responsive headings
- `.subtext` — Body text with default color

### Responsive Breakpoints
- `sm:` — 640px
- `md:` — 768px
- `lg:` — 1024px
- Mobile-first approach throughout

## Adding New Pages

All pages automatically inherit:
- Navbar (sticky, with mobile menu)
- Footer (4 sections + legal links)
- Design system (colors, spacing, components)
- Mobile responsiveness

Example page structure:

```tsx
import Button from "@/components/Button";
import GlassCard from "@/components/GlassCard";

export default function CoursesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="heading-1 mb-8 text-white">Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard>
          <h2 className="text-xl font-semibold text-white mb-2">Course Title</h2>
          <p className="text-gray-400">Description</p>
          <Button href="#" variant="primary" size="sm">Learn More</Button>
        </GlassCard>
      </div>
    </div>
  );
}
```

## Next Steps

1. Configure Mapbox token in `.env.local`
2. Start dev server: `npm run dev`
3. Build other pages using the established component library
4. Deploy to Vercel (environment variables set in project settings)

## Deployment

Set environment variables in your deployment platform:
- **Vercel**: Project Settings → Environment Variables
- **Other platforms**: Follow their env var documentation

The `NEXT_PUBLIC_` prefix makes it safe for client-side use (no sensitive data).
