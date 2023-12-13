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

export function debounce(callback, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

export const COLORS = {
  names: {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    gray: "#202120",
    dodgerBlue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    moodyBlue: "#7D7DC4",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    white: "#ffffff",
    yellow: "#ffff00",
  },
  random() {
    let result;
    let count = 0;
    for (const prop in this.names)
      if (Math.random() < 1 / ++count) result = prop;
    return result;
  },
};

export const letterByLetter = (
  text,
  { duration = 0.2, delay = 0.02, initialDelay = 0, color = "white" } = {}
) => {
  const id = Math.random();
  let afterSlash = false;
  return text
    ? text.split("").map((l, i) => {
        const style = afterSlash
          ? {
              color,
              WebkitFilter: "brightness(1.75)",
            }
          : {};

        if (l === "/") {
          afterSlash = true;
        }

        const animation = `fadeIn ${duration}s ease-out ${
          initialDelay + delay * i
        }s forwards`;
        return (
          <span style={{ animation, ...style }} key={`split-${id}-${i}`}>
            {l}
          </span>
        );
      })
    : "";
};
