import GameScene from "./GameScene";
import {CST} from "../CST";

/**
 * Scene for level 4
 */
export default class level4 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL4);
        this.level = 4;
        this.frictionCoeffecient = 0.2;
        this.customGravity = 350;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('background2', 'assets/sky/background2.png');
        this.load.image('background3', 'assets/sky/background3.png');
        this.load.image('MultiLandscape', 'assets/sky/tiles.png');

        this.load.audio('level4Bgm', "assets/Sfx/level4Bgm.mp3")

        this.load.tilemapTiledJSON('sky', 'assets/tilemaps/sky.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('sky');
        this.map.addTilesetImage('background2');
        this.map.addTilesetImage('background3');
        this.map.addTilesetImage('MultiLandscape');

        this.bgm = this.sound.add("level4Bgm", {volume: 0.2, loop: true});
        this.bgm.play();

        this.backgroundLayer = this.map.createLayer('Background', ['background2', 'background3']);
        this.platformLayer = this.map.createLayer('Platform', 'MultiLandscape');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}