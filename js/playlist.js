function playlistScrollPane(){ 
	
	// scroll
		  	$('.playlist-scroll-pane').jScrollPane({
		  		showArrows: false,
		  		verticalGutter: 12,
		  		verticalDragMinHeight: 67,
		  		verticalDragMaxHeight: 67
		  	});	
			
};

$(document).ready(function(){
	////// player	
	var user_agent = navigator.userAgent.toLowerCase();
	var mobile = false;
	if ((/up.browser|up.link|mmp|symbian|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|pda|psp|treo|blackberry|opera mini|android|iphone|ipod|ipad/.test(user_agent))) {	mobile = true;}
	//////////
	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [

		{
			title:"Dance With Me - Olly Murs",
			free:true,
			mp3:"../stream/audio/mp3/dancewithmetonight.mp3"
		},
		{
			title:"Frank Sinatra & Barbara Streisand",
			mp3:"../300111377/audio/mp3/FrankSinatra-BarbaraStraizand-Crush.mp3"
		},
		{
			title:"Moon River - Barbara Streisand",
			mp3:"../300111377/audio/mp3/BarbraStreisand-MoonRiver.mp3"
		},
		{
			title:"Chick Corea - SPAIN",
			free:true,
			mp3:"../300111377/audio/mp3/Spain.mp3"
		},
		{
			title:"Chick Corea",
			mp3:"../300111377/audio/mp3/ChickCoreaAkousticBand-SoInLove.mp3"
		},
		{
			title:"Glenn Lewis",
			mp3:"../300111377/audio/mp3/glenn.mp3"
		},
		{
			title:"Tony Bennett",
			free:true,
			mp3:"../300111377/audio/mp3/music-before.mp3"
		},
		{
			title:"Nino Rota",
			mp3:"../300111377/audio/mp3/music-last-old.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		},
		{
			title:"The Separation",
			free:true,
			mp3:"../300111377/audio/Miaow-05-The-separation.mp3"
		},
		{
			title:"Lismore",
			mp3:"../300111377/audio/Miaow-04-Lismore.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		},
		{
			title:"The Separation",
			free:true,
			mp3:"../300111377/audio/Miaow-05-The-separation.mp3"
		},
		{
			title:"Lismore",
			mp3:"../300111377/audio/Miaow-04-Lismore.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		},
		{
			title:"The Separation",
			free:true,
			mp3:"../300111377/audio/Miaow-05-The-separation.mp3"
		},
		{
			title:"Lismore",
			mp3:"../300111377/audio/Miaow-04-Lismore.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		},
		{
			title:"The Separation",
			free:true,
			mp3:"../300111377/audio/Miaow-05-The-separation.mp3"
		},
		{
			title:"Lismore",
			mp3:"../300111377/audio/Miaow-04-Lismore.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		},
		{
			title:"The Separation",
			free:true,
			mp3:"../300111377/audio/Miaow-05-The-separation.mp3"
		},
		{
			title:"Lismore",
			mp3:"../300111377/audio/Miaow-04-Lismore.mp3"
		},
		{
			title:"Thin Ice",
			mp3:"../300111377/audio/Miaow-10-Thin-ice.mp3"
		}
		
	], {
		
		ready: function () {			
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
          	var kickoff = function () {
				if (mobile) {
					$("#jquery_jplayer_1").jPlayer("play");
            		document.documentElement.removeEventListener(click, kickoff, true);
				}
         	};
          	document.documentElement.addEventListener(click, kickoff, true);
			
			playlistScrollPane();
			//console.log('ready');
		},
		swfPath: "js",
		supplied: "mp3",
		wmode: "window"						
		
	});
});

$(window).load(function() {
	
	playlistScrollPane();
	var qwe = setTimeout(function () {$("#jquery_jplayer_1").jPlayer("play");}, 2000);
	//console.log('load');
	
}); 