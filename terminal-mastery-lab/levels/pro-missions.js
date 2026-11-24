window.proMissions = [
    {
        id: 'm9',
        titleKey: 'm9_title',
        descKey: 'm9_desc',
        objectives: [
            { id: 'nmap', textKey: 'm9_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'nmap' && args.includes('192.168.1.50')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm10',
        titleKey: 'm10_title',
        descKey: 'm10_desc',
        objectives: [
            { id: 'ssh', textKey: 'm10_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ssh' && args[0] === 'root@192.168.1.50') mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm11',
        titleKey: 'm11_title',
        descKey: 'm11_desc',
        objectives: [
            { id: 'obj_m11', textKey: 'm11_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'docker' && args[0] === 'run' && args.includes('nginx')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm12',
        titleKey: 'm12_title',
        descKey: 'm12_desc',
        objectives: [
            { id: 'obj_m12', textKey: 'm12_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'git' && args[0] === 'commit') mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm13',
        titleKey: 'm13_title',
        descKey: 'm13_desc',
        objectives: [
            { id: 'obj_m13', textKey: 'm13_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ufw' && args[0] === 'deny' && args.includes('22/tcp')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm14',
        titleKey: 'm14_title',
        descKey: 'm14_desc',
        objectives: [
            { id: 'obj_m14', textKey: 'm14_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'mysql' && args.includes('root') && args.includes('-p')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm15',
        titleKey: 'm15_title',
        descKey: 'm15_desc',
        objectives: [
            { id: 'obj_m15', textKey: 'm15_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'tar' && args.includes('backup.tar.gz') && args.includes('/var/log')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm16',
        titleKey: 'm16_title',
        descKey: 'm16_desc',
        objectives: [
            { id: 'obj_m16', textKey: 'm16_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'crontab' && args.includes('-e')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm17',
        titleKey: 'm17_title',
        descKey: 'm17_desc',
        objectives: [
            { id: 'obj_m17', textKey: 'm17_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'tcpdump' && args.includes('-i') && args.includes('eth0')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm18',
        titleKey: 'm18_title',
        descKey: 'm18_desc',
        objectives: [
            { id: 'obj_m18', textKey: 'm18_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === './exploit') mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm19',
        titleKey: 'm19_title',
        descKey: 'm19_desc',
        objectives: [
            { id: 'obj_m19', textKey: 'm19_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'shred' && args.includes('-u') && args.includes('exploit.c')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm20',
        titleKey: 'm20_title',
        descKey: 'm20_desc',
        objectives: [
            { id: 'obj_m20', textKey: 'm20_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'hydra' && args.includes('-l') && args.includes('admin')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm21',
        titleKey: 'm21_title',
        descKey: 'm21_desc',
        objectives: [
            { id: 'obj_m21', textKey: 'm21_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'nc' && args.includes('-lvnp') && args.includes('4444')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm22',
        titleKey: 'm22_title',
        descKey: 'm22_desc',
        objectives: [
            { id: 'obj_m22', textKey: 'm22_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'curl' && args.includes('-X') && args.includes('POST')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm23',
        titleKey: 'm23_title',
        descKey: 'm23_desc',
        objectives: [
            { id: 'obj_m23', textKey: 'm23_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'proxychains' && args.includes('curl') && args.includes('http://hidden.onion')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm24',
        titleKey: 'm24_title',
        descKey: 'm24_desc',
        objectives: [
            { id: 'obj_m24', textKey: 'm24_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'certbot' && args.includes('--nginx') && args.includes('-d') && args.includes('hacker.com')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm25',
        titleKey: 'm25_title',
        descKey: 'm25_desc',
        objectives: [
            { id: 'obj_m25', textKey: 'm25_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'nmap' && args.includes('--script') && args.includes('vuln') && args.includes('192.168.1.50')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm26',
        titleKey: 'm26_title',
        descKey: 'm26_desc',
        objectives: [
            { id: 'obj_m26', textKey: 'm26_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ssh' && args.includes('-L') && args.includes('8080:localhost:80')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm27',
        titleKey: 'm27_title',
        descKey: 'm27_desc',
        objectives: [
            { id: 'obj_m27', textKey: 'm27_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ssh' && args.includes('-D') && args.includes('9050')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed) && window.nextMissionGlobal) window.nextMissionGlobal();
        }
    },
    {
        id: 'm28',
        titleKey: 'm28_title',
        descKey: 'm28_desc',
        objectives: [
            { id: 'obj_m28', textKey: 'm28_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ssh' && args.includes('-R') && args.includes('80:localhost:8080')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm29',
        titleKey: 'm29_title',
        descKey: 'm29_desc',
        objectives: [
            { id: 'obj_m29', textKey: 'm29_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'dig' && args.includes('hacker.com')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm30',
        titleKey: 'm30_title',
        descKey: 'm30_desc',
        objectives: [
            { id: 'obj_m30', textKey: 'm30_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'nginx' && args.includes('-t')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm31',
        titleKey: 'm31_title',
        descKey: 'm31_desc',
        objectives: [
            { id: 'obj_m31', textKey: 'm31_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'fdisk' && args.includes('-l')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm32',
        titleKey: 'm32_title',
        descKey: 'm32_desc',
        objectives: [
            { id: 'obj_m32', textKey: 'm32_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'systemctl' && args.includes('status') && args.includes('custom-daemon.service')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm33',
        titleKey: 'm33_title',
        descKey: 'm33_desc',
        objectives: [
            { id: 'obj_m33', textKey: 'm33_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'apt' && args.includes('install') && args.includes('htop')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm34',
        titleKey: 'm34_title',
        descKey: 'm34_desc',
        objectives: [
            { id: 'obj_m34', textKey: 'm34_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'visudo') mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm35',
        titleKey: 'm35_title',
        descKey: 'm35_desc',
        objectives: [
            { id: 'obj_m35', textKey: 'm35_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'tcpdump' && args.includes('-i') && args.includes('eth0') && args.includes('-w') && args.includes('capture.pcap')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm36',
        titleKey: 'm36_title',
        descKey: 'm36_desc',
        objectives: [
            { id: 'obj_m36', textKey: 'm36_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'ip' && args.includes('route')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm37',
        titleKey: 'm37_title',
        descKey: 'm37_desc',
        objectives: [
            { id: 'obj_m37', textKey: 'm37_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'iptables' && args.includes('-L')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm38',
        titleKey: 'm38_title',
        descKey: 'm38_desc',
        objectives: [
            { id: 'obj_m38', textKey: 'm38_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'fail2ban' && args.includes('status')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm39',
        titleKey: 'm39_title',
        descKey: 'm39_desc',
        objectives: [
            { id: 'obj_m39', textKey: 'm39_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'wg' && args.includes('show')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm40',
        titleKey: 'm40_title',
        descKey: 'm40_desc',
        objectives: [
            { id: 'obj_m40', textKey: 'm40_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'haproxy' && args.includes('-c') && args.includes('-f') && args.includes('/etc/haproxy/haproxy.cfg')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm41',
        titleKey: 'm41_title',
        descKey: 'm41_desc',
        objectives: [
            { id: 'obj_m41', textKey: 'm41_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'logrotate' && args.includes('-f') && args.includes('/etc/logrotate.conf')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm42',
        titleKey: 'm42_title',
        descKey: 'm42_desc',
        objectives: [
            { id: 'obj_m42', textKey: 'm42_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'vmstat' && args.includes('1') && args.includes('5')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm43',
        titleKey: 'm43_title',
        descKey: 'm43_desc',
        objectives: [
            { id: 'obj_m43', textKey: 'm43_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'curl' && args.includes('localhost:9100/metrics')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm44',
        titleKey: 'm44_title',
        descKey: 'm44_desc',
        objectives: [
            { id: 'obj_m44', textKey: 'm44_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'valgrind' && args.includes('./leak_test')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm45',
        titleKey: 'm45_title',
        descKey: 'm45_desc',
        objectives: [
            { id: 'obj_m45', textKey: 'm45_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'auditd' && args.includes('-l')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm46',
        titleKey: 'm46_title',
        descKey: 'm46_desc',
        objectives: [
            { id: 'obj_m46', textKey: 'm46_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'docker-compose' && args.includes('up') && args.includes('-d')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm47',
        titleKey: 'm47_title',
        descKey: 'm47_desc',
        objectives: [
            { id: 'obj_m47', textKey: 'm47_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'kubectl' && args.includes('get') && args.includes('pods')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm48',
        titleKey: 'm48_title',
        descKey: 'm48_desc',
        objectives: [
            { id: 'obj_m48', textKey: 'm48_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'terraform' && args.includes('apply')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm49',
        titleKey: 'm49_title',
        descKey: 'm49_desc',
        objectives: [
            { id: 'obj_m49', textKey: 'm49_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'gitlab-runner' && args.includes('exec') && args.includes('docker') && args.includes('test')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm50',
        titleKey: 'm50_title',
        descKey: 'm50_desc',
        objectives: [
            { id: 'obj_m50', textKey: 'm50_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'docker' && args.includes('tag') && args.includes('app') && args.includes('registry.local/app')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm51',
        titleKey: 'm51_title',
        descKey: 'm51_desc',
        objectives: [
            { id: 'obj_m51', textKey: 'm51_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'sshd' && args.includes('-t')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm52',
        titleKey: 'm52_title',
        descKey: 'm52_desc',
        objectives: [
            { id: 'obj_m52', textKey: 'm52_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'sysctl' && args.includes('-p')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm53',
        titleKey: 'm53_title',
        descKey: 'm53_desc',
        objectives: [
            { id: 'obj_m53', textKey: 'm53_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'apparmor_status') mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm54',
        titleKey: 'm54_title',
        descKey: 'm54_desc',
        objectives: [
            { id: 'obj_m54', textKey: 'm54_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'gpg' && args.includes('--gen-key')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm55',
        titleKey: 'm55_title',
        descKey: 'm55_desc',
        objectives: [
            { id: 'obj_m55', textKey: 'm55_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'rsync' && args.includes('-avz') && args.includes('/data') && args.includes('backup/')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm56',
        titleKey: 'm56_title',
        descKey: 'm56_desc',
        objectives: [
            { id: 'obj_m56', textKey: 'm56_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'mdadm' && args.includes('--create')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm57',
        titleKey: 'm57_title',
        descKey: 'm57_desc',
        objectives: [
            { id: 'obj_m57', textKey: 'm57_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'btrfs' && args.includes('subvolume') && args.includes('snapshot')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    },
    {
        id: 'm58',
        titleKey: 'm58_title',
        descKey: 'm58_desc',
        objectives: [
            { id: 'obj_m58', textKey: 'm58_o1', completed: false }
        ],
        check: (cmd, args, output) => {
            const mission = window.missionsRef[window.currentMissionIndexRef.value];
            if (cmd === 'keepalived' && args.includes('-t')) mission.objectives[0].completed = true;
            
            if (window.updateObjectivesGlobal) window.updateObjectivesGlobal();
            if (mission.objectives.every(o => o.completed)) {
                if (window.nextMissionGlobal) window.nextMissionGlobal();
            }
        }
    }];

window.proMissionDescs = {
    'm9': 'El escaneo de puertos revela las debilidades. Úsalo sabiamente con nmap.',
    'm10': 'La puerta está abierta. Entra en el servidor remoto para tomar el control.',
    'm11': 'Los contenedores son el corazón de la nube. Toma el control de la infraestructura Docker.',
    'm12': 'El control de versiones es vital. Sube el parche crítico a producción usando Git.',
    'm13': 'El servidor está bajo ataque. Cierra la puerta principal con el firewall.',
    'm14': 'Los atacantes han entrado a la base de datos. Analiza el daño provocado.',
    'm15': 'Conserva las pruebas del ataque para el equipo forense. Empaqueta los logs.',
    'm16': 'Asegura las defensas para que no vuelva a ocurrir, programa la tarea.',
    'm17': 'Analiza el flujo de datos para encontrar a los atacantes en tiempo real con tcpdump.',
    'm18': 'Si no puedes defender, ataca. Compila y ejecuta el exploit para tomar el control de la red botnet.',
    'm19': 'Un buen hacker nunca deja rastro. Borra los archivos de forma segura y limpia el historial.',
    'm20': 'El acceso directo está bloqueado. Usa hydra para romper la contraseña con fuerza bruta.',
    'm21': 'Asegura tu persistencia en el sistema abriendo una puerta trasera con netcat.',
    'm22': 'Extrae la información sensible y envíala a tu servidor seguro antes de que te descubran.',
    'm23': 'El anonimato es tu mayor arma. Usa proxychains para enrutar el tráfico a través de nodos seguros de la red Tor.',
    'm24': 'Los navegadores modernos bloquean sitios sin HTTPS. Genera un certificado válido con certbot para evadir las alertas.',
    'm25': 'Lleva el reconocimiento al siguiente nivel. Utiliza scripts avanzados de nmap para encontrar vulnerabilidades explotables de forma automatizada.',
    'm26': 'Los cortafuegos bloquean puertos, pero SSH te permite atravesarlos. Crea un túnel local para acceder al panel de control interno.',
    'm27': 'Convierte el servidor comprometido en tu propio proxy SOCKS. Así podrás navegar como si estuvieras dentro de su red.',
    'm28': 'No tienes IP pública pero necesitas recibir conexiones. Usa un túnel inverso (Remote Forwarding) para exponer tu servicio local a internet.'
};
