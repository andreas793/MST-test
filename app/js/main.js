document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector('.header__wrapper');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('body-scroll');
    } else {
      header.classList.remove('body-scroll');
    }
  });
  animationBlock();
  window.addEventListener('resize', () => {
    const bgRow = document.querySelectorAll('.test__block .bg_row');
    const bg = document.querySelectorAll('.test__block .bg');
    if(bgRow) bgRow.forEach((el) => {el.remove();});
    if(bg) bg.forEach((el) => {el.remove();});
    animationBlock();
  });

  function animationBlock(){
    const tb = document.querySelector('.test__block');
    const heightTB = tb.offsetHeight;
    const lineHeight = parseFloat(getComputedStyle(tb).lineHeight)
    const currentRow = Math.round(heightTB/lineHeight);
    const empty = tb.querySelectorAll('.test__block .empty');

    let arrs = [];

    for(let i = 0; i < currentRow; i++) {
      let top = 'top:' + (lineHeight * i + 24) + 'px';
      arrs.push({top: top});
      let row = document.createElement('div');
      row.classList.add('bg_row');
      row.style.cssText = 'top:' + ((i ? lineHeight * (i + 1) : lineHeight)) + 'px';
      tb.appendChild(row);

    }

    let current = 0;
    let linearGradient = []
    for (let i = 0; i < empty.length; i++) {

      let start = empty[i].offsetLeft;
      let end = start + empty[i].offsetWidth;
      let topPosition = empty[i].offsetTop

      if(topPosition > lineHeight){
        current = Math.round(topPosition/lineHeight);
      }
      if(i>0 && topPosition > empty[i-1].offsetTop) {
        current=Math.round(topPosition/lineHeight);
        linearGradient = [];
      }

      linearGradient.push({start, end })
      arrs[current].linearGradient = linearGradient;
    }

    function getLG(lg) {
      if(!lg) return `background-image: linear-gradient(to right, #000)`;
      let str = 'background-image: linear-gradient(to right,';
      for (let i = 0; i < lg.length; i++) {
        str += `
      #000 ${lg[i].start}px,
      transparent ${lg[i].start}px,
      transparent ${lg[i].end}px,
      #000 ${lg[i].end}px${(i< lg.length -1) ? ',' : ');' }`;
      }
      return str;
    }


    arrs.map(({top, linearGradient}) => {
      let el = document.createElement("div");
      el.classList.add('bg');
      el.style.cssText = top;
      el.style.cssText += getLG(linearGradient);
      tb.appendChild(el);
    })
  }



})