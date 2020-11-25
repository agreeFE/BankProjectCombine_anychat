import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import { BoxShadow } from 'react-native-shadow'
const router = require('$/router-control');
import SVG from "$/components/Svg";
import Header from '$/components/header'
import { TODAYNO, TODOICON1, TODOICON2, TODOICON3, TODOICON4, TODOICON5} from '../imageSource'
import scope from '@/scope'
import "$/window"


class MineToDo extends Component {
  constructor(props) {
    super(props)
    scope(this);
   
    this.state = {
      
    }
   
  }
  render() {
  
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Header
          title={'我的待办'}
          leftClick={() => { router.back() }}
          rightClick={() => {}}
        ></Header>
       <View style={styles.body}>
          <View style={{width:'100%',height:180,alignItems:'center',justifyContent:'center'}}>
          <SVG style={{ width: 80, height: 94, }} source={TODAYNO} />
          </View>
          <View style={{marginLeft:'5%'}}>
            <Text style={{fontFamily: 'PingFangSC-Regular',fontSize: 16,color: '#333333'}}>您可以添加计划</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(0)}}>
            <View style={{marginLeft:'5%',width:'90%',height:50,backgroundColor:'#FFFFFF',marginTop:12,borderRadius:4,flexDirection:'row',alignItems:'center'}}> 
              <SVG style={{ width: 24, height: 22,marginLeft:'5%' }} source={TODOICON1} />
              <Text style={{marginLeft:9,fontFamily:'PingFangSC-Regular',fontSize:14,color:'#333333',width:'19%'}}>还贷款</Text>
              <Text style={{fontFamily:'PingFangSC-Regular',fontSize:14,color:'#999999',width:'58%'}}>贷款自动还，省心不逾期</Text>
              <Image style={{ width: 12, height: 12, }} source={require('$image/home/my/right_arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(1)}}>
            <View style={{marginLeft:'5%',width:'90%',height:50,backgroundColor:'#FFFFFF',marginTop:12,borderRadius:4,flexDirection:'row',alignItems:'center'}}> 
              <SVG style={{ width: 24, height: 22,marginLeft:'5%' }} source={TODOICON2} />
              <Text style={{marginLeft:9,fontFamily:'PingFangSC-Regular',fontSize:14,color:'#333333',width:'19%'}}>还信用卡</Text>
              <Text style={{fontFamily:'PingFangSC-Regular',fontSize:14,color:'#999999',width:'58%'}}>还款小贴士，信用不受损</Text>
              <Image style={{ width: 12, height: 12, }} source={require('$image/home/my/right_arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(2)}}>
            <View style={{marginLeft:'5%',width:'90%',height:50,backgroundColor:'#FFFFFF',marginTop:12,borderRadius:4,flexDirection:'row',alignItems:'center'}}> 
              <SVG style={{ width: 24, height: 22,marginLeft:'5%' }} source={TODOICON3} />
              <Text style={{marginLeft:9,fontFamily:'PingFangSC-Regular',fontSize:14,color:'#333333',width:'19%'}}>转给TA</Text>
              <Text style={{fontFamily:'PingFangSC-Regular',fontSize:14,color:'#999999',width:'58%'}}>定期转给TA，方便又快捷</Text>
              <Image style={{ width: 12, height: 12, }} source={require('$image/home/my/right_arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(3)}}>
            <View style={{marginLeft:'5%',width:'90%',height:50,backgroundColor:'#FFFFFF',marginTop:12,borderRadius:4,flexDirection:'row',alignItems:'center'}}> 
              <SVG style={{ width: 26, height: 24,marginLeft:'5%' }} source={TODOICON4} />
              <Text style={{marginLeft:9,fontFamily:'PingFangSC-Regular',fontSize:14,color:'#333333',width:'19%'}}>网点预约</Text>
              <Text style={{fontFamily:'PingFangSC-Regular',fontSize:14,color:'#999999',width:'58%'}}>网点小助手，省时又便捷</Text>
              <Image style={{ width: 12, height: 12, }} source={require('$image/home/my/right_arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {this.itemClick(4)}}>
            <View style={{marginLeft:'5%',width:'90%',height:50,backgroundColor:'#FFFFFF',marginTop:12,borderRadius:4,flexDirection:'row',alignItems:'center'}}> 
              <SVG style={{ width: 24, height: 22,marginLeft:'5%' }} source={TODOICON5} />
              <Text style={{marginLeft:9,fontFamily:'PingFangSC-Regular',fontSize:14,color:'#333333',width:'19%'}}>自定义</Text>
              <Text style={{fontFamily:'PingFangSC-Regular',fontSize:14,color:'#999999',width:'58%'}}>添加自定义，待办更明确</Text>
              <Image style={{ width: 12, height: 12, }} source={require('$image/home/my/right_arrow.png')} />
            </View>
          </TouchableWithoutFeedback>
       </View>
      </View>
    )
  }
 
  itemClick = (num) => {
    switch(num) {
      case 0:
        router.load('addTransferAccounts',1); //还贷款
        break;
      case 1:
        router.load('addTransferAccounts',2); //还信用卡
        break;
      case 2:
        // router.load('transferAccounts')
        router.load('addTransferAccounts',4);  //转给他
        break;
      case 3:
        router.load('networkReservation')
        break;
      case 4:
        router.load('addTransferAccounts',4);  //自定义
        break;
    }
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
})
module.exports = MineToDo;