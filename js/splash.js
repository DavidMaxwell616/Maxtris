function mainMenuCreate(scene) {
  splash = scene.add.image(0, 0, 'splash');
  splash.setDisplaySize(scene.game.config.width, scene.game.config.height);
  splash.setOrigin(0, 0);
  maxxdaddy = scene.add.image(config.width * 0.9, config.height * 0.87, 'maxxdaddy');
  scene.scale.resize(config.width, config.height);
  scene.input.keyboard.on('keydown_SPACE', function (event) {
    if (startGame)
      return;
    splash.visible = false;
    startGame = true;
    gameCreate(scene);
  });
}