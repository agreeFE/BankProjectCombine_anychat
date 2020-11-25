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

import Header from './header/header'
import ListItem from './listItem/listItem'
import TextBubble from '../../components/textBubble/TextBubble'
import BreathingLamp from '../../components/breathingLamp/index'

import { CLOUDTELLERBG } from './imageSource/index'
import { BACK } from './imageSource/index'

let LISTINFO = [
  {
    name: '小可爱',
    jobNum: '12314',
    communicationStatus: '1'
  }, {
    name: '林志玲',
    jobNum: '52346',
    communicationStatus: '1'
  }, {
    name: '张曼玉',
    jobNum: '7323',
    communicationStatus: '2'
  }, {
    name: '乔碧萝',
    jobNum: '84322',
    communicationStatus: '2'
  },
]

module.exports = class GuidePage extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    businessTextArr: [
      { businessName: "综合签约", bubbleSize: 82 },
      { businessName: "购买理财产品", bubbleSize: 100 },
      { businessName: "快速借钱", bubbleSize: 75 },
      { businessName: "开通证券账户", bubbleSize: 102 },
      { businessName: "办理贷款", bubbleSize: 75 }
    ]
  }
  _createListItem(item) {
    return (
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
          <View style={styles.header}>
            <Header></Header>
          </View>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={LISTINFO}
            numColumns={'2'}
            style={{ width: '100%', }}
            renderItem={({ item }) => this._createListItem(item)}
          />
          <View style={styles.container}>
          <View style={styles.bumpRegion}>
            {this.state.businessTextArr.map((ele, index) => {
              return (
                <TextBubble businessText={ele.businessName} bubbleSize={ele.bubbleSize} curIndex={index} key={ele}></TextBubble>
              )
            })}
          </View>
          </View>
          <BreathingLamp></BreathingLamp>
        </View>
      </View>
    )
  }

  onClick() {
  }
}

const { StatusBarManager } = NativeModules;
const HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const styles = StyleSheet.create({
  bumpRegion: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: '#23262D',
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    elevation: 2,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
    alignItems: 'baseline',
    backgroundColor: '#23262D',
  },
  bgImage: {
    width: '100%',
  }
})