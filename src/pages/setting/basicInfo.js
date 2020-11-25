import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, HEADPORTRAIT, RIGHTARROW } from './setImageSource'
const router = require('$/router-control')
import scope from '$/scope'
import ImagePicker from 'react-native-image-picker';

module.exports = class basicInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      userInfoData: {},//用户信息
      headImg:0//头像
    };
  }
  componentDidMount() {
    let _this = this;
    _this.getUserInfo()
  }
  back = () => {
    router.back()
  }
  //获取用户信息
  getUserInfo() {
    let _this = this
    $Storage.load({
      key: 'userInfo'
    }).then(result => {
      var userInfo = JSON.parse(result);
      if (userInfo.verifyStatus == 1) {
        userInfo.verifyStatusType = '已实名认证'
      } else {
        userInfo.verifyStatusType = '未实名认证'
      }
      _this.setState((previousState) => {
        return ({
          userInfoData: userInfo,
        })
      });
    });
  }
   //点击页面跳转
   toClick(key,value){
    window.updataBaseInfo={'key':key,'value':value}
    console.warn(window.updataBaseInfo.value)
    if(key=='reserInformationManagement'){
      router.load('reserInformationManagement');
    }else{
      router.load('updateBaseInfo');
    }
   
  }

  //修改头像
  updataHeadImg() {
    const options = {
      title: '修改头像',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '选择照片',
      cameraType: 'back',
      mediaType: 'photo',
      videoQuality: 'high',
      durationLimit: 10,
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
      angle: 0,
      allowsEditing: false,
      noData: false,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      console.warn('Response = ', response);
      if (response.didCancel) {
        console.warn('User cancelled photo picker');
      }
      else if (response.error) {
        console.warn('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.warn('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.warn('source'+source)
        // You can also display the image using data:
        //  let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          headImg: source
        });
      }
    });
  }
  render() {
    return (
      <>
         <NavigationEvents onWillFocus={payload => { this.getUserInfo() }}></NavigationEvents>
        <Header
          title={'基本信息'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>

          <View style={styles.headerView}>
            <View style={{ width: '75%', flexDirection: 'row', }}>
              <View style={{ justifyContent: 'center', paddingLeft: 24 }}>
                {this.state.headImg == 0 ?  <Image style={{ width: 58, height: 58, borderRadius: 30 }} source={HEADPORTRAIT} /> 
                : <Image style={{ width: 58, height: 58, borderRadius: 30 }} source={this.state.headImg} />}
                </View>
              <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
                <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#3A3A3A', letterSpacing: 0 }}>{this.state.userInfoData.cnName}</Text>
                {/* <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 16, color: '#3A3A3A', letterSpacing: 0 }}>{'马德政'}</Text> */}
              </View>
            </View>
            <TouchableWithoutFeedback onPress={() => { this.updataHeadImg() }} >
              <View style={{ flexDirection: 'row'}}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ ontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#999999', letterSpacing: 0 }}>修改头像</Text></View>
              <View style={{ justifyContent: 'center', paddingRight: 24 }}>
                <Image style={{ width: 14, height: 14 }} source={RIGHTARROW} />
              </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.bodyView, { marginTop: 8 }]}>
            <Text style={styles.bodyViewText}>实名认证</Text>
            <Text style={[styles.bodyViewText, { textAlign: 'right', width: '55%' }]}>{this.state.userInfoData.verifyStatusType}</Text>
          </View>
          <View style={[styles.bodyView, { marginTop: 8 }]}>
            <Text style={styles.bodyViewText}>登录手机号</Text>
            <Text style={[styles.bodyViewText, { textAlign: 'right', width: '55%' }]}>{this.state.userInfoData.phone}</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          <TouchableWithoutFeedback onPress={() => { this.toClick('userName',this.state.userInfoData.userName)}} >
          <View style={[styles.bodyView]}>
            <Text style={styles.bodyViewText}>昵称</Text>
            <Text style={[styles.bodyViewText, { textAlign: 'right', width: '55%' }]}>{this.state.userInfoData.userName}</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.toClick('selfIntroduction',this.state.userInfoData.selfIntroduction) }} >
          <View style={[styles.bodyView]}>
            <Text style={styles.bodyViewText}>个人简介</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.bodyViewText, { textAlign: 'right', width: '55%' }]}>{this.state.userInfoData.selfIntroduction}</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.toClick('detailAddress',this.state.userInfoData.detailAddress) }} >
          <View style={[styles.bodyView, { marginTop: 8 }]}>
          <Text style={styles.bodyViewText}>收货地址管理</Text>
            <Text numberOfLines={1} ellipsizeMode={'tail'} style={[styles.bodyViewText, { textAlign: 'right', width: '55%' }]}>{this.state.userInfoData.detailAddress}</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => { this.toClick('reserInformationManagement') }} >
          <View style={[styles.bodyView, { marginTop: 8 }]}>
            <Text style={[styles.bodyViewText, { width: '90%' }]}>预留信息管理</Text>
            <Image style={{ width: 14, height: 14, }} source={RIGHTARROW} />
          </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    )
  }

}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  headerView: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 80,
    flexDirection: 'row',
  },
  bodyView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 24,
    justifyContent: 'center',
    width: '35%'
  }
})
