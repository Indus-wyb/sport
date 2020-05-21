import HttpClient from '@winning-plugin/win-6.0-httpclient'
import { Message } from 'element-ui'

// 返回axios实例
const httpClient = new HttpClient({
  failAuth: () => {
    location.href = '/portal/login'
  },
  errorHandle: (msg) => {
    Message.error(msg)
  }
}).request()


export default httpClient
