import Phaser from 'phaser';
import { CST } from "../CST";
import Player from "../characters/Player";
import Spike from "../objects/Spike";
import BouncingBomb from "../objects/BouncingBomb";
import MouseTracer from "../MouseTracer";
import Utils from "../Utils";
import Cannon from '../objects/Cannon';
import Beartrap from '../objects/Beartrap';
import MagicOrb from '../objects/MagicOrb';
import Cannonball from '../objects/Cannonball';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME,
            physics: {
                default: 'arcade',
                arcade: {
                    //gravity: { y: 500 },
                    debug: true
                }
            }
        });

        this.utilfunctions = new Utils(this);
    }

    init(){
        this.physics.world.setBounds(0, 0, CST.CONFIG.GameX, CST.CONFIG.GameY);
    }

    preload() {
        //load the map
        this.load.image('Castletiles', 'assets/CastlePrison/New_tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');

        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');

        this.load.atlas('EvilWizard_Idle', 'assets/Evil_Wizard/Idle.png', 'assets/Evil_Wizard/Idle.json');
        this.load.atlas('EvilWizard_Run', 'assets/Evil_Wizard/Move.png', 'assets/Evil_Wizard/Move.json');

        //load additional assets
        this.load.image('spike', 'assets/Traps/spike.png');
        this.load.image('bomb', 'assets/Traps/bomb.png');
        this.load.atlas('cannon', 'assets/Traps/cannon_asset/cannon.png', 'assets/Traps/cannon_asset/Cannon.json');
        this.load.atlas('beartrap', 'assets/Traps/beartrap_assets/Beartrap.png', 'assets/Traps/beartrap_assets/beartrap.json' );
        this.load.image('magicOrb', 'assets/Attack/Magic_orb.png');
        this.load.image('cannonball', 'assets/Traps/cannon_asset/cannonball.png');
    }

    create() {
        /*
            create in the map in the scene
         */
        this.castleMap = this.add.tilemap('CastlePrison');
        this.castleMap.addTilesetImage('Castletiles');
        this.castleMap.addTilesetImage('CastleBG');
        this.backgroundLayer = this.castleMap.createLayer('Background', 'CastleBG');
        this.platformLayer = this.castleMap.createLayer('Platform', 'Castletiles');
        this.platformLayer.setCollisionByProperty({collides:  true});
        //set up spawn and goal pointer for devil player
        this.spawnPt = this.castleMap.findObject('Objects', obj => obj.name === 'Spawn');
        this.goal = this.castleMap.findObject('Objects', obj => obj.name === 'Goal');

        /*
            add inputs for the 2 players
         */
        //press esc key for pause
        this.escKey = this.input.keyboard.addKey('ESC', false, false);
        //add mouse click tracer for hero player
        this.tracer = new MouseTracer(this, this.castleMap);
        //add squares/buttons for skills
        this.spikeButton = this.utilfunctions.createImageButton(1340, 100, 'spike');
        this.spikeButton.on('pointerdown', this.createSpike, this);

        /*
            create player
         */
        //create the player character and add physics to player
        this.wizard = new Player(this, this.spawnPt.x, this.spawnPt.y);
        this.physics.world.addCollider(this.wizard, this.platformLayer);

        /*
            create obstacle groups
         */
        //add in obstacles spikes
        this.trapsGroup = this.physics.add.group();
        this.physics.add.collider(this.trapsGroup, this.platformLayer);
        this.physics.add.collider(this.trapsGroup, this.trapsGroup);
       

        /*
        add in collider between objects
         */
        this.physics.add.collider(this.wizard, this.trapsGroup, this.damagePlayer, null, this);

        //create sample spike
        let newSpike = new Spike(this, 200, 580);
        this.trapsGroup.add(newSpike);

        let newSpike2 = new Spike(this, 250, 580);
        this.trapsGroup.add(newSpike2);

        let newBomb = new BouncingBomb(this, 400, 580);
        this.trapsGroup.add(newBomb);
        newBomb.body.setVelocity(500, -20);

        let newCannon = new Cannon(this, 300, 580);
        this.trapsGroup.add(newCannon);

        let newCannonBall = new Cannonball(this,310, 580);
        this.trapsGroup.add(newCannonBall);
        newCannonBall.body.setVelocity(150, 0);

        let newBeartrap = new Beartrap(this, 400, 500);
        this.trapsGroup.add(newBeartrap);

        let newMagicOrb = new MagicOrb(this,350, 500);
        this.trapsGroup.add(newMagicOrb);
        newMagicOrb.body.setVelocity(0, -150);

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

        //update devil player position
        this.wizard.update();
        //update hero player select tile if clicked
        this.tracer.update();

        //update remaining time
        this.timertext.setText('Remaining Time: ' + this.timer.getRemainingSeconds().toFixed(1));

        //check player reaching goal
        if (this.wizard.x > this.goal.x && this.wizard.y > this.goal.y){
            this.DevilWin();
        }

        this.trapsGroup.getChildren().forEach(function (value){
            value.update();
        });
    }

    collidesWithPlatform(object1, object2){

    }

    damagePlayer(object1, object2){
        if (object2 instanceof Spike){
            this.wizard.takeDamage(1);
        }

        let bounceX, bounceY;
        if (object1.x < object2.x){
            bounceX = -1;
        }else if (object1.x > object2.x){
            bounceX = 1;
        }else{
            bounceX = 0;
        }

        if (object1.x < object2.y){
            bounceY = -1;
        }else if (object1.x > object2.y){
            bounceY = 1;
        }else{
            bounceY = 0;
        }

        this.wizard.body.setVelocity(bounceX * 200, bounceY * 100);
        console.log(bounceX * 200);
        console.log(bounceY * 100);
        //console.log(object2.x);
        //console.log(object2.y);
        if (this.wizard.hp <= 0){
            this.wizard.resetStatus();
            this.restart();
        }
        object2.destroy();
    }

    restart() {
        //reset the devil player position
        this.wizard.body.setVelocity(0, 0);
        this.wizard.setX(this.spawnPt.x);
        this.wizard.setY(this.spawnPt.y);
        this.wizard.play('Idle', true);
        this.wizard.setAlpha(0);
        this.tweens.add({
            targets: this.wizard,
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
        this.wizard.anims.stop();
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
        this.wizard.anims.stop();
        this.scene.start(CST.SCENES.END, {
            winner: 'Hero',
            heroScore: 20,
            devilScore: 60
        });
    }

    createSpike(){
        let newSpike = new Spike(this, this.tracer.x + CST.CONFIG.TileSize/2, this.tracer.y + CST.CONFIG.TileSize/2);
        this.trapsGroup.add(newSpike);
        this.spikeButton.tint = 0x262626;
        //console.log(newSpike.body.overlapX);
        //console.log(newSpike.body.overlapY);

        //console.log(this.physics.closest(newSpike));

        this.spikeButton.disableInteractive();
        this.time.delayedCall(CST.SPIKE.SpikeCoolDown, function(){
            this.spikeButton.clearTint();
            this.spikeButton.setInteractive();
        }, null, this);
    }

}