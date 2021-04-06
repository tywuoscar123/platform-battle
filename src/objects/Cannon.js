import Phaser from "phaser";
import { CST } from "../CST";
import Cannonball from '../objects/Cannonball';
import PhysicsCal from "../PhysicsCal";
import { SAVES } from "../saves";


export default class Cannon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'cannon', frame = 0) {
        super(scene, x, y, texture, frame);

        const anims = this.scene.anims;
        anims.create({
            key: 'shoot',
            frames: 'cannon',
            frameRate: 3,
            repeat: -1
        });

        //this.group = group;

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.collidingTraps.add(this);

        this.setOrigin(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        //this.displayWidth = CST.CONFIG.TileSize;
        //this.displayHeight = CST.CONFIG.TileSize;


        /* Sprite lifespan
        this.scene.time.delayedCall(CST.SPIKE.SpikeDuration, function(){
            console.log('destroyed');
            this.destroy();
        }, null, this);
         */

        this.setScale(0.5, 0.5);
        //loop shooting animation
        this.play("shoot", true);
        //this.cannonShoot(x,y);
        this.shootEvent = this.scene.time.addEvent({
            delay:2000,
            callback: this.cannonShoot,
            callbackScope:this,
            loop: true
        });

        this.body.mass = 5000;
        this.DragCoefficient = 1.05;

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    update(args) {
        let newVelocityX = PhysicsCal.calculateVelocityX(this, 0);
        let newVelocityY = PhysicsCal.calculateVelocityY(this, 0);

        this.body.setVelocityX(newVelocityX * CST.CONFIG.PixelPerMeter);
        this.body.setVelocityY(newVelocityY * CST.CONFIG.PixelPerMeter);

        if (this.scene.wizard.x < this.x ){
            this.setFlipX(true);
        }else{
            this.setFlipX(false);
        }

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    //function for shooting
    cannonShoot(){
        let magnitudeX = Math.pow(this.scene.wizard.x - this.x, 2);
        let magnitudeY = Math.pow(this.scene.wizard.y - this.y , 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (this.scene.wizard.x - this.x)/magnitude * SAVES.CANNON.CannonSpeed;
        let Vy = (this.scene.wizard.y - this.y)/magnitude * SAVES.CANNON.CannonSpeed;
        console.log(Vx);
        console.log(Vy);

        //new Cannonball(this.scene, this.x, this.y, 1, Vx, Vy);
        new Cannonball(this.scene, this.x, this.y, 1);
    }

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
