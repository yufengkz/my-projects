<template>
  <div class="image-contennt">
    <el-tabs v-model="activeImageName" type="border-card" @tab-click="handleClickImage">
      <el-tab-pane v-for="(item,index) in tabPaneData" :key="index" :label="item.value" :name="item.code">
        <ImageUpload @updateChild="getChild" :imageList="imageData[item.code]"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    tabPaneData: {
      type: Array
    },
    ShowImg: {
      type: Boolean,
      default: false
    },
    imageData: {
      type: Object
    }
  },
  computed: {
    imageList() {
      return this.imageData[this.activeImageName] || []
    }
  },
  components: {
    ImageUpload: () => import('@/components/ImageUpload')
  },
  data() {
    return {
      activeImageName: 'legal_company_constitution',
      dialogVisible: false
    }
  },
  methods: {
    handleClickImage(tab, event) {
      this.activeimageName = tab.name
      this.$emit('handleClickImage', tab.name)
    },
    getChild(v) {
      this.$emit('handleChangeImageImg', { name: this.activeImageName, list: v })
    }
  }
}
</script>

<style lang='scss' scoped>
.image-contennt {
  /deep/ .el-tabs__nav {
    display: flex;
    flex-wrap: wrap;
    /deep/ .el-tabs__item {
      padding: 0 19px !important;
    }
  }
}
</style>
