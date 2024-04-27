// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

function initCart() {
	if (document.querySelector(".cart")) {
		const activeClass = "_cart-open";

		const btnOpen = document.querySelector(".cart__open-btn");
		const btnClose = document.querySelector(".cart__close-btn");

		function openCart() {
			document.documentElement.classList.add(activeClass);

			document.addEventListener("click", closeWatcher);
		}

		function closeCart() {
			document.documentElement.classList.remove(activeClass);
		}

		function closeWatcher(event) {
			if (event.target.closest(".cart__close-btn") || (event.target.closest(".cart__wrapper") && !event.target.closest(".cart__body"))) {
				closeCart();
				document.removeEventListener("click", closeWatcher);
			}
		}

		btnOpen.addEventListener("click", () => {
			openCart();
		});
	}
}
function initCatalog() {
	if (document.documentElement.clientWidth > 767.98) {
		const activeClass = "_catalog-open";
		const catalogButton = document.querySelector("[data-catalog]");
		function openCatalog(e) {
			e.preventDefault();
			if (!document.documentElement.classList.contains(activeClass)) {
				document.documentElement.classList.add(activeClass);
				document.addEventListener("click", closeCatalog);
			}
			catalogButton.removeEventListener("click", openCatalog);
		}

		function closeCatalog(e) {
			if (e.target.closest("[data-catalog]") && e.target.closest(".menu__link")) e.preventDefault();
			else if (!e.target.closest(".header")) {
				document.documentElement.classList.remove(activeClass);
				document.removeEventListener("click", closeCatalog);

				catalogButton.addEventListener("click", openCatalog);
			}
		}
		catalogButton.addEventListener("click", openCatalog);

		const categoriesButtonsList = document.querySelectorAll(".sub-menu__link");

		document.addEventListener("click", (e) => {
			if (e.target.closest(".sub-menu__link")) {
				e.preventDefault();
				categoriesButtonsList.forEach((button) => {
					if (button == e.target.closest(".sub-menu__link") && !button.closest(".sub-menu__item").classList.contains("_active")) {
						button.closest(".sub-menu__item").classList.add("_active");
					} else if (button.closest("._active") && button != e.target.closest(".sub-menu__link")) {
						button.closest(".sub-menu__item").classList.remove("_active");
					}
				});
			}
		});
	}
}
function initSearch() {
	if (document.documentElement.clientWidth > 767.98) {
		const activeClass = "_search-open";
		const searchButton = document.querySelector(".header__search-open-btn");
		function openSearchForm() {
			searchButton.removeEventListener("click", openSearchForm);
			document.documentElement.classList.add(activeClass);

			setTimeout(() => {
				document.addEventListener("click", watcherToClose);
			}, 100);
		}
		function watcherToClose(e) {
			if (!e.target.closest(".search-form")) {
				e.preventDefault();
				document.documentElement.classList.remove(activeClass);
				document.removeEventListener("click", watcherToClose);
				searchButton.addEventListener("click", openSearchForm);
			}
		}
		if (searchButton) {
			searchButton.addEventListener("click", openSearchForm);
		}
	}
}
function initFilter() {
	if (document.querySelector(".filter") && document.documentElement.clientWidth < 1151) {
		function openFilter() {
			document.documentElement.classList.add("filter-open");
			document.documentElement.classList.add("lock");
		}
		function closeFilter() {
			document.documentElement.classList.remove("filter-open");
			document.documentElement.classList.remove("lock");
		}

		document.addEventListener("click", (e) => {
			if (e.target.closest(".catalog__filter-btn-open")) openFilter();
			else if (e.target.closest(".filter__btn-close") || e.target.closest(".filter__button-submit") || e.target.closest(".filter__button-clear")) {
				closeFilter();
			}
		});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initCart();
	initCatalog();
	initSearch();
	initFilter();
});
