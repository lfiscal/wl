if (counter) throw counter.init(), "resetting";

var counter = {
        docObj: $("<span contenteditable='true' tabindex='-1'>0</span"),
        projectName: $("#project-name").text(),
        skip: !0,
        id: "",
        init: function() {
            this.docObj.insertBefore("#skip").css("padding", "9px"), localStorage.getItem(this.projectName) ? this.docObj.text(localStorage.getItem(this.projectName)) : localStorage.setItem(this.projectName, this.docObj.text()), this.onload()
        },
        incr: function() {
            this.docObj.text(String(parseInt(this.docObj.text()) + 1)), localStorage.setItem(this.projectName, this.docObj.text())
        },
        onload: function() {
            var e = $(".audio-id").text();
            if (e !== this.id && e) {
                if (this.id = e, $(".request-group").click(function() {
                        this.skip = !0
                    }), $(".request.active").hasClass("gradable") || !$(".request-group").length) {
                    var t = !!$(".ui.positive.message").length;
                    this.skip || t || this.incr(), this.skip = t
                }
                $(".ui.positive.message").length || setTimeout(function() {
                    $(".ui.checkbox.slider input").click()
                }, 100)
            }
        }
    },
    s_ajaxListener = {
        tempOpen: XMLHttpRequest.prototype.open,
        tempSend: XMLHttpRequest.prototype.send,
        callback: function() {
            this.url.includes("grade") && counter.onload()
        }
    };
XMLHttpRequest.prototype.open = function(e, t) {
    if (!e) e = "";
    if (!t) t = "";
    s_ajaxListener.tempOpen.apply(this, arguments), s_ajaxListener.method = e, s_ajaxListener.url = t, "get" == e.toLowerCase() && (s_ajaxListener.data = t.split("?"), s_ajaxListener.data = s_ajaxListener.data[1])
}, XMLHttpRequest.prototype.send = function(e, t) {
    if (!e) e = "";
    if (!t) t = "";
    s_ajaxListener.tempSend.apply(this, arguments), "post" == s_ajaxListener.method.toLowerCase() && (s_ajaxListener.data = e), s_ajaxListener.callback()
}, hideParseSetting = !1, counter.init();
