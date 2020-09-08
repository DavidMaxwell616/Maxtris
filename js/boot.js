const RIGHT_WALL = 250;
const LEFT_WALL = 50;
const FIELD_WIDTH = 15;
const FIELD_HEIGHT = 20;
const FLOOR = 400;
const BLOCK_SIZE = 20;
const NEXT_BLOCK_LEFT = 300;
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
var newBlock;
var nextBlock;
var scoreText;
var highScoreText;
var gameOverText;

function Shape(){
  type= null;
  orientation= null;
  color= null;
  centerX= null;
  centerY= null;
  shape= null;
  label= null;
  blocks= [];
};

var shapesJSON= null;
var board = null;

var turnLength = 60;
var turnCounter = 0;

var isUpdatingAfterRowClear = false;

var nextShape = null;
var activeShape = null;
var GameOver = false;
var completedRows = [];

var  NUM_BLOCKS_IN_SHAPE = 4,
  NUM_SHAPE_TYPES = 8,
  NUM_ORIENTATIONS = 4;

  var ShapeType =
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
  var BOARD_WIDTH = 10,
    BOARD_HEIGHT = 20;
    
    // Movement Directions
var DOWN = 0,
    LEFT = 1,
    RIGHT = 2;
      
    // Block colors
var  NUM_COLORS = 4,
    GREEN = 0,
    RED = 1,
    BLUE = 2,
    YELLOW = 3;


