# 🤝 Contributing to foodRo

Welcome to the **foodRo** engineering team! This guide explains how to add new features, maintain clean file management, follow coding standards, and submit pull requests.

---

## ⚡ Quick Start

```bash
# 1. Clone your fork or the repository
git clone https://github.com/mohit809/foodRo.git
cd foodRo

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. (Optional) Run Serena code indexing
serena project index .
```

---

## 📐 File Management Standards

### 1. File & Directory Naming Conventions
- **React Components**: PascalCase (e.g., `OrderTrackingModal.jsx`, `FoodCard.jsx`).
- **Utilities & Services**: camelCase (e.g., `validators.js`, `currency.js`, `db.js`).
- **Configuration Files**: camelCase with `Config` suffix (e.g., `dbConfig.js`, `paymentConfig.js`).
- **Documentation**: UPPERCASE_WITH_UNDERSCORES in `docs/` (e.g., `PROJECT_STRUCTURE.md`).

### 2. Barrel Imports Rule
When creating a new component or utility:
1. Create your component in `src/components/YourComponent.jsx`.
2. Open `src/components/index.js` and add:
   ```javascript
   export { default as YourComponent } from './YourComponent';
   ```
3. In `App.jsx` or any consumer file, import it directly:
   ```javascript
   import { YourComponent } from './components';
   ```

### 3. Separation of Concerns
- **UI Logic**: Put JSX, layout, animations, and modal toggles in `src/components/`.
- **Data Persistence**: Put database operations, API requests, and local storage in `src/services/`.
- **Validation & Math**: Put pure functions, regex, and currency calculations in `src/utils/`.
- **Credentials & API Keys**: Put all environment URLs and merchant VPAs in `src/config/`.

---

## 🛠️ Step-by-Step Guides

### How to Add a New UI Component
1. Create `src/components/NewFeatureModal.jsx`:
   ```jsx
   import React from 'react';
   import { X } from 'lucide-react';

   export default function NewFeatureModal({ isOpen, onClose }) {
     if (!isOpen) return null;
     return (
       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
         <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
           <div className="flex items-center justify-between border-b pb-4">
             <h2 className="text-xl font-bold">New Feature</h2>
             <button onClick={onClose}><X className="w-5 h-5 text-zinc-400" /></button>
           </div>
           <div className="py-4">Content goes here...</div>
         </div>
       </div>
     );
   }
   ```
2. Export from `src/components/index.js`.
3. Import into `src/App.jsx` from `./components`.

---

### How to Add a New Database Method
1. Open `src/services/db.js`.
2. Add the method to `dbService`:
   ```javascript
   async getCoupons() {
     return await localDb.getAll('coupons');
   },
   async saveCoupon(coupon) {
     return await localDb.put('coupons', coupon);
   }
   ```
3. If using IndexedDB stores, register the store name in `init()`:
   ```javascript
   if (!db.objectStoreNames.contains('coupons')) {
     db.createObjectStore('coupons', { keyPath: 'code' });
   }
   ```

---

## 🧪 Verification Checklist Before Submitting PR

- [ ] `npm run build` runs cleanly with 0 errors.
- [ ] Mobile view verified (toggled responsive view at 375px & 412px).
- [ ] No hardcoded API keys or secret tokens in code files.
- [ ] Barrel export updated in `src/components/index.js` or `src/utils/index.js`.
- [ ] Re-indexed Serena symbols: `serena project index .`
