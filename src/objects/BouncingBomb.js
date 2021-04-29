import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";
import { SAVES } from "../saves";
import explosion from "./explosion";

/**
 * A bomb sprite that will bouncing around in the level and explode when hitting the devil
 */
export default class BouncingBomb extends Phaser.GameObjects.Sprite{
    /**
     * Construct a BouncingBomb Object and add it into physical group.
     *
     * Assign physical attributes to object and initial velocity.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'bomb', frame = 0) {
        super(scene, x, y, texture, frame);

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.collidingTraps.add(this);

        //set display property
        this.setOrigin(0.5, 0.5);
        this.body.setCircle(this.displayWidth/2);
        this.setScale(0.5, 0.5);

        //set Object property
        this.body.setCollideWorldBounds(true, 1, 1);
        this.body.onWorldBounds = true;

        let magnitudeX = Math.pow(this.scene.wizard.x - this.x, 2);
        let magnitudeY = Math.pow(this.scene.wizard.y - this.y , 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (this.scene.wizard.x - this.x)/magnitude * SAVES.BOMB.BombSpeed;
        let Vy = (this.scene.wizard.y - this.y)/magnitude * SAVES.BOMB.BombSpeed;
        this.body.setVelocity(Vx, Vy);

        //set Physical property
        this.body.mass = 500;
        this.DragCoefficient = 0.05;

        this.damage = SAVES.BOMB.BombDamage;

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Update the BouncingBomb in game loop. <br/>
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

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Destroy this sprite and set physical body to disable
     */
    destroy() {
        if (this.scene !== undefined){
            new explosion(this.scene, this.x, this.y);
        }
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }

}
