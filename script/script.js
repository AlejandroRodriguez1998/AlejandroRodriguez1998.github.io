const menuButton = document.getElementById('menuButton');
const section2 = document.getElementById('section2');
const section1 = document.getElementById('section1');

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

function updateCustomCarousel() {
    const track = document.getElementById('miCarouselTrack');
    const items = track.querySelectorAll('.mi-carousel-item').length;
    const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;

    // Calcula cuántos ítems son visibles en función del tamaño de la pantalla
    const visibleItems = window.innerWidth < 768 ? 1 : 3;

    // Restablece el índice si es mayor al número de items visibles para que se reinicie
    if (customIndex >= items - visibleItems) {
        customIndex = 0; // Vuelve al principio al final
    } else if (customIndex < 0) {
        customIndex = items - visibleItems; // Ir al último conjunto de items
    }

    track.style.transform = `translateX(${-customIndex * itemWidth}px)`;
}

function nextCustomSlide() {
    const items = document.querySelectorAll('.mi-carousel-item').length;
    const visibleItems = window.innerWidth < 768 ? 1 : 3;
    customIndex = (customIndex + 1) % (items - visibleItems + 1);
    updateCustomCarousel();
}

function prevCustomSlide() {
    const items = document.querySelectorAll('.mi-carousel-item').length;
    const visibleItems = window.innerWidth < 768 ? 1 : 3;
    customIndex = (customIndex - 1 + (items - visibleItems + 1)) % (items - visibleItems + 1);
    updateCustomCarousel();
}

// Ajustar el carrusel al cambiar el tamaño de la ventana
window.addEventListener('resize', updateCustomCarousel);

// Inicializar carrusel
window.onload = function() {
    updateCustomCarousel();
    
    // Avanzar el carrusel automáticamente cada 6 segundos
    setInterval(nextCustomSlide, 6000); 
};


