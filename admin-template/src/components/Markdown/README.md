#### 文档地址

[地址](https://code-farmer-i.github.io/vue-markdown-editor/zh/examples/codemirror-editor.html#%E5%BC%95%E5%85%A5)
[地址](https://github.com/zhaoxuhui1122/vue-markdown)

#### 菜单配置

```
undo redo clear | h italic strikethrough quote | ul ol table hr | link image code | save | tip
```

#### 编辑组件-Editor

```html
<template>
  <markdown-editor ref="markdownEditor" v-model="content" placeholder="请输入文案" height="400px" />
</template>
<script>
  import MarkdownEditor from '@/components/Markdown' // markdown编辑器组件
  components: {
    MarkdownEditor
  }
</script>
```

#### 显示组件-Viewer

```html
<template>
  <markdown-viewer :content="content"></markdown-viewer>
</template>
<script>
  import MarkdownViewer from '@/components/Markdown/Viewer'
  components: {
    MarkdownViewer
  }
</script>
```
