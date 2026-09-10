const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    console.log("Playing");
}

function pause() {
    console.log("Paused");
}

function next() {
    console.log("Next song");
}

function previous() {
    console.log("Previous song");
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
