import { CST } from "../CST";
import {SAVES} from "../saves";

/**
 * Scene for showing level result
 */
export default class EndScene extends Phaser.Scene {
    /**
     * Set the key of the scene
     */
    constructor() {
        super({
            key: CST.SCENES.END
        })
    }

    /**
     * Process data from GameScene
     * @param data
     */
    init(data){
        this.winner = data.winner;
        this.heroScore =  data.heroScore;
        this.devilScore =  data.devilScore;
        this.level = data.level;
    }

    preload() {

    }

    /**
     * show winner and players score
     */
    create() {
        //show results
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        //const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(screenCenterX, 150, "Result", { font: "75px Arial", fill: "#ffffff" }).setOrigin(0.5);

        this.add.text(screenCenterX, 250, this.winner + " Wins!", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(screenCenterX, 450, "Devil's Score = " + this.devilScore, { font: "45px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(screenCenterX, 350, "Hero's Score = " + this.heroScore, { font: "45px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(screenCenterX, 600, "Left click anywhere to continue", { font: "20px Arial", fill: "#ffffff" }).setOrigin(0.5);
        if (this.level >= SAVES.PROGRESS.GameLevel){
            SAVES.PROGRESS.GameLevel = this.level + 1;
        }

        SAVES.PROGRESS.StagesWinner[this.level - 1] = this.winner;
    }

    /**
     * Go back to menu scene if clicked
     *
     * @param time
     * @param delta
     */
    update(time, delta) {
        //go back to menu screen if clicked
        if (this.input.activePointer.isDown){
            this.scene.start(CST.SCENES.LEVELS);
        }
    }
}