import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class SettingScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.SETTINGS
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    preload(){
        this.load.image('ruin', 'assets/menuBG/ruin.png');
    }

    /**
     * Create Setting scene
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add background image
        let BG = this.add.image(screenCenterX,screenCenterY,'ruin');
        BG.displayWidth = this.sys.canvas.width;
        BG.displayHeight = this.sys.canvas.height;

        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        let buttonOffsetY = 130;

        //add title
        let title = this.add.text(screenCenterX, 80, "Settings", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //timer setting, show current time for a level
        let timerText = this.add.text(screenCenterX - 320, screenCenterY - buttonOffsetY, `Level Time - Current: ${CST.CONFIG.TIMER/60/1000} minutes`, { font: "25px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add buttons for changing level timer
        let oneMinute = this.utilfunctions.createTextButton(
            screenCenterX +60,
            screenCenterY - buttonOffsetY,
            `1 minutes`,
            { font: "25px Arial", fill: originalColor},
            originalColor,
            overColor
        );
        oneMinute.on('pointerdown', function(){
            CST.CONFIG.TIMER = 60 * 1000;
            timerText.setText(`Level Time - Current: ${CST.CONFIG.TIMER/60/1000} minutes`);
        }, this);

        let twoMinutes = this.utilfunctions.createTextButton(
            screenCenterX +200,
            screenCenterY - buttonOffsetY,
            `2 minutes`,
            { font: "25px Arial", fill: originalColor},
            originalColor,
            overColor
        );

        twoMinutes.on('pointerdown', function(){
            CST.CONFIG.TIMER = 2 * 60 * 1000;
            timerText.setText(`Level Time - Current: ${CST.CONFIG.TIMER/60/1000} minutes`);
        }, this);

        let threeMinutes = this.utilfunctions.createTextButton(
            screenCenterX + 340,
            screenCenterY - buttonOffsetY,
            `3 minutes`,
            { font: "25px Arial", fill: originalColor},
            originalColor,
            overColor
        );

        threeMinutes.on('pointerdown', function(){
            CST.CONFIG.TIMER = 3 * 60 * 1000;
            timerText.setText(`Level Time - Current: ${CST.CONFIG.TIMER/60/1000} minutes`);
        }, this);

        //new setting to enable or disable audio
        let audioText = this.add.text(screenCenterX - 320, screenCenterY - buttonOffsetY + 80, `Audio -  ${CST.CONFIG.AUDIO}`, { font: "25px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add button to toggle audio on or off
        let toggleButton = this.utilfunctions.createTextButton(
            screenCenterX +60,
            screenCenterY - buttonOffsetY + 80,
            `Toggle`,
            { font: "25px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );
        toggleButton.on('pointerdown', function(){
            CST.CONFIG.AUDIO === "on" ? CST.CONFIG.AUDIO = "off" : CST.CONFIG.AUDIO = "on";
            audioText.setText(`Audio -  ${CST.CONFIG.AUDIO}`);
        }, this);


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
