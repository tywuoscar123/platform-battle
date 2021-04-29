import Phaser from "phaser";

export default class explosion extends Phaser.GameObjects.Sprite{
    /**
     * Construct a explosion effect without any physics
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'explosion', frame = 0) {
        super(scene, x, y, texture, frame);

        const anims = this.scene.anims;
        anims.create({
            key: 'explosion',
            frames: 'explosion',
            frameRate: 17,
            repeat: 0
        });

        //add to physical group
        this.scene.add.existing(this);

        //set display property
        this.setOrigin(0.5, 0.5);

        this.play('explosion', true);

        this.scene.time.delayedCall(1000, () => {
            this.destroy();
        }, this)
    }

    /**
     * Destroy this sprite
     */
    destroy() {
        super.destroy();
    }

}
