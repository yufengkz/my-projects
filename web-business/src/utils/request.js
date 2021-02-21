import axios from 'axios'
import { getToken } from '@/utils/auth'
import { Loading, Message } from 'element-ui'
import store from '../store'
import router from '../router'
let loadingRequestCount = 0 // 初始化请求loading数
let loadingInstance // loading实例
const reqQueue = [] // 当前执行中的http请求队列，存放的是每个请求的key
const requestWhiteList = [
  '/clientplatform/accountPayable/batch/preparation', // 批量签章准备接口
  '/clientplatform/accountPayable/flow' // 业务流程流转接口
]
// const loadingWhiteList = [
//   '/clientplatform/file/downloadImgByUrl'
// ]
/**
 * request发起时的处理：加入请求队列或取消该请求。此时的取消是指请求未发送。
 * @param {Object} config request的配置信息
 * @param {Function} cancel axios封装的该请求的cancel方法
 */
const reqCancel = (config, cancel) => {
  if (!cancel) return false
  // 请求的关键字为url和method的拼接
  // 由于baseURL的存在，req和res的url存在差异。故request中加入baseURL
  const requestKey = `${config.url}&${config.method}`

  // 判断是否已经存在于请求队列中
  if (reqQueue.includes(requestKey)) {
    cancel(`接口${config.url}重复调用，已取消`) // 若该请求已在队列中存在且尚未返回，取消该请求
  } else {
    reqQueue.push(requestKey) // 若该请求为新的请求，将其放入请求队列中
  }
}
/**
 * response时的处理：从请求队列中将其移除
 * @param {Object} config response的信息
 */
const resCancel = config => {
  const responseKey = `${config.url}&${config.method}`
  // 若该请求已返回且存在于队列中，则从请求队列中删除
  if (reqQueue.includes(responseKey)) {
    reqQueue.splice(reqQueue.indexOf(responseKey), 1)
  }
}
// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 云上开发服务的数据
  timeout: 30000, // 请求超时时间
  headers: {
    'If-Modified-Since': 0, // 协商缓存=>不使用缓存
    'Cache-Control': 'no-store' // http请求不存储（解决IE缓存问题）
  }
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 对白名单中的接口拦截添加例外
    const inWhiteList = requestWhiteList.every(value => config.url.includes(value))
    // 福金项目只对特定的接口请求做去重拦截：post请求且在requestWhiteList中
    if (config.method === 'post' && inWhiteList) {
      config.cancelToken = new axios.CancelToken(c => {
        reqCancel(config, c)
      })
    }
    // console.log(loadingRequestCount, 'loadingRequestCount')
    if (loadingRequestCount === 0) {
      // 添加全局loading
      loadingInstance = Loading.service({
        lock: false,
        text: '加载中，请稍候'
        // background: 'rgba(0, 0, 0, 0.8)'
      })
    }
    // 调接口时禁用键盘空格键和enter,防止多次调接口
    window.onkeydown = function(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        if (event.stopPropagation) {
          // 针对 Mozilla 和 Opera
          event.stopPropagation()
        } else if (window.event) {
          // 针对 IE
          window.event.cancelBubble = true
        }
        return false
      }
    }
    if (!config.url.includes('/clientplatform/file/downloadImgByUrl')) {
      // 获取图片base64接口不加遮罩层
      loadingRequestCount++ // loading请求数加1
    }
    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    loadingInstance.close()
    window.onkeydown = null
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // response时将其从请求队列中移除
    if (response.config.method === 'post') {
      resCancel(response.config)
    }

    if (response.data.status === 401) {
      store.dispatch('LogOut').then(() => {
        router.push({ path: '/login' })
      })
    }
    // 请求返回时loadingCount值减1，值为0时，即请求均已返回，关闭loading。获取图片base64接口不加遮罩层
    if (loadingRequestCount > 0 && response && !response.config.url.includes('/clientplatform/file/downloadImgByUrl')) {
      loadingRequestCount--
    }
    if (loadingRequestCount === 0) {
      loadingInstance.close()
      window.onkeydown = null
    }
    return response.data
  },
  error => {
    loadingInstance.close()
    window.onkeydown = null
    // 以下情况拿到的error有response属性

    if (error && error.response) {
      if (error.response.status === 400) {
        Message.error(error.response.data && error.response.data.message)
        return new Promise(() => {})
      } else if (error.response.status > 400 && error.response.status < 500) {
        Message.error('请求出错,请检查参数并重试')
        return new Promise(() => {})
      } else if (error.response.status >= 500) {
        Message.error('服务出错,请稍后再试')
        return new Promise(() => {})
      }
    }
    // 以下情况拿到的error无response属性
    if (error && error.message && error.message.includes('timeout')) {
      Message.error('请求超时,请稍后重试')
      return new Promise(() => {})
    } else if (error && error.message && error.message.includes('Network Error')) {
      Message.error('网络错误,请检查')
      return new Promise(() => {})
    }

    // 错误返回时清除该条拦截
    if (error && error.config && error.config.method === 'post') {
      resCancel(error.config)
    }
    // 如果是触发cancelToken取消了请求，也需要对loading计数器做减一操作
    if (error && error.message && error.message.includes('重复调用，已取消')) {
      loadingRequestCount--
    }
    return Promise.reject(error)
  }
)

/**
 * GET请求，调用方法: import后直接使用，如 get('url', {id: xx, ...})
 * @param {String} url 接口URL，如'/factor/allinvoice'
 * @param {Object} params get请求传参
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params
      })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * POST请求，调用方法: import后直接使用，如 post('url', {id: xx, form: xxx, ...})
 * @param {String} url 接口URL，如'/factor/updatebillInfo'
 * @param {Object} params post请求传参
 */
export function post(url, params, config) {
  return new Promise((resolve, reject) => {
    service
      .post(url, params, config)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * PUT请求，调用方法: import后直接使用，如 put('url', {id: xx, form: xxx, ...})
 * @param {String} url 接口URL
 * @param {Object} params PUT请求传参
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    service
      .put(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * DELETE请求，调用方法: import后直接使用，如 Delete('url', {id: xx, form: xxx, ...})
 * @param {String} url 接口URL
 * @param {Object} params Delete请求传参
 */
export function Delete(url, params) {
  return new Promise((resolve, reject) => {
    service
      .delete(url, params)
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * GET请求，用于下载文件时使用。解决下载文件名与显示不同的问题
 * @param {String} url 接口URL
 * @param {Object} params 请求传参
 * @param {String} type responseType
 */
export function getFile(url, params, type) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
        responseType: type
      })
      .then(
        response => {
          resolve(response)
        },
        err => {
          reject(err)
        }
      )
      .catch(error => {
        reject(error)
      })
  })
}

/**
 * 导出excel请求
 * @param {String} url 接口URL
 * @param {Object} params 请求传参
 * @param {String} type responseType
 */
export function getExcelFile(url, params, type = 'arraybuffer') {
  return new Promise((resolve, reject) => {
    service
      .get(
        url,
        { params },
        {
          responseType: type
        }
      )
      .then(
        response => {
          resolve(response)
          // if (response.status === 200) {
          //   // 如果返回类型是json，代表出现异常。将blob对象转成json对象
          //   if (response.headers['content-type'].includes('application/json')) {
          //     const decoder = new TextDecoder('utf-8')
          //     const resJson = JSON.parse(decoder.decode(new Uint8Array(response.data))) // 转化成json对象
          //     resolve(resJson)
          //   } else {
          //     resolve(response.data)
          //   }
          // } else {
          //   Message.error(response.message || '文件下载服务异常，请联系客服')
          // }
        },
        err => {
          console.log(err)
          reject(err)
        }
      )
      .catch(error => {
        console.log('error:' + error)
        reject(error)
      })
  })
}
