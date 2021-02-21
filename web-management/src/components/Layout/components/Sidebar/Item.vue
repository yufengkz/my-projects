<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      const element = h('svg-icon', {
        attrs: {
          'icon-class': icon
        }
      })
      vnodes.push(element)
    }
    if (title) {
      const elHtml = h(
        'span',
        {
          attrs: {
            slot: 'title'
          }
        },
        title
      )
      vnodes.push(elHtml)
    }
    return vnodes
  }
}
</script>
