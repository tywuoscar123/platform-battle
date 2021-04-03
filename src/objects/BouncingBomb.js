import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";

export default class BouncingBomb extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'bomb', frame = 0) {
        super(scene, x, y, texture, frame);

        //set sprite properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);

        this.body.mass = 500;
        this.DragCoefficient = 0.05;
    }

    setBodyProperty(){
        this.body.setCollideWorldBounds(true, 1, 1);
    }

    update(args) {
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);
    }

}
