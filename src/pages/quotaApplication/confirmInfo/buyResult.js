import React, { Component,  } from 'react';
import { View, StyleSheet, Image,Text,TouchableWithoutFeedback, BackHandler } from 'react-native';
import Header from '$/components/header'
import {  CORRECT } from '../imageSource'
import scope from '@/scope'
const router = require('$/router-control')

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName })
//   ]
// });
// this.props.navigation.dispatch(resetAction);

class c extends Component {
  constructor(props) {
    super(props);
    scope(this);
    var omap = {};
    omap[this.props.navigation.state.routeName] = this;
    $.instanceList.push(omap);
  }
  render() {
    return (
      <>
        <Header
          title={'贷款'}
          leftClick={this.back}
        ></Header>
        {/* 购买成功页面 */}
        <View style={styles.topPart}>
          <View style={styles.successView}>
            <Image style={styles.correctView} source={CORRECT}></Image>
          </View>
          <Text style={styles.formatTextOne}>恭喜您!</Text>
          <Text style={styles.formatTextTwo}>您已成功申请贷款,请注意贷款发放时间。</Text>
          <TouchableWithoutFeedback onPress={this.back}>
            <View style={styles.finishButton}>
              <Text style={styles.formatTextThree}>完成</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
    )
  }

  back = () => {
    router.load('homeScrollable')
  }


  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.back(); // works best when the goBack is async
    return true;
  }

}

const styles = StyleSheet.create({
  finishButton: {
    width: 142,
    height: 35,
    borderRadius: 4,
    marginTop: 145,
    borderColor: '#999',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  formatTextThree: {
    fontSize: 15,
    color: '#666',
  },
  formatTextTwo: {
    fontSize: 15,
    color: '#666',
    marginTop: 24
  },
  formatTextOne:{
    fontSize: 17,
    color: '#333333',
    fontWeight: '800',
    marginTop: 12
  },
  correctView: {
    width: 25,
    height: 25,
    position: 'absolute'
  },
  successView:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#62B558',
    marginTop: 60,
    justifyContent: 'center',
    alignItems:'center'
  },
  topPart:{
    justifyContent:'flex-start',
    alignItems: 'center',
    flex: 1
  }
})
module.exports = c;