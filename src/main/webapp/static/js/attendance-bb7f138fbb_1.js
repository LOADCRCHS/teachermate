var DEFAULT_DIGIT = 3;
!function (t) {
    "use strict";
    var i = function (e, n) {
        this.element = e, this.element.hasClass("flipTimer") || this.element.addClass("flipTimer"), this.userOptions = n, this.defaultOptions = i.defaults, this.options = t.extend({}, this.defaultOptions, this.userOptions), this.element.find(".seconds").length > 0 && (this.options.seconds = this.element.find(".seconds")[0]), this.element.find(".minutes").length > 0 && (this.options.minutes = this.element.find(".minutes")[0]), this.element.find(".hours").length > 0 && (this.options.hours = this.element.find(".hours")[0]), this.element.find(".days").length > 0 && (this.options.days = this.element.find(".days")[0]), this.initDate = new Date, this.options.date = new Date(this.options.date), this.calculateDate()
    };
    t(".digit-set").each(function (i, e) {
        5 - i <= DEFAULT_DIGIT && t(e).css("display", "inline-block")
    }), i.defaults = {
        seconds: !1,
        minutes: !1,
        hours: !1,
        days: !1,
        date: (new Date).toDateString(),
        direction: "up",
        callback: null,
        digitTemplate: '<div class="digit">  <div class="digit-top">    <span class="digit-wrap"></span>  </div>  <div class="shadow-top"></div>  <div class="digit-bottom">    <span class="digit-wrap"></span>  </div>  <div class="shadow-bottom"></div></div>'
    }, i.prototype = {
        calculateDate: function () {
            var t;
            "down" == this.options.direction ? t = this.options.date - this.initDate : "up" == this.options.direction && (t = this.initDate - this.options.date), this.seconds = 0, this.render()
        }, render: function () {
            this.options.seconds && this.renderDigits(this.options.seconds, this.seconds), this.options.minutes && this.renderDigits(this.options.minutes, this.minutes), this.options.hours && this.renderDigits(this.options.hours, this.hours), this.options.days && this.renderDigits(this.options.days, this.days), this.startTimer(0)
        }, renderDigits: function (i, e) {
            var n, s, a, o, r, c, d = this;
            0 === t(i).find(".digit").length && (c = d.days < 0 && d.hours < 0 && d.minutes < 0 && d.seconds < 0 ? [0, 0] : d.days > 99 ? [0, 0] : String((e / 10).toFixed(1)).split("."), o = i == d.options.seconds || i == d.options.minutes ? 5 : i == d.options.hours ? 2 : 9, t(i).append('<div class="digit-set"></div><div class="digit-set"></div>'), t(i).find(".digit-set").each(function (i) {
                for (a = 0 === i ? o : 9, n = 0; n <= a; n++) t(this).append(d.options.digitTemplate), s = "down" == d.options.direction ? a - n : n, r = t(this).find(".digit")[n], t(r).find(".digit-wrap").append(s), s == c[i] ? t(r).addClass("active") : 0 !== c[i] && s + 1 == c[i] ? t(r).addClass("previous") : 0 === c[i] && s == a && t(r).addClass("previous")
            }))
        }, startTimer: function (t) {
            var i = this;
            i.increaseDigit(i.options.seconds, t), i.seconds = t
        }, increaseDigit: function (i, e) {
            function n(i, e) {
                var n = t(i).find(".active"), a = t(i).find(".previous");
                t.inArray(i, s);
                a.removeClass("previous"), e != n.index() && (n.removeClass("active").addClass("previous"), t(t(i).find(".digit")[e]).addClass("active"))
            }

            var s = [], a = DEFAULT_DIGIT;
            e > 9999 ? a += 2 : e > 999 && (a += 1), t(i).find(".digit-set").each(function (i) {
                s.push(this), 5 - i <= a && t(this).css("display", "inline-block")
            }), n(s[s.length - 1], parseInt(e) % 10), n(s[s.length - 2], parseInt(e / 10) % 10), n(s[s.length - 3], parseInt(e / 100) % 10), n(s[s.length - 4], parseInt(e / 1e3) % 10), n(s[s.length - 5], parseInt(e / 1e4) % 10)
        }
    }, t.fn.flipTimer = function (e) {
        return this.each(function () {
            t(this).data("flipTimer") || t(this).data("flipTimer", new i(t(this), e))
        })
    }
}(jQuery), function (t) {
    "use strict";

    function i(i, e) {
        if (M) try {
            M.destroy()
        } catch (n) {
            console.error(n)
        }

        t(".group-chart-container").html(""), t("#sign-id").val(i), t.ajax({
            method: "get",
            url: "course/his_sign/" + i
        }).done(function (i) {
            //var i = JSON.parse(i);
            if ("success" == i.msg) {
                var tpl_str = "<div class=\"student-contaner\">" +
                    "    <div class=\"delete-btn\"><i class=\"icon icon-delete\"></i> 删除本次签到</div>" +
                    "    <section class=\"student-info\">" +
                    "        <p class=\"sign-title\">本次签到开启于 " + i.data.date + "</p>" +
                    "        <div class=\"sign-info grey-text\"><p>出勤</p>" +
                    "            <p class=\"grey-text text-darken-2\">" +
                    "                <span class=\"sign-num\">" + i.data.sign_student_count + "</span>人" +
                    "            </p>" +
                    "        </div>" +
                    "        <div class=\"sign-info grey-text\"><p>出勤率</p>" +
                    "            <p class=\"grey-text text-darken-2\">" +
                    "                <span class=\"sign-num\">" + i.data.ratio + "</span>%" +
                    "            </p>" +
                    "        </div>" +
                    "        <div class=\"sign-info grey-text\"><p>签到开启时长</p>" +
                    "            <p class=\"grey-text text-darken-2\">" +
                    "                <span class=\"sign-num\">" + i.data.minutes + "</span>分" +
                    "                <span class=\"sign-num\">" + i.data.seconds + "</span>秒" +
                    "            </p>" +
                    "        </div>" +
                    "    </section>" +
                    "    <ul class=\"student-list\"></ul>" +
                    "    <div class=\"long-line hidden\"></div>" +
                    "    <ul class=\"rest-list\"></ul>" +
                    "    <div class=\"no-sign-list\"><h3></h3>" +
                    "        <ul></ul>" +
                    "    </div>" +
                    "</div>";
                t(".count").hide(), t(".student-contaner").replaceWith(tpl_str), t(".long-line").removeClass("hidden");
                var n = i.data.signDistribution, s = _.size(n), a = _.reduce(n, function (t, i, e) {
                    var n = _.map(i.stateCount, function (t, i) {
                        var n;
                        switch (i) {
                            case 0:
                                n = "3";
                                break;
                            case 1:
                                n = "0";
                                break;
                            case 2:
                                n = "1";
                                break;
                            case 3:
                                n = "2"
                        }
                        return {count: t, type: n, teamId: e}
                    });
                    return t.concat(n)
                }, []);
                a = _.sortBy(a, "type"), a.reverse();
                var o = new DataSet, r = o.createView().source(a).transform({
                    type: "percent",
                    field: "count",
                    dimension: "type",
                    groupBy: ["teamId"],
                    as: "percent"
                });
                M = new G2.Chart({
                    container: t(".group-chart-container").get(0),
                    animate: !1,
                    height: 260,
                    plotCfg: {margin: [20, 80, 100, 80]},
                    forceFit: !0
                }), M.source(r, {
                    percent: {
                        min: 0, formatter: function (t) {
                            return (100 * t).toFixed(2) + "%"
                        }
                    }
                }), M.scale("teamId", {
                    formatter: function (t) {
                        return 0 == t ? "未分组" : n[t].name
                    }
                }).scale("type", {
                    alias: "签到状态", formatter: function (t) {
                        var i;
                        switch (t) {
                            case"3":
                                i = "旷课";
                                break;
                            case"0":
                                i = "签到成功";
                                break;
                            case"1":
                                i = "请假";
                                break;
                            case"2":
                                i = "迟到"
                        }
                        return i
                    }
                });
                var c = M.intervalStack();
                s <= 10 && c.size(30), c.position("teamId*percent").color("type", function (t) {
                    var i;
                    switch (t) {
                        case"3":
                            i = "#666666";
                            break;
                        case"0":
                            i = "#48D1AE";
                            break;
                        case"1":
                            i = "#F5A623";
                            break;
                        case"2":
                            i = "#e45757"
                    }
                    return i
                }).tooltip("type*count", function (t, i) {
                    var e;
                    switch (t) {
                        case"3":
                            e = "旷课";
                            break;
                        case"0":
                            e = "签到成功";
                            break;
                        case"1":
                            e = "请假";
                            break;
                        case"2":
                            e = "迟到"
                    }
                    return {name: e, value: i + "人"}
                }), M.legend("type", {position: "top"}), M.axis("teamId", {
                    label: {
                        offset: 6,
                        textStyle: {textAlign: "end", rotate: 315}
                    }
                }), M.render(), U.data("flipTimer").startTimer(parseInt(i.data.sign_student_count)), t(".header .date").html(i.data.date + " 考勤表"), e && e(i), y(), D()
            }
        }, "json")
    }

    function e(i, e, s) {
        s && p(0, !0), t(document.body).css("overflow", "hidden");
        var a = "../pc-ssr/courses/" + i + "/qr-sign/" + e, o = document.createElement("iframe");
        o.setAttribute("id", "qr-frame"), o.setAttribute("width", "100%"), o.setAttribute("height", "100%"), o.src = a, document.body.appendChild(o), window.closeQRSignPanel = function (i) {
            window.closeQRSignPanel = void 0, n(function () {
                t("#qr-frame").remove(), t(document.body).css("overflow", "auto")
            })
        }
    }

    function n(e) {
        var n = t("#sign-id").val(), s = t("#is-gps").val();
        clearInterval(G), clearInterval(q), x("PUT", "/api/v1/class-attendance/" + n + "/close", {course_id: z}, function (t) {
            O(W.closeCheckIn), d(t), e && e()
        }, function (t) {
            403 === t.status ? (i(n, function (t) {
                var i = t.data, s = {
                    signId: n,
                    order: i.order,
                    signTime: i.date.substring(11, 16),
                    isGps: "1" === i.gps,
                    count: i.sign_student_count,
                    ratio: i.ratio,
                    isQr: i.isQr
                };
                u(s), e && e()
            }), l(s)) : window.location.reload()
        })
    }

    function s(t) {
        L.html(t).fadeIn("fast"), setTimeout(function () {
            L.fadeOut("slow")
        }, 1e3)
    }

    function a(t) {
        var i = parseFloat(t);
        return i > 9e3 ? "9+" : (i / 1e3).toFixed(1)
    }

    function o() {
        t(".group-switch").show();
        var e, n = t("#sign-id").val(), s = t("#course-id").val(), a = {0: "", 1: "overflow", "-1": "position-fail"};
        G = setInterval(function () {
            x("GET", "/api/v1/class-attendance/" + n, {course_id: s}, function (i) {
                if (!i.course) return clearInterval(G), clearInterval(q), void d(i);
                var n = i.course.students, s = parseInt(i.sign.isGps), o = c(n), l = i.signInLogs, u = i.isJSJ;
                if (l.length > F && A.play(), F = l.length, t("#leave-time").val(i.sign.ttl), R || (R = !0, f()), U.data("flipTimer").startTimer(parseInt(F, 10)), parseInt(F, 10) > 10 && t(".long-line").removeClass("hidden"), N) {
                    var p = i.course.teams.length, g = c(i.course.teams), h = _.reduce(n, function (t, i) {
                        return t[i.teamId] = t[i.teamId] ? t[i.teamId] + 1 : 1, t
                    }, {}), v = _.groupBy(l, function (t) {
                        var i = t.studentId;
                        return o[i].teamId
                    }), m = _.reduce(v, function (t, i, e) {
                        return t.push({teamId: e, isSignIn: "true", count: i.length}), t
                    }, []), I = _.reduce(h, function (t, i, e) {
                        var n = v[e] ? v[e].length : 0;
                        return t.push({teamId: e, isSignIn: "false", count: i - n}), t
                    }, []), w = I.concat(m), y = new DataSet, k = y.createView().source(w).transform({
                        type: "percent",
                        field: "count",
                        dimension: "isSignIn",
                        groupBy: ["teamId"],
                        as: "percent"
                    });
                    if (e) e.changeData(k); else {
                        e = new G2.Chart({
                            container: t(".group-chart-container").get(0),
                            animate: !1,
                            height: 260,
                            plotCfg: {margin: [20, 80, 100, 80]},
                            forceFit: !0
                        }), e.source(k, {
                            percent: {
                                min: 0, formatter: function (t) {
                                    return (100 * t).toFixed(2) + "%"
                                }
                            }
                        }), e.scale("teamId", {
                            formatter: function (t) {
                                return 0 == t ? "未分组" : g[t].name
                            }
                        }).scale("isSignIn", {
                            alias: "签到状态", formatter: function (t) {
                                return "true" === t ? "已签到" : "未签到"
                            }
                        });
                        var b = e.intervalStack();
                        p <= 10 && b.size(30), b.position("teamId*percent").color("isSignIn", function (t) {
                            return "true" === t ? "#48D1AE" : "#666666"
                        }).tooltip("isSignIn*count", function (t, i) {
                            var e = "true" === t ? "已签到" : "未签到";
                            return {name: e, value: i + "人"}
                        }), e.legend(!1), e.axis("teamId", {
                            offset: 6,
                            label: {textStyle: {textAlign: "end", rotate: 315}}
                        }), e.render()
                    }
                }
                for (var T = "", C = "", D = 0; D < (F < 10 ? F : 10); D++) {
                    var x = l[D];
                    if (x) {
                        var S = x.studentId, O = s ? r(x.isOutOfBound, x.distance) : "", j = s ? a[x.isOutOfBound] : "",
                            Q = o[S].avatar;
                        u && (Q = D < 5 ? "./assets/images/jiaoshijie/a" + D + ".jpg" : "./assets/images/jiaoshijie/a5.png"), T += '<li class="border-gold"><div class="avatar-wrap"><img src="' + Q + '"></div><span class="name ' + j + '">' + o[S].name + O + "</span></li>"
                    }
                }
                if (t(".student-list").empty().append(T), F > 10) {
                    for (var D = 10; D < F; D++) {
                        var J = l[D];
                        if (J) {
                            var S = J.studentId, O = s ? r(J.isOutOfBound, J.distance) : "",
                                j = s ? a[J.isOutOfBound] : "";
                            C += '<li class="name ' + j + '"><span>' + o[S].name + "</span>" + O + "</li>"
                        }
                    }
                    t(".rest-list").empty().append(C)
                }
            }, function (t) {
                403 == t.status && (clearInterval(G), clearInterval(q), i(n, function (t) {
                    var i = t.data, e = {
                        signId: n,
                        order: i.order,
                        signTime: i.date.substring(11, 16),
                        isGps: "1" === i.gps,
                        count: i.sign_student_count,
                        ratio: i.ratio,
                        isQr: i.isQr
                    };
                    l(i.gps), u(e)
                }))
            })
        }, 2e3)
    }

    function r(t, i) {
        var e = {0: "", 1: '<p class="distance">' + a(i) + "km<p>", "-1": '<p class="distance">定位失败<p>'};
        return e[t] || ""
    }

    function c(t) {
        var i = {};
        return t.forEach(function (t) {
            i[t.id] = t
        }), i
    }

    function d(e) {
        var n = (t("#course-id").val(), t("#sign-id").val()), a = e.sign, o = a.rank, r = a.date.substring(11, 16),
            c = a.isGps, d = a.count, p = a.ratio || 0,
            f = {signId: n, order: o, signTime: r, isGps: c, count: d, ratio: p, isQr: a.isQr || !1};
        R = !1, s("成功关闭本轮签到！"), l(c), u(f), y(), D(), i(n)
    }

    function l() {
        t(".check-time").addClass("hidden"), B.removeClass("sign-on"), t(".start-sign").attr("disabled", !1), t(".check-time").replaceWith('<span class="check-time hidden"><span class="title">距离签到结束还有</span><span class="left-time"></span></span>'), t(".btn-close").css("display", "none"), t(".history-info").off("click").on("click", ".history-item", function () {
            var e = t(this).attr("data-id");
            i(e)
        })
    }

    function u(i) {
        var e = "", n = "";
        i.isGps ? n = '<i class="sign-icon fa fa-map-marker"></i>' : i.isQr && (n = '<i class="sign-icon fa fa-qrcode"></i>'), t("#sign_id").val(i.signId), e += '<li class="history-item" data-id="' + i.signId + '"><span><i class="sign-index">' + i.order + "</i>" + i.signTime + n + '</span><span class="sign-ratio">' + i.count + " (" + i.ratio + "%)</span></li>", t(".sign-count").eq(0).text("已完成" + i.order + "次签到"), t(".present-data ul").prepend(e)
    }

    function p(i, e) {
        var n = new Date, a = n.getHours() < 10 ? "0" + n.getHours() : n.getHours(),
            r = n.getMinutes() < 10 ? "0" + n.getMinutes() : n.getMinutes(), c = a + ":" + r,
            d = t(".present-data .detail-data li").length + 1;
        if (e || o(), e) var l = '<i id="sign-icon" class="sign-icon fa fa-qrcode"></i>'; else if (1 == i) var l = '<i id="sign-icon" class="sign-icon fa fa-map-marker"></i>'; else var l = '<i id="sign-icon"></i>';
        t("#sign-icon").replaceWith(l), t("#sign-index").text(d), t("#sign-time").text(c), B.addClass("sign-on"), t(".btn-close").css("display", "block"), s("成功开启签到！"), t(".student-list").html(""), t(".rest-list").html(""), t(".student-info").remove(), t(".delete-btn").remove(), t(".long-line").addClass("hidden"), U.data("flipTimer").startTimer(0), t(".no-sign-list").addClass("hidden"), t(".history-info").off("click").on("click", function () {
            alert("本课堂正在签到中，关闭签到后方可查看历史签到。")
        })
    }

    function f() {
        function i(t, i) {
            return function () {
                t = parseInt(t), t >= 0 ? (i.text(t), t -= 1) : (s.html("到时间啦~继续签到无效"), n())
            }
        }

        var e = t(".left-time"), s = t(".check-time"), a = t("#leave-time").val();
        e.text(a), s.removeClass("hidden"), "0" !== t("#is_sign").val() && (q = setInterval(i(a, e), 1e3))
    }

    function g(t) {
        w(t, 3, "sign/set_leave")
    }

    function h(t) {
        w(t, 2, "sign/set_leave")
    }

    function v(t) {
        w(t, 1, "sign/set_leave")
    }

    function m(t) {
        w(t, 0, "sign/set_leave")
    }

    function I(t, i, e) {
        var n = {
            "sign/set_leave": {0: "修改为旷课", 1: "修改为正常", 2: "修改为请假", 3: "修改为迟到"},
            "sign/set_drop": {0: "修改为正常", 1: "修改为旷课", 2: "修改为请假", 3: "修改为迟到"}
        };
        t.attr("data-state", i), s(n[e][i])
    }

    function w(e, n, s) {
        var a = e.attr("data-sid"), o = t("#sign-id").val(), r = t("#course-id").val(), c = t(".student-list"),
            d = t(".rest-list");
        c.off("click"), d.off("click"), t.post(s, {
            student_id: a,
            sign_id: o,
            course_id: r,
            state: n
        }).done(function () {
            I(e, n, s), D(), i(o, function (i) {
                var e = i.data, n = e.sign_student_count, s = e.ratio;
                t("#sign-ratio-" + o).text(n + " (" + s + "%)")
            })
        })
    }

    function y() {
        var i = {0: v, 1: g, 2: m, 3: h}, e = t(".no-sign-list");
        e.off("click").on("click", ".state-btn", function () {
            var e = t(this).parent("li"), n = e.attr("data-state");
            i[n](e)
        })
    }

    function k(t) {
        w(t, 1, "sign/set_drop")
    }

    function b(t) {
        w(t, 2, "sign/set_drop")
    }

    function T(t) {
        w(t, 3, "sign/set_drop")
    }

    function C(t) {
        w(t, 0, "sign/set_drop")
    }

    function D() {
        function i() {
            var i = t(this).parents("li"), n = i.attr("data-state");
            e[n](i)
        }

        var e = {0: k, 1: b, 2: T, 3: C}, n = t(".student-list"), s = t(".rest-list");
        n.off("click").on("click", ".sign-state-btn", i), s.off("click").on("click", ".sign-state-btn", i)
    }

    function x(i, e, n, s, a) {
        var o = t("#authorization").val();
        t.ajax({
            type: i, url: e, data: n, success: s, error: a, dataType: "json", beforeSend: function (t) {
                t.setRequestHeader("Authorization", o)
            }
        })
    }

    function S() {
        t.getJSON("config/faye.conf.json", function (i) {
            W = i, V = new Faye.Client(W.client);
            var e = t("#course-id").val();
            V.subscribe(W.openCheckIn + e, j), V.subscribe(W.closeCheckIn + e, Q)
        })
    }

    function O(i) {
        var e = t("#course-id").val(), n = t("#sign-id").val();
        V.publish(i + e, {courseId: e, signId: n, origin: "pc"})
    }

    function j(t) {
        "wechat" === t.origin && window.location.reload()
    }

    function Q(e) {
        if ("wechat" == e.origin) {
            clearInterval(G), clearInterval(q);
            var n = t("#sign-id").val(), s = t("#is-gps").val();
            i(n, function (t) {
                var i = t.data, e = {
                    signId: n,
                    order: i.order,
                    signTime: i.date.substring(11, 16),
                    isGps: "1" === i.gps,
                    count: i.sign_student_count,
                    ratio: i.ratio,
                    isQr: i.isQr
                };
                u(e)
            }), l(s)
        }
    }

    var A = new Howl({src: ["https://app.teachermate.com.cn/sounds/complete.webm", "https://app.teachermate.com.cn/sounds/complete.mp3"]}),
        F = 0;
    t(".group-switch").hide(), t(".checkin-grey").removeClass("checkin-grey").addClass("checkin");
    var G, q, J = (t(".J-open"), t(".btn-close")), B = t(".history-list"), E = t(".delete-history-dialog"),
        P = new Dialog(".delete-history-dialog"), z = t("#course-id").val(), H = null, N = !1, L = t("#finish-tip"),
        U = t(".count").flipTimer({seconds: !0});
    t(".right-wrap").on("click", ".delete-btn", function (i) {
        i.stopPropagation(), H = t("#sign-id").val(), P.showDialog()
    }), t(".history-info").off("click").on("click", ".history-item", function () {
        var e = t(this).attr("data-id");
        t(".group-switch").show(), i(e)
    });
    var M;
    E.on("confirm", function () {
        t.ajax({method: "delete", url: "user/delete_sign?sign_id=" + H}).done(function (t) {
            var t = JSON.parse(t);
            "delete success" == t.msg && window.location.reload()
        }, "json")
    }), t("[name=group]").on("change", function () {
        N = t(this).get(0).checked, N ? (t(".right-wrap").addClass("grouped"), M && M.forceFit()) : t(".right-wrap").removeClass("grouped")
    }), t(".history-container").on("click", ".gps-sign", function () {
        t(".start-sign").attr("disabled", !0);
        var i = t("#course-id").val(), e = 1 == t(this).attr("gps") ? 1 : 0;
        t("#is-gps").val(e), x("POST", "/api/v1/class-attendance", {course_id: i, is_gps: e}, function (i) {
            t("#sign-id").val(i.sign.id), t("#leave-time").val(i.sign.ttl), t("#is_sign").val("1"), t(".count").show(), t(".J-open").html("关闭签到"), U.data("flipTimer").startTimer(0), O(W.openCheckIn), p(e), t(".group-chart-container").html("")
        }, function (i) {
            if (403 === i.status) {
                var e = JSON.parse(i.responseText);
                s(e.msg), 101 == e.errorCode && window.location.reload()
            } else s("开启签到失败，请稍候重试");
            t(".start-sign").attr("disabled", !1)
        })
    }), t(".history-container").on("click", ".qr-sign", function () {
        t(".start-sign").attr("disabled", !0);
        var i = t("#course-id").val();
        x("POST", "/api/v1/class-attendance", {course_id: i, isQr: !0}, function (n) {
            var s = n.sign.id;
            t("#sign-id").val(s), e(i, s, !0)
        }, function (i) {
            if (403 === i.status) {
                var e = JSON.parse(i.responseText);
                s(e.msg), 101 == e.errorCode && window.location.reload()
            } else s("开启签到失败，请稍候重试");
            t(".start-sign").attr("disabled", !1)
        })
    }), J.off().on("click", n), function () {
        "1" === t("#is_sign").val() && ("1" === t("#is_qr_sign").val() ? e(t("#course-id").val(), t("#sign-id").val()) : o(), t(".history-info").off("click").on("click", function () {
            alert("本课堂正在签到中，关闭签到后方可查看历史签到。")
        }))
    }();
    var R = !1, W = {}, V = {};
    S()
}(jQuery);