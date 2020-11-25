/**
 * @format
 */

import {AppRegistry} from 'react-native';
let App = require('./App')
import {name as appName} from './app.json';

// 如果是开发阶段，针对网络请求做代理，在chrome控制台上看到网络请求的相关信息
if (__DEV__) {
  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
}
// 在非开发环境，所有的控制台语句就会被自动替换为空函数，而在调试时它们仍然会被正常调用
if (!__DEV__) {
  let consoleObj = {};
  for (let i in console) {
    const keyType = typeof console[i];

    if (keyType === "function") {
      if (i === "error" || i === "warn") {
        consoleObj[i] = console[i];
      } else {
        consoleObj[i] = () => {};
      }
    } else {
      consoleObj[i] = console[i];
    }
  }
  global.console = consoleObj;
}
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
