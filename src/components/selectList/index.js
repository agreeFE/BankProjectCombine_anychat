// 答题选中

import React, { Component,  } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'


export default class Confirm extends Component {
  constructor(props) {
    
    super(props)
    this.state = {
        selectIndex:'',//选中项
        options:this.props.options,//可选内容
    }
    console.log(this.state)
  }
  render() {
    return (
        <View>
            <Text style={styles.Title}>{this.state.options.title}</Text>
            {this.props.options.data.map((tab, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        activeOpacity={0.8}
                        onPress={() => {
                            this.setState({
                                selectIndex:i
                            })
                            this.props.checked(i);
                        }}>
                        {/* 剩下的遍历出来 */}
                        <View style={{width:"100%",height:40,borderRadius:20,marginBottom:5}}>
                            <Text style={[ this.state.selectIndex === i ? styles.show : styles.unShow,{textAlign:"center",lineHeight:40,width:"100%",height:40,borderRadius:20}]}>{this.state.options.data[i].id} {this.state.options.data[i].data}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
  }

}

const styles = StyleSheet.create({
    Title:{
        marginBottom:20
    },
    unShow:{
        // backgroundColor:"#FFFFFF",
    },
    show:{
        color:"#fff",
        backgroundColor:"#3D4B8C",
    }

})
