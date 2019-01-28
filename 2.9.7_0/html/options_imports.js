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
    function t(o) {
        function r(e, t) {
            return function() {
                const n = i.call(arguments);
                return new l(function(o, r) {
                    n.push(function() {
                        const e = h.lastError, t = i.call(arguments);
                        if (e) r(e); else switch (t.length) {
                          case 0:
                            o();
                            break;

                          case 1:
                            o(t[0]);
                            break;

                          default:
                            o(t);
                        }
                    }), e.apply(t, n);
                });
            };
        }
        function s(e, i) {
            for (let o in e) if (n.call(e, o)) {
                const n = e[o], a = typeof n;
                "object" !== a || n instanceof t ? i[o] = "function" === a ? r(n, e) : n : (i[o] = {}, 
                s(n, i[o]));
            }
        }
        const a = (o = o || {}).chrome || e.chrome, l = o.Promise || e.Promise, h = a.runtime;
        s(a, this);
    }
    const i = Array.prototype.slice, n = Object.prototype.hasOwnProperty;
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
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
        !function(e, t, i, n, o, r, s) {
            e.GoogleAnalyticsObject = o, e.ga = e.ga || function() {
                (e.ga.q = e.ga.q || []).push(arguments);
            }, e.ga.l = 1 * new Date(), r = t.createElement(i), s = t.getElementsByTagName(i)[0], 
            r.async = 1, r.src = "https://www.google-analytics.com/analytics.js", s.parentNode.insertBefore(r, s);
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
        initialize: function(e, t, i, n) {
            ga("create", e, "auto"), ga("set", "checkProtocolTask", function() {}), ga("set", "appName", t), 
            ga("set", "appId", i), ga("set", "appVersion", n), ga("require", "displayfeatures");
        },
        page: function(e) {
            e && (Chrome.Utils.DEBUG || ga("send", "pageview", e));
        },
        event: function(e, t = null, i = null) {
            if (e) {
                const n = Chrome.JSONUtils.shallowCopy(e);
                n.hitType = "event", n.eventLabel = t || n.eventLabel, n.eventAction = i || n.eventAction, 
                Chrome.Utils.DEBUG ? console.log(n) : ga("send", n);
            }
        },
        error: function(e = "unknown", t = "unknownMethod") {
            const i = {
                hitType: "event",
                eventCategory: "error",
                eventAction: t,
                eventLabel: `Err: ${e}`
            };
            Chrome.Utils.DEBUG ? console.error(i) : ga("send", i);
        },
        exception: function(e, t = null, i = !1) {
            try {
                let n = "Unknown";
                t ? n = t : e.message && (n = e.message), e.stack && (n += `\n\n${e.stack}`);
                const o = {
                    hitType: "exception",
                    exDescription: n,
                    exFatal: i
                };
                Chrome.Utils.DEBUG ? console.error(o) : ga("send", o);
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
        error: function(e = "unknown", t = "unknownMethod", i = null) {
            const n = i || "An error occurred";
            Chrome.Storage.setLastError(new Chrome.Storage.LastError(e, n)), Chrome.GA.error(e, t);
        },
        exception: function(e, t = null, i = !1, n = "An exception was caught") {
            try {
                Chrome.Storage.setLastError(new Chrome.Storage.LastError(t, n)), Chrome.GA.exception(e, t, i);
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
            const i = JSON.stringify(e);
            return void 0 !== i && (t = Chrome.JSONUtils.parse(i)), t;
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
            let i = t, n = localStorage.getItem(e);
            return null !== n && (i = Chrome.JSONUtils.parse(n)), i;
        },
        getInt: function(e, t = null) {
            let i = localStorage.getItem(e), n = parseInt(i, 10);
            return Number.isNaN(n) && (n = null === t ? n : t, null === t && Chrome.GA.error(`NaN value for: ${e} equals ${i}`, "Storage.getInt")), 
            n;
        },
        getBool: function(e, t = null) {
            return Chrome.Storage.get(e, t);
        },
        set: function(e, t = null) {
            if (null === t) localStorage.removeItem(e); else {
                const i = JSON.stringify(t);
                localStorage.setItem(e, i);
            }
        },
        safeSet: function(e, t, i) {
            let n = !0;
            const o = Chrome.Storage.get(e);
            try {
                Chrome.Storage.set(e, t);
            } catch (t) {
                n = !1, o && Chrome.Storage.set(e, o), i && (o && o.length ? Chrome.Storage.set(i, !0) : Chrome.Storage.set(i, !1)), 
                Chrome.Msg.send(Chrome.Msg.STORAGE_EXCEEDED).catch(() => {});
            }
            return n;
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
            let i = "";
            for (let n = 0; n < e; n++) i += t.charAt(Math.floor(Math.random() * t.length));
            return i;
        },
        getRandomInt: function(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e;
        },
        shuffleArray: function(e) {
            for (let t = (e ? e.length : 0) - 1; t > 0; t--) {
                const i = Math.floor(Math.random() * (t + 1)), n = e[t];
                e[t] = e[i], e[i] = n;
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
                    const i = `type: ${e.message}, ${t.message}`;
                    Chrome.GA.error(i, "Msg.send");
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
        let t = !1, i = Chrome.Storage.getInt("showTime", 0);
        null !== e && (i = e);
        const n = Chrome.Locale.localize("time_format");
        return 2 === i ? t = !0 : 0 === i && "24" === n && (t = !0), t;
    }
    static getTime(t) {
        const i = new Date(), n = new e(t);
        return i.setHours(n._hr), i.setMinutes(n._min), i.setSeconds(0), i.setMilliseconds(0), 
        i.getTime();
    }
    static getTimeDelta(e) {
        const t = Date.now();
        let i = (Chrome.Time.getTime(e) - t) / 1e3 / 60;
        return i < 0 && (i = Chrome.Time.MIN_IN_DAY + i), i;
    }
    static isInRange(e, t) {
        const i = Date.now(), n = Chrome.Time.getTime(e), o = Chrome.Time.getTime(t);
        let r = !1;
        return e === t ? r = !0 : o > n ? i >= n && i <= o && (r = !0) : (i >= n || i <= o) && (r = !0), 
        r;
    }
    static getStringFull(t, i = null) {
        return new e(t).toString(i);
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
        const i = new Date();
        i.setHours(this._hr, this._min), i.setSeconds(0), i.setMilliseconds(0);
        let n = i.toTimeString();
        const o = [];
        void 0 !== navigator.language && o.push(navigator.language), o.push("en-US");
        const r = {
            hour: "numeric",
            minute: "2-digit",
            hour12: !e._is24Hr(t)
        };
        try {
            n = i.toLocaleTimeString(o, r);
        } catch (e) {
            Chrome.Utils.noop();
        }
        return n;
    }
}, /*
 * Copyright (c) 2016-2017, Michael A. Updike All rights reserved.
 * Licensed under Apache 2.0
 * https://opensource.org/licenses/Apache-2.0
 * https://github.com/opus1269/chrome-extension-utils/blob/master/LICENSE.md
 */
window.Chrome = window.Chrome || {}, Chrome.Http = function() {
    "use strict";
    function e(e, i, r, s, a) {
        if (e.ok) return e.json();
        if (a >= s.maxRetries) return Promise.reject(t(e));
        const l = e.status;
        return s.backoff && l >= 500 && l < 600 ? n(i, r, s, a) : s.isAuth && s.token && s.retryToken && 401 === l ? o(i, r, s, a) : s.isAuth && s.interactive && s.token && s.retryToken && 403 === l ? o(i, r, s, a) : Promise.reject(t(e));
    }
    function t(e) {
        let t = "Unknown error.";
        if (e && e.status && void 0 !== e.statusText) {
            let i = Chrome.Locale.localize("err_status");
            void 0 !== i && "" !== i || (i = "Status"), t = `${i}: ${e.status}`, t += `\n${e.statusText}`;
        }
        return new Error(t);
    }
    function i(e, t) {
        return e ? Chrome.Auth.getToken(t).then(e => Promise.resolve(e)).catch(e => t && (e.message.includes("revoked") || e.message.includes("Authorization page could not be loaded")) ? Chrome.Auth.getToken(!1) : Promise.reject(e)) : Promise.resolve(null);
    }
    function n(e, t, i, n) {
        return n++, new Promise((o, s) => {
            const a = (Math.pow(2, n) - 1) * h;
            setTimeout(() => r(e, t, i, n).then(o, s), a);
        });
    }
    function o(e, t, i, n) {
        return Chrome.GA.error("Refreshed auth token.", "Http._retryToken"), Chrome.Auth.removeCachedToken(i.token).then(() => (i.token = null, 
        i.retryToken = !1, r(e, t, i, n)));
    }
    function r(t, n, o, r) {
        return i(o.isAuth, o.interactive).then(e => (o.isAuth && (o.token = e, n.headers.set(a, `${l} ${o.token}`)), 
        fetch(t, n))).then(i => e(i, t, n, o, r)).catch(e => {
            let t = e.message;
            return "Failed to fetch" === t && (void 0 !== (t = Chrome.Locale.localize("err_network")) && "" !== t || (t = "Network error")), 
            Promise.reject(new Error(t));
        });
    }
    function s(e, t, i) {
        (i = null === i ? c : i).isAuth && t.headers.set(a, `${l} unknown`);
        return r(e, t, i, 0);
    }
    new ExceptionHandler();
    const a = "Authorization", l = "Bearer", h = 1e3, c = {
        isAuth: !1,
        retryToken: !1,
        interactive: !1,
        token: null,
        backoff: !0,
        maxRetries: 4
    };
    return {
        conf: c,
        doGet: function(e, t = null) {
            return s(e, {
                method: "GET",
                headers: new Headers({})
            }, t);
        },
        doPost: function(e, t = null) {
            return s(e, {
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
            let i = null;
            return null === t ? this.getToken(!1).then(t => (i = t, e.identity.removeCachedAuthToken({
                token: t
            }))).then(() => Promise.resolve(i)) : (i = t, e.identity.removeCachedAuthToken({
                token: t
            }).then(() => Promise.resolve(i)));
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
        for (const i in t) if (t.hasOwnProperty(i)) {
            const n = t[i];
            if (Chrome.Storage.getBool(n)) try {
                const t = app.PhotoSource.createSource(n);
                t && e.push(t);
            } catch (e) {
                Chrome.GA.exception(e, `${n} failed to load`, !1);
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
            for (const i in t) t.hasOwnProperty(i) && e.push(t[i]);
            return e;
        },
        isUseKey: function(e) {
            let i = !1;
            for (const n in t) if (t.hasOwnProperty(n) && t[n] === e) {
                i = !0;
                break;
            }
            return i;
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
            let i = [];
            for (const e of t) i.push(e.getPhotos());
            return i;
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
        constructor(e, t, i, n, o, r, s = null) {
            this._useKey = e, this._photosKey = t, this._type = i, this._desc = n, this._isDaily = o, 
            this._isArray = r, this._loadArg = s;
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
        static addPhoto(e, t, i, n, o, r) {
            const s = {
                url: t,
                author: i,
                asp: n.toPrecision(3)
            };
            o && (s.ex = o), r && (s.point = r), e.push(s);
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
                    for (const i of e) t = t.concat(i.photos);
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
            const i = this._useKey;
            return e && e.length && (Chrome.Storage.safeSet(this._photosKey, e, i) || (t = "Exceeded storage capacity.")), 
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
        constructor(e, t, i, n, o, r, s = null) {
            super(e, t, i, n, o, r, s);
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
    let i;
    app.RedditSource = class extends app.PhotoSource {
        constructor(e, t, i, n, o, r, s = null) {
            super(e, t, i, n, o, r, s);
        }
        static _getSize(e) {
            const t = {
                width: -1,
                height: -1
            }, i = e.match(/\[(\d*)\D*(\d*)\]/);
            return i && (t.width = parseInt(i[1], 10), t.height = parseInt(i[2], 10)), t;
        }
        static _processChildren(e) {
            const t = [];
            let i, n = 1, o = 1;
            for (const r of e) {
                const e = r.data;
                if (!e.over_18) if (e.preview && e.preview.images) {
                    let t = e.preview.images[0];
                    i = t.source.url, n = parseInt(t.source.width, 10), o = parseInt(t.source.height, 10), 
                    Math.max(n, o) > 3500 && (i = (t = t.resolutions[t.resolutions.length - 1]).url.replace(/&amp;/g, "&"), 
                    n = parseInt(t.width, 10), o = parseInt(t.height, 10));
                } else if (e.title) {
                    const t = app.RedditSource._getSize(e.title);
                    i = e.url, n = t.width, o = t.height;
                }
                const s = n / o, a = e.author;
                s && !isNaN(s) && Math.max(n, o) >= 750 && Math.max(n, o) <= 3500 && app.PhotoSource.addPhoto(t, i, a, s, e.url);
            }
            return t;
        }
        fetchPhotos() {
            let e = [];
            return i ? i(`${this._loadArg}hot`).listing({
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
            const n = window.Snoocore;
            void 0 !== n && (i = new n({
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
            Chrome.GA.exception(e, "Snoocore library failed to load", !1), i = null;
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
        constructor(e, t, i, n, o, r, s = null) {
            super(e, t, i, n, o, r, s);
        }
        static _processPhotos(e) {
            if (!e.photos || !e.photos.photo) {
                const e = new Error(Chrome.Locale.localize("err_photo_source_title"));
                return Promise.reject(e);
            }
            const t = [];
            for (const i of e.photos.photo) {
                let e, n, o = null;
                if (i && "photo" === i.media && "0" !== i.isfriend && "0" !== i.isfamily && (o = i.url_k || o, 
                o = i.url_o || o)) {
                    i.url_o ? (e = parseInt(i.width_o, 10), n = parseInt(i.height_o, 10)) : (e = parseInt(i.width_k, 10), 
                    n = parseInt(i.height_k, 10));
                    const r = e / n;
                    let s = null;
                    i.latitude && i.longitude && (s = app.PhotoSource.createPoint(i.latitude, i.longitude)), 
                    app.PhotoSource.addPhoto(t, o, i.ownername, r, i.owner, s);
                }
            }
            return Promise.resolve(t);
        }
        fetchPhotos() {
            let i;
            if (this._loadArg) {
                i = `${e}?method=flickr.people.getPublicPhotos` + `&api_key=${t}&user_id=86149994@N06` + "&extras=owner_name,url_o,media,geo&per_page=250&format=json&nojsoncallback=1";
            } else i = `${e}?method=flickr.interestingness.getList` + `&api_key=${t}&extras=owner_name,url_k,media,geo` + "&per_page=250&format=json&nojsoncallback=1";
            return Chrome.Http.doGet(i).then(e => "ok" !== e.stat ? Promise.reject(new Error(e.message)) : app.FlickrSource._processPhotos(e));
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
        constructor(e, t, i, n, o, r, s = null) {
            super(e, t, i, n, o, r, s);
        }
        static _doGet(e) {
            return Chrome.Http.doGet(e).then(e => {
                if (e.error) return Promise.reject(new Error(e.error));
                const t = [];
                for (const i of e.photos) if (!i.nsfw) {
                    const e = i.width / i.height;
                    let n = null, o = null;
                    i.latitude && i.longitude && (o = app.PhotoSource.createPoint(i.latitude, i.longitude), 
                    n = {}), app.PhotoSource.addPhoto(t, i.images[0].url, i.user.fullname, e, n, o);
                }
                return Promise.resolve(t);
            });
        }
        fetchPhotos() {
            const t = this._loadArg, i = [];
            for (const n of e) {
                let e = `https://api.500px.com/v1/photos/?consumer_key=iyKV6i6wu0R8QUea9mIXvEsQxIF0tMRVXopwYcFC&feature=${t}` + `&only=${n}&rpp=90` + "&sort=rating&image_size=2048";
                i.push(app.Px500Source._doGet(e));
            }
            return Promise.all(i).then(e => {
                let t = [];
                for (const i of e) t = t.concat(i);
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
        constructor(e, t, i, n, o, r, s = null) {
            super(e, t, i, n, o, r, s);
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
                const i = e.feed.entry || [];
                for (const e of i) if (app.GoogleSource._isImage(e)) {
                    const i = e.media$group.media$content[0].url, n = e.media$group.media$content[0].width / e.media$group.media$content[0].height, o = e.media$group.media$credit[0].$t;
                    let r;
                    app.GoogleSource._hasGeo(e) && (r = e.georss$where.gml$Point.gml$pos.$t), app.PhotoSource.addPhoto(t, i, o, n, {}, r);
                }
            }
            return t;
        }
        static _loadAlbum(t, i = "default") {
            const n = app.GoogleSource._getMaxImageSize(), o = `${e}${i}/albumid/${t}/${`?imgmax=${n}&thumbsize=72&fields=title,gphoto:id,entry(media:group/media:content,media:group/media:credit,media:group/media:thumbnail,georss:where)&v=2&alt=json`}`;
            if ("default" === i) {
                const e = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
                return e.isAuth = !0, Chrome.Http.doGet(o, e).catch(e => {
                    const t = `${Chrome.Locale.localize("err_status")}: 404`;
                    return e.message.includes(t) ? Promise.resolve(null) : Promise.reject(e);
                });
            }
            return Chrome.Http.doGet(o);
        }
        static loadAlbumList() {
            const t = `${e}default/?max-results=2000&access=all&kind=album&fields=entry(gphoto:albumType,gphoto:id)&v=2&alt=json`, i = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
            return i.isAuth = !0, i.retryToken = !0, i.interactive = !0, Chrome.Http.doGet(t, i).then(e => {
                if (!e || !e.feed || !e.feed.entry) {
                    const e = new Error(Chrome.Locale.localize("err_no_albums"));
                    return Promise.reject(e);
                }
                const t = e.feed.entry || [], i = [];
                for (const e of t) if (!e.gphoto$albumType) {
                    const t = e.gphoto$id.$t;
                    i.push(app.GoogleSource._loadAlbum(t));
                }
                return Promise.all(i);
            }).then(e => {
                let t = [], i = 0;
                const n = e || [];
                for (const e of n) if (null !== e) {
                    const n = e.feed;
                    if (n && n.entry) {
                        const o = app.GoogleSource._getThumbnail(n.entry), r = app.GoogleSource._processPhotos(e);
                        if (r && r.length) {
                            const e = {};
                            e.index = i, e.uid = "album" + i, e.name = n.title.$t, e.id = n.gphoto$id.$t, e.ct = r.length, 
                            e.thumb = o, e.checked = !1, e.photos = r, t.push(e), i++;
                        }
                    }
                }
                return Promise.resolve(t);
            });
        }
        static _fetchAlbumPhotos() {
            const e = [], t = Chrome.Storage.get("albumSelections") || [];
            for (const i of t) e.push(app.GoogleSource._loadAlbum(i.id));
            return Promise.all(e).then(e => {
                const t = [], i = e || [];
                for (const e of i) if (e) {
                    const i = e.feed, n = app.GoogleSource._processPhotos(e);
                    n && n.length && t.push({
                        id: i.gphoto$id.$t,
                        photos: n
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
window.app = window.app || {}, app.Permissions = function() {
    "use strict";
    function e(e, t) {
        const i = Chrome.JSONUtils.shallowCopy(Chrome.Msg.STORE);
        i.key = e.name, i.value = t, Chrome.Msg.send(i).catch(() => {});
    }
    function t(e) {
        return i.permissions.contains({
            permissions: e.permissions,
            origins: e.origins
        });
    }
    new ExceptionHandler();
    const i = new ChromePromise(), n = {
        notSet: "notSet",
        allowed: "allowed",
        denied: "denied"
    };
    return {
        PICASA: {
            name: "permPicasa",
            permissions: [],
            origins: [ "https://picasaweb.google.com/" ]
        },
        BACKGROUND: {
            name: "permBackground",
            permissions: [ "background" ],
            origins: []
        },
        notSet: function(e) {
            return Chrome.Storage.get(e.name) === n.notSet;
        },
        isAllowed: function(e) {
            return Chrome.Storage.get(e.name) === n.allowed;
        },
        request: function(t) {
            let o;
            return i.permissions.request({
                permissions: t.permissions,
                origins: t.origins
            }).then(i => (o = i, i ? (e(t, n.allowed), Promise.resolve()) : (e(t, n.denied), 
            app.Permissions.remove(t)))).then(() => Promise.resolve(o));
        },
        remove: function(o) {
            return t(o).then(e => e ? i.permissions.remove({
                permissions: o.permissions,
                origins: o.origins
            }) : Promise.resolve(!1)).then(t => (t && e(o, n.notSet), Promise.resolve(t)));
        }
    };
}(), function() {
    window.WebComponents = window.WebComponents || {
        flags: {}
    };
    var e = document.querySelector('script[src*="webcomponents-lite.js"]'), t = {};
    if (!t.noOpts) {
        if (location.search.slice(1).split("&").forEach(function(e) {
            var i, n = e.split("=");
            n[0] && (i = n[0].match(/wc-(.+)/)) && (t[i[1]] = n[1] || !0);
        }), e) for (var i, n = 0; i = e.attributes[n]; n++) "src" !== i.name && (t[i.name] = i.value || !0);
        if (t.log && t.log.split) {
            var o = t.log.split(",");
            t.log = {}, o.forEach(function(e) {
                t.log[e] = !0;
            });
        } else t.log = {};
    }
    t.register && (window.CustomElements = window.CustomElements || {
        flags: {}
    }, window.CustomElements.flags.register = t.register), WebComponents.flags = t;
}(), function(e) {
    "use strict";
    function t(e) {
        return void 0 !== u[e];
    }
    function i() {
        a.call(this), this._isInvalid = !0;
    }
    function n(e) {
        return "" == e && i.call(this), e.toLowerCase();
    }
    function o(e) {
        var t = e.charCodeAt(0);
        return t > 32 && t < 127 && -1 == [ 34, 35, 60, 62, 63, 96 ].indexOf(t) ? e : encodeURIComponent(e);
    }
    function r(e) {
        var t = e.charCodeAt(0);
        return t > 32 && t < 127 && -1 == [ 34, 35, 60, 62, 96 ].indexOf(t) ? e : encodeURIComponent(e);
    }
    function s(e, s, a) {
        function l(e) {
            v.push(e);
        }
        var h = s || "scheme start", c = 0, _ = "", g = !1, y = !1, v = [];
        e: for (;(e[c - 1] != f || 0 == c) && !this._isInvalid; ) {
            var b = e[c];
            switch (h) {
              case "scheme start":
                if (!b || !p.test(b)) {
                    if (s) {
                        l("Invalid scheme.");
                        break e;
                    }
                    _ = "", h = "no scheme";
                    continue;
                }
                _ += b.toLowerCase(), h = "scheme";
                break;

              case "scheme":
                if (b && m.test(b)) _ += b.toLowerCase(); else {
                    if (":" != b) {
                        if (s) {
                            if (f == b) break e;
                            l("Code point not allowed in scheme: " + b);
                            break e;
                        }
                        _ = "", c = 0, h = "no scheme";
                        continue;
                    }
                    if (this._scheme = _, _ = "", s) break e;
                    t(this._scheme) && (this._isRelative = !0), h = "file" == this._scheme ? "relative" : this._isRelative && a && a._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data";
                }
                break;

              case "scheme data":
                "?" == b ? (this._query = "?", h = "query") : "#" == b ? (this._fragment = "#", 
                h = "fragment") : f != b && "\t" != b && "\n" != b && "\r" != b && (this._schemeData += o(b));
                break;

              case "no scheme":
                if (a && t(a._scheme)) {
                    h = "relative";
                    continue;
                }
                l("Missing scheme."), i.call(this);
                break;

              case "relative or authority":
                if ("/" != b || "/" != e[c + 1]) {
                    l("Expected /, got: " + b), h = "relative";
                    continue;
                }
                h = "authority ignore slashes";
                break;

              case "relative":
                if (this._isRelative = !0, "file" != this._scheme && (this._scheme = a._scheme), 
                f == b) {
                    this._host = a._host, this._port = a._port, this._path = a._path.slice(), this._query = a._query, 
                    this._username = a._username, this._password = a._password;
                    break e;
                }
                if ("/" == b || "\\" == b) "\\" == b && l("\\ is an invalid code point."), h = "relative slash"; else if ("?" == b) this._host = a._host, 
                this._port = a._port, this._path = a._path.slice(), this._query = "?", this._username = a._username, 
                this._password = a._password, h = "query"; else {
                    if ("#" != b) {
                        var P = e[c + 1], C = e[c + 2];
                        ("file" != this._scheme || !p.test(b) || ":" != P && "|" != P || f != C && "/" != C && "\\" != C && "?" != C && "#" != C) && (this._host = a._host, 
                        this._port = a._port, this._username = a._username, this._password = a._password, 
                        this._path = a._path.slice(), this._path.pop()), h = "relative path";
                        continue;
                    }
                    this._host = a._host, this._port = a._port, this._path = a._path.slice(), this._query = a._query, 
                    this._fragment = "#", this._username = a._username, this._password = a._password, 
                    h = "fragment";
                }
                break;

              case "relative slash":
                if ("/" != b && "\\" != b) {
                    "file" != this._scheme && (this._host = a._host, this._port = a._port, this._username = a._username, 
                    this._password = a._password), h = "relative path";
                    continue;
                }
                "\\" == b && l("\\ is an invalid code point."), h = "file" == this._scheme ? "file host" : "authority ignore slashes";
                break;

              case "authority first slash":
                if ("/" != b) {
                    l("Expected '/', got: " + b), h = "authority ignore slashes";
                    continue;
                }
                h = "authority second slash";
                break;

              case "authority second slash":
                if (h = "authority ignore slashes", "/" != b) {
                    l("Expected '/', got: " + b);
                    continue;
                }
                break;

              case "authority ignore slashes":
                if ("/" != b && "\\" != b) {
                    h = "authority";
                    continue;
                }
                l("Expected authority, got: " + b);
                break;

              case "authority":
                if ("@" == b) {
                    g && (l("@ already seen."), _ += "%40"), g = !0;
                    for (var w = 0; w < _.length; w++) {
                        var S = _[w];
                        if ("\t" != S && "\n" != S && "\r" != S) if (":" != S || null !== this._password) {
                            var E = o(S);
                            null !== this._password ? this._password += E : this._username += E;
                        } else this._password = ""; else l("Invalid whitespace in authority.");
                    }
                    _ = "";
                } else {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                        c -= _.length, _ = "", h = "host";
                        continue;
                    }
                    _ += b;
                }
                break;

              case "file host":
                if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                    2 != _.length || !p.test(_[0]) || ":" != _[1] && "|" != _[1] ? 0 == _.length ? h = "relative path start" : (this._host = n.call(this, _), 
                    _ = "", h = "relative path start") : h = "relative path";
                    continue;
                }
                "\t" == b || "\n" == b || "\r" == b ? l("Invalid whitespace in file host.") : _ += b;
                break;

              case "host":
              case "hostname":
                if (":" != b || y) {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                        if (this._host = n.call(this, _), _ = "", h = "relative path start", s) break e;
                        continue;
                    }
                    "\t" != b && "\n" != b && "\r" != b ? ("[" == b ? y = !0 : "]" == b && (y = !1), 
                    _ += b) : l("Invalid code point in host/hostname: " + b);
                } else if (this._host = n.call(this, _), _ = "", h = "port", "hostname" == s) break e;
                break;

              case "port":
                if (/[0-9]/.test(b)) _ += b; else {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b || s) {
                        if ("" != _) {
                            var A = parseInt(_, 10);
                            A != u[this._scheme] && (this._port = A + ""), _ = "";
                        }
                        if (s) break e;
                        h = "relative path start";
                        continue;
                    }
                    "\t" == b || "\n" == b || "\r" == b ? l("Invalid code point in port: " + b) : i.call(this);
                }
                break;

              case "relative path start":
                if ("\\" == b && l("'\\' not allowed in path."), h = "relative path", "/" != b && "\\" != b) continue;
                break;

              case "relative path":
                if (f != b && "/" != b && "\\" != b && (s || "?" != b && "#" != b)) "\t" != b && "\n" != b && "\r" != b && (_ += o(b)); else {
                    "\\" == b && l("\\ not allowed in relative path.");
                    var T;
                    (T = d[_.toLowerCase()]) && (_ = T), ".." == _ ? (this._path.pop(), "/" != b && "\\" != b && this._path.push("")) : "." == _ && "/" != b && "\\" != b ? this._path.push("") : "." != _ && ("file" == this._scheme && 0 == this._path.length && 2 == _.length && p.test(_[0]) && "|" == _[1] && (_ = _[0] + ":"), 
                    this._path.push(_)), _ = "", "?" == b ? (this._query = "?", h = "query") : "#" == b && (this._fragment = "#", 
                    h = "fragment");
                }
                break;

              case "query":
                s || "#" != b ? f != b && "\t" != b && "\n" != b && "\r" != b && (this._query += r(b)) : (this._fragment = "#", 
                h = "fragment");
                break;

              case "fragment":
                f != b && "\t" != b && "\n" != b && "\r" != b && (this._fragment += b);
            }
            c++;
        }
    }
    function a() {
        this._scheme = "", this._schemeData = "", this._username = "", this._password = null, 
        this._host = "", this._port = "", this._path = [], this._query = "", this._fragment = "", 
        this._isInvalid = !1, this._isRelative = !1;
    }
    function l(e, t) {
        void 0 === t || t instanceof l || (t = new l(String(t))), this._url = e, a.call(this);
        var i = e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g, "");
        s.call(this, i, null, t);
    }
    var h = !1;
    if (!e.forceJURL) try {
        var c = new URL("b", "http://a");
        c.pathname = "c%20d", h = "http://a/c%20d" === c.href;
    } catch (e) {}
    if (!h) {
        var u = Object.create(null);
        u.ftp = 21, u.file = 0, u.gopher = 70, u.http = 80, u.https = 443, u.ws = 80, u.wss = 443;
        var d = Object.create(null);
        d["%2e"] = ".", d[".%2e"] = "..", d["%2e."] = "..", d["%2e%2e"] = "..";
        var f = void 0, p = /[a-zA-Z]/, m = /[a-zA-Z0-9\+\-\.]/;
        l.prototype = {
            toString: function() {
                return this.href;
            },
            get href() {
                if (this._isInvalid) return this._url;
                var e = "";
                return "" == this._username && null == this._password || (e = this._username + (null != this._password ? ":" + this._password : "") + "@"), 
                this.protocol + (this._isRelative ? "//" + e + this.host : "") + this.pathname + this._query + this._fragment;
            },
            set href(e) {
                a.call(this), s.call(this, e);
            },
            get protocol() {
                return this._scheme + ":";
            },
            set protocol(e) {
                this._isInvalid || s.call(this, e + ":", "scheme start");
            },
            get host() {
                return this._isInvalid ? "" : this._port ? this._host + ":" + this._port : this._host;
            },
            set host(e) {
                !this._isInvalid && this._isRelative && s.call(this, e, "host");
            },
            get hostname() {
                return this._host;
            },
            set hostname(e) {
                !this._isInvalid && this._isRelative && s.call(this, e, "hostname");
            },
            get port() {
                return this._port;
            },
            set port(e) {
                !this._isInvalid && this._isRelative && s.call(this, e, "port");
            },
            get pathname() {
                return this._isInvalid ? "" : this._isRelative ? "/" + this._path.join("/") : this._schemeData;
            },
            set pathname(e) {
                !this._isInvalid && this._isRelative && (this._path = [], s.call(this, e, "relative path start"));
            },
            get search() {
                return this._isInvalid || !this._query || "?" == this._query ? "" : this._query;
            },
            set search(e) {
                !this._isInvalid && this._isRelative && (this._query = "?", "?" == e[0] && (e = e.slice(1)), 
                s.call(this, e, "query"));
            },
            get hash() {
                return this._isInvalid || !this._fragment || "#" == this._fragment ? "" : this._fragment;
            },
            set hash(e) {
                this._isInvalid || (this._fragment = "#", "#" == e[0] && (e = e.slice(1)), s.call(this, e, "fragment"));
            },
            get origin() {
                var e;
                if (this._isInvalid || !this._scheme) return "";
                switch (this._scheme) {
                  case "data":
                  case "file":
                  case "javascript":
                  case "mailto":
                    return "null";
                }
                return (e = this.host) ? this._scheme + "://" + e : "";
            }
        };
        var _ = e.URL;
        _ && (l.createObjectURL = function(e) {
            return _.createObjectURL.apply(_, arguments);
        }, l.revokeObjectURL = function(e) {
            _.revokeObjectURL(e);
        }), e.URL = l;
    }
}(self), "undefined" == typeof WeakMap && function() {
    var e = Object.defineProperty, t = Date.now() % 1e9, i = function() {
        this.name = "__st" + (1e9 * Math.random() >>> 0) + t++ + "__";
    };
    i.prototype = {
        set: function(t, i) {
            var n = t[this.name];
            return n && n[0] === t ? n[1] = i : e(t, this.name, {
                value: [ t, i ],
                writable: !0
            }), this;
        },
        get: function(e) {
            var t;
            return (t = e[this.name]) && t[0] === e ? t[1] : void 0;
        },
        delete: function(e) {
            var t = e[this.name];
            return !(!t || t[0] !== e || (t[0] = t[1] = void 0, 0));
        },
        has: function(e) {
            var t = e[this.name];
            return !!t && t[0] === e;
        }
    }, window.WeakMap = i;
}(), function(e) {
    function t(e) {
        b.push(e), v || (v = !0, m(n));
    }
    function i(e) {
        return window.ShadowDOMPolyfill && window.ShadowDOMPolyfill.wrapIfNeeded(e) || e;
    }
    function n() {
        v = !1;
        var e = b;
        b = [], e.sort(function(e, t) {
            return e.uid_ - t.uid_;
        });
        var t = !1;
        e.forEach(function(e) {
            var i = e.takeRecords();
            o(e), i.length && (e.callback_(i, e), t = !0);
        }), t && n();
    }
    function o(e) {
        e.nodes_.forEach(function(t) {
            var i = _.get(t);
            i && i.forEach(function(t) {
                t.observer === e && t.removeTransientObservers();
            });
        });
    }
    function r(e, t) {
        for (var i = e; i; i = i.parentNode) {
            var n = _.get(i);
            if (n) for (var o = 0; o < n.length; o++) {
                var r = n[o], s = r.options;
                if (i === e || s.subtree) {
                    var a = t(s);
                    a && r.enqueue(a);
                }
            }
        }
    }
    function s(e) {
        this.callback_ = e, this.nodes_ = [], this.records_ = [], this.uid_ = ++P;
    }
    function a(e, t) {
        this.type = e, this.target = t, this.addedNodes = [], this.removedNodes = [], this.previousSibling = null, 
        this.nextSibling = null, this.attributeName = null, this.attributeNamespace = null, 
        this.oldValue = null;
    }
    function l(e) {
        var t = new a(e.type, e.target);
        return t.addedNodes = e.addedNodes.slice(), t.removedNodes = e.removedNodes.slice(), 
        t.previousSibling = e.previousSibling, t.nextSibling = e.nextSibling, t.attributeName = e.attributeName, 
        t.attributeNamespace = e.attributeNamespace, t.oldValue = e.oldValue, t;
    }
    function h(e, t) {
        return C = new a(e, t);
    }
    function c(e) {
        return w || (w = l(C), w.oldValue = e, w);
    }
    function u() {
        C = w = void 0;
    }
    function d(e) {
        return e === w || e === C;
    }
    function f(e, t) {
        return e === t ? e : w && d(e) ? w : null;
    }
    function p(e, t, i) {
        this.observer = e, this.target = t, this.options = i, this.transientObservedNodes = [];
    }
    if (!e.JsMutationObserver) {
        var m, _ = new WeakMap();
        if (/Trident|Edge/.test(navigator.userAgent)) m = setTimeout; else if (window.setImmediate) m = window.setImmediate; else {
            var g = [], y = String(Math.random());
            window.addEventListener("message", function(e) {
                if (e.data === y) {
                    var t = g;
                    g = [], t.forEach(function(e) {
                        e();
                    });
                }
            }), m = function(e) {
                g.push(e), window.postMessage(y, "*");
            };
        }
        var v = !1, b = [], P = 0;
        s.prototype = {
            observe: function(e, t) {
                if (e = i(e), !t.childList && !t.attributes && !t.characterData || t.attributeOldValue && !t.attributes || t.attributeFilter && t.attributeFilter.length && !t.attributes || t.characterDataOldValue && !t.characterData) throw new SyntaxError();
                var n = _.get(e);
                n || _.set(e, n = []);
                for (var o, r = 0; r < n.length; r++) if (n[r].observer === this) {
                    (o = n[r]).removeListeners(), o.options = t;
                    break;
                }
                o || (o = new p(this, e, t), n.push(o), this.nodes_.push(e)), o.addListeners();
            },
            disconnect: function() {
                this.nodes_.forEach(function(e) {
                    for (var t = _.get(e), i = 0; i < t.length; i++) {
                        var n = t[i];
                        if (n.observer === this) {
                            n.removeListeners(), t.splice(i, 1);
                            break;
                        }
                    }
                }, this), this.records_ = [];
            },
            takeRecords: function() {
                var e = this.records_;
                return this.records_ = [], e;
            }
        };
        var C, w;
        p.prototype = {
            enqueue: function(e) {
                var i = this.observer.records_, n = i.length;
                if (i.length > 0) {
                    var o = f(i[n - 1], e);
                    if (o) return void (i[n - 1] = o);
                } else t(this.observer);
                i[n] = e;
            },
            addListeners: function() {
                this.addListeners_(this.target);
            },
            addListeners_: function(e) {
                var t = this.options;
                t.attributes && e.addEventListener("DOMAttrModified", this, !0), t.characterData && e.addEventListener("DOMCharacterDataModified", this, !0), 
                t.childList && e.addEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.addEventListener("DOMNodeRemoved", this, !0);
            },
            removeListeners: function() {
                this.removeListeners_(this.target);
            },
            removeListeners_: function(e) {
                var t = this.options;
                t.attributes && e.removeEventListener("DOMAttrModified", this, !0), t.characterData && e.removeEventListener("DOMCharacterDataModified", this, !0), 
                t.childList && e.removeEventListener("DOMNodeInserted", this, !0), (t.childList || t.subtree) && e.removeEventListener("DOMNodeRemoved", this, !0);
            },
            addTransientObserver: function(e) {
                if (e !== this.target) {
                    this.addListeners_(e), this.transientObservedNodes.push(e);
                    var t = _.get(e);
                    t || _.set(e, t = []), t.push(this);
                }
            },
            removeTransientObservers: function() {
                var e = this.transientObservedNodes;
                this.transientObservedNodes = [], e.forEach(function(e) {
                    this.removeListeners_(e);
                    for (var t = _.get(e), i = 0; i < t.length; i++) if (t[i] === this) {
                        t.splice(i, 1);
                        break;
                    }
                }, this);
            },
            handleEvent: function(e) {
                switch (e.stopImmediatePropagation(), e.type) {
                  case "DOMAttrModified":
                    var t = e.attrName, i = e.relatedNode.namespaceURI, n = e.target;
                    (o = new h("attributes", n)).attributeName = t, o.attributeNamespace = i;
                    s = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
                    r(n, function(e) {
                        if (e.attributes && (!e.attributeFilter || !e.attributeFilter.length || -1 !== e.attributeFilter.indexOf(t) || -1 !== e.attributeFilter.indexOf(i))) return e.attributeOldValue ? c(s) : o;
                    });
                    break;

                  case "DOMCharacterDataModified":
                    var o = h("characterData", n = e.target), s = e.prevValue;
                    r(n, function(e) {
                        if (e.characterData) return e.characterDataOldValue ? c(s) : o;
                    });
                    break;

                  case "DOMNodeRemoved":
                    this.addTransientObserver(e.target);

                  case "DOMNodeInserted":
                    var a, l, d = e.target;
                    "DOMNodeInserted" === e.type ? (a = [ d ], l = []) : (a = [], l = [ d ]);
                    var f = d.previousSibling, p = d.nextSibling;
                    (o = h("childList", e.target.parentNode)).addedNodes = a, o.removedNodes = l, o.previousSibling = f, 
                    o.nextSibling = p, r(e.relatedNode, function(e) {
                        if (e.childList) return o;
                    });
                }
                u();
            }
        }, e.JsMutationObserver = s, e.MutationObserver || (e.MutationObserver = s, s._isPolyfilled = !0);
    }
}(self), function() {
    function e(e) {
        switch (e) {
          case "&":
            return "&amp;";

          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          case " ":
            return "&nbsp;";
        }
    }
    function t(t) {
        return t.replace(u, e);
    }
    var i = "undefined" == typeof HTMLTemplateElement;
    /Trident/.test(navigator.userAgent) && function() {
        var e = document.importNode;
        document.importNode = function() {
            var t = e.apply(document, arguments);
            if (t.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
                var i = document.createDocumentFragment();
                return i.appendChild(t), i;
            }
            return t;
        };
    }();
    var n = function() {
        if (!i) {
            var e = document.createElement("template"), t = document.createElement("template");
            t.content.appendChild(document.createElement("div")), e.content.appendChild(t);
            var n = e.cloneNode(!0);
            return 0 === n.content.childNodes.length || 0 === n.content.firstChild.content.childNodes.length;
        }
    }(), o = "template", r = function() {};
    if (i) {
        var s = document.implementation.createHTMLDocument("template"), a = !0, l = document.createElement("style");
        l.textContent = o + "{display:none;}";
        var h = document.head;
        h.insertBefore(l, h.firstElementChild), r.prototype = Object.create(HTMLElement.prototype), 
        r.decorate = function(e) {
            if (!e.content) {
                e.content = s.createDocumentFragment();
                for (var i; i = e.firstChild; ) e.content.appendChild(i);
                if (e.cloneNode = function(e) {
                    return r.cloneNode(this, e);
                }, a) try {
                    Object.defineProperty(e, "innerHTML", {
                        get: function() {
                            for (var e = "", i = this.content.firstChild; i; i = i.nextSibling) e += i.outerHTML || t(i.data);
                            return e;
                        },
                        set: function(e) {
                            for (s.body.innerHTML = e, r.bootstrap(s); this.content.firstChild; ) this.content.removeChild(this.content.firstChild);
                            for (;s.body.firstChild; ) this.content.appendChild(s.body.firstChild);
                        },
                        configurable: !0
                    });
                } catch (e) {
                    a = !1;
                }
                r.bootstrap(e.content);
            }
        }, r.bootstrap = function(e) {
            for (var t, i = e.querySelectorAll(o), n = 0, s = i.length; n < s && (t = i[n]); n++) r.decorate(t);
        }, document.addEventListener("DOMContentLoaded", function() {
            r.bootstrap(document);
        });
        var c = document.createElement;
        document.createElement = function() {
            "use strict";
            var e = c.apply(document, arguments);
            return "template" === e.localName && r.decorate(e), e;
        };
        var u = /[&\u00A0<>]/g;
    }
    if (i || n) {
        var d = Node.prototype.cloneNode;
        r.cloneNode = function(e, t) {
            var i = d.call(e, !1);
            return this.decorate && this.decorate(i), t && (i.content.appendChild(d.call(e.content, !0)), 
            this.fixClonedDom(i.content, e.content)), i;
        }, r.fixClonedDom = function(e, t) {
            if (t.querySelectorAll) for (var i, n, r = t.querySelectorAll(o), s = e.querySelectorAll(o), a = 0, l = s.length; a < l; a++) n = r[a], 
            i = s[a], this.decorate && this.decorate(n), i.parentNode.replaceChild(n.cloneNode(!0), i);
        };
        var f = document.importNode;
        Node.prototype.cloneNode = function(e) {
            var t = d.call(this, e);
            return e && r.fixClonedDom(t, this), t;
        }, document.importNode = function(e, t) {
            if (e.localName === o) return r.cloneNode(e, t);
            var i = f.call(document, e, t);
            return t && r.fixClonedDom(i, e), i;
        }, n && (HTMLTemplateElement.prototype.cloneNode = function(e) {
            return r.cloneNode(this, e);
        });
    }
    i && (window.HTMLTemplateElement = r);
}(), function(e) {
    "use strict";
    if (!window.performance || !window.performance.now) {
        var t = Date.now();
        window.performance = {
            now: function() {
                return Date.now() - t;
            }
        };
    }
    if (window.requestAnimationFrame || (window.requestAnimationFrame = function() {
        var e = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
        return e ? function(t) {
            return e(function() {
                t(performance.now());
            });
        } : function(e) {
            return window.setTimeout(e, 1e3 / 60);
        };
    }()), window.cancelAnimationFrame || (window.cancelAnimationFrame = window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function(e) {
        clearTimeout(e);
    }), !function() {
        var e = document.createEvent("Event");
        return e.initEvent("foo", !0, !0), e.preventDefault(), e.defaultPrevented;
    }()) {
        var i = Event.prototype.preventDefault;
        Event.prototype.preventDefault = function() {
            this.cancelable && (i.call(this), Object.defineProperty(this, "defaultPrevented", {
                get: function() {
                    return !0;
                },
                configurable: !0
            }));
        };
    }
    var n = /Trident/.test(navigator.userAgent);
    if ((!window.CustomEvent || n && "function" != typeof window.CustomEvent) && (window.CustomEvent = function(e, t) {
        t = t || {};
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(e, Boolean(t.bubbles), Boolean(t.cancelable), t.detail), 
        i;
    }, window.CustomEvent.prototype = window.Event.prototype), !window.Event || n && "function" != typeof window.Event) {
        var o = window.Event;
        window.Event = function(e, t) {
            t = t || {};
            var i = document.createEvent("Event");
            return i.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)), i;
        }, window.Event.prototype = o.prototype;
    }
}(window.WebComponents), window.HTMLImports = window.HTMLImports || {
    flags: {}
}, function(e) {
    function t(e, t) {
        n(function() {
            r(e, t);
        }, t = t || p);
    }
    function i(e) {
        return "complete" === e.readyState || e.readyState === g;
    }
    function n(e, t) {
        if (i(t)) e && e(); else {
            var o = function() {
                "complete" !== t.readyState && t.readyState !== g || (t.removeEventListener(y, o), 
                n(e, t));
            };
            t.addEventListener(y, o);
        }
    }
    function o(e) {
        e.target.__loaded = !0;
    }
    function r(e, t) {
        function i() {
            r == a && e && e({
                allImports: n,
                loadedImports: l,
                errorImports: h
            });
        }
        var n = t.querySelectorAll("link[rel=import]"), r = 0, a = n.length, l = [], h = [];
        if (a) for (var c, u = 0; u < a && (c = n[u]); u++) s(c) ? (l.push(this), r++, i()) : (c.addEventListener("load", function(e) {
            o(e), l.push(this), r++, i();
        }), c.addEventListener("error", function(e) {
            h.push(this), r++, i();
        })); else i();
    }
    function s(e) {
        return u ? e.__loaded || e.import && "loading" !== e.import.readyState : e.__importParsed;
    }
    function a(e) {
        for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) l(t) && h(t);
    }
    function l(e) {
        return "link" === e.localName && "import" === e.rel;
    }
    function h(e) {
        e.import ? o({
            target: e
        }) : (e.addEventListener("load", o), e.addEventListener("error", o));
    }
    var c = "import", u = Boolean(c in document.createElement("link")), d = Boolean(window.ShadowDOMPolyfill), f = function(e) {
        return d ? window.ShadowDOMPolyfill.wrapIfNeeded(e) : e;
    }, p = f(document), m = {
        get: function() {
            var e = window.HTMLImports.currentScript || document.currentScript || ("complete" !== document.readyState ? document.scripts[document.scripts.length - 1] : null);
            return f(e);
        },
        configurable: !0
    };
    Object.defineProperty(document, "_currentScript", m), Object.defineProperty(p, "_currentScript", m);
    var _ = /Trident/.test(navigator.userAgent), g = _ ? "complete" : "interactive", y = "readystatechange";
    u && (new MutationObserver(function(e) {
        for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) t.addedNodes && a(t.addedNodes);
    }).observe(document.head, {
        childList: !0
    }), function() {
        if ("loading" === document.readyState) for (var e, t = document.querySelectorAll("link[rel=import]"), i = 0, n = t.length; i < n && (e = t[i]); i++) h(e);
    }()), t(function(e) {
        window.HTMLImports.ready = !0, window.HTMLImports.readyTime = new Date().getTime();
        var t = p.createEvent("CustomEvent");
        t.initCustomEvent("HTMLImportsLoaded", !0, !0, e), p.dispatchEvent(t);
    }), e.IMPORT_LINK_TYPE = c, e.useNative = u, e.rootDocument = p, e.whenReady = t, 
    e.isIE = _;
}(window.HTMLImports), function(e) {
    var t = [];
    e.addModule = function(e) {
        t.push(e);
    }, e.initializeModules = function() {
        t.forEach(function(t) {
            t(e);
        });
    };
}(window.HTMLImports), window.HTMLImports.addModule(function(e) {
    var t = /(url\()([^)]*)(\))/g, i = /(@import[\s]+(?!url\())([^;]*)(;)/g, n = {
        resolveUrlsInStyle: function(e, t) {
            var i = e.ownerDocument.createElement("a");
            return e.textContent = this.resolveUrlsInCssText(e.textContent, t, i), e;
        },
        resolveUrlsInCssText: function(e, n, o) {
            var r = this.replaceUrls(e, o, n, t);
            return r = this.replaceUrls(r, o, n, i);
        },
        replaceUrls: function(e, t, i, n) {
            return e.replace(n, function(e, n, o, r) {
                var s = o.replace(/["']/g, "");
                return i && (s = new URL(s, i).href), t.href = s, s = t.href, n + "'" + s + "'" + r;
            });
        }
    };
    e.path = n;
}), window.HTMLImports.addModule(function(e) {
    var t = {
        async: !0,
        ok: function(e) {
            return e.status >= 200 && e.status < 300 || 304 === e.status || 0 === e.status;
        },
        load: function(i, n, o) {
            var r = new XMLHttpRequest();
            return (e.flags.debug || e.flags.bust) && (i += "?" + Math.random()), r.open("GET", i, t.async), 
            r.addEventListener("readystatechange", function(e) {
                if (4 === r.readyState) {
                    var i = null;
                    try {
                        var s = r.getResponseHeader("Location");
                        s && (i = "/" === s.substr(0, 1) ? location.origin + s : s);
                    } catch (e) {
                        console.error(e.message);
                    }
                    n.call(o, !t.ok(r) && r, r.response || r.responseText, i);
                }
            }), r.send(), r;
        },
        loadDocument: function(e, t, i) {
            this.load(e, t, i).responseType = "document";
        }
    };
    e.xhr = t;
}), window.HTMLImports.addModule(function(e) {
    var t = e.xhr, i = e.flags, n = function(e, t) {
        this.cache = {}, this.onload = e, this.oncomplete = t, this.inflight = 0, this.pending = {};
    };
    n.prototype = {
        addNodes: function(e) {
            this.inflight += e.length;
            for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) this.require(t);
            this.checkDone();
        },
        addNode: function(e) {
            this.inflight++, this.require(e), this.checkDone();
        },
        require: function(e) {
            var t = e.src || e.href;
            e.__nodeUrl = t, this.dedupe(t, e) || this.fetch(t, e);
        },
        dedupe: function(e, t) {
            return this.pending[e] ? (this.pending[e].push(t), !0) : this.cache[e] ? (this.onload(e, t, this.cache[e]), 
            this.tail(), !0) : (this.pending[e] = [ t ], !1);
        },
        fetch: function(e, n) {
            if (i.load && console.log("fetch", e, n), e) if (e.match(/^data:/)) {
                var o = e.split(","), r = o[0], s = o[1];
                s = r.indexOf(";base64") > -1 ? atob(s) : decodeURIComponent(s), setTimeout(function() {
                    this.receive(e, n, null, s);
                }.bind(this), 0);
            } else {
                var a = function(t, i, o) {
                    this.receive(e, n, t, i, o);
                }.bind(this);
                t.load(e, a);
            } else setTimeout(function() {
                this.receive(e, n, {
                    error: "href must be specified"
                }, null);
            }.bind(this), 0);
        },
        receive: function(e, t, i, n, o) {
            this.cache[e] = n;
            for (var r, s = this.pending[e], a = 0, l = s.length; a < l && (r = s[a]); a++) this.onload(e, r, n, i, o), 
            this.tail();
            this.pending[e] = null;
        },
        tail: function() {
            --this.inflight, this.checkDone();
        },
        checkDone: function() {
            this.inflight || this.oncomplete();
        }
    }, e.Loader = n;
}), window.HTMLImports.addModule(function(e) {
    var t = function(e) {
        this.addCallback = e, this.mo = new MutationObserver(this.handler.bind(this));
    };
    t.prototype = {
        handler: function(e) {
            for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) "childList" === t.type && t.addedNodes.length && this.addedNodes(t.addedNodes);
        },
        addedNodes: function(e) {
            this.addCallback && this.addCallback(e);
            for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) t.children && t.children.length && this.addedNodes(t.children);
        },
        observe: function(e) {
            this.mo.observe(e, {
                childList: !0,
                subtree: !0
            });
        }
    }, e.Observer = t;
}), window.HTMLImports.addModule(function(e) {
    function t(e) {
        return "link" === e.localName && e.rel === c;
    }
    function i(e) {
        var t = n(e);
        return "data:text/javascript;charset=utf-8," + encodeURIComponent(t);
    }
    function n(e) {
        return e.textContent + o(e);
    }
    function o(e) {
        var t = e.ownerDocument;
        t.__importedScripts = t.__importedScripts || 0;
        var i = e.ownerDocument.baseURI, n = t.__importedScripts ? "-" + t.__importedScripts : "";
        return t.__importedScripts++, "\n//# sourceURL=" + i + n + ".js\n";
    }
    function r(e) {
        var t = e.ownerDocument.createElement("style");
        return t.textContent = e.textContent, s.resolveUrlsInStyle(t), t;
    }
    var s = e.path, a = e.rootDocument, l = e.flags, h = e.isIE, c = e.IMPORT_LINK_TYPE, u = "link[rel=" + c + "]", d = {
        documentSelectors: u,
        importsSelectors: [ u, "link[rel=stylesheet]:not([type])", "style:not([type])", "script:not([type])", 'script[type="application/javascript"]', 'script[type="text/javascript"]' ].join(","),
        map: {
            link: "parseLink",
            script: "parseScript",
            style: "parseStyle"
        },
        dynamicElements: [],
        parseNext: function() {
            var e = this.nextToParse();
            e && this.parse(e);
        },
        parse: function(e) {
            if (this.isParsed(e)) l.parse && console.log("[%s] is already parsed", e.localName); else {
                var t = this[this.map[e.localName]];
                t && (this.markParsing(e), t.call(this, e));
            }
        },
        parseDynamic: function(e, t) {
            this.dynamicElements.push(e), t || this.parseNext();
        },
        markParsing: function(e) {
            l.parse && console.log("parsing", e), this.parsingElement = e;
        },
        markParsingComplete: function(e) {
            e.__importParsed = !0, this.markDynamicParsingComplete(e), e.__importElement && (e.__importElement.__importParsed = !0, 
            this.markDynamicParsingComplete(e.__importElement)), this.parsingElement = null, 
            l.parse && console.log("completed", e);
        },
        markDynamicParsingComplete: function(e) {
            var t = this.dynamicElements.indexOf(e);
            t >= 0 && this.dynamicElements.splice(t, 1);
        },
        parseImport: function(e) {
            if (e.import = e.__doc, window.HTMLImports.__importsParsingHook && window.HTMLImports.__importsParsingHook(e), 
            e.import && (e.import.__importParsed = !0), this.markParsingComplete(e), e.__resource && !e.__error ? e.dispatchEvent(new CustomEvent("load", {
                bubbles: !1
            })) : e.dispatchEvent(new CustomEvent("error", {
                bubbles: !1
            })), e.__pending) for (var t; e.__pending.length; ) (t = e.__pending.shift()) && t({
                target: e
            });
            this.parseNext();
        },
        parseLink: function(e) {
            t(e) ? this.parseImport(e) : (e.href = e.href, this.parseGeneric(e));
        },
        parseStyle: function(e) {
            var t = e;
            e = r(e), t.__appliedElement = e, e.__importElement = t, this.parseGeneric(e);
        },
        parseGeneric: function(e) {
            this.trackElement(e), this.addElementToDocument(e);
        },
        rootImportForElement: function(e) {
            for (var t = e; t.ownerDocument.__importLink; ) t = t.ownerDocument.__importLink;
            return t;
        },
        addElementToDocument: function(e) {
            var t = this.rootImportForElement(e.__importElement || e);
            t.parentNode.insertBefore(e, t);
        },
        trackElement: function(e, t) {
            var i = this, n = function(o) {
                e.removeEventListener("load", n), e.removeEventListener("error", n), t && t(o), 
                i.markParsingComplete(e), i.parseNext();
            };
            if (e.addEventListener("load", n), e.addEventListener("error", n), h && "style" === e.localName) {
                var o = !1;
                if (-1 == e.textContent.indexOf("@import")) o = !0; else if (e.sheet) {
                    o = !0;
                    for (var r, s = e.sheet.cssRules, a = s ? s.length : 0, l = 0; l < a && (r = s[l]); l++) r.type === CSSRule.IMPORT_RULE && (o = o && Boolean(r.styleSheet));
                }
                o && setTimeout(function() {
                    e.dispatchEvent(new CustomEvent("load", {
                        bubbles: !1
                    }));
                });
            }
        },
        parseScript: function(t) {
            var n = document.createElement("script");
            n.__importElement = t, n.src = t.src ? t.src : i(t), e.currentScript = t, this.trackElement(n, function(t) {
                n.parentNode && n.parentNode.removeChild(n), e.currentScript = null;
            }), this.addElementToDocument(n);
        },
        nextToParse: function() {
            return this._mayParse = [], !this.parsingElement && (this.nextToParseInDoc(a) || this.nextToParseDynamic());
        },
        nextToParseInDoc: function(e, i) {
            if (e && this._mayParse.indexOf(e) < 0) {
                this._mayParse.push(e);
                for (var n, o = e.querySelectorAll(this.parseSelectorsForNode(e)), r = 0, s = o.length; r < s && (n = o[r]); r++) if (!this.isParsed(n)) return this.hasResource(n) ? t(n) ? this.nextToParseInDoc(n.__doc, n) : n : void 0;
            }
            return i;
        },
        nextToParseDynamic: function() {
            return this.dynamicElements[0];
        },
        parseSelectorsForNode: function(e) {
            return (e.ownerDocument || e) === a ? this.documentSelectors : this.importsSelectors;
        },
        isParsed: function(e) {
            return e.__importParsed;
        },
        needsDynamicParsing: function(e) {
            return this.dynamicElements.indexOf(e) >= 0;
        },
        hasResource: function(e) {
            return !t(e) || void 0 !== e.__doc;
        }
    };
    e.parser = d, e.IMPORT_SELECTOR = u;
}), window.HTMLImports.addModule(function(e) {
    function t(e) {
        return i(e, s);
    }
    function i(e, t) {
        return "link" === e.localName && e.getAttribute("rel") === t;
    }
    function n(e) {
        return !!Object.getOwnPropertyDescriptor(e, "baseURI");
    }
    function o(e, t) {
        var i = document.implementation.createHTMLDocument(s);
        i._URL = t;
        var o = i.createElement("base");
        o.setAttribute("href", t), i.baseURI || n(i) || Object.defineProperty(i, "baseURI", {
            value: t
        });
        var r = i.createElement("meta");
        return r.setAttribute("charset", "utf-8"), i.head.appendChild(r), i.head.appendChild(o), 
        i.body.innerHTML = e, window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(i), 
        i;
    }
    var r = e.flags, s = e.IMPORT_LINK_TYPE, a = e.IMPORT_SELECTOR, l = e.rootDocument, h = e.Loader, c = e.Observer, u = e.parser, d = {
        documents: {},
        documentPreloadSelectors: a,
        importsPreloadSelectors: [ a ].join(","),
        loadNode: function(e) {
            f.addNode(e);
        },
        loadSubtree: function(e) {
            var t = this.marshalNodes(e);
            f.addNodes(t);
        },
        marshalNodes: function(e) {
            return e.querySelectorAll(this.loadSelectorsForNode(e));
        },
        loadSelectorsForNode: function(e) {
            return (e.ownerDocument || e) === l ? this.documentPreloadSelectors : this.importsPreloadSelectors;
        },
        loaded: function(e, i, n, s, a) {
            if (r.load && console.log("loaded", e, i), i.__resource = n, i.__error = s, t(i)) {
                var l = this.documents[e];
                void 0 === l && ((l = s ? null : o(n, a || e)) && (l.__importLink = i, this.bootDocument(l)), 
                this.documents[e] = l), i.__doc = l;
            }
            u.parseNext();
        },
        bootDocument: function(e) {
            this.loadSubtree(e), this.observer.observe(e), u.parseNext();
        },
        loadedAll: function() {
            u.parseNext();
        }
    }, f = new h(d.loaded.bind(d), d.loadedAll.bind(d));
    if (d.observer = new c(), !document.baseURI) {
        var p = {
            get: function() {
                var e = document.querySelector("base");
                return e ? e.href : window.location.href;
            },
            configurable: !0
        };
        Object.defineProperty(document, "baseURI", p), Object.defineProperty(l, "baseURI", p);
    }
    e.importer = d, e.importLoader = f;
}), window.HTMLImports.addModule(function(e) {
    var t = e.parser, i = e.importer, n = {
        added: function(e) {
            for (var n, o, r, s, a = 0, l = e.length; a < l && (s = e[a]); a++) n || (n = s.ownerDocument, 
            o = t.isParsed(n)), (r = this.shouldLoadNode(s)) && i.loadNode(s), this.shouldParseNode(s) && o && t.parseDynamic(s, r);
        },
        shouldLoadNode: function(e) {
            return 1 === e.nodeType && o.call(e, i.loadSelectorsForNode(e));
        },
        shouldParseNode: function(e) {
            return 1 === e.nodeType && o.call(e, t.parseSelectorsForNode(e));
        }
    };
    i.observer.addCallback = n.added.bind(n);
    var o = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
}), function(e) {
    function t() {
        window.HTMLImports.importer.bootDocument(n);
    }
    var i = e.initializeModules;
    if (e.isIE, !e.useNative) {
        i();
        var n = e.rootDocument;
        "complete" === document.readyState || "interactive" === document.readyState && !window.attachEvent ? t() : document.addEventListener("DOMContentLoaded", t);
    }
}(window.HTMLImports), window.CustomElements = window.CustomElements || {
    flags: {}
}, function(e) {
    var t = e.flags, i = [];
    e.addModule = function(e) {
        i.push(e);
    }, e.initializeModules = function() {
        i.forEach(function(t) {
            t(e);
        });
    }, e.hasNative = Boolean(document.registerElement), e.isIE = /Trident/.test(navigator.userAgent), 
    e.useNative = !t.register && e.hasNative && !window.ShadowDOMPolyfill && (!window.HTMLImports || window.HTMLImports.useNative);
}(window.CustomElements), window.CustomElements.addModule(function(e) {
    function t(e, t) {
        i(e, function(e) {
            return !!t(e) || void n(e, t);
        }), n(e, t);
    }
    function i(e, t, n) {
        var o = e.firstElementChild;
        if (!o) for (o = e.firstChild; o && o.nodeType !== Node.ELEMENT_NODE; ) o = o.nextSibling;
        for (;o; ) !0 !== t(o, n) && i(o, t, n), o = o.nextElementSibling;
        return null;
    }
    function n(e, i) {
        for (var n = e.shadowRoot; n; ) t(n, i), n = n.olderShadowRoot;
    }
    function o(e, t, i) {
        if (e = window.wrap(e), !(i.indexOf(e) >= 0)) {
            i.push(e);
            for (var n, s = e.querySelectorAll("link[rel=" + r + "]"), a = 0, l = s.length; a < l && (n = s[a]); a++) n.import && o(n.import, t, i);
            t(e);
        }
    }
    var r = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
    e.forDocumentTree = function(e, t) {
        o(e, t, []);
    }, e.forSubtree = t;
}), window.CustomElements.addModule(function(e) {
    function t(e, t) {
        return i(e, t) || n(e, t);
    }
    function i(t, i) {
        return !!e.upgrade(t, i) || void (i && s(t));
    }
    function n(e, t) {
        _(e, function(e) {
            if (i(e, t)) return !0;
        });
    }
    function o(e) {
        b.push(e), v || (v = !0, setTimeout(r));
    }
    function r() {
        v = !1;
        for (var e, t = b, i = 0, n = t.length; i < n && (e = t[i]); i++) e();
        b = [];
    }
    function s(e) {
        y ? o(function() {
            a(e);
        }) : a(e);
    }
    function a(e) {
        e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback());
    }
    function l(e) {
        h(e), _(e, function(e) {
            h(e);
        });
    }
    function h(e) {
        y ? o(function() {
            c(e);
        }) : c(e);
    }
    function c(e) {
        e.__upgraded__ && e.__attached && (e.__attached = !1, e.detachedCallback && e.detachedCallback());
    }
    function u(e) {
        for (var t = e, i = window.wrap(document); t; ) {
            if (t == i) return !0;
            t = t.parentNode || t.nodeType === Node.DOCUMENT_FRAGMENT_NODE && t.host;
        }
    }
    function d(e, i) {
        if (m.dom) {
            var n = i[0];
            if (n && "childList" === n.type && n.addedNodes && n.addedNodes) {
                for (var o = n.addedNodes[0]; o && o !== document && !o.host; ) o = o.parentNode;
                var r = o && (o.URL || o._URL || o.host && o.host.localName) || "";
                r = r.split("/?").shift().split("/").pop();
            }
            console.group("mutations (%d) [%s]", i.length, r || "");
        }
        var s = u(e);
        i.forEach(function(e) {
            "childList" === e.type && (P(e.addedNodes, function(e) {
                e.localName && t(e, s);
            }), P(e.removedNodes, function(e) {
                e.localName && l(e);
            }));
        }), m.dom && console.groupEnd();
    }
    function f(e) {
        if (!e.__observer) {
            var t = new MutationObserver(d.bind(this, e));
            t.observe(e, {
                childList: !0,
                subtree: !0
            }), e.__observer = t;
        }
    }
    function p(e) {
        e = window.wrap(e), m.dom && console.group("upgradeDocument: ", e.baseURI.split("/").pop()), 
        t(e, e === window.wrap(document)), f(e), m.dom && console.groupEnd();
    }
    var m = e.flags, _ = e.forSubtree, g = e.forDocumentTree, y = window.MutationObserver._isPolyfilled && m["throttle-attached"];
    e.hasPolyfillMutations = y, e.hasThrottledAttached = y;
    var v = !1, b = [], P = Array.prototype.forEach.call.bind(Array.prototype.forEach), C = Element.prototype.createShadowRoot;
    C && (Element.prototype.createShadowRoot = function() {
        var e = C.call(this);
        return window.CustomElements.watchShadow(this), e;
    }), e.watchShadow = function(e) {
        if (e.shadowRoot && !e.shadowRoot.__watched) {
            m.dom && console.log("watching shadow-root for: ", e.localName);
            for (var t = e.shadowRoot; t; ) f(t), t = t.olderShadowRoot;
        }
    }, e.upgradeDocumentTree = function(e) {
        g(e, p);
    }, e.upgradeDocument = p, e.upgradeSubtree = n, e.upgradeAll = t, e.attached = s, 
    e.takeRecords = function(e) {
        for ((e = window.wrap(e)) || (e = window.wrap(document)); e.parentNode; ) e = e.parentNode;
        var t = e.__observer;
        t && (d(e, t.takeRecords()), r());
    };
}), window.CustomElements.addModule(function(e) {
    function t(t, n, s) {
        return r.upgrade && console.group("upgrade:", t.localName), n.is && t.setAttribute("is", n.is), 
        i(t, n), t.__upgraded__ = !0, o(t), s && e.attached(t), e.upgradeSubtree(t, s), 
        r.upgrade && console.groupEnd(), t;
    }
    function i(e, t) {
        Object.__proto__ ? e.__proto__ = t.prototype : (n(e, t.prototype, t.native), e.__proto__ = t.prototype);
    }
    function n(e, t, i) {
        for (var n = {}, o = t; o !== i && o !== HTMLElement.prototype; ) {
            for (var r, s = Object.getOwnPropertyNames(o), a = 0; r = s[a]; a++) n[r] || (Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(o, r)), 
            n[r] = 1);
            o = Object.getPrototypeOf(o);
        }
    }
    function o(e) {
        e.createdCallback && e.createdCallback();
    }
    var r = e.flags;
    e.upgrade = function(i, n) {
        if ("template" === i.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(i), 
        !i.__upgraded__ && i.nodeType === Node.ELEMENT_NODE) {
            var o = i.getAttribute("is"), r = e.getRegisteredDefinition(i.localName) || e.getRegisteredDefinition(o);
            if (r && (o && r.tag == i.localName || !o && !r.extends)) return t(i, r, n);
        }
    }, e.upgradeWithDefinition = t, e.implementPrototype = i;
}), window.CustomElements.addModule(function(e) {
    function t(e) {
        if (!e.setAttribute._polyfilled) {
            var t = e.setAttribute;
            e.setAttribute = function(e, n) {
                i.call(this, e, n, t);
            };
            var n = e.removeAttribute;
            e.removeAttribute = function(e) {
                i.call(this, e, null, n);
            }, e.setAttribute._polyfilled = !0;
        }
    }
    function i(e, t, i) {
        e = e.toLowerCase();
        var n = this.getAttribute(e);
        i.apply(this, arguments);
        var o = this.getAttribute(e);
        this.attributeChangedCallback && o !== n && this.attributeChangedCallback(e, n, o);
    }
    function n(e) {
        for (var t = 0; t < v.length; t++) if (e === v[t]) return !0;
    }
    function o(e) {
        var t = l(e);
        return t ? o(t.extends).concat([ t ]) : [];
    }
    function r(e) {
        for (var t, i = e.extends, n = 0; t = e.ancestry[n]; n++) i = t.is && t.tag;
        e.tag = i || e.__name, i && (e.is = e.__name);
    }
    function s(e) {
        if (!Object.__proto__) {
            var t = HTMLElement.prototype;
            if (e.is) {
                var i = document.createElement(e.tag);
                t = Object.getPrototypeOf(i);
            }
            for (var n, o = e.prototype, r = !1; o; ) o == t && (r = !0), (n = Object.getPrototypeOf(o)) && (o.__proto__ = n), 
            o = n;
            r || console.warn(e.tag + " prototype not found in prototype chain for " + e.is), 
            e.native = t;
        }
    }
    function a(e) {
        return _(C(e.tag), e);
    }
    function l(e) {
        if (e) return b[e.toLowerCase()];
    }
    function h(e, t) {
        b[e] = t;
    }
    function c(e) {
        return function() {
            return a(e);
        };
    }
    function u(e, t) {
        e && (e = e.toLowerCase()), t && (t = t.toLowerCase());
        var i = l(t || e);
        if (i) {
            if (e == i.tag && t == i.is) return new i.ctor();
            if (!t && !i.is) return new i.ctor();
        }
        var n;
        return t ? ((n = u(e)).setAttribute("is", t), n) : (n = C(e), e.indexOf("-") >= 0 && g(n, HTMLElement), 
        n);
    }
    function d(e, t) {
        var i = e[t];
        e[t] = function() {
            var e = i.apply(this, arguments);
            return m(e), e;
        };
    }
    var f, p = (e.isIE, e.upgradeDocumentTree), m = e.upgradeAll, _ = e.upgradeWithDefinition, g = e.implementPrototype, y = e.useNative, v = [ "annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph" ], b = {}, P = "http://www.w3.org/1999/xhtml", C = document.createElement.bind(document), w = document.createElementNS.bind(document);
    f = Object.__proto__ || y ? function(e, t) {
        return e instanceof t;
    } : function(e, t) {
        if (e instanceof t) return !0;
        for (var i = e; i; ) {
            if (i === t.prototype) return !0;
            i = i.__proto__;
        }
        return !1;
    }, d(Node.prototype, "cloneNode"), d(document, "importNode"), document.registerElement = function(i, a) {
        var u = a || {};
        if (!i) throw new Error("document.registerElement: first argument `name` must not be empty");
        if (i.indexOf("-") < 0) throw new Error("document.registerElement: first argument ('name') must contain a dash ('-'). Argument provided was '" + String(i) + "'.");
        if (n(i)) throw new Error("Failed to execute 'registerElement' on 'Document': Registration failed for type '" + String(i) + "'. The type name is invalid.");
        if (l(i)) throw new Error("DuplicateDefinitionError: a type with name '" + String(i) + "' is already registered");
        return u.prototype || (u.prototype = Object.create(HTMLElement.prototype)), u.__name = i.toLowerCase(), 
        u.extends && (u.extends = u.extends.toLowerCase()), u.lifecycle = u.lifecycle || {}, 
        u.ancestry = o(u.extends), r(u), s(u), t(u.prototype), h(u.__name, u), u.ctor = c(u), 
        u.ctor.prototype = u.prototype, u.prototype.constructor = u.ctor, e.ready && p(document), 
        u.ctor;
    }, document.createElement = u, document.createElementNS = function(e, t, i) {
        return e === P ? u(t, i) : w(e, t);
    }, e.registry = b, e.instanceof = f, e.reservedTagList = v, e.getRegisteredDefinition = l, 
    document.register = document.registerElement;
}), function(e) {
    function t() {
        r(window.wrap(document)), window.CustomElements.ready = !0, (window.requestAnimationFrame || function(e) {
            setTimeout(e, 16);
        })(function() {
            setTimeout(function() {
                window.CustomElements.readyTime = Date.now(), window.HTMLImports && (window.CustomElements.elapsed = window.CustomElements.readyTime - window.HTMLImports.readyTime), 
                document.dispatchEvent(new CustomEvent("WebComponentsReady", {
                    bubbles: !0
                }));
            });
        });
    }
    var i = e.useNative, n = e.initializeModules;
    if (e.isIE, i) {
        var o = function() {};
        e.watchShadow = o, e.upgrade = o, e.upgradeAll = o, e.upgradeDocumentTree = o, e.upgradeSubtree = o, 
        e.takeRecords = o, e.instanceof = function(e, t) {
            return e instanceof t;
        };
    } else n();
    var r = e.upgradeDocumentTree, s = e.upgradeDocument;
    if (window.wrap || (window.ShadowDOMPolyfill ? (window.wrap = window.ShadowDOMPolyfill.wrapIfNeeded, 
    window.unwrap = window.ShadowDOMPolyfill.unwrapIfNeeded) : window.wrap = window.unwrap = function(e) {
        return e;
    }), window.HTMLImports && (window.HTMLImports.__importsParsingHook = function(e) {
        e.import && s(wrap(e.import));
    }), "complete" === document.readyState || e.flags.eager) t(); else if ("interactive" !== document.readyState || window.attachEvent || window.HTMLImports && !window.HTMLImports.ready) {
        var a = window.HTMLImports && !window.HTMLImports.ready ? "HTMLImportsLoaded" : "DOMContentLoaded";
        window.addEventListener(a, t);
    } else t();
}(window.CustomElements), function(e) {
    var t = document.createElement("style");
    t.textContent = "body {transition: opacity ease-in 0.2s; } \nbody[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } \n";
    var i = document.querySelector("head");
    i.insertBefore(t, i.firstChild);
}(window.WebComponents), function() {
    function e() {
        document.body.removeAttribute("unresolved");
    }
    window.WebComponents ? addEventListener("WebComponentsReady", e) : "interactive" === document.readyState || "complete" === document.readyState ? e() : addEventListener("DOMContentLoaded", e);
}(), window.Polymer = {
    Settings: function() {
        var e = window.Polymer || {};
        if (!e.noUrlSettings) for (var t, i = location.search.slice(1).split("&"), n = 0; n < i.length && (t = i[n]); n++) (t = t.split("="))[0] && (e[t[0]] = t[1] || !0);
        return e.wantShadow = "shadow" === e.dom, e.hasShadow = Boolean(Element.prototype.createShadowRoot), 
        e.nativeShadow = e.hasShadow && !window.ShadowDOMPolyfill, e.useShadow = e.wantShadow && e.hasShadow, 
        e.hasNativeImports = Boolean("import" in document.createElement("link")), e.useNativeImports = e.hasNativeImports, 
        e.useNativeCustomElements = !window.CustomElements || window.CustomElements.useNative, 
        e.useNativeShadow = e.useShadow && e.nativeShadow, e.usePolyfillProto = !e.useNativeCustomElements && !Object.__proto__, 
        e.hasNativeCSSProperties = !navigator.userAgent.match(/AppleWebKit\/601|Edge\/15/) && window.CSS && CSS.supports && CSS.supports("box-shadow", "0 0 0 var(--foo)"), 
        e.useNativeCSSProperties = e.hasNativeCSSProperties && e.lazyRegister && e.useNativeCSSProperties, 
        e.isIE = navigator.userAgent.match("Trident"), e.passiveTouchGestures = e.passiveTouchGestures || !1, 
        e;
    }()
}, function() {
    var e = window.Polymer;
    window.Polymer = function(e) {
        "function" == typeof e && (e = e.prototype), e || (e = {});
        var i = (e = t(e)) === e.constructor.prototype ? e.constructor : null, n = {
            prototype: e
        };
        e.extends && (n.extends = e.extends), Polymer.telemetry._registrate(e);
        var o = document.registerElement(e.is, n);
        return i || o;
    };
    var t = function(e) {
        var t = Polymer.Base;
        return e.extends && (t = Polymer.Base._getExtendedPrototype(e.extends)), (e = Polymer.Base.chainObject(e, t)).registerCallback(), 
        e;
    };
    if (e) for (var i in e) Polymer[i] = e[i];
    Polymer.Class = function(e) {
        return e.factoryImpl || (e.factoryImpl = function() {}), t(e).constructor;
    };
}(), Polymer.telemetry = {
    registrations: [],
    _regLog: function(e) {
        console.log("[" + e.is + "]: registered");
    },
    _registrate: function(e) {
        this.registrations.push(e), Polymer.log && this._regLog(e);
    },
    dumpRegistrations: function() {
        this.registrations.forEach(this._regLog);
    }
}, Object.defineProperty(window, "currentImport", {
    enumerable: !0,
    configurable: !0,
    get: function() {
        return (document._currentScript || document.currentScript || {}).ownerDocument;
    }
}), Polymer.RenderStatus = {
    _ready: !1,
    _callbacks: [],
    whenReady: function(e) {
        this._ready ? e() : this._callbacks.push(e);
    },
    _makeReady: function() {
        this._ready = !0;
        for (var e = 0; e < this._callbacks.length; e++) this._callbacks[e]();
        this._callbacks = [];
    },
    _catchFirstRender: function() {
        requestAnimationFrame(function() {
            Polymer.RenderStatus._makeReady();
        });
    },
    _afterNextRenderQueue: [],
    _waitingNextRender: !1,
    afterNextRender: function(e, t, i) {
        this._watchNextRender(), this._afterNextRenderQueue.push([ e, t, i ]);
    },
    hasRendered: function() {
        return this._ready;
    },
    _watchNextRender: function() {
        if (!this._waitingNextRender) {
            this._waitingNextRender = !0;
            var e = function() {
                Polymer.RenderStatus._flushNextRender();
            };
            this._ready ? requestAnimationFrame(e) : this.whenReady(e);
        }
    },
    _flushNextRender: function() {
        var e = this;
        setTimeout(function() {
            e._flushRenderCallbacks(e._afterNextRenderQueue), e._afterNextRenderQueue = [], 
            e._waitingNextRender = !1;
        });
    },
    _flushRenderCallbacks: function(e) {
        for (var t, i = 0; i < e.length; i++) (t = e[i])[1].apply(t[0], t[2] || Polymer.nar);
    }
}, window.HTMLImports ? HTMLImports.whenReady(function() {
    Polymer.RenderStatus._catchFirstRender();
}) : Polymer.RenderStatus._catchFirstRender(), Polymer.ImportStatus = Polymer.RenderStatus, 
Polymer.ImportStatus.whenLoaded = Polymer.ImportStatus.whenReady, function() {
    "use strict";
    var e = Polymer.Settings;
    Polymer.Base = {
        __isPolymerInstance__: !0,
        _addFeature: function(e) {
            this.mixin(this, e);
        },
        registerCallback: function() {
            if ("max" === e.lazyRegister) this.beforeRegister && this.beforeRegister(); else {
                this._desugarBehaviors();
                for (var t, i = 0; i < this.behaviors.length; i++) (t = this.behaviors[i]).beforeRegister && t.beforeRegister.call(this);
                this.beforeRegister && this.beforeRegister();
            }
            this._registerFeatures(), e.lazyRegister || this.ensureRegisterFinished();
        },
        createdCallback: function() {
            if (e.disableUpgradeEnabled) {
                if (this.hasAttribute("disable-upgrade")) return this._propertySetter = t, this._configValue = null, 
                void (this.__data__ = {});
                this.__hasInitialized = !0;
            }
            this.__initialize();
        },
        __initialize: function() {
            this.__hasRegisterFinished || this._ensureRegisterFinished(this.__proto__), Polymer.telemetry.instanceCount++, 
            this.root = this;
            for (var e, t = 0; t < this.behaviors.length; t++) (e = this.behaviors[t]).created && e.created.call(this);
            this.created && this.created(), this._initFeatures();
        },
        ensureRegisterFinished: function() {
            this._ensureRegisterFinished(this);
        },
        _ensureRegisterFinished: function(t) {
            if (t.__hasRegisterFinished !== t.is || !t.is) {
                if ("max" === e.lazyRegister) {
                    t._desugarBehaviors();
                    for (var i, n = 0; n < t.behaviors.length; n++) (i = t.behaviors[n]).beforeRegister && i.beforeRegister.call(t);
                }
                t.__hasRegisterFinished = t.is, t._finishRegisterFeatures && t._finishRegisterFeatures();
                for (var o, r = 0; r < t.behaviors.length; r++) (o = t.behaviors[r]).registered && o.registered.call(t);
                t.registered && t.registered(), e.usePolyfillProto && t !== this && t.extend(this, t);
            }
        },
        attachedCallback: function() {
            var e = this;
            Polymer.RenderStatus.whenReady(function() {
                e.isAttached = !0;
                for (var t, i = 0; i < e.behaviors.length; i++) (t = e.behaviors[i]).attached && t.attached.call(e);
                e.attached && e.attached();
            });
        },
        detachedCallback: function() {
            var e = this;
            Polymer.RenderStatus.whenReady(function() {
                e.isAttached = !1;
                for (var t, i = 0; i < e.behaviors.length; i++) (t = e.behaviors[i]).detached && t.detached.call(e);
                e.detached && e.detached();
            });
        },
        attributeChangedCallback: function(e, t, i) {
            this._attributeChangedImpl(e);
            for (var n, o = 0; o < this.behaviors.length; o++) (n = this.behaviors[o]).attributeChanged && n.attributeChanged.call(this, e, t, i);
            this.attributeChanged && this.attributeChanged(e, t, i);
        },
        _attributeChangedImpl: function(e) {
            this._setAttributeToProperty(this, e);
        },
        extend: function(e, t) {
            if (e && t) for (var i, n = Object.getOwnPropertyNames(t), o = 0; o < n.length && (i = n[o]); o++) this.copyOwnProperty(i, t, e);
            return e || t;
        },
        mixin: function(e, t) {
            for (var i in t) e[i] = t[i];
            return e;
        },
        copyOwnProperty: function(e, t, i) {
            var n = Object.getOwnPropertyDescriptor(t, e);
            n && Object.defineProperty(i, e, n);
        },
        _logger: function(e, t) {
            switch (1 === t.length && Array.isArray(t[0]) && (t = t[0]), e) {
              case "log":
              case "warn":
              case "error":
                console[e].apply(console, t);
            }
        },
        _log: function() {
            var e = Array.prototype.slice.call(arguments, 0);
            this._logger("log", e);
        },
        _warn: function() {
            var e = Array.prototype.slice.call(arguments, 0);
            this._logger("warn", e);
        },
        _error: function() {
            var e = Array.prototype.slice.call(arguments, 0);
            this._logger("error", e);
        },
        _logf: function() {
            return this._logPrefix.concat(this.is).concat(Array.prototype.slice.call(arguments, 0));
        }
    }, Polymer.Base._logPrefix = window.chrome && !/edge/i.test(navigator.userAgent) || /firefox/i.test(navigator.userAgent) ? [ "%c[%s::%s]:", "font-weight: bold; background-color:#EEEE00;" ] : [ "[%s::%s]:" ], 
    Polymer.Base.chainObject = function(e, t) {
        return e && t && e !== t && (Object.__proto__ || (e = Polymer.Base.extend(Object.create(t), e)), 
        e.__proto__ = t), e;
    }, Polymer.Base = Polymer.Base.chainObject(Polymer.Base, HTMLElement.prototype), 
    Polymer.BaseDescriptors = {};
    var t;
    if (e.disableUpgradeEnabled) {
        t = function(e, t) {
            this.__data__[e] = t;
        };
        var i = Polymer.Base.attributeChangedCallback;
        Polymer.Base.attributeChangedCallback = function(e, t, n) {
            this.__hasInitialized || "disable-upgrade" !== e || (this.__hasInitialized = !0, 
            this._propertySetter = Polymer.Bind._modelApi._propertySetter, this._configValue = Polymer.Base._configValue, 
            this.__initialize()), i.call(this, e, t, n);
        };
    }
    window.CustomElements ? Polymer.instanceof = CustomElements.instanceof : Polymer.instanceof = function(e, t) {
        return e instanceof t;
    }, Polymer.isInstance = function(e) {
        return Boolean(e && e.__isPolymerInstance__);
    }, Polymer.telemetry.instanceCount = 0;
}(), function() {
    function e() {
        if (r) for (var e, t = document._currentScript || document.currentScript, i = (t && t.ownerDocument || document).querySelectorAll("dom-module"), n = i.length - 1; n >= 0 && (e = i[n]); n--) {
            if (e.__upgraded__) return;
            CustomElements.upgrade(e);
        }
    }
    var t = {}, i = {}, n = function(e) {
        return t[e] || i[e.toLowerCase()];
    }, o = function() {
        return document.createElement("dom-module");
    };
    o.prototype = Object.create(HTMLElement.prototype), Polymer.Base.mixin(o.prototype, {
        createdCallback: function() {
            this.register();
        },
        register: function(e) {
            (e = e || this.id || this.getAttribute("name") || this.getAttribute("is")) && (this.id = e, 
            t[e] = this, i[e.toLowerCase()] = this);
        },
        import: function(t, i) {
            if (t) {
                var o = n(t);
                return o || (e(), o = n(t)), o && i && (o = o.querySelector(i)), o;
            }
        }
    }), Object.defineProperty(o.prototype, "constructor", {
        value: o,
        configurable: !0,
        writable: !0
    });
    var r = window.CustomElements && !CustomElements.useNative;
    document.registerElement("dom-module", o);
}(), Polymer.Base._addFeature({
    _prepIs: function() {
        if (!this.is) {
            var e = (document._currentScript || document.currentScript).parentNode;
            if ("dom-module" === e.localName) {
                var t = e.id || e.getAttribute("name") || e.getAttribute("is");
                this.is = t;
            }
        }
        this.is && (this.is = this.is.toLowerCase());
    }
}), Polymer.Base._addFeature({
    behaviors: [],
    _desugarBehaviors: function() {
        this.behaviors.length && (this.behaviors = this._desugarSomeBehaviors(this.behaviors));
    },
    _desugarSomeBehaviors: function(e) {
        for (var t = [], i = (e = this._flattenBehaviorsList(e)).length - 1; i >= 0; i--) {
            var n = e[i];
            -1 === t.indexOf(n) && (this._mixinBehavior(n), t.unshift(n));
        }
        return t;
    },
    _flattenBehaviorsList: function(e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var n = e[i];
            n instanceof Array ? t = t.concat(this._flattenBehaviorsList(n)) : n ? t.push(n) : this._warn(this._logf("_flattenBehaviorsList", "behavior is null, check for missing or 404 import"));
        }
        return t;
    },
    _mixinBehavior: function(e) {
        for (var t, i = Object.getOwnPropertyNames(e), n = e._noAccessors, o = 0; o < i.length && (t = i[o]); o++) Polymer.Base._behaviorProperties[t] || this.hasOwnProperty(t) || (n ? this[t] = e[t] : this.copyOwnProperty(t, e, this));
    },
    _prepBehaviors: function() {
        this._prepFlattenedBehaviors(this.behaviors);
    },
    _prepFlattenedBehaviors: function(e) {
        for (var t = 0, i = e.length; t < i; t++) this._prepBehavior(e[t]);
        this._prepBehavior(this);
    },
    _marshalBehaviors: function() {
        for (var e = 0; e < this.behaviors.length; e++) this._marshalBehavior(this.behaviors[e]);
        this._marshalBehavior(this);
    }
}), Polymer.Base._behaviorProperties = {
    hostAttributes: !0,
    beforeRegister: !0,
    registered: !0,
    properties: !0,
    observers: !0,
    listeners: !0,
    created: !0,
    attached: !0,
    detached: !0,
    attributeChanged: !0,
    ready: !0,
    _noAccessors: !0
}, Polymer.Base._addFeature({
    _getExtendedPrototype: function(e) {
        return this._getExtendedNativePrototype(e);
    },
    _nativePrototypes: {},
    _getExtendedNativePrototype: function(e) {
        var t = this._nativePrototypes[e];
        if (!t) {
            t = Object.create(this.getNativePrototype(e));
            for (var i, n = Object.getOwnPropertyNames(Polymer.Base), o = 0; o < n.length && (i = n[o]); o++) Polymer.BaseDescriptors[i] || (t[i] = Polymer.Base[i]);
            Object.defineProperties(t, Polymer.BaseDescriptors), this._nativePrototypes[e] = t;
        }
        return t;
    },
    getNativePrototype: function(e) {
        return Object.getPrototypeOf(document.createElement(e));
    }
}), Polymer.Base._addFeature({
    _prepConstructor: function() {
        this._factoryArgs = this.extends ? [ this.extends, this.is ] : [ this.is ];
        var e = function() {
            return this._factory(arguments);
        };
        this.hasOwnProperty("extends") && (e.extends = this.extends), Object.defineProperty(this, "constructor", {
            value: e,
            writable: !0,
            configurable: !0
        }), e.prototype = this;
    },
    _factory: function(e) {
        var t = document.createElement.apply(document, this._factoryArgs);
        return this.factoryImpl && this.factoryImpl.apply(t, e), t;
    }
}), Polymer.nob = Object.create(null), Polymer.Base._addFeature({
    getPropertyInfo: function(e) {
        var t = this._getPropertyInfo(e, this.properties);
        if (!t) for (var i = 0; i < this.behaviors.length; i++) if (t = this._getPropertyInfo(e, this.behaviors[i].properties)) return t;
        return t || Polymer.nob;
    },
    _getPropertyInfo: function(e, t) {
        var i = t && t[e];
        return "function" == typeof i && (i = t[e] = {
            type: i
        }), i && (i.defined = !0), i;
    },
    _prepPropertyInfo: function() {
        this._propertyInfo = {};
        for (var e = 0; e < this.behaviors.length; e++) this._addPropertyInfo(this._propertyInfo, this.behaviors[e].properties);
        this._addPropertyInfo(this._propertyInfo, this.properties), this._addPropertyInfo(this._propertyInfo, this._propertyEffects);
    },
    _addPropertyInfo: function(e, t) {
        if (t) {
            var i, n;
            for (var o in t) i = e[o], n = t[o], ("_" !== o[0] || n.readOnly) && (e[o] ? (i.type || (i.type = n.type), 
            i.readOnly || (i.readOnly = n.readOnly)) : e[o] = {
                type: "function" == typeof n ? n : n.type,
                readOnly: n.readOnly,
                attribute: Polymer.CaseMap.camelToDashCase(o)
            });
        }
    }
}), function() {
    var e = {
        configurable: !0,
        writable: !0,
        enumerable: !0,
        value: {}
    };
    Polymer.BaseDescriptors.properties = e, Object.defineProperty(Polymer.Base, "properties", e);
}(), Polymer.CaseMap = {
    _caseMap: {},
    _rx: {
        dashToCamel: /-[a-z]/g,
        camelToDash: /([A-Z])/g
    },
    dashToCamelCase: function(e) {
        return this._caseMap[e] || (this._caseMap[e] = e.indexOf("-") < 0 ? e : e.replace(this._rx.dashToCamel, function(e) {
            return e[1].toUpperCase();
        }));
    },
    camelToDashCase: function(e) {
        return this._caseMap[e] || (this._caseMap[e] = e.replace(this._rx.camelToDash, "-$1").toLowerCase());
    }
}, Polymer.Base._addFeature({
    _addHostAttributes: function(e) {
        this._aggregatedAttributes || (this._aggregatedAttributes = {}), e && this.mixin(this._aggregatedAttributes, e);
    },
    _marshalHostAttributes: function() {
        this._aggregatedAttributes && this._applyAttributes(this, this._aggregatedAttributes);
    },
    _applyAttributes: function(e, t) {
        for (var i in t) if (!this.hasAttribute(i) && "class" !== i) {
            var n = t[i];
            this.serializeValueToAttribute(n, i, this);
        }
    },
    _marshalAttributes: function() {
        this._takeAttributesToModel(this);
    },
    _takeAttributesToModel: function(e) {
        if (this.hasAttributes()) for (var t in this._propertyInfo) {
            var i = this._propertyInfo[t];
            this.hasAttribute(i.attribute) && this._setAttributeToProperty(e, i.attribute, t, i);
        }
    },
    _setAttributeToProperty: function(e, t, i, n) {
        if (!this._serializing && (i = i || Polymer.CaseMap.dashToCamelCase(t), (n = n || this._propertyInfo && this._propertyInfo[i]) && !n.readOnly)) {
            var o = this.getAttribute(t);
            e[i] = this.deserialize(o, n.type);
        }
    },
    _serializing: !1,
    reflectPropertyToAttribute: function(e, t, i) {
        this._serializing = !0, i = void 0 === i ? this[e] : i, this.serializeValueToAttribute(i, t || Polymer.CaseMap.camelToDashCase(e)), 
        this._serializing = !1;
    },
    serializeValueToAttribute: function(e, t, i) {
        var n = this.serialize(e);
        i = i || this, void 0 === n ? i.removeAttribute(t) : i.setAttribute(t, n);
    },
    deserialize: function(e, t) {
        switch (t) {
          case Number:
            e = Number(e);
            break;

          case Boolean:
            e = null != e;
            break;

          case Object:
            try {
                e = JSON.parse(e);
            } catch (e) {}
            break;

          case Array:
            try {
                e = JSON.parse(e);
            } catch (t) {
                e = null, console.warn("Polymer::Attributes: couldn`t decode Array as JSON");
            }
            break;

          case Date:
            e = new Date(e);
            break;

          case String:
        }
        return e;
    },
    serialize: function(e) {
        switch (typeof e) {
          case "boolean":
            return e ? "" : void 0;

          case "object":
            if (e instanceof Date) return e.toString();
            if (e) try {
                return JSON.stringify(e);
            } catch (e) {
                return "";
            }

          default:
            return null != e ? e : void 0;
        }
    }
}), Polymer.version = "1.11.2", Polymer.Base._addFeature({
    _registerFeatures: function() {
        this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepPropertyInfo();
    },
    _prepBehavior: function(e) {
        this._addHostAttributes(e.hostAttributes);
    },
    _marshalBehavior: function(e) {},
    _initFeatures: function() {
        this._marshalHostAttributes(), this._marshalBehaviors();
    }
}), function() {
    function e(e, i) {
        return e.replace(s, function(e, n, o, r) {
            return n + "'" + t(o.replace(/["']/g, ""), i) + "'" + r;
        });
    }
    function t(e, t) {
        if (e && l.test(e)) return e;
        var n = i(t);
        return n.href = e, n.href || e;
    }
    function i(e) {
        return e.body.__urlResolver || (e.body.__urlResolver = e.createElement("a"));
    }
    function n(e) {
        return e.substring(0, e.lastIndexOf("/") + 1);
    }
    var o, r, s = /(url\()([^)]*)(\))/g, a = {
        "*": [ "href", "src", "style", "url" ],
        form: [ "action" ]
    }, l = /(^\/)|(^#)|(^[\w-\d]*:)/, h = /\{\{|\[\[/;
    Polymer.ResolveUrl = {
        resolveCss: e,
        resolveAttrs: function(i, n) {
            for (var o in a) for (var r, s, l, c = a[o], u = 0, d = c.length; u < d && (r = c[u]); u++) "*" !== o && i.localName !== o || (l = (s = i.attributes[r]) && s.value) && l.search(h) < 0 && (s.value = "style" === r ? e(l, n) : t(l, n));
        },
        resolveUrl: function(e, i) {
            return o || (o = document.implementation.createHTMLDocument("temp"), r = o.createElement("base"), 
            o.head.appendChild(r)), r.href = i, t(e, o);
        },
        pathFromUrl: n
    }, Polymer.rootPath = Polymer.Settings.rootPath || n(document.baseURI || window.location.href);
}(), Polymer.Base._addFeature({
    _prepTemplate: function() {
        var e;
        if (void 0 === this._template && (e = Polymer.DomModule.import(this.is), this._template = e && e.querySelector("template")), 
        e) {
            var t = e.getAttribute("assetpath") || "", i = Polymer.ResolveUrl.resolveUrl(t, e.ownerDocument.baseURI);
            this._importPath = Polymer.ResolveUrl.pathFromUrl(i);
        } else this._importPath = "";
        this._template && this._template.hasAttribute("is") && this._warn(this._logf("_prepTemplate", "top-level Polymer template must not be a type-extension, found", this._template, "Move inside simple <template>.")), 
        this._template && !this._template.content && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(this._template);
    },
    _stampTemplate: function() {
        this._template && (this.root = this.instanceTemplate(this._template));
    },
    instanceTemplate: function(e) {
        return document.importNode(e._content || e.content, !0);
    }
}), function() {
    var e = Polymer.Base.attachedCallback, t = Polymer.Base.detachedCallback;
    Polymer.Base._addFeature({
        _hostStack: [],
        ready: function() {},
        _registerHost: function(e) {
            this.dataHost = e = e || Polymer.Base._hostStack[Polymer.Base._hostStack.length - 1], 
            e && e._clients && e._clients.push(this), this._clients = null, this._clientsReadied = !1;
        },
        _beginHosting: function() {
            Polymer.Base._hostStack.push(this), this._clients || (this._clients = []);
        },
        _endHosting: function() {
            Polymer.Base._hostStack.pop();
        },
        _tryReady: function() {
            this._readied = !1, this._canReady() && this._ready();
        },
        _canReady: function() {
            return !this.dataHost || this.dataHost._clientsReadied;
        },
        _ready: function() {
            this._beforeClientsReady(), this._template && (this._setupRoot(), this._readyClients()), 
            this._clientsReadied = !0, this._clients = null, this._afterClientsReady(), this._readySelf();
        },
        _readyClients: function() {
            this._beginDistribute();
            var e = this._clients;
            if (e) for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) t._ready();
            this._finishDistribute();
        },
        _readySelf: function() {
            for (var e, t = 0; t < this.behaviors.length; t++) (e = this.behaviors[t]).ready && e.ready.call(this);
            this.ready && this.ready(), this._readied = !0, this._attachedPending && (this._attachedPending = !1, 
            this.attachedCallback());
        },
        _beforeClientsReady: function() {},
        _afterClientsReady: function() {},
        _beforeAttached: function() {},
        attachedCallback: function() {
            this._readied ? (this._beforeAttached(), e.call(this)) : this._attachedPending = !0;
        },
        detachedCallback: function() {
            this._readied ? t.call(this) : this._attachedPending = !1;
        }
    });
}(), Polymer.ArraySplice = function() {
    function e(e, t, i) {
        return {
            index: e,
            removed: t,
            addedCount: i
        };
    }
    function t() {}
    return t.prototype = {
        calcEditDistances: function(e, t, i, n, o, r) {
            for (var s = r - o + 1, a = i - t + 1, l = new Array(s), h = 0; h < s; h++) l[h] = new Array(a), 
            l[h][0] = h;
            for (var c = 0; c < a; c++) l[0][c] = c;
            for (h = 1; h < s; h++) for (c = 1; c < a; c++) if (this.equals(e[t + c - 1], n[o + h - 1])) l[h][c] = l[h - 1][c - 1]; else {
                var u = l[h - 1][c] + 1, d = l[h][c - 1] + 1;
                l[h][c] = u < d ? u : d;
            }
            return l;
        },
        spliceOperationsFromEditDistances: function(e) {
            for (var t = e.length - 1, i = e[0].length - 1, n = e[t][i], o = []; t > 0 || i > 0; ) if (0 != t) if (0 != i) {
                var r, s = e[t - 1][i - 1], a = e[t - 1][i], l = e[t][i - 1];
                (r = a < l ? a < s ? a : s : l < s ? l : s) == s ? (s == n ? o.push(0) : (o.push(1), 
                n = s), t--, i--) : r == a ? (o.push(3), t--, n = a) : (o.push(2), i--, n = l);
            } else o.push(3), t--; else o.push(2), i--;
            return o.reverse(), o;
        },
        calcSplices: function(t, i, n, o, r, s) {
            var a = 0, l = 0, h = Math.min(n - i, s - r);
            if (0 == i && 0 == r && (a = this.sharedPrefix(t, o, h)), n == t.length && s == o.length && (l = this.sharedSuffix(t, o, h - a)), 
            i += a, r += a, n -= l, s -= l, n - i == 0 && s - r == 0) return [];
            if (i == n) {
                for (var c = e(i, [], 0); r < s; ) c.removed.push(o[r++]);
                return [ c ];
            }
            if (r == s) return [ e(i, [], n - i) ];
            var u = this.spliceOperationsFromEditDistances(this.calcEditDistances(t, i, n, o, r, s));
            c = void 0;
            for (var d = [], f = i, p = r, m = 0; m < u.length; m++) switch (u[m]) {
              case 0:
                c && (d.push(c), c = void 0), f++, p++;
                break;

              case 1:
                c || (c = e(f, [], 0)), c.addedCount++, f++, c.removed.push(o[p]), p++;
                break;

              case 2:
                c || (c = e(f, [], 0)), c.addedCount++, f++;
                break;

              case 3:
                c || (c = e(f, [], 0)), c.removed.push(o[p]), p++;
            }
            return c && d.push(c), d;
        },
        sharedPrefix: function(e, t, i) {
            for (var n = 0; n < i; n++) if (!this.equals(e[n], t[n])) return n;
            return i;
        },
        sharedSuffix: function(e, t, i) {
            for (var n = e.length, o = t.length, r = 0; r < i && this.equals(e[--n], t[--o]); ) r++;
            return r;
        },
        calculateSplices: function(e, t) {
            return this.calcSplices(e, 0, e.length, t, 0, t.length);
        },
        equals: function(e, t) {
            return e === t;
        }
    }, new t();
}(), Polymer.domInnerHTML = function() {
    function e(e) {
        switch (e) {
          case "&":
            return "&amp;";

          case "<":
            return "&lt;";

          case ">":
            return "&gt;";

          case '"':
            return "&quot;";

          case " ":
            return "&nbsp;";
        }
    }
    function t(t) {
        return t.replace(s, e);
    }
    function i(t) {
        return t.replace(a, e);
    }
    function n(e) {
        for (var t = {}, i = 0; i < e.length; i++) t[e[i]] = !0;
        return t;
    }
    function o(e, n, o) {
        switch (e.nodeType) {
          case Node.ELEMENT_NODE:
            for (var s, a = e.localName, c = "<" + a, u = e.attributes, d = 0; s = u[d]; d++) c += " " + s.name + '="' + t(s.value) + '"';
            return c += ">", l[a] ? c : c + r(e, o) + "</" + a + ">";

          case Node.TEXT_NODE:
            var f = e.data;
            return n && h[n.localName] ? f : i(f);

          case Node.COMMENT_NODE:
            return "\x3c!--" + e.data + "--\x3e";

          default:
            throw console.error(e), new Error("not implemented");
        }
    }
    function r(e, t) {
        e instanceof HTMLTemplateElement && (e = e.content);
        for (var i, n = "", r = Polymer.dom(e).childNodes, s = 0, a = r.length; s < a && (i = r[s]); s++) n += o(i, e, t);
        return n;
    }
    var s = /[&\u00A0"]/g, a = /[&\u00A0<>]/g, l = n([ "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr" ]), h = n([ "style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript" ]);
    return {
        getInnerHTML: r
    };
}(), function() {
    "use strict";
    var e = Element.prototype.insertBefore, t = Element.prototype.appendChild, i = Element.prototype.removeChild;
    Polymer.TreeApi = {
        arrayCopyChildNodes: function(e) {
            for (var t = [], i = 0, n = e.firstChild; n; n = n.nextSibling) t[i++] = n;
            return t;
        },
        arrayCopyChildren: function(e) {
            for (var t = [], i = 0, n = e.firstElementChild; n; n = n.nextElementSibling) t[i++] = n;
            return t;
        },
        arrayCopy: function(e) {
            for (var t = e.length, i = new Array(t), n = 0; n < t; n++) i[n] = e[n];
            return i;
        }
    }, Polymer.TreeApi.Logical = {
        hasParentNode: function(e) {
            return Boolean(e.__dom && e.__dom.parentNode);
        },
        hasChildNodes: function(e) {
            return Boolean(e.__dom && void 0 !== e.__dom.childNodes);
        },
        getChildNodes: function(e) {
            return this.hasChildNodes(e) ? this._getChildNodes(e) : e.childNodes;
        },
        _getChildNodes: function(e) {
            if (!e.__dom.childNodes) {
                e.__dom.childNodes = [];
                for (var t = e.__dom.firstChild; t; t = t.__dom.nextSibling) e.__dom.childNodes.push(t);
            }
            return e.__dom.childNodes;
        },
        getParentNode: function(e) {
            return e.__dom && void 0 !== e.__dom.parentNode ? e.__dom.parentNode : e.parentNode;
        },
        getFirstChild: function(e) {
            return e.__dom && void 0 !== e.__dom.firstChild ? e.__dom.firstChild : e.firstChild;
        },
        getLastChild: function(e) {
            return e.__dom && void 0 !== e.__dom.lastChild ? e.__dom.lastChild : e.lastChild;
        },
        getNextSibling: function(e) {
            return e.__dom && void 0 !== e.__dom.nextSibling ? e.__dom.nextSibling : e.nextSibling;
        },
        getPreviousSibling: function(e) {
            return e.__dom && void 0 !== e.__dom.previousSibling ? e.__dom.previousSibling : e.previousSibling;
        },
        getFirstElementChild: function(e) {
            return e.__dom && void 0 !== e.__dom.firstChild ? this._getFirstElementChild(e) : e.firstElementChild;
        },
        _getFirstElementChild: function(e) {
            for (var t = e.__dom.firstChild; t && t.nodeType !== Node.ELEMENT_NODE; ) t = t.__dom.nextSibling;
            return t;
        },
        getLastElementChild: function(e) {
            return e.__dom && void 0 !== e.__dom.lastChild ? this._getLastElementChild(e) : e.lastElementChild;
        },
        _getLastElementChild: function(e) {
            for (var t = e.__dom.lastChild; t && t.nodeType !== Node.ELEMENT_NODE; ) t = t.__dom.previousSibling;
            return t;
        },
        getNextElementSibling: function(e) {
            return e.__dom && void 0 !== e.__dom.nextSibling ? this._getNextElementSibling(e) : e.nextElementSibling;
        },
        _getNextElementSibling: function(e) {
            for (var t = e.__dom.nextSibling; t && t.nodeType !== Node.ELEMENT_NODE; ) t = t.__dom.nextSibling;
            return t;
        },
        getPreviousElementSibling: function(e) {
            return e.__dom && void 0 !== e.__dom.previousSibling ? this._getPreviousElementSibling(e) : e.previousElementSibling;
        },
        _getPreviousElementSibling: function(e) {
            for (var t = e.__dom.previousSibling; t && t.nodeType !== Node.ELEMENT_NODE; ) t = t.__dom.previousSibling;
            return t;
        },
        saveChildNodes: function(e) {
            if (!this.hasChildNodes(e)) {
                e.__dom = e.__dom || {}, e.__dom.firstChild = e.firstChild, e.__dom.lastChild = e.lastChild, 
                e.__dom.childNodes = [];
                for (var t = e.firstChild; t; t = t.nextSibling) t.__dom = t.__dom || {}, t.__dom.parentNode = e, 
                e.__dom.childNodes.push(t), t.__dom.nextSibling = t.nextSibling, t.__dom.previousSibling = t.previousSibling;
            }
        },
        recordInsertBefore: function(e, t, i) {
            if (t.__dom.childNodes = null, e.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (var n = e.firstChild; n; n = n.nextSibling) this._linkNode(n, t, i); else this._linkNode(e, t, i);
        },
        _linkNode: function(e, t, i) {
            e.__dom = e.__dom || {}, t.__dom = t.__dom || {}, i && (i.__dom = i.__dom || {}), 
            e.__dom.previousSibling = i ? i.__dom.previousSibling : t.__dom.lastChild, e.__dom.previousSibling && (e.__dom.previousSibling.__dom.nextSibling = e), 
            e.__dom.nextSibling = i || null, e.__dom.nextSibling && (e.__dom.nextSibling.__dom.previousSibling = e), 
            e.__dom.parentNode = t, i ? i === t.__dom.firstChild && (t.__dom.firstChild = e) : (t.__dom.lastChild = e, 
            t.__dom.firstChild || (t.__dom.firstChild = e)), t.__dom.childNodes = null;
        },
        recordRemoveChild: function(e, t) {
            e.__dom = e.__dom || {}, t.__dom = t.__dom || {}, e === t.__dom.firstChild && (t.__dom.firstChild = e.__dom.nextSibling), 
            e === t.__dom.lastChild && (t.__dom.lastChild = e.__dom.previousSibling);
            var i = e.__dom.previousSibling, n = e.__dom.nextSibling;
            i && (i.__dom.nextSibling = n), n && (n.__dom.previousSibling = i), e.__dom.parentNode = e.__dom.previousSibling = e.__dom.nextSibling = void 0, 
            t.__dom.childNodes = null;
        }
    }, Polymer.TreeApi.Composed = {
        getChildNodes: function(e) {
            return Polymer.TreeApi.arrayCopyChildNodes(e);
        },
        getParentNode: function(e) {
            return e.parentNode;
        },
        clearChildNodes: function(e) {
            e.textContent = "";
        },
        insertBefore: function(t, i, n) {
            return e.call(t, i, n || null);
        },
        appendChild: function(e, i) {
            return t.call(e, i);
        },
        removeChild: function(e, t) {
            return i.call(e, t);
        }
    };
}(), Polymer.DomApi = function() {
    "use strict";
    var e = Polymer.Settings, t = Polymer.TreeApi, i = function(e) {
        this.node = n ? i.wrap(e) : e;
    }, n = e.hasShadow && !e.nativeShadow;
    i.wrap = window.wrap ? window.wrap : function(e) {
        return e;
    }, i.prototype = {
        flush: function() {
            Polymer.dom.flush();
        },
        deepContains: function(e) {
            if (this.node.contains(e)) return !0;
            for (var t = e, i = e.ownerDocument; t && t !== i && t !== this.node; ) t = Polymer.dom(t).parentNode || t.host;
            return t === this.node;
        },
        queryDistributedElements: function(e) {
            for (var t, n = this.getEffectiveChildNodes(), o = [], r = 0, s = n.length; r < s && (t = n[r]); r++) t.nodeType === Node.ELEMENT_NODE && i.matchesSelector.call(t, e) && o.push(t);
            return o;
        },
        getEffectiveChildNodes: function() {
            for (var e, t = [], i = this.childNodes, n = 0, s = i.length; n < s && (e = i[n]); n++) if (e.localName === o) for (var a = r(e).getDistributedNodes(), l = 0; l < a.length; l++) t.push(a[l]); else t.push(e);
            return t;
        },
        observeNodes: function(e) {
            if (e) return this.observer || (this.observer = this.node.localName === o ? new i.DistributedNodesObserver(this) : new i.EffectiveNodesObserver(this)), 
            this.observer.addListener(e);
        },
        unobserveNodes: function(e) {
            this.observer && this.observer.removeListener(e);
        },
        notifyObserver: function() {
            this.observer && this.observer.notify();
        },
        _query: function(e, i, n) {
            i = i || this.node;
            var o = [];
            return this._queryElements(t.Logical.getChildNodes(i), e, n, o), o;
        },
        _queryElements: function(e, t, i, n) {
            for (var o, r = 0, s = e.length; r < s && (o = e[r]); r++) if (o.nodeType === Node.ELEMENT_NODE && this._queryElement(o, t, i, n)) return !0;
        },
        _queryElement: function(e, i, n, o) {
            var r = i(e);
            if (r && o.push(e), n && n(r)) return r;
            this._queryElements(t.Logical.getChildNodes(e), i, n, o);
        }
    };
    var o = i.CONTENT = "content", r = i.factory = function(e) {
        return (e = e || document).__domApi || (e.__domApi = new i.ctor(e)), e.__domApi;
    };
    i.hasApi = function(e) {
        return Boolean(e.__domApi);
    }, i.ctor = i, Polymer.dom = function(e, t) {
        return e instanceof Event ? Polymer.EventApi.factory(e) : i.factory(e, t);
    };
    var s = Element.prototype;
    return i.matchesSelector = s.matches || s.matchesSelector || s.mozMatchesSelector || s.msMatchesSelector || s.oMatchesSelector || s.webkitMatchesSelector, 
    i;
}(), function() {
    "use strict";
    var e = Polymer.Settings, t = Polymer.DomApi, i = t.factory, n = Polymer.TreeApi, o = Polymer.domInnerHTML.getInnerHTML, r = t.CONTENT;
    if (!e.useShadow) {
        var s = Element.prototype.cloneNode, a = Document.prototype.importNode;
        Polymer.Base.mixin(t.prototype, {
            _lazyDistribute: function(e) {
                e.shadyRoot && e.shadyRoot._distributionClean && (e.shadyRoot._distributionClean = !1, 
                Polymer.dom.addDebouncer(e.debounce("_distribute", e._distributeContent)));
            },
            appendChild: function(e) {
                return this.insertBefore(e);
            },
            insertBefore: function(e, o) {
                if (o && n.Logical.getParentNode(o) !== this.node) throw Error("The ref_node to be inserted before is not a child of this node");
                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    var s = n.Logical.getParentNode(e);
                    s ? (t.hasApi(s) && i(s).notifyObserver(), this._removeNode(e)) : this._removeOwnerShadyRoot(e);
                }
                if (!this._addNode(e, o)) {
                    o && (o = o.localName === r ? this._firstComposedNode(o) : o);
                    var a = this.node._isShadyRoot ? this.node.host : this.node;
                    o ? n.Composed.insertBefore(a, e, o) : n.Composed.appendChild(a, e);
                }
                return this.notifyObserver(), e;
            },
            _addNode: function(e, t) {
                var i = this.getOwnerRoot();
                if (i) {
                    var o = this._maybeAddInsertionPoint(e, this.node);
                    i._invalidInsertionPoints || (i._invalidInsertionPoints = o), this._addNodeToHost(i.host, e);
                }
                n.Logical.hasChildNodes(this.node) && n.Logical.recordInsertBefore(e, this.node, t);
                var r = this._maybeDistribute(e) || this.node.shadyRoot;
                if (r) if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (;e.firstChild; ) n.Composed.removeChild(e, e.firstChild); else {
                    var s = n.Composed.getParentNode(e);
                    s && n.Composed.removeChild(s, e);
                }
                return r;
            },
            removeChild: function(e) {
                if (n.Logical.getParentNode(e) !== this.node) throw Error("The node to be removed is not a child of this node: " + e);
                if (!this._removeNode(e)) {
                    var t = this.node._isShadyRoot ? this.node.host : this.node;
                    t === n.Composed.getParentNode(e) && n.Composed.removeChild(t, e);
                }
                return this.notifyObserver(), e;
            },
            _removeNode: function(e) {
                var t, o = n.Logical.hasParentNode(e) && n.Logical.getParentNode(e), r = this._ownerShadyRootForNode(e);
                return o && (t = i(e)._maybeDistributeParent(), n.Logical.recordRemoveChild(e, o), 
                r && this._removeDistributedChildren(r, e) && (r._invalidInsertionPoints = !0, this._lazyDistribute(r.host))), 
                this._removeOwnerShadyRoot(e), r && this._removeNodeFromHost(r.host, e), t;
            },
            replaceChild: function(e, t) {
                return this.insertBefore(e, t), this.removeChild(t), e;
            },
            _hasCachedOwnerRoot: function(e) {
                return Boolean(void 0 !== e._ownerShadyRoot);
            },
            getOwnerRoot: function() {
                return this._ownerShadyRootForNode(this.node);
            },
            _ownerShadyRootForNode: function(e) {
                if (e) {
                    var t = e._ownerShadyRoot;
                    if (void 0 === t) {
                        if (e._isShadyRoot) t = e; else {
                            var i = n.Logical.getParentNode(e);
                            t = i ? i._isShadyRoot ? i : this._ownerShadyRootForNode(i) : null;
                        }
                        (t || document.documentElement.contains(e)) && (e._ownerShadyRoot = t);
                    }
                    return t;
                }
            },
            _maybeDistribute: function(e) {
                var t = e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !e.__noContent && i(e).querySelector(r), o = t && n.Logical.getParentNode(t).nodeType !== Node.DOCUMENT_FRAGMENT_NODE, s = t || e.localName === r;
                if (s) {
                    var a = this.getOwnerRoot();
                    a && this._lazyDistribute(a.host);
                }
                var l = this._nodeNeedsDistribution(this.node);
                return l && this._lazyDistribute(this.node), l || s && !o;
            },
            _maybeAddInsertionPoint: function(e, t) {
                var o;
                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || e.__noContent) e.localName === r && (n.Logical.saveChildNodes(t), 
                n.Logical.saveChildNodes(e), o = !0); else for (var s, a, l, h = i(e).querySelectorAll(r), c = 0; c < h.length && (s = h[c]); c++) (a = n.Logical.getParentNode(s)) === e && (a = t), 
                l = this._maybeAddInsertionPoint(s, a), o = o || l;
                return o;
            },
            _updateInsertionPoints: function(e) {
                for (var t, o = e.shadyRoot._insertionPoints = i(e.shadyRoot).querySelectorAll(r), s = 0; s < o.length; s++) t = o[s], 
                n.Logical.saveChildNodes(t), n.Logical.saveChildNodes(n.Logical.getParentNode(t));
            },
            _nodeNeedsDistribution: function(e) {
                return e && e.shadyRoot && t.hasInsertionPoint(e.shadyRoot);
            },
            _addNodeToHost: function(e, t) {
                e._elementAdd && e._elementAdd(t);
            },
            _removeNodeFromHost: function(e, t) {
                e._elementRemove && e._elementRemove(t);
            },
            _removeDistributedChildren: function(e, t) {
                for (var o, r = e._insertionPoints, s = 0; s < r.length; s++) {
                    var a = r[s];
                    if (this._contains(t, a)) for (var l = i(a).getDistributedNodes(), h = 0; h < l.length; h++) {
                        o = !0;
                        var c = l[h], u = n.Composed.getParentNode(c);
                        u && n.Composed.removeChild(u, c);
                    }
                }
                return o;
            },
            _contains: function(e, t) {
                for (;t; ) {
                    if (t == e) return !0;
                    t = n.Logical.getParentNode(t);
                }
            },
            _removeOwnerShadyRoot: function(e) {
                if (this._hasCachedOwnerRoot(e)) for (var t, i = n.Logical.getChildNodes(e), o = 0, r = i.length; o < r && (t = i[o]); o++) this._removeOwnerShadyRoot(t);
                e._ownerShadyRoot = void 0;
            },
            _firstComposedNode: function(e) {
                for (var t, n, o = i(e).getDistributedNodes(), r = 0, s = o.length; r < s && (t = o[r]); r++) if ((n = i(t).getDestinationInsertionPoints())[n.length - 1] === e) return t;
            },
            querySelector: function(e) {
                return this._query(function(i) {
                    return t.matchesSelector.call(i, e);
                }, this.node, function(e) {
                    return Boolean(e);
                })[0] || null;
            },
            querySelectorAll: function(e) {
                return this._query(function(i) {
                    return t.matchesSelector.call(i, e);
                }, this.node);
            },
            getDestinationInsertionPoints: function() {
                return this.node._destinationInsertionPoints || [];
            },
            getDistributedNodes: function() {
                return this.node._distributedNodes || [];
            },
            _clear: function() {
                for (;this.childNodes.length; ) this.removeChild(this.childNodes[0]);
            },
            setAttribute: function(e, t) {
                this.node.setAttribute(e, t), this._maybeDistributeParent();
            },
            removeAttribute: function(e) {
                this.node.removeAttribute(e), this._maybeDistributeParent();
            },
            _maybeDistributeParent: function() {
                if (this._nodeNeedsDistribution(this.parentNode)) return this._lazyDistribute(this.parentNode), 
                !0;
            },
            cloneNode: function(e) {
                var t = s.call(this.node, !1);
                if (e) for (var n, o = this.childNodes, r = i(t), a = 0; a < o.length; a++) n = i(o[a]).cloneNode(!0), 
                r.appendChild(n);
                return t;
            },
            importNode: function(e, t) {
                var o = this.node instanceof Document ? this.node : this.node.ownerDocument, r = a.call(o, e, !1);
                if (t) for (var s, l = n.Logical.getChildNodes(e), h = i(r), c = 0; c < l.length; c++) s = i(o).importNode(l[c], !0), 
                h.appendChild(s);
                return r;
            },
            _getComposedInnerHTML: function() {
                return o(this.node, !0);
            }
        }), Object.defineProperties(t.prototype, {
            activeElement: {
                get: function() {
                    var e = document.activeElement;
                    if (!e) return null;
                    var t = !!this.node._isShadyRoot;
                    if (this.node !== document) {
                        if (!t) return null;
                        if (this.node.host === e || !this.node.host.contains(e)) return null;
                    }
                    for (var n = i(e).getOwnerRoot(); n && n !== this.node; ) e = n.host, n = i(e).getOwnerRoot();
                    return this.node === document ? n ? null : e : n === this.node ? e : null;
                },
                configurable: !0
            },
            childNodes: {
                get: function() {
                    var e = n.Logical.getChildNodes(this.node);
                    return Array.isArray(e) ? e : n.arrayCopyChildNodes(this.node);
                },
                configurable: !0
            },
            children: {
                get: function() {
                    return n.Logical.hasChildNodes(this.node) ? Array.prototype.filter.call(this.childNodes, function(e) {
                        return e.nodeType === Node.ELEMENT_NODE;
                    }) : n.arrayCopyChildren(this.node);
                },
                configurable: !0
            },
            parentNode: {
                get: function() {
                    return n.Logical.getParentNode(this.node);
                },
                configurable: !0
            },
            firstChild: {
                get: function() {
                    return n.Logical.getFirstChild(this.node);
                },
                configurable: !0
            },
            lastChild: {
                get: function() {
                    return n.Logical.getLastChild(this.node);
                },
                configurable: !0
            },
            nextSibling: {
                get: function() {
                    return n.Logical.getNextSibling(this.node);
                },
                configurable: !0
            },
            previousSibling: {
                get: function() {
                    return n.Logical.getPreviousSibling(this.node);
                },
                configurable: !0
            },
            firstElementChild: {
                get: function() {
                    return n.Logical.getFirstElementChild(this.node);
                },
                configurable: !0
            },
            lastElementChild: {
                get: function() {
                    return n.Logical.getLastElementChild(this.node);
                },
                configurable: !0
            },
            nextElementSibling: {
                get: function() {
                    return n.Logical.getNextElementSibling(this.node);
                },
                configurable: !0
            },
            previousElementSibling: {
                get: function() {
                    return n.Logical.getPreviousElementSibling(this.node);
                },
                configurable: !0
            },
            textContent: {
                get: function() {
                    var e = this.node.nodeType;
                    if (e === Node.TEXT_NODE || e === Node.COMMENT_NODE) return this.node.textContent;
                    for (var t, i = [], n = 0, o = this.childNodes; t = o[n]; n++) t.nodeType !== Node.COMMENT_NODE && i.push(t.textContent);
                    return i.join("");
                },
                set: function(e) {
                    var t = this.node.nodeType;
                    t === Node.TEXT_NODE || t === Node.COMMENT_NODE ? this.node.textContent = e : (this._clear(), 
                    e && this.appendChild(document.createTextNode(e)));
                },
                configurable: !0
            },
            innerHTML: {
                get: function() {
                    var e = this.node.nodeType;
                    return e === Node.TEXT_NODE || e === Node.COMMENT_NODE ? null : o(this.node);
                },
                set: function(e) {
                    var t = this.node.nodeType;
                    if (t !== Node.TEXT_NODE || t !== Node.COMMENT_NODE) {
                        this._clear();
                        var i = document.createElement("div");
                        i.innerHTML = e;
                        for (var o = n.arrayCopyChildNodes(i), r = 0; r < o.length; r++) this.appendChild(o[r]);
                    }
                },
                configurable: !0
            }
        }), t.hasInsertionPoint = function(e) {
            return Boolean(e && e._insertionPoints.length);
        };
    }
}(), function() {
    "use strict";
    var e = Polymer.Settings, t = Polymer.TreeApi, i = Polymer.DomApi;
    if (e.useShadow) {
        Polymer.Base.mixin(i.prototype, {
            querySelectorAll: function(e) {
                return t.arrayCopy(this.node.querySelectorAll(e));
            },
            getOwnerRoot: function() {
                for (var e = this.node; e; ) {
                    if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host) return e;
                    e = e.parentNode;
                }
            },
            importNode: function(e, t) {
                return (this.node instanceof Document ? this.node : this.node.ownerDocument).importNode(e, t);
            },
            getDestinationInsertionPoints: function() {
                var e = this.node.getDestinationInsertionPoints && this.node.getDestinationInsertionPoints();
                return e ? t.arrayCopy(e) : [];
            },
            getDistributedNodes: function() {
                var e = this.node.getDistributedNodes && this.node.getDistributedNodes();
                return e ? t.arrayCopy(e) : [];
            }
        }), Object.defineProperties(i.prototype, {
            activeElement: {
                get: function() {
                    var e = i.wrap(this.node), t = e.activeElement;
                    return e.contains(t) ? t : null;
                },
                configurable: !0
            },
            childNodes: {
                get: function() {
                    return t.arrayCopyChildNodes(this.node);
                },
                configurable: !0
            },
            children: {
                get: function() {
                    return t.arrayCopyChildren(this.node);
                },
                configurable: !0
            },
            textContent: {
                get: function() {
                    return this.node.textContent;
                },
                set: function(e) {
                    return this.node.textContent = e;
                },
                configurable: !0
            },
            innerHTML: {
                get: function() {
                    return this.node.innerHTML;
                },
                set: function(e) {
                    return this.node.innerHTML = e;
                },
                configurable: !0
            }
        });
        var n = function(e) {
            i.prototype[e] = function() {
                return this.node[e].apply(this.node, arguments);
            };
        };
        !function(e) {
            for (var t = 0; t < e.length; t++) n(e[t]);
        }([ "cloneNode", "appendChild", "insertBefore", "removeChild", "replaceChild", "setAttribute", "removeAttribute", "querySelector" ]);
        var o = function(e) {
            Object.defineProperty(i.prototype, e, {
                get: function() {
                    return this.node[e];
                },
                configurable: !0
            });
        };
        !function(e) {
            for (var t = 0; t < e.length; t++) o(e[t]);
        }([ "parentNode", "firstChild", "lastChild", "nextSibling", "previousSibling", "firstElementChild", "lastElementChild", "nextElementSibling", "previousElementSibling" ]);
    }
}(), Polymer.Base.mixin(Polymer.dom, {
    _flushGuard: 0,
    _FLUSH_MAX: 100,
    _needsTakeRecords: !Polymer.Settings.useNativeCustomElements,
    _debouncers: [],
    _staticFlushList: [],
    _finishDebouncer: null,
    flush: function() {
        for (this._flushGuard = 0, this._prepareFlush(); this._debouncers.length && this._flushGuard < this._FLUSH_MAX; ) {
            for (;this._debouncers.length; ) this._debouncers.shift().complete();
            this._finishDebouncer && this._finishDebouncer.complete(), this._prepareFlush(), 
            this._flushGuard++;
        }
        this._flushGuard >= this._FLUSH_MAX && console.warn("Polymer.dom.flush aborted. Flush may not be complete.");
    },
    _prepareFlush: function() {
        this._needsTakeRecords && CustomElements.takeRecords();
        for (var e = 0; e < this._staticFlushList.length; e++) this._staticFlushList[e]();
    },
    addStaticFlush: function(e) {
        this._staticFlushList.push(e);
    },
    removeStaticFlush: function(e) {
        var t = this._staticFlushList.indexOf(e);
        t >= 0 && this._staticFlushList.splice(t, 1);
    },
    addDebouncer: function(e) {
        this._debouncers.push(e), this._finishDebouncer = Polymer.Debounce(this._finishDebouncer, this._finishFlush);
    },
    _finishFlush: function() {
        Polymer.dom._debouncers = [];
    }
}), Polymer.EventApi = function() {
    "use strict";
    var e = Polymer.DomApi.ctor, t = Polymer.Settings;
    e.Event = function(e) {
        this.event = e;
    }, t.useShadow ? e.Event.prototype = {
        get rootTarget() {
            return this.event.path[0];
        },
        get localTarget() {
            return this.event.target;
        },
        get path() {
            var e = this.event.path;
            return Array.isArray(e) || (e = Array.prototype.slice.call(e)), e;
        }
    } : e.Event.prototype = {
        get rootTarget() {
            return this.event.target;
        },
        get localTarget() {
            for (var e = this.event.currentTarget, t = e && Polymer.dom(e).getOwnerRoot(), i = this.path, n = 0; n < i.length; n++) if (Polymer.dom(i[n]).getOwnerRoot() === t) return i[n];
        },
        get path() {
            if (!this.event._path) {
                for (var e = [], t = this.rootTarget; t; ) {
                    e.push(t);
                    var i = Polymer.dom(t).getDestinationInsertionPoints();
                    if (i.length) {
                        for (var n = 0; n < i.length - 1; n++) e.push(i[n]);
                        t = i[i.length - 1];
                    } else t = Polymer.dom(t).parentNode || t.host;
                }
                e.push(window), this.event._path = e;
            }
            return this.event._path;
        }
    };
    return {
        factory: function(t) {
            return t.__eventApi || (t.__eventApi = new e.Event(t)), t.__eventApi;
        }
    };
}(), function() {
    "use strict";
    var e = Polymer.DomApi.ctor, t = Polymer.Settings.useShadow;
    Object.defineProperty(e.prototype, "classList", {
        get: function() {
            return this._classList || (this._classList = new e.ClassList(this)), this._classList;
        },
        configurable: !0
    }), e.ClassList = function(e) {
        this.domApi = e, this.node = e.node;
    }, e.ClassList.prototype = {
        add: function() {
            this.node.classList.add.apply(this.node.classList, arguments), this._distributeParent();
        },
        remove: function() {
            this.node.classList.remove.apply(this.node.classList, arguments), this._distributeParent();
        },
        toggle: function() {
            this.node.classList.toggle.apply(this.node.classList, arguments), this._distributeParent();
        },
        _distributeParent: function() {
            t || this.domApi._maybeDistributeParent();
        },
        contains: function() {
            return this.node.classList.contains.apply(this.node.classList, arguments);
        }
    };
}(), function() {
    "use strict";
    var e = Polymer.DomApi.ctor, t = Polymer.Settings;
    if (e.EffectiveNodesObserver = function(e) {
        this.domApi = e, this.node = this.domApi.node, this._listeners = [];
    }, e.EffectiveNodesObserver.prototype = {
        addListener: function(e) {
            this._isSetup || (this._setup(), this._isSetup = !0);
            var t = {
                fn: e,
                _nodes: []
            };
            return this._listeners.push(t), this._scheduleNotify(), t;
        },
        removeListener: function(e) {
            var t = this._listeners.indexOf(e);
            t >= 0 && (this._listeners.splice(t, 1), e._nodes = []), this._hasListeners() || (this._cleanup(), 
            this._isSetup = !1);
        },
        _setup: function() {
            this._observeContentElements(this.domApi.childNodes);
        },
        _cleanup: function() {
            this._unobserveContentElements(this.domApi.childNodes);
        },
        _hasListeners: function() {
            return Boolean(this._listeners.length);
        },
        _scheduleNotify: function() {
            this._debouncer && this._debouncer.stop(), this._debouncer = Polymer.Debounce(this._debouncer, this._notify), 
            this._debouncer.context = this, Polymer.dom.addDebouncer(this._debouncer);
        },
        notify: function() {
            this._hasListeners() && this._scheduleNotify();
        },
        _notify: function() {
            this._beforeCallListeners(), this._callListeners();
        },
        _beforeCallListeners: function() {
            this._updateContentElements();
        },
        _updateContentElements: function() {
            this._observeContentElements(this.domApi.childNodes);
        },
        _observeContentElements: function(e) {
            for (var t, i = 0; i < e.length && (t = e[i]); i++) this._isContent(t) && (t.__observeNodesMap = t.__observeNodesMap || new WeakMap(), 
            t.__observeNodesMap.has(this) || t.__observeNodesMap.set(this, this._observeContent(t)));
        },
        _observeContent: function(e) {
            var t = this, i = Polymer.dom(e).observeNodes(function() {
                t._scheduleNotify();
            });
            return i._avoidChangeCalculation = !0, i;
        },
        _unobserveContentElements: function(e) {
            for (var t, i, n = 0; n < e.length && (t = e[n]); n++) this._isContent(t) && (i = t.__observeNodesMap.get(this)) && (Polymer.dom(t).unobserveNodes(i), 
            t.__observeNodesMap.delete(this));
        },
        _isContent: function(e) {
            return "content" === e.localName;
        },
        _callListeners: function() {
            for (var e, t = this._listeners, i = this._getEffectiveNodes(), n = 0; n < t.length && (e = t[n]); n++) {
                var o = this._generateListenerInfo(e, i);
                (o || e._alwaysNotify) && this._callListener(e, o);
            }
        },
        _getEffectiveNodes: function() {
            return this.domApi.getEffectiveChildNodes();
        },
        _generateListenerInfo: function(e, t) {
            if (e._avoidChangeCalculation) return !0;
            for (var i, n = e._nodes, o = {
                target: this.node,
                addedNodes: [],
                removedNodes: []
            }, r = Polymer.ArraySplice.calculateSplices(t, n), s = 0; s < r.length && (i = r[s]); s++) for (var a, l = 0; l < i.removed.length && (a = i.removed[l]); l++) o.removedNodes.push(a);
            for (s = 0, i; s < r.length && (i = r[s]); s++) for (l = i.index; l < i.index + i.addedCount; l++) o.addedNodes.push(t[l]);
            return e._nodes = t, o.addedNodes.length || o.removedNodes.length ? o : void 0;
        },
        _callListener: function(e, t) {
            return e.fn.call(this.node, t);
        },
        enableShadowAttributeTracking: function() {}
    }, t.useShadow) {
        var i = e.EffectiveNodesObserver.prototype._setup, n = e.EffectiveNodesObserver.prototype._cleanup;
        Polymer.Base.mixin(e.EffectiveNodesObserver.prototype, {
            _setup: function() {
                if (!this._observer) {
                    var e = this;
                    this._mutationHandler = function(t) {
                        t && t.length && e._scheduleNotify();
                    }, this._observer = new MutationObserver(this._mutationHandler), this._boundFlush = function() {
                        e._flush();
                    }, Polymer.dom.addStaticFlush(this._boundFlush), this._observer.observe(this.node, {
                        childList: !0
                    });
                }
                i.call(this);
            },
            _cleanup: function() {
                this._observer.disconnect(), this._observer = null, this._mutationHandler = null, 
                Polymer.dom.removeStaticFlush(this._boundFlush), n.call(this);
            },
            _flush: function() {
                this._observer && this._mutationHandler(this._observer.takeRecords());
            },
            enableShadowAttributeTracking: function() {
                if (this._observer) {
                    this._makeContentListenersAlwaysNotify(), this._observer.disconnect(), this._observer.observe(this.node, {
                        childList: !0,
                        attributes: !0,
                        subtree: !0
                    });
                    var e = this.domApi.getOwnerRoot(), t = e && e.host;
                    t && Polymer.dom(t).observer && Polymer.dom(t).observer.enableShadowAttributeTracking();
                }
            },
            _makeContentListenersAlwaysNotify: function() {
                for (var e, t = 0; t < this._listeners.length; t++) (e = this._listeners[t])._alwaysNotify = e._isContentListener;
            }
        });
    }
}(), function() {
    "use strict";
    var e = Polymer.DomApi.ctor, t = Polymer.Settings;
    e.DistributedNodesObserver = function(t) {
        e.EffectiveNodesObserver.call(this, t);
    }, e.DistributedNodesObserver.prototype = Object.create(e.EffectiveNodesObserver.prototype), 
    Polymer.Base.mixin(e.DistributedNodesObserver.prototype, {
        _setup: function() {},
        _cleanup: function() {},
        _beforeCallListeners: function() {},
        _getEffectiveNodes: function() {
            return this.domApi.getDistributedNodes();
        }
    }), t.useShadow && Polymer.Base.mixin(e.DistributedNodesObserver.prototype, {
        _setup: function() {
            if (!this._observer) {
                var e = this.domApi.getOwnerRoot(), t = e && e.host;
                if (t) {
                    var i = this;
                    this._observer = Polymer.dom(t).observeNodes(function() {
                        i._scheduleNotify();
                    }), this._observer._isContentListener = !0, this._hasAttrSelect() && Polymer.dom(t).observer.enableShadowAttributeTracking();
                }
            }
        },
        _hasAttrSelect: function() {
            var e = this.node.getAttribute("select");
            return e && e.match(/[[.]+/);
        },
        _cleanup: function() {
            var e = this.domApi.getOwnerRoot(), t = e && e.host;
            t && Polymer.dom(t).unobserveNodes(this._observer), this._observer = null;
        }
    });
}(), function() {
    function e(e, t) {
        t._distributedNodes.push(e);
        var i = e._destinationInsertionPoints;
        i ? i.push(t) : e._destinationInsertionPoints = [ t ];
    }
    function t(e) {
        var t = e._distributedNodes;
        if (t) for (var i = 0; i < t.length; i++) {
            var n = t[i]._destinationInsertionPoints;
            n && n.splice(n.indexOf(e) + 1, n.length);
        }
    }
    function i(e, t) {
        var i = u.Logical.getParentNode(e);
        i && i.shadyRoot && c.hasInsertionPoint(i.shadyRoot) && i.shadyRoot._distributionClean && (i.shadyRoot._distributionClean = !1, 
        t.shadyRoot._dirtyRoots.push(i));
    }
    function n(e, t) {
        var i = t._destinationInsertionPoints;
        return i && i[i.length - 1] === e;
    }
    function o(e) {
        return "content" == e.localName;
    }
    function r(e) {
        for (;e && s(e); ) e = e.domHost;
        return e;
    }
    function s(e) {
        for (var t, i = u.Logical.getChildNodes(e), n = 0; n < i.length; n++) if ((t = i[n]).localName && "content" === t.localName) return e.domHost;
    }
    function a(e) {
        for (var t, i = 0; i < e._insertionPoints.length; i++) t = e._insertionPoints[i], 
        c.hasApi(t) && Polymer.dom(t).notifyObserver();
    }
    function l(e) {
        c.hasApi(e) && Polymer.dom(e).notifyObserver();
    }
    function h(e) {
        if (f && e) for (var t = 0; t < e.length; t++) CustomElements.upgrade(e[t]);
    }
    var c = Polymer.DomApi, u = Polymer.TreeApi;
    Polymer.Base._addFeature({
        _prepShady: function() {
            this._useContent = this._useContent || Boolean(this._template);
        },
        _setupShady: function() {
            this.shadyRoot = null, this.__domApi || (this.__domApi = null), this.__dom || (this.__dom = null), 
            this._ownerShadyRoot || (this._ownerShadyRoot = void 0);
        },
        _poolContent: function() {
            this._useContent && u.Logical.saveChildNodes(this);
        },
        _setupRoot: function() {
            this._useContent && (this._createLocalRoot(), this.dataHost || h(u.Logical.getChildNodes(this)));
        },
        _createLocalRoot: function() {
            this.shadyRoot = this.root, this.shadyRoot._distributionClean = !1, this.shadyRoot._hasDistributed = !1, 
            this.shadyRoot._isShadyRoot = !0, this.shadyRoot._dirtyRoots = [];
            var e = this.shadyRoot._insertionPoints = !this._notes || this._notes._hasContent ? this.shadyRoot.querySelectorAll("content") : [];
            u.Logical.saveChildNodes(this.shadyRoot);
            for (var t, i = 0; i < e.length; i++) t = e[i], u.Logical.saveChildNodes(t), u.Logical.saveChildNodes(t.parentNode);
            this.shadyRoot.host = this;
        },
        distributeContent: function(e) {
            if (this.shadyRoot) {
                this.shadyRoot._invalidInsertionPoints = this.shadyRoot._invalidInsertionPoints || e;
                var t = r(this);
                Polymer.dom(this)._lazyDistribute(t);
            }
        },
        _distributeContent: function() {
            this._useContent && !this.shadyRoot._distributionClean && (this.shadyRoot._invalidInsertionPoints && (Polymer.dom(this)._updateInsertionPoints(this), 
            this.shadyRoot._invalidInsertionPoints = !1), this._beginDistribute(), this._distributeDirtyRoots(), 
            this._finishDistribute());
        },
        _beginDistribute: function() {
            this._useContent && c.hasInsertionPoint(this.shadyRoot) && (this._resetDistribution(), 
            this._distributePool(this.shadyRoot, this._collectPool()));
        },
        _distributeDirtyRoots: function() {
            for (var e, t = this.shadyRoot._dirtyRoots, i = 0, n = t.length; i < n && (e = t[i]); i++) e._distributeContent();
            this.shadyRoot._dirtyRoots = [];
        },
        _finishDistribute: function() {
            if (this._useContent) {
                if (this.shadyRoot._distributionClean = !0, c.hasInsertionPoint(this.shadyRoot)) this._composeTree(), 
                a(this.shadyRoot); else if (this.shadyRoot._hasDistributed) {
                    var e = this._composeNode(this);
                    this._updateChildNodes(this, e);
                } else u.Composed.clearChildNodes(this), this.appendChild(this.shadyRoot);
                this.shadyRoot._hasDistributed || l(this), this.shadyRoot._hasDistributed = !0;
            }
        },
        elementMatches: function(e, t) {
            return t = t || this, c.matchesSelector.call(t, e);
        },
        _resetDistribution: function() {
            for (var e = u.Logical.getChildNodes(this), i = 0; i < e.length; i++) {
                var n = e[i];
                n._destinationInsertionPoints && (n._destinationInsertionPoints = void 0), o(n) && t(n);
            }
            for (var r = this.shadyRoot._insertionPoints, s = 0; s < r.length; s++) r[s]._distributedNodes = [];
        },
        _collectPool: function() {
            for (var e = [], t = u.Logical.getChildNodes(this), i = 0; i < t.length; i++) {
                var n = t[i];
                o(n) ? e.push.apply(e, n._distributedNodes) : e.push(n);
            }
            return e;
        },
        _distributePool: function(e, t) {
            for (var n, o = e._insertionPoints, r = 0, s = o.length; r < s && (n = o[r]); r++) this._distributeInsertionPoint(n, t), 
            i(n, this);
        },
        _distributeInsertionPoint: function(t, i) {
            for (var n, o = !1, r = 0, s = i.length; r < s; r++) (n = i[r]) && this._matchesContentSelect(n, t) && (e(n, t), 
            i[r] = void 0, o = !0);
            if (!o) for (var a = u.Logical.getChildNodes(t), l = 0; l < a.length; l++) e(a[l], t);
        },
        _composeTree: function() {
            this._updateChildNodes(this, this._composeNode(this));
            for (var e, t, i = this.shadyRoot._insertionPoints, n = 0, o = i.length; n < o && (e = i[n]); n++) (t = u.Logical.getParentNode(e))._useContent || t === this || t === this.shadyRoot || this._updateChildNodes(t, this._composeNode(t));
        },
        _composeNode: function(e) {
            for (var t = [], i = u.Logical.getChildNodes(e.shadyRoot || e), r = 0; r < i.length; r++) {
                var s = i[r];
                if (o(s)) for (var a = s._distributedNodes, l = 0; l < a.length; l++) {
                    var h = a[l];
                    n(s, h) && t.push(h);
                } else t.push(s);
            }
            return t;
        },
        _updateChildNodes: function(e, t) {
            for (var i = u.Composed.getChildNodes(e), n = Polymer.ArraySplice.calculateSplices(t, i), o = 0, r = 0; o < n.length && (l = n[o]); o++) {
                for (var s, a = 0; a < l.removed.length && (s = l.removed[a]); a++) u.Composed.getParentNode(s) === e && u.Composed.removeChild(e, s), 
                i.splice(l.index + r, 1);
                r -= l.addedCount;
            }
            for (var l, h, o = 0; o < n.length && (l = n[o]); o++) for (h = i[l.index], a = l.index, 
            s; a < l.index + l.addedCount; a++) s = t[a], u.Composed.insertBefore(e, s, h), 
            i.splice(a, 0, s);
        },
        _matchesContentSelect: function(e, t) {
            var i = t.getAttribute("select");
            if (!i) return !0;
            if (!(i = i.trim())) return !0;
            if (!(e instanceof Element)) return !1;
            return !!/^(:not\()?[*.#[a-zA-Z_|]/.test(i) && this.elementMatches(i, e);
        },
        _elementAdd: function() {},
        _elementRemove: function() {}
    });
    var d = {
        get: function() {
            var e = Polymer.dom(this).getOwnerRoot();
            return e && e.host;
        },
        configurable: !0
    };
    Object.defineProperty(Polymer.Base, "domHost", d), Polymer.BaseDescriptors.domHost = d;
    var f = window.CustomElements && !CustomElements.useNative;
}(), Polymer.Settings.useShadow && Polymer.Base._addFeature({
    _poolContent: function() {},
    _beginDistribute: function() {},
    distributeContent: function() {},
    _distributeContent: function() {},
    _finishDistribute: function() {},
    _createLocalRoot: function() {
        this.createShadowRoot(), this.shadowRoot.appendChild(this.root), this.root = this.shadowRoot;
    }
}), Polymer.Async = {
    _currVal: 0,
    _lastVal: 0,
    _callbacks: [],
    _twiddleContent: 0,
    _twiddle: document.createTextNode(""),
    run: function(e, t) {
        return t > 0 ? ~setTimeout(e, t) : (this._twiddle.textContent = this._twiddleContent++, 
        this._callbacks.push(e), this._currVal++);
    },
    cancel: function(e) {
        if (e < 0) clearTimeout(~e); else {
            var t = e - this._lastVal;
            if (t >= 0) {
                if (!this._callbacks[t]) throw "invalid async handle: " + e;
                this._callbacks[t] = null;
            }
        }
    },
    _atEndOfMicrotask: function() {
        for (var e = this._callbacks.length, t = 0; t < e; t++) {
            var i = this._callbacks[t];
            if (i) try {
                i();
            } catch (e) {
                throw t++, this._callbacks.splice(0, t), this._lastVal += t, this._twiddle.textContent = this._twiddleContent++, 
                e;
            }
        }
        this._callbacks.splice(0, e), this._lastVal += e;
    }
}, new window.MutationObserver(function() {
    Polymer.Async._atEndOfMicrotask();
}).observe(Polymer.Async._twiddle, {
    characterData: !0
}), Polymer.Debounce = function() {
    var e = Polymer.Async, t = function(e) {
        this.context = e;
        var t = this;
        this.boundComplete = function() {
            t.complete();
        };
    };
    return t.prototype = {
        go: function(t, i) {
            var n;
            this.finish = function() {
                e.cancel(n);
            }, n = e.run(this.boundComplete, i), this.callback = t;
        },
        stop: function() {
            this.finish && (this.finish(), this.finish = null, this.callback = null);
        },
        complete: function() {
            if (this.finish) {
                var e = this.callback;
                this.stop(), e.call(this.context);
            }
        }
    }, function(e, i, n) {
        return e ? e.stop() : e = new t(this), e.go(i, n), e;
    };
}(), Polymer.Base._addFeature({
    _setupDebouncers: function() {
        this._debouncers = {};
    },
    debounce: function(e, t, i) {
        return this._debouncers[e] = Polymer.Debounce.call(this, this._debouncers[e], t, i);
    },
    isDebouncerActive: function(e) {
        var t = this._debouncers[e];
        return !(!t || !t.finish);
    },
    flushDebouncer: function(e) {
        var t = this._debouncers[e];
        t && t.complete();
    },
    cancelDebouncer: function(e) {
        var t = this._debouncers[e];
        t && t.stop();
    }
}), Polymer.DomModule = document.createElement("dom-module"), Polymer.Base._addFeature({
    _registerFeatures: function() {
        this._prepIs(), this._prepBehaviors(), this._prepConstructor(), this._prepTemplate(), 
        this._prepShady(), this._prepPropertyInfo();
    },
    _prepBehavior: function(e) {
        this._addHostAttributes(e.hostAttributes);
    },
    _initFeatures: function() {
        this._registerHost(), this._template && (this._poolContent(), this._beginHosting(), 
        this._stampTemplate(), this._endHosting()), this._marshalHostAttributes(), this._setupDebouncers(), 
        this._marshalBehaviors(), this._tryReady();
    },
    _marshalBehavior: function(e) {}
}), function() {
    Polymer.nar = [];
    var e = Polymer.Settings.disableUpgradeEnabled;
    Polymer.Annotations = {
        parseAnnotations: function(e, t) {
            var i = [], n = e._content || e.content;
            return this._parseNodeAnnotations(n, i, t || e.hasAttribute("strip-whitespace")), 
            i;
        },
        _parseNodeAnnotations: function(e, t, i) {
            return e.nodeType === Node.TEXT_NODE ? this._parseTextNodeAnnotation(e, t) : this._parseElementAnnotations(e, t, i);
        },
        _bindingRegex: new RegExp("(\\[\\[|{{)\\s*(?:(!)\\s*)?((?:[a-zA-Z_$][\\w.:$\\-*]*)\\s*(?:\\(\\s*(?:(?:(?:(?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\"))\\s*)(?:,\\s*(?:(?:[a-zA-Z_$][\\w.:$\\-*]*)|(?:[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?)|(?:(?:'(?:[^'\\\\]|\\\\.)*')|(?:\"(?:[^\"\\\\]|\\\\.)*\"))\\s*))*)?)\\)\\s*)?)(?:]]|}})", "g"),
        _parseBindings: function(e) {
            for (var t, i = this._bindingRegex, n = [], o = 0; null !== (t = i.exec(e)); ) {
                t.index > o && n.push({
                    literal: e.slice(o, t.index)
                });
                var r, s, a, l = t[1][0], h = Boolean(t[2]), c = t[3].trim();
                "{" == l && (a = c.indexOf("::")) > 0 && (s = c.substring(a + 2), c = c.substring(0, a), 
                r = !0), n.push({
                    compoundIndex: n.length,
                    value: c,
                    mode: l,
                    negate: h,
                    event: s,
                    customEvent: r
                }), o = i.lastIndex;
            }
            if (o && o < e.length) {
                var u = e.substring(o);
                u && n.push({
                    literal: u
                });
            }
            if (n.length) return n;
        },
        _literalFromParts: function(e) {
            for (var t = "", i = 0; i < e.length; i++) t += e[i].literal || "";
            return t;
        },
        _parseTextNodeAnnotation: function(e, t) {
            var i = this._parseBindings(e.textContent);
            if (i) {
                e.textContent = this._literalFromParts(i) || " ";
                var n = {
                    bindings: [ {
                        kind: "text",
                        name: "textContent",
                        parts: i,
                        isCompound: 1 !== i.length
                    } ]
                };
                return t.push(n), n;
            }
        },
        _parseElementAnnotations: function(e, t, i) {
            var n = {
                bindings: [],
                events: []
            };
            return "content" === e.localName && (t._hasContent = !0), this._parseChildNodesAnnotations(e, n, t, i), 
            e.attributes && (this._parseNodeAttributeAnnotations(e, n, t), this.prepElement && this.prepElement(e)), 
            (n.bindings.length || n.events.length || n.id) && t.push(n), n;
        },
        _parseChildNodesAnnotations: function(e, t, i, n) {
            if (e.firstChild) for (var o = e.firstChild, r = 0; o; ) {
                var s = o.nextSibling;
                if ("template" !== o.localName || o.hasAttribute("preserve-content") || this._parseTemplate(o, r, i, t, n), 
                "slot" == o.localName && (o = this._replaceSlotWithContent(o)), o.nodeType === Node.TEXT_NODE) {
                    for (var a = s; a && a.nodeType === Node.TEXT_NODE; ) o.textContent += a.textContent, 
                    s = a.nextSibling, e.removeChild(a), a = s;
                    n && !o.textContent.trim() && (e.removeChild(o), r--);
                }
                if (o.parentNode) {
                    var l = this._parseNodeAnnotations(o, i, n);
                    l && (l.parent = t, l.index = r);
                }
                o = s, r++;
            }
        },
        _replaceSlotWithContent: function(e) {
            for (var t = e.ownerDocument.createElement("content"); e.firstChild; ) t.appendChild(e.firstChild);
            for (var i = e.attributes, n = 0; n < i.length; n++) {
                var o = i[n];
                t.setAttribute(o.name, o.value);
            }
            var r = e.getAttribute("name");
            return r && t.setAttribute("select", "[slot='" + r + "']"), e.parentNode.replaceChild(t, e), 
            t;
        },
        _parseTemplate: function(e, t, i, n, o) {
            var r = document.createDocumentFragment();
            r._notes = this.parseAnnotations(e, o), r.appendChild(e.content), i.push({
                bindings: Polymer.nar,
                events: Polymer.nar,
                templateContent: r,
                parent: n,
                index: t
            });
        },
        _parseNodeAttributeAnnotations: function(e, t) {
            for (var i, n = Array.prototype.slice.call(e.attributes), o = n.length - 1; i = n[o]; o--) {
                var r, s = i.name, a = i.value;
                "on-" === s.slice(0, 3) ? (e.removeAttribute(s), t.events.push({
                    name: s.slice(3),
                    value: a
                })) : (r = this._parseNodeAttributeAnnotation(e, s, a)) ? t.bindings.push(r) : "id" === s && (t.id = a);
            }
        },
        _parseNodeAttributeAnnotation: function(t, i, n) {
            var o = this._parseBindings(n);
            if (o) {
                var r = i, s = "property";
                "$" == i[i.length - 1] && (i = i.slice(0, -1), s = "attribute");
                var a = this._literalFromParts(o);
                a && "attribute" == s && t.setAttribute(i, a), "input" === t.localName && "value" === r && t.setAttribute(r, ""), 
                e && "disable-upgrade$" === r && t.setAttribute(i, ""), t.removeAttribute(r);
                var l = Polymer.CaseMap.dashToCamelCase(i);
                return "property" === s && (i = l), {
                    kind: s,
                    name: i,
                    propertyName: l,
                    parts: o,
                    literal: a,
                    isCompound: 1 !== o.length
                };
            }
        },
        findAnnotatedNode: function(e, t) {
            var i = t.parent && Polymer.Annotations.findAnnotatedNode(e, t.parent);
            if (!i) return e;
            for (var n = i.firstChild, o = 0; n; n = n.nextSibling) if (t.index === o++) return n;
        }
    };
}(), Polymer.Path = {
    root: function(e) {
        var t = e.indexOf(".");
        return -1 === t ? e : e.slice(0, t);
    },
    isDeep: function(e) {
        return -1 !== e.indexOf(".");
    },
    isAncestor: function(e, t) {
        return 0 === e.indexOf(t + ".");
    },
    isDescendant: function(e, t) {
        return 0 === t.indexOf(e + ".");
    },
    translate: function(e, t, i) {
        return t + i.slice(e.length);
    },
    matches: function(e, t, i) {
        return e === i || this.isAncestor(e, i) || Boolean(t) && this.isDescendant(e, i);
    }
}, Polymer.Base._addFeature({
    _prepAnnotations: function() {
        if (this._template) {
            var e = this;
            Polymer.Annotations.prepElement = function(t) {
                e._prepElement(t);
            }, this._template._content && this._template._content._notes ? this._notes = this._template._content._notes : (this._notes = Polymer.Annotations.parseAnnotations(this._template), 
            this._processAnnotations(this._notes)), Polymer.Annotations.prepElement = null;
        } else this._notes = [];
    },
    _processAnnotations: function(e) {
        for (var t = 0; t < e.length; t++) {
            for (var i = e[t], n = 0; n < i.bindings.length; n++) for (var o = i.bindings[n], r = 0; r < o.parts.length; r++) {
                var s = o.parts[r];
                if (!s.literal) {
                    var a = this._parseMethod(s.value);
                    a ? s.signature = a : s.model = Polymer.Path.root(s.value);
                }
            }
            if (i.templateContent) {
                this._processAnnotations(i.templateContent._notes);
                var l = i.templateContent._parentProps = this._discoverTemplateParentProps(i.templateContent._notes), h = [];
                for (var c in l) {
                    var u = "_parent_" + c;
                    h.push({
                        index: i.index,
                        kind: "property",
                        name: u,
                        propertyName: u,
                        parts: [ {
                            mode: "{",
                            model: c,
                            value: c
                        } ]
                    });
                }
                i.bindings = i.bindings.concat(h);
            }
        }
    },
    _discoverTemplateParentProps: function(e) {
        for (var t, i = {}, n = 0; n < e.length && (t = e[n]); n++) {
            for (var o, r = 0, s = t.bindings; r < s.length && (o = s[r]); r++) for (var a, l = 0, h = o.parts; l < h.length && (a = h[l]); l++) if (a.signature) {
                for (var c = a.signature.args, u = 0; u < c.length; u++) {
                    var d = c[u].model;
                    d && (i[d] = !0);
                }
                a.signature.dynamicFn && (i[a.signature.method] = !0);
            } else a.model && (i[a.model] = !0);
            if (t.templateContent) {
                var f = t.templateContent._parentProps;
                Polymer.Base.mixin(i, f);
            }
        }
        return i;
    },
    _prepElement: function(e) {
        Polymer.ResolveUrl.resolveAttrs(e, this._template.ownerDocument);
    },
    _findAnnotatedNode: Polymer.Annotations.findAnnotatedNode,
    _marshalAnnotationReferences: function() {
        this._template && (this._marshalIdNodes(), this._marshalAnnotatedNodes(), this._marshalAnnotatedListeners());
    },
    _configureAnnotationReferences: function() {
        for (var e = this._notes, t = this._nodes, i = 0; i < e.length; i++) {
            var n = e[i], o = t[i];
            this._configureTemplateContent(n, o), this._configureCompoundBindings(n, o);
        }
    },
    _configureTemplateContent: function(e, t) {
        e.templateContent && (t._content = e.templateContent);
    },
    _configureCompoundBindings: function(e, t) {
        for (var i = e.bindings, n = 0; n < i.length; n++) {
            var o = i[n];
            if (o.isCompound) {
                for (var r = t.__compoundStorage__ || (t.__compoundStorage__ = {}), s = o.parts, a = new Array(s.length), l = 0; l < s.length; l++) a[l] = s[l].literal;
                var h = o.name;
                r[h] = a, o.literal && "property" == o.kind && (t._configValue ? t._configValue(h, o.literal) : t[h] = o.literal);
            }
        }
    },
    _marshalIdNodes: function() {
        this.$ = {};
        for (var e, t = 0, i = this._notes.length; t < i && (e = this._notes[t]); t++) e.id && (this.$[e.id] = this._findAnnotatedNode(this.root, e));
    },
    _marshalAnnotatedNodes: function() {
        if (this._notes && this._notes.length) {
            for (var e = new Array(this._notes.length), t = 0; t < this._notes.length; t++) e[t] = this._findAnnotatedNode(this.root, this._notes[t]);
            this._nodes = e;
        }
    },
    _marshalAnnotatedListeners: function() {
        for (var e, t = 0, i = this._notes.length; t < i && (e = this._notes[t]); t++) if (e.events && e.events.length) for (var n, o = this._findAnnotatedNode(this.root, e), r = 0, s = e.events; r < s.length && (n = s[r]); r++) this.listen(o, n.name, n.value);
    }
}), Polymer.Base._addFeature({
    listeners: {},
    _listenListeners: function(e) {
        var t, i, n;
        for (n in e) n.indexOf(".") < 0 ? (t = this, i = n) : (i = n.split("."), t = this.$[i[0]], 
        i = i[1]), this.listen(t, i, e[n]);
    },
    listen: function(e, t, i) {
        var n = this._recallEventHandler(this, t, e, i);
        n || (n = this._createEventHandler(e, t, i)), n._listening || (this._listen(e, t, n), 
        n._listening = !0);
    },
    _boundListenerKey: function(e, t) {
        return e + ":" + t;
    },
    _recordEventHandler: function(e, t, i, n, o) {
        var r = e.__boundListeners;
        r || (r = e.__boundListeners = new WeakMap());
        var s = r.get(i);
        s || (s = {}, Polymer.Settings.isIE && i == window || r.set(i, s)), s[this._boundListenerKey(t, n)] = o;
    },
    _recallEventHandler: function(e, t, i, n) {
        var o = e.__boundListeners;
        if (o) {
            var r = o.get(i);
            if (r) return r[this._boundListenerKey(t, n)];
        }
    },
    _createEventHandler: function(e, t, i) {
        var n = this, o = function(e) {
            n[i] ? n[i](e, e.detail) : n._warn(n._logf("_createEventHandler", "listener method `" + i + "` not defined"));
        };
        return o._listening = !1, this._recordEventHandler(n, t, e, i, o), o;
    },
    unlisten: function(e, t, i) {
        var n = this._recallEventHandler(this, t, e, i);
        n && (this._unlisten(e, t, n), n._listening = !1);
    },
    _listen: function(e, t, i) {
        e.addEventListener(t, i);
    },
    _unlisten: function(e, t, i) {
        e.removeEventListener(t, i);
    }
}), function() {
    "use strict";
    function e(e) {
        return f.indexOf(e) > -1;
    }
    function t(t) {
        if (!e(t) && "touchend" !== t) return h && _ && Polymer.Settings.passiveTouchGestures ? {
            passive: !0
        } : void 0;
    }
    function i(e) {
        for (var t, i = g ? [ "click" ] : f, n = 0; n < i.length; n++) t = i[n], e ? document.addEventListener(t, y, !0) : document.removeEventListener(t, y, !0);
    }
    function n(t) {
        var i = t.type;
        if (!e(i)) return !1;
        if ("mousemove" === i) {
            var n = void 0 === t.buttons ? 1 : t.buttons;
            return t instanceof window.MouseEvent && !m && (n = p[t.which] || 0), Boolean(1 & n);
        }
        return 0 === (void 0 === t.button ? 0 : t.button);
    }
    function o(e) {
        if ("click" === e.type) {
            if (0 === e.detail) return !0;
            var t = b.findOriginalTarget(e).getBoundingClientRect(), i = e.pageX, n = e.pageY;
            return !(i >= t.left && i <= t.right && n >= t.top && n <= t.bottom);
        }
        return !1;
    }
    function r(e) {
        for (var t, i = Polymer.dom(e).path, n = "auto", o = 0; o < i.length; o++) if ((t = i[o])[u]) {
            n = t[u];
            break;
        }
        return n;
    }
    function s(e, t, i) {
        e.movefn = t, e.upfn = i, document.addEventListener("mousemove", t), document.addEventListener("mouseup", i);
    }
    function a(e) {
        document.removeEventListener("mousemove", e.movefn), document.removeEventListener("mouseup", e.upfn), 
        e.movefn = null, e.upfn = null;
    }
    var l = Polymer.DomApi.wrap, h = "string" == typeof document.head.style.touchAction, c = "__polymerGesturesHandled", u = "__polymerGesturesTouchAction", d = 2500, f = [ "mousedown", "mousemove", "mouseup", "click" ], p = [ 0, 1, 4, 2 ], m = function() {
        try {
            return 1 === new MouseEvent("test", {
                buttons: 1
            }).buttons;
        } catch (e) {
            return !1;
        }
    }(), _ = !1;
    !function() {
        try {
            var e = Object.defineProperty({}, "passive", {
                get: function() {
                    _ = !0;
                }
            });
            window.addEventListener("test", null, e), window.removeEventListener("test", null, e);
        } catch (e) {}
    }();
    var g = navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/), y = function(e) {
        var t = e.sourceCapabilities;
        if ((!t || t.firesTouchEvents) && (e[c] = {
            skip: !0
        }, "click" === e.type)) {
            for (var i = Polymer.dom(e).path, n = 0; n < i.length; n++) if (i[n] === v.mouse.target) return;
            e.preventDefault(), e.stopPropagation();
        }
    }, v = {
        mouse: {
            target: null,
            mouseIgnoreJob: null
        },
        touch: {
            x: 0,
            y: 0,
            id: -1,
            scrollDecided: !1
        }
    };
    document.addEventListener("touchend", function(e) {
        v.mouse.mouseIgnoreJob || i(!0), v.mouse.target = Polymer.dom(e).rootTarget, v.mouse.mouseIgnoreJob = Polymer.Debounce(v.mouse.mouseIgnoreJob, function() {
            i(), v.mouse.target = null, v.mouse.mouseIgnoreJob = null;
        }, d);
    }, !!_ && {
        passive: !0
    });
    var b = {
        gestures: {},
        recognizers: [],
        deepTargetFind: function(e, t) {
            for (var i = document.elementFromPoint(e, t), n = i; n && n.shadowRoot; ) (n = n.shadowRoot.elementFromPoint(e, t)) && (i = n);
            return i;
        },
        findOriginalTarget: function(e) {
            return e.path ? e.path[0] : e.target;
        },
        handleNative: function(e) {
            var t, i = e.type, n = l(e.currentTarget).__polymerGestures;
            if (n) {
                var o = n[i];
                if (o) {
                    if (!e[c] && (e[c] = {}, "touch" === i.slice(0, 5))) {
                        var r = e.changedTouches[0];
                        if ("touchstart" === i && 1 === e.touches.length && (v.touch.id = r.identifier), 
                        v.touch.id !== r.identifier) return;
                        h || "touchstart" !== i && "touchmove" !== i || b.handleTouchAction(e);
                    }
                    if (!(t = e[c]).skip) {
                        for (var s, a = b.recognizers, u = 0; u < a.length; u++) o[(s = a[u]).name] && !t[s.name] && s.flow && s.flow.start.indexOf(e.type) > -1 && s.reset && s.reset();
                        for (u = 0, s; u < a.length; u++) o[(s = a[u]).name] && !t[s.name] && (t[s.name] = !0, 
                        s[i](e));
                    }
                }
            }
        },
        handleTouchAction: function(e) {
            var t = e.changedTouches[0], i = e.type;
            if ("touchstart" === i) v.touch.x = t.clientX, v.touch.y = t.clientY, v.touch.scrollDecided = !1; else if ("touchmove" === i) {
                if (v.touch.scrollDecided) return;
                v.touch.scrollDecided = !0;
                var n = r(e), o = !1, s = Math.abs(v.touch.x - t.clientX), a = Math.abs(v.touch.y - t.clientY);
                e.cancelable && ("none" === n ? o = !0 : "pan-x" === n ? o = a > s : "pan-y" === n && (o = s > a)), 
                o ? e.preventDefault() : b.prevent("track");
            }
        },
        add: function(i, n, o) {
            i = l(i);
            var r = this.gestures[n], s = r.deps, a = r.name, h = i.__polymerGestures;
            h || (i.__polymerGestures = h = {});
            for (var c, u, d = 0; d < s.length; d++) c = s[d], g && e(c) && "click" !== c || ((u = h[c]) || (h[c] = u = {
                _count: 0
            }), 0 === u._count && i.addEventListener(c, this.handleNative, t(c)), u[a] = (u[a] || 0) + 1, 
            u._count = (u._count || 0) + 1);
            i.addEventListener(n, o), r.touchAction && this.setTouchAction(i, r.touchAction);
        },
        remove: function(e, i, n) {
            e = l(e);
            var o = this.gestures[i], r = o.deps, s = o.name, a = e.__polymerGestures;
            if (a) for (var h, c, u = 0; u < r.length; u++) (c = a[h = r[u]]) && c[s] && (c[s] = (c[s] || 1) - 1, 
            c._count = (c._count || 1) - 1, 0 === c._count && e.removeEventListener(h, this.handleNative, t(h)));
            e.removeEventListener(i, n);
        },
        register: function(e) {
            this.recognizers.push(e);
            for (var t = 0; t < e.emits.length; t++) this.gestures[e.emits[t]] = e;
        },
        findRecognizerByEvent: function(e) {
            for (var t, i = 0; i < this.recognizers.length; i++) {
                t = this.recognizers[i];
                for (var n = 0; n < t.emits.length; n++) if (t.emits[n] === e) return t;
            }
            return null;
        },
        setTouchAction: function(e, t) {
            h && (e.style.touchAction = t), e[u] = t;
        },
        fire: function(e, t, i) {
            if (Polymer.Base.fire(t, i, {
                node: e,
                bubbles: !0,
                cancelable: !0
            }).defaultPrevented) {
                var n = i.preventer || i.sourceEvent;
                n && n.preventDefault && n.preventDefault();
            }
        },
        prevent: function(e) {
            var t = this.findRecognizerByEvent(e);
            t.info && (t.info.prevent = !0);
        },
        resetMouseCanceller: function() {
            v.mouse.mouseIgnoreJob && v.mouse.mouseIgnoreJob.complete();
        }
    };
    b.register({
        name: "downup",
        deps: [ "mousedown", "touchstart", "touchend" ],
        flow: {
            start: [ "mousedown", "touchstart" ],
            end: [ "mouseup", "touchend" ]
        },
        emits: [ "down", "up" ],
        info: {
            movefn: null,
            upfn: null
        },
        reset: function() {
            a(this.info);
        },
        mousedown: function(e) {
            if (n(e)) {
                var t = b.findOriginalTarget(e), i = this;
                s(this.info, function(e) {
                    n(e) || (i.fire("up", t, e), a(i.info));
                }, function(e) {
                    n(e) && i.fire("up", t, e), a(i.info);
                }), this.fire("down", t, e);
            }
        },
        touchstart: function(e) {
            this.fire("down", b.findOriginalTarget(e), e.changedTouches[0], e);
        },
        touchend: function(e) {
            this.fire("up", b.findOriginalTarget(e), e.changedTouches[0], e);
        },
        fire: function(e, t, i, n) {
            b.fire(t, e, {
                x: i.clientX,
                y: i.clientY,
                sourceEvent: i,
                preventer: n,
                prevent: function(e) {
                    return b.prevent(e);
                }
            });
        }
    }), b.register({
        name: "track",
        touchAction: "none",
        deps: [ "mousedown", "touchstart", "touchmove", "touchend" ],
        flow: {
            start: [ "mousedown", "touchstart" ],
            end: [ "mouseup", "touchend" ]
        },
        emits: [ "track" ],
        info: {
            x: 0,
            y: 0,
            state: "start",
            started: !1,
            moves: [],
            addMove: function(e) {
                this.moves.length > 2 && this.moves.shift(), this.moves.push(e);
            },
            movefn: null,
            upfn: null,
            prevent: !1
        },
        reset: function() {
            this.info.state = "start", this.info.started = !1, this.info.moves = [], this.info.x = 0, 
            this.info.y = 0, this.info.prevent = !1, a(this.info);
        },
        hasMovedEnough: function(e, t) {
            if (this.info.prevent) return !1;
            if (this.info.started) return !0;
            var i = Math.abs(this.info.x - e), n = Math.abs(this.info.y - t);
            return i >= 5 || n >= 5;
        },
        mousedown: function(e) {
            if (n(e)) {
                var t = b.findOriginalTarget(e), i = this, o = function(e) {
                    var o = e.clientX, r = e.clientY;
                    i.hasMovedEnough(o, r) && (i.info.state = i.info.started ? "mouseup" === e.type ? "end" : "track" : "start", 
                    "start" === i.info.state && b.prevent("tap"), i.info.addMove({
                        x: o,
                        y: r
                    }), n(e) || (i.info.state = "end", a(i.info)), i.fire(t, e), i.info.started = !0);
                };
                s(this.info, o, function(e) {
                    i.info.started && o(e), a(i.info);
                }), this.info.x = e.clientX, this.info.y = e.clientY;
            }
        },
        touchstart: function(e) {
            var t = e.changedTouches[0];
            this.info.x = t.clientX, this.info.y = t.clientY;
        },
        touchmove: function(e) {
            var t = b.findOriginalTarget(e), i = e.changedTouches[0], n = i.clientX, o = i.clientY;
            this.hasMovedEnough(n, o) && ("start" === this.info.state && b.prevent("tap"), this.info.addMove({
                x: n,
                y: o
            }), this.fire(t, i), this.info.state = "track", this.info.started = !0);
        },
        touchend: function(e) {
            var t = b.findOriginalTarget(e), i = e.changedTouches[0];
            this.info.started && (this.info.state = "end", this.info.addMove({
                x: i.clientX,
                y: i.clientY
            }), this.fire(t, i, e));
        },
        fire: function(e, t, i) {
            var n, o = this.info.moves[this.info.moves.length - 2], r = this.info.moves[this.info.moves.length - 1], s = r.x - this.info.x, a = r.y - this.info.y, l = 0;
            return o && (n = r.x - o.x, l = r.y - o.y), b.fire(e, "track", {
                state: this.info.state,
                x: t.clientX,
                y: t.clientY,
                dx: s,
                dy: a,
                ddx: n,
                ddy: l,
                sourceEvent: t,
                preventer: i,
                hover: function() {
                    return b.deepTargetFind(t.clientX, t.clientY);
                }
            });
        }
    }), b.register({
        name: "tap",
        deps: [ "mousedown", "click", "touchstart", "touchend" ],
        flow: {
            start: [ "mousedown", "touchstart" ],
            end: [ "click", "touchend" ]
        },
        emits: [ "tap" ],
        info: {
            x: NaN,
            y: NaN,
            prevent: !1
        },
        reset: function() {
            this.info.x = NaN, this.info.y = NaN, this.info.prevent = !1;
        },
        save: function(e) {
            this.info.x = e.clientX, this.info.y = e.clientY;
        },
        mousedown: function(e) {
            n(e) && this.save(e);
        },
        click: function(e) {
            n(e) && this.forward(e);
        },
        touchstart: function(e) {
            this.save(e.changedTouches[0], e);
        },
        touchend: function(e) {
            this.forward(e.changedTouches[0], e);
        },
        forward: function(e, t) {
            var i = Math.abs(e.clientX - this.info.x), n = Math.abs(e.clientY - this.info.y), r = b.findOriginalTarget(e);
            (isNaN(i) || isNaN(n) || i <= 25 && n <= 25 || o(e)) && (this.info.prevent || b.fire(r, "tap", {
                x: e.clientX,
                y: e.clientY,
                sourceEvent: e,
                preventer: t
            }));
        }
    });
    var P = {
        x: "pan-x",
        y: "pan-y",
        none: "none",
        all: "auto"
    };
    Polymer.Base._addFeature({
        _setupGestures: function() {
            this.__polymerGestures = null;
        },
        _listen: function(e, t, i) {
            b.gestures[t] ? b.add(e, t, i) : e.addEventListener(t, i);
        },
        _unlisten: function(e, t, i) {
            b.gestures[t] ? b.remove(e, t, i) : e.removeEventListener(t, i);
        },
        setScrollDirection: function(e, t) {
            t = t || this, b.setTouchAction(t, P[e] || "auto");
        }
    }), Polymer.Gestures = b;
}(), function() {
    "use strict";
    if (Polymer.Base._addFeature({
        $$: function(e) {
            return Polymer.dom(this.root).querySelector(e);
        },
        toggleClass: function(e, t, i) {
            i = i || this, 1 == arguments.length && (t = !i.classList.contains(e)), t ? Polymer.dom(i).classList.add(e) : Polymer.dom(i).classList.remove(e);
        },
        toggleAttribute: function(e, t, i) {
            i = i || this, 1 == arguments.length && (t = !i.hasAttribute(e)), t ? Polymer.dom(i).setAttribute(e, "") : Polymer.dom(i).removeAttribute(e);
        },
        classFollows: function(e, t, i) {
            i && Polymer.dom(i).classList.remove(e), t && Polymer.dom(t).classList.add(e);
        },
        attributeFollows: function(e, t, i) {
            i && Polymer.dom(i).removeAttribute(e), t && Polymer.dom(t).setAttribute(e, "");
        },
        getEffectiveChildNodes: function() {
            return Polymer.dom(this).getEffectiveChildNodes();
        },
        getEffectiveChildren: function() {
            return Polymer.dom(this).getEffectiveChildNodes().filter(function(e) {
                return e.nodeType === Node.ELEMENT_NODE;
            });
        },
        getEffectiveTextContent: function() {
            for (var e, t = this.getEffectiveChildNodes(), i = [], n = 0; e = t[n]; n++) e.nodeType !== Node.COMMENT_NODE && i.push(Polymer.dom(e).textContent);
            return i.join("");
        },
        queryEffectiveChildren: function(e) {
            var t = Polymer.dom(this).queryDistributedElements(e);
            return t && t[0];
        },
        queryAllEffectiveChildren: function(e) {
            return Polymer.dom(this).queryDistributedElements(e);
        },
        getContentChildNodes: function(e) {
            var t = Polymer.dom(this.root).querySelector(e || "content");
            return t ? Polymer.dom(t).getDistributedNodes() : [];
        },
        getContentChildren: function(e) {
            return this.getContentChildNodes(e).filter(function(e) {
                return e.nodeType === Node.ELEMENT_NODE;
            });
        },
        fire: function(e, t, i) {
            var n = (i = i || Polymer.nob).node || this;
            t = null === t || void 0 === t ? {} : t;
            var o = void 0 === i.bubbles || i.bubbles, r = Boolean(i.cancelable), s = i._useCache, a = this._getEvent(e, o, r, s);
            return a.detail = t, s && (this.__eventCache[e] = null), n.dispatchEvent(a), s && (this.__eventCache[e] = a), 
            a;
        },
        __eventCache: {},
        _getEvent: function(e, t, i, n) {
            var o = n && this.__eventCache[e];
            return o && o.bubbles == t && o.cancelable == i || (o = new Event(e, {
                bubbles: Boolean(t),
                cancelable: i
            })), o;
        },
        async: function(e, t) {
            var i = this;
            return Polymer.Async.run(function() {
                e.call(i);
            }, t);
        },
        cancelAsync: function(e) {
            Polymer.Async.cancel(e);
        },
        arrayDelete: function(e, t) {
            var i;
            if (Array.isArray(e)) {
                if ((i = e.indexOf(t)) >= 0) return e.splice(i, 1);
            } else if ((i = this._get(e).indexOf(t)) >= 0) return this.splice(e, i, 1);
        },
        transform: function(e, t) {
            (t = t || this).style.webkitTransform = e, t.style.transform = e;
        },
        translate3d: function(e, t, i, n) {
            n = n || this, this.transform("translate3d(" + e + "," + t + "," + i + ")", n);
        },
        importHref: function(e, t, i, n) {
            var o = document.createElement("link");
            o.rel = "import", o.href = e;
            var r = Polymer.Base.importHref.imported = Polymer.Base.importHref.imported || {}, s = r[o.href], a = s || o, l = this, h = function(e) {
                return e.target.__firedLoad = !0, e.target.removeEventListener("load", h), e.target.removeEventListener("error", c), 
                t.call(l, e);
            }, c = function(e) {
                return e.target.__firedError = !0, e.target.removeEventListener("load", h), e.target.removeEventListener("error", c), 
                i.call(l, e);
            };
            return t && a.addEventListener("load", h), i && a.addEventListener("error", c), 
            s ? (s.__firedLoad && s.dispatchEvent(new Event("load")), s.__firedError && s.dispatchEvent(new Event("error"))) : (r[o.href] = o, 
            (n = Boolean(n)) && o.setAttribute("async", ""), document.head.appendChild(o)), 
            a;
        },
        create: function(e, t) {
            var i = document.createElement(e);
            if (t) for (var n in t) i[n] = t[n];
            return i;
        },
        isLightDescendant: function(e) {
            return this !== e && this.contains(e) && Polymer.dom(this).getOwnerRoot() === Polymer.dom(e).getOwnerRoot();
        },
        isLocalDescendant: function(e) {
            return this.root === Polymer.dom(e).getOwnerRoot();
        }
    }), !Polymer.Settings.useNativeCustomElements) {
        var e = Polymer.Base.importHref;
        Polymer.Base.importHref = function(t, i, n, o) {
            CustomElements.ready = !1;
            return e.call(this, t, function(e) {
                if (CustomElements.upgradeDocumentTree(document), CustomElements.ready = !0, i) return i.call(this, e);
            }, n, o);
        };
    }
}(), Polymer.Bind = {
    prepareModel: function(e) {
        Polymer.Base.mixin(e, this._modelApi);
    },
    _modelApi: {
        _notifyChange: function(e, t, i) {
            i = void 0 === i ? this[e] : i, t = t || Polymer.CaseMap.camelToDashCase(e) + "-changed", 
            this.fire(t, {
                value: i
            }, {
                bubbles: !1,
                cancelable: !1,
                _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
            });
        },
        _propertySetter: function(e, t, i, n) {
            var o = this.__data__[e];
            return o === t || o != o && t != t || (this.__data__[e] = t, "object" == typeof t && this._clearPath(e), 
            this._propertyChanged && this._propertyChanged(e, t, o), i && this._effectEffects(e, t, i, o, n)), 
            o;
        },
        __setProperty: function(e, t, i, n) {
            var o = (n = n || this)._propertyEffects && n._propertyEffects[e];
            o ? n._propertySetter(e, t, o, i) : n[e] !== t && (n[e] = t);
        },
        _effectEffects: function(e, t, i, n, o) {
            for (var r, s = 0, a = i.length; s < a && (r = i[s]); s++) r.fn.call(this, e, this[e], r.effect, n, o);
        },
        _clearPath: function(e) {
            for (var t in this.__data__) Polymer.Path.isDescendant(e, t) && (this.__data__[t] = void 0);
        }
    },
    ensurePropertyEffects: function(e, t) {
        e._propertyEffects || (e._propertyEffects = {});
        var i = e._propertyEffects[t];
        return i || (i = e._propertyEffects[t] = []), i;
    },
    addPropertyEffect: function(e, t, i, n) {
        var o = this.ensurePropertyEffects(e, t), r = {
            kind: i,
            effect: n,
            fn: Polymer.Bind["_" + i + "Effect"]
        };
        return o.push(r), r;
    },
    createBindings: function(e) {
        var t = e._propertyEffects;
        if (t) for (var i in t) {
            var n = t[i];
            n.sort(this._sortPropertyEffects), this._createAccessors(e, i, n);
        }
    },
    _sortPropertyEffects: function() {
        var e = {
            compute: 0,
            annotation: 1,
            annotatedComputation: 2,
            reflect: 3,
            notify: 4,
            observer: 5,
            complexObserver: 6,
            function: 7
        };
        return function(t, i) {
            return e[t.kind] - e[i.kind];
        };
    }(),
    _createAccessors: function(e, t, i) {
        var n = {
            get: function() {
                return this.__data__[t];
            }
        }, o = function(e) {
            this._propertySetter(t, e, i);
        }, r = e.getPropertyInfo && e.getPropertyInfo(t);
        r && r.readOnly ? r.computed || (e["_set" + this.upper(t)] = o) : n.set = o, Object.defineProperty(e, t, n);
    },
    upper: function(e) {
        return e[0].toUpperCase() + e.substring(1);
    },
    _addAnnotatedListener: function(e, t, i, n, o, r) {
        e._bindListeners || (e._bindListeners = []);
        var s = this._notedListenerFactory(i, n, Polymer.Path.isDeep(n), r), a = o || Polymer.CaseMap.camelToDashCase(i) + "-changed";
        e._bindListeners.push({
            index: t,
            property: i,
            path: n,
            changedFn: s,
            event: a
        });
    },
    _isEventBogus: function(e, t) {
        return e.path && e.path[0] !== t;
    },
    _notedListenerFactory: function(e, t, i, n) {
        return function(o, r, s) {
            if (s) {
                var a = Polymer.Path.translate(e, t, s);
                this._notifyPath(a, r);
            } else r = o[e], n && (r = !r), i ? this.__data__[t] != r && this.set(t, r) : this[t] = r;
        };
    },
    prepareInstance: function(e) {
        e.__data__ = Object.create(null);
    },
    setupBindListeners: function(e) {
        for (var t, i = e._bindListeners, n = 0, o = i.length; n < o && (t = i[n]); n++) {
            var r = e._nodes[t.index];
            this._addNotifyListener(r, e, t.event, t.changedFn);
        }
    },
    _addNotifyListener: function(e, t, i, n) {
        e.addEventListener(i, function(e) {
            return t._notifyListener(n, e);
        });
    }
}, Polymer.Base.mixin(Polymer.Bind, {
    _shouldAddListener: function(e) {
        return e.name && "attribute" != e.kind && "text" != e.kind && !e.isCompound && "{" === e.parts[0].mode;
    },
    _annotationEffect: function(e, t, i) {
        e != i.value && (t = this._get(i.value), this.__data__[i.value] = t), this._applyEffectValue(i, t);
    },
    _reflectEffect: function(e, t, i) {
        this.reflectPropertyToAttribute(e, i.attribute, t);
    },
    _notifyEffect: function(e, t, i, n, o) {
        o || this._notifyChange(e, i.event, t);
    },
    _functionEffect: function(e, t, i, n, o) {
        i.call(this, e, t, n, o);
    },
    _observerEffect: function(e, t, i, n) {
        var o = this[i.method];
        o ? o.call(this, t, n) : this._warn(this._logf("_observerEffect", "observer method `" + i.method + "` not defined"));
    },
    _complexObserverEffect: function(e, t, i) {
        var n = this[i.method];
        if (n) {
            var o = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            o && n.apply(this, o);
        } else i.dynamicFn || this._warn(this._logf("_complexObserverEffect", "observer method `" + i.method + "` not defined"));
    },
    _computeEffect: function(e, t, i) {
        var n = this[i.method];
        if (n) {
            var o = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            if (o) {
                var r = n.apply(this, o);
                this.__setProperty(i.name, r);
            }
        } else i.dynamicFn || this._warn(this._logf("_computeEffect", "compute method `" + i.method + "` not defined"));
    },
    _annotatedComputationEffect: function(e, t, i) {
        var n = this._rootDataHost || this, o = n[i.method];
        if (o) {
            var r = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            if (r) {
                var s = o.apply(n, r);
                this._applyEffectValue(i, s);
            }
        } else i.dynamicFn || n._warn(n._logf("_annotatedComputationEffect", "compute method `" + i.method + "` not defined"));
    },
    _marshalArgs: function(e, t, i, n) {
        for (var o = [], r = t.args, s = r.length > 1 || t.dynamicFn, a = 0, l = r.length; a < l; a++) {
            var h, c = r[a], u = c.name;
            if (c.literal ? h = c.value : i === u ? h = n : void 0 === (h = e[u]) && c.structured && (h = Polymer.Base._get(u, e)), 
            s && void 0 === h) return;
            if (c.wildcard) {
                var d = Polymer.Path.isAncestor(i, u);
                o[a] = {
                    path: d ? i : u,
                    value: d ? n : h,
                    base: h
                };
            } else o[a] = h;
        }
        return o;
    }
}), Polymer.Base._addFeature({
    _addPropertyEffect: function(e, t, i) {
        var n = Polymer.Bind.addPropertyEffect(this, e, t, i);
        n.pathFn = this["_" + n.kind + "PathEffect"];
    },
    _prepEffects: function() {
        Polymer.Bind.prepareModel(this), this._addAnnotationEffects(this._notes);
    },
    _prepBindings: function() {
        Polymer.Bind.createBindings(this);
    },
    _addPropertyEffects: function(e) {
        if (e) for (var t in e) {
            var i = e[t];
            if (i.observer && this._addObserverEffect(t, i.observer), i.computed && (i.readOnly = !0, 
            this._addComputedEffect(t, i.computed)), i.notify && this._addPropertyEffect(t, "notify", {
                event: Polymer.CaseMap.camelToDashCase(t) + "-changed"
            }), i.reflectToAttribute) {
                var n = Polymer.CaseMap.camelToDashCase(t);
                "-" === n[0] ? this._warn(this._logf("_addPropertyEffects", "Property " + t + " cannot be reflected to attribute " + n + ' because "-" is not a valid starting attribute name. Use a lowercase first letter for the property instead.')) : this._addPropertyEffect(t, "reflect", {
                    attribute: n
                });
            }
            i.readOnly && Polymer.Bind.ensurePropertyEffects(this, t);
        }
    },
    _addComputedEffect: function(e, t) {
        for (var i, n = this._parseMethod(t), o = n.dynamicFn, r = 0; r < n.args.length && (i = n.args[r]); r++) this._addPropertyEffect(i.model, "compute", {
            method: n.method,
            args: n.args,
            trigger: i,
            name: e,
            dynamicFn: o
        });
        o && this._addPropertyEffect(n.method, "compute", {
            method: n.method,
            args: n.args,
            trigger: null,
            name: e,
            dynamicFn: o
        });
    },
    _addObserverEffect: function(e, t) {
        this._addPropertyEffect(e, "observer", {
            method: t,
            property: e
        });
    },
    _addComplexObserverEffects: function(e) {
        if (e) for (var t, i = 0; i < e.length && (t = e[i]); i++) this._addComplexObserverEffect(t);
    },
    _addComplexObserverEffect: function(e) {
        var t = this._parseMethod(e);
        if (!t) throw new Error("Malformed observer expression '" + e + "'");
        for (var i, n = t.dynamicFn, o = 0; o < t.args.length && (i = t.args[o]); o++) this._addPropertyEffect(i.model, "complexObserver", {
            method: t.method,
            args: t.args,
            trigger: i,
            dynamicFn: n
        });
        n && this._addPropertyEffect(t.method, "complexObserver", {
            method: t.method,
            args: t.args,
            trigger: null,
            dynamicFn: n
        });
    },
    _addAnnotationEffects: function(e) {
        for (var t, i = 0; i < e.length && (t = e[i]); i++) for (var n, o = t.bindings, r = 0; r < o.length && (n = o[r]); r++) this._addAnnotationEffect(n, i);
    },
    _addAnnotationEffect: function(e, t) {
        Polymer.Bind._shouldAddListener(e) && Polymer.Bind._addAnnotatedListener(this, t, e.name, e.parts[0].value, e.parts[0].event, e.parts[0].negate);
        for (var i = 0; i < e.parts.length; i++) {
            var n = e.parts[i];
            n.signature ? this._addAnnotatedComputationEffect(e, n, t) : n.literal || ("attribute" === e.kind && "-" === e.name[0] ? this._warn(this._logf("_addAnnotationEffect", "Cannot set attribute " + e.name + ' because "-" is not a valid attribute starting character')) : this._addPropertyEffect(n.model, "annotation", {
                kind: e.kind,
                index: t,
                name: e.name,
                propertyName: e.propertyName,
                value: n.value,
                isCompound: e.isCompound,
                compoundIndex: n.compoundIndex,
                event: n.event,
                customEvent: n.customEvent,
                negate: n.negate
            }));
        }
    },
    _addAnnotatedComputationEffect: function(e, t, i) {
        var n = t.signature;
        if (n.static) this.__addAnnotatedComputationEffect("__static__", i, e, t, null); else {
            for (var o, r = 0; r < n.args.length && (o = n.args[r]); r++) o.literal || this.__addAnnotatedComputationEffect(o.model, i, e, t, o);
            n.dynamicFn && this.__addAnnotatedComputationEffect(n.method, i, e, t, null);
        }
    },
    __addAnnotatedComputationEffect: function(e, t, i, n, o) {
        this._addPropertyEffect(e, "annotatedComputation", {
            index: t,
            isCompound: i.isCompound,
            compoundIndex: n.compoundIndex,
            kind: i.kind,
            name: i.name,
            negate: n.negate,
            method: n.signature.method,
            args: n.signature.args,
            trigger: o,
            dynamicFn: n.signature.dynamicFn
        });
    },
    _parseMethod: function(e) {
        var t = e.match(/([^\s]+?)\(([\s\S]*)\)/);
        if (t) {
            var i = {
                method: t[1],
                static: !0
            };
            if (this.getPropertyInfo(i.method) !== Polymer.nob && (i.static = !1, i.dynamicFn = !0), 
            t[2].trim()) {
                var n = t[2].replace(/\\,/g, "&comma;").split(",");
                return this._parseArgs(n, i);
            }
            return i.args = Polymer.nar, i;
        }
    },
    _parseArgs: function(e, t) {
        return t.args = e.map(function(e) {
            var i = this._parseArg(e);
            return i.literal || (t.static = !1), i;
        }, this), t;
    },
    _parseArg: function(e) {
        var t = e.trim().replace(/&comma;/g, ",").replace(/\\(.)/g, "$1"), i = {
            name: t
        }, n = t[0];
        switch ("-" === n && (n = t[1]), n >= "0" && n <= "9" && (n = "#"), n) {
          case "'":
          case '"':
            i.value = t.slice(1, -1), i.literal = !0;
            break;

          case "#":
            i.value = Number(t), i.literal = !0;
        }
        return i.literal || (i.model = Polymer.Path.root(t), i.structured = Polymer.Path.isDeep(t), 
        i.structured && (i.wildcard = ".*" == t.slice(-2), i.wildcard && (i.name = t.slice(0, -2)))), 
        i;
    },
    _marshalInstanceEffects: function() {
        Polymer.Bind.prepareInstance(this), this._bindListeners && Polymer.Bind.setupBindListeners(this);
    },
    _applyEffectValue: function(e, t) {
        var i = this._nodes[e.index], n = e.name;
        if (t = this._computeFinalAnnotationValue(i, n, t, e), "attribute" == e.kind) this.serializeValueToAttribute(t, n, i); else {
            var o = i._propertyInfo && i._propertyInfo[n];
            if (o && o.readOnly) return;
            this.__setProperty(n, t, Polymer.Settings.suppressBindingNotifications, i);
        }
    },
    _computeFinalAnnotationValue: function(e, t, i, n) {
        if (n.negate && (i = !i), n.isCompound) {
            var o = e.__compoundStorage__[t];
            o[n.compoundIndex] = i, i = o.join("");
        }
        return "attribute" !== n.kind && ("className" === t && (i = this._scopeElementClass(e, i)), 
        ("textContent" === t || "input" == e.localName && "value" == t) && (i = void 0 == i ? "" : i)), 
        i;
    },
    _executeStaticEffects: function() {
        this._propertyEffects && this._propertyEffects.__static__ && this._effectEffects("__static__", null, this._propertyEffects.__static__);
    }
}), function() {
    var e = Polymer.Settings.usePolyfillProto, t = Boolean(Object.getOwnPropertyDescriptor(document.documentElement, "properties"));
    Polymer.Base._addFeature({
        _setupConfigure: function(e) {
            if (this._config = {}, this._handlers = [], this._aboveConfig = null, e) for (var t in e) void 0 !== e[t] && (this._config[t] = e[t]);
        },
        _marshalAttributes: function() {
            this._takeAttributesToModel(this._config);
        },
        _attributeChangedImpl: function(e) {
            var t = this._clientsReadied ? this : this._config;
            this._setAttributeToProperty(t, e);
        },
        _configValue: function(e, t) {
            var i = this._propertyInfo[e];
            i && i.readOnly || (this._config[e] = t);
        },
        _beforeClientsReady: function() {
            this._configure();
        },
        _configure: function() {
            this._configureAnnotationReferences(), this._configureInstanceProperties(), this._aboveConfig = this.mixin({}, this._config);
            for (var e = {}, i = 0; i < this.behaviors.length; i++) this._configureProperties(this.behaviors[i].properties, e);
            this._configureProperties(t ? this.__proto__.properties : this.properties, e), this.mixin(e, this._aboveConfig), 
            this._config = e, this._clients && this._clients.length && this._distributeConfig(this._config);
        },
        _configureInstanceProperties: function() {
            for (var t in this._propertyEffects) !e && this.hasOwnProperty(t) && (this._configValue(t, this[t]), 
            delete this[t]);
        },
        _configureProperties: function(e, t) {
            for (var i in e) {
                var n = e[i];
                if (void 0 !== n.value) {
                    var o = n.value;
                    "function" == typeof o && (o = o.call(this, this._config)), t[i] = o;
                }
            }
        },
        _distributeConfig: function(e) {
            var t = this._propertyEffects;
            if (t) for (var i in e) {
                var n = t[i];
                if (n) for (var o, r = 0, s = n.length; r < s && (o = n[r]); r++) if ("annotation" === o.kind) {
                    var a = this._nodes[o.effect.index], l = o.effect.propertyName, h = "attribute" == o.effect.kind, c = a._propertyEffects && a._propertyEffects[l];
                    if (a._configValue && (c || !h)) {
                        var u = i === o.effect.value ? e[i] : this._get(o.effect.value, e);
                        u = this._computeFinalAnnotationValue(a, l, u, o.effect), h && (u = a.deserialize(this.serialize(u), a._propertyInfo[l].type)), 
                        a._configValue(l, u);
                    }
                }
            }
        },
        _afterClientsReady: function() {
            this.importPath = this._importPath, this.rootPath = Polymer.rootPath, this._executeStaticEffects(), 
            this._applyConfig(this._config, this._aboveConfig), this._flushHandlers();
        },
        _applyConfig: function(e, t) {
            for (var i in e) void 0 === this[i] && this.__setProperty(i, e[i], i in t);
        },
        _notifyListener: function(e, t) {
            if (!Polymer.Bind._isEventBogus(t, t.target)) {
                var i, n;
                if (t.detail && (i = t.detail.value, n = t.detail.path), this._clientsReadied) return e.call(this, t.target, i, n);
                this._queueHandler([ e, t.target, i, n ]);
            }
        },
        _queueHandler: function(e) {
            this._handlers.push(e);
        },
        _flushHandlers: function() {
            for (var e, t = this._handlers, i = 0, n = t.length; i < n && (e = t[i]); i++) e[0].call(this, e[1], e[2], e[3]);
            this._handlers = [];
        }
    });
}(), function() {
    "use strict";
    var e = Polymer.Path;
    Polymer.Base._addFeature({
        notifyPath: function(e, t, i) {
            var n = {}, o = this._get(e, this, n);
            1 === arguments.length && (t = o), n.path && this._notifyPath(n.path, t, i);
        },
        _notifyPath: function(e, t, i) {
            var n = this._propertySetter(e, t);
            if (n !== t && (n == n || t == t)) return this._pathEffector(e, t), i || this._notifyPathUp(e, t), 
            !0;
        },
        _getPathParts: function(e) {
            if (Array.isArray(e)) {
                for (var t = [], i = 0; i < e.length; i++) for (var n = e[i].toString().split("."), o = 0; o < n.length; o++) t.push(n[o]);
                return t;
            }
            return e.toString().split(".");
        },
        set: function(e, t, i) {
            var n, o = i || this, r = this._getPathParts(e), s = r[r.length - 1];
            if (r.length > 1) {
                for (var a = 0; a < r.length - 1; a++) {
                    var l = r[a];
                    if (n && "#" == l[0] ? o = Polymer.Collection.get(n).getItem(l) : (o = o[l], n && parseInt(l, 10) == l && (r[a] = Polymer.Collection.get(n).getKey(o))), 
                    !o) return;
                    n = Array.isArray(o) ? o : null;
                }
                if (n) {
                    var h, c, u = Polymer.Collection.get(n);
                    "#" == s[0] ? (c = s, h = u.getItem(c), s = n.indexOf(h), u.setItem(c, t)) : parseInt(s, 10) == s && (h = o[s], 
                    c = u.getKey(h), r[a] = c, u.setItem(c, t));
                }
                o[s] = t, i || this._notifyPath(r.join("."), t);
            } else o[e] = t;
        },
        get: function(e, t) {
            return this._get(e, t);
        },
        _get: function(e, t, i) {
            for (var n, o = t || this, r = this._getPathParts(e), s = 0; s < r.length; s++) {
                if (!o) return;
                var a = r[s];
                n && "#" == a[0] ? o = Polymer.Collection.get(n).getItem(a) : (o = o[a], i && n && parseInt(a, 10) == a && (r[s] = Polymer.Collection.get(n).getKey(o))), 
                n = Array.isArray(o) ? o : null;
            }
            return i && (i.path = r.join(".")), o;
        },
        _pathEffector: function(t, i) {
            var n = e.root(t), o = this._propertyEffects && this._propertyEffects[n];
            if (o) for (var r, s = 0; s < o.length && (r = o[s]); s++) {
                var a = r.pathFn;
                a && a.call(this, t, i, r.effect);
            }
            this._boundPaths && this._notifyBoundPaths(t, i);
        },
        _annotationPathEffect: function(t, i, n) {
            if (e.matches(n.value, !1, t)) Polymer.Bind._annotationEffect.call(this, t, i, n); else if (!n.negate && e.isDescendant(n.value, t)) {
                var o = this._nodes[n.index];
                if (o && o._notifyPath) {
                    var r = e.translate(n.value, n.name, t);
                    o._notifyPath(r, i, !0);
                }
            }
        },
        _complexObserverPathEffect: function(t, i, n) {
            e.matches(n.trigger.name, n.trigger.wildcard, t) && Polymer.Bind._complexObserverEffect.call(this, t, i, n);
        },
        _computePathEffect: function(t, i, n) {
            e.matches(n.trigger.name, n.trigger.wildcard, t) && Polymer.Bind._computeEffect.call(this, t, i, n);
        },
        _annotatedComputationPathEffect: function(t, i, n) {
            e.matches(n.trigger.name, n.trigger.wildcard, t) && Polymer.Bind._annotatedComputationEffect.call(this, t, i, n);
        },
        linkPaths: function(e, t) {
            this._boundPaths = this._boundPaths || {}, t ? this._boundPaths[e] = t : this.unlinkPaths(e);
        },
        unlinkPaths: function(e) {
            this._boundPaths && delete this._boundPaths[e];
        },
        _notifyBoundPaths: function(t, i) {
            for (var n in this._boundPaths) {
                var o = this._boundPaths[n];
                e.isDescendant(n, t) ? this._notifyPath(e.translate(n, o, t), i) : e.isDescendant(o, t) && this._notifyPath(e.translate(o, n, t), i);
            }
        },
        _notifyPathUp: function(t, i) {
            var n = e.root(t), o = Polymer.CaseMap.camelToDashCase(n) + this._EVENT_CHANGED;
            this.fire(o, {
                path: t,
                value: i
            }, {
                bubbles: !1,
                _useCache: Polymer.Settings.eventDataCache || !Polymer.Settings.isIE
            });
        },
        _EVENT_CHANGED: "-changed",
        notifySplices: function(e, t) {
            var i = {}, n = this._get(e, this, i);
            this._notifySplices(n, i.path, t);
        },
        _notifySplices: function(e, t, i) {
            var n = {
                keySplices: Polymer.Collection.applySplices(e, i),
                indexSplices: i
            }, o = t + ".splices";
            this._notifyPath(o, n), this._notifyPath(t + ".length", e.length), this.__data__[o] = {
                keySplices: null,
                indexSplices: null
            };
        },
        _notifySplice: function(e, t, i, n, o) {
            this._notifySplices(e, t, [ {
                index: i,
                addedCount: n,
                removed: o,
                object: e,
                type: "splice"
            } ]);
        },
        push: function(e) {
            var t = {}, i = this._get(e, this, t), n = Array.prototype.slice.call(arguments, 1), o = i.length, r = i.push.apply(i, n);
            return n.length && this._notifySplice(i, t.path, o, n.length, []), r;
        },
        pop: function(e) {
            var t = {}, i = this._get(e, this, t), n = Boolean(i.length), o = Array.prototype.slice.call(arguments, 1), r = i.pop.apply(i, o);
            return n && this._notifySplice(i, t.path, i.length, 0, [ r ]), r;
        },
        splice: function(e, t) {
            var i = {}, n = this._get(e, this, i);
            (t = t < 0 ? n.length - Math.floor(-t) : Math.floor(t)) || (t = 0);
            var o = Array.prototype.slice.call(arguments, 1), r = n.splice.apply(n, o), s = Math.max(o.length - 2, 0);
            return (s || r.length) && this._notifySplice(n, i.path, t, s, r), r;
        },
        shift: function(e) {
            var t = {}, i = this._get(e, this, t), n = Boolean(i.length), o = Array.prototype.slice.call(arguments, 1), r = i.shift.apply(i, o);
            return n && this._notifySplice(i, t.path, 0, 0, [ r ]), r;
        },
        unshift: function(e) {
            var t = {}, i = this._get(e, this, t), n = Array.prototype.slice.call(arguments, 1), o = i.unshift.apply(i, n);
            return n.length && this._notifySplice(i, t.path, 0, n.length, []), o;
        },
        prepareModelNotifyPath: function(e) {
            this.mixin(e, {
                fire: Polymer.Base.fire,
                _getEvent: Polymer.Base._getEvent,
                __eventCache: Polymer.Base.__eventCache,
                notifyPath: Polymer.Base.notifyPath,
                _get: Polymer.Base._get,
                _EVENT_CHANGED: Polymer.Base._EVENT_CHANGED,
                _notifyPath: Polymer.Base._notifyPath,
                _notifyPathUp: Polymer.Base._notifyPathUp,
                _pathEffector: Polymer.Base._pathEffector,
                _annotationPathEffect: Polymer.Base._annotationPathEffect,
                _complexObserverPathEffect: Polymer.Base._complexObserverPathEffect,
                _annotatedComputationPathEffect: Polymer.Base._annotatedComputationPathEffect,
                _computePathEffect: Polymer.Base._computePathEffect,
                _notifyBoundPaths: Polymer.Base._notifyBoundPaths,
                _getPathParts: Polymer.Base._getPathParts
            });
        }
    });
}(), Polymer.Base._addFeature({
    resolveUrl: function(e) {
        return Polymer.ResolveUrl.resolveUrl(e, this._importPath);
    }
}), Polymer.CssParse = {
    parse: function(e) {
        return e = this._clean(e), this._parseCss(this._lex(e), e);
    },
    _clean: function(e) {
        return e.replace(this._rx.comments, "").replace(this._rx.port, "");
    },
    _lex: function(e) {
        for (var t = {
            start: 0,
            end: e.length
        }, i = t, n = 0, o = e.length; n < o; n++) switch (e[n]) {
          case this.OPEN_BRACE:
            i.rules || (i.rules = []);
            var r = i;
            i = {
                start: n + 1,
                parent: r,
                previous: r.rules[r.rules.length - 1]
            }, r.rules.push(i);
            break;

          case this.CLOSE_BRACE:
            i.end = n + 1, i = i.parent || t;
        }
        return t;
    },
    _parseCss: function(e, t) {
        var i = t.substring(e.start, e.end - 1);
        if (e.parsedCssText = e.cssText = i.trim(), e.parent) {
            var n = e.previous ? e.previous.end : e.parent.start;
            i = t.substring(n, e.start - 1), i = (i = (i = this._expandUnicodeEscapes(i)).replace(this._rx.multipleSpaces, " ")).substring(i.lastIndexOf(";") + 1);
            var o = e.parsedSelector = e.selector = i.trim();
            e.atRule = 0 === o.indexOf(this.AT_START), e.atRule ? 0 === o.indexOf(this.MEDIA_START) ? e.type = this.types.MEDIA_RULE : o.match(this._rx.keyframesRule) && (e.type = this.types.KEYFRAMES_RULE, 
            e.keyframesName = e.selector.split(this._rx.multipleSpaces).pop()) : 0 === o.indexOf(this.VAR_START) ? e.type = this.types.MIXIN_RULE : e.type = this.types.STYLE_RULE;
        }
        var r = e.rules;
        if (r) for (var s, a = 0, l = r.length; a < l && (s = r[a]); a++) this._parseCss(s, t);
        return e;
    },
    _expandUnicodeEscapes: function(e) {
        return e.replace(/\\([0-9a-f]{1,6})\s/gi, function() {
            for (var e = arguments[1], t = 6 - e.length; t--; ) e = "0" + e;
            return "\\" + e;
        });
    },
    stringify: function(e, t, i) {
        i = i || "";
        var n = "";
        if (e.cssText || e.rules) {
            var o = e.rules;
            if (o && !this._hasMixinRules(o)) for (var r, s = 0, a = o.length; s < a && (r = o[s]); s++) n = this.stringify(r, t, n); else (n = (n = t ? e.cssText : this.removeCustomProps(e.cssText)).trim()) && (n = "  " + n + "\n");
        }
        return n && (e.selector && (i += e.selector + " " + this.OPEN_BRACE + "\n"), i += n, 
        e.selector && (i += this.CLOSE_BRACE + "\n\n")), i;
    },
    _hasMixinRules: function(e) {
        return 0 === e[0].selector.indexOf(this.VAR_START);
    },
    removeCustomProps: function(e) {
        return e = this.removeCustomPropAssignment(e), this.removeCustomPropApply(e);
    },
    removeCustomPropAssignment: function(e) {
        return e.replace(this._rx.customProp, "").replace(this._rx.mixinProp, "");
    },
    removeCustomPropApply: function(e) {
        return e.replace(this._rx.mixinApply, "").replace(this._rx.varApply, "");
    },
    types: {
        STYLE_RULE: 1,
        KEYFRAMES_RULE: 7,
        MEDIA_RULE: 4,
        MIXIN_RULE: 1e3
    },
    OPEN_BRACE: "{",
    CLOSE_BRACE: "}",
    _rx: {
        comments: /\/\*[^*]*\*+([^\/*][^*]*\*+)*\//gim,
        port: /@import[^;]*;/gim,
        customProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?(?:[;\n]|$)/gim,
        mixinProp: /(?:^[^;\-\s}]+)?--[^;{}]*?:[^{};]*?{[^}]*?}(?:[;\n]|$)?/gim,
        mixinApply: /@apply\s*\(?[^);]*\)?\s*(?:[;\n]|$)?/gim,
        varApply: /[^;:]*?:[^;]*?var\([^;]*\)(?:[;\n]|$)?/gim,
        keyframesRule: /^@[^\s]*keyframes/,
        multipleSpaces: /\s+/g
    },
    VAR_START: "--",
    MEDIA_START: "@media",
    AT_START: "@"
}, Polymer.StyleUtil = function() {
    var e = Polymer.Settings;
    return {
        unscopedStyleImports: new WeakMap(),
        SHADY_UNSCOPED_ATTR: "shady-unscoped",
        NATIVE_VARIABLES: Polymer.Settings.useNativeCSSProperties,
        MODULE_STYLES_SELECTOR: "style, link[rel=import][type~=css], template",
        INCLUDE_ATTR: "include",
        toCssText: function(e, t) {
            return "string" == typeof e && (e = this.parser.parse(e)), t && this.forEachRule(e, t), 
            this.parser.stringify(e, this.NATIVE_VARIABLES);
        },
        forRulesInStyles: function(e, t, i) {
            if (e) for (var n, o = 0, r = e.length; o < r && (n = e[o]); o++) this.forEachRuleInStyle(n, t, i);
        },
        forActiveRulesInStyles: function(e, t, i) {
            if (e) for (var n, o = 0, r = e.length; o < r && (n = e[o]); o++) this.forEachRuleInStyle(n, t, i, !0);
        },
        rulesForStyle: function(e) {
            return !e.__cssRules && e.textContent && (e.__cssRules = this.parser.parse(e.textContent)), 
            e.__cssRules;
        },
        isKeyframesSelector: function(e) {
            return e.parent && e.parent.type === this.ruleTypes.KEYFRAMES_RULE;
        },
        forEachRuleInStyle: function(e, t, i, n) {
            var o, r, s = this.rulesForStyle(e);
            t && (o = function(i) {
                t(i, e);
            }), i && (r = function(t) {
                i(t, e);
            }), this.forEachRule(s, o, r, n);
        },
        forEachRule: function(e, t, i, n) {
            if (e) {
                var o = !1;
                if (n && e.type === this.ruleTypes.MEDIA_RULE) {
                    var r = e.selector.match(this.rx.MEDIA_MATCH);
                    r && (window.matchMedia(r[1]).matches || (o = !0));
                }
                e.type === this.ruleTypes.STYLE_RULE ? t(e) : i && e.type === this.ruleTypes.KEYFRAMES_RULE ? i(e) : e.type === this.ruleTypes.MIXIN_RULE && (o = !0);
                var s = e.rules;
                if (s && !o) for (var a, l = 0, h = s.length; l < h && (a = s[l]); l++) this.forEachRule(a, t, i, n);
            }
        },
        applyCss: function(e, t, i, n) {
            var o = this.createScopeStyle(e, t);
            return this.applyStyle(o, i, n);
        },
        applyStyle: function(e, t, i) {
            t = t || document.head;
            var n = i && i.nextSibling || t.firstChild;
            return this.__lastHeadApplyNode = e, t.insertBefore(e, n);
        },
        createScopeStyle: function(e, t) {
            var i = document.createElement("style");
            return t && i.setAttribute("scope", t), i.textContent = e, i;
        },
        __lastHeadApplyNode: null,
        applyStylePlaceHolder: function(e) {
            var t = document.createComment(" Shady DOM styles for " + e + " "), i = this.__lastHeadApplyNode ? this.__lastHeadApplyNode.nextSibling : null, n = document.head;
            return n.insertBefore(t, i || n.firstChild), this.__lastHeadApplyNode = t, t;
        },
        cssFromModules: function(e, t) {
            for (var i = e.trim().split(/\s+/), n = "", o = 0; o < i.length; o++) n += this.cssFromModule(i[o], t);
            return n;
        },
        cssFromModule: function(e, t) {
            var i = Polymer.DomModule.import(e);
            return i && !i._cssText && (i._cssText = this.cssFromElement(i)), !i && t && console.warn("Could not find style data in module named", e), 
            i && i._cssText || "";
        },
        cssFromElement: function(t) {
            for (var i, n = "", o = t.content || t, r = Polymer.TreeApi.arrayCopy(o.querySelectorAll(this.MODULE_STYLES_SELECTOR)), s = 0; s < r.length; s++) if ("template" === (i = r[s]).localName) i.hasAttribute("preserve-content") || (n += this.cssFromElement(i)); else if ("style" === i.localName) {
                var a = i.getAttribute(this.INCLUDE_ATTR);
                a && (n += this.cssFromModules(a, !0)), (i = i.__appliedElement || i).parentNode.removeChild(i);
                var l = this.resolveCss(i.textContent, t.ownerDocument);
                !e.useNativeShadow && i.hasAttribute(this.SHADY_UNSCOPED_ATTR) ? (i.textContent = l, 
                document.head.insertBefore(i, document.head.firstChild)) : n += l;
            } else if (i.import && i.import.body) {
                var h = this.resolveCss(i.import.body.textContent, i.import);
                if (!e.useNativeShadow && i.hasAttribute(this.SHADY_UNSCOPED_ATTR)) {
                    if (!this.unscopedStyleImports.has(i.import)) {
                        this.unscopedStyleImports.set(i.import, !0);
                        var c = document.createElement("style");
                        c.setAttribute(this.SHADY_UNSCOPED_ATTR, ""), c.textContent = h, document.head.insertBefore(c, document.head.firstChild);
                    }
                } else n += h;
            }
            return n;
        },
        styleIncludesToTemplate: function(e) {
            for (var t, i = e.content.querySelectorAll("style[include]"), n = 0; n < i.length; n++) (t = i[n]).parentNode.insertBefore(this._includesToFragment(t.getAttribute("include")), t);
        },
        _includesToFragment: function(e) {
            for (var t = e.trim().split(" "), i = document.createDocumentFragment(), n = 0; n < t.length; n++) {
                var o = Polymer.DomModule.import(t[n], "template");
                o && this._addStylesToFragment(i, o.content);
            }
            return i;
        },
        _addStylesToFragment: function(e, t) {
            for (var i, n = t.querySelectorAll("style"), o = 0; o < n.length; o++) {
                var r = (i = n[o]).getAttribute("include");
                r && e.appendChild(this._includesToFragment(r)), i.textContent && e.appendChild(i.cloneNode(!0));
            }
        },
        isTargetedBuild: function(t) {
            return e.useNativeShadow ? "shadow" === t : "shady" === t;
        },
        cssBuildTypeForModule: function(e) {
            var t = Polymer.DomModule.import(e);
            if (t) return this.getCssBuildType(t);
        },
        getCssBuildType: function(e) {
            return e.getAttribute("css-build");
        },
        _findMatchingParen: function(e, t) {
            for (var i = 0, n = t, o = e.length; n < o; n++) switch (e[n]) {
              case "(":
                i++;
                break;

              case ")":
                if (0 == --i) return n;
            }
            return -1;
        },
        processVariableAndFallback: function(e, t) {
            var i = e.indexOf("var(");
            if (-1 === i) return t(e, "", "", "");
            var n = this._findMatchingParen(e, i + 3), o = e.substring(i + 4, n), r = e.substring(0, i), s = this.processVariableAndFallback(e.substring(n + 1), t), a = o.indexOf(",");
            return -1 === a ? t(r, o.trim(), "", s) : t(r, o.substring(0, a).trim(), o.substring(a + 1).trim(), s);
        },
        rx: {
            VAR_ASSIGN: /(?:^|[;\s{]\s*)(--[\w-]*?)\s*:\s*(?:([^;{]*)|{([^}]*)})(?:(?=[;\s}])|$)/gi,
            MIXIN_MATCH: /(?:^|\W+)@apply\s*\(?([^);\n]*)\)?/gi,
            VAR_CONSUMED: /(--[\w-]+)\s*([:,;)]|$)/gi,
            ANIMATION_MATCH: /(animation\s*:)|(animation-name\s*:)/,
            MEDIA_MATCH: /@media[^(]*(\([^)]*\))/,
            IS_VAR: /^--/,
            BRACKETED: /\{[^}]*\}/g,
            HOST_PREFIX: "(?:^|[^.#[:])",
            HOST_SUFFIX: "($|[.:[\\s>+~])"
        },
        resolveCss: Polymer.ResolveUrl.resolveCss,
        parser: Polymer.CssParse,
        ruleTypes: Polymer.CssParse.types
    };
}(), Polymer.StyleTransformer = function() {
    var e = Polymer.StyleUtil, t = Polymer.Settings, i = {
        dom: function(e, t, i, n) {
            this._transformDom(e, t || "", i, n);
        },
        _transformDom: function(e, t, i, n) {
            e.setAttribute && this.element(e, t, i, n);
            for (var o = Polymer.dom(e).childNodes, r = 0; r < o.length; r++) this._transformDom(o[r], t, i, n);
        },
        element: function(e, t, i, o) {
            if (i) o ? e.removeAttribute(n) : e.setAttribute(n, t); else if (t) if (e.classList) o ? (e.classList.remove(n), 
            e.classList.remove(t)) : (e.classList.add(n), e.classList.add(t)); else if (e.getAttribute) {
                var r = e.getAttribute(v);
                o ? r && e.setAttribute(v, r.replace(n, "").replace(t, "")) : e.setAttribute(v, (r ? r + " " : "") + n + " " + t);
            }
        },
        elementStyles: function(i, n) {
            var o, r = i._styles, s = "", a = i.__cssBuild, l = t.useNativeShadow || "shady" === a;
            if (l) {
                var c = this;
                o = function(e) {
                    e.selector = c._slottedToContent(e.selector), e.selector = e.selector.replace(h, ":host > *"), 
                    e.selector = c._dirShadowTransform(e.selector), n && n(e);
                };
            }
            for (var u, d = 0, f = r.length; d < f && (u = r[d]); d++) {
                var p = e.rulesForStyle(u);
                s += l ? e.toCssText(p, o) : this.css(p, i.is, i.extends, n, i._scopeCssViaAttr) + "\n\n";
            }
            return s.trim();
        },
        css: function(t, i, n, o, r) {
            var s = this._calcHostScope(i, n);
            i = this._calcElementScope(i, r);
            var a = this;
            return e.toCssText(t, function(e) {
                e.isScoped || (a.rule(e, i, s), e.isScoped = !0), o && o(e, i, s);
            });
        },
        _calcElementScope: function(e, t) {
            return e ? t ? _ + e + g : m + e : "";
        },
        _calcHostScope: function(e, t) {
            return t ? "[is=" + e + "]" : e;
        },
        rule: function(e, t, i) {
            this._transformRule(e, this._transformComplexSelector, t, i);
        },
        _transformRule: function(e, t, i, n) {
            e.selector = e.transformedSelector = this._transformRuleCss(e, t, i, n);
        },
        _splitSelectorList: function(t) {
            for (var i = [], n = "", o = 0; o >= 0 && o < t.length; o++) if ("(" === t[o]) {
                var s = e._findMatchingParen(t, o);
                n += t.slice(o, s + 1), o = s;
            } else t[o] === r ? (i.push(n), n = "") : n += t[o];
            return n && i.push(n), 0 === i.length && i.push(t), i;
        },
        _transformRuleCss: function(t, i, n, o) {
            var s = this._splitSelectorList(t.selector);
            if (!e.isKeyframesSelector(t)) for (var a, l = 0, h = s.length; l < h && (a = s[l]); l++) s[l] = i.call(this, a, n, o);
            return s.join(r);
        },
        _ensureScopedDir: function(e) {
            var t = e.match(S);
            return t && "" === t[1] && t[0].length === e.length && (e = "*" + e), e;
        },
        _additionalDirSelectors: function(e, t, i) {
            return e && t ? (i = i || "", r + i + " " + e + " " + t) : "";
        },
        _transformComplexSelector: function(e, t, i) {
            var n = !1, o = !1, a = !1, c = this;
            return e = e.trim(), e = this._slottedToContent(e), e = e.replace(h, ":host > *"), 
            e = e.replace(b, l + " $1"), e = this._ensureScopedDir(e), e = e.replace(s, function(e, r, s) {
                if (n) s = s.replace(p, " "); else {
                    var l = c._transformCompoundSelector(s, r, t, i);
                    n = n || l.stop, o = o || l.hostContext, a = a || l.dir, r = l.combinator, s = l.value;
                }
                return r + s;
            }), o && (e = e.replace(d, function(e, t, n, o) {
                var s = t + n + " " + i + o + r + " " + t + i + n + o;
                return a && (s += c._additionalDirSelectors(n, o, i)), s;
            })), e;
        },
        _transformDir: function(e) {
            return e = e.replace(A, T), e = e.replace(S, E);
        },
        _transformCompoundSelector: function(e, t, i, n) {
            var o = e.search(p), r = !1, s = !1;
            e.match(S) && (e = this._transformDir(e), s = !0), e.indexOf(u) >= 0 ? r = !0 : e.indexOf(l) >= 0 ? e = this._transformHostSelector(e, n) : 0 !== o && (e = i ? this._transformSimpleSelector(e, i) : e), 
            e.indexOf(f) >= 0 && (t = "");
            var a;
            return o >= 0 && (e = e.replace(p, " "), a = !0), {
                value: e,
                combinator: t,
                stop: a,
                hostContext: r,
                dir: s
            };
        },
        _transformSimpleSelector: function(e, t) {
            var i = e.split(y);
            return i[0] += t, i.join(y);
        },
        _transformHostSelector: function(e, t) {
            var i = e.match(c), n = i && i[2].trim() || "";
            return n ? n[0].match(a) ? e.replace(c, function(e, i, n) {
                return t + n;
            }) : n.split(a)[0] === t ? n : P : e.replace(l, t);
        },
        documentRule: function(e) {
            e.selector = e.parsedSelector, this.normalizeRootSelector(e), t.useNativeShadow || this._transformRule(e, this._transformDocumentSelector);
        },
        normalizeRootSelector: function(e) {
            e.selector = e.selector.replace(h, "html");
            var t = this._splitSelectorList(e.selector);
            t = t.filter(function(e) {
                return !e.match(w);
            }), e.selector = t.join(r);
        },
        _transformDocumentSelector: function(e) {
            return this._transformComplexSelector(e, o);
        },
        _slottedToContent: function(e) {
            return e.replace(C, f + "> $1");
        },
        _dirShadowTransform: function(e) {
            return e.match(/:dir\(/) ? this._splitSelectorList(e).map(function(e) {
                e = this._ensureScopedDir(e), e = this._transformDir(e);
                var t = d.exec(e);
                return t && (e += this._additionalDirSelectors(t[2], t[3], "")), e;
            }, this).join(r) : e;
        },
        SCOPE_NAME: "style-scope"
    }, n = i.SCOPE_NAME, o = ":not([" + n + "]):not(." + n + ")", r = ",", s = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g, a = /[[.:#*]/, l = ":host", h = ":root", c = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, u = ":host-context", d = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/, f = "::content", p = /::content|::shadow|\/deep\//, m = ".", _ = "[" + n + "~=", g = "]", y = ":", v = "class", b = new RegExp("^(" + f + ")"), P = "should_not_match", C = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g, w = /:host(?:\s*>\s*\*)?/, S = /(.*):dir\((ltr|rtl)\)/, E = ':host-context([dir="$2"]) $1', A = /:host\(:dir\((rtl|ltr)\)\)/g, T = ':host-context([dir="$1"])';
    return i;
}(), Polymer.StyleExtends = function() {
    var e = Polymer.StyleUtil;
    return {
        hasExtends: function(e) {
            return Boolean(e.match(this.rx.EXTEND));
        },
        transform: function(t) {
            var i = e.rulesForStyle(t), n = this;
            return e.forEachRule(i, function(e) {
                if (n._mapRuleOntoParent(e), e.parent) for (var t; t = n.rx.EXTEND.exec(e.cssText); ) {
                    var i = t[1], o = n._findExtendor(i, e);
                    o && n._extendRule(e, o);
                }
                e.cssText = e.cssText.replace(n.rx.EXTEND, "");
            }), e.toCssText(i, function(e) {
                e.selector.match(n.rx.STRIP) && (e.cssText = "");
            }, !0);
        },
        _mapRuleOntoParent: function(e) {
            if (e.parent) {
                for (var t = e.parent.map || (e.parent.map = {}), i = e.selector.split(","), n = 0; n < i.length; n++) t[i[n].trim()] = e;
                return t;
            }
        },
        _findExtendor: function(e, t) {
            return t.parent && t.parent.map && t.parent.map[e] || this._findExtendor(e, t.parent);
        },
        _extendRule: function(e, t) {
            e.parent !== t.parent && this._cloneAndAddRuleToParent(t, e.parent), e.extends = e.extends || [], 
            e.extends.push(t), t.selector = t.selector.replace(this.rx.STRIP, ""), t.selector = (t.selector && t.selector + ",\n") + e.selector, 
            t.extends && t.extends.forEach(function(t) {
                this._extendRule(e, t);
            }, this);
        },
        _cloneAndAddRuleToParent: function(e, t) {
            (e = Object.create(e)).parent = t, e.extends && (e.extends = e.extends.slice()), 
            t.rules.push(e);
        },
        rx: {
            EXTEND: /@extends\(([^)]*)\)\s*?;/gim,
            STRIP: /%[^,]*$/
        }
    };
}(), Polymer.ApplyShim = function() {
    "use strict";
    function e(e, t) {
        e = e.trim(), _[e] = {
            properties: t,
            dependants: {}
        };
    }
    function t(e) {
        return e = e.trim(), _[e];
    }
    function i(e, t) {
        var i = p.exec(t);
        return i && (t = i[1] ? g._getInitialValueForProperty(e) : "apply-shim-inherit"), 
        t;
    }
    function n(e) {
        for (var t, n, o, r, s = e.split(";"), a = {}, l = 0; l < s.length; l++) (o = s[l]) && (r = o.split(":")).length > 1 && (n = i(t = r[0].trim(), r.slice(1).join(":")), 
        a[t] = n);
        return a;
    }
    function o(e) {
        var t = g.__currentElementProto, i = t && t.is;
        for (var n in e.dependants) n !== i && (e.dependants[n].__applyShimInvalid = !0);
    }
    function r(i, r, s, a) {
        if (s && h.processVariableAndFallback(s, function(e, i) {
            i && t(i) && (a = "@apply " + i + ";");
        }), !a) return i;
        var c = l(a), u = i.slice(0, i.indexOf("--")), d = n(c), f = d, p = t(r), _ = p && p.properties;
        _ ? (f = Object.create(_), f = Polymer.Base.mixin(f, d)) : e(r, f);
        var g, y, v = [], b = !1;
        for (g in f) void 0 === (y = d[g]) && (y = "initial"), !_ || g in _ || (b = !0), 
        v.push(r + m + g + ": " + y);
        return b && o(p), p && (p.properties = f), s && (u = i + ";" + u), u + v.join("; ") + ";";
    }
    function s(e, t, i) {
        return "var(" + t + ",var(" + i + "))";
    }
    function a(i, n) {
        var o = [], r = t(i = i.replace(f, ""));
        if (r || (e(i, {}), r = t(i)), r) {
            var s = g.__currentElementProto;
            s && (r.dependants[s.is] = s);
            var a, l, h;
            for (a in r.properties) h = n && n[a], l = [ a, ": var(", i, m, a ], h && l.push(",", h), 
            l.push(")"), o.push(l.join(""));
        }
        return o.join("; ");
    }
    function l(e) {
        for (var t; t = c.exec(e); ) {
            var i = t[0], o = t[1], r = t.index, s = r + i.indexOf("@apply"), l = r + i.length, h = e.slice(0, s), u = e.slice(l), d = a(o, n(h));
            e = [ h, d, u ].join(""), c.lastIndex = r + d.length;
        }
        return e;
    }
    var h = Polymer.StyleUtil, c = h.rx.MIXIN_MATCH, u = h.rx.VAR_ASSIGN, d = /var\(\s*(--[^,]*),\s*(--[^)]*)\)/g, f = /;\s*/m, p = /^\s*(initial)|(inherit)\s*$/, m = "_-_", _ = {}, g = {
        _measureElement: null,
        _map: _,
        _separator: m,
        transform: function(e, t) {
            this.__currentElementProto = t, h.forRulesInStyles(e, this._boundFindDefinitions), 
            h.forRulesInStyles(e, this._boundFindApplications), t && (t.__applyShimInvalid = !1), 
            this.__currentElementProto = null;
        },
        _findDefinitions: function(e) {
            var t = e.parsedCssText;
            t = (t = t.replace(d, s)).replace(u, r), e.cssText = t, ":root" === e.selector && (e.selector = ":host > *");
        },
        _findApplications: function(e) {
            e.cssText = l(e.cssText);
        },
        transformRule: function(e) {
            this._findDefinitions(e), this._findApplications(e);
        },
        _getInitialValueForProperty: function(e) {
            return this._measureElement || (this._measureElement = document.createElement("meta"), 
            this._measureElement.style.all = "initial", document.head.appendChild(this._measureElement)), 
            window.getComputedStyle(this._measureElement).getPropertyValue(e);
        }
    };
    return g._boundTransformRule = g.transformRule.bind(g), g._boundFindDefinitions = g._findDefinitions.bind(g), 
    g._boundFindApplications = g._findApplications.bind(g), g;
}(), function() {
    var e = Polymer.Base._prepElement, t = Polymer.Settings.useNativeShadow, i = Polymer.StyleUtil, n = Polymer.StyleTransformer, o = Polymer.StyleExtends, r = Polymer.ApplyShim, s = Polymer.Settings;
    Polymer.Base._addFeature({
        _prepElement: function(t) {
            this._encapsulateStyle && "shady" !== this.__cssBuild && n.element(t, this.is, this._scopeCssViaAttr), 
            e.call(this, t);
        },
        _prepStyles: function() {
            void 0 === this._encapsulateStyle && (this._encapsulateStyle = !t), t || (this._scopeStyle = i.applyStylePlaceHolder(this.is)), 
            this.__cssBuild = i.cssBuildTypeForModule(this.is);
        },
        _prepShimStyles: function() {
            if (this._template) {
                var e = i.isTargetedBuild(this.__cssBuild);
                if (s.useNativeCSSProperties && "shadow" === this.__cssBuild && e) return void (s.preserveStyleIncludes && i.styleIncludesToTemplate(this._template));
                this._styles = this._styles || this._collectStyles(), s.useNativeCSSProperties && !this.__cssBuild && r.transform(this._styles, this);
                var o = s.useNativeCSSProperties && e ? this._styles.length && this._styles[0].textContent.trim() : n.elementStyles(this);
                this._prepStyleProperties(), !this._needsStyleProperties() && o && i.applyCss(o, this.is, t ? this._template.content : null, this._scopeStyle);
            } else this._styles = [];
        },
        _collectStyles: function() {
            var e = [], t = "", n = this.styleModules;
            if (n) for (var r, s = 0, a = n.length; s < a && (r = n[s]); s++) t += i.cssFromModule(r);
            t += i.cssFromModule(this.is);
            var l = this._template && this._template.parentNode;
            if (!this._template || l && l.id.toLowerCase() === this.is || (t += i.cssFromElement(this._template)), 
            t) {
                var h = document.createElement("style");
                h.textContent = t, o.hasExtends(h.textContent) && (t = o.transform(h)), e.push(h);
            }
            return e;
        },
        _elementAdd: function(e) {
            this._encapsulateStyle && (e.__styleScoped ? e.__styleScoped = !1 : n.dom(e, this.is, this._scopeCssViaAttr));
        },
        _elementRemove: function(e) {
            this._encapsulateStyle && n.dom(e, this.is, this._scopeCssViaAttr, !0);
        },
        scopeSubtree: function(e, i) {
            if (!t) {
                var n = this, o = function(e) {
                    if (e.nodeType === Node.ELEMENT_NODE) {
                        var t = e.getAttribute("class");
                        e.setAttribute("class", n._scopeElementClass(e, t));
                        for (var i, o = e.querySelectorAll("*"), r = 0; r < o.length && (i = o[r]); r++) t = i.getAttribute("class"), 
                        i.setAttribute("class", n._scopeElementClass(i, t));
                    }
                };
                if (o(e), i) {
                    var r = new MutationObserver(function(e) {
                        for (var t, i = 0; i < e.length && (t = e[i]); i++) if (t.addedNodes) for (var n = 0; n < t.addedNodes.length; n++) o(t.addedNodes[n]);
                    });
                    return r.observe(e, {
                        childList: !0,
                        subtree: !0
                    }), r;
                }
            }
        }
    });
}(), Polymer.StyleProperties = function() {
    "use strict";
    function e(e, t) {
        var i = parseInt(e / 32), n = 1 << e % 32;
        t[i] = (t[i] || 0) | n;
    }
    var t = Polymer.DomApi.matchesSelector, i = Polymer.StyleUtil, n = Polymer.StyleTransformer, o = navigator.userAgent.match("Trident"), r = Polymer.Settings;
    return {
        decorateStyles: function(e, t) {
            var o = this, r = {}, s = [], a = 0, l = n._calcHostScope(t.is, t.extends);
            i.forRulesInStyles(e, function(e, n) {
                o.decorateRule(e), e.index = a++, o.whenHostOrRootRule(t, e, n, function(n) {
                    if (e.parent.type === i.ruleTypes.MEDIA_RULE && (t.__notStyleScopeCacheable = !0), 
                    n.isHost) {
                        var o = n.selector.split(" ").some(function(e) {
                            return 0 === e.indexOf(l) && e.length !== l.length;
                        });
                        t.__notStyleScopeCacheable = t.__notStyleScopeCacheable || o;
                    }
                }), o.collectPropertiesInCssText(e.propertyInfo.cssText, r);
            }, function(e) {
                s.push(e);
            }), e._keyframes = s;
            var h = [];
            for (var c in r) h.push(c);
            return h;
        },
        decorateRule: function(e) {
            if (e.propertyInfo) return e.propertyInfo;
            var t = {}, i = {};
            return this.collectProperties(e, i) && (t.properties = i, e.rules = null), t.cssText = this.collectCssText(e), 
            e.propertyInfo = t, t;
        },
        collectProperties: function(e, t) {
            var i = e.propertyInfo;
            if (!i) {
                for (var n, o, r, s = this.rx.VAR_ASSIGN, a = e.parsedCssText; n = s.exec(a); ) "inherit" !== (o = (n[2] || n[3]).trim()) && (t[n[1].trim()] = o), 
                r = !0;
                return r;
            }
            if (i.properties) return Polymer.Base.mixin(t, i.properties), !0;
        },
        collectCssText: function(e) {
            return this.collectConsumingCssText(e.parsedCssText);
        },
        collectConsumingCssText: function(e) {
            return e.replace(this.rx.BRACKETED, "").replace(this.rx.VAR_ASSIGN, "");
        },
        collectPropertiesInCssText: function(e, t) {
            for (var i; i = this.rx.VAR_CONSUMED.exec(e); ) {
                var n = i[1];
                ":" !== i[2] && (t[n] = !0);
            }
        },
        reify: function(e) {
            for (var t, i = Object.getOwnPropertyNames(e), n = 0; n < i.length; n++) e[t = i[n]] = this.valueForProperty(e[t], e);
        },
        valueForProperty: function(e, t) {
            if (e) if (e.indexOf(";") >= 0) e = this.valueForProperties(e, t); else {
                var n = this, o = function(e, i, o, r) {
                    var s = n.valueForProperty(t[i], t);
                    return s && "initial" !== s ? "apply-shim-inherit" === s && (s = "inherit") : s = n.valueForProperty(t[o] || o, t) || o, 
                    e + (s || "") + r;
                };
                e = i.processVariableAndFallback(e, o);
            }
            return e && e.trim() || "";
        },
        valueForProperties: function(e, t) {
            for (var i, n, o = e.split(";"), r = 0; r < o.length; r++) if (i = o[r]) {
                if (this.rx.MIXIN_MATCH.lastIndex = 0, n = this.rx.MIXIN_MATCH.exec(i)) i = this.valueForProperty(t[n[1]], t); else {
                    var s = i.indexOf(":");
                    if (-1 !== s) {
                        var a = i.substring(s);
                        a = a.trim(), a = this.valueForProperty(a, t) || a, i = i.substring(0, s) + a;
                    }
                }
                o[r] = i && i.lastIndexOf(";") === i.length - 1 ? i.slice(0, -1) : i || "";
            }
            return o.join(";");
        },
        applyProperties: function(e, t) {
            var i = "";
            e.propertyInfo || this.decorateRule(e), e.propertyInfo.cssText && (i = this.valueForProperties(e.propertyInfo.cssText, t)), 
            e.cssText = i;
        },
        applyKeyframeTransforms: function(e, t) {
            var i = e.cssText, n = e.cssText;
            if (null == e.hasAnimations && (e.hasAnimations = this.rx.ANIMATION_MATCH.test(i)), 
            e.hasAnimations) {
                if (null == e.keyframeNamesToTransform) {
                    e.keyframeNamesToTransform = [];
                    for (var o in t) i !== (n = (0, t[o])(i)) && (i = n, e.keyframeNamesToTransform.push(o));
                } else {
                    for (var r = 0; r < e.keyframeNamesToTransform.length; ++r) i = (0, t[e.keyframeNamesToTransform[r]])(i);
                    n = i;
                }
            }
            e.cssText = n;
        },
        propertyDataFromStyles: function(n, o) {
            var r = {}, s = this, a = [];
            return i.forActiveRulesInStyles(n, function(i) {
                i.propertyInfo || s.decorateRule(i);
                var n = i.transformedSelector || i.parsedSelector;
                o && i.propertyInfo.properties && n && t.call(o, n) && (s.collectProperties(i, r), 
                e(i.index, a));
            }), {
                properties: r,
                key: a
            };
        },
        _rootSelector: /:root|:host\s*>\s*\*/,
        _checkRoot: function(e, t) {
            return Boolean(t.match(this._rootSelector)) || "html" === e && t.indexOf("html") > -1;
        },
        whenHostOrRootRule: function(e, t, i, o) {
            if (t.propertyInfo || self.decorateRule(t), t.propertyInfo.properties) {
                var s = e.is ? n._calcHostScope(e.is, e.extends) : "html", a = t.parsedSelector, l = this._checkRoot(s, a), h = !l && 0 === a.indexOf(":host");
                if ("shady" === (e.__cssBuild || i.__cssBuild) && (h = !(l = a === s + " > *." + s || a.indexOf("html") > -1) && 0 === a.indexOf(s)), 
                l || h) {
                    var c = s;
                    h && (r.useNativeShadow && !t.transformedSelector && (t.transformedSelector = n._transformRuleCss(t, n._transformComplexSelector, e.is, s)), 
                    c = t.transformedSelector || t.parsedSelector), l && "html" === s && (c = t.transformedSelector || t.parsedSelector), 
                    o({
                        selector: c,
                        isHost: h,
                        isRoot: l
                    });
                }
            }
        },
        hostAndRootPropertiesForScope: function(e) {
            var n = {}, o = {}, r = this;
            return i.forActiveRulesInStyles(e._styles, function(i, s) {
                r.whenHostOrRootRule(e, i, s, function(s) {
                    var a = e._element || e;
                    t.call(a, s.selector) && (s.isHost ? r.collectProperties(i, n) : r.collectProperties(i, o));
                });
            }), {
                rootProps: o,
                hostProps: n
            };
        },
        transformStyles: function(e, t, i) {
            var o = this, s = n._calcHostScope(e.is, e.extends), a = e.extends ? "\\" + s.slice(0, -1) + "\\]" : s, l = new RegExp(this.rx.HOST_PREFIX + a + this.rx.HOST_SUFFIX), h = this._elementKeyframeTransforms(e, i);
            return n.elementStyles(e, function(n) {
                o.applyProperties(n, t), r.useNativeShadow || Polymer.StyleUtil.isKeyframesSelector(n) || !n.cssText || (o.applyKeyframeTransforms(n, h), 
                o._scopeSelector(n, l, s, e._scopeCssViaAttr, i));
            });
        },
        _elementKeyframeTransforms: function(e, t) {
            var i = e._styles._keyframes, n = {};
            if (!r.useNativeShadow && i) for (var o = 0, s = i[o]; o < i.length; s = i[++o]) this._scopeKeyframes(s, t), 
            n[s.keyframesName] = this._keyframesRuleTransformer(s);
            return n;
        },
        _keyframesRuleTransformer: function(e) {
            return function(t) {
                return t.replace(e.keyframesNameRx, e.transformedKeyframesName);
            };
        },
        _scopeKeyframes: function(e, t) {
            e.keyframesNameRx = new RegExp(e.keyframesName, "g"), e.transformedKeyframesName = e.keyframesName + "-" + t, 
            e.transformedSelector = e.transformedSelector || e.selector, e.selector = e.transformedSelector.replace(e.keyframesName, e.transformedKeyframesName);
        },
        _hasDirOrHostContext: function(e) {
            return /:host-context|:dir/.test(e);
        },
        _scopeSelector: function(e, t, i, o, r) {
            e.transformedSelector = e.transformedSelector || e.selector;
            for (var s, a = e.transformedSelector, l = n._calcElementScope(r, o), h = n._calcElementScope(i, o), c = a.split(","), u = this._hasDirOrHostContext(e.parsedSelector), d = 0, f = c.length; d < f && (s = c[d]); d++) c[d] = s.match(t) ? s.replace(i, l) : u ? s.replace(h, l + " " + h) : l + " " + s;
            e.selector = c.join(",");
        },
        applyElementScopeSelector: function(e, t, i, o) {
            var r = o ? e.getAttribute(n.SCOPE_NAME) : e.getAttribute("class") || "", s = i ? r.replace(i, t) : (r ? r + " " : "") + this.XSCOPE_NAME + " " + t;
            r !== s && (o ? e.setAttribute(n.SCOPE_NAME, s) : e.setAttribute("class", s));
        },
        applyElementStyle: function(e, t, n, s) {
            var a = s ? s.textContent || "" : this.transformStyles(e, t, n), l = e._customStyle;
            return l && !r.useNativeShadow && l !== s && (l._useCount--, l._useCount <= 0 && l.parentNode && l.parentNode.removeChild(l)), 
            r.useNativeShadow ? e._customStyle ? (e._customStyle.textContent = a, s = e._customStyle) : a && (s = i.applyCss(a, n, e.root, e._scopeStyle)) : s ? s.parentNode || (o && a.indexOf("@media") > -1 && (s.textContent = a), 
            i.applyStyle(s, null, e._scopeStyle)) : a && (s = i.applyCss(a, n, null, e._scopeStyle)), 
            s && (s._useCount = s._useCount || 0, e._customStyle != s && s._useCount++, e._customStyle = s), 
            s;
        },
        mixinCustomStyle: function(e, t) {
            var i;
            for (var n in t) ((i = t[n]) || 0 === i) && (e[n] = i);
        },
        updateNativeStyleProperties: function(e, t) {
            var i = e.__customStyleProperties;
            if (i) for (var n = 0; n < i.length; n++) e.style.removeProperty(i[n]);
            var o = [];
            for (var r in t) null !== t[r] && (e.style.setProperty(r, t[r]), o.push(r));
            e.__customStyleProperties = o;
        },
        rx: i.rx,
        XSCOPE_NAME: "x-scope"
    };
}(), Polymer.StyleCache = function() {
    this.cache = {};
}, Polymer.StyleCache.prototype = {
    MAX: 100,
    store: function(e, t, i, n) {
        t.keyValues = i, t.styles = n;
        var o = this.cache[e] = this.cache[e] || [];
        o.push(t), o.length > this.MAX && o.shift();
    },
    retrieve: function(e, t, i) {
        var n = this.cache[e];
        if (n) for (var o, r = n.length - 1; r >= 0; r--) if (o = n[r], i === o.styles && this._objectsEqual(t, o.keyValues)) return o;
    },
    clear: function() {
        this.cache = {};
    },
    _objectsEqual: function(e, t) {
        var i, n;
        for (var o in e) if (i = e[o], n = t[o], !("object" == typeof i && i ? this._objectsStrictlyEqual(i, n) : i === n)) return !1;
        return !Array.isArray(e) || e.length === t.length;
    },
    _objectsStrictlyEqual: function(e, t) {
        return this._objectsEqual(e, t) && this._objectsEqual(t, e);
    }
}, Polymer.StyleDefaults = function() {
    var e = Polymer.StyleProperties, t = Polymer.StyleCache, i = Polymer.Settings.useNativeCSSProperties;
    return {
        _styles: [],
        _properties: null,
        customStyle: {},
        _styleCache: new t(),
        _element: Polymer.DomApi.wrap(document.documentElement),
        addStyle: function(e) {
            this._styles.push(e), this._properties = null;
        },
        get _styleProperties() {
            return this._properties || (e.decorateStyles(this._styles, this), this._styles._scopeStyleProperties = null, 
            this._properties = e.hostAndRootPropertiesForScope(this).rootProps, e.mixinCustomStyle(this._properties, this.customStyle), 
            e.reify(this._properties)), this._properties;
        },
        hasStyleProperties: function() {
            return Boolean(this._properties);
        },
        _needsStyleProperties: function() {},
        _computeStyleProperties: function() {
            return this._styleProperties;
        },
        updateStyles: function(t) {
            this._properties = null, t && Polymer.Base.mixin(this.customStyle, t), this._styleCache.clear();
            for (var n, o = 0; o < this._styles.length; o++) (n = (n = this._styles[o]).__importElement || n)._apply();
            i && e.updateNativeStyleProperties(document.documentElement, this.customStyle);
        }
    };
}(), function() {
    "use strict";
    var e = Polymer.Base.serializeValueToAttribute, t = Polymer.StyleProperties, i = Polymer.StyleTransformer, n = Polymer.StyleDefaults, o = Polymer.Settings.useNativeShadow, r = Polymer.Settings.useNativeCSSProperties;
    Polymer.Base._addFeature({
        _prepStyleProperties: function() {
            r || (this._ownStylePropertyNames = this._styles && this._styles.length ? t.decorateStyles(this._styles, this) : null);
        },
        customStyle: null,
        getComputedStyleValue: function(e) {
            return r || this._styleProperties || this._computeStyleProperties(), !r && this._styleProperties && this._styleProperties[e] || getComputedStyle(this).getPropertyValue(e);
        },
        _setupStyleProperties: function() {
            this.customStyle = {}, this._styleCache = null, this._styleProperties = null, this._scopeSelector = null, 
            this._ownStyleProperties = null, this._customStyle = null;
        },
        _needsStyleProperties: function() {
            return Boolean(!r && this._ownStylePropertyNames && this._ownStylePropertyNames.length);
        },
        _validateApplyShim: function() {
            if (this.__applyShimInvalid) {
                Polymer.ApplyShim.transform(this._styles, this.__proto__);
                var e = i.elementStyles(this);
                if (o) {
                    var t = this._template.content.querySelector("style");
                    t && (t.textContent = e);
                } else {
                    var n = this._scopeStyle && this._scopeStyle.nextSibling;
                    n && (n.textContent = e);
                }
            }
        },
        _beforeAttached: function() {
            this._scopeSelector && !this.__stylePropertiesInvalid || !this._needsStyleProperties() || (this.__stylePropertiesInvalid = !1, 
            this._updateStyleProperties());
        },
        _findStyleHost: function() {
            for (var e, t = this; e = Polymer.dom(t).getOwnerRoot(); ) {
                if (Polymer.isInstance(e.host)) return e.host;
                t = e.host;
            }
            return n;
        },
        _updateStyleProperties: function() {
            var e, i = this._findStyleHost();
            i._styleProperties || i._computeStyleProperties(), i._styleCache || (i._styleCache = new Polymer.StyleCache());
            var n = t.propertyDataFromStyles(i._styles, this), r = !this.__notStyleScopeCacheable;
            r && (n.key.customStyle = this.customStyle, e = i._styleCache.retrieve(this.is, n.key, this._styles));
            var a = Boolean(e);
            a ? this._styleProperties = e._styleProperties : this._computeStyleProperties(n.properties), 
            this._computeOwnStyleProperties(), a || (e = s.retrieve(this.is, this._ownStyleProperties, this._styles));
            var l = Boolean(e) && !a, h = this._applyStyleProperties(e);
            a || (e = {
                style: h = h && o ? h.cloneNode(!0) : h,
                _scopeSelector: this._scopeSelector,
                _styleProperties: this._styleProperties
            }, r && (n.key.customStyle = {}, this.mixin(n.key.customStyle, this.customStyle), 
            i._styleCache.store(this.is, e, n.key, this._styles)), l || s.store(this.is, Object.create(e), this._ownStyleProperties, this._styles));
        },
        _computeStyleProperties: function(e) {
            var i = this._findStyleHost();
            i._styleProperties || i._computeStyleProperties();
            var n = Object.create(i._styleProperties), o = t.hostAndRootPropertiesForScope(this);
            this.mixin(n, o.hostProps), e = e || t.propertyDataFromStyles(i._styles, this).properties, 
            this.mixin(n, e), this.mixin(n, o.rootProps), t.mixinCustomStyle(n, this.customStyle), 
            t.reify(n), this._styleProperties = n;
        },
        _computeOwnStyleProperties: function() {
            for (var e, t = {}, i = 0; i < this._ownStylePropertyNames.length; i++) t[e = this._ownStylePropertyNames[i]] = this._styleProperties[e];
            this._ownStyleProperties = t;
        },
        _scopeCount: 0,
        _applyStyleProperties: function(e) {
            var i = this._scopeSelector;
            this._scopeSelector = e ? e._scopeSelector : this.is + "-" + this.__proto__._scopeCount++;
            var n = t.applyElementStyle(this, this._styleProperties, this._scopeSelector, e && e.style);
            return o || t.applyElementScopeSelector(this, this._scopeSelector, i, this._scopeCssViaAttr), 
            n;
        },
        serializeValueToAttribute: function(t, i, n) {
            if (n = n || this, "class" === i && !o) {
                var r = n === this ? this.domHost || this.dataHost : this;
                r && (t = r._scopeElementClass(n, t));
            }
            n = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(n) : n, e.call(this, t, i, n);
        },
        _scopeElementClass: function(e, t) {
            return o || this._scopeCssViaAttr || (t = (t ? t + " " : "") + a + " " + this.is + (e._scopeSelector ? " " + l + " " + e._scopeSelector : "")), 
            t;
        },
        updateStyles: function(e) {
            e && this.mixin(this.customStyle, e), r ? t.updateNativeStyleProperties(this, this.customStyle) : (this.isAttached ? this._needsStyleProperties() ? this._updateStyleProperties() : this._styleProperties = null : this.__stylePropertiesInvalid = !0, 
            this._styleCache && this._styleCache.clear(), this._updateRootStyles());
        },
        _updateRootStyles: function(e) {
            e = e || this.root;
            for (var t, i = Polymer.dom(e)._query(function(e) {
                return e.shadyRoot || e.shadowRoot;
            }), n = 0, o = i.length; n < o && (t = i[n]); n++) t.updateStyles && t.updateStyles();
        }
    }), Polymer.updateStyles = function(e) {
        n.updateStyles(e), Polymer.Base._updateRootStyles(document);
    };
    var s = new Polymer.StyleCache();
    Polymer.customStyleCache = s;
    var a = i.SCOPE_NAME, l = t.XSCOPE_NAME;
}(), Polymer.Base._addFeature({
    _registerFeatures: function() {
        this._prepIs(), this.factoryImpl && this._prepConstructor(), this._prepStyles();
    },
    _finishRegisterFeatures: function() {
        this._prepTemplate(), this._prepShimStyles(), this._prepAnnotations(), this._prepEffects(), 
        this._prepBehaviors(), this._prepPropertyInfo(), this._prepBindings(), this._prepShady();
    },
    _prepBehavior: function(e) {
        this._addPropertyEffects(e.properties), this._addComplexObserverEffects(e.observers), 
        this._addHostAttributes(e.hostAttributes);
    },
    _initFeatures: function() {
        this._setupGestures(), this._setupConfigure(this.__data__), this._setupStyleProperties(), 
        this._setupDebouncers(), this._setupShady(), this._registerHost(), this._template && (this._validateApplyShim(), 
        this._poolContent(), this._beginHosting(), this._stampTemplate(), this._endHosting(), 
        this._marshalAnnotationReferences()), this._marshalInstanceEffects(), this._marshalBehaviors(), 
        this._marshalHostAttributes(), this._marshalAttributes(), this._tryReady();
    },
    _marshalBehavior: function(e) {
        e.listeners && this._listenListeners(e.listeners);
    }
}), function() {
    var e, t = Polymer.StyleProperties, i = Polymer.StyleUtil, n = Polymer.CssParse, o = Polymer.StyleDefaults, r = Polymer.StyleTransformer, s = Polymer.ApplyShim, a = Polymer.Debounce, l = Polymer.Settings;
    Polymer({
        is: "custom-style",
        extends: "style",
        _template: null,
        properties: {
            include: String
        },
        ready: function() {
            this.__appliedElement = this.__appliedElement || this, this.__cssBuild = i.getCssBuildType(this), 
            this.__appliedElement !== this && (this.__appliedElement.__cssBuild = this.__cssBuild), 
            this.ownerDocument !== window.document && this.__appliedElement === this && document.head.appendChild(this), 
            this._tryApply();
        },
        attached: function() {
            this._tryApply();
        },
        _tryApply: function() {
            if (!this._appliesToDocument && this.parentNode && "dom-module" !== this.parentNode.localName) {
                this._appliesToDocument = !0;
                var e = this.__appliedElement;
                if (l.useNativeCSSProperties || (this.__needsUpdateStyles = o.hasStyleProperties(), 
                o.addStyle(e)), e.textContent || this.include) this._apply(!0); else {
                    var t = this, i = new MutationObserver(function() {
                        i.disconnect(), t._apply(!0);
                    });
                    i.observe(e, {
                        childList: !0
                    });
                }
            }
        },
        _updateStyles: function() {
            Polymer.updateStyles();
        },
        _apply: function(e) {
            var t = this.__appliedElement;
            if (this.include && (t.textContent = i.cssFromModules(this.include, !0) + t.textContent), 
            t.textContent) {
                var n = this.__cssBuild, o = i.isTargetedBuild(n);
                if (!l.useNativeCSSProperties || !o) {
                    var a = i.rulesForStyle(t);
                    if (o || (i.forEachRule(a, function(e) {
                        r.documentRule(e);
                    }), l.useNativeCSSProperties && !n && s.transform([ t ])), l.useNativeCSSProperties) t.textContent = i.toCssText(a); else {
                        var h = this, c = function() {
                            h._flushCustomProperties();
                        };
                        e ? Polymer.RenderStatus.whenReady(c) : c();
                    }
                }
            }
        },
        _flushCustomProperties: function() {
            this.__needsUpdateStyles ? (this.__needsUpdateStyles = !1, e = a(e, this._updateStyles)) : this._applyCustomProperties();
        },
        _applyCustomProperties: function() {
            var e = this.__appliedElement;
            this._computeStyleProperties();
            var o = this._styleProperties, r = i.rulesForStyle(e);
            r && (e.textContent = i.toCssText(r, function(e) {
                var i = e.cssText = e.parsedCssText;
                e.propertyInfo && e.propertyInfo.cssText && (i = n.removeCustomPropAssignment(i), 
                e.cssText = t.valueForProperties(i, o));
            }));
        }
    });
}(), Polymer.Templatizer = {
    properties: {
        __hideTemplateChildren__: {
            observer: "_showHideChildren"
        }
    },
    _instanceProps: Polymer.nob,
    _parentPropPrefix: "_parent_",
    templatize: function(e) {
        if (this._templatized = e, e._content || (e._content = e.content), e._content._ctor) return this.ctor = e._content._ctor, 
        void this._prepParentProperties(this.ctor.prototype, e);
        var t = Object.create(Polymer.Base);
        this._customPrepAnnotations(t, e), this._prepParentProperties(t, e), t._prepEffects(), 
        this._customPrepEffects(t), t._prepBehaviors(), t._prepPropertyInfo(), t._prepBindings(), 
        t._notifyPathUp = this._notifyPathUpImpl, t._scopeElementClass = this._scopeElementClassImpl, 
        t.listen = this._listenImpl, t._showHideChildren = this._showHideChildrenImpl, t.__setPropertyOrig = this.__setProperty, 
        t.__setProperty = this.__setPropertyImpl;
        var i = this._constructorImpl, n = function(e, t) {
            i.call(this, e, t);
        };
        n.prototype = t, t.constructor = n, e._content._ctor = n, this.ctor = n;
    },
    _getRootDataHost: function() {
        return this.dataHost && this.dataHost._rootDataHost || this.dataHost;
    },
    _showHideChildrenImpl: function(e) {
        for (var t = this._children, i = 0; i < t.length; i++) {
            var n = t[i];
            Boolean(e) != Boolean(n.__hideTemplateChildren__) && (n.nodeType === Node.TEXT_NODE ? e ? (n.__polymerTextContent__ = n.textContent, 
            n.textContent = "") : n.textContent = n.__polymerTextContent__ : n.style && (e ? (n.__polymerDisplay__ = n.style.display, 
            n.style.display = "none") : n.style.display = n.__polymerDisplay__)), n.__hideTemplateChildren__ = e;
        }
    },
    __setPropertyImpl: function(e, t, i, n) {
        n && n.__hideTemplateChildren__ && "textContent" == e && (e = "__polymerTextContent__"), 
        this.__setPropertyOrig(e, t, i, n);
    },
    _debounceTemplate: function(e) {
        Polymer.dom.addDebouncer(this.debounce("_debounceTemplate", e));
    },
    _flushTemplates: function() {
        Polymer.dom.flush();
    },
    _customPrepEffects: function(e) {
        var t = e._parentProps;
        for (var i in t) e._addPropertyEffect(i, "function", this._createHostPropEffector(i));
        for (i in this._instanceProps) e._addPropertyEffect(i, "function", this._createInstancePropEffector(i));
    },
    _customPrepAnnotations: function(e, t) {
        e._template = t;
        var i = t._content;
        if (!i._notes) {
            var n = e._rootDataHost;
            n && (Polymer.Annotations.prepElement = function() {
                n._prepElement();
            }), i._notes = Polymer.Annotations.parseAnnotations(t), Polymer.Annotations.prepElement = null, 
            this._processAnnotations(i._notes);
        }
        e._notes = i._notes, e._parentProps = i._parentProps;
    },
    _prepParentProperties: function(e, t) {
        var i = this._parentProps = e._parentProps;
        if (this._forwardParentProp && i) {
            var n, o = e._parentPropProto;
            if (!o) {
                for (n in this._instanceProps) delete i[n];
                o = e._parentPropProto = Object.create(null), t != this && (Polymer.Bind.prepareModel(o), 
                Polymer.Base.prepareModelNotifyPath(o));
                for (n in i) {
                    var r = this._parentPropPrefix + n, s = [ {
                        kind: "function",
                        effect: this._createForwardPropEffector(n),
                        fn: Polymer.Bind._functionEffect
                    }, {
                        kind: "notify",
                        fn: Polymer.Bind._notifyEffect,
                        effect: {
                            event: Polymer.CaseMap.camelToDashCase(r) + "-changed"
                        }
                    } ];
                    o._propertyEffects = o._propertyEffects || {}, o._propertyEffects[r] = s, Polymer.Bind._createAccessors(o, r, s);
                }
            }
            var a = this;
            t != this && (Polymer.Bind.prepareInstance(t), t._forwardParentProp = function(e, t) {
                a._forwardParentProp(e, t);
            }), this._extendTemplate(t, o), t._pathEffector = function(e, t, i) {
                return a._pathEffectorImpl(e, t, i);
            };
        }
    },
    _createForwardPropEffector: function(e) {
        return function(t, i) {
            this._forwardParentProp(e, i);
        };
    },
    _createHostPropEffector: function(e) {
        var t = this._parentPropPrefix;
        return function(i, n) {
            this.dataHost._templatized[t + e] = n;
        };
    },
    _createInstancePropEffector: function(e) {
        return function(t, i, n, o) {
            o || this.dataHost._forwardInstanceProp(this, e, i);
        };
    },
    _extendTemplate: function(e, t) {
        var i = Object.getOwnPropertyNames(t);
        t._propertySetter && (e._propertySetter = t._propertySetter);
        for (var n, o = 0; o < i.length && (n = i[o]); o++) {
            var r = e[n];
            if (r && "_propertyEffects" == n) {
                var s = Polymer.Base.mixin({}, r);
                e._propertyEffects = Polymer.Base.mixin(s, t._propertyEffects);
            } else {
                var a = Object.getOwnPropertyDescriptor(t, n);
                Object.defineProperty(e, n, a), void 0 !== r && e._propertySetter(n, r);
            }
        }
    },
    _showHideChildren: function(e) {},
    _forwardInstancePath: function(e, t, i) {},
    _forwardInstanceProp: function(e, t, i) {},
    _notifyPathUpImpl: function(e, t) {
        var i = this.dataHost, n = Polymer.Path.root(e);
        i._forwardInstancePath.call(i, this, e, t), n in i._parentProps && i._templatized._notifyPath(i._parentPropPrefix + e, t);
    },
    _pathEffectorImpl: function(e, t, i) {
        if (this._forwardParentPath && 0 === e.indexOf(this._parentPropPrefix)) {
            var n = e.substring(this._parentPropPrefix.length);
            Polymer.Path.root(n) in this._parentProps && this._forwardParentPath(n, t);
        }
        Polymer.Base._pathEffector.call(this._templatized, e, t, i);
    },
    _constructorImpl: function(e, t) {
        this._rootDataHost = t._getRootDataHost(), this._setupConfigure(e), this._registerHost(t), 
        this._beginHosting(), this.root = this.instanceTemplate(this._template), this.root.__noContent = !this._notes._hasContent, 
        this.root.__styleScoped = !0, this._endHosting(), this._marshalAnnotatedNodes(), 
        this._marshalInstanceEffects(), this._marshalAnnotatedListeners();
        for (var i = [], n = this.root.firstChild; n; n = n.nextSibling) i.push(n), n._templateInstance = this;
        this._children = i, t.__hideTemplateChildren__ && this._showHideChildren(!0), this._tryReady();
    },
    _listenImpl: function(e, t, i) {
        var n = this, o = this._rootDataHost, r = o._createEventHandler(e, t, i);
        o._listen(e, t, function(e) {
            e.model = n, r(e);
        });
    },
    _scopeElementClassImpl: function(e, t) {
        var i = this._rootDataHost;
        return i ? i._scopeElementClass(e, t) : t;
    },
    stamp: function(e) {
        if (e = e || {}, this._parentProps) {
            var t = this._templatized;
            for (var i in this._parentProps) void 0 === e[i] && (e[i] = t[this._parentPropPrefix + i]);
        }
        return new this.ctor(e, this);
    },
    modelForElement: function(e) {
        for (var t; e; ) if (t = e._templateInstance) {
            if (t.dataHost == this) return t;
            e = t.dataHost;
        } else e = e.parentNode;
    }
}, Polymer({
    is: "dom-template",
    extends: "template",
    _template: null,
    behaviors: [ Polymer.Templatizer ],
    ready: function() {
        this.templatize(this);
    }
}), Polymer._collections = new WeakMap(), Polymer.Collection = function(e) {
    Polymer._collections.set(e, this), this.userArray = e, this.store = e.slice(), this.initMap();
}, Polymer.Collection.prototype = {
    constructor: Polymer.Collection,
    initMap: function() {
        for (var e = this.omap = new WeakMap(), t = this.pmap = {}, i = this.store, n = 0; n < i.length; n++) {
            var o = i[n];
            o && "object" == typeof o ? e.set(o, n) : t[o] = n;
        }
    },
    add: function(e) {
        var t = this.store.push(e) - 1;
        return e && "object" == typeof e ? this.omap.set(e, t) : this.pmap[e] = t, "#" + t;
    },
    removeKey: function(e) {
        (e = this._parseKey(e)) && (this._removeFromMap(this.store[e]), delete this.store[e]);
    },
    _removeFromMap: function(e) {
        e && "object" == typeof e ? this.omap.delete(e) : delete this.pmap[e];
    },
    remove: function(e) {
        var t = this.getKey(e);
        return this.removeKey(t), t;
    },
    getKey: function(e) {
        var t;
        if (void 0 != (t = e && "object" == typeof e ? this.omap.get(e) : this.pmap[e])) return "#" + t;
    },
    getKeys: function() {
        return Object.keys(this.store).map(function(e) {
            return "#" + e;
        });
    },
    _parseKey: function(e) {
        if (e && "#" == e[0]) return e.slice(1);
    },
    setItem: function(e, t) {
        if (e = this._parseKey(e)) {
            var i = this.store[e];
            i && this._removeFromMap(i), t && "object" == typeof t ? this.omap.set(t, e) : this.pmap[t] = e, 
            this.store[e] = t;
        }
    },
    getItem: function(e) {
        if (e = this._parseKey(e)) return this.store[e];
    },
    getItems: function() {
        var e = [], t = this.store;
        for (var i in t) e.push(t[i]);
        return e;
    },
    _applySplices: function(e) {
        for (var t, i, n = {}, o = 0; o < e.length && (i = e[o]); o++) {
            i.addedKeys = [];
            for (var r = 0; r < i.removed.length; r++) n[t = this.getKey(i.removed[r])] = n[t] ? null : -1;
            for (r = 0; r < i.addedCount; r++) {
                var s = this.userArray[i.index + r];
                n[t = void 0 === (t = this.getKey(s)) ? this.add(s) : t] = n[t] ? null : 1, i.addedKeys.push(t);
            }
        }
        var a = [], l = [];
        for (t in n) n[t] < 0 && (this.removeKey(t), a.push(t)), n[t] > 0 && l.push(t);
        return [ {
            removed: a,
            added: l
        } ];
    }
}, Polymer.Collection.get = function(e) {
    return Polymer._collections.get(e) || new Polymer.Collection(e);
}, Polymer.Collection.applySplices = function(e, t) {
    var i = Polymer._collections.get(e);
    return i ? i._applySplices(t) : null;
}, Polymer({
    is: "dom-repeat",
    extends: "template",
    _template: null,
    properties: {
        items: {
            type: Array
        },
        as: {
            type: String,
            value: "item"
        },
        indexAs: {
            type: String,
            value: "index"
        },
        sort: {
            type: Function,
            observer: "_sortChanged"
        },
        filter: {
            type: Function,
            observer: "_filterChanged"
        },
        observe: {
            type: String,
            observer: "_observeChanged"
        },
        delay: Number,
        renderedItemCount: {
            type: Number,
            notify: !Polymer.Settings.suppressTemplateNotifications,
            readOnly: !0
        },
        initialCount: {
            type: Number,
            observer: "_initializeChunking"
        },
        targetFramerate: {
            type: Number,
            value: 20
        },
        notifyDomChange: {
            type: Boolean
        },
        _targetFrameTime: {
            type: Number,
            computed: "_computeFrameTime(targetFramerate)"
        }
    },
    behaviors: [ Polymer.Templatizer ],
    observers: [ "_itemsChanged(items.*)" ],
    created: function() {
        this._instances = [], this._pool = [], this._limit = 1 / 0;
        var e = this;
        this._boundRenderChunk = function() {
            e._renderChunk();
        };
    },
    detached: function() {
        this.__isDetached = !0;
        for (var e = 0; e < this._instances.length; e++) this._detachInstance(e);
    },
    attached: function() {
        if (this.__isDetached) {
            this.__isDetached = !1;
            var e, t = Polymer.dom(this).parentNode;
            t.localName == this.is ? (e = t, t = Polymer.dom(t).parentNode) : e = this;
            for (var i = Polymer.dom(t), n = 0; n < this._instances.length; n++) this._attachInstance(n, i, e);
        }
    },
    ready: function() {
        this._instanceProps = {
            __key__: !0
        }, this._instanceProps[this.as] = !0, this._instanceProps[this.indexAs] = !0, this.ctor || this.templatize(this);
    },
    _sortChanged: function(e) {
        var t = this._getRootDataHost();
        this._sortFn = e && ("function" == typeof e ? e : function() {
            return t[e].apply(t, arguments);
        }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render);
    },
    _filterChanged: function(e) {
        var t = this._getRootDataHost();
        this._filterFn = e && ("function" == typeof e ? e : function() {
            return t[e].apply(t, arguments);
        }), this._needFullRefresh = !0, this.items && this._debounceTemplate(this._render);
    },
    _computeFrameTime: function(e) {
        return Math.ceil(1e3 / e);
    },
    _initializeChunking: function() {
        this.initialCount && (this._limit = this.initialCount, this._chunkCount = this.initialCount, 
        this._lastChunkTime = performance.now());
    },
    _tryRenderChunk: function() {
        this.items && this._limit < this.items.length && this.debounce("renderChunk", this._requestRenderChunk);
    },
    _requestRenderChunk: function() {
        requestAnimationFrame(this._boundRenderChunk);
    },
    _renderChunk: function() {
        var e = performance.now(), t = this._targetFrameTime / (e - this._lastChunkTime);
        this._chunkCount = Math.round(this._chunkCount * t) || 1, this._limit += this._chunkCount, 
        this._lastChunkTime = e, this._debounceTemplate(this._render);
    },
    _observeChanged: function() {
        this._observePaths = this.observe && this.observe.replace(".*", ".").split(" ");
    },
    _itemsChanged: function(e) {
        if ("items" == e.path) Array.isArray(this.items) ? this.collection = Polymer.Collection.get(this.items) : this.items ? this._error(this._logf("dom-repeat", "expected array for `items`, found", this.items)) : this.collection = null, 
        this._keySplices = [], this._indexSplices = [], this._needFullRefresh = !0, this._initializeChunking(), 
        this._debounceTemplate(this._render); else if ("items.splices" == e.path) this._keySplices = this._keySplices.concat(e.value.keySplices), 
        this._indexSplices = this._indexSplices.concat(e.value.indexSplices), this._debounceTemplate(this._render); else {
            var t = e.path.slice(6);
            this._forwardItemPath(t, e.value), this._checkObservedPaths(t);
        }
    },
    _checkObservedPaths: function(e) {
        if (this._observePaths) {
            e = e.substring(e.indexOf(".") + 1);
            for (var t = this._observePaths, i = 0; i < t.length; i++) if (0 === e.indexOf(t[i])) return this._needFullRefresh = !0, 
            void (this.delay ? this.debounce("render", this._render, this.delay) : this._debounceTemplate(this._render));
        }
    },
    render: function() {
        this._needFullRefresh = !0, this._debounceTemplate(this._render), this._flushTemplates();
    },
    _render: function() {
        this._needFullRefresh ? (this._applyFullRefresh(), this._needFullRefresh = !1) : this._keySplices.length && (this._sortFn ? this._applySplicesUserSort(this._keySplices) : this._filterFn ? this._applyFullRefresh() : this._applySplicesArrayOrder(this._indexSplices)), 
        this._keySplices = [], this._indexSplices = [];
        for (var e = this._keyToInstIdx = {}, t = this._instances.length - 1; t >= 0; t--) {
            var i = this._instances[t];
            i.isPlaceholder && t < this._limit ? i = this._insertInstance(t, i.__key__) : !i.isPlaceholder && t >= this._limit && (i = this._downgradeInstance(t, i.__key__)), 
            e[i.__key__] = t, i.isPlaceholder || i.__setProperty(this.indexAs, t, !0);
        }
        this._pool.length = 0, this._setRenderedItemCount(this._instances.length), Polymer.Settings.suppressTemplateNotifications && !this.notifyDomChange || this.fire("dom-change"), 
        this._tryRenderChunk();
    },
    _applyFullRefresh: function() {
        var e, t = this.collection;
        if (this._sortFn) e = t ? t.getKeys() : []; else {
            e = [];
            var i = this.items;
            if (i) for (var n = 0; n < i.length; n++) e.push(t.getKey(i[n]));
        }
        var o = this;
        for (this._filterFn && (e = e.filter(function(e) {
            return o._filterFn(t.getItem(e));
        })), this._sortFn && e.sort(function(e, i) {
            return o._sortFn(t.getItem(e), t.getItem(i));
        }), n = 0; n < e.length; n++) {
            var r = e[n], s = this._instances[n];
            s ? (s.__key__ = r, !s.isPlaceholder && n < this._limit && s.__setProperty(this.as, t.getItem(r), !0)) : n < this._limit ? this._insertInstance(n, r) : this._insertPlaceholder(n, r);
        }
        for (var a = this._instances.length - 1; a >= n; a--) this._detachAndRemoveInstance(a);
    },
    _numericSort: function(e, t) {
        return e - t;
    },
    _applySplicesUserSort: function(e) {
        for (var t, i, n = this.collection, o = {}, r = 0; r < e.length && (i = e[r]); r++) {
            for (var s = 0; s < i.removed.length; s++) o[t = i.removed[s]] = o[t] ? null : -1;
            for (s = 0; s < i.added.length; s++) o[t = i.added[s]] = o[t] ? null : 1;
        }
        var a = [], l = [];
        for (t in o) -1 === o[t] && a.push(this._keyToInstIdx[t]), 1 === o[t] && l.push(t);
        if (a.length) for (a.sort(this._numericSort), r = a.length - 1; r >= 0; r--) {
            var h = a[r];
            void 0 !== h && this._detachAndRemoveInstance(h);
        }
        var c = this;
        if (l.length) {
            this._filterFn && (l = l.filter(function(e) {
                return c._filterFn(n.getItem(e));
            })), l.sort(function(e, t) {
                return c._sortFn(n.getItem(e), n.getItem(t));
            });
            var u = 0;
            for (r = 0; r < l.length; r++) u = this._insertRowUserSort(u, l[r]);
        }
    },
    _insertRowUserSort: function(e, t) {
        for (var i = this.collection, n = i.getItem(t), o = this._instances.length - 1, r = -1; e <= o; ) {
            var s = e + o >> 1, a = this._instances[s].__key__, l = this._sortFn(i.getItem(a), n);
            if (l < 0) e = s + 1; else {
                if (!(l > 0)) {
                    r = s;
                    break;
                }
                o = s - 1;
            }
        }
        return r < 0 && (r = o + 1), this._insertPlaceholder(r, t), r;
    },
    _applySplicesArrayOrder: function(e) {
        for (var t, i = 0; i < e.length && (t = e[i]); i++) {
            for (var n = 0; n < t.removed.length; n++) this._detachAndRemoveInstance(t.index);
            for (n = 0; n < t.addedKeys.length; n++) this._insertPlaceholder(t.index + n, t.addedKeys[n]);
        }
    },
    _detachInstance: function(e) {
        var t = this._instances[e];
        if (!t.isPlaceholder) {
            for (var i = 0; i < t._children.length; i++) {
                var n = t._children[i];
                Polymer.dom(t.root).appendChild(n);
            }
            return t;
        }
    },
    _attachInstance: function(e, t, i) {
        var n = this._instances[e];
        n.isPlaceholder || t.insertBefore(n.root, i);
    },
    _detachAndRemoveInstance: function(e) {
        var t = this._detachInstance(e);
        t && this._pool.push(t), this._instances.splice(e, 1);
    },
    _insertPlaceholder: function(e, t) {
        this._instances.splice(e, 0, {
            isPlaceholder: !0,
            __key__: t
        });
    },
    _stampInstance: function(e, t) {
        var i = {
            __key__: t
        };
        return i[this.as] = this.collection.getItem(t), i[this.indexAs] = e, this.stamp(i);
    },
    _insertInstance: function(e, t) {
        var i = this._pool.pop();
        i ? (i.__setProperty(this.as, this.collection.getItem(t), !0), i.__setProperty("__key__", t, !0)) : i = this._stampInstance(e, t);
        var n = this._instances[e + 1], o = n && !n.isPlaceholder ? n._children[0] : this, r = Polymer.dom(this).parentNode;
        return r.localName == this.is && (o == this && (o = r), r = Polymer.dom(r).parentNode), 
        Polymer.dom(r).insertBefore(i.root, o), this._instances[e] = i, i;
    },
    _downgradeInstance: function(e, t) {
        var i = this._detachInstance(e);
        return i && this._pool.push(i), i = {
            isPlaceholder: !0,
            __key__: t
        }, this._instances[e] = i, i;
    },
    _showHideChildren: function(e) {
        for (var t = 0; t < this._instances.length; t++) this._instances[t].isPlaceholder || this._instances[t]._showHideChildren(e);
    },
    _forwardInstanceProp: function(e, t, i) {
        if (t == this.as) {
            var n;
            n = this._sortFn || this._filterFn ? this.items.indexOf(this.collection.getItem(e.__key__)) : e[this.indexAs], 
            this.set("items." + n, i);
        }
    },
    _forwardInstancePath: function(e, t, i) {
        0 === t.indexOf(this.as + ".") && this._notifyPath("items." + e.__key__ + "." + t.slice(this.as.length + 1), i);
    },
    _forwardParentProp: function(e, t) {
        for (var i, n = this._instances, o = 0; o < n.length && (i = n[o]); o++) i.isPlaceholder || i.__setProperty(e, t, !0);
    },
    _forwardParentPath: function(e, t) {
        for (var i, n = this._instances, o = 0; o < n.length && (i = n[o]); o++) i.isPlaceholder || i._notifyPath(e, t, !0);
    },
    _forwardItemPath: function(e, t) {
        if (this._keyToInstIdx) {
            var i = e.indexOf("."), n = e.substring(0, i < 0 ? e.length : i), o = this._keyToInstIdx[n], r = this._instances[o];
            r && !r.isPlaceholder && (i >= 0 ? (e = this.as + "." + e.substring(i + 1), r._notifyPath(e, t, !0)) : r.__setProperty(this.as, t, !0));
        }
    },
    itemForElement: function(e) {
        var t = this.modelForElement(e);
        return t && t[this.as];
    },
    keyForElement: function(e) {
        var t = this.modelForElement(e);
        return t && t.__key__;
    },
    indexForElement: function(e) {
        var t = this.modelForElement(e);
        return t && t[this.indexAs];
    }
}), Polymer({
    is: "array-selector",
    _template: null,
    properties: {
        items: {
            type: Array,
            observer: "clearSelection"
        },
        multi: {
            type: Boolean,
            value: !1,
            observer: "clearSelection"
        },
        selected: {
            type: Object,
            notify: !0
        },
        selectedItem: {
            type: Object,
            notify: !0
        },
        toggle: {
            type: Boolean,
            value: !1
        }
    },
    clearSelection: function() {
        if (Array.isArray(this.selected)) for (var e = 0; e < this.selected.length; e++) this.unlinkPaths("selected." + e); else this.unlinkPaths("selected"), 
        this.unlinkPaths("selectedItem");
        this.multi ? this.selected && !this.selected.length || (this.selected = [], this._selectedColl = Polymer.Collection.get(this.selected)) : (this.selected = null, 
        this._selectedColl = null), this.selectedItem = null;
    },
    isSelected: function(e) {
        return this.multi ? void 0 !== this._selectedColl.getKey(e) : this.selected == e;
    },
    deselect: function(e) {
        if (this.multi) {
            if (this.isSelected(e)) {
                var t = this._selectedColl.getKey(e);
                this.arrayDelete("selected", e), this.unlinkPaths("selected." + t);
            }
        } else this.selected = null, this.selectedItem = null, this.unlinkPaths("selected"), 
        this.unlinkPaths("selectedItem");
    },
    select: function(e) {
        var t = Polymer.Collection.get(this.items).getKey(e);
        if (this.multi) if (this.isSelected(e)) this.toggle && this.deselect(e); else {
            this.push("selected", e);
            var i = this._selectedColl.getKey(e);
            this.linkPaths("selected." + i, "items." + t);
        } else this.toggle && e == this.selected ? this.deselect() : (this.selected = e, 
        this.selectedItem = e, this.linkPaths("selected", "items." + t), this.linkPaths("selectedItem", "items." + t));
    }
}), Polymer({
    is: "dom-if",
    extends: "template",
    _template: null,
    properties: {
        if: {
            type: Boolean,
            value: !1,
            observer: "_queueRender"
        },
        restamp: {
            type: Boolean,
            value: !1,
            observer: "_queueRender"
        },
        notifyDomChange: {
            type: Boolean
        }
    },
    behaviors: [ Polymer.Templatizer ],
    _queueRender: function() {
        this._debounceTemplate(this._render);
    },
    detached: function() {
        var e = this.parentNode;
        e && e.localName == this.is && (e = Polymer.dom(e).parentNode), e && (e.nodeType != Node.DOCUMENT_FRAGMENT_NODE || Polymer.Settings.hasShadow && e instanceof ShadowRoot) || this._teardownInstance();
    },
    attached: function() {
        this.if && this.ctor && this.async(this._ensureInstance);
    },
    render: function() {
        this._flushTemplates();
    },
    _render: function() {
        this.if ? (this.ctor || this.templatize(this), this._ensureInstance(), this._showHideChildren()) : this.restamp && this._teardownInstance(), 
        !this.restamp && this._instance && this._showHideChildren(), this.if != this._lastIf && (Polymer.Settings.suppressTemplateNotifications && !this.notifyDomChange || this.fire("dom-change"), 
        this._lastIf = this.if);
    },
    _ensureInstance: function() {
        var e, t = Polymer.dom(this).parentNode;
        if (t && t.localName == this.is ? (e = t, t = Polymer.dom(t).parentNode) : e = this, 
        t) if (this._instance) {
            var i = this._instance._children;
            if (i && i.length && Polymer.dom(e).previousSibling !== i[i.length - 1]) for (var n, o = 0; o < i.length && (n = i[o]); o++) Polymer.dom(t).insertBefore(n, e);
        } else {
            this._instance = this.stamp();
            var r = this._instance.root;
            Polymer.dom(t).insertBefore(r, e);
        }
    },
    _teardownInstance: function() {
        if (this._instance) {
            var e = this._instance._children;
            if (e && e.length) for (var t, i = Polymer.dom(Polymer.dom(e[0]).parentNode), n = 0; n < e.length && (t = e[n]); n++) i.removeChild(t);
            this._instance = null;
        }
    },
    _showHideChildren: function() {
        var e = this.__hideTemplateChildren__ || !this.if;
        this._instance && this._instance._showHideChildren(e);
    },
    _forwardParentProp: function(e, t) {
        this._instance && this._instance.__setProperty(e, t, !0);
    },
    _forwardParentPath: function(e, t) {
        this._instance && this._instance._notifyPath(e, t, !0);
    }
}), Polymer({
    is: "dom-bind",
    properties: {
        notifyDomChange: {
            type: Boolean
        }
    },
    extends: "template",
    _template: null,
    created: function() {
        var e = this;
        Polymer.RenderStatus.whenReady(function() {
            "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", function() {
                e._markImportsReady();
            }) : e._markImportsReady();
        });
    },
    _ensureReady: function() {
        this._readied || this._readySelf();
    },
    _markImportsReady: function() {
        this._importsReady = !0, this._ensureReady();
    },
    _registerFeatures: function() {
        this._prepConstructor();
    },
    _insertChildren: function() {
        var e, t = Polymer.dom(this).parentNode;
        t.localName == this.is ? (e = t, t = Polymer.dom(t).parentNode) : e = this, Polymer.dom(t).insertBefore(this.root, e);
    },
    _removeChildren: function() {
        if (this._children) for (var e = 0; e < this._children.length; e++) this.root.appendChild(this._children[e]);
    },
    _initFeatures: function() {},
    _scopeElementClass: function(e, t) {
        return this.dataHost ? this.dataHost._scopeElementClass(e, t) : t;
    },
    _configureInstanceProperties: function() {},
    _prepConfigure: function() {
        var e = {};
        for (var t in this._propertyEffects) e[t] = this[t];
        var i = this._setupConfigure;
        this._setupConfigure = function() {
            i.call(this, e);
        };
    },
    attached: function() {
        this._importsReady && this.render();
    },
    detached: function() {
        this._removeChildren();
    },
    render: function() {
        this._ensureReady(), this._children || (this._template = this, this._prepAnnotations(), 
        this._prepEffects(), this._prepBehaviors(), this._prepConfigure(), this._prepBindings(), 
        this._prepPropertyInfo(), Polymer.Base._initFeatures.call(this), this._children = Polymer.TreeApi.arrayCopyChildNodes(this.root)), 
        this._insertChildren(), Polymer.Settings.suppressTemplateNotifications && !this.notifyDomChange || this.fire("dom-change");
    }
}), function() {
    var e = {}, t = {}, i = null;
    Polymer.IronMeta = Polymer({
        is: "iron-meta",
        properties: {
            type: {
                type: String,
                value: "default",
                observer: "_typeChanged"
            },
            key: {
                type: String,
                observer: "_keyChanged"
            },
            value: {
                type: Object,
                notify: !0,
                observer: "_valueChanged"
            },
            self: {
                type: Boolean,
                observer: "_selfChanged"
            },
            list: {
                type: Array,
                notify: !0
            }
        },
        hostAttributes: {
            hidden: !0
        },
        factoryImpl: function(e) {
            if (e) for (var t in e) switch (t) {
              case "type":
              case "key":
              case "value":
                this[t] = e[t];
            }
        },
        created: function() {
            this._metaDatas = e, this._metaArrays = t;
        },
        _keyChanged: function(e, t) {
            this._resetRegistration(t);
        },
        _valueChanged: function(e) {
            this._resetRegistration(this.key);
        },
        _selfChanged: function(e) {
            e && (this.value = this);
        },
        _typeChanged: function(i) {
            this._unregisterKey(this.key), e[i] || (e[i] = {}), this._metaData = e[i], t[i] || (t[i] = []), 
            this.list = t[i], this._registerKeyValue(this.key, this.value);
        },
        byKey: function(e) {
            return this._metaData && this._metaData[e];
        },
        _resetRegistration: function(e) {
            this._unregisterKey(e), this._registerKeyValue(this.key, this.value);
        },
        _unregisterKey: function(e) {
            this._unregister(e, this._metaData, this.list);
        },
        _registerKeyValue: function(e, t) {
            this._register(e, t, this._metaData, this.list);
        },
        _register: function(e, t, i, n) {
            e && i && void 0 !== t && (i[e] = t, n.push(t));
        },
        _unregister: function(e, t, i) {
            if (e && t && e in t) {
                var n = t[e];
                delete t[e], this.arrayDelete(i, n);
            }
        }
    }), Polymer.IronMeta.getIronMeta = function() {
        return null === i && (i = new Polymer.IronMeta()), i;
    }, Polymer.IronMetaQuery = Polymer({
        is: "iron-meta-query",
        properties: {
            type: {
                type: String,
                value: "default",
                observer: "_typeChanged"
            },
            key: {
                type: String,
                observer: "_keyChanged"
            },
            value: {
                type: Object,
                notify: !0,
                readOnly: !0
            },
            list: {
                type: Array,
                notify: !0
            }
        },
        factoryImpl: function(e) {
            if (e) for (var t in e) switch (t) {
              case "type":
              case "key":
                this[t] = e[t];
            }
        },
        created: function() {
            this._metaDatas = e, this._metaArrays = t;
        },
        _keyChanged: function(e) {
            this._setValue(this._metaData && this._metaData[e]);
        },
        _typeChanged: function(i) {
            this._metaData = e[i], this.list = t[i], this.key && this._keyChanged(this.key);
        },
        byKey: function(e) {
            return this._metaData && this._metaData[e];
        }
    });
}(), Polymer({
    is: "iron-icon",
    properties: {
        icon: {
            type: String
        },
        theme: {
            type: String
        },
        src: {
            type: String
        },
        _meta: {
            value: Polymer.Base.create("iron-meta", {
                type: "iconset"
            })
        }
    },
    observers: [ "_updateIcon(_meta, isAttached)", "_updateIcon(theme, isAttached)", "_srcChanged(src, isAttached)", "_iconChanged(icon, isAttached)" ],
    _DEFAULT_ICONSET: "icons",
    _iconChanged: function(e) {
        var t = (e || "").split(":");
        this._iconName = t.pop(), this._iconsetName = t.pop() || this._DEFAULT_ICONSET, 
        this._updateIcon();
    },
    _srcChanged: function(e) {
        this._updateIcon();
    },
    _usesIconset: function() {
        return this.icon || !this.src;
    },
    _updateIcon: function() {
        this._usesIconset() ? (this._img && this._img.parentNode && Polymer.dom(this.root).removeChild(this._img), 
        "" === this._iconName ? this._iconset && this._iconset.removeIcon(this) : this._iconsetName && this._meta && (this._iconset = this._meta.byKey(this._iconsetName), 
        this._iconset ? (this._iconset.applyIcon(this, this._iconName, this.theme), this.unlisten(window, "iron-iconset-added", "_updateIcon")) : this.listen(window, "iron-iconset-added", "_updateIcon"))) : (this._iconset && this._iconset.removeIcon(this), 
        this._img || (this._img = document.createElement("img"), this._img.style.width = "100%", 
        this._img.style.height = "100%", this._img.draggable = !1), this._img.src = this.src, 
        Polymer.dom(this.root).appendChild(this._img));
    }
}), Polymer({
    is: "iron-image",
    properties: {
        src: {
            observer: "_srcChanged",
            type: String,
            value: ""
        },
        alt: {
            type: String,
            value: null
        },
        preventLoad: {
            type: Boolean,
            value: !1,
            observer: "_preventLoadChanged"
        },
        sizing: {
            type: String,
            value: null,
            reflectToAttribute: !0
        },
        position: {
            type: String,
            value: "center"
        },
        preload: {
            type: Boolean,
            value: !1
        },
        placeholder: {
            type: String,
            value: null,
            observer: "_placeholderChanged"
        },
        fade: {
            type: Boolean,
            value: !1
        },
        loaded: {
            notify: !0,
            readOnly: !0,
            type: Boolean,
            value: !1
        },
        loading: {
            notify: !0,
            readOnly: !0,
            type: Boolean,
            value: !1
        },
        error: {
            notify: !0,
            readOnly: !0,
            type: Boolean,
            value: !1
        },
        width: {
            observer: "_widthChanged",
            type: Number,
            value: null
        },
        height: {
            observer: "_heightChanged",
            type: Number,
            value: null
        }
    },
    observers: [ "_transformChanged(sizing, position)" ],
    ready: function() {
        var e = this.$.img;
        e.onload = function() {
            this.$.img.src === this._resolveSrc(this.src) && (this._setLoading(!1), this._setLoaded(!0), 
            this._setError(!1));
        }.bind(this), e.onerror = function() {
            this.$.img.src === this._resolveSrc(this.src) && (this._reset(), this._setLoading(!1), 
            this._setLoaded(!1), this._setError(!0));
        }.bind(this), this._resolvedSrc = "";
    },
    _load: function(e) {
        e ? this.$.img.src = e : this.$.img.removeAttribute("src"), this.$.sizedImgDiv.style.backgroundImage = e ? 'url("' + e + '")' : "", 
        this._setLoading(!!e), this._setLoaded(!1), this._setError(!1);
    },
    _reset: function() {
        this.$.img.removeAttribute("src"), this.$.sizedImgDiv.style.backgroundImage = "", 
        this._setLoading(!1), this._setLoaded(!1), this._setError(!1);
    },
    _computePlaceholderHidden: function() {
        return !this.preload || !this.fade && !this.loading && this.loaded;
    },
    _computePlaceholderClassName: function() {
        return this.preload && this.fade && !this.loading && this.loaded ? "faded-out" : "";
    },
    _computeImgDivHidden: function() {
        return !this.sizing;
    },
    _computeImgDivARIAHidden: function() {
        return "" === this.alt ? "true" : void 0;
    },
    _computeImgDivARIALabel: function() {
        if (null !== this.alt) return this.alt;
        if ("" === this.src) return "";
        var e = new URL(this._resolveSrc(this.src)).pathname.split("/");
        return e[e.length - 1];
    },
    _computeImgHidden: function() {
        return !!this.sizing;
    },
    _widthChanged: function() {
        this.style.width = isNaN(this.width) ? this.width : this.width + "px";
    },
    _heightChanged: function() {
        this.style.height = isNaN(this.height) ? this.height : this.height + "px";
    },
    _preventLoadChanged: function() {
        this.preventLoad || this.loaded || (this._reset(), this._load(this.src));
    },
    _srcChanged: function(e, t) {
        var i = this._resolveSrc(e);
        i !== this._resolvedSrc && (this._resolvedSrc = i, this._reset(), this.preventLoad || this._load(e));
    },
    _placeholderChanged: function() {
        this.$.placeholder.style.backgroundImage = this.placeholder ? 'url("' + this.placeholder + '")' : "";
    },
    _transformChanged: function() {
        var e = this.$.sizedImgDiv.style, t = this.$.placeholder.style;
        e.backgroundSize = t.backgroundSize = this.sizing, e.backgroundPosition = t.backgroundPosition = this.sizing ? this.position : "", 
        e.backgroundRepeat = t.backgroundRepeat = this.sizing ? "no-repeat" : "";
    },
    _resolveSrc: function(e) {
        var t = this.ownerDocument.baseURI;
        return new URL(Polymer.ResolveUrl.resolveUrl(e, t), t).href;
    }
}), Polymer({
    is: "iron-media-query",
    properties: {
        queryMatches: {
            type: Boolean,
            value: !1,
            readOnly: !0,
            notify: !0
        },
        query: {
            type: String,
            observer: "queryChanged"
        },
        full: {
            type: Boolean,
            value: !1
        },
        _boundMQHandler: {
            value: function() {
                return this.queryHandler.bind(this);
            }
        },
        _mq: {
            value: null
        }
    },
    attached: function() {
        this.style.display = "none", this.queryChanged();
    },
    detached: function() {
        this._remove();
    },
    _add: function() {
        this._mq && this._mq.addListener(this._boundMQHandler);
    },
    _remove: function() {
        this._mq && this._mq.removeListener(this._boundMQHandler), this._mq = null;
    },
    queryChanged: function() {
        this._remove();
        var e = this.query;
        e && (this.full || "(" === e[0] || (e = "(" + e + ")"), this._mq = window.matchMedia(e), 
        this._add(), this.queryHandler(this._mq));
    },
    queryHandler: function(e) {
        this._setQueryMatches(e.matches);
    }
}), Polymer.IronSelection = function(e) {
    this.selection = [], this.selectCallback = e;
}, Polymer.IronSelection.prototype = {
    get: function() {
        return this.multi ? this.selection.slice() : this.selection[0];
    },
    clear: function(e) {
        this.selection.slice().forEach(function(t) {
            (!e || e.indexOf(t) < 0) && this.setItemSelected(t, !1);
        }, this);
    },
    isSelected: function(e) {
        return this.selection.indexOf(e) >= 0;
    },
    setItemSelected: function(e, t) {
        if (null != e && t !== this.isSelected(e)) {
            if (t) this.selection.push(e); else {
                var i = this.selection.indexOf(e);
                i >= 0 && this.selection.splice(i, 1);
            }
            this.selectCallback && this.selectCallback(e, t);
        }
    },
    select: function(e) {
        this.multi ? this.toggle(e) : this.get() !== e && (this.setItemSelected(this.get(), !1), 
        this.setItemSelected(e, !0));
    },
    toggle: function(e) {
        this.setItemSelected(e, !this.isSelected(e));
    }
}, Polymer.IronSelectableBehavior = {
    properties: {
        attrForSelected: {
            type: String,
            value: null
        },
        selected: {
            type: String,
            notify: !0
        },
        selectedItem: {
            type: Object,
            readOnly: !0,
            notify: !0
        },
        activateEvent: {
            type: String,
            value: "tap",
            observer: "_activateEventChanged"
        },
        selectable: String,
        selectedClass: {
            type: String,
            value: "iron-selected"
        },
        selectedAttribute: {
            type: String,
            value: null
        },
        fallbackSelection: {
            type: String,
            value: null
        },
        items: {
            type: Array,
            readOnly: !0,
            notify: !0,
            value: function() {
                return [];
            }
        },
        _excludedLocalNames: {
            type: Object,
            value: function() {
                return {
                    template: 1
                };
            }
        }
    },
    observers: [ "_updateAttrForSelected(attrForSelected)", "_updateSelected(selected)", "_checkFallback(fallbackSelection)" ],
    created: function() {
        this._bindFilterItem = this._filterItem.bind(this), this._selection = new Polymer.IronSelection(this._applySelection.bind(this));
    },
    attached: function() {
        this._observer = this._observeItems(this), this._updateItems(), this._shouldUpdateSelection || this._updateSelected(), 
        this._addListener(this.activateEvent);
    },
    detached: function() {
        this._observer && Polymer.dom(this).unobserveNodes(this._observer), this._removeListener(this.activateEvent);
    },
    indexOf: function(e) {
        return this.items.indexOf(e);
    },
    select: function(e) {
        this.selected = e;
    },
    selectPrevious: function() {
        var e = this.items.length, t = (Number(this._valueToIndex(this.selected)) - 1 + e) % e;
        this.selected = this._indexToValue(t);
    },
    selectNext: function() {
        var e = (Number(this._valueToIndex(this.selected)) + 1) % this.items.length;
        this.selected = this._indexToValue(e);
    },
    selectIndex: function(e) {
        this.select(this._indexToValue(e));
    },
    forceSynchronousItemUpdate: function() {
        this._updateItems();
    },
    get _shouldUpdateSelection() {
        return null != this.selected;
    },
    _checkFallback: function() {
        this._shouldUpdateSelection && this._updateSelected();
    },
    _addListener: function(e) {
        this.listen(this, e, "_activateHandler");
    },
    _removeListener: function(e) {
        this.unlisten(this, e, "_activateHandler");
    },
    _activateEventChanged: function(e, t) {
        this._removeListener(t), this._addListener(e);
    },
    _updateItems: function() {
        var e = Polymer.dom(this).queryDistributedElements(this.selectable || "*");
        e = Array.prototype.filter.call(e, this._bindFilterItem), this._setItems(e);
    },
    _updateAttrForSelected: function() {
        this._shouldUpdateSelection && (this.selected = this._indexToValue(this.indexOf(this.selectedItem)));
    },
    _updateSelected: function() {
        this._selectSelected(this.selected);
    },
    _selectSelected: function(e) {
        this._selection.select(this._valueToItem(this.selected)), this.fallbackSelection && this.items.length && void 0 === this._selection.get() && (this.selected = this.fallbackSelection);
    },
    _filterItem: function(e) {
        return !this._excludedLocalNames[e.localName];
    },
    _valueToItem: function(e) {
        return null == e ? null : this.items[this._valueToIndex(e)];
    },
    _valueToIndex: function(e) {
        if (!this.attrForSelected) return Number(e);
        for (var t, i = 0; t = this.items[i]; i++) if (this._valueForItem(t) == e) return i;
    },
    _indexToValue: function(e) {
        if (!this.attrForSelected) return e;
        var t = this.items[e];
        return t ? this._valueForItem(t) : void 0;
    },
    _valueForItem: function(e) {
        var t = e[Polymer.CaseMap.dashToCamelCase(this.attrForSelected)];
        return void 0 != t ? t : e.getAttribute(this.attrForSelected);
    },
    _applySelection: function(e, t) {
        this.selectedClass && this.toggleClass(this.selectedClass, t, e), this.selectedAttribute && this.toggleAttribute(this.selectedAttribute, t, e), 
        this._selectionChange(), this.fire("iron-" + (t ? "select" : "deselect"), {
            item: e
        });
    },
    _selectionChange: function() {
        this._setSelectedItem(this._selection.get());
    },
    _observeItems: function(e) {
        return Polymer.dom(e).observeNodes(function(e) {
            this._updateItems(), this._shouldUpdateSelection && this._updateSelected(), this.fire("iron-items-changed", e, {
                bubbles: !1,
                cancelable: !1
            });
        });
    },
    _activateHandler: function(e) {
        for (var t = e.target, i = this.items; t && t != this; ) {
            var n = i.indexOf(t);
            if (n >= 0) {
                var o = this._indexToValue(n);
                return void this._itemActivate(o, t);
            }
            t = t.parentNode;
        }
    },
    _itemActivate: function(e, t) {
        this.fire("iron-activate", {
            selected: e,
            item: t
        }, {
            cancelable: !0
        }).defaultPrevented || this.select(e);
    }
}, Polymer.IronMultiSelectableBehaviorImpl = {
    properties: {
        multi: {
            type: Boolean,
            value: !1,
            observer: "multiChanged"
        },
        selectedValues: {
            type: Array,
            notify: !0
        },
        selectedItems: {
            type: Array,
            readOnly: !0,
            notify: !0
        }
    },
    observers: [ "_updateSelected(selectedValues.splices)" ],
    select: function(e) {
        this.multi ? this.selectedValues ? this._toggleSelected(e) : this.selectedValues = [ e ] : this.selected = e;
    },
    multiChanged: function(e) {
        this._selection.multi = e;
    },
    get _shouldUpdateSelection() {
        return null != this.selected || null != this.selectedValues && this.selectedValues.length;
    },
    _updateAttrForSelected: function() {
        this.multi ? this._shouldUpdateSelection && (this.selectedValues = this.selectedItems.map(function(e) {
            return this._indexToValue(this.indexOf(e));
        }, this).filter(function(e) {
            return null != e;
        }, this)) : Polymer.IronSelectableBehavior._updateAttrForSelected.apply(this);
    },
    _updateSelected: function() {
        this.multi ? this._selectMulti(this.selectedValues) : this._selectSelected(this.selected);
    },
    _selectMulti: function(e) {
        if (e) {
            var t = this._valuesToItems(e);
            this._selection.clear(t);
            for (var i = 0; i < t.length; i++) this._selection.setItemSelected(t[i], !0);
            this.fallbackSelection && this.items.length && !this._selection.get().length && this._valueToItem(this.fallbackSelection) && (this.selectedValues = [ this.fallbackSelection ]);
        } else this._selection.clear();
    },
    _selectionChange: function() {
        var e = this._selection.get();
        this.multi ? this._setSelectedItems(e) : (this._setSelectedItems([ e ]), this._setSelectedItem(e));
    },
    _toggleSelected: function(e) {
        var t = this.selectedValues.indexOf(e);
        t < 0 ? this.push("selectedValues", e) : this.splice("selectedValues", t, 1);
    },
    _valuesToItems: function(e) {
        return null == e ? null : e.map(function(e) {
            return this._valueToItem(e);
        }, this);
    }
}, Polymer.IronMultiSelectableBehavior = [ Polymer.IronSelectableBehavior, Polymer.IronMultiSelectableBehaviorImpl ], 
Polymer({
    is: "iron-selector",
    behaviors: [ Polymer.IronMultiSelectableBehavior ]
}), Polymer.IronResizableBehavior = {
    properties: {
        _parentResizable: {
            type: Object,
            observer: "_parentResizableChanged"
        },
        _notifyingDescendant: {
            type: Boolean,
            value: !1
        }
    },
    listeners: {
        "iron-request-resize-notifications": "_onIronRequestResizeNotifications"
    },
    created: function() {
        this._interestedResizables = [], this._boundNotifyResize = this.notifyResize.bind(this);
    },
    attached: function() {
        this.fire("iron-request-resize-notifications", null, {
            node: this,
            bubbles: !0,
            cancelable: !0
        }), this._parentResizable || (window.addEventListener("resize", this._boundNotifyResize), 
        this.notifyResize());
    },
    detached: function() {
        this._parentResizable ? this._parentResizable.stopResizeNotificationsFor(this) : window.removeEventListener("resize", this._boundNotifyResize), 
        this._parentResizable = null;
    },
    notifyResize: function() {
        this.isAttached && (this._interestedResizables.forEach(function(e) {
            this.resizerShouldNotify(e) && this._notifyDescendant(e);
        }, this), this._fireResize());
    },
    assignParentResizable: function(e) {
        this._parentResizable = e;
    },
    stopResizeNotificationsFor: function(e) {
        var t = this._interestedResizables.indexOf(e);
        t > -1 && (this._interestedResizables.splice(t, 1), this.unlisten(e, "iron-resize", "_onDescendantIronResize"));
    },
    resizerShouldNotify: function(e) {
        return !0;
    },
    _onDescendantIronResize: function(e) {
        this._notifyingDescendant ? e.stopPropagation() : Polymer.Settings.useShadow || this._fireResize();
    },
    _fireResize: function() {
        this.fire("iron-resize", null, {
            node: this,
            bubbles: !1
        });
    },
    _onIronRequestResizeNotifications: function(e) {
        var t = e.path ? e.path[0] : e.target;
        t !== this && (-1 === this._interestedResizables.indexOf(t) && (this._interestedResizables.push(t), 
        this.listen(t, "iron-resize", "_onDescendantIronResize")), t.assignParentResizable(this), 
        this._notifyDescendant(t), e.stopPropagation());
    },
    _parentResizableChanged: function(e) {
        e && window.removeEventListener("resize", this._boundNotifyResize);
    },
    _notifyDescendant: function(e) {
        this.isAttached && (this._notifyingDescendant = !0, e.notifyResize(), this._notifyingDescendant = !1);
    }
}, function() {
    "use strict";
    function e(e) {
        var t = [];
        for (var i in e) e.hasOwnProperty(i) && e[i] && t.push(i);
        return t.join(" ");
    }
    var t = null;
    Polymer({
        is: "paper-drawer-panel",
        behaviors: [ Polymer.IronResizableBehavior ],
        properties: {
            defaultSelected: {
                type: String,
                value: "main"
            },
            disableEdgeSwipe: {
                type: Boolean,
                value: !1
            },
            disableSwipe: {
                type: Boolean,
                value: !1
            },
            dragging: {
                type: Boolean,
                value: !1,
                readOnly: !0,
                notify: !0
            },
            drawerWidth: {
                type: String,
                value: "256px"
            },
            edgeSwipeSensitivity: {
                type: Number,
                value: 30
            },
            forceNarrow: {
                type: Boolean,
                value: !1
            },
            hasTransform: {
                type: Boolean,
                value: function() {
                    return "transform" in this.style;
                }
            },
            hasWillChange: {
                type: Boolean,
                value: function() {
                    return "willChange" in this.style;
                }
            },
            narrow: {
                reflectToAttribute: !0,
                type: Boolean,
                value: !1,
                readOnly: !0,
                notify: !0
            },
            peeking: {
                type: Boolean,
                value: !1,
                readOnly: !0,
                notify: !0
            },
            responsiveWidth: {
                type: String,
                value: "768px"
            },
            rightDrawer: {
                type: Boolean,
                value: !1
            },
            selected: {
                reflectToAttribute: !0,
                notify: !0,
                type: String,
                value: null
            },
            drawerToggleAttribute: {
                type: String,
                value: "paper-drawer-toggle"
            },
            drawerFocusSelector: {
                type: String,
                value: 'a[href]:not([tabindex="-1"]),area[href]:not([tabindex="-1"]),input:not([disabled]):not([tabindex="-1"]),select:not([disabled]):not([tabindex="-1"]),textarea:not([disabled]):not([tabindex="-1"]),button:not([disabled]):not([tabindex="-1"]),iframe:not([tabindex="-1"]),[tabindex]:not([tabindex="-1"]),[contentEditable=true]:not([tabindex="-1"])'
            },
            _transition: {
                type: Boolean,
                value: !1
            }
        },
        listeners: {
            tap: "_onTap",
            track: "_onTrack",
            down: "_downHandler",
            up: "_upHandler",
            transitionend: "_onTransitionEnd"
        },
        observers: [ "_forceNarrowChanged(forceNarrow, defaultSelected)", "_toggleFocusListener(selected)" ],
        ready: function() {
            this._transition = !0, this._boundFocusListener = this._didFocus.bind(this);
        },
        togglePanel: function() {
            this._isMainSelected() ? this.openDrawer() : this.closeDrawer();
        },
        openDrawer: function() {
            requestAnimationFrame(function() {
                this.toggleClass("transition-drawer", !0, this.$.drawer), this.selected = "drawer";
            }.bind(this));
        },
        closeDrawer: function() {
            requestAnimationFrame(function() {
                this.toggleClass("transition-drawer", !0, this.$.drawer), this.selected = "main";
            }.bind(this));
        },
        _onTransitionEnd: function(e) {
            if (Polymer.dom(e).localTarget === this && ("left" !== e.propertyName && "right" !== e.propertyName || this.notifyResize(), 
            "transform" === e.propertyName && (requestAnimationFrame(function() {
                this.toggleClass("transition-drawer", !1, this.$.drawer);
            }.bind(this)), "drawer" === this.selected))) {
                var t = this._getAutoFocusedNode();
                t && t.focus();
            }
        },
        _computeIronSelectorClass: function(t, i, n, o, r) {
            return e({
                dragging: n,
                "narrow-layout": t,
                "right-drawer": o,
                "left-drawer": !o,
                transition: i,
                peeking: r
            });
        },
        _computeDrawerStyle: function(e) {
            return "width:" + e + ";";
        },
        _computeMainStyle: function(e, t, i) {
            var n = "";
            return n += "left:" + (e || t ? "0" : i) + ";", t && (n += "right:" + (e ? "" : i) + ";"), 
            n;
        },
        _computeMediaQuery: function(e, t) {
            return e ? "" : "(max-width: " + t + ")";
        },
        _computeSwipeOverlayHidden: function(e, t) {
            return !e || t;
        },
        _onTrack: function(e) {
            if (!t || this === t) switch (e.detail.state) {
              case "start":
                this._trackStart(e);
                break;

              case "track":
                this._trackX(e);
                break;

              case "end":
                this._trackEnd(e);
            }
        },
        _responsiveChange: function(e) {
            this._setNarrow(e), this.selected = this.narrow ? this.defaultSelected : null, this.setScrollDirection(this._swipeAllowed() ? "y" : "all"), 
            this.fire("paper-responsive-change", {
                narrow: this.narrow
            });
        },
        _onQueryMatchesChanged: function(e) {
            this._responsiveChange(e.detail.value);
        },
        _forceNarrowChanged: function() {
            this._responsiveChange(this.forceNarrow || this.$.mq.queryMatches);
        },
        _swipeAllowed: function() {
            return this.narrow && !this.disableSwipe;
        },
        _isMainSelected: function() {
            return "main" === this.selected;
        },
        _startEdgePeek: function() {
            this.width = this.$.drawer.offsetWidth, this._moveDrawer(this._translateXForDeltaX(this.rightDrawer ? -this.edgeSwipeSensitivity : this.edgeSwipeSensitivity)), 
            this._setPeeking(!0);
        },
        _stopEdgePeek: function() {
            this.peeking && (this._setPeeking(!1), this._moveDrawer(null));
        },
        _downHandler: function(e) {
            !this.dragging && this._isMainSelected() && this._isEdgeTouch(e) && !t && (this._startEdgePeek(), 
            e.preventDefault(), t = this);
        },
        _upHandler: function() {
            this._stopEdgePeek(), t = null;
        },
        _onTap: function(e) {
            var t = Polymer.dom(e).localTarget;
            t && this.drawerToggleAttribute && t.hasAttribute(this.drawerToggleAttribute) && this.togglePanel();
        },
        _isEdgeTouch: function(e) {
            var t = e.detail.x;
            return !this.disableEdgeSwipe && this._swipeAllowed() && (this.rightDrawer ? t >= this.offsetWidth - this.edgeSwipeSensitivity : t <= this.edgeSwipeSensitivity);
        },
        _trackStart: function(e) {
            this._swipeAllowed() && (t = this, this._setDragging(!0), this._isMainSelected() && this._setDragging(this.peeking || this._isEdgeTouch(e)), 
            this.dragging && (this.width = this.$.drawer.offsetWidth, this._transition = !1));
        },
        _translateXForDeltaX: function(e) {
            var t = this._isMainSelected();
            return this.rightDrawer ? Math.max(0, t ? this.width + e : e) : Math.min(0, t ? e - this.width : e);
        },
        _trackX: function(e) {
            if (this.dragging) {
                var t = e.detail.dx;
                if (this.peeking) {
                    if (Math.abs(t) <= this.edgeSwipeSensitivity) return;
                    this._setPeeking(!1);
                }
                this._moveDrawer(this._translateXForDeltaX(t));
            }
        },
        _trackEnd: function(e) {
            if (this.dragging) {
                var i = e.detail.dx > 0;
                this._setDragging(!1), this._transition = !0, t = null, this._moveDrawer(null), 
                this.rightDrawer ? this[i ? "closeDrawer" : "openDrawer"]() : this[i ? "openDrawer" : "closeDrawer"]();
            }
        },
        _transformForTranslateX: function(e) {
            return null === e ? "" : this.hasWillChange ? "translateX(" + e + "px)" : "translate3d(" + e + "px, 0, 0)";
        },
        _moveDrawer: function(e) {
            this.transform(this._transformForTranslateX(e), this.$.drawer);
        },
        _getDrawerContent: function() {
            return Polymer.dom(this.$.drawerContent).getDistributedNodes()[0];
        },
        _getAutoFocusedNode: function() {
            var e = this._getDrawerContent();
            return this.drawerFocusSelector ? Polymer.dom(e).querySelector(this.drawerFocusSelector) || e : null;
        },
        _toggleFocusListener: function(e) {
            "drawer" === e ? this.addEventListener("focus", this._boundFocusListener, !0) : this.removeEventListener("focus", this._boundFocusListener, !0);
        },
        _didFocus: function(e) {
            var t = this._getAutoFocusedNode();
            if (t) {
                var i = Polymer.dom(e).path, n = (i[0], this._getDrawerContent());
                -1 !== i.indexOf(n) || (e.stopPropagation(), t.focus());
            }
        },
        _isDrawerClosed: function(e, t) {
            return !e || "drawer" !== t;
        }
    });
}(), Polymer.NeonAnimatableBehavior = {
    properties: {
        animationConfig: {
            type: Object
        },
        entryAnimation: {
            observer: "_entryAnimationChanged",
            type: String
        },
        exitAnimation: {
            observer: "_exitAnimationChanged",
            type: String
        }
    },
    _entryAnimationChanged: function() {
        this.animationConfig = this.animationConfig || {}, this.animationConfig.entry = [ {
            name: this.entryAnimation,
            node: this
        } ];
    },
    _exitAnimationChanged: function() {
        this.animationConfig = this.animationConfig || {}, this.animationConfig.exit = [ {
            name: this.exitAnimation,
            node: this
        } ];
    },
    _copyProperties: function(e, t) {
        for (var i in t) e[i] = t[i];
    },
    _cloneConfig: function(e) {
        var t = {
            isClone: !0
        };
        return this._copyProperties(t, e), t;
    },
    _getAnimationConfigRecursive: function(e, t, i) {
        if (this.animationConfig) if (this.animationConfig.value && "function" == typeof this.animationConfig.value) this._warn(this._logf("playAnimation", "Please put 'animationConfig' inside of your components 'properties' object instead of outside of it.")); else {
            var n;
            if (n = e ? this.animationConfig[e] : this.animationConfig, Array.isArray(n) || (n = [ n ]), 
            n) for (var o, r = 0; o = n[r]; r++) if (o.animatable) o.animatable._getAnimationConfigRecursive(o.type || e, t, i); else if (o.id) {
                var s = t[o.id];
                s ? (s.isClone || (t[o.id] = this._cloneConfig(s), s = t[o.id]), this._copyProperties(s, o)) : t[o.id] = o;
            } else i.push(o);
        }
    },
    getAnimationConfig: function(e) {
        var t = {}, i = [];
        this._getAnimationConfigRecursive(e, t, i);
        for (var n in t) i.push(t[n]);
        return i;
    }
}, Polymer.NeonAnimationRunnerBehaviorImpl = {
    _configureAnimations: function(e) {
        var t = [];
        if (e.length > 0) for (var i, n = 0; i = e[n]; n++) {
            var o = document.createElement(i.name);
            if (o.isNeonAnimation) {
                var r = null;
                try {
                    "function" != typeof (r = o.configure(i)).cancel && (r = document.timeline.play(r));
                } catch (e) {
                    r = null, console.warn("Couldnt play", "(", i.name, ").", e);
                }
                r && t.push({
                    neonAnimation: o,
                    config: i,
                    animation: r
                });
            } else console.warn(this.is + ":", i.name, "not found!");
        }
        return t;
    },
    _shouldComplete: function(e) {
        for (var t = !0, i = 0; i < e.length; i++) if ("finished" != e[i].animation.playState) {
            t = !1;
            break;
        }
        return t;
    },
    _complete: function(e) {
        for (t = 0; t < e.length; t++) e[t].neonAnimation.complete(e[t].config);
        for (var t = 0; t < e.length; t++) e[t].animation.cancel();
    },
    playAnimation: function(e, t) {
        var i = this.getAnimationConfig(e);
        if (i) {
            this._active = this._active || {}, this._active[e] && (this._complete(this._active[e]), 
            delete this._active[e]);
            var n = this._configureAnimations(i);
            if (0 != n.length) {
                this._active[e] = n;
                for (var o = 0; o < n.length; o++) n[o].animation.onfinish = function() {
                    this._shouldComplete(n) && (this._complete(n), delete this._active[e], this.fire("neon-animation-finish", t, {
                        bubbles: !1
                    }));
                }.bind(this);
            } else this.fire("neon-animation-finish", t, {
                bubbles: !1
            });
        }
    },
    cancelAnimation: function() {
        for (var e in this._animations) this._animations[e].cancel();
        this._animations = {};
    }
}, Polymer.NeonAnimationRunnerBehavior = [ Polymer.NeonAnimatableBehavior, Polymer.NeonAnimationRunnerBehaviorImpl ], 
Polymer.IronFitBehavior = {
    properties: {
        sizingTarget: {
            type: Object,
            value: function() {
                return this;
            }
        },
        fitInto: {
            type: Object,
            value: window
        },
        noOverlap: {
            type: Boolean
        },
        positionTarget: {
            type: Element
        },
        horizontalAlign: {
            type: String
        },
        verticalAlign: {
            type: String
        },
        dynamicAlign: {
            type: Boolean
        },
        horizontalOffset: {
            type: Number,
            value: 0,
            notify: !0
        },
        verticalOffset: {
            type: Number,
            value: 0,
            notify: !0
        },
        autoFitOnAttach: {
            type: Boolean,
            value: !1
        },
        _fitInfo: {
            type: Object
        }
    },
    get _fitWidth() {
        return this.fitInto === window ? this.fitInto.innerWidth : this.fitInto.getBoundingClientRect().width;
    },
    get _fitHeight() {
        return this.fitInto === window ? this.fitInto.innerHeight : this.fitInto.getBoundingClientRect().height;
    },
    get _fitLeft() {
        return this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().left;
    },
    get _fitTop() {
        return this.fitInto === window ? 0 : this.fitInto.getBoundingClientRect().top;
    },
    get _defaultPositionTarget() {
        var e = Polymer.dom(this).parentNode;
        return e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && (e = e.host), e;
    },
    get _localeHorizontalAlign() {
        if (this._isRTL) {
            if ("right" === this.horizontalAlign) return "left";
            if ("left" === this.horizontalAlign) return "right";
        }
        return this.horizontalAlign;
    },
    attached: function() {
        void 0 === this._isRTL && (this._isRTL = "rtl" == window.getComputedStyle(this).direction), 
        this.positionTarget = this.positionTarget || this._defaultPositionTarget, this.autoFitOnAttach && ("none" === window.getComputedStyle(this).display ? setTimeout(function() {
            this.fit();
        }.bind(this)) : this.fit());
    },
    fit: function() {
        this.position(), this.constrain(), this.center();
    },
    _discoverInfo: function() {
        if (!this._fitInfo) {
            var e = window.getComputedStyle(this), t = window.getComputedStyle(this.sizingTarget);
            this._fitInfo = {
                inlineStyle: {
                    top: this.style.top || "",
                    left: this.style.left || "",
                    position: this.style.position || ""
                },
                sizerInlineStyle: {
                    maxWidth: this.sizingTarget.style.maxWidth || "",
                    maxHeight: this.sizingTarget.style.maxHeight || "",
                    boxSizing: this.sizingTarget.style.boxSizing || ""
                },
                positionedBy: {
                    vertically: "auto" !== e.top ? "top" : "auto" !== e.bottom ? "bottom" : null,
                    horizontally: "auto" !== e.left ? "left" : "auto" !== e.right ? "right" : null
                },
                sizedBy: {
                    height: "none" !== t.maxHeight,
                    width: "none" !== t.maxWidth,
                    minWidth: parseInt(t.minWidth, 10) || 0,
                    minHeight: parseInt(t.minHeight, 10) || 0
                },
                margin: {
                    top: parseInt(e.marginTop, 10) || 0,
                    right: parseInt(e.marginRight, 10) || 0,
                    bottom: parseInt(e.marginBottom, 10) || 0,
                    left: parseInt(e.marginLeft, 10) || 0
                }
            };
        }
    },
    resetFit: function() {
        var e = this._fitInfo || {};
        for (var t in e.sizerInlineStyle) this.sizingTarget.style[t] = e.sizerInlineStyle[t];
        for (var t in e.inlineStyle) this.style[t] = e.inlineStyle[t];
        this._fitInfo = null;
    },
    refit: function() {
        var e = this.sizingTarget.scrollLeft, t = this.sizingTarget.scrollTop;
        this.resetFit(), this.fit(), this.sizingTarget.scrollLeft = e, this.sizingTarget.scrollTop = t;
    },
    position: function() {
        if (this.horizontalAlign || this.verticalAlign) {
            this._discoverInfo(), this.style.position = "fixed", this.sizingTarget.style.boxSizing = "border-box", 
            this.style.left = "0px", this.style.top = "0px";
            var e = this.getBoundingClientRect(), t = this.__getNormalizedRect(this.positionTarget), i = this.__getNormalizedRect(this.fitInto), n = this._fitInfo.margin, o = {
                width: e.width + n.left + n.right,
                height: e.height + n.top + n.bottom
            }, r = this.__getPosition(this._localeHorizontalAlign, this.verticalAlign, o, t, i), s = r.left + n.left, a = r.top + n.top, l = Math.min(i.right - n.right, s + e.width), h = Math.min(i.bottom - n.bottom, a + e.height);
            s = Math.max(i.left + n.left, Math.min(s, l - this._fitInfo.sizedBy.minWidth)), 
            a = Math.max(i.top + n.top, Math.min(a, h - this._fitInfo.sizedBy.minHeight)), this.sizingTarget.style.maxWidth = Math.max(l - s, this._fitInfo.sizedBy.minWidth) + "px", 
            this.sizingTarget.style.maxHeight = Math.max(h - a, this._fitInfo.sizedBy.minHeight) + "px", 
            this.style.left = s - e.left + "px", this.style.top = a - e.top + "px";
        }
    },
    constrain: function() {
        if (!this.horizontalAlign && !this.verticalAlign) {
            this._discoverInfo();
            var e = this._fitInfo;
            e.positionedBy.vertically || (this.style.position = "fixed", this.style.top = "0px"), 
            e.positionedBy.horizontally || (this.style.position = "fixed", this.style.left = "0px"), 
            this.sizingTarget.style.boxSizing = "border-box";
            var t = this.getBoundingClientRect();
            e.sizedBy.height || this.__sizeDimension(t, e.positionedBy.vertically, "top", "bottom", "Height"), 
            e.sizedBy.width || this.__sizeDimension(t, e.positionedBy.horizontally, "left", "right", "Width");
        }
    },
    _sizeDimension: function(e, t, i, n, o) {
        this.__sizeDimension(e, t, i, n, o);
    },
    __sizeDimension: function(e, t, i, n, o) {
        var r = this._fitInfo, s = this.__getNormalizedRect(this.fitInto), a = "Width" === o ? s.width : s.height, l = t === n, h = l ? a - e[n] : e[i], c = r.margin[l ? i : n], u = "offset" + o, d = this[u] - this.sizingTarget[u];
        this.sizingTarget.style["max" + o] = a - c - h - d + "px";
    },
    center: function() {
        if (!this.horizontalAlign && !this.verticalAlign) {
            this._discoverInfo();
            var e = this._fitInfo.positionedBy;
            if (!e.vertically || !e.horizontally) {
                this.style.position = "fixed", e.vertically || (this.style.top = "0px"), e.horizontally || (this.style.left = "0px");
                var t = this.getBoundingClientRect(), i = this.__getNormalizedRect(this.fitInto);
                if (!e.vertically) {
                    var n = i.top - t.top + (i.height - t.height) / 2;
                    this.style.top = n + "px";
                }
                if (!e.horizontally) {
                    var o = i.left - t.left + (i.width - t.width) / 2;
                    this.style.left = o + "px";
                }
            }
        }
    },
    __getNormalizedRect: function(e) {
        return e === document.documentElement || e === window ? {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            right: window.innerWidth,
            bottom: window.innerHeight
        } : e.getBoundingClientRect();
    },
    __getCroppedArea: function(e, t, i) {
        var n = Math.min(0, e.top) + Math.min(0, i.bottom - (e.top + t.height)), o = Math.min(0, e.left) + Math.min(0, i.right - (e.left + t.width));
        return Math.abs(n) * t.width + Math.abs(o) * t.height;
    },
    __getPosition: function(e, t, i, n, o) {
        var r = [ {
            verticalAlign: "top",
            horizontalAlign: "left",
            top: n.top + this.verticalOffset,
            left: n.left + this.horizontalOffset
        }, {
            verticalAlign: "top",
            horizontalAlign: "right",
            top: n.top + this.verticalOffset,
            left: n.right - i.width - this.horizontalOffset
        }, {
            verticalAlign: "bottom",
            horizontalAlign: "left",
            top: n.bottom - i.height - this.verticalOffset,
            left: n.left + this.horizontalOffset
        }, {
            verticalAlign: "bottom",
            horizontalAlign: "right",
            top: n.bottom - i.height - this.verticalOffset,
            left: n.right - i.width - this.horizontalOffset
        } ];
        if (this.noOverlap) {
            for (var s = 0, a = r.length; s < a; s++) {
                var l = {};
                for (var h in r[s]) l[h] = r[s][h];
                r.push(l);
            }
            r[0].top = r[1].top += n.height, r[2].top = r[3].top -= n.height, r[4].left = r[6].left += n.width, 
            r[5].left = r[7].left -= n.width;
        }
        t = "auto" === t ? null : t, e = "auto" === e ? null : e;
        for (var c, s = 0; s < r.length; s++) {
            var u = r[s];
            if (!this.dynamicAlign && !this.noOverlap && u.verticalAlign === t && u.horizontalAlign === e) {
                c = u;
                break;
            }
            var d = !(t && u.verticalAlign !== t || e && u.horizontalAlign !== e);
            if (this.dynamicAlign || d) {
                c = c || u, u.croppedArea = this.__getCroppedArea(u, i, o);
                var f = u.croppedArea - c.croppedArea;
                if ((f < 0 || 0 === f && d) && (c = u), 0 === c.croppedArea && d) break;
            }
        }
        return c;
    }
}, function() {
    "use strict";
    function e(e, t) {
        var i = "";
        if (e) {
            var n = e.toLowerCase();
            " " === n || f.test(n) ? i = "space" : p.test(n) ? i = "esc" : 1 == n.length ? t && !c.test(n) || (i = n) : i = d.test(n) ? n.replace("arrow", "") : "multiply" == n ? "*" : n;
        }
        return i;
    }
    function t(e) {
        var t = "";
        return e && (e in a ? t = a[e] : u.test(e) ? (e = parseInt(e.replace("U+", "0x"), 16), 
        t = String.fromCharCode(e).toLowerCase()) : t = e.toLowerCase()), t;
    }
    function i(e) {
        var t = "";
        return Number(e) && (t = e >= 65 && e <= 90 ? String.fromCharCode(32 + e) : e >= 112 && e <= 123 ? "f" + (e - 112) : e >= 48 && e <= 57 ? String(e - 48) : e >= 96 && e <= 105 ? String(e - 96) : l[e]), 
        t;
    }
    function n(n, o) {
        return n.key ? e(n.key, o) : n.detail && n.detail.key ? e(n.detail.key, o) : t(n.keyIdentifier) || i(n.keyCode) || "";
    }
    function o(e, t) {
        return n(t, e.hasModifiers) === e.key && (!e.hasModifiers || !!t.shiftKey == !!e.shiftKey && !!t.ctrlKey == !!e.ctrlKey && !!t.altKey == !!e.altKey && !!t.metaKey == !!e.metaKey);
    }
    function r(e) {
        return 1 === e.length ? {
            combo: e,
            key: e,
            event: "keydown"
        } : e.split("+").reduce(function(e, t) {
            var i = t.split(":"), n = i[0], o = i[1];
            return n in h ? (e[h[n]] = !0, e.hasModifiers = !0) : (e.key = n, e.event = o || "keydown"), 
            e;
        }, {
            combo: e.split(":").shift()
        });
    }
    function s(e) {
        return e.trim().split(" ").map(function(e) {
            return r(e);
        });
    }
    var a = {
        "U+0008": "backspace",
        "U+0009": "tab",
        "U+001B": "esc",
        "U+0020": "space",
        "U+007F": "del"
    }, l = {
        8: "backspace",
        9: "tab",
        13: "enter",
        27: "esc",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        32: "space",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        46: "del",
        106: "*"
    }, h = {
        shift: "shiftKey",
        ctrl: "ctrlKey",
        alt: "altKey",
        meta: "metaKey"
    }, c = /[a-z0-9*]/, u = /U\+/, d = /^arrow/, f = /^space(bar)?/, p = /^escape$/;
    Polymer.IronA11yKeysBehavior = {
        properties: {
            keyEventTarget: {
                type: Object,
                value: function() {
                    return this;
                }
            },
            stopKeyboardEventPropagation: {
                type: Boolean,
                value: !1
            },
            _boundKeyHandlers: {
                type: Array,
                value: function() {
                    return [];
                }
            },
            _imperativeKeyBindings: {
                type: Object,
                value: function() {
                    return {};
                }
            }
        },
        observers: [ "_resetKeyEventListeners(keyEventTarget, _boundKeyHandlers)" ],
        keyBindings: {},
        registered: function() {
            this._prepKeyBindings();
        },
        attached: function() {
            this._listenKeyEventListeners();
        },
        detached: function() {
            this._unlistenKeyEventListeners();
        },
        addOwnKeyBinding: function(e, t) {
            this._imperativeKeyBindings[e] = t, this._prepKeyBindings(), this._resetKeyEventListeners();
        },
        removeOwnKeyBindings: function() {
            this._imperativeKeyBindings = {}, this._prepKeyBindings(), this._resetKeyEventListeners();
        },
        keyboardEventMatchesKeys: function(e, t) {
            for (var i = s(t), n = 0; n < i.length; ++n) if (o(i[n], e)) return !0;
            return !1;
        },
        _collectKeyBindings: function() {
            var e = this.behaviors.map(function(e) {
                return e.keyBindings;
            });
            return -1 === e.indexOf(this.keyBindings) && e.push(this.keyBindings), e;
        },
        _prepKeyBindings: function() {
            this._keyBindings = {}, this._collectKeyBindings().forEach(function(e) {
                for (var t in e) this._addKeyBinding(t, e[t]);
            }, this);
            for (var e in this._imperativeKeyBindings) this._addKeyBinding(e, this._imperativeKeyBindings[e]);
            for (var t in this._keyBindings) this._keyBindings[t].sort(function(e, t) {
                var i = e[0].hasModifiers;
                return i === t[0].hasModifiers ? 0 : i ? -1 : 1;
            });
        },
        _addKeyBinding: function(e, t) {
            s(e).forEach(function(e) {
                this._keyBindings[e.event] = this._keyBindings[e.event] || [], this._keyBindings[e.event].push([ e, t ]);
            }, this);
        },
        _resetKeyEventListeners: function() {
            this._unlistenKeyEventListeners(), this.isAttached && this._listenKeyEventListeners();
        },
        _listenKeyEventListeners: function() {
            this.keyEventTarget && Object.keys(this._keyBindings).forEach(function(e) {
                var t = this._keyBindings[e], i = this._onKeyBindingEvent.bind(this, t);
                this._boundKeyHandlers.push([ this.keyEventTarget, e, i ]), this.keyEventTarget.addEventListener(e, i);
            }, this);
        },
        _unlistenKeyEventListeners: function() {
            for (var e, t, i, n; this._boundKeyHandlers.length; ) t = (e = this._boundKeyHandlers.pop())[0], 
            i = e[1], n = e[2], t.removeEventListener(i, n);
        },
        _onKeyBindingEvent: function(e, t) {
            if (this.stopKeyboardEventPropagation && t.stopPropagation(), !t.defaultPrevented) for (var i = 0; i < e.length; i++) {
                var n = e[i][0], r = e[i][1];
                if (o(n, t) && (this._triggerKeyHandler(n, r, t), t.defaultPrevented)) return;
            }
        },
        _triggerKeyHandler: function(e, t, i) {
            var n = Object.create(e);
            n.keyboardEvent = i;
            var o = new CustomEvent(e.event, {
                detail: n,
                cancelable: !0
            });
            this[t].call(this, o), o.defaultPrevented && i.preventDefault();
        }
    };
}(), function() {
    "use strict";
    Polymer({
        is: "iron-overlay-backdrop",
        properties: {
            opened: {
                reflectToAttribute: !0,
                type: Boolean,
                value: !1,
                observer: "_openedChanged"
            }
        },
        listeners: {
            transitionend: "_onTransitionend"
        },
        created: function() {
            this.__openedRaf = null;
        },
        attached: function() {
            this.opened && this._openedChanged(this.opened);
        },
        prepare: function() {
            this.opened && !this.parentNode && Polymer.dom(document.body).appendChild(this);
        },
        open: function() {
            this.opened = !0;
        },
        close: function() {
            this.opened = !1;
        },
        complete: function() {
            this.opened || this.parentNode !== document.body || Polymer.dom(this.parentNode).removeChild(this);
        },
        _onTransitionend: function(e) {
            e && e.target === this && this.complete();
        },
        _openedChanged: function(e) {
            if (e) this.prepare(); else {
                var t = window.getComputedStyle(this);
                "0s" !== t.transitionDuration && 0 != t.opacity || this.complete();
            }
            this.isAttached && (this.__openedRaf && (window.cancelAnimationFrame(this.__openedRaf), 
            this.__openedRaf = null), this.scrollTop = this.scrollTop, this.__openedRaf = window.requestAnimationFrame(function() {
                this.__openedRaf = null, this.toggleClass("opened", this.opened);
            }.bind(this)));
        }
    });
}(), Polymer.IronOverlayManagerClass = function() {
    this._overlays = [], this._minimumZ = 101, this._backdropElement = null, Polymer.Gestures.add(document.documentElement, "tap", null), 
    document.addEventListener("tap", this._onCaptureClick.bind(this), !0), document.addEventListener("focus", this._onCaptureFocus.bind(this), !0), 
    document.addEventListener("keydown", this._onCaptureKeyDown.bind(this), !0);
}, Polymer.IronOverlayManagerClass.prototype = {
    constructor: Polymer.IronOverlayManagerClass,
    get backdropElement() {
        return this._backdropElement || (this._backdropElement = document.createElement("iron-overlay-backdrop")), 
        this._backdropElement;
    },
    get deepActiveElement() {
        for (var e = document.activeElement || document.body; e.root && Polymer.dom(e.root).activeElement; ) e = Polymer.dom(e.root).activeElement;
        return e;
    },
    _bringOverlayAtIndexToFront: function(e) {
        var t = this._overlays[e];
        if (t) {
            var i = this._overlays.length - 1, n = this._overlays[i];
            if (n && this._shouldBeBehindOverlay(t, n) && i--, !(e >= i)) {
                var o = Math.max(this.currentOverlayZ(), this._minimumZ);
                for (this._getZ(t) <= o && this._applyOverlayZ(t, o); e < i; ) this._overlays[e] = this._overlays[e + 1], 
                e++;
                this._overlays[i] = t;
            }
        }
    },
    addOrRemoveOverlay: function(e) {
        e.opened ? this.addOverlay(e) : this.removeOverlay(e);
    },
    addOverlay: function(e) {
        var t = this._overlays.indexOf(e);
        if (t >= 0) return this._bringOverlayAtIndexToFront(t), void this.trackBackdrop();
        var i = this._overlays.length, n = this._overlays[i - 1], o = Math.max(this._getZ(n), this._minimumZ), r = this._getZ(e);
        if (n && this._shouldBeBehindOverlay(e, n)) {
            this._applyOverlayZ(n, o), i--;
            var s = this._overlays[i - 1];
            o = Math.max(this._getZ(s), this._minimumZ);
        }
        r <= o && this._applyOverlayZ(e, o), this._overlays.splice(i, 0, e), this.trackBackdrop();
    },
    removeOverlay: function(e) {
        var t = this._overlays.indexOf(e);
        -1 !== t && (this._overlays.splice(t, 1), this.trackBackdrop());
    },
    currentOverlay: function() {
        var e = this._overlays.length - 1;
        return this._overlays[e];
    },
    currentOverlayZ: function() {
        return this._getZ(this.currentOverlay());
    },
    ensureMinimumZ: function(e) {
        this._minimumZ = Math.max(this._minimumZ, e);
    },
    focusOverlay: function() {
        var e = this.currentOverlay();
        e && e._applyFocus();
    },
    trackBackdrop: function() {
        var e = this._overlayWithBackdrop();
        (e || this._backdropElement) && (this.backdropElement.style.zIndex = this._getZ(e) - 1, 
        this.backdropElement.opened = !!e);
    },
    getBackdrops: function() {
        for (var e = [], t = 0; t < this._overlays.length; t++) this._overlays[t].withBackdrop && e.push(this._overlays[t]);
        return e;
    },
    backdropZ: function() {
        return this._getZ(this._overlayWithBackdrop()) - 1;
    },
    _overlayWithBackdrop: function() {
        for (var e = 0; e < this._overlays.length; e++) if (this._overlays[e].withBackdrop) return this._overlays[e];
    },
    _getZ: function(e) {
        var t = this._minimumZ;
        if (e) {
            var i = Number(e.style.zIndex || window.getComputedStyle(e).zIndex);
            i == i && (t = i);
        }
        return t;
    },
    _setZ: function(e, t) {
        e.style.zIndex = t;
    },
    _applyOverlayZ: function(e, t) {
        this._setZ(e, t + 2);
    },
    _overlayInPath: function(e) {
        e = e || [];
        for (var t = 0; t < e.length; t++) if (e[t]._manager === this) return e[t];
    },
    _onCaptureClick: function(e) {
        var t = this.currentOverlay();
        t && this._overlayInPath(Polymer.dom(e).path) !== t && t._onCaptureClick(e);
    },
    _onCaptureFocus: function(e) {
        var t = this.currentOverlay();
        t && t._onCaptureFocus(e);
    },
    _onCaptureKeyDown: function(e) {
        var t = this.currentOverlay();
        t && (Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(e, "esc") ? t._onCaptureEsc(e) : Polymer.IronA11yKeysBehavior.keyboardEventMatchesKeys(e, "tab") && t._onCaptureTab(e));
    },
    _shouldBeBehindOverlay: function(e, t) {
        return !e.alwaysOnTop && t.alwaysOnTop;
    }
}, Polymer.IronOverlayManager = new Polymer.IronOverlayManagerClass(), function() {
    "use strict";
    var e = Element.prototype, t = e.matches || e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;
    Polymer.IronFocusablesHelper = {
        getTabbableNodes: function(e) {
            var t = [];
            return this._collectTabbableNodes(e, t) ? this._sortByTabIndex(t) : t;
        },
        isFocusable: function(e) {
            return t.call(e, "input, select, textarea, button, object") ? t.call(e, ":not([disabled])") : t.call(e, "a[href], area[href], iframe, [tabindex], [contentEditable]");
        },
        isTabbable: function(e) {
            return this.isFocusable(e) && t.call(e, ':not([tabindex="-1"])') && this._isVisible(e);
        },
        _normalizedTabIndex: function(e) {
            if (this.isFocusable(e)) {
                var t = e.getAttribute("tabindex") || 0;
                return Number(t);
            }
            return -1;
        },
        _collectTabbableNodes: function(e, t) {
            if (e.nodeType !== Node.ELEMENT_NODE || !this._isVisible(e)) return !1;
            var i = e, n = this._normalizedTabIndex(i), o = n > 0;
            n >= 0 && t.push(i);
            var r;
            r = "content" === i.localName ? Polymer.dom(i).getDistributedNodes() : Polymer.dom(i.root || i).children;
            for (var s = 0; s < r.length; s++) {
                var a = this._collectTabbableNodes(r[s], t);
                o = o || a;
            }
            return o;
        },
        _isVisible: function(e) {
            var t = e.style;
            return "hidden" !== t.visibility && "none" !== t.display && ("hidden" !== (t = window.getComputedStyle(e)).visibility && "none" !== t.display);
        },
        _sortByTabIndex: function(e) {
            var t = e.length;
            if (t < 2) return e;
            var i = Math.ceil(t / 2), n = this._sortByTabIndex(e.slice(0, i)), o = this._sortByTabIndex(e.slice(i));
            return this._mergeSortByTabIndex(n, o);
        },
        _mergeSortByTabIndex: function(e, t) {
            for (var i = []; e.length > 0 && t.length > 0; ) this._hasLowerTabOrder(e[0], t[0]) ? i.push(t.shift()) : i.push(e.shift());
            return i.concat(e, t);
        },
        _hasLowerTabOrder: function(e, t) {
            var i = Math.max(e.tabIndex, 0), n = Math.max(t.tabIndex, 0);
            return 0 === i || 0 === n ? n > i : i > n;
        }
    };
}(), function() {
    "use strict";
    Polymer.IronOverlayBehaviorImpl = {
        properties: {
            opened: {
                observer: "_openedChanged",
                type: Boolean,
                value: !1,
                notify: !0
            },
            canceled: {
                observer: "_canceledChanged",
                readOnly: !0,
                type: Boolean,
                value: !1
            },
            withBackdrop: {
                observer: "_withBackdropChanged",
                type: Boolean
            },
            noAutoFocus: {
                type: Boolean,
                value: !1
            },
            noCancelOnEscKey: {
                type: Boolean,
                value: !1
            },
            noCancelOnOutsideClick: {
                type: Boolean,
                value: !1
            },
            closingReason: {
                type: Object
            },
            restoreFocusOnClose: {
                type: Boolean,
                value: !1
            },
            alwaysOnTop: {
                type: Boolean
            },
            _manager: {
                type: Object,
                value: Polymer.IronOverlayManager
            },
            _focusedChild: {
                type: Object
            }
        },
        listeners: {
            "iron-resize": "_onIronResize"
        },
        get backdropElement() {
            return this._manager.backdropElement;
        },
        get _focusNode() {
            return this._focusedChild || Polymer.dom(this).querySelector("[autofocus]") || this;
        },
        get _focusableNodes() {
            return Polymer.IronFocusablesHelper.getTabbableNodes(this);
        },
        ready: function() {
            this.__isAnimating = !1, this.__shouldRemoveTabIndex = !1, this.__firstFocusableNode = this.__lastFocusableNode = null, 
            this.__raf = null, this.__restoreFocusNode = null, this._ensureSetup();
        },
        attached: function() {
            this.opened && this._openedChanged(this.opened), this._observer = Polymer.dom(this).observeNodes(this._onNodesChange);
        },
        detached: function() {
            Polymer.dom(this).unobserveNodes(this._observer), this._observer = null, this.__raf && (window.cancelAnimationFrame(this.__raf), 
            this.__raf = null), this._manager.removeOverlay(this);
        },
        toggle: function() {
            this._setCanceled(!1), this.opened = !this.opened;
        },
        open: function() {
            this._setCanceled(!1), this.opened = !0;
        },
        close: function() {
            this._setCanceled(!1), this.opened = !1;
        },
        cancel: function(e) {
            this.fire("iron-overlay-canceled", e, {
                cancelable: !0
            }).defaultPrevented || (this._setCanceled(!0), this.opened = !1);
        },
        invalidateTabbables: function() {
            this.__firstFocusableNode = this.__lastFocusableNode = null;
        },
        _ensureSetup: function() {
            this._overlaySetup || (this._overlaySetup = !0, this.style.outline = "none", this.style.display = "none");
        },
        _openedChanged: function(e) {
            e ? this.removeAttribute("aria-hidden") : this.setAttribute("aria-hidden", "true"), 
            this.isAttached && (this.__isAnimating = !0, this.__onNextAnimationFrame(this.__openedChanged));
        },
        _canceledChanged: function() {
            this.closingReason = this.closingReason || {}, this.closingReason.canceled = this.canceled;
        },
        _withBackdropChanged: function() {
            this.withBackdrop && !this.hasAttribute("tabindex") ? (this.setAttribute("tabindex", "-1"), 
            this.__shouldRemoveTabIndex = !0) : this.__shouldRemoveTabIndex && (this.removeAttribute("tabindex"), 
            this.__shouldRemoveTabIndex = !1), this.opened && this.isAttached && this._manager.trackBackdrop();
        },
        _prepareRenderOpened: function() {
            this.__restoreFocusNode = this._manager.deepActiveElement, this._preparePositioning(), 
            this.refit(), this._finishPositioning(), this.noAutoFocus && document.activeElement === this._focusNode && (this._focusNode.blur(), 
            this.__restoreFocusNode.focus());
        },
        _renderOpened: function() {
            this._finishRenderOpened();
        },
        _renderClosed: function() {
            this._finishRenderClosed();
        },
        _finishRenderOpened: function() {
            this.notifyResize(), this.__isAnimating = !1, this.fire("iron-overlay-opened");
        },
        _finishRenderClosed: function() {
            this.style.display = "none", this.style.zIndex = "", this.notifyResize(), this.__isAnimating = !1, 
            this.fire("iron-overlay-closed", this.closingReason);
        },
        _preparePositioning: function() {
            this.style.transition = this.style.webkitTransition = "none", this.style.transform = this.style.webkitTransform = "none", 
            this.style.display = "";
        },
        _finishPositioning: function() {
            this.style.display = "none", this.scrollTop = this.scrollTop, this.style.transition = this.style.webkitTransition = "", 
            this.style.transform = this.style.webkitTransform = "", this.style.display = "", 
            this.scrollTop = this.scrollTop;
        },
        _applyFocus: function() {
            if (this.opened) this.noAutoFocus || this._focusNode.focus(); else {
                this._focusNode.blur(), this._focusedChild = null, this.restoreFocusOnClose && this.__restoreFocusNode && this.__restoreFocusNode.focus(), 
                this.__restoreFocusNode = null;
                var e = this._manager.currentOverlay();
                e && this !== e && e._applyFocus();
            }
        },
        _onCaptureClick: function(e) {
            this.noCancelOnOutsideClick || this.cancel(e);
        },
        _onCaptureFocus: function(e) {
            if (this.withBackdrop) {
                var t = Polymer.dom(e).path;
                -1 === t.indexOf(this) ? (e.stopPropagation(), this._applyFocus()) : this._focusedChild = t[0];
            }
        },
        _onCaptureEsc: function(e) {
            this.noCancelOnEscKey || this.cancel(e);
        },
        _onCaptureTab: function(e) {
            if (this.withBackdrop) {
                this.__ensureFirstLastFocusables();
                var t = e.shiftKey, i = t ? this.__firstFocusableNode : this.__lastFocusableNode, n = t ? this.__lastFocusableNode : this.__firstFocusableNode, o = !1;
                if (i === n) o = !0; else {
                    var r = this._manager.deepActiveElement;
                    o = r === i || r === this;
                }
                o && (e.preventDefault(), this._focusedChild = n, this._applyFocus());
            }
        },
        _onIronResize: function() {
            this.opened && !this.__isAnimating && this.__onNextAnimationFrame(this.refit);
        },
        _onNodesChange: function() {
            this.opened && !this.__isAnimating && (this.invalidateTabbables(), this.notifyResize());
        },
        __ensureFirstLastFocusables: function() {
            if (!this.__firstFocusableNode || !this.__lastFocusableNode) {
                var e = this._focusableNodes;
                this.__firstFocusableNode = e[0], this.__lastFocusableNode = e[e.length - 1];
            }
        },
        __openedChanged: function() {
            this.opened ? (this._prepareRenderOpened(), this._manager.addOverlay(this), this._applyFocus(), 
            this._renderOpened()) : (this._manager.removeOverlay(this), this._applyFocus(), 
            this._renderClosed());
        },
        __onNextAnimationFrame: function(e) {
            this.__raf && window.cancelAnimationFrame(this.__raf);
            var t = this;
            this.__raf = window.requestAnimationFrame(function() {
                t.__raf = null, e.call(t);
            });
        }
    }, Polymer.IronOverlayBehavior = [ Polymer.IronFitBehavior, Polymer.IronResizableBehavior, Polymer.IronOverlayBehaviorImpl ];
}(), Polymer.PaperDialogBehaviorImpl = {
    hostAttributes: {
        role: "dialog",
        tabindex: "-1"
    },
    properties: {
        modal: {
            type: Boolean,
            value: !1
        }
    },
    observers: [ "_modalChanged(modal, _readied)" ],
    listeners: {
        tap: "_onDialogClick"
    },
    ready: function() {
        this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick, this.__prevNoCancelOnEscKey = this.noCancelOnEscKey, 
        this.__prevWithBackdrop = this.withBackdrop;
    },
    _modalChanged: function(e, t) {
        t && (e ? (this.__prevNoCancelOnOutsideClick = this.noCancelOnOutsideClick, this.__prevNoCancelOnEscKey = this.noCancelOnEscKey, 
        this.__prevWithBackdrop = this.withBackdrop, this.noCancelOnOutsideClick = !0, this.noCancelOnEscKey = !0, 
        this.withBackdrop = !0) : (this.noCancelOnOutsideClick = this.noCancelOnOutsideClick && this.__prevNoCancelOnOutsideClick, 
        this.noCancelOnEscKey = this.noCancelOnEscKey && this.__prevNoCancelOnEscKey, this.withBackdrop = this.withBackdrop && this.__prevWithBackdrop));
    },
    _updateClosingReasonConfirmed: function(e) {
        this.closingReason = this.closingReason || {}, this.closingReason.confirmed = e;
    },
    _onDialogClick: function(e) {
        for (var t = Polymer.dom(e).path, i = 0; i < t.indexOf(this); i++) {
            var n = t[i];
            if (n.hasAttribute && (n.hasAttribute("dialog-dismiss") || n.hasAttribute("dialog-confirm"))) {
                this._updateClosingReasonConfirmed(n.hasAttribute("dialog-confirm")), this.close(), 
                e.stopPropagation();
                break;
            }
        }
    }
}, Polymer.PaperDialogBehavior = [ Polymer.IronOverlayBehavior, Polymer.PaperDialogBehaviorImpl ], 
Polymer({
    is: "paper-dialog",
    behaviors: [ Polymer.PaperDialogBehavior, Polymer.NeonAnimationRunnerBehavior ],
    listeners: {
        "neon-animation-finish": "_onNeonAnimationFinish"
    },
    _renderOpened: function() {
        this.cancelAnimation(), this.playAnimation("entry");
    },
    _renderClosed: function() {
        this.cancelAnimation(), this.playAnimation("exit");
    },
    _onNeonAnimationFinish: function() {
        this.opened ? this._finishRenderOpened() : this._finishRenderClosed();
    }
}), Polymer({
    is: "paper-dialog-scrollable",
    properties: {
        dialogElement: {
            type: Object
        }
    },
    listeners: {
        "scrollable.scroll": "_scroll"
    },
    get scrollTarget() {
        return this.$.scrollable;
    },
    ready: function() {
        this._ensureTarget();
    },
    attached: function() {
        this.classList.add("no-padding"), this._ensureTarget(), requestAnimationFrame(this._scroll.bind(this));
    },
    _scroll: function() {
        this.toggleClass("is-scrolled", this.scrollTarget.scrollTop > 0), this.toggleClass("can-scroll", this.scrollTarget.offsetHeight < this.scrollTarget.scrollHeight), 
        this.toggleClass("scrolled-to-bottom", this.scrollTarget.scrollTop + this.scrollTarget.offsetHeight >= this.scrollTarget.scrollHeight);
    },
    _ensureTarget: function() {
        this.dialogElement = this.dialogElement || Polymer.dom(this).parentNode, this.dialogElement && this.dialogElement.behaviors && this.dialogElement.behaviors.indexOf(Polymer.PaperDialogBehaviorImpl) >= 0 ? (this.dialogElement.sizingTarget = this.scrollTarget, 
        this.scrollTarget.classList.remove("fit")) : this.dialogElement && this.scrollTarget.classList.add("fit");
    }
}), Polymer.IronControlState = {
    properties: {
        focused: {
            type: Boolean,
            value: !1,
            notify: !0,
            readOnly: !0,
            reflectToAttribute: !0
        },
        disabled: {
            type: Boolean,
            value: !1,
            notify: !0,
            observer: "_disabledChanged",
            reflectToAttribute: !0
        },
        _oldTabIndex: {
            type: Number
        },
        _boundFocusBlurHandler: {
            type: Function,
            value: function() {
                return this._focusBlurHandler.bind(this);
            }
        }
    },
    observers: [ "_changedControlState(focused, disabled)" ],
    ready: function() {
        this.addEventListener("focus", this._boundFocusBlurHandler, !0), this.addEventListener("blur", this._boundFocusBlurHandler, !0);
    },
    _focusBlurHandler: function(e) {
        if (e.target === this) this._setFocused("focus" === e.type); else if (!this.shadowRoot) {
            var t = Polymer.dom(e).localTarget;
            this.isLightDescendant(t) || this.fire(e.type, {
                sourceEvent: e
            }, {
                node: this,
                bubbles: e.bubbles,
                cancelable: e.cancelable
            });
        }
    },
    _disabledChanged: function(e, t) {
        this.setAttribute("aria-disabled", e ? "true" : "false"), this.style.pointerEvents = e ? "none" : "", 
        e ? (this._oldTabIndex = this.tabIndex, this._setFocused(!1), this.tabIndex = -1, 
        this.blur()) : void 0 !== this._oldTabIndex && (this.tabIndex = this._oldTabIndex);
    },
    _changedControlState: function() {
        this._controlStateChanged && this._controlStateChanged();
    }
}, Polymer.IronButtonStateImpl = {
    properties: {
        pressed: {
            type: Boolean,
            readOnly: !0,
            value: !1,
            reflectToAttribute: !0,
            observer: "_pressedChanged"
        },
        toggles: {
            type: Boolean,
            value: !1,
            reflectToAttribute: !0
        },
        active: {
            type: Boolean,
            value: !1,
            notify: !0,
            reflectToAttribute: !0
        },
        pointerDown: {
            type: Boolean,
            readOnly: !0,
            value: !1
        },
        receivedFocusFromKeyboard: {
            type: Boolean,
            readOnly: !0
        },
        ariaActiveAttribute: {
            type: String,
            value: "aria-pressed",
            observer: "_ariaActiveAttributeChanged"
        }
    },
    listeners: {
        down: "_downHandler",
        up: "_upHandler",
        tap: "_tapHandler"
    },
    observers: [ "_focusChanged(focused)", "_activeChanged(active, ariaActiveAttribute)" ],
    keyBindings: {
        "enter:keydown": "_asyncClick",
        "space:keydown": "_spaceKeyDownHandler",
        "space:keyup": "_spaceKeyUpHandler"
    },
    _mouseEventRe: /^mouse/,
    _tapHandler: function() {
        this.toggles ? this._userActivate(!this.active) : this.active = !1;
    },
    _focusChanged: function(e) {
        this._detectKeyboardFocus(e), e || this._setPressed(!1);
    },
    _detectKeyboardFocus: function(e) {
        this._setReceivedFocusFromKeyboard(!this.pointerDown && e);
    },
    _userActivate: function(e) {
        this.active !== e && (this.active = e, this.fire("change"));
    },
    _downHandler: function(e) {
        this._setPointerDown(!0), this._setPressed(!0), this._setReceivedFocusFromKeyboard(!1);
    },
    _upHandler: function() {
        this._setPointerDown(!1), this._setPressed(!1);
    },
    _spaceKeyDownHandler: function(e) {
        var t = e.detail.keyboardEvent, i = Polymer.dom(t).localTarget;
        this.isLightDescendant(i) || (t.preventDefault(), t.stopImmediatePropagation(), 
        this._setPressed(!0));
    },
    _spaceKeyUpHandler: function(e) {
        var t = e.detail.keyboardEvent, i = Polymer.dom(t).localTarget;
        this.isLightDescendant(i) || (this.pressed && this._asyncClick(), this._setPressed(!1));
    },
    _asyncClick: function() {
        this.async(function() {
            this.click();
        }, 1);
    },
    _pressedChanged: function(e) {
        this._changedButtonState();
    },
    _ariaActiveAttributeChanged: function(e, t) {
        t && t != e && this.hasAttribute(t) && this.removeAttribute(t);
    },
    _activeChanged: function(e, t) {
        this.toggles ? this.setAttribute(this.ariaActiveAttribute, e ? "true" : "false") : this.removeAttribute(this.ariaActiveAttribute), 
        this._changedButtonState();
    },
    _controlStateChanged: function() {
        this.disabled ? this._setPressed(!1) : this._changedButtonState();
    },
    _changedButtonState: function() {
        this._buttonStateChanged && this._buttonStateChanged();
    }
}, Polymer.IronButtonState = [ Polymer.IronA11yKeysBehavior, Polymer.IronButtonStateImpl ], 
function() {
    function e(e) {
        this.element = e, this.width = this.boundingRect.width, this.height = this.boundingRect.height, 
        this.size = Math.max(this.width, this.height);
    }
    function t(e) {
        this.element = e, this.color = window.getComputedStyle(e).color, this.wave = document.createElement("div"), 
        this.waveContainer = document.createElement("div"), this.wave.style.backgroundColor = this.color, 
        this.wave.classList.add("wave"), this.waveContainer.classList.add("wave-container"), 
        Polymer.dom(this.waveContainer).appendChild(this.wave), this.resetInteractionState();
    }
    var i = {
        distance: function(e, t, i, n) {
            var o = e - i, r = t - n;
            return Math.sqrt(o * o + r * r);
        },
        now: window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now
    };
    e.prototype = {
        get boundingRect() {
            return this.element.getBoundingClientRect();
        },
        furthestCornerDistanceFrom: function(e, t) {
            var n = i.distance(e, t, 0, 0), o = i.distance(e, t, this.width, 0), r = i.distance(e, t, 0, this.height), s = i.distance(e, t, this.width, this.height);
            return Math.max(n, o, r, s);
        }
    }, t.MAX_RADIUS = 300, t.prototype = {
        get recenters() {
            return this.element.recenters;
        },
        get center() {
            return this.element.center;
        },
        get mouseDownElapsed() {
            var e;
            return this.mouseDownStart ? (e = i.now() - this.mouseDownStart, this.mouseUpStart && (e -= this.mouseUpElapsed), 
            e) : 0;
        },
        get mouseUpElapsed() {
            return this.mouseUpStart ? i.now() - this.mouseUpStart : 0;
        },
        get mouseDownElapsedSeconds() {
            return this.mouseDownElapsed / 1e3;
        },
        get mouseUpElapsedSeconds() {
            return this.mouseUpElapsed / 1e3;
        },
        get mouseInteractionSeconds() {
            return this.mouseDownElapsedSeconds + this.mouseUpElapsedSeconds;
        },
        get initialOpacity() {
            return this.element.initialOpacity;
        },
        get opacityDecayVelocity() {
            return this.element.opacityDecayVelocity;
        },
        get radius() {
            var e = this.containerMetrics.width * this.containerMetrics.width, i = this.containerMetrics.height * this.containerMetrics.height, n = 1.1 * Math.min(Math.sqrt(e + i), t.MAX_RADIUS) + 5, o = 1.1 - n / t.MAX_RADIUS * .2, r = this.mouseInteractionSeconds / o, s = n * (1 - Math.pow(80, -r));
            return Math.abs(s);
        },
        get opacity() {
            return this.mouseUpStart ? Math.max(0, this.initialOpacity - this.mouseUpElapsedSeconds * this.opacityDecayVelocity) : this.initialOpacity;
        },
        get outerOpacity() {
            var e = .3 * this.mouseUpElapsedSeconds, t = this.opacity;
            return Math.max(0, Math.min(e, t));
        },
        get isOpacityFullyDecayed() {
            return this.opacity < .01 && this.radius >= Math.min(this.maxRadius, t.MAX_RADIUS);
        },
        get isRestingAtMaxRadius() {
            return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, t.MAX_RADIUS);
        },
        get isAnimationComplete() {
            return this.mouseUpStart ? this.isOpacityFullyDecayed : this.isRestingAtMaxRadius;
        },
        get translationFraction() {
            return Math.min(1, this.radius / this.containerMetrics.size * 2 / Math.sqrt(2));
        },
        get xNow() {
            return this.xEnd ? this.xStart + this.translationFraction * (this.xEnd - this.xStart) : this.xStart;
        },
        get yNow() {
            return this.yEnd ? this.yStart + this.translationFraction * (this.yEnd - this.yStart) : this.yStart;
        },
        get isMouseDown() {
            return this.mouseDownStart && !this.mouseUpStart;
        },
        resetInteractionState: function() {
            this.maxRadius = 0, this.mouseDownStart = 0, this.mouseUpStart = 0, this.xStart = 0, 
            this.yStart = 0, this.xEnd = 0, this.yEnd = 0, this.slideDistance = 0, this.containerMetrics = new e(this.element);
        },
        draw: function() {
            var e, t, i;
            this.wave.style.opacity = this.opacity, e = this.radius / (this.containerMetrics.size / 2), 
            t = this.xNow - this.containerMetrics.width / 2, i = this.yNow - this.containerMetrics.height / 2, 
            this.waveContainer.style.webkitTransform = "translate(" + t + "px, " + i + "px)", 
            this.waveContainer.style.transform = "translate3d(" + t + "px, " + i + "px, 0)", 
            this.wave.style.webkitTransform = "scale(" + e + "," + e + ")", this.wave.style.transform = "scale3d(" + e + "," + e + ",1)";
        },
        downAction: function(e) {
            var t = this.containerMetrics.width / 2, n = this.containerMetrics.height / 2;
            this.resetInteractionState(), this.mouseDownStart = i.now(), this.center ? (this.xStart = t, 
            this.yStart = n, this.slideDistance = i.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)) : (this.xStart = e ? e.detail.x - this.containerMetrics.boundingRect.left : this.containerMetrics.width / 2, 
            this.yStart = e ? e.detail.y - this.containerMetrics.boundingRect.top : this.containerMetrics.height / 2), 
            this.recenters && (this.xEnd = t, this.yEnd = n, this.slideDistance = i.distance(this.xStart, this.yStart, this.xEnd, this.yEnd)), 
            this.maxRadius = this.containerMetrics.furthestCornerDistanceFrom(this.xStart, this.yStart), 
            this.waveContainer.style.top = (this.containerMetrics.height - this.containerMetrics.size) / 2 + "px", 
            this.waveContainer.style.left = (this.containerMetrics.width - this.containerMetrics.size) / 2 + "px", 
            this.waveContainer.style.width = this.containerMetrics.size + "px", this.waveContainer.style.height = this.containerMetrics.size + "px";
        },
        upAction: function(e) {
            this.isMouseDown && (this.mouseUpStart = i.now());
        },
        remove: function() {
            Polymer.dom(this.waveContainer.parentNode).removeChild(this.waveContainer);
        }
    }, Polymer({
        is: "paper-ripple",
        behaviors: [ Polymer.IronA11yKeysBehavior ],
        properties: {
            initialOpacity: {
                type: Number,
                value: .25
            },
            opacityDecayVelocity: {
                type: Number,
                value: .8
            },
            recenters: {
                type: Boolean,
                value: !1
            },
            center: {
                type: Boolean,
                value: !1
            },
            ripples: {
                type: Array,
                value: function() {
                    return [];
                }
            },
            animating: {
                type: Boolean,
                readOnly: !0,
                reflectToAttribute: !0,
                value: !1
            },
            holdDown: {
                type: Boolean,
                value: !1,
                observer: "_holdDownChanged"
            },
            noink: {
                type: Boolean,
                value: !1
            },
            _animating: {
                type: Boolean
            },
            _boundAnimate: {
                type: Function,
                value: function() {
                    return this.animate.bind(this);
                }
            }
        },
        get target() {
            return this.keyEventTarget;
        },
        keyBindings: {
            "enter:keydown": "_onEnterKeydown",
            "space:keydown": "_onSpaceKeydown",
            "space:keyup": "_onSpaceKeyup"
        },
        attached: function() {
            11 == this.parentNode.nodeType ? this.keyEventTarget = Polymer.dom(this).getOwnerRoot().host : this.keyEventTarget = this.parentNode;
            var e = this.keyEventTarget;
            this.listen(e, "up", "uiUpAction"), this.listen(e, "down", "uiDownAction");
        },
        detached: function() {
            this.unlisten(this.keyEventTarget, "up", "uiUpAction"), this.unlisten(this.keyEventTarget, "down", "uiDownAction"), 
            this.keyEventTarget = null;
        },
        get shouldKeepAnimating() {
            for (var e = 0; e < this.ripples.length; ++e) if (!this.ripples[e].isAnimationComplete) return !0;
            return !1;
        },
        simulatedRipple: function() {
            this.downAction(null), this.async(function() {
                this.upAction();
            }, 1);
        },
        uiDownAction: function(e) {
            this.noink || this.downAction(e);
        },
        downAction: function(e) {
            this.holdDown && this.ripples.length > 0 || (this.addRipple().downAction(e), this._animating || (this._animating = !0, 
            this.animate()));
        },
        uiUpAction: function(e) {
            this.noink || this.upAction(e);
        },
        upAction: function(e) {
            this.holdDown || (this.ripples.forEach(function(t) {
                t.upAction(e);
            }), this._animating = !0, this.animate());
        },
        onAnimationComplete: function() {
            this._animating = !1, this.$.background.style.backgroundColor = null, this.fire("transitionend");
        },
        addRipple: function() {
            var e = new t(this);
            return Polymer.dom(this.$.waves).appendChild(e.waveContainer), this.$.background.style.backgroundColor = e.color, 
            this.ripples.push(e), this._setAnimating(!0), e;
        },
        removeRipple: function(e) {
            var t = this.ripples.indexOf(e);
            t < 0 || (this.ripples.splice(t, 1), e.remove(), this.ripples.length || this._setAnimating(!1));
        },
        animate: function() {
            if (this._animating) {
                var e, t;
                for (e = 0; e < this.ripples.length; ++e) (t = this.ripples[e]).draw(), this.$.background.style.opacity = t.outerOpacity, 
                t.isOpacityFullyDecayed && !t.isRestingAtMaxRadius && this.removeRipple(t);
                this.shouldKeepAnimating || 0 !== this.ripples.length ? window.requestAnimationFrame(this._boundAnimate) : this.onAnimationComplete();
            }
        },
        _onEnterKeydown: function() {
            this.uiDownAction(), this.async(this.uiUpAction, 1);
        },
        _onSpaceKeydown: function() {
            this.uiDownAction();
        },
        _onSpaceKeyup: function() {
            this.uiUpAction();
        },
        _holdDownChanged: function(e, t) {
            void 0 !== t && (e ? this.downAction() : this.upAction());
        }
    });
}(), Polymer.PaperRippleBehavior = {
    properties: {
        noink: {
            type: Boolean,
            observer: "_noinkChanged"
        },
        _rippleContainer: {
            type: Object
        }
    },
    _buttonStateChanged: function() {
        this.focused && this.ensureRipple();
    },
    _downHandler: function(e) {
        Polymer.IronButtonStateImpl._downHandler.call(this, e), this.pressed && this.ensureRipple(e);
    },
    ensureRipple: function(e) {
        if (!this.hasRipple()) {
            this._ripple = this._createRipple(), this._ripple.noink = this.noink;
            var t = this._rippleContainer || this.root;
            if (t && Polymer.dom(t).appendChild(this._ripple), e) {
                var i = Polymer.dom(this._rippleContainer || this), n = Polymer.dom(e).rootTarget;
                i.deepContains(n) && this._ripple.uiDownAction(e);
            }
        }
    },
    getRipple: function() {
        return this.ensureRipple(), this._ripple;
    },
    hasRipple: function() {
        return Boolean(this._ripple);
    },
    _createRipple: function() {
        return document.createElement("paper-ripple");
    },
    _noinkChanged: function(e) {
        this.hasRipple() && (this._ripple.noink = e);
    }
}, Polymer.PaperInkyFocusBehaviorImpl = {
    observers: [ "_focusedChanged(receivedFocusFromKeyboard)" ],
    _focusedChanged: function(e) {
        e && this.ensureRipple(), this.hasRipple() && (this._ripple.holdDown = e);
    },
    _createRipple: function() {
        var e = Polymer.PaperRippleBehavior._createRipple();
        return e.id = "ink", e.setAttribute("center", ""), e.classList.add("circle"), e;
    }
}, Polymer.PaperInkyFocusBehavior = [ Polymer.IronButtonState, Polymer.IronControlState, Polymer.PaperRippleBehavior, Polymer.PaperInkyFocusBehaviorImpl ], 
Polymer({
    is: "paper-icon-button",
    hostAttributes: {
        role: "button",
        tabindex: "0"
    },
    behaviors: [ Polymer.PaperInkyFocusBehavior ],
    properties: {
        src: {
            type: String
        },
        icon: {
            type: String
        },
        alt: {
            type: String,
            observer: "_altChanged"
        }
    },
    _altChanged: function(e, t) {
        var i = this.getAttribute("aria-label");
        i && t != i || this.setAttribute("aria-label", e);
    }
}), Polymer.PaperButtonBehaviorImpl = {
    properties: {
        elevation: {
            type: Number,
            reflectToAttribute: !0,
            readOnly: !0
        }
    },
    observers: [ "_calculateElevation(focused, disabled, active, pressed, receivedFocusFromKeyboard)", "_computeKeyboardClass(receivedFocusFromKeyboard)" ],
    hostAttributes: {
        role: "button",
        tabindex: "0",
        animated: !0
    },
    _calculateElevation: function() {
        var e = 1;
        this.disabled ? e = 0 : this.active || this.pressed ? e = 4 : this.receivedFocusFromKeyboard && (e = 3), 
        this._setElevation(e);
    },
    _computeKeyboardClass: function(e) {
        this.toggleClass("keyboard-focus", e);
    },
    _spaceKeyDownHandler: function(e) {
        Polymer.IronButtonStateImpl._spaceKeyDownHandler.call(this, e), this.hasRipple() && this.getRipple().ripples.length < 1 && this._ripple.uiDownAction();
    },
    _spaceKeyUpHandler: function(e) {
        Polymer.IronButtonStateImpl._spaceKeyUpHandler.call(this, e), this.hasRipple() && this._ripple.uiUpAction();
    }
}, Polymer.PaperButtonBehavior = [ Polymer.IronButtonState, Polymer.IronControlState, Polymer.PaperRippleBehavior, Polymer.PaperButtonBehaviorImpl ], 
Polymer({
    is: "paper-button",
    behaviors: [ Polymer.PaperButtonBehavior ],
    properties: {
        raised: {
            type: Boolean,
            reflectToAttribute: !0,
            value: !1,
            observer: "_calculateElevation"
        }
    },
    _calculateElevation: function() {
        this.raised ? Polymer.PaperButtonBehaviorImpl._calculateElevation.apply(this) : this._setElevation(0);
    }
}), Polymer.PaperItemBehaviorImpl = {
    hostAttributes: {
        role: "option",
        tabindex: "0"
    }
}, Polymer.PaperItemBehavior = [ Polymer.IronButtonState, Polymer.IronControlState, Polymer.PaperItemBehaviorImpl ], 
Polymer({
    is: "paper-item",
    behaviors: [ Polymer.PaperItemBehavior ]
}), Polymer({
    is: "paper-material",
    properties: {
        elevation: {
            type: Number,
            reflectToAttribute: !0,
            value: 1
        },
        animated: {
            type: Boolean,
            reflectToAttribute: !0,
            value: !1
        }
    }
}), Polymer.IronMenuBehaviorImpl = {
    properties: {
        focusedItem: {
            observer: "_focusedItemChanged",
            readOnly: !0,
            type: Object
        },
        attrForItemTitle: {
            type: String
        },
        disabled: {
            type: Boolean,
            value: !1,
            observer: "_disabledChanged"
        }
    },
    _SEARCH_RESET_TIMEOUT_MS: 1e3,
    _previousTabIndex: 0,
    hostAttributes: {
        role: "menu"
    },
    observers: [ "_updateMultiselectable(multi)" ],
    listeners: {
        focus: "_onFocus",
        keydown: "_onKeydown",
        "iron-items-changed": "_onIronItemsChanged"
    },
    keyBindings: {
        up: "_onUpKey",
        down: "_onDownKey",
        esc: "_onEscKey",
        "shift+tab:keydown": "_onShiftTabDown"
    },
    attached: function() {
        this._resetTabindices();
    },
    select: function(e) {
        this._defaultFocusAsync && (this.cancelAsync(this._defaultFocusAsync), this._defaultFocusAsync = null);
        var t = this._valueToItem(e);
        t && t.hasAttribute("disabled") || (this._setFocusedItem(t), Polymer.IronMultiSelectableBehaviorImpl.select.apply(this, arguments));
    },
    _resetTabindices: function() {
        var e = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
        this.items.forEach(function(t) {
            t.setAttribute("tabindex", t === e ? "0" : "-1");
        }, this);
    },
    _updateMultiselectable: function(e) {
        e ? this.setAttribute("aria-multiselectable", "true") : this.removeAttribute("aria-multiselectable");
    },
    _focusWithKeyboardEvent: function(e) {
        this.cancelDebouncer("_clearSearchText");
        for (var t, i = this._searchText || "", n = (i += (e.key && 1 == e.key.length ? e.key : String.fromCharCode(e.keyCode)).toLocaleLowerCase()).length, o = 0; t = this.items[o]; o++) if (!t.hasAttribute("disabled")) {
            var r = this.attrForItemTitle || "textContent", s = (t[r] || t.getAttribute(r) || "").trim();
            if (!(s.length < n) && s.slice(0, n).toLocaleLowerCase() == i) {
                this._setFocusedItem(t);
                break;
            }
        }
        this._searchText = i, this.debounce("_clearSearchText", this._clearSearchText, this._SEARCH_RESET_TIMEOUT_MS);
    },
    _clearSearchText: function() {
        this._searchText = "";
    },
    _focusPrevious: function() {
        for (var e = this.items.length, t = Number(this.indexOf(this.focusedItem)), i = 1; i < e + 1; i++) {
            var n = this.items[(t - i + e) % e];
            if (!n.hasAttribute("disabled")) {
                var o = Polymer.dom(n).getOwnerRoot() || document;
                if (this._setFocusedItem(n), Polymer.dom(o).activeElement == n) return;
            }
        }
    },
    _focusNext: function() {
        for (var e = this.items.length, t = Number(this.indexOf(this.focusedItem)), i = 1; i < e + 1; i++) {
            var n = this.items[(t + i) % e];
            if (!n.hasAttribute("disabled")) {
                var o = Polymer.dom(n).getOwnerRoot() || document;
                if (this._setFocusedItem(n), Polymer.dom(o).activeElement == n) return;
            }
        }
    },
    _applySelection: function(e, t) {
        t ? e.setAttribute("aria-selected", "true") : e.removeAttribute("aria-selected"), 
        Polymer.IronSelectableBehavior._applySelection.apply(this, arguments);
    },
    _focusedItemChanged: function(e, t) {
        t && t.setAttribute("tabindex", "-1"), !e || e.hasAttribute("disabled") || this.disabled || (e.setAttribute("tabindex", "0"), 
        e.focus());
    },
    _onIronItemsChanged: function(e) {
        e.detail.addedNodes.length && this._resetTabindices();
    },
    _onShiftTabDown: function(e) {
        var t = this.getAttribute("tabindex");
        Polymer.IronMenuBehaviorImpl._shiftTabPressed = !0, this._setFocusedItem(null), 
        this.setAttribute("tabindex", "-1"), this.async(function() {
            this.setAttribute("tabindex", t), Polymer.IronMenuBehaviorImpl._shiftTabPressed = !1;
        }, 1);
    },
    _onFocus: function(e) {
        if (!Polymer.IronMenuBehaviorImpl._shiftTabPressed) {
            var t = Polymer.dom(e).rootTarget;
            (t === this || void 0 === t.tabIndex || this.isLightDescendant(t)) && (this._defaultFocusAsync = this.async(function() {
                var e = this.multi ? this.selectedItems && this.selectedItems[0] : this.selectedItem;
                this._setFocusedItem(null), e ? this._setFocusedItem(e) : this.items[0] && this._focusNext();
            }));
        }
    },
    _onUpKey: function(e) {
        this._focusPrevious(), e.detail.keyboardEvent.preventDefault();
    },
    _onDownKey: function(e) {
        this._focusNext(), e.detail.keyboardEvent.preventDefault();
    },
    _onEscKey: function(e) {
        this.focusedItem.blur();
    },
    _onKeydown: function(e) {
        this.keyboardEventMatchesKeys(e, "up down esc") || this._focusWithKeyboardEvent(e), 
        e.stopPropagation();
    },
    _activateHandler: function(e) {
        Polymer.IronSelectableBehavior._activateHandler.call(this, e), e.stopPropagation();
    },
    _disabledChanged: function(e) {
        e ? (this._previousTabIndex = this.hasAttribute("tabindex") ? this.tabIndex : 0, 
        this.removeAttribute("tabindex")) : this.hasAttribute("tabindex") || this.setAttribute("tabindex", this._previousTabIndex);
    }
}, Polymer.IronMenuBehaviorImpl._shiftTabPressed = !1, Polymer.IronMenuBehavior = [ Polymer.IronMultiSelectableBehavior, Polymer.IronA11yKeysBehavior, Polymer.IronMenuBehaviorImpl ], 
Polymer({
    is: "paper-menu",
    behaviors: [ Polymer.IronMenuBehavior ]
}), function() {
    "use strict";
    Polymer.PaperScrollHeaderPanel = Polymer({
        is: "paper-scroll-header-panel",
        behaviors: [ Polymer.IronResizableBehavior ],
        properties: {
            condenses: {
                type: Boolean,
                value: !1
            },
            noDissolve: {
                type: Boolean,
                value: !1
            },
            noReveal: {
                type: Boolean,
                value: !1
            },
            fixed: {
                type: Boolean,
                value: !1
            },
            keepCondensedHeader: {
                type: Boolean,
                value: !1
            },
            headerHeight: {
                type: Number,
                value: 0
            },
            condensedHeaderHeight: {
                type: Number,
                value: 0
            },
            scrollAwayTopbar: {
                type: Boolean,
                value: !1
            },
            headerState: {
                type: Number,
                readOnly: !0,
                notify: !0,
                value: 0
            },
            _defaultCondsensedHeaderHeight: {
                type: Number,
                value: 0
            }
        },
        observers: [ "_setup(headerHeight, condensedHeaderHeight, fixed)", "_condensedHeaderHeightChanged(condensedHeaderHeight)", "_headerHeightChanged(headerHeight, condensedHeaderHeight)", "_condensesChanged(condenses)" ],
        listeners: {
            "iron-resize": "measureHeaderHeight"
        },
        ready: function() {
            this._scrollHandler = this._scroll.bind(this), this.scroller.addEventListener("scroll", this._scrollHandler);
        },
        attached: function() {
            this.async(this.measureHeaderHeight, 1);
        },
        get header() {
            return Polymer.dom(this.$.headerContent).getDistributedNodes()[0];
        },
        get content() {
            return Polymer.dom(this.$.mainContent).getDistributedNodes()[0];
        },
        get scroller() {
            return this.$.mainContainer;
        },
        get _headerMaxDelta() {
            return this.keepCondensedHeader ? this._headerMargin : this.headerHeight;
        },
        get _headerMargin() {
            return this.headerHeight - this.condensedHeaderHeight;
        },
        _y: 0,
        _prevScrollTop: 0,
        measureHeaderHeight: function() {
            var e = this.header;
            e && e.offsetHeight && (this.headerHeight = e.offsetHeight);
        },
        scroll: function(e, t) {
            if (t) {
                var i = function(e, t, i, n) {
                    return e /= n, -i * e * (e - 2) + t;
                }, n = Math.random(), o = Date.now(), r = this.scroller.scrollTop, s = e - r;
                this._currentAnimationId = n, function t() {
                    var a = Date.now() - o;
                    a > 200 ? (this.scroller.scrollTop = e, this._updateScrollState(e)) : this._currentAnimationId === n && (this.scroller.scrollTop = i(a, r, s, 200), 
                    requestAnimationFrame(t.bind(this)));
                }.call(this);
            } else this.scroller.scrollTop = e, this._updateScrollState(e);
        },
        condense: function(e) {
            if (this.condenses && !this.fixed && !this.noReveal) switch (this.headerState) {
              case 1:
                this.scroll(this.scroller.scrollTop - (this._headerMaxDelta - this._headerMargin), e);
                break;

              case 0:
              case 3:
                this.scroll(this._headerMargin, e);
            }
        },
        scrollToTop: function(e) {
            this.scroll(0, e);
        },
        _headerHeightChanged: function(e) {
            null !== this._defaultCondsensedHeaderHeight && (this._defaultCondsensedHeaderHeight = Math.round(1 * e / 3), 
            this.condensedHeaderHeight = this._defaultCondsensedHeaderHeight);
        },
        _condensedHeaderHeightChanged: function(e) {
            e && this._defaultCondsensedHeaderHeight != e && (this._defaultCondsensedHeaderHeight = null);
        },
        _condensesChanged: function() {
            this._updateScrollState(this.scroller.scrollTop), this._condenseHeader(null);
        },
        _setup: function() {
            var e = this.scroller.style;
            if (e.paddingTop = this.fixed ? "" : this.headerHeight + "px", e.top = this.fixed ? this.headerHeight + "px" : "", 
            this.fixed) this._setHeaderState(0), this._transformHeader(null); else switch (this.headerState) {
              case 1:
                this._transformHeader(this._headerMaxDelta);
                break;

              case 2:
                this._transformHeader(this._headerMargin);
            }
        },
        _transformHeader: function(e) {
            this._translateY(this.$.headerContainer, -e), this.condenses && this._condenseHeader(e), 
            this.fire("paper-header-transform", {
                y: e,
                height: this.headerHeight,
                condensedHeight: this.condensedHeaderHeight
            });
        },
        _condenseHeader: function(e) {
            var t = null === e;
            !this.scrollAwayTopbar && this.header && this.header.$ && this.header.$.topBar && this._translateY(this.header.$.topBar, t ? null : Math.min(e, this._headerMargin)), 
            this.noDissolve || (this.$.headerBg.style.opacity = t ? "" : (this._headerMargin - e) / this._headerMargin), 
            this._translateY(this.$.headerBg, t ? null : e / 2), this.noDissolve || (this.$.condensedHeaderBg.style.opacity = t ? "" : e / this._headerMargin, 
            this._translateY(this.$.condensedHeaderBg, t ? null : e / 2));
        },
        _translateY: function(e, t) {
            this.transform(null === t ? "" : "translate3d(0, " + t + "px, 0)", e);
        },
        _scroll: function(e) {
            this.header && (this._updateScrollState(this.scroller.scrollTop), this.fire("content-scroll", {
                target: this.scroller
            }, {
                cancelable: !1
            }));
        },
        _updateScrollState: function(e) {
            var t = e - this._prevScrollTop, i = Math.max(0, this.noReveal ? e : this._y + t);
            i > this._headerMaxDelta ? (i = this._headerMaxDelta, this.keepCondensedHeader ? this._setHeaderState(2) : this._setHeaderState(1)) : this.condenses && e >= this._headerMargin ? (i = Math.max(i, this._headerMargin), 
            this._setHeaderState(2)) : 0 === i ? this._setHeaderState(0) : this._setHeaderState(3), 
            this.fixed || i === this._y || this._transformHeader(i), this._prevScrollTop = Math.max(e, 0), 
            this._y = i;
        }
    }), Polymer.PaperScrollHeaderPanel.HEADER_STATE_EXPANDED = 0, Polymer.PaperScrollHeaderPanel.HEADER_STATE_HIDDEN = 1, 
    Polymer.PaperScrollHeaderPanel.HEADER_STATE_CONDENSED = 2, Polymer.PaperScrollHeaderPanel.HEADER_STATE_INTERPOLATED = 3;
}(), Polymer({
    is: "paper-toolbar",
    hostAttributes: {
        role: "toolbar"
    },
    properties: {
        bottomJustify: {
            type: String,
            value: ""
        },
        justify: {
            type: String,
            value: ""
        },
        middleJustify: {
            type: String,
            value: ""
        }
    },
    attached: function() {
        this._observer = this._observe(this), this._updateAriaLabelledBy();
    },
    detached: function() {
        this._observer && this._observer.disconnect();
    },
    _observe: function(e) {
        var t = new MutationObserver(function() {
            this._updateAriaLabelledBy();
        }.bind(this));
        return t.observe(e, {
            childList: !0,
            subtree: !0
        }), t;
    },
    _updateAriaLabelledBy: function() {
        for (var e, t = [], i = Polymer.dom(this.root).querySelectorAll("content"), n = 0; e = i[n]; n++) for (var o, r = Polymer.dom(e).getDistributedNodes(), s = 0; o = r[s]; s++) if (o.classList && o.classList.contains("title")) if (o.id) t.push(o.id); else {
            var a = "paper-toolbar-label-" + Math.floor(1e4 * Math.random());
            o.id = a, t.push(a);
        }
        t.length > 0 && this.setAttribute("aria-labelledby", t.join(" "));
    },
    _computeBarExtraClasses: function(e) {
        return e ? e + ("justified" === e ? "" : "-justified") : "";
    }
}), Polymer({
    is: "neon-animated-pages",
    behaviors: [ Polymer.IronResizableBehavior, Polymer.IronSelectableBehavior, Polymer.NeonAnimationRunnerBehavior ],
    properties: {
        activateEvent: {
            type: String,
            value: ""
        },
        animateInitialSelection: {
            type: Boolean,
            value: !1
        }
    },
    listeners: {
        "iron-select": "_onIronSelect",
        "neon-animation-finish": "_onNeonAnimationFinish"
    },
    _onIronSelect: function(e) {
        var t = e.detail.item;
        if (!(this.items.indexOf(t) < 0)) {
            var i = this._valueToItem(this._prevSelected) || !1;
            this._prevSelected = this.selected, i || this.animateInitialSelection ? (this.animationConfig = [], 
            this.entryAnimation ? this.animationConfig.push({
                name: this.entryAnimation,
                node: t
            }) : t.getAnimationConfig && this.animationConfig.push({
                animatable: t,
                type: "entry"
            }), i && (i.classList.contains("neon-animating") && (this._squelchNextFinishEvent = !0, 
            this.cancelAnimation(), this._completeSelectedChanged(), this._squelchNextFinishEvent = !1), 
            this.exitAnimation ? this.animationConfig.push({
                name: this.exitAnimation,
                node: i
            }) : i.getAnimationConfig && this.animationConfig.push({
                animatable: i,
                type: "exit"
            }), i.classList.add("neon-animating")), t.classList.add("neon-animating"), this.animationConfig.length >= 1 ? this.isAttached ? this.playAnimation(void 0, {
                fromPage: i,
                toPage: t
            }) : this.async(function() {
                this.playAnimation(void 0, {
                    fromPage: null,
                    toPage: t
                });
            }) : this._completeSelectedChanged(i, t)) : this._completeSelectedChanged();
        }
    },
    _completeSelectedChanged: function(e, t) {
        if (t && t.classList.remove("neon-animating"), e && e.classList.remove("neon-animating"), 
        !t || !e) for (var i, n = Polymer.dom(this.$.content).getDistributedNodes(), o = 0; i = n[o]; o++) i.classList && i.classList.remove("neon-animating");
        this.async(this._notifyPageResize);
    },
    _onNeonAnimationFinish: function(e) {
        this._squelchNextFinishEvent ? this._squelchNextFinishEvent = !1 : this._completeSelectedChanged(e.detail.fromPage, e.detail.toPage);
    },
    _notifyPageResize: function() {
        var e = this.selectedItem || this._valueToItem(this.selected);
        this.resizerShouldNotify = function(t) {
            return t == e;
        }, this.notifyResize();
    }
}), Polymer.NeonAnimationBehavior = {
    properties: {
        animationTiming: {
            type: Object,
            value: function() {
                return {
                    duration: 500,
                    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
                    fill: "both"
                };
            }
        }
    },
    isNeonAnimation: !0,
    timingFromConfig: function(e) {
        if (e.timing) for (var t in e.timing) this.animationTiming[t] = e.timing[t];
        return this.animationTiming;
    },
    setPrefixedProperty: function(e, t, i) {
        for (var n, o = {
            transform: [ "webkitTransform" ],
            transformOrigin: [ "mozTransformOrigin", "webkitTransformOrigin" ]
        }[t], r = 0; n = o[r]; r++) e.style[n] = i;
        e.style[t] = i;
    },
    complete: function() {}
}, function(e, t) {
    var i = {}, n = {}, o = {};
    !function(e, t) {
        function i() {
            this._delay = 0, this._endDelay = 0, this._fill = "none", this._iterationStart = 0, 
            this._iterations = 1, this._duration = 0, this._playbackRate = 1, this._direction = "normal", 
            this._easing = "linear", this._easingFunction = y;
        }
        function n() {
            return e.isDeprecated("Invalid timing inputs", "2016-03-02", "TypeError exceptions will be thrown instead.", !0);
        }
        function o(t, n, o) {
            var r = new i();
            return n && (r.fill = "both", r.duration = "auto"), "number" != typeof t || isNaN(t) ? void 0 !== t && Object.getOwnPropertyNames(t).forEach(function(i) {
                if ("auto" != t[i]) {
                    if (("number" == typeof r[i] || "duration" == i) && ("number" != typeof t[i] || isNaN(t[i]))) return;
                    if ("fill" == i && -1 == _.indexOf(t[i])) return;
                    if ("direction" == i && -1 == g.indexOf(t[i])) return;
                    if ("playbackRate" == i && 1 !== t[i] && e.isDeprecated("AnimationEffectTiming.playbackRate", "2014-11-28", "Use Animation.playbackRate instead.")) return;
                    r[i] = t[i];
                }
            }) : r.duration = t, r;
        }
        function r(e, t, i, n) {
            return e < 0 || e > 1 || i < 0 || i > 1 ? y : function(o) {
                function r(e, t, i) {
                    return 3 * e * (1 - i) * (1 - i) * i + 3 * t * (1 - i) * i * i + i * i * i;
                }
                if (o <= 0) {
                    var s = 0;
                    return e > 0 ? s = t / e : !t && i > 0 && (s = n / i), s * o;
                }
                if (o >= 1) {
                    var a = 0;
                    return i < 1 ? a = (n - 1) / (i - 1) : 1 == i && e < 1 && (a = (t - 1) / (e - 1)), 
                    1 + a * (o - 1);
                }
                for (var l = 0, h = 1; l < h; ) {
                    var c = (l + h) / 2, u = r(e, i, c);
                    if (Math.abs(o - u) < 1e-5) return r(t, n, c);
                    u < o ? l = c : h = c;
                }
                return r(t, n, c);
            };
        }
        function s(e, t) {
            return function(i) {
                if (i >= 1) return 1;
                var n = 1 / e;
                return (i += t * n) - i % n;
            };
        }
        function a(e) {
            w || (w = document.createElement("div").style), w.animationTimingFunction = "", 
            w.animationTimingFunction = e;
            var t = w.animationTimingFunction;
            if ("" == t && n()) throw new TypeError(e + " is not a valid value for easing");
            return t;
        }
        function l(e) {
            if ("linear" == e) return y;
            var t = E.exec(e);
            if (t) return r.apply(this, t.slice(1).map(Number));
            var i = A.exec(e);
            return i ? s(Number(i[1]), {
                start: v,
                middle: b,
                end: P
            }[i[2]]) : C[e] || y;
        }
        function h(e) {
            return 0 === e.duration || 0 === e.iterations ? 0 : e.duration * e.iterations;
        }
        function c(e, t, i) {
            if (null == t) return T;
            var n = i.delay + e + i.endDelay;
            return t < Math.min(i.delay, n) ? x : t >= Math.min(i.delay + e, n) ? N : I;
        }
        function u(e, t, i, n, o) {
            switch (n) {
              case x:
                return "backwards" == t || "both" == t ? 0 : null;

              case I:
                return i - o;

              case N:
                return "forwards" == t || "both" == t ? e : null;

              case T:
                return null;
            }
        }
        function d(e, t, i, n, o) {
            var r = o;
            return 0 === e ? t !== x && (r += i) : r += n / e, r;
        }
        function f(e, t, i, n, o, r) {
            var s = e === 1 / 0 ? t % 1 : e % 1;
            return 0 !== s || i !== N || 0 === n || 0 === o && 0 !== r || (s = 1), s;
        }
        function p(e, t, i, n) {
            return e === N && t === 1 / 0 ? 1 / 0 : 1 === i ? Math.floor(n) - 1 : Math.floor(n);
        }
        function m(e, t, i) {
            var n = e;
            if ("normal" !== e && "reverse" !== e) {
                var o = t;
                "alternate-reverse" === e && (o += 1), n = "normal", o !== 1 / 0 && o % 2 != 0 && (n = "reverse");
            }
            return "normal" === n ? i : 1 - i;
        }
        var _ = "backwards|forwards|both|none".split("|"), g = "reverse|alternate|alternate-reverse".split("|"), y = function(e) {
            return e;
        };
        i.prototype = {
            _setMember: function(t, i) {
                this["_" + t] = i, this._effect && (this._effect._timingInput[t] = i, this._effect._timing = e.normalizeTimingInput(this._effect._timingInput), 
                this._effect.activeDuration = e.calculateActiveDuration(this._effect._timing), this._effect._animation && this._effect._animation._rebuildUnderlyingAnimation());
            },
            get playbackRate() {
                return this._playbackRate;
            },
            set delay(e) {
                this._setMember("delay", e);
            },
            get delay() {
                return this._delay;
            },
            set endDelay(e) {
                this._setMember("endDelay", e);
            },
            get endDelay() {
                return this._endDelay;
            },
            set fill(e) {
                this._setMember("fill", e);
            },
            get fill() {
                return this._fill;
            },
            set iterationStart(e) {
                if ((isNaN(e) || e < 0) && n()) throw new TypeError("iterationStart must be a non-negative number, received: " + timing.iterationStart);
                this._setMember("iterationStart", e);
            },
            get iterationStart() {
                return this._iterationStart;
            },
            set duration(e) {
                if ("auto" != e && (isNaN(e) || e < 0) && n()) throw new TypeError("duration must be non-negative or auto, received: " + e);
                this._setMember("duration", e);
            },
            get duration() {
                return this._duration;
            },
            set direction(e) {
                this._setMember("direction", e);
            },
            get direction() {
                return this._direction;
            },
            set easing(e) {
                this._easingFunction = l(a(e)), this._setMember("easing", e);
            },
            get easing() {
                return this._easing;
            },
            set iterations(e) {
                if ((isNaN(e) || e < 0) && n()) throw new TypeError("iterations must be non-negative, received: " + e);
                this._setMember("iterations", e);
            },
            get iterations() {
                return this._iterations;
            }
        };
        var v = 1, b = .5, P = 0, C = {
            ease: r(.25, .1, .25, 1),
            "ease-in": r(.42, 0, 1, 1),
            "ease-out": r(0, 0, .58, 1),
            "ease-in-out": r(.42, 0, .58, 1),
            "step-start": s(1, v),
            "step-middle": s(1, b),
            "step-end": s(1, P)
        }, w = null, S = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*", E = new RegExp("cubic-bezier\\(" + S + "," + S + "," + S + "," + S + "\\)"), A = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/, T = 0, x = 1, N = 2, I = 3;
        e.cloneTimingInput = function(e) {
            if ("number" == typeof e) return e;
            var t = {};
            for (var i in e) t[i] = e[i];
            return t;
        }, e.makeTiming = o, e.numericTimingToObject = function(e) {
            return "number" == typeof e && (e = isNaN(e) ? {
                duration: 0
            } : {
                duration: e
            }), e;
        }, e.normalizeTimingInput = function(t, i) {
            return t = e.numericTimingToObject(t), o(t, i);
        }, e.calculateActiveDuration = function(e) {
            return Math.abs(h(e) / e.playbackRate);
        }, e.calculateIterationProgress = function(e, t, i) {
            var n = c(e, t, i), o = u(e, i.fill, t, n, i.delay);
            if (null === o) return null;
            var r = d(i.duration, n, i.iterations, o, i.iterationStart), s = f(r, i.iterationStart, n, i.iterations, o, i.duration), a = p(n, i.iterations, s, r), l = m(i.direction, a, s);
            return i._easingFunction(l);
        }, e.calculatePhase = c, e.normalizeEasing = a, e.parseEasingFunction = l;
    }(i), function(e, t) {
        function i(e, t) {
            return e in h ? h[e][t] || t : t;
        }
        function n(e) {
            return "display" === e || 0 === e.lastIndexOf("animation", 0) || 0 === e.lastIndexOf("transition", 0);
        }
        function o(e, t, o) {
            if (!n(e)) {
                var r = s[e];
                if (r) {
                    a.style[e] = t;
                    for (var l in r) {
                        var h = r[l], c = a.style[h];
                        o[h] = i(h, c);
                    }
                } else o[e] = i(e, t);
            }
        }
        function r(e) {
            var t = [];
            for (var i in e) if (!(i in [ "easing", "offset", "composite" ])) {
                var n = e[i];
                Array.isArray(n) || (n = [ n ]);
                for (var o, r = n.length, s = 0; s < r; s++) o = {}, o.offset = "offset" in e ? e.offset : 1 == r ? 1 : s / (r - 1), 
                "easing" in e && (o.easing = e.easing), "composite" in e && (o.composite = e.composite), 
                o[i] = n[s], t.push(o);
            }
            return t.sort(function(e, t) {
                return e.offset - t.offset;
            }), t;
        }
        var s = {
            background: [ "backgroundImage", "backgroundPosition", "backgroundSize", "backgroundRepeat", "backgroundAttachment", "backgroundOrigin", "backgroundClip", "backgroundColor" ],
            border: [ "borderTopColor", "borderTopStyle", "borderTopWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth" ],
            borderBottom: [ "borderBottomWidth", "borderBottomStyle", "borderBottomColor" ],
            borderColor: [ "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor" ],
            borderLeft: [ "borderLeftWidth", "borderLeftStyle", "borderLeftColor" ],
            borderRadius: [ "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ],
            borderRight: [ "borderRightWidth", "borderRightStyle", "borderRightColor" ],
            borderTop: [ "borderTopWidth", "borderTopStyle", "borderTopColor" ],
            borderWidth: [ "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth" ],
            flex: [ "flexGrow", "flexShrink", "flexBasis" ],
            font: [ "fontFamily", "fontSize", "fontStyle", "fontVariant", "fontWeight", "lineHeight" ],
            margin: [ "marginTop", "marginRight", "marginBottom", "marginLeft" ],
            outline: [ "outlineColor", "outlineStyle", "outlineWidth" ],
            padding: [ "paddingTop", "paddingRight", "paddingBottom", "paddingLeft" ]
        }, a = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), l = {
            thin: "1px",
            medium: "3px",
            thick: "5px"
        }, h = {
            borderBottomWidth: l,
            borderLeftWidth: l,
            borderRightWidth: l,
            borderTopWidth: l,
            fontSize: {
                "xx-small": "60%",
                "x-small": "75%",
                small: "89%",
                medium: "100%",
                large: "120%",
                "x-large": "150%",
                "xx-large": "200%"
            },
            fontWeight: {
                normal: "400",
                bold: "700"
            },
            outlineWidth: l,
            textShadow: {
                none: "0px 0px 0px transparent"
            },
            boxShadow: {
                none: "0px 0px 0px 0px transparent"
            }
        };
        e.convertToArrayForm = r, e.normalizeKeyframes = function(t) {
            if (null == t) return [];
            window.Symbol && Symbol.iterator && Array.prototype.from && t[Symbol.iterator] && (t = Array.from(t)), 
            Array.isArray(t) || (t = r(t));
            for (var i = t.map(function(t) {
                var i = {};
                for (var n in t) {
                    var r = t[n];
                    if ("offset" == n) {
                        if (null != r) {
                            if (r = Number(r), !isFinite(r)) throw new TypeError("Keyframe offsets must be numbers.");
                            if (r < 0 || r > 1) throw new TypeError("Keyframe offsets must be between 0 and 1.");
                        }
                    } else if ("composite" == n) {
                        if ("add" == r || "accumulate" == r) throw {
                            type: DOMException.NOT_SUPPORTED_ERR,
                            name: "NotSupportedError",
                            message: "add compositing is not supported"
                        };
                        if ("replace" != r) throw new TypeError("Invalid composite mode " + r + ".");
                    } else r = "easing" == n ? e.normalizeEasing(r) : "" + r;
                    o(n, r, i);
                }
                return void 0 == i.offset && (i.offset = null), void 0 == i.easing && (i.easing = "linear"), 
                i;
            }), n = !0, s = -1 / 0, a = 0; a < i.length; a++) {
                var l = i[a].offset;
                if (null != l) {
                    if (l < s) throw new TypeError("Keyframes are not loosely sorted by offset. Sort or specify offsets.");
                    s = l;
                } else n = !1;
            }
            return i = i.filter(function(e) {
                return e.offset >= 0 && e.offset <= 1;
            }), n || function() {
                var e = i.length;
                null == i[e - 1].offset && (i[e - 1].offset = 1), e > 1 && null == i[0].offset && (i[0].offset = 0);
                for (var t = 0, n = i[0].offset, o = 1; o < e; o++) {
                    var r = i[o].offset;
                    if (null != r) {
                        for (var s = 1; s < o - t; s++) i[t + s].offset = n + (r - n) * s / (o - t);
                        t = o, n = r;
                    }
                }
            }(), i;
        };
    }(i), function(e) {
        var t = {};
        e.isDeprecated = function(e, i, n, o) {
            var r = o ? "are" : "is", s = new Date(), a = new Date(i);
            return a.setMonth(a.getMonth() + 3), !(s < a && (e in t || console.warn("Web Animations: " + e + " " + r + " deprecated and will stop working on " + a.toDateString() + ". " + n), 
            t[e] = !0, 1));
        }, e.deprecated = function(t, i, n, o) {
            var r = o ? "are" : "is";
            if (e.isDeprecated(t, i, n, o)) throw new Error(t + " " + r + " no longer supported. " + n);
        };
    }(i), function() {
        if (document.documentElement.animate) {
            var e = document.documentElement.animate([], 0), t = !0;
            if (e && (t = !1, "play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(i) {
                void 0 === e[i] && (t = !0);
            })), !t) return;
        }
        !function(e, t, i) {
            function n(e) {
                for (var t = {}, i = 0; i < e.length; i++) for (var n in e[i]) if ("offset" != n && "easing" != n && "composite" != n) {
                    var o = {
                        offset: e[i].offset,
                        easing: e[i].easing,
                        value: e[i][n]
                    };
                    t[n] = t[n] || [], t[n].push(o);
                }
                for (var r in t) {
                    var s = t[r];
                    if (0 != s[0].offset || 1 != s[s.length - 1].offset) throw {
                        type: DOMException.NOT_SUPPORTED_ERR,
                        name: "NotSupportedError",
                        message: "Partial keyframes are not supported"
                    };
                }
                return t;
            }
            function o(i) {
                var n = [];
                for (var o in i) for (var r = i[o], s = 0; s < r.length - 1; s++) {
                    var a = s, l = s + 1, h = r[a].offset, c = r[l].offset, u = h, d = c;
                    0 == s && (u = -1 / 0, 0 == c && (l = a)), s == r.length - 2 && (d = 1 / 0, 1 == h && (a = l)), 
                    n.push({
                        applyFrom: u,
                        applyTo: d,
                        startOffset: r[a].offset,
                        endOffset: r[l].offset,
                        easingFunction: e.parseEasingFunction(r[a].easing),
                        property: o,
                        interpolation: t.propertyInterpolation(o, r[a].value, r[l].value)
                    });
                }
                return n.sort(function(e, t) {
                    return e.startOffset - t.startOffset;
                }), n;
            }
            t.convertEffectInput = function(i) {
                var r = n(e.normalizeKeyframes(i)), s = o(r);
                return function(e, i) {
                    if (null != i) s.filter(function(e) {
                        return i >= e.applyFrom && i < e.applyTo;
                    }).forEach(function(n) {
                        var o = i - n.startOffset, r = n.endOffset - n.startOffset, s = 0 == r ? 0 : n.easingFunction(o / r);
                        t.apply(e, n.property, n.interpolation(s));
                    }); else for (var n in r) "offset" != n && "easing" != n && "composite" != n && t.clear(e, n);
                };
            };
        }(i, n), function(e, t, i) {
            function n(e) {
                return e.replace(/-(.)/g, function(e, t) {
                    return t.toUpperCase();
                });
            }
            function o(e, t, i) {
                r[i] = r[i] || [], r[i].push([ e, t ]);
            }
            var r = {};
            t.addPropertiesHandler = function(e, t, i) {
                for (var r = 0; r < i.length; r++) o(e, t, n(i[r]));
            };
            var s = {
                backgroundColor: "transparent",
                backgroundPosition: "0% 0%",
                borderBottomColor: "currentColor",
                borderBottomLeftRadius: "0px",
                borderBottomRightRadius: "0px",
                borderBottomWidth: "3px",
                borderLeftColor: "currentColor",
                borderLeftWidth: "3px",
                borderRightColor: "currentColor",
                borderRightWidth: "3px",
                borderSpacing: "2px",
                borderTopColor: "currentColor",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderTopWidth: "3px",
                bottom: "auto",
                clip: "rect(0px, 0px, 0px, 0px)",
                color: "black",
                fontSize: "100%",
                fontWeight: "400",
                height: "auto",
                left: "auto",
                letterSpacing: "normal",
                lineHeight: "120%",
                marginBottom: "0px",
                marginLeft: "0px",
                marginRight: "0px",
                marginTop: "0px",
                maxHeight: "none",
                maxWidth: "none",
                minHeight: "0px",
                minWidth: "0px",
                opacity: "1.0",
                outlineColor: "invert",
                outlineOffset: "0px",
                outlineWidth: "3px",
                paddingBottom: "0px",
                paddingLeft: "0px",
                paddingRight: "0px",
                paddingTop: "0px",
                right: "auto",
                strokeDasharray: "none",
                strokeDashoffset: "0px",
                textIndent: "0px",
                textShadow: "0px 0px 0px transparent",
                top: "auto",
                transform: "",
                verticalAlign: "0px",
                visibility: "visible",
                width: "auto",
                wordSpacing: "normal",
                zIndex: "auto"
            };
            t.propertyInterpolation = function(i, o, a) {
                var l = i;
                /-/.test(i) && !e.isDeprecated("Hyphenated property names", "2016-03-22", "Use camelCase instead.", !0) && (l = n(i)), 
                "initial" != o && "initial" != a || ("initial" == o && (o = s[l]), "initial" == a && (a = s[l]));
                for (var h = o == a ? [] : r[l], c = 0; h && c < h.length; c++) {
                    var u = h[c][0](o), d = h[c][0](a);
                    if (void 0 !== u && void 0 !== d) {
                        var f = h[c][1](u, d);
                        if (f) {
                            var p = t.Interpolation.apply(null, f);
                            return function(e) {
                                return 0 == e ? o : 1 == e ? a : p(e);
                            };
                        }
                    }
                }
                return t.Interpolation(!1, !0, function(e) {
                    return e ? a : o;
                });
            };
        }(i, n), function(e, t, i) {
            function n(t) {
                var i = e.calculateActiveDuration(t), n = function(n) {
                    return e.calculateIterationProgress(i, n, t);
                };
                return n._totalDuration = t.delay + i + t.endDelay, n;
            }
            t.KeyframeEffect = function(i, o, r, s) {
                var a, l = n(e.normalizeTimingInput(r)), h = t.convertEffectInput(o), c = function() {
                    h(i, a);
                };
                return c._update = function(e) {
                    return null !== (a = l(e));
                }, c._clear = function() {
                    h(i, null);
                }, c._hasSameTarget = function(e) {
                    return i === e;
                }, c._target = i, c._totalDuration = l._totalDuration, c._id = s, c;
            };
        }(i, n), function(e, t) {
            e.apply = function(t, i, n) {
                t.style[e.propertyName(i)] = n;
            }, e.clear = function(t, i) {
                t.style[e.propertyName(i)] = "";
            };
        }(n), function(e) {
            window.Element.prototype.animate = function(t, i) {
                var n = "";
                return i && i.id && (n = i.id), e.timeline._play(e.KeyframeEffect(this, t, i, n));
            };
        }(n), function(e, t) {
            function i(e, t, n) {
                if ("number" == typeof e && "number" == typeof t) return e * (1 - n) + t * n;
                if ("boolean" == typeof e && "boolean" == typeof t) return n < .5 ? e : t;
                if (e.length == t.length) {
                    for (var o = [], r = 0; r < e.length; r++) o.push(i(e[r], t[r], n));
                    return o;
                }
                throw "Mismatched interpolation arguments " + e + ":" + t;
            }
            n.Interpolation = function(e, t, n) {
                return function(o) {
                    return n(i(e, t, o));
                };
            };
        }(), function(e, t, i) {
            e.sequenceNumber = 0;
            var n = function(e, t, i) {
                this.target = e, this.currentTime = t, this.timelineTime = i, this.type = "finish", 
                this.bubbles = !1, this.cancelable = !1, this.currentTarget = e, this.defaultPrevented = !1, 
                this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
            };
            t.Animation = function(t) {
                this.id = "", t && t._id && (this.id = t._id), this._sequenceNumber = e.sequenceNumber++, 
                this._currentTime = 0, this._startTime = null, this._paused = !1, this._playbackRate = 1, 
                this._inTimeline = !0, this._finishedFlag = !0, this.onfinish = null, this._finishHandlers = [], 
                this._effect = t, this._inEffect = this._effect._update(0), this._idle = !0, this._currentTimePending = !1;
            }, t.Animation.prototype = {
                _ensureAlive: function() {
                    this.playbackRate < 0 && 0 === this.currentTime ? this._inEffect = this._effect._update(-1) : this._inEffect = this._effect._update(this.currentTime), 
                    this._inTimeline || !this._inEffect && this._finishedFlag || (this._inTimeline = !0, 
                    t.timeline._animations.push(this));
                },
                _tickCurrentTime: function(e, t) {
                    e != this._currentTime && (this._currentTime = e, this._isFinished && !t && (this._currentTime = this._playbackRate > 0 ? this._totalDuration : 0), 
                    this._ensureAlive());
                },
                get currentTime() {
                    return this._idle || this._currentTimePending ? null : this._currentTime;
                },
                set currentTime(e) {
                    e = +e, isNaN(e) || (t.restart(), this._paused || null == this._startTime || (this._startTime = this._timeline.currentTime - e / this._playbackRate), 
                    this._currentTimePending = !1, this._currentTime != e && (this._idle && (this._idle = !1, 
                    this._paused = !0), this._tickCurrentTime(e, !0), t.applyDirtiedAnimation(this)));
                },
                get startTime() {
                    return this._startTime;
                },
                set startTime(e) {
                    e = +e, isNaN(e) || this._paused || this._idle || (this._startTime = e, this._tickCurrentTime((this._timeline.currentTime - this._startTime) * this.playbackRate), 
                    t.applyDirtiedAnimation(this));
                },
                get playbackRate() {
                    return this._playbackRate;
                },
                set playbackRate(e) {
                    if (e != this._playbackRate) {
                        var i = this.currentTime;
                        this._playbackRate = e, this._startTime = null, "paused" != this.playState && "idle" != this.playState && (this._finishedFlag = !1, 
                        this._idle = !1, this._ensureAlive(), t.applyDirtiedAnimation(this)), null != i && (this.currentTime = i);
                    }
                },
                get _isFinished() {
                    return !this._idle && (this._playbackRate > 0 && this._currentTime >= this._totalDuration || this._playbackRate < 0 && this._currentTime <= 0);
                },
                get _totalDuration() {
                    return this._effect._totalDuration;
                },
                get playState() {
                    return this._idle ? "idle" : null == this._startTime && !this._paused && 0 != this.playbackRate || this._currentTimePending ? "pending" : this._paused ? "paused" : this._isFinished ? "finished" : "running";
                },
                _rewind: function() {
                    if (this._playbackRate >= 0) this._currentTime = 0; else {
                        if (!(this._totalDuration < 1 / 0)) throw new DOMException("Unable to rewind negative playback rate animation with infinite duration", "InvalidStateError");
                        this._currentTime = this._totalDuration;
                    }
                },
                play: function() {
                    this._paused = !1, (this._isFinished || this._idle) && (this._rewind(), this._startTime = null), 
                    this._finishedFlag = !1, this._idle = !1, this._ensureAlive(), t.applyDirtiedAnimation(this);
                },
                pause: function() {
                    this._isFinished || this._paused || this._idle ? this._idle && (this._rewind(), 
                    this._idle = !1) : this._currentTimePending = !0, this._startTime = null, this._paused = !0;
                },
                finish: function() {
                    this._idle || (this.currentTime = this._playbackRate > 0 ? this._totalDuration : 0, 
                    this._startTime = this._totalDuration - this.currentTime, this._currentTimePending = !1, 
                    t.applyDirtiedAnimation(this));
                },
                cancel: function() {
                    this._inEffect && (this._inEffect = !1, this._idle = !0, this._paused = !1, this._isFinished = !0, 
                    this._finishedFlag = !0, this._currentTime = 0, this._startTime = null, this._effect._update(null), 
                    t.applyDirtiedAnimation(this));
                },
                reverse: function() {
                    this.playbackRate *= -1, this.play();
                },
                addEventListener: function(e, t) {
                    "function" == typeof t && "finish" == e && this._finishHandlers.push(t);
                },
                removeEventListener: function(e, t) {
                    if ("finish" == e) {
                        var i = this._finishHandlers.indexOf(t);
                        i >= 0 && this._finishHandlers.splice(i, 1);
                    }
                },
                _fireEvents: function(e) {
                    if (this._isFinished) {
                        if (!this._finishedFlag) {
                            var t = new n(this, this._currentTime, e), i = this._finishHandlers.concat(this.onfinish ? [ this.onfinish ] : []);
                            setTimeout(function() {
                                i.forEach(function(e) {
                                    e.call(t.target, t);
                                });
                            }, 0), this._finishedFlag = !0;
                        }
                    } else this._finishedFlag = !1;
                },
                _tick: function(e, t) {
                    this._idle || this._paused || (null == this._startTime ? t && (this.startTime = e - this._currentTime / this.playbackRate) : this._isFinished || this._tickCurrentTime((e - this._startTime) * this.playbackRate)), 
                    t && (this._currentTimePending = !1, this._fireEvents(e));
                },
                get _needsTick() {
                    return this.playState in {
                        pending: 1,
                        running: 1
                    } || !this._finishedFlag;
                },
                _targetAnimations: function() {
                    var e = this._effect._target;
                    return e._activeAnimations || (e._activeAnimations = []), e._activeAnimations;
                },
                _markTarget: function() {
                    var e = this._targetAnimations();
                    -1 === e.indexOf(this) && e.push(this);
                },
                _unmarkTarget: function() {
                    var e = this._targetAnimations(), t = e.indexOf(this);
                    -1 !== t && e.splice(t, 1);
                }
            };
        }(i, n), function(e, t, i) {
            function n(e) {
                var t = h;
                h = [], e < _.currentTime && (e = _.currentTime), _._animations.sort(o), _._animations = a(e, !0, _._animations)[0], 
                t.forEach(function(t) {
                    t[1](e);
                }), s(), u = void 0;
            }
            function o(e, t) {
                return e._sequenceNumber - t._sequenceNumber;
            }
            function r() {
                this._animations = [], this.currentTime = window.performance && performance.now ? performance.now() : 0;
            }
            function s() {
                p.forEach(function(e) {
                    e();
                }), p.length = 0;
            }
            function a(e, i, n) {
                m = !0, f = !1, t.timeline.currentTime = e, d = !1;
                var o = [], r = [], s = [], a = [];
                return n.forEach(function(t) {
                    t._tick(e, i), t._inEffect ? (r.push(t._effect), t._markTarget()) : (o.push(t._effect), 
                    t._unmarkTarget()), t._needsTick && (d = !0);
                    var n = t._inEffect || t._needsTick;
                    t._inTimeline = n, n ? s.push(t) : a.push(t);
                }), p.push.apply(p, o), p.push.apply(p, r), d && requestAnimationFrame(function() {}), 
                m = !1, [ s, a ];
            }
            var l = window.requestAnimationFrame, h = [], c = 0;
            window.requestAnimationFrame = function(e) {
                var t = c++;
                return 0 == h.length && l(n), h.push([ t, e ]), t;
            }, window.cancelAnimationFrame = function(e) {
                h.forEach(function(t) {
                    t[0] == e && (t[1] = function() {});
                });
            }, r.prototype = {
                _play: function(i) {
                    i._timing = e.normalizeTimingInput(i.timing);
                    var n = new t.Animation(i);
                    return n._idle = !1, n._timeline = this, this._animations.push(n), t.restart(), 
                    t.applyDirtiedAnimation(n), n;
                }
            };
            var u = void 0, d = !1, f = !1;
            t.restart = function() {
                return d || (d = !0, requestAnimationFrame(function() {}), f = !0), f;
            }, t.applyDirtiedAnimation = function(e) {
                if (!m) {
                    e._markTarget();
                    var i = e._targetAnimations();
                    i.sort(o), a(t.timeline.currentTime, !1, i.slice())[1].forEach(function(e) {
                        var t = _._animations.indexOf(e);
                        -1 !== t && _._animations.splice(t, 1);
                    }), s();
                }
            };
            var p = [], m = !1, _ = new r();
            t.timeline = _;
        }(i, n), function(e) {
            function t(e, t) {
                var i = e.exec(t);
                if (i) return i = e.ignoreCase ? i[0].toLowerCase() : i[0], [ i, t.substr(i.length) ];
            }
            function i(e, t) {
                var i = e(t = t.replace(/^\s*/, ""));
                if (i) return [ i[0], i[1].replace(/^\s*/, "") ];
            }
            function n(e, t) {
                for (var i = e, n = t; i && n; ) i > n ? i %= n : n %= i;
                return i = e * t / (i + n);
            }
            function o(e, t, i, o, r) {
                for (var s = [], a = [], l = [], h = n(o.length, r.length), c = 0; c < h; c++) {
                    var u = t(o[c % o.length], r[c % r.length]);
                    if (!u) return;
                    s.push(u[0]), a.push(u[1]), l.push(u[2]);
                }
                return [ s, a, function(t) {
                    var n = t.map(function(e, t) {
                        return l[t](e);
                    }).join(i);
                    return e ? e(n) : n;
                } ];
            }
            e.consumeToken = t, e.consumeTrimmed = i, e.consumeRepeated = function(e, n, o) {
                e = i.bind(null, e);
                for (var r = []; ;) {
                    var s = e(o);
                    if (!s) return [ r, o ];
                    if (r.push(s[0]), o = s[1], !(s = t(n, o)) || "" == s[1]) return [ r, o ];
                    o = s[1];
                }
            }, e.consumeParenthesised = function(e, t) {
                for (var i = 0, n = 0; n < t.length && (!/\s|,/.test(t[n]) || 0 != i); n++) if ("(" == t[n]) i++; else if (")" == t[n] && (0 == --i && n++, 
                i <= 0)) break;
                var o = e(t.substr(0, n));
                return void 0 == o ? void 0 : [ o, t.substr(n) ];
            }, e.ignore = function(e) {
                return function(t) {
                    var i = e(t);
                    return i && (i[0] = void 0), i;
                };
            }, e.optional = function(e, t) {
                return function(i) {
                    return e(i) || [ t, i ];
                };
            }, e.consumeList = function(t, i) {
                for (var n = [], o = 0; o < t.length; o++) {
                    var r = e.consumeTrimmed(t[o], i);
                    if (!r || "" == r[0]) return;
                    void 0 !== r[0] && n.push(r[0]), i = r[1];
                }
                if ("" == i) return n;
            }, e.mergeNestedRepeated = o.bind(null, null), e.mergeWrappedNestedRepeated = o, 
            e.mergeList = function(e, t, i) {
                for (var n = [], o = [], r = [], s = 0, a = 0; a < i.length; a++) if ("function" == typeof i[a]) {
                    var l = i[a](e[s], t[s++]);
                    n.push(l[0]), o.push(l[1]), r.push(l[2]);
                } else !function(e) {
                    n.push(!1), o.push(!1), r.push(function() {
                        return i[e];
                    });
                }(a);
                return [ n, o, function(e) {
                    for (var t = "", i = 0; i < e.length; i++) t += r[i](e[i]);
                    return t;
                } ];
            };
        }(n), function(e) {
            function t(t) {
                var i = {
                    inset: !1,
                    lengths: [],
                    color: null
                }, n = e.consumeRepeated(function(t) {
                    var n = e.consumeToken(/^inset/i, t);
                    return n ? (i.inset = !0, n) : (n = e.consumeLengthOrPercent(t)) ? (i.lengths.push(n[0]), 
                    n) : (n = e.consumeColor(t)) ? (i.color = n[0], n) : void 0;
                }, /^/, t);
                if (n && n[0].length) return [ i, n[1] ];
            }
            var i = function(t, i, n, o) {
                function r(e) {
                    return {
                        inset: e,
                        color: [ 0, 0, 0, 0 ],
                        lengths: [ {
                            px: 0
                        }, {
                            px: 0
                        }, {
                            px: 0
                        }, {
                            px: 0
                        } ]
                    };
                }
                for (var s = [], a = [], l = 0; l < n.length || l < o.length; l++) {
                    var h = n[l] || r(o[l].inset), c = o[l] || r(n[l].inset);
                    s.push(h), a.push(c);
                }
                return e.mergeNestedRepeated(t, i, s, a);
            }.bind(null, function(t, i) {
                for (;t.lengths.length < Math.max(t.lengths.length, i.lengths.length); ) t.lengths.push({
                    px: 0
                });
                for (;i.lengths.length < Math.max(t.lengths.length, i.lengths.length); ) i.lengths.push({
                    px: 0
                });
                if (t.inset == i.inset && !!t.color == !!i.color) {
                    for (var n, o = [], r = [ [], 0 ], s = [ [], 0 ], a = 0; a < t.lengths.length; a++) {
                        var l = e.mergeDimensions(t.lengths[a], i.lengths[a], 2 == a);
                        r[0].push(l[0]), s[0].push(l[1]), o.push(l[2]);
                    }
                    if (t.color && i.color) {
                        var h = e.mergeColors(t.color, i.color);
                        r[1] = h[0], s[1] = h[1], n = h[2];
                    }
                    return [ r, s, function(e) {
                        for (var i = t.inset ? "inset " : " ", r = 0; r < o.length; r++) i += o[r](e[0][r]) + " ";
                        return n && (i += n(e[1])), i;
                    } ];
                }
            }, ", ");
            e.addPropertiesHandler(function(i) {
                var n = e.consumeRepeated(t, /^,/, i);
                if (n && "" == n[1]) return n[0];
            }, i, [ "box-shadow", "text-shadow" ]);
        }(n), function(e, t) {
            function i(e) {
                return e.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
            }
            function n(e, t, i) {
                return Math.min(t, Math.max(e, i));
            }
            function o(e) {
                if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(e)) return Number(e);
            }
            function r(e, t) {
                return function(o, r) {
                    return [ o, r, function(o) {
                        return i(n(e, t, o));
                    } ];
                };
            }
            function s(e) {
                var t = e.trim().split(/\s*[\s,]\s*/);
                if (0 !== t.length) {
                    for (var i = [], n = 0; n < t.length; n++) {
                        var r = o(t[n]);
                        if (void 0 === r) return;
                        i.push(r);
                    }
                    return i;
                }
            }
            e.clamp = n, e.addPropertiesHandler(s, function(e, t) {
                if (e.length == t.length) return [ e, t, function(e) {
                    return e.map(i).join(" ");
                } ];
            }, [ "stroke-dasharray" ]), e.addPropertiesHandler(o, r(0, 1 / 0), [ "border-image-width", "line-height" ]), 
            e.addPropertiesHandler(o, r(0, 1), [ "opacity", "shape-image-threshold" ]), e.addPropertiesHandler(o, function(e, t) {
                if (0 != e) return r(0, 1 / 0)(e, t);
            }, [ "flex-grow", "flex-shrink" ]), e.addPropertiesHandler(o, function(e, t) {
                return [ e, t, function(e) {
                    return Math.round(n(1, 1 / 0, e));
                } ];
            }, [ "orphans", "widows" ]), e.addPropertiesHandler(o, function(e, t) {
                return [ e, t, Math.round ];
            }, [ "z-index" ]), e.parseNumber = o, e.parseNumberList = s, e.mergeNumbers = function(e, t) {
                return [ e, t, i ];
            }, e.numberToString = i;
        }(n), function(e, t) {
            n.addPropertiesHandler(String, function(e, t) {
                if ("visible" == e || "visible" == t) return [ 0, 1, function(i) {
                    return i <= 0 ? e : i >= 1 ? t : "visible";
                } ];
            }, [ "visibility" ]);
        }(), function(e, t) {
            function i(e) {
                e = e.trim(), r.fillStyle = "#000", r.fillStyle = e;
                var t = r.fillStyle;
                if (r.fillStyle = "#fff", r.fillStyle = e, t == r.fillStyle) {
                    r.fillRect(0, 0, 1, 1);
                    var i = r.getImageData(0, 0, 1, 1).data;
                    r.clearRect(0, 0, 1, 1);
                    var n = i[3] / 255;
                    return [ i[0] * n, i[1] * n, i[2] * n, n ];
                }
            }
            function n(t, i) {
                return [ t, i, function(t) {
                    if (t[3]) for (var i = 0; i < 3; i++) t[i] = Math.round(function(e) {
                        return Math.max(0, Math.min(255, e));
                    }(t[i] / t[3]));
                    return t[3] = e.numberToString(e.clamp(0, 1, t[3])), "rgba(" + t.join(",") + ")";
                } ];
            }
            var o = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            o.width = o.height = 1;
            var r = o.getContext("2d");
            e.addPropertiesHandler(i, n, [ "background-color", "border-bottom-color", "border-left-color", "border-right-color", "border-top-color", "color", "fill", "flood-color", "lighting-color", "outline-color", "stop-color", "stroke", "text-decoration-color" ]), 
            e.consumeColor = e.consumeParenthesised.bind(null, i), e.mergeColors = n;
        }(n), function(e, t) {
            function i(e) {
                function t() {
                    var t = a.exec(e);
                    s = t ? t[0] : void 0;
                }
                function i() {
                    var e = Number(s);
                    return t(), e;
                }
                function n() {
                    if ("(" !== s) return i();
                    t();
                    var e = r();
                    return ")" !== s ? NaN : (t(), e);
                }
                function o() {
                    for (var e = n(); "*" === s || "/" === s; ) {
                        var i = s;
                        t();
                        var o = n();
                        "*" === i ? e *= o : e /= o;
                    }
                    return e;
                }
                function r() {
                    for (var e = o(); "+" === s || "-" === s; ) {
                        var i = s;
                        t();
                        var n = o();
                        "+" === i ? e += n : e -= n;
                    }
                    return e;
                }
                var s, a = /([\+\-\w\.]+|[\(\)\*\/])/g;
                return t(), r();
            }
            function n(e, t) {
                if ("0" == (t = t.trim().toLowerCase()) && "px".search(e) >= 0) return {
                    px: 0
                };
                if (/^[^(]*$|^calc/.test(t)) {
                    var n = {};
                    t = (t = t.replace(/calc\(/g, "(")).replace(e, function(e) {
                        return n[e] = null, "U" + e;
                    });
                    for (var o = "U(" + e.source + ")", r = t.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, "N").replace(new RegExp("N" + o, "g"), "D").replace(/\s[+-]\s/g, "O").replace(/\s/g, ""), s = [ /N\*(D)/g, /(N|D)[*\/]N/g, /(N|D)O\1/g, /\((N|D)\)/g ], a = 0; a < s.length; ) s[a].test(r) ? (r = r.replace(s[a], "$1"), 
                    a = 0) : a++;
                    if ("D" == r) {
                        for (var l in n) {
                            var h = i(t.replace(new RegExp("U" + l, "g"), "").replace(new RegExp(o, "g"), "*0"));
                            if (!isFinite(h)) return;
                            n[l] = h;
                        }
                        return n;
                    }
                }
            }
            function o(e, t) {
                return r(e, t, !0);
            }
            function r(t, i, n) {
                var o, r = [];
                for (o in t) r.push(o);
                for (o in i) r.indexOf(o) < 0 && r.push(o);
                return t = r.map(function(e) {
                    return t[e] || 0;
                }), i = r.map(function(e) {
                    return i[e] || 0;
                }), [ t, i, function(t) {
                    var i = t.map(function(i, o) {
                        return 1 == t.length && n && (i = Math.max(i, 0)), e.numberToString(i) + r[o];
                    }).join(" + ");
                    return t.length > 1 ? "calc(" + i + ")" : i;
                } ];
            }
            var s = "px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc", a = n.bind(null, new RegExp(s, "g")), l = n.bind(null, new RegExp(s + "|%", "g")), h = n.bind(null, /deg|rad|grad|turn/g);
            e.parseLength = a, e.parseLengthOrPercent = l, e.consumeLengthOrPercent = e.consumeParenthesised.bind(null, l), 
            e.parseAngle = h, e.mergeDimensions = r;
            var c = e.consumeParenthesised.bind(null, a), u = e.consumeRepeated.bind(void 0, c, /^/), d = e.consumeRepeated.bind(void 0, u, /^,/);
            e.consumeSizePairList = d;
            var f = e.mergeNestedRepeated.bind(void 0, o, " "), p = e.mergeNestedRepeated.bind(void 0, f, ",");
            e.mergeNonNegativeSizePair = f, e.addPropertiesHandler(function(e) {
                var t = d(e);
                if (t && "" == t[1]) return t[0];
            }, p, [ "background-size" ]), e.addPropertiesHandler(l, o, [ "border-bottom-width", "border-image-width", "border-left-width", "border-right-width", "border-top-width", "flex-basis", "font-size", "height", "line-height", "max-height", "max-width", "outline-width", "width" ]), 
            e.addPropertiesHandler(l, r, [ "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "bottom", "left", "letter-spacing", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height", "min-width", "outline-offset", "padding-bottom", "padding-left", "padding-right", "padding-top", "perspective", "right", "shape-margin", "stroke-dashoffset", "text-indent", "top", "vertical-align", "word-spacing" ]);
        }(n), function(e, t) {
            function i(t) {
                return e.consumeLengthOrPercent(t) || e.consumeToken(/^auto/, t);
            }
            function n(t) {
                var n = e.consumeList([ e.ignore(e.consumeToken.bind(null, /^rect/)), e.ignore(e.consumeToken.bind(null, /^\(/)), e.consumeRepeated.bind(null, i, /^,/), e.ignore(e.consumeToken.bind(null, /^\)/)) ], t);
                if (n && 4 == n[0].length) return n[0];
            }
            var o = e.mergeWrappedNestedRepeated.bind(null, function(e) {
                return "rect(" + e + ")";
            }, function(t, i) {
                return "auto" == t || "auto" == i ? [ !0, !1, function(n) {
                    var o = n ? t : i;
                    if ("auto" == o) return "auto";
                    var r = e.mergeDimensions(o, o);
                    return r[2](r[0]);
                } ] : e.mergeDimensions(t, i);
            }, ", ");
            e.parseBox = n, e.mergeBoxes = o, e.addPropertiesHandler(n, o, [ "clip" ]);
        }(n), function(e, t) {
            function i(e) {
                return function(t) {
                    var i = 0;
                    return e.map(function(e) {
                        return e === h ? t[i++] : e;
                    });
                };
            }
            function n(e) {
                return e;
            }
            function o(t) {
                if ("none" == (t = t.toLowerCase().trim())) return [];
                for (var i, n = /\s*(\w+)\(([^)]*)\)/g, o = [], r = 0; i = n.exec(t); ) {
                    if (i.index != r) return;
                    r = i.index + i[0].length;
                    var s = i[1], a = d[s];
                    if (!a) return;
                    var l = i[2].split(","), h = a[0];
                    if (h.length < l.length) return;
                    for (var f = [], p = 0; p < h.length; p++) {
                        var m, _ = l[p], g = h[p];
                        if (void 0 === (m = _ ? {
                            A: function(t) {
                                return "0" == t.trim() ? u : e.parseAngle(t);
                            },
                            N: e.parseNumber,
                            T: e.parseLengthOrPercent,
                            L: e.parseLength
                        }[g.toUpperCase()](_) : {
                            a: u,
                            n: f[0],
                            t: c
                        }[g])) return;
                        f.push(m);
                    }
                    if (o.push({
                        t: s,
                        d: f
                    }), n.lastIndex == t.length) return o;
                }
            }
            function r(e) {
                return e.toFixed(6).replace(".000000", "");
            }
            function s(t, i) {
                if (t.decompositionPair !== i) {
                    t.decompositionPair = i;
                    var n = e.makeMatrixDecomposition(t);
                }
                if (i.decompositionPair !== t) {
                    i.decompositionPair = t;
                    var o = e.makeMatrixDecomposition(i);
                }
                return null == n[0] || null == o[0] ? [ [ !1 ], [ !0 ], function(e) {
                    return e ? i[0].d : t[0].d;
                } ] : (n[0].push(0), o[0].push(1), [ n, o, function(t) {
                    var i = e.quat(n[0][3], o[0][3], t[5]);
                    return e.composeMatrix(t[0], t[1], t[2], i, t[4]).map(r).join(",");
                } ]);
            }
            function a(e) {
                return e.replace(/[xy]/, "");
            }
            function l(e) {
                return e.replace(/(x|y|z|3d)?$/, "3d");
            }
            var h = null, c = {
                px: 0
            }, u = {
                deg: 0
            }, d = {
                matrix: [ "NNNNNN", [ h, h, 0, 0, h, h, 0, 0, 0, 0, 1, 0, h, h, 0, 1 ], n ],
                matrix3d: [ "NNNNNNNNNNNNNNNN", n ],
                rotate: [ "A" ],
                rotatex: [ "A" ],
                rotatey: [ "A" ],
                rotatez: [ "A" ],
                rotate3d: [ "NNNA" ],
                perspective: [ "L" ],
                scale: [ "Nn", i([ h, h, 1 ]), n ],
                scalex: [ "N", i([ h, 1, 1 ]), i([ h, 1 ]) ],
                scaley: [ "N", i([ 1, h, 1 ]), i([ 1, h ]) ],
                scalez: [ "N", i([ 1, 1, h ]) ],
                scale3d: [ "NNN", n ],
                skew: [ "Aa", null, n ],
                skewx: [ "A", null, i([ h, u ]) ],
                skewy: [ "A", null, i([ u, h ]) ],
                translate: [ "Tt", i([ h, h, c ]), n ],
                translatex: [ "T", i([ h, c, c ]), i([ h, c ]) ],
                translatey: [ "T", i([ c, h, c ]), i([ c, h ]) ],
                translatez: [ "L", i([ c, c, h ]) ],
                translate3d: [ "TTL", n ]
            };
            e.addPropertiesHandler(o, function(t, i) {
                var n = e.makeMatrixDecomposition && !0, o = !1;
                if (!t.length || !i.length) for (t.length || (o = !0, t = i, i = []), m = 0; m < t.length; m++) {
                    var r = t[m].t, h = t[m].d, c = "scale" == r.substr(0, 5) ? 1 : 0;
                    i.push({
                        t: r,
                        d: h.map(function(e) {
                            if ("number" == typeof e) return c;
                            var t = {};
                            for (var i in e) t[i] = c;
                            return t;
                        })
                    });
                }
                var u = [], f = [], p = [];
                if (t.length != i.length) {
                    if (!n) return;
                    u = [ (A = s(t, i))[0] ], f = [ A[1] ], p = [ [ "matrix", [ A[2] ] ] ];
                } else for (var m = 0; m < t.length; m++) {
                    var _ = t[m].t, g = i[m].t, y = t[m].d, v = i[m].d, b = d[_], P = d[g];
                    if (function(e, t) {
                        return "perspective" == e && "perspective" == t || ("matrix" == e || "matrix3d" == e) && ("matrix" == t || "matrix3d" == t);
                    }(_, g)) {
                        if (!n) return;
                        A = s([ t[m] ], [ i[m] ]), u.push(A[0]), f.push(A[1]), p.push([ "matrix", [ A[2] ] ]);
                    } else {
                        if (_ == g) r = _; else if (b[2] && P[2] && a(_) == a(g)) r = a(_), y = b[2](y), 
                        v = P[2](v); else {
                            if (!b[1] || !P[1] || l(_) != l(g)) {
                                if (!n) return;
                                u = [ (A = s(t, i))[0] ], f = [ A[1] ], p = [ [ "matrix", [ A[2] ] ] ];
                                break;
                            }
                            r = l(_), y = b[1](y), v = P[1](v);
                        }
                        for (var C = [], w = [], S = [], E = 0; E < y.length; E++) {
                            var A = ("number" == typeof y[E] ? e.mergeNumbers : e.mergeDimensions)(y[E], v[E]);
                            C[E] = A[0], w[E] = A[1], S.push(A[2]);
                        }
                        u.push(C), f.push(w), p.push([ r, S ]);
                    }
                }
                if (o) {
                    var T = u;
                    u = f, f = T;
                }
                return [ u, f, function(e) {
                    return e.map(function(e, t) {
                        var i = e.map(function(e, i) {
                            return p[t][1][i](e);
                        }).join(",");
                        return "matrix" == p[t][0] && 16 == i.split(",").length && (p[t][0] = "matrix3d"), 
                        p[t][0] + "(" + i + ")";
                    }).join(" ");
                } ];
            }, [ "transform" ]), e.transformToSvgMatrix = function(t) {
                var i = e.transformListToMatrix(o(t));
                return "matrix(" + r(i[0]) + " " + r(i[1]) + " " + r(i[4]) + " " + r(i[5]) + " " + r(i[12]) + " " + r(i[13]) + ")";
            };
        }(n), function(e, t) {
            function i(e, t) {
                t.concat([ e ]).forEach(function(t) {
                    t in document.documentElement.style && (n[e] = t), o[t] = e;
                });
            }
            var n = {}, o = {};
            i("transform", [ "webkitTransform", "msTransform" ]), i("transformOrigin", [ "webkitTransformOrigin" ]), 
            i("perspective", [ "webkitPerspective" ]), i("perspectiveOrigin", [ "webkitPerspectiveOrigin" ]), 
            e.propertyName = function(e) {
                return n[e] || e;
            }, e.unprefixedPropertyName = function(e) {
                return o[e] || e;
            };
        }(n);
    }(), function() {
        if (void 0 === document.createElement("div").animate([]).oncancel) {
            if (window.performance && performance.now) e = function() {
                return performance.now();
            }; else var e = function() {
                return Date.now();
            };
            var t = function(e, t, i) {
                this.target = e, this.currentTime = t, this.timelineTime = i, this.type = "cancel", 
                this.bubbles = !1, this.cancelable = !1, this.currentTarget = e, this.defaultPrevented = !1, 
                this.eventPhase = Event.AT_TARGET, this.timeStamp = Date.now();
            }, i = window.Element.prototype.animate;
            window.Element.prototype.animate = function(n, o) {
                var r = i.call(this, n, o);
                r._cancelHandlers = [], r.oncancel = null;
                var s = r.cancel;
                r.cancel = function() {
                    s.call(this);
                    var i = new t(this, null, e()), n = this._cancelHandlers.concat(this.oncancel ? [ this.oncancel ] : []);
                    setTimeout(function() {
                        n.forEach(function(e) {
                            e.call(i.target, i);
                        });
                    }, 0);
                };
                var a = r.addEventListener;
                r.addEventListener = function(e, t) {
                    "function" == typeof t && "cancel" == e ? this._cancelHandlers.push(t) : a.call(this, e, t);
                };
                var l = r.removeEventListener;
                return r.removeEventListener = function(e, t) {
                    if ("cancel" == e) {
                        var i = this._cancelHandlers.indexOf(t);
                        i >= 0 && this._cancelHandlers.splice(i, 1);
                    } else l.call(this, e, t);
                }, r;
            };
        }
    }(), function(e) {
        var t = document.documentElement, i = null, n = !1;
        try {
            var o = "0" == getComputedStyle(t).getPropertyValue("opacity") ? "1" : "0";
            (i = t.animate({
                opacity: [ o, o ]
            }, {
                duration: 1
            })).currentTime = 0, n = getComputedStyle(t).getPropertyValue("opacity") == o;
        } catch (e) {} finally {
            i && i.cancel();
        }
        if (!n) {
            var r = window.Element.prototype.animate;
            window.Element.prototype.animate = function(t, i) {
                return window.Symbol && Symbol.iterator && Array.prototype.from && t[Symbol.iterator] && (t = Array.from(t)), 
                Array.isArray(t) || null === t || (t = e.convertToArrayForm(t)), r.call(this, t, i);
            };
        }
    }(i), function(e, t, i) {
        function n(e) {
            var i = t.timeline;
            i.currentTime = e, i._discardAnimations(), 0 == i._animations.length ? r = !1 : requestAnimationFrame(n);
        }
        var o = window.requestAnimationFrame;
        window.requestAnimationFrame = function(e) {
            return o(function(i) {
                t.timeline._updateAnimationsPromises(), e(i), t.timeline._updateAnimationsPromises();
            });
        }, t.AnimationTimeline = function() {
            this._animations = [], this.currentTime = void 0;
        }, t.AnimationTimeline.prototype = {
            getAnimations: function() {
                return this._discardAnimations(), this._animations.slice();
            },
            _updateAnimationsPromises: function() {
                t.animationsWithPromises = t.animationsWithPromises.filter(function(e) {
                    return e._updatePromises();
                });
            },
            _discardAnimations: function() {
                this._updateAnimationsPromises(), this._animations = this._animations.filter(function(e) {
                    return "finished" != e.playState && "idle" != e.playState;
                });
            },
            _play: function(e) {
                var i = new t.Animation(e, this);
                return this._animations.push(i), t.restartWebAnimationsNextTick(), i._updatePromises(), 
                i._animation.play(), i._updatePromises(), i;
            },
            play: function(e) {
                return e && e.remove(), this._play(e);
            }
        };
        var r = !1;
        t.restartWebAnimationsNextTick = function() {
            r || (r = !0, requestAnimationFrame(n));
        };
        var s = new t.AnimationTimeline();
        t.timeline = s;
        try {
            Object.defineProperty(window.document, "timeline", {
                configurable: !0,
                get: function() {
                    return s;
                }
            });
        } catch (e) {}
        try {
            window.document.timeline = s;
        } catch (e) {}
    }(0, o), function(e, t, i) {
        t.animationsWithPromises = [], t.Animation = function(t, i) {
            if (this.id = "", t && t._id && (this.id = t._id), this.effect = t, t && (t._animation = this), 
            !i) throw new Error("Animation with null timeline is not supported");
            this._timeline = i, this._sequenceNumber = e.sequenceNumber++, this._holdTime = 0, 
            this._paused = !1, this._isGroup = !1, this._animation = null, this._childAnimations = [], 
            this._callback = null, this._oldPlayState = "idle", this._rebuildUnderlyingAnimation(), 
            this._animation.cancel(), this._updatePromises();
        }, t.Animation.prototype = {
            _updatePromises: function() {
                var e = this._oldPlayState, t = this.playState;
                return this._readyPromise && t !== e && ("idle" == t ? (this._rejectReadyPromise(), 
                this._readyPromise = void 0) : "pending" == e ? this._resolveReadyPromise() : "pending" == t && (this._readyPromise = void 0)), 
                this._finishedPromise && t !== e && ("idle" == t ? (this._rejectFinishedPromise(), 
                this._finishedPromise = void 0) : "finished" == t ? this._resolveFinishedPromise() : "finished" == e && (this._finishedPromise = void 0)), 
                this._oldPlayState = this.playState, this._readyPromise || this._finishedPromise;
            },
            _rebuildUnderlyingAnimation: function() {
                this._updatePromises();
                var e, i, n, o, r = !!this._animation;
                r && (e = this.playbackRate, i = this._paused, n = this.startTime, o = this.currentTime, 
                this._animation.cancel(), this._animation._wrapper = null, this._animation = null), 
                (!this.effect || this.effect instanceof window.KeyframeEffect) && (this._animation = t.newUnderlyingAnimationForKeyframeEffect(this.effect), 
                t.bindAnimationForKeyframeEffect(this)), (this.effect instanceof window.SequenceEffect || this.effect instanceof window.GroupEffect) && (this._animation = t.newUnderlyingAnimationForGroup(this.effect), 
                t.bindAnimationForGroup(this)), this.effect && this.effect._onsample && t.bindAnimationForCustomEffect(this), 
                r && (1 != e && (this.playbackRate = e), null !== n ? this.startTime = n : null !== o ? this.currentTime = o : null !== this._holdTime && (this.currentTime = this._holdTime), 
                i && this.pause()), this._updatePromises();
            },
            _updateChildren: function() {
                if (this.effect && "idle" != this.playState) {
                    var e = this.effect._timing.delay;
                    this._childAnimations.forEach(function(i) {
                        this._arrangeChildren(i, e), this.effect instanceof window.SequenceEffect && (e += t.groupChildDuration(i.effect));
                    }.bind(this));
                }
            },
            _setExternalAnimation: function(e) {
                if (this.effect && this._isGroup) for (var t = 0; t < this.effect.children.length; t++) this.effect.children[t]._animation = e, 
                this._childAnimations[t]._setExternalAnimation(e);
            },
            _constructChildAnimations: function() {
                if (this.effect && this._isGroup) {
                    var e = this.effect._timing.delay;
                    this._removeChildAnimations(), this.effect.children.forEach(function(i) {
                        var n = t.timeline._play(i);
                        this._childAnimations.push(n), n.playbackRate = this.playbackRate, this._paused && n.pause(), 
                        i._animation = this.effect._animation, this._arrangeChildren(n, e), this.effect instanceof window.SequenceEffect && (e += t.groupChildDuration(i));
                    }.bind(this));
                }
            },
            _arrangeChildren: function(e, t) {
                null === this.startTime ? e.currentTime = this.currentTime - t / this.playbackRate : e.startTime !== this.startTime + t / this.playbackRate && (e.startTime = this.startTime + t / this.playbackRate);
            },
            get timeline() {
                return this._timeline;
            },
            get playState() {
                return this._animation ? this._animation.playState : "idle";
            },
            get finished() {
                return window.Promise ? (this._finishedPromise || (-1 == t.animationsWithPromises.indexOf(this) && t.animationsWithPromises.push(this), 
                this._finishedPromise = new Promise(function(e, t) {
                    this._resolveFinishedPromise = function() {
                        e(this);
                    }, this._rejectFinishedPromise = function() {
                        t({
                            type: DOMException.ABORT_ERR,
                            name: "AbortError"
                        });
                    };
                }.bind(this)), "finished" == this.playState && this._resolveFinishedPromise()), 
                this._finishedPromise) : (console.warn("Animation Promises require JavaScript Promise constructor"), 
                null);
            },
            get ready() {
                return window.Promise ? (this._readyPromise || (-1 == t.animationsWithPromises.indexOf(this) && t.animationsWithPromises.push(this), 
                this._readyPromise = new Promise(function(e, t) {
                    this._resolveReadyPromise = function() {
                        e(this);
                    }, this._rejectReadyPromise = function() {
                        t({
                            type: DOMException.ABORT_ERR,
                            name: "AbortError"
                        });
                    };
                }.bind(this)), "pending" !== this.playState && this._resolveReadyPromise()), this._readyPromise) : (console.warn("Animation Promises require JavaScript Promise constructor"), 
                null);
            },
            get onfinish() {
                return this._animation.onfinish;
            },
            set onfinish(e) {
                this._animation.onfinish = "function" == typeof e ? function(t) {
                    t.target = this, e.call(this, t);
                }.bind(this) : e;
            },
            get oncancel() {
                return this._animation.oncancel;
            },
            set oncancel(e) {
                this._animation.oncancel = "function" == typeof e ? function(t) {
                    t.target = this, e.call(this, t);
                }.bind(this) : e;
            },
            get currentTime() {
                this._updatePromises();
                var e = this._animation.currentTime;
                return this._updatePromises(), e;
            },
            set currentTime(e) {
                this._updatePromises(), this._animation.currentTime = isFinite(e) ? e : Math.sign(e) * Number.MAX_VALUE, 
                this._register(), this._forEachChild(function(t, i) {
                    t.currentTime = e - i;
                }), this._updatePromises();
            },
            get startTime() {
                return this._animation.startTime;
            },
            set startTime(e) {
                this._updatePromises(), this._animation.startTime = isFinite(e) ? e : Math.sign(e) * Number.MAX_VALUE, 
                this._register(), this._forEachChild(function(t, i) {
                    t.startTime = e + i;
                }), this._updatePromises();
            },
            get playbackRate() {
                return this._animation.playbackRate;
            },
            set playbackRate(e) {
                this._updatePromises();
                var t = this.currentTime;
                this._animation.playbackRate = e, this._forEachChild(function(t) {
                    t.playbackRate = e;
                }), null !== t && (this.currentTime = t), this._updatePromises();
            },
            play: function() {
                this._updatePromises(), this._paused = !1, this._animation.play(), -1 == this._timeline._animations.indexOf(this) && this._timeline._animations.push(this), 
                this._register(), t.awaitStartTime(this), this._forEachChild(function(e) {
                    var t = e.currentTime;
                    e.play(), e.currentTime = t;
                }), this._updatePromises();
            },
            pause: function() {
                this._updatePromises(), this.currentTime && (this._holdTime = this.currentTime), 
                this._animation.pause(), this._register(), this._forEachChild(function(e) {
                    e.pause();
                }), this._paused = !0, this._updatePromises();
            },
            finish: function() {
                this._updatePromises(), this._animation.finish(), this._register(), this._updatePromises();
            },
            cancel: function() {
                this._updatePromises(), this._animation.cancel(), this._register(), this._removeChildAnimations(), 
                this._updatePromises();
            },
            reverse: function() {
                this._updatePromises();
                var e = this.currentTime;
                this._animation.reverse(), this._forEachChild(function(e) {
                    e.reverse();
                }), null !== e && (this.currentTime = e), this._updatePromises();
            },
            addEventListener: function(e, t) {
                var i = t;
                "function" == typeof t && (i = function(e) {
                    e.target = this, t.call(this, e);
                }.bind(this), t._wrapper = i), this._animation.addEventListener(e, i);
            },
            removeEventListener: function(e, t) {
                this._animation.removeEventListener(e, t && t._wrapper || t);
            },
            _removeChildAnimations: function() {
                for (;this._childAnimations.length; ) this._childAnimations.pop().cancel();
            },
            _forEachChild: function(t) {
                var i = 0;
                if (this.effect.children && this._childAnimations.length < this.effect.children.length && this._constructChildAnimations(), 
                this._childAnimations.forEach(function(e) {
                    t.call(this, e, i), this.effect instanceof window.SequenceEffect && (i += e.effect.activeDuration);
                }.bind(this)), "pending" != this.playState) {
                    var n = this.effect._timing, o = this.currentTime;
                    null !== o && (o = e.calculateIterationProgress(e.calculateActiveDuration(n), o, n)), 
                    (null == o || isNaN(o)) && this._removeChildAnimations();
                }
            }
        }, window.Animation = t.Animation;
    }(i, o), function(e, t, i) {
        function n(t) {
            this._frames = e.normalizeKeyframes(t);
        }
        function o() {
            for (var e = !1; l.length; ) l.shift()._updateChildren(), e = !0;
            return e;
        }
        var r = function(e) {
            if (e._animation = void 0, e instanceof window.SequenceEffect || e instanceof window.GroupEffect) for (var t = 0; t < e.children.length; t++) r(e.children[t]);
        };
        t.removeMulti = function(e) {
            for (var t = [], i = 0; i < e.length; i++) {
                var n = e[i];
                n._parent ? (-1 == t.indexOf(n._parent) && t.push(n._parent), n._parent.children.splice(n._parent.children.indexOf(n), 1), 
                n._parent = null, r(n)) : n._animation && n._animation.effect == n && (n._animation.cancel(), 
                n._animation.effect = new KeyframeEffect(null, []), n._animation._callback && (n._animation._callback._animation = null), 
                n._animation._rebuildUnderlyingAnimation(), r(n));
            }
            for (i = 0; i < t.length; i++) t[i]._rebuild();
        }, t.KeyframeEffect = function(t, i, o, r) {
            return this.target = t, this._parent = null, o = e.numericTimingToObject(o), this._timingInput = e.cloneTimingInput(o), 
            this._timing = e.normalizeTimingInput(o), this.timing = e.makeTiming(o, !1, this), 
            this.timing._effect = this, "function" == typeof i ? (e.deprecated("Custom KeyframeEffect", "2015-06-22", "Use KeyframeEffect.onsample instead."), 
            this._normalizedKeyframes = i) : this._normalizedKeyframes = new n(i), this._keyframes = i, 
            this.activeDuration = e.calculateActiveDuration(this._timing), this._id = r, this;
        }, t.KeyframeEffect.prototype = {
            getFrames: function() {
                return "function" == typeof this._normalizedKeyframes ? this._normalizedKeyframes : this._normalizedKeyframes._frames;
            },
            set onsample(e) {
                if ("function" == typeof this.getFrames()) throw new Error("Setting onsample on custom effect KeyframeEffect is not supported.");
                this._onsample = e, this._animation && this._animation._rebuildUnderlyingAnimation();
            },
            get parent() {
                return this._parent;
            },
            clone: function() {
                if ("function" == typeof this.getFrames()) throw new Error("Cloning custom effects is not supported.");
                var t = new KeyframeEffect(this.target, [], e.cloneTimingInput(this._timingInput), this._id);
                return t._normalizedKeyframes = this._normalizedKeyframes, t._keyframes = this._keyframes, 
                t;
            },
            remove: function() {
                t.removeMulti([ this ]);
            }
        };
        var s = Element.prototype.animate;
        Element.prototype.animate = function(e, i) {
            var n = "";
            return i && i.id && (n = i.id), t.timeline._play(new t.KeyframeEffect(this, e, i, n));
        };
        var a = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        t.newUnderlyingAnimationForKeyframeEffect = function(e) {
            if (e) {
                t = e.target || a;
                "function" == typeof (i = e._keyframes) && (i = []), (n = e._timingInput).id = e._id;
            } else var t = a, i = [], n = 0;
            return s.apply(t, [ i, n ]);
        }, t.bindAnimationForKeyframeEffect = function(e) {
            e.effect && "function" == typeof e.effect._normalizedKeyframes && t.bindAnimationForCustomEffect(e);
        };
        var l = [];
        t.awaitStartTime = function(e) {
            null === e.startTime && e._isGroup && (0 == l.length && requestAnimationFrame(o), 
            l.push(e));
        };
        var h = window.getComputedStyle;
        Object.defineProperty(window, "getComputedStyle", {
            configurable: !0,
            enumerable: !0,
            value: function() {
                t.timeline._updateAnimationsPromises();
                var e = h.apply(this, arguments);
                return o() && (e = h.apply(this, arguments)), t.timeline._updateAnimationsPromises(), 
                e;
            }
        }), window.KeyframeEffect = t.KeyframeEffect, window.Element.prototype.getAnimations = function() {
            return document.timeline.getAnimations().filter(function(e) {
                return null !== e.effect && e.effect.target == this;
            }.bind(this));
        };
    }(i, o), function(e, t, i) {
        function n(e) {
            e._registered || (e._registered = !0, s.push(e), a || (a = !0, requestAnimationFrame(o)));
        }
        function o(e) {
            var t = s;
            s = [], t.sort(function(e, t) {
                return e._sequenceNumber - t._sequenceNumber;
            }), t = t.filter(function(e) {
                e();
                var t = e._animation ? e._animation.playState : "idle";
                return "running" != t && "pending" != t && (e._registered = !1), e._registered;
            }), s.push.apply(s, t), s.length ? (a = !0, requestAnimationFrame(o)) : a = !1;
        }
        var r = (document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 0);
        t.bindAnimationForCustomEffect = function(t) {
            var i, o = t.effect.target, s = "function" == typeof t.effect.getFrames();
            i = s ? t.effect.getFrames() : t.effect._onsample;
            var a = t.effect.timing, l = null;
            a = e.normalizeTimingInput(a);
            var h = function() {
                var n = h._animation ? h._animation.currentTime : null;
                null !== n && (n = e.calculateIterationProgress(e.calculateActiveDuration(a), n, a), 
                isNaN(n) && (n = null)), n !== l && (s ? i(n, o, t.effect) : i(n, t.effect, t.effect._animation)), 
                l = n;
            };
            h._animation = t, h._registered = !1, h._sequenceNumber = r++, t._callback = h, 
            n(h);
        };
        var s = [], a = !1;
        t.Animation.prototype._register = function() {
            this._callback && n(this._callback);
        };
    }(i, o), function(e, t, i) {
        function n(e) {
            return e._timing.delay + e.activeDuration + e._timing.endDelay;
        }
        function o(t, i, n) {
            this._id = n, this._parent = null, this.children = t || [], this._reparent(this.children), 
            i = e.numericTimingToObject(i), this._timingInput = e.cloneTimingInput(i), this._timing = e.normalizeTimingInput(i, !0), 
            this.timing = e.makeTiming(i, !0, this), this.timing._effect = this, "auto" === this._timing.duration && (this._timing.duration = this.activeDuration);
        }
        window.SequenceEffect = function() {
            o.apply(this, arguments);
        }, window.GroupEffect = function() {
            o.apply(this, arguments);
        }, o.prototype = {
            _isAncestor: function(e) {
                for (var t = this; null !== t; ) {
                    if (t == e) return !0;
                    t = t._parent;
                }
                return !1;
            },
            _rebuild: function() {
                for (var e = this; e; ) "auto" === e.timing.duration && (e._timing.duration = e.activeDuration), 
                e = e._parent;
                this._animation && this._animation._rebuildUnderlyingAnimation();
            },
            _reparent: function(e) {
                t.removeMulti(e);
                for (var i = 0; i < e.length; i++) e[i]._parent = this;
            },
            _putChild: function(e, t) {
                for (var i = t ? "Cannot append an ancestor or self" : "Cannot prepend an ancestor or self", n = 0; n < e.length; n++) if (this._isAncestor(e[n])) throw {
                    type: DOMException.HIERARCHY_REQUEST_ERR,
                    name: "HierarchyRequestError",
                    message: i
                };
                for (n = 0; n < e.length; n++) t ? this.children.push(e[n]) : this.children.unshift(e[n]);
                this._reparent(e), this._rebuild();
            },
            append: function() {
                this._putChild(arguments, !0);
            },
            prepend: function() {
                this._putChild(arguments, !1);
            },
            get parent() {
                return this._parent;
            },
            get firstChild() {
                return this.children.length ? this.children[0] : null;
            },
            get lastChild() {
                return this.children.length ? this.children[this.children.length - 1] : null;
            },
            clone: function() {
                for (var t = e.cloneTimingInput(this._timingInput), i = [], n = 0; n < this.children.length; n++) i.push(this.children[n].clone());
                return this instanceof GroupEffect ? new GroupEffect(i, t) : new SequenceEffect(i, t);
            },
            remove: function() {
                t.removeMulti([ this ]);
            }
        }, window.SequenceEffect.prototype = Object.create(o.prototype), Object.defineProperty(window.SequenceEffect.prototype, "activeDuration", {
            get: function() {
                var e = 0;
                return this.children.forEach(function(t) {
                    e += n(t);
                }), Math.max(e, 0);
            }
        }), window.GroupEffect.prototype = Object.create(o.prototype), Object.defineProperty(window.GroupEffect.prototype, "activeDuration", {
            get: function() {
                var e = 0;
                return this.children.forEach(function(t) {
                    e = Math.max(e, n(t));
                }), e;
            }
        }), t.newUnderlyingAnimationForGroup = function(i) {
            var n, o = null, r = new KeyframeEffect(null, [], i._timing, i._id);
            return r.onsample = function(t) {
                var i = n._wrapper;
                if (i && "pending" != i.playState && i.effect) return null == t ? void i._removeChildAnimations() : 0 == t && i.playbackRate < 0 && (o || (o = e.normalizeTimingInput(i.effect.timing)), 
                t = e.calculateIterationProgress(e.calculateActiveDuration(o), -1, o), isNaN(t) || null == t) ? (i._forEachChild(function(e) {
                    e.currentTime = -1;
                }), void i._removeChildAnimations()) : void 0;
            }, n = t.timeline._play(r);
        }, t.bindAnimationForGroup = function(e) {
            e._animation._wrapper = e, e._isGroup = !0, t.awaitStartTime(e), e._constructChildAnimations(), 
            e._setExternalAnimation(e);
        }, t.groupChildDuration = n;
    }(i, o), t.true = {};
}(0, function() {
    return this;
}()), Polymer({
    is: "cascaded-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        this._animations = [];
        var t = e.nodes, i = [], n = e.nodeDelay || 50;
        e.timing = e.timing || {}, e.timing.delay = e.timing.delay || 0;
        for (var o, r, s = e.timing.delay, a = 0; r = t[a]; a++) {
            e.timing.delay += n, e.node = r;
            var l = document.createElement(e.animation);
            if (!l.isNeonAnimation) {
                console.warn(this.is + ":", e.animation, "not found!"), o = !0;
                break;
            }
            var h = l.configure(e);
            this._animations.push(l), i.push(h);
        }
        if (e.timing.delay = s, e.node = null, !o) return this._effect = new GroupEffect(i), 
        this._effect;
    },
    complete: function() {
        for (var e, t = 0; e = this._animations[t]; t++) e.complete(e.config);
    }
}), Polymer({
    is: "fade-in-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            opacity: "0"
        }, {
            opacity: "1"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer({
    is: "fade-out-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            opacity: "1"
        }, {
            opacity: "0"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer.NeonSharedElementAnimationBehaviorImpl = {
    properties: {
        sharedElements: {
            type: Object
        }
    },
    findSharedElements: function(e) {
        var t = e.fromPage, i = e.toPage;
        if (!t || !i) return console.warn(this.is + ":", t ? "toPage" : "fromPage", "is undefined!"), 
        null;
        if (!t.sharedElements || !i.sharedElements) return console.warn(this.is + ":", "sharedElements are undefined for", t.sharedElements ? i : t), 
        null;
        var n = t.sharedElements[e.id], o = i.sharedElements[e.id];
        return n && o ? (this.sharedElements = {
            from: n,
            to: o
        }, this.sharedElements) : (console.warn(this.is + ":", "sharedElement with id", e.id, "not found in", n ? i : t), 
        null);
    }
}, Polymer.NeonSharedElementAnimationBehavior = [ Polymer.NeonAnimationBehavior, Polymer.NeonSharedElementAnimationBehaviorImpl ], 
Polymer({
    is: "hero-animation",
    behaviors: [ Polymer.NeonSharedElementAnimationBehavior ],
    configure: function(e) {
        var t = this.findSharedElements(e);
        if (t) {
            var i = t.from.getBoundingClientRect(), n = t.to.getBoundingClientRect(), o = i.left - n.left, r = i.top - n.top, s = i.width / n.width, a = i.height / n.height;
            return this._effect = new KeyframeEffect(t.to, [ {
                transform: "translate(" + o + "px," + r + "px) scale(" + s + "," + a + ")"
            }, {
                transform: "none"
            } ], this.timingFromConfig(e)), this.setPrefixedProperty(t.to, "transformOrigin", "0 0"), 
            t.to.style.zIndex = 1e4, t.from.style.visibility = "hidden", this._effect;
        }
    },
    complete: function(e) {
        var t = this.findSharedElements(e);
        if (!t) return null;
        t.to.style.zIndex = "", t.from.style.visibility = "";
    }
}), Polymer({
    is: "opaque-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            opacity: "1"
        }, {
            opacity: "1"
        } ], this.timingFromConfig(e)), t.style.opacity = "0", this._effect;
    },
    complete: function(e) {
        e.node.style.opacity = "";
    }
}), Polymer({
    is: "ripple-animation",
    behaviors: [ Polymer.NeonSharedElementAnimationBehavior ],
    configure: function(e) {
        var t = this.findSharedElements(e);
        if (!t) return null;
        var i, n, o = t.to.getBoundingClientRect();
        if (e.gesture) i = e.gesture.x - (o.left + o.width / 2), n = e.gesture.y - (o.top + o.height / 2); else {
            var r = t.from.getBoundingClientRect();
            i = r.left + r.width / 2 - (o.left + o.width / 2), n = r.top + r.height / 2 - (o.top + o.height / 2);
        }
        var s = "translate(" + i + "px," + n + "px)", a = Math.max(o.width + 2 * Math.abs(i), o.height + 2 * Math.abs(n)), l = Math.sqrt(2 * a * a), h = "scale(" + l / o.width + "," + l / o.height + ")";
        return this._effect = new KeyframeEffect(t.to, [ {
            transform: s + " scale(0)"
        }, {
            transform: s + " " + h
        } ], this.timingFromConfig(e)), this.setPrefixedProperty(t.to, "transformOrigin", "50% 50%"), 
        t.to.style.borderRadius = "50%", this._effect;
    },
    complete: function() {
        this.sharedElements && (this.setPrefixedProperty(this.sharedElements.to, "transformOrigin", ""), 
        this.sharedElements.to.style.borderRadius = "");
    }
}), Polymer({
    is: "reverse-ripple-animation",
    behaviors: [ Polymer.NeonSharedElementAnimationBehavior ],
    configure: function(e) {
        var t = this.findSharedElements(e);
        if (!t) return null;
        var i, n, o = t.from.getBoundingClientRect();
        if (e.gesture) i = e.gesture.x - (o.left + o.width / 2), n = e.gesture.y - (o.top + o.height / 2); else {
            var r = t.to.getBoundingClientRect();
            i = r.left + r.width / 2 - (o.left + o.width / 2), n = r.top + r.height / 2 - (o.top + o.height / 2);
        }
        var s = "translate(" + i + "px," + n + "px)", a = Math.max(o.width + 2 * Math.abs(i), o.height + 2 * Math.abs(n)), l = Math.sqrt(2 * a * a), h = "scale(" + l / o.width + "," + l / o.height + ")";
        return this._effect = new KeyframeEffect(t.from, [ {
            transform: s + " " + h
        }, {
            transform: s + " scale(0)"
        } ], this.timingFromConfig(e)), this.setPrefixedProperty(t.from, "transformOrigin", "50% 50%"), 
        t.from.style.borderRadius = "50%", this._effect;
    },
    complete: function() {
        this.sharedElements && (this.setPrefixedProperty(this.sharedElements.from, "transformOrigin", ""), 
        this.sharedElements.from.style.borderRadius = "");
    }
}), Polymer({
    is: "scale-down-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = "scale(0, 0)";
        return "x" === e.axis ? i = "scale(0, 1)" : "y" === e.axis && (i = "scale(1, 0)"), 
        this._effect = new KeyframeEffect(t, [ {
            transform: "scale(1,1)"
        }, {
            transform: i
        } ], this.timingFromConfig(e)), e.transformOrigin && this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin), 
        this._effect;
    }
}), Polymer({
    is: "scale-up-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = "scale(0)";
        return "x" === e.axis ? i = "scale(0, 1)" : "y" === e.axis && (i = "scale(1, 0)"), 
        this._effect = new KeyframeEffect(t, [ {
            transform: i
        }, {
            transform: "scale(1, 1)"
        } ], this.timingFromConfig(e)), e.transformOrigin && this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin), 
        this._effect;
    }
}), Polymer({
    is: "slide-from-left-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translateX(-100%)"
        }, {
            transform: "none"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "0 50%"), 
        this._effect;
    }
}), Polymer({
    is: "slide-from-right-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translateX(100%)"
        }, {
            transform: "none"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "0 50%"), 
        this._effect;
    }
}), Polymer({
    is: "slide-from-top-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translateY(-100%)"
        }, {
            transform: "translateY(0%)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "50% 0"), 
        this._effect;
    }
}), Polymer({
    is: "slide-from-bottom-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translateY(100%)"
        }, {
            transform: "translateY(0)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "50% 0"), 
        this._effect;
    }
}), Polymer({
    is: "slide-left-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "none"
        }, {
            transform: "translateX(-100%)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "0 50%"), 
        this._effect;
    }
}), Polymer({
    is: "slide-right-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "none"
        }, {
            transform: "translateX(100%)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "0 50%"), 
        this._effect;
    }
}), Polymer({
    is: "slide-up-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translate(0)"
        }, {
            transform: "translateY(-100%)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "50% 0"), 
        this._effect;
    }
}), Polymer({
    is: "slide-down-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node;
        return this._effect = new KeyframeEffect(t, [ {
            transform: "translateY(0%)"
        }, {
            transform: "translateY(100%)"
        } ], this.timingFromConfig(e)), e.transformOrigin ? this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin) : this.setPrefixedProperty(t, "transformOrigin", "50% 0"), 
        this._effect;
    }
}), Polymer({
    is: "transform-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = e.transformFrom || "none", n = e.transformTo || "none";
        return this._effect = new KeyframeEffect(t, [ {
            transform: i
        }, {
            transform: n
        } ], this.timingFromConfig(e)), e.transformOrigin && this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin), 
        this._effect;
    }
}), Polymer({
    is: "neon-animatable",
    behaviors: [ Polymer.NeonAnimatableBehavior, Polymer.IronResizableBehavior ]
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), /*
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
}(), window.Chrome = window.Chrome || {}, Chrome.LocalizeBehavior = {
    properties: {
        localize: {
            type: Function,
            value: function() {
                return function() {
                    const e = arguments[0];
                    return Chrome.Locale.localize(e);
                };
            }
        }
    }
}, Polymer({
    is: "iron-localstorage",
    properties: {
        name: {
            type: String,
            value: ""
        },
        value: {
            type: Object,
            notify: !0
        },
        useRaw: {
            type: Boolean,
            value: !1
        },
        autoSaveDisabled: {
            type: Boolean,
            value: !1
        },
        errorMessage: {
            type: String,
            notify: !0
        },
        _loaded: {
            type: Boolean,
            value: !1
        }
    },
    observers: [ "_debounceReload(name,useRaw)", "_trySaveValue(autoSaveDisabled)", "_trySaveValue(value.*)" ],
    ready: function() {
        this._boundHandleStorage = this._handleStorage.bind(this);
    },
    attached: function() {
        window.addEventListener("storage", this._boundHandleStorage);
    },
    detached: function() {
        window.removeEventListener("storage", this._boundHandleStorage);
    },
    _handleStorage: function(e) {
        e.key == this.name && this._load(!0);
    },
    _trySaveValue: function() {
        this._doNotSave || this._loaded && !this.autoSaveDisabled && this.debounce("save", this.save);
    },
    _debounceReload: function() {
        this.debounce("reload", this.reload);
    },
    reload: function() {
        this._loaded = !1, this._load();
    },
    _load: function(e) {
        try {
            var t = window.localStorage.getItem(this.name);
        } catch (e) {
            this.errorMessage = e.message, this._error("Could not save to localStorage.  Try enabling cookies for this page.", e);
        }
        if (null === t) this._loaded = !0, this._doNotSave = !0, this.value = null, this._doNotSave = !1, 
        this.fire("iron-localstorage-load-empty", {
            externalChange: e
        }); else {
            if (!this.useRaw) try {
                t = JSON.parse(t);
            } catch (e) {
                this.errorMessage = "Could not parse local storage value", Polymer.Base._error("could not parse local storage value", t), 
                t = null;
            }
            this._loaded = !0, this._doNotSave = !0, this.value = t, this._doNotSave = !1, this.fire("iron-localstorage-load", {
                externalChange: e
            });
        }
    },
    save: function() {
        var e = this.useRaw ? this.value : JSON.stringify(this.value);
        try {
            null === this.value || void 0 === this.value ? window.localStorage.removeItem(this.name) : window.localStorage.setItem(this.name, e);
        } catch (e) {
            this.errorMessage = e.message, Polymer.Base._error("Could not save to localStorage. Incognito mode may be blocking this action", e);
        }
    }
}), Polymer.IronFormElementBehavior = {
    properties: {
        name: {
            type: String
        },
        value: {
            notify: !0,
            type: String
        },
        required: {
            type: Boolean,
            value: !1
        },
        _parentForm: {
            type: Object
        }
    },
    attached: function() {
        this.fire("iron-form-element-register");
    },
    detached: function() {
        this._parentForm && this._parentForm.fire("iron-form-element-unregister", {
            target: this
        });
    }
}, Polymer.IronValidatableBehaviorMeta = null, Polymer.IronValidatableBehavior = {
    properties: {
        validator: {
            type: String
        },
        invalid: {
            notify: !0,
            reflectToAttribute: !0,
            type: Boolean,
            value: !1
        },
        _validatorMeta: {
            type: Object
        },
        validatorType: {
            type: String,
            value: "validator"
        },
        _validator: {
            type: Object,
            computed: "__computeValidator(validator)"
        }
    },
    observers: [ "_invalidChanged(invalid)" ],
    registered: function() {
        Polymer.IronValidatableBehaviorMeta = new Polymer.IronMeta({
            type: "validator"
        });
    },
    _invalidChanged: function() {
        this.invalid ? this.setAttribute("aria-invalid", "true") : this.removeAttribute("aria-invalid");
    },
    hasValidator: function() {
        return null != this._validator;
    },
    validate: function(e) {
        return this.invalid = !this._getValidity(e), !this.invalid;
    },
    _getValidity: function(e) {
        return !this.hasValidator() || this._validator.validate(e);
    },
    __computeValidator: function() {
        return Polymer.IronValidatableBehaviorMeta && Polymer.IronValidatableBehaviorMeta.byKey(this.validator);
    }
}, function() {
    "use strict";
    Polymer.IronA11yAnnouncer = Polymer({
        is: "iron-a11y-announcer",
        properties: {
            mode: {
                type: String,
                value: "polite"
            },
            _text: {
                type: String,
                value: ""
            }
        },
        created: function() {
            Polymer.IronA11yAnnouncer.instance || (Polymer.IronA11yAnnouncer.instance = this), 
            document.body.addEventListener("iron-announce", this._onIronAnnounce.bind(this));
        },
        announce: function(e) {
            this._text = "", this.async(function() {
                this._text = e;
            }, 100);
        },
        _onIronAnnounce: function(e) {
            e.detail && e.detail.text && this.announce(e.detail.text);
        }
    }), Polymer.IronA11yAnnouncer.instance = null, Polymer.IronA11yAnnouncer.requestAvailability = function() {
        Polymer.IronA11yAnnouncer.instance || (Polymer.IronA11yAnnouncer.instance = document.createElement("iron-a11y-announcer")), 
        document.body.appendChild(Polymer.IronA11yAnnouncer.instance);
    };
}(), Polymer({
    is: "iron-input",
    extends: "input",
    behaviors: [ Polymer.IronValidatableBehavior ],
    properties: {
        bindValue: {
            observer: "_bindValueChanged",
            type: String
        },
        preventInvalidInput: {
            type: Boolean
        },
        allowedPattern: {
            type: String,
            observer: "_allowedPatternChanged"
        },
        _previousValidInput: {
            type: String,
            value: ""
        },
        _patternAlreadyChecked: {
            type: Boolean,
            value: !1
        }
    },
    listeners: {
        input: "_onInput",
        keypress: "_onKeypress"
    },
    registered: function() {
        this._canDispatchEventOnDisabled() || (this._origDispatchEvent = this.dispatchEvent, 
        this.dispatchEvent = this._dispatchEventFirefoxIE);
    },
    created: function() {
        Polymer.IronA11yAnnouncer.requestAvailability();
    },
    _canDispatchEventOnDisabled: function() {
        var e = document.createElement("input"), t = !1;
        e.disabled = !0, e.addEventListener("feature-check-dispatch-event", function() {
            t = !0;
        });
        try {
            e.dispatchEvent(new Event("feature-check-dispatch-event"));
        } catch (e) {}
        return t;
    },
    _dispatchEventFirefoxIE: function(e) {
        var t = this.disabled;
        this.disabled = !1;
        var i = this._origDispatchEvent(e);
        return this.disabled = t, i;
    },
    get _patternRegExp() {
        var e;
        if (this.allowedPattern) e = new RegExp(this.allowedPattern); else switch (this.type) {
          case "number":
            e = /[0-9.,e-]/;
        }
        return e;
    },
    ready: function() {
        this.bindValue = this.value;
    },
    _bindValueChanged: function() {
        this.value !== this.bindValue && (this.value = this.bindValue || 0 === this.bindValue || !1 === this.bindValue ? this.bindValue : ""), 
        this.fire("bind-value-changed", {
            value: this.bindValue
        });
    },
    _allowedPatternChanged: function() {
        this.preventInvalidInput = !!this.allowedPattern;
    },
    _onInput: function() {
        this.preventInvalidInput && !this._patternAlreadyChecked && (this._checkPatternValidity() || (this._announceInvalidCharacter("Invalid string of characters not entered."), 
        this.value = this._previousValidInput)), this.bindValue = this.value, this._previousValidInput = this.value, 
        this._patternAlreadyChecked = !1;
    },
    _isPrintable: function(e) {
        var t = 8 == e.keyCode || 9 == e.keyCode || 13 == e.keyCode || 27 == e.keyCode, i = 19 == e.keyCode || 20 == e.keyCode || 45 == e.keyCode || 46 == e.keyCode || 144 == e.keyCode || 145 == e.keyCode || e.keyCode > 32 && e.keyCode < 41 || e.keyCode > 111 && e.keyCode < 124;
        return !(t || 0 == e.charCode && i);
    },
    _onKeypress: function(e) {
        if (this.preventInvalidInput || "number" === this.type) {
            var t = this._patternRegExp;
            if (t && !(e.metaKey || e.ctrlKey || e.altKey)) {
                this._patternAlreadyChecked = !0;
                var i = String.fromCharCode(e.charCode);
                this._isPrintable(e) && !t.test(i) && (e.preventDefault(), this._announceInvalidCharacter("Invalid character " + i + " not entered."));
            }
        }
    },
    _checkPatternValidity: function() {
        var e = this._patternRegExp;
        if (!e) return !0;
        for (var t = 0; t < this.value.length; t++) if (!e.test(this.value[t])) return !1;
        return !0;
    },
    validate: function() {
        var e = this.checkValidity();
        return e && (this.required && "" === this.value ? e = !1 : this.hasValidator() && (e = Polymer.IronValidatableBehavior.validate.call(this, this.value))), 
        this.invalid = !e, this.fire("iron-input-validate"), e;
    },
    _announceInvalidCharacter: function(e) {
        this.fire("iron-announce", {
            text: e
        });
    }
}), Polymer.PaperInputHelper = {}, Polymer.PaperInputHelper.NextLabelID = 1, Polymer.PaperInputHelper.NextAddonID = 1, 
Polymer.PaperInputBehaviorImpl = {
    properties: {
        label: {
            type: String
        },
        value: {
            notify: !0,
            type: String
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        invalid: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        preventInvalidInput: {
            type: Boolean
        },
        allowedPattern: {
            type: String
        },
        type: {
            type: String
        },
        list: {
            type: String
        },
        pattern: {
            type: String
        },
        required: {
            type: Boolean,
            value: !1
        },
        errorMessage: {
            type: String
        },
        charCounter: {
            type: Boolean,
            value: !1
        },
        noLabelFloat: {
            type: Boolean,
            value: !1
        },
        alwaysFloatLabel: {
            type: Boolean,
            value: !1
        },
        autoValidate: {
            type: Boolean,
            value: !1
        },
        validator: {
            type: String
        },
        autocomplete: {
            type: String,
            value: "off"
        },
        autofocus: {
            type: Boolean,
            observer: "_autofocusChanged"
        },
        inputmode: {
            type: String
        },
        minlength: {
            type: Number
        },
        maxlength: {
            type: Number
        },
        min: {
            type: String
        },
        max: {
            type: String
        },
        step: {
            type: String
        },
        name: {
            type: String
        },
        placeholder: {
            type: String,
            value: ""
        },
        readonly: {
            type: Boolean,
            value: !1
        },
        size: {
            type: Number
        },
        autocapitalize: {
            type: String,
            value: "none"
        },
        autocorrect: {
            type: String,
            value: "off"
        },
        autosave: {
            type: String
        },
        results: {
            type: Number
        },
        accept: {
            type: String
        },
        multiple: {
            type: Boolean
        },
        _ariaDescribedBy: {
            type: String,
            value: ""
        },
        _ariaLabelledBy: {
            type: String,
            value: ""
        }
    },
    listeners: {
        "addon-attached": "_onAddonAttached"
    },
    keyBindings: {
        "shift+tab:keydown": "_onShiftTabDown"
    },
    hostAttributes: {
        tabindex: 0
    },
    get inputElement() {
        return this.$.input;
    },
    get _focusableElement() {
        return this.inputElement;
    },
    registered: function() {
        this._typesThatHaveText = [ "date", "datetime", "datetime-local", "month", "time", "week", "file" ];
    },
    attached: function() {
        this._updateAriaLabelledBy(), this.inputElement && -1 !== this._typesThatHaveText.indexOf(this.inputElement.type) && (this.alwaysFloatLabel = !0);
    },
    _appendStringWithSpace: function(e, t) {
        return e = e ? e + " " + t : t;
    },
    _onAddonAttached: function(e) {
        var t = e.path ? e.path[0] : e.target;
        if (t.id) this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, t.id); else {
            var i = "paper-input-add-on-" + Polymer.PaperInputHelper.NextAddonID++;
            t.id = i, this._ariaDescribedBy = this._appendStringWithSpace(this._ariaDescribedBy, i);
        }
    },
    validate: function() {
        return this.inputElement.validate();
    },
    _focusBlurHandler: function(e) {
        Polymer.IronControlState._focusBlurHandler.call(this, e), this.focused && !this._shiftTabPressed && this._focusableElement.focus();
    },
    _onShiftTabDown: function(e) {
        var t = this.getAttribute("tabindex");
        this._shiftTabPressed = !0, this.setAttribute("tabindex", "-1"), this.async(function() {
            this.setAttribute("tabindex", t), this._shiftTabPressed = !1;
        }, 1);
    },
    _handleAutoValidate: function() {
        this.autoValidate && this.validate();
    },
    updateValueAndPreserveCaret: function(e) {
        try {
            var t = this.inputElement.selectionStart;
            this.value = e, this.inputElement.selectionStart = t, this.inputElement.selectionEnd = t;
        } catch (t) {
            this.value = e;
        }
    },
    _computeAlwaysFloatLabel: function(e, t) {
        return t || e;
    },
    _updateAriaLabelledBy: function() {
        var e = Polymer.dom(this.root).querySelector("label");
        if (e) {
            var t;
            e.id ? t = e.id : (t = "paper-input-label-" + Polymer.PaperInputHelper.NextLabelID++, 
            e.id = t), this._ariaLabelledBy = t;
        } else this._ariaLabelledBy = "";
    },
    _onChange: function(e) {
        this.shadowRoot && this.fire(e.type, {
            sourceEvent: e
        }, {
            node: this,
            bubbles: e.bubbles,
            cancelable: e.cancelable
        });
    },
    _autofocusChanged: function() {
        if (this.autofocus && this._focusableElement) {
            var e = document.activeElement;
            e instanceof HTMLElement && e !== document.body && e !== document.documentElement || this._focusableElement.focus();
        }
    }
}, Polymer.PaperInputBehavior = [ Polymer.IronControlState, Polymer.IronA11yKeysBehavior, Polymer.PaperInputBehaviorImpl ], 
Polymer.PaperInputAddonBehavior = {
    hostAttributes: {
        "add-on": ""
    },
    attached: function() {
        this.fire("addon-attached");
    },
    update: function(e) {}
}, Polymer({
    is: "paper-input-char-counter",
    behaviors: [ Polymer.PaperInputAddonBehavior ],
    properties: {
        _charCounterStr: {
            type: String,
            value: "0"
        }
    },
    update: function(e) {
        if (e.inputElement) {
            e.value = e.value || "";
            var t = e.value.toString().length.toString();
            e.inputElement.hasAttribute("maxlength") && (t += "/" + e.inputElement.getAttribute("maxlength")), 
            this._charCounterStr = t;
        }
    }
}), Polymer({
    is: "paper-input-container",
    properties: {
        noLabelFloat: {
            type: Boolean,
            value: !1
        },
        alwaysFloatLabel: {
            type: Boolean,
            value: !1
        },
        attrForValue: {
            type: String,
            value: "bind-value"
        },
        autoValidate: {
            type: Boolean,
            value: !1
        },
        invalid: {
            observer: "_invalidChanged",
            type: Boolean,
            value: !1
        },
        focused: {
            readOnly: !0,
            type: Boolean,
            value: !1,
            notify: !0
        },
        _addons: {
            type: Array
        },
        _inputHasContent: {
            type: Boolean,
            value: !1
        },
        _inputSelector: {
            type: String,
            value: "input,textarea,.paper-input-input"
        },
        _boundOnFocus: {
            type: Function,
            value: function() {
                return this._onFocus.bind(this);
            }
        },
        _boundOnBlur: {
            type: Function,
            value: function() {
                return this._onBlur.bind(this);
            }
        },
        _boundOnInput: {
            type: Function,
            value: function() {
                return this._onInput.bind(this);
            }
        },
        _boundValueChanged: {
            type: Function,
            value: function() {
                return this._onValueChanged.bind(this);
            }
        }
    },
    listeners: {
        "addon-attached": "_onAddonAttached",
        "iron-input-validate": "_onIronInputValidate"
    },
    get _valueChangedEvent() {
        return this.attrForValue + "-changed";
    },
    get _propertyForValue() {
        return Polymer.CaseMap.dashToCamelCase(this.attrForValue);
    },
    get _inputElement() {
        return Polymer.dom(this).querySelector(this._inputSelector);
    },
    get _inputElementValue() {
        return this._inputElement[this._propertyForValue] || this._inputElement.value;
    },
    ready: function() {
        this._addons || (this._addons = []), this.addEventListener("focus", this._boundOnFocus, !0), 
        this.addEventListener("blur", this._boundOnBlur, !0);
    },
    attached: function() {
        this.attrForValue ? this._inputElement.addEventListener(this._valueChangedEvent, this._boundValueChanged) : this.addEventListener("input", this._onInput), 
        "" != this._inputElementValue ? this._handleValueAndAutoValidate(this._inputElement) : this._handleValue(this._inputElement);
    },
    _onAddonAttached: function(e) {
        this._addons || (this._addons = []);
        var t = e.target;
        -1 === this._addons.indexOf(t) && (this._addons.push(t), this.isAttached && this._handleValue(this._inputElement));
    },
    _onFocus: function() {
        this._setFocused(!0);
    },
    _onBlur: function() {
        this._setFocused(!1), this._handleValueAndAutoValidate(this._inputElement);
    },
    _onInput: function(e) {
        this._handleValueAndAutoValidate(e.target);
    },
    _onValueChanged: function(e) {
        this._handleValueAndAutoValidate(e.target);
    },
    _handleValue: function(e) {
        var t = this._inputElementValue;
        t || 0 === t || "number" === e.type && !e.checkValidity() ? this._inputHasContent = !0 : this._inputHasContent = !1, 
        this.updateAddons({
            inputElement: e,
            value: t,
            invalid: this.invalid
        });
    },
    _handleValueAndAutoValidate: function(e) {
        if (this.autoValidate) {
            var t;
            t = e.validate ? e.validate(this._inputElementValue) : e.checkValidity(), this.invalid = !t;
        }
        this._handleValue(e);
    },
    _onIronInputValidate: function(e) {
        this.invalid = this._inputElement.invalid;
    },
    _invalidChanged: function() {
        this._addons && this.updateAddons({
            invalid: this.invalid
        });
    },
    updateAddons: function(e) {
        for (var t, i = 0; t = this._addons[i]; i++) t.update(e);
    },
    _computeInputContentClass: function(e, t, i, n, o) {
        var r = "input-content";
        if (e) o && (r += " label-is-hidden"), n && (r += " is-invalid"); else {
            var s = this.querySelector("label");
            t || o ? (r += " label-is-floating", this.$.labelAndInputContainer.style.position = "static", 
            n ? r += " is-invalid" : i && (r += " label-is-highlighted")) : (s && (this.$.labelAndInputContainer.style.position = "relative"), 
            n && (r += " is-invalid"));
        }
        return i && (r += " focused"), r;
    },
    _computeUnderlineClass: function(e, t) {
        var i = "underline";
        return t ? i += " is-invalid" : e && (i += " is-highlighted"), i;
    },
    _computeAddOnContentClass: function(e, t) {
        var i = "add-on-content";
        return t ? i += " is-invalid" : e && (i += " is-highlighted"), i;
    }
}), Polymer({
    is: "paper-input-error",
    behaviors: [ Polymer.PaperInputAddonBehavior ],
    properties: {
        invalid: {
            readOnly: !0,
            reflectToAttribute: !0,
            type: Boolean
        }
    },
    update: function(e) {
        this._setInvalid(e.invalid);
    }
}), Polymer({
    is: "paper-input",
    behaviors: [ Polymer.IronFormElementBehavior, Polymer.PaperInputBehavior ]
}), function() {
    "use strict";
    var e = {
        pageX: 0,
        pageY: 0
    }, t = null, i = [], n = [ "wheel", "mousewheel", "DOMMouseScroll", "touchstart", "touchmove" ];
    Polymer.IronDropdownScrollManager = {
        get currentLockingElement() {
            return this._lockingElements[this._lockingElements.length - 1];
        },
        elementIsScrollLocked: function(e) {
            var t = this.currentLockingElement;
            if (void 0 === t) return !1;
            var i;
            return !!this._hasCachedLockedElement(e) || !this._hasCachedUnlockedElement(e) && ((i = !!t && t !== e && !this._composedTreeContains(t, e)) ? this._lockedElementCache.push(e) : this._unlockedElementCache.push(e), 
            i);
        },
        pushScrollLock: function(e) {
            this._lockingElements.indexOf(e) >= 0 || (0 === this._lockingElements.length && this._lockScrollInteractions(), 
            this._lockingElements.push(e), this._lockedElementCache = [], this._unlockedElementCache = []);
        },
        removeScrollLock: function(e) {
            var t = this._lockingElements.indexOf(e);
            -1 !== t && (this._lockingElements.splice(t, 1), this._lockedElementCache = [], 
            this._unlockedElementCache = [], 0 === this._lockingElements.length && this._unlockScrollInteractions());
        },
        _lockingElements: [],
        _lockedElementCache: null,
        _unlockedElementCache: null,
        _hasCachedLockedElement: function(e) {
            return this._lockedElementCache.indexOf(e) > -1;
        },
        _hasCachedUnlockedElement: function(e) {
            return this._unlockedElementCache.indexOf(e) > -1;
        },
        _composedTreeContains: function(e, t) {
            var i, n, o, r;
            if (e.contains(t)) return !0;
            for (i = Polymer.dom(e).querySelectorAll("content"), o = 0; o < i.length; ++o) for (n = Polymer.dom(i[o]).getDistributedNodes(), 
            r = 0; r < n.length; ++r) if (this._composedTreeContains(n[r], t)) return !0;
            return !1;
        },
        _scrollInteractionHandler: function(t) {
            if (t.cancelable && this._shouldPreventScrolling(t) && t.preventDefault(), t.targetTouches) {
                var i = t.targetTouches[0];
                e.pageX = i.pageX, e.pageY = i.pageY;
            }
        },
        _lockScrollInteractions: function() {
            this._boundScrollHandler = this._boundScrollHandler || this._scrollInteractionHandler.bind(this);
            for (var e = 0, t = n.length; e < t; e++) document.addEventListener(n[e], this._boundScrollHandler, {
                capture: !0,
                passive: !1
            });
        },
        _unlockScrollInteractions: function() {
            for (var e = 0, t = n.length; e < t; e++) document.removeEventListener(n[e], this._boundScrollHandler, {
                capture: !0,
                passive: !1
            });
        },
        _shouldPreventScrolling: function(e) {
            var n = Polymer.dom(e).rootTarget;
            if ("touchmove" !== e.type && t !== n && (t = n, i = this._getScrollableNodes(Polymer.dom(e).path)), 
            !i.length) return !0;
            if ("touchstart" === e.type) return !1;
            var o = this._getScrollInfo(e);
            return !this._getScrollingNode(i, o.deltaX, o.deltaY);
        },
        _getScrollableNodes: function(e) {
            for (var t = [], i = e.indexOf(this.currentLockingElement), n = 0; n <= i; n++) if (e[n].nodeType === Node.ELEMENT_NODE) {
                var o = e[n], r = o.style;
                "scroll" !== r.overflow && "auto" !== r.overflow && (r = window.getComputedStyle(o)), 
                "scroll" !== r.overflow && "auto" !== r.overflow || t.push(o);
            }
            return t;
        },
        _getScrollingNode: function(e, t, i) {
            if (t || i) for (var n = Math.abs(i) >= Math.abs(t), o = 0; o < e.length; o++) {
                var r = e[o];
                if (n ? i < 0 ? r.scrollTop > 0 : r.scrollTop < r.scrollHeight - r.clientHeight : t < 0 ? r.scrollLeft > 0 : r.scrollLeft < r.scrollWidth - r.clientWidth) return r;
            }
        },
        _getScrollInfo: function(t) {
            var i = {
                deltaX: t.deltaX,
                deltaY: t.deltaY
            };
            if ("deltaX" in t) ; else if ("wheelDeltaX" in t) i.deltaX = -t.wheelDeltaX, i.deltaY = -t.wheelDeltaY; else if ("axis" in t) i.deltaX = 1 === t.axis ? t.detail : 0, 
            i.deltaY = 2 === t.axis ? t.detail : 0; else if (t.targetTouches) {
                var n = t.targetTouches[0];
                i.deltaX = e.pageX - n.pageX, i.deltaY = e.pageY - n.pageY;
            }
            return i;
        }
    };
}(), function() {
    "use strict";
    Polymer({
        is: "iron-dropdown",
        behaviors: [ Polymer.IronControlState, Polymer.IronA11yKeysBehavior, Polymer.IronOverlayBehavior, Polymer.NeonAnimationRunnerBehavior ],
        properties: {
            horizontalAlign: {
                type: String,
                value: "left",
                reflectToAttribute: !0
            },
            verticalAlign: {
                type: String,
                value: "top",
                reflectToAttribute: !0
            },
            openAnimationConfig: {
                type: Object
            },
            closeAnimationConfig: {
                type: Object
            },
            focusTarget: {
                type: Object
            },
            noAnimations: {
                type: Boolean,
                value: !1
            },
            allowOutsideScroll: {
                type: Boolean,
                value: !1
            },
            _boundOnCaptureScroll: {
                type: Function,
                value: function() {
                    return this._onCaptureScroll.bind(this);
                }
            }
        },
        listeners: {
            "neon-animation-finish": "_onNeonAnimationFinish"
        },
        observers: [ "_updateOverlayPosition(positionTarget, verticalAlign, horizontalAlign, verticalOffset, horizontalOffset)" ],
        get containedElement() {
            return Polymer.dom(this.$.content).getDistributedNodes()[0];
        },
        get _focusTarget() {
            return this.focusTarget || this.containedElement;
        },
        ready: function() {
            this._scrollTop = 0, this._scrollLeft = 0, this._refitOnScrollRAF = null;
        },
        attached: function() {
            this.sizingTarget && this.sizingTarget !== this || (this.sizingTarget = this.containedElement || this);
        },
        detached: function() {
            this.cancelAnimation(), document.removeEventListener("scroll", this._boundOnCaptureScroll), 
            Polymer.IronDropdownScrollManager.removeScrollLock(this);
        },
        _openedChanged: function() {
            this.opened && this.disabled ? this.cancel() : (this.cancelAnimation(), this._updateAnimationConfig(), 
            this._saveScrollPosition(), this.opened ? (document.addEventListener("scroll", this._boundOnCaptureScroll), 
            !this.allowOutsideScroll && Polymer.IronDropdownScrollManager.pushScrollLock(this)) : (document.removeEventListener("scroll", this._boundOnCaptureScroll), 
            Polymer.IronDropdownScrollManager.removeScrollLock(this)), Polymer.IronOverlayBehaviorImpl._openedChanged.apply(this, arguments));
        },
        _renderOpened: function() {
            !this.noAnimations && this.animationConfig.open ? (this.$.contentWrapper.classList.add("animating"), 
            this.playAnimation("open")) : Polymer.IronOverlayBehaviorImpl._renderOpened.apply(this, arguments);
        },
        _renderClosed: function() {
            !this.noAnimations && this.animationConfig.close ? (this.$.contentWrapper.classList.add("animating"), 
            this.playAnimation("close")) : Polymer.IronOverlayBehaviorImpl._renderClosed.apply(this, arguments);
        },
        _onNeonAnimationFinish: function() {
            this.$.contentWrapper.classList.remove("animating"), this.opened ? this._finishRenderOpened() : this._finishRenderClosed();
        },
        _onCaptureScroll: function() {
            this.allowOutsideScroll ? (this._refitOnScrollRAF && window.cancelAnimationFrame(this._refitOnScrollRAF), 
            this._refitOnScrollRAF = window.requestAnimationFrame(this.refit.bind(this))) : this._restoreScrollPosition();
        },
        _saveScrollPosition: function() {
            document.scrollingElement ? (this._scrollTop = document.scrollingElement.scrollTop, 
            this._scrollLeft = document.scrollingElement.scrollLeft) : (this._scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop), 
            this._scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft));
        },
        _restoreScrollPosition: function() {
            document.scrollingElement ? (document.scrollingElement.scrollTop = this._scrollTop, 
            document.scrollingElement.scrollLeft = this._scrollLeft) : (document.documentElement.scrollTop = this._scrollTop, 
            document.documentElement.scrollLeft = this._scrollLeft, document.body.scrollTop = this._scrollTop, 
            document.body.scrollLeft = this._scrollLeft);
        },
        _updateAnimationConfig: function() {
            for (var e = this.containedElement, t = [].concat(this.openAnimationConfig || []).concat(this.closeAnimationConfig || []), i = 0; i < t.length; i++) t[i].node = e;
            this.animationConfig = {
                open: this.openAnimationConfig,
                close: this.closeAnimationConfig
            };
        },
        _updateOverlayPosition: function() {
            this.isAttached && this.notifyResize();
        },
        _applyFocus: function() {
            var e = this.focusTarget || this.containedElement;
            e && this.opened && !this.noAutoFocus ? e.focus() : Polymer.IronOverlayBehaviorImpl._applyFocus.apply(this, arguments);
        }
    });
}(), Polymer({
    is: "paper-menu-grow-height-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = t.getBoundingClientRect().height;
        return this._effect = new KeyframeEffect(t, [ {
            height: i / 2 + "px"
        }, {
            height: i + "px"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer({
    is: "paper-menu-grow-width-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = t.getBoundingClientRect().width;
        return this._effect = new KeyframeEffect(t, [ {
            width: i / 2 + "px"
        }, {
            width: i + "px"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer({
    is: "paper-menu-shrink-width-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = t.getBoundingClientRect().width;
        return this._effect = new KeyframeEffect(t, [ {
            width: i + "px"
        }, {
            width: i - i / 20 + "px"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer({
    is: "paper-menu-shrink-height-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        var t = e.node, i = t.getBoundingClientRect(), n = i.height;
        i.top;
        return this.setPrefixedProperty(t, "transformOrigin", "0 0"), this._effect = new KeyframeEffect(t, [ {
            height: n + "px",
            transform: "translateY(0)"
        }, {
            height: n / 2 + "px",
            transform: "translateY(-20px)"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), function() {
    "use strict";
    var e = {
        ANIMATION_CUBIC_BEZIER: "cubic-bezier(.3,.95,.5,1)",
        MAX_ANIMATION_TIME_MS: 400
    }, t = Polymer({
        is: "paper-menu-button",
        behaviors: [ Polymer.IronA11yKeysBehavior, Polymer.IronControlState ],
        properties: {
            opened: {
                type: Boolean,
                value: !1,
                notify: !0,
                observer: "_openedChanged"
            },
            horizontalAlign: {
                type: String,
                value: "left",
                reflectToAttribute: !0
            },
            verticalAlign: {
                type: String,
                value: "top",
                reflectToAttribute: !0
            },
            dynamicAlign: {
                type: Boolean
            },
            horizontalOffset: {
                type: Number,
                value: 0,
                notify: !0
            },
            verticalOffset: {
                type: Number,
                value: 0,
                notify: !0
            },
            noOverlap: {
                type: Boolean
            },
            noAnimations: {
                type: Boolean,
                value: !1
            },
            ignoreSelect: {
                type: Boolean,
                value: !1
            },
            closeOnActivate: {
                type: Boolean,
                value: !1
            },
            openAnimationConfig: {
                type: Object,
                value: function() {
                    return [ {
                        name: "fade-in-animation",
                        timing: {
                            delay: 100,
                            duration: 200
                        }
                    }, {
                        name: "paper-menu-grow-width-animation",
                        timing: {
                            delay: 100,
                            duration: 150,
                            easing: e.ANIMATION_CUBIC_BEZIER
                        }
                    }, {
                        name: "paper-menu-grow-height-animation",
                        timing: {
                            delay: 100,
                            duration: 275,
                            easing: e.ANIMATION_CUBIC_BEZIER
                        }
                    } ];
                }
            },
            closeAnimationConfig: {
                type: Object,
                value: function() {
                    return [ {
                        name: "fade-out-animation",
                        timing: {
                            duration: 150
                        }
                    }, {
                        name: "paper-menu-shrink-width-animation",
                        timing: {
                            delay: 100,
                            duration: 50,
                            easing: e.ANIMATION_CUBIC_BEZIER
                        }
                    }, {
                        name: "paper-menu-shrink-height-animation",
                        timing: {
                            duration: 200,
                            easing: "ease-in"
                        }
                    } ];
                }
            },
            allowOutsideScroll: {
                type: Boolean,
                value: !1
            },
            restoreFocusOnClose: {
                type: Boolean,
                value: !0
            },
            _dropdownContent: {
                type: Object
            }
        },
        hostAttributes: {
            role: "group",
            "aria-haspopup": "true"
        },
        listeners: {
            "iron-activate": "_onIronActivate",
            "iron-select": "_onIronSelect"
        },
        get contentElement() {
            return Polymer.dom(this.$.content).getDistributedNodes()[0];
        },
        toggle: function() {
            this.opened ? this.close() : this.open();
        },
        open: function() {
            this.disabled || this.$.dropdown.open();
        },
        close: function() {
            this.$.dropdown.close();
        },
        _onIronSelect: function(e) {
            this.ignoreSelect || this.close();
        },
        _onIronActivate: function(e) {
            this.closeOnActivate && this.close();
        },
        _openedChanged: function(e, t) {
            e ? (this._dropdownContent = this.contentElement, this.fire("paper-dropdown-open")) : null != t && this.fire("paper-dropdown-close");
        },
        _disabledChanged: function(e) {
            Polymer.IronControlState._disabledChanged.apply(this, arguments), e && this.opened && this.close();
        },
        __onIronOverlayCanceled: function(e) {
            var t = e.detail, i = (Polymer.dom(t).rootTarget, this.$.trigger);
            Polymer.dom(t).path.indexOf(i) > -1 && e.preventDefault();
        }
    });
    Object.keys(e).forEach(function(i) {
        t[i] = e[i];
    }), Polymer.PaperMenuButton = t;
}(), Polymer({
    is: "iron-iconset-svg",
    properties: {
        name: {
            type: String,
            observer: "_nameChanged"
        },
        size: {
            type: Number,
            value: 24
        },
        rtlMirroring: {
            type: Boolean,
            value: !1
        }
    },
    attached: function() {
        this.style.display = "none";
    },
    getIconNames: function() {
        return this._icons = this._createIconMap(), Object.keys(this._icons).map(function(e) {
            return this.name + ":" + e;
        }, this);
    },
    applyIcon: function(e, t) {
        e = e.root || e, this.removeIcon(e);
        var i = this._cloneIcon(t, this.rtlMirroring && this._targetIsRTL(e));
        if (i) {
            var n = Polymer.dom(e);
            return n.insertBefore(i, n.childNodes[0]), e._svgIcon = i;
        }
        return null;
    },
    removeIcon: function(e) {
        (e = e.root || e)._svgIcon && (Polymer.dom(e).removeChild(e._svgIcon), e._svgIcon = null);
    },
    _targetIsRTL: function(e) {
        return null == this.__targetIsRTL && (e && e.nodeType !== Node.ELEMENT_NODE && (e = e.host), 
        this.__targetIsRTL = e && "rtl" === window.getComputedStyle(e).direction), this.__targetIsRTL;
    },
    _nameChanged: function() {
        new Polymer.IronMeta({
            type: "iconset",
            key: this.name,
            value: this
        }), this.async(function() {
            this.fire("iron-iconset-added", this, {
                node: window
            });
        });
    },
    _createIconMap: function() {
        var e = Object.create(null);
        return Polymer.dom(this).querySelectorAll("[id]").forEach(function(t) {
            e[t.id] = t;
        }), e;
    },
    _cloneIcon: function(e, t) {
        return this._icons = this._icons || this._createIconMap(), this._prepareSvgClone(this._icons[e], this.size, t);
    },
    _prepareSvgClone: function(e, t, i) {
        if (e) {
            var n = e.cloneNode(!0), o = document.createElementNS("http://www.w3.org/2000/svg", "svg"), r = n.getAttribute("viewBox") || "0 0 " + t + " " + t, s = "pointer-events: none; display: block; width: 100%; height: 100%;";
            return i && n.hasAttribute("mirror-in-rtl") && (s += "-webkit-transform:scale(-1,1);transform:scale(-1,1);"), 
            o.setAttribute("viewBox", r), o.setAttribute("preserveAspectRatio", "xMidYMid meet"), 
            o.setAttribute("focusable", "false"), o.style.cssText = s, o.appendChild(n).removeAttribute("id"), 
            o;
        }
        return null;
    }
}), function() {
    "use strict";
    Polymer({
        is: "paper-dropdown-menu",
        behaviors: [ Polymer.IronButtonState, Polymer.IronControlState, Polymer.IronFormElementBehavior, Polymer.IronValidatableBehavior ],
        properties: {
            selectedItemLabel: {
                type: String,
                notify: !0,
                readOnly: !0
            },
            selectedItem: {
                type: Object,
                notify: !0,
                readOnly: !0
            },
            value: {
                type: String,
                notify: !0,
                readOnly: !0
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            errorMessage: {
                type: String
            },
            opened: {
                type: Boolean,
                notify: !0,
                value: !1,
                observer: "_openedChanged"
            },
            allowOutsideScroll: {
                type: Boolean,
                value: !1
            },
            noLabelFloat: {
                type: Boolean,
                value: !1,
                reflectToAttribute: !0
            },
            alwaysFloatLabel: {
                type: Boolean,
                value: !1
            },
            noAnimations: {
                type: Boolean,
                value: !1
            },
            horizontalAlign: {
                type: String,
                value: "right"
            },
            verticalAlign: {
                type: String,
                value: "top"
            },
            dynamicAlign: {
                type: Boolean
            },
            restoreFocusOnClose: {
                type: Boolean,
                value: !0
            }
        },
        listeners: {
            tap: "_onTap"
        },
        keyBindings: {
            "up down": "open",
            esc: "close"
        },
        hostAttributes: {
            role: "combobox",
            "aria-autocomplete": "none",
            "aria-haspopup": "true"
        },
        observers: [ "_selectedItemChanged(selectedItem)" ],
        attached: function() {
            var e = this.contentElement;
            e && e.selectedItem && this._setSelectedItem(e.selectedItem);
        },
        get contentElement() {
            return Polymer.dom(this.$.content).getDistributedNodes()[0];
        },
        open: function() {
            this.$.menuButton.open();
        },
        close: function() {
            this.$.menuButton.close();
        },
        _onIronSelect: function(e) {
            this._setSelectedItem(e.detail.item);
        },
        _onIronDeselect: function(e) {
            this._setSelectedItem(null);
        },
        _onTap: function(e) {
            Polymer.Gestures.findOriginalTarget(e) === this && this.open();
        },
        _selectedItemChanged: function(e) {
            var t = "";
            t = e ? e.label || e.getAttribute("label") || e.textContent.trim() : "", this._setValue(t), 
            this._setSelectedItemLabel(t);
        },
        _computeMenuVerticalOffset: function(e) {
            return e ? -4 : 8;
        },
        _getValidity: function(e) {
            return this.disabled || !this.required || this.required && !!this.value;
        },
        _openedChanged: function() {
            var e = this.opened ? "true" : "false", t = this.contentElement;
            t && t.setAttribute("aria-expanded", e);
        }
    });
}(), /*
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-dropdown",
    properties: {
        name: {
            type: String,
            value: "store"
        },
        label: {
            type: String,
            value: ""
        },
        value: {
            type: Number,
            value: 0,
            notify: !0
        },
        items: {
            type: Array,
            value: function() {
                return [];
            }
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        }
    },
    _onItemSelected: function(e) {
        const t = this.$.t.modelForElement(e.target);
        t && Chrome.GA.event(Chrome.GA.EVENT.MENU, `${this.name}: ${t.index}`);
    },
    _init: function() {
        this.set("value", "0");
    }
}), Polymer.IronLabel = Polymer({
    is: "iron-label",
    listeners: {
        tap: "_tapHandler"
    },
    properties: {
        for: {
            type: String,
            value: "",
            reflectToAttribute: !0,
            observer: "_forChanged"
        },
        _forElement: Object
    },
    attached: function() {
        this._forChanged();
    },
    ready: function() {
        this._generateLabelId();
    },
    _generateLabelId: function() {
        if (!this.id) {
            var e = "iron-label-" + Polymer.IronLabel._labelNumber++;
            Polymer.dom(this).setAttribute("id", e);
        }
    },
    _findTarget: function() {
        if (this.for) {
            var e = Polymer.dom(this).getOwnerRoot();
            return Polymer.dom(e).querySelector("#" + this.for);
        }
        var t = Polymer.dom(this).querySelector("[iron-label-target]");
        return t || (t = Polymer.dom(this).firstElementChild), t;
    },
    _tapHandler: function(e) {
        this._forElement && Polymer.dom(e).localTarget !== this._forElement && (this._forElement.focus(), 
        this._forElement.click());
    },
    _applyLabelledBy: function() {
        this._forElement && Polymer.dom(this._forElement).setAttribute("aria-labelledby", this.id);
    },
    _forChanged: function() {
        this._forElement && Polymer.dom(this._forElement).removeAttribute("aria-labelledby"), 
        this._forElement = this._findTarget(), this._applyLabelledBy();
    }
}), Polymer.IronLabel._labelNumber = 0, Polymer({
    is: "paper-item-body"
}), Polymer.IronCheckedElementBehaviorImpl = {
    properties: {
        checked: {
            type: Boolean,
            value: !1,
            reflectToAttribute: !0,
            notify: !0,
            observer: "_checkedChanged"
        },
        toggles: {
            type: Boolean,
            value: !0,
            reflectToAttribute: !0
        },
        value: {
            type: String,
            value: "on",
            observer: "_valueChanged"
        }
    },
    observers: [ "_requiredChanged(required)" ],
    created: function() {
        this._hasIronCheckedElementBehavior = !0;
    },
    _getValidity: function(e) {
        return this.disabled || !this.required || this.checked;
    },
    _requiredChanged: function() {
        this.required ? this.setAttribute("aria-required", "true") : this.removeAttribute("aria-required");
    },
    _checkedChanged: function() {
        this.active = this.checked, this.fire("iron-change");
    },
    _valueChanged: function() {
        void 0 !== this.value && null !== this.value || (this.value = "on");
    }
}, Polymer.IronCheckedElementBehavior = [ Polymer.IronFormElementBehavior, Polymer.IronValidatableBehavior, Polymer.IronCheckedElementBehaviorImpl ], 
Polymer.PaperCheckedElementBehaviorImpl = {
    _checkedChanged: function() {
        Polymer.IronCheckedElementBehaviorImpl._checkedChanged.call(this), this.hasRipple() && (this.checked ? this._ripple.setAttribute("checked", "") : this._ripple.removeAttribute("checked"));
    },
    _buttonStateChanged: function() {
        Polymer.PaperRippleBehavior._buttonStateChanged.call(this), this.disabled || this.isAttached && (this.checked = this.active);
    }
}, Polymer.PaperCheckedElementBehavior = [ Polymer.PaperInkyFocusBehavior, Polymer.IronCheckedElementBehavior, Polymer.PaperCheckedElementBehaviorImpl ], 
Polymer({
    is: "paper-toggle-button",
    behaviors: [ Polymer.PaperCheckedElementBehavior ],
    hostAttributes: {
        role: "button",
        "aria-pressed": "false",
        tabindex: 0
    },
    properties: {},
    listeners: {
        track: "_ontrack"
    },
    attached: function() {
        Polymer.RenderStatus.afterNextRender(this, function() {
            this.setScrollDirection("y");
        });
    },
    _ontrack: function(e) {
        var t = e.detail;
        "start" === t.state ? this._trackStart(t) : "track" === t.state ? this._trackMove(t) : "end" === t.state && this._trackEnd(t);
    },
    _trackStart: function(e) {
        this._width = this.$.toggleBar.offsetWidth / 2, this._trackChecked = this.checked, 
        this.$.toggleButton.classList.add("dragging");
    },
    _trackMove: function(e) {
        var t = e.dx;
        this._x = Math.min(this._width, Math.max(0, this._trackChecked ? this._width + t : t)), 
        this.translate3d(this._x + "px", 0, 0, this.$.toggleButton), this._userActivate(this._x > this._width / 2);
    },
    _trackEnd: function(e) {
        this.$.toggleButton.classList.remove("dragging"), this.transform("", this.$.toggleButton);
    },
    _createRipple: function() {
        this._rippleContainer = this.$.toggleButton;
        var e = Polymer.PaperRippleBehavior._createRipple();
        return e.id = "ink", e.setAttribute("recenters", ""), e.classList.add("circle", "toggle-ink"), 
        e;
    }
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-toggle",
    properties: {
        name: {
            type: String,
            value: "store"
        },
        checked: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        mainLabel: {
            type: String,
            value: ""
        },
        secondaryLabel: {
            type: String,
            value: ""
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        }
    },
    setChecked: function(e) {
        this.set("checked", e), Chrome.GA.event(Chrome.GA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
    },
    _onChange: function() {
        Chrome.GA.event(Chrome.GA.EVENT.TOGGLE, `${this.name}: ${this.checked}`);
    },
    _init: function() {
        this.set("checked", "false");
    }
}), Polymer.IronRangeBehavior = {
    properties: {
        value: {
            type: Number,
            value: 0,
            notify: !0,
            reflectToAttribute: !0
        },
        min: {
            type: Number,
            value: 0,
            notify: !0
        },
        max: {
            type: Number,
            value: 100,
            notify: !0
        },
        step: {
            type: Number,
            value: 1,
            notify: !0
        },
        ratio: {
            type: Number,
            value: 0,
            readOnly: !0,
            notify: !0
        }
    },
    observers: [ "_update(value, min, max, step)" ],
    _calcRatio: function(e) {
        return (this._clampValue(e) - this.min) / (this.max - this.min);
    },
    _clampValue: function(e) {
        return Math.min(this.max, Math.max(this.min, this._calcStep(e)));
    },
    _calcStep: function(e) {
        if (e = parseFloat(e), !this.step) return e;
        var t = Math.round((e - this.min) / this.step);
        return this.step < 1 ? t / (1 / this.step) + this.min : t * this.step + this.min;
    },
    _validateValue: function() {
        var e = this._clampValue(this.value);
        return this.value = this.oldValue = isNaN(e) ? this.oldValue : e, this.value !== e;
    },
    _update: function() {
        this._validateValue(), this._setRatio(100 * this._calcRatio(this.value));
    }
}, Polymer({
    is: "paper-progress",
    behaviors: [ Polymer.IronRangeBehavior ],
    properties: {
        secondaryProgress: {
            type: Number,
            value: 0
        },
        secondaryRatio: {
            type: Number,
            value: 0,
            readOnly: !0
        },
        indeterminate: {
            type: Boolean,
            value: !1,
            observer: "_toggleIndeterminate"
        },
        disabled: {
            type: Boolean,
            value: !1,
            reflectToAttribute: !0,
            observer: "_disabledChanged"
        }
    },
    observers: [ "_progressChanged(secondaryProgress, value, min, max)" ],
    hostAttributes: {
        role: "progressbar"
    },
    _toggleIndeterminate: function(e) {
        this.toggleClass("indeterminate", e, this.$.primaryProgress);
    },
    _transformProgress: function(e, t) {
        var i = "scaleX(" + t / 100 + ")";
        e.style.transform = e.style.webkitTransform = i;
    },
    _mainRatioChanged: function(e) {
        this._transformProgress(this.$.primaryProgress, e);
    },
    _progressChanged: function(e, t, i, n) {
        e = this._clampValue(e), t = this._clampValue(t);
        var o = 100 * this._calcRatio(e), r = 100 * this._calcRatio(t);
        this._setSecondaryRatio(o), this._transformProgress(this.$.secondaryProgress, o), 
        this._transformProgress(this.$.primaryProgress, r), this.secondaryProgress = e, 
        this.setAttribute("aria-valuenow", t), this.setAttribute("aria-valuemin", i), this.setAttribute("aria-valuemax", n);
    },
    _disabledChanged: function(e) {
        this.setAttribute("aria-disabled", e ? "true" : "false");
    },
    _hideSecondaryProgress: function(e) {
        return 0 === e;
    }
}), Polymer({
    is: "paper-slider",
    behaviors: [ Polymer.IronA11yKeysBehavior, Polymer.IronFormElementBehavior, Polymer.PaperInkyFocusBehavior, Polymer.IronRangeBehavior ],
    properties: {
        snaps: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        pin: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        secondaryProgress: {
            type: Number,
            value: 0,
            notify: !0,
            observer: "_secondaryProgressChanged"
        },
        editable: {
            type: Boolean,
            value: !1
        },
        immediateValue: {
            type: Number,
            value: 0,
            readOnly: !0,
            notify: !0
        },
        maxMarkers: {
            type: Number,
            value: 0,
            notify: !0
        },
        expand: {
            type: Boolean,
            value: !1,
            readOnly: !0
        },
        dragging: {
            type: Boolean,
            value: !1,
            readOnly: !0
        },
        transiting: {
            type: Boolean,
            value: !1,
            readOnly: !0
        },
        markers: {
            type: Array,
            readOnly: !0,
            value: function() {
                return [];
            }
        }
    },
    observers: [ "_updateKnob(value, min, max, snaps, step)", "_valueChanged(value)", "_immediateValueChanged(immediateValue)", "_updateMarkers(maxMarkers, min, max, snaps)" ],
    hostAttributes: {
        role: "slider",
        tabindex: 0
    },
    keyBindings: {
        left: "_leftKey",
        right: "_rightKey",
        "down pagedown home": "_decrementKey",
        "up pageup end": "_incrementKey"
    },
    increment: function() {
        this.value = this._clampValue(this.value + this.step);
    },
    decrement: function() {
        this.value = this._clampValue(this.value - this.step);
    },
    _updateKnob: function(e, t, i, n, o) {
        this.setAttribute("aria-valuemin", t), this.setAttribute("aria-valuemax", i), this.setAttribute("aria-valuenow", e), 
        this._positionKnob(this._calcRatio(e));
    },
    _valueChanged: function() {
        this.fire("value-change");
    },
    _immediateValueChanged: function() {
        this.dragging ? this.fire("immediate-value-change") : this.value = this.immediateValue;
    },
    _secondaryProgressChanged: function() {
        this.secondaryProgress = this._clampValue(this.secondaryProgress);
    },
    _expandKnob: function() {
        this._setExpand(!0);
    },
    _resetKnob: function() {
        this.cancelDebouncer("expandKnob"), this._setExpand(!1);
    },
    _positionKnob: function(e) {
        this._setImmediateValue(this._calcStep(this._calcKnobPosition(e))), this._setRatio(this._calcRatio(this.immediateValue)), 
        this.$.sliderKnob.style.left = 100 * this.ratio + "%", this.dragging && (this._knobstartx = this.ratio * this._w, 
        this.translate3d(0, 0, 0, this.$.sliderKnob));
    },
    _calcKnobPosition: function(e) {
        return (this.max - this.min) * e + this.min;
    },
    _onTrack: function(e) {
        switch (e.stopPropagation(), e.detail.state) {
          case "start":
            this._trackStart(e);
            break;

          case "track":
            this._trackX(e);
            break;

          case "end":
            this._trackEnd();
        }
    },
    _trackStart: function(e) {
        this._w = this.$.sliderBar.offsetWidth, this._x = this.ratio * this._w, this._startx = this._x, 
        this._knobstartx = this._startx, this._minx = -this._startx, this._maxx = this._w - this._startx, 
        this.$.sliderKnob.classList.add("dragging"), this._setDragging(!0);
    },
    _trackX: function(e) {
        this.dragging || this._trackStart(e);
        var t = this._isRTL ? -1 : 1, i = Math.min(this._maxx, Math.max(this._minx, e.detail.dx * t));
        this._x = this._startx + i;
        var n = this._calcStep(this._calcKnobPosition(this._x / this._w));
        this._setImmediateValue(n);
        var o = this._calcRatio(this.immediateValue) * this._w - this._knobstartx;
        this.translate3d(o + "px", 0, 0, this.$.sliderKnob);
    },
    _trackEnd: function() {
        var e = this.$.sliderKnob.style;
        this.$.sliderKnob.classList.remove("dragging"), this._setDragging(!1), this._resetKnob(), 
        this.value = this.immediateValue, e.transform = e.webkitTransform = "", this.fire("change");
    },
    _knobdown: function(e) {
        this._expandKnob(), e.preventDefault(), this.focus();
    },
    _bardown: function(e) {
        this._w = this.$.sliderBar.offsetWidth;
        var t = this.$.sliderBar.getBoundingClientRect(), i = (e.detail.x - t.left) / this._w;
        this._isRTL && (i = 1 - i);
        var n = this.ratio;
        this._setTransiting(!0), this._positionKnob(i), this.debounce("expandKnob", this._expandKnob, 60), 
        n === this.ratio && this._setTransiting(!1), this.async(function() {
            this.fire("change");
        }), e.preventDefault(), this.focus();
    },
    _knobTransitionEnd: function(e) {
        e.target === this.$.sliderKnob && this._setTransiting(!1);
    },
    _updateMarkers: function(e, t, i, n) {
        n || this._setMarkers([]);
        var o = Math.round((i - t) / this.step);
        o > e && (o = e), (o < 0 || !isFinite(o)) && (o = 0), this._setMarkers(new Array(o));
    },
    _mergeClasses: function(e) {
        return Object.keys(e).filter(function(t) {
            return e[t];
        }).join(" ");
    },
    _getClassNames: function() {
        return this._mergeClasses({
            disabled: this.disabled,
            pin: this.pin,
            snaps: this.snaps,
            ring: this.immediateValue <= this.min,
            expand: this.expand,
            dragging: this.dragging,
            transiting: this.transiting,
            editable: this.editable
        });
    },
    get _isRTL() {
        return void 0 === this.__isRTL && (this.__isRTL = "rtl" === window.getComputedStyle(this).direction), 
        this.__isRTL;
    },
    _leftKey: function(e) {
        this._isRTL ? this._incrementKey(e) : this._decrementKey(e);
    },
    _rightKey: function(e) {
        this._isRTL ? this._decrementKey(e) : this._incrementKey(e);
    },
    _incrementKey: function(e) {
        this.disabled || ("end" === e.detail.key ? this.value = this.max : this.increment(), 
        this.fire("change"), e.preventDefault());
    },
    _decrementKey: function(e) {
        this.disabled || ("home" === e.detail.key ? this.value = this.min : this.decrement(), 
        this.fire("change"), e.preventDefault());
    },
    _changeValue: function(e) {
        this.value = e.target.value, this.fire("change");
    },
    _inputKeyDown: function(e) {
        e.stopPropagation();
    },
    _createRipple: function() {
        return this._rippleContainer = this.$.sliderKnob, Polymer.PaperInkyFocusBehaviorImpl._createRipple.call(this);
    },
    _focusedChanged: function(e) {
        e && this.ensureRipple(), this.hasRipple() && (this._ripple.style.display = e ? "" : "none", 
        this._ripple.holdDown = e);
    }
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-slider",
    properties: {
        name: {
            type: String,
            value: "store"
        },
        label: {
            type: String,
            value: ""
        },
        value: {
            type: Object,
            notify: !0,
            value: function() {
                return {
                    base: 10,
                    display: 10,
                    unit: 0
                };
            }
        },
        units: {
            type: Array,
            value: function() {
                return [];
            }
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        }
    },
    _onSliderValueChanged: function() {
        Chrome.GA.event(Chrome.GA.EVENT.SLIDER_VALUE, this.name), this._setBase();
    },
    _onUnitChanged: function() {
        this.$.selector.selectedItem && Chrome.GA.event(Chrome.GA.EVENT.SLIDER_UNITS, this.name), 
        this.$.selector.select(this.units[this.value.unit]), this._setBase();
    },
    _setBase: function() {
        this.set("value.base", this.unit.mult * this.value.display);
    },
    _initValue: function() {
        this.value = {
            base: 10,
            display: 10,
            unit: 0
        };
    }
}), Polymer({
    is: "paper-icon-item",
    behaviors: [ Polymer.PaperItemBehavior ]
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-link",
    properties: {
        name: {
            type: String,
            value: "unknown"
        },
        label: {
            type: String,
            value: ""
        },
        icon: {
            type: String,
            value: ""
        },
        url: {
            type: String,
            value: ""
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        }
    },
    _onLinkTapped: function() {
        Chrome.GA.event(Chrome.GA.EVENT.LINK, this.name), chrome.tabs.create({
            url: this.url
        });
    }
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-background",
    behaviors: [ Chrome.LocalizeBehavior ],
    properties: {
        name: {
            type: String,
            value: "store"
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        },
        selected: {
            type: String,
            value: "b1",
            notify: !0
        },
        value: {
            type: String,
            value: "background:linear-gradient(to bottom, #3a3a3a, #b5bdc8)",
            notify: !0
        },
        mainLabel: {
            type: String,
            value: ""
        },
        secondaryLabel: {
            type: String,
            value: ""
        }
    },
    _init: function() {
        this.set("value", "background:linear-gradient(to bottom, #3a3a3a, #b5bdc8)");
    },
    _onTap: function() {
        this.$.dialog.open();
    },
    _onOK: function() {
        const e = document.getElementById(this.selected);
        this.set("value", "background:" + e.style.background), Chrome.GA.event(Chrome.GA.EVENT.BUTTON, `SettingBackground.OK: ${this.selected}`);
    }
}), "document" in self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) || function(e) {
    "use strict";
    if ("Element" in e) {
        var t = "classList", i = "prototype", n = e.Element[i], o = Object, r = String[i].trim || function() {
            return this.replace(/^\s+|\s+$/g, "");
        }, s = Array[i].indexOf || function(e) {
            for (var t = 0, i = this.length; i > t; t++) if (t in this && this[t] === e) return t;
            return -1;
        }, a = function(e, t) {
            this.name = e, this.code = DOMException[e], this.message = t;
        }, l = function(e, t) {
            if ("" === t) throw new a("SYNTAX_ERR", "An invalid or illegal string was specified");
            if (/\s/.test(t)) throw new a("INVALID_CHARACTER_ERR", "String contains an invalid character");
            return s.call(e, t);
        }, h = function(e) {
            for (var t = r.call(e.getAttribute("class") || ""), i = t ? t.split(/\s+/) : [], n = 0, o = i.length; o > n; n++) this.push(i[n]);
            this._updateClassName = function() {
                e.setAttribute("class", "" + this);
            };
        }, c = h[i] = [], u = function() {
            return new h(this);
        };
        if (a[i] = Error[i], c.item = function(e) {
            return this[e] || null;
        }, c.contains = function(e) {
            return e += "", -1 !== l(this, e);
        }, c.add = function() {
            var e, t = arguments, i = 0, n = t.length, o = !1;
            do {
                e = t[i] + "", -1 === l(this, e) && (this.push(e), o = !0);
            } while (++i < n);
            o && this._updateClassName();
        }, c.remove = function() {
            var e, t, i = arguments, n = 0, o = i.length, r = !1;
            do {
                for (e = i[n] + "", t = l(this, e); -1 !== t; ) this.splice(t, 1), r = !0, t = l(this, e);
            } while (++n < o);
            r && this._updateClassName();
        }, c.toggle = function(e, t) {
            e += "";
            var i = this.contains(e), n = i ? !0 !== t && "remove" : !1 !== t && "add";
            return n && this[n](e), !0 === t || !1 === t ? t : !i;
        }, c.toString = function() {
            return this.join(" ");
        }, o.defineProperty) {
            var d = {
                get: u,
                enumerable: !0,
                configurable: !0
            };
            try {
                o.defineProperty(n, t, d);
            } catch (e) {
                (void 0 === e.number || -2146823252 === e.number) && (d.enumerable = !1, o.defineProperty(n, t, d));
            }
        } else o[i].__defineGetter__ && n.__defineGetter__(t, u);
    }
}(self), function() {
    "use strict";
    var e = document.createElement("_");
    if (e.classList.add("c1", "c2"), !e.classList.contains("c2")) {
        var t = function(e) {
            var t = DOMTokenList.prototype[e];
            DOMTokenList.prototype[e] = function(e) {
                var i, n = arguments.length;
                for (i = 0; n > i; i++) e = arguments[i], t.call(this, e);
            };
        };
        t("add"), t("remove");
    }
    if (e.classList.toggle("c3", !1), e.classList.contains("c3")) {
        var i = DOMTokenList.prototype.toggle;
        DOMTokenList.prototype.toggle = function(e, t) {
            return 1 in arguments && !this.contains(e) == !t ? t : i.call(this, e);
        };
    }
    e = null;
}()), function() {
    function e(e, t) {
        var i, n = 0;
        return e = e || 0, (i = o(e)) < 180 && t > i + 180 && (n = -360), i >= 180 && t <= i - 180 && (n = 360), 
        e + n + (t - i);
    }
    var t = "http://www.w3.org/2000/svg", i = Math.PI / 180, n = 0, o = function(e) {
        return (e = e ? e % 360 : 0) < 0 ? e + 360 : e;
    };
    Polymer({
        is: "paper-clock-selector",
        properties: {
            selected: {
                type: Number,
                notify: !0,
                value: 0,
                observer: "_selectedChanged"
            },
            count: {
                type: Number,
                value: 0
            },
            step: {
                type: Number,
                value: 1,
                observer: "_stepChanged"
            },
            useZero: {
                type: Boolean,
                value: !1
            },
            zeroPad: {
                type: Boolean,
                value: !1
            },
            animated: {
                type: Boolean,
                value: !1
            }
        },
        listeners: {
            "iron-resize": "_updateSize"
        },
        observers: [ "_populate(count, step, useZero, _instanceId)", "_zeroPadChanged(zeroPad, _numbers)" ],
        behaviors: [ Polymer.IronResizableBehavior ],
        ready: function() {
            this._currentAngle = 0, this._populate(), this._selectedChanged(this.selected), 
            this._instanceId = n++;
        },
        setClockHand: function(t, i, n) {
            t = o(t), i = void 0 === i ? this.animated : i, i = !!this._radius && i;
            var r = this._currentAngle, s = e(r, t);
            if (o(s) === r) return this._setHandRotation(r, i);
            i && this._once("paper-clock-transition-end", function() {
                n && n();
            }.bind(this)), this.async(function() {
                this._setHandRotation(s, i);
            });
        },
        _performRotation: function(e, t) {
            if (this._animationFrame && window.cancelAnimationFrame(this._animationFrame), t) {
                var i = this._currentAngle, n = e - i, o = null, r = function(e) {
                    o || (o = e);
                    var t = e - o, s = Math.min(t / 150, 1);
                    this._currentAngle = i + this._applyAnimationEasing(s) * n, this._updateHandPositions(), 
                    1 === s ? (this._animationFrame = null, this.fire("paper-clock-transition-end")) : this._animationFrame = window.requestAnimationFrame(r);
                }.bind(this);
                this._animationFrame = window.requestAnimationFrame(r);
            } else this._currentAngle = e, this._updateHandPositions();
        },
        _applyAnimationEasing: function(e) {
            return Math.pow(e, 2);
        },
        _setHandRotation: function(e, t) {
            var i = e / 360 * this.count % this.step == 0;
            this.$.clockHand.classList[[ "remove", "add" ][+i]]("no-dot"), this._performRotation(e, t);
        },
        _selectedChanged: function(e) {
            if (this.count && !isNaN(e)) {
                var t = e % this.count;
                0 !== t || this.useZero || (t = this.count), t === this.selected ? (this._vibrate(), 
                this.setClockHand(360 / this.count * this.selected)) : this.selected = t;
            }
        },
        _stepChanged: function(e, t) {
            if (this._step = t, this.count && !isNaN(e)) {
                var i = Math.ceil(this.count / 12);
                e < i && (e = i), this._step = e;
            }
        },
        _populate: function() {
            delete this._resizedCache;
            var e, t, i = this.$.numbers;
            for (this.set("_numbers", []), this._stepChanged(this.step); i.firstChild; ) i.removeChild(i.firstChild);
            for (var n = [], o = 0; o < this.count; o++) e = o, null, 0 !== o || this.useZero || (e = this.count), 
            (t = {
                index: o,
                value: e,
                display: e % this._step == 0,
                x: 0,
                y: 0,
                label: this._formatNumber(e)
            }).dom = this._createNumberElement(t), n.push(t), i.appendChild(t.dom.g);
            this.set("_numbers", n), this._positionClockPoints(), this._updateHandPositions();
        },
        _updateNumber: function(e) {
            var t = e.dom;
            t && e.x && e.y && t.text && (t.text.setAttributeNS(null, "x", e.x), t.text.setAttributeNS(null, "y", e.y), 
            t.text.textContent = this._formatNumber(e.value), t.textClipped.setAttributeNS(null, "x", e.x), 
            t.textClipped.setAttributeNS(null, "y", e.y), t.textClipped.textContent = this._formatNumber(e.value));
        },
        _createNumberElement: function(e) {
            function i(e, i) {
                var n = document.createElementNS(t, e);
                return i && i.forEach(function(e) {
                    n.classList.add(e);
                }), Polymer.Settings.useNativeShadow || (n.classList.add("style-scope"), n.classList.add("paper-clock-selector")), 
                n;
            }
            var n = i("g", [ "number" ]), o = null, r = null;
            return e.display && ((o = i("text")).textContent = e.label, n.appendChild(o), (r = i("text", [ "clipped" ])).textContent = e.label, 
            r.setAttribute("clip-path", "url(#handClip" + this._instanceId + ")"), n.appendChild(r)), 
            {
                g: n,
                text: o,
                textClipped: r
            };
        },
        _updateSize: function() {
            var e = Math.min(this.offsetWidth, this.offsetHeight) / 2;
            this._radius = e, this._selectorSize = 20, this._selectorDotSize = 3, this._padding = 2, 
            this._positionClockPoints(), this._resizedCache = this._radius, this.$.clock.style.width = 2 * e + "px", 
            this.$.clock.style.height = 2 * e + "px", this._updateHandPositions(), this.async(function() {
                this._bounds = this.$.face.getBoundingClientRect(), this._bounds = {
                    top: this._bounds.top + window.pageYOffset,
                    right: this._bounds.right + window.pageXOffset,
                    bottom: this._bounds.bottom + window.pageYOffset,
                    left: this._bounds.left + window.pageXOffset,
                    width: this._bounds.width
                };
            }.bind(this), 150);
        },
        _positionClockPoints: function() {
            if (this._radius) {
                this._selectorOuter = this._radius - 2 * this._padding, this._selectorInner = this._selectorOuter - 2 * this._selectorSize, 
                this._selectorCenter = this._selectorOuter - this._selectorSize;
                for (var e, t, n = this._numbers, o = 360 / this.count * i, r = 0; r < this.count; r++) e = o * r, 
                (t = n[r]).x = this._radius + Math.sin(e) * this._selectorCenter, t.y = this._radius - Math.cos(e) * this._selectorCenter, 
                this._updateNumber(t);
            }
        },
        _notifyNumberChanged: function(e) {
            for (var t, i = [ "x", "y" ], n = 0; n < i.length; n++) t = e + "." + i[n], this.get(t) && this.notifyPath(t, this.get(t));
        },
        _getSelectArea: function(e, t, i) {
            return "\nM " + (e - t) + " " + e + "\nA " + t + " " + t + " 0 0 0 " + (e + t) + " " + e + "\nA " + t + " " + t + " 0 0 0 " + (e - t) + " " + e + "\nM " + (e - i) + " " + e + "\nA " + i + " " + i + " 0 0 1 " + (e + i) + " " + e + "\nA " + i + " " + i + " 0 0 1 " + (e - i) + " " + e;
        },
        _onTouch: function(e) {
            var t = e.detail.x + window.pageXOffset - this._bounds.left - this._radius, n = e.detail.y + window.pageYOffset - this._bounds.top - this._radius, o = Math.abs(Math.sqrt(Math.pow(t, 2) + Math.pow(n, 2)));
            if (!(o < this._selectorInner || o > this._selectorOuter)) {
                this.animated = "track" !== e.type;
                var r = Math.atan(n / t);
                r = Math.PI / 2 + (t < 0 ? r + Math.PI : r);
                var s = 360 / this.count * i;
                this.selected = Math.round(r / s), "tap" !== e.type && "end" !== e.detail.state || this.fire("paper-clock-selected", {
                    value: this.selected,
                    animated: this.animated
                });
            }
        },
        _formatNumber: function(e) {
            return this.zeroPad ? ("0" + e).substr(-2) : e.toString();
        },
        _getNumberClass: function(e, t, i) {
            var n = e;
            return i.value === t.value && (n += " selected"), n;
        },
        _vibrate: function() {
            this.debounce("vibrate", function() {
                navigator.vibrate && navigator.vibrate(10);
            });
        },
        _zeroPadChanged: function() {
            this._numbers.forEach(function(e) {
                this._updateNumber(e);
            }.bind(this));
        },
        _once: function(e, t, i) {
            function n() {
                i.removeEventListener(e, n), t.apply(null, arguments);
            }
            (i = i || this).addEventListener(e, n);
        },
        _updateHandPositions: function() {
            if (this._radius) {
                var e = this._currentAngle * i;
                this._handX = this._radius + Math.sin(e) * this._selectorCenter, this._handY = this._radius - Math.cos(e) * this._selectorCenter;
            }
        }
    });
}(), function() {
    function e() {
        window.console && console.warn.apply(console, arguments);
    }
    Polymer({
        is: "paper-time-picker",
        properties: {
            time: {
                type: String,
                value: "00:00",
                notify: !0,
                observer: "_timeChanged"
            },
            rawValue: {
                type: Number,
                value: 0,
                notify: !0,
                observer: "_rawValueChanged"
            },
            hour: {
                type: Number,
                observer: "_hourChanged",
                notify: !0,
                value: 0
            },
            hour12: {
                type: Number,
                notify: !0,
                observer: "_hour12Changed"
            },
            minute: {
                type: Number,
                notify: !0,
                observer: "_minuteChanged",
                value: 0
            },
            second: {
                type: Number,
                notify: !0,
                observer: "_secondChanged",
                value: 0
            },
            period: {
                type: String,
                notify: !0,
                observer: "_periodChanged",
                value: "AM"
            },
            view: {
                type: String,
                notify: !0,
                value: "hours",
                observer: "_viewChanged"
            },
            responsiveWidth: {
                type: String,
                value: "560px"
            },
            forceNarrow: {
                type: Boolean,
                value: !1
            },
            animated: {
                type: Boolean,
                value: !1
            },
            narrow: {
                type: Boolean,
                reflectToAttribute: !0,
                value: !1,
                notify: !0
            },
            isTouch: {
                type: Boolean,
                value: !1,
                reflectToAttribute: !0
            },
            enableSeconds: {
                type: Boolean,
                value: !1
            },
            _queryMatches: {
                type: Boolean,
                value: !1,
                observer: "_computeNarrow"
            }
        },
        behaviors: [ Polymer.IronResizableBehavior ],
        observers: [ "_updateTime(hour, minute, second)" ],
        listeners: {
            "iron-resize": "_resizeHandler",
            "paper-clock-selected": "_onClockSelected"
        },
        ready: function() {
            this.isTouch = "ontouchstart" in window, this.view = "hours";
        },
        _timeChanged: function(e) {
            if (e) {
                var t = this.parseTime(e), i = this.formatTime(t.hour, t.minute, t.second);
                if (i === e) {
                    var n = 60 * t.hour + t.minute;
                    this.enableSeconds && (n = 60 * n + t.second), this.rawValue = n;
                } else this.time = i;
            } else this.rawValue = 0;
        },
        _updateTime: function(e, t, i) {
            var n = 60 * e + t;
            this.enableSeconds && (n = 60 * n + i), this.rawValue = n;
        },
        formatTime: function(e, t, i) {
            var n = e % 24 < 12 ? "AM" : "PM";
            return e = e % 12 || 12, t = ("0" + t).substr(-2), i = ("0" + i).substr(-2), this.enableSeconds && (t += ":" + i), 
            e + ":" + t + " " + n;
        },
        parseTime: function(t) {
            var i = t.match(/^\s*(\d{1,2}):?(\d{2})(:?(\d{2}))?(\s*([AaPp])\.?[Mm]\.?|[A-Z])?\s*$/);
            if (i) {
                var n = parseInt(i[1]), o = parseInt(i[2]), r = i[4] ? parseInt(i[4]) : 0, s = i[6] ? i[6][0].toUpperCase() + "M" : "AM";
                return "PM" === s && n < 12 ? n = (n + 12) % 24 : "AM" === s && 12 === n && (n = 0), 
                {
                    hour: n,
                    minute: o,
                    second: r
                };
            }
            e("Invalid time:", t);
        },
        togglePeriod: function() {
            this.period = "AM" === this.period ? "PM" : "AM";
        },
        _rawValueChanged: function(e, t) {
            isNaN(parseInt(e)) ? this.rawValue = t : (this.enableSeconds ? (this.hour = Math.floor(e / 3600), 
            this.minute = Math.floor(e / 60) % 60, this.second = e % 60) : (this.hour = Math.floor(e / 60), 
            this.minute = e % 60, this.second = 0), this.time = this.formatTime(this.hour, this.minute, this.second));
        },
        _hour12Changed: function(e) {
            var t = "PM" === this.period ? 12 : 0;
            this.hour = (e % 12 + t) % 24;
        },
        _hourChanged: function(t, i) {
            if (t = parseInt(t), !isNaN(t) || t) {
                if (isNaN(t)) return e("Invalid number:", t), void (this.hour = i);
                t = parseFloat(t) % 24, this.hour = t, this.hour12 = this._twelveHour(t), this.period = [ "PM", "AM" ][+(t < 12)];
            }
        },
        _minuteChanged: function(e) {
            e = parseFloat(e) % 60, this.minute = e;
        },
        _secondChanged: function(e) {
            e = parseFloat(e) % 60, this.second = e;
        },
        _periodChanged: function(e) {
            isNaN(parseInt(this.hour)) || isNaN(parseInt(this.minute)) || ("AM" === e && this.hour >= 12 ? this.hour -= 12 : "PM" === e && this.hour < 12 && (this.hour += 12));
        },
        _zeroPad: function(e, t) {
            if (void 0 !== e && !isNaN(e) && !isNaN(t)) return ("0" + e).substr(-t);
        },
        _twelveHour: function(e) {
            return e % 12 || 12;
        },
        _isEqual: function(e, t) {
            return e === t;
        },
        _getMediaQuery: function(e, t) {
            return "(max-width: " + (e ? "" : t) + ")";
        },
        _computeNarrow: function() {
            this.set("narrow", this._queryMatches || this.forceNarrow);
        },
        _viewChanged: function(e, t) {
            if (this.$.pages._notifyPageResize(), !this._selecting && t && e && this.animated) {
                var i = {
                    hours: this.$.hourClock,
                    minutes: this.$.minuteClock,
                    seconds: this.$.secondClock
                }, n = i[t], o = i[e], r = 360 / n.count * n.selected, s = 360 / o.count * o.selected;
                o.setClockHand(r, !1), n.setClockHand(s), this.async(function() {
                    o.setClockHand(s, !0, function() {
                        this.async(function() {
                            n.setClockHand(r, !1);
                        }, 200);
                    }.bind(this));
                }.bind(this));
            }
        },
        _onClockSelected: function(e) {
            if ("hours" === this.view) {
                var t = function() {
                    this.async(function() {
                        this._selecting = !0, this.view = "minutes", this._selecting = !1;
                    }.bind(this), 100), this.$.hourClock.removeEventListener("paper-clock-transition-end", t);
                }.bind(this);
                e.detail.animated ? this.$.hourClock.addEventListener("paper-clock-transition-end", t) : t(), 
                this.hour12 !== e.detail.value ? this.hour12 = e.detail.value : t();
            } else if ("minutes" === this.view && this.enableSeconds) {
                var i = function() {
                    this.async(function() {
                        this._selecting = !0, this.view = "seconds", this._selecting = !1;
                    }.bind(this), 100), this.$.minuteClock.removeEventListener("paper-clock-transition-end", i);
                }.bind(this);
                e.detail.animated ? this.$.minuteClock.addEventListener("paper-clock-transition-end", i) : i(), 
                this.minute !== e.detail.value ? this.minute = e.detail.value : i();
            }
        },
        _resizeHandler: function() {
            this.offsetWidth && !this._resizing && (this.updateStyles(), this.async(function() {
                this._resizing = !0, this.$.pages._notifyPageResize(), this._resizing = !1;
            }.bind(this)));
        }
    });
}(), /*
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, o) {
            Chrome && Chrome.Log && o && Chrome.Log.exception(o, null, !0);
        });
    };
}), new ExceptionHandler(), Polymer({
    is: "setting-time",
    behaviors: [ Chrome.LocalizeBehavior ],
    properties: {
        name: {
            type: String,
            value: "store"
        },
        value: {
            type: String,
            value: "00:00",
            observer: "_valueChanged"
        },
        timeLabel: {
            type: String,
            value: "12:00 AM"
        },
        format: {
            type: Number,
            value: 1,
            notify: !0,
            observer: "_formatChanged"
        },
        mainLabel: {
            type: String,
            value: ""
        },
        secondaryLabel: {
            type: String,
            value: ""
        },
        sectionTitle: {
            type: String,
            value: ""
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        noseparator: {
            type: Boolean,
            value: !1
        }
    },
    _onTap: function() {
        this.disabled || this.$.dialog.open();
    },
    _onTimeSelected: function() {
        const e = this.$.timePicker, t = `${("0" + e.hour).substr(-2)}:${("0" + e.minute).substr(-2)}`;
        this.set("value", t), Chrome.GA.event(Chrome.GA.EVENT.BUTTON, `SettingTime.OK: ${this.name}`);
    },
    _valueChanged: function(e) {
        this._setTimeLabel(e);
    },
    _formatChanged: function() {
        this._setTimeLabel(this.get("value"));
    },
    _formatTime: function(e) {
        let t = "12:00 AM";
        return e ? t = Chrome.Time.getStringFull(e, this.format) : Chrome.Log.error("timeString is null", "setting-time._formatTime"), 
        t;
    },
    _setTimeLabel: function(e) {
        this.set("timeLabel", this._formatTime(e));
    },
    _init: function() {
        this.set("value", "00:00");
    }
}), new ExceptionHandler(), Polymer({
    is: "slide-animatable",
    behaviors: [ Polymer.NeonAnimatableBehavior ],
    properties: {
        animationConfig: {
            type: Object,
            value: function() {
                return {
                    entry: {
                        name: "fade-in-animation",
                        node: this,
                        timing: {
                            duration: 2e3,
                            easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                        }
                    },
                    exit: {
                        name: "fade-out-animation",
                        node: this,
                        timing: {
                            duration: 2e3,
                            easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)"
                        }
                    }
                };
            }
        },
        aniType: {
            type: Number,
            observer: "_aniChanged"
        }
    },
    _aniChanged: function(e) {
        let t, i, n = 2e3;
        switch (e) {
          case 0:
            t = "scale-up-animation", i = "scale-down-animation";
            break;

          case 1:
            t = "fade-in-animation", i = "fade-out-animation";
            break;

          case 2:
            t = "slide-from-right-animation", i = "slide-left-animation";
            break;

          case 3:
            t = "slide-from-top-animation", i = "slide-up-animation";
            break;

          case 4:
            t = "spin-up-animation", i = "spin-down-animation", n = 3e3;
            break;

          case 5:
            t = "slide-from-bottom-animation", i = "slide-down-animation";
            break;

          case 6:
            t = "slide-from-bottom-animation", i = "slide-up-animation";
            break;

          case 7:
            t = "slide-from-left-animation", i = "slide-left-animation";
            break;

          default:
            t = "fade-in-animation", i = "fade-out-animation";
        }
        this.animationConfig.entry.name = t, this.animationConfig.entry.timing.duration = n, 
        this.animationConfig.exit.name = i, this.animationConfig.exit.timing.duration = n;
    }
}), new ExceptionHandler(), Polymer({
    is: "spin-up-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        const t = e.node;
        return e.transformOrigin && this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin), 
        this._effect = new KeyframeEffect(t, [ {
            transform: "scale(0) rotate(0)"
        }, {
            transform: "scale(1) rotate(1.0turn)"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), new ExceptionHandler(), Polymer({
    is: "spin-down-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        const t = e.node;
        return e.transformOrigin && this.setPrefixedProperty(t, "transformOrigin", e.transformOrigin), 
        this._effect = new KeyframeEffect(t, [ {
            transform: "scale(1) rotate(1.0turn)"
        }, {
            transform: "scale(0) rotate(0)"
        } ], this.timingFromConfig(e)), this._effect;
    }
}), Polymer({
    is: "iron-pages",
    behaviors: [ Polymer.IronResizableBehavior, Polymer.IronSelectableBehavior ],
    properties: {
        activateEvent: {
            type: String,
            value: null
        }
    },
    observers: [ "_selectedPageChanged(selected)" ],
    _selectedPageChanged: function(e, t) {
        this.async(this.notifyResize);
    }
}), Polymer({
    is: "paper-tab",
    behaviors: [ Polymer.IronControlState, Polymer.IronButtonState, Polymer.PaperRippleBehavior ],
    properties: {
        link: {
            type: Boolean,
            value: !1,
            reflectToAttribute: !0
        }
    },
    hostAttributes: {
        role: "tab"
    },
    listeners: {
        down: "_updateNoink",
        tap: "_onTap"
    },
    attached: function() {
        this._updateNoink();
    },
    get _parentNoink() {
        var e = Polymer.dom(this).parentNode;
        return !!e && !!e.noink;
    },
    _updateNoink: function() {
        this.noink = !!this.noink || !!this._parentNoink;
    },
    _onTap: function(e) {
        if (this.link) {
            var t = this.queryEffectiveChildren("a");
            if (!t) return;
            if (e.target === t) return;
            t.click();
        }
    }
}), Polymer.IronMenubarBehaviorImpl = {
    hostAttributes: {
        role: "menubar"
    },
    keyBindings: {
        left: "_onLeftKey",
        right: "_onRightKey"
    },
    _onUpKey: function(e) {
        this.focusedItem.click(), e.detail.keyboardEvent.preventDefault();
    },
    _onDownKey: function(e) {
        this.focusedItem.click(), e.detail.keyboardEvent.preventDefault();
    },
    get _isRTL() {
        return "rtl" === window.getComputedStyle(this).direction;
    },
    _onLeftKey: function(e) {
        this._isRTL ? this._focusNext() : this._focusPrevious(), e.detail.keyboardEvent.preventDefault();
    },
    _onRightKey: function(e) {
        this._isRTL ? this._focusPrevious() : this._focusNext(), e.detail.keyboardEvent.preventDefault();
    },
    _onKeydown: function(e) {
        this.keyboardEventMatchesKeys(e, "up down left right esc") || this._focusWithKeyboardEvent(e);
    }
}, Polymer.IronMenubarBehavior = [ Polymer.IronMenuBehavior, Polymer.IronMenubarBehaviorImpl ], 
Polymer({
    is: "paper-tabs",
    behaviors: [ Polymer.IronResizableBehavior, Polymer.IronMenubarBehavior ],
    properties: {
        noink: {
            type: Boolean,
            value: !1,
            observer: "_noinkChanged"
        },
        noBar: {
            type: Boolean,
            value: !1
        },
        noSlide: {
            type: Boolean,
            value: !1
        },
        scrollable: {
            type: Boolean,
            value: !1
        },
        fitContainer: {
            type: Boolean,
            value: !1
        },
        disableDrag: {
            type: Boolean,
            value: !1
        },
        hideScrollButtons: {
            type: Boolean,
            value: !1
        },
        alignBottom: {
            type: Boolean,
            value: !1
        },
        selectable: {
            type: String,
            value: "paper-tab"
        },
        autoselect: {
            type: Boolean,
            value: !1
        },
        autoselectDelay: {
            type: Number,
            value: 0
        },
        _step: {
            type: Number,
            value: 10
        },
        _holdDelay: {
            type: Number,
            value: 1
        },
        _leftHidden: {
            type: Boolean,
            value: !1
        },
        _rightHidden: {
            type: Boolean,
            value: !1
        },
        _previousTab: {
            type: Object
        }
    },
    hostAttributes: {
        role: "tablist"
    },
    listeners: {
        "iron-resize": "_onTabSizingChanged",
        "iron-items-changed": "_onTabSizingChanged",
        "iron-select": "_onIronSelect",
        "iron-deselect": "_onIronDeselect"
    },
    keyBindings: {
        "left:keyup right:keyup": "_onArrowKeyup"
    },
    created: function() {
        this._holdJob = null, this._pendingActivationItem = void 0, this._pendingActivationTimeout = void 0, 
        this._bindDelayedActivationHandler = this._delayedActivationHandler.bind(this), 
        this.addEventListener("blur", this._onBlurCapture.bind(this), !0);
    },
    ready: function() {
        this.setScrollDirection("y", this.$.tabsContainer);
    },
    detached: function() {
        this._cancelPendingActivation();
    },
    _noinkChanged: function(e) {
        Polymer.dom(this).querySelectorAll("paper-tab").forEach(e ? this._setNoinkAttribute : this._removeNoinkAttribute);
    },
    _setNoinkAttribute: function(e) {
        e.setAttribute("noink", "");
    },
    _removeNoinkAttribute: function(e) {
        e.removeAttribute("noink");
    },
    _computeScrollButtonClass: function(e, t, i) {
        return !t || i ? "hidden" : e ? "not-visible" : "";
    },
    _computeTabsContentClass: function(e, t) {
        return e ? "scrollable" + (t ? " fit-container" : "") : " fit-container";
    },
    _computeSelectionBarClass: function(e, t) {
        return e ? "hidden" : t ? "align-bottom" : "";
    },
    _onTabSizingChanged: function() {
        this.debounce("_onTabSizingChanged", function() {
            this._scroll(), this._tabChanged(this.selectedItem);
        }, 10);
    },
    _onIronSelect: function(e) {
        this._tabChanged(e.detail.item, this._previousTab), this._previousTab = e.detail.item, 
        this.cancelDebouncer("tab-changed");
    },
    _onIronDeselect: function(e) {
        this.debounce("tab-changed", function() {
            this._tabChanged(null, this._previousTab), this._previousTab = null;
        }, 1);
    },
    _activateHandler: function() {
        this._cancelPendingActivation(), Polymer.IronMenuBehaviorImpl._activateHandler.apply(this, arguments);
    },
    _scheduleActivation: function(e, t) {
        this._pendingActivationItem = e, this._pendingActivationTimeout = this.async(this._bindDelayedActivationHandler, t);
    },
    _delayedActivationHandler: function() {
        var e = this._pendingActivationItem;
        this._pendingActivationItem = void 0, this._pendingActivationTimeout = void 0, e.fire(this.activateEvent, null, {
            bubbles: !0,
            cancelable: !0
        });
    },
    _cancelPendingActivation: function() {
        void 0 !== this._pendingActivationTimeout && (this.cancelAsync(this._pendingActivationTimeout), 
        this._pendingActivationItem = void 0, this._pendingActivationTimeout = void 0);
    },
    _onArrowKeyup: function(e) {
        this.autoselect && this._scheduleActivation(this.focusedItem, this.autoselectDelay);
    },
    _onBlurCapture: function(e) {
        e.target === this._pendingActivationItem && this._cancelPendingActivation();
    },
    get _tabContainerScrollSize() {
        return Math.max(0, this.$.tabsContainer.scrollWidth - this.$.tabsContainer.offsetWidth);
    },
    _scroll: function(e, t) {
        if (this.scrollable) {
            var i = t && -t.ddx || 0;
            this._affectScroll(i);
        }
    },
    _down: function(e) {
        this.async(function() {
            this._defaultFocusAsync && (this.cancelAsync(this._defaultFocusAsync), this._defaultFocusAsync = null);
        }, 1);
    },
    _affectScroll: function(e) {
        this.$.tabsContainer.scrollLeft += e;
        var t = this.$.tabsContainer.scrollLeft;
        this._leftHidden = 0 === t, this._rightHidden = t === this._tabContainerScrollSize;
    },
    _onLeftScrollButtonDown: function() {
        this._scrollToLeft(), this._holdJob = setInterval(this._scrollToLeft.bind(this), this._holdDelay);
    },
    _onRightScrollButtonDown: function() {
        this._scrollToRight(), this._holdJob = setInterval(this._scrollToRight.bind(this), this._holdDelay);
    },
    _onScrollButtonUp: function() {
        clearInterval(this._holdJob), this._holdJob = null;
    },
    _scrollToLeft: function() {
        this._affectScroll(-this._step);
    },
    _scrollToRight: function() {
        this._affectScroll(this._step);
    },
    _tabChanged: function(e, t) {
        if (!e) return this.$.selectionBar.classList.remove("expand"), this.$.selectionBar.classList.remove("contract"), 
        void this._positionBar(0, 0);
        var i = this.$.tabsContent.getBoundingClientRect(), n = i.width, o = e.getBoundingClientRect(), r = o.left - i.left;
        if (this._pos = {
            width: this._calcPercent(o.width, n),
            left: this._calcPercent(r, n)
        }, this.noSlide || null == t) return this.$.selectionBar.classList.remove("expand"), 
        this.$.selectionBar.classList.remove("contract"), void this._positionBar(this._pos.width, this._pos.left);
        var s = t.getBoundingClientRect(), a = this.items.indexOf(t), l = this.items.indexOf(e);
        this.$.selectionBar.classList.add("expand");
        var h = a < l;
        this._isRTL && (h = !h), h ? this._positionBar(this._calcPercent(o.left + o.width - s.left, n) - 5, this._left) : this._positionBar(this._calcPercent(s.left + s.width - o.left, n) - 5, this._calcPercent(r, n) + 5), 
        this.scrollable && this._scrollToSelectedIfNeeded(o.width, r);
    },
    _scrollToSelectedIfNeeded: function(e, t) {
        var i = t - this.$.tabsContainer.scrollLeft;
        i < 0 ? this.$.tabsContainer.scrollLeft += i : (i += e - this.$.tabsContainer.offsetWidth) > 0 && (this.$.tabsContainer.scrollLeft += i);
    },
    _calcPercent: function(e, t) {
        return 100 * e / t;
    },
    _positionBar: function(e, t) {
        e = e || 0, t = t || 0, this._width = e, this._left = t, this.transform("translateX(" + t + "%) scaleX(" + e / 100 + ")", this.$.selectionBar);
    },
    _onBarTransitionEnd: function(e) {
        var t = this.$.selectionBar.classList;
        t.contains("expand") ? (t.remove("expand"), t.add("contract"), this._positionBar(this._pos.width, this._pos.left)) : t.contains("contract") && t.remove("contract");
    }
}), Polymer({
    is: "paper-tooltip",
    hostAttributes: {
        role: "tooltip",
        tabindex: -1
    },
    behaviors: [ Polymer.NeonAnimationRunnerBehavior ],
    properties: {
        for: {
            type: String,
            observer: "_findTarget"
        },
        manualMode: {
            type: Boolean,
            value: !1,
            observer: "_manualModeChanged"
        },
        position: {
            type: String,
            value: "bottom"
        },
        fitToVisibleBounds: {
            type: Boolean,
            value: !1
        },
        offset: {
            type: Number,
            value: 14
        },
        marginTop: {
            type: Number,
            value: 14
        },
        animationDelay: {
            type: Number,
            value: 500
        },
        animationConfig: {
            type: Object,
            value: function() {
                return {
                    entry: [ {
                        name: "fade-in-animation",
                        node: this,
                        timing: {
                            delay: 0
                        }
                    } ],
                    exit: [ {
                        name: "fade-out-animation",
                        node: this
                    } ]
                };
            }
        },
        _showing: {
            type: Boolean,
            value: !1
        }
    },
    listeners: {
        "neon-animation-finish": "_onAnimationFinish"
    },
    get target() {
        var e = Polymer.dom(this).parentNode, t = Polymer.dom(this).getOwnerRoot();
        return this.for ? Polymer.dom(t).querySelector("#" + this.for) : e.nodeType == Node.DOCUMENT_FRAGMENT_NODE ? t.host : e;
    },
    attached: function() {
        this._findTarget();
    },
    detached: function() {
        this.manualMode || this._removeListeners();
    },
    show: function() {
        if (!this._showing) {
            if ("" === Polymer.dom(this).textContent.trim()) {
                for (var e = !0, t = Polymer.dom(this).getEffectiveChildNodes(), i = 0; i < t.length; i++) if ("" !== t[i].textContent.trim()) {
                    e = !1;
                    break;
                }
                if (e) return;
            }
            this.cancelAnimation(), this._showing = !0, this.toggleClass("hidden", !1, this.$.tooltip), 
            this.updatePosition(), this.animationConfig.entry[0].timing = this.animationConfig.entry[0].timing || {}, 
            this.animationConfig.entry[0].timing.delay = this.animationDelay, this._animationPlaying = !0, 
            this.playAnimation("entry");
        }
    },
    hide: function() {
   /*      if (this._showing) {
            if (this._animationPlaying) return this.cancelAnimation(), this._showing = !1, void this._onAnimationFinish();
            this._showing = !1, this._animationPlaying = !0, this.playAnimation("exit");
        } */
    },
    updatePosition: function() {
        if (this._target && this.offsetParent) {
            var e = this.offset;
            14 != this.marginTop && 14 == this.offset && (e = this.marginTop);
            var t, i, n = this.offsetParent.getBoundingClientRect(), o = this._target.getBoundingClientRect(), r = this.getBoundingClientRect(), s = (o.width - r.width) / 2, a = (o.height - r.height) / 2, l = o.left - n.left, h = o.top - n.top;
            switch (this.position) {
              case "top":
                t = l + s, i = h - r.height - e;
                break;

              case "bottom":
                t = l + s, i = h + o.height + e;
                break;

              case "left":
                t = l - r.width - e, i = h + a;
                break;

              case "right":
                t = l + o.width + e, i = h + a;
            }
            this.fitToVisibleBounds ? (n.left + t + r.width > window.innerWidth ? (this.style.right = "0px", 
            this.style.left = "auto") : (this.style.left = Math.max(0, t) + "px", this.style.right = "auto"), 
            n.top + i + r.height > window.innerHeight ? (this.style.bottom = n.height + "px", 
            this.style.top = "auto") : (this.style.top = Math.max(-n.top, i) + "px", this.style.bottom = "auto")) : (this.style.left = t + "px", 
            this.style.top = i + "px");
        }
    },
    _addListeners: function() {
        this._target && (this.listen(this._target, "mouseenter", "show"), this.listen(this._target, "focus", "show"), 
        this.listen(this._target, "mouseleave", "hide"), this.listen(this._target, "blur", "hide"), 
        this.listen(this._target, "tap", "hide")), this.listen(this, "mouseenter", "hide");
    },
    _findTarget: function() {
        this.manualMode || this._removeListeners(), this._target = this.target, this.manualMode || this._addListeners();
    },
    _manualModeChanged: function() {
        this.manualMode ? this._removeListeners() : this._addListeners();
    },
    _onAnimationFinish: function() {
        this._animationPlaying = !1, this._showing || this.toggleClass("hidden", !0, this.$.tooltip);
    },
    _removeListeners: function() {
        this._target && (this.unlisten(this._target, "mouseenter", "show"), this.unlisten(this._target, "focus", "show"), 
        this.unlisten(this._target, "mouseleave", "hide"), this.unlisten(this._target, "blur", "hide"), 
        this.unlisten(this._target, "tap", "hide")), this.unlisten(this, "mouseenter", "hide");
    }
}), new ExceptionHandler(), Polymer({
    is: "settings-page",
    behaviors: [ Chrome.LocalizeBehavior ],
    properties: {
        selectedTab: {
            type: Number,
            value: 0,
            notify: !0
        },
        enabled: {
            type: Boolean,
            value: !0,
            notify: !0
        },
        showTimeValue: {
            type: Number,
            value: 1,
            notify: !0
        },
        menuHidden: {
            type: Boolean,
            computed: "_computeMenuHidden(selectedTab)"
        }
    },
    ready: function() {
        this.set("selectedTab", 0);
    },
    deselectPhotoSource: function(e) {
        this._setPhotoSourceChecked(e, !1);
    },
    _selectAllTapped: function() {
        this._setPhotoSourcesChecked(!0);
    },
    _deselectAllTapped: function() {
        this._setPhotoSourcesChecked(!1);
    },
    _restoreDefaultsTapped: function() {
        Chrome.Msg.send(Chrome.Msg.RESTORE_DEFAULTS).catch(() => {});
    },
    _chromeBackgroundTapped() {
        const e = !Chrome.Storage.get("allowBackground"), t = app.Permissions.BACKGROUND, i = app.Permissions.isAllowed(t), n = Chrome.Locale.localize("err_optional_permissions");
        e && !i ? app.Permissions.request(t).catch(e => {
            Chrome.Log.error(e.message, "settings-page._chromeBackgroundTapped", n);
        }) : !e && i && app.Permissions.remove(t).catch(e => {
            Chrome.Log.error(e.message, "settings-page._chromeBackgroundTapped", n);
        });
    },
    _setPhotoSourceChecked: function(e, t) {
        const i = `[name=${e}]`, n = document.querySelector(i);
        n && !e.includes("useGoogle") && n.setChecked(t);
    },
    _setPhotoSourcesChecked: function(e) {
        app.PhotoSources.getUseKeys().forEach(t => {
            this._setPhotoSourceChecked(t, e);
        });
    },
    _computeMenuHidden: function(e) {
        return 2 !== e;
    },
    _getUnit: function(e, t, i, n, o) {
        return {
            name: Chrome.Locale.localize(e),
            min: t,
            max: i,
            step: n,
            mult: o
        };
    },
    _computeLargeTimeDisabled: function(e, t) {
        let i = !1;
        return e && 0 !== t || (i = !0), i;
    },
    _computeWaitTimeUnits: function() {
        return [ this._getUnit("minutes", 1, 60, 1, 1), this._getUnit("hours", 1, 24, 1, 60), this._getUnit("days", 1, 365, 1, 1440) ];
    },
    _computeTransitionTimeUnits: function() {
        return [ this._getUnit("seconds", 4, 60, 1, 1), this._getUnit("minutes", 1, 60, 1, 60), this._getUnit("hours", 1, 24, 1, 3600), this._getUnit("days", 1, 365, 1, 86400) ];
    },
    _computePhotoSizingMenu: function() {
        return [ Chrome.Locale.localize("menu_letterbox"), Chrome.Locale.localize("menu_zoom"), Chrome.Locale.localize("menu_frame"), Chrome.Locale.localize("menu_full"), Chrome.Locale.localize("menu_random") ];
    },
    _computePhotoTransitionMenu: function() {
        return [ Chrome.Locale.localize("menu_scale_up"), Chrome.Locale.localize("menu_fade"), Chrome.Locale.localize("menu_slide_from_right"), Chrome.Locale.localize("menu_slide_down"), Chrome.Locale.localize("menu_spin_up"), Chrome.Locale.localize("menu_slide_up"), Chrome.Locale.localize("menu_slide_from_bottom"), Chrome.Locale.localize("menu_slide_right"), Chrome.Locale.localize("menu_random") ];
    },
    _computeTimeFormatMenu: function() {
        return [ Chrome.Locale.localize("no"), Chrome.Locale.localize("menu_12_hour"), Chrome.Locale.localize("menu_24_hour") ];
    }
}), Polymer({
    is: "paper-checkbox",
    behaviors: [ Polymer.PaperCheckedElementBehavior ],
    hostAttributes: {
        role: "checkbox",
        "aria-checked": !1,
        tabindex: 0
    },
    properties: {
        ariaActiveAttribute: {
            type: String,
            value: "aria-checked"
        }
    },
    attached: function() {
        if ("-1px" === this.getComputedStyleValue("--calculated-paper-checkbox-ink-size").trim()) {
            var e = parseFloat(this.getComputedStyleValue("--calculated-paper-checkbox-size").trim()), t = Math.floor(8 / 3 * e);
            t % 2 != e % 2 && t++, this.customStyle["--paper-checkbox-ink-size"] = t + "px", 
            this.updateStyles();
        }
    },
    _computeCheckboxClass: function(e, t) {
        var i = "";
        return e && (i += "checked "), t && (i += "invalid"), i;
    },
    _computeCheckmarkClass: function(e) {
        return e ? "" : "hidden";
    },
    _createRipple: function() {
        return this._rippleContainer = this.$.checkboxContainer, Polymer.PaperInkyFocusBehaviorImpl._createRipple.call(this);
    }
}), function(e) {
    "use strict";
    new ExceptionHandler(), e.app = e.app || {}, app.ErrorPageFactory = Polymer({
        is: "error-page",
        behaviors: [ Chrome.LocalizeBehavior ],
        properties: {
            lastError: {
                type: Object,
                value: function() {
                    return new Chrome.Storage.LastError();
                },
                notify: !0
            }
        },
        ready: function() {
            Chrome.Storage.getLastError().then(e => (this.set("lastError", e), Promise.resolve())).catch(e => {
                Chrome.GA.error(e.message, "ErrorPage.ready");
            }), chrome.storage.onChanged.addListener(e => {
                for (const t in e) if (e.hasOwnProperty(t) && "lastError" === t) {
                    const i = e[t];
                    this.set("lastError", i.newValue);
                    break;
                }
            });
        },
        _onEmailTapped: function() {
            let e = app.Utils.getEmailBody();
            e = e + `${this.lastError.title}\n\n${this.lastError.message}\n\n` + `${this.lastError.stack}`, 
            e += "\n\nPlease provide any additional info. on what led to the error.\n\n";
            const t = app.Utils.getEmailUrl("Last Error", e);
            Chrome.GA.event(Chrome.GA.EVENT.ICON, "LastError email"), chrome.tabs.create({
                url: t
            });
        },
        _onRemoveTapped: function() {
            Chrome.Storage.clearLastError(), Chrome.GA.event(Chrome.GA.EVENT.ICON, "LastError delete");
        },
        _computeStack: function(e) {
            let t = "";
            return e.message && (t += e.stack), t;
        },
        _computeTitle: function(e) {
            let t = Chrome.Locale.localize("last_error_viewer_title");
            return e.message && (t += ` - ${e.title}`), t;
        }
    });
}(window), function(e) {
    "use strict";
    new ExceptionHandler(), e.app = e.app || {}, app.HelpPageFactory = Polymer({
        is: "help-page",
        behaviors: [ Chrome.LocalizeBehavior ],
        properties: {
            githubPath: {
                type: String,
                value: function() {
                    return app.Utils.getGithubPath();
                },
                readOnly: !0
            },
            githubPagesPath: {
                type: String,
                value: function() {
                    return app.Utils.getGithubPagesPath();
                },
                readOnly: !0
            }
        },
        _computeMailToUrl: function(e) {
            return app.Utils.getEmailUrl(e, app.Utils.getEmailBody());
        },
        _computeVersion: function() {
            const e = Chrome.Utils.getVersion();
            return encodeURIComponent(e);
        }
    });
}(window), Polymer.PaperSpinnerBehavior = {
    listeners: {
        animationend: "__reset",
        webkitAnimationEnd: "__reset"
    },
    properties: {
        active: {
            type: Boolean,
            value: !1,
            reflectToAttribute: !0,
            observer: "__activeChanged"
        },
        alt: {
            type: String,
            value: "loading",
            observer: "__altChanged"
        },
        __coolingDown: {
            type: Boolean,
            value: !1
        }
    },
    __computeContainerClasses: function(e, t) {
        return [ e || t ? "active" : "", t ? "cooldown" : "" ].join(" ");
    },
    __activeChanged: function(e, t) {
        this.__setAriaHidden(!e), this.__coolingDown = !e && t;
    },
    __altChanged: function(e) {
        e === this.getPropertyInfo("alt").value ? this.alt = this.getAttribute("aria-label") || e : (this.__setAriaHidden("" === e), 
        this.setAttribute("aria-label", e));
    },
    __setAriaHidden: function(e) {
        e ? this.setAttribute("aria-hidden", "true") : this.removeAttribute("aria-hidden");
    },
    __reset: function() {
        this.active = !1, this.__coolingDown = !1;
    }
}, Polymer({
    is: "paper-spinner",
    behaviors: [ Polymer.PaperSpinnerBehavior ]
}), new ExceptionHandler(), window.app = window.app || {}, app.GooglePhotosPage = Polymer({
    is: "google-photos-page",
    behaviors: [ Chrome.LocalizeBehavior ],
    properties: {
        isAlbumMode: {
            type: Boolean,
            value: !0,
            notify: !0
        },
        useGoogleAlbums: {
            type: Boolean,
            value: !0,
            notify: !0
        },
        useGooglePhotos: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        albums: {
            type: Array,
            notify: !0,
            value: []
        },
        selections: {
            type: Array,
            value: []
        },
        waitForLoad: {
            type: Boolean,
            value: !1,
            notify: !0
        },
        permPicasa: {
            type: String,
            value: "notSet",
            notify: !0
        },
        isHidden: {
            type: Boolean,
            computed: "_computeHidden(waitForLoad, permPicasa)"
        }
    },
    factoryImpl: function(e) {
        this.setAttribute("id", e);
    },
    ready: function() {
        Chrome.Storage.getBool("isAlbumMode") && this.loadAlbumList();
    },
    loadAlbumList: function() {
        const e = Chrome.Locale.localize("err_load_album_list");
        this._checkPermissions().then(e => {
            if (!e) {
                const e = new Error(Chrome.Locale.localize("err_auth_picasa"));
                return Promise.reject(e);
            }
            return this.set("waitForLoad", !0), app.GoogleSource.loadAlbumList();
        }).then(e => (this.splice("albums", 0, this.albums.length), (e = e || []).forEach(e => {
            this.push("albums", e);
        }), app.PhotoSources.process("useGoogleAlbums").catch(e => {
            Chrome.GA.error(e.message, "GooglePhotosPage.loadAlbumList");
        }), this._selectAlbums(), this.set("waitForLoad", !1), Promise.resolve())).catch(t => {
            this.set("waitForLoad", !1), Chrome.Log.error(t.message, "GooglePhotosPage.loadAlbumList", e), 
            this.$.dialogTitle.innerHTML = Chrome.Locale.localize("err_request_failed"), this.$.dialogText.innerHTML = t.message, 
            this.$.errorDialog.open();
        });
    },
    _checkPermissions: function() {
        return app.Permissions.isAllowed(app.Permissions.PICASA) ? Promise.resolve(!0) : app.Permissions.request(app.Permissions.PICASA).then(e => Promise.resolve(e));
    },
    _setUseKeys: function(e, t) {
        const i = e && t, n = e && !t;
        this.set("useGoogleAlbums", i), this.set("useGooglePhotos", n);
    },
    _onModeTapped: function() {
        this.set("isAlbumMode", !this.isAlbumMode), this._setUseKeys(this.$.googlePhotosToggle.checked, this.isAlbumMode), 
        this.isAlbumMode ? this.loadAlbumList() : (this.albums.splice(0, this.albums.length), 
        this.selections.splice(0, this.selections.length));
    },
    _onRefreshTapped: function() {
        Chrome.GA.event(Chrome.GA.EVENT.ICON, "refreshGoogleAlbums"), this.loadAlbumList();
    },
    _onSelectAllTapped: function() {
        Chrome.GA.event(Chrome.GA.EVENT.ICON, "selectAllGoogleAlbums");
        for (let e = 0; e < this.albums.length; e++) {
            const t = this.albums[e];
            if (!t.checked) {
                if (this.selections.push({
                    id: t.id,
                    photos: t.photos
                }), !Chrome.Storage.safeSet("albumSelections", this.selections, "useGoogleAlbums")) {
                    this.selections.pop(), this._showStorageErrorDialog("GooglePhotosPage._onSelectAllTapped");
                    break;
                }
                this.set("albums." + e + ".checked", !0);
            }
        }
    },
    _onDeselectAllTapped: function() {
        Chrome.GA.event(Chrome.GA.EVENT.ICON, "deselectAllGoogleAlbums"), this._uncheckAll(), 
        this.selections.splice(0, this.selections.length), Chrome.Storage.set("albumSelections", null);
    },
    _onAlbumSelectChanged: function(e) {
        const t = e.model.album;
        if (Chrome.GA.event(Chrome.GA.EVENT.CHECK, `selectGoogleAlbum: ${t.checked}`), t.checked) this.selections.push({
            id: t.id,
            photos: t.photos
        }); else {
            const e = this.selections.findIndex(e => e.id === t.id);
            -1 !== e && this.selections.splice(e, 1);
        }
        Chrome.Storage.safeSet("albumSelections", this.selections, "useGoogleAlbums") || (this.selections.pop(), 
        this.set("albums." + t.index + ".checked", !1), this._showStorageErrorDialog("GooglePhotosPage._onAlbumSelectChanged"));
    },
    _onUseGoogleChanged: function() {
        const e = this.$.googlePhotosToggle.checked;
        this._setUseKeys(e, this.isAlbumMode), Chrome.GA.event(Chrome.GA.EVENT.TOGGLE, `useGoogle: ${e}`);
    },
    _showStorageErrorDialog: function(e) {
        const t = Chrome.Locale.localize("err_storage_title");
        Chrome.Log.error("safeSet failed", e, t), this.$.dialogTitle.innerHTML = t, this.$.dialogText.innerHTML = Chrome.Locale.localize("err_storage_desc"), 
        this.$.errorDialog.open();
    },
    _selectAlbums: function() {
        this.set("selections", Chrome.Storage.get("albumSelections", []));
        for (let e = 0; e < this.albums.length; e++) for (let t = 0; t < this.selections.length; t++) if (this.albums[e].id === this.selections[t].id) {
            this.set("albums." + e + ".checked", !0);
            break;
        }
    },
    _uncheckAll: function() {
        this.albums.forEach((e, t) => {
            e.checked && this.set("albums." + t + ".checked", !1);
        });
    },
    _computeHidden: function(e, t) {
        let i = !0;
        return e || "allowed" !== t || (i = !1), i;
    },
    _computeTitle: function(e) {
        let t = "";
        return t = e ? Chrome.Locale.localize("google_title") : Chrome.Locale.localize("google_title_photos");
    },
    _computeModeIcon: function(e) {
        let t = "";
        return t = e ? "myicons:photo-album" : "myicons:photo";
    },
    _computeModeTooltip: function(e) {
        let t = "";
        return t = e ? Chrome.Locale.localize("tooltip_google_mode_albums") : Chrome.Locale.localize("tooltip_google_mode_photos");
    },
    _computeAlbumIconDisabled: (e, t) => !(e && t),
    _computePhotoLabel: function(e) {
        let t = `${e} ${Chrome.Locale.localize("photos")}`;
        return 1 === e && (t = `${e} ${Chrome.Locale.localize("photo")}`), t;
    },
    _initPermPicasa: function() {
        this.set("permPicasa", "notSet");
    },
    _initIsAlbumMode: function() {
        this.set("isAlbumMode", !0);
    },
    _initUseGoogleAlbums: function() {
        this.set("useGoogleAlbums", !0);
    },
    _initUseGooglePhotos: function() {
        this.set("useGooglePhotos", !0);
    }
});