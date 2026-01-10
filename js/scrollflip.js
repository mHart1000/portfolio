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
           var pendingDirection = null // Stores direction until processed
           var rafId = null // requestAnimationFrame ID
           
           function processScroll() {
                if (isScrolling || pendingDirection === null) {
                     pendingDirection = null
                     return
                }
                
                isScrolling = true
                var direction = pendingDirection
                pendingDirection = null
                
                if (direction === 'next') {
                     $("#nextpage").trigger("click")
                } else {
                     $("#prevpage").trigger("click")
                }
                
                setTimeout(function() {
                     isScrolling = false
                }, scrollCooldown)
           }
           
           $('body').on('mousewheel wheel DOMMouseScroll', function(event) {
                event.preventDefault()
                event.stopPropagation()
                
                if (isScrolling) return // Ignore scroll events during cooldown
                
                // Get delta from various event formats
                var delta = event.originalEvent.wheelDelta || -event.originalEvent.deltaY || -event.originalEvent.detail
                
                // Determine direction - only set if not already pending
                if (pendingDirection === null) {
                     if (delta < 0) {
                          pendingDirection = 'next'
                     } else if (delta > 0) {
                          pendingDirection = 'prev'
                     }
                     
                     // Schedule processing for next animation frame
                     // This batches all scroll events in the current frame into one action
                     if (rafId) cancelAnimationFrame(rafId)
                     rafId = requestAnimationFrame(processScroll)
                }
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