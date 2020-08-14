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
leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
 
// Create an empty board filled with nulls
board = new Array(BOARD_HEIGHT);
for(i = 0; i < BOARD_HEIGHT; i++) {
  board[i] = new Array(BOARD_WIDTH);
  for(j = 0; j < BOARD_WIDTH; j++) {
    board[i][j] = null;
  }
}

// Create Shapes
 nextShape = Shape;
 randomizeShape(nextShape);
 previewShape();
 
 activeShape = Shape;
 randomizeShape(activeShape);
 activateShape();

};

function randomizeShape(shape) {
    
  shape.type = Math.floor(Math.random() * NUM_SHAPE_TYPES);
  shape.orientation = Math.floor(Math.random() * NUM_ORIENTATIONS);
  shape.color = Math.floor(Math.random() * NUM_COLORS);
 
  initBlocks(shape);
};

function initBlocks(shape){
  var i;
  for(i = 0; i < NUM_BLOCKS_IN_SHAPE; i++) {
    shape.blocks[i] = Block;
  }

}

function previewShape() {
    
  //TODO
};

function clearPreview() {
  
  //TODO
};

function activateShape() {
  activeShape.shape = shapes[activeShape.type];
  activeShape.centerX = activeShape.shape.orientation[activeShape.orientation].startingLocation.x;
  activeShape.centerY = activeShape.shape.orientation[activeShape.orientation].startingLocation.y;
  
  var i, newX, newY;

  for(i = 0; i < activeShape.blocks.length; i++) {
    newX = activeShape.centerX + activeShape.shape.orientation[activeShape.orientation].blockPosition[i].x;
    newY = activeShape.centerY + activeShape.shape.orientation[activeShape.orientation].blockPosition[i].y;
    makeBlock(activeShape.blocks[i], newX, newY, activeShape.color);
  }
};

function makeBlock(block, newX, newY, newColor) {

  x = newX;
  y = newY;
  color = newColor;
  
  var spriteLocation = getSpriteLocation(block);
  
  block.sprite = game.add.sprite(spriteLocation.x, spriteLocation.y, 'blocks', color);
};

function getSpriteLocation(block) {
    
  var spriteX, spriteY;
  spriteX = LEFT_WALL + (block.x * BLOCK_WIDTH);
  spriteY =  block.y * BLOCK_WIDTH;
  
  return {"x": spriteX, "y": spriteY};
};

function clearBlock(block) {
    
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
      
    } else {
      
      placeShapeInBoard();
      completedRows = getCompleteRows();
      
      if (completedRows.length > 0) {
        
        clearRow(completedRows);
        isUpdatingAfterRowClear = true;
        
      } else {
        showShapes();
      }
      
      completedRows = [];
    }
    turnCounter = 0;
    
  } else if (isUpdatingAfterRowClear) {
    
    if(turnCounter >= turnLength/10) {
      isUpdatingAfterRowClear = false;
      promoteShapes();
    } else {
      turnCounter++;
    }
  } else {
    
    handleInput();
    turnCounter++;
    
  }
}


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
  for(i = 0; i < activeShape.blocks.length; i++) {
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

  for(i = 0; i < activeShape.blocks.length; i++) {
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
  
  if(!canMoveShape(direction)){
    throw "Cannot move active shape in direction: " + direction;
  }
  
  var i, newX, newY;
  
  // Move the Shape's blocks
  for(i = 0; i < activeShape.blocks.length; i++) {
    switch(direction) {
      case DOWN:
        newX = activeShape.blocks[i].x;
        newY = activeShape.blocks[i].y + BLOCK_WIDTH;
        break;
      case LEFT:
        newX = activeShape.blocks[i].x - BLOCK_WIDTH;
        newY = activeShape.blocks[i].y;
        break;
      case RIGHT:
        newX = activeShape.blocks[i].x + BLOCK_WIDTH;
        newY = activeShape.blocks[i].y;
        break;
    }  
    moveBlock(activeShape.blocks[i],newX, newY);
  }
  
  // Update the Shape's center
  switch(direction) {
    case DOWN:
      activeShape.centerX += 0;
      activeShape.centerY += 1;
      break;
    case LEFT:
      activeShape.centerX += -1;
      activeShape.centerY += 0;
      break;
    case RIGHT:
      activeShape.centerX += 1;
      activeShape.centerY += 0;
      break;
  }
};

function canRotate() {
  
  
  var i, newX, newY, newOrientation;
  newOrientation = (orientation + 1) % NUM_ORIENTATIONS;
  
  for(i = 0; i < blocks.length; i++) {
    newX = centerX + shape.orientation[newOrientation].blockPosition[i].x;
    newY = centerY + shape.orientation[newOrientation].blockPosition[i].y;      
    
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
  newOrientation = (orientation + 1) % NUM_ORIENTATIONS;
  for(i = 0; i < blocks.length; i++) {
    newX = centerX + shape.orientation[newOrientation].blockPosition[i].x;
    newY = centerY + shape.orientation[newOrientation].blockPosition[i].y;      
    moveBlock(blocks[i], newX, newY);
  }
  orientation = newOrientation;
  isTweening = true;
};

function moveBlock(block, newX, newY) {
    
  block.x = newX;
  block.y = newY;
    
  block.sprite.x = newX;
  block.sprite.y = newY;
};

function handleInput() {
  
    if (upKey.isDown) {
    if (activeShape.canRotate()) {        
      activeShape.rotate();
    }
  } else if (leftKey.isDown) {
    
    if (activeShape.canMoveShape(LEFT)) {
      activeShape.moveShape(LEFT);
    }
    
  } else if (rightKey.isDown) {
    
    if (activeShape.canMoveShape(RIGHT)) {        
      activeShape.moveShape(RIGHT);
    }
    
  } else if (downKey.isDown) {
    turnCounter += turnLength/5;
  }
};