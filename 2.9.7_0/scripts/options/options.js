/*
 *  Copyright (c) 2015-2017, Michael A. Updike All rights reserved.
 *  Licensed under the BSD-3-Clause
 *  https://opensource.org/licenses/BSD-3-Clause
 *  https://github.com/opus1269/photo-screen-saver/blob/master/LICENSE.md
 */
!function() {
    "use strict";
    function e(e) {
        return n.pages.map(function(e) {
            return e.route;
        }).indexOf(e);
    }
    function o() {
        n.$.scrollPanel.scrollToTop(!0);
    }
    function r() {
        Chrome.Storage.getLastError().then(o => {
            const r = e("page-error"), t = document.getElementById(n.pages[r].route);
            return t && !Chrome.Utils.isWhiteSpace(o.message) ? t.removeAttribute("disabled") : t && t.setAttribute("disabled", "true"), 
            Promise.resolve();
        }).catch(e => {
            Chrome.GA.error(e.message, "Options._setErrorMenuState");
        });
    }
    function t(e, o, r) {
        return e.message === Chrome.Msg.HIGHLIGHT.message ? (new ChromePromise().tabs.getCurrent().then(e => (chrome.tabs.update(e.id, {
            highlighted: !0
        }), null)).catch(e => {
            Chrome.Log.error(e.message, "chromep.tabs.getCurrent");
        }), r(JSON.stringify({
            message: "OK"
        }))) : e.message === Chrome.Msg.STORAGE_EXCEEDED.message ? (n.dialogTitle = Chrome.Locale.localize("err_storage_title"), 
        n.dialogText = Chrome.Locale.localize("err_storage_desc"), n.$.errorDialog.open()) : e.message === app.Msg.PHOTO_SOURCE_FAILED.message && (n.$.settingsPage.deselectPhotoSource(e.key), 
        n.dialogTitle = Chrome.Locale.localize("err_photo_source_title"), n.dialogText = e.error, 
        n.$.errorDialog.open()), !1;
    }
    new ExceptionHandler();
    const a = "https://chrome.google.com/webstore/detail/photo-screen-saver/" + chrome.runtime.id + "/", n = document.querySelector("#t");
    n.pages = [ {
        label: Chrome.Locale.localize("menu_settings"),
        route: "page-settings",
        icon: "myicons:settings",
        obj: null,
        ready: !0,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_google"),
        route: "page-google-photos",
        icon: "myicons:cloud",
        obj: function(e) {
            n.pages[e].ready ? Chrome.Storage.getBool("isAlbumMode") && n.gPhotosPage.loadAlbumList() : (n.pages[e].ready = !0, 
            n.gPhotosPage = new app.GooglePhotosPage("gPhotosPage"), Polymer.dom(n.$.googlePhotosInsertion).appendChild(n.gPhotosPage)), 
            n.route = n.pages[e].route, o();
        },
        ready: !1,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_preview"),
        route: "page-preview",
        icon: "myicons:pageview",
        obj: function(e, o) {
            n.async(function() {
                n.$.mainMenu.select(o);
            }, 500), Chrome.Msg.send(app.Msg.SS_SHOW).catch(() => {});
        },
        ready: !0,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_error"),
        route: "page-error",
        icon: "myicons:error",
        obj: function(e) {
            if (!n.pages[e].ready) {
                n.pages[e].ready = !0;
                const o = new app.ErrorPageFactory();
                Polymer.dom(n.$.errorInsertion).appendChild(o);
            }
            n.route = n.pages[e].route, o();
        },
        ready: !1,
        disabled: !1,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_help"),
        route: "page-help",
        icon: "myicons:help",
        obj: function(e) {
            if (!n.pages[e].ready) {
                n.pages[e].ready = !0;
                const o = new app.HelpPageFactory();
                Polymer.dom(n.$.helpInsertion).appendChild(o);
            }
            n.route = n.pages[e].route, o();
        },
        ready: !1,
        divider: !0
    }, {
        label: Chrome.Locale.localize("help_faq"),
        route: "page-faq",
        icon: "myicons:help",
        obj: "https://opus1269.github.io/photo-screen-saver/faq.html",
        ready: !0,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_support"),
        route: "page-support",
        icon: "myicons:help",
        obj: `${a}support`,
        ready: !0,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_rate"),
        route: "page-rate",
        icon: "myicons:grade",
        obj: `${a}reviews`,
        ready: !0,
        divider: !1
    }, {
        label: Chrome.Locale.localize("menu_pushy"),
        route: "page-pushy",
        icon: "myicons:extension",
        obj: "https://chrome.google.com/webstore/detail/pushy-clipboard/jemdfhaheennfkehopbpkephjlednffd",
        ready: !0,
        divider: !0
    } ], n.dialogTitle = "", n.dialogText = "", n.route = "page-settings", n.addEventListener("dom-change", function() {
        Chrome.GA.page("/options.html"), Chrome.Msg.listen(t), r(), chrome.storage.onChanged.addListener(function(e) {
            for (const o in e) if (e.hasOwnProperty(o) && "lastError" === o) {
                r();
                break;
            }
        });
    }), n._onNavMenuItemTapped = function(r) {
        const t = document.querySelector("#paperDrawerPanel");
        t && t.narrow && t.closeDrawer();
        const a = e(r.currentTarget.id);
        Chrome.GA.event(Chrome.GA.EVENT.MENU, n.pages[a].route);
        const s = n.route;
        n.pages[a].obj ? "string" == typeof n.pages[a].obj ? (n.$.mainMenu.select(s), chrome.tabs.create({
            url: n.pages[a].obj
        })) : n.pages[a].obj(a, s) : (n.route = n.pages[a].route, o());
    }, n._computeTitle = function() {
        return Chrome.Locale.localize("chrome_extension_name");
    }, n._computeMenu = function() {
        return Chrome.Locale.localize("menu");
    };
}();