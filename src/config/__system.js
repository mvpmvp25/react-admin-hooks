import React from 'react';
import Loadable from 'react-loadable';
import appConfig from 'config/setting';
import appHistory from '../history';

function LoadingComponent(props) {
  if (props.error) {
    // When the loader has errored
    return (
      <div>
        Error! <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay
    return <div>Loading...</div>;
  } else {
    // When the loader has just started
    return null;
  }
}

// 路由生成
const routeFiles = require.context('routes', true, /\.js$/).keys();
export const routeList = routeFiles.map(item => {
  // ./xx/xxx.js
  let _path = item.replace(/\.js|\./g, '');
  let isHomePath = _path == appConfig.indexPath;
  let isExclude = appConfig.routeExclude.includes(_path);
  let visitPath = isHomePath ? '/' : _path;
  _path = isExclude ? appConfig.indexPath : _path; // 访问忽略的路由显示首页
  // let _site = item.replace(/\.js|\.\//g, "");
  let _component = Loadable({
    loader: () => import('../routes' + _path),
    loading: LoadingComponent,
    // delay: 200,
    timeout: appConfig.routeTimeout
  });
  let routeInfo = { path: visitPath, component: _component };
  return routeInfo;
});

// 获取面包屑文案
export const getBreadcrumb = key => {
  let allMenuInfo = {};
  appConfig.leftMenuList.forEach(item => {
    item.menu.forEach(v => {
      allMenuInfo[`/${item.navKey}/${v.key}`] = [
        {
          navText: item.navName
        },
        {
          navText: v.name
        }
      ];
    });
  });
  return allMenuInfo[key];
};

export const pageView = {
  // rollTop() {
  //   window.scrollTo(0, 0);
  // },
  go(route) {
    appHistory.push(route);
    // this.rollTop();
  },
  replace(route) {
    appHistory.replace(route);
    // this.rollTop();
  },
  goBack() {
    appHistory.goBack();
    // this.rollTop();
  }
  // barOpen(info) {
  //   if (info.type == 0) { // 外鏈
  //     window.open(info.url);
  //   } else if (info.type == 1) { // 內鏈
  //     let theRoute = BBT_ARTICLE_ROUTE[info.articleType];
  //     this.go(theRoute + "?id=" + info.articleId + "&title=" + info.title);
  //   }
  // },
  // goLink(url) {
  //   document.querySelector("body").style.opacity = 0;// 页面离开再回来会有残留ui;
  //   window.location.href = url;
  // },
  // openLink(url) {
  //   window.open(url);
  // },
  // replaceLink(url) {
  //   window.location.replace(url);
  // }
};
