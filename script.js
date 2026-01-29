// ============================================
// CURRENCY CONFIGURATION
// ============================================
// Conversion rates per Robux for different currencies
// Based on: 1 Robux = $0.0038 USD, 1 USD = 91.92 INR
// To modify rates, update the values below
const CURRENCY_RATES = {
    USD: 0.0038,    // US Dollar (1 RBX = $0.0038)
    INR: 0.3493,    // Indian Rupee (0.0038 × 91.92 = 0.349296)
    BRL: 0.0190,    // Brazilian Real (approximate, based on USD rate)
    EUR: 0.0035,    // Euro (approximate, based on USD rate)
    GBP: 0.0030,    // British Pound (approximate, based on USD rate)
    CAD: 0.0051,    // Canadian Dollar (approximate, based on USD rate)
    AUD: 0.0058,    // Australian Dollar (approximate, based on USD rate)
    JPY: 0.57,      // Japanese Yen (approximate, based on USD rate)
    MXN: 0.065,     // Mexican Peso (approximate, based on USD rate)
    ARS: 3.8        // Argentine Peso (approximate, based on USD rate)
};

// Currency symbols
const CURRENCY_SYMBOLS = {
    USD: '$',
    BRL: 'R$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    CAD: 'C$',
    AUD: 'A$',
    JPY: '¥',
    MXN: '$',
    ARS: '$'
};

// ============================================
// DOM ELEMENTS
// ============================================
const robuxInput = document.getElementById('robux-input');
const calculateBtn = document.getElementById('calculate-btn');
const currencySelect = document.getElementById('currency-select');
const resultContainer = document.getElementById('result');
const resultValue = document.getElementById('result-value');
const resultDetail = document.getElementById('result-detail');
const rateDisplay = document.getElementById('rate-display');
const currencyCode = document.getElementById('currency-code');
const resultIcon = document.getElementById('result-icon');
const resultCurrency = document.getElementById('result-currency');

// ============================================
// INITIALIZATION
// ============================================
let currentCurrency = currencySelect.value;

// Update display when currency changes
function updateCurrencyDisplay() {
    currentCurrency = currencySelect.value;
    const rate = CURRENCY_RATES[currentCurrency];
    const symbol = CURRENCY_SYMBOLS[currentCurrency];
    
    rateDisplay.textContent = rate.toFixed(4);
    currencyCode.textContent = currentCurrency;
    resultIcon.textContent = symbol;
    resultCurrency.textContent = currentCurrency;
    
    // Recalculate if there's a value
    if (robuxInput.value && parseFloat(robuxInput.value) > 0) {
        performCalculation();
    }
}

// Initialize display
updateCurrencyDisplay();

// Listen for currency changes
currencySelect.addEventListener('change', updateCurrencyDisplay);

// ============================================
// FUNCTIONS
// ============================================

/**
 * Gets the Robux value entered by the user
 * @returns {number} Amount of Robux (0 if invalid)
 */
function getRobuxValue() {
    const value = parseFloat(robuxInput.value);
    return isNaN(value) || value < 0 ? 0 : value;
}

/**
 * Gets the current conversion rate for the selected currency
 * @returns {number} Conversion rate
 */
function getCurrentRate() {
    return CURRENCY_RATES[currentCurrency];
}

/**
 * Calculates the converted value based on the amount of Robux
 * @param {number} robux - Amount of Robux
 * @param {number} rate - Conversion rate
 * @returns {number} Converted value
 */
function calculateDevex(robux, rate) {
    return robux * rate;
}

/**
 * Formats the value with two decimal places
 * @param {number} value - Value to format
 * @returns {string} Formatted value (ex: "3.50")
 */
function formatCurrency(value) {
    return value.toFixed(2);
}

/**
 * Formats the value according to currency locale
 * @param {number} value - Value to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted value with locale
 */
function formatWithLocale(value, currency) {
    // Use appropriate locale for formatting
    const locales = {
        USD: 'en-US',
        BRL: 'pt-BR',
        INR: 'en-IN',
        EUR: 'de-DE',
        GBP: 'en-GB',
        CAD: 'en-CA',
        AUD: 'en-AU',
        JPY: 'ja-JP',
        MXN: 'es-MX',
        ARS: 'es-AR'
    };
    
    const locale = locales[currency] || 'en-US';
    return value.toLocaleString(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Displays the calculation result in the interface
 * @param {number} robux - Amount of Robux
 * @param {number} convertedValue - Converted value
 */
function displayResult(robux, convertedValue) {
    const symbol = CURRENCY_SYMBOLS[currentCurrency];
    const formattedValue = formatCurrency(convertedValue);
    const formattedRobux = robux.toLocaleString('en-US');
    
    resultValue.textContent = formatWithLocale(convertedValue, currentCurrency);
    resultDetail.textContent = `${formattedRobux} Robux = ${symbol}${formattedValue} ${currentCurrency}`;
    resultContainer.classList.add('show');
}

/**
 * Clears the result from the screen
 */
function clearResult() {
    resultContainer.classList.remove('show');
}

/**
 * Main function that performs the calculation
 */
function performCalculation() {
    const robux = getRobuxValue();
    
    if (robux === 0) {
        clearResult();
        return;
    }
    
    const rate = getCurrentRate();
    const convertedValue = calculateDevex(robux, rate);
    displayResult(robux, convertedValue);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Calculate when the button is clicked
calculateBtn.addEventListener('click', performCalculation);

// Calculate when Enter is pressed in the input
robuxInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performCalculation();
    }
});

// Calculate automatically while the user types
robuxInput.addEventListener('input', function() {
    const robux = getRobuxValue();
    if (robux > 0) {
        performCalculation();
    } else {
        clearResult();
    }
});

// Clear the result when the field is empty
robuxInput.addEventListener('blur', function() {
    if (robuxInput.value === '' || robuxInput.value === '0') {
        clearResult();
    }
});
