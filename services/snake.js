import { getRandomInt, wait } from "../utils";

const directions = {
  RIGHT: "RIGHT",
  LEFT: "LEFT",
  UP: "UP",
  DOWN: "DOWN",
};

const CONTROLS = {
  ArrowUp: directions.UP,
  ArrowDown: directions.DOWN,
  ArrowLeft: directions.LEFT,
  ArrowRight: directions.RIGHT,
};

class Arena {
  running;
  canvas;
  ctx;
  snake;
  food;

  constructor(size = 150) {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    canvas.width = size;
    canvas.height = size;
    canvas.id = "snake-canvas";
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "black";
  }

  clear() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  inputHandler = (code) => {
    const direction = CONTROLS[code];
    this.snake?.turn(direction);
  };

  listen_render(entity) {
    entity.addEventListener(
      "render",
      ({ detail: { x, y, width, height, clear, color } }) => {
        if (color) {
          this.ctx.fillStyle = color;
        }
        clear
          ? this.ctx.clearRect(x, y, width, height)
          : this.ctx.fillRect(x, y, width, height);
      }
    );
  }

  start_game(snake, food) {
    this.snake = snake;
    this.food = food;
    this.running = true;

    snake.addEventListener("collision", (e) => {
      const {
        detail: { x, y, selfCollison },
      } = e;
      const size = this.canvas.width;
      const segment = this.snake.segments[0];
      const bounderiesCollison =
        x >= size || x < -segment.size || y >= size || y < -segment.size;
      (selfCollison || bounderiesCollison) && this.stop_game();

      const foodCollision = x === this.food.x && y === this.food.y;
      if (foodCollision) {
        snake.grow(x, y);
        const food = new Food(size, this.snake);
        this.listen_render(food);
        food.render();
        this.food = food;
      }
    });

    this.listen_render(snake);
    this.listen_render(food);

    snake.render();
    food.render();

    (async () => {
      while (this.running) {
        this.snake.move();
        await wait(200 / this.snake.speed);
      }
    })();
  }

  stop_game() {
    this.running = false;
  }
}

//snake communicates with Arena using EventEmitter
class Snake extends EventTarget {
  speed;
  direction = directions.RIGHT;
  segments = [];
  pixel;
  canvas;

  constructor(size = 2, pixel, speed = 1) {
    super();
    this.size = size;
    this.speed = speed;
    this.pixel = pixel;
  }

  render(x = this.pixel * 2, y = this.pixel * 2) {
    for (let i = 0; i < this.size; i++) {
      const segment = this.grow(x, y);
      x += segment.size;
    }
    return this;
  }

  grow(x, y) {
    const segment = new Segment(x, y, this.pixel);
    segment.addEventListener("render", (e) => {
      this.dispatchEvent(new CustomEvent(e.type, { detail: e.detail }));
    });
    segment.render();
    this.segments.push(segment);
    return segment;
  }

  turn = (direction) => {
    switch (this.direction) {
      case directions.RIGHT: {
        //speed up
        if (direction === directions.RIGHT) {
          this.speed = 2;
          return;
        }
        if (direction === directions.LEFT) {
          this.speed = 1;
          return;
        }

        break;
      }
      case directions.DOWN: {
        if (direction === directions.DOWN) {
          this.speed = 2;
          return;
        }
        if (direction === directions.UP) {
          this.speed = 1;
          return;
        }
        break;
      }
      case directions.UP: {
        if (direction === directions.UP) {
          this.speed = 2;
          return;
        }
        if (direction === directions.DOWN) {
          this.speed = 1;
          return;
        }
        break;
      }
      case directions.LEFT: {
        if (direction === directions.LEFT) {
          this.speed = 2;
          return;
        }
        if (direction === directions.RIGHT) {
          this.speed = 1;
          return;
        }
        break;
      }
    }
    this.direction = direction;
  };

  collison = (x, y) => {
    const selfCollison = this.segments.some(
      (segment) => segment.x === x && segment.y === y
    );

    const event = new CustomEvent("collision", {
      detail: {
        x,
        y,
        selfCollison,
      },
    });

    this.dispatchEvent(event);
    return selfCollison;
  };

  move = () => {
    const last = this.segments.shift();
    const first = this.segments.at(-1);
    //const ctx = this.canvas.getContext("2d");

    let x, y;
    switch (this.direction) {
      case directions.RIGHT: {
        x = first.x + first.size;
        y = first.y;
        break;
      }
      case directions.DOWN: {
        x = first.x;
        y = first.y + first.size;
        break;
      }
      case directions.UP: {
        x = first.x;
        y = first.y - first.size;
        break;
      }
      case directions.LEFT: {
        x = first.x - first.size;
        y = first.y;
        break;
      }
    }

    if (this.collison(x, y)) return;
    last.setPosition({ x, y });
    this.segments.push(last);
  };
}

class Segment extends EventTarget {
  size;
  x;
  y;
  color;

  constructor(x, y, pixel, color = "black") {
    super();
    this.x = x;
    this.y = y;
    this.size = pixel;
    this.color = color;
  }

  position(x = this.x, y = this.y, width = this.size, height = this.size) {
    return { x, y, width, height };
  }

  render(x, y) {
    const detail = this.position(x, y);
    this.dispatchEvent(
      new CustomEvent("render", { detail: { color: this.color, ...detail } })
    );
  }

  setPosition({ x, y }) {
    const clearDetails = this.position();
    //const renderDetails = this.position(x, y);
    this.dispatchEvent(
      new CustomEvent("render", { detail: { clear: true, ...clearDetails } })
    );
    this.render(x, y);
    this.x = x;
    this.y = y;
  }
}

class Food extends EventTarget {
  x;
  y;
  size = 6;

  constructor(size, snake) {
    super();
    this.size = snake.pixel;

    const createFood = () => {
      const x = getRandomInt(size, this.size);
      const y = getRandomInt(size, this.size);

      const snakeCollison = snake.segments.some(
        (segment) => segment.x === x && segment.y === y
      );
      if (snakeCollison) {
        console.log("food spawn collision");
        return createFood();
      }
      return { x, y };
    };

    const { x, y } = createFood();

    this.x = x;
    this.y = y;
  }

  position(x = this.x, y = this.y, width = this.size, height = this.size) {
    return { x, y, width, height };
  }

  render() {
    this.dispatchEvent(
      new CustomEvent("render", {
        detail: { color: "black", ...this.position() },
      })
    );
  }
}

export const init = ({ size }) => {
  const pixel = size / 50;
  const arena = new Arena(size);
  const snake = new Snake(5, pixel);
  const food = new Food(size, snake);

  return {
    canvas() {
      return arena.canvas;
    },
    start() {
      arena.start_game(snake, food);
    },
    input({ code }) {
      arena.inputHandler(code);
    },
    stop() {
      arena.stop_game();
    },
  };
};
