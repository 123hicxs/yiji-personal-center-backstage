import template from 'art-template'
import getData from './transform_common.js'
import fs from 'fs'

//初始化数据
var Data = getData();
const elementData = Data.elementData //{}元素独立数据
const cyclicData = Data.cyclicData //[]需要循环的数据
let fileName = 'contact_us' //文件关键字

//配置模板引擎
template.defaults.root = './art';
template.defaults.extname = '.art';
const html = template(fileName, { elementData, cyclicData }); //结合模板
//转换页面内容
fs.writeFile('./' + fileName + '.html', html, () => {
    console.log('--------------**' + fileName + '.html **-------------ok!');
})