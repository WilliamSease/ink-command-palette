import { ForegroundColorName } from 'chalk';
export declare const cycleColor: (current: string) => ForegroundColorName;
type ConfigType = {
    colorMap: {
        main: ForegroundColorName;
    };
};
interface GlobalReducerState {
    config: ConfigType;
}
declare const getGlobalReducerinitialState: () => GlobalReducerState;
type GlobalReducerAction = {
    type: 'cycleColor';
    which: 'RESET';
};
declare const globalReducer: (state: GlobalReducerState, action: GlobalReducerAction) => GlobalReducerState;
export { getGlobalReducerinitialState, globalReducer, GlobalReducerAction, };
