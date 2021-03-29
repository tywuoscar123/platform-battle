import Phaser from 'phaser';

import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import EndScene from "./scenes/EndScene";

const config = {
    type: Phaser.AUTO,
    parent: 'Platform_Battles',
    width: 1280,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [MenuScene, GameScene, EndScene]
};

const game = new Phaser.Game(config);

export { game };