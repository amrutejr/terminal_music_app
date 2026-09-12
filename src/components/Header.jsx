import React from "react";
import { Box, Text } from "ink";

export default function Header() {
    return (
        <Box borderStyle="round" borderColor="cyan" paddingX={2} justifyContent="center">
            <Text bold color="cyan">🎵 TERMINAL MUSIC PLAYER</Text>
        </Box>
    );
}
