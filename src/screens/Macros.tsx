import { Dispatch, Fragment } from "react"
import { ConfigReducerState, } from "../state/configReducer.js"
import React from "react"
import { useInput, Text, Box, } from 'ink';
import { MacroReducerState } from "../state/macroReducer.js";
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js";


type IProps = {
    config: ConfigReducerState
    macros: MacroReducerState
    navi: [NaviReducerState, Dispatch<NaviReducerAction>]
}

export const Macros = (props: IProps) => {
    const { macros, navi, config } = props;

    const [naviState, naviDispatch] = navi

    useInput((input, key) => {
        if (key.downArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { vert: (naviState.macroNavi.vert + 1) % 10 } })
        }
        if (key.upArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { vert: naviState.macroNavi.vert === 0 ? 9 : naviState.macroNavi.vert - 1 } })
        }
        if (key.leftArrow) {
            naviDispatch({ type: 'updateMacroNavi', payload: { page: naviState.macroNavi.page === 0 ? 5 : naviState.macroNavi.page - 1 } })
        }
        if (key.rightArrow || key.tab) {
            naviDispatch({ type: 'updateMacroNavi', payload: { page: (naviState.macroNavi.page + 1) % 6 } })
        }
        if (input === 'E' || input === 'e') {
            naviDispatch({ type: 'setEditMacro', payload: naviState.macroNavi })
        }
        if (input === 'C' || input === 'c') {
            naviDispatch({ type: 'toggleConfigOpen' })
        }
    });

    return (<Fragment>
        <Text color={config.colorMap.main}> // Terminal Shortcuts \\</Text>
        <Box flexDirection='row'>
            <Text>Page: </Text>
            {macros.map((page, idx) => <Fragment key={idx}>
                <Text inverse={idx === naviState.macroNavi.page} >{`${page.title ?? idx}`}</Text>
                <Text>{" "}</Text>
            </Fragment>)}
        </Box>
        {new Array(9).fill("").map((_arr, idx) => `${idx + 1}`).concat(`0`).map((str, idx) =>
            <Box flexDirection='row' key={idx}>
                <Text>{`${idx === naviState.macroNavi.vert ? ">" : " "}${str})`}</Text>
            </Box>)}
        <Box flexDirection='row'>
            <Text>(E)dit </Text>
            <Text>(C)onfig </Text>
            <Text>(Enter=Select) </Text>
            <Text>(Tab=Page) </Text>
            <Text>(Escape to Quit) </Text>
        </Box>
    </Fragment>)
}