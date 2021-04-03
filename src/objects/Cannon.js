import Phaser from "phaser";
import { CST } from "../CST";
import Cannonball from '../objects/Cannonball';

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

        this.scene.trapsGroup.add(this);

        this.setOrigin(0.5, 0.5);
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
        this.scene.time.addEvent({
            delay:2000,
            callback: this.cannonShoot,
            callbackScope:this,
            args: [x, y],
            loop: true
        })
    }

    update(args) {

    }

    //function for shooting
    cannonShoot(x, y){
        this.scene.add.existing(new Cannonball(this.scene, x+10, y))
        
    }

}
