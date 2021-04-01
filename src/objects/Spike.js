import Phaser from "phaser";

export default class Spike {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'spike', 0);
        this.sprite.setScale(0.5, 0.5);
        this.sprite.setCollideWorldBounds(true);
    }

    update() {

    }

    destroy(){
        this.sprite.destroy();
    }
}
