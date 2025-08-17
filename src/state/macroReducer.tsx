import {ForegroundColorName} from 'chalk';
import fs from 'fs';

type Macro = {
	title: string;
	command: string;
	color: ForegroundColorName;
};

export type MacroReducerState = {
	title: string;
	macros: Macro[];
}[];

const getMacroReducerinitialState: (read?: boolean) => MacroReducerState = (
	read = true,
) => {
	if (fs.existsSync('./storage/macro.json') && read) {
		return JSON.parse(fs.readFileSync('./storage/macro.json', 'utf-8'));
	} else {
		//write program default state
		let output: MacroReducerState = new Array(6).fill('').map((_val, pidx) => ({
			title: `${pidx}`,
			macros: new Array(10).fill('').map((_val, midx) =>
				pidx === 0 && midx === 0
					? {
							title: 'Example Script',
							command: "echo hello world!",
							color: 'greenBright',
					  }
					: {
							title: '',
							command: '',
							color: 'white',
					  },
			),
		}));

		fs.writeFileSync('./storage/macro.json', JSON.stringify(output, null, 2));

		return output;
	}
};

type MacroReducerAction =
	| {
			type: 'editMacro';
			payload: {macro: Partial<Macro>; page: number; entry: number};
	  }
	| {type: 'editPageTitle'; payload: {page: number; newTitle: string}}
	| {type: 'nuke'};

const macroReducer = (
	state: MacroReducerState,
	action: MacroReducerAction,
): MacroReducerState => {
	switch (action.type) {
		case 'editMacro':
			return state.map((page, pidx) => {
				if (pidx === action.payload.page) {
					return {
						title: page.title,
						macros: page.macros.map((macro, midx) => {
							if (midx === action.payload.entry) {
								return {...macro, ...action.payload.macro};
							} else return macro;
						}),
					};
				} else return page;
			});
		case 'editPageTitle':
			return state.map((page, pidx) => {
				if (pidx === action.payload.page) {
					return {
						title: action.payload.newTitle,
						macros: page.macros,
					};
				} else return page;
			});
		case 'nuke':
			const output = getMacroReducerinitialState(false);
			return output;
		default:
			return state;
	}
};

export {getMacroReducerinitialState, macroReducer, MacroReducerAction};
