import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Animated,
  Easing,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'
import _ from 'lodash'
import { NavigationEvents } from 'react-navigation';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import Header from '$/components/header'
import { BG, BANKACCOUNT, ADDBOOK, DEFAULTUSERIMG, NOHAVE, RIGHTARROW, AGREELOGOPRO } from './imageSource'
import scope from '$/scope'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import SVG from "$/components/Svg";


module.exports = class TransferAccounts extends Component {
  constructor(props) {
    super(props)
    scope(this)
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      isLoading: true,
      clickIndex: -1,
      showItem: false,
      animatedHeight: new Animated.Value(0),
      otherList:[],
      myList: []
    }
  }
  render() {
    const { clickIndex, isLoading, showItem,myList, otherList, animatedHeight } = this.state
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={payload => { this.queryMyFriendBankNum() }}></NavigationEvents> 
        <Header
          leftClick={this.back}
          title={'转账'}
          imageBackground={0}
          headerStyle={{ backgroundColor: "transparent" }}
        ></Header>
        <Image source={BG} style={styles.image}></Image>
        <View style={styles.titleCon}>
          <View style={styles.titleCon1}>
            <TouchableWithoutFeedback onPress={() => { this.itemClick(0) }}>
              <View style={styles.titleItem}>
                <SVG source={BANKACCOUNT} style={styles.titleImage}></SVG>
                <Text style={styles.titleItemFont}>银行账号转账</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.itemClick(1) }}>
              <View style={styles.titleItem}>
                <SVG source={ADDBOOK} style={styles.titleImage}></SVG>
                <Text style={styles.titleItemFont}>通讯录转账</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.titleCon2}>
            <TouchableWithoutFeedback onPress={() => { this.itemClick(2) }}>
              <View style={styles.titleItem}>
                <Text style={styles.titleItemFont}>预约转账</Text>
                <View style={styles.itemLine}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.itemClick(3) }}>
              <View style={styles.titleItem}>
                <Text style={styles.titleItemFont}>转账设置</Text>
                <View style={styles.itemLine}></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => { this.itemClick(4) }}>
              <View style={styles.titleItem}>
                <Text style={styles.titleItemFont}>转账记录</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.list}>
          <View style={styles.listTitle}>
            <Text style={styles.listTitleFont}>最近转账伙伴</Text>
          </View>
          <View style={{flex: 1}}>
            {
              isLoading ?  
              <View style={{alignItems: "center", marginTop: 20}}>
                <ActivityIndicator color='#777'/>
                <Text style={{ color: '#666', fontSize: 16,marginTop: 5 }}>正在查找转账小伙伴，请稍后~</Text>
              </View>
              :
              myList.length > 0 && otherList.length > 0  ?
              // false  ?
                <View style={{flex: 1}}>
                {
                  myList && myList.length > 0 ?
                    <>
                      <TouchableWithoutFeedback onPress={this.toggleItem}>
                        <View style={styles.listItem}>
                          <SVG source={DEFAULTUSERIMG} style={{ width: 48, height: 48 }}></SVG>
                          <View style={{ flex: 1, paddingLeft: 10 }}>
                            <Text style={styles.listTitleFont}>{userName}  {`(${myList.length})`}</Text>
                            {/* <Text style={styles.listTitleFont}>马德政  {`(${myList.length})`}</Text> */}
                          </View>
                          <View style={{ transform: [{ rotate: `${showItem ? -90 : 90}deg` }] }}>
                            <SVG source={RIGHTARROW} style={{ width: 12, height: 12, }}></SVG>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                      <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
                        <FlatList
                          keyExtractor={(item, index) => index.toString()}
                          showsVerticalScrollIndicator={false}
                          data={myList}
                          renderItem={({ item, index }) => <ListItem item={item} index={index} mySelf={true} fnc={this.listItemClick}></ListItem>}
                        ></FlatList>
                      </Animated.View>
                    </>
                    :
                    <></>
                }
                {
                  otherList && otherList.length > 0 ?
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      data={otherList}
                      renderItem={this.otherListItem}
                      // renderItem={({ item, index }) => <ListItem item={item} index={index} mySelf={false} fnc={this.listItemClick}></ListItem>}
                    ></FlatList>
                    // <SwipeListView
                    //   useSectionList
                    //   style={{flex: 1}}
                    //   rightOpenValue={-68 *3}
                    //   disableRightSwipe={true}
                    //   previewRowKey={'0'}
                    //   previewOpenValue={-40}
                    //   previewOpenDelay={3000}
                    //   sections={otherList}
                    //   renderSectionHeader={({ section }) => (
                    //     <View style={{height: 30, width: '100%', justifyContent: "center", paddingLeft: 20}}>
                    //       <Text>{section.firstName}</Text>
                    //     </View>
                    //   )}
                    //   renderItem={(data) => 
                    //     (<ListItem item={data.item} mySelf={false} fnc={this.listItemClick}
                    //       index={_.findIndex(otherList.filter(item => item.firstName == data.item.firstWord)[0].data,data.item)} />)
                    //   //   (<View style={{height: 60, backgroundColor: "#fff"}}>
                    //   // <Text>{data.item.payeeName} {}</Text>
                    //   //   </View>)
                    //   }
                    //   renderHiddenItem={(data, rowMap) => (
                    //       <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    //         <Text style={{width: 68, textAlign: "center", lineHeight: 68, backgroundColor: "#ddd"}}>置顶</Text>
                    //         <Text style={{width: 68, textAlign: "center", lineHeight: 68, backgroundColor: "orange"}}>修改</Text>
                    //         <Text style={{width: 68, textAlign: "center", lineHeight: 68, backgroundColor: "red"}}>删除</Text>
                    //       </View>
                    //   )}
                    // ></SwipeListView>
                    :
                    <></>
                }
              </View>
              :
              <View style={{flex: 1,  alignItems: "center"}}>
                <SVG source={NOHAVE} style={styles.noHave}></SVG>
                <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无转账伙伴，快去添加吧</Text>
              </View>
            } 
            
          </View>
        </View>
      </View>
    )
  }
  // componentWillMount(): void {
  //   this.queryMyFriendBankNum()
  // }

  toggleItem = () => {
    const { showItem,myList, otherList,  animatedHeight } = this.state
    let length = myList.length
    let toValue
    if (showItem) {
      animatedHeight.setValue(length * 68)
      toValue = 0
    } else {
      animatedHeight.setValue(0)
      toValue = length * 68
    }
    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      easing: Easing.out(Easing.linear)
    }).start()
    this.setState({ showItem: !showItem })
  }

  //查询常用收款人
  queryMyFriendBankNum() {
    var data = {}
    let _this = this
    NetworkUtil.networkService('/account/payee/list', data, function (response) {

      let myList = response.payeeList.filter(item => item.payeeName === userName)
      // console.warn('tag', myList)
      // myList.map(item => {
      //   item.payeeName = '马德政'
      // })
      let otherList1 = response.payeeList.filter(item => item.payeeName !== userName)
      
      otherList1.sort((a,b) => a.firstWord.charCodeAt() - b.firstWord.charCodeAt())
      // console.warn('222',otherList1)
      otherList1.map(item => {
        item.key = item.upId
      })
      let arr = []
      for(let i=0; i<otherList1.length; i++) {
        arr.push(otherList1[i].firstWord)
      }
      arr = Array.from(new Set(arr))
      let otherList = []
      for(let j=0; j< arr.length; j++) {
        otherList.push({firstName: arr[j], data: otherList1.filter(item => item.firstWord === arr[j])})
      } 
      let timer = setTimeout(()=> {
        _this.setState({  myList, otherList, isLoading: false })
        clearTimeout(timer)
      },200)
    })
  }
  back = () => {
    router.back()
  }

  itemClick = (index) => {
    switch (index) {
      case 0:
        window.transferType = 1,
        router.load('transferInfo');
        break;
      case 1:
        router.load('getMailList')
        break;
      case 2:
        router.load('reservationTransfer');
        break;
      case 3:
        router.load('transferSettings');
        break;
      case 4:
        router.load('transferRecordQuery');
        break;
    }
  }

  listItemClick = (item) => {
    window.transferType = 2,
    window.friInfo = item
    router.load('transferInfo');
  }
  otherListItem = ({item,index}) => {
    return (
      <View>
        <View style={{height: 30, width: '100%', justifyContent: "center", paddingLeft: 20}}>
          <Text>{item.firstName}</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={item.data}
          renderItem={({ item, index }) => <ListItem item={item} index={index} mySelf={false} fnc={this.listItemClick}></ListItem>}
        >
        </FlatList>
      </View>
    )
  }
}

const ListItem = (props) => {
  const { item, index, fnc, mySelf } = props
  let cardNo = item.payeeCardNo.substr(0, 4) + ' ' + item.payeeCardNo.substr(4, 4) + ' ' + '****' + ' ' + item.payeeCardNo.substr(-4)
  return (
      <TouchableWithoutFeedback onPress={() => { fnc(item) }}>
        <View style={[styles.listItem, { backgroundColor: mySelf ? '#eee' : '#fff', borderTopWidth: index ===0 ? 0 : 1 }]} key={index}>
          <View style={{ width: 48, height: 48, backgroundColor: '#00A4AF', borderRadius: 24, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={AGREELOGOPRO} style={{ width: 39, height: 27, marginBottom: 5, marginRight: 2 }}></Image>
          </View>
          <View style={{ flex: 1, paddingLeft: 10 }}>
            {
              mySelf ?
                <></>
                :
                <Text style={styles.listTitleFont}>{item.payeeName}</Text>
            }
            <Text style={[styles.titleItemFont, { color: "#666" }]} numberOfLines={1} ellipsizeMode={'tail'}>{cardNo}  {item.payeeCardBank}</Text>
          </View>
          <SVG source={mySelf ? 0 : RIGHTARROW} style={{ width: 12, height: 12 }}></SVG>
        </View>
      </TouchableWithoutFeedback>
      // <SwipeRow rightOpenValue={-60} disableRightSwipe={true} style={{flexDirection: "row", backgroundColor:'blue'}}>
      //   <View style={{width: '100%', justifyContent: "flex-end", alignItems: 'flex-end'}}>
      //     <Text>delete</Text>
      //   </View>
      //   <View style={{height: 40, backgroundColor: 'red',width: '100%'}}>
      //     <Text>hello world</Text>
      //   </View>
      // </SwipeRow>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: "#eee"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 160,
    zIndex: -1
  },
  titleCon: {
    marginHorizontal: 10,
    height: 140,
    marginTop: 5,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 7,
    borderRadius: 4
  },
  titleCon1: {
    flexDirection: "row",
    height: 92
  },
  titleCon2: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    flex: 1,
    flexDirection: 'row',
    alignItems: "center"
  },
  titleImage: {
    width: 28,
    height: 28,
    marginBottom: 10
  },
  titleItem: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: 'relative'
  },
  titleItemFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#3A3A3A',
    letterSpacing: 0.17,
    lineHeight: 20
  },
  itemLine: {
    position: 'absolute',
    top: 3,
    right: 0,
    width: 1,
    height: 16,
    backgroundColor: '#F0F0F0'
  },
  list: {
    marginTop: 10,
    width: '100%',
    backgroundColor: '#fff',
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  listTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    paddingLeft: 20,
    paddingRight: 28,
    backgroundColor: "#fff"
  },
  listTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#3A3A3A',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  listItem: {
    height: 68,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: "#fff"
  },
  noHave: {
    marginTop: 68,
    width: 55,
    height: 55
  },
})