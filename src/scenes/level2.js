import GameScene from "./GameScene";
import {CST} from "../CST";

export default class level2 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL2);
        this.level = 2;
        this.frictionCoeffecient = 0.05;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('MultiLandscape', 'assets/MultiLandscape/tiles.png');
        this.load.image('BlueWinter', 'assets/Backgrounds/BlueWinter.png');

        this.load.tilemapTiledJSON('Iceland', 'assets/tilemaps/Iceland.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('Iceland');
        this.map.addTilesetImage('MultiLandscape');
        this.map.addTilesetImage('BlueWinter');

        this.backgroundLayer = this.map.createLayer('Background', 'BlueWinter');
        this.platformLayer = this.map.createLayer('Platform', 'MultiLandscape');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}