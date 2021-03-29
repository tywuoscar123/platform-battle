import { CST } from "../CST";
import {game} from "../index";
import {saves} from "../saves";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        })
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
        let text = this.add.text(screenCenterX, screenCenterY+100, "Play", { font: "65px Arial", fill: "#ff0044"}).setOrigin(0.5);
        text.setInteractive(new Phaser.Geom.Rectangle(0, 0, text.width, text.height), Phaser.Geom.Rectangle.Contains);
        text.on('pointerover', function() {
            this.setFill("#ffffff");
        });
        text.on('pointerout', function() {
            this.setFill("#ff0044");
        });
        text.on('pointerdown', function() {
            this.scene.start(CST.SCENES.GAME);
        }, this);
    }
}