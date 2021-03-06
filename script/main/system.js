enchant();


//***グローバル変数***//
var barWidth = 250;
var combo = 0;
var Maxcombo = 0;
var EndMark = 0; //終わった譜面カウント
var NowPlay = 0;//連続再生防止用

var button = []; //領域配列
var mark = []; //マーク配列

var Title = music[0];
var Music = music[1];
var M_time = music[2];
var Composer = music[3];
var Diff = music[4];
var seekW = barWidth / M_time; //進行度

//*** 判定格納 ***/
var exc = 0;
var god = 0;
var bad = 0;


//***グループ***//
var ShowData = Group();  //スコア等
var GameField = Group(); //♂領域
var lane = new Group();    //マーク
//***グローバル関数***//
function format(fmt) {
    for (i = 1; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + (i - 1) + "\\}", "g")
        fmt = fmt.replace(reg, arguments[i]);
    }
    return fmt;
}
function calc(base, val) {
    return res = base + val * 72;
}
function calc_note(ary) {
    var count = 0;
    var i = 100;
    while (ary[i] !== 'end') {
        count++;
        i++;
        if (count > 3000) break;
    }
    return count;
}

function readMark(ary, count) {
    var result = ary[100 + count].split(":");
    return [result[0], result[1]];
}

Surface.prototype.drawCircle = function (x, y, r) {
    this.context.beginPath();
    this.context.arc(x, y, r, 0, Math.PI * 2, true);
    this.context.stroke();
}

var elem = calc_note(music);
var setMark = [];
for (var i = 0; i < elem; i++) {
    setMark[i] = readMark(music, i);
}
var exScore = Math.floor(50000 / elem);