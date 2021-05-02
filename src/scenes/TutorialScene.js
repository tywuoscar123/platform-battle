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
        this.load.image('ruin', 'assets/menuBG/ruin.png');
    }

    /**
     * Create tutorial scene to show how to play
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //load background image
        let BG = this.add.image(screenCenterX,screenCenterY,'ruin');
        BG.displayWidth = this.sys.canvas.width;
        BG.displayHeight = this.sys.canvas.height;

        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        let buttonOffsetY = 130;

        let devilColor = "#ff0000"
        let heroColor = "#00ff00"

        //add title
        let title = this.add.text(screenCenterX, 80, "How to Play", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //text for devil tutorial
        this.add.text(200, 120, "Devil Controls", { font: "40px Arial", fill: devilColor});
        this.add.text(80, 180, "Controls (Keyboard): ", { font: "25px Arial", fill: devilColor});

        this.add.text(80, 220, "A - Go forward", { font: "25px Arial", fill: devilColor });
        this.add.text(80, 280, "D - Go backwards", { font: "25px Arial", fill: devilColor });
        this.add.text(80, 340, "W - Jump", { font: "25px Arial", fill: devilColor });

        this.add.text(360, 220, "H - Activate Super Jump", { font: "25px Arial", fill: devilColor });
        this.add.text(360, 280, "J - Activate Super Speed", { font: "25px Arial", fill: devilColor });
        this.add.text(360, 340, "K - Reload Magic Orb", { font: "25px Arial", fill: devilColor });
        this.add.text(360, 400, "L - Heal", { font: "25px Arial", fill: devilColor });

        this.add.text(80, 460, "Goal: Control the devil avatar and reach the bottom right goal of each level within the time limit to defeat the Hero", { font: "25px Arial", fill: devilColor, wordWrap: { width: 600 } });

        //text for hero tutorial 
        this.add.text(900, 120, " Hero Controls", { font: "40px Arial", fill: heroColor });
        this.add.text(800, 180, "Controls (Mouse): ", { font: "25px Arial", fill: heroColor});

        this.add.text(800, 220, "In each level, first, Left click on map to select a location (indicated by white square) (Note: Area near Devil, Spawn Point and Goal Point cannot be selected)", { font: "25px Arial", fill: heroColor, wordWrap: { width: 500 } });
        this.add.text(800, 370, "Then, select a trap on the right of the screen", { font: "25px Arial", fill: heroColor, wordWrap: { width: 500 } });
        this.add.text(800, 430, "Click on the trap icon to spawn the trap at the selected location", { font: "25px Arial", fill: heroColor, wordWrap: { width: 500 } });
        this.add.text(800, 520, "Goal: Stop the Devil from reaching the end of the map in the time limit by setting traps in the level", { font: "25px Arial", fill: heroColor, wordWrap: { width: 500 } });

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
