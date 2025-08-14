import { Fragment } from "react";
import React from "react";
import { useInput, Text, Box, } from 'ink';
export const Macros = (props) => {
    const { macros, navi, config } = props;
    const [naviState, naviDispatch] = navi;
    useInput((input, key) => {
        if (key.downArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { vert: (naviState.macroNavi.vert + 1) % 10 } });
        }
        if (key.upArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { vert: naviState.macroNavi.vert === 0 ? 9 : naviState.macroNavi.vert - 1 } });
        }
        if (key.leftArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { page: naviState.macroNavi.page === 0 ? 5 : naviState.macroNavi.page - 1 } });
        }
        if (key.rightArrow || key.tab) {
            naviDispatch({ type: 'updateMacroNavi', payload: { page: (naviState.macroNavi.page + 1) % 6 } });
        }
        if (input === 'E' || input === 'e') {
            naviDispatch({ type: 'setEditMacro', payload: naviState.macroNavi });
        }
        if (input === 'C' || input === 'c') {
            naviDispatch({ type: 'toggleConfigOpen' });
        }
    });
    return (React.createElement(Fragment, null,
        React.createElement(Text, { color: config.colorMap.main }, " // Terminal Shortcuts \\\\"),
        React.createElement(Box, { flexDirection: 'row' },
            React.createElement(Text, null, "Page: "),
            macros.map((page, idx) => React.createElement(Fragment, null,
                React.createElement(Text, { inverse: idx === naviState.macroNavi.page, key: idx }, `${page.title ?? idx}`),
                React.createElement(Text, null, " ")))),
        new Array(9).fill("").map((_arr, idx) => `${idx + 1}`).concat(`0`).map((str, idx) => React.createElement(Box, { flexDirection: 'row', key: idx },
            React.createElement(Text, null, `${idx === naviState.macroNavi.vert ? ">" : " "}${str})`))),
        React.createElement(Box, { flexDirection: 'row' },
            React.createElement(Text, null, "(E)dit "),
            React.createElement(Text, null, "(C)onfig "),
            React.createElement(Text, null, "(Enter=Select) "),
            React.createElement(Text, null, "(Tab=Page) "),
            React.createElement(Text, null, "(Escape to Quit) "))));
};
