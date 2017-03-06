window.onload=function(){
	var clock=document.getElementById('clock');
	var ctx=clock.getContext('2d');
	var width=ctx.canvas.width;
	var height=ctx.canvas.height;
	var r=width/2;
	
	
	function drawCircle(){
	//画出时钟外圆
		ctx.save();
		ctx.translate(r,r);
		ctx.beginPath();
		ctx.lineWidth=20;
		ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);//false为顺时针，true为逆时针
		ctx.strokeStyle="#67e";
		ctx.stroke();
		ctx.fill();
		ctx.fillStyle="#fff";
	
	
		
	//画时钟数值
		var hourNumbers=[3,4,5,6,7,8,9,10,11,12,1,2];
		ctx.font=22+"px Arial";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		hourNumbers.forEach(function(number,i){
			var rad=2*Math.PI/12*i;
			var x=Math.cos(rad)*(r-40);
			var y=Math.sin(rad)*(r-40);
			ctx.fillText(number,x,y);
		})
		
		
	//画出时间圆点
		for(var i=0;i<60;i++){
			var rad=2*Math.PI/60*i;
			var x=Math.cos(rad)*(r-25);
			var y=Math.sin(rad)*(r-25); 
			ctx.beginPath();
			if(i%5===0){
				ctx.fillStyle='#fff';
				ctx.arc(x,y,3,0,2*Math.PI,false);
			}
			else{
				ctx.fillStyle='#666';
				ctx.arc(x,y,3,0,2*Math.PI,false);
			}
			ctx.fill();
		}
	}
	
	//画时针
		function drawHour(hour,minute){
			ctx.save();
			ctx.beginPath();
			var rad=2*Math.PI/12*hour;
			var mrad=2*Math.PI/12/60*minute;
			ctx.rotate(rad+mrad);
			ctx.lineWidth=10;
			ctx.lineCap="round";
			ctx.moveTo(0,10);
			ctx.lineTo(0,-r/2);
			ctx.stroke();
			ctx.restore();
		}
		
		
	//画分针
		function drawMinute(minute){
			ctx.save();
			ctx.beginPath();
			var rad=2*Math.PI/60*minute;
			ctx.rotate(rad);
			ctx.lineWidth=5;
			ctx.lineCap="round";
			ctx.moveTo(0,10);
			ctx.lineTo(0,-r+50);
			ctx.stroke();
			ctx.restore();
		}
		
	
	//画秒针
		function drawSecond(second){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle="#0ff";
			var rad=2*Math.PI/60*second;
			ctx.rotate(rad);
			ctx.lineCap="round";
			ctx.moveTo(-2,25);
			ctx.lineTo(2,25);
			ctx.lineTo(1,-r+25);
			ctx.lineTo(-1,-r+25);
			ctx.fill();
			ctx.restore();
		}
		
		
	//画中心点
		function drawDot(){
			ctx.beginPath();
			ctx.fillStyle="#fff";
			ctx.arc(0,0,8,0,2*Math.PI,false);
			ctx.fill();
		}
	
		
	//实时时间
		function draw(){
			ctx.clearRect(0,0,width,height);//清除上一秒的画面，避免重叠
			var now=new Date();
			var hour=now.getHours();
			var minute=now.getMinutes();
			var second=now.getSeconds();
			drawCircle();
			drawHour(hour,minute);
			drawMinute(minute);
			drawSecond(second);
			drawDot();
			ctx.restore();
		}
		
		
		draw();
		setInterval(draw,1000);//每秒更新一次
}
	
