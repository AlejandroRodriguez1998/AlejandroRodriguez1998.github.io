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

// Mostrar el botón cuando la sección 2 sea visible
const observerSection2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuButton.style.display = 'block'; // Mostrar el botón cuando la sección 2 es visible
        }
    });
}, {
    threshold: 0.8 // Al menos el 50% de la sección 2 debe estar visible
});

// Observar la sección 2
observerSection2.observe(section2);

// Ocultar el botón cuando se vuelve a la sección 1
const observerSection1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            menuButton.style.display = 'none'; // Ocultar el botón cuando la sección 1 es visible
        }
    });
}, {
    threshold: 0.4 // Al menos el 50% de la sección 1 debe estar visible
});

// Observar la sección 1
observerSection1.observe(section1);