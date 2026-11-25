document.addEventListener('DOMContentLoaded', () => {
    const cliInput = document.getElementById('cli-input');
    const terminalBody = document.getElementById('terminal');
    const loader = document.getElementById('loader');
    const progressFill = document.querySelector('.progress-fill');
    const clock = document.getElementById('clock');
    const objectiveList = document.getElementById('objective-list');

    // i18n Setup
    const userLang = localStorage.getItem('terminalLang') || (navigator.language.startsWith('es') ? 'es' : 'en');
    window.currentLang = window.i18n[userLang] ? userLang : 'en';

    window.t = function (key, ...args) {
        let str = window.i18n[window.currentLang][key] || key;
        args.forEach((arg, i) => {
            str = str.replace(`{${i}}`, arg);
        });
        return str;
    };
    const t = window.t;

    function updateLanguageUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (el.tagName === 'INPUT' && el.type === 'button') {
                el.value = t(key);
            } else {
                el.innerHTML = t(key);
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });

        const langBtn = document.getElementById('toggle-lang');
        if (langBtn) {
            langBtn.textContent = window.currentLang === 'es' ? 'EN' : 'ES';
        }

        // Re-render dynamic content
        updateObjectives();
        updateMissionUI();
        if (window.commandsData) {
            renderDictionary();
        }

        const bossModal = document.getElementById('boss-modal');
        if (bossModal && bossModal.classList.contains('active')) {
            const messageEl = document.getElementById('boss-message');
            if (messageEl) {
                messageEl.textContent = t('boss_intro') + (t(missions[currentMissionIndex].descKey) || getMissionDesc(missions[currentMissionIndex].id));
                const btn = document.getElementById('btn-accept-mission');
                if (btn) btn.style.display = 'block';
            }
        }
    }

    const langBtn = document.getElementById('toggle-lang');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            window.currentLang = window.currentLang === 'en' ? 'es' : 'en';
            localStorage.setItem('terminalLang', window.currentLang);
            updateLanguageUI();
        });
    }
    // Virtual File System (VFS)
    const vfs = {
        '/': {
            type: 'dir',
            children: {
                'home': {
                    type: 'dir',
                    children: {
                        'user': {
                            type: 'dir',
                            children: {
                                'projects': { type: 'dir', children: {} },
                                'readme.txt': { type: 'file', content: 'Welcome to Terminal Mastery Lab. Master the shell, control the system.' },
                                'script.sh': { type: 'file', content: '#!/bin/bash\necho "Initializing sequence..."' },
                                'notes': { type: 'dir', children: {} }
                            }
                        }
                    }
                },
                'etc': {
                    type: 'dir',
                    children: {
                        'hosts': { type: 'file', content: '127.0.0.1 localhost\n192.168.1.100 master_control' },
                        'shadow': { type: 'file', content: 'root:*:12345:0:99999:7:::' }
                    }
                },
                'var': {
                    type: 'dir',
                    children: {
                        'log': {
                            type: 'dir',
                            children: {
                                'auth.log': { type: 'file', content: 'Apr 11 17:20:01 mast-lab sshd[123]: Accepted password for user\nApr 11 17:25:40 mast-lab sudo: user : TTY=pts/0 ; PWD=/home/user ; USER=root ; COMMAND=/usr/bin/ls' }
                            }
                        }
                    }
                },
                'tmp': { type: 'dir', children: {} }
            }
        }
    };

    let currentPath = '/home/user';
    window.getPathNodeGlobal = (p) => getPathNode(p);
    window.getCurrentPathGlobal = () => currentPath;
    let history = [];
    let historyIndex = -1;
    let isNanoActive = false;
    let nanoTargetFile = null;

    // Mission State
    let currentMissionIndex = 0;
    const missions = [];
    if (window.apprenticeMissions) {
        missions.push(...window.apprenticeMissions);
    }
    if (window.proMissions) {
        missions.push(...window.proMissions);
    }
    window.missionsRef = missions;
    window.currentMissionIndexRef = { get value() { return currentMissionIndex; }, set value(v) { currentMissionIndex = v; } };

    // XP and Persistence
    let userXP = parseInt(localStorage.getItem('terminalMasteryXP')) || 0;
    let maxUnlockedMission = parseInt(localStorage.getItem('terminalMasteryMaxMission')) || 0;
    if (localStorage.getItem('terminalMasteryCurrentMission')) {
        currentMissionIndex = parseInt(localStorage.getItem('terminalMasteryCurrentMission'));
    }

    // Initialize completed missions if loading from save
    for (let i = 0; i < currentMissionIndex; i++) {
        if (missions[i]) missions[i].objectives.forEach(o => o.completed = true);
    }

    function saveProgress() {
        localStorage.setItem('terminalMasteryCurrentMission', currentMissionIndex);
        if (currentMissionIndex > maxUnlockedMission) {
            maxUnlockedMission = currentMissionIndex;
            localStorage.setItem('terminalMasteryMaxMission', maxUnlockedMission);
        }
        localStorage.setItem('terminalMasteryXP', userXP);
    }

    function addXP(amount) {
        userXP += amount;
        saveProgress();
    }

    window.addXPGlobal = addXP; // export for pro-missions if needed

    let isBriefingActive = false;

    function showBossBriefing(text, callback) {
        isBriefingActive = true;
        const modal = document.getElementById('boss-modal');
        const messageEl = document.getElementById('boss-message');
        const btn = document.getElementById('btn-accept-mission');

        modal.classList.add('active');
        btn.style.display = 'none';
        messageEl.textContent = '';

        let i = 0;
        const speed = 40; // ms per character
        const fullText = t('boss_intro') + text;

        function typeWriter() {
            if (i < fullText.length) {
                messageEl.textContent += fullText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                btn.style.display = 'block';
                btn.onclick = () => {
                    modal.classList.remove('active');
                    isBriefingActive = false;
                    if (callback) callback();
                };
            }
        }
        typeWriter();
    }

    function nextMission() {
        showOutput(`${t('sys_mission_complete')} ${t(missions[currentMissionIndex].titleKey)}`, 'accent-primary');
        addXP(100);
        if (currentMissionIndex < missions.length - 1) {
            currentMissionIndex++;
            saveProgress();

            setTimeout(() => {
                showBossBriefing(t(missions[currentMissionIndex].descKey) || getMissionDesc(missions[currentMissionIndex].id), () => {
                    showOutput(`${t('sys_new_mission')} ${t(missions[currentMissionIndex].titleKey)}`, 'accent-secondary');
                    updateObjectives();
                    updateMissionUI();
                });
            }, 1000);
        } else {
            // Completed all levels!
            saveProgress();
            setTimeout(() => {
                runEndingCinematic();
            }, 1000);
        }
    }

    function updateMissionUI() {
        document.getElementById('mission-title').textContent = t(missions[currentMissionIndex].titleKey);
        document.getElementById('mission-desc').textContent = t(missions[currentMissionIndex].descKey) || getMissionDesc(missions[currentMissionIndex].id);

        const level = currentMissionIndex + 1;
        const levelElem = document.getElementById('user-level');
        const rankElem = document.getElementById('user-rank');

        if (levelElem) levelElem.textContent = level;
        if (rankElem) {
            let rank = 'Novice';
            if (window.isProUser) rank = '<span style="color:var(--warning-yellow); text-shadow: 0 0 5px var(--warning-yellow)">PRO Hacker</span>';
            else if (level >= 8) rank = 'Hacker';
            else if (level >= 5) rank = 'SysAdmin';
            else if (level >= 3) rank = 'Explorer';
            rankElem.innerHTML = rank;
        }

        // Update XP Bar
        const xpElem = document.getElementById('user-xp');
        const xpFill = document.getElementById('xp-fill');
        const xpForNextLevel = level * 100;
        if (xpElem && xpFill) {
            xpElem.textContent = `${userXP} / ${xpForNextLevel} XP`;
            const percentage = Math.min((userXP / xpForNextLevel) * 100, 100);
            xpFill.style.width = percentage + '%';
        }

        // Update Badges
        const badgesContainer = document.getElementById('badges-container');
        if (badgesContainer) {
            const badges = [
                { id: 'b1', name: 'Explorer', reqLevel: 3 },
                { id: 'b2', name: 'SysAdmin', reqLevel: 5 },
                { id: 'b3', name: 'Hacker', reqLevel: 8 },
                { id: 'b4', name: 'Network Ninja', reqLevel: 10 },
                { id: 'b5', name: 'Root Master', reqLevel: 13 },
            ];

            badgesContainer.innerHTML = badges.map(b => {
                const earned = level >= b.reqLevel ? 'earned' : '';
                return `<div class="badge ${earned}">${b.name}</div>`;
            }).join('');
        }
    }

    function getMissionDesc(id) {
        const descs = {
            'm1': 'Aprende a navegar por el sistema de archivos. Tu primera tarea es descubrir dónde estás.',
            'm1b': 'Conoce tu entorno. Descubre quién eres, qué sistema usas y qué día es.',
            'm1c': 'Muévete por el sistema como un profesional. Las rutas absolutas y relativas son tu brújula.',
            'm1d': 'Un hacker no busca a mano. Usa comandos de búsqueda potentes para encontrar agujas en pajares.',
            'm1e': 'Monitoriza el pulso de la máquina. RAM y CPU son los recursos que debes dominar.',
            'm1f': 'Empaqueta la información. Dominar la compresión de archivos es vital para extraer datos masivos.',
            'm1g': 'Modifica la matriz. Las variables de entorno controlan cómo se comporta tu sesión.',
            'm2': 'Es hora de crear. Demuestra que puedes organizar archivos y editar su contenido.',
            'm2b': 'Mantén el sistema limpio. Renombra y elimina archivos obsoletos.',
            'm2c': 'No siempre necesitarás nano. Aprende a explorar archivos de texto rápidamente.',
            'm3': 'Como un verdadero SysAdmin, debes auditar los registros del sistema para encontrar brechas de seguridad.',
            'm3b': 'Un buen hacker revisa sus pasos. Consulta tu historial y limpia la pantalla para ocultar huellas.',
            'm4': 'La red es el campo de batalla moderno. Aprende a usar utilidades de red básicas.',
            'm5': 'Hay un proceso minando criptomonedas en el servidor. Encuéntralo y mátalo.',
            'm6': 'Los permisos son fundamentales. Modifica los permisos de un script para poder ejecutarlo.',
            'm7': 'Ayúdanos a correr la voz. Usa las herramientas sociales del sistema.',
            'm8': 'El momento final ha llegado. Toma el control total del servidor.'
        };
        if (window.proMissionDescs && window.proMissionDescs[id]) {
            return window.proMissionDescs[id];
        }
        return descs[id] || '';
    }

    window.commandsData = [];

    // Simple Web Audio API for typing sounds
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx;
    window.audio = {
        init: () => {
            if (!audioCtx) audioCtx = new AudioContext();
            if (audioCtx.state === 'suspended') audioCtx.resume();
        },
        playTyping: () => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.05);
        },
        playEnter: () => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        },
        playError: () => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        }
    };

    // Initialize
    function init() {
        updateLanguageUI();
        // Clock
        setInterval(() => {
            const now = new Date();
            clock.textContent = now.toTimeString().split(' ')[0];
        }, 1000);

        // Loader Simulation
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        window.audio.init(); // Init audio on user interaction (boot complete)
                        startBootSequence();
                    }, 500);
                }, 500);
            }
            progressFill.style.width = `${progress}%`;
        }, 100);

        updateObjectives();
        updateMissionUI();
        updatePrompt();
        setupTabs();
        setupSearch();

        window.updateObjectivesGlobal = updateObjectives;
        window.nextMissionGlobal = nextMission;
        window.showOutputGlobal = showOutput;
        window.updatePromptGlobal = updatePrompt;

        // Auto-advance if stuck on m8 after buying PRO
        if (window.isProUser && currentMissionIndex === 7 && missions[7] && missions[7].objectives.every(o => o.completed)) {
            nextMission();
        }

        // CRT Toggle
        const btnCrt = document.getElementById('toggle-crt');
        if (btnCrt) {
            btnCrt.addEventListener('click', () => {
                document.body.classList.toggle('crt-mode');
            });
        }

        // Modal Logic
        const btnUpgradeModal = document.getElementById('btn-upgrade-modal');
        const modal = document.getElementById('upgrade-modal');
        const btnCloseModal = document.getElementById('btn-close-modal');
        const btnSubmitLicense = document.getElementById('btn-submit-license');
        const licenseInput = document.getElementById('license-input');

        if (btnUpgradeModal && modal) {
            btnUpgradeModal.addEventListener('click', () => {
                modal.classList.add('active');
            });
            btnCloseModal.addEventListener('click', () => {
                modal.classList.remove('active');
            });
            btnSubmitLicense.addEventListener('click', () => {
                const key = licenseInput.value.trim();
                if (key) {
                    const output = handleLogin([key]);
                    showOutput(output, output.includes('ACCEPTED') ? 'warning-yellow' : 'error');
                    modal.classList.remove('active');
                }
            });
        }

        // Load Dictionary
        fetch('commands.json')
            .then(res => res.json())
            .then(data => {
                window.commandsData = data;
                renderDictionary();
            })
            .catch(err => console.error("Error loading commands:", err));
    }

    async function startBootSequence() {
        const inputContainer = document.getElementById('input-container');

        const bootLines = [
            { text: t('boot_1'), delay: 300 },
            { text: t('boot_2'), delay: 400 },
            { text: t('boot_3'), delay: 200 },
            { text: t('boot_4'), delay: 600, class: "accent-primary" },
            { text: t('boot_5'), delay: 300 }
        ];

        for (const line of bootLines) {
            await new Promise(r => setTimeout(r, line.delay));
            showOutput(line.text, line.class || '');
        }

        await new Promise(r => setTimeout(r, 200));
        if (inputContainer) {
            inputContainer.style.display = 'flex';
        }

        // Show boss briefing on boot for the current mission
        if (window.innerWidth > 1000) {
            setTimeout(() => {
                showBossBriefing(t(missions[currentMissionIndex].descKey) || getMissionDesc(missions[currentMissionIndex].id), () => {
                    if (window.innerWidth > 1000) {
                        cliInput.focus();
                    }
                });
            }, 500);
        }
    }

    function setupTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute('data-tab');

                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                document.getElementById(`${target}-tab`).classList.add('active');
            });
        });
    }

    function renderDictionary(filter = '') {
        const container = document.getElementById('dict-list');
        container.innerHTML = '';

        const filtered = window.commandsData.filter(cmd => {
            const desc = window.currentLang === 'es' ? (cmd.desc_es || cmd.desc_en) : (cmd.desc_en || cmd.desc_es);
            return cmd.name.toLowerCase().includes(filter.toLowerCase()) ||
                   desc.toLowerCase().includes(filter.toLowerCase());
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div class="output-line" style="opacity:0.5; padding: 1rem;">No commands found matching your search.</div>';
            return;
        }

        filtered.forEach(cmd => {
            const card = document.createElement('div');
            card.className = 'dict-card';

            const isUnlocked = window.unlockedCommands && window.unlockedCommands.has(cmd.name);
            const isPro = !window.freeCommands.includes(cmd.name);
            let iconHTML = '';
            if (isUnlocked) {
                iconHTML = '<span style="color:var(--accent-primary); margin-right:4px;">✔</span>';
            } else if (isPro && !window.isProUser) {
                iconHTML = '<span style="color:var(--warning-yellow); margin-right:4px;">🔒</span>';
            }
            const typeLabel = cmd.type || 'Core';
            const desc = window.currentLang === 'es' ? (cmd.desc_es || cmd.desc_en) : (cmd.desc_en || cmd.desc_es);

            card.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h3>${cmd.name}</h3>
                    <span style="font-size:0.65rem; color:var(--accent-secondary); background:rgba(0,209,255,0.1); padding:2px 6px; border-radius:4px; text-transform:uppercase; letter-spacing:1px;">${iconHTML}${typeLabel}</span>
                </div>
                <p>${desc}</p>
                <div class="example">$ ${cmd.example}</div>
            `;
            container.appendChild(card);
        });
    }

    function setupSearch() {
        const searchInput = document.getElementById('dict-search');
        searchInput.addEventListener('input', (e) => {
            renderDictionary(e.target.value);
        });
    }

    function updateObjectives() {
        const mission = missions[currentMissionIndex];
        objectiveList.innerHTML = '';
        mission.objectives.forEach(obj => {
            const li = document.createElement('li');
            li.className = obj.completed ? 'completed' : 'pending';
            const label = obj.textKey ? t(obj.textKey) : obj.text;
            li.innerHTML = label.replace(/`([^`]+)`/g, '<code>$1</code>');
            objectiveList.appendChild(li);
        });
    }

    function getPromptText() {
        let displayPath = currentPath;
        if (currentPath === '/home/user') displayPath = '~';
        else if (currentPath.startsWith('/home/user/')) displayPath = '~' + currentPath.substring(10);

        if (window.mysqlSessionActive) {
            return `<span style="color:#var(--accent-secondary)">mysql</span>> `;
        }

        if (window.sshSessionActive) {
            return window.sshPromptText;
        }

        if (window.isRootUser) {
            return `<span style="color:#ff3366">root@mast-lab</span>:<span style="color:#3388ff">${displayPath}</span>#`;
        }
        return `user@mast-lab:${displayPath}$`;
    }

    function updatePrompt() {
        const promptElem = document.getElementById('current-prompt');
        if (promptElem) {
            promptElem.innerHTML = getPromptText();
        }
    }

    // Terminal Logic
    window.isProUser = true;
    window.unlockedCommands = new Set();
    window.freeCommands = ['ls', 'cd', 'pwd', 'mkdir', 'touch', 'cp', 'mv', 'rm', 'cat', 'head', 'tail', 'nano', 'whoami', 'date', 'clear', 'history', 'ping', 'echo', 'exit', 'sudo', 'share', 'upgrade', 'login', 'grep', 'curl', 'ps', 'kill', 'chmod', './script.sh', 'find', 'free', 'top', 'tar', 'export', 'missions'];
    window.proCommands = ['nmap', 'ssh', 'docker', 'docker-compose', 'git', 'ufw', 'mysql', 'crontab', 'tcpdump', 'gcc', './exploit', 'shred', 'hydra', 'nc', 'proxychains', 'certbot', 'dig', 'nslookup', 'nginx', 'apache2', 'fdisk', 'mkfs', 'mount', 'lvm', 'systemctl', 'journalctl', 'apt', 'dpkg', 'yum', 'useradd', 'usermod', 'visudo', 'iptables', 'nftables', 'ip', 'traceroute', 'mtr', 'fail2ban', 'haproxy', 'rsyslog', 'logrotate', 'vmstat', 'ss', 'dstat', 'valgrind', 'auditd', 'inotifywait', 'kubectl', 'terraform', 'gitlab-runner', 'sshd', 'sysctl', 'apparmor_status', 'gpg', 'rsync', 'mdadm', 'btrfs', 'keepalived', 'wg'];
    window.isRootUser = false;

    function handleCommand(input) {
        if (isBriefingActive) return;
        input = input.trim();
        if (!input) return;

        history.push(input);
        historyIndex = history.length;

        const parts = input.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        window.unlockedCommands.add(cmd);
        renderDictionary(document.getElementById('dict-search').value);

        function escapeHtml(str) {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        // Echo command to terminal
        const echoLine = document.createElement('div');
        echoLine.className = 'output-line';
        echoLine.innerHTML = `<span class="prompt">${getPromptText()}</span> ${escapeHtml(input)}`;
        terminalBody.insertBefore(echoLine, cliInput.parentElement);

        if (window.mysqlSessionActive) {
            output = window.handleMysqlInput ? window.handleMysqlInput(input) : 'MySQL error';
            if (output) showOutput(output);

            if (missions[currentMissionIndex]) {
                missions[currentMissionIndex].check(input.toLowerCase(), [], output);
            }
            terminalBody.scrollTop = terminalBody.scrollHeight;
            return;
        }

        // Dispatch
        let output = '';
        switch (cmd) {
            case 'help':
                output = 'Available commands: help, clear, pwd, ls, cd, cat, nano, mkdir, touch, rm, grep, whoami, date, uname';
                break;
            case 'clear':
                const lines = terminalBody.querySelectorAll('.output-line, .output-line--content');
                lines.forEach(line => line.remove());
                break;
            case 'pwd':
                output = currentPath;
                break;
            case 'ls':
                output = listDirectory(currentPath);
                break;
            case 'whoami':
                output = 'user';
                break;
            case 'date':
                output = new Date().toString();
                break;
            case 'echo':
                output = args.join(' ');
                break;
            case 'uname':
                output = 'Linux mast-lab 5.15.0-generic #1 SMP x86_64 GNU/Linux';
                break;
            case 'hostname':
                output = 'mast-lab';
                break;
            case 'cd':
                output = changeDirectory(args[0]);
                break;
            case 'cat':
                output = readFile(args[0]);
                break;
            case 'mkdir':
                output = createDirectory(args[0]);
                break;
            case 'touch':
                output = createFile(args[0]);
                break;
            case 'rm':
                output = removeNode(args[0]);
                break;
            case 'mv':
                output = moveNode(args[0], args[1]);
                break;
            case 'cp':
                output = copyNode(args[0], args[1]);
                break;
            case 'history':
                output = history.map((c, i) => `  ${i + 1}  ${c}`).join('\n');
                break;
            case 'head':
                output = readPart(args[0], 'head');
                break;
            case 'tail':
                output = readPart(args[0], 'tail');
                break;
            case 'nano':
                output = handleNano(args[0]);
                break;
            case 'grep':
                output = handleGrep(args);
                break;
            case 'ping':
                output = handlePing(args);
                break;
            case 'curl':
                output = handleCurl(args);
                break;
            case 'ps':
                output = handlePs(args);
                break;
            case 'kill':
                output = handleKill(args);
                break;
            case 'chmod':
                output = handleChmod(args);
                break;
            case './script.sh':
                output = 'Initializing sequence...\n...\n...\nSUCCESS! System verified.';
                break;
            case 'upgrade':
                output = handleUpgrade(args);
                break;
            case 'sudo':
                output = handleSudo(args);
                break;
            case 'share':
                output = handleShare(args);
                break;
            case 'login':
                output = handleLogin(args);
                break;
            case 'matrix':
                if (window.toggleMatrix) output = window.toggleMatrix() ? t('sys_matrix_on') : t('sys_matrix_off');
                break;
            case 'missions':
                if (args[0] === 'jump' && args[1]) {
                    const level = parseInt(args[1], 10);
                    if (isNaN(level) || level < 1 || level > missions.length) {
                        output = t('sys_invalid_jump');
                    } else {
                        const maxLevelUnlocked = (parseInt(localStorage.getItem('terminalMasteryXP'), 10) || 0) / 100 + 1;
                        if (level > Math.max(currentMissionIndex + 1, maxLevelUnlocked) && level !== 1 && !localStorage.getItem('terminalMasteryPro')) {
                            output = `${t('sys_locked_jump')} ${level}.`;
                        } else {
                            currentMissionIndex = level - 1;
                            for (let i = 0; i < currentMissionIndex; i++) {
                                if (missions[i]) missions[i].objectives.forEach(o => o.completed = true);
                            }
                            if (missions[currentMissionIndex]) {
                                missions[currentMissionIndex].objectives.forEach(o => o.completed = false);
                            }
                            saveProgress();

                            showBossBriefing(t(missions[currentMissionIndex].descKey) || getMissionDesc(missions[currentMissionIndex].id), () => {
                                updateMissionUI();
                                updateObjectives();
                                showOutput(`${t('sys_jumping')} ${level}...`, 'accent-secondary');
                            });
                            return;
                        }
                    }
                } else {
                    let missionList = 'AVAILABLE MISSIONS:\n------------------\n';
                    for (let i = 0; i <= maxUnlockedMission; i++) {
                        if (missions[i]) {
                            const indicator = (i === currentMissionIndex) ? '>>' : '  ';
                            missionList += `${indicator} Level ${i + 1}: ${missions[i].title}\n`;
                        }
                    }
                    missionList += '\nUse "missions jump <level>" to replay a previous mission.';
                    output = missionList;
                }
                break;
            case 'glitch':
                if (window.triggerGlitch) {
                    window.triggerGlitch(2000);
                    output = 'System instability detected...';
                }
                break;
            case 'find':
                output = '/home/user/hidden/flag.txt\n/var/backups/flag.txt';
                break;
            case 'free':
                output = '               total        used        free      shared  buff/cache   available\nMem:           7951        2048        1500         120        4403        5000\nSwap:          2048           0        2048';
                break;
            case 'top':
                output = 'top - 14:25:01 up 10 days,  4:23,  1 user,  load average: 0.05, 0.03, 0.01\nTasks: 110 total,   1 running, 109 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  1.5 us,  0.5 sy,  0.0 ni, 98.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :   7951.0 total,   1500.0 free,   2048.0 used,   4403.0 buff/cache\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n    1 root      20   0  168536  11284   8412 S   0.0   0.1   0:05.12 systemd\n  999 root      20   0 1564892  23544  14532 S   5.5   0.3   1:23.45 xmrig';
                break;
            case 'export':
                if (args.length > 0) output = '';
                else output = 'declare -x HOME="/home/user"\ndeclare -x PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"\ndeclare -x USER="user"';
                break;
            case 'tar':
                output = window.handleProCommand ? window.handleProCommand('tar', args) : 'tar: Archive created.';
                break;
            default:
                const inDict = window.commandsData.find(c => c.name === cmd);
                // Also check if it's in free or pro commands regardless of dictionary for custom scripts
                if (inDict || window.freeCommands.includes(cmd) || window.proCommands.includes(cmd)) {
                    // Check if it's a PRO command
                    if (!window.freeCommands.includes(cmd)) {
                        if (!window.isProUser) {
                            output = t('sys_pro_required');
                        } else {
                            if (window.handleProCommand) {
                                output = window.handleProCommand(cmd, args);
                            } else {
                                output = `bash: ${cmd}: command is valid but not implemented in this simulator yet. \nCheck the 'Dictionary' tab for more info and examples!`;
                            }
                        }
                    } else {
                        output = `bash: ${cmd}: command is valid but not implemented in this simulator yet. \nCheck the 'Dictionary' tab for more info and examples!`;
                    }
                } else {
                    output = `bash: ${cmd}: command not found`;
                    if (window.audio) window.audio.playError();
                }
        }

        if (output) {
            const isHtml = ['share', 'upgrade'].includes(cmd);
            showOutput(output, '', isHtml);
        }

        if (output.includes('Permission denied') || output.includes('requires Licencia PRO') || output.toLowerCase().includes('error')) {
            if (window.audio) window.audio.playError();
        }

        // Mission Check
        if (missions[currentMissionIndex]) {
            missions[currentMissionIndex].check(cmd, args, output);
        }

        // Scroll to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function handleLogin(args) {
        return `
============================================================
           ✅ FULL ACCESS UNLOCKED: OPEN SOURCE EDITION
============================================================
Terminal Mastery Lab es 100% libre y gratuito.
Todos los comandos y misiones están desbloqueados de principio a fin.
============================================================`;
    }

    function handleUpgrade(args) {
        return `
============================================================
              🔥 TERMINAL MASTERY LAB (100% LIBRE & PRO) 🔥
============================================================
¡Todos los niveles y +170 comandos están desbloqueados de forma gratuita!
Puedes jugar todas las misiones de principio a fin.

¿Quieres apoyar el proyecto o necesitas consultoría DevOps / Web?
- Consultoría: <a href="https://alejandrobriz.es" target="_blank" style="color:var(--accent-secondary); text-decoration:underline;">alejandrobriz.es</a>
- Patrocinio: <a href="https://buymeacoffee.com/comeranas" target="_blank" style="color:var(--accent-primary); text-decoration:underline;">Buy Me a Coffee</a> / <a href="https://github.com/sponsors" target="_blank" style="color:var(--accent-primary); text-decoration:underline;">GitHub Sponsors</a>
============================================================`;
    }

    function handleSudo(args) {
        if (args.length > 0 && args[0] === 'su') {
            window.isRootUser = true;
            updatePrompt();
            return 'Switching to root user...';
        }
        return 'sudo: command not found or requires password';
    }

    function handleShare(args) {
        const url = encodeURIComponent('https://terminal.alejandrobriz.es');
        const text = encodeURIComponent(t('cmd_share_text'));

        return `
${t('cmd_share_title')}
- Twitter/X: <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" style="color:var(--accent-primary)">${t('cmd_share_click')}</a>
- Reddit: <a href="https://reddit.com/submit?url=${url}&title=${text}" target="_blank" style="color:var(--accent-primary)">${t('cmd_share_click')}</a>
`;
    }

    async function runEndingCinematic() {
        const inputContainer = document.getElementById('input-container');
        inputContainer.style.display = 'none'; // Lock terminal

        const lines = [
            { text: "============================================================", delay: 300, class: "warning-yellow" },
            { text: "🎉 ¡ENHORABUENA! HAS COMPLETADO TERMINAL MASTERY LAB 🎉", delay: 500, class: "accent-primary" },
            { text: "============================================================", delay: 300, class: "warning-yellow" },
            { text: "Has dominado desde los comandos básicos hasta la administración avanzada y DevOps.", delay: 600 },
            { text: "Tu rango oficial: ROOT MASTER SUPREMO.", delay: 500, class: "warning-yellow" },
            { text: "\n¿Necesitas consultoría en desarrollo web, DevOps o infraestructura Linux?", delay: 600 },
            { text: "Visita mi web: <a href=\"https://alejandrobriz.es\" target=\"_blank\" style=\"color:var(--accent-secondary); text-decoration:underline;\">alejandrobriz.es</a>", delay: 400, isHtml: true },
            { text: "Si este proyecto te ha gustado, puedes apoyarlo o invitar a un café:", delay: 400 },
            { text: "Buy Me a Coffee: <a href=\"https://buymeacoffee.com/comeranas\" target=\"_blank\" style=\"color:var(--accent-primary); text-decoration:underline;\">buymeacoffee.com/comeranas</a> | GitHub Sponsors: <a href=\"https://github.com/sponsors\" target=\"_blank\" style=\"color:var(--accent-primary); text-decoration:underline;\">github.com/sponsors</a>", delay: 400, isHtml: true },
            { text: "============================================================", delay: 300, class: "warning-yellow" }
        ];

        for (const line of lines) {
            await new Promise(r => setTimeout(r, line.delay));
            showOutput(line.text, line.class || '', line.isHtml || false);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        inputContainer.style.display = 'flex';
        cliInput.focus();
    }

    function handlePing(args) {
        if (args.length === 0) return 'ping: missing host operand';
        return `PING ${args[0]} (${args[0]}): 56 data bytes\n64 bytes from ${args[0]}: icmp_seq=0 ttl=117 time=14.2 ms\n64 bytes from ${args[0]}: icmp_seq=1 ttl=117 time=15.1 ms\n--- ${args[0]} ping statistics ---\n2 packets transmitted, 2 packets received, 0.0% packet loss`;
    }

    function handleCurl(args) {
        if (args.length === 0) return "curl: try 'curl --help' or 'curl --manual' for more information";
        if (args.includes('-I')) return `HTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\nServer: gws\nDate: ${new Date().toUTCString()}`;
        return `<!doctype html><html><body><h1>Success!</h1><p>Data from ${args[args.length - 1]}</p></body></html>`;
    }

    function handlePs(args) {
        return `USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  24328  4160 ?        Ss   00:00   0:02 /sbin/init\nroot       123  0.0  0.0  12345  1234 ?        Ss   00:00   0:00 sshd\nuser       555  0.0  0.2  45678  5678 pts/0    S    10:00   0:00 bash\nuser      9999 99.9 10.0 999999 99999 pts/0    R    11:00  99:99 ./rogue_miner`;
    }

    function handleKill(args) {
        if (args.length === 0) return 'kill: usage: kill [-s sigspec | -n signum | -sigspec] pid';
        const pid = args[args.length - 1];
        if (pid === '9999') return '[1]  + 9999 killed     ./rogue_miner';
        return `bash: kill: (${pid}) - No such process`;
    }

    function handleChmod(args) {
        if (args.length < 2) return 'chmod: missing operand';
        const file = args[1];
        const node = getPathNode(resolvePath(file));
        if (!node) return `chmod: cannot access '${file}': No such file or directory`;
        return '';
    }

    function showOutput(text, className = '', isHtml = false) {
        const line = document.createElement('div');
        line.className = 'output-line ' + (className ? className : 'output-line--content');
        if (isHtml) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        terminalBody.insertBefore(line, cliInput.parentElement);
    }

    function createDirectory(name) {
        if (!name) return 'mkdir: missing operand';
        const parent = getPathNode(currentPath);
        if (parent.children[name]) return `mkdir: cannot create directory '${name}': File exists`;
        parent.children[name] = { type: 'dir', children: {} };
        return '';
    }

    function createFile(name) {
        if (!name) return 'touch: missing file operand';
        const parent = getPathNode(currentPath);
        if (!parent.children[name]) {
            parent.children[name] = { type: 'file', content: '' };
        }
        return '';
    }

    function removeNode(name) {
        if (!name) return 'rm: missing operand';
        const parent = getPathNode(currentPath);
        if (!parent.children[name]) return `rm: cannot remove '${name}': No such file or directory`;
        delete parent.children[name];
        return '';
    }

    function moveNode(source, dest) {
        if (!source || !dest) return 'mv: missing destination file operand after source';
        const parentSrc = getPathNode(currentPath);
        const node = parentSrc.children[source];
        if (!node) return `mv: cannot stat '${source}': No such file or directory`;

        // Simulating move by delete and re-add in the same dir for simplicity
        // or a real path move if dest is a path
        if (dest.includes('/')) {
            const destParts = dest.split('/');
            const destName = destParts.pop();
            const parentDestPath = destParts.join('/') || '/';
            const parentDest = getPathNode(parentDestPath);
            if (!parentDest) return `mv: cannot move to '${dest}': Path does not exist`;
            parentDest.children[destName] = node;
        } else {
            parentSrc.children[dest] = node;
        }
        delete parentSrc.children[source];
        return '';
    }

    function copyNode(source, dest) {
        if (!source || !dest) return 'cp: missing destination file operand after source';
        const parentSrc = getPathNode(currentPath);
        const node = parentSrc.children[source];
        if (!node) return `cp: cannot stat '${source}': No such file or directory`;

        const newNode = JSON.parse(JSON.stringify(node)); // Deep clone
        if (dest.includes('/')) {
            const destParts = dest.split('/');
            const destName = destParts.pop();
            const parentDestPath = destParts.join('/') || '/';
            const parentDest = getPathNode(parentDestPath);
            if (!parentDest) return `cp: cannot copy to '${dest}': Path does not exist`;
            parentDest.children[destName] = newNode;
        } else {
            parentSrc.children[dest] = newNode;
        }
        return '';
    }

    function readPart(filename, type) {
        if (!filename) return `${type}: missing file operand`;
        const node = getPathNode(resolvePath(filename));
        if (!node || node.type !== 'file') return `${type}: ${filename}: No such file`;

        const lines = node.content.split('\n');
        if (type === 'head') return lines.slice(0, 5).join('\n');
        return lines.slice(-5).join('\n');
    }

    function handleNano(filename) {
        if (!filename) return 'nano: missing filename';
        isNanoActive = true;
        nanoTargetFile = filename;

        const nanoOverlay = document.getElementById('nano');
        const nanoTextarea = document.getElementById('nano-textarea');
        const nanoFilenameDisp = document.getElementById('nano-filename');

        nanoOverlay.style.display = 'flex';
        nanoFilenameDisp.textContent = filename;

        const node = getPathNode(resolvePath(filename));
        nanoTextarea.value = node ? node.content : '';
        nanoTextarea.focus();

        return ''; // Nano takes over UI
    }

    function exitNano(save = false) {
        if (save) {
            const content = document.getElementById('nano-textarea').value;
            const parent = getPathNode(currentPath);
            if (!parent.children[nanoTargetFile]) {
                parent.children[nanoTargetFile] = { type: 'file', content: content };
            } else {
                parent.children[nanoTargetFile].content = content;
            }
            showOutput(`[ Wrote content to ${nanoTargetFile} ]`, 'accent-primary');
        }

        document.getElementById('nano').style.display = 'none';
        isNanoActive = false;
        cliInput.focus();

        // Trigger mission check for nano
        missions[currentMissionIndex].check('nano', [nanoTargetFile]);
    }

    function handleGrep(args) {
        if (args.length < 2) return 'grep: usage: grep [pattern] [file]';
        const pattern = args[0];
        const filename = args[1];
        const node = getPathNode(resolvePath(filename));
        if (!node || node.type !== 'file') return `grep: ${filename}: No such file`;

        const lines = node.content.split('\n');
        const matches = lines.filter(l => l.includes(pattern));
        return matches.join('\n');
    }

    function listDirectory(path) {
        const dir = getPathNode(path);
        if (dir && dir.type === 'dir') {
            return Object.keys(dir.children).join('   ');
        }
        return `ls: cannot access '${path}': No such file or directory`;
    }

    function changeDirectory(target) {
        if (!target || target === '~') {
            currentPath = '/home/user';
            return '';
        }

        const newPath = resolvePath(target);
        const node = getPathNode(newPath);
        if (node && node.type === 'dir') {
            currentPath = newPath || '/';
            updatePrompt();
            return '';
        }
        return `cd: ${target}: No such directory`;
    }

    function readFile(filename) {
        if (!filename) return 'cat: missing file operand';
        const node = getPathNode(resolvePath(filename));
        if (node && node.type === 'file') {
            return node.content;
        }
        return `cat: ${filename}: No such file`;
    }

    function resolvePath(filename) {
        if (!filename) return currentPath;
        if (filename.startsWith('/')) return filename;
        if (filename.startsWith('~/')) return '/home/user/' + filename.substring(2);
        if (filename === '~') return '/home/user';

        let path = currentPath + '/' + filename;
        let parts = path.split('/').filter(p => p);
        let resolved = [];
        for (let p of parts) {
            if (p === '..') resolved.pop();
            else if (p !== '.') resolved.push(p);
        }
        return '/' + resolved.join('/');
    }

    function getPathNode(path) {
        const parts = path.split('/').filter(p => p);
        let current = vfs['/'];
        for (const part of parts) {
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        return current;
    }

    // Event listeners
    cliInput.addEventListener('keydown', (e) => {
        if (isNanoActive) return; // CLI disabled when nano is open

        if (e.key === 'Tab') {
            e.preventDefault();
            const val = cliInput.value;
            if (val && window.commandsData) {
                const matches = window.commandsData.filter(c => c.name.startsWith(val));
                if (matches.length === 1) {
                    cliInput.value = matches[0].name + ' ';
                } else if (matches.length > 1) {
                    showOutput(matches.map(m => m.name).join('  '));
                }
            }
            return;
        }

        if (e.key === 'Enter') {
            const input = cliInput.value;
            if (window.audio) { window.audio.init(); window.audio.playEnter(); }
            handleCommand(input);
            cliInput.value = '';
            historyIndex = history.length;
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                cliInput.value = history[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < history.length - 1) {
                historyIndex++;
                cliInput.value = history[historyIndex];
            } else {
                historyIndex = history.length;
                cliInput.value = '';
            }
        } else if (e.key.length === 1 && window.audio) {
            window.audio.init();
            window.audio.playTyping();
        }
    });

    // Global Keyboard Shortcuts (Nano & Modal)
    document.addEventListener('keydown', (e) => {
        if (isBriefingActive && e.key === 'Enter') {
            e.preventDefault();
            const btn = document.getElementById('btn-accept-mission');
            if (btn && btn.style.display !== 'none') {
                btn.click();
            }
            return;
        }

        if (!isNanoActive) return;

        if (e.ctrlKey && e.key === 'x') {
            e.preventDefault();
            exitNano();
        } else if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            exitNano(true);
        }
    });

    // Keep focus
    document.addEventListener('click', (e) => {
        // No robar el foco si el clic es en la sidebar, modal o si se está seleccionando texto
        if (e.target.closest('.sidebar') || e.target.closest('.modal-overlay')) return;
        if (window.getSelection().toString()) return;

        if (isNanoActive) {
            document.getElementById('nano-textarea').focus();
        } else {
            cliInput.focus();
        }
    });

    init();
});

// Matrix Effect
window.toggleMatrix = function () {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;

    if (canvas.classList.contains('active')) {
        canvas.classList.remove('active');
        if (window.matrixInterval) clearInterval(window.matrixInterval);
        return 'Matrix protocol deactivated.';
    }

    canvas.classList.add('active');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*'.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for (let x = 0; x < columns; x++) drops[x] = 1;

    if (window.matrixInterval) clearInterval(window.matrixInterval);
    window.matrixInterval = setInterval(() => {
        ctx.fillStyle = 'rgba(13, 17, 23, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff9f';
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    return 'Matrix protocol activated. The system is watching.';
};

// Glitch Effect
window.triggerGlitch = function (duration = 2000) {
    document.body.classList.add('glitch-active');
    setTimeout(() => {
        document.body.classList.remove('glitch-active');
    }, duration);
};
