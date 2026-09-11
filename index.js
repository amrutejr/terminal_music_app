const readline = require("readline");
const fs = require("fs");
const { spawn } = require("child_process");
const path = require("path");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const songs = fs.readdirSync(path.join(__dirname, "music"))
    .filter(file => file.endsWith(".mp3"));

let player = null;
let currentSong = 0;
let manuallyStopped = false;
let isPaused = false;

function showMenu() {
    console.log(`
╔════════════════════════════════╗
║      🎵 TERMINAL MUSIC         ║
╠════════════════════════════════╣
║                                ║
║  1. Play                       ║
║  2. Pause                      ║
║  3. Next                       ║
║  4. Previous                   ║
║  5. Quit                       ║
║                                ║
╚════════════════════════════════╝
`);
}

function play() {
    if (songs.length === 0) {
        console.log("No songs found in the music folder.");
        return;
    }

    if (player) {
        manuallyStopped = true;
        player.kill();
    }

    const songPath = path.join(__dirname, "music", songs[currentSong]);

    manuallyStopped = false;
    const newPlayer = spawn("mpv", [songPath]);
    player = newPlayer;
    isPaused = false;

    newPlayer.once("close", () => {
        if (player !== newPlayer || manuallyStopped) {
            return;
        }

        player = null;
        isPaused = false;
        console.log("Song finished");

        currentSong++;

        if (currentSong >= songs.length) {
            currentSong = 0;
        }

        play();
    });

    console.log("Playing:", songs[currentSong]);
}

function pause() {
    if (!player) {
        console.log("Nothing is playing");
        return;
    }

    if (isPaused) {
        player.kill("SIGCONT");
        isPaused = false;
        console.log("Resumed");
    } else {
        player.kill("SIGSTOP");
        isPaused = true;
        console.log("Paused");
    }
}

function next() {
    manuallyStopped = true;

    if (player) {
        player.kill();
    }

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    play();
}

function previous() {
    manuallyStopped = true;

    if (player) {
        player.kill();
    }

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    play();
}

function enableKeyboardControls() {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", input => {
        for (const key of input) {
            if (key === " ") {
                pause();
            } else if (key.toLowerCase() === "n") {
                next();
            } else if (key.toLowerCase() === "p") {
                previous();
            } else if (key.toLowerCase() === "q" || key === "\u0003") {
                quit();
            }
        }
    });
}

function quit() {
    console.log("\nGoodbye!");

    if (player) {
        player.kill();
    }

    if (process.stdin.isTTY) {
        process.stdin.setRawMode(false);
    }

    process.stdin.pause();
    process.exit(0);
}

showMenu();
rl.question("Choose an option: ", answer => {
    const choice = Number(answer);

    rl.close();

    if (choice === 1) {
        play();
    } else if (choice === 2) {
        pause();
    } else if (choice === 3) {
        next();
    } else if (choice === 4) {
        previous();
    } else if (choice === 5) {
        quit();
        return;
    } else {
        console.log("Invalid option");
        return;
    }

    console.log("Controls: Space = pause/resume, n = next, p = previous, q = quit");
    enableKeyboardControls();
});
