/**
 * chrome-promise 2.0.2
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 * Simplified by Mike Updike 2017
 */
!function(e, t) {
    e.ChromePromise = t(e);
}(this, function(e) {
    "use strict";
    function t(n) {
        function s(e, t) {
            return function() {
                const r = o.call(arguments);
                return new c(function(n, s) {
                    r.push(function() {
                        const e = l.lastError, t = o.call(arguments);
                        if (e) s(e); else switch (t.length) {
                          case 0:
                            n();
                            break;

                          case 1:
                            n(t[0]);
                            break;

                          default:
                            n(t);
                        }
                    }), e.apply(t, r);
                });
            };
        }
        function a(e, o) {
            for (let n in e) if (r.call(e, n)) {
                const r = e[n], i = typeof r;
                "object" !== i || r instanceof t ? o[n] = "function" === i ? s(r, e) : r : (o[n] = {}, 
                a(r, o[n]));
            }
        }
        const i = (n = n || {}).chrome || e.chrome, c = n.Promise || e.Promise, l = i.runtime;
        a(i, this);
    }
    const o = Array.prototype.slice, r = Object.prototype.hasOwnProperty;
    return t;
}), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
function(e, t) {
    e.ExceptionHandler = t(e);
}(this, function(e) {
    "use strict";
    return function() {
        "object" == typeof e.onerror && (e.onerror = function(e, t, o, r, n) {
            Chrome && Chrome.Log && n && Chrome.Log.exception(n, null, !0);
        });
    };
}), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.GA = function() {
    "use strict";
    window.addEventListener("load", function() {
        !function(e, t, o, r, n, s, a) {
            e.GoogleAnalyticsObject = n, e.ga = e.ga || function() {
                (e.ga.q = e.ga.q || []).push(arguments);
            }, e.ga.l = 1 * new Date(), s = t.createElement(o), a = t.getElementsByTagName(o)[0], 
            s.async = 1, s.src = "https://www.google-analytics.com/analytics.js", a.parentNode.insertBefore(s, a);
        }(window, document, "script", 0, "ga");
    });
    return {
        EVENT: {
            INSTALLED: {
                eventCategory: "extension",
                eventAction: "installed",
                eventLabel: ""
            },
            UPDATED: {
                eventCategory: "extension",
                eventAction: "updated",
                eventLabel: ""
            },
            MENU: {
                eventCategory: "ui",
                eventAction: "menuSelect",
                eventLabel: ""
            },
            TOGGLE: {
                eventCategory: "ui",
                eventAction: "toggle",
                eventLabel: ""
            },
            LINK: {
                eventCategory: "ui",
                eventAction: "linkSelect",
                eventLabel: ""
            },
            TEXT: {
                eventCategory: "ui",
                eventAction: "textChanged",
                eventLabel: ""
            },
            SLIDER_VALUE: {
                eventCategory: "ui",
                eventAction: "sliderValueChanged",
                eventLabel: ""
            },
            SLIDER_UNITS: {
                eventCategory: "ui",
                eventAction: "sliderUnitsChanged",
                eventLabel: ""
            },
            BUTTON: {
                eventCategory: "ui",
                eventAction: "buttonClicked",
                eventLabel: ""
            },
            ICON: {
                eventCategory: "ui",
                eventAction: "toolbarIconClicked",
                eventLabel: ""
            },
            CHECK: {
                eventCategory: "ui",
                eventAction: "checkBoxClicked",
                eventLabel: ""
            },
            KEY_COMMAND: {
                eventCategory: "ui",
                eventAction: "keyCommand",
                eventLabel: ""
            }
        },
        initialize: function(e, t, o, r) {
            ga("create", e, "auto"), ga("set", "checkProtocolTask", function() {}), ga("set", "appName", t), 
            ga("set", "appId", o), ga("set", "appVersion", r), ga("require", "displayfeatures");
        },
        page: function(e) {
            e && (Chrome.Utils.DEBUG || ga("send", "pageview", e));
        },
        event: function(e, t = null, o = null) {
            if (e) {
                const r = Chrome.JSONUtils.shallowCopy(e);
                r.hitType = "event", r.eventLabel = t || r.eventLabel, r.eventAction = o || r.eventAction, 
                Chrome.Utils.DEBUG ? console.log(r) : ga("send", r);
            }
        },
        error: function(e = "unknown", t = "unknownMethod") {
            const o = {
                hitType: "event",
                eventCategory: "error",
                eventAction: t,
                eventLabel: `Err: ${e}`
            };
            Chrome.Utils.DEBUG ? console.error(o) : ga("send", o);
        },
        exception: function(e, t = null, o = !1) {
            try {
                let r = "Unknown";
                t ? r = t : e.message && (r = e.message), e.stack && (r += `\n\n${e.stack}`);
                const n = {
                    hitType: "exception",
                    exDescription: r,
                    exFatal: o
                };
                Chrome.Utils.DEBUG ? console.error(n) : ga("send", n);
            } catch (e) {
                Chrome.Utils.noop();
            }
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Log = function() {
    "use strict";
    return {
        error: function(e = "unknown", t = "unknownMethod", o = null) {
            const r = o || "An error occurred";
            Chrome.Storage.setLastError(new Chrome.Storage.LastError(e, r)), Chrome.GA.error(e, t);
        },
        exception: function(e, t = null, o = !1, r = "An exception was caught") {
            try {
                Chrome.Storage.setLastError(new Chrome.Storage.LastError(t, r)), Chrome.GA.exception(e, t, o);
            } catch (e) {
                Chrome.Utils.noop();
            }
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.JSONUtils = function() {
    "use strict";
    return new ExceptionHandler(), {
        parse: function(e) {
            let t = null;
            try {
                t = JSON.parse(e);
            } catch (e) {
                Chrome.GA.exception(`Caught: JSONUtils.parse: ${e.message}`, e.stack, !1);
            }
            return t;
        },
        shallowCopy: function(e) {
            let t = null;
            const o = JSON.stringify(e);
            return void 0 !== o && (t = Chrome.JSONUtils.parse(o)), t;
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Storage = function() {
    "use strict";
    new ExceptionHandler();
    const e = new ChromePromise();
    return {
        get: function(e, t = null) {
            let o = t, r = localStorage.getItem(e);
            return null !== r && (o = Chrome.JSONUtils.parse(r)), o;
        },
        getInt: function(e, t = null) {
            let o = localStorage.getItem(e), r = parseInt(o, 10);
            return Number.isNaN(r) && (r = null === t ? r : t, null === t && Chrome.GA.error(`NaN value for: ${e} equals ${o}`, "Storage.getInt")), 
            r;
        },
        getBool: function(e, t = null) {
            return Chrome.Storage.get(e, t);
        },
        set: function(e, t = null) {
            if (null === t) localStorage.removeItem(e); else {
                const o = JSON.stringify(t);
                localStorage.setItem(e, o);
            }
        },
        safeSet: function(e, t, o) {
            let r = !0;
            const n = Chrome.Storage.get(e);
            try {
                Chrome.Storage.set(e, t);
            } catch (t) {
                r = !1, n && Chrome.Storage.set(e, n), o && (n && n.length ? Chrome.Storage.set(o, !0) : Chrome.Storage.set(o, !1)), 
                Chrome.Msg.send(Chrome.Msg.STORAGE_EXCEEDED).catch(() => {});
            }
            return r;
        },
        LastError: function(e = "", t = "An error occurred") {
            this.name = "LastError", this.message = e, this.title = t, this.stack = new Error().stack, 
            Chrome.Storage.LastError.prototype = Object.create(Error.prototype), Chrome.Storage.LastError.prototype.constructor = Chrome.Storage.LastError;
        },
        getLastError: function() {
            return e.storage.local.get("lastError").then(e => e.lastError ? Promise.resolve(e.lastError) : new Chrome.Storage.LastError());
        },
        setLastError: function(t) {
            return e.storage.local.set({
                lastError: t
            });
        },
        clearLastError: function() {
            return Chrome.Storage.setLastError(new Chrome.Storage.LastError());
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Locale = function() {
    "use strict";
    return new ExceptionHandler(), {
        localize: function(e) {
            return chrome.i18n.getMessage(e);
        },
        getLocale: function() {
            return chrome.i18n.getMessage("@@ui_locale");
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Utils = function() {
    "use strict";
    new ExceptionHandler();
    const e = new ChromePromise();
    return {
        DEBUG: !1,
        getExtensionName: function() {
            return `chrome-extension://${chrome.runtime.id}`;
        },
        getVersion: function() {
            return chrome.runtime.getManifest().version;
        },
        getChromeVersion: function() {
            const e = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
            return !!e && parseInt(e[2], 10);
        },
        getFullChromeVersion: function() {
            const e = navigator.userAgent;
            return e || "Unknown";
        },
        getPlatformOS: function() {
            return e.runtime.getPlatformInfo().then(e => {
                let t = "Unknown";
                switch (e.os) {
                  case "win":
                    t = "MS Windows";
                    break;

                  case "mac":
                    t = "Mac";
                    break;

                  case "android":
                    t = "Android";
                    break;

                  case "cros":
                    t = "Chrome OS";
                    break;

                  case "linux":
                    t = "Linux";
                    break;

                  case "openbsd":
                    t = "OpenBSD";
                }
                return Promise.resolve(t);
            });
        },
        isWindows: function() {
            return e.runtime.getPlatformInfo().then(e => Promise.resolve("win" === e.os));
        },
        isChromeOS: function() {
            return e.runtime.getPlatformInfo().then(e => Promise.resolve("cros" === e.os));
        },
        isMac: function() {
            return e.runtime.getPlatformInfo().then(e => Promise.resolve("mac" === e.os));
        },
        noop: function() {},
        isWhiteSpace: function(e) {
            return !e || 0 === e.length || /^\s*$/.test(e);
        },
        getRandomString: function(e = 8) {
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let o = "";
            for (let r = 0; r < e; r++) o += t.charAt(Math.floor(Math.random() * t.length));
            return o;
        },
        getRandomInt: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        },
        shuffleArray: function(e) {
            for (let t = (e ? e.length : 0) - 1; t > 0; t--) {
                const o = Math.floor(Math.random() * (t + 1)), r = e[t];
                e[t] = e[o], e[o] = r;
            }
        }
    };
}(), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Msg = function() {
    "use strict";
    new ExceptionHandler();
    const e = {
        HIGHLIGHT: {
            message: "highlightTab"
        },
        RESTORE_DEFAULTS: {
            message: "restoreDefaults"
        },
        STORAGE_EXCEEDED: {
            message: "storageExceeded"
        },
        STORE: {
            message: "store",
            key: "",
            value: ""
        }
    };
    return {
        HIGHLIGHT: e.HIGHLIGHT,
        RESTORE_DEFAULTS: e.RESTORE_DEFAULTS,
        STORAGE_EXCEEDED: e.STORAGE_EXCEEDED,
        STORE: e.STORE,
        send: function(e) {
            return new ChromePromise().runtime.sendMessage(e, null).then(e => Promise.resolve(e)).catch(t => {
                if (t.message && !t.message.includes("port closed") && !t.message.includes("Receiving end does not exist")) {
                    const o = `type: ${e.message}, ${t.message}`;
                    Chrome.GA.error(o, "Msg.send");
                }
                return Promise.reject(t);
            });
        },
        listen: function(e) {
            chrome.runtime.onMessage.addListener(e);
        }
    };
}(), new ExceptionHandler(), window.Chrome = window.Chrome || {}, Chrome.Time = class e {
    constructor(e = null) {
        this._parse(e);
    }
    static get MIN_IN_DAY() {
        return 1440;
    }
    static get MSEC_IN_DAY() {
        return 60 * Chrome.Time.MIN_IN_DAY * 1e3;
    }
    static _is24Hr(e = null) {
        let t = !1, o = Chrome.Storage.getInt("showTime", 0);
        null !== e && (o = e);
        const r = Chrome.Locale.localize("time_format");
        return 2 === o ? t = !0 : 0 === o && "24" === r && (t = !0), t;
    }
    static getTime(t) {
        const o = new Date(), r = new e(t);
        return o.setHours(r._hr), o.setMinutes(r._min), o.setSeconds(0), o.setMilliseconds(0), 
        o.getTime();
    }
    static getTimeDelta(e) {
        const t = Date.now();
        let o = (Chrome.Time.getTime(e) - t) / 1e3 / 60;
        return o < 0 && (o = Chrome.Time.MIN_IN_DAY + o), o;
    }
    static isInRange(e, t) {
        const o = Date.now(), r = Chrome.Time.getTime(e), n = Chrome.Time.getTime(t);
        let s = !1;
        return e === t ? s = !0 : n > r ? o >= r && o <= n && (s = !0) : (o >= r || o <= n) && (s = !0), 
        s;
    }
    static getStringFull(t, o = null) {
        return new e(t).toString(o);
    }
    static getStringShort() {
        let t = new e().toString();
        return t = t.replace(/[^\d:]/g, ""), t = t.replace(/(.*?:.*?):.*/g, "$1");
    }
    _parse(e) {
        if (null === e) {
            const e = new Date();
            this._hr = e.getHours(), this._min = e.getMinutes();
        } else this._hr = parseInt(e.substr(0, 2), 10), this._min = parseInt(e.substr(3, 2), 10);
    }
    toString(t = null) {
        const o = new Date();
        o.setHours(this._hr, this._min), o.setSeconds(0), o.setMilliseconds(0);
        let r = o.toTimeString();
        const n = [];
        void 0 !== navigator.language && n.push(navigator.language), n.push("en-US");
        const s = {
            hour: "numeric",
            minute: "2-digit",
            hour12: !e._is24Hr(t)
        };
        try {
            r = o.toLocaleTimeString(n, s);
        } catch (e) {
            Chrome.Utils.noop();
        }
        return r;
    }
}, /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Http = function() {
    "use strict";
    function e(e, o, s, a, i) {
        if (e.ok) return e.json();
        if (i >= a.maxRetries) return Promise.reject(t(e));
        const c = e.status;
        return a.backoff && c >= 500 && c < 600 ? r(o, s, a, i) : a.isAuth && a.token && a.retryToken && 401 === c ? n(o, s, a, i) : a.isAuth && a.interactive && a.token && a.retryToken && 403 === c ? n(o, s, a, i) : Promise.reject(t(e));
    }
    function t(e) {
        let t = "Unknown error.";
        if (e && e.status && void 0 !== e.statusText) {
            let o = Chrome.Locale.localize("err_status");
            void 0 !== o && "" !== o || (o = "Status"), t = `${o}: ${e.status}`, t += `\n${e.statusText}`;
        }
        return new Error(t);
    }
    function o(e, t) {
        return e ? Chrome.Auth.getToken(t).then(e => Promise.resolve(e)).catch(e => t && (e.message.includes("revoked") || e.message.includes("Authorization page could not be loaded")) ? Chrome.Auth.getToken(!1) : Promise.reject(e)) : Promise.resolve(null);
    }
    function r(e, t, o, r) {
        return r++, new Promise((n, a) => {
            const i = (Math.pow(2, r) - 1) * l;
            setTimeout(() => s(e, t, o, r).then(n, a), i);
        });
    }
    function n(e, t, o, r) {
        return Chrome.GA.error("Refreshed auth token.", "Http._retryToken"), Chrome.Auth.removeCachedToken(o.token).then(() => (o.token = null, 
        o.retryToken = !1, s(e, t, o, r)));
    }
    function s(t, r, n, s) {
        return o(n.isAuth, n.interactive).then(e => (n.isAuth && (n.token = e, r.headers.set(i, `${c} ${n.token}`)), 
        fetch(t, r))).then(o => e(o, t, r, n, s)).catch(e => {
            let t = e.message;
            return "Failed to fetch" === t && (void 0 !== (t = Chrome.Locale.localize("err_network")) && "" !== t || (t = "Network error")), 
            Promise.reject(new Error(t));
        });
    }
    function a(e, t, o) {
        (o = null === o ? u : o).isAuth && t.headers.set(i, `${c} unknown`);
        return s(e, t, o, 0);
    }
    new ExceptionHandler();
    const i = "Authorization", c = "Bearer", l = 1e3, u = {
        isAuth: !1,
        retryToken: !1,
        interactive: !1,
        token: null,
        backoff: !0,
        maxRetries: 4
    };
    return {
        conf: u,
        doGet: function(e, t = null) {
            return a(e, {
                method: "GET",
                headers: new Headers({})
            }, t);
        },
        doPost: function(e, t = null) {
            return a(e, {
                method: "POST",
                headers: new Headers({})
            }, t);
        }
    };
}(window), /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Auth = function() {
    "use strict";
    new ExceptionHandler();
    const e = new ChromePromise();
    return {
        getToken: function(t = !1) {
            return e.identity.getAuthToken({
                interactive: t
            }).then(e => Promise.resolve(e));
        },
        removeCachedToken: function(t = null) {
            let o = null;
            return null === t ? this.getToken(!1).then(t => (o = t, e.identity.removeCachedAuthToken({
                token: t
            }))).then(() => Promise.resolve(o)) : (o = t, e.identity.removeCachedAuthToken({
                token: t
            }).then(() => Promise.resolve(o)));
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.GA = function() {
    "use strict";
    const e = "UA-61314754-1";
    window.addEventListener("load", function() {
        Chrome.GA.initialize(e, "Photo Screensaver", "photo-screen-saver", Chrome.Utils.getVersion());
    });
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.Msg = function() {
    "use strict";
    new ExceptionHandler();
    const e = {
        SS_SHOW: {
            message: "showScreensaver"
        },
        SS_CLOSE: {
            message: "closeScreensaver"
        },
        SS_IS_SHOWING: {
            message: "isScreensaverShowing"
        },
        PHOTO_SOURCE_FAILED: {
            message: "photoSourceFailed",
            key: "",
            error: ""
        }
    };
    return {
        SS_SHOW: e.SS_SHOW,
        SS_CLOSE: e.SS_CLOSE,
        SS_IS_SHOWING: e.SS_IS_SHOWING,
        PHOTO_SOURCE_FAILED: e.PHOTO_SOURCE_FAILED
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.Utils = function() {
    "use strict";
    new ExceptionHandler();
    return {
        DEBUG: !1,
        getEmail: function() {
            return "photoscreensaver@gmail.com";
        },
        getEmailBody: function() {
            return `Extension version: ${Chrome.Utils.getVersion()}\n` + `Chrome version: ${Chrome.Utils.getFullChromeVersion()}\n` + `OS: ${Chrome.Storage.get("os")}\n\n\n`;
        },
        getEmailUrl: function(e, t) {
            return `mailto:${encodeURIComponent(app.Utils.getEmail())}?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(t)}`;
        },
        getGithubPath: function() {
            return "https://github.com/opus1269/photo-screen-saver/";
        },
        getGithubPagesPath: function() {
            return "https://opus1269.github.io/photo-screen-saver/";
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.PhotoSources = function() {
    "use strict";
    function e() {
        let e = [];
        for (const o in t) if (t.hasOwnProperty(o)) {
            const r = t[o];
            if (Chrome.Storage.getBool(r)) try {
                const t = app.PhotoSource.createSource(r);
                t && e.push(t);
            } catch (e) {
                Chrome.GA.exception(e, `${r} failed to load`, !1);
            }
        }
        return e;
    }
    new ExceptionHandler();
    const t = {
        ALBUMS_GOOGLE: "useGoogleAlbums",
        PHOTOS_GOOGLE: "useGooglePhotos",
        CHROMECAST: "useChromecast",
        ED_500: "useEditors500px",
        POP_500: "usePopular500px",
        YEST_500: "useYesterday500px",
        SPACE_RED: "useSpaceReddit",
        EARTH_RED: "useEarthReddit",
        ANIMAL_RED: "useAnimalReddit",
        INT_FLICKR: "useInterestingFlickr",
        AUTHOR: "useAuthors"
    };
    return {
        UseKey: t,
        getUseKeys: function() {
            let e = [];
            for (const o in t) t.hasOwnProperty(o) && e.push(t[o]);
            return e;
        },
        isUseKey: function(e) {
            let o = !1;
            for (const r in t) if (t.hasOwnProperty(r) && t[r] === e) {
                o = !0;
                break;
            }
            return o;
        },
        process: function(e) {
            try {
                const t = app.PhotoSource.createSource(e);
                if (t) return t.process();
            } catch (t) {
                return Chrome.GA.exception(t, `${e} failed to load`, !1), Promise.reject(t);
            }
        },
        getSelectedPhotos: function() {
            const t = e();
            let o = [];
            for (const e of t) o.push(e.getPhotos());
            return o;
        },
        processAll: function() {
            const t = e();
            for (const e of t) e.process().catch(() => {});
        },
        processDaily: function() {
            const t = e();
            for (const e of t) e.isDaily() && e.process().catch(() => {});
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler(), app.PhotoSource = class {
        constructor(e, t, o, r, n, s, a = null) {
            this._useKey = e, this._photosKey = t, this._type = o, this._desc = r, this._isDaily = n, 
            this._isArray = s, this._loadArg = a;
        }
        static createSource(e) {
            switch (e) {
              case app.PhotoSources.UseKey.ALBUMS_GOOGLE:
                return new app.GoogleSource(e, "albumSelections", "Google User", Chrome.Locale.localize("google_title_photos"), !0, !0, !0);

              case app.PhotoSources.UseKey.PHOTOS_GOOGLE:
                return new app.GoogleSource(e, "googleImages", "Google User", "NOT IMPLEMENTED", !0, !1, !1);

              case app.PhotoSources.UseKey.CHROMECAST:
                return new app.CCSource(e, "ccImages", "Google", Chrome.Locale.localize("setting_chromecast"), !1, !1, null);

              case app.PhotoSources.UseKey.ED_500:
                return new app.Px500Source(e, "editors500pxImages", "500", Chrome.Locale.localize("setting_500editors"), !0, !1, "editors");

              case app.PhotoSources.UseKey.POP_500:
                return new app.Px500Source(e, "popular500pxImages", "500", Chrome.Locale.localize("setting_500popular"), !0, !1, "popular");

              case app.PhotoSources.UseKey.YEST_500:
                return new app.Px500Source(e, "yesterday500pxImages", "500", Chrome.Locale.localize("setting_500yest"), !0, !1, "fresh_yesterday");

              case app.PhotoSources.UseKey.INT_FLICKR:
                return new app.FlickrSource(e, "flickrInterestingImages", "flickr", Chrome.Locale.localize("setting_flickr_int"), !0, !1, !1);

              case app.PhotoSources.UseKey.AUTHOR:
                return new app.FlickrSource(e, "authorImages", "flickr", Chrome.Locale.localize("setting_mine"), !1, !1, !0);

              case app.PhotoSources.UseKey.SPACE_RED:
                return new app.RedditSource(e, "spaceRedditImages", "reddit", Chrome.Locale.localize("setting_reddit_space"), !0, !1, "r/spaceporn/");

              case app.PhotoSources.UseKey.EARTH_RED:
                return new app.RedditSource(e, "earthRedditImages", "reddit", Chrome.Locale.localize("setting_reddit_earth"), !0, !1, "r/EarthPorn/");

              case app.PhotoSources.UseKey.ANIMAL_RED:
                return new app.RedditSource(e, "animalRedditImages", "reddit", Chrome.Locale.localize("setting_reddit_animal"), !0, !1, "r/animalporn/");

              default:
                return Chrome.Log.error(`Bad PhotoSource type: ${e}`, "SSView.createView"), null;
            }
        }
        static addPhoto(e, t, o, r, n, s) {
            const a = {
                url: t,
                author: o,
                asp: r.toPrecision(3)
            };
            n && (a.ex = n), s && (a.point = s), e.push(a);
        }
        static createPoint(e, t) {
            return "number" == typeof e && "number" == typeof t ? `${e.toFixed(6)} ${t.toFixed(6)}` : `${e} ${t}`;
        }
        fetchPhotos() {}
        isDaily() {
            return this._isDaily;
        }
        getPhotos() {
            let e = {
                type: this._type,
                photos: []
            };
            if (this.use()) {
                let t = [];
                if (this._isArray) {
                    let e = Chrome.Storage.get(this._photosKey);
                    e = e || [];
                    for (const o of e) t = t.concat(o.photos);
                } else t = (t = Chrome.Storage.get(this._photosKey)) || [];
                e.photos = t;
            }
            return e;
        }
        use() {
            return Chrome.Storage.getBool(this._useKey);
        }
        process() {
            return this.use() ? this.fetchPhotos().then(e => {
                const t = this._savePhotos(e);
                return Chrome.Utils.isWhiteSpace(t) ? Promise.resolve() : Promise.reject(new Error(t));
            }).catch(e => {
                let t = Chrome.Locale.localize("err_photo_source_title");
                return t += `: ${this._desc}`, Chrome.Log.error(e.message, "PhotoSource.process", t), 
                Promise.reject(e);
            }) : (localStorage.removeItem(this._photosKey), Promise.resolve());
        }
        _savePhotos(e) {
            let t = null;
            const o = this._useKey;
            return e && e.length && (Chrome.Storage.safeSet(this._photosKey, e, o) || (t = "Exceeded storage capacity.")), 
            t;
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler(), app.CCSource = class extends app.PhotoSource {
        constructor(e, t, o, r, n, s, a = null) {
            super(e, t, o, r, n, s, a);
        }
        fetchPhotos() {
            return Chrome.Http.doGet("/assets/chromecast.json").then(e => {
                e = e || [];
                for (const t of e) t.asp = 1.78;
                return Promise.resolve(e);
            });
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler();
    const e = `https://${chrome.runtime.id}.chromiumapp.org/reddit`, t = "bATkDOUNW_tOlg";
    let o;
    app.RedditSource = class extends app.PhotoSource {
        constructor(e, t, o, r, n, s, a = null) {
            super(e, t, o, r, n, s, a);
        }
        static _getSize(e) {
            const t = {
                width: -1,
                height: -1
            }, o = e.match(/\[(\d*)\D*(\d*)\]/);
            return o && (t.width = parseInt(o[1], 10), t.height = parseInt(o[2], 10)), t;
        }
        static _processChildren(e) {
            const t = [];
            let o, r = 1, n = 1;
            for (const s of e) {
                const e = s.data;
                if (!e.over_18) if (e.preview && e.preview.images) {
                    let t = e.preview.images[0];
                    o = t.source.url, r = parseInt(t.source.width, 10), n = parseInt(t.source.height, 10), 
                    Math.max(r, n) > 3500 && (o = (t = t.resolutions[t.resolutions.length - 1]).url.replace(/&amp;/g, "&"), 
                    r = parseInt(t.width, 10), n = parseInt(t.height, 10));
                } else if (e.title) {
                    const t = app.RedditSource._getSize(e.title);
                    o = e.url, r = t.width, n = t.height;
                }
                const a = r / n, i = e.author;
                a && !isNaN(a) && Math.max(r, n) >= 750 && Math.max(r, n) <= 3500 && app.PhotoSource.addPhoto(t, o, i, a, e.url);
            }
            return t;
        }
        fetchPhotos() {
            let e = [];
            return o ? o(`${this._loadArg}hot`).listing({
                limit: 100
            }).then(t => (e = e.concat(app.RedditSource._processChildren(t.children)), t.next())).then(t => (e = e.concat(app.RedditSource._processChildren(t.children)), 
            Promise.resolve(e))).catch(e => {
                let t = e.message;
                if (t) {
                    const e = t.indexOf(".");
                    -1 !== e && (t = t.substring(0, e + 1));
                } else t = "Unknown Error";
                return Promise.reject(new Error(t));
            }) : Promise.reject(new Error("Snoocore library failed to load"));
        }
    }, window.addEventListener("load", function() {
        try {
            const r = window.Snoocore;
            void 0 !== r && (o = new r({
                userAgent: "photo-screen-saver",
                throttle: 0,
                oauth: {
                    type: "implicit",
                    key: t,
                    redirectUri: e,
                    scope: [ "read" ]
                }
            }));
        } catch (e) {
            Chrome.GA.exception(e, "Snoocore library failed to load", !1), o = null;
        }
    });
}(window), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler();
    const e = "https://api.flickr.com/services/rest/", t = "1edd9926740f0e0d01d4ecd42de60ac6";
    app.FlickrSource = class extends app.PhotoSource {
        constructor(e, t, o, r, n, s, a = null) {
            super(e, t, o, r, n, s, a);
        }
        static _processPhotos(e) {
            if (!e.photos || !e.photos.photo) {
                const e = new Error(Chrome.Locale.localize("err_photo_source_title"));
                return Promise.reject(e);
            }
            const t = [];
            for (const o of e.photos.photo) {
                let e, r, n = null;
                if (o && "photo" === o.media && "0" !== o.isfriend && "0" !== o.isfamily && (n = o.url_k || n, 
                n = o.url_o || n)) {
                    o.url_o ? (e = parseInt(o.width_o, 10), r = parseInt(o.height_o, 10)) : (e = parseInt(o.width_k, 10), 
                    r = parseInt(o.height_k, 10));
                    const s = e / r;
                    let a = null;
                    o.latitude && o.longitude && (a = app.PhotoSource.createPoint(o.latitude, o.longitude)), 
                    app.PhotoSource.addPhoto(t, n, o.ownername, s, o.owner, a);
                }
            }
            return Promise.resolve(t);
        }
        fetchPhotos() {
            let o;
            if (this._loadArg) {
                o = `${e}?method=flickr.people.getPublicPhotos` + `&api_key=${t}&user_id=86149994@N06` + "&extras=owner_name,url_o,media,geo&per_page=250&format=json&nojsoncallback=1";
            } else o = `${e}?method=flickr.interestingness.getList` + `&api_key=${t}&extras=owner_name,url_k,media,geo` + "&per_page=250&format=json&nojsoncallback=1";
            return Chrome.Http.doGet(o).then(e => "ok" !== e.stat ? Promise.reject(new Error(e.message)) : app.FlickrSource._processPhotos(e));
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler();
    const e = [ "Nature,City and Architecture", "Landscapes,Animals", "Macro,Still Life,Underwater" ];
    app.Px500Source = class extends app.PhotoSource {
        constructor(e, t, o, r, n, s, a = null) {
            super(e, t, o, r, n, s, a);
        }
        static _doGet(e) {
            return Chrome.Http.doGet(e).then(e => {
                if (e.error) return Promise.reject(new Error(e.error));
                const t = [];
                for (const o of e.photos) if (!o.nsfw) {
                    const e = o.width / o.height;
                    let r = null, n = null;
                    o.latitude && o.longitude && (n = app.PhotoSource.createPoint(o.latitude, o.longitude), 
                    r = {}), app.PhotoSource.addPhoto(t, o.images[0].url, o.user.fullname, e, r, n);
                }
                return Promise.resolve(t);
            });
        }
        fetchPhotos() {
            const t = this._loadArg, o = [];
            for (const r of e) {
                let e = `https://api.500px.com/v1/photos/?consumer_key=iyKV6i6wu0R8QUea9mIXvEsQxIF0tMRVXopwYcFC&feature=${t}` + `&only=${r}&rpp=90` + "&sort=rating&image_size=2048";
                o.push(app.Px500Source._doGet(e));
            }
            return Promise.all(o).then(e => {
                let t = [];
                for (const o of e) t = t.concat(o);
                return Promise.resolve(t);
            });
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    window.app = window.app || {}, new ExceptionHandler();
    const e = "https://picasaweb.google.com/data/feed/api/user/";
    app.GoogleSource = class extends app.PhotoSource {
        constructor(e, t, o, r, n, s, a = null) {
            super(e, t, o, r, n, s, a);
        }
        static _isImage(e) {
            const t = e.media$group.media$content;
            for (let e = 0; e < t.length; e++) if ("image" !== t[e].medium) return !1;
            return !0;
        }
        static _getMaxImageSize() {
            let e = "1600";
            return Chrome.Storage.getBool("fullResGoogle") && (e = "d"), e;
        }
        static _hasGeo(e) {
            return !!(e.georss$where && e.georss$where.gml$Point && e.georss$where.gml$Point.gml$pos && e.georss$where.gml$Point.gml$pos.$t);
        }
        static _getThumbnail(e) {
            let t = null;
            return e.length && e[0].media$group && e[0].media$group.media$thumbnail[0] && (t = e[0].media$group.media$thumbnail[0].url), 
            t;
        }
        static _processPhotos(e) {
            const t = [];
            if (e) {
                const o = e.feed.entry || [];
                for (const e of o) if (app.GoogleSource._isImage(e)) {
                    const o = e.media$group.media$content[0].url, r = e.media$group.media$content[0].width / e.media$group.media$content[0].height, n = e.media$group.media$credit[0].$t;
                    let s;
                    app.GoogleSource._hasGeo(e) && (s = e.georss$where.gml$Point.gml$pos.$t), app.PhotoSource.addPhoto(t, o, n, r, {}, s);
                }
            }
            return t;
        }
        static _loadAlbum(t, o = "default") {
            const r = app.GoogleSource._getMaxImageSize(), n = `${e}${o}/albumid/${t}/${`?imgmax=${r}&thumbsize=72&fields=title,gphoto:id,entry(media:group/media:content,media:group/media:credit,media:group/media:thumbnail,georss:where)&v=2&alt=json`}`;
            if ("default" === o) {
                const e = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
                return e.isAuth = !0, Chrome.Http.doGet(n, e).catch(e => {
                    const t = `${Chrome.Locale.localize("err_status")}: 404`;
                    return e.message.includes(t) ? Promise.resolve(null) : Promise.reject(e);
                });
            }
            return Chrome.Http.doGet(n);
        }
        static loadAlbumList() {
            const t = `${e}default/?max-results=2000&access=all&kind=album&fields=entry(gphoto:albumType,gphoto:id)&v=2&alt=json`, o = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
            return o.isAuth = !0, o.retryToken = !0, o.interactive = !0, Chrome.Http.doGet(t, o).then(e => {
                if (!e || !e.feed || !e.feed.entry) {
                    const e = new Error(Chrome.Locale.localize("err_no_albums"));
                    return Promise.reject(e);
                }
                const t = e.feed.entry || [], o = [];
                for (const e of t) if (!e.gphoto$albumType) {
                    const t = e.gphoto$id.$t;
                    o.push(app.GoogleSource._loadAlbum(t));
                }
                return Promise.all(o);
            }).then(e => {
                let t = [], o = 0;
                const r = e || [];
                for (const e of r) if (null !== e) {
                    const r = e.feed;
                    if (r && r.entry) {
                        const n = app.GoogleSource._getThumbnail(r.entry), s = app.GoogleSource._processPhotos(e);
                        if (s && s.length) {
                            const e = {};
                            e.index = o, e.uid = "album" + o, e.name = r.title.$t, e.id = r.gphoto$id.$t, e.ct = s.length, 
                            e.thumb = n, e.checked = !1, e.photos = s, t.push(e), o++;
                        }
                    }
                }
                return Promise.resolve(t);
            });
        }
        static _fetchAlbumPhotos() {
            const e = [], t = Chrome.Storage.get("albumSelections") || [];
            for (const o of t) e.push(app.GoogleSource._loadAlbum(o.id));
            return Promise.all(e).then(e => {
                const t = [], o = e || [];
                for (const e of o) if (e) {
                    const o = e.feed, r = app.GoogleSource._processPhotos(e);
                    r && r.length && t.push({
                        id: o.gphoto$id.$t,
                        photos: r
                    });
                }
                return Promise.resolve(t);
            });
        }
        fetchPhotos() {
            return app.GoogleSource._fetchAlbumPhotos();
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    "use strict";
    function e() {
        Chrome.Storage.set("enabled", !Chrome.Storage.getBool("enabled")), app.Data.processState("enabled");
    }
    new ExceptionHandler();
    const t = "DISPLAY_MENU", o = "ENABLE_MENU";
    chrome.runtime.onInstalled.addListener(function(e) {
        const r = new ChromePromise();
        r.contextMenus.create({
            type: "normal",
            id: t,
            title: Chrome.Locale.localize("display_now"),
            contexts: [ "browser_action" ]
        }).catch(e => {
            e.message.includes("duplicate id") || Chrome.Log.error(e.message, "chromep.contextMenus.create");
        }), r.contextMenus.create({
            type: "normal",
            id: o,
            title: Chrome.Locale.localize("disable"),
            contexts: [ "browser_action" ]
        }).catch(e => {
            e.message.includes("duplicate id") || Chrome.Log.error(e.message, "chromep.contextMenus.create");
        }), r.contextMenus.create({
            type: "separator",
            id: "SEP_MENU",
            contexts: [ "browser_action" ]
        }).catch(e => {
            e.message.includes("duplicate id") || Chrome.Log.error(e.message, "chromep.contextMenus.create");
        });
    }), chrome.contextMenus.onClicked.addListener(function(r) {
        if (r.menuItemId === t) Chrome.GA.event(Chrome.GA.EVENT.MENU, `${r.menuItemId}`), 
        app.SSControl.display(); else if (r.menuItemId === o) {
            const t = Chrome.Storage.get("enabled");
            Chrome.GA.event(Chrome.GA.EVENT.MENU, `${r.menuItemId}: ${t}`), e();
        }
    }), chrome.commands.onCommand.addListener(function(t) {
        "toggle-enabled" === t ? (Chrome.GA.event(Chrome.GA.EVENT.KEY_COMMAND, `${t}`), 
        e()) : "show-screensaver" === t && (Chrome.GA.event(Chrome.GA.EVENT.KEY_COMMAND, `${t}`), 
        app.SSControl.display());
    });
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.Data = function() {
    "use strict";
    function e() {
        const e = Chrome.Storage.getBool("enabled") ? Chrome.Locale.localize("disable") : Chrome.Locale.localize("enable");
        app.Alarm.updateBadgeText(), i.contextMenus.update("ENABLE_MENU", {
            title: e
        }).catch(() => {});
    }
    function t() {
        Chrome.Storage.getBool("keepAwake") ? chrome.power.requestKeepAwake("display") : chrome.power.releaseKeepAwake(), 
        app.Alarm.updateRepeatingAlarms(), app.Alarm.updateBadgeText();
    }
    function o() {
        chrome.idle.setDetectionInterval(app.Data.getIdleSeconds());
    }
    function r() {
        let e = 2;
        const t = Chrome.Locale.localize("time_format");
        return t && "12" === t && (e = 1), e;
    }
    function n() {
        return i.runtime.getPlatformInfo().then(e => (Chrome.Storage.set("os", e.os), Promise.resolve()));
    }
    function s() {
        Object.keys(c).forEach(function(e) {
            null === Chrome.Storage.get(e) && Chrome.Storage.set(e, c[e]);
        });
    }
    function a(e) {
        const t = Chrome.Storage.get(e);
        if (t) {
            const o = {
                base: t,
                display: t,
                unit: 0
            };
            Chrome.Storage.set(e, o);
        }
    }
    new ExceptionHandler();
    const i = new ChromePromise(), c = {
        version: 17,
        enabled: !0,
        isAlbumMode: !0,
        permPicasa: "notSet",
        permBackground: "notSet",
        allowBackground: !1,
        idleTime: {
            base: 5,
            display: 5,
            unit: 0
        },
        transitionTime: {
            base: 30,
            display: 30,
            unit: 0
        },
        skip: !0,
        shuffle: !0,
        photoSizing: 0,
        photoTransition: 1,
        interactive: !1,
        showTime: 2,
        largeTime: !1,
        fullResGoogle: !1,
        showPhotog: !0,
        showLocation: !0,
        background: "background:linear-gradient(to bottom, #3a3a3a, #b5bdc8)",
        keepAwake: !1,
        chromeFullscreen: !0,
        allDisplays: !1,
        activeStart: "00:00",
        activeStop: "00:00",
        allowSuspend: !1,
        allowPhotoClicks: !0,
        useSpaceReddit: !1,
        useEarthReddit: !1,
        useAnimalReddit: !1,
        useEditors500px: !1,
        usePopular500px: !1,
        useYesterday500px: !1,
        useInterestingFlickr: !1,
        useChromecast: !0,
        useAuthors: !1,
        useGoogle: !0,
        useGoogleAlbums: !0,
        albumSelections: [],
        useGooglePhotos: !1
    };
    return {
        initialize: function() {
            s(), n().catch(() => {}), Chrome.Storage.clearLastError().catch(e => {
                Chrome.GA.error(e.message, "Data.initialize");
            }), Chrome.Storage.set("showTime", r()), app.Data.processState();
        },
        update: function() {
            const e = Chrome.Storage.getInt("version");
            if ((Number.isNaN(e) || 17 > e) && Chrome.Storage.set("version", 17), !Number.isNaN(e)) {
                if (e < 14 && (Chrome.Storage.set("permBackground", "allowed"), Chrome.Storage.set("allowBackground", !0)), 
                e < 12 && Chrome.Storage.set("permPicasa", "allowed"), e < 10) {
                    const e = localStorage.getItem("os");
                    e && Chrome.Storage.set("os", e);
                }
                e < 8 && (a("transitionTime"), a("idleTime"));
            }
            s(), app.Data.processState();
        },
        restoreDefaults: function() {
            Object.keys(c).forEach(function(e) {
                e.includes("useGoogle") || "googlePhotosSelections" === e || "albumSelections" === e || Chrome.Storage.set(e, c[e]);
            }), Chrome.Storage.set("showTime", r()), app.Data.processState();
        },
        processState: function(r = "all") {
            const s = {
                enabled: e,
                keepAwake: t,
                activeStart: t,
                activeStop: t,
                allowSuspend: t,
                idleTime: o
            };
            if ("all" === r) Object.keys(s).forEach(function(e) {
                (0, s[e])();
            }), app.PhotoSources.processAll(), Chrome.Storage.get("os") || n().catch(() => {}); else if (app.PhotoSources.isUseKey(r) || "fullResGoogle" === r) {
                const e = "fullResGoogle" === r ? "useGoogleAlbums" : r;
                app.PhotoSources.process(e).catch(t => {
                    const o = app.Msg.PHOTO_SOURCE_FAILED;
                    return o.key = e, o.error = t.message, Chrome.Msg.send(o);
                }).catch(() => {});
            } else {
                const e = s[r];
                void 0 !== e && e();
            }
        },
        getIdleSeconds: function() {
            return 60 * Chrome.Storage.get("idleTime").base;
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.Alarm = function() {
    "use strict";
    function e() {
        Chrome.Storage.getBool("keepAwake") && chrome.power.requestKeepAwake("display");
        const e = app.Data.getIdleSeconds();
        n.idle.queryState(e).then(e => (Chrome.Storage.getBool("enabled") && "idle" === e && app.SSControl.display(!1), 
        Promise.resolve())).catch(e => {
            Chrome.Log.error(e.message, "Alarm._setActiveState");
        }), app.Alarm.updateBadgeText();
    }
    function t() {
        Chrome.Storage.getBool("allowSuspend") ? chrome.power.releaseKeepAwake() : chrome.power.requestKeepAwake("system"), 
        app.SSControl.close(), app.Alarm.updateBadgeText();
    }
    function o() {
        let e = "";
        e = Chrome.Storage.getBool("enabled") ? app.Alarm.isActive() ? "" : Chrome.Locale.localize("sleep_abbrev") : Chrome.Storage.getBool("keepAwake") ? Chrome.Locale.localize("power_abbrev") : Chrome.Locale.localize("off_abbrev"), 
        chrome.browserAction.setBadgeText({
            text: e
        });
    }
    function r(r) {
        switch (r.name) {
          case s.ACTIVATE:
            e();
            break;

          case s.DEACTIVATE:
            t();
            break;

          case s.UPDATE_PHOTOS:
            app.PhotoSources.processDaily();
            break;

          case s.BADGE_TEXT:
            o();
        }
    }
    new ExceptionHandler();
    const n = new ChromePromise(), s = {
        ACTIVATE: "ACTIVATE",
        DEACTIVATE: "DEACTIVATE",
        UPDATE_PHOTOS: "UPDATE_PHOTOS",
        BADGE_TEXT: "BADGE_TEXT"
    };
    return window.addEventListener("load", function() {
        chrome.alarms.onAlarm.addListener(r);
    }), {
        updateRepeatingAlarms: function() {
            const e = Chrome.Storage.getBool("keepAwake"), o = Chrome.Storage.getBool("activeStart"), r = Chrome.Storage.getBool("activeStop");
            if (e && o !== r) {
                const e = Chrome.Time.getTimeDelta(o), n = Chrome.Time.getTimeDelta(r);
                chrome.alarms.create(s.ACTIVATE, {
                    delayInMinutes: e,
                    periodInMinutes: Chrome.Time.MIN_IN_DAY
                }), chrome.alarms.create(s.DEACTIVATE, {
                    delayInMinutes: n,
                    periodInMinutes: Chrome.Time.MIN_IN_DAY
                }), Chrome.Time.isInRange(o, r) || t();
            } else chrome.alarms.clear(s.ACTIVATE), chrome.alarms.clear(s.DEACTIVATE);
            n.alarms.get(s.UPDATE_PHOTOS).then(e => (e || chrome.alarms.create(s.UPDATE_PHOTOS, {
                when: Date.now() + Chrome.Time.MSEC_IN_DAY,
                periodInMinutes: Chrome.Time.MIN_IN_DAY
            }), Promise.resolve())).catch(e => {
                Chrome.Log.error(e.message, "chromep.alarms.get(_ALARMS.UPDATE_PHOTOS)");
            });
        },
        updateBadgeText: function() {
            chrome.alarms.create(s.BADGE_TEXT, {
                when: Date.now() + 1e3
            });
        },
        isActive: function() {
            const e = Chrome.Storage.getBool("enabled"), t = Chrome.Storage.getBool("keepAwake"), o = Chrome.Storage.get("activeStart"), r = Chrome.Storage.get("activeStop"), n = Chrome.Time.isInRange(o, r);
            return !(!e || t && !n);
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSControl = function() {
    "use strict";
    function e(e) {
        return Chrome.Storage.getBool("chromeFullscreen") ? n.windows.getAll({
            populate: !1
        }).then(t => {
            let o = !1;
            const r = e ? e.bounds.left : 0, n = e ? e.bounds.top : 0;
            for (let s = 0; s < t.length; s++) {
                const a = t[s];
                if ("fullscreen" === a.state && (!e || a.top === n && a.left === r)) {
                    o = !0;
                    break;
                }
            }
            return Promise.resolve(o);
        }) : Promise.resolve(!1);
    }
    function t() {
        return Chrome.Msg.send(app.Msg.SS_IS_SHOWING).then(() => Promise.resolve(!0)).catch(() => Promise.resolve(!1));
    }
    function o(t) {
        const o = {
            url: s,
            focused: !0,
            type: "popup"
        };
        e(t).then(e => {
            if (e) return null;
            if (Chrome.Utils.getChromeVersion() >= 44 && !t) o.state = "fullscreen"; else {
                const e = t ? t.bounds.left : 0, r = t ? t.bounds.top : 0;
                o.left = e, o.top = r, o.width = 1, o.height = 1;
            }
            return n.windows.create(o);
        }).then(e => (e && "fullscreen" !== o.state && chrome.windows.update(e.id, {
            state: "fullscreen"
        }), null)).catch(e => {
            Chrome.Log.error(e.message, "SSControl._open", a);
        });
    }
    function r() {
        n.system.display.getInfo().then(e => {
            if (1 === e.length) o(null); else for (const t of e) o(t);
            return Promise.resolve();
        }).catch(e => {
            Chrome.Log.error(e.message, "SSControl._openOnAllDisplays", a);
        });
    }
    new ExceptionHandler();
    const n = new ChromePromise(), s = "/html/screensaver.html", a = Chrome.Locale.localize("err_show_ss");
    return chrome.idle.onStateChanged.addListener(function(e) {
        t().then(t => "idle" === e ? (app.Alarm.isActive() && !t && app.SSControl.display(!1), 
        Promise.resolve()) : Chrome.Utils.isWindows().then(e => (e || app.SSControl.close(), 
        Promise.resolve()))).catch(e => {
            Chrome.Log.error(e.message, "SSControl._isShowing", a);
        });
    }), Chrome.Msg.listen(function(e, t, o) {
        return e.message === app.Msg.SS_SHOW.message && app.SSControl.display(!0), !1;
    }), {
        display: function(e) {
            !e && Chrome.Storage.getBool("allDisplays") ? r() : o(null);
        },
        close: function() {
            Chrome.Msg.send(app.Msg.SS_CLOSE).catch(() => {});
        }
    };
}();