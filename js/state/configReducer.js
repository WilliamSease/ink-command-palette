import fs from 'fs';
const getConfigReducerinitialState = () => {
    return (JSON.parse(fs.readFileSync("./storage/config.json", 'utf-8')));
};
const configReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export { getConfigReducerinitialState, configReducer, };
