document.addEventListener("DOMContentLoaded", function() {
  const orderBasket = [];
  basket(orderBasket);

  slider('.gallery-container');

  testymonialsSlider('.testimonials-slider');

  contentSwitcher('.tabs-gallery .tabs__item','.gallery .gallery-container', 'gallery-container--active');
  contentSwitcher('.tabs-menu .tabs__item','.dishes-wrapper .dishes-inner', 'dishes-inner--active');

  inputDay('.input-day', '.input-block__plus', '.input-block__minus', '.input-block__content span');

  inputNumber(
      document.querySelector('.input-person'),
      document.querySelector('.input-block__plus'),
      document.querySelector('.input-block__minus'),
      document.querySelector('.input-block__content span')
  );

  quantity('.quantity__controls');

  gallery();

  stickyNavbar();
  burgerMenu();

  const dishesTypeArray = document.querySelectorAll('.dishes-inner');
  dishesTypeArray.forEach(dishesType => {
    dishesSwitcher(
        `[data-item-type = "${dishesType.dataset.itemType}"]`,
        '.dishes',
        '.pagination__prev',
        '.pagination__next',
        '.pagination__curent-position',
        '.pagination__last-position',
        'dishes--active'
    );
  })
});

function basket(orderBasket) {
  dishesArray = document.querySelectorAll('.dishes__item');
  
  dishesArray.forEach(item => {
    item.querySelector('.quantity > button').addEventListener('click', () => {
      orderBasket = addDishes(item.querySelector('.quantity'), orderBasket, item.querySelector('.quantity .quantity__info span'));
    });
  });
}

function addDishes(controlsTag, orderBasket, dishesNumberTag) {
  const dishesId = controlsTag.dataset.dishesId * 1;
  const dishesIsExist = orderBasket.find(dishes => dishesId === dishes.id);
  const dushesNumber = dishesNumberTag.innerHTML * 1;
  dishesNumberTag.innerHTML = 1;

  if (!dishesIsExist) {
    return [...orderBasket,
      {id: dishesId, number: dushesNumber}
    ];
  } else {
    return orderBasket.map(
      dishes => dishesId === dishes.id
        ? { ...dishes, number: dishes.number + dushesNumber }
        : dishes,
    );
  }
}

function quantity(_quantity) {
  const quantity = document.querySelectorAll(_quantity);
  quantity.forEach(item => {
    inputNumber(
        item,
        item.querySelector('.quantity__plus'),
        item.querySelector('.quantity__minus'),
        item.querySelector('.quantity__info span'),
    )
  })
}

function inputNumber(input, addButton, removeButton, content) {
  let amount = 1;

  addButton.addEventListener('click', () => {
    if(amount < 20) {
      amount++;
      content.innerHTML = amount + ' ';
    }
  });

  removeButton.addEventListener('click', () => {
    if(amount > 1) {
      amount--;
      content.innerHTML = amount + ' ';
    }
  });
}

function inputDay(_input, _addButton, _removeButton, _content) {
  const days = [
      'Понеділок',
      'Вівторок',
      'Середа',
      'Четвер',
      'Пятниця',
      'Субота',
      'Неділя',
  ];
  const addButton = document.querySelector(`${_input} ${_addButton}` );
  const removeButton = document.querySelector(`${_input} ${_removeButton}`);
  const content = document.querySelector(`${_input} ${_content}`);
  let currentDay = 0;

  addButton.addEventListener('click', () => {
    if(days.length-1 > currentDay) {
      currentDay++;
      content.innerHTML = days[currentDay];
    }
  });

  removeButton.addEventListener('click', () => {
    if(currentDay > 0) {
      currentDay--;
      content.innerHTML = days[currentDay];
    }
  });
}

function dishesSwitcher(_dishesType, _itemsWrapper, _prevButton, _nextButton, _currentPosition, _lastPosition, activeClass) {
  const items = document.querySelectorAll(`${_dishesType} ${_itemsWrapper}`);
  const prevButton = document.querySelector(`${_dishesType} ${_prevButton}`);
  const nextButton = document.querySelector(`${_dishesType} ${_nextButton}`);
  const totalNumber = items.length;
  let currentPosition = 0;

  document.querySelector(`${_dishesType} ${_lastPosition}`).innerHTML = totalNumber;

  prevButton.addEventListener('click', () => {
    if(currentPosition > 0) {
      currentPosition--;

      removeClassFromQuery(items, activeClass);
      items[currentPosition].classList.add(activeClass);
      document.querySelector(`${_dishesType} ${_currentPosition}`).innerHTML = currentPosition +1;
    }
  });

  nextButton.addEventListener('click', () => {
    if(currentPosition < totalNumber-1) {
      currentPosition++;

      removeClassFromQuery(items, activeClass)
      items[currentPosition].classList.add(activeClass);
      document.querySelector(`${_dishesType} ${_currentPosition}`).innerHTML = currentPosition +1;
    }
  });
}

function contentSwitcher(_switchers, _items, activeClass) {
  const switchers = document.querySelectorAll(_switchers);
  const items = document.querySelectorAll(_items);

  switchers.forEach(switcher => {
    switcher.addEventListener('click', () => {
      removeClassFromQuery(switchers, 'tabs__item--active');
      removeClassFromQuery(items, activeClass);

      switcher.classList.add('tabs__item--active');

      setActiveElementByDataAttribute(items, switcher.dataset.itemType, activeClass)
    })
  });
}

function removeClassFromQuery(query, className) {
  query.forEach(item => {
    item.classList.remove(className);
  });
}

function setActiveElementByDataAttribute(query, dataAttribute, activeClass) {
  query.forEach(item => {
    item.dataset.itemType === dataAttribute ? item.classList.add(activeClass) : null
  });
}

function slider(sliderClass) {
  var mySwiper = new Swiper(sliderClass , {
    slidesPerView: 4,
    spaceBetween: 0,
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev',
    },

    breakpoints: {
      300: {
        slidesPerView: 2
      },
      700: {
        slidesPerView: 3,
      },
      1100: {
        slidesPerView: 4,
      },
    }
  })
};

function testymonialsSlider(sliderClass) {
  var mySwiper = new Swiper(sliderClass , {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,

    navigation: {
      nextEl: '.testimonial-button-next',
      prevEl: '.testimonial-button-prev',
    },

    breakpoints: {
      300: {
        slidesPerView: 1
      },

      850: {
        slidesPerView: 2,
        spaceBetween: 30
      },

      1250: {
        spaceBetween: 71
      }
    }
  })
};

function gallery() {
  $('[data-fancybox]').fancybox({
    buttons : [
      'close'
    ],

    infobar: true,

    beforeShow: function() {
      setBlur(['.navigation', '.gallery', '.header', '.menu']);
    },

    afterClose: function() {
      removeBlur(['.navigation', '.gallery', '.header', '.menu']);
    },

    btnTpl: {
      close:
          '<button data-fancybox-close class="fancybox-button--close btn btn--icon btn--green" title="{{CLOSE}}">' +
          '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 1L14 14" stroke="black"/> <path d="M1 14L14 0.999999" stroke="black"/> </svg>' +
          "</button>",

      arrowLeft:
          '<button data-fancybox-prev class=" btn btn--icon btn--green" title="{{PREV}}">' +
          '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 17L0.999999 9L9 1" stroke="#333333"/> </svg>' +
          "</button>",

      arrowRight:
          '<button data-fancybox-next class="btn btn--icon btn--green" title="{{NEXT}}">' +
          '<svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1 1L9 9L1 17" stroke="#333333"/> </svg>' +
          "</button>",
    },

    baseTpl:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-inner">' +
        '<div class="fancybox-toolbar">{{buttons}}</div>' +
        '<div class="fancybox-stage"><div class="gallery-controls"> <div class="fancybox-infobar"><span data-fancybox-index></span><svg width="45" height="1" viewBox="0 0 45 1" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0.5H45" stroke="black"/> </svg><span data-fancybox-count></span></div> <div class="fancybox-navigation">{{arrows}}</div></div></div>' +
        '</div>' +
        '</div>',
  });
}

function setBlur(classList) {
  classList.forEach(item => {
    document.querySelector(item).classList.add('blured');
  });
}

function removeBlur(classList) {
  classList.forEach(item => {
    document.querySelector(item).classList.remove('blured');
  });
}

function stickyNavbar() {
  const navbar = document.querySelector(".navigation");
  const sticky = navbar.offsetHeight;
  const sections = document.querySelectorAll("#section");
  const navItems = document.querySelectorAll(".nav-list__item");

  window.onscroll = function() {

    sections.forEach((item) => {
      if (window.pageYOffset > item.offsetTop - 95) {
        removeClassFromQuery(document.querySelectorAll('.nav-list .nav-list__item'), 'nav-list__item--active');

        document.querySelector(".nav-list")
          .querySelector(`[data-nav-index="${item.dataset.sectionIndex}"]`)
          .classList
          .add('nav-list__item--active');
      } else {
        document.querySelector(".nav-list")
          .querySelector(`[data-nav-index="${item.dataset.sectionIndex}"]`)
          .classList
          .remove('nav-list__item--active');
      }
    });

    if (window.pageYOffset >= 20) {
      navbar.classList.add("navigation--sticky");
    } else {
      navbar.classList.remove("navigation--sticky");
      document
        .querySelectorAll('.nav-list .nav-list__item')[0]
        .classList
        .add('nav-list__item--active');
    }
  };
  

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      window.scrollTo({
        top: document
              .querySelector(`[data-section-index="${item.dataset.navIndex}"]`)
              .getBoundingClientRect().top + window.pageYOffset - 70,
        behavior: 'smooth'
      });
    });
  });
}

function burgerMenu() {
  const burger = document.querySelector(".burger-icon");
  const navigationList = document.querySelector(".nav-list");
  const basket = document.querySelector(".navigation__inner > .basket");
  console.log(basket);

  burger.addEventListener('click', () => {
    burger.classList.toggle("burger-icon--active");
    navigationList.classList.toggle("nav-list--open");
    basket.classList.toggle("hide-opacity");
  });
}