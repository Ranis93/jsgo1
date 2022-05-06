"use strict";
import calc from './modules/calculator';
import tabss from './modules/tabs';
import timer from './modules/timer';
import { menu, slideDb } from './modules/json-emulation';

window.addEventListener('DOMContentLoaded', () => {

    tabss();
    timer();
    calc();

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

    menu.forEach(({ img, altimg, title, descr, price }) => {
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
        slideDb.forEach(({ img, altimg, num }) => {
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