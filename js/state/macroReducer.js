import fs from 'fs';
const getMacroReducerinitialState = () => {
    if (fs.existsSync('./storage/macro.json')) {
        return (JSON.parse(fs.readFileSync("./storage/macro.json", 'utf-8')));
    }
    else {
        //write program default state
        let output = new Array(6).fill("").map((_val, idx) => ({
            title: `${idx}`,
            macros: new Array(10).fill("").map(() => ({
                title: undefined, command: undefined, color: 'white'
            }))
        }));
        fs.writeFileSync('./storage/macro.json', JSON.stringify(output));
        return output;
    }
};
const macroReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export { getMacroReducerinitialState, macroReducer, };
