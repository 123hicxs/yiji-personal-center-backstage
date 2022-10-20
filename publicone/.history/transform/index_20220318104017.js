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
const html = template('index.art', { elementData, cyclicData }); //结合模板
// const processorOne = unified()
//     .use(remarkParse)
//     .use(() => (tree) => {
//         visit(tree, (node) => {
//             if (node.type == 'heading' && node.depth == 2) {
//                 elementData.title = node.children[0].value;
//                 elementData.abstractData = [];
//             }
//             if (node.type == 'heading' && node.depth == 6) {
//                 elementData.abstractData.push(node.children[0].value);
//             }
//             if (node.type == 'list') {
//                 var sonEle = [];

//                 visit(node, (sonNode) => {
//                     if (sonNode.type == 'text') {
//                         sonEle.push(sonNode.value);
//                     }
//                 })
//                 cyclicData.push(sonEle);
//             }
//         })
//         prepare();
//         console.log(elementData, cyclicData);
//         start();
//     })
//     .use(remarkStringify);

// const processorTwo = unified()
//     .use(remarkParse)
//     .use(() => (tree) => {
//         var tempArr = []
//         visit(tree, (node) => {

//             if (node.type == 'heading' && node.depth == 6) {
//                 tempArr.push(node.children[0].value);
//             }
//         })
//         elementData.commonData = tempArr;

//     })
//     .use(remarkStringify)

const processor = unified()
    .use(rehypeParse)
    .use(() => (tree, file) => {
        console.log(file);
    })
    .use(rehypeStringify)



function start() {
    processorThree
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