import React, { Component,  } from 'react';
import { NavigationEvents } from 'react-navigation';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import _ from 'lodash'
import { View, StyleSheet, Image, BackHandler, Text, ScrollView, Animated,ActivityIndicator, Easing, TouchableWithoutFeedback, TextInput, FlatList } from 'react-native';
import Header from '$/components/header'
import { BACK, ELLIPSIS, NOHAVE, SEARCH, DEFAULTUSERIMG, AGREELOGOPRO, RIGHTARROW, DOWNARROW, BANK } from './imageSource'
const NetworkUtil = require('$/util/networkutil');
const router = require('$/router-control');
import scope from '$/scope'
import SVG from "$/components/Svg";

const ListItem = (props) => {
  const { item, index, fnc, mySelf } = props
  let cardNo = item.payeeCardNo.substr(-4)
  return (
    <>
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
            <Text style={[styles.titleItemFont, { color: "#666" }]} numberOfLines={1} ellipsizeMode={'tail'}>{item.payeeCardBank}({cardNo})</Text>
          </View>
          <SVG source={mySelf ? 0 : RIGHTARROW} style={{ width: 12, height: 12 }}></SVG>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
} 

module.exports = class transferInfo extends Component<{}> {
  constructor(props) {
    super(props);
    scope(this)
    this.state = {
      isLoading: true,
      searchValue: '',
      showMe: false,
      myBankList: [],
      friendBankList: [],
      showFriendBankList: [],
      myCardNum: 0,
      otherList:[],
      myList: [],
      showItem: false,
      animatedHeight: new Animated.Value(0),
      close: false

    };
    this.searchChange = this.searchChange.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.back(); // works best when the goBack is async
    return true;
  }

  back = () => {
    this.setState({close: true})
    router.back()
  }
  //查询常用收款人
  queryMyFriendBankNum() {
    this.setState({close: false})
    var data = {}
    let _this = this
    NetworkUtil.networkService('/account/payee/list', data, function (response) {
      // console.warn('tag', response.payeeList)
      let myList = response.payeeList.filter(item => item.payeeName === userName)
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
        _this.setState({  myList, otherList, isLoading: false, friendBankList: response.payeeList })
        clearTimeout(timer)
      },200)
    })
  }
  onClick(index) {
    switch (index) {
      case 1:

        break;
      case 2:
        if (this.state.showMe) {
          this.setState({ showMe: false })
        } else {
          this.setState({ showMe: true })
        }

        break;
      case 3:
        router.load('transferFriendAdd',{type: 'add'});
        break;
      case 4:

        break;
    }
  }

  //搜索栏监听
  searchChange(text) {
    this.setState({
      searchValue: text
    })
    // var friendDate = []
    // var index = ''
    // for (index = 0; index < this.state.friendBankList.length; index++) {
    //   if ((this.state.friendBankList[index].payeeName).indexOf(text) != -1) {
    //     friendDate.push(this.state.friendBankList[index])
    //   }
    // }
    // this.setState({ showFriendBankList: friendDate })
  }
  toggleItem = () => {
    const { showItem, otherList, myList, animatedHeight } = this.state
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
  //我的银行卡
  _renderMyItem({ item, index }) {
    return (

      <View key={index} style={[styles.infoView, { paddingLeft: 50 }]}>
        <View style={{ width: '17%' }}>
          <Image source={AGREELOGOPRO} style={{ width: 39, height: 27, marginBottom: 5, marginRight: 2 }}></Image>
          {/* <Image style={styles.infoImg} source={BANK} /> */}
        </View>
        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: '#333333', }}>{item.payeeCardNo}</Text>
          <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#666666', paddingTop: 3 }}>{item.payeeCardBank}</Text>
        </View>
      </View>

    )
  }
 
  //转账伙伴
  _renderFriendItem({ item, index }) {
    return (
      <View key={index} style={styles.infoView}>
        <View style={{ width: '17%' }}>
          <View style={[{ width: 48, height: 48, backgroundColor: '#00A4AF', borderRadius: 24, justifyContent: 'center', alignItems: 'center' }, styles.infoImg]}>
            <Image source={AGREELOGOPRO} style={{ width: 23, height: 16, marginBottom: 5, marginRight: 2 }}></Image>
          </View>
        </View>
        <View style={{ paddingLeft: 20, width: '70%' }}>
          <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: '#333333', }}>{item.payeeName}</Text>
          <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 14, color: '#666666', paddingTop: 3 }}>{item.payeeCardBank} {item.payeeCardNo}</Text>
        </View>
        <View style={{ width: '10%' }}>
          <SVG style={{ width: 12, height: 12 }} source={RIGHTARROW} /></View>
      </View>
    )
  }
  listItemClick = (item) => {
    let {goback} = this.props.navigation.state.params
    if(!goback) return
    window.chosenCardInfo = item
    this.setState({close: true})
    router.back()
  }

  otherListItem = ({item,index}) => {
    return (
      <View>
        <View style={{height: 30, width: '100%', justifyContent: "center", paddingLeft: 20}}>
          <Text>{item.firstName}</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={item.data}
          renderItem={({ item, index }) => <ListItem item={item} index={index} mySelf={false} fnc={this.listItemClick}></ListItem>}
        >
        </FlatList>
      </View>
    )
  }

  closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
    }
}

  placementItem = (rowMap,rowKey) => {
    // this.closeRow(rowMap, rowKey);
  }

  modifyItem = (rowMap,rowData) => {
    this.closeRow(rowMap, rowData.key);
    router.load('transferFriendAdd',  {type: 'modify', data: rowData});
  }
  deleteItem = (rowMap,rowData) => {
    let defaultAction = [
      {
        text: '取消',
        onPress: () => {},
        style: 'default',
      },
      {
        text: '确定', onPress: () => {
          this.closeRow(rowMap, rowData.key);
          NetworkUtil.networkService('/account/payee/delete', {upId: rowData.upId}, (response) => {
            $Toast.info(`删除收款人${rowData.payeeName}`)
            let timer = setTimeout(() => {
              this.queryMyFriendBankNum()
              clearTimeout(timer)
            }, 500);
          })
        },
      }
    ];
    $Modal.confirm('删除伙伴','删除后将不在您的转账伙伴中，您确定删除吗?',defaultAction)
   
  }

  searchSub = (e) => {
    const { text } = e.nativeEvent
    let { friendBankList } = this.state
    let reg = new RegExp( `${text}`)
    let myList = friendBankList.filter(item => item.payeeName === userName)
    let otherList1 = friendBankList.filter(item => item.payeeName !== userName)
    myList = myList.filter(item => reg.test(item.payeeName) || reg.test(item.payeeCardNo) || reg.test(item.payeePhone))
    otherList1 = otherList1.filter(item => reg.test(item.payeeName) || reg.test(item.payeeCardNo) || reg.test(item.payeePhone))
    otherList1.sort((a,b) => a.firstWord.charCodeAt() - b.firstWord.charCodeAt())
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
      this.setState({  myList, otherList, isLoading: false, })
      clearTimeout(timer)
    },200)
  }



  render() {
    let { isLoading, otherList, myList, animatedHeight, showItem, close } = this.state;
    let {goback} = this.props.navigation.state.params
    return (
      <>
        <NavigationEvents onWillFocus={payload => { this.queryMyFriendBankNum() }}></NavigationEvents> 
        <Header
          title={'我的转账伙伴'}
          leftClick={this.back}
        ></Header> 
        {/* 内容 */}
        <View style={styles.body}>
          <View style={[styles.topSearchBox, { width: '88%', height: 50, marginLeft: '6%', justifyContent: 'center' }]}>
            <View style={styles.inputStyle}>
              {/* <Image style={styles.topSearchIco} source={SEARCH} /> */}
              <Image source={require('$image/search/searchBlack.png')} style={styles.topSearchIco}></Image>
              <TextInput style={styles.topSearchInput}
                placeholderTextColor={'#A3A8C5'} placeholder='输入姓名/卡号/手机号'
                onChangeText={this.searchChange}
                value={this.state.searchValue} onSubmitEditing={this.searchSub}></TextInput>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => { this.onClick(3) }} >
            <View style={styles.addNewFriView}>
              <Text style={[styles.addNewFriText, { fontSize: 26, marginTop: -5, paddingLeft: 24 }]}>+</Text>
              <Text style={styles.addNewFriText}> 添加新伙伴</Text>
            </View>
          </TouchableWithoutFeedback>
          {/* <TouchableWithoutFeedback onPress={() => { this.onClick(2) }} >
            <View style={[styles.infoView, { marginTop: 10 }]}>
              <SVG style={styles.infoImg} source={DEFAULTUSERIMG} />
              <Text style={{ fontFamily: 'PingFangSC-Regular', fontSize: 15, color: '#3A3A3A', marginLeft: 20, width: '68%' }}>{window.userName} ({this.state.myCardNum})</Text>
              <Image style={{ height: 12, width: 12, }} source={DOWNARROW} />
            </View>
          </TouchableWithoutFeedback> */}
          {/* {this.state.showMe ? <View>
            <FlatList
                            keyExtractor={(item, index) => index.toString()}
              data={this.state.myBankList}
              renderItem={this._renderMyItem}
            />
          </View> : <></>} */}
          {/* <View>
            <FlatList
                            keyExtractor={(item, index) => index.toString()}
              data={this.state.showFriendBankList}
              renderItem={this._renderFriendItem}
            />
          </View> */}
          <View style={{flex: 1}}>
          {
            isLoading ?  
            <View style={{alignItems: "center", marginTop: 20}}>
              <ActivityIndicator color='#777'/>
              <Text style={{ color: '#666', fontSize: 16,marginTop: 5 }}>正在查找转账小伙伴，请稍后~</Text>
            </View>
            //  <Text style={{ color: '#666', fontSize: 16, textAlign: "center", marginTop: 20 }}>正在查找转账小伙伴，请稍后~</Text>
             :
            myList.length > 0 || otherList.length > 0 ?
            <ScrollView>
              {
                 myList.length > 0 ?
                  <>
                    <TouchableWithoutFeedback onPress={this.toggleItem}>
                      <View style={[styles.listItem,{marginTop: 10}]}>
                        <SVG source={DEFAULTUSERIMG} style={{ width: 48, height: 48 }}></SVG>
                        <View style={{ flex: 1, paddingLeft: 10 }}>
                          <Text style={styles.listTitleFont}>{userName}  {`(${myList.length})`}</Text>
                          {/* <Text style={styles.listTitleFont}>马德政  {`(${myList.length})`}</Text> */}
                        </View>
                        <View style={{transform: [{ rotate: `${showItem ? -90 : 90}deg` }]}}>
                          <SVG source={RIGHTARROW} style={{ width: 12, height: 12,  }}></SVG>
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                    <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={myList}
                        renderItem={({ item, index }) => <ListItem item={item} index={index} mySelf={true} fnc={this.listItemClick}></ListItem>}
                      ></FlatList>
                    </Animated.View>
                  </>
                  :
                  <></>
              }
              {
                otherList.length > 0 ?
                  <SwipeListView
                    useSectionList
                    style={{flex: 1}}
                    rightOpenValue={-68 *3}
                    disableRightSwipe={true}
                    disableLeftSwipe={goback}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    sections={otherList}
                    renderSectionHeader={({ section }) => (
                      <View style={{height: 30, width: '100%', justifyContent: "center", paddingLeft: 20}}>
                        <Text>{section.firstName}</Text>
                      </View>
                    )}
                    renderItem={(data) => 
                      (<ListItem item={data.item} mySelf={false} fnc={this.listItemClick}
                        index={_.findIndex(otherList.filter(item => item.firstName == data.item.firstWord)[0].data,data.item)} />)
                    //   (<View style={{height: 60, backgroundColor: "#fff"}}>
                    // <Text>{data.item.payeeName} {}</Text>
                    //   </View>)
                    }
                    renderHiddenItem={(data, rowMap) => (
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', width: close ? 0 : '100%'}}>
                          {/* <TouchableWithoutFeedback onPress={() => this.deleteItem(rowMap, data)}>
                            <Text style={[styles.itemCon,{backgroundColor: "red"}]}>删除</Text>
                          </TouchableWithoutFeedback> */}
                          <Text style={styles.itemCon} onPress={() => this.placementItem(rowMap,data.item)}>置顶</Text>
                          <Text style={[styles.itemCon,{backgroundColor: "orange"}]} onPress={() => this.modifyItem(rowMap,data.item)}>编辑</Text>
                          <Text style={[styles.itemCon,{backgroundColor: "red"}]} onPress={()=> this.deleteItem(rowMap,data.item)}>删除</Text>
                        </View>
                    )}
                  ></SwipeListView>
                  :
                  <></>
              }
            </ScrollView>
            :
            <View style={{flex: 1,  alignItems: "center"}}>
              <SVG source={NOHAVE} style={styles.noHave}></SVG>
              <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无转账伙伴，快去添加吧</Text>
            </View>
          }
          </View>
        </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
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
    borderTopColor: '#F0F0F0',
    backgroundColor: "#fff"
  },
  body: {
    backgroundColor: '#F6F6F6',
    height: '100%',
    width: '100%',
  },
  inputStyle: {
    position: "relative",
    borderRadius: 15,
    height: 32,
    lineHeight: 32,
    backgroundColor: '#FFFFFF'
  },
  topSearchIco: {
    marginTop: 8,
    marginLeft: 10,
    width: 15,
    height: 15,
  },
  topSearchInput: {
    height: 20,
    lineHeight: 20,
    padding: 0,
    paddingLeft: 1,
    position: "absolute",
    left: 40,
    bottom: 6,
    fontSize: 14,
    color: "#A3A8C5",
  },
  addNewFriView: {
    height: 45,
    width: '100%',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center'
  },
  addNewFriText: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#528FEE',
    paddingLeft: 8,
  },
  infoView: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#F0F0F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoImg: {
    width: 40,
    height: 40,
    marginLeft: 20
  },
  noHave: {
    marginTop: 68,
    width: 55,
    height: 55
  },
  itemCon:{
    width: 68,
    textAlign: "center",
    lineHeight: 68,
    backgroundColor: "#ddd",
    color: '#fff'
  }
})
