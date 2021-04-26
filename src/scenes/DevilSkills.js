import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

export default class DevilSkills extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.DEVILSKILLS
        });
        this.utilfunctions = new Utils(this);
    }


    init(){
    }

    preload(){
    }

    /**
     * Create Devil Skills scene
     */
     create() {
        //get screen center coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add title
        this.add.text(screenCenterX, screenCenterY - 250, "Hero Skills", { font: "55px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add indicator for hero points
        this.upgradePoints = this.add.text(screenCenterX - 220  , screenCenterY - 200, "Upgrade Points: " + SAVES.SCORES.devilScore, { font: "15px Arial", fill: "#ffffff" }).setOrigin(0.5);


        //add text for to indicate current skill level
        this.playerLevel = this.add.text(screenCenterX - 80, screenCenterY - 160   , "Player level " + SAVES.PLAYER.PlayerLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let playerUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 160,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            playerUpgradeButton.on('pointerdown', function(){
            //call level up function for player
            this.playerLevelUp();
            }, this);

        //add text for to indicate current skill level
        this.superJumpLevel = this.add.text(screenCenterX - 120, screenCenterY - 80, "Super Jump level " + SAVES.PLAYER.SuperJumpLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let superJumpUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 80,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            superJumpUpgradeButton.on('pointerdown', function(){
            //call level up function for super jump
            this.superJumpLevelUp();
            }, this);

        //level indicator
        this.superSpeedLevel = this.add.text(screenCenterX - 120, screenCenterY, "Super Speed level " + SAVES.PLAYER.SuperSpeedLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let superSpeedUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            superSpeedUpgrade.on('pointerdown', function(){
            //call level up function for super speed
            this.superSpeedLevelUp();
            }, this);
        
        this.reloadLevel = this.add.text(screenCenterX - 70, screenCenterY + 80, "Reload level " + SAVES.PLAYER.ReloadLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let reloadUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY + 80,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            reloadUpgrade.on('pointerdown', function(){
            //call level up function for reload
            this.reloadLevelUp();
            }, this);

        this.healLevel = this.add.text(screenCenterX - 60, screenCenterY + 160, "Heal " + SAVES.PLAYER.HealLevel + " - ", { font: "35px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let healUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY + 160,
            "Upgrade",
            { font: "30px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff");
            healUpgrade.on('pointerdown', function(){
            //call level up function for heal
            this.healLevelUp();
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
        this.playerLevel.setText("Player level " + SAVES.PLAYER.PlayerLevel + " - ");
        this.superJumpLevel.setText("Super Jump level " + SAVES.PLAYER.SuperJumpLevel + " - ");
        this.superSpeedLevel.setText("Super Speed level " + SAVES.PLAYER.SuperSpeedLevel + " - ");
        this.reloadLevel.setText("Reload level " + SAVES.PLAYER.ReloadLevel + " - ");
        this.healLevel.setText("Heal level " + SAVES.PLAYER.HealLevel + " - ");
        this.upgradePoints.setText("Upgrade Points: " + SAVES.SCORES.devilScore);
    }

    /**
     * functions to upgrade devil skills
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and multiply upgrade cost by 2
     */
     playerLevelUp(){
        if(SAVES.PLAYER.PlayerLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.PlayerUpgradeCost){
            return;
        }
        SAVES.SCORES.devilScore -= SAVES.PLAYER.PlayerUpgradeCost;
        SAVES.PLAYER.PlayerUpgradeCost *= 2;
        SAVES.PLAYER.PlayerLevel++;
        SAVES.PLAYER.InitialHP += 5;
        SAVES.PLAYER.InitialBullet += 1;
        SAVES.PLAYER.Mana += 10; 
    }

     superJumpLevelUp(){
        if(SAVES.PLAYER.SuperJumpLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.SuperJumpUpgradeCost){
            return;
        }
        SAVES.SCORES.devilScore -= SAVES.PLAYER.SuperJumpUpgradeCost;
        SAVES.PLAYER.SuperJumpUpgradeCost *= 2;
        SAVES.PLAYER.SuperJumpLevel++;
        SAVES.PLAYER.SuperJumpMultiplier += 0.5;
        SAVES.PLAYER.SuperJumpCoolDown += 250;
        //add condition to disable upgrade button when level is max?
    }

    superSpeedLevelUp(){
        if(SAVES.PLAYER.SuperSpeedLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.SuperSpeedUpgradeCost){
            return;
        }
        SAVES.SCORES.devilScore -= SAVES.PLAYER.SuperSpeedUpgradeCost;
        SAVES.PLAYER.SuperSpeedUpgradeCost *= 2;
        SAVES.PLAYER.SuperSpeedLevel++;
        SAVES.PLAYER.SuperSpeedCoolDown += 250;
        SAVES.PLAYER.SuperSpeedMultiplier += 0.5;
    }

    reloadLevelUp(){
        if(SAVES.PLAYER.ReloadLevelLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.ReloadUpgradeCost){
            return;
        }
        SAVES.SCORES.devilScore -= SAVES.PLAYER.ReloadUpgradeCost;
        SAVES.PLAYER.ReloadUpgradeCost *= 2;
        SAVES.PLAYER.ReloadLevel++;
        SAVES.PLAYER.ReloadCost -= 2;
    }
    healLevelUp(){
        if(SAVES.PLAYER.HealLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.HealUpgradeCost){
            return;
        }
        SAVES.SCORES.devilScore -= SAVES.PLAYER.HealUpgradeCost;
        SAVES.PLAYER.HealUpgradeCost *= 2;
        SAVES.PLAYER.HealLevel++;
        SAVES.PLAYER.HealCost -= 2;
    }
}
