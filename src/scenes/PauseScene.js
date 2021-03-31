import Phaser from 'phaser';
import { CST } from "../CST";

export default class PauseScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.PAUSE
        })
    }
    init(){
    }

    preload(){
    }
    create() {
        //get screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        //add title
        this.add.text(screenCenterX, screenCenterY - 100, "GAME PAUSED", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add Resume button
        let resumeText = this.add.text(screenCenterX, screenCenterY+100, "Resume", { font: "65px Arial", fill: "#ff0044"}).setOrigin(0.5);
        resumeText.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains);
        resumeText.on('pointerover', function() {
            this.setFill("#ffffff");
        });
        resumeText.on('pointerout', function() {
            this.setFill("#ff0044");
        });
        resumeText.on('pointerdown', function() {
            this.scene.resume(CST.SCENES.GAME);
        }, this);
    }
}
