$(() => {
    var agreement = $('.agreement p>span'); //获取勾勾。
    var flag = true; //是否勾勾。
    agreement.on('click', (e) => {
        flag = !flag;
        if (flag) {
            e.currentTarget.style.backgroundColor = "#5D2DFD";
        } else {
            e.currentTarget.style.backgroundColor = "";
        }
    })


})