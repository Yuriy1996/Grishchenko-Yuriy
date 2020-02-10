"use strict";

const menuIcon = document.querySelector(".hamburger");

const mobileNav = document.querySelector(".nav__mobile-navbar");
const mobileNavLink = document.querySelectorAll(".nav__mobile-nav-link");

menuIcon.addEventListener("click", toogleMobileMenu);
mobileNavLink.forEach(item => item.addEventListener("click", toogleMobileMenu));

document.addEventListener("touchstart", handlerTouchForMenu);
document.addEventListener("touchend", handlerTouchForMenu);

let coordTouchStart = {
	clientX: 0,
	clientY: 0
};

function toogleMobileMenu() {
	menuIcon.classList.toggle("hamburger_active");
	mobileNav.classList.toggle("nav__mobile-navbar-active");
}

function handlerTouchForMenu(event) {
	if (event.target.closest(".row")) return;
		
	const touches = event.changedTouches[0];

	switch (event.type) {
		case "touchstart":
			coordTouchStart.clientX = touches.clientX;
			coordTouchStart.clientY = touches.clientY;
		break;
			
		case "touchend":
			const moveX = touches.clientX - coordTouchStart.clientX;
			const moveY = touches.clientY - coordTouchStart.clientY;
			
			if (moveX < -100 && !mobileNav.classList.contains("nav__mobile-navbar-active") && moveY < 100 && moveY > -100) {				
				toogleMobileMenu();
			}
			
			if (moveX > 100 && mobileNav.classList.contains("nav__mobile-navbar-active")) {
				toogleMobileMenu();
			}
		break;
	}
}