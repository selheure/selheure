var exec = require('child_process').exec;

function runCommand (cmd, callback) {
    exec(cmd, function(err, stdout, stderr) {
        console.log(stdout);
        callback(err);
    });
}


module.exports = {
    before : ["properties", "modules", "attachments"],
    run : function(root, path, settings, doc, callback) {
        var e;
        if (settings.shell) {
            if( settings.shell instanceof Array){
                settings.shell.unshift("cd " + path);
                // chain commands: fail if one fails
                settings.shell = settings.shell.join(" && ")
            }
            runCommand(settings.shell, function(err){
                console.log(err)
                if (err && err.code != 0) {
                    callback(err.code, doc);
                } else {
                    callback(null, doc);
                }
            });
        }
    }
}
