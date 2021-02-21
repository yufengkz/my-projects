/* [担保信息详情] 影像资料组件 */
<template>
  <div class="imageMaterial">
    <el-row>
      <el-col :span="24">
        <div class="tabsCont">
          <div class="classifyList">
            <template v-for="item in classifyList">
              <div
                :class="['item', { active: classifyActive === item.value.toLowerCase() }]"
                :key="item.value"
                @click="claaifyClick(item.value)"
              >
                {{ item.name }}
              </div>
            </template>
          </div>
          <!-- 图片回显更改隐藏、显示，不替换src重新加载403错误 -->
          <div class="imgList" v-for="(item, index) in classifyList" :key="index" v-show="classifyActive === item.value.toLowerCase()">
            <ImageUploadDetail v-show="item.value.toLowerCase()" :fileList="fileList[item.value]" :key="index"></ImageUploadDetail>
            <p v-show="!fileList[item.value]">没有可以显示的数据</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'ImageMaterial',
  props: {
    fileList: {
      type: Object
    },
    classifyList: {
      // biaot
      type: Array
    },
    classifyActive: {
      type: String
    }
  },
  components: {
    ImageUploadDetail: () => import('@/components/ImageUpload/Detail')
  },
  data() {
    return {
      fileData: []
    }
  },
  created() {
    if (this.fileList) {
      this.fileData = this.fileList[this.classifyActive]
    }
  },
  mounted() {},
  methods: {
    claaifyClick(value) {
      this.fileData = this.fileList[`${value.toLowerCase()}`]
      this.$emit('claaifyClick', value.toLowerCase())
    }
  },
  watch: {
    fileList(newVal, oldVal) {
      if (newVal) {
        this.fileData = newVal[`${this.classifyActive.toLowerCase()}`]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.imageMaterial {
  .tabsCont {
    padding-bottom: 15px;
    .cont {
      min-height: 200px;
      padding: 10px 0;
      border: 1px solid #d7d7d7;
    }
    .classifyList {
      display: flex;
      flex-wrap: wrap;
      .item {
        font-size: 12px;
        height: 34px;
        line-height: 32px;
        border: 1px solid #d7d7d7;
        padding: 0 15px;
        margin-right: 15px;
        margin-bottom: 15px;
        cursor: pointer;
        &.active {
          color: #08b448;
          border: 2px solid #08b448;
          height: 34px;
          line-height: 30px;
          padding: 0 14px;
        }
      }
    }
    .imgList {
      padding: 15px;
      border: 1px solid #d7d7d7;
    }
  }
}
</style>
