import { ForegroundColorName } from "chalk";

const colors: ForegroundColorName[] = [
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
export const cycleColor : (current: string) => ForegroundColorName = (current: string) =>
    colors[(colors.findIndex(fgc => fgc === current) + 1) % colors.length] ?? 'green';
