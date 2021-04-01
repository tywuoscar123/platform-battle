import Phaser from 'phaser';

import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import EndScene from "./scenes/EndScene";
import PauseScene from "./scenes/PauseScene";

const config = {
    type: Phaser.AUTO,
    parent: 'Platform_Battles',
    width: 1400,
    height: 640,
    physics: {
        default: 'arcade',
    },
    scene: [ MenuScene, GameScene,PauseScene ,EndScene]
};

const game = new Phaser.Game(config);

export { game };