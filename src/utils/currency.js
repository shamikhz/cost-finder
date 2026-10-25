export const SUPPORTED_CURRENCIES = [
  { code: 'INR', symbol: '₹', label: 'INR (₹) - Indian Rupee', locale: 'en-IN', defaultTariff: 8.0 },
  { code: 'USD', symbol: '$', label: 'USD ($) - US Dollar', locale: 'en-US', defaultTariff: 0.16 },
  { code: 'EUR', symbol: '€', label: 'EUR (€) - Euro', locale: 'de-DE', defaultTariff: 0.28 },
  { code: 'GBP', symbol: '£', label: 'GBP (£) - British Pound', locale: 'en-GB', defaultTariff: 0.26 },
  { code: 'CAD', symbol: 'C$', label: 'CAD (C$) - Canadian Dollar', locale: 'en-CA', defaultTariff: 0.15 },
  { code: 'AUD', symbol: 'A$', label: 'AUD (A$) - Australian Dollar', locale: 'en-AU', defaultTariff: 0.30 },
];

export const DEFAULT_CURRENCY_CODE = 'INR';

/**
 * Format a numeric amount into a localized currency string.
 * @param {number} amount
 * @param {string} currencyCode
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
export function formatCurrency(amount, currencyCode = DEFAULT_CURRENCY_CODE, maximumFractionDigits = 0) {
  const numeric = typeof amount === 'number' && !Number.isNaN(amount) ? amount : 0;
  const config = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];

  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.code,
      maximumFractionDigits: maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits > 0 ? 2 : 0,
    }).format(numeric);
  } catch (err) {
    return `${config.symbol}${numeric.toLocaleString()}`;
  }
}

/**
 * Get the symbol for a given currency code.
 */
export function getCurrencySymbol(currencyCode = DEFAULT_CURRENCY_CODE) {
  const config = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];
  return config.symbol;
}

/**
 * Get the recommended default electricity tariff for a given currency.
 */
export function getDefaultTariff(currencyCode = DEFAULT_CURRENCY_CODE) {
  const config = SUPPORTED_CURRENCIES.find((c) => c.code === currencyCode) || SUPPORTED_CURRENCIES[0];
  return config.defaultTariff;
}
