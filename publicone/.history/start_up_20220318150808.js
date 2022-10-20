// node ./transform/index.js<./md/index.md
import path from "path"
import fs from 'fs'
import { exec } from 'child_process';
const __dirname = path.resolve();

const dir = __dirname + path.sep + 'transform';
const files = fs.readdirSync(dir);
var reg = /\w+.js$/i;


for (let file in files) {
    if (reg.test(files[file])) {
        let dian = files[file].indexOf('.');
        var cmd = 'node ' + '.' + path.sep + 'transform' + path.sep + files[file] + ' ' + '.' + path.sep + 'md' + path.sep + files[file].substring(0, dian) + '.md';
        exec(cmd, function(error, stdout, stderr) {
            console.log(stdout);
            if (error) {
                throw error;
            }
        });

    }
}