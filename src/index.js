import Phaser from 'phaser';

import MenuScene from "./scenes/MenuScene";
import LevelSelectScene from "./scenes/LevelSelectScene";
import GameScene from "./scenes/GameScene";
import EndScene from "./scenes/EndScene";
import PauseScene from "./scenes/PauseScene";
import level7 from "./scenes/level7";
import SkillTree from "./scenes/SkillTree";
import DevilSkills from "./scenes/DevilSkills";
import HeroSkills from "./scenes/HeroSkills";

const config = {
    type: Phaser.AUTO,
    parent: 'Platform_Battles',
    width: 1400,
    height: 640,
    physics: {
        default: 'arcade',
    },
    scene: [ MenuScene, LevelSelectScene, SkillTree, DevilSkills, HeroSkills, level7, PauseScene ,EndScene]
};

const game = new Phaser.Game(config);

export { game };