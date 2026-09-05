/**
 * foodRo Database Service Layer
 * ----------------------------------------------------
 * High-performance, asynchronous persistent database service.
 * Supports offline-first IndexedDB, LocalStorage syncing, and
 * easy remote plug-in for Supabase, PostgreSQL, or Firebase.
 */

import { DB_CONFIG } from '../config/dbConfig';
import { INITIAL_FOOD_ITEMS, INITIAL_RESTAURANTS } from '../data/mockData';

const DB_NAME = 'foodro_database';
const DB_VERSION = 2;

// IndexedDB Helper
class FoodRoDatabase {
  constructor() {
    this.db = null;
    this.initPromise = this.init();
  }

  async init() {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return null;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // 1. Users Store
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'email' });
          userStore.createIndex('phone', 'phone', { unique: false });
        }

        // 2. Orders Store
        if (!db.objectStoreNames.contains('orders')) {
          const orderStore = db.createObjectStore('orders', { keyPath: 'orderId' });
          orderStore.createIndex('createdAt', 'createdAt', { unique: false });
          orderStore.createIndex('status', 'status', { unique: false });
        }

        // 3. Payment Transactions Store
        if (!db.objectStoreNames.contains('payments')) {
          const payStore = db.createObjectStore('payments', { keyPath: 'transactionId' });
          payStore.createIndex('orderId', 'orderId', { unique: false });
          payStore.createIndex('paymentMethod', 'paymentMethod', { unique: false });
        }

        // 4. Partner Restaurants / Hotels Store
        if (!db.objectStoreNames.contains('restaurants')) {
          const restStore = db.createObjectStore('restaurants', { keyPath: 'id' });
          restStore.createIndex('name', 'name', { unique: false });
        }

        // 5. Dishes / Catalog Store
        if (!db.objectStoreNames.contains('dishes')) {
          const dishStore = db.createObjectStore('dishes', { keyPath: 'id' });
          dishStore.createIndex('category', 'category', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.warn('IndexedDB initialisation fallback to LocalStorage:', event.target.error);
        resolve(null);
      };
    });
  }

  // Generic transactional read
  async getAll(storeName) {
    await this.initPromise;
    if (!this.db) {
      const data = localStorage.getItem(`foodro_db_${storeName}`);
      return data ? JSON.parse(data) : [];
    }

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => {
          // If store is empty, check localStorage as fallback
          if (!request.result || request.result.length === 0) {
            const fallback = localStorage.getItem(`foodro_db_${storeName}`);
            resolve(fallback ? JSON.parse(fallback) : []);
          } else {
            resolve(request.result);
          }
        };
        request.onerror = () => {
          const fallback = localStorage.getItem(`foodro_db_${storeName}`);
          resolve(fallback ? JSON.parse(fallback) : []);
        };
      } catch {
        const fallback = localStorage.getItem(`foodro_db_${storeName}`);
        resolve(fallback ? JSON.parse(fallback) : []);
      }
    });
  }

  // Generic transactional put
  async put(storeName, item) {
    await this.initPromise;
    
    // Always sync to LocalStorage as instant backup
    try {
      const items = await this.getAll(storeName);
      const keyPath = storeName === 'users' ? 'email' : storeName === 'orders' ? 'orderId' : storeName === 'payments' ? 'transactionId' : 'id';
      const existingIdx = items.findIndex(i => i[keyPath] === item[keyPath]);
      let updated;
      if (existingIdx >= 0) {
        updated = items.map((it, idx) => idx === existingIdx ? { ...it, ...item } : it);
      } else {
        updated = [item, ...items];
      }
      localStorage.setItem(`foodro_db_${storeName}`, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage sync warning:', e);
    }

    if (!this.db) return item;

    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(item);
        request.onsuccess = () => resolve(item);
        request.onerror = () => resolve(item);
      } catch {
        resolve(item);
      }
    });
  }

  // Delete
  async delete(storeName, key) {
    await this.initPromise;
    try {
      const items = await this.getAll(storeName);
      const keyPath = storeName === 'users' ? 'email' : storeName === 'orders' ? 'orderId' : storeName === 'payments' ? 'transactionId' : 'id';
      const updated = items.filter(i => i[keyPath] !== key);
      localStorage.setItem(`foodro_db_${storeName}`, JSON.stringify(updated));
    } catch {}

    if (!this.db) return true;

    return new Promise((resolve) => {
      try {
        const transaction = this.db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => resolve(true);
        request.onerror = () => resolve(true);
      } catch {
        resolve(true);
      }
    });
  }
}

const localDb = new FoodRoDatabase();

export const dbService = {
  // ---- USER MANAGEMENT ----
  async getUsers() {
    const users = await localDb.getAll('users');
    if (!users || users.length === 0) {
      // Default initial mock user
      const defaultUser = {
        name: 'Mohit Kumar',
        email: 'mohit.kumar@foodro.com',
        phone: '+91 98765 43210',
        isEmailVerified: true,
        isPhoneVerified: true,
        twoFactorEnabled: true,
        memberSince: '2026',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'admin'
      };
      await localDb.put('users', defaultUser);
      return [defaultUser];
    }
    return users;
  },

  async saveUser(user) {
    return await localDb.put('users', user);
  },

  async getUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(u => u.email?.toLowerCase() === email?.toLowerCase()) || null;
  },

  // ---- ORDER MANAGEMENT ----
  async getOrders() {
    return await localDb.getAll('orders');
  },

  async saveOrder(order) {
    return await localDb.put('orders', order);
  },

  async updateOrderStatus(orderId, newStatus) {
    const orders = await this.getOrders();
    const target = orders.find(o => o.orderId === orderId);
    if (target) {
      target.status = newStatus;
      target.updatedAt = new Date().toISOString();
      await localDb.put('orders', target);
      return target;
    }
    return null;
  },

  // ---- PAYMENT TRANSACTIONS ----
  async getPayments() {
    return await localDb.getAll('payments');
  },

  async savePayment(payment) {
    return await localDb.put('payments', payment);
  },

  // ---- RESTAURANT PARTNERS ----
  async getRestaurants() {
    const list = await localDb.getAll('restaurants');
    if (!list || list.length === 0) {
      // Populate defaults
      for (const r of INITIAL_RESTAURANTS) {
        await localDb.put('restaurants', {
          ...r,
          email: `${r.id}@foodro-partner.com`,
          phone: '+91 98100 23456',
          payoutAccount: {
            bankName: 'HDFC Bank',
            accountNumber: '•••• •••• 8291',
            ifsc: 'HDFC0001829',
            upiId: `${r.id}@okhdfcbank`,
            payoutSchedule: 'Daily'
          }
        });
      }
      return await localDb.getAll('restaurants');
    }
    return list;
  },

  async saveRestaurant(restaurant) {
    return await localDb.put('restaurants', restaurant);
  },

  // ---- DISHES / MENU ----
  async getDishes() {
    const list = await localDb.getAll('dishes');
    if (!list || list.length === 0) {
      for (const d of INITIAL_FOOD_ITEMS) {
        await localDb.put('dishes', d);
      }
      return await localDb.getAll('dishes');
    }
    return list;
  },

  async saveDish(dish) {
    return await localDb.put('dishes', dish);
  },

  async deleteDish(dishId) {
    return await localDb.delete('dishes', dishId);
  },

  // ---- EXPORT & BACKUP ----
  async exportDatabase() {
    const [users, orders, payments, restaurants, dishes] = await Promise.all([
      this.getUsers(),
      this.getOrders(),
      this.getPayments(),
      this.getRestaurants(),
      this.getDishes()
    ]);

    return {
      appName: 'foodRo',
      exportedAt: new Date().toISOString(),
      version: DB_VERSION,
      activeProvider: DB_CONFIG.activeProvider,
      data: {
        users,
        orders,
        payments,
        restaurants,
        dishes
      }
    };
  }
};
