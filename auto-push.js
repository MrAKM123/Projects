const { exec } = require('child_process');

// Checks for changes across all projects every 60 seconds
const INTERVAL = 60000; 

function autoPush() {
    console.log(`[${new Date().toLocaleTimeString()}] Scanning workspace...`);

    // Check git status first to see if there are actual modifications
    exec('git status --porcelain', (statusError, stdout) => {
        if (statusError) {
            console.error(`Status Check Error: ${statusError.message}`);
            return;
        }

        // If stdout is empty, it means there are absolutely no changes to commit
        if (!stdout.trim()) {
            console.log("Everything up-to-date. Standing by...");
            return;
        }

        // If there ARE changes, run the sync commands
        const command = 'git add . && git commit -m "Auto-sync: Workspace updated" && git push origin main';
        exec(command, (error, commitStdout, commitStderr) => {
            if (error) {
                console.error(`Sync Error: ${error.message}`);
                return;
            }
            console.log("🚀 GitHub updated! All changes synchronized successfully.");
        });
    });
}

// Start tracking immediately, then repeat every minute
autoPush();
setInterval(autoPush, INTERVAL);