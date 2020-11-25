import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text,TouchableWithoutFeedback, TextInput, Keyboard } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash'
import Header from '$/components/header'
import scope from '$/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
import Pickers from '$/components/picker/pickerPro'
const RIGHTARROW = require('$image/home/my/right_arrow.png')

const suggestionType = ['注册登录','转账','支付','账户查询', '账户总览', '收支明细', '理财',
 '生活缴费', '信用卡', '办卡开户', '消息推送', '社区', '设置', '营销活动']
module.exports = class Feedback extends Component {
  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      showValue: suggestionType,
      suggestion: '',
      selectedValue: [''],
      imgList: []
    }
  } 
 
  render() {
    const { showValue, selectedValue,suggestion,imgList } = this.state
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
        <Header
          title={'意见反馈'}
          leftClick={this.back}
        ></Header>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <Text>问题类型</Text>
            <TouchableWithoutFeedback onPress={this.showPicker}>
              <View style={{flexDirection: "row", alignItems: "center", minWidth: '50%',height: '100%', justifyContent: 'flex-end'}}>
                <Text style={{color: selectedValue[0] ? '#000' : '#ccc'}}>{selectedValue[0] || '请选择'}</Text>
                <Image style={{ width: 14, height: 14,marginLeft: 10 }} source={RIGHTARROW} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{backgroundColor: '#fff', marginTop: 10}}>
            <TextInput
              style={{minHeight: 80, paddingHorizontal: 10, fontSize: 16, textAlignVertical: 'top'}}
              value={suggestion}
              // selectionColor={'#000'}
              multiline={true}
              placeholder='请写下您的建议，如功能需求、产品吐槽等，我们会努力改进'
              placeholderTextColor='#ccc'
              onChange={this._onChange}
            ></TextInput>
            <View style={{padding: 10, flexDirection: "row", alignItems: "flex-end"}}>
              <TouchableWithoutFeedback onPress={() => {this.operationImg(1)}}>
                <Image style={{width: 80, height: 80, borderRadius: 5, marginRight: 10, backgroundColor: 'red'}} source={(imgList[0]&&imgList[0].source) || ''}></Image>
              </TouchableWithoutFeedback>
              {
                !!imgList[0] ? 
                <TouchableWithoutFeedback onPress={() => {this.operationImg(2)}}>
                  <Image style={{width: 80, height: 80, borderRadius: 5, marginRight: 10, backgroundColor: 'red'}} source={(imgList[1]&&imgList[1].source) || ''}></Image>
                </TouchableWithoutFeedback>
                :
                <Text style={{color: '#ccc'}}>可加3张图</Text>
              } 
              {
                !!imgList[1] ?
                <TouchableWithoutFeedback onPress={() => {this.operationImg(3)}}>
                  <Image style={{width: 80, height: 80, borderRadius: 5, marginRight: 10, backgroundColor: 'red'}} source={(imgList[2]&&imgList[2].source) || ''}></Image>
                </TouchableWithoutFeedback>
                :
                <></>
              }
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this.nextStep}>
            <LinearGradient style={{ width: '84%', marginHorizontal: '8%', height: 50, borderRadius: 10, marginTop: 50, justifyContent: 'center', alignItems: 'center' }} colors={window.$globalStyle.buttonLinerBackground}>
              <Text style={styles.loginBtn}>提交</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <Pickers
            ref={ref => this.picker = ref}
            pickerData={showValue}
            selectedValue={selectedValue}
            onPickerConfirm={this.getValue}
          ></Pickers>
        </View>
      </View>
    )
  }

  back = () => {
    router.back()
  }

  showPicker = () => {
    Keyboard.dismiss()
    this.picker.init()
  }

  getValue = (item) => {
    this.setState({
      selectedValue: item
    })
  }

  _onChange = (e) => {
    const {text} = e.nativeEvent
    this.setState({
      suggestion: text
    })
  }

  nextStep = () => {
    
    const { showValue, selectedValue, suggestion,imgList } = this.state
    let suggestionType, suggestionImgPath = ''
    suggestionType = showValue.indexOf(selectedValue[0]) + 1
    for(let j = 0, str; str = imgList[j++];) {
      suggestionImgPath = suggestionImgPath + `${str.data},`
    }
    let info = {suggestionType, suggestion, suggestionImgPath}
    if(suggestionType < 1) {
      $Toast.info('请选择问题类型')
      return
    }
    if(!suggestion) {
      $Toast.info('请写下您的建议或反馈')
      return
    }
    NetworkUtil.networkService('/user/feedback/add', info, response => {
      console.warn('tag', response)
    })
  }

  operationImg = (index) => {
    let { imgList } = this.state
    switch(index) {
      case 1: 
        if(imgList[0]) {
          imgList.splice(0,1)
          this.setState({imgList})
        } else {
          this.addImage()
        }
        break;
      case 2: 
        if(imgList[1]) {
          imgList.splice(1,1)
          this.setState({imgList})
        } else {
          this.addImage()
        }
        break;
      case 3: 
        if(imgList[2]) {
          imgList.splice(2,1)
          this.setState({imgList})
        } else {
          this.addImage()
        }
        break;
    }
  }

  addImage = () => {
    let { imgList } = this.state
    const options = {
      title: '意见反馈',
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
      // console.warn('Response = ', response);
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
        imgList.push({source, data: response.data})
        this.setState({imgList})
        // imgList.push(response.data)
        // let obj = {}
        // let key = index == 1 ? 'firstImage' : index ==2 ? 'secondImage' : 'thirdImage'
        // obj[key] = source
        // this.setState(obj)
        // You can also display the image using data:
        //  let source = { uri: 'data:image/jpeg;base64,' + response.data };
        // this.setState({
        //   headImg: source
        // });
      }
    });
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 1, 
    backgroundColor: '#fff',
    height :45, 
    justifyContent: 'space-between',
    alignItems: "center",
    paddingHorizontal: 20
  },
  loginBtn: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    lineHeight: 25,
    color: '#FFFFFF',
  }
})