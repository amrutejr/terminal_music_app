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

let currentSong = 0;
let player = null;

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
    const songPath = path.join(__dirname, "music", songs[currentSong]);

    player = spawn("mpv", [songPath]);

    console.log("Playing:", songs[currentSong]);
}

function pause() {
    console.log("Paused");
}

function next() {
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
    if (player) {
        player.kill();
    }

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    play();
}

function askUser() {
    rl.question("Choose an option: ", answer => {

        const choice = Number(answer);

        if (choice === 1) {
            play();
        }

        else if (choice === 2) {
            pause();
        }

        else if (choice === 3) {
            next();
        }

        else if (choice === 4) {
            previous();
        }

        else if (choice === 5) {
            console.log("Goodbye!");

            if (player) {
                player.kill();
            }

            rl.close();
            return;
        }

        else {
            console.log("Invalid option");
        }

        showMenu();
        askUser();
    });
}

showMenu();
askUser();
