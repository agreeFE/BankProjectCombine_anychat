import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'

const Info = (props) => {
  const { fnc } = props
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}> 招商银行已实现网点"全面无卡化"</Text>
        <Text style={styles.mainFont}>
        我们使用两种数据来控制一个组件：props和state。props是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。 对于需要改变的数据，我们需要使用state。

一般来说，你需要在 constructor 中初始化state（译注：这是 ES6 的写法，早期的很多 ES5 的例子使用的是 getInitialState 方法来初始化 state，这一做法会逐渐被淘汰），然后在需要修改时调用setState方法。

假如我们需要制作一段不停闪烁的文字。文字内容本身在组件创建时就已经指定好了，所以文字内容应该是一个prop。而文字的显示或隐藏的状态（快速的显隐切换就产生了闪烁的效果）则是随着时间变化的，因此这一状态应该写到state中。
        </Text>
        <TouchableWithoutFeedback onPress={fnc}>
          <View style={styles.ensure}>
            <Text style={styles.ensureFont}>确认</Text>
          </View>
        </TouchableWithoutFeedback>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    zIndex: 1
  },
  title: {
    height: 30,
    lineHeight: 30,
    textAlign: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  info: {
    // height: 100,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  ensure: {
    marginHorizontal: 10,
    backgroundColor: 'blue',
    height: 40,
    justifyContent:"center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10
  },
  ensureFont: {
    fontSize: 16,
    color: '#fff'
  },
  mainFont: {
    paddingHorizontal: 15,
    paddingTop: 20
  }
})

export default Info