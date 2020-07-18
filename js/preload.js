function preload() {
  game.load.onLoadStart.add(loadStart, this);
  game.load.onFileComplete.add(fileComplete, this);
  game.load.onLoadComplete.add(loadComplete, this);
  loadText = game.add.text(32, 32, '', {
    fill: '#ffffff',
  });
  this.load.path = '../assets/images/';
  this.load.image('splash', 'splash.bmp');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.spritesheet('blocks', 'blocks.png', 20,20,6 );

  this.load.path = '../assets/json/';
  this.load.json('objectData', 'blockMap.json');

  this.load.start();
}

function loadStart() {
  loadText.setText('Loading ...');
}

function loadComplete() {
  loadText.setText('Load Complete');
  loadText.destroy();
}
//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

  loadText.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);


}