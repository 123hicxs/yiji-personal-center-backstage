import path from "path"
import fs from 'fs'
import transform from './transform/transform_model.js'
const __dirname = path.resolve();
const dir = __dirname + path.sep + 'md';
const files = fs.readdirSync(dir);
var reg = /\w+.md$/i;


for (let file in files) {
    if (reg.test(files[file])) {
        let dian = files[file].indexOf('.');
        let fileName = files[file].substring(0, dian);
        transform(fileName);
    }
}