 //NAVIGATE BETWEEN PAGES WITH ARROW KEYS
 jQuery(function($) {
      $("body").keydown(function(e) {
           if(e.keyCode == 38) { // up
                $("#prevpage").trigger("click");
           }
           else if(e.keyCode == 40) { // down
                $("#nextpage").trigger("click");
           }
      });
 });
 //NAVIGATE BETWEEN PAGES BY SCROLLING
 
 function isMobileWidth() {
    return $('#mobile-indicator').is(':visible');
}
if(isMobileWidth() === false) {
 jQuery(function($) {
      $(document).ready(function(){
           $('body').mousewheel(function(event, delta) {
                if (delta < 0 ){
                     $("#nextpage").trigger("click");
                }
                else if (delta > 0){
                     $("#prevpage").trigger("click");
                }
           });
      });
 });
}