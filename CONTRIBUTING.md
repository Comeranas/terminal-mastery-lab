# Contributing to Terminal Mastery Lab ⚡

First off, thank you for considering contributing to **Terminal Mastery Lab**! Our mission is to give students, young learners, and aspiring developers a 100% free, interactive, and fun way to master the Linux/Unix shell right in their browser.

Whether you are a seasoned DevOps engineer, a teacher, or a student making your very first Open Source Pull Request, **you are welcome here!**

---

## 🎯 Ways You Can Help

We are actively looking for community contributions in the following areas:

1. **🎮 New Missions & Story Levels:** Design engaging challenges (e.g., *Server Rescue*, *Cyber-Detective*, *Git & DevOps Basics*, *Permissions & Security*).
2. **⚡ New Linux/Unix Commands:** Expand `commands.json` with more flags, realistic outputs, and helpful beginner hints.
3. **🌍 Translations (i18n):** Help translate missions, hints, and UI text into Spanish, French, German, Portuguese, and other languages.
4. **🏆 Gamification & Audio:** Improve sound effects (`audio.js`), XP systems, achievements, or visual feedback.
5. **🐛 Bug Fixes & Edge Cases:** Report or fix simulator behavior when chaining pipes (`|`), redirections (`>`, `>>`), or flags.

---

## 🚀 Quick Start (Local Setup)

This project runs natively in the browser with zero heavy build steps:

1. **Fork** this repository (click the `Fork` button at the top right).
2. **Clone** your fork locally:
   ```bash
   git clone [https://github.com/YOUR-USERNAME/terminal-mastery-lab.git](https://github.com/YOUR-USERNAME/terminal-mastery-lab.git)
   cd terminal-mastery-lab
   
Run it locally: Open index.html with a local static server (such as VS Code Live Server, npx serve ., or python3 -m http.server 8080).

Create a new branch for your feature or fix:

Bash
git checkout -b feat/new-linux-mission
🛠️ How to Add Commands or Levels
Adding Commands: Check commands.json in the root directory. Follow the existing JSON schema to define the command name, description, supported flags, and simulated output.

Proposing New Levels: Not sure how to wire up a full level in code? Open an Issue or Discussion with your mission storyline, target commands, and win condition, and we will help integrate it!

📬 Submitting a Pull Request (PR)
Test your changes in the browser (check both beginner and advanced modes).

Commit your changes with a clear message:

Bash
git commit -m "feat: add chmod and chown interactive mission"
Push to your fork and open a Pull Request against the main branch.

Describe what your PR adds or fixes—and if it resolves an open Issue, mention Closes #<issue-number>.

💬 Need Ideas or Help?
Check out the Issues tab and look for tasks labeled good first issue or help wanted, or check ROADMAP.md to see what is coming next!
