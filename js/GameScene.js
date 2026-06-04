import {
  localStorageName, LEFT_WALL, RIGHT_WALL, FLOOR, NEXT_BLOCK_LEFT, NEXT_BLOCK_TOP,
  BOARD_HEIGHT, BOARD_WIDTH, NUM_BLOCKS_IN_SHAPE, BLOCK_COLORS, BLOCK_SIZE, scale,
  DOWN, LEFT, RIGHT, NUM_ORIENTATIONS
} from "./config.js";
export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");

    this.board = [];


    this.score = 0;
    this.highScore = 0;
    this.highScorer = "";

    this.timer = 0;
    this.timerInterval = 50;

    this.gameOver = false;
    this.isUpdatingAfterRowClear = false;
    this.completedRows = [];
  }

  preload() {
    this.load.path = './assets/images/';
    this.load.spritesheet("blocks", "blocks.png", {
      frameWidth: 20,
      frameHeight: 20
    });

    this.load.image('arrow', 'arrow.png');
    this.load.path = './assets/json/';
    this.load.json('shapes', 'shapes.json');
  }
  create() {
    const highscores = JSON.parse(localStorage.getItem(localStorageName));
    if (!highscores) {
      const data = {
        HighScore: 0,
        HighScoreName: ""
      };

      this.highScore = 0;
      this.highScorer = "";
      localStorage.setItem(localStorageName, JSON.stringify(data));
    } else {
      this.highScore = highscores.HighScore;
      this.highScorer = highscores.HighScoreName;
    }

    const graphics = this.add.graphics();

    graphics.fillStyle(0xB4B4B4, 1);
    graphics.fillRect(0, 0, this.scale.width, this.scale.height);

    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(LEFT_WALL, 0, RIGHT_WALL - LEFT_WALL, FLOOR);
    graphics.fillRect(NEXT_BLOCK_LEFT, NEXT_BLOCK_TOP, 120, 100);

    const shapesJSON = this.cache.json.get("shapes");
    this.shapes = shapesJSON.shapes;

    this.setUpArrows();
    this.setUpKeyboard();

    this.board = Array.from({ length: BOARD_HEIGHT }, () =>
      Array.from({ length: BOARD_WIDTH }, () => null)
    );

    this.getNextShape();

    this.getActiveShape();

    this.add.text(
      NEXT_BLOCK_LEFT - 10,
      NEXT_BLOCK_TOP / 2 - 36,
      "MAXTRIS!",
      {
        fontFamily: "Arial",
        fontSize: "64px",
        fontStyle: "bold",
        color: "#ffff2d",
        align: "center"
      }
    );

    this.add.text(
      NEXT_BLOCK_LEFT + 15,
      NEXT_BLOCK_TOP + 108,
      "NEXT BRICK",
      {
        fontFamily: "Arial",
        fontSize: "32px",
        fontStyle: "bold",
        color: "#ffff2d",
        align: "center"
      }
    );

    this.scoreText = this.add.text(
      NEXT_BLOCK_LEFT + 10,
      NEXT_BLOCK_TOP + 160,
      "SCORE: " + this.score,
      {
        fontFamily: "Arial",
        fontSize: "45px",
        fontStyle: "bold",
        color: "#ffff2d",
        align: "center"
      }
    );

    this.highScoreText = this.add.text(
      NEXT_BLOCK_LEFT + 5,
      NEXT_BLOCK_TOP + 240,
      "HIGH SCORE: " + this.highScore,
      {
        fontFamily: "Arial",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#ffff2d",
        align: "center"
      }
    );

    this.highScorerText = this.add.text(
      NEXT_BLOCK_LEFT + 5,
      NEXT_BLOCK_TOP + 288,
      "HIGH SCORER: " + this.highScorer,
      {
        fontFamily: "Arial",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#ffff2d",
        align: "center"
      }
    );

    this.gameOverText = this.add.text(
      NEXT_BLOCK_LEFT + BLOCK_SIZE * 2 * scale,
      FLOOR - BLOCK_SIZE * scale,
      "G A M E  O V E R\nClick Here to Restart",
      {
        fontFamily: "Arial",
        fontSize: "53px",
        fontStyle: "bold",
        color: "#ff0044",
        align: "center"
      }
    );

    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setInteractive({ useHandCursor: true });
    this.gameOverText.on("pointerdown", () => this.restartGame());
    this.gameOverText.visible = false;
  }

  getNextShape() {
    let newType = Phaser.Math.Between(0, 6);
    this.nextShape = {
      type: newType,
      blocks: this.initBlocks(newType),
      label: "nextShape",
    };

    this.activateShape(this.nextShape);
  }

  getActiveShape() {
    const newType = Phaser.Math.Between(0, 6);
    this.activeShape = {
      type: newType,
      blocks: this.initBlocks(newType),
      label: "activeShape",
    };

    this.activateShape(this.activeShape);

  }
  setUpKeyboard() {
    this.input.keyboard.on("keydown-UP", () => {
      if (this.canRotate()) this.rotate();
    });

    this.input.keyboard.on("keydown-LEFT", () => {
      if (this.canMoveShape(LEFT)) this.moveShape(LEFT);
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
      if (this.canMoveShape(RIGHT)) this.moveShape(RIGHT);
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      if (this.canMoveShape(DOWN) && !this.gameOver) {
        this.moveShape(DOWN);
      }
    });
  }

  setUpArrows() {
    const midX = NEXT_BLOCK_LEFT + 140;
    const midY = NEXT_BLOCK_TOP + 420;

    this.arrowRight = this.add.image(midX + 40, midY + 40, "arrow")
      .setOrigin(1, 1)
      .setScale(0.5)
      .setInteractive({ useHandCursor: true });

    this.arrowRight.on("pointerdown", () => {
      if (this.canMoveShape(RIGHT)) this.moveShape(RIGHT);
    });

    this.arrowLeft = this.add.image(midX - 80, midY + 2, "arrow")
      .setOrigin(1, 1)
      .setScale(0.5)
      .setAngle(180)
      .setInteractive({ useHandCursor: true });

    this.arrowLeft.on("pointerdown", () => {
      if (this.canMoveShape(LEFT)) this.moveShape(LEFT);
    });

    this.arrowUp = this.add.image(midX, midY - 40, "arrow")
      .setOrigin(1, 1)
      .setScale(0.5)
      .setAngle(270)
      .setInteractive({ useHandCursor: true });

    this.arrowUp.on("pointerdown", () => {
      if (this.canRotate()) this.rotate();
    });

    this.arrowDown = this.add.image(midX - 42, midY + 80, "arrow")
      .setOrigin(1, 1)
      .setScale(0.5)
      .setAngle(90)
      .setInteractive({ useHandCursor: true });

    this.arrowDown.on("pointerdown", () => {
      if (this.canMoveShape(DOWN) && !this.gameOver) {
        this.moveShape(DOWN);
      }
    });
  }


  initBlocks(num) {
    let blocks = [];

    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      blocks.push({
        id: i,
        x: null,
        y: null,
        sprite: null,
        color: num
      });
    }
    return blocks;
  }

  activateShape(currentShape) {
    currentShape.shape = this.shapes[currentShape.type];
    currentShape.color = BLOCK_COLORS[currentShape.shape.name];
    currentShape.orientation = 0;
    currentShape.centerX =
      currentShape.shape.orientation[currentShape.orientation].startingLocation.x;
    currentShape.centerY =
      currentShape.shape.orientation[currentShape.orientation].startingLocation.y;

    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const pos =
        currentShape.shape.orientation[currentShape.orientation].blockPosition[i];

      const newX = currentShape.centerX + pos.x;
      const newY = currentShape.centerY + pos.y;

      if (currentShape.label === "activeShape") {
        this.makeBlock(i, newX, newY, currentShape.color);
      } else {
        this.previewShape(i, newX, newY, currentShape.color);
      }
    }
  }

  makeBlock(i, newX, newY, newColor) {
    const block = this.activeShape.blocks.find(b => b.id === i);

    block.x = newX;
    block.y = newY;
    block.color = newColor;

    const loc = this.getSpriteLocation(block.x, block.y);

    block.sprite = this.add.sprite(loc.x, loc.y, "blocks", newColor);
    block.sprite.setOrigin(0, 0);
    block.sprite.setDisplaySize(
      block.sprite.width * scale,
      block.sprite.height * scale
    );
  }

  previewShape(i, newX, newY, newColor) {
    const block = this.nextShape.blocks.find(b => b.id === i);

    block.x = newX;
    block.y = newY;
    block.color = newColor;

    const loc = this.getNextSpriteLocation(block);

    block.sprite = this.add.sprite(loc.x, loc.y, "blocks", newColor);
    block.sprite.setOrigin(0, 0);
    block.sprite.setDisplaySize(
      block.sprite.width * scale,
      block.sprite.height * scale
    );
  }

  getSpriteLocation(x, y) {
    return {
      x: LEFT_WALL + x * BLOCK_SIZE,
      y: y * BLOCK_SIZE
    };
  }

  getNextSpriteLocation(block) {
    return {
      x: NEXT_BLOCK_LEFT - BLOCK_SIZE * 2 * scale + block.x * BLOCK_SIZE,
      y: NEXT_BLOCK_TOP + BLOCK_SIZE * scale + block.y * BLOCK_SIZE - BLOCK_SIZE * scale
    };
  }

  clearBlock(block) {
    if (!block) return;

    if (block.sprite) {
      block.sprite.destroy();
    }

    block.id = null;
    block.x = null;
    block.y = null;
    block.color = null;
    block.sprite = null;
  }

  restartGame() {
    this.gameOverText.visible = false;

    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        this.clearBlock(this.board[y][x]);
        this.board[y][x] = null;
      }
    }

    this.score = 0;
    this.timer = 0;
    this.timerInterval = 50;
    this.scoreText.setText("SCORE: " + this.score);

    this.activeShape.blocks.forEach(block => this.clearBlock(block));
    this.nextShape.blocks.forEach(block => this.clearBlock(block));

    this.nextShape = new Shape();
    this.randomizeShape(this.nextShape);
    this.nextShape.label = "nextShape";
    this.activateShape(this.nextShape);

    this.activeShape = new Shape();
    this.randomizeShape(this.activeShape);
    this.activeShape.label = "activeShape";
    this.activateShape(this.activeShape);

    this.gameOver = false;
  }

  update() {
    if (this.gameOver) return;

    if (this.timer >= this.timerInterval) {
      if (!this.canMoveShape(DOWN) && this.activeShape.centerY === 0) {
        this.handleGameOver();
        return;
      }

      if (this.activeShape && this.canMoveShape(DOWN)) {
        this.scoreText.setText("SCORE: " + this.score);
        this.moveShape(DOWN);
      } else {
        this.placeShapeInBoard();

        this.completedRows = this.getCompleteRows();

        if (this.completedRows.length > 0) {
          this.clearRow(this.completedRows);
          this.isUpdatingAfterRowClear = true;
        } else {
          this.promoteShapes();
        }

        this.completedRows = [];
      }

      this.timer = 0;
    } else if (this.isUpdatingAfterRowClear) {
      if (this.timer >= this.timerInterval / 10) {
        this.isUpdatingAfterRowClear = false;
        this.promoteShapes();
      } else {
        this.timer++;
      }
    } else {
      this.timer++;
    }
  }

  handleGameOver() {
    this.gameOver = true;

    if (this.score > this.highScore) {
      this.highScore = this.score;

      const name = prompt("You Got The High Score!! Please Enter Your Name") || "";

      this.highScorer = name;

      const data = {
        HighScore: this.highScore,
        HighScoreName: name
      };

      localStorage.setItem(localStorageName, JSON.stringify(data));

      this.highScoreText.setText("HIGH SCORE: " + this.highScore);
      this.highScorerText.setText("HIGH SCORER: " + this.highScorer);
    }

    this.gameOverText.visible = true;
  }

  cloneShape(source) {
    const clone = {

      type: source.type,
      orientation: source.orientation,
      color: source.color,
      centerX: source.centerX,
      centerY: source.centerY,
      shape: source.shape,
      blocks: [],
    };

    source.blocks.forEach(block => {
      clone.blocks.push({
        id: block.id,
        x: block.x,
        y: block.y,
        color: block.color,
        sprite: block.sprite
      });
    });

    return clone;
  }

  promoteShapes() {
    this.activeShape = this.cloneShape(this.nextShape);
    this.activeShape.label = "activeShape";
    this.activateShape(this.activeShape);

    this.clearPreview();

    this.getNextShape();
  }

  clearPreview() {
    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      this.clearBlock(this.nextShape.blocks[i]);
    }

    this.nextShape.type = null;
    this.nextShape.orientation = null;
    this.nextShape.color = null;
    this.nextShape.shape = null;
    this.nextShape.centerX = null;
    this.nextShape.centerY = null;
    this.nextShape.blocks = null;
  }

  placeShapeInBoard() {
    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const block = this.activeShape.blocks[i];

      if (block) {
        this.board[block.y][block.x] = block;
      }
    }
  }

  getCompleteRows() {
    const completeRows = [];

    for (let y = 0; y < this.board.length; y++) {
      if (this.isRowFull(y)) {
        completeRows.push(y);
      }
    }

    return completeRows;
  }

  isRowFull(row) {
    for (let x = 0; x < this.board[row].length; x++) {
      if (this.board[row][x] === null) {
        return false;
      }
    }

    return true;
  }

  isOnBoard(x, y) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < BOARD_WIDTH &&
      y < BOARD_HEIGHT
    );
  }

  isOccupied(x, y) {
    return this.board[y][x] !== null;
  }

  canMoveShape(direction) {
    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const block = this.activeShape.blocks.find(b => b.id === i);

      let newX = block.x;
      let newY = block.y;

      switch (direction) {
        case DOWN:
          newY++;
          break;

        case LEFT:
          newX--;
          break;

        case RIGHT:
          newX++;
          break;
      }

      if (!this.isOnBoard(newX, newY) || this.isOccupied(newX, newY)) {
        return false;
      }
    }

    return true;
  }

  moveShape(direction) {
    let moveX = 0;
    let moveY = 0;

    switch (direction) {
      case DOWN:
        moveY = 1;
        break;

      case LEFT:
        moveX = -1;
        break;

      case RIGHT:
        moveX = 1;
        break;
    }

    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const block = this.activeShape.blocks.find(b => b.id === i);
      this.moveBlock(block, block.x + moveX, block.y + moveY);
    }

    switch (direction) {
      case DOWN:
        this.activeShape.centerY++;
        break;

      case LEFT:
        this.activeShape.centerX--;
        break;

      case RIGHT:
        this.activeShape.centerX++;
        break;
    }
  }

  canRotate() {
    const newOrientation =
      (this.activeShape.orientation + 1) % NUM_ORIENTATIONS;

    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const pos =
        this.activeShape.shape.orientation[newOrientation].blockPosition[i];

      const newX = this.activeShape.centerX + pos.x;
      const newY = this.activeShape.centerY + pos.y;

      if (!this.isOnBoard(newX, newY) || this.isOccupied(newX, newY)) {
        return false;
      }
    }

    return true;
  }

  rotate() {
    const newOrientation =
      (this.activeShape.orientation + 1) % NUM_ORIENTATIONS;

    for (let i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
      const pos =
        this.activeShape.shape.orientation[newOrientation].blockPosition[i];

      const newX = this.activeShape.centerX + pos.x;
      const newY = this.activeShape.centerY + pos.y;

      this.moveBlock(this.activeShape.blocks[i], newX, newY);
    }

    this.activeShape.orientation = newOrientation;
  }

  moveBlock(block, newX, newY) {
    block.x = newX;
    block.y = newY;

    const loc = this.getSpriteLocation(block.x, block.y);

    block.sprite.setPosition(loc.x, loc.y);
  }

  clearRow(completedRows) {
    let alreadyShifted = 0;
    let newScore = 50;

    for (let i = completedRows.length - 1; i >= 0; i--) {
      const actualRowToClear = completedRows[i] + alreadyShifted;
      const row = this.board[actualRowToClear];

      for (let x = 0; x < row.length; x++) {
        this.clearBlock(this.board[actualRowToClear][x]);
        this.board[actualRowToClear][x] = null;
      }

      newScore *= 2;

      this.dropRowsAbove(actualRowToClear - 1);

      alreadyShifted++;

      if (this.timerInterval > 0) {
        this.timerInterval--;
      }
    }

    this.score += newScore;
    this.scoreText.setText("SCORE: " + this.score);
  }

  dropRowsAbove(row) {
    for (let y = row; y >= 0; y--) {
      for (let x = 0; x < this.board[y].length; x++) {
        const block = this.board[y][x];

        if (block !== null) {
          this.moveBlock(block, block.x, block.y + 1);

          this.board[y + 1][x] = this.board[y][x];
          this.board[y][x] = null;
        }
      }
    }
  }
}