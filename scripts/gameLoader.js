window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload([asset.HelloWorld_png, asset.test_map_texture, asset.test_map], function () {

            cc.director.runScene(new MapScene());
        }, this);
    };
    cc.game.run("gameCanvas");
};