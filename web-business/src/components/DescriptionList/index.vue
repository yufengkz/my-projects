<template>
  <div class="description-list">
    <!-- <div v-if="title" class="title">{{title}}</div> -->

    <!-- :span="+col" -->
    <!-- :xs="24" :sm="12" :md="8" :lg="8" :xl="8" -->
    <el-row :gutter="gutter">
      <el-col :key="key" v-for="(item, key) in dataSource" v-bind="item.style === '1' ? { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 } : {...gridConfig}">
        <div class="label">{{item.label}}</div>
        <div class="value">
          {{item.value}}
          <el-tag v-if="item.tag" size="mini" class="m-l-15" :type="item.type" >{{item.tag}}</el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const handleArrayObj = data => {
  return data.filter(item => item.tag === 'Description').map(item => ({
    label: (item.data && item.data.attrs.label) || '--',
    value: (item.children && item.children[0].text) || '--',
    tag: item.children && item.children[1] && item.children[1].tag === 'tag' && item.children[1].children[0].text,
    type: (item.children && item.children[1] && item.children[1].tag === 'tag' && item.children[1].data && item.children[1].data.attrs && item.children[1].data.attrs.type) || '',
    style: (item.data && item.data.style) || ''
  }))
}

export default {
  name: 'DescriptionList',
  props: {
    // title: String,
    content: [Object, Array],
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

  data() {
    return {
      dataSource: handleArrayObj(this.$slots.default || [])
    }
  },
  watch: {
    content() {
      this.dataSource = handleArrayObj(this.$slots.default || []) // 监听重渲染
    }
  }
}
</script>

<style lang="scss" scoped>
.description-list {
  // .title {
  //   font-weight: 700;
  //   font-size: 16px;
  //   line-height: 1.5;
  //   margin-bottom: 20px;
  //   color: rgba(0, 0, 0, 0.85);
  // }
  .label {
    color: #5a5a5a;
    font-weight: 400;
    font-size: 12px;
    line-height: 22px;
    padding-bottom: 16px;
    margin-right: 8px;
    white-space: nowrap;
    display: table-cell;
    &:after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
  .value {
    font-size: 12px;
    line-height: 1.5;
    width: 100%;
    padding-bottom: 16px;
    color: #5a5a5a;
    display: table-cell;
  }
}
</style>
