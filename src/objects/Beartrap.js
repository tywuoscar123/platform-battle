import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";

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
        this.scene.overlappingTraps.add(this);

        this.setOrigin(0.5, 0.5);

        this.setScale(1.5, 1.5);
        this.play("activate", true);

        this.body.mass = 1000;
        this.DragCoefficient = 1.3;
    }

    update(args) {
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);
    }

    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }
}
