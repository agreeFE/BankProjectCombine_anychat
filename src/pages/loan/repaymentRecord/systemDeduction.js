import React, { Component,  } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableWithoutFeedback,FlatList } from 'react-native';
import Header from '$/components/header'
import RepaymentBox from './repaymentBox'
import scope from '@/scope'
const router = require('$/router-control')

class BorrowDetails extends Component {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
  }
  state = {
    repayment: '2000.00',
    isViewContract: false, //查看贷款合同
    repaymentData: [
      {
        repayMoney: '518.49',
        borrowMoney: '1,000.00',
        borrowTime: '2018-12-10至2019-12-10'
      },
      {
        repayMoney: '1231.13',
        borrowMoney: '2,000.00',
        borrowTime: '2018-12-10至2019-12-10'
      },
      {
        repayMoney: '2123.19',
        borrowMoney: '3,000.00',
        borrowTime: '2018-12-10至2019-12-10'
      },
      {
        repayMoney: '7312.49',
        borrowMoney: '10,000.00',
        borrowTime: '2018-12-10至2019-12-10'
      },
      {
        repayMoney: '1991.49',
        borrowMoney: '4,000.00',
        borrowTime: '2018-12-10至2019-12-10'
      }
    ]
  }
  showContract = () => {
    this.setState({
      isViewContract: true
    })
  }
  hideContract = () => {
    this.setState({
      isViewContract: false
    })
  }
  render() {
    return (
      <>
        <Header
          title={'还款记录'}
          leftClick={() => { router.back() }}
          rightClick={() => { }}
        ></Header>
        {/* 结清本金展示区 */}
        <View style={styles.settleCapital}>
          <Text style={[{ textAlign: 'center' }, styles.textOne]}>系统扣款(元)</Text>
          <Text style={[{ textAlign: 'center' }, styles.textTwo]}>{this.state.repayment}</Text>
          <Text style={[{ textAlign: 'center' }, styles.textThree]}>对应 <Text style={styles.lightText}>5笔借款</Text></Text>
        </View>
        {/* 还款记录列表展示区 */}
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.repaymentData}
          style={{ flex: 1, backgroundColor: '#f6f6f6' }}
          contentContainerStyle={styles.borrowDetailArea}
          renderItem={({ item, index }) => <RepaymentBox item={item} index={index}></RepaymentBox>}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>
        
      </>
    )
  }

}

const styles = StyleSheet.create({
  borrowDetailArea: {
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  lightText: {
    fontSize: 15,
    color: '#3484F5'
  },
  textThree: {
    fontSize: 15,
    color: '#666',
    marginTop: 20
  },
  textTwo: {
    fontSize: 40,
    color: '#293478',
    marginTop: 20
  },
  textOne: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 31,
  },
  settleCapital: {
    justifyContent: 'flex-start',
    textAlign: 'center',
    position: 'relative',
    paddingBottom: 20
  },
  titleStyle: {
    color: '#000',
    textAlign: 'left',
  },
  leftIconStyle: {
    width: 20,
    height: 20,
  },
})
module.exports = BorrowDetails;