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
        // var winSize = cc.director.getWinSize();
        //
        // var x = Math.max(position.x, winSize.width/2);
        // var y = Math.max(position.y, winSize.height/2);
        // x = Math.min(x, (this._map.getMapSize().width * this._map.getTileSize().width) - winSize.width / 2);
        // y = Math.min(y, (this._map.getMapSize().height * this._map.getTileSize().height) - winSize.height / 2);
        // var actualPosition = cc.p(x, y);
        //
        // var centerOfView = cc.p(winSize.width/2, winSize.height/2);
        // var viewPoint = cc.pSub(centerOfView, actualPosition);
        this._map.setPosition(position);
    }
});