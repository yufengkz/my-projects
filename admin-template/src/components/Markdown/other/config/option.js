const defaultOptions = {
  minHeight: '500px',
  language: 'zh-CN',
  useCommandShortcut: true,
  useDefaultHTMLSanitizer: true,
  usageStatistics: true,
  hideModeSwitch: false, // 隐藏footer控制栏
  previewStyle: 'vertical',
  initialEditType: 'markdown', // 当前footer显示项 markdown wysiwyg 先创建的的是编辑/预览模式
  placeholder: 'Please enter text.',
  toolbarItems: [
    'heading',
    'bold',
    'italic',
    'strike',
    'divider',
    'hr',
    'quote',
    'divider',
    'ul',
    'ol',
    'task',
    'indent',
    'outdent',
    'divider',
    'table',
    // 'image', // 注释掉是因为要自定义
    'link',
    'divider',
    'code',
    'codeblock'
  ]
}

export default defaultOptions
