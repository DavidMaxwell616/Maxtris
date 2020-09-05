var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example', 
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
  game.world.width * 0.61,
  game.world.height * 0.1,
  "MAXTRIS!", {
    fontFamily: 'Arial',
    fontSize: '32px',
    fill: 0xFFFFF2D,
  },
);
game.add.text(
  game.world.width * 0.65,
  game.world.height * 0.43,
  'Next Brick', {
    fontFamily: 'Arial',
    fontSize: '15px',
    fill: 0xFFFFF2D,
  },
);
scoreText = game.add.text(
  game.world.width * 0.65,
  game.world.height * 0.5,
  'SCORE:' + score, {
    fontFamily: 'Arial',
    fontSize: '15px',
    fill: 0xFFFFF2D,
  },
);
highScoreText = game.add.text(
  game.world.width * 0.65,
  game.world.height * 0.55,
  'HIGH SCORE:' + highScore, {
    fontFamily: 'Arial',
    fontSize: '15px',
    fill: 0xFFFFF2D,
  },
);

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
  turnCounter += turnLength/5;}, this);  
  
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

function update(){
  if(turnCounter >= turnLength) {
     if(activeShape !== null && canMoveShape(DOWN)) {
       moveShape(DOWN);
      turnCounter = 0;
  //   } else {
  //     placeShapeInBoard();
  //     completedRows = getCompleteRows();
  //     if (completedRows.length > 0) {
  //       clearRow(completedRows);
  //       isUpdatingAfterRowClear = true;
  //     } else {
  //       promoteShapes();
  //     }
  //     completedRows = [];
  //   }
  //   
    
  // } else if (isUpdatingAfterRowClear) {
    
  //   if(turnCounter >= turnLength/10) {
  //     isUpdatingAfterRowClear = false;
  //     promoteShapes();
  //   } else {
  //     turnCounter++;
  //   }
  }
} 
else 
{
    turnCounter++;
}
}
 
function promoteShapes() {

  activeShape = null;

  clearPreview();
  activeShape = nextShape;
  activateShape();
  activeShape.label = 'activeShape';

  nextShape = Shape;
  randomizeShape(nextShape);
  previewShape();
  nextShape.label = 'nextShape';
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
    switch(direction) {
      case DOWN:
        newX = activeShape.blocks[i].x;
        newY = activeShape.blocks[i].y + 1;
        break;
      case LEFT:
        newX = activeShape.blocks[i].x - 1;
        newY = activeShape.blocks[i].y;
        break;
      case RIGHT:
        newX = activeShape.blocks[i].x + 1;
        newY = activeShape.blocks[i].y;
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
     moveBlock(block, moveX, moveY);
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
  newOrientation = (activeShape.shape.orientation + 1) % NUM_ORIENTATIONS;
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    newX = activeShape.shape.centerX + activeShape.shape.orientation[newOrientation].blockPosition[i].x;
    newY = activeShape.shape.centerY + activeShape.shape.orientation[newOrientation].blockPosition[i].y;      
    
    if (!isOnBoard(newX, newY) || isOccupied(newX, newY)) {
      return false;
    }
  }
  return true;
};
  
function rotate() {
  
  if(!canRotate()) {
    throw "Cannot rotate active shape";
  }
  
  var i, newX, newY, newOrientation;
  newOrientation = (activeShape.shape.orientation + 1) % NUM_ORIENTATIONS;
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    newX = activeShape.shape.centerX + activeShape.shape.orientation[newOrientation].blockPosition[i].x;
    newY = activeShape.shape.centerY + activeShape.shape.orientation[newOrientation].blockPosition[i].y;     
    moveBlock(activeShape.blocks[i], newX, newY);
  }
  activeShape.shape.orientation = newOrientation;
};

function moveBlock(block,moveX, moveY) {
  block.x += moveX;
  block.y += moveY;
  var spriteLocation = getSpriteLocation(block.x,block.y);
  block.sprite.position = spriteLocation;
 // console.log(i, block.x,block.y,spriteLocation.x,spriteLocation.y);
};

