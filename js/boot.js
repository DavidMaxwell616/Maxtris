const WINDOW_WIDTH = 64; // size of window
const WINDOW_HEIGHT = 48;
const FIELD_WIDTH = 15;
const FIELD_HEIGHT = 20;
const MAX_BLOCKS = 164;
const ROW_FULL = 11;
const BLOCK_SIZE = 200;

var intro_state = false;
var gameover = false;
var start_level, turn; //start from level selected under options
var start_blocks; //number of initial rows on the map
var block = [4, 4]; //current block
var newblock = [4, 4];
var next_block, next_next_block; //next block to be put
var map = [FIELD_WIDTH, FIELD_HEIGHT]; //map
var block_x, block_y; //location of the block
var x_size, y_size; //size of the block
var next_x_size, next_y_size; //size of the block
var current_newblock, current_block; //current block type
var block_color, newblock_color, oldblock_color;
var speed; //speed of the game
var score, dels; //game score and number of rows deleted
var high_score;
var Level;
var numblocks, Index, blockcount;
var PushDown, Rotate = false;
var Sprite = {
  state, //the state of the object (general)
  anim_state, //an animation state variable, up to you
  attr, //attributes pertaining to the object (general)
  x, //position bitmap will be displayed at
  y,
  xv, //velocity of object
  yv,
  width,
  height, //the width and height of the bob
  width_fill, //internal, used to force 8*x wide surfaces
  counter_1, //general counters
  counter_2
};
//var blocks[MAX_BLOCKS], newblocks[5], oldblocks[MAX_BLOCKS];