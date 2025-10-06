/**
 * Checks if a number is within a specified range.
 *
 * @param number - The number to check.
 * @param  min - The minimum value of the range.
 * @param  max - The maximum value of the range.
 * @returns - Returns true if the number is within the range, otherwise false.
 */
const isNumberInRange = (number: number, min: number, max: number) => {
  return number >= min && number <= max;
};

export { isNumberInRange };
