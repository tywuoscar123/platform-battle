import Phaser from "phaser";
import { CST } from "../CST";

export default class Cannonball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'cannonball', frame = 0, xVelocity = 150, yVelocity = 0) {
        super(scene, x, y, texture, frame);
        //set sprite properties
        //this.group = group;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.trapsGroup.add(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.setVelocity(xVelocity, yVelocity);

    }

    update(args) {
        let Fx = 0;
        let Fy = 0;
    }

}
