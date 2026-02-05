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
           // Collapse each continuous wheel gesture into a single flip
           const GESTURE_TIMEOUT_MS = 260;    // how long until gesture considered ended
           const TRIGGER_THRESHOLD = 140;     // how much deltaY before triggering (trackpads)
           const BASE_LOCK_DISCRETE_MS = 200; // fast path for discrete mouse wheels
           const TRACKPAD_LOCK_MS = 900;      // base lock for trackpads before inertia check
           const INERTIA_LOCK_MS = 1300;      // extended lock when inertia is detected
           const INERTIA_WINDOW_MS = 220;     // time window to detect continuing scroll after a trigger
           const LINE_MODE_STEP = 40;         // approximate pixels per mousewheel step when deltaMode === 1

           let accumulator = 0;
           let gestureTimer = null;
           let lockedUntil = 0;
           let lastTriggerAt = 0;
           let postTriggerEvents = 0;
           let inertiaTimer = null;

           const handleWheel = (event) => {
                const now = Date.now();

                const isLineMode = event.deltaMode === 1;
                const wheelDelta = event.wheelDelta || 0;
                const looksDiscreteDelta = Math.abs(wheelDelta) > 0 && Math.abs(wheelDelta) % 120 === 0;
                const isDiscrete = isLineMode || looksDiscreteDelta || Math.abs(event.deltaY) >= 100;

                // Count inertia events only for trackpad-like (non-discrete) inputs during the brief window after a trigger
                if (!isDiscrete && lastTriggerAt && (now - lastTriggerAt) <= INERTIA_WINDOW_MS && now < lockedUntil) {
                     postTriggerEvents += 1;
                }

                if (now < lockedUntil) {
                     event.preventDefault();
                     return;
                }

                const delta = event.deltaY * (isLineMode ? LINE_MODE_STEP : 1);

                // If direction flips within a gesture, restart accumulation to avoid double triggers
                if (accumulator !== 0 && Math.sign(accumulator) !== Math.sign(delta)) {
                     accumulator = 0;
                }

                // For discrete mouse wheels, trigger immediately per step for snappiness
                if (isDiscrete) {
                     if (delta > 0) {
                          $("#nextpage").trigger("click");
                          lastTriggerAt = now;
                          lockedUntil = now + BASE_LOCK_DISCRETE_MS;
                     } else if (delta < 0) {
                          $("#prevpage").trigger("click");
                          lastTriggerAt = now;
                          lockedUntil = now + BASE_LOCK_DISCRETE_MS;
                     }
                     accumulator = 0;
                     postTriggerEvents = 0;
                     clearTimeout(inertiaTimer);
                } else {
                     accumulator += delta;
                     clearTimeout(gestureTimer);

                     const triggerNext = accumulator >= TRIGGER_THRESHOLD;
                     const triggerPrev = accumulator <= -TRIGGER_THRESHOLD;

                     if (triggerNext) {
                          $("#nextpage").trigger("click");
                          lastTriggerAt = now;
                          postTriggerEvents = 0;
                          lockedUntil = now + TRACKPAD_LOCK_MS;
                          accumulator = 0;
                          clearTimeout(inertiaTimer);
                          inertiaTimer = setTimeout(() => {
                               if (postTriggerEvents > 0) {
                                    lockedUntil = Math.max(lockedUntil, lastTriggerAt + INERTIA_LOCK_MS);
                               }
                          }, INERTIA_WINDOW_MS);
                     } else if (triggerPrev) {
                          $("#prevpage").trigger("click");
                          lastTriggerAt = now;
                          postTriggerEvents = 0;
                          lockedUntil = now + TRACKPAD_LOCK_MS;
                          accumulator = 0;
                          clearTimeout(inertiaTimer);
                          inertiaTimer = setTimeout(() => {
                               if (postTriggerEvents > 0) {
                                    lockedUntil = Math.max(lockedUntil, lastTriggerAt + INERTIA_LOCK_MS);
                               }
                          }, INERTIA_WINDOW_MS);
                     }

                     gestureTimer = setTimeout(() => {
                          accumulator = 0;
                     }, GESTURE_TIMEOUT_MS);
                }

                event.preventDefault();
           };

           // Use a non-passive listener so preventDefault works in Chrome
           window.addEventListener('wheel', handleWheel, { passive: false });
  
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