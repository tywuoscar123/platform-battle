import { CST } from "../CST";
import Utils from "../Utils";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
        this.utilfunctions = new Utils(this);
    }
    init(){
    }

    preload() {

    }

    create() {
        //get screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //add title
        this.add.text(screenCenterX, screenCenterY - 100, "Platform Battle: Devil vs Hero", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //add play button
        this.utilfunctions.createTextButton(screenCenterX,
            screenCenterY+100,
            "Play",
            { font: "65px Arial", fill: "#ff0044"},
            "#ff0044",
            "#ffffff",
            function() {
                this.scene.start(CST.SCENES.GAME);
            });
    }
}