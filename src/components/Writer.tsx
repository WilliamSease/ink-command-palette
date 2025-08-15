import {Fragment} from 'react';

import React from 'react';
import {Text} from 'ink';

export type WriteState = 'rdy' | 'wrt' | 'ok' | 'err';

export const Writer = (props: {write: WriteState}) => {
	return props.write === 'rdy' ? (
		<Fragment>
			<Text>Write Out & Go Back</Text>
			<Text color={'gray'}> -- Write these changes to storage.</Text>
		</Fragment>
	) : props.write === 'wrt' ? (
		<Text color={'yellowBright'}>Writing...</Text>
	) : props.write === 'ok' ? (
		<Text color={'greenBright'}>Write OK!!!</Text>
	) : (
		<Text color={'redBright'}>Error</Text>
	);
};
