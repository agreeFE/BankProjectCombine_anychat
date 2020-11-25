import React, { Component,  } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import Header from '$/components/header'
import scope from '@/scope'
const router = require('$/router-control')
const {formatMoney} = require('$/util/moneyutil')

class repaymentRecord extends Component {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
    this.state = {
      repaymentData: this.props.navigation.state.params.info
    }
  }

  render() {
    const { repaymentData = [] } = this.state
    return (
      <>
        <Header
          title={'还款记录'}
          leftClick={() => { router.back() }}
          rightClick={() => { }}
        ></Header>
        {/* 还款记录列表展示区 */}
        {
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={repaymentData}
            style={{ flex: 1, backgroundColor: '#f6f6f6' }}
            contentContainerStyle={styles.borrowDetailArea}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
          >
          </FlatList>
        }
      </>
    )
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.wrapper}>
        {/* 标题头 */}
        <View style={styles.headerArea}>
          <View>
            <Text style={styles.headerAreaDateFormat}>{this.formatDate(item.paymentDate)}</Text>
            {/* <Text style={styles.headerAreaTimeFormat}>{item.repaymentTime}</Text> */}
          </View>
          <View>
            <Text style={styles.headerAreaMoneyFormat}>{formatMoney(item.totalAmount)}</Text>
          </View>
        </View>
        {/* 资金数据明细 */}
        <View style={styles.financialDetailArea}>
          <View>
            <View style={styles.formatItem}>
              <Text style={styles.formatTableTitle}>本金</Text>
              <Text style={styles.formatTableTitle}>{formatMoney(item.repaymentAmount)}</Text>
            </View>
            <View style={styles.formatItem}>
              <Text style={styles.formatTableTitle}>利息</Text>
              <Text style={styles.formatTableTitle}>{formatMoney(item.interest)}</Text>
            </View>
            <View style={styles.formatItem}>
              <Text style={styles.formatTableTitle}>手续费</Text>
              <Text style={styles.formatTableTitle}>{formatMoney(0)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  formatDate = (str) =>{
    str = str + ''
    return `${str.substr(0,4)}年${str.substr(4,2)}月${str.substr(-2)}日`
  }

}

const styles = StyleSheet.create({
  borrowDetailArea: {
    backgroundColor: '#f6f6f6',
    alignItems: 'center',
  },
  headerAreaDateFormat: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2
  },
  headerAreaTimeFormat: {
    fontSize: 15,
    color: '#999'
  },
  headerAreaMoneyFormat: {
    fontSize: 17,
    color: '#333'
  },
  viewButton: {
    fontSize: 13,
    color: '#1278EF',
    backgroundColor: '#FFFFFF',
    width: 60,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4494F2',
    textAlign: 'center',
    lineHeight: 22
  },
  formatTableTitle: {
    fontSize: 15,
    color: '#666666'
  },
  formatItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10
  },
  formaTitle: {
    fontSize: 18,
    color: '#333333'
  },
  headerArea: {
    height: 44,
    borderBottomColor: '#F3F3F3',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingBottom: 4
  },
  wrapper: {
    backgroundColor: '#fff',
    width: 335,
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  }
})
module.exports = repaymentRecord;