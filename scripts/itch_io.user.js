// ==UserScript==
// @name         Auto accept
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Zap_09
// @match        https://*.itch.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=itch.io
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    //itchio
    //eyJhbGxvd19uc2Z3Ijp0cnVlfQ%3d%3d%0a%2d%2dylII8ZUiZ1EbYYkMPud05e7WlxM%3d

    function getCookie(name) {
        let match = document.cookie.match(
            new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? match[2] : null;
    }

    function add_cookie() {
        document.cookie =
            "itchio = eyJhbGxvd19uc2Z3Ijp0cnVlfQ%3d%3d%0a%2d%2dylII8ZUiZ1EbYYkMPud05e7WlxM%3d";

        document.cookie = "was_active = true"
    }

    function check_is_active() {
        let was_active = getCookie("was_active")
        if(!was_active){
            add_cookie()
            location.reload();
        }
        
    }

    check_is_active();

})();
