import GameScene from "./GameScene";
import {CST} from "../CST";

export default class level7 extends GameScene{
    constructor(){
        super(CST.SCENES.LEVEL7);
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('Castletiles', 'assets/CastlePrison/New_tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');
        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('CastlePrison');
        this.map.addTilesetImage('Castletiles');
        this.map.addTilesetImage('CastleBG');
        this.backgroundLayer = this.map.createLayer('Background', 'CastleBG');
        this.platformLayer = this.map.createLayer('Platform', 'Castletiles');

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}