import React, { Component,  } from 'react'
import {
  View,
  TextInput,
  Text,
  Keyboard,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native'
import Header from '$/components/header'
import SVG from "$/components/Svg";
import Modal from './modal'
import { SEARCH} from '../imageSource/index'
import scope from '@/scope'
const router = require('$/router-control')

module.exports = class SelectDots extends Component {
  constructor(props) {
    super(props)
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap); 
    this.state = {
      showModal: false,
      selectValue: '',
      showData: DOTINFO
    }
  }
  render() {
    const { showModal, dotInfo={}, selectValue, showData } = this.state
    return (
      <View style={{flex: 1}}>
        <Header
          title={`选择网点`} 
          leftClick={()=> {router.back()}}
        ></Header>
        <View style={{flex: 1, position: 'relative'}}>
          <ScrollView 
            style={{flex: 1, backgroundColor: '#eee'}}
            scrollEventThrottle={2}
            ref={(view) => { this.myScrollView = view }}
          >
            {/* 搜索框 */}
            <View style={styles.searchCon}>
              <View style={styles.search}>
                <ImageBackground source={SEARCH} style={{width: 15, height: 15, marginRight: 10}}></ImageBackground>
                <TextInput
                  style={{flex: 1, padding: 0}}
                  value={selectValue}
                  onChangeText={this.changeText}
                  ref={(view) => {this.textInput = view}}
                  placeholder={'请输入名称/区划/街道'}
                  // onSubmitEditing={this.submit}
                ></TextInput>
                {selectValue.length > 0 ?
                  <TouchableWithoutFeedback onPress={() => { this.setState({selectValue: ''}) }}>
                    <Image style={[ { width: 16, height: 16 }]} source={ require('$image/search/delX.png')} />
                  </TouchableWithoutFeedback>
                  : <></>}
              </View>
            </View>
            {/* 网点列表 */}
            {
              showData.length > 0 ? 
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={showData}
                showsVerticalScrollIndicator = {false}
                renderItem={
                  ({item,index}) => 
                    <ListItem item={item} index={index} fnc={this.goJump} showInfo={this.toggleModal}></ListItem>
                }
              >
              </FlatList>
              :
              <View style={{ flex: 1, alignItems: "center", justifyContent: 'center' }}>
                <SVG style={{ width: 174, height: 156}} source={require('$image/home/bucunzai.svg')} />
              </View>
            }
            
          </ScrollView>
          {
            showModal ?
            <Modal fnc={this.toggleModal} dotInfo={dotInfo}></Modal>
            :
            <></>
          }
        </View>
        
      </View>
    )
  }

  toggleModal = (item) => {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
      dotInfo: item || {}
    })
  }

  goJump = (bankInfo) => {
    window.bankInfo = bankInfo
    router.back()
  }

  componentWillMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      this.keyboardDidHideHandler.bind(this));
  }

  componentWillUnmount() {
    if(this.keyboardDidHideListener != null) {
      this.keyboardDidHideListener.remove();
    }
  }

  keyboardDidHideHandler = () => {
    const { selectValue } = this.state
    const arr = DOTINFO.filter((item,index) => {
      return item.name.match(selectValue) || item.address.match(selectValue)
    })
    this.setState({
      showData: arr
    })
  }

  submit = () => {
   
  }

  changeText = (selectValue) => {
    this.setState({
      selectValue
    })
  }
}


const ListItem = (props) =>{
  const { showInfo, fnc, item, index } = props
  return (
    <TouchableWithoutFeedback onPress={() => {fnc(item)}}>
      <View style={[styles.item, {borderTopColor: index === 0 ? '#fff' : '#ddd'}]}>
        <View style={{width: '80%', height: '100%', paddingVertical: 10,}}>
          
          {/* $globalStyle.transfer.textColor, */}
          <Text style={[styles.font,{fontWeight: 'bold'}]}>{item.name}       <Text style={styles.dis}>{item.dis}千米</Text></Text>
          <Text numberOfLines={2} style={[styles.font,{color: '#666666', fontFamily: 'PingFangSC-Regular', marginTop: 6}]}>{item.address}</Text>
        </View>
        <TouchableWithoutFeedback onPress={()=>{showInfo(item)}}>
        <View style={{height: '100%', width: 40, justifyContent: "center"}}>
          <Text style={[styles.font, {color: '#1E93D3', fontWeight: 'bold'}]}>详情</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  item: {
    height: 84,
    backgroundColor: "#fff",
    position: 'relative',
    // paddingVertical: 16,
    paddingLeft: 20,
    paddingRight: 24,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: "center",
    borderTopWidth: 1
  },
  searchCon: {
    justifyContent: "center",
    alignItems: "center",
    height: 52
  },
  search: {
    width: 335,
    height: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10
  },
  font: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0.18,
    lineHeight: 21
  },
  dis: {
    // color: '#E28A1A',
    color: $globalStyle.transfer.textColor,
    // paddingLeft: 25
  },
  extraFont: {
    textAlign: "center",
    lineHeight: 30,
    color: '#aaa'
  }

})

const DOTINFO = [
  {
    name: '深南中路支行',
    dis: 1,
    address: '广东省深圳市福田区金田路3038号',
    near: true,
    workTime: '9:00-17:30（周一至周日）',
  },
  {
    name: '深圳时代广场支行',
    dis: 1.3,
    address: '深圳市福田区益田路4068号卓越时代广场一楼',
    near: false,
    workTime: '9:00-17:00（周一至周五）',
  },
  {
    name: '中央商务支行',
    dis: 3.0,
    address: '深圳市福田区福华一路88号中心商务大厦首层',
    near: false,
    workTime: '9:00-17:00（周一至周六）'
  },
  {
    name: '皇岗支行',
    dis: 3.5,
    address: '深圳市福田区彩田路2018号中深花园B座首层',
    near: false,
    workTime: '9:00-17:30（周一至周日）'
  },
]