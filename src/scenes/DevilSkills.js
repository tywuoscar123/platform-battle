import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.DEVILSKILLS
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    preload(){
    }

    /**
     * Create level select scene
     */
    create() {
                //get screen center coordinate
                const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
                const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        
                //add title
                this.add.text(screenCenterX, screenCenterY - 180, "Skills", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        
                //add play button
                let playButton = this.utilfunctions.createTextButton(screenCenterX,
                    screenCenterY,
                    "Devil Skills",
                    { font: "45px Arial", fill: "#ff0044"},
                    "#ff0044",
                    "#ffffff");
                playButton.on('pointerdown', function(){
                    this.scene.start(CST.SCENES.LEVEL7);
                    }, this);
        
                let LevelSelect = this.utilfunctions.createTextButton(screenCenterX,
                    screenCenterY+80,
                    "Hero Skills",
                    { font: "45px Arial", fill: "#ff0044"},
                    "#ff0044",
                    "#ffffff");
                LevelSelect.on('pointerdown', function(){
                    this.scene.start(CST.SCENES.LEVELS);
                }, this);
    }
}
