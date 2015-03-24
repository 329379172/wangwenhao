/**
 * Created with WebStorm.
 * User: xiaoqiu
 * Email: lupengfei@gozap.com
 * Date: 15/3/24
 * Time: 上午10:48
 * Description:
 */
function scrollTop() {
    var t = "", n = $('<div id="backToTop" class="backToTop1"></div>').appendTo($("body")).text(t).attr("title", t).click(function () {
        $("html, body").animate({scrollTop: 0}, 120)
    }), i = function () {
        var t = $(document).scrollTop(), i = $(window).height();
        t > 0 ? n.show() : n.hide(), window.XMLHttpRequest || n.css("top", t + i - 166)
    };
    $("#backToTop").hover(function () {
        $(this).removeClass().addClass("backToTop2")
    }, function () {
        $(this).removeClass().addClass("backToTop1")
    }), $(window).bind("scroll", i), $(function () {
        i()
    })
}
function roolNumberFn(n) {
    var t = 42, r = n, i = (r + "").split("");
    $(".num").each(function (n) {
        var r = $(this), u = t * 60 - t * i[n];
        setTimeout(function () {
            r.animate({backgroundPositionY: t * 60 - t * i[n]}, {
                duration: 1e3,
                easing: "easeInOutCirc",
                complete: function () {
                }
            })
        }, n * 200)
    })
}
function AddCount(n) {
    var t = 0;
    $.ajax({
        type: "GET", url: "/dataresult/getcount?type=" + n, cache: !1, success: function (n) {
            $("#search_count").html(n), roolNumberFn(n)
        }
    })
}
function ChangeDateFormat(n) {
    try {
        var t = new Date(parseInt(n.replace("/Date(", "").replace(")/", ""), 10)), r = t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1, u = t.getDate() < 10 ? "0" + t.getDate() : t.getDate(), f = t.getHours(), i = t.getSeconds(), e = t.getMinutes(), o = f > 0 ? +i + "时" + i + "分" + e + "秒" : "";
        return t.getFullYear() + "年" + r + "月" + u + "日 " + o
    } catch (s) {
        return ""
    }
}
function SetCookieByKey(n, t) {
    var r = 60, i = new Date;
    i.setTime(i.getTime() + r * 864e5), document.cookie = n + "=" + escape(t) + ";expires=" + i.toGMTString() + ";path=/"
}
function generateMixed(n) {
    for (var i = "", r, t = 0; t < n; t++)r = Math.ceil(Math.random() * 35), i += chars[r];
    return i
}
function JsonT(n) {
    var t = CryptoJS.enc.Utf8.parse("96e79218965eb72c92a549dd5a330112"), i = CryptoJS.enc.Utf8.parse("1234567812345678"), r = CryptoJS.AES.encrypt(n, t, {iv: i}), u = generateMixed(5) + r + generateMixed(5);
    SetCookieByKey("TytKey", u)
}
function rateSearch() {
    $("#search_btn").click(function () {
        if ($.trim($("#txt_name").val()) == "")return $("#txt_name").focus(), $("#txt_name").addClass("inputStyle"), !1;
        $("#IntroductInfo").hide(), $("#RateInfo").show(), $(".nick_lever").html('<img src="/images/rate_check2.gif" height="94px" alt="信用检测中，请稍等" /><span>请耐心等候，正在努力加载中..</span>'), $("#buyerNormalBadPerNumber").html("0.00%"), $("#remember_sel").attr("checked") && $.cookie("TAOSHENGSHI_SHOPNAME", $.trim($("#txt_name").val()), {expires: 7}), $(this).attr("disabled", !0), $(this).attr("value", "查询中");
        var n = $.trim($("#txt_name").val());
        AddCount(1), JsonT(n), getRateUserInfo(n)
    })
}
function getRateUserInfo(n) {
    $.ajax({
        type: "POST",
        url: "/RateUserInfo",
        data: {nick: n, __RequestVerificationToken: $("input:hidden[name='__RequestVerificationToken']").val()},
        success: function (n) {
            n.Remark && n.Remark != "" ? ($("#RateInfo").hide(), $("#UserInfo").show(), $("#UserInfo").html("<p>" + n.Remark + "</p>"), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询")) : n != "" ? ($("#UserInfo").hide(), $("#sellerInfoWarnWeek").html(""), $("#sellerInfoWarnMonth").html(""), $("#rate_sellerLink").html("暂无店铺"), $("#rate_shopType").html("暂无"), $("#buyer_CurrentTime").html(n.CurrentTime), $("#buyer_IpAddress").html(n.IpAddressInfo), $("#rate_userName").html(n.UserRateUrl == null ? n.UserName : "<a href='" + n.UserRateUrl + "' target='_blank'>" + n.UserName + "</a>"), $("#rate_userIdent").html(n.UserIdent == "" ? "<b style='color:red'>暂无认证</b>" : n.UserIdentImg == "" ? n.UserIdent : "<img src='" + n.UserIdentImg + "' style='vertical-align:middle;height:25px;'  alt='" + n.UserIdent + "' title='" + n.UserIdent + "' />" + n.UserIdent), $("#rate_userArea").html(n.UserArea == "" ? "保密" : n.UserArea), $("#rate_userTime").html(ChangeDateFormat(n.UserTime)), $("#rate_url").html(n.UserRateUrl == null ? "无详细信息" : "<a target=\"_blank\" style='color:red;text-decoration: underline;' href='http://www.taoyitu.com/rateinfo-" + n.UserId + ".html' target='_blank'>http://www.taoyitu.com/rateinfo-" + n.UserId + ".html</a>"), n.IsSeller == 1 ? ($("#userType").html("买家"), $("#buyer_ratecount").html("<span id='spanUserBuyerCount'>" + n.UserBuyerCount + "</span>"), $("#buyer_ratecount").append(n.UserBuyerImg == "" ? "" : " <img src='" + n.UserBuyerImg + "' alt='卖家等级' />"), $("#buyer_ratecount").append(n.UserBuyerGoodRate == "" ? "" : " （好评率：" + n.UserBuyerGoodRate + "）"), n.UserSellerCount == 0 ? $("#seller_ratecount").html("0（好评率：0.00%）店铺未开通") : $("#seller_ratecount").html(n.UserSellerCount + (n.UserSellerImg == "" ? "" : " <img src='" + n.UserSellerImg + "' alt='买家等级' />") + "（好评率：0.00%）店铺未开通"), $("#buyer_weekRateGood").html(n.WeekRateGood), $("#buyer_monthRateGood").html(n.MonthRateGood), $("#buyer_yearRateGood").html(n.YearRateGood), $("#buyer_yearOldRateGood").html(n.YearOldRateGood), $("#seller_weekRateGood").html(n.WeekRateGood + "&nbsp;"), $("#seller_monthRateGood").html("0"), $("#seller_yearRateGood").html("0"), $("#seller_yearOldRateGood").html("0")) : n.IsSeller == 2 && ($("#userType").html("卖家"), n.ShopUrl != "" && n.ShopUrl != null && n.ShopName != "" && n.ShopName != null ? ($("#rate_sellerLink").html('<a target="_blank" href=' + n.ShopUrl + " style='color:red;'>进入【" + n.ShopName + "】的店铺</a>"), n.ShopType != "" && n.ShopType != null && $("#rate_shopType").html(n.ShopType), n.ShopTime != "" && $("#rate_sellerLink").append("<span style='margin:0 0 0 10px;color:red;'>(创建于：" + ChangeDateFormat(n.ShopTime) + ")<span>")) : $("#rate_sellerLink").html("暂无店铺"), $("#buyer_ratecount").html("<span id='spanUserBuyerCount'>" + n.UserBuyerCount + "</span>"), $("#seller_ratecount").html("<span id='spanUserSellerCount'>" + n.UserSellerCount + "</span>"), $("#buyer_ratecount").append(n.UserBuyerImg == "" ? "" : "  <img src='" + n.UserBuyerImg + "' alt='卖家等级' />"), $("#seller_ratecount").append(n.UserSellerImg == "" ? "" : " <img src='" + n.UserSellerImg + "' alt='买家等级' />"), $("#seller_ratecount").append(n.UserSellerGoodRate == "" ? "" : " （好评率：" + n.UserSellerGoodRate + "）"), $("#sellerInfoWarnWeek").html("(此帐号是淘宝卖家，买家信用无法查询)"), $("#seller_weekRateGood").html(n.WeekRateGood + "&nbsp;"), $("#seller_monthRateGood").html(n.MonthRateGood), $("#seller_yearRateGood").html(n.YearRateGood), $("#seller_yearOldRateGood").html(n.YearOldRateGood), $("#buyer_weekRateGood").html("0"), $("#buyer_monthRateGood").html("0"), $("#buyer_yearRateGood").html("0"), $("#buyer_yearOldRateGood").html("0")), UserID = n.UserId, UserName = n.UserName, RateModel = n) : ($("#RateInfo").hide(), $("#UserInfo").show(), $("#UserInfo").html("<p>暂时无法查找到该淘宝帐号，请检查是否输入正确！</p>"), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询"))
        },
        complete: function () {
            var r;
            if (typeof RateModel != "undefined") {
                var i = $("#spanUserSellerCount").html(), t = $("#spanUserBuyerCount").html(), n = 0;
                UserID != "" && RateModel.ModelState != 1 ? $.ajax({
                    type: "POST",
                    url: "/GetUserRateNormalBadCount",
                    data: {
                        userId: UserID,
                        userName: UserName,
                        __RequestVerificationToken: $("input:hidden[name='__RequestVerificationToken']").val()
                    },
                    beforeSend: function () {
                        $("#buyerTotalNormalCount").html("加载中."), $("#buyerTotalBadCount").html("加载中.")
                    },
                    success: function (r) {
                        $("#buyerTotalNormalCount").html(r.normalTotal), $("#buyerTotalBadCount").html(r.badTotal);
                        var u = parseInt(r.normalTotal + r.badTotal);
                        (t > 0 || i) > 0 && t != "" && (i > 0 ? (n = (u / (parseInt(i) + parseInt(t)) * 100).toFixed(2), $("#buyerNormalBadPerNumber").html(n + "%")) : (n = (u / t * 100).toFixed(2), $("#buyerNormalBadPerNumber").html(n + "%"))), rateCheckWarn(RateModel, n), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询")
                    },
                    error: function () {
                        $("#buyerTotalNormalCount").html(0), $("#buyerTotalBadCount").html(0), $(".nick_lever").html("<img src=\"/images/lever/safe.jpg\" height=\"75px\" alt='安全等级' title='安全等级' />"), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询")
                    }
                }) : ($("#buyerTotalNormalCount").html(RateModel.TotalRateNormalCount), $("#buyerTotalBadCount").html(RateModel.TotalRateBadCount), r = parseInt(RateModel.TotalRateNormalCount + RateModel.TotalRateBadCount), (t > 0 || i) > 0 && t != "" && (i > 0 ? (n = (r / (parseInt(i) + parseInt(t)) * 100).toFixed(2), $("#buyerNormalBadPerNumber").html(n + "%")) : (n = (r / t * 100).toFixed(2), $("#buyerNormalBadPerNumber").html(n + "%"))), rateCheckWarn(RateModel, n), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询")), $.getScript("http://pv.sohu.com/cityjson", function () {
                    var t = returnCitySN.cip, n = returnCitySN.cname;
                    $("#buyer_IpAddress").html($("#buyer_IpAddress").html() + " " + n)
                })
            }
        },
        error: function () {
            $("#RateInfo").hide(), $("#UserInfo").show(), $("#UserInfo").html("<p>注意：该帐号不存在或是淘宝正在对此帐号盘点！淘宝账号确认方法：登录旺旺或者网站，会员名才是正确的淘宝账号。如有疑问请加群：108016717</p>"), $("#search_btn").attr("disabled", !1), $("#search_btn").attr("value", "查询")
        }
    })
}
function rateCheckWarn(n, t) {
    $("#zhongpingLink").attr("href", "http://www.taoyitu.com/rateinfo-" + n.UserId + ".html#t=normal"), $("#chapingLink").attr("href", "http://www.taoyitu.com/rateinfo-" + n.UserId + ".html#t=bad"), $(".count_down").html("<img src='/images/logo/score.jpg' height='51px' style='position:absolute;left:-130px;top:0px;' />"), n.IsSeller == 1 ? (parseInt(n.WeekRateGood) > 20 && ($("#sellerInfoWarnWeek").append("(请注意！此帐号一周已经超过20笔交易了)"), $("#sellerInfoWarnWeek").css("color", "red")), parseInt(n.MonthRateGood) > 10 && $("#sellerInfoWarnMonth").append("(请注意！此帐号一月已经超过10-20笔交易了)"), parseInt(n.MonthRateGood) > 20 || parseInt(n.MonthRateGood) > 20 || t > 3 ? $(".nick_lever").html("<img src=\"/images/lever/warn.jpg\" height=\"75px\" alt='帐号危险等级' title='帐号危险等级' />") : parseInt(n.WeekRateGood) > 10 && parseInt(n.WeekRateGood) < 20 || parseInt(n.MonthRateGood) > 10 && parseInt(n.MonthRateGood) < 20 || t > 2 && t < 3 ? $(".nick_lever").html("<img src=\"/images/lever/normal.jpg\" height=\"75px\" alt='帐号一般等级' title='帐号一般等级'  />") : $(".nick_lever").html("<img src=\"/images/lever/safe.jpg\" height=\"75px\" alt='安全等级' title='安全等级' />")) : t > 3 ? $(".nick_lever").html("<img src=\"/images/lever/warn.jpg\" height=\"75px\" alt='帐号危险等级' title='帐号危险等级' />") : $(".nick_lever").html("<img src=\"/images/lever/safe.jpg\" height=\"75px\" alt='安全等级' title='安全等级' />")
}
function remeberSearch() {
    var n = $("#remember_sel"), t;
    $(n).click(function () {
        if ($(this).attr("checked")) {
            var n = $.trim($("#txt_name").val());
            n != "" && $.cookie("TAOSHENGSHI_SHOPNAME", n, {expires: 7})
        } else $.cookie("TAOSHENGSHI_SHOPNAME", null)
    }), t = $.cookie("TAOSHENGSHI_SHOPNAME"), t != null && ($("#txt_name").val($.cookie("TAOSHENGSHI_SHOPNAME")), $(n).attr("checked", !0))
}
function inputSetting() {
    $("#container input[type='text']").focus(function () {
        $(this).addClass("inputStyle")
    }), $("#container input[type='text']").blur(function () {
        $(this).removeClass("inputStyle")
    }), $("#txt_name").keydown(function (n) {
        var t = n.which;
        t == 13 && $("#search_btn").click()
    }), $("#txt_name").focus(), $("#txt_name").select()
}
var chars, CryptoJS, UserID, UserName, RateModel;
jQuery.cookie = function (n, t, i) {
    var f, r, e, o, u, s;
    if (typeof t != "undefined") {
        i = i || {}, t === null && (t = "", i.expires = -1), f = "", i.expires && (typeof i.expires == "number" || i.expires.toUTCString) && (typeof i.expires == "number" ? (r = new Date, r.setTime(r.getTime() + i.expires * 864e5)) : r = i.expires, f = "; expires=" + r.toUTCString());
        var h = i.path ? "; path=" + i.path : "", c = i.domain ? "; domain=" + i.domain : "", l = i.secure ? "; secure" : "";
        document.cookie = [n, "=", encodeURIComponent(t), f, h, c, l].join("")
    } else {
        if (e = null, document.cookie && document.cookie != "")for (o = document.cookie.split(";"), u = 0; u < o.length; u++)if (s = jQuery.trim(o[u]), s.substring(0, n.length + 1) == n + "=") {
            e = decodeURIComponent(s.substring(n.length + 1));
            break
        }
        return e
    }
}, $(function () {
    scrollTop()
}), $(".gonggao").hover(function () {
    $(".gonggao_info").show()
}, function () {
    $(".gonggao_info").hover(function () {
        $(".gonggao_info").show()
    }, function () {
        $(".gonggao_info").hide()
    })
}), chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (n, t, i, r, u) {
        return jQuery.easing[jQuery.easing.def](n, t, i, r, u)
    },
    easeInQuad: function (n, t, i, r, u) {
        return r * (t /= u) * t + i
    },
    easeOutQuad: function (n, t, i, r, u) {
        return -r * (t /= u) * (t - 2) + i
    },
    easeInOutQuad: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t + i : -r / 2 * (--t * (t - 2) - 1) + i
    },
    easeInCubic: function (n, t, i, r, u) {
        return r * (t /= u) * t * t + i
    },
    easeOutCubic: function (n, t, i, r, u) {
        return r * ((t = t / u - 1) * t * t + 1) + i
    },
    easeInOutCubic: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t + i : r / 2 * ((t -= 2) * t * t + 2) + i
    },
    easeInQuart: function (n, t, i, r, u) {
        return r * (t /= u) * t * t * t + i
    },
    easeOutQuart: function (n, t, i, r, u) {
        return -r * ((t = t / u - 1) * t * t * t - 1) + i
    },
    easeInOutQuart: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t * t + i : -r / 2 * ((t -= 2) * t * t * t - 2) + i
    },
    easeInQuint: function (n, t, i, r, u) {
        return r * (t /= u) * t * t * t * t + i
    },
    easeOutQuint: function (n, t, i, r, u) {
        return r * ((t = t / u - 1) * t * t * t * t + 1) + i
    },
    easeInOutQuint: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? r / 2 * t * t * t * t * t + i : r / 2 * ((t -= 2) * t * t * t * t + 2) + i
    },
    easeInSine: function (n, t, i, r, u) {
        return -r * Math.cos(t / u * (Math.PI / 2)) + r + i
    },
    easeOutSine: function (n, t, i, r, u) {
        return r * Math.sin(t / u * (Math.PI / 2)) + i
    },
    easeInOutSine: function (n, t, i, r, u) {
        return -r / 2 * (Math.cos(Math.PI * t / u) - 1) + i
    },
    easeInExpo: function (n, t, i, r, u) {
        return t == 0 ? i : r * Math.pow(2, 10 * (t / u - 1)) + i
    },
    easeOutExpo: function (n, t, i, r, u) {
        return t == u ? i + r : r * (-Math.pow(2, -10 * t / u) + 1) + i
    },
    easeInOutExpo: function (n, t, i, r, u) {
        return t == 0 ? i : t == u ? i + r : (t /= u / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + i : r / 2 * (-Math.pow(2, -10 * --t) + 2) + i
    },
    easeInCirc: function (n, t, i, r, u) {
        return -r * (Math.sqrt(1 - (t /= u) * t) - 1) + i
    },
    easeOutCirc: function (n, t, i, r, u) {
        return r * Math.sqrt(1 - (t = t / u - 1) * t) + i
    },
    easeInOutCirc: function (n, t, i, r, u) {
        return (t /= u / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + i : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + i
    },
    easeInElastic: function (n, t, i, r, u) {
        var o = 1.70158, f = 0, e = r;
        return t == 0 ? i : (t /= u) == 1 ? i + r : (f || (f = u * .3), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), -(e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f)) + i)
    },
    easeOutElastic: function (n, t, i, r, u) {
        var o = 1.70158, f = 0, e = r;
        return t == 0 ? i : (t /= u) == 1 ? i + r : (f || (f = u * .3), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), e * Math.pow(2, -10 * t) * Math.sin((t * u - o) * 2 * Math.PI / f) + r + i)
    },
    easeInOutElastic: function (n, t, i, r, u) {
        var o = 1.70158, f = 0, e = r;
        return t == 0 ? i : (t /= u / 2) == 2 ? i + r : (f || (f = u * .3 * 1.5), e < Math.abs(r) ? (e = r, o = f / 4) : o = f / (2 * Math.PI) * Math.asin(r / e), t < 1) ? -.5 * e * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) + i : e * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * u - o) * 2 * Math.PI / f) * .5 + r + i
    },
    easeInBack: function (n, t, i, r, u, f) {
        return f == undefined && (f = 1.70158), r * (t /= u) * t * ((f + 1) * t - f) + i
    },
    easeOutBack: function (n, t, i, r, u, f) {
        return f == undefined && (f = 1.70158), r * ((t = t / u - 1) * t * ((f + 1) * t + f) + 1) + i
    },
    easeInOutBack: function (n, t, i, r, u, f) {
        return (f == undefined && (f = 1.70158), (t /= u / 2) < 1) ? r / 2 * t * t * (((f *= 1.525) + 1) * t - f) + i : r / 2 * ((t -= 2) * t * (((f *= 1.525) + 1) * t + f) + 2) + i
    },
    easeInBounce: function (n, t, i, r, u) {
        return r - jQuery.easing.easeOutBounce(n, u - t, 0, r, u) + i
    },
    easeOutBounce: function (n, t, i, r, u) {
        return (t /= u) < 1 / 2.75 ? r * 7.5625 * t * t + i : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + i : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + i : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + i
    },
    easeInOutBounce: function (n, t, i, r, u) {
        return t < u / 2 ? jQuery.easing.easeInBounce(n, t * 2, 0, r, u) * .5 + i : jQuery.easing.easeOutBounce(n, t * 2 - u, 0, r, u) * .5 + r * .5 + i
    }
}), function (n) {
    function r(n) {
        var t = n.split(/\s/);
        return {X: t[0], Y: t[1]}
    }

    var i = n('<div style="background-position: 3px 5px">'), t;
    n.support.backgroundPosition = i.css("backgroundPosition") === "3px 5px" ? !0 : !1, n.support.backgroundPositionXY = i.css("backgroundPositionX") === "3px" ? !0 : !1, i = null, t = ["X", "Y"], !n.support.backgroundPosition && n.support.backgroundPositionXY && (n.cssHooks.backgroundPosition = {
        get: function (i) {
            return n.map(t, function (t) {
                return n.css(i, "backgroundPosition" + t)
            }).join(" ")
        }, set: function (i, u) {
            n.each(t, function (n, t) {
                var f = r(u);
                i.style["backgroundPosition" + t] = f[t]
            })
        }
    }), n.support.backgroundPosition && !n.support.backgroundPositionXY && n.each(t, function (t, i) {
        n.cssHooks["backgroundPosition" + i] = {
            get: function (t) {
                var e = r(n.css(t, "backgroundPosition"));
                return e[i]
            }, set: function (t, u) {
                var f = r(n.css(t, "backgroundPosition")), e = i === "X";
                t.style.backgroundPosition = (e ? u : f.X) + " " + (e ? f.Y : u)
            }
        }, n.fx.step["backgroundPosition" + i] = function (t) {
            n.cssHooks["backgroundPosition" + i].set(t.elem, t.now + t.unit)
        }
    })
}(jQuery), CryptoJS = CryptoJS || function (n, t) {
    var u = {}, f = u.lib = {}, o = function () {
    }, i = f.Base = {
        extend: function (n) {
            o.prototype = this;
            var t = new o;
            return n && t.mixIn(n), t.hasOwnProperty("init") || (t.init = function () {
                t.$super.init.apply(this, arguments)
            }), t.init.prototype = t, t.$super = this, t
        }, create: function () {
            var n = this.extend();
            return n.init.apply(n, arguments), n
        }, init: function () {
        }, mixIn: function (n) {
            for (var t in n)n.hasOwnProperty(t) && (this[t] = n[t]);
            n.hasOwnProperty("toString") && (this.toString = n.toString)
        }, clone: function () {
            return this.init.prototype.extend(this)
        }
    }, r = f.WordArray = i.extend({
        init: function (n, i) {
            n = this.words = n || [], this.sigBytes = i != t ? i : 4 * n.length
        }, toString: function (n) {
            return (n || l).stringify(this)
        }, concat: function (n) {
            var i = this.words, r = n.words, u = this.sigBytes, t;
            if (n = n.sigBytes, this.clamp(), u % 4)for (t = 0; t < n; t++)i[u + t >>> 2] |= (r[t >>> 2] >>> 24 - 8 * (t % 4) & 255) << 24 - 8 * ((u + t) % 4); else if (65535 < r.length)for (t = 0; t < n; t += 4)i[u + t >>> 2] = r[t >>> 2]; else i.push.apply(i, r);
            return this.sigBytes += n, this
        }, clamp: function () {
            var i = this.words, t = this.sigBytes;
            i[t >>> 2] &= 4294967295 << 32 - 8 * (t % 4), i.length = n.ceil(t / 4)
        }, clone: function () {
            var n = i.clone.call(this);
            return n.words = this.words.slice(0), n
        }, random: function (t) {
            for (var i = [], u = 0; u < t; u += 4)i.push(4294967296 * n.random() | 0);
            return new r.init(i, t)
        }
    }), e = u.enc = {}, l = e.Hex = {
        stringify: function (n) {
            var u = n.words, i, t, r;
            for (n = n.sigBytes, i = [], t = 0; t < n; t++)r = u[t >>> 2] >>> 24 - 8 * (t % 4) & 255, i.push((r >>> 4).toString(16)), i.push((r & 15).toString(16));
            return i.join("")
        }, parse: function (n) {
            for (var i = n.length, u = [], t = 0; t < i; t += 2)u[t >>> 3] |= parseInt(n.substr(t, 2), 16) << 24 - 4 * (t % 8);
            return new r.init(u, i / 2)
        }
    }, s = e.Latin1 = {
        stringify: function (n) {
            var r = n.words, i, t;
            for (n = n.sigBytes, i = [], t = 0; t < n; t++)i.push(String.fromCharCode(r[t >>> 2] >>> 24 - 8 * (t % 4) & 255));
            return i.join("")
        }, parse: function (n) {
            for (var i = n.length, u = [], t = 0; t < i; t++)u[t >>> 2] |= (n.charCodeAt(t) & 255) << 24 - 8 * (t % 4);
            return new r.init(u, i)
        }
    }, a = e.Utf8 = {
        stringify: function (n) {
            try {
                return decodeURIComponent(escape(s.stringify(n)))
            } catch (t) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (n) {
            return s.parse(unescape(encodeURIComponent(n)))
        }
    }, h = f.BufferedBlockAlgorithm = i.extend({
        reset: function () {
            this._data = new r.init, this._nDataBytes = 0
        }, _append: function (n) {
            "string" == typeof n && (n = a.parse(n)), this._data.concat(n), this._nDataBytes += n.sigBytes
        }, _process: function (t) {
            var f = this._data, s = f.words, u = f.sigBytes, e = this.blockSize, o = u / (4 * e), o = t ? n.ceil(o) : n.max((o | 0) - this._minBufferSize, 0), i;
            if (t = o * e, u = n.min(4 * t, u), t) {
                for (i = 0; i < t; i += e)this._doProcessBlock(s, i);
                i = s.splice(0, t), f.sigBytes -= u
            }
            return new r.init(i, u)
        }, clone: function () {
            var n = i.clone.call(this);
            return n._data = this._data.clone(), n
        }, _minBufferSize: 0
    }), c;
    return f.Hasher = h.extend({
        cfg: i.extend(), init: function (n) {
            this.cfg = this.cfg.extend(n), this.reset()
        }, reset: function () {
            h.reset.call(this), this._doReset()
        }, update: function (n) {
            return this._append(n), this._process(), this
        }, finalize: function (n) {
            return n && this._append(n), this._doFinalize()
        }, blockSize: 16, _createHelper: function (n) {
            return function (t, i) {
                return new n.init(i).finalize(t)
            }
        }, _createHmacHelper: function (n) {
            return function (t, i) {
                return new c.HMAC.init(n, i).finalize(t)
            }
        }
    }), c = u.algo = {}, u
}(Math), function () {
    var n = CryptoJS, t = n.lib.WordArray;
    n.enc.Base64 = {
        stringify: function (n) {
            var i = n.words, u = n.sigBytes, f = this._map, t, e, r;
            for (n.clamp(), n = [], t = 0; t < u; t += 3)for (e = (i[t >>> 2] >>> 24 - 8 * (t % 4) & 255) << 16 | (i[t + 1 >>> 2] >>> 24 - 8 * ((t + 1) % 4) & 255) << 8 | i[t + 2 >>> 2] >>> 24 - 8 * ((t + 2) % 4) & 255, r = 0; 4 > r && t + .75 * r < u; r++)n.push(f.charAt(e >>> 6 * (3 - r) & 63));
            if (i = f.charAt(64))for (; n.length % 4;)n.push(i);
            return n.join("")
        }, parse: function (n) {
            var e = n.length, f = this._map, i = f.charAt(64), o, s;
            i && (i = n.indexOf(i), -1 != i && (e = i));
            for (var i = [], u = 0, r = 0; r < e; r++)r % 4 && (o = f.indexOf(n.charAt(r - 1)) << 2 * (r % 4), s = f.indexOf(n.charAt(r)) >>> 6 - 2 * (r % 4), i[u >>> 2] |= (o | s) << 24 - 8 * (u % 4), u++);
            return t.create(i, u)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(), function (n) {
    function i(n, t, i, r, u, f, e) {
        return n = n + (t & i | ~t & r) + u + e, (n << f | n >>> 32 - f) + t
    }

    function r(n, t, i, r, u, f, e) {
        return n = n + (t & r | i & ~r) + u + e, (n << f | n >>> 32 - f) + t
    }

    function u(n, t, i, r, u, f, e) {
        return n = n + (t ^ i ^ r) + u + e, (n << f | n >>> 32 - f) + t
    }

    function f(n, t, i, r, u, f, e) {
        return n = n + (i ^ (t | ~r)) + u + e, (n << f | n >>> 32 - f) + t
    }

    for (var o = CryptoJS, e = o.lib, c = e.WordArray, s = e.Hasher, e = o.algo, t = [], h = 0; 64 > h; h++)t[h] = 4294967296 * n.abs(n.sin(h + 1)) | 0;
    e = e.MD5 = s.extend({
        _doReset: function () {
            this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
        }, _doProcessBlock: function (n, e) {
            for (var v, a, l = 0; 16 > l; l++)v = e + l, a = n[v], n[v] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            var l = this._hash.words, v = n[e + 0], a = n[e + 1], ft = n[e + 2], y = n[e + 3], ut = n[e + 4], rt = n[e + 5], it = n[e + 6], tt = n[e + 7], et = n[e + 8], nt = n[e + 9], g = n[e + 10], d = n[e + 11], k = n[e + 12], b = n[e + 13], w = n[e + 14], p = n[e + 15], s = l[0], o = l[1], h = l[2], c = l[3], s = i(s, o, h, c, v, 7, t[0]), c = i(c, s, o, h, a, 12, t[1]), h = i(h, c, s, o, ft, 17, t[2]), o = i(o, h, c, s, y, 22, t[3]), s = i(s, o, h, c, ut, 7, t[4]), c = i(c, s, o, h, rt, 12, t[5]), h = i(h, c, s, o, it, 17, t[6]), o = i(o, h, c, s, tt, 22, t[7]), s = i(s, o, h, c, et, 7, t[8]), c = i(c, s, o, h, nt, 12, t[9]), h = i(h, c, s, o, g, 17, t[10]), o = i(o, h, c, s, d, 22, t[11]), s = i(s, o, h, c, k, 7, t[12]), c = i(c, s, o, h, b, 12, t[13]), h = i(h, c, s, o, w, 17, t[14]), o = i(o, h, c, s, p, 22, t[15]), s = r(s, o, h, c, a, 5, t[16]), c = r(c, s, o, h, it, 9, t[17]), h = r(h, c, s, o, d, 14, t[18]), o = r(o, h, c, s, v, 20, t[19]), s = r(s, o, h, c, rt, 5, t[20]), c = r(c, s, o, h, g, 9, t[21]), h = r(h, c, s, o, p, 14, t[22]), o = r(o, h, c, s, ut, 20, t[23]), s = r(s, o, h, c, nt, 5, t[24]), c = r(c, s, o, h, w, 9, t[25]), h = r(h, c, s, o, y, 14, t[26]), o = r(o, h, c, s, et, 20, t[27]), s = r(s, o, h, c, b, 5, t[28]), c = r(c, s, o, h, ft, 9, t[29]), h = r(h, c, s, o, tt, 14, t[30]), o = r(o, h, c, s, k, 20, t[31]), s = u(s, o, h, c, rt, 4, t[32]), c = u(c, s, o, h, et, 11, t[33]), h = u(h, c, s, o, d, 16, t[34]), o = u(o, h, c, s, w, 23, t[35]), s = u(s, o, h, c, a, 4, t[36]), c = u(c, s, o, h, ut, 11, t[37]), h = u(h, c, s, o, tt, 16, t[38]), o = u(o, h, c, s, g, 23, t[39]), s = u(s, o, h, c, b, 4, t[40]), c = u(c, s, o, h, v, 11, t[41]), h = u(h, c, s, o, y, 16, t[42]), o = u(o, h, c, s, it, 23, t[43]), s = u(s, o, h, c, nt, 4, t[44]), c = u(c, s, o, h, k, 11, t[45]), h = u(h, c, s, o, p, 16, t[46]), o = u(o, h, c, s, ft, 23, t[47]), s = f(s, o, h, c, v, 6, t[48]), c = f(c, s, o, h, tt, 10, t[49]), h = f(h, c, s, o, w, 15, t[50]), o = f(o, h, c, s, rt, 21, t[51]), s = f(s, o, h, c, k, 6, t[52]), c = f(c, s, o, h, y, 10, t[53]), h = f(h, c, s, o, g, 15, t[54]), o = f(o, h, c, s, a, 21, t[55]), s = f(s, o, h, c, et, 6, t[56]), c = f(c, s, o, h, p, 10, t[57]), h = f(h, c, s, o, it, 15, t[58]), o = f(o, h, c, s, b, 21, t[59]), s = f(s, o, h, c, ut, 6, t[60]), c = f(c, s, o, h, d, 10, t[61]), h = f(h, c, s, o, ft, 15, t[62]), o = f(o, h, c, s, nt, 21, t[63]);
            l[0] = l[0] + s | 0, l[1] = l[1] + o | 0, l[2] = l[2] + h | 0, l[3] = l[3] + c | 0
        }, _doFinalize: function () {
            var u = this._data, r = u.words, t = 8 * this._nDataBytes, i = 8 * u.sigBytes, f;
            for (r[i >>> 5] |= 128 << 24 - i % 32, f = n.floor(t / 4294967296), r[(i + 64 >>> 9 << 4) + 15] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360, r[(i + 64 >>> 9 << 4) + 14] = (t << 8 | t >>> 24) & 16711935 | (t << 24 | t >>> 8) & 4278255360, u.sigBytes = 4 * (r.length + 1), this._process(), u = this._hash, r = u.words, t = 0; 4 > t; t++)i = r[t], r[t] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
            return u
        }, clone: function () {
            var n = s.clone.call(this);
            return n._hash = this._hash.clone(), n
        }
    }), o.MD5 = s._createHelper(e), o.HmacMD5 = s._createHmacHelper(e)
}(Math), function () {
    var t = CryptoJS, n = t.lib, i = n.Base, r = n.WordArray, n = t.algo, u = n.EvpKDF = i.extend({
        cfg: i.extend({
            keySize: 4,
            hasher: n.MD5,
            iterations: 1
        }), init: function (n) {
            this.cfg = this.cfg.extend(n)
        }, compute: function (n, t) {
            for (var i, o, f = this.cfg, u = f.hasher.create(), e = r.create(), h = e.words, s = f.keySize, f = f.iterations; h.length < s;) {
                for (i && u.update(i), i = u.update(n).finalize(t), u.reset(), o = 1; o < f; o++)i = u.finalize(i), u.reset();
                e.concat(i)
            }
            return e.sigBytes = 4 * s, e
        }
    });
    t.EvpKDF = function (n, t, i) {
        return u.create(i).compute(n, t)
    }
}(), CryptoJS.lib.Cipher || function (n) {
    var i = CryptoJS, t = i.lib, f = t.Base, e = t.WordArray, c = t.BufferedBlockAlgorithm, l = i.enc.Base64, y = i.algo.EvpKDF, o = t.Cipher = c.extend({
        cfg: f.extend(),
        createEncryptor: function (n, t) {
            return this.create(this._ENC_XFORM_MODE, n, t)
        },
        createDecryptor: function (n, t) {
            return this.create(this._DEC_XFORM_MODE, n, t)
        },
        init: function (n, t, i) {
            this.cfg = this.cfg.extend(i), this._xformMode = n, this._key = t, this.reset()
        },
        reset: function () {
            c.reset.call(this), this._doReset()
        },
        process: function (n) {
            return this._append(n), this._process()
        },
        finalize: function (n) {
            return n && this._append(n), this._doFinalize()
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function (n) {
            return {
                encrypt: function (t, i, r) {
                    return ("string" == typeof i ? v : u).encrypt(n, t, i, r)
                }, decrypt: function (t, i, r) {
                    return ("string" == typeof i ? v : u).decrypt(n, t, i, r)
                }
            }
        }
    });
    t.StreamCipher = o.extend({
        _doFinalize: function () {
            return this._process(!0)
        }, blockSize: 1
    });
    var s = i.mode = {}, a = function (t, i, r) {
        var f = this._iv, u;
        for (f ? this._iv = n : f = this._prevBlock, u = 0; u < r; u++)t[i + u] ^= f[u]
    }, r = (t.BlockCipherMode = f.extend({
        createEncryptor: function (n, t) {
            return this.Encryptor.create(n, t)
        }, createDecryptor: function (n, t) {
            return this.Decryptor.create(n, t)
        }, init: function (n, t) {
            this._cipher = n, this._iv = t
        }
    })).extend();
    r.Encryptor = r.extend({
        processBlock: function (n, t) {
            var i = this._cipher, r = i.blockSize;
            a.call(this, n, t, r), i.encryptBlock(n, t), this._prevBlock = n.slice(t, t + r)
        }
    }), r.Decryptor = r.extend({
        processBlock: function (n, t) {
            var i = this._cipher, r = i.blockSize, u = n.slice(t, t + r);
            i.decryptBlock(n, t), a.call(this, n, t, r), this._prevBlock = u
        }
    }), s = s.CBC = r, r = (i.pad = {}).Pkcs7 = {
        pad: function (n, t) {
            for (var i = 4 * t, i = i - n.sigBytes % i, f = i << 24 | i << 16 | i << 8 | i, r = [], u = 0; u < i; u += 4)r.push(f);
            i = e.create(r, i), n.concat(i)
        }, unpad: function (n) {
            n.sigBytes -= n.words[n.sigBytes - 1 >>> 2] & 255
        }
    }, t.BlockCipher = o.extend({
        cfg: o.cfg.extend({mode: s, padding: r}), reset: function () {
            var t;
            o.reset.call(this);
            var n = this.cfg, i = n.iv, n = n.mode;
            this._xformMode == this._ENC_XFORM_MODE ? t = n.createEncryptor : (t = n.createDecryptor, this._minBufferSize = 1), this._mode = t.call(n, this, i && i.words)
        }, _doProcessBlock: function (n, t) {
            this._mode.processBlock(n, t)
        }, _doFinalize: function () {
            var t = this.cfg.padding, n;
            return this._xformMode == this._ENC_XFORM_MODE ? (t.pad(this._data, this.blockSize), n = this._process(!0)) : (n = this._process(!0), t.unpad(n)), n
        }, blockSize: 4
    });
    var h = t.CipherParams = f.extend({
        init: function (n) {
            this.mixIn(n)
        }, toString: function (n) {
            return (n || this.formatter).stringify(this)
        }
    }), s = (i.format = {}).OpenSSL = {
        stringify: function (n) {
            var t = n.ciphertext;
            return n = n.salt, (n ? e.create([1398893684, 1701076831]).concat(n).concat(t) : t).toString(l)
        }, parse: function (n) {
            var t, i;
            return n = l.parse(n), t = n.words, 1398893684 == t[0] && 1701076831 == t[1] && (i = e.create(t.slice(2, 4)), t.splice(0, 4), n.sigBytes -= 16), h.create({
                ciphertext: n,
                salt: i
            })
        }
    }, u = t.SerializableCipher = f.extend({
        cfg: f.extend({format: s}), encrypt: function (n, t, i, r) {
            r = this.cfg.extend(r);
            var u = n.createEncryptor(i, r);
            return t = u.finalize(t), u = u.cfg, h.create({
                ciphertext: t,
                key: i,
                iv: u.iv,
                algorithm: n,
                mode: u.mode,
                padding: u.padding,
                blockSize: n.blockSize,
                formatter: r.format
            })
        }, decrypt: function (n, t, i, r) {
            return r = this.cfg.extend(r), t = this._parse(t, r.format), n.createDecryptor(i, r).finalize(t.ciphertext)
        }, _parse: function (n, t) {
            return "string" == typeof n ? t.parse(n, this) : n
        }
    }), i = (i.kdf = {}).OpenSSL = {
        execute: function (n, t, i, r) {
            return r || (r = e.random(8)), n = y.create({keySize: t + i}).compute(n, r), i = e.create(n.words.slice(t), 4 * i), n.sigBytes = 4 * t, h.create({
                key: n,
                iv: i,
                salt: r
            })
        }
    }, v = t.PasswordBasedCipher = u.extend({
        cfg: u.cfg.extend({kdf: i}), encrypt: function (n, t, i, r) {
            return r = this.cfg.extend(r), i = r.kdf.execute(i, n.keySize, n.ivSize), r.iv = i.iv, n = u.encrypt.call(this, n, t, i.key, r), n.mixIn(i), n
        }, decrypt: function (n, t, i, r) {
            return r = this.cfg.extend(r), t = this._parse(t, r.format), i = r.kdf.execute(i, n.keySize, n.ivSize, t.salt), r.iv = i.iv, u.decrypt.call(this, n, t, i.key, r)
        }
    })
}(), function () {
    for (var i, tt, s = CryptoJS, d = s.lib.BlockCipher, a = s.algo, t = [], k = [], b = [], w = [], p = [], y = [], l = [], v = [], c = [], h = [], u = [], e = 0; 256 > e; e++)u[e] = 128 > e ? e << 1 : e << 1 ^ 283;
    for (var r = 0, f = 0, e = 0; 256 > e; e++) {
        i = f ^ f << 1 ^ f << 2 ^ f << 3 ^ f << 4, i = i >>> 8 ^ i & 255 ^ 99, t[r] = i, k[i] = r;
        var o = u[r], g = u[o], nt = u[g], n = 257 * u[i] ^ 16843008 * i;
        b[r] = n << 24 | n >>> 8, w[r] = n << 16 | n >>> 16, p[r] = n << 8 | n >>> 24, y[r] = n, n = 16843009 * nt ^ 65537 * g ^ 257 * o ^ 16843008 * r, l[i] = n << 24 | n >>> 8, v[i] = n << 16 | n >>> 16, c[i] = n << 8 | n >>> 24, h[i] = n, r ? (r = o ^ u[u[u[nt ^ o]]], f ^= u[u[f]]) : r = f = 1
    }
    tt = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], a = a.AES = d.extend({
        _doReset: function () {
            for (var n, f = this._key, e = f.words, r = f.sigBytes / 4, f = 4 * ((this._nRounds = r + 6) + 1), u = this._keySchedule = [], i = 0; i < f; i++)i < r ? u[i] = e[i] : (n = u[i - 1], i % r ? 6 < r && 4 == i % r && (n = t[n >>> 24] << 24 | t[n >>> 16 & 255] << 16 | t[n >>> 8 & 255] << 8 | t[n & 255]) : (n = n << 8 | n >>> 24, n = t[n >>> 24] << 24 | t[n >>> 16 & 255] << 16 | t[n >>> 8 & 255] << 8 | t[n & 255], n ^= tt[i / r | 0] << 24), u[i] = u[i - r] ^ n);
            for (e = this._invKeySchedule = [], r = 0; r < f; r++)i = f - r, n = r % 4 ? u[i] : u[i - 4], e[r] = 4 > r || 4 >= i ? n : l[t[n >>> 24]] ^ v[t[n >>> 16 & 255]] ^ c[t[n >>> 8 & 255]] ^ h[t[n & 255]]
        }, encryptBlock: function (n, i) {
            this._doCryptBlock(n, i, this._keySchedule, b, w, p, y, t)
        }, decryptBlock: function (n, t) {
            var i = n[t + 1];
            n[t + 1] = n[t + 3], n[t + 3] = i, this._doCryptBlock(n, t, this._invKeySchedule, l, v, c, h, k), i = n[t + 1], n[t + 1] = n[t + 3], n[t + 3] = i
        }, _doCryptBlock: function (n, t, i, r, u, f, e, o) {
            for (var b = this._nRounds, h = n[t] ^ i[0], c = n[t + 1] ^ i[1], l = n[t + 2] ^ i[2], s = n[t + 3] ^ i[3], a = 4, w = 1; w < b; w++)var v = r[h >>> 24] ^ u[c >>> 16 & 255] ^ f[l >>> 8 & 255] ^ e[s & 255] ^ i[a++], p = r[c >>> 24] ^ u[l >>> 16 & 255] ^ f[s >>> 8 & 255] ^ e[h & 255] ^ i[a++], y = r[l >>> 24] ^ u[s >>> 16 & 255] ^ f[h >>> 8 & 255] ^ e[c & 255] ^ i[a++], s = r[s >>> 24] ^ u[h >>> 16 & 255] ^ f[c >>> 8 & 255] ^ e[l & 255] ^ i[a++], h = v, c = p, l = y;
            v = (o[h >>> 24] << 24 | o[c >>> 16 & 255] << 16 | o[l >>> 8 & 255] << 8 | o[s & 255]) ^ i[a++], p = (o[c >>> 24] << 24 | o[l >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[h & 255]) ^ i[a++], y = (o[l >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[h >>> 8 & 255] << 8 | o[c & 255]) ^ i[a++], s = (o[s >>> 24] << 24 | o[h >>> 16 & 255] << 16 | o[c >>> 8 & 255] << 8 | o[l & 255]) ^ i[a++], n[t] = v, n[t + 1] = p, n[t + 2] = y, n[t + 3] = s
        }, keySize: 8
    }), s.AES = d._createHelper(a)
}(), $(function () {
    remeberSearch(), rateSearch(), inputSetting(), AddCount(0)
}), UserID = "", UserName = ""