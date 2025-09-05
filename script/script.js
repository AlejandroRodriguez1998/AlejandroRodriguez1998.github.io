
// Menu movil
const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', () => { // Cuando hacemos click
    sideMenu.style.right = '0'; // Se muestra
});

closeMenu.addEventListener('click', () => { // Volvemos a hacer click
    sideMenu.style.right = '-300px'; // Se oculta
});

// Para si hacemos click fuera de la barra lateral
document.addEventListener('click', function(event) {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton) {
        sideMenu.style.right = '-300px'; // Se oculta
    }
});

// Boton para hacer scroll hacia arriba
document.getElementById('scroll-up').addEventListener('click', function() {
    window.scrollBy({
        top: -window.innerHeight, // Scroll hacia arriba el tamaño de una pantalla
        behavior: 'smooth'
    });
});

// Boton para hacer scroll hacia abajo
document.getElementById('scroll-down').addEventListener('click', function() {
    window.scrollBy({
        top: window.innerHeight, // Scroll hacia abajo el tamaño de una pantalla
        behavior: 'smooth'
    });
});

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
    if (window.scrollY === 0) {
      menuButton.style.opacity = '0';   // invisible
      menuButton.style.pointerEvents = 'none'; // no clickeable
    } else {
      menuButton.style.opacity = '1';
      menuButton.style.pointerEvents = 'auto';
    }

  }, { passive: true });

  // Ejecuta una vez al cargar para ajustar el estado inicial
  window.dispatchEvent(new Event('scroll'));
});

// Carrusel de imágenes
let customIndex = 0;
let autoSlideInterval;

function updateCustomCarousel() {
    const track = document.getElementById('miCarouselTrack'); 
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); // Filtramos ítems no vacíos
    const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;
    
    // Modificamos visibleItems para que sea 1 en móvil, 2 en tablet, 3 en escritorio
    const visibleItems = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    if (customIndex >= items.length - visibleItems + 1) {
        customIndex = 0;  // Si llega al final, vuelve al principio
    } else if (customIndex < 0) {
        customIndex = items.length - visibleItems;  // Si está al principio, ir al final
    }

    // Mover el carrusel
    track.style.transform = `translateX(${-customIndex * itemWidth}px)`;
}

function nextCustomSlide() {
    const track = document.getElementById('miCarouselTrack');
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); 
    const visibleItems = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    customIndex = (customIndex + 1) % (items.length - visibleItems + 1);
    updateCustomCarousel();
    resetAutoSlideInterval();
}

function prevCustomSlide() {
    const track = document.getElementById('miCarouselTrack');
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); 
    const visibleItems = window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    customIndex = (customIndex - 1 + (items.length - visibleItems + 1)) % (items.length - visibleItems + 1);
    updateCustomCarousel();
    resetAutoSlideInterval();
}

function resetAutoSlideInterval() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextCustomSlide, 6000);
}

window.addEventListener('resize', updateCustomCarousel);

window.onload = function() {
    updateCustomCarousel();
    resetAutoSlideInterval(); 
};

// Función para pausar el temporizador
function pauseAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Función para reanudar el temporizador
function resumeAutoSlide() {
    resetAutoSlideInterval();
}

// Seleccionar todas las tarjetas del carrusel
const carouselItems = document.querySelectorAll('.mi-carousel-item');

// Pausar el temporizador al entrar con el ratón
carouselItems.forEach(item => {
    item.addEventListener('mouseenter', pauseAutoSlide);
    item.addEventListener('mouseleave', resumeAutoSlide);
});

// Manejar clicks en las tabs para dispositivos móviles
const tabs = document.querySelectorAll('.nav-tabs button');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        pauseAutoSlide(); // Pausar el temporizador al hacer clic en una tab

        // Reanudar el temporizador después de un pequeño retraso
        setTimeout(() => {
            resumeAutoSlide();
        }, 5000); // Reanudar después de 5 segundos
    });
});

// Eventos de arrastrar y deslizar

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

const track = document.getElementById('miCarouselTrack');
let items = Array.from(track.children)
    .filter(item => item.innerHTML.trim() !== ''); // Solo contar los que no están vacíos

items.forEach((item, index) => {
    const itemImage = item.querySelector('img');
    itemImage.addEventListener('dragstart', (e) => e.preventDefault()); // Evitar que la imagen interfiera con el drag

    item.addEventListener('touchstart', touchStart(index)); 
    item.addEventListener('touchmove', touchMove);
    item.addEventListener('touchend', touchEnd);
});

function touchStart(index) {
    return function(event) {
        currentIndex = index;
        startPos = getPositionX(event);
        isDragging = true;

        animationID = requestAnimationFrame(animation);
        track.style.transition = 'none'; // Desactivar la transición
    };
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;
        const totalItemsWidth = itemWidth * items.length;
        const visibleWidth = track.offsetWidth;

        // Solo permitir mover el carrusel dentro de los límites (entre el primer y último elemento)
        if (currentTranslate + (currentPosition - startPos) > 0) {
            currentTranslate = 0;
        } else if (Math.abs(currentTranslate + (currentPosition - startPos)) > totalItemsWidth - visibleWidth) {
            currentTranslate = -(totalItemsWidth - visibleWidth);
        } else {
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }
}

function touchEnd() {
    cancelAnimationFrame(animationID);
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < items.length - 1) {
        customIndex++;
    }
    if (movedBy > 100 && currentIndex > 0) {
        customIndex--;
    }

    setPositionByIndex();
    resetAutoSlideInterval();
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setSliderPosition();
    if (isDragging) {
        requestAnimationFrame(animation);
    }
}

function setSliderPosition() {
    track.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;
    currentTranslate = customIndex * -itemWidth;
    prevTranslate = currentTranslate;
    track.style.transition = 'transform 0.5s ease-out';
    setSliderPosition();
}



