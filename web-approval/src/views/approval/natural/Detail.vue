<template>
  <div class="approveNaturalDetail">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="leftContext">
          <el-tabs v-model="activeName" @tab-click="handleClick" ref="detailTabs">
            <el-tab-pane label="审批信息" name="first">
              <div>
                <div class="titleCont">
                  <div class="title">基本信息</div>
                  <DescriptionList class="m-l-20" :content="resultData">
                    <Description label="流水号">{{resultData.applyNo}}</Description>
                    <Description label="MAP中心">{{resultData.mapName}}</Description>
                    <Description label="申请人">{{resultData.applyUser}}</Description>
                    <Description label="建议申请担保金额">{{ Number(resultData.proposalLimit) === 0 ? '--' :resultData.proposalLimit }}</Description>
                    <Description label="担保有效期">{{resultData.validTerm}}</Description>
                    <Description label="客户申请时间">{{resultData.applyTime}}</Description>
                    <Description label="MAP中心提交时间">{{resultData.mapSubmitTime}}</Description>
                    <Description label="更新时间">{{infoTime.updatedTime || '--'}}</Description>
                  </DescriptionList>
                </div>
                <!-- Tab2 第二个选项卡 -->
                <div class="titleCont">
                  <el-tabs v-model="activeTwoName" @tab-click="handleTab2Click">
                    <el-tab-pane label="担保人信息" name="first">
                      <GuarantorInfo
                        :resultData="resultData"
                        :familyPropertyTabData="familyPropertyTabData"
                        :liabilities="liabilities"
                      />
                    </el-tab-pane>
                    <el-tab-pane label="风险信息提示" name="second">
                      <RiskInformation
                        :riskInformationData="riskInformationData"
                        :hfTabPaneList="hfTabPaneList"
                        :shTabPaneList="shTabPaneList"
                        :antiFraudList="antiFraudList"
                      />
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
            </el-tab-pane>
            <el-tab-pane label="征信报告" name="second" v-if="isShow">
              <CreditReport />
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="third">
              <ApprovalLog  :activities="activities" />
            </el-tab-pane>
            <el-tab-pane label="历史审批记录" name="fourth" v-if="isShow">
              <HistoricalApprovalRecord />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="rightContext" v-show="rightFlag">
          <div class="title">风险审批</div>
            <div v-if="isApproval">
              <!-- 风险审批提交前 -->
              <RiskApprovalForm @onSubmit="onSubmit" @onSaveDrafts="onSaveDrafts" :resultOptions="resultOptions" :sendBackOptions="sendBackOptions" :riskApprovaResult="riskApprovaResult" :maxMoney="maxMoney" :approveAmount="examineData.approveAmount"/>
            </div>
            <div v-else>
              <!-- 审批查看 通过-->
              <div class="approveShow" v-if="riskApprovaResult.examineResult === '000'">
                <li>
                  <span class="name">审批结果</span>
                  <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
                </li>
                <li>
                  <span class="name">担保金额</span>
                  <span>{{riskApprovaResult.grantAmount}} (元)</span>
                </li>
                <!-- fromOrderNo  存在的话自然人担保进件审批查看 否者自然人担保独立审批流程-->
                <template v-if="fromOrderNo">
                  <el-divider></el-divider>
                  <li style="font-size: 14px;">被担保人</li>
                  <div v-for="(item,index) in riskApprovaResult.guaranteePersonOutDTOS" :key="index">
                    <li>
                      <span class="name">姓名</span>
                      <span>{{item.customerName}}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                      <span class="name" >审批利率</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? item.grantRate + '% (年)' : '审批中'  }}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                      <span class="name" >贷款到期日</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? item.grantRepayMonth + '月' + item.grantRepayDay + '日' : '审批中'}}</span>
                    </li>
                  </div>
                  <el-divider></el-divider>
                </template>
                <li>
                  <span class="name">审批意见</span>
                </li>
                <div class="text">{{riskApprovaResult.examineOpinion}}</div>
              </div>
              <!-- 审批查看 退回-->
              <div class="approveShow" v-if="riskApprovaResult.examineResult === '010' ">
                <li>
                  <span class="name">审批结果</span>
                  <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
                </li>
                <li>
                  <span class="name">退回目标</span>
                  <span>{{riskApprovaResult.submitUserLevel$FICDictName}}</span>
                </li>
                <li>
                  <span class="name">审批意见</span>
                  <!-- <span class="name">退回原因</span> -->
                </li>
                <div class="text">{{riskApprovaResult.examineOpinion}}</div>
              </div>
              <!-- 审批查看 拒绝-->
              <div class="approveShow" v-if="riskApprovaResult.examineResult === '020' ">
                <li>
                  <span class="name">审批结果</span>
                  <span class="active" v-if="examineData.status !== '11'">MAP中心处理中</span>
                  <span class="on" v-else>{{riskApprovaResult.examineResult$FICDictName}}</span>
                </li>
                <li>
                  <!-- <span class="name">拒绝原因</span> -->
                  <span class="name">审批意见</span>
                </li>
                <div class="text">{{riskApprovaResult.examineOpinion}}</div>
              </div>
              <!-- 审批查看 有条件通过-->
              <div class="approveShow" v-if="riskApprovaResult.examineResult === '040'">
                <li>
                  <span class="name">审批结果</span>
                  <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
                </li>
                <li>
                  <span class="name">担保金额</span>
                  <span>{{riskApprovaResult.grantAmount}} (元)</span>
                </li>
                <!-- fromOrderNo  存在的话自然人担保进件审批查看 否者自然人担保独立审批流程-->
                <template v-if="fromOrderNo">
                  <el-divider></el-divider>
                  <li style="font-size: 14px;">被担保人</li>
                  <div v-for="(item,index) in riskApprovaResult.guaranteePersonOutDTOS" :key="index">
                    <li>
                      <span class="name">姓名</span>
                      <span>{{item.customerName}}</span>
                    </li>
                    <li >
                      <span class="name" >审批利率</span>
                      <span>{{ item.grantRate + '% (年)' }}</span>
                    </li>
                    <li>
                      <span class="name" >贷款到期日</span>
                      <span>{{item.grantRepayMonth + '月' + item.grantRepayDay + '日'}}</span>
                    </li>
                  </div>
                  <el-divider></el-divider>
                </template>
                <li>
                  <span class="name">审批意见</span>
                </li>
                <div class="text">{{riskApprovaResult.examineOpinion}}</div>
              </div>
            </div>
            <!-- 审批查看 审批中 N是显示回写状态 010为不是退回状态-->
            <div class="approveShow" v-if="riskApprovaResult.is === 'N' && riskApprovaResult.examineResult  === '030' " >
              <li>
                <span class="name">审批结果</span>
                <span class="active">{{riskApprovaResult.submitUserLevel$FICDictName + '中'}}</span>
              </li>
              <li>
                <span class="name">担保金额</span>
                <span>{{riskApprovaResult.grantAmount}} (元)</span>
              </li>
              <template v-if="fromOrderNo">
                 <el-divider></el-divider>
                  <li style="font-size: 14px;">被担保人</li>
                  <div v-for="(item,index) in riskApprovaResult.guaranteePersonOutDTOS" :key="index">
                    <li>
                      <span class="name">姓名</span>
                      <span>{{item.customerName}}</span>
                    </li>
                    <li >
                      <span class="name" >审批利率</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? item.grantRate + '% (年)' : '审批中'  }}</span>
                    </li>
                    <li>
                      <span class="name" >贷款到期日</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? item.grantRepayMonth + '月' + item.grantRepayDay + '日' : '审批中'}}</span>
                    </li>
                  </div>
                  <el-divider></el-divider>
                </template>
              <li>
                <span class="name">审批意见</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
          <!-- <div class="approveShow" v-if="fromOrderNo">
            <li>
              <span class="name">审批结果</span>
              <span class="active" v-if="riskApprovaResult.examineResult === '030'">审批中</span>
              <span class="active" v-else >{{riskApprovaResult.examineResultDesc}}</span>
            </li>
            <li>
              <span class="name">担保金额</span>
              <span>{{riskApprovaResult.grantAmount}} (元)</span>
            </li>
            <el-divider></el-divider>
            <li style="font-size: 14px;">被担保人</li>
            <div v-for="(item,index) in riskApprovaResult.guaranteePersonOutDTOS" :key="index">
              <li>
                <span class="name">姓名</span>
                <span>{{item.customerName}}</span>
              </li>
              <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                <span class="name" >审批利率</span>
                <span>{{riskApprovaResult.examineResult === "000" ? item.grantRate + '% (年)' : '审批中'  }}</span>
              </li>
              <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                <span class="name" >贷款到期日</span>
                <span>{{riskApprovaResult.examineResult === "000" ? item.grantRepayMonth + '月' + item.grantRepayDate + '日' : '审批中'}}</span>
              </li>
            </div>
            <el-divider></el-divider>
            <li>
              <span class="name">审批意见</span>
            </li>
            <div class="text" v-if="riskApprovaResult.examineResult !== '030'">{{riskApprovaResult.examineOpinion}}</div>
          </div> -->
        </div>
      </el-col>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      :before-close="handleClose">
      <el-divider></el-divider>
      <span>{{ dialogDetailsText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTraceLog,
  getNaturalDetail,
  getApproveTypeSelect,
  approveSubmitForApproval,
  naturalSubmitTraceStaging,
  getQueryReturnApprovalLevelStatus
} from '@/api/approval'
import { ansFormatter } from '@/utils/format'
import { mapGetters } from 'vuex'

export default {
  name: 'ApproveNaturalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    GuarantorInfo: () => import('./components/Tab2/GuarantorInfo'),
    RiskInformation: () => import('./components/Tab2/RiskInformation'),
    RiskApprovalForm: () => import('./components/RiskApprovalForm'),
    CreditReport: () => import('./components/CreditReport'), // 征信报告
    ApprovalLog: () => import('@/components/ApprovalLog'), // 审批日志
    HistoricalApprovalRecord: () => import('./components/HistoricalApprovalRecord') // 历史审批记录
  },
  data() {
    return {
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
      dialogDetailsText: '',
      dialogVisible: false,
      dialogTitle: '',
      maxMoney: 0, // 限制最大金额
      infoTime: {}, // 更新时间 map中心提交时间
      examineData: {}, // 审批中状态
      activities: [], // 审批日志数据
      rightFlag: false, // 显示右边区域 防止进入页面请求延迟显示
      isApproval: true, // 是否需要显示
      fromOrderNo: '', // 担保进件审批查看
      activeName: 'first',
      activeTwoName: 'first',
      isShow: true, // true 需要显示历史审批记录列表 false 不需要显示
      classifyActive: 'person_marriage_certificate', // 修改的下标 默认为数组的第一项
      // tab 标头数据
      classifyList: [
        { name: '婚姻证明', value: 'person_marriage_certificate' },
        { name: '户口本', value: 'person_account_book' },
        { name: '银行流水', value: 'person_bank_statement' },
        { name: '家庭资产证明', value: 'person_family_assets' }
      ],
      familyPropertyTabData: [
        // {
        //   label: '自建房',
        //   name: 'first',
        //   dataSource: [],
        //   columns: [
        //     { prop: 'housingAddress', label: '房产地址', align: 'center' },
        //     { prop: 'housingStructure$FICDictName', label: '房屋结构', align: 'center' },
        //     { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
        //     { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
        //   ]
        // },
        // {
        //   label: '商品房',
        //   name: 'second',
        //   dataSource: [],
        //   columns: [
        //     { prop: 'housingAddress', label: '房产地址', align: 'center' },
        //     { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
        //     { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
        //   ]
        // },
        // {
        //   label: '其他资产',
        //   name: 'third',
        //   dataSource: [],
        //   columns: [
        //     { prop: 'othreAssertType$FICDictName', label: '资产类型', align: 'center' },
        //     { prop: 'othreAssertValue', label: '房产价值(万)', align: 'center' }
        //   ]
        // }
      ],
      riskApprovaResult: {}, // 风险审批结果
      resultData: {}, // 接口返回的data数据
      riskInformationData: {}, // 风险提示信息数据
      liabilities: {}, // 保存负债信息
      fileList: {}, // 图片数据  key是健名 value 是图片数组
      // 汇法网数据
      hfTabPaneList: [
        {
          label: '执行公开信息',
          name: 'first',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeTargetAmount', label: '执行标的(元)', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '执行内容', 'executeContent') },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '备注', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '备注', 'remark') },
            { prop: 'basisNo', label: '执行依据文号', align: 'center', width: '150' },
            { prop: 'finalTime', label: '终本日期', align: 'center', width: '150' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center', width: '150' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '失信老赖',
          name: 'second',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeTargetAmount', label: '执行标的(元)', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '执行内容', 'executeContent') },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '备注', align: 'center', width: '150' },
            { prop: 'province', label: '省份', align: 'center', width: '150' },
            { prop: 'performance', label: '履行情况', align: 'center', width: '150' },
            { prop: 'specificSituation', label: '具体情形', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '具体情形', 'specificSituation') },
            { prop: 'publishTime', label: '发布时间', align: 'center', width: '150' },
            { prop: 'basisNo', label: '执行依据文号', align: 'center', width: '150' },
            { prop: 'basisUnit', label: '执行依据单位', align: 'center', width: '150' },
            { prop: 'finalTime', label: '终本日期', align: 'center', width: '150' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center', width: '150' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '限制高消费',
          name: 'third',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'specificTime', label: '具体日期', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '执行内容', 'executeContent') },
            { prop: 'executeAmount', label: '执行金额(元)', align: 'center', width: '150' },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '限制出入境',
          name: 'fourth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'specificTime', label: '具体日期', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '执行内容', 'executeContent') },
            { prop: 'dateType', label: '日期类别', align: 'center', width: '150' },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '民商事裁判文书',
          name: 'fifth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'closeTime', label: '结案时间', align: 'center', width: '150' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'caseNo', label: '案号', align: 'center', width: '150' },
            { prop: 'litigationPosition', label: '诉讼地位', align: 'center', width: '150' },
            { prop: 'hearOrgan', label: '审理机关', align: 'center', width: '150' },
            { prop: 'documentType', label: '文书类型', align: 'center', width: '150' },
            { prop: 'involvedReason', label: '涉案事由', align: 'center', width: '150' },
            { prop: 'involvedAmount', label: '涉案金额', align: 'center', width: '150' },
            { prop: 'hearResult', label: '审理结果', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '审理结果', 'hearResult') },
            { prop: 'hearProgram', label: '审理程序', align: 'center', width: '150' },
            { prop: 'hearPerson', label: '审理人员', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' },
            { prop: 'detailUrl', label: '完整内容查看', align: 'center', width: '150', render: this.detailUrlRender },
            { prop: 'plaintiff', label: '原告当事人', align: 'center', width: '150' },
            { prop: 'defendant', label: '被告当事人', align: 'center', width: '150' },
            { prop: 'otherParty', label: '其他当事人', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '民商事审判流程',
          name: 'sixth',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'specificTime', label: '具体日期', align: 'center', width: '150' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'caseNo', label: '案号', align: 'center', width: '150' },
            { prop: 'litigationPosition', label: '诉讼地位', align: 'center', width: '150' },
            { prop: 'hearOrgan', label: '审理机关', align: 'center', width: '150' },
            { prop: 'noticeType', label: '公告类型', align: 'center', width: '150' },
            { prop: 'involvedReason', label: '涉案事由', align: 'center', width: '150' },
            { prop: 'noticeContent', label: '公告内容', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '公告内容', 'noticeContent') },
            { prop: 'dateType', label: '日期类别', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' },
            { prop: 'partyPersons', label: '所有当事人', align: 'center', width: '150' }
          ],
          dataSource: []
        },
        {
          label: '罪犯及嫌疑人',
          name: 'seventh',
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'handleTime', label: '处理时间', align: 'center', width: '150' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'caseNo', label: '案号', align: 'center', width: '150' },
            { prop: 'hearOrgan', label: '侦查/批捕/审判机关', align: 'center', width: '150' },
            { prop: 'illegalReason', label: '违法事由', align: 'center', width: '150' },
            { prop: 'handleResult', label: '处理结果', align: 'center', width: '150', render: (h, params) => this.renderFun(h, params, '处理结果', 'handleResult') },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
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
      ],
      antiFraudList: [],
      // 审批结果 下拉数组
      resultOptions: [
        // { label: '审批通过', value: 1000 },
        // { label: '审批拒绝', value: 4000 },
        // { label: '审批退回', value: 3000 }
        // { label: '有条件通过', value: 2000 }
      ],
      // 退回目标 下拉数组
      sendBackOptions: []
    }
  },
  created() {},
  mounted() {
    this.isShowTab()
    this.getDetailInfo() // 获取详情数据
    this.getSelectStatus() // 获取退回下拉框
    this.getApproveTypeSelectFun()
  },
  computed: {
    ...mapGetters(['commonEnum', 'currentUser'])
  },
  methods: {
    // 完整内容查看
    detailUrlRender(h, params) {
      return h('div', [
        h(
          'span',
          {
            style: {
              padding: '0 5px',
              display: 'inline-block',
              border: '1px solid #08b448',
              borderRadius: '4px',
              color: '#08b448',
              cursor: 'pointer'
            },
            on: {
              click: () => {
                window.open(params.row.detailUrl, '_blank')
              }
            }
          },
          '查看'
        )
      ])
    },
    handleClose() {
      this.dialogDetailsText = ''
      this.dialogVisible = false
      this.dialogTitle = ''
    },
    // render公共处理方法
    renderFun(h, params, title, key) {
      return h('div', [
        h(
          'span',
          params.row[key] ? {
            style: {
              padding: '0 5px',
              display: 'inline-block',
              border: '1px solid #08b448',
              borderRadius: '4px',
              color: '#08b448',
              cursor: 'pointer'
            },
            on: {
              click: () => {
                this.dialogDetailsText = params.row[key]
                this.dialogTitle = title
                this.dialogVisible = true
              }
            }
          } : '-',
          params.row[key] ? '查看' : '-'
        )
      ])
    },
    // 获取详情
    getDetailInfo() {
      const params = {
        applyNo: this.$route.query.applyNo
      }
      getNaturalDetail(params).then(result => {
        if (result.status === 200) {
          this.rightFlag = true
          this.maxMoney = +result.data.data.approvalLimit
          // 处理金额千分位
          result.data.data.approvalLimit = ansFormatter(result.data.data.approvalLimit)
          const nowStatus = result.data && result.data.riskApprovalOfCreditTransferOutDTO
          // 判断是否显示提交表单 true 显示
          if (nowStatus && nowStatus.is === 'Y') {
            this.isApproval = true
          } else {
            result.data.riskApprovalOfCreditTransferOutDTO.grantAmount = ansFormatter(result.data.riskApprovalOfCreditTransferOutDTO.grantAmount)
            this.isApproval = false
          }
          this.fromOrderNo = result.data.approveGuaranteeOutDTO.fromOrderNo
          this.resultData = result.data.data || {}
          this.examineData = result.data.approveGuaranteeOutDTO || {}
          this.infoTime = {
            updatedTime: result.data.approveGuaranteeOutDTO.updatedTime || '',
            commitTime: result.data.approveGuaranteeOutDTO.commitTime || ''
          }
          this.riskApprovaResult = result.data.riskApprovalOfCreditTransferOutDTO || {}
          this.familyPropertyTabData = this.formatFinances(result.data.data.finances)
          if (result.data.data.personBaseRep.riskTipsOutDTO && result.data.data.personBaseRep.riskTipsOutDTO.data.huiFaDTO) {
            const obj = result.data.data.personBaseRep.riskTipsOutDTO.data.huiFaDTO
            this.hfTabPaneList[0].dataSource = obj.executePublicDTO || [] // 执行公开信息
            this.hfTabPaneList[1].dataSource = obj.dishonestDTO || [] // 失信老赖
            this.hfTabPaneList[2].dataSource = obj.limitConsumptionDTO || [] // 限制高消费
            this.hfTabPaneList[3].dataSource = obj.limitEntryExitDTO || [] // 限制出入境
            this.hfTabPaneList[4].dataSource = obj.lawDocumentDTO || [] // 民商事裁判文书
            this.hfTabPaneList[5].dataSource = obj.lawFlowDTO || [] // 民商事审判流程
            this.hfTabPaneList[6].dataSource = obj.lawCriminalDTO || [] // 罪犯及嫌疑人
          }
          if (result.data.data.personBaseRep.riskTipsOutDTO && result.data.data.personBaseRep.riskTipsOutDTO.data.suanHuaDTO) {
            const obj = result.data.data.personBaseRep.riskTipsOutDTO.data.suanHuaDTO
            this.shTabPaneList[0].dataSource = obj.shareHolderDTO || [] // 企业股东信息
            this.shTabPaneList[1].dataSource = obj.legalRepresentativeDTO || [] // 法人代表信息
            this.shTabPaneList[2].dataSource = obj.managerDTO || [] // 企业法定代表人信息
            this.riskInformationData = result.data.data.personBaseRep.riskTipsOutDTO.data || {}
          }
          this.liabilities = result.data.data.liabilities ? result.data.data.liabilities[0] : {}
          this.antiFraudList = result.data.data.personBaseRep.riskTipsOutDTO && result.data.data.personBaseRep.riskTipsOutDTO.data.baiRongDTO.matchNodesDTOList
          this.fileList = result.data.data.listMap || {}
        } else {
          this.$message.error(result.message || '失败')
          this.isApproval = false
          this.riskApprovaResult.is = 'Y'
        }
      })
    },
    // 获取风险审批下拉框
    getApproveTypeSelectFun() {
      getApproveTypeSelect('C02').then(res => {
        if (res.status === 200) {
          this.resultOptions = Object.keys(res.data).length && Object.keys(res.data).map(item => {
            return {
              label: res.data[item],
              value: item
            }
          })
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 获取审批日志数据
    getTraceLogFun() {
      getTraceLog({
        applyNo: this.$route.query.applyNo,
        flowNo: 'C02'
      }).then(rep => {
        if (rep.status === 200) {
          const dataList = rep.data
          this.activities = dataList || []
        }
      })
    },
    onSaveDrafts(val) {
      // 获取审批结果编号
      const examineResultNo = this.resultOptions.find(v => v.label === val.examineResultDesc)
      const params = {
        ...val,
        flowNo: 'C02', // 业务类型
        applyNo: this.$route.query.applyNo,
        commitUserId: this.currentUser.id, // 当前提交人id
        commitUserName: this.currentUser.userName, // 当前提交人
        examineResultNo: examineResultNo.value // 审批结果编号
      }
      naturalSubmitTraceStaging(params).then(res => {
        if (res.status === 200) {
          this.getDetailInfo() // 保存草稿后 刷新详情页草稿回写数据
          this.$message.success(res.message || '成功')
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    onSubmit(val) {
      // 获取审批结果编号
      const examineResultNo = this.resultOptions.find(v => v.label === val.examineResultDesc)
      const params = {
        ...val,
        applyNo: this.$route.query.applyNo,
        examineResultNo: examineResultNo.value // 审批结果编号
      }
      // 风险审批提交
      approveSubmitForApproval(params).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message || '成功')
          this.getDetailInfo() // 获取详情数据
        } else {
          this.$message.error(result.message || '失败')
        }
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
      if (tab.name === 'third') {
        this.getTraceLogFun()
      }
    },

    handleTab2Click(tab, event) {
      this.activeTwoName = tab.name
    },
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    },
    // 获取退回下拉框数据
    getSelectStatus() {
      getQueryReturnApprovalLevelStatus({ businessType: 'C02' }).then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.sendBackOptions = Object.keys(res.data).map(item => {
              return {
                label: res.data[item],
                value: 'LV' + item
              }
            })
          } else {
            this.sendBackOptions = []
          }
        }
      })
    },
    // 判断显示历史记录
    isShowTab() {
      if (this.$route.query.isShow === '2') {
        // 2 需要显示历史审批记录列表 1 不需要显示
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.activeName = 'first'
      this.getDetailInfo() // 重新请求详情页数据
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
              { prop: 'disposeAddress', label: '房产地址', align: 'center' },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (key === '2') {
            label = '自建房'
            name = 'second'
            columns = [
              { prop: 'disposeAddress', label: '房产地址', align: 'center' },
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
            dataSource: finances[key].map(item => {
              return {
                ...item,
                disposeAddress: item.housingProvince$FICDictName && item.housingProvince$FICDictName.replace(/,/g, '') + item.housingAddress
              }
            })
          })
          if (currentData.length) {
            Arr.push({ ...currentData[0] })
          }
        }
      }
      return Arr
    }
  },
  watch: {
    $route: {
      handler (val, oldVal) {
        if (val.query.isShow !== oldVal.query.isShow) {
          this.isShowTab()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.approveNaturalDetail {
  .leftContext {
    background: #fff;
    padding: 10px 24px ;
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
    /deep/ .el-tabs__nav {
      display: flex;
    }
  }
  .rightContext {
    background: #fff;
    border: 2px solid #08b347;
    border-radius: 1px;
    padding: 19px 24px;
    .title {
      font-size: 16px;
      color: #08b347;
      line-height: 24px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    /deep/ .el-col {
      width: 100%;
    }
    .el-form-item {
      display: flex;
      flex-direction: column;
    }
    /deep/ .el-form {
      padding: 20px 20px 0 0;
      .el-form-item__label {
        text-align: left;
      }
    }
    /deep/ .el-date-editor {
      width: 100%;
    }
    .approveShow {
      // padding: 0 10px;
      width: 100%;
      height: auto;
      .el-divider--horizontal {
        margin: 10px 0;
      }
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
}
</style>
