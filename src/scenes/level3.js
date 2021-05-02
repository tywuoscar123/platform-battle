import GameScene from "./GameScene";
import {CST} from "../CST";

/**
 * Scene for level 3
 */
export default class level3 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL3);
        this.level = 3;
        this.frictionCoeffecient = 0.15;
        this.customGravity = 600;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('CaveTiles', 'assets/Cave/CaveTiles.png');
        this.load.image('CaveBG', 'assets/Cave/CaveBG.png');
        
        //load audio
        this.load.audio('caveBgm', "assets/Sfx/dungeonBgm.mp3")

        this.load.tilemapTiledJSON('Cave', 'assets/tilemaps/Cave.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('Cave');
        this.map.addTilesetImage('CaveTiles');
        this.map.addTilesetImage('CaveBG');

        this.bgm = this.sound.add("caveBgm", {volume: 0.1, loop: true});
        this.bgm.play();

        this.backgroundLayer = this.map.createLayer('Background', 'CaveBG');
        this.platformLayer = this.map.createLayer('Platform', 'CaveTiles');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}