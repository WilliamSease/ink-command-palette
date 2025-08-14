import { ForegroundColorName } from 'chalk';
import fs from 'fs';

export type ConfigReducerState = {
	colorMap:{
		main:ForegroundColorName
	}
}


const getConfigReducerinitialState: () => ConfigReducerState = () => {
	return (JSON.parse(fs.readFileSync("./storage/config.json", 'utf-8')))
};

type ConfigReducerAction =
	| {
		type: 'cycleColor';
		which:
		| 'RESET';
	};

const configReducer = (
	state: ConfigReducerState,
	action: ConfigReducerAction,
): ConfigReducerState => {
	switch (action.type) {
		default:
			return state
	}
};

export {
	getConfigReducerinitialState,
	configReducer,
	ConfigReducerAction,
};
