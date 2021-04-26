import Phaser from "phaser";
import { CST } from "../CST";
import Cannonball from '../objects/Cannonball';
import PhysicsCal from "../PhysicsCal";
import { SAVES } from "../saves";


export default class Cannon extends Phaser.GameObjects.Sprite{
    /**
     * Construct a Cannon Object and add it into physical group.
     *
     * Assign physical attributes to object and creating shooting event.
     *
     * @param {GameScene} scene - Scene this object belong to
     * @param {number} x - initial x position
     * @param {number} y - initial y position
     * @param {string} texture - sprite sheet key
     * @param {number} frame - default frame
     */
    constructor(scene, x, y, texture = 'cannon', frame = 0) {
        super(scene, x, y, texture, frame);

        const anims = this.scene.anims;
        anims.create({
            key: 'shoot',
            frames: 'cannon',
            frameRate: 3,
            repeat: -1
        });

        //add to physical group
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.collidingTraps.add(this);

        //set display property
        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        //this.displayWidth = CST.CONFIG.TileSize;
        //this.displayHeight = CST.CONFIG.TileSize;

        /* Sprite lifespan
        this.scene.time.delayedCall(CST.SPIKE.SpikeDuration, function(){
            console.log('destroyed');
            this.destroy();
        }, null, this);
         */

        //loop shooting animation and shoot cannonballs
        this.play("shoot", true);
        this.shootEvent = this.scene.time.addEvent({
            delay:2000,
            callback: this.cannonShoot,
            callbackScope:this,
            loop: true
        });

        //set physical property
        this.body.mass = 5000;
        this.DragCoefficient = 1.05;

        //log current velocity for collision reaction
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * Update the Cannon in game loop. <br/>
     * Apply gravity, drag and friction. <br/>
     * Flip Cannon towards player. <br/>
     * Save current velocity for collision reaction.
     *
     * @param args - any arguments
     */
    update(args) {
        //update velocity according to physics
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);

        //flip to player direction
        if (this.scene.wizard.x < this.x ){
            this.setFlipX(true);
        }else{
            this.setFlipX(false);
        }

        //update current velocity log
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    /**
     * create cannonball object and shoot it towards player by passing in initial velocity
     */
    cannonShoot(){
        //calculate cannonball initial velocity according to player position
        let magnitudeX = Math.pow(this.scene.wizard.x - this.x, 2);
        let magnitudeY = Math.pow(this.scene.wizard.y - this.y , 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (this.scene.wizard.x - this.x)/magnitude * SAVES.CANNON.CannonSpeed;
        let Vy = (this.scene.wizard.y - this.y)/magnitude * SAVES.CANNON.CannonSpeed;
        console.log(Vx);
        console.log(Vy);

        //create new cannonball
        new Cannonball(this.scene, this.x, this.y, Vx, Vy);
    }

    /**
     * Destroy this sprite and set physical body to disable, remove shooting event.
     */
    destroy() {
        console.log('destroy');
        if (this.scene !== undefined) {
            this.scene.time.removeEvent(this.shootEvent);
        }
        if (this.body !== undefined){
            this.body.enable = false;
        }

        super.destroy();
    }

}
