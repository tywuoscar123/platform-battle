import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

/**
 * Scene for selecting level to play, and story unlocked
 */
export default class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.LEVELS
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    /**
     * Unlock the story according to the winners
     */
    preload(){
        this.load.image('ruin', 'assets/menuBG/ruin.png');

        if (SAVES.PROGRESS.GameLevel > 3 && this.checkStoryUnlock(3) === 'Devil'){
            SAVES.PROGRESS.DevilStory1 = true;
        }else if (SAVES.PROGRESS.GameLevel > 3 && this.checkStoryUnlock(3) === 'Hero'){
            SAVES.PROGRESS.HeroStory1 = true;
        }

        if (SAVES.PROGRESS.GameLevel > 5 && this.checkStoryUnlock(5) === 'Devil'){
            SAVES.PROGRESS.DevilStory2 = true;
        }else if (SAVES.PROGRESS.GameLevel > 5 && this.checkStoryUnlock(5) === 'Hero'){
            SAVES.PROGRESS.HeroStory2 = true;
        }

        if (SAVES.PROGRESS.GameLevel > 7 && this.checkStoryUnlock(7) === 'Devil'){
            SAVES.PROGRESS.DevilStoryEnd = true;
        }else if (SAVES.PROGRESS.GameLevel > 7 && this.checkStoryUnlock(7) === 'Hero'){
            SAVES.PROGRESS.HeroStoryEnd = true;
        }
    }

    /**
     * Create level select scene
     * At the same time, create buttons for viewing stories
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add background image
        let BG = this.add.image(screenCenterX,screenCenterY,'ruin');
        BG.displayWidth = this.sys.canvas.width;
        BG.displayHeight = this.sys.canvas.height;

        //add title
        this.add.text(screenCenterX, 80, "Levels", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //create level buttons
        //set buttons to interactive only if game progress reach the level
        //use a for loop to create button for each level, assign call back according to i (index)
        let buttonOffsetY = 130;
        let originalColor = "#00ff00";
        let overColor = "#ffffff";
        let disableColor = "#727272"
        let devilColor = "#ff0000"

        for (let i = 1, y=0; i <= CST.CONFIG.NumLevels; i++, y+=60){
            if (SAVES.PROGRESS.GameLevel >= i){
                let levelButton = this.utilfunctions.createTextButton(
                    screenCenterX - 340,
                    screenCenterY - buttonOffsetY + y,
                    `Level ${i}`,
                    { font: "35px Arial", fill: originalColor },
                    originalColor,
                    overColor
                );

                levelButton.on('pointerdown', function() {
                    //Todo Change level selection callback after implementing other levels
                    this.scene.launch(`LEVEL${i}`);
                    this.scene.stop();
                }, this);

            }else{
                this.add.text(screenCenterX - 340, screenCenterY - buttonOffsetY + y, `Level ${i}`, { font: "35px Arial", fill: disableColor }).setOrigin(0.5);
            }

            this.add.text(screenCenterX - 200, screenCenterY - buttonOffsetY + y, `Winner: ${SAVES.PROGRESS.StagesWinner[i-1]}`, { font: "35px Arial", fill: "#ffffff" }).setOrigin(0, 0.5);
        }

        this.add.text(screenCenterX + 240, screenCenterY - buttonOffsetY - 50, "Story:", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add story buttons
        let prologueButton = this.utilfunctions.createTextButton(
            screenCenterX + 360,
            screenCenterY - buttonOffsetY,
            "<Prologue>",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor
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
            { font: "30px Arial", fill: devilColor},
            devilColor,
            overColor
        );

        devilStoryOne.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Devil - 1", content: CST.STORY.Devil1});
            this.scene.stop();
        }, this);

        let devilStoryTwo = this.utilfunctions.createTextButton(
            screenCenterX + 260,
            screenCenterY - buttonOffsetY + 240,
            "<Devil 2>",
            { font: "30px Arial", fill: devilColor},
            devilColor,
            overColor
        );

        devilStoryTwo.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Devil - 2", content: CST.STORY.Devil2});
            this.scene.stop();
        }, this);

        let devilStoryThree = this.utilfunctions.createTextButton(
            screenCenterX + 260,
            screenCenterY - buttonOffsetY + 360,
            "<Devil End>",
            { font: "30px Arial", fill: devilColor},
            devilColor,
            overColor
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
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor
        );

        heroStoryOne.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - 1", content: CST.STORY.Hero1});
            this.scene.stop();
        }, this);

        let heroStoryTwo = this.utilfunctions.createTextButton(
            screenCenterX + 460,
            screenCenterY - buttonOffsetY + 240,
            "<Hero 2>",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor
        );

        heroStoryTwo.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - 2", content: CST.STORY.Hero2});
            this.scene.stop();
        }, this);

        let heroStoryThree = this.utilfunctions.createTextButton(
            screenCenterX + 460,
            screenCenterY - buttonOffsetY + 360,
            "<Hero End>",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor
        );

        heroStoryThree.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.STORY, {title: "Hero - End", content: CST.STORY.HeroEnd});
            this.scene.stop();
        }, this);


        //handle story unlock, disable the button if not unlocked yet
        if (SAVES.PROGRESS.DevilStory1 !== true){
            devilStoryOne.disableInteractive();
            devilStoryOne.setColor(disableColor);
        }

        if (SAVES.PROGRESS.DevilStory2 !== true){
            devilStoryTwo.disableInteractive();
            devilStoryTwo.setColor(disableColor);
        }

        if (SAVES.PROGRESS.DevilStoryEnd !== true){
            devilStoryThree.disableInteractive();
            devilStoryThree.setColor(disableColor);
        }

        if (SAVES.PROGRESS.HeroStory1 !== true){
            heroStoryOne.disableInteractive();
            heroStoryOne.setColor(disableColor);
        }

        if (SAVES.PROGRESS.HeroStory2 !== true){
            heroStoryTwo.disableInteractive();
            heroStoryTwo.setColor(disableColor);
        }

        if (SAVES.PROGRESS.HeroStoryEnd !== true){
            heroStoryThree.disableInteractive();
            heroStoryThree.setColor(disableColor);
        }

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

    /**
     * Check which player win more levels in the specific range
     *
     * @param {number} level - level to be checked
     */
    checkStoryUnlock(level){
        let DevilWin = 0;
        let HeroWin = 0;
        for (let i=0; i<level; i++){
            if (SAVES.PROGRESS.StagesWinner[i] === 'Devil'){
                DevilWin += 1;
            }else if (SAVES.PROGRESS.StagesWinner[i] === 'Hero'){
                HeroWin += 1;
            }
        }

        if (DevilWin > HeroWin){
            return 'Devil';
        }else if (DevilWin < HeroWin){
            return 'Hero';
        }else{
            return '';
        }
    }
}
