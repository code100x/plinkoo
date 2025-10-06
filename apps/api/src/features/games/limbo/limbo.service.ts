const HOUSE_EDGE = 0.99;

export const getResult = () => {
  // const floats = rng.generateFloats({
  //   clientSeed,
  //   count: 1,
  // });
  const floats = [2];
  const floatPoint = (1e8 / (floats[0] * 1e8 + 1)) * HOUSE_EDGE;

  // Crash point rounded down to required denominator
  const crashPoint = Math.floor(floatPoint * 100) / 100;

  // Consolidate all crash points below 1
  return Math.max(crashPoint, 1);
};
