<template>
  <div class="wrapper-container">
    <!-- overflow: hidden：清除子元素相对父元素的超界溢出 -->
    <div style="overflow: hidden" :style="{ 'max-height': showMore ? 'max-content' : showHeight + 'px' }">
      <div :ref="id" :id="id">
        <slot></slot>
      </div>
    </div>
    <div class="control" v-show="isLongContent" :class="{ 'show-more': showMore }">
      <el-button v-if="showMore" type="text" @click="toggleShowMore">
        收起
        <i class="el-icon-arrow-up el-icon--right"></i>
      </el-button>
      <el-button v-else type="text" @click="toggleShowMore">
        显示更多
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>
<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ShowMore',
  props: {
    showHeight: {
      type: Number,
      required: true,
      default: 200
    },
    watchData: {
      type: [Array, Object],
      default: null
    }
  },
  data() {
    return {
      showMore: false,
      isLongContent: false,
      id: ''
    }
  },
  watch: {
    watchData() {
      this.calculateHeight()
    }
  },
  mounted() {
    this.calculateHeight()
  },
  methods: {
    calculateHeight() {
      this.id = `id_${uuidv4()}`
      this.$nextTick(() => {
        const wrap = this.$refs[this.id]
        const contentHeight = wrap.clientHeight
        if (contentHeight > this.showHeight) {
          this.isLongContent = true
        } else {
          this.isLongContent = false
        }
      })
    },
    toggleShowMore() {
      this.showMore = !this.showMore
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-container {
  position: relative;
  padding-bottom: 40px;

  .control {
    // 控制行，包括渐变遮罩层
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-top: 40px;
    text-align: center;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 70%);

    &.show-more {
      padding-top: 0;
      background: none;
    }
  }
}
</style>
