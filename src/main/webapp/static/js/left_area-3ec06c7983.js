!function (e) {
    "use strict";

    function t() {
        return {authorization: e("#authorization").val()}
    }

    function i() {
        D.css("display", "flex")
    }

    function n(e) {
        var t = navigator.userAgent.toLowerCase(), i = t.indexOf("trident/") !== -1;
        i ? window.location.href = "http://" + window.location.host + "/" + e : window.location.href = e
    }

    function o(e, t) {
        var n = "/api/v1/coursewares/" + e;
        v("GET", n).done(function (n) {
            if (n.converted) {
                var o = l(n.pages, "content");
                h(o), r(e), a(y), i(), t()
            } else {
                var s = window.open(n.previewUrl, "_blank");
                s || alert("您的浏览器阻止了新页面的弹出，请进入浏览器设置－>安全性，取消“阻止弹出式窗口”的勾选")
            }
        })
    }

    function r(e) {
        var e = e || "";
        J.change({id: e}), localStorage.setItem("coursewareId", e)
    }

    function a(e) {
        var e = e || "";
        localStorage.setItem("courseId", e)
    }

    function s() {
        return localStorage.getItem("coursewareId") || ""
    }

    function u() {
        return localStorage.getItem("courseId") || ""
    }

    function c(e) {
        var e = e || 0;
        J.change({page: e}), localStorage.setItem("coursewarePage", e)
    }

    function d() {
        return localStorage.getItem("coursewarePage") || 0
    }

    function l(e, t) {
        return e.map(function (e) {
            return e[t]
        })
    }

    function p() {
        Reveal.destroy(function () {
            J.change({status: 0}), J.publish(), e("#container").show()
        })
    }

    function h(t) {
        var i = f(t);
        e("#container").hide(), e(".reveal").append('<i class="reveal-control"></i>').append(e('<div class="slides"></div>').html(i)).show(), e(".reveal-control").on("click", p), Reveal.initialize({
            slideNumber: !0,
            mouseWheel: !0,
            keyboard: {38: "prev", 40: "next", 32: "next", 27: p}
        })
    }

    function f(e) {
        return e.map(function (e) {
            return '<section><img src="' + e + '"></section>'
        })
    }

    function v(t, i, n, o, r) {
        var a = w();
        return e.ajax({
            type: t, url: i, data: n, success: o, error: r, dataType: "json", beforeSend: function (e) {
                e.setRequestHeader("authorization", a.token.replace("%20", " "))
            }
        })
    }

    function w() {
        var e = document.cookie || "", t = e.split("; "), i = {};
        return t.forEach(function (e) {
            var t = e.split("=");
            i[t[0]] = t[1]
        }), i
    }

    function g(e) {
        var t = e.course.course_id, i = e.question.question_id, n = e.paperId, o = "question/get_que/" + t;
        return q(t, i, n, o)
    }

    function m(e) {
        var t = e.question.id, i = e.course.course_id, n = "courseware/detail/" + t;
        return q(i, t, void 0, n)
    }

    function q(e, t, i, o) {
        var r = window.location.href.match("get_answer_detail") || window.location.href.match("get_courseware_detail");
        if (r || true) {
            var a = new QuestionData(e, t, i, o, (!0)), o = window.location.href;
            return o.match("question_id=") ? o = o.replace(/question_id=[A-z|0-9]*/, "question_id=" + t) : o += "?question_id=" + t, window.history && history.pushState && window.history.replaceState({}, 0, o), a.getTpl()
        }
        n("question/get_answer_detail/" + e + "?question_id=" + t)
    }

    var _ = e("#objective"), y = e("#course-id").val(), b = e("#subjective"),
        P = (e(".btn-add-question"), e(".objective-question")), k = e(".subjective-question"),
        C = e(".objective-question li"), x = e(".subjective-question li"), D = e(".playbtn-group"),
        S = e(".playbtn-group .top"), A = e(".playbtn-group .bottom");
    _.click(function (t) {
        e(this).parents(".tab_item").addClass("checked"), b.parents(".tab_item").removeClass("checked"), P.removeClass("hidden"), k.addClass("hidden")
    }), b.click(function (t) {
        e(this).parents(".tab_item").addClass("checked"), _.parents(".tab_item").removeClass("checked"), k.removeClass("hidden"), P.addClass("hidden")
    }), "" !== s() && u() === y && i(), S.on("click", function () {
        var e = s();
        o(e, L)
    }), A.on("click", function () {
        var e = s();
        J.init(), J.publish(), r(""), c(0), D.hide();
        var t = "/api/v1/coursewares/" + e + "/switch";
        v("PUT", t, {type: "stop"})
    }), C.each(function (t) {
        return e(this).find(".que-num").html(C.length - t)
    }), x.each(function (t) {
        return e(this).find(".que-num").html(x.length - t)
    }), P.on("click", ".add-paper", function (t) {
        t.stopPropagation(), t.preventDefault();
        var i = e(this).parents(".item"), n = i.find(".text").text(), o = i.attr("id");
        i.slideUp(100), I.addQuestion(n, o), I.dialogShow()
    }), P.on("click", ".add-paper-disabled", function (e) {
        e.stopPropagation(), e.preventDefault()
    });
    var I = {
        $el: e(".paper-dialog"), queArr: [], request: null, bindEvent: function () {
            var t = this;
            this.$el.on("click", ".icon-delete", function () {
                var i = e(this).parent("li"), n = i.index();
                t.removeQuestion(n)
            }), this.$el.on("click", ".btn-cancle", function () {
                t.cancelPaper()
            }), this.$el.on("click", ".btn-create", function () {
                t.createPaper()
            })
        }, dialogShow: function () {
            this.$el.slideDown(100)
        }, dialogHide: function () {
            this.$el.find(".paper-questions").empty(), this.$el.find('[type="text"]').val(""), this.queArr = [], this.$el.slideUp(100), this.request = null
        }, addQuestion: function (t, i) {
            var n = e("<li><span>" + t + '</span><i class="icon icon-delete" title="移出组卷"></i></li>');
            this.queArr.push(i), this.$el.find(".paper-questions").append(n), this.$el.find(".title .green").text(this.queArr.length + "道")
        }, removeQuestion: function (t) {
            e("#" + this.queArr[t]).slideDown(100), this.$el.find("li").eq(t).remove(), this.queArr.splice(t, 1), this.queArr.length || this.dialogHide()
        }, cancelPaper: function () {
            for (var e = this.queArr.length - 1; e >= 0; e--) this.removeQuestion(e);
            this.dialogHide()
        }, createPaper: function () {
            var t = this, i = e("#course-id").val(), n = this.$el.find(".input"),
                o = n.find('[type="text"]').val() || "";
            return "" === o ? void n.addClass("alert") : void(this.request || (this.request = e.post("paper/create", {
                course_id: i,
                content: o,
                question_ids: this.queArr
            }, function (i) {
                var o = e(".objective-question");
                o.prepend(i), o.find(".item").eq(0).find(".que-num").text(o.find(".item").length), n.removeClass("alert"), t.dialogHide()
            })))
        }
    };
    I.bindEvent();
    var E = e(".item");
    E.length > 0 && E.mouseenter(function () {
        e(this).find(".delete-question-btn").removeClass("hidden")
    }).mouseleave(function () {
        e(this).find(".delete-question-btn").addClass("hidden")
    }), e(".questions").on("click", ".delete-question-btn", function (t) {
        t.stopPropagation(), t.preventDefault();
        var i = e(this).parents(".item").attr("id"), n = e("#course-id").val(), o = e("#question-id").val(),
            r = e(this).parents(".item").data("type");
        j.showDialog(n, i, o, r)
    }), e(".questions").on("click", ".clone-question-btn", function (t) {
        t.stopPropagation(), t.preventDefault();
        var i = e(this).parents(".item").attr("id"), n = (e(this).parents(".item").data("type"), e("#course-id").val());
        e.post("question/copy_que", {course_id: n, question_id: i}).done(function (t) {
            t = JSON.parse(t), e(".questions:visible").empty().append(t.data.tpl)
        })
    }), e(".questions").on("click", ".clone-question-btn-diabled", function (e) {
        e.stopPropagation(), e.preventDefault()
    });
    var j = {
        el: e(".dialog-wrapper.delete-paper-dialog"),
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
                n = "删除后, 组卷与其中的题目将从题库中彻底被删除, 答题记录也将一并被删除。"; else if (t) var i = "确定删除题目？",
                n = "删除后, 题目将从组卷及题库中彻底被删除, 答题记录也将一并被删除。"; else var i = "确定删除题目？", n = "删除后, 答题记录也将一并被删除。";
            var o = this.el.find(".dialog-content"), r = this.el.find(".dialog-head"), a = r.find("span"),
                s = o.find(".delete-item");
            a.text(i), s.text(n)
        },
        showDialog: function (e, t, i, n, o, r) {
            this.cid = e, this.qid = t, this.type = n, this.curid = i, this.deferred = r, this.initType(n, o), this.el.css("display", "table")
        },
        hideDialog: function (e, t) {
            this.el.css("display", "none")
        },
        onConfirm: function () {
            var t = this, i = this.qid;
            e.ajax({
                method: "DELETE",
                url: "question?question_id=" + i + "&course_id=" + this.cid + "&release=0",
                success: function (e) {
                    t.hideDialog();
                    var n = window.location.href.replace(/\?\S*/, "").replace(/#\S*/, "");
                    window.location.href.match("get_answer_detail") && i.match(/[a-zA-Z]/) && (n = n.replace("question/get_answer_detail", "courseware/get_courseware_detail"), n += "#courseware"), window.history && history.pushState && window.history.replaceState({}, 0, n), window.location.href = n, window.location.reload()
                }
            })
        },
        onCancel: function () {
            this.hideDialog()
        }
    };
    j.bindEvent();
    var T = function (t) {
        var i = e("#question-id").val(), n = t.course.course_id, o = t.question.question_id || t.question.id,
            r = t.question.type, a = e.Deferred();
        return j.showDialog(n, o, i, r, t.isPaper, a), a
    }, $ = function (t) {
        var i = t.question.question_id || t.question.id, n = (t.question.type, t.course.course_id);
        return e.post("question/copy_que", {course_id: n, question_id: i})
    }, R = function (t) {
        return t.question ? t.question.type ? g(t) : m(t) : (e(".right-area").empty().append("<p>暂无数据</p>"), "ok")
    }, Q = function (e, i) {
        var n = {course_info: e, chapter_info: i, pre_time: e.duration_rule};
        EditQuestion.mount(document.getElementById("edit-area"), n, G, X, M, Z, "/api/v1/upload/direct", t)
    }, N = function (e) {
        var t = e.library_id, i = encodeURIComponent(window.location.href);
        parent.window.editPaper(t, null, i)
    }, F = function (t) {
        for (var i = t.course.course_id, n = t.questions, o = [], r = 0, a = n.length; r < a; r++) o.push(n[r].question_id);
        return e.post("paper/create", {
            course_id: i,
            content: t.paper.title,
            question_ids: o,
            desc: t.paper.desc,
            difficulty: t.paper.diff,
            open_answer: t.paper.answer,
            order_type: t.paper.order,
            time: t.paper.time,
            type: t.paper.type,
            chapter_id: t.paper.chapter
        })
    };
    Reveal.addEventListener("slidechanged", function (e) {
        var t = e.indexh;
        J.change({page: t}), J.publish(), c(t)
    }), Reveal.addEventListener("ready", function (e) {
        J.change({status: 1}), J.publish()
    });
    var z = function (t) {
        var i = t.paperId, n = t.course.course_id, o = 1 - t.isPublish;
        return e.post("question/open_answer", {question_id: i, course_id: n, answer_open: o})
    }, H = function (e) {
        var t = window.location.href.replace(/question_id=\d*/, "question_id=" + e.paperId).replace(/&paper_id=\d*/, "") + "#paper";
        window.location.href = t
    }, O = function (e) {
        var t = e.library_id, i = encodeURIComponent(window.location.href);
        window.location.href = "/libraries/" + t + "?type=file&action=createCourseware&from=" + i
    }, U = function (e) {
        var e = e, t = s();
        return e === t ? (J.change({type: "startPlay"}), J.publish(), o(e, L)) : (c(0), J.change({type: "startPlay"}), J.publish(), o(e, B))
    }, L = function (t) {
        Reveal.slide(t || d()), e(".present img").get(0).onload = function () {
            Reveal.layout()
        }
    };
    window.myFunc ? window.myFunc.getCourseware = o : (window.myFunc = {}, window.myFunc.getCourseware = o), e(".reveal").on("statusChangeFromWx", function (e, t) {
        J.get().status !== t.status ? o(t.id, L) : t.status && Reveal.slide(t.page)
    }), e(".reveal").on("play", function (e, t) {
        U(t)
    });
    var J = function () {
        var t = {
            id: "",
            page: 0,
            status: 0,
            origin: "pc",
            course_id: e("#course-id").val(),
            library_id: e("#library-id").val(),
            type: ""
        };
        return {
            get: function () {
                return t
            }, init: function () {
                t.id = "", t.page = 0, t.status = 0
            }, change: function (i) {
                t = e.extend(t, i)
            }, publish: function () {
                e(".reveal").trigger("statusChange", t)
            }
        }
    }(), B = function () {
    }, V = {
        deletePromise: T,
        clonePromise: $,
        choicePromise: R,
        editorPromise: Q,
        editorPaperPromise: N,
        addPaperPromise: F,
        addFilePromise: O,
        playPromise: U,
        publishPromise: z,
        backFunc: H
    }, W = {"#question": 0, "#paper": 1, "#courseware": 2};
    NAV_DATA.showType = W[location.hash], questionNav.mount(NAV_DATA, V);
    var G = function () {
        var t = !0;
        return function (i) {
            t && (t = !1, e.post("question", i).done(function (e) {
                var t = {msg: "创建题目出错, 请稍后重试"};
                try {
                    t = e
                } catch (i) {
                    console.error("error", i)
                }
                if (t.msg) alert(t.msg); else {
                    var n = window.location.href, o = t.id;
                    o && (n.match("question_id=") ? n = n.replace(/question_id=\d*/, "question_id=" + o) : n += "?question_id=" + o), window.location.href = n
                }
            }))
        }
    }(), M = function (t) {
        var i = e.Deferred();
        return e.ajax({
            method: "post", url: "question/ensure_pic", data: t, success: function (e) {
                var t = JSON.parse(e);
                i.resolve(t)
            }
        }), i
    }, X = function (t, i) {
        return new Promise(function (n, o) {
            var r = new XMLHttpRequest;
            e.Deferred();
            r.open("POST", "api/upload", !0), r.onload = function (e) {
                if (200 === this.status) {
                    var t = JSON.parse(this.responseText);
                    n(t.data.path)
                } else o(e)
            }, r.onerror = function (e) {
                o(e)
            }, r.upload.onprogress = function (e) {
                i(e.loaded, e.total)
            }, r.send(t)
        })
    }, Z = function () {
        EditQuestion.unmout(document.getElementById("edit-area"))
    }
}(jQuery);