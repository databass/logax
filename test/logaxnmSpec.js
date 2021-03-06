var fs = require('fs');
var Logax = require('../bin/logaxnm.js');

describe('Logax constructor', function() {

	it('should throw an exception when not all args passed.', function() {
		expect(function() {
			new Logax({
				parserFile : "abc.js",
				input : "in.log"
			});
		}).toThrow();
	});
});

describe('Logax parse', function() {
	var FOOLOG_OUTPUT = {
		"jobId" : "12345",
		"email" : "abc@abc.com",
		"logVersion" : "1.0.0",
		"startAt" : "2013-11-26T18:50:43.000Z",
		"area" : 7194601,
		"elapsedTime" : "1000",
		"endAt" : "2013-11-26T18:50:44.000Z"
	};
	var asyncFinished = false;
	var fileData = "";
	var l2 = new Logax({
		parserFile : 'test/foolog/foolog_parser.js',
		input : 'test/foolog/foolog1.log',
		output : 'test/output/foolog1.json'
	});
	l2.parse(function() {
		asyncFinished = true;
	});

	it('should create a json file', function() {
		waitsFor(function() {
			return asyncFinished;
		}, "logax.parse never completed.  Check for missing callback.", 10000);

		runs(function() {
			var exists = fs.existsSync('test/output/foolog1.json');
			expect(exists).toEqual(true);
		});
	});

	it('should output the correct json', function() {
		waitsFor(function() {
			return asyncFinished;
		}, "logax.parse never completed.  Check for missing callback.", 10000);

		runs(function() {
			fileData = fs.readFileSync('test/output/foolog1.json');
			expect(JSON.parse(fileData)).toEqual(FOOLOG_OUTPUT);
		});
	});

});
