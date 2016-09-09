var MapScene = cc.Scene.extend({
    previousPos: { x: 0, y: 0 },
    newPos: { x: 0, y: 0 },
    onEnter:function () {
        this._super();

        var size = cc.director.getWinSize();

        var map_layer = new MapLayer();
        this.addChild(map_layer, 0);

        var train_layer = new TrainLayer();
        this.addChild(train_layer, 1);

        var label = cc.LabelTTF.create("My Game", "Arial", 18);
        label.setPosition(size.width / 2, size.height / 2);
        label.setColor(0,0,0);
        this.addChild(label, 2);

        var _listener1 = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: "change_position",
            callback: function(event){
                var data = event.getUserData();
                var moveTo = new cc.MoveTo(3, cc.p(data.x, data.y));
                train_layer.trainParts[0].runAction(moveTo);
                label.setString(train_layer.trainParts[0].x + ':' + train_layer.trainParts[0].y);
            }
        });
        cc.eventManager.addListener(_listener1, 1);

        // checks if the device you are using is capable of mouse input
        if ( cc.sys.capabilities.hasOwnProperty( 'mouse' ) )
        {
            cc.eventManager.addListener(
                {
                    event: cc.EventListener.MOUSE,

                    onMouseDown: function(event)
                    {
                        if ( event.getButton( ) == cc.EventMouse.BUTTON_LEFT )
                        {
                            this.previousPos = map_layer.convertToNodeSpace(event.getLocation());
                        }
                    },

                    onMouseMove: function(event)
                    {
                        if ( event.getButton() == cc.EventMouse.BUTTON_LEFT )
                        {
                            this.newPos = map_layer.convertToNodeSpace(event.getLocation());
                            var diff = cc.pSub(this.previousPos, this.newPos);

                            var newPosition = cc.pSub(map_layer._map.getPosition(), diff);

                            map_layer.moveView(newPosition);

                            this.previousPos = map_layer.convertToNodeSpace(event.getLocation());
                        }
                    },

                    onMouseScroll: function(event)
                    {
                        console.log( "Scroll: " + event.getLocationX( ) );
                    }
                }, this );
        }

        // var moveBy = new cc.MoveBy(10, 50, 10);
        // train.runAction(moveBy);
    }
});