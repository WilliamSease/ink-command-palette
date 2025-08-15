import { ForegroundColorName } from 'chalk';
import { cycleColor } from '../util/Colors.js';
import fs from 'fs';

export type ConfigReducerState = {
	colorMap: {
		main: ForegroundColorName
	}
}


const getConfigReducerinitialState: (read?:boolean) => ConfigReducerState = (read:boolean = true) => {
	if (fs.existsSync('./storage/config.json') && read) {
		return (JSON.parse(fs.readFileSync("./storage/config.json", 'utf-8')))
	} else {
		//write program default state
		let output: ConfigReducerState = {
			colorMap: {
				main: 'green'
			}
		};

		fs.writeFileSync('./storage/config.json', JSON.stringify(output,null,2));

		return output;
	}
};

type ConfigReducerAction =
	| {
		type: 'cycleColor';
		which:
		| 'MAIN';
	} | {type:'nuke'} | {type:'nukeMacros'};

const configReducer = (
	state: ConfigReducerState,
	action: ConfigReducerAction,
): ConfigReducerState => {
	switch (action.type) {
		case 'cycleColor':
			switch (action.which) {
				case 'MAIN':
					return { ...state, colorMap: { ...state.colorMap, main: cycleColor(state.colorMap.main) } }
			}
		case 'nuke':
			const output = getConfigReducerinitialState(false);
			return output;
		default:
			return state
	}
};

export {
	getConfigReducerinitialState,
	configReducer,
	ConfigReducerAction,
};
