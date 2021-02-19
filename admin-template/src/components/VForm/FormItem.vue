<template>
  <div class="vform-item">
    <el-row>
      <el-col v-bind="{ ...gridConfig }">
        <div class="label">{{ label }}</div>
        <div class="value">{{ value }}</div>
        <!-- <el-tag size="mini" class="m-l-15">xxxxx</el-tag> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    col: {
      type: [Number, String],
      default: 8
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log(this.value)
  },
  watch: {
    value: {
      immediate: true, // 很重要！！！
      handler(val, old) {
        console.log('触发了')
        console.log(old)
        return val
        // console.log('action Value:', val, this.levelPersonal)
      }
    }
  },
  computed: {
    gridConfig() {
      /* eslint-disable indent */
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
  methods: {}
}
</script>

<style lang="scss" scoped>
.vform-item {
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
