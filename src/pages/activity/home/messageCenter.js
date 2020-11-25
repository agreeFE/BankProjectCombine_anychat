import React, { Component,  } from 'react';
import { View, StyleSheet, Image, Text, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
const router = require('$/router-control');
import Header from '$/components/header'
import { getYearMouthDayLine } from '$/util/dateutil.js'
import { NOHAVE, TASK, MESSAGE } from '../imageSource'
import scope from '@/scope'
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import SVG from "$/components/Svg";

const NetWorkutil = require('$/util/networkutil');
const DeviceUtil = require("$/util/deviceutil");

class messageCenter extends Component {
  constructor(props) {
    super(props)
    scope(this);
    let formatDate = getYearMouthDayLine('/');
    this.state = {
      isLoading: true,
      listdata: [
        { type: 1, typeContent: '动账通知', date: formatDate, remark: '网银实时转至他行' },
        { type: 2, typeContent: '待办任务', date: formatDate, remark: '银行卡挂失交割凭证' },
        { type: 1, typeContent: '贷款通知', date: formatDate, remark: '建额成功' },
      ],
      tradeCodeList:[],
    }
    this.getTradeCode = this.getTradeCode.bind(this)
  }

  getTradeCode(){
    let _this = this;
    // console.warn('tag', 223)
    let networkUrl =  '/bcss/pierce/getTradeCode'
    let deviceId =  DeviceUtil.getUniqueId();
    let params = {
        "req_msg":{
          "deviceid": JSON.stringify(deviceId)
        }
    }
    NetWorkutil.networkService( networkUrl, params, ( succ )=>{
      // console.warn('tag', succ)
      // if( succ.length > 0){
        setTimeout(() => {
          _this.setState({
            tradeCodeList:succ,
            isLoading: false
          })
        }, 300);
      // }
    },( err )=>{
        console.warn( JSON.stringify(err) )
    })
  }

  // 返回上一步
  back = () => {
    router.back()
  }
  // 跳转至消息详情
  toMessageDetail = item => {
    if (item.msgStatus === 0) {
      NetWorkutil.networkService('/bcss/pierce/changeMsgStatus', {id: item.id});
    }
    router.load('messageDetail', { type: item })
  }
  messageBox = ({ item, index }) => {
    const createTime = `${item.createTime.substr(0, 10)} ${item.createTime.substr(11, 8)}`;
    return (
      <TouchableWithoutFeedback onPress={() => { this.toMessageDetail(item) }}>
        <View style={{ height: 65, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 13, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SVG style={styles.icon} source={TASK} />
            {item.msgStatus === 0 ? (<View style={styles.badge}></View>) : null}
            <View style={{ height: 45, marginLeft: 16 }}>
              <Text style={{ fontSize: 15, color: '#333', marginBottom: 4 }}>交割凭证</Text>
              <Text style={{ fontSize: 14, color: '#666' }}>银行卡挂失交割凭证</Text>
            </View>
          </View>
          <View style={{ height: '100%', marginRight: 24 }}>
            <Text style={{ fontSize: 12, color: '#999' }}>{createTime}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  componentDidMount() {
    // this.getTradeCode()
  }
  render() {
    let { tradeCodeList, isLoading } = this.state
    return (
      <View style={{ flex: 1 }}>
        {/* 标题栏 */}
        <Header
          title={'消息中心'}
          leftClick={this.back}
        ></Header>
        <NavigationEvents onDidFocus={payload => {
          this.getTradeCode()
          }}/>
        {/* 消息列表区 */}
        <View style={{flex: 1}}>
          {
            isLoading ?
            <View style={{ flex: 1, paddingTop: 180, alignItems: "center" }}>
              <ActivityIndicator color="#777" />
              <Text style={{ color: '#666', fontSize: 16, marginTop: 5 }}>一大波数据正在赶来，请稍后~</Text>
            </View>
            :
            tradeCodeList.length == 0 ?
            <View style={{ alignItems: 'center', width:"100%", height:"100%" }}>
              <SVG source={NOHAVE} style={styles.noHave}></SVG>
              <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无消息</Text>
            </View>
            :
            <View style={{ backgroundColor: '#f6f6f6', flex: 1 }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={ tradeCodeList }
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                renderItem={this.messageBox}
              ></FlatList>
            </View>
          }
        </View>
       
      </View>
    )
  }

}

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    marginLeft: 24,
  },
  noHave: {
    marginTop: 200,
    width: 55,
    height: 55
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CB3535',
    position: 'absolute',
    top: 4,
    left: 53
  }
})
module.exports = messageCenter;
