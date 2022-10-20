const elementData = {}
const cyclicData = []
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
        prepare();
        start();
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