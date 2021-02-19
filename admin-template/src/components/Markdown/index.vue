<template>
  <div>
    <v-md-editor
      v-model="content"
      :placeholder="placeholder"
      :height="height"
      left-toolbar="undo redo clear | h italic strikethrough quote | ul ol table hr | link image code tip | customToolbarCopy"
      :toolbar="toolbar"
    ></v-md-editor>
    <!-- ↑↑↑这两句可以实现自定义图片上传↑↑↑ -->
    <!-- :disabled-menus="[]" -->
    <!-- @upload-image="handleUploadImage" -->
    <!-- ↑↑↑这两句可以实现自定义图片上传↑↑↑ -->
    <textarea id="copy-input" style="opacity: 0; position: absolute; top: 99999px; z-index: -9999;" />
  </div>
</template>

<script>
import Vue from 'vue'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

import '@kangc/v-md-editor/lib/style/base-editor.css'

// 按需引入 highlightjs 的语言包
// import json from 'highlight.js/lib/languages/json'
// import javascript from 'highlight.js/lib/languages/javascript'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
VueMarkdownEditor.use(vuepressTheme)
VueMarkdownEditor.use(githubTheme, {
  extend(md, hljs) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
    // 注册语言包
    // hljs.registerLanguage('json', json)
    // hljs.registerLanguage('json', javascript)
  }
})
// 直接按需引入 prism 的语言包即可，此处以 json 为例
// import 'prismjs/components/prism-json'

Vue.use(VueMarkdownEditor)
export default {
  name: 'markdown-editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入文案'
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    getHtml: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    this.toolbar = {
      customToolbarCopy: {
        title: '复制',
        icon: 'el-icon-document-copy', // el-icon-download
        action: editor => {
          // 统一封装下载/复制
          this.copyData()
        }
      }
    }
    return {}
  },
  computed: {
    content: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    content: {
      handler(newValue, preValue) {
        this.getEditorHtml(newValue) // 不管一不一样都返回html
        if (newValue !== preValue) {
          this.$emit('input', newValue)
        }
      },
      immediate: true
    }
  },
  methods: {
    getEditorHtml(value) {
      // 调用方法将 markdown 转换成 html 并使用 xss 过滤
      const html = xss.process(VueMarkdownEditor.themeConfig.markdownParser.render(value))
      return this.getHtml(html)
    },
    // 自定义图片上传
    handleUploadImage(event, insertImage, files) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(files)
      // 插入图片
      insertImage({
        url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1269952892,3525182336&fm=26&gp=0.jpg',
        desc: '七龙珠'
        // width: 'auto',
        // height: 'auto',
      })
    },
    // 复制
    copyData(data) {
      var input = document.getElementById('copy-input')
      input.value = this.value // 修改文本框的内容
      input.select() // 选中文本
      const result = document.execCommand('copy') // 执行浏览器复制命令
      if (result) this.$message.success('复制成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-md-editor {
  box-shadow: none;
  border-bottom: 1px solid #ddd;
}
</style>
