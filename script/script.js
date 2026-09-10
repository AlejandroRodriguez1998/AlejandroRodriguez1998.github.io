
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
const dynamicProjectModals = new Map();

const projectModalDescriptions = {
    'Share List': {
        es: [
            'Aplicación web pensada para crear listas de la compra y compartirlas con otras personas.',
            'El proyecto trabaja un flujo completo de aplicación: gestión de usuarios, creación y organización de listas, persistencia en base de datos y una interfaz web preparada para usarse de forma cómoda desde distintos dispositivos.',
            'A nivel técnico combina un backend Java con Spring Boot y Maven con un frontend Angular en TypeScript. Es uno de los proyectos donde se ve mejor la separación entre cliente, servidor y base de datos dentro de una aplicación web completa.'
        ],
        en: [
            'Web application designed to create shopping lists and share them with other people.',
            'The project covers a complete application flow: user management, list creation and organization, database persistence, and a web interface designed to be comfortable to use across different devices.',
            'Technically, it combines a Java backend with Spring Boot and Maven with an Angular frontend built in TypeScript. It is one of the projects that best shows the separation between client, server, and database in a complete web application.'
        ]
    },
    'Apasa': {
        es: [
            'Solución e-commerce desarrollada para una protectora de animales en Ciudad Real.',
            'El objetivo del proyecto fue crear una presencia web funcional para una entidad real, con una estructura orientada a mostrar información, facilitar la navegación y apoyar la actividad de la asociación.',
            'El trabajo combina WordPress, WooCommerce y PHP con una base de datos MariaDB. Además, incluye una parte importante de configuración, adaptación visual y aplicación de estrategias SEO para mejorar la visibilidad del sitio.'
        ],
        en: [
            'E-commerce solution developed for an animal shelter in Ciudad Real.',
            'The goal was to create a functional web presence for a real organization, with a structure focused on presenting information, making navigation easier, and supporting the association’s activity.',
            'The work combines WordPress, WooCommerce, and PHP with a MariaDB database. It also includes configuration, visual adaptation, and SEO strategies to improve the site’s visibility.'
        ]
    },
    'Cake Karaoke': {
        es: [
            'Aplicación web creada para la asignatura de Multimedia, orientada a generar proyectos de karaoke a partir de una base musical, una letra y contenido audiovisual.',
            'El sistema permite trabajar con la letra y la música para construir un archivo SRT sincronizado, que sirve como base para montar una experiencia de karaoke más completa. La aplicación también contempla la gestión de proyectos creados y una interfaz responsive con una estética pastelera.',
            'Está desarrollada con Node.js y Express bajo una arquitectura MVC, usando TypeScript, Bootstrap, SQLite y APIs del navegador. El proyecto refuerza conceptos de multimedia, sincronización de contenido y estructura de aplicaciones web.'
        ],
        en: [
            'Web application created for a Multimedia course, focused on generating karaoke projects from a music track, lyrics, and audiovisual content.',
            'The system makes it possible to work with lyrics and music to build a synchronized SRT file, which serves as the basis for a fuller karaoke experience. The application also includes project management and a responsive interface with a bakery-inspired visual style.',
            'It is built with Node.js and Express using an MVC architecture, TypeScript, Bootstrap, SQLite, and browser APIs. The project reinforces multimedia concepts, content synchronization, and web application structure.'
        ]
    },
    'Lyxn Notes': {
        es: [
            'Aplicación web de notas desarrollada en Ruby on Rails para gestionar notas, colecciones, amistades y contenido compartido entre usuarios.',
            'El proyecto incluye dos modos principales: administración, desde donde se puede manejar la información global de la aplicación, y usuario, centrado en crear notas, organizar colecciones, compartir contenido y gestionar relaciones de amistad.',
            'La aplicación trabaja autenticación, roles, operaciones CRUD, subida de imágenes y persistencia con MongoDB mediante Mongoid. Es un proyecto especialmente útil para mostrar lógica de negocio, modelos relacionados y una aplicación web con permisos diferenciados.'
        ],
        en: [
            'Notes web application built with Ruby on Rails to manage notes, collections, friendships, and shared content between users.',
            'The project includes two main modes: administration, used to manage global application information, and user mode, focused on creating notes, organizing collections, sharing content, and managing friendships.',
            'The application covers authentication, roles, CRUD operations, image uploads, and MongoDB persistence through Mongoid. It is especially useful for showing business logic, related models, and a web application with differentiated permissions.'
        ]
    },
    'The Game Bazar': {
        es: [
            'Aplicación web para buscar ofertas de videojuegos en distintas tiendas y consultar juegos en tendencia.',
            'El proyecto integra fuentes externas para mostrar información útil al usuario: ofertas mediante la API de CheapShark y tendencias relacionadas con videojuegos usando la API de Twitch. La idea es centralizar datos dispersos y convertirlos en una experiencia de búsqueda más cómoda.',
            'Fue un trabajo de Integración de Sistemas de Información donde el frontend se construyó con Angular y TypeScript, conectado a un backend en Spring Boot. Mi aportación se centró en la parte Front-End.'
        ],
        en: [
            'Web application for finding video game deals across different stores and checking trending games.',
            'The project integrates external sources to show useful information to users: deals through the CheapShark API and video game trends through the Twitch API. The idea is to centralize scattered data and turn it into a more comfortable search experience.',
            'It was an Information Systems Integration project where the frontend was built with Angular and TypeScript, connected to a Spring Boot backend. My contribution focused on the frontend.'
        ]
    },
    'IceDrive': {
        es: [
            'Servicio Blob desarrollado como práctica de Sistemas Distribuidos para aprender diseño de microservicios con ZeroC Ice.',
            'El servicio implementa almacenamiento de blobs mediante identificadores hash, evita duplicados, permite enlazar y desenlazar contenido y elimina los datos cuando dejan de estar referenciados. También incorpora transferencias de datos y validación de usuario.',
            'El proyecto trabaja descubrimiento de servicios, comunicación entre componentes, respuestas diferidas, pruebas automáticas e integración con IceStorm. Es una práctica centrada en arquitectura distribuida, cooperación entre servicios y robustez ante fallos.'
        ],
        en: [
            'Blob service developed as a Distributed Systems assignment to learn microservice design with ZeroC Ice.',
            'The service implements blob storage using hash identifiers, avoids duplicates, allows content to be linked and unlinked, and deletes data once it is no longer referenced. It also includes data transfers and user validation.',
            'The project covers service discovery, communication between components, deferred responses, automated tests, and IceStorm integration. It is a practice focused on distributed architecture, cooperation between services, and resilience to failures.'
        ]
    },
    'IPOkemon': {
        es: [
            'Aplicación de escritorio para Windows formada por una Pokédex y una parte de combates.',
            'El proyecto se centra en la construcción de una interfaz rica para escritorio, trabajando navegación, pantallas visuales, interacción del usuario y organización de información de personajes.',
            'Está desarrollado con WPF, UWP, XAML y C#, apoyándose en Visual Studio y Expression Blend. Es un proyecto orientado a Interacción Persona-Ordenador y diseño de interfaces para aplicaciones Windows.'
        ],
        en: [
            'Windows desktop application made up of a Pokédex and a battle section.',
            'The project focuses on building a rich desktop interface, working on navigation, visual screens, user interaction, and organization of character information.',
            'It is developed with WPF, UWP, XAML, and C#, using Visual Studio and Expression Blend. It is a project focused on Human-Computer Interaction and interface design for Windows applications.'
        ]
    },
    'Pokémon': {
        es: [
            'Proyecto de Interacción Persona-Ordenador centrado en diseñar y construir una aplicación alrededor del Pokémon Electrode.',
            'El trabajo se planteó siguiendo un enfoque inspirado en desarrollo rápido de aplicaciones y metodología ágil: primero se diseñó una versión en WPF y posteriormente se adaptó a UWP, manteniendo la funcionalidad pero cambiando el entorno técnico.',
            'La aplicación sirve para practicar diseño visual, interacción en escritorio, empaquetado e instalación de aplicaciones Windows, además de tecnologías como XAML, C# y herramientas de diseño de Microsoft.'
        ],
        en: [
            'Human-Computer Interaction project focused on designing and building an application around the Pokémon Electrode.',
            'The work followed an approach inspired by rapid application development and agile methodology: first a WPF version was designed, and later it was adapted to UWP while keeping the functionality and changing the technical environment.',
            'The application is useful for practicing visual design, desktop interaction, packaging and installation of Windows applications, and technologies such as XAML, C#, and Microsoft design tools.'
        ]
    },
    'G E P I': {
        es: [
            'Aplicación orientada a la gestión de pacientes con enfermedades infectocontagiosas.',
            'El proyecto trabaja el modelado de información sensible, organización de funcionalidades y construcción de una solución académica con pruebas y documentación. La prioridad está en representar correctamente los flujos principales de gestión y consulta.',
            'Se apoya en Java, Maven, JUnit, MySQL y NetBeans, además de Markdown y Git para documentación y control de versiones. Es un proyecto enfocado en fundamentos de ingeniería del software y trabajo estructurado en equipo.'
        ],
        en: [
            'Application focused on managing patients with infectious diseases.',
            'The project works with sensitive information modeling, feature organization, and the construction of an academic solution with tests and documentation. The priority is to correctly represent the main management and consultation flows.',
            'It uses Java, Maven, JUnit, MySQL, and NetBeans, together with Markdown and Git for documentation and version control. It is a project focused on software engineering fundamentals and structured teamwork.'
        ]
    },
    'Veterinaria Pandawa': {
        es: [
            'Trabajo de fin de grado del Grado Superior DAW centrado en una web para una veterinaria ficticia.',
            'El proyecto reúne varias piezas propias de una aplicación web clásica: páginas informativas, lógica de interacción, persistencia de datos y una estructura pensada para practicar el ciclo completo de desarrollo web aprendido en la FP.',
            'Está construido con HTML, CSS, JavaScript, PHP, MariaDB, Bootstrap, jQuery y trabajo directo con DOM. Representa una etapa inicial importante porque combina frontend, backend y base de datos en un mismo proyecto.'
        ],
        en: [
            'Final project for the Web Application Development degree, focused on a website for a fictional veterinary clinic.',
            'The project brings together several parts of a classic web application: informational pages, interaction logic, data persistence, and a structure designed to practice the full web development cycle learned during vocational training.',
            'It is built with HTML, CSS, JavaScript, PHP, MariaDB, Bootstrap, jQuery, and direct DOM work. It represents an important early stage because it combines frontend, backend, and database work in a single project.'
        ]
    },
    'Diseño de Interfaces': {
        es: [
            'Página que reúne diseños y ejercicios realizados durante la FP, enfocada en practicar composición visual y construcción de interfaces.',
            'El proyecto funciona como recopilatorio de propuestas, pantallas y pruebas de diseño, dando importancia a la presentación, estructura visual y adaptación básica a la web.',
            'Está desarrollado con HTML, CSS y Bootstrap. Aunque es más sencillo técnicamente, muestra evolución en criterios de interfaz, maquetación y presentación de contenido.'
        ],
        en: [
            'Page that brings together designs and exercises created during vocational training, focused on practicing visual composition and interface building.',
            'The project works as a collection of proposals, screens, and design tests, with emphasis on presentation, visual structure, and basic web adaptation.',
            'It is developed with HTML, CSS, and Bootstrap. Although technically simpler, it shows progress in interface criteria, layout, and content presentation.'
        ]
    },
    'Panda Streaming': {
        es: [
            'Proyecto web creado para comprender y practicar el funcionamiento del DOM dentro de una página.',
            'La aplicación se centra en manipulación de elementos, eventos del navegador, comportamiento dinámico y uso de APIs web. Sirve como ejercicio de base para entender cómo una interfaz cambia en respuesta a las acciones del usuario.',
            'Está desarrollado con HTML, CSS, Bootstrap, JavaScript, DOM, BOM e IndexedDB. Es un proyecto académico temprano, útil para mostrar fundamentos de programación en navegador y almacenamiento local.'
        ],
        en: [
            'Web project created to understand and practice how the DOM works within a page.',
            'The application focuses on element manipulation, browser events, dynamic behavior, and web APIs. It serves as a foundational exercise to understand how an interface changes in response to user actions.',
            'It is developed with HTML, CSS, Bootstrap, JavaScript, DOM, BOM, and IndexedDB. It is an early academic project, useful for showing browser programming fundamentals and local storage.'
        ]
    }
};

function getTechnologyIcon(technology) {
    const normalizedTechnology = technology.toLowerCase();

    if (normalizedTechnology.includes('angular')) return 'fa-brands fa-angular';
    if (normalizedTechnology.includes('bootstrap')) return 'fa-brands fa-bootstrap';
    if (normalizedTechnology.includes('docker')) return 'fa-brands fa-docker';
    if (normalizedTechnology.includes('firebase')) return 'fa-solid fa-fire';
    if (normalizedTechnology.includes('github') || normalizedTechnology.includes('git')) return 'fa-brands fa-github';
    if (normalizedTechnology.includes('html')) return 'fa-brands fa-html5';
    if (normalizedTechnology.includes('java')) return 'fa-brands fa-java';
    if (normalizedTechnology.includes('javascript')) return 'fa-brands fa-js';
    if (normalizedTechnology.includes('node')) return 'fa-brands fa-node-js';
    if (normalizedTechnology.includes('php')) return 'fa-brands fa-php';
    if (normalizedTechnology.includes('python') || normalizedTechnology.includes('flask') || normalizedTechnology.includes('fastapi')) return 'fa-brands fa-python';
    if (normalizedTechnology.includes('react') || normalizedTechnology.includes('next')) return 'fa-brands fa-react';
    if (normalizedTechnology.includes('ruby') || normalizedTechnology.includes('rails')) return 'fa-solid fa-gem';
    if (normalizedTechnology.includes('sql') || normalizedTechnology.includes('bbdd') || normalizedTechnology.includes('mariadb')) return 'fa-solid fa-database';
    if (normalizedTechnology.includes('typescript')) return 'fa-solid fa-code';
    if (normalizedTechnology.includes('vercel')) return 'fa-solid fa-cloud';
    if (normalizedTechnology.includes('wordpress')) return 'fa-brands fa-wordpress';

    return 'fa-solid fa-code';
}

function getLinkIcon(link) {
    const href = link.href.toLowerCase();
    const text = link.textContent.toLowerCase();

    if (href.includes('youtube') || href.includes('youtu.be')) return 'fa-brands fa-youtube';
    if (href.includes('github.io')) return 'fa-solid fa-globe';
    if (href.includes('github')) return 'fa-brands fa-github';
    if (text.includes('wiki')) return 'fa-solid fa-book';
    if (text.includes('tour') || text.includes('pagina') || text.includes('página')) return 'fa-solid fa-globe';

    return 'fa-solid fa-up-right-from-square';
}

function createTechList(technologies, className) {
    const techList = document.createElement('div');
    techList.className = className;

    technologies.forEach(technology => {
        const item = document.createElement('span');
        item.innerHTML = `<i class="${getTechnologyIcon(technology)}" aria-hidden="true"></i>`;
        item.append(document.createTextNode(translateText(technology, currentLanguage)));
        techList.appendChild(item);
    });

    return techList;
}

function getCardTechnologyName(technology) {
    return technology
        .replace('Node.js con Express', 'Node.js')
        .replace('Spring Boot', 'Spring')
        .replace('WooCommerce', 'Woo')
        .replace('Firebase (Backend y BBDD)', 'Firebase')
        .replace('Ruby On Rails', 'Rails')
        .replace('Visual Studio', 'VS');
}

function createModalLinkList(links, fallbackLink) {
    const linkList = document.createElement('div');
    linkList.className = 'modal-link-list';

    links.forEach(link => {
        const copy = document.createElement('a');
        copy.href = link.href;
        copy.target = link.target || '_blank';
        copy.rel = link.rel || 'noopener noreferrer';
        copy.innerHTML = `<i class="${getLinkIcon(link)}" aria-hidden="true"></i>`;
        copy.append(document.createTextNode(translateText(link.textContent.trim(), currentLanguage)));
        linkList.appendChild(copy);
    });

    if (fallbackLink) {
        const copy = document.createElement('a');
        copy.href = fallbackLink.href;
        copy.target = fallbackLink.target || '_blank';
        copy.rel = fallbackLink.rel || 'noopener noreferrer';
        copy.innerHTML = `<i class="${getLinkIcon(fallbackLink)}" aria-hidden="true"></i>`;
        copy.append(document.createTextNode(translateText(fallbackLink.textContent.trim(), currentLanguage)));
        linkList.appendChild(copy);
    }

    return linkList;
}

function getProjectDescriptions(project) {
    if (project.localizedDescriptions) {
        return project.localizedDescriptions[currentLanguage] || project.localizedDescriptions.es || [];
    }

    return project.description || [];
}

function renderProjectModal(project) {
    const modal = document.getElementById(project.modalId);
    if (!modal) return;

    const technologies = project.technologies.length
        ? createTechList(project.technologies, 'modal-tech-list').outerHTML
        : '<p class="mb-0">Pendiente de completar.</p>';
    const links = project.links.length || project.mainLink
        ? createModalLinkList(project.links, project.mainLink).outerHTML
        : '<p class="mb-0">Pendiente de completar.</p>';

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title" id="${project.modalId}Label">${translateText(project.title, currentLanguage)}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="${translateText('Cerrar', currentLanguage)}"></button>
                </div>
                <div class="modal-body">
                    <img class="project-modal-image" src="${project.imageSrc}" alt="${project.imageAlt}" loading="lazy">
                    ${getProjectDescriptions(project).map(text => `<p>${text}</p>`).join('')}
                    ${project.date ? `<p>${translateText(project.date, currentLanguage)}</p>` : ''}
                    <h4>${translateText('Tecnologías', currentLanguage)}</h4>
                    ${technologies}
                    <h4>${translateText('Enlaces', currentLanguage)}</h4>
                    ${links}
                </div>
            </div>
        </div>
    `;

    applyLanguageToElement(modal, currentLanguage);
}

function createProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal fade project-modal';
    modal.id = project.modalId;
    modal.tabIndex = -1;
    modal.setAttribute('aria-labelledby', `${project.modalId}Label`);
    modal.setAttribute('aria-hidden', 'true');

    document.body.appendChild(modal);
    dynamicProjectModals.set(project.modalId, project);
    renderProjectModal(project);
}

function enhanceCarouselProjectCards() {
    const track = document.getElementById('miCarouselTrack');
    if (!track) return;

    getCarouselItems(track).forEach((item, index) => {
        const card = item.querySelector('.mi-project-card');
        const tabs = card?.querySelector('.nav-tabs');
        const tabContent = card?.querySelector('.tab-content');
        if (!card || !tabs || !tabContent || card.querySelector('.project-info-button')) return;

        const title = card.querySelector('h5')?.textContent.trim() || 'Proyecto';
        const image = card.querySelector('.banner-image-container img');
        const infoPane = tabContent.querySelector('[id^="info-"]');
        const techPane = tabContent.querySelector('[id^="tech-"]');
        const linksPane = tabContent.querySelector('[id^="links-"]');
        const mainButton = card.querySelector('#add-to-cart, .add-to-cart');
        const mainLink = mainButton?.querySelector('a');
        const paragraphs = Array.from(infoPane?.querySelectorAll('p') || [])
            .map(paragraph => paragraph.textContent.trim())
            .filter(Boolean);
        const date = paragraphs.find(text => /^\d{4}\s*-\s*\d{4}$/.test(text)) || '';
        const description = paragraphs.filter(text => text !== date);
        const technologies = (techPane?.textContent.trim() || '')
            .split(',')
            .map(technology => technology.trim().replace(/\.$/, ''))
            .filter(Boolean);
        const links = Array.from(linksPane?.querySelectorAll('a') || []);
        const modalId = `projectModal${index}`;

        tabs.remove();
        tabContent.remove();
        if (mainButton) mainButton.remove();

        const badge = document.createElement('span');
        badge.className = 'project-badge project-badge-academic';
        badge.innerHTML = '<i class="fa-solid fa-graduation-cap" aria-hidden="true"></i> Proyecto académico';
        card.appendChild(badge);

        description.slice(0, 1).forEach(text => {
            const paragraph = document.createElement('p');
            paragraph.className = 'mb-1';
            paragraph.textContent = text;
            card.appendChild(paragraph);
        });

        if (date) {
            const dateElement = document.createElement('p');
            dateElement.className = 'project-date mb-1';
            dateElement.textContent = date;
            card.appendChild(dateElement);
        }

        card.appendChild(createTechList(technologies.slice(0, 3).map(getCardTechnologyName), 'featured-tech-list'));

        const infoButton = document.createElement('button');
        infoButton.className = 'project-info-button';
        infoButton.type = 'button';
        infoButton.setAttribute('data-bs-toggle', 'modal');
        infoButton.setAttribute('data-bs-target', `#${modalId}`);
        infoButton.innerHTML = '<i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i> Más info';
        card.appendChild(infoButton);

        createProjectModal({
            modalId,
            title,
            imageSrc: image?.getAttribute('src') || '',
            imageAlt: image?.getAttribute('alt') || title,
            localizedDescriptions: projectModalDescriptions[title] || null,
            description: description.length ? description : ['Pendiente de completar.'],
            date,
            technologies,
            links,
            mainLink
        });
    });
}

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

    const itemWidth = firstItem.offsetWidth;
    const pageWidth = itemWidth * getVisibleItems();
    const maxIndex = getCarouselMaxIndex(state.track);

    if (state.index > maxIndex) state.index = 0;
    if (state.index < 0) state.index = maxIndex;

    state.currentTranslate = -state.index * pageWidth;
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

    state.currentTranslate = state.index * -(firstItem.offsetWidth * getVisibleItems());
    state.prevTranslate = state.currentTranslate;
    state.track.style.transition = 'transform 0.5s ease-out';
    setSliderPosition(state);
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

            const itemWidth = firstItem.offsetWidth;
            const totalItemsWidth = itemWidth * getCarouselItems(state.track).length;
            const visibleWidth = state.track.offsetWidth;
            const maxScrollableWidth = Math.max(totalItemsWidth - visibleWidth, 0);
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

    track.querySelectorAll('.nav-tabs button').forEach(tab => {
        tab.addEventListener('click', () => {
            pauseAutoSlide(trackId);
            setTimeout(() => resumeAutoSlide(trackId), 5000);
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
    enhanceCarouselProjectCards();
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
