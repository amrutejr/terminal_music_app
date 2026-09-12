import { spawn } from "child_process";
import fs from "fs";
import net from "net";

let playerProcess = null;
let manuallyStopped = false;
const socketPath = "/tmp/mpv-socket";

export function sendCommand(commandArray) {
    return new Promise((resolve) => {
        const client = net.connect(socketPath, () => {
            const payload = JSON.stringify({ command: commandArray }) + "\n";
            client.write(payload);
        });

        let dataStr = "";
        client.on("data", (chunk) => {
            dataStr += chunk.toString();
        });

        client.on("end", () => {
            try {
                const lines = dataStr.trim().split("\n");
                const lastLine = lines[lines.length - 1];
                const res = JSON.parse(lastLine);
                resolve(res.data);
            } catch (e) {
                resolve(null);
            }
        });

        client.on("error", () => {
            resolve(null);
        });
    });
}

export function play(songPath, onEnd) {
    stop();

    if (fs.existsSync(socketPath)) {
        try {
            fs.unlinkSync(socketPath);
        } catch (e) {}
    }

    manuallyStopped = false;
    playerProcess = spawn("mpv", [
        "--idle=yes",
        "--input-ipc-server=" + socketPath,
        songPath
    ], { stdio: "ignore" });

    const activePlayer = playerProcess;

    activePlayer.on("close", () => {
        if (playerProcess === activePlayer && !manuallyStopped) {
            playerProcess = null;
            if (onEnd) onEnd();
        }
    });
}

export function togglePause() {
    return sendCommand(["cycle", "pause"]);
}

export function seek(seconds) {
    return sendCommand(["seek", seconds, "relative"]);
}

export async function getStatus() {
    const timePos = await sendCommand(["get_property", "time-pos"]);
    const duration = await sendCommand(["get_property", "duration"]);
    const pauseState = await sendCommand(["get_property", "pause"]);

    return {
        currentTime: typeof timePos === "number" ? timePos : 0,
        duration: typeof duration === "number" ? duration : 0,
        isPaused: Boolean(pauseState)
    };
}

export function stop() {
    manuallyStopped = true;
    if (playerProcess) {
        playerProcess.kill();
        playerProcess = null;
    }
}
