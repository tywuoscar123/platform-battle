import { CST } from "../CST";
export default class EndScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.END
        })
    }
    init(data){
        this.winner = data.winner;
        this.heroScore =  data.heroScore;
        this.devilScore =  data.devilScore;
    }

    preload() {

    }

    create() {
        //show results
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        //const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.add.text(screenCenterX, 150, "Result", { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);

        this.add.text(screenCenterX, 250, "Winner is " + this.winner , { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(screenCenterX, 350, "heroScore = " + this.heroScore, { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
        this.add.text(screenCenterX, 450, "devilScore = " + this.devilScore, { font: "65px Arial", fill: "#ffffff" }).setOrigin(0.5);
    }

    update(time, delta) {
        //go back to menu screen if clicked
        if (this.input.activePointer.isDown){
            this.scene.start(CST.SCENES.MENU);
        }
    }
}