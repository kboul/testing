import { getExchangeRate } from "../lib/getExchangeRate.js";
import { getShippingQuote } from "../lib/getShippingQuote.js";
import { trackPageView } from "../lib/trackPageView.js";

export const getPriceInCurrency = (price: number, currency: string) => {
  const rate = getExchangeRate("USD", 1);
  return price * rate;
};

// Exercice
export const getShippingInfo = (destination: string) => {
  const quote = getShippingQuote(destination);
  if (!quote) return "Shipping not available for this destination";
  return `Shipping Cost: ${quote.cost} (${quote.estimatedDays} days)`;
};

// Interaction testing
export async function renderPage() {
  trackPageView("/home");

  return "<div>content</div>";
}
