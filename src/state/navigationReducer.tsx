export type NaviReducerState = {
	macroNavi: MacroLocation;
	editMacro?: MacroLocation;
	configOpen: boolean;
};

type MacroLocation = {
	page: number;
	vert: number;
};

const getNaviReducerinitialState: () => NaviReducerState = () => ({
	macroNavi: {page: 0, vert: 0},
	edit: undefined,
	configOpen: false,
});

type NaviReducerAction =
	| {
			type: 'updateMacroNavi';
			payload: Partial<MacroLocation>;
	  }
	| {type: 'setEditMacro'; payload: MacroLocation | undefined}
	| {type: 'toggleConfigOpen'};

const naviReducer = (
	state: NaviReducerState,
	action: NaviReducerAction,
): NaviReducerState => {
	switch (action.type) {
		case 'updateMacroNavi':
			return {
				...state,
				macroNavi: {
					...state.macroNavi,
					...action.payload,
				},
			};
		case 'setEditMacro':
			return {...state, editMacro: action.payload};
		case 'toggleConfigOpen':
			return {...state, configOpen: !state.configOpen};
		default:
			return state;
	}
};

export {getNaviReducerinitialState, naviReducer, NaviReducerAction};
