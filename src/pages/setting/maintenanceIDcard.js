import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableWithoutFeedback } from 'react-native';
import Switch from '$/components/switch'
import Header from '$/components/header'
import { BACK, ELLIPSIS, BACK_BG_HEAD, RIGHTARROW } from './setImageSource'
const router = require('$/router-control');
import scope from '$/scope'
import { RNCamera } from "react-native-camera";

import GetPhoto from "$/components/getPhoto/index"
var idPhoto1 = require('$image/cloudTeller/idcardF.png');
var idPhoto2 = require('$image/cloudTeller/idcardZ.png');
module.exports = class paySet extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      moveAnim: new Animated.Value(0),
      imagePathA: '', //身份证正面数据
      imagePathB: '',//身份证背面数据
      photoTypeA: false,//身份证正面是否打开摄像头
      photoTypeB: false,//身份证背面是否打开摄像头
    };
  }

  back = () => {
    router.back()
  }
  getPhotoA(type) {
    if (this.state.photoTypeB == false) {
      this.setState({
        photoTypeA: true,
        imagePathA:''
      })
    }else{
      $Toast.info('请先完成拍摄')
    }
  }
  getPhotoB(type) {
    if (this.state.photoTypeA == false) {
      this.setState({
        photoTypeB: true,
        imagePathB:''
      })
    }else{
      $Toast.info('请先完成拍摄')
    }
  }
  setphotoA(base) {
    this.setState({
      imagePathA: base,
      photoTypeA: false
    });
  }
  setphotoB(base) {
    this.setState({
      imagePathB: base,
      photoTypeB: false
    });
  }
  //提交
  commitInfo(){
    if(this.state.imagePathA != ''  && this.state.imagePathB != ''){
      console.warn('提交')
    }
  }
  render() {
    let noOpacity = this.state.imagePathA != ''  && this.state.imagePathB != ''
    return (
      <>
        <Header
          title={'身份证维护'}
          leftClick={this.back}
        ></Header>
        {/* 内容 */}
        <View style={styles.body}>
          <Text style={styles.textTitle}>身份证基本信息维护</Text>
          <View style={{ marginTop: 20,height:200}}>
            <GetPhoto title={"点击拍摄身份证头像页"} photo={idPhoto1} imagePath={this.state.imagePathA} photoType={this.state.photoTypeA} setphoto={this.setphotoA.bind(this)} getphotoType={this.getPhotoA.bind(this)} ></GetPhoto>
          </View>
          <View style={{ marginTop: 20,height:200 }}>
            <GetPhoto title={"点击拍摄身份证国徽页"} photo={idPhoto2} imagePath={this.state.imagePathB} photoType={this.state.photoTypeB} setphoto={this.setphotoB.bind(this)} getphotoType={this.getPhotoB.bind(this)}></GetPhoto>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.commitInfo() }}>
          <View style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
            <Text style={{ color: $globalStyle.textColor, fontFamily: 'PingFangSC-Medium', fontSize: 17, letterSpacing: 0, }} >提交</Text>
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
  butView:{
    width:'80%',marginLeft:'10%',alignItems:'center',justifyContent:'center',height:45,backgroundColor:$globalStyle.backgroundColor, borderRadius: 5 ,marginTop:20
  },
  textTitle: {
    width: '100%',
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0,
    paddingBottom: 15,
    paddingTop: 15,
    justifyContent: 'center',
    paddingLeft: 30
  },
  bodyView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyViewText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingLeft: 34,
    justifyContent: 'center',
    width: '60%'
  },
  preview: {
    width: '100%',
    height: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  // rectangleContainer: {
  //   // backgroundColor: 'rgba(0,0,0,0.5)', 
  //   // opacity: 0.5,
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",

  // },
  rectangle: {
    marginLeft: 10,
    borderRadius: 5,
    height: 200,
    width: '80%',
    // marginLeft:'10%',
    borderWidth: 1,
    borderColor: "#00FF00",
    backgroundColor: "transparent"

  },
  // rectangleText: {
  //   flex: 0,
  //   color: "#FFFFFF",
  //   marginTop: 10
  // },
})
