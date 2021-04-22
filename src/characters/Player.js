import Phaser from "phaser";
import PhysicsCal from "../PhysicsCal";
import {CST} from "../CST";
import MagicOrb from "../objects/MagicOrb";
import {SAVES} from "../saves";

export default class Player extends Phaser.GameObjects.Sprite {
    /**
     * Construct a player sprite add player into physics group.
     *
     * Assign physical attributes to player.
     *
     * Constructor
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'EvilWizard_Idle', frame = 0) {
        super(scene, x, y, texture, frame);

        //flag indicating player is frozen
        this.freeze = false;

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

        //set display properties
        this.setOrigin(0.5, 0.5);
        this.setScale(0.7, 0.7);
        this.play('Idle', true);

        //set physical properties
        this.body.setMaxVelocity(100, 1000);
        this.body.setBounce(0.1, 0.1);
        this.body.setCollideWorldBounds(true);

        //custom physical properties
        this.body.mass = 50;
        this.DragCoefficient = 1.0;

        //custom attributes for player
        this.hp = 3;
        this.remainingBullet = SAVES.PLAYER.InitialBullet;
        this.jumpSpeed = SAVES.PLAYER.JumpSpeed;
        this.groundRunningForce = SAVES.PLAYER.GroundRunningForce;
        this.airRunningForce = SAVES.PLAYER.AirRunningForce;

        this.mana = SAVES.PLAYER.Mana;

        this.skillOneAvail = true;
        this.skillTwoAvail = true;
        this.skillThreeAvail = true;
        this.skillFourAvail = true;

        //get the keyboard input for controlling player
        const { W, A, D } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.scene.input.keyboard.addKeys({
            w: W,
            a: A,
            d: D,
            space: 'SPACE',
            one: 'ONE',
            two: 'TWO',
            three: 'THREE',
            four: 'FOUR',
        });
    }

    /**
     * Update player in game loop.
     *
     * Check control and apply gravity, drag and friction.
     *
     * @param args - any
     */
    update(args) {
        //console.log(this.body.velocity.x);
        //console.log(this.body.velocity.y);
        if (Phaser.Input. Keyboard.JustDown(this.keys.one)){
            this.superJump();
        }

        //Check attack button pause, shot if bullet remains
        if (Phaser.Input. Keyboard.JustDown(this.keys.space) && this.remainingBullet > 0){
            let spawnDistance = this.displayWidth / 2;
            if (!this.flipX){
                new MagicOrb(this.scene, this.x + spawnDistance, this.y, 1);
            }else{
                new MagicOrb(this.scene, this.x - spawnDistance, this.y, -1);
            }
            this.remainingBullet -= 1;
        }


        //calculate final velocity at time
        const StepForce = this.body.blocked.down ? this.groundRunningForce : this.airRunningForce;

        let Fx = 0;
        let Fy = 0;

        //allowing control only if player is not freezed
        if(!this.freeze){
            //jump action
            if (this.body.blocked.down && (this.keys.w.isDown)) {
                this.body.setVelocityY(-this.jumpSpeed);
            }

            //Starting from this point, all measurement of distance, velocity and acceleration need to be calculated in meters
            // Force in Newton
            //moving left and right, set corresponding walking force
            if (this.keys.a.isDown) {
                Fx += -StepForce;
                this.setFlipX(true);
            } else if (this.keys.d.isDown) {
                Fx += StepForce;
                this.setFlipX(false);
            }
        }

        //console.log('original: ' + (this.body.velocity.x/CST.CONFIG.PixelPerMeter));
        //console.log('change in Velocity: ' + (Fx / this.body.mass)/60);
        //console.log(Fy);

        //Calculate new velocity using object
        let newVelocityX = PhysicsCal.calculateVelocityX(this, Fx);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, Fy);

        //console.log(newVelocityX * CST.CONFIG.PixelPerMeter);
        //console.log(Math.floor(newVelocityX * CST.CONFIG.PixelPerMeter));
        //console.log(newVelocityY);

        // set new velocity after physical calculation
        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);

        /*
        set corresponding animation according to velocity
         */
        if (this.body.velocity.x  < 1){
            this.play('Run', true);
        }else{
            this.play('Idle', true);
        }
    }

    /**
     * Reduce hp of player, player body flash red
     * @param {number} number - damage to be taken
     */
    takeDamage(number){
        this.tint = 0xff0000;
        this.scene.time.delayedCall(200, function(){
            this.clearTint();
        }, null, this);
        this.hp -= number;
    }

    /**
     * Reset player hp to full
     */
    resetStatus(){
        this.hp = 3;
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

    /**
     * Freeze (i.e. not allow control of) player for a fixed duration
     */
    freezePlayer(){
        this.freeze = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.freezeEvent = this.scene.time.delayedCall(SAVES.BEARTRAP.BearTrapFreezeTime, ()=>{
            this.freeze = false;
        }, this);
    }

    /**
     * Call when player activate sill one
     */
    superJump(){
        if (!this.skillOneAvail || this.mana < SAVES.PLAYER.SkillOneCost){
            return;
        }

        this.jumpSpeed *= 2;
        this.mana -= SAVES.PLAYER.SkillOneCost;
        this.skillOneAvail = false;

        this.superJumpEvent = this.scene.time.delayedCall(SAVES.PLAYER.SkillOneCoolDown, ()=>{
            this.skillOneAvail = true;
            this.jumpSpeed /= 2;
        }, this);
    }
}
