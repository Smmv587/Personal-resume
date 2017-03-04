
//导航效果
$(function(){
	$(window).resize();
	$("#nav").css("z-index", 1);

	//导航条固定顶部
	$("#nav").navFixed();

	//平滑滚动导航
	$('#down a, nav a, #logo').bind('click',function(event){
		var $anchor = $(this);
		$('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top-52}, 600);
		event.preventDefault();
	});
});

//首页效果
$(window).resize(function(){ 

	//首页满屏效果
	$("#firstPage").css("height", $(window).height());
	//首页文字效果
	$('h1').stop().fadeIn().animate({
		top:($(window).height()-$('h1').outerHeight())/2
	},600); 
	
	$("#profession").stop().fadeIn().animate({
		bottom:($(window).height()-$('#profession').outerHeight())/4
	},1500);
});

//技能点击显示详情
$(".skillIcon").click(function(){
	$(".skillIntro").each(function(){
		if($(this).is(":visible")){
			$(this).slideUp(200);
		}
	});
	if($(this).siblings(".skillIntro").is(":hidden")){
		$(this).siblings(".skillIntro").slideDown(400);
	}else{
		$(this).siblings(".skillIntro").slideUp(200);
	}
});
