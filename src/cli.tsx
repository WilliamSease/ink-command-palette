#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './App.js';

meow(
	`
	Usage
	  $ use ./run.sh.
	`,
	{
		importMeta: import.meta,
	},
);

render(<App />);
