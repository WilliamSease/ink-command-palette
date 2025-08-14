import fs from 'fs';
// Define the shape of your state
const colors = [
    'black',
    'blackBright',
    'blue',
    'blueBright',
    'cyan',
    'cyanBright',
    'gray',
    'green',
    'greenBright',
    'grey',
    'magenta',
    'magentaBright',
    'red',
    'redBright',
    'white',
    'whiteBright',
    'yellow',
    'yellowBright',
];
export const cycleColor = (current) => colors[(colors.findIndex(fgc => fgc === current) + 1) % colors.length] ?? 'green';
// Define your initial state
const getGlobalReducerinitialState = () => {
    return ({ config: {
            colorMap: JSON.parse(fs.readFileSync("./config/colorMap.json", 'utf-8'))
        } });
};
// Define your reducer function
const globalReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
export { getGlobalReducerinitialState, globalReducer, };
