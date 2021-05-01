import Phaser from 'phaser';
import { CST } from "../CST";
import {SAVES} from "../saves";
import Utils from "../Utils";

/**
 * Scene for upgrading devil skills
 */
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
        //load audio
        this.load.audio("levelUpSfx", "assets/Sfx/levelUpSfx.mp3");
        this.load.image('ruin', 'assets/menuBG/ruin.png');

        //load skill icons
        this.load.image("levelUpIcon", "assets/SkillIcons/levelUp.png");
        this.load.image("superJumpIcon", "assets/SkillIcons/superJump.png");
        this.load.image("superSpeedIcon", "assets/SkillIcons/superSpeed.png");
        this.load.image("healIcon", "assets/SkillIcons/heal.png");
        this.load.image("reloadIcon","assets/SkillIcons/reload.png"); 
    }

    /**
     * Create Devil Skills scene for upgrading devil skills, add buttons
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
        this.upgradePoints = this.add.text(screenCenterX - 220  , screenCenterY - 200, "Upgrade Points: " + SAVES.SCORES.devilScore, { font: "15px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //----PLAYER LEVEL----
        //add text for to indicate current skill level
        this.playerLevel = this.add.text(screenCenterX - 80, screenCenterY - 160   , "Player level " + SAVES.PLAYER.PlayerLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let playerUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 160,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            playerUpgradeButton.on('pointerdown', function(){
            //call level up function for player
            this.playerLevelUp();
            }, this);

        //description for player level up
        this.playerLevelDesc = this.add.text(screenCenterX -30, screenCenterY - 120, "Increases base mana and HP", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add level up icon, reduce scale
        this.levelUpIcon = this.add.image(screenCenterX - 310, screenCenterY - 140, "levelUpIcon");
        this.levelUpIcon.setScale(0.8);

        //----SUPER JUMP----
        //add text for to indicate current skill level
        this.superJumpLevel = this.add.text(screenCenterX - 120, screenCenterY - 60, "Super Jump level " + SAVES.PLAYER.SuperJumpLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade spike button
        let superJumpUpgradeButton = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY - 60,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            superJumpUpgradeButton.on('pointerdown', function(){
            //call level up function for super jump
            this.superJumpLevelUp();
            }, this);
        
        //description for superJump
        this.SuperJumpDesc = this.add.text(screenCenterX - 20, screenCenterY - 20, "Massive boost in jump height for a period of time", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);    
        //add level up icon, reduce scale
        this.levelUpIcon = this.add.image(screenCenterX - 310, screenCenterY - 40, "superJumpIcon");
        this.levelUpIcon.setScale(0.8);


        //----SUPER SPEED----
        //level indicator
        this.superSpeedLevel = this.add.text(screenCenterX - 120, screenCenterY + 40, "Super Speed level " + SAVES.PLAYER.SuperSpeedLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let superSpeedUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY + 40,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            superSpeedUpgrade.on('pointerdown', function(){
            //call level up function for super speed
            this.superSpeedLevelUp();
            }, this);

        //super speed desc
        this.SuperSpeedDesc = this.add.text(screenCenterX - 20, screenCenterY + 80, "Massive boost in speed for a period of time", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);    
        //add superSpeed icon, reduce scale
        this.superSpeedIcon = this.add.image(screenCenterX - 310, screenCenterY +60, "superSpeedIcon");
        this.superSpeedIcon.setScale(0.8);
        

        //----RELOAD----
        this.reloadLevel = this.add.text(screenCenterX - 70, screenCenterY + 140, "Reload level " + SAVES.PLAYER.ReloadLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let reloadUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY + 140,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            reloadUpgrade.on('pointerdown', function(){
            //call level up function for reload
            this.reloadLevelUp();
            }, this);
        //reload desc
        this.reloadDesc = this.add.text(screenCenterX - 20, screenCenterY + 180, "Replenishes magic orbs", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);    
        //add superSpeed icon, reduce scale
        this.reloadIcon = this.add.image(screenCenterX - 310, screenCenterY + 160, "reloadIcon");
        this.reloadIcon.setScale(0.8);

        //----HEAL----
        this.healLevel = this.add.text(screenCenterX - 60, screenCenterY + 240, "Heal " + SAVES.PLAYER.HealLevel + " - ", { font: "30px Arial", fill: "#ffffff" }).setOrigin(0.5);
        //add upgrade button
        let healUpgrade = this.utilfunctions.createTextButton(screenCenterX + 110,
            screenCenterY + 240,
            "Upgrade",
            { font: "30px Arial", fill: originalColor},
            originalColor,
            overColor);
            healUpgrade.on('pointerdown', function(){
            //call level up function for heal
            this.healLevelUp();
            }, this);
        //heal Desc
        this.healDesc = this.add.text(screenCenterX - 20, screenCenterY + 280, "Heals player", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);    
        //add superSpeed icon, reduce scale
        this.healIcon = this.add.image(screenCenterX - 310, screenCenterY + 260, "healIcon");
        this.healIcon.setScale(0.8);


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
        this.playerLevel.setText("Player level " + SAVES.PLAYER.PlayerLevel + " - ");
        this.superJumpLevel.setText("Super Jump level " + SAVES.PLAYER.SuperJumpLevel + " - ");
        this.superSpeedLevel.setText("Super Speed level " + SAVES.PLAYER.SuperSpeedLevel + " - ");
        this.reloadLevel.setText("Reload level " + SAVES.PLAYER.ReloadLevel + " - ");
        this.healLevel.setText("Heal level " + SAVES.PLAYER.HealLevel + " - ");
        this.upgradePoints.setText("Upgrade Points: " + SAVES.SCORES.devilScore);
    }

    /**
     * functions to upgrade devil stats
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and increase upgrade cost by 10
     */
     playerLevelUp(){
        if(SAVES.PLAYER.PlayerLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.PlayerUpgradeCost){
            return;
        }
        this.levelUpSfx.play();

        SAVES.SCORES.devilScore -= SAVES.PLAYER.PlayerUpgradeCost;
        SAVES.PLAYER.PlayerUpgradeCost += 10;
        SAVES.PLAYER.PlayerLevel++;

        SAVES.PLAYER.InitialHP += 10;
        SAVES.PLAYER.InitialBullet += 1;
        SAVES.PLAYER.Mana += 10; 
    }

    /**
     * functions to upgrade devil superJump skills
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and increase upgrade cost by 10
     */
     superJumpLevelUp(){
        if(SAVES.PLAYER.SuperJumpLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.SuperJumpUpgradeCost){
            return;
        }
        this.levelUpSfx.play();

        SAVES.SCORES.devilScore -= SAVES.PLAYER.SuperJumpUpgradeCost;
        SAVES.PLAYER.SuperJumpUpgradeCost += 10;
        SAVES.PLAYER.SuperJumpLevel++;
        SAVES.PLAYER.SuperJumpMultiplier += 0.2;
        SAVES.PLAYER.SuperJumpDuration += 250;
        //add condition to disable upgrade button when level is max?
    }

    /**
     * functions to upgrade devil superSpeed skills
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and increase upgrade cost by 10
     */
    superSpeedLevelUp(){
        if(SAVES.PLAYER.SuperSpeedLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.SuperSpeedUpgradeCost){
            return;
        }
        this.levelUpSfx.play();

        SAVES.SCORES.devilScore -= SAVES.PLAYER.SuperSpeedUpgradeCost;
        SAVES.PLAYER.SuperSpeedUpgradeCost += 10;
        SAVES.PLAYER.SuperSpeedLevel++;
        SAVES.PLAYER.SuperSpeedDuration += 100;
        SAVES.PLAYER.SuperSpeedMultiplier += 0.2;
    }

    /**
     * functions to upgrade devil reload bullet skills
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and increase upgrade cost by 10
     */
    reloadLevelUp(){
        if(SAVES.PLAYER.ReloadLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.ReloadUpgradeCost){
            return;
        }
        this.levelUpSfx.play();

        SAVES.SCORES.devilScore -= SAVES.PLAYER.ReloadUpgradeCost;
        SAVES.PLAYER.ReloadUpgradeCost += 10;
        SAVES.PLAYER.ReloadLevel++;
        SAVES.PLAYER.ReloadCost -= 2;
    }

    /**
     * functions to upgrade devil heal skills
     * IF skill is in max level or devil does not have enough points to upgrade, return
     * else upgrade skill attributes and increase upgrade cost by 10
     */
    healLevelUp(){
        if(SAVES.PLAYER.HealLevel >=  CST.CONFIG.MaxSkillLevel || SAVES.SCORES.devilScore < SAVES.PLAYER.HealUpgradeCost){
            return;
        }
        this.levelUpSfx.play();

        SAVES.SCORES.devilScore -= SAVES.PLAYER.HealUpgradeCost;
        SAVES.PLAYER.HealUpgradeCost += 10;
        SAVES.PLAYER.HealLevel++;
        SAVES.PLAYER.HealCost -= 2;
    }
}
