import { Fragment, useState } from "react";
import React from "react";
import { Text, useInput } from 'ink';
export const EditMacro = (props) => {
    const { macros, navi, config } = props;
    const [_macroState] = macros;
    const [naviState] = navi;
    if (naviState.editMacro === undefined)
        return React.createElement(Text, null);
    const [field, setField] = useState(0);
    const Selector = (props) => React.createElement(Text, null, `${props.field === props.active ? ">" : " "}`);
    useInput((_input, key) => {
        if (key.downArrow) {
            setField((prev) => prev === 4 ? 0 : prev + 1);
        }
        if (key.upArrow) {
            setField((prev) => prev === 0 ? 4 : prev - 1);
        }
    });
    return React.createElement(Fragment, null,
        React.createElement(Text, { color: config.colorMap.main },
            " ",
            `// Editing macro at page ${naviState.editMacro.page} entry ${naviState.editMacro.vert} \\`,
            " "),
        React.createElement(Text, null, " "),
        React.createElement(Selector, { field: field, active: 0 }),
        React.createElement(Selector, { field: field, active: 1 }),
        React.createElement(Selector, { field: field, active: 2 }),
        React.createElement(Selector, { field: field, active: 3 }),
        React.createElement(Selector, { field: field, active: 4 }));
};
