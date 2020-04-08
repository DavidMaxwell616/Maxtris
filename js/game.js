// MAXTRIS - tetris clone
/*
  A letter from Andre' LaMothe on how to write a tetris
game:

It's really simple! I'm surprised you are having any 
trouble with it -- there's not much to it, sit down, 
close your eyes, and think about the problem in this 
format: you have a matrix of cells XxY each little 
piece is in a matrix itself that's MxN, the little 
piece has a shape that's defined in the matrix, then 
you move it down, now moving it is easy, but all the
problems are figuring out when the piece is touching 
something, this is a simple algorithm, you just start 
from the bottom of the matrix that defines the shape 
image and whenever there's a solid block you know can 
touch down.

Also, when a piece is up against a wall, you have to 
be able to test if rotating the piece would cause a 
problem, like an L shape, so what you do is	rotate 
the piece virtually and then test if the rotated 
version is invalid or colliding with something -- anyway, 
this is nothing more than a couple hours of thinking, 
there's no magic, just sit with some graph paper and do it :)

Sincerely,

Andre' LaMothe
*/


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var _scene;

function create() {
  _scene = this;
  if (!startGame) mainMenuCreate(this);
  else gameCreate();
}

function ClearBlock() {
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++)
      block[i][j] = 0;

}

function ClearNewBlock() {
  for (var i = 0; i < 5; i++)
    for (var j = 0; j < 5; j++) newblock[i][j] = 0;

}

function GenerateBlock(kind) {
  ClearBlock();
  switch (kind) {
    //   _
    // _|  type block formation

    case 1:
      block[1][0] = block[2][0] = block[0][1] = block[1][1] = 1, block_color = 1;
      break;
    case 11:
      block[0][0] = block[0][1] = block[1][1] = block[1][2] = 1, block_color = 1;
      break;
    case 21:
      block[1][0] = block[2][0] = block[0][1] = block[1][1] = 1, block_color = 1;
      break;
    case 31:
      block[0][0] = block[0][1] = block[1][1] = block[1][2] = 1, block_color = 1;
      break;

      // _ 
      //  |_ type block formation

    case 2:
      block[0][0] = block[1][0] = block[1][1] = block[2][1] = 1, block_color = 2;
      break;
    case 12:
      block[1][0] = block[1][1] = block[0][1] = block[0][2] = 1, block_color = 2;
      break;
    case 22:
      block[0][0] = block[1][0] = block[1][1] = block[2][1] = 1, block_color = 2;
      break;
    case 32:
      block[1][0] = block[1][1] = block[0][1] = block[0][2] = 1, block_color = 2;
      break;

      //  _
      // |_| type block formation

    case 3:
      block[0][0] = block[0][1] = block[1][0] = block[1][1] = 1, block_color = 3;
      break;
    case 13:
      block[0][0] = block[0][1] = block[1][0] = block[1][1] = 1, block_color = 3;
      break;
    case 23:
      block[0][0] = block[0][1] = block[1][0] = block[1][1] = 1, block_color = 3;
      break;
    case 33:
      block[0][0] = block[0][1] = block[1][0] = block[1][1] = 1, block_color = 3;
      break;

      // _|_ type block formation

    case 4:
      block[1][0] = block[0][1] = block[1][1] = block[2][1] = 1, block_color = 4;
      break;
    case 14:
      block[0][0] = block[0][1] = block[0][2] = block[1][1] = 1, block_color = 4;
      break;
    case 24:
      block[0][0] = block[1][0] = block[2][0] = block[1][1] = 1, block_color = 4;
      break;
    case 34:
      block[0][1] = block[1][0] = block[1][1] = block[1][2] = 1, block_color = 4;
      break;

      // ___| type block formation

    case 5:
      block[2][0] = block[0][1] = block[1][1] = block[2][1] = 1, block_color = 5;
      break;
    case 15:
      block[0][0] = block[0][1] = block[0][2] = block[1][2] = 1, block_color = 5;
      break;
    case 25:
      block[0][0] = block[1][0] = block[2][0] = block[0][1] = 1, block_color = 5;
      break;
    case 35:
      block[0][0] = block[1][0] = block[1][1] = block[1][2] = 1, block_color = 5;
      break;

      // |___ type block formation

    case 6:
      block[0][0] = block[0][1] = block[1][1] = block[2][1] = 1, block_color = 6;
      break;
    case 16:
      block[0][0] = block[1][0] = block[0][1] = block[0][2] = 1, block_color = 6;
      break;
    case 26:
      block[0][0] = block[1][0] = block[2][0] = block[2][1] = 1, block_color = 6;
      break;
    case 36:
      block[1][0] = block[1][1] = block[1][2] = block[0][2] = 1, block_color = 6;
      break;

      // ____ type block formation

    case 7:
      block[0][0] = block[1][0] = block[2][0] = block[3][0] = 1, block_color = 7;
      break;
    case 17:
      block[0][0] = block[0][1] = block[0][2] = block[0][3] = 1, block_color = 7;
      break;
    case 27:
      block[0][0] = block[1][0] = block[2][0] = block[3][0] = 1, block_color = 7;
      break;
    case 37:
      block[0][0] = block[0][1] = block[0][2] = block[0][3] = 1, block_color = 7;
      break;
      //	default: Error("Unknown element to be generated."); break;

  }

  if ((kind == 7) || (kind == 27)) {
    x_size = 4;
    y_size = 1;
  } else if ((kind == 17) || (kind == 37)) {
    x_size = 1;
    y_size = 4;
  } else if (kind % 10 == 3) {
    x_size = 2;
    y_size = 2;
  } else if ((kind / 10 == 0) || (kind / 10 == 2)) {
    x_size = 3;
    y_size = 2;
  } else if ((kind / 10 == 1) || (kind / 10 == 3)) {
    x_size = 2;
    y_size = 3;
  }
  current_block = kind;
}

function Generatenewblock(kind) {
  ClearNewBlock();
  switch (kind) {
    case 1:
      newblock[1][0] = newblock[2][0] = newblock[0][1] = newblock[1][1] = 1, next_x_size = 3, y_size = 2, newblock_color = 1;
      break;
    case 2:
      newblock[0][0] = newblock[1][0] = newblock[1][1] = newblock[2][1] = 1, next_x_size = 3, y_size = 2, newblock_color = 2;
      break;
    case 3:
      newblock[0][0] = newblock[0][1] = newblock[1][0] = newblock[1][1] = 1, next_x_size = 2, y_size = 2, newblock_color = 3;
      break;
    case 4:
      newblock[1][0] = newblock[0][1] = newblock[1][1] = newblock[2][1] = 1, next_x_size = 3, y_size = 2, newblock_color = 4;
      break;
    case 5:
      newblock[2][0] = newblock[0][1] = newblock[1][1] = newblock[2][1] = 1, next_x_size = 3, y_size = 1, newblock_color = 5;
      break;
    case 6:
      newblock[0][0] = newblock[0][1] = newblock[1][1] = newblock[2][1] = 1, next_x_size = 3, y_size = 1, newblock_color = 6;
      break;
    case 7:
      newblock[0][0] = newblock[1][0] = newblock[2][0] = newblock[3][0] = 1, next_x_size = 4, y_size = 1, newblock_color = 7;
      break;
  }
  current_newblock = kind;
}

function RotateBlock() {
  var old_block = current_block;
  current_block += 10;
  if (current_block > 40) current_block -= 40;
  GenerateBlock(current_block);
  if (!CanPut()) {
    current_block = old_block;
    GenerateBlock(current_block);
  }
}

// function DrawMap() {
//   //DRAW USED BLOCKS
//   for (var i = 5; i < FIELD_WIDTH; i++) {
//     for (var j = 2; j < FIELD_HEIGHT; j++) {
//       if (map[i][j])
//         for (index = 0; index < blockcount; index++) {
//           oldblocks[index].curr_frame = map[i][j] - 1;
//           oldblocks[index].x = i * 20, oldblocks[index].y = j * 20;
//         }
//     }
//   }
//   if (gameover == 0) {
//     //DRAW NEXT BLOCK   
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         if (newblock[i][j])
//           for (index = 0; index < 4; index++) {
//             newblocks[index].curr_frame = newblock_color - 1;
//             newblocks[index].x = 360 + i * 20, newblocks[index].y = 160 + j * 20;
//             Draw_BOB( & newblocks[index], lpddsback);
//           }
//       }
//     }
//     //DRAW CURRENT BLOCK
//     for (var i = 0; i < 4; i++) {
//       for (var j = 0; j < 4; j++) {
//         if (block[i][j] == 1)
//           for (index = 0; index < 4; index++) {
//             blocks[index].curr_frame = block_color - 1;
//             blocks[index].x = block_x * 20 + i * 20, blocks[index].y = block_y * 20 + j * 20;
//             Draw_BOB( & blocks[index], lpddsback);
//           }
//       }
//     }
//   }

// }

function DeleteRow() {
  var sum, i, j, del = 0;
  for (i = FIELD_HEIGHT - 1; i >= 1; i--) {
    sum = 0;
    for (j = 5; j < FIELD_WIDTH + 1; j++)
      if (map[j][i]) sum++;
    sprintf(buffer, "%d", sum);
    Draw_Text_GDI(buffer, 525, i * 20, RGB(0, 255, 0), lpddsback);
    if (sum == ROW_FULL) {
      numblocks -= ROW_FULL;
      for (j = i; j >= 1; j--)
        for (var k = 5; k < FIELD_WIDTH; k++)
          map[k][j] = map[k][j - 1];
      i += 2;
      del++;
    }
  }

  if (del > 0)
    dels += del;
  if (del > 0) score += (100 * del) + ((del - 1) * 25) + (dels / 10) * 25;
  speed = 25 - (dels / 10) * 2;
  if (speed < 2) speed = 2;
}

function PutBlock() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (block[i][j] == 1) {
        blockcount++;
        map[block_x + i][block_y + j] = block_color;
      }
    }
  }
  DeleteRow();
}

function CanPut() {
  if (block_x + (x_size) > FIELD_WIDTH) return FALSE;
  if (block_x < 5) return FALSE;
  if (block_y + (y_size - 1) > FIELD_HEIGHT - 2) return FALSE;
  for (var i = 0; i < x_size; i++) {
    for (var j = 0; j < y_size; j++) {
      if (map[block_x + i][block_y + j] &&
        block[i][j])
        return FALSE; //if hitting block below stop falling
    }
  }
  return TRUE;
}

function GenerateNew() {
  next_block = current_newblock;
  var temp = next_block;
  next_next_block = rand() % (7) + 1;
  Generatenewblock(next_next_block);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 4; j++) {
      if (newblock[i][j] == 1)
        for (index = 0; index < 4; index++) {
          newblocks[index].curr_frame = newblock_color;
          newblocks[index].x = 360 + i * 20, newblocks[index].y = 160 + j * 20;
          // Draw_BOB( & newblocks[index], lpddsback);
        }
      //Draw_Rectangle(360+i*20, 160+j*20,380+i*20,180+j*20,newblock_color,lpddsback);
      //else Draw_Rectangle(360+i*20, 160+j*20,380+i*20,180+j*20,0,lpddsback);
    }
  }
  GenerateBlock(temp);
  block_x = 8;
  block_y = 2;
}


function NewGame() {
  for (var i = 0; i < FIELD_WIDTH; i++) {
    for (var j = 0; j < FIELD_HEIGHT; j++) {
      map[i][j] = 0;
    }
  }

  //DrawMap();

  _scene.add.text(
    width * 0.8,
    height * 0.2,
    "MAXTRIS!", {
      fontFamily: 'Arial',
      fontSize: '15px',
      fill: 0xFFFFF2D,
    },
  );

  scoreText = _scene.add.text(
    365, 60, 'SCORE:' + score, {
      fontFamily: 'Arial',
      fontSize: '15px',
      fill: 0xFFFFF2D,
    },
  );
  highScoreText = _scene.add.text(
    365, 60, 'HIGH SCORE:' + hiscore, {
      fontFamily: 'Arial',
      fontSize: '15px',
      fill: 0xFFFFF2D,
    },
  );
  score = 0;
  next_next_block = 1;
  current_newblock = rand() % (7) + 1;
  GenerateNew();
  Generatenewblock(next_next_block);
  DrawMap();
  dels = start_level * 10;
  speed = 25 - (dels / 10) * 2;
  timer = 0;
  speed = 15;
  dels = 1;
  start_level = 0;
  start_blocks = 0;
  blockcount = 0;
  dels = start_level * 10;
  speed = 25 - (dels / 10) * 2;
  //   interference blocks for higher levels
  //   for (var i=0; i<start_blocks; i++) {
  //      for (var j=0; j<FIELD_HEIGHT; j++) {
  //         if (rand()%2) map[j][FIELD_WIDTH-i] = 1;
  //      }
  //   }
  // do rest of inits
  // 	for (var i=0; i<FIELD_HEIGHT; i++){
  //      for (var j=5; j<FIELD_WIDTH; j++){
  //		map[j][i] = 0;}}
  //   for(i=0;i<FIELD_WIDTH+1; i++)
  //	   map[i][FIELD_HEIGHT]=1;

  timer = 0;

} // end Game_Main



function gameCreate() {
  score = 0;
  newBlocks = _scene.add.group()
  oldBlocks = _scene.add.group()

  _scene.input.keyboard.on('keydown_SPACE', function (event) {
    if (gameover)
      return;
    NewGame();
  });

  if (!gameover)
    GenerateBlock(current_block); {
    scene.input.keyboard.on('keydown_RIGHT', function (event) {
      // move player to right
      block_x++;
      if (!CanPut()) block_x--;
    });
    scene.input.keyboard.on('keydown_LEFT', function (event) {
      // move player to left
      block_x--;
      if (!CanPut()) block_x++;
    });
    scene.input.keyboard.on('keydown_UP', function (event) {
      if (++turn == 2) // rotate player
        RotateBlock(), turn = 0;
    });
    scene.input.keyboard.on('keydown_DOWN', function (event) {
      // move player down
      while (CanPut()) block_y++;

      block_y--;
    });

  }

  if (!CanPut && block_y < 3) {
    ShowGameOver();
  }

  if (timer > speed) {
    block_y++;
    timer = 0;

    if (!CanPut()) {
      //block_y--;  
      block_y--;
      PutBlock();
      GenerateNew();
    }

  } // end Game_Init
}
///////////////////////////////////////////////////////////
function ShowGameOver() {
  Draw_Text_GDI("G A M E    O V E R",
    320 - 6 * strlen("G A M E    O V E R") / 2,
    200, RGB(255, 0, 0), lpddsback);
  Draw_Text_GDI("or 'P' to Play Again",
    320 - 6 * strlen("or 'P' to Play Again") / 2,
    260, RGB(255, 0, 0), lpddsback);
  if (score > high_score) high_score = score;
  gameover = 1;

}

///////////////////////////////////////////////////////////

function update() {
  // this is the workhorse of your game it will be called
  // continuously in real-time this is like main() in C
  // all the calls for you game go here!

  // if (intro_state == 0) Game_Intro();


  // DeleteRow();
  // DrawMap();

}

//////////////////////////////////////////////////////////