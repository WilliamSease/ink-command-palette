const getNaviReducerinitialState = () => ({
    macroNavi: { page: 0, vert: 0 },
    edit: undefined,
    configOpen: false
});
const naviReducer = (state, action) => {
    switch (action.type) {
        case 'updateMacroNavi':
            return { ...state,
                macroNavi: {
                    ...state.macroNavi,
                    ...action.payload,
                }
            };
        case 'setEditMacro':
            return { ...state,
                editMacro: action.payload
            };
        case 'toggleConfigOpen':
            return { ...state, configOpen: !state.configOpen };
        default:
            return state;
    }
};
export { getNaviReducerinitialState, naviReducer, };
