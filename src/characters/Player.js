import Phaser from "phaser";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        const anims = scene.anims;
        anims.create({
            key: 'Idle',
            frames: 'EvilWizard',
            frameRate: 8,
            repeat: -1
        });

        this.sprite = scene.physics.add.sprite(x, y, "EvilWizard", 0);

        this.sprite.setDrag(1000, 0);
        this.sprite.setMaxVelocity(100, 300);
        this.sprite.setScale(0.5, 0.5);
        this.sprite.play('Idle');
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);

        const { W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            w: W,
            a: A,
            d: D
        });
    }

    update() {
        const keys= this.keys;
        const sprite = this.sprite;

        const accel = sprite.body.blocked.down ? 200 : 70;

        if (keys.a.isDown) {
            sprite.setAccelerationX(-accel);
            sprite.setFlipX(true);
        } else if (keys.d.isDown) {
            sprite.setAccelerationX(accel);
            sprite.setFlipX(false);
        } else {
            sprite.setAccelerationX(0);
        }

        if (sprite.body.blocked.down && (keys.w.isDown)) {
            sprite.setVelocityY(-300);
        }

    }

    destroy() {
        this.sprite.destroy();
    }

}
