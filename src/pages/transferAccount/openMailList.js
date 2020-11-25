import React, { Component, } from 'react'
import { View, StyleSheet,Image,Text, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import Header from '$/components/header'
import Picker from '$/components/picker/pickerPro'
// import Switch from '$/components/switch'
import scope from '$/scope'
import SVG from "$/components/Svg";
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const { mobilePhoneTest } = require("$/util/regexutil");

import {request as requestPermissions, PERMISSIONS, RESULTS} from "react-native-permissions";
import { selectContactPhone } from "react-native-select-contact"
import { USERNAME } from './imageSource'
module.exports = class OpenMailList extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      opening: false,
      userName: '',
      phoneList: [],
      selectPhone: [],
    }
  }

  render() {
    const { opening, userName, phoneList, selectPhone } = this.state
    let noOpacity = !!userName && !!selectPhone[0]
    return (
      <View style={{flex: 1, backgroundColor: '#eee'}}>
       <Header
          leftClick={this.back}
          title={'通讯录转账'}
        ></Header>
       
        { 
          opening ? 
          <View style={{flex: 1}}>
            <View style={{backgroundColor: '#fff'}}>
              <View style={[styles.inputInfoView]}>
                <Text style={[styles.inputTitle,]}>收款人手机号</Text>
                <TextInput placeholder='请输入手机号码' keyboardType={'numeric'} style={[styles.inputText]} value={selectPhone[0]} onChange={(e) => { this.inputChange(e, 2) }} maxLength={11}></TextInput>
                <TouchableWithoutFeedback onPress={() => { this.requestContactsPermission() }}>
                  <View style={[styles.inputImg]}>
                    <SVG style={[{ height: 16, width: 16, marginLeft: 8 }]} source={USERNAME} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={[styles.inputInfoView, { borderBottomWidth: 0 }]}>
                <Text style={[styles.inputTitle,]}>收款人姓名</Text>
                <TextInput placeholder='请输入真实姓名' style={[styles.inputText]} value={this.state.userName} onChange={(e) => { this.inputChange(e, 1) }}></TextInput>
              </View>
            </View>
            <Text style={{ paddingLeft: 20, color: $globalStyle.transfer.textColor, fontSize: 12, paddingTop: 10 }}>请务必确保收款人姓名为其真实姓名</Text>
            <TouchableWithoutFeedback onPress={() => { this.next() }}>
              <LinearGradient colors={$globalStyle.buttonLinerBackground} style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
                <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 17, fontFamily: 'PingFangSC-Medium' }}>下一步</Text>
              </LinearGradient>
            </TouchableWithoutFeedback>
            {/* <Switch></Switch> */}
            <Picker
              ref={ref => this.picker = ref}
              pickerData={phoneList}
              selectedValue={selectPhone}
              onPickerConfirm={this.getPhone}
            ></Picker>
          </View>
          :
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always'>
            <View style={{flex: 1, paddingHorizontal: 30}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', lineHeight: 36, marginTop: 10}}>通过姓名、手机号即可向好友转账</Text>
              <Text style={{fontSize: 13,  lineHeight: 18, marginTop: 10}}>如手机号已关联银行卡将直接入账，如未关联，好友回复卡号即可快速入账</Text>
              <View style={{alignItems: "center"}}>
                <View style={{width: 250, height: 250, marginTop: 30}}></View>
                <TouchableWithoutFeedback onPress={this.goToAccount}>
                  <LinearGradient 
                    style={styles.ensure}
                    colors={$globalStyle.buttonLinerBackground}
                  >
                    <Text style={styles.ensureFont}>立即去转账</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </ScrollView>
        }
      </View>
    )
  }
  componentWillMount() {
    $Storage.load({
      key: 'firstTime'
    }).then(response => {
      this.setState({
        opening: response
      })
    }).catch(err => {
      this.setState({
        opening: false
      })
    })
  }

  back = () => {
    router.back()
  }

  goToAccount = () => {
    $Storage.save({
      key: 'firstTime',
      data: true
    })
    this.setState({
      opening: true
    })
  }

  showPicker = () => {
    Keyboard.dismiss();
    this.picker.init();
  }

  getPhone = (item) => {
    this.setState({
      selectPhone: item
    })
  }

  next = () => {
    const { userName, selectPhone } = this.state
    window.transferType = 3
    window.friInfo = {
      payeeName: userName,
      smsPhone: selectPhone[0]
    }
    router.replace('transferInfo')
  }

  inputChange = (e, num) => {
    const { text } = e.nativeEvent
    if (num === 1) {
      this.setState({
        userName: text
      })
      return
    }
    const newText = text.replace(/[^\d]+/g, '');

    this.setState({
      selectPhone: [newText]
    })
  }

  requestContactsPermission = () => {
    const _this = this;
    const permission = $platformOS() === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS;
    requestPermissions(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        _this.openContact();
      }
    })
  }

  openContact = () => {
    const _this = this;
    selectContactPhone().then(result => {
      // console.warn(result, result.contact.phones);
      let phoneList  =  []
      result.contact.phones.map(item => {
        const phoneNumber = item.number.replace(/-/, '').replace(/ /, '').replace(/ /, '')
        phoneList.push(phoneNumber);
      })
      // 设置紧急联系人姓名
      _this.setState({
        userName: result.contact.name,
        phoneList,
        selectPhone: [phoneList[0]]
      }, () => {
        if (_this.state.phoneList.length > 1) {
          _this.showPicker()
        }
      });
    })
  }

}
const styles = StyleSheet.create({
  ensure: {
    width: 180,
    height: 45,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  ensureFont: {
    color: '#fff',
    fontFamily: 'PingFangSC-Medium',
    lineHeight: 26,
    fontSize: 18,
  },
  inputInfoView: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 15,
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingHorizontal: 20
  },
  inputTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0
  },
  inputText: {
    fontSize: 15,
    textAlign: 'right',
    flex: 1,
    fontFamily: 'PingFangSC-Regular'
  },
  butView: {
    height: 45,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#E9962F',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 50
  },
})