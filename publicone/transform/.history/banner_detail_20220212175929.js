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


const elementData = {}
const cyclicData = []

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
        prepare();
        start();
    })
    .use(remarkStringify);

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

const processorThree = unified()
    .use(rehypeParse)
    .use(() => (tree, file) => {
        visit(tree, (node) => {
            try {
                if (node.properties.id == 'title') {
                    node.children[0].value = elementData.title;
                }
                if (node.properties.id == 'detail-topic') {
                    node.children[0].value = elementData.abstractData[0];
                }
                if (node.properties.id == 'detail-remind') {
                    node.children[0].value = elementData.abstractData[1];
                }
                if (node.properties.id == 'detail-img') {
                    node.properties.src = elementData.abstractData[2];
                }
                if (node.properties.id == 'detail-description') {
                    var flag = true;
                    while (flag) {
                        var ifcome = find(node, (sonnode) => {
                            return sonnode.tagName == 'p';
                        });
                        if (ifcome) {
                            node.children.pop();
                        } else {
                            flag = false;
                        }
                    }

                    for (var i = 0; i < cyclicData.length; i++) {
                        tree = h('p.description-style', cyclicData[i][0]);
                        node.children.push(tree);
                    }
                }
            } catch (e) {};

        })
        console.log('banner_detail---ok!' + '**********recommend_other.html(ready......)')
    })
    .use(rehypeStringify)



// 运行程序，开始执行转换器
process.stdin.pipe(stream(processorOne));

function prepare() {
    processorTwo
        .process(readSync('common.md'))
        .then(
            (file) => {
                console.error(reporter(file));
            },
            (error) => {
                throw error;
            }
        )
}

function start() {
    processorThree
        .process(readSync('banner_detail.html'))
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