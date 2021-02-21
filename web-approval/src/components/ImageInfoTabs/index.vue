<template>
  <div class="app-container">
    <el-tabs v-model="activeName" tab-position="left" @tab-click="clickTab">
      <el-tab-pane v-for="(item,index) in tabsData" :key="index" :name="item.code">
        <span slot="label">{{item.tabName}}</span>
        <ImageUpload
          :customInfo="customInfoWithType"
          @updateChild="val => {updateChild(val, item.code)}"
          :imageList="imageData[item.code]"
        ></ImageUpload>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'ImageInfoTabs',
  components: {
    ImageUpload: () => import('@/components/ImageUpload')
  },
  props: {
    customInfo: Object,
    tabsData: {
      type: Array,
      required: true
    },
    imageData: Object
  },
  data() {
    return {
      customInfoWithType: Object.assign({}, this.customInfo, { fileType: 1 }),
      activeName: this.tabsData[0] && this.tabsData[0].code,
      dialogVisible: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 点击tab
    clickTab(target) {
      this.activeName = target.name
      this.customInfoWithType = Object.assign({}, this.customInfo, { fileType: target.name })
    },
    updateChild(val, key) {
      this.$emit('updateChild', { val, key })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
