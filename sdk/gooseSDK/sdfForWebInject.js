
import GooseSDKSource from './index'
const sdkObj = GooseSDKSource;
var sdkStringItem = '';

for(let key in sdkObj){
    // console.warn(key + '-' + sdkObj[key])
    if(typeof sdkObj[key] === "function"){
        sdkStringItem += key + `: function(data, success, failure) {
            // 定义时间戳
            var timestamp = Date.parse(new Date());
            if (success) {
            GooseSDK.results['${key}Success'+timestamp] = success
            }
    
            if (failure) {
            GooseSDK.results['${key}Failure'+timestamp] = failure
            }
            var submitdata = { type: '${key}', data: data, timestamp:timestamp}
            window.ReactNativeWebView.postMessage(JSON.stringify(submitdata))
        },`
        
    }
}

let allStringForWeb = 
    `window.GooseSDK = {
        version: '${sdkObj.version}',`+sdkStringItem +`
            results: {}
          };
        
          // SDK注入完成，派发事件监听
          var SDKReadyEvent = new CustomEvent('GooseSDKReady', {
            detail: 'GooseSDKReady'
          })
        
          if (window.dispatchEvent) {
            window.dispatchEvent(SDKReadyEvent)
          } else {
            window.fireEvent(SDKReadyEvent)
          }
        
        `

module.exports = allStringForWeb
