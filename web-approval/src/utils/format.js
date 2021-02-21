// 格式化函数集合
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time, 10) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || '0'
  })
}

// 格式化函数集合
export function splitTime(time, splitText) {
  if (time === null || time === undefined || time === '') {
    return ''
  }
  return time.split(splitText)
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - (+d)) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
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

// val:原始值  float 是否保留小数 value 保留几位小数
export function handelDigital(val, float, value) {
  val = String(val)
  // modifiers为修饰符对象，传入了float，则其float属性为true
  if (float) {
    // 清除"数字"和"."以外的字符
    val = val.replace(/[^\d.]/g, '')
    // 只保留第一个, 清除多余的
    val = val.replace(/\.{2,}/g, '.')
    // 第一个字符如果是.号，则补充前缀0
    val = val.replace(/^\./g, '0.')
    if (typeof value !== 'undefined') {
      // 期望保留的最大小数位数

      let pointKeep = 0
      if (typeof value === 'string' || typeof value === 'number') {
        pointKeep = parseInt(value, 10)
      }
      if (!isNaN(pointKeep)) {
        if (!Number.isInteger(pointKeep) || pointKeep < 0) {
          pointKeep = 0
        }
        const str = `^(\\d+)\\.(\\d{${pointKeep}}).*$`
        const reg = new RegExp(str)
        if (pointKeep === 0) {
          // 不需要小数点
          val = val.replace(reg, '$1')
        } else {
          // 通过正则保留小数点后指定的位数
          val = val.replace(reg, '$1.$2')
        }
      }
    }
  } else {
    val = val.replace(/[^\d]/g, '')
  }
  return val
}
