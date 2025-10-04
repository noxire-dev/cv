document.addEventListener("DOMContentLoaded", () => {
    const terminal = document.querySelector(".terminal-content");
    const container = document.querySelector(".container");
    const introScreen = document.querySelector(".intro-screen");

    // ESC to skip intro
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        introScreen.style.display !== "none" &&
        !introScreen.classList.contains("hidden")
      ) {
        e.preventDefault();
        skipIntroAnimation();
      }
    });

    // Touch: swipe down to skip
    let touchStartY = 0;
    let touchEndY = 0;
    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );
    document.addEventListener(
      "touchend",
      (e) => {
        touchEndY = e.changedTouches[0].screenY;
        const delta = touchEndY - touchStartY;
        if (delta > 100 && introVisible()) {
          if (navigator.vibrate) navigator.vibrate(75);
          skipIntroAnimation();
        }
      },
      { passive: true }
    );

    function introVisible() {
      return introScreen.style.display !== "none";
    }

    const texts = [
      { text: "$ initiating session..." },
      { text: "$ loading profile.json" },
      { text: "$ user: Sina Dilek" },
      { text: "$ role: Software Developer" },
      { text: "$ skills: [Python, Go, Java, JavaScript]" },
      {
        text: "$ interests: [Game Development, Web Design, System Programming]",
      },
      { text: "$ status: available for work" },
      { text: "$ loading dynamic content..." },
      { text: "SINA DILEK >", sticky: true },
    ];

    let currentLine = 0;

    function addLine() {
      if (currentLine >= texts.length) {
        // Fade away intro, reveal content
        setTimeout(() => {
          introScreen.style.opacity = "0";
          setTimeout(() => {
            introScreen.style.display = "none";
            container.classList.remove("hidden");
            container.classList.add("fade-in");
          }, 800);
        }, 400);
        return;
      }

      const line = document.createElement("div");
      line.className = "terminal-line";
      line.textContent = texts[currentLine].text;
      terminal.appendChild(line);

      currentLine++;
      setTimeout(addLine, 800);

      terminal.scrollTop = terminal.scrollHeight;
    }

    function skipIntroAnimation() {
      terminal.innerHTML = "";
      introScreen.style.opacity = "0";
      setTimeout(() => {
        introScreen.style.display = "none";
        container.classList.remove("hidden");
        container.classList.add("fade-in");
      }, 500);
    }

    // Close button to skip
    const closeButton = document.querySelector(".terminal-button.close");
    const exitHint = document.querySelector(".terminal-exit-hint");

    function hideExitHint() {
      if (exitHint && !exitHint.classList.contains("hidden")) {
        exitHint.classList.add("hidden");
      }
    }

    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      hideExitHint();
      if (navigator.vibrate) navigator.vibrate(30);
      skipIntroAnimation();
    });

    closeButton.addEventListener(
      "touchstart",
      () => {
        hideExitHint();
        closeButton.style.opacity = "0.6";
      },
      { passive: true }
    );
    closeButton.addEventListener(
      "touchend",
      () => {
        closeButton.style.opacity = "";
      },
      { passive: true }
    );
    closeButton.addEventListener(
      "touchcancel",
      () => {
        closeButton.style.opacity = "";
      },
      { passive: true }
    );

    // Add explicit Skip button + click outside to skip
    const headerEl = document.querySelector(".terminal-header");
    if (headerEl) {
      const skipBtn = document.createElement("button");
      skipBtn.className = "intro-skip";
      skipBtn.textContent = "Skip";
      skipBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        skipIntroAnimation();
      });
      headerEl.appendChild(skipBtn);
    }
    introScreen.addEventListener("click", (e) => {
      if (!e.target.closest(".terminal")) {
        skipIntroAnimation();
      }
    });

    // Start intro
    setTimeout(addLine, 800);

    // Card shine
    const cards = document.querySelectorAll(".project-card");
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.onmousemove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      };
    });

    // Secret terminal (triple-click title)
    const terminalTitle = document.querySelector(".terminal-title");
    let clickCount = 0;
    let clickTimer;

    terminalTitle.addEventListener("click", () => {
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 500);

      if (clickCount === 3) {
        activateSecretTerminal();
        clickCount = 0;
      }
    });

    function activateSecretTerminal() {
      const mainContainer = document.querySelector(".container");
      mainContainer.style.display = "none";

      const secretTerminal = document.createElement("div");
      secretTerminal.className = "intro-screen secret-mode";

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
            <div class="terminal-line">$ type 'help' or 'exit' for commands</div>
            <div class="terminal-exit-hint">ESC or click ● to exit</div>
            <div class="terminal-input-wrapper">
              <span class="prompt">> </span>
              <input type="text" class="secret-cli-input" autofocus>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(secretTerminal);

      const input = secretTerminal.querySelector(".secret-cli-input");
      const secretCloseBtn = secretTerminal.querySelector(
        ".terminal-button.close"
      );
      const secretExitHint =
        secretTerminal.querySelector(".terminal-exit-hint");

      function hideSecretExitHint() {
        if (secretExitHint && !secretExitHint.classList.contains("hidden")) {
          secretExitHint.classList.add("hidden");
        }
      }

      function exitSecretTerminal() {
        const mainContainer = document.querySelector(".container");
        secretTerminal.remove();
        mainContainer.style.display = "";
      }

      secretCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        hideSecretExitHint();
        if (navigator.vibrate) navigator.vibrate(30);
        exitSecretTerminal();
      });

      ["touchstart", "touchend", "touchcancel"].forEach((evt) => {
        secretCloseBtn.addEventListener(
          evt,
          () => {
            if (evt === "touchstart") secretCloseBtn.style.opacity = "0.6";
            else secretCloseBtn.style.opacity = "";
          },
          { passive: true }
        );
      });

      input.addEventListener("keydown", (e) => {
        hideSecretExitHint();

        if (e.key === "Escape") {
          e.preventDefault();
          if (navigator.vibrate) navigator.vibrate(50);
          exitSecretTerminal();
          return;
        }

        if (e.key === "Enter") {
          handleSecretCommand(e);
        }
      });
    }

    function handleSecretCommand(e) {
      const input = e.target;
      const fullCommand = input.value.trim();
      const command = fullCommand.toLowerCase();
      const terminalContent = input.closest(".terminal-content");

      const commandLine = document.createElement("div");
      commandLine.className = "terminal-line";
      commandLine.textContent = `> ${fullCommand}`;
      terminalContent.insertBefore(commandLine, input.parentElement);

      let response;
      switch (command.split(" ")[0]) {
        case "help":
          response = [
            "Available commands:",
            "  help     - Show this help message",
            "  clear    - Clear terminal",
            "  exit     - Exit secret terminal",
            "  whoami   - Display user info",
            "  40k      - What is this?",
            "  where    - Show location",
          ].join("\n");
          break;
        case "clear":
          terminalContent.innerHTML = "";
          terminalContent.appendChild(input.parentElement);
          input.value = "";
          return;
        case "exit":
          if (navigator.vibrate) navigator.vibrate(50);
          const secretTerminal = document.querySelector(".secret-mode");
          const mainContainer = document.querySelector(".container");
          secretTerminal.remove();
          mainContainer.style.display = "";
          return;
        case "whoami":
          response = `
  ╭─────────────────────────────╮
  │                             │
  │    ╭───────────────╮        │
  │    │   NOXIRE      │        │
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
        case "40k":
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
        case "where":
          if (command === "where gf") {
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
            response = "Usage: where [target]\n";
          }
          break;
        default:
          response = `Command not found: ${command}`;
      }

      response.split("\n").forEach((line) => {
        const responseLine = document.createElement("div");
        responseLine.className = "terminal-line";
        responseLine.textContent = line;
        terminalContent.insertBefore(responseLine, input.parentElement);
      });

      input.value = "";
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  });
