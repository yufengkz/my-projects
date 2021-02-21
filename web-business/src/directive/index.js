import Vue from 'vue'

import drag from './drag'

const directive = [
  {
    name: 'drag',
    content: drag
  },
  {
    name: 'numberInput',
    content: drag
  }
]

directive.forEach(directive => {
  Vue.directive(directive.name, directive.content)
})
