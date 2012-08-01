//クラスセット
var Pon = enchant.Class.create(enchant.Sprite,{
	initialize: function(x,y,img,img_num,img_size,button,obj){
		enchant.Sprite.call(this,img_size,img_size);
		this.x = x; this.y = y;
		this.image = img; this.time = 0;
		this.duration = 20; this.frame = 0;
		this.addEventListener('enterframe',function(){
			this.time++;
			this.frame = Math.floor(this.time/this.duration * img_num);
			if(this.time == this.duration) this.remove(obj);
		});
		this.addEventListener(Event.TOUCH_START,function(e){
			for(var i=0;i<button.length;i++)
			{
				var b = button[i];
				if(b.x < e.x && b.y < e.y && b.x + b.width > e.x && b.y + b.height > e.y)
				{
					b.dispatchEvent(e);
				}
			}
		});
		obj.addChild(this);
	},
	remove:  function(obj){obj.removeChild(this);}
});
var Button = enchant.Class.create(enchant.Sprite,{
	initialize: function(x,y,img,img_size,obj){
		enchant.Sprite.call(this,img_size,img_size);
		this.x = x; this.y = y; this.image = img;
		obj.addChild(this);
	},
	remove: function(obj){obj.removeChild(this);}
});

var ShowLabel = Class.create(Label,{
	initialize:function(obj,x,y,text){
		enchant.Label.call(this);
		this.x = x; this.y = y; this.text = text;
		obj.addChild(this);
	}
});
var HitLabel = Class.create(Label,{
	initialize:function(obj,text,color,x,y){
		enchant.Label.call(this);
		this.text = text;
		this.font = "16px monospace";
		this.color = color;
		this.x = x; this.y = y;
		obj.addChild(this);
		this.tick = 0;
		this.addEventListener(Event.ENTER_FRAME, function(){
			this.y -= 0.5;
			this.tick ++;
			if(this.tick>40) obj.removeChild(this);
		});
	}
});
var Bar = Class.create(Sprite,{
	initialize:function(sx,sy,x,y){
		enchant.Sprite.call(this,sx,sy);
		this.x = x; this.y = y;
		var barElement1 = new Surface(280,10);
		var gradObj = barElement1.context.createLinearGradient( 0, 0, 0, 8);
		gradObj.addColorStop(   1, '#7F3F3F');
		gradObj.addColorStop(   0.3, '#3F7F3F');
		barElement1.context.fillStyle = gradObj;
		barElement1.context.fillRect(0,0,this.width,this.height);
		this.image = barElement1;
		this.image.context.beginPath();
		this.image.context.fillRect(20,10,300,20);
	}
});

var Score = Class.create({
	initialize:function(){
		this.score = 0;
		this.Toscore = 0;
	},
	add:function(_score){
		this.Toscore += _score;
	}
});
var Mark = enchant.Class.create(enchant.Sprite, {
    initialize: function (Pobj, x, y, img, img_size, group, obj, lane, button) {
        enchant.Sprite.call(this, img_size, img_size);
        this.x = x; this.y = button[lane].y + 300;
        this.image = img;
        this.bad = Pobj.assets[BAD_SE].clone();
        this.addEventListener(Event.ENTER_FRAME, function (e) {
            this.y -= 1;
            if (-100 > this.y) {
                combo = 0; this.remove(obj);
            }
        });
        this.addEventListener(Event.TOUCH_START, function (e) {
            bx = button[lane].x + 30; bl = button[lane].y;
            for (var i = 0; i < button.length; i++) {
                var b = button[i];
                if (b.x < e.x && b.y < e.y && b.x + b.width > e.x && b.y + b.height > e.y) {
                    b.dispatchEvent(e);
                }
            }
            if (bl - 100 < this.y && bl + 50 > this.y) {
                var judge = bl + 20;
                if (this.y >= judge - 50 && this.y < judge - 2) //Good
                {
                    score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                    var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_GOOD], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);
                }
                else if (this.y >= judge - 2 && this.y < judge + 2) //Excellent
                {
                    score.add(Math.floor(exScore)); combo++; new HitLabel(ShowData, "Excellent", "#cc0000", bx - 20, bl);
                    var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_EXC], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);
                }
                else if (this.y >= judge + 2 && this.y < judge + 20) //Good
                {
                    score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                    var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_GOOD], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);
                }
                else {
                    score.add(0); combo = 0; new HitLabel(ShowData, "Bad", "#cc0066", bx, bl);
                    var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_BAD], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);
                    this.bad.play();
                }
                if (combo > Maxcombo) Maxcombo = combo;
                this.remove(obj);
            }
        });
        obj.addChild(this);
    },
    remove: function (obj) { obj.removeChild(this); }
});