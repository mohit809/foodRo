# 📂 foodRo - Project Structure & File Management Architecture

This document provides a complete guide to the file structure, directory responsibilities, and coding conventions in **foodRo** so that any engineer, designer, or product manager on the team can navigate, understand, and contribute effortlessly.

---

## 🗺️ High-Level Directory Overview

```
foodRo/
├── .agents/                    # Multi-agent & MCP server configurations
│   └── mcp_config.json         # Serena, Filesystem, GitHub, Postgres, Puppeteer configs
├── .github/                    # GitHub configuration & workflows
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── .serena/                    # Serena semantic code intelligence configuration
│   └── project.yml             # Project LSP configuration (typescript/react)
├── docs/                       # Engineering & team documentation
│   ├── PROJECT_STRUCTURE.md    # You are here: Complete file map & module boundaries
│   ├── SERENA_GUIDE.md         # Serena AI plugin & semantic tool guide
│   └── CONTRIBUTING.md         # Standards, barrel imports, and PR etiquette
├── public/                     # Static assets served at root
│   └── vite.svg                # Vite logo asset
├── src/                        # Main application source code
│   ├── components/             # React UI components (16 modular modals & views)
│   │   ├── AuthModal.jsx             # OTP, Email, Phone verification & 2FA
│   │   ├── CartDrawer.jsx            # Desktop cart sidebar with tip & express options
│   │   ├── CategoryFilter.jsx        # Horizontal category selector
│   │   ├── CheckoutModal.jsx         # Delivery address, GPS sharing, order summary
│   │   ├── CustomizeModal.jsx        # Dish spice level, add-ons, & special instructions
│   │   ├── DatabaseManagerModal.jsx  # In-app DB viewer, live editor, JSON backup/export
│   │   ├── FavoritesModal.jsx        # Saved bookmark dishes
│   │   ├── FoodCard.jsx              # Individual dish card with add/customize/favorite
│   │   ├── MobileBottomNav.jsx       # Native mobile bottom tab bar (Home, Search, Orders, Profile)
│   │   ├── MobileCartBar.jsx         # Floating Android/iOS bottom checkout bar
│   │   ├── Navbar.jsx                # Responsive header with location selector & currency switcher
│   │   ├── OrderHistoryModal.jsx     # Past orders list, status tags, re-order buttons
│   │   ├── OrderTrackingModal.jsx    # Real-time simulated delivery boy GPS tracking
│   │   ├── PaymentQrModal.jsx        # Dynamic verified QR code scanner (UPI/GPay/PayPal)
│   │   ├── PromoCarousel.jsx         # Rotating banners with active coupon codes
│   │   ├── RestaurantPortalModal.jsx # Merchant onboarding, KYC, device image upload
│   │   └── index.js                  # 🌟 Central Barrel Export for all components
│   ├── config/                 # Environment & external service configurations
│   │   ├── dbConfig.js         # Supabase, Firebase, PostgreSQL, and custom API settings
│   │   ├── paymentConfig.js    # Merchant UPI VPAs, Google Pay IDs, PayPal endpoints
│   │   └── index.js            # 🌟 Central Barrel Export for configurations
│   ├── data/                   # Mock data & initial seed datasets
│   │   └── mockData.js         # 18 food items, 6 restaurants, coupons, categories
│   ├── services/               # Asynchronous service layer & data adapters
│   │   ├── db.js               # Dual IndexedDB + LocalStorage sync & remote hooks
│   │   └── index.js            # 🌟 Central Barrel Export for services
│   ├── utils/                  # Helper utilities, formatters, and validators
│   │   ├── currency.js         # Multi-currency engine (INR, USD, EUR, GBP, JPY, AUD, CAD, AED)
│   │   ├── validators.js       # Reusable validators for Email, Phone, PAN, FSSAI, GSTIN, UPI
│   │   └── index.js            # 🌟 Central Barrel Export for utilities
│   ├── App.jsx                 # Core root component (State management, event coordinators)
│   ├── index.css               # Tailwind CSS utility imports and global styles
│   └── main.jsx                # React 18 DOM mount point
├── index.html                  # HTML5 entry template with viewport meta tags
├── package.json                # Dependencies, build scripts, project metadata
├── tailwind.config.js          # Tailwind CSS theme extensions
├── vercel.json                 # Vercel deployment routing fallback
└── vite.config.js              # Vite bundler configuration with React plugin
```

---

## 📦 Directory Breakdown & Team Responsibilities

### 1. `src/components/` (UI Components)
Every UI element in the app lives in this folder.
- **Rule of Thumb**: Components are modular, accept callbacks for actions, and don't directly mutate global storage without calling services.
- **Central Barrel (`src/components/index.js`)**: All components are exported from `index.js`. 
  - **Preferred Import**:
    ```javascript
    import { Navbar, CartDrawer, FoodCard } from './components';
    ```
  - **Avoid**:
    ```javascript
    import Navbar from './components/Navbar';
    import CartDrawer from './components/CartDrawer';
    ```

#### Component Reference Table
| Component | Primary Purpose | Key Props / Dependencies |
| :--- | :--- | :--- |
| `Navbar` | Global sticky header, brand, live location picker, currency switcher, search bar | `user`, `cartCount`, `currency`, `onSearchChange` |
| `PromoCarousel` | Dynamic promo banners with 1-click coupon application | `onSelectCoupon` |
| `CategoryFilter` | Filter dishes by category (Burgers, Pizza, Asian, Desserts, etc.) | `categories`, `selectedCategory`, `onSelectCategory` |
| `FoodCard` | Product display card with image, dietary badge, price in active currency, add/customize | `item`, `currency`, `onAdd`, `onCustomize`, `isFavorite` |
| `CustomizeModal` | Modal to choose portion size, spice level, and toppings | `item`, `isOpen`, `onClose`, `onAddToCart` |
| `CartDrawer` | Side drawer showing cart items, tip selector (₹20/₹30/₹50/Custom), priority delivery | `isOpen`, `cartItems`, `onUpdateQty`, `onCheckout` |
| `CheckoutModal` | Delivery address, customer phone verification, live GPS sharing | `isOpen`, `cartTotal`, `user`, `onPlaceOrder` |
| `PaymentQrModal` | Scans/displays verified UPI / Google Pay / PayPal dynamic QR codes | `isOpen`, `amount`, `orderId`, `onSuccess` |
| `OrderTrackingModal` | Live visual map tracking delivery rider to customer coordinates | `order`, `isOpen`, `onClose` |
| `OrderHistoryModal` | Displays customer's previous orders, timestamps, and receipt | `isOpen`, `orders`, `onReorder` |
| `FavoritesModal` | Displays user's bookmarked food items with quick-add | `isOpen`, `favorites`, `onClose` |
| `AuthModal` | Email verification, phone OTP verification, 2FA toggle | `isOpen`, `onLoginSuccess`, `onClose` |
| `RestaurantPortalModal` | Partner restaurant onboarding, PAN/FSSAI verification, local file photo upload | `isOpen`, `onAddDish`, `onRegisterRestaurant` |
| `DatabaseManagerModal` | Real-time database table viewer, record modifier, JSON backup/export | `isOpen`, `onClose` |
| `MobileBottomNav` | Bottom tab bar for Android/iOS devices | `activeTab`, `setActiveTab`, `cartCount` |
| `MobileCartBar` | Sticky bottom floating checkout pill on small screens | `itemCount`, `totalAmount`, `onOpenCart` |

---

### 2. `src/config/` (Settings & Integrations)
Holds all configuration files so credentials, third-party endpoints, and payment VPAs are separated from code logic.

- `dbConfig.js`: Change `activeProvider` from `'local'` to `'supabase'`, `'firebase'`, or `'custom_api'` and paste your API keys.
- `paymentConfig.js`: Change `merchantVpa` to your business UPI address (e.g. `yourname@okhdfcbank`), Google Pay merchant ID, or PayPal.Me link.
- `index.js`: Barrel export for all configurations.

---

### 3. `src/services/` (Data Access & Persistence)
Encapsulates all asynchronous storage and API interaction.

- `db.js`:
  - Runs dual-storage persistence: Primary fast **IndexedDB** (`foodro_database` v2) backed by synchronous **LocalStorage**.
  - Provides CRUD methods: `getUsers()`, `saveUser()`, `getOrders()`, `saveOrder()`, `getRestaurants()`, `saveRestaurant()`, `getDishes()`, `saveDish()`, `getPayments()`, `recordPayment()`, `exportFullDatabase()`.
- `index.js`: Barrel export for all services.

---

### 4. `src/utils/` (Helper Functions & Formatters)
Pure, unit-testable helper functions.

- `currency.js`: Converts prices into 8 global currencies (`INR`, `USD`, `EUR`, `GBP`, `JPY`, `AUD`, `CAD`, `AED`), formats currency symbols according to user locale.
- `validators.js`: Validates input values:
  - `isValidEmail(email)`
  - `isValidIndianPhone(phone)`
  - `isValidInternationalPhone(phone)`
  - `isValidPanCard(pan)`
  - `isValidFssai(fssai)`
  - `isValidGstin(gstin)`
  - `isValidUpiId(upiId)`
  - `isValidCoordinates(lat, lng)`
  - `formatPhoneNumber(phone)`
- `index.js`: Barrel export for all utilities.

---

### 5. `src/data/` (Seed & Mock Data)
- `mockData.js`:
  - Initial food items (`INITIAL_FOOD_ITEMS`) across 6 categories with images, nutritional data, and pricing.
  - Initial partner restaurants (`INITIAL_RESTAURANTS`) with ratings, cuisines, and coordinates.
  - Active promotional coupons (`VALID_COUPONS`) like `FOODRO50`, `WELCOME20`, `SUPERCHEF`.

---

## ⚡ File Management Best Practices for the Team

1. **Always Use Barrel Imports**:
   Import from `./components`, `./config`, `./services`, or `./utils` rather than deep relative paths.
2. **Never Hardcode Credentials**:
   Always place API keys, merchant UPI handles, or database connection strings in `src/config/`.
3. **Keep State As High As Necessary, As Low As Possible**:
   Global modal state is coordinated in `App.jsx`, while component-specific form state (e.g. photo preview in `RestaurantPortalModal`) remains encapsulated within the component.
4. **Semantic Code Search with Serena**:
   Use the pre-configured Serena plugin to find symbols, jump to definitions, and index code across files (see `docs/SERENA_GUIDE.md`).
