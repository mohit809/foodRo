# foodRo 🍔 - Fast & Fresh Food Delivery App

A food delivery and ordering web application built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

---

## ✨ Features

- 🍽️ **Diverse Cuisine Menu**: Artisan pizzas, smash cheeseburgers, dragon sushi rolls, birria tacos, dum biryani, zen bowls, boba tea, and molten desserts.
- 🥗 **Dietary & Lifestyle Filters**: Instant 1-click Pure Veg toggle, Bestsellers only filter, price sorting, and rating filters.
- 🔍 **Real-Time Search**: Instant search matching dish titles, descriptions, cuisines, and restaurants.
- ⚙️ **Dish Customization Modal**: Choose portions (Regular, Large, Jumbo), add extra dips and toppings, and leave chef notes.
- 🛒 **Interactive Basket & Bill Breakdown**:
  - Quantity adjustments & instant removal
  - Promo code system (`FOODRO50` for 50% off, `FREEDEL` for free delivery, `WELCOME10`)
  - Item totals, delivery fees, taxes (8%), platform fee, and dynamic discounts
- 💳 **Checkout Flow**: Select delivery location (Home, Work, Other), customize payment mode (Card, Apple/Google Pay/UPI, COD).
- 🛵 **Real-time Live Order Tracking**:
  - Animated SVG city map route showing driver Marcus Vance en route on his scooter.
  - 4-step progress milestone (Confirmed → Cooking → Out for Delivery → Delivered).
  - Estimated delivery countdown timer with manual step simulation button.
- 📜 **Order History & One-Click Reorder**: Past orders saved in `localStorage`.
- ❤️ **Wishlist & Favorites**: Save loved dishes for fast access.
- 🔌 **MCP Integration**: Fully configured with `.agents/mcp_config.json` supporting Filesystem, Memory, Puppeteer, GitHub, Postgres, and Brave Search.

---

## 🚀 Quick Start

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 📁 Project Structure

```text
foodRo/
├── .agents/
│   └── mcp_config.json        # MCP server tool integrations
├── src/
│   ├── components/
│   │   ├── Navbar.jsx             # Header, search, filters & actions
│   │   ├── PromoCarousel.jsx      # Promotional coupon banners
│   │   ├── CategoryFilter.jsx     # Cuisine pill bar
│   │   ├── FoodCard.jsx           # Dish card with badges & add buttons
│   │   ├── CustomizeModal.jsx     # Dish portions & extras modal
│   │   ├── CartDrawer.jsx         # Slide-over cart & bill calculation
│   │   ├── CheckoutModal.jsx      # Address & payment flow
│   │   ├── OrderTrackingModal.jsx # Live tracking map & driver details
│   │   ├── OrderHistoryModal.jsx  # Past order history & reordering
│   │   └── FavoritesModal.jsx     # Saved favorites drawer
│   ├── data/
│   │   └── mockData.js            # Dishes, restaurants & promo codes
│   ├── App.jsx                    # Master app layout & state management
│   ├── index.css                  # Tailwind styles
│   └── main.jsx                   # React root entry
├── index.html
├── package.json
└── vite.config.js
```
