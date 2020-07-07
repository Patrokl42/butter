document.addEventListener("DOMContentLoaded", function() {
  slider('.swiper-container');
});

function gallery(galleryClass, tabsClass) {
  $('.multiple-items').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
}

function slider(sliderClass) {
  var mySwiper = new Swiper(sliderClass , {
    slidesPerView: 4,
    spaceBetween: 0,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
};