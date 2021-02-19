<template>
  <div id="viewer" ref="viewer"></div>
</template>

<script>
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import '@toast-ui/editor/dist/i18n/zh-cn.js'

import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import 'highlight.js/styles/github.css'

export default {
  name: 'markdown',
  props: {
    value: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.initEdit()
  },
  methods: {
    initEdit() {
      console.log(this.height)
      this.editor = new Viewer({
        el: this.$refs.viewer,
        height: this.height,
        initialValue: this.value,
        plugins: [[codeSyntaxHighlight, { hljs }]]
      })
    },
    // 组件销毁
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor.remove()
    }
  },
  destroyed() {
    this.destroyEditor()
  }
}
</script>

<style lang="scss" scoped>
::v-deep .tui-editor-defaultUI button.tui-scrollsync.active:after {
  content: '滚动开启';
}
::v-deep .tui-editor-defaultUI button.tui-scrollsync:after {
  content: '滚动关闭';
}
</style>
