import { Box, useInput, useStdout, Text, useApp } from 'ink';
import React, { useReducer } from 'react';
import { globalReducer, getGlobalReducerinitialState } from './globalReducer.js';
import fs from 'fs';
export default function App() {
    const { exit } = useApp();
    const { stdout } = useStdout();
    const [reducer] = useReducer(globalReducer, getGlobalReducerinitialState());
    useInput((input) => {
        if (input === '0') {
            fs.writeFile('./toRun', 'echo Hello from your macro!', () => exit());
        }
    });
    return (stdout.rows >= 15 ? React.createElement(Box, { flexDirection: "column", height: 15, borderStyle: 'classic' },
        React.createElement(Text, { color: reducer.config.colorMap.main }, "Terminal Shortcuts"),
        new Array(9).fill("").map((_arr, idx) => `${idx + 1}`).concat(`0`).map((str, idx) => React.createElement(Text, { key: idx }, `${str})`))) : React.createElement(Text, null, "Expand Terminal to 15 rows ~please~"));
}
