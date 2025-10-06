const noTopRender = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
const noRightRender = [34, 35, 36];
const bottomRender = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const noCornerBetRender = [...noTopRender, 34, 35];
const sixLinesBetRender = bottomRender.slice(0, bottomRender.length - 1);
const topRightDobuleStreetRender = noTopRender.slice(0, noTopRender.length - 1);

const shouldRenderCornerBet = (number: number): boolean =>
  !noCornerBetRender.includes(number);

export const shouldRenderTop = (currentNumber: number): boolean =>
  !noTopRender.includes(currentNumber);

export const shouldRenderRight = (currentNumber: number): boolean =>
  !noRightRender.includes(currentNumber);

export const shouldRenderBottom = (currentNumber: number): boolean =>
  bottomRender.includes(currentNumber);

export const shouldRenderSixLineBet = (currentNumber: number): boolean =>
  sixLinesBetRender.includes(currentNumber);

export const shouldRenderTopStreet = (currentNumber: number): boolean =>
  noTopRender.includes(currentNumber);

export const shouldRenderTopRightDoubleStreet = (
  currentNumber: number
): boolean => topRightDobuleStreetRender.includes(currentNumber);

export { shouldRenderCornerBet };
