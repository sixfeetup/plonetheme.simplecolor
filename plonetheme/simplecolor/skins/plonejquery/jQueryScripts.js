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


//*********** QUESTION/ANSWER SHOW/HIDE DIVS ******** 
if ($(".answer").length > 0) {
//HIDE ANSWER DIVS
		//$(".answer").hide();
		$(".answer").css({"position":"absolute","left":"-9999px"});
			
//FIND ALL .answer CLASS DIVS- ASSIGN ID #
		$(".answer").each(function(index){
			var thisID="answer" + index;
		        $(this).attr("id",thisID);		            
		        });
		
//FIND ALL .question CLASS DIVS- ASSIGN ID #
		$(".question").each(function(index){
			var thisID="showAnswer" + index;
			var imageDiv="<div class='showAnswer' id='" + thisID + "' data-click-state='0'><img src=" + "'checkAnswerBG.gif' alt='show or hide answer'></div>";
			$(this).append(imageDiv); 		            
			});
			
//ADD SHOW/HIDE TOGGLE FUNCTION OF EACH ANSWER DIV TO EACH CORRESPONDING QUESTION DIV		
	i=0;
	$(".question").each(function(index){
		
		$("#showAnswer" + index).click(function(){
			if($(this).attr('data-click-state') == 0) {
			  $(this).attr('data-click-state', 1)
			  $("#answer" + index).css({"position":"relative","left":"0"});
			  $("#showAnswer" + index + "> img").attr('src', 'hideAnswerBG.gif');				
			}else{ 
			  $(this).attr('data-click-state', 0)
			  $("#answer" + index).css({"position":"absolute","left":"-9999px"});
			  $("#showAnswer" + index + "> img").attr('src', 'checkAnswerBG.gif');				
			}
		});				
	});
	
}//close if .answer conditional


//*********** SHOW/HIDE HIDDENTEXT DIVS ********
if ($(".hiddenText").length > 0) { 
//HIDE hiddenText DIVS
		$(".hiddenText").css({"position":"absolute","left":"-9999px"});
			
//FIND ALL .hiddenText CLASS DIVS- ASSIGN ID #
		$(".hiddenText").each(function(index){
			var thisID="hiddenText" + index;
		        $(this).attr("id",thisID);		            
		        });
		
//FIND ALL .showHidden CLASS DIVS- ASSIGN ID # & ATTRIBUTE, MAKE LINK
		$(".showHidden").each(function(index){
			$(this).attr('data-click-state',0);
			var thisID="showHidden" + index;
			var thisClass="showHidden";
			$(this).replaceWith("<a class='" + thisClass + "' id='" + thisID + "' data-click-state='0'>" + $(this).text() + "</a>"); 		            
			});

//ADD SHOW/HIDE TOGGLE FUNCTION OF EACH hiddenText DIV TO EACH CORRESPONDING showHidden DIV
  $(".showHidden").each(function(index){
	$("#showHidden" + index).click(function(){
		if($(this).attr('data-click-state') == 0) {
		$(this).attr('data-click-state', 1)
		$("#hiddenText" + index).css({"position":"relative","left":"0"});
		} else {
		$(this).attr('data-click-state', 0)
		$("#hiddenText" + index).css({"position":"absolute","left":"-9999px"});
		}	
	});
  });

}//close if .hiddenText conditional

//*********** READMORE SHOW/HIDE DIVS ******** 
if ($(".readmore").length > 0) {
//HIDE readmore DIVS
		$(".readmore").css({"position":"absolute","left":"-9999px"});
			
//FIND ALL .readmore CLASS DIVS- ASSIGN ID #
		$(".readmore").each(function(index){
			var thisID="readmore" + index;
		        $(this).attr("id",thisID);		            
		        });
		
//FIND ALL .readmorestart CLASS DIVS- ASSIGN ID #
		$(".readmorestart").each(function(index){
			var thisID="readmorelink" + index;
			var readmorelink="<div class='readmorelink' id='" + thisID + "' data-click-state='0'>READ MORE...</div>";
			$(this).append(readmorelink); 		            
			});
			
//ADD SHOW/HIDE TOGGLE FUNCTION OF EACH readmore DIV TO EACH CORRESPONDING readmorestart DIV		
	
	$(".readmorelink").each(function(index){
		$("#readmorelink" + index).click(function(){
		if($(this).attr('data-click-state') == 0) {
		  $(this).attr('data-click-state', 1)
		  $("#readmore" + index).css({"position":"relative","left":"0"});
		  $("#readmorelink" + index ).html('HIDE');
		} else {
	      $(this).attr('data-click-state', 0)
		  $("#readmore" + index).css({"position":"absolute","left":"-9999px"});
		  $("#readmorelink" + index).html('READ MORE..');
		}	
	  });
	  
	});
				
}//close if .readmore conditional

	
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
			$(".tooltip-content").css('position','absolute');

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