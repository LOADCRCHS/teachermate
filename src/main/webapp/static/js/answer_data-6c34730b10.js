function fayeApp() {
    "use strict";
    var e = $("#course-id").val();
    $.getJSON("config/faye.conf.json").done(function (t) {
        clientObj = t, client = new Faye.Client(clientObj.client), client.subscribe(clientObj.openQuestion + e, reloadPage), client.subscribe(clientObj.closeQuestion + e, reloadPage), client.subscribe(clientObj.showAnswer + e, reloadPage), client.subscribe(clientObj.hideAnswer + e, reloadPage), client.subscribe(clientObj.pptStatusChange + e, onPptStatusChange), client.subscribe("/courses/" + e + "/coursewares/*").withChannel(function (e, t) {
            var i, n = e.match(/\/\w+$/);
            n.length > 0 && (i = n[0].substr(1)), i && "startPlay" === t.type && "wechat" === t.origin && (window.clearTimeout(timer), timer = window.setTimeout(function () {
                window.myFunc.getCourseware(i)
            }, 100))
        })
    }).fail(function (e, t) {
        console.log(t)
    }), $(".reveal").on("statusChange", function (t, i) {
        client.publish(clientObj.pptStatusChange + e, i)
    })
}

function publishMsg(e) {
    "use strict";
    var t = $("#course-id").val(), i = $("#question-id").val();
    client.publish(e + t, {questionId: i, courseId: t, origin: "pc"})
}

function reloadPage(e) {
    "use strict";
    e.questionId == $("#question-id").val() && "wechat" === e.origin && window.location.reload()
}

function onPptStatusChange(e) {
    "use strict";
    e.id == localStorage.getItem("coursewareId") && "wechat" === e.origin && $(".reveal").trigger("statusChangeFromWx", e)
}

function viewImages() {
    "use strict";
    var e = $(".question-content"), t = $(".error-list-wrap"), i = function (e, t) {
        var i = t.src.split("?")[0];
        $(t).attr("data-original", i)
    }, n = {title: !1, url: "data-original"};
    e.find("img").each(i), t.find("img").each(i), e.get(0) && new Viewer(e.get(0), n), t.get(0) && new Viewer(t.get(0), n)
}

$(function () {
    "use strict";

    function e() {
        return {authorization: $("#authorization").val()}
    }

    function t(e, t, i) {
        e ? G = e : e = G, M.hasClass("grouped") ? M.find(".switch-group").attr("checked", "checked") : M.find(".switch-group").removeAttr("checked");
        //todo 修改跳转路径
        var n = !(window.location.href.indexOf("#paper") < 0), a = _.size(e), o = _.reduce(e, function (e, t, i) {
            n && (t.stateCount = [t.stateCount[2], t.stateCount[1]]);
            var a = _.map(t.stateCount, function (e, t) {
                var n;
                switch (t) {
                    case 0:
                        n = "1";
                        break;
                    case 1:
                        n = "2";
                        break;
                    case 2:
                        n = "0"
                }
                return {count: e, type: n, teamId: i}
            });
            return e.concat(a)
        }, []);
        o.reverse(), o = _.sortBy(o, "type");
        var s = new DataSet, r = s.createView().source(o).transform({
            type: "percent",
            field: "count",
            dimension: "type",
            groupBy: ["teamId"],
            as: "percent"
        });
        if (t) return t.changeData(r), t;
        var t = new G2.Chart({
            container: $(".group-chart-container").get(0),
            animate: !1,
            height: i ? 500 : 260,
            plotCfg: {margin: [20, 80, 100, 80]},
            forceFit: !0
        });
        t.source(r, {
            percent: {
                min: 0, formatter: function (e) {
                    return (100 * e).toFixed(2) + "%"
                }
            }
        }), t.scale("teamId", {
            formatter: function (t) {
                return 0 == t ? "未分组" : e[t].name
            }
        }).scale("type", {
            alias: "答题状态", formatter: function (e) {
                var t;
                if (n) switch (e) {
                    case"1":
                        t = "未交卷";
                        break;
                    case"2":
                        t = "已交卷"
                } else switch (e) {
                    case"0":
                        t = "未答";
                        break;
                    case"1":
                        t = "错误";
                        break;
                    case"2":
                        t = "正确"
                }
                return t
            }
        });
        var c = t.intervalStack();
        return a <= 10 && c.size(30), c.position("teamId*percent").color("type", function (e) {
            var t;
            if (n) switch (e) {
                case"1":
                    t = "#666666";
                    break;
                case"2":
                    t = "#48D1AE"
            } else switch (e) {
                case"0":
                    t = "#666666";
                    break;
                case"1":
                    t = "#F5A623";
                    break;
                case"2":
                    t = "#48D1AE"
            }
            return t
        }).tooltip("type*count", function (e, t) {
            var i;
            if (n) switch (e) {
                case"1":
                    i = "未交卷";
                    break;
                case"2":
                    i = "已交卷"
            } else switch (e) {
                case"0":
                    i = "未答";
                    break;
                case"1":
                    i = "错误";
                    break;
                case"2":
                    i = "正确"
            }
            return {name: i, value: t + "人"}
        }), t.legend("type", {position: "top"}), t.axis("teamId", {
            label: {
                offset: 6,
                textStyle: {textAlign: "end", rotate: 315}
            }
        }), i && t.coord().transpose(), t.render(), t
    }

    function i() {
        $(".font-size-turner").each(function () {
            var e = $(this), t = e.attr("ctrl"), i = e.find(".normal"), n = e.find(".larger");
            i.addClass("active").click(function () {
                $(this).hasClass("active") || ($(this).addClass("active"), n.removeClass("active"), $("." + t).css("font-size", "1em"))
            }), n.click(function () {
                $(this).hasClass("active") || ($(this).addClass("active"), i.removeClass("active"), $("." + t).css("font-size", "2em"))
            })
        })
    }

    function n(e) {
        M.off(), clearInterval(L), clearInterval(B), o(), s(), r($("#max").val()), c(), l(), d(), w(), S(), k(), O(), T(), i(), "function" != typeof client.subscribe && fayeApp(), viewImages(), H = e && t(e), "1" === $("#question-open").val() && ($("#question-type").val() && "1" === $("#question-duration").val() && (C(null, "onLimit"), $(".time-leave").trigger("click")), y()), "1" === $("#question-exp-open").val() && (C(null, "onTiming"), y());
        var n = a(0);
        $(".datepicker").val(n.y + "/" + (n.m + 1) + "/" + n.d).pickadate({
            selectMonths: !0,
            selectYears: 3,
            min: new Date(n.y, n.m, n.d)
        }), $(".time-select").material_select()
    }

    function a(e) {
        var t = new Date;
        t.setDate(t.getDate() + e);
        var i = t.getFullYear(), n = t.getMonth(), a = t.getDate();
        return {y: i, m: n, d: a}
    }

    function o() {
        for (var e = $(".answer-choice"), t = e.length, i = 0; i < t; i++) e.eq(i).text().length > 32 ? (e.removeClass("choice-medium"), e.css("float", "none")) : e.eq(i).text().length > 25 && e.eq(i).text().length < 32 && e.addClass("choice-medium")
    }

    function s() {
        for (var e = $("#column li"), t = e.length, i = $(".fill"), n = 1; n < t; n++) $(e[n]).css("left", 60 + 90 * n + "px");
        for (var a = 0; a < i.length; a++) {
            var o = parseInt(.01 * parseFloat($(i[a]).siblings(".choice-ratio").text()) * 175);
            $(i[a]).css("height", o)
        }
    }

    function r(e) {
        var t, i = $("#lines li"), n = i.length, a = parseInt($("#figure .axis").eq(0).text()),
            o = $("#scores li").outerWidth(!0) * ($("#scores li").length - 2),
            s = $("#scores li").outerWidth(!0) * $("#scores li").length,
            r = parseInt($("#scores li").eq($("#scores li").length - 2).text()), c = $("#figure").height() - 20;
        if (parseInt(e) > 6) {
            t = parseInt(e / 3) + 1;
            var l = $("#figure .axis").length;
            $("#figure .axis").each(function (e) {
                return $(this).text((l - e - 1) * t + "人")
            })
        }
        $("#figure").find(".horizon-line").each(function () {
            return $(this).css("width", s)
        });
        for (var d = 0; d < n; d++) {
            var u = $(i[d]).find(".score").attr("data-score"), p = $(i[d]).find(".score").attr("data-count"),
                h = parseInt(p / a * c), f = parseInt(u / r * o), v = parseInt(p / a * c);
            $(i[d]).find(".score-point").css({
                left: 81 + f,
                top: -v - 16
            }), $(i[d]).find(".score-line").css({left: 85 + f, top: -v - 11, height: h})
        }
    }

    function c() {
        M.on("click", ".J-show", function () {
            $(".chart-wrap").toggle(), $(this).toggleClass("fold"), $(this).toggleClass("unfold"), "展开" == $(this).html() ? $(this).html("收起") : $(this).html("展开")
        })
    }

    function l() {
        $("[name=choice-type]").on("click", function () {
            var e = $(this).val();
            $("[data-value=" + (1 - e) + "]").addClass("hidden"), $("[data-value=" + e + "]").removeClass("hidden")
        })
    }

    function d() {
        var t = $("#course-id").val(), i = $("#question-type").val(), n = {0: "未阅读人员名单"}, a = $(".time-type"),
            o = $("#leave-time"), s = $("#question-id").val(), r = {question_id: s, course_id: t, inform: !1},
            c = {question_id: s, course_id: t, question_open: 2, inform: !1};
        M.on("click", ".re-answer", function () {
            var e = $("#course-id").val(), t = $("#question-id").val(), i = $(this).parent("li"),
                n = i.attr("data-sid");
            $.ajax({
                type: "POST",
                url: "question/reAnswer",
                data: {questionId: t, courseId: e, studentId: n},
                success: function (e) {
                    "success" == e.msg ? i.remove() : alert("接口调用失败, 请稍后重试")
                },
                error: function () {
                    alert("接口调用失败, 请稍后重试")
                },
                dataType: "json"
            })
        }), M.on("click", ".btn-edit-question", function () {
            var t = $("#course-id").val(), i = $("#question-id").val();
            $.post("question/question_edit", {question_id: i, course_id: t}).done(function (t) {
                var i = t;
                "1" == i.answered && alert("本题已有答题记录, 修改题型或答案将重算学生得分。"), EditQuestion.mount(document.getElementById("edit-area"), i, ee, ie, te, ne, "/api/v1/upload/direct", e)
            })
        }), M.on("click", ".btn-copy-question", function () {
            var e = $("#course-id").val(), t = $("#question-id").val();
            $.post("question/copy_que", {course_id: e, question_id: t}).done(function (e) {
                window.location.reload()
            }).fail()
        }), M.on("click", ".btn-answer-review", function () {
            var e = $(this).html();
            "展开答案和解析" == e ? ($(".answer-content").show(), $(this).html("收起答案和解析")) : ($(".answer-content").hide(), $(this).html("展开答案和解析"))
        }), M.on("click", ".btn-del-question", function (e) {
            e.stopPropagation(), e.preventDefault();
            var t = $("#question-id").val(), i = $("#course-id").val(), n = $("#question-id").val(),
                a = $("#question-type").val();
            void 0 == a && (t = $("#courseware-id").val());
            var o = $("#belong-paper").val();
            deleteDialog.showDialog(i, t, n, a, o)
        }), M.on("click", ".btn-show-answer", function () {
            $(".answer-content").slideToggle(100)
        }), M.on("click", ".open", function () {
            $(this).removeClass("open").addClass("close").text("关闭题目"), a.fadeOut(100), r.question_open = 1, p(r, v)
        }), M.on("click", ".btn-open", function () {
            var e = $("#timing-open").val(), t = e ? 2 : 1;
            u(t, $(".btns-close")), r.exp_time = e ? e : void 0, r.exp_time ? (r.exp_open = 1, h(r, f)) : (r.question_open = 1, p(r, v))
        }), M.on("click", ".btn-open-notify", function () {
            var e = $("#timing-open").val(), t = e ? 2 : 1;
            u(t, $(".btns-close")), r.exp_time = e ? e : void 0, r.exp_time ? (r.exp_open = 1, h(r, f)) : (r.question_open = 1, p(r, v, !0))
        }), $(".triangle").dropdown({}), M.on("click", ".btn-timing-open", function () {
            u(1, $(".btns-timing")), r.question_open = 1, p(r, v)
        }), M.on("click", ".btn-timing-open-notify", function () {
            u(1, $(".btns-timing")), r.question_open = 1, p(r, v, !0)
        }), M.on("click", ".btn-close", function () {
            $(".btn-fold").trigger("click"), u(0, $(".btns-opening")), p(c, m)
        }), M.on("click", ".close-timing", function () {
            u(0, $(".btns-timing")), r.exp_open = 0, h(r)
        }), M.on("click", ".icon-close-timing", N), M.on("click", ".stop-time", function (e) {
            $("#filled-in-box").prop("checked", !1), A(e)
        }), M.on("click", ".time-opening", function () {
            $(this).find(".date-card").show()
        }), M.on("click", ".time-limit-info", function () {
            $(".time-card").show()
        }), M.on("change", ".switch-answer", function () {
            var e = $(".switch-answer-wrapper"), i = $(this).is(":checked"), n = i ? 1 : 0;
            if ($(this).attr("id")) {
                var a = $("#courseware-id").val(), o = $("#authorization").val();
                $.ajax({
                    method: "put",
                    url: "/api/v1/coursewares/" + a + "/allowDownload",
                    data: {allowDownload: i},
                    beforeSend: function (e) {
                        e.setRequestHeader("Authorization", o)
                    }
                }).done(function () {
                }, "json")
            } else $(this).attr("name") ? b(s, i) : q(s, t, n);
            n ? e.removeClass("grey-text").addClass("teal-text") : e.removeClass("teal-text").addClass("grey-text")
        }), M.on("change", ".switch-group", function () {
            var e = $(this).get(0).checked;
            e ? (M.addClass("grouped"), H && H.forceFit()) : M.removeClass("grouped")
        }), M.on("click", ".close", function () {
            $(this).removeClass("close").addClass("open").text("开启题目"), a.fadeIn(100), p(c, m)
        }), M.on("click", ".error-btn-hidden", function () {
            var e = i ? s : $(".paper-nav .actived").attr("data-id"), n = new X(t, e);
            $(this).html("查看" + ("2" == $("#question-type").val() ? "错误" : "学生") + "答案"), $(this).removeClass("error-btn-hidden").addClass("error-btn-show"), n.hidden()
        }), M.on("change", "#student-name", function () {
            $(".error-list .student-name").toggleClass("hidden")
        }), M.on("click", ".error-btn-show", function () {
            var e = i ? s : $(".paper-nav .actived").attr("data-id"), n = new X(t, e);
            $(this).html("收起" + ("2" == $("#question-type").val() ? "错误" : "学生") + "答案"), $(this).removeClass("error-btn-show").addClass("error-btn-hidden"), n.show()
        }), M.on("click", ".error-student-hidden", function () {
            var e = new K(t, s, i), a = n[i] ? n[i] : "未答题人员名单";
            $(this).html("查看" + a), $(this).removeClass("error-student-hidden").addClass("error-student-show"), e.hidden()
        }), M.on("click", ".error-student-show", function () {
            var e = new K(t, s, i), a = n[i] ? n[i] : "未答题人员名单";
            $(this).html("收起" + a), $(this).removeClass("error-student-show").addClass("error-student-hidden"), e.show()
        }), M.on("click", ".student-score-hidden", function () {
            $(this).html("查看成绩"), $(".student-score-list").slideUp(100), $(this).removeClass("student-score-hidden").addClass("student-score-show")
        }), M.on("click", ".student-score-show", function () {
            $(this).html("收起成绩"), $(".student-score-list").slideDown(100, g), $(this).removeClass("student-score-show").addClass("student-score-hidden")
        }), M.on("click", ".error-item", function () {
            var e = $(this).index();
            $.inArray(e, V) === -1 ? V.push(e) : V.splice($.inArray(e, V), 1)
        }), M.on("click", ".btn-open-course", function () {
            var e = $("#courseware-id").val();
            $(".reveal").trigger("play", e)
        }), M.on("click", ".courseware-status", function () {
            var e = $(".courseware-status"), t = $("#courseware-id").val(), i = $("#authorization").val();
            "开启" === e.text() ? $.ajax({
                method: "put",
                url: "/api/v1/coursewares/" + t + "/switchStatus",
                data: {status: !0},
                beforeSend: function (e) {
                    e.setRequestHeader("Authorization", i)
                }
            }).done(function () {
                e.removeClass("teal"), e.text("关闭"), questionNav.updateItem({question_id: t, question_open: 1})
            }, "json") : $.ajax({
                method: "put",
                url: "/api/v1/coursewares/" + t + "/switchStatus",
                data: {status: !1},
                beforeSend: function (e) {
                    e.setRequestHeader("Authorization", i)
                }
            }).done(function () {
                e.addClass("teal"), e.text("开启"), questionNav.updateItem({question_id: t, question_open: 2})
            }, "json")
        }), o.on("onLimit", function () {
            $(".btn-close").trigger("click")
        }), o.on("onTiming", function () {
            $(".btn-timing-open").trigger("click")
        })
    }

    function u(e, t) {
        t.hide();
        var i = {
            0: function () {
                $(".open-state").fadeOut(200), $(".btns-close").show()
            }, 1: function () {
                $(".open-state").fadeIn(200), $(".btns-opening").show()
            }, 2: function () {
                $(".open-state").fadeOut(200), $(".btns-timing").show()
            }
        };
        i[e]()
    }

    function p(e, t, i) {
        Y && 2 != e.question_open && (e.inform = i), $.post("question/open_question", e).done(t)
    }

    function h(e, t) {
        Y && 1 == e.exp_open && (e.inform = !0), $.post("question/set_time_open", e).done(t)
    }

    function f(e) {
        var e = JSON.parse(e);
        $(".start-time").text($("#timing-open").val()), C(e.data, "onTiming")
    }

    function v(e) {
        var e = JSON.parse(e), t = $("#question-type").val();
        e.data.answerInfo.question_open = "1", questionNav.updateItem(e.data.answerInfo), $("#question-open").val(1), $(".error-btn-hidden").trigger("click"), $(".error-student-hidden").trigger("click"), $(".error-student-show").addClass("btn-disabled").attr("disabled", !0), $(".stop-time").css("display", "inline-block"), $(".time-leave").css("display", "inline-block"), t && "1" === e.data.is_duration ? (C(e.data, "onLimit"), $(".btn-unfold").trigger("click")) : ($(".stop-time").hide(), $(".time-leave").hide()), y(), publishMsg(clientObj.openQuestion)
    }

    function m(e) {
        var t = JSON.parse(e);
        "question open success" === t.msg && (t.data.answerInfo.question_open = "2", questionNav.updateItem(t.data.answerInfo), $(".count-time").addClass("hidden"), $(".error-info-wrap").empty().append(t.data.tpl), $(".error-list-wrap").empty().append(t.data.answers_tpl), $("#question-open").val(2), $(".error-student-show").removeClass("btn-disabled").attr("disabled", !1), clearInterval(B), clearInterval(L), publishMsg(clientObj.closeQuestion))
    }

    function g() {
        $(".right-area-scroll").scrollTop(1500)
    }

    function w() {
        var e = $("#question-id").val(), t = $("#course-id").val();
        M.on("click", ".open_answer", function () {
            $(this).removeClass("open_answer").addClass("close_answer").text("隐藏答案"), q(e, t, 1)
        }), M.on("click", ".close_answer", function () {
            $(this).removeClass("close_answer").addClass("open_answer").text("公布答案"), q(e, t, 0)
        })
    }

    function q(e, t, i) {
        $.post("question/open_answer", {question_id: e, course_id: t, answer_open: i}).then(function () {
            var e = {0: clientObj.hideAnswer, 1: clientObj.showAnswer};
            publishMsg(e[i])
        })
    }

    function b(e, t) {
        $.post("question/open_review", {questionId: e, reviewOpen: t})
    }

    function y() {
        var e = $("#question-type").val(), i = e ? $("#question-id").val() : $(".paper-nav .actived").attr("data-id"),
            n = e ? void 0 : $("#question-id").val(), a = $("#course-id").val(), o = 10;
        L = setInterval(function () {
            $.get("question/true_list", {question_id: i, paper_id: n, course_id: a}, function (e) {
                H = t(e.answerDistribution, H);
                for (var i = ($(".top-list li").length, $(".rest-list .container").length, $(".choice-ratio")), n = ($(".choice-count"), e.answer_ratio), a = $(".fill"), s = "", r = "", c = 0; c < n.length; c++) {
                    i.eq(c).text(n[c].ratio + "%"), i.eq(c).text(n[c].count + "人");
                    var l = .01 * n[c].ratio * 175;
                    a.eq(c).css("height", l)
                }
                $(".right-list-title").children(".right-count").text(e.right_count), $(".right-list-title").children(".answer-count").text(e.answer_count), $(".right-list-title").children(".all-count").text(e.all_count + ""), $(".right-list-title").children(".answer-ratio").text(e.ratio + "%"), e.right_count > o && $(".long-line").removeClass("hidden");
                for (var d = e.right_rank, u = "", c = 0; c < d.length; c++) u += '<li><div class="avatar-wrap"><img src="' + (d[c].avatar ? d[c].avatar : "./assets/images/default-avatar.png") + '" onerror="this.src=\'./assets/images/default-avatar.png\'"></div><span class="name">' + d[c].name + "</span></li>";
                if ($(".top-list").empty().append(u), e.right_list.length > 0) {
                    for (var p = e.right_list, h = "", c = 0; c < p.length; c++) h += '<div class="container"><div>' + p[c].name + "</div></div>";
                    $(".rest-list").empty().append(h)
                }
                if (e.false_list.length > 0) {
                    for (var f = e.false_list, c = 0; c < f.length; c++) {
                        var v = ~$.inArray(c, V) ? "noellipsis" : "",
                            m = $("#student-name").is(":checked") ? "" : " hidden", g = f[c].answerImg || [],
                            w = '<div class="answer-image-wrapper">';
                        g.forEach(function (e) {
                            w += '<img src="' + e + '?x-oss-process=image/resize,m_fixed,h_100,w_100" class="student-anwer-img" data-original="' + e + '">'
                        }), w += "</div>", s += '<li class="error-item ' + v + '"><span class="student-name' + m + '">' + f[c].name + "：</span>" + f[c].answer + w + "</li>"
                    }
                    $(".error-list ul").empty().append(s)
                }
                if (e.answer_list) {
                    var f = e.answer_list;
                    $(".student-score-num").text(f.length);
                    for (var c = 0; c < f.length; c++) {
                        var q = f[c], b = "";
                        r += '<li class="student-item" data-sid="' + q.student_id + '"><span>' + q.name + "(" + q.grade + ")</span>" + b + "</li>"
                    }
                    $(".student-score").empty().append(r)
                }
            }, "json")
        }, 4e3)
    }

    function k() {
        clearInterval(R);
        var e = $("#question-type").val();
        "6" === e && (R = setInterval(x, 2e3))
    }

    function x() {
        var e = $("#question-id").val(), t = $("#course-id").val();
        $.ajax({
            method: "get",
            dataType: "json",
            url: "question/sbj_update?question_id=" + e + "&course_id=" + t
        }).done(function (i) {
            if ($(".right-list-title").children(".right-count").text(i.score_list.length), i.score_list.length > 0) {
                for (var n = i.score_list, a = "", o = 0; o < n.length; o++) a += '<span><a href="projection?question_id=' + e + "&course_id=" + t + "&student_id=" + n[o].student_id + '" target="_blank">' + n[o].name + "&nbsp;(" + n[o].avg + ")</a></span>";
                $(".score-list").empty().append(a)
            }
            for (var s = i.score_distribute.result, c = i.score_distribute.max_people, l = "", o = 0; o < s.length; o++) l += '<li class="line-item"><span class="score-point"><span class="score" data-count="' + s[o].count + '" data-score="' + s[o].score + '">' + s[o].score + '分</span></span><span class="score-line"></span></li>';
            $("#lines").empty().append(l), r(c)
        })
    }

    function C(e, t) {
        function i(e, i) {
            return function () {
                e = parseInt(e), e > 0 ? (e -= 1, ConterTick(e), n.val(e), i.text(I(e)), 1 == o && (9 === e && Q.play(), e % 10 === 0 && e > 10 && E.play())) : (clearInterval(L), clearInterval(B), n.trigger(t))
            }
        }

        var n = $("#leave-time"), a = n.val(), o = $("#question-open").val();
        clearInterval(B), e && (a = e.leave_time, $(".detail-time").text(I(a)), ConterTick(a)), "1" !== o && "onTiming" !== t || (B = setInterval(i(a, $(".detail-time")), 1e3))
    }

    function I(e) {
        var t = Math.floor(e / 86400), i = Math.floor((e - 86400 * t) / 3600),
            n = Math.floor((e - 86400 * t - 3600 * i) / 60), a = e % 60;
        return t = t > 0 ? (t < 10 ? "0" + t : t) + "天" : "", i = i > 0 ? (i < 10 ? "0" + i : i) + "小时" : "", n = n > 0 ? (n < 10 ? "0" + n : n) + "分" : "", a = a > 0 ? (a < 10 ? "0" + a : a) + "秒" : "", t + i + n + a
    }

    function S() {
        var e = $(".paper-nav"), t = $(".paper-question-wrap"), i = $("#course-id").val(), n = $(".paper-data .edit");
        e.on("click", "li", function () {
            if (!$(this).hasClass("actived")) {
                var n = $(this).attr("data-id");
                e.find(".actived").removeClass("actived"), $(this).addClass("actived"), $.get("question/get_sub_que/" + i, {question_id: n}, function (e) {
                    t.empty().append(e), o(), s(), l(), "1" === $("#question-open").val() && (clearInterval(L), y())
                })
            }
        }), e.on("click", ".icon-delete", function (e) {
            e.stopPropagation();
            var t = $(this).parent("li"), n = t.data("id"), a = 0 === t.siblings().length ? 1 : 0;
            $.post("paper/del_item", {question_id: n, course_id: i, is_last: a}).done(function (e) {
                $(".objective-question").empty().append(e), t.remove(), a && $(".objective-question").children(":eq(0)").trigger("click")
            })
        }), e.on("click", ".icon-up", function (e) {
            e.stopPropagation();
            var t = $(this).parent("li"), n = t.find(".question-key"), a = t.prev(), o = a.find(".question-key"),
                s = parseInt(n.text()), r = parseInt(o.text()), c = t.data("id"), l = $("#question-id").val();
            s > 1 && $.post("paper/change_order", {question_id: l, course_id: i, sub_question_id: c}).done(function () {
                a.hide(), o.text(s), a.insertAfter(t), n.text(r), a.show()
            })
        }), n.on("click", function () {
            e.find(".icon-delete").fadeToggle(100)
        })
    }

    function j(e) {
        var t = $("#finish-tip");
        t.html(e).fadeIn(100), setTimeout(function () {
            t.fadeOut("slow")
        }, 800)
    }

    function O() {
        M.on("click", ".time-leave", function () {
            var e = 400;
            $(".buttons .tip").html("点击收起倒计时工具"), $(this).toggleClass("time-leave-up time-leave");
            var i = $(".question-wrap").height() - 20 + "px";
            J.animate({marginLeft: "-500px"}), M.animate({
                marginLeft: "30px",
                marginRight: "410px"
            }, e), $(".answer-info").addClass("simple-info"), $(".clock-container").removeClass("hidden").addClass("show").animate({
                opacity: 1,
                top: i,
                display: "block"
            }, e);
            parseInt($("#leave-time").val());
            H.destroy(), setTimeout(function () {
                H = t(null, null, !0)
            }, e)
        }), M.on("click", ".btn-fold, .time-leave-up", function () {
            $(".buttons .tip").html("点击展开倒计时工具"), $(".time-leave-up").toggleClass("time-leave-up time-leave"), D()
        })
    }

    function D() {
        var e = 400, i = ($(".question-wrap").height() - 20 + "px", $(".left-wrapper").width() + 20 + "px");
        J.animate({marginLeft: 0}, e), M.animate({
            marginLeft: i,
            marginRight: "40px"
        }, e), $(".answer-info").removeClass("simple-info"), $(".clock-container").removeClass("show").addClass("hidden").animate({
            opacity: 0,
            top: "-100px",
            display: "none"
        }, e), H.destroy(), setTimeout(function () {
            H = t(null, null, !1)
        }, e)
    }

    function T() {
        function e(e, n) {
            var a = {hour: t, minute: i};
            return !!(e && !isNaN(e) && e.length <= 2 && a[n](parseInt(e))) || (alert("格式不正确。"), !1)
        }

        function t(e) {
            return e < 24
        }

        function i(e) {
            return e < 60
        }

        function n(e) {
            e.stopPropagation(), $(".time-limit").removeClass("grey-text").addClass("teal-text");
            var t = $("#time-limit"), i = $(".time-limit-info"), n = $(".input-time").val();
            if (n && !isNaN(n)) return t.val(n), i.html('限时<span class="underline">' + n + "</span>分钟"), P(1, n), $(".time-card").hide(), n
        }

        M.on("click", ".btn-timing-cancle", function (e) {
            e.stopPropagation(), $(".date-card").hide()
        }), M.on("click", ".btn-timing-confirm", function (t) {
            t.stopPropagation();
            var i = $("#timing-open"), n = $(".timing-open-info"), a = $(".datepicker").val(),
                o = $(".validate[name=hour]").val(), s = $(".validate[name=minute]").val();
            if (e(o, "hour") && e(s, "minute")) {
                o = o.length < 2 ? "0" + o : o, s = s.length < 2 ? "0" + s : s;
                var r = o + ":" + s;
                i.val(a + " " + r), n.html(a + " " + r + ' 开启题目<i class="icon icon-close-timing"></i>'), $(".time-opening").removeClass("grey-text").addClass("teal-text"), $(".time-opening").find("svg").attr("fill", "#009688"), $(".openQuestionBtn").hide(), $(".startTimerBtn").css("display", "inline-block"), $(".date-card").hide()
            } else $(".validate[name=hour]").val("20"), $(".validate[name=minute]").val("00")
        }), M.on("click", ".btn-limit-cancle", function (e) {
            e.stopPropagation(), $(".time-card").hide()
        }), M.on("click", ".btn-time-limit", function (e) {
            $(".time-card").hide();
            var t = !$("#filled-in-box").is(":checked");
            t ? n(e) : A(e)
        }), M.on("click", ".btn-limit-default", function (e) {
            var t = n(e);
            t && (z(t), $(".time-card").hide())
        }), M.on("click", ".btn-limit-confirm", function (e) {
            $("#filled-in-box").prop("checked", !0), n(e)
        })
    }

    function A(e) {
        e.stopPropagation(), $(".time-limit").removeClass("teal-text").addClass("grey-text");
        var t = $("#time-limit"), i = $(".time-limit-info"), n = $(".stop-time"), a = $(".time-leave");
        a.hide(), n.hide(), t.val(""), i.text("答题限时"), P(0), $(".btn-fold").trigger("click"), $(".time-leave").hide()
    }

    function N(e) {
        e.stopPropagation();
        var t = $("#timing-open"), i = $(".timing-open-info");
        t.val(""), $(".time-opening").removeClass("teal-text").addClass("grey-text"), $(".time-opening").find("svg").attr("fill", "#c8c8c8"), i.text("指定开启时间"), $(".startTimerBtn").hide(), $(".openQuestionBtn").show()
    }

    function P(e, t) {
        var i = $("#course-id").val(), n = $("#question-id").val();
        $.post("question/set_limit", {question_id: n, course_id: i, on_time: e, limit: t})
    }

    function z(e) {
        var t = $("#course-id").val(), i = $("#question-id").val();
        $.post("question/default_limit", {question_id: i, course_id: t, limit: e})
    }

    var E = new Howl({src: ["https://app.teachermate.com.cn/sounds/warning.webm", "https://app.teachermate.com.cn/sounds/warning.mp3"]}),
        Q = new Howl({src: ["https://app.teachermate.com.cn/sounds/sound_10s.webm", "https://app.teachermate.com.cn/sounds/sound_10s.mp3"]}),
        J = $(".left-wrapper"), M = $(".right-area"), F = $(".map-area"), L = ($(".right-area-scroll").width(), null),
        B = null, R = null, H = null, W = $("#course-id").val(), U = $("#question-id").val(), V = [],
        Y = 1 == $("#tpl-msg-push").val();
    F.on("click", function (e) {
        e.preventDefault(), $("#question-nav .add-button").trigger("click")
    }), $.ajax({method: "get", url: "question/answer_team_distribution/" + W + "?question_id=" + U}).done(function (e) {
        var e = JSON.parse(e), i = e.data;
        H = t(i)
    }, "json");
    var G;
    $(".circle").each(function (e, t) {
        var i = 3.6 * $(this).find(".percent span").text();
        i <= 180 ? ($(this).find(".left").css("transform", "rotate(-180deg)"), $(this).find(".right").css("transform", "rotate(" + (i - 180) + "deg)")) : $(this).find(".left").css("transform", "rotate(" + i + "deg)")
    }), $(".questions").on("click", ".item", function (e) {
        e.preventDefault(), e.stopPropagation();
        var t = $("#course-id").val(), i = $(this).attr("id"), n = window.location.href.replace(/\d*$/, i);
        if (i !== $("#question-id").val()) {
            window.history && history.pushState && window.history.replaceState({}, 0, n);
            new QuestionData(t, i)
        }
    }), window.QuestionData = function (e, t, i, n, a) {
        this.cid = e, this.qid = t, this.pid = i, this.url = n, this.container = $(".right-area"), a || this.getTpl()
    }, QuestionData.prototype.getTpl = function () {
        var e = this, t = {question_id: this.qid};
        return this.pid && (t.paper_id = this.pid), $.get(this.url, t, function (t) {
            e.render(t)
        })
    }, QuestionData.prototype.render = function (e) {
        e = JSON.parse(e).data, this.container.empty().append(e.tpl), $("#question-id").val(this.qid), n(e.answerDistribution)
    };
    var X = function (e, t) {
        this.cid = e, this.qid = t, this.container = $(".error-list")
    };
    X.prototype.show = function () {
        this.container.slideDown(100, g)
    }, X.prototype.hidden = function () {
        this.container.slideUp(100)
    };
    var Z = {
        0: {2: "修改为未读", 1: "修改为已读"},
        4: {2: "修改为未答", 1: "修改为已答"},
        5: {2: "修改为未答", 1: "修改为已答"},
        7: {2: "修改为未答", 1: "修改为已答"},
        8: {2: "修改为未交卷", 1: "修改为已交卷"}
    }, K = function (e, t, i) {
        i = parseInt(i || 4), this.cid = e, this.qid = t, this.stateOption = {
            0: this.changeToWrong,
            1: this.changeToRight,
            2: this.changeToNotAnswer
        }, this.classname = "color-black color-orange color-green", this.nextType = 0 === i || 4 === i || 5 === i || 7 === i || 8 === i ? {
            1: 2,
            2: 1
        } : {0: 1, 1: 2, 2: 0}, this.textOption = Z[i] ? Z[i] : {
            0: "修改为答错",
            1: "修改为答对",
            2: "修改为未答"
        }, this.container = $(".error-student-list"), this.bindEvent()
    };
    K.prototype.show = function () {
        this.container.slideDown(100, g)
    }, K.prototype.hidden = function () {
        this.container.slideUp(100)
    }, K.prototype.changeToNotAnswer = function (e, t) {
        e.removeClass(this.classname).addClass("color-black"), this.AjaxSetState(e, 2, t)
    }, K.prototype.changeToWrong = function (e, t) {
        e.removeClass(this.classname).addClass("color-orange"), this.AjaxSetState(e, 0, t)
    }, K.prototype.changeToRight = function (e, t) {
        e.removeClass(this.classname).addClass("color-green"), this.AjaxSetState(e, 1, t)
    }, K.prototype.AjaxSetState = function (e, t, i) {
        var n = this;
        this.container.off("click"), $.post("question/set_answer", {
            student_id: i,
            course_id: this.cid,
            question_id: this.qid,
            is_correct: t
        }).done(function () {
            n.setState(e, t), n.bindEvent()
        })
    }, K.prototype.setState = function (e, t) {
        e.attr("data-state", t), j(this.textOption[t])
    }, K.prototype.bindEvent = function () {
        var e = this;
        this.container.off("click").on("click", ".state-btn", function () {
            var t = $(this).parent("li"), i = t.attr("data-state"), n = t.attr("data-sid");
            e.stateOption[e.nextType[i]].call(e, t, n)
        })
    };
    var ee = function (e) {
        $.post("question", e).done(function (e) {
            var t = {msg: "编辑题目出错, 请稍后重试!!!"};
            try {
                t = JSON.parse(e)
            } catch (i) {
                console.error("error", i)
            }
            if (t.msg) alert(t.msg); else {
                var n = window.location.href, a = t.id;
                a && (n.match("question_id=") ? n = n.replace(/question_id=\d*/, "question_id=" + a) : n += "?question_id=" + a), window.location.href = n, window.location.reload()
            }
        })
    }, te = function (e) {
        var t = $.Deferred();
        return $.ajax({
            method: "post", url: "question/ensure_pic", data: e, success: function (e) {
                var i = JSON.parse(e);
                t.resolve(i.data.path)
            }
        }), t
    }, ie = function (e) {
        var t = new XMLHttpRequest, i = $.Deferred();
        return t.open("POST", "api/upload", !0), t.onload = function (e) {
            if (200 === this.status) {
                var t = JSON.parse(this.responseText);
                i.resolve(t.data.path)
            }
        }, t.onerror = function (e) {
            i.reject(e)
        }, t.upload.onprogress = function (e) {
            i.notify(parseInt(e.loaded / e.total * 100))
        }, t.send(e), i
    }, ne = function () {
        EditQuestion.unmout(document.getElementById("edit-area"))
    };
    n()
});
var client = {}, clientObj = {}, timer = 0, deleteDialog = {
    el: $(".dialog-wrapper.delete-paper-dialog"),
    qid: null,
    cid: null,
    type: null,
    release: 0,
    bindEvent: function () {
        var e = this;
        this.el.on("click", ".dialog-confirm", function () {
            e.onConfirm()
        }), this.el.on("click", ".close-btn, .dialog-cancel", function () {
            e.onCancel()
        })
    },
    initType: function (e, t) {
        if (void 0 == e) var i = "确定删除", n = "您确定删除课件么？"; else if (8 == e) var i = "确定删除组卷？",
            n = "删除后, 组卷与其中的题目将从题库中彻底被删除, 答题记录也将一并被删除。"; else if (1 == t) var i = "确定删除题目？",
            n = "删除后, 题目将从组卷及题库中彻底被删除, 答题记录也将一并被删除。"; else var i = "确定删除题目？", n = "删除后, 答题记录也将一并被删除。";
        var a = this.el.find(".dialog-content"), o = this.el.find(".dialog-head"), s = o.find("span"),
            r = a.find(".delete-item");
        s.text(i), r.text(n)
    },
    showDialog: function (e, t, i, n, a) {
        this.cid = e, this.qid = t, this.type = n, this.curid = i, this.initType(n, a), this.el.css("display", "table")
    },
    hideDialog: function (e, t) {
        this.el.css("display", "none")
    },
    onConfirm: function () {
        var e = this, t = this.qid;
        $.ajax({
            method: "DELETE",
            url: "question?question_id=" + t + "&course_id=" + this.cid + "&release=0",
            success: function (i) {
                e.hideDialog();
                var n = window.location.href.replace(/\?\S*/, "").replace(/#\S*/, "");
                window.location.href.match("get_answer_detail") && t.match(/[a-zA-Z]/) && (n = n.replace("question/get_answer_detail", "courseware/get_courseware_detail"), n += "#courseware"), window.history && history.pushState && window.history.replaceState({}, 0, n), window.location.href = n, window.location.reload()
            }
        })
    },
    onCancel: function () {
        this.hideDialog()
    }
};
deleteDialog.bindEvent();