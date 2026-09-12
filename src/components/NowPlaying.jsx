import React from "react";
import { Box, Text } from "ink";
import ProgressBar from "./ProgressBar.jsx";

const ASCII_ART = `
  ┌──────────────────┐
  │     ░▒▓██▓▒░     │
  │    ▓████████▓    │
  │    █  MUSIC █    │
  │    ▓████████▓    │
  │     ░▒▓██▓▒░     │
  └──────────────────┘
`;

export default function NowPlaying({ song, currentTime, duration, isPaused }) {
    return (
        <Box flexDirection="column" borderStyle="round" borderColor="magenta" paddingX={2} paddingY={1} alignItems="center">
            <Text bold color="magenta">NOW PLAYING</Text>
            <Text color="blue">{ASCII_ART}</Text>
            <Text bold color="green">{song ? song : "No Song Playing"}</Text>
            <Text color={isPaused ? "yellow" : "green"} bold>
                {isPaused ? "❚❚ PAUSED" : "▶ PLAYING"}
            </Text>
            <Box marginTop={1}>
                <ProgressBar currentTime={currentTime} duration={duration} />
            </Box>
        </Box>
    );
}
