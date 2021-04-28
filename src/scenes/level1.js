import GameScene from "./GameScene";
import {CST} from "../CST";

export default class level1 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL1);
        this.level = 1;
        this.frictionCoeffecient = 0.3;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('MultiLandscape', 'assets/MultiLandscape/tiles.png');
        this.load.image('SunnyBG', 'assets/Backgrounds/sunnyBG.png');

        this.load.tilemapTiledJSON('Grassland', 'assets/tilemaps/Grassland.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('Grassland');
        this.map.addTilesetImage('MultiLandscape');
        this.map.addTilesetImage('SunnyBG');

        this.backgroundLayer = this.map.createLayer('Background', 'SunnyBG');
        this.platformLayer = this.map.createLayer('Platform', 'MultiLandscape');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}