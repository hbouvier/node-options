# Command line argument parser

This module is a command line wrapper around the npm module "pos". With it you
can use the POS tagger from the command line or start it as a REST Web Service.

The "pos" module  is maintained by Fortnight Labs.

#LICENSE:

This module is licensed under the Apache License v2.0

# Installation

npm install node-options

# Include this as a module in your own project

    var options = require('options');

    // To overwrite the default port (e.g. 3000), you can either use the
    // environment variable 'PORT=#' or invoke your script with the '--port=#'
    // on the command line. If you want your script to be more verbose invoke
    // it with the '--verbose' option.
    var opts =  {
                  "port"    : process.env.PORT | 3000,
                  "verbose" : false
                };

    // Remove the first two arguments, which are the 'node' binary and the name
    // of your script.
    var unknownArgs = options.parse(process.argv.slice(2), ops);

    // If an argument was passed on the command line, but was not defined in
    // the "opts" object, lets print the USAGE.
    if (unknownArgs) {
        if (opts.verbose) console.log('Unknown argument(s): "' + unknownArgs.join('", "') + '"');
        console.log('USAGE: [--port #] [--verbose]');
        process.exit(-1);
    }
