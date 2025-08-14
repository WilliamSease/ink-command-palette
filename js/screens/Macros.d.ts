import { Dispatch } from "react";
import { ConfigReducerState } from "../state/configReducer.js";
import React from "react";
import { MacroReducerState } from "../state/macroReducer.js";
import { NaviReducerAction, NaviReducerState } from "../state/navigationReducer.js";
type IProps = {
    config: ConfigReducerState;
    macros: MacroReducerState;
    navi: [NaviReducerState, Dispatch<NaviReducerAction>];
};
export declare const Macros: (props: IProps) => React.JSX.Element;
export {};
