import Phaser from "phaser";
import { CST } from "../CST";
import PhysicsCal from "../PhysicsCal";
import { SAVES } from "../saves";

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

        //set sprite properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.collidingTraps.add(this);

        this.setOrigin(0.5, 0.5);
        this.displayHeight = 32;
        this.displayWidth = 32;

        this.body.setCollideWorldBounds(true, 1, 1);

        let magnitudeX = Math.pow(this.scene.wizard.x - this.x, 2);
        let magnitudeY = Math.pow(this.scene.wizard.y - this.y , 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (this.scene.wizard.x - this.x)/magnitude * SAVES.BOMB.BombSpeed;
        let Vy = (this.scene.wizard.y - this.y)/magnitude * SAVES.BOMB.BombSpeed;
        this.body.setVelocity(Vx, Vy);

        this.body.mass = 500;
        this.DragCoefficient = 0.05;

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    update(args) {
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);

        //save velocity if not colliding
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }

}
