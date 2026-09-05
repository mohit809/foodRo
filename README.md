<div align="center">

# 🍔 foodRo - Fast & Fresh Food Delivery App

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https%3A%2F%2Fmohit809.github.io%2FfoodRo%2F-orange?style=for-the-badge&logo=google-chrome&logoColor=white)](https://mohit809.github.io/foodRo/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-mohit809%2FfoodRo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohit809/foodRo)
[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-Automated%20Deploy-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/mohit809/foodRo/actions)
[![License](https://img.shields.io/badge/License-Proprietary%20%26%20Permission%20Required-red?style=for-the-badge&logo=lock&logoColor=white)](LICENSE)

<p align="center">
  <strong>Superfast, chef-crafted gourmet food delivery web application built with React 19, Vite, and Tailwind CSS.</strong><br>
  Featuring automatic regional multi-currency conversion, high-security 2-step OTP authentication, a partner hotel/restaurant listing portal, and native Android mobile UI with live order tracking.
</p>

[**Explore Live Application »**](https://mohit809.github.io/foodRo/)

</div>

---

## 🌟 Table of Contents
- [✨ Key Highlights](#-key-highlights)
- [📱 Mobile & Android Native UX](#-mobile--android-native-ux)
- [🌍 Automatic Multi-Currency System](#-automatic-multi-currency-system)
- [🔐 High-Security 2-Step OTP Verification](#-high-security-2-step-otp-verification)
- [🏨 Restaurant & Hotel Partner Portal](#-restaurant--hotel-partner-portal)
- [🛵 Real-Time Live Order Tracking](#-real-time-live-order-tracking)
- [🎟️ Discounts & Promo Codes Engine](#️-discounts--promo-codes-engine)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Architecture & File Structure](#-project-architecture--file-structure)
- [🚀 Getting Started (Local Setup)](#-getting-started-local-setup)
- [📦 Deployment](#-deployment)
- [🔌 Model Context Protocol (MCP) Integration](#-model-context-protocol-mcp-integration)
- [📄 License & Author](#-license--author)

---

## ✨ Key Highlights

* **Diverse Global & Regional Menu**: Steaming Darjeeling Momos, Kurkure Paneer Momos, Woodfired Burrata Pizza, Truffle Wagyu Smash Burgers, Spicy Dragon Salmon Sushi, Royal Dum Biryani, and Molten Lava Cakes.
* **Instant Filtering & Search**: Real-time autocomplete search matching dishes, cuisines, ingredients, and restaurant names with 1-click **Pure Veg** toggle and **Bestsellers Only** filter.
* **Rich Dish Customization**: Select portion sizes (Regular, Large, Family Feast), choose add-on toppings/dips, and leave custom chef cooking instructions.
* **Smart Shopping Basket**: Dynamic fee calculation, tax breakdown (8%), platform fee, free delivery threshold triggers, and real-time coupon deduction.
* **Order History & 1-Click Reorder**: Past orders persisted in `localStorage` with instant reordering and tracking review.
* **Wishlist & Favorites**: Save dishes with 1-click heart bookmarking.

---

## 📱 Mobile & Android Native UX

foodRo is engineered mobile-first with an authentic native app experience:

| Mobile Feature | Description |
| :--- | :--- |
| **Native Bottom Navigation** | Fixed bottom nav bar (`md:hidden`) for quick navigation between **Explore**, **Search**, **Orders**, **Favorites**, and **Profile**. |
| **Floating Sticky Cart Bar** | A floating pill above the bottom nav (similar to Swiggy / Zomato) displaying `X ITEMS IN BASKET • ₹XXX` and a fast `View Cart →` trigger. |
| **Native Bottom Sheets** | Modals on mobile slide up smoothly from the bottom with a native grab/drag handle indicator (`rounded-t-3xl`), maximizing vertical screen space. |
| **Android PWA Ready** | Configured with `public/manifest.json` and `#ea580c` status bar theming for **"Add to Home Screen"** standalone installation without browser chrome. |
| **Touch Hit-Targets** | Minimum 44×44px thumb hit targets, touch-pan gestures, and `-webkit-tap-highlight-color: transparent`. |

---

## 🌍 Automatic Multi-Currency System

The application detects your location/region from your browser timezone/locale and automatically formats all prices, fees, and discounts:

| Region / Flag | Currency Code | Symbol | Rate (USD Base) | Display Example |
| :---: | :---: | :---: | :---: | :---: |
| 🇮🇳 India | **INR** | `₹` | 86.5 | `₹389` |
| 🇺🇸 United States | **USD** | `$` | 1.00 | `$14.99` |
| 🇯🇵 Japan | **JPY** | `¥` | 154.0 | `¥2,310` |
| 🇪🇺 Europe | **EUR** | `€` | 0.93 | `€13.94` |
| 🇬🇧 United Kingdom | **GBP** | `£` | 0.79 | `£11.84` |
| 🇦🇺 Australia | **AUD** | `A$` | 1.55 | `A$23.23` |
| 🇨🇦 Canada | **CAD** | `C$` | 1.39 | `C$20.84` |
| 🇦🇪 UAE | **AED** | `AED` | 3.67 | `AED 55.01` |

> [!NOTE]
> Users can also switch their country/currency anytime using the interactive dropdown in the header or the mobile menu.

---

## 🔐 High-Security 2-Step OTP Verification

Modeled after leading fintech and delivery services (Swiggy, Zomato, Uber):

```mermaid
graph LR
  A[Step 1: Phone / Name] --> B[Step 2: 6-Digit OTP Verification]
  B --> C[Step 3: 2-Step PIN Authorization]
  C --> D[2FA Verified Profile & Checkout Unlocked]
```

1. **Step 1 (Identity)**: Mobile number or email address submission with country code.
2. **Step 2 (6-Digit OTP)**: Auto-advancing digit inputs with 30s resend timer and a simulated **Security SMS Push Notification** with 1-click auto-fill.
3. **Step 3 (2-Step PIN)**: 4-digit security PIN confirmation for identity verification.
4. **Verified Profile**: Grants a **"2-Step Verified User"** badge, automatic address saving, and secure session persistence.

---

## 🏨 Restaurant & Hotel Partner Portal

Own a cloud kitchen, hotel, or restaurant? The built-in **Partner Portal** allows merchants to list and manage their culinary offerings directly:

* **Register Hotels / Cloud Kitchens**: Enter restaurant name, cuisines, physical address, delivery speed, and banner image.
* **List New Food Items**:
  * Dish Name & Category (**🥟 Momos**, **🍕 Pizza**, **🍔 Burgers**, **🍛 Biryani**, **🍣 Asian**, **🥗 Healthy**, etc.)
  * Price in active currency with automatic USD base conversion
  * Veg / Non-Veg dietary flag & Bestseller badge
  * Prep time, calories, and image presets
  * Add-on toppings & portion customization
* **Instant Menu Synchronization**: Newly listed dishes appear immediately in the public catalog and persist across sessions via `localStorage`.

---

## 🛵 Real-Time Live Order Tracking

Watch the delivery process from flame to door with an interactive simulation:

* **Milestone Progress Stepper**:
  1. `Order Confirmed` 📋
  2. `Cooking with Passion` 🍳
  3. `Out for Delivery` 🛵
  4. `Delivered Fresh` 🎉
* **Animated SVG Route Map**: Watch courier **Marcus Vance** move in real time along the road from the kitchen to your address.
* **Driver Card**: View driver photo, vehicle (Honda PCX Scooter), rating (4.95 ★), license plate (`7RO-982`), and call/message triggers.
* **Live Countdown Timer**: Real-time minutes & seconds delivery countdown with a **"Simulate Next Step"** test button.

---

## 🎟️ Discounts & Promo Codes Engine

| Promo Code | Discount | Minimum Order | Description |
| :--- | :--- | :--- | :--- |
| **`FOODRO50`** | **50% OFF** (up to $15 / ₹1,200) | $15 / ₹1,200 | Half-price feast discount (Default active) |
| **`MOMOLOV`** | **30% OFF** (up to $10 / ₹800) | $10 / ₹800 | Exclusive discount on Momos & Dimsums |
| **`FREEDEL`** | **Free Delivery** | $12 / ₹1,000 | Zero delivery charges |
| **`WELCOME10`** | **Flat $10 / ₹800 OFF** | $25 / ₹2,000 | Welcome bonus for new members |

---

## 🛠️ Tech Stack

* **Core Framework**: [React 19](https://react.dev/) + [Vite 6](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Typography**: Plus Jakarta Sans (Google Fonts)
* **Persistence**: LocalStorage with custom sync hooks
* **Hosting**: GitHub Pages via [GitHub Actions CI/CD](https://github.com/features/actions)

---

## 📁 Project Architecture & File Structure

```text
foodRo/
├── .agents/
│   └── mcp_config.json          # MCP tool configurations
├── .github/
│   └── workflows/
│       └── deploy.yml           # Automated GitHub Pages CI/CD workflow
├── public/
│   └── manifest.json            # PWA Web App Manifest
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx        # 2-Step OTP authentication modal
│   │   ├── CartDrawer.jsx       # Slide-over cart & bill breakdown
│   │   ├── CategoryFilter.jsx   # Swipeable cuisine filter pills
│   │   ├── CheckoutModal.jsx    # Delivery address & payment selection
│   │   ├── CustomizeModal.jsx   # Dish portion & add-ons bottom sheet
│   │   ├── FavoritesModal.jsx   # Saved favorites wishlist drawer
│   │   ├── FoodCard.jsx         # Dish card with ratings, price & add CTA
│   │   ├── MobileBottomNav.jsx  # Native Android bottom navigation bar
│   │   ├── MobileCartBar.jsx    # Floating sticky mobile cart pill
│   │   ├── Navbar.jsx           # Responsive header & slide-out drawer
│   │   ├── OrderHistoryModal.jsx# Past orders list & 1-click reorder
│   │   ├── OrderTrackingModal.jsx# Live delivery map & driver tracker
│   │   ├── PromoCarousel.jsx    # Promo banners with 1-click apply
│   │   └── RestaurantPortalModal.jsx # Merchant listing & food portal
│   ├── data/
│   │   └── mockData.js          # Menu catalog, restaurants & promo codes
│   ├── utils/
│   │   └── currency.js          # Multi-currency exchange & detection logic
│   ├── App.jsx                  # Master application orchestrator & state
│   ├── index.css                # Global styles, touch & safe-area classes
│   └── main.jsx                 # React root mounting
├── index.html                   # Mobile viewport, favicon & PWA meta tags
├── package.json                 # Project dependencies & build scripts
├── vercel.json                  # Client-side SPA routing configuration
├── vite.config.js               # Vite bundler & relative path settings
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your system.

### 1. Clone the Repository
```bash
git clone https://github.com/mohit809/foodRo.git
cd foodRo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```
Compiled production files will be generated in the `dist/` directory.

---

## 📦 Deployment

### GitHub Pages (Configured & Live)
This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`). Any push to `master` triggers a build and deploys live to:
👉 **[https://mohit809.github.io/foodRo/](https://mohit809.github.io/foodRo/)**

### Vercel (Alternative)
Run:
```bash
npx vercel
```
Or import `mohit809/foodRo` directly into the Vercel dashboard.

### Netlify (Alternative)
Drag and drop the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop) for instant hosting.

---

## 🔌 Model Context Protocol (MCP) Integration

foodRo includes a pre-configured [`.agents/mcp_config.json`](.agents/mcp_config.json) to enable AI developer tooling and automation:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\mohit\\Desktop\\foodRo"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN" }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://user:password@localhost:5432/foodro_db"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "YOUR_KEY" }
    }
  }
}
```

---

## 🔒 License & Copyright

**Copyright © 2026 [Mohit Kumar](https://github.com/mohit809). All Rights Reserved.**

> [!IMPORTANT]
> **Proprietary & Permission-Required**: No person, organization, or entity is permitted to use, copy, reproduce, modify, sublicense, distribute, or deploy this project or its source code in any form without explicit prior written approval and authorization from the owner (**Mohit Kumar**).
>
> For permissions, collaborations, or authorization requests, please contact: [https://github.com/mohit809](https://github.com/mohit809)

<div align="center">
  <sub>Built for foodies worldwide • Powered by foodRo</sub>
</div>
