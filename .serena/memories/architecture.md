# foodRo Architecture & File Management Memory

## Overview
- Framework: React 18 + Vite + Tailwind CSS
- State Management: Local state coordinated in `App.jsx`, persistent storage in `src/services/db.js`
- Persistence: Dual-layer offline-first IndexedDB (`foodro_database` v2) + LocalStorage fallback
- Styling: Tailwind CSS with dark mode support and responsive mobile utilities

## Directory Structure
- `src/components/`: Modular React components. Central barrel export at `src/components/index.js`.
- `src/config/`: External integrations (`dbConfig.js`, `paymentConfig.js`). Central barrel export at `src/config/index.js`.
- `src/services/`: Database and async operations (`db.js`). Central barrel export at `src/services/index.js`.
- `src/utils/`: Multi-currency engine (`currency.js`) and reusable validators (`validators.js`). Central barrel export at `src/utils/index.js`.
- `src/data/`: Mock catalogs, restaurants, and coupons (`mockData.js`).
- `docs/`: Engineering architecture, Serena guide, and contributing guidelines.

## Conventions
- Use barrel exports (`from './components'`, `from './utils'`, etc.)
- Do not hardcode credentials; configure in `src/config/`
- Run `serena project index .` after adding/updating code files
