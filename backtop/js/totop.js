//压面加载完毕后触发
window.onload=function(){
	var obtn=document.getElementsByClassName("btn");
	var myTime=null;
	var stopScroll=false;
	var clientHeight=document.documentElement.clientHeight;		//获取页面可视区高度
	
//滚动条滚动时触发
	window.onscroll=function(){
		var osTop=document.documentElement.scrollTop||document.body.scrollTop//获取滚动条距离顶部的距离
		
//回到顶部按钮隐藏和显示功能
		if(osTop>=clientHeight){
			obtn[0].style.display="block";
		}
		else{
			obtn[0].style.display="none";
		}
		
//鼠标滚轮滚动时清除定时器，不继续回到顶部
		if(stopScroll){
			clearInterval(myTime);
		}
		stopScroll=true;
	}
	
//点击按钮自动回到顶部功能
	obtn[0].onclick=function(){
		myTime=setInterval(function(){												//设置定时器，时长60ms
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;//获取滚动条距离顶部的距离，兼容ie与chrome
			var mySpeed=Math.floor(-osTop/4);										//定义由快到慢的速度
				document.documentElement.scrollTop=document.body.scrollTop=osTop+mySpeed;
				
				stopScroll=false;
			
			if(osTop==0){
				clearInterval(myTime);													//到顶后清除计时器
			}
		},60);
	}
}