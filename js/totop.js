window.onload=function(){
	var obtn=document.getElementById("backTop");
	var myTime=null;
	var stopScroll=false;
	var clientHeight=document.documentElement.clientHeight;
	
	window.onscroll=function(){
		var osTop=document.documentElement.scrollTop||document.body.scrollTop;
		if(osTop>=clientHeight+500){
			obtn.style.display="block";
		}
		else{
			obtn.style.display="none";
		}
		if(stopScroll){
			clearInterval(myTime);
		}
		stopScroll=true;
	}
	
	obtn.onclick=function(){
		myTime=setInterval(function(){												
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
			var mySpeed=Math.floor(-osTop/6);										
				document.documentElement.scrollTop=document.body.scrollTop=osTop+mySpeed;
				
				stopScroll=false;
				
			if(osTop==0){
				clearInterval(myTime);
			}
		},60);
	}
}