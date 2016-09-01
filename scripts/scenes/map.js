var MapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var size = cc.director.getWinSize();

        var train_layer = new TrainLayer();
        this.addChild(train_layer, 0);

        var label = cc.LabelTTF.create("My Game", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        // var moveBy = new cc.MoveBy(10, 50, 10);
        // train.runAction(moveBy);
    }
});