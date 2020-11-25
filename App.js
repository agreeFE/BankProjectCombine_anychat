/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { View, StatusBar, BackHandler, DeviceEventEmitter,AppState, NativeModules, ToastAndroid } from 'react-native';
import data from 'react-native'
import { createAppContainer } from 'react-navigation';
import EventBus from '@/components/eventBus/eventBus';
import SplashScreen from 'react-native-splash-screen';
const { setLoginToken, getLoginToken,  } = require('$/util/tokenutil')
let {getTimespamp} = require('$/util/dateutil');

window.noLoginRouters = ['login', 'homeScrollable', 'scan'];

const NetworkUtil = require("$/util/networkutil");

// import TouchID from 'react-native-touch-id';

import '@/window'

import RootStack from './router/router.js';

let AppTag = createAppContainer(RootStack);
const router = require("@/router-control");
const directBack = ['licaiProduct/financialProduct.html', 'licaiProduct/hold.html', 'jijin/jijin.html', 'jijin/chicang.html']
// let BACK_TO_LOGIN_TIME = 10 * 60 * 1000;
let preTimes = 0
module.exports = class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      color: 'light-content',
      isGetNavigator: '0', //0代表没拿到navagator,1代表拿到
      currentAppState: AppState.currentState,
      BACK_TO_LOGIN_TIME: 24 * 60 * 60 * 1000
    };

    const _this = this;
    this.getNoNeedLoginRouter = this.getNoNeedLoginRouter.bind(this);
    // SplashScreen.hide();
    _this.getNoNeedLoginRouter();
    // $Storage.load({ key: 'routerList' }).then(result => {
    //   _this.generateNoNeedLoginRouterList(result);

    //   _this.getNoNeedLoginRouter();
    // }).catch(err => {
    //   if (err.name === "NotFoundError") {
    //     console.warn("本地没有缓存路由信息");

    //     _this.getNoNeedLoginRouter();
    //   }
    // })
  }

  componentDidMount() {
    // window.AppStateStatus = 'active';
    // window.backgroundTime = '';
    // window.activeTime = getTimespamp(new Date());
    // const ToastExample = NativeModules.ToastExample;
    // console.warn('toast', $Storage.cache.size)
    AppState.addEventListener('change',this._handleAppStateChange);
    //监听到设备触发返回键时，调用backForAndroid方法
    const _this = this;
    BackHandler.addEventListener('hardwareBackPress', function () {
      if (window.webview) {
        const currenturl = window.webviewState.url;
        let webviewBackFlag = true
        directBack.forEach(node => {
          if (currenturl.indexOf(node) != -1) {
            webviewBackFlag = false;
          }
        });
        if (webviewBackFlag && window.canGoBack) {
          window.webview.goBack();
        } else {
          router.back();
        }
        return true;
      } else {
        const currentRouterName = router.getRouteName();

        if (currentRouterName === 'tellerOperation') {
          // 如果是云柜员的页面，直接跳转到评价页
          router.replace('evaluate');
        } else {
          router.back();
        }
        return true;
      }
    });

    // 监听通知点击事件
    // console.log("监听通知点击事件");
    this.emitter = DeviceEventEmitter.addListener("remoteNotificationReceived", result => {
      result = JSON.parse(result.dataJSON);
      console.log(result);

      if (result.action) {
        // 带actions选项，并且点击在选项上

      } else {
        // 不带actions选项，或没有点击在选项上
        if (result.param) {
          const param = JSON.parse(result.param);
          if (param.router) {
            router.load(param.router);
          }
        }
      }
    })

    this.listener = DeviceEventEmitter.addListener('getTimeOut', result => {
      this.setState({
        BACK_TO_LOGIN_TIME: result * 60 * 1000
      })
    })

    this.refresh = DeviceEventEmitter.addListener('refreshToken', result => {
      window.tokenScope = result
      this.setState({
        tokenScope: result
      })
    })

    this.interval =  setInterval(() => {
      // if(!getLoginToken().data) return
      // let req_msg = {
      //   scope: '0',
      // }
      // // NetworkUtil.networkService("/user/oauth/refresh", req_msg, response => {
      // NetworkUtil.networkService("/oauth/refresh", req_msg, response => {
      //   // console.warn('223', result)
      // })
    }, 30*1000);

    // window.$ActionSheet = ActionSheet;

    // 存储测试
    /* console.warn('保存数据测试')
    $Storage.save({
      key: 'login',
      data: '123',
      expire: null
    });

    setTimeout(() => {
      console.warn('1秒后获取')
      $Storage.load({
        key: 'login'
      }).then(ret => {
        console.warn('获取成功', ret)
      })
    }, 1000); */
    // TouchID测试
    /* TouchID.isSupported().then(result => {
      if (result === 'TouchID') {
        // 苹果手机TouchID
        console.warn('苹果手机TouchID')
      } else if (result === 'FaceID') {
        // 苹果手机FaceID
        console.warn('苹果手机FaceID')
      } else if (result === true) {
        // 安卓手机
        console.warn('安卓手机')
      } else {
        console.error('有错误了')
      }

      if (result) {
        TouchID.authenticate().then(authResult => {
          console.warn(authResult)
        })
      }
    }) */
  }

  render() {
    return (
      //   <StatusBar hidden={true} />
      <View style={{ width: '100%', height: '100%' }}>
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false} //是否隐藏状态栏。
          backgroundColor="transparent" //状态栏的背景色
          translucent={true} //指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle="light-content"
        />
        <AppTag />
      </View>
    );
  }
  // 监听window,在一级路由页面成功加载时,将navigator赋值给window,用来做二次封装
  UNSAFE_componentWillMount(): void {
    // console.log('监听界面:componentWillMount');
    // console.log('进行监听');
    clearInterval(this.interval)
    const _this = this;
    this.subscribe = EventBus.addListener('navigatorData', data => {
      if (!window.navigatorObj) {
        window.navigatorObj = [];
      }

      window.navigatorObj.push(data.data);

      if (_this.state.isGetNavigator == '0') {
        _this.setState({
          isGetNavigator: '1',
        });
      }
    });
  }
  componentWillUnmount(): void {
    this.emitter.remove();
    this.listener.remove();
    this.refresh.remove()
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const { BACK_TO_LOGIN_TIME } = this.state
    if (this.state.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
        let tempTime =  getTimespamp(new Date());
        let waste = tempTime - preTimes;
        console.log('----'+preTimes+'----waste:' + waste)
        console.log('BACK_TO_LOGIN_TIME====='+BACK_TO_LOGIN_TIME)
        // let hasToken = verifyLoginTokenUsage(getLoginToken.data) == 0 || verifyLoginTokenUsage(getLoginToken.data) == 3
        // if (waste > BACK_TO_LOGIN_TIME || (getLoginToken.data && hasToken)) {
        if (waste > BACK_TO_LOGIN_TIME) {
          setLoginToken(undefined)
          window.bankCard = undefined
          window.bankInfo = undefined
          // router.load('login')
          console.log(`AppState：It's too late,login again`)
        }else{
            console.warn('AppState：'+'回来的很及时', BACK_TO_LOGIN_TIME)
        }
        console.warn('AppState:'+'现在在前台', waste)
    }else{
        //前台切换至后台
        // $Toast.info('APP进入后台运行')
        // NativeModules.ToastExample.show('APP进入后台运行', 100)
        ToastAndroid.show('进入后台运行', 100)
        console.log('AppState:'+'现在在后台')
        preTimes = getTimespamp(new Date());
    }
    this.setState({ currentAppState:nextAppState});
  }

  getNoNeedLoginRouter() {
    const _this = this;

    // NetworkUtil.networkService("/home/router", {}, result => {
      // console.warn('result', result.routerList);

      // const routerList = result.routerList;
      // _this.generateNoNeedLoginRouterList(routerList);
      
      // $Storage.save({
      //   key: 'routerList',
      //   data: routerList,
      //   expire: null
      // });

      // 隐藏SplashScreen
      setTimeout(() => {
        SplashScreen.hide();
      }, 1000);
    // }, err => {
    //   console.error(err)

    //   // 隐藏SplashScreen
    //   SplashScreen.hide();
    // });
  }
  generateNoNeedLoginRouterList(routerList) {
    let noNeedLoginRouter = [];
    routerList.map(node => {
      if (node.needLogin === 0) {
        noNeedLoginRouter.push(node.name);
      }
    });
    console.log("不需要登录的路由列表", noNeedLoginRouter);
    window.noLoginRouters = noNeedLoginRouter;
  }
};
