import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";

export default class Spike extends Phaser.GameObjects.Sprite{
    /**
     * Construct a Spike Object and add it into physical group. <br/>
     * Assign physical attributes to object.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'spike', frame = 0) {
        super(scene, x, y, texture, frame);

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.collidingTraps.add(this);

        //set display and object properties
        this.setOrigin(0.5, 0.5);
        this.displayWidth = CST.CONFIG.TileSize;
        this.displayHeight = CST.CONFIG.TileSize;
        this.body.setCollideWorldBounds(true, 0.1, 0.1);
        this.body.onWorldBounds = true;

        //uncomment if set lifespan
        /* Sprite lifespan
        this.scene.time.delayedCall(CST.SPIKE.SpikeDuration, function(){
            console.log('destroyed');
            this.destroy();
        }, null, this);
         */

        //set physical properties
        this.body.mass = 1000;
        this.DragCoefficient = 2.0;

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Update the Spike in game loop. <br/>
     * Apply gravity, drag and friction. <br/>
     * Save current velocity for collision reaction.
     *
     * @param args - any arguments
     */
    update(args) {
        //update velocity according to physics
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);

        //update current velocity log
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Destroy this sprite and set physical body to disable
     */
    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }
}
