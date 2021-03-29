import Phaser from 'phaser';
import { CST } from "../CST";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 300 }
                }
            }
        })
    }
    init(){

    }

    preload() {
        this.load.image('Castletiles', 'assets/CastlePrison/New_tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');

        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');

        this.load.atlas('EvilWizard', 'assets/Evil_Wizard/Idle.png', 'assets/Evil_Wizard/Idle.json');
    }

    create() {
        const castleMap = this.add.tilemap('CastlePrison');

        castleMap.addTilesetImage('Castletiles');
        castleMap.addTilesetImage('CastleBG');

        const backgroundLayer = castleMap.createLayer('Background', 'CastleBG');
        const platformLayer = castleMap.createLayer('Platform', 'Castletiles');

        platformLayer.setCollisionByProperty({collides:  true});

        this.anims.create({
            key: 'Idle',
            frames: 'EvilWizard',
            frameRate: 8,
            repeat: -1
        });

        this.wizard = this.physics.add.sprite(150,0, 'EvilWizard');
        this.wizard.setScale(0.5, 0.5);
        this.wizard.play('Idle');
        this.wizard.setBounce(0.2);
        this.wizard.setCollideWorldBounds(true);
        this.physics.add.collider(this.wizard, platformLayer);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
            if (this.cursors.left.isDown){
                this.wizard.setVelocityX(-50);
            }
            else if (this.cursors.right.isDown){
                this.wizard.setVelocityX(50);
            }
            else{
                this.wizard.setVelocityX(0);
            }

            // Make the player jump if he is touching the ground
            if (this.cursors.up.isDown && this.wizard.body.onFloor()) {
                this.wizard.setVelocityY(-220);
            }
    }

}