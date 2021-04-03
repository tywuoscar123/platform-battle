import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";

export default class Spike extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'spike', frame = 0) {
        super(scene, x, y, texture, frame);

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.displayWidth = CST.CONFIG.TileSize;
        this.displayHeight = CST.CONFIG.TileSize;

        //uncomment if set lifespan
        /* Sprite lifespan
        this.scene.time.delayedCall(CST.SPIKE.SpikeDuration, function(){
            console.log('destroyed');
            this.destroy();
        }, null, this);
         */

        this.body.mass = 1000;
        this.DragCoefficient = 2.0;
    }

    setBodyProperty(){
        this.body.setCollideWorldBounds(true, 0.1, 0.1);
    }

    update(args) {
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);
    }

}
