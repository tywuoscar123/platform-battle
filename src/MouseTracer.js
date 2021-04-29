import Phaser from "phaser";
import { CST } from "./CST";

/**
 * A rectangle in the level scene to show the selected location of the hero player
 */
export default class MouseTracer {
    /**
     * Construct a mouse tracer as a while square on the screen for trap location selection
     *
     * @param scene
     * @param map
     */
    constructor(scene, map) {
        this.map = map;
        this.scene = scene;

        //draw a rectangle to show tile selected by hero player
        this.x = CST.CONFIG.TileSize*3;
        this.y = 0;

        this.graphics = scene.add.graphics({
            x: this.x,
            y: this.y
        });
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);
    }

    update() {
        //update the selected tile if clicked
        const pointer = this.scene.input.activePointer;

        //ignore click if outside the custom bound
        if (pointer.x < CST.CONFIG.TileSize*3 || pointer.y < 0 || pointer.x > CST.CONFIG.GameX - CST.CONFIG.TileSize*3 || pointer.y > CST.CONFIG.GroundY ){
            return;
        }

        if (pointer.isDown){
            //change the coordinate of the click to snap on a square in the map
            const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
            const pointerTileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y);
            const snappedPoint = this.map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

            //update the position of the mouse tracer
            this.graphics.setPosition(snappedPoint.x, snappedPoint.y);
            this.x = snappedPoint.x;
            this.y = snappedPoint.y;
        }
    }

    /**
     * Remove and destroy the mouse tracer square
     */
    destroy() {
        this.graphics.destroy();
    }
}
