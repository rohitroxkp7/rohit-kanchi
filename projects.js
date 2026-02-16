const sliders = document.querySelectorAll('.case__slider');

sliders.forEach((slider) => {
  const slides = slider.querySelectorAll('.case-slide');
  if (!slides.length) return;

  let index = 0;
  let intervalId;
  const delay = Number(slider.dataset.autoplay) || 6000;

  const updateSlides = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };

  const next = () => {
    index = (index + 1) % slides.length;
    updateSlides();
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlides();
  };

  updateSlides();

  const mediaWrapper = slider.parentElement;
  const nextBtn = mediaWrapper.querySelector('.slider-btn.next');
  const prevBtn = mediaWrapper.querySelector('.slider-btn.prev');

  nextBtn?.addEventListener('click', () => {
    next();
    restart();
  });
  prevBtn?.addEventListener('click', () => {
    prev();
    restart();
  });

  const start = () => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, delay);
  };

  const restart = () => {
    if (intervalId) clearInterval(intervalId);
    start();
  };

  slider.addEventListener('mouseenter', () => clearInterval(intervalId));
  slider.addEventListener('mouseleave', start);

  start();
});

document.querySelectorAll('video[data-speed]').forEach((video) => {
  const rate = parseFloat(video.dataset.speed);
  if (!Number.isFinite(rate)) return;

  const setRate = () => {
    video.playbackRate = rate;
  };

  video.addEventListener('loadedmetadata', setRate);
  video.addEventListener('play', setRate);
  setRate();
});
