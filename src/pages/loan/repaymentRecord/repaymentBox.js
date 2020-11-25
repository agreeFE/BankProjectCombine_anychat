import React, { Component,  } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
const router = require('$/router-control')

class repaymentTable extends Component {
  state = {
  }
  componentDidMount() {
    this.setState(
      { ...this.props.item }
    )
  }
  toBorrowDetails = () => {
    router.load('borrowDetails')
  }
  render() {
    return (
      <View style={styles.wrapper}>
        {/* 标题头 */}
        <View style={styles.headerArea}>
          <View>
            <Text style={styles.headerAreaDateFormat}>本次已还</Text>
          </View>
          <View>
            <Text style={styles.headerAreaMoneyFormat}>{this.state.repayMoney}</Text>
          </View>
        </View>
        {/* 资金数据明细 */}
        <View style={styles.financialDetailArea}>
          <View>
            <View style={styles.formatItem}>
              <Text style={styles.formatTableTitle}>借款金额</Text>
              <View style={styles.formatItem}>
                <Text style={styles.formatTableTitle}>{this.state.borrowMoney}</Text>
                <TouchableWithoutFeedback onPress={this.toBorrowDetails}>
                  <View style={styles.viewBorrowDetail}>
                    <Text style={{ textAlign: 'center', lineHeight: 20, color: '#1278EF' }}>借款详情</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={styles.formatItem}>
              <Text style={styles.formatTableTitle}>借款时间</Text><Text style={styles.formatTableTitle}>{this.state.borrowTime}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewBorrowDetail: {
    width: 78,
    height: 24,
    borderWidth: 1,
    borderColor: '#1278EF',
    borderRadius: 16,
    textAlign: 'center',
    marginLeft: 12
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
    marginVertical: 10,
    alignItems: 'center'
  },
  financialDetailArea: {

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
    justifyContent: 'space-between',
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
export default repaymentTable;