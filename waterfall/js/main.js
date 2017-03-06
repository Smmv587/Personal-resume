window.onload=function(){

	waterfall('main','box');//封装瀑布流函数
	
	//模拟后台json格式的数据
	var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'}]};
	window.onscroll=function(){
		if(checkSlide()){
			var oParent=document.getElementById('main');//父级对象
			
			//将数据渲染到页面尾部
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');//添加 元素节点
				oBox.className='box';//添加 类名 name属性
				oParent.appendChild(oBox);//添加 子节点
				var oPicture=document.createElement('div');
				oPicture.className='picture';
				oBox.appendChild(oPicture);
				var oImage=document.createElement('img');
				oImage.src='./images/'+dataInt.data[i].src;
				oPicture.appendChild(oImage);
			}
			waterfall('main','box');//调用瀑布流函数
		};
	}
	
}


//定义瀑布流函数
function waterfall(parent,box){
	var oParent=document.getElementById(parent);//先获取main父元素
	var oBoxs=getByClass(oParent,box);//封装一个根据class获取元素的函数
	
	//计算整个页面显示的列数（页面宽/box宽）
	var oBoxWidth=oBoxs[0].offsetWidth;//获取box的宽
	var cols=Math.floor(document.documentElement.clientWidth/oBoxWidth);
	//设置main的宽度,为了让列数固定
	oParent.style.cssText='width:'+oBoxWidth*cols+'px;margin:0 auto;';
	
	var heightArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++){
		if(i<cols){
			heightArr.push(oBoxs[i].offsetHeight);
		}
		else{
			var minHeight=Math.min.apply(null,heightArr);//获得数组中最小高度值
			var index=getMinHeightIndex(heightArr,minHeight);//获取数组中最小高度值的索引
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minHeight+'px';
			oBoxs[i].style.left=oBoxWidth*index+'px';//第一种获取相对main的左距离
			//oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';  第二种获取相对main的左距离
			heightArr[index]+=oBoxs[i].offsetHeight;//改变加载图片后的列高
		}
	}
}

//定义根据class获取元素的函数
function getByClass(parent,clsName){
	var boxArr=[];//定义一个数组用来存储获取到的所有class为box的元素
	oElements=parent.getElementsByTagName('*');//用来获取父元素下所有子元素的集合
	for(var i=0;i<oElements.length;i++){//遍历所有子元素，判断是否class=box
		if(oElements[i].className==clsName){
			boxArr.push(oElements[i]);//将class为box的元素插入到数组末尾
		}
	}
	return boxArr;
}

//定义获取数组中最小高度值的索引的函数
function getMinHeightIndex(arr,val){
	for(var i in arr){
		if(arr[i]==val){
			return i;
		}
	}
}

//定义检测是否具备加载数据条件的函数
function checkSlide(){
	var oParent=document.getElementById('main');
	var oBoxs=getByClass(oParent,'box');
	var lastBoxHeight=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);//最后一张图片中心的列高(加载的临界条件,实现未滚到底就开始加载)
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;//鼠标滚动的高度(保证兼容性)
	var height=document.body.clientHeight||document.documentElement.clientHeight;//浏览器高度
	return(lastBoxHeight<scrollTop+height)?true:false;
}