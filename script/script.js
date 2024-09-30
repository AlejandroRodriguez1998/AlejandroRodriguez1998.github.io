const menuButton = document.getElementById('menuButton');

// Abre el menú lateral
menuButton.addEventListener('click', () => {
    sideMenu.style.right = '0';
});

// Cierra el menú lateral
closeMenu.addEventListener('click', () => {
    sideMenu.style.right = '-300px';
});

document.addEventListener('click', function(event) {
    // Verificar si el clic fue dentro del menú o en el botón de menú
    const isClickInsideMenu = sideMenu.contains(event.target);
    const isClickOnMenuButton = menuButton.contains(event.target);

    // Si el clic no fue en el menú ni en el botón, cerramos el menú
    if (!isClickInsideMenu && !isClickOnMenuButton) {
        sideMenu.style.right = '-300px';
    }
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

    // Ajustar el bucle infinito correctamente sin incluir ítems vacíos
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
        .filter(item => item.innerHTML.trim() !== ''); // Solo contar los que no están vacíos
    const visibleItems = window.innerWidth < 768 ? 1 : 3;

    // Aumenta el índice y si llega al último, vuelve al primero
    customIndex = (customIndex + 1) % (items.length - visibleItems + 1);
    updateCustomCarousel();
    resetAutoSlideInterval();
}

function prevCustomSlide() {
    const track = document.getElementById('miCarouselTrack');
    const items = Array.from(track.querySelectorAll('.mi-carousel-item'))
        .filter(item => item.innerHTML.trim() !== ''); // Solo contar los que no están vacíos
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

    // Mousedown o Touchstart
    item.addEventListener('touchstart', touchStart(index)); 
    item.addEventListener('mousedown', touchStart(index));  

    // Mousemove o Touchmove
    item.addEventListener('touchmove', touchMove);
    item.addEventListener('mousemove', touchMove);

    // Mouseup o Touchend
    item.addEventListener('touchend', touchEnd);
    item.addEventListener('mouseup', touchEnd);
    item.addEventListener('mouseleave', touchEnd);
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
    track.style.transition = 'transform 0.5s ease-out'; // Añadir transición suave
    setSliderPosition();
}



