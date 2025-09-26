// ==UserScript==
// @name         C-tele Downloader
// @namespace    http://tampermonkey.net/
// @version      2025-09-25
// @description  Gallery downloader for cosplaytele.
// @author       Zap_09
// @match        https://cosplaytele.com/*
// @exclude      https://cosplaytele.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cosplaytele.com
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

(function () {
    "use strict";

    let reverse_file_name_order = true;



    let banner_html = `<div id="banner"></div>`;
    document.body.insertAdjacentHTML("afterbegin", banner_html);
    let main_content = document.querySelector(".entry-content");
    if(!main_content){return}

    let all_p_tags = main_content.querySelectorAll("p");

    let last_entry_number = all_p_tags.length - 1;
    let last_p_tag = all_p_tags[last_entry_number];



    let new_element = document.createElement("p");
    new_element.style = `text-align: center;`

    new_element.innerHTML = '<strong><span class="button alert download_btn" id= "download_btn"style="font-size: 100%;">Download</span></strong>'

    last_p_tag.insertAdjacentElement("afterend", new_element);

    let downloadButton = document.getElementById("download_btn");
    downloadButton.addEventListener("click",main);


    let banner_css = `
    #banner{
        background-color: #010101;
        color: #ffffff;
        text-align: center;
        width: 25vw;
        max-width: 300px;
        border: solid #a60000 3px;
        border-radius: 7px;
        padding: 1rem;
        position: fixed;
        top: -1000px;
        transition: 0.5s;
        left: 50%;
        transform: translate(-50%);
        z-index: 200;
    }

    .download_btn{
        border-radius: 99px;
        background-color: #b20000;

    }


    `;

    GM_addStyle(banner_css)



    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async function banner(msg){
        let banner = document.getElementById("banner");
        banner.textContent = msg;
        banner.style.top = '10px';
        await sleep(3000);
        banner.style.top = '-1000px';
        banner.textContent = "";
    }

    function addJSzip() {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
            script.onload = resolve;
            document.head.appendChild(script);
        });
    }

    addJSzip();


    function get_title() {
        let raw_title = document.querySelector(".entry-title");

        if (!raw_title) {
            return null;
        }
        let clean_title = raw_title.textContent.trim();

        clean_title = clean_title.replace(/["“”'].*?["“”']/g, "");
        clean_title = clean_title.replace(/\b\d+\s+(photos?|videos?)\b/gi, "");
        clean_title = clean_title.replace(/[^\x00-\x7F]/g, "");
        clean_title = clean_title.replace(/[^a-zA-Z0-9\- ]/g, "");
        clean_title = clean_title.replace(/\s+/g, " ").trim();
        return clean_title;
    }

    function get_images() {
        let src_list = [];

        let image_list = document.querySelectorAll(".gallery-item");
        image_list.forEach((i) => {
            let img = i.querySelector("img");
            let src = img.getAttribute("src");
            src_list.push(src);
        });
        return src_list;
    }

    async function download_and_zip(url_list, filename) {
        /* eslint-disable-next-line no-undef */
        const zip = new JSZip();
        let images_Promises = url_list.map(async (url, index) => {
            try {
                let response = await fetch(url);
                if (!response.ok)throw new Error(`HTTP error ${response.status}`);

                let blob = await response.blob();
                if (reverse_file_name_order) {
                    let reverseIndex = url_list.length - index;
                    zip.file(`Photo${reverseIndex}.jpg`, blob);
                } else {
                    zip.file(`Photo${index + 1}.jpg`, blob);
                }
            } catch (error) {
                console.warn(`Failed to fetch image: ${url}`, error);
            }
        });
        await Promise.all(images_Promises);
        let content = await zip.generateAsync({
            type: "blob",
        });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(content);
        link.download = `${filename}.zip`;
        link.click();
    }

    function main() {
        banner("Script Started")


        let title = get_title();
        console.log("got this title")
        let urls = get_images();
        console.log("got the urls")
        if (title) {
            download_and_zip(urls, title);
        } else {
            console.log("No titles was found. So can't start the download");
            banner("No titles was found. So can't start the download");
        }
    }
})();
