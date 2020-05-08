import axios from 'axios'
// import router from '../router'
import { Message, Notification } from 'element-ui'
import router from '../router'
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作
 */
axios.interceptors.request.use(config => {
  // return config
  if (window.localStorage.getItem('token')) {
    if (config.url !== '/upload') {
      config.headers.Authorization = window.localStorage.getItem('token')
    }
  } else {
    // router.replace('/login')
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 请求响应拦截
 * 用于处理需要在请求返回后的操作
 */
axios.interceptors.response.use(response => {
  if (response.data.status === -1) {
    switch (response.data.message) {
      case 'unLogin':
        Message.warning('登录过期')
        router.push('/login')
        break
      default:
        Notification['error']({
          title: '失败',
          message: response.data.message
        })
    }
    return response.data
  }
  return response.data
}, error => {
  if (error.response.status === 404) {
    Message.warning('请求接口不存在')
  } else if (error.response.status === 403) {
    // router.replace('/login')
    window.localStorage.removeItem('token')
    return
  } else if (error.response.status === 500) {
    Message.warning('内部服务器出错')
  }
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.Message.includes('timeout')) {
      Message.error('请求超时，请检查网络是否连接正常')
    } else {
      Message.error('请求失败，请检查网络是否已连接')
    }
    return
  }
  return Promise.reject(error)
})

export function handleService (url, data, method = 'GET') {
  method = method.toUpperCase()
  if (method === 'GET') {
    if (data) {
      // 没有值的参数不传
      Object.keys(data).forEach(key => {
        if (data[key] === '') {
          data[key] = undefined
        }
      })
    }
    return axios({
      url: url,
      params: data,
      method: method
    })
  } else if (method === 'GPOST') {
    return axios({
      url: url,
      params: data,
      method: 'post'
    })
  } else {
    return axios({
      url: url,
      data: data,
      method: method
    })
  }
}
