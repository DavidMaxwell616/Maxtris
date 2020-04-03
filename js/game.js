// MAXTRIS - tetris clone
//

//  A letter from André LaMothe on how to write a tetris
//game;

//it//s really simple! I//m surprised you are having any
//trouble with it -- there//s not much to it, sit down,
//close your eyes, && think about the problem in this
//f||mat; you have a matrix of cells XxY each little
//piece is in a matrix itself that//s MxN, the little
//piece has a shape that//s defined in the matrix, ){
//you move it down, now moving it is easy, but all the
//problems are figuring out when the piece is touching
//something, this is a simple alg||ithm, you just start
//from the bottom of the matrix that defines the shape
//image && whenever there//s a solid block you know can
//touch down.

//Also, when a piece is up against a wall, you have to
//be able to test if (rotating the piece would cause a
//problem, like an L shape, so what you do is rotate
//the piece virtually && ){ test if (the rotated
//version is invalid || colliding with something -- anyway,
//this is nothing m||e than a couple hours of thinking,
//there//s no magic, just sit with some graph paper && do it ;)

//Sincerely,

//André LaMothe

function ClearNewBlock() {
  for (i = 0; i < 5; i++) {
    for (j = 0; j < 5; j++) {
      newblock[i, j] = 0;
      block[i, j] = 0;
    }
  }
}

function GenerateBlock(kind) {

  ClearNewBlock();

  switch (kind) {

    //block building routine
    //there are 4 types per f||mation to account f|| (rotation

    // _
    //_|  type block f||mation

    case 1:
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block_color = 1;
      break;
    case 11:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block[1, 2] = 1;
      block_color = 1;
      break;
    case 21:
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block_color = 1;
      break;
    case 31:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block[1, 2] = 1;
      block_color = 1;
      break;

      // _
      //  |_ type block f||mation

    case 2:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[2, 1] = 1;
      block_color = 2;
      break;
    case 12:
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block_color = 2;
      break;
    case 22:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[2, 1] = 1;
      block_color = 2;
      break;
    case 32:
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block_color = 2;
      break;

      // _
      //|_| type block f||mation

    case 3:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block_color = 3;
      break;
    case 13:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block_color = 3;
      break;
    case 23:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block_color = 3;
      break;
    case 33:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block_color = 3;
      break;

      //_|_ type block f||mation

    case 4:
      block[1, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block[2, 1] = 1;
      block_color = 4;
      break;
    case 14:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block[1, 1] = 1;
      block_color = 4;
      break;
    case 24:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[1, 1] = 1;
      block_color = 4;
      break;
    case 34:
      block[0, 1] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[1, 2] = 1;
      block_color = 4;
      break;

      // ___| type block f||mation

    case 5:
      block[2, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block[2, 1] = 1;
      block_color = 5;
      break;
    case 15:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block[1, 2] = 1;
      block_color = 5;
      break;
    case 25:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[0, 1] = 1;
      block_color = 5;
      break;
    case 35:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[1, 2] = 1;
      block_color = 5;
      break;

      // |___ type block f||mation

    case 6:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[1, 1] = 1;
      block[2, 1] = 1;
      block_color = 6;
      break;
    case 16:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block_color = 6;
      break;
    case 26:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[2, 1] = 1;
      block_color = 6;
      break;
    case 36:
      block[1, 0] = 1;
      block[1, 1] = 1;
      block[1, 2] = 1;
      block[0, 2] = 1;
      block_color = 6;
      break;

      // ____ type block f||mation

    case 7:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[3, 0] = 1;
      block_color = 7;
      break;
    case 17:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block[0, 3] = 1;
      block_color = 7;
      break;
    case 27:
      block[0, 0] = 1;
      block[1, 0] = 1;
      block[2, 0] = 1;
      block[3, 0] = 1;
      block_color = 7;
      break;
    case 37:
      block[0, 0] = 1;
      block[0, 1] = 1;
      block[0, 2] = 1;
      block[0, 3] = 1;
      block_color = 7;
      break;
    default:
      break;
  }

  //  default; Err||("Unknown element to be generated.") break

  if (((kind = 7) || (kind = 27))) {
    x_size = 4;
    y_size = 1;
  } else if (((kind = 17) || (kind = 37))) {
    x_size = 1;
    y_size = 4;
  } else if ((kind % (10) == 3)) {
    x_size = 2;
    y_size = 2;
  } else if (((kind / 10 == 0) || (kind / 10 == 2))) {
    x_size = 3;
    y_size = 2;
  } else if (((kind / 10 == 1) || (kind / 10 == 3))) {
    x_size = 2;
    y_size = 3;
    current_block = kind;
  }
}

function Generatenewblock(kind) {
  ClearNewBlock();
  switch (kind) {
    case 1:
      newblock[1, 0] = 1;
      newblock[2, 0] = 1;
      newblock[0, 1] = 1;
      newblock[1, 1] = 1;
      _x_size = 3;
      y_size = 2;
      newblock_color = 1;
      break;
    case 2:
      newblock[0, 0] = 1;
      newblock[1, 0] = 1;
      newblock[1, 1] = 1;
      newblock[2, 1] = 1;
      _x_size = 3;
      y_size = 2;
      newblock_color = 2
      break;
    case 3:
      newblock[0, 0] = 1;
      newblock[0, 1] = 1;
      newblock[1, 0] = 1;
      newblock[1, 1] = 1;
      _x_size = 2;
      y_size = 2;
      newblock_color = 3;
      break;
    case 4:
      newblock[1, 0] = 1;
      newblock[0, 1] = 1;
      newblock[1, 1] = 1;
      newblock[2, 1] = 1;
      _x_size = 3;
      y_size = 2;
      newblock_color = 4
      break;
    case 5:
      newblock[2, 0] = 1;
      newblock[0, 1] = 1;
      newblock[1, 1] = 1;
      newblock[2, 1] = 1;
      _x_size = 3;
      y_size = 1;
      newblock_color = 5
      break;
    case 6:
      newblock[0, 0] = 1;
      newblock[0, 1] = 1;
      newblock[1, 1] = 1;
      newblock[2, 1] = 1;
      _x_size = 3;
      y_size = 1;
      newblock_color = 6
      break;
    case 7:
      newblock[0, 0] = 1;
      newblock[1, 0] = 1;
      newblock[2, 0] = 1;
      newblock[3, 0] = 1;
      _x_size = 4;
      y_size = 1;
      newblock_color = 7

      current_newblock = kind
      break;
    default:
      break;
  }

  function RotateBlock() {
    var old_block;
    old_block = current_block
    current_block = current_block + 10
    if ((current_block > 40)) {
      current_block = current_block - 40
      GenerateBlock(current_block)
      if (Not(CanPut)) {

        current_block = old_block
        GenerateBlock(current_block)
      }
    }
  }

  function DrawMap() {
    var i, j;
    // DRAW USED BLOCKS
    for (i = 5; i <= FIELD_WIDTH; i++) {
      for (j = 2; j <= FIELD_HEIGHT; j++) {
        if ((map(i, j))) {
          for (Index = 0; Index <= blockcount; Index++)

          {
            Picture1.Line(block_x * BLOCK_SIZE, block_y * BLOCK_SIZE) - ((block_x + i) * BLOCK_SIZE, (block_y + j) * BLOCK_SIZE), QBCol || (13), BF
          }

          //oldblocks(index).curr_frame = map(i, j) - 1
          //  oldblocks(index).x=i*20,oldblocks(index).y=j*20
          // draw_blocks (index)
          //  Draw_BOB(&oldblocks(index),lpddsback)
        }
      }
    }


    //DRAW } BLOCK
    for (i = 0; i <= 4; i++) {
      for (j = 0; i <= 4; i++) {
        if ((newblock(i, j))) {
          for (Index = 0; Index <= 4; Index++) {
            Picture1.Line(block_x * BLOCK_SIZE, block_y * BLOCK_SIZE) - ((block_x + i) * BLOCK_SIZE, (block_y + j) * BLOCK_SIZE), QBCol || (13), BF
            //newblocks(index).curr_frame = newblock_col|| - 1
            // newblocks(index).x=360+i*20,newblocks(index).y=160+j*20
            //draw_blocks (index)
            // Draw_BOB(&newblocks(index),lpddsback)
          }
        }
      }
    }

    //DRAW CURRENT BLOCK
    for (i = 0; i <= 4; i++) {
      for (j = 0; i <= 4; i++) {
        if (block[i, j] == 1) {
          for (Index = 0; Index <= 4; Index++) {
            Picture1.Line(block_x * BLOCK_SIZE, block_y * BLOCK_SIZE) - ((block_x + i) * BLOCK_SIZE, (block_y + j) * BLOCK_SIZE), QBCol || (13), BF
            //blocks(index).curr_frame = block_col|| - 1
          }
        }
      }
    }


  }

  function DeleteRow() {

    var sum, i, j, del;
    for (i = FIELD_HEIGHT - 1; i >= 1; i--) {
      sum = 0;
      for (j = 5; j <= FIELD_WIDTH; j++) {
        if ((map(j, i))) {
          sum = sum + 1
          //sprintf(buffer,"%d",sum)
          //Draw_Text_GDI(buffer, 525,i*20,RGB(0,255,0),lpddsback)
        }
      }
      if (sum == ROW_FULL) {
        numblocks -= ROW_FULL;
        for (j = i; j >= 1; j--) {
          for (k = 5; k <= FIELD_WIDTH; k++) {
            map[k, j] = map[k, j - 1];
            i += 2;
            del++;
          }
        }
      }


      if (del > 0) {
        dels += del;
        if (del > 0) {
          score += (100 * del) + ((del - 1) * 25) + (dels / 10) * 25;
          speed = 25 - (dels / 10) * 2
          if (speed < 2) {
            speed = 2;
          }
        }
      }
    }
  }

  function PutBlock() {
    //Picture1.Line (0, 0)-(Picture1.Width, Picture1.Height), QBCol||(15)

    for (i = 0; i <= 3; i++) {
      for (j = 0; j <= 3; j++) {
        Text1(i).Text = block[i, 0];
        Text2(i).Text = block[i, 1];
        Text3(i).Text = block[i, 2];
        Text4(i).Text = block[i, 3];
        if (block[i, j] == 1) {
          blockcount = blockcount + 1;
          map[block_x + i, block_y + j] = block_color;
          Picture1.Line(block_x * BLOCK_SIZE, block_y * BLOCK_SIZE) - ((block_x + i) * BLOCK_SIZE, (block_y + j) * BLOCK_SIZE), QBCol || (13), BF
        }
      }
    }

    DeleteRow();
  }

  function CanPut() {
    if (block_x + (x_size) > FIELD_WIDTH) {
      CanPut = false;
    }
    if (block_x < 5)
      CanPut = false;
    if (block_y + (y_size - 1) > FIELD_HEIGHT - 2)
      CanPut = false;
    for (i = 0; i <= x_size; i++) {
      for (j = 0; j <= y_size; j++) {
        if (map(block_x + i, block_y + j) && block[i, j]) {
          CanPut = false; //if (hitting block below stop falling
        } else {
          CanPut = true;
        }
      }
    }
  }

  function GenerateNew() {
    var temp;
    next_block = current_newblock;
    temp = next_block;
    next_next_block = 1; //Int(Rnd(7)) + 1
    Generatenewblock(next_next_block);
    for (i = 0; i <= 4; i++) {
      for (j = 0; i <= 4; i++) {
        if (newblock[i, j] == 1) {
          for (Index = 0; i <= 4; i++) {
            //newblocks(index).curr_frame = newblock_color
            newblocks[Index].x = 360 + i * 20;
            newblocks[Index].y = 160 + j * 20;
            //Draw_BOB(&newblocks(index),lpddsback)
            //draw_blocks (index)
            Picture1.Line(360 + (i * BLOCK_SIZE), 160 + (j * BLOCK_SIZE)) - (380 + (i * BLOCK_SIZE), 180 + (j * BLOCK_SIZE)), QBColor(newblock_color), BF
            //Else: Picture1.Line (360 + (i * 20), 160 + (j * 20))-(380 + (i * 20), 180 + (j * 20)), 0
          }
        }
      }
    }

    GenerateBlock(temp)
    block_x = 8;
    block_y = 2;

  }

  function NewGame() {
    for (i = 0; i <= FIELD_WIDTH; i++) {
      for (j = 0; i <= FIELD_HEIGHT; j++) {
        map(i, j) = 0;
      }
    }
    score = 0;
    next_next_block = 1;
    current_newblock = Int(Rnd(7)) + 1
    //GenerateNew
    GenerateBlock(1);
    //  Generatenewblock (1) //next_next_block)
    DrawMap();
    PutBlock();
    dels = start_level * 10;
    speed = 25 - (dels / 10) * 2;
    //  Timer = 0
    speed = 15;
    dels = 1;
    start_level = 0;
    start_blocks = 0;
    blockcount = 0;
    dels = start_level * 10;
    speed = 25 - (dels / 10) * 2;
    //Text1.Text = Me.Width
    //Text2.Text = Me.Height
    //   interference blocks for higher levels
    //   for (int i=0 i<start_blocks i++)
    //  for (int j=0 j<FIELD_HEIGHT j++)
    //     if (rand()%2) map(j,FIELD_WIDTH-i) = 1
    //
    //
    // do rest of inits
    //  for (int i=0 i<FIELD_HEIGHT i++)
    //  for (int j=5 j<FIELD_WIDTH j++)
    //  map(j,i) = 0
    //   for(i=0i<FIELD_WIDTH+1 i++)
    // map(i,FIELD_HEIGHT)=1
    // Timer = 0
    //    block_x = 1
    //block_y = 1
  }

  Private Sub form_Resize()
  Dim i, randomx, randomy As Integer
  Randomize
  current_block = 5 //Int(Rnd(7)) + 1
  GenerateBlock(current_block)

  Picture1.Width = FIELD_WIDTH * BLOCK_SIZE
  Picture1.Height = FIELD_HEIGHT * BLOCK_SIZE

  Do Until 1 = 2
  if (GetActiveWindow < > form1.hWnd Then RefreshWin = True End If
    if (RefreshWin = True Then
      if (GetActiveWindow = form1.hWnd Then RefreshWin = False DoEvents Picture1.Refresh Picture1.SetFocus DoEvents End If End If lblscore.Caption = "Score = " & score
        //block_y = block_y + 1
        if (Not(CanPut()) Then
          //block_y--
          //  block_y = block_y - 1
          PutBlock GenerateNew End If

          if (TurnLeft = True Then block_x = block_x - 1
            if (Not(CanPut()) Then block_x = block_x + 1 End If

              if (TurnRight = True Then block_x = block_x + 1
                if (Not(CanPut()) Then block_x = block_x - 1 End If

                  if (Rotate = True Then
                    if ((turn = 2) Then // rotate player
                      RotateBlock: turn = 0 End If End If

                      if (PushDown = True Then
                        if ((CanPut()) Then block_y = block_y + 1 End If DrawMap DoEvents Sleep(10)
                          //Picture1.Cls
                          Loop End Sub

                          Private Sub Picture1_KeyDown(KeyCode As Integer, Shift As Integer) if (KeyCode = vbKeyLeft Then TurnLeft = True Elseif(KeyCode = vbKeyRight Then TurnRight = True Elseif(KeyCode = vbKeyUp Then Rotate = True Elseif(KeyCode = vbKeyDown Then PushDown = True Elseif(KeyCode = vbKeyEscape Then End End If End Sub

                                    Private Sub Picture1_KeyUp(KeyCode As Integer, Shift As Integer) if (KeyCode = vbKeyLeft Then TurnLeft = False Elseif(KeyCode = vbKeyRight Then TurnRight = False Elseif(KeyCode = vbKeyUp Then Rotate = False Elseif(KeyCode = vbKeyDown Then PushDown = False End If End Sub