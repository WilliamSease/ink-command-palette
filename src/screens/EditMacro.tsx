import { Dispatch, Fragment, useMemo, useState } from "react"
import { MacroReducerAction, MacroReducerState } from "../state/macroReducer.js"
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js"
import { ConfigReducerState } from "../state/configReducer.js"
import React from "react"
import { Box, Text, useApp, useInput } from 'ink'
import { cycleColor } from "../util/Colors.js"
import fs from 'fs';


type IProps = {
    macros: [MacroReducerState, Dispatch<MacroReducerAction>],
    navi: [NaviReducerState, Dispatch<NaviReducerAction>],
    config: ConfigReducerState
}

export const EditMacro = (props: IProps) => {
    const { macros, navi, config } = props;
    const [macroState, macroDispatch] = macros
    const [naviState, naviDispatch] = navi
    if (naviState.editMacro === undefined) return <Text></Text>
    const activeMacro = useMemo(() => macroState[naviState.editMacro?.page ?? 0]?.macros[naviState.editMacro?.vert ?? 0], [macros, naviState])
    const { exit } = useApp();


    const [field, setField] = useState(0);
    const [write, setWrite] = useState<'rdy' | 'wrt' | 'ok' | 'err'>('rdy')

    const Selector = (props: { field: number, active: number }) => <Text>{`${props.field === props.active ? ">" : " "}`}</Text>

    useInput((_input, key) => {
        if (key.downArrow) {
            setField((prev) => prev === 5 ? 0 : prev + 1)
        }
        if (key.upArrow) {
            setField((prev) => prev === 0 ? 5 : prev - 1)
        }
        if (key.return) {
            switch (field) {
                case 2:
                    macroDispatch({ type: 'editMacro', payload: { macro: { color: cycleColor(activeMacro?.color ?? 'white') }, page: naviState.editMacro?.page ?? 0, entry: naviState.editMacro?.vert ?? 0 } })
                    break;
                case 4:
                    if (write === 'rdy') {
                        setWrite('wrt')
                        fs.rmSync('./storage/macro.json')
                        fs.writeFile('./storage/macro.json', JSON.stringify(macroState),(err) => {
                            if (err) {
                                setWrite('err')
                                setTimeout(() => setWrite('rdy'),3000)
                            } else {
                                setWrite('ok')
                                setTimeout(() => naviDispatch({type:'setEditMacro', payload:undefined}),750)
                            }
                        });
                    }
                    break;
                case 5:
                    exit();

            }
        }
    });

    return <Fragment>
        <Text color={config.colorMap.main}> {`// Editing macro at page ${naviState.editMacro.page} entry ${naviState.editMacro.vert} \\`} </Text>
        <Text> </Text>
        <Box><Selector field={field} active={0} /><Text>Title:</Text><Text>{activeMacro?.title}</Text></Box>
        <Text color={'gray'}> If title is empty, command is displayed.</Text>
        <Box><Selector field={field} active={1} /><Text>Command: </Text><Text>{activeMacro?.command}</Text></Box>
        <Box><Selector field={field} active={2} /><Text>Color (Enter): </Text><Text color={activeMacro?.color}>{activeMacro?.color}</Text></Box>
        <Box><Selector field={field} active={3} /><Text>Page Title: </Text><Text>{macroState[naviState.editMacro.page]?.title ?? ""}</Text></Box>
        <Text></Text>
        <Box><Selector field={field} active={4} />{write === 'rdy' ? <Fragment><Text>Write Out & Go Back</Text><Text color={'gray'}> -- Write these changes to storage.</Text></Fragment> : 
        write === 'wrt' ? <Text color={'yellowBright'}>Writing...</Text> : 
        write === 'ok' ? <Text color={'greenBright'}>Write OK!!!</Text> : 
        <Text color={'redBright'}>Error</Text>}</Box>
        <Box><Selector field={field} active={5} /><Text>Exit Program</Text><Text color={'gray'}> -- Kill the program immediately, nothing saved.</Text></Box>

    </Fragment>
}