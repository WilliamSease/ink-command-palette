import {Dispatch, Fragment, useCallback} from 'react';
import {ConfigReducerState} from '../state/configReducer.js';
import React from 'react';
import {useInput, Text, Box, useApp} from 'ink';
import {MacroReducerState} from '../state/macroReducer.js';
import {
	NaviReducerAction,
	NaviReducerState,
} from '../state/navigationReducer.js';
import fs from 'fs';

type IProps = {
	config: ConfigReducerState;
	macros: MacroReducerState;
	navi: [NaviReducerState, Dispatch<NaviReducerAction>];
};

export const Macros = (props: IProps) => {
	const {macros, navi, config} = props;
	const {exit} = useApp();

	const [naviState, naviDispatch] = navi;

	const fire = useCallback(
		(vert: number) => {
			fs.writeFile(
				'./toRun',
				macros[naviState.macroNavi.page]?.macros[vert]?.command ?? '',
				() => exit(),
			);
		},
		[naviState.macroNavi.page],
	);

	useInput((input, key) => {
		if (key.downArrow) {
			naviDispatch({
				type: 'updateMacroNavi',
				payload: {vert: (naviState.macroNavi.vert + 1) % 10},
			});
		}
		if (key.upArrow) {
			naviDispatch({
				type: 'updateMacroNavi',
				payload: {
					vert:
						naviState.macroNavi.vert === 0 ? 9 : naviState.macroNavi.vert - 1,
				},
			});
		}
		if (key.leftArrow) {
			naviDispatch({
				type: 'updateMacroNavi',
				payload: {
					page:
						naviState.macroNavi.page === 0 ? 5 : naviState.macroNavi.page - 1,
				},
			});
		}
		if (key.rightArrow || key.tab) {
			naviDispatch({
				type: 'updateMacroNavi',
				payload: {page: (naviState.macroNavi.page + 1) % 6},
			});
		}
		if (input === 'E' || input === 'e') {
			naviDispatch({type: 'setEditMacro', payload: naviState.macroNavi});
		}
		if (input === 'C' || input === 'c') {
			naviDispatch({type: 'toggleConfigOpen'});
		}
		if (input >= '0' && input <= '9') {
			let toFire = parseInt(input);
			if (toFire === 0) {
				toFire = 9;
			} else {
				toFire = toFire - 1;
			}
			fire(toFire);
		}
		if (key.return) {
			fire(naviState.macroNavi.vert);
		}
	});

	return (
		<Fragment>
			<Text color={config.colorMap.main}> // Command Pallete \\</Text>
			<Box flexDirection="row">
				<Text>Page: </Text>
				{macros.map((page, idx) => (
					<Fragment key={idx}>
						<Text inverse={idx === naviState.macroNavi.page}>{`${
							page.title ?? idx
						}`}</Text>
						<Text> </Text>
					</Fragment>
				))}
			</Box>
			{macros[naviState.macroNavi.page]?.macros.map((macro, idx) => (
				<Box flexDirection="row" key={idx}>
					<Text color={macro.color}>{`${
						idx === naviState.macroNavi.vert ? '>' : ' '
					}${(idx + 1) % 10}) ${
						macro.title !== '' ? macro.title : macro.command
					}`}</Text>
				</Box>
			))}
			<Box flexDirection="row">
				<Text>(E)dit </Text>
				<Text>(C)onfig </Text>
				<Text>(Enter=Select) </Text>
				<Text>(Tab=Page) </Text>
				<Text>(Escape to Quit) </Text>
			</Box>
		</Fragment>
	);
};
