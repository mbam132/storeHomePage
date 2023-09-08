export const toUsd = (
  number: number | string,
  decimalDigits?: number
): string =>
  `$${number.toLocaleString(undefined, {
    minimumFractionDigits: decimalDigits ?? 2,
  })}`;
