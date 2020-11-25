import React, { Component } from 'react';
import { StyleSheet, View, Text, PixelRatio, StatusBar, Image, DeviceEventEmitter, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import TouchID from 'react-native-touch-id';
import LinearGradient from "react-native-linear-gradient"
import { NavigationEvents } from 'react-navigation';
import _ from 'lodash'
// import ActionSheet from 'react-native-actionsheet'; //弹窗
const px2rn = px => PixelRatio.roundToNearestPixel(px);
const rem2rn = rem => px2rn(rem * 16);
const FINGER = require('$image/login/zhiwen_copy.png')
import scope from '@/scope'
import '@/window'
import GestureArea from '$/components/gesture-password2'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');

const tokenutil = require('$/util/tokenutil');

const CANCEL_INDEX = 0;
import SVG from "$/components/Svg";



module.exports = class Login extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      gestureUnlock: 0, 
      fingerUnlock: 0,
      faceUnlock: 0,
      // actionsheet
      options: ['切换用户','注册新用户','取消'],
      // 默认登录超时时间：5分钟
      defaultLoginTimeout: 300000,
      // 用户名
      username:  '17600169392',
      // username: window.userPhone || '17600169392',
      // username: window.userPhone || '13812345672',
      // 密码
      password: '123456',
      // 登录方式 0-- 人脸 1--指纹 2--手势 3--密码
      currentLoginWay: 3,
      //手势长度不足
      lessLength: false,
      //显示手势轨迹
      gestureTrack: true,
      // 目标路由名称
      destRouter: props.navigation.state.params.params ? props.navigation.state.params.params.routername : '',
      // // 传参
      destParams: props.navigation.state.params.params ? JSON.parse(props.navigation.state.params.params.params) : {}
    }
    window.loginTimeOut = this.state.defaultLoginTimeout;

  }
  componentDidMount() {
    this.verifyFaceTokenLogin()
  }
  render() {
    const { currentLoginWay, lessLength, gestureTrack, } = this.state
    return (
      <View style={styles.container}>
        <NavigationEvents
          onDidFocus={() => { StatusBar.setBarStyle('dark-content') }}>
        </NavigationEvents>
        {/* <StatusBar></StatusBar> */}
        <Image source={require('$image/login/zhanghaoguanli.png')} style={styles.backgroundImage} />
        {/* <TouchableOpacity style={{ position: 'absolute', top: 60, width: 25, height: 25, right: 25, }} onPress={this.onClosePress}>
          <SVG source={require('$image/login/close.svg')} style={{ width: 16, height: 16 }} />
        </TouchableOpacity> */}
        <Text style={styles.welcome}>{`${this.setTime()}好，欢迎回来`}</Text>
        <View style={{flex: 1, paddingTop: 20}}>
          {
            currentLoginWay === 3 ?
            <>
             <View>
                <TextInput
                  style={styles.username}
                  placeholder="手机号/卡号/一网通用户"
                  placeholderTextColor="#C9C9C9"
                  keyboardType="numeric"
                  value={this.state.username}
                  onChangeText={this.usernameChange}></TextInput>
              </View>
              <View>
                <TextInput
                  style={styles.password}
                  placeholder="密码"
                  placeholderTextColor="#C9C9C9"
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={this.passwordChange}></TextInput>
              </View>
              <View>
                <Text style={styles.forgotPassword}>快速找回密码</Text>
              </View>

              <View style={{ width: '100%', textAlign: 'center' }}>
                <TouchableWithoutFeedback onPress={this.loginByPwd}>
                  <LinearGradient style={{ width: '84%', marginHorizontal: '8%', height: 50, borderRadius: 25, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} colors={window.$globalStyle.buttonLinerBackground}>
                    <Text style={styles.loginBtn}>登录</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
              <View style={{alignItems: "center", marginTop: '3%',}}>
                <Text onPress={this.more} style={{ fontSize: 15, width: 60, height: 30, lineHeight: 30, color: '#666666', textAlign: 'center' }}>更多</Text>
              </View>
              {/* <View style={{ marginTop: '5%', flexDirection: 'row', height: 30, justifyContent: 'center' }}>
                {/* <Text style={{ fontSize: 15, lineHeight: 21, color: '#666666', textAlign: 'right' }}>注册新账号</Text>
                <Text style={{ width: '5%', fontSize: 15, lineHeight: 21, color: '#666666', textAlign: 'center' }}>|</Text> */}
                
              {/* </View> */}
            </>
            :
            currentLoginWay === 2 ?
            <View style={{flex: 1, alignItems: "center"}}>
              <Text style={{color:'red'}}>{lessLength ? '最少连接4个点，请重新输入' : ''}</Text>
              <GestureArea onFinish={this._onFinish} showTrack={gestureTrack}></GestureArea>
              <View style={{alignItems: "center", marginTop: 40}}>
                <Text onPress={this.more} style={{ fontSize: 15, width: 60, height: 30, lineHeight: 30, color: '#666666', textAlign: 'center' }}>更多</Text>
              </View>
              {/* <Text onPress={this.more} style={{marginTop: 40, fontSize: 15, lineHeight: 21, color: '#666666', }}>更多</Text> */}
            </View>
            :
            currentLoginWay === 1 ?
            <View style={{flex: 1, alignItems: "center"}}>
              <View style={{alignItems: "center", marginTop: 50}}>
                <TouchableWithoutFeedback onPress={() => {this.setBioLogin()}}>
                  <Image source={FINGER} style={{width: 50, height: 50}}></Image>
                </TouchableWithoutFeedback>
                <Text style={{marginTop: 20}}>点击进行指纹解锁</Text>
              </View>
              <View style={{alignItems: "center", marginTop: 80}}>
                <Text onPress={this.more} style={{ fontSize: 15, width: 60, height: 30, lineHeight: 30, color: '#666666', textAlign: 'center' }}>更多</Text>
              </View>
              {/* <Text onPress={this.more} style={{marginTop: 80, fontSize: 15, lineHeight: 21, color: '#666666', }}>更多</Text> */}
            </View>
            :
            <View style={{flex: 1, alignItems: "center"}}>
              <Text>人脸登录</Text>
              <Text onPress={this.more} style={{marginTop: 40, fontSize: 15, lineHeight: 21, color: '#666666', }}>更多</Text>
            </View>
          }
        </View>
      </View>
    );
  }

  // 获取时间
  setTime = () => {
    let hours = new Date().getHours()
    if(hours < 5) {
      return '凌晨'
    }
    if( hours >= 5 && hours < 10) {
      return '上午'
    }
    if( hours >= 10 && hours < 14) {
      return '中午'
    }
    if( hours >= 14 && hours < 18) {
      return '下午'
    }
    if( hours >= 18) {
      return '晚上'
    }
  }
  /**
   * 用户名值改变事件处理函数
   */
  usernameChange = (text) => {
    this.setState({
      username: text
    })
  }
  /**
   * 密码值改变事件处理函数
   */
  passwordChange = (password) => {
    this.setState({
      password: password
    })
  }

  /**
   * 验证是否支持FaceID登录
   * @author 孟庆云
   */
  verifyFaceTokenLogin = () => {
    const _this = this
    $Storage.load({
      key: 'faceToken'
    }).then(result => {
      console.warn('FaceID开通Token: ', result)
      this.setState({faceToken: JSON.parse(result)})
      this.verifyFingerLogin()
      if (result && tokenutil.verifyToken(result)) {
        _this.setState({
          faceUnlock: 1,
        })
      } 
    }).catch(err => {
      this.verifyFingerLogin()
    })
  }
  /**
   * 验证是否支持TouchID登录
   * @author 孟庆云
   */
  verifyFingerLogin = () => {
    const _this = this
    $Storage.load({
      key: 'fingerToken'
    }).then(result => {
      this.setState({fingerToken: JSON.parse(result)})
      this.verifyGestureLogin()
      console.warn('finger开通Token: ', result)
      if (result && tokenutil.verifyToken(result)) {
        _this.setState({
          fingerUnlock: 1,
        })
      }
    }).catch(err => {
      this.verifyGestureLogin()
    })
  }
  /**
   * 验证是否支持手势登录
   * @author 孟庆云
   */
  verifyGestureLogin = () => {
    const _this = this
    $Storage.load({
      key: 'gestureToken'
    }).then(result => {
      console.log('Gesture开通Token: ', result)
      this.setState({gestureToken: JSON.parse(result)})
      if (result && tokenutil.verifyToken(result)) {
        _this.setState({
          gestureUnlock: 1,
        },() => {
          this.configureLoginWay()
        })
        $Storage.load({
          key: 'gestureTrack'
        }).then(response => {
          this.setState({
            gestureTrack: response
          })
        }).catch(err => {
          this.setState({
            gestureTrack: true
          })
        })
      }
    }).catch(err => {
      // _this.setState({
      //   currentLoginWay: 3
      // })
      this.configureLoginWay()
    })
  }

  /**
   * 设置登录方式
   */
  configureLoginWay = () => {
    const { gestureUnlock, faceUnlock, fingerUnlock } = this.state
    this.setState({
      currentLoginWay: faceUnlock > 0 ? 0 : fingerUnlock > 0 ? 1 : gestureUnlock > 0 ? 2 : 3
    },() => {
      if(this.state.currentLoginWay === 1) {
        this.setBioLogin()
      }
    })
  }

  _onFinish = (password) => {
    if(password.length < 4) {
      this.setState({
        lessLength: true
      })
      return
    } else {
      this.setState({
        lessLength: false
      })
      $Storage.load({
        key: 'gesturePassword'
      }).then(result => {
        if(password !== result) {
          $Toast.info('手势密码错误')
          return
        } else {
          // this.loginByPwd()
          this.loginBygesture()
        }
      })
     
    }
  }

  more = () => {
    let { gestureUnlock, fingerUnlock, faceUnlock, currentLoginWay, options } = this.state
    options = ['切换用户','注册新用户','取消']
    if(currentLoginWay === 3) {
      _.remove(options,  n => (n == '密码登录'))
      if(gestureUnlock > 0 && !options.includes('手势登录')) {
        options.unshift('手势登录')
      } 
      if(fingerUnlock > 0 && !options.includes('指纹登录')) {
        options.unshift('指纹登录')
      }
      if(faceUnlock > 0 && !options.includes('人脸登录')) {
        options.unshift('人脸登录')
      }
    } else if(currentLoginWay === 2) {
      _.remove(options, n => (n =='手势登录'))
      if(!options.includes('密码登录')) {
        options.unshift('密码登录')
      }
      if(fingerUnlock > 0 && !options.includes('指纹登录')) {
        options.unshift('指纹登录')
      }
      if(faceUnlock > 0 && !options.includes('人脸登录')) {
        options.unshift('人脸登录')
      }
    } else if(currentLoginWay === 1) {
      _.remove(options, n => (n =='指纹登录'))
      if(!options.includes('密码登录')) {
        options.unshift('密码登录')
      }
      if(gestureUnlock > 0 && !options.includes('手势登录')) {
        options.unshift('手势登录')
      }
      if(faceUnlock > 0 && !options.includes('人脸登录')) {
        options.unshift('人脸登录')
      }
    } else if(currentLoginWay === 0) {
      _.remove(options, n => (n =='人脸登录'))
      if(!options.includes('密码登录')) {
        options.unshift('密码登录')
      }
      if(gestureUnlock > 0 && !options.includes('手势登录')) {
        options.unshift('手势登录')
      }
      if(fingerUnlock > 0 && !options.includes('指纹登录')) {
        options.unshift('指纹登录')
      }
    }
    this.setState({
      options
    })
    $ActionSheet.showActionSheetWithOptions({
      title: '选择登录方式',
      options,
      cancelButtonIndex: options.length -1 ,
      //destructiveButtonIndex: 0,
      tintColor: '#1567E5',
    },
      (buttonIndex) => {
        this.handlePress(buttonIndex);
      }
    );
  }

  handlePress = (index) => {
    const { options } = this.state
    let opt = options[index]
    if(opt == '人脸登录') {
      this.setState({currentLoginWay: 0})
    } else if(opt == '指纹登录') {
      // this.setState({currentLoginWay: 1})
      this.setBioLogin()
    } else if(opt == '手势登录') {
      this.setState({currentLoginWay: 2})
    } else if(opt == '密码登录') {
      this.setState({currentLoginWay: 3})
      // DeviceEventEmitter.emit('refreshToken', '0')
    } else if(opt == '切换用户') {
      this.changeUser()
    } else if(opt == '注册新用户') {
      router.load('register')
    } 
  }
  /**
   * 点击右上角关闭按钮
   */
  onClosePress = () => {
    router.back()
  }

  changeUser = () => {
    this.setState({
      gestureUnlock: 0,
      fingerUnlock: 0,
      faceUnlock: 0,
      username: '',
      password: '',
      options: ['切换用户','注册新用户','取消'],
    }, () => {
      this.configureLoginWay()
    })
  }

  setBioLogin = () => {
    console.warn('登录方式为指纹/人脸，需要检查设备是否支持指纹/人脸登录')
    const _this = this
    TouchID.isSupported().then(result => {
      if (result) {
        let title = '', sensor = '';
        if (result === 'FaceID') {
          title = 'FaceID登录认证'
          sensor = '请正视摄像头'
        } else {
          title = '指纹登录认证'
          sensor = '请按压指纹传感器'
        }
        TouchID.authenticate('', {
          title: title,
          cancelText: '取消',
          sensorDescription: sensor,
          imageColor: window.$globalStyle.buttonLinerBackground[0]
        }).then(authResult => {
          console.warn('识别结果: ', authResult)
          if (authResult) {
            console.warn('校验生物识别结果: ', authResult)
            // _this.loginByPwd()
            _this.loginByfinger()
          }
        }).catch(err => {
          console.warn('识别错误/放弃识别', err)
        })
      } else {
        // 当前设备不支持生物识别登录(硬件损坏等原因)
        // _this.setPwdLogin()
        $Toast.info('当前设备不支持生物识别登录')
      }
    })
  }

  /**
   * 用户名/密码登录
   * @author 孟庆云
   */
  loginByPwd = () => {
    const _this = this
    const { username, password, currentLoginWay } = this.state
    DeviceEventEmitter.emit('refreshToken', `${3 - currentLoginWay}`)
    if(!username) {
      $Toast.info('请输入手机号/卡号/一网通用户')
      return
    }
    if(!password) {
      $Toast.info('请输入密码')
      return
    }
    const data = {
      username: this.state.username,
      password: this.state.password
    };
        window.token = "fakeToken"
    // NetworkUtil.networkService('/oauth/token', data, (response) => {
    //   NetworkUtil.networkService('/user/info', {}, (resp1) => {
        let resp = {
          "userId": "8aa26ef4450c4b87a7c617f37725b7bf",
          "userName": "马德政",
          "enName": null,
          "cnName": "马德政",
          "wxName": null,
          "phone": "17600169392",
          "avatar": null,
          "isLock": 0,
          "gender": 1,
          "birthDate": "1993-11-02",
          "emailAddress": "madezheng@agree.com.cn",
          "detailAddress": "北京市朝阳区望京诚盈中心",
          "idCard": "310224196212212032",
          "registerType": 0,
          "selfIntroduction": null,
          "verifyStatus": "1",
          "deviceid": "unknown",
          "appid": "1",
          "custNo": "100000000172"
        }
        $Storage.save({
          key: 'userInfo',
          data: JSON.stringify(resp)
        });
        $Toast.success('登录成功！')
        if (window.userPhone && window.userPhone !== _this.state.username) {
          router.replace('homeScrollable')
          window.bankCard = undefined
          window.bankInfo = undefined
          window.userName = resp.cnName
          window.idCard = resp.idCard
          window.userPhone = resp.phone
        } else {
          window.userName = resp.cnName
          window.userPhone = resp.phone
          if (_this.state.destRouter) {
            StatusBar.setBarStyle('light-content')
            router.replace(_this.state.destRouter, _this.state.destParams);
          } else {
            router.back();
            // 从util/networkutil.js中传入的路由goBack后执行的函数(重发一次请求)
            if (_this.props.navigation.state.params.afterGoBack) {
              _this.props.navigation.state.params.afterGoBack()
            }
          }
        }
    //     NetworkUtil.networkService('/user/setting/list', {}, (res) => {
    //       DeviceEventEmitter.emit('getTimeOut', res.timeout)
    //     })
    //   })
    // }, err => {console.log('err', err)});
  }

  loginBygesture = () => {
    let { currentLoginWay } = this.state
    DeviceEventEmitter.emit('refreshToken', `${3 - currentLoginWay}`)
    let req_msg = {}
    req_msg.bioId = '123'
    req_msg.token = this.state.gestureToken,
    req_msg.scope = '1'
    NetworkUtil.networkService('/oauth/bioLogin', req_msg, response => {
      NetworkUtil.networkService('/user/info', {}, (resp) => {
        $Storage.save({
          key: 'userInfo',
          data: JSON.stringify(resp)
        });
        
        $Toast.success('登录成功！')
          window.userName = resp.cnName
          window.userPhone = resp.phone
          if (this.state.destRouter) {
            StatusBar.setBarStyle('light-content')
            router.replace(this.state.destRouter, this.state.destParams);
          } else {
            router.back();
            // 从util/networkutil.js中传入的路由goBack后执行的函数(重发一次请求)
            if (this.props.navigation.state.params.afterGoBack) {
              this.props.navigation.state.params.afterGoBack()
            }
          }
        NetworkUtil.networkService('/user/setting/list', {}, (res) => {
          DeviceEventEmitter.emit('getTimeOut', res.timeout)
        })
      })
    })
  }

  loginByfinger = () => {
    let { currentLoginWay } = this.state
    DeviceEventEmitter.emit('refreshToken', `2`)
    let req_msg = {}
    req_msg.bioId = '123'
    req_msg.token = this.state.fingerToken,
    req_msg.scope = '2'
    NetworkUtil.networkService('/oauth/bioLogin', req_msg, response => {
      NetworkUtil.networkService('/user/info', {}, (resp) => {
        $Storage.save({
          key: 'userInfo',
          data: JSON.stringify(resp)
        });
        
        $Toast.success('登录成功！')
          window.userName = resp.cnName
          window.userPhone = resp.phone
          if (this.state.destRouter) {
            StatusBar.setBarStyle('light-content')
            router.replace(this.state.destRouter, this.state.destParams);
          } else {
            router.back();
            // 从util/networkutil.js中传入的路由goBack后执行的函数(重发一次请求)
            if (this.props.navigation.state.params.afterGoBack) {
              this.props.navigation.state.params.afterGoBack()
            }
          }
        NetworkUtil.networkService('/user/setting/list', {}, (res) => {
          DeviceEventEmitter.emit('getTimeOut', res.timeout)
        })
      })
    })
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    position: 'absolute',
    width: 200,
    height: 200,
    marginTop: '6.6%',
    marginLeft: '-12.5%'
  },
  welcome: {
    color: $globalStyle.mine.textColor,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 22,
    marginLeft: '10.7%',
    marginTop: '40%',
    lineHeight: 30
  },
  username: {
    marginLeft: '10.7%',
    width: '78.7%',
    marginTop: '10.9%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    lineHeight: 22,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1
  },
  password: {
    marginLeft: '10.7%',
    width: '78.7%',
    marginTop: '10%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    lineHeight: 22,
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1
  },
  forgotPassword: {
    width: '15%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
    marginLeft: '68%',
    marginTop: '2%'
  },
  loginBtn: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  }
});
