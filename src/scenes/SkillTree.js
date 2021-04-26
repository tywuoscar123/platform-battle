import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.SKILLTREE
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
                this.add.text(screenCenterX, screenCenterY - 270, "Skills", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        
                //add button to navigate
                let devilSkillButton = this.utilfunctions.createTextButton(screenCenterX,
                    screenCenterY,
                    "Devil Skills",
                    { font: "45px Arial", fill: "#ff0044"},
                    "#ff0044",
                    "#ffffff");
                devilSkillButton.on('pointerdown', function(){
                    this.scene.start(CST.SCENES.DEVILSKILLS);
                    }, this);
        
                let heroSkillButton = this.utilfunctions.createTextButton(screenCenterX,
                    screenCenterY+80,
                    "Hero Skills",
                    { font: "45px Arial", fill: "#ff0044"},
                    "#ff0044",
                    "#ffffff");
                heroSkillButton.on('pointerdown', function(){
                    console.log("HEROSKIL");
                    this.scene.start(CST.SCENES.HEROSKILLS);
                }, this);

                let backButton = this.utilfunctions.createTextButton(
                    80,
                    600,
                    "< BACK",
                    { font: "32px Arial", fill: "#ff0044" },
                    "#ff0044",
                    "#ffffff"
                );
                backButton.on('pointerdown', function() {
                    this.scene.launch(CST.SCENES.MENU);
                    this.scene.stop();
                }, this);
    }
}
