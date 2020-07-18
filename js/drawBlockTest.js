var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', 
{ preload: preload, create: create, update: update });

var timer = 0;
var total = 0;

function preload() {
    game.load.spritesheet('blocks', 'assets/images/blocks.png', 20,20,6 );

}

function create() {
  gameCreate();
}

function gameCreate() {
    releaseblock();
}

function releaseblock() {

    var block = game.add.sprite(game.world.randomX, game.world.randomY, 'blocks');
    console.log(block);
    //  
    //block.scale.setTo(2, 2);

    //  If you prefer to work in degrees rather than radians then you can use Phaser.Sprite.angle
    //  otherwise use Phaser.Sprite.rotation
    block.angle = game.rnd.angle();
block.frame = game.rnd.integerInRange(0, 6)
   
    total++;
    timer = game.time.now + 100;

}

function update() {

    if (total < 200 && game.time.now > timer)
    {
        releaseblock();
    }

}
