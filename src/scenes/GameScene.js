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
import {SAVES} from "../saves";
import manaPotion from "../objects/manaPotion";
import hpPotion from "../objects/hpPotion";

/**
 * Base class for each level scene. <br/>
 * Act as controller for each level
 */
export default class GameScene extends Phaser.Scene {
    /**
     * Set key and properties of scene. <br/>
     * Create util object for using utility functions
     */
    constructor(key) {
        super({
            key: key,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: true
                }
            }
        });

        this.customGravity = 500;
        this.utilfunctions = new Utils(this);
    }

    /**
     * Set game world bounds
     */
    init(){
        this.physics.world.setBounds(0, 0, CST.CONFIG.GameX, CST.CONFIG.GameY);
    }

    /**
     * load in game assets
     */
    preload() {
        //load assets
        this.load.atlas('EvilWizard_Idle', 'assets/Evil_Wizard/Idle.png', 'assets/Evil_Wizard/Idle.json');
        this.load.atlas('EvilWizard_Run', 'assets/Evil_Wizard/Move.png', 'assets/Evil_Wizard/Move.json');

        //load additional assets
        this.load.image('spike', 'assets/Traps/spike.png');
        this.load.image('bomb', 'assets/Traps/bomb.png');
        this.load.atlas('explosion', 'assets/Traps/explosion.png', 'assets/Traps/explosion.json');
        this.load.atlas('cannon', 'assets/Traps/cannon_asset/cannon.png', 'assets/Traps/cannon_asset/Cannon.json');
        this.load.atlas('beartrap', 'assets/Traps/beartrap_assets/Beartrap.png', 'assets/Traps/beartrap_assets/beartrap.json' );
        this.load.image('magicOrb', 'assets/Attack/Magic_orb.png');
        this.load.image('cannonball', 'assets/Traps/cannon_asset/cannonball.png');
        this.load.image('hpPotion', 'assets/Potion/hpPotion.png');
        this.load.image('manaPotion', 'assets/Potion/manaPotion.png');
    }

    /**
     * Create Game map, object groups and UI. <br/>
     * Set Physical Properties of scene.
     */
    create() {
        /*
            Map Setting:
            create in the map in the scene
         */
        this.platformLayer.setCollisionByProperty({collides:  true});
        //set up spawn and goal pointer for devil player
        this.spawnPt = this.map.findObject('Objects', obj => obj.name === 'Spawn');
        this.goal = this.map.findObject('Objects', obj => obj.name === 'Goal');


        /*
            Input Settings:
            add spawn traps buttons for the hero players
         */
        //press esc key for pause
        this.escKey = this.input.keyboard.addKey('ESC', false, false);
        //add mouse click tracer for hero player
        this.tracer = new MouseTracer(this, this.map);
        //add squares/buttons for skills
        this.spikeButton = this.utilfunctions.createImageButton(1340, 100, 'spike');
        this.spikeButton.on('pointerdown', this.createSpike, this);

        this.bombButton = this.utilfunctions.createImageButton(1340, 200, 'bomb');
        this.bombButton.on('pointerdown', this.createBomb, this);

        this.bearTrapButton = this.utilfunctions.createImageButton(1340, 300, 'beartrap');
        this.bearTrapButton.on('pointerdown', this.createBearTrap, this);

        this.cannonButton = this.utilfunctions.createImageButton(1340, 400, 'cannon');
        this.cannonButton.on('pointerdown', this.createCannon, this);


        /*
            Physics Setting:
            Player & Group creations:
         */
        //create the player character and add physics to player
        this.wizard = new Player(this, this.spawnPt.x, this.spawnPt.y);
        this.physics.world.addCollider(this.wizard, this.platformLayer);

        //create group for traps that will collides together
        this.collidingTraps = this.physics.add.group();
        this.physics.add.collider(this.collidingTraps, this.platformLayer, this.interactWithPlatform, null, this);
        this.physics.add.collider(this.collidingTraps, this.collidingTraps, this.trapsCollide, null, this);

        this.overlappingTraps = this.physics.add.group();
        this.physics.add.collider(this.overlappingTraps, this.platformLayer);
        this.physics.add.collider(this.overlappingTraps, this.overlappingTraps, this.trapsCollide, null, this);

        /*
        this.bombsGroup = this.physics.add.group();
        this.physics.add.collider(this.bombsGroup, this.platformLayer, this.interactWithPlatform, null, this);
        */

        this.enemyProjectiles = this.physics.add.group();
        this.physics.add.collider(this.enemyProjectiles, this.platformLayer, this.interactWithPlatform, null, this);
        this.physics.add.collider(this.enemyProjectiles, this.enemyProjectiles, this.cannonBallCollide, null, this);
        this.physics.add.collider(this.enemyProjectiles, this.collidingTraps, this.cannonBallHitsTrap, null, this);

        this.playerProjectiles = this.physics.add.group();
        this.physics.add.collider(this.playerProjectiles, this.platformLayer, this.interactWithPlatform, null, this);

        this.collectables = this.physics.add.group();
        this.physics.world.addCollider(this.collectables, this.platformLayer);


        /*
            Add collisions between objects, Assign callbacks
         */
        //collision/overlap between player and traps/collectables
        this.physics.add.overlap(this.wizard, this.collidingTraps, this.damagePlayer, null, this);
        this.physics.add.overlap(this.wizard, this.enemyProjectiles, this.damagePlayer, null, this);
        this.physics.add.overlap(this.wizard, this.overlappingTraps, this.overlappingTrapAction, null, this);
        this.physics.add.overlap(this.wizard, this.collectables, this.collects, null, this);

        //collision between player projectiles and traps/enemy attackers
        this.physics.add.collider(this.playerProjectiles, this.collidingTraps, this.playerHitsTrap, null, this);
        this.physics.add.collider(this.playerProjectiles, this.overlappingTraps, this.playerHitsTrap, null, this);
        this.physics.add.collider(this.playerProjectiles, this.enemyProjectiles, this.playerHitsTrap, null, this);

        //collision among traps, not yet implemented
        this.physics.add.collider(this.overlappingTraps, this.collidingTraps, this.trapsCollide, null, this);


        /*
         * Create Potions according to tile map
         */
        let manaPotionLocations = this.map.getObjectLayer('Objects').objects.filter(obj => obj.name === 'manaPotion');
        for (let location of manaPotionLocations){
            new manaPotion(this, location.x, location.y);
        }

        let hpPotionLocations = this.map.getObjectLayer('Objects').objects.filter(obj => obj.name === 'hpPotion');
        for (let location of hpPotionLocations){
            new hpPotion(this, location.x, location.y);
        }

        /*
            Additional Physics setting for level
         */
        //destroy projectiles on level edge
        this.physics.world.on('worldbounds', function (body, up, down, left, right) {
            console.log(body);
            let object = body.gameObject;

            if (object instanceof Player && down){
                this.restart();
                return;
            }

            if (object instanceof Cannonball || object instanceof MagicOrb || down){
                object.destroy();
            }

        }, this);

        /*
             Create Sample objects
         */
        //create sample spike
        let newSpike = new Spike(this, 200, 580);
        let newSpike2 = new Spike(this, 250, 580);
        let newBomb = new BouncingBomb(this, 50, 400);
        let newCannon = new Cannon(this, 300, 550)
        let newBeartrap = new Beartrap(this, 400, 500);
        let newMagicOrb = new MagicOrb(this,350, 400, 1);

        /*
            Game General Settings:
         */
        //Set GameOver flag for level
        this.gameover = false;

        //Set timer for level
        let devilUIOffsetX = 15;
        this.timer = this.time.delayedCall( CST.CONFIG.TIMER, this.HeroWin, null, this);
        this.timertext = this.add.text(5, 0, 'Remaining Time: ', { font: 'bold 12px system-ui' });

        //add text for player static
        this.hpText = this.add.text(5, 20, 'Devil HP: ' + this.wizard.hp, { font: 'bold 12px system-ui' });
        this.bulletText = this.add.text(5, 20 + devilUIOffsetX, 'Devil Remaining Bullet: ' + this.wizard.remainingBullet, { font: 'bold 12px system-ui' });
        this.manaText =  this.add.text(5, 20 + devilUIOffsetX * 2, 'Mana: ' + this.wizard.mana, { font: 'bold 12px system-ui' });

        this.skiilOneText =  this.add.text(5, 20 + devilUIOffsetX * 3, 'SuperJump - Cost: ' + SAVES.PLAYER.SuperJumpCost, { font: 'bold 12px system-ui' });
        this.skiilTwoText =  this.add.text(5, 20 + devilUIOffsetX * 4, 'SuperSpeed - Cost: ' + SAVES.PLAYER.SuperSpeedCost, { font: 'bold 12px system-ui' });
        this.skiilThreeText =  this.add.text(5, 20 + devilUIOffsetX * 5, 'Reload Bullet - Cost: ' + SAVES.PLAYER.ReloadCost, { font: 'bold 12px system-ui' });
        this.skiilFourText =  this.add.text(5, 20 + devilUIOffsetX * 6, 'Heal - Cost: ' + SAVES.PLAYER.HealCost, { font: 'bold 12px system-ui' });

        //add pause button for hero player
        let pauseButton = this.utilfunctions.createTextButton(
            1340,
            20,
            "PAUSE",
            { font: "24px Arial", fill: "#ff0044" },
            "#ff0044",
            "#ffffff"
        );
        pauseButton.on('pointerdown', function() {
            this.scene.pause();
            this.scene.launch(CST.SCENES.PAUSE, {
                sceneKey: this.scene.key
            });
        }, this);


    }

    /**
     * Update the game, update every objects, update UI and Check game end conditions.
     *
     * @param time
     * @param delta
     */
    update(time, delta) {
        //no update if game over
        if (this.gameover === true){
            return;
        }
        //console.log('update');
        /*this.escKey.on("down",()=>{
            console.log("ESC PRESSED");
            this.scene.pause();
            this.scene.launch(CST.SCENES.PAUSE);
        })*/

        //pause scene is esc key is pressed
        if(this.escKey.isDown){
            console.log("ESC PRESSED");
            this.scene.pause();
            this.scene.launch(CST.SCENES.PAUSE, {
                sceneKey: this.scene.key
            });
        }

        //update devil player position
        this.wizard.update();
        //update hero player select tile if clicked
        this.tracer.update();

        //update remaining time + devil stat
        this.timertext.setText('Remaining Time: ' + this.timer.getRemainingSeconds().toFixed(1));
        this.hpText.setText('Devil HP: ' + this.wizard.hp);
        this.bulletText.setText('Devil Remaining Bullet: ' + this.wizard.remainingBullet);
        this.manaText.setText('Mana: ' + this.wizard.mana);

        //check player reaching goal
        if (this.wizard.x > this.goal.x && this.wizard.y > this.goal.y){
            this.DevilWin();
        }

        for (const object of this.collidingTraps.getChildren()){
            object.update();
        }

        for (const object of this.overlappingTraps.getChildren()){
            object.update();
        }

        for (const object of this.collectables.getChildren()){
            object.update();
        }
    }

    /*
        Collide/Overlap callback function
     */

    /*
        function for everything colling with platform

        object1 - player

        object2 - platformLayer
     */
    /**
     * Function for everything colling with platform. <br/>
     * Handle collision reactions.
     *
     * @param object1
     * @param object2
     */
    interactWithPlatform(object1, object2){
        //console.log('interact');
        //set object 1 to game object and object 2 to platform
        let object = object1;
        let tile = object2;
        if (!object1 instanceof Phaser.GameObjects.Sprite){
            object = object2;
            tile = object1;
        }

        //handle bouncing bomb
        if (object instanceof BouncingBomb){
            this.reBounce(object);
        }

        //handle projectiles
        if (object instanceof Cannonball || object instanceof MagicOrb){
            object.destroy();
        }

        //do nothing for other objects for now
    }


    /**
     * Function for objects bouncing of a surface
     *
     * @param object
     */
    reBounce(object){
        //console.log(object.VxbeforeCollision);
        //console.log(object.VybeforeCollision);

        //console.log('rebounce');
        if (object.body.blocked.up || object.body.blocked.down){
            console.log('bounce Y');
            object.body.setVelocityY(-1 * object.VybeforeCollision);
        }else if (object.body.blocked.left || object.body.blocked.right){
            console.log('bounce X');
            object.body.setVelocityX(-1 * object.VxbeforeCollision);
        }

        //console.log(object.body.velocity.x);
        //console.log(object.body.velocity.y);
    }


    /**
     * Cannonballs collide with each other, destroy both
     *
     * @param object1
     * @param object2
     */
    cannonBallCollide(object1, object2){
        this.pointMassCollisionReaction(object1, object2);
    }

    /**
     * Function for handling player-trap interactions
     *
     * @param object1
     * @param object2
     */
    playerHitsTrap(object1, object2){
        if(object1 instanceof MagicOrb){
            object1.destroy();
            object2.destroy();
        }
    }

    /**
     * Function for handling cannonBall-trap interactions, destroy cannonball
     *
     * @param object1
     * @param object2
     */
    cannonBallHitsTrap(object1, object2){
        if(this.overlappingTraps.getChildren().includes(object2)){
            return;
        }
        if(object1 instanceof Cannonball){
            object1.destroy();
            object2.body.setVelocity(object2.VxbeforeCollision, object2.VybeforeCollision);
        }
    }

    /**
     * Function for two traps colliding
     *
     * @param object1
     * @param object2
     */
    trapsCollide(object1, object2){
        this.pointMassCollisionReaction(object1, object2);
        //object2.destroy();
    }

    /**
     * Calculate and set reaction after 2 point masses collides
     *
     * @param object1 - first colliding object
     * @param object2 - second colliding object
     */
    pointMassCollisionReaction(object1, object2){
        //console.log('-------------------------');
        //console.log('collides');

        //initialize variables for math equations for 2d collision
        let v1Vector = new Phaser.Math.Vector2(object1.VxbeforeCollision, object1.VybeforeCollision);
        let v2Vector = new Phaser.Math.Vector2(object2.VxbeforeCollision, object2.VybeforeCollision);
        let v1 = v1Vector.length();
        let v2 = v2Vector.length();

        let m1 = object1.body.mass;
        let m2 = object2.body.mass;

        let theta1 = Math.atan2(object1.VybeforeCollision, object1.VxbeforeCollision);
        let theta2 = Math.atan2(object2.VybeforeCollision, object2.VxbeforeCollision);
        let phi = Math.atan2((object2.y - object1.y), (object2.x - object1.x));

        //calculate object1 final velocity
        let v1PrimeX = v1 * Math.cos(theta1 - phi) * (m1 - m2);
        v1PrimeX += 2 * m2 * v2 * Math.cos(theta2 - phi);
        v1PrimeX /= (m1 + m2);
        v1PrimeX *= Math.cos(phi);
        v1PrimeX += v1 * Math.sin(theta1 - phi) * Math.cos(phi + Math.PI/2);

        let v1PrimeY = v1 * Math.cos(theta1 - phi) * (m1 - m2);
        v1PrimeY += 2 * m2 * v2 * Math.cos(theta2 - phi);
        v1PrimeY /= (m1 + m2);
        v1PrimeY *= Math.sin(phi);
        v1PrimeY += v1 * Math.sin(theta1 - phi) * Math.sin(phi + Math.PI/2);

        object1.body.setVelocity(v1PrimeX, v1PrimeY);

        //calculate object2 final velocity
        let v2PrimeX = v2 * Math.cos(theta2 - phi) * (m2 - m1);
        v2PrimeX += 2 * m1 * v1 * Math.cos(theta1 - phi);
        v2PrimeX /= (m1 + m2);
        v2PrimeX *= Math.cos(phi);
        v2PrimeX += v2 * Math.sin(theta2 - phi) * Math.cos(phi + Math.PI/2);

        let v2PrimeY = v2 * Math.cos(theta2 - phi) * (m2 - m1);
        v2PrimeY += 2 * m1 * v1 * Math.cos(theta1 - phi);
        v2PrimeY /= (m1 + m2);
        v2PrimeY *= Math.sin(phi);
        v2PrimeY += v2 * Math.sin(theta2 - phi) * Math.sin(phi + Math.PI/2);

        object2.body.setVelocity(v2PrimeX, v2PrimeY);

        //console.log('-------------------------');
    }

    /**
     * Function for handling player reaction when being damaged.
     *
     * @param object1
     * @param object2
     */
    damagePlayer(object1, object2){
        if (!(object1 instanceof Player)){
            let temp = object1;
            object1 = object2;
            object2 = temp;
        }

        //reduce player hp
        this.wizard.takeDamage(object2.damage);

        //bounce player away
        let bounceX, bounceY;
        if (object1.x < object2.x){
            bounceX = -1;
        }else if (object1.x > object2.x){
            bounceX = 1;
        }else{
            bounceX = 0;
        }

        if (object1.y < object2.y){
            bounceY = -1;
        }else if (object1.y > object2.y){
            bounceY = 1;
        }else{
            bounceY = 0;
        }

        //assign new velocity to player
        if (object2 instanceof BouncingBomb){
            console.log('explode');
            this.explosionReaction(this.wizard, object2);
        }else{
            this.wizard.body.setVelocity(bounceX * 200, bounceY * 100);
        }
        console.log(this.wizard.body.velocity.x);
        console.log(this.wizard.body.velocity.y);

        //reset devil player if death
        if (this.wizard.hp <= 0){
            this.wizard.resetStatus();
            this.restart();
        }

        //destroy trap
        object2.destroy();
    }

    /**
     * Handle player collision with bomb, assign new velocity to player
     *
     * @param player - the player sprite
     * @param bomb - the Bouncing bomb sprite
     */
    explosionReaction(player, bomb){
        let magnitudeX = Math.pow(player.x - bomb.x, 2);
        let magnitudeY = Math.pow(player.y - bomb.y, 2);
        let magnitude = Math.pow(magnitudeX + magnitudeY, 0.5);
        let Vx = (player.x - bomb.x)/magnitude * SAVES.BOMB.BombKnockBackSpeed;
        let Vy = (player.y - bomb.y)/magnitude * SAVES.BOMB.BombKnockBackSpeed;
        player.body.setVelocity(Vx, Vy);
    }

    /**
     * Handle player-overlapping trap interactions
     *
     * @param object1
     * @param object2
     */
    overlappingTrapAction(object1, object2){
        //if player and object2 (a trap) overlaps, freeze player (player trapped), trap destroyed 
        if(object1 instanceof Player && object2 instanceof Beartrap){
            object1.freezePlayer();
            this.time.delayedCall(SAVES.BEARTRAP.BearTrapFreezeTime, object2.destroy, null, object2);
        }
    }

    /**
     * Handle player collision with collectables
     *
     * @param object1
     * @param object2
     */
    collects(object1, object2) {
        let potion = object2 instanceof  Player? object1: object2;
        if (potion instanceof manaPotion){
            this.wizard.mana += 50;
        }
        else if (potion instanceof hpPotion){
            this.wizard.hp += 50;
        }
        object2.destroy();
    }

    /**
     * Restart the devil player, reset position, velocity and play death transition
     */
    restart() {
        //reset the devil player position and velocity
        this.wizard.body.setVelocity(0, 0);
        this.wizard.setX(this.spawnPt.x);
        this.wizard.setY(this.spawnPt.y);

        //play death transition
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

    /**
     * Handle Hero win, destroy current scene and move to end scene, pass scores to end scene.
     */
    HeroWin() {
        //game end, hero wins, go to end scene
        console.log("Hero Wins");
        this.gameover = true;
        this.destroyScene();
        //console.log("destroyed");
        this.scene.start(CST.SCENES.END, {
            winner: 'Hero',
            heroScore: 60,
            devilScore: 20,
            level: this.level
        });
    }

    /**
     * Handle Devil win, destroy current scene and move to end scene, pass scores to end scene.
     */
    DevilWin() {
        //game end devil wins, go to end scene
        console.log("Devil Wins");
        this.gameover = true;
        this.destroyScene();
        //console.log("destroyed");
        this.scene.start(CST.SCENES.END, {
            winner: 'Devil',
            heroScore: 20,
            devilScore: 60,
            level: this.level
        });
    }

    /**
     * Destroy the current game scene
     */
    destroyScene(){
        //console.log(this.collidingTraps.getChildren().length);
        this.destroyGroup(this.collidingTraps);
        this.destroyGroup(this.overlappingTraps);
        this.destroyGroup(this.enemyProjectiles);
        this.destroyGroup(this.playerProjectiles);
        this.destroyGroup(this.collectables);
        this.wizard.destroy();
    }

    /**
     * Destroy and remove each object in a group
     * @param group
     */
    destroyGroup(group){
        let children = group.getChildren();
        for (let i = this.collidingTraps.getChildren().length - 1; i>=0; i--){
            children[i].destroy();
        }
    }

    /**
     * Create a spike at the selected position
     */
    createSpike(){
        let newSpike = new Spike(this, this.tracer.x + CST.CONFIG.TileSize/2, this.tracer.y + CST.CONFIG.TileSize/2);
        this.spikeButton.tint = 0x262626;
        //console.log(newSpike.body.overlapX);
        //console.log(newSpike.body.overlapY);

        //console.log(this.physics.closest(newSpike));

        //disable the button for coolDown
        this.spikeButton.disableInteractive();
        this.time.delayedCall(SAVES.SPIKE.SpikeCoolDown, function(){
            this.spikeButton.clearTint();
            this.spikeButton.setInteractive();
        }, null, this);
    }

    /**
     * Create a bouncingBomb at the selected position
     */
    createBomb() {
        let newBomb = new BouncingBomb(this, this.tracer.x + CST.CONFIG.TileSize/2, this.tracer.y + CST.CONFIG.TileSize/2);
        this.bombButton.tint = 0x262626;

        //disable the button for coolDown
        this.bombButton.disableInteractive();
        this.time.delayedCall(SAVES.BOMB.BombCoolDown, function(){
            this.bombButton.clearTint();
            this.bombButton.setInteractive();
        }, null, this);
    }

    /**
     * Create a BearTrap at the selected position
     */
    createBearTrap() {
        let newBearTrap = new Beartrap(this, this.tracer.x + CST.CONFIG.TileSize/2, this.tracer.y + CST.CONFIG.TileSize/2);
        this.bearTrapButton.tint = 0x262626;

        //disable the button for coolDown
        this.bearTrapButton.disableInteractive();
        this.time.delayedCall(SAVES.BEARTRAP.BearTrapCoolDown, function(){
            this.bearTrapButton.clearTint();
            this.bearTrapButton.setInteractive();
        }, null, this);
    }

    /**
     * Create a Cannon at the selected position
     */
    createCannon() {
        let newCannon = new Cannon(this, this.tracer.x + CST.CONFIG.TileSize/2, this.tracer.y + CST.CONFIG.TileSize/2);
        this.cannonButton.tint = 0x262626;

        //disable the button for coolDown
        this.cannonButton.disableInteractive();
        this.time.delayedCall(SAVES.CANNON.CannonCoolDown, function(){
            this.cannonButton.clearTint();
            this.cannonButton.setInteractive();
        }, null, this);
    }

}