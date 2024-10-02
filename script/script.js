const menuButton = document.getElementById('menuButton');

menuButton.addEventListener('click', () => {
    sideMenu.style.right = '0';
});

closeMenu.addEventListener('click', () => {
    sideMenu.style.right = '-300px';
});

document.addEventListener('click', function(event) {
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton) {
        sideMenu.style.right = '-300px';
    }
});

document.getElementById('scroll-up').addEventListener('click', function() {
    window.scrollBy({
        top: -window.innerHeight, // Scroll hacia arriba el tamaño de una pantalla
        behavior: 'smooth'
    });
});

document.getElementById('scroll-down').addEventListener('click', function() {
    window.scrollBy({
        top: window.innerHeight, // Scroll hacia abajo el tamaño de una pantalla
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');

    window.addEventListener('scroll', function() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Si el scroll está dentro de la sección
            if (pageYOffset >= sectionTop - sectionHeight / 3 && pageYOffset < sectionTop + sectionHeight - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        // Agregar o quitar la clase 'active' a los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.id === `dot-${currentSection}`) {
                dot.classList.add('active'); 
            }
        });
    });
});

let customIndex = 0;
let autoSlideInterval;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

function updateCustomCarousel() {
    const track = document.getElementById('miCarouselTrack');
    
    // Filtramos los ítems visibles (no vacíos)
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); // Solo tener en cuenta ítems que no están vacíos
    
    const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;
    const visibleItems = window.innerWidth < 768 ? 1 : 3;

    if (customIndex >= items.length - visibleItems + 1) {
        customIndex = 0;  // Si llega al final, vuelve al principio
    } else if (customIndex < 0) {
        customIndex = items.length - visibleItems;  // Si está al principio, ir al final
    }

    track.style.transform = `translateX(${-customIndex * itemWidth}px)`;
}

function nextCustomSlide() {
    const track = document.getElementById('miCarouselTrack');
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); 
    const visibleItems = window.innerWidth < 768 ? 1 : 3;

    // Aumenta el índice y si llega al último, vuelve al primero
    customIndex = (customIndex + 1) % (items.length - visibleItems + 1);
    updateCustomCarousel();
    resetAutoSlideInterval();
}

function prevCustomSlide() {
    const track = document.getElementById('miCarouselTrack');
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); 
    const visibleItems = window.innerWidth < 768 ? 1 : 3;

    // Disminuye el índice y si está en el primero, vuelve al último
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

// Eventos de arrastrar y deslizar

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



