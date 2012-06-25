enchant();

//**定数セット**//
var MSize = 100; //ボタンの大きさ
var BACK_IMG = "img/back.jpg";
var Title = music[0];
var Music = music[1];
var M_time = music[2];
var Composer = music[3];
var Diff = music[4];
var SET_ANIM = "img/hanabi.png";
var SET_ANIM_x = 200; //アニメーション画像の横幅
var SET_ANIM_NUM = 12; //枚数
var SET_MARK = "img/mark.gif";
var SET_PROG = "img/seek.png";
var FULL_COMBO = "song/fullcombo.mp3"; //フルコンボの音
var PlayFlag = true;

//***グローバル変数***//
var combo = 0;
var Maxcombo = 0;
var EndMark = 0; //終わった譜面カウント
var seekW = 280 /M_time; //進行度
var NowPlay = 0;//連続再生防止用

var button = []; //領域配列
var mark = []; //マーク配列

//***グループ***//
var ShowData = Group();  //スコア等
var GameField = Group(); //♂領域
var lane = new Group();    //マーク
//***グローバル関数***//
function format(fmt) {
  for (i = 1; i < arguments.length; i++) {
    var reg = new RegExp("\\{" + (i - 1) + "\\}", "g")
    fmt = fmt.replace(reg,arguments[i]);
  }
  return fmt;
}
function calc(base,val){
	return res = base + val*96;
}
function calc_note(ary){
	var count = 0;
	var i = 100;
	while(ary[i] != 'end')
	{
		count++; i++;
		if(count> 3000) break;
	}
	return count;
}

function readMark(ary,count)
{
	result = ary[100+count].split(":");
	return [result[0],result[1]];
}

Surface.prototype.drawCircle = function(x,y,r){
	this.context.beginPath();
	this.context.arc(x,y,r,0,Math.PI*2,true);
	this.context.stroke();
}

var elem = calc_note(music);
var setMark = [];
for(var i=0;i<elem;i++)
{
	setMark[i] = readMark(music,i);
}
var exScore = Math.floor(50000/elem);