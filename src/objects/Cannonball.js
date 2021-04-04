import Phaser from "phaser";
import { CST } from "../CST";
import { SAVES } from "../saves";
export default class Cannonball extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, direction, xVelocity = 150, yVelocity = 0 , texture = 'cannonball', frame = 0) {
        super(scene, x, y, texture, frame);
        //set sprite properties
        //this.group = group;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.enemyProjectiles.add(this);

        this.setOrigin(0.5, 0.5);
        this.setScale(0.5, 0.5);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

        let magnitudeX = Math.pow(this.scene.wizard.x - this.x, 2);
        let magnitudeY = Math.pow(this.scene.wizard.y - this.y , 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (this.scene.wizard.x - this.x)/magnitude * SAVES.CANNON.CannonSpeed;
        let Vy = (this.scene.wizard.y - this.y)/magnitude * SAVES.CANNON.CannonSpeed;
        this.body.setVelocity(direction * xVelocity, yVelocity);

        this.body.mass = 250;

        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    update(args) {
        this.VxbeforeCollision = this.body.velocity.x;
        this.VybeforeCollision = this.body.velocity.y;
    }

    destroy() {
        if (this.body !== undefined){
            this.body.enable = false;
        }
        super.destroy();
    }

}
