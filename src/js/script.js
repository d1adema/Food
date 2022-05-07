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

    const modalTrigger = document.querySelectorAll("[data-modal]"),
          modal = document.querySelector(".modal");

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

    modal.addEventListener("click", (e) => {
        // Close modal window when user click on the background
        if (
            e.target === modal ||
            e.target.getAttribute('data-close') === ''
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

    const modalTimer = setTimeout(openModal, 50000); // Open modal after 50000ms = 5s

    window.addEventListener("scroll", showModalScroll); // Show modal by scroll (End of page)

    // Classes for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 2.72;
            this.changeToRUB();
        }

        changeToRUB() {
          this.price = Math.round(this.price * this.transfer);
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
              this.element = 'menu__item';
              element.classList.add(this.element);
            } else {
              this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
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
        '.menu .container',
        'menu__item'
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
      '.menu .container',
      'menu__item'
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
      '.menu .container',
      'menu__item'
  ).render();

  // Form

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/spinner.svg',
    success: 'Success!',
    failure: 'Fail :/'
  };

  forms.forEach((item) => {
    postData(item);
  });

  function postData(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageRequest = document.createElement('img');
    messageRequest.src = message.loading;
    messageRequest.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    form.insertAdjacentElement('afterbegin', messageRequest);

    const formData = new FormData(form);

    const obj = {};

    formData.forEach(function (value, key) {
      obj[key] = value;
    });

    fetch('ser1 ver.php', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(data => data.text()).then(data => {
      console.log(data);
      showThanksModal(message.success);
      form.reset();
      messageRequest.remove();
    }).catch(() => {
      showThanksModal(messageRequest.failure);
    }).finally(() => {
      form.reset();
    });
  });
  }

  function showThanksModal(message) {
    const prevModal = document.querySelector('.modal__dialog');

    prevModal.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('.modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;
    console.log(message);
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModal.classList.add('show');
      prevModal.classList.remove('hide');
      closeModal();
    }, 4000);
  }
});
