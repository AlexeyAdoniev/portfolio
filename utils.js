export const wait = (tm) => new Promise((r) => setTimeout(r, tm));

export const getRandomInt = (N, M) => {
  let randomValue = Math.floor(Math.random() * (N + 1));
  randomValue === N ? randomValue - M : randomValue;
  const multipleOfM = Math.floor(randomValue / M) * M;
  return multipleOfM;
};

export function rejectWindowScroll(e) {
  if (
    ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
      e.code
    ) > -1
  ) {
    e.preventDefault();
  }
}

export function doScrolling(elementY, duration) {
  const startingY = window.scrollY;
  const diff = elementY - startingY;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;

    const time = timestamp - start;

    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}
