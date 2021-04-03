import Phaser from "phaser";
import { CST } from "../CST";

export default class Beartrap extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'beartrap', frame = 0) {
        super(scene, x, y, texture, frame);

        const anims = this.scene.anims;
        anims.create({
            key: 'activate',
            frames: 'beartrap',
            frameRate: 5,
            repeat: -1
        });

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.trapsGroup.add(this);

        this.setOrigin(0.5, 0.5);

        this.setScale(1.5, 1.5);
        this.play("activate", true);
    }

    update(args) {
    }

}
