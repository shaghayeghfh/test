# Horizon Properties — Base44 Dev Environment

## Stack
- **Frontend:** Vite + React 18 + React Router 6
- **Language:** JavaScript (JSX)
- **Styling:** Single global CSS file (`src/styles/index.css`) with CSS custom properties
- **No backend / database** — all property data is in `src/data/properties.js` (structured to be connected to a DB later)

## Running
```
docker compose -f docker-compose.base44.yml up -d --build
```
The web service runs Vite dev server on port 5173, mapped to host port 3000. Live reload is active.

## Architecture
- `src/main.jsx` — entry, wraps App in BrowserRouter
- `src/App.jsx` — routes: `/` (Home), `/properties` (listing+filters), `/properties/:id` (detail)
- `src/components/` — reusable: Header, Footer, PropertyCard, Carousel (drag/swipe), Reveal (scroll animation), ScrollToTop
- `src/sections/` — homepage sections: Hero, About, FeaturedProperties, Services, WhyChooseUs, Team, CTA
- `src/pages/` — Home, Properties, PropertyDetail
- `src/data/` — `properties.js` (8 properties + helpers), `content.js` (agents, services, team, nav, contact)

## Key details
- Images: Unsplash direct URLs via the `img()` helper in `src/data/properties.js`
- PropertyCard is used in carousel (featured), grid, and similar sections
- Carousel supports mouse drag, touch swipe, keyboard arrows, and nav buttons
- Favorite button persists to localStorage (`horizon-favs`)
- Header is transparent over hero, becomes opaque navy on scroll
- Mobile menu is a full-screen overlay
