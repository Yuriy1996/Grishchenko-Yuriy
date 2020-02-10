"use strict";

const header = document.querySelector(".header");
const heightIntroSite = document.querySelector(".intro-site").offsetHeight;

document.addEventListener("scroll", fixedHeader);

function fixedHeader() {
	if (window.pageYOffset < heightIntroSite || document.documentElement.offsetWidth <= 640) {
		if (header.classList.contains("header_fixed")) {
			header.classList.remove("header_fixed");
		}

		return;
	};

	if (!header.classList.contains("header_fixed")) {
		header.classList.add("header_fixed");
	}
}