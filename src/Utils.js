export default class Utils{
    constructor(GameScene) {
        this.GameScene = GameScene;
    }

    createTextButton(x, y, text, style, originalColor, overColor, callback){
        let textButton = this.GameScene.add.text(x, y, text, style).setOrigin(0.5);
        textButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);
        textButton.on('pointerover', function() {
            this.setFill(overColor);
        });
        textButton.on('pointerout', function() {
            this.setFill(originalColor);
        });
        textButton.on('pointerdown', callback, this.GameScene);
        return textButton;
    }

}