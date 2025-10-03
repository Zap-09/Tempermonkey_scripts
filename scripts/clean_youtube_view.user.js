// ==UserScript==
// @name         Clean YouTube View button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a hot key to hide the UI. Current hotkey is X.
// @author       Zap_09
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    let is_hidden = false;

    function toggle_Control() {
        let all_btn = document.querySelector(".ytp-chrome-bottom");

        if (!all_btn){
            console.log("Controls not found.");
            return;
        }
        let top_bar = document.querySelector(".ytp-chrome-top");

        if (!is_hidden) {
            all_btn.style.display = "none";
            is_hidden = true;
            if(top_bar){top_bar.style.display = "none"};
        } else {
            all_btn.style.display = "block";
            is_hidden = false;
            if(top_bar){top_bar.style.display = "block"};
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.key.toLocaleLowerCase() === "x") {
            toggle_Control();
        }
    });
})();
