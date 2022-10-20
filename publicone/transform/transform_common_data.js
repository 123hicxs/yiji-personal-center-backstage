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

var commonData = []; //获取公共数据

//公共数据转换器
const processorTwo = unified()
    .use(remarkParse)
    .use(() => (tree) => {
        visit(tree, (node) => {
            if (node.type == 'heading' && node.depth == 6) {
                commonData.push(node.children[0].value);
            }
        })
    })
    .use(remarkStringify)

function initCommonData() {
    processorTwo
        .process(readSync('./md/common/common.md'))
        .then(
            (file) => {
                console.error(reporter(file));
            },
            (error) => {
                throw error;
            }
        )
    return commonData;
}

export default initCommonData;