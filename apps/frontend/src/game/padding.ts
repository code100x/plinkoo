export const DECIMAL_MULTIPLIER = 10000;

export function pad(n: number) {
    return n * DECIMAL_MULTIPLIER;
}
  
export function unpad(n: number) {
    return Math.floor(n / DECIMAL_MULTIPLIER);
}
