export const wait = (tm) => new Promise((r) => setTimeout(r, tm));

export const getRandomInt = (N, M) => {
  let randomValue = Math.floor(Math.random() * (N + 1));
  randomValue === N ? randomValue - M : randomValue;
  const multipleOfM = Math.floor(randomValue / M) * M;
  return multipleOfM;
};
