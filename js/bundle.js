/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
    // Калькулятор
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

        if(localStorage.getItem("sex")) {
            sex = localStorage.getItem("sex");
        } else {
            sex = 'female';
        }

        if(localStorage.getItem("ratio")) {
            ratio = localStorage.getItem("ratio");
        } else {
            ratio = 1.375;
        }

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '_____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem("ratio", ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem("sex", sex);
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
        
    }

    getStaticInformation('#gender div','calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    

    function getDymamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }


            switch (input.getAttribute('id')) {
                case 'height': height = +input.value;
                break;
                case 'weight': weight = +input.value;
                break;
                case 'age': age = +input.value;
                break;
            }
            calcTotal();
        });
    }

    getDymamicInformation('#height');
    getDymamicInformation('#weight');
    getDymamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/json-emulation.js":
/*!**************************************!*\
  !*** ./js/modules/json-emulation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": () => (/* binding */ menu),
/* harmony export */   "slideDb": () => (/* binding */ slideDb)
/* harmony export */ });
const menu = [
        {
          "img": "img/tabs/vegy.jpg",
          "altimg": "vegy",
          "title": "Меню 'Фитнес'",
          "descr": "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
          "price": 9
        },
        {
          "img": "img/tabs/post.jpg",
          "altimg": "post",
          "title": "Меню 'Постное'",
          "descr": "Меню 'Постное' - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
          "price": 14
        },
        {
          "img": "img/tabs/elite.jpg",
          "altimg": "elite",
          "title": "Меню 'Премиум'",
          "descr": "В меню 'Премиум' мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
          "price": 21
        }
      ];
const slideDb = [
        {
          "img": "img/slider/pepper.jpg",
          "altimg": "pepper",
          "num": 1
        },
        {
          "img": "img/slider/food-12.jpg",
          "altimg": "food",
          "num": 2
        },
        {
          "img": "img/slider/olive-oil.jpg",
          "altimg": "oil",
          "num": 3
        },
        {
          "img": "img/slider/paprika.jpg",
          "altimg": "paprika",
          "num": 4
        }
      ];

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabss() {
    // Табы
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsDescr = document.querySelectorAll('.tabcontent__descr'),
          tabsParent = document.querySelector('.tabheader__items'),
          sliderWindow = document.querySelector('.sliderWindow'),
          sliderInner = document.querySelector('.sliderInner'),
          width = window.getComputedStyle(sliderWindow).width;
    let offset = 0;  // отступ-ориентир чтобы двигать слайды

    sliderInner.style.width = 100 * tabsContent.length + '%';   // Делаем длину полотенца слайдов 100%
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';
    sliderWindow.style.overflow = 'hidden';
    sliderWindow.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots =[];
    indicators.classList.add('carousel-indicators');
    sliderWindow.append(indicators);

    for (let i = 0; i < tabsContent.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot);
    }

    tabsContent.forEach(slide => {
        slide.style.width = width;      // Делаем ширину всех слайдов одинаковой
    });
    tabsDescr[0].style.display = 'block';
    dots[0].style.opacity = '1';
    function usl () {
        if (offset == +width.replace(/\D/g, '') * (tabsContent.length - 1)) {
            offset = 0;
            sliderInner.style.transform = `translateX(-${offset}px)`;
        } else {
            offset += +width.replace(/\D/g, '');
            sliderInner.style.transform = `translateX(-${offset}px)`;
        }      
        let i = offset/(+width.replace(/\D/g, ''));
        if (i == 0) {
            tabs[tabsContent.length - 1].classList.remove('tabheader__item_active');
            tabs[i].classList.add('tabheader__item_active');
            tabsDescr[tabsContent.length - 1].style.display = 'none';
            tabsDescr[i].style.display = 'flex';
            dots[tabsContent.length - 1].style.opacity = '.5';
            dots[i].style.opacity = '1';
        } else{
            tabs[i-1].classList.remove('tabheader__item_active');
            tabs[i].classList.add('tabheader__item_active');
            tabsDescr[i-1].style.display = 'none';
            tabsDescr[i].style.display = 'flex';
            dots[i-1].style.opacity = '.5';
            dots[i].style.opacity = '1';
        }
    }

    let time = setInterval(usl, 5000);
    
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
    clearInterval(time);
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            dots[i].style.opacity = '.5';
            item.classList.remove('tabheader__item_active');
            tabsDescr[i].style.display = 'none';
            if (target == item) {
            item.classList.add('tabheader__item_active');
            offset = +width.replace(/\D/g, '')*i;
            sliderInner.style.transform = `translateX(-${offset}px)`;
            tabsDescr[i].style.display = 'block';
            dots[i].style.opacity = '1';
            }
        });
    }
    time = setInterval(usl, 5000);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const target = event.target;
        clearInterval(time);
        if (target) {
            dots.forEach((item, i) => {
                dots[i].style.opacity = '.5';
                tabs[i].classList.remove('tabheader__item_active');
                tabsDescr[i].style.display = 'none';
                if (target == item) {
                tabs[i].classList.add('tabheader__item_active');
                offset = +width.replace(/\D/g, '')*i;
                sliderInner.style.transform = `translateX(-${offset}px)`;
                tabsDescr[i].style.display = 'block';
                dots[i].style.opacity = '1';
                }
            });
        }
        time = setInterval(usl, 5000);
        });
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabss);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {//Timer

    const deadline = '2022-06-01';
    function getTimeRemainding(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / 1000 / 60 / 60 / 24),
            hours = Math.floor(total / (1000 * 60 * 60) % 24),
            minutes = Math.floor(total / (1000 * 60) % 60),
            seconds = Math.floor(total / 1000 % 60);

        return { total, days, hours, minutes, seconds };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemainding(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_json_emulation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/json-emulation */ "./js/modules/json-emulation.js");






window.addEventListener('DOMContentLoaded', () => {

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();

    // Карточки меню с ценами

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 80;
            this.changeToRub();
        }
        changeToRub() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes === 0) {
                this.el = 'menu__item';
                element.classList.add(this.el);
            } else {
                this.classes.forEach(className => element.classList.add(className));
                element.innerHTML = `
                    <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
                    </div>
                    </div>
                    `;
                this.parent.append(element);
            }

        }
    }

    _modules_json_emulation__WEBPACK_IMPORTED_MODULE_3__.menu.forEach(({ img, altimg, title, descr, price }) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    });

    // SLIDER
    const sliderMain = document.querySelector('.offer__slider-wrapper'),
        stLev = document.querySelector('.offer__slider-prev'),
        stPrav = document.querySelector('.offer__slider-next'),
        numSlide = document.querySelector('#current');
    let indexSlide = 1;

    stPrav.addEventListener('click', nextSlide);
    stLev.addEventListener('click', prevSlide);

    function addZero() {
        if (indexSlide <= 9) {
            numSlide.textContent = `0${indexSlide}`;
        } else {
            numSlide.textContent = indexSlide;
        }
        showSlide(indexSlide);
    }

    function nextSlide() {
        sliderMain.innerHTML = '';
        if (indexSlide == 4) {
            indexSlide = 1;
        } else {
            ++indexSlide;
        }
        addZero();
    }
    function prevSlide() {
        sliderMain.innerHTML = '';
        if (indexSlide == 1) {
            indexSlide = 4;
        } else {
            --indexSlide;
        }
        addZero();
    }

    class Slide {
        constructor(src, alt, n, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.n = n;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement('div');
            if (this.classes === 0) {
                this.cl = "offer__slide";
                element.classList.add(this.cl);
            } else {
                this.classes.forEach(className => element.classList.add(className));
                element.innerHTML = `
      <div class="offer__slide">
      <img src=${this.src} alt=${this.alt}>
      </div>
          `;
                this.parent.append(element);
            }

        }
    }

    function showSlide(indexSlide) {
        _modules_json_emulation__WEBPACK_IMPORTED_MODULE_3__.slideDb.forEach(({ img, altimg, num }) => {
            if (indexSlide == num) {
                new Slide(img, altimg, num,
                    '.offer__slider .offer__slider-wrapper').render();
            }
        });
    }
    showSlide(indexSlide);

    // Модальное окно

    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = window.setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => bindPostData(item));

    const postData = async (url, data) => {
        const res = fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return (await res).json;
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display : block;
            margin : 0 auto; 
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json1 = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json1)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch((data) => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class = "modal__content">
            <div class = "modal__close" data-close>&times;</div>
            <div class = "modal__title">${message}</div>
        </div>`;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map