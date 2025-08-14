import { Fragment, useMemo, useState } from "react";
import React from "react";
import { Box, Text, useApp, useInput } from 'ink';
import { cycleColor } from "../util/Colors.js";
import fs from 'fs';
export const EditMacro = (props) => {
    const { macros, navi, config } = props;
    const [macroState, macroDispatch] = macros;
    const [naviState, naviDispatch] = navi;
    if (naviState.editMacro === undefined)
        return React.createElement(Text, null);
    const activeMacro = useMemo(() => macroState[naviState.editMacro?.page ?? 0]?.macros[naviState.editMacro?.vert ?? 0], [macros, naviState]);
    const { exit } = useApp();
    const [field, setField] = useState(0);
    const [write, setWrite] = useState('rdy');
    const Selector = (props) => React.createElement(Text, null, `${props.field === props.active ? ">" : " "}`);
    useInput((_input, key) => {
        if (key.downArrow) {
            setField((prev) => prev === 5 ? 0 : prev + 1);
        }
        if (key.upArrow) {
            setField((prev) => prev === 0 ? 5 : prev - 1);
        }
        if (key.return) {
            switch (field) {
                case 2:
                    macroDispatch({ type: 'editMacro', payload: { macro: { color: cycleColor(activeMacro?.color ?? 'white') }, page: naviState.editMacro?.page ?? 0, entry: naviState.editMacro?.vert ?? 0 } });
                    break;
                case 4:
                    if (write === 'rdy') {
                        setWrite('wrt');
                        fs.rmSync('./storage/macro.json');
                        fs.writeFile('./storage/macro.json', JSON.stringify(macroState), (err) => {
                            if (err) {
                                setWrite('err');
                                setTimeout(() => setWrite('rdy'), 3000);
                            }
                            else {
                                setWrite('ok');
                                setTimeout(() => naviDispatch({ type: 'setEditMacro', payload: undefined }), 750);
                            }
                        });
                    }
                    break;
                case 5:
                    exit();
            }
        }
    });
    return React.createElement(Fragment, null,
        React.createElement(Text, { color: config.colorMap.main },
            " ",
            `// Editing macro at page ${naviState.editMacro.page} entry ${naviState.editMacro.vert} \\`,
            " "),
        React.createElement(Text, null, " "),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 0 }),
            React.createElement(Text, null, "Title:"),
            React.createElement(Text, null, activeMacro?.title)),
        React.createElement(Text, { color: 'gray' }, " If title is empty, command is displayed."),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 1 }),
            React.createElement(Text, null, "Command: "),
            React.createElement(Text, null, activeMacro?.command)),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 2 }),
            React.createElement(Text, null, "Color (Enter): "),
            React.createElement(Text, { color: activeMacro?.color }, activeMacro?.color)),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 3 }),
            React.createElement(Text, null, "Page Title: "),
            React.createElement(Text, null, macroState[naviState.editMacro.page]?.title ?? "")),
        React.createElement(Text, null),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 4 }),
            write === 'rdy' ? React.createElement(Fragment, null,
                React.createElement(Text, null, "Write Out & Go Back"),
                React.createElement(Text, { color: 'gray' }, " -- Write these changes to storage.")) :
                write === 'wrt' ? React.createElement(Text, { color: 'yellowBright' }, "Writing...") :
                    write === 'ok' ? React.createElement(Text, { color: 'greenBright' }, "Write OK!!!") :
                        React.createElement(Text, { color: 'redBright' }, "Error")),
        React.createElement(Box, null,
            React.createElement(Selector, { field: field, active: 5 }),
            React.createElement(Text, null, "Exit Program"),
            React.createElement(Text, { color: 'gray' }, " -- Kill the program immediately, nothing saved.")));
};
