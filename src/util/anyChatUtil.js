// 运行环境: dev-开发，直连挡板; prd-实际运行
const env = "dev";

import '@/window'


// 引入axios
import axios from 'axios';

// const dev_Path = "http://123.103.88.18:53067/default/mobilebank-gateway/mbankgw";

function AnynetworkService(url, data, response, err) {
  $Toast.loading('Loading...')
  console.warn('当前使用dev环境，暂时不支持切换到PRD环境');
  console.warn('请求地址: ',  url)

  const requestConfig = {
    // url: dev_Path+url,// 请求URL
    url: url,// 请求URL
    method: 'post',
    withCredentials: false,// 跨域请求时是否需要凭证
    timeout: 60000,// 超时时间，单位毫秒
    responseType: 'json',// 服务器响应的数据类型
    responseEncoding: 'utf8'// 响应报文的编码方式
  }

  if (data) {
    const reqData = data;
    console.warn("请求内容: ", reqData);
    requestConfig.data = reqData;
  }

  axios(requestConfig).then(respdata => {
    $Toast.hide();
    response(respdata)
    console.warn('respdata++++++++'+ JSON.stringify(respdata))
  }).catch(error => {
    $Toast.hide();
    $Toast.info('通信异常')
    if (err) {
      err(error)
    }
  })
}



module.exports = {
  AnynetworkService
}