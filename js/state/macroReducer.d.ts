import { ForegroundColorName } from 'chalk';
export type MacroReducerState = {
    title?: string;
    macros: {
        title?: string;
        command?: string;
        color?: ForegroundColorName;
    }[];
}[];
declare const getMacroReducerinitialState: () => MacroReducerState;
type MacroReducerAction = {
    type: '';
};
declare const macroReducer: (state: MacroReducerState, action: MacroReducerAction) => MacroReducerState;
export { getMacroReducerinitialState, macroReducer, MacroReducerAction, };
