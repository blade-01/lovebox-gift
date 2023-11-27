export function useFormatter() {
  const formatNumber = (input: number | string): string => {
    const num = typeof input === "string" ? parseFloat(input) : input;
    if (isNaN(num)) {
      throw new Error(
        "Invalid input. Please provide a valid number or numeric string."
      );
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);

  return {
    formatNumber,
    formatCurrency,
  };
}
