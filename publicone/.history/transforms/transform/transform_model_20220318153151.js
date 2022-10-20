import template from 'art-template'
import getData from './transform_common.js'
import fs from 'fs'

//配置模板引擎

template.defaults.root = './art';
template.defaults.extname = '.art';


export default function bbb(file) {
    let fileName = file //文件关键字
    var Data = getData(); //初始化数据
    const elementData = Data.elementData //{}元素独立数据
    const cyclicData = Data.cyclicData //[]需要循环的数据

    const html = template(fileName, { elementData, cyclicData }); //结合模板
    //转换页面内容
    fs.writeFile('./' + fileName + '.html', html, () => {
        console.log('--------------**' + fileName + '.html **-------------ok!');
    })
}