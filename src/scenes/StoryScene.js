import Phaser from 'phaser';
import { CST } from "../CST";
import Utils from "../Utils";

/**
 * Scene for displaying story
 */
export default class StoryScene extends Phaser.Scene {
    constructor(){
        super({
            key: CST.SCENES.STORY
        });
        this.utilfunctions = new Utils(this);
    }

    /**
     * Pass in title and content of story
     * @param data
     */
    init(data){
        this.title = data.title;
        this.content = data.content;
    }

    preload(){
    }

    /**
     * Create a story scene by accepting title and content from external call
     */
    create() {
        //get center screen coordinate
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        let originalColor = "#00ff00";
        let textColor =  "#00ff00";
        if (this.title.includes("Devil")){
            textColor = "#ff0000";
        }

        let overColor = "#ffffff";

        //add title
        let title = this.add.text(screenCenterX, 80, this.title, { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        //create a scrollable text box by dragging
        let graphics = this.make.graphics({});
        graphics.fillRect(300, 160, 800, 400);

        let mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

        let text = this.add.text(300, 160, this.content, { font: "24px Arial", color: textColor, wordWrap: { width: 800 } }).setOrigin(0);

        text.setMask(mask);

        let zone = this.add.zone(300, 160, 800, 400).setOrigin(0).setInteractive();

        zone.on('pointermove', function (pointer) {

            if (pointer.isDown)
            {
                text.y += (pointer.velocity.y / 10);

                text.y = Phaser.Math.Clamp(text.y, -400, 300);
            }

        });

        let instruction = this.add.text(600, 580, "click and drag text to scroll", { font: "24px Arial", color: "#ffffff", wordWrap: { width: 800 } }).setOrigin(0);

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
            this.scene.launch(CST.SCENES.LEVELS);
            this.scene.stop();
        }, this);
    }
}
