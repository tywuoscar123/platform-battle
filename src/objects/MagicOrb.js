import Phaser from "phaser";
import { CST } from "../CST";

export default class MagicOrb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'magicOrb', frame = 0) {
        super(scene, x, y, texture, frame);

        //set sprite properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.2, 0.2);
        this.body.setCollideWorldBounds(true);


    }

    update(args) {
        let Fx = 0;
        let Fy = 0;
    }

}
