import { Message } from 'element-ui'

import { getExcelFile } from './request'

/**
 * 获取当前是移动终端浏览器版本信息
 * @returns {*} 返回移动终端浏览器版本信息
 */
export function browser() {
  return {
    versions: (function() {
      var u = navigator.userAgent
      return {
        // 移动终端浏览器版本信息

        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端

        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器

        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器

        iPad: u.indexOf('iPad') > -1 // 是否iPad
      }
    })()
  }
}
/**
 * js精度问题解决方案
 * @export
 * @param {any} f 算数表达式
 * @param {any} digit 保留几位小数
 * @returns 处理后的数据
 */
export function formatFloat(f, digit) {
  digit = digit || 2
  var m = Math.pow(10, digit)
  return (parseFloat(f * m, 10) / m).toFixed(digit)
}

export function beforeUpload(file, obj) {
  /*
   * 参数说明：
   * file：必填 上传文件
   * obj：选填 文件格式要求的配置项目
   * */
  let isOk = false
  let isOverLength = false

  // 是否传递第二个参数
  if (obj === undefined) {
    obj = {}
  }
  // 赋默认值
  var option = {
    fileType: obj.fileType || ['txt', 'doc', 'docx', 'pdf', 'jpg', 'jpeg', 'gif', 'png', 'xlsx', 'xls', 'rar', 'zip', '7z'],
    unit: obj.unit || 'KB',
    min: obj.min || 0,
    max: obj.max || 20480,
    length: obj.length || 0,
    error: obj.error || '请上传小于20MB的TXT/DOC/DOCX/PDF/JPG/JPEG/GIF/PNG/XLSX/XLS/RAR/ZIP/7Z文件',
    lengthError: obj.lengthError || '您上传的文件名过长'
  }

  // 类型对比
  const fileType = file.name.substring(file.name.lastIndexOf('.') + 1)
  for (var i = 0; i < option.fileType.length; i++) {
    if (fileType === option.fileType[i]) {
      isOk = true
    }
  }

  // 大小限制
  let size = 0
  if (option.unit === 'KB') {
    size = file.size / 1024
  } else if (option.unit === 'MB') {
    size = file.size / 1024 / 1024
  }
  if (option.max > 0 && option.min > 0) {
    const isLt = size < option.max
    const isGt = size > option.min
    if (!(isLt && isGt)) {
      isOk = false
    }
  } else if (option.max > 0 && option.min === 0) {
    const isLt = size < option.max
    if (!isLt) {
      isOk = false
    }
  }

  // 文件名长度限制
  if (option.length > 0) {
    const fileNameLength = file.name.length
    if (parseInt(fileNameLength, 10) > parseInt(option.length, 10)) {
      isOverLength = true
    }
  }

  if (!isOk) {
    Message.error(option.error)
  } else if (isOverLength) {
    Message.error(option.lengthError)
  }
  return isOk && !isOverLength
}

/**
 * 将金额转换为1,234,567.89的格式
 * @param {String} value 接受的过滤值
 */
export function ansFormatter(value) {
  if (value === undefined || value === '') {
    return ''
  }
  value = Number(value).toFixed(2)
  if (value !== 'NaN' && value !== '0.00') {
    let temp = value.split('.')[0]
    const pattern = /(?=((?!\b)\d{3})+$)/g
    temp = temp.replace(pattern, ',')
    value = temp + '.' + value.split('.')[1]
  }
  return value
}
export function getCookie(name) {
  // var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  var arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
export function setCookie(name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  // document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path=/`
}

/**
 * 深度拷贝数组
 */
export function copyArr(arr) {
  return arr.map(e => {
    if (typeof e === 'object') {
      return Object.assign({}, e)
    } else {
      return e
    }
  })
}

/**
 * 刷新代办
 */
// export function refreshTodoList() {
//   api.getToDoListCount().then(res => {
//     if (res.status === 200) {
//       const todoListTotal = {}
//       const todoListChild = {}
//       // 取福金的代办总数和代办
//       todoListTotal.HAPPYGOLD = res.data.happyGold.sum
//       todoListChild.HAPPYGOLD = res.data.happyGold.children
//       store.dispatch('getTodoListTotal', todoListTotal)
//       store.dispatch('getTodoListChild', todoListChild)
//     }
//   })
// }

/**
 * 获取定义的环境变量
 * @param {String}} param 变量名
 */
export function getEnvInfo(param) {
  return process.env[param]
}

/**
 * 去除文件后缀名
 */
export function formatName(fullName) {
  const index = fullName.lastIndexOf('.')
  if (index < 0) {
    return fullName
  } else {
    return fullName.substring(0, index)
  }
}

export function formatFileName(url, name) {
  Message.error('改用fileDownload方法')
}

/**
 * 预览文件，使用obs文件存储，接口返回文件流，通过存入cookie的token进行验权
 * @param {String} fileUrl 文件预览接口及参数，如/file/downloadImage?id=103
 * @param {String} fileName 文件预览接口及参数，如1-2应收账款转让申请暨确认书.pdf
 */
export function filePreview(documentId, fileName) {
  // 延时设置document.title，命名新页签
  const newWindow = window.open(
    `${window.location.origin}${process.env.VUE_APP_BASE_API}/clientplatform/file/preview?id=${documentId}`,
    '_blank'
  )
  let countDownTime = 20
  let timerId = setInterval(() => {
    if ((newWindow.document && newWindow.document.title.includes('priview')) || countDownTime <= 0) {
      newWindow.document.title = fileName || '预览'
      clearInterval(timerId)
      timerId = null
    } else {
      countDownTime--
      // hack：十秒内重复设置标题，解决文件过大被downloadImage再次覆盖
      newWindow.document.title = fileName || '预览'
    }
  }, 500)
  // window.open(
  //   `${window.location.origin}${process.env.VUE_APP_BASE_API}/clientplatform/file/downloadImage?id=${documentId}`,
  //   '_blank'
  // )
}

/**
 * 下载文件，使用obs文件存储，接口返回content-type为application/octet-stream
 * @param {String} fileUrl 文件下载接口及参数，如/file/download?id=103
 */
export function fileDownload(documentId) {
  const a = document.createElement('a')
  const $body = document.body
  a.href = `${window.location.origin}${process.env.VUE_APP_BASE_API + '/clientplatform/file/download?id='}${documentId}`
  a.style.display = 'none'
  $body.appendChild(a)
  a.click()
  $body.removeChild(a)
}

export function moduleFileDownload(type) {
  const a = document.createElement('a')
  const $body = document.body
  a.href = `${window.location.origin}${process.env.VUE_APP_BASE_API + '/clientplatform/file/temp/download?type='}${type}`
  a.style.display = 'none'
  $body.appendChild(a)
  a.click()
  $body.removeChild(a)
}

export function exportExcelNew(relativePath, param) {
  const a = document.createElement('a')
  const $body = document.body
  a.href = `${window.location.origin}${process.env.VUE_APP_BASE_API}${relativePath + '?'}${param}`
  a.style.display = 'none'
  $body.appendChild(a)
  a.click()
  $body.removeChild(a)
}

export function exportReceivableExcel(param) {
  exportExcelNew('/clientplatform/accountPayable/exportAccount', param)
}

export function exportTradeExcel(param) {
  exportExcelNew('/clientplatform/accountPayable/exportTrade', param)
}
export function exportFTradeExcel(param) {
  exportExcelNew('/clientplatform/accountPayable/financierExportTrade', param)
}
export function exportFRExcel(param) {
  exportExcelNew('/clientplatform/accountPayable/financierExportAccount', param)
}

export function exportInvoiceStatistics(param) {
  exportExcelNew('/clientplatform/hgInvoice/invoiceDerive', param)
}
/**
 * 导出excel文件
 * @param {String} url 接口地址
 * @param {*} fileName 下载的文件名称，不带格式
 */
// export function exportExcel(url, fileName) {
//   getFile(url).then(data => {
//     if (toString.call(data) === '[object ArrayBuffer]') {
//       const blob = new Blob([data], {
//         type: data.type
//       })
//       const dom = document.createElement('a')
//       dom.download = `${fileName}.xls`
//       dom.style.display = 'none'
//       dom.href = URL.createObjectURL(blob)
//       document.body.appendChild(dom)
//       dom.click()
//       document.body.removeChild(dom)
//     } else if (toString.call(data) === '[object Object]') {
//       Message.error(data.message || '文件下载失败')
//     } else {
//       Message.error('文件下载服务处理异常')
//     }
//   })
// }

/**
 * 导出excel文件
 * @param {String} url 接口地址
 * @param {*} fileName 下载的文件名称，不带格式
 * 异常情况待验证
 */
export function exportExcel(url, params, fileName) {
  getExcelFile(url, params)
    .then(data => {
      if (toString.call(data) === '[object ArrayBuffer]') {
        const blob = new Blob([data], {
          type: data.type
        })
        const dom = document.createElement('a')
        dom.download = `${fileName}.xls`
        dom.style.display = 'none'
        dom.href = URL.createObjectURL(blob)
        document.body.appendChild(dom)
        dom.click()
        document.body.removeChild(dom)
      } else if (toString.call(data) === '[object Object]') {
        Message.error(data.message || '文件导出失败')
      } else {
        Message.error('文件导出失败')
      }
    })
    .catch(() => {
      Message.error('文件服务异常，请稍后再试')
    })
}

/**
 * 通过a标签在浏览器的点击事件直接下载文件
 * @param {string} url 文件路径
 */
export function downloadFileByUrl(url, fileName, type) {
  const dom = document.createElement('a')
  dom.style.display = 'none'
  if (fileName) dom.download = fileName
  if (type === 'img') {
    // 图片下载
    dom.href = url
  } else {
    // 文件模板下载
    dom.href = url + decodeURIComponent(fileName)
  }
  document.body.appendChild(dom)
  dom.click()
  document.body.removeChild(dom)
}

/**
 * 将url和params拼成长串URL
 * @param {String} url 请求url字符串
 * @param {Object} params 入参
 * @return {String} 拼接后的URL：xxxx?xx=xxx&xxx=xxxx
 */
export function combineUrlParam(url, params) {
  if (toString.call(url) === '[object String]' && toString.call(params) === '[object Object]') {
    url += '?'
    Object.keys(params).forEach(key => {
      if (params[key]) {
        url += `${key}=${params[key]}&`
      }
    })
    return url.substring(0, url.length - 1)
  } else {
    return ''
  }
}

/**
 * 根据文件名截取后缀 eg: .zip
 * @param file {String} 文件名
 * @returns pos {String} 后缀
 */
export function GetFileExt(file) {
  if (file !== '') {
    return '.' + file.replace(/.+\./, '')
  }
}
/**
 * 文件大小单位换算
 * @param bytes 原文件大小,单位byte
 * @returns 换算后的大小单位
 */
export function BytesToSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1000 // or 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
/**
 * 判断文件是否是图片或PDF
 */
export function isImgOrPdf(filePath) {
  if (!filePath) {
    return false
  }
  // 获取最后一个.的位置
  var index = filePath.lastIndexOf('.')
  // 获取后缀
  var ext = filePath.substr(index + 1)
  return ['png', 'jpg', 'jpeg', 'gif', 'tif', 'pdf'].indexOf(ext.toLowerCase()) !== -1
}
/**
 * 判断文件是否是图片，本项目文件路径带有参数，不取最后的后缀。
 */
export function isImg(filePath) {
  if (!filePath) {
    return false
  }
  return (
    filePath.includes('.png') ||
    filePath.includes('.jpg') ||
    filePath.includes('.jpeg') ||
    filePath.includes('.gif') ||
    filePath.includes('.tif')
  )
  // // 获取最后一个.的位置
  // var index = filePath.lastIndexOf('.')
  // // 获取后缀
  // var ext = filePath.substr(index + 1)
  // return ['png', 'jpg', 'jpeg', 'gif', 'tif'].includes(ext.toLowerCase())
}

export function timeSafe(startTime, endTime) {
  if (startTime && endTime) {
    return new Date(startTime).getTime() <= new Date(endTime).getTime()
  } else {
    return true
  }
}

/**
 * @param {Object} props
 * @description 针对搜索值做统一处理
 */
export function convertParams(props) {
  const newParams = {}
  Object.keys(props).map(key => {
    const item = props[key]
    const type = typeof item
    if (item || item === false || item === 0) {
      if (item && type === 'string') {
        newParams[key] = item.trim()
      } else {
        newParams[key] = item
      }
    }
    return false
  })
  return newParams
}

// 排序 从大到小 003 002 001
export function sortFnLargeToSmall(name) {
  return function(o1, o2) {
    var value1 = o1[name]
    var value2 = o2[name]
    if (value1 < value2) {
      return 1
    } else if (value1 > value2) {
      return -1
    } else {
      return 0
    }
  }
}
// 排序 从小到大 001 002 003
export function sortFnSmallToLarge(name) {
  return function(o1, o2) {
    var value1 = o1[name]
    var value2 = o2[name]
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}

// 金额转化万  let data = moneyConvert(100000)  data.num data.unit
export function moneyConvert(num) {
  var moneyUnits = ['元', '万元', '亿元', '万亿']
  var dividend = 10000
  var curentNum = num
  // 转换数字
  var curentUnit = moneyUnits[0]
  // 转换单位
  for (var i = 0; i < 4; i++) {
    curentUnit = moneyUnits[i]
    if (strNumSize(curentNum) < 5) {
      break
    }
    curentNum = curentNum / dividend
  }
  var m = { num: 0, unit: '' }
  m.num = curentNum.toFixed(2)
  m.unit = curentUnit
  m.convert = m.num + m.unit
  return m
}
export function strNumSize(tempNum) {
  var stringNum = tempNum.toString()
  var index = stringNum.indexOf('.')
  var newNum = stringNum
  if (index !== -1) {
    newNum = stringNum.substring(0, index)
  }
  return newNum.length
}
