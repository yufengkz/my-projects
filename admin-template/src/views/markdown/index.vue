<template>
  <div>
    <!-- tui-editor 富文本编辑器   -->
    <markdown-editor ref="markdownEditor" v-model="content" placeholder="请输入文案" height="700px" />
    <div>
      <el-button type="primary" icon="el-icon-document" @click="setHtml">
        Set Markdown
      </el-button>
      <el-button type="primary" icon="el-icon-document" @click="getHtml">
        Get Markdown
      </el-button>
    </div>
    <hr />
    <markdown-viewer :content="content"></markdown-viewer>
  </div>
</template>

<script>
// tuieditor  markdown编辑器
import MarkdownEditor from '@/components/Markdown' // markdown编辑器组件
import MarkdownViewer from '@/components/Markdown/Viewer'
export default {
  name: 'App',
  components: {
    MarkdownEditor,
    MarkdownViewer
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    setHtml() {
      this.content = 'dddddddd123'
    },
    getHtml() {
      console.log('%c 🍾 this.html: ', 'font-size:12px;background-color: #33A5FF;color:#fff;', this.content)
    }
  }
}
</script>

<style scoped></style>
