// 格式化时间插件
import dayjs from 'dayjs'
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文
// console.log(dayjs().format('YYYY/MM/DD  HH:MM:ss'))

export default dayjs
