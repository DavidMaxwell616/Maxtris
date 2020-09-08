var game = new Phaser.Game(500, 420, Phaser.AUTO, 'phaser-example', 
{preload: preload, create: create, update: update });

function create() {
 graphics = game.add.graphics(0,0);
 
 graphics.beginFill(0xB4B4B4, 1.0);
 graphics.drawRect(0, 0, LEFT_WALL, game.world.height);
 graphics.drawRect(RIGHT_WALL, 0, game.world.width - RIGHT_WALL, game.world.height);
 graphics.drawRect(LEFT_WALL, FLOOR, 200, 80);
 graphics.beginFill(0x000000, 1.0);
 graphics.drawRect(NEXT_BLOCK_LEFT, NEXT_BLOCK_TOP, 120, 100);

 shapesJSON = this.cache.getJSON('shapes');
 shapes = shapesJSON.shapes;
 
  game.add.text(
    NEXT_BLOCK_LEFT-10,
  game.world.height * 0.08,
  "MAXTRIS!",   { 
    font: "bold 32px Arial", 
    fill: "#ffff2d", 
    align: "center" 
  });

game.add.text(
  NEXT_BLOCK_LEFT+15,
  game.world.height * 0.48,
  'NEXT BRICK', 
  { 
    font: "bold 15px Arial", 
    fill: "#ffff2d", 
    align: "center" 
  });

scoreText = game.add.text(
  NEXT_BLOCK_LEFT+20,
  game.world.height * 0.55,
  'SCORE: ' + score, 
  { 
    font: "bold 15px Arial", 
    fill: "#ffff2d", 
    align: "center" 
  });

highScoreText = game.add.text(
  NEXT_BLOCK_LEFT+5,
  game.world.height * 0.6,
  'HIGH SCORE: ' + highScore, 
  { 
    font: "bold 15px Arial", 
    fill: "#ffff2d", 
    align: "center" 
  });

gameOverText = game.add.text(
  NEXT_BLOCK_LEFT+70,
  game.world.height * 0.8,
  "G A M E  O V E R\n Click Here to Restart", 
  { 
    font: "bold 23px Arial", 
    fill: "#ff0044", 
    align: "center" 
  });
gameOverText.anchor.set(0.5);
gameOverText.inputEnabled = true;
gameOverText.events.onInputDown.add(restartGame, this);
gameOverText.visible = false;

upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
upKey.onDown.add(function(event) {
  if (canRotate()) rotate(); }, this);  
leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
leftKey.onDown.add(function(event) {
  if (canMoveShape(LEFT)) moveShape(LEFT);}, this);  
rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
rightKey.onDown.add(function(event) {
  if (canMoveShape(RIGHT)) moveShape(RIGHT);}, this);  
downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
downKey.onDown.add(function(event) {
  if(canMoveShape(DOWN)) moveShape(DOWN);}, this);  
  
// Create an empty board filled with nulls
board = new Array(BOARD_HEIGHT);
for(i = 0; i < BOARD_HEIGHT; i++) {
  board[i] = new Array(BOARD_WIDTH);
  for(j = 0; j < BOARD_WIDTH; j++) {
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
};

function randomizeShape(shape) {
    
  shape.type = Math.floor(Math.random() * NUM_SHAPE_TYPES);
  
  initBlocks(shape);
};

function initBlocks(shape){
  var i;
shape.blocks = [];
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var Block = {
      id: i,
      x: null,
      y: null,
      sprite: null
    };
    shape.blocks.push(Block);
  }
}

function previewShape(i, newX, newY) {
  var block = nextShape.blocks.find(block => block.id === i);
  block.x = newX;
  block.y = newY;
    var spriteLocation = getNextSpriteLocation(block);
    block.sprite = game.add.sprite(spriteLocation.x, spriteLocation.y, 'blocks', nextShape.color);
};

function clearPreview() {
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
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
  currentShape.color = currentShape.type;
  currentShape.orientation = 0;
  currentShape.centerX = currentShape.shape.orientation[currentShape.orientation].startingLocation.x;
  currentShape.centerY = currentShape.shape.orientation[currentShape.orientation].startingLocation.y;
  
  for(var i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var newX, newY;
    newX = currentShape.centerX + currentShape.shape.orientation[currentShape.orientation].blockPosition[i].x;
    newY = currentShape.centerY + currentShape.shape.orientation[currentShape.orientation].blockPosition[i].y;
    if(currentShape.label =='activeShape')
      makeBlock(i, newX, newY, currentShape.color);
    else
      previewShape(i,newX,newY);
    }
 };

function makeBlock(i, newX, newY, newColor) {
var block = activeShape.blocks.find(block => block.id === i);
  block.x = newX;
  block.y = newY;
  block.color = newColor;
  
  var spriteLocation = getSpriteLocation(block.x,block.y);   
   block.sprite = game.add.sprite(spriteLocation.x, spriteLocation.y, 'blocks', block.color);
};

function getSpriteLocation(x,y) {
  var spriteX, spriteY;
  spriteX = LEFT_WALL + (x * BLOCK_SIZE);
  spriteY =  y * BLOCK_SIZE;
  return {"x": spriteX, "y": spriteY};
};

function restartGame(){
gameOverText.visible = false;
 
  for(i = board.length; i = 0 ; i--) {
    for(j = 0; j < i.length; j++) {
      clearBlock(board[i][j]);
    }
  }
};

function updateScore(){
  scoreText.setText('SCORE: ' + score);
  if(score>highScore)
  highScore = score;
  highScoreText.setText('HIGH SCORE: ' + highScore);
}

function getNextSpriteLocation(block) {
  var spriteX, spriteY;
  spriteX = NEXT_BLOCK_LEFT- 40 + (block.x * BLOCK_SIZE);
  spriteY = NEXT_BLOCK_TOP +20+ block.y * BLOCK_SIZE;
  
  return {"x": spriteX, "y": spriteY};
};

function clearBlock(block) {
  block.id = null; 
  block.x = null;
  block.y = null;
  block.color = null;
  block.sprite.destroy();
  block.sprite = null;
};

function getCompleteRows() {
  var i, j, max;
  var completeRows = [];
  
  for(i = 0; i < board.length; i++) {
    if (isRowFull(i)) {
      completeRows.push(i);
    }      
  }
  return completeRows;
};

function isRowFull(row) {
    
  var i;
  
  for(i = 0; i < board[row].length; i++) {
    if (board[row][i] === null) {
      return false;
    }
  }
  
  return true;
};

function update(){
  if (GameOver)
  return;
  if(turnCounter >= turnLength) {
    if(!canMoveShape(DOWN) && activeShape.centerY==0){
      GameOver = true;
      gameOverText.visible = true;
      return; 
    }
    if(activeShape !== null && canMoveShape(DOWN)) {
      updateScore();
       moveShape(DOWN);
      turnCounter = 0;
    } else {
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
  } else if (isUpdatingAfterRowClear) {
    
    if(turnCounter >= turnLength/10) {
      isUpdatingAfterRowClear = false;
      promoteShapes();
    } else {
      turnCounter++;
    }
  } 
  else 
  {
      turnCounter++;
  }
}

function cloneShape(b)
{
var a = new Shape();
a.type= b.type;
  a.orientation= b.orientation;
  a.color= b.color;
  a.centerX= b.centerX;
  a.centerY= b.centerY;
  a.shape= b.shape;
  a.blocks = [];
  b.blocks.forEach(element => {
  var Block = {
      id: element.id,
      x: element.x,
      y: element.y,
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

  activeShape.blocks = null;
};

function placeShapeInBoard() {
  
  var i, block;
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    block = activeShape.blocks[i];
    board[block.y][block.x] = activeShape.blocks[i];
  }
};

function isOnBoard(x, y) {
  return(x >= 0 && y >= 0 && 
     x < BOARD_WIDTH && y < BOARD_HEIGHT);
};

function isOccupied(x, y) {
  return (board[y][x] != null);
};

function canMoveShape(direction) {
  
  var i, newX, newY;

  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var block = activeShape.blocks.find(block => block.id === i);
    switch(direction) {
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
  switch(direction) {
    case DOWN:
      moveY=1;
      break;
    case LEFT:
      moveX=-1;
      break;
    case RIGHT:
      moveX=1;
      break;
  }
   for(var i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    var block = activeShape.blocks.find(block => block.id === i);
     moveBlock(block, block.x+moveX, block.y+moveY);
   }
  // Update the Shape's center
  switch(direction) {
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
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
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
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    newX = activeShape.centerX + activeShape.shape.orientation[newOrientation].blockPosition[i].x;
    newY = activeShape.centerY + activeShape.shape.orientation[newOrientation].blockPosition[i].y;     
    moveBlock(activeShape.blocks[i], newX, newY);
  }
  activeShape.orientation = newOrientation;
};

function moveBlock(block,newX, newY) {
  block.x = newX;
  block.y = newY;
  var spriteLocation = getSpriteLocation(block.x,block.y);
  block.sprite.position = spriteLocation;
};

function clearRow(completedRows) {
    
  var i, j, h, row, block, alreadyShifted, actualRowToClear;
  alreadyShifted = 0;
  
  for(i = completedRows.length-1; i >= 0 ; i--) {
    
    actualRowToClear = completedRows[i] + alreadyShifted;
      
    row = board[actualRowToClear];
    
    for(j = 0; j < row.length; j++) {
      clearBlock(board[actualRowToClear][j]);
      board[actualRowToClear][j] = null;
    }
    dropRowsAbove(actualRowToClear-1);
    alreadyShifted++;
    turnLength--;
    score+=50;
  }
};

function dropRowsAbove(row) {
  
  var i, j, block;
  
  for(i = row; i >= 0; i--) {
    for(j = 0; j < board[i].length; j++) {
      
      block = board[i][j];
      if(block !== null) {
        moveBlock(block,block.x, block.y+1);
        board[i+1][j] = board[i][j];
        board[i][j] = null;
      }
      
    }
  }
};
