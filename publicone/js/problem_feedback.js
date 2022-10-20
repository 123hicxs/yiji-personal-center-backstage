$(() => {
    var button = $('.submit'); //获取点击按钮
    var displayRemind = $('.submitSuccess'); //或许显示提醒框
    //点击绑定提交事件
    button.on('click', () => {
        displayRemind.css('display', 'block');
        setTimeout(() => {
            displayRemind.css('display', 'none');

        }, 2500);
    })


})