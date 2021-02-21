/**
 * 对日期进行格式化，
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 */
export const formatDate = (str, format) => {
  if (!str) return ''

  var dateTime = typeof str === 'string' ? str.replace(/-/g, '/') : str
  var date = new Date(dateTime)

  var map = {
    '': date.getFullYear(), // 年
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
    var v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
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

/**
 * 转换为大写
 * @param {String} value 接受的过滤值
 */
export const uppercase = value => (value || value === 0 ? value.toString().toUpperCase() : '')

/**
 * 转换为大写
 * @param {String} value 接受的过滤值
 */
export const lowercase = value => (value || value === 0 ? value.toString().toLowerCase() : '')

/**
 * 截取字符串，保留length长度，后跟...符号
 * @param {String} value 要截取的字符串
 * @param {Number} length 保留的文字长度
 */
export const ellipsis = (value, length) => {
  if (!value) return ''
  if (value.length > length) {
    return value.slice(0, length) + '...'
  }
  return value
}

/**
 * 如果未做金额格式化，使用ansFormatter做金额格式化
 * 前边添加人民币符号
 * @param {string | number} value 接收的过滤纸
 */
export const symbolCNY = value => {
  if (value === undefined || value === '' || value === null) return '￥0.00'
  const valueStr = value.toString()
  if (valueStr.includes(',')) {
    return '￥' + valueStr
  } else {
    const formattedStr = ansFormatter(value)
    if (formattedStr === 'NaN' || formattedStr === '0.00') {
      return '￥----'
    } else {
      return '￥' + formattedStr
    }
  }
}

// 身份证号脱敏
export const formtID = n => n.replace(/^(.{6})(?:\d+).(.{4})$/, '$1****$2')
