$(document).ready(function () {	
	if (window.matchMedia("(max-width: 940px)").matches) {
		const mySwiper = new Swiper ('.swiper-container', {
			pagination: {
			  el: '.swiper-pagination',			  
			},
		})
	}
});