import template from 'art-template'
import getData from './transform_data.js'
import commonDataInit from './transform_common_data.js'
import fs from 'fs'

//配置模板引擎

template.defaults.root = './art';
template.defaults.extname = '.art';
var commonData = commonDataInit();

export default function bbb(fileName) {
    var Data = getData(fileName); //初始化数据
    const elementData = Data.elementData //{}元素独立数据
    const cyclicData = Data.cyclicData //[]需要循环的数据

    const html = template(fileName, { elementData, cyclicData, commonData }); //结合模板
    //转换页面内容
    fs.writeFile('./' + fileName + '.html', html, () => {
        console.log('--------------**' + fileName + '.html **-------------ok!');
    })
}