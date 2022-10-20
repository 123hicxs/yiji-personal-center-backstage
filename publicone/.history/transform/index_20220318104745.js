import { stream } from 'unified-stream'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import rehypeParse from 'rehype-parse'
import remarkStringify from 'remark-stringify'
import { visit } from 'unist-util-visit'
import find from 'unist-util-find'
import { readSync, writeSync } from 'to-vfile'
import { reporter } from 'vfile-reporter'
import rehypeStringify from 'rehype-stringify'
import { h, s } from 'hastscript'
import template from 'art-template'
import getData from './transform_common.js'

//初始化数据
var Data = getData();
const elementData = Data.elementData //{}元素独立数据
const cyclicData = Data.cyclicData //[]需要循环的数据


//配置模板引擎
template.defaults.root = '../art';
template.defaults.extname = '.art';
const html = template('index.html', { elementData, cyclicData }); //结合模板



//定义转换器
const processor = unified()
    .use(rehypeParse)
    .use(() => (tree, file) => {
        // file.value
        console.log(file)
    })
    .use(rehypeStringify)


//开始执行
function start() {
    processor
        .process(readSync('../index.html'))
        .then(
            (file) => {
                console.error(reporter(file));
                writeSync(file);
            },
            (error) => {
                throw error;
            }
        )
}

//启动
start();