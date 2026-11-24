window.apprenticeMissions = [
        {
            id: 'm1',
            titleKey: 'm1_title',
            descKey: 'm1_desc',
            objectives: [
                { id: 'pwd', textKey: 'm1_o1', completed: false },
                { id: 'ls', textKey: 'm1_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'pwd') mission.objectives[0].completed = true;
                if (cmd === 'ls') mission.objectives[1].completed = true;
                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) {
                    if (window.nextMissionGlobal) window.nextMissionGlobal();
                }
            }
        },
        {
            id: 'm1b',
            title: 'System Identity',
            objectives: [
                { id: 'whoami', textKey: 'm1b_o1', completed: false },
                { id: 'uname', textKey: 'm1b_o2', completed: false },
                { id: 'date', textKey: 'm1b_o3', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'whoami') mission.objectives[0].completed = true;
                if (cmd === 'uname') mission.objectives[1].completed = true;
                if (cmd === 'date') mission.objectives[2].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm1c',
            titleKey: 'm1c_title',
            descKey: 'm1c_desc',
            objectives: [
                { id: 'cd_var', textKey: 'm1c_o1', completed: false },
                { id: 'cd_home', textKey: 'm1c_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'cd' && args[0] === '/var/log') mission.objectives[0].completed = true;
                if (cmd === 'cd' && (args[0] === '~' || !args[0])) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm1d',
            titleKey: 'm1d_title',
            descKey: 'm1d_desc',
            objectives: [
                { id: 'find', textKey: 'm1d_o1', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'find' && args.includes('-name') && args.includes('"flag.txt"')) mission.objectives[0].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm1e',
            titleKey: 'm1e_title',
            descKey: 'm1e_desc',
            objectives: [
                { id: 'free', textKey: 'm1e_o1', completed: false },
                { id: 'top', textKey: 'm1e_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'free' && args.includes('-m')) mission.objectives[0].completed = true;
                if (cmd === 'top') mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm1f',
            titleKey: 'm1f_title',
            descKey: 'm1f_desc',
            objectives: [
                { id: 'tar', textKey: 'm1f_o1', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'tar' && args.includes('-czf') && args.includes('backup.tar.gz')) mission.objectives[0].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm1g',
            titleKey: 'm1g_title',
            descKey: 'm1g_desc',
            objectives: [
                { id: 'export', textKey: 'm1g_o1', completed: false },
                { id: 'echo', textKey: 'm1g_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'export' && args[0] && args[0].includes('TARGET=')) mission.objectives[0].completed = true;
                if (cmd === 'echo' && args.includes('$TARGET')) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm2',
            titleKey: 'm2_title',
            descKey: 'm2_desc',
            objectives: [
                { id: 'mkdir', textKey: 'm2_o1', completed: false },
                { id: 'touch', textKey: 'm2_o2', completed: false },
                { id: 'nano', textKey: 'm2_o3', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];

                // Check mkdir
                const labNode = window.getPathNodeGlobal('/home/user/lab');
                if (labNode && labNode.type === 'dir') mission.objectives[0].completed = true;

                // Check touch
                const solutionNode = window.getPathNodeGlobal('/home/user/lab/solution.txt');
                if (solutionNode && solutionNode.type === 'file') mission.objectives[1].completed = true;

                // Check content
                if (solutionNode && solutionNode.content && solutionNode.content.includes('SUCCESS')) {
                    mission.objectives[2].completed = true;
                }

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) {
                    if (window.nextMissionGlobal) window.nextMissionGlobal();
                }
            }
        },
        {
            id: 'm2b',
            titleKey: 'm2b_title',
            descKey: 'm2b_desc',
            objectives: [
                { id: 'mv', textKey: 'm2b_o1', completed: false },
                { id: 'rm', textKey: 'm2b_o2', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'mv' && args.includes('solution.txt') && args.includes('backup.txt') && (!output || !output.includes('No such file'))) mission.objectives[0].completed = true;
                if (cmd === 'rm' && args.includes('backup.txt') && (!output || !output.includes('No such file'))) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm2c',
            titleKey: 'm2c_title',
            descKey: 'm2c_desc',
            objectives: [
                { id: 'cat', textKey: 'm2c_o1', completed: false },
                { id: 'head', textKey: 'm2c_o2', completed: false },
                { id: 'tail', textKey: 'm2c_o3', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'cat' && args.includes('readme.txt') && (!output || !output.includes('No such file'))) mission.objectives[0].completed = true;
                if (cmd === 'head' && args[0] && args[0].includes('auth.log') && (!output || !output.includes('No such file'))) mission.objectives[1].completed = true;
                if (cmd === 'tail' && args[0] && args[0].includes('auth.log') && (!output || !output.includes('No such file'))) mission.objectives[2].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm3',
            titleKey: 'm3_title',
            descKey: 'm3_desc',
            objectives: [
                { id: 'cd', textKey: 'm3_o1', completed: false },
                { id: 'grep', textKey: 'm3_o2', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'cd' && window.getCurrentPathGlobal() === "/var/log") mission.objectives[0].completed = true;
                if (cmd === 'grep' && args.includes('Accepted') && args.includes('auth.log') && (!output || !output.includes('No such file'))) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) {
                    if (window.nextMissionGlobal) window.nextMissionGlobal();
                }
            }
        },
        {
            id: 'm3b',
            titleKey: 'm3b_title',
            descKey: 'm3b_desc',
            objectives: [
                { id: 'history', textKey: 'm3b_o1', completed: false },
                { id: 'clear', textKey: 'm3b_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'history') mission.objectives[0].completed = true;
                if (cmd === 'clear') mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm4',
            titleKey: 'm4_title',
            descKey: 'm4_desc',
            objectives: [
                { id: 'ping', textKey: 'm4_o1', completed: false },
                { id: 'curl', textKey: 'm4_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'ping' && args[0] === 'localhost') mission.objectives[0].completed = true;
                if (cmd === 'curl' && args.includes('-I')) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm5',
            titleKey: 'm5_title',
            descKey: 'm5_desc',
            objectives: [
                { id: 'ps', textKey: 'm5_o1', completed: false },
                { id: 'kill', textKey: 'm5_o2', completed: false }
            ],
            check: (cmd, args) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'ps') mission.objectives[0].completed = true;
                if (cmd === 'kill' && args.includes('9999')) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm6',
            titleKey: 'm6_title',
            descKey: 'm6_desc',
            objectives: [
                { id: 'chmod', textKey: 'm6_o1', completed: false },
                { id: 'execute', textKey: 'm6_o2', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'chmod' && args.includes('+x') && args.includes('script.sh') && (!output || !output.includes('No such file'))) mission.objectives[0].completed = true;
                if (cmd === './script.sh' && (!output || !output.includes('No such file'))) mission.objectives[1].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) {
                    if (window.showOutputGlobal) window.showOutputGlobal('ALL ADVANCED MISSIONS COMPLETE. You are a True Shell Hacker!', 'accent-primary');
                    if (window.nextMissionGlobal) window.nextMissionGlobal();
                }
            }
        },
        {
            id: 'm7',
            titleKey: 'm7_title',
            descKey: 'm7_desc',
            objectives: [
                { id: 'share', textKey: 'm7_o1', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                if (cmd === 'share') mission.objectives[0].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                if (mission.objectives.every(o => o.completed)) if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        },
        {
            id: 'm8',
            titleKey: 'm8_title',
            descKey: 'm8_desc',
            objectives: [
                { id: 'sudo', textKey: 'm8_o1', completed: false }
            ],
            check: (cmd, args, output) => {
                const mission = window.missionsRef[window.currentMissionIndexRef.value];
                const wasCompleted = mission.objectives[0].completed;
                
                if (cmd === 'sudo' && args.includes('su')) mission.objectives[0].completed = true;

                if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
                
                if (!wasCompleted && mission.objectives.every(o => o.completed)) {
                    if (window.showOutputGlobal) window.showOutputGlobal('ROOT ACCESS GRANTED. Initializing advanced missions...', 'warning-yellow');
                    setTimeout(() => {
                        if (window.nextMissionGlobal) window.nextMissionGlobal();
                    }, 1500);
                }
            }
        }
    ];
