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
            <DescriptionList class="m-l-20" v-if="resultData.applyNo" :content="resultData">
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
                <GuarantorInfo :resultData="resultData" :familyTabData="familyTabData" />
              </el-tab-pane>
              <el-tab-pane label="风险信息提示" name="second">
                <!-- 运管自己的 只展示等级和评分 -->
                <div class="title">风险信息概况</div>
                <DescriptionList class="m-l-20" :content="resultData">
                  <Description label="风险等级">{{ resultData.riskLevel || '--' }}</Description>
                  <Description label="风险评分">{{ resultData.riskScore || '--' }}</Description>
                </DescriptionList>
                <!-- <RiskInformation
                  :riskInformationData="riskInformationData"
                  :hfTabPaneList="hfTabPaneList"
                  :shTabPaneList="shTabPaneList"
                  :antiFraudList="antiFraudList"
                ></RiskInformation> -->
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
    </el-row>
  </div>
</template>

<script>
import { getNaturalPersoDetail } from '@/api/cosigner-manage' // queryGuaranteeApproveLog
import { mapGetters } from 'vuex'
import { ansFormatter } from '@/utils/format'

export default {
  name: 'ConsignerManageNaturalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    GuarantorInfo: () => import('./components/Tab2/GuarantorInfo') // 担保人信息
    // RiskInformation: () => import('./components/Tab2/RiskInformation') // 风险信息提示
  },

  data() {
    return {
      role: '', // 待风险审批
      activeName: 'first',
      resultData: {}, // 保存接口所有的数据
      riskInformationData: {}, // 风险信息
      classifyActive: 'person_marriage_certificate', // 修改的下标 默认为数组的第一项
      fileList: {},
      antiFraudList: [], // 反欺诈数据
      // tab 标头数据
      classifyList: [
        { name: '婚姻证明', value: 'person_marriage_certificate' },
        { name: '户口本', value: 'person_account_book' },
        { name: '银行流水', value: 'person_bank_statement' },
        { name: '家庭资产证明', value: 'person_family_assets' }
      ],
      familyTabData: {
        // 家庭年收入
        familyIncomeTabData: [],
        // 家庭财产状况
        familyPropertyTabData: []
      },
      // 汇法网数据
      hfTabPaneList: [
        {
          label: '执行公开信息',
          name: 'first',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center' },
            { prop: 'executedName', label: '被执行人名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center' },
            { prop: 'executeCourt', label: '执行法院', align: 'center' },
            { prop: 'executeTargetAmount', label: '执行标记(元)', align: 'center' },
            { prop: 'executeContent', label: '执行内容', align: 'center' },
            { prop: 'executeStatus', label: '执行状态', align: 'center' },
            { prop: 'remark', label: '备注', align: 'center' },
            { prop: 'basisNo', label: '执行依据文号', align: 'center' },
            { prop: 'finalTime', label: '终本日期', align: 'center' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '失信老赖',
          name: 'second',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center' },
            { prop: 'executedName', label: '被执行人名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center' },
            { prop: 'executeCourt', label: '执行法院', align: 'center' },
            { prop: 'executeTargetAmount', label: '执行标记(元)', align: 'center' },
            { prop: 'executeContent', label: '执行内容', align: 'center' },
            { prop: 'executeStatus', label: '执行状态', align: 'center' },
            { prop: 'remark', label: '备注', align: 'center' },
            { prop: 'province', label: '省份', align: 'center' },
            { prop: 'performance', label: '履行情况', align: 'center' },
            { prop: 'specificSituation', label: '具体情形', align: 'center' },
            { prop: 'publishTime', label: '发布时间', align: 'center' },
            { prop: 'basisNo', label: '执行依据文号', align: 'center' },
            { prop: 'basisUnit', label: '执行依据单位', align: 'center' },
            { prop: 'finalTime', label: '终本日期', align: 'center' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '限制高消费',
          name: 'third',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'specificTime', label: '具体日期', align: 'center' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center' },
            { prop: 'executeCourt', label: '执行法院', align: 'center' },
            { prop: 'executeContent', label: '执行内容', align: 'center' },
            { prop: 'executeStatus', label: '执行金额(元)', align: 'center' },
            { prop: 'belongToMAP', label: '执行状态', align: 'center' },
            { prop: 'remark', label: '异议备注', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '限制出入境',
          name: 'fourth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'specificTime', label: '具体日期', align: 'center' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center' },
            { prop: 'executeCourt', label: '执行法院', align: 'center' },
            { prop: 'executeContent', label: '执行内容', align: 'center' },
            { prop: 'dateType', label: '日期类别', align: 'center' },
            { prop: 'executeStatus', label: '执行状态', align: 'center' },
            { prop: 'remark', label: '异议备注', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '民商事裁判文书',
          name: 'fifth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'closeTime', label: '结案时间', align: 'center' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'caseNo', label: '案号', align: 'center' },
            { prop: 'litigationPosition', label: '诉讼地位', align: 'center' },
            { prop: 'hearOrgan', label: '审理机关', align: 'center' },
            { prop: 'documentType', label: '文书类型', align: 'center' },
            { prop: 'involvedReason', label: '涉案事由', align: 'center' },
            { prop: 'involvedAmount', label: '涉案金额', align: 'center' },
            { prop: 'hearResult', label: '审理结果', align: 'center' },
            { prop: 'hearProgram', label: '审理程序', align: 'center' },
            { prop: 'hearPerson', label: '审理人员', align: 'center' },
            { prop: 'remark', label: '异议备注', align: 'center' },
            { prop: 'detailUrl', label: '完整内容查看地址', align: 'center' },
            { prop: 'plaintiff', label: '原告当事人', align: 'center' },
            { prop: 'defendant', label: '被告当事人', align: 'center' },
            { prop: 'otherParty', label: '其他当事人', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '民商事审判流程',
          name: 'sixth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'specificTime', label: '具体日期', align: 'center' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'caseNo', label: '案号', align: 'center' },
            { prop: 'litigationPosition', label: '诉讼地位', align: 'center' },
            { prop: 'hearOrgan', label: '审理机关', align: 'center' },
            { prop: 'noticeType', label: '公告类型', align: 'center' },
            { prop: 'involvedReason', label: '涉案事由', align: 'center' },
            { prop: 'noticeContent', label: '公告内容', align: 'center' },
            { prop: 'dateType', label: '日期类别', align: 'center' },
            { prop: 'remark', label: '异议备注', align: 'center' },
            { prop: 'partyPersons', label: '所有当事人', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '罪犯及嫌疑人',
          name: 'seventh',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center' },
            { prop: 'title', label: '标题', align: 'center' },
            { prop: 'handleTime', label: '处理时间', align: 'center' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center' },
            { prop: 'idNo', label: '证件号码', align: 'center' },
            { prop: 'caseNo', label: '案号', align: 'center' },
            { prop: 'hearOrgan', label: '侦查/批捕/审判机关', align: 'center' },
            { prop: 'illegalReason', label: '违法事由', align: 'center' },
            { prop: 'handleResult', label: '处理结果', align: 'center' },
            { prop: 'remark', label: '异议备注', align: 'center' }
          ],
          dataSource: []
        }
      ],
      // 活算网数据
      shTabPaneList: [
        {
          label: '企业股东信息',
          name: 'first',
          columns: [
            { prop: 'inquirerName', label: '查询人姓名', align: 'center' },
            { prop: 'companyName', label: '企业(机构)名称', align: 'center' },
            { prop: 'registerNo', label: '注册号', align: 'center' },
            { prop: 'companyType', label: '企业(机构)类型', align: 'center' },
            { prop: 'registerCapital', label: '注册资本(万元)', align: 'center' },
            { prop: 'registerCurrency', label: '注册资本币种', align: 'center' },
            { prop: 'companyStatus', label: '企业状态', align: 'center' },
            { prop: 'investmentAmount', label: '认缴出资额(万元)', align: 'center' },
            { prop: 'investmentCurrency', label: '认缴出资币种', align: 'center' },
            { prop: 'investmentForm', label: '出资方式', align: 'center' },
            { prop: 'investmentRatio', label: '出资比例', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '法人代表信息',
          name: 'second',
          columns: [
            { prop: 'inquirerName', label: '查询人姓名', align: 'center' },
            { prop: 'companyName', label: '企业(机构)名称', align: 'center' },
            { prop: 'registerNo', label: '注册号', align: 'center' },
            { prop: 'companyType', label: '企业(机构)类型', align: 'center' },
            { prop: 'registerCapital', label: '注册资本(万元)', align: 'center' },
            { prop: 'registerCurrency', label: '注册资本币种', align: 'center' },
            { prop: 'companyStatus', label: '企业状态', align: 'center' }
          ],
          dataSource: []
        },
        {
          label: '企业法定代表人信息',
          name: 'third',
          columns: [
            { prop: 'inquirerName', label: '查询人姓名', align: 'center' },
            { prop: 'companyName', label: '企业(机构)名称', align: 'center' },
            { prop: 'registerNo', label: '注册号', align: 'center' },
            { prop: 'companyType', label: '企业(机构)类型', align: 'center' },
            { prop: 'registerCapital', label: '注册资本(万元)', align: 'center' },
            { prop: 'registerCurrency', label: '注册资本币种', align: 'center' },
            { prop: 'companyStatus', label: '企业状态', align: 'center' },
            { prop: 'post', label: '职务', align: 'center' }
          ],
          dataSource: []
        }
      ]
    }
  },
  created() {
    this.getGuarantorDetail()
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async getGuarantorDetail() {
      const result = await getNaturalPersoDetail({ applyNo: this.$route.query.applyNo })
      if (result.status === 200) {
        this.resultData = result.data || {}
        this.fileList = result.data.listMap || {} // 数据返回的 图片字段需要处理为thumbnailUrl
        this.antiFraudList =
          result.data.personBaseRep.riskTipsOutDTO && result.data.personBaseRep.riskTipsOutDTO.data.baiRongDTO.matchNodesDTOList // 反欺诈数据
        if (result.data.personBaseRep.riskTipsOutDTO && result.data.personBaseRep.riskTipsOutDTO.data.huiFaDTO) {
          const obj = result.data.personBaseRep.riskTipsOutDTO.data.huiFaDTO || {}
          this.hfTabPaneList[0].dataSource = obj.executePublicDTO || [] // 执行公开信息
          this.hfTabPaneList[1].dataSource = obj.dishonestDTO || [] // 失信老赖
          this.hfTabPaneList[2].dataSource = obj.limitConsumptionDTO || [] // 限制高消费
          this.hfTabPaneList[3].dataSource = obj.limitEntryExitDTO || [] // 限制出入境
          this.hfTabPaneList[4].dataSource = obj.lawDocumentDTO || [] // 民商事裁判文书
          this.hfTabPaneList[5].dataSource = obj.lawFlowDTO || [] // 民商事审判流程
          this.hfTabPaneList[6].dataSource = obj.lawCriminalDTO || [] // 罪犯及嫌疑人
        }
        if (result.data.personBaseRep.riskTipsOutDTO && result.data.personBaseRep.riskTipsOutDTO.data.suanHuaDTO) {
          const obj = result.data.personBaseRep.riskTipsOutDTO.data.suanHuaDTO || {}
          this.shTabPaneList[0].dataSource = obj.shareHolderDTO || [] // 企业股东信息
          this.shTabPaneList[1].dataSource = obj.legalRepresentativeDTO || [] // 法人代表信息
          this.shTabPaneList[2].dataSource = obj.managerDTO || [] // 企业法定代表人信息
        }
        if (result.data.personBaseRep.riskTipsOutDTO) {
          this.riskInformationData = result.data.personBaseRep.riskTipsOutDTO.data
        } else {
          this.riskInformationData = {}
        }
        this.familyTabData.familyIncomeTabData = this.formatFamilyIncome(result.data.familyIncomeListDTO)
        this.familyTabData.familyPropertyTabData = this.formatFinances(result.data.finances)
      } else {
        this.$message.error(result.message || '失败')
      }
    },
    // 获取日志信息
    // async getQueryGuaranteeApproveLog() {
    //   const result = await queryGuaranteeApproveLog({ applyNo: '193872838741286912', guaranteeType: '01' })
    //   if (result.status === 200) {
    //     this.logData = result.data
    //   }
    // },
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
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
                formatter: (row, column, cellValue) =>
                  row.housingProvince$FICDictName && row.housingProvince$FICDictName.replace(/,/g, '') + row.housingAddress
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
                formatter: (row, column, cellValue) =>
                  row.housingProvince$FICDictName && row.housingProvince$FICDictName.replace(/,/g, '') + row.housingAddress
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
        padding-right: 10px;
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
      padding-right: 10px;
      line-height: 25px;
    }
  }
  .editBtn {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
