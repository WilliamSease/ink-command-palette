import { Dispatch, Fragment, useState } from "react"
import { MacroReducerAction, MacroReducerState } from "../state/macroReducer.js"
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js"
import { ConfigReducerState } from "../state/configReducer.js"
import React from "react"
import {Text, useInput} from 'ink'

type IProps = {
    macros: [MacroReducerState, Dispatch<MacroReducerAction>],
    navi: [NaviReducerState, Dispatch<NaviReducerAction>],
    config:ConfigReducerState
}

export const EditMacro = (props :IProps) => {
    const {macros, navi, config} = props;
    const [_macroState] = macros
    const [naviState] = navi
    if (naviState.editMacro === undefined) return <Text></Text>

    const [field, setField] = useState(0);

    const Selector = (props:{field:number, active:number}) => <Text>{`${props.field === props.active ? ">" : " "}`}</Text>

    useInput((_input, key) => {
        if (key.downArrow) {
            setField((prev) => prev === 4 ? 0 : prev + 1)
        }
        if (key.upArrow) {
            setField((prev) => prev === 0 ? 4 : prev - 1)
        }
    });
    
    return <Fragment>
        <Text color={config.colorMap.main}> {`// Editing macro at page ${naviState.editMacro.page} entry ${naviState.editMacro.vert} \\`} </Text>
        <Text> </Text>
        <Selector field={field} active={0}/>
        <Selector field={field} active={1}/>
        <Selector field={field} active={2}/>
        <Selector field={field} active={3}/>
        <Selector field={field} active={4}/>

    </Fragment>
}