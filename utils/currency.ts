
export type CurrencyCode = 'USD' | 'GHS';

interface CurrencyConfig {
  symbol: string;
  rate: number;
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { 
    symbol: '$', 
    rate: 1, 
    label: 'USD ($)' 
  },
  GHS: { 
    symbol: 'GH₵', 
    rate: 15.5, // Approx exchange rate
    label: 'GHS (GH₵)' 
  },
};

export const formatPrice = (amountInUsd: number, currency: CurrencyCode): string => {
  const { symbol, rate } = CURRENCIES[currency];
  const convertedAmount = amountInUsd * rate;
  
  // Format with commas and 2 decimal places
  return `${symbol}${convertedAmount.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};
