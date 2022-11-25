// import './_vendor';
import vars from './_vars';
// import './_functions';
// import './_components';


const App= {
    init() {
        this.burgerMenu(),
        this.scrollToBlock(),
        this.swiperPartners()
    },

    burgerMenu() {
        const burger = document?.querySelector('[data-burger]');
        const menu = document?.querySelector('[data-menu]');
        const menuItems = document?.querySelectorAll('[data-menu-item]');
        const overlay = document?.querySelector('[data-menu-overlay]');

        burger?.addEventListener('click', (e) => {
            burger?.classList.toggle('header-burger--active');
            menu?.classList.toggle('header-mobile--active');

            if (menu?.classList.contains('header-mobile--active')) {
            burger?.setAttribute('aria-expanded', 'true');
            burger?.setAttribute('aria-label', 'Закрыть меню');
            this.disableScroll();
            } else {
            burger?.setAttribute('aria-expanded', 'false');
            burger?.setAttribute('aria-label', 'Открыть меню');
            this.enableScroll();
            }
        });

        overlay?.addEventListener('click', () => {
            burger?.setAttribute('aria-expanded', 'false');
            burger?.setAttribute('aria-label', 'Открыть меню');
            burger.classList.remove('header-burger--active');
            menu.classList.remove('header-mobile--active');
            this.enableScroll();
        });

        menuItems?.forEach(el => {
            el.addEventListener('click', () => {
            burger?.setAttribute('aria-expanded', 'false');
            burger?.setAttribute('aria-label', 'Открыть меню');
            burger.classList.remove('header-burger--active');
            menu.classList.remove('header-mobile--active');
            this.enableScroll();
            });
        });

        // $( window ).resize(function() {
        //     if ($(window).innerWidth > 1000) {
        //         menu.classList.remove('header-mobile--active');
        //     }
        // });
    },

    disableScroll() {
        const fixBlocks = document?.querySelectorAll('.fixed-block');
        const headerMain = document?.querySelector('.header')
        const pagePosition = window.scrollY;
        const paddingOffset = `${(window.innerWidth - vars.bodyEl.offsetWidth)}px`;
      
        vars.htmlEl.style.scrollBehavior = 'none';
        fixBlocks.forEach(el => { el.style.paddingRight = paddingOffset; });
        vars.bodyEl.style.paddingRight = paddingOffset;
        vars.bodyEl.classList.add('dis-scroll');
        vars.bodyEl.dataset.position = pagePosition;
        vars.bodyEl.style.top = `-${pagePosition}px`;
        headerMain.style.top = 0;
    },

    enableScroll() {
        const fixBlocks = document?.querySelectorAll('.fixed-block');
        const body = document.body;
        const pagePosition = parseInt(vars.bodyEl.dataset.position, 10);
        fixBlocks.forEach(el => { el.style.paddingRight = '0px'; });
        vars.bodyEl.style.paddingRight = '0px';
      
        vars.bodyEl.style.top = 'auto';
        vars.bodyEl.classList.remove('dis-scroll');
        window.scroll({
          top: pagePosition,
          left: 0
        });
        vars.bodyEl.removeAttribute('data-position');
        // vars.htmlEl.style.scrollBehavior = 'smooth';
    },

    scrollToBlock() {
        const linksToblock = $('[data-value]')
        linksToblock.each(function() {
            $(this).on('click', function() {
                const target = $('[data-target="'+$(this).data('value')+'"]')
                $('html').animate({
                    scrollTop: target.offset().top - 100
                }, 600)
            })
        })
    },

    swiperPartners() {
        const swiper = new Swiper('.swiper', {
            slidesPerView: 3,
            spaceBetween: 10,
            centeredSlides: true,
            spaceBetween: 10,
            initialSlide: 2,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        });
    }
}

App.init()