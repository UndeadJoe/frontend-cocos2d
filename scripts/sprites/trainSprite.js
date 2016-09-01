var TrainSprite = cc.Sprite.extend({
    prevX: this.x,
    prevY: this.y,
    ctor: function(sprite) {
        this._super(sprite);
        this.setScale(0.8);
    },
    move: function(posX, posY) {
        // Save current position
        this.prevX = this.x;
        this.prevY = this.y;
        // Refresh current position 
        this.x = posX;
        this.y = posY;
    }
});