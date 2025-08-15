import { Dispatch, Fragment, useMemo, useState } from "react"
import { MacroReducerAction, MacroReducerState } from "../state/macroReducer.js"
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js"
import { ConfigReducerState } from "../state/configReducer.js"
import React from "react"
import { Box, Text, useApp, useInput } from 'ink'
import { cycleColor } from "../util/Colors.js"
import fs from 'fs';
import { Writer, WriteState } from "../components/Writer.js"
import { Selector } from "../components/Selector.js"


type IProps = {
    macros: [MacroReducerState, Dispatch<MacroReducerAction>],
    navi: [NaviReducerState, Dispatch<NaviReducerAction>],
    config: ConfigReducerState
}

const actions = ['editTitle','editCommand','editColor','editPageTitle','writeOut','exit']

export const EditMacro = (props: IProps) => {
    const { macros, navi, config } = props;
    const [macroState, macroDispatch] = macros
    const [naviState, naviDispatch] = navi
    const activeMacro = useMemo(() => macroState[naviState.editMacro?.page ?? 0]?.macros[naviState.editMacro?.vert ?? 0], [macros, naviState])
    const { exit } = useApp();


    const [field, setField] = useState(0);
    const [write, setWrite] = useState<WriteState>('rdy')

 
    useInput((_input, key) => {
        if (key.downArrow) {
            setField((prev) => prev === actions.length - 1 ? 0 : prev + 1)
        }
        if (key.upArrow) {
            setField((prev) => prev === 0 ? actions.length : prev - 1)
        }
        if (key.return) {
            switch (actions[field]) {
                case 'editColor':
                    macroDispatch({ type: 'editMacro', payload: { macro: { color: cycleColor(activeMacro?.color ?? 'white') }, page: naviState.editMacro?.page ?? 0, entry: naviState.editMacro?.vert ?? 0 } })
                    break;
                case 'writeOut':
                    if (write === 'rdy') {
                        setWrite('wrt')
                        fs.rmSync('./storage/macro.json')
                        fs.writeFile('./storage/macro.json', JSON.stringify(macroState,null,2), (err) => {
                            if (err) {
                                setWrite('err')
                                setTimeout(() => setWrite('rdy'), 3000)
                            } else {
                                setWrite('ok')
                                setTimeout(() => naviDispatch({ type: 'setEditMacro', payload: undefined }), 750)
                            }
                        });
                    }
                    break;
                case 'exit':
                    exit();

            }
        }
    });

    return <Fragment>
        <Text color={config.colorMap.main}> {`// Editing macro at page ${naviState.editMacro?.page} entry ${naviState.editMacro?.vert} \\\\`} </Text>
        <Text> </Text>
        <Box><Selector field={actions[field]} active={actions[0]} /><Text>Title:</Text><Text>{activeMacro?.title}</Text></Box>
        <Text color={'gray'}> If title is empty, command is displayed.</Text>
        <Box><Selector field={actions[field]} active={actions[1]} /><Text>Command: </Text><Text>{activeMacro?.command}</Text></Box>
        <Box><Selector field={actions[field]} active={actions[2]} /><Text>Color (Enter): </Text><Text color={activeMacro?.color}>{activeMacro?.color}</Text></Box>
        <Box><Selector field={actions[field]} active={actions[3]} /><Text>Page Title: </Text><Text>{macroState[naviState.editMacro?.page ?? 0]?.title ?? ""}</Text></Box>
        <Text> </Text>
        <Box><Selector field={actions[field]} active={actions[4]} />{<Writer write={write}/>}</Box>
        <Box><Selector field={actions[field]} active={actions[5]} /><Text>Exit Program</Text><Text color={'gray'}> -- Kill the program immediately, nothing saved.</Text></Box>

    </Fragment>
}