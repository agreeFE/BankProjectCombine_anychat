import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, TouchableWithoutFeedback } from 'react-native';
const router = require('$/router-control');
import Picker from 'react-native-picker';
/*
接收的参数：
  pickerData: 数组，传入选择框的选择值
  selectedValue： 数组，记录被选择的值
  onPickerConfirm: 函数，点击确认的回调函数
  onPickerCancel： 函数，点击取消的回调函数

调用范例
  <Pickers
    ref={(view) => { this.oncePickers = view }}
    pickerData={onceRepayData}
    selectedValue={[onceRepay]}
    onPickerConfirm={this.onceRepayOnPickerConfirm}
    onPickerCancel={(data) => { console.warn(data) }}
  ></Pickers>

  通过调用组件中init方法，打开日期选择框
*/


class pickerPro extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      isShow: false
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.selectedValue != state.selectedValue || props.pickerData != state.pickerData) {
      return {
        selectedValue: props.selectedValue,
        pickerData: props.pickerData
      }
    }
    return null
  }
  init = () => {
    let selectedValue = this.state.selectedValue.map(ele => {
      if (typeof ele == 'string') {
        return ele
      } else {
        return ele.toString()
      }
    })
    Picker.init({
      pickerData: this.state.pickerData,
      selectedValue: selectedValue,
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      pickerBg: [255, 255, 255, 1],
      onPickerConfirm: data => {
        this.state.onPickerConfirm(data)
        this.setState({
          isShow: false
        })
      },
      onPickerCancel: data => {
        this.setState({
          isShow: false
        })
        this.state.onPickerCancel ? this.state.onPickerCancel(data) : () =>{}
      },
    });
    this.setState({
      isShow: true
    })
    Picker.show();
  }
  // 隐藏选择框
  hide = () => {
    this.setState({
      isShow: false
    })
    Picker.hide();
  }

  toggle = () => {
    const { isShow } = this.state
    if(isShow) {
      this.hide()
      return
    }
    this.init()
  }

  render() {
    let { isShow } = this.state
    return (
      isShow ?
        <View style={[styles.modal, {backgroundColor: '#000000', opacity: 0.3,}]}></View>
        :
        <></>
    )
  }

}

const styles = StyleSheet.create({
  modal: {
    flex:1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
})
export default pickerPro;