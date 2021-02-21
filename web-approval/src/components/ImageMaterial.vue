/* [担保信息详情] 影像资料组件 */
<template>
  <div class="imageMaterial">
    <el-row>
      <el-col :span="24">
        <div class="tabsCont">
          <div class="classifyList">
            <template v-for="item in classifyList">
              <div
                :style="{padding : classifyList.length > 10 ? '0 5px' : '0 15px'}"
                :class="['item', {'active': classifyActive === item.value}]"
                :key="item.value"
                @click="claaifyClick(item.value)"
              >{{item.name}}</div>
            </template>
          </div>
          <div class="imgList" v-for="(item, index) in classifyList" :key="index" v-show="classifyActive === item.value">
            <ImageUploadDetail v-show="item.value" :fileList="fileList[item.value] ? fileList[item.value] : []" :key="index"></ImageUploadDetail>
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
      type: Object,
      default() {
        return {}
      }
    },
    classifyList: {
      type: Array
    },
    classifyActive: {
      type: String
    }
  },
  components: {
    ImageUploadDetail: () => import('@/components/ImageUpload/Detail')
  },
  created() {},
  mounted() {},
  methods: {
    claaifyClick(value) {
      this.$emit('claaifyClick', value)
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
