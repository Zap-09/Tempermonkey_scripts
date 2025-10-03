// ==UserScript==
// @name         Blue marble UI improvements
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Make the Blue Marble UI collapsable.
// @author       Zap_09
// @match        https://wplace.live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wplace.live
// @grant        none
// ==/UserScript==

(function () {
    let blue_UI = document.getElementById("bm-A");
    blue_UI.style.overflowY = "hidden";

    let first_h1 = blue_UI.querySelector("h1");

    let new_btn = document.createElement("button");
    new_btn.id = "collapse";
    new_btn.textContent = ".";
    new_btn.style.margin = "0 1rem";

    first_h1.appendChild(new_btn);

    if (!localStorage.getItem("is_active")) {
        localStorage.setItem("is_active", "false");
    }
    let is_active = localStorage.getItem("is_active") === "true";

    if (is_active) {
        blue_UI.style.height = "455.133px";  
    } else {
        blue_UI.style.height = "70px";  
    }

    function toggle_collapse() {
        if (is_active) {
            blue_UI.style.height = "70px";
            is_active = false;
            localStorage.setItem("is_active", "false");
        } else {
            blue_UI.style.height = "455.133px";
            is_active = true;
            localStorage.setItem("is_active", "true");
        }
    }
    new_btn.addEventListener("click", toggle_collapse);
})();
