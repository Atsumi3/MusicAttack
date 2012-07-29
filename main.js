window.onload = function () {
    var game = new Game(320, 320);
    game.fps = 60;
    game.time = 0;
    game.preload(SET_ANIM, SET_MARK, SET_PROG, BACK_IMG, Music, FULL_COMBO);

    game.rootScene.backgroundColor = "#6699cc";
    var EndTime = (M_time * game.fps) + 60;
    var score = Score();
    var Mark = enchant.Class.create(enchant.Sprite, {
        initialize: function (Pobj, x, y, img, img_size, group, obj, lane, button) {
            enchant.Sprite.call(this, img_size, img_size);
            this.x = x; this.y = button[lane].y + 300;
            this.image = img;
            this.addEventListener(Event.ENTER_FRAME, function (e) {
                this.y -= 1;
                if (-100 > this.y) {
                    combo = 0;
                    this.remove(obj);
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
                    var blast = new Pon(this.x - 72, this.y - 60, game.assets[SET_ANIM], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);
                    if (this.y >= judge - 50 && this.y < judge - 2) //Good
                    {
                        score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                    }
                    else if (this.y >= judge - 2 && this.y < judge + 2) //Excellent
                    {
                        score.add(Math.floor(exScore)); combo++; new HitLabel(ShowData, "Excellent", "#cc0000", bx - 20, bl);
                    }
                    else if (this.y >= judge + 2 && this.y < judge + 50) //Good
                    {
                        score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                    }
                    else {
                        score.add(0); combo = 0; new HitLabel(ShowData, "Bad", "#cc0066", bx, bl);
                    }
                    if (combo > Maxcombo) Maxcombo = combo;
                    this.remove(obj);
                }
            });
            obj.addChild(this);
        },
        remove: function (obj) { obj.removeChild(this); }
    });

    game.onload = function () {

        var bg = new Sprite(320, 320);
        bg.image = game.assets[BACK_IMG];
        game.rootScene.addChild(bg);

        var CircleS = new Surface(MSize, MSize);
        CircleS.drawCircle(50, 50, 30);
        for (var i = 0; i < 3; i++) button[i] = new Button(calc(12, i), (i == 1) ? 32 : 80, CircleS, MSize, GameField);

        var bar = new Bar(280, 10, 20, 5);
        var progress = new Sprite(20, 20);
        progress.x = 10; progress.y = 0;
        progress.image = game.assets[SET_PROG];

        //var showInfo = new ShowLabel(ShowData,10,200,format("曲　 名：{0}<br>作曲者：{1}<br>ＭＯＤＥ：{2}",Title,Composer,Diff));
        var status = new ShowLabel(ShowData, 230, 200, format("SCORE：{0}<br>COMBO：{1}", score.score * 10, combo));

        game.addMark = function (ary, frame, count) {
            for (var i = EndMark; i < count; i++) {
                if ((ary[i][0] - 299) == frame) {
                    new Mark(game, calc(32, ary[i][1]), 60, game.assets[SET_MARK], 60, mark, lane, ary[i][1], button);
                    EndMark++;
                }
            }
        }
        game.addEventListener(Event.ENTER_FRAME, function () {
            var time = Math.floor(game.assets[Music].currentTime * game.fps);
            if (NowPlay < Math.floor(game.assets[Music].currentTime))
            { NowPlay = Math.floor(game.assets[Music].currentTime); }
            if (gameStart && NowPlay == Math.floor(game.assets[Music].currentTime)) {
                game.assets[Music].play();
            } else {
                game.assets[Music].stop();
            }
            if (gameStart) {
                game.time++;
                this.addMark(setMark, time, elem);
                if (game.time % game.fps == 0 && Math.floor(game.time / game.fps) <= M_time) progress.x += seekW;
                status.text = format("SCORE：{0}<br>COMBO：{1}", score.score * 10, combo);
                if (score.Toscore >= score.score) {
                    var a = score.Toscore - score.score;
                    if (a >= 1 && a < 10) score.score += 1;
                    if (a >= 10 && a < 100) score.score += 1;
                    if (a >= 100 && a < 1000) score.score += 10;
                    if (a >= 1000 && a < 10000) score.score += 100;
                    if (a >= 10000 && a < 100000) score.score += 1000;
                }
                if (game.time == EndTime) {
                    NowPlay = 65535;
                    score.add(Maxcombo * exScore);
                    if (combo == elem) game.assets[FULL_COMBO].play();
                    PlayFlag = false;
                    game.end(score.score * 10, "あなたのスコアは" + score.score * 10);
                }
            }
        });
        game.rootScene.addChild(GameField);
        game.rootScene.addChild(lane);
        game.rootScene.addChild(ShowData);
        game.rootScene.addChild(bar);
        game.rootScene.addChild(progress);
    }
    game.start();
};