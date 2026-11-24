window.handleProCommand = function(cmd, args) {
    switch (cmd) {
        case 'nmap':
            return handleNmap(args);
        case 'ssh':
            return handleSsh(args);
        case 'docker':
            return handleDocker(args);
        case 'git':
            return handleGit(args);
        case 'ufw':
            return handleUfw(args);
        case 'mysql':
            return handleMysql(args);
        case 'tar':
            return handleTar(args);
        case 'crontab':
            return handleCrontab(args);
        case 'tcpdump':
            return handleTcpdump(args);
        case 'gcc':
            return handleGcc(args);
        case './exploit':
            return handleExploit(args);
        case 'shred':
            return handleShred(args);
        case 'hydra':
            return handleHydra(args);
        case 'nc':
            return handleNc(args);
        case 'proxychains':
            return handleProxychains(args);
        case 'certbot':
            return handleCertbot(args);
                case 'dig':
            return handleDig(args);
        case 'nslookup':
            return handleNslookup(args);
        case 'nginx':
            return handleNginx(args);
        case 'apache2':
            return handleApache2(args);
        case 'fdisk':
            return handleFdisk(args);
        case 'mkfs':
            return handleMkfs(args);
        case 'mount':
            return handleMount(args);
        case 'lvm':
            return handleLvm(args);
        case 'systemctl':
            return handleSystemctl(args);
        case 'journalctl':
            return handleJournalctl(args);
        case 'apt':
            return handleApt(args);
        case 'dpkg':
            return handleDpkg(args);
        case 'yum':
            return handleYum(args);
        case 'useradd':
            return handleUseradd(args);
        case 'usermod':
            return handleUsermod(args);
        case 'visudo':
            return handleVisudo(args);
        case 'iptables':
            return handleIptables(args);
        case 'nftables':
            return handleNftables(args);
        case 'ip':
            return handleIp(args);
        case 'traceroute':
            return handleTraceroute(args);
        case 'mtr':
            return handleMtr(args);
        case 'fail2ban':
            return handleFail2ban(args);
        case 'haproxy':
            return handleHaproxy(args);
        case 'rsyslog':
            return handleRsyslog(args);
        case 'logrotate':
            return handleLogrotate(args);
        case 'vmstat':
            return handleVmstat(args);
        case 'ss':
            return handleSs(args);
        case 'dstat':
            return handleDstat(args);
        case 'valgrind':
            return handleValgrind(args);
        case 'auditd':
            return handleAuditd(args);
        case 'inotifywait':
            return handleInotifywait(args);
        case 'kubectl':
            return handleKubectl(args);
        case 'terraform':
            return handleTerraform(args);
        case 'rclone':
            return handleRclone(args);
        case 'mdadm':
            return handleMdadm(args);
        case 'btrfs':
            return handleBtrfs(args);
        case 'keepalived':
            return handleKeepalived(args);
default:
            return `bash: ${cmd}: command is valid but not implemented in this version.`;
    }
}

function handleNmap(args) {
    if (args.length === 0) return 'nmap: missing target specification';
    
    if (args.includes('--script') && args.includes('vuln')) {
        const target = args[args.length - 1];
        return `Starting Nmap 7.92 ( https://nmap.org ) at ${new Date().toISOString()}\nNmap scan report for ${target}\nHost is up (0.012s latency).\nNot shown: 996 closed tcp ports (conn-refused)\nPORT    STATE SERVICE\n22/tcp  open  ssh\n80/tcp  open  http\n|_http-enum: /admin/ (401 Unauthorized)\n|_http-vuln-cve2017-1001000: VULNERABLE\n443/tcp open  https\n|_ssl-heartbleed: VULNERABLE (CVE-2014-0160)\n\nNmap done: 1 IP address (1 host up) scanned in 15.42 seconds`;
    }

    const target = args[0];
    return `Starting Nmap 7.92 ( https://nmap.org ) at ${new Date().toISOString()}
Nmap scan report for ${target}
Host is up (0.045s latency).
Not shown: 996 closed tcp ports (conn-refused)
PORT    STATE SERVICE
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds`;
}

function handleSsh(args) {
    if (args.length === 0) return 'usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] destination [command]';
    
    let tunnelMsg = '';
    if (args.includes('-L')) tunnelMsg = '[*] Local Port Forwarding active: Tunneling local port to remote destination.\n';
    if (args.includes('-D')) tunnelMsg = '[*] Dynamic Port Forwarding (SOCKS) active on specified port.\n';
    if (args.includes('-R')) tunnelMsg = '[*] Remote Port Forwarding active: Exposing local port to remote network.\n';

    // Simulate changing prompt
    const target = args[args.length - 1];
    let user = 'root';
    let host = target;
    if (target.includes('@')) {
        const parts = target.split('@');
        user = parts[0];
        host = parts[1];
    }
    
    window.sshSessionActive = true;
    window.sshPromptText = `<span style="color:#ff3366">${user}@${host}</span>:<span style="color:#3388ff">~</span>$`;
    
    if (window.updatePromptGlobal) window.updatePromptGlobal();
    
    return `${tunnelMsg}Warning: Permanently added '${host}' (ECDSA) to the list of known hosts.
Welcome to Ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-100-generic x86_64)`;
}

function handleDocker(args) {
    if (args.length === 0) return 'Usage:  docker [OPTIONS] COMMAND\n\nA self-sufficient runtime for containers';
    const subcmd = args[0];
    if (subcmd === 'ps') {
        return `CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                       NAMES
d9b1c2e3f4a5   nginx     "/docker-entrypoint.…"   15 minutes ago   Up 15 minutes   0.0.0.0:80->80/tcp, :::80->80/tcp           web-server`;
    }
    if (subcmd === 'run') {
        return `Unable to find image '${args[1] || 'ubuntu'}:latest' locally
latest: Pulling from library/${args[1] || 'ubuntu'}
Digest: sha256:abcd1234efgh5678ijkl9012
Status: Downloaded newer image for ${args[1] || 'ubuntu'}:latest
Container started successfully.`;
    }
    return `docker: '${subcmd}' is not a docker command.`;
}

function handleGit(args) {
    if (args.length === 0) return 'usage: git [--version] [--help] <command> [<args>]';
    const subcmd = args[0];
    if (subcmd === 'status') {
        return `On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   src/core/engine.js\n\nno changes added to commit (use "git add" and/or "git commit -a")`;
    }
    if (subcmd === 'commit') {
        return `[main 7a2b9c3] Fix critical security vulnerability in authentication flow\n 1 file changed, 14 insertions(+), 2 deletions(-)`;
    }
    return `git: '${subcmd}' is not a git command. See 'git --help'.`;
}

function handleUfw(args) {
    if (args.length === 0) return 'ufw: missing operand';
    if (args[0] === 'deny' && args.includes('22/tcp')) {
        return 'Rule added\nRule added (v6)';
    }
    if (args[0] === 'allow') {
        return 'Rule added\nRule added (v6)';
    }
    if (args[0] === 'status') {
        return 'Status: active\n\nTo                         Action      From\n--                         ------      ----\n22/tcp                     DENY        Anywhere';
    }
    return `ufw: unrecognized command '${args[0]}'`;
}

function handleMysql(args) {
    if (args.includes('-u') && args.includes('root') && args.includes('-p')) {
        window.mysqlSessionActive = true;
        if (window.updatePromptGlobal) window.updatePromptGlobal();
        return `Enter password: \nWelcome to the MySQL monitor.  Commands end with ; or \\g.\nYour MySQL connection id is 1337\nServer version: 8.0.35-0ubuntu0.22.04.1 (Ubuntu)\n\nCopyright (c) 2000, 2023, Oracle and/or its affiliates.\n\nType 'help;' or '\\h' for help. Type '\\c' to clear the current input statement.`;
    }
    return 'ERROR 1045 (28000): Access denied for user';
}

window.handleMysqlInput = function(input) {
    const lower = input.toLowerCase().trim();
    if (lower === 'exit' || lower === 'quit') {
        window.mysqlSessionActive = false;
        if (window.updatePromptGlobal) window.updatePromptGlobal();
        return 'Bye';
    }
    if (lower.startsWith('select * from users')) {
        return `+----+----------+----------------------+\n| id | username | email                |\n+----+----------+----------------------+\n|  1 | admin    | admin@mast-lab.local |\n|  2 | sysadmin | sys@mast-lab.local   |\n|  3 | hacker   | pwned@evil.com       |\n+----+----------+----------------------+`;
    }
    if (lower.startsWith('show databases')) {
        return `+--------------------+\n| Database           |\n+--------------------+\n| information_schema |\n| mysql              |\n| performance_schema |\n| sys                |\n| app_db             |\n+--------------------+`;
    }
    if (lower.startsWith('use ')) {
        return 'Database changed';
    }
    if (lower === '') return '';
    return `ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '${input}'`;
}

function handleTar(args) {
    if (args.length === 0) return 'tar: You must specify one of the -Acdtrux, --delete or --test-label options';
    if (args.includes('-czvf') || (args[0] && args[0].includes('czvf'))) {
        return `/var/log/\n/var/log/auth.log\n/var/log/syslog\n/var/log/nginx/access.log\n/var/log/nginx/error.log\ntar: /var/log: file changed as we read it`;
    }
    if (args.includes('-czf') || (args[0] && args[0].includes('czf'))) {
        return ``; // silent output for -czf without v (verbose)
    }
    return `tar: unrecognized option`;
}

function handleCrontab(args) {
    if (args.includes('-e')) {
        return `crontab: installing new crontab\nAutomation scheduled successfully.`;
    }
    if (args.includes('-l')) {
        return `0 3 * * * /usr/bin/tar -czf /backup/logs.tar.gz /var/log`;
    }
    return `crontab: usage error: unrecognized option`;
}

function handleTcpdump(args) {
    if (args.includes('-i') && args.includes('eth0')) {
        return `tcpdump: verbose output suppressed, use -v or -vv for full protocol decode\nlistening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n14:23:01.123456 IP 192.168.1.100.54321 > 192.168.1.50.22: Flags [S], seq 1234567890, win 65535, options [mss 1460,sackOK,TS val 123456 ecr 0,nop,wscale 6], length 0\n14:23:01.123567 IP 192.168.1.50.22 > 192.168.1.100.54321: Flags [S.], seq 9876543210, ack 1234567891, win 65535, options [mss 1460,sackOK,TS val 654321 ecr 123456,nop,wscale 6], length 0\n14:23:01.124678 IP 192.168.1.100.54321 > 192.168.1.50.22: Flags [.], ack 1, win 2058, options [nop,nop,TS val 123457 ecr 654321], length 0\n14:23:01.125789 IP 192.168.1.100.54321 > 192.168.1.50.22: Flags [P.], seq 1:36, ack 1, win 2058, options [nop,nop,TS val 123458 ecr 654321], length 35: SSH-2.0-OpenSSH_8.9p1 Ubuntu-3\n...`;
    }
    return `tcpdump: usage error: specify interface`;
}

function handleGcc(args) {
    if (args.includes('exploit.c') && args.includes('-o') && args.includes('exploit')) {
        return `exploit.c: In function 'main':\nexploit.c:42:5: warning: implicit declaration of function 'setresuid' [-Wimplicit-function-declaration]\n   42 |     setresuid(0, 0, 0);\n      |     ^~~~~~~~~\nCompilation finished successfully. Target 'exploit' generated.`;
    }
    return `gcc: fatal error: no input files\ncompilation terminated.`;
}

function handleExploit(args) {
    window.isRootUser = true;
    if (window.updatePromptGlobal) window.updatePromptGlobal();
    if (window.triggerGlitch) window.triggerGlitch(1500);
    return `[*] Initializing exploit sequence...\n[*] Bypassing ASLR... done.\n[*] Overwriting return pointer...\n[+] Got root shell!`;
}

function handleShred(args) {
    if (args.includes('-u') && args.includes('exploit.c')) {
        return `shred: exploit.c: pass 1/3 (random)...\nshred: exploit.c: pass 2/3 (random)...\nshred: exploit.c: pass 3/3 (000000)...\nshred: exploit.c: removing\nshred: exploit.c: removed`;
    }
    return `shred: missing file operand`;
}

function handleHydra(args) {
    if (args.includes('-l') && args.includes('admin') && args.includes('rockyou.txt')) {
        return `Hydra v9.3 (c) 2022 by van Hauser/THC & David Maciejak\n\n[INFO] Reduced number of tasks to 1 (ssh does not like many parallel connections)\n[DATA] max 1 task per 1 server, overall 1 task, 14344399 login tries (l:1/p:14344399), ~10 tries per task\n[INFO] Use a non-standard port if you want to bypass filtering\n1 of 1 target successfully completed, 0 valid passwords found\n[ATTEMPT] admin:123456 - login failed\n[ATTEMPT] admin:password - login failed\n[ATTEMPT] admin:qwerty - login failed\n[ATTEMPT] admin:admin123 - login failed\n[ATTEMPT] admin:iloveyou - login failed\n...\n[80] [ssh] host: 192.168.1.10   login: admin   password: supersecretpassword123\n1 of 1 target successfully completed, 1 valid password found\nHydra (https://github.com/vanhauser-thc/thc-hydra) finished at ${new Date().toISOString()}`;
    }
    return `hydra: missing required arguments. Try 'hydra -h' for help.`;
}

function handleNc(args) {
    if (args.includes('-lvnp') && args.includes('4444')) {
        return `Listening on [0.0.0.0] (family 0, port 4444)\nConnection from 192.168.1.50 51922 received!\nsh-5.1$ `;
    }
    if (args.length > 0) {
        return `nc: Connection to ${args[0]} port [tcp/*] succeeded!`;
    }
    return `nc: missing hostname and port`;
}

function handleProxychains(args) {
    if (args.includes('curl') && args.includes('http://hidden.onion')) {
        return `ProxyChains-3.1 (http://proxychains.sf.net)\n|DNS-request| hidden.onion\n|S-chain|-<>-127.0.0.1:9050-<><>-4.2.2.2:53-<><>-OK\n|DNS-response| hidden.onion is 192.168.100.5\n|S-chain|-<>-127.0.0.1:9050-<><>-192.168.100.5:80-<><>-OK\nHTTP/1.1 200 OK\nContent-Type: text/html\n\nWelcome to the Deep Web Hidden Service.`;
    }
    return `ProxyChains-3.1 (http://proxychains.sf.net)\nMissing arguments. Usage: proxychains <command> [args]`;
}

function handleCertbot(args) {
    if (args.includes('--nginx') && args.includes('-d') && args.includes('hacker.com')) {
        return `Saving debug log to /var/log/letsencrypt/letsencrypt.log\nPlugins selected: Authenticator nginx, Installer nginx\nRequesting a certificate for hacker.com\nPerforming the following challenges:\nhttp-01 challenge for hacker.com\nWaiting for verification...\nCleaning up challenges\nDeploying Certificate to VirtualHost /etc/nginx/sites-enabled/hacker.com\n\nCongratulations! You have successfully enabled https://hacker.com`;
    }
    return `certbot: error: unrecognized arguments.`;
}

function handleDig(args) {
    if (args.length === 0) return `dig: missing operand. Try 'dig --help' for more information.`;
    return `Executing dig with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleNslookup(args) {
    if (args.length === 0) return `nslookup: missing operand. Try 'nslookup --help' for more information.`;
    return `Executing nslookup with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleNginx(args) {
    if (args.length === 0) return `nginx: missing operand. Try 'nginx --help' for more information.`;
    return `Executing nginx with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleApache2(args) {
    if (args.length === 0) return `apache2: missing operand. Try 'apache2 --help' for more information.`;
    return `Executing apache2 with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleFdisk(args) {
    if (args.length === 0) return `fdisk: missing operand. Try 'fdisk --help' for more information.`;
    return `Executing fdisk with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleMkfs(args) {
    if (args.length === 0) return `mkfs: missing operand. Try 'mkfs --help' for more information.`;
    return `Executing mkfs with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleMount(args) {
    if (args.length === 0) return `mount: missing operand. Try 'mount --help' for more information.`;
    return `Executing mount with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleLvm(args) {
    if (args.length === 0) return `lvm: missing operand. Try 'lvm --help' for more information.`;
    return `Executing lvm with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleSystemctl(args) {
    if (args.length === 0) return `systemctl: missing operand. Try 'systemctl --help' for more information.`;
    return `Executing systemctl with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleJournalctl(args) {
    if (args.length === 0) return `journalctl: missing operand. Try 'journalctl --help' for more information.`;
    return `Executing journalctl with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleApt(args) {
    if (args.length === 0) return `apt: missing operand. Try 'apt --help' for more information.`;
    return `Executing apt with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleDpkg(args) {
    if (args.length === 0) return `dpkg: missing operand. Try 'dpkg --help' for more information.`;
    return `Executing dpkg with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleYum(args) {
    if (args.length === 0) return `yum: missing operand. Try 'yum --help' for more information.`;
    return `Executing yum with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleUseradd(args) {
    if (args.length === 0) return `useradd: missing operand. Try 'useradd --help' for more information.`;
    return `Executing useradd with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleUsermod(args) {
    if (args.length === 0) return `usermod: missing operand. Try 'usermod --help' for more information.`;
    return `Executing usermod with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleVisudo(args) {
    if (args.length === 0) return `visudo: missing operand. Try 'visudo --help' for more information.`;
    return `Executing visudo with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleIptables(args) {
    if (args.length === 0) return `iptables: missing operand. Try 'iptables --help' for more information.`;
    return `Executing iptables with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleNftables(args) {
    if (args.length === 0) return `nftables: missing operand. Try 'nftables --help' for more information.`;
    return `Executing nftables with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleIp(args) {
    if (args.length === 0) return `ip: missing operand. Try 'ip --help' for more information.`;
    return `Executing ip with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleTraceroute(args) {
    if (args.length === 0) return `traceroute: missing operand. Try 'traceroute --help' for more information.`;
    return `Executing traceroute with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleMtr(args) {
    if (args.length === 0) return `mtr: missing operand. Try 'mtr --help' for more information.`;
    return `Executing mtr with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleFail2ban(args) {
    if (args.length === 0) return `fail2ban: missing operand. Try 'fail2ban --help' for more information.`;
    return `Executing fail2ban with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleHaproxy(args) {
    if (args.length === 0) return `haproxy: missing operand. Try 'haproxy --help' for more information.`;
    return `Executing haproxy with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleRsyslog(args) {
    if (args.length === 0) return `rsyslog: missing operand. Try 'rsyslog --help' for more information.`;
    return `Executing rsyslog with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleLogrotate(args) {
    if (args.length === 0) return `logrotate: missing operand. Try 'logrotate --help' for more information.`;
    return `Executing logrotate with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleVmstat(args) {
    if (args.length === 0) return `vmstat: missing operand. Try 'vmstat --help' for more information.`;
    return `Executing vmstat with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleSs(args) {
    if (args.length === 0) return `ss: missing operand. Try 'ss --help' for more information.`;
    return `Executing ss with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleDstat(args) {
    if (args.length === 0) return `dstat: missing operand. Try 'dstat --help' for more information.`;
    return `Executing dstat with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleValgrind(args) {
    if (args.length === 0) return `valgrind: missing operand. Try 'valgrind --help' for more information.`;
    return `Executing valgrind with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleAuditd(args) {
    if (args.length === 0) return `auditd: missing operand. Try 'auditd --help' for more information.`;
    return `Executing auditd with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleInotifywait(args) {
    if (args.length === 0) return `inotifywait: missing operand. Try 'inotifywait --help' for more information.`;
    return `Executing inotifywait with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleKubectl(args) {
    if (args.length === 0) return `kubectl: missing operand. Try 'kubectl --help' for more information.`;
    return `Executing kubectl with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleTerraform(args) {
    if (args.length === 0) return `terraform: missing operand. Try 'terraform --help' for more information.`;
    return `Executing terraform with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleRclone(args) {
    if (args.length === 0) return `rclone: missing operand. Try 'rclone --help' for more information.`;
    return `Executing rclone with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleMdadm(args) {
    if (args.length === 0) return `mdadm: missing operand. Try 'mdadm --help' for more information.`;
    return `Executing mdadm with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleBtrfs(args) {
    if (args.length === 0) return `btrfs: missing operand. Try 'btrfs --help' for more information.`;
    return `Executing btrfs with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

function handleKeepalived(args) {
    if (args.length === 0) return `keepalived: missing operand. Try 'keepalived --help' for more information.`;
    return `Executing keepalived with arguments: ` + args.join(' ') + `\nOperation completed successfully.`;
}

// Override with specific logic for missions
function handleDig(args) {
    if (args.includes('hacker.com') || args.includes('example.com')) {
        return `
; <<>> DiG 9.18.1-1ubuntu1.2-Ubuntu <<>> hacker.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 1337
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; ANSWER SECTION:
hacker.com.		300	IN	A	192.168.1.100

;; Query time: 4 msec
;; SERVER: 127.0.0.53#53(127.0.0.53) (UDP)
;; WHEN: Wed Oct 18 10:00:00 UTC 2023
;; MSG SIZE  rcvd: 59`;
    }
    return `dig: couldn't get address for '${args[0] || ''}': not found`;
}

function handleSystemctl(args) {
    if (args.includes('status')) {
        return `● custom-daemon.service - Custom Background Daemon
     Loaded: loaded (/etc/systemd/system/custom-daemon.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2023-10-18 10:00:00 UTC; 5min ago
   Main PID: 1234 (daemon)
      Tasks: 1 (limit: 4614)
     Memory: 2.5M
        CPU: 12ms
     CGroup: /system.slice/custom-daemon.service
             └─1234 /usr/local/bin/daemon`;
    }
    if (args.includes('restart') || args.includes('start') || args.includes('stop')) {
        return ``; // systemctl usually returns empty on success
    }
    return `Unknown operation '${args[0] || ''}'.`;
}

function handleKubectl(args) {
    if (args.includes('get') && args.includes('pods')) {
        return `NAME                                READY   STATUS    RESTARTS   AGE
frontend-deployment-5c6f9d78-abc    1/1     Running   0          2d
backend-deployment-7b4c8f5d-def     1/1     Running   0          2d
database-0                          1/1     Running   0          5d`;
    }
    if (args.includes('apply')) {
        return `deployment.apps/frontend-deployment configured
service/frontend-service unchanged`;
    }
    return `error: the server doesn't have a resource type "${args[0] || ''}"`;
}

function handleTerraform(args) {
    if (args.includes('apply')) {
        return `Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:
  # aws_instance.web will be created
  + resource "aws_instance" "web" {
      + ami           = "ami-0c55b159cbfafe1f0"
      + instance_type = "t2.micro"
    }

Plan: 1 to add, 0 to change, 0 to destroy.
aws_instance.web: Creating...
aws_instance.web: Creation complete after 15s [id=i-1234567890abcdef0]

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.`;
    }
    if (args.includes('init')) {
        return `Initializing the backend...
Initializing provider plugins...

Terraform has been successfully initialized!`;
    }
    return `Usage: terraform [global options] <subcommand> [args]`;
}

function handleApt(args) {
    if (args.includes('install')) {
        return `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  ${args[1] || 'package'}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 1,234 kB of archives.
After this operation, 5,678 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy/main amd64 ${args[1] || 'package'} [1,234 kB]
Fetched 1,234 kB in 1s (1,234 kB/s)
Selecting previously unselected package ${args[1] || 'package'}.
Preparing to unpack .../${args[1] || 'package'}.deb ...
Unpacking ${args[1] || 'package'} ...
Setting up ${args[1] || 'package'} ...`;
    }
    return `apt: command requires root privileges.`;
}

function handleIptables(args) {
    if (args.includes('-L')) {
        return `Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
ACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh
DROP       all  --  anywhere             anywhere            

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination`;
    }
    return `iptables: rule inserted successfully.`;
}

function handleIp(args) {
    if (args.includes('route')) {
        return `default via 192.168.1.1 dev eth0 proto dhcp src 192.168.1.100 metric 100
10.0.0.0/8 via 10.0.0.1 dev tun0
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.100 metric 100`;
    }
    if (args.includes('addr')) {
        return `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.100/24 brd 192.168.1.255 scope global eth0
       valid_lft forever preferred_lft forever`;
    }
    return `Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }`;
}

