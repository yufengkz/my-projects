function drag(el, binding) {
  el.ontouchstart = function (ev) {
    const touches = ev.touches[0]
    const documentW = document.body.clientWidth
    const documenth = document.body.clientHeight
    const maxLeft = documentW - el.clientWidth
    const maxTop = documenth - el.clientHeight
    const disX = touches.clientX - el.offsetLeft
    const disY = touches.clientY - el.offsetTop

    document.ontouchmove = function (ev) {
      const touches = ev.touches[0]
      const l = touches.clientX - disX
      const t = touches.clientY - disY
      el.style.left = l < 0 ? 0 : l > maxLeft ? maxLeft + 'px' : l + 'px'
      el.style.top = t < 0 ? 0 : t > maxTop ? maxTop + 'px' : t + 'px'
    }
    document.ontouchend = function () {
      document.ontouchmove = null
      document.ontouchend = null
    }
  }
}

function numberInput(el, binding, vnode) {
  const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
  ele.addEventListener('input', onInput(el, ele, binding, vnode), false)
}

function onInput(el, ele, binding, vnode) {
  function handle() {
    let val = ele.value
    // modifiers为修饰符对象，传入了float，则其float属性为true
    if (binding.modifiers.float) {
      // 清除"数字"和"."以外的字符
      val = val.replace(/[^\d.]/g, '')
      // 只保留第一个, 清除多余的
      val = val.replace(/\.{2,}/g, '.')
      // 第一个字符如果是.号，则补充前缀0
      val = val.replace(/^\./g, '0.')
      if (typeof binding.value !== 'undefined') {
        // 期望保留的最大小数位数

        let pointKeep = 0
        if (typeof binding.value === 'string' ||
              typeof binding.value === 'number') {
          pointKeep = parseInt(binding.value, 10)
        }
        if (!isNaN(pointKeep)) {
          if (!Number.isInteger(pointKeep) ||
              pointKeep < 0) {
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
      val = ele.value.replace(/[^\d]/g, '')
    }
    ele.value = val
  }
  return handle
}

export default {
  bind(el, binding) {
    drag(el, binding)
    numberInput(el, binding)
  }
}
