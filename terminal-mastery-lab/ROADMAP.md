# 🗺️ Terminal Mastery Lab — Roadmap & Evolution Plan

This document outlines the current state of **Terminal Mastery Lab**, the future vision for the simulator, and the prioritized areas where community contributions are most welcome.

---

## 🌐 English

### 📍 1. Current State (v1.0 — 100% Free & Open Source)
- [x] In-memory Virtual File System (VFS) terminal engine.
- [x] 170+ implemented and documented commands (Core, Networking, DevOps, SysAdmin, Hacking).
- [x] 67 interactive missions unlocked from start to finish (17 Apprentice + 50 PRO).
- [x] Fully decoupled level architecture in `/levels` for easy community contribution.
- [x] Interactive in-terminal `nano` text editor.
- [x] Guided boss briefing dialogues ("Head of IT" modal transmissions).
- [x] Complete bilingual support (English / Spanish).
- [x] Retro CRT mode, Matrix canvas background, and Web Audio API synthesized sound effects.

### 🚀 2. Future Vision & Roadmap

#### Phase 1: Advanced Shell Pipeline & UX
- **Real Pipes & Redirections**: Support command chaining (`cat file.txt | grep error | wc -l` and `echo "line" >> file.txt`).
- **Context-Aware Tab Completion**: Auto-complete not only command names, but also relative and absolute filesystem paths.
- **Interactive `man <command>` pages**: Rich in-terminal manual reference with cheat-sheets.

#### Phase 2: Specialized Interactive Labs
- **Visual Git Playground**: Visual branching tree simulator (`git branch`, `git checkout -b`, `git merge`, `git rebase`).
- **DevOps & Containers Lab**: Interactive debugging scenarios for `docker-compose` stacks and `kubectl` cluster pods.
- **Cybersecurity CTF**: Capture The Flag challenges with cryptographic clues hidden inside the VFS.

#### Phase 3: Platform & Community Tooling
- **In-Browser Level Creator**: Web UI / visual form to draft custom missions and export clean JS definitions without manual coding.
- **Progress Export/Import**: Save game state to a portable JSON file to sync across devices.

### 🤝 3. Where We Need Help (How to Contribute)

If you'd like to help build the best browser-based terminal simulator, here are high-impact areas:

1. **New Mission Packs**:
   - Create topical challenges in `/levels` (e.g., regex with `grep`/`sed`/`awk`, bash loops, user privilege management).
2. **Parser Robustness**:
   - Improve flag/argument parsing order flexibility in `script.js` and `pro-commands.js`.
3. **Internationalization (i18n)**:
   - Add new language translations (French, German, Portuguese, etc.) in `translations.js`.
4. **Automated Testing**:
   - Add automated integration tests (e.g., Vitest / Jest) to verify all 67 missions pass their check conditions.

---

## 🇪🇸 Español

### 📍 1. Estado Actual (v1.0 — 100% Libre y de Código Abierto)
- [x] Motor de terminal con Sistema de Archivos Virtual (VFS) en memoria.
- [x] +170 comandos documentados e implementados (Core, Redes, DevOps, SysAdmin, Hacking).
- [x] 67 niveles interactivos liberados de principio a fin (17 Aprendiz + 50 PRO).
- [x] Arquitectura de niveles totalmente desacoplada en `/levels` para facilitar colaboraciones.
- [x] Editor de texto `nano` interactivo integrado dentro de la terminal.
- [x] Sistema de misiones guiado con "Head of IT" (transmisiones y diálogos tipo jefe).
- [x] Soporte bilingüe completo (Inglés / Español).
- [x] Modo retro CRT con scanlines, fondo animado Matrix y efectos de sonido con Web Audio API.

### 🚀 2. Hacia Dónde Queremos Llegar (Roadmap Futuro)

#### Fase 1: Pipeline y Shell Avanzado
- **Pipes y Redirecciones Reales**: Soportar encadenamiento de comandos (`cat file.txt | grep error | wc -l` y `echo "line" >> file.txt`).
- **Autocompletado Inteligente con Tab**: Completar tanto nombres de comandos como rutas relativas y absolutas del sistema de archivos.
- **Páginas `man <comando>` interactivas**: Manuales y chuletas rápidas integradas dentro de la propia consola.

#### Fase 2: Laboratorios Temáticos Especializados
- **Git Playground Visual**: Simulador visual del árbol de ramas (`git branch`, `git checkout -b`, `git merge`, `git rebase`).
- **Laboratorio DevOps y Contenedores**: Escenarios interactivos de depuración de pilas `docker-compose` y pods de `kubectl`.
- **CTF de Ciberseguridad**: Retos de captura de bandera con pistas criptográficas dentro del VFS.

#### Fase 3: Plataforma y Comunidad
- **Creador de Niveles Web**: Interfaz gráfica o formulario para diseñar misiones y exportarlas en JS limpio sin tocar el código fuente.
- **Exportación e Importación de Progreso**: Guardar el progreso en un archivo JSON para sincronizarlo entre dispositivos.

### 🤝 3. ¿En qué Necesitamos Ayuda? (Cómo Colaborar)

Si quieres participar en el proyecto, estas son las tareas abiertas con mayor impacto:

1. **Nuevos Paquetes de Misiones**:
   - Crear paquetes temáticos en `/levels` (ej: expresiones regulares con `sed`/`awk`, bucles bash, permisos avanzados).
2. **Robustez del Parser de Comandos**:
   - Mejorar la tolerancia a flags y argumentos en diferentes órdenes en `script.js` y `pro-commands.js`.
3. **Internacionalización (i18n)**:
   - Añadir traducciones a nuevos idiomas (Francés, Alemán, Portugués, etc.) en `translations.js`.
4. **Tests Automatizados**:
   - Añadir tests unitarios/e2e para comprobar de forma continua que los 67 niveles se resuelven correctamente.

---

¿Tienes una idea o propuesta? Abre una **Issue** o envía una **Pull Request**. ¡Toda contribución es bienvenida!
