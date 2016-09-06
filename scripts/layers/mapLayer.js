var MapLayer = cc.Layer.extend({
    ctor:function () {
        this._super();

        var tiledMap = cc.TMXTiledMap.create(asset.test_map);
        this.addChild(tiledMap, 0, 1);

        // var childrenArray = tiledMap.getChildren();
        // for (var i = 0; i < childrenArray.length; i++) {
        //     var child = childrenArray[i];
        //     child.getTexture().setAntiAliasTexParameters();
        // }
        // tiledMap.runAction(cc.ScaleBy.create(2, 0.5));
    }
});