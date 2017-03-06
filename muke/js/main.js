window.onload=function(){

	slider();
	backTop();
	courseTab();
}
	
	//banner动效
	function slider(){
		var container=document.getElementById('banner-wrapper');
        var list=document.getElementById('banner-list');
        var buttons=document.getElementById('banner-buttons').getElementsByTagName('span');
        var prev=document.getElementById('banner-prev');
        var next=document.getElementById('banner-next');
        var index=1;
        var len=5;
        var animated=false;
        var interval=3000;
        var timer;

        function animate(offset){
            if(offset==0){
                return;
            }
            animated=true;
            var time=300;
            var inteval=10;
            var speed=offset/(time/inteval);
            var left=parseInt(list.style.left)+offset;

            var go=function(){
                if((speed>0&&parseInt(list.style.left)<left)||(speed<0&&parseInt(list.style.left)>left)){
                    list.style.left=parseInt(list.style.left)+speed+'px';
                    setTimeout(go,inteval);
                }
                else{
                    list.style.left =left +'px';
                    if(left>-200){
                        list.style.left=-1200*len+'px';
                    }
                    if(left<(-1200*len)){
                        list.style.left='-1200px';
                    }
                    animated=false;
                }
            }
            go();
        }
          
        function showButton(){
            for(var i=0;i<buttons.length;i++){
                if(buttons[i].className=='on'){
                    buttons[i].className='';
                    break;
                }
            }
            buttons[index-1].className='on';
        }

        function play(){
            timer=setTimeout(function(){
                next.onclick();
                play();
            },interval);
        }
        function stop(){
            clearTimeout(timer);
        }

        next.onclick=function(){
            if(animated){
                return;
            }
            if(index==5){
                index=1;
            }
            else{
                index+=1;
            }
            animate(-1200);
            showButton();
        }
        prev.onclick=function(){
            if(animated){
                return;
            }
            if(index==1){
                index=5;
            }
            else{
                index-=1;
            }
            animate(1200);
            showButton();
        }

        for(var i=0; i<buttons.length;i++){
            buttons[i].onclick=function(){
                if(animated){
                    return;
                }
                if(this.className=='on'){
                    return;
                }
                var myIndex=parseInt(this.getAttribute('index'));
                var offset=-1200*(myIndex-index);

                animate(offset);
                index=myIndex;
                showButton();
            }
        }
        container.onmouseover=stop;
        container.onmouseout=play;
        play();
	}
	
	//返回顶部动效
	function backTop(){
		var obtn=document.getElementsByClassName("button");
		var myTime=null;
		var clientHeight=document.documentElement.clientHeight;
	
		window.onscroll=function(){
			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
			
			if(osTop>=clientHeight){
				obtn[0].style.display="block";
			}
			else{
				obtn[0].style.display="none";
			}
		}
	
		obtn[0].onclick=function(){
			myTime=setInterval(function(){											
				var osTop=document.documentElement.scrollTop||document.body.scrollTop;
				var mySpeed=Math.floor(-osTop/4);										
					document.documentElement.scrollTop=document.body.scrollTop=osTop+mySpeed;
			
				if(osTop==0){
					clearInterval(myTime);											
				}
			},60);
		}
	}
	
	//Tab动效
	function courseTab(){
			
		var courseList=document.getElementsByClassName('list-item');
		var courseInfo=document.getElementsByClassName('course-content');
		
		for(i=0;i<courseList.length;i++){
			courseList[i].id=i;
			courseList[i].onmouseover=function(){
				
				for(j=0;j<courseInfo.length;j++){
					courseInfo[j].style.display='none';
				}
				courseInfo[this.id].style.display='block';
					
				courseInfo[this.id].onmouseover=function(){
					courseInfo[this.id].style.display='block';
				}
				courseInfo[this.id].onmouseout=function(){
					courseInfo[this.id].style.display='none';
				}
			}
			
			courseList[i].onmouseout=function(){
				courseInfo[this.id].style.display='none';
			}
		}		
	}
	
	



