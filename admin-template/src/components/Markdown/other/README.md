#### 文档地址

[地址](https://nhn.github.io/tui.editor/latest/tutorial-example17-creating-plugin)

#### 拓展性更好

```
// 目前不知道数据库中存的是什么样的字符，有限使用外面的Markdown，外面的不能存html，这个可以存html字符
yarn add --save @toast-ui/editor
```

#### 编辑组件-Editer

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
