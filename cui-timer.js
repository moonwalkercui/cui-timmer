;
(function($) {
    /*
     * 倒计时超级插件
     * 调用方法：页面底部调用：$('.cui-timer').Cuitimer(); 样式类名可以自定义。
     * 元素中需要加入data-config属性 如：<label class="cui-timer" data-config = '{"endtime":"2017-5-2 10:10:33","msec":false,"callback":"diyFunc"}'>
     * 三个参数：endtime结束时间，msec是否显示毫秒，callback 时间到自定义回调函数
     * @author 崔
     */
    var Cuitimer = function(ele) {
        this.ele = ele;
        config = {
            "endtime": "0000-00-00 00:00:00", // 结束时间
            "msec": false, // 是否显示十分之一秒
            "callback": null // 到0时执行的自定义回调函数
        };
        this.init(); // 初始化参数
        this.makeText(config);
    }
    Cuitimer.prototype = {
        init: function() {
            var confStr = this.ele.attr('data-config');
            if (confStr) {
                var u_config = $.parseJSON(confStr);
                if ($.isEmptyObject(u_config) == false) {
                    $.extend(config, u_config);
                }
                return config;
            }
            return;
        },
        getYMDHIS: function(endtime) {
            var _this = this;
            var now = new Date(),
                endDate = new Date(endtime),
                dur = (endDate - now) / 1000,
                remain;
            if (dur > 0)
                remain = {
                    //年份，按按回归年365天5时48分46秒算
                    // y : Math.floor((dur / 31556926)) > 0? Math.floor((dur / 31556926)) : "0",
                    //月份，以实际平均每月秒数计算
                    m: Math.floor((dur / 2629744)) > 0 ? Math.floor((dur / 2629744)) % 12 : "00",
                    d: Math.floor((dur / 86400)) > 0 ? (Math.floor((dur / 86400)) % 30) : "00",
                    h: Math.floor((dur / 3600)) > 0 ? Math.floor((dur / 3600)) % 24 : "00",
                    i: Math.floor((dur / 60)) > 0 ? Math.floor((dur / 60)) % 60 : "00",
                    s: Math.floor(dur % 60)
                };
            else remain = {
                m: "00",
                d: "00",
                h: "00",
                i: "00",
                s: "00"
            };
            var dayStr = (remain.d == '00') ? "" : _this.addZero(remain.d) + " 天 ";
            return " " + dayStr + _this.addZero(remain.h) + ":" + _this.addZero(remain.i) + ":" + _this.addZero(remain.s);
        },
        makeText: function(config) {
            var _this = this,
                _ele = this.ele,
                _endtime = config.endtime,
                _msec = config.msec,
                _cb = config.callback,
                timeStr, setid;

        var arr = _endtime.split(/[- : \/]/);

        var date1 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
        var date2 = new Date(date1) - new Date();   //时间差的毫秒数
        var hasTime = date2 > 0

            if (hasTime != true) {
                if (_cb != null) _this.tooLate(_cb);
                _ele.html("倒计时结束");
                return;
            }
            window.setInterval(function() {
                timeStr = _this.getYMDHIS(date1);
                hasTime = (new Date(date1) - new Date()) > 0;
                // _this.addHm();
                if (_msec && hasTime) {
                    var loop = 9;
                    var setid = window.setInterval(function() {
                        _ele.html(timeStr + "." + loop);
                        if (loop > 0) loop--;
                        else window.clearInterval(setid);
                    }, 98);
                } else {
                    if (_cb != null && hasTime != true) _this.tooLate(_cb);
                    _ele.html(timeStr);
                }
            }, 1000);
        },
        addZero: function(n) {
            var _n = parseInt(n, 10); //解析字符串,返回整数
            if (_n > 0) {
                if (_n <= 9) {
                    _n = "0" + _n
                }
                return String(_n);
            } else {
                return "00";
            }
        },
        tooLate: function(callback) {
            eval(callback);
        }
    };
    $.fn.extend({
        Cuitimer: function() {
            this.each(function() {
                new Cuitimer($(this));
            });
        }
    });
    window.Cuitimer = Cuitimer;
})(jQuery);
