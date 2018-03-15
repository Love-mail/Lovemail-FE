import axios from 'axios'

const baseURL = 'https://api.lovemail.site/v1'

const instance = axios.create({
  timeout: 5000,
  baseURL
})

instance.interceptors.request.use(
  config => {
    console.log(config.url)
    // const token = window.sessionStorage.getItem('token')

    // if (
    //   config.url !== '/user/loin'
    //   || config.url !== '/user/register'
    // ) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    config.headers.Authorization = `Bearer huajinbo`
    console.log('sdfsdfsdffds')
    return config
  },

  err => {
    throw new Error('发起请求出错')
  }
)

export default instance