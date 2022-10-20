$(() => {
    var agreement = $('.agreement p>span'); //获取勾勾。
    var flag = false; //是否勾勾。
    agreement.on('click', (e) => {
        flag = !flag;
        if (flag) {
            e.currentTarget.style.backgroundColor = "#FF7A1F";
        } else {
            e.currentTarget.style.backgroundColor = "";
        }
    })


})