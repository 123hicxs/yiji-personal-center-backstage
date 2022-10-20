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