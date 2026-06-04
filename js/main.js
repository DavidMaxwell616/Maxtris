import GameScene from "./GameScene.js";
import SplashScene from "./SplashScene.js";
import { WIDTH, HEIGHT } from "./config.js";

new Phaser.Game({
    type: Phaser.WEBGL,
    width: WIDTH,
    height: HEIGHT,
    scene: [SplashScene, GameScene],
    fps: { target: 60, forceSetTimeOut: true }
});