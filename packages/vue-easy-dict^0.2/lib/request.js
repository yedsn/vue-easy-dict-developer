import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
    // API 请求的默认前缀
    baseURL: '/',
    timeout: 15000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
    return Promise.reject(error)
  }
// request interceptor
request.interceptors.request.use(config => {
    return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
    const resData = response.data
    return resData
}, errorHandler)

export default request