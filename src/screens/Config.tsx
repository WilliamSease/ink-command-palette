import {Dispatch, Fragment, useState} from 'react';
import {
	NaviReducerAction,
	NaviReducerState,
} from '../state/navigationReducer.js';
import {
	ConfigReducerAction,
	ConfigReducerState,
} from '../state/configReducer.js';
import React from 'react';
import {Box, Text, useApp, useInput} from 'ink';
//import TextInput from 'ink-text-input';
import fs from 'fs';
import path from 'path';
import {Writer} from '../components/Writer.js';
import {Selector} from '../components/Selector.js';

type IProps = {
	navi: [NaviReducerState, Dispatch<NaviReducerAction>];
	config: [ConfigReducerState, Dispatch<ConfigReducerAction>];
};

const actions = ['mainColor', 'writeOut', 'exit', 'openAbout'];

export const Config = (props: IProps) => {
	const {navi, config} = props;
	const [configState, configDispatch] = config;
	const [, naviDispatch] = navi;
	const {exit} = useApp();

	const [field, setField] = useState(0);
	const [write, setWrite] = useState<'rdy' | 'wrt' | 'ok' | 'err'>('rdy');

	useInput((_input, key) => {
		if (key.downArrow) {
			setField(prev => (prev === actions.length - 1 ? 0 : prev + 1));
		}
		if (key.upArrow) {
			setField(prev => (prev === 0 ? actions.length : prev - 1));
		}
		if (key.return) {
			switch (actions[field]) {
				case 'mainColor':
					configDispatch({type: 'cycleColor', which: 'MAIN'});
					break;
				case 'writeOut':
					if (write === 'rdy') {
						setWrite('wrt');
						fs.rmSync('./storage/config.json');
						fs.writeFile(
							'./storage/config.json',
							JSON.stringify(configState, null, 2),
							err => {
								if (err) {
									setWrite('err');
									setTimeout(() => setWrite('rdy'), 3000);
								} else {
									setWrite('ok');
									setTimeout(
										() => naviDispatch({type: 'toggleConfigOpen'}),
										750,
									);
								}
							},
						);
					}
					break;
				case 'exit':
					exit();
					break;
				case 'openAbout':
					fs.writeFile(
						'./toRun',
						'xdg-open https://williamsease.github.io',
						() => exit(),
					);
			}
		}
	});

	return (
		<Fragment>
			<Text color={configState.colorMap.main}>
				{' '}
				{`// Editing config \\\\`}{' '}
			</Text>
			<Text> </Text>
			<Box>
				<Selector field={actions[field]} active={actions[0]} />
				<Text>Main Color (Enter): </Text>
				<Text color={configState.colorMap.main}>
					{configState.colorMap.main}
				</Text>
			</Box>
			<Text> </Text>
			<Box>
				<Selector field={actions[field]} active={actions[1]} />
				<Writer write={write} />
			</Box>
			<Box>
				<Selector field={actions[field]} active={actions[2]} />
				<Text>Exit Program</Text>
				<Text color={'gray'}>
					{' '}
					-- Kill the program immediately, nothing saved.
				</Text>
			</Box>
			<Text> </Text>
			<Text> </Text>
			<Box>
				<Selector field={actions[field]} active={actions[3]} />
				<Text>Ink Command Pallete -- William Sease 2025 (MORE)</Text>
			</Box>
			<Text> </Text>
			<Text>{` backup your config at:`}</Text>
			<Text>{` ${path.resolve('./storage')}`}</Text>
		</Fragment>
	);
};
