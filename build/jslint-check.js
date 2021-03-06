var JSLINT = require("./lib/jslint").JSLINT,
	src = require("fs").readFileSync("dist/jquery.qtip.js", "utf8");

JSLINT(src, { evil: true, forin: true, maxerr: 100 });

// All of the following are known issues that we think are 'ok'
// (in contradiction with JSLint) more information here:
// http://docs.jquery.com/JQuery_Core_Style_Guidelines
var ok = {
	"Expected an identifier and instead saw 'undefined' (a reserved word).": true,
	"Expected a conditional expression and instead saw an assignment.": true,
	"Expected an identifier and instead saw 'default' (a reserved word).": true,
	"Insecure '.'.": true,
	"Insecure '^'.": true,
	'Missing "use strict" statement.': true
};

var e = JSLINT.errors, found = 0, w;

for ( var i = 0; i < e.length; i++ ) {
	w = e[i];
	
	if (w && w.reason && w.evidence && !ok[ w.reason ] ) {
		console.log( "\n" + w.evidence + "\n" );
		console.log( "    Problem at line " + w.line + " character " + w.character + ": " + w.reason );
	}
}

if ( found > 0 ) {
	console.log( "\n" + found + " Error(s) found.\n" );
	
} else {
	console.log( "Success!\n" );
}
