/*
 * 路由控制封装
 */

import { getLoginToken } from './util/tokenutil';
import RNExitApp from 'react-native-exit-app';
import Picker from 'react-native-picker'
let time = 0
console.log('router-control',getCurrentRouter())
/**
 * 获取当前的路由
 * @author
 * */
function getCurrentRouter() {
  return window.navigatorObj && window.navigatorObj.length > 0
    ? window.navigatorObj[window.navigatorObj.length - 1]
    : null;
}

/**
 * 路由的load方法
 * @author 孟庆云,刘晓斌
 *
 * @param router 跳转的目标router
 * @param params 参数
 * @param mainBundleFlag 是否主bundle(非必输)：true-主bundle；false=子bundle。默认false-子bundle
 * @param bundle 跳转的bundle(非必输)
 */
function load(router, params, mainBundleFlag, bundle) {
  Picker.hide()
  if (window.$Toast) {
    $Toast.hide();
  }
  //设置本地缓存
  console.log('入参信息: ');
  console.log(
    '是否主bundle: ',
    mainBundleFlag == undefined ? false : mainBundleFlag
  );
  if (bundle) {
    console.log('即将跳转的bundle: ', bundle);
  }
  console.log('路由信息: ', router);
  if (!params) {
    params = {};
  }
  console.log('参数信息: ', params);

  mainBundleFlag = mainBundleFlag == undefined ? false : mainBundleFlag;
  if (window.noLoginRouters.indexOf(router) != -1) {
    getCurrentRouter().navigate(router, params);
  } else {
    if (!getLoginToken().data) {
      // token校验失败，直接跳转登录页
      jumpToLogin(router, params, mainBundleFlag, bundle);
    } else {
      console.log('有token');
      // console.log(getCurrentRouter())
      // 有token,跳转
      getCurrentRouter().navigate(router, params);
    }
  }
}

/**
 * 路由的replace方法
 * @author 孟庆云,刘晓斌
 *
 * @param router 跳转的目标router
 * @param params 参数
 * @param mainBundleFlag 是否主bundle(非必输)：true-主bundle；false=子bundle。默认false-子bundle
 * @param bundle 跳转的bundle(非必输)
 */
function replace(router, params, mainBundleFlag, bundle) {
  Picker.hide()
  if (window.$Toast) {
    $Toast.hide();
  }
  //设置本地缓存
  console.log('入参信息: ');
  console.log(
    '是否主bundle: ',
    mainBundleFlag == undefined ? false : mainBundleFlag
  );
  if (bundle) {
    console.log('即将跳转的bundle: ', bundle);
  }
  console.log('路由信息: ', router);
  if (!params) {
    params = {};
  }
  console.log('参数信息: ', params);

  mainBundleFlag = mainBundleFlag == undefined ? false : mainBundleFlag;


  if (window.noLoginRouters.indexOf(router) != -1) {
    getCurrentRouter().replace(router, params);
    window.navigatorObj.splice(window.navigatorObj.length - 2, 1);
  } else {
    if (!getLoginToken().data) {
      // token校验失败，直接跳转登录页
      jumpToLogin(router, params, mainBundleFlag, bundle);
    } else {
      console.log('有token');
      // console.log(getCurrentRouter())
      // 有token,跳转
      getCurrentRouter().replace(router, params);
      window.navigatorObj.splice(window.navigatorObj.length - 2, 1);
    }
  }
}

/**
 * 私有方法，跳转登录页后再跳转目标路由
 * @author 孟庆云,刘晓斌
 */
function jumpToLogin(router, params, mainBundleFlag, bundle) {
  Picker.hide();
  /*
		TODO 由于SDK暂时无法获取当前bundle的ID，也不能指定跳转bundle后的路由，因此暂时未拆分bundle，等可以拆分bundle时，重新该部分
	*/
  if (bundle) {
    // 预留跳转bundle
  } else {
    let passData = { routername: router };
    if (params) {
      passData.params = JSON.stringify(params);
    }

    //跳转
    getCurrentRouter().navigate('login', {
      params: passData
    });
  }
}

/**
 * react-navigation的goBack方法，如果当前是最底层路由，直接退出应用
 * @author 孟庆云
 * */
function back() {
  const router = getCurrentRouter();
  Picker.hide();
  if (window.$Toast) {
    $Toast.hide();
  }
  if (router && window.navigatorObj.length > 1) {
    // if (window.$Picker) {
    //   $Picker.hide();
    // }
    router.pop();
    window.navigatorObj.pop();
  } else {
    if(time === 0) {
      $Toast.info('再按一次退出',2)
      time = 1
      setTimeout(()=>{
        time = 0
      },2000)
      return
    }
    RNExitApp.exitApp();
  }
}

/**
 * react-navigation的Pop方法
 * @author 孟庆云
 *
 * @param number: 弹出的页面数量，默认为1
 * */
function pop(number) {
  Picker.hide();
  if (window.$Toast) {
    $Toast.hide();
  }
  const router = getCurrentRouter();
  if (router && window.navigatorObj.length > 1) {
    if (number) {
      router.pop(number);
      for (let i = 0; i < number; i++) {
        window.navigatorObj.pop();
      }
    } else {
      router.pop();
      window.navigatorObj.pop();
    }
  } else {
    if(time === 0) {
      $Toast.info('再按一次退出')
      time ++
      return
    }
    RNExitApp.exitApp();
  }
}

/**
 * react-navigation的popToTop方法
 * @author 孟庆云
 * */
function popToTop() {
  const router = getCurrentRouter();
  Picker.hide();
  if (window.$Toast) {
    $Toast.hide();
  }

  if (router && window.navigatorObj.length > 1) {

    router.popToTop();
    window.navigatorObj.splice(1, window.navigatorObj.length - 1);
  } else {
    if(time === 0) {
      $Toast.info('再按一次退出')
      time ++
      return
    }
    RNExitApp.exitApp();
  }
}

/**
 * 获取路由参数
 * @author 孟庆云
 * */
function getParams(param) {
  return getCurrentRouter().state.params[param];
}

/**
 * 获取路由名称
 * @author 孟庆云
 * */
function getRouteName() {
  return getCurrentRouter().state.routeName;
}

function exitApp() {
  window.$Modal.confirm("确认", "是否退出应用？", [
    {
      text: '取消',
      onPress: () => {
        console.log('触发了取消')
      },
      style: 'default',
    },
    {
      text: '确定', onPress: () => {
        RNExitApp.exitApp();
      },
    }
  ])
}

module.exports = {
  load,
  replace,
  back,
  pop,
  popToTop,
  getParams,
  getRouteName
};
