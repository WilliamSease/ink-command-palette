import {Dispatch, Fragment, useMemo, useState} from 'react';
import {MacroReducerAction, MacroReducerState} from '../state/macroReducer.js';
import {
	NaviReducerAction,
	NaviReducerState,
} from '../state/navigationReducer.js';
import {ConfigReducerState} from '../state/configReducer.js';
import React from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import {cycleColor} from '../util/Colors.js';
import fs from 'fs';
import {Writer, WriteState} from '../components/Writer.js';
import {Selector} from '../components/Selector.js';
import TextInput from 'ink-text-input';

type IProps = {
	macros: [MacroReducerState, Dispatch<MacroReducerAction>];
	navi: [NaviReducerState, Dispatch<NaviReducerAction>];
	config: ConfigReducerState;
};

const actions = [
	'editTitle',
	'editCommand',
	'editColor',
	'editPageTitle',
	'writeOut',
	'exit',
];

export const EditMacro = (props: IProps) => {
	const {macros, navi, config} = props;
	const [macroState, macroDispatch] = macros;
	const [naviState, naviDispatch] = navi;
	const activeMacro = useMemo(
		() =>
			macroState[naviState.editMacro?.page ?? 0]?.macros[
				naviState.editMacro?.vert ?? 0
			],
		[macros, naviState],
	);
	const {exit} = useApp();

	const [field, setField] = useState(0);
	const [editing, setEditing] = useState<'title' | 'command' | 'pageTitle'>();
	const [write, setWrite] = useState<WriteState>('rdy');

	useInput((_input, key) => {
		if (key.downArrow) {
			setField(prev => (prev === actions.length - 1 ? 0 : prev + 1));
		}
		if (key.upArrow) {
			setField(prev => (prev === 0 ? actions.length : prev - 1));
		}
		if (key.return) {
			if (editing) setEditing(undefined);
			else
				switch (actions[field]) {
					case 'editTitle':
						setEditing('title');
						break;
					case 'editCommand':
						setEditing('command');
						break;
					case 'editPageTitle':
						setEditing('pageTitle');
						break;
					case 'editColor':
						macroDispatch({
							type: 'editMacro',
							payload: {
								macro: {color: cycleColor(activeMacro?.color ?? 'white')},
								page: naviState.editMacro?.page ?? 0,
								entry: naviState.editMacro?.vert ?? 0,
							},
						});
						break;
					case 'writeOut':
						if (write === 'rdy') {
							setWrite('wrt');
							fs.rmSync('./storage/macro.json');
							fs.writeFile(
								'./storage/macro.json',
								JSON.stringify(macroState, null, 2),
								err => {
									if (err) {
										setWrite('err');
										setTimeout(() => setWrite('rdy'), 3000);
									} else {
										setWrite('ok');
										setTimeout(
											() =>
												naviDispatch({
													type: 'setEditMacro',
													payload: undefined,
												}),
											750,
										);
									}
								},
							);
						}
						break;
					case 'exit':
						exit();
				}
		}
	});

	return (
		<Fragment>
			{editing ? (
				<TextInput
					value={
						editing === 'command'
							? activeMacro!.command
							: editing === 'title'
							? activeMacro!.title
							: macroState[naviState.editMacro?.page ?? 0]!.title ?? ''
					}
					onChange={val => {
						if (editing === 'title' || editing === 'command')
							macroDispatch({
								type: 'editMacro',
								payload: {
									macro: editing === 'title' ? {title: val} : {command: val},
									page: naviState.editMacro?.page ?? 0,
									entry: naviState.editMacro?.vert ?? 0,
								},
							});
						else if (editing === 'pageTitle') {
							macroDispatch({
								type: 'editPageTitle',
								payload: {newTitle: val, page: naviState.macroNavi.page},
							});
						}
					}}
				/>
			) : (
				<Fragment>
					<Text color={config.colorMap.main}>
						{' '}
						{`// Editing macro at page ${naviState.editMacro?.page} entry ${naviState.editMacro?.vert} \\\\`}{' '}
					</Text>
					<Text> </Text>
					<Box>
						<Selector field={actions[field]} active={actions[0]} />
						<Text>
							Title: {activeMacro?.title.slice(0, 40)}
							{(activeMacro?.title.length ?? 0) > 40 ? '(MORE)' : ''}
						</Text>
					</Box>
					<Text color={'gray'}> If title is empty, command is displayed.</Text>
					<Box>
						<Selector field={actions[field]} active={actions[1]} />
						<Text>
							Command: {activeMacro?.command.slice(0, 40) ?? ''}
							{(activeMacro?.command.length ?? 0) > 40 ? '(MORE)' : ''}
						</Text>
					</Box>
					<Text color={'gray'}>
						{' '}
						Command is run relative to your working directory.
					</Text>
					<Box>
						<Selector field={actions[field]} active={actions[2]} />
						<Text>Color: </Text>
						<Text color={activeMacro?.color}>{activeMacro?.color}</Text>
					</Box>
					<Box>
						<Selector field={actions[field]} active={actions[3]} />
						<Text>
							Page Title:{' '}
							{macroState[naviState.editMacro?.page ?? 0]?.title.slice(0, 40) ??
								''}
							{(macroState[naviState.editMacro?.page ?? 0]?.title.length ?? 0) >
							40
								? '(MORE)'
								: ''}
						</Text>
					</Box>
					<Text> </Text>
					<Box>
						<Selector field={actions[field]} active={actions[4]} />
						{<Writer write={write} />}
					</Box>
					<Box>
						<Selector field={actions[field]} active={actions[5]} />
						<Text>Exit Program</Text>
						<Text color={'gray'}>
							{' '}
							-- Kill the program immediately, nothing saved.
						</Text>
					</Box>
				</Fragment>
			)}
		</Fragment>
	);
};
