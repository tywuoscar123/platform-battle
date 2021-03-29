import Phaser from 'phaser';
import { CST } from "../CST";
import Player from "../characters/Player";
import Spikes from "../objects/Spikes";
import MouseTracer from "../MouseTracer";

export default class GameScene extends Phaser.Scene {
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

        this.tracer = new MouseTracer(this, this.castleMap);

        this.gameover = false;

        this.timer = this.time.delayedCall( 5*1000, this.HeroWin, null, this);

        this.text = this.add.text(20, 30, '', { font: 'bold 72px system-ui' });
    }

    update(time, delta) {
        if (this.gameover === true){
            return;
        }
        this.wizard.update();
        this.tracer.update();

        this.text.setText(this.timer.getRemainingSeconds().toFixed(1));
    }

    restart() {
        console.log("restart");
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

    HeroWin() {
        console.log("Hero Wins");
        this.gameover = true;
        this.wizard.sprite.anims.stop();
        this.scene.start(CST.SCENES.END, {
            winner: 'Hero',
            heroScore: 60,
            devilScore: 20
        });
    }

    DevilWin() {
        console.log("Devil Wins");
        this.gameover = true;
        this.wizard.sprite.anims.stop();
        this.scene.start(CST.SCENES.END, {
            winner: 'Hero',
            heroScore: 20,
            devilScore: 60
        });
    }

}