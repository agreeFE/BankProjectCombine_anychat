import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';
import Tips from '@/components/toast';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native'
import {dev_basePath} from '@/util/networkutil.js'
import ActionSheet from 'react-native-actionsheet-api';
import comfirm from "@/components/confirm"
import AlertComponent from './components/Alert';
const theme = require('$theme/index.js')



//样式主题 blue,green
window.$globalStyle = theme;
window.$globalThemeType = theme.themeType;

// 云柜员点击状态
window.$globalVideoState = '';
window.$globalVideoRouter = '';
window.$globalManageMoney = '';
window.$globalManageName = '';
window.$globalBankCardNum = '';

// alert(blue.backgroundColor)

// let ActionSheet = require('@/components/actionSheet/actionSheet.js'); //弹窗

import { Platform } from 'react-native';

window.$ = { instanceList: [] };

if (!window.$Storage) {
  console.warn('初始化本地存储Storage')
  window.$Storage = new Storage({
    // 最大容量
    size: 10000,
    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,
    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,
    // 读写时在内存中缓存数据。默认启用。
    enableCache: true
  });
} else {
  console.warn('已初始化本地存储，不再重新初始化')
}

// 处理Toast
if (!window.$Toast) {
  /**
   * 初始化Toast组件
   * @author 孟庆云
   *
   * @param content: 提示内容，默认无
   * @param duration: 自动关闭延时，单位秒，默认值3秒
   * @param onClose: 关闭后回调，默认无
   * @param mask: 是否显示遮罩层，默认true
   */
  window.$Toast = {
    success(content, duration, onClose, mask) {
      Tips.showSuccess(content, buildToastSettings(duration, onClose, mask));
    },
    fail(content, duration, onClose, mask) {
      Tips.showFail(content, buildToastSettings(duration, onClose, mask));
    },
    info(content, duration, onClose, mask) {
      Tips.show(content, buildToastSettings(duration, onClose, mask));
    },
    loading(content, duration, onClose, mask) {
      if (duration == undefined) {
        duration = 0;
      }
      Tips.showLoading(content, buildToastSettings(duration, onClose, mask));
    },
    offline(content, duration, onClose, mask) {
      Tips.showFail(content, buildToastSettings(duration, onClose, mask));
    },
    hide() {
      Tips.hide();
    }
  };
}

// 处理ActionSheet
if (!window.$ActionSheet) {
  /**
   * 初始化ActionSheet组件
   * @author 刘晓斌
   *
   * 调用范例:
    window.$ActionSheet.showActionSheetWithOptions({
          title: '选择登录方式',
          options: ['1','2'],
          cancelButtonIndex: 1,
          //destructiveButtonIndex: 0,
          tintColor: 'green',
        },
        (buttonIndex) => {
          // alert(buttonIndex)
        }
    );
   */
  window.$ActionSheet = ActionSheet;
}

/**
   * 初始化弹框confirm插件
   * @author 刘晓斌
   *
   * 调用范例:
    let defaultAction = [
            {
              text: '取消',
              onPress: () => {
                alert('触发了取消1')
              },
              style: 'default',
            },
            {
              text: '确定', onPress: () => {
                alert('触发了确定2')
              },
            }
          ];
      window.$Modal.confirm('这是title','这是content',defaultAction)
   */
window.$Modal = {
  //确认提示框
  confirm(title, message, actions) {
    let defaultAction = [
      {
        text: '取消',
        onPress: () => {
          console.log('触发了取消')
        },
        style: 'default',
      },
      {
        text: '确定', onPress: () => {
          console.log('触发了确定')
        },
      }
    ];
    if (actions) {
      defaultAction = actions;
    }
    comfirm.show(title, message, defaultAction);
  },
  alert(title, message) {
    AlertComponent.show(title, message);
  }
}

window.$platformOS = () => {
  return Platform.OS;
}

/**
 * 构建toast设置
 */
function buildToastSettings(duration, onClose, mask) {
  duration = (duration == undefined) ? 3000 : (duration == 0 ? 9007199254740992 : duration * 1000)
  mask = mask == undefined ? true : mask;

  return {
    duration,
    mask,
    onHidden: onClose
  }
}
// 理财页面-请求URL配置
window.financialURL = `${dev_basePath.substr(7)}/resource`
window.financialFund = {
  financial:6537.30,
  fund:5432.52,
  financialEarn:0.65,
  fundEarn:166
}