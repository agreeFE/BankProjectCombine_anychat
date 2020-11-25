# 关于第三方插件

## 科大讯飞插件：

> 将/node_modules/react-native-speech-iflytek/android删除  
> 将/backup/react-native-speech-iflytek/android目录，替换到/node_modules/react-native-speech-iflytek/android  

## echarts插件：

> 将/backup/native-echarts目录，替换到/node_modules/native-echarts  

# 自定义组件API

## 签名版Signature

### 入参

| 参数名 | 类型 | 是否可以为空 | 默认值 | 含义 |
| --- | --- | --- | --- | --- |
| cancelText | String | √ | "取消" | 取消按钮的文本 |
| cancelStyle | String | √ | "" | 取消按钮的样式 |
| resignText | String | √ | "重签" | 重签按钮文本 |
| resignStyle | String | √ | "" | 重签按钮样式 |
| confirmText | String | √ | "确定" | 确定按钮文本 |
| confirmStyle | String | √ | "" | 确定按钮样式 |
| pictureType | String | √ | "PNG" | 图片格式，可选值：PNG/SVG/JPG，大小写均可 |

### 事件
| 事件名称 | 处理函数入参的属性 |
| --- | --- |
| onCancel | 无 |
| onConfirm | type: 图片格式，可选值PNG/SVG/JPG<br />signature：签名图片的base64字符串<br />data：签名的轨迹数据 |
