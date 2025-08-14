import { ForegroundColorName } from 'chalk';
import fs from 'fs';

export type MacroReducerState = {
    title?: string,
    macros: {
        title?: string,
        command?: string,
        color?: ForegroundColorName
    }[]

}[]


const getMacroReducerinitialState: () => MacroReducerState = () => {
    if (fs.existsSync('./storage/macro.json')) {
        return (JSON.parse(fs.readFileSync("./storage/macro.json", 'utf-8')))
    } else {
        //write program default state
        let output: MacroReducerState = new Array(6).fill("").map((_val, idx) => ({
            title: `${idx}`,
            macros: new Array(10).fill("").map(() => ({
                title: undefined, command: undefined, color: 'white'
            }))
        }));

        fs.writeFileSync('./storage/macro.json',JSON.stringify(output));

        return output;
    }
};

type MacroReducerAction =
    | {
        type: '';

    };

const macroReducer = (
    state: MacroReducerState,
    action: MacroReducerAction,
): MacroReducerState => {
    switch (action.type) {
        default:
            return state
    }
};

export {
    getMacroReducerinitialState,
    macroReducer,
    MacroReducerAction,
};
