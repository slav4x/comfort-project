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
});
