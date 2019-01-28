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
    function t(r) {
        function o(e, t) {
            return function() {
                const n = i.call(arguments);
                return new l(function(r, o) {
                    n.push(function() {
                        const e = c.lastError, t = i.call(arguments);
                        if (e) o(e); else switch (t.length) {
                          case 0:
                            r();
                            break;

                          case 1:
                            r(t[0]);
                            break;

                          default:
                            r(t);
                        }
                    }), e.apply(t, n);
                });
            };
        }
        function s(e, i) {
            for (let r in e) if (n.call(e, r)) {
                const n = e[r], a = typeof n;
                "object" !== a || n instanceof t ? i[r] = "function" === a ? o(n, e) : n : (i[r] = {}, 
                s(n, i[r]));
            }
        }
        const a = (r = r || {}).chrome || e.chrome, l = r.Promise || e.Promise, c = a.runtime;
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, r) {
            Chrome && Chrome.Log && r && Chrome.Log.exception(r, null, !0);
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
        !function(e, t, i, n, r, o, s) {
            e.GoogleAnalyticsObject = r, e.ga = e.ga || function() {
                (e.ga.q = e.ga.q || []).push(arguments);
            }, e.ga.l = 1 * new Date(), o = t.createElement(i), s = t.getElementsByTagName(i)[0], 
            o.async = 1, o.src = "https://www.google-analytics.com/analytics.js", s.parentNode.insertBefore(o, s);
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
                const r = {
                    hitType: "exception",
                    exDescription: n,
                    exFatal: i
                };
                Chrome.Utils.DEBUG ? console.error(r) : ga("send", r);
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
            const r = Chrome.Storage.get(e);
            try {
                Chrome.Storage.set(e, t);
            } catch (t) {
                n = !1, r && Chrome.Storage.set(e, r), i && (r && r.length ? Chrome.Storage.set(i, !0) : Chrome.Storage.set(i, !1)), 
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
        const i = Date.now(), n = Chrome.Time.getTime(e), r = Chrome.Time.getTime(t);
        let o = !1;
        return e === t ? o = !0 : r > n ? i >= n && i <= r && (o = !0) : (i >= n || i <= r) && (o = !0), 
        o;
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
        const r = [];
        void 0 !== navigator.language && r.push(navigator.language), r.push("en-US");
        const o = {
            hour: "numeric",
            minute: "2-digit",
            hour12: !e._is24Hr(t)
        };
        try {
            n = i.toLocaleTimeString(r, o);
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
    function e(e, i, o, s, a) {
        if (e.ok) return e.json();
        if (a >= s.maxRetries) return Promise.reject(t(e));
        const l = e.status;
        return s.backoff && l >= 500 && l < 600 ? n(i, o, s, a) : s.isAuth && s.token && s.retryToken && 401 === l ? r(i, o, s, a) : s.isAuth && s.interactive && s.token && s.retryToken && 403 === l ? r(i, o, s, a) : Promise.reject(t(e));
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
        return n++, new Promise((r, s) => {
            const a = (Math.pow(2, n) - 1) * c;
            setTimeout(() => o(e, t, i, n).then(r, s), a);
        });
    }
    function r(e, t, i, n) {
        return Chrome.GA.error("Refreshed auth token.", "Http._retryToken"), Chrome.Auth.removeCachedToken(i.token).then(() => (i.token = null, 
        i.retryToken = !1, o(e, t, i, n)));
    }
    function o(t, n, r, o) {
        return i(r.isAuth, r.interactive).then(e => (r.isAuth && (r.token = e, n.headers.set(a, `${l} ${r.token}`)), 
        fetch(t, n))).then(i => e(i, t, n, r, o)).catch(e => {
            let t = e.message;
            return "Failed to fetch" === t && (void 0 !== (t = Chrome.Locale.localize("err_network")) && "" !== t || (t = "Network error")), 
            Promise.reject(new Error(t));
        });
    }
    function s(e, t, i) {
        (i = null === i ? h : i).isAuth && t.headers.set(a, `${l} unknown`);
        return o(e, t, i, 0);
    }
    new ExceptionHandler();
    const a = "Authorization", l = "Bearer", c = 1e3, h = {
        isAuth: !1,
        retryToken: !1,
        interactive: !1,
        token: null,
        backoff: !0,
        maxRetries: 4
    };
    return {
        conf: h,
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
        constructor(e, t, i, n, r, o, s = null) {
            this._useKey = e, this._photosKey = t, this._type = i, this._desc = n, this._isDaily = r, 
            this._isArray = o, this._loadArg = s;
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
        static addPhoto(e, t, i, n, r, o) {
            const s = {
                url: t,
                author: i,
                asp: n.toPrecision(3)
            };
            r && (s.ex = r), o && (s.point = o), e.push(s);
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
        constructor(e, t, i, n, r, o, s = null) {
            super(e, t, i, n, r, o, s);
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
        constructor(e, t, i, n, r, o, s = null) {
            super(e, t, i, n, r, o, s);
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
            let i, n = 1, r = 1;
            for (const o of e) {
                const e = o.data;
                if (!e.over_18) if (e.preview && e.preview.images) {
                    let t = e.preview.images[0];
                    i = t.source.url, n = parseInt(t.source.width, 10), r = parseInt(t.source.height, 10), 
                    Math.max(n, r) > 3500 && (i = (t = t.resolutions[t.resolutions.length - 1]).url.replace(/&amp;/g, "&"), 
                    n = parseInt(t.width, 10), r = parseInt(t.height, 10));
                } else if (e.title) {
                    const t = app.RedditSource._getSize(e.title);
                    i = e.url, n = t.width, r = t.height;
                }
                const s = n / r, a = e.author;
                s && !isNaN(s) && Math.max(n, r) >= 750 && Math.max(n, r) <= 3500 && app.PhotoSource.addPhoto(t, i, a, s, e.url);
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
        constructor(e, t, i, n, r, o, s = null) {
            super(e, t, i, n, r, o, s);
        }
        static _processPhotos(e) {
            if (!e.photos || !e.photos.photo) {
                const e = new Error(Chrome.Locale.localize("err_photo_source_title"));
                return Promise.reject(e);
            }
            const t = [];
            for (const i of e.photos.photo) {
                let e, n, r = null;
                if (i && "photo" === i.media && "0" !== i.isfriend && "0" !== i.isfamily && (r = i.url_k || r, 
                r = i.url_o || r)) {
                    i.url_o ? (e = parseInt(i.width_o, 10), n = parseInt(i.height_o, 10)) : (e = parseInt(i.width_k, 10), 
                    n = parseInt(i.height_k, 10));
                    const o = e / n;
                    let s = null;
                    i.latitude && i.longitude && (s = app.PhotoSource.createPoint(i.latitude, i.longitude)), 
                    app.PhotoSource.addPhoto(t, r, i.ownername, o, i.owner, s);
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
        constructor(e, t, i, n, r, o, s = null) {
            super(e, t, i, n, r, o, s);
        }
        static _doGet(e) {
            return Chrome.Http.doGet(e).then(e => {
                if (e.error) return Promise.reject(new Error(e.error));
                const t = [];
                for (const i of e.photos) if (!i.nsfw) {
                    const e = i.width / i.height;
                    let n = null, r = null;
                    i.latitude && i.longitude && (r = app.PhotoSource.createPoint(i.latitude, i.longitude), 
                    n = {}), app.PhotoSource.addPhoto(t, i.images[0].url, i.user.fullname, e, n, r);
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
        constructor(e, t, i, n, r, o, s = null) {
            super(e, t, i, n, r, o, s);
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
                    const i = e.media$group.media$content[0].url, n = e.media$group.media$content[0].width / e.media$group.media$content[0].height, r = e.media$group.media$credit[0].$t;
                    let o;
                    app.GoogleSource._hasGeo(e) && (o = e.georss$where.gml$Point.gml$pos.$t), app.PhotoSource.addPhoto(t, i, r, n, {}, o);
                }
            }
            return t;
        }
        static _loadAlbum(t, i = "default") {
            const n = app.GoogleSource._getMaxImageSize(), r = `${e}${i}/albumid/${t}/${`?imgmax=${n}&thumbsize=72&fields=title,gphoto:id,entry(media:group/media:content,media:group/media:credit,media:group/media:thumbnail,georss:where)&v=2&alt=json`}`;
            if ("default" === i) {
                const e = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
                return e.isAuth = !0, Chrome.Http.doGet(r, e).catch(e => {
                    const t = `${Chrome.Locale.localize("err_status")}: 404`;
                    return e.message.includes(t) ? Promise.resolve(null) : Promise.reject(e);
                });
            }
            return Chrome.Http.doGet(r);
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
                        const r = app.GoogleSource._getThumbnail(n.entry), o = app.GoogleSource._processPhotos(e);
                        if (o && o.length) {
                            const e = {};
                            e.index = i, e.uid = "album" + i, e.name = n.title.$t, e.id = n.gphoto$id.$t, e.ct = o.length, 
                            e.thumb = r, e.checked = !1, e.photos = o, t.push(e), i++;
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
window.app = window.app || {}, app.Geo = function() {
    "use strict";
    function e(e) {
        return n.entries.find(t => t.point === e);
    }
    function t(e, t) {
        n.entries.push({
            loc: t,
            point: e
        }), n.entries.length > n.maxSize && n.entries.shift();
    }
    function i(e) {
        let t = e;
        try {
            const i = e.split(" ");
            2 === i.length && (t = `${parseFloat(i[0]).toFixed(8)},${parseFloat(i[1]).toFixed(8)}`);
        } catch (e) {
            Chrome.Utils.noop();
        }
        return t;
    }
    new ExceptionHandler();
    const n = {
        entries: [],
        maxSize: 100
    };
    return {
        get: function(n) {
            if (!Chrome.Storage.getBool("showLocation")) return Promise.reject(new Error("showLocation is off"));
            if (Chrome.Utils.isWhiteSpace(n)) return Promise.reject(new Error("point is empty or null"));
            const r = i(n), o = e(r);
            if (o) return Promise.resolve(o.loc);
            const s = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${r}`, a = Chrome.JSONUtils.shallowCopy(Chrome.Http.conf);
            return a.maxRetries = 2, Chrome.Http.doGet(s, a).then(e => {
                let i = "";
                return "OK" === e.status && e.results && e.results.length > 0 && (i = e.results[0].formatted_address, 
                t(r, i)), Promise.resolve(i);
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
    window.app = window.app || {}, new ExceptionHandler(), app.SSPhoto = class {
        constructor(e, t, i) {
            this._id = e, this._url = t.url, this._photographer = t.author ? t.author : "", 
            this._type = i, this._aspectRatio = t.asp, this._ex = t.ex, this._point = t.point, 
            this._isBad = !1;
        }
        getId() {
            return this._id;
        }
        setId(e) {
            this._id = e;
        }
        isBad() {
            return this._isBad;
        }
        markBad() {
            this._isBad = !0;
        }
        getUrl() {
            return this._url;
        }
        getType() {
            return this._type;
        }
        getPhotographer() {
            return this._photographer;
        }
        getAspectRatio() {
            return this._aspectRatio;
        }
        getPoint() {
            return this._point;
        }
        showSource() {
            let e, t, i = null;
            switch (this._type) {
              case "500":
                e = /(\/[^/]*){4}/, i = `http://500px.com/photo${(t = this._url.match(e))[1]}`;
                break;

              case "flickr":
                this._ex && (e = /(\/[^/]*){4}(_.*_)/, t = this._url.match(e), i = `https://www.flickr.com/photos/${this._ex}${t[1]}`);
                break;

              case "reddit":
                this._ex && (i = this._ex);
                break;

              default:
                "Google User" !== this._type && (i = this._url);
            }
            null !== i && chrome.tabs.create({
                url: i
            });
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSPhotos = function() {
    "use strict";
    new ExceptionHandler();
    const e = [];
    let t = 0;
    return {
        addFromSource: function(t) {
            const i = t.type, n = app.SSViews.getType();
            let r = 0;
            for (const o of t.photos) if (!app.SSView.ignore(o.asp, n)) {
                const t = new app.SSPhoto(r, o, i);
                e.push(t), r++;
            }
        },
        getCount: function() {
            return e.length;
        },
        hasUsable: function() {
            return !e.every(e => e.isBad());
        },
        get: function(t) {
            return e[t];
        },
        getNextUsable: function() {
            for (let i = 0; i < e.length; i++) {
                const n = (i + t) % e.length, r = e[n];
                if (!r.isBad() && !app.SSViews.hasPhoto(r)) return t = n, app.SSPhotos.incCurrentIndex(), 
                r;
            }
            return null;
        },
        getCurrentIndex: function() {
            return t;
        },
        setCurrentIndex: function(e) {
            t = e;
        },
        incCurrentIndex: function() {
            return t = t === e.length - 1 ? 0 : t + 1;
        },
        shuffle: function() {
            Chrome.Utils.shuffleArray(e), e.forEach((e, t) => {
                e.setId(t);
            });
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSBuilder = function() {
    "use strict";
    function e() {
        let e = app.PhotoSources.getSelectedPhotos();
        e = e || [];
        for (const t of e) app.SSPhotos.addFromSource(t);
        return app.SSPhotos.getCount() ? (Chrome.Storage.getBool("shuffle") && app.SSPhotos.shuffle(), 
        !0) : (app.Screensaver.setNoPhotos(), !1);
    }
    return new ExceptionHandler(), {
        build: function() {
            const t = e();
            return t && (app.Screensaver.createPages(), app.SSFinder.initialize()), t;
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSTime = function() {
    "use strict";
    return new ExceptionHandler(), {
        initialize: function() {
            Chrome.Storage.getInt("showTime", 0) > 0 && setInterval(app.SSTime.setTime, 61e3);
        },
        setTime: function() {
            let e = "";
            0 !== Chrome.Storage.getInt("showTime", 0) && app.SSRunner.isStarted() && (e = Chrome.Time.getStringShort()), 
            app.Screensaver.setTimeLabel(e);
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSEvents = function() {
    "use strict";
    function e() {
        Chrome.Msg.send(app.Msg.SS_CLOSE).catch(() => {}), setTimeout(function() {
            window.close();
        }, 750);
    }
    function t(e) {
        app.SSRunner.isInteractive() && ("ss-toggle-paused" === e ? (Chrome.GA.event(Chrome.GA.EVENT.KEY_COMMAND, `${e}`), 
        app.SSRunner.togglePaused()) : "ss-forward" === e ? (Chrome.GA.event(Chrome.GA.EVENT.KEY_COMMAND, `${e}`), 
        app.SSRunner.forward()) : "ss-back" === e && (Chrome.GA.event(Chrome.GA.EVENT.KEY_COMMAND, `${e}`), 
        app.SSRunner.back()));
    }
    function i(t, i, n) {
        return t.message === app.Msg.SS_CLOSE.message ? e() : t.message === app.Msg.SS_IS_SHOWING.message && n({
            message: "OK"
        }), !1;
    }
    function n(t) {
        const i = t.key;
        if (app.SSRunner.isStarted()) switch (i) {
          case "Alt":
          case "Shift":
          case " ":
          case "ArrowLeft":
          case "ArrowRight":
            app.SSRunner.isInteractive() || e();
            break;

          default:
            e();
        } else e();
    }
    function r(t) {
        if (s.x && s.y) {
            const i = Math.abs(t.clientX - s.x), n = Math.abs(t.clientY - s.y);
            Math.max(i, n) > 10 && e();
        } else s.x = t.clientX, s.y = t.clientY;
    }
    function o() {
        if (app.SSRunner.isStarted()) {
            const e = app.SSViews.getSelectedIndex();
            Chrome.Storage.getBool("allowPhotoClicks") && void 0 !== e && app.SSViews.get(e).photo.showSource();
        }
        e();
    }
    new ExceptionHandler();
    const s = {
        x: null,
        y: null
    };
    return {
        initialize: function() {
            Chrome.Msg.listen(i), window.addEventListener("keydown", n, !1), window.addEventListener("mousemove", r, !1), 
            window.addEventListener("click", o, !1), chrome.commands.onCommand.addListener(t);
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSFinder = function() {
    "use strict";
    function e(e) {
        if (app.SSViews.isSelectedIndex(e)) return;
        const t = app.SSViews.getCount();
        if (app.SSPhotos.getCount() <= t) return;
        const i = app.SSPhotos.getNextUsable();
        i && app.SSViews.get(e).setPhoto(i);
    }
    new ExceptionHandler();
    let t = 3e4;
    return {
        initialize: function() {
            const e = Chrome.Storage.get("transitionTime");
            e && (t = 1e3 * e.base);
        },
        getNext: function(e) {
            let i = app.SSViews.findLoadedPhoto(e);
            return -1 === i ? app.SSRunner.setWaitTime(500) : app.SSRunner.setWaitTime(t), i;
        },
        replacePhoto: function(t) {
            t >= 0 && e(t);
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSRunner = function() {
    "use strict";
    function e() {
        window.clearTimeout(r.timeOutId);
    }
    function t(e = null) {
        const t = Chrome.Storage.get("transitionTime");
        t && app.SSRunner.setWaitTime(1e3 * t.base), n(e);
    }
    function i(i = null) {
        app.SSRunner.isPaused() ? (app.SSRunner.togglePaused(i), app.SSRunner.togglePaused()) : (e(), 
        t(i));
    }
    function n(e = null) {
        if (app.Screensaver.noPhotos()) return;
        const t = app.SSViews.getSelectedIndex(), i = app.SSViews.getCount();
        let o = null === e ? t : e, s = (o = app.SSRunner.isStarted() ? o : 0) === i - 1 ? 0 : o + 1;
        app.SSRunner.isStarted() || (s = 0), -1 !== (s = app.SSFinder.getNext(s)) && (app.SSRunner.isStarted() || (r.started = !0, 
        app.SSTime.setTime()), app.SSViews.get(s).render(), app.SSHistory.add(e, s, r.replaceIdx), 
        r.lastSelected = t, app.SSViews.setSelectedIndex(s), null === e && (app.SSFinder.replacePhoto(r.replaceIdx), 
        r.replaceIdx = r.lastSelected)), r.timeOutId = window.setTimeout(() => {
            n();
        }, r.waitTime);
    }
    new ExceptionHandler();
    const r = {
        started: !1,
        replaceIdx: -1,
        lastSelected: -1,
        waitTime: 3e4,
        interactive: !1,
        paused: !1,
        timeOutId: 0
    };
    return {
        start: function(e = 2e3) {
            const t = Chrome.Storage.get("transitionTime");
            t && app.SSRunner.setWaitTime(1e3 * t.base), r.interactive = Chrome.Storage.get("interactive"), 
            app.SSHistory.initialize(), window.setTimeout(n, e);
        },
        getWaitTime: function() {
            return r.waitTime;
        },
        setWaitTime: function(e) {
            r.waitTime = e;
        },
        setLastSelected: function(e) {
            r.lastSelected = e;
        },
        setReplaceIdx: function(e) {
            r.replaceIdx = e;
        },
        isStarted: function() {
            return r.started;
        },
        isInteractive: function() {
            return r.interactive;
        },
        isPaused: function() {
            return r.paused;
        },
        isCurrentPair: function(e) {
            return e === app.SSViews.getSelectedIndex() || e === r.lastSelected;
        },
        togglePaused: function(i = null) {
            r.started && (r.paused = !r.paused, app.Screensaver.setPaused(r.paused), r.paused ? e() : t(i));
        },
        forward: function() {
            r.started && i();
        },
        back: function() {
            if (r.started) {
                const e = app.SSHistory.back();
                null !== e && i(e);
            }
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSHistory = function() {
    "use strict";
    new ExceptionHandler();
    const e = {
        arr: [],
        idx: -1,
        max: 20
    };
    return {
        initialize: function() {
            e.max = Math.min(app.SSPhotos.getCount(), e.max);
        },
        add: function(t, i, n) {
            if (null === t) {
                const t = app.SSViews.get(i), r = e.idx, o = e.arr.length, s = {
                    viewsIdx: i,
                    replaceIdx: n,
                    photoId: t.photo.getId(),
                    photosPos: app.SSPhotos.getCurrentIndex()
                };
                r === o - 1 && (e.arr.length > e.max && (e.arr.shift(), e.idx--, e.idx = Math.max(e.idx, -1)), 
                e.arr.push(s));
            }
            e.idx++;
        },
        clear: function() {
            e.arr = [], e.idx = -1;
        },
        back: function() {
            if (e.idx <= 0) return null;
            let t = null, i = 2, n = e.idx - i;
            if (e.idx = n, n < 0) {
                if (e.arr.length > e.max) return e.idx += i, null;
                e.idx = -1, i = 1, t = -1, n = 0;
            }
            const r = e.arr[n].photosPos, o = e.arr[n + i].replaceIdx;
            app.SSPhotos.setCurrentIndex(r), app.SSRunner.setReplaceIdx(o);
            const s = e.arr[n].viewsIdx, a = e.arr[n].photoId;
            t = null === t ? s : t;
            const l = app.SSViews.get(s), c = app.SSPhotos.get(a);
            return l.setPhoto(c), l.render(), t;
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
    const e = screen.width / screen.height;
    app.SSView = class {
        constructor(e) {
            this.photo = e, this.image = null, this.author = null, this.time = null, this.location = null, 
            this.model = null, this.url = e.getUrl(), this.authorLabel = "", this.locationLabel = "";
        //    alert('constructor : e.url : ' + e.getUrl());
             //   alert(e);
              // alert(e.getUrl() +":" + e.getPoint()  +":" + e.getPhotographer());
        }
        static createView(e, t) {
            switch (t) {
              case app.SSViews.Type.LETTERBOX:
                return new app.SSViewLetterbox(e);

              case app.SSViews.Type.ZOOM:
                return new app.SSView(e);

              case app.SSViews.Type.FRAME:
                return new app.SSViewFrame(e);

              case app.SSViews.Type.FULL:
                return new app.SSViewFull(e);

              default:
                return Chrome.Log.error(`Bad SSView type: ${t}`, "SSView.createView"), new app.SSViewLetterbox(e);
            }
        }
        static _isBadAspect(t) {
            return t < e - .5 || t > e + .5;
        }
        static ignore(e, t) {
            let i = !1;
            const n = Chrome.Storage.getBool("skip");
            return (!e || isNaN(e) || n && (1 === t || 3 === t) && app.SSView._isBadAspect(e)) && (i = !0), 
            i;
        }
        static _showLocation() {
            return Chrome.Storage.getBool("showLocation");
        }
        static showTime() {
            return Chrome.Storage.getBool("showTime");
        }
        _hasAuthor() {
            const e = this.photo.getPhotographer();
            return !Chrome.Utils.isWhiteSpace(e);
        }
        _hasAuthorLabel() {
            return !Chrome.Utils.isWhiteSpace(this.authorLabel);
        }
        _hasLocation() {
            return !!this.photo.getPoint();
        }
        _hasLocationLabel() {
            return !Chrome.Utils.isWhiteSpace(this.locationLabel);
        }
        _super500px() {
            const e = this.photo.getType(), t = this.authorLabel, i = this.author.querySelector("#sup");
            i.textContent = "", Chrome.Utils.isWhiteSpace(t) || "500" !== e || (i.textContent = "px");
        }
        _setTimeStyle() {
            Chrome.Storage.getBool("largeTime") && (this.time.style.fontSize = "8.5vh", this.time.style.fontWeight = 300);
        }
        _setUrl() {
            this.url = this.photo.getUrl(), this.model.set("view.url", this.url);
            this.model.set("view.url", 'https://lh3.googleusercontent.com/-KK0a8yX7hUc/TnemEmslOEI/AAAAAAAAG4I/qj90bfgIkqs/s1920-w1920-h1080-c/IMG_1428.jpg');
        }
        _setAuthorLabel() {
            this.authorLabel = "", this.model.set("view.authorLabel", this.authorLabel), this._super500px();
            const e = this.photo.getType(), t = this.photo.getPhotographer();
            let i = e;
            const n = e.search("User");
            (Chrome.Storage.getBool("showPhotog") || -1 === n) && (-1 !== n && (i = e.substring(0, n - 1)), 
            this._hasAuthor() ? this.authorLabel = `${t} / ${i}` : this.authorLabel = `${Chrome.Locale.localize("photo_from")} ${i}`, 
            this.model.set("view.authorLabel", this.authorLabel), this._super500px());
        }
        _setLocationLabel() {
            if (this.locationLabel = "", this.model.set("view.locationLabel", this.locationLabel), 
            app.SSView._showLocation() && this._hasLocation()) {
                const e = this.photo.getPoint();
                app.Geo.get(e).then(e => (e && this.model && (e = e.replace("Unnamed Road, ", ""), 
                this.locationLabel = e, this.model.set("view.locationLabel", this.locationLabel)), 
                Promise.resolve())).catch(t => {
                    const i = Chrome.Locale.localize("err_network");
                    t.message.includes(i) || Chrome.GA.error(`${t.message}, point: ${e}`, "SSView._setLocationLabel");
                });
            }
        }
        setElements(e, t, i, n, r) {
            this.image = e, this.author = t, this.time = i, this.location = n, this.model = r, 
            this._setTimeStyle(), this.setPhoto(this.photo);
        }
        setPhoto(e) {
            this.photo = e, this._setUrl(), this._setAuthorLabel(!1), this._setLocationLabel();
        }
        render() {}
        isError() {
            return !this.image || this.image.error;
        }
        isLoaded() {
            return !!this.image && this.image.loaded;
        }
    };
}(), /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
function() {
    window.app = window.app || {}, new ExceptionHandler();
    const e = screen.width / screen.height;
    app.SSViewLetterbox = class extends app.SSView {
        constructor(e) {
            super(e);
        }
        render() {
            super.render();
            const t = this.photo.getAspectRatio(), i = this.author.style, n = this.location.style, r = this.time.style;
            let o = t / e * 100, s = (100 - (o = Math.min(o, 100))) / 2, a = e / t * 100, l = (100 - (a = Math.min(a, 100))) / 2;
            i.textAlign = "right", n.textAlign = "left", i.right = s + 1 + "vw", i.bottom = l + 1 + "vh", 
            i.width = o - .5 + "vw", n.left = s + 1 + "vw", n.bottom = l + 1 + "vh", n.width = o - .5 + "vw", 
            r.right = s + 1 + "vw", r.bottom = l + 3.5 + "vh", app.SSView.showTime() && (i.textOverflow = "ellipsis", 
            i.whiteSpace = "nowrap");
            let c = o / 2;
            this._hasLocationLabel() && (i.maxWidth = c - 1.1 + "vw"), this._hasAuthorLabel() && (n.maxWidth = c - 1.1 + "vw");
        }
    };
}(), window.app = window.app || {}, new ExceptionHandler(), app.SSViewFrame = class extends app.SSView {
    constructor(e) {
        super(e);
    }
    static _setLabelStyle(e, t, i, n) {
        e.textOverflow = "ellipsis", e.whiteSpace = "nowrap", e.color = "black", e.opacity = 1, 
        e.fontSize = "2.5vh", e.fontWeight = 400;
        let r = t / screen.width * 100, o = (100 - r) / 2;
        n ? (e.left = o + .5 + "vw", e.right = "", e.textAlign = "left") : (e.right = o + .5 + "vw", 
        e.left = "", e.textAlign = "right"), e.width = r - 1 + "vw";
        let s = (100 - i / screen.height * 100) / 2;
        e.bottom = s + 1.1 + "vh";
    }
    render() {
        super.render();
        const e = this.author.style, t = this.location.style, i = this.time.style, n = this.image, r = n.style, o = n.$.img.style, s = this.photo.getAspectRatio(), a = .005 * screen.height, l = .05 * screen.height, c = .025 * screen.height, h = Math.min((screen.width - 2 * c - 2 * a) / s, screen.height - 2 * c - a - l), u = h * s, d = u + 2 * a, f = h + l + a;
        o.height = h + "px", o.width = u + "px", n.height = h, n.width = u, r.top = (screen.height - f) / 2 + "px", 
        r.left = (screen.width - d) / 2 + "px", r.border = "0.5vh ridge WhiteSmoke", r.borderBottom = "5vh solid WhiteSmoke", 
        r.borderRadius = "1.5vh", r.boxShadow = "1.5vh 1.5vh 1.5vh rgba(0,0,0,.7)", app.SSViewFrame._setLabelStyle(e, d, f, !1), 
        app.SSViewFrame._setLabelStyle(t, d, f, !0);
        let p = (100 - f / screen.height * 100) / 2, m = d / screen.width * 100, _ = (100 - m) / 2;
        i.right = _ + 1 + "vw", i.textAlign = "right", i.bottom = p + 5 + "vh";
        let g = m / 2;
        this._hasLocationLabel() && (e.maxWidth = g - 1 + "vw"), this._hasAuthorLabel() && (t.maxWidth = g - 1 + "vw");
    }
}, window.app = window.app || {}, new ExceptionHandler(), app.SSViewFull = class extends app.SSView {
    constructor(e) {
        super(e);
    }
    render() {
        super.render();
        const e = this.image.$.img;
        e.style.width = "100%", e.style.height = "100%", e.style.objectFit = "fill";
    }
}, /*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.SSViews = function() {
    "use strict";
    function e() {
        (r = Chrome.Storage.getInt("photoSizing", 0)) === n.RANDOM && (r = Chrome.Utils.getRandomInt(0, 3));
        let e = "contain";
        switch (r) {
          case n.LETTERBOX:
            e = "contain";
            break;

          case n.ZOOM:
            e = "cover";
            break;

          case n.FRAME:
          case n.FULL:
            e = null;
        }
        app.Screensaver.setSizingType(e);
    }
    new ExceptionHandler();
    const t = [];
    let i = null;
    const n = {
        UNDEFINED: -1,
        LETTERBOX: 0,
        ZOOM: 1,
        FRAME: 2,
        FULL: 3,
        RANDOM: 4
    };
    let r = n.UNDEFINED;
    return {
        Type: n,
        create: function(n) {
            i = n.$.pages, e();
            const o = Math.min(app.SSPhotos.getCount(), 20);
            for (let e = 0; e < o; e++) {
                const i = app.SSPhotos.get(e), n = app.SSView.createView(i, r);
                t.push(n);
            }
            app.SSPhotos.setCurrentIndex(o), n.set("_views", t), n.$.repeatTemplate.render(), 
            t.forEach((e, t) => {
                const r = i.querySelector("#view" + t), o = r.querySelector(".image"), s = r.querySelector(".author"), a = r.querySelector(".time"), l = r.querySelector(".location"), c = n.$.repeatTemplate.modelForElement(r);
                e.setElements(o, s, a, l, c);
            });
        },
        getType: function() {
            return r === n.UNDEFINED && e(), r;
        },
        getCount: function() {
            return t.length;
        },
        get: function(e) {
            return t[e];
        },
        getSelectedIndex: function() {
            if (i) return i.selected;
        },
        setSelectedIndex: function(e) {
            i.selected = e;
        },
        isSelectedIndex: function(e) {
            let t = !1;
            return i && e === i.selected && (t = !0), t;
        },
        hasPhoto: function(e) {
            let i = !1;
            for (const n of t) if (n.photo.getId() === e.getId()) {
                i = !0;
                break;
            }
            return i;
        },
        hasUsable: function() {
            let e = !1;
            for (let i = 0; i < t.length; i++) {
                const n = t[i];
                if (!app.SSRunner.isCurrentPair(i) && !n.photo.isBad()) {
                    e = !0;
                    break;
                }
            }
            return e;
        },
        replaceAll: function() {
            for (let e = 0; e < t.length; e++) {
                if (app.SSRunner.isCurrentPair(e)) continue;
                const i = t[e], n = app.SSPhotos.getNextUsable();
                if (!n) break;
                i.setPhoto(n);
            }
            app.SSHistory.clear();
        },
        findLoadedPhoto: function(e) {
            if (app.SSViews.hasUsable() || app.SSViews.replaceAll(), t[e].isLoaded()) return e;
            for (let i = 0; i < t.length; i++) {
                const n = (i + e) % t.length, r = t[n];
                if (!app.SSRunner.isCurrentPair(n)) {
                    if (r.isLoaded()) return n;
                    if (r.isError() && !r.photo.isBad() && (r.photo.markBad(), !app.SSPhotos.hasUsable())) return app.Screensaver.setNoPhotos(), 
                    -1;
                }
            }
            return -1;
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
            var r = t.log.split(",");
            t.log = {}, r.forEach(function(e) {
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
    function r(e) {
        var t = e.charCodeAt(0);
        return t > 32 && t < 127 && -1 == [ 34, 35, 60, 62, 63, 96 ].indexOf(t) ? e : encodeURIComponent(e);
    }
    function o(e) {
        var t = e.charCodeAt(0);
        return t > 32 && t < 127 && -1 == [ 34, 35, 60, 62, 96 ].indexOf(t) ? e : encodeURIComponent(e);
    }
    function s(e, s, a) {
        function l(e) {
            v.push(e);
        }
        var c = s || "scheme start", h = 0, _ = "", g = !1, y = !1, v = [];
        e: for (;(e[h - 1] != f || 0 == h) && !this._isInvalid; ) {
            var b = e[h];
            switch (c) {
              case "scheme start":
                if (!b || !p.test(b)) {
                    if (s) {
                        l("Invalid scheme.");
                        break e;
                    }
                    _ = "", c = "no scheme";
                    continue;
                }
                _ += b.toLowerCase(), c = "scheme";
                break;

              case "scheme":
                if (b && m.test(b)) _ += b.toLowerCase(); else {
                    if (":" != b) {
                        if (s) {
                            if (f == b) break e;
                            l("Code point not allowed in scheme: " + b);
                            break e;
                        }
                        _ = "", h = 0, c = "no scheme";
                        continue;
                    }
                    if (this._scheme = _, _ = "", s) break e;
                    t(this._scheme) && (this._isRelative = !0), c = "file" == this._scheme ? "relative" : this._isRelative && a && a._scheme == this._scheme ? "relative or authority" : this._isRelative ? "authority first slash" : "scheme data";
                }
                break;

              case "scheme data":
                "?" == b ? (this._query = "?", c = "query") : "#" == b ? (this._fragment = "#", 
                c = "fragment") : f != b && "\t" != b && "\n" != b && "\r" != b && (this._schemeData += r(b));
                break;

              case "no scheme":
                if (a && t(a._scheme)) {
                    c = "relative";
                    continue;
                }
                l("Missing scheme."), i.call(this);
                break;

              case "relative or authority":
                if ("/" != b || "/" != e[h + 1]) {
                    l("Expected /, got: " + b), c = "relative";
                    continue;
                }
                c = "authority ignore slashes";
                break;

              case "relative":
                if (this._isRelative = !0, "file" != this._scheme && (this._scheme = a._scheme), 
                f == b) {
                    this._host = a._host, this._port = a._port, this._path = a._path.slice(), this._query = a._query, 
                    this._username = a._username, this._password = a._password;
                    break e;
                }
                if ("/" == b || "\\" == b) "\\" == b && l("\\ is an invalid code point."), c = "relative slash"; else if ("?" == b) this._host = a._host, 
                this._port = a._port, this._path = a._path.slice(), this._query = "?", this._username = a._username, 
                this._password = a._password, c = "query"; else {
                    if ("#" != b) {
                        var P = e[h + 1], S = e[h + 2];
                        ("file" != this._scheme || !p.test(b) || ":" != P && "|" != P || f != S && "/" != S && "\\" != S && "?" != S && "#" != S) && (this._host = a._host, 
                        this._port = a._port, this._username = a._username, this._password = a._password, 
                        this._path = a._path.slice(), this._path.pop()), c = "relative path";
                        continue;
                    }
                    this._host = a._host, this._port = a._port, this._path = a._path.slice(), this._query = a._query, 
                    this._fragment = "#", this._username = a._username, this._password = a._password, 
                    c = "fragment";
                }
                break;

              case "relative slash":
                if ("/" != b && "\\" != b) {
                    "file" != this._scheme && (this._host = a._host, this._port = a._port, this._username = a._username, 
                    this._password = a._password), c = "relative path";
                    continue;
                }
                "\\" == b && l("\\ is an invalid code point."), c = "file" == this._scheme ? "file host" : "authority ignore slashes";
                break;

              case "authority first slash":
                if ("/" != b) {
                    l("Expected '/', got: " + b), c = "authority ignore slashes";
                    continue;
                }
                c = "authority second slash";
                break;

              case "authority second slash":
                if (c = "authority ignore slashes", "/" != b) {
                    l("Expected '/', got: " + b);
                    continue;
                }
                break;

              case "authority ignore slashes":
                if ("/" != b && "\\" != b) {
                    c = "authority";
                    continue;
                }
                l("Expected authority, got: " + b);
                break;

              case "authority":
                if ("@" == b) {
                    g && (l("@ already seen."), _ += "%40"), g = !0;
                    for (var w = 0; w < _.length; w++) {
                        var C = _[w];
                        if ("\t" != C && "\n" != C && "\r" != C) if (":" != C || null !== this._password) {
                            var E = r(C);
                            null !== this._password ? this._password += E : this._username += E;
                        } else this._password = ""; else l("Invalid whitespace in authority.");
                    }
                    _ = "";
                } else {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                        h -= _.length, _ = "", c = "host";
                        continue;
                    }
                    _ += b;
                }
                break;

              case "file host":
                if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                    2 != _.length || !p.test(_[0]) || ":" != _[1] && "|" != _[1] ? 0 == _.length ? c = "relative path start" : (this._host = n.call(this, _), 
                    _ = "", c = "relative path start") : c = "relative path";
                    continue;
                }
                "\t" == b || "\n" == b || "\r" == b ? l("Invalid whitespace in file host.") : _ += b;
                break;

              case "host":
              case "hostname":
                if (":" != b || y) {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b) {
                        if (this._host = n.call(this, _), _ = "", c = "relative path start", s) break e;
                        continue;
                    }
                    "\t" != b && "\n" != b && "\r" != b ? ("[" == b ? y = !0 : "]" == b && (y = !1), 
                    _ += b) : l("Invalid code point in host/hostname: " + b);
                } else if (this._host = n.call(this, _), _ = "", c = "port", "hostname" == s) break e;
                break;

              case "port":
                if (/[0-9]/.test(b)) _ += b; else {
                    if (f == b || "/" == b || "\\" == b || "?" == b || "#" == b || s) {
                        if ("" != _) {
                            var x = parseInt(_, 10);
                            x != u[this._scheme] && (this._port = x + ""), _ = "";
                        }
                        if (s) break e;
                        c = "relative path start";
                        continue;
                    }
                    "\t" == b || "\n" == b || "\r" == b ? l("Invalid code point in port: " + b) : i.call(this);
                }
                break;

              case "relative path start":
                if ("\\" == b && l("'\\' not allowed in path."), c = "relative path", "/" != b && "\\" != b) continue;
                break;

              case "relative path":
                if (f != b && "/" != b && "\\" != b && (s || "?" != b && "#" != b)) "\t" != b && "\n" != b && "\r" != b && (_ += r(b)); else {
                    "\\" == b && l("\\ not allowed in relative path.");
                    var N;
                    (N = d[_.toLowerCase()]) && (_ = N), ".." == _ ? (this._path.pop(), "/" != b && "\\" != b && this._path.push("")) : "." == _ && "/" != b && "\\" != b ? this._path.push("") : "." != _ && ("file" == this._scheme && 0 == this._path.length && 2 == _.length && p.test(_[0]) && "|" == _[1] && (_ = _[0] + ":"), 
                    this._path.push(_)), _ = "", "?" == b ? (this._query = "?", c = "query") : "#" == b && (this._fragment = "#", 
                    c = "fragment");
                }
                break;

              case "query":
                s || "#" != b ? f != b && "\t" != b && "\n" != b && "\r" != b && (this._query += o(b)) : (this._fragment = "#", 
                c = "fragment");
                break;

              case "fragment":
                f != b && "\t" != b && "\n" != b && "\r" != b && (this._fragment += b);
            }
            h++;
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
    var c = !1;
    if (!e.forceJURL) try {
        var h = new URL("b", "http://a");
        h.pathname = "c%20d", c = "http://a/c%20d" === h.href;
    } catch (e) {}
    if (!c) {
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
            r(e), i.length && (e.callback_(i, e), t = !0);
        }), t && n();
    }
    function r(e) {
        e.nodes_.forEach(function(t) {
            var i = _.get(t);
            i && i.forEach(function(t) {
                t.observer === e && t.removeTransientObservers();
            });
        });
    }
    function o(e, t) {
        for (var i = e; i; i = i.parentNode) {
            var n = _.get(i);
            if (n) for (var r = 0; r < n.length; r++) {
                var o = n[r], s = o.options;
                if (i === e || s.subtree) {
                    var a = t(s);
                    a && o.enqueue(a);
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
    function c(e, t) {
        return S = new a(e, t);
    }
    function h(e) {
        return w || (w = l(S), w.oldValue = e, w);
    }
    function u() {
        S = w = void 0;
    }
    function d(e) {
        return e === w || e === S;
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
                for (var r, o = 0; o < n.length; o++) if (n[o].observer === this) {
                    (r = n[o]).removeListeners(), r.options = t;
                    break;
                }
                r || (r = new p(this, e, t), n.push(r), this.nodes_.push(e)), r.addListeners();
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
        var S, w;
        p.prototype = {
            enqueue: function(e) {
                var i = this.observer.records_, n = i.length;
                if (i.length > 0) {
                    var r = f(i[n - 1], e);
                    if (r) return void (i[n - 1] = r);
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
                    (r = new c("attributes", n)).attributeName = t, r.attributeNamespace = i;
                    s = e.attrChange === MutationEvent.ADDITION ? null : e.prevValue;
                    o(n, function(e) {
                        if (e.attributes && (!e.attributeFilter || !e.attributeFilter.length || -1 !== e.attributeFilter.indexOf(t) || -1 !== e.attributeFilter.indexOf(i))) return e.attributeOldValue ? h(s) : r;
                    });
                    break;

                  case "DOMCharacterDataModified":
                    var r = c("characterData", n = e.target), s = e.prevValue;
                    o(n, function(e) {
                        if (e.characterData) return e.characterDataOldValue ? h(s) : r;
                    });
                    break;

                  case "DOMNodeRemoved":
                    this.addTransientObserver(e.target);

                  case "DOMNodeInserted":
                    var a, l, d = e.target;
                    "DOMNodeInserted" === e.type ? (a = [ d ], l = []) : (a = [], l = [ d ]);
                    var f = d.previousSibling, p = d.nextSibling;
                    (r = c("childList", e.target.parentNode)).addedNodes = a, r.removedNodes = l, r.previousSibling = f, 
                    r.nextSibling = p, o(e.relatedNode, function(e) {
                        if (e.childList) return r;
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
    }(), r = "template", o = function() {};
    if (i) {
        var s = document.implementation.createHTMLDocument("template"), a = !0, l = document.createElement("style");
        l.textContent = r + "{display:none;}";
        var c = document.head;
        c.insertBefore(l, c.firstElementChild), o.prototype = Object.create(HTMLElement.prototype), 
        o.decorate = function(e) {
            if (!e.content) {
                e.content = s.createDocumentFragment();
                for (var i; i = e.firstChild; ) e.content.appendChild(i);
                if (e.cloneNode = function(e) {
                    return o.cloneNode(this, e);
                }, a) try {
                    Object.defineProperty(e, "innerHTML", {
                        get: function() {
                            for (var e = "", i = this.content.firstChild; i; i = i.nextSibling) e += i.outerHTML || t(i.data);
                            return e;
                        },
                        set: function(e) {
                            for (s.body.innerHTML = e, o.bootstrap(s); this.content.firstChild; ) this.content.removeChild(this.content.firstChild);
                            for (;s.body.firstChild; ) this.content.appendChild(s.body.firstChild);
                        },
                        configurable: !0
                    });
                } catch (e) {
                    a = !1;
                }
                o.bootstrap(e.content);
            }
        }, o.bootstrap = function(e) {
            for (var t, i = e.querySelectorAll(r), n = 0, s = i.length; n < s && (t = i[n]); n++) o.decorate(t);
        }, document.addEventListener("DOMContentLoaded", function() {
            o.bootstrap(document);
        });
        var h = document.createElement;
        document.createElement = function() {
            "use strict";
            var e = h.apply(document, arguments);
            return "template" === e.localName && o.decorate(e), e;
        };
        var u = /[&\u00A0<>]/g;
    }
    if (i || n) {
        var d = Node.prototype.cloneNode;
        o.cloneNode = function(e, t) {
            var i = d.call(e, !1);
            return this.decorate && this.decorate(i), t && (i.content.appendChild(d.call(e.content, !0)), 
            this.fixClonedDom(i.content, e.content)), i;
        }, o.fixClonedDom = function(e, t) {
            if (t.querySelectorAll) for (var i, n, o = t.querySelectorAll(r), s = e.querySelectorAll(r), a = 0, l = s.length; a < l; a++) n = o[a], 
            i = s[a], this.decorate && this.decorate(n), i.parentNode.replaceChild(n.cloneNode(!0), i);
        };
        var f = document.importNode;
        Node.prototype.cloneNode = function(e) {
            var t = d.call(this, e);
            return e && o.fixClonedDom(t, this), t;
        }, document.importNode = function(e, t) {
            if (e.localName === r) return o.cloneNode(e, t);
            var i = f.call(document, e, t);
            return t && o.fixClonedDom(i, e), i;
        }, n && (HTMLTemplateElement.prototype.cloneNode = function(e) {
            return o.cloneNode(this, e);
        });
    }
    i && (window.HTMLTemplateElement = o);
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
        var r = window.Event;
        window.Event = function(e, t) {
            t = t || {};
            var i = document.createEvent("Event");
            return i.initEvent(e, Boolean(t.bubbles), Boolean(t.cancelable)), i;
        }, window.Event.prototype = r.prototype;
    }
}(window.WebComponents), window.HTMLImports = window.HTMLImports || {
    flags: {}
}, function(e) {
    function t(e, t) {
        n(function() {
            o(e, t);
        }, t = t || p);
    }
    function i(e) {
        return "complete" === e.readyState || e.readyState === g;
    }
    function n(e, t) {
        if (i(t)) e && e(); else {
            var r = function() {
                "complete" !== t.readyState && t.readyState !== g || (t.removeEventListener(y, r), 
                n(e, t));
            };
            t.addEventListener(y, r);
        }
    }
    function r(e) {
        e.target.__loaded = !0;
    }
    function o(e, t) {
        function i() {
            o == a && e && e({
                allImports: n,
                loadedImports: l,
                errorImports: c
            });
        }
        var n = t.querySelectorAll("link[rel=import]"), o = 0, a = n.length, l = [], c = [];
        if (a) for (var h, u = 0; u < a && (h = n[u]); u++) s(h) ? (l.push(this), o++, i()) : (h.addEventListener("load", function(e) {
            r(e), l.push(this), o++, i();
        }), h.addEventListener("error", function(e) {
            c.push(this), o++, i();
        })); else i();
    }
    function s(e) {
        return u ? e.__loaded || e.import && "loading" !== e.import.readyState : e.__importParsed;
    }
    function a(e) {
        for (var t, i = 0, n = e.length; i < n && (t = e[i]); i++) l(t) && c(t);
    }
    function l(e) {
        return "link" === e.localName && "import" === e.rel;
    }
    function c(e) {
        e.import ? r({
            target: e
        }) : (e.addEventListener("load", r), e.addEventListener("error", r));
    }
    var h = "import", u = Boolean(h in document.createElement("link")), d = Boolean(window.ShadowDOMPolyfill), f = function(e) {
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
        if ("loading" === document.readyState) for (var e, t = document.querySelectorAll("link[rel=import]"), i = 0, n = t.length; i < n && (e = t[i]); i++) c(e);
    }()), t(function(e) {
        window.HTMLImports.ready = !0, window.HTMLImports.readyTime = new Date().getTime();
        var t = p.createEvent("CustomEvent");
        t.initCustomEvent("HTMLImportsLoaded", !0, !0, e), p.dispatchEvent(t);
    }), e.IMPORT_LINK_TYPE = h, e.useNative = u, e.rootDocument = p, e.whenReady = t, 
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
        resolveUrlsInCssText: function(e, n, r) {
            var o = this.replaceUrls(e, r, n, t);
            return o = this.replaceUrls(o, r, n, i);
        },
        replaceUrls: function(e, t, i, n) {
            return e.replace(n, function(e, n, r, o) {
                var s = r.replace(/["']/g, "");
                return i && (s = new URL(s, i).href), t.href = s, s = t.href, n + "'" + s + "'" + o;
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
        load: function(i, n, r) {
            var o = new XMLHttpRequest();
            return (e.flags.debug || e.flags.bust) && (i += "?" + Math.random()), o.open("GET", i, t.async), 
            o.addEventListener("readystatechange", function(e) {
                if (4 === o.readyState) {
                    var i = null;
                    try {
                        var s = o.getResponseHeader("Location");
                        s && (i = "/" === s.substr(0, 1) ? location.origin + s : s);
                    } catch (e) {
                        console.error(e.message);
                    }
                    n.call(r, !t.ok(o) && o, o.response || o.responseText, i);
                }
            }), o.send(), o;
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
                var r = e.split(","), o = r[0], s = r[1];
                s = o.indexOf(";base64") > -1 ? atob(s) : decodeURIComponent(s), setTimeout(function() {
                    this.receive(e, n, null, s);
                }.bind(this), 0);
            } else {
                var a = function(t, i, r) {
                    this.receive(e, n, t, i, r);
                }.bind(this);
                t.load(e, a);
            } else setTimeout(function() {
                this.receive(e, n, {
                    error: "href must be specified"
                }, null);
            }.bind(this), 0);
        },
        receive: function(e, t, i, n, r) {
            this.cache[e] = n;
            for (var o, s = this.pending[e], a = 0, l = s.length; a < l && (o = s[a]); a++) this.onload(e, o, n, i, r), 
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
        return "link" === e.localName && e.rel === h;
    }
    function i(e) {
        var t = n(e);
        return "data:text/javascript;charset=utf-8," + encodeURIComponent(t);
    }
    function n(e) {
        return e.textContent + r(e);
    }
    function r(e) {
        var t = e.ownerDocument;
        t.__importedScripts = t.__importedScripts || 0;
        var i = e.ownerDocument.baseURI, n = t.__importedScripts ? "-" + t.__importedScripts : "";
        return t.__importedScripts++, "\n//# sourceURL=" + i + n + ".js\n";
    }
    function o(e) {
        var t = e.ownerDocument.createElement("style");
        return t.textContent = e.textContent, s.resolveUrlsInStyle(t), t;
    }
    var s = e.path, a = e.rootDocument, l = e.flags, c = e.isIE, h = e.IMPORT_LINK_TYPE, u = "link[rel=" + h + "]", d = {
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
            e = o(e), t.__appliedElement = e, e.__importElement = t, this.parseGeneric(e);
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
            var i = this, n = function(r) {
                e.removeEventListener("load", n), e.removeEventListener("error", n), t && t(r), 
                i.markParsingComplete(e), i.parseNext();
            };
            if (e.addEventListener("load", n), e.addEventListener("error", n), c && "style" === e.localName) {
                var r = !1;
                if (-1 == e.textContent.indexOf("@import")) r = !0; else if (e.sheet) {
                    r = !0;
                    for (var o, s = e.sheet.cssRules, a = s ? s.length : 0, l = 0; l < a && (o = s[l]); l++) o.type === CSSRule.IMPORT_RULE && (r = r && Boolean(o.styleSheet));
                }
                r && setTimeout(function() {
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
                for (var n, r = e.querySelectorAll(this.parseSelectorsForNode(e)), o = 0, s = r.length; o < s && (n = r[o]); o++) if (!this.isParsed(n)) return this.hasResource(n) ? t(n) ? this.nextToParseInDoc(n.__doc, n) : n : void 0;
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
    function r(e, t) {
        var i = document.implementation.createHTMLDocument(s);
        i._URL = t;
        var r = i.createElement("base");
        r.setAttribute("href", t), i.baseURI || n(i) || Object.defineProperty(i, "baseURI", {
            value: t
        });
        var o = i.createElement("meta");
        return o.setAttribute("charset", "utf-8"), i.head.appendChild(o), i.head.appendChild(r), 
        i.body.innerHTML = e, window.HTMLTemplateElement && HTMLTemplateElement.bootstrap && HTMLTemplateElement.bootstrap(i), 
        i;
    }
    var o = e.flags, s = e.IMPORT_LINK_TYPE, a = e.IMPORT_SELECTOR, l = e.rootDocument, c = e.Loader, h = e.Observer, u = e.parser, d = {
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
            if (o.load && console.log("loaded", e, i), i.__resource = n, i.__error = s, t(i)) {
                var l = this.documents[e];
                void 0 === l && ((l = s ? null : r(n, a || e)) && (l.__importLink = i, this.bootDocument(l)), 
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
    }, f = new c(d.loaded.bind(d), d.loadedAll.bind(d));
    if (d.observer = new h(), !document.baseURI) {
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
            for (var n, r, o, s, a = 0, l = e.length; a < l && (s = e[a]); a++) n || (n = s.ownerDocument, 
            r = t.isParsed(n)), (o = this.shouldLoadNode(s)) && i.loadNode(s), this.shouldParseNode(s) && r && t.parseDynamic(s, o);
        },
        shouldLoadNode: function(e) {
            return 1 === e.nodeType && r.call(e, i.loadSelectorsForNode(e));
        },
        shouldParseNode: function(e) {
            return 1 === e.nodeType && r.call(e, t.parseSelectorsForNode(e));
        }
    };
    i.observer.addCallback = n.added.bind(n);
    var r = HTMLElement.prototype.matches || HTMLElement.prototype.matchesSelector || HTMLElement.prototype.webkitMatchesSelector || HTMLElement.prototype.mozMatchesSelector || HTMLElement.prototype.msMatchesSelector;
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
        var r = e.firstElementChild;
        if (!r) for (r = e.firstChild; r && r.nodeType !== Node.ELEMENT_NODE; ) r = r.nextSibling;
        for (;r; ) !0 !== t(r, n) && i(r, t, n), r = r.nextElementSibling;
        return null;
    }
    function n(e, i) {
        for (var n = e.shadowRoot; n; ) t(n, i), n = n.olderShadowRoot;
    }
    function r(e, t, i) {
        if (e = window.wrap(e), !(i.indexOf(e) >= 0)) {
            i.push(e);
            for (var n, s = e.querySelectorAll("link[rel=" + o + "]"), a = 0, l = s.length; a < l && (n = s[a]); a++) n.import && r(n.import, t, i);
            t(e);
        }
    }
    var o = window.HTMLImports ? window.HTMLImports.IMPORT_LINK_TYPE : "none";
    e.forDocumentTree = function(e, t) {
        r(e, t, []);
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
    function r(e) {
        b.push(e), v || (v = !0, setTimeout(o));
    }
    function o() {
        v = !1;
        for (var e, t = b, i = 0, n = t.length; i < n && (e = t[i]); i++) e();
        b = [];
    }
    function s(e) {
        y ? r(function() {
            a(e);
        }) : a(e);
    }
    function a(e) {
        e.__upgraded__ && !e.__attached && (e.__attached = !0, e.attachedCallback && e.attachedCallback());
    }
    function l(e) {
        c(e), _(e, function(e) {
            c(e);
        });
    }
    function c(e) {
        y ? r(function() {
            h(e);
        }) : h(e);
    }
    function h(e) {
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
                for (var r = n.addedNodes[0]; r && r !== document && !r.host; ) r = r.parentNode;
                var o = r && (r.URL || r._URL || r.host && r.host.localName) || "";
                o = o.split("/?").shift().split("/").pop();
            }
            console.group("mutations (%d) [%s]", i.length, o || "");
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
    var v = !1, b = [], P = Array.prototype.forEach.call.bind(Array.prototype.forEach), S = Element.prototype.createShadowRoot;
    S && (Element.prototype.createShadowRoot = function() {
        var e = S.call(this);
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
        t && (d(e, t.takeRecords()), o());
    };
}), window.CustomElements.addModule(function(e) {
    function t(t, n, s) {
        return o.upgrade && console.group("upgrade:", t.localName), n.is && t.setAttribute("is", n.is), 
        i(t, n), t.__upgraded__ = !0, r(t), s && e.attached(t), e.upgradeSubtree(t, s), 
        o.upgrade && console.groupEnd(), t;
    }
    function i(e, t) {
        Object.__proto__ ? e.__proto__ = t.prototype : (n(e, t.prototype, t.native), e.__proto__ = t.prototype);
    }
    function n(e, t, i) {
        for (var n = {}, r = t; r !== i && r !== HTMLElement.prototype; ) {
            for (var o, s = Object.getOwnPropertyNames(r), a = 0; o = s[a]; a++) n[o] || (Object.defineProperty(e, o, Object.getOwnPropertyDescriptor(r, o)), 
            n[o] = 1);
            r = Object.getPrototypeOf(r);
        }
    }
    function r(e) {
        e.createdCallback && e.createdCallback();
    }
    var o = e.flags;
    e.upgrade = function(i, n) {
        if ("template" === i.localName && window.HTMLTemplateElement && HTMLTemplateElement.decorate && HTMLTemplateElement.decorate(i), 
        !i.__upgraded__ && i.nodeType === Node.ELEMENT_NODE) {
            var r = i.getAttribute("is"), o = e.getRegisteredDefinition(i.localName) || e.getRegisteredDefinition(r);
            if (o && (r && o.tag == i.localName || !r && !o.extends)) return t(i, o, n);
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
        var r = this.getAttribute(e);
        this.attributeChangedCallback && r !== n && this.attributeChangedCallback(e, n, r);
    }
    function n(e) {
        for (var t = 0; t < v.length; t++) if (e === v[t]) return !0;
    }
    function r(e) {
        var t = l(e);
        return t ? r(t.extends).concat([ t ]) : [];
    }
    function o(e) {
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
            for (var n, r = e.prototype, o = !1; r; ) r == t && (o = !0), (n = Object.getPrototypeOf(r)) && (r.__proto__ = n), 
            r = n;
            o || console.warn(e.tag + " prototype not found in prototype chain for " + e.is), 
            e.native = t;
        }
    }
    function a(e) {
        return _(S(e.tag), e);
    }
    function l(e) {
        if (e) return b[e.toLowerCase()];
    }
    function c(e, t) {
        b[e] = t;
    }
    function h(e) {
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
        return t ? ((n = u(e)).setAttribute("is", t), n) : (n = S(e), e.indexOf("-") >= 0 && g(n, HTMLElement), 
        n);
    }
    function d(e, t) {
        var i = e[t];
        e[t] = function() {
            var e = i.apply(this, arguments);
            return m(e), e;
        };
    }
    var f, p = (e.isIE, e.upgradeDocumentTree), m = e.upgradeAll, _ = e.upgradeWithDefinition, g = e.implementPrototype, y = e.useNative, v = [ "annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph" ], b = {}, P = "http://www.w3.org/1999/xhtml", S = document.createElement.bind(document), w = document.createElementNS.bind(document);
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
        u.ancestry = r(u.extends), o(u), s(u), t(u.prototype), c(u.__name, u), u.ctor = h(u), 
        u.ctor.prototype = u.prototype, u.prototype.constructor = u.ctor, e.ready && p(document), 
        u.ctor;
    }, document.createElement = u, document.createElementNS = function(e, t, i) {
        return e === P ? u(t, i) : w(e, t);
    }, e.registry = b, e.instanceof = f, e.reservedTagList = v, e.getRegisteredDefinition = l, 
    document.register = document.registerElement;
}), function(e) {
    function t() {
        o(window.wrap(document)), window.CustomElements.ready = !0, (window.requestAnimationFrame || function(e) {
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
        var r = function() {};
        e.watchShadow = r, e.upgrade = r, e.upgradeAll = r, e.upgradeDocumentTree = r, e.upgradeSubtree = r, 
        e.takeRecords = r, e.instanceof = function(e, t) {
            return e instanceof t;
        };
    } else n();
    var o = e.upgradeDocumentTree, s = e.upgradeDocument;
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
        var r = document.registerElement(e.is, n);
        return i || r;
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
                for (var r, o = 0; o < t.behaviors.length; o++) (r = t.behaviors[o]).registered && r.registered.call(t);
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
            for (var n, r = 0; r < this.behaviors.length; r++) (n = this.behaviors[r]).attributeChanged && n.attributeChanged.call(this, e, t, i);
            this.attributeChanged && this.attributeChanged(e, t, i);
        },
        _attributeChangedImpl: function(e) {
            this._setAttributeToProperty(this, e);
        },
        extend: function(e, t) {
            if (e && t) for (var i, n = Object.getOwnPropertyNames(t), r = 0; r < n.length && (i = n[r]); r++) this.copyOwnProperty(i, t, e);
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
        if (o) for (var e, t = document._currentScript || document.currentScript, i = (t && t.ownerDocument || document).querySelectorAll("dom-module"), n = i.length - 1; n >= 0 && (e = i[n]); n--) {
            if (e.__upgraded__) return;
            CustomElements.upgrade(e);
        }
    }
    var t = {}, i = {}, n = function(e) {
        return t[e] || i[e.toLowerCase()];
    }, r = function() {
        return document.createElement("dom-module");
    };
    r.prototype = Object.create(HTMLElement.prototype), Polymer.Base.mixin(r.prototype, {
        createdCallback: function() {
            this.register();
        },
        register: function(e) {
            (e = e || this.id || this.getAttribute("name") || this.getAttribute("is")) && (this.id = e, 
            t[e] = this, i[e.toLowerCase()] = this);
        },
        import: function(t, i) {
            if (t) {
                var r = n(t);
                return r || (e(), r = n(t)), r && i && (r = r.querySelector(i)), r;
            }
        }
    }), Object.defineProperty(r.prototype, "constructor", {
        value: r,
        configurable: !0,
        writable: !0
    });
    var o = window.CustomElements && !CustomElements.useNative;
    document.registerElement("dom-module", r);
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
        for (var t, i = Object.getOwnPropertyNames(e), n = e._noAccessors, r = 0; r < i.length && (t = i[r]); r++) Polymer.Base._behaviorProperties[t] || this.hasOwnProperty(t) || (n ? this[t] = e[t] : this.copyOwnProperty(t, e, this));
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
            for (var i, n = Object.getOwnPropertyNames(Polymer.Base), r = 0; r < n.length && (i = n[r]); r++) Polymer.BaseDescriptors[i] || (t[i] = Polymer.Base[i]);
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
            for (var r in t) i = e[r], n = t[r], ("_" !== r[0] || n.readOnly) && (e[r] ? (i.type || (i.type = n.type), 
            i.readOnly || (i.readOnly = n.readOnly)) : e[r] = {
                type: "function" == typeof n ? n : n.type,
                readOnly: n.readOnly,
                attribute: Polymer.CaseMap.camelToDashCase(r)
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
            var r = this.getAttribute(t);
            e[i] = this.deserialize(r, n.type);
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
        return e.replace(s, function(e, n, r, o) {
            return n + "'" + t(r.replace(/["']/g, ""), i) + "'" + o;
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
    var r, o, s = /(url\()([^)]*)(\))/g, a = {
        "*": [ "href", "src", "style", "url" ],
        form: [ "action" ]
    }, l = /(^\/)|(^#)|(^[\w-\d]*:)/, c = /\{\{|\[\[/;
    Polymer.ResolveUrl = {
        resolveCss: e,
        resolveAttrs: function(i, n) {
            for (var r in a) for (var o, s, l, h = a[r], u = 0, d = h.length; u < d && (o = h[u]); u++) "*" !== r && i.localName !== r || (l = (s = i.attributes[o]) && s.value) && l.search(c) < 0 && (s.value = "style" === o ? e(l, n) : t(l, n));
        },
        resolveUrl: function(e, i) {
            return r || (r = document.implementation.createHTMLDocument("temp"), o = r.createElement("base"), 
            r.head.appendChild(o)), o.href = i, t(e, r);
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
        calcEditDistances: function(e, t, i, n, r, o) {
            for (var s = o - r + 1, a = i - t + 1, l = new Array(s), c = 0; c < s; c++) l[c] = new Array(a), 
            l[c][0] = c;
            for (var h = 0; h < a; h++) l[0][h] = h;
            for (c = 1; c < s; c++) for (h = 1; h < a; h++) if (this.equals(e[t + h - 1], n[r + c - 1])) l[c][h] = l[c - 1][h - 1]; else {
                var u = l[c - 1][h] + 1, d = l[c][h - 1] + 1;
                l[c][h] = u < d ? u : d;
            }
            return l;
        },
        spliceOperationsFromEditDistances: function(e) {
            for (var t = e.length - 1, i = e[0].length - 1, n = e[t][i], r = []; t > 0 || i > 0; ) if (0 != t) if (0 != i) {
                var o, s = e[t - 1][i - 1], a = e[t - 1][i], l = e[t][i - 1];
                (o = a < l ? a < s ? a : s : l < s ? l : s) == s ? (s == n ? r.push(0) : (r.push(1), 
                n = s), t--, i--) : o == a ? (r.push(3), t--, n = a) : (r.push(2), i--, n = l);
            } else r.push(3), t--; else r.push(2), i--;
            return r.reverse(), r;
        },
        calcSplices: function(t, i, n, r, o, s) {
            var a = 0, l = 0, c = Math.min(n - i, s - o);
            if (0 == i && 0 == o && (a = this.sharedPrefix(t, r, c)), n == t.length && s == r.length && (l = this.sharedSuffix(t, r, c - a)), 
            i += a, o += a, n -= l, s -= l, n - i == 0 && s - o == 0) return [];
            if (i == n) {
                for (var h = e(i, [], 0); o < s; ) h.removed.push(r[o++]);
                return [ h ];
            }
            if (o == s) return [ e(i, [], n - i) ];
            var u = this.spliceOperationsFromEditDistances(this.calcEditDistances(t, i, n, r, o, s));
            h = void 0;
            for (var d = [], f = i, p = o, m = 0; m < u.length; m++) switch (u[m]) {
              case 0:
                h && (d.push(h), h = void 0), f++, p++;
                break;

              case 1:
                h || (h = e(f, [], 0)), h.addedCount++, f++, h.removed.push(r[p]), p++;
                break;

              case 2:
                h || (h = e(f, [], 0)), h.addedCount++, f++;
                break;

              case 3:
                h || (h = e(f, [], 0)), h.removed.push(r[p]), p++;
            }
            return h && d.push(h), d;
        },
        sharedPrefix: function(e, t, i) {
            for (var n = 0; n < i; n++) if (!this.equals(e[n], t[n])) return n;
            return i;
        },
        sharedSuffix: function(e, t, i) {
            for (var n = e.length, r = t.length, o = 0; o < i && this.equals(e[--n], t[--r]); ) o++;
            return o;
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
    function r(e, n, r) {
        switch (e.nodeType) {
          case Node.ELEMENT_NODE:
            for (var s, a = e.localName, h = "<" + a, u = e.attributes, d = 0; s = u[d]; d++) h += " " + s.name + '="' + t(s.value) + '"';
            return h += ">", l[a] ? h : h + o(e, r) + "</" + a + ">";

          case Node.TEXT_NODE:
            var f = e.data;
            return n && c[n.localName] ? f : i(f);

          case Node.COMMENT_NODE:
            return "\x3c!--" + e.data + "--\x3e";

          default:
            throw console.error(e), new Error("not implemented");
        }
    }
    function o(e, t) {
        e instanceof HTMLTemplateElement && (e = e.content);
        for (var i, n = "", o = Polymer.dom(e).childNodes, s = 0, a = o.length; s < a && (i = o[s]); s++) n += r(i, e, t);
        return n;
    }
    var s = /[&\u00A0"]/g, a = /[&\u00A0<>]/g, l = n([ "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr" ]), c = n([ "style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript" ]);
    return {
        getInnerHTML: o
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
            for (var t, n = this.getEffectiveChildNodes(), r = [], o = 0, s = n.length; o < s && (t = n[o]); o++) t.nodeType === Node.ELEMENT_NODE && i.matchesSelector.call(t, e) && r.push(t);
            return r;
        },
        getEffectiveChildNodes: function() {
            for (var e, t = [], i = this.childNodes, n = 0, s = i.length; n < s && (e = i[n]); n++) if (e.localName === r) for (var a = o(e).getDistributedNodes(), l = 0; l < a.length; l++) t.push(a[l]); else t.push(e);
            return t;
        },
        observeNodes: function(e) {
            if (e) return this.observer || (this.observer = this.node.localName === r ? new i.DistributedNodesObserver(this) : new i.EffectiveNodesObserver(this)), 
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
            var r = [];
            return this._queryElements(t.Logical.getChildNodes(i), e, n, r), r;
        },
        _queryElements: function(e, t, i, n) {
            for (var r, o = 0, s = e.length; o < s && (r = e[o]); o++) if (r.nodeType === Node.ELEMENT_NODE && this._queryElement(r, t, i, n)) return !0;
        },
        _queryElement: function(e, i, n, r) {
            var o = i(e);
            if (o && r.push(e), n && n(o)) return o;
            this._queryElements(t.Logical.getChildNodes(e), i, n, r);
        }
    };
    var r = i.CONTENT = "content", o = i.factory = function(e) {
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
    var e = Polymer.Settings, t = Polymer.DomApi, i = t.factory, n = Polymer.TreeApi, r = Polymer.domInnerHTML.getInnerHTML, o = t.CONTENT;
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
            insertBefore: function(e, r) {
                if (r && n.Logical.getParentNode(r) !== this.node) throw Error("The ref_node to be inserted before is not a child of this node");
                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
                    var s = n.Logical.getParentNode(e);
                    s ? (t.hasApi(s) && i(s).notifyObserver(), this._removeNode(e)) : this._removeOwnerShadyRoot(e);
                }
                if (!this._addNode(e, r)) {
                    r && (r = r.localName === o ? this._firstComposedNode(r) : r);
                    var a = this.node._isShadyRoot ? this.node.host : this.node;
                    r ? n.Composed.insertBefore(a, e, r) : n.Composed.appendChild(a, e);
                }
                return this.notifyObserver(), e;
            },
            _addNode: function(e, t) {
                var i = this.getOwnerRoot();
                if (i) {
                    var r = this._maybeAddInsertionPoint(e, this.node);
                    i._invalidInsertionPoints || (i._invalidInsertionPoints = r), this._addNodeToHost(i.host, e);
                }
                n.Logical.hasChildNodes(this.node) && n.Logical.recordInsertBefore(e, this.node, t);
                var o = this._maybeDistribute(e) || this.node.shadyRoot;
                if (o) if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE) for (;e.firstChild; ) n.Composed.removeChild(e, e.firstChild); else {
                    var s = n.Composed.getParentNode(e);
                    s && n.Composed.removeChild(s, e);
                }
                return o;
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
                var t, r = n.Logical.hasParentNode(e) && n.Logical.getParentNode(e), o = this._ownerShadyRootForNode(e);
                return r && (t = i(e)._maybeDistributeParent(), n.Logical.recordRemoveChild(e, r), 
                o && this._removeDistributedChildren(o, e) && (o._invalidInsertionPoints = !0, this._lazyDistribute(o.host))), 
                this._removeOwnerShadyRoot(e), o && this._removeNodeFromHost(o.host, e), t;
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
                var t = e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && !e.__noContent && i(e).querySelector(o), r = t && n.Logical.getParentNode(t).nodeType !== Node.DOCUMENT_FRAGMENT_NODE, s = t || e.localName === o;
                if (s) {
                    var a = this.getOwnerRoot();
                    a && this._lazyDistribute(a.host);
                }
                var l = this._nodeNeedsDistribution(this.node);
                return l && this._lazyDistribute(this.node), l || s && !r;
            },
            _maybeAddInsertionPoint: function(e, t) {
                var r;
                if (e.nodeType !== Node.DOCUMENT_FRAGMENT_NODE || e.__noContent) e.localName === o && (n.Logical.saveChildNodes(t), 
                n.Logical.saveChildNodes(e), r = !0); else for (var s, a, l, c = i(e).querySelectorAll(o), h = 0; h < c.length && (s = c[h]); h++) (a = n.Logical.getParentNode(s)) === e && (a = t), 
                l = this._maybeAddInsertionPoint(s, a), r = r || l;
                return r;
            },
            _updateInsertionPoints: function(e) {
                for (var t, r = e.shadyRoot._insertionPoints = i(e.shadyRoot).querySelectorAll(o), s = 0; s < r.length; s++) t = r[s], 
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
                for (var r, o = e._insertionPoints, s = 0; s < o.length; s++) {
                    var a = o[s];
                    if (this._contains(t, a)) for (var l = i(a).getDistributedNodes(), c = 0; c < l.length; c++) {
                        r = !0;
                        var h = l[c], u = n.Composed.getParentNode(h);
                        u && n.Composed.removeChild(u, h);
                    }
                }
                return r;
            },
            _contains: function(e, t) {
                for (;t; ) {
                    if (t == e) return !0;
                    t = n.Logical.getParentNode(t);
                }
            },
            _removeOwnerShadyRoot: function(e) {
                if (this._hasCachedOwnerRoot(e)) for (var t, i = n.Logical.getChildNodes(e), r = 0, o = i.length; r < o && (t = i[r]); r++) this._removeOwnerShadyRoot(t);
                e._ownerShadyRoot = void 0;
            },
            _firstComposedNode: function(e) {
                for (var t, n, r = i(e).getDistributedNodes(), o = 0, s = r.length; o < s && (t = r[o]); o++) if ((n = i(t).getDestinationInsertionPoints())[n.length - 1] === e) return t;
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
                if (e) for (var n, r = this.childNodes, o = i(t), a = 0; a < r.length; a++) n = i(r[a]).cloneNode(!0), 
                o.appendChild(n);
                return t;
            },
            importNode: function(e, t) {
                var r = this.node instanceof Document ? this.node : this.node.ownerDocument, o = a.call(r, e, !1);
                if (t) for (var s, l = n.Logical.getChildNodes(e), c = i(o), h = 0; h < l.length; h++) s = i(r).importNode(l[h], !0), 
                c.appendChild(s);
                return o;
            },
            _getComposedInnerHTML: function() {
                return r(this.node, !0);
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
                    for (var t, i = [], n = 0, r = this.childNodes; t = r[n]; n++) t.nodeType !== Node.COMMENT_NODE && i.push(t.textContent);
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
                    return e === Node.TEXT_NODE || e === Node.COMMENT_NODE ? null : r(this.node);
                },
                set: function(e) {
                    var t = this.node.nodeType;
                    if (t !== Node.TEXT_NODE || t !== Node.COMMENT_NODE) {
                        this._clear();
                        var i = document.createElement("div");
                        i.innerHTML = e;
                        for (var r = n.arrayCopyChildNodes(i), o = 0; o < r.length; o++) this.appendChild(r[o]);
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
        var r = function(e) {
            Object.defineProperty(i.prototype, e, {
                get: function() {
                    return this.node[e];
                },
                configurable: !0
            });
        };
        !function(e) {
            for (var t = 0; t < e.length; t++) r(e[t]);
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
                var r = this._generateListenerInfo(e, i);
                (r || e._alwaysNotify) && this._callListener(e, r);
            }
        },
        _getEffectiveNodes: function() {
            return this.domApi.getEffectiveChildNodes();
        },
        _generateListenerInfo: function(e, t) {
            if (e._avoidChangeCalculation) return !0;
            for (var i, n = e._nodes, r = {
                target: this.node,
                addedNodes: [],
                removedNodes: []
            }, o = Polymer.ArraySplice.calculateSplices(t, n), s = 0; s < o.length && (i = o[s]); s++) for (var a, l = 0; l < i.removed.length && (a = i.removed[l]); l++) r.removedNodes.push(a);
            for (s = 0, i; s < o.length && (i = o[s]); s++) for (l = i.index; l < i.index + i.addedCount; l++) r.addedNodes.push(t[l]);
            return e._nodes = t, r.addedNodes.length || r.removedNodes.length ? r : void 0;
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
        i && i.shadyRoot && h.hasInsertionPoint(i.shadyRoot) && i.shadyRoot._distributionClean && (i.shadyRoot._distributionClean = !1, 
        t.shadyRoot._dirtyRoots.push(i));
    }
    function n(e, t) {
        var i = t._destinationInsertionPoints;
        return i && i[i.length - 1] === e;
    }
    function r(e) {
        return "content" == e.localName;
    }
    function o(e) {
        for (;e && s(e); ) e = e.domHost;
        return e;
    }
    function s(e) {
        for (var t, i = u.Logical.getChildNodes(e), n = 0; n < i.length; n++) if ((t = i[n]).localName && "content" === t.localName) return e.domHost;
    }
    function a(e) {
        for (var t, i = 0; i < e._insertionPoints.length; i++) t = e._insertionPoints[i], 
        h.hasApi(t) && Polymer.dom(t).notifyObserver();
    }
    function l(e) {
        h.hasApi(e) && Polymer.dom(e).notifyObserver();
    }
    function c(e) {
        if (f && e) for (var t = 0; t < e.length; t++) CustomElements.upgrade(e[t]);
    }
    var h = Polymer.DomApi, u = Polymer.TreeApi;
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
            this._useContent && (this._createLocalRoot(), this.dataHost || c(u.Logical.getChildNodes(this)));
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
                var t = o(this);
                Polymer.dom(this)._lazyDistribute(t);
            }
        },
        _distributeContent: function() {
            this._useContent && !this.shadyRoot._distributionClean && (this.shadyRoot._invalidInsertionPoints && (Polymer.dom(this)._updateInsertionPoints(this), 
            this.shadyRoot._invalidInsertionPoints = !1), this._beginDistribute(), this._distributeDirtyRoots(), 
            this._finishDistribute());
        },
        _beginDistribute: function() {
            this._useContent && h.hasInsertionPoint(this.shadyRoot) && (this._resetDistribution(), 
            this._distributePool(this.shadyRoot, this._collectPool()));
        },
        _distributeDirtyRoots: function() {
            for (var e, t = this.shadyRoot._dirtyRoots, i = 0, n = t.length; i < n && (e = t[i]); i++) e._distributeContent();
            this.shadyRoot._dirtyRoots = [];
        },
        _finishDistribute: function() {
            if (this._useContent) {
                if (this.shadyRoot._distributionClean = !0, h.hasInsertionPoint(this.shadyRoot)) this._composeTree(), 
                a(this.shadyRoot); else if (this.shadyRoot._hasDistributed) {
                    var e = this._composeNode(this);
                    this._updateChildNodes(this, e);
                } else u.Composed.clearChildNodes(this), this.appendChild(this.shadyRoot);
                this.shadyRoot._hasDistributed || l(this), this.shadyRoot._hasDistributed = !0;
            }
        },
        elementMatches: function(e, t) {
            return t = t || this, h.matchesSelector.call(t, e);
        },
        _resetDistribution: function() {
            for (var e = u.Logical.getChildNodes(this), i = 0; i < e.length; i++) {
                var n = e[i];
                n._destinationInsertionPoints && (n._destinationInsertionPoints = void 0), r(n) && t(n);
            }
            for (var o = this.shadyRoot._insertionPoints, s = 0; s < o.length; s++) o[s]._distributedNodes = [];
        },
        _collectPool: function() {
            for (var e = [], t = u.Logical.getChildNodes(this), i = 0; i < t.length; i++) {
                var n = t[i];
                r(n) ? e.push.apply(e, n._distributedNodes) : e.push(n);
            }
            return e;
        },
        _distributePool: function(e, t) {
            for (var n, r = e._insertionPoints, o = 0, s = r.length; o < s && (n = r[o]); o++) this._distributeInsertionPoint(n, t), 
            i(n, this);
        },
        _distributeInsertionPoint: function(t, i) {
            for (var n, r = !1, o = 0, s = i.length; o < s; o++) (n = i[o]) && this._matchesContentSelect(n, t) && (e(n, t), 
            i[o] = void 0, r = !0);
            if (!r) for (var a = u.Logical.getChildNodes(t), l = 0; l < a.length; l++) e(a[l], t);
        },
        _composeTree: function() {
            this._updateChildNodes(this, this._composeNode(this));
            for (var e, t, i = this.shadyRoot._insertionPoints, n = 0, r = i.length; n < r && (e = i[n]); n++) (t = u.Logical.getParentNode(e))._useContent || t === this || t === this.shadyRoot || this._updateChildNodes(t, this._composeNode(t));
        },
        _composeNode: function(e) {
            for (var t = [], i = u.Logical.getChildNodes(e.shadyRoot || e), o = 0; o < i.length; o++) {
                var s = i[o];
                if (r(s)) for (var a = s._distributedNodes, l = 0; l < a.length; l++) {
                    var c = a[l];
                    n(s, c) && t.push(c);
                } else t.push(s);
            }
            return t;
        },
        _updateChildNodes: function(e, t) {
            for (var i = u.Composed.getChildNodes(e), n = Polymer.ArraySplice.calculateSplices(t, i), r = 0, o = 0; r < n.length && (l = n[r]); r++) {
                for (var s, a = 0; a < l.removed.length && (s = l.removed[a]); a++) u.Composed.getParentNode(s) === e && u.Composed.removeChild(e, s), 
                i.splice(l.index + o, 1);
                o -= l.addedCount;
            }
            for (var l, c, r = 0; r < n.length && (l = n[r]); r++) for (c = i[l.index], a = l.index, 
            s; a < l.index + l.addedCount; a++) s = t[a], u.Composed.insertBefore(e, s, c), 
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
            for (var t, i = this._bindingRegex, n = [], r = 0; null !== (t = i.exec(e)); ) {
                t.index > r && n.push({
                    literal: e.slice(r, t.index)
                });
                var o, s, a, l = t[1][0], c = Boolean(t[2]), h = t[3].trim();
                "{" == l && (a = h.indexOf("::")) > 0 && (s = h.substring(a + 2), h = h.substring(0, a), 
                o = !0), n.push({
                    compoundIndex: n.length,
                    value: h,
                    mode: l,
                    negate: c,
                    event: s,
                    customEvent: o
                }), r = i.lastIndex;
            }
            if (r && r < e.length) {
                var u = e.substring(r);
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
            if (e.firstChild) for (var r = e.firstChild, o = 0; r; ) {
                var s = r.nextSibling;
                if ("template" !== r.localName || r.hasAttribute("preserve-content") || this._parseTemplate(r, o, i, t, n), 
                "slot" == r.localName && (r = this._replaceSlotWithContent(r)), r.nodeType === Node.TEXT_NODE) {
                    for (var a = s; a && a.nodeType === Node.TEXT_NODE; ) r.textContent += a.textContent, 
                    s = a.nextSibling, e.removeChild(a), a = s;
                    n && !r.textContent.trim() && (e.removeChild(r), o--);
                }
                if (r.parentNode) {
                    var l = this._parseNodeAnnotations(r, i, n);
                    l && (l.parent = t, l.index = o);
                }
                r = s, o++;
            }
        },
        _replaceSlotWithContent: function(e) {
            for (var t = e.ownerDocument.createElement("content"); e.firstChild; ) t.appendChild(e.firstChild);
            for (var i = e.attributes, n = 0; n < i.length; n++) {
                var r = i[n];
                t.setAttribute(r.name, r.value);
            }
            var o = e.getAttribute("name");
            return o && t.setAttribute("select", "[slot='" + o + "']"), e.parentNode.replaceChild(t, e), 
            t;
        },
        _parseTemplate: function(e, t, i, n, r) {
            var o = document.createDocumentFragment();
            o._notes = this.parseAnnotations(e, r), o.appendChild(e.content), i.push({
                bindings: Polymer.nar,
                events: Polymer.nar,
                templateContent: o,
                parent: n,
                index: t
            });
        },
        _parseNodeAttributeAnnotations: function(e, t) {
            for (var i, n = Array.prototype.slice.call(e.attributes), r = n.length - 1; i = n[r]; r--) {
                var o, s = i.name, a = i.value;
                "on-" === s.slice(0, 3) ? (e.removeAttribute(s), t.events.push({
                    name: s.slice(3),
                    value: a
                })) : (o = this._parseNodeAttributeAnnotation(e, s, a)) ? t.bindings.push(o) : "id" === s && (t.id = a);
            }
        },
        _parseNodeAttributeAnnotation: function(t, i, n) {
            var r = this._parseBindings(n);
            if (r) {
                var o = i, s = "property";
                "$" == i[i.length - 1] && (i = i.slice(0, -1), s = "attribute");
                var a = this._literalFromParts(r);
                a && "attribute" == s && t.setAttribute(i, a), "input" === t.localName && "value" === o && t.setAttribute(o, ""), 
                e && "disable-upgrade$" === o && t.setAttribute(i, ""), t.removeAttribute(o);
                var l = Polymer.CaseMap.dashToCamelCase(i);
                return "property" === s && (i = l), {
                    kind: s,
                    name: i,
                    propertyName: l,
                    parts: r,
                    literal: a,
                    isCompound: 1 !== r.length
                };
            }
        },
        findAnnotatedNode: function(e, t) {
            var i = t.parent && Polymer.Annotations.findAnnotatedNode(e, t.parent);
            if (!i) return e;
            for (var n = i.firstChild, r = 0; n; n = n.nextSibling) if (t.index === r++) return n;
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
            for (var i = e[t], n = 0; n < i.bindings.length; n++) for (var r = i.bindings[n], o = 0; o < r.parts.length; o++) {
                var s = r.parts[o];
                if (!s.literal) {
                    var a = this._parseMethod(s.value);
                    a ? s.signature = a : s.model = Polymer.Path.root(s.value);
                }
            }
            if (i.templateContent) {
                this._processAnnotations(i.templateContent._notes);
                var l = i.templateContent._parentProps = this._discoverTemplateParentProps(i.templateContent._notes), c = [];
                for (var h in l) {
                    var u = "_parent_" + h;
                    c.push({
                        index: i.index,
                        kind: "property",
                        name: u,
                        propertyName: u,
                        parts: [ {
                            mode: "{",
                            model: h,
                            value: h
                        } ]
                    });
                }
                i.bindings = i.bindings.concat(c);
            }
        }
    },
    _discoverTemplateParentProps: function(e) {
        for (var t, i = {}, n = 0; n < e.length && (t = e[n]); n++) {
            for (var r, o = 0, s = t.bindings; o < s.length && (r = s[o]); o++) for (var a, l = 0, c = r.parts; l < c.length && (a = c[l]); l++) if (a.signature) {
                for (var h = a.signature.args, u = 0; u < h.length; u++) {
                    var d = h[u].model;
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
            var n = e[i], r = t[i];
            this._configureTemplateContent(n, r), this._configureCompoundBindings(n, r);
        }
    },
    _configureTemplateContent: function(e, t) {
        e.templateContent && (t._content = e.templateContent);
    },
    _configureCompoundBindings: function(e, t) {
        for (var i = e.bindings, n = 0; n < i.length; n++) {
            var r = i[n];
            if (r.isCompound) {
                for (var o = t.__compoundStorage__ || (t.__compoundStorage__ = {}), s = r.parts, a = new Array(s.length), l = 0; l < s.length; l++) a[l] = s[l].literal;
                var c = r.name;
                o[c] = a, r.literal && "property" == r.kind && (t._configValue ? t._configValue(c, r.literal) : t[c] = r.literal);
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
        for (var e, t = 0, i = this._notes.length; t < i && (e = this._notes[t]); t++) if (e.events && e.events.length) for (var n, r = this._findAnnotatedNode(this.root, e), o = 0, s = e.events; o < s.length && (n = s[o]); o++) this.listen(r, n.name, n.value);
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
    _recordEventHandler: function(e, t, i, n, r) {
        var o = e.__boundListeners;
        o || (o = e.__boundListeners = new WeakMap());
        var s = o.get(i);
        s || (s = {}, Polymer.Settings.isIE && i == window || o.set(i, s)), s[this._boundListenerKey(t, n)] = r;
    },
    _recallEventHandler: function(e, t, i, n) {
        var r = e.__boundListeners;
        if (r) {
            var o = r.get(i);
            if (o) return o[this._boundListenerKey(t, n)];
        }
    },
    _createEventHandler: function(e, t, i) {
        var n = this, r = function(e) {
            n[i] ? n[i](e, e.detail) : n._warn(n._logf("_createEventHandler", "listener method `" + i + "` not defined"));
        };
        return r._listening = !1, this._recordEventHandler(n, t, e, i, r), r;
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
        if (!e(t) && "touchend" !== t) return c && _ && Polymer.Settings.passiveTouchGestures ? {
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
    function r(e) {
        if ("click" === e.type) {
            if (0 === e.detail) return !0;
            var t = b.findOriginalTarget(e).getBoundingClientRect(), i = e.pageX, n = e.pageY;
            return !(i >= t.left && i <= t.right && n >= t.top && n <= t.bottom);
        }
        return !1;
    }
    function o(e) {
        for (var t, i = Polymer.dom(e).path, n = "auto", r = 0; r < i.length; r++) if ((t = i[r])[u]) {
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
    var l = Polymer.DomApi.wrap, c = "string" == typeof document.head.style.touchAction, h = "__polymerGesturesHandled", u = "__polymerGesturesTouchAction", d = 2500, f = [ "mousedown", "mousemove", "mouseup", "click" ], p = [ 0, 1, 4, 2 ], m = function() {
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
        if ((!t || t.firesTouchEvents) && (e[h] = {
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
                var r = n[i];
                if (r) {
                    if (!e[h] && (e[h] = {}, "touch" === i.slice(0, 5))) {
                        var o = e.changedTouches[0];
                        if ("touchstart" === i && 1 === e.touches.length && (v.touch.id = o.identifier), 
                        v.touch.id !== o.identifier) return;
                        c || "touchstart" !== i && "touchmove" !== i || b.handleTouchAction(e);
                    }
                    if (!(t = e[h]).skip) {
                        for (var s, a = b.recognizers, u = 0; u < a.length; u++) r[(s = a[u]).name] && !t[s.name] && s.flow && s.flow.start.indexOf(e.type) > -1 && s.reset && s.reset();
                        for (u = 0, s; u < a.length; u++) r[(s = a[u]).name] && !t[s.name] && (t[s.name] = !0, 
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
                var n = o(e), r = !1, s = Math.abs(v.touch.x - t.clientX), a = Math.abs(v.touch.y - t.clientY);
                e.cancelable && ("none" === n ? r = !0 : "pan-x" === n ? r = a > s : "pan-y" === n && (r = s > a)), 
                r ? e.preventDefault() : b.prevent("track");
            }
        },
        add: function(i, n, r) {
            i = l(i);
            var o = this.gestures[n], s = o.deps, a = o.name, c = i.__polymerGestures;
            c || (i.__polymerGestures = c = {});
            for (var h, u, d = 0; d < s.length; d++) h = s[d], g && e(h) && "click" !== h || ((u = c[h]) || (c[h] = u = {
                _count: 0
            }), 0 === u._count && i.addEventListener(h, this.handleNative, t(h)), u[a] = (u[a] || 0) + 1, 
            u._count = (u._count || 0) + 1);
            i.addEventListener(n, r), o.touchAction && this.setTouchAction(i, o.touchAction);
        },
        remove: function(e, i, n) {
            e = l(e);
            var r = this.gestures[i], o = r.deps, s = r.name, a = e.__polymerGestures;
            if (a) for (var c, h, u = 0; u < o.length; u++) (h = a[c = o[u]]) && h[s] && (h[s] = (h[s] || 1) - 1, 
            h._count = (h._count || 1) - 1, 0 === h._count && e.removeEventListener(c, this.handleNative, t(c)));
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
            c && (e.style.touchAction = t), e[u] = t;
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
                var t = b.findOriginalTarget(e), i = this, r = function(e) {
                    var r = e.clientX, o = e.clientY;
                    i.hasMovedEnough(r, o) && (i.info.state = i.info.started ? "mouseup" === e.type ? "end" : "track" : "start", 
                    "start" === i.info.state && b.prevent("tap"), i.info.addMove({
                        x: r,
                        y: o
                    }), n(e) || (i.info.state = "end", a(i.info)), i.fire(t, e), i.info.started = !0);
                };
                s(this.info, r, function(e) {
                    i.info.started && r(e), a(i.info);
                }), this.info.x = e.clientX, this.info.y = e.clientY;
            }
        },
        touchstart: function(e) {
            var t = e.changedTouches[0];
            this.info.x = t.clientX, this.info.y = t.clientY;
        },
        touchmove: function(e) {
            var t = b.findOriginalTarget(e), i = e.changedTouches[0], n = i.clientX, r = i.clientY;
            this.hasMovedEnough(n, r) && ("start" === this.info.state && b.prevent("tap"), this.info.addMove({
                x: n,
                y: r
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
            var n, r = this.info.moves[this.info.moves.length - 2], o = this.info.moves[this.info.moves.length - 1], s = o.x - this.info.x, a = o.y - this.info.y, l = 0;
            return r && (n = o.x - r.x, l = o.y - r.y), b.fire(e, "track", {
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
            var i = Math.abs(e.clientX - this.info.x), n = Math.abs(e.clientY - this.info.y), o = b.findOriginalTarget(e);
            (isNaN(i) || isNaN(n) || i <= 25 && n <= 25 || r(e)) && (this.info.prevent || b.fire(o, "tap", {
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
            var r = void 0 === i.bubbles || i.bubbles, o = Boolean(i.cancelable), s = i._useCache, a = this._getEvent(e, r, o, s);
            return a.detail = t, s && (this.__eventCache[e] = null), n.dispatchEvent(a), s && (this.__eventCache[e] = a), 
            a;
        },
        __eventCache: {},
        _getEvent: function(e, t, i, n) {
            var r = n && this.__eventCache[e];
            return r && r.bubbles == t && r.cancelable == i || (r = new Event(e, {
                bubbles: Boolean(t),
                cancelable: i
            })), r;
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
            var r = document.createElement("link");
            r.rel = "import", r.href = e;
            var o = Polymer.Base.importHref.imported = Polymer.Base.importHref.imported || {}, s = o[r.href], a = s || r, l = this, c = function(e) {
                return e.target.__firedLoad = !0, e.target.removeEventListener("load", c), e.target.removeEventListener("error", h), 
                t.call(l, e);
            }, h = function(e) {
                return e.target.__firedError = !0, e.target.removeEventListener("load", c), e.target.removeEventListener("error", h), 
                i.call(l, e);
            };
            return t && a.addEventListener("load", c), i && a.addEventListener("error", h), 
            s ? (s.__firedLoad && s.dispatchEvent(new Event("load")), s.__firedError && s.dispatchEvent(new Event("error"))) : (o[r.href] = r, 
            (n = Boolean(n)) && r.setAttribute("async", ""), document.head.appendChild(r)), 
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
        Polymer.Base.importHref = function(t, i, n, r) {
            CustomElements.ready = !1;
            return e.call(this, t, function(e) {
                if (CustomElements.upgradeDocumentTree(document), CustomElements.ready = !0, i) return i.call(this, e);
            }, n, r);
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
            var r = this.__data__[e];
            return r === t || r != r && t != t || (this.__data__[e] = t, "object" == typeof t && this._clearPath(e), 
            this._propertyChanged && this._propertyChanged(e, t, r), i && this._effectEffects(e, t, i, r, n)), 
            r;
        },
        __setProperty: function(e, t, i, n) {
            var r = (n = n || this)._propertyEffects && n._propertyEffects[e];
            r ? n._propertySetter(e, t, r, i) : n[e] !== t && (n[e] = t);
        },
        _effectEffects: function(e, t, i, n, r) {
            for (var o, s = 0, a = i.length; s < a && (o = i[s]); s++) o.fn.call(this, e, this[e], o.effect, n, r);
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
        var r = this.ensurePropertyEffects(e, t), o = {
            kind: i,
            effect: n,
            fn: Polymer.Bind["_" + i + "Effect"]
        };
        return r.push(o), o;
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
        }, r = function(e) {
            this._propertySetter(t, e, i);
        }, o = e.getPropertyInfo && e.getPropertyInfo(t);
        o && o.readOnly ? o.computed || (e["_set" + this.upper(t)] = r) : n.set = r, Object.defineProperty(e, t, n);
    },
    upper: function(e) {
        return e[0].toUpperCase() + e.substring(1);
    },
    _addAnnotatedListener: function(e, t, i, n, r, o) {
        e._bindListeners || (e._bindListeners = []);
        var s = this._notedListenerFactory(i, n, Polymer.Path.isDeep(n), o), a = r || Polymer.CaseMap.camelToDashCase(i) + "-changed";
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
        return function(r, o, s) {
            if (s) {
                var a = Polymer.Path.translate(e, t, s);
                this._notifyPath(a, o);
            } else o = r[e], n && (o = !o), i ? this.__data__[t] != o && this.set(t, o) : this[t] = o;
        };
    },
    prepareInstance: function(e) {
        e.__data__ = Object.create(null);
    },
    setupBindListeners: function(e) {
        for (var t, i = e._bindListeners, n = 0, r = i.length; n < r && (t = i[n]); n++) {
            var o = e._nodes[t.index];
            this._addNotifyListener(o, e, t.event, t.changedFn);
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
    _notifyEffect: function(e, t, i, n, r) {
        r || this._notifyChange(e, i.event, t);
    },
    _functionEffect: function(e, t, i, n, r) {
        i.call(this, e, t, n, r);
    },
    _observerEffect: function(e, t, i, n) {
        var r = this[i.method];
        r ? r.call(this, t, n) : this._warn(this._logf("_observerEffect", "observer method `" + i.method + "` not defined"));
    },
    _complexObserverEffect: function(e, t, i) {
        var n = this[i.method];
        if (n) {
            var r = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            r && n.apply(this, r);
        } else i.dynamicFn || this._warn(this._logf("_complexObserverEffect", "observer method `" + i.method + "` not defined"));
    },
    _computeEffect: function(e, t, i) {
        var n = this[i.method];
        if (n) {
            var r = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            if (r) {
                var o = n.apply(this, r);
                this.__setProperty(i.name, o);
            }
        } else i.dynamicFn || this._warn(this._logf("_computeEffect", "compute method `" + i.method + "` not defined"));
    },
    _annotatedComputationEffect: function(e, t, i) {
        var n = this._rootDataHost || this, r = n[i.method];
        if (r) {
            var o = Polymer.Bind._marshalArgs(this.__data__, i, e, t);
            if (o) {
                var s = r.apply(n, o);
                this._applyEffectValue(i, s);
            }
        } else i.dynamicFn || n._warn(n._logf("_annotatedComputationEffect", "compute method `" + i.method + "` not defined"));
    },
    _marshalArgs: function(e, t, i, n) {
        for (var r = [], o = t.args, s = o.length > 1 || t.dynamicFn, a = 0, l = o.length; a < l; a++) {
            var c, h = o[a], u = h.name;
            if (h.literal ? c = h.value : i === u ? c = n : void 0 === (c = e[u]) && h.structured && (c = Polymer.Base._get(u, e)), 
            s && void 0 === c) return;
            if (h.wildcard) {
                var d = Polymer.Path.isAncestor(i, u);
                r[a] = {
                    path: d ? i : u,
                    value: d ? n : c,
                    base: c
                };
            } else r[a] = c;
        }
        return r;
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
        for (var i, n = this._parseMethod(t), r = n.dynamicFn, o = 0; o < n.args.length && (i = n.args[o]); o++) this._addPropertyEffect(i.model, "compute", {
            method: n.method,
            args: n.args,
            trigger: i,
            name: e,
            dynamicFn: r
        });
        r && this._addPropertyEffect(n.method, "compute", {
            method: n.method,
            args: n.args,
            trigger: null,
            name: e,
            dynamicFn: r
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
        for (var i, n = t.dynamicFn, r = 0; r < t.args.length && (i = t.args[r]); r++) this._addPropertyEffect(i.model, "complexObserver", {
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
        for (var t, i = 0; i < e.length && (t = e[i]); i++) for (var n, r = t.bindings, o = 0; o < r.length && (n = r[o]); o++) this._addAnnotationEffect(n, i);
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
            for (var r, o = 0; o < n.args.length && (r = n.args[o]); o++) r.literal || this.__addAnnotatedComputationEffect(r.model, i, e, t, r);
            n.dynamicFn && this.__addAnnotatedComputationEffect(n.method, i, e, t, null);
        }
    },
    __addAnnotatedComputationEffect: function(e, t, i, n, r) {
        this._addPropertyEffect(e, "annotatedComputation", {
            index: t,
            isCompound: i.isCompound,
            compoundIndex: n.compoundIndex,
            kind: i.kind,
            name: i.name,
            negate: n.negate,
            method: n.signature.method,
            args: n.signature.args,
            trigger: r,
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
            var r = i._propertyInfo && i._propertyInfo[n];
            if (r && r.readOnly) return;
            this.__setProperty(n, t, Polymer.Settings.suppressBindingNotifications, i);
        }
    },
    _computeFinalAnnotationValue: function(e, t, i, n) {
        if (n.negate && (i = !i), n.isCompound) {
            var r = e.__compoundStorage__[t];
            r[n.compoundIndex] = i, i = r.join("");
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
                    var r = n.value;
                    "function" == typeof r && (r = r.call(this, this._config)), t[i] = r;
                }
            }
        },
        _distributeConfig: function(e) {
            var t = this._propertyEffects;
            if (t) for (var i in e) {
                var n = t[i];
                if (n) for (var r, o = 0, s = n.length; o < s && (r = n[o]); o++) if ("annotation" === r.kind) {
                    var a = this._nodes[r.effect.index], l = r.effect.propertyName, c = "attribute" == r.effect.kind, h = a._propertyEffects && a._propertyEffects[l];
                    if (a._configValue && (h || !c)) {
                        var u = i === r.effect.value ? e[i] : this._get(r.effect.value, e);
                        u = this._computeFinalAnnotationValue(a, l, u, r.effect), c && (u = a.deserialize(this.serialize(u), a._propertyInfo[l].type)), 
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
            var n = {}, r = this._get(e, this, n);
            1 === arguments.length && (t = r), n.path && this._notifyPath(n.path, t, i);
        },
        _notifyPath: function(e, t, i) {
            var n = this._propertySetter(e, t);
            if (n !== t && (n == n || t == t)) return this._pathEffector(e, t), i || this._notifyPathUp(e, t), 
            !0;
        },
        _getPathParts: function(e) {
            if (Array.isArray(e)) {
                for (var t = [], i = 0; i < e.length; i++) for (var n = e[i].toString().split("."), r = 0; r < n.length; r++) t.push(n[r]);
                return t;
            }
            return e.toString().split(".");
        },
        set: function(e, t, i) {
            var n, r = i || this, o = this._getPathParts(e), s = o[o.length - 1];
            if (o.length > 1) {
                for (var a = 0; a < o.length - 1; a++) {
                    var l = o[a];
                    if (n && "#" == l[0] ? r = Polymer.Collection.get(n).getItem(l) : (r = r[l], n && parseInt(l, 10) == l && (o[a] = Polymer.Collection.get(n).getKey(r))), 
                    !r) return;
                    n = Array.isArray(r) ? r : null;
                }
                if (n) {
                    var c, h, u = Polymer.Collection.get(n);
                    "#" == s[0] ? (h = s, c = u.getItem(h), s = n.indexOf(c), u.setItem(h, t)) : parseInt(s, 10) == s && (c = r[s], 
                    h = u.getKey(c), o[a] = h, u.setItem(h, t));
                }
                r[s] = t, i || this._notifyPath(o.join("."), t);
            } else r[e] = t;
        },
        get: function(e, t) {
            return this._get(e, t);
        },
        _get: function(e, t, i) {
            for (var n, r = t || this, o = this._getPathParts(e), s = 0; s < o.length; s++) {
                if (!r) return;
                var a = o[s];
                n && "#" == a[0] ? r = Polymer.Collection.get(n).getItem(a) : (r = r[a], i && n && parseInt(a, 10) == a && (o[s] = Polymer.Collection.get(n).getKey(r))), 
                n = Array.isArray(r) ? r : null;
            }
            return i && (i.path = o.join(".")), r;
        },
        _pathEffector: function(t, i) {
            var n = e.root(t), r = this._propertyEffects && this._propertyEffects[n];
            if (r) for (var o, s = 0; s < r.length && (o = r[s]); s++) {
                var a = o.pathFn;
                a && a.call(this, t, i, o.effect);
            }
            this._boundPaths && this._notifyBoundPaths(t, i);
        },
        _annotationPathEffect: function(t, i, n) {
            if (e.matches(n.value, !1, t)) Polymer.Bind._annotationEffect.call(this, t, i, n); else if (!n.negate && e.isDescendant(n.value, t)) {
                var r = this._nodes[n.index];
                if (r && r._notifyPath) {
                    var o = e.translate(n.value, n.name, t);
                    r._notifyPath(o, i, !0);
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
                var r = this._boundPaths[n];
                e.isDescendant(n, t) ? this._notifyPath(e.translate(n, r, t), i) : e.isDescendant(r, t) && this._notifyPath(e.translate(r, n, t), i);
            }
        },
        _notifyPathUp: function(t, i) {
            var n = e.root(t), r = Polymer.CaseMap.camelToDashCase(n) + this._EVENT_CHANGED;
            this.fire(r, {
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
            }, r = t + ".splices";
            this._notifyPath(r, n), this._notifyPath(t + ".length", e.length), this.__data__[r] = {
                keySplices: null,
                indexSplices: null
            };
        },
        _notifySplice: function(e, t, i, n, r) {
            this._notifySplices(e, t, [ {
                index: i,
                addedCount: n,
                removed: r,
                object: e,
                type: "splice"
            } ]);
        },
        push: function(e) {
            var t = {}, i = this._get(e, this, t), n = Array.prototype.slice.call(arguments, 1), r = i.length, o = i.push.apply(i, n);
            return n.length && this._notifySplice(i, t.path, r, n.length, []), o;
        },
        pop: function(e) {
            var t = {}, i = this._get(e, this, t), n = Boolean(i.length), r = Array.prototype.slice.call(arguments, 1), o = i.pop.apply(i, r);
            return n && this._notifySplice(i, t.path, i.length, 0, [ o ]), o;
        },
        splice: function(e, t) {
            var i = {}, n = this._get(e, this, i);
            (t = t < 0 ? n.length - Math.floor(-t) : Math.floor(t)) || (t = 0);
            var r = Array.prototype.slice.call(arguments, 1), o = n.splice.apply(n, r), s = Math.max(r.length - 2, 0);
            return (s || o.length) && this._notifySplice(n, i.path, t, s, o), o;
        },
        shift: function(e) {
            var t = {}, i = this._get(e, this, t), n = Boolean(i.length), r = Array.prototype.slice.call(arguments, 1), o = i.shift.apply(i, r);
            return n && this._notifySplice(i, t.path, 0, 0, [ o ]), o;
        },
        unshift: function(e) {
            var t = {}, i = this._get(e, this, t), n = Array.prototype.slice.call(arguments, 1), r = i.unshift.apply(i, n);
            return n.length && this._notifySplice(i, t.path, 0, n.length, []), r;
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
        }, i = t, n = 0, r = e.length; n < r; n++) switch (e[n]) {
          case this.OPEN_BRACE:
            i.rules || (i.rules = []);
            var o = i;
            i = {
                start: n + 1,
                parent: o,
                previous: o.rules[o.rules.length - 1]
            }, o.rules.push(i);
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
            var r = e.parsedSelector = e.selector = i.trim();
            e.atRule = 0 === r.indexOf(this.AT_START), e.atRule ? 0 === r.indexOf(this.MEDIA_START) ? e.type = this.types.MEDIA_RULE : r.match(this._rx.keyframesRule) && (e.type = this.types.KEYFRAMES_RULE, 
            e.keyframesName = e.selector.split(this._rx.multipleSpaces).pop()) : 0 === r.indexOf(this.VAR_START) ? e.type = this.types.MIXIN_RULE : e.type = this.types.STYLE_RULE;
        }
        var o = e.rules;
        if (o) for (var s, a = 0, l = o.length; a < l && (s = o[a]); a++) this._parseCss(s, t);
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
            var r = e.rules;
            if (r && !this._hasMixinRules(r)) for (var o, s = 0, a = r.length; s < a && (o = r[s]); s++) n = this.stringify(o, t, n); else (n = (n = t ? e.cssText : this.removeCustomProps(e.cssText)).trim()) && (n = "  " + n + "\n");
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
            if (e) for (var n, r = 0, o = e.length; r < o && (n = e[r]); r++) this.forEachRuleInStyle(n, t, i);
        },
        forActiveRulesInStyles: function(e, t, i) {
            if (e) for (var n, r = 0, o = e.length; r < o && (n = e[r]); r++) this.forEachRuleInStyle(n, t, i, !0);
        },
        rulesForStyle: function(e) {
            return !e.__cssRules && e.textContent && (e.__cssRules = this.parser.parse(e.textContent)), 
            e.__cssRules;
        },
        isKeyframesSelector: function(e) {
            return e.parent && e.parent.type === this.ruleTypes.KEYFRAMES_RULE;
        },
        forEachRuleInStyle: function(e, t, i, n) {
            var r, o, s = this.rulesForStyle(e);
            t && (r = function(i) {
                t(i, e);
            }), i && (o = function(t) {
                i(t, e);
            }), this.forEachRule(s, r, o, n);
        },
        forEachRule: function(e, t, i, n) {
            if (e) {
                var r = !1;
                if (n && e.type === this.ruleTypes.MEDIA_RULE) {
                    var o = e.selector.match(this.rx.MEDIA_MATCH);
                    o && (window.matchMedia(o[1]).matches || (r = !0));
                }
                e.type === this.ruleTypes.STYLE_RULE ? t(e) : i && e.type === this.ruleTypes.KEYFRAMES_RULE ? i(e) : e.type === this.ruleTypes.MIXIN_RULE && (r = !0);
                var s = e.rules;
                if (s && !r) for (var a, l = 0, c = s.length; l < c && (a = s[l]); l++) this.forEachRule(a, t, i, n);
            }
        },
        applyCss: function(e, t, i, n) {
            var r = this.createScopeStyle(e, t);
            return this.applyStyle(r, i, n);
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
            for (var i = e.trim().split(/\s+/), n = "", r = 0; r < i.length; r++) n += this.cssFromModule(i[r], t);
            return n;
        },
        cssFromModule: function(e, t) {
            var i = Polymer.DomModule.import(e);
            return i && !i._cssText && (i._cssText = this.cssFromElement(i)), !i && t && console.warn("Could not find style data in module named", e), 
            i && i._cssText || "";
        },
        cssFromElement: function(t) {
            for (var i, n = "", r = t.content || t, o = Polymer.TreeApi.arrayCopy(r.querySelectorAll(this.MODULE_STYLES_SELECTOR)), s = 0; s < o.length; s++) if ("template" === (i = o[s]).localName) i.hasAttribute("preserve-content") || (n += this.cssFromElement(i)); else if ("style" === i.localName) {
                var a = i.getAttribute(this.INCLUDE_ATTR);
                a && (n += this.cssFromModules(a, !0)), (i = i.__appliedElement || i).parentNode.removeChild(i);
                var l = this.resolveCss(i.textContent, t.ownerDocument);
                !e.useNativeShadow && i.hasAttribute(this.SHADY_UNSCOPED_ATTR) ? (i.textContent = l, 
                document.head.insertBefore(i, document.head.firstChild)) : n += l;
            } else if (i.import && i.import.body) {
                var c = this.resolveCss(i.import.body.textContent, i.import);
                if (!e.useNativeShadow && i.hasAttribute(this.SHADY_UNSCOPED_ATTR)) {
                    if (!this.unscopedStyleImports.has(i.import)) {
                        this.unscopedStyleImports.set(i.import, !0);
                        var h = document.createElement("style");
                        h.setAttribute(this.SHADY_UNSCOPED_ATTR, ""), h.textContent = c, document.head.insertBefore(h, document.head.firstChild);
                    }
                } else n += c;
            }
            return n;
        },
        styleIncludesToTemplate: function(e) {
            for (var t, i = e.content.querySelectorAll("style[include]"), n = 0; n < i.length; n++) (t = i[n]).parentNode.insertBefore(this._includesToFragment(t.getAttribute("include")), t);
        },
        _includesToFragment: function(e) {
            for (var t = e.trim().split(" "), i = document.createDocumentFragment(), n = 0; n < t.length; n++) {
                var r = Polymer.DomModule.import(t[n], "template");
                r && this._addStylesToFragment(i, r.content);
            }
            return i;
        },
        _addStylesToFragment: function(e, t) {
            for (var i, n = t.querySelectorAll("style"), r = 0; r < n.length; r++) {
                var o = (i = n[r]).getAttribute("include");
                o && e.appendChild(this._includesToFragment(o)), i.textContent && e.appendChild(i.cloneNode(!0));
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
            for (var i = 0, n = t, r = e.length; n < r; n++) switch (e[n]) {
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
            var n = this._findMatchingParen(e, i + 3), r = e.substring(i + 4, n), o = e.substring(0, i), s = this.processVariableAndFallback(e.substring(n + 1), t), a = r.indexOf(",");
            return -1 === a ? t(o, r.trim(), "", s) : t(o, r.substring(0, a).trim(), r.substring(a + 1).trim(), s);
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
            for (var r = Polymer.dom(e).childNodes, o = 0; o < r.length; o++) this._transformDom(r[o], t, i, n);
        },
        element: function(e, t, i, r) {
            if (i) r ? e.removeAttribute(n) : e.setAttribute(n, t); else if (t) if (e.classList) r ? (e.classList.remove(n), 
            e.classList.remove(t)) : (e.classList.add(n), e.classList.add(t)); else if (e.getAttribute) {
                var o = e.getAttribute(v);
                r ? o && e.setAttribute(v, o.replace(n, "").replace(t, "")) : e.setAttribute(v, (o ? o + " " : "") + n + " " + t);
            }
        },
        elementStyles: function(i, n) {
            var r, o = i._styles, s = "", a = i.__cssBuild, l = t.useNativeShadow || "shady" === a;
            if (l) {
                var h = this;
                r = function(e) {
                    e.selector = h._slottedToContent(e.selector), e.selector = e.selector.replace(c, ":host > *"), 
                    e.selector = h._dirShadowTransform(e.selector), n && n(e);
                };
            }
            for (var u, d = 0, f = o.length; d < f && (u = o[d]); d++) {
                var p = e.rulesForStyle(u);
                s += l ? e.toCssText(p, r) : this.css(p, i.is, i.extends, n, i._scopeCssViaAttr) + "\n\n";
            }
            return s.trim();
        },
        css: function(t, i, n, r, o) {
            var s = this._calcHostScope(i, n);
            i = this._calcElementScope(i, o);
            var a = this;
            return e.toCssText(t, function(e) {
                e.isScoped || (a.rule(e, i, s), e.isScoped = !0), r && r(e, i, s);
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
            for (var i = [], n = "", r = 0; r >= 0 && r < t.length; r++) if ("(" === t[r]) {
                var s = e._findMatchingParen(t, r);
                n += t.slice(r, s + 1), r = s;
            } else t[r] === o ? (i.push(n), n = "") : n += t[r];
            return n && i.push(n), 0 === i.length && i.push(t), i;
        },
        _transformRuleCss: function(t, i, n, r) {
            var s = this._splitSelectorList(t.selector);
            if (!e.isKeyframesSelector(t)) for (var a, l = 0, c = s.length; l < c && (a = s[l]); l++) s[l] = i.call(this, a, n, r);
            return s.join(o);
        },
        _ensureScopedDir: function(e) {
            var t = e.match(C);
            return t && "" === t[1] && t[0].length === e.length && (e = "*" + e), e;
        },
        _additionalDirSelectors: function(e, t, i) {
            return e && t ? (i = i || "", o + i + " " + e + " " + t) : "";
        },
        _transformComplexSelector: function(e, t, i) {
            var n = !1, r = !1, a = !1, h = this;
            return e = e.trim(), e = this._slottedToContent(e), e = e.replace(c, ":host > *"), 
            e = e.replace(b, l + " $1"), e = this._ensureScopedDir(e), e = e.replace(s, function(e, o, s) {
                if (n) s = s.replace(p, " "); else {
                    var l = h._transformCompoundSelector(s, o, t, i);
                    n = n || l.stop, r = r || l.hostContext, a = a || l.dir, o = l.combinator, s = l.value;
                }
                return o + s;
            }), r && (e = e.replace(d, function(e, t, n, r) {
                var s = t + n + " " + i + r + o + " " + t + i + n + r;
                return a && (s += h._additionalDirSelectors(n, r, i)), s;
            })), e;
        },
        _transformDir: function(e) {
            return e = e.replace(x, N), e = e.replace(C, E);
        },
        _transformCompoundSelector: function(e, t, i, n) {
            var r = e.search(p), o = !1, s = !1;
            e.match(C) && (e = this._transformDir(e), s = !0), e.indexOf(u) >= 0 ? o = !0 : e.indexOf(l) >= 0 ? e = this._transformHostSelector(e, n) : 0 !== r && (e = i ? this._transformSimpleSelector(e, i) : e), 
            e.indexOf(f) >= 0 && (t = "");
            var a;
            return r >= 0 && (e = e.replace(p, " "), a = !0), {
                value: e,
                combinator: t,
                stop: a,
                hostContext: o,
                dir: s
            };
        },
        _transformSimpleSelector: function(e, t) {
            var i = e.split(y);
            return i[0] += t, i.join(y);
        },
        _transformHostSelector: function(e, t) {
            var i = e.match(h), n = i && i[2].trim() || "";
            return n ? n[0].match(a) ? e.replace(h, function(e, i, n) {
                return t + n;
            }) : n.split(a)[0] === t ? n : P : e.replace(l, t);
        },
        documentRule: function(e) {
            e.selector = e.parsedSelector, this.normalizeRootSelector(e), t.useNativeShadow || this._transformRule(e, this._transformDocumentSelector);
        },
        normalizeRootSelector: function(e) {
            e.selector = e.selector.replace(c, "html");
            var t = this._splitSelectorList(e.selector);
            t = t.filter(function(e) {
                return !e.match(w);
            }), e.selector = t.join(o);
        },
        _transformDocumentSelector: function(e) {
            return this._transformComplexSelector(e, r);
        },
        _slottedToContent: function(e) {
            return e.replace(S, f + "> $1");
        },
        _dirShadowTransform: function(e) {
            return e.match(/:dir\(/) ? this._splitSelectorList(e).map(function(e) {
                e = this._ensureScopedDir(e), e = this._transformDir(e);
                var t = d.exec(e);
                return t && (e += this._additionalDirSelectors(t[2], t[3], "")), e;
            }, this).join(o) : e;
        },
        SCOPE_NAME: "style-scope"
    }, n = i.SCOPE_NAME, r = ":not([" + n + "]):not(." + n + ")", o = ",", s = /(^|[\s>+~]+)((?:\[.+?\]|[^\s>+~=\[])+)/g, a = /[[.:#*]/, l = ":host", c = ":root", h = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/, u = ":host-context", d = /(.*)(?::host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))(.*)/, f = "::content", p = /::content|::shadow|\/deep\//, m = ".", _ = "[" + n + "~=", g = "]", y = ":", v = "class", b = new RegExp("^(" + f + ")"), P = "should_not_match", S = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/g, w = /:host(?:\s*>\s*\*)?/, C = /(.*):dir\((ltr|rtl)\)/, E = ':host-context([dir="$2"]) $1', x = /:host\(:dir\((rtl|ltr)\)\)/g, N = ':host-context([dir="$1"])';
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
                    var i = t[1], r = n._findExtendor(i, e);
                    r && n._extendRule(e, r);
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
        for (var t, n, r, o, s = e.split(";"), a = {}, l = 0; l < s.length; l++) (r = s[l]) && (o = r.split(":")).length > 1 && (n = i(t = o[0].trim(), o.slice(1).join(":")), 
        a[t] = n);
        return a;
    }
    function r(e) {
        var t = g.__currentElementProto, i = t && t.is;
        for (var n in e.dependants) n !== i && (e.dependants[n].__applyShimInvalid = !0);
    }
    function o(i, o, s, a) {
        if (s && c.processVariableAndFallback(s, function(e, i) {
            i && t(i) && (a = "@apply " + i + ";");
        }), !a) return i;
        var h = l(a), u = i.slice(0, i.indexOf("--")), d = n(h), f = d, p = t(o), _ = p && p.properties;
        _ ? (f = Object.create(_), f = Polymer.Base.mixin(f, d)) : e(o, f);
        var g, y, v = [], b = !1;
        for (g in f) void 0 === (y = d[g]) && (y = "initial"), !_ || g in _ || (b = !0), 
        v.push(o + m + g + ": " + y);
        return b && r(p), p && (p.properties = f), s && (u = i + ";" + u), u + v.join("; ") + ";";
    }
    function s(e, t, i) {
        return "var(" + t + ",var(" + i + "))";
    }
    function a(i, n) {
        var r = [], o = t(i = i.replace(f, ""));
        if (o || (e(i, {}), o = t(i)), o) {
            var s = g.__currentElementProto;
            s && (o.dependants[s.is] = s);
            var a, l, c;
            for (a in o.properties) c = n && n[a], l = [ a, ": var(", i, m, a ], c && l.push(",", c), 
            l.push(")"), r.push(l.join(""));
        }
        return r.join("; ");
    }
    function l(e) {
        for (var t; t = h.exec(e); ) {
            var i = t[0], r = t[1], o = t.index, s = o + i.indexOf("@apply"), l = o + i.length, c = e.slice(0, s), u = e.slice(l), d = a(r, n(c));
            e = [ c, d, u ].join(""), h.lastIndex = o + d.length;
        }
        return e;
    }
    var c = Polymer.StyleUtil, h = c.rx.MIXIN_MATCH, u = c.rx.VAR_ASSIGN, d = /var\(\s*(--[^,]*),\s*(--[^)]*)\)/g, f = /;\s*/m, p = /^\s*(initial)|(inherit)\s*$/, m = "_-_", _ = {}, g = {
        _measureElement: null,
        _map: _,
        _separator: m,
        transform: function(e, t) {
            this.__currentElementProto = t, c.forRulesInStyles(e, this._boundFindDefinitions), 
            c.forRulesInStyles(e, this._boundFindApplications), t && (t.__applyShimInvalid = !1), 
            this.__currentElementProto = null;
        },
        _findDefinitions: function(e) {
            var t = e.parsedCssText;
            t = (t = t.replace(d, s)).replace(u, o), e.cssText = t, ":root" === e.selector && (e.selector = ":host > *");
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
    var e = Polymer.Base._prepElement, t = Polymer.Settings.useNativeShadow, i = Polymer.StyleUtil, n = Polymer.StyleTransformer, r = Polymer.StyleExtends, o = Polymer.ApplyShim, s = Polymer.Settings;
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
                this._styles = this._styles || this._collectStyles(), s.useNativeCSSProperties && !this.__cssBuild && o.transform(this._styles, this);
                var r = s.useNativeCSSProperties && e ? this._styles.length && this._styles[0].textContent.trim() : n.elementStyles(this);
                this._prepStyleProperties(), !this._needsStyleProperties() && r && i.applyCss(r, this.is, t ? this._template.content : null, this._scopeStyle);
            } else this._styles = [];
        },
        _collectStyles: function() {
            var e = [], t = "", n = this.styleModules;
            if (n) for (var o, s = 0, a = n.length; s < a && (o = n[s]); s++) t += i.cssFromModule(o);
            t += i.cssFromModule(this.is);
            var l = this._template && this._template.parentNode;
            if (!this._template || l && l.id.toLowerCase() === this.is || (t += i.cssFromElement(this._template)), 
            t) {
                var c = document.createElement("style");
                c.textContent = t, r.hasExtends(c.textContent) && (t = r.transform(c)), e.push(c);
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
                var n = this, r = function(e) {
                    if (e.nodeType === Node.ELEMENT_NODE) {
                        var t = e.getAttribute("class");
                        e.setAttribute("class", n._scopeElementClass(e, t));
                        for (var i, r = e.querySelectorAll("*"), o = 0; o < r.length && (i = r[o]); o++) t = i.getAttribute("class"), 
                        i.setAttribute("class", n._scopeElementClass(i, t));
                    }
                };
                if (r(e), i) {
                    var o = new MutationObserver(function(e) {
                        for (var t, i = 0; i < e.length && (t = e[i]); i++) if (t.addedNodes) for (var n = 0; n < t.addedNodes.length; n++) r(t.addedNodes[n]);
                    });
                    return o.observe(e, {
                        childList: !0,
                        subtree: !0
                    }), o;
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
    var t = Polymer.DomApi.matchesSelector, i = Polymer.StyleUtil, n = Polymer.StyleTransformer, r = navigator.userAgent.match("Trident"), o = Polymer.Settings;
    return {
        decorateStyles: function(e, t) {
            var r = this, o = {}, s = [], a = 0, l = n._calcHostScope(t.is, t.extends);
            i.forRulesInStyles(e, function(e, n) {
                r.decorateRule(e), e.index = a++, r.whenHostOrRootRule(t, e, n, function(n) {
                    if (e.parent.type === i.ruleTypes.MEDIA_RULE && (t.__notStyleScopeCacheable = !0), 
                    n.isHost) {
                        var r = n.selector.split(" ").some(function(e) {
                            return 0 === e.indexOf(l) && e.length !== l.length;
                        });
                        t.__notStyleScopeCacheable = t.__notStyleScopeCacheable || r;
                    }
                }), r.collectPropertiesInCssText(e.propertyInfo.cssText, o);
            }, function(e) {
                s.push(e);
            }), e._keyframes = s;
            var c = [];
            for (var h in o) c.push(h);
            return c;
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
                for (var n, r, o, s = this.rx.VAR_ASSIGN, a = e.parsedCssText; n = s.exec(a); ) "inherit" !== (r = (n[2] || n[3]).trim()) && (t[n[1].trim()] = r), 
                o = !0;
                return o;
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
                var n = this, r = function(e, i, r, o) {
                    var s = n.valueForProperty(t[i], t);
                    return s && "initial" !== s ? "apply-shim-inherit" === s && (s = "inherit") : s = n.valueForProperty(t[r] || r, t) || r, 
                    e + (s || "") + o;
                };
                e = i.processVariableAndFallback(e, r);
            }
            return e && e.trim() || "";
        },
        valueForProperties: function(e, t) {
            for (var i, n, r = e.split(";"), o = 0; o < r.length; o++) if (i = r[o]) {
                if (this.rx.MIXIN_MATCH.lastIndex = 0, n = this.rx.MIXIN_MATCH.exec(i)) i = this.valueForProperty(t[n[1]], t); else {
                    var s = i.indexOf(":");
                    if (-1 !== s) {
                        var a = i.substring(s);
                        a = a.trim(), a = this.valueForProperty(a, t) || a, i = i.substring(0, s) + a;
                    }
                }
                r[o] = i && i.lastIndexOf(";") === i.length - 1 ? i.slice(0, -1) : i || "";
            }
            return r.join(";");
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
                    for (var r in t) i !== (n = (0, t[r])(i)) && (i = n, e.keyframeNamesToTransform.push(r));
                } else {
                    for (var o = 0; o < e.keyframeNamesToTransform.length; ++o) i = (0, t[e.keyframeNamesToTransform[o]])(i);
                    n = i;
                }
            }
            e.cssText = n;
        },
        propertyDataFromStyles: function(n, r) {
            var o = {}, s = this, a = [];
            return i.forActiveRulesInStyles(n, function(i) {
                i.propertyInfo || s.decorateRule(i);
                var n = i.transformedSelector || i.parsedSelector;
                r && i.propertyInfo.properties && n && t.call(r, n) && (s.collectProperties(i, o), 
                e(i.index, a));
            }), {
                properties: o,
                key: a
            };
        },
        _rootSelector: /:root|:host\s*>\s*\*/,
        _checkRoot: function(e, t) {
            return Boolean(t.match(this._rootSelector)) || "html" === e && t.indexOf("html") > -1;
        },
        whenHostOrRootRule: function(e, t, i, r) {
            if (t.propertyInfo || self.decorateRule(t), t.propertyInfo.properties) {
                var s = e.is ? n._calcHostScope(e.is, e.extends) : "html", a = t.parsedSelector, l = this._checkRoot(s, a), c = !l && 0 === a.indexOf(":host");
                if ("shady" === (e.__cssBuild || i.__cssBuild) && (c = !(l = a === s + " > *." + s || a.indexOf("html") > -1) && 0 === a.indexOf(s)), 
                l || c) {
                    var h = s;
                    c && (o.useNativeShadow && !t.transformedSelector && (t.transformedSelector = n._transformRuleCss(t, n._transformComplexSelector, e.is, s)), 
                    h = t.transformedSelector || t.parsedSelector), l && "html" === s && (h = t.transformedSelector || t.parsedSelector), 
                    r({
                        selector: h,
                        isHost: c,
                        isRoot: l
                    });
                }
            }
        },
        hostAndRootPropertiesForScope: function(e) {
            var n = {}, r = {}, o = this;
            return i.forActiveRulesInStyles(e._styles, function(i, s) {
                o.whenHostOrRootRule(e, i, s, function(s) {
                    var a = e._element || e;
                    t.call(a, s.selector) && (s.isHost ? o.collectProperties(i, n) : o.collectProperties(i, r));
                });
            }), {
                rootProps: r,
                hostProps: n
            };
        },
        transformStyles: function(e, t, i) {
            var r = this, s = n._calcHostScope(e.is, e.extends), a = e.extends ? "\\" + s.slice(0, -1) + "\\]" : s, l = new RegExp(this.rx.HOST_PREFIX + a + this.rx.HOST_SUFFIX), c = this._elementKeyframeTransforms(e, i);
            return n.elementStyles(e, function(n) {
                r.applyProperties(n, t), o.useNativeShadow || Polymer.StyleUtil.isKeyframesSelector(n) || !n.cssText || (r.applyKeyframeTransforms(n, c), 
                r._scopeSelector(n, l, s, e._scopeCssViaAttr, i));
            });
        },
        _elementKeyframeTransforms: function(e, t) {
            var i = e._styles._keyframes, n = {};
            if (!o.useNativeShadow && i) for (var r = 0, s = i[r]; r < i.length; s = i[++r]) this._scopeKeyframes(s, t), 
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
        _scopeSelector: function(e, t, i, r, o) {
            e.transformedSelector = e.transformedSelector || e.selector;
            for (var s, a = e.transformedSelector, l = n._calcElementScope(o, r), c = n._calcElementScope(i, r), h = a.split(","), u = this._hasDirOrHostContext(e.parsedSelector), d = 0, f = h.length; d < f && (s = h[d]); d++) h[d] = s.match(t) ? s.replace(i, l) : u ? s.replace(c, l + " " + c) : l + " " + s;
            e.selector = h.join(",");
        },
        applyElementScopeSelector: function(e, t, i, r) {
            var o = r ? e.getAttribute(n.SCOPE_NAME) : e.getAttribute("class") || "", s = i ? o.replace(i, t) : (o ? o + " " : "") + this.XSCOPE_NAME + " " + t;
            o !== s && (r ? e.setAttribute(n.SCOPE_NAME, s) : e.setAttribute("class", s));
        },
        applyElementStyle: function(e, t, n, s) {
            var a = s ? s.textContent || "" : this.transformStyles(e, t, n), l = e._customStyle;
            return l && !o.useNativeShadow && l !== s && (l._useCount--, l._useCount <= 0 && l.parentNode && l.parentNode.removeChild(l)), 
            o.useNativeShadow ? e._customStyle ? (e._customStyle.textContent = a, s = e._customStyle) : a && (s = i.applyCss(a, n, e.root, e._scopeStyle)) : s ? s.parentNode || (r && a.indexOf("@media") > -1 && (s.textContent = a), 
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
            var r = [];
            for (var o in t) null !== t[o] && (e.style.setProperty(o, t[o]), r.push(o));
            e.__customStyleProperties = r;
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
        var r = this.cache[e] = this.cache[e] || [];
        r.push(t), r.length > this.MAX && r.shift();
    },
    retrieve: function(e, t, i) {
        var n = this.cache[e];
        if (n) for (var r, o = n.length - 1; o >= 0; o--) if (r = n[o], i === r.styles && this._objectsEqual(t, r.keyValues)) return r;
    },
    clear: function() {
        this.cache = {};
    },
    _objectsEqual: function(e, t) {
        var i, n;
        for (var r in e) if (i = e[r], n = t[r], !("object" == typeof i && i ? this._objectsStrictlyEqual(i, n) : i === n)) return !1;
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
            for (var n, r = 0; r < this._styles.length; r++) (n = (n = this._styles[r]).__importElement || n)._apply();
            i && e.updateNativeStyleProperties(document.documentElement, this.customStyle);
        }
    };
}(), function() {
    "use strict";
    var e = Polymer.Base.serializeValueToAttribute, t = Polymer.StyleProperties, i = Polymer.StyleTransformer, n = Polymer.StyleDefaults, r = Polymer.Settings.useNativeShadow, o = Polymer.Settings.useNativeCSSProperties;
    Polymer.Base._addFeature({
        _prepStyleProperties: function() {
            o || (this._ownStylePropertyNames = this._styles && this._styles.length ? t.decorateStyles(this._styles, this) : null);
        },
        customStyle: null,
        getComputedStyleValue: function(e) {
            return o || this._styleProperties || this._computeStyleProperties(), !o && this._styleProperties && this._styleProperties[e] || getComputedStyle(this).getPropertyValue(e);
        },
        _setupStyleProperties: function() {
            this.customStyle = {}, this._styleCache = null, this._styleProperties = null, this._scopeSelector = null, 
            this._ownStyleProperties = null, this._customStyle = null;
        },
        _needsStyleProperties: function() {
            return Boolean(!o && this._ownStylePropertyNames && this._ownStylePropertyNames.length);
        },
        _validateApplyShim: function() {
            if (this.__applyShimInvalid) {
                Polymer.ApplyShim.transform(this._styles, this.__proto__);
                var e = i.elementStyles(this);
                if (r) {
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
            var n = t.propertyDataFromStyles(i._styles, this), o = !this.__notStyleScopeCacheable;
            o && (n.key.customStyle = this.customStyle, e = i._styleCache.retrieve(this.is, n.key, this._styles));
            var a = Boolean(e);
            a ? this._styleProperties = e._styleProperties : this._computeStyleProperties(n.properties), 
            this._computeOwnStyleProperties(), a || (e = s.retrieve(this.is, this._ownStyleProperties, this._styles));
            var l = Boolean(e) && !a, c = this._applyStyleProperties(e);
            a || (e = {
                style: c = c && r ? c.cloneNode(!0) : c,
                _scopeSelector: this._scopeSelector,
                _styleProperties: this._styleProperties
            }, o && (n.key.customStyle = {}, this.mixin(n.key.customStyle, this.customStyle), 
            i._styleCache.store(this.is, e, n.key, this._styles)), l || s.store(this.is, Object.create(e), this._ownStyleProperties, this._styles));
        },
        _computeStyleProperties: function(e) {
            var i = this._findStyleHost();
            i._styleProperties || i._computeStyleProperties();
            var n = Object.create(i._styleProperties), r = t.hostAndRootPropertiesForScope(this);
            this.mixin(n, r.hostProps), e = e || t.propertyDataFromStyles(i._styles, this).properties, 
            this.mixin(n, e), this.mixin(n, r.rootProps), t.mixinCustomStyle(n, this.customStyle), 
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
            return r || t.applyElementScopeSelector(this, this._scopeSelector, i, this._scopeCssViaAttr), 
            n;
        },
        serializeValueToAttribute: function(t, i, n) {
            if (n = n || this, "class" === i && !r) {
                var o = n === this ? this.domHost || this.dataHost : this;
                o && (t = o._scopeElementClass(n, t));
            }
            n = this.shadyRoot && this.shadyRoot._hasDistributed ? Polymer.dom(n) : n, e.call(this, t, i, n);
        },
        _scopeElementClass: function(e, t) {
            return r || this._scopeCssViaAttr || (t = (t ? t + " " : "") + a + " " + this.is + (e._scopeSelector ? " " + l + " " + e._scopeSelector : "")), 
            t;
        },
        updateStyles: function(e) {
            e && this.mixin(this.customStyle, e), o ? t.updateNativeStyleProperties(this, this.customStyle) : (this.isAttached ? this._needsStyleProperties() ? this._updateStyleProperties() : this._styleProperties = null : this.__stylePropertiesInvalid = !0, 
            this._styleCache && this._styleCache.clear(), this._updateRootStyles());
        },
        _updateRootStyles: function(e) {
            e = e || this.root;
            for (var t, i = Polymer.dom(e)._query(function(e) {
                return e.shadyRoot || e.shadowRoot;
            }), n = 0, r = i.length; n < r && (t = i[n]); n++) t.updateStyles && t.updateStyles();
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
    var e, t = Polymer.StyleProperties, i = Polymer.StyleUtil, n = Polymer.CssParse, r = Polymer.StyleDefaults, o = Polymer.StyleTransformer, s = Polymer.ApplyShim, a = Polymer.Debounce, l = Polymer.Settings;
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
                if (l.useNativeCSSProperties || (this.__needsUpdateStyles = r.hasStyleProperties(), 
                r.addStyle(e)), e.textContent || this.include) this._apply(!0); else {
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
                var n = this.__cssBuild, r = i.isTargetedBuild(n);
                if (!l.useNativeCSSProperties || !r) {
                    var a = i.rulesForStyle(t);
                    if (r || (i.forEachRule(a, function(e) {
                        o.documentRule(e);
                    }), l.useNativeCSSProperties && !n && s.transform([ t ])), l.useNativeCSSProperties) t.textContent = i.toCssText(a); else {
                        var c = this, h = function() {
                            c._flushCustomProperties();
                        };
                        e ? Polymer.RenderStatus.whenReady(h) : h();
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
            var r = this._styleProperties, o = i.rulesForStyle(e);
            o && (e.textContent = i.toCssText(o, function(e) {
                var i = e.cssText = e.parsedCssText;
                e.propertyInfo && e.propertyInfo.cssText && (i = n.removeCustomPropAssignment(i), 
                e.cssText = t.valueForProperties(i, r));
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
            var n, r = e._parentPropProto;
            if (!r) {
                for (n in this._instanceProps) delete i[n];
                r = e._parentPropProto = Object.create(null), t != this && (Polymer.Bind.prepareModel(r), 
                Polymer.Base.prepareModelNotifyPath(r));
                for (n in i) {
                    var o = this._parentPropPrefix + n, s = [ {
                        kind: "function",
                        effect: this._createForwardPropEffector(n),
                        fn: Polymer.Bind._functionEffect
                    }, {
                        kind: "notify",
                        fn: Polymer.Bind._notifyEffect,
                        effect: {
                            event: Polymer.CaseMap.camelToDashCase(o) + "-changed"
                        }
                    } ];
                    r._propertyEffects = r._propertyEffects || {}, r._propertyEffects[o] = s, Polymer.Bind._createAccessors(r, o, s);
                }
            }
            var a = this;
            t != this && (Polymer.Bind.prepareInstance(t), t._forwardParentProp = function(e, t) {
                a._forwardParentProp(e, t);
            }), this._extendTemplate(t, r), t._pathEffector = function(e, t, i) {
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
        return function(t, i, n, r) {
            r || this.dataHost._forwardInstanceProp(this, e, i);
        };
    },
    _extendTemplate: function(e, t) {
        var i = Object.getOwnPropertyNames(t);
        t._propertySetter && (e._propertySetter = t._propertySetter);
        for (var n, r = 0; r < i.length && (n = i[r]); r++) {
            var o = e[n];
            if (o && "_propertyEffects" == n) {
                var s = Polymer.Base.mixin({}, o);
                e._propertyEffects = Polymer.Base.mixin(s, t._propertyEffects);
            } else {
                var a = Object.getOwnPropertyDescriptor(t, n);
                Object.defineProperty(e, n, a), void 0 !== o && e._propertySetter(n, o);
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
        var n = this, r = this._rootDataHost, o = r._createEventHandler(e, t, i);
        r._listen(e, t, function(e) {
            e.model = n, o(e);
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
            var r = i[n];
            r && "object" == typeof r ? e.set(r, n) : t[r] = n;
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
        for (var t, i, n = {}, r = 0; r < e.length && (i = e[r]); r++) {
            i.addedKeys = [];
            for (var o = 0; o < i.removed.length; o++) n[t = this.getKey(i.removed[o])] = n[t] ? null : -1;
            for (o = 0; o < i.addedCount; o++) {
                var s = this.userArray[i.index + o];
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
        var r = this;
        for (this._filterFn && (e = e.filter(function(e) {
            return r._filterFn(t.getItem(e));
        })), this._sortFn && e.sort(function(e, i) {
            return r._sortFn(t.getItem(e), t.getItem(i));
        }), n = 0; n < e.length; n++) {
            var o = e[n], s = this._instances[n];
            s ? (s.__key__ = o, !s.isPlaceholder && n < this._limit && s.__setProperty(this.as, t.getItem(o), !0)) : n < this._limit ? this._insertInstance(n, o) : this._insertPlaceholder(n, o);
        }
        for (var a = this._instances.length - 1; a >= n; a--) this._detachAndRemoveInstance(a);
    },
    _numericSort: function(e, t) {
        return e - t;
    },
    _applySplicesUserSort: function(e) {
        for (var t, i, n = this.collection, r = {}, o = 0; o < e.length && (i = e[o]); o++) {
            for (var s = 0; s < i.removed.length; s++) r[t = i.removed[s]] = r[t] ? null : -1;
            for (s = 0; s < i.added.length; s++) r[t = i.added[s]] = r[t] ? null : 1;
        }
        var a = [], l = [];
        for (t in r) -1 === r[t] && a.push(this._keyToInstIdx[t]), 1 === r[t] && l.push(t);
        if (a.length) for (a.sort(this._numericSort), o = a.length - 1; o >= 0; o--) {
            var c = a[o];
            void 0 !== c && this._detachAndRemoveInstance(c);
        }
        var h = this;
        if (l.length) {
            this._filterFn && (l = l.filter(function(e) {
                return h._filterFn(n.getItem(e));
            })), l.sort(function(e, t) {
                return h._sortFn(n.getItem(e), n.getItem(t));
            });
            var u = 0;
            for (o = 0; o < l.length; o++) u = this._insertRowUserSort(u, l[o]);
        }
    },
    _insertRowUserSort: function(e, t) {
        for (var i = this.collection, n = i.getItem(t), r = this._instances.length - 1, o = -1; e <= r; ) {
            var s = e + r >> 1, a = this._instances[s].__key__, l = this._sortFn(i.getItem(a), n);
            if (l < 0) e = s + 1; else {
                if (!(l > 0)) {
                    o = s;
                    break;
                }
                r = s - 1;
            }
        }
        return o < 0 && (o = r + 1), this._insertPlaceholder(o, t), o;
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
        var n = this._instances[e + 1], r = n && !n.isPlaceholder ? n._children[0] : this, o = Polymer.dom(this).parentNode;
        return o.localName == this.is && (r == this && (r = o), o = Polymer.dom(o).parentNode), 
        Polymer.dom(o).insertBefore(i.root, r), this._instances[e] = i, i;
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
        for (var i, n = this._instances, r = 0; r < n.length && (i = n[r]); r++) i.isPlaceholder || i.__setProperty(e, t, !0);
    },
    _forwardParentPath: function(e, t) {
        for (var i, n = this._instances, r = 0; r < n.length && (i = n[r]); r++) i.isPlaceholder || i._notifyPath(e, t, !0);
    },
    _forwardItemPath: function(e, t) {
        if (this._keyToInstIdx) {
            var i = e.indexOf("."), n = e.substring(0, i < 0 ? e.length : i), r = this._keyToInstIdx[n], o = this._instances[r];
            o && !o.isPlaceholder && (i >= 0 ? (e = this.as + "." + e.substring(i + 1), o._notifyPath(e, t, !0)) : o.__setProperty(this.as, t, !0));
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
            if (i && i.length && Polymer.dom(e).previousSibling !== i[i.length - 1]) for (var n, r = 0; r < i.length && (n = i[r]); r++) Polymer.dom(t).insertBefore(n, e);
        } else {
            this._instance = this.stamp();
            var o = this._instance.root;
            Polymer.dom(t).insertBefore(o, e);
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
}, Polymer.IronSelection = function(e) {
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
                var r = this._indexToValue(n);
                return void this._itemActivate(r, t);
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
}, function() {
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
            n) for (var r, o = 0; r = n[o]; o++) if (r.animatable) r.animatable._getAnimationConfigRecursive(r.type || e, t, i); else if (r.id) {
                var s = t[r.id];
                s ? (s.isClone || (t[r.id] = this._cloneConfig(s), s = t[r.id]), this._copyProperties(s, r)) : t[r.id] = r;
            } else i.push(r);
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
            var r = document.createElement(i.name);
            if (r.isNeonAnimation) {
                var o = null;
                try {
                    "function" != typeof (o = r.configure(i)).cancel && (o = document.timeline.play(o));
                } catch (e) {
                    o = null, console.warn("Couldnt play", "(", i.name, ").", e);
                }
                o && t.push({
                    neonAnimation: r,
                    config: i,
                    animation: o
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
                for (var r = 0; r < n.length; r++) n[r].animation.onfinish = function() {
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
Polymer({
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
        !t || !e) for (var i, n = Polymer.dom(this.$.content).getDistributedNodes(), r = 0; i = n[r]; r++) i.classList && i.classList.remove("neon-animating");
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
        for (var n, r = {
            transform: [ "webkitTransform" ],
            transformOrigin: [ "mozTransformOrigin", "webkitTransformOrigin" ]
        }[t], o = 0; n = r[o]; o++) e.style[n] = i;
        e.style[t] = i;
    },
    complete: function() {}
}, function(e, t) {
    var i = {}, n = {}, r = {};
    !function(e, t) {
        function i() {
            this._delay = 0, this._endDelay = 0, this._fill = "none", this._iterationStart = 0, 
            this._iterations = 1, this._duration = 0, this._playbackRate = 1, this._direction = "normal", 
            this._easing = "linear", this._easingFunction = y;
        }
        function n() {
            return e.isDeprecated("Invalid timing inputs", "2016-03-02", "TypeError exceptions will be thrown instead.", !0);
        }
        function r(t, n, r) {
            var o = new i();
            return n && (o.fill = "both", o.duration = "auto"), "number" != typeof t || isNaN(t) ? void 0 !== t && Object.getOwnPropertyNames(t).forEach(function(i) {
                if ("auto" != t[i]) {
                    if (("number" == typeof o[i] || "duration" == i) && ("number" != typeof t[i] || isNaN(t[i]))) return;
                    if ("fill" == i && -1 == _.indexOf(t[i])) return;
                    if ("direction" == i && -1 == g.indexOf(t[i])) return;
                    if ("playbackRate" == i && 1 !== t[i] && e.isDeprecated("AnimationEffectTiming.playbackRate", "2014-11-28", "Use Animation.playbackRate instead.")) return;
                    o[i] = t[i];
                }
            }) : o.duration = t, o;
        }
        function o(e, t, i, n) {
            return e < 0 || e > 1 || i < 0 || i > 1 ? y : function(r) {
                function o(e, t, i) {
                    return 3 * e * (1 - i) * (1 - i) * i + 3 * t * (1 - i) * i * i + i * i * i;
                }
                if (r <= 0) {
                    var s = 0;
                    return e > 0 ? s = t / e : !t && i > 0 && (s = n / i), s * r;
                }
                if (r >= 1) {
                    var a = 0;
                    return i < 1 ? a = (n - 1) / (i - 1) : 1 == i && e < 1 && (a = (t - 1) / (e - 1)), 
                    1 + a * (r - 1);
                }
                for (var l = 0, c = 1; l < c; ) {
                    var h = (l + c) / 2, u = o(e, i, h);
                    if (Math.abs(r - u) < 1e-5) return o(t, n, h);
                    u < r ? l = h : c = h;
                }
                return o(t, n, h);
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
            if (t) return o.apply(this, t.slice(1).map(Number));
            var i = x.exec(e);
            return i ? s(Number(i[1]), {
                start: v,
                middle: b,
                end: P
            }[i[2]]) : S[e] || y;
        }
        function c(e) {
            return 0 === e.duration || 0 === e.iterations ? 0 : e.duration * e.iterations;
        }
        function h(e, t, i) {
            if (null == t) return N;
            var n = i.delay + e + i.endDelay;
            return t < Math.min(i.delay, n) ? A : t >= Math.min(i.delay + e, n) ? T : R;
        }
        function u(e, t, i, n, r) {
            switch (n) {
              case A:
                return "backwards" == t || "both" == t ? 0 : null;

              case R:
                return i - r;

              case T:
                return "forwards" == t || "both" == t ? e : null;

              case N:
                return null;
            }
        }
        function d(e, t, i, n, r) {
            var o = r;
            return 0 === e ? t !== A && (o += i) : o += n / e, o;
        }
        function f(e, t, i, n, r, o) {
            var s = e === 1 / 0 ? t % 1 : e % 1;
            return 0 !== s || i !== T || 0 === n || 0 === r && 0 !== o || (s = 1), s;
        }
        function p(e, t, i, n) {
            return e === T && t === 1 / 0 ? 1 / 0 : 1 === i ? Math.floor(n) - 1 : Math.floor(n);
        }
        function m(e, t, i) {
            var n = e;
            if ("normal" !== e && "reverse" !== e) {
                var r = t;
                "alternate-reverse" === e && (r += 1), n = "normal", r !== 1 / 0 && r % 2 != 0 && (n = "reverse");
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
        var v = 1, b = .5, P = 0, S = {
            ease: o(.25, .1, .25, 1),
            "ease-in": o(.42, 0, 1, 1),
            "ease-out": o(0, 0, .58, 1),
            "ease-in-out": o(.42, 0, .58, 1),
            "step-start": s(1, v),
            "step-middle": s(1, b),
            "step-end": s(1, P)
        }, w = null, C = "\\s*(-?\\d+\\.?\\d*|-?\\.\\d+)\\s*", E = new RegExp("cubic-bezier\\(" + C + "," + C + "," + C + "," + C + "\\)"), x = /steps\(\s*(\d+)\s*,\s*(start|middle|end)\s*\)/, N = 0, A = 1, T = 2, R = 3;
        e.cloneTimingInput = function(e) {
            if ("number" == typeof e) return e;
            var t = {};
            for (var i in e) t[i] = e[i];
            return t;
        }, e.makeTiming = r, e.numericTimingToObject = function(e) {
            return "number" == typeof e && (e = isNaN(e) ? {
                duration: 0
            } : {
                duration: e
            }), e;
        }, e.normalizeTimingInput = function(t, i) {
            return t = e.numericTimingToObject(t), r(t, i);
        }, e.calculateActiveDuration = function(e) {
            return Math.abs(c(e) / e.playbackRate);
        }, e.calculateIterationProgress = function(e, t, i) {
            var n = h(e, t, i), r = u(e, i.fill, t, n, i.delay);
            if (null === r) return null;
            var o = d(i.duration, n, i.iterations, r, i.iterationStart), s = f(o, i.iterationStart, n, i.iterations, r, i.duration), a = p(n, i.iterations, s, o), l = m(i.direction, a, s);
            return i._easingFunction(l);
        }, e.calculatePhase = h, e.normalizeEasing = a, e.parseEasingFunction = l;
    }(i), function(e, t) {
        function i(e, t) {
            return e in c ? c[e][t] || t : t;
        }
        function n(e) {
            return "display" === e || 0 === e.lastIndexOf("animation", 0) || 0 === e.lastIndexOf("transition", 0);
        }
        function r(e, t, r) {
            if (!n(e)) {
                var o = s[e];
                if (o) {
                    a.style[e] = t;
                    for (var l in o) {
                        var c = o[l], h = a.style[c];
                        r[c] = i(c, h);
                    }
                } else r[e] = i(e, t);
            }
        }
        function o(e) {
            var t = [];
            for (var i in e) if (!(i in [ "easing", "offset", "composite" ])) {
                var n = e[i];
                Array.isArray(n) || (n = [ n ]);
                for (var r, o = n.length, s = 0; s < o; s++) r = {}, r.offset = "offset" in e ? e.offset : 1 == o ? 1 : s / (o - 1), 
                "easing" in e && (r.easing = e.easing), "composite" in e && (r.composite = e.composite), 
                r[i] = n[s], t.push(r);
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
        }, c = {
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
        e.convertToArrayForm = o, e.normalizeKeyframes = function(t) {
            if (null == t) return [];
            window.Symbol && Symbol.iterator && Array.prototype.from && t[Symbol.iterator] && (t = Array.from(t)), 
            Array.isArray(t) || (t = o(t));
            for (var i = t.map(function(t) {
                var i = {};
                for (var n in t) {
                    var o = t[n];
                    if ("offset" == n) {
                        if (null != o) {
                            if (o = Number(o), !isFinite(o)) throw new TypeError("Keyframe offsets must be numbers.");
                            if (o < 0 || o > 1) throw new TypeError("Keyframe offsets must be between 0 and 1.");
                        }
                    } else if ("composite" == n) {
                        if ("add" == o || "accumulate" == o) throw {
                            type: DOMException.NOT_SUPPORTED_ERR,
                            name: "NotSupportedError",
                            message: "add compositing is not supported"
                        };
                        if ("replace" != o) throw new TypeError("Invalid composite mode " + o + ".");
                    } else o = "easing" == n ? e.normalizeEasing(o) : "" + o;
                    r(n, o, i);
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
                for (var t = 0, n = i[0].offset, r = 1; r < e; r++) {
                    var o = i[r].offset;
                    if (null != o) {
                        for (var s = 1; s < r - t; s++) i[t + s].offset = n + (o - n) * s / (r - t);
                        t = r, n = o;
                    }
                }
            }(), i;
        };
    }(i), function(e) {
        var t = {};
        e.isDeprecated = function(e, i, n, r) {
            var o = r ? "are" : "is", s = new Date(), a = new Date(i);
            return a.setMonth(a.getMonth() + 3), !(s < a && (e in t || console.warn("Web Animations: " + e + " " + o + " deprecated and will stop working on " + a.toDateString() + ". " + n), 
            t[e] = !0, 1));
        }, e.deprecated = function(t, i, n, r) {
            var o = r ? "are" : "is";
            if (e.isDeprecated(t, i, n, r)) throw new Error(t + " " + o + " no longer supported. " + n);
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
                    var r = {
                        offset: e[i].offset,
                        easing: e[i].easing,
                        value: e[i][n]
                    };
                    t[n] = t[n] || [], t[n].push(r);
                }
                for (var o in t) {
                    var s = t[o];
                    if (0 != s[0].offset || 1 != s[s.length - 1].offset) throw {
                        type: DOMException.NOT_SUPPORTED_ERR,
                        name: "NotSupportedError",
                        message: "Partial keyframes are not supported"
                    };
                }
                return t;
            }
            function r(i) {
                var n = [];
                for (var r in i) for (var o = i[r], s = 0; s < o.length - 1; s++) {
                    var a = s, l = s + 1, c = o[a].offset, h = o[l].offset, u = c, d = h;
                    0 == s && (u = -1 / 0, 0 == h && (l = a)), s == o.length - 2 && (d = 1 / 0, 1 == c && (a = l)), 
                    n.push({
                        applyFrom: u,
                        applyTo: d,
                        startOffset: o[a].offset,
                        endOffset: o[l].offset,
                        easingFunction: e.parseEasingFunction(o[a].easing),
                        property: r,
                        interpolation: t.propertyInterpolation(r, o[a].value, o[l].value)
                    });
                }
                return n.sort(function(e, t) {
                    return e.startOffset - t.startOffset;
                }), n;
            }
            t.convertEffectInput = function(i) {
                var o = n(e.normalizeKeyframes(i)), s = r(o);
                return function(e, i) {
                    if (null != i) s.filter(function(e) {
                        return i >= e.applyFrom && i < e.applyTo;
                    }).forEach(function(n) {
                        var r = i - n.startOffset, o = n.endOffset - n.startOffset, s = 0 == o ? 0 : n.easingFunction(r / o);
                        t.apply(e, n.property, n.interpolation(s));
                    }); else for (var n in o) "offset" != n && "easing" != n && "composite" != n && t.clear(e, n);
                };
            };
        }(i, n), function(e, t, i) {
            function n(e) {
                return e.replace(/-(.)/g, function(e, t) {
                    return t.toUpperCase();
                });
            }
            function r(e, t, i) {
                o[i] = o[i] || [], o[i].push([ e, t ]);
            }
            var o = {};
            t.addPropertiesHandler = function(e, t, i) {
                for (var o = 0; o < i.length; o++) r(e, t, n(i[o]));
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
            t.propertyInterpolation = function(i, r, a) {
                var l = i;
                /-/.test(i) && !e.isDeprecated("Hyphenated property names", "2016-03-22", "Use camelCase instead.", !0) && (l = n(i)), 
                "initial" != r && "initial" != a || ("initial" == r && (r = s[l]), "initial" == a && (a = s[l]));
                for (var c = r == a ? [] : o[l], h = 0; c && h < c.length; h++) {
                    var u = c[h][0](r), d = c[h][0](a);
                    if (void 0 !== u && void 0 !== d) {
                        var f = c[h][1](u, d);
                        if (f) {
                            var p = t.Interpolation.apply(null, f);
                            return function(e) {
                                return 0 == e ? r : 1 == e ? a : p(e);
                            };
                        }
                    }
                }
                return t.Interpolation(!1, !0, function(e) {
                    return e ? a : r;
                });
            };
        }(i, n), function(e, t, i) {
            function n(t) {
                var i = e.calculateActiveDuration(t), n = function(n) {
                    return e.calculateIterationProgress(i, n, t);
                };
                return n._totalDuration = t.delay + i + t.endDelay, n;
            }
            t.KeyframeEffect = function(i, r, o, s) {
                var a, l = n(e.normalizeTimingInput(o)), c = t.convertEffectInput(r), h = function() {
                    c(i, a);
                };
                return h._update = function(e) {
                    return null !== (a = l(e));
                }, h._clear = function() {
                    c(i, null);
                }, h._hasSameTarget = function(e) {
                    return i === e;
                }, h._target = i, h._totalDuration = l._totalDuration, h._id = s, h;
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
                    for (var r = [], o = 0; o < e.length; o++) r.push(i(e[o], t[o], n));
                    return r;
                }
                throw "Mismatched interpolation arguments " + e + ":" + t;
            }
            n.Interpolation = function(e, t, n) {
                return function(r) {
                    return n(i(e, t, r));
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
                var t = c;
                c = [], e < _.currentTime && (e = _.currentTime), _._animations.sort(r), _._animations = a(e, !0, _._animations)[0], 
                t.forEach(function(t) {
                    t[1](e);
                }), s(), u = void 0;
            }
            function r(e, t) {
                return e._sequenceNumber - t._sequenceNumber;
            }
            function o() {
                this._animations = [], this.currentTime = window.performance && performance.now ? performance.now() : 0;
            }
            function s() {
                p.forEach(function(e) {
                    e();
                }), p.length = 0;
            }
            function a(e, i, n) {
                m = !0, f = !1, t.timeline.currentTime = e, d = !1;
                var r = [], o = [], s = [], a = [];
                return n.forEach(function(t) {
                    t._tick(e, i), t._inEffect ? (o.push(t._effect), t._markTarget()) : (r.push(t._effect), 
                    t._unmarkTarget()), t._needsTick && (d = !0);
                    var n = t._inEffect || t._needsTick;
                    t._inTimeline = n, n ? s.push(t) : a.push(t);
                }), p.push.apply(p, r), p.push.apply(p, o), d && requestAnimationFrame(function() {}), 
                m = !1, [ s, a ];
            }
            var l = window.requestAnimationFrame, c = [], h = 0;
            window.requestAnimationFrame = function(e) {
                var t = h++;
                return 0 == c.length && l(n), c.push([ t, e ]), t;
            }, window.cancelAnimationFrame = function(e) {
                c.forEach(function(t) {
                    t[0] == e && (t[1] = function() {});
                });
            }, o.prototype = {
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
                    i.sort(r), a(t.timeline.currentTime, !1, i.slice())[1].forEach(function(e) {
                        var t = _._animations.indexOf(e);
                        -1 !== t && _._animations.splice(t, 1);
                    }), s();
                }
            };
            var p = [], m = !1, _ = new o();
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
            function r(e, t, i, r, o) {
                for (var s = [], a = [], l = [], c = n(r.length, o.length), h = 0; h < c; h++) {
                    var u = t(r[h % r.length], o[h % o.length]);
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
            e.consumeToken = t, e.consumeTrimmed = i, e.consumeRepeated = function(e, n, r) {
                e = i.bind(null, e);
                for (var o = []; ;) {
                    var s = e(r);
                    if (!s) return [ o, r ];
                    if (o.push(s[0]), r = s[1], !(s = t(n, r)) || "" == s[1]) return [ o, r ];
                    r = s[1];
                }
            }, e.consumeParenthesised = function(e, t) {
                for (var i = 0, n = 0; n < t.length && (!/\s|,/.test(t[n]) || 0 != i); n++) if ("(" == t[n]) i++; else if (")" == t[n] && (0 == --i && n++, 
                i <= 0)) break;
                var r = e(t.substr(0, n));
                return void 0 == r ? void 0 : [ r, t.substr(n) ];
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
                for (var n = [], r = 0; r < t.length; r++) {
                    var o = e.consumeTrimmed(t[r], i);
                    if (!o || "" == o[0]) return;
                    void 0 !== o[0] && n.push(o[0]), i = o[1];
                }
                if ("" == i) return n;
            }, e.mergeNestedRepeated = r.bind(null, null), e.mergeWrappedNestedRepeated = r, 
            e.mergeList = function(e, t, i) {
                for (var n = [], r = [], o = [], s = 0, a = 0; a < i.length; a++) if ("function" == typeof i[a]) {
                    var l = i[a](e[s], t[s++]);
                    n.push(l[0]), r.push(l[1]), o.push(l[2]);
                } else !function(e) {
                    n.push(!1), r.push(!1), o.push(function() {
                        return i[e];
                    });
                }(a);
                return [ n, r, function(e) {
                    for (var t = "", i = 0; i < e.length; i++) t += o[i](e[i]);
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
            var i = function(t, i, n, r) {
                function o(e) {
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
                for (var s = [], a = [], l = 0; l < n.length || l < r.length; l++) {
                    var c = n[l] || o(r[l].inset), h = r[l] || o(n[l].inset);
                    s.push(c), a.push(h);
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
                    for (var n, r = [], o = [ [], 0 ], s = [ [], 0 ], a = 0; a < t.lengths.length; a++) {
                        var l = e.mergeDimensions(t.lengths[a], i.lengths[a], 2 == a);
                        o[0].push(l[0]), s[0].push(l[1]), r.push(l[2]);
                    }
                    if (t.color && i.color) {
                        var c = e.mergeColors(t.color, i.color);
                        o[1] = c[0], s[1] = c[1], n = c[2];
                    }
                    return [ o, s, function(e) {
                        for (var i = t.inset ? "inset " : " ", o = 0; o < r.length; o++) i += r[o](e[0][o]) + " ";
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
            function r(e) {
                if (/^\s*[-+]?(\d*\.)?\d+\s*$/.test(e)) return Number(e);
            }
            function o(e, t) {
                return function(r, o) {
                    return [ r, o, function(r) {
                        return i(n(e, t, r));
                    } ];
                };
            }
            function s(e) {
                var t = e.trim().split(/\s*[\s,]\s*/);
                if (0 !== t.length) {
                    for (var i = [], n = 0; n < t.length; n++) {
                        var o = r(t[n]);
                        if (void 0 === o) return;
                        i.push(o);
                    }
                    return i;
                }
            }
            e.clamp = n, e.addPropertiesHandler(s, function(e, t) {
                if (e.length == t.length) return [ e, t, function(e) {
                    return e.map(i).join(" ");
                } ];
            }, [ "stroke-dasharray" ]), e.addPropertiesHandler(r, o(0, 1 / 0), [ "border-image-width", "line-height" ]), 
            e.addPropertiesHandler(r, o(0, 1), [ "opacity", "shape-image-threshold" ]), e.addPropertiesHandler(r, function(e, t) {
                if (0 != e) return o(0, 1 / 0)(e, t);
            }, [ "flex-grow", "flex-shrink" ]), e.addPropertiesHandler(r, function(e, t) {
                return [ e, t, function(e) {
                    return Math.round(n(1, 1 / 0, e));
                } ];
            }, [ "orphans", "widows" ]), e.addPropertiesHandler(r, function(e, t) {
                return [ e, t, Math.round ];
            }, [ "z-index" ]), e.parseNumber = r, e.parseNumberList = s, e.mergeNumbers = function(e, t) {
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
                e = e.trim(), o.fillStyle = "#000", o.fillStyle = e;
                var t = o.fillStyle;
                if (o.fillStyle = "#fff", o.fillStyle = e, t == o.fillStyle) {
                    o.fillRect(0, 0, 1, 1);
                    var i = o.getImageData(0, 0, 1, 1).data;
                    o.clearRect(0, 0, 1, 1);
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
            var r = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            r.width = r.height = 1;
            var o = r.getContext("2d");
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
                    var e = o();
                    return ")" !== s ? NaN : (t(), e);
                }
                function r() {
                    for (var e = n(); "*" === s || "/" === s; ) {
                        var i = s;
                        t();
                        var r = n();
                        "*" === i ? e *= r : e /= r;
                    }
                    return e;
                }
                function o() {
                    for (var e = r(); "+" === s || "-" === s; ) {
                        var i = s;
                        t();
                        var n = r();
                        "+" === i ? e += n : e -= n;
                    }
                    return e;
                }
                var s, a = /([\+\-\w\.]+|[\(\)\*\/])/g;
                return t(), o();
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
                    for (var r = "U(" + e.source + ")", o = t.replace(/[-+]?(\d*\.)?\d+([Ee][-+]?\d+)?/g, "N").replace(new RegExp("N" + r, "g"), "D").replace(/\s[+-]\s/g, "O").replace(/\s/g, ""), s = [ /N\*(D)/g, /(N|D)[*\/]N/g, /(N|D)O\1/g, /\((N|D)\)/g ], a = 0; a < s.length; ) s[a].test(o) ? (o = o.replace(s[a], "$1"), 
                    a = 0) : a++;
                    if ("D" == o) {
                        for (var l in n) {
                            var c = i(t.replace(new RegExp("U" + l, "g"), "").replace(new RegExp(r, "g"), "*0"));
                            if (!isFinite(c)) return;
                            n[l] = c;
                        }
                        return n;
                    }
                }
            }
            function r(e, t) {
                return o(e, t, !0);
            }
            function o(t, i, n) {
                var r, o = [];
                for (r in t) o.push(r);
                for (r in i) o.indexOf(r) < 0 && o.push(r);
                return t = o.map(function(e) {
                    return t[e] || 0;
                }), i = o.map(function(e) {
                    return i[e] || 0;
                }), [ t, i, function(t) {
                    var i = t.map(function(i, r) {
                        return 1 == t.length && n && (i = Math.max(i, 0)), e.numberToString(i) + o[r];
                    }).join(" + ");
                    return t.length > 1 ? "calc(" + i + ")" : i;
                } ];
            }
            var s = "px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc", a = n.bind(null, new RegExp(s, "g")), l = n.bind(null, new RegExp(s + "|%", "g")), c = n.bind(null, /deg|rad|grad|turn/g);
            e.parseLength = a, e.parseLengthOrPercent = l, e.consumeLengthOrPercent = e.consumeParenthesised.bind(null, l), 
            e.parseAngle = c, e.mergeDimensions = o;
            var h = e.consumeParenthesised.bind(null, a), u = e.consumeRepeated.bind(void 0, h, /^/), d = e.consumeRepeated.bind(void 0, u, /^,/);
            e.consumeSizePairList = d;
            var f = e.mergeNestedRepeated.bind(void 0, r, " "), p = e.mergeNestedRepeated.bind(void 0, f, ",");
            e.mergeNonNegativeSizePair = f, e.addPropertiesHandler(function(e) {
                var t = d(e);
                if (t && "" == t[1]) return t[0];
            }, p, [ "background-size" ]), e.addPropertiesHandler(l, r, [ "border-bottom-width", "border-image-width", "border-left-width", "border-right-width", "border-top-width", "flex-basis", "font-size", "height", "line-height", "max-height", "max-width", "outline-width", "width" ]), 
            e.addPropertiesHandler(l, o, [ "border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius", "bottom", "left", "letter-spacing", "margin-bottom", "margin-left", "margin-right", "margin-top", "min-height", "min-width", "outline-offset", "padding-bottom", "padding-left", "padding-right", "padding-top", "perspective", "right", "shape-margin", "stroke-dashoffset", "text-indent", "top", "vertical-align", "word-spacing" ]);
        }(n), function(e, t) {
            function i(t) {
                return e.consumeLengthOrPercent(t) || e.consumeToken(/^auto/, t);
            }
            function n(t) {
                var n = e.consumeList([ e.ignore(e.consumeToken.bind(null, /^rect/)), e.ignore(e.consumeToken.bind(null, /^\(/)), e.consumeRepeated.bind(null, i, /^,/), e.ignore(e.consumeToken.bind(null, /^\)/)) ], t);
                if (n && 4 == n[0].length) return n[0];
            }
            var r = e.mergeWrappedNestedRepeated.bind(null, function(e) {
                return "rect(" + e + ")";
            }, function(t, i) {
                return "auto" == t || "auto" == i ? [ !0, !1, function(n) {
                    var r = n ? t : i;
                    if ("auto" == r) return "auto";
                    var o = e.mergeDimensions(r, r);
                    return o[2](o[0]);
                } ] : e.mergeDimensions(t, i);
            }, ", ");
            e.parseBox = n, e.mergeBoxes = r, e.addPropertiesHandler(n, r, [ "clip" ]);
        }(n), function(e, t) {
            function i(e) {
                return function(t) {
                    var i = 0;
                    return e.map(function(e) {
                        return e === c ? t[i++] : e;
                    });
                };
            }
            function n(e) {
                return e;
            }
            function r(t) {
                if ("none" == (t = t.toLowerCase().trim())) return [];
                for (var i, n = /\s*(\w+)\(([^)]*)\)/g, r = [], o = 0; i = n.exec(t); ) {
                    if (i.index != o) return;
                    o = i.index + i[0].length;
                    var s = i[1], a = d[s];
                    if (!a) return;
                    var l = i[2].split(","), c = a[0];
                    if (c.length < l.length) return;
                    for (var f = [], p = 0; p < c.length; p++) {
                        var m, _ = l[p], g = c[p];
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
                            t: h
                        }[g])) return;
                        f.push(m);
                    }
                    if (r.push({
                        t: s,
                        d: f
                    }), n.lastIndex == t.length) return r;
                }
            }
            function o(e) {
                return e.toFixed(6).replace(".000000", "");
            }
            function s(t, i) {
                if (t.decompositionPair !== i) {
                    t.decompositionPair = i;
                    var n = e.makeMatrixDecomposition(t);
                }
                if (i.decompositionPair !== t) {
                    i.decompositionPair = t;
                    var r = e.makeMatrixDecomposition(i);
                }
                return null == n[0] || null == r[0] ? [ [ !1 ], [ !0 ], function(e) {
                    return e ? i[0].d : t[0].d;
                } ] : (n[0].push(0), r[0].push(1), [ n, r, function(t) {
                    var i = e.quat(n[0][3], r[0][3], t[5]);
                    return e.composeMatrix(t[0], t[1], t[2], i, t[4]).map(o).join(",");
                } ]);
            }
            function a(e) {
                return e.replace(/[xy]/, "");
            }
            function l(e) {
                return e.replace(/(x|y|z|3d)?$/, "3d");
            }
            var c = null, h = {
                px: 0
            }, u = {
                deg: 0
            }, d = {
                matrix: [ "NNNNNN", [ c, c, 0, 0, c, c, 0, 0, 0, 0, 1, 0, c, c, 0, 1 ], n ],
                matrix3d: [ "NNNNNNNNNNNNNNNN", n ],
                rotate: [ "A" ],
                rotatex: [ "A" ],
                rotatey: [ "A" ],
                rotatez: [ "A" ],
                rotate3d: [ "NNNA" ],
                perspective: [ "L" ],
                scale: [ "Nn", i([ c, c, 1 ]), n ],
                scalex: [ "N", i([ c, 1, 1 ]), i([ c, 1 ]) ],
                scaley: [ "N", i([ 1, c, 1 ]), i([ 1, c ]) ],
                scalez: [ "N", i([ 1, 1, c ]) ],
                scale3d: [ "NNN", n ],
                skew: [ "Aa", null, n ],
                skewx: [ "A", null, i([ c, u ]) ],
                skewy: [ "A", null, i([ u, c ]) ],
                translate: [ "Tt", i([ c, c, h ]), n ],
                translatex: [ "T", i([ c, h, h ]), i([ c, h ]) ],
                translatey: [ "T", i([ h, c, h ]), i([ h, c ]) ],
                translatez: [ "L", i([ h, h, c ]) ],
                translate3d: [ "TTL", n ]
            };
            e.addPropertiesHandler(r, function(t, i) {
                var n = e.makeMatrixDecomposition && !0, r = !1;
                if (!t.length || !i.length) for (t.length || (r = !0, t = i, i = []), m = 0; m < t.length; m++) {
                    var o = t[m].t, c = t[m].d, h = "scale" == o.substr(0, 5) ? 1 : 0;
                    i.push({
                        t: o,
                        d: c.map(function(e) {
                            if ("number" == typeof e) return h;
                            var t = {};
                            for (var i in e) t[i] = h;
                            return t;
                        })
                    });
                }
                var u = [], f = [], p = [];
                if (t.length != i.length) {
                    if (!n) return;
                    u = [ (x = s(t, i))[0] ], f = [ x[1] ], p = [ [ "matrix", [ x[2] ] ] ];
                } else for (var m = 0; m < t.length; m++) {
                    var _ = t[m].t, g = i[m].t, y = t[m].d, v = i[m].d, b = d[_], P = d[g];
                    if (function(e, t) {
                        return "perspective" == e && "perspective" == t || ("matrix" == e || "matrix3d" == e) && ("matrix" == t || "matrix3d" == t);
                    }(_, g)) {
                        if (!n) return;
                        x = s([ t[m] ], [ i[m] ]), u.push(x[0]), f.push(x[1]), p.push([ "matrix", [ x[2] ] ]);
                    } else {
                        if (_ == g) o = _; else if (b[2] && P[2] && a(_) == a(g)) o = a(_), y = b[2](y), 
                        v = P[2](v); else {
                            if (!b[1] || !P[1] || l(_) != l(g)) {
                                if (!n) return;
                                u = [ (x = s(t, i))[0] ], f = [ x[1] ], p = [ [ "matrix", [ x[2] ] ] ];
                                break;
                            }
                            o = l(_), y = b[1](y), v = P[1](v);
                        }
                        for (var S = [], w = [], C = [], E = 0; E < y.length; E++) {
                            var x = ("number" == typeof y[E] ? e.mergeNumbers : e.mergeDimensions)(y[E], v[E]);
                            S[E] = x[0], w[E] = x[1], C.push(x[2]);
                        }
                        u.push(S), f.push(w), p.push([ o, C ]);
                    }
                }
                if (r) {
                    var N = u;
                    u = f, f = N;
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
                var i = e.transformListToMatrix(r(t));
                return "matrix(" + o(i[0]) + " " + o(i[1]) + " " + o(i[4]) + " " + o(i[5]) + " " + o(i[12]) + " " + o(i[13]) + ")";
            };
        }(n), function(e, t) {
            function i(e, t) {
                t.concat([ e ]).forEach(function(t) {
                    t in document.documentElement.style && (n[e] = t), r[t] = e;
                });
            }
            var n = {}, r = {};
            i("transform", [ "webkitTransform", "msTransform" ]), i("transformOrigin", [ "webkitTransformOrigin" ]), 
            i("perspective", [ "webkitPerspective" ]), i("perspectiveOrigin", [ "webkitPerspectiveOrigin" ]), 
            e.propertyName = function(e) {
                return n[e] || e;
            }, e.unprefixedPropertyName = function(e) {
                return r[e] || e;
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
            window.Element.prototype.animate = function(n, r) {
                var o = i.call(this, n, r);
                o._cancelHandlers = [], o.oncancel = null;
                var s = o.cancel;
                o.cancel = function() {
                    s.call(this);
                    var i = new t(this, null, e()), n = this._cancelHandlers.concat(this.oncancel ? [ this.oncancel ] : []);
                    setTimeout(function() {
                        n.forEach(function(e) {
                            e.call(i.target, i);
                        });
                    }, 0);
                };
                var a = o.addEventListener;
                o.addEventListener = function(e, t) {
                    "function" == typeof t && "cancel" == e ? this._cancelHandlers.push(t) : a.call(this, e, t);
                };
                var l = o.removeEventListener;
                return o.removeEventListener = function(e, t) {
                    if ("cancel" == e) {
                        var i = this._cancelHandlers.indexOf(t);
                        i >= 0 && this._cancelHandlers.splice(i, 1);
                    } else l.call(this, e, t);
                }, o;
            };
        }
    }(), function(e) {
        var t = document.documentElement, i = null, n = !1;
        try {
            var r = "0" == getComputedStyle(t).getPropertyValue("opacity") ? "1" : "0";
            (i = t.animate({
                opacity: [ r, r ]
            }, {
                duration: 1
            })).currentTime = 0, n = getComputedStyle(t).getPropertyValue("opacity") == r;
        } catch (e) {} finally {
            i && i.cancel();
        }
        if (!n) {
            var o = window.Element.prototype.animate;
            window.Element.prototype.animate = function(t, i) {
                return window.Symbol && Symbol.iterator && Array.prototype.from && t[Symbol.iterator] && (t = Array.from(t)), 
                Array.isArray(t) || null === t || (t = e.convertToArrayForm(t)), o.call(this, t, i);
            };
        }
    }(i), function(e, t, i) {
        function n(e) {
            var i = t.timeline;
            i.currentTime = e, i._discardAnimations(), 0 == i._animations.length ? o = !1 : requestAnimationFrame(n);
        }
        var r = window.requestAnimationFrame;
        window.requestAnimationFrame = function(e) {
            return r(function(i) {
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
        var o = !1;
        t.restartWebAnimationsNextTick = function() {
            o || (o = !0, requestAnimationFrame(n));
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
    }(0, r), function(e, t, i) {
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
                var e, i, n, r, o = !!this._animation;
                o && (e = this.playbackRate, i = this._paused, n = this.startTime, r = this.currentTime, 
                this._animation.cancel(), this._animation._wrapper = null, this._animation = null), 
                (!this.effect || this.effect instanceof window.KeyframeEffect) && (this._animation = t.newUnderlyingAnimationForKeyframeEffect(this.effect), 
                t.bindAnimationForKeyframeEffect(this)), (this.effect instanceof window.SequenceEffect || this.effect instanceof window.GroupEffect) && (this._animation = t.newUnderlyingAnimationForGroup(this.effect), 
                t.bindAnimationForGroup(this)), this.effect && this.effect._onsample && t.bindAnimationForCustomEffect(this), 
                o && (1 != e && (this.playbackRate = e), null !== n ? this.startTime = n : null !== r ? this.currentTime = r : null !== this._holdTime && (this.currentTime = this._holdTime), 
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
                    var n = this.effect._timing, r = this.currentTime;
                    null !== r && (r = e.calculateIterationProgress(e.calculateActiveDuration(n), r, n)), 
                    (null == r || isNaN(r)) && this._removeChildAnimations();
                }
            }
        }, window.Animation = t.Animation;
    }(i, r), function(e, t, i) {
        function n(t) {
            this._frames = e.normalizeKeyframes(t);
        }
        function r() {
            for (var e = !1; l.length; ) l.shift()._updateChildren(), e = !0;
            return e;
        }
        var o = function(e) {
            if (e._animation = void 0, e instanceof window.SequenceEffect || e instanceof window.GroupEffect) for (var t = 0; t < e.children.length; t++) o(e.children[t]);
        };
        t.removeMulti = function(e) {
            for (var t = [], i = 0; i < e.length; i++) {
                var n = e[i];
                n._parent ? (-1 == t.indexOf(n._parent) && t.push(n._parent), n._parent.children.splice(n._parent.children.indexOf(n), 1), 
                n._parent = null, o(n)) : n._animation && n._animation.effect == n && (n._animation.cancel(), 
                n._animation.effect = new KeyframeEffect(null, []), n._animation._callback && (n._animation._callback._animation = null), 
                n._animation._rebuildUnderlyingAnimation(), o(n));
            }
            for (i = 0; i < t.length; i++) t[i]._rebuild();
        }, t.KeyframeEffect = function(t, i, r, o) {
            return this.target = t, this._parent = null, r = e.numericTimingToObject(r), this._timingInput = e.cloneTimingInput(r), 
            this._timing = e.normalizeTimingInput(r), this.timing = e.makeTiming(r, !1, this), 
            this.timing._effect = this, "function" == typeof i ? (e.deprecated("Custom KeyframeEffect", "2015-06-22", "Use KeyframeEffect.onsample instead."), 
            this._normalizedKeyframes = i) : this._normalizedKeyframes = new n(i), this._keyframes = i, 
            this.activeDuration = e.calculateActiveDuration(this._timing), this._id = o, this;
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
            null === e.startTime && e._isGroup && (0 == l.length && requestAnimationFrame(r), 
            l.push(e));
        };
        var c = window.getComputedStyle;
        Object.defineProperty(window, "getComputedStyle", {
            configurable: !0,
            enumerable: !0,
            value: function() {
                t.timeline._updateAnimationsPromises();
                var e = c.apply(this, arguments);
                return r() && (e = c.apply(this, arguments)), t.timeline._updateAnimationsPromises(), 
                e;
            }
        }), window.KeyframeEffect = t.KeyframeEffect, window.Element.prototype.getAnimations = function() {
            return document.timeline.getAnimations().filter(function(e) {
                return null !== e.effect && e.effect.target == this;
            }.bind(this));
        };
    }(i, r), function(e, t, i) {
        function n(e) {
            e._registered || (e._registered = !0, s.push(e), a || (a = !0, requestAnimationFrame(r)));
        }
        function r(e) {
            var t = s;
            s = [], t.sort(function(e, t) {
                return e._sequenceNumber - t._sequenceNumber;
            }), t = t.filter(function(e) {
                e();
                var t = e._animation ? e._animation.playState : "idle";
                return "running" != t && "pending" != t && (e._registered = !1), e._registered;
            }), s.push.apply(s, t), s.length ? (a = !0, requestAnimationFrame(r)) : a = !1;
        }
        var o = (document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 0);
        t.bindAnimationForCustomEffect = function(t) {
            var i, r = t.effect.target, s = "function" == typeof t.effect.getFrames();
            i = s ? t.effect.getFrames() : t.effect._onsample;
            var a = t.effect.timing, l = null;
            a = e.normalizeTimingInput(a);
            var c = function() {
                var n = c._animation ? c._animation.currentTime : null;
                null !== n && (n = e.calculateIterationProgress(e.calculateActiveDuration(a), n, a), 
                isNaN(n) && (n = null)), n !== l && (s ? i(n, r, t.effect) : i(n, t.effect, t.effect._animation)), 
                l = n;
            };
            c._animation = t, c._registered = !1, c._sequenceNumber = o++, t._callback = c, 
            n(c);
        };
        var s = [], a = !1;
        t.Animation.prototype._register = function() {
            this._callback && n(this._callback);
        };
    }(i, r), function(e, t, i) {
        function n(e) {
            return e._timing.delay + e.activeDuration + e._timing.endDelay;
        }
        function r(t, i, n) {
            this._id = n, this._parent = null, this.children = t || [], this._reparent(this.children), 
            i = e.numericTimingToObject(i), this._timingInput = e.cloneTimingInput(i), this._timing = e.normalizeTimingInput(i, !0), 
            this.timing = e.makeTiming(i, !0, this), this.timing._effect = this, "auto" === this._timing.duration && (this._timing.duration = this.activeDuration);
        }
        window.SequenceEffect = function() {
            r.apply(this, arguments);
        }, window.GroupEffect = function() {
            r.apply(this, arguments);
        }, r.prototype = {
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
        }, window.SequenceEffect.prototype = Object.create(r.prototype), Object.defineProperty(window.SequenceEffect.prototype, "activeDuration", {
            get: function() {
                var e = 0;
                return this.children.forEach(function(t) {
                    e += n(t);
                }), Math.max(e, 0);
            }
        }), window.GroupEffect.prototype = Object.create(r.prototype), Object.defineProperty(window.GroupEffect.prototype, "activeDuration", {
            get: function() {
                var e = 0;
                return this.children.forEach(function(t) {
                    e = Math.max(e, n(t));
                }), e;
            }
        }), t.newUnderlyingAnimationForGroup = function(i) {
            var n, r = null, o = new KeyframeEffect(null, [], i._timing, i._id);
            return o.onsample = function(t) {
                var i = n._wrapper;
                if (i && "pending" != i.playState && i.effect) return null == t ? void i._removeChildAnimations() : 0 == t && i.playbackRate < 0 && (r || (r = e.normalizeTimingInput(i.effect.timing)), 
                t = e.calculateIterationProgress(e.calculateActiveDuration(r), -1, r), isNaN(t) || null == t) ? (i._forEachChild(function(e) {
                    e.currentTime = -1;
                }), void i._removeChildAnimations()) : void 0;
            }, n = t.timeline._play(o);
        }, t.bindAnimationForGroup = function(e) {
            e._animation._wrapper = e, e._isGroup = !0, t.awaitStartTime(e), e._constructChildAnimations(), 
            e._setExternalAnimation(e);
        }, t.groupChildDuration = n;
    }(i, r), t.true = {};
}(0, function() {
    return this;
}()), Polymer({
    is: "cascaded-animation",
    behaviors: [ Polymer.NeonAnimationBehavior ],
    configure: function(e) {
        this._animations = [];
        var t = e.nodes, i = [], n = e.nodeDelay || 50;
        e.timing = e.timing || {}, e.timing.delay = e.timing.delay || 0;
        for (var r, o, s = e.timing.delay, a = 0; o = t[a]; a++) {
            e.timing.delay += n, e.node = o;
            var l = document.createElement(e.animation);
            if (!l.isNeonAnimation) {
                console.warn(this.is + ":", e.animation, "not found!"), r = !0;
                break;
            }
            var c = l.configure(e);
            this._animations.push(l), i.push(c);
        }
        if (e.timing.delay = s, e.node = null, !r) return this._effect = new GroupEffect(i), 
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
        var n = t.sharedElements[e.id], r = i.sharedElements[e.id];
        return n && r ? (this.sharedElements = {
            from: n,
            to: r
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
            var i = t.from.getBoundingClientRect(), n = t.to.getBoundingClientRect(), r = i.left - n.left, o = i.top - n.top, s = i.width / n.width, a = i.height / n.height;
            return this._effect = new KeyframeEffect(t.to, [ {
                transform: "translate(" + r + "px," + o + "px) scale(" + s + "," + a + ")"
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
        var i, n, r = t.to.getBoundingClientRect();
        if (e.gesture) i = e.gesture.x - (r.left + r.width / 2), n = e.gesture.y - (r.top + r.height / 2); else {
            var o = t.from.getBoundingClientRect();
            i = o.left + o.width / 2 - (r.left + r.width / 2), n = o.top + o.height / 2 - (r.top + r.height / 2);
        }
        var s = "translate(" + i + "px," + n + "px)", a = Math.max(r.width + 2 * Math.abs(i), r.height + 2 * Math.abs(n)), l = Math.sqrt(2 * a * a), c = "scale(" + l / r.width + "," + l / r.height + ")";
        return this._effect = new KeyframeEffect(t.to, [ {
            transform: s + " scale(0)"
        }, {
            transform: s + " " + c
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
        var i, n, r = t.from.getBoundingClientRect();
        if (e.gesture) i = e.gesture.x - (r.left + r.width / 2), n = e.gesture.y - (r.top + r.height / 2); else {
            var o = t.to.getBoundingClientRect();
            i = o.left + o.width / 2 - (r.left + r.width / 2), n = o.top + o.height / 2 - (r.top + r.height / 2);
        }
        var s = "translate(" + i + "px," + n + "px)", a = Math.max(r.width + 2 * Math.abs(i), r.height + 2 * Math.abs(n)), l = Math.sqrt(2 * a * a), c = "scale(" + l / r.width + "," + l / r.height + ")";
        return this._effect = new KeyframeEffect(t.from, [ {
            transform: s + " " + c
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
        "object" == typeof e.onerror && (e.onerror = function(e, t, i, n, r) {
            Chrome && Chrome.Log && r && Chrome.Log.exception(r, null, !0);
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
}, new ExceptionHandler(), Polymer({
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
});