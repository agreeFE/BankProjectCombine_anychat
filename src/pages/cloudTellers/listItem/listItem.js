/*
  云柜员列表组件
  name ： 柜员名字
  jobNum ：柜员工号
  communicationStatus ：柜员状态，1：最近中断 ， 0： 可联系
  click ： 点击回调
 */

import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native'

import { ITEMLIST, DEFAULTUSERIMG } from "../imageSource/index";

export default class ListItem extends Component {
  constructor(props) {
    super(props) 
    this.state={}
  }
  
  render() {
    let { name, jobNum, communicationStatus, click, source = DEFAULTUSERIMG } = this.props
    let textColor =  communicationStatus == '1' ? '#EB5070':'#fff'
    communicationStatus == '1' ? communicationStatus = '最近中断' : communicationStatus = '可连线'
    return (
      <TouchableWithoutFeedback onPress={click} style={{backgroundColor: 'red'}} >
        <View>
          <ImageBackground style={styles.body} source={ITEMLIST}>
            <View style={styles.listBody}>
              <Image source={source} style={styles.listUserImg} ></Image>
              <View>
                <Text style={styles.listTitle}>工号：{jobNum}</Text>
                <Text style={[styles.listTitle,{color:'#E0A758'}]}>擅长{name}</Text>
                <Text style={[styles.listTitle,{color:textColor}]}>{communicationStatus}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

const styles = StyleSheet.create({
  body:{
    width:171,
    height:90,
    position:'relative',
    // marginLeft:6,
    marginBottom: 9
  },
  // listImage:{
  //   position:'absolute',
  //   top:0,
  //   bottom:0,
  //   left:0,
  //   right:0
  // },
  listBody:{
    display:'flex',
    flexDirection:'row',
    marginTop:15,
    marginLeft:10,
    alignItems: 'center'
  },
  listUserImg:{
    width:50,
    height:50,
    marginRight:8,
  },
  listTitle:{
    fontFamily: 'PingFangSC-Medium',
    fontSize:13,
    color:'#58ADE0',
    marginBottom:2,
    lineHeight: 18
  }
})