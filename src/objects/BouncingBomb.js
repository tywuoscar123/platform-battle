import Phaser from "phaser";
import { CST } from "../CST";

export default class BouncingBomb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'bomb', frame = 0) {
        super(scene, x, y, texture, frame);

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);


    }

    update(args) {
    }

}
