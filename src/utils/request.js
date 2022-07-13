import axios from 'axios'
const requset = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 4000
})
export default requset
