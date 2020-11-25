//签字页面



import React, { Component } from 'react'

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import SignatureComponent from '$/components/Signature';

import Close from './close'
import Title from  './title'

module.exports = class signatureConfirmation extends Component {
  constructor(props) {
    super(props)
    this.commit = this.commit.bind(this)
  }
  componentDidMount(){
    console.warn(SignatureComponent);
  }
  render() {
    return (
      <Close  callBackHome = {()=> {this.props.closeHome()}}>
        {/* <Title title={'签字确认'}></Title>
        <View style={styles.text}>
          <Text style={styles.textFont}>您正在办理快贷业务，贷款金额 ¥100,000.00,请签字确认：</Text>
        </View>
        <View style={{alignItems: "center", marginTop: 4}}>
          <TouchableWithoutFeedback>
            <View style={styles.sign}>
              <Text style={styles.signFont}>签字区域</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.resize}>
              <Text style={{color:'#EF9C35'}}>重签</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.commit}>
            <View style={styles.button}>
              <Text style={styles.buttonFont}>确认</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> */}
        <SignatureComponent
            cancelText={ "取消"}
            cancelStyle={ "width:50%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;"}
            resignText={ "重签"}
            resignStyle={ "width:20%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;"}
            confirmText={ "确定"}
            confirmStyle={ "width:20%;border:1px solid #789EAA;font-size:16px;padding:5px 10px 5px 10px;border-radius:10px;color:#789EAA;margin-right:10px;"}
            pictureType={ "PNG"}
            onCancel={ () => {}}
            onConfirm={ (data) => {console.warn(data);}}
        ></SignatureComponent>
      </Close>
    )
  }

  commit() {
    this.props.closeHome('end')
  }
}

const styles = StyleSheet.create({
  text: {
    width: '100%',
    paddingLeft: 24,
    paddingRight: 40,
    marginTop: 30
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0,
    lineHeight: 21
  },
  button: {
    width: 335,
    height: 45,
    marginTop: 64,
    borderRadius: 5,
    backgroundColor: '#E9962F',
    justifyContent: "center",
    alignItems: "center"
  },
  buttonFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 17,
    color: '#FFFFFF',
    letterSpacing: 0,
    textAlign: 'right',
    lineHeight: 24
  },
  sign: {
    width: 327,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#EAEAEA'
  },
  signFont: {
    fontFamily: "PingFangSC-Semibold",
    fontSize: 46,
    color: '#DFDFDF',
    letterSpacing: 0,
    lineHeight: 65
  },
  resize: {
    marginTop: 16,
    width: 60,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopColor: '#EF9C35',
    borderBottomColor: '#EF9C35',
    borderLeftColor: '#EF9C35',
    borderRightColor: '#EF9C35',
  }
})
