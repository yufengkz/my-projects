/* [法人担保审批详情] 审批信息组件 */
<template>
  <div class="approvalInfo">
    <el-row>
      <el-col :span="24">
        <div class="titleCont">
          <div class="title">基本信息</div>
          <DescriptionList class="m-l-20" :content="resultData">
            <Description label="流水号">{{resultData.applyNo}}</Description>
            <Description label="MAP中心">{{resultData.mapName}}</Description>
            <Description label="申请人">{{resultData.applyUser}}</Description>
            <Description label="建议申请担保金额">{{amountFormatter(resultData.proposalLimit)}} 元</Description>
            <Description label="担保有效期">{{resultData.validTerm}}</Description>
            <Description label="客户申请时间">{{resultData.applyTime}}</Description>
            <Description label="MAP中心提交时间">{{resultData.mapSubmitTime}}</Description>
            <Description label="更新时间">{{resultData.updatedTime}}</Description>
          </DescriptionList>
        </div>
        <div class="titleCont">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="担保人信息" name="first">
              <GuarantorInfo :resultData="resultData" />
            </el-tab-pane>
            <el-tab-pane label="影像资料" name="second">
              <!-- 图片格式 每一个key 需要处理 -->
              <ImageMaterial
                :fileList="fileList"
                :classifyList="classifyList"
                :classifyActive="classifyActive"
                @claaifyClick="claaifyClick"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ansFormatter } from '@/utils/tool.js'
import { mapState } from 'vuex'
export default {
  name: 'ApprovalInfo',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    GuarantorInfo: () => import('./GuarantorInfo'),
    ImageMaterial: () => import('@/components/ImageMaterial')
  },
  data() {
    return {
      activeName: 'first',
      classifyActive: 'legal_company_constitution', // 修改的下标 默认为数组的第一项
      // tab 标头数据
      classifyList: []
      // fileList: {}
    }
  },
  props: {
    resultData: {
      type: Object
    },
    timeData: {
      type: Object
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapState(['app']),
    fileList() {
      return this.resultData.listMap
    }
  },
  watch: {
    app: {
      handler(newVal, oldVal) {
        if (newVal.commonEnum.legalGuaranteeImageTypeOptions) {
          this.classifyList = this.changeKey(newVal.commonEnum.legalGuaranteeImageTypeOptions, ['value', 'name'])
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeKey (arr, key) {
      const newArr = []
      arr.forEach((item, index) => {
        const newObj = {}
        for (var i = 0; i < key.length; i++) {
          newObj[key[i]] = item[Object.keys(item)[i]]
        }
        newArr.push(newObj)
      })
      return newArr
    },
    handleClick(tab, event) {
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalInfo {
  .titleCont {
    .title {
      font-size: 14px;
      padding-left: 6px;
      line-height: 14px;
      border-left: 2px solid #08b448;
      color: #08b448;
      font-weight: 600;
      margin: 10px 0 15px;
    }
  }
}
</style>
