module.exports = function () {
        
    /**
     * Process the arguments received on the command line.
     * 
     * @param args: an array of arguments to be process. Use 
     *              process.argv.slice(2) to remove the process "node" and the
     *              name of the script "tagger.js" from the arguments before
     *              calling parse().
     * @param options: an object containing all the valid "options" that can be
     *                 passed on the command line.
     * 
     * @returns an object with the following properties:
     *      "args" : an Array with all the arguments remaining after the last
     *                  options (e.g --option) parsed
     *      "errors" : an Array with all the arguments found after the "remains"
     *                 (e.g -op1 -opt2 file.ext -opt3 -> errors = ['-opt3'])
     *      "end" : all the arguments found after "--" 
     */
    function parse(args, options) {
        var errors  = null,
            remains = [],
            passThrough = null,
            regex   = /^--(\s*[^=\s]+)(?:\s*=(.*))?$/;
            
        args.forEach(function (val, index, array) {
            if (errors) {
                errors.push(val);
            } else if (passThrough) {
                passThrough.push(val);
            } else if (val === '--') {
                passThrough = [];
            } else {
                var capture = val.match(regex);
                // Make sure we capture an 'option' and that it is part of the 'options' object (valid)
                if (capture !== null && capture.length === 3 && capture[1] !== undefined && options.hasOwnProperty(capture[1])) {
                    if (remains.length > 0) {
                        errors = remains;
                        remains = [];
                    } else {
                        if (capture[2] !== undefined) { // we have an ='something'
                            options[capture[1]] = capture[2];
                        } else { // Assume it is a boolean toggle
                            options[capture[1]] = !options[capture[1]];
                        }
                    }
                } else {
                    remains.push(val);
                }
            }
        });
        
        return {
            "errors" : errors,
            "args"   : remains,
            "end"    : passThrough
        };
    }
    
    return {
        "parse" : parse
    };
}();
