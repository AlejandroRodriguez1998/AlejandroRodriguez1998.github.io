
// Menu movil
const menuButton = document.getElementById('menuButton');

if (menuButton && typeof sideMenu !== 'undefined') {
    menuButton.addEventListener('click', () => { // Cuando hacemos click
        sideMenu.style.right = '0'; // Se muestra
    });
}

if (typeof closeMenu !== 'undefined' && typeof sideMenu !== 'undefined') {
    closeMenu.addEventListener('click', () => { // Volvemos a hacer click
        sideMenu.style.right = '-300px'; // Se oculta
    });
}

// Para si hacemos click fuera de la barra lateral
document.addEventListener('click', function(event) {
    if (!menuButton || typeof sideMenu === 'undefined') return;

    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton) {
        sideMenu.style.right = '-300px'; // Se oculta
    }
});

const scrollUpButton = document.getElementById('scroll-up');
if (scrollUpButton) {
    scrollUpButton.addEventListener('click', function() {
        window.scrollBy({
            top: -window.innerHeight,
            behavior: 'smooth'
        });
    });
}

const scrollDownButton = document.getElementById('scroll-down');
if (scrollDownButton) {
    scrollDownButton.addEventListener('click', function() {
        window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
}

// Cambiar el color del header al hacer scroll (y activar dots)
document.addEventListener('DOMContentLoaded', function () {
  const sections = Array.from(document.querySelectorAll('.section'));
  const dots = document.querySelectorAll('.dot');
  const scrollButton = document.getElementById('scroll-down');
    const menuButton = document.getElementById('menuButton'); // botón flotante del menú móvil


  function setActive(sectionId) {
    dots.forEach(d => d.classList.remove('active'));
    const active = document.getElementById(`dot-${sectionId}`);
    if (active) active.classList.add('active');
    if (scrollButton) scrollButton.style.display = (sectionId === 'contacto') ? 'none' : 'block';
  }

  window.addEventListener('scroll', function () {
    const viewportMid = window.innerHeight / 2;

    // Elegimos la sección cuyo centro esté más cerca del centro del viewport
    let current = sections[0]?.id || '';
    let best = Number.POSITIVE_INFINITY;

    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const center = r.top + r.height / 2;
      const d = Math.abs(center - viewportMid);
      if (d < best) {
        best = d;
        current = sec.id;
      }
    });

    // Fallback: si estamos abajo del todo, fuerza la última sección
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    if (atBottom && sections.length) current = sections[sections.length - 1].id;

    setActive(current);

    // 👇 Aquí controlas el menú móvil
    if (menuButton) {
      if (window.scrollY === 0 ) {
        menuButton.style.opacity = '0';   // invisible
        menuButton.style.pointerEvents = 'none'; // no clickeable
      } else {
        menuButton.style.opacity = '1';
        menuButton.style.pointerEvents = 'auto';
      }
    }

  }, { passive: true });

  // Ejecuta una vez al cargar para ajustar el estado inicial
  window.dispatchEvent(new Event('scroll'));
});

// Carrusel de proyectos
const carousels = {};

function getVisibleItems() {
    return window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 4;
}

function getCarouselState(trackId = 'miCarouselTrack') {
    return carousels[trackId];
}

function getCarouselItems(track) {
    return Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== '');
}

function getCarouselPageCount(track) {
    return Math.max(Math.ceil(getCarouselItems(track).length / getVisibleItems()), 1);
}

function getCarouselMaxIndex(track) {
    return getCarouselPageCount(track) - 1;
}

function getCarouselTranslate(track, index) {
    const items = getCarouselItems(track);
    if (!items.length) return 0;

    const visibleItems = getVisibleItems();
    const maxStart = Math.max(items.length - visibleItems, 0);
    const start = Math.min(index * visibleItems, maxStart);
    return -start * items[0].getBoundingClientRect().width;
}

function renderCarouselIndicators(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    const indicatorList = document.querySelector(`[data-indicators-for="${trackId}"]`);
    if (!state || !indicatorList) return;

    const pageCount = getCarouselPageCount(state.track);
    indicatorList.innerHTML = '';

    for (let index = 0; index < pageCount; index++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'mi-carousel-dot';
        dot.setAttribute(
            'aria-label',
            currentLanguage === 'es'
                ? `Ver grupo ${index + 1} de proyectos`
                : `View project group ${index + 1}`
        );
        dot.addEventListener('click', () => {
            state.index = index;
            updateCustomCarousel(trackId);
            resetAutoSlideInterval(trackId);
        });
        indicatorList.appendChild(dot);
    }
}

function updateCarouselIndicators(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    const indicatorList = document.querySelector(`[data-indicators-for="${trackId}"]`);
    if (!state || !indicatorList) return;

    Array.from(indicatorList.children).forEach((dot, index) => {
        dot.classList.toggle('active', index === state.index);
    });
}

function updateCustomCarousel(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    if (!state) return;

    const items = getCarouselItems(state.track);
    const firstItem = items[0];
    if (!firstItem) return;

    const maxIndex = getCarouselMaxIndex(state.track);

    if (state.index > maxIndex) state.index = 0;
    if (state.index < 0) state.index = maxIndex;

    state.currentTranslate = getCarouselTranslate(state.track, state.index);
    state.prevTranslate = state.currentTranslate;
    state.track.style.transition = 'transform 0.5s ease-in-out';
    state.track.style.transform = `translateX(${state.currentTranslate}px)`;
    updateCarouselIndicators(trackId);
}

function nextCustomSlide(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    if (!state) return;

    const maxIndex = getCarouselMaxIndex(state.track);
    state.index = maxIndex === 0 ? 0 : (state.index + 1) % (maxIndex + 1);
    updateCustomCarousel(trackId);
    resetAutoSlideInterval(trackId);
}

function prevCustomSlide(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    if (!state) return;

    const maxIndex = getCarouselMaxIndex(state.track);
    state.index = maxIndex === 0 ? 0 : (state.index - 1 + maxIndex + 1) % (maxIndex + 1);
    updateCustomCarousel(trackId);
    resetAutoSlideInterval(trackId);
}

function resetAutoSlideInterval(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    if (!state) return;

    clearInterval(state.autoSlideInterval);
    state.autoSlideInterval = setInterval(() => nextCustomSlide(trackId), 6000);
}

function pauseAutoSlide(trackId = 'miCarouselTrack') {
    const state = getCarouselState(trackId);
    if (state) clearInterval(state.autoSlideInterval);
}

function resumeAutoSlide(trackId = 'miCarouselTrack') {
    resetAutoSlideInterval(trackId);
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function setSliderPosition(state) {
    state.track.style.transform = `translateX(${state.currentTranslate}px)`;
}

function setPositionByIndex(state) {
    const firstItem = state.track.querySelector('.mi-carousel-item');
    if (!firstItem) return;

    state.currentTranslate = getCarouselTranslate(state.track, state.index);
    state.prevTranslate = state.currentTranslate;
    state.track.style.transition = 'transform 0.5s ease-out';
    setSliderPosition(state);
    updateCarouselIndicators(state.track.id);
}

function initializeCarousel(track) {
    const trackId = track.id;
    const state = {
        track,
        index: 0,
        autoSlideInterval: null,
        isDragging: false,
        startPos: 0,
        currentTranslate: 0,
        prevTranslate: 0,
        animationID: 0,
        currentIndex: 0
    };

    carousels[trackId] = state;

    getCarouselItems(track).forEach((item, index) => {
        const itemImage = item.querySelector('img');
        if (itemImage) itemImage.addEventListener('dragstart', (e) => e.preventDefault());

        item.addEventListener('mouseenter', () => pauseAutoSlide(trackId));
        item.addEventListener('mouseleave', () => resumeAutoSlide(trackId));
        item.addEventListener('touchstart', function(event) {
            state.currentIndex = index;
            state.startPos = getPositionX(event);
            state.isDragging = true;
            state.animationID = requestAnimationFrame(function animation() {
                setSliderPosition(state);
                if (state.isDragging) requestAnimationFrame(animation);
            });
            state.track.style.transition = 'none';
        });
        item.addEventListener('touchmove', function(event) {
            if (!state.isDragging) return;

            const currentPosition = getPositionX(event);
            const firstItem = state.track.querySelector('.mi-carousel-item');
            if (!firstItem) return;

            const maxScrollableWidth = -getCarouselTranslate(state.track, getCarouselMaxIndex(state.track));
            const nextTranslate = state.prevTranslate + currentPosition - state.startPos;

            if (nextTranslate > 0) {
                state.currentTranslate = 0;
            } else if (Math.abs(nextTranslate) > maxScrollableWidth) {
                state.currentTranslate = -maxScrollableWidth;
            } else {
                state.currentTranslate = nextTranslate;
            }
        });
        item.addEventListener('touchend', function() {
            cancelAnimationFrame(state.animationID);
            state.isDragging = false;

            const movedBy = state.currentTranslate - state.prevTranslate;
            const maxIndex = getCarouselMaxIndex(state.track);

            if (movedBy < -100 && state.index < maxIndex) state.index++;
            if (movedBy > 100 && state.index > 0) state.index--;

            setPositionByIndex(state);
            resetAutoSlideInterval(trackId);
        });
    });

    renderCarouselIndicators(trackId);
    updateCustomCarousel(trackId);
    resetAutoSlideInterval(trackId);
}

window.addEventListener('resize', () => {
    Object.keys(carousels).forEach(trackId => {
        renderCarouselIndicators(trackId);
        updateCustomCarousel(trackId);
    });
});

window.addEventListener('load', () => {
    document.querySelectorAll('.mi-carousel-track').forEach(initializeCarousel);
    initializeLanguageSwitcher();
    applyLanguage(currentLanguage);

    document.querySelectorAll('[data-print-cv]').forEach(button => {
        button.addEventListener('click', () => window.print());
    });

    document.querySelectorAll('[data-not-found-request]').forEach(element => {
        const failedRoute = `${window.location.pathname}${window.location.search}`;
        element.textContent = `GET ${failedRoute || '/'} → 404`;
    });
});
