// ==UserScript==
// @name         Wplace Auto color hotkey.
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds an Hotkey to auto color the pixel under the cursor.
// @author       Zap_09
// @match        https://wplace.live/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wplace.live
// @grant        none
// ==/UserScript==

(async function () {
    "use strict";

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function add_settings() {
        await wait_till_visible("[title = 'Info']");

        let Leaderboard_btn = document.querySelector("[title = 'Info']");
        let LeaderboardParent = Leaderboard_btn.parentElement;

        let side_manu = LeaderboardParent.parentElement;

        console.log(side_manu);

        let settings_btn = document.createElement("div");
        settings_btn.classList.add("indicator");

        let inside_settings_btn = `<button class="btn btn-sm btn-circle" title="settings"><svg class="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg></button>`;

        settings_btn.innerHTML = inside_settings_btn;
        side_manu.appendChild(settings_btn);

        //adds the settings box
        let settings_box = document.createElement("div");
        settings_box.classList.add("settings_box_wapper");
        let inside_settings_box = `<div class="box">
        <label for="hotkey">Hotkey for auto color <br>(Case Sensitive)
            <input type="text" maxlength="1" id="hotkey">
        </label>
        <hr style="width: 100%;">
        <label for="delay">Delay between each click <br>
            <input type="text" maxlength="10" id="delay">
        </label>
        <button id="save">Save</button>
    </div>`;

        settings_box.innerHTML = inside_settings_box;
        document.body.appendChild(settings_box);
    }

    async function add_settings_box() {
        //adds the hotkey function
        await wait_till_visible("#hotkey");
        await wait_till_visible("#delay");
        let hotkey = localStorage.getItem("hotkey");
        let delay = localStorage.getItem("hotkey_delay");

        if (!hotkey) {
            localStorage.setItem("hotkey", "x");
        }

        if (!delay) {
            localStorage.setItem("hotkey_delay", "200");
        }

        let hotkey_box = document.getElementById("hotkey");

        let delay_box = document.getElementById("delay");

        hotkey_box.value = hotkey;
        delay_box.value = delay;

        function update_hotkey() {
            localStorage.setItem("hotkey", hotkey_box.value);
            localStorage.setItem("hotkey_delay", delay_box.value);
        }

        let save_btn = document.getElementById("save");

        save_btn.addEventListener("click", update_hotkey);
    }

    async function wait_till_visible(element) {
        await sleep(1000);

        let tries = 0;
        while (tries < 5) {
            let wait_element = document.querySelector(element);
            if (!wait_element) {
                await sleep(3000);
                console.log("Couldn't find the element. Trying again.");
                tries++;
            } else {
                console.log("Found the elemenet");
                break;
            }
        }
    }

    function add_css() {
        let my_css = `    
        .settings_box_wapper{
        position: fixed;
        left: -100%;
        bottom: 60px;
        height: 17rem;
        z-index: 500;
        width: 17rem;
        background-color: #ffffff;
        color: #394e6a;
        display: flex;
        padding: 1rem;
        border-radius: 20px;
        justify-content: center;
        border: #394e6a solid 3px;
        box-shadow: 5px 5px 2px #33333383;
        transition: 0.5s;

        & input{
            padding: 3px;
            width: 1rem;
            margin: 1rem;
            outline: none;
            text-align: center;
            border-bottom: #394e6a solid 2px;
        }

        & button{
            position: absolute;
            bottom: 16px;
            width: 6rem;
            align-self: center;
            cursor: pointer;
            background-color: #394e6a;
            color: #ffffff;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            border: none;

            &:hover{
                filter: brightness(0.8);
            }
            &:active{
                filter: brightness(0.7);
            }
        }
    }
    .box{
        display: flex;
        flex-direction: column;
    }

    #delay{
        width: 4rem;
    }`;
        let style_tag = document.createElement("style");
        style_tag.innerHTML = my_css;

        document.body.appendChild(style_tag);
    }

    let is_settings_box_shown = false;
    function toggle_settings() {
        let box_of_settings = document.querySelector(".settings_box_wapper");

        if (!is_settings_box_shown) {
            box_of_settings.style.left = "20px";
            is_settings_box_shown = true;
        } else {
            box_of_settings.style.left = "-100%";
            is_settings_box_shown = false;
        }
    }

    add_css();
    add_settings();
    add_settings_box();

    await wait_till_visible("[title ='settings']");
    let btn_settings = document.querySelector("[title ='settings']");
    btn_settings.addEventListener("click", toggle_settings);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener("keydown", async function (e) {
        let _hotkey = localStorage.getItem("hotkey");
        if (e.key === _hotkey) {
            e.preventDefault();
            console.log("X pressed!");

            ["keydown", "keypress", "keyup"].forEach((type) => {
                document.dispatchEvent(
                    new KeyboardEvent(type, {
                        key: "I",
                        code: "KeyI",
                        keyCode: 73,
                        which: 73,
                        bubbles: true,
                        cancelable: true,
                    })
                );
            });

            let canvas = document.querySelector("canvas");
            if (!canvas) {
                console.warn("Canvas not found!");
                return;
            }

            function fireClick(el, x, y) {
                ["mousedown", "mouseup", "click"].forEach((type) => {
                    el.dispatchEvent(
                        new MouseEvent(type, {
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            clientX: x,
                            clientY: y,
                            button: 0,
                        })
                    );
                });
            }

            fireClick(canvas, mouseX, mouseY);
            let c_delay = localStorage.getItem("hotkey_delay");
            c_delay = parseInt(c_delay);
            await sleep(c_delay);
            fireClick(canvas, mouseX, mouseY);
        }
    });
})();
