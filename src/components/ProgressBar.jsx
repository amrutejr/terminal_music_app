import React from "react";
import { Box, Text } from "ink";

function formatTime(seconds) {
    if (!seconds || isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function ProgressBar({ currentTime = 0, duration = 0 }) {
    const width = 24;
    const progressRatio = duration > 0 ? Math.min(Math.max(currentTime / duration, 0), 1) : 0;
    const pos = Math.round(progressRatio * width);

    const filled = "━".repeat(pos);
    const knob = "●";
    const empty = "━".repeat(Math.max(0, width - pos));

    const bar = `${filled}${knob}${empty}`;

    return (
        <Box flexDirection="column" alignItems="center">
            <Text color="cyan">{bar}</Text>
            <Text color="gray">
                {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
        </Box>
    );
}
