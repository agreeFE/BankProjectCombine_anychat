import React, { Component } from 'react'
import { 
  View, 
  Text,
  StyleSheet, 
  NativeModules, 
  Platform,
  Image,
  FlatList
} from 'react-native'

import Header  from './header/header'
import ListItem from './listItem/listItem'

import { CLOUDTELLERBG } from './imageSource/index'
import { BACK } from './imageSource/index'

let LISTINFO = [
    {
      name:'小可爱',
      jobNum:'12314',
      communicationStatus:'1'
    },{
      name:'林志玲',
      jobNum:'52346',
      communicationStatus:'1'
    },{
      name:'张曼玉',
      jobNum:'7323',
      communicationStatus:'2'
    },{
      name:'乔碧萝',
      jobNum:'84322',
      communicationStatus:'2'
    },
]

export default class GuidePage extends Component{
  constructor( props ){
    super( props )
  }

  _createListItem(item){
    return(
      <ListItem name={item.name} jobNum={item.jobNum} communicationStatus={item.communicationStatus} click={this.onClick} ></ListItem>
    )
  }

  render() {
    return (
      <View style={styles.body}>
        {/* 背景图片 */}
        <View style={styles.bodybgImage} >
          <Image source={CLOUDTELLERBG} style={styles.bgImage} ></Image>
        </View>
        {/* 整体 */}
        <View style={styles.content}>
          <View  style={styles.header}>
            <Header></Header>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={ LISTINFO }
            numColumns= {'2'}
            style={{ width:'100%',}}
            renderItem={ ({item}) => this._createListItem(item)}
          />
        </View>
      </View>
    )
  }

  onClick(){
  }
}

const { StatusBarManager } = NativeModules;
const HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  body:{
    width:'100%',
    height:'100%',
    backgroundColor:'#23262D',
  },
  content:{
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    zIndex:2,
    elevation:2,
  },
  bgImage: {
    width:'100%',
  }
})