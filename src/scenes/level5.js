import GameScene from "./GameScene";
import {CST} from "../CST";

/**
 * Scene for level 5
 */
export default class level5 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL5);
        this.level = 5;
        this.frictionCoeffecient = 0.4;
        this.customGravity = 550;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('background', 'assets/dust/background.png');
        this.load.image('othertiles', 'assets/dust/othertiles.png');
        this.load.image('sandytiles', 'assets/dust/sandytiles.png');

        this.load.tilemapTiledJSON('dust', 'assets/tilemaps/dust.json');
        super.preload();
    }

    create() {
        this.map = this.add.tilemap('dust');
        this.map.addTilesetImage('background');
        this.map.addTilesetImage('othertiles');
        this.map.addTilesetImage('sandytiles');

        this.backgroundLayer = this.map.createLayer('Background', 'background');
        this.platformLayer = this.map.createLayer('Platform', ['othertiles', 'sandytiles']);
        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}