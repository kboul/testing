import { charge } from "../lib/charge.js";
import { isValidEmail, sendEmail } from "../lib/email.js";
import { getExchangeRate } from "../lib/getExchangeRate.js";
import { getShippingQuote } from "../lib/getShippingQuote.js";
import security from "../lib/security.js";
import { trackPageView } from "../lib/trackPageView.js";

export const getPriceInCurrency = (price: number, currency: string) => {
  const rate = getExchangeRate("USD", currency);
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

// Interaction testing
export async function submitOrder(
  order: { totalAmount: number },
  creditCard: { creditCardNumber: string }
) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === "failed")
    return { success: false, error: "payment_error" };

  return { success: true };
}

// Partial mocking
export async function signUp(email: string) {
  if (!isValidEmail(email)) return false;

  await sendEmail(email, "Welcome aboard!");

  return true;
}

// Spying on functions
export async function login(email: string) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}

export function isOnline() {
  const availableHours = [8, 20];
  const [open, close] = availableHours;
  const currentHour = new Date().getHours();

  return currentHour >= open && currentHour < close;
}

export function getDiscount() {
  const today = new Date();
  const isChristmasDay = today.getMonth() === 11 && today.getDate() === 25;
  return isChristmasDay ? 0.2 : 0;
}
