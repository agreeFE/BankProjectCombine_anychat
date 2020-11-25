import React, {Component} from 'react';
import {View,ART,Dimensions} from 'react-native';

export default class HcdWaveView extends Component {
  static defaultProps = {
    surfaceWidth: Dimensions.get('window').width,
    surfaceHeight: 320,
  }

  constructor(props) {
    super(props);
    this.surfaceWidth = this.props.surfaceWidth;
    this.surfaceHeight = this.props.surfaceHeight;
    this.state = {
      a: 1.5,
      b: 1,
      increase: true,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      a:nextProps.SpeechRecognitionvolume*0.2
    }
  }

  componentDidMount() {
    this.intervalTimer = setInterval(() => {
      var a = this.state.a
      var b = this.state.b
      var increase = this.state.increase
      if (increase) {
        a += 0.06
      } else {
        a -= 0.03
      }
      if (a <= -4) {
        increase = true
      }
      if (a >= 4) {
        increase = false
      }
      b += 0.05
      this.setState({
        b: b,
        increase: increase
      })
    }) 
  }

  componentWillUnmount() {
    this.intervalTimer && clearInterval(this.intervalTimer)
  }
  
//绘制渐变的背景
  artBg() {
    const w = this.props.surfaceWidth
    const h = this.props.surfaceHeight
    const pathBase = new ART.Path()
    .moveTo(0,0) // 改变起点为 0,5 。默认为0,0
    .lineTo(w,0) // 目标点
    .lineTo(w,h) // 目标点
    .lineTo(0,h) // 目标点
    
    let colors = [ "#0063cd", "#00a7f4" ];
    let linearGradient = new ART.LinearGradient(colors, 0, 0, 90, 280);

    return (<View style={{ backgroundColor: 'rgba(0,0,0,0.0)' }}>
      <ART.Surface width={this.surfaceWidth} height={this.surfaceHeight} >
        {/* <ART.Shape d={pathBase} fill={linearGradient}/> */}
        <ART.Shape d={pathBase}/>
        {this.wave(170, '#F139F6')}
        {this.wave1(100, '#0063cd')}
        {this.wave2(30, '#00a7f4')}
      </ART.Surface>
    </View>)
  }

  // 正弦曲线公式： y = A sin(Bx + C) + D
  // A 控制振幅，A 值越大，波峰和波谷越大，A 值越小，波峰和波谷越小；
  // B 值会影响周期，B 值越大，那么周期越短，B 值越小，周期越长。
  // C 值会影响图像左右移动，C 值为正数，图像右移，C 值为负数，图像左移。
  // D 值控制上下移动。

//绘制波浪
  wave(startY, fl){
    const a = this.state.a
    const b = this.state.b
    const w = this.props.surfaceWidth
    const h = this.props.surfaceHeight
    const pathBase = new ART.Path()
    pathBase.moveTo(0,startY) // 改变起点为 0,5 。默认为0,0
    for( var i = 0; i <= w / 68; i += 0.1 ){
      var x = i * 70;
      var y = a * Math.cos( i + b ) * 10 +150;
      // console.log(x,y)
      pathBase.lineTo( x, y );
    }
    // pathBase.lineTo(w,h) // 目标点
    // pathBase.lineTo(0, h);
    return <ART.Shape d={pathBase} strokeWidth={2} stroke={fl}/>
  }

  wave1(startY, fl){
    const a = this.state.a
    const b = this.state.b
    const w = this.props.surfaceWidth
    const h = this.props.surfaceHeight
    const pathBase = new ART.Path()
    pathBase.moveTo(0,startY) // 改变起点为 0,5 。默认为0,0
    for( var i = 0; i <= w/68; i += 0.1 ){
      var x = i * 70;
      var y = a * Math.sin( i + b ) * 10 + 150;
      pathBase.lineTo( x, y );
    }
    // pathBase.lineTo(w,h) // 目标点
    // pathBase.lineTo(0, h);
    return <ART.Shape d={pathBase} strokeWidth={2} stroke={fl}/>
  }
  wave2(startY, fl){
    const a = this.state.a
    const b = this.state.b
    const w = this.props.surfaceWidth
    const h = this.props.surfaceHeight
    const pathBase = new ART.Path()
    pathBase.moveTo(0,startY) // 改变起点为 0,5 。默认为0,0
    for( var i = 0; i <= w/98; i += 0.1 ){
      var x = i * 100;
      var y = a * Math.sin( i + b ) * 10 + 150;
      pathBase.lineTo( x, y );
    }
    // pathBase.lineTo(w,h) // 目标点
    // pathBase.lineTo(0, h);
    return <ART.Shape d={pathBase} strokeWidth={2} stroke={fl}/>
  }

  render() {
    return (
      <View style={{ width: this.props.surfaceWidth, height: this.props.surfaceHeight, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.0)', }}>
        {this.artBg()}
      </View>
    )
  }
}