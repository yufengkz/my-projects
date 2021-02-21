/* 风险信息提示组件 */
<template>
  <div class="riskInfo">
    <el-row>
      <el-col :span="24">
        <div class="tabsLarge">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <template v-for="item in tabPaneList">
              <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
                <div class="titleCont" v-if="JSON.stringify(item.obj) !== '{}'">
                  <div class="title">风险信息概况</div>
                  <div class="msgCont">
                    <div>风险等级：<span class="bold">{{ item.obj.riskStatement }}</span></div>
                    <div>风险评分：<span class="bold">{{ item.obj.scoreCalculation }}</span></div>
                  </div>
                </div>
                <div class="titleCont" v-if="item.obj.isBlacklist">
                  <div class="title">黑/灰名单</div>
                  <div class="msgCont">
                    <div>是否命中：<span class="bold">{{ item.obj.isBlacklist }}</span></div>
                  </div>
                </div>
                <div class="titleCont" v-if="item.obj.baiRongDTO">
                  <div class="title">反欺诈</div>
                  <div class="msgCont">
                    <div>反欺诈结果：<span class="bold">{{ item.obj.baiRongDTO.antiFraudName }}</span></div>
                    <div>反欺诈分值：<span class="bold">{{ item.obj.baiRongDTO.antiFraudScore }}</span></div>
                  </div>
                  <template v-if="item.obj.baiRongDTO">
                    <TableList
                      border
                      :columns="antiFraudColumns"
                      :dataSource="item.obj.baiRongDTO.matchNodesDTOList"
                      :options="options"
                    />
                  </template>
                </div>
                <div class="titleCont" v-if="item.obj.baiRongDTO">
                  <div class="title">人行征信评级</div>
                  <div class="msgCont">
                    <div>人行征信评级：<span class="bold">{{ item.obj.baiRongDTO.creditRate ? item.obj.baiRongDTO.creditRate : '--' }}</span></div>
                    <div>人行征信评级分值：<span class="bold">{{ item.obj.baiRongDTO.creditRateScore ? item.obj.baiRongDTO.creditRateScore : '--' }}</span></div>
                  </div>
                </div>
                <div class="titleCont" v-if="item.obj.huiFaDTO">
                  <div class="title">汇法网</div>
                  <div>
                    <el-tabs v-model="hfActiveName" @tab-click="hfHandleClick">
                      <template v-for="(itemHf, nameHf) in item.obj.huiFaDTO">
                        <el-tab-pane :key="nameHf" :label="hfClassify[nameHf]" :name="nameHf">
                          <TableList
                            border
                            :columns="hfTabPaneListColumns[nameHf].columns"
                            :dataSource="itemHf"
                            :options="options"
                          />
                        </el-tab-pane>
                      </template>
                    </el-tabs>
                  </div>
                </div>
                <div class="titleCont" v-if="item.obj.suanHuaDTO">
                  <div class="title">算话网</div>
                  <div>
                    <el-tabs v-model="shActiveName" @tab-click="shHandleClick">
                      <template v-for="(itemSh, nameSh) in item.obj.suanHuaDTO">
                        <el-tab-pane :key="nameSh" :label="shClassify[nameSh]" :name="nameSh">
                          <TableList
                            border
                            :columns="shTabPaneListColumns[nameSh].columns"
                            :dataSource="itemSh"
                            :options="options"
                          />
                        </el-tab-pane>
                      </template>
                    </el-tabs>
                  </div>
                </div>
              </el-tab-pane>
            </template>
          </el-tabs>
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
import TableList from '@/components/Tables/TableList'
export default {
  name: 'RiskInfo',
  components: {
    TableList
  },
  props: {
    apply: {
      type: Object
    }
  },
  data() {
    return {
      activeName: 'first', // 第一个tab
      hfActiveName: 'executePublicDTO', // 汇法网tab
      shActiveName: 'shareHolderDTO', // 算活网tab
      relcustomerRiskOutVos: [], // relcustomerRiskOutVos
      tabPaneList: [], // 第一个tab循环数组
      options: {
        index: true
      },
      antiFraudColumns: [
        { prop: 'mag', label: '规则大类', align: 'center' }
      ],
      antiFraudDataSource: [
        {
          classify: '大类1'
        }
      ],
      hfClassify: {
        dishonestDTO: '失信老赖',
        executePublicDTO: '执行公开信息',
        lawCriminalDTO: '罪犯及嫌疑人',
        lawDocumentDTO: '民商事裁判文书',
        lawFlowDTO: '民商事审判流程',
        limitConsumptionDTO: '限制高消费',
        limitEntryExitDTO: '限制出入境'
      },
      hfTabPaneListColumns: {
        dishonestDTO: {
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeTargetAmount', label: '执行标的(元)', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: this.executeContentRender },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '备注', align: 'center', width: '150' },
            { prop: 'province', label: '省份', align: 'center', width: '150' },
            { prop: 'performance', label: '履行情况', align: 'center', width: '150' },
            { prop: 'specificSituation', label: '具体情形', align: 'center', width: '150', render: this.specificSituationRender },
            { prop: 'publishTime', label: '发布时间', align: 'center', width: '150' },
            { prop: 'basisNo', label: '执行依据文号', align: 'center', width: '150' },
            { prop: 'basisUnit', label: '执行依据单位', align: 'center', width: '150' },
            { prop: 'finalTime', label: '终本日期', align: 'center', width: '150' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center', width: '150' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center', width: '150' }
          ]
        },
        executePublicDTO: {
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'filingCaseTime', label: '立案时间', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeTargetAmount', label: '执行标的(元)', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: this.executeContentRender },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '备注', align: 'center', width: '150', render: this.remarkRender },
            { prop: 'basisNo', label: '执行依据文号', align: 'center', width: '150' },
            { prop: 'finalTime', label: '终本日期', align: 'center', width: '150' },
            { prop: 'nonPerformanceAmount', label: '未履行金额(元)', align: 'center', width: '150' },
            { prop: 'applyExecuteUser', label: '申请执行人', align: 'center', width: '150' }
          ]
        },
        lawCriminalDTO: {
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'handleTime', label: '处理时间', align: 'center', width: '150' },
            { prop: 'partyName', label: '当事人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'caseNo', label: '案号', align: 'center', width: '150' },
            { prop: 'hearOrgan', label: '侦查/批捕/审判机关', align: 'center', width: '150' },
            { prop: 'illegalReason', label: '违法事由', align: 'center', width: '150' },
            { prop: 'handleResult', label: '处理结果', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
          ]
        },
        lawDocumentDTO: {
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
            { prop: 'hearResult', label: '审理结果', align: 'center', width: '150' },
            { prop: 'hearProgram', label: '审理程序', align: 'center', width: '150' },
            { prop: 'hearPerson', label: '审理人员', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' },
            { prop: 'detailUrl', label: '完整内容查看', align: 'center', width: '150', render: this.detailUrlRender },
            { prop: 'plaintiff', label: '原告当事人', align: 'center', width: '150' },
            { prop: 'defendant', label: '被告当事人', align: 'center', width: '150' },
            { prop: 'otherParty', label: '其他当事人', align: 'center', width: '150' }
          ]
        },
        lawFlowDTO: {
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
            { prop: 'noticeContent', label: '公告内容', align: 'center', width: '150', render: this.noticeContentRender },
            { prop: 'dateType', label: '日期类别', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' },
            { prop: 'partyPersons', label: '所有当事人', align: 'center', width: '150' }
          ]
        },
        limitConsumptionDTO: {
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'specificTime', label: '具体日期', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: this.executeContentRender },
            { prop: 'executeAmount', label: '执行金额(元)', align: 'center', width: '150' },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
          ]
        },
        limitEntryExitDTO: {
          columns: [
            { prop: 'dataType', label: '数据类型', align: 'center', width: '150' },
            { prop: 'title', label: '标题', align: 'center', width: '150' },
            { prop: 'specificTime', label: '具体日期', align: 'center', width: '150' },
            { prop: 'executedName', label: '被执行人姓名或名称', align: 'center', width: '150' },
            { prop: 'idNo', label: '证件号码', align: 'center', width: '150' },
            { prop: 'executeCaseNo', label: '执行案号', align: 'center', width: '150' },
            { prop: 'executeCourt', label: '执行法院', align: 'center', width: '150' },
            { prop: 'executeContent', label: '执行内容', align: 'center', width: '150', render: this.executeContentRender },
            { prop: 'dateType', label: '日期类别', align: 'center', width: '150' },
            { prop: 'executeStatus', label: '执行状态', align: 'center', width: '150' },
            { prop: 'remark', label: '异议备注', align: 'center', width: '150' }
          ]
        }
      },
      shClassify: {
        legalRepresentativeDTO: '法人代表信息',
        managerDTO: '企业主要管理人员信息',
        shareHolderDTO: '企业股东信息'
      },
      shTabPaneListColumns: {
        legalRepresentativeDTO: {
          columns: [
            { prop: 'inquirerName', label: '查询人姓名', align: 'center' },
            { prop: 'companyName', label: '企业(机构)名称', align: 'center' },
            { prop: 'registerNo', label: '注册号', align: 'center' },
            { prop: 'companyType', label: '企业(机构)类型', align: 'center' },
            { prop: 'registerCapital', label: '注册资本(万元)', align: 'center' },
            { prop: 'registerCurrency', label: '注册资本币种', align: 'center' },
            { prop: 'companyStatus', label: '企业状态', align: 'center' }
          ]
        },
        managerDTO: {
          columns: [
            { prop: 'inquirerName', label: '查询人姓名', align: 'center' },
            { prop: 'companyName', label: '企业(机构)名称', align: 'center' },
            { prop: 'registerNo', label: '注册号', align: 'center' },
            { prop: 'companyType', label: '企业(机构)类型', align: 'center' },
            { prop: 'registerCapital', label: '注册资本(万元)', align: 'center' },
            { prop: 'registerCurrency', label: '注册资本币种', align: 'center' },
            { prop: 'companyStatus', label: '企业状态', align: 'center' },
            { prop: 'post', label: '职务', align: 'center' }
          ]
        },
        shareHolderDTO: {
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
          ]
        }
      },
      dialogDetailsText: '',
      dialogVisible: false,
      dialogTitle: ''
    }
  },
  watch: {
    apply: {
      handler(newVal, oldVal) {
        this.applyHandle(newVal)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.applyHandle(this.apply)
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
    // 执行内容
    executeContentRender(h, params) {
      return this.renderFun(h, params, '执行内容', 'executeContent')
    },
    // 具体情形
    specificSituationRender(h, params) {
      return this.renderFun(h, params, '具体情形', 'specificSituation')
    },
    // 具体情形
    remarkRender(h, params) {
      return this.renderFun(h, params, '备注', 'remark')
    },
    // 具体情形
    noticeContentRender(h, params) {
      return this.renderFun(h, params, '公告内容', 'noticeContent')
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
    handleClose() {
      this.dialogDetailsText = ''
      this.dialogTitle = ''
      this.dialogVisible = false
    },
    applyHandle(v) {
      this.relcustomerRiskOutVos = v.relcustomerRiskOutVos ? v.relcustomerRiskOutVos : []
      this.tabPaneList = []
      if (this.relcustomerRiskOutVos) {
        let index = 1
        this.relcustomerRiskOutVos.forEach((item, key) => {
          let label = ''
          if (item.authType === '2') {
            label = item.authType$FICDictName + index
            index++
          } else if (item.authType === '4' && key > 1) {
            if (item.parentId === this.relcustomerRiskOutVos[key - 1].relatedCustomerId) {
              label = `担保人${index - 1}配偶`
            }
          } else {
            label = item.authType$FICDictName
          }
          if (key === 0) {
            this.activeName = item.id + ''
          }
          this.tabPaneList.push({
            label,
            name: item.id + '',
            obj: item.riskTipsOutDTO.data ? item.riskTipsOutDTO.data : {}
          })
        })
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    hfHandleClick(tab, event) {
      // console.log(tab, event)
    },
    shHandleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
  .riskInfo {
    .tabsLarge {
      position: relative;
      padding-left: 15px;
      color: #5a5a5a;
    }
    .msgCont {
      display: flex;
      font-size: 12px;
      line-height: 22px;
      color: #5a5a5a;
      div {
        padding-left: 50px;
        padding-bottom: 10px;
        min-width: 150px;
        &:first-child {
          padding-left: 0;
        }
      }
      .bold {
        font-weight: 600;
      }
    }
    .titleCont {
      .title {
        font-size: 14px;
        padding-left: 6px;
        line-height: 14px;
        border-left: 3px solid #08b448;
        color: #08b448;
        font-weight: 600;
        margin: 10px 0 15px;
      }
    }
    /deep/ .el-dialog__body {
      padding: 0 20px 20px 20px;
      .el-divider--horizontal {
        margin: 0 0 24px 0;
      }
    }
  }
</style>
