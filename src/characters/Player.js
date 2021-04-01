import Phaser from "phaser";

export default class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        //create animations for player
        const anims = scene.anims;
        anims.create({
            key: 'Idle',
            frames: 'EvilWizard_Idle',
            frameRate: 6,
            repeat: -1
        });

        anims.create({
            key: 'Run',
            frames: 'EvilWizard_Run',
            frameRate: 8,
            repeat: -1
        });

        //set player properties
        this.sprite = scene.physics.add.sprite(x, y, 'EvilWizard_Idle', 0);

        this.sprite.setDrag(1000, 0);
        this.sprite.setMaxVelocity(100, 300);
        this.sprite.setScale(0.5, 0.5);
        this.sprite.play('Idle', true);
        this.sprite.setBounce(0.1);
        this.sprite.setCollideWorldBounds(true);

        //get the keyboard input for controlling player
        const { W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys({
            w: W,
            a: A,
            d: D
        });

        //additional attributes for player
        this.hp = 3;
    }

    update() {
        //update player movement according to key strokes
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

        //possible implementation for gravity
        /*
        if (!sprite.body.blocked.down){
            sprite.setAccelerationY(500);
        }*/

        if (sprite.body.velocity.x !== 0){
            sprite.play('Run', true);
        }else{
            sprite.play('Idle', true);
        }
    }

    takeDamage(number){
        this.sprite.tint = 0xff0000;
        this.scene.time.delayedCall(200, function(){
            this.sprite.clearTint();
        }, null, this);
        this.hp -= number;
    }

    resetStatus(){
        this.hp = 3;
    }

    destroy() {
        this.sprite.destroy();
    }

}
