/* [审批案件管理 >> 法人担保审批案件 >> 案件详情] */
<template>
  <div class="caseCtrlLegalDetail">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="leftContext">
          <el-tabs ref="approvalDetailTabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="审批信息" name="first">
              <div class="titleCont">
                <div class="title">基本信息</div>
                <DescriptionList class="m-l-20" :content="resultData">
                  <Description label="流水号">{{resultData.applyNo}}</Description>
                  <Description label="MAP中心">{{resultData.mapName}}</Description>
                  <Description label="申请人">{{resultData.applyUser}}</Description>
                  <Description label="建议申请担保金额">{{amountFormatter(resultData.proposalLimit)}} 元</Description>
                  <Description label="担保有效期">{{resultData.validTerm}}</Description>
                  <Description label="客户申请时间">{{resultData.applyTime}}</Description>
                  <Description label="MAP中心提交时间">{{commitTime}}</Description>
                  <Description label="更新时间">{{resultData.updatedTime}}</Description>
                </DescriptionList>
              </div>
              <div class="titleCont">
                <el-tabs v-model="activeTwoName" @tab-click="handleTwoClick">
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
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="second">
              <ApprovalLog ref="approvallog"  :activities="activities"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="btn">
          <!-- 人工转案 -->
          <ArtificialTransferDialog :optionData="optionData" @accepterVal="accepterVal" @showVisable="showVisable" />
        </div>
        <div class="rightContext">
          <!-- 风险审批 -->
          <!-- <RiskApproval /> -->
          <div class="title">风险审批</div>
          <!-- 审批查看 审批中 N是显示回显状态 010为不是退回状态-->
          <div class="approveShow" v-if="riskApprovaResult.is !== 'Y' && riskApprovaResult.examineResult !== '010' && riskApprovaResult.examineResult !== '000' &&riskApprovaResult.examineResult !=='020'">
            <li>
              <span class="name">审批结果</span>
              <span class="active">{{examineData.checkLevel$FICDictName + '中'}}</span>
            </li>
            <li>
              <span class="name">担保金额</span>
              <span>{{amountFormatter(riskApprovaResult.grantAmount)}} (元)</span>
            </li>
            <li>
              <span class="name">审批意见</span>
            </li>
            <div class="text">{{riskApprovaResult.examineOpinion}}</div>
          </div>
          <div v-else>
            <!-- 审批查看 通过-->
            <div class="approveShow" v-if="status === '000' || status === '030' ">
              <li>
                <span class="name">审批结果</span>
                <span class="active">{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <span class="name">担保金额</span>
                <span>{{amountFormatter(riskApprovaResult.grantAmount)}} (元)</span>
              </li>
              <li v-if="status === '000'">
                <span class="name">审批意见</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
            <!-- 审批查看 退回-->
            <div class="approveShow" v-if="status === '010'">
              <li>
                <span class="name">审批结果</span>
                <span class="active">{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <span class="name">退回目标</span>
                <span>{{riskApprovaResult.submitUserLevel$FICDictName}}</span>
              </li>
              <li>
                <!-- <span class="name">退回原因</span> -->
                <span class="name">审批意见</span>

              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
            <!-- 审批查看 拒绝-->
            <div class="approveShow" v-if="status === '020'">
              <li>
                <span class="name">审批结果</span>
                <!-- <span class="on">{{riskApprovaResult.examineResultDesc}}</span> -->
                <span class="active" v-if="examineData.status !== '11'">MAP中心处理中</span>
                <span class="on" v-else>{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <span class="name">拒绝原因</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTraceLog, getLegalDetail } from '@/api/approval'
import { legalPersonGuarantee, getTransferResources } from '@/api/case-ctrl'
import { mapState, mapGetters } from 'vuex'
import { ansFormatter } from '@/utils/tool.js'

export default {
  name: 'CaseCtrlLegalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    GuarantorInfo: () => import('./components/GuarantorInfo'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    ApprovalLog: () => import('@/components/ApprovalLog'), // 审批日志
    ArtificialTransferDialog: () => import('@/components/ArtificialTransferDialog')
  },
  data() {
    return {
      activeName: 'first',
      commitTime: '', // map中心提交时间
      isCache: false,
      // 人工转案数据
      optionData: [],
      activities: [], // 审批日志数据
      activeTwoName: 'first',
      classifyActive: 'legal_company_constitution', // 修改的下标 默认为数组的第一项
      resultData: {}, // 详情页面数据
      fileList: {}, // 影像信息
      status: '', // 审批状态
      // tab 标头数据
      classifyList: [],
      examineData: {}, // 审批中状态
      riskApprovaResult: {} // 风险审批结果
    }
  },
  created() {
    this.getLegalPersonDetail()
  },
  mounted() {},
  computed: {
    ...mapState(['app']),
    ...mapGetters(['currentUser'])
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
      this.activeName = tab.name
      if (tab.name === 'second') {
        this.getTraceLogFun()
      }
    },
    // 人工转案提交
    accepterVal(val) {
      const parmas = [
        {
          applyNo: this.$route.query.applyNo,
          id: val.id,
          transitionId: this.currentUser.id,
          transitionName: this.currentUser.userName
        }
      ]
      legalPersonGuarantee(parmas).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message || '成功了')
        } else {
          this.$message.error(result.message || '失败了')
        }
      })
    },
    handleSave(val) {
      this.curIndex = 1
    },
    onSubmit(val) {
      this.curIndex = 1
    },
    getLegalPersonDetail() {
      getLegalDetail({ applyNo: this.$route.query.applyNo }).then(result => {
        if (result.status === 200) {
          this.commitTime = result.data.approveLegalGuaranteOutDTO.commitTime // 提交时间
          this.resultData = result.data.data || {}
          this.fileList = result.data.data.listMap || {}
          this.status = result.data.riskApprovalOfCreditTransferOutDTO.examineResult || ''
          this.riskApprovaResult = result.data.riskApprovalOfCreditTransferOutDTO || {}
          this.examineData = result.data.approveLegalGuaranteOutDTO || {}
        } else {
          this.$message.error(result.data || '失败')
        }
      })
    },
    handleTwoClick(tab, event) {
      this.activeTwoName = tab.name
      if (this.activeName === 'second') {
        this.$refs.approvallog.getTraceLogFun()
      }
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    async getTraceLogFun() {
      const result = await getTraceLog({ applyNo: this.$route.query.applyNo, flowNo: 'C03' })
      if (result.status === 200) {
        this.activities = result.data || []
      } else {
        this.$message.error(result.message || '失败')
      }
    },
    // 点击人工转案事件获取下拉转案人数据
    showVisable() {
      const params = {
        businessType: 'C03',
        applyNo: this.$route.query.applyNo
      }
      getTransferResources(params).then(result => {
        if (result.status === 200) {
          this.optionData =
            result.data && result.data.map(item => {
              return { ...item, key: item.id, value: item.userName }
            })
        }
      })
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.caseCtrlLegalDetail {
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
  .leftContext {
    background: #fff;
    padding: 10px 24px 0;
    /deep/ .el-tabs__nav {
      display: flex;
    }
  }
  .rightContext {
    background: #fff;
    border: 2px solid #08b347;
    border-radius: 1px;
    padding: 19px 24px;
    /deep/ .el-form-item {
      display: flex;
      flex-direction: column;
    }
    /deep/ .el-form {
      padding: 20px 20px 0 0;
      .el-form-item__label {
        text-align: left;
      }
    }
  }
  .btn {
    text-align: center;
    padding: 10px 0;
  }
  padding: 0px;
  .title {
    font-size: 16px;
    color: #08b347;
    line-height: 24px;
    font-weight: 600;
    padding-bottom: 10px;
  }

  .approveShow {
    // padding: 0 10px;
    width: 100%;
    height: auto;
    li {
      display: flex;
      height: 28px;
      list-style: none;
      justify-content: space-between;
      align-items: center;
      .name {
        color: #5a5a5a;
      }
    }
    .text {
      max-height: 150px;
      overflow-y: auto;
      font-size: 12px;
      line-height: 28px;
      /*修改滚动条样式*/
      &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        /**/
      }
      &::-webkit-scrollbar-track {
        background: rgb(239, 239, 239);
        border-radius: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #179a16;
      }
      &::-webkit-scrollbar-corner {
        background: #179a16;
      }
    }
    span {
      font-size: 12px;
      &.active {
        color: #08b448;
      }
      &.on {
        color: red;
      }
    }
  }
}
</style>
