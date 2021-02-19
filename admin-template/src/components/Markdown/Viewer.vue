<template>
  <div class="viewer" :style="styles">
    <v-md-preview :text="content"></v-md-preview>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMarkdownPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'

// 按需引入 highlightjs 的语言包，此处以 json 为例
import json from 'highlight.js/lib/languages/json'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
// 直接按需引入 prism 的语言包即可，此处以 json 为例
import 'prismjs/components/prism-json'

VueMarkdownPreview.use(vuepressTheme)
VueMarkdownPreview.use(githubTheme, {
  extend(md, hljs) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
    // 注册语言包
    hljs.registerLanguage('json', json)
  }
})

Vue.use(VueMarkdownPreview)
export default {
  name: 'markdown-viewer',
  props: {
    content: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.viewer {
  background: #fff;
}
</style>
