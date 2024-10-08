var game = new Phaser.Game(WIDTH, HEIGHT,
  Phaser.AUTO, 'phaser-example',
  { preload: preload, create: create, update: update });


var width = game.width;
var height = game.height;

function create() {
  if (!startGame) mainMenuCreate(this);
  else gameCreate();
}


function gameCreate() {
  var highscores = JSON.parse(localStorage.getItem(localStorageName));
  if (highscores == null) {
    var HighScoreData =
    {
      "HighScore": 0,
      "HighScoreName": ""
    }
    highScore = 0;
    highScorer = "";
    localStorage.setItem(localStorageName, JSON.stringify(HighScoreData));
  }
  else {
    highScore = highscores.HighScore;
    highScorer = highscores.HighScoreName;
  }

  graphics = game.add.graphics(0, 0);
  graphics.beginFill(0xB4B4B4, 1.0);
  graphics.drawRect(0, 0, game.width, game.height);
  graphics.beginFill(0x000000, 1.0);
  graphics.drawRect(LEFT_WALL, 0, RIGHT_WALL - LEFT_WALL, FLOOR);
  graphics.drawRect(NEXT_BLOCK_LEFT, NEXT_BLOCK_TOP, 120, 100);

  shapesJSON = game.cache.getJSON('shapes');
  shapes = shapesJSON.shapes;

  

  setUpArrows(game);

  upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  upKey.onDown.add(function (event) {
    if (canRotate()) rotate();
  }, this);
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  leftKey.onDown.add(function (event) {
    if (canMoveShape(LEFT)) moveShape(LEFT);
  }, this);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  rightKey.onDown.add(function (event) {
    if (canMoveShape(RIGHT)) moveShape(RIGHT);
  }, this);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  downKey.onDown.add(function (event) {
    if (canMoveShape(DOWN) && !GameOver) moveShape(DOWN);
  }, this);

  // Create an empty board filled with nulls
  board = new Array(BOARD_HEIGHT);
  for (i = 0; i < BOARD_HEIGHT; i++) {
    board[i] = new Array(BOARD_WIDTH);
    for (j = 0; j < BOARD_WIDTH; j++) {
      board[i][j] = null;
    }
  }

  // Create Shapes
  nextShape = new Shape();
  randomizeShape(nextShape);
  nextShape.label = 'nextShape';
  activateShape(nextShape);

  activeShape = new Shape();
  randomizeShape(activeShape);
  activeShape.label = 'activeShape';
  activateShape(activeShape);
  game.add.text(
    (NEXT_BLOCK_LEFT - 10),
    (NEXT_BLOCK_TOP / 2 - 36),
    "MAXTRIS!", {
    font: "bold 64px Arial",
    fill: "#ffff2d",
    align: "center"
  });

  game.add.text(
    (NEXT_BLOCK_LEFT + 15),
    (NEXT_BLOCK_TOP + 108),
    'NEXT BRICK',
    {
      font: "bold 32px Arial",
      fill: "#ffff2d",
      align: "center",
    });

  scoreText = game.add.text(
    (NEXT_BLOCK_LEFT + 10),
    (NEXT_BLOCK_TOP + 160),
    'SCORE: ' + score,
    {
      font: "bold 45px Arial",
      fill: "#ffff2d",
      align: "center",
    });

  highScoreText = game.add.text(
    (NEXT_BLOCK_LEFT + 5),
    (NEXT_BLOCK_TOP + 240),
    'HIGH SCORE: ' + highScore,
    {
      font: "bold 42px Arial",
      fill: "#ffff2d",
      align: "center",
    });

  highScorerText = game.add.text(
    (NEXT_BLOCK_LEFT + 5),
    (NEXT_BLOCK_TOP + 288),
    'HIGH SCORER: ' + highScorer,
    {
      font: "bold 42px Arial",
      fill: "#ffff2d",
      align: "center",
    });

  gameOverText = game.add.text(
    (NEXT_BLOCK_LEFT + (BLOCK_SIZE * 2 * scale)),
    (FLOOR - (BLOCK_SIZE * scale)),
    "G A M E  O V E R\n Click Here to Restart",
    {
      font: "bold 53px Arial",
      fill: "#ff0044",
      align: "center",
    });
  gameOverText.anchor.set(0.5);
  gameOverText.inputEnabled = true;
  gameOverText.events.onInputDown.add(restartGame, this);
  gameOverText.visible = false;
};

function setUpArrows(game) {
  var midX = NEXT_BLOCK_LEFT + 140;
  var midY = NEXT_BLOCK_TOP + 420;
  arrowRight = game.add.button(midX + 40, midY + 40, 'arrow');
  arrowRight.anchor.setTo(1, 1);
  arrowRight.scale.setTo(.5, .5);
  arrowRight.fixedToCamera = true;
  arrowRight.events.onInputDown.add(function () {
    if (canMoveShape(RIGHT)) moveShape(RIGHT);
  });

  arrowLeft = game.add.button(midX - 80, midY + 2, 'arrow');
  arrowLeft.fixedToCamera = true;
  arrowLeft.anchor.setTo(1, 1);
  arrowLeft.scale.setTo(.5, .5);
  arrowLeft.angle = 180;
  arrowLeft.events.onInputDown.add(function () {
    if (canMoveShape(LEFT)) moveShape(LEFT);
  });

  arrowUp = game.add.button(midX, midY - 40, 'arrow');
  arrowUp.fixedToCamera = true;
  arrowUp.anchor.setTo(1, 1);
  arrowUp.scale.setTo(.5, .5);
  arrowUp.angle = 270;
  arrowUp.events.onInputDown.add(function () {
    if (canRotate()) rotate();
  });


  arrowDown = game.add.button(midX - 42, midY + 80, 'arrow');
  arrowDown.fixedToCamera = true;
  arrowDown.anchor.setTo(1, 1);
  arrowDown.scale.setTo(.5, .5);
  arrowDown.angle = 90;
  arrowDown.events.onInputDown.add(function () {
    if (canMoveShape(DOWN) && !GameOver) moveShape(DOWN)
  });

}

function randomizeShape(shape) {
  shape.type = game.rnd.integerInRange(0, 6);
  initBlocks(shape);
};

function initBlocks(shape) {
  var i;
  shape.blocks = [];
  for (i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var Block = {
      id: i,
      x: null,
      y: null,
      sprite: null,
      color: shape.type,
    };
    shape.blocks.push(Block);
  }
}

function previewShape(i, newX, newY, newColor) {
  var block = nextShape.blocks.find(block => block.id === i);
  block.x = newX;
  block.y = newY;
  block.color = newColor;
  var spriteLocation = getNextSpriteLocation(block);
  block.sprite = game.add.sprite(spriteLocation.x, spriteLocation.y, 'blocks', newColor);
  block.sprite.width *= scale;
  block.sprite.height *= scale;
};



function clearPreview() {
  for (i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    clearBlock(nextShape.blocks[i]);
  }
  nextShape.type = null;
  nextShape.orientation = null;
  nextShape.color = null;
  nextShape.shape = null;
  nextShape.centerX = null;
  nextShape.centerY = null;

  nextShape.blocks = null;
};

function activateShape(currentShape) {
  currentShape.shape = shapes[currentShape.type];
  currentShape.color = BLOCK_COLORS[currentShape.shape.name];
  currentShape.orientation = 0;
  currentShape.centerX = currentShape.shape.orientation[currentShape.orientation].startingLocation.x;
  currentShape.centerY = currentShape.shape.orientation[currentShape.orientation].startingLocation.y;

  for (var i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var newX, newY;
    newX = currentShape.centerX + currentShape.shape.orientation[currentShape.orientation].blockPosition[i].x;
    newY = currentShape.centerY + currentShape.shape.orientation[currentShape.orientation].blockPosition[i].y;
    if (currentShape.label == 'activeShape') {
      makeBlock(i, newX, newY, currentShape.color);
    }
    else
      previewShape(i, newX, newY, currentShape.color);
  }
};

function makeBlock(i, newX, newY, newColor) {
  var block = activeShape.blocks.find(block => block.id === i);
  block.x = newX;
  block.y = newY;
  block.color = newColor;

  var spriteLocation = getSpriteLocation(block.x, block.y);
  block.sprite = game.add.sprite(spriteLocation.x, spriteLocation.y, 'blocks', newColor);
  block.sprite.width *= scale;
  block.sprite.height *= scale;

};

function getSpriteLocation(x, y) {
  var spriteX, spriteY;
  spriteX = LEFT_WALL + (x * BLOCK_SIZE);
  spriteY = y * BLOCK_SIZE;
  return { "x": spriteX, "y": spriteY };
};

function restartGame() {
  gameOverText.visible = false;
  for (i = 0; i < board.length; i++) {
    var row = board[i];
    for (j = 0; j < row.length; j++) {
      clearBlock(board[i][j]);
      board[i][j] = null;
    }
  }
  score = 0;
  timer = 0;
  timerInterval = 50;
  // Create Shapes
  activeShape.blocks.forEach(element => {
    clearBlock(element);
  });
  nextShape.blocks.forEach(element => {
    clearBlock(element);
  });

  nextShape = new Shape();
  randomizeShape(nextShape);
  nextShape.label = 'nextShape';
  activateShape(nextShape);

  activeShape = new Shape();
  randomizeShape(activeShape);
  activeShape.label = 'activeShape';
  activateShape(activeShape);
  GameOver = false;
};



function getNextSpriteLocation(block) {
  var spriteX, spriteY;
  spriteX = NEXT_BLOCK_LEFT - (BLOCK_SIZE * 2 * scale) + (block.x * BLOCK_SIZE);
  spriteY = (NEXT_BLOCK_TOP + (BLOCK_SIZE * scale) + block.y * BLOCK_SIZE) - (BLOCK_SIZE * scale);
  return { "x": spriteX, "y": spriteY };
};

function clearBlock(block) {
  if (block != null) {
    block.id = null;
    block.x = null;
    block.y = null;
    block.color = null;
    block.sprite.destroy();
    block.sprite = null;
  }
};

function getCompleteRows() {
  var i, j, max;
  var completeRows = [];

  for (i = 0; i < board.length; i++) {
    if (isRowFull(i)) {
      completeRows.push(i);
    }
  }
  return completeRows;
};

function isRowFull(row) {

  var i;

  for (i = 0; i < board[row].length; i++) {
    if (board[row][i] === null) {
      return false;
    }
  }

  return true;
};

function update() {
  if (!startGame || GameOver)
    return;
  if (timer >= timerInterval) {
    if (!canMoveShape(DOWN) && activeShape.centerY == 0) {
      //GAME OVER////////////////////////////////////////
      GameOver = true;
      if (score > highScore) {
        highScore = score;
        var name = prompt("You Got The High Score!! Please Enter Your Name");
        var HighScoreData =
        {
          "HighScore": highScore,
          "HighScoreName": name
        }
        localStorage.setItem(localStorageName, JSON.stringify(HighScoreData));
        highScoreText.setText('HIGH SCORE: ' + highScore);
        highScorerText.setText('HIGH SCORER: ' + highScorer);
      }
      gameOverText.visible = true;
      return;
    }
    if (activeShape !== null && canMoveShape(DOWN)) {
      scoreText.setText('SCORE: ' + score);
      moveShape(DOWN);
    }
    else {
      placeShapeInBoard();
      completedRows = getCompleteRows();

      if (completedRows.length > 0) {

        clearRow(completedRows);
        isUpdatingAfterRowClear = true;

      } else {
        promoteShapes();
      }

      completedRows = [];
    }
    timer = 0;

  } else if (isUpdatingAfterRowClear) {

    if (timer >= timerInterval / 10) {
      isUpdatingAfterRowClear = false;
      promoteShapes();
    } else {
      timer++;
    }
  } else {
    timer++;
  }
};

function cloneShape(b) {
  var a = new Shape();
  a.type = b.type;
  a.orientation = b.orientation;
  a.color = b.color;
  a.centerX = b.centerX;
  a.centerY = b.centerY;
  a.shape = b.shape;
  a.blocks = [];
  b.blocks.forEach(element => {
    var Block = {
      id: element.id,
      x: element.x,
      y: element.y,
      color: element.color,
      sprite: element.sprite
    };
    a.blocks.push(Block);
  });
  return a;
}


function promoteShapes() {

  activeShape = cloneShape(nextShape);
  activeShape.label = 'activeShape';
  activateShape(activeShape);

  clearPreview();
  randomizeShape(nextShape);
  activateShape(nextShape);
};

function clearActive() {

  activeShape.type = null;
  activeShape.orientation = null;
  activeShape.color = null;

  activeShape.centerX = null;
  activeShape.centerY = null;

  activeShape.blocks = [];
};

function placeShapeInBoard() {
  for (var i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var block = activeShape.blocks[i];
    if (activeShape.blocks[i] != null)
      board[block.y][block.x] = activeShape.blocks[i];
  }
};

function isOnBoard(x, y) {
  return (x >= 0 && y >= 0 &&
    x < BOARD_WIDTH && y < BOARD_HEIGHT);
};

function isOccupied(x, y) {
  return (board[y][x] != null);
};

function canMoveShape(direction) {

  var i, newX, newY;

  for (i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var block = activeShape.blocks.find(block => block.id === i);
    switch (direction) {
      case DOWN:
        newX = block.x;
        newY = block.y + 1;
        break;
      case LEFT:
        newX = block.x - 1;
        newY = block.y;
        break;
      case RIGHT:
        newX = block.x + 1;
        newY = block.y;
        break;
    }
    if (!isOnBoard(newX, newY) || isOccupied(newX, newY)) {
      return false;
    }
  }
  return true;
};

function moveShape(direction) {
  // Move the Shape's blocks
  var moveX = 0;
  var moveY = 0;
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
  for (var i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var block = activeShape.blocks.find(block => block.id === i);
    moveBlock(block, block.x + moveX, block.y + moveY);
  }
  // Update the Shape's center
  switch (direction) {
    case DOWN:
      activeShape.centerY++;
      break;
    case LEFT:
      activeShape.centerX--;
      break;
    case RIGHT:
      activeShape.centerX++;
      break;
  }
};

function canRotate() {
  var i, newX, newY, newOrientation;
  newOrientation = (activeShape.orientation + 1) % NUM_ORIENTATIONS;
  for (i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    newX = activeShape.centerX + activeShape.shape.orientation[newOrientation].blockPosition[i].x;
    newY = activeShape.centerY + activeShape.shape.orientation[newOrientation].blockPosition[i].y;
    if (!isOnBoard(newX, newY) || isOccupied(newX, newY)) {
      return false;
    }
  }
  return true;
};

function rotate() {
  var i, newX, newY, newOrientation;
  newOrientation = (activeShape.orientation + 1) % NUM_ORIENTATIONS;
  for (i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    newX = activeShape.centerX + activeShape.shape.orientation[newOrientation].blockPosition[i].x;
    newY = activeShape.centerY + activeShape.shape.orientation[newOrientation].blockPosition[i].y;
    moveBlock(activeShape.blocks[i], newX, newY);
  }
  activeShape.orientation = newOrientation;
};

function moveBlock(block, newX, newY) {
  block.x = newX;
  block.y = newY;
  var spriteLocation = getSpriteLocation(block.x, block.y);
  block.sprite.position = spriteLocation;
};

function clearRow(completedRows) {

  var i, j, h, row, block, alreadyShifted, actualRowToClear;
  var incrementScore = 0;
  alreadyShifted = 0;
  var newScore = 50;
  for (i = completedRows.length - 1; i >= 0; i--) {

    actualRowToClear = completedRows[i] + alreadyShifted;

    row = board[actualRowToClear];
    for (j = 0; j < row.length; j++) {
      clearBlock(board[actualRowToClear][j]);
      board[actualRowToClear][j] = null;
    }
    newScore *= 2;
    dropRowsAbove(actualRowToClear - 1);
    alreadyShifted++;
    if (timerInterval > 0)
      timerInterval--;
  }
  score += newScore
};

function dropRowsAbove(row) {

  var i, j, block;

  for (i = row; i >= 0; i--) {
    for (j = 0; j < board[i].length; j++) {

      block = board[i][j];
      if (block !== null) {
        moveBlock(block, block.x, block.y + 1);
        board[i + 1][j] = board[i][j];
        board[i][j] = null;
      }

    }
  }
};
