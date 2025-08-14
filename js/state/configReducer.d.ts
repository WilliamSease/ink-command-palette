import { ForegroundColorName } from 'chalk';
export type ConfigReducerState = {
    colorMap: {
        main: ForegroundColorName;
    };
};
declare const getConfigReducerinitialState: () => ConfigReducerState;
type ConfigReducerAction = {
    type: 'cycleColor';
    which: 'RESET';
};
declare const configReducer: (state: ConfigReducerState, action: ConfigReducerAction) => ConfigReducerState;
export { getConfigReducerinitialState, configReducer, ConfigReducerAction, };
