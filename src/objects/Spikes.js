import Phaser from "phaser";

export default class Spikes {
    constructor(scene) {
        this.scene = scene;
        //create spike group for collision
        this.spikes = scene.physics.add.group({
            immovable: true
        });
    }

    createSpike(x, y){
        //create a single spike at the position
        const spike = this.spikes.create(x, y, 'spike');
        spike.setScale(0.5, 0.5);
        spike.setCollideWorldBounds(true);
    }
}
