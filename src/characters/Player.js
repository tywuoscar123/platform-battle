import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture = 'EvilWizard_Idle', frame = 0) {
        super(scene, x, y, texture, frame);

        //create animations for player
        const anims = this.scene.anims;
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
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setDrag(1000, 0);
        this.body.setMaxVelocity(100, 300);
        this.setScale(0.5, 0.5);
        this.play('Idle', true);
        this.body.setBounce(0.1, 0.1);
        this.body.setCollideWorldBounds(true);

        //get the keyboard input for controlling player
        const { W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            w: W,
            a: A,
            d: D
        });

        //additional attributes for player
        this.hp = 3;
    }

    update(args) {
        //update player movement according to key strokes
        const keys= this.keys;

        const accel = this.body.blocked.down ? 200 : 70;

        if (keys.a.isDown) {
            this.body.setAccelerationX(-accel);
            this.setFlipX(true);
        } else if (keys.d.isDown) {
            this.body.setAccelerationX(accel);
            this.setFlipX(false);
        } else {
            this.body.setAccelerationX(0);
        }

        if (this.body.blocked.down && (keys.w.isDown)) {
            this.body.setVelocityY(-300);
        }

        //possible implementation for gravity
        /*
        if (!sprite.body.blocked.down){
            sprite.setAccelerationY(500);
        }*/

        if (this.body.velocity.x !== 0){
            this.play('Run', true);
        }else{
            this.play('Idle', true);
        }
    }

    takeDamage(number){
        this.tint = 0xff0000;
        this.scene.time.delayedCall(200, function(){
            this.clearTint();
        }, null, this);
        this.hp -= number;
    }

    resetStatus(){
        this.hp = 3;
    }
}
