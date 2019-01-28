/*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
!function() {
    "use strict";
    function e() {
        Chrome.Msg.send(Chrome.Msg.HIGHLIGHT).catch(() => {
            chrome.tabs.create({
                url: "../html/options.html"
            });
        });
    }
    function t(t) {
        if ("install" === t.reason) Chrome.GA.event(Chrome.GA.EVENT.INSTALLED, Chrome.Utils.getVersion()), 
        app.Data.initialize(), e(); else if ("update" === t.reason) {
            if (!app.Utils.DEBUG && Chrome.Utils.getVersion() === t.previousVersion) return;
            app.Data.update();
        }
    }
    function n() {
        Chrome.GA.page("/background.html"), app.Data.processState();
    }
    function a() {
        e();
    }
    function r(e) {
        app.Data.processState(e.key);
    }
    function o(e, t, n) {
        return e.message === Chrome.Msg.RESTORE_DEFAULTS.message ? app.Data.restoreDefaults() : e.message === Chrome.Msg.STORE.message && Chrome.Storage.set(e.key, e.value), 
        !1;
    }
    new ExceptionHandler(), window.addEventListener("load", function() {
        chrome.runtime.onInstalled.addListener(t), chrome.runtime.onStartup.addListener(n), 
        chrome.browserAction.onClicked.addListener(a), addEventListener("storage", r, !1), 
        Chrome.Msg.listen(o);
    });
}();