import GameScene from "./GameScene";
import {CST} from "../CST";

/**
 * Scene for level 6
 */
export default class level6 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL6);
        this.level = 6;
        this.frictionCoeffecient = 0.15;
        this.customGravity = 400;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('Background', 'assets/starryNight/thumbnail.png');
        this.load.image('MultiLandscape', 'assets/starryNight/MultiLandscape.png');
        this.load.image('platforms', 'assets/starryNight/tiles.png');

        this.load.audio('nightBgm', "assets/Sfx/nightBgm.mp3");

        this.load.tilemapTiledJSON('starryNight', 'assets/tilemaps/starryNight.json');
        super.preload();
    }

    create() {
        this.map = this.add.tilemap('starryNight');
        this.map.addTilesetImage('Background');
        this.map.addTilesetImage('MultiLandscape');
        this.map.addTilesetImage('platforms');

        this.bgm = this.sound.add("nightBgm", {volume: 0.2, loop: true});
        this.bgm.play();

        this.backgroundLayer = this.map.createLayer('Background', 'Background');
        this.platformLayer = this.map.createLayer('Platform', ['MultiLandscape', 'platforms']);
        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}