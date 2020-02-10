$(document).ready(function() {
	const $hamburger = $(".hamburger");
	
	const $navbar = $(".nav-tablet__navbar", ".nav-tablet");
	const $navLink = $navbar.find(".nav-tablet__link");

	console.log($navLink);

	$hamburger.on("click", toogleMobileMenu);
	$navLink.on("click", toogleMobileMenu);

	document.addEventListener("touchstart", handlerDocumentSwipe);
	document.addEventListener("touchend", handlerDocumentSwipe);

	let coordStartSwipe = {
		x: 0,
		y: 0
	}

	let touchTargetIsSwiper;
	
	function toogleMobileMenu() {
		$hamburger.toggleClass("hamburger--active");
		$navbar.toggleClass("nav-tablet__navbar--open");
	}

	function handlerDocumentSwipe(event) {
		const touches = {
			x: event.changedTouches[0].clientX,
			y: event.changedTouches[0].clientY
		};

		
		switch (event.type) {
			case "touchstart":
				coordStartSwipe.x = touches.x;
				coordStartSwipe.y = touches.y;
				
				touchTargetIsSwiper = Boolean($(event.target).closest(".swiper-container").length);
			break;

			case "touchend":
				const moveX = touches.x - coordStartSwipe.x;
				const moveY = touches.y - coordStartSwipe.y;
				
				if (moveY < 50 || moveY > -50) {

					if (moveX > 100 && $hamburger.hasClass("hamburger--active")) {
						toogleMobileMenu();
					}
	
					if (!touchTargetIsSwiper) {
						if (moveX < -100 && !$hamburger.hasClass("hamburger--active")) {
							toogleMobileMenu();						
						}
					}
				}

			break;
		}
	}
});
