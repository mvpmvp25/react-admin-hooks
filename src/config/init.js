import Bowser from 'bowser';
import * as Sentry from '@sentry/browser';

export const appStart = {
  init() {
    this.sentry();
    //   this.setFontSize();
    this.checkClient();
  },
  sentry() {
    // 监听异常
    // import('@sentry/browser')
    //   .then(function(Sentry) {
    process.env.SERVER_TYPE != 'prod' &&
      Sentry.init({
        environment: process.env.SERVER_TYPE,
        dsn: 'https://888e90af1e624df4b3da5bef4d7921a0@sentry.io/1552268'
      });
    // })
    // .catch(function(err) {
    //   console.log('Failed to load sentry', err);
    // });
  },
  // setFontSize() {
  //   let designSize = 1440; // 设计稿宽尺寸(px)
  //   let designScale = 1; // 高保真缩小比例
  //   let baseSize = 50; // rem转px基数
  //   (function (doc, win) {
  //     let docEl = doc.documentElement,
  //       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  //       recalc = function () {
  //         let clientWidth = docEl.clientWidth;
  //         if (!clientWidth) return;
  //         clientWidth = Math.min(clientWidth, designSize);
  //         docEl.style.fontSize = baseSize * (clientWidth / (designSize * designScale)) + 'px';
  //       };
  //     if (!doc.addEventListener) return;
  //     win.addEventListener(resizeEvt, recalc, false);
  //     doc.addEventListener('DOMContentLoaded', recalc, false);
  //   })(document, window);
  // },
  checkClient() {
    // import('bowser')
    //   .then(function(Bowser) {
    const browser = Bowser.getParser(window.navigator.userAgent);
    // console.log(browser.getBrowser());
    const isValidBrowser = browser.satisfies({
      windows: {
        'internet explorer': '>=11'
      }
    });
    let ableBrowser = isValidBrowser == undefined || isValidBrowser;
    if (!ableBrowser) {
      // 需要升級瀏覽器
      let pageHtml =
        '<div style="width: 100%; height: 100%; position: relative; background-color: #efefef; margin: 0; padding: 0">' +
        '<div style="width: 400px; height: 220px; position: absolute; top: 50%; left: 50%; margin-left: -200px; margin-top: -150px; background-color: #fff; padding: 30px; border-radius: 5px;box-shadow: 1px 1px 16px 0 rgba(0, 0, 0, 0.16); text-align: center">' +
        // '<div style="width: 100%; overflow: hidden;width: 160px;height: 160px; margin: 84px auto 0;background: url(' + netErrorIcon + ') no-repeat;background-size: 100%;"></div>' +
        '<img src="' +
        require('assets/img/yay.jpg') +
        '" style="margin: 0 auto"/>' +
        // '<div id="loadAgainBtn" style="width: 100%; overflow: hidden;width: 98px;height: 30px;line-height: 30px;margin: 24px auto 0;border: 1px #FA5575 solid;font-size: 14px;color: #FA5575;text-align: center;border-radius: 16px;">重新加載</div>' +
        '<p style="color: #555; font-size: 14px; text-align: left; line-height: 22px;padding-top: 20px;">請使用下列任何一種瀏覽器瀏覽以達至最佳的用戶體驗：Google Chrome, Mozilla Firefox, Internet Explorer, Microsoft Edge 或 Safari。為避免使用網頁時發生問題請確保你的網頁瀏覽器已更新至最新版本。</p>' +
        '</div>' +
        '</div>';
      //document.querySelector("body").insertAdjacentHTML("beforeEnd", pageHtml);
      document.querySelector('body').innerHTML = pageHtml;
      // let loadAgainBtnEle = document.querySelector("#loadAgainBtn");
      // loadAgainBtnEle.addEventListener("click", function () {
      // });
    }
    // })
    // .catch(function(err) {
    //   console.log('Failed to load bowser', err);
    // });
  }
};
