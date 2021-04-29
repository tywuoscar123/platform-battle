import GameScene from "./GameScene";
import {CST} from "../CST";

export default class level7 extends GameScene{
    /**
     * Create level and set level specific parameters
     */
    constructor(){
        super(CST.SCENES.LEVEL7);
        this.level = 7;
        this.frictionCoeffecient = 0.2;
        this.customGravity = 500;
    }

    init() {
        super.init();
    }

    preload() {
        this.load.image('Castletiles', 'assets/CastlePrison/New_tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');
        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');

        this.load.audio('bgm', "assets/Sfx/level7Bgm.mp3");

        super.preload();
    }

    create() {
        this.map = this.add.tilemap('CastlePrison');
        this.map.addTilesetImage('Castletiles');
        this.map.addTilesetImage('CastleBG');
        this.backgroundLayer = this.map.createLayer('Background', 'CastleBG');
        this.platformLayer = this.map.createLayer('Platform', 'Castletiles');

        this.bgm = this.sound.add("bgm", {volume: 0.5});
        this.bgm.play();

        super.create();
    }

    update(time, delta) {
        return super.update(time, delta);
    }
}