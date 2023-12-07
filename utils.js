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
  return new Promise((resolve) => {
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
    setTimeout(resolve, duration + 100);
  });
}

export const EMPTY_RENDER = () => "";

function validSelector(selector) {
  if (/^\./.test(selector)) return selector;
  return "." + selector;
}

export const preloadImage = (item) =>
  new Promise((resolve, reject) => {
    const lazyImage = typeof item === "string";
    const src = lazyImage ? item : item.src;

    setTimeout(() => reject(), 15_000);
    const image = new Image();
    image.src = src;
    image.onload = function () {
      if (lazyImage) {
        //const element = document.querySelector(`img[src="${src}"]`);
        //element.classList.add('lo')
        // console.log(element);
        // if (!element) resolve(false);
        // element.src = src;
      } else {
        //lazy background
        const element = document.querySelector(
          validSelector(item.elementClass)
        );
        if (!element) resolve(false);
        element.classList.add("loaded");
      }

      resolve(true);
    };
    image.onerror = function () {
      reject();
    };
  });

export const throttle = (fn, blankAmount) => {
  let tries = 0;

  return (...args) => {
    if (tries > blankAmount) {
      fn(...args);
    }
    tries++;
  };
};
