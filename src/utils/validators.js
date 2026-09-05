/**
 * FoodRo Validation Utilities
 * Centralized, reusable validators for authentication, KYC, phone, email, and payments.
 */

/**
 * Validates email format (RFC 5322 compliant pattern)
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates Indian 10-digit mobile phone numbers with optional +91 or 0 prefix
 */
export function isValidIndianPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  const indianPhoneRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(cleanPhone);
}

/**
 * Validates international phone numbers (E.164 format or standard numeric with country code)
 */
export function isValidInternationalPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const cleanPhone = phone.replace(/[\s\-()]/g, '');
  const intlRegex = /^\+?[1-9]\d{7,14}$/;
  return intlRegex.test(cleanPhone);
}

/**
 * Validates Indian Income Tax PAN Card Number
 * Format: 5 uppercase letters, 4 digits, 1 uppercase letter (e.g. ABCDE1234F)
 */
export function isValidPanCard(pan) {
  if (!pan || typeof pan !== 'string') return false;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan.trim().toUpperCase());
}

/**
 * Validates Food Safety and Standards Authority of India (FSSAI) License Number
 * Format: 14 numerical digits
 */
export function isValidFssai(fssai) {
  if (!fssai || typeof fssai !== 'string') return false;
  const cleanFssai = fssai.replace(/[\s\-]/g, '');
  return /^\d{14}$/.test(cleanFssai);
}

/**
 * Validates Indian Goods and Services Tax Identification Number (GSTIN)
 * Format: 15 alphanumeric characters (2 state digits + 10 PAN + 1 entity + 'Z' + 1 checksum)
 */
export function isValidGstin(gstin) {
  if (!gstin || typeof gstin !== 'string') return false;
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin.trim().toUpperCase());
}

/**
 * Validates Unified Payments Interface (UPI) VPA ID
 * Format: alphanumeric/special followed by @provider (e.g., mohit@upi, merchant@okaxis)
 */
export function isValidUpiId(upiId) {
  if (!upiId || typeof upiId !== 'string') return false;
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  return upiRegex.test(upiId.trim());
}

/**
 * Validates GPS Coordinates (Latitude between -90 and 90, Longitude between -180 and 180)
 */
export function isValidCoordinates(lat, lng) {
  const numLat = parseFloat(lat);
  const numLng = parseFloat(lng);
  if (isNaN(numLat) || isNaN(numLng)) return false;
  return numLat >= -90 && numLat <= 90 && numLng >= -180 && numLng <= 180;
}

/**
 * Formats a phone number cleanly with spacing
 */
export function formatPhoneNumber(phone) {
  if (!phone) return '';
  const clean = phone.replace(/[\s\-()]/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  if (clean.startsWith('+91') && clean.length === 13) {
    return `+91 ${clean.slice(3, 8)} ${clean.slice(8)}`;
  }
  return phone;
}
