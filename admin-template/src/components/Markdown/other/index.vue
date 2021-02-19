<template>
  <div id="editor" ref="editor"></div>
</template>

<script>
import Editor from '@toast-ui/editor'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import '@toast-ui/editor/dist/i18n/zh-cn.js'

import './config/picker.css'
// import '@toast-ui/editor-plugin-color-syntax/dist/tui-color-picker.css'
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import 'highlight.js/styles/github.css'

import defaultOptions from './config/option'

export default {
  name: 'markdown',
  props: {
    value: {
      type: String,
      default: ''
    },
    previewStyle: {
      type: String,
      default: 'vertical' // tab 两种模式
    },
    height: {
      type: String,
      required: false,
      default: '300px'
    },
    placeholder: {
      type: String,
      default: 'Please enter text.'
    },
    getMKHtml: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value: {
      handler(newValue, preValue) {
        if (newValue !== preValue) {
          //   this.setValue(newValue)
        }
      }
    }
  },
  mounted() {
    this.initEdit()
    console.log(this.value)
  },
  methods: {
    initEdit() {
      this.editor = new Editor({
        el: this.$refs.editor,
        ...defaultOptions,
        height: this.height,
        initialValue: this.value,
        previewStyle: this.previewStyle,
        plugins: [codeSyntaxHighlight, { hljs }, colorSyntax] // colorSyntax一定要放在最后 和hljs有冲突
      })
      if (this.value) {
        this.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.getValue())
        this.getMKHtml(this.getHtml())
      })
      // 初始化工具栏
      if (this.editor) this.initToolbars()
    },
    // 设置Markdown文本
    setValue(value) {
      this.editor.setMarkdown(value)
    },
    // 获取Markdown文本
    getValue() {
      return this.editor.getMarkdown()
    },
    // 设置html
    setHtml(value) {
      this.editor.setHtml(value)
    },
    // 获取html
    getHtml() {
      return this.editor.getHtml()
    },
    // 初始化工具栏、自定义工具栏
    initToolbars() {
      let toolbar = this.editor.getUI().getToolbar()
      // 上传图片
      this.editor.eventManager.addEventType('insertImg')
      this.editor.eventManager.listen('insertImg', () => {
        // 模拟上传
        // 上传成功地址拼接
        let imgUrl = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png'
        this.addImgToMd(imgUrl)
        // 自定义上传图片
        // to do
      })
      toolbar.insertItem(toolbar.getItems().length - 5, {
        type: 'button',
        options: {
          name: 'toolbar-item',
          className: 'upload-img', // 自定义按钮的类名
          event: 'insertImg', // 对应上文的eventManager添加的监听事件类型，通过点击触发
          tooltip: '上传图片', // 鼠标hover自定义按钮的提示信息
          el: this.createLastButton('insertImg'),
          style: 'background:none;color:#000;font-size:12px;'
        }
      })
      /**
      //   // mermaid扩展
      //   _this.editor.eventManager.addEventType('umlClick')
      //   _this.editor.eventManager.listen('umlClick', function() {
      //     _this.umlClick()
      //   })
      //   toolbar.insertItem(toolbar.getItems().length - 1, {
      //     type: 'button',
      //     options: {
      //       event: 'umlClick',
      //       tooltip: '绘制UML图',
      //       el: this.createLastButton('uml'),
      //       style: 'background:none;color:#333;'
      //     }
      //   })

      //   // 思维导图
      //   _this.editor.eventManager.addEventType('mindmapClick')
      //   _this.editor.eventManager.listen('mindmapClick', function() {
      //     _this.mindmapClick()
      //   })
      //   toolbar.insertItem(toolbar.getItems().length - 1, {
      //     type: 'button',
      //     options: {
      //       event: 'mindmapClick',
      //       tooltip: '思维导图',
      //       el: this.createLastButton('mindmap'),
      //       style: 'background:none;color:#333;'
      //     }
      //   })

      //   // 帮助
      //   _this.editor.eventManager.addEventType('helpClick')
      //   _this.editor.eventManager.listen('helpClick', function() {
      //     _this.helpClick()
      //   })
      //   toolbar.insertItem(toolbar.getItems().length - 1, {
      //     type: 'button',
      //     options: {
      //       event: 'helpClick',
      //       tooltip: '帮助',
      //       el: this.createLastButton('help'),
      //       style: 'background:none;color:#333;'
      //     }
      //   })
       */
    },
    // 添加图片到markdown
    addImgToMd(data) {
      let editor = this.editor.getCodeMirror()
      let editorHtml = this.editor.getCurrentModeEditor()
      let isMarkdownMode = this.editor.isMarkdownMode()
      if (isMarkdownMode) {
        editor.replaceSelection(`![img](${data})`)
      } else {
        let range = editorHtml.getRange()
        let img = document.createElement('img')
        img.src = `${data}`
        img.alt = '图片加载失败'
        range.insertNode(img)
      }
    },
    // 自定义按钮
    createLastButton(tag) {
      // 创建不同toolbar图标
      const button = document.createElement('button')
      if (tag === 'wp') {
        button.innerHTML = '<i class="el-icon-link"></i>'
      } else if (tag === 'uml') {
        button.innerHTML = '<i class="el-icon-connection"></i>'
      } else if (tag === 'mindmap') {
        button.innerHTML = '<i class="el-icon-s-data"></i>'
      } else if (tag === 'help') {
        button.innerHTML = '<i class="el-icon-question"></i>'
      } else if (tag === 'insertImg') {
        button.innerHTML = '<i class="el-icon-picture-outline"></i>'
      }
      return button
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
