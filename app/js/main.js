new Swiper('.slider-main', {
  loop: true,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: true,
    disableOnInteraction: false,
  },
});

let btnTheme = document.querySelector("#theme-dark");
btnTheme.addEventListener('click', function(e){
  let themeName = e.target.checked ? 'dark' : ''; 
  document.documentElement.setAttribute('theme', themeName)
  
});