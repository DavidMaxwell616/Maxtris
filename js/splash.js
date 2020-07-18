function mainMenuCreate(scene) {
  splash = scene.add.image(0, 0, 'splash');
  splash.anchor.setTo(0, 0);
  // scene.scale.resize(this.width, this.height);
  maxxdaddy = game.add.image(0, game.height * 0.95, 'maxxdaddy');

  game.input.keyboard.onUpCallback = function (e) {
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
      if (startGame)
        return;
      splash.visible = false;
      startGame = true;
      gameCreate(scene);
    }
  }
}