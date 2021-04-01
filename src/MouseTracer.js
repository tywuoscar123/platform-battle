import Phaser from "phaser";
import { CST } from "./CST";

export default class MouseTracer {
    constructor(scene, map) {
        this.map = map;
        this.scene = scene;

        //draw a rectangle to show tile selectd by hero player
        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);
        this.x = 0;
        this.y = 0;
    }

    update() {
        //update the selected tile if clicked
        const pointer = this.scene.input.activePointer;
        if (pointer.x < 0 || pointer.y < 0 || pointer.x > CST.CONFIG.GameX || pointer.y > CST.CONFIG.GameY ){
            return;
        }

        if (pointer.isDown){
            const worldPoint = pointer.positionToCamera(this.scene.cameras.main);
            const pointerTileXY = this.map.worldToTileXY(worldPoint.x, worldPoint.y);
            const snappedPoint = this.map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
            this.graphics.setPosition(snappedPoint.x, snappedPoint.y);
            this.x = snappedPoint.x;
            this.y = snappedPoint.y;
        }
    }

    destroy() {
        this.graphics.destroy();
    }
}
