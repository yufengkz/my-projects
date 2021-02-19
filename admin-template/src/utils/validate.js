// 验证函数集合
import {
  Message
} from 'element-ui'
/* 合法用户名 */
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 大小写字母及数字 */
export function validatAlphabetsNum(str) {
  const reg = /^[A-Za-z0-9]+$/
  return reg.test(str)
}

/** 大于0 最多两位小数的数字 */
export function validateNum(str) {
  // const reg = /^\d+(?:\.\d{1,2})?$/
  const reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/
  return reg.test(str)
}
/** 大于等于0 最多两位小数的数字 */
export function validateNumGreatEqualZero(str) {
  // const reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/
  const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

/* 手机号验证 */
export function validateMobile(str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

/* 外部链接验证 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 姓名验证：最多20位汉字和间隔符 */
export function validateName(str) {
  return /^([\u4e00-\u9fa5]+[·]?)+[^·]$/.test(str)
}
/**
 * 验证上传文件是否符合规则校验
 * @param {File} file 上传文件
 * @param {Object} obj 文件格式要求的配置规则(非必输项)
 * @param {Array} obj.fileType 文件类型
 * @param {String} obj.unit 文件大小单位
 * @param {Number} obj.min 文件最小值
 * @param {Number} obj.max 文件最大值
 * @param {Number} obj.length 文件名长度最小值
 * @param {Number} obj.lengthError 文件长度最大值
 * @param {String} obj.error 错误提示语文案
 */
export function uploadCheck(file, obj) {
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

/* 密码验证  6-18位数字和字母的组合 */
export function validatePassword(str) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  return reg.test(str)
}

/* 编号类验证 */
export function validateNumberClass(relu, value, callback) {
  const reg = /^[A-Za-z0-9]+$/
  if (value === '') {
    callback()
  } else if (value.length > 40) {
    callback(new Error('不能超过40个字符'))
  } else if (!reg.test(value)) {
    callback(new Error('只可输入数字及字母'))
  } else {
    callback()
  }
}
/* 验证统一社会信息代码 */
export function validateSocialCode(relu, value, callback) {
  if (value === '') {
    callback()
  } else if (value.length !== 18) {
    const reg = /^[A-Za-z0-9]+$/
    if (!reg.test(value)) {
      callback(new Error('只可输入数字及字母'))
    }
    callback()
  } else if (value.length === 18) {
    const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
    if (!reg.test(value)) {
      callback(new Error('输入正确的统一社会信用代码'))
    }
    callback()
  } else {
    callback()
  }
}
