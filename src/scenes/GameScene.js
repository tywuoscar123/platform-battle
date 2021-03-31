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

        this.load.atlas('EvilWizard_Idle', 'assets/Wizard_Pack/Idle.png', 'assets/Wizard_Pack/Idle.json');
        this.load.atlas('EvilWizard_Run', 'assets/Wizard_Pack/Run.png', 'assets/Wizard_Pack/Run.json');

        //load additional assets
        this.load.image('spike', 'assets/Traps/spike.png');
    }

    create() {

        this.escKey = this.input.keyboard.addKey('ESC', false, false);

        //load the tile map
        this.castleMap = this.add.tilemap('CastlePrison');

        this.castleMap.addTilesetImage('Castletiles');
        this.castleMap.addTilesetImage('CastleBG');

        this.backgroundLayer = this.castleMap.createLayer('Background', 'CastleBG');
        this.platformLayer = this.castleMap.createLayer('Platform', 'Castletiles');
        this.platformLayer.setCollisionByProperty({collides:  true});

        this.spawnPt = this.castleMap.findObject('Objects', obj => obj.name === 'Spawn');
        this.goal = this.castleMap.findObject('Objects', obj => obj.name === 'Goal');
        //create the player character and add physics to player
        this.wizard = new Player(this, this.spawnPt.x, this.spawnPt.y);
        this.physics.world.addCollider(this.wizard.sprite, this.platformLayer);

        //add in obstacles spikes
        this.spikesFactory = new Spikes(this);
        this.physics.add.collider(this.spikesFactory.spikes, this.platformLayer);
        this.physics.add.collider(this.wizard.sprite, this.spikesFactory.spikes, this.damagePlayer, null, this);
        //create sample spike
        this.spikesFactory.createSpike(200, 580);

        //add mouse click tracer for hero player
        this.tracer = new MouseTracer(this, this.castleMap);

        //add state for game over checking
        this.gameover = false;

        //add timer for stage
        this.timer = this.time.delayedCall( CST.CONFIG.TIMER, this.HeroWin, null, this);
        this.timertext = this.add.text(5, 20, 'Remaining Time: ', { font: 'bold 12px system-ui' });
    }

    update(time, delta) {
        //no update if game over
        if (this.gameover === true){
            return;
        }
        
        /*this.escKey.on("down",()=>{
            console.log("ESC PRESSED");
            this.scene.pause();
            this.scene.launch(CST.SCENES.PAUSE);
        })*/

        if(this.escKey.isDown){
            console.log("ESC PRESSED");
            this.scene.pause();
            this.scene.launch(CST.SCENES.PAUSE);
        }

        this.input.addListener

        //update devil player position
        this.wizard.update();
        //update hero player select tile if clicked
        this.tracer.update();

        //update remaining time
        this.timertext.setText('Remaining Time: ' + this.timer.getRemainingSeconds().toFixed(1));

        //check player reaching goal
        if (this.wizard.sprite.x > this.goal.x && this.wizard.sprite.y > this.goal.y){
            this.DevilWin();
        }
    }

    damagePlayer(object1, object2){
        this.wizard.takeDamage(1);
        this.wizard.sprite.setVelocity(-200, -100);
        console.log(object2.x);
        console.log(object2.y);
        if (this.wizard.hp <= 0){
            this.wizard.resetStatus();
            this.restart();
        }
    }

    restart() {
        //reset the devil player position
        this.wizard.sprite.setVelocity(0, 0);
        this.wizard.sprite.setX(this.spawnPt.x);
        this.wizard.sprite.setY(this.spawnPt.y);
        this.wizard.sprite.play('Idle', true);
        this.wizard.sprite.setAlpha(0);
        this.tweens.add({
            targets: this.wizard.sprite,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
        this.cameras.main.flash(500, 0,0,0);
    }

    HeroWin() {
        //game end, hero wins, go to end scene
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
        //game end devil wins, go to end scene
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