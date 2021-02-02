#!/usr/bin/env node
const path = require('path');
let { env, argv } = process;
let run = require('../src/index');
let configFilename = 'zpack.config.js';
let configFullPath = null;

// node ../bin/zpack.js --config zpack.dev.js --output --color


if(argv[2] === '--config'){
	configFilename = argv[3];
}

configFullPath = path.resolve(env.PWD, configFilename);
console.log(configFullPath);
run({
	_basedir : env.PWD,
	config : require(configFullPath)
});