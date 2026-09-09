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

function askUser() {
    rl.question("Choose an option: ", answer => {

        const choice = Number(answer);

        if (choice === 1) {
            console.log("Playing");
        }

        else if (choice === 2) {
            console.log("Paused");
        }

        else if (choice === 3) {
            console.log("Next");
        }

        else if (choice === 4) {
            console.log("Previous");
        }

        else if (choice === 5) {
            console.log("Quiting...");
            rl.close();
            return;
        }

        else {
            console.log("Invalid option, try again");
        }

        showMenu();
        askUser();
    });
}

showMenu();
askUser();
