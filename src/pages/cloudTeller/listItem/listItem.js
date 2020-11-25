/*
  云柜员列表组件
  name ： 柜员名字
  jobNum ：柜员工号
  communicationStatus ：柜员状态，1：最近中断 ， 0： 可联系
  click ： 点击回调
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

import { ITEMLIST, DEFAULTUSERIMG } from "../imageSource";

export default class ListItem extends Component {
  constructor(props) {
    super(props) 
    this.state={}
  }
  
  render() {
    let { name, jobNum, communicationStatus, click } = this.props
    let textColor =  communicationStatus == '1' ? '#EB5070':'#fff'
    communicationStatus == '1' ? communicationStatus = '最近中断' : communicationStatus = '可联系'
    return (
      <TouchableWithoutFeedback onPress={() => {click()}} >
        <View style={styles.body}>
          <View>
            <Image source={ITEMLIST} style={styles.listImage} ></Image>
          </View>
          <View style={styles.listBody}>
            <Image source={DEFAULTUSERIMG} style={styles.listUserImg} ></Image>
            <View>
              <Text style={styles.listTitle}>工号：{jobNum}</Text>
              <Text style={styles.listTitle}>姓名：{name}</Text>
              <Text style={[styles.listTitle,{color:textColor}]}>{communicationStatus}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

const styles = StyleSheet.create({
  body:{
    width:'45%',
    height:89,
    position:'relative',
    marginLeft:'3%',
  },
  listImage:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0
  },
  listBody:{
    display:'flex',
    flexDirection:'row',
    marginTop:19,
    marginLeft:11,
  },
  listUserImg:{
    width:50,
    height:50,
    marginRight:8,
  },
  listTitle:{
    fontSize:15,
    color:'#58ADE0',
    marginBottom:2,
  }
})