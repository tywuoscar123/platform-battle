export default class MouseTracer {
    constructor(scene, map) {
        this.map = map;
        this.scene = scene;

        this.graphics = scene.add.graphics();
        this.graphics.lineStyle(2, 0xffffff, 1);
        this.graphics.strokeRect(0, 0, map.tileWidth, map.tileHeight);
        this.x = 0;
        this.y = 0;
    }

    update() {
        const pointer = this.scene.input.activePointer;
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
