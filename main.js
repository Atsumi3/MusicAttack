window.onload = function () {
    var game = new Game(320, 320);
    game.fps = 60;
    game.time = 0;
    game.ending = false;
    game.Showres = false;
    game.preload(
        SET_ANIM_EXC,
        SET_ANIM_GOOD,
        SET_ANIM_BAD,
        SET_MARK,
        SET_PROG,
        BACK_IMG,
        Music,
        FULL_COMBO,
        BAD_SE,
        SCORE_BACK_IMG,
        RESULT_IMG
        );

    game.rootScene.backgroundColor = "#6699cc";
    var EndTime = (M_time * game.fps) + 60;
    var score = Score();
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
                        god++;
                        score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                        var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_GOOD], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);

                    }
                    else if (this.y >= judge - 2 && this.y < judge + 2) //Excellent
                    {
                        exc++;
                        score.add(Math.floor(exScore)); combo++; new HitLabel(ShowData, "Excellent", "#cc0000", bx - 20, bl);
                        var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_EXC], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);

                    }
                    else if (this.y >= judge + 2 && this.y < judge + 20) //Good
                    {
                        god++;
                        score.add(Math.floor(exScore * 0.8)); combo++; new HitLabel(ShowData, "Good", "#ccff00", bx, bl);
                        var blast = new Pon(this.x - 72, this.y - 60, Pobj.assets[SET_ANIM_GOOD], SET_ANIM_NUM, SET_ANIM_x, this, Pobj.rootScene);

                    }
                    else {
                        bad++;
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

    game.onload = function () {

        var bg = new Sprite(320, 320);
        bg.image = game.assets[BACK_IMG];
        game.rootScene.addChild(bg);

        var scoreBack = new Sprite(160, 60);
        scoreBack.image = game.assets[SCORE_BACK_IMG];
        scoreBack.x = 80; scoreBack.y = -15;
        scoreBack.scaleX = 2.1; scoreBack.scaleY = 0.7;
        ShowData.addChild(scoreBack);

        var CircleS = new Surface(MSize, MSize);
        CircleS.drawCircle(50, 50, 30);
        for (var i = 0; i < 3; i++) button[i] = new Button(calc(32, i), (i == 1) ? 32 : 80, CircleS, MSize, GameField);

        var bar = new Bar(15, barWidth, 13, 40);
        var progress1 = new Sprite(20, 20);
        progress1.x = 10; progress1.y = barWidth + 30;
        progress1.image = game.assets[SET_PROG];

        var bar2 = new Bar(15, barWidth, 290, 40);
        var progress2 = new Sprite(20, 20);
        progress2.x = 287; progress2.y = barWidth + 30;
        progress2.image = game.assets[SET_PROG];

        var showScore = new MutableText(2, 5, game.width, "");
        showScore.scaleX = 0.9; showScore.scaleY = 0.9;
        var showCombo = new MutableText(this.width / 2 + 20, 5, game.width, "");
        showCombo.scaleX = 0.9; showCombo.scaleY = 0.9;

        var showMaxCombo = new MutableText(this.width / 2 + 20, 5, game.width, "");
        var showBad = new MutableText(this.width / 2 + 20, 5, game.width, "");
        var showGood = new MutableText(this.width / 2 + 20, 5, game.width, "");
        var showExce = new MutableText(this.width / 2 + 20, 5, game.width, "");

        ShowData.addChild(showScore);
        ShowData.addChild(showCombo);
        var ResultScore;
        var ResultBad;
        var ResultGood;
        var ResultExce;
//a
        var res = new Scene(); ; //リザルト画面
        var bgi = new Sprite(320, 320);
        bgi.image = game.assets[RESULT_IMG];
        res.addChild(bgi);
        res.addEventListener(Event.ENTER_FRAME, function(){
        	game.Showres = true;
        });
        res.addEventListener(Event.TOUCH_START, function(){
            game.ending = true;
            game.popScene(this);
        });

        game.addMark = function (ary, frame, count) {
            for (var i = EndMark; i < count; i++) {
                if ((ary[i][0] - 299) == frame) {
                    new Mark(game, calc(52, ary[i][1]), 60, game.assets[SET_MARK], 60, mark, lane, ary[i][1], button);
                    EndMark++;
                }
            }
        }

        game.addEventListener(Event.ENTER_FRAME, function () {
        	if(game.ending)
        	{
        		game.end(score.score * 10, "あなたのスコアは" + score.score * 10 + "点です！");
        	}

            var time = Math.floor(game.assets[Music].currentTime * game.fps);

            if (score.Toscore >= score.score) {
                var a = score.Toscore - score.score;
                if (a >= 1 && a < 10) score.score += 1;
                if (a >= 10 && a < 100) score.score += 1;
                if (a >= 100 && a < 1000) score.score += 10;
                if (a >= 1000 && a < 10000) score.score += 100;
                if (a >= 10000 && a < 100000) score.score += 1000;
            }

            if (gameStart) {

                game.assets[Music].play();
                game.time++;

                this.addMark(setMark, time, elem);
                if (game.time % game.fps == 0 && Math.floor(game.time / game.fps) <= M_time) {
                    progress1.y -= seekW; progress2.y -= seekW;
                }

                if (game.time == EndTime) {
                    console.log("****** WOOW ***" + time);
                    score.add(Maxcombo * exScore);

                    gameStart = false;
                    if (combo == elem) game.assets[FULL_COMBO].play();
                }
            } else {
                game.assets[Music].stop();
                if (score.score > 100 && score.score == score.Toscore) {
                    ShowData.removeChild(showCombo);

                    ResultScore = showScore;
                    ResultScore.x = 70; ResultScore.y = 130;
                    ResultScore.scaleX = 1.2; ResultScore.scaleY = 1.2;
                    ResultScore._element.style.zIndex = 500;
                    res._element.style.zIndex = 500;

                    ResultCombo = showMaxCombo;
                    ResultCombo.x = 70; ResultCombo.y = 160;
                    ResultCombo.setText("MAXCOMBO " + Maxcombo);
                    ResultCombo.scaleX = 1.2; ResultCombo.scaleY = 1.2;
                    ResultCombo._element.style.zIndex = 500;

                    ResultGood = showExce;
                    ResultGood.x = 290;
                    ResultGood.y = 215;
                    ResultGood.setText("" + exc);
                    ResultGood.scaleX = 1.2;
                    ResultGood.scaleY = 1.2;
                    ResultGood._element.style.zIndex = 500;

                    ResultExce = showGood;
                    ResultExce.x = 290;
                    ResultExce.y = 250;
                    ResultExce.setText("" + god);
                    ResultExce.scaleX = 1.2;
                    ResultExce.scaleY = 1.2;
                    ResultExce._element.style.zIndex = 500;

                    ResultBad = showBad;
                    ResultBad.x = 290;
                    ResultBad.y = 285;
                    ResultBad.setText("" + bad);
                    ResultBad.scaleX = 1.2;
                    ResultBad.scaleY = 1.2;
                    ResultBad._element.style.zIndex = 500;


                    res.addChild(ResultCombo);
                    res.addChild(ResultExce);
                    res.addChild(ResultGood);
                    res.addChild(ResultBad);
                    res.addChild(ResultScore);
                    if(!game.Showres)game.pushScene(res);
                }
            }
            showScore.setText("SCORE " + score.score * 10);
            showCombo.setText("COMBO " + combo);
        });
        game.rootScene.addChild(GameField);
        game.rootScene.addChild(lane);
        game.rootScene.addChild(ShowData);
        game.rootScene.addChild(bar);
        game.rootScene.addChild(bar2);
        game.rootScene.addChild(progress1);
        game.rootScene.addChild(progress2);
    }
    game.start();
};
