/*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
window.app = window.app || {}, app.Screensaver = function() {
    "use strict";
    function e() {
        let e = Chrome.Storage.getInt("photoTransition", 0);
        8 === e && (e = Chrome.Utils.getRandomInt(0, 7)), o.set("aniType", e), app.SSTime.initialize();
    }
    function t() {
        Chrome.Utils.getChromeVersion() >= 42 && new ChromePromise().tabs.getZoom().then(e => ((e <= .99 || e >= 1.01) && chrome.tabs.setZoom(1), 
        null)).catch(e => {
            Chrome.Log.error(e.message, "chromep.tabs.getZoom");
        });
    }
    new ExceptionHandler();
    const o = document.querySelector("#t");
    return o.sizingType = null, o.screenWidth = screen.width, o.screenHeight = screen.height, 
    o.aniType = 0, o.paused = !1, o.noPhotos = !1, o.noPhotosLabel = "", o.timeLabel = "", 
    o.addEventListener("dom-change", function() {
        document.body.style.background = Chrome.Storage.get("background").substring(11), 
        Chrome.GA.page("/screensaver.html"), app.SSEvents.initialize(), t(), e(), app.Screensaver.launch();
    }), {
        launch: function(e = 2e3) {
            app.SSBuilder.build() && app.SSRunner.start(e);
        },
        createPages: function() {
            app.SSViews.create(o);
        },
        setSizingType: function(e) {
            o.set("sizingType", e);
        },
        noPhotos: function() {
            return o.noPhotos;
        },
        setNoPhotos: function() {
            o.set("noPhotos", !0), o.noPhotosLabel = Chrome.Locale.localize("no_photos");
        },
        setTimeLabel: function(e) {
            o.timeLabel = e;
        },
        setPaused: function(e) {
            o.paused = e, e ? (o.$.pauseImage.classList.add("fadeOut"), o.$.playImage.classList.remove("fadeOut")) : (o.$.playImage.classList.add("fadeOut"), 
            o.$.pauseImage.classList.remove("fadeOut"));
        }
    };
}();