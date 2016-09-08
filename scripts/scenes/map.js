var MapScene = cc.Scene.extend({
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
                            this.prevX = map_layer.convertToNodeSpace(event.getLocation()).x;
                            this.prevY = map_layer.convertToNodeSpace(event.getLocation()).y;
                            console.log( "Left mouse button pressed at " + this.prevX + ":" + this.prevY);
                        }
                    },

                    onMouseMove: function(event)
                    {
                        if ( event.getButton() == cc.EventMouse.BUTTON_LEFT )
                        {
                            var newPosition = cc.p(event.getLocation().x, event.getLocation().y);
                           // newPosition = cc.director.convertToGL(newPosition);
                            newPosition = map_layer.convertToNodeSpace(newPosition);

                            //newPosition = cc.pSub(newPosition, map_layer._map.getPosition());
                            console.log(map_layer._map.getPosition());

                            var diff = cc.pSub(newPosition, map_layer.currentPosition);

                            if ( Math.abs(diff.x) > Math.abs(diff.y) ) {
                                if (diff.x > 0) {
                                    newPosition.x += map_layer._map.getTileSize().width;
                                } else {
                                    newPosition.x -= map_layer._map.getTileSize().width;
                                }
                            } else {
                                if (diff.y > 0) {
                                    newPosition.y += map_layer._map.getTileSize().height;
                                } else {
                                    newPosition.y -= map_layer._map.getTileSize().height;
                                }
                            }

                            // safety check on the bounds of the map
                            if (newPosition.x <= (map_layer._map.getMapSize().width * map_layer._map.getTileSize().width) &&
                                newPosition.y <= (map_layer._map.getMapSize().height * map_layer._map.getTileSize().height) &&
                                newPosition.y >= 0 &&
                                newPosition.x >= 0 )
                            {
                                map_layer.moveView(newPosition);
                            }

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