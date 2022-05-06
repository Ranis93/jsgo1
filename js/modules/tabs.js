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

export default tabss;