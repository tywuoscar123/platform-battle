import Phaser from "phaser";
import { CST } from "../CST";
import { SAVES } from "../saves";
export default class Cannonball extends Phaser.GameObjects.Sprite{
    /**
     * Construct a Cannonball Object and add it into physical group.
     *
     * Assign physical attributes to object and initial velocity.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param xVelocity - initial x velocity
     * @param yVelocity - initial y velocity
     * @param texture - sprite sheet key
     * @param frame - default frame
     */
    constructor(scene, x, y, xVelocity = 150, yVelocity = 0 , texture = 'cannonball', frame = 0) {
        super(scene, x, y, texture, frame);
        //set sprite properties
        //this.group = group;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.enemyProjectiles.add(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        this.body.setVelocity(xVelocity, yVelocity);

        this.body.mass = 250;

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    update(args) {
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
