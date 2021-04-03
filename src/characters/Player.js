import Phaser from "phaser";
import PhysicsCal from "../PhysicsCal";
import {CST} from "../CST";

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

        this.setOrigin(0.5, 0.5);
        //this.body.setDrag(1000, 0);
        this.body.setMaxVelocity(100, 1000);
        this.setScale(0.7, 0.7);
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
        this.body.mass = 50;
        this.DragCoefficient = 1.0;
    }

    update(args) {
        //console.log(this.body.velocity.x);
        //console.log(this.body.velocity.y);
        //jumping will set velocity directly upwards
        if (this.body.blocked.down && (this.keys.w.isDown)) {
            this.body.setVelocityY(-300);
        }

        //calculate final velocity at time
        //Starting from this point, all measurement of distance, velocity and acceleration need to be calculated in meters
        const StepForce = this.body.blocked.down ? 500 : 50;

        let Fx = 0;
        let Fy = 0;

        if (this.keys.a.isDown) {
            Fx += -StepForce;
            this.setFlipX(true);
        } else if (this.keys.d.isDown) {
            Fx += StepForce;
            this.setFlipX(false);
        }

        Fx += PhysicsCal.calculateTotalExternalForceX(this);
        Fy += PhysicsCal.calculateTotalExternalForceY(this);

        //console.log('original: ' + (this.body.velocity.x/CST.CONFIG.PixelPerMeter));
        //console.log('change in Velocity: ' + (Fx / this.body.mass)/60);
        //console.log(Fy);
        let newVelocityX = (this.body.velocity.x/CST.CONFIG.PixelPerMeter) + (Fx / this.body.mass)/60;
        let newVelocityY = (this.body.velocity.y/CST.CONFIG.PixelPerMeter) + (Fy / this.body.mass)/60;

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
}
