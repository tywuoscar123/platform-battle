import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

/**
 * Scene for showing How to play information
 */
export default class TutorialScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.TUTORIAL
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    preload(){
    }

    /**
     * Create tutorial scene to show how to play
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let buttonOffsetY = 130;

        //add title
        let title = this.add.text(screenCenterX, 80, "How to Play", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);



        //button to return to menu
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
