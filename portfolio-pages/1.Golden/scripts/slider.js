"use strict";

if (window.matchMedia("(max-width: 640px)").matches) {

	const sliders = document.querySelectorAll(".slider .slider__container");
	
	sliders.forEach(createSlider);	
}

function createSlider(slider) {
	const slides = slider.querySelectorAll(".slider .slider__slide");
	
	const counterCol = createCounterCol(slides.length);
	slider.closest(".slider").insertAdjacentElement("afterend", counterCol);
	
	slider.addEventListener("touchstart", handlerTouch);
	slider.addEventListener("touchmove", handlerTouch);
	slider.addEventListener("touchend", handlerTouch);
	
	let coordTouchStart = {
		clientX: 0,
		clientY: 0
	};
	
	let currentTranslateX = 0;

	let isHorizontalTouchmove = false;
	
	function handlerTouch(event) {
		const touches = event.changedTouches[0];
		
		const moveX = touches.clientX - coordTouchStart.clientX;
		const moveY = touches.clientY - coordTouchStart.clientY;			
		
		const targetSlide = event.target.closest(".slider__slide");
		
		switch (event.type) {
			case "touchstart":
				coordTouchStart.clientX = touches.clientX;
				coordTouchStart.clientY = touches.clientY;			
			break;
				
			case "touchmove":
				slider.style.transition = "";

				if (!isHorizontalTouchmove && (Math.abs(moveX) > Math.abs(moveY))) {
					isHorizontalTouchmove = true;
					document.body.style.overflow = "hidden";
				}

				if (isHorizontalTouchmove) {
					slider.style.transform = `translateX(${currentTranslateX + moveX}px)`;
				}
			break;		
				
			case "touchend":
				slider.style.transition = "transform 0.4s linear";
				isHorizontalTouchmove = false;
				document.body.style.overflow = "";

				if (moveY > 50 || moveY < -50 || (moveX > -50 && moveX < 50)) {
					slider.style.transform = `translateX(${currentTranslateX}px)`;
					return;
				}
	
				if (moveX < -50) {
					if (!targetSlide.nextElementSibling) {
						slider.style.transform = `translateX(${currentTranslateX}px)`;
						return;
					}
	
					slider.style.transform = `translateX(-${targetSlide.nextElementSibling.offsetLeft}px)`;
					activeCounterCol(slider.closest(".slider").nextElementSibling, "nextElementSibling");
	
					currentTranslateX = -targetSlide.nextElementSibling.offsetLeft;
				}
				
				if (moveX > 50) {
					if (!targetSlide.previousElementSibling) {
						slider.style.transform = `translateX(${currentTranslateX}px)`;
						return;
					}
	
					slider.style.transform = `translateX(-${targetSlide.previousElementSibling.offsetLeft}px)`;
					activeCounterCol(slider.closest(".slider").nextElementSibling, "previousElementSibling");
	
					currentTranslateX = -targetSlide.previousElementSibling.offsetLeft;
				}				
			break;
		}
	}
}

function createCounterCol(numCol) {
	const counterCol = document.createElement("div");
	counterCol.classList.add("counter-col");

	for (let i = 0; i < numCol; i++) {
		const circle = document.createElement("div");
		circle.classList.add("counter-col__circle");

		if (i == 0) {
			circle.classList.add("counter-col__circle_active");
		}

		counterCol.append(circle);
	}

	return counterCol;
}

function activeCounterCol(counterCol, nextActiveCircle) {
	const activeCircle = counterCol.querySelector(".counter-col__circle_active");
	nextActiveCircle = activeCircle[nextActiveCircle];

	if (!nextActiveCircle) return;

	activeCircle.classList.remove("counter-col__circle_active");
	nextActiveCircle.classList.add("counter-col__circle_active");
}