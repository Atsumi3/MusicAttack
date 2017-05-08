//クラス
//花火
var Pon = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, img, img_num, img_size, button, obj) {
        enchant.Sprite.call(this, img_size, img_size);
        this.x = x;
        this.y = y;
        this.image = img;
        this.time = 0;
        this.duration = 20;
        this.frame = 0;
        this.addEventListener('enterframe', function () {
            this.time++;
            this.frame = Math.floor(this.time / this.duration * img_num);
            if (this.time === this.duration) this.remove(obj);
        });
        this.addEventListener(Event.TOUCH_START, function (e) {
            for (var i = 0; i < button.length; i++) {
                var b = button[i];
                if (b.x < e.x && b.y < e.y && b.x + b.width > e.x && b.y + b.height > e.y) {
                    b.dispatchEvent(e);
                }
            }
        });
        obj.addChild(this);
    },
    remove: function (obj) {
        obj.removeChild(this);
    }
});

var TouchArea = enchant.Class.create(enchant.Sprite, {
    initialize: function (x, y, img, img_size, obj) {
        enchant.Sprite.call(this, img_size, img_size);
        this.x = x;
        this.y = y;
        this.image = img;
        obj.addChild(this);
    },
    remove: function (obj) {
        obj.removeChild(this);
    }
});

var ShowLabel = Class.create(Label, {
    initialize: function (obj, x, y, text) {
        enchant.Label.call(this);
        this.x = x;
        this.y = y;
        this.text = text;
        obj.addChild(this);
    }
});

var HitLabel = Class.create(Label, {
    initialize: function (obj, text, color, x, y) {
        enchant.Label.call(this);
        this.text = text;
        this.font = "16px monospace";
        this.color = color;
        this.x = x;
        this.y = y;
        obj.addChild(this);
        this.tick = 0;
        this.addEventListener(Event.ENTER_FRAME, function () {
            this.y -= 0.5;
            this.tick++;
            if (this.tick > 40) obj.removeChild(this);
        });
    }
});

var Bar = Class.create(Sprite, {
    initialize: function (sx, sy, x, y) {
        enchant.Sprite.call(this, sx, sy);
        this.x = x;
        this.y = y;
        var barElement1 = new Surface(10, barWidth);
        var gradObj = barElement1.context.createLinearGradient(0, 0, barWidth / 2, 32);
        gradObj.addColorStop(1, '#7F3F3F');
        gradObj.addColorStop(0.3, '#3F7F3F');
        barElement1.context.fillStyle = gradObj;
        barElement1.context.fillRect(0, 0, this.width, this.height);
        this.image = barElement1;
        this.image.context.beginPath();
        this.image.context.fillRect(20, 10, 300, 20);
    }
});

var Score = Class.create({
    initialize: function () {
        this.score = 0;
        this.Toscore = 0;
    },
    add: function (_score) {
        this.Toscore += _score;
        console.log("----------------------------");
        console.log("SCORE   ->" + this.score);
        console.log("TOSCORE ->" + this.Toscore);
    }
});

Results = Class.create(MutableText, {
    initialize: function (_x, _y) {
        MutableText.call(this, _x, _y, game.width, "");
    }
});