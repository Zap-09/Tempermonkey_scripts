// ==UserScript==
// @name         Blue marble UI improvements
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Make the Blue Marble UI collapsable.
// @author       You
// @match        https://wplace.live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wplace.live
// @grant        none
// ==/UserScript==

(function () {
    let blue_UI = document.getElementById("bm-A");
    blue_UI.style.overflowY = "hidden";

    let first_h1 = blue_UI.querySelector("h1")

    let new_btn = document.createElement("button")
    new_btn.id = "collapse"
    new_btn.textContent = "."
    new_btn.style.margin = "0 1rem"


    first_h1.appendChild(new_btn)

    let is_active = true;

    function toggle_collapse(){
        if (is_active){
            blue_UI.style.height = "70px";
            is_active = false;
        } else {
            blue_UI.style.height = "455.133px";
            is_active = true;
        }
        
    }
    new_btn.addEventListener("click",toggle_collapse);
    console.log(UI_height);

})();
