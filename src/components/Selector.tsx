import {Text} from 'ink';
import React from 'react';

export const Selector = (props: {field?: string; active?: string}) => (
	<Text>{`${props.field === props.active ? '>' : ' '}`}</Text>
);
