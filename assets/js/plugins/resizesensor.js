/**
 * ResizeSensor.js
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
"use strict";
! function(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.ResizeSensor = t()
}("undefined" != typeof window ? window : this, function() {
    if ("undefined" == typeof window) return null;
    var e = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(e) {
        return window.setTimeout(e, 20)
    };

    function t(e, t) {
        var i = Object.prototype.toString.call(e),
            n = "[object Array]" === i || "[object NodeList]" === i || "[object HTMLCollection]" === i || "[object Object]" === i || "undefined" != typeof jQuery && e instanceof jQuery || "undefined" != typeof Elements && e instanceof Elements,
            o = 0,
            s = e.length;
        if (n)
            for (; o < s; o++) t(e[o]);
        else t(e)
    }

    function i(e) {
        if (!e.getBoundingClientRect) return {
            width: e.offsetWidth,
            height: e.offsetHeight
        };
        var t = e.getBoundingClientRect();
        return {
            width: Math.round(t.width),
            height: Math.round(t.height)
        }
    }
    var n = function(o, s) {
        function r() {
            var e, t, i = [];
            this.add = function(e) {
                i.push(e)
            }, this.call = function(n) {
                for (e = 0, t = i.length; e < t; e++) i[e].call(this, n)
            }, this.remove = function(n) {
                var o = [];
                for (e = 0, t = i.length; e < t; e++) i[e] !== n && o.push(i[e]);
                i = o
            }, this.length = function() {
                return i.length
            }
        }

        function d(t, n) {
            if (t)
                if (t.resizedAttached) t.resizedAttached.add(n);
                else {
                    t.resizedAttached = new r, t.resizedAttached.add(n), t.resizeSensor = document.createElement("div"), t.resizeSensor.dir = "ltr", t.resizeSensor.className = "resize-sensor";
                    var o = "pointer-events: none; position: absolute; left: 0px; top: 0px; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden; max-width: 100%;",
                        s = "position: absolute; left: 0; top: 0; transition: 0s;";
                    t.resizeSensor.style.cssText = o, t.resizeSensor.innerHTML = '<div class="resize-sensor-expand" style="' + o + '"><div style="' + s + '"></div></div><div class="resize-sensor-shrink" style="' + o + '"><div style="' + s + ' width: 200%; height: 200%"></div></div>', t.appendChild(t.resizeSensor);
                    var d = window.getComputedStyle(t),
                        c = d ? d.getPropertyValue("position") : null;
                    "absolute" !== c && "relative" !== c && "fixed" !== c && (t.style.position = "relative");
                    var f, h, a = t.resizeSensor.childNodes[0],
                        l = a.childNodes[0],
                        u = t.resizeSensor.childNodes[1],
                        v = i(t),
                        p = v.width,
                        z = v.height,
                        w = !0,
                        g = 0,
                        y = function() {
                            if (w) {
                                if (0 === t.offsetWidth && 0 === t.offsetHeight) return void(g || (g = e(function() {
                                    g = 0, y()
                                })));
                                w = !1
                            }
                            var i, n;
                            i = t.offsetWidth, n = t.offsetHeight, l.style.width = i + 10 + "px", l.style.height = n + 10 + "px", a.scrollLeft = i + 10, a.scrollTop = n + 10, u.scrollLeft = i + 10, u.scrollTop = n + 10
                        };
                    t.resizeSensor.resetSensor = y;
                    var m = function() {
                            h = 0, f && (p = v.width, z = v.height, t.resizedAttached && t.resizedAttached.call(v))
                        },
                        S = function() {
                            v = i(t), (f = v.width !== p || v.height !== z) && !h && (h = e(m)), y()
                        },
                        b = function(e, t, i) {
                            e.attachEvent ? e.attachEvent("on" + t, i) : e.addEventListener(t, i)
                        };
                    b(a, "scroll", S), b(u, "scroll", S), e(y)
                }
        }
        t(o, function(e) {
            d(e, s)
        }), this.detach = function(e) {
            n.detach(o, e)
        }, this.reset = function() {
            o.resizeSensor.resetSensor()
        }
    };
    if (n.reset = function(e) {
            t(e, function(e) {
                e.resizeSensor.resetSensor()
            })
        }, n.detach = function(e, i) {
            t(e, function(e) {
                e && (e.resizedAttached && "function" == typeof i && (e.resizedAttached.remove(i), e.resizedAttached.length()) || e.resizeSensor && (e.contains(e.resizeSensor) && e.removeChild(e.resizeSensor), delete e.resizeSensor, delete e.resizedAttached))
            })
        }, "undefined" != typeof MutationObserver) {
        var o = new MutationObserver(function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t))
                    for (var i = e[t].addedNodes, o = 0; o < i.length; o++) i[o].resizeSensor && n.reset(i[o])
        });
        document.addEventListener("DOMContentLoaded", function(e) {
            o.observe(document.body, {
                childList: !0,
                subtree: !0
            })
        })
    }
    return n
});