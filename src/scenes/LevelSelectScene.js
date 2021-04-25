import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.LEVELS
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
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add title
        this.add.text(screenCenterX, 80, "Levels", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //create level buttons
        //set buttons to interactive only if game progress reach the level
        //use a for loop to create button for each level, assign call back according to i (index)
        let buttonOffsetY = 130;

        for (let i = 1, y=0; i <= CST.CONFIG.NumLevels; i++, y+=60){
            if (SAVES.PROGRESS.GameLevel >= i){
                let levelButton = this.utilfunctions.createTextButton(
                    screenCenterX,
                    screenCenterY - buttonOffsetY + y,
                    `Level ${i}`,
                    { font: "40px Arial", fill: "#ff0044" },
                    "#ff0044",
                    "#ffffff"
                );

                levelButton.on('pointerdown', function() {
                    //Todo Change level selection callback after implementing other levels
                    //this.scene.launch(`LEVEL${i}`);
                    this.scene.launch(`LEVEL7`);
                    this.scene.stop();
                }, this);
            }else{
                this.add.text(screenCenterX, screenCenterY - buttonOffsetY + y, `Level ${i}`, { font: "40px Arial", fill: "#303030" }).setOrigin(0.5);
            }
        }

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
