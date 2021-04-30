import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";
import {SAVES} from "../saves";

/**
 * A mana Potion sprite that can be collected by devil and recover mana for using skills
 */
export default class manaPotion extends Phaser.GameObjects.Sprite{
    /**
     * Construct a manaPotion Object and add it into physical group. <br/>
     * Assign physical attributes to object.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'manaPotion', frame = 0) {
        super(scene, x, y, texture, frame);

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.collectables.add(this);

        //set display and object property
        this.setOrigin(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        //set physical property
        this.body.mass = 20;
        this.DragCoefficient = 0.5;

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Update the manaPotion in game loop. <br/>
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
