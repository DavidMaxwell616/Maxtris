export const scale = 1.5;

export const WIDTH = 640 * scale;
export const HEIGHT = 480 * scale;
export const FIELD_WIDTH = 15 * scale;
export const FIELD_HEIGHT = 20 * scale;
export const BLOCK_SIZE = 20 * scale;
export const RIGHT_WALL = 250 * scale;
export const LEFT_WALL = 50 * scale;
export const FLOOR = 400 * scale;
export const NEXT_BLOCK_LEFT = RIGHT_WALL + 20;
export const NEXT_BLOCK_TOP = HEIGHT * (.1 * scale);

// export const objectData;
// export const currentBlocks;
// export const nextBlocks;
// export const oldBlocks;
// export const graphics;
// export const leftKey;
// export const rightKey;
// export const upKey;
// export const downKey;
// export const spaceKey;
// export const block;
// export const score = 0;
// export const timer = 0;
// export const timerInterval = 50;
// export const nextBlockNum;
// export const highScore;
// export const highScorer;
// export const newBlock;
// export const nextBlock;
// export const scoreText;
// export const highScoreText;
// export const highScorerText;
// export const gameOverText;
// export const shadowColor = "#7F6A00";

export const shapesJSON = null;
export const board = null;
export const localStorageName = "maxtris";


export const isUpdatingAfterRowClear = false;
export const startGame = false;

export const nextShape = null;
export const activeShape = null;
export const GameOver = false;
export const completedRows = [];

export const NUM_BLOCKS_IN_SHAPE = 4,
  NUM_SHAPE_TYPES = 8,
  NUM_ORIENTATIONS = 4;

export const ShapeType =
{
  I: 0,
  J: 1,
  L: 2,
  O: 3,
  S: 4,
  Z: 5,
  T: 6
};

// Asset Sizes
export const BOARD_WIDTH = 10,
  BOARD_HEIGHT = 20;

// Movement Directions
export const DOWN = 0,
  LEFT = 1,
  RIGHT = 2;

export const BLOCK_COLORS = {
  "I": 0, //"light blue",
  "J": 1,//"dark blue",
  "L": 2,//"orange",
  "O": 3,//"yellow",
  "S": 4,//"Green",
  "T": 5,//"Purple",
  "Z": 6//"Red",
}

// export const arrowRight;
// export const arrowLeft;
// export const arrowUp;
// export const arrowDown;
