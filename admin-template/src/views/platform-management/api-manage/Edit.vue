<template>
  <div class="container">
    <!-- tui-editor 富文本编辑器   -->
    <markdown-editor ref="markdownEditor" v-model="content" :getHtml="getHtml" placeholder="请输入文案" height="700px" />
    <div class="center-box">
      <el-button size="mini" type="primary" @click="submit">提交</el-button>
      <el-button size="mini" plain @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
// tuieditor  markdown编辑器
import MarkdownEditor from '@/components/Markdown' // markdown编辑器组件
// 模拟数据
import { getMD } from '@/api/mock'
export default {
  name: 'App',
  components: {
    MarkdownEditor
  },
  data() {
    return {
      content: '',
      html: ''
    }
  },
  async mounted() {
    const { data } = await getMD({ id: 1 })
    this.content = data
  },
  methods: {
    getVal() {
      console.log(this.content)
    },
    setHtml() {
      this.content = ''
    },
    getHtml(html) {
      this.html = html
    },
    submit() {
      console.log('submit')
      console.log(this.html)
    },
    save() {
      console.log(this.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
