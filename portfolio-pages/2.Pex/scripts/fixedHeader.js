$(document).ready(function() {
	if (window.matchMedia("(min-width: 940px)").matches) {
		const $header = $(".header")
		const $introSite = $(".intro-site");
		const bottomIntroSite = $introSite.offset().top + $introSite.outerHeight();
		
		$(document).on("scroll", function() {
			if ($(this).scrollTop() >= bottomIntroSite) {
				$header.addClass("header--position--fixed-top");
			} else {
				$header.removeClass("header--position--fixed-top");
			}			
		});		
	}
});