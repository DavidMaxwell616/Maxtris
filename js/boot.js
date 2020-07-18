const WINDOW_WIDTH = 64; // size of window
const WINDOW_HEIGHT = 48;
const FIELD_WIDTH = 15;
const FIELD_HEIGHT = 20;
const MAX_BLOCKS = 164;
const ROW_FULL = 11;
const BLOCK_SIZE = 20;
var hiscore = 0;
var gameover = 0;
var oldBlocks = []; 
var blocks = [];
var nextBlocks = [];
var map = []; //map
var block_x, block_y; //location of the block
var x_size, y_size; //size of the block formation
var high_score;
var level;
var startGame = false;
var graphics;
var objectData;
var leftKey;
var	rightKey;
var	upKey;
var	downKey;
var	spaceKey;
var block;
var dropping = false;
var score = 0;
var timer;
var speed = 200;
