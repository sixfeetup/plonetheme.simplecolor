jQuery(function($){

$(window).load(function(){

///************SHOW/HIDE NAVIGATION LINKS *************

     $('.portletNavigationTree .portletHeader').toggle(

                 function () {         
                 $("dl.portletNavigationTree dd.portletItem").show();
                 $("#portal-column-one").css({"background-color":"#FFFFFF"});
             }, 
                 function() {          
                 $("dl.portletNavigationTree dd.portletItem").hide();
                 $("#portal-column-one").css({"background-color":"#66000"});
                      
                 }
       );


//*********** SHOW/HIDE QUESTION/ANSWER DIVS ******** 
//HIDE ANSWER DIVS
		//$(".answer").hide();
		$(".answer").css({"position":"absolute","left":"-9999px"});
			
//FIND ALL .answer CLASS DIVS- ASSIGN ID #
		i=1;
		$(".answer").each(function(){
			var thisID="answer" + i;
		        $(this).attr("id",thisID);
				i++;		            
		        });
		
//FIND ALL .question CLASS DIVS- ASSIGN ID #
		i=1;
		$(".question").each(function(){
			var thisID="question" + i;
			var imageDiv="<div class='showAnswer' id='" + thisID + "'><img src=" + "'checkAnswerBG.gif'</div>";
			$(this).append(imageDiv); 
			i++;		            
			});
			
//ADD SHOW/HIDE TOGGLE FUNCTION OF EACH ANSWER DIV TO EACH CORRESPONDING QUESTION DIV		
	i=1;
	$(".question").each(function(){
		
		$("#question" + i).toggle(
			function(elementID){
				return function(){
					//$("#answer" + elementID).show();
					$("#answer" + elementID).css({"position":"relative","left":"0"});
					
					$("#question" + elementID + "> img").attr('src', 'hideAnswerBG.gif');
					
				};
			}(i), 
			function(elementID) {
				return function(){
					//$("#answer" + elementID).hide();
					$("#answer" + elementID).css({"position":"absolute","left":"-9999px"});
					
					$("#question" + elementID + "> img").attr('src', 'checkAnswerBG.gif');
					
				};
		}(i)
		);		
		i++;
	});
	
	
//************OVERLAYS*******************
$('.linkOverlay a')
    .prepOverlay({
        subtype: 'iframe',
        config: {expose:{color:'#2E2E2E'}}
        });


	
// *************** SIMPLE SLIDESHOW ******************* 
     //ASSIGN ID TO ALL IMAGES IN .slideshow DIVS								
		$("div.slideshow img").each(function(intIndex){			
	    		var thisID="showimg" + intIndex;
	     		$(this).attr("id",thisID);	
         	});
								
		//FIND ALL .slideshow divs- ASSIGN ID #, APPEND imagelinks div
		slideshowID = 0; //SLIDESHOW DIV COUNTER
		$('.slideshow').each(function(intIndex) {
			var thisID="slideshowID" + intIndex;
	     	$(this).attr("id",thisID);
			linksdiv="<div class='imagelinks' id='imagelinks" + intIndex + "'>Click to view: </div>";
    		$(this).prepend(linksdiv);
    		var showtitle = "<h4 class='slideshowheading'>Slideshow</h4>";
	     	$("#slideshowID" + intIndex).prepend(showtitle);
                captiondiv="<div class='captiondiv' id='imagetitle" + intIndex + "'>&nbsp;</div>";
	     	$(this).append(captiondiv);
    		         		         			
         //GET EACH IMAGE IN THAT DIV
         	var imagecount = 1;
            var imageheight = 0;
            var imagewidth = 0; 
         	$("img",this).each(function(){
         			
         		//CREATE LINK FOR EACH IMAGE
         		imageID = $(this).attr("id");
         		imageID = imageID.replace("showimg","");//make imageID just the number
         			
         		//SET SIZE OF LARGEST IMAGE
         		if($(this).height() >  imageheight){
         			imageheight = $(this).height();
         			}
         			
         		if($(this).width() >  imagewidth){
         			imagewidth = $(this).width();
         			}
         			         		         			
         		//APPEND LINK TO #imagelinks DIV
         			imagelink="<a id='imagelink" + imageID + "' title='link to image " + imagecount + "'>" + imagecount + "</a>&nbsp;";	
	     			$('#imagelinks' + slideshowID).append(imagelink);
	     			
	     			imagecount++;//increment images found
         				         			
         			//CREATE CLICK FUNCTIONS FOR THAT LINK
         			$('#imagelink' + imageID).click(function() {
         					
         				//GET ID OF PARENT SLIDESHOW DIV
         				slideshowID = $(this).parent().parent().attr("id");
							
						//UNDERLINE ALL LINK SPANS
         				$("#" + slideshowID +  '> div > a').css('text-decoration','underline');
         					
         				//REMOVE UNDERLINE OF DISPLAYED LINK
         				linkID = $(this).attr("id");         					
         				$('#' + linkID).css('text-decoration','none');
         					
         				//HIDE ALL IMG IN THIS SLIDESHOW DIV
         				$('#' + slideshowID + ' img').css({"position":"absolute","left":"-9999px"});
         					        					
         				//DISPLAY JUST THIS ONE IMAGE
         				imageID = linkID.replace('imagelink','showimg');
         				$('#' + imageID).css({"position":"relative","left":"0"});
                        //AND ITS CAPTION
         				titleForCaption = $('#'+ imageID).attr("alt");
         				slideshowNum = slideshowID.replace("slideshowID","");//get just the number
         				$('#imagetitle' + slideshowNum).html(titleForCaption);
         					
         				});         			         			
         				
         			});//END IMAGES FOUND IN THIS SLIDESHOW DIV
         			         			
         		//SET HEIGHT & WIDTH OF SLIDESHOW DIV TO LARGEST IMAGE
         			imageheight = imageheight + 40;
         			$("#slideshowID" + intIndex).css("width", imagewidth +"px");
         			$("#slideshowID" + intIndex).css("min-height", imageheight +"px");
         			//$("#slideshowID" + intIndex).css("border", "solid 1px #000099");
                               
         			
         			slideshowID++;//increment slideshow divs found
         			
         	});//END SLIDESHOW DIVS FOUND
         		
         		
         	//INITIAL SETUP - DISPLAY FIRST IMAGE IN EACH SLIDESHOW DIV
    		//HIDE ALL slideshow img
    		$('.slideshow img').css({"position":"absolute","left":"-9999px"});
								
			$("div.slideshow").each(function(intIndex){
                slideshowID = $(this).attr("id");
			    slideshowNum = slideshowID.replace("slideshowID","");//get just the number

			     //SHOW STARTING IMAGE OF EACH SLIDESHOW
			     $("img:first",this).css({"position":"relative","left":"0px"});
                //GET ITS TITLE
			     titleForCaption = $("img:first",this).attr("alt");
			     $('#imagetitle' + slideshowNum).html(titleForCaption);
         		});
         		
         		//UNDERLINE LINKS EXCEPT DISPLAYED ONE
         		$('[id^="imagelink"] a').css('text-decoration','underline');
         		$('[id^="imagelink"] a:first-child').css('text-decoration','none');



//*********** TOOLTIP **************
// EZPZ_TOOTTIP.JS PLUGIN SCRIPT REQUIRED

//HIDE tooltip-content DIVS
			$(".tooltip-content").hide();

//FIND ALL .tooltipTarget CLASS DIVS- ASSIGN ID #
		i=1;
		$(".tooltip-target").each(function(){
			var thisID="tooltip-target-" + i;
			$(this).attr("id",thisID);
			i++;		            
			});
			
//FIND ALL .tooltipContent CLASS DIVS- ASSIGN ID #
		i=1;
		$(".tooltip-content").each(function(){
			var thisID="tooltip-content-" + i;
			$(this).attr("id",thisID);
			i++;		            
			});

//CHANGE HOVER POINTER			
$(".tooltip-target").hover(
				function(){
				$(this).css('cursor','pointer');},
				function(){
				$(this).css('cursor','default');}
			);
			
  $(".tooltip-target").ezpz_tooltip();
  
 
});//CLOSE WINDOW LOAD

});//CLOSE DOCUMENT READY