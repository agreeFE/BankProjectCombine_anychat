import React, { PureComponent } from 'react'
// 146
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import CloudBg from '$/components/cloudBg'
import BreathLamp from '$/components/breathingLamp'
import { SEND, SEARCH } from './imageSource'

export default class VoiceSuccess extends PureComponent {
  constructor(props) {
    super(props) 
    this.state = {
      search: false,
      value: ''
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
  }

  render() {
    let { search, value } = this.state
    return (
      <CloudBg>
        <View style={styles.resCon}>
          {
            !search ? 
            <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: 4}}>
              <Text style={[styles.textRegular,{fontSize: 18, lineHeight:25}]}>我要贷款</Text>
              <TouchableWithoutFeedback onPress={() => {this.setState({search: !search})}}>
                <Image source={SEARCH} style={{marginLeft: 10}}></Image>
              </TouchableWithoutFeedback> 
            </View>
            :
            <View style={styles.searchCon}>
              <View style={[styles.searchItem,styles.searchInput]}>
                <TextInput 
                  style={{flex: 1, opacity: 1, color: '#fff'}}
                  value={value}
                  autoFocus={true}
                  clearTextOnFocus={true} //每次开始输入的时候都会清除文本框的内容 ios
                  onSubmitEditing={this.onSubmit}
                  onChangeText={this.onChangeText}
                >
                </TextInput>
              </View>
              <TouchableWithoutFeedback onPress={this.onSubmit}>
                <View style={[styles.searchItem, styles.goSearch]}>
                  <Image source={SEND}></Image>
                </View>
              </TouchableWithoutFeedback>
            </View>
          }
        </View>
        <View style={styles.textCon}>
          <Text style={styles.textRegular}>小赞猜你想要，请点击跳转</Text>
          <Text 
            style={[styles.textMedium,{ marginTop: 8}]}
            onPress={() => {}}
          >申请贷款</Text>
          <View style={{marginTop: 32, flexDirection: 'row', alignItems: "center"}}>
            <Text style={styles.textRegular}>我想</Text>
            <Text 
              style={[styles.textMedium,{ marginLeft: 12, color: '#F139F6'}]}
              onPress={() => {}}  
            >快速呼叫云柜员</Text>
          </View>
        </View>
        <BreathLamp style={{marginTop: 159}}></BreathLamp>
      </CloudBg>
    )
  }

  onSubmit() {
    alert(JSON.stringify(this.state))
    this.setState({
      value: ''
    })
  }

  onChangeText(event) {
    this.setState({
      value: event
    })
  }

}

const styles = StyleSheet.create({
  textCon: {
    paddingLeft: 30,
    marginTop: 40
  },
  textRegular: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 20,
    color: '#E1E1E1',
    textAlign: 'justify',
    lineHeight: 28
  },
  textMedium: {
    fontFamily: 'PingFangSC-Medium',
    fontSize: 26,
    color: '#3EB7FF',
    textAlign: 'justify',
    lineHeight: 37
  },
  resCon: {
    height: 55,
    marginTop: 115,
    paddingLeft: 24,
    paddingRight: 24
  },
  searchCon: {
    flex: 1, 
    // backgroundColor: 'red', 
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  searchItem: {
    opacity: 0.3,
    backgroundColor: '#136BA6',
    borderRadius: 8
  },
  goSearch: {
    width: 55,
    justifyContent: "center",
    alignItems: "center"
  },
  searchInput: {
    width: 245
  }
})
