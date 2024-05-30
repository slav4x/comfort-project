/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(380);

document.addEventListener('DOMContentLoaded', function () {
  Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
  });

  Fancybox.bind('[data-src="#popup"]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
    on: {
      done: (fancybox, slide) => {
        const form = slide.triggerEl.dataset.form;
        const input = document.querySelector('.popup input[name="form"]');
        input.value = form;
      },
    },
  });

  const maskOptions = {
    mask: '+7 (000) 000-00-00',
    lazy: false,
    placeholderChar: '_',
    onFocus: function () {
      if (this.value === '') this.value = '+7 ';
    },
    onBlur: function () {
      if (this.value === '+7 ') this.value = '';
    },
  };

  const maskedElements = document.querySelectorAll('.masked');
  maskedElements.forEach((item) => new IMask(item, maskOptions));

  const tagsBtn = document.querySelector('.tags-more a');
  tagsBtn?.addEventListener('click', function (event) {
    event.preventDefault();
    const tagsWrapper = document.querySelector('.tags-wrapper');
    const tagsList = document.querySelector('.tags-list');
    const expandedHeight = tagsList.scrollHeight;
    const collapsedHeight = 44;

    if (tagsWrapper.style.height === `${expandedHeight}px`) {
      tagsWrapper.style.height = `${collapsedHeight}px`;
      tagsBtn.innerHTML = 'Показать еще';
      tagsBtn.classList.remove('open');
    } else {
      tagsWrapper.style.height = `${expandedHeight}px`;
      tagsBtn.innerHTML = 'Скрыть';
      tagsBtn.classList.add('open');
    }
  });

  document.querySelectorAll('.catalog-item__plan-switch li').forEach((item) => {
    item.addEventListener('click', function () {
      const parent = this.closest('.catalog-item');
      parent.querySelector('.catalog-item__plan-switch li.active').classList.remove('active');
      this.classList.add('active');
      const imgSrc = this.getAttribute('data-image');
      parent.querySelector('.catalog-item__plan').setAttribute('src', imgSrc);
    });
  });

  const catalogCarousel = new Swiper('.catalog-item__carousel', {
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.catalog-item__arrow-next',
      prevEl: '.catalog-item__arrow-prev',
    },
  });

  const filterCatalog = document.querySelector('.filter-catalog');
  const filterCatalogChecked = filterCatalog?.querySelector('.filter-catalog__checked');
  const filterCatalogList = filterCatalog?.querySelector('.filter-catalog__list');
  filterCatalogChecked?.addEventListener('click', function () {
    filterCatalogList.classList.toggle('open');
  });

  const filterMoreBtn = document.querySelector('.filter-more__btn a');
  filterMoreBtn?.addEventListener('click', function (event) {
    event.preventDefault();
    const tagsWrapper = document.querySelector('.filter-more');
    const tagsList = document.querySelector('.filter-more__wrapper');
    const expandedHeight = tagsList.scrollHeight;

    if (tagsWrapper.style.height === `${expandedHeight}px`) {
      tagsWrapper.style.height = `0px`;
      filterMoreBtn.innerHTML = 'Дополнительные параметры';
      filterMoreBtn.classList.remove('open');
    } else {
      tagsWrapper.style.height = `${expandedHeight}px`;
      filterMoreBtn.innerHTML = 'Скрыть';
      filterMoreBtn.classList.add('open');
    }
  });

  const rangeSlider = document.getElementById('price-slider');
  if (rangeSlider) {
    const input0 = document.getElementById('input-0');
    const input1 = document.getElementById('input-1');
    const inputs = [input0, input1];

    const minValue = parseInt(input0.getAttribute('min'));
    const maxValue = parseInt(input0.getAttribute('max'));

    noUiSlider.create(rangeSlider, {
      start: [minValue, maxValue],
      connect: true,
      step: 1,
      range: {
        min: [minValue],
        max: [maxValue],
      },
    });

    rangeSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;

      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }

  const areaSlider = document.getElementById('area-slider');
  if (areaSlider) {
    const input0 = document.getElementById('input-2');
    const input1 = document.getElementById('input-3');
    const inputs = [input0, input1];

    const minValue = parseInt(input0.getAttribute('min'));
    const maxValue = parseInt(input0.getAttribute('max'));

    noUiSlider.create(areaSlider, {
      start: [minValue, maxValue],
      connect: true,
      step: 1,
      range: {
        min: [minValue],
        max: [maxValue],
      },
    });

    areaSlider.noUiSlider.on('update', function (values, handle) {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setAreaSlider = (i, value) => {
      let arr = [null, null];
      arr[i] = value;

      areaSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setAreaSlider(index, e.currentTarget.value);
      });
    });
  }

  const quiz = document.querySelector('.quiz');
  if (quiz) {
    const nextButtons = document.querySelectorAll('.quiz-next');
    const prevButtons = document.querySelectorAll('.quiz-prev');

    nextButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const currentStep = document.querySelector('.quiz-step.active');
        let nextStep = currentStep.nextElementSibling;
        while (nextStep && !nextStep.classList.contains('quiz-step')) {
          nextStep = nextStep.nextElementSibling;
        }
        if (nextStep) {
          currentStep.classList.remove('active');
          nextStep.classList.add('active');
        }
      });
    });

    prevButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const currentStep = document.querySelector('.quiz-step.active');
        let prevStep = currentStep.previousElementSibling;
        while (prevStep && !prevStep.classList.contains('quiz-step')) {
          prevStep = prevStep.previousElementSibling;
        }
        if (prevStep) {
          currentStep.classList.remove('active');
          prevStep.classList.add('active');
        }
      });
    });
  }

  const resultSpan = document.querySelector('.cta-total span');
  if (resultSpan) {
    const houseInput = document.querySelector('input[name="area-house"]');
    const porchInput = document.querySelector('input[name="area-porch"]');

    function calculateTotal() {
      const houseArea = parseFloat(houseInput.value) || 0;
      const porchArea = parseFloat(porchInput.value) || 0;
      const totalCost = houseArea * 500 + porchArea * 150;
      resultSpan.textContent = totalCost.toLocaleString('ru-RU');
    }

    houseInput.addEventListener('input', calculateTotal);
    porchInput.addEventListener('input', calculateTotal);
  }

  const projectsSingle = document.querySelector('.projects-single');
  if (projectsSingle) {
    const mainSlider = new Swiper('.projects-single__gallery-main', {
      spaceBetween: 10,
    });

    const thumbnailSlider = new Swiper('.projects-single__gallery-thumb', {
      spaceBetween: 10,
      slidesPerView: 2,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      slideToClickedSlide: true,
      breakpoints: {
        600: {
          slidesPerView: 5,
        },
      },
      on: {
        click: function (swiper, event) {
          const clickedIndex = swiper.clickedIndex;
          mainSlider.slideToLoop(clickedIndex);
        },
      },
    });

    mainSlider.controller.control = thumbnailSlider;
    thumbnailSlider.controller.control = mainSlider;

    const loadImages = (color) => {
      const mainWrapper = document.querySelector('.projects-single__gallery-main .swiper-wrapper');
      const thumbnailWrapper = document.querySelector('.projects-single__gallery-thumb .swiper-wrapper');

      mainWrapper.innerHTML = '';
      thumbnailWrapper.innerHTML = '';

      images[color].forEach((src) => {
        const mainSlide = document.createElement('div');
        mainSlide.classList.add('swiper-slide');
        const mainImg = document.createElement('img');
        mainImg.src = src;
        mainSlide.appendChild(mainImg);

        const thumbnailSlide = document.createElement('div');
        thumbnailSlide.classList.add('swiper-slide', 'thumbnail');
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = src;
        thumbnailSlide.appendChild(thumbnailImg);

        mainWrapper.appendChild(mainSlide);
        thumbnailWrapper.appendChild(thumbnailSlide);
      });

      mainSlider.update();
      thumbnailSlider.update();
      thumbnailSlider.slideTo(0);
      mainSlider.slideTo(0);
    };

    document.querySelectorAll('.projects-single__color button').forEach((button) => {
      button.addEventListener('click', () => {
        loadImages(button.getAttribute('data-color'));

        document.querySelectorAll('.projects-single__color button').forEach((button) => {
          button.classList.remove('active');
        });

        button.classList.add('active');
      });
    });

    const defaultColor = document.querySelector('.projects-single__color button').getAttribute('data-color');
    loadImages(defaultColor);
  }

  const projectsTable = document.querySelector('.table');
  if (projectsTable) {
    document.querySelectorAll('.col').forEach((col) => {
      col.addEventListener('click', function () {
        const colIndex = Array.from(this.parentElement.children).indexOf(this);

        if (colIndex > 0) {
          document.querySelectorAll('.table .col').forEach((col, index) => {
            const colPos = index % 3;
            if (colPos === colIndex) {
              col.classList.add('checked');
            } else if (colPos > 0) {
              col.classList.remove('checked');
            }
          });

          const selectedPrice = document.querySelector(`.table .col:nth-child(${colIndex + 1}) .price`).textContent;
          document.querySelector('.projects-add__total span').textContent = selectedPrice;
        }
      });
    });

    document.querySelectorAll('.col')[1].click();
  }
});
