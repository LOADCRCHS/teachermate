var DEFAULT_DIGIT = 3;
!function (t) {
    "use strict";
    var e = function (i, n) {
        this.element = i, this.element.hasClass("flipTimer") || this.element.addClass("flipTimer"), this.userOptions = n, this.defaultOptions = e.defaults, this.options = t.extend({}, this.defaultOptions, this.userOptions), this.element.find(".seconds").length > 0 && (this.options.seconds = this.element.find(".seconds")[0]), this.element.find(".minutes").length > 0 && (this.options.minutes = this.element.find(".minutes")[0]), this.element.find(".hours").length > 0 && (this.options.hours = this.element.find(".hours")[0]), this.element.find(".days").length > 0 && (this.options.days = this.element.find(".days")[0]), this.initDate = new Date, this.options.date = new Date(this.options.date), this.calculateDate()
    };
    t(".digit-set").each(function (e, i) {
        5 - e <= DEFAULT_DIGIT && t(i).css("display", "inline-block")
    }), e.defaults = {
        seconds: !1,
        minutes: !1,
        hours: !1,
        days: !1,
        date: (new Date).toDateString(),
        direction: "up",
        callback: null,
        digitTemplate: '<div class="digit">  <div class="digit-top">    <span class="digit-wrap"></span>  </div>  <div class="shadow-top"></div>  <div class="digit-bottom">    <span class="digit-wrap"></span>  </div>  <div class="shadow-bottom"></div></div>'
    }, e.prototype = {
        calculateDate: function () {
            var t;
            "down" == this.options.direction ? t = this.options.date - this.initDate : "up" == this.options.direction && (t = this.initDate - this.options.date), this.seconds = 0, this.render()
        }, render: function () {
            this.options.seconds && this.renderDigits(this.options.seconds, this.seconds), this.options.minutes && this.renderDigits(this.options.minutes, this.minutes), this.options.hours && this.renderDigits(this.options.hours, this.hours), this.options.days && this.renderDigits(this.options.days, this.days), this.startTimer(0)
        }, renderDigits: function (e, i) {
            var n, s, a, o, r, c, d = this;
            0 === t(e).find(".digit").length && (c = d.days < 0 && d.hours < 0 && d.minutes < 0 && d.seconds < 0 ? [0, 0] : d.days > 99 ? [0, 0] : String((i / 10).toFixed(1)).split("."), o = e == d.options.seconds || e == d.options.minutes ? 5 : e == d.options.hours ? 2 : 9, t(e).append('<div class="digit-set"></div><div class="digit-set"></div>'), t(e).find(".digit-set").each(function (e) {
                for (a = 0 === e ? o : 9, n = 0; n <= a; n++) t(this).append(d.options.digitTemplate), s = "down" == d.options.direction ? a - n : n, r = t(this).find(".digit")[n], t(r).find(".digit-wrap").append(s), s == c[e] ? t(r).addClass("active") : 0 !== c[e] && s + 1 == c[e] ? t(r).addClass("previous") : 0 === c[e] && s == a && t(r).addClass("previous")
            }))
        }, startTimer: function (t) {
            var e = this;
            e.increaseDigit(e.options.seconds, t), e.seconds = t
        }, increaseDigit: function (e, i) {
            function n(e, i) {
                var n = t(e).find(".active"), a = t(e).find(".previous");
                t.inArray(e, s);
                a.removeClass("previous"), i != n.index() && (n.removeClass("active").addClass("previous"), t(t(e).find(".digit")[i]).addClass("active"))
            }

            var s = [], a = DEFAULT_DIGIT;
            i > 9999 ? a += 2 : i > 999 && (a += 1), t(e).find(".digit-set").each(function (e) {
                s.push(this), 5 - e <= a && t(this).css("display", "inline-block")
            }), n(s[s.length - 1], parseInt(i) % 10), n(s[s.length - 2], parseInt(i / 10) % 10), n(s[s.length - 3], parseInt(i / 100) % 10), n(s[s.length - 4], parseInt(i / 1e3) % 10), n(s[s.length - 5], parseInt(i / 1e4) % 10)
        }
    }, t.fn.flipTimer = function (i) {
        return this.each(function () {
            t(this).data("flipTimer") || t(this).data("flipTimer", new e(t(this), i))
        })
    }
}(jQuery), function (t) {
    "use strict";

    function e(e, i) {
        if (U) try {
            U.destroy()
        } catch (n) {
            console.error(n)
        }
        t(".group-chart-container").html(""), t("#sign-id").val(e), t.ajax({
            method: "get",
            url: "course/his_sign/" + e
        }).done(function (e) {
            var e = JSON.parse(e);
            if ("success" == e.msg) {
                t(".count").hide(), t(".student-contaner").replaceWith(e.data.tpl), t(".long-line").removeClass("hidden");
                var n = e.data.signDistribution, s = _.size(n), a = _.reduce(n, function (t, e, i) {
                    var n = _.map(e.stateCount, function (t, e) {
                        var n;
                        switch (e) {
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
                        return {count: t, type: n, teamId: i}
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
                U = new G2.Chart({
                    container: t(".group-chart-container").get(0),
                    animate: !1,
                    height: 260,
                    plotCfg: {margin: [20, 80, 100, 80]},
                    forceFit: !0
                }), U.source(r, {
                    percent: {
                        min: 0, formatter: function (t) {
                            return (100 * t).toFixed(2) + "%"
                        }
                    }
                }), U.scale("teamId", {
                    formatter: function (t) {
                        return 0 == t ? "未分组" : n[t].name
                    }
                }).scale("type", {
                    alias: "签到状态", formatter: function (t) {
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
                        return e
                    }
                });
                var c = U.intervalStack();
                s <= 10 && c.size(30), c.position("teamId*percent").color("type", function (t) {
                    var e;
                    switch (t) {
                        case"3":
                            e = "#666666";
                            break;
                        case"0":
                            e = "#48D1AE";
                            break;
                        case"1":
                            e = "#F5A623";
                            break;
                        case"2":
                            e = "#e45757"
                    }
                    return e
                }).tooltip("type*count", function (t, e) {
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
                    return {name: i, value: e + "人"}
                }), U.legend("type", {position: "top"}), U.axis("teamId", {
                    label: {
                        offset: 6,
                        textStyle: {textAlign: "end", rotate: 315}
                    }
                }), U.render(), P.data("flipTimer").startTimer(parseInt(e.data.sign_student_count)), t(".header .date").html(e.data.date + " 考勤表"), i && i(e), k(), T()
            }
        }, "json")
    }

    function i() {
        var i = t("#sign-id").val(), n = t("#is-gps").val();
        clearInterval(z), clearInterval(A), D("PUT", "/api/v1/class-attendance/" + i + "/close", {course_id: H}, function (t) {
            S(Q.closeCheckIn), c(t)
        }, function (t) {
            403 === t.status ? (e(i, function (t) {
                var e = t.data, n = {
                    signId: i,
                    order: e.order,
                    signTime: e.date.substring(11, 16),
                    isGps: "1" === e.gps,
                    count: e.sign_student_count,
                    ratio: e.ratio
                };
                l(n)
            }), d(n)) : window.location.reload()
        })
    }

    function n(t) {
        N.html(t).fadeIn("fast"), setTimeout(function () {
            N.fadeOut("slow")
        }, 1e3)
    }

    function s(t) {
        var e = parseFloat(t);
        return e > 9e3 ? "9+" : (e / 1e3).toFixed(1)
    }

    function a() {
        t(".group-switch").show();
        var i, n = t("#sign-id").val(), s = t("#course-id").val(), a = {0: "", 1: "overflow", "-1": "position-fail"};
        z = setInterval(function () {
            D("GET", "/api/v1/class-attendance/" + n, {courseid: s}, function (e) {
                if (!e.course) return clearInterval(z), clearInterval(A), void c(e);
                var n = e.course.students, s = parseInt(e.sign.isGps), d = r(n), l = e.signInLogs, u = e.isJSJ;
                if (l.length > F && G.play(), F = l.length, t("#leave-time").val(e.sign.ttl), q || (q = !0, p()), P.data("flipTimer").startTimer(parseInt(F, 10)), parseInt(F, 10) > 10 && t(".long-line").removeClass("hidden"), L) {
                    var h = e.course.teams.length, g = r(e.course.teams), f = _.reduce(n, function (t, e) {
                        return t[e.teamId] = t[e.teamId] ? t[e.teamId] + 1 : 1, t
                    }, {}), v = _.groupBy(l, function (t) {
                        var e = t.studentId;
                        return d[e].teamId
                    }), m = _.reduce(v, function (t, e, i) {
                        return t.push({teamId: i, isSignIn: "true", count: e.length}), t
                    }, []), I = _.reduce(f, function (t, e, i) {
                        var n = v[i] ? v[i].length : 0;
                        return t.push({teamId: i, isSignIn: "false", count: e - n}), t
                    }, []), k = I.concat(m), y = new DataSet, w = y.createView().source(k).transform({
                        type: "percent",
                        field: "count",
                        dimension: "isSignIn",
                        groupBy: ["teamId"],
                        as: "percent"
                    });
                    if (i) i.changeData(w); else {
                        i = new G2.Chart({
                            container: t(".group-chart-container").get(0),
                            animate: !1,
                            height: 260,
                            plotCfg: {margin: [20, 80, 100, 80]},
                            forceFit: !0
                        }), i.source(w, {
                            percent: {
                                min: 0, formatter: function (t) {
                                    return (100 * t).toFixed(2) + "%"
                                }
                            }
                        }), i.scale("teamId", {
                            formatter: function (t) {
                                return 0 == t ? "未分组" : g[t].name
                            }
                        }).scale("isSignIn", {
                            alias: "签到状态", formatter: function (t) {
                                return "true" === t ? "已签到" : "未签到"
                            }
                        });
                        var b = i.intervalStack();
                        h <= 10 && b.size(30), b.position("teamId*percent").color("isSignIn", function (t) {
                            return "true" === t ? "#48D1AE" : "#666666"
                        }).tooltip("isSignIn*count", function (t, e) {
                            var i = "true" === t ? "已签到" : "未签到";
                            return {name: i, value: e + "人"}
                        }), i.legend(!1), i.axis("teamId", {
                            offset: 6,
                            label: {textStyle: {textAlign: "end", rotate: 315}}
                        }), i.render()
                    }
                }
                for (var C = "", T = "", D = 0; D < (F < 10 ? F : 10); D++) {
                    var x = l[D];
                    if (x) {
                        var S = x.studentId, O = s ? o(x.isOutOfBound, x.distance) : "", j = s ? a[x.isOutOfBound] : "",
                            B = d[S].avatar;
                        u && (B = D < 5 ? "./assets/images/jiaoshijie/a" + D + ".jpg" : "./assets/images/jiaoshijie/a5.png"), C += '<li class="border-gold"><div class="avatar-wrap"><img src="' + B + '"></div><span class="name ' + j + '">' + d[S].name + O + "</span></li>"
                    }
                }
                if (t(".student-list").empty().append(C), F > 10) {
                    for (var D = 10; D < F; D++) {
                        var J = l[D];
                        if (J) {
                            var S = J.studentId, O = s ? o(J.isOutOfBound, J.distance) : "",
                                j = s ? a[J.isOutOfBound] : "";
                            T += '<li class="name ' + j + '"><span>' + d[S].name + "</span>" + O + "</li>"
                        }
                    }
                    t(".rest-list").empty().append(T)
                }
            }, function (t) {
                403 == t.status && (clearInterval(z), clearInterval(A), e(n, function (t) {
                    var e = t.data, i = {
                        signId: n,
                        order: e.order,
                        signTime: e.date.substring(11, 16),
                        isGps: "1" === e.gps,
                        count: e.sign_student_count,
                        ratio: e.ratio
                    };
                    d(e.gps), l(i)
                }))
            })
        }, 2e3)
    }

    function o(t, e) {
        var i = {0: "", 1: '<p class="distance">' + s(e) + "km<p>", "-1": '<p class="distance">定位失败<p>'};
        return i[t] || ""
    }

    function r(t) {
        var e = {};
        return t.forEach(function (t) {
            e[t.id] = t
        }), e
    }

    function c(i) {
        var s = (t("#course-id").val(), t("#sign-id").val()), a = i.sign, o = a.rank, r = a.date.substring(11, 16),
            c = a.isGps, u = a.count, p = a.ratio || 0,
            h = {signId: s, order: o, signTime: r, isGps: c, count: u, ratio: p};
        q = !1, n("成功关闭本轮签到！"), d(c), l(h), k(), T(), e(s), t("[name=gps-type]").on("change", function () {
            t(this).parent("label").toggleClass("teal-text grey-text"), t(this).parents(".open-checkout").toggleClass("is-gps")
        })
    }

    function d(i) {
        i = parseInt(i), t(".check-time").addClass("hidden"), t(".in-checkout").removeClass("in-checkout").addClass("open-checkout").html('<a href="javascript:void(0);" class="btn-open J-open">开启新签到</a><div class="switch"><label class="' + (i ? "teal" : "grey") + '-text"><input type="checkbox" name="gps-type" ' + (i ? "checked" : "") + '><span class="lever"></span>GPS定位</label></div>'), t(".check-time").replaceWith('<span class="check-time hidden"><span class="title">距离签到结束还有</span><span class="left-time"></span></span>'), t(".btn-close").css("display", "none"), t(".history-info").off("click").on("click", ".history-item", function () {
            var i = t(this).attr("data-id");
            e(i)
        })
    }

    function l(e) {
        var i = "",
            n = '<svg fill="#4a4a4a" height="14" viewBox="3 -5 24 26" width="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>';
        t("#sign_id").val(e.signId), i += '<li class="history-item" data-id="' + e.signId + '"><span><i class="sign-index">' + e.order + "</i>" + e.signTime + (parseInt(e.isGps) ? " " + n : "") + '</span><span class="sign-ratio">' + e.count + " (" + e.ratio + "%)</span></li>", t(".sign-count").eq(0).text("已完成" + e.order + "次签到"), t(".present-data ul").prepend(i)
    }

    function u(e) {
        var i = new Date, s = i.getHours() < 10 ? "0" + i.getHours() : i.getHours(),
            o = i.getMinutes() < 10 ? "0" + i.getMinutes() : i.getMinutes(), r = s + ":" + o,
            c = '<svg fill="#4a4a4a" height="14" viewBox="3 -5 24 26" width="14"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>',
            d = t(".present-data .detail-data li").length + 1;
        a(), t(".open-checkout").removeClass("open-checkout").addClass("in-checkout").html('<span><i class="sign-index">' + d + "</i>" + r + ("1" == e ? " " + c : "") + "</span>签到中"), t(".btn-close").css("display", "block"), n("成功开启签到！"), t(".student-list").html(""), t(".rest-list").html(""), t(".student-info").remove(), t(".delete-btn").remove(), t(".long-line").addClass("hidden"), P.data("flipTimer").startTimer(0), t(".no-sign-list").addClass("hidden"), t(".history-info").off("click").on("click", function () {
            alert("本课堂正在签到中，关闭签到后方可查看历史签到。")
        })
    }

    function p() {
        function e(t, e) {
            return function () {
                t = parseInt(t), t >= 0 ? (e.text(t), t -= 1) : (s.html("到时间啦~继续签到无效"), i())
            }
        }

        var n = t(".left-time"), s = t(".check-time"), a = t("#leave-time").val();
        n.text(a), s.removeClass("hidden"), "0" !== t("#is_sign").val() && (A = setInterval(e(a, n), 1e3))
    }

    function h(t) {
        I(t, 3, "sign/set_leave")
    }

    function g(t) {
        I(t, 2, "sign/set_leave")
    }

    function f(t) {
        I(t, 1, "sign/set_leave")
    }

    function v(t) {
        I(t, 0, "sign/set_leave")
    }

    function m(t, e, i) {
        var s = {
            "sign/set_leave": {0: "修改为旷课", 1: "修改为正常", 2: "修改为请假", 3: "修改为迟到"},
            "sign/set_drop": {0: "修改为正常", 1: "修改为旷课", 2: "修改为请假", 3: "修改为迟到"}
        };
        t.attr("data-state", e), n(s[i][e])
    }

    function I(i, n, s) {
        var a = i.attr("data-sid"), o = t("#sign-id").val(), r = t("#course-id").val(), c = t(".student-list"),
            d = t(".rest-list");
        c.off("click"), d.off("click"), t.post(s, {
            student_id: a,
            sign_id: o,
            course_id: r,
            state: n
        }).done(function () {
            m(i, n, s), T(), e(o, function (e) {
                var i = e.data, n = i.sign_student_count, s = i.ratio;
                t("#sign-ratio-" + o).text(n + " (" + s + "%)")
            })
        })
    }

    function k() {
        var e = {0: f, 1: h, 2: v, 3: g}, i = t(".no-sign-list");
        i.off("click").on("click", ".state-btn", function () {
            var i = t(this).parent("li"), n = i.attr("data-state");
            e[n](i)
        })
    }

    function y(t) {
        I(t, 1, "sign/set_drop")
    }

    function w(t) {
        I(t, 2, "sign/set_drop")
    }

    function b(t) {
        I(t, 3, "sign/set_drop")
    }

    function C(t) {
        I(t, 0, "sign/set_drop")
    }

    function T() {
        function e() {
            var e = t(this).parents("li"), n = e.attr("data-state");
            i[n](e)
        }

        var i = {0: y, 1: w, 2: b, 3: C}, n = t(".student-list"), s = t(".rest-list");
        n.off("click").on("click", ".sign-state-btn", e), s.off("click").on("click", ".sign-state-btn", e)
    }

    function D(e, i, n, s, a) {
        var o = t("#authorization").val();
        t.ajax({
            type: e, url: i, data: n, success: s, error: a, dataType: "json", beforeSend: function (t) {
                t.setRequestHeader("Authorization", o)
            }
        })
    }

    function x() {
        t.getJSON("config/faye.conf.json", function (e) {
            Q = e, V = new Faye.Client(Q.client);
            var i = t("#course-id").val();
            V.subscribe(Q.openCheckIn + i, O), V.subscribe(Q.closeCheckIn + i, j)
        })
    }

    function S(e) {
        var i = t("#course-id").val(), n = t("#sign-id").val();
        V.publish(e + i, {courseId: i, signId: n, origin: "pc"})
    }

    function O(t) {
        "wechat" === t.origin && window.location.reload()
    }

    function j(i) {
        if ("wechat" == i.origin) {
            clearInterval(z), clearInterval(A);
            var n = t("#sign-id").val(), s = t("#is-gps").val();
            e(n, function (t) {
                var e = t.data, i = {
                    signId: n,
                    order: e.order,
                    signTime: e.date.substring(11, 16),
                    isGps: "1" === e.gps,
                    count: e.sign_student_count,
                    ratio: e.ratio
                };
                l(i)
            }), d(s)
        }
    }

    var G = new Howl({src: ["https://app.teachermate.com.cn/sounds/complete.webm", "https://app.teachermate.com.cn/sounds/complete.mp3"]}),
        F = 0;
    t(".group-switch").hide(), t(".checkin-grey").removeClass("checkin-grey").addClass("checkin");
    var z, A, B = (t(".J-open"), t(".btn-close")), J = (t(".history-list"), t(".delete-history-dialog")),
        E = new Dialog(".delete-history-dialog"), H = t("#course-id").val(), M = null, L = !1, N = t("#finish-tip"),
        P = t(".count").flipTimer({seconds: !0});
    t(".right-wrap").on("click", ".delete-btn", function (e) {
        e.stopPropagation(), M = t("#sign-id").val(), E.showDialog()
    }), t(".history-info").off("click").on("click", ".history-item", function () {
        var i = t(this).attr("data-id");
        t(".group-switch").show(), e(i)
    });
    var U;
    J.on("confirm", function () {
        t.ajax({method: "delete", url: "user/delete_sign?sign_id=" + M}).done(function (t) {
            var t = JSON.parse(t);
            "delete success" == t.msg && window.location.reload()
        }, "json")
    }), t("[name=gps-type]").on("change", function () {
        t(this).parent("label").toggleClass("teal-text grey-text"), t(this).parents(".open-checkout").toggleClass("is-gps")
    }), t("[name=group]").on("change", function () {
        L = t(this).get(0).checked, L ? (t(".right-wrap").addClass("grouped"), U && U.forceFit()) : t(".right-wrap").removeClass("grouped")
    }), t(".history-container").on("click", ".btn-open", function () {
        t(this).toggleClass("open-btn"), t(this).attr("disabled", !0), t(this).toggleClass("close-btn");
        var e = t("[name=gps-type]"), i = t("#course-id").val(), s = e.is(":checked") ? 1 : 0, a = t(this);
        e.attr("disabled", !0), t("#is-gps").val(s), D("POST", "/api/v1/class-attendance", {
            course_id: i,
            is_gps: s
        }, function (e) {
            t("#sign-id").val(e.sign.id), t("#leave-time").val(e.sign.ttl), t("#is_sign").val("1"), t(".count").show(), t(".J-open").html("关闭签到"), P.data("flipTimer").startTimer(0), S(Q.openCheckIn), u(s), t(".group-chart-container").html("")
        }, function (t) {
            if (403 === t.status) {
                var i = JSON.parse(t.responseText);
                n(i.msg), 101 == i.errorCode && window.location.reload()
            } else n("开启签到失败，请稍候重试");
            e.attr("disabled", !1), a.attr("disabled", !1)
        })
    }), B.off().on("click", i), function () {
        "1" === t("#is_sign").val() && (a(), t(".history-info").off("click").on("click", function () {
            alert("本课堂正在签到中，关闭签到后方可查看历史签到。")
        }))
    }();
    var q = !1, Q = {}, V = {};
    x()
}(jQuery);