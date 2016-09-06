var MapScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var size = cc.director.getWinSize();

        var train_layer = new TrainLayer();
        this.addChild(train_layer, 0);

        var label = cc.LabelTTF.create("My Game", "Arial", 40);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        var _listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "game_custom_event1",
            callback: function(event){
                var data = event.getUserData();
                var moveTo = new cc.MoveTo(10, data.x, data.y);
                train_layer.trainParts[0].runAction(moveTo);
            }
        });
        console.log('1');
        cc.eventManager.addListener(_listener1, 1);

        // var moveBy = new cc.MoveBy(10, 50, 10);
        // train.runAction(moveBy);
    }
});