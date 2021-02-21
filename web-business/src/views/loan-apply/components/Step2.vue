/** 第二步：完善信息 */
<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="完善基本信息" name="first">
        <!-- <BasicInfo ref="getBasicData"></BasicInfo> -->
      </el-tab-pane>
      <el-tab-pane label="完善种植信息" name="second">
        <!-- <GrowInfo ref="getPlanData"></GrowInfo> -->
      </el-tab-pane>
      <el-tab-pane label="完善增信信息" name="third">
        <!-- <CreditInfo ref="getCreditData"></CreditInfo> -->
      </el-tab-pane>
      <el-tab-pane label="完善影像资料和贷款信息" name="fourth">
        <!-- <ImageInfo ref="getImageData"></ImageInfo> -->
      </el-tab-pane>
    </el-tabs>
    <component ref="activeComponent" :provinceId="provinceId" :loanCustomerType="loanCustomerType" @applyCredit="applyCredit" :is="isComponent"></component>
    <el-row class="p-b-30">
      <el-col :span="12">
        <el-button @click="handleBack" type="text" class="wide-button" size="medium">上一步，业务准备</el-button>
      </el-col>
      <el-col :span="12">
        <el-button @click="submitLoanApply" type="primary" class="wide-button" size="medium">提交借款申请</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// import { get } from '@/utils/request'
import { creditApplyInfoSave } from '@/api/loan-apply'

export default {
  name: 'LoanApplyStep2',
  props: {
    provinceId: {
      type: Number,
      default: 0
    },
    loanCustomerType: {
      type: String,
      default: '1'
    }
  },
  components: {
    BasicInfo: () => import('./step2/BasicInfo'),
    GrowInfo: () => import('./step2/GrowInfo'),
    CreditInfo: () => import('./step2/CreditInfo'),
    ImageInfo: () => import('./step2/ImageInfo')
  },
  computed: {
    isComponent() {
      return this.componentsList[this.activeName]
    }
  },
  data() {
    return {
      activeName: 'first',
      componentsList: {
        first: 'BasicInfo',
        second: 'GrowInfo',
        third: 'CreditInfo',
        fourth: 'ImageInfo'
      }
    }
  },
  // 在这个生命周期里获取不到activeComponent， 因为还没加载出来
  created() {},
  mounted() {},
  methods: {
    /**
     * 提交前先提交tab对应的保存， 小保存通过 调用提交申请接口
     * 思路：点击大保存按钮 store flag为false
     * 触发小保存接口  status200 禁止小保存的toast触发save， status500 小保存报错 不触发save
     */
    submitLoanApply() {
      this.$store.dispatch('ToggleToastFlag', false)
      const componentName = `Handle${this.componentsList[this.activeName]}`
      this.$refs.activeComponent[componentName]()
    },
    handleBack() {
      this.$emit('handleBack')
    },
    applyCredit() {
      creditApplyInfoSave({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(rep => {
        if (rep.status === 200) {
          this.$emit('getInfo')
          this.$emit('toApproval', 3)
        } else {
          this.$message.error(rep.message)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
