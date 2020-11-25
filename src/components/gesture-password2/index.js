import React, { Component, } from 'react'
import { StyleSheet,Text, View, PixelRatio, Dimensions, PanResponder } from 'react-native'
import PropTypes from 'prop-types'
import * as Utils from './Utils.js'
const {width: deviceWidth, height: deviceHeight} = Dimensions.get('window')

module.exports = class GestureArea extends Component {

  static defaultProps = {
    lineWidth: 2,
    gestureAreaLength: 300,
    lineColor: '#A9A9A9',
    activeColor: '#00AAEF',
    showTrack: true,
    itemLength: 60
  }

  static propTypes = {
      lineWidth: PropTypes.number,
      gestureAreaLength: PropTypes.number,
      lineColor: PropTypes.string,
      activeColor: PropTypes.string,
      onStart: PropTypes.func,
      onReset: PropTypes.func,
      onFinish: PropTypes.func,
      itemLength: PropTypes.number,
      showTrack: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      points: [],
      lines: [],
    }
    this._pointRadius = this.props.itemLength /2
    this._gestureAreaLeft = 0
    this._gestureAreaTop = 0
    this._currentPoint = null
    this._currentLine = null
    this._timer = null
    this._sequence = []
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onTouchStart,
      onPanResponderMove: this._onTouchMove,
      onPanResponderRelease: this._onTouchEnd,
    })
  }

  render() {
    const { gestureAreaLength } = this.props
    return (
      <View
        style={{overflow: 'hidden', width: gestureAreaLength, backgroundColor: '#fff', height: gestureAreaLength, marginHorizontal: (deviceWidth - gestureAreaLength)/2,}}
        {...this._panResponder.panHandlers}
        // onLayout={this._onLayout}
        ref={(view) => this.myView = view}
      >
        {this._renderPoint()}
        {this._renderLine()}
      </View>
    )
  }
  componentDidMount() {
    setTimeout(() => {
      this.myView.measure((x,y,widht,height,left,top) => {
        this._gestureAreaLeft = left
        this._gestureAreaTop = top
        this._initializePoints()
      })
    }, 0);
  }

  // _onLayout = (e) => {
  //   console.log('tag', e.nativeEvent)
  //   this._gestureAreaLeft = e.nativeEvent.layout.x
  //   this._gestureAreaTop = e.nativeEvent.layout.y
  //   this._initializePoints()
  // }
  _initializePoints = () => {
    const { gestureAreaLength } = this.props
    if(this.state.points.length) return
    let points = []
    for(let i = 0; i < 9; i++) {
      let left =  ((gestureAreaLength/3) - 60)/2 + (gestureAreaLength/3) * (i % 3),
          top= ((gestureAreaLength/3) - 60)/2 + (gestureAreaLength/3) * parseInt(i / 3)
      points.push({
        index: i,
        position: {
          left,
          top,
        },
        origin: {
          x: left + 30,
          y: top + 30
        },
        isActive: false
      })
      this.setState({points})
    }
  }

  _renderPoint = () => {
    const { showTrack } = this.props
    const { points } = this.state
    return points.map((item,index) => {
      let conColor = showTrack ? item.isActive ? "rgba(0,170,239,0.2)" : 'transparent' : 'transparent'
      let itemColor = showTrack ? item.isActive ? "rgba(0,170,239,1)" : '#A9A9A9' : '#A9A9A9'
      return (<View
              key={index}
              style={[styles.container, 
                {left: item.position.left, top: item.position.top, backgroundColor: conColor }]}>
              <View style={[styles.item, {backgroundColor: itemColor}]}></View>
            </View>)
    }) 
  }

  _renderLine = () => {
    return this.state.lines.map((line, index) => {
      let start = {
        x: line.start.x,
        y: line.start.y,
      },
      end = {
        x: line.end.x,
        y: line.end.y,
      }
      let transform = Utils.getLineTransform(start, end)
      let color = this.props.showTrack ? '#00AAEF' : 'transparent'
      return (<View
                key={'line' + index}
                style={{
                  position: 'absolute',
                  backgroundColor: color,
                  width: transform.distance,
                  height: this.props.lineWidth,
                  left: start.x,
                  top: start.y - this.props.lineWidth / 2,
                  transform: [{translateX: transform.translateX},
                      {translateY: transform.translateY},
                      {rotateZ: transform.rotateRad + 'rad'}]
                }}/>
      )
    })
  }
  _reset = () => {
    let points = this.state.points.map((point, index) => {
        point.isActive = false
        return point
    })
    this.setState({
        points: points,
        lines: [],
    })

    this._sequence = []
    this._currentPoint = null
    this._currentLine = null

    if (this.props.onReset) {
        this.props.onReset()
    }
  }
  _getTouchPoint = (location) => {
    for (let point of this.state.points) {
        if (Utils.isPointInPath(location, point.origin, this._pointRadius)) {
            return point
        }
    }
    return null
  }
  _addSequence = (index) => {
    //if (~this._sequence.findIndex((item) => item === index)) {
    if (this._sequence.includes(index)) {
        return
    }
    this._sequence.push(index)
  }
  _setToActive = (point) => {
    point.isActive = true
    this.setState({
        points: this.state.points,
    })
  }

  _addLine = (line) => {
    this.state.lines.push(line)
    let lines = this.state.lines
    this.setState({
        lines
    })
  }

  _updateLine = (start, end) => {
      this._currentLine.start = start
      this._currentLine.end = end

      let lines = this.state.lines
      this.setState({
          lines
      })
  }

  _onTouchStart = (evt, gestureState) => {
    if (this.props.onStart) {
      this.props.onStart()
    }
    this._reset()
    let location = {
        x: gestureState.x0 - this._gestureAreaLeft,
        y: gestureState.y0 - this._gestureAreaTop,
    }
    let point = this._getTouchPoint(location)
    if (point == null) {
        return
    }

    this._addSequence(point.index)
    this._setToActive(point)
    this._currentPoint = point
  }
  _onTouchMove = (evt, gestureState) => {
    let location = {
      x: gestureState.moveX - this._gestureAreaLeft,
      y: gestureState.moveY - this._gestureAreaTop,
    }
    let point = this._getTouchPoint(location)
    if (point == null) {
        if (this._currentLine == null) {
            return
        }
        this._updateLine(this._currentPoint.origin, location)
    }
    else {
        if (this._currentLine == null) {
          let line = {
              start: point.origin,
              end: location,
          }
          this._addLine(line)
          this._currentLine = line

          if (this._currentPoint != null) {
              return
          }
          this._addSequence(point.index)
          this._setToActive(point)
          this._currentPoint = point
        }
        else {
            if (point === this._currentPoint) {
                this._updateLine(point.origin, location)
                return
            }

            if (this._sequence.includes(point.index)) {
                this._updateLine(this._currentPoint.origin, location)
                return
            }

            if (!this.props.allowCross) {
                let crossPoint = Utils.getCrossPoint(this.state.points, this._currentPoint, point, this._pointRadius)
                if (crossPoint != null) {
                    this._addSequence(crossPoint.index)
                    this._setToActive(crossPoint)
                }
            }
            this._updateLine(this._currentPoint.origin, point.origin)
            let line = {
                start: point.origin,
                end: location,
                // color: this.props.lineColor || this.props.activeColor,
            }
            this._addLine(line)
            this._currentLine = line

            this._addSequence(point.index)
            this._setToActive(point)
            this._currentPoint = point
        }
    }
  }
  _onTouchEnd = (evt, gestureState) => {
    if (this._sequence.length == 0) {
      return
    }
    let points = this.state.points
    let lines = this.state.lines
    lines.pop()

    this.setState({
        lines,
        points,
    })

    let password = Utils.getPassword(this._sequence)
    if (this.props.onFinish) {
        this.props.onFinish(password)
        this._reset()
    }
    this._reset()
  }

}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    // backgroundColor: 'rgba(0,170,239,0.2)',
    backgroundColor: 'transparent',
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 30,
  },
  item: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#A9A9A9',
    // backgroundColor: "rgba(0,170,239,1)",
    opacity: 0.7
  }
})