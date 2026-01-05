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
           var isScrolling = false
           var scrollCooldown = 800 // ms - matches animation duration
           var scrollThreshold = 30 // minimum delta to trigger (filters small touchpad movements)
           var accumulatedDelta = 0
           var deltaResetTimeout = null
           
           $('body').on('mousewheel wheel DOMMouseScroll', function(event) {
                event.preventDefault()
                event.stopPropagation()
                
                if (isScrolling) return // Ignore scroll events during cooldown
                
                // Get delta from various event formats
                var delta = event.originalEvent.wheelDelta || -event.originalEvent.deltaY || -event.originalEvent.detail;
                
                // Accumulate small deltas (for touchpad)
                accumulatedDelta += delta
                
                // Clear accumulated delta after a pause
                clearTimeout(deltaResetTimeout)
                deltaResetTimeout = setTimeout(function() {
                     accumulatedDelta = 0
                }, 100);
                
                // Only trigger if accumulated delta exceeds threshold
                if (Math.abs(accumulatedDelta) < scrollThreshold) return;
                
                isScrolling = true
                accumulatedDelta = 0u// Reset after triggering
                
                if (delta < 0) {
                     $("#nextpage").trigger("click");
                }
                else if (delta > 0){
                     $("#prevpage").trigger("click");
                }
                
                setTimeout(function() {
                     isScrolling = false;
                }, scrollCooldown);
           });
  
          const aboutBtn = document.querySelector('.about-btn')
          const prevWorkBtn = document.querySelector('.prev-work-btn')
          const contactBtn = document.querySelector('.contact-btn')
          aboutBtn.addEventListener('click', () => {
             $("#nextpage").trigger("click")
             setTimeout(function() {
              $("#nextpage").trigger("click")
             }, 700)
          })
          prevWorkBtn.addEventListener('click', () => {
             $("#nextpage").trigger("click")
          })
          contactBtn.addEventListener('click', () => {
             $("#prevpage").trigger("click")
          })

      });
 });
}