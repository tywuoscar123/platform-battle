import Phaser from 'phaser';

export default class Utils{
    constructor(Scene) {
        this.currentScene = Scene;
    }

    createTextButton(x, y, text, style, originalColor, overColor){
        let textButton = this.currentScene.add.text(x, y, text, style).setOrigin(0.5);
        textButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);
        textButton.on('pointerover', function() {
            this.setFill(overColor);
        });
        textButton.on('pointerout', function() {
            this.setFill(originalColor);
        });
        return textButton;
    }

    createImageButton(x, y, image){
        let imageButton = this.currentScene.add.sprite(x,y, image, 0);
        imageButton.setInteractive();
        //imageButton.displayWidth = 80;
        //imageButton.displayHeight = 80;

        imageButton.on('pointerover', function () {
            this.alpha = 0.5;
        });
        imageButton.on('pointerout', function () {
            this.alpha = 1;
        });
        return imageButton;
    }

}