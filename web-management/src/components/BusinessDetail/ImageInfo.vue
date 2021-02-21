/* 影像信息组件 */
<template>
  <div v-if="flag" class="imageInfo">
    <el-row>
      <el-col :span="24">
        <div class="tabsLarge">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="业务信息影像资料" name="first">
              <el-tabs v-if="JSON.stringify(firstTabPaneKeys) !== '{}'" tab-position="left">
                <el-tab-pane v-for="(list, label) in firstTabPaneKeys" :key="label">
                  <span class="spanSlot" slot="label">{{commonEnum.businessImageType[label]}}</span>
                  <ImageUploadDetail :fileList="list"></ImageUploadDetail>
                </el-tab-pane>
              </el-tabs>
              <div class="noData" v-else>业务信息暂无影像</div>
            </el-tab-pane>
            <el-tab-pane label="增信信息影像资料" name="second">
              <template v-if="JSON.stringify(loanMortgageFiles) !== '{}' || JSON.stringify(loanPledgeFiles) !== '{}' || (JSON.stringify(personFiles) !== '{}' && Object.keys(personFiles)[0] !== '') || JSON.stringify(legalFiles) !== '{}'">
                <!-- 借款人抵押影像 -->
                <div class="tabsCont" v-for="(loanMortgage, mort) in loanMortgageFiles" :key="mort + '-jie'">
                  <div class="title">借款人,{{ guanranteeEnum.twoTypeMortgageTypeEnum[mort] }}抵押影像资料</div>
                  <div class="cont">
                    <el-tabs tab-position="left" v-for="(imageMap, key) in loanMortgage" :key="key">
                      <el-tab-pane v-for="(imageList, imageIndex) in imageMap" :key="imageIndex">
                        <span class="spanSlot" slot="label">{{ guanranteeEnum.imageFileTypeEnum[imageIndex] }}</span>
                        <ImageUploadDetail :fileList="imageList"></ImageUploadDetail>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <!-- 借款人质押影像 -->
                <div class="tabsCont" v-for="(loanMortPled, ple) in loanPledgeFiles" :key="ple + '-jie'">
                  <div class="title">借款人,{{ guanranteeEnum.twoTypePledgeTypeEnum[ple] }}质押影像资料</div>
                  <div class="cont">
                    <el-tabs tab-position="left" v-for="(loanMortPledMap, index) in loanMortPled" :key="index">
                      <el-tab-pane v-for="(pleValue, pledgeKey) in loanMortPledMap" :key="pledgeKey">
                        <span class="spanSlot" slot="label">{{ guanranteeEnum.imageFileTypeEnum[pledgeKey] }}</span>
                        <ImageUploadDetail :fileList="pleValue"></ImageUploadDetail>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
                <!-- 担保人影像 -->
                <template v-for="(item ,index) in personFiles">
                  <div class="tabsCont" :key="index" v-show="JSON.stringify(item.personFiles) !== '{}'">
                    <div class="title">担保人_{{formatGuarantee(index)}},基本影像</div>
                    <div class="cont">
                      <el-tabs tab-position="left">
                        <el-tab-pane v-for="(imageList, type) in item.personFiles" :key="type">
                          <span class="spanSlot" slot="label">{{ guanranteeEnum.imageFileTypeEnum[type]  }}</span>
                          <ImageUploadDetail :fileList="imageList"></ImageUploadDetail>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                  <div class="tabsCont" v-for="(personMortList, loanIndex) in item.personMortgageFiles" :key="loanIndex">
                    <div class="title">担保人_{{formatGuarantee(index)}}, {{ guanranteeEnum.twoTypeMortgageTypeEnum[loanIndex] }}抵押</div>
                    <div class="cont">
                      <el-tabs tab-position="left" v-for="(imageMap, index) in personMortList" :key="index">
                        <el-tab-pane v-for="(mort, inKey) in imageMap" :key="inKey">
                          <span class="spanSlot" slot="label">{{ guanranteeEnum.imageFileTypeEnum[inKey] }}</span>
                          <ImageUploadDetail :fileList="mort"></ImageUploadDetail>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                  <div class="tabsCont" v-for="(personPledgeList, ple) in item.personPledgeFiles" :key="ple">
                    <div class="title">担保人_{{formatGuarantee(index)}}, {{ guanranteeEnum.twoTypePledgeTypeEnum[ple] }}质押</div>
                    <div class="cont">
                      <el-tabs tab-position="left" v-for="(imagePledgeMap, pleIndex) in personPledgeList" :key="pleIndex">
                        <el-tab-pane v-for="(pledge, pleKey) in imagePledgeMap" :key="pleKey">
                          <span class="spanSlot" slot="label">{{ guanranteeEnum.imageFileTypeEnum[pleKey] }}</span>
                          <ImageUploadDetail :fileList="pledge"></ImageUploadDetail>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </template>
                <div class="tabsCont" v-show="legalFiles && JSON.stringify(legalFiles) !== '{}'">
                  <div class="title">法人担保，基本影像资料</div>
                  <div class="classifyList">
                    <template v-for="(legalList, legal) in legalFiles">
                      <div :class="['item', {'active': classifyActive === legal}]" :key="legal" @click="claaifyClick(legalList, legal)">{{ guanranteeEnum.imageFileTypeEnum[legal] }}</div>
                    </template>
                  </div>
                  <!-- 图片回显更改隐藏、显示，不替换src重新加载403错误 -->
                  <div class="imgList" v-for="(item, index) in legalFiles" :key="index" v-show="classifyActive === index">
                    <ImageUploadDetail :fileList="legalFiles[index]" :key="index"></ImageUploadDetail>
                    <p v-show="!legalFiles[index]">没有可以显示的数据</p>
                  </div>
                </div>
              </template>
              <div class="noData" v-else>增信信息暂无影像</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-else>暂无影像</div>
</template>
<script>
import ImageUploadDetail from '@/components/ImageUpload/Detail'
import { mapGetters } from 'vuex'

export default {
  name: 'ImageInfo',
  components: {
    ImageUploadDetail
  },
  props: {
    realImageDtos: {
      type: Object
    },
    appplyCustomer: {
      type: Object
    },
    guarantee: {
      type: Array
    }
  },
  data() {
    return {
      activeName: 'first',
      firstTabPaneKeys: [], // 业务信息影像资料
      loanMortgageFiles: [], // 增信借款抵押影像
      loanPledgeFiles: [], // 增信借款质押影像
      accountsTabPaneList: [],
      personFiles: {}, // 担保人影像
      legalFiles: {}, // 法人影像
      classifyActive: '',
      fileList: [],
      flag: false
    }
  },
  watch: {
    realImageDtos(v) {
      const legalFiles = v.guaranteeImage.legalFiles
      this.classifyActive = legalFiles ? Object.keys(legalFiles)[0] : ''
      this.fileList = legalFiles ? Object.values(legalFiles)[0] : []
      this.firstTabPaneKeys = v.realImage ? v.realImage : {}
      this.loanMortgageFiles = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep.loanMortgageFiles : {}
      this.loanPledgeFiles = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep.loanPledgeFiles : {}
      this.personFiles = v.guaranteeImage.personFiles || {}
      this.legalFiles = v.guaranteeImage.legalFiles || {}
      if (JSON.stringify(this.firstTabPaneKeys) !== '{}' || JSON.stringify(this.loanMortgageFiles) !== '{}' || JSON.stringify(this.loanPledgeFiles) !== '{}' || (JSON.stringify(this.personFiles) !== '{}' && Object.keys(this.personFiles)[0] !== '') || JSON.stringify(this.legalFiles) !== '{}') {
        this.flag = true
      }
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['guanranteeEnum', 'commonEnum'])
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    claaifyClick(list, key) {
      this.fileList = list
      this.classifyActive = key
    },
    formatGuarantee(id) {
      const filter = this.guarantee.filter(element => {
        if (id === element.relatedCustomerId) {
          return element
        }
      })
      return filter[0] && filter[0].customerName
    }
  }
}
</script>
<style lang="scss" scoped>
  .tabsLarge {
    position: relative;
    padding-left: 15px;
    color: #5a5a5a;
    .noData {
      font-size: 12px;
      // margin-left: 20px;
      padding-bottom: 16px;
    }
  }
  .tabsCont {
    padding-bottom: 15px;
    .title {
      font-size: 14px;
      color: #333;
      line-height: 40px;
    }
    .cont {
      min-height: 200px;
      padding: 10px 0;
      border: 1px solid #d7d7d7;
      .spanSlot {
        // min-width: 260px;
        display: inline-block;
      }
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
</style>
