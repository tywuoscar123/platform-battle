import Phaser from 'phaser';
import { CST } from "../CST";
import Player from "../characters/Player";
import Spikes from "../objects/Spikes";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: false
                }
            }
        })
    }

    init(){
    }

    preload() {
        //load the map
        this.load.image('Castletiles', 'assets/CastlePrison/New_tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');

        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');

        this.load.atlas('EvilWizard', 'assets/Evil_Wizard/Idle.png', 'assets/Evil_Wizard/Idle.json');

        //load additional assets
        this.load.image('spike', 'assets/Traps/spike.png');
    }

    create() {
        //load the tile map
        this.castleMap = this.add.tilemap('CastlePrison');

        this.castleMap.addTilesetImage('Castletiles');
        this.castleMap.addTilesetImage('CastleBG');

        this.backgroundLayer = this.castleMap.createLayer('Background', 'CastleBG');
        this.platformLayer = this.castleMap.createLayer('Platform', 'Castletiles');
        this.platformLayer.setCollisionByProperty({collides:  true});
        //finish loading map

        //create the player character and add physics to player
        this.wizard = new Player(this, 25, 580);
        this.physics.world.addCollider(this.wizard.sprite, this.platformLayer);

        //add in obstacles spikes
        this.spikesFactory = new Spikes(this);
        this.physics.add.collider(this.spikesFactory.spikes, this.platformLayer);
        this.physics.add.collider(this.wizard.sprite, this.spikesFactory.spikes, this.restart, null, this);

        this.spikesFactory.createSpike(200, 580);
    }

    update(time, delta) {
        this.wizard.update();
    }

    restart() {
        this.wizard.sprite.setVelocity(0, 0);
        this.wizard.sprite.setX(25);
        this.wizard.sprite.setY(590);
        this.wizard.sprite.play('Idle', true);
        this.wizard.sprite.setAlpha(0);
        this.tweens.add({
            targets: this.wizard.sprite,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
    }

}