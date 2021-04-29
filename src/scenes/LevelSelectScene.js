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
     * At the same time, create buttons for viewing stories
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
                    screenCenterX - 340,
                    screenCenterY - buttonOffsetY + y,
                    `Level ${i}`,
                    { font: "35px Arial", fill: "#ff0044" },
                    "#ff0044",
                    "#ffffff"
                );

                levelButton.on('pointerdown', function() {
                    //Todo Change level selection callback after implementing other levels
                    this.scene.launch(`LEVEL${i}`);
                    this.scene.stop();
                }, this);

                this.add.text(screenCenterX - 200, screenCenterY - buttonOffsetY + y, `Winner: ${SAVES.PROGRESS.StagesWinner[i-1]}`, { font: "35px Arial", fill: "#ffffff" }).setOrigin(0, 0.5);

            }else{
                this.add.text(screenCenterX - 340, screenCenterY - buttonOffsetY + y, `Level ${i}`, { font: "35px Arial", fill: "#303030" }).setOrigin(0.5);
            }

        }

        this.add.text(screenCenterX + 240, screenCenterY - buttonOffsetY - 50, "Story:", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add story buttons
        let prologueButton = this.utilfunctions.createTextButton(
            screenCenterX + 360,
            screenCenterY - buttonOffsetY,
            "<Prologue>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        prologueButton.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Prologue", content: CST.STORY.Prologue});
            this.scene.stop();
        }, this);

        //devil story line buttons
        let devilStoryOne = this.utilfunctions.createTextButton(
            screenCenterX + 260,
            screenCenterY - buttonOffsetY + 120,
            "<Devil 1>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        devilStoryOne.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Devil - 1", content: CST.STORY.Devil1});
            this.scene.stop();
        }, this);

        let devilStoryTwo = this.utilfunctions.createTextButton(
            screenCenterX + 260,
            screenCenterY - buttonOffsetY + 240,
            "<Devil 2>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        devilStoryTwo.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Devil - 2", content: CST.STORY.Devil2});
            this.scene.stop();
        }, this);

        let devilStoryThree = this.utilfunctions.createTextButton(
            screenCenterX + 260,
            screenCenterY - buttonOffsetY + 360,
            "<Devil End>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        devilStoryThree.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Devil - End", content: CST.STORY.DevilEnd});
            this.scene.stop();
        }, this);

        //hero storyline buttons
        let heroStoryOne = this.utilfunctions.createTextButton(
            screenCenterX + 460,
            screenCenterY - buttonOffsetY + 120,
            "<Hero 1>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        heroStoryOne.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - 1", content: CST.STORY.Hero1});
            this.scene.stop();
        }, this);

        let heroStoryTwo = this.utilfunctions.createTextButton(
            screenCenterX + 460,
            screenCenterY - buttonOffsetY + 240,
            "<Hero 2>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        heroStoryTwo.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - 2", content: CST.STORY.Hero2});
            this.scene.stop();
        }, this);

        let heroStoryThree = this.utilfunctions.createTextButton(
            screenCenterX + 460,
            screenCenterY - buttonOffsetY + 360,
            "<Hero End>",
            { font: "30px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );

        heroStoryThree.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - End", content: CST.STORY.HeroEnd});
            this.scene.stop();
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
