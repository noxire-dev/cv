const PROJECTS = [
    {
        name: "UzmanParaScraper",
        status: "Active",
        description: "Website Scraper for BIST100",
        technologies: ["Python", "BeautifulSoup4"],
        link: "https://github.com/Noxire-Hash/UzmanParaScraper",
    },
    {
        name: "Midnight Moon Theme Collection",
        status: "Active",
        description: "A vscode extension containing a set of themes themes I developed",
        technologies: ["Json"],
        link: "https://github.com/Noxire-Hash/midnight-theme",
    },
    {
        name: "Miles&Miles",
        status: "On Hold",
        description: "Flight App for Finding Cheap Flights",
        technologies: ["Python", "API Integration"],
        link: "https://github.com/Noxire-Hash/MilesnMiles",
    },
    {
        name: "F1 Simulator/TRPG",
        status: "On Hold",
        description: "A text-based simulator for F1 in purpose of turning into a TRPG",
        technologies: ["Python"],
        link: "https://github.com/Noxire-Hash/F1-Simulator",
    },
    {
        name: "Zen Design",
        status: "Completed",
        description: "A design portfolio for a non-existing company",
        technologies: ["HTML", "CSS"],
        link: "https://github.com/Noxire-Hash/Zen-Design",
    },
    {
        name: "SazBoz",
        status: "Discontinued",
        description: "A discord bot that can played music and helped with moderation now it is discontinued",
        technologies: ["JavaScript"],
        link: "_blank",
    }
];

const UPDATES = [
    {
        date: "2025-02-23",
        title: "Started Learning C",
        content: "I wanted to dive into low-level programming so I started learning C not to be good at it but understand how C++, C# and Rust works. It's hair pulling to implement the functions I am so used to using in high level languages but it's also a lot of fun + loving the simplicity and syntax of C.",
        tags: ["learning", "C", "low-level"],
    },
    {
        date: "2025-02-30",
        title: "Portfolio Website Launch",
        content: "Finally launched my personal portfolio website with a terminal-inspired design. Built with Flask and vanilla JavaScript. Planning to add more projects and features soon.",
        tags: ["web-dev", "portfolio", "flask"],
    }
];

const SKILLS = [
    {name: "Python", color: "#3776AB", category: "language", progress: 90},
    {name: "HTML/CSS", color: "#E34F26", category: "web", progress: 85},
    {name: "Flask", color: "#3776AB", category: "framework", progress: 75},
    {name: "Assembly", color: "#6E4C13", category: "language", progress: 50},
    {name: "Java", color: "#007396", category: "language", progress: 50},
    {name: "JavaScript", color: "#F7DF1E", category: "language", progress: 55},
    {name: "Git", color: "#F05032", category: "tool", progress: 80},
    {name: "SQL", color: "#4479A1", category: "database", progress: 70},
];

const LANGUAGES = {
    python: {
        color: "#38B2AC",
        name: "Python",
    },
    javascript: {
        color: "#ECC94B",
        name: "JavaScript",
    },
    typescript: {
        color: "#63B3ED",
        name: "TypeScript",
    },
    html: {
        color: "#F56565",
        name: "HTML",
    },
    css: {
        color: "#9F7AEA",
        name: "CSS",
    },
    java: {
        color: "#ED64A6",
        name: "Java",
    },
    flask: {
        color: "#38B2AC",
        name: "Flask",
    },
    sqlite: {
        color: "#003B57",
        name: "SQLite",
    },
    beautifulsoup4: {
        color: "#38B2AC",
        name: "BeautifulSoup4",
    },
    api: {
        color: "#718096",
        name: "API Integration",
    },
    "api integration": {
        color: "#718096",
        name: "API Integration",
    },
    json: {
        color: "#48BB78",
        name: "JSON",
    },
};

document.addEventListener('DOMContentLoaded', () => {
    // Add vim command listener to the whole document
    document.addEventListener('keydown', (e) => {
        // Only trigger if ':' is pressed and no input is focused
        if (e.key === ':' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            showVimPanel();
        }
    });

    // Render projects and updates
    renderProjects();
    renderUpdates();

    const texts = [
        { text: "$ initiating session..." },
        { text: "$ loading profile.json" },
        { text: "$ user: Sina Dilek" },
        { text: "$ role: Software Developer" },
        { text: "$ skills: [Python, HTML, CSS, JS, Flask, Assembly, Java]" },
        { text: "$ interests: [Game Development, Web Design, System Programming]" },
        { text: "$ status: available for work" },
        { text: "$ loading dynamic content..." },
        { text: "SINA DILEK >", sticky: true }
    ];

    const terminal = document.querySelector('.terminal-content');
    const container = document.querySelector('.container');
    const introScreen = document.querySelector('.intro-screen');
    const navbar = document.querySelector('.navbar');

    let currentLine = 0;

    function addLine() {
        if (currentLine >= texts.length) {
            // Show the last text in navbar and fade in content
            if (texts[texts.length - 1].sticky) {
                navbar.classList.add('show');
                navbar.querySelector('.navbar-text').textContent =
                    texts[texts.length - 1].text;
            }

            setTimeout(() => {
                introScreen.style.opacity = '0';
                setTimeout(() => {
                    introScreen.style.display = 'none';
                    container.classList.remove('hidden');
                    container.classList.add('fade-in');
                }, 800);
            }, 400);
            return;
        }

        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.textContent = texts[currentLine].text;
        terminal.appendChild(line);

        currentLine++;
        setTimeout(addLine, 800);

        // Scroll to bottom of terminal
        terminal.scrollTop = terminal.scrollHeight;
    }

    // Handle scroll events for parallax effect
    window.addEventListener('scroll', () => {
        if (navbar.classList.contains('show')) {
            const scroll = window.scrollY;
            document.body.style.setProperty('--scroll', scroll + 'px');
        }
    });

    // Add this function to skip animation and show content
    function skipIntroAnimation() {
        // Clear terminal content
        terminal.innerHTML = '';

        // Show the last text in navbar
        navbar.classList.add('show');
        navbar.querySelector('.navbar-text').textContent = texts[texts.length - 1].text;

        // Hide intro screen and show content
        introScreen.style.opacity = '0';
        setTimeout(() => {
            introScreen.style.display = 'none';
            container.classList.remove('hidden');
            container.classList.add('fade-in');
        }, 500);
    }

    // Add click handler for the close button
    const closeButton = document.querySelector('.terminal-button.close');
    closeButton.addEventListener('click', skipIntroAnimation);

    // Start the animation
    setTimeout(addLine, 1000);

    // Initialize project cards without hiding them
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.opacity = '1'; // Make sure cards are visible

        // Mouse tracking for shine effect
        card.onmousemove = e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
    });

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add CLI functionality
    const navbarText = document.querySelector('.navbar-text');
    const commands = {
        'help': 'Shows available commands',
        'about': 'Scrolls to about section',
        'projects': 'Scrolls to projects section',
        'contact': 'Shows contact information',
        'clear': 'Clears command history'
    };

    let commandHistory = [];
    let historyIndex = -1;

    // Create CLI input
    const cliInput = document.createElement('input');
    cliInput.type = 'text';
    cliInput.className = 'cli-input';
    cliInput.setAttribute('aria-label', 'Command line interface');
    navbarText.appendChild(cliInput);

    cliInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = cliInput.value.trim().toLowerCase();
            executeCommand(command);
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            cliInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                cliInput.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                cliInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                cliInput.value = '';
            }
            e.preventDefault();
        }
    });

    function executeCommand(cmd) {
        switch(cmd) {
            case 'help':
                alert('Available commands: help, about, projects, contact, clear');
                break;
            case 'about':
                document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'projects':
                document.querySelector('.projects-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                alert('Contact: email@example.com');
                break;
            case 'clear':
                // Clear command history
                commandHistory = [];
                historyIndex = -1;
                break;
            default:
                alert(`Command not found: ${cmd}`);
        }
    }

    // Add secret terminal functionality
    const terminalTitle = document.querySelector('.terminal-title');
    let clickCount = 0;
    let clickTimer;

    terminalTitle.addEventListener('click', () => {
        clickCount++;

        // Reset click count after 500ms
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);

        // Three rapid clicks to activate secret terminal
        if (clickCount === 3) {
            activateSecretTerminal();
            clickCount = 0;
        }
    });

    function activateSecretTerminal() {
        // Hide main container and navbar
        const mainContainer = document.querySelector('.container');
        const navbar = document.querySelector('.navbar');
        mainContainer.style.display = 'none';
        navbar.style.display = 'none';

        // Create and show the secret terminal
        const secretTerminal = document.createElement('div');
        secretTerminal.className = 'intro-screen secret-mode';

        secretTerminal.innerHTML = `
            <div class="terminal">
                <div class="terminal-header">
                    <div class="terminal-buttons">
                        <span class="terminal-button close"></span>
                        <span class="terminal-button minimize"></span>
                        <span class="terminal-button maximize"></span>
                    </div>
                    <div class="terminal-title">secret.terminal ~</div>
                </div>
                <div class="terminal-content">
                    <div class="terminal-line">$ accessing secret terminal...</div>
                    <div class="terminal-line">$ authorization required...</div>
                    <div class="terminal-line">$ access granted...</div>
                    <div class="terminal-line">$ type 'help' for available commands</div>
                    <div class="terminal-input-wrapper">
                        <span class="prompt">> </span>
                        <input type="text" class="secret-cli-input" autofocus>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(secretTerminal);

        // Get the input element
        const input = secretTerminal.querySelector('.secret-cli-input');

        // Add keydown event listener for both commands and vim panel
        input.addEventListener('keydown', (e) => {
            // Check for vim command panel trigger
            if (e.key === ':') {
                e.preventDefault();
                showVimPanel();
                return;
            }

            // Handle regular commands
            if (e.key === 'Enter') {
                handleSecretCommand(e);
            }
        });
    }

    // Add color scheme definitions
    const COLOR_SCHEMES = {
        tokyonight: {
            bg: '#1a1b26',
            fg: '#a9b1d6',
            accent: '#7aa2f7',
            border: '#292e42'
        },
        gruvbox: {
            bg: '#282828',
            fg: '#ebdbb2',
            accent: '#d79921',
            border: '#3c3836'
        },
        dracula: {
            bg: '#282a36',
            fg: '#f8f8f2',
            accent: '#bd93f9',
            border: '#44475a'
        },
        nord: {
            bg: '#2e3440',
            fg: '#d8dee9',
            accent: '#88c0d0',
            border: '#3b4252'
        },
        catppuccin: {
            bg: '#1e1e2e',
            fg: '#cdd6f4',
            accent: '#89b4fa',
            border: '#313244'
        }
    };

    function showVimPanel() {
        // Remove existing panel if it exists
        const existingPanel = document.querySelector('.vim-command-panel');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }

        const panel = document.createElement('div');
        panel.className = 'vim-command-panel';
        panel.innerHTML = `
            <span class="vim-prompt">:</span>
            <input type="text" class="vim-input" autofocus>
        `;

        document.body.appendChild(panel);

        const vimInput = panel.querySelector('.vim-input');
        vimInput.focus();

        // Add autocomplete for colorscheme commands
        vimInput.addEventListener('input', (e) => {
            const input = e.target.value.toLowerCase();
            if (input.startsWith('colorscheme ')) {
                const schemeName = input.split(' ')[1];
                showColorSchemeHint(Object.keys(COLOR_SCHEMES), schemeName);
            }
        });

        vimInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                executeVimCommand(vimInput.value.trim().toLowerCase());
                panel.remove();
            } else if (e.key === 'Escape') {
                panel.remove();
            }
        });
    }

    function showColorSchemeHint(schemes, partial) {
        const hints = schemes.filter(s => s.startsWith(partial));
        if (hints.length === 0) return;

        let hintPanel = document.querySelector('.colorscheme-hints');
        if (!hintPanel) {
            hintPanel = document.createElement('div');
            hintPanel.className = 'colorscheme-hints';
            document.body.appendChild(hintPanel);
        }

        hintPanel.innerHTML = hints.map(h => `<div class="hint">${h}</div>`).join('');
        hintPanel.style.display = 'block';
    }

    function executeVimCommand(command) {
        if (command.startsWith('colorscheme ')) {
            const scheme = command.split(' ')[1];
            if (COLOR_SCHEMES[scheme]) {
                applyColorScheme(scheme);
                showNotification(`Color scheme changed to ${scheme}`);
            } else {
                showNotification(`Unknown color scheme: ${scheme}`);
            }
            return;
        }

        switch(command) {
            case 'q':
            case 'quit':
                window.close();
                break;

            case 'about':
                document.querySelector('.about-section').scrollIntoView({ behavior: 'smooth' });
                break;

            case 'projects':
                document.querySelector('.projects-section').scrollIntoView({ behavior: 'smooth' });
                break;

            case 'updates':
                document.querySelector('.updates-section').scrollIntoView({ behavior: 'smooth' });
                break;

            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;

            case 'bottom':
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                break;

            case 'terminal':
                // Trigger secret terminal if it exists
                const terminalTitle = document.querySelector('.terminal-title');
                if (terminalTitle) {
                    terminalTitle.click();
                    terminalTitle.click();
                    terminalTitle.click();
                }
                break;

            case 'help':
                showHelpModal();
                break;

            default:
                showNotification(`Command not found: ${command}`);
        }
    }

    function applyColorScheme(schemeName) {
        const scheme = COLOR_SCHEMES[schemeName];
        const root = document.documentElement;

        root.style.setProperty('--bg-color', scheme.bg);
        root.style.setProperty('--fg-color', scheme.fg);
        root.style.setProperty('--accent-color', scheme.accent);
        root.style.setProperty('--border-color', scheme.border);

        // Save preference
        localStorage.setItem('preferred-theme', schemeName);
    }

    function showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'vim-help-modal';
        modal.innerHTML = `
            <div class="vim-help-content">
                <h3>Available Commands</h3>
                <div class="command-list">
                    <div class="command-item">:q, :quit</div>
                    <div class="desc">Close the window</div>

                    <div class="command-item">:about</div>
                    <div class="desc">Go to About section</div>

                    <div class="command-item">:projects</div>
                    <div class="desc">Go to Projects section</div>

                    <div class="command-item">:updates</div>
                    <div class="desc">Go to Updates section</div>

                    <div class="command-item">:top</div>
                    <div class="desc">Scroll to top</div>

                    <div class="command-item">:bottom</div>
                    <div class="desc">Scroll to bottom</div>

                    <div class="command-item">:terminal</div>
                    <div class="desc">Open secret terminal</div>

                    <div class="command-item">:help</div>
                    <div class="desc">Show this help</div>

                    <div class="command-item">:colorscheme [theme]</div>
                    <div class="desc">Change color scheme (${Object.keys(COLOR_SCHEMES).join(', ')})</div>
                </div>
                <p class="help-footer">Press ESC to close</p>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on ESC or click outside
        const closeModal = () => modal.remove();
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'vim-notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 2000);
    }

    function handleSecretCommand(e) {
        const input = e.target;

        // Check for ':' key
        if (e.key === ':') {
            e.preventDefault(); // Prevent : from being typed
            input.blur(); // Remove focus from main input
            activateVimCommandPanel();
            return;
        }

        if (e.key !== 'Enter') return;

        const fullCommand = input.value.trim();
        const command = fullCommand.toLowerCase();
        const terminalContent = input.closest('.terminal-content');

        // Add command to terminal with white prompt
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.textContent = `> ${fullCommand}`;
        terminalContent.insertBefore(commandLine, input.parentElement);

        // Process command
        let response;
        switch(command.split(' ')[0]) {
            case 'help':
                response = [
                    'Available commands:',
                    '  help     - Show this help message',
                    '  clear    - Clear terminal',
                    '  exit     - Exit secret terminal',
                    '  whoami   - Display user info',
                    '  40k      - What is this?',
                    '  where    - Show location',
                    // Add more commands here
                ].join('\n');
                break;
            case 'clear':
                terminalContent.innerHTML = '';
                terminalContent.appendChild(input.parentElement);
                input.value = '';
                return;
            case 'exit':
                const secretTerminal = document.querySelector('.secret-mode');
                const mainContainer = document.querySelector('.container');
                const navbar = document.querySelector('.navbar');

                secretTerminal.remove();
                mainContainer.style.display = '';
                navbar.style.display = '';
                return;
            case 'whoami':
                response = `
    ╭─────────────────────────────╮
    │                             │
    │    ╭───────────────╮        │
    │    │   NOXIRE   │        │
    │    ╰───────────────╯        │
    │                             │
    │    User: Sina Dilek         │
    │    Role: Software Developer │
    │    Status: Online           │
    │    Location: UK             │
    │    Current Project: Personal│
    │    Interests: Coding,       │
    │    Gaming, Music            │
    │                             │
    │    Note: Always learning    │
    │    something new            │
    ╰─────────────────────────────╯`;
                break;
            case '40k':
                response = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⠂⠰⣤⣀⠀⠀⢀⣦⣈⠙⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢠⣤⡀⠀⣼⣦⣄⡙⠳⢦⣈⠙⠿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢀⡈⠻⢿⣿⣿⣶⣄⡉⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣶⣄⡉⠻⠿⠟⠃⢰⠏⢠⣾⣿⣿⣄⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣶⠈⠙⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣠⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣴⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⢀⣾⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣾⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠛⠛⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;
                break;
            case 'where':
                if (command === 'where gf') {
                    response = `
    ╭─────────────────────────────╮
    │                             │
    │    She's in my heart        │
    │    and always on my mind    │
    │                             │
    │    ❤️  ❤️  ❤️  ❤️  ❤️  ❤️  │
    │                             │
    │    Love you Ro              │
    ╰─────────────────────────────╯`;
                } else {
                    response = 'Usage: where [target]\n';
                }
                break;
            default:
                response = `Command not found: ${command}`;
        }

        // Add response to terminal
        const responseLines = response.split('\n');
        responseLines.forEach(line => {
            const responseLine = document.createElement('div');
            responseLine.className = 'terminal-line';
            responseLine.textContent = line;
            terminalContent.insertBefore(responseLine, input.parentElement);
        });

        // Clear input and scroll to bottom
        input.value = '';
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    function activateVimCommandPanel() {
        const terminal = document.querySelector('.terminal');

        // Remove existing panel if it exists
        const existingPanel = document.querySelector('.vim-command-panel');
        if (existingPanel) {
            existingPanel.remove();
        }

        // Create command panel
        const commandPanel = document.createElement('div');
        commandPanel.className = 'vim-command-panel';
        commandPanel.innerHTML = `
            <span class="vim-prompt">:</span>
            <input type="text" class="vim-input" autofocus>
        `;

        // Add panel to terminal
        terminal.appendChild(commandPanel);

        const vimInput = commandPanel.querySelector('.vim-input');
        vimInput.focus();

        // Handle vim commands
        vimInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = vimInput.value.trim().toLowerCase();
                handleVimCommand(command);
                commandPanel.remove();
                // Restore focus to main input
                document.querySelector('.secret-cli-input').focus();
            } else if (e.key === 'Escape') {
                commandPanel.remove();
                // Restore focus to main input
                document.querySelector('.secret-cli-input').focus();
            }
        });
    }

    function handleVimCommand(command) {
        const terminalContent = document.querySelector('.terminal-content');

        switch(command) {
            case 'q':
            case 'quit':
                document.querySelector('.terminal-button.close').click();
                break;
            case 'w':
            case 'write':
                addTerminalLine('File saved (just kidding, there\'s nothing to save)');
                break;
            case 'wq':
                addTerminalLine('Saving and quitting...');
                setTimeout(() => document.querySelector('.terminal-button.close').click(), 1000);
                break;
            case 'theme':
                addTerminalLine('Switching theme...');
                document.body.classList.toggle('vim-dark');
                break;
            case 'matrix':
                startMatrixRain();
                break;
            case 'help':
                const helpText = [
                    'Vim-like Commands:',
                    '  :q, :quit    - Exit terminal',
                    '  :w, :write   - Pretend to save',
                    '  :wq         - Save and quit',
                    '  :theme      - Toggle theme',
                    '  :matrix     - Start Matrix rain',
                    '  :help       - Show this help',
                    '',
                    'Press ESC to cancel command'
                ].join('\n');
                addTerminalLine(helpText);
                break;
            default:
                addTerminalLine(`Command not found: ${command}`);
        }
    }

    function addTerminalLine(text) {
        const terminalContent = document.querySelector('.terminal-content');
        const lines = text.split('\n');
        lines.forEach(line => {
            const terminalLine = document.createElement('div');
            terminalLine.className = 'terminal-line';
            terminalLine.textContent = line;
            terminalContent.insertBefore(terminalLine, terminalContent.lastChild);
        });
    }

    function renderProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = PROJECTS.map(project => `
            <div class="project-card">
                <div class="project-header">
                    <h3>${project.name}</h3>
                    <span class="project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => {
                        const lang = LANGUAGES[tech.toLowerCase()] || { color: '#718096', name: tech };
                        return `<span class="tech-tag" style="background-color: ${lang.color}">${lang.name}</span>`;
                    }).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> View on GitHub
                </a>
            </div>
        `).join('');
    }

    function renderUpdates() {
        const updatesContainer = document.getElementById('updates-container');
        if (!updatesContainer) return;

        updatesContainer.innerHTML = UPDATES.map(update => `
            <div class="update-card">
                <div class="update-date">${formatDate(update.date)}</div>
                <h3 class="update-title">${update.title}</h3>
                <p class="update-content">${update.content}</p>
                <div class="update-tags">
                    ${update.tags.map(tag => `<span class="update-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
});
