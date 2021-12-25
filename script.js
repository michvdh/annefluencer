'use strict';

/* --- HEADER - Hamburger Navigation --- */
const header = document.querySelector('.header');
const hamburger = document.querySelector('.mobile-nav');
const checkbox = document.querySelector('.checkbox');
const headerNav = document.querySelector('.header__nav');
// checkbox.checked = true;


hamburger.addEventListener('click', function () {

  // checkbox.checked == false ? checkbox.checked = true : checkbox.checked = false;

  if (checkbox.checked == false) {
    checkbox.checked = true;
    header.classList.add('nav--open');
    // header.style.height = '33rem';
  } else {
    checkbox.checked = false;
    header.classList.remove('nav--open');
    // header.style.height = '5rem';
  }

  checkbox.checked == true ? console.log('open') : console.log('closed');

});



/* --- HEADER - Smooth scrolling animation --- */
header.addEventListener('click', function (e) {
  e.preventDefault();

  // For the logo
  if (e.target.classList.contains('header__logo')) {
    const logoLink = document.querySelector('.header__logo').parentElement;

    if (logoLink.getAttribute('href') === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // for the other nav links
  if (e.target.classList.contains('header__link')) {
    const href = e.target.getAttribute('href');

    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      // console.log(sectionEl); // displays the specific section in html tag format

      sectionEl.scrollIntoView({
        behavior: 'smooth'
      });


      if (checkbox.checked === true) {
        checkbox.checked = false;
        header.classList.remove('nav--open');
      }
    }
  }

});


// /* --- HEADER - Sticky Navigation --- */
// const sectionHeroEl = document.querySelector('.hero');

// const obs = new IntersectionObserver(function (entries) {
//   const ent = entries[0];
//   console.log(ent);

//   if (ent.isIntersecting === false) {
//     document.body.classList.add('sticky');
//     // sectionHeroEl.classList.add('header-height-insert');
//   }

//   if (ent.isIntersecting) {
//     document.body.classList.remove('sticky');
//   }

// },
//   {
//     root: null, // null pertains to the viewport
//     threshold: 0, // means an event will be fired as soon as 0% of hero is inside the viewport .. or basically, if hero section is no longer visible from the viewport
//     rootMargin: '-80px'
//   }
// );

// obs.observe(sectionHeroEl);



/* --- HERO - Transition on windows load --- */

window.setTimeout(function () {
  const hero = document.querySelector('.hero');
  hero.classList.remove('section__hidden');
  hero.classList.add('section__reveal');
}, 700);





/* --- ALL PAGE - Reveal Sections --- */
const allSections = document.querySelectorAll('.section__reveal');
const healthcare = document.querySelectorAll('.section__reveal__healthcare');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section__hidden');
  observer.unobserve(entry.target); // removes observer once
}


const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.20
});

const sectionObserverHealthcare = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.10
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section__hidden');
});


healthcare.forEach(function (section) {
  sectionObserverHealthcare.observe(section);
  section.classList.add('section__hidden');
}); // created a separe section reveal for healthcare section since the height for this section is long for mobile devices




/* --- ALL PAGE - Lazy Loading --- */
const lazyLoadElements = document.querySelectorAll('[data-src]');

const loadElement = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
}

const lazyObserver = new IntersectionObserver(loadElement, {
  root: null,
  threshold: 0
});

lazyLoadElements.forEach(el => lazyObserver.observe(el));


/* --- Viewport detection size --- */
let viewportWidth;

window.addEventListener('resize', function () {
  carouselFunction();
});



/* --- REVIEWS - Slider --- */
const carouselFunction = function () {

  const slidesShort = document.querySelectorAll('.slider__slide--short');
  const slidesAverage = document.querySelectorAll('.slider__slide--average');
  const slidesLong = document.querySelectorAll('.slider__slide--long');
  let slides;
  viewportWidth = document.documentElement.clientWidth;
  const carousel = document.querySelector('.carousel');
  const slider = document.querySelector('.slider');
  const slide = document.querySelectorAll('.slider__slide');
  const btnLeft = document.querySelector('.chevron--left');
  const btnRight = document.querySelector('.chevron--right');
  const carouselWidth = carousel.getBoundingClientRect().width;
  let slidesArray = [];
  let translationComplete = true;


  const transitionCompleted = function () {
    translationComplete = true;
  }

  // displays only selected size based on viewport width
  if (viewportWidth >= 0 && viewportWidth < 568) {
    slides = slidesShort;

    slidesShort.forEach((s, i) => {
      s.style.display = 'initial';
    });

    slidesAverage.forEach((a, i) => {
      a.style.display = 'none';
    });

    slidesLong.forEach((l, i) => {
      l.style.display = 'none';
    });
  } 

  else if (viewportWidth >= 568 && viewportWidth < 1280) {
    slides = slidesAverage;

    slidesShort.forEach((s, i) => {
      s.style.display = 'none';
    });

    slidesAverage.forEach((s, i) => {
      s.style.display = 'initial';
    });

    slidesLong.forEach((s, i) => {
      s.style.display = 'none';
    });
  } 

  else if (viewportWidth >= 1280) {
    slides = slidesLong;

    slidesShort.forEach((s, i) => {
      s.style.display = 'none';
    });

    slidesAverage.forEach((s, i) => {
      s.style.display = 'none';
    });

    slidesLong.forEach((s, i) => {
      s.style.display = 'initial';
    });
  }

  // Initial Set - used to position slides side by side
  const slideCount = slides.length;
  const sliderWidth = carouselWidth * slideCount;
  slider.style.width = `${sliderWidth}px`;

  slides.forEach((s, i) => {
    const slidePosition = (i * carouselWidth) - carouselWidth;
    s.addEventListener('transitionend', transitionCompleted, true);

    if (slidePosition == 0) {
      s.style.opacity = '1';
      s.style.zIndex = '1';
    } else {
      s.style.opacity = '0';
      s.style.zIndex = '-1';
    }

    s.style.transform = `translateX(${slidePosition}px)`;
    slidesArray[i] = slidePosition;
  });


  // Right button
  btnRight.addEventListener('click', function () {
    if (translationComplete == true) {
      translationComplete = false;
      slides.forEach(function (s, i) {
        if (slidesArray[i] < 0) {
          slidesArray[i] = sliderWidth - carouselWidth + slidesArray[i];
          s.style.opacity = '0';
          s.style.zIndex = '-1';
        } else {
          slidesArray[i] = slidesArray[i] - carouselWidth;
          s.style.opacity = '1';
          s.style.zIndex = '1';
        }
        s.style.transform = `translateX(${slidesArray[i]}px)`;
      });
    }
  });

  // Left button
  btnLeft.addEventListener('click', function () {
    if (translationComplete == true) {
      translationComplete = false;
      slides.forEach(function (s, i) {
        if (slidesArray[i] == carouselWidth * (slideCount - 2)) {
          slidesArray[i] = -carouselWidth;
          s.style.opacity = '0';
          s.style.zIndex = '-1';
        } else {
          slidesArray[i] = slidesArray[i] + carouselWidth;
          s.style.opacity = '1';
          s.style.zIndex = '1';
        }

        s.style.transform = `translateX(${slidesArray[i]}px)`;
      });
    }
  });

  // Slide start and stop time and auto slide
  const carouselTimer = function () {
    const slideTime = setInterval(function () {
      if (translationComplete == true) {
        translationComplete = false;

        slides.forEach(function (s, i) {
          if (slidesArray[i] < 0) {
            slidesArray[i] = sliderWidth - carouselWidth + slidesArray[i];
            s.style.opacity = '0';
            s.style.zIndex = '-1';
          } else {
            slidesArray[i] = slidesArray[i] - carouselWidth;
            s.style.opacity = '1';
            s.style.zIndex = '1';
          }
          s.style.transform = `translateX(${slidesArray[i]}px)`;
        });
      }
    }, 2000);

    slider.addEventListener('mouseover', function () {
      clearInterval(slideTime);
    });

    btnLeft.addEventListener('mouseover', function () {
      clearInterval(slideTime);
    });

    btnRight.addEventListener('mouseover', function () {
      clearInterval(slideTime);
    });

    // by adding this, somehow, the saved value from previous window size is cleared, thus fixing the slider interval after resizing screen
    window.addEventListener('resize', function () {
      clearInterval(slideTime);
    });
  }

  carouselTimer();

  slider.addEventListener('mouseout', function () {
    carouselTimer();
  });

  btnLeft.addEventListener('mouseout', function () {
    carouselTimer();
  });

  btnRight.addEventListener('mouseout', function () {
    carouselTimer();
  });

}
carouselFunction();

