import React, { PureComponent } from 'react'

import { 
	View,
  TextInput,
  Image,
  Text,
  Animated,
  Easing,
  Modal,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
	TouchableWithoutFeedback 
} from 'react-native'
import LinearGradient from "react-native-linear-gradient"
import SVG from "$/components/Svg";
import List from './flatlist/flatlist'
import Pickers from '$/components/picker/pickerPro'
import CardPick from '$/components/cardPick'
import { GRAYTRA, BLUETRA } from '../imageSource'
import Header from '$/components/header'
import scope from '@/scope'
const router = require('$/router-control')
const NetworkUtil = require('$/util/networkutil')
const {getBankCard} = require('$/util/bankCardutil')

module.exports = class SearchTransactions extends PureComponent {
  constructor(props) {
    super(props)
    scope(this)
    const {time, account, balanceValue } = this.props.navigation.state.params
    this.state = {
      isLoading: true,
			isSearch: false,//搜索界面？ 
			search: false,//开始搜索
      searchValue: '',
      searchList: [],
			searchData: [],
			clickLeft: false,
      clickRight: false,
      selectedValue: [ time || this.setDate()[0] ],
      showListData: (balanceValue && balanceValue.result) || {},
      filterListData: (balanceValue && balanceValue.result) || {},
      animatedHeight: new Animated.Value(0),
      chosenType: 1, //查询类型
      accountPickIndex: 0,
      stopChange: false,
      cardList: [{
        value: '全部账户',
        label: ''
      }], //卡号信息
      animationType: 'fade',//none slide fade
      modalVisible: false,//模态场景是否可见
      transparent: true,//是否透明显示
    }
    
  }

  render() {
    let { isLoading, isSearch, searchList, search, searchData, showListData,animatedHeight, filterListData,
      searchValue, clickLeft, clickRight, selectedValue, chosenType, accountPickIndex, cardList } = this.state
    return (
      <View style={{flex: 1}}>
        <Header title={'查找交易'} leftClick={()=>{router.back()}}></Header>
        <View style={{flex: 1}}>
        {
					isSearch ? 
					// 查找交易 
					<View style={[styles.container,{backgroundColor: '#fff'}]}>
						<View style={styles.searchCon}>
							<View style={styles.search}>
								<Image source={require('$image/search/searchBlack.png')} style={{width: 15, height: 15}}></Image>
								<TextInput
									style={styles.textInput}
									autoFocus={!search}
									value={searchValue} 
									placeholder={'请输入关键词查询'}
									placeholderTextColor={'#6A6A6A'}
									underlineColorAndroid={'transparent'}
									onChangeText={this.onChange}
								>
								</TextInput>
								{searchValue.length > 0 ?
									<TouchableWithoutFeedback onPress={() => { this.setState({searchValue: '', search: false}) }}>
										<Image style={[ { width: 16, height: 16 }]} source={ require('$image/search/delX.png')} />
									</TouchableWithoutFeedback>
									: <></>}
							</View>
							<TouchableWithoutFeedback onPress={() => {this.toggle()}}>
								<View>
									<Text style={styles.font}>取消</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<View style={{flex: 1}}>
							{
								!search ?
								<>
									<View style={styles.searchHeader}>
										<Text style={styles.headerFont}>历史搜索</Text>
                    {/* searchList: [] */}
										<TouchableWithoutFeedback onPress={() => {
                      if(searchList.length < 1) return
                      this.setState({modalVisible: true})
                    }}>
                      <View style={{width: 25, height: 25, justifyContent:"center", alignItems: "center"}}>
											  <SVG source={require('$image/home/shanchu.svg')} style={{width: 16, height: 16,}}></SVG>
                      </View>
										</TouchableWithoutFeedback>
									</View>
									<View> 
										{
											searchList.length > 0 ?
											<View style={{flexDirection: 'row', justifyContent: "flex-start"}}>
												{
													searchList.map((item, index) => (
														<TouchableWithoutFeedback onPress={() => { this.search(item) }}>
															<View style={{ backgroundColor: '#F1F5F7', height: 36, borderRadius: 18, marginLeft: 12, marginTop: 12, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignItems: 'center' }}>
																<Text style={{ fontFamily: 'PingFangSC-Light', fontSize: 14, color: '#333333', textAlign: 'justify' }}>{item}</Text>
															</View>
														</TouchableWithoutFeedback>
													))
												}
											</View>
											:
											<Text style={{ marginLeft: 35, marginTop: 10 }}>暂无搜索历史</Text>
										}
									</View>
								</>
								:
								<>
								{
									searchData.length > 0 ?
									<List listData={searchData}></List>
									:
									<View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
										<SVG style={{ width: 174, height: 156}} source={require('$image/home/bucunzai.svg')} />
									</View>
								}
								</>
							}
						</View>
					</View>
          :
          <View style={[styles.container]}>
						<View style={styles.pickCon}>
							<TouchableWithoutFeedback onPress={this.leftClick}>
								<View style={styles.pick}>
									<Text style={[styles.textFont, {color: clickLeft ? '#528FEE' : '#3A3A3A'}]}>{this.setDate().indexOf(selectedValue[0]) === 0 ? '本月' : selectedValue}</Text>
									<SVG source={clickLeft ? BLUETRA : GRAYTRA} style={styles.triangle}></SVG>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback onPress={this.rightClick}>
								<View style={styles.pick}>
									<Text style={[styles.textFont, {color: clickRight ? '#528FEE' : '#3A3A3A'}]}>{'筛选'}</Text>
									<SVG source={clickRight ? BLUETRA : GRAYTRA} style={styles.triangle}></SVG>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<View style={styles.container}>
              {
                // clickRight ?
                <View style={styles.chosenCon}>
                  <Animated.View style={[{overflow: 'hidden',backgroundColor: '#f0f0f0', height: animatedHeight, position: 'relative',}]}>
                    <View style={{borderTopColor: $globalStyle.transfer.queryColor,borderTopWidth: 1,}}>
                      <View style={styles.chooseBox}>
                        <Text style={styles.toastTitle}>查询类型</Text>
                        <View style={styles.chooseItem}>
                          <Text style={[styles.textItem, chosenType == 1 ? styles.active : '']} onPress={() => { this.chooseType(1) }}>全部</Text>
                          <Text style={[styles.textItem, {marginLeft: 20}, chosenType == 2 ? styles.active : '']} onPress={() => { this.chooseType(2) }}>收入</Text>
                          <Text style={[styles.textItem, {marginLeft: 20}, chosenType == 3 ? styles.active : '']} onPress={() => { this.chooseType(3) }}>支出</Text>
                        </View>
                      </View>
                      <View style={styles.chooseBox}>
                        <Text style={styles.toastTitle}>账户</Text>
                        <View style={styles.chooseItem}>
                          <Text style={[styles.textItem, styles.active ]} onPress={() => { }}>{cardList[accountPickIndex].value}</Text>
                          <Text style={[styles.textItem, {marginLeft: 20}]} onPress={() => { this.cardPicker.toggleModal() }}>更多账户</Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View>
                </View>
                // :
                // <></>
              }
							<View style={styles.searchCon1}>
								<TouchableWithoutFeedback onPress={this.toggle}>
									<View style={styles.search1}>
										<Image source={require('$image/search/searchBlack.png')} style={{width: 15, height: 15}}></Image>
										<Text style={styles.text}>请输入关键词查询</Text>
									</View>
								</TouchableWithoutFeedback>
							</View>
              {
                isLoading ?  
                <View style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
                  <ActivityIndicator color="#777" />
                  <Text style={{ color: '#666', fontSize: 16, marginTop: 5 }}>一大波数据正在赶来，请稍后~</Text>
                </View>
                // <Text style={{ color: '#666', fontSize: 16, textAlign: "center", marginTop: 20 }}>一大波数据正在赶来，请稍后~</Text>
                :
                filterListData.length > 0 ?
                <List listData={filterListData}></List>
                :
                <View style={{flex: 1, marginTop: 30, alignItems: "center"}}>
                  <SVG source={require('$image/transferAccount/noHave.svg')} style={{width: 80, height: 80}}></SVG>
                  <Text style={{ fontSize: 14, color: '#999', marginTop: 20 }}>暂无收支记录</Text>
                </View>
              }
							 
							<Pickers
								ref={ref => this.picker = ref}
								pickerData={ this.setDate()}
								selectedValue={selectedValue}
								onPickerConfirm={this.getValue}
								onPickerCancel={this.toggleColor}
							></Pickers>

              <CardPick
                ref={ref => this.cardPicker = ref}
                cardList={cardList}
                selectIndex={accountPickIndex}
                onConfirm={this.getAccountValue}
              ></CardPick>
						</View>
				</View>
        }
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.clear()
          }}
        >
          <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ height: 178, width: '90%', marginLeft: '5%', alignItems: 'center', backgroundColor: 'white', borderRadius: 5 }}>
              <View style={{ height: 48, borderBottomColor: '#EBEBEB', borderBottomWidth: 1, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 17, color: '#333333', textAlign: 'center' }}>温馨提示</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: '#333333', textAlign: 'center' }}>确定删除全部历史记录</Text>
              </View>
              <View style={{ height: 80, width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => { this.setState({modalVisible: false}) }}>
                  <View style={{ height: 35, width: '40%', borderColor: $globalStyle.backgroundColor, borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.backgroundColor }}>取消</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.clear() }}>
                  <LinearGradient colors={$globalStyle.buttonLinerBackground} style={{ marginLeft: '5%', height: 35, width: '40%', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PingFangSC-Medium', fontSize: 15, color: $globalStyle.textColor }}>确定</Text>
                  </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
        </View>
      </View>
    )
  }

  clear = () => {
    this.setState({
      modalVisible: false,
      searchList: []
    })
  }

  // static getDerivedStateFromProps(props, state) { 
    // const {cardList , accountPickIndex, stopChange} = state
    // const { account } = props.navigation.state.params
    // let index = !!account ? cardList.findIndex(item => item.value == account.value) : 0
    // if(index > 0 && index !== accountPickIndex && !stopChange) {
    //   return {
    //     accountPickIndex: index,
    //     stopChange: false
    //   }
    // }
  //   return null

  // }

  setDefaultIndex = () => {
    const { cardList } = this.state
    const { account } = this.props.navigation.state.params
    let index = !!account ? cardList.findIndex(item => item.value == account.value) : 0
    this.setState({
      accountPickIndex: index,
    })
    
  }

  chooseType = (num) => {
    let { chosenType, showListData, filterListData } = this.state
    switch(num) {
      case 1:
        chosenType = 1
        filterListData = showListData
        break;
      case 2: 
        chosenType = 2
        filterListData = showListData.filter(item => item.cdflg === 'C')
        break;
      case 3: 
        chosenType = 3
        filterListData = showListData.filter(item => item.cdflg === 'D')
        break;
    }
    this.setState({
      chosenType,
      filterListData,
    })
    this.rightClick()
    
  }

  startAnimated = () => {
    const { clickRight, animatedHeight } = this.state
    let height
    if(!clickRight) {
      animatedHeight.setValue(0)
      height = 180
    } else {
      animatedHeight.setValue(180)
      height = 0
    }
    Animated.timing(animatedHeight, {
      toValue: height,
      duration: 400,
      easing: Easing.out(Easing.linear)
    }).start()
  }

  getAccountValue = ({index,item}) =>  {
    this.rightClick()
    this.setState({
      accountPickIndex: index
    })
    this.startGetData({index})
  }

  getCardList = (cardArr) => {
    const {cardList} = this.state
    cardArr.map((item) => {
      cardList.push({value: `账户${item.cardNo.substr(-4)}`, label: item.cardNo})
    })
    this.setState(() =>({
      cardList,
    }))
  }

  toggle = () => {
    this.setState({
      isSearch: !this.state.isSearch
    })
	}
	componentDidMount() {
    let {time, account, balanceValue } = this.props.navigation.state.params
    getBankCard(this.getCardList)
    this.setDefaultIndex()
    // if(time) {
      // time =  `${time.substr(0,4)}${time.substr(5,2)}`
    // }
    // console.warn('tag1', time,account)
    if(!balanceValue) {
      this.startGetData({})
    } else {
      this.startGetData({item: [time]})
    }
    
    $Storage.load({ key: `${userName}Search` }).then(result => {
      this.setState({
        searchList: result
      })
    }).catch(err => {
      if (err.name === "NotFoundError") {
        console.warn("本地没有缓存路由信息");
      }
    })
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      this.keyboardDidHideHandler.bind(this));
  }

  componentWillUnmount() {
    const { searchList } = this.state
    $Storage.save({
      key: `${userName}Search`,
      data: searchList,
    })
    if(this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  keyboardDidHideHandler(){
    const { searchValue  } = this.state
    if(!searchValue) {
      this.setState({
        search: false
      })
      return
    }
    this.search()
  }

  onChange = (event) => {
    this.setState({
      searchValue: event
    })
  }
  search = (item) => {
    const { showListData, filterListData } = this.state
    if(item) {
      this.setState({
        searchValue: item
      })
    }
    let { searchValue,searchList  } = this.state
    if(searchValue) {
      searchList.unshift(searchValue)
      searchList= Array.from(new Set(searchList))
    }
    let reg = new RegExp( `${searchValue || item}`)
    let searchData = filterListData.filter(item => reg.test(item.rmk) || reg.test(item.opacnm))
    this.setState({
      search: true,
      searchList,
      searchData
    })
	}
	
	getValue = (item) => {
    this.toggleColor()
    this.setState({
      selectedValue: item
    })
    this.startGetData({item})
  }
  toggleColor = () => {
    const { clickLeft, clickRight } = this.state
    if(clickLeft && !clickRight) {
      this.setState({clickLeft: !clickLeft})
      this.picker.hide()
      return
    }
    this.picker.init()
    
  }

  leftClick = () => {
    const { clickLeft, clickRight } = this.state
    this.setState({clickLeft: !this.state.clickLeft})
    if(clickRight) {
      this.setState({clickRight: false})
      this.startAnimated()
    }
    this.toggleColor()
  }

  rightClick = () => {
    const { clickLeft, clickRight } = this.state
    this.startAnimated()
    this.setState({clickRight: !this.state.clickRight})
    if(clickLeft) {
      this.setState({clickLeft: false})
      this.picker.hide()
      // return
    }
    
  }

  setDate = () => {
    let [year, month] = [new Date().getFullYear(),new Date().getMonth() + 1]
    let date = []
    for(let i=0; i<6; i++) {
      if(month < 0) {
        month = 12;
        --year
      }
      date.push(`${year}年${month > 9 ? month : '0' + month}月`)
      month--
    }
    return date
	}

	startGetData = ({item,index}) => {
    // console.warn('222', item,index)
    const { accountPickIndex, cardList, selectedValue } = this.state
    // let [year, mon] = [new Date().getFullYear(),new Date().getMonth() + 1]
    let month = !!item ? item[0] : selectedValue[0]
    
    let info = {}
    info.month = month.substr(0,4) + month.substr(5,2)
    info.acctno = cardList[index || accountPickIndex].label
    this.getData(info)
  }
	
	// account/bill/list
  getData = (info) => {
    const { chosenType } = this.state
    this.setState({
      isLoading: true
    })
    let _this = this
    NetworkUtil.networkService('/account/bill/list', info, response => {
      let showListData = response.result
      let filterListData
      switch(chosenType) {
        case 1:
          filterListData = showListData
          break;
        case 2:
          filterListData = showListData.filter(item => item.cdflg === 'C')
          break;
        case 3:
          filterListData = showListData.filter(item => item.cdflg === 'D')
          break;
      }

      _this.setState({
        // balanceValue: response
        showListData,
        filterListData,
        isLoading: false
      })
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  searchCon: {
    height: 54,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  search: {
    width: 280,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  textInput: {
    padding: 0,
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 8
  },
  font: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: 'blue',
    textAlign: 'justify',
    lineHeight: 20,
    justifyContent: 'center',
    alignItems: "center"
  },
  searchHeader: {
    height: 22,
    marginTop: 10,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 16,
    color: '#333333',
    textAlign: 'justify',
    lineHeight: 22
  },
  searchItem: {
    height: 36,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
	},
	pickCon: {
    backgroundColor: '#fff',
    height: 45,
    paddingLeft: 24,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center"
  },
  searchCon1: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  search1: {
    width: 335,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    padding: 0,
    backgroundColor: 'transparent',
    flex: 1,
    marginLeft: 8,
    color: '#6A6A6A'
  },
  pick: {
    flexDirection: "row",
    alignItems: "center"
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center'
  },
  triangle: {
    marginLeft: 10,
    width: 12,
    height: 7
  },
  chosenCon: {
    position: 'absolute',
    top: 0, 
    width: '100%',
    left: 0,
    zIndex: 10,
  },
  toastTitle: {
    fontSize: 16,
    color: '#3a3a3a',
    marginTop: 12,
    fontWeight: 'bold'
  },
  chooseBox: {
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  chooseItem: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    marginTop: 12,
    width: "100%",
    alignItems: 'center'
  },
  active: {
    backgroundColor: $globalStyle.transfer.queryColor,
    borderRadius: 4,
    color: '#fff',
    borderColor: $globalStyle.transfer.queryColor,
    borderWidth: 1,
    borderRadius: 4,
  },
  textItem: {
    width: 74,
    height: 32,
    textAlign: 'center',
    lineHeight: 30,
    borderColor: $globalStyle.transfer.queryBorder,
    borderWidth: 1,
    borderRadius: 4,
    color: '#3a3a3a',
  },
})


