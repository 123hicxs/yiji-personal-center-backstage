$(() => {
    var cancel = $('.cancel'); //获取取消按钮;
    var inputCapture = $('.search-input input') //捕捉输入动作
    var flag = false; //是否显示取消按钮;
    var itemGlass = $('.glass'); //获取搜索结果
    cancel.on('click', () => {
        if (flag) {
            cancel.fadeIn(300);
        } else {
            inputCapture.val('');
            itemGlass.css('display', 'none');
            cancel.fadeOut(300);
        }

    })
    inputCapture.on('focus', () => {
        flag = true;
        cancel.click();

    })
    inputCapture.on('blur', () => {
        flag = false;
        cancel.click();
    })
    inputCapture.on('input', () => {

        if (inputCapture.val() == '') {
            itemGlass.css('display', 'none');
        } else {
            itemGlass.css('display', 'block');

        };
    })



})