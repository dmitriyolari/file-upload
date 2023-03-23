/**
 * Minified by jsDelivr using UglifyJS v3.4.1.
 * Original file: /npm/resumablejs@1.1.0/resumable.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function () {
    "use strict";
    var i = function (e) {
        if (!(this instanceof i)) return new i(e);
        if (this.version = 1, this.support = !("undefined" == typeof File || "undefined" == typeof Blob || "undefined" == typeof FileList || !Blob.prototype.webkitSlice && !Blob.prototype.mozSlice && !Blob.prototype.slice), !this.support) return !1;
        var d = this;
        d.files = [], d.defaults = {
            chunkSize: 1048576,
            forceChunkSize: !1,
            simultaneousUploads: 3,
            fileParameterName: "file",
            chunkNumberParameterName: "resumableChunkNumber",
            chunkSizeParameterName: "resumableChunkSize",
            currentChunkSizeParameterName: "resumableCurrentChunkSize",
            totalSizeParameterName: "resumableTotalSize",
            typeParameterName: "resumableType",
            identifierParameterName: "resumableIdentifier",
            fileNameParameterName: "resumableFilename",
            relativePathParameterName: "resumableRelativePath",
            totalChunksParameterName: "resumableTotalChunks",
            throttleProgressCallbacks: .5,
            query: {},
            headers: {},
            preprocess: null,
            method: "multipart",
            uploadMethod: "POST",
            testMethod: "GET",
            prioritizeFirstAndLastChunk: !1,
            target: "/",
            testTarget: null,
            parameterNamespace: "",
            testChunks: !0,
            generateUniqueIdentifier: null,
            getTarget: null,
            maxChunkRetries: 100,
            chunkRetryInterval: void 0,
            permanentErrors: [400, 404, 415, 500, 501],
            maxFiles: void 0,
            withCredentials: !1,
            xhrTimeout: 0,
            clearInput: !0,
            chunkFormat: "blob",
            setChunkTypeFromFile: !1,
            maxFilesErrorCallback: function (e, t) {
                var r = d.getOpt("maxFiles");
                alert("Please upload no more than " + r + " file" + (1 === r ? "" : "s") + " at a time.")
            },
            minFileSize: 1,
            minFileSizeErrorCallback: function (e, t) {
                alert(e.fileName || e.name + " is too small, please upload files larger than " + h.formatSize(d.getOpt("minFileSize")) + ".")
            },
            maxFileSize: void 0,
            maxFileSizeErrorCallback: function (e, t) {
                alert(e.fileName || e.name + " is too large, please upload files less than " + h.formatSize(d.getOpt("maxFileSize")) + ".")
            },
            fileType: [],
            fileTypeErrorCallback: function (e, t) {
                alert(e.fileName || e.name + " has type not allowed, please upload files of type " + d.getOpt("fileType") + ".")
            }
        }, d.opts = e || {}, d.getOpt = function (e) {
            var t = this;
            if (e instanceof Array) {
                var r = {};
                return h.each(e, function (e) {
                    r[e] = t.getOpt(e)
                }), r
            }
            if (t instanceof s) {
                if (void 0 !== t.opts[e]) return t.opts[e];
                t = t.fileObj
            }
            if (t instanceof m) {
                if (void 0 !== t.opts[e]) return t.opts[e];
                t = t.resumableObj
            }
            if (t instanceof i) return void 0 !== t.opts[e] ? t.opts[e] : t.defaults[e]
        }, d.events = [], d.on = function (e, t) {
            d.events.push(e.toLowerCase(), t)
        }, d.fire = function () {
            for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
            var r = e[0].toLowerCase();
            for (t = 0; t <= d.events.length; t += 2) d.events[t] == r && d.events[t + 1].apply(d, e.slice(1)), "catchall" == d.events[t] && d.events[t + 1].apply(null, e);
            "fileerror" == r && d.fire("error", e[2], e[1]), "fileprogress" == r && d.fire("progress")
        };
        var h = {
            stopEvent: function (e) {
                e.stopPropagation(), e.preventDefault()
            }, each: function (e, t) {
                if (void 0 !== e.length) {
                    for (var r = 0; r < e.length; r++) if (!1 === t(e[r])) return
                } else for (r in e) if (!1 === t(r, e[r])) return
            }, generateUniqueIdentifier: function (e, t) {
                var r = d.getOpt("generateUniqueIdentifier");
                if ("function" == typeof r) return r(e, t);
                var n = e.webkitRelativePath || e.fileName || e.name;
                return e.size + "-" + n.replace(/[^0-9a-zA-Z_-]/gim, "")
            }, contains: function (e, t) {
                var r = !1;
                return h.each(e, function (e) {
                    return e != t || !(r = !0)
                }), r
            }, formatSize: function (e) {
                return e < 1024 ? e + " bytes" : e < 1048576 ? (e / 1024).toFixed(0) + " KB" : e < 1073741824 ? (e / 1024 / 1024).toFixed(1) + " MB" : (e / 1024 / 1024 / 1024).toFixed(1) + " GB"
            }, getTarget: function (e, t) {
                var r = d.getOpt("target");
                if ("test" === e && d.getOpt("testTarget") && (r = "/" === d.getOpt("testTarget") ? d.getOpt("target") : d.getOpt("testTarget")), "function" == typeof r) return r(t);
                var n = r.indexOf("?") < 0 ? "?" : "&";
                return r + n + t.join("&")
            }
        }, t = function (e) {
            h.stopEvent(e), e.dataTransfer && e.dataTransfer.items ? n(e.dataTransfer.items, e) : e.dataTransfer && e.dataTransfer.files && n(e.dataTransfer.files, e)
        }, r = function (e) {
            e.preventDefault()
        };

        function l(e, t, r, n) {
            var i, a, s, o, u;
            return e.isFile ? e.file(function (e) {
                e.relativePath = t + e.name, r.push(e), n()
            }) : (e.isDirectory ? i = e : e instanceof File && r.push(e), "function" == typeof e.webkitGetAsEntry && (i = e.webkitGetAsEntry()), i && i.isDirectory ? (s = t + (a = i).name + "/", o = r, u = n, void a.createReader().readEntries(function (e) {
                if (!e.length) return u();
                f(e.map(function (e) {
                    return l.bind(null, e, s, o)
                }), u)
            })) : ("function" == typeof e.getAsFile && (e = e.getAsFile()) instanceof File && (e.relativePath = t + e.name, r.push(e)), void n()))
        }

        function f(e, t) {
            if (!e || 0 === e.length) return t();
            e[0](function () {
                f(e.slice(1), t)
            })
        }

        function n(e, t) {
            if (e.length) {
                d.fire("beforeAdd");
                var r = [];
                f(Array.prototype.map.call(e, function (e) {
                    return l.bind(null, e, "", r)
                }), function () {
                    r.length && a(r, t)
                })
            }
        }

        var a = function (e, o) {
            var u = 0,
                l = d.getOpt(["maxFiles", "minFileSize", "maxFileSize", "maxFilesErrorCallback", "minFileSizeErrorCallback", "maxFileSizeErrorCallback", "fileType", "fileTypeErrorCallback"]);
            if (void 0 !== l.maxFiles && l.maxFiles < e.length + d.files.length) {
                if (1 !== l.maxFiles || 1 !== d.files.length || 1 !== e.length) return l.maxFilesErrorCallback(e, u++), !1;
                d.removeFile(d.files[0])
            }
            var f = [], c = [], t = e.length, p = function () {
                if (!--t) {
                    if (!f.length && !c.length) return;
                    window.setTimeout(function () {
                        d.fire("filesAdded", f, c)
                    }, 0)
                }
            };
            h.each(e, function (r) {
                var e = r.name;
                if (0 < l.fileType.length) {
                    var t = !1;
                    for (var n in l.fileType) {
                        var i = "." + l.fileType[n];
                        if (-1 !== e.toLowerCase().indexOf(i.toLowerCase(), e.length - i.length)) {
                            t = !0;
                            break
                        }
                    }
                    if (!t) return l.fileTypeErrorCallback(r, u++), !1
                }
                if (void 0 !== l.minFileSize && r.size < l.minFileSize) return l.minFileSizeErrorCallback(r, u++), !1;
                if (void 0 !== l.maxFileSize && r.size > l.maxFileSize) return l.maxFileSizeErrorCallback(r, u++), !1;

                function a(t) {
                    d.getFromUniqueIdentifier(t) ? c.push(r) : function () {
                        r.uniqueIdentifier = t;
                        var e = new m(d, r, t);
                        d.files.push(e), f.push(e), e.container = void 0 !== o ? o.srcElement : null, window.setTimeout(function () {
                            d.fire("fileAdded", e, o)
                        }, 0)
                    }(), p()
                }

                var s = h.generateUniqueIdentifier(r, o);
                s && "function" == typeof s.then ? s.then(function (e) {
                    a(e)
                }, function () {
                    p()
                }) : a(s)
            })
        };

        function m(e, t, r) {
            var n = this;
            n.opts = {}, n.getOpt = e.getOpt, n._prevProgress = 0, n.resumableObj = e, n.file = t, n.fileName = t.fileName || t.name, n.size = t.size, n.relativePath = t.relativePath || t.webkitRelativePath || n.fileName, n.uniqueIdentifier = r, n._pause = !1, n.container = "";
            var i = void 0 !== r, a = function (e, t) {
                switch (e) {
                    case"progress":
                        n.resumableObj.fire("fileProgress", n, t);
                        break;
                    case"error":
                        n.abort(), i = !0, n.chunks = [], n.resumableObj.fire("fileError", n, t);
                        break;
                    case"success":
                        if (i) return;
                        n.resumableObj.fire("fileProgress", n), n.isComplete() && n.resumableObj.fire("fileSuccess", n, t);
                        break;
                    case"retry":
                        n.resumableObj.fire("fileRetry", n)
                }
            };
            return n.chunks = [], n.abort = function () {
                var t = 0;
                h.each(n.chunks, function (e) {
                    "uploading" == e.status() && (e.abort(), t++)
                }), 0 < t && n.resumableObj.fire("fileProgress", n)
            }, n.cancel = function () {
                var e = n.chunks;
                n.chunks = [], h.each(e, function (e) {
                    "uploading" == e.status() && (e.abort(), n.resumableObj.uploadNextChunk())
                }), n.resumableObj.removeFile(n), n.resumableObj.fire("fileProgress", n)
            }, n.retry = function () {
                n.bootstrap();
                var e = !1;
                n.resumableObj.on("chunkingComplete", function () {
                    e || n.resumableObj.upload(), e = !0
                })
            }, n.bootstrap = function () {
                n.abort(), i = !1, n.chunks = [], n._prevProgress = 0;
                for (var e = n.getOpt("forceChunkSize") ? Math.ceil : Math.floor, t = Math.max(e(n.file.size / n.getOpt("chunkSize")), 1), r = 0; r < t; r++) !function (e) {
                    window.setTimeout(function () {
                        n.chunks.push(new s(n.resumableObj, n, e, a)), n.resumableObj.fire("chunkingProgress", n, e / t)
                    }, 0)
                }(r);
                window.setTimeout(function () {
                    n.resumableObj.fire("chunkingComplete", n)
                }, 0)
            }, n.progress = function () {
                if (i) return 1;
                var t = 0, r = !1;
                return h.each(n.chunks, function (e) {
                    "error" == e.status() && (r = !0), t += e.progress(!0)
                }), t = r ? 1 : .99999 < t ? 1 : t, t = Math.max(n._prevProgress, t), n._prevProgress = t
            }, n.isUploading = function () {
                var t = !1;
                return h.each(n.chunks, function (e) {
                    if ("uploading" == e.status()) return !(t = !0)
                }), t
            }, n.isComplete = function () {
                var r = !1;
                return h.each(n.chunks, function (e) {
                    var t = e.status();
                    if ("pending" == t || "uploading" == t || 1 === e.preprocessState) return !(r = !0)
                }), !r
            }, n.pause = function (e) {
                n._pause = void 0 === e ? !n._pause : e
            }, n.isPaused = function () {
                return n._pause
            }, n.resumableObj.fire("chunkingStart", n), n.bootstrap(), this
        }

        function s(e, t, r, n) {
            var d = this;
            d.opts = {}, d.getOpt = e.getOpt, d.resumableObj = e, d.fileObj = t, d.fileObjSize = t.size, d.fileObjType = t.file.type, d.offset = r, d.callback = n, d.lastProgressCallback = new Date, d.tested = !1, d.retries = 0, d.pendingRetry = !1, d.preprocessState = 0;
            var i = d.getOpt("chunkSize");
            return d.loaded = 0, d.startByte = d.offset * i, d.endByte = Math.min(d.fileObjSize, (d.offset + 1) * i), d.fileObjSize - d.endByte < i && !d.getOpt("forceChunkSize") && (d.endByte = d.fileObjSize), d.xhr = null, d.test = function () {
                d.xhr = new XMLHttpRequest;
                var e = function (e) {
                    d.tested = !0;
                    var t = d.status();
                    "success" == t ? (d.callback(t, d.message()), d.resumableObj.uploadNextChunk()) : d.send()
                };
                d.xhr.addEventListener("load", e, !1), d.xhr.addEventListener("error", e, !1), d.xhr.addEventListener("timeout", e, !1);
                var r = [], n = d.getOpt("parameterNamespace"), t = d.getOpt("query");
                "function" == typeof t && (t = t(d.fileObj, d)), h.each(t, function (e, t) {
                    r.push([encodeURIComponent(n + e), encodeURIComponent(t)].join("="))
                }), r = r.concat([["chunkNumberParameterName", d.offset + 1], ["chunkSizeParameterName", d.getOpt("chunkSize")], ["currentChunkSizeParameterName", d.endByte - d.startByte], ["totalSizeParameterName", d.fileObjSize], ["typeParameterName", d.fileObjType], ["identifierParameterName", d.fileObj.uniqueIdentifier], ["fileNameParameterName", d.fileObj.fileName], ["relativePathParameterName", d.fileObj.relativePath], ["totalChunksParameterName", d.fileObj.chunks.length]].filter(function (e) {
                    return d.getOpt(e[0])
                }).map(function (e) {
                    return [n + d.getOpt(e[0]), encodeURIComponent(e[1])].join("=")
                })), d.xhr.open(d.getOpt("testMethod"), h.getTarget("test", r)), d.xhr.timeout = d.getOpt("xhrTimeout"), d.xhr.withCredentials = d.getOpt("withCredentials");
                var i = d.getOpt("headers");
                "function" == typeof i && (i = i(d.fileObj, d)), h.each(i, function (e, t) {
                    d.xhr.setRequestHeader(e, t)
                }), d.xhr.send(null)
            }, d.preprocessFinished = function () {
                d.preprocessState = 2, d.send()
            }, d.send = function () {
                var e = d.getOpt("preprocess");
                if ("function" == typeof e) switch (d.preprocessState) {
                    case 0:
                        return d.preprocessState = 1, void e(d);
                    case 1:
                        return
                }
                if (!d.getOpt("testChunks") || d.tested) {
                    d.xhr = new XMLHttpRequest, d.xhr.upload.addEventListener("progress", function (e) {
                        new Date - d.lastProgressCallback > 1e3 * d.getOpt("throttleProgressCallbacks") && (d.callback("progress"), d.lastProgressCallback = new Date), d.loaded = e.loaded || 0
                    }, !1), d.loaded = 0, d.pendingRetry = !1, d.callback("progress");
                    var t = function (e) {
                        var t = d.status();
                        if ("success" == t || "error" == t) d.callback(t, d.message()), d.resumableObj.uploadNextChunk(); else {
                            d.callback("retry", d.message()), d.abort(), d.retries++;
                            var r = d.getOpt("chunkRetryInterval");
                            void 0 !== r ? (d.pendingRetry = !0, setTimeout(d.send, r)) : d.send()
                        }
                    };
                    d.xhr.addEventListener("load", t, !1), d.xhr.addEventListener("error", t, !1), d.xhr.addEventListener("timeout", t, !1);
                    var r = [["chunkNumberParameterName", d.offset + 1], ["chunkSizeParameterName", d.getOpt("chunkSize")], ["currentChunkSizeParameterName", d.endByte - d.startByte], ["totalSizeParameterName", d.fileObjSize], ["typeParameterName", d.fileObjType], ["identifierParameterName", d.fileObj.uniqueIdentifier], ["fileNameParameterName", d.fileObj.fileName], ["relativePathParameterName", d.fileObj.relativePath], ["totalChunksParameterName", d.fileObj.chunks.length]].filter(function (e) {
                        return d.getOpt(e[0])
                    }).reduce(function (e, t) {
                        return e[d.getOpt(t[0])] = t[1], e
                    }, {}), n = d.getOpt("query");
                    "function" == typeof n && (n = n(d.fileObj, d)), h.each(n, function (e, t) {
                        r[e] = t
                    });
                    var i = d.fileObj.file.slice ? "slice" : d.fileObj.file.mozSlice ? "mozSlice" : d.fileObj.file.webkitSlice ? "webkitSlice" : "slice",
                        a = d.fileObj.file[i](d.startByte, d.endByte, d.getOpt("setChunkTypeFromFile") ? d.fileObj.file.type : ""),
                        s = null, o = [], u = d.getOpt("parameterNamespace");
                    if ("octet" === d.getOpt("method")) s = a, h.each(r, function (e, t) {
                        o.push([encodeURIComponent(u + e), encodeURIComponent(t)].join("="))
                    }); else if (s = new FormData, h.each(r, function (e, t) {
                        s.append(u + e, t), o.push([encodeURIComponent(u + e), encodeURIComponent(t)].join("="))
                    }), "blob" == d.getOpt("chunkFormat")) s.append(u + d.getOpt("fileParameterName"), a, d.fileObj.fileName); else if ("base64" == d.getOpt("chunkFormat")) {
                        var l = new FileReader;
                        l.onload = function (e) {
                            s.append(u + d.getOpt("fileParameterName"), l.result), d.xhr.send(s)
                        }, l.readAsDataURL(a)
                    }
                    var f = h.getTarget("upload", o), c = d.getOpt("uploadMethod");
                    d.xhr.open(c, f), "octet" === d.getOpt("method") && d.xhr.setRequestHeader("Content-Type", "application/octet-stream"), d.xhr.timeout = d.getOpt("xhrTimeout"), d.xhr.withCredentials = d.getOpt("withCredentials");
                    var p = d.getOpt("headers");
                    "function" == typeof p && (p = p(d.fileObj, d)), h.each(p, function (e, t) {
                        d.xhr.setRequestHeader(e, t)
                    }), "blob" == d.getOpt("chunkFormat") && d.xhr.send(s)
                } else d.test()
            }, d.abort = function () {
                d.xhr && d.xhr.abort(), d.xhr = null
            }, d.status = function () {
                return d.pendingRetry ? "uploading" : d.xhr ? d.xhr.readyState < 4 ? "uploading" : 200 == d.xhr.status || 201 == d.xhr.status ? "success" : h.contains(d.getOpt("permanentErrors"), d.xhr.status) || d.retries >= d.getOpt("maxChunkRetries") ? "error" : (d.abort(), "pending") : "pending"
            }, d.message = function () {
                return d.xhr ? d.xhr.responseText : ""
            }, d.progress = function (e) {
                void 0 === e && (e = !1);
                var t = e ? (d.endByte - d.startByte) / d.fileObjSize : 1;
                if (d.pendingRetry) return 0;
                switch (d.xhr && d.xhr.status || (t *= .95), d.status()) {
                    case"success":
                    case"error":
                        return 1 * t;
                    case"pending":
                        return 0 * t;
                    default:
                        return d.loaded / (d.endByte - d.startByte) * t
                }
            }, this
        }

        return d.uploadNextChunk = function () {
            var t = !1;
            if (d.getOpt("prioritizeFirstAndLastChunk") && (h.each(d.files, function (e) {
                return e.chunks.length && "pending" == e.chunks[0].status() && 0 === e.chunks[0].preprocessState ? (e.chunks[0].send(), !(t = !0)) : 1 < e.chunks.length && "pending" == e.chunks[e.chunks.length - 1].status() && 0 === e.chunks[e.chunks.length - 1].preprocessState ? (e.chunks[e.chunks.length - 1].send(), !(t = !0)) : void 0
            }), t)) return !0;
            if (h.each(d.files, function (e) {
                if (!1 === e.isPaused() && h.each(e.chunks, function (e) {
                    if ("pending" == e.status() && 0 === e.preprocessState) return e.send(), !(t = !0)
                }), t) return !1
            }), t) return !0;
            var r = !1;
            return h.each(d.files, function (e) {
                if (!e.isComplete()) return !(r = !0)
            }), r || d.fire("complete"), !1
        }, d.assignBrowse = function (e, i) {
            void 0 === e.length && (e = [e]), h.each(e, function (e) {
                var t;
                "INPUT" === e.tagName && "file" === e.type ? t = e : ((t = document.createElement("input")).setAttribute("type", "file"), t.style.display = "none", e.addEventListener("click", function () {
                    t.style.opacity = 0, t.style.display = "block", t.focus(), t.click(), t.style.display = "none"
                }, !1), e.appendChild(t));
                var r = d.getOpt("maxFiles");
                void 0 === r || 1 != r ? t.setAttribute("multiple", "multiple") : t.removeAttribute("multiple"), i ? t.setAttribute("webkitdirectory", "webkitdirectory") : t.removeAttribute("webkitdirectory");
                var n = d.getOpt("fileType");
                void 0 !== n && 1 <= n.length ? t.setAttribute("accept", n.map(function (e) {
                    return "." + e
                }).join(",")) : t.removeAttribute("accept"), t.addEventListener("change", function (e) {
                    a(e.target.files, e), d.getOpt("clearInput") && (e.target.value = "")
                }, !1)
            })
        }, d.assignDrop = function (e) {
            void 0 === e.length && (e = [e]), h.each(e, function (e) {
                e.addEventListener("dragover", r, !1), e.addEventListener("dragenter", r, !1), e.addEventListener("drop", t, !1)
            })
        }, d.unAssignDrop = function (e) {
            void 0 === e.length && (e = [e]), h.each(e, function (e) {
                e.removeEventListener("dragover", r), e.removeEventListener("dragenter", r), e.removeEventListener("drop", t)
            })
        }, d.isUploading = function () {
            var t = !1;
            return h.each(d.files, function (e) {
                if (e.isUploading()) return !(t = !0)
            }), t
        }, d.upload = function () {
            if (!d.isUploading()) {
                d.fire("uploadStart");
                for (var e = 1; e <= d.getOpt("simultaneousUploads"); e++) d.uploadNextChunk()
            }
        }, d.pause = function () {
            h.each(d.files, function (e) {
                e.abort()
            }), d.fire("pause")
        }, d.cancel = function () {
            d.fire("beforeCancel");
            for (var e = d.files.length - 1; 0 <= e; e--) d.files[e].cancel();
            d.fire("cancel")
        }, d.progress = function () {
            var t = 0, r = 0;
            return h.each(d.files, function (e) {
                t += e.progress() * e.size, r += e.size
            }), 0 < r ? t / r : 0
        }, d.addFile = function (e, t) {
            a([e], t)
        }, d.addFiles = function (e, t) {
            a(e, t)
        }, d.removeFile = function (e) {
            for (var t = d.files.length - 1; 0 <= t; t--) d.files[t] === e && d.files.splice(t, 1)
        }, d.getFromUniqueIdentifier = function (t) {
            var r = !1;
            return h.each(d.files, function (e) {
                e.uniqueIdentifier == t && (r = e)
            }), r
        }, d.getSize = function () {
            var t = 0;
            return h.each(d.files, function (e) {
                t += e.size
            }), t
        }, d.handleDropEvent = function (e) {
            t(e)
        }, d.handleChangeEvent = function (e) {
            a(e.target.files, e), e.target.value = ""
        }, d.updateQuery = function (e) {
            d.opts.query = e
        }, this
    };
    "undefined" != typeof module ? module.exports = i : "function" == typeof define && define.amd ? define(function () {
        return i
    }) : window.Resumable = i
}();
//# sourceMappingURL=/sm/5982a1a3bd2a35231f6480eeeb712cd272b33282d41bdc35bedac0fbbc22c341.map
