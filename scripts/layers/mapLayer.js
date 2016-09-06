var MapLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var tiledMap = cc.TMXTiledMap.create(asset.test_map);
        this.addChild(tiledMap, 0, 1);

        var layer = tiledMap.getLayer('layer1');

        var tile0 = layer.getTileAt(cc.p(0,0), 0);

        var sprite = new sprite();
        sprite.setAnchorPoint(cc.p(0.5,0.5));
        var x = tile0.getPosition().x + 30;
        var y = tile0.getPosition().y + 72;
        sprite.setPosition(cc.p(x,y));

        this.addChild(layer);

        // var childrenArray = tiledMap.getChildren();
        // for (var i = 0; i < childrenArray.length; i++) {
        //     var child = childrenArray[i];
        //     child.getTexture().setAntiAliasTexParameters();
        // }
        // tiledMap.runAction(cc.ScaleBy.create(2, 0.5));
    }
});