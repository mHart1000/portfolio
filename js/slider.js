(function() {

	var slides = document.querySelectorAll('#slides .slide');
	var currentSlide = 0;
	var slideInterval = setInterval(nextSlide,2200);

	function nextSlide() {
	    slides[currentSlide].className = 'slide';
	    currentSlide = (currentSlide+1)%slides.length;
	    slides[currentSlide].className = 'slide showing';
	}






})();
