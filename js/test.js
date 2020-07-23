var game = new Phaser.Game(640, 480, Phaser.AUTO, 'phaser-example', 
{preload: preload, create: create, update: update });

const RIGHT_WALL = 250;
const LEFT_WALL = 50;
const FIELD_WIDTH = 15;
const FIELD_HEIGHT = 20;
const FLOOR = 400;
const NEXT_BLOCK_LEFT = 400;
const NEXT_BLOCK_TOP = 100;
var objectData;
var currentBlocks;
var nextBlocks;
var oldBlocks;
var graphics;
var leftKey;
var	rightKey;
var	upKey;
var	downKey;
var	spaceKey;
var block;
var score = 0;
var timer = 0;
var speed = 50;
var nextBlockNum;
var highScore = 0;

function preload(){
  this.load.spritesheet('blocks', '../assets/images/blocks.png', 20,20,6 );
  this.load.path = '../assets/json/';
  this.load.json('objectData', 'blockMap.json');
}

function create() {
 graphics = game.add.graphics(0,0);
 
 graphics.beginFill(0xB4B4B4, 1.0);
 graphics.drawRect(0, 0, LEFT_WALL, game.world.height);
 graphics.drawRect(RIGHT_WALL, 0, game.world.width - RIGHT_WALL, game.world.height);
 graphics.drawRect(LEFT_WALL, FLOOR, 200, 80);
 graphics.beginFill(0x000000, 1.0);
 graphics.drawRect(NEXT_BLOCK_LEFT, NEXT_BLOCK_TOP, 120, 100);

 currentBlocks = game.add.group();
 oldBlocks = game.add.group();
 nextBlocks = game.add.group();
 blocks = game.add.sprite(0,0,'blocks');
 blocks.visible = false;
 objectData = this.cache.getJSON('objectData');
 var blockNum = game.rnd.integerInRange(1, 7);
 showNewBlocks(blockNum);
 nextBlockNum = game.rnd.integerInRange(1, 7);
 showNextBlocks(nextBlockNum);
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
game.cursors = game.input.keyboard.createCursorKeys();
}

function showNewBlocks(blockNum){
   newBlock = objectData.blockData[0]['shape'+blockNum];

  var y=0;
  newBlock.formation.forEach(element => {
  for (let index = 0; index < element.length; index++) {
    const block = element[index];
    if(block>0){
      var b = currentBlocks.create(50 + index * 20, y*20, 'blocks');
      b.frame = blockNum;
      b.anchor.x = 0;
      b.anchor.y = 0;
    }
    }
    y++;
    });
}

function showNextBlocks(nextBlockNum){
  
 var nextBlock = objectData.blockData[0]['shape'+nextBlockNum];

 var y=0;
 nextBlock.formation.forEach(element => {
 for (let index = 0; index < element.length; index++) {
   const block = element[index];
   if(block>0){
     var b = nextBlocks.create(NEXT_BLOCK_LEFT + 20+index * 20, NEXT_BLOCK_TOP + 20+ y*20, 'blocks');
     b.frame = nextBlockNum;
     b.anchor.x = 0;
     b.anchor.y = 0;
   }
   }
   y++;
   });
}

function update() {
  timer++;
  if (timer > speed) 
    {
      moveBlocks();
      timer = 0;
    }

  if (game.cursors.right.isDown) {
    currentBlocks.forEach(block => {
      if(block.x+block.width<=RIGHT_WALL) 
      block.x+=20;      
    });
  }
  else if (game.cursors.left.isDown) {
    currentBlocks.forEach(block => {
      if(block.x>LEFT_WALL) 
      block.x-=20;      
    });
  }
  else if (game.cursors.up.isDown) 
        RotateBlocks();
  else if (game.cursors.down.isDown) 
        RotateBlocks();
  }

  function RotateBlocks(){
    currentBlocks.forEach(block => {
 
    });
  }

  function addToOldBlocks(){
  currentBlocks.forEach(block => {
    oldBlocks.add(block);
  });
  currentBlocks.removeAll(true,true, false);
  nextBlocks.removeAll(true,true, false);
}

function moveBlocks(){
    currentBlocks.forEach(block => {
        if (block.y + block.height >= FLOOR) 
       {
          addToOldBlocks();
          // showNewBlocks(nextBlockNum);
          // nextBlockNum = game.rnd.integerInRange(1, 7);
          // showNextBlocks(nextBlockNum);
          return;
      }

      oldBlocks.forEach(oldBlock => {
        if (block.x==oldBlock.x && block.y + block.height ==oldBlock.y) 
       {
          addToOldBlocks();
          // showNewBlocks(nextBlockNum);
          // nextBlockNum = game.rnd.integerInRange(1, 7);
          // showNextBlocks(nextBlockNum);
          return;
      }
      });
        block.y+=FIELD_HEIGHT;
      });
    }
