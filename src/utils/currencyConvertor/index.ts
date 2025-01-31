import axios from "axios";
export const getCurrencyConversionRates = async (baseCurrency: string) => {
  try {
    const currencyData = await axios.get(
      `https://v6.exchangerate-api.com/v6/2bb273e264f1412d3bbc897b/latest/${baseCurrency}`
    );
    return currencyData;
  } catch (error) {
    throw error;
  }
};
