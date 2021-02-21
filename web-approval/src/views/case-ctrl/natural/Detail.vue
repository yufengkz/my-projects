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
                    <Description label="建议申请担保金额">{{resultData.proposalLimit }}</Description>
                    <Description label="担保有效期">{{resultData.validTerm}}</Description>
                    <Description label="客户申请时间">{{resultData.applyTime}}</Description>
                    <Description label="MAP中心提交时间">{{resultData.mapSubmitTime}}</Description>
                    <Description label="更新时间">{{resultData.updatedTime}}</Description>
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
            <el-tab-pane label="征信报告" name="second"  >
              <CreditReport />
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="third">
              <ApprovalLog v-if="activeName === 'third'" :activities="activities" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6" v-show="rightFlag">
        <div class="btn">
          <!-- 人工转案 -->
          <ArtificialTransferDialog :optionData="optionData" @accepterVal="accepterVal" @showVisable="showVisable" />
        </div>
        <div class="rightContext">
          <!-- 风险审批 -->
          <!-- <RiskApproval /> -->
           <template v-if="riskApprovaResult.is !== 'Y' && riskApprovaResult.examineResult  === '030'">
              <div class="approveShow"  >
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
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030' || riskApprovaResult.examineResult === '040' ">
                      <span class="name" >审批利率</span>
                      <span>{{riskApprovaResult.examineResult === "030" ?  '审批中' :(item.grantRate ? item.grantRate : '-') + '% (年)'  }}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030' || riskApprovaResult.examineResult === '040'">
                      <span class="name" >贷款到期日</span>
                      <span>{{riskApprovaResult.examineResult === "030" ?  '审批中' :(item.grantRepayMonth ? item.grantRepayMonth : '-') + '月' + (item.grantRepayDate ?item.grantRepayDate : '-') + '日' }}</span>
                    </li>
                  </div>
                <el-divider></el-divider>
             </template>
              <li>
                <span class="name">审批意见</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
          </template>
          <template v-else>
          <div class="title">风险审批</div>
          <!-- 审批查看 通过-->
          <div class="approveShow" v-if="result === '000' ">
            <li>
              <span class="name">审批结果</span>
              <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
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
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                      <span class="name" >审批利率</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? (item.grantRate ? item.grantRate : '-') + '% (年)' : '审批中'  }}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030'">
                      <span class="name" >贷款到期日</span>
                      <span>{{riskApprovaResult.examineResult === "000" ? (item.grantRepayMonth ? item.grantRepayMonth : '-') + '月' + (item.grantRepayDay ?item.grantRepayDay : '-') + '日' : '审批中'}}</span>
                    </li>
                  </div>
                <el-divider></el-divider>
                  <!-- <el-divider></el-divider>
                  <li style="font-size: 14px;">被担保人</li>
                  <div v-for="(item,index) in riskApprovaResult.guaranteePersonOutDTOS" :key="index">
                    <li>
                      <span class="name">姓名</span>
                      <span>{{item.customerName}}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030' || riskApprovaResult.examineResult === '040' ">
                      <span class="name" >审批利率</span>
                      <span>{{item.grantRate + '% (年)' }}</span>
                    </li>
                    <li v-if="riskApprovaResult.examineResult === '000' || riskApprovaResult.examineResult === '030' || riskApprovaResult.examineResult === '040' ">
                      <span class="name" >贷款到期日</span>
                      <span>{{item.grantRepayMonth + '月' + item.grantRepayDay + '日' }}</span>
                    </li>
                  </div>
                  <el-divider></el-divider> -->
              </template>
            <li>
              <span class="name">审批意见</span>
            </li>
            <div class="text">{{riskApprovaResult.examineOpinion}}</div>
          </div>
          <!-- 审批查看 退回-->
          <div class="approveShow" v-if="result === '010' ">
            <li>
              <span class="name">审批结果</span>
              <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
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
          <div class="approveShow" v-if="result === '020' ">
            <li>
              <span class="name">审批结果</span>
              <!-- <span class="on">{{riskApprovaResult.examineResult$FICDictName}}</span> -->
              <span class="active" v-if="examineData.status !== '11'">MAP中心处理中</span>
              <span class="on" v-else>{{riskApprovaResult.examineResult$FICDictName}}</span>
            </li>
            <li>
              <!-- <span class="name">拒绝原因</span> -->
              <span class="name">审批意见</span>
            </li>
            <div class="text">{{riskApprovaResult.examineOpinion}}</div>
          </div>
          <!-- 审批查看 有条件审批通过-->
          <div class="approveShow" v-if="result === '040' ">
            <li>
              <span class="name">审批结果</span>
              <span class="active">{{riskApprovaResult.examineResult$FICDictName}}</span>
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
                        <span> {{ (item.grantRate ? item.grantRate : '-') + '% (年)' }}</span>
                      </li>
                      <li >
                        <span class="name" >贷款到期日</span>
                        <span>{{ (item.grantRepayMonth ? item.grantRepayMonth : '-') + '月' + (item.grantRepayDay ? item.grantRepayDay : '-') + '日'}}</span>
                      </li>
                    </div>
                  <el-divider></el-divider>
              </template>
            <li>
              <span class="name">审批意见</span>
            </li>
            <div class="text">{{riskApprovaResult.examineOpinion}}</div>
          </div>
          </template>
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
import { getNaturalDetail, getQueryReturnApprovalLevelStatus, getTraceLog } from '@/api/approval'
import { naturalPersonGuarantee, getTransferResources } from '@/api/case-ctrl'
import { mapGetters } from 'vuex'
import { ansFormatter } from '@/utils/format'

export default {
  name: 'CaseCtrlNaturalDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    ImageMaterial: () => import('@/components/ImageMaterial'),
    GuarantorInfo: () => import('./components/GuarantorInfo'),
    RiskInformation: () => import('./components/RiskInformation'),
    CreditReport: () => import('./components/CreditReport'), // 征信报告
    ApprovalLog: () => import('@/components/ApprovalLog'), // 审批日志
    ArtificialTransferDialog: () => import('@/components/ArtificialTransferDialog')
  },
  data() {
    return {
      rightFlag: false, // 显示右边区域 防止进入页面请求延迟显示
      result: '', // 显示内容的状态
      fromOrderNo: '', // 担保进件审批查看
      dialogDetailsText: '',
      dialogVisible: false,
      dialogTitle: '',
      activeName: 'first',
      activeTwoName: 'first',
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
      fileList: {}, // 图片数据  key是健名 value 是图片数组
      activities: [], // 审批日志信息
      resultData: {}, // 接口返回的data数据
      liabilities: {}, // 保存负债信息
      examineData: {}, // 审批中状态
      riskApprovaResult: {}, // 风险审批结果
      riskInformationData: {}, // 风险提示信息数据
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
      optionData: []
    }
  },
  created() {},
  mounted() {
    this.getDetailInfo() // 获取详情数据
    this.getSelectStatus() // 获取退回下拉框
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
          this.fromOrderNo = result.data.approveGuaranteeOutDTO.fromOrderNo
          result.data.riskApprovalOfCreditTransferOutDTO.grantAmount = ansFormatter(result.data.riskApprovalOfCreditTransferOutDTO.grantAmount)
          result.data.data.approvalLimit = ansFormatter(result.data.data.approvalLimit)
          this.resultData = result.data.data || {}
          this.result = result.data.riskApprovalOfCreditTransferOutDTO.examineResult || ''
          this.riskApprovaResult = result.data.riskApprovalOfCreditTransferOutDTO || {}
          this.examineData = result.data.approveGuaranteeOutDTO || {}
          // 处理金额千分位
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
    // 人工转案提交
    accepterVal(val) {
      const parmas = [{
        applyNo: this.$route.query.applyNo,
        id: val.id,
        transitionId: this.currentUser.id,
        transitionName: this.currentUser.userName
      }]
      naturalPersonGuarantee(parmas).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message || '成功了')
        } else {
          this.$message.error(result.message || '失败了')
        }
      })
    },
    // 点击人工转案事件获取下拉转案人数据
    showVisable() {
      const params = {
        businessType: 'C02',
        applyNo: this.$route.query.applyNo
      }
      getTransferResources(params).then(result => {
        if (result.status === 200) {
          this.optionData = result.data && result.data.map(item => {
            return { ...item, key: item.id, value: item.userName }
          })
        }
      })
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
  watch: { }
}
</script>
<style lang="scss" scoped>
.approveNaturalDetail {
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
  .btn {
    text-align: center;
    padding: 10px 0;
  }
  .border {
    padding-bottom: 5px;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
