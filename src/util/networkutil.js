// 运行环境: dev-开发，直连挡板; prd-实际运行
const env = "dev";
import {DeviceEventEmitter} from 'react-native'
// import sm4utils from './sm4utils'
import {
  verifyLoginTokenUsage,
  getLoginToken,
  setLoginToken
} from "./tokenutil";

// let sm4 = new sm4utils('1234567890123456')

const router = require("$/router-control");
const DeviceUtil = require("./deviceutil");

import "@/window";

const ErrorMsg = require("./errorcode");

// 定义请求的basePath
// 外网
// const dev_basePath = "http://123.103.88.18:53067/default/mobilebank-gateway/mbankgw";
// const dev_basePath = "http://123.103.88.18:53067/default/mobilebank-dmzgateway/mbankdmzgateway";
const dev_basePath = "http://192.168.60.150:10000";
// const dev_basePath = "http://192.168.137.1:10000";

// 登录URL集合
const loginURLs = [
  // "/oauth/token", // 密码登录
  "/oauth/token", // 密码登录
  "/oauth/gesture", // 手势登录
  "/oauth/finger", // 指纹登录
  "/oauth/face", // 人脸登录,
  '/oauth/bioLogin',
  '/home/router'
];

// 刷新JWT Token的URL
// const refreshTokenURL = "/oauth/refresh";
const refreshTokenURL = "/oauth/refresh";
// 引入axios
import axios from "axios";

/**
 * 公共请求方法
 * @author 孟庆云
 * */
// function networkService(url, data, response, err) {
//   // debugger;
//   // 不是登录/刷新Token的请求，token超时时直接跳转登录页，登录后再继续处理
//   if (refreshTokenURL != url && loginURLs.indexOf(url) === -1) {
//     // 前端发现超时，直接跳转登录页面
//     const verifyTokenResult = verifyLoginTokenUsage(getLoginToken().data);

//     switch (verifyTokenResult) {
//       case 0:
//         console.log("Token失效，跳转登录");
//         $Toast.fail("登录超时，请重新登录");

//         router.load("login", {
//           afterGoBack: function() {
//             networkService(url, data, response, err);
//           }
//         });
//         break;
//       case 2:
//         console.log("token使用时间大于1分钟，先刷新token，再继续操作");
//         // token已使用超过1分钟，先刷新token，再继续操作
//         refreshToken(() => {
//           request(url, data, response, err)
//         });
//         break;
//       default:
//         console.log("Token正常，直接发起请求");
//         request(url, data, response, err);
//     }
//   } else {
//     console.log("登录或刷新，直接发起请求");
//     request(url, data, response, err);
//   }
// }


/**
 * 公共请求方法
 * @author 刘晓斌
 * */
function networkService(url, data, response, err) {
  // 不是登录/刷新Token的请求，token超时时直接跳转登录页，登录后再继续处理
  // console.log('url', url,refreshTokenURL != url , loginURLs.indexOf(url) === -1)
  if (refreshTokenURL != url && loginURLs.indexOf(url) === -1) {
    // 前端发现超时，直接跳转登录页面
    // const verifyTokenResultCheck = verifyLoginTokenUsage(getLoginToken().data);

    // switch (verifyTokenResultCheck) {
    //   case 0:
    //     console.log("Token失效，跳转登录");
    //     $Toast.fail("登录超时，请重新登录");

    //     router.load("login", {
    //       afterGoBack: function() {
    //         networkService(url, data, response, err);
    //       }
    //     });
    //     break;
        
    //   default:
    //     console.log("Token正常，直接发起请求");
    //     request(url, data, response, err);
    // }
    if(!getLoginToken().data) {
      console.log("Token失效，跳转登录");
      $Toast.fail("登录超时，请重新登录");
      router.load("login", {
        afterGoBack: function() {
          networkService(url, data, response, err);
        }
      });
    } else {
      console.log("Token正常，直接发起请求");
      request(url, data, response, err);
    }
  } else {
    console.log("登录或刷新，直接发起请求");
    request(url, data, response, err);
  }
}



/**
 * 获取请求头信息
 * @author 孟庆云
 * */
async function getHeaders(url) {
  const deviceId = DeviceUtil.getDeviceIdSync();
  console.log("NetworkUtil.DeviceID: " + deviceId);
  const applicationId = await DeviceUtil.getApplicationId();
  const headers = {
    "Content-Type": "application/json",
    deviceid: deviceId,
    appid: applicationId,
  };

  if (getLoginToken().data && loginURLs.indexOf(url) == -1) {
    headers.token = getLoginToken().data;
  }
  console.log("请求头信息: ", headers);
  return headers;
}

/**
 * 发起后端请求
 * @author 孟庆云
 * */
async function request(url, data, response, err) {
  // if(url!='/oauth/refresh'){
  if(url!='/oauth/refresh'){
    $Toast.loading("Loading...");
  }
  const requestConfig = {
    url: dev_basePath + url, // 请求URL
    method: "post",
    headers: await getHeaders(url), // 请求头信息
    withCredentials: false, // 跨域请求时是否需要凭证
    timeout: 20000, // 超时时间，单位毫秒
    responseType: "json", // 服务器响应的数据类型
    responseEncoding: "utf8", // 响应报文的编码方式
  };

  console.log("请求地址: ", dev_basePath + url);
  console.log("请求报文头: ", JSON.stringify(requestConfig.headers));
  if (data) {

    // const reqData = { reqMsg: data };
    const reqData = { req_msg: data };

    console.log("请求内容: ", reqData);
    // requestConfig.data = sm4.encryptData_ECB(JSON.stringify(reqData));
    requestConfig.data = reqData;
    console.log("请求报文体: ",requestConfig.data, );
  }
  // let requestConfig  = sm4utils()
  console.log('requestConfig', requestConfig)
  axios(requestConfig)
    .then(respdata => {
      console.log("响应内容:", JSON.stringify(respdata));
      // debugger;
      // console.log('respdata',respdata.request._response, sm4.decryptData_ECB('gzb3G/6roD7iJaCLl552DT7FNR0I8QeIpvPk7uVzt1pYMc4oVb94zoUpmiBeItCz8eME9GDgEj2A7BscPpm+dcDBA3Ym9Chb0ZpmAZqjKHz/F+h4k1xzsYJgv4es6iYa0UzbFABQJgLcDMj0TEUqbLmuUL1GS7jqvJPlaTYzo07777KWqUZgJjNPpvOcUkyM'))
      const respheader = respdata.data.header;
      const respbody = respdata.data.body;
      console.log("响应报文头: ", JSON.stringify(respheader));
      console.log("响应报文体: ", JSON.stringify(respbody));
      // header.code = 200 -> 成功，header.code = 50004 -> 登录token超时，其他 -> 失败
      switch (respheader.code) {
        case 200:
          $Toast.hide();
          // if(url === '/oauth/token') {
          if(url === '/oauth/token') {
            setLoginToken(respbody.token)
          } else if (url === '/oauth/bioLogin') {
            setLoginToken(respbody.loginToken)
            if(respbody.flag) {
              switch(window.tokenScope) {
                case '1': //手势
                  $Storage.save({
                    key: 'gestureToken',
                    data: JSON.stringify(respbody.newToken)
                  })
                  break;
                case '2': //指纹
                  $Storage.save({
                    key: 'fingerToken',
                    data: JSON.stringify(respbody.newToken)
                  })
                  break;
                case '3': //人脸
                  $Storage.save({
                    key: 'faceToken',
                    data: JSON.stringify(respbody.newToken)
                  })
                  break;
                case '4': //支付
                  // $Storage.save({
                  //   key: 'faceToken',
                  //   data: respbody.newToken
                  // })
                  break;
                default:
                  break;
              }
            }
          }
          // if (loginURLs.indexOf(url) != -1) {
          //   setLoginToken(respbody.token);
          // } else if (
          //   refreshTokenURL == url &&
          //   requestConfig.data &&
          //   requestConfig.data.req_msg.scope == "0"
          // ) {
          //   setLoginToken(respbody.token);
          // }

          if (response) {
            response(respbody);
          }
          break;
        case 50004:
          // 登录超时，跳转到登录页，并设置afterGoBack方法，登录成功后返回当前页时自动执行
          // $Toast.fail("登录超时，请重新登录");
          // router.load("login", {
          //   afterGoBack: function() {
          //     networkService(url, data, response, err);
          //   }
          // });
          break;
        case 50006:
          // 50006 -> 提交数据错误，直接提示
          $Toast.fail(respheader.msg);

          if (err) {
            err(respbody);
          }

          break;
        default:
          // 默认根据错误码转换出错信息，如果根据错误码没有找到错误信息，默认按照50001进行处理
          if (err) {
            err(respheader);
            $Toast.hide();
          } else {
            const msg = respheader.msg ? respheader.msg : (ErrorMsg[respheader.code]
              ? ErrorMsg[respheader.code]
              : ErrorMsg[50001]);
            $Toast.fail(msg);
          }
      }
    })
    .catch(error => {
      if (err) {
        $Toast.hide();
        err(error);
      } else {
        $Toast.fail("请求超时，请稍后再试！");
      }
    });
}

async function refreshToken(success) {
  var data = {};
  data.scope = "0"; //登录方式
  data.token = getLoginToken().data; //登录token
  // debugger;
  // request("/oauth/refresh", data, success);
  request("/oauth/refresh", data, success);
}

module.exports = {
  networkService,
  dev_basePath
};
