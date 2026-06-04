import { WIDTH, HEIGHT } from "./config.js";

export default class SplashScene extends Phaser.Scene {
    constructor() {
        super("SplashScene");
    }
    preload() {
        this.load.path = './assets/images/';
        this.load.image('splash', 'splash.png');
        this.load.image('maxxdaddy', 'maxxdaddy.gif');
    }

    create() {
        this.splash = this.add.image(0, 0, 'splash')
            .setInteractive()
            .setOrigin(0)
            .setDisplaySize(WIDTH, HEIGHT);;
        this.maxxdaddy = this.add.image(WIDTH * .9, HEIGHT * .95, 'maxxdaddy');

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
        this.input.on('pointerdown', () => {
            this.scene.start("GameScene");
        });
    }

    update() {
        if (this.spaceKey.isDown) {
            this.scene.start("GameScene");
        }

    }
}
