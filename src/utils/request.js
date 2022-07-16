import axios from 'axios'
import store from '@/store'
const requset = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 4000
})
// 请求拦截器
requset.interceptors.request.use(
  // 请求前想做什么
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${store.state.user.token}`
    }
    return config
  },
  // 请求失败的时候，处理的方法
  (error) => {
    return Promise.reject(error)
  }
)
export default requset
