#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App.js';
meow(`
	Usage
	  $ term-macros
	`, {
    importMeta: import.meta,
});
render(React.createElement(App, null));
