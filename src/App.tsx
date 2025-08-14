import { Box, useInput, useStdout, Text, useApp } from 'ink';
import React, { useReducer } from 'react';
import { configReducer, getConfigReducerinitialState } from './state/configReducer.js';
//import fs from 'fs';
import { Macros } from './screens/Macros.js';
import { getMacroReducerinitialState, macroReducer } from './state/macroReducer.js';
import { getNaviReducerinitialState, naviReducer } from './state/navigationReducer.js';
import { EditMacro } from './screens/EditMacro.js';

export default function App() {
	const { exit } = useApp();
	const { stdout } = useStdout();
	const [config] = useReducer(configReducer, getConfigReducerinitialState());
	const [macros, macroDispatch] = useReducer(macroReducer, getMacroReducerinitialState());
	const [navi, naviDispatch] = useReducer(naviReducer, getNaviReducerinitialState())

	useInput((_input, key) => {
		if (key.escape) {
			// fs.writeFile('./toRun', 'echo Hello from your macro!',() => exit());
			exit();
		}
	});



	return (
		stdout.rows >= 15 ? <Box
			flexDirection="column"
			height={15}
			borderStyle={'classic'}
		>
			{navi.configOpen ?
				<Text></Text> :
				navi.editMacro !== undefined ?
					<EditMacro config={config} macros={[macros,macroDispatch]} navi={[navi, naviDispatch]}/> :
					<Macros config={config} macros={macros} navi={[navi, naviDispatch]} />}

		</Box> : <Text>Expand Terminal to 15 rows ~please~</Text>
	);
}
