(function () {
    const trigger = document.querySelector('[data-terminal-open]');
    const overlay = document.querySelector('[data-terminal-overlay]');
    const closeButton = document.querySelector('[data-terminal-close]');
    const body = document.querySelector('[data-terminal-body]');
    const output = document.querySelector('[data-terminal-output]');
    const form = document.querySelector('[data-terminal-form]');
    const input = document.querySelector('[data-terminal-input]');
    const prompt = 'alejandro@portfolio:~$';

    if (!trigger || !overlay || !closeButton || !body || !output || !form || !input) return;

    let commandHistory = [];
    let historyIndex = 0;
    let lastFocusedElement = null;
    let initialized = false;

    const copy = {
        es: {
            openLabel: 'Abrir terminal del portfolio',
            closeLabel: 'Cerrar terminal',
            inputLabel: 'Comando de terminal',
            intro: ['Alejandro Portfolio Terminal', "Escribe 'help' para ver los comandos disponibles."],
            help: [
                'Comandos disponibles:',
                '',
                'about          Sobre mí',
                'experience     Experiencia',
                'projects       Proyectos',
                'skills         Tecnologías',
                'cv             Abrir currículum',
                'contact        Contacto',
                'clear          Limpiar terminal',
                'whoami         Identidad',
                'pwd            Ruta actual',
                'ls             Listar secciones',
                'cat README.md  Leer presentación',
                'exit           Cerrar terminal'
            ],
            about: [
                'Soy una persona curiosa y con muchas ganas de aprender, siempre en busca de nuevos retos que me permitan crecer tanto profesional como personalmente.',
                'Me gusta desarrollar aplicaciones web tanto en frontend como en backend, cuidando la utilidad, la mantenibilidad y la experiencia de usuario.'
            ],
            experience: [
                'Experiencia:',
                '- Inwire Technologies: desarrollo web y mejora de plataformas existentes.',
                '- Smart ESI: colaboración en domotización de la universidad.',
                '- Informática El Corte Inglés / IECISA: prácticas como programador web.',
                '',
                "Escribe 'open experience' para ir a la sección."
            ],
            projects: [
                'Proyectos principales:',
                '- Plataforma IoT: rediseño arquitectónico de una plataforma de iluminación inteligente.',
                '- Pareja Balance: PWA para gestionar gastos en pareja.',
                '- Agenda Académica: PWA para organizar vida académica.',
                '',
                "Escribe 'open projects' para ir a la sección."
            ],
            skills: [
                'Frontend: Angular · TypeScript · JavaScript · HTML · CSS · Next.js',
                'Backend: Python · FastAPI · Flask · PHP · Java · Ruby on Rails',
                'Datos: PostgreSQL · InfluxDB · MySQL · MongoDB · Firebase',
                'Infraestructura: Docker · K3s · Git · GitHub'
            ],
            contact: ['Abriendo sección de contacto...'],
            cv: ['Abriendo currículum...'],
            whoami: ['Alejandro Paniagua', 'Desarrollador Full-Stack'],
            pwd: ['/home/alejandro/portfolio'],
            ls: ['about/', 'experience/', 'projects/', 'skills/', 'cv/', 'contact/', 'README.md'],
            readme: [
                '# Alejandro Paniagua',
                '',
                'Ingeniero Informático y Desarrollador Full-Stack.',
                'Portfolio personal con experiencia, proyectos y tecnologías.',
                '',
                "Escribe 'help' para explorar."
            ],
            hire: [
                '[sudo] Verificando permisos...',
                'Permisos concedidos.',
                'Contratación autorizada. :)',
                '',
                'Puedes contactar conmigo desde la sección de contacto.',
                '',
                "Tip: ejecuta 'contact' para continuar."
            ],
            coffee: ['Estado del café: probablemente necesario.'],
            uptime: ['Portfolio online desde 2024. Mantenimiento continuo.'],
            echo: 'Nada que repetir.',
            notFound(command) {
                return [`bash: ${command}: command not found`, "Escribe 'help' para ver los comandos disponibles."];
            }
        },
        en: {
            openLabel: 'Open portfolio terminal',
            closeLabel: 'Close terminal',
            inputLabel: 'Terminal command',
            intro: ['Alejandro Portfolio Terminal', "Type 'help' to see available commands."],
            help: [
                'Available commands:',
                '',
                'about          About me',
                'experience     Experience',
                'projects       Projects',
                'skills         Technologies',
                'cv             Open resume',
                'contact        Contact',
                'clear          Clear terminal',
                'whoami         Identity',
                'pwd            Current path',
                'ls             List sections',
                'cat README.md  Read introduction',
                'exit           Close terminal'
            ],
            about: [
                'I am a curious person with a strong desire to keep learning, always looking for new challenges that help me grow professionally and personally.',
                'I enjoy building web applications across frontend and backend, with care for usefulness, maintainability, and user experience.'
            ],
            experience: [
                'Experience:',
                '- Inwire Technologies: web development and improvement of existing platforms.',
                '- Smart ESI: collaboration on university automation.',
                '- Informática El Corte Inglés / IECISA: internship as a web programmer.',
                '',
                "Type 'open experience' to go to the section."
            ],
            projects: [
                'Main projects:',
                '- IoT Platform: architectural redesign of an intelligent lighting platform.',
                '- Pareja Balance: PWA for managing expenses as a couple.',
                '- Agenda Académica: PWA for organizing academic life.',
                '',
                "Type 'open projects' to go to the section."
            ],
            skills: [
                'Frontend: Angular · TypeScript · JavaScript · HTML · CSS · Next.js',
                'Backend: Python · FastAPI · Flask · PHP · Java · Ruby on Rails',
                'Data: PostgreSQL · InfluxDB · MySQL · MongoDB · Firebase',
                'Infrastructure: Docker · K3s · Git · GitHub'
            ],
            contact: ['Opening contact section...'],
            cv: ['Opening resume...'],
            whoami: ['Alejandro Paniagua', 'Full-Stack Developer'],
            pwd: ['/home/alejandro/portfolio'],
            ls: ['about/', 'experience/', 'projects/', 'skills/', 'cv/', 'contact/', 'README.md'],
            readme: [
                '# Alejandro Paniagua',
                '',
                'Computer Engineer and Full-Stack Developer.',
                'Personal portfolio with experience, projects, and technologies.',
                '',
                "Type 'help' to explore."
            ],
            hire: [
                '[sudo] Checking permissions...',
                'Permissions granted.',
                'Hiring authorized. :)',
                '',
                'You can contact me from the contact section.',
                '',
                "Tip: run 'contact' to continue."
            ],
            coffee: ['Coffee status: probably required.'],
            uptime: ['Portfolio online since 2024. Continuous maintenance.'],
            echo: 'Nothing to repeat.',
            notFound(command) {
                return [`bash: ${command}: command not found`, "Type 'help' to see available commands."];
            }
        }
    };

    function getLanguage() {
        return document.documentElement.lang === 'en' ? 'en' : 'es';
    }

    function t() {
        return copy[getLanguage()];
    }

    function setStaticLabels() {
        trigger.setAttribute('aria-label', t().openLabel);
        trigger.setAttribute('title', t().openLabel);
        closeButton.setAttribute('aria-label', t().closeLabel);
        const label = document.querySelector('label[for="terminalInput"]');
        if (label) label.textContent = t().inputLabel;
    }

    function appendLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`.trim();
        line.textContent = text;
        output.appendChild(line);
    }

    function appendLines(lines, className = '') {
        lines.forEach(line => appendLine(line, className));
    }

    function scrollToBottom() {
        body.scrollTop = body.scrollHeight;
    }

    function resetTerminal() {
        output.textContent = '';
        appendLines(t().intro, 'muted');
        scrollToBottom();
    }

    function openTerminal() {
        lastFocusedElement = document.activeElement;
        setStaticLabels();
        overlay.hidden = false;
        document.body.classList.add('terminal-open');
        if (!initialized) {
            resetTerminal();
            initialized = true;
        }
        window.setTimeout(() => input.focus(), 0);
    }

    function closeTerminal() {
        overlay.hidden = true;
        document.body.classList.remove('terminal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
        } else {
            trigger.focus();
        }
    }

    function goToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (!target) return;
        closeTerminal();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function normalizeCommand(value) {
        return value.trim().replace(/\s+/g, ' ');
    }

    function runCommand(rawCommand) {
        const command = normalizeCommand(rawCommand);
        if (!command) return;

        appendLine(`${prompt} ${command}`, 'command');

        const lowerCommand = command.toLowerCase();

        if (lowerCommand === 'clear') {
            output.textContent = '';
            return;
        }

        if (lowerCommand === 'exit') {
            closeTerminal();
            return;
        }

        if (lowerCommand === 'help') appendLines(t().help);
        else if (lowerCommand === 'about') appendLines(t().about);
        else if (lowerCommand === 'experience') appendLines(t().experience);
        else if (lowerCommand === 'projects') appendLines(t().projects);
        else if (lowerCommand === 'skills') appendLines(t().skills);
        else if (lowerCommand === 'whoami') appendLines(t().whoami);
        else if (lowerCommand === 'pwd') appendLines(t().pwd);
        else if (lowerCommand === 'ls') appendLines(t().ls);
        else if (lowerCommand === 'cat readme.md') appendLines(t().readme);
        else if (lowerCommand === 'sudo hire alejandro') appendLines(t().hire);
        else if (lowerCommand === 'sudo') appendLine('usage: sudo hire alejandro');
        else if (lowerCommand === 'coffee') appendLines(t().coffee);
        else if (lowerCommand === 'uptime') appendLines(t().uptime);
        else if (lowerCommand.startsWith('echo ')) appendLine(command.slice(5));
        else if (lowerCommand === 'echo') appendLine(t().echo);
        else if (lowerCommand === 'contact') {
            appendLines(t().contact);
            window.setTimeout(() => goToSection('contacto'), 350);
        } else if (lowerCommand === 'cv') {
            appendLines(t().cv);
            window.setTimeout(() => {
                window.location.href = 'cv/';
            }, 250);
        } else if (lowerCommand === 'open experience') {
            goToSection('formacion');
        } else if (lowerCommand === 'open projects') {
            goToSection('portfolio');
        } else {
            appendLines(t().notFound(command));
        }

        scrollToBottom();
    }

    trigger.addEventListener('click', openTerminal);
    closeButton.addEventListener('click', closeTerminal);

    overlay.addEventListener('click', event => {
        if (event.target === overlay) closeTerminal();
    });

    body.addEventListener('click', () => input.focus());

    form.addEventListener('submit', event => {
        event.preventDefault();
        const command = input.value;
        if (normalizeCommand(command)) {
            commandHistory.push(command);
            historyIndex = commandHistory.length;
        }
        input.value = '';
        runCommand(command);
    });

    input.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!commandHistory.length) return;
            historyIndex = Math.max(historyIndex - 1, 0);
            input.value = commandHistory[historyIndex];
            input.setSelectionRange(input.value.length, input.value.length);
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!commandHistory.length) return;
            historyIndex = Math.min(historyIndex + 1, commandHistory.length);
            input.value = commandHistory[historyIndex] || '';
            input.setSelectionRange(input.value.length, input.value.length);
        }

        if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
            event.preventDefault();
            output.textContent = '';
        }
    });

    document.addEventListener('keydown', event => {
        if (!overlay.hidden && event.key === 'Escape') closeTerminal();
    });

    document.addEventListener('portfolio-language-change', setStaticLabels);
    setStaticLabels();
})();
