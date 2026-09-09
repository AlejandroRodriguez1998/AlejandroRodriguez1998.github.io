
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
    if (window.scrollY === 0 ) {
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

// Carrusel de proyectos
const carousels = {};

function getInitialLanguage() {
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    if (savedLanguage) return savedLanguage;

    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
}

let currentLanguage = getInitialLanguage();

const translations = {
    en: {
        'Hola, soy': 'Hi, I am',
        'Me apasiona desarrollar aplicaciones web, tanto en el frontend como en el backend, lo que me convierte en un desarrollador full-stack.': 'I enjoy building web applications across both frontend and backend, which makes me a full-stack developer.',
        'Descargar CV': 'Download CV',
        'Presentación': 'Home',
        'Sobre mí': 'About me',
        'Intereses': 'Interests',
        'Formación': 'Education',
        'Habilidades': 'Skills',
        'Portfolio': 'Portfolio',
        'Muro': 'News',
        'Contacto': 'Contact',
        'Soy una persona curiosa y con muchas ganas de aprender, siempre en busca de nuevos retos que me permitan crecer tanto profesional como personalmente. Aunque me considero introvertido, tengo una gran capacidad para concentrarme en los detalles y trabajar con dedicación. Mi inquietud por mejorar constantemente me impulsa a seguir aprendiendo nuevas tecnologías y a desarrollar mis habilidades en el mundo laboral. Estoy siempre dispuesto a asumir responsabilidades y aportar lo mejor de mí en cada proyecto.': 'I am a curious person with a strong desire to keep learning, always looking for new challenges that help me grow both professionally and personally. Although I consider myself introverted, I have a strong ability to focus on details and work with dedication. My drive to improve constantly pushes me to keep learning new technologies and developing my skills in the professional world. I am always willing to take responsibility and contribute my best to every project.',
        'Proactividad': 'Proactivity',
        'Organización': 'Organization',
        'Equipo': 'Teamwork',
        'Versatilidad': 'Versatility',
        'Áreas que conectan con mi forma de entender la informática: crear soluciones útiles, cuidar la experiencia de usuario y seguir aprendiendo en entornos técnicos distintos.': 'Areas connected to the way I understand software: building useful solutions, caring about user experience, and continuing to learn across different technical environments.',
        'Comercio electrónico': 'E-commerce',
        'Tiendas online, conversión y experiencias de compra claras.': 'Online stores, conversion, and clear shopping experiences.',
        'Desarrollo web': 'Web development',
        'Aplicaciones funcionales, mantenibles y pensadas para el usuario.': 'Functional, maintainable applications designed around the user.',
        'Multiplataforma': 'Cross-platform',
        'Soluciones que puedan vivir bien en distintos dispositivos.': 'Solutions that work well across different devices.',
        'Sistemas en la nube': 'Cloud systems',
        'Despliegue, servicios conectados y arquitectura escalable.': 'Deployment, connected services, and scalable architecture.',
        'Análisis de sistemas': 'Systems analysis',
        'Entender problemas, procesos y necesidades antes de construir.': 'Understanding problems, processes, and needs before building.',
        'Big data': 'Big data',
        'Datos, patrones y decisiones apoyadas en información real.': 'Data, patterns, and decisions backed by real information.',
        'Auditoría': 'Auditing',
        'Revisión, calidad y mejora continua de sistemas tecnológicos.': 'Review, quality, and continuous improvement of technology systems.',
        'Análisis de datos': 'Data analysis',
        'Transformar información dispersa en conclusiones útiles.': 'Turning scattered information into useful conclusions.',
        'Estudios': 'Studies',
        'Cursos': 'Courses',
        'Experiencia laboral': 'Work experience',
        'Otras': 'Other',
        'Grado en Ingeniería Informática': 'Degree in Computer Engineering',
        'Ingeniería Informática en la rama Tecnologías de la Información en la Universidad de Castilla-La Mancha en Ciudad Real.': 'Computer Engineering degree focused on Information Technologies at the University of Castilla-La Mancha in Ciudad Real.',
        'Desarrollo de Aplicaciones Web': 'Web Application Development',
        'Grado Superior de Formación Profesional en el instituto Maestre de Calatrava en Ciudad Real.': 'Higher Vocational Training degree at the Maestre de Calatrava institute in Ciudad Real.',
        'Angular: De cero a experto (Legacy)': 'Angular: From zero to expert (Legacy)',
        'Curso de Angular en': 'Angular course on',
        'de unas 35.5 horas donde aprendes a hacer aplicaciones web y móviles en Angular.': 'lasting around 35.5 hours, focused on building web and mobile applications with Angular.',
        'Oracle Content organizado por la Escuela Superior de Informática en la Universidad de Castilla-La Mancha.': 'Oracle Content course organized by the School of Computer Science at the University of Castilla-La Mancha.',
        'Desarrollador web en la empresa': 'Web developer at',
        'en Ciudad Real.': 'in Ciudad Real.',
        'Contribución al lanzamiento de nuevas funcionalidades y mejora del rendimiento de plataformas existentes.': 'Contributed to the release of new features and performance improvements in existing platforms.',
        'Herramientas:': 'Tools:',
        'Beca de colaboración en la': 'Collaboration scholarship at the',
        'Colaborador en el proyecto Smart ESI, donde apliqué conocimientos tecnológicos relacionados con la domotización de la universidad.': 'Contributor to the Smart ESI project, where I applied technical knowledge related to university automation.',
        'Prácticas del Grado Superior como programador web en': 'Higher Vocational Training internship as a web programmer at',
        'en Miguelturra.': 'in Miguelturra.',
        'Un espacio donde transformé los conocimientos aprendidos en soluciones reales, creando aplicaciones web dinámicas y aprendizaje sobre un panel de control web.': 'A place where I turned what I had learned into real solutions, creating dynamic web applications and learning about web control panels.',
        'Curso online de inglés B1 con una duración aproximada de 200–300 horas, centrado en reforzar gramática, vocabulario y comprensión básica para alcanzar un nivel intermedio.': 'Online B1 English course lasting around 200-300 hours, focused on strengthening grammar, vocabulary, and basic comprehension toward an intermediate level.',
        'Voluntario digital': 'Digital volunteer',
        'Apoyo en el sitio web de la protectora': 'Support on the website of the animal shelter',
        'realizando tareas de diseño, programación y mantenimiento técnico avanzado.': 'carrying out design, programming, and advanced technical maintenance tasks.',
        'Lenguajes': 'Languages',
        'Entornos': 'Environments',
        'Plataforma IoT': 'IoT Platform',
        'Proyecto destacado': 'Featured project',
        'Proyecto personal': 'Personal project',
        'Proyecto académico': 'Academic project',
        'Rediseño arquitectónico de una plataforma de iluminación inteligente.': 'Architectural redesign of an intelligent lighting platform.',
        'Aplicación web progresiva diseñada para gestionar los gastos en pareja.': 'Progressive web app designed to manage expenses as a couple.',
        'Aplicación web progresiva diseñada para gestionar la vida académica.': 'Progressive web app designed to manage academic life.',
        'Más info': 'More info',
        'Más proyectos': 'More projects',
        'Aplicación web para crear listas de la compra y poder compartirlas.': 'Web application for creating and sharing shopping lists.',
        'Solución e-commerce para una protectora de animales en Ciudad Real.': 'E-commerce solution for an animal shelter in Ciudad Real.',
        'Aplicación hecha en Node.js para la creación de un karaoke.': 'Application built with Node.js for creating karaoke projects.',
        'Aplicación hecha en Ruby on Rails para llevar notas y compartirlas.': 'Application built with Ruby on Rails to manage and share notes.',
        'Aplicación para buscar las mejores ofertas en videojuegos.': 'Application for finding the best video game deals.',
        'Aplicación para aprender sobre diseño de microservicios en ZeroIce.': 'Application for learning microservice design with ZeroC Ice.',
        'Aplicación en Windows formada por combates y una Pokédex.': 'Windows application made up of battles and a Pokédex.',
        'Pequeño juego con el Pokémon Electrode hecho con WPF & UWP.': 'Small game featuring Electrode, built with WPF and UWP.',
        'Gestión de pacientes con enfermedades infectocontagiosas.': 'Management of patients with infectious diseases.',
        'Trabajo de fin de grado del Grado Superior DAW.': 'Final project for the Web Application Development degree.',
        'Pequeña página donde se reúnen todos los diseños hechos en la FP.': 'Small page collecting all designs made during vocational training.',
        'Pequeño proyecto para entender todo el DOM que contiene una página.': 'Small project to understand the DOM contained in a page.',
        'Tecnologías': 'Technologies',
        'Enlaces': 'Links',
        'Pendiente de completar.': 'Pending completion.',
        'Por privacidad de la empresa, no se puede publicar ni facilitar acceso al proyecto.': 'Due to company privacy, the project cannot be published or accessed.',
        'Ver proyecto': 'View project',
        'Ver código': 'View code',
        'Muro de noticias': 'News wall',
        'Asistencia a presentación de proyecto e-commerce': 'Attendance at e-commerce project presentation',
        'Asistencia a la presentación de la solución web e-commerce desarrollada en la asignatura de Comercio Electrónico de la Escuela Superior de Informática (ESI) de Ciudad Real, realizada en colaboración con la Asociación IKER, entidad sin ánimo de lucro dedicada al apoyo a la investigación del liposarcoma mixoide.': 'Attendance at the presentation of the e-commerce web solution developed in the E-commerce course at the School of Computer Science (ESI) in Ciudad Real, in collaboration with IKER Association, a non-profit organization supporting research into myxoid liposarcoma.',
        'Leer post': 'Read post',
        'Estudiantes desarrollan la web de Apasa': 'Students develop the Apasa website',
        'Los estudiantes de la Escuela Superior de Informática (ESI) de Ciudad Real José Lara, Ángela Gijón, Andrés González, Alejandro Paniagua y Jesús García-Peñuela han desarrollado de forma altruista el sitio web de la Asociación Protectora de Animales y Plantas Stop Abandono (Apasa).': 'Students from the School of Computer Science (ESI) in Ciudad Real, José Lara, Ángela Gijón, Andrés González, Alejandro Paniagua, and Jesús García-Peñuela, altruistically developed the website for the Stop Abandono Animal and Plant Protection Association (Apasa).',
        'Leer noticia': 'Read news',
        'Más noticias': 'More news',
        'Todavía no tenemos disponibles más noticias.': 'There are no more news items available yet.',
        'Si tienes alguna pregunta o quieres trabajar conmigo, ¡no dudes en contactarme!': 'If you have any questions or would like to work with me, feel free to contact me.',
        'Correo de contacto': 'Contact email',
        'Diseñado y desarrollado por el autor': 'Designed and developed by the author',
        '© 2024 · Diseñado y desarrollado por el autor': '© 2024 · Designed and developed by the author',
        'Agradecimientos:': 'Credits:'
        ,
        'Rediseño arquitectónico de una plataforma de iluminación inteligente desarrollado como Trabajo de Fin de Grado.': 'Architectural redesign of an intelligent lighting platform developed as a final degree project.',
        'El proyecto se desarrolló sobre una plataforma IoT real en producción para sistemas de iluminación de emergencia y se centra en mejorar su arquitectura, rendimiento y capacidad de funcionamiento en entornos Edge. El objetivo fue reorganizar la solución para mejorar su mantenibilidad y rendimiento, adaptándola a las restricciones propias de entornos Edge y preparando su arquitectura para despliegues distribuidos.': 'The project was developed on a real production IoT platform for emergency lighting systems and focuses on improving its architecture, performance, and ability to operate in Edge environments. The goal was to reorganize the solution to improve maintainability and performance, adapt it to Edge constraints, and prepare its architecture for distributed deployments.',
        'La propuesta trabaja sobre comunicación entre servicios, despliegue en contenedores, persistencia de datos de monitorización y una capa web que permite operar la plataforma de forma clara.': 'The proposal works on service communication, containerized deployment, monitoring data persistence, and a web layer that makes the platform easier to operate.',
        'Tecnologías principales y áreas de aplicación': 'Main technologies and application areas',
        'Aplicación web progresiva diseñada para gestionar los gastos compartidos en pareja.': 'Progressive web app designed to manage shared expenses as a couple.',
        'La aplicación busca resolver una necesidad cotidiana: registrar gastos, consultar balances y mantener una visión clara de quién ha pagado cada cosa. Está planteada como una herramienta sencilla, directa y accesible desde cualquier dispositivo.': 'The application addresses an everyday need: recording expenses, checking balances, and keeping a clear view of who paid for each item. It is designed as a simple, direct tool accessible from any device.',
        'El proyecto combina una interfaz web moderna con persistencia en Firebase y despliegue en Vercel, priorizando una experiencia rápida y usable en móvil.': 'The project combines a modern web interface with Firebase persistence and Vercel deployment, prioritizing a fast and usable mobile experience.',
        'Tecnología': 'Technology',
        'Tour aplicación': 'App tour',
        'El proyecto está orientado a organizar clases, tareas y exámenes desde una interfaz sencilla. Su objetivo es reducir la fricción de planificación diaria y concentrar la información académica importante en una única herramienta.': 'The project is aimed at organizing classes, tasks, and exams through a simple interface. Its goal is to reduce daily planning friction and bring important academic information together in one tool.',
        'La aplicación se apoya en tecnologías web modernas, persistencia en Firebase y despliegue en Vercel, con enfoque PWA para facilitar el uso desde distintos dispositivos.': 'The application relies on modern web technologies, Firebase persistence, and Vercel deployment, with a PWA approach to make it easier to use across devices.',
        'Paniagua Rodriguez': 'Paniagua Rodriguez',
        'LinkedIn': 'LinkedIn',
        'GitHub': 'GitHub'
    }
};

function translateText(text, language) {
    if (language === 'es') return text;
    return translations[language]?.[text] || text;
}

function translateTextNode(node, language) {
    const originalText = node.i18nOriginalText || node.textContent.trim();
    const translatedText = translateText(originalText, language);

    if (!originalText || (originalText === node.textContent.trim() && !translations.en[originalText])) return;
    node.i18nOriginalText = originalText;
    node.textContent = node.textContent.replace(node.textContent.trim(), translatedText);
}

function applyLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('portfolioLanguage', language);
    document.documentElement.lang = language;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
            return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => translateTextNode(node, language));

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        if (!element.dataset.tooltipOriginal) element.dataset.tooltipOriginal = element.dataset.tooltip;
        element.dataset.tooltip = translateText(element.dataset.tooltipOriginal, language);
    });

    document.querySelectorAll('[data-language-toggle]').forEach(button => {
        button.textContent = button.dataset.languageLabel === 'full'
            ? (language === 'es' ? 'Español' : 'English')
            : language.toUpperCase();
        button.setAttribute('aria-label', language === 'es' ? 'Cambiar idioma a inglés' : 'Change language to Spanish');
    });
}

function initializeLanguageSwitcher() {
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
        button.addEventListener('click', () => applyLanguage(currentLanguage === 'es' ? 'en' : 'es'));
    });
}

const projectModalDescriptions = {
    'Share List': [
        'Aplicación web pensada para crear listas de la compra y compartirlas con otras personas.',
        'El proyecto trabaja un flujo completo de aplicación: gestión de usuarios, creación y organización de listas, persistencia en base de datos y una interfaz web preparada para usarse de forma cómoda desde distintos dispositivos.',
        'A nivel técnico combina un backend Java con Spring Boot y Maven con un frontend Angular en TypeScript. Es uno de los proyectos donde se ve mejor la separación entre cliente, servidor y base de datos dentro de una aplicación web completa.'
    ],
    'Apasa': [
        'Solución e-commerce desarrollada para una protectora de animales en Ciudad Real.',
        'El objetivo del proyecto fue crear una presencia web funcional para una entidad real, con una estructura orientada a mostrar información, facilitar la navegación y apoyar la actividad de la asociación.',
        'El trabajo combina WordPress, WooCommerce y PHP con una base de datos MariaDB. Además, incluye una parte importante de configuración, adaptación visual y aplicación de estrategias SEO para mejorar la visibilidad del sitio.'
    ],
    'Cake Karaoke': [
        'Aplicación web creada para la asignatura de Multimedia, orientada a generar proyectos de karaoke a partir de una base musical, una letra y contenido audiovisual.',
        'El sistema permite trabajar con la letra y la música para construir un archivo SRT sincronizado, que sirve como base para montar una experiencia de karaoke más completa. La aplicación también contempla la gestión de proyectos creados y una interfaz responsive con una estética pastelera.',
        'Está desarrollada con Node.js y Express bajo una arquitectura MVC, usando TypeScript, Bootstrap, SQLite y APIs del navegador. El proyecto refuerza conceptos de multimedia, sincronización de contenido y estructura de aplicaciones web.'
    ],
    'Lyxn Notes': [
        'Aplicación web de notas desarrollada en Ruby on Rails para gestionar notas, colecciones, amistades y contenido compartido entre usuarios.',
        'El proyecto incluye dos modos principales: administración, desde donde se puede manejar la información global de la aplicación, y usuario, centrado en crear notas, organizar colecciones, compartir contenido y gestionar relaciones de amistad.',
        'La aplicación trabaja autenticación, roles, operaciones CRUD, subida de imágenes y persistencia con MongoDB mediante Mongoid. Es un proyecto especialmente útil para mostrar lógica de negocio, modelos relacionados y una aplicación web con permisos diferenciados.'
    ],
    'The Game Bazar': [
        'Aplicación web para buscar ofertas de videojuegos en distintas tiendas y consultar juegos en tendencia.',
        'El proyecto integra fuentes externas para mostrar información útil al usuario: ofertas mediante la API de CheapShark y tendencias relacionadas con videojuegos usando la API de Twitch. La idea es centralizar datos dispersos y convertirlos en una experiencia de búsqueda más cómoda.',
        'Fue un trabajo de Integración de Sistemas de Información donde el frontend se construyó con Angular y TypeScript, conectado a un backend en Spring Boot. Mi aportación se centró en la parte Front-End.'
    ],
    'IceDrive': [
        'Servicio Blob desarrollado como práctica de Sistemas Distribuidos para aprender diseño de microservicios con ZeroC Ice.',
        'El servicio implementa almacenamiento de blobs mediante identificadores hash, evita duplicados, permite enlazar y desenlazar contenido y elimina los datos cuando dejan de estar referenciados. También incorpora transferencias de datos y validación de usuario.',
        'El proyecto trabaja descubrimiento de servicios, comunicación entre componentes, respuestas diferidas, pruebas automáticas e integración con IceStorm. Es una práctica centrada en arquitectura distribuida, cooperación entre servicios y robustez ante fallos.'
    ],
    'IPOkemon': [
        'Aplicación de escritorio para Windows formada por una Pokédex y una parte de combates.',
        'El proyecto se centra en la construcción de una interfaz rica para escritorio, trabajando navegación, pantallas visuales, interacción del usuario y organización de información de personajes.',
        'Está desarrollado con WPF, UWP, XAML y C#, apoyándose en Visual Studio y Expression Blend. Es un proyecto orientado a Interacción Persona-Ordenador y diseño de interfaces para aplicaciones Windows.'
    ],
    'Pokémon': [
        'Proyecto de Interacción Persona-Ordenador centrado en diseñar y construir una aplicación alrededor del Pokémon Electrode.',
        'El trabajo se planteó siguiendo un enfoque inspirado en desarrollo rápido de aplicaciones y metodología ágil: primero se diseñó una versión en WPF y posteriormente se adaptó a UWP, manteniendo la funcionalidad pero cambiando el entorno técnico.',
        'La aplicación sirve para practicar diseño visual, interacción en escritorio, empaquetado e instalación de aplicaciones Windows, además de tecnologías como XAML, C# y herramientas de diseño de Microsoft.'
    ],
    'G E P I': [
        'Aplicación orientada a la gestión de pacientes con enfermedades infectocontagiosas.',
        'El proyecto trabaja el modelado de información sensible, organización de funcionalidades y construcción de una solución académica con pruebas y documentación. La prioridad está en representar correctamente los flujos principales de gestión y consulta.',
        'Se apoya en Java, Maven, JUnit, MySQL y NetBeans, además de Markdown y Git para documentación y control de versiones. Es un proyecto enfocado en fundamentos de ingeniería del software y trabajo estructurado en equipo.'
    ],
    'Veterinaria Pandawa': [
        'Trabajo de fin de grado del Grado Superior DAW centrado en una web para una veterinaria ficticia.',
        'El proyecto reúne varias piezas propias de una aplicación web clásica: páginas informativas, lógica de interacción, persistencia de datos y una estructura pensada para practicar el ciclo completo de desarrollo web aprendido en la FP.',
        'Está construido con HTML, CSS, JavaScript, PHP, MariaDB, Bootstrap, jQuery y trabajo directo con DOM. Representa una etapa inicial importante porque combina frontend, backend y base de datos en un mismo proyecto.'
    ],
    'Diseño de Interfaces': [
        'Página que reúne diseños y ejercicios realizados durante la FP, enfocada en practicar composición visual y construcción de interfaces.',
        'El proyecto funciona como recopilatorio de propuestas, pantallas y pruebas de diseño, dando importancia a la presentación, estructura visual y adaptación básica a la web.',
        'Está desarrollado con HTML, CSS y Bootstrap. Aunque es más sencillo técnicamente, muestra evolución en criterios de interfaz, maquetación y presentación de contenido.'
    ],
    'Panda Streaming': [
        'Proyecto web creado para comprender y practicar el funcionamiento del DOM dentro de una página.',
        'La aplicación se centra en manipulación de elementos, eventos del navegador, comportamiento dinámico y uso de APIs web. Sirve como ejercicio de base para entender cómo una interfaz cambia en respuesta a las acciones del usuario.',
        'Está desarrollado con HTML, CSS, Bootstrap, JavaScript, DOM, BOM e IndexedDB. Es un proyecto académico temprano, útil para mostrar fundamentos de programación en navegador y almacenamiento local.'
    ]
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
    if (normalizedTechnology.includes('python') || normalizedTechnology.includes('flask')) return 'fa-brands fa-python';
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
        item.append(document.createTextNode(technology));
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
        copy.append(document.createTextNode(link.textContent.trim()));
        linkList.appendChild(copy);
    });

    if (fallbackLink) {
        const copy = document.createElement('a');
        copy.href = fallbackLink.href;
        copy.target = fallbackLink.target || '_blank';
        copy.rel = fallbackLink.rel || 'noopener noreferrer';
        copy.innerHTML = `<i class="${getLinkIcon(fallbackLink)}" aria-hidden="true"></i>`;
        copy.append(document.createTextNode(fallbackLink.textContent.trim()));
        linkList.appendChild(copy);
    }

    return linkList;
}

function createProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'modal fade project-modal';
    modal.id = project.modalId;
    modal.tabIndex = -1;
    modal.setAttribute('aria-labelledby', `${project.modalId}Label`);
    modal.setAttribute('aria-hidden', 'true');

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
                    <h3 class="modal-title" id="${project.modalId}Label">${project.title}</h3>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <img class="project-modal-image" src="${project.imageSrc}" alt="${project.imageAlt}" loading="lazy">
                    ${project.description.map(text => `<p>${text}</p>`).join('')}
                    ${project.date ? `<p>${project.date}</p>` : ''}
                    <h4>Tecnologías</h4>
                    ${technologies}
                    <h4>Enlaces</h4>
                    ${links}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
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
            description: projectModalDescriptions[title] || (description.length ? description : ['Pendiente de completar.']),
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
        dot.setAttribute('aria-label', `Ver grupo ${index + 1} de proyectos`);
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
});
