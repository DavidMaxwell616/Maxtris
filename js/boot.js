const WINDOW_WIDTH = 64; // size of window
const WINDOW_HEIGHT = 48;
const FIELD_WIDTH = 15;
const FIELD_HEIGHT = 20;
const MAX_BLOCKS = 164;
const ROW_FULL = 11;

var varro_state = 0;
var gameover = 0;
var start_level, turn = 0; //start from level selected under options
var start_blocks; //number of initial rows on the map
var block = [4][4]; //current block
var newblock = [4][4];
var next_block, next_next_block; //next block to be put
var map = [FIELD_WIDTH][FIELD_HEIGHT]; //map
var block_x, block_y; //location of the block
var x_size, y_size; //size of the block
var next_x_size, next_y_size; //size of the block
var timer; //timer of the game
var current_newblock, current_block; //current block type
var block_color, newblock_color, oldblock_color;
var speed; //speed of the game
var score, dels; //game score and number of rows deleted
var high_score;
var Level;
var numblocks, index, blockcount;
var startGame = false;