import { ForegroundColorName } from 'chalk';
type Macro = {
    title?: string;
    command?: string;
    color?: ForegroundColorName;
};
export type MacroReducerState = {
    title?: string;
    macros: Macro[];
}[];
declare const getMacroReducerinitialState: () => MacroReducerState;
type MacroReducerAction = {
    type: 'editMacro';
    payload: {
        macro: Partial<Macro>;
        page: number;
        entry: number;
    };
};
declare const macroReducer: (state: MacroReducerState, action: MacroReducerAction) => MacroReducerState;
export { getMacroReducerinitialState, macroReducer, MacroReducerAction, };
