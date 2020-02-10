"use strict";

const menuIcon = document.querySelector(".hamburger");

const mobileNav = document.querySelector(".nav__mobile-navbar");
const mobileNavLink = document.querySelectorAll(".nav__mobile-link");

menuIcon.addEventListener("click", toogleMobileMenu);
mobileNavLink.forEach(item => item.addEventListener("click", toogleMobileMenu));

function toogleMobileMenu() {
	menuIcon.classList.toggle("hamburger--active");
	mobileNav.classList.toggle("nav__mobile-navbar--active");
}