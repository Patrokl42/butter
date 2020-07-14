document.addEventListener("DOMContentLoaded", function() {
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
    slidesPerView: 2,
    spaceBetween: 0,
    loop: true,
    observer: true,
    observeParents: true,

    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev',
    },

    breakpoints: {
      1500: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
    }
  })
};

function testymonialsSlider(sliderClass) {
  var mySwiper = new Swiper(sliderClass , {
    slidesPerView: 2,
    spaceBetween: 71,
    loop: true,

    navigation: {
      nextEl: '.testimonial-button-next',
      prevEl: '.testimonial-button-prev',
    },
  })
};

function gallery() {
  $('.gallery-wrapper .gallery-slide img').fancybox({
    // Options will go here
  });
}

function stickyNavbar() {
  const navbar = document.querySelector(".navigation");
  const sticky = navbar.offsetTop;

  window.onscroll = function() {

    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  };
}