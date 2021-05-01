import Phaser from 'phaser';
import { CST } from "../CST";

/**
 * Scene as Pause Screen of the game
 */
export default class PauseScene extends Phaser.Scene {
    /**
     * Set the key of the scene
     */
    constructor(){
        //console.log("pause");

        super({
            key: CST.SCENES.PAUSE
        })
    }

    /**
     * Pass in key of level scene
     * @param data - Key of the level scene
     */
    init(data){
        this.sceneKey = data.sceneKey;
        this.gameScene = data.gameScene;
        //console.log(data.gameScene);
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

        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        //set background
        this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.6)')

        //add title
        this.add.text(screenCenterX, screenCenterY - 150, "GAME PAUSED", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add Resume button
        let resumeText = this.add.text(screenCenterX, screenCenterY+100, "Resume", { font: "60px Arial", fill: originalColor}).setOrigin(0.5);
        resumeText.setInteractive(new Phaser.Geom.Rectangle(0, 0, resumeText.width, resumeText.height), Phaser.Geom.Rectangle.Contains);
        resumeText.on('pointerover', function() {
            this.setFill(overColor);
        });
        resumeText.on('pointerout', function() {
            this.setFill(originalColor);
        });
        resumeText.on('pointerdown', function() {
            this.scene.resume(this.sceneKey);
            this.scene.stop();
        }, this);

        //add end game button
        let endText = this.add.text(screenCenterX, screenCenterY+175, "Quit Game", { font: "60px Arial", fill: originalColor}).setOrigin(0.5);
        endText.setInteractive(new Phaser.Geom.Rectangle(0, 0, endText.width, endText.height), Phaser.Geom.Rectangle.Contains);
        endText.on('pointerover', function() {
            this.setFill(overColor);
        });
        endText.on('pointerout', function() {
            this.setFill(originalColor);
        });
        endText.on('pointerdown', function() {
            this.gameScene.destroyScene();   
            this.scene.stop(this.sceneKey);
            this.scene.launch(CST.SCENES.MENU);
            this.scene.stop();
        }, this);
    }

    
}
