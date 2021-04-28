import Phaser from "phaser";
import { CST } from "../CST";

export default class MagicOrb extends Phaser.GameObjects.Sprite{
    /**
     * Construct a MagicOrb as the player attack.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {number} direction - shooting direction, -1 is left, 1 is right
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, direction, texture = 'magicOrb', frame = 0) {
        super(scene, x, y, texture, frame);

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.playerProjectiles.add(this);

        //set display property
        this.setOrigin(0.5, 0.5);
        this.body.setCircle(this.displayWidth/2);
        this.setScale(0.2, 0.2);

        //set physical property
        this.body.mass = 0;
        this.DragCoefficient = 0.5;

        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setVelocity(direction * 200, 0);

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Save magic orb velocity
     * @param args
     */
    update(args) {
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
