function mainMenuCreate(scene) {
  game.stage.backgroundColor = "#000000";
  splash = scene.add.image(0, 0, 'splash');
  splash.anchor.setTo(0, 0);
  splash.width = game.width;
  //splash.height = game.height;
  splash.smoothed = true;
  splash.inputEnabled = true;
  maxxdaddy = game.add.image(0,splash.height, 'maxxdaddy');
  // maxxdaddy.width = game.width*.25;
  // maxxdaddy.height = game.height*.1;
  splash.events.onInputDown.add(start, this);

  game.input.keyboard.onUpCallback = function (e) {
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
      start();
    }
  }

  function start(){
    if (startGame)
    return;
  splash.visible = false;
  maxxdaddy.visible = false;
  startGame = true;
  gameCreate(scene);

  }
}