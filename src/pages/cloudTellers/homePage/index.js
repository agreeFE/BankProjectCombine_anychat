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

import ListItem from '../listItem/listItem'
import TextBubble from '../../../components/textBubble/TextBubble'
// import { CLOUDTELLERBG } from '../imageSource/index'
import { USERIMG1, USERIMG2, USERIMG3, USERIMG4 } from '../imageSource/index'

let LISTINFO = [
  {
    source: USERIMG1,
    name: '办理贷款',
    jobNum: 11023,
    communicationStatus: '1'
  }, {
    source: USERIMG2,
    name: '理财产品',
    jobNum: 11023,
    communicationStatus: '2'
  }, {
    source: USERIMG3,
    name: '综合签约',
    jobNum: 11023,
    communicationStatus: '2'
  }, {
    source: USERIMG4,
    name: '综合办理',
    jobNum: 11023,
    communicationStatus: '2'
  },
]

export default class GuidePage extends Component {
  constructor( props ){
    super( props )
    this.state = {
      businessTextArr: [
        { businessName: "综合签约", bubbleSize: 82 },
        { businessName: "购买理财产品", bubbleSize: 100 },
        { businessName: "快速借钱", bubbleSize: 75 },
        { businessName: "开通证券账户", bubbleSize: 102 },
        { businessName: "办理贷款", bubbleSize: 75 }
      ]
    }
  }

  _createListItem(item){
    return(
      <ListItem name={item.name} jobNum={item.jobNum} communicationStatus={item.communicationStatus} source={item.source} click={this.onClick} ></ListItem>
    )
  }

  render() {
    return (
      <View  style={{flex: 1}}>
{/*         
          <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={ LISTINFO }
              numColumns= {'2'}
              style={{ width:'100%', paddingRight: 11, backgroundColor: 'red'}}
              renderItem={ ({item}) => this._createListItem(item)}
          /> */}
          <View style={{width: '100%', height: 190, flexDirection: "row", flexWrap: "wrap",justifyContent: "space-around"}}>
            {
              LISTINFO.map((item,index)=> (
                <ListItem name={item.name} jobNum={item.jobNum} communicationStatus={item.communicationStatus} source={item.source} click={this.onClick} ></ListItem>
              ))
            }
          </View>
        
        <View style={styles.container}>
          <View style={styles.bumpRegion}>
            {this.state.businessTextArr.map((ele, index) => {
              return (
                <TextBubble businessText={ele.businessName} bubbleSize={ele.bubbleSize} curIndex={index} key={ele}></TextBubble>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  onClick() {
    $Router.load('tellerOperation')
  }
}


const styles = StyleSheet.create({
  bumpRegion: {
    justifyContent: 'space-around',
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
    // paddingBottom: 40,
    alignItems: 'baseline',
    backgroundColor: 'transparent',
    // backgroundColor:'red'
  },
  bgImage: {
    width: '100%',
  }
})