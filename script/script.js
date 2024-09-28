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
    const itemWidth = track.querySelector('.mi-carousel-item').offsetWidth;
    track.style.transform = `translateX(${-customIndex * itemWidth}px)`;
}

function nextCustomSlide() {
    const items = document.querySelectorAll('.mi-carousel-item').length;
    customIndex = (customIndex + 1) % items;
    updateCustomCarousel();
}

function prevCustomSlide() {
    const items = document.querySelectorAll('.mi-carousel-item').length;
    customIndex = (customIndex - 1 + items) % items;
    updateCustomCarousel();
}

// Ajustar el carrusel al cambiar el tamaño de la ventana
window.addEventListener('resize', updateCustomCarousel);

// Inicializar carrusel
window.onload = updateCustomCarousel;

