import Phaser from 'phaser';
import { CST } from "../CST";

export default class PauseScene extends Phaser.Scene {
    /**
     * Set the key of the scene
     */
    constructor(){
        super({
            key: CST.SCENES.PAUSE
        })
    }
    init(){
    }

    preload(){
    }

    /**
     * Create Pause menu, add text and buttons
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //set background
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6)')

        //add title
        this.add.text(screenCenterX, screenCenterY - 150, "GAME PAUSED", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add Resume button
        let resumeText = this.add.text(screenCenterX, screenCenterY+100, "Resume", { font: "60px Arial", fill: "#ff0044"}).setOrigin(0.5);
        resumeText.setInteractive(new Phaser.Geom.Rectangle(0, 0, resumeText.width, resumeText.height), Phaser.Geom.Rectangle.Contains);
        resumeText.on('pointerover', function() {
            this.setFill("#ffffff");
        });
        resumeText.on('pointerout', function() {
            this.setFill("#ff0044");
        });
        resumeText.on('pointerdown', function() {
            this.scene.resume(CST.SCENES.GAME);
            this.scene.stop();
        }, this);

        //add end game button
        let endText = this.add.text(screenCenterX, screenCenterY+175, "Quit Game", { font: "60px Arial", fill: "#ff0044"}).setOrigin(0.5);
        endText.setInteractive(new Phaser.Geom.Rectangle(0, 0, endText.width, endText.height), Phaser.Geom.Rectangle.Contains);
        endText.on('pointerover', function() {
            this.setFill("#ffffff");
        });
        endText.on('pointerout', function() {
            this.setFill("#ff0044");
        });
        endText.on('pointerdown', function() {
            this.scene.stop(CST.SCENES.GAME);
            this.scene.launch(CST.SCENES.MENU);
            this.scene.stop();
        }, this);
    }
}
