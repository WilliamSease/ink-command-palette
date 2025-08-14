import { Dispatch } from "react";
import { MacroReducerAction, MacroReducerState } from "../state/macroReducer.js";
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js";
import { ConfigReducerState } from "../state/configReducer.js";
import React from "react";
type IProps = {
    macros: [MacroReducerState, Dispatch<MacroReducerAction>];
    navi: [NaviReducerState, Dispatch<NaviReducerAction>];
    config: ConfigReducerState;
};
export declare const EditMacro: (props: IProps) => React.JSX.Element;
export {};
