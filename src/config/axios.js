import axios from 'axios'

import { getCookie } from "../config/token"
import history from "../config/history"

const instance = axios.create({
  timeout: 5000,
  baseURL: 'https://api.lovemail.site/v1'
})
instance.interceptors.request.use(
  req => {
    const token = getCookie('token')
    // 公共请求API,请求头不带有Authorization
    const publicUrl = ["/signup", "/signin", "/email/validate", "/user/reset", "/temp/all" ]
    const url = req.url
    // 其他需要Authorization的请求
    if (publicUrl.indexOf(url) === -1) {
      req.headers.Authorization = token
      if (!token){
        history.push('/login') // 当cookie中存储的token过期后自动跳转到登录页
      }
    }
    return req
  },
  err => {
    throw new Error('发起请求出错')
  }
)

instance.interceptors.response.use(
  res => {
    return res
  },
  err => {
    // 本地环境错误
    if (err.message === "Network Error") {
      throw new Error( '网络出错，请稍后再试！')
    } else if (err.message.indexOf('time')!==-1) {
      throw new Error( '请求超时，请稍后再试！')
    } else if (err.response.status===401) {
      history.push('/login') // 当cookie中存储的token过期后自动跳转到登录页
    } else if (err.response.status===500) {
      throw new Error( '服务器出错！')
    } else {
      throw err   // 非本地环境错误
    }
  }
)

export default instance