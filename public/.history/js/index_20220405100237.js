$(() => {

    $(function() {
        if (navigator.userAgent.match(/mobile/i)) {} else {
            start();
        }
    })

    function start() {
        let ppsjb = $('.department li:nth-child(2)');
        let behind = $('.behind');
        let bg = $('.bg-box');
        let magicFontImg = $('#magic-never-define');
        let chair = $('.chair');
        let chairBox = $('.chair-empty-box');
        let abstract = $('.abstract');
        let abstractBox = $('.abstract-empty-box');
        let positionFlag = $('.content-left');
        let d = $(document);

        $(bg).animate({
            width: '100%',
        }, 350)


        ppsjb.on('mouseover', () => {
            behind.css('display', 'block');
        })
        let magicFlag = true;
        let chairSwitch = true;
        let abstractSwitch = true;
        let lis = positionFlag.children('li');


        lis.each((index, dom) => {
            $(dom).on('mouseover', 'i', () => {
                $(dom).addClass('now-li');

            })
            $(dom).on('mouseleave', 'i', () => {
                $(dom).removeClass('now-li');
                if (d.scrollTop() > 1900 && index == 1) {
                    $(dom).addClass('now-li');

                }

            })

        })



        d.on('scroll', () => {
            if (d.scrollTop() > 70 && magicFlag) {
                $(magicFontImg).animate({
                    width: '90%'
                }, 450)
                $(bg).animate({
                    width: '102%',
                    marginLeft: '-1%'
                }, 350)

                magicFlag = false;
            }
            if (d.scrollTop() > 500 && chairSwitch) {
                chairBox.css('display', 'none');

                chair.fadeIn(350);
                chair.animate({
                    marginTop: '30rem'
                }, 200)


                chairSwitch = false;
            }
            if (d.scrollTop() > 1200 && abstractSwitch) {
                abstractBox.css('display', 'none');
                abstract.fadeIn(350);
                abstract.animate({
                    marginTop: '15rem',
                    fontSize: '12rem'
                }, 200)

                abstractSwitch = false;
            }
            if (d.scrollTop() < 1900) {
                lis.each((index, dom) => {
                    $(dom).removeClass('now-li');
                    if (index == 0) {
                        $(dom).addClass('now-li');

                    }
                })
            }
            if (d.scrollTop() > 1900) {
                lis.each((index, dom) => {
                    $(dom).removeClass('now-li');
                    if (index == 1) {
                        $(dom).addClass('now-li');

                    }
                })
            }
        })
    }
})