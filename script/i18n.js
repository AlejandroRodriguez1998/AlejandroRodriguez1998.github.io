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
        'Otras': 'Other qualifications',
        'Actualidad': 'Present',
        '2025 - Actualidad': '2025 - Present',
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
        'Por privacidad de la empresa, no se puede publicar ni facilitar acceso al proyecto.': 'Due to company confidentiality, the project cannot be published or accessed.',
        'Ver proyecto': 'View project',
        'Ver código': 'View code',
        'Muro de noticias': 'News',
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
        'Agradecimientos:': 'Credits:',
        'Cerrar': 'Close',
        'Selector de idioma': 'Language selector',
        'Controles del currículum': 'Resume controls',
        'Información de contacto y resumen': 'Contact information and summary',
        'Controles del carrusel de proyectos': 'Project carousel controls',
        'Rediseño arquitectónico de una plataforma de iluminación inteligente desarrollado como Trabajo de Fin de Grado.': 'Architectural redesign of an intelligent lighting platform developed as a final degree project.',
        'El proyecto se desarrolló sobre una plataforma IoT real en producción para sistemas de iluminación de emergencia y se centra en mejorar su arquitectura, rendimiento y capacidad de funcionamiento en entornos Edge. El objetivo fue reorganizar la solución para mejorar su mantenibilidad y rendimiento, adaptándola a las restricciones propias de entornos Edge y preparando su arquitectura para despliegues distribuidos.': 'The project was developed on a real production IoT platform for emergency lighting systems and focuses on improving its architecture, performance, and ability to operate in Edge environments. The goal was to reorganize the solution to improve maintainability and performance, adapt it to Edge constraints, and prepare its architecture for distributed deployments.',
        'La propuesta trabaja sobre comunicación entre servicios, despliegue en contenedores, persistencia de datos de monitorización y una capa web que permite operar la plataforma de forma clara.': 'The proposed solution covers inter-service communication, containerized deployment, monitoring data persistence, and a web layer for operating the platform.',
        'Tecnologías principales y áreas de aplicación': 'Main technologies and application areas',
        'Aplicación web progresiva diseñada para gestionar los gastos compartidos en pareja.': 'Progressive web app designed to manage shared expenses as a couple.',
        'La aplicación busca resolver una necesidad cotidiana: registrar gastos, consultar balances y mantener una visión clara de quién ha pagado cada cosa. Está planteada como una herramienta sencilla, directa y accesible desde cualquier dispositivo.': 'The application addresses an everyday need: recording expenses, checking balances, and keeping a clear view of who paid for each item. It is designed as a simple, direct tool accessible from any device.',
        'El proyecto combina una interfaz web moderna con persistencia en Firebase y despliegue en Vercel, priorizando una experiencia rápida y usable en móvil.': 'The project combines a modern web interface with Firebase persistence and Vercel deployment, prioritizing a fast and user-friendly mobile experience.',
        'Tecnología': 'Technology',
        'Tour aplicación': 'App tour',
        'Tour aplicacion': 'App tour',
        'Wiki aplicacion': 'App wiki',
        'APIs del navegador': 'Browser APIs',
        'Estrategias de SEO': 'SEO strategies',
        'BBDD': 'Database',
        'Firebase (Backend y BBDD)': 'Firebase (Backend and database)',
        'El proyecto está orientado a organizar clases, tareas y exámenes desde una interfaz sencilla. Su objetivo es reducir la fricción de planificación diaria y concentrar la información académica importante en una única herramienta.': 'The project is aimed at organizing classes, tasks, and exams through a simple interface. Its goal is to reduce daily planning friction and bring important academic information together in one tool.',
        'La aplicación se apoya en tecnologías web modernas, persistencia en Firebase y despliegue en Vercel, con enfoque PWA para facilitar el uso desde distintos dispositivos.': 'The application relies on modern web technologies, Firebase persistence, and Vercel deployment, with a PWA approach to make it easier to use across devices.',
        'Paniagua Rodriguez': 'Paniagua Rodriguez',
        'LinkedIn': 'LinkedIn',
        'GitHub': 'GitHub',
        'Currículum de Alejandro Paniagua Rodríguez': 'Alejandro Paniagua Rodríguez resume',
        'Currículum web de Alejandro Paniagua Rodríguez, ingeniero informático y desarrollador Full-Stack.': 'Web resume of Alejandro Paniagua Rodríguez, computer engineer and Full-Stack developer.',
        'Volver al portfolio': 'Back to portfolio',
        'Imprimir / Guardar PDF': 'Print / Save PDF',
        'Fotografía de Alejandro Paniagua Rodríguez': 'Photo of Alejandro Paniagua Rodríguez',
        'Desarrollador Full-Stack': 'Full-Stack Developer',
        'Ciudad Real, España': 'Ciudad Real, Spain',
        'Perfil': 'Profile',
        'Experiencia': 'Experience',
        'Educación': 'Education',
        'Idiomas': 'Languages',
        'Español: Nativo': 'Spanish: Native',
        'Inglés: B1': 'English: B1',
        'Habilidades': 'Skills',
        'Destrezas personales': 'Personal strengths',
        'Proactivo': 'Proactive',
        'Organizativo': 'Organized',
        'Trabajo en equipo': 'Teamwork',
        'Portfolio profesional con proyectos destacados de ingeniería informática, desarrollo web, aplicaciones progresivas, IoT y análisis de datos.': 'Professional portfolio with featured projects in computer engineering, web development, progressive applications, IoT, and data analysis.',
        'Ingeniero Informático y desarrollador Full-Stack con experiencia en Angular, Python, Flask, Next.js, IoT y Edge Computing.': 'Computer Engineer and Full-Stack developer with experience in Angular, Python, Flask, Next.js, IoT, and Edge Computing.',
        'Web y Frontend': 'Web and Frontend',
        'Backend y datos': 'Backend and data',
        'Herramientas y entornos': 'Tools and environments',
        'Desarrollador web': 'Web developer',
        'Contribución al lanzamiento de nuevas funcionalidades y mejora del rendimiento de plataformas existentes. Trabajo con Angular, Python, Flask, K3s, Docker, InfluxDB, PostgreSQL y Git.': 'Contributed to the release of new features and performance improvements in existing platforms. Work with Angular, Python, Flask, K3s, Docker, InfluxDB, PostgreSQL, and Git.',
        'Beca de colaboración': 'Collaboration scholarship',
        'Colaborador en el proyecto Smart ESI, aplicando conocimientos tecnológicos relacionados con la domotización de la universidad. Herramientas: Home Assistant y Trello.': 'Contributor to the Smart ESI project, applying technical knowledge related to university automation. Tools: Home Assistant and Trello.',
        'Prácticas como programador web': 'Web programmer internship',
        'Prácticas del Grado Superior en IECISA, creando aplicaciones web dinámicas y aprendiendo sobre un panel de control web. Herramientas: Joomla, PHP, HTML, CSS, JavaScript y AJAX.': 'Higher Vocational Training internship at IECISA, creating dynamic web applications and learning about a web control panel. Tools: Joomla, PHP, HTML, CSS, JavaScript, and AJAX.',
        'Grado en Ingeniería Informática, rama Tecnologías de la Información, en la Universidad de Castilla-La Mancha en Ciudad Real.': 'Computer Engineering degree, Information Technologies branch, at the University of Castilla-La Mancha in Ciudad Real.',
        'Grado Superior de Formación Profesional en el instituto Maestre de Calatrava en Ciudad Real.': 'Higher Vocational Training degree at Maestre de Calatrava institute in Ciudad Real.',
        'Curso de Angular en Udemy de unas 35.5 horas orientado al desarrollo de aplicaciones web y móviles en Angular.': 'Angular course on Udemy lasting around 35.5 hours, focused on building web and mobile applications with Angular.',
        'Curso organizado por la Escuela Superior de Informática en la Universidad de Castilla-La Mancha.': 'Course organized by the School of Computer Science at the University of Castilla-La Mancha.',
        'B1 en Inglés': 'B1 English',
        'Curso online de inglés B1 de unas 200-300 horas.': 'Online B1 English course lasting around 200-300 hours.',
        '2025 - Actualidad': '2025 - Present',
        'Cambiar idioma a inglés': 'Change language to English',
        'Change language to Spanish': 'Cambiar idioma a español',
        'Imprimir o guardar currículum como PDF': 'Print or save resume as PDF',
        'Abrir GitHub de Alejandro Paniagua Rodríguez': 'Open Alejandro Paniagua Rodríguez GitHub',
        'Abrir LinkedIn de Alejandro Paniagua Rodríguez': 'Open Alejandro Paniagua Rodríguez LinkedIn',
        'Enviar email a Alejandro Paniagua Rodríguez': 'Email Alejandro Paniagua Rodríguez',
        'Abrir portfolio de Alejandro Paniagua Rodríguez': 'Open Alejandro Paniagua Rodríguez portfolio',
        'Página no encontrada - Alejandro Paniagua Rodríguez': 'Page not found - Alejandro Paniagua Rodríguez',
        'La página que buscas no existe en el portfolio de Alejandro Paniagua Rodríguez.': 'The page you are looking for does not exist in Alejandro Paniagua Rodríguez portfolio.',
        'Página no encontrada': 'Page not found',
        'La ruta que has intentado abrir no existe o se ha movido.': 'The route you tried to open does not exist or has moved.',
        'Acciones disponibles': 'Available actions'
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

function applyLanguageToElement(root, language) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
            return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => translateTextNode(node, language));
}

function applyLanguage(language) {
    currentLanguage = language;
    localStorage.setItem('portfolioLanguage', language);
    document.documentElement.lang = language;

    applyLanguageToElement(document.body, language);

    if (!document.documentElement.dataset.titleOriginal) {
        document.documentElement.dataset.titleOriginal = document.title;
    }
    document.title = translateText(document.documentElement.dataset.titleOriginal, language);

    document.querySelectorAll('meta[name="description"]').forEach(meta => {
        if (!meta.dataset.contentOriginal) meta.dataset.contentOriginal = meta.getAttribute('content');
        meta.setAttribute('content', translateText(meta.dataset.contentOriginal, language));
    });

    document.querySelectorAll('[data-tooltip]').forEach(element => {
        if (!element.dataset.tooltipOriginal) element.dataset.tooltipOriginal = element.dataset.tooltip;
        element.dataset.tooltip = translateText(element.dataset.tooltipOriginal, language);
    });

    document.querySelectorAll('[aria-label]').forEach(element => {
        if (!element.dataset.ariaLabelOriginal) element.dataset.ariaLabelOriginal = element.getAttribute('aria-label');
        element.setAttribute('aria-label', translateText(element.dataset.ariaLabelOriginal, language));
    });

    dynamicProjectModals.forEach(project => renderProjectModal(project));

    document.querySelectorAll('[data-language-toggle]').forEach(button => {
        button.textContent = button.dataset.languageLabel === 'full'
            ? (language === 'es' ? 'Español' : 'English')
            : language.toUpperCase();
        button.setAttribute('aria-label', language === 'es' ? 'Cambiar idioma a inglés' : 'Change language to Spanish');
    });

    document.dispatchEvent(new CustomEvent('portfolio-language-change', { detail: { language } }));
}

function initializeLanguageSwitcher() {
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
        button.addEventListener('click', () => applyLanguage(currentLanguage === 'es' ? 'en' : 'es'));
    });
}
