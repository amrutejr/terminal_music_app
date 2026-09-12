import React, { useState, useEffect, useCallback } from "react";
import { Box, Text, useInput, useApp } from "ink";
import Header from "./components/Header.jsx";
import NowPlaying from "./components/NowPlaying.jsx";
import Playlist from "./components/Playlist.jsx";
import { getSongs, getSongPath } from "./music/library.js";
import { play, stop, togglePause, seek, getStatus } from "./playback/player.js";

export default function App() {
    const { exit } = useApp();
    const [songs] = useState(() => getSongs());
    const [currentSong, setCurrentSong] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSong = useCallback(() => {
        if (songs.length === 0) return;
        setCurrentSong(prev => (prev + 1) % songs.length);
    }, [songs.length]);

    const previousSong = useCallback(() => {
        if (songs.length === 0) return;
        setCurrentSong(prev => (prev - 1 + songs.length) % songs.length);
    }, [songs.length]);

    // Handle play when selected song changes
    useEffect(() => {
        if (songs.length === 0) return;

        const songPath = getSongPath(songs[currentSong]);
        play(songPath, () => {
            // Auto advance when song finishes
            nextSong();
        });

        return () => {
            stop();
        };
    }, [currentSong, songs, nextSong]);

    // Poll status from mpv IPC
    useEffect(() => {
        const interval = setInterval(async () => {
            const status = await getStatus();
            if (status) {
                setCurrentTime(status.currentTime);
                setDuration(status.duration);
                setIsPaused(status.isPaused);
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Handle Keyboard controls
    useInput((input, key) => {
        if (key.upArrow) {
            previousSong();
        } else if (key.downArrow) {
            nextSong();
        } else if (key.leftArrow) {
            seek(-5);
        } else if (key.rightArrow) {
            seek(5);
        } else if (input === " ") {
            togglePause();
        } else if (input.toLowerCase() === "q" || (key.ctrl && input === "c")) {
            stop();
            exit();
            process.exit(0);
        }
    }, { isActive: Boolean(process.stdin.isTTY) });

    return (
        <Box flexDirection="column" padding={1} width={60}>
            <Header />

            <Box marginY={1} justifyContent="space-between">
                <Box width="50%">
                    <Playlist songs={songs} currentSong={currentSong} />
                </Box>
                <Box width="50%">
                    <NowPlaying
                        song={songs[currentSong]}
                        currentTime={currentTime}
                        duration={duration}
                        isPaused={isPaused}
                    />
                </Box>
            </Box>

            <Box borderStyle="single" borderColor="gray" paddingX={1} justifyContent="center">
                <Text color="gray">
                    ↑↓ Song   ←→ Seek 5s   Space Play/Pause   q Quit
                </Text>
            </Box>
        </Box>
    );
}
