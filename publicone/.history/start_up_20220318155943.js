import path from "path"
import fs from 'fs'
import transform from './transform/transform_model.js'
//匹配每一个md文件名
const __dirname = path.resolve();
const dir = __dirname + path.sep + 'md';
const files = fs.readdirSync(dir);
const reg = /\w+.md$/i;

//启动脚本
for (let file in files) {
    if (reg.test(files[file])) {
        let dian = files[file].indexOf('.');
        let fileName = files[file].substring(0, dian);
        transform(fileName);
    }
}