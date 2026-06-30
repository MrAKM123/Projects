const { exec } = require('child_process');

// The script checks for changes across all projects every 60 seconds (60000ms)
const INTERVAL = 60000; 

function autoPush() {
    console.log(`[${new Date().toLocaleTimeString()}] Scanning workspace for updates...`);

    // Stages, commits, and pushes any change made in any project folder automatically
    const command = 'git add . && git commit -m "Auto-sync: Workspace updated" && git push origin main';

    exec(command, (error, stdout, stderr) => {
        if (error) {
            // Skips printing errors if there's simply nothing new to save
            if (error.message.includes("nothing to commit")) {
                console.log("No changes found across projects. Monitoring...");
            } else {
                console.error(`Sync Error: ${error.message}`);
            }
            return;
        }
        console.log("🚀 GitHub updated! All project folders are synchronized.");
    });
}

// Start tracking immediately, then repeat every minute
autoPush();
setInterval(autoPush, INTERVAL);