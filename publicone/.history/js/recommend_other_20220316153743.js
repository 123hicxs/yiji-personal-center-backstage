$(function() {
    var dc = document.getElementsByClassName('diagrama-carrusl'); //轮播图盒子
    var dcJquery = $(dc); //转换jquery
    var index = 1; //轮播图宽度(也作下标用)
    var cutList = document.querySelectorAll('.click-change>li'); //获取要切换的小点点
    var times = 2500; //轮播图切换延迟(单位：毫秒)
    var selectFlag = document.querySelectorAll('.nav'); //选定标签
    var flagContent = document.querySelector('.content-box'); //盒子内容
    var recommend = document.querySelectorAll('div#module-single'); //轮播图的单盒大小
    var recommendJquery = $(recommend); //转换jquery
    // var video = $('.video-css'); //更改video的样式

    //监听标签页点击
    $(selectFlag).on('click', 'a', cutFlag);
    //监听轮播图点击
    $(dc).on('click', '.content', () => {
        window.location.href = './banner_detail.html'
    });

    //监听轮播图手指滑动(停用)
    var xStart = 0;
    var yStart = 0;
    var sumX = 0;
    var lastX = 0;
    $(dc).on('touchstart', '.content', (e) => {
        xStart = e.targetTouches[0].pageX;
        yStart = e.targetTouches[0].pageY;
        lastX = e.targetTouches[0].pageX;
        clearInterval(cutImgInterval);
    })
    $(dc).on('touchmove', '.content', (e) => {
        sumX += (e.targetTouches[0].pageX - lastX);
        dcJquery.css('margin-left', parseFloat(dcJquery.css('margin-left')) + (e.targetTouches[0].pageX - lastX) + 'px');
        lastX = e.targetTouches[0].pageX;
    })
    $(dc).on('touchend', '.content', (e) => {
        if (sumX < -70) {
            cutDown();
        } else if (sumX > 70 && index > 1) {
            dcJquery.animate({
                marginLeft: -(index - 2) * 100 + '%'
            }, 600);
            for (let i = 0; i < cutList.length; i++) {
                cutList[i].style.background = "";
                if (i == index - 2) {
                    cutList[i].style.background = "#8E33CC";
                }
            }
            index -= 1;
        }
        dcJquery.css('margin-left', -index * 100 + '%');
        xStart = 0;
        yStart = 0;
        sumX = 0;
        lastX = 0;
        cutImgInterval = setInterval(() => {
            cutDown();
        }, times);
    })


    //商品推荐模块点击跳转
    $(recommend).each((i, dom) => {
        $(dom).on('click', () => {
            location.href = './found_detail.html'
        })
    });

    //轮播图启动
    cutImgInterval = setInterval(() => {
        cutDown();
    }, times);
    // //视频点击事件 (这么做不值得。。。)
    // var isPlay = true;
    // video.on('click', (e) => {

    //     if (isPlay) {
    //         $(e.currentTarget).trigger('pause').prop('controls', 'controls');
    //         isPlay = false;
    //     } else {
    //         alert('hahaah');
    //         $(e.currentTarget).trigger('play').prop('controls', '');
    //         isPlay = true;
    //     }
    //     e.stopPropagation();
    // })

    /*
    点击实现标签页切换
    */
    function cutFlag() {
        if ($(this).index() == 0) return;
        $(this).children('img').remove();
        $(this).siblings('a.select').removeClass('select').children('img').remove();

        $(this).addClass('select').append('<img src="./img/slider.png" alt="" class="slider">');
        /************* 后续效果等待添加 ************** */

        $(flagContent).animate({
            marginLeft: '-' + ($(this).index() - 1) * 100 + '%'
        }, 600)

    }



    /*
    实现动态效果
    */
    var flagLock = true;

    function cutDown() {
        if (flagLock) {
            flagLock = false;
            index += 1;

            if (index >= 5) {
                $(dc).css("margin-left", 0);
                index = 1;
            }
            for (let i = 0; i < cutList.length; i++) {
                cutList[i].style.background = "";
                if (i == index - 1) {
                    cutList[i].style.background = "#8E33CC";
                }
            }
            $(dc).animate({
                marginLeft: '-' + index * 100 + '%'
            }, 1000, () => { flagLock = true; })
        }
    }





});