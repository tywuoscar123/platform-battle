import Phaser from 'phaser';

import MenuScene from "./scenes/MenuScene";
import LevelSelectScene from "./scenes/LevelSelectScene";
import SettingScene from "./scenes/SettingScene";
import StoryScene from "./scenes/StoryScene";
import EndScene from "./scenes/EndScene";
import PauseScene from "./scenes/PauseScene"
import level1 from "./scenes/level1";
import level2 from "./scenes/level2";
import level3 from "./scenes/level3";
import level4 from "./scenes/level4";
import level5 from "./scenes/level5";
import level6 from "./scenes/level6";
import level7 from "./scenes/level7";
import SkillTree from "./scenes/SkillTree";
import DevilSkills from "./scenes/DevilSkills";
import HeroSkills from "./scenes/HeroSkills";
import TutorialScene from "./scenes/TutorialScene";

const config = {
    type: Phaser.AUTO,
    parent: 'Platform_Battles',
    width: 1400,
    height: 640,
    physics: {
        default: 'arcade',
    },

    scene: [ MenuScene, LevelSelectScene, SkillTree, SettingScene,DevilSkills, HeroSkills, level1, level2, level3, level4, level5, level6, level7, StoryScene, PauseScene, EndScene, TutorialScene]
};

const game = new Phaser.Game(config);

export { game };