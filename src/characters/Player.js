import Phaser from "phaser";
import PhysicsCal from "../PhysicsCal";
import {CST} from "../CST";
import MagicOrb from "../objects/MagicOrb";
import {SAVES} from "../saves";

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

        //add player to scene, create body
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.7, 0.7);
        this.play('Idle', true);

        this.body.setMaxVelocity(100, 1000);
        this.body.setBounce(0.1, 0.1);
        this.body.setCollideWorldBounds(true);

        //additional attributes for player
        this.hp = 3;
        this.remainingBullet = SAVES.PLAYER.InitialBullet;
        this.body.mass = 50;
        this.DragCoefficient = 1.0;


        //get the keyboard input for controlling player
        const { W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            w: W,
            a: A,
            d: D,
            space: 'SPACE',
        });
    }

    update(args) {
        //console.log(this.body.velocity.x);
        //console.log(this.body.velocity.y);
        //jumping will set velocity directly upwards
        if (Phaser.Input. Keyboard.JustDown(this.keys.space) && this.remainingBullet > 0){
            let spawnDistance = this.displayWidth / 2;
            if (!this.flipX){
                new MagicOrb(this.scene, this.x + spawnDistance, this.y, 1);
            }else{
                new MagicOrb(this.scene, this.x - spawnDistance, this.y, -1);
            }
            this.remainingBullet -= 1;
        }

        if (this.body.blocked.down && (this.keys.w.isDown)) {
            this.body.setVelocityY(-350);
        }

        //calculate final velocity at time
        //Starting from this point, all measurement of distance, velocity and acceleration need to be calculated in meters
        const StepForce = this.body.blocked.down ? 1000 : 100;

        let Fx = 0;
        let Fy = 0;

        if (this.keys.a.isDown) {
            Fx += -StepForce;
            this.setFlipX(true);
        } else if (this.keys.d.isDown) {
            Fx += StepForce;
            this.setFlipX(false);
        }

        //console.log('original: ' + (this.body.velocity.x/CST.CONFIG.PixelPerMeter));
        //console.log('change in Velocity: ' + (Fx / this.body.mass)/60);
        //console.log(Fy);
        let newVelocityX = PhysicsCal.calculateVelocityX(this, Fx);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, Fy);

        //console.log(newVelocityX * CST.CONFIG.PixelPerMeter);
        //console.log(Math.floor(newVelocityX * CST.CONFIG.PixelPerMeter));
        //console.log(newVelocityY);

        //console.log(newVelocityX*CST.CONFIG.PixelPerMeter);
        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);
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

    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }
}
