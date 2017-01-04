var from_top, start_ryby;

$(document).ready(function(){
	from_top = $(window).scrollTop();
	window_height = $(window).height();
	from_top_bottom = from_top + window_height;
	start_ryby = true;
	$start_press = $('.c_start');
	start_scroll = true;
	
	skrollr.init();

	var rotation = 2; 
	var swingtime = 2500;
	function init() {
		$('#tablica_box').animate({rotate: rotation}, 0, function () {
			$('#tablica_box').css("display", "block");
			rotation *= -1;
			pendulumswing();
		});
	}
	function pendulumswing() {
		$('#tablica_box').animate({rotate: rotation},swingtime, "swing", function(){
			 rotation *= -1;
			 pendulumswing();
		});
	}
	init();
	
	function fish() {
		$('.fish').each(function(){
			var $this = $(this);
			var fish_left = $this.data('fish1');
			var fish_time = $this.data('fish2');
			$this.animate({"left": fish_left}, fish_time, function () {
				var random1 = Math.random()*1000+300;
				var random2 = Math.random()*4000+3000;
				$this.data('fish1', random1);
				$this.data('fish2', random2);
				fish2($this);
			});
		})
	}
	function fish2(ryba) {
		var fish_left = ryba.data('fish1');
		var fish_time = ryba.data('fish2');
		if(fish_left<ryba.offset().left){
			ryba.css({'transform': 'scaleX(-1)'});
		}else{
			ryba.css({'transform': 'scaleX(1)'});
		}
		ryba.animate({"left": fish_left}, fish_time, function () {
			var random1 = Math.random()*1000+300;
			var random2 = Math.random()*4000+3000;
			ryba.data('fish1', random1);
			ryba.data('fish2', random2);
			fish2(ryba);
		});
	}
	$('.fish').click(function(){
		var $this=$(this);
		ryba_top = $this.offset().top - from_top;
		ryba_left = $this.offset().left;
		leftright = Math.random();
		if(leftright<0.5){
			leftright='-300px';
		}else{
			leftright='2000px';
		}
		$this.stop().css({'position':'fixed', 'top':ryba_top,'left':ryba_left}).animate({'left':leftright,'top':ryba_top-400, 'width':'+=200px'}, 1000, function(){
			rybatop = Math.random()*100+45;
			$this.css({'position':'absolute', 'top':rybatop, 'width':'-=200px'});
			fish2($this);
		});
		$('.tablica_before').animate({'top':'0px'}, 1400, function(){
			$(this).removeClass('tablica_before').addClass('tablica_after');
			init2();
		})
	})
	$('.fish').mouseover(function(){
		$(this).css( 'cursor', 'url(img/celownik.png), auto' );
	})

	$start_press.not('.c_stop').hover(function(){
		if (!$start_press.hasClass('c_stop')){
			$start_press.css({'opacity':'1'})};
		}, function(){
		if (!$start_press.hasClass('c_stop')){
		$start_press.css({'opacity':'0'})};
	})
	$start_press.click(function(){
		if ($start_press.hasClass('c_stop')){
			scrollStop();
		}else{
			scrollStart();
		}
		return false;
	});
	$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
		if ($start_press.hasClass('c_stop')){
			scrollStop();
		}
		if(start_scroll){
			$('html, body').stop();
			start_scroll = false;
		}
	});
	function scrollStart(){
		$start_press.addClass('c_stop');
		$start_press.css({'background': 'url("img/red.png")','opacity':'1'});
		var time = (10300-from_top)*4;
		$('html, body').animate({ 
			scrollTop: 10300
		}, time, function(){
			$("html, body").unbind("scroll mousedown DOMMouseScroll mousewheel keyup scrollStop");
			scrollStop();
		})
	}
	function scrollStop(){
		$start_press.animate({'opacity':'0'},100, function(){$start_press.removeClass('c_stop')});
		$start_press.css({'background': 'url("img/green.png")'});
		$('html, body').stop();
	}
	
	function scrolling(){

		from_top = $(window).scrollTop();
		from_top_bottom = from_top + window_height;
		//$('#pixel span').text(from_top);
		//$('#pixel i').text(from_top_bottom);
		
		if(from_top<1000){
			$('#platforma').css({'position':'fixed', 'top':'400px'});	
			$('#time0').text(Math.floor(10-from_top/100));
				time1 = 100-from_top+(Math.floor(from_top/100))*100;
			if(time1<10){
				time1 = '0'+time1;
			}else if(time1>=100){
				time1 = '00';
			}
			$('#time1').text(time1);
		}else if(from_top<1900){
			$('#platforma').css({'position':'fixed', 'top':from_top-600});
			$('#time0').text('0');
			$('#time1').text('00');
		}else{
			$('#platforma').css({'position':'absolute', 'top':'2850px'});
		}
		if(from_top<830){
			$('#fuego').css('opacity','0');
		}else if(from_top<1300){
			$('#fuego').css('opacity','1');
		}else{
			$('#fuego').css('opacity','0');
		}
		
		if (from_top_bottom>11450){
			$('#sky_1').css({'position':'fixed','bottom': '476px'});
			$('#sky_2').css({'position':'fixed','bottom': '400px'});
			$('#ground1').css({'position':'fixed', 'top':-(250)+window_height-44});
			if(start_ryby){fish();start_ryby = false;}
		}else if (from_top_bottom>11200){
			$('#sky_1').css({'position':'fixed','bottom': from_top_bottom-10974});
			$('#sky_2').css({'position':'fixed','bottom': from_top_bottom-11050});
			$('#ground1').css({'position':'fixed', 'top':-(from_top_bottom-11200)+window_height-44});
			if(start_ryby){fish();start_ryby = false;}
		}else if(from_top_bottom>10650){
			$('#sky_1').css({'position':'fixed','bottom': '226px'});
			$('#sky_2').css({'position':'fixed','bottom': '150px'});
			$('#ground1').css({'position':'fixed', 'top':window_height-44});
			if(start_ryby){fish();start_ryby = false;}
		}else if(from_top_bottom>10500){
			$('#sky_1').css({'bottom': from_top_bottom-10424});
			$('#sky_2').css({'bottom': from_top_bottom-10500});
			$('#ground1').css({'position':'fixed', 'top':window_height-44});
			if(start_ryby){fish();start_ryby = false;}
		}else if (from_top_bottom>8950){
			$('#sky_1').css({'position':'fixed','bottom':'76px'});
			$('#sky_2').css({'position':'fixed','bottom':'0px'});
			$('#ground1').css({'position':'absolute','top':'36px'});
			if(start_ryby){fish();start_ryby = false;}
		}else{
			$('#sky_1').css({'position':'relative'});
			$('#sky_2').css({'position':'relative','bottom':'76px'});
			$('#ground1').css({'position':'absolute','top':'36px'});
		}
			
		if(from_top<=9200){
			$('.tablica_after').css({'top':'-500px'}).addClass("tablica_before").removeClass('tablica_after');
		}else if(from_top<=10200){
			$('.tablica_after').css({'top':(from_top-10200)/2});
		}else{
			$('.tablica_after').css({'top':'0px'});
		}
	}
	
	$(window).scroll(function(){
		scrolling();
	})
	$(window).resize(function () {
		window_height = $(window).height();
		scrolling();
	});
	
	$('#gwiazda').animate({'left':'2500px', 'top':'2000px'}, 12000, function(){$(this).remove();})
	
	$(window).load(function() {
		from_top = $(window).scrollTop();
		if(from_top==0 && start_scroll){
			start_scroll = false;
			$start_press.addClass('c_stop');
			$('html, body').animate({ 
				scrollTop: 1000
			}, 10000, function(){
				scrollStart();
			})
		}else{
			$("html,body").animate({scrollTop: 0}, 10);
		}
	})
})

