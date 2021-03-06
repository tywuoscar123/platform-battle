import Phaser from "phaser";
import { CST } from "../CST";
import { SAVES } from "../saves";

/**
 * A cannonball sprite the will be shoot towards the player
 */
export default class Cannonball extends Phaser.GameObjects.Sprite{
    /**
     * Construct a Cannonball Object and add it into physical group.
     *
     * Assign physical attributes to object and initial velocity.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {number} xVelocity - initial x velocity
     * @param {number} yVelocity - initial y velocity
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, xVelocity = 150, yVelocity = 0 , texture = 'cannonball', frame = 0) {
        super(scene, x, y, texture, frame);
        //set sprite properties
        //this.group = group;

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.enemyProjectiles.add(this);

        //set display property
        this.setOrigin(0.5, 0.5);
        this.body.setCircle(this.displayWidth/2);
        this.setScale(0.5, 0.5);

        //set Object property
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        //set Physical property
        this.body.setVelocity(xVelocity, yVelocity);

        this.body.mass = 250;
        this.DragCoefficient = 0.5;

        this.damage = SAVES.CANNON.CannonBallDamage;

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Save current velocity for collision reaction.
     * @param args - any arguments
     */
    update(args) {
        //log current velocity for collision reaction
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
