# Backflow Exam Prep — Digital Front Door

**The complete learning ecosystem for backflow certification training.**

Premium, quiet, intelligent platform with interactive courses, hands-on simulator, practice exams, and enterprise training tools.

## ✨ Features

- **Interactive Learning Center** — Video lessons, PDFs, notes, highlights, progress tracking
- **Hands-On Simulator** — Practice real backflow system procedures in a risk-free environment
- **Practice Exams** — Topic-specific and full practice tests with performance analytics
- **Organizations** — Workspace management, team training, compliance tracking, certificates
- **Enterprise Solutions** — Custom branding, SSO, API access, dedicated support
- **Mapbox Integration** — Interactive rotating Earth visualization (configurable style)
- **Mobile-First Design** — Fully responsive across all devices
- **Premium UI** — Glassmorphism, smooth animations, professional aesthetic

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure Mapbox (see below)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗺️ Mapbox Configuration

### Setup

1. **Get your Mapbox token:**
   - Go to [https://account.mapbox.com/tokens/](https://account.mapbox.com/tokens/)
   - Create a new public token or use an existing one
   - Copy the token (starts with `pk_`)

2. **Add to `.env.local`:**
   ```
   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk_your_token_here
   NEXT_PUBLIC_MAPBOX_STYLE=mapbox://styles/your_username/your_style_id
   ```

3. **Restart dev server:**
   ```bash
   npm run dev
   ```

The homepage hero will now show an interactive rotating Earth map with your custom style.

### Fallback
If Mapbox is not configured, the hero displays a gradient background. All functionality remains intact.

## 📋 Project Structure

```
my-bep/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout (Navbar, Footer)
│   ├── globals.css               # Design system
│   ├── learning/page.tsx         # Learning Center
│   ├── simulator/page.tsx        # Simulator
│   ├── practice-exams/page.tsx   # Practice Exams
│   ├── courses/page.tsx          # Course Library
│   ├── organizations/page.tsx    # Team Training
│   ├── enterprise/page.tsx       # Enterprise Solutions
│   ├── pricing/page.tsx          # Pricing Page
│   ├── about/page.tsx            # About Page
│   └── contact/page.tsx          # Contact Form
├── components/
│   ├── MapboxHero.tsx            # Hero with Mapbox
│   ├── ProductOverview.tsx       # Product cards
│   ├── Navbar.tsx                # Navigation
│   ├── Footer.tsx                # Footer
│   ├── Button.tsx                # Button component
│   ├── GlassCard.tsx             # Card component
│   └── Hero.tsx                  # Fallback hero
├── tailwind.config.ts            # Tailwind setup
├── next.config.ts                # Next.js config
├── package.json                  # Dependencies
├── .env.example                  # Env template
├── .env.local                     # Local config (not committed)
├── SETUP.md                       # Detailed setup guide
└── README.md                      # This file
```

## 🎨 Design System

### Colors
- **Primary**: `#3b82f6` (Electric Blue)
- **Secondary**: `#38bdf8` (Cyan)
- **Dark**: `#030712`, `#071322`, `#0b1d33`
- **Text**: `#f0f4f8` (Light), `#9ca3af` (Gray)

### Components

**Buttons**
```tsx
<Button variant="primary" size="md" href="/link">Click me</Button>
<Button variant="secondary" size="lg">Secondary</Button>
<Button variant="ghost">Ghost</Button>
```

**Cards**
```tsx
<GlassCard>
  <h3>Glass Card</h3>
  <p>Glassmorphic card with hover effects</p>
</GlassCard>
```

**Layout**
```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h1 className="heading-1">Main Title</h1>
  <p className="subtext">Body text</p>
</div>
```

### Responsive Breakpoints
- `sm:` — 640px (tablets)
- `md:` — 768px (large tablets)
- `lg:` — 1024px (desktops)

## 📦 Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # TypeScript type checking
```

## 🔧 Development

### Adding a New Page

Create a new directory under `app/` with a `page.tsx` file:

```tsx
// app/new-page/page.tsx
import GlassCard from "@/components/GlassCard";
import Button from "@/components/Button";

export default function NewPage() {
  return (
    <div className="w-full">
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="heading-1 text-white">Page Title</h1>
        <p className="subtext">Description</p>
      </section>

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-white font-semibold">Card Title</h3>
            <p className="text-gray-400">Card content</p>
            <Button href="#" variant="primary" size="sm">Learn More</Button>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
```

The navbar and footer are automatically included via the root layout.

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect to Vercel and auto-deploy
# Add environment variables in Vercel dashboard:
#   NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN = your_token
#   NEXT_PUBLIC_MAPBOX_STYLE = your_style
```

### Other Platforms

1. Build the project: `npm run build`
2. Deploy the `.next` directory
3. Set environment variables in platform settings
4. Start with: `npm run start`

## 📚 Pages & Routes

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | `/` | Landing page with hero, products, CTAs |
| Learning Center | `/learning` | Course library and lessons |
| Simulator | `/simulator` | Hands-on practice environment |
| Practice Exams | `/practice-exams` | Topic and full practice tests |
| Courses | `/courses` | Course catalog |
| Organizations | `/organizations` | Team training features |
| Enterprise | `/enterprise` | Custom solutions |
| Pricing | `/pricing` | Plans and pricing |
| About | `/about` | Company story and mission |
| Contact | `/contact` | Contact form and support info |

## 🎯 Next Steps

1. **Mapbox Configured** ✓ — Using custom Etheware style
2. **Customize Content** — Update course names, descriptions, pricing
3. **Add Authentication** — Connect to your LMS/SSO system
4. **Launch Learning** — Upload course content and simulator modules
5. **Deploy** — Push to Vercel or your hosting platform

## 📝 Notes

- No payment processing or auth logic (connect externally)
- All pages use the same design system
- Mobile-friendly across all devices
- Mapbox gracefully degrades if not configured
- TypeScript for full type safety
- ESLint for code quality

---

**Built with Next.js • Tailwind CSS • Mapbox GL • TypeScript**
