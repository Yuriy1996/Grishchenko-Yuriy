$(document).ready(function() {
	$(document).on("click", "a[href^='#']", function(event) {		
		event.preventDefault();		
		
		$("html").animate({
			scrollTop: $($(this).attr("href")).offset().top
		}, 500);		
	});
});