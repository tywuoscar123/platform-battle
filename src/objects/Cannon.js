import Phaser from "phaser";
import { CST } from "../CST";

export default class Cannon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'cannon', frame = 0) {
        super(scene, x, y, texture, frame);

        const anims = this.scene.anims;
        anims.create({
            key: 'shoot',
            frames: 'cannon',
            frameRate: 4,
            repeat: -1
        });

 

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

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
        this.play("shoot", true);
    }

    update(args) {
    }

}
