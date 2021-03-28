import { CST } from "../CST";
export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        })
    }
    init(){

    }

    preload() {
        this.load.image('Castletiles', 'assets/CastlePrison/New tiles.png');
        this.load.image('CastleBG', 'assets/CastlePrison/Background.png');

        this.load.tilemapTiledJSON('CastlePrison', 'assets/tilemaps/CastlePrison.json');
    }
    create() {
        const castleMap = this.add.tilemap('CastlePrison');

        castleMap.addTilesetImage('Castletiles');
        castleMap.addTilesetImage('CastleBG');

        const backgroundLayer = castleMap.createLayer('Background', 'CastleBG');
        const platformLayer = castleMap.createLayer('Platform', 'Castletiles');

        platformLayer.setCollisionByProperty({collides:  true});
    }
}