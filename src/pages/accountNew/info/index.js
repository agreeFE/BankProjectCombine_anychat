import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

const Info = (props) => {
  const { fnc = () => {} } = props
  return (
    <View style={styles.container}>
      <Text style={styles.textFont}>说明：</Text>
      <Text style={[styles.textFont, {marginTop: 8}]}>1.资产负债信息供参考，且不含银保通和延期黄金市值，请以实际信息为准。</Text>
      <Text style={[styles.textFont, {marginTop: 4}]}>2.外币资产将会被折算成人民币资产统计，因汇率实时变动，请以
        <Text style={{color: '#1278EF'}} onPress={fnc()}>实际信息</Text>
      为准。</Text>
      <Text style={[styles.textFont, {marginTop: 4}]}>3.信用卡如有美元账单，将会折算成人民币负债计入到总负债中。</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 93
  },
  textFont: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#999999',
    lineHeight: 18
  }
})

export default Info