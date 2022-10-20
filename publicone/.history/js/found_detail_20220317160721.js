$(() => {
    var videoImgs = $('video,img'); //获取视频和图片数量
    var videoImgBox = $('.video-img-box'); //获取要根据videoImgs数量调整的元素
    var greaterEle = $('.greater'); //获取是否放大的元素，控制其显示或隐藏
    var pages = $('.pages'); //获取页码数元素
    var headGreater = $('.head-greater'); //获取要放大的头像
    var myHead = $('.head'); //获取头像
    var myContent = $('.found-detail'); //获取页面主要内容

    //绑定头像点击事件--进行放大
    let isHead = true;
    myHead.on('click', () => {
        if (isHead) {

            headGreater.css('display', 'block');
            myContent.css('display', 'none');

            isHead = false;
        } else {
            headGreater.css('display', 'none');
            isHead = true;

        }
    })
    headGreater.on('click', () => {
        headGreater.css('display', 'none');
        myContent.css('display', 'block');
        isHead = true;
    })


    //页面开始初始化
    init();

    /*
    实现页面初始化，使之可以放大化页面中的视频和图片
    */
    function init() {
        var videoImgId = 0; //元素id号，方便锁定目标元素
        let length = videoImgs.length;
        length -= 6;
        videoImgBox.css('width', (length - 1) * 100 + '%');
        videoImgs.each((i, dom) => {
            if (dom.id == 'no-img') return;

            //将页面中的video与Img动态提取出来放到放大盒子中
            let videoImgElement = $(document.createElement('div'));
            videoImgElement.addClass('greater-video');
            $(dom).prop('id', videoImgId++);
            let domClone = $(dom).clone();
            videoImgElement.append(domClone);
            videoImgBox.css('margin-left', -dom.id * 100 + '%');
            pages.text(dom.id * 1 + 1 + '/' + (length - 1));
            //点击视频与图片元素，打开放大效果
            $(dom).on('click', (e) => {
                greaterEle.css('display', 'block');
                myContent.css('display', 'none');

            })

            //实现移动端滑动效果
            let xStart = 0;
            let yStart = 0;
            let sumX = 0;
            let lastX = 0;
            domClone.prop('controls', 'controls');
            videoImgElement.on('touchstart', 'video,img', (e) => {

                xStart = e.targetTouches[0].pageX;
                yStart = e.targetTouches[0].pageY;
                lastX = e.targetTouches[0].pageX;

            });

            videoImgElement.on('touchmove', 'video,img', (e) => {
                sumX += (e.targetTouches[0].pageX - lastX);
                videoImgBox.css('margin-left', parseInt(videoImgBox.css('margin-left')) + (e.targetTouches[0].pageX - lastX) + 'px');
                lastX = e.targetTouches[0].pageX;
            });
            videoImgElement.on('touchend', 'video,img', (e) => {
                if (sumX < -70 && e.target.id < length - 2) {
                    videoImgBox.animate({
                        marginLeft: -(parseInt(e.target.id) + 1) * 100 + '%'
                    }, 600);
                    pages.text(dom.id * 1 + 2 + '/' + (length - 1));

                } else if (sumX > 70 && e.target.id > 0) {
                    videoImgBox.animate({
                        marginLeft: -(e.target.id - 1) * 100 + '%'
                    }, 600);
                    pages.text(dom.id * 1 + '/' + (length - 1));

                }
                videoImgBox.css('margin-left', -e.target.id * 100 + '%');
                xStart = 0;
                yStart = 0;
                sumX = 0;
                lastX = 0;
            });
            //点击其他部分退出放大模式
            greaterEle.on('click', () => {
                greaterEle.css('display', 'none');
                myContent.css('display', 'block');

            })

            videoImgBox.append(videoImgElement);
        })

    }



})