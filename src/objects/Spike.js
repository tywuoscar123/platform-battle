import Phaser from "phaser";
import { CST } from "../CST";

export default class Spike extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture = 'spike', frame = 0) {
        super(scene, x, y, texture, frame);

        //set player properties
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0.5, 0.5);
        this.displayWidth = CST.CONFIG.TileSize;
        this.displayHeight = CST.CONFIG.TileSize;

        this.body.setCollideWorldBounds(true);

        /* Sprite lifespan
        this.scene.time.delayedCall(CST.SPIKE.SpikeDuration, function(){
            console.log('destroyed');
            this.destroy();
        }, null, this);
         */
    }

    update(args) {
        let Fx = 0;
        let Fy = 0;
    }

}
