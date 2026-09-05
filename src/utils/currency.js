// Currency rates relative to base price (USD 1.0)
export const CURRENCIES = {
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    flag: '🇮🇳',
    rate: 86.5, // 1 USD = 86.5 INR
    locale: 'en-IN',
    fractionDigits: 0
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    flag: '🇺🇸',
    rate: 1.0,
    locale: 'en-US',
    fractionDigits: 2
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    flag: '🇪🇺',
    rate: 0.93,
    locale: 'de-DE',
    fractionDigits: 2
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    flag: '🇬🇧',
    rate: 0.79,
    locale: 'en-GB',
    fractionDigits: 2
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    flag: '🇯🇵',
    rate: 154.0,
    locale: 'ja-JP',
    fractionDigits: 0
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    flag: '🇦🇺',
    rate: 1.55,
    locale: 'en-AU',
    fractionDigits: 2
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    flag: '🇨🇦',
    rate: 1.39,
    locale: 'en-CA',
    fractionDigits: 2
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    flag: '🇦🇪',
    rate: 3.67,
    locale: 'ar-AE',
    fractionDigits: 2
  }
};

/**
 * Automatically detect country / currency from browser timezone or locale
 */
export function detectUserCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India')) return 'INR';
    if (tz.includes('Tokyo') || tz.includes('Japan')) return 'JPY';
    if (tz.includes('London') || tz.includes('Britain')) return 'GBP';
    if (tz.includes('Paris') || tz.includes('Berlin') || tz.includes('Rome') || tz.includes('Madrid') || tz.includes('Europe')) return 'EUR';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane')) return 'AUD';
    if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal')) return 'CAD';
    if (tz.includes('Dubai')) return 'AED';
  } catch (e) {
    // fallback
  }
  return 'INR'; // Default to INR as requested by user context
}

/**
 * Converts USD base price into target currency and formats string
 */
export function formatCurrency(usdAmount, currencyCode = 'INR') {
  if (typeof usdAmount !== 'number' || isNaN(usdAmount)) return '0';

  const config = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = usdAmount * config.rate;

  if (config.fractionDigits === 0) {
    // Rounded for INR, JPY
    return `${config.symbol}${Math.round(converted).toLocaleString(config.locale)}`;
  }

  return `${config.symbol}${converted.toLocaleString(config.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

/**
 * Convert base price directly as raw number
 */
export function convertPrice(usdAmount, currencyCode = 'INR') {
  const config = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = usdAmount * config.rate;
  return config.fractionDigits === 0 ? Math.round(converted) : Number(converted.toFixed(2));
}
