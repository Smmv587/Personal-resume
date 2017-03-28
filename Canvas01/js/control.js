//定义全局变量，方便后续更改
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=800;
var RAIDUS=6;
var MARGIN_TOP=50;
var MARGIN_LEFT=100;

const endTime=new Date(2017,3,8,10,30,0);//倒计时截止时间
var curShowTimeSeconds=0;//定义当前时间距离截止时间差值
var balls=[];
const colors=['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','#669900','#ffbb33','#ff8800','#ff4444','#cc0000'];

window.onload=function(){
	
	WINDOW_WIDTH=document.body.clientWidth||document.documentElement.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight||document.documentElement.clientHeight;
	RAIDUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	curShowTimeSeconds=getCurrentShowTimeSeconds();//封装计算当前时间距离截止时间差值的函数
	
	setInterval(
	  function(){
		draw(context);
		update();
	  },100
	);
};

function getCurrentShowTimeSeconds(){
  var curTime=new Date();
  var ret=endTime.getTime()-curTime.getTime();//倒计时毫秒时间
  ret=Math.round(ret/1000);//倒计时毫秒转换成秒
  return ret>=0?ret:0;
};

//时间更新函数
function update(){
//下一次要显示的时间
  var nextShowTimeSeconds=getCurrentShowTimeSeconds();
  var nextHours=parseInt(nextShowTimeSeconds/3600);
  var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
  var nextSeconds=nextShowTimeSeconds%60;
	
//当前显示的时间
  var curHours=parseInt(curShowTimeSeconds/3600);
  var curMinutes=parseInt((curShowTimeSeconds-nextHours*3600)/60);
  var curSeconds=curShowTimeSeconds%60;
	
//下一次要显示的时间替换当前时间
  if(nextSeconds!=curSeconds){
	
	//判断时分秒数值变化后增加圆球效果
	if(parseInt(curHours/10)!=parseInt(nextHours/10)){
	  addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
	}
	if(parseInt(curHours%10)!=parseInt(nextHours%10)){
	  addBalls(MARGIN_LEFT+15*(RAIDUS+1),MARGIN_TOP,parseInt(curHours%10));
	}
	if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
	  addBalls(MARGIN_LEFT+39*(RAIDUS+1),MARGIN_TOP,parseInt(curMinutes/10));
	}
	if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
	  addBalls(MARGIN_LEFT+54*(RAIDUS+1),MARGIN_TOP,parseInt(curMinutes%10));
	}
	if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
	  addBalls(MARGIN_LEFT+78*(RAIDUS+1),MARGIN_TOP,parseInt(curSeconds/10));
	}
	if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
	  addBalls(MARGIN_LEFT+93*(RAIDUS+1),MARGIN_TOP,parseInt(curSeconds%10));
	}
	
	  curShowTimeSeconds=nextShowTimeSeconds;
	}
	
  updateBalls();
};

function draw(cxt){
  //清除前一次产生的画面，防止叠加
  cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
  var hours=parseInt(curShowTimeSeconds/3600);
  var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
  var seconds=curShowTimeSeconds%60;
	
  drawDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);//绘画小时十位数
  drawDigit(MARGIN_LEFT+15*(RAIDUS+1),MARGIN_TOP,parseInt(hours%10),cxt);//绘画小时个位数
  drawDigit(MARGIN_LEFT+30*(RAIDUS+1),MARGIN_TOP,10,cxt);//绘画冒号
  drawDigit(MARGIN_LEFT+39*(RAIDUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);//绘画分钟十位数
  drawDigit(MARGIN_LEFT+54*(RAIDUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);//绘画分钟个位数
  drawDigit(MARGIN_LEFT+69*(RAIDUS+1),MARGIN_TOP,10,cxt);//绘画冒号
  drawDigit(MARGIN_LEFT+78*(RAIDUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);//绘画秒钟十位数
  drawDigit(MARGIN_LEFT+93*(RAIDUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);//绘画秒钟个位数
	
  //彩色小球绘画函数
  for(var i=0;i<balls.length;i++){
    cxt.fillStyle=balls[i].color;
    cxt.beginPath();
    cxt.arc(balls[i].x,balls[i].y,RAIDUS,0,2*Math.PI);
    cxt.closePath();
    cxt.fill();
  }
};

//数字小球绘画函数
function drawDigit(x,y,num,cxt){
  cxt.fillStyle='rgb(0,102,153)';
  for(var i=0;i<digit[num].length;i++){
	for(var j=0;j<digit[num][i].length;j++){
	  if(digit[num][i][j]==1){
	    cxt.beginPath();
	    cxt.arc(x+j*2*(RAIDUS+1)+(RAIDUS+1),y+i*2*(RAIDUS+1)+(RAIDUS+1),RAIDUS,0,2*Math.PI);
	    cxt.closePath();
		cxt.fill();
	  }
	}
  }
};

//彩色小球生成函数
function addBalls(x,y,num){
  for(var i=0;i<digit[num].length;i++){
    for(var j=0;j<digit[num][i].length;j++){
	  if(digit[num][i][j]==1){
	    var oball={
		  x:x+j*2*(RAIDUS+1)+(RAIDUS+1),
		  y:y+i*2*(RAIDUS+1)+(RAIDUS+1),
		  g:5+Math.random(),
		  vx:Math.pow(-1,Math.ceil(Math.random()*100))*5,
		  vy:-10,
		  color:colors[Math.floor(Math.random()*colors.length)],
	    };
	    balls.push(oball);
	  }
    }
  }
};

//彩色小球运动函数
function updateBalls(){
  for(var i=0;i<balls.length;i++){
    balls[i].x+=balls[i].vx;
    balls[i].y+=balls[i].vy;
    balls[i].vy+=balls[i].g;
		
    if(balls[i].y>=WINDOW_HEIGHT-RAIDUS){
	  balls[i].y=WINDOW_HEIGHT-RAIDUS;
	  balls[i].vy=-balls[i].vy*0.6;
    }
  }
	
  //当彩色小球离开canvas画布后从数组中清除，优化性能
  for(var i=0;i<balls.length;i++){
    if(balls[i].x+RAIDUS<0 || balls[i].x-RAIDUS>WINDOW_WIDTH)
	  balls.splice(i,1);
  }
};
