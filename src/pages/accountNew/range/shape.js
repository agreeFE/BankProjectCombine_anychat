import React, { Component } from 'react'

import {
  ART
} from 'react-native'
import PropTypes from 'prop-types'

const {
  Shape,
  Path
} = ART

export default class Wedge extends Component {
  
  constructor(props) {
    super(props)
  }
  render() {
    const { position } = this.props
    const Y = Math.abs(Math.sqrt(Math.pow(50,2) - Math.pow(position-55,2))-55)
    return (
      <Shape d={Path().moveTo(5,55).arcTo(position, Y ,50)} stroke={'#F59253'} strokeWidth={10}></Shape>
    )
  }
}

