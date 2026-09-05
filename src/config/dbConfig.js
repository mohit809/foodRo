/**
 * foodRo Database Configuration
 * ----------------------------------------------------
 * You can easily connect your own database by pasting your
 * credentials below. By default, foodRo runs an ultra-fast,
 * persistent offline-first IndexedDB + LocalStorage database
 * so everything works right out of the box with zero setup!
 */

export const DB_CONFIG = {
  // Provider: 'local' (IndexedDB/LocalStorage) | 'supabase' | 'firebase' | 'custom_api'
  activeProvider: 'local',

  // 1. Supabase PostgreSQL Configuration
  // Simply paste your project URL and public Anon Key from https://supabase.com
  supabase: {
    url: 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co',
    anonKey: 'YOUR_SUPABASE_ANON_KEY',
    tables: {
      users: 'foodro_users',
      orders: 'foodro_orders',
      restaurants: 'foodro_restaurants',
      dishes: 'foodro_dishes',
      payments: 'foodro_payments'
    }
  },

  // 2. Firebase / Google Cloud Firestore Configuration
  // Paste your Firebase Web App configuration from Firebase Console
  firebase: {
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'YOUR_PROJECT.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  },

  // 3. Custom REST / Express / PostgreSQL Backend API Endpoint
  customApi: {
    baseUrl: 'https://api.yourdomain.com/v1',
    headers: {
      'Authorization': 'Bearer YOUR_API_SECRET_TOKEN',
      'Content-Type': 'application/json'
    }
  }
};
