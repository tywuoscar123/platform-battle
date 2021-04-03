import Phaser from "phaser";
import { CST } from "../CST";

export default class MagicOrb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, texture = 'magicOrb', frame = 0) {
        super(scene, x, y, texture, frame);

        //set sprite properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.playerProjectiles.add(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.2, 0.2);
        this.body.setCollideWorldBounds(true);
        this.body.setVelocity(direction * 200, 0);

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
