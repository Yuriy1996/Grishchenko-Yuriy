const anchorLinks = document.querySelectorAll("[href^='#']");

anchorLinks.forEach(item => {
	item.addEventListener("click", smoothScroll);
});

const heightHeader = document.querySelector(".header").clientHeight;

function smoothScroll(event) {
	event.preventDefault();	
	const animationTime = 200;
	const farmesNum = 20;
	const timeTimeout = animationTime / farmesNum;

	let framesCounter = 0;

	const targetSection = document.querySelector(this.getAttribute("href"));
	const targetSectionTop = targetSection.getBoundingClientRect().top - heightHeader;

	let scrollTraget = targetSection.getBoundingClientRect().top + pageYOffset - heightHeader;
	let step = 0;

	if (scrollTraget < 0) {
		scrollTraget = 0;
	}
	
	if (targetSectionTop > 0) {
		step = targetSectionTop / farmesNum;
	} else {
		step = targetSectionTop / farmesNum;
	}

	step = Math.floor(step);

	if (step <= 8 && step > 0 || step >= -8 && step < 0) {
		window.scrollTo(0, scrollTraget);
	} else {
		scrolling();
	}	
	
	function scrolling() {

		if (framesCounter == farmesNum) {
			window.scrollTo(0, scrollTraget);
		} else {
			framesCounter++;

			setTimeout(function() {
				window.scrollTo(0, pageYOffset + step);
				scrolling();
			}, timeTimeout);
		}
	}	

	// console.log(scrollTo);
}