document.addEventListener("DOMContentLoaded", function() {
  slider('.gallery-container');
  testymonialsSlider('.testimonials-slider');
});

function slider(sliderClass) {
  var mySwiper = new Swiper(sliderClass , {
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,

    navigation: {
      nextEl: '.gallery-button-next',
      prevEl: '.gallery-button-prev',
    },
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