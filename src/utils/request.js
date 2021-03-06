// 请求模板
import axios from 'axios'
import store from '../store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  // 如果用户已登录，统一给接口设置Token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完成之后，一定要把config返回，否则请求就会停在这里
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

// 导出
export default request
