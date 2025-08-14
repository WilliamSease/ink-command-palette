export type NaviReducerState = {
    macroNavi: MacroLocation;
    editMacro?: MacroLocation;
    configOpen: boolean;
};
type MacroLocation = {
    page: number;
    vert: number;
};
declare const getNaviReducerinitialState: () => NaviReducerState;
type NaviReducerAction = {
    type: 'updateMacroNavi';
    payload: Partial<MacroLocation>;
} | {
    type: 'setEditMacro';
    payload: MacroLocation | undefined;
} | {
    type: 'toggleConfigOpen';
};
declare const naviReducer: (state: NaviReducerState, action: NaviReducerAction) => NaviReducerState;
export { getNaviReducerinitialState, naviReducer, NaviReducerAction, };
