/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination, Thumbs } from "swiper/modules";
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	if (document.querySelector(".showcase__slider") && document.documentElement.clientWidth > 767) {
		const sliders = document.querySelectorAll(".showcase__slider");
		sliders.forEach((slider) => {
			const buttonPrev = slider.querySelector(".swiper-button-prev");
			const buttonNext = slider.querySelector(".swiper-button-next");
			new Swiper(slider, {
				modules: [Navigation],
				observer: true,
				observeParents: true,
				slidesPerView: 5,
				spaceBetween: 30,
				speed: 800,

				//touchRatio: 0,
				//simulateTouch: false,
				//loop: true,
				//preloadImages: false,
				//lazy: true,

				// Кнопки "вліво/вправо"
				navigation: {
					prevEl: buttonPrev,
					nextEl: buttonNext,
				},

				// Брейкпоінти
				breakpoints: {
					640: {
						slidesPerView: 2,
					},
					992: {
						slidesPerView: 3,
					},
					1100: {
						slidesPerView: 4,
					},
					1400: {
						slidesPerView: 5,
					},
				},

				// Події
				on: {},
			});
		});
	}
	if (document.querySelector(".main-block__slider")) {
		new Swiper(".main-block__slider", {
			modules: [Pagination, EffectFade, Autoplay],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 800,
			autoplay: {
				delay: 5000,
			},
			effect: "fade",
			pagination: {
				el: ".main-block__slider .swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},
			on: {},
		});
	}
	if (document.querySelector(".product-small-images__slider") && document.querySelector(".product-big-images__slider")) {
		const smallImageSlider = new Swiper(".product-small-images__slider", {
			observer: true,
			observeParents: true,
			slidesPerView: "auto",
			spaceBetween: 20,
			direction: "vertical",
		});
		const bigImageSlider = new Swiper(".product-big-images__slider", {
			modules: [EffectFade, Thumbs],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 10,
			autoHeight: true,
			thumbs: {
				swiper: smallImageSlider,
			},
			breakpoints: {
				768: {
					autoHeight: false,
					effect: "fade",
				},
			},
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector(".swiper-scrollbar");
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: "vertical",
				slidesPerView: "auto",
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false,
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});
