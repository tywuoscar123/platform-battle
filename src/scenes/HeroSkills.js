import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

/**
 * Scene for upgrading devil skills
 */
export default class HeroSkills extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.HEROSKILLS
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    preload(){
        //load audio
        this.load.audio("levelUpSfx", "assets/Sfx/levelUpSfx.mp3");
        this.load.image('ruin', 'assets/menuBG/ruin.png');

        //load icon
        this.load.image('spike', 'assets/Traps/spike.png');
        this.load.image('bomb', 'assets/Traps/bomb.png');
        this.load.image('cannon', 'assets/Traps/cannon_asset/cannon-icon.png');
        this.load.image('beartrap', 'assets/Traps/beartrap_assets/Beartrap.png');
    }

    /**
     * Create hero skills(traps) scene
     */
    create() {
        this.levelUpSfx = this.sound.add("levelUpSfx", {volume: 0.5});
        if(CST.CONFIG.AUDIO === "off"){
            this.sound.mute = true;
        }else {
            this.sound.mute = false;
        }
        //get screen center coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add background image
        let BG = this.add.image(screenCenterX,screenCenterY,'ruin');
        BG.displayWidth = this.sys.canvas.width;
        BG.displayHeight = this.sys.canvas.height;

        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        //add title
        this.add.text(screenCenterX, screenCenterY - 250, "Hero Skills", { font: "55px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add indicator for hero points
        this.upgradePoints = this.add.text(screenCenterX - 200, screenCenterY - 180, "Upgrade Points: " + SAVES.SCORES.heroScore, { font: "15px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //----SPIKE----
        //add text for to indicate current skill level
        this.spikeLevel = this.add.text(screenCenterX -70, screenCenterY - 120, "Spike level " + SAVES.SPIKE.SpikeLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let spikeUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 120,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            spikeUpgradeButton.on('pointerdown', function(){
            //call level up function for spike
            this.spikeLevelUp();
            }, this);
        //desc for spike + icon
        this.spikeDesc = this.add.text(screenCenterX + 50, screenCenterY - 80, "Deals damage to devil when they step on it", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.spike = this.add.image(screenCenterX - 250, screenCenterY - 100, "spike");
        this.spike.setScale(1);

        //----BOMB---
        //level indicator
        this.bombLevel = this.add.text(screenCenterX - 70, screenCenterY - 20, "Bomb level " + SAVES.BOMB.BombLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let bombUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 20,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            bombUpgrade.on('pointerdown', function(){
            //call level up function for bomb
            this.bombLevelUp();
            }, this);
        //desc for bomb
        this.bombDesc = this.add.text(screenCenterX + 140, screenCenterY + 20, "Bouncing bomb that goes towards the player and bounces off platforms", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.bomb = this.add.image(screenCenterX - 250, screenCenterY, "bomb");
        this.bomb.setScale(1);
        
        //----BEARTRAP----
        this.bearTrapLevel = this.add.text(screenCenterX - 80, screenCenterY + 80, "Bear Trap level " + SAVES.BEARTRAP.BearTrapLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let bearTrapUpgrade = this.utilfunctions.createTextButton(screenCenterX + 130,
            screenCenterY + 80,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            bearTrapUpgrade.on('pointerdown', function(){
            //call level up function for bear trap
            this.bearTrapLevelUp();
            }, this);
        //desc for bearTrap
        this.bearTrapDesc = this.add.text(screenCenterX + 100, screenCenterY + 120, "The Devil will be unable to move for a period after stepping on it", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.bearTrap = this.add.image(screenCenterX - 350, screenCenterY + 100, "beartrap");
        this.bearTrap.setScale(2);
        //----CANNON----
        this.cannonLevel = this.add.text(screenCenterX - 70, screenCenterY + 180, "Cannon level " + SAVES.CANNON.CannonLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let cannonUpgrade = this.utilfunctions.createTextButton(screenCenterX + 130,
            screenCenterY + 180,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            cannonUpgrade.on('pointerdown', function(){
            //call level up function for cannon
            this.cannonLevelUp();
            }, this);

        //desc for cannon 
        this.cannonDesc = this.add.text(screenCenterX + 60, screenCenterY + 220, "Auto cannon that will aim at the player and shoot", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.cannon = this.add.image(screenCenterX - 250, screenCenterY + 200, "cannon");
        this.cannon.setScale(1);    

        //back button to menu
        let backButton = this.utilfunctions.createTextButton(
            80,
            600,
            "< BACK",
            { font: "32px Arial", fill: originalColor},
            originalColor,
            overColor
        );
        backButton.on('pointerdown', function() {
            this.scene.launch(CST.SCENES.SKILLTREE);
            this.scene.stop();
        }, this);
                    
    }

    //update screen to show current skill level
    update(time, delta){

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
        this.levelUpSfx.play();
        SAVES.SCORES.heroScore -= SAVES.SPIKE.SpikeUpgradeCost;
        SAVES.SPIKE.SpikeUpgradeCost += 10;
        SAVES.SPIKE.SpikeLevel++;

        SAVES.SPIKE.SpikeCoolDown -= 200;
        SAVES.SPIKE.SpikeDamage += 2;

        //add condition to disable upgrade button when level is max?
    }

    bombLevelUp(){
        if(SAVES.BOMB.BombLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.BOMB.BombUpgradeCost){
            return;
        }
        this.levelUpSfx.play();
        SAVES.SCORES.heroScore -= SAVES.BOMB.BombUpgradeCost;
        SAVES.BOMB.BombUpgradeCost += 10;
        SAVES.BOMB.BombLevel++;

        SAVES.BOMB.BombCoolDown -= 200;
        SAVES.BOMB.BombSpeed += 10;
        SAVES.BOMB.BombDamage += 2;
    }

    bearTrapLevelUp(){
        if(SAVES.BEARTRAP.BearTrapLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.BEARTRAP.BearTrapUpgradeCost){
            return;
        }
        this.levelUpSfx.play();
        SAVES.SCORES.heroScore -= SAVES.BEARTRAP.BearTrapUpgradeCost;
        SAVES.BEARTRAP.BearTrapUpgradeCost += 10;
        SAVES.BEARTRAP.BearTrapLevel++;

        SAVES.BEARTRAP.BearTrapFreezeTime += 200;
        SAVES.BEARTRAP.BearTrapCoolDown -= 200;
    }

    cannonLevelUp(){
        if(SAVES.CANNON.CannonLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.heroScore < SAVES.CANNON.CannonUpgradeCost){
            return;
        }
        this.levelUpSfx.play();
        SAVES.SCORES.heroScore -= SAVES.CANNON.CannonUpgradeCost;
        SAVES.CANNON.CannonUpgradeCost += 10;
        SAVES.CANNON.CannonLevel++;

        SAVES.CANNON.CannonSpeed += 10;
        SAVES.CANNON.CannonCoolDown -= 200;
        SAVES.CANNON.CannonBallDamage += 2;
    }
}
