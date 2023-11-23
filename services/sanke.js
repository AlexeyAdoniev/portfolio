import { wait } from "../utils";

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
  snake;
  food;

  constructor(size = 150) {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.id = "snake-canvas";
    this.canvas = canvas;
  }

  inputHandler = (code) => {
    const direction = CONTROLS[code];
    this.snake.turn(direction);
  };

  start_game(snake, food) {
    this.snake = snake;
    this.food = food;
    this.running = true;

    (async () => {
      while (this.running) {
        this.snake.move();
        await wait(200 / this.snake.speed);
      }
    })();

    this.snake.addEventListener("collision", (e) => {
      //this.stop_game();
    });
  }

  stop_game() {
    this.running = false;
  }
}

class Snake extends EventTarget {
  speed = 1;
  direction = directions.RIGHT;
  segments = [];
  ctx;

  constructor(canvas, size = 4) {
    super();
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    this.ctx = ctx;
    let x = 15;
    let y = 15;
    for (let i = 0; i < size; i++) {
      const segment = new Segment(x, y);
      x += segment.size;
      ctx.fillRect(x, y, segment.size, segment.size);
      this.segments.push(segment);
    }
  }

  turn = (direction) => {
    switch (this.direction) {
      case directions.RIGHT: {
        if (direction === directions.LEFT) {
          this.dispatchEvent(new Event("collision"));
          return;
        }
        break;
      }
      case directions.DOWN: {
        if (direction === directions.UP) return;
        break;
      }
      case directions.UP: {
        if (direction === directions.DOWN) return;
        break;
      }
      case directions.LEFT: {
        if (direction === directions.RIGHT) return;
        break;
      }
    }
    this.direction = direction;
  };

  checkCollison = (x, y) => {
    this.dispatchEvent(new Event("collision"));
    return false;
  };

  move = () => {
    const last = this.segments.shift();
    const first = this.segments.at(-1);

    switch (this.direction) {
      case directions.RIGHT: {
        const x = first.x + first.size;
        const y = first.y;
        //this.checkCollison(x,y);
        last.setPosition({ x, y }, this.ctx);
        break;
      }
      case directions.DOWN: {
        last.setPosition({ x: first.x, y: first.y + first.size }, this.ctx);
        break;
      }
      case directions.UP: {
        last.setPosition({ x: first.x, y: first.y - first.size }, this.ctx);
        break;
      }
      case directions.LEFT: {
        last.setPosition({ x: first.x - first.size, y: first.y }, this.ctx);
        break;
      }
    }

    this.segments.push(last);
  };
}

class Segment {
  size = 4;
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPosition({ x, y }, ctx) {
    ctx.clearRect(this.x, this.y, this.size, this.size);
    ctx.fillRect(x, y, this.size, this.size);
    this.x = x;
    this.y = y;
  }
}

class Food {
  positon = {};
  constructor() {}
}

export const init = ({ size }) => {
  const arena = new Arena(size);
  const snake = new Snake(arena.canvas);
  const food = new Food(arena.canvas);

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
