import React, { Component } from 'react'

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import Header from '$/components/header'
import scope from '@/scope'
const router = require('$/router-control')

module.exports = class NumRecord extends Component {
  constructor(props) {
    super(props) 
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <Header 
          title={`历史记录`}
          leftClick={()=> {router.back()}}
          rightClick={()=> {}}
        ></Header>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
          data={[1,2]}
          renderItem={({item,index}) => <Item item={item} key={index}></Item>}
        ></FlatList>
      </View>
    )
  }
} 

const Item = (props) => {
  const { item, key } = props
  return (
    <View style={styles.item} key={key}>
      <View>
        <Text style={styles.titleFont}>深南中路支行(取号)</Text>
        <Text style={styles.textFont}>2019年09月04日 下午05:21</Text>
        <Text style={styles.textFont}>办理业务: 普通客户</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.readyTo}>
          <Text style={styles.readyFont}>待办</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )  
}


const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1
  },
  item: {
    height: 93,
    backgroundColor: '#fff',
    // marginTop: 10,
    marginBottom: 1,
    paddingLeft: 20,
    paddingVertical: 12,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems :"center"
  },
  titleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0.18,
    lineHeight: 21,
    fontWeight: 'bold'
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#999999',
    letterSpacing: 0.17,
    lineHeight: 20,
    marginTop: 4
  },
  readyTo: {
    width: 76,
    height: 32,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: $globalStyle.transfer.textColor
  },
  readyFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 14,
    color: $globalStyle.transfer.textColor,
    lineHeight: 20,
    fontWeight: 'bold'
  }
})
