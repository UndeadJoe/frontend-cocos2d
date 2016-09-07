var MapLayer = cc.Layer.extend({
    ctor:function (space) {
        this._super();

        this.init();
    },
    init:function () {
        this._super();

        this._map = new cc.TMXTiledMap(asset.test_map);
        this._map.setAnchorPoint(cc.p(0,0));
        this._map.setPosition(cc.p(0,0));
        this._map.setScaleX(1);
        this._map.setScaleY(1);

        this.addChild(this._map);
    },
    moveView: function (position) {
        var currentPosition = this._map.getPosition();
        var newPosition = cc.p(currentPosition.x - position.x, currentPosition.y - position.y);

        console.log(newPosition, currentPosition, position);

        this._map.setPosition(newPosition);
    }
});