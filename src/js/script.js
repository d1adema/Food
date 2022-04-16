"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");
    // let timerId;

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.style.display = "none";
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (
            target &&
            target.classList.contains("tabheader__item")
        ) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();

    // timer

    const deadline = "2022-05-21";

    function getTimeRemaining(endtime) {
        const d = Date.parse(endtime) - new Date(),
            days = Math.floor(d / (1000 * 60 * 60 * 24)),
            hours = Math.floor((d / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((d / 1000 / 60) % 60),
            seconds = Math.floor((d / 1000) % 60);
        return {
            total: d,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    }
    function checkZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, timeEnd) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const d = getTimeRemaining(timeEnd);

            days.innerHTML = checkZero(d.days);
            hours.innerHTML = checkZero(d.hours);
            minutes.innerHTML = checkZero(d.minutes);
            seconds.innerHTML = checkZero(d.seconds);

            if (d.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);

    // Modal window

    const modalTrigger =
            document.querySelectorAll("[data-modal]"),
        modal = document.querySelector(".modal"),
        modalClose = document.querySelector("[data-close]");

    function openModal() {
        // Function open modal window
        modal.classList.add("show");
        modal.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimer);
    }

    function closeModal() {
        // Function close modal window
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModalScroll() {
        // Show Modal By Scroll, okay?
        if (
            window.pageYOffset +
            document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            openModal();
            window.removeEventListener("scroll", showModalScroll);
        }
    }

    modalTrigger.forEach((btn) => {
        // For every button we add "onclick" event(Open modal window)
        btn.addEventListener("click", openModal);
    });

    modalClose.addEventListener("click", closeModal); // Close modal window

    modal.addEventListener("click", (e) => {
        // Close modal window when user click on the background
        if (
            modal.classList.contains("show") &&
            e.target === modal
        ) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        // Close modal window when user press button "Escape"
        if (
            e.code === "Escape" &&
            modal.classList.contains("show")
        ) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 5000); // Open modal after 5000ms = 5s

    window.addEventListener("scroll", showModalScroll); // Show modal by scroll (End of page)

    // Classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 2.72;
            this.changeToRUB();
        }

        changeToRUB() {
          this.price = Math.round(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
               <div class="menu__item">
                <img src=${this.src} alt=${this.alt} />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">
                  ${this.descr}
                </div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total">
                    <span>${this.price}</span> руб/день
                  </div>
                </div>
              </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый\n' +
        'дизайн упаковки, но и качественное исполнение\n' +
        'блюд. Красная рыба, морепродукты, фрукты -\n' +
        'ресторанное меню без похода в ресторан!',
        550,
        '.menu .container'
    ).render();

  new MenuCard(
      'img/tabs/post.jpg',
      'post',
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор\n' +
      'ингредиентов: полное отсутствие продуктов\n' +
      'животного происхождения, молоко из миндаля, овса,\n' +
      'кокоса или гречки, правильное количество белков за\n' +
      'счет тофу и импортных вегетарианских стейков.',
      430,
      '.menu .container'
  ).render();

  new MenuCard(
      'img/tabs/vegy.jpg',
      'vegy',
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению\n' +
      'блюд: больше свежих овощей и фруктов. Продукт\n' +
      'активных и здоровых людей. Это абсолютно новый\n' +
      'продукт с оптимальной ценой и высоким качеством!',
      229,
      '.menu .container'
  ).render();
});
