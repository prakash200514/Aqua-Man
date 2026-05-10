/**
 * Format a number as Indian Rupees (₹)
 * Examples: inr(149.99) → "₹149.99"
 */
export const inr = (amount) =>
  `₹${parseFloat(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
