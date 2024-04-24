var scale = 1.5;

if (navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)) {
scale = 1.5;
}
var WIDTH = 640 * scale;
var HEIGHT = 480 * scale;
var FIELD_WIDTH = 15 * scale;
var FIELD_HEIGHT = 20 * scale;
var BLOCK_SIZE = 20 * scale;
var RIGHT_WALL = 250 * scale;
var LEFT_WALL = 50 * scale;
var FLOOR = 400 * scale;
var NEXT_BLOCK_LEFT = RIGHT_WALL+20;
var NEXT_BLOCK_TOP = HEIGHT*(.1*scale) ;

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
var timerInterval = 50;
var nextBlockNum;
var highScore;
var highScorer;
var newBlock;
var nextBlock;
var scoreText;
var highScoreText;
var highScorerText;
var gameOverText;
var shadowColor = "#7F6A00";

function Shape(){
  type= null;
  color= null;
  centerX= null;
  centerY= null;
  shape= null;
  label= null;
  blocks= [];
};

var shapesJSON= null;
var board = null;
var localStorageName = "maxtris";


var isUpdatingAfterRowClear = false;
var startGame = false;

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

const BLOCK_COLORS = {
    "I": 0, //"light blue",
    "J": 1,//"dark blue",
    "L": 2,//"orange",
    "O" : 3,//"yellow",
    "S" : 4,//"Green",
    "T" : 5,//"Purple",
    "Z" : 6//"Red",
  }

  var arrowRight;
  var arrowLeft;
  var arrowUp;
  var arrowDown;
 