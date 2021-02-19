<template>
  <svg :class="svgClass" aria-hidden="true" style="pointer-events: none;">
    <!-- 注意： vscode自动保存代码时vetur自带的格式化HTML的prettierhtml会把:xlink:href的第一个冒号格式化掉， 如果需要修改此文件 先修改userSettings里的 "editor.formatOnSave"值为 false, 再提交 -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
