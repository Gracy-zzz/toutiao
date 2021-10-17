// 用户相关的请求模块
import request from '../utils/request'
// import store from '../store/index'

// 登录/注册
// 1.找到数据接口
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送手机验证码
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取登录用户信息
export const getCurrentUser = mobile => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
