import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard
} from 'react-native';
import Echarts from 'native-echarts'
import {Row, Rows, Table} from 'react-native-table-component'


module.exports = class test extends Component<{}> {
  render() {
    const option = {
      color:["#287bad", "#71ceb9"],
      legend: {
          data: ['贷款本金',  '总利息'],
          bottom:"0%"
      },
      yAxis: {
          type: 'value'
      },
      xAxis: {
          type: 'category',
          data: ['贷款一', '贷款二', '贷款三', '贷款四',]
      },
      series: [
          {
              name: '贷款本金',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [30000, 35000, 30000, 35000]
          },
   
          {
              name: '总利息',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: [3968, 4630, 4799, 5599]
          }
        ]
    };
    const options  = {
      tableHead: ['', '贷款本金', '年利率','期限(以月计)','月还数额','总利息','还款总额'],
      tableData: [
          ['贷款1',
          '￥30,000',
          '5.00%',
          '60',
          '￥566',
          '￥3,968',
          '￥33,968'
          ],
          ['贷款2',
          '￥35,000',
          '5.00%',
          '60',
          '￥660',
          '￥4,630',
          '￥39,630'
          ],
          ['贷款3',
          '￥30,000',
          '6.00%',
          '60',
          '￥580',
          '￥4,799',
          '￥34,799'
          ],
          ['贷款4',
          '￥35,000',
          '6.00%',
          '60',
          '￥677',
          '￥5,599',
          '￥40,599'
          ],
      ]
    };
    return (
      <View style={{flex:1,backgroundColor:'#fffbf0'}}>
        <Text style={{textAlign:'center',marginTop:15,marginBottom:-35}}>贷款摘要</Text>
        <Echarts option={option} height={300}/>
        <View style={{padding: 20}}>
           <Table borderStyle={{borderWidth: 1, borderColor: '#cdcbc8'}}>
              <Row style={{backgroundColor:'#287bac'}}  data={options.tableHead} textStyle={{textAlign:'center',color:'#fff',fontWeight:'bold'}}/>
              {
                  options.tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      style={[{height: 40}, index%2 && {backgroundColor: '#f0ebe2'}]}
                      textStyle={{textAlign:'center'}}
                    />
                  ))
                }
              {/* <Rows data={options.tableData} textStyle={styles.text}/> */}
           </Table>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

});