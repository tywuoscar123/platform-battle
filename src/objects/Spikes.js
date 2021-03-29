import Phaser from "phaser";

export default class Spikes {
    constructor(scene) {
        this.scene = scene;
        this.spikes = scene.physics.add.group({
            immovable: true
        });
    }

    createSpike(x, y){
        const spike = this.spikes.create(x, y, 'spike');
        spike.setScale(0.5, 0.5);
        spike.setCollideWorldBounds(true);
    }
}
