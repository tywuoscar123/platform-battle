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

        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        let buttonOffsetY = 130;

        //add title
        let title = this.add.text(screenCenterX, 80, "How to Play", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //text for devil tutorial
        this.add.text(220, 150, " Devil Controls", { font: "40px Arial", fill: "#ffffff" });
        this.add.text(120, 220, "A - Go forward", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(120, 280, "D - Go backwards", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(120, 340, "W - Jump", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(400, 220, "1 - Activate Super Jump", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(400, 280, "2 - Activate Super Speed", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(400, 340, "3 - Heal", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(400, 400, "4 - Reload Magic Orb", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(80, 460, "Goal: Reach the end of the map to defeat the Hero", { font: "25px Arial", fill: "#ffffff" });

        //text for hero tutorial 
        this.add.text(1000, 150, " Hero Controls", { font: "40px Arial", fill: "#ffffff" });
        this.add.text(900, 220, "Left click on map to select trap location", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(900, 280, "Select traps on the right of the screen", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(900, 340, "Click on the traps to drop them", { font: "25px Arial", fill: "#ffffff" });
        this.add.text(780, 460, "Goal: Stop the Devil from reaching the end of the map", { font: "25px Arial", fill: "#ffffff" });
        //button to return to menu
        let backButton = this.utilfunctions.createTextButton(
            80,
            600,
            "< BACK",
            { font: "32px Arial", fill: originalColor},
            originalColor,
            overColor
        );
        backButton.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.MENU);
            this.scene.stop();
        }, this);
    }
}
