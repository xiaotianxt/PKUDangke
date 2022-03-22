// ==UserScript==
// @name         PKU Dangke
// @namespace    https://github.com/xiaotianxt
// @version      0.1
// @description  党课自动答题
// @author       xiaotianxt
// @match        http://dangxiao.pku.edu.cn/jjfz/lesson/exam?lesson_id=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pku.edu.cn
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

(function () {
  "use strict";
  window.onload = (e) => {
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
    function nextOne(index) {
      if (index < paper.length) {
        // 答案数组
        let answer = paper[index].answer;
        // 选项
        let options = document.querySelectorAll("div.exam_list li");

        // 点击答案
        options.forEach((item, index) => {
          if (answer[index].is_true) {
            item.click();
          }
        });

        // 冷却0.1秒后点击下一道题
        setTimeout(() => {
          let next = document.querySelector("#next_question");
          console.log(next);
          next.click();
          // 再冷却0.1秒后重新开始答题
          if (index + 1 < paper.length) {
            setTimeout(() => {
              nextOne(index + 1);
            }, 100);
          }
        }, 100);
      }
    }
    function initElem() {
      let title = document.querySelector(".exam_title");
      let btnAnswer = document.createElement("button");
      btnAnswer.textContent = "自动答题";
      btnAnswer.style.background = "#ce0000";
      btnAnswer.style.color = "#eee";
      btnAnswer.style.border = "1px solid #fff";
      btnAnswer.style.padding = "0 20px";
      btnAnswer.style.borderRadius = "5px";
      title.append(btnAnswer);

      let btnDownload = document.createElement("button");
      btnDownload.textContent = "下载题目";
      btnDownload.style.background = "#ce0000";
      btnDownload.style.color = "#eee";
      btnDownload.style.border = "1px solid #fff";
      btnDownload.style.padding = "0 20px";
      btnDownload.style.borderRadius = "5px";
      title.append(btnDownload);

      btnAnswer.addEventListener("click", (e) => {
        nextOne(0);
      });

      btnDownload.addEventListener("click", (e) => {
        downFile();
      });
    }
    let paper = paper_info.paper;
    var index = 0;
    initElem();
  };
})();
