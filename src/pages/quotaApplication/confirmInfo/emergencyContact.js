import React, { Component,  } from 'react'
import { View, StyleSheet, Image, TextInput, Text, Keyboard, TouchableWithoutFeedback } from 'react-native'
import Header from '$/components/header'
import SVG from "$/components/Svg";
import Picker from '$/components/picker/pickerPro'
import scope from '$/scope'
import LinearGradient from 'react-native-linear-gradient'
import { RIGHTARROW, ADDBOOK, OPEN } from '../imageSource'
const router = require('$/router-control');

const { mobilePhoneTest } = require("$/util/regexutil");

import {request as requestPermissions, PERMISSIONS, RESULTS} from "react-native-permissions";
import { selectContactPhone } from "react-native-select-contact"

const NetworkUtil = require('$/util/networkutil')

module.exports = class emergenCon extends Component {

  constructor(props) {
    super(props)
    scope(this)
    this.state = {
      userName: '',
      // phone: '',
      phoneList: [],
      selectPhone: [],
    };

    this.requestContactsPermission = this.requestContactsPermission.bind(this);
    this.openContact = this.openContact.bind(this)
  }

  render() {
    const { userName, phoneList, selectPhone } = this.state
    let noOpacity = !!userName && !!selectPhone[0]
    return (
      <View>
        <Header
          title={'紧急联系人'}
          leftClick={this.back}
        ></Header>
        <View style={styles.body}>
          <View style={{ backgroundColor: '#FFFFFF' }}>
            <TouchableWithoutFeedback onPress={this.requestContactsPermission}>
              <View style={[styles.inputInfoView, { height: 80 }]}>
                <View style={{ width: '15%', paddingLeft: 20 }}>
                  <SVG style={{ width: 30, height: 32, }} source={ADDBOOK} />
                </View>
                <View style={{ paddingLeft: 20, width: '75%' }}>
                  <Text style={{ fontSize: 15, color: '#3A3A3A', fontFamily: 'PingFangSC-Regular' }}>从通讯录中选择紧急联系人</Text>
                </View>
                <Image style={{ width: 16, height: 16, }} source={RIGHTARROW} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.inputInfoView}>
              <Text style={[styles.inputTitle,]}>紧急联系人</Text>
              <TextInput placeholder='请输入真实姓名' style={[styles.inputText]} value={this.state.userName} onChange={(e) => { this.inputChange(e, 1) }}></TextInput>
            </View>

              <View style={[styles.inputInfoView, { borderBottomWidth: 0 }]}>
                <Text style={[styles.inputTitle,]}>紧急联系人电话</Text>
                <TextInput placeholder='请输入手机号码' keyboardType={'numeric'} style={[styles.inputText]} value={selectPhone[0]} onChange={(e) => { this.inputChange(e, 2) }} maxLength={13}></TextInput>
                {/* {
                  phoneList.length > 1 ?
                  <TouchableWithoutFeedback onPress={this.showPicker}>
                    <View style={{width: 20, height: 45, justifyContent: "center", alignItems: "center" }}>
                      <SVG source={OPEN} style={{width: 6, height: 12}}></SVG>
                    </View>
                  </TouchableWithoutFeedback>
                  :
                  <></>
                } */}
              </View>
          </View>
          <Text style={{ paddingLeft: 20, color: $globalStyle.transfer.textColor, fontSize: 12, paddingTop: 10 }}>为保证贷款正常发放,请填写正确的紧急联系人信息</Text>
          <TouchableWithoutFeedback onPress={() => { this.next() }}>
            <LinearGradient colors={$globalStyle.buttonLinerBackground} style={[styles.butView, noOpacity ? '' : { opacity: 0.5, backgroundColor: '#ddd' }]}>
              <Text style={{ color: "#FFFFFF", textAlign: 'center', fontSize: 17, fontFamily: 'PingFangSC-Medium' }}>下一步</Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
          <Picker
            ref={ref => this.picker = ref}
            pickerData={phoneList}
            selectedValue={selectPhone}
            onPickerConfirm={this.getPhone}
            onPickerCancel={() => { }}
          ></Picker>
        </View>
      </View>
    )
  }

  back = () => {
    router.back()
  }

  showPicker = () => {
    const { phoneList } = this.state;
    Keyboard.dismiss();
    this.picker.init();
  }

  getPhone = (item) => {
    this.setState({
      selectPhone: item
    })
  }

  next = () => {
    let { info } = this.props.navigation.state.params
    const { userName, selectPhone } = this.state

    if (!userName) {
      $Toast.info('请输入紧急联系人真实姓名')
      return
    }
    if (!selectPhone[0]) {
      $Toast.info('请输入紧急联系人电话')
      return
    }
    if (!mobilePhoneTest(selectPhone[0])) {
      $Toast.info('请输入正确的手机号')
      return
    }
    info.contactName = userName
    info.telephone = selectPhone[0]
    router.load('loanConfrim', info)
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

  requestContactsPermission() {
    const _this = this;
    const permission = $platformOS() === "android" ? PERMISSIONS.ANDROID.READ_CONTACTS : PERMISSIONS.IOS.CONTACTS;
    requestPermissions(permission).then(result => {
      if (result === RESULTS.GRANTED) {
        _this.openContact();
      }
    })
  }

  openContact() {
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

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  leftTitleText: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#3A3A3A',
    letterSpacing: 0,
    paddingTop: 12,
    height: 45,
    paddingLeft: 20
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
  inputImg: {
    width: 16,
    height: 16,
    marginLeft: 20
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
  accbodyView: {
    width: '100%',
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  instructionsView: {
    marginTop: 50
  },
  instructionsText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    paddingLeft: 20,
    paddingTop: 4,
    paddingRight: 12
  }
})
