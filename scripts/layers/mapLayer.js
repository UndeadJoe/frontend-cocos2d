var MapLayer = cc.Layer.extend({
    currentPosition: null,
    ctor:function (space) {
        this._super();

        this.init();
    },
    init:function () {
        this._super();

        this.visible = cc.director.getVisibleSize();

        this.currentPosition = cc.p(0,0);

        this._map = new cc.TMXTiledMap(asset.test_map);
        this._map.setScale(1);
        this._map.setAnchorPoint(cc.p(0,0));
        this.moveView(this.currentPosition);

        this.addChild(this._map);
    },
    moveView: function (position) {
        this._map.setPosition(position);
    },
    moveViewBy: function (diff) {
        var position = cc.pSub(this._map.getPosition(), diff);
        var winSize = cc.director.getWinSize();
        var x = Math.min(position.x, 0);
        var y = Math.min(position.y, 0);
        x = Math.max(x, (-1)*((this._map.getMapSize().width * this._map.getTileSize().width)*this._map.getScale() - winSize.width));
        y = Math.max(y, (-1)*((this._map.getMapSize().height * this._map.getTileSize().height)*this._map.getScale() - winSize.height));

        this._map.setPosition(cc.p(x, y));
    }
});