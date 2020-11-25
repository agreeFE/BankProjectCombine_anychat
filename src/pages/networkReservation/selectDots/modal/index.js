import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ImageBackground
} from 'react-native'
import SVG from "$/components/Svg";
import { CLOSE } from '../../imageSource'

export default class Modal extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    const { dotInfo, fnc } = this.props
    return (
      // <TouchableWithoutFeedback onPress={() => {fnc()}}>
        <View style={styles.container}>
          {/* <TouchableWithoutFeedback onPress={() =>{}}> */}
            <View style={styles.infoCon}>
              <TouchableWithoutFeedback onPress={() => {fnc()}}>
                <View style={styles.imageCon}>
                  <SVG source={CLOSE} style={styles.image}></SVG>
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.title}>{dotInfo.name}</Text>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>地址:</Text>
                <Text numberOfLines={2}  style={[styles.infoFont,{width: '70%'}]}>{dotInfo.address}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>营业:</Text>
                <Text style={styles.infoFont}>{dotInfo.workTime}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.infoTitle}>电话:</Text>
                <View>
                  <Text style={styles.infoFont}>(0755)82995986（储蓄）；</Text>
                  <Text style={styles.infoFont}>(0755)83267253（零售）</Text>
                </View>
              </View>
              {/* <View style={styles.info}>
                <Text style={styles.infoTitle}>排队:</Text>
                <Text>普通客户1人</Text>
              </View> */}
            </View>
          {/* </TouchableWithoutFeedback> */}
        </View>
      // </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    zIndex: 1,
    justifyContent: "flex-end"
  },
  infoCon: {
    height: 200,
    backgroundColor: '#fff',
    position: 'relative',
    paddingTop: 20,
    paddingLeft: 20

  },
  imageCon: {
    position: "absolute", 
    top: 0, 
    right: 0, 
    width: 40, 
    height: 40, 
    zIndex: 2, 
    paddingLeft: 10, 
    paddingBottom: 10, 
    justifyContent: 'flex-end', 
    alignItems: "flex-start"
  },
  image: {
    width: 13,
    height: 13,
  },
  title: {
    textAlign: "left",
    lineHeight: 25,
    fontFamily: 'PingFangSC-Medium',
    fontSize: 18,
    color: '#333333',
    letterSpacing: 0.22,
    paddingBottom: 6,
    fontWeight: 'bold'
  },
  info: {
    flexDirection: 'row',
    marginTop: 10
  },
  infoTitle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#999999',
    letterSpacing: 0.18,
    lineHeight: 21,
    width: 46
  },
  infoFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 15,
    color: '#333333',
    letterSpacing: 0.18,
    lineHeight: 21,
  }
})
