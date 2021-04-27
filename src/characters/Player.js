import Phaser from "phaser";
import PhysicsCal from "../PhysicsCal";
import {CST} from "../CST";
import MagicOrb from "../objects/MagicOrb";
import {SAVES} from "../saves";

export default class Player extends Phaser.GameObjects.Sprite {
    /**
     * Construct a player sprite add player into physics group.<br/>
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
        this.body.setMaxVelocity(SAVES.PLAYER.MaxVx, SAVES.PLAYER.MaxVy);
        this.body.setBounce(0.1, 0.1);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        //custom physical properties
        this.body.mass = 50;
        this.DragCoefficient = 1.0;

        //custom attributes for player
        this.hp = SAVES.PLAYER.InitialHP;
        this.remainingBullet = SAVES.PLAYER.InitialBullet;
        this.jumpSpeed = SAVES.PLAYER.JumpSpeed;
        this.groundRunningForce = SAVES.PLAYER.GroundRunningForce;
        this.airRunningForce = SAVES.PLAYER.AirRunningForce;

        this.mana = SAVES.PLAYER.Mana;

        this.superJumpAvail = true;
        this.superSpeedAvail = true;
        this.reloadAvail = true;
        this.healAvail = true;

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

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Update player in game loop.<br/>
     * Check control and apply gravity, drag and friction.
     *
     * @param args - any arguments
     */
    update(args) {
        //console.log(this.body.velocity.x);
        //console.log(this.body.velocity.y);
        //map skill buttons
        if (Phaser.Input. Keyboard.JustDown(this.keys.one)){
            this.superJump();
        }
        if (Phaser.Input. Keyboard.JustDown(this.keys.two)){
            this.superSpeed();
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys.three)){
            this.reload();
        }
        if(Phaser.Input.Keyboard.JustDown(this.keys.four)){
            this.heal();
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
            //moving left and right, set corresponding walking force, which will be affected by coefficient of friction of the scene
            if (this.keys.a.isDown) {
                Fx += -StepForce * Math.min(this.scene.frictionCoeffecient*2 / 0.2, 1);
                this.setFlipX(true);
            } else if (this.keys.d.isDown) {
                Fx += StepForce * Math.min(this.scene.frictionCoeffecient*2 / 0.2, 1);
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
        if (this.body.velocity.x  !== 0){
            this.play('Run', true);
        }else{
            this.play('Idle', true);
        }

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Reduce hp of player, player body flash red
     * @param {number} number - damage to be taken
     */
    takeDamage(number){
        // set player tint to red for 0.2 second
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
        this.hp = SAVES.PLAYER.InitialHP;
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
        //disable control, set velocity to 0, remove freeze after a fixed duration
        this.freeze = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.freezeEvent = this.scene.time.delayedCall(SAVES.BEARTRAP.BearTrapFreezeTime, ()=>{
            this.freeze = false;
        }, this);
    }

    /**
     * Skill 1, Super Jump, multiply player jump speed
     */
    superJump(){
        //check skill 1 is cooling down or enough mana
        if (!this.superJumpAvail || this.mana < SAVES.PLAYER.SuperJumpCost){
            return;
        }

        //multiply jump speed in a fixed duration and reset it afterwards
        this.jumpSpeed *= SAVES.PLAYER.SuperJumpMultiplier;

        //reduce mana
        this.mana -= SAVES.PLAYER.SuperJumpCost;

        //disable skill during coolDown
        this.superJumpAvail = false;

        this.superJumpEvent = this.scene.time.delayedCall(SAVES.PLAYER.SuperJumpCoolDown, ()=>{
            this.superJumpAvail = true;
            this.jumpSpeed = SAVES.PLAYER.JumpSpeed;
        }, this);
    }

    /**
     * skill2, super speed, multiply player move speed
     */

    superSpeed(){
        //check skill 2 is cooling down or enough mana
        if (!this.superSpeedAvail || this.mana < SAVES.PLAYER.SuperSpeedCost){
            return;
        }

        //multiply move speed in a fixed duration and reset it afterwards
        this.body.setMaxVelocity(SAVES.PLAYER.MaxVx*SAVES.PLAYER.SuperSpeedMultiplier, SAVES.PLAYER.MaxVy*SAVES.PLAYER.SuperSpeedMultiplier);
        this.groundRunningForce *= SAVES.PLAYER.SuperSpeedMultiplier;
        this.airRunningForce *= SAVES.PLAYER.SuperSpeedMultiplier;

        //reduce mana
        this.mana -= SAVES.PLAYER.SuperSpeedCost;

        //disable skill during coolDown
        this.superSpeedAvail = false;

        this.superSpeedEvent = this.scene.time.delayedCall(SAVES.PLAYER.SuperSpeedCoolDown, ()=>{
            this.body.setMaxVelocity(SAVES.PLAYER.MaxVx, SAVES.PLAYER.MaxVy);
            this.superSpeedAvail = true;
            this.groundRunningForce = SAVES.PLAYER.GroundRunningForce;
            this.airRunningForce = SAVES.PLAYER.AirRunningForce;
        }, this);
    }

    /**
     * Skill 3, Reload player bullet to full
     */
    reload(){
        //check skill 3 is cooling down or enough mana
        if (!this.reloadAvail || this.mana < SAVES.PLAYER.ReloadCost){
            return;
        }

        //reduce mana
        this.mana -= SAVES.PLAYER.ReloadCost;

        //give player full bullet
        this.remainingBullet = SAVES.PLAYER.InitialBullet;
        console.log(this.remainingBullet);
    }

    /**
     * skill4, heal and gives full health to player
     */
    heal(){
        //check skill 4 is cooling down or enough mana
        if (!this.healAvail || this.mana < SAVES.PLAYER.HealCost){
            return;
        }

        //reduce mana
        this.mana -= SAVES.PLAYER.HealCost

        //give player full health
        this.hp = SAVES.PLAYER.InitialHP;
        console.log(this.hp);
    }
}
