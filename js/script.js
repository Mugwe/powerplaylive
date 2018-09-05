	// ieCheck
	var MSIE = ($.browser.msie) && ($.browser.version <= 8);

function start(){	
	
};

function startF(){	
	setTimeout(function () {
		//$('.car1').css({marginRight:-500}).stop().delay(100).animate({marginRight:0},1200,'easeOutBack');

	}, 200);
};

function showSplash(){
	setTimeout(function () {
		//$('.close').stop().animate({opacity:0},800,'easeOutExpo', function(){ $(this).css({display:'none'}); });
		$('.enter').css({display:'block'});
		$('.close').css({display:'none'});
		$('.menu').stop().animate({opacity:0},800,'easeOutExpo', function(){ $(this).css({display:'none'}); });
		$('.main3').stop().animate({width:562, marginLeft:0},800,'easeInOutExpo').animate({marginTop:0},800,'easeInOutExpo');
		$('.slogan1').css({display:'block'}).stop().delay(800).animate({opacity:1, marginRight:0},800,'easeOutExpo');

		if(!MSIE){
			$('.splash').css({visibility:'visible'}).stop().delay(800).animate({scale:1},800,'easeInOutExpo');
		}
		else{
			$('.splash').css({visibility:'visible'}).stop().delay(800).animate({opacity:1},800,'easeInOutExpo');
		}
	}, 100);	
};
function hideSplash(){ 	
	$('.enter').css({display:'none'});
	$('.close').css({display:'block'});
	$('.slogan1').stop().animate({opacity:0, marginRight:400},800,'easeInOutExpo', function(){ $(this).css({display:'none'}); });
	$('.main3').stop().animate({width:962, marginLeft:-200},800,'easeInOutExpo').animate({marginTop:-235},800,'easeInOutExpo');
	$('.menu').css({display:'block'}).stop().delay(800).animate({opacity:1},800,'easeOutExpo');

	if(!MSIE){
		$('.splash').stop().delay(500).animate({scale:0},800,'easeInOutExpo', function(){ $(this).css({visibility:'hidden'}); });
	}
	else{
		$('.splash').stop().delay(500).animate({opacity:0},800,'easeInOutExpo', function(){ $(this).css({visibility:'hidden'}); });
	}
	

};
function hideSplashQ(){	
	$('.enter').css({display:'none'});
	$('.close').css({display:'block'});
	$('.slogan1').css({opacity:0, marginRight:400, display:'none'});
	$('.main3').css({width:962, marginLeft:-200, marginTop:-235});
	$('.menu').css({display:'block', opacity:1});

	if(!MSIE){
		$('.splash').css({visibility:'hidden', scale:0});
	}
	else{
		$('.splash').css({visibility:'hidden', opacity:0});
	}
	
	
};

///////////////////

$(document).ready(function() {
	
	// top1 sound controll
	$(".top1").css({marginLeft:-284});
    $(".sound_control").toggle(
    	function(){
	    	$(".top1").stop().animate({marginLeft:0 }, 400, 'easeOutExpo' ).addClass("active");
	    },	    
	    function(){
	    	$(".top1").stop().animate({marginLeft:-284 }, 400, 'easeOutExpo' ).removeClass("active");
		}
	);

	/////// icons
	$(".sound_control").find(".sound_control_txt").css({opacity:0.7});
	$(".sound_control").hover(function() {
		$(this).find(".sound_control_txt").stop(true).animate({opacity:1 }, 400, 'easeOutExpo');		    
	},function(){
	    $(this).find(".sound_control_txt").stop(true).animate({opacity:0.7 }, 400, 'easeOutExpo' );		   
	});

	//////////////////////  paralax
	$(".cloud5 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1100             
    });
    $(".cloud3 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1130             
    });
    $(".cloud6 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1160             
    });
    $(".cloud1 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1190             
    });
    $(".cloud4 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1220             
    });
    $(".cloud7 .parallax-layer").css({opacity:0.3}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1250             
    });
    $(".cloud2 .parallax-layer").css({opacity:0.5}).parallax({
        //mouseport: jQuery(".extra")
    },
    {
        yparallax: false,
        xparallax: '100%',
        width:1280             
    });

    /////// icons
	$(".icons li a").find("img").css({opacity:0.4});
	$(".icons li a").hover(function() {
		$(this).find("img").stop().animate({marginTop:-5, opacity:1 }, 400, 'easeOutExpo');		    
	},function(){
	  $(this).find("img").stop().animate({marginTop:0, opacity:0.4 }, 400, 'easeOutExpo' );		   
	});

	/////// enter close
	$("header").find(".over2").css({opacity:0});
	$(".enter, .close").hover(function() {
		$(this).parent().find(".over2").stop().animate({opacity:1 }, 800, 'easeOutExpo');		    
	},function(){
	  	$(this).parent().find(".over2").stop().animate({opacity:0 }, 800, 'easeOutExpo');		    
	});

	////// submenu
	$('ul#menu').superfish({
      delay:       600,
      animation:   {height:'show'},
      speed:       600,
      autoArrows:  false,
      dropShadows: false
    });	

    // slider
	$('.slider')._TMS({
			show:0,
			pauseOnHover:false,
			prevBu:'.sprev',
			nextBu:'.snext',
			duration:800,
			preset:'simpleFade',
            easing:"easeOutExpo",
			pagination:false,//'.pagination',true,'<ul></ul>'
			pagNums:false,
			slideshow:5000,
			numStatus:false,
			banners:false,    // false 'fromLeft', 'fromRight', 'fromTop', 'fromBottom', 'fade'
			waitBannerAnimation:false,
			bannerEasing:'easeInOutExpo',
			bannerDuration:1000
	});

	/////// sprev snext
	$(".sprev, .snext").find(".over1").css({opacity:0.5});
	$(".sprev, .snext").hover(function() {
		$(this).find(".over1").stop().animate({opacity:1 }, 400, 'easeOutExpo');		    
	},function(){
	  	$(this).find(".over1").stop().animate({opacity:0.5 }, 400, 'easeOutExpo' );		   
	});
	

	
	// for lightbox
	$("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'dark',social_tools:false,allow_resize: true,default_width: 500,default_height: 344});
	
	
		
 });  ////////




$(window).load(function() {
						
	
						
	// scroll
	$('.scroll-pane').jScrollPane({
		showArrows: false,
		verticalGutter: 10,
		verticalDragMinHeight: 68,
		verticalDragMaxHeight: 68
	});	
	
	
	
	//content switch	
	$('#content>ul>li').eq(0).css({'visibility':'hidden'});	
	var content = $('#content');	
	content.tabs({
        show:1,
        preFu:function(_){
    	   _.li.css({display:'none',top:-500});		   
		   $('.close').css({display:'none'});
		   $('.menu').css({display:'none', opacity:0});
        },
        actFu:function(_){
			var Delay=400; // default
        	if( (_.pren == undefined) ){ // on reload
        		Delay=0;
        	}
        	if( (_.pren == 0) ){ // on click
        		Delay=1200;
        	}
        	//console.log(_.pren, Delay);
			if(_.curr){
				_.curr.css({display:'block', top:-2000}).stop().delay(Delay).animate({top:0},800, 'easeOutBack');	                
			}   
			if(_.prev){
				_.prev.stop().animate({top:2000},800, 'easeInBack', function(){ _.prev.css({display:'none'}); });
			}
            		
			//console.log(_.pren, _.n);
			if ( (_.pren == undefined) && (_.n <= 0) ){                
                startF();
                //console.log("startF");
            }			
            if ( (_.n == 0) && (_.pren >= 0) ){
                showSplash();
                //console.log("showSplash");
            }
            if ((_.pren == 0) && (_.n>0)){
                hideSplash();
                //console.log("hideSplash");  
            }
			if ( (_.pren == undefined) && (_.n >= 1) ){
                _.pren = -1;
                hideSplashQ();
                //console.log("hideSplashQ");
            }
            //console.log("///////////////////////////");
  		}
    });
	//content switch navs
	var nav = $('.menu');	
    nav.navs({
		useHash:true,
        defHash: '#!/page_SPLASH',
        hoverIn:function(li){ 
			//$('> a .over',li).stop(true).animate({top:0},400, 'easeOutExpo');
			$('> a .over',li).stop().animate({opacity:1},400, 'easeOutCubic');
			//$('.txt1',li).stop().animate({top:60},400, 'easeOutExpo');
			//$('.txt2',li).stop().animate({top:0},400, 'easeInOutExpo');
        },
        hoverOut:function(li){	
		    if (!li.hasClass('with_ul') || !li.hasClass('sfHover')) {
				//$('.txt1',li).stop().animate({top:0},400, 'easeOutExpo');
     			//$('.txt2',li).stop().animate({top:-60},400, 'easeOutExpo'); 
				$('> a .over',li).stop().animate({opacity:0},400, 'easeOutCubic');
			};
        }
    })    
    .navs(function(n){	
   	    content.tabs(n);
   	});	
	//////////////////////////
	

	
	
}); /// load

////////////////

$(window).load(function() {	
	setTimeout(function () {					
  		$('.spinner').fadeOut();
		$('body').css({overflow:'inherit'});
		start();
	}, 200);	
	
	
});