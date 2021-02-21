/* 「新增法人担保申请」 */
<template>
  <div class="legal-add">
    <CosignerConfirmationDialog v-if="$route.query.applyNo && stepValue === 0" title="确定是否放弃展业？" buttonName="放弃展业" @giveUpInfo="giveUpInfo"/>
    <div class="container">
      <el-steps :active="stepValue" finish-status="success" simple>
        <el-step title="法人担保信息"></el-step>
        <el-step title="担保审批"></el-step>
      </el-steps>
      <LegalInfo ref="LegalInfo" v-show="stepValue === 0" @legalInfoEditChild="legalInfoEditChild" />
      <GuaranteeApproval
        ref="GuaranteeApproval"
        v-show="stepValue === 1"
      />
    </div>
  </div>
</template>
<script>
import { giveUp } from '@/api/cosigner-manage'
export default {
  name: 'cosignerManageLegalAdd',
  components: {
    LegalInfo: () => import('./components/LegalInfo'),
    GuaranteeApproval: () => import('./components/GuaranteeApproval'),
    CosignerConfirmationDialog: () => import('@/components/CosignerConfirmationDialog')
  },
  data() {
    return {
      dialogVisible: false,
      stepValue: 0, // 0代表法人担保信息 1代表担保审批
      applyNo: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 保存 进入下一步 到担保审批
    legalInfoEditChild(v) {
      this.stepValue = v
      if (this.stepValue === 1) {
        this.$refs.GuaranteeApproval.getApproveLog(this.$route.query.applyNo)
      }
    },
    // 放弃展业
    giveUpInfo() {
      this.dialogVisible = false
      giveUp(this.$route.query.applyNo).then(res => {
        if (res.status === 200) {
          this.$router.push({ path: '/cosigner-manage/legal' })
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.legal-add {
  .container {
    width: 100%;
    background: #fff;
    clear: both;
    /deep/ .el-steps .el-step {
      max-width: 250px;
    }
  }
}
</style>
