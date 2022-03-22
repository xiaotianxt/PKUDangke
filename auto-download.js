// ==UserScript==
// @name         Dangke - Course Download
// @namespace    https://github.com/xiaotianxt
// @version      0.1
// @description  用于自动下载问题内容(JSON)
// @author       xiaotianxt
// @match        http://dangxiao.pku.edu.cn/jjfz/lesson/exam?lesson_id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pku.edu.cn
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

(function () {
  "use strict";
  let paper = paper_info.paper;

  function downFile() {
    var elem = document.createElement("a");
    var name = `【${document
      .querySelector("h1.exam_span")
      .textContent.slice(5)}】${new Date().toISOString()}.json`;
    console.log(name);

    elem.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + JSON.stringify(paper)
    );
    elem.setAttribute("download", name);
    elem.style.display = "none";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
  downFile();
  let quitExam = document.querySelector("a.exam_a");
  quitExam.click();
  setTimeout(() => {
    let quitConfirm = document.querySelector("a.public_submit");
    quitConfirm.click();
  }, 10);
})();
