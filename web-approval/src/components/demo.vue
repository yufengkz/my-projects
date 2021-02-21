<template>
  <div class="app-container">
    <el-tabs tab-position="left"  @tab-click="clickTab">
      <el-tab-pane v-for="(item,index) in searchData" :key="index" >
        <span slot="label">{{item.companyName}}</span>
        <ImageUpload @UploadChild="getChild" :setUrlList="evidenceUrl" :evidenceDocument="evidenceDocument"></ImageUpload>
        <!-- <ImageUpload @UploadChild="getChild" :outData= item.imageUrls></ImageUpload> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getRepaymentDetail } from '@/api/service-fee'

export default {
  components: {
    ImageUpload: () => import('@/components/ImageUpload')
  },
  props: ['searchData'],
  data() {
    return {
      currentIndex: '0',
      dialogVisible: false,
      ChildUrlList: [],
      evidenceUrl: [], // 接口返回的 url
      evidenceDocument: '' // 接口返回的 显示图片 /dev/...
    }
  },
  created() {
    getRepaymentDetail({ id: 10 }).then(res => {
      if (res.code === 200) {
        this.evidenceUrl = res.data.evidenceUrl
        this.evidenceDocument = res.data.evidenceDocument
      }
    })
  },
  mounted() {},
  methods: {
    // 点击tab
    clickTab(targetName) {
      this.currentIndex = targetName.index
    },
    getChild(v) {
      this.ChildUrlList = v
      this.searchData[this.currentIndex].imageUrls = v
      this.$emit('UploadFile', this.searchData)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
