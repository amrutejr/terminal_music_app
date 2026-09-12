import React from "react";
import { Box, Text } from "ink";

export default function Playlist({ songs, currentSong }) {
    return (
        <Box flexDirection="column" borderStyle="single" borderColor="yellow" paddingX={1} paddingY={0}>
            <Text bold color="yellow">  Playlist ({songs.length})</Text>
            {songs.length === 0 ? (
                <Text color="gray">  No .mp3 files found in music/ folder</Text>
            ) : (
                songs.map((song, index) => {
                    const isSelected = index === currentSong;
                    return (
                        <Text key={song} color={isSelected ? "green" : "white"} bold={isSelected}>
                            {isSelected ? "▶ " : "  "}{index + 1}. {song}
                        </Text>
                    );
                })
            )}
        </Box>
    );
}
