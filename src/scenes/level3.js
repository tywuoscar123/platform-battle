import GameScene from "./GameScene";
import {CST} from "../CST";

export default class level3 extends GameScene{
    constructor(){
        super(CST.SCENES.LEVEL3);
        this.level = 3;
        this.frictionCoeffecient = 0.15;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('CaveTiles', 'assets/Cave/CaveTiles.png');
        this.load.image('CaveBG', 'assets/Cave/CaveBG.png');

        this.load.tilemapTiledJSON('Cave', 'assets/tilemaps/Cave.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('Cave');
        this.map.addTilesetImage('CaveTiles');
        this.map.addTilesetImage('CaveBG');

        this.backgroundLayer = this.map.createLayer('Background', 'CaveBG');
        this.platformLayer = this.map.createLayer('Platform', 'CaveTiles');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}