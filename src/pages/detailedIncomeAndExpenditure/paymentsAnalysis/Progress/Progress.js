import React, { PureComponent } from 'react';
import {
  View,
  ART,
  StyleSheet,
  Button,
  Text
} from "react-native"
var { 
  Surface, //  一个矩形可渲染的区域，是其他元素的容器
  LinearGradient, // 颜色渐变
} = ART;

import Wedge from '../Wedge/Wedge'
import PropTypes from 'prop-types'

export default class Progress extends PureComponent {

  /*public function*/

  // 设置进度 取值范围 0 - 1
  setProgress = (progress) => {
    if (progress >= 1.0) return
    this.setState({
      progress: progress
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      progress: this.props.currentAngle,
    }
  }
  render() {

    // 渐变色，暂时没有搞懂 "宽" 的原理...😂
    let Perimeter = Math.PI * this.props.radius
    let linearGradient = new LinearGradient({
      '.4': 'purple',
      '.6': 'yellow',
    },
      "0", "0", String(Perimeter) - 80, String(this.props.annularHeight)
    );

    return (
      <View>
        <Surface width={this.props.radius * 2} height={this.props.radius * 2}>
          <Wedge
            outerRadius={this.props.radius}
            innerRadius={this.props.radius - this.props.annularHeight}
            startAngle={this.props.startAngle}
            endAngle={360}
            originX={this.props.radius}
            originY={0}
            fill={this.props.bgColor} />
          <Wedge
            outerRadius={this.props.radius}
            innerRadius={this.props.radius - this.props.annularHeight}
            startAngle={this.props.startAngle}
            endAngle={this.state.progress * 360.0}
            originX={this.props.radius}
            originY={0}
            fill={this.props.selectColor} />
        </Surface>
        <View style={[styles.contentView, {
          width: (this.props.radius - this.props.annularHeight) * 2,
          height: (this.props.radius - this.props.annularHeight) * 2,
          left: this.props.annularHeight,
          top: this.props.annularHeight
        }]}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Progress.publicFunction = {
  setProgress: PropTypes.func, // 设置进度 取值范围 0 - 1
};

Progress.propTypes = {
  radius: PropTypes.number, // 半径
  annularHeight: PropTypes.number, // 内环高度
  startAngle: PropTypes.number, // 开始角度 0 - 1
  currentAngle: PropTypes.number, // 当前角度 0 - 1
  bgColor: PropTypes.string, // 内环背景填充颜色
  selectColor: PropTypes.string, // 内环背景选中填充颜色

};

Progress.defaultProps = {
  radius: 30,
  annularHeight: 1,
  startAngle: 1, // 0 - 1
  currentAngle: 0, // 0 - 1
  bgColor: '#E4E6F3',
  selectColor: '#F5972C'
};