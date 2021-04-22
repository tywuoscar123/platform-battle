import Phaser from 'phaser';

export default class Utils{
    /**
     * Create a Utility functions object for a scene for creating UI
     * @param Scene
     */
    constructor(Scene) {
        this.currentScene = Scene;
    }

    /**
     * Create a text button in the scene
     *
     * @param x - x coordinate of the button
     * @param y - y coordinate of the button
     * @param text - the text of the button
     * @param style - the style of the text
     * @param originalColor - the originally color of the text
     * @param overColor - the color of text when mouse over
     * @returns {*} a text button
     */
    createTextButton(x, y, text, style, originalColor, overColor){
        //create an interactive text button
        let textButton = this.currentScene.add.text(x, y, text, style).setOrigin(0.5);
        textButton.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);

        //set color when mouse over
        textButton.on('pointerover', function() {
            this.setFill(overColor);
        });
        //set to original text color when mouse is not over
        textButton.on('pointerout', function() {
            this.setFill(originalColor);
        });
        return textButton;
    }

    /**
     * Create a image button for the scene
     *
     * @param x - x coordinate of the button
     * @param y - y coordinate of the button
     * @param image - the image of the button
     * @returns {*} an image button
     */
    createImageButton(x, y, image){
        //create an interactive image button
        let imageButton = this.currentScene.add.sprite(x,y, image, 0);
        imageButton.setInteractive();
        //imageButton.displayWidth = 80;
        //imageButton.displayHeight = 80;

        //set transparency when mouse over to show selected button
        imageButton.on('pointerover', function () {
            this.alpha = 0.5;
        });
        //reset transparency is no longer selected the button
        imageButton.on('pointerout', function () {
            this.alpha = 1;
        });
        return imageButton;
    }

}