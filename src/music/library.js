import fs from "fs";
import path from "path";

const musicDirectory = path.join(process.cwd(), "music");

export function getSongs() {
    if (!fs.existsSync(musicDirectory)) {
        return [];
    }
    return fs.readdirSync(musicDirectory)
        .filter(file => file.endsWith(".mp3"));
}

export function getSongPath(song) {
    return path.join(musicDirectory, song);
}
