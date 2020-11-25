import React, { PureComponent } from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class ChangeText extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      money: 0,
      totalmoney: 0,
      time: -1
    }
    
  }

  render() {
    let { fnc, styles } = this.props
    return (
      <Text style={styles}>{fnc(this.state.money)}</Text>
    )
  }
  static getDerivedStateFromProps(props, state) {
    if(Number(props.money) === state.money) {
      return null
    }
    
    return {
      time: props.money == state.totalmoney ? state.time + 1 : 0,
      totalmoney: Number(props.money)
    }
  }

  componentDidUpdate() {
    if(this.state.time === 0 ) {
      this.show(this.state.totalmoney)
    }
  }
  componentWillUnmount() {
    this.show = null
  }

  show = (number) => {
    let $this = this
    if(!this) return
  // 1. 已建立过对象直接调用
   // 2. 创建动态数字绘制对象
   dynaNum = new function ($this) {
      this.preNumber = 0; // 变化过程值
      this.desNumber = 0; // 目标数值，最终显示值
      this.step = 0;  // 变化步长，支持正向反向
      // 绘制过程
      this.render = function () {
      if(!$this) return
       // （1）结束条件
       if (this.preNumber == this.desNumber) {
        this.step = 0;
        return;
       }
       // （2）步长设置（计划 2 秒完成 40*50=2000）
       if (this.step == 0) {
        this.step = ((this.desNumber - this.preNumber) / 1000*32);
        if (this.step == 0) this.step = (this.desNumber - this.preNumber > 0) ? 1 : -1;
       }
       // （3）走一步
      // if(!$this) return
       this.preNumber += this.step;
       if (this.step < 0) {
        if (this.preNumber < this.desNumber) this.preNumber = this.desNumber;
       } else {
        if (this.preNumber > this.desNumber) this.preNumber = this.desNumber;
       }
       // （4）显示
    //    console.log('tag', this.preNumber)
        // if(!$this) return
        $this.setState({money: this.preNumber.toFixed(2)})
       // （5）每秒绘制 20 次（非精确值）
       var _this = this;
       setTimeout(function () { _this.render(); }, 16);
      };
     } ($this);
     // 3. 登记绑定元素ID 
     // 4. 调用绘制
    if(!this) return
     dynaNum.step = 0;
     dynaNum.desNumber = number;
     dynaNum.render();
  }
}

