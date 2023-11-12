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

  return {
    formatNumber,
  };
}
