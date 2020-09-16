function mainMenuCreate(scene) {
  splash = scene.add.image(0, 0, 'splash');
  splash.anchor.setTo(0, 0);
  splash.width = game.width;
  splash.height = game.height;
  maxxdaddy = game.add.image(game.width*.35, game.height * 0.8, 'maxxdaddy');
  maxxdaddy.width = game.width*.25;
  maxxdaddy.height = game.height*.1;

  game.input.keyboard.onUpCallback = function (e) {
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
      if (startGame)
        return;
      splash.visible = false;
      maxxdaddy.visible = false;
      startGame = true;
      gameCreate(scene);
    }
  }
}