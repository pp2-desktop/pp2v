(function(d) {
    d.html5 = {};
    d.html5.version = "6.11.4923";
    d = d.utils.css;
    var k = " div span a img ul li video".split(" ").join(", .jwplayer ");
    d(".jwplayer ".slice(0, -1) + k + ", .jwclick", {
        margin: 0,
        padding: 0,
        border: 0,
        color: "#000000",
        "font-size": "100%",
        font: "inherit",
        "vertical-align": "baseline",
        "background-color": "transparent",
        "text-align": "left",
        direction: "ltr",
        "line-height": 20,
        "-webkit-tap-highlight-color": "rgba(255, 255, 255, 0)"
    });
    d(".jwplayer ul", {
        "list-style": "none"
    });
    d(".jwplayer .jwcontrols", {
        "pointer-events": "none"
    });
    d(".jwplayer.jw-user-inactive .jwcontrols", {
        "pointer-events": "all"
    });
    d(".jwplayer .jwcontrols .jwdockbuttons, .jwplayer .jwcontrols .jwcontrolbar, .jwplayer .jwcontrols .jwskip, .jwplayer .jwcontrols .jwdisplayIcon, .jwplayer .jwcontrols .jwpreview, .jwplayer .jwcontrols .jwlogo", {
        "pointer-events": "all"
    })
})(jwplayer);
(function(d) {
    var k = document;
    d.parseDimension = function(a) {
        return "string" == typeof a ? "" === a ? 0 : -1 < a.lastIndexOf("%") ? a : parseInt(a.replace("px", ""), 10) : a
    };
    d.timeFormat = function(a) {
        if (0 < a) {
            var c = Math.floor(a / 3600),
                e = Math.floor((a - 3600 * c) / 60);
            a = Math.floor(a % 60);
            return (c ? c + ":" : "") + (10 > e ? "0" : "") + e + ":" + (10 > a ? "0" : "") + a
        }
        return "00:00"
    };
    d.bounds = function(a) {
        var c = {
            left: 0,
            right: 0,
            width: 0,
            height: 0,
            top: 0,
            bottom: 0
        };
        if (!a || !k.body.contains(a)) return c;
        if (a.getBoundingClientRect) {
            a = a.getBoundingClientRect(a);
            var e = window.pageYOffset,
                f = window.pageXOffset;
            if (!a.width && !a.height && !a.left && !a.top) return c;
            c.left = a.left + f;
            c.right = a.right + f;
            c.top = a.top + e;
            c.bottom = a.bottom + e;
            c.width = a.right - a.left;
            c.height = a.bottom - a.top
        } else {
            c.width = a.offsetWidth | 0;
            c.height = a.offsetHeight | 0;
            do c.left += a.offsetLeft | 0, c.top += a.offsetTop | 0; while (a = a.offsetParent);
            c.right = c.left + c.width;
            c.bottom = c.top + c.height
        }
        return c
    };
    d.empty = function(a) {
        if (a)
            for (; 0 < a.childElementCount;) a.removeChild(a.children[0])
    }
})(jwplayer.utils);
(function(d) {
    var k = d.stretching = {
        NONE: "none",
        FILL: "fill",
        UNIFORM: "uniform",
        EXACTFIT: "exactfit"
    };
    d.scale = function(a, c, e, f, g) {
        var h = "";
        c = c || 1;
        e = e || 1;
        f |= 0;
        g |= 0;
        if (1 !== c || 1 !== e) h = "scale(" + c + ", " + e + ")";
        if (f || g) h = "translate(" + f + "px, " + g + "px)";
        d.transform(a, h)
    };
    d.stretch = function(a, c, e, f, g, h) {
        if (!c || !e || !f || !g || !h) return !1;
        a = a || k.UNIFORM;
        var b = 2 * Math.ceil(e / 2) / g,
            p = 2 * Math.ceil(f / 2) / h,
            j = "video" === c.tagName.toLowerCase(),
            l = !1,
            r = "jw" + a.toLowerCase();
        switch (a.toLowerCase()) {
            case k.FILL:
                b > p ? p = b : b = p;
                l = !0;
                break;
            case k.NONE:
                b = p = 1;
            case k.EXACTFIT:
                l = !0;
                break;
            default:
                b > p ? 0.95 < g * p / e ? (l = !0, r = "jwexactfit") : (g *= p, h *= p) : 0.95 < h * b / f ? (l = !0, r = "jwexactfit") : (g *= b, h *= b), l && (b = 2 * Math.ceil(e / 2) / g, p = 2 * Math.ceil(f / 2) / h)
        }
        j ? (a = {
            left: "",
            right: "",
            width: "",
            height: ""
        }, l ? (e < g && (a.left = a.right = Math.ceil((e - g) / 2)), f < h && (a.top = a.bottom = Math.ceil((f - h) / 2)), a.width = g, a.height = h, d.scale(c, b, p, 0, 0)) : (l = !1, d.transform(c)), d.css.style(c, a)) : c.className = c.className.replace(/\s*jw(none|exactfit|uniform|fill)/g, "") + " " + r;
        return l
    }
})(jwplayer.utils);
(function(d) {
    d.dfxp = function() {
        var k = jwplayer.utils.seconds;
        this.parse = function(a) {
            var c = [{
                begin: 0,
                text: ""
            }];
            a = a.replace(/^\s+/, "").replace(/\s+$/, "");
            var e = a.split("\x3c/p\x3e"),
                f = a.split("\x3c/tt:p\x3e"),
                g = [];
            for (a = 0; a < e.length; a++) 0 <= e[a].indexOf("\x3cp") && (e[a] = e[a].substr(e[a].indexOf("\x3cp") + 2).replace(/^\s+/, "").replace(/\s+$/, ""), g.push(e[a]));
            for (a = 0; a < f.length; a++) 0 <= f[a].indexOf("\x3ctt:p") && (f[a] = f[a].substr(f[a].indexOf("\x3ctt:p") + 5).replace(/^\s+/, "").replace(/\s+$/, ""), g.push(f[a]));
            e = g;
            for (a = 0; a < e.length; a++) {
                f = e[a];
                g = {};
                try {
                    var h = f.indexOf('begin\x3d"'),
                        f = f.substr(h + 7),
                        h = f.indexOf('" end\x3d"');
                    g.begin = k(f.substr(0, h));
                    f = f.substr(h + 7);
                    h = f.indexOf('"');
                    g.end = k(f.substr(0, h));
                    h = f.indexOf('"\x3e');
                    f = f.substr(h + 2);
                    g.text = f
                } catch (b) {}
                f = g;
                f.text && (c.push(f), f.end && (c.push({
                    begin: f.end,
                    text: ""
                }), delete f.end))
            }
            if (1 < c.length) return c;
            throw {
                message: "Invalid DFXP file:"
            };
        }
    }
})(jwplayer.parsers);
(function(d) {
    d.srt = function() {
        var k = jwplayer.utils,
            a = k.seconds;
        this.parse = function(c, e) {
            var f = e ? [] : [{
                begin: 0,
                text: ""
            }];
            c = k.trim(c);
            var g = c.split("\r\n\r\n");
            1 == g.length && (g = c.split("\n\n"));
            for (var h = 0; h < g.length; h++)
                if ("WEBVTT" != g[h]) {
                    var b, d = g[h];
                    b = {};
                    var j = d.split("\r\n");
                    1 == j.length && (j = d.split("\n"));
                    try {
                        d = 1;
                        0 < j[0].indexOf(" --\x3e ") && (d = 0);
                        var l = j[d].indexOf(" --\x3e ");
                        0 < l && (b.begin = a(j[d].substr(0, l)), b.end = a(j[d].substr(l + 5)));
                        if (j[d + 1]) {
                            b.text = j[d + 1];
                            for (d += 2; d < j.length; d++) b.text += "\x3cbr/\x3e" +
                                j[d]
                        }
                    } catch (r) {}
                    b.text && (f.push(b), b.end && !e && (f.push({
                        begin: b.end,
                        text: ""
                    }), delete b.end))
                }
            if (1 < f.length) return f;
            throw {
                message: "Invalid SRT file"
            };
        }
    }
})(jwplayer.parsers);
(function(d) {
    var k = d.utils.noop,
        a = d.events,
        c = d._.constant(!1);
    d.html5.DefaultProvider = {
        supports: c,
        play: k,
        load: k,
        stop: k,
        volume: k,
        mute: k,
        seek: k,
        seekDrag: k,
        resize: k,
        remove: k,
        destroy: k,
        setVisibility: k,
        setFullscreen: c,
        getFullscreen: k,
        setContainer: c,
        getContainer: k,
        isAudioFile: c,
        supportsFullscreen: c,
        getQualityLevels: k,
        getCurrentQuality: k,
        setCurrentQuality: k,
        getAudioTracks: k,
        getCurrentAudioTrack: k,
        setCurrentAudioTrack: k,
        checkComplete: k,
        setControls: k,
        attachMedia: k,
        detachMedia: k,
        setState: function(c) {
            if (c !==
                this.state) {
                var f = this.state || a.state.IDLE;
                this.state = c;
                this.sendEvent(a.JWPLAYER_PLAYER_STATE, {
                    oldstate: f,
                    newstate: c
                })
            }
        }
    }
})(jwplayer);
(function(d) {
    d.html5.chooseProvider = function(k) {
        return d._.isObject(k) && d.html5.YoutubeProvider.supports(k) ? d.html5.YoutubeProvider : d.html5.VideoProvider
    }
})(jwplayer);
(function(d) {
    function k(k) {
        function s() {}

        function y(a) {
            z(a);
            Z && (n.state === f.PLAYING && !T) && (G = Math.floor(10 * H.currentTime) / 10, O = !0, n.sendEvent(e.JWPLAYER_MEDIA_TIME, {
                position: G,
                duration: I
            }))
        }

        function m() {
            n.sendEvent(e.JWPLAYER_MEDIA_META, {
                duration: H.duration,
                height: H.videoHeight,
                width: H.videoWidth
            })
        }

        function B(a) {
            Z && (O || (O = !0, u()), "loadedmetadata" === a.type && (H.muted && (H.muted = !1, H.muted = !0), m()))
        }

        function z() {
            O && (0 < Q && !l) && (b ? setTimeout(function() {
                0 < Q && n.seek(Q)
            }, 200) : n.seek(Q))
        }

        function u() {
            R || (R = !0, n.sendEvent(e.JWPLAYER_MEDIA_BUFFER_FULL))
        }

        function q(b) {
            Z && !T && (H.paused ? H.currentTime === H.duration && 3 < H.duration || n.pause() : (!a.isFF() || !("play" === b.type && n.state === f.BUFFERING)) && n.setState(f.PLAYING))
        }

        function w() {
            Z && (T || n.setState(f.BUFFERING))
        }

        function v(b) {
            var n;
            if ("array" === a.typeOf(b) && 0 < b.length) {
                n = [];
                for (var c = 0; c < b.length; c++) {
                    var f = b[c],
                        e = {};
                    e.label = f.label && f.label ? f.label ? f.label : 0 : c;
                    n[c] = e
                }
            }
            return n
        }

        function C(b, c) {
            M = ca[ha];
            n.setState(f.BUFFERING);
            g(U);
            U = setInterval(F, 100);
            Q = 0;
            H.src !== M.file || p || j ? (R = O = !1, I = c ? c : -1, H.src = M.file, H.load()) : (0 === b && (Q = -1, n.seek(b)), m(), H.play());
            G = H.currentTime;
            p && u();
            a.isIOS() && n.getFullScreen() && (H.controls = !0);
            0 < b && n.seek(b)
        }

        function F() {
            if (Z) {
                var a;
                a = H.buffered;
                a = !a || !H.duration || 0 === a.length ? 0 : a.end(a.length - 1) / H.duration;
                1 <= a && g(U);
                a !== aa && (aa = a, n.sendEvent(e.JWPLAYER_MEDIA_BUFFER, {
                    bufferPercent: Math.round(100 * aa)
                }))
            }
        }

        function x(a) {
            n.sendEvent("fullscreenchange", {
                target: a.target,
                jwstate: Da
            })
        }
        this.state = f.IDLE;
        var K = new d.events.eventdispatcher("provider." +
            this.name);
        a.extend(this, K);
        var n = this,
            L = {
                abort: s,
                canplay: B,
                canplaythrough: s,
                click: function() {
                    n.sendEvent(e.JWPLAYER_PROVIDER_CLICK)
                },
                durationchange: function() {
                    if (Z) {
                        var a = Math.floor(10 * H.duration) / 10;
                        I !== a && (I = a);
                        l && (0 < Q && a > Q) && n.seek(Q);
                        y()
                    }
                },
                emptied: s,
                ended: function() {
                    Z && n.state !== f.IDLE && (g(U), ha = -1, oa = !0, n.sendEvent(e.JWPLAYER_MEDIA_BEFORECOMPLETE), Z && (n.setState(f.IDLE), oa = !1, n.sendEvent(e.JWPLAYER_MEDIA_COMPLETE)))
                },
                error: function() {
                    Z && (a.log("Error playing media: %o", H.error), n.sendEvent(e.JWPLAYER_MEDIA_ERROR, {
                        message: "Error loading media: File could not be played"
                    }), n.setState(f.IDLE))
                },
                loadeddata: s,
                loadedmetadata: B,
                loadstart: s,
                pause: q,
                play: q,
                playing: q,
                progress: z,
                ratechange: s,
                readystatechange: s,
                seeked: function() {
                    !T && n.state !== f.PAUSED && n.setState(f.PLAYING)
                },
                seeking: b ? w : s,
                stalled: s,
                suspend: s,
                timeupdate: y,
                volumechange: function() {
                    n.sendEvent(e.JWPLAYER_MEDIA_VOLUME, {
                        volume: Math.round(100 * H.volume)
                    });
                    n.sendEvent(e.JWPLAYER_MEDIA_MUTE, {
                        mute: H.muted
                    })
                },
                waiting: w,
                webkitbeginfullscreen: function(b) {
                    Da = !0;
                    x(b);
                    a.isIOS() && (H.controls = !1)
                },
                webkitendfullscreen: function(b) {
                    Da = !1;
                    x(b);
                    a.isIOS() && (H.controls = !1)
                }
            },
            J, M, I, G, O = !1,
            R, Q = 0,
            T = !1,
            D, U = -1,
            aa = -1,
            Z = !1,
            ca, ha = -1,
            oa = !1,
            Da = !1;
        this.sendEvent = function() {
            Z && K.sendEvent.apply(this, arguments)
        };
        var H = document.getElementById(k).querySelector("video"),
            Fa = H = H || document.createElement("video");
        a.foreach(L, function(a, b) {
            Fa.addEventListener(a, b, !1)
        });
        r || (H.controls = !0, H.controls = !1);
        H.setAttribute("x-webkit-airplay", "allow");
        H.setAttribute("webkit-playsinline", "");
        Z = !0;
        this.stop =
            function() {
                Z && (g(U), H.removeAttribute("src"), b || H.load(), ha = -1, this.setState(f.IDLE))
            };
        this.destroy = function() {
            var b = H;
            a.foreach(L, function(a, n) {
                b.removeEventListener(a, n, !1)
            });
            this.remove()
        };
        this.load = function(b) {
            if (Z) {
                ca = b.sources;
                0 > ha && (ha = 0);
                if (ca)
                    for (var c = a.getCookies().qualityLabel, f = 0; f < ca.length; f++)
                        if (ca[f]["default"] && (ha = f), c && ca[f].label === c) {
                            ha = f;
                            break
                        }(c = v(ca)) && n.sendEvent(e.JWPLAYER_MEDIA_LEVELS, {
                    levels: c,
                    currentQuality: ha
                });
                C(b.starttime || 0, b.duration)
            }
        };
        this.play = function() {
            Z &&
                !T && H.play()
        };
        this.pause = function() {
            Z && (H.pause(), this.setState(f.PAUSED))
        };
        this.seekDrag = function(a) {
            Z && ((T = a) ? H.pause() : H.play())
        };
        this.seek = function(a) {
            if (Z)
                if (!T && 0 === Q && this.sendEvent(e.JWPLAYER_MEDIA_SEEK, {
                        position: G,
                        offset: a
                    }), O) {
                    Q = 0;
                    try {
                        H.currentTime = a
                    } catch (b) {
                        Q = a
                    }
                } else Q = a
        };
        this.volume = function(b) {
            a.exists(b) && (H.volume = Math.min(Math.max(0, b / 100), 1), D = 100 * H.volume)
        };
        this.mute = function(b) {
            a.exists(b) || (b = !H.muted);
            b ? (D = 100 * H.volume, H.muted = !0) : (this.volume(D), H.muted = !1)
        };
        this.setState = function(a) {
            a ===
                f.PAUSED && this.state === f.IDLE || T || h.setState.apply(this, arguments)
        };
        this.checkComplete = function() {
            return oa
        };
        this.detachMedia = function() {
            g(U);
            Z = !1;
            return H
        };
        this.attachMedia = function(a) {
            Z = !0;
            a || (O = !1);
            oa && (this.setState(f.IDLE), this.sendEvent(e.JWPLAYER_MEDIA_COMPLETE), oa = !1)
        };
        this.setContainer = function(a) {
            J = a;
            a.appendChild(H)
        };
        this.getContainer = function() {
            return J
        };
        this.remove = function() {
            H && (H.removeAttribute("src"), b || H.load());
            g(U);
            ha = -1;
            J === H.parentNode && J.removeChild(H)
        };
        this.setVisibility = function(b) {
            b ||
                l ? a.css.style(J, {
                    visibility: "visible",
                    opacity: 1
                }) : a.css.style(J, {
                    visibility: "",
                    opacity: 0
                })
        };
        this.resize = function(b, n, c) {
            return a.stretch(c, H, b, n, H.videoWidth, H.videoHeight)
        };
        this.setControls = function(a) {
            H.controls = !!a
        };
        this.supportsFullscreen = c.constant(!0);
        this.setFullScreen = function(a) {
            if (a = !!a) {
                try {
                    var b = H.webkitEnterFullscreen || H.webkitEnterFullScreen;
                    b && b.apply(H)
                } catch (c) {
                    return !1
                }
                return n.getFullScreen()
            }(b = H.webkitExitFullscreen || H.webkitExitFullScreen) && b.apply(H);
            return a
        };
        n.getFullScreen =
            function() {
                return Da || !!H.webkitDisplayingFullscreen
            };
        this.isAudioFile = function() {
            if (!ca) return !1;
            var a = ca[0].type;
            return "oga" === a || "aac" === a || "mp3" === a || "vorbis" === a
        };
        this.setCurrentQuality = function(b) {
            if (ha !== b && (b = parseInt(b, 10), 0 <= b && ca && ca.length > b)) {
                ha = b;
                a.saveCookie("qualityLabel", ca[b].label);
                this.sendEvent(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                    currentQuality: b,
                    levels: v(ca)
                });
                b = Math.floor(10 * H.currentTime) / 10;
                var n = Math.floor(10 * H.duration) / 10;
                0 >= n && (n = I);
                C(b, n)
            }
        };
        this.getCurrentQuality = function() {
            return ha
        };
        this.getQualityLevels = function() {
            return v(ca)
        }
    }
    var a = d.utils,
        c = d._,
        e = d.events,
        f = e.state,
        g = window.clearInterval,
        h = d.html5.DefaultProvider,
        b = a.isMSIE(),
        p = a.isMobile(),
        j = a.isSafari(),
        l = a.isAndroidNative(),
        r = a.isIOS(7),
        s = function() {};
    s.prototype = h;
    k.prototype = new s;
    k.supports = c.constant(!0);
    d.html5.VideoProvider = k
})(jwplayer);
(function(d) {
    function k(j) {
        function k() {
            window.YT && window.YT.loaded ? (K = window.YT, s()) : setTimeout(k, 100)
        }

        function p() {
            h = null
        }

        function s() {
            var a;
            if (a = K) a = L && L.parentNode, a || (I || (d(j).onReady(s), I = !0), a = !1);
            a && G && G.apply(x)
        }

        function t() {
            if (n && n.getPlayerState) {
                var a = n.getPlayerState();
                null !== a && (void 0 !== a && a !== Q) && z({
                    data: a
                });
                var b = K.PlayerState;
                a === b.PLAYING ? (y(), x.sendEvent(e.JWPLAYER_MEDIA_TIME, {
                    position: A(n.getCurrentTime()),
                    duration: n.getDuration()
                })) : a === b.BUFFERING && y()
            }
        }

        function A(a) {
            return Math.round(10 *
                a) / 10
        }

        function y() {
            var a = 0;
            n && n.getVideoLoadedFraction && (a = Math.round(100 * n.getVideoLoadedFraction()));
            M !== a && (M = a, x.sendEvent(e.JWPLAYER_MEDIA_BUFFER, {
                bufferPercent: a
            }))
        }

        function m() {
            x.sendEvent(e.JWPLAYER_MEDIA_META, {
                duration: n.getDuration(),
                width: L.clientWidth,
                height: L.clientHeight
            })
        }

        function B() {
            O && (O.apply(x), O = null)
        }

        function z(a) {
            var b = K.PlayerState;
            Q = a.data;
            switch (Q) {
                case b.ENDED:
                    x.state !== f.IDLE && (D = !0, x.sendEvent(e.JWPLAYER_MEDIA_BEFORECOMPLETE), x.setState(f.IDLE), D = !1, x.sendEvent(e.JWPLAYER_MEDIA_COMPLETE));
                    break;
                case b.PLAYING:
                    U = !1;
                    m();
                    x.sendEvent(e.JWPLAYER_MEDIA_LEVELS, {
                        levels: x.getQualityLevels(),
                        currentQuality: x.getCurrentQuality()
                    });
                    x.setState(f.PLAYING);
                    break;
                case b.PAUSED:
                    x.setState(f.PAUSED);
                    break;
                case b.BUFFERING:
                    x.setState(f.BUFFERING);
                    break;
                case b.CUED:
                    x.setState(f.IDLE)
            }
        }

        function u() {
            x.play();
            x.sendEvent(e.JWPLAYER_MEDIA_LEVEL_CHANGED, {
                currentQuality: x.getCurrentQuality(),
                levels: x.getQualityLevels()
            })
        }

        function q() {
            x.sendEvent(e.JWPLAYER_MEDIA_ERROR, {
                message: "Error loading YouTube: Video could not be played"
            })
        }

        function w() {
            b && (x.setVisibility(!0), a.css("#" + j + " .jwcontrols", {
                display: "none"
            }))
        }

        function v() {
            clearInterval(R);
            if (n && n.stopVideo) try {
                n.stopVideo(), n.clearVideo()
            } catch (a) {}
        }

        function C(b) {
            O = null;
            var c = a.youTubeID(b.sources[0].file);
            b.image || (b.image = "http://i.ytimg.com/vi/" + c + "/0.jpg");
            x.setVisibility(!0);
            if (!K || !n) G = function() {
                if (!c) throw "invalid Youtube ID";
                if (L.parentNode) {
                    var b = {
                        height: "100%",
                        width: "100%",
                        videoId: c,
                        playerVars: a.extend({
                            autoplay: 0,
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                            modestbranding: 0,
                            playsinline: 1,
                            origin: location.protocol + "//" + location.hostname
                        }, void 0),
                        events: {
                            onReady: B,
                            onStateChange: z,
                            onPlaybackQualityChange: u,
                            onError: q
                        }
                    };
                    x.setVisibility(!0);
                    n = new K.Player(L, b);
                    L = n.getIframe();
                    G = null;
                    w();
                    F()
                }
            }, s();
            else if (n.getPlayerState)
                if (n.getVideoData().video_id !== c) {
                    U ? (v(), n.cueVideoById(c)) : n.loadVideoById(c);
                    var f = n.getPlayerState(),
                        e = K.PlayerState;
                    (f === e.UNSTARTED || f === e.CUED) && w()
                } else 0 < n.getCurrentTime() && n.seekTo(0), m();
            else O = function() {
                F();
                x.load(b)
            }
        }

        function F() {
            n && n.getVolume &&
                (x.sendEvent(e.JWPLAYER_MEDIA_VOLUME, {
                    volume: Math.round(n.getVolume())
                }), x.sendEvent(e.JWPLAYER_MEDIA_MUTE, {
                    mute: n.isMuted()
                }))
        }
        this.state = f.IDLE;
        var x = a.extend(this, new d.events.eventdispatcher("provider." + this.name)),
            K = window.YT,
            n = null,
            L = document.createElement("div"),
            J, M = -1,
            I = !1,
            G = null,
            O = null,
            R = -1,
            Q = -1,
            T, D = !1,
            U = b;
        this.setState = function(b) {
            clearInterval(R);
            b !== f.IDLE && (R = setInterval(t, 250), b === f.PLAYING ? a.css("#" + j + " .jwcontrols", {
                display: ""
            }) : b === f.BUFFERING && y());
            g.setState.apply(this, arguments)
        };
        !K && h && (h.addEventListener(e.COMPLETE, k), h.addEventListener(e.ERROR, p), h.load());
        L.id = j + "_youtube";
        this.init = function(a) {
            C(a)
        };
        this.destroy = function() {
            this.remove();
            J = L = K = x = null
        };
        this.load = function(a) {
            this.setState(f.BUFFERING);
            C(a);
            x.play()
        };
        this.stop = function() {
            v();
            this.setState(f.IDLE)
        };
        this.play = function() {
            U || n.playVideo && n.playVideo()
        };
        this.pause = function() {
            U || n.pauseVideo && n.pauseVideo()
        };
        this.seek = function(a) {
            U || n.seekTo && n.seekTo(a)
        };
        this.volume = function(b) {
            n && n.getVolume && a.exists(b) && (T =
                Math.min(Math.max(0, b), 100), n.setVolume(T))
        };
        this.mute = function(b) {
            n && n.getVolume && (a.exists(b) || (b = !n.isMuted()), b ? (T = n.getVolume(), n.mute()) : (this.volume(T), n.unMute()))
        };
        this.detachMedia = function() {
            return document.createElement("video")
        };
        this.attachMedia = function() {
            D && (this.setState(f.IDLE), this.sendEvent(e.JWPLAYER_MEDIA_COMPLETE), D = !1)
        };
        this.setContainer = function(a) {
            J = a;
            a.appendChild(L);
            this.setVisibility(!0)
        };
        this.getContainer = function() {
            return J
        };
        this.supportsFullscreen = function() {
            return !(!J ||
                !J.requestFullscreen && !J.requestFullScreen && !J.webkitRequestFullscreen && !J.webkitRequestFullScreen && !J.webkitEnterFullscreen && !J.webkitEnterFullScreen && !J.mozRequestFullScreen && !J.msRequestFullscreen)
        };
        this.remove = function() {
            v();
            L && (J && J === L.parentNode) && J.removeChild(L);
            G = O = n = null
        };
        this.setVisibility = function(c) {
            c ? (a.css.style(L, {
                display: "block"
            }), a.css.style(J, {
                visibility: "visible",
                opacity: 1
            })) : b || a.css.style(J, {
                opacity: 0
            })
        };
        this.resize = function(b, c, n) {
            return a.stretch(n, L, b, c, L.clientWidth, L.clientHeight)
        };
        this.checkComplete = function() {
            return D
        };
        this.getCurrentQuality = function() {
            if (n) {
                if (n.getAvailableQualityLevels) {
                    var a = n.getPlaybackQuality();
                    return n.getAvailableQualityLevels().indexOf(a)
                }
                return -1
            }
        };
        this.getQualityLevels = function() {
            if (n) {
                if (!c.isFunction(n.getAvailableQualityLevels)) return [];
                var a = n.getAvailableQualityLevels();
                return 2 === a.length && c.contains(a, "auto") ? {
                    label: c.without(a, "auto")
                } : c.map(a, function(a) {
                    return {
                        label: a
                    }
                }).reverse()
            }
        };
        this.setCurrentQuality = function(a) {
            if (n && n.getAvailableQualityLevels) {
                var b =
                    n.getAvailableQualityLevels();
                b.length && n.setPlaybackQuality(b[b.length - a - 1])
            }
        }
    }
    var a = d.utils,
        c = d._,
        e = d.events,
        f = e.state,
        g = d.html5.DefaultProvider,
        h = new a.scriptloader(window.location.protocol + "//www.youtube.com/iframe_api"),
        b = a.isMobile();
    window.onYouTubeIframeAPIReady = function() {
        h = null
    };
    var p = function() {};
    p.prototype = g;
    k.prototype = new p;
    k.supports = function(b) {
        return a.isYouTube(b.file, b.type)
    };
    d.html5.YoutubeProvider = k
})(jwplayer);
(function(d) {
    var k = d.utils,
        a = k.css,
        c = d.events,
        e = 80,
        f = 30;
    d.html5.adskipbutton = function(g, h, b, d) {
        function j(a) {
            0 > z || (a = b.replace(/xx/gi, Math.ceil(z - a)), s(a))
        }

        function l(a, b) {
            if ("number" === k.typeOf(w)) z = w;
            else if ("%" === w.slice(-1)) {
                var c = parseFloat(w.slice(0, -1));
                b && !isNaN(c) && (z = b * c / 100)
            } else "string" === k.typeOf(w) ? z = k.seconds(w) : isNaN(w) || (z = w)
        }

        function r() {
            u && x.sendEvent(c.JWPLAYER_AD_SKIPPED)
        }

        function s(a) {
            a = a || d;
            var b = B.getContext("2d");
            b.clearRect(0, 0, e, f);
            A(b, 0, 0, e, f, 5, !0, !1, !1);
            A(b, 0, 0, e, f, 5, !1, !0, !1);
            b.fillStyle = "#979797";
            b.globalAlpha = 1;
            var c = B.height / 2,
                g = B.width / 2;
            b.textAlign = "center";
            b.font = "Bold 12px Sans-Serif";
            a === d && (g -= v.width, b.drawImage(v, B.width - (B.width - b.measureText(d).width) / 2 - 4, (f - v.height) / 2));
            b.fillText(a, g, c + 4)
        }

        function t(a) {
            a = a || d;
            var b = B.getContext("2d");
            b.clearRect(0, 0, e, f);
            A(b, 0, 0, e, f, 5, !0, !1, !0);
            A(b, 0, 0, e, f, 5, !1, !0, !0);
            b.fillStyle = "#FFFFFF";
            b.globalAlpha = 1;
            var c = B.height / 2,
                g = B.width / 2;
            b.textAlign = "center";
            b.font = "Bold 12px Sans-Serif";
            a === d && (g -= v.width, b.drawImage(C,
                B.width - (B.width - b.measureText(d).width) / 2 - 4, (f - v.height) / 2));
            b.fillText(a, g, c + 4)
        }

        function A(a, b, c, f, e, g, j, m, h) {
            "undefined" === typeof m && (m = !0);
            "undefined" === typeof g && (g = 5);
            a.beginPath();
            a.moveTo(b + g, c);
            a.lineTo(b + f - g, c);
            a.quadraticCurveTo(b + f, c, b + f, c + g);
            a.lineTo(b + f, c + e - g);
            a.quadraticCurveTo(b + f, c + e, b + f - g, c + e);
            a.lineTo(b + g, c + e);
            a.quadraticCurveTo(b, c + e, b, c + e - g);
            a.lineTo(b, c + g);
            a.quadraticCurveTo(b, c, b + g, c);
            a.closePath();
            m && (a.strokeStyle = "white", a.globalAlpha = h ? 1 : 0.25, a.stroke());
            j && (a.fillStyle =
                "#000000", a.globalAlpha = 0.5, a.fill())
        }

        function y(a, b) {
            var c = document.createElement(a);
            b && (c.className = b);
            return c
        }
        var m, B, z = -1,
            u = !1,
            q, w = 0,
            v, C, F = !1,
            x = k.extend(this, new c.eventdispatcher);
        x.updateSkipTime = function(b, c) {
            l(b, c);
            0 <= z && (a.style(m, {
                visibility: q ? "visible" : "hidden"
            }), 0 < z - b ? (j(b), u && (u = !1, m.style.cursor = "default")) : u || (u || (u = !0, m.style.cursor = "pointer"), F ? t() : s()))
        };
        this.reset = function(a) {
            u = !1;
            w = a;
            l(0, 0);
            j(0)
        };
        x.show = function() {
            q = !0;
            0 < z && a.style(m, {
                visibility: "visible"
            })
        };
        x.hide = function() {
            q = !1;
            a.style(m, {
                visibility: "hidden"
            })
        };
        this.element = function() {
            return m
        };
        v = new Image;
        v.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkE0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRjk0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAZXX0AAABYSURBVHjafI2BCcAwCAQ/kr3ScRwjW+g2SSezCi0kYHpwKLy8JCLDbWaGTM+MAFzuVNXhNiTQsh+PS9QhZ7o9JuFMeUVNwjsamDma4K+3oy1cqX/hxyPAAAQwNKV27g9PAAAAAElFTkSuQmCC";
        v.className = "jwskipimage jwskipout";
        C = new Image;
        C.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAICAYAAAArzdW1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ODkzMWI3Ny04YjE5LTQzYzMtOGM2Ni0wYzdkODNmZTllNDYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDI0OTcxRkU0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDI0OTcxRkQ0OEM2MTFFM0I4MTREM0ZBQTFCNDE3NTgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDA5ZGQxNDktNzdkMi00M2E3LWJjYWYtOTRjZmM2MWNkZDI0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4OTMxYjc3LThiMTktNDNjMy04YzY2LTBjN2Q4M2ZlOWU0NiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvgIj/QAAABYSURBVHjadI6BCcAgDAS/0jmyih2tm2lHSRZJX6hQQ3w4FP49LKraSHV3ZLDzAuAi3cwaqUhSfvft+EweznHneUdTzPGRmp5hEJFhAo3LaCnjn7blzCvAAH9YOSCL5RZKAAAAAElFTkSuQmCC";
        C.className = "jwskipimage jwskipover";
        m = y("div", "jwskip");
        m.id = g + "_skipcontainer";
        B = y("canvas");
        m.appendChild(B);
        x.width = B.width = e;
        x.height = B.height = f;
        m.appendChild(C);
        m.appendChild(v);
        a.style(m, {
            visibility: "hidden",
            bottom: h
        });
        m.addEventListener("mouseover", function() {
            F = !0;
            u && t()
        });
        m.addEventListener("mouseout", function() {
            F = !1;
            u && s()
        });
        k.isMobile() ? (new k.touch(m)).addEventListener(k.touchEvents.TAP, r) : m.addEventListener("click", r)
    };
    a(".jwskip", {
        position: "absolute",
        "float": "right",
        display: "inline-block",
        width: e,
        height: f,
        right: 10
    });
    a(".jwskipimage", {
        position: "relative",
        display: "none"
    })
})(window.jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = d.events,
        e = c.state,
        f = d.parsers,
        g = a.css,
        h = a.isAndroid(4, !0),
        b = "playing";
    k.captions = function(g, j) {
        function k(b) {
            a.log("CAPTIONS(" + b + ")")
        }

        function r(a) {
            (I = a.fullscreen) ? (s(), setTimeout(s, 500)) : m(!0)
        }

        function s() {
            var a = w.offsetHeight,
                b = w.offsetWidth;
            0 !== a && 0 !== b && F.resize(b, Math.round(0.94 * a))
        }

        function t(b, c) {
            a.ajax(b, function(a) {
                var b = a.responseXML ? a.responseXML.firstChild : null;
                L++;
                if (b) {
                    "xml" === f.localName(b) && (b = b.nextSibling);
                    for (; b.nodeType === b.COMMENT_NODE;) b =
                        b.nextSibling
                }
                b = b && "tt" === f.localName(b) ? new d.parsers.dfxp : new d.parsers.srt;
                try {
                    var g = b.parse(a.responseText);
                    K < n.length && (n[c].data = g);
                    m(!1)
                } catch (e) {
                    k(e.message + ": " + n[c].file)
                }
                L === n.length && (0 < J && (z(J), J = -1), y())
            }, A, !0)
        }

        function A(a) {
            L++;
            k(a);
            L === n.length && (0 < J && (z(J), J = -1), y())
        }

        function y() {
            for (var a = [], b = 0; b < n.length; b++) a.push(n[b]);
            G.sendEvent(c.JWPLAYER_CAPTIONS_LOADED, {
                captionData: a
            })
        }

        function m(a) {
            n.length ? x === b && 0 < M ? (F.show(), I ? r({
                    fullscreen: !0
                }) : (B(), a && setTimeout(B, 500))) : F.hide() :
                F.hide()
        }

        function B() {
            F.resize()
        }

        function z(a) {
            0 < a ? (K = a - 1, M = Math.floor(a), K >= n.length || (n[K].data ? F.populate(n[K].data) : L === n.length ? (k("file not loaded: " + n[K].file), 0 !== M && u(c.JWPLAYER_CAPTIONS_CHANGED, n, 0), M = 0) : J = a, m(!1))) : (M = 0, m(!1))
        }

        function u(a, b, c) {
            G.sendEvent(a, {
                type: a,
                tracks: b,
                track: c
            })
        }

        function q() {
            for (var a = [{
                    label: "Off"
                }], b = 0; b < n.length; b++) a.push({
                label: n[b].label
            });
            return a
        }
        var w, v = {
                back: !0,
                color: "#FFFFFF",
                fontSize: 15,
                fontFamily: "Arial,sans-serif",
                fontOpacity: 100,
                backgroundColor: "#000",
                backgroundOpacity: 100,
                edgeStyle: null,
                windowColor: "#FFFFFF",
                windowOpacity: 0
            },
            C = {
                fontStyle: "normal",
                fontWeight: "normal",
                textDecoration: "none"
            },
            F, x, K, n = [],
            L = 0,
            J = -1,
            M = 0,
            I = !1,
            G = new c.eventdispatcher;
        a.extend(this, G);
        this.element = function() {
            return w
        };
        this.getCaptionsList = function() {
            return q()
        };
        this.getCurrentCaptions = function() {
            return M
        };
        this.setCurrentCaptions = function(b) {
            0 <= b && (M !== b && b <= n.length) && (z(b), b = q(), a.saveCookie("captionLabel", b[M].label), u(c.JWPLAYER_CAPTIONS_CHANGED, b, M))
        };
        w = document.createElement("div");
        w.id = g.id + "_caption";
        w.className = "jwcaptions";
        g.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, function(a) {
            switch (a.newstate) {
                case e.IDLE:
                    x = "idle";
                    m(!1);
                    break;
                case e.PLAYING:
                    x = b, m(!1)
            }
        });
        g.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, function() {
            K = 0;
            n = [];
            F.update(0);
            L = 0;
            for (var b = g.jwGetPlaylist()[g.jwGetPlaylistIndex()].tracks, f = [], e = 0, j = "", d = 0, j = "", e = 0; e < b.length; e++) j = b[e].kind.toLowerCase(), ("captions" === j || "subtitles" === j) && f.push(b[e]);
            M = 0;
            if (!h) {
                for (e = 0; e < f.length; e++)
                    if (j = f[e].file) f[e].label ||
                        (f[e].label = e.toString()), n.push(f[e]), t(n[e].file, e);
                for (e = 0; e < n.length; e++)
                    if (n[e]["default"]) {
                        d = e + 1;
                        break
                    }
                b = a.getCookies();
                if (j = b.captionLabel) {
                    b = q();
                    for (e = 0; e < b.length; e++)
                        if (j === b[e].label) {
                            d = e;
                            break
                        }
                }
                0 < d && z(d);
                m(!1);
                u(c.JWPLAYER_CAPTIONS_LIST, q(), M)
            }
        });
        g.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, k);
        g.jwAddEventListener(c.JWPLAYER_ERROR, k);
        g.jwAddEventListener(c.JWPLAYER_READY, function() {
            a.foreach(v, function(a, b) {
                j && (void 0 !== j[a] ? b = j[a] : void 0 !== j[a.toLowerCase()] && (b = j[a.toLowerCase()]));
                C[a] =
                    b
            });
            F = new d.html5.captions.renderer(C, w);
            m(!1)
        });
        g.jwAddEventListener(c.JWPLAYER_MEDIA_TIME, function(a) {
            F.update(a.position)
        });
        g.jwAddEventListener(c.JWPLAYER_FULLSCREEN, r);
        g.jwAddEventListener(c.JWPLAYER_RESIZE, function() {
            m(!1)
        })
    };
    g(".jwcaptions", {
        position: "absolute",
        cursor: "pointer",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    })
})(jwplayer);
(function(d) {
    var k = d.utils,
        a = k.css.style;
    d.html5.captions.renderer = function(c, e) {
        function f(b) {
            b = b || "";
            A = "hidden";
            a(j, {
                visibility: A
            });
            r.innerHTML = b;
            b.length && (A = "visible", setTimeout(g, 16))
        }

        function g() {
            if ("visible" === A) {
                var b = j.clientWidth,
                    e = Math.pow(b / 400, 0.6),
                    f = c.fontSize * e;
                a(r, {
                    maxWidth: b + "px",
                    fontSize: Math.round(f) + "px",
                    lineHeight: Math.round(1.4 * f) + "px",
                    padding: Math.round(1 * e) + "px " + Math.round(8 * e) + "px"
                });
                c.windowOpacity && a(l, {
                    padding: Math.round(5 * e) + "px",
                    borderRadius: Math.round(5 * e) + "px"
                });
                a(j, {
                    visibility: A
                })
            }
        }

        function d() {
            for (var a = -1, b = 0; b < p.length; b++)
                if (p[b].begin <= t && (b === p.length - 1 || p[b + 1].begin >= t)) {
                    a = b;
                    break
                } - 1 === a ? f("") : a !== s && (s = a, f(p[b].text))
        }

        function b(a, b, c) {
            c = k.hexToRgba("#000000", c);
            "dropshadow" === a ? b.textShadow = "0 2px 1px " + c : "raised" === a ? b.textShadow = "0 0 5px " + c + ", 0 1px 5px " + c + ", 0 2px 5px " + c : "depressed" === a ? b.textShadow = "0 -2px 1px " + c : "uniform" === a && (b.textShadow = "-2px 0 1px " + c + ",2px 0 1px " + c + ",0 -2px 1px " + c + ",0 2px 1px " + c + ",-1px 1px 1px " + c + ",1px 1px 1px " +
                c + ",1px -1px 1px " + c + ",1px 1px 1px " + c)
        }
        var p, j, l, r, s, t, A = "visible",
            y = -1;
        this.hide = function() {
            clearInterval(y);
            a(j, {
                display: "none"
            })
        };
        this.populate = function(a) {
            s = -1;
            p = a;
            d()
        };
        this.resize = function() {
            g()
        };
        this.show = function() {
            a(j, {
                display: "block"
            });
            g();
            clearInterval(y);
            y = setInterval(g, 250)
        };
        this.update = function(a) {
            t = a;
            p && d()
        };
        var m = c.fontOpacity,
            B = c.windowOpacity,
            z = c.edgeStyle,
            u = c.backgroundColor,
            q = {
                display: "inline-block"
            },
            w = {
                color: k.hexToRgba(k.rgbHex(c.color), m),
                display: "inline-block",
                fontFamily: c.fontFamily,
                fontStyle: c.fontStyle,
                fontWeight: c.fontWeight,
                textAlign: "center",
                textDecoration: c.textDecoration,
                wordWrap: "break-word"
            };
        B && (q.backgroundColor = k.hexToRgba(k.rgbHex(c.windowColor), B));
        b(z, w, m);
        c.back ? w.backgroundColor = k.hexToRgba(k.rgbHex(u), c.backgroundOpacity) : null === z && b("uniform", w);
        j = document.createElement("div");
        l = document.createElement("div");
        r = document.createElement("span");
        a(j, {
            display: "block",
            height: "auto",
            position: "absolute",
            bottom: "20px",
            textAlign: "center",
            width: "100%"
        });
        a(l, q);
        a(r, w);
        l.appendChild(r);
        j.appendChild(l);
        e.appendChild(j)
    }
})(jwplayer);
(function(d, k, a) {
    function c(a) {
        return a ? parseInt(a.width, 10) + "px " + parseInt(a.height, 10) + "px" : "0 0"
    }
    var e = d.jwplayer,
        f = e.html5,
        g = e.utils,
        h = e._,
        b = e.events,
        p = b.state,
        j = g.css,
        l = g.transitionStyle,
        r = g.isMobile(),
        s = g.isAndroid(4, !0),
        t = d.top !== d.self,
        A = "button",
        y = "text",
        m = "slider",
        B = {
            display: "none"
        },
        z = {
            display: "block"
        },
        u = {
            display: ""
        };
    f.controlbar = function(q, l) {
        function v(a, b, c) {
            return {
                name: a,
                type: b,
                className: c
            }
        }

        function C(a) {
            j.block($);
            var b = a.duration === Number.POSITIVE_INFINITY,
                c = 0 === a.duration && 0 !== a.position &&
                g.isSafari() && !r;
            b || c ? (V.setText(q.jwGetPlaylist()[q.jwGetPlaylistIndex()].title || "Live broadcast"), D(!1)) : (E.elapsed && (b = g.timeFormat(a.position), E.elapsed.innerHTML = b), E.duration && (b = g.timeFormat(a.duration), E.duration.innerHTML = b), 0 < a.duration ? pa(a.position / a.duration) : pa(0), la = a.duration, ma || V.setText())
        }

        function F() {
            var a = q.jwGetMute();
            Ma = q.jwGetVolume() / 100;
            aa("mute", a || 0 === Ma);
            Ta(a ? 0 : Ma)
        }

        function x() {
            j.style([E.hd, E.cc], B);
            $a();
            ba()
        }

        function K(a) {
            Ga = Math.floor(a.currentQuality);
            E.hd && (E.hd.querySelector("button").className =
                2 === ia.length && 0 === Ga ? "off" : "");
            qa && 0 <= Ga && qa.setActive(a.currentQuality)
        }

        function n(a) {
            da && (Na = Math.floor(a.track), E.cc && (E.cc.querySelector("button").className = 2 === da.length && 0 === Na ? "off" : ""), ra && 0 <= Na && ra.setActive(a.track))
        }

        function L(a) {
            E.cast && (g.canCast() ? g.addClass(E.cast, "jwcancast") : g.removeClass(E.cast, "jwcancast"));
            J(a || Oa)
        }

        function J(a) {
            Oa = a;
            aa("cast", a.active);
            ba()
        }

        function M() {
            ta = g.extend({}, ea, Y.getComponentSettings("controlbar"), l);
            fa = S("background").height;
            var a = ua ? 0 : ta.margin;
            j.style(W, {
                height: fa,
                bottom: a,
                left: a,
                right: a,
                "max-width": ua ? "" : ta.maxwidth
            });
            j(I(".jwtext"), {
                font: ta.fontsize + "px/" + S("background").height + "px " + ta.font,
                color: ta.fontcolor,
                "font-weight": ta.fontweight
            });
            j(I(".jwoverlay"), {
                bottom: fa
            })
        }

        function I(a) {
            return "#" + $ + (a ? " " + a : "")
        }

        function G() {
            return k.createElement("span")
        }

        function O(a, b, e, f, n) {
            var m = G(),
                d = S(a);
            f = f ? " left center" : " center";
            var h = c(d);
            m.className = "jw" + a;
            m.innerHTML = "\x26nbsp;";
            if (d && d.src) return e = e ? {
                background: 'url("' + d.src + '") repeat-x ' + f,
                "background-size": h,
                height: n ? d.height : ""
            } : {
                background: 'url("' + d.src + '") no-repeat' + f,
                "background-size": h,
                width: d.width,
                height: n ? d.height : ""
            }, m.skin = d, j(I((n ? ".jwvertical " : "") + ".jw" + a), g.extend(e, b)), E[a] = m
        }

        function R(a, b, e, f) {
            b && b.src && (j(a, {
                width: b.width,
                background: "url(" + b.src + ") no-repeat center",
                "background-size": c(b)
            }), e.src && !r && j(a + ":hover," + a + ".off:hover", {
                background: "url(" + e.src + ") no-repeat center",
                "background-size": c(e)
            }), f && f.src && j(a + ".off", {
                background: "url(" + f.src + ") no-repeat center",
                "background-size": c(f)
            }))
        }

        function Q(a) {
            return function(c) {
                rb[a] && (rb[a](), r && V.sendEvent(b.JWPLAYER_USER_ACTION));
                c.preventDefault && c.preventDefault()
            }
        }

        function T(b) {
            g.foreach(kb, function(c, e) {
                c !== b && ("cc" === c && (clearTimeout(Ha), Ha = a), "hd" === c && (clearTimeout(Ia), Ia = a), e.hide())
            })
        }

        function D(b) {
            W && E.alt && (b === a && (b = W.parentNode && 320 <= W.parentNode.clientWidth), b && !ma ? j.style(Ua, u) : j.style(Ua, B))
        }

        function U() {
            !ua && !ma && (j.block($), na.show(), Ja("volume", na), T("volume"))
        }

        function aa(a, b) {
            h.isBoolean(b) || (b = !fb[a]);
            E[a] && (b ? g.addClass(E[a],
                "jwtoggle") : g.removeClass(E[a], "jwtoggle"), g.addClass(E[a], "jwtoggling"), setTimeout(function() {
                g.removeClass(E[a], "jwtoggling")
            }, 100));
            fb[a] = b
        }

        function Z() {
            ia && 2 < ia.length && (Ka && (clearTimeout(Ka), Ka = a), j.block($), qa.show(), Ja("hd", qa), T("hd"))
        }

        function ca() {
            da && 2 < da.length && (lb && (clearTimeout(lb), lb = a), j.block($), ra.show(), Ja("cc", ra), T("cc"))
        }

        function ha(b) {
            0 <= b && b < ia.length && (q.jwSetCurrentQuality(b), clearTimeout(Ia), Ia = a, qa.hide())
        }

        function oa(b) {
            0 <= b && b < da.length && (q.jwSetCurrentCaptions(b), clearTimeout(Ha),
                Ha = a, ra.hide())
        }

        function Da() {
            2 === da.length && oa((Na + 1) % 2)
        }

        function H() {
            2 === ia.length && ha((Ga + 1) % 2)
        }

        function Fa(a) {
            a.preventDefault();
            k.onselectstart = function() {
                return !1
            }
        }

        function za(a) {
            Ca();
            Aa = a;
            d.addEventListener("mouseup", ab, !1);
            d.addEventListener("mousemove", ab, !1)
        }

        function Ca() {
            d.removeEventListener("mouseup", ab);
            d.removeEventListener("mousemove", ab);
            Aa = null
        }

        function Sa() {
            E.timeRail.className = "jwrail";
            q.jwGetState() !== p.IDLE && (q.jwSeekDrag(!0), za("time"), Va(), V.sendEvent(b.JWPLAYER_USER_ACTION))
        }

        function jb(a) {
            if (Aa) {
                var c = E[Aa].querySelector(".jwrail"),
                    c = g.bounds(c),
                    c = a.x / c.width;
                100 < c && (c = 100);
                a.type === g.touchEvents.DRAG_END ? (q.jwSeekDrag(!1), E.timeRail.className = "jwrail", Ca(), gb.time(c), Wa()) : (pa(c), a = (new Date).getTime(), 500 < a - mb && (mb = a, gb.time(c)));
                V.sendEvent(b.JWPLAYER_USER_ACTION)
            }
        }

        function pb(a) {
            var c = E.time.querySelector(".jwrail"),
                c = g.bounds(c);
            a = a.x / c.width;
            100 < a && (a = 100);
            q.jwGetState() !== p.IDLE && (gb.time(a), V.sendEvent(b.JWPLAYER_USER_ACTION))
        }

        function Pa(a) {
            return function(b) {
                b.button ||
                    (E[a + "Rail"].className = "jwrail", "time" === a ? q.jwGetState() !== p.IDLE && (q.jwSeekDrag(!0), za(a)) : za(a))
            }
        }

        function ab(a) {
            if (Aa && !a.button) {
                var b = E[Aa].querySelector(".jwrail"),
                    c = g.bounds(b),
                    b = Aa,
                    c = Xa() ? E[b].vertical ? (100 * c.bottom - a.pageY) / (100 * c.height) : (a.pageX - 100 * c.left) / (100 * c.width) : E[b].vertical ? (c.bottom - a.pageY) / c.height : (a.pageX - c.left) / c.width;
                "mouseup" === a.type ? ("time" === b && q.jwSeekDrag(!1), E[b + "Rail"].className = "jwrail", Ca(), gb[b.replace("H", "")](c)) : ("time" === Aa ? pa(c) : Ta(c), a = (new Date).getTime(),
                    500 < a - mb && (mb = a, gb[Aa.replace("H", "")](c)));
                return !1
            }
        }

        function Va(a) {
            a && bb.apply(this, arguments);
            ja && (la && !ua && !r) && (j.block($), ja.show(), Ja("time", ja))
        }

        function Wa() {
            ja && ja.hide()
        }

        function bb(a) {
            xa = g.bounds(W);
            if ((Qa = g.bounds(va)) && 0 !== Qa.width) {
                var b;
                Xa() ? (a = a.pageX ? a.pageX - 100 * Qa.left : a.x, b = 100 * Qa.width) : (a = a.pageX ? a.pageX - Qa.left : a.x, b = Qa.width);
                ja.positionX(Math.round(a));
                qb(la * a / b)
            }
        }

        function P() {
            g.foreach(hb, function(a, b) {
                var c = {};
                "%" === b.position.toString().slice(-1) ? c.left = b.position : 0 < la ?
                    (c.left = (100 * b.position / la).toFixed(2) + "%", c.display = null) : (c.left = 0, c.display = "none");
                j.style(b.element, c)
            })
        }

        function Ea() {
            lb = setTimeout(ra.hide, 500)
        }

        function sa() {
            Ka = setTimeout(qa.hide, 500)
        }

        function cb(a, b, c, e) {
            if (!r) {
                var f = a.element();
                b.appendChild(f);
                b.addEventListener("mousemove", c, !1);
                e ? b.addEventListener("mouseout", e, !1) : b.addEventListener("mouseout", a.hide, !1);
                j.style(f, {
                    left: "50%"
                })
            }
        }

        function Ya(c, e, f, n) {
            if (r) {
                var j = c.element();
                e.appendChild(j);
                (new g.touch(e)).addEventListener(g.touchEvents.TAP,
                    function() {
                        var e = f;
                        "cc" === n ? (2 === da.length && (e = Da), Ha ? (clearTimeout(Ha), Ha = a, c.hide()) : (Ha = setTimeout(function() {
                            c.hide();
                            Ha = a
                        }, 4E3), e()), V.sendEvent(b.JWPLAYER_USER_ACTION)) : "hd" === n && (2 === ia.length && (e = H), Ia ? (clearTimeout(Ia), Ia = a, c.hide()) : (Ia = setTimeout(function() {
                            c.hide();
                            Ia = a
                        }, 4E3), e()), V.sendEvent(b.JWPLAYER_USER_ACTION))
                    })
            }
        }

        function ya(a) {
            var b = G();
            b.className = "jwgroup jw" + a;
            Ba[a] = b;
            if (ka[a]) {
                var b = ka[a],
                    e = Ba[a];
                if (b && 0 < b.elements.length)
                    for (var n = 0; n < b.elements.length; n++) {
                        var d;
                        a: {
                            d = b.elements[n];
                            var h = a;
                            switch (d.type) {
                                case y:
                                    h = void 0;
                                    d = d.name;
                                    var h = {},
                                        q = S(("alt" === d ? "elapsed" : d) + "Background");
                                    if (q.src) {
                                        var l = G();
                                        l.id = $ + "_" + d;
                                        "elapsed" === d || "duration" === d ? (l.className = "jwtext jw" + d + " jwhidden", Ua.push(l)) : l.className = "jwtext jw" + d;
                                        h.background = "url(" + q.src + ") repeat-x center";
                                        h["background-size"] = c(S("background"));
                                        j.style(l, h);
                                        l.innerHTML = "alt" !== d ? "00:00" : "";
                                        h = E[d] = l
                                    } else h = null;
                                    d = h;
                                    break a;
                                case A:
                                    if ("blank" !== d.name) {
                                        d = d.name;
                                        q = h;
                                        if (!S(d + "Button").src || r && ("mute" === d || 0 === d.indexOf("volume")) ||
                                            s && /hd|cc/.test(d)) d = null;
                                        else {
                                            var h = G(),
                                                l = G(),
                                                t = void 0,
                                                t = ga,
                                                p = O(t.name);
                                            p || (p = G(), p.className = "jwblankDivider");
                                            t.className && (p.className += " " + t.className);
                                            t = p;
                                            p = k.createElement("button");
                                            h.style += " display:inline-block";
                                            h.className = "jw" + d;
                                            "left" === q ? (h.appendChild(l), h.appendChild(t)) : (h.appendChild(t), h.appendChild(l));
                                            r ? "hd" !== d && "cc" !== d && (new g.touch(p)).addEventListener(g.touchEvents.TAP, Q(d)) : p.addEventListener("click", Q(d), !1);
                                            p.innerHTML = "\x26nbsp;";
                                            p.tabIndex = -1;
                                            l.appendChild(p);
                                            q = S(d +
                                                "Button");
                                            l = S(d + "ButtonOver");
                                            t = S(d + "ButtonOff");
                                            R(I(".jw" + d + " button"), q, l, t);
                                            (q = xb[d]) && R(I(".jw" + d + ".jwtoggle button"), S(q + "Button"), S(q + "ButtonOver"));
                                            fb[d] ? g.addClass(h, "jwtoggle") : g.removeClass(h, "jwtoggle");
                                            d = E[d] = h
                                        }
                                        break a
                                    }
                                    break;
                                case m:
                                    h = void 0;
                                    t = d.name;
                                    if (r && 0 === t.indexOf("volume")) h = void 0;
                                    else {
                                        d = G();
                                        var l = "volume" === t,
                                            v = t + ("time" === t ? "Slider" : "") + "Cap",
                                            q = l ? "Top" : "Left",
                                            h = l ? "Bottom" : "Right",
                                            p = O(v + q, null, !1, !1, l),
                                            x = O(v + h, null, !1, !1, l),
                                            K;
                                        K = t;
                                        var w = l,
                                            L = q,
                                            Z = h,
                                            u = G(),
                                            C = ["Rail", "Buffer", "Progress"],
                                            J = void 0,
                                            D = void 0;
                                        u.className = "jwrail";
                                        for (var U = 0; U < C.length; U++) {
                                            var D = "time" === K ? "Slider" : "",
                                                z = K + D + C[U],
                                                F = O(z, null, !w, 0 === K.indexOf("volume"), w),
                                                M = O(z + "Cap" + L, null, !1, !1, w),
                                                Ka = O(z + "Cap" + Z, null, !1, !1, w),
                                                H = S(z + "Cap" + L),
                                                T = S(z + "Cap" + Z);
                                            if (F) {
                                                var N = G();
                                                N.className = "jwrailgroup " + C[U];
                                                M && N.appendChild(M);
                                                N.appendChild(F);
                                                Ka && (N.appendChild(Ka), Ka.className += " jwcap" + (w ? "Bottom" : "Right"));
                                                j(I(".jwrailgroup." + C[U]), {
                                                    "min-width": w ? "" : H.width + T.width
                                                });
                                                N.capSize = w ? H.height + T.height : H.width + T.width;
                                                j(I("." +
                                                    F.className), {
                                                    left: w ? "" : H.width,
                                                    right: w ? "" : T.width,
                                                    top: w ? H.height : "",
                                                    bottom: w ? T.height : "",
                                                    height: w ? "auto" : ""
                                                });
                                                2 === U && (J = N);
                                                2 === U && !w ? (F = G(), F.className = "jwprogressOverflow", F.appendChild(N), E[z] = F, u.appendChild(F)) : (E[z] = N, u.appendChild(N))
                                            }
                                        }
                                        if (L = O(K + D + "Thumb", null, !1, !1, w)) j(I("." + L.className), {
                                            opacity: "time" === K ? 0 : 1,
                                            "margin-top": w ? L.skin.height / -2 : ""
                                        }), L.className += " jwthumb", (w && J ? J : u).appendChild(L);
                                        r ? (w = new g.touch(u), w.addEventListener(g.touchEvents.DRAG_START, Sa), w.addEventListener(g.touchEvents.DRAG,
                                            jb), w.addEventListener(g.touchEvents.DRAG_END, jb), w.addEventListener(g.touchEvents.TAP, pb)) : (J = K, "volume" === J && !w && (J += "H"), u.addEventListener("mousedown", Pa(J), !1));
                                        "time" === K && !r && (u.addEventListener("mousemove", Va, !1), u.addEventListener("mouseout", Wa, !1));
                                        K = E[K + "Rail"] = u;
                                        u = S(v + q);
                                        v = S(v + q);
                                        d.className = "jwslider jw" + t;
                                        p && d.appendChild(p);
                                        d.appendChild(K);
                                        x && (l && (x.className += " jwcapBottom"), d.appendChild(x));
                                        j(I(".jw" + t + " .jwrail"), {
                                            left: l ? "" : u.width,
                                            right: l ? "" : v.width,
                                            top: l ? u.height : "",
                                            bottom: l ?
                                                v.height : "",
                                            width: l ? "100%" : "",
                                            height: l ? "auto" : ""
                                        });
                                        E[t] = d;
                                        d.vertical = l;
                                        "time" === t ? (ja = new f.overlay($ + "_timetooltip", Y), Ra = new f.thumbs($ + "_thumb"), ib = k.createElement("div"), ib.className = "jwoverlaytext", Za = k.createElement("div"), h = Ra.element(), Za.appendChild(h), Za.appendChild(ib), ja.setContents(Za), va = K, qb(0), h = ja.element(), K.appendChild(h), E.timeSliderRail || j.style(E.time, B), E.timeSliderThumb && j.style(E.timeSliderThumb, {
                                                "margin-left": S("timeSliderThumb").width / -2
                                            }), h = S("timeSliderCue"), q = {
                                                "z-index": 1
                                            },
                                            h && h.src ? (O("timeSliderCue"), q["margin-left"] = h.width / -2) : q.display = "none", j(I(".jwtimeSliderCue"), q), wa(0), pa(0), pa(0), wa(0)) : 0 === t.indexOf("volume") && (t = d, p = "volume" + (l ? "" : "H"), x = l ? "vertical" : "horizontal", j(I(".jw" + p + ".jw" + x), {
                                            width: S(p + "Rail", l).width + (l ? 0 : S(p + "Cap" + q).width + S(p + "RailCap" + q).width + S(p + "RailCap" + h).width + S(p + "Cap" + h).width),
                                            height: l ? S(p + "Cap" + q).height + S(p + "Rail").height + S(p + "RailCap" + q).height + S(p + "RailCap" + h).height + S(p + "Cap" + h).height : ""
                                        }), t.className += " jw" + x);
                                        h = d
                                    }
                                    d = h;
                                    break a
                            }
                            d =
                                void 0
                        }
                        d && ("volume" === b.elements[n].name && d.vertical ? (na = new f.overlay($ + "_volumeOverlay", Y), na.setContents(d)) : e.appendChild(d))
                    }
            }
        }

        function Xa() {
            return t && g.isIE() && q.jwGetFullscreen()
        }

        function ba() {
            clearTimeout(sb);
            sb = setTimeout(V.redraw, 0)
        }

        function $a() {
            !nb && 1 < q.jwGetPlaylist().length && (!k.querySelector("#" + q.id + " .jwplaylist") || q.jwGetFullscreen()) ? (j.style(E.next, u), j.style(E.prev, u)) : (j.style(E.next, B), j.style(E.prev, B))
        }

        function Ja(a, b) {
            xa || (xa = g.bounds(W));
            b.constrainX(xa, !0)
        }

        function wa(a) {
            E.timeSliderBuffer &&
                (a = Math.min(Math.max(0, a), 1), j.style(E.timeSliderBuffer, {
                    width: (100 * a).toFixed(1) + "%",
                    opacity: 0 < a ? 1 : 0
                }))
        }

        function La(a, b) {
            if (E[a]) {
                var c = E[a].vertical,
                    e = a + ("time" === a ? "Slider" : ""),
                    f = 100 * Math.min(Math.max(0, b), 1) + "%",
                    d = E[e + "Progress"],
                    e = E[e + "Thumb"],
                    g;
                d && (g = {}, c ? (g.height = f, g.bottom = 0) : g.width = f, "volume" !== a && (g.opacity = 0 < b || Aa ? 1 : 0), j.style(d, g));
                e && (g = {}, c ? g.top = 0 : g.left = f, j.style(e, g))
            }
        }

        function Ta(a) {
            La("volume", a);
            La("volumeH", a)
        }

        function pa(a) {
            La("time", a)
        }

        function S(b) {
            var c = "controlbar",
                e = b;
            0 === b.indexOf("volume") && (0 === b.indexOf("volumeH") ? e = b.replace("volumeH", "volume") : c = "tooltip");
            return (b = Y.getSkinElement(c, e)) ? b : {
                width: 0,
                height: 0,
                src: "",
                image: a,
                ready: !1
            }
        }

        function N(a) {
            a = (new e.parsers.srt).parse(a.responseText, !0);
            if (!h.isArray(a)) return X("Invalid data");
            V.addCues(a)
        }

        function X(a) {
            g.log("Cues failed to load: " + a)
        }
        l = l || {};
        var Y, ga = v("divider", "divider"),
            ea = {
                margin: 8,
                maxwidth: 800,
                font: "Arial,sans-serif",
                fontsize: 11,
                fontcolor: 15658734,
                fontweight: "bold",
                layout: {
                    left: {
                        position: "left",
                        elements: [v("play", A), v("prev", A), v("next", A), v("elapsed", y)]
                    },
                    center: {
                        position: "center",
                        elements: [v("time", m), v("alt", y)]
                    },
                    right: {
                        position: "right",
                        elements: [v("duration", y), v("hd", A), v("cc", A), v("mute", A), v("volume", m), v("volumeH", m), v("cast", A), v("fullscreen", A)]
                    }
                }
            },
            ta, ka, E, fa, W, $, la, ia, Ga, da, Na, Ma, Oa = {},
            na, xa, va, Qa, ja, Za, Ra, ib, Ka, Ia, qa, lb, Ha, ra, sb, db = -1,
            ua = !1,
            ma = !1,
            nb = !1,
            ob = !1,
            Aa = null,
            mb = 0,
            hb = [],
            eb, xb = {
                play: "pause",
                mute: "unmute",
                cast: "casting",
                fullscreen: "normalscreen"
            },
            fb = {
                play: !1,
                mute: !1,
                cast: !1,
                fullscreen: l.fullscreen || !1
            },
            rb = {
                play: function() {
                    fb.play ? q.jwPause() : q.jwPlay()
                },
                mute: function() {
                    var a = !fb.mute;
                    q.jwSetMute(a);
                    !a && 0 === Ma && q.jwSetVolume(20);
                    F()
                },
                fullscreen: function() {
                    q.jwSetFullscreen()
                },
                next: function() {
                    q.jwPlaylistNext()
                },
                prev: function() {
                    q.jwPlaylistPrev()
                },
                hd: H,
                cc: Da,
                cast: function() {
                    Oa.active ? q.jwStopCasting() : q.jwStartCasting()
                }
            },
            gb = {
                time: function(a) {
                    eb ? (a = eb.position, a = "%" === a.toString().slice(-1) ? la * parseFloat(a.slice(0, -1)) / 100 : parseFloat(a)) : a *= la;
                    q.jwSeek(a)
                },
                volume: function(a) {
                    Ta(a);
                    0.1 > a && (a = 0);
                    0.9 < a && (a = 1);
                    q.jwSetVolume(100 * a)
                }
            },
            kb = {},
            Ua = [],
            V = g.extend(this, new b.eventdispatcher),
            qb, tb, yb = function(a) {
                j.style(ja.element(), {
                    width: a
                });
                Ja("time", ja)
            };
        qb = function(a) {
            var b = Ra.updateTimeline(a, yb);
            if (eb) {
                if ((a = eb.text) && a !== tb) tb = a, j.style(ja.element(), {
                    width: 32 < a.length ? 160 : ""
                })
            } else a = g.timeFormat(a), b || j.style(ja.element(), {
                width: ""
            });
            ib.innerHTML !== a && (ib.innerHTML = a);
            Ja("time", ja)
        };
        V.setText = function(a) {
            j.block($);
            var b = E.alt,
                c = E.time;
            E.timeSliderRail ? j.style(c, a ? B : z) : j.style(c,
                B);
            b && (j.style(b, a ? z : B), b.innerHTML = a || "");
            ba()
        };
        var Ba = {};
        V.redraw = function(a) {
            j.block($);
            a && V.visible && V.show(!0);
            M();
            var b = t && g.isMSIE();
            a = Oa.active;
            j.style(E.fullscreen, {
                display: ua || a || ob || b ? "none" : ""
            });
            j.style(E.volumeH, {
                display: ua || ma ? "block" : "none"
            });
            (b = Math.floor(ta.maxwidth)) && W.parentNode && g.isIE() && (!ua && W.parentNode.clientWidth > b + 2 * Math.floor(ta.margin) ? j.style(W, {
                width: b
            }) : j.style(W, {
                width: ""
            }));
            na && j.style(na.element(), {
                display: !ua && !ma ? "block" : "none"
            });
            j.style(E.hd, {
                display: !ua && !a &&
                    !ma && ia && 1 < ia.length && qa ? "" : "none"
            });
            j.style(E.cc, {
                display: !ua && !ma && da && 1 < da.length && ra ? "" : "none"
            });
            P();
            j.unblock($);
            V.visible && (a = S("capLeft"), b = S("capRight"), a = Xa() ? {
                left: Math.round(g.parseDimension(62 * Ba.left.offsetWidth) + a.width),
                right: Math.round(g.parseDimension(86 * Ba.right.offsetWidth) + b.width)
            } : {
                left: Math.round(g.parseDimension(Ba.left.offsetWidth) + a.width),
                right: Math.round(g.parseDimension(Ba.right.offsetWidth) + b.width)
            }, j.style(Ba.center, a))
        };
        V.audioMode = function(b) {
            b !== a && b !== ua && (ua = !!b,
                ba());
            return ua
        };
        V.instreamMode = function(b) {
            b !== a && b !== ma && (ma = !!b, j.style(E.cast, ma ? B : u));
            return ma
        };
        V.adMode = function(a) {
            if (h.isBoolean(a) && a !== nb) {
                if (nb = a) {
                    var b = Ua,
                        c = h.indexOf(b, E.elapsed); - 1 < c && b.splice(c, 1);
                    b = Ua;
                    c = h.indexOf(b, E.duration); - 1 < c && b.splice(c, 1)
                } else b = Ua, c = E.elapsed, -1 === h.indexOf(b, c) && b.push(c), b = Ua, c = E.duration, -1 === h.indexOf(b, c) && b.push(c);
                j.style([E.cast, E.elapsed, E.duration], a ? B : u);
                $a()
            }
            return nb
        };
        V.hideFullscreen = function(b) {
            b !== a && b !== ob && (ob = !!b, ba());
            return ob
        };
        V.element =
            function() {
                return W
            };
        V.margin = function() {
            return parseInt(ta.margin, 10)
        };
        V.height = function() {
            return fa
        };
        V.show = function(a) {
            if (!V.visible || a) V.visible = !0, j.style(W, {
                display: "inline-block"
            }), xa = g.bounds(W), D(), j.block($), F(), ba(), clearTimeout(db), db = -1, db = setTimeout(function() {
                j.style(W, {
                    opacity: 1
                })
            }, 0)
        };
        V.showTemp = function() {
            this.visible || (W.style.opacity = 0, W.style.display = "inline-block")
        };
        V.hideTemp = function() {
            this.visible || (W.style.display = "none")
        };
        V.addCues = function(a) {
            g.foreach(a, function(a, b) {
                if (b.text) {
                    var c =
                        b.begin,
                        e = b.text;
                    if (/^[\d\.]+%?$/.test(c.toString())) {
                        var f = O("timeSliderCue"),
                            d = E.timeSliderRail,
                            g = {
                                position: c,
                                text: e,
                                element: f
                            };
                        f && d && (d.appendChild(f), f.addEventListener("mouseover", function() {
                            eb = g
                        }, !1), f.addEventListener("mouseout", function() {
                            eb = null
                        }, !1), hb.push(g))
                    }
                    P()
                }
            })
        };
        V.hide = function() {
            if (V.visible && (!ma || !r || !q.jwGetControls())) V.visible = !1, j.style(W, {
                opacity: 0
            }), clearTimeout(db), db = -1, db = setTimeout(function() {
                j.style(W, {
                    display: "none"
                })
            }, 250)
        };
        E = {};
        $ = q.id + "_controlbar";
        la = 0;
        W = G();
        W.id =
            $;
        W.className = "jwcontrolbar";
        Y = q.skin;
        ka = Y.getComponentLayout("controlbar");
        ka || (ka = ea.layout);
        g.clearCss(I());
        j.block($ + "build");
        M();
        var ub = O("capLeft"),
            vb = O("capRight"),
            wb = O("background", {
                position: "absolute",
                left: S("capLeft").width,
                right: S("capRight").width,
                "background-repeat": "repeat-x"
            }, !0);
        wb && W.appendChild(wb);
        ub && W.appendChild(ub);
        ya("left");
        ya("center");
        ya("right");
        W.appendChild(Ba.left);
        W.appendChild(Ba.center);
        W.appendChild(Ba.right);
        E.hd && (qa = new f.menu("hd", $ + "_hd", Y, ha), r ? Ya(qa, E.hd,
            Z, "hd") : cb(qa, E.hd, Z, sa), kb.hd = qa);
        E.cc && (ra = new f.menu("cc", $ + "_cc", Y, oa), r ? Ya(ra, E.cc, ca, "cc") : cb(ra, E.cc, ca, Ea), kb.cc = ra);
        E.mute && (E.volume && E.volume.vertical) && (na = new f.overlay($ + "_volumeoverlay", Y), na.setContents(E.volume), cb(na, E.mute, U), kb.volume = na);
        j.style(Ba.right, {
            right: S("capRight").width
        });
        vb && W.appendChild(vb);
        j.unblock($ + "build");
        q.jwAddEventListener(b.JWPLAYER_MEDIA_TIME, C);
        q.jwAddEventListener(b.JWPLAYER_PLAYER_STATE, function(a) {
            switch (a.newstate) {
                case p.BUFFERING:
                case p.PLAYING:
                    E.timeSliderThumb &&
                        j.style(E.timeSliderThumb, {
                            opacity: 1
                        });
                    aa("play", !0);
                    break;
                case p.PAUSED:
                    Aa || aa("play", !1);
                    break;
                case p.IDLE:
                    aa("play", !1), E.timeSliderThumb && j.style(E.timeSliderThumb, {
                        opacity: 0
                    }), E.timeRail && (E.timeRail.className = "jwrail"), wa(0), C({
                        position: 0,
                        duration: 0
                    })
            }
        });
        q.jwAddEventListener(b.JWPLAYER_PLAYLIST_ITEM, function(a) {
            if (!ma) {
                a = q.jwGetPlaylist()[a.index].tracks;
                var b = !1,
                    c = E.timeSliderRail;
                g.foreach(hb, function(a, b) {
                    c.removeChild(b.element)
                });
                hb.length = 0;
                if (h.isArray(a) && !r)
                    for (var e = 0; e < a.length; e++)
                        if (!b &&
                            (a[e].file && a[e].kind && "thumbnails" === a[e].kind.toLowerCase()) && (Ra.load(a[e].file), b = !0), a[e].file && a[e].kind && "chapters" === a[e].kind.toLowerCase()) {
                            var f = a[e].file;
                            f ? g.ajax(f, N, X, !0) : hb.length = 0
                        }
                b || Ra.load()
            }
        });
        q.jwAddEventListener(b.JWPLAYER_MEDIA_MUTE, F);
        q.jwAddEventListener(b.JWPLAYER_MEDIA_VOLUME, F);
        q.jwAddEventListener(b.JWPLAYER_MEDIA_BUFFER, function(a) {
            wa(a.bufferPercent / 100)
        });
        q.jwAddEventListener(b.JWPLAYER_FULLSCREEN, function(a) {
            aa("fullscreen", a.fullscreen);
            $a();
            V.visible && V.show(!0)
        });
        q.jwAddEventListener(b.JWPLAYER_PLAYLIST_LOADED, x);
        q.jwAddEventListener(b.JWPLAYER_MEDIA_LEVELS, function(a) {
            ia = a.levels;
            if (!ma && ia && 1 < ia.length && qa) {
                j.style(E.hd, u);
                qa.clearOptions();
                for (var b = 0; b < ia.length; b++) qa.addOption(ia[b].label, b);
                K(a)
            } else j.style(E.hd, B);
            ba()
        });
        q.jwAddEventListener(b.JWPLAYER_MEDIA_LEVEL_CHANGED, K);
        q.jwAddEventListener(b.JWPLAYER_CAPTIONS_LIST, function(a) {
            da = a.tracks;
            if (!ma && da && 1 < da.length && ra) {
                j.style(E.cc, u);
                ra.clearOptions();
                for (var b = 0; b < da.length; b++) ra.addOption(da[b].label,
                    b);
                n(a)
            } else j.style(E.cc, B);
            ba()
        });
        q.jwAddEventListener(b.JWPLAYER_CAPTIONS_CHANGED, n);
        q.jwAddEventListener(b.JWPLAYER_RESIZE, function() {
            xa = g.bounds(W);
            0 < xa.width && V.show(!0)
        });
        q.jwAddEventListener(b.JWPLAYER_CAST_AVAILABLE, L);
        q.jwAddEventListener(b.JWPLAYER_CAST_SESSION, J);
        r || (W.addEventListener("mouseover", function() {
            d.addEventListener("mousedown", Fa, !1)
        }, !1), W.addEventListener("mouseout", function() {
            d.removeEventListener("mousedown", Fa);
            k.onselectstart = null
        }, !1));
        setTimeout(F, 0);
        x();
        V.visible = !1;
        L()
    };
    j("span.jwcontrolbar", {
        position: "absolute",
        margin: "auto",
        opacity: 0,
        display: "none"
    });
    j("span.jwcontrolbar span", {
        height: "100%"
    });
    g.dragStyle("span.jwcontrolbar span", "none");
    j("span.jwcontrolbar .jwgroup", {
        display: "inline"
    });
    j("span.jwcontrolbar span, span.jwcontrolbar .jwgroup button,span.jwcontrolbar .jwleft", {
        position: "relative",
        "float": "left"
    });
    j("span.jwcontrolbar .jwright", {
        position: "relative",
        "float": "right"
    });
    j("span.jwcontrolbar .jwcenter", {
        position: "absolute"
    });
    j("span.jwcontrolbar button", {
        display: "inline-block",
        height: "100%",
        border: "none",
        cursor: "pointer"
    });
    j("span.jwcontrolbar .jwcapRight,span.jwcontrolbar .jwtimeSliderCapRight,span.jwcontrolbar .jwvolumeCapRight", {
        right: 0,
        position: "absolute"
    });
    j("span.jwcontrolbar .jwcapBottom", {
        bottom: 0,
        position: "absolute"
    });
    j("span.jwcontrolbar .jwtime", {
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0
    });
    j("span.jwcontrolbar .jwthumb", {
        position: "absolute",
        height: "100%",
        cursor: "pointer"
    });
    j("span.jwcontrolbar .jwrail", {
        position: "absolute",
        cursor: "pointer"
    });
    j("span.jwcontrolbar .jwrailgroup", {
        position: "absolute",
        width: "100%"
    });
    j("span.jwcontrolbar .jwrailgroup span", {
        position: "absolute"
    });
    j("span.jwcontrolbar .jwdivider+.jwdivider", {
        display: "none"
    });
    j("span.jwcontrolbar .jwtext", {
        padding: "0 5px",
        "text-align": "center"
    });
    j("span.jwcontrolbar .jwcast", {
        display: "none"
    });
    j("span.jwcontrolbar .jwcast.jwcancast", {
        display: "block"
    });
    j("span.jwcontrolbar .jwalt", {
        display: "none",
        overflow: "hidden"
    });
    j("span.jwcontrolbar .jwalt", {
        position: "absolute",
        left: 0,
        right: 0,
        "text-align": "left"
    }, !0);
    j("span.jwcontrolbar .jwoverlaytext", {
        padding: 3,
        "text-align": "center"
    });
    j("span.jwcontrolbar .jwvertical *", {
        display: "block"
    });
    j("span.jwcontrolbar .jwvertical .jwvolumeProgress", {
        height: "auto"
    }, !0);
    j("span.jwcontrolbar .jwprogressOverflow", {
        position: "absolute",
        overflow: "hidden"
    });
    l("span.jwcontrolbar", "opacity .25s, background .25s, visibility .25s");
    l("span.jwcontrolbar button", "opacity .25s, background .25s, visibility .25s");
    l("span.jwcontrolbar .jwtoggling",
        "none")
})(window, document);
(function(d) {
    var k = d.utils,
        a = d.events,
        c = a.state,
        e = d.playlist;
    d.html5.controller = function(f, g) {
        function h() {
            return f.getVideo()
        }

        function b(a) {
            x.sendEvent(a.type, a)
        }

        function p(c) {
            l(!0);
            switch (k.typeOf(c)) {
                case "string":
                    var g = new e.loader;
                    g.addEventListener(a.JWPLAYER_PLAYLIST_LOADED, function(a) {
                        p(a.playlist)
                    });
                    g.addEventListener(a.JWPLAYER_ERROR, function(a) {
                        p([]);
                        a.message = "Could not load playlist: " + a.message;
                        b(a)
                    });
                    g.load(c);
                    break;
                case "object":
                case "array":
                    f.setPlaylist(new d.playlist(c));
                    break;
                case "number":
                    f.setItem(c)
            }
        }

        function j(b) {
            if (k.exists(b) && !b) return r();
            try {
                0 <= u && (p(u), u = -1);
                if (!q && (q = !0, x.sendEvent(a.JWPLAYER_MEDIA_BEFOREPLAY), q = !1, C)) {
                    C = !1;
                    w = null;
                    return
                }
                if (s()) {
                    if (0 === f.playlist.length) return !1;
                    h().load(f.playlist[f.item])
                } else f.state === c.PAUSED && h().play();
                return !0
            } catch (e) {
                x.sendEvent(a.JWPLAYER_ERROR, e), w = null
            }
            return !1
        }

        function l(b) {
            w = null;
            try {
                return s() ? b || (v = !0) : h().stop(), q && (C = !0), !0
            } catch (c) {
                x.sendEvent(a.JWPLAYER_ERROR, c)
            }
            return !1
        }

        function r(b) {
            w = null;
            if (k.exists(b) &&
                !b) return j();
            switch (f.state) {
                case c.PLAYING:
                case c.BUFFERING:
                    try {
                        h().pause()
                    } catch (e) {
                        return x.sendEvent(a.JWPLAYER_ERROR, e), !1
                    }
                    break;
                default:
                    q && (C = !0)
            }
            return !0
        }

        function s() {
            return f.state === c.IDLE
        }

        function t(a) {
            k.css.block(f.id + "_next");
            p(a);
            j();
            k.css.unblock(f.id + "_next")
        }

        function A() {
            t(f.item + 1)
        }

        function y() {
            s() && (v ? v = !1 : (w = y, f.repeat ? A() : f.item === f.playlist.length - 1 ? (u = 0, l(!0), setTimeout(function() {
                x.sendEvent(a.JWPLAYER_PLAYLIST_COMPLETE)
            }, 0)) : A()))
        }

        function m(a) {
            return function() {
                var b = Array.prototype.slice.call(arguments,
                    0);
                z ? B(a, b) : F.push({
                    method: a,
                    arguments: b
                })
            }
        }

        function B(a, b) {
            a.apply(this, b)
        }
        var z = !1,
            u = -1,
            q = !1,
            w, v = !1,
            C, F = [],
            x = k.extend(this, new a.eventdispatcher(f.id, f.config.debug));
        this.play = m(j);
        this.pause = m(r);
        this.seek = m(function(a) {
            f.state !== c.PLAYING && j(!0);
            h().seek(a)
        });
        this.stop = function() {
            s() && (v = !0);
            m(l)()
        };
        this.load = m(p);
        this.next = m(A);
        this.prev = m(function() {
            t(f.item - 1)
        });
        this.item = m(t);
        this.setVolume = m(f.setVolume);
        this.setMute = m(f.setMute);
        this.setFullscreen = m(function(a) {
            g.fullscreen(a)
        });
        this.detachMedia =
            function() {
                try {
                    return f.getVideo().detachMedia()
                } catch (a) {
                    k.log("Error calling detachMedia", a)
                }
                return null
            };
        this.attachMedia = function(a) {
            try {
                f.getVideo().attachMedia(a)
            } catch (b) {
                k.log("Error calling detachMedia", b);
                return
            }
            "function" === typeof w && w()
        };
        this.setCurrentQuality = m(function(a) {
            h().setCurrentQuality(a)
        });
        this.getCurrentQuality = function() {
            return h() ? h().getCurrentQuality() : -1
        };
        this.getQualityLevels = function() {
            return h() ? h().getQualityLevels() : null
        };
        this.setCurrentAudioTrack = function(a) {
            h().setCurrentAudioTrack(a)
        };
        this.getCurrentAudioTrack = function() {
            return h() ? h().getCurrentAudioTrack() : -1
        };
        this.getAudioTracks = function() {
            return h() ? h().getAudioTracks() : null
        };
        this.setCurrentCaptions = m(function(a) {
            g.setCurrentCaptions(a)
        });
        this.getCurrentCaptions = function() {
            return g.getCurrentCaptions()
        };
        this.getCaptionsList = function() {
            return g.getCaptionsList()
        };
        this.checkBeforePlay = function() {
            return q
        };
        this.playerReady = function(a) {
            if (!z) {
                g.completeSetup();
                x.sendEvent(a.type, a);
                d.utils.exists(d.playerReady) && d.playerReady(a);
                f.addGlobalListener(b);
                g.addGlobalListener(b);
                x.sendEvent(d.events.JWPLAYER_PLAYLIST_LOADED, {
                    playlist: d(f.id).getPlaylist()
                });
                x.sendEvent(d.events.JWPLAYER_PLAYLIST_ITEM, {
                    index: f.item
                });
                p();
                f.autostart && !k.isMobile() && j();
                for (z = !0; 0 < F.length;) a = F.shift(), B(a.method, a.arguments)
            }
        };
        f.addEventListener(a.JWPLAYER_MEDIA_BUFFER_FULL, function() {
            h().play()
        });
        f.addEventListener(a.JWPLAYER_MEDIA_COMPLETE, function() {
            setTimeout(y, 25)
        });
        f.addEventListener(a.JWPLAYER_MEDIA_ERROR, function(b) {
            b = k.extend({}, b);
            b.type =
                a.JWPLAYER_ERROR;
            x.sendEvent(b.type, b)
        })
    }
})(jwplayer);
(function(d) {
    var k;
    d.html5.defaultskin = function() {
        return k = k || d.utils.parseXML('\x3c?xml version\x3d"1.0" ?\x3e\x3cskin author\x3d"JW Player" name\x3d"Six" target\x3d"6.7" version\x3d"3.0"\x3e\x3ccomponents\x3e\x3ccomponent name\x3d"controlbar"\x3e\x3csettings\x3e\x3csetting name\x3d"margin" value\x3d"10"/\x3e\x3csetting name\x3d"maxwidth" value\x3d"800"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xd2d2d2"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAANklEQVR4AWMUFRW/x2RiYqLI9O3bNwam////MzAxAAGcAImBWf9RuRAxnFyEUQgDCLKATLCDAFb+JfgLDLOxAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAAr0lEQVR4AWNhAAJRUXEFIFUOxNZAzMOABFiAkkpAeh0fH5+IgoKCKBsQoCgA4lJeXl5ReXl5qb9//zJ8+/aNAV2Btbi4uOifP39gYhgKeFiBAEjjUAAFlCn4/5+gCf9pbwVhNwxhKxAm/KdDZA16E778/v37DwsLKwsuBUdfvXopISUlLYpLQc+vX78snz17yigqKibAAgQoCuTlFe4+fPggCKio9OnTJzZAMW5kBQAEFD9DdqDrQQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAeCAYAAAARgF8NAAAArklEQVR4Ad2TMQrCQBBF/y5rYykEa++QxibRK3gr0dt4BPUSLiTbKMYUSlgt3IFxyogJsRHFB6/7/A+7jIqiYYZnvLgV56IzcRyPUOMuOOcGVVWNAcxUmk4ZNZRS0Fojz/O9936lkmTCaICIgrV2Z9CCMaYHoK/RQWfAMHcEAP7QxPsNAP/BBDN/+7N+uoEoEIBba0NRHM8A1i8vSUJZni4hhAOAZdPxXsWNuBCzB0E+V9jBVxF8AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFnAyiDPwMzMRrkHuwuCSdQZ14Tbpv9v/cf2UN8ZoMHu5/uP/l/h9EazK4sx8Cn+7/RpQmg+v74RBo11eCmgwu7keFd/d/wavJ4PR+THhj/6f9N1ZODWTgxKLhyH7scMvK3iCsGvbtx4Tz1oZn4HTSjv2ocObakAy8nt60HwGnrA3KIBisa/dD4IS1/lDFBJLGiv0r9ves9YUpJpz4Ji72hiomNXnTH4wCAAxXpSnKMgKaAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAtElEQVR4AWOgLRgFPAwyDCIMLMRr0Hhws6SLwYR4TTZv/v/8f+UZ8ZocHv5/+P/l/x9Ea3K48x8Cn/7/RpQmh+v/4RBo11eCmhwu/keFd/9/wavJ4fR/THjj/6f/Nx5OzWHgwaLhyH/scMuj3lysGvb9x4Tznod343TSjv+ocObzkG68nt70HwGnPA/qJhisa/9D4ITn/lDFBJLGiv8r/vc894UpJpz4Jt7yhiomNXnTH4wCAHC8wQF60KqlAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"pauseButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAYElEQVR4AWOgNRgFPAwqDAZAqAJkofPhgBFJg8r/2VDBVIY7GHwoYEG24RmchcnHpoHhDxDj4WNq+I0m+ZvqGn6hSf6iuoafaJI/SbaB7hroHw9f/sBZ6HzSkzdtwSgAADNtJoABsotOAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"pauseButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAeCAQAAACcJxZuAAAAWklEQVR4AWOgNRgFAgwGDA5AaABkofOxAoP/UMBggMGHAxZkG57BWeh87BoY/gAxHj6mht9okr+pruEXmuQvqmv4iSb5k2Qb6K6B/vHw4Q+chc4nPXnTFowCADYgMi8+iyldAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"prevButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmElEQVR4AWMYMDAKeBgkgBgGmBn4GUQZONEVqfzfz6ACV6Bekv5gMYMcuiKDR/sZDGAKrqz5sf/lfgZdDEW39jPYQxR82/94/y0gZDDAUHR+f3rpjZWf99/efx4CsSk6sj+pbMvKI/vhEJuiXWDrQjNmr921HwyxKVoPd3hAxsS16/evx+JwleUoQeCbMRkRBIQDk/5gFAAAvD5I9xunLg8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"prevButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAeCAQAAACLBYanAAAAmUlEQVR4AWMYMDAKBBgUgBgGWBhEGGQYeNAVGfz/z2AAV2BS0vXgJoMGuiKHR/8ZHGAKrjz78f/lfwYbDEW3/jOEQBR8+//4/y0gZHDAUHT+f/qcGw8//7/9/zwEYlN05H/S3C2PjvyHQ2yKdoGtC+2e/XzXfzDEpmg93OEB3ROfr/+/HovDDZajBIFv9+RbDBpEByb9wSgAAHeuVc8xgA8jAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"nextButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFnAyiDPwMzHA+D4MEEKMAuQeLS9IZ1OHKVP7vZ1BBVaL7cv+P/VfWwJUZPNrPYICqxODW/lv7H+//BlNmfwtTyfn9EHh7/+f9N1aml57HVHJkPwJuWZlUdgRTya79EDh7bWgGyKJdGEp01+9fv3/i2oAMmHPXYyiRm7zYNwPZ08vBniYcdDQHowAA/MZI93f1cSkAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"nextButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAeCAQAAABgMj2kAAAAlUlEQVR4AWOgAxgFPAwyDCIMLHC+AIMCEKMAjQc3S7oYTODKDP7/ZzBAVWLz8v+P/1eewZU5PPrP4ICqxOHW/1v/H///BlMWcgtTyfn/EHj7/+f/Nx6mzzmPqeTIfwTc8ihp7hFMJbv+Q+Ds56HdIIt2YSixWf9//f+JzwO6Yc5dj6FEY/It325kTy8He5pw0NEcjAIAWP9Vz4mR7dgAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"elapsedBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"durationBackground" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAeCAYAAAAPSW++AAAAD0lEQVQoU2NgGAWjYKQAAALuAAGL6/H9AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAALklEQVQI12NgIBmIior/ZxIVFWNgAgI4wcjAxMgI4zIyMkJYYMUM////5yXJCgBxnwX/1bpOMAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAnUlEQVR42t3NSwrCMBSF4TsQBHHaaklJKRTalKZJ+lAXoTPBDTlyUYprKo6PN4F2D3rgm/yQG/rfRdHuwp5smsNdCImiKKFUAx/OaSpR1xpNYwKK4/2rLBXa1s1CnIxxsLZbhGhtD+eGBSWJePt7fX9YUFXVVylzdN2IYTgGBGCVZfmDQWuDcTyB/ACsOdz8Kf7jQ/P8C7ZhW/rlfQGDz0pa/ncctQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAn0lEQVR42t3MTwqCQBTH8bcIgmirJYoiCOowzh8ds0PULjpRqw5VdCZr/WueMJfwC5/NezOP1lcUHWbv5V0o1LYSVVUjTXP4xYM4KTWYEB2ybFlcSSmLoK4F4vj4JmN6BFpbHs5krUNgzMDDLw3DCQHfTZL0Q85NYH0/Is9LNI240Tie0XUaRVGyJ4AN+Rs//qKUuQPYEgdg7+2WF2voDzqVSl5A2koAAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBuffer" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAYAAADtlXTHAAAAKElEQVQI12NgIA/IyMj9Z2JhYWFgAgIGJkZGRhDBwMDEwMAI5TKQDwCHIAF/C8ws/gAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderBufferCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAY0lEQVR42uXJyxGAIAxFUfrgI5CgzajdqlWxQffxaeiCzJyZ5MYMNtb6zTl/OhfuP2BZQ4h1mpLEmOWPCMd3pESSM2vE0YiKdBqJuDEXUT0yzydIp7GUZYMKAhr7Y4cLHjPGvMB5JcRMsOVwAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderBufferCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAYElEQVQoz+WLyxGAIAwF6YM/CdqMlCtdcRHvMSIw9sCb2ctuIsQaU8pUpfQppT6mdC6QtZ6McYUPUpMhIHkP9EYOuUmASAOOV5OIkQYAWLvc6Mf3HuNOncKkIW8mT7HOHpUUJcPzmTX0AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAQAAABHnLxMAAAAH0lEQVQI12NgIAT+/2e6x8D0k4HpOxj9AJM/CWpjAACWQgi68LWdTgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAARUlEQVQYV2NkgANG+jP/+zJkMtgCmf99vi38KPQTJPpq6xsvqIKznxh4ocwjCOaebQyeUOZmX4YFDEJQw9b4QQ2DAfoyAVkTEmC7RwxJAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"timeSliderProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAQAAABOdxw2AAAASklEQVQYV8XLIRKAMAxE0R4QbhrXoQqJxWJxCGZqaKs/m1yi+80TSUqzRmNjCd48jMoqXnhvEU+iTzyImrgT+UFG1exv1q2YY95+oTIxx/xENX8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"timeSliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAQAAACP8FaaAAABMElEQVR4AeWSv0rzYBjFfy1NlU5RKC3dCjqZDwRXEapOuuik+BfbNLdUeg86pHSrm1Z3G3w7VAdbB+sNFFKIZ1FCjTjL95wQOOd3IC/vE/6vSZEmQ5Z5KUtGLhWjshYLbHCIKx2wLmcp/cJzOFTb/vtoGk7D8bDtc4GjNP2J/+ENzFv0FBnpORpHA4OnVBWwKFANTD96jKkfBYYqRVFyVC5bCr/pqsWmKDZHd8Okwv2IY1HyuL0wqRCE1EUp/lR4mFAT1XNym/iJ7pBTCpBnp5l4yGaLXVFsVqh1zCzuGGoiNuQoUcG7NjPYU1oSxVKrzDZuw+++BtPe5Oal4eOypdQWRVfNoswa+5xTl87YkysrjW3DpsQyDquSw5KcjXB83TlFeYoU9LbltO7ff5i/Mh+pOuncDFLYKwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"timeSliderCue" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAeCAYAAAAl+Z4RAAAAcUlEQVQ4y2NgGAWjYBTgBaKi4llAfASKs0jWbGNj96S1tf03CIPYJBkCsrW6uu53bm7+fxAGsUFiJBmQlpbxOzMz5z8Ig9hAsaMkecHIyORJUlLq78TElN8gNlAsm9RwyAbZCsSHgDhzNFmNglGAHwAAo/gvURVBmFAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABf0lEQVR42u2VvUoDQRSFA0awMIVCsv+z/1oE8yOE9MYmtb2P4AspSOyECFZqtU9gbZvK6CNoNZ6zMMuSQpxdEAJbHC737pz59mbmblpSyn9XA22gDXRLod2uMYfWkKwh+uc60LVtO9J1RWXBn4N1oNL3QxkEEcwuzYybOWMh07QJ4xqK/ryuBQ3DWEZRoowdx3FfhAgkI3NVp7IsO5xMpnPDsFae59NHvzaURgWlWpblPEOSkbmqQzfQK2DT8fj0HB0rrz40jlOqgA4Go1m/f3LJWIYC8uQ4nkSX94vF3S5qX8qrDU2SlCqgOMMrAK4Zy1B27nlCIj4i34G+lbcC9ChXuSNeFEbmpZe5RZdv+BU4ZjM8V159aJoe5yp3JIS/eaZcv7dcPhzghc6Qr3DZlLc6FOelRoTn9OvI4DKxw2rQXs/84KzRyLPhTSSQGzIyV2OBdYzIYz4rgKxjn88/Q4fD0QUNNT6BBL5zH50Pfhvahzo1RH+7+WtroA10O6E/bVCWtAEB8p4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"hdButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABPUlEQVR4Ae2SsUrDUBiF/0EFfYK8Rl4g5BUUHGILRWghUHAQHJzaUcjSgB1EtCApliDoUApSKggZRFSUQsVAawspElz1OunxhwtZcm0Ht9LzQfLByVluLs145lkkjXQyyPwTg3uNv0tFKzuR+MAkIlF2eJyKPhBjRBMZYyBIp1SMEV6nMgIZlIoZQkJuIw7RiMll36XN5e31k0AkramYdiGhQjPsohlSgT13GTy8WXurR0mrmt5BQla+ZJ/mS2SxF8+GT7joLRRvvmWrnAaQULbi1R4rHmXZi/VhAO9laev6R7bKaQcSsv3+Lfw+2ey548B/t/Yz3pVs1dMWJORW4xaqfEzsfEwrO2te5ytpFVPjHJJntPnZ5jc708M9muwS1c/Ra8LHNGrKK6FlnENRxyQOPjcc0v5z/Wc68/wCXWlzVKUYIC4AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButtonOff" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAYAAADQBxWhAAABzUlEQVR42u1Uu0oDQRQVTCMopMjmtZvdJPswKCQbC6tYCEqMBDUGrf2NCDF+gmXEyiZWiTb+gMTGxtrGwmh8IOKjUoLjueNGfCBk10rYC4eZOey5Z+7M3O1zww033Og5BCGQA9oAcw6uz9kxbYfDIpMk2TGg58Z2TJmixFg0GueIRBQWDIZ5BX5/kIli5AcfCIS6PIH0nLdlGoupLB7XmCxHyegymTSXa7UdoVBYHBVFqQEDMjozzfRCvd7w5fNzKfD74ElHevumEHKEQiJD4nmYz4JvwWirWt30YiO36fTYNKotgj8Hv1GprPvAP1obtm+qqjqBhC/l8toAkh18uqs7rK8ZY/0Yj8AT90o80LG09k01TQe48Bnw4O6asqzw5DjGXVR2Qt9iPLb4Dh07NnGvqhq0jkwNQvehTCYSI0tIeIWqtq1jfAA/bhiJFcxvcPzVUmlVwPwJVZLWvqmuD3MgGYlbGHPN5qE3m52JYU0PifhTGEwRn8lMaFjvYVNdrXNT7BjGX1tGkvgL/dYyxMv0vTNTahH02ocY1cBEpTbgeL8z41eeNKSn6+jZNJUyiyT4y28Q+gvK07MpWsEDDAJDzsH1nj433HDjX8YbqHFYmhICTLsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"ccButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAeCAQAAAB6Dt0qAAABWElEQVR4AWMY5mAUsDJIMBgy2DE44IR2QHkJoDoMINHQ/eTbl//44JNvDd1AzRjA8N63p/+f4IVP/9/7BrQZA9g9/H+fIHz4H+hsDOBw6z8EnvqZsJ6vznDCkke3/h/9Hr2ap9Z08oqnMFkGByxaL/+HwMiVafNufFl+hWvmiR+BC/IX3/yy4Bz/nJN/wbLYtZ75D4In/3GV7n56/v+1/zd/H/rGkHPgJYh94/fp/2B57FqP/AfBg/84SlY/O/L/8P+JLze/Z8je8PrI/0P/Jrza+Rcsj13r3v8guO9/+LKEhZu+9lzmn7zrl++c9BWbv7WfE5iy/S9YHrvWbf8hcP+P0FVsVSo9y57s+L/vm/9ytiqtvhVANlgWq1a79f8hcDPQR9eBAbIHyN7y/yyQfQnEhkCskWM4/9uq/4TgfKxJQiK6e/a3pf/xwZlfo4AJkZLkP6zBKAAAGMt/2TouFxQAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"muteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABZ0lEQVR4AWMYjGAUMDEwMzCSpoUxju+kDQMXAW1AaRYGdiCGsFjchd/OWmELFMGrhd1a4UUTAy+QzXLSdKMhA1+Z/tuF0qIMTLjdz9tp+27ly/0M4kBbWGdqv1/gJcMgdLz6YAA2u9gYhBgkGGR2pH3ZfWf/1f0Mshdsk8UZBDYlXMthEJhqfbuVgQ9Tk9D//SD4dv/F/eeBkEHuaNjjegYBT/k78xiEOcWuLWIQxtQkcWI/MmSQYhC/shioUPjUAhB5cgFWTQf3I0MGaQ6JwyBNIofBmsAkpvN27UeGDPI349dXMghEKu2byyAsKLZ/IYMQzoBoTNm4e8v+LcCA2GBoKsQgcDFjcRqDwBr7dU0MfLiDnCfaavHKdaAgZ2ZgXWd4cZ6eJIPQ5YYZXgzseCNXQ35GPSRyt+lVaTLwTTA9NJdTmIGJ2GTEzMCSKPZifoklpj14jTDj6jJj4CI5nYOzxkCCUQAAMVp+znQAUSsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"muteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAABfUlEQVR4AWMYjGAUsDJwMLCQpoXRTnZZIoM0AzMBZQzcDCIMXEAWC5Dk0tZ6fK0uFyiCBzAziCh5Xd7PoAJkc64I7QxhUPWLf/yQ3xjoTByAjUExrvzB+5f/GewYOBn4cgOf3ddxYNDftH1OCza7BBgMGBwYfCas/fjnzv+r/xn8NiXYGTJoTZ25ZymDTn7W8UMMapiaDP6Dwdv/F/+fB0KGgJXtF3YyaGp7XLrLYMhqce4hgyGmJocT/5EhgxuD7ZknDEYMJgcfMBgzGB8AkZiaDv5HhgzuLPa7nwBNN90N1gQmMZ236z8yZAjcN3H+JgZNM+8tQOdxWm17yGCAMyBSV6//s+X/lv8Mvv2BChoM2hsXd89n0GnKn7+PQRV3kCvYlsx6v+4/gy0DOwNvU8SJO1LWDAb791bUMgjji1xhMc/u3QzKoMid6hPtxaCakrbzDqsBAytxyYgZmFQ5bfXu3Q1Lx7QHrxHykgWRDFJAA0gCLAzsQC0DCUYBAC3AlmbNhvr6AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAiklEQVR4AWMYWWAUMDKwMLADMUla2K0VnjUx8BKvhYmBt83m3cp3+xnEiFHOxiDEIMEgsz3l6+5H++/sB7KJAEL/94Pgu/1X918GQuI0SZzcjwSJ1XRgPxIk1nnb9iNBoCYSAqI6ZdXOtfvXAjWREuQ84VZzVi4DBjmJkassN7GegZe8ZDQSwSgAAJ/LQok1XVtuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"unmuteButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAQAAACY0sZTAAAAjUlEQVR4AWMYWWAUMDJwM4gwcJGihZlBRMnr0l4GZeK1sDEoxpQ+eP/uP4MVMcoFGAwYHBh8+ld/+vPo/53/QDYRwOA/GLz7f/X/ZSAkTpPDyf9IkFhNB/4jQWKdt+0/EgRqIiEgElct/7P2/1qgJlKCXMG6eNL7Zf8ZLEmLXGFhj5bdDMrkJaORCEYBAOZEUGMjl+JZAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"castButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABuUlEQVR42mNggAA2IBYCYgkKsBDUHDAQevr06X5KMdRQMJDYvXs3SECLTNdpQfVLwA3cuXMnigCJAEO/xPbt2ykyEF2/8NatW0ECwuQaCNUPNpAZiAVqamqsgTQXuQZu2rQJYqCXl5cQ0LkpjY2Nbuzs7BJQQ5lINXD9+vUQA8PDwyWPHz++4/Lly/uvXr26btmyZUkCAgKiQElWIGYk1sC1a9fCvczNwcEhHxER4T59+vTuEydO7APiqS4uLkpQQ4kycNWqVRADQ0JCxIAu7JgwYUI0CwuLWlpaWtDmzZu3AsVmqaurSwIVsRBj4IoVKyAGurm5iQKdO/fUqVP7Tp48Odfe3t4wNjbWG2jo3o0bN5YAFfES4XUJYFDBvQyKBBmgIX5r1qzZBHTZAh4eHrWOjo6GPXv27ARaqApVI4wvpyxZsgRiIDDsZM6cOTPT19fXLDIy0hvo2n3z5s1L8fT0tF66dOm+uXPnxldXV+vdunVrPz68aNEiSF4OCgqSBUU50GXTgQLSU6dOnbFt27YpIFfPnj17JdCCalA6JeBClNKGHYgFgZgfiDmhYcYL9SaI5iEyYsAAACZV+irLroZ6AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"castButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAABuUlEQVR42mNggAAOIJYAYgUKsATUHDCQePr06X9KMdRQMFDYvXs3SMCCTNdZQPUrwA3cuXMnigCJAEO/wvbt2ykyEF2/1NatW0ECUuQaCNUPNpAFiEVramr8gTQfuQZu2rQJYqCXl5cE0LltjY2Ncezs7CAbeIGYmVQD169fDzEwPDxc8fjx498uX778/+rVqy+WLVvWLCAgIAOUZAdiRmINXLt2LdzL/BwcHFoRERHx06dP33nixIl/QHzcxcVFF2ooUQauWrUKYmBISIgs0IXbJkyYUMnCwmKclpaWt3nz5k9AsXPq6upKQEWsxBi4YsUKiIFubm4yQOdeOnXq1L+TJ09etLe3d4yNjU0BGvpn48aNs4GKBInwugIwqOBeBsWsGtCQjDVr1rwFuuwqDw+PcUdHx+o9e/Z8B1poBFUjiS+nLFmyBGIgMOxUzwCBr6+vR2RkZArQtf/mzZvX6unp6b906dJ/c+fOra+urra7devWf3x40aJFkLwcFBSkDopyoMtOAQVUpk6denrbtm3HQK6ePXv2I6AFS4BsMQIuRCltOIFYHIhFgJgHiIWgmBdKCxAZMWAAABFDD0iNkbKIAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"castingButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAB60lEQVR42mNggAAOIJYAYgUKsATUHDCQ+E8FADUUDBRevXoFEnAAYgsoTSwGq4fqV4Ab+OLFC5CABZkus4DqRxj49OlTsAtBNKkYpg/ZQKmHDx+CBCxBNKkYZCCUBhvIDMQis2fP9gfSKjdv3vx07969/6RgkIFQGmwg35kzZ+omTpwYxcPDo6mmpmaybNmy6devX/9569at/8RgkIFQGmyg8Nu3b39++/bt/9evX1/u3r27lYuLSy87Ozvy1KlTz65du/afEAYZCKXBBvKKiIhol5WVpe3cuXMX0PB/z58/P+3u7m4dFxfnD3T9x0uXLv3Hh0EGQmmwgYJPnjzZvGTJkkpOTk6TysrKbKB3P718+fKKvLy8QUNDQ965c+f+48MgA6E02EChy5cv33z37t3/N2/eXA4ODnYrKipKuXr16s8LFy4sAsprAl1+6vTp0/9xYVA6hNIQLwOxWnFxcd7Zs2ffvn79+q6cnJz5ggULFj148OBXUFCQNVBeCYjN8eWU48ePww0Uef/+/en09HRfYESkAJ3+Z//+/f1OTk7uR44cAbG7qqurCeYgoFp4XhYDBSgwL14FpcNNmzYdunHjxkWQq4FevXb+/PmNQLY4EEsSW9pwQDWIAjEPKJJA4QoNCiEon5WBSAAAryiVoYy0dtoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"castingButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAB60lEQVR42mNggAAOIJYAYgUKsATUHDCQ+E8FADUUDBRevXoFEnAAYgsoTSwGq4fqV4Ab+OLFC5CABZkus4DqRxj49OlTsAtBNKkYpg/ZQKmHDx+CBCxBNKkYZCCUBhvIDMQis2fP9gfSKjdv3vx07969/6RgkIFQGmwg35kzZ+omTpwYxcPDo6mmpmaybNmy6devX/9569at/8RgkIFQGmyg8Nu3b39++/bt/9evX1/u3r27lYuLSy87Ozvy1KlTz65du/afEAYZCKXBBvKKiIhol5WVpe3cuXMX0PB/z58/P+3u7m4dFxfnD3T9x0uXLv3Hh0EGQmmwgYJPnjzZvGTJkkpOTk6TysrKbKB3P718+fKKvLy8QUNDQ965c+f+48MgA6E02EChy5cv33z37t3/N2/eXA4ODnYrKipKuXr16s8LFy4sAsprAl1+6vTp0/9xYVA6hNIQLwOxWnFxcd7Zs2ffvn79+q6cnJz5ggULFj148OBXUFCQNVBeCYjN8eWU48ePww0Uef/+/en09HRfYESkAJ3+Z//+/f1OTk7uR44cAbG7qqurCeYgoFp4XhYDBSgwL14FpcNNmzYdunHjxkWQq4FevXb+/PmNQLY4EEsSW9pwQDWIAjEPKJJA4QoNCiEon5WBSAAAryiVoYy0dtoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"trackButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAB3ElEQVR42u2VP0sCYRzHLwiFUm4oIcUGz4ZMsRqkhhan2hzyBWSvwMXhAsGlFxA46y2JeJpDIeEfDnV1UhdX/+Du5mS/LzyC2F09KDjdAx94nuf3fZ6PPj53CovFQtglgik0habwX+FasxDHhJfwM7xsDjUbcUZc6YB5G69wj7C7XK5AqVSSR6NRfj6f1wD6xWLxBTXKXNMazQhIeYX2SCQSnk6naqfTySYSiZgkSXcAfZpTUAuFQrHxeKwZwSu04NNPJhM1k8m80thHiMQ+A30fasPh8EMUxQiNw0SUeFrhgTjhER6pqio3Gg2FySzC74Y5H2WyyFL/Zpsj9Xa73Xw8Hn9m38aoiZSJIUv9+16vp63DKwz0+/2G2+1+pL6HONCRYc6DDLLUv2U3M7rJkQaazWY9l8u9z2azCo0lHaGEGjKtVquONezbbHSkF7TR52Aw0NrtNhYFdYRB1JCh7BfWYHP6TbVVeIX+arVaq1QqGmBHtd6ulnVk2Qth/SXA/eCf04NdK5fLGjASLuvIYo3RzeIROlOpVLpQKGiAxpc6+1wu68lk8g2XYxuh1eFwBGRZTiuK8m10aVBDhrI4Tus2QoFt4CROiUOdfQ5ZzfmXjEto/gGbQlO4c+EPA9e3TyseGL0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"trackButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAYAAAA/xX6fAAAB3ElEQVR42u2VvUsCYRzHj4awhq5AF3Mol5bSFjMSstYabGusuaVbHBwEsf9DpMDBF4QGB8FBhSYnvQahIfTEtsIg6AWevt94hLCzDoWm+8EHfi/fe74+j/eiCCGU/0SxDW1D2/BPw5FwgGXgBzsSv+xxtgg2wZ4J7C9aNZwBS263O1QoFC673e79qwzm+Xz+ijNo9sUvQVOrhkuRSOS43+8bjUZDj0ajSa/Xe0SYo3fLWSAQSBqGIcZh1dDBX9/r9YxUKnWNOgicYFbCPMhZp9N5UFX1DPUx0EDiG6dgxYqhO5fLXVYqlVtp5lB+BntBaHRqkR9Mc6T+ZrN5r2nahdzNuHBCk6QW+Umr1RKjWDUM6br+4fF4zpGvgwUTM/bWqaEW+aG8M7VJjjRUrVbfM5nM3WAweEa9YWK4wRk1tVrtndfI3Ux0pNtY6LHdbot6vc7GronhLmfUQPvEa7g4/lPxHauGO+Vy+a1UKgkij2o09oZzauULYfQlYPnB38KD/VosFgUZZzicU4s6MO7OsmK4mkgkbrLZrCCowybrhIfzeDxe5c0xjeG8y+UKxWKxm3Q6/YLaZ7KOjzNqoOVxzk1j+GXKnYI1oJqso8rZqtQqExvaH2Db0Db8d8NP8a/SZovcDd8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"fullscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5ElEQVR4Ae3KsUrzYBhH8RPIFAJ5O3/ig5COgVyHW7N09x7aXSrESafuHeLi0A6iGEX+Y3edLMqnpe7egfbFMZCMXfo762GH9gIijIx8W0rcMQ9tU/3oL9KOGXdYLOuNfOS0CrGLyVr/fZ1zMht9a6VXqV6JjFa9efmiZ43PDoqnCqMh8BGS4IjpT8vTMYY7NiIaooHhsNnovqRPTA9HSOCjwT6ro+Jy8qV3PZT0aJUt9VavdadbnY9IaJUv9KiF5jqZYIQd87V80/rfAEdAq/RKvht9VEPrmmNS8m0ZRkTAzuz9AlNJVl+tEWchAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"fullscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA5klEQVR4Ae3MIUzDUACE4b8VlU1FaQWEBPlQna+oxqHm0dTicShQcyWZwSBWEgohEIKcB8UKAZbhcZXHmsw1eZUz+357OdZow8HHkJItSwiwcodmUWuFpO852s2nzUJtZFh5mPNyrq+23nE4Lv4007templIsYon1ZtedXKzkz/XGDocXBw8QiICBqPq9JJ9ogODT4d/aIgw4+KhYkBAzBbe6qLD/NR7+UX5q089VsRYpVN9NHPd605nBSFWWaknlZroqMTg9Yyv1TZqto+JcLBKrtR2q+96aHCxCkjIlqUYfBzWZuMfAHJlDLF+xFEAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"normalscreenButton" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA50lEQVR4Ae3KsU6DUBhA4QMNAtsNFcJLyKBx8mXYmNxkculDuJG4OOOmcbr/QNS1xKaJqxJjTJpUk84KuHW4d+nY76yHvV1zxlx8AiZYeJeHBKgmX14wte1qXZ1l98VG/8iyJMQo+ZJVvdGddPohx8co7eRThvWmQOFa5ncZWtSnRwQ4GEVvMvQh62oW2+YDItK+BIW3PTt4KJJxiPrVyJnF39Wv/EdkmQlOsqd6IUOkGLmou+JVv0ifdfabfKVbaXVTt0KCUfhczmWur4rj7LFCYTRhelte5yiC8xgPbHuIj4sztrdbfxJjV3K8mZ7yAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"normalscreenButtonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAeCAQAAACC7ibdAAAA7ElEQVR4Ae3Sr07DUBzF8e+daKaaiaYNAoH8uc43pK+AmsHimETxDAQBQZVkCQhAUFMBewkUCG4W/ib4haTykCYzmFszuc+xX3lYtw3HAEdEQsqQHvGekWKz6qFh3Jfbl9+Znta/WmrekBFU/GjRLvWuN11UJASVXh/yetVxjRH1xM/qNm+3D0lxBOVP6vaiTz8xBgSNyCkpKTBiHP84YoyiC8gZETSY2LfXCjlBjnRretk26kZJUISd1I+679YbJ7NqoTvd6Ly9FQVB2ay51pX262x65jGChoyPmoMKI901YujLMxKi1TnXa+MPEjlkhvYbWGMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAeCAYAAADpYKT6AAAAFElEQVR42mP4//8/AwwzjHIGhgMAcFgNAkNCQTAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAYAAABaKIzgAAAASElEQVRYCe3BsQ3AMAwDQRIW4Cqlkf031AZKVkg6An8nAQCAH3zOPQpQe28lqJcS1FpLCcpWhJKsBGVbCaq7lcAzcwkAAHz0AE0SB2llBfTtAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeElEQVR42tWKQQqDMBBFB3cFt9oQQ0wniW51b5f2ti30ZLX1AN+ZQA/hhwfz/zw6eZrmmoWn8NUyCh9jLJzzoLY1L2sd+v6GEBikmh7MCTHmYvyYI1LKBeo69/Y+SBkKtCz3SaztPxKAal0fs5ry2Emjo3ARajpNDtqHL/b2HUUVAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRailCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAYAAAALvL+DAAAAeUlEQVQYV9WKOw7CMBBEV3RItAmWYzlmbUMLfSjDbUHiZASFfpj1LTLSW+18RLarrjt+yZPUFoQQ4ZwHgw+5SEqKcTzB+4C+dy/JuUK1wAouVimlwlDNtvgxOMOIMWEYwrsFZtgu03S/Cp/Vmnl+3ADshOdA9s1sSn8goC/6ib5oHgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAeCAQAAADwIURrAAAALElEQVRIx2NgGAWjYBSMRMD4/z/1DWW5TQOXsnwdMoZ+GyouHQWjYBSMTAAAnO8GxIQ7mhMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANUlEQVQY02NkgAJGOjH+9zEkAxm/JrzJ/wYSufTxLx9Y6shHBghj10SGPKji9RMYkhjp6EIAcaIN1SJ2FnYAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeProgressCapRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAeCAQAAAChtXcIAAAANklEQVQYV2NgoCP4//F/H5hx5/+z/78mABnn/5//f+kzkHHkPxCCGLv+A+FEIGP9p/UgFXQFAHkZGwN2fDIsAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"display"\x3e\x3csettings\x3e\x3csetting name\x3d"bufferrotation" value\x3d"90"/\x3e\x3csetting name\x3d"bufferinterval" value\x3d"125"/\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAYklEQVR4Ae2VwQ2AMAwD/cgKVRbJuAyH+mOBfMMQyBKCuwWsxoaLtfKQkaiqtAZ0t5yEzMSMOUCa15+IAGZqgO+AFTFTSmZFnyyZv+kfjEYH+ABlIhz7Cx4n4GROtPd5ycgNe0AqrojABCoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"backgroundOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA0CAYAAACQGfi1AAAAY0lEQVR4Ae2VsQ2AQAwDXWSFF91Pkf1rxkAZIm0YAllCcF7Aiu3/i7WOU0ZFZm6rQXfLaiCzYkbuC+b1EWHATM3iHbAiZkrJrIiSP/ObQjQ6gAcg8w/AsV/w2AEmE1HVVTLqBmJaKtrlUvCnAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA4UlEQVR4Ae2XwUoDMRRFT17GTscIMoWOqwF1WUSFIv6Autf/X5TuxG6FBkOeHfAHpk+GLnI+4HBzLzyI44/l8uoBeAVugJqRuIMA4L1t24+u685DCGci4hhJBdwPkr7vL3POLsaIqnKM6G2xaJuUksPAILquqtlMFayiuYhzYDMJIygi+2qonloi0CkTldXK/NOXXVYrZRs6UgyUjsrxL6d28sP2b4n0xJ62z1nVHbCutolx/4MRH8LFt6o+Nc28tqTyq9Xd5273RUrpVsSL915gvNCt188MbLebR+Dl2K/oL+WmRveI4jXNAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeftOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA5ElEQVR4Ae2XMU7DQBBF346sIDAUDoqprNBCm4Im3IPcAE7EEbgId6BF6akQjheZGTYSF7DXQi7mSdM+zf4vjbSBP1arqy2wA26BUwZSJAHAY1VVT3VdX5RluZDEYBGwPUqaprlUVYkxYmaMEe2Wy+q873shgwK4KYrFiRnkis5EgkCeScjHRQNaw2xuG4HNYiNvzeufPmxvzcPOz8jIwDPy4++n9t8P22Qb2cye1qqahhAkt7W3GLvvKep/+Uyo/igYY0fW6+vXtv16/kgcDl2nagkYOmGzuePIfv9+DzyM/Yr+AujSfWZZzzLnAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA20lEQVR4Ae2XQUrEQBBFX4e29QJDVgFv4Cb7wSt4Ps8wLtw5B3A97mfmAFlkkbaZMpAynkBiBRGpd4Ci6j/4UGGzqR9ZjgBn4AV4A4ht29YsZJomzTnXXdfd9X2/A55iKYWlhJmU0nXTNAl4mIedwnZ7/4wBkcvH8Xh6jaqYiDFdAbcRFAtVFQJwU7ESPuh7zPrX3wj0T2zk1lz/+mG7NQ/bnpFixDPy8veq/dViW20j/W+drTOAmK2JXEbgbDrt628bhqEA+x+dpjMiMuY8lFLed8DB+orugQPAJ8i7bEsKl1PuAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capRightOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAA0CAYAAACHO2h8AAAA2UlEQVR4Ae3XwUkEMRTG8X8eIaLgwYXF0xRgKYsVWIIVrR1sI3uwANkSvMxhDhOzRoZ5pgOZSZiDvF8Bjy/vgwdx+/3jO8tdgQtwAs4A7nB4/mShuYgx5r7v4zAMR+DNp5RYyjknIYTbrutugNcy7ENYQVUpoZimSXa7h3vgxatSxfsQgCcPdZNEnAB3QiM26G/V9bdPBLp9ImvN6t9y2daaLbtiR0ol25Edfzu1mx62Zon0v91sVZ2Bq1Ap5+8f4FL1tLkYC+C06mla5CLGcUzp6wicm31FfwHzmG90m7lXIAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"bufferIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABGElEQVR4Ae3Rr0pEQRSA8Zl1b1uDQTAt4j8QES1qURZvEf8lfYJVsfoAisYFq9mgyfUFVptgMtk3CAaD6DN8HoYbFhk9w9x0Yc6XDsv8LrNj0vgnTZo05LzzyR7m/wxafQC+sDHQENkv6DsG2uFV2i62nDc+2C82SybVwqAX+tIzxlOdzBUEPTnosTy0wgM9lryQpS7pVwutetAiN3RZU481mJYaf0PX9KR7rALNMCtNaVC3PLTALXesYpSGlatFVDFonnNOmfQeGKHFOqNhUIcr6cwLtdiVNkIgy6WDLrxQ7qBNrApJy0J1mCu2CY6k4qKMCbJFM/TPHvzeASfS8cBvtbhXazvosPzzN2lL4/GQXoISlKAqQz+eXnU2Tp6C2QAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"errorIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"errorIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAAB3ElEQVR42u2Tv0sCYRzGv5WFJIVgkEVLSy1ObWGDUE0OgdRYtBZC/QENFv0DDTW0FEYJGkgEBUZCEFxYlJpnEMSpUxpBNAkiT++rlb+uvNOpuOcz3Pt+j3vgeN8PkRYtWv5Z2qmb0d58kXl7ZXuFzM3W6E3jybfUW+8E6ZupaaXB3ZNnPGPnlAbZruF02ebTuRRSSOds89TVaE0bWYJiEhIjiaBIFjZpKKaF1TSePknDuUamRmo6dKPRzCNKRDO6UepQW9NCAxseCXHGlHvKzZ8SNjw0wN6oSqfFIWXvwSE72YsrKWtxkEHdsQ/5hRjuCpCNbMVVDEdXNKzmGhhnlqT8DYrwoq+1lJ9ZIqNyu0aERAhXn/Cir3UIQoJGlJpndm2KuPyGF5V2IlxbyszTmybi7xcowYvK9/H3/sn65hXsEnBeBi8q3wuKzGN2PeQCKIcff+Xkoa55zK4zMYCTCubcs+7KSQBn3DzdL3Ytrt3iuIpXRvXsFs516vnFruuMH8oI/Whewa4gDmsY8435aqfBH81jdoWzXtTi8Dm8cvOwrHkFu/zwyJDBi+yc/aCMecyuUH4f6rjOTy9Xm9cXiRxgTyX7iESor7LIQENk5XdYFVb2lYG0aNHyF/MB+x5LQiE6gt8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"playIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHUlEQVR4Ae2Vu0oDQRRAB2xSWVmmtQncLzFREUUsnW/wJ0SCWgQV8TUQBBEsjlgIFoJFCsFCCT5QgwZFtPGtncUWIcTZnd2pAnNOf2Bn5t5VgUCge8mpPtWrevxD+cbi1KTq948VXvjlbMM/Jk2aPPPjHZM7Ip88Y3JLy0e+M8fkmnYfMsbkkk7v+Uodkzr/2+AzVUxOsXvDh3NMToj3inenmByT7AVviTGp4WadV85XK0WVs4SOcHd3rVyyhg5xc91M6NhPOyDZFTOuEw97n3iXzZh2uv497C6YUe38ILFQMSM61Yjs0Om8Gdaph3abdmfNkM60RrZoWTaDOvNi2yRyxpQsETcKVapMm6JHJCI/tzTgEfH4QXYxgUDgD+1pwmmFlV3oAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"playIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAABHklEQVR4Ae2VvUpDQRBGt7BMaekD5AEsU0zvL6KI76CdL6FDUItgIYJNEERIoVgIFoKFhWChBBNRYwwZRBv/tfostgghuXf37lSBPac/cHd35ppIJDK45MyIGTZDRk2+UVteNaP6WOEVf7hu62PUQgsv+FXHqAnrszJGD+go+AmO0R26bQfGqI5en/CdOUZV9LeBr0wxukKy9/j0jtEl0r3Fh1eMLuC2hndnjM7hZxVvuHksLZpcQugM/h42i0uJoVP4uSMLnPppJ3C7LfPsPOxjpLslc+x1/UdIdlNm2ftBHqC/JZnhTCNSQa8bMs2Zh3Yf3a7JFAetkT10LMokBy+2XVhZJgIjlkIZZazIuCJiya/Xx9QR/Q8yEokMFv9/Ax7UXjl24wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"replayIcon" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADOElEQVR4Ae2VUWhbVRjH/0nqdk0m0eTGITVZNsmiZCLTlooNPoWlbk27lzmGSIeyh7YgFSYaGO2yDZk4GMi65kG9d6kkbfCuyf1bqZmmlsYxCK51KwxkrpM4qBRla18cIngvw0qgN7ea1/z+L4fDn4/vO+c730G9NGjQQIALj8CKumn+afjIQWyDHRbUxTO/8w/Ojux9Bc0Q6gn27B3eoRZM5Zm2l7EVm/5bMAsEiPAjiFiFun7hXa5MjJ7Y1gI3mjYaxA5vZzSdmJeWlfvqz/xHFd7jr5+fP+rYgU0wpQlibE8peV+9yyVWeJuLVapwleU4tsCEh9B8sn8lt8SbBprJvHUEXrOMmuCVj61o9h81fXEhEY/GHAf09QOVlaF3N4fgNDsjCzxnBn7jDU3T2TfexE64IeC5G9Q1lz/7/vY2iBs5aHtndCm/wAXmUtvb8ShsD/pogdf46bm2CJ7Qr16THY87t0Iwzsf77ch1/sBCdmcYjrVuaZ4813UAPjwMC3SXsztS+ujqWTxp1E9CV8ct9Sq/56EeOGGpemtb1t6a9bXdq7nbvKV2dRjlJKaOl1lm+gICsME47x1jsu5LHYeIdfEXpCu8wsE43KiFezCu+woS/FiX4KxSYon7YhBQC2FfTPfNKghiXUIldYYzdLfChlpYxRbd952KkEGgr9Uii3z6JbNAnhbd941hoOBF5RIv8WC3SWmbuzt130XD0vyfSFOc4gfvwIVauD48qvs+Njxs8URikpOckmtevw2Br2Tdd9Lw+oVIR15VeZl91Q1Z3UXOvp7LVJlXI4YNaYHvdHKCE7ye3fXvE6l2OHaFr43rntNJ+IxHrj0czeQVFjifCrbDCRuqi3IG2+dTBSrM5MNR2GuOkcMD48xymotZrcAAXBBghQ0C3Aj09Sxmp5nlOA8PwAOLyWDrPZbhGL/kMufkkff2xx5rferFQ/vPx+fkZW13jBn2D8KrOc1H7av9ci7NNIu8yVX+xT95T1sVqe/J+dffhldzYUPD/4U9Q8lR9TNWa5RDyeej8BhkY/Qd7Y72Jk5Jw4qkSuqwckrqTbTuhc/44zb/IEOagtpK/N8fdoMGDf4G6kd7103/csoAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"replayIconOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0CAQAAABI31KIAAADTElEQVR4Ae2VX2xTZRjGH1iBzDMrU6lxLdOFhLJ/CepwTWCJiUSTDTdilikxJmAo2GlJ9I7EsCgkw6jRG5ALtZNJy7QDiwxK0dZllSypssqatCHIMKdzM4uEnUUrtj2P57uAULNzOtltf8/Nl3OevHnf73u/70WJxVKiRAWqcD/KsGjsvyScb6EBZizFoth4nX9zJNn6KtZCwhLcNU9NcpJasPw3o80vogbl/y/YUkiwoRHNcMsUSvMGlX/6zz3SCiuWLzSIGXVbnN5gXJ7566b6K29J5ix///PwMWk9ylGUZVj93M5o6qZ6g9OUeY0TBZI5x9ggKlGEFbDvP6Jkp3lFR8PX93yEOpQXy6a2L6Bo9suaTv/2tv/ZPdLey7ylWKZnYEULLFhWbG+q3/f8waSmiPLKB3gSVkh4OkmhsdyHkZoO2Bay0eYtzulcggl+PVXTiYdggmBjgpf42XjzDqwRRy+OAo/eVwNJP5+675Pj/JkhZW0XVt7uFvvQePte1ONezSFclo4d0fjFH7FOr9Ol9l1X1Yv8idt6Ybmj6SRUofL2XSt76Zm57DVeVdt36eVkO3o2xhi9k9gAE/TzXn88LXxHz8KGeWkMyaMc5T4/rDDCus8vfCEZjZgXx0gmyijb3JBghNTmFr6RDByYl5ZofpjDfKANJhhR9mCr8P2QR4tOoG/zYYa57vligVa1Ct93uoEcJzLneZ4vvIEKGHFPx+vCd0K3tMZP5SCDfNeLKhjx8HvHhO8T3c22vRMc4hCDaTQZFGdC07m08O3XPX5p8+6AeooX2F3QkAUsgaW79wJPMaBu3g1Jr9XqD6ZO8iTHlYY7rkhBmJUNXZdmhedgCvX6w8C8yenLDTLE+JS9ExaY/lOUxd4ZnwpxkL7cJifMhs/Ids8Av2SEE4pWYBOqIKEMJlTAiqbu3gklov0d4HYPqo2H03LUugI+HucZznAs/fFXW92VbWu2bnvzsH8sPcMz2h8fXzuNWs1Z/KntOtKX9dLLMK9wjnlmOautwhTf+nIvf446zYUFPf5P7OxJ9atfsFD97Ek97kS1TjZ64+gxpyt4QD6U8age9VDmgOwKbnChXn9wFxuQDrRocmir1ai4y+lfokSJfwEhAcqxd5L4JgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"dock"\x3e\x3csettings\x3e\x3csetting name\x3d"iconalpha" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaactive" value\x3d"1"/\x3e\x3csetting name\x3d"iconalphaover" value\x3d"1"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"button" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAxklEQVR4Ae2YsQ3CMBBF7+yIximQSERSMgYNI1AxJgswAaMkLREpEnQ2Z6Chooqwpf+k65+evhtzXW8LIjrp7fUcpcmod9U7v2Sbpjm2bVtaa5kSRERC13V13/ePIpatqk05zzOHEChFWImOKnyIwk7EMyXMJyTrOUOZAeGlKd4byUtYCZjEN9gwCuPRYRKYBCbx18JLJ0bh3IQJk/gFHh0Ko3BWwqOID8YYpoTx3ofoap0r18y0WymspCo7DLf7NE2X7L5bnyz7UgI6sO7WAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"buttonOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAzklEQVR4Ae2YMU7FMBAFx04osQvyRQIX4nfcgRZOAxW3oMqRkhKbBkWyjVfiCiD7a0dKPxq9dZHxdLq9Al6AB8DRJl/ACryOwPM8z0/LsvhhGCwNklLK27bd7fv+LcLnabrxx3HYUgotYoyx4liFH0XYpZQtDfMb0orrSGeo8L8Il9Jd4dL5JFRYN6xHp5PQSegkLuwd/uPEWrg3YXQSenRaWAtfVOGYUs62QsPkiriK8Brj571z3ot0q7IxhgB8iPBbCMHU7wxcN/679f0HQzRYj4Eg/3AAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"buttonActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAgCAYAAABpRpp6AAAAwUlEQVR4Ae2YsQ3CMBBFD8e0CVESUcFMpGMKapgAKvagymKWiF3RxMe/IUDn6J70I5dPX98u4odhvyWiG3JCdqSTiEzI3eNz7fv+0nVdW1WVI4VkEEI4IB8RHjXLCg6II4TPXmbgADOTZhwQV0+F4ekPmDBzcQ2zTcKEC9+wXTqbhE3CJrGyd5jpp1jDxb0SNgm7dNawNbyqhudlydkBUkwG4irCU0rzsa6bVqt0BinFN44vEX7EGDfIiHOj/Hfr8wvCZ0/Xf6TpeQAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAgCAYAAAA1zNleAAAAD0lEQVQoU2NgGAWjADcAAAIgAAEeEYatAAAAAElFTkSuQmCC"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"playlist"\x3e\x3csettings\x3e\x3csetting name\x3d"backgroundcolor" value\x3d"0x3c3c3e"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0x848489"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xb2b2b6"/\x3e\x3csetting name\x3d"titlecolor" value\x3d"0xb9b9be"/\x3e\x3csetting name\x3d"titlesize" value\x3d"12"/\x3e\x3csetting name\x3d"titleweight" value\x3d"bold"/\x3e\x3csetting name\x3d"titleactivecolor" value\x3d"0xececf4"/\x3e\x3csetting name\x3d"titleovercolor" value\x3d"0xececf4"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"item" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEU8PD44mUV6AAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABMAQMAAAASt2oTAAAAA1BMVEUvLzHXqQRQAAAAFklEQVR4AWMYMmAUjIJRMApGwSgYBQAHuAABIqNCjAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"itemImage" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAAA2CAMAAAAPkWzgAAAAk1BMVEU0NDcVFRcWFhgXFxknJyozMzYyMjUlJSgrKy4jIyYZGRssLC8YGBobGx0kJCcuLjAiIiQaGhwjIyUpKSwkJCYaGh0nJykiIiUgICIwMDMqKi0cHB8lJScdHSAtLTAuLjEdHR8VFRgxMTQvLzIvLzEoKCsZGRwqKiwbGx4gICMoKCofHyImJigmJikhISMeHiAhISRWJqoOAAAA/klEQVR4Ae3VNYLDMBQG4X8kme2QwwzLfP/TbeO0qfQ6zQW+coRxQqYl4HEJSEACEvA8NQamRkCoF40kNUxMgC3gc0lrtiZAB1BKuSOPDIzcXroB0EtL3hQXuIHLNboDC+aRgRnQ6GUAjtBEBmrgdcwA/OCyuMATraOvBiB3HBQTOJ8KZp5QwwXoA3xFBdrVjpPnHVgBfQfjqMChZSoAugDMwCsqUMFeAHwEwMFnXKDkshGAz5YAEOIC2fpbAqhUAMDG4AcO3HUAahkAHYykOQATC6Bsf7M7UNotswLwmR2wAviTHVAAHA2BMXCWIaDC7642wIMSkIAEJCABxv0D1B4Kmtm5dvAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"divider" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANIAAAABCAIAAAAkUWeUAAAAEUlEQVR42mPQ1zccRaOIzggAmuR1T+nadMkAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAYAAADErm6rAAAAHklEQVQI12NgIABERcX/Kymp/FdWVkXBIDGQHCH9AAmVCvfMHD66AAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAKCAYAAACuaZ5oAAAAEUlEQVQoU2NgGAWjYBQMfQAAA8oAAZphnjsAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAX0lEQVR42q2P4QqAIAyEewktLUy3pKevVwvpAdZO+q9Qgw+OO25jQ88YM2blUAp4dW71epfvyuXcLCGsFWh4yD4fsHY6vV8kRpKUGFQND9kfHxQsJNqEOYOq4Wl2t/oPXdoiX8vd60IAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAXElEQVQY02NgIADExCQ+KSmp/FdWVkXBIDGg3BcGSoG0tMxGWVl5DAtAYiA5ii2wsbE1ALr0A8hAkKtBGMQGiYHkKLbg////TK6uboYg1wIN/QzCIDZIDCRHSD8AB2YrZ5n2CLAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"sliderThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAABCAAAAADhxTF3AAAAAnRSTlMA/1uRIrUAAAAUSURBVHjaY/oPA49unT+yaz2cCwAcKhapymVMMwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"sliderThumbCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAAMElEQVQI12NgwACPPt76f/7/kf+7/q//yEAMeNQH19DHQBy41Xf+/ZH3u4hVjh8AAJAYGojU8tLHAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"sliderThumbCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAQAAAA+ajeTAAAANUlEQVQI12NgoAbY2rf+49KPs/uIVH54wrH/h/7v+L/y//QJRGm4/PHa/7NALdv+L/6MKQsAZV8ZczFGWjAAAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3ccomponent name\x3d"tooltip"\x3e\x3csettings\x3e\x3csetting name\x3d"fontcase" value\x3d"normal"/\x3e\x3csetting name\x3d"fontcolor" value\x3d"0xacacac"/\x3e\x3csetting name\x3d"fontsize" value\x3d"11"/\x3e\x3csetting name\x3d"fontweight" value\x3d"normal"/\x3e\x3csetting name\x3d"activecolor" value\x3d"0xffffff"/\x3e\x3csetting name\x3d"overcolor" value\x3d"0xffffff"/\x3e\x3c/settings\x3e\x3celements\x3e\x3celement name\x3d"background" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAACCAYAAABsfz2XAAAAEUlEQVR4AWOwtnV8RgomWQMAWvcm6W7AcF8AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"arrow" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAADCAYAAACnI+4yAAAAEklEQVR42mP4//8/AymYgeYaABssa5WUTzsyAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAHUlEQVR42mMUFRU/wUACYHR1935GkgZrW0faagAAqHQGCWgiU9QAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAECAYAAAC6Jt6KAAAAGElEQVR42mOwtnV8RgpmoL0GUVHxE6RgAO7IRsl4Cw8cAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"capLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mMQFRU/YW3r+AwbZsAnCQBUPRWHq8l/fAAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAACCAYAAACUn8ZgAAAAFklEQVR42mOwtnV8hg2LioqfYMAnCQBwXRWHw2Rr1wAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capTopLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR4XmMQFRVnBeIiIN4FxCeQMQOQU6ijq3/VycXjiau79zNkDJLcZWvv9MTGzumZta0jCgZJnkAXhPEBnhkmTDF7/FAAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capTopRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAPklEQVR42mMQFRU/gYZ3A3ERELMyuLp7P0PGTi4eT3R09a8CJbMYrG0dnyFjGzunZ7b2Tk+AkrswJGEYZAUA8XwmRnLnEVMAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"capBottomLeft" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAAMUlEQVR4AWMQFRU/YW3r+AwbBknusrSye4JLslBdQ/uqpbX9E2ySrEBcBMS7QVYgYwAWViWcql/T2AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"capBottomRight" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAECAYAAABCxiV9AAAANUlEQVR42mOwtnV8hg2LioqfYMAmYWll9wQouQtD0tLa/om6hvZVoGQ2A0g7Gt4NxEVAzAoAZzolltlSH50AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"menuOption" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"menuOptionOver" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAYAAADkIz3lAAAAcklEQVQoz2NgGLFAVFRcDoh3AfFnKC2HVaGYmMQeSUnp/7Kycv9BNJB/AJeJn+XlFf8rKir/V1BQ+g/k/8SqEGjKPhkZuf/Kyqr/QTSQfwirQm9vX3WQYqCVX0G0p6e3BlaF////ZwJiLiDmgdJMwzr2ANEWKw6VGUzBAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"menuOptionActive" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAARCAQAAABOKvVuAAAAdElEQVR4AWOgJ5BhcGQIBWIZhJCsW+6jS7+/P7rklssgBxN0un/59f+n/1//f3SVwQUmGPrs+6P/IPj8N0M4TNBl/+Vr/0Hw4FUGN5igkm3ursvnf+y6bJ/LoAwTZGZQY/BgCANiNSCbASHMwcANxMy09DcAxqMsxkMxUYIAAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAFCAYAAAB1j90SAAAAE0lEQVR42mP4//8/AzmYYQRoBADgm9EvDrkmuwAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAXklEQVR42n2NWwqAIBRE3YSmJT4KafW1tZAWMN2RPkSojwPDPO5VAFSP1lMRDqG+UJexN4524bJ2hvehQU2P2efQGHs6tyCEhBhzg5oes7+PlcWUVuS8Nah5QLK77z7Bcm/CZuJM1AAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeRailCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAYAAAC+0w63AAAAWklEQVQI12NgQAJiYhKfVFXV/6upaaBgkBhQ7gsDLiAtLbNRXl4RQyNIDCSHU6ONja0B0OQPIIUgW0AYxAaJgeRwavz//z+Tq6ubIch0oOLPIAxig8RAcshqARVfK+sjJ8UzAAAAAElFTkSuQmCC"/\x3e\x3celement name\x3d"volumeRail" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAYAAAC6qQkaAAAAXklEQVR42mP5//8/AwyIiUn85+bmZmBkZGRABiA1X79+ZXj16gVcgoUBDaBrwiWGoZFYMCg0MpKnkZFxCPlxVONw0MjIyDgaOCM7AdC7lBuNjtGiY1TjqMbRwooijQBUhw3jnmCdzgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgress" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAA0CAAAAACfwlbGAAAAAnRSTlMA/1uRIrUAAAAmSURBVHgBY/gPBPdunT+yaw2IBeY+BHHXwbmPQNz1w5w7yh3lAgBeJpPWLirUWgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapTop" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAANElEQVQI12NgIA5s7Vv/cenH2X1YpA5POPb/0P8d/1f+nz4BQ/Lyx2v/zwKlt/1f/BkmBgDJshlzy7m4BgAAAABJRU5ErkJggg\x3d\x3d"/\x3e\x3celement name\x3d"volumeProgressCapBottom" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAECAQAAAAU2sY8AAAAL0lEQVQI12NggIJHH2/9P///yP9d/9d/ZkAHjybCJScyYIJbE85/OvJp1wQG4gAADBkams/Cpm0AAAAASUVORK5CYII\x3d"/\x3e\x3celement name\x3d"volumeThumb" src\x3d"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAQAAACMnYaxAAAA/klEQVR4AYXQoW7CUBjF8f9IYWkgq2l2k8llrmJBTOBxsyQlJENs4236CDhEywNUIEGh12WZuYDC4W9A3B2zhTVLds8VJ+fnPv5/FzQIaHGptNQaWn4ooM0DA56VgVpbi1hEk2vSvNjbozu6vc0LUi1NCQFXDBflwW/9p7L1B78oGRJJCOnN8o3/OMvGz3J6EiLStdX0K2tLKiFm8n6qY3XiVYL5C98cLxL90dLWcWkZSYjpZ0Uds4K+hIg7nqblOU1LxlojCDF0GWfz1a5ylVvtsrmoi5EQ0OGGhEdNE2WslmjpSND5VAy3mu6VRM1o0fm+Dx8SEWOUWC3UIvoCCFqphCwr/x8AAAAASUVORK5CYII\x3d"/\x3e\x3c/elements\x3e\x3c/component\x3e\x3c/components\x3e\x3c/skin\x3e')
    }
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = d.events,
        e = c.state,
        f = a.css,
        g = a.isMobile(),
        h = ".jwpreview",
        b = {
            showicons: !0,
            bufferrotation: 45,
            bufferinterval: 100,
            fontcolor: "#ccc",
            overcolor: "#fff",
            fontsize: 15,
            fontweight: ""
        };
    k.display = function(d, j) {
        function l(b) {
            if (D && (d.jwGetControls() || d.jwGetState() === e.PLAYING)) D(b);
            else if ((!g || !d.jwGetControls()) && T.sendEvent(c.JWPLAYER_DISPLAY_CLICK), d.jwGetControls()) {
                var f = (new Date).getTime();
                U && 500 > f - U ? (d.jwSetFullscreen(), U = void 0) : U = (new Date).getTime();
                var h = a.bounds(u.parentNode.querySelector(".jwcontrolbar")),
                    j = a.bounds(u),
                    f = h.left - 10 - j.left,
                    n = h.left + 30 - j.left,
                    m = j.bottom - 40,
                    k = j.bottom,
                    l = h.right - 30 - j.left,
                    h = h.right + 10 - j.left;
                if (g && !(b.x >= f && b.x <= n && b.y >= m && b.y <= k)) {
                    if (b.x >= l && b.x <= h && b.y >= m && b.y <= k) {
                        d.jwSetFullscreen();
                        return
                    }
                    T.sendEvent(c.JWPLAYER_DISPLAY_CLICK);
                    if (M) return
                }
                switch (d.jwGetState()) {
                    case e.PLAYING:
                    case e.BUFFERING:
                        d.jwPause();
                        break;
                    default:
                        d.jwPlay()
                }
            }
        }

        function r(a, b) {
            Q.showicons && (a || b ? (G.setRotation("buffer" === a ? parseInt(Q.bufferrotation, 10) : 0, parseInt(Q.bufferinterval, 10)), G.setIcon(a),
                G.setText(b)) : G.hide())
        }

        function s(a) {
            C !== a ? (C && z(h, !1), (C = a) ? (a = new Image, a.addEventListener("load", y, !1), a.src = C) : (f("#" + u.id + " " + h, {
                "background-image": ""
            }), z(h, !1), F = x = 0)) : C && !M && z(h, !0);
            A(d.jwGetState())
        }

        function t(a) {
            clearTimeout(aa);
            aa = setTimeout(function() {
                A(a.newstate)
            }, 100)
        }

        function A(a) {
            a = O ? O : d ? d.jwGetState() : e.IDLE;
            if (a !== R) switch (R = a, G && G.setRotation(0), a) {
                case e.IDLE:
                    !L && !J && (C && !K && z(h, !0), a = !0, d._model && !1 === d._model.config.displaytitle && (a = !1), r("play", v && a ? v.title : ""));
                    break;
                case e.BUFFERING:
                    L = !1;
                    n.error && n.error.setText();
                    J = !1;
                    r("buffer");
                    break;
                case e.PLAYING:
                    r();
                    break;
                case e.PAUSED:
                    r("play")
            }
        }

        function y() {
            F = this.width;
            x = this.height;
            A(d.jwGetState());
            B();
            C && f("#" + u.id + " " + h, {
                "background-image": "url(" + C + ")"
            })
        }

        function m(a) {
            L = !0;
            r("error", a.message)
        }

        function B() {
            0 < u.clientWidth * u.clientHeight && a.stretch(d.jwGetStretching(), q, u.clientWidth, u.clientHeight, F, x)
        }

        function z(a, b) {
            f("#" + u.id + " " + a, {
                opacity: b ? 1 : 0,
                visibility: b ? "visible" : "hidden"
            })
        }
        var u, q, w, v, C, F, x, K = !1,
            n = {},
            L = !1,
            J = !1,
            M, I, G, O, R,
            Q = a.extend({}, b, d.skin.getComponentSettings("display"), j),
            T = new c.eventdispatcher,
            D, U;
        a.extend(this, T);
        this.clickHandler = l;
        var aa;
        this.forceState = function(a) {
            O = a;
            A(a);
            this.show()
        };
        this.releaseState = function(a) {
            O = null;
            A(a);
            this.show()
        };
        this.hidePreview = function(a) {
            K = a;
            z(h, !a);
            a && (M = !0)
        };
        this.setHiding = function() {
            M = !0
        };
        this.element = function() {
            return u
        };
        this.redraw = B;
        this.show = function(a) {
            if (G && (a || (O ? O : d ? d.jwGetState() : e.IDLE) !== e.PLAYING)) clearTimeout(I), I = void 0, u.style.display = "block", G.show(), M = !1
        };
        this.hide = function() {
            G && (G.hide(), M = !0)
        };
        this.setAlternateClickHandler = function(a) {
            D = a
        };
        this.revertAlternateClickHandler = function() {
            D = null
        };
        u = document.createElement("div");
        u.id = d.id + "_display";
        u.className = "jwdisplay";
        q = document.createElement("div");
        q.className = "jwpreview jw" + d.jwGetStretching();
        u.appendChild(q);
        d.jwAddEventListener(c.JWPLAYER_PLAYER_STATE, t);
        d.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, function() {
            L = !1;
            n.error && n.error.setText();
            var a = (v = d.jwGetPlaylist()[d.jwGetPlaylistIndex()]) ?
                v.image : "";
            R = void 0;
            s(a)
        });
        d.jwAddEventListener(c.JWPLAYER_PLAYLIST_COMPLETE, function() {
            J = !0;
            r("replay");
            var a = d.jwGetPlaylist()[0];
            s(a.image)
        });
        d.jwAddEventListener(c.JWPLAYER_MEDIA_ERROR, m);
        d.jwAddEventListener(c.JWPLAYER_ERROR, m);
        d.jwAddEventListener(c.JWPLAYER_PROVIDER_CLICK, l);
        g ? (w = new a.touch(u), w.addEventListener(a.touchEvents.TAP, l)) : u.addEventListener("click", l, !1);
        w = {
            font: Q.fontweight + " " + Q.fontsize + "px/" + (parseInt(Q.fontsize, 10) + 3) + "px Arial, Helvetica, sans-serif",
            color: Q.fontcolor
        };
        G =
            new k.displayicon(u.id + "_button", d, w, {
                color: Q.overcolor
            });
        u.appendChild(G.element());
        t({
            newstate: e.IDLE
        })
    };
    f(".jwdisplay", {
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden"
    });
    f(".jwdisplay " + h, {
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "#000 no-repeat center",
        overflow: "hidden",
        opacity: 0
    });
    a.transitionStyle(".jwdisplay, .jwdisplay *", "opacity .25s, color .25s")
})(jwplayer);
(function(d) {
    var k = d.utils,
        a = k.css,
        c = document,
        e = "none",
        f = "100%";
    d.html5.displayicon = function(g, h, b, p) {
        function j(a, b, e, d) {
            var f = c.createElement("div");
            f.className = a;
            b && b.appendChild(f);
            m && l(f, a, "." + a, e, d);
            return f
        }

        function l(b, c, e, d, f) {
            var g = r(c);
            "replayIcon" === c && !g.src && (g = r("playIcon"));
            g.src ? (d = k.extend({}, d), 0 < c.indexOf("Icon") && (x = g.width | 0), d.width = g.width, d["background-image"] = "url(" + g.src + ")", d["background-size"] = g.width + "px " + g.height + "px", d["float"] = "none", f = k.extend({}, f), g.overSrc && (f["background-image"] =
                "url(" + g.overSrc + ")"), k.isMobile() || a("#" + h.id + " .jwdisplay:hover " + e, f), a.style(m, {
                display: "table"
            })) : a.style(m, {
                display: "none"
            });
            d && a.style(b, d);
            F = g
        }

        function r(a) {
            var b = y.getSkinElement("display", a);
            a = y.getSkinElement("display", a + "Over");
            return b ? (b.overSrc = a && a.src ? a.src : "", b) : {
                src: "",
                overSrc: "",
                width: 0,
                height: 0
            }
        }

        function s() {
            var b = q || 0 === x;
            a.style(w, {
                display: w.innerHTML && b ? "" : e
            });
            n = b ? 30 : 0;
            t()
        }

        function t() {
            clearTimeout(K);
            0 < n-- && (K = setTimeout(t, 33));
            var b = "px " + f,
                c = Math.ceil(Math.max(F.width, k.bounds(m).width -
                    u.width - z.width)),
                b = {
                    "background-size": [z.width + b, c + b, u.width + b].join(", ")
                };
            m.parentNode && (b.left = 1 === m.parentNode.clientWidth % 2 ? "0.5px" : "");
            a.style(m, b)
        }

        function A() {
            M = (M + J) % 360;
            k.rotate(v, M)
        }
        var y = h.skin,
            m, B, z, u, q, w, v, C = {},
            F, x = 0,
            K = -1,
            n = 0;
        this.element = function() {
            return m
        };
        this.setText = function(a) {
            var b = w.style;
            w.innerHTML = a ? a.replace(":", ":\x3cbr\x3e") : "";
            b.height = "0";
            b.display = "block";
            if (a)
                for (; 2 < Math.floor(w.scrollHeight / c.defaultView.getComputedStyle(w, null).lineHeight.replace("px", ""));) w.innerHTML =
                    w.innerHTML.replace(/(.*) .*$/, "$1...");
            b.height = "";
            b.display = "";
            s()
        };
        this.setIcon = function(a) {
            var b = C[a];
            b || (b = j("jwicon"), b.id = m.id + "_" + a);
            l(b, a + "Icon", "#" + b.id);
            m.contains(v) ? m.replaceChild(b, v) : m.appendChild(b);
            v = b
        };
        var L, J = 0,
            M;
        this.setRotation = function(a, b) {
            clearInterval(L);
            M = 0;
            J = a | 0;
            0 === J ? A() : L = setInterval(A, b)
        };
        var I = this.hide = function() {
            m.style.opacity = 0;
            m.style.cursor = ""
        };
        this.show = function() {
            m.style.opacity = 1;
            m.style.cursor = "pointer"
        };
        m = j("jwdisplayIcon");
        m.id = g;
        B = r("background");
        z = r("capLeft");
        u = r("capRight");
        q = 0 < z.width * u.width;
        var G = {
            "background-image": "url(" + z.src + "), url(" + B.src + "), url(" + u.src + ")",
            "background-position": "left,center,right",
            "background-repeat": "no-repeat",
            padding: "0 " + u.width + "px 0 " + z.width + "px",
            height: B.height,
            "margin-top": B.height / -2
        };
        a("#" + g, G);
        k.isMobile() || (B.overSrc && (G["background-image"] = "url(" + z.overSrc + "), url(" + B.overSrc + "), url(" + u.overSrc + ")"), a(".jw-tab-focus #" + g + ", #" + h.id + " .jwdisplay:hover " + ("#" + g), G));
        w = j("jwtext", m, b, p);
        v = j("jwicon", m);
        h.jwAddEventListener(d.events.JWPLAYER_RESIZE,
            t);
        I();
        s()
    };
    a(".jwplayer .jwdisplayIcon", {
        display: "table",
        position: "relative",
        "margin-left": "auto",
        "margin-right": "auto",
        top: "50%",
        "float": "none"
    });
    a(".jwplayer .jwdisplayIcon div", {
        position: "relative",
        display: "table-cell",
        "vertical-align": "middle",
        "background-repeat": "no-repeat",
        "background-position": "center"
    });
    a(".jwplayer .jwdisplayIcon div", {
        "vertical-align": "middle"
    }, !0);
    a(".jwplayer .jwdisplayIcon .jwtext", {
        color: "#fff",
        padding: "0 1px",
        "max-width": "300px",
        "overflow-y": "hidden",
        "text-align": "center",
        "-webkit-user-select": e,
        "-moz-user-select": e,
        "-ms-user-select": e,
        "user-select": e
    })
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = a.css,
        e = a.bounds,
        f = window.top !== window.self,
        g = ".jwdockbuttons";
    k.dock = function(d, b) {
        function p(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function j(b, e) {
            var d = s(b);
            c(l("." + b), a.extend(p(d), {
                width: d.width
            }));
            return r("div", b, e)
        }

        function l(a) {
            return "#" + y + " " + (a ? a : "")
        }

        function r(a, b, c) {
            a = document.createElement(a);
            b && (a.className = b);
            c && c.appendChild(a);
            return a
        }

        function s(a) {
            return (a = m.getSkinElement("dock",
                a)) ? a : {
                width: 0,
                height: 0,
                src: ""
            }
        }

        function t() {
            c(g + " .capLeft, " + g + " .capRight", {
                display: B ? "block" : "none"
            })
        }
        var A = a.extend({}, {
                iconalpha: 0.75,
                iconalphaactive: 0.5,
                iconalphaover: 1,
                margin: 8
            }, b),
            y = d.id + "_dock",
            m = d.skin,
            B = 0,
            z = {},
            u = {},
            q, w, v, C = this;
        C.redraw = function() {
            e(q)
        };
        C.element = function() {
            return q
        };
        C.offset = function(a) {
            c(l(), {
                "margin-left": a
            })
        };
        C.hide = function() {
            C.visible && (C.visible = !1, q.style.opacity = 0, clearTimeout(v), v = setTimeout(function() {
                q.style.display = "none"
            }, 250))
        };
        C.showTemp = function() {
            C.visible ||
                (q.style.opacity = 0, q.style.display = "block")
        };
        C.hideTemp = function() {
            C.visible || (q.style.display = "none")
        };
        C.show = function() {
            !C.visible && B && (C.visible = !0, q.style.display = "block", clearTimeout(v), v = setTimeout(function() {
                q.style.opacity = 1
            }, 0))
        };
        C.addButton = function(b, g, j, l) {
            if (!z[l]) {
                var s = r("div", "divider", w),
                    v = r("div", "button", w),
                    x = r("div", null, v);
                x.id = y + "_" + l;
                x.innerHTML = "\x26nbsp;";
                c("#" + x.id, {
                    "background-image": b
                });
                "string" === typeof j && (j = new Function(j));
                a.isMobile() ? (new a.touch(v)).addEventListener(a.touchEvents.TAP,
                    function(a) {
                        j(a)
                    }) : v.addEventListener("click", function(a) {
                    j(a);
                    a.preventDefault()
                });
                z[l] = {
                    element: v,
                    label: g,
                    divider: s,
                    icon: x
                };
                if (g) {
                    var p = new k.overlay(x.id + "_tooltip", m, !0);
                    b = r("div");
                    b.id = x.id + "_label";
                    b.innerHTML = g;
                    c("#" + b.id, {
                        padding: 3
                    });
                    p.setContents(b);
                    if (!a.isMobile()) {
                        var A;
                        v.addEventListener("mouseover", function() {
                            clearTimeout(A);
                            var b = u[l],
                                g, j;
                            g = e(z[l].icon);
                            b.offsetX(0);
                            j = e(q);
                            f && a.isIE() && d.jwGetFullscreen() ? c("#" + b.element().id, {
                                left: 100 * g.left + 50 + 100 * g.width / 2
                            }) : c("#" + b.element().id, {
                                left: g.left - j.left + g.width / 2
                            });
                            g = e(b.element());
                            j.left > g.left && b.offsetX(j.left - g.left + 8);
                            p.show();
                            a.foreach(u, function(a, b) {
                                a !== l && b.hide()
                            })
                        }, !1);
                        v.addEventListener("mouseout", function() {
                            A = setTimeout(p.hide, 100)
                        }, !1);
                        q.appendChild(p.element());
                        u[l] = p
                    }
                }
                B++;
                t()
            }
        };
        C.removeButton = function(a) {
            if (z[a]) {
                w.removeChild(z[a].element);
                w.removeChild(z[a].divider);
                var b = document.getElementById("" + y + "_" + a + "_tooltip");
                b && q.removeChild(b);
                delete z[a];
                B--;
                t()
            }
        };
        C.numButtons = function() {
            return B
        };
        C.visible = !1;
        q =
            r("div", "jwdock");
        w = r("div", "jwdockbuttons");
        q.appendChild(w);
        q.id = y;
        var F = s("button"),
            x = s("buttonOver"),
            K = s("buttonActive");
        F && (c(l(), {
                height: F.height,
                padding: A.margin
            }), c(g, {
                height: F.height
            }), c(l("div.button"), a.extend(p(F), {
                width: F.width,
                cursor: "pointer",
                border: "none"
            })), c(l("div.button:hover"), p(x)), c(l("div.button:active"), p(K)), c(l("div.button\x3ediv"), {
                opacity: A.iconalpha
            }), c(l("div.button:hover\x3ediv"), {
                opacity: A.iconalphaover
            }), c(l("div.button:active\x3ediv"), {
                opacity: A.iconalphaactive
            }),
            c(l(".jwoverlay"), {
                top: A.margin + F.height
            }), j("capLeft", w), j("capRight", w), j("divider"));
        setTimeout(function() {
            e(q)
        })
    };
    c(".jwdock", {
        opacity: 0,
        display: "none"
    });
    c(".jwdock \x3e *", {
        height: "100%",
        "float": "left"
    });
    c(".jwdock \x3e .jwoverlay", {
        height: "auto",
        "float": "none",
        "z-index": 99
    });
    c(g + " div.button", {
        position: "relative"
    });
    c(g + " \x3e *", {
        height: "100%",
        "float": "left"
    });
    c(g + " .divider", {
        display: "none"
    });
    c(g + " div.button ~ .divider", {
        display: "block"
    });
    c(g + " .capLeft, " + g + " .capRight", {
        display: "none"
    });
    c(g + " .capRight", {
        "float": "right"
    });
    c(g + " div.button \x3e div", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 5,
        position: "absolute",
        "background-position": "center",
        "background-repeat": "no-repeat"
    });
    a.transitionStyle(".jwdock", "background .25s, opacity .25s");
    a.transitionStyle(".jwdock .jwoverlay", "opacity .25s");
    a.transitionStyle(g + " div.button div", "opacity .25s")
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = d._,
        e = d.events,
        f = e.state,
        g = d.playlist;
    k.instream = function(h, b, p, j) {
        function l(a) {
            z(a.type, a);
            I && h.jwInstreamDestroy(!1, D)
        }

        function r(a) {
            if (a.newstate !== I.state) switch (I.state = a.newstate, I.state) {
                case f.PLAYING:
                    D.jwInstreamPlay();
                    break;
                case f.PAUSED:
                    D.jwInstreamPause()
            }
        }

        function s(a) {
            z(a.type, a);
            m()
        }

        function t(a) {
            z(a.type, a)
        }

        function A(a) {
            b.sendEvent(a.type, a);
            z(e.JWPLAYER_FULLSCREEN, {
                fullscreen: a.jwstate
            })
        }

        function y() {
            R && R.releaseState(D.jwGetState());
            G.play()
        }

        function m() {
            if (v && C + 1 < v.length) {
                C++;
                var b = v[C];
                w = new g.item(b);
                I.setPlaylist([b]);
                var c;
                F && (c = F[C]);
                x = a.extend(q, c);
                G.load(I.playlist[0]);
                K.reset(x.skipoffset || -1);
                T = setTimeout(function() {
                    z(e.JWPLAYER_PLAYLIST_ITEM, {
                        index: C
                    }, !0)
                }, 0)
            } else T = setTimeout(function() {
                z(e.JWPLAYER_PLAYLIST_COMPLETE, {}, !0);
                h.jwInstreamDestroy(!0, D)
            }, 0)
        }

        function B(a) {
            a.width && a.height && (R && R.releaseState(D.jwGetState()), p.resizeMedia())
        }

        function z(a, b) {
            b = b || {};
            q.tag && !b.tag && (b.tag = q.tag);
            D.sendEvent(a, b)
        }

        function u() {
            O &&
                O.redraw();
            R && R.redraw()
        }
        var q = {
                controlbarseekable: "never",
                controlbarpausable: !0,
                controlbarstoppable: !0,
                loadingmessage: "Loading ad",
                playlistclickable: !0,
                skipoffset: null,
                tag: null
            },
            w, v, C = 0,
            F, x = {
                controlbarseekable: "never",
                controlbarpausable: !1,
                controlbarstoppable: !1
            },
            K, n, L, J, M, I, G, O, R, Q, T = -1,
            D = a.extend(this, new e.eventdispatcher);
        h.jwAddEventListener(e.JWPLAYER_RESIZE, u);
        h.jwAddEventListener(e.JWPLAYER_FULLSCREEN, function(b) {
            t(b);
            I && (u(), !b.fullscreen && a.isIPad() && (I.state === f.PAUSED ? R.show(!0) : I.state ===
                f.PLAYING && R.hide()))
        });
        D.init = function() {
            n = j.detachMedia();
            G = new(d.html5.chooseProvider({}))(b.id);
            G.addGlobalListener(t);
            G.addEventListener(e.JWPLAYER_MEDIA_META, B);
            G.addEventListener(e.JWPLAYER_MEDIA_COMPLETE, m);
            G.addEventListener(e.JWPLAYER_MEDIA_BUFFER_FULL, y);
            G.addEventListener(e.JWPLAYER_MEDIA_ERROR, l);
            G.addEventListener(e.JWPLAYER_PLAYER_STATE, r);
            G.addEventListener(e.JWPLAYER_MEDIA_TIME, function(a) {
                K && K.updateSkipTime(a.position, a.duration)
            });
            G.attachMedia();
            G.mute(b.mute);
            G.volume(b.volume);
            I = new k.model({}, G);
            I.setVolume(b.volume);
            I.setFullscreen(b.fullscreen);
            I.setMute(b.mute);
            I.addEventListener("fullscreenchange", A);
            M = b.playlist[b.item];
            L = n.currentTime;
            j.checkBeforePlay() || 0 === L ? (L = 0, J = f.PLAYING) : J = h.jwGetState() === f.IDLE || b.getVideo().checkComplete() ? f.IDLE : f.PLAYING;
            J === f.PLAYING && n.pause();
            R = new k.display(D);
            R.forceState(f.BUFFERING);
            Q = document.createElement("div");
            Q.id = D.id + "_instream_container";
            a.css.style(Q, {
                width: "100%",
                height: "100%"
            });
            Q.appendChild(R.element());
            O = new k.controlbar(D, {
                fullscreen: b.fullscreen
            });
            O.instreamMode(!0);
            Q.appendChild(O.element());
            h.jwGetControls() ? (O.show(), R.show()) : (O.hide(), R.hide());
            p.setupInstream(Q, O, R, I);
            u();
            D.jwInstreamSetText(q.loadingmessage)
        };
        D.load = function(b, d) {
            if (a.isAndroid(2.3)) l({
                type: e.JWPLAYER_ERROR,
                message: "Error loading instream: Cannot play instream on Android 2.3"
            });
            else {
                z(e.JWPLAYER_PLAYLIST_ITEM, {
                    index: C
                }, !0);
                var j = 10 + a.bounds(Q.parentNode).bottom - a.bounds(O.element()).top;
                c.isArray(b) && (d && (F = d, d = d[C]), v = b, b = v[C]);
                x = a.extend(q,
                    d);
                w = new g.item(b);
                I.setPlaylist([b]);
                K = new k.adskipbutton(h.id, j, x.skipMessage, x.skipText);
                K.addEventListener(e.JWPLAYER_AD_SKIPPED, s);
                K.reset(x.skipoffset || -1);
                h.jwGetControls() ? K.show() : K.hide();
                j = K.element();
                Q.appendChild(j);
                I.addEventListener(e.JWPLAYER_ERROR, l);
                R.setAlternateClickHandler(function(a) {
                    a = a || {};
                    a.hasControls = !!h.jwGetControls();
                    z(e.JWPLAYER_INSTREAM_CLICK, a);
                    I.state === f.PAUSED ? a.hasControls && D.jwInstreamPlay() : D.jwInstreamPause()
                });
                a.isMSIE() && n.parentElement.addEventListener("click",
                    R.clickHandler);
                p.addEventListener(e.JWPLAYER_AD_SKIPPED, s);
                G.load(I.playlist[0])
            }
        };
        D.jwInstreamDestroy = function(c) {
            if (I) {
                I.removeEventListener("fullscreenchange", A);
                clearTimeout(T);
                T = -1;
                G.detachMedia();
                j.attachMedia();
                if (J !== f.IDLE) {
                    var d = a.extend({}, M);
                    d.starttime = L;
                    b.getVideo().load(d)
                } else b.getVideo().stop();
                D.resetEventListeners();
                G.resetEventListeners();
                I.resetEventListeners();
                if (O) try {
                    O.element().parentNode.removeChild(O.element())
                } catch (g) {}
                R && (n && n.parentElement && n.parentElement.removeEventListener("click",
                    R.clickHandler), R.revertAlternateClickHandler());
                z(e.JWPLAYER_INSTREAM_DESTROYED, {
                    reason: c ? "complete" : "destroyed"
                }, !0);
                J === f.PLAYING && n.play();
                p.destroyInstream(G.isAudioFile());
                I = null
            }
        };
        D.jwInstreamAddEventListener = function(a, b) {
            D.addEventListener(a, b)
        };
        D.jwInstreamRemoveEventListener = function(a, b) {
            D.removeEventListener(a, b)
        };
        D.jwInstreamPlay = function() {
            G.play(!0);
            b.state = f.PLAYING;
            R.show()
        };
        D.jwInstreamPause = function() {
            G.pause(!0);
            b.state = f.PAUSED;
            h.jwGetControls() && (R.show(), O.show())
        };
        D.jwInstreamSeek =
            function(a) {
                G.seek(a)
            };
        D.jwInstreamSetText = function(a) {
            O.setText(a)
        };
        D.jwInstreamState = function() {
            return I.state
        };
        D.setControls = function(a) {
            a ? K.show() : K.hide()
        };
        D.jwPlay = function() {
            "true" === x.controlbarpausable.toString().toLowerCase() && D.jwInstreamPlay()
        };
        D.jwPause = function() {
            "true" === x.controlbarpausable.toString().toLowerCase() && D.jwInstreamPause()
        };
        D.jwStop = function() {
            "true" === x.controlbarstoppable.toString().toLowerCase() && (h.jwInstreamDestroy(!1, D), h.jwStop())
        };
        D.jwSeek = function(a) {
            switch (x.controlbarseekable.toLowerCase()) {
                case "always":
                    D.jwInstreamSeek(a);
                    break;
                case "backwards":
                    I.position > a && D.jwInstreamSeek(a)
            }
        };
        D.jwSeekDrag = function(a) {
            I.seekDrag(a)
        };
        D.jwGetPosition = function() {};
        D.jwGetDuration = function() {};
        D.jwGetWidth = h.jwGetWidth;
        D.jwGetHeight = h.jwGetHeight;
        D.jwGetFullscreen = h.jwGetFullscreen;
        D.jwSetFullscreen = h.jwSetFullscreen;
        D.jwGetVolume = function() {
            return b.volume
        };
        D.jwSetVolume = function(a) {
            I.setVolume(a);
            h.jwSetVolume(a)
        };
        D.jwGetMute = function() {
            return b.mute
        };
        D.jwSetMute = function(a) {
            I.setMute(a);
            h.jwSetMute(a)
        };
        D.jwGetState = function() {
            return !I ?
                f.IDLE : I.state
        };
        D.jwGetPlaylist = function() {
            return [w]
        };
        D.jwGetPlaylistIndex = function() {
            return 0
        };
        D.jwGetStretching = function() {
            return b.config.stretching
        };
        D.jwAddEventListener = function(a, b) {
            D.addEventListener(a, b)
        };
        D.jwRemoveEventListener = function(a, b) {
            D.removeEventListener(a, b)
        };
        D.jwSetCurrentQuality = function() {};
        D.jwGetQualityLevels = function() {
            return []
        };
        D.jwGetControls = function() {
            return h.jwGetControls()
        };
        D.skin = h.skin;
        D.id = h.id + "_instream";
        return D
    }
})(window.jwplayer);
(function(d) {
    var k = d.utils,
        a = k.css,
        c = d.events.state,
        e = d.html5.logo = function(f, g) {
            function h(a) {
                k.exists(a) && a.stopPropagation && a.stopPropagation();
                if (!s || !j.link) b.jwGetState() === c.IDLE || b.jwGetState() === c.PAUSED ? b.jwPlay() : b.jwPause();
                s && j.link && (b.jwPause(), b.jwSetFullscreen(!1), window.open(j.link, j.linktarget))
            }
            var b = f,
                p = b.id + "_logo",
                j, l, r = e.defaults,
                s = !1;
            this.resize = function() {};
            this.element = function() {
                return l
            };
            this.offset = function(b) {
                a("#" + p + " ", {
                    "margin-bottom": b
                })
            };
            this.position = function() {
                return j.position
            };
            this.margin = function() {
                return parseInt(j.margin, 10)
            };
            this.hide = function(a) {
                if (j.hide || a) s = !1, l.style.visibility = "hidden", l.style.opacity = 0
            };
            this.show = function() {
                s = !0;
                l.style.visibility = "visible";
                l.style.opacity = 1
            };
            var t = "o";
            b.edition && (t = b.edition(), t = "pro" === t ? "p" : "premium" === t ? "r" : "ads" === t ? "a" : "free" === t ? "f" : "o");
            if ("o" === t || "f" === t) r.link = "http://www.longtailvideo.com/jwpabout/?a\x3dl\x26v\x3d" + d.version + "\x26m\x3dh\x26e\x3d" + t;
            j = k.extend({}, r, g);
            j.hide = "true" === j.hide.toString();
            l = document.createElement("img");
            l.className = "jwlogo";
            l.id = p;
            if (j.file) {
                var r = /(\w+)-(\w+)/.exec(j.position),
                    t = {},
                    A = j.margin;
                3 === r.length ? (t[r[1]] = A, t[r[2]] = A) : t.top = t.right = A;
                a("#" + p + " ", t);
                l.src = (j.prefix ? j.prefix : "") + j.file;
                k.isMobile() ? (new k.touch(l)).addEventListener(k.touchEvents.TAP, h) : l.onclick = h
            } else l.style.display = "none";
            return this
        };
    e.defaults = {
        prefix: k.repo(),
        file: "logo.png",
        linktarget: "_top",
        margin: 8,
        hide: !1,
        position: "top-right"
    };
    a(".jwlogo", {
        cursor: "pointer",
        position: "absolute"
    })
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = a.css;
    k.menu = function(d, f, g, h) {
        function b(a) {
            return !a || !a.src ? {} : {
                background: "url(" + a.src + ") no-repeat left",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function p(a, b) {
            return function() {
                y(a);
                r && r(b)
            }
        }

        function j(a, b) {
            var c = document.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function l(a) {
            return (a = g.getSkinElement("tooltip", a)) ? a : {
                width: 0,
                height: 0,
                src: void 0
            }
        }
        var r = h,
            s = new k.overlay(f + "_overlay", g);
        h = a.extend({
            fontcase: void 0,
            fontcolor: "#cccccc",
            fontsize: 11,
            fontweight: void 0,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        }, g.getComponentSettings("tooltip"));
        var t, A = [];
        this.element = function() {
            return s.element()
        };
        this.addOption = function(b, c) {
            var d = j("jwoption", t);
            d.id = f + "_option_" + c;
            d.innerHTML = b;
            a.isMobile() ? (new a.touch(d)).addEventListener(a.touchEvents.TAP, p(A.length, c)) : d.addEventListener("click", p(A.length, c));
            A.push(d)
        };
        this.clearOptions = function() {
            for (; 0 < A.length;) t.removeChild(A.pop())
        };
        var y = this.setActive = function(a) {
            for (var b = 0; b < A.length; b++) {
                var c =
                    A[b];
                c.className = c.className.replace(" active", "");
                b === a && (c.className += " active")
            }
        };
        this.show = s.show;
        this.hide = s.hide;
        this.offsetX = s.offsetX;
        this.positionX = s.positionX;
        this.constrainX = s.constrainX;
        t = j("jwmenu");
        t.id = f;
        var m = l("menuTop" + d);
        d = l("menuOption");
        var B = l("menuOptionOver"),
            z = l("menuOptionActive");
        if (m && m.image) {
            var u = new Image;
            u.src = m.src;
            u.width = m.width;
            u.height = m.height;
            t.appendChild(u)
        }
        d && (m = "#" + f + " .jwoption", c(m, a.extend(b(d), {
            height: d.height,
            color: h.fontcolor,
            "padding-left": d.width,
            font: h.fontweight + " " + h.fontsize + "px Arial,Helvetica,sans-serif",
            "line-height": d.height,
            "text-transform": "upper" === h.fontcase ? "uppercase" : void 0
        })), c(m + ":hover", a.extend(b(B), {
            color: h.overcolor
        })), c(m + ".active", a.extend(b(z), {
            color: h.activecolor
        })));
        s.setContents(t)
    };
    c("." + "jwmenu jwoption".replace(/ /g, " ."), {
        cursor: "pointer",
        "white-space": "nowrap",
        position: "relative"
    })
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = d.events;
    k.model = function(e, f) {
        function g(a) {
            var b = s[a.type];
            if (b && b.length) {
                for (var c = !1, d = 0; d < b.length; d++) {
                    var e = b[d].split("-\x3e"),
                        f = e[0],
                        e = e[1] || f;
                    h[e] !== a[f] && (h[e] = a[f], c = !0)
                }
                c && h.sendEvent(a.type, a)
            } else h.sendEvent(a.type, a)
        }
        var h = this,
            b, p = a.getCookies(),
            j = {
                controlbar: {},
                display: {}
            },
            l = a.noop,
            r = {
                autostart: !1,
                controls: !0,
                fullscreen: !1,
                height: 320,
                mobilecontrols: !1,
                mute: !1,
                playlist: [],
                playlistposition: "none",
                playlistsize: 180,
                playlistlayout: "extended",
                repeat: !1,
                stretching: a.stretching.UNIFORM,
                width: 480,
                volume: 90
            },
            s = {};
        s[c.JWPLAYER_MEDIA_MUTE] = ["mute"];
        s[c.JWPLAYER_MEDIA_VOLUME] = ["volume"];
        s[c.JWPLAYER_PLAYER_STATE] = ["newstate-\x3estate"];
        s[c.JWPLAYER_MEDIA_BUFFER] = ["bufferPercent-\x3ebuffer"];
        s[c.JWPLAYER_MEDIA_TIME] = ["position", "duration"];
        h.setVideoProvider = function(a) {
            if (b) {
                b.removeGlobalListener(g);
                var c = b.getContainer();
                c && (b.remove(), a.setContainer(c))
            }
            b = a;
            b.volume(h.volume);
            b.mute(h.mute);
            b.addGlobalListener(g)
        };
        h.destroy = function() {
            b && (b.removeGlobalListener(g),
                b.destroy())
        };
        h.getVideo = function() {
            return b
        };
        h.seekDrag = function(a) {
            b.seekDrag(a)
        };
        h.setFullscreen = function(a) {
            a = !!a;
            a !== h.fullscreen && (h.fullscreen = a, h.sendEvent(c.JWPLAYER_FULLSCREEN, {
                fullscreen: a
            }))
        };
        h.setPlaylist = function(a) {
            h.playlist = d.playlist.filterPlaylist(a, h.androidhls);
            0 === h.playlist.length ? h.sendEvent(c.JWPLAYER_ERROR, {
                message: "Error loading playlist: No playable sources found"
            }) : (h.sendEvent(c.JWPLAYER_PLAYLIST_LOADED, {
                playlist: d(h.id).getPlaylist()
            }), h.item = -1, h.setItem(0))
        };
        h.setItem =
            function(a) {
                var b = !1;
                a === h.playlist.length || -1 > a ? (a = 0, b = !0) : a = -1 === a || a > h.playlist.length ? h.playlist.length - 1 : a;
                if (b || a !== h.item) h.item = a, h.sendEvent(c.JWPLAYER_PLAYLIST_ITEM, {
                    index: h.item
                }), b = h.playlist[a], a = k.chooseProvider(b && b.sources && b.sources[0]), l instanceof a || (l = f || new a(h.id), h.setVideoProvider(l)), l.init && l.init(b)
            };
        h.setVolume = function(d) {
            h.mute && 0 < d && h.setMute(!1);
            d = Math.round(d);
            h.mute || a.saveCookie("volume", d);
            g({
                type: c.JWPLAYER_MEDIA_VOLUME,
                volume: d
            });
            b.volume(d)
        };
        h.setMute = function(d) {
            a.exists(d) ||
                (d = !h.mute);
            a.saveCookie("mute", d);
            g({
                type: c.JWPLAYER_MEDIA_MUTE,
                mute: d
            });
            b.mute(d)
        };
        h.componentConfig = function(a) {
            return j[a]
        };
        a.extend(h, new c.eventdispatcher);
        var t = h,
            A = a.extend({}, r, p, e);
        a.foreach(A, function(b, c) {
            A[b] = a.serialize(c)
        });
        t.config = A;
        a.extend(h, {
            id: e.id,
            state: c.state.IDLE,
            duration: -1,
            position: 0,
            buffer: 0
        }, h.config);
        h.playlist = [];
        h.setItem(0)
    }
})(jwplayer);
(function(d) {
    var k = d.utils,
        a = k.css,
        c = k.transitionStyle,
        e = "top",
        f = "bottom",
        g = "right",
        h = "left",
        b = {
            fontcase: void 0,
            fontcolor: "#ffffff",
            fontsize: 12,
            fontweight: void 0,
            activecolor: "#ffffff",
            overcolor: "#ffffff"
        };
    d.html5.overlay = function(c, d, l) {
        function r(a) {
            return "#" + B + (a ? " ." + a : "")
        }

        function s(a, b) {
            var c = document.createElement("div");
            a && (c.className = a);
            b && b.appendChild(c);
            return c
        }

        function t(b, c) {
            var d;
            d = (d = z.getSkinElement("tooltip", b)) ? d : {
                width: 0,
                height: 0,
                src: "",
                image: void 0,
                ready: !1
            };
            var e = s(c, q);
            a.style(e,
                A(d));
            return [e, d]
        }

        function A(a) {
            return {
                background: "url(" + a.src + ") center",
                "background-size": a.width + "px " + a.height + "px"
            }
        }

        function y(b, c) {
            c || (c = "");
            var d = t("cap" + b + c, "jwborder jw" + b + (c ? c : "")),
                j = d[0],
                d = d[1],
                m = k.extend(A(d), {
                    width: b === h || c === h || b === g || c === g ? d.width : void 0,
                    height: b === e || c === e || b === f || c === f ? d.height : void 0
                });
            m[b] = b === f && !u || b === e && u ? v.height : 0;
            c && (m[c] = 0);
            a.style(j, m);
            j = {};
            m = {};
            d = {
                left: d.width,
                right: d.width,
                top: (u ? v.height : 0) + d.height,
                bottom: (u ? 0 : v.height) + d.height
            };
            c && (j[c] = d[c], j[b] =
                0, m[b] = d[b], m[c] = 0, a(r("jw" + b), j), a(r("jw" + c), m), F[b] = d[b], F[c] = d[c])
        }
        var m = this,
            B = c,
            z = d,
            u = l,
            q, w, v, C;
        c = k.extend({}, b, z.getComponentSettings("tooltip"));
        var F = {};
        m.element = function() {
            return q
        };
        m.setContents = function(a) {
            k.empty(w);
            w.appendChild(a)
        };
        m.positionX = function(b) {
            a.style(q, {
                left: Math.round(b)
            })
        };
        m.constrainX = function(b, c) {
            if (m.showing && 0 !== b.width && m.offsetX(0)) {
                c && a.unblock();
                var d = k.bounds(q);
                0 !== d.width && (d.right > b.right ? m.offsetX(b.right - d.right) : d.left < b.left && m.offsetX(b.left - d.left))
            }
        };
        m.offsetX = function(b) {
            b = Math.round(b);
            var c = q.clientWidth;
            0 !== c && (a.style(q, {
                "margin-left": Math.round(-c / 2) + b
            }), a.style(C, {
                "margin-left": Math.round(-v.width / 2) - b
            }));
            return c
        };
        m.borderWidth = function() {
            return F.left
        };
        m.show = function() {
            m.showing = !0;
            a.style(q, {
                opacity: 1,
                visibility: "visible"
            })
        };
        m.hide = function() {
            m.showing = !1;
            a.style(q, {
                opacity: 0,
                visibility: "hidden"
            })
        };
        q = s(".jwoverlay".replace(".", ""));
        q.id = B;
        d = t("arrow", "jwarrow");
        C = d[0];
        v = d[1];
        a.style(C, {
            position: "absolute",
            bottom: u ? void 0 : 0,
            top: u ? 0 : void 0,
            width: v.width,
            height: v.height,
            left: "50%"
        });
        y(e, h);
        y(f, h);
        y(e, g);
        y(f, g);
        y(h);
        y(g);
        y(e);
        y(f);
        d = t("background", "jwback");
        a.style(d[0], {
            left: F.left,
            right: F.right,
            top: F.top,
            bottom: F.bottom
        });
        w = s("jwcontents", q);
        a(r("jwcontents") + " *", {
            color: c.fontcolor,
            font: c.fontweight + " " + c.fontsize + "px Arial,Helvetica,sans-serif",
            "text-transform": "upper" === c.fontcase ? "uppercase" : void 0
        });
        u && k.transform(r("jwarrow"), "rotate(180deg)");
        a.style(q, {
            padding: F.top + 1 + "px " + F.right + "px " + (F.bottom + 1) + "px " + F.left + "px"
        });
        m.showing = !1
    };
    a(".jwoverlay", {
        position: "absolute",
        visibility: "hidden",
        opacity: 0
    });
    a(".jwoverlay .jwcontents", {
        position: "relative",
        "z-index": 1
    });
    a(".jwoverlay .jwborder", {
        position: "absolute",
        "background-size": "100% 100%"
    }, !0);
    a(".jwoverlay .jwback", {
        position: "absolute",
        "background-size": "100% 100%"
    });
    c(".jwoverlay", "opacity .25s, visibility .25s")
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = d.utils;
    k.player = function(c) {
        function e() {
            for (var a = p.playlist, b = [], c = 0; c < a.length; c++) b.push(f(a[c]));
            return b
        }

        function f(b) {
            var c = {
                description: b.description,
                file: b.file,
                image: b.image,
                mediaid: b.mediaid,
                title: b.title
            };
            a.foreach(b, function(a, b) {
                c[a] = b
            });
            c.sources = [];
            c.tracks = [];
            0 < b.sources.length && a.foreach(b.sources, function(a, b) {
                c.sources.push({
                    file: b.file,
                    type: b.type ? b.type : void 0,
                    label: b.label,
                    "default": b["default"] ? !0 : !1
                })
            });
            0 < b.tracks.length && a.foreach(b.tracks, function(a,
                b) {
                c.tracks.push({
                    file: b.file,
                    kind: b.kind ? b.kind : void 0,
                    label: b.label,
                    "default": b["default"] ? !0 : !1
                })
            });
            !b.file && 0 < b.sources.length && (c.file = b.sources[0].file);
            return c
        }

        function g() {
            b.jwPlay = l.play;
            b.jwPause = l.pause;
            b.jwStop = l.stop;
            b.jwSeek = l.seek;
            b.jwSetVolume = l.setVolume;
            b.jwSetMute = l.setMute;
            b.jwLoad = l.load;
            b.jwPlaylistNext = l.next;
            b.jwPlaylistPrev = l.prev;
            b.jwPlaylistItem = l.item;
            b.jwSetFullscreen = l.setFullscreen;
            b.jwResize = j.resize;
            b.jwSeekDrag = p.seekDrag;
            b.jwGetQualityLevels = l.getQualityLevels;
            b.jwGetCurrentQuality = l.getCurrentQuality;
            b.jwSetCurrentQuality = l.setCurrentQuality;
            b.jwGetAudioTracks = l.getAudioTracks;
            b.jwGetCurrentAudioTrack = l.getCurrentAudioTrack;
            b.jwSetCurrentAudioTrack = l.setCurrentAudioTrack;
            b.jwGetCaptionsList = l.getCaptionsList;
            b.jwGetCurrentCaptions = l.getCurrentCaptions;
            b.jwSetCurrentCaptions = l.setCurrentCaptions;
            b.jwGetSafeRegion = j.getSafeRegion;
            b.jwForceState = j.forceState;
            b.jwReleaseState = j.releaseState;
            b.jwGetPlaylistIndex = h("item");
            b.jwGetPosition = h("position");
            b.jwGetDuration =
                h("duration");
            b.jwGetBuffer = h("buffer");
            b.jwGetWidth = h("width");
            b.jwGetHeight = h("height");
            b.jwGetFullscreen = h("fullscreen");
            b.jwGetVolume = h("volume");
            b.jwGetMute = h("mute");
            b.jwGetState = h("state");
            b.jwGetStretching = h("stretching");
            b.jwGetPlaylist = e;
            b.jwGetControls = h("controls");
            b.jwDetachMedia = l.detachMedia;
            b.jwAttachMedia = l.attachMedia;
            b.jwPlayAd = function(a) {
                var c = d(b.id).plugins;
                c.vast && c.vast.jwPlayAd(a)
            };
            b.jwPauseAd = function() {
                var a = d(b.id).plugins;
                a.googima && a.googima.jwPauseAd()
            };
            b.jwDestroyGoogima =
                function() {
                    var a = d(b.id).plugins;
                    a.googima && a.googima.jwDestroyGoogima()
                };
            b.jwInitInstream = function() {
                b.jwInstreamDestroy();
                s = new k.instream(b, p, j, l);
                s.init()
            };
            b.jwLoadItemInstream = function(a, b) {
                if (!s) throw "Instream player undefined";
                s.load(a, b)
            };
            b.jwLoadArrayInstream = function(a, b) {
                if (!s) throw "Instream player undefined";
                s.load(a, b)
            };
            b.jwSetControls = function(a) {
                j.setControls(a);
                s && s.setControls(a)
            };
            b.jwInstreamPlay = function() {
                s && s.jwInstreamPlay()
            };
            b.jwInstreamPause = function() {
                s && s.jwInstreamPause()
            };
            b.jwInstreamState = function() {
                return s ? s.jwInstreamState() : ""
            };
            b.jwInstreamDestroy = function(a, b) {
                if (b = b || s) b.jwInstreamDestroy(a || !1), b === s && (s = void 0)
            };
            b.jwInstreamAddEventListener = function(a, b) {
                s && s.jwInstreamAddEventListener(a, b)
            };
            b.jwInstreamRemoveEventListener = function(a, b) {
                s && s.jwInstreamRemoveEventListener(a, b)
            };
            b.jwPlayerDestroy = function() {
                j && j.destroy();
                p && p.destroy();
                r && r.resetEventListeners()
            };
            b.jwInstreamSetText = function(a) {
                s && s.jwInstreamSetText(a)
            };
            b.jwIsBeforePlay = function() {
                return l.checkBeforePlay()
            };
            b.jwIsBeforeComplete = function() {
                return p.getVideo().checkComplete()
            };
            b.jwSetCues = j.addCues;
            b.jwAddEventListener = l.addEventListener;
            b.jwRemoveEventListener = l.removeEventListener;
            b.jwDockAddButton = j.addButton;
            b.jwDockRemoveButton = j.removeButton
        }

        function h(a) {
            return function() {
                return p[a]
            }
        }
        var b = this,
            p, j, l, r, s;
        p = new k.model(c);
        b.id = p.id;
        b._model = p;
        a.css.block(b.id);
        j = new k.view(b, p);
        l = new k.controller(p, j);
        g();
        b.initializeAPI = g;
        r = new k.setup(p, j);
        r.addEventListener(d.events.JWPLAYER_READY, function(c) {
            l.playerReady(c);
            a.css.unblock(b.id)
        });
        r.addEventListener(d.events.JWPLAYER_ERROR, function(c) {
            a.css.unblock(b.id);
            d(b.id).dispatchEvent(d.events.JWPLAYER_SETUP_ERROR, c)
        });
        r.start()
    }
})(window.jwplayer);
(function(d) {
    var k = {
            size: 180,
            backgroundcolor: "#333333",
            fontcolor: "#999999",
            overcolor: "#CCCCCC",
            activecolor: "#CCCCCC",
            titlecolor: "#CCCCCC",
            titleovercolor: "#FFFFFF",
            titleactivecolor: "#FFFFFF",
            fontweight: "normal",
            titleweight: "normal",
            fontsize: 11,
            titlesize: 13
        },
        a = d.html5,
        c = d.events,
        e = d.utils,
        f = e.css,
        g = e.isMobile();
    a.playlistcomponent = function(d, b) {
        function p(a) {
            return "#" + A.id + (a ? " ." + a : "")
        }

        function j(a, b) {
            var c = document.createElement(a);
            b && (c.className = b);
            return c
        }

        function l(a) {
            return function() {
                u = a;
                r.jwPlaylistItem(a);
                r.jwPlay(!0)
            }
        }
        var r = d,
            s = r.skin,
            t = e.extend({}, k, r.skin.getComponentSettings("playlist"), b),
            A, y, m, B, z = -1,
            u, q, w = 76,
            v = {
                background: void 0,
                divider: void 0,
                item: void 0,
                itemOver: void 0,
                itemImage: void 0,
                itemActive: void 0
            },
            C, F = this;
        F.element = function() {
            return A
        };
        F.redraw = function() {
            q && q.redraw()
        };
        F.show = function() {
            e.show(A)
        };
        F.hide = function() {
            e.hide(A)
        };
        A = j("div", "jwplaylist");
        A.id = r.id + "_jwplayer_playlistcomponent";
        C = "basic" === r._model.playlistlayout;
        y = j("div", "jwlistcontainer");
        A.appendChild(y);
        e.foreach(v,
            function(a) {
                v[a] = s.getSkinElement("playlist", a)
            });
        C && (w = 32);
        v.divider && (w += v.divider.height);
        var x = 0,
            K = 0,
            n = 0;
        e.clearCss(p());
        f(p(), {
            "background-color": t.backgroundcolor
        });
        f(p("jwlist"), {
            "background-image": v.background ? " url(" + v.background.src + ")" : ""
        });
        f(p("jwlist *"), {
            color: t.fontcolor,
            font: t.fontweight + " " + t.fontsize + "px Arial, Helvetica, sans-serif"
        });
        v.itemImage ? (x = (w - v.itemImage.height) / 2 + "px ", K = v.itemImage.width, n = v.itemImage.height) : (K = 4 * w / 3, n = w);
        v.divider && f(p("jwplaylistdivider"), {
            "background-image": "url(" +
                v.divider.src + ")",
            "background-size": "100% " + v.divider.height + "px",
            width: "100%",
            height: v.divider.height
        });
        f(p("jwplaylistimg"), {
            height: n,
            width: K,
            margin: x ? x + "0 " + x + x : "0 5px 0 0"
        });
        f(p("jwlist li"), {
            "background-image": v.item ? "url(" + v.item.src + ")" : "",
            height: w,
            overflow: "hidden",
            "background-size": "100% " + w + "px",
            cursor: "pointer"
        });
        x = {
            overflow: "hidden"
        };
        "" !== t.activecolor && (x.color = t.activecolor);
        v.itemActive && (x["background-image"] = "url(" + v.itemActive.src + ")");
        f(p("jwlist li.active"), x);
        f(p("jwlist li.active .jwtitle"), {
            color: t.titleactivecolor
        });
        f(p("jwlist li.active .jwdescription"), {
            color: t.activecolor
        });
        x = {
            overflow: "hidden"
        };
        "" !== t.overcolor && (x.color = t.overcolor);
        v.itemOver && (x["background-image"] = "url(" + v.itemOver.src + ")");
        g || (f(p("jwlist li:hover"), x), f(p("jwlist li:hover .jwtitle"), {
            color: t.titleovercolor
        }), f(p("jwlist li:hover .jwdescription"), {
            color: t.overcolor
        }));
        f(p("jwtextwrapper"), {
            height: w,
            position: "relative"
        });
        f(p("jwtitle"), {
            overflow: "hidden",
            display: "inline-block",
            height: C ? w : 20,
            color: t.titlecolor,
            "font-size": t.titlesize,
            "font-weight": t.titleweight,
            "margin-top": C ? "0 10px" : 10,
            "margin-left": 10,
            "margin-right": 10,
            "line-height": C ? w : 20
        });
        f(p("jwdescription"), {
            display: "block",
            "font-size": t.fontsize,
            "line-height": 18,
            "margin-left": 10,
            "margin-right": 10,
            overflow: "hidden",
            height: 36,
            position: "relative"
        });
        r.jwAddEventListener(c.JWPLAYER_PLAYLIST_LOADED, function() {
            y.innerHTML = "";
            for (var b = r.jwGetPlaylist(), c = [], d = 0; d < b.length; d++) b[d]["ova.hidden"] || c.push(b[d]);
            if (m = c) {
                b = j("ul", "jwlist");
                b.id = A.id + "_ul" +
                    Math.round(1E7 * Math.random());
                B = b;
                for (b = 0; b < m.length; b++) {
                    var h = b,
                        c = m[h],
                        d = j("li", "jwitem"),
                        k = void 0;
                    d.id = B.id + "_item_" + h;
                    0 < h ? (k = j("div", "jwplaylistdivider"), d.appendChild(k)) : (h = v.divider ? v.divider.height : 0, d.style.height = w - h + "px", d.style["background-size"] = "100% " + (w - h) + "px");
                    h = j("div", "jwplaylistimg jwfill");
                    k = void 0;
                    c["playlist.image"] && v.itemImage ? k = c["playlist.image"] : c.image && v.itemImage ? k = c.image : v.itemImage && (k = v.itemImage.src);
                    k && !C && (f("#" + d.id + " .jwplaylistimg", {
                            "background-image": k
                        }),
                        d.appendChild(h));
                    h = j("div", "jwtextwrapper");
                    k = j("span", "jwtitle");
                    k.innerHTML = c && c.title ? c.title : "";
                    h.appendChild(k);
                    c.description && !C && (k = j("span", "jwdescription"), k.innerHTML = c.description, h.appendChild(k));
                    d.appendChild(h);
                    c = d;
                    g ? (new e.touch(c)).addEventListener(e.touchEvents.TAP, l(b)) : c.onclick = l(b);
                    B.appendChild(c)
                }
                z = r.jwGetPlaylistIndex();
                y.appendChild(B);
                q = new a.playlistslider(A.id + "_slider", r.skin, A, B)
            }
        });
        r.jwAddEventListener(c.JWPLAYER_PLAYLIST_ITEM, function(a) {
            0 <= z && (document.getElementById(B.id +
                "_item_" + z).className = "jwitem", z = a.index);
            document.getElementById(B.id + "_item_" + a.index).className = "jwitem active";
            a = r.jwGetPlaylistIndex();
            a !== u && (u = -1, q && q.visible() && q.thumbPosition(a / (r.jwGetPlaylist().length - 1)))
        });
        r.jwAddEventListener(c.JWPLAYER_RESIZE, function() {
            F.redraw()
        });
        return this
    };
    f(".jwplaylist", {
        position: "absolute",
        width: "100%",
        height: "100%"
    });
    e.dragStyle(".jwplaylist", "none");
    f(".jwplaylist .jwplaylistimg", {
        position: "relative",
        width: "100%",
        "float": "left",
        margin: "0 5px 0 0",
        background: "#000",
        overflow: "hidden"
    });
    f(".jwplaylist .jwlist", {
        position: "absolute",
        width: "100%",
        "list-style": "none",
        margin: 0,
        padding: 0,
        overflow: "hidden"
    });
    f(".jwplaylist .jwlistcontainer", {
        position: "absolute",
        overflow: "hidden",
        width: "100%",
        height: "100%"
    });
    f(".jwplaylist .jwlist li", {
        width: "100%"
    });
    f(".jwplaylist .jwtextwrapper", {
        overflow: "hidden"
    });
    f(".jwplaylist .jwplaylistdivider", {
        position: "absolute"
    });
    g && e.transitionStyle(".jwplaylist .jwlist", "top .35s")
})(jwplayer);
(function(d) {
    function k() {
        var a = [],
            b;
        for (b = 0; b < arguments.length; b++) a.push(".jwplaylist ." + arguments[b]);
        return a.join(",")
    }
    var a = jwplayer.utils,
        c = a.touchEvents,
        e = a.css,
        f = document,
        g = window;
    d.playlistslider = function(d, b, k, j) {
        function l(a) {
            return "#" + w.id + (a ? " ." + a : "")
        }

        function r(a, b, c, d) {
            var g = f.createElement("div");
            a && (g.className = a, b && e(l(a), {
                "background-image": b.src ? b.src : void 0,
                "background-repeat": d ? "repeat-y" : "no-repeat",
                height: d ? void 0 : b.height
            }));
            c && c.appendChild(g);
            return g
        }

        function s(a) {
            return (a =
                u.getSkinElement("playlist", a)) ? a : {
                width: 0,
                height: 0,
                src: void 0
            }
        }

        function t(a) {
            if (L) return a = a ? a : g.event, aa(x - (a.detail ? -1 * a.detail : a.wheelDelta / 40) / 10), a.stopPropagation && a.stopPropagation(), a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.cancelBubble = !0, a.cancel = !0, !1
        }

        function A(a) {
            0 == a.button && (F = !0);
            f.onselectstart = function() {
                return !1
            };
            g.addEventListener("mousemove", m, !1);
            g.addEventListener("mouseup", z, !1)
        }

        function y(a) {
            aa(x - 2 * a.deltaY / q.clientHeight)
        }

        function m(b) {
            if (F || "click" == b.type) {
                var c =
                    a.bounds(v),
                    d = C.clientHeight / 2;
                aa((b.pageY - c.top - d) / (c.height - d - d))
            }
        }

        function B(a) {
            return function(b) {
                0 < b.button || (aa(x + 0.05 * a), K = setTimeout(function() {
                    n = setInterval(function() {
                        aa(x + 0.05 * a)
                    }, 50)
                }, 500))
            }
        }

        function z() {
            F = !1;
            g.removeEventListener("mousemove", m);
            g.removeEventListener("mouseup", z);
            f.onselectstart = void 0;
            clearTimeout(K);
            clearInterval(n)
        }
        var u = b,
            q = j,
            w, v, C, F, x = 0,
            K, n;
        b = a.isMobile();
        var L = !0,
            J, M, I, G, O, R, Q, T, D;
        this.element = function() {
            return w
        };
        this.visible = function() {
            return L
        };
        var U = this.redraw =
            function() {
                clearTimeout(D);
                D = setTimeout(function() {
                    if (q && q.clientHeight) {
                        var a = q.parentNode.clientHeight / q.clientHeight;
                        0 > a && (a = 0);
                        1 < a ? L = !1 : (L = !0, e(l("jwthumb"), {
                            height: Math.max(v.clientHeight * a, O.height + R.height)
                        }));
                        e(l(), {
                            visibility: L ? "visible" : "hidden"
                        });
                        q && (q.style.width = L ? q.parentElement.clientWidth - I.width + "px" : "")
                    } else D = setTimeout(U, 10)
                }, 0)
            },
            aa = this.thumbPosition = function(a) {
                isNaN(a) && (a = 0);
                x = Math.max(0, Math.min(1, a));
                e(l("jwthumb"), {
                    top: Q + (v.clientHeight - C.clientHeight) * x
                });
                j && (j.style.top =
                    Math.min(0, w.clientHeight - j.scrollHeight) * x + "px")
            };
        w = r("jwslider", null, k);
        w.id = d;
        d = new a.touch(q);
        b ? d.addEventListener(c.DRAG, y) : (w.addEventListener("mousedown", A, !1), w.addEventListener("click", m, !1));
        J = s("sliderCapTop");
        M = s("sliderCapBottom");
        I = s("sliderRail");
        d = s("sliderRailCapTop");
        k = s("sliderRailCapBottom");
        G = s("sliderThumb");
        O = s("sliderThumbCapTop");
        R = s("sliderThumbCapBottom");
        Q = J.height;
        T = M.height;
        e(l(), {
            width: I.width
        });
        e(l("jwrail"), {
            top: Q,
            bottom: T
        });
        e(l("jwthumb"), {
            top: Q
        });
        J = r("jwslidertop",
            J, w);
        M = r("jwsliderbottom", M, w);
        v = r("jwrail", null, w);
        C = r("jwthumb", null, w);
        b || (J.addEventListener("mousedown", B(-1), !1), M.addEventListener("mousedown", B(1), !1));
        r("jwrailtop", d, v);
        r("jwrailback", I, v, !0);
        r("jwrailbottom", k, v);
        e(l("jwrailback"), {
            top: d.height,
            bottom: k.height
        });
        r("jwthumbtop", O, C);
        r("jwthumbback", G, C, !0);
        r("jwthumbbottom", R, C);
        e(l("jwthumbback"), {
            top: O.height,
            bottom: R.height
        });
        U();
        q && !b && (q.addEventListener("mousewheel", t, !1), q.addEventListener("DOMMouseScroll", t, !1));
        return this
    };
    e(k("jwslider"), {
        position: "absolute",
        height: "100%",
        visibility: "hidden",
        right: 0,
        top: 0,
        cursor: "pointer",
        "z-index": 1,
        overflow: "hidden"
    });
    e(k("jwslider") + " *", {
        position: "absolute",
        width: "100%",
        "background-position": "center",
        "background-size": "100% 100%",
        overflow: "hidden"
    });
    e(k("jwslidertop", "jwrailtop", "jwthumbtop"), {
        top: 0
    });
    e(k("jwsliderbottom", "jwrailbottom", "jwthumbbottom"), {
        bottom: 0
    })
})(jwplayer.html5);
(function(d) {
    var k = jwplayer.utils,
        a = k.css,
        c = document,
        e = "none";
    d.rightclick = function(a, g) {
        function h(a) {
            var b = c.createElement("div");
            b.className = a.replace(".", "");
            return b
        }

        function b() {
            l || (r.style.display = e)
        }
        var p, j = k.extend({
                aboutlink: "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + d.version + "\x26m\x3dh\x26e\x3do",
                abouttext: "About JW Player " + d.version + "..."
            }, g),
            l = !1,
            r, s;
        this.element = function() {
            return r
        };
        this.destroy = function() {
            c.removeEventListener("mousedown", b, !1)
        };
        p = c.getElementById(a.id);
        r = h(".jwclick");
        r.id = a.id + "_menu";
        r.style.display = e;
        p.oncontextmenu = function(a) {
            var b, c;
            l || (a = a || window.event, b = a.target || a.srcElement, c = k.bounds(p), b = k.bounds(b), r.style.display = e, r.style.left = (a.offsetX ? a.offsetX : a.layerX) + b.left - c.left + "px", r.style.top = (a.offsetY ? a.offsetY : a.layerY) + b.top - c.top + "px", r.style.display = "block", a.preventDefault())
        };
        r.onmouseover = function() {
            l = !0
        };
        r.onmouseout = function() {
            l = !1
        };
        c.addEventListener("mousedown", b, !1);
        s = h(".jwclick_item");
        s.innerHTML = j.abouttext;
        s.onclick =
            function() {
                window.top.location = j.aboutlink
            };
        r.appendChild(s);
        p.appendChild(r)
    };
    a(".jwclick", {
        "background-color": "#FFF",
        "-webkit-border-radius": 5,
        "-moz-border-radius": 5,
        "border-radius": 5,
        height: "auto",
        border: "1px solid #bcbcbc",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
        width: 320,
        "-webkit-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "-moz-box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        "box-shadow": "5px 5px 7px rgba(0,0,0,.10), 0px 1px 0px rgba(255,255,255,.3) inset",
        position: "absolute",
        "z-index": 999
    }, !0);
    a(".jwclick div", {
        padding: "8px 21px",
        margin: "0px",
        "background-color": "#FFF",
        border: "none",
        "font-family": "'MS Sans Serif', 'Geneva', sans-serif",
        "font-size": 10,
        color: "inherit"
    }, !0);
    a(".jwclick_item", {
        padding: "8px 21px",
        "text-align": "left",
        cursor: "pointer"
    }, !0);
    a(".jwclick_item:hover", {
        "background-color": "#595959",
        color: "#FFF"
    }, !0);
    a(".jwclick_item a", {
        "text-decoration": e,
        color: "#000"
    }, !0);
    a(".jwclick hr", {
        width: "100%",
        padding: 0,
        margin: 0,
        border: "1px #e9e9e9 solid"
    }, !0)
})(jwplayer.html5);
(function(d) {
    var k = d.html5,
        a = d.utils,
        c = d.events,
        e = 2,
        f = 4;
    k.setup = function(g, h) {
        function b() {
            for (var a = 0; a < z.length; a++) {
                var c = z[a],
                    d;
                a: {
                    if (d = c.depends) {
                        d = d.toString().split(",");
                        for (var e = 0; e < d.length; e++)
                            if (!t[d[e]]) {
                                d = !1;
                                break a
                            }
                    }
                    d = !0
                }
                if (d) {
                    z.splice(a, 1);
                    try {
                        c.method(), b()
                    } catch (f) {
                        r(f.message)
                    }
                    return
                }
            }
            0 < z.length && !m && setTimeout(b, 500)
        }

        function p() {
            t[e] = !0
        }

        function j(a) {
            r("Error loading skin: " + a)
        }

        function l() {
            B && (B.onload = null, B = B.onerror = null);
            clearTimeout(u);
            t[f] = !0
        }

        function r(a) {
            m = !0;
            y.sendEvent(c.JWPLAYER_ERROR, {
                message: a
            });
            s.setupError(a)
        }
        var s = h,
            t = {},
            A, y = new c.eventdispatcher,
            m = !1,
            B, z = [{
                name: 1,
                method: function() {
                    g.edition && "invalid" === g.edition() ? r("Error setting up player: Invalid license key") : t[1] = !0
                },
                depends: !1
            }, {
                name: e,
                method: function() {
                    A = new k.skin;
                    A.load(g.config.skin, p, j)
                },
                depends: 1
            }, {
                name: 3,
                method: function() {
                    var b = a.typeOf(g.config.playlist);
                    "array" === b ? (b = new d.playlist(g.config.playlist), g.setPlaylist(b), 0 === g.playlist.length || 0 === g.playlist[0].sources.length ? r("Error loading playlist: No playable sources found") :
                        t[3] = !0) : r("Playlist type not supported: " + b)
                },
                depends: 1
            }, {
                name: f,
                method: function() {
                    var a = g.playlist[g.item].image;
                    a && !g.config.autostart ? (B = new Image, B.onload = l, B.onerror = l, B.src = a, clearTimeout(u), u = setTimeout(l, 500)) : l()
                },
                depends: 3
            }, {
                name: 5,
                method: function() {
                    s.setup(A);
                    t[5] = !0
                },
                depends: f + "," + e
            }, {
                name: 6,
                method: function() {
                    t[6] = !0
                },
                depends: "5,3"
            }, {
                name: 7,
                method: function() {
                    y.sendEvent(c.JWPLAYER_READY);
                    t[7] = !0
                },
                depends: 6
            }],
            u = -1;
        a.extend(this, y);
        this.start = b
    }
})(jwplayer);
(function(d) {
    d.skin = function() {
        var k = {},
            a = !1;
        this.load = function(c, e, f) {
            new d.skinloader(c, function(c) {
                a = !0;
                k = c;
                "function" == typeof e && e()
            }, function(a) {
                "function" == typeof f && f(a)
            })
        };
        this.getSkinElement = function(c, d) {
            c = c.toLowerCase();
            d = d.toLowerCase();
            if (a) try {
                return k[c].elements[d]
            } catch (f) {
                jwplayer.utils.log("No such skin component / element: ", [c, d])
            }
            return null
        };
        this.getComponentSettings = function(c) {
            c = c.toLowerCase();
            return a && k && k[c] ? k[c].settings : null
        };
        this.getComponentLayout = function(c) {
            c = c.toLowerCase();
            if (a) {
                var d = k[c].layout;
                if (d && (d.left || d.right || d.center)) return k[c].layout
            }
            return null
        }
    }
})(jwplayer.html5);
(function(d) {
    var k = jwplayer.utils,
        a = k.foreach,
        c = "Skin formatting error";
    d.skinloader = function(e, f, g) {
        function h(a) {
            s = a;
            k.ajax(k.getAbsolutePath(B), function(a) {
                try {
                    k.exists(a.responseXML) && p(a.responseXML)
                } catch (b) {
                    A(c)
                }
            }, function(a) {
                A(a)
            })
        }

        function b(a, b) {
            return a ? a.getElementsByTagName(b) : null
        }

        function p(a) {
            var c = b(a, "skin")[0];
            a = b(c, "component");
            var d = c.getAttribute("target"),
                c = parseFloat(c.getAttribute("pixelratio"));
            0 < c && (q = c);
            k.versionCheck(d) || A("Incompatible player version");
            if (0 === a.length) t(s);
            else
                for (d = 0; d < a.length; d++) {
                    var e = r(a[d].getAttribute("name")),
                        c = {
                            settings: {},
                            elements: {},
                            layout: {}
                        },
                        f = b(b(a[d], "elements")[0], "element");
                    s[e] = c;
                    for (var g = 0; g < f.length; g++) l(f[g], e);
                    if ((e = b(a[d], "settings")[0]) && 0 < e.childNodes.length) {
                        e = b(e, "setting");
                        for (f = 0; f < e.length; f++) {
                            var g = e[f].getAttribute("name"),
                                h = e[f].getAttribute("value");
                            /color$/.test(g) && (h = k.stringToColor(h));
                            c.settings[r(g)] = h
                        }
                    }
                    if ((e = b(a[d], "layout")[0]) && 0 < e.childNodes.length) {
                        e = b(e, "group");
                        for (f = 0; f < e.length; f++) {
                            h = e[f];
                            g = {
                                elements: []
                            };
                            c.layout[r(h.getAttribute("position"))] = g;
                            for (var m = 0; m < h.attributes.length; m++) {
                                var p = h.attributes[m];
                                g[p.name] = p.value
                            }
                            h = b(h, "*");
                            for (m = 0; m < h.length; m++) {
                                p = h[m];
                                g.elements.push({
                                    type: p.tagName
                                });
                                for (var u = 0; u < p.attributes.length; u++) {
                                    var z = p.attributes[u];
                                    g.elements[m][r(z.name)] = z.value
                                }
                                k.exists(g.elements[m].name) || (g.elements[m].name = p.tagName)
                            }
                        }
                    }
                    y = !1;
                    j()
                }
        }

        function j() {
            clearInterval(m);
            z || (m = setInterval(function() {
                var b = !0;
                a(s, function(c, d) {
                    "properties" != c && a(d.elements, function(a) {
                        (s[r(c)] ?
                            s[r(c)].elements[r(a)] : null).ready || (b = !1)
                    })
                });
                b && !y && (clearInterval(m), t(s))
            }, 100))
        }

        function l(a, b) {
            b = r(b);
            var c = new Image,
                d = r(a.getAttribute("name")),
                e = a.getAttribute("src");
            if (0 !== e.indexOf("data:image/png;base64,")) var f = k.getAbsolutePath(B),
                e = [f.substr(0, f.lastIndexOf("/")), b, e].join("/");
            s[b].elements[d] = {
                height: 0,
                width: 0,
                src: "",
                ready: !1,
                image: c
            };
            c.onload = function() {
                var a = b,
                    e = s[r(a)] ? s[r(a)].elements[r(d)] : null;
                e ? (e.height = Math.round(c.height / q * u), e.width = Math.round(c.width / q * u), e.src = c.src,
                    e.ready = !0, j()) : k.log("Loaded an image for a missing element: " + a + "." + d)
            };
            c.onerror = function() {
                z = !0;
                j();
                A("Skin image not found: " + this.src)
            };
            c.src = e
        }

        function r(a) {
            return a ? a.toLowerCase() : ""
        }
        var s = {},
            t = f,
            A = g,
            y = !0,
            m, B = e,
            z = !1,
            u = (jwplayer.utils.isMobile(), 1),
            q = 1;
        "string" != typeof B || "" === B ? p(d.defaultskin()) : "xml" != k.extension(B) ? A("Skin not a valid file type") : new d.skinloader("", h, A)
    }
})(jwplayer.html5);
(function(d) {
    var k = d.utils,
        a = d.events,
        c = k.css;
    d.html5.thumbs = function(e) {
        function f(a) {
            l = null;
            try {
                a = (new d.parsers.srt).parse(a.responseText, !0)
            } catch (b) {
                g(b.message);
                return
            }
            if ("array" !== k.typeOf(a)) return g("Invalid data");
            p = a
        }

        function g(a) {
            l = null;
            k.log("Thumbnails could not be loaded: " + a)
        }

        function h(a, d, e) {
            a.onload = null;
            d.width || (d.width = a.width, d.height = a.height);
            d["background-image"] = a.src;
            c.style(b, d);
            e && e(d.width)
        }
        var b, p, j, l, r, s = {},
            t, A = new a.eventdispatcher;
        k.extend(this, A);
        b = document.createElement("div");
        b.id = e;
        this.load = function(a) {
            c.style(b, {
                display: "none"
            });
            l && (l.onload = null, l.onreadystatechange = null, l.onerror = null, l.abort && l.abort(), l = null);
            t && (t.onload = null);
            a ? (j = a.split("?")[0].split("/").slice(0, -1).join("/"), l = k.ajax(a, f, g, !0)) : (p = r = t = null, s = {})
        };
        this.element = function() {
            return b
        };
        this.updateTimeline = function(a, b) {
            if (p) {
                for (var c = 0; c < p.length && a > p[c].end;) c++;
                c === p.length && c--;
                c = p[c].text;
                a: {
                    var d = c;
                    if (d && d !== r) {
                        r = d;
                        0 > d.indexOf("://") && (d = j ? j + "/" + d : d);
                        var e = {
                            display: "block",
                            margin: "0 auto",
                            "background-position": "0 0",
                            width: 0,
                            height: 0
                        };
                        if (0 < d.indexOf("#xywh")) try {
                            var f = /(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(d),
                                d = f[1];
                            e["background-position"] = -1 * f[2] + "px " + -1 * f[3] + "px";
                            e.width = f[4];
                            e.height = f[5]
                        } catch (k) {
                            g("Could not parse thumbnail");
                            break a
                        }
                        var l = s[d];
                        l ? h(l, e, b) : (l = new Image, l.onload = function() {
                            h(l, e, b)
                        }, s[d] = l, l.src = d);
                        t && (t.onload = null);
                        t = l
                    }
                }
                return c
            }
        }
    }
})(jwplayer);
(function(d) {
    var k = d.jwplayer,
        a = k.html5,
        c = k.utils,
        e = k.events,
        f = e.state,
        g = c.css,
        h = c.bounds,
        b = c.isMobile(),
        p = c.isIPad(),
        j = c.isIPod(),
        l = "aspectMode",
        r = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"],
        s = "hidden",
        t = "none",
        A = "block";
    a.view = function(y, m) {
        function B(a) {
            a = c.between(m.position + a, 0, this.getDuration());
            this.seek(a)
        }

        function z(a) {
            a = c.between(this.getVolume() + a, 0, 100);
            this.setVolume(a)
        }

        function u(a) {
            var b;
            b = a.ctrlKey || a.metaKey ? !1 : m.controls ? !0 : !1;
            if (!b) return !0;
            N.adMode() || (ca(), L());
            b = k(y.id);
            switch (a.keyCode) {
                case 27:
                    b.setFullscreen(!1);
                    break;
                case 13:
                case 32:
                    b.play();
                    break;
                case 37:
                    N.adMode() || B.call(b, -5);
                    break;
                case 39:
                    N.adMode() || B.call(b, 5);
                    break;
                case 38:
                    z.call(b, 10);
                    break;
                case 40:
                    z.call(b, -10);
                    break;
                case 77:
                    b.setMute();
                    break;
                case 70:
                    b.setFullscreen();
                    break;
                default:
                    if (48 <= a.keyCode && 59 >= a.keyCode) {
                        var c = (a.keyCode - 48) / 10 * b.getDuration();
                        b.seek(c)
                    }
            }
            if (/13|32|37|38|39|40/.test(a.keyCode)) return a.preventDefault(), !1
        }

        function q() {
            xa = !0;
            va.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: !1
            })
        }

        function w() {
            var a = !xa;
            xa = !1;
            a && va.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: !0
            });
            N.adMode() || (ca(), L())
        }

        function v() {
            xa = !1;
            va.sendEvent(e.JWPLAYER_VIEW_TAB_FOCUS, {
                hasFocus: !1
            })
        }

        function C() {
            var a = h(P),
                c = Math.round(a.width),
                f = Math.round(a.height);
            if (document.body.contains(P)) {
                if (c && f && (c !== $a || f !== Ja)) $a = c, Ja = f, X && X.redraw(), clearTimeout(da), da = setTimeout(D, 50), va.sendEvent(e.JWPLAYER_RESIZE, {
                    width: c,
                    height: f
                })
            } else d.removeEventListener("resize", C), b && d.removeEventListener("orientationchange",
                C);
            return a
        }

        function F(a) {
            a && (a.element().addEventListener("mousemove", M, !1), a.element().addEventListener("mouseout", I, !1))
        }

        function x() {}

        function K() {
            clearTimeout(ya);
            ya = setTimeout(za, Xa)
        }

        function n(a, b) {
            var c = document.createElement(a);
            b && (c.className = b);
            return c
        }

        function L() {
            clearTimeout(ya);
            ya = setTimeout(za, Xa)
        }

        function J() {
            clearTimeout(ya);
            var a = y.jwGetState();
            if (a === f.PLAYING || a === f.PAUSED || S) Ca(), Na || (ya = setTimeout(za, Xa))
        }

        function M() {
            clearTimeout(ya);
            Na = !0
        }

        function I() {
            Na = !1
        }

        function G(a) {
            va.sendEvent(a.type,
                a)
        }

        function O(a) {
            if (a.done) R();
            else {
                if (!a.complete) {
                    N.adMode() || (N.instreamMode(!0), N.adMode(!0), N.show(!0));
                    N.setText(a.message);
                    var b = a.onClick;
                    void 0 !== b && X.setAlternateClickHandler(function() {
                        b(a)
                    });
                    void 0 !== a.onSkipAd && Y && Y.setSkipoffset(a, a.onSkipAd)
                }
                Y && Y.adChanged(a)
            }
        }

        function R() {
            N.setText("");
            N.adMode(!1);
            N.instreamMode(!1);
            N.show(!0);
            Y && (Y.adsEnded(), Y.setState(y.jwGetState()));
            X.revertAlternateClickHandler()
        }

        function Q(a, b, d) {
            var e = P.className,
                f, h, j = y.id + "_view";
            g.block(j);
            if (d = !!d) e = e.replace(/\s*aspectMode/,
                ""), P.className !== e && (P.className = e), g.style(P, {
                display: A
            }, d);
            c.exists(a) && c.exists(b) && (m.width = a, m.height = b);
            d = {
                width: a
            }; - 1 === e.indexOf(l) && (d.height = b);
            g.style(P, d, !0);
            X && X.redraw();
            N && N.redraw(!0);
            ea && (ea.offset(N && 0 <= ea.position().indexOf("bottom") ? N.height() + N.margin() : 0), setTimeout(function() {
                ga && ga.offset("top-left" === ea.position() ? ea.element().clientWidth + ea.margin() : 0)
            }, 500));
            T(b);
            f = m.playlistsize;
            h = m.playlistposition;
            if (E && f && ("right" === h || "bottom" === h)) E.redraw(), e = {
                    display: A
                }, d = {}, e[h] =
                0, d[h] = f, "right" === h ? e.width = f : e.height = f, g.style(Ya, e), g.style(Ea, d);
            D(a, b);
            g.unblock(j)
        }

        function T(a) {
            var b = h(P);
            fa = 0 < a.toString().indexOf("%") || 0 === b.height ? !1 : "bottom" === m.playlistposition ? b.height <= 40 + m.playlistsize : 40 >= b.height;
            N && (fa ? (N.audioMode(!0), Ca(), X.hidePreview(!0), X && X.hide(), Sa(!1)) : (N.audioMode(!1), Va(y.jwGetState())));
            ea && fa && H();
            P.style.backgroundColor = fa ? "transparent" : "#000"
        }

        function D(a, b) {
            if (!a || isNaN(Number(a))) {
                if (!ba) return;
                a = ba.clientWidth
            }
            if (!b || isNaN(Number(b))) {
                if (!ba) return;
                b = ba.clientHeight
            }
            c.isMSIE(9) && (document.all && !d.atob) && (a = b = "100%");
            m.getVideo().resize(a, b, m.stretching) && (clearTimeout(da), da = setTimeout(D, 250))
        }

        function U(a) {
            void 0 !== a.jwstate ? a = a.jwstate : na ? (a = document.fullscreenElement || document.webkitCurrentFullScreenElement || document.mozFullScreenElement || document.msFullscreenElement, a = !!(a && a.id === y.id)) : a = S ? pa.getVideo().getFullScreen() : m.getVideo().getFullScreen();
            na ? aa(P, a) : Z(a)
        }

        function aa(a, b) {
            c.removeClass(a, "jwfullscreen");
            b ? (c.addClass(a, "jwfullscreen"),
                g.style(document.body, {
                    "overflow-y": s
                }), L()) : g.style(document.body, {
                "overflow-y": ""
            });
            N && N.redraw();
            X && X.redraw();
            ga && ga.redraw();
            D();
            Z(b)
        }

        function Z(a) {
            m.setFullscreen(a);
            pa && pa.setFullscreen(a);
            a ? (clearTimeout(da), da = setTimeout(D, 200)) : p && y.jwGetState() === f.PAUSED && setTimeout(Fa, 500)
        }

        function ca() {
            N && m.controls && (S ? La.show() : N.show())
        }

        function ha() {
            !0 !== la && (N && !fa && !m.getVideo().isAudioFile()) && (S && La.hide(), N.hide())
        }

        function oa() {
            ga && (!fa && m.controls) && ga.show()
        }

        function Da() {
            ga && (!ia && !m.getVideo().isAudioFile()) &&
                ga.hide()
        }

        function H() {
            ea && (!m.getVideo().isAudioFile() || fa) && ea.hide(fa)
        }

        function Fa() {
            X && m.controls && !fa && (!j || y.jwGetState() === f.IDLE) && X.show();
            (!b || !m.fullscreen) && m.getVideo().setControls(!1)
        }

        function za() {
            clearTimeout(ya);
            if (!0 !== la) {
                $ = !1;
                var a = y.jwGetState();
                (!m.controls || a !== f.PAUSED) && ha();
                m.controls || Da();
                a !== f.IDLE && a !== f.PAUSED && (Da(), H());
                c.addClass(P, "jw-user-inactive")
            }
        }

        function Ca() {
            if (!1 !== la) {
                $ = !0;
                if (m.controls || fa) ca(), oa();
                ta.hide && ea && !fa && ea.show();
                c.removeClass(P, "jw-user-inactive")
            }
        }

        function Sa(a) {
            a = a && !fa;
            m.getVideo().setVisibility(a)
        }

        function jb() {
            ia = !0;
            Qa(!1);
            m.controls && oa()
        }

        function pb() {
            Y && Y.setState(y.jwGetState())
        }

        function Pa(a) {
            ia = !1;
            clearTimeout(Za);
            Za = setTimeout(function() {
                Va(a.newstate)
            }, 100)
        }

        function ab() {
            ha()
        }

        function Va(a) {
            if (m.getVideo().isCaster) X && (X.show(), X.hidePreview(!1)), g.style(ba, {
                visibility: "visible",
                opacity: 1
            }), N && (N.show(), N.hideFullscreen(!0));
            else {
                switch (a) {
                    case f.PLAYING:
                        la = !0 !== m.getVideo().isCaster ? null : !0;
                        (S ? pa : m).getVideo().isAudioFile() ? (Sa(!1),
                            X.hidePreview(fa), X.setHiding(!0), N && (Ca(), N.hideFullscreen(!0)), oa()) : (Sa(!0), D(), X.hidePreview(!0), N && N.hideFullscreen(!m.getVideo().supportsFullscreen()));
                        break;
                    case f.IDLE:
                        Sa(!1);
                        fa || (X.hidePreview(!1), Fa(), oa(), N && N.hideFullscreen(!1));
                        break;
                    case f.BUFFERING:
                        Fa();
                        za();
                        b && Sa(!0);
                        break;
                    case f.PAUSED:
                        Fa(), Ca()
                }
                ea && !fa && ea.show()
            }
        }

        function Wa(a) {
            return "#" + y.id + (a ? " ." + a : "")
        }

        function bb(a, b) {
            g(a, {
                display: b ? A : t
            })
        }
        var P, Ea, sa, cb, Ya, ya = -1,
            Xa = b ? 4E3 : 2E3,
            ba, $a, Ja, wa, La, Ta, pa, S = !1,
            N, X, Y, ga, ea, ta = c.extend({},
                m.componentConfig("logo")),
            ka, E, fa, W = !1,
            $ = !1,
            la = null,
            ia, Ga, da = -1,
            Na = !1,
            Ma, Oa, na = !1,
            xa = !1,
            va = c.extend(this, new e.eventdispatcher);
        this.getCurrentCaptions = function() {
            return ka.getCurrentCaptions()
        };
        this.setCurrentCaptions = function(a) {
            ka.setCurrentCaptions(a)
        };
        this.getCaptionsList = function() {
            return ka.getCaptionsList()
        };
        this.setup = function(h) {
            if (!W) {
                y.skin = h;
                Ea = n("span", "jwmain");
                Ea.id = y.id + "_view";
                ba = n("span", "jwvideo");
                ba.id = y.id + "_media";
                sa = n("span", "jwcontrols");
                wa = n("span", "jwinstream");
                Ya = n("span",
                    "jwplaylistcontainer");
                cb = n("span", "jwaspect");
                h = m.height;
                var s = m.componentConfig("controlbar"),
                    p = m.componentConfig("display");
                T(h);
                ka = new a.captions(y, m.captions);
                ka.addEventListener(e.JWPLAYER_CAPTIONS_LIST, G);
                ka.addEventListener(e.JWPLAYER_CAPTIONS_CHANGED, G);
                ka.addEventListener(e.JWPLAYER_CAPTIONS_LOADED, x);
                sa.appendChild(ka.element());
                X = new a.display(y, p);
                X.addEventListener(e.JWPLAYER_DISPLAY_CLICK, function(a) {
                    G(a);
                    b ? $ ? za() : Ca() : Pa({
                        newstate: y.jwGetState()
                    });
                    $ && L()
                });
                fa && X.hidePreview(!0);
                sa.appendChild(X.element());
                ea = new a.logo(y, ta);
                sa.appendChild(ea.element());
                ga = new a.dock(y, m.componentConfig("dock"));
                sa.appendChild(ga.element());
                y.edition && !b ? Ga = new a.rightclick(y, {
                    abouttext: m.abouttext,
                    aboutlink: m.aboutlink
                }) : b || (Ga = new a.rightclick(y, {}));
                m.playlistsize && (m.playlistposition && m.playlistposition !== t) && (E = new a.playlistcomponent(y, {}), Ya.appendChild(E.element()));
                N = new a.controlbar(y, s);
                N.addEventListener(e.JWPLAYER_USER_ACTION, L);
                sa.appendChild(N.element());
                j && ha();
                c.canCast() && va.forceControls(!0);
                P.onmousedown =
                    q;
                P.onfocusin = w;
                P.addEventListener("focus", w);
                P.onfocusout = v;
                P.addEventListener("blur", v);
                P.addEventListener("keydown", u);
                Ea.appendChild(ba);
                Ea.appendChild(sa);
                Ea.appendChild(wa);
                P.appendChild(Ea);
                P.appendChild(cb);
                P.appendChild(Ya);
                m.getVideo().setContainer(ba);
                m.addEventListener("fullscreenchange", U);
                for (h = r.length; h--;) document.addEventListener(r[h], U, !1);
                d.removeEventListener("resize", C);
                d.addEventListener("resize", C, !1);
                b && (d.removeEventListener("orientationchange", C), d.addEventListener("orientationchange",
                    C, !1));
                k(y.id).onAdPlay(function() {
                    N.adMode(!0);
                    Va(f.PLAYING);
                    L()
                });
                k(y.id).onAdSkipped(function() {
                    N.adMode(!1)
                });
                k(y.id).onAdComplete(function() {
                    N.adMode(!1)
                });
                k(y.id).onAdError(function() {
                    N.adMode(!1)
                });
                y.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, Pa);
                y.jwAddEventListener(e.JWPLAYER_MEDIA_ERROR, ab);
                y.jwAddEventListener(e.JWPLAYER_PLAYLIST_COMPLETE, jb);
                y.jwAddEventListener(e.JWPLAYER_PLAYLIST_ITEM, pb);
                y.jwAddEventListener(e.JWPLAYER_CAST_AVAILABLE, function() {
                    c.canCast() ? va.forceControls(!0) : va.releaseControls()
                });
                y.jwAddEventListener(e.JWPLAYER_CAST_SESSION, function(a) {
                    Y || (Y = new k.html5.castDisplay(y.id), Y.statusDelegate = function(a) {
                        Y.setState(a.newstate)
                    });
                    a.active ? (g.style(ka.element(), {
                        display: "none"
                    }), va.forceControls(!0), Y.setState("connecting").setName(a.deviceName).show(), y.jwAddEventListener(e.JWPLAYER_PLAYER_STATE, Y.statusDelegate), y.jwAddEventListener(e.JWPLAYER_CAST_AD_CHANGED, O)) : (y.jwRemoveEventListener(e.JWPLAYER_PLAYER_STATE, Y.statusDelegate), y.jwRemoveEventListener(e.JWPLAYER_CAST_AD_CHANGED,
                        O), Y.hide(), N.adMode() && R(), g.style(ka.element(), {
                        display: null
                    }), Pa({
                        newstate: y.jwGetState()
                    }), C())
                });
                Pa({
                    newstate: f.IDLE
                });
                b || (sa.addEventListener("mouseout", K, !1), sa.addEventListener("mousemove", J, !1), c.isMSIE() && (ba.addEventListener("mousemove", J, !1), ba.addEventListener("click", X.clickHandler)));
                F(N);
                F(ga);
                F(ea);
                g("#" + P.id + "." + l + " .jwaspect", {
                    "margin-top": m.aspectratio,
                    display: A
                });
                h = c.exists(m.aspectratio) ? parseFloat(m.aspectratio) : 100;
                s = m.playlistsize;
                g("#" + P.id + ".playlist-right .jwaspect", {
                    "margin-bottom": -1 *
                        s * (h / 100) + "px"
                });
                g("#" + P.id + ".playlist-right .jwplaylistcontainer", {
                    width: s + "px",
                    right: 0,
                    top: 0,
                    height: "100%"
                });
                g("#" + P.id + ".playlist-bottom .jwaspect", {
                    "padding-bottom": s + "px"
                });
                g("#" + P.id + ".playlist-bottom .jwplaylistcontainer", {
                    width: "100%",
                    height: s + "px",
                    bottom: 0
                });
                g("#" + P.id + ".playlist-right .jwmain", {
                    right: s + "px"
                });
                g("#" + P.id + ".playlist-bottom .jwmain", {
                    bottom: s + "px"
                });
                setTimeout(function() {
                    Q(m.width, m.height)
                }, 0)
            }
        };
        var Qa = this.fullscreen = function(a) {
            c.exists(a) || (a = !m.fullscreen);
            a = !!a;
            a !== m.fullscreen &&
                (na ? (a ? Ma.apply(P) : Oa.apply(document), aa(P, a)) : c.isIE() ? aa(P, a) : (pa && pa.getVideo().setFullScreen(a), m.getVideo().setFullScreen(a)))
        };
        this.resize = function(a, b) {
            Q(a, b, !0);
            C()
        };
        this.resizeMedia = D;
        var ja = this.completeSetup = function() {
                g.style(P, {
                    opacity: 1
                });
                d.onbeforeunload = function() {
                    m.getVideo().isCaster || y.jwStop()
                }
            },
            Za;
        this.setupInstream = function(a, b, c, d) {
            g.unblock();
            bb(Wa("jwinstream"), !0);
            bb(Wa("jwcontrols"), !1);
            wa.appendChild(a);
            La = b;
            Ta = c;
            pa = d;
            Pa({
                newstate: f.PLAYING
            });
            S = !0;
            wa.addEventListener("mousemove",
                J);
            wa.addEventListener("mouseout", K)
        };
        this.destroyInstream = function() {
            g.unblock();
            bb(Wa("jwinstream"), !1);
            bb(Wa("jwcontrols"), !0);
            wa.innerHTML = "";
            wa.removeEventListener("mousemove", J);
            wa.removeEventListener("mouseout", K);
            S = !1
        };
        this.setupError = function(a) {
            W = !0;
            k.embed.errorScreen(P, a, m);
            ja()
        };
        this.addButton = function(a, b, c, d) {
            ga && (ga.addButton(a, b, c, d), y.jwGetState() === f.IDLE && oa())
        };
        this.removeButton = function(a) {
            ga && ga.removeButton(a)
        };
        this.setControls = function(a) {
            var b = !!a;
            b !== m.controls && (m.controls =
                b, S ? a ? (La.show(), Ta.show()) : (La.hide(), Ta.hide()) : b && Pa({
                    newstate: y.jwGetState()
                }), b || (za(), X && X.hide()), va.sendEvent(e.JWPLAYER_CONTROLS, {
                    controls: b
                }))
        };
        this.forceControls = function(a) {
            la = !!a;
            a ? Ca() : za()
        };
        this.releaseControls = function() {
            la = null;
            Va(y.jwGetState())
        };
        this.addCues = function(a) {
            N && N.addCues(a)
        };
        this.forceState = function(a) {
            X.forceState(a)
        };
        this.releaseState = function() {
            X.releaseState(y.jwGetState())
        };
        this.getSafeRegion = function(a) {
            var b = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
            a = a || !c.exists(a);
            N.showTemp();
            ga.showTemp();
            var d = h(Ea),
                e = d.top,
                f = S ? h(document.getElementById(y.id + "_instream_controlbar")) : h(N.element()),
                g = S ? !1 : 0 < ga.numButtons(),
                j = 0 === ea.position().indexOf("top"),
                k = h(ea.element());
            g && m.controls && (g = h(ga.element()), b.y = Math.max(0, g.bottom - e));
            j && (b.y = Math.max(b.y, k.bottom - e));
            b.width = d.width;
            b.height = f.height && a && m.controls ? (j ? f.top : k.top) - e - b.y : d.height - b.y;
            N.hideTemp();
            ga.hideTemp();
            return b
        };
        this.destroy = function() {
            d.removeEventListener("resize", C);
            d.removeEventListener("orientationchange",
                C);
            for (var a = r.length; a--;) document.removeEventListener(r[a], U, !1);
            m.removeEventListener("fullscreenchange", U);
            P.removeEventListener("keydown", u, !1);
            Ga && Ga.destroy();
            Y && (y.jwRemoveEventListener(e.JWPLAYER_PLAYER_STATE, Y.statusDelegate), Y.destroy(), Y = null);
            sa && (sa.removeEventListener("mousemove", J), sa.removeEventListener("mouseout", K));
            ba && (ba.removeEventListener("mousemove", J), ba.removeEventListener("click", X.clickHandler));
            S && this.destroyInstream()
        };
        P = n("div", "jwplayer playlist-" + m.playlistposition);
        P.id = y.id;
        P.tabIndex = 0;
        Ma = P.requestFullscreen || P.webkitRequestFullscreen || P.webkitRequestFullScreen || P.mozRequestFullScreen || P.msRequestFullscreen;
        Oa = document.exitFullscreen || document.webkitExitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen;
        na = Ma && Oa;
        m.aspectratio && (g.style(P, {
            display: "inline-block"
        }), P.className = P.className.replace("jwplayer", "jwplayer " + l));
        Q(m.width, m.height);
        var Ra = document.getElementById(y.id);
        Ra.parentNode.replaceChild(P,
            Ra)
    };
    g(".jwplayer", {
        position: "relative",
        display: "block",
        opacity: 0,
        "min-height": 0,
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    g(".jwmain", {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    g(".jwvideo, .jwcontrols", {
        position: "absolute",
        height: "100%",
        width: "100%",
        "-webkit-transition": "opacity .25s ease",
        "-moz-transition": "opacity .25s ease",
        "-o-transition": "opacity .25s ease"
    });
    g(".jwvideo", {
        overflow: s,
        visibility: s,
        opacity: 0
    });
    g(".jwvideo video", {
        background: "transparent",
        height: "100%",
        width: "100%",
        position: "absolute",
        margin: "auto",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    });
    g(".jwplaylistcontainer", {
        position: "absolute",
        height: "100%",
        width: "100%",
        display: t
    });
    g(".jwinstream", {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "none"
    });
    g(".jwaspect", {
        display: "none"
    });
    g(".jwplayer." + l, {
        height: "auto"
    });
    g(".jwplayer.jwfullscreen", {
        width: "100%",
        height: "100%",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        "z-index": 1E3,
        margin: 0,
        position: "fixed"
    }, !0);
    g(".jwplayer.jwfullscreen.jw-user-inactive", {
        cursor: "none",
        "-webkit-cursor-visibility": "auto-hide"
    });
    g(".jwplayer.jwfullscreen .jwmain", {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }, !0);
    g(".jwplayer.jwfullscreen .jwplaylistcontainer", {
        display: t
    }, !0);
    g(".jwplayer .jwuniform", {
        "background-size": "contain !important"
    });
    g(".jwplayer .jwfill", {
        "background-size": "cover !important",
        "background-position": "center"
    });
    g(".jwplayer .jwexactfit", {
        "background-size": "100% 100% !important"
    })
})(window);
(function(d, k) {
    function a(a) {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA" + r[a]
    }

    function c(a, b) {
        var c = k.createElement(a);
        b && e(c, b);
        return c
    }

    function e(a, b) {
        p.isArray(b) || (b = [b]);
        b = p.map(b, function(a) {
            return !a ? "" : "jwcast-" + a.toLowerCase()
        });
        a.className = b.join(" ")
    }

    function f(a, b) {
        b.join || (b = [b]);
        for (var c = 0; c < b.length; c++) a.appendChild(b[c])
    }
    var g = d.utils,
        h = d.html5,
        b = d.events,
        p = d._,
        j = b.state,
        l = g.css,
        r = {
            wheel: "DgAAAA4CAYAAACohjseAAACiUlEQVR42u3aP2sTYRzAcZ87Md6mhE5GhRqli0NC22yNKO1iaStSY+ggdKggal6BDXRoUuwbEG1LpE4B30LAxEGbKYgO7SVoUhJD04hOusRv4ZlCwP5LevfDgw9kCnzD5Z4/95xqtVqideNLTQzjKV4gCxtNtNwaqBBGCg3UkcYz3EUIV+F1W6AHj7CFb1hAEIbbb1GFByjjAyZgSvkPXkMGW7gt7SETwQ8swpL0FFV4jjpuShsmTiOFz7gobRxUWEceXokDfQKf0CdxJhNFFT6JU7Ur2MUtiXNRhXdYlDrZnkERZyUGerCNcanLpYfISV0PGtjEpNTAGyjBkBq4ggWpWxYmGghIDRzEDgypgTG8lbyrtoZ5yYFZ3JccWMKg5MCfGJAcuHf5/ge6xwX8lnyLDmCn/SEzJChwCKX2YSIqKDCKbPtAHxcUGAdNOhBPkBYUmAZNOhDXUYMSEKdQBU06EAp1BAUEBnWLgg4EXmJJQOASXnVa0YdRcfma0NAN4U6BCpu44+LASd2g0BYIPEbexYHvdQOfOwdaqLh063AcFVj73bq3XBRnoYiZ/b58ySDposAkMlD/DNT8aGLUBXGjaMJ/0Beg9/Dd4etEH2qIHOUVdgHnHRh3DgUkjnoIIYUNh0V6sYHXUIcO1Eyso4BLDoi7jC94A/O4DgIZWEYdYycYN4YalmF04yjXNJpIwOrxOJdAE9PdPoznRxZFTPUgbgI2svD38jjlLMrI61DjmFcFU/iICmZhnMSB2DOYg41tJBGAOuSPFkASZdiYg8cpR5pHsIIGqkgjjghC6Eef1o8QIphHGlU0sIYRGE4/lB7DKnL4il/Yu/5gFzZyWEUMwzC7sXUv2l9q1CPRZSGkLwAAAABJRU5ErkJggg\x3d\x3d",
            display: "UAAAAC4AQMAAACo6KcpAAAABlBMVEV6enp6enqEWMsmAAAAAXRSTlMAQObYZgAAAEdJREFUeF7t2bEJACAMRcGAg7j/Fo6VTkvbIKSRe/XBH+DHLlaHK0qN7yAIgiAIgiAIgiAIgiAIgiAIgiAIgg0PZHfzbuUjPCPnO5qQcE/AAAAAAElFTkSuQmCC",
            pause: "CoAAAA2CAQAAAAb3sMwAAAAMElEQVR4Ae3MMQEAMAzDsIY/6AxB9/aRfyvt7GX2Ph8UCoVCoVAo9AiFQqFQKBQKfdYvoctOjDeGAAAAAElFTkSuQmCC",
            play: "DYAAAA2BAMAAAB+a3fuAAAAFVBMVEX///////////////////////////9nSIHRAAAABnRSTlMAP79AwMFfxd6iAAAAX0lEQVR4Xn3JQQGAABAEoaliFiPYYftHMMHBl55uQw455JBDDjnkkEMOOeSQQw455JBDDjnkkEMOOeSQQ+5O3HffW6hQoUKFChUqVKhQoUKFChUqVKhQoUKFChUqVKgfWHsiYI6VycIAAAAASUVORK5CYII\x3d",
            replay: "DQAAAA8CAYAAAApK5mGAAADkklEQVRoBd3BW2iVBRwA8P/cWHMsv9QilLCITLCU0khpST6JCEXrQbKMCgrKFwsfZq/LMnRRIdkFvBQUvmShgg9iV02zB7FScyWlqNHNqbCJ7PKLkFHp952dnZ3tfOv3ixgGSLAVt8b/ARIX9WADJsVIhsR/daIV42MkQiJdO5ZjdIwkSBR2Ek+gJkYCJIpzEE2Rd0gMzB7MibxCojRbcEtUGsZgJu7HYixVuh6sx6QYLrgSD+Fd/GhodKIV42Ko4B68h07Dpx3NGB3lgnnYpbJOYFoMBm7ANpW3D3NjMPAgzqqsn7EIVVEqVGOtymrHMtTGYKAeWxSvB3vxIh7ANIzFNUpzAa0YF4OFWuxUnFNYjkmRAomB6cX7uDHKAdX4QP/asRRXRAFIFO8TzI5yQov+bcO1UQQk+ncITVFumIce2XqxHFVRJCSy/YolqIlyQwOOy9aNR2KAkLhcJ1agIYYKVsvWi6eiBEj8owfrMDEGAVVYiMcjDa7HBdlejhIhcdF2TI9BQiP2uOgsro5LYa1sX6M2SoQ6zItBwmRsdrnn498wDuel68aMqDBMQZd0v6Mu+mCJbBsiJ7BdtkXRB7ul68HNkRNolO3D+BvGoke6HZEz+Fa6c6gJNMn2WOQMmmW7K/CSbBMiZ3CbbM8EPpKuLXIIo3BWujcCh6TbEjmFr6TbGfhDulcip7BJugOBbulaIqfwlnRHQ7bnIqewVrpjgU7pVkZOYaN0hwOnpFsfOYWt0u0LfCnd55FT+EG6zYEN0p1BdeQMEnRLtzKwTLZZkTO4V7bFgTtka4mcwTrZrgtU47R0P6E6cgINOCfdkeiDjbItipzAs7K1Rh/Mle0gaqLC0IBTsk2PPhiFI7ItiwrDKtl2xaXwqGwdmBoVgrvRJdv8uBRq0CbbISQxzDARJ2TbG1kwX2GfoT6GCa7CN7J1Y0YUgk0K+wJjY4hhAg4o7LXoD8bjuMIOY1oMETTiuMIOoj6KgTvRobDzaEZtlAnq8QK6FHYGU2IgcB+69e97LEJNlAh1eBrH9K8DjVEKPIxuxTmJVZiFmugHajEHa/Cb4nRiQQwGmtBpYM7hU7yNFjSjGSuwDrvRYWD+RGOUA25Hm8rZj8lRThiDd9Br+PTgVdTFUMFcfGfo7cHMGA4YhYXYr/x2YQGqohIwG2vwi9Idw2pMjzzBVCzBm/gYR3EaXbiA02jDDryOJ3FTlNFfAO8ENqnn13UAAAAASUVORK5CYII\x3d"
        },
        s = !1,
        t = 316 / 176;
    h.castDisplay = function(r) {
        function p() {
            if (M) {
                var a = M.element();
                a.parentNode && a.parentNode.removeChild(a);
                M.resetEventListeners();
                M = null
            }
        }

        function m() {
            G && (G.parentNode && G.parentNode.removeChild(G), G = null)
        }

        function B() {
            I && (I.parentNode && I.parentNode.removeChild(I), I = null)
        }
        s || (l(".jwplayer .jwcast-display", {
                display: "none",
                position: "absolute",
                width: "100%",
                height: "100%",
                "background-repeat": "no-repeat",
                "background-size": "auto",
                "background-position": "50% 50%",
                "background-image": a("display")
            }),
            l(".jwplayer .jwcast-label", {
                position: "absolute",
                left: 10,
                right: 10,
                bottom: "50%",
                "margin-bottom": 100,
                "text-align": "center"
            }), l(".jwplayer .jwcast-label span", {
                "font-family": '"Karbon", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                "font-size": 20,
                "font-weight": 300,
                color: "#7a7a7a"
            }), l(".jwplayer span.jwcast-name", {
                color: "#ccc"
            }), l(".jwcast-button", {
                position: "absolute",
                width: "100%",
                height: "100%",
                opacity: 0,
                "background-repeat": "no-repeat",
                "background-size": "auto",
                "background-position": "50% 50%"
            }), l(".jwcast-wheel", {
                "background-image": a("wheel")
            }), l(".jwcast-pause", {
                "background-image": a("pause")
            }), l(".jwcast-play", {
                "background-image": a("play")
            }), l(".jwcast-replay", {
                "background-image": a("replay")
            }), l(".jwcast-paused .jwcast-play", {
                opacity: 1
            }), l(".jwcast-playing .jwcast-pause", {
                opacity: 1
            }), l(".jwcast-idle .jwcast-replay", {
                opacity: 1
            }), g.cssKeyframes("spin", "from {transform: rotate(0deg);} to {transform: rotate(360deg);}"), l(".jwcast-connecting .jwcast-wheel, .jwcast-buffering .jwcast-wheel", {
                opacity: 1,
                "-webkit-animation": "spin 1.5s linear infinite",
                animation: "spin 1.5s linear infinite"
            }), l(".jwcast-companion", {
                position: "absolute",
                "background-position": "50% 50%",
                "background-size": "316px 176px",
                "background-repeat": "no-repeat",
                top: 0,
                left: 0,
                right: 0,
                bottom: 4
            }), l(".jwplayer .jwcast-click-label", {
                "font-family": '"Karbon", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
                "font-size": 14,
                "font-weight": 300,
                "text-align": "center",
                position: "absolute",
                left: 10,
                right: 10,
                top: "50%",
                color: "#ccc",
                "margin-top": 100,
                "-webkit-user-select": "none",
                "user-select": "none",
                cursor: "pointer"
            }), l(".jwcast-paused .jwcast-click-label", {
                color: "#7a7a7a",
                cursor: "default"
            }), s = !0);
        var z = k.getElementById(r + "_display_button"),
            u = c("div", "display"),
            q = c("div", ["pause", "button"]),
            w = c("div", ["play", "button"]),
            v = c("div", ["replay", "button"]),
            C = c("div", ["wheel", "button"]),
            F = c("div", "label"),
            x = c("span"),
            K = c("span", "name"),
            n = "#" + r + "_display.jwdisplay",
            L = -1,
            J = null,
            M = null,
            I = null,
            G = null;
        f(u, [C, q, w, v, F]);
        f(F, [x, K]);
        z.parentNode.insertBefore(u, z);
        this.statusDelegate = null;
        this.setName = function(a) {
            K.innerText = a || "Google Cast";
            return this
        };
        this.setState = function(a) {
            var b = "Casting on ";
            if (null === J)
                if ("connecting" === a) b = "Connecting to ";
                else if (a !== j.IDLE) {
                var c = d(r).getPlaylistItem().title || "";
                c && (b = b.replace("on", c + " on"))
            }
            x.innerText = b;
            clearTimeout(L);
            a === j.IDLE && (L = setTimeout(function() {
                e(u, ["display", "idle"])
            }, 3E3), a = "");
            e(u, ["display", a || ""]);
            return this
        };
        this.show = function() {
            l(n +
                " .jwpreview", {
                    "background-size": "316px 176px !important",
                    opacity: 0.6,
                    "margin-top": -2
                });
            l(n + " .jwdisplayIcon", {
                display: "none !important"
            });
            l.style(u, {
                display: "block"
            });
            return this
        };
        this.hide = function() {
            g.clearCss(n + " .jwpreview");
            l(n + " .jwdisplayIcon", {
                display: ""
            });
            l.style(u, {
                display: "none"
            });
            return this
        };
        this.setSkipoffset = function(a, c) {
            if (null === M) {
                var d = k.getElementById(r + "_controlbar"),
                    e = 10 + g.bounds(u).bottom - g.bounds(d).top;
                M = new h.adskipbutton(r, e | 0, a.skipMessage, a.skipText);
                M.addEventListener(b.JWPLAYER_AD_SKIPPED,
                    function() {
                        c(a)
                    });
                M.reset(a.skipoffset || -1);
                M.show();
                d.parentNode.insertBefore(M.element(), d)
            } else M.reset(a.skipoffset || -1)
        };
        this.setCompanions = function(a) {
            var b, d, e, g = Number.MAX_VALUE,
                h = null;
            for (d = a.length; d--;)
                if (b = a[d], b.width && b.height && b.source) switch (b.type) {
                    case "html":
                    case "iframe":
                    case "application/x-shockwave-flash":
                        break;
                    default:
                        e = Math.abs(b.width / b.height - t), e < g && (g = e, 0.75 > e && (h = b))
                }(a = h) ? (null === I && (I = c("div", "companion"), f(u, I)), a.width / a.height > t ? (b = 316, d = a.height * b / a.width) : (d = 176,
                    b = a.width * d / a.height), l.style(I, {
                    "background-image": a.source,
                    "background-size": b + "px " + d + "px"
                })) : B()
        };
        this.adChanged = function(a) {
            if (a.complete) M && M.reset(-1), J = null;
            else {
                M && (void 0 === a.skipoffset ? p() : (a.position || a.duration) && M.updateSkipTime(a.position | 0, a.duration | 0));
                var b = a.tag + a.sequence;
                b !== J && (l(n + " .jwpreview", {
                    opacity: 0
                }), a.companions ? this.setCompanions(a.companions) : B(), a.clickthrough ? null === G && (G = c("div", "click-label"), G.innerText = "Click here to learn more \x3e", f(u, G)) : m(), J = b, this.setState(a.newstate))
            }
        };
        this.adsEnded = function() {
            p();
            B();
            m();
            l(n + " .jwpreview", {
                opacity: 0.6
            });
            J = null
        };
        this.destroy = function() {
            this.hide();
            u.parentNode && u.parentNode.removeChild(u)
        }
    }
})(jwplayer, document);
(function(d) {
    var k = jwplayer.utils.extend,
        a = d.logo;
    a.defaults.prefix = "";
    a.defaults.file = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAAyCAMAAACkjD/XAAACnVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCQkSEhIAAAAaGhoAAAAiIiIrKysAAAAxMTEAAAA4ODg+Pj4AAABEREQAAABJSUkAAABOTk5TU1NXV1dcXFxiYmJmZmZqamptbW1xcXF0dHR3d3d9fX2AgICHh4eKioqMjIyOjo6QkJCSkpKUlJSWlpaYmJidnZ2enp6ioqKjo6OlpaWmpqanp6epqamqqqqurq6vr6+wsLCxsbG0tLS1tbW2tra3t7e6urq7u7u8vLy9vb2+vr6/v7/AwMDCwsLFxcXFxcXHx8fIyMjJycnKysrNzc3Ozs7Ozs7Pz8/Pz8/Q0NDR0dHR0dHS0tLU1NTV1dXW1tbW1tbW1tbX19fX19fa2trb29vb29vc3Nzc3Nzf39/f39/f39/f39/g4ODh4eHj4+Pj4+Pk5OTk5OTk5OTk5OTl5eXn5+fn5+fn5+fn5+fn5+fo6Ojo6Ojq6urq6urq6urr6+vr6+vr6+vt7e3t7e3t7e3t7e3u7u7u7u7v7+/v7+/w8PDw8PDw8PDw8PDy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL09PT09PT09PT09PT09PT09PT09PT29vb29vb29vb29vb29vb29vb29vb29vb39/f39/f39/f39/f39/f4+Pj4+Pj4+Pj5+fn5+fn5+fn5+fn5+fn5+fn5+fn6+vr6+vr6+vr6+vr6+vr6+vr8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz9/f39/f39/f39/f39/f39/f39/f39/f39/f3+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////9kpi5JAAAA33RSTlMAAQIDBAUGBwgJCgsMDQ4PEBESExQVFhYWFxcYGBgZGRoaGhsbHBwdHR4eHx8gISIiIyQmJicoKSoqKywtLi4uMDEyMjM0NTU2Njc5Ojo7Ozw9Pj5AQUJCQ0ZGSElKSktMTU5PUFFRUlRVVlZXWFpbXV5eX2BhYmVmZ2hpamtsbW5vcHFyc3R2d3h5enx9fn+BgoKDhIWGiYmKi4yNjo+QkZKTlJWWl5eYmZqbnJ2enp+goaKkpaamp6ipqqusra6vsLKzs7W2t7i5uru8vb6/wMHCwsPExcbHyMnJysvMVK8y+QAAB5FJREFUeNrFmP2f3EQdx8kmm2yy2WQzmZkjl3bJ2Rb12mtp8SiKiBUUxVKFVisIihV62CKCIoK0UvVK1bP07mitBeVJUVso0Duw1Xo9ET0f6JN47bV3u9+/xe83kyzr0+vlL7t8Xq9ubpLpvHfm+7i54P+UVkBp2gWdFpGNYtFA+NtALpYcxzZ1rSM0TSvgv5xse0wwu1joxDYLulE0dKTTSLcqfOvMQ1WzoHXAtCadsGXqBCsUnWDxNBzmlq51wLSuz0LmOcTWClZFfA1ghLUbrUwbdq396kAvK5s6HoFdlb8FuLONB66RlGnD5S8BwKkNoVMsFEw3XIOj97hmoX2updP5kml7jgLp/Ec8yzBKntwDMCnwa7TPtUrkWLrliW2gtC+0TdNhvdMAu1hJ19plYNcP0LGKiJp/HJTeEI5V8sjJ4PZ2mTp1rb7Pf5C5JbvCN0Cuha7jpE5WX9oeU6us8YlTUH8grFQC+QzkWuKVvdTJXuWO0Z5Nk2tNkWNdzgLed+4tdNWrkpPBI20ytVYwK+LrQLpPcHk3vIVm1ZCcDD7jt8fUGmYNoeLpJzKW+1vQYSjJyc72ZKbWSOqqhpn+99r/rn99WDDLbJViHZbJirkWtJDkZPArbhta2jFg7LdKV1ID9aWaz5CTzTD0pvB2aypB9xYPKtaUXEC7bKKjeA1dHyJTU+xbFgY/RiAKP2lYsm28RaJmAtfTs6c4xP9g0gycUqKpeDGLegZPl3MqTL6oWCdl9EIrOol20/U6zyzgVJzpeV6l7Dhl18VP1/N8v1r1vQoNSziH1nPKKMdBChbAiprheygfL65tZmxazguYXDoL8BcyqlhRb0W/M3Wy412YRTUd7SKEFIKzIBQ8DBhHewgSjkLB7GwS54wxwcoORqYQ+QyhFGA9VIYxnfCKq2VtE3k3wTB1taLx+FVCNTRyxnU4YQ/8WEY9M7PvkvJHsEsAam5srRRwH0YBhml14Zv7pRz62+LAD/jWE0vHINU6OUGXyc0Mt5GiLW/+6blV8eO4tY8B6t3qvBsZOnUy+HJgFaiuMELfhQ6RrAe4JZGvwxcFPLx69YZDZ1ciOrB03ayEd52vr0x6/zokhbxs+p5o7Oc3kfrkxFOrV392d+NWFaeaXvK652Cw+xTAo9cS5ar0vKcfy9BrgNRfMVN0SOh+gPfWtgN8L7kM6pcI2FSrJUtm7kc0KxlF2xcHd/1xWxxvmv1QLB9/5cJobDiKIxklcmI4ShJ5eJ/qOTSqU6/BBC4JN6boQSAN71Doi1Mnm+B0Rjlavgabo/GZ2V/LL8FRSehkkfzzYIouoqXf31jz3de7kq5DB6JP1a+vSUQnOXrRoujpn2XogumJpwCeBfhDV4qeAdK1QwqdOhkMqdAyyyk6HoHR3tmD4/UlI/DDBNFxHK1tDBDaNrHODU7KDzTW16Lr6nccHZGxHNt3Jao/RrSU8pPTeX+JPYj4NpAGkxsg16FoWP1xP5Bu8UwdYxSXJXRyJ0zeCtsegdsm4QsLBBwcHf3l+fF5hHbscnDh1LeSaGwvModnTl7ChVRuNiblxIkjR6bq+9+R9RzkO7cBadWCdZBroDaq/jgDqHMLMYtSr8jkpwl9aaOxF9bdDHsb9T5Ev/rkk6N398SIDj3X5zfDzi1bDpxdHNWWwcOchS27funeR+EOyTI0RcyKLIM20VPzyOObeh4LJsZ/hYnaRpgRsTwG9TPzLz5XhyOSDlzykDEKLsEYl08cG0W9eW+U4B1eZZmtY7J13PXCeHeg0MrPjlH8yLiJ/mYtfqIFvQVNTaez/cMrfwHHpJC7APZH0csAP5ARokPPwXyIoEjKaOnM7UIIOfKKrJEJvEAguhZHUY1sHb3vH1tCxyS0OvGtAL+/iMubQOlMXyKfA6U8i+I0PqWyecA3AmyVEmPhczxEdBUbOKwCsHsAtfNUDyZNdiNcLQld8cTYgQHScjExjNPvOf9RSsrZtt3uB3f2s0Dku35MyiY6z6LYjbMdx+HvO7pd11/egBtCvh7mFvs+P70Rl8L0yU8r7WROyXb5b77Dxemv+I7L82wmxoeY53U9+/K8HE1ZvBq4eGQfh1SNa0Keo5tZVCXwXs7KluUwIZjrMsrHTsB95f4B50JwztGURtHywsBjvGphtIUiFeb9Kn4pjzHXUOhmlXPI3Ug/5QH6BjS1uWpRRdLNku3YWPNw4RKVSSqfpKLq3k3bIZXMvFha+NjQqXqlhYxKa9EgFJGVqKCrqD2ZloJrql7Qgq4vw9DKfn0ahp73B+ln3hPQY/xKJEO1CC2P6T49UOP/fD+R5qphSBvAslttQb8YZr1os7/5ry0P8VDNoZK6T8pnZpdW4bb9ZWPQ2NPtlhxf/A5yPUApt+0/MP2uqy5nLkaKLyZycuOKCp13u9mWXXasol4staAPYyprN1p5CvkR1nD5pxz9jQDPu1Pvbii3yklQmr2U/LtDUr9Fngelp0NqwDsmirPtoLRWJdxOiQrp9Yr8XGiTk3XyxF2eFuw3+ju5aRJl1Yu+f+LMM1eiexc6/lK0QuWpYhkd3XT+UsfOXhd2WKpO6W/TO3BUO8H/BB7RwuB6W7b7AAAAAElFTkSuQmCC";
    d.logo =
        function(c, d) {
            "free" == c.edition() ? d = null : (a.defaults.file = "", a.defaults.prefix = "");
            k(this, new a(c, d))
        }
})(jwplayer.html5);
(function(d) {
    var k = d.html5,
        a = k.model;
    k.model = function(c, e) {
        var f = new d.utils.key(c.key),
            g = new a(c, e),
            h = g.componentConfig;
        g.edition = function() {
            return f.edition()
        };
        g.componentConfig = function(a) {
            return "logo" == a ? g.logo : h(a)
        };
        return g
    }
})(jwplayer);
(function(d) {
    var k = d.html5,
        a = k.player;
    k.player = function(c) {
        c = new a(c);
        var e;
        e = c._model.edition();
        if ("enterprise" === e || "ads" === e) e = new d.cast.controller(c, c._model), c.jwStartCasting = e.startCasting, c.jwStopCasting = e.stopCasting;
        return c
    };
    a.prototype.edition = function() {
        return this._model.edition()
    }
})(jwplayer);
(function(d) {
    function k(e) {
        if (!a.isFunction(e.supports)) throw {
            message: "Tried to register a provider with an invalid object"
        };
        var f = function() {};
        f.prototype = d.html5.DefaultProvider;
        e.prototype = new f;
        c.unshift(e)
    }
    var a = d._,
        c = [d.html5.YoutubeProvider, d.html5.VideoProvider];
    a.each(d.unregisteredProviders, k);
    delete d.unregisteredProviders;
    d.html5.chooseProvider = function(d) {
        d = a.isObject(d) ? d : {};
        return a.find(c, function(a) {
            return a.supports(d)
        })
    };
    d.html5.registerProvider = k
})(jwplayer);
(function(d) {
    var k = jwplayer.utils.extend,
        a = d.rightclick;
    d.rightclick = function(c, e) {
        if ("free" == c.edition()) e.aboutlink = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + d.version + "\x26m\x3dh\x26e\x3df", delete e.abouttext;
        else {
            if (!e.aboutlink) {
                var f = "http://www.longtailvideo.com/jwpabout/?a\x3dr\x26v\x3d" + d.version + "\x26m\x3dh\x26e\x3d",
                    g = c.edition();
                e.aboutlink = f + ("pro" == g ? "p" : "premium" == g ? "r" : "enterprise" == g ? "e" : "ads" == g ? "a" : "f")
            }
            e.abouttext ? e.abouttext += " ..." : (f = c.edition(), f = f.charAt(0).toUpperCase() +
                f.substr(1), e.abouttext = "About JW Player " + d.version + " (" + f + " edition)")
        }
        k(this, new a(c, e))
    }
})(jwplayer.html5);
(function(d) {
    var k = d.cast,
        a = d.utils;
    k.adprovider = function(c, e) {
        function f() {
            p = {
                message: j,
                position: 0,
                duration: -1
            }
        }

        function g(b, d) {
            var f = {
                command: b
            };
            void 0 !== d && (f.args = d);
            e.sendMessage(c, f, a.noop, function(a) {
                k.error("message send error", a)
            })
        }
        var h = new k.provider(c, e),
            b = a.extend(this, h),
            p, j = "Loading ad",
            l = 0;
        b.init = function() {
            h.init();
            f()
        };
        b.destroy = function() {
            h.destroy()
        };
        b.updateModel = function(a, b) {
            (a.tag || a.newstate || a.sequence || a.companions) && k.log("received ad change:", a);
            a.tag && (p.tag && a.tag !==
                p.tag) && (k.error("ad messages not received in order. new model:", a, "old model:", p), f());
            d.utils.extend(p, a);
            h.updateModel(a, b)
        };
        b.getAdModel = function() {
            var b = a.extend({}, p);
            if (0 < p.duration) {
                var c = p,
                    d = c.message.replace(/xx/gi, "" + Math.min(c.duration | 0, Math.ceil(c.duration - c.position)));
                c.podMessage && 1 < c.podcount && (d = c.podMessage.replace(/__AD_POD_CURRENT__/g, "" + c.sequence).replace(/__AD_POD_LENGTH__/g, "" + c.podcount) + d);
                b.message = d
            } else b.message = j;
            return b
        };
        b.resetAdModel = function() {
            f()
        };
        b.skipAd = function(a) {
            g("skipAd", {
                tag: a.tag
            })
        };
        b.clickAd = function(a) {
            l = (new Date).getTime();
            g("clickAd", {
                tag: a.tag
            })
        };
        b.timeSinceClick = function() {
            return (new Date).getTime() - l
        }
    }
})(window.jwplayer);
(function(d) {
    var k = d.cast,
        a = d.utils,
        c = d.events,
        e = d._,
        f = c.state;
    k.provider = function(d) {
        function h(a) {
            j.oldstate = j.newstate;
            j.newstate = a;
            b.sendEvent(c.JWPLAYER_PLAYER_STATE, {
                oldstate: j.oldstate,
                newstate: j.newstate
            })
        }
        var b = a.extend(this, new c.eventdispatcher("cast.provider")),
            p = -1,
            j = {
                newstate: f.IDLE,
                oldstate: f.IDLE,
                buffer: 0,
                position: 0,
                duration: -1,
                audioMode: !1
            },
            l = document.createElement("div");
        l.className = "jwcast-screen";
        l.onclick = function() {
            b.sendEvent(c.JWPLAYER_PROVIDER_CLICK)
        };
        b.isCaster = !0;
        b.init =
            function() {};
        b.destroy = function() {
            clearTimeout(p);
            _castSession = null
        };
        b.updateModel = function(a, d) {
            a.newstate && (j.newstate = a.newstate, j.oldstate = a.oldstate || j.oldstate, b.sendEvent(c.JWPLAYER_PLAYER_STATE, {
                oldstate: j.oldstate,
                newstate: j.newstate
            }));
            if ("ad" !== d) {
                if (void 0 !== a.position || void 0 !== a.duration) void 0 !== a.position && (j.position = a.position), void 0 !== a.duration && (j.duration = a.duration), b.sendEvent(c.JWPLAYER_MEDIA_TIME, {
                    position: j.position,
                    duration: j.duration
                });
                void 0 !== a.buffer && (j.buffer = a.buffer,
                    b.sendEvent(c.JWPLAYER_MEDIA_BUFFER, {
                        bufferPercent: j.buffer
                    }))
            }
        };
        b.supportsFullscreen = function() {
            return !1
        };
        b.setup = function(a, b) {
            b.state && (j.newstate = b.state);
            void 0 !== b.buffer && (j.buffer = b.buffer);
            void 0 !== a.position && (j.position = a.position);
            void 0 !== a.duration && (j.duration = a.duration);
            h(f.BUFFERING);
            d("setup", a)
        };
        b.playlistItem = function(a) {
            h(f.BUFFERING);
            d("item", a)
        };
        b.load = function(a) {
            h(f.BUFFERING);
            d("load", a)
        };
        b.stop = function() {
            clearTimeout(p);
            p = setTimeout(function() {
                h(f.IDLE);
                d("stop")
            }, 0)
        };
        b.play = function() {
            d("play")
        };
        b.pause = function() {
            h(f.PAUSED);
            d("pause")
        };
        b.seek = function(a) {
            h(f.BUFFERING);
            b.sendEvent(c.JWPLAYER_MEDIA_SEEK, {
                position: j.position,
                offset: a
            });
            d("seek", a)
        };
        b.audioMode = function() {
            return j.audioMode
        };
        b.sendCommand = function(a, b) {
            d(a, b)
        };
        b.detachMedia = function() {
            k.error("detachMedia called while casting");
            return document.createElement("video")
        };
        b.attachMedia = function() {
            k.error("attachMedia called while casting")
        };
        var r;
        b.setContainer = function(a) {
            a.appendChild(l);
            r = a
        };
        b.getContainer =
            function() {
                return r
            };
        b.remove = function() {
            r.removeChild(l)
        };
        b.volume = b.mute = b.setControls = b.setCurrentQuality = b.resize = b.seekDrag = b.addCaptions = b.resetCaptions = b.setVisibility = b.fsCaptions = a.noop;
        b.setFullScreen = b.getFullScreen = b.checkComplete = e.constant(!1);
        b.getWidth = b.getHeight = b.getCurrentQuality = e.constant(0);
        b.getQualityLevels = e.constant(["Auto"])
    };
    a.css(".jwplayer .jwcast-screen", {
        width: "100%",
        height: "100%"
    })
})(window.jwplayer);
