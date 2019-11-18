(function($) {
    var f_name = 'netflix_slider';

    $.fn.init[f_name] = function(element, options) {
        var original_width = 0;
        if ($(window).width() >= 550) {
            original_width = '250px';
        } else {
            original_width = '190px';
        }
        var def = {
            width: false,
            ratio: 1,
            url: [],
            width: original_width

        };
        options = $.extend(def, options);
        // alert(options.bella);
        let _originalWidth = parseFloat(original_width);
        var e_width = options['width'];
        var parent = $($(element).find(".slider"));
        var elements = parent.find('.element');
        var videourl = new Array();

        for (let i = 0; i < elements.length; i++) {
            let el = $(elements[i]);
            let source = el.find("video source").get(0);
            // console.log(source.src);
            videourl.push(source.src);
        }
        const delay = 200;
        var allT = 0;
        var scroll_elements = 0;
        var max_scr = 0;

        function translateX(el, X, anim = true) {
            if (anim) {
                $(el).css({
                    transitionDelay: delay + "ms"
                });
            } else {
                $(el).css({
                    transitionDelay: 0 + "ms"
                });
            }
            $(el).css('transform', 'translateX(' + X + 'px)');

        }
        if (elements.length > 0 && videourl.length > 0) {

            function putFocus(el, p, action, min) {
                el = $(el);
                var tr = ((w * 0.5) / 2);
                const movement = ((w * 0.5) / 2);
                var lg_max = elements.length;
                var lg_min = 0;

                if (scroll_elements < max_scr) {
                    lg_max = (scroll_elements + 1) * min;

                    lg_min = (scroll_elements) * min;
                }

                if ((p + 1) % min == 0 && max_scr > 0) {
                    n_button.toggleClass('visible');
                    if ((p + 1) == pi) {
                        lg_min = 0;
                        if (action) {
                            allT += movement;
                            translateX(parent, allT);
                        } else {
                            allT -= movement;
                            translateX(parent, allT);
                        }
                    } else {

                        lg_max = elements.length;

                        if (action) {
                            allT -= movement;
                            translateX(parent, allT);
                        } else {
                            allT += movement;
                            translateX(parent, allT);
                        }
                    }
                }

                if (max_scr == scroll_elements && r_elements != min) {
                    var tp = ((scroll_elements) * min) + r_elements;

                    if (p == tp) {
                        p_button.toggleClass('visible');
                        lg_min = 0;
                        if (action) {
                            allT += movement;
                            translateX(parent, allT);
                        } else {
                            allT -= movement;
                            translateX(parent, allT);
                        }
                    }
                }
                if (((p + 1) % (min)) == 0 && max_scr > 0) {

                    lg_min = 0;
                    p_button.toggleClass('visible');
                    if (action) {

                    } else {

                    }
                }


                if (action == true) {

                    for (var i = (p + 1); i < elements.length; i++) {
                        $(el[i]).css({
                            transform: 'translateX(' + tr + 'px)',
                            transitionDelay: delay + "ms"
                        })
                    }

                    if (p != 0) {

                        for (var i = (p - 1); i >= 0; i--) {
                            $(el[i]).css({
                                transform: 'translateX(' + -tr + 'px)',
                                transitionDelay: delay + "ms"
                            })
                        }
                    }
                } else {
                    for (var i = (p); i < elements.length; i++) {
                        $(el[i]).css({
                            transform: '',
                            transitionDelay: 0 + "ms"
                        })
                    }
                    if (p != 0) {
                        for (var i = (p - 1); i >= 0; i--) {
                            $(el[i]).css({
                                transform: '',
                                transitionDelay: 0 + "ms"
                            })
                        }
                    }
                }
            }

            var min = null;
            var nmin = null;
            var pi = 0;
            $(window).resize(function() {

                var w_w = $(window).width(); //parseFloat(parent.outerWidth());
                var e_w = (elements.length * (_originalWidth));
                //console.log(elements.length);
                if (w_w < e_w) {
                    let b_w_w = new BigNumber(w_w).toPrecision(4);
                    min = new BigNumber(b_w_w / (_originalWidth)).toPrecision(4);
                    min=Math.round(min);
                    max_scr = new BigNumber(elements.length / (b_w_w / (_originalWidth))).toPrecision(4);
                    max_scr = Math.floor(max_scr);
                    let rest=new BigNumber((elements.length )%((max_scr)*min) ).toPrecision(4);
                    
                    if(rest==0){
                     max_scr--;
                 }
                 
                    //console.log(max_scr);
                    if (nmin == null) {
                        nmin = min;
                    }
                    if (nmin != min) {
                        scroll_elements = Math.floor(pi / min);

                        if (nmin < min) {
                            if (scroll_elements == 0) {
                                allT = 0;
                                pi = 0;
                            } else {
                                allT = -(scroll_elements) * (min) * (w + 2);
                                pi = (scroll_elements) * min;
                            }
                            translateX(parent, allT);
                        } else if (scroll_elements == 0) {
                            pi = 0;
                            allT = 0;
                            translateX(parent, allT);
                        }
                        if (max_scr == scroll_elements) {
                            r_elements = elements.length - (scroll_elements) * min;
                        }
                        nmin = min;
                        setArrow();
                    }
                } else {
                    min = element.length;
                }

            })
            $(window).resize();
            let activated_netflix_function = false;

            function remove_active_description(search_div) {
                let find_active_popup = $(".video_description.active");
                if (find_active_popup.length > 0) {
                    let video = find_active_popup.find("video");
                    video.data("canplay", false);
                    video.get(0).pause();
                    find_active_popup.removeClass("active");
                }
                search_div.addClass("active");
            }

            function remove_active_element(el) {
                let find_active_popup = $(".element.n_focus");
                find_active_popup.data("activated", false);
                if (find_active_popup.length > 0) {

                    find_active_popup.removeClass("n_focus");

                }
                el.addClass("n_focus");
            }

            function control_element_actions(el, id) {
                let is_activated = false;
                el.data("activated", false);

                el.data("fromtop", el.offset().top - parseFloat(el.parent().css("marginTop")));
                let search_div = $(".video_description[tg=" + id + "]");
                let isMute = false;
                let theVideo;
                let theVideoSrc;


                let MuteVideo;
                if (search_div.length > 0) {
                    theVideo = search_div.find("video");
                    MuteVideo = search_div.find(".v_pause");
                    theVideoSrc = theVideo.find('source');
                    theVideoSrc = theVideoSrc[0];
                    theVideo.data("canplay", true);

                    theVideo = theVideo[0];
                    MuteVideo.click(function(e) {
                        e.stopPropagation();
                        $(this).toggleClass("mute");
                        if (!isMute) {
                            isMute = true;
                            theVideo.volume = 0;
                        } else {
                            isMute = false;
                            theVideo.volume = 1;
                        }
                    });
                }

                function activate() {

                    el.data("activated", true);


                    remove_active_element(el);
                    remove_active_description(search_div);


                    if (search_div.length > 0) {
                        let fromtop = el.data("fromtop");
                        $("html,document").animate({
                            scrollTop: fromtop + "px"
                        }, 500);
                        //remove_active_description();
                        search_div.addClass("active");
                        el.data("video").pause();
                        el.data("video").volume = 0;

                        let audio = el.data("audio");
                        audio.hide();

                        try {

                            let rgexp = new RegExp(window.location.href);
                            if (rgexp.test(theVideoSrc.src)) {
                                theVideoSrc.src = el.data("videoSrc");
                                theVideo.load();

                            } else {
                                theVideo.play();
                                theVideo.currentTime = el.data("video").currentTime;

                                if (isMute) {
                                    MuteVideo.click();
                                }
                            }

                            theVideo.addEventListener("timeupdate", function() {
                                el.data("where", this.currentTime);

                            });
                            let time = el.data("video").currentTime;
                            let firstTime = true;
                            theVideo.addEventListener('canplay', function() {

                                if (firstTime && $(this).data("canplay")) {
                                    firstTime = false;
                                    $(this).click();
                                    this.play();
                                    this.currentTime = time;
                                    this.volume = 1;
                                }


                            });

                        } catch (e) {

                        }
                        //always starts video from time 0
                        el.data("videoSrc", theVideoSrc);
                        el.data('video', theVideo[0]);
                        let close_button = search_div.find(".close");
                        close_button.click(function() {
                            el.removeClass("n_focus");
                            search_div.removeClass("active");
                            activated_netflix_function = false;
                            theVideo.pause();
                            el.data("activated", false);
                            el.mouseleave();

                        });
                        let y = el.data("fromtop") - 4
                        let height = parseFloat(el.height());
                        let top = y + height + "px";
                        search_div.css({
                            top: top
                        });

                    }
                }

                let down_array = el.find(".description");
                $(down_array).click(function() {
                    el.mouseleave();
                    if (!activated_netflix_function) {
                        activated_netflix_function = true;

                        activate();
                    }

                });

                el.on("mouseover", function() {
                    if (activated_netflix_function) {
                        if (el.data("activated") == false) {
                            let fromtop = el.data("fromtop");
                            $("html,document").animate({
                                scrollTop: fromtop + "px"
                            }, 500);
                            activate();
                        }
                    }
                });
            }
            var w = parseInt(e_width);
            $.each(elements, function(j, e) {

                var el = $(e);
                el.css('width', e_width);
                el.data('firstHover', true);
                el.data('ev', j);
                el.data("isLoadedVideo", false);
                el.data("where", 0);
                el.data("volume", false);
                let audio = el.find(".audio");
                el.data("audio", audio);
                let id = parseInt(el.attr("tg"));
                control_element_actions(el, id);
                el.data('ishover', false);
                audio.on("click", function() {
                    let video = $(this).parent().parent().find("video").get(0);
                    let n_class = $(this).attr("class");
                    if (n_class.indexOf("mute") >= 0) {
                        audio.removeClass("mute");
                        video.volume = 1;
                    } else {
                        audio.addClass("mute");
                        video.volume = 0;
                    }

                });
                el.on('mouseover', function() {
                    if (!activated_netflix_function) {
                        el.data("_canPlay", true);
                        var firstHover = $(this).data('firstHover');
                        if (firstHover) {
                            $(this).data('firstHover', false);
                            $(this).data('v_preloader').show(0);
                            try {
                                $(this).data('video').load();
                            } catch (e) {

                            }
                        }
                        let audio = $(this).data("audio");
                        audio.show();
                        if (!activated_netflix_function) {
                            try {
                                let n_class = audio.attr("class");
                                if (n_class.indexOf("mute") >= 0) {
                                    audio.removeClass("mute");
                                }
                                let video = $(this).data("video");
                                video.volume = 1;
                                let volume = $(this).data("volume");
                                let ctx = $(this);
                                if ($(this).data("isLoadedVideo")) {

                                    let p = window.setInterval(function() {
                                        window.clearInterval(p);

                                        if (!volume) {
                                            video.play();
                                            ctx.data("volume", true);
                                        }


                                    }, 800);

                                }
                            } catch (e) {

                            }
                        }


                        var ishover = $(this).data('ishover');
                        if (!ishover) {
                            var x = $(this).data('ev');
                            if (x % min == 0) {

                                $(this).addClass('firstFocus');


                                if ($(window).width() < 550) {
                                    allT += ((w * 0.5) / 2);

                                } else {
                                    allT += ((w * 0.5) / 2);
                                }
                                translateX(parent, allT);

                            } else {
                                $(this).addClass('focus');
                            }
                            putFocus(elements, x, true, min);
                            $(this).data('ishover', true);

                            // $(this).addClass('focus');
                        }
                    } else {

                    }
                });
                el.on('mouseleave', function() {
                    var ishover = $(this).data('ishover');
                    el.data("_canPlay", false);
                    var x = $(this).data('ev');
                    if (!activated_netflix_function) {
                        let video = $(this).data("video");
                        let seconds = $(this).data("where");
                        let ctx = $(this);
                        let t = window.setTimeout(function() {
                            video.pause();

                            ctx.data("volume", false);

                        }, 1000);


                        if (seconds > 0) {
                            video.currentTime = seconds;
                        }
                        if ($(this).data("isLoadedVideo")) {


                            video.volume = 0;
                            try {
                                let audio = $(this).data("audio");
                                let n_class = audio.attr("class");
                                if (n_class.indexOf("mute") < 0) {
                                    audio.addClass("mute");
                                }
                                audio.show();
                            } catch (e) {

                            }

                        }
                    }
                    if (ishover) {
                        if (x % min == 0) {
                            $(this).removeClass('firstFocus');

                            if ($(window).width() < 550) {
                                allT -= ((w * 0.5) / 2);

                            } else {
                                allT -= ((w * 0.5) / 2);

                            }


                            translateX(parent, allT, false);
                        } else {
                            $(this).removeClass('focus');
                        }
                        $(this).data('ishover', false);
                        putFocus(elements, x, false, min);
                    }
                });
                var video_container = el.find('.video_container');
                var theVideo = video_container.find('video');
                var theVideoSrc = theVideo.find('source');
                el.data("videoSrc", videourl[j]);
                el.data('video', theVideo[0]);

                theVideoSrc[0].src = videourl[j];
                let first_time = true;
                theVideo = theVideo[0];
                var v_preloader = el.find('.v_preloader');
                el.data('v_preloader', v_preloader);
                theVideo.addEventListener('canplay', function() {

                    $(this).click();
                    if (first_time && el.data("_canPlay")) {
                        first_time = false;


                        try {
                            this.play();
                        } catch (e) {

                        }
                    }

                    var p = $(this).parent().parent();

                    p.data('v_preloader').fadeOut(200);
                    p.data("isLoadedVideo", true);
                });


            });


}

var now_elements = min;
var r_elements = elements.length - min;
var n_button = parent.parent().find('.after');
var p_button = parent.parent().find('.previous');

function setArrow() {
    if (scroll_elements == max_scr) {
        n_button.hide(0);
    }
    if (scroll_elements == 0) {
        p_button.hide(0);
        n_button.show(0);
    } else {
        p_button.show(0);
    }
    if (scroll_elements < max_scr && max_scr > 0) {
        n_button.show(0);
    } else if (max_scr == 0) {
        n_button.hide(0);
    }
    if (scroll_elements != max_scr)
        r_elements = elements.length - (scroll_elements + 1) * min;
}
var x0 = 0;
var onts = false;
parent.on('touchstart', function(e) {
    x0 = e.originalEvent.touches[0].pageX;
    onts = true;
});
parent.on('touchmove', function(e) {
    if (onts) {
        var n_x = e.originalEvent.changedTouches[0].pageX;
        var dff = n_x - x0;

        if (dff <= 0) {
                    //avanti
                    if (Math.abs(dff) > 10) {
                        if (max_scr > 0 && scroll_elements < max_scr)
                            n_button.click();
                        onts = false;

                    }
                } else {
                    if (Math.abs(dff) > 10) {
                        if (max_scr > 0 && scroll_elements > 0)
                            p_button.click();
                        onts = false;

                    }

                }
                x0 = n_x;
            }
        });
parent.on('touchend', function() {
    onts = false;
});
var ntw = null;
$(window).resize(function() {

    window.setTimeout(function() {
        ntw = $(window).width() - ((w + 2) * min);
        setArrow();
        if (min == 1 || original_width == '120px') {
            $(n_button).css('width', '32px');
            $(p_button).css('width', '32px');
        } else {
            $(n_button).css('width', '32px');
            $(p_button).css('width', '32px');
        }
    }, 500);
});
$(window).resize();
n_button.click(function() {

    scroll_elements++;
    pi = (scroll_elements) * min;
    var t_w = 0;

    if (scroll_elements == max_scr) {
        t_w = min * (w + 2);
    } else {
        t_w = min * (w + 2);
    }
    allT -= t_w;
    translateX(parent, allT, false);
    setArrow();
});
p_button.click(function() {

    scroll_elements--;
    pi = (scroll_elements) * min;
    var t_w = 0;

    if (scroll_elements == (max_scr - 1)) {
        t_w = min * (w + 2);
    } else {
        t_w = min * (w + 2);
    }
    allT += t_w;
    translateX(parent, allT, false);
    setArrow();
});
};


$.fn[f_name] = function(options) {
    return this.each(function() {
        if (!$.data(this, f_name)) {
            $.data(this, f_name, new $.fn.init[f_name](this, options));
        }
    });
}
}(jQuery));


$(document).ready(function() {
    $('.s_container').netflix_slider();
});