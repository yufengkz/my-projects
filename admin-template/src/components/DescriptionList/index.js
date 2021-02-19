/**
 * 文本详情描述组件
 * gutter：el-row的gutter间隔
 * col：el-col中的span属性，默认自适应TODO
 * 使用样例：
 <DescriptionList :col="8 | 12 | 24 ">
   <Description label="名称">对应的值</Description>
   <Description label="名称">
     <template slot="content">
       // 自定义内容
     </template>
   </Description>
 </DescriptionList>
 */

import './index.scss'
export default {
  name: 'DescriptionList',
  props: {
    gutter: {
      type: [Number, String],
      default: 0
    },
    col: {
      type: [Number, String],
      default: 8
    }
  },
  computed: {
    gridConfig() {
      return this.col === 8
        ? {
          xs: 24,
          sm: 12,
          md: 8,
          lg: 8,
          xl: 8
        }
        : {
          span: this.col
        }
    }
  },
  methods: {
    renderDescription(dataSource) {
      return dataSource
        .filter(item => item.tag === 'Description')
        .map(item => {
          return (
            // <el-col {...this.gridConfig} > // TODO：未生效
            <el-col xs={24} sm={this.col !== 8 ? this.col : 12} md={this.col || 8} lg={this.col || 8}>
              <div class="label">{item.data.attrs.label}</div>
              <div class="value">{this.renderValue(item)}</div>
            </el-col>
          )
        })
    },
    renderValue(item) {
      // TODO：嵌套slots获取
      // if (item.context.$slots && item.context.$slots.content) {
      //   return <slot name="content"></slot>
      // } else {
      //   return item.children[0].text
      // }
      if (item.children[0] && item.children[0].tag === 'template') {
        return Object.assign({}, item.children[0], { tag: 'div' })
      } else {
        return item.children[0].text
      }
    }
  },
  render(h) {
    const dataSource = this.$slots.default
    return (
      <div class="description-list">
        <el-row gutter={this.gutter}>{this.renderDescription(dataSource)}</el-row>
      </div>
    )
  }
}
