/**
 * foodRo Payment & QR Scanner Configuration
 * ----------------------------------------------------
 * You can insert your own real-world payment credentials below!
 * No customer account linking is required—payments route instantly
 * through verified UPI handles, Google Pay, and PayPal.
 */

export const PAYMENT_CONFIG = {
  // 1. Unified Payments Interface (UPI) & Google Pay
  upi: {
    // Replace with your real UPI VPA (e.g., 'mohit@okhdfcbank', 'paytm-987654@paytm', 'merchant@ybl')
    merchantVpa: 'mohit809@upi',
    merchantName: 'foodRo Gourmet Services',
    merchantCategoryCode: '5411', // Grocery & Restaurants MCC
    validUpiSuffixes: [
      '@upi', '@okhdfcbank', '@okaxis', '@okicici', '@oksbi',
      '@paytm', '@ybl', '@ibl', '@axl', '@apl', '@barodampay'
    ]
  },

  // 2. Google Pay Business Details
  googlePay: {
    merchantId: 'foodro-gourmet-delivery-2026',
    merchantName: 'foodRo Delivery & Cloud Kitchens',
    currencyCode: 'INR',
    gateway: 'example'
  },

  // 3. PayPal Express & PayPal.Me (International multi-currency USD / EUR / GBP / JPY)
  paypal: {
    // Replace with your PayPal Developer Client ID or PayPal.Me username
    clientId: 'YOUR_PAYPAL_CLIENT_ID',
    paypalMeUsername: 'mohit809',
    merchantEmail: 'payments@foodro.com',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'AED', 'INR']
  }
};
