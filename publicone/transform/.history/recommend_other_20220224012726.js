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
                if (node.properties.id == 'recommend-module') {
                    var flag = true;
                    while (flag) {
                        var ifcome = find(node, (sonnode) => {
                            try {
                                return sonnode.properties.id == 'module-single';
                            } catch (e) {};
                        });
                        if (ifcome) {
                            node.children.pop();
                        } else {
                            flag = false;
                        }
                    }

                    for (var i = 0; i < cyclicData.length; i++) {
                        tree = h('div.glass#module-single', [h('p', { style: "font-weight: 500;" }, [h('img', { src: elementData.commonData[0], alt: "", style: "margin-right: 1.75rem;" }), cyclicData[i][0]]),
                            h('video', { src: cyclicData[i][1], style: "width: 100%;background: #686868;", controls: 'true', muted: 'true' }, ''),
                            h('div.remind_message', [h('p', { style: "font-weight: 500;" }, cyclicData[i][2]), h('p', { style: "font-size: 3.5rem; opacity: .7;" }, cyclicData[i][3])])
                        ]);
                        node.children.push(tree);
                    }


                }
            } catch (e) {};

        })
        console.log('recommend_other---ok!' + '**********trace.html(ready......)');
    })
    .use(rehypeStringify)



// 运行程序，开始执行转换器
process.stdin.pipe(stream(processorOne));

function prepare() {
    processorTwo
        .process(readSync('./md/common.md'))
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
        .process(readSync('./recommend_other.html'))
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