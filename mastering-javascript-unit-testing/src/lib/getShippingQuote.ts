export const getShippingQuote = (destination: string) => {
  if (!destination) return "";
  console.log(`Getting a shipping quote for ${destination}...`);
  return { cost: 10 * Math.random(), estimatedDays: 2 };
};
