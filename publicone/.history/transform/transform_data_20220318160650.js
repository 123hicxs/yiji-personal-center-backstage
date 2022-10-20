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

//具体数据请查看数据格式。
const elementData = {} //元素独立数据   包含标题，摘要数据[]，公共数据[]。
const cyclicData = [] //需要循环的数据[[]]


//初始数据转换器
const processorOne = unified()
    .use(remarkParse)
    .use(() => (tree) => {
        visit(tree, (node) => {
            if (node.type == 'heading' && node.depth == 2) {
                elementData.title = node.children[0].value;
                elementData.abstractData = [];
            }
            if (node.type == 'heading' && node.depth == 6) {
                elementData.abstractData.push(node.children[0].value);
            }
            if (node.type == 'list') {
                var sonEle = [];

                visit(node, (sonNode) => {
                    if (sonNode.type == 'text') {
                        sonEle.push(sonNode.value);
                    }
                })
                cyclicData.push(sonEle);
            }
        })
    })
    .use(remarkStringify);


//公共数据转换器
const processorTwo = unified()
    .use(remarkParse)
    .use(() => (tree) => {
        var tempArr = []
        visit(tree, (node) => {
            if (node.type == 'heading' && node.depth == 6) {
                tempArr.push(node.children[0].value);
            }
        })
        elementData.commonData = tempArr;
    })
    .use(remarkStringify)





// 运行程序，开始执行转换器
function initData(fileName) {
    processorOne
        .process(readSync('./md/' + fileName + '.md'))
        .then(
            (file) => {
                console.error(reporter(file));
            },
            (error) => {
                throw error;
            }
        );
    processorTwo
        .process(readSync('./md/common/common.md'))
        .then(
            (file) => {
                // console.error(reporter(file));
            },
            (error) => {
                throw error;
            }
        )
    return { elementData, cyclicData };
}

//导出数据
export default initData;