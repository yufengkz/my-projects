<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="17">
        <div class="leftContext">
          <div class="titleCont">
            <div class="title">基本信息</div>
            <DescriptionList class="m-l-20" v-if="resultData.applyNo" :content="resultData">
              <Description label="流水号">{{resultData.applyNo}}</Description>
              <Description label="MAP中心">{{resultData.mapName}}</Description>
              <Description label="申请人">{{resultData.applyUser}}</Description>
              <Description label="建议申请担保金额">{{resultData.proposalLimit ? formatterMoney(resultData.proposalLimit) + '元' : '--' }}</Description>
              <Description label="担保有效期">{{resultData.validTerm}}</Description>
              <Description label="客户申请时间">{{resultData.applyTime}}</Description>
              <Description label="MAP中心提交时间">{{resultData.mapSubmitTime}}</Description>
              <Description label="更新时间">{{resultData.updatedTime}}</Description>
            </DescriptionList>
          </div>
          <div class="titleCont">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="担保人信息" name="first">
                <GuarantorInfo
                  :resultData="resultData"
                  :familyTabData="familyTabData"
                />
              </el-tab-pane>
              <el-tab-pane label="风险预判信息" name="second">
                <RiskInfo :self="self" :spouse="spouse"></RiskInfo>
              </el-tab-pane>
              <el-tab-pane label="影像资料" name="third">
                <ImageMaterial
                  :fileList="fileList"
                  :classifyList="classifyList"
                  :classifyActive="classifyActive"
                  @claaifyClick="claaifyClick"
                />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div
          class="rightContext"
          :style="{ height: (resultData.approvalStatus === '3' && currentUser.role === '金融专员')  || resultData.approvalStatus === 4 || resultData.approvalStatus === 5 || resultData.approvalStatus === '10' ? '' : 'auto' }"
        >
          <div class="top">
            <!-- 状态的值根据后端返回来的值展示 -->
            <div class="title" :class="[sign ? 'titleRed' : 'title']">{{creditStatus[resultData.approvalStatus * 1]}}</div>
            <div class="checkLog">
              <CosignerDetailDialog @showLog="showLog" :content="logData" />
            </div>
          </div>
          <div v-if="resultData.approvalStatus === '3' && currentUser.role === '金融经理'" class="context1">
            <CosignerConfirmationDialog
              style="width: 90%"
              title="确定要提交？"
              buttonName="确认展业"
              @resubmit="resubmit"
              prop="confirmationDialog"
            />
            <div class="editBtn">
              <el-button type="success" size="mini" @click="toEditFn">去修改</el-button>
            </div>
            <ApproveReject @submitVal="submitVal" style="width:90%" />
          </div>
           <div v-else-if="resultData.approvalStatus === '1' || resultData.approvalStatus === '2' || resultData.approvalStatus === '3' || (resultData.approvalStatus === '4' && currentUser.role === '金融经理') || resultData.approvalStatus === '5' || resultData.approvalStatus === '10'" class="context2">
            <div class="bg">
              <!-- 暂无数据 -->
              <div v-if="resultData.approvalStatus === '1'">
                <img src="@/assets/detail/manager.png" alt />
                <p>待展业</p>
              </div>
               <div v-if="resultData.approvalStatus === '2'">
                <img src="@/assets/detail/manager.png" alt />
                <p>待完善资料</p>
              </div>
              <!-- 待金融经理提交 -->
              <div v-if="resultData.approvalStatus === '3'">
                <img src="@/assets/detail/manager.png" alt />
                <p>金融经理审批中</p>
              </div>
              <!-- 金融经理驳回 -->
              <div v-else-if="resultData.approvalStatus === '4'">
                <img src="@/assets/detail/notarize.png" alt />
                <p>待专员确认</p>
              </div>
              <!-- 待风险审批 -->
              <div v-else-if="resultData.approvalStatus === '5'">
                <img src="@/assets/detail/examine.png" alt />
                <p>风险审批中</p>
              </div>
              <!-- 放弃展业 -->
              <div v-else-if="resultData.approvalStatus === '10'">
                <img src="@/assets/detail/givup.png" alt />
                <p>已放弃展业</p>
              </div>
            </div>
          </div>

          <div v-else-if="resultData.approvalStatus === '6' || resultData.approvalStatus === '7' || (resultData.approvalStatus === '4' && currentUser.role === '金融专员')" class="context3" >
             <div class="opinionWrap" v-if="resultData.approvalStatus === '4'">
              <p class="opinion">驳回原因</p>
              <p class="opinionContext">{{detailLog && detailLog.refusalReason}}</p>
            </div>
            <div class="opinionWrap" v-else>
              <p class="opinion">审批意见</p>
              <p class="opinionContext">{{detailLog && detailLog.refusalReason}}</p>
            </div>
              <!-- :disabled="(resultData.sourceCode ? true : false) || resultData.approvalStatus === '3' && currentUser.role === '金融专员'" -->
              <!-- :disabled="(resultData.sourceCode ? true : false) || resultData.approvalStatus === '6' && currentUser.role === '金融专员'"  -->
            <CosignerConfirmationDialog
              style="width:90%"
              :title="(resultData.approvalStatus === '7' && currentUser.role === '金融经理' ) ? '只有一次复议的机会，您确认复议提交?' : '确定重新提交风控审核？'"
              :buttonName="(resultData.approvalStatus === '7' && currentUser.role === '金融经理' ) ? '复议提交' : '重新提交'"
              @resubmit="resubmit"
              prop="confirmationDialog"
              :disabled="showBtn"
            />
            <div class="editBtn">
              <el-button type="success" size="mini" @click="toEditFn" :disabled="showBtn">去修改</el-button>
            </div>
          </div>
          <div
            v-else-if="resultData.approvalStatus === '8' || resultData.approvalStatus === '9' || resultData.approvalStatus === '11'"
            class="context4"
          >
            <div
              v-if="resultData.approvalStatus !== '11' && (resultData.approvalStatus === '8' || resultData.approvalStatus === '9' ) "
              class="guaranteeWrap"
            >
              <p class="title">审批担保金额</p>
              <p class="money">{{resultData.approvalLimit}}元</p>
            </div>
            <p class="opinionWrap">审批意见</p>
            <p class="opinionContext">{{detailLog && detailLog.refusalReason}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { guarantorDetail, queryGuaranteeApproveLog, creditApplyApproveLog, submitApprove, examineReject, releaseOccupyRemove } from '@/api/cosigner-manage'
import { queryIpToDataForLog } from '@/api/common'
import { mapGetters } from 'vuex'
import { ansFormatter } from '@/utils/format'

export default {
  name: 'ConsignerManageNaturalDetail',
  components: {
    ImageMaterial: () => import('@/components/ImageMaterial'),
    ApproveReject: () => import('@/components/ApproveReject'),
    DescriptionList: () => import('@/components/DescriptionList'),
    CosignerDetailDialog: () => import('@/components/CosignerDetailDialog'),
    CosignerConfirmationDialog: () => import('@/components/CosignerConfirmationDialog'),
    RiskInfo: () => import('./components/Tab2/RiskInfo'),
    GuarantorInfo: () => import('./components/Tab2/GuarantorInfo')
    // RiskInformation: () => import('./components/Tab2/RiskInformation'),
  },

  data() {
    return {
      activeName: 'first',
      self: {}, // 风险预判信息担保人信息
      spouse: {}, // 风险预判信息担保人配偶信息
      resultData: {}, // 保存接口所有的数据
      detailLog: {}, // 审批日志
      logData: [], // 日志数据
      fileList: {}, // 图片数据  key是健名 value 是图片数组
      creditStatus: {
        1: '待展业',
        2: '待完善资料',
        3: '待金融经理提交', // 经理 三个按钮  专员 图片
        4: '金融经理驳回', // 专员 图片
        5: '待风险审批', // 经理和专员 图片
        6: '审批退回待提交', // 经理和专员 文字+按钮
        7: '审批拒绝待复议', // 经理 文字+按钮   注意：不符合条件怎么显示？
        8: '有条件审批通过', // 经理和专员 文字
        9: '审批通过', // 经理和专员 文字
        10: '放弃展业', // 经理和专员 图片
        11: '审批拒绝' // 经理和专员 文字
      },
      classifyActive: 'person_marriage_certificate', // 修改的下标 默认为数组的第一项
      // tab 标头数据
      classifyList: [
        { value: '婚姻证明', code: 'person_marriage_certificate' },
        { value: '户口本', code: 'person_account_book' },
        { value: '银行流水', code: 'person_bank_statement' },
        { value: '家庭资产证明', code: 'person_family_assets' }
      ],
      familyTabData: {
      // 家庭年收入
        familyIncomeTabData: [],
        // 家庭财产状况
        familyPropertyTabData: []
      }
    }
  },
  created() {
    this.getGuarantorDetail()
  },
  computed: {
    ...mapGetters(['currentUser']),
    // 控制右上角标题的样式
    sign() {
      return (
        this.resultData.approvalStatus === 4 || this.resultData.approvalStatus === 6 || this.resultData.approvalStatus === 7 || this.resultData.approvalStatus === 11
      )
    },
    showBtn() {
      // (resultData.sourceCode ? true : false) || resultData.approvalStatus === '6' && currentUser.role === '金融专员'
      if (this.resultData.sourceCode) {
        return true
      } else if (this.currentUser.role === '金融专员' && (this.resultData.approvalStatus === '3' || this.resultData.approvalStatus === '7')) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    async getGuarantorDetail() {
      const result = await guarantorDetail(this.$route.query.applyNo)
      if (result.status === 200) {
        this.resultData = result.data || {}
        this.fileList = result.data.listMap || {} // 数据返回的 图片字段需要处理为thumbnailUrl
        this.familyTabData.familyIncomeTabData = this.formatFamilyIncome(result.data.familyIncomeListDTO)
        this.familyTabData.familyPropertyTabData = this.formatFinances(result.data.finances)
        this.self = {
          creditAuthType: result.data.creditAuthType === 'online' ? '线上签署' : '线下签署',
          riskLevel: result.data.riskLevel,
          riskScore: result.data.riskScore,
          creditAuth: result.data.creditAuth
        }
        this.spouse = {
          ...result.data.spouse
        }
        this.getQueryIpToDataForLog() // 调用接口获取右侧审批内容
      } else {
        this.$message.error(result.message || '失败')
      }
    },
    // 获取日志信息
    getQueryGuaranteeApproveLog() {
      if (this.resultData.sourceCode) {
        creditApplyApproveLog(this.resultData.sourceCode).then(result => {
          if (result.status === 200) {
            this.logData = result.data || []
          } else {
            this.logData = []
            this.$message.error(result.message || '失败')
          }
        })
      } else {
        queryGuaranteeApproveLog({ applyNo: this.$route.query.applyNo, guaranteeType: '01' }).then(result => {
          if (result.status === 200) {
            this.logData = result.data || []
          } else {
            this.logData = []
            this.$message.error(result.message || '失败')
          }
        })
      }
    },
    // 获取右审批状态侧显示内容
    getQueryIpToDataForLog() {
      queryIpToDataForLog({ applyNo: this.$route.query.applyNo, guaranteeType: '01', opinion: this.resultData.approvalStatus }).then(res => {
        if (res.status === 200) {
          this.detailLog = res.data
        }
      })
    },
    // 展示日志信息方法
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    // 切换tab方法
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    // 去修改
    toEditFn() {
      this.$router.push({ path: '/cosigner-manage/natural/add', query: { applyNo: this.$route.query.applyNo } })
    },
    // 弹框确认操作
    submitOK(val) {
      // 确认展业中，最后点击确定的按钮。
      const obj = {
        applyNo: this.resultData.applyNo,
        approvalLimit: this.resultData.approvalLimit,
        highestEdu: this.resultData.personBaseRep.highestEdu,
        address: this.resultData.personBaseRep.familyAddress,
        liveLimitYear: this.resultData.personBaseRep.liveLimitYear,
        fileMap: this.imageData,
        finances: this.resultData.finances,
        familyIncomeListDTO: this.resultData.familyIncomeListDTO,
        liabilities: [
          {
            outstandingAccounts: this.resultData.liabilities[0].outstandingAccounts,
            privateLending: this.resultData.liabilities[0].privateLending,
            bankLoans: this.resultData.liabilities[0].bankLoans
          }
        ]
      }
      submitApprove(obj).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message)
        } else {
          this.$message.error(result.message)
        }
      })
    },
    // 审批驳回
    submitVal(val) {
      const params = {
        applyNo: this.$route.query.applyNo,
        createBy: this.resultData.applyUser || '',
        createTime: this.resultData.applyTime,
        guaranteeType: '01',
        id: this.resultData.id,
        name: this.resultData.personBaseRep.customerName,
        opinion: this.resultData.approvalStatus,
        refusalReason: val.context,
        role: this.currentUser.role
      }
      examineReject(params).then(result => {
        if (result.status === 200) {
          releaseOccupyRemove(this.$route.query.applyNo).then(result => {
            if (result.status === 200) {
              this.$message.success(result.message)
            }
          })
          this.$router.push('/cosigner-manage/natural')
          // this.getGuarantorDetail()
          this.$message.success(result.message || '成功')
        }
      })
    },
    // 重新提交
    resubmit() {
      // this.dialogVisible = false
      const obj = {
        applyNo: this.resultData.applyNo,
        approvalLimit: this.resultData.approvalLimit,
        highestEdu: this.resultData.personBaseRep.highestEdu,
        address: this.resultData.personBaseRep.familyAddress,
        liveLimitYear: this.resultData.personBaseRep.liveLimitYear,
        fileMap: this.resultData.listMap,
        finances: this.resultData.finances,
        familyIncomeListDTO: this.resultData.familyIncomeListDTO,
        liabilities: [
          {
            outstandingAccounts: this.resultData.liabilities[0].outstandingAccounts,
            privateLending: this.resultData.liabilities[0].privateLending,
            bankLoans: this.resultData.liabilities[0].bankLoans
          }
        ]
      }
      // 再次调用提交审批接口
      submitApprove(obj).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message || '成功')
          releaseOccupyRemove(this.$route.query.applyNo).then(result => {
            if (result.status === 200) {
              this.$message.success(result.message)
            }
          })
          this.getGuarantorDetail() // 成功后请求详情页数据 + 请求右侧审批状态内容数据（还没添加）
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    formatFamilyIncome(familyIncomeTabData) {
      const Arr = []
      for (const key in familyIncomeTabData) {
        if (Object.prototype.hasOwnProperty.call(familyIncomeTabData, key)) {
          let name = ''
          let label = ''
          let columns = []
          const currentData = []
          if (key === 'acquisitionAssetsDTOS') {
            label = '购置资产'
            name = 'second'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '选择资产类型', align: 'center' },
              { prop: 'yearExpend', label: '支出金额（万）', align: 'center' }
            ]
          } else if (key === 'baseDTOS') {
            label = '基本支出'
            name = 'first'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '支出类型', align: 'center' },
              { prop: 'yearExpend', label: '支出金额（万元）', align: 'center' }
            ]
          } else if (key === 'breedCreateDTOS') {
            label = '养殖'
            name = 'third'
            columns = [
              { prop: 'breedType', label: '养殖种类', align: 'center' },
              { prop: 'breedNum', label: '养殖数量', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'businessCreateDTOS') {
            label = '经商'
            name = 'fourth'
            columns = [
              { prop: 'businessProject', label: '经商项目', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'machineryCreateDTOS') {
            label = '农机服务'
            name = 'fifth'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '服务类型', align: 'center' },
              { prop: 'machineNum', label: '农机数量', align: 'center' },
              { prop: 'serviceArea', label: '服务面积（亩/农机）', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万/农机）', align: 'center' }
            ]
          } else if (key === 'salaryCreateDTOS') {
            label = '固定工资'
            name = 'sixth'
            columns = [
              { prop: 'workCompany', label: '工作单位', align: 'center' },
              { prop: 'workYear', label: '工作年限', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'subsidiesCreateDTOS') {
            label = '政府补贴'
            name = 'serverth'
            columns = [
              { prop: 'governmentSubsidyContent', label: '补贴内容', align: 'center' },
              { prop: 'yearIncome', label: '年补贴金额（万元）', align: 'center' }
            ]
          } else if (key === 'workingCreateDTOS') {
            label = '打工'
            name = 'eighth'
            columns = [
              { prop: 'workNum', label: '打工人数', align: 'center' },
              { prop: 'workContent', label: '工作内容', align: 'center' },
              { prop: 'workArea', label: '打工地区', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元/每）', align: 'center' }
            ]
          } else if (key === 'plantCreateDTOS') {
            label = '种植'
            name = 'nineth'
            columns = [
              { prop: 'incomeChildTypeDes', label: '作物类型', align: 'center' },
              { prop: 'plantArea', label: '种植面积（亩）', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          }
          if (key === 'plantCreateDTOS') {
            familyIncomeTabData[key].map(item => {
              if (item.incomeChildType === '99') {
                item.incomeChildTypeDes = item.otherInfo
              } else {
                item.incomeChildTypeDes = item.incomeChildType$FICDictName
              }
            })
          }
          if (familyIncomeTabData[key].length > 0) {
            if (!Array.isArray(familyIncomeTabData[key])) {
              familyIncomeTabData[key] = Object.values(familyIncomeTabData[key])
            }
            currentData.push({
              label,
              name,
              columns,
              dataSource: familyIncomeTabData[key]
            })
          }
          if (currentData.length) {
            Arr.push({ ...currentData[0] })
          }
        }
      }
      return Arr
    },
    formatFinances(finances) {
      const Arr = []
      for (const key in finances) {
        if (Object.prototype.hasOwnProperty.call(finances, key)) {
          let name = ''
          let label = ''
          let columns = []
          const currentData = []
          if (key === '1') {
            label = '商品房'
            name = 'first'
            columns = [
              {
                prop: 'housingProvince$FICDictName',
                label: '房产地址',
                align: 'center',
                formatter: (row, column, cellValue) => row.housingProvince$FICDictName && row.housingProvince$FICDictName.replace(/,/g, '') + row.housingAddress
              },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (key === '2') {
            label = '自建房'
            name = 'second'
            columns = [
              {
                prop: 'housingProvince$FICDictName',
                label: '房产地址',
                align: 'center',
                formatter: (row, column, cellValue) => row.housingProvince$FICDictName && row.housingProvince$FICDictName.replace(/,/g, '') + row.housingAddress
              },
              { prop: 'housingStructure$FICDictName', label: '房屋结构', align: 'center' },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (key === '99') {
            label = '其他资产'
            name = 'third'
            columns = [
              { prop: 'othreAssertType$FICDictName', label: '资产类型', align: 'center' },
              { prop: 'othreAssertValue', label: '房产价值(万)', align: 'center' }
            ]
          }
          currentData.push({
            label,
            name,
            columns,
            dataSource: finances[key]
          })
          if (currentData.length) {
            Arr.push({ ...currentData[0] })
          }
        }
      }
      return Arr
    },
    formatterMoney(value) {
      return ansFormatter(value)
    }
  }
}
</script>

<style lang='scss' scoped>
.app-container {
  background: #f6f6fa;
  .leftContext {
    background: #fff;
    padding: 10px 24px 0;
    .titleCont .title {
      font-size: 14px;
      padding-left: 6px;
      line-height: 14px;
      border-left: 2px solid #08b448;
      color: #08b448;
      font-weight: 600;
      margin: 10px 0 15px;
    }
  }
  .rightContext {
    word-wrap:break-word;
    background: #fff;
    border: 2px solid #08b347;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    padding: 19px 24px;
    .top {
      overflow: hidden;
      border-bottom: 1px solid #08b448;
      .title {
        float: left;
        font-size: 14px;
        line-height: 14px;
        color: #08b448;
        font-weight: 600;
      }
      .titleRed {
        float: left;
        font-size: 14px;
        padding-left: 6px;
        line-height: 14px;
        color: red;
        font-weight: 600;
        // margin: 10px 0 15px;
      }
      .checkLog {
        float: right;
        margin-top: -14px;
      }
    }
    .context1 {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      font-size: 12px;
      p {
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
      }
      .titleName {
        color: gray;
      }
      p span:nth-child(1) {
        color: gray;
      }
      .el-button {
        width: 100%;
        height: 40px;
        margin-top: 15px;
        margin-left: 0px;
      }
    }
    .context2 {
      box-sizing: border-box;
      padding: 10px;
      margin-top: 10px;
      .bg {
        box-sizing: border-box;
        width: 100%;
        height: 260px;
        background-color: #fbfbfb;
        border: 2px dashed #f5f5f5;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
          width: 50%;
          height: 50%;
          text-align: center;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .context {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    p {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0;
    }
    .titleName {
      color: gray;
    }
    p span:nth-child(1) {
      color: gray;
    }
    .el-button:nth-child(1) {
      background: #409eff;
      border-color: #409eff;
    }
    .el-button {
      width: 90%;
      margin-top: 20px;
      margin-left: 0px;
    }
    .el-button:hover {
      color: #409eff;
      background: #d3e6fa;
    }
  }
  .context3 {
    .opinionWrap {
      padding-left: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgb(187, 187, 187);
      .opinion {
        color: #8f9196 !important;
        margin-top: 20px;
      }
      .opinionContext {
        line-height: 25px;
      }
    }
    .el-button {
      width: 100%;
      height: 40px;
      margin-top: 15px;
      margin-left: 0px;
    }
  }
  .context4 {
    .guaranteeWrap {
      overflow: hidden;
      .title {
        color: grey;
        float: left;
      }
      .money {
        float: right;
      }
    }
    .opinionWrap {
      color: grey;
    }
    .opinionContext {
      line-height: 25px;
    }
  }
  .editBtn {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
