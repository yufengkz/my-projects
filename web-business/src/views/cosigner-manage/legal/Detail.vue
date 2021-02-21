<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="leftContext">
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
      <el-col :span="6" class="loogLog">
        <div class="rightContext" :style="{ height: (resultData.approvalStatus === '3' && currentUser.role === '金融专员')  || resultData.approvalStatus === '4' || resultData.approvalStatus === '5' || resultData.approvalStatus === '10' ? '' : 'auto' }">
          <div class="top">
            <!-- 状态的值根据后端返回来的值展示 -->
            <div class="title" :class="[sign ? 'titleRed' : 'title']">{{creditStatus[resultData.approvalStatus * 1]}}</div>
            <div class="checkLog">
              <CosignerDetailDialog @showLog="showLog" :content="logData" />
            </div>
          </div>
          <div v-if="resultData.approvalStatus === '3' && currentUser.role === '金融经理'" class="context1">
            <CosignerConfirmationDialog style="width: 100%" title="确定要提交？" buttonName="确认展业" @resubmit="resubmit" prop="confirmationDialog" />
            <el-button type="success" size="mini" @click=goToAdd>去修改</el-button>
            <ApproveReject @submitVal="submitVal"/>
          </div>
          <div v-else-if="resultData.approvalStatus === '3' || (resultData.approvalStatus === '4' && currentUser.role === '金融经理') || resultData.approvalStatus === '5' || resultData.approvalStatus === '10'" class="context2">
            <div class="bg">
              <!-- 待金融经理提交 -->
              <div v-if="resultData.approvalStatus === '3'">
                <img src="@/assets/detail/manager.png" alt="">
                <p>金融经理审批中</p>
              </div>
              <!-- 金融经理驳回 -->
              <div v-else-if="resultData.approvalStatus === '4'">
                <img src="@/assets/detail/notarize.png" alt="">
                <p>待专员确认</p>
              </div>
              <!-- 待风险审批 -->
              <div v-else-if="resultData.approvalStatus === '5'">
                <img src="@/assets/detail/examine.png" alt="">
                <p>风险审批中</p>
              </div>
              <!-- 放弃展业 -->
              <div v-else-if="resultData.approvalStatus === '10'">
                <img src="@/assets/detail/givup.png" alt="">
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
            <CosignerConfirmationDialog :showBtn="showBtn" :title="(resultData.approvalStatus === '7' && currentUser.role === '金融经理' ) ? '只有一次复议的机会，您确认复议提交?' : '确定重新提交风控审核？'" :buttonName="(resultData.approvalStatus === '7' && currentUser.role === '金融经理' ) ? '复议提交' : '重新提交'" @resubmit="resubmit" prop="confirmationDialog"/>
            <el-button :disabled="showBtn" type="success" size="mini" @click=goToAdd>去修改</el-button>
          </div>
          <div v-else-if="resultData.approvalStatus === '8' || resultData.approvalStatus === '9' || resultData.approvalStatus === '11'"  class="context4" >
            <div v-if="resultData.approvalStatus === '9' && resultData.approvalStatus !== '11'" class="guaranteeWrap">
              <p class="title" >审批担保金额</p>
              <p class="money">{{resultData.approvalLimit}}</p>
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
import { legalPersonDetail, ApproveLog, legalPersonSubmitApprove, examineReject, releaseLegalPersonOccupyRemove } from '@/api/cosigner-manage'
import { queryIpToDataForLog, queryByType } from '@/api/common'
import { mapGetters } from 'vuex'
import { ansFormatter } from '@/utils/tool.js'

export default {
  name: 'CosignerManageLegalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    CosignerDetailDialog: () => import('@/components/CosignerDetailDialog'),
    CosignerConfirmationDialog: () => import('@/components/CosignerConfirmationDialog'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    GuarantorInfo: () => import('./components/GuarantorInfo'),
    ApproveReject: () => import('./components/ApproveReject')
  },
  data() {
    return {
      shuju: '',
      creditStatus: {
        1: '待展业',
        2: '待完善资料',
        3: '待金融经理提交', // 经理 三个按钮  专员 图片
        4: '金融经理驳回', // 专员 文字+按钮 经理 图片
        5: '待风险审批', // 经理和专员 图片
        6: '审批退回待提交', // 经理和专员 文字+按钮
        7: '审批拒绝待复议', // 经理 文字+按钮
        9: '审批通过', // 经理和专员 文字
        10: '放弃展业', // 经理和专员 图片
        11: '审批拒绝' // 经理和专员 文字
      },
      classifyList: [], // 影像资料标题数据
      fileList: {}, // 图片数据  key是健名 value 是图片数组
      currrentlStatus: '', // 状态值
      resultData: {}, // 当前单号信息
      activeName: 'first',
      classifyActive: 'legal_company_constitution', // 修改的下标 默认为数组的第一项
      logData: [], // 查看日志数据
      dialogVisible: false,
      detailLog: [], // 右侧审批数据
      refusalReason: '' // 驳回原因
    }
  },
  created() {
    this.getLegalPersonDetail()
  },
  mounted() {
    queryByType({ type: 'legalGuaranteeImageType' }).then(res => {
      if (res.status === 200) {
        this.classifyList = res.data
        this.classifyActive = this.classifyList[0].code
      }
    })
  },
  computed: {
    // 角色 currentUser.role '金融经理'，'金融专员'
    ...mapGetters(['currentUser', 'commonEnum']),
    // 控制右上角标题的样式
    sign() {
      return this.resultData.approvalStatus === '4' || this.resultData.approvalStatus === '6' || this.resultData.approvalStatus === '7' || this.resultData.approvalStatus === '11'
    },
    showBtn() {
      return this.resultData.approvalStatus === '7' && this.currentUser.role === '金融专员'
    }
  },
  methods: {
    // 获取详情页
    async getLegalPersonDetail() {
      const result = await legalPersonDetail(this.$route.query.applyNo)
      if (result.status === 200) {
        this.resultData = result.data
        this.fileList = result.data.listMap // 数据返回的 图片字段需要处理为thumbnailUrl
        this.getQueryIpToDataForLog() // 调用接口获取右侧审批内容
      } else {
        this.$message.error(result.data || '失败')
      }
    },
    // 获取右侧审批状态
    getQueryIpToDataForLog() {
      queryIpToDataForLog({ applyNo: this.$route.query.applyNo, guaranteeType: '02', opinion: this.resultData.approvalStatus }).then(res => {
        if (res.status === 200) {
          this.detailLog = res.data
        }
      })
    },
    // 获取日志信息
    async getQueryGuaranteeApproveLog() {
      const result = await ApproveLog({ applyNo: this.$route.query.applyNo, guaranteeType: '02' })
      if (result.status === 200) {
        this.logData = result.data
      } else {
        this.logData = []
      }
    },
    handleClick(tab, event) {
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    // 提交审批接口
    submitApprove() {
      const params = {
        applyNo: this.$route.query.applyNo,
        proposalLimit: this.resultData.proposalLimit
      }
      legalPersonSubmitApprove(params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          // 释放担保法人占用
          releaseLegalPersonOccupyRemove(this.$route.query.applyNo).then(result => {
            if (result.status === 200) {
              this.$message.success(result.message)
            } else {
              this.$message.error(result.message)
            }
          })
          this.getLegalPersonDetail()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 展示日志
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    // 去修改
    goToAdd() {
      this.$router.push({ path: '/cosigner-manage/legal/add', query: { applyNo: this.$route.query.applyNo } })
    },
    // 重新提交
    resubmit() {
      this.submitApprove()
    },
    // 驳回按钮操作
    submitVal(val) {
      const params = {
        applyNo: this.resultData.applyNo,
        refusalReason: val.context,
        guaranteeType: '02'
      }
      examineReject(params).then(res => {
        // 释放担保法人占用
        releaseLegalPersonOccupyRemove(this.$route.query.applyNo).then(result => {
          if (result.status === 200) {
            this.$message.success(result.message)
          } else {
            this.$message.error(result.message)
          }
        })
        this.$router.push('/cosigner-manage/legal')
      })
    },
    // 对话框的右上角关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  background: #f6f6fa;
  .leftContext {
    background: #fff;
    padding: 10px 24px 0;
    .titleCont {
      .title {
        font-size: 14px;
        // padding-left: 6px;
        line-height: 14px;
        border-left: 2px solid #08b448;
        color: #08b448;
        font-weight: 600;
        margin: 10px 0 15px;
      }
    }
  }
  .loogLog {
    // width: 300px;
    .rightContext {
      word-wrap:break-word;
      // height: 400px;
      background: #fff;
      border: 2px solid #08b347;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
      padding: 20px;
      font-size: 14px;
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
          // padding-left: 6px;
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
          width: 100% !important;
          height: 40px;
          margin-top: 15px;
          margin-left: 0px;
        }
      }
      .context2 {
        box-sizing: border-box;
        // padding: 10px;
        margin-top: 10px;
        .bg {
          margin-top: 20px;
          box-sizing: border-box;
          width: 100%;
          height: 260px;
          background-color:#FBFBFB;
          border: 2px dashed #F5F5F5;
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
      .context3 {
        .opinionWrap {
          // padding-left: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgb(187, 187, 187);
          .opinion {
            color: #8F9196 !important;
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
        // padding-left: 10px;
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
    }
  }
}
</style>
