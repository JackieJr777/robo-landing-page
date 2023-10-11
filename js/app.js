
/* -----------------------------бургер------------------------------- */

const burger = document.querySelector(".btn-burger");
const menu = burger.closest(".menu-header");
// console.log(menu);

if(burger) {
  burger.addEventListener('click', function(){
    if(menu) {
      menu.classList.toggle("_header-active");
      document.body.parentElement.classList.toggle("_lock");
    }
  })

  window.addEventListener('resize', function() {
    if(window.innerWidth > 991.98) {
      menu.classList.remove("_header-active");
      document.body.parentElement.classList.remove("_lock");
    }
  })
}
/* ------------------------------------------------------------------ */

/* ----------всплывающая подсказка (тултип) и модальное окно----------*/

/* ---всплывающая подсказка--- */
document.addEventListener('click', tooltip)

function tooltip(e) {
  const targetElement = e.target;
  // console.log(targetElement);

  if(targetElement.closest(".tooltip__btn")) {
    targetElement.closest(".tooltip__btn").nextElementSibling.classList.toggle("_tooltip-open");
  }else {
    const tooltipBody = document.querySelector(".tooltip__text");
    if(tooltipBody.classList.contains("_tooltip-open")) {
      if(!targetElement.closest(".tooltip__text")) {
        tooltipBody.classList.remove("_tooltip-open");
      }        
    }
  } 
}
/* ---/всплывающая подсказка--- */


/* ---модальное окно---*/
const blockCoaches = document.querySelector(".coaches");

if(blockCoaches) {
  coaches.addEventListener('click', function(e) {
    const targetElement = e.target;
    // если нажали на кнопку Подробнее или на фото преподавателя
    if(targetElement.closest('.item-coaches__btn') || targetElement.closest('.item-coaches__image')) {
      document.querySelector(".popup").classList.add("_popup-open");
      document.body.parentElement.classList.add("_lock");
    }
    // если нажали на кнопку Закрыть (или на крестик на разрешении меньше 768px)
    if(targetElement.closest(".popup__close")) {
      if(document.querySelector(".popup").classList.contains("_popup-open")) {
        document.querySelector(".popup").classList.remove("_popup-open");
        document.body.parentElement.classList.remove("_lock");
        e.preventDefault();

        // Закрываем спойлеры, если они открыты
        const spoilerTexts = document.querySelectorAll('.spoiler-popup__text');
        const spoilerBtns = document.querySelectorAll('.spoiler-popup__btn');
        spoilerTexts.forEach(function(spoilerText) {
          spoilerText.classList.remove("spoiler-popup__text_active");
        })
        spoilerBtns.forEach(function(spoilerBtn) {
          spoilerBtn.classList.remove("_img-rotate");
        })
      }
    }
    // если нажали на пустое место вокруг модального окна
    if(targetElement.closest(".popup__body")) {  
      if(!targetElement.closest(".popup__content")) {
        // console.log("Клик по тёмной области!")
        if(document.querySelector(".popup").classList.contains("_popup-open")) {
          document.querySelector(".popup").classList.remove("_popup-open");
          document.body.parentElement.classList.remove("_lock");

          // Закрываем спойлеры, если они открыты
          const spoilerTexts = document.querySelectorAll('.spoiler-popup__text');
          const spoilerBtns = document.querySelectorAll('.spoiler-popup__btn');
          spoilerTexts.forEach(function(spoilerText) {
            spoilerText.classList.remove("spoiler-popup__text_active");
          })
          spoilerBtns.forEach(function(spoilerBtn) {
            spoilerBtn.classList.remove("_img-rotate");
          })
        }
      }
    }
  })
}
/* ---/модальное окно--- */

/* ------------------------------------------------------------------ */

/* --------------------навигация по странице------------------------- */

const menuLinks = document.querySelectorAll(".menu-header__link[data-goto]");
if(menuLinks.length) {
  menuLinks.forEach(function(menuLink) {
    menuLink.addEventListener('click', onMenuLinkClick);
  })

  function onMenuLinkClick(e) {
    const targetElement = e.target;
    if (targetElement.dataset.goto && document.querySelector(targetElement.dataset.goto)) {
      const gotoBlock = document.querySelector(targetElement.dataset.goto);
      gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY;


      if(menu.classList.contains('_header-active')) {
        menu.classList.remove("_header-active");
        document.body.parentElement.classList.remove("_lock");
      }


      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
/* ------------------------------------------------------------------ */






/* -----------------------------Табы--------------------------------- */


/* вариант №1 */

/* const tabs = document.querySelectorAll('.menu-tabs__link');
const tabsContainer = document.querySelector('.menu-tabs');
const tabsContent = document.querySelectorAll('.content-tabs__item');

// Вешаем прослушку на общего родителя ссылок
if(tabsContainer) {
  tabsContainer.addEventListener('click', function(e) {
    const targetElement = e.target;
    console.log(targetElement);
    // Проверяем, если клинутый объект - это ссылка
    if(targetElement.closest('.menu-tabs__link')) {
      // то:
      // 1) убираем классы .menu-tabs__link_active у всех ссылок 
      if(tabs.length) {
        tabs.forEach(function(tab) {
          tab.classList.remove('menu-tabs__link_active');
        })
      }
      // 2) убираем класс .content-tabs__item_active у всех вкладок с контентом
      if(tabsContent.length) {
        tabsContent.forEach(function(item) {
          item.classList.remove('content-tabs__item_active');
        })
      }

      // 3) добавляем класс .menu-tabs__link_active ТОЛЬКО кликнутой ссылке
      targetElement.closest('.menu-tabs__link').classList.add('menu-tabs__link_active');

      // 4) добавляем класс .content-tabs__item_active ТОЛЬКО нужному блоку с контентом
      document.querySelector(`.content-tabs__item_${targetElement.closest('.menu-tabs__link').dataset.tab}`).classList.add('content-tabs__item_active');
    }
  })
} */



/* вариант №2 */
// Получаем объекты
const tabs = document.querySelectorAll('.menu-tabs__link');
const tabsContainer = document.querySelector('.menu-tabs');
const tabsContent = document.querySelectorAll('.content-tabs__item');

// Вешаем обработчик события Клик на блок со ссылками
tabsContainer.addEventListener('click', function (e) {
  // Получаем кликнутый объект, но только тот, у которого в родителях есть объект с классом .menu-tabs__link (либо тот, который сам имеет этот класс .menu-tabs__link)
  const clicked = e.target.closest('.menu-tabs__link');

  // Guard clause - если кликнули не на полученный объект, то ничего не произойдёт (избежим ошибки с null)
  if (!clicked) return;

  // Удаляем классы с модификатором _active
  tabs.forEach(t => t.classList.remove('menu-tabs__link_active'));
  tabsContent.forEach(c => c.classList.remove('content-tabs__item_active'));

  // Добавляем класс ТОЛЬКО кликнутой ссылке
  clicked.classList.add('menu-tabs__link_active');

  // Добавляем класс блоку с контентом, но ТОЛЬКО тому, к-й соответствует кликнутой ссылке (т. е. добавляем класс тому блоку, у которого цифра модификатора равна значению дата-атрибута кликнутой ссылки)
  document.querySelector(`.content-tabs__item_${clicked.dataset.tab}`).classList.add('content-tabs__item_active');
});
/* -----------------------------/Табы-------------------------------- */




/* -----------------------------Спойлер------------------------------ */

const spoilerContainer = document.querySelector(".popup__spoiler");

if(spoilerContainer) {
  spoilerContainer.addEventListener('click', liteSpoiler)
}

function liteSpoiler(e) {
  const targetElement = e.target;

  if(targetElement.closest('.spoiler-popup__btn')) {
    targetElement.closest('.spoiler-popup__btn').classList.toggle("_img-rotate");
    targetElement.closest('.spoiler-popup__btn').nextElementSibling.classList.toggle("spoiler-popup__text_active");

  } 
}

/* if(!document.querySelector(".popup").classList.contains("_popup-open")) {
  
  const texts = document.querySelectorAll('.spoiler-popup__text');
  texts.forEach(function(text) {
    text.classList.remove("spoiler-popup__text_active");
  }) 
} */

/* ----------------------------/Спойлер------------------------------ */




/* -----------------------------Слайдер------------------------------ */


const sliderLine = document.querySelector('.coaches__items');
const sliderItems = document.querySelectorAll('.coaches__item');
const sliderItem = document.querySelector('.coaches__item');

let count = 0; // ссылается на активный слайдер (слайд?)

let width;


function init() {
  
  if (window.innerWidth < 768) {
    sliderLine.style.transform = `translate(${0}px)`;
  } else {
    console.log('resize');
    width = sliderItem.offsetWidth;
    // sliderLine.style.width = `${width}px`;
    console.log(width);
    console.log(count);
    rollSlider();
  }
}

// при загрузке страницы вызывается эта функция
init();


window.addEventListener('resize', init);



// кнопки
const btnPrev = document.querySelector('.button-prev');
const btnNext = document.querySelector('.button-next');


btnNext.addEventListener('click', function() {
  
  count++;
  if(count > 0) {
    btnPrev.style.opacity = 1;
  }
  /* if(window.innerWidth >= 1050) {
    // init(); */
    if (count >= sliderItems.length - 1) {
      count = sliderItems.length - 1;
      // btnNext.classList.remove('_transform-active');
      btnNext.style.opacity = 0.5;
    } else {
      btnNext.style.transform = !`translate(${0}px, ${0}px)`;
      // btnNext.classList.add('_transform-active');
    }
  /* } */
  /* if(window.innerWidth < 1050) {
    // init();
    if (count >= sliderItems.length - 3) {
      count = sliderItems.length - 3;
      btnNext.style.opacity = 0.5;
      count--;
    }
  } */
  rollSlider();
  // console.log(count);
})


btnPrev.addEventListener('click', function() {
  count--;
  if (count <= 0) {
    count = 0;
    btnPrev.style.opacity = 0.5;
  }

  if(btnNext.style.opacity = 0.5) {
      btnNext.style.opacity = 1;
  }
  rollSlider();
  // console.log(count);
})





function rollSlider() {
  sliderLine.style.transform = `translate(${-count * width}px)`;
}



/* ----------------------------/Слайдер------------------------------ */
