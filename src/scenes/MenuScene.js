import { CST } from "../CST";
import Utils from "../Utils";

/**
 * Starting Scene for the game. Contain buttons to go to different sub-menus
 */
export default class MenuScene extends Phaser.Scene {
    /**
     * Set key and properties of scene. <br/>
     * Create util object for using utility functions
     */
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
        this.utilfunctions = new Utils(this);
    }
    init(){
    }

    preload() {
        this.load.image('ruinCastle', 'assets/menuBG/ruinCastle.png');
    }

    /**
     * Create main menu, add text and buttons
     */
    create() {
        //get screen center coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add background image
        let BG = this.add.image(screenCenterX,screenCenterY,'ruinCastle');
        BG.displayWidth = this.sys.canvas.width;
        BG.displayHeight = this.sys.canvas.height;

        let buttonOffsetY = 60;
        let menuY = screenCenterY - 50;
        let originalColor = "#00ff00";
        let overColor = "#ffffff";

        //add title
        this.add.text(screenCenterX, screenCenterY - 180, "Platform Battle: Devil vs Hero", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        let buttonStyle = { font: "35px Arial", fill:originalColor};

        //add play button for going to select level
        let LevelSelect = this.utilfunctions.createTextButton(
            screenCenterX,
            menuY+buttonOffsetY,
            "Play",
            buttonStyle,
            originalColor,
            overColor);
        LevelSelect.on('pointerdown', function(){
            this.scene.start(CST.SCENES.LEVELS);
            this.scene.stop();
        }, this);

        //add buttons to skill tree screen
        let skillButton = this.utilfunctions.createTextButton(
            screenCenterX,
            menuY + buttonOffsetY*2,
            "Skill Trees",
            buttonStyle,
            originalColor,
            overColor);
        skillButton.on('pointerdown', function(){
            this.scene.start(CST.SCENES.SKILLTREE);
            this.scene.stop();
        }, this);

        //add buttons to level up screen
        let settingButton = this.utilfunctions.createTextButton(
            screenCenterX,
            menuY + buttonOffsetY*3,
            "Settings",
            buttonStyle,
            originalColor,
            overColor);
        settingButton.on('pointerdown', function(){
            this.scene.start(CST.SCENES.SETTINGS);
            this.scene.stop();
        }, this);

        let tutorialButton = this.utilfunctions.createTextButton(
            screenCenterX,
            menuY + buttonOffsetY*4,
            "How to Play",
            buttonStyle,
            originalColor,
            overColor);
        tutorialButton.on('pointerdown', function(){
            this.scene.start(CST.SCENES.TUTORIAL);
            this.scene.stop();
        }, this);
    }
}