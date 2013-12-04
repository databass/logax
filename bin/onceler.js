#!/usr/bin/env node
var util = require( "util" );
var Onceler = require( "./oncelernm" );
var argv = require('optimist').usage(
'Usage: $0 --cfgFile file').demand(
[ 'cfgFile', 'max' ]).describe(
'cfgFile',
'A json file with the text file globs and command to run.  See the template.').describe(
'max',
'The max number of files to process.  This is intended to run as a cron.').argv;

util.puts( "Begin onceler.js at " + new Date().toISOString() );

// trickery: onceler ctor needs a map. Map keys match argv keys!
var o1 = new Onceler(argv);
o1.process(function() {

	util.puts( "  End onceler.js at " + new Date().toISOString() );

});

