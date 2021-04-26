import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class LevelSelectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.HEROSKILLS
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
        //get screen center coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add title
        this.add.text(screenCenterX, screenCenterY - 250, "Hero Skills", { font: "55px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add indicator for hero points
        this.upgradePoints = this.add.text(screenCenterX - 200, screenCenterY - 180, "Upgrade Points: " + SAVES.SCORES.heroScore, { font: "15px Arial", fill: "#ffffff" }).setOrigin(0.5);


        //add text for to indicate current skill level
        this.spikeLevel = this.add.text(screenCenterX -70, screenCenterY - 120, "Spike level " + SAVES.SPIKE.SpikeLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let spikeUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 120,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            spikeUpgradeButton.on('pointerdown', function(){
            //call level up function for spike
            this.spikeLevelUp();
            }, this);

        //level indicator
        this.bombLevel = this.add.text(screenCenterX - 70, screenCenterY - 40, "Bomb level " + SAVES.BOMB.BombLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let bombUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 40,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            bombUpgrade.on('pointerdown', function(){
            //call level up function for 
            this.bombLevelUp();
            }, this);
        
        this.bearTrapLevel = this.add.text(screenCenterX - 80, screenCenterY + 40, "Bear Trap level " + SAVES.BEARTRAP.BearTrapLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let bearTrapUpgrade = this.utilfunctions.createTextButton(screenCenterX + 130,
            screenCenterY + 40,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            bearTrapUpgrade.on('pointerdown', function(){
            //call level up function for 
            this.bearTrapLevelUp();
            }, this);

        this.cannonLevel = this.add.text(screenCenterX - 70, screenCenterY + 120, "Cannon level " + SAVES.CANNON.CannonLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let cannonUpgrade = this.utilfunctions.createTextButton(screenCenterX + 130,
            screenCenterY + 120,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            cannonUpgrade.on('pointerdown', function(){
            //call level up function for 
            this.cannonLevelUp();
            }, this);
        //back button to menu
        let backButton = this.utilfunctions.createTextButton(
            80,
            600,
            "< BACK",
            { font: "32px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );
        backButton.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.SKILLTREE);
            this.scene.stop();
        }, this);
                    
    }

    //update screen to show current skill level
    update(args){
        this.spikeLevel.setText("Spike level " + SAVES.SPIKE.SpikeLevel + " - ");
        this.bombLevel.setText("Bomb level " + SAVES.BOMB.BombLevel + " - ");
        this.bearTrapLevel.setText("Bear Trap level " + SAVES.BEARTRAP.BearTrapLevel + " - ");
        this.cannonLevel.setText("Cannon level " + SAVES.CANNON.CannonLevel + " - ");
        this.upgradePoints.setText("Upgrade Points: " + SAVES.SCORES.heroScore);
    }

    /**
     * functions to upgrade traps
     * IF skill is in max level or hero does not have enough points to upgrade, return
     * else upgrade skill attributes and multiply upgrade cost by 2
     */
     spikeLevelUp(){
        if(SAVES.SPIKE.SpikeLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.SPIKE.SpikeUpgradeCost){
            return;
        }
        SAVES.SCORES.heroScore -= SAVES.SPIKE.SpikeUpgradeCost;
        SAVES.SPIKE.SpikeUpgradeCost *= 2;
        SAVES.SPIKE.SpikeLevel++;
        SAVES.SPIKE.SpikeDuration += 1000;

        //add condition to disable upgrade button when level is max?
    }

    bombLevelUp(){
        if(SAVES.BOMB.BombLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.BOMB.BombUpgradeCost){
            return;
        }
        SAVES.SCORES.heroScore -= SAVES.BOMB.BombUpgradeCost;
        SAVES.BOMB.BombUpgradeCost *= 2;
        SAVES.BOMB.BombLevel++;
        SAVES.BOMB.BombDuration += 1000;
        SAVES.BOMB.BombSpeed += 50;
    }

    bearTrapLevelUp(){
        if(SAVES.BEARTRAP.BearTrapLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.BEARTRAP.BearTrapUpgradeCost){
            return;
        }
        SAVES.SCORES.heroScore -= SAVES.BEARTRAP.BearTrapUpgradeCost;
        SAVES.BEARTRAP.BearTrapUpgradeCost *= 2;
        SAVES.BEARTRAP.BearTrapLevel++;
        SAVES.BEARTRAP.BearTrapFreezeTime += 500;
    }
    cannonLevelUp(){
        if(SAVES.CANNON.CannonLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.CANNON.CannonUpgradeCost){
            return;
        }
        SAVES.SCORES.heroScore -= SAVES.CANNON.CannonUpgradeCost;
        SAVES.CANNON.CannonUpgradeCost *= 2;
        SAVES.CANNON.CannonLevel++;
        SAVES.CANNON.CannonSpeed += 100;
    }
}
