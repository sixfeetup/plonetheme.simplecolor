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
					$(".answer").css({"position":"absolute","left":"-9999px"});
					
					$("#question" + elementID + "> img").attr('src', 'checkAnswerBG.gif');
					
				};
		}(i)
		);		
		i++;
	});



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