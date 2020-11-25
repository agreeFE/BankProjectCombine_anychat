{/* 
  使用方法
  
  <CardPick
ref={ref => this.cardPicker = ref}
cardList={cardList}
selectIndex={accountPickIndex}
onConfirm={this.getAccountValue}
onCancel={() =>{this.setState({
  clickRight: !clickRight
})}}
></CardPick> */}


import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback
} from 'react-native'
import SVG from "$/components/Svg";
import { CLOSE, CHECK, UNCHECK, CARDIMG} from './imageSource'
const HEIGHT = 260
export default class CardPick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animatedHeight: new Animated.Value(0),
      showModal: false,
      changeBg: false,
    }
  }

  render() {
    const { animatedHeight, showModal,changeBg } = this.state
    const { cardList, selectIndex } = this.props
    return (
      <View style={[styles.cardModalCon, {width: showModal ? '100%' : 0, height: showModal ? '100%' : 0, backgroundColor: changeBg ? 'rgba(0,0,0,0.3)': 'transparent'}]}>
        <Animated.View style={[styles.cardCon, {height: animatedHeight}]}>
          <View style={styles.cardTitle}>
            <Text style={styles.cardTitleFont}>选择银行卡</Text>
            <TouchableWithoutFeedback onPress={this.toggleModal}>
              <View style={styles.closeImg}>
                <SVG source={CLOSE} style={{width: 12, height: 12}}></SVG>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
            {
              cardList.map((item,index) => (
                <TouchableWithoutFeedback onPress={() => {this.chosenCard(index)}} key={index}>
                  <View style={styles.cardItem}>
                    <View style={styles.cardingWrapper}>
                      <Image source={CARDIMG} style={{width: 26, height: 18,marginBottom:4,marginRight:2}}></Image>
                    </View>
                    <Text style={styles.cardItemFont}>{item.value}</Text>
                    <Image source={index == selectIndex ? CHECK : UNCHECK} style={{width: 20, height: 20}}></Image>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
            </ScrollView>
            
          </View>
        </Animated.View>
      </View>
    )
  }

  toggleModal = () => {
    this.animated()
    this.props.onCancel ? this.props.onCancel() : () =>{}
  }

  animated = () => {
    const { animatedHeight, showModal, changeBg } = this.state
    this.setState({changeBg: !changeBg})
    if(showModal) {
      animatedHeight.setValue(HEIGHT)
      Animated.timing(animatedHeight,{
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.linear)
      }).start(() => {
        this.setState({
          showModal: !showModal
        })
      })
      
      return
    } 
    animatedHeight.setValue(0)
    Animated.timing(this.state.animatedHeight, {
      toValue: HEIGHT,
      duration: 300,
      easing: Easing.out(Easing.linear)
    }).start()
    this.setState({
      showModal: !showModal
    })
  }

  // close = () => {
  //   if(!this.state.showModal) return
  //   this.animated()
  //   this.setState({
  //     showModal: false
  //   })
  //   this.props.onCancel()
  // }

  chosenCard = (index) => {
    const { cardList } = this.props
    this.props.onConfirm({index, item: cardList[index]})
    this.toggleModal()
  }
}

const styles = StyleSheet.create({
  cardingWrapper:{
    backgroundColor:'#00A4AF',
    width: 35, 
    height: 35,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center'
  },
  cardModalCon: {
    position: 'absolute',
    // backgroundColor: 'rgba(0,0,0,0.3)', 
    zIndex: 10,
    justifyContent: 'flex-end'
  },
  cardCon: {
    height: 260,
    backgroundColor: "#fff",
    overflow: 'hidden'
  },
  cardTitle: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  cardTitleFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#3A3A3A',
    lineHeight: 22
  },
  cardItemFont: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 15,
    color: '#3A3A3A',
    lineHeight: 21,
    marginLeft: 12,
    flex: 1
  },
  cardItem: {
    height: 61,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 32
  },
  closeImg: {
    width: 20, 
    height: 20,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 13,
    right: 16
  }
})
