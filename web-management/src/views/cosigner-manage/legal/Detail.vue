<template>
  <div class="container">
    <div class="fixd-btn">
      <el-button plain size="mini" @click="goBack">返回</el-button>
    </div>
    <el-row>
      <el-col :span="24">
        <div class="leftContext">
          <div class="titleCont">
            <div class="title">基本信息</div>
            <DescriptionList class="m-l-20" :content="resultData">
              <Description label="流水号">{{ resultData.applyNo }}</Description>
              <Description label="MAP中心">{{ resultData.mapName }}</Description>
              <Description label="申请人">{{ resultData.applyUser }}</Description>
              <Description label="可担保金额">
                {{ resultData.availableLimit ? resultData.availableLimit + '元' : '--' }}
              </Description>
              <Description label="担保有效期">{{ resultData.validTerm }}</Description>
              <Description label="客户申请时间">{{ resultData.applyTime }}</Description>
              <Description label="MAP中心提交时间">{{ resultData.mapSubmitTime }}</Description>
              <Description label="更新时间">{{ resultData.updatedTime }}</Description>
              <!-- 运管自己的 -->
              <Description label="状态">{{ resultData.approvalStatus$FICDictName }}</Description>
              <Description label="截至日期">{{ resultData.deadline }}</Description>
              <Description label="担保情况">{{ resultData.guaranteeStatus$FICDictName }}</Description>
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
    </el-row>
  </div>
</template>
<script>
// import { legalPersonDetail, queryGuaranteeApproveLog } from '@/api/cosigner-manage'
import { getLegalPersonDetail } from '@/api/cosigner-manage'
// import { mapGetters } from 'vuex'

export default {
  name: 'CosignerManageLegalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    GuarantorInfo: () => import('./components/GuarantorInfo')
  },
  data() {
    return {
      // creditStatus: {
      //   1: '待展业',
      //   2: '待完善资料',
      //   3: '待金融经理提交',
      //   4: '金融经理驳回',
      //   5: '待风险审批',
      //   6: '审批退回待提交',
      //   7: '审批拒绝待复议',
      //   8: '有条件审批通过',
      //   9: '审批通过',
      //   10: '放弃展业',
      //   11: '审批拒绝'
      // },
      // roleId: '02', // 角色值 01 金融经理 02 专员
      resultData: {}, // 当前单号信息
      activeName: 'first',
      classifyActive: 'legal_company_constitution', // 修改的下标 默认为数组的第一项
      // tab 标头数据
      classifyList: this.$store.state.base.imageTabs,
      // 图片数据  key是健名 value 是图片数组
      fileList: {}
      // 日志数据
      // logData: []
    }
  },
  created() {
    this.getLegalPersonDetail()
  },
  mounted() {},
  computed: {},
  methods: {
    async getLegalPersonDetail() {
      // const result = await legalPersonDetail('194520539937996800')
      const result = await getLegalPersonDetail({ applyNo: this.$route.query.applyNo })
      if (result.status === 200) {
        this.resultData = result.data
        this.classifyActive = this.classifyList[0].value.toLowerCase() // 获取到map对象取第0位 显示对应的高亮
        this.fileList = result.data.listMap // 数据返回的 图片字段需要处理为thumbnailUrl
      } else {
        this.$message.error(result.data || '失败')
      }
    },
    // // 获取日志信息
    // async getQueryGuaranteeApproveLog() {
    //   const result = await ApproveLog({ applyNo: this.$route.query.applyNo, guaranteeType: '02' })
    //   if (result.status === 200) {
    //     console.log('获取日志信息', result.data)
    //     this.logData = result.data
    //   } else {
    //     this.logData = []
    //   }
    // },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    goBack() {
      history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background: #f6f6fa;
  .leftContext {
    background: #fff;
    padding: 10px 24px 0;
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
  .rightContext {
    background: #fff;
    border: 2px solid #08b347;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    padding: 19px 24px;
  }
  .top {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #08b448;
    flex-wrap: wrap;
    .title {
      font-size: 14px;
      line-height: 14px;
      color: #08b448;
      font-weight: 600;
    }
    .titleRed {
      font-size: 14px;
      padding-left: 6px;
      line-height: 14px;
      color: red;
      font-weight: 600;
      margin: 10px 0 15px;
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
    // .el-button:nth-of-type(1) {
    //   background: #409eff;
    //   border-color: #409eff;
    // }
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
  // .context2 {
  // }
}
</style>
