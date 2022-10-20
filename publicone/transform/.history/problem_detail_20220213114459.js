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
        let sex = elementData.abstractData[1];
        if (sex == '男') {
            let target = find(tree, (node) => {
                try { return node.properties.id == 'sex-girl'; } catch (e) {};
            })
            target.properties.style = "margin-right: 3rem;display:none;"
            target = find(tree, (node) => {
                try { return node.properties.id == 'sex-boy'; } catch (e) {};
            })
            target.properties.style = "margin-right: 3rem;"
        } else if (sex == '女') {
            let target = find(tree, (node) => {
                try { return node.properties.id == 'sex-boy'; } catch (e) {};
            })
            target.properties.style = "margin-right: 3rem;display:none;"
            target = find(tree, (node) => {
                try { return node.properties.id == 'sex-girl'; } catch (e) {};
            })
            target.properties.style = "margin-right: 3rem;"
        }
        visit(tree, (node) => {
            try {

                if (node.tagName == 'body') {
                    let target = find(node, { tagName: 'div' });
                    let middleDeal = find(node, (it) => {
                        try {
                            return it.properties.id == 'middle-deal';
                        } catch (e) {}
                    })
                    var flag = true;
                    while (flag) {
                        var ifcome = find(target, (it) => {
                            try {
                                return it.tagName == 'p' && it.properties.id == 'problem-description'
                            } catch (e) {}
                        });
                        if (ifcome) {
                            target.children.pop();
                            target.children.pop();
                            target.children.push(middleDeal);

                        } else {
                            target.children.pop();
                            flag = false;
                        }
                    }

                    for (var i = 0; i < cyclicData.length; i++) {
                        tree = h('p#problem-description', cyclicData[i][0]);
                        target.children.push(tree);
                    }
                    target.children.push(middleDeal);

                }

                if (node.properties.id == 'title') {
                    node.children[0].value = elementData.title;
                }

            } catch (e) {};

        })
        console.log('problem_detail---ok!' + '**********contact_us.html(ready......)');
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
        .process(readSync('problem_detail.html'))
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