// ==UserScript==
// @name         Auto Login
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  try to take over the world!
// @author       Zap_09
// @match        https://niyaniya.moe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=niyaniya.moe
// @grant        none
// @run-at       document-end
// ==/UserScript==

(async function () {
    "use strict";

    //temp69
    //temp6969
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    let retries = 0;
    await sleep(500);
    while (retries <= 3 ) {

            let menu_btn = document.querySelector("button[title='Menu']");
            console.log("Menu button was found");
            if (menu_btn) {
                menu_btn.addEventListener("click", add_login_btn);
                break
            } else {
                await sleep(3000);
                retries += 1;
        }
    }

    function add_login_btn() {
        let xpath = "/html/body/div/div/div[2]/nav/ul[3]";
        let result = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );

        let element = result.singleNodeValue;

        let login_btn = document.createElement("li");
        login_btn.innerHTML = `<a class="rounded flex items-center py-8 px-10" ><svg fill="none" class="size-20" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="2"><path d="M16 15.503A5.041 5.041 0 1 0 16 5.42a5.041 5.041 0 0 0 0 10.083zm0 2.215c-6.703 0-11 3.699-11 5.5v3.363h22v-3.363c0-2.178-4.068-5.5-11-5.5z"/></svg><span>Login</span></a>`;

        element.appendChild(login_btn);
        login_btn.style = "cursor: pointer;";

        login_btn.addEventListener("click", add_item);

        let menu_btn = document.querySelector("button[title='Menu']");
        menu_btn.removeEventListener("click", add_login_btn);
    }

    function add_item() {
        localStorage.setItem(
            "token",
            '{"expr":1761457065406,"refresh":"a2f5f30b-cf20-4cd1-9c9b-b6207b114106","session":"5b6ced04-aeba-4984-abc1-546bcc862e99","next":1758951464638}'
        );

        localStorage.setItem(
            "general",
            '{"include":[],"exclude":[6735,216165,4884],"version":1738646117268}'
        );
        location.reload();
    }
})();
