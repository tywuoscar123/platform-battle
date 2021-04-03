import Phaser from "phaser";
import { CST } from "../CST";

export default class Cannonball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, texture = 'cannonball', frame = 0, xVelocity = 150, yVelocity = 0) {
        super(scene, x, y, texture, frame);
        //set sprite properties
        //this.group = group;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.enemyProjectiles.add(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);

        this.body.setVelocity(direction * xVelocity, yVelocity);
    }

    update(args) {
    }

    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }

}
