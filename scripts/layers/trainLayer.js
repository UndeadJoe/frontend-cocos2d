var TrainLayer = cc.Layer.extend({
    trainParts: null,
    interval: 0.05,
    ctor: function () {
        this._super();

        this.poleSize = cc.director.getWinSize();

        this.trainParts = [];

        /* create train head */
        this.trainHead = new TrainSprite(asset.simple_car_svg);
        this.trainHead.move(this.poleSize.width / 2, this.poleSize.height / 2);

        this.addChild(this.trainHead);

        this.trainParts.push(this.trainHead);

        // TODO: сделать позже части поезда
        //for (var parts = 1; parts < 10; parts++) {
        //    this.addPart();
        //}

        //this.scheduleUpdate();
    },

    addPart: function() {
        var newPart = new TrainSprite(asset.simple_car_svg),
            size = this.trainParts.length,
            tail = this.trainParts[size - 1] || {};

        /* Изначально новая часть расположена в хвосте */
        newPart.x = tail.x - 50;
        newPart.y = tail.y;

        /* Добавляем объект в качестве потомка слоя */
        this.addChild(newPart);
        this.trainParts.push(newPart);
    },

    moveTrain: function(dir) {
        var up = 1, down = -1, left = -2, right = 2,
            step = 5;

        var trainHead = this.trainParts[0];

        var dirMap = {};
        dirMap[up] = function() {trainHead.move(trainHead.x, trainHead.y + step);};
        dirMap[down] = function() {trainHead.move(trainHead.x, trainHead.y - step);};
        dirMap[left] = function() {trainHead.move(trainHead.x - step, trainHead.y);};
        dirMap[right] = function() {trainHead.move(trainHead.x + step, trainHead.y);};

        if (dirMap[dir] !== undefined) {
            dirMap[dir]();
        }
    },

    moveTrainTo: function(x, y) {
        var trainHead = this.trainParts[0];

        trainHead.moveTo(10, x, y);
    },

    update: function(dt) {
        var left = 2;
        if (this.trainParts[0].x > this.poleSize.width - 80)
            return;

        if (this.counter < this.interval) {
            this.counter += dt;
        } else {
            this.counter = 0;
            this.moveTrain(left);
        }
    }
});