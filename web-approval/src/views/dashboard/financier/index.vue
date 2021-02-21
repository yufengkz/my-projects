<template>
  <div class="financer-dashboard">
    <el-card class="user-data-card">
      <div slot="header" class="box-header">
        <span>
          <svg-icon icon-class="dashboard-pie"/>
          <span>申请融资统计概览</span>
        </span>
      </div>
      <div class="box-content">
        <div class="item">
          <img src="@/assets/dashboard/apply_money.png" alt="apply_money_img" class="icon">
          <span class="text-content">申请融资金额（元）
            <br>
            <span style="font-size: 26px;color:#465062">
              <strong>{{applyFinanceInfo.totalAmount}}</strong>
            </span>
          </span>
        </div>
        <div class="item">
          <img src="@/assets/dashboard/apply_count.png" alt="apply_count_img" class="icon">
          <span class="text-content">申请融资笔数（笔）
            <br>
            <span style="font-size: 26px;color:#465062">
              <strong>{{applyFinanceInfo.totalCount}}</strong>
            </span>
          </span>
        </div>
        <div class="item">
          <img src="@/assets/dashboard/receivable_money.png" alt="receivable_money_img" class="icon">
          <span class="text-content">收款金额（元）
            <br>
            <span style="font-size: 26px;color:#465062">
              <strong>{{loanInfo.totalAmount}}</strong>
            </span>
          </span>
        </div>
        <div class="item">
          <img src="@/assets/dashboard/receivable_count.png" alt="receivable_count_img" class="icon">
          <span class="text-content">收款笔数（笔）
            <br>
            <span style="font-size: 26px;color:#465062">
              <strong>{{loanInfo.totalCount}}</strong>
            </span>
          </span>
        </div>
      </div>
    </el-card>
    <!-- <el-row style="margin-top: 20px"> -->
    <!-- <el-col :xs="24" :sm="24" :md="15"> -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="bar-card" style="margin-top: 20px">
          <div slot="header" class="box-header clearable">
            <span>
              <svg-icon icon-class="dashboard-money"/>
              <span>申请融资统计</span>
            </span>
            <div class="right-content">
              <el-radio-group
                v-model="applyDateRadio"
                size="mini"
                @change="applyTimeTypeChange"
                style="margin-right: 10px;"
              >
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-show="applyDateRadio==='month'"
                v-model="applyMonth"
                size="small"
                type="month"
                @change="getStatisticsInfo(1)"
                value-format="yyyy-MM"
                format="yyyy 年 MM 月"
                style="top: 1px;width:180px"
              ></el-date-picker>
              <el-date-picker
                v-show="applyDateRadio==='year'"
                v-model="applyYear"
                size="small"
                type="year"
                format="yyyy 年"
                value-format="yyyy"
                @change="getStatisticsInfo(1)"
                style="top: 1px;width:180px"
              ></el-date-picker>
              <!-- <el-button type="primary" size="mini" @click="getStatisticsInfo" style="width:60px">查询</el-button> -->
            </div>
          </div>
          <BarChart :barChartData="applyDayBarData" v-if="applyDateRadio==='month'"></BarChart>
          <!-- 以月为维度的图表 -->
          <BarChart :barChartData="applyMonthBarData" v-if="applyDateRadio==='year'"></BarChart>
          <el-row type="flex" justify="space-around" :gutter="20">
            <el-col :span="9" class="statics-item">
              <span class="key">统计区间融资申请总金额（元）
                <br>
                <span style="color:#354052;margin-top:6px">{{applyFinanceInfo.sumAmount}}</span>
              </span>
            </el-col>
            <el-col :span="9" class="statics-item">
              <span class="key">统计区间融资申请总笔数（笔）
                <br>
                <span style="color:#354052;margin-top:6px">{{applyFinanceInfo.sumCount}}</span>
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="bar-card" style="margin-top: 20px">
          <div slot="header" class="box-header clearable">
            <span>
              <svg-icon icon-class="dashboard-money-squre"/>
              <span>收款统计</span>
            </span>
            <div class="right-content">
              <el-radio-group
                v-model="loanDateRadio"
                size="mini"
                @change="loanTimeTypeChange"
                style="margin-right: 10px;"
              >
                <el-radio-button label="month">月</el-radio-button>
                <el-radio-button label="year">年</el-radio-button>
              </el-radio-group>
              <el-date-picker
                v-show="loanDateRadio==='month'"
                v-model="loanMonth"
                size="small"
                type="month"
                value-format="yyyy-MM"
                format="yyyy 年 MM 月"
                @change="getStatisticsInfo(2)"
                style="top: 1px;width:180px"
              ></el-date-picker>
              <el-date-picker
                v-show="loanDateRadio==='year'"
                v-model="loanYear"
                size="small"
                type="year"
                format="yyyy 年"
                value-format="yyyy"
                @change="getStatisticsInfo(2)"
                style="top: 1px;width:180px"
              ></el-date-picker>
              <!-- <el-button type="primary" size="mini" @click="getStatisticsInfo" style="width:60px">查询</el-button> -->
            </div>
          </div>
          <BarChart :barChartData="loanDayBarData" v-if="loanDateRadio==='month'"></BarChart>
          <!-- 以月为维度的图表 -->
          <BarChart :barChartData="loanMonthBarData" v-if="loanDateRadio==='year'"></BarChart>
          <el-row type="flex" justify="space-around" :gutter="20">
            <el-col :span="9" class="statics-item">
              <span class="key">统计区间收款总金额（元）
                <br>
                <span style="color:#354052;margin-top:6px">{{loanInfo.sumAmount}}</span>
              </span>
            </el-col>
            <el-col :span="9" class="statics-item">
              <span class="key">统计区间收款总笔数（笔）
                <br>
                <span style="color:#354052;margin-top:6px">{{loanInfo.sumCount}}</span>
              </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="message-card">
          <div slot="header" class="box-header clearable">
            <span>
              <svg-icon icon-class="dashboard-clock" style="font-size: 20px;"/>
              <span>待办事项</span>
            </span>
            <div class="right-content">
              <el-button type="text" @click="() => {this.$router.push('/message/backlog')}">更多 >></el-button>
            </div>
          </div>
          <el-table :data="backlogList" :show-header="false" stripe :border="false" style="width: 100%">
            <el-table-column label="信息" show-overflow-tooltip min-width="320" class-name="column-left">
              <template slot-scope="scope">
                <router-link :to="scope.row.linkUrl">
                  <span>{{scope.$index+1}}.{{ scope.row.messageContent }}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column label="日期" min-width="90" class-name="column-right">
              <template slot-scope="scope">
                <span>{{ scope.row.lastUpdTime | formatDate("yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <template slot="empty">
              <svg-icon icon-class="dashboard-nomessage" style="width: 75px; height: 75px"/>
              <div>暂无待办</div>
            </template>
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="message-card">
          <div slot="header" class="box-header clearable">
            <span>
              <svg-icon icon-class="dashboard-notice" style="font-size: 20px;"/>
              <span>通知消息</span>
            </span>
            <div class="right-content">
              <el-button type="text" @click="() => {this.$router.push('/message/notice')}">更多 >></el-button>
            </div>
          </div>
          <el-table :data="noticeList" :show-header="false" stripe :border="false" style="width: 100%">
            <el-table-column label="信息" prop="name" show-overflow-tooltip min-width="320" class-name="text-left">
              <template slot-scope="scope">
                <span>{{scope.$index+1}}.{{ scope.row.messageContent }}</span>
              </template>
            </el-table-column>
            <el-table-column label="日期" min-width="90" class-name="column-right">
              <template slot-scope="scope">
                <span>{{ scope.row.lastUpdTime | formatDate("yyyy-MM-dd") }}</span>
              </template>
            </el-table-column>
            <template slot="empty">
              <svg-icon icon-class="dashboard-nomessage" style="width: 75px; height: 75px"/>
              <div>暂无通知</div>
            </template>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BarChart from '../components/BarChart'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getFinancierChartData } from '@/api/dashboard'
export default {
  name: 'FinancierDashboard',
  components: {
    BarChart
  },
  computed: {
    ...mapGetters(['currentUser', 'backlogList', 'noticeList'])
  },
  data() {
    return {
      // 融资申请图表相关数据
      applyFinanceInfo: {
        totalCount: '0', // 累计申请总笔数
        totalAmount: '0', // 累计申请总金额
        sumCount: '0', // 统计区间累计申请笔数
        sumAmount: '0' // 统计区间累计申请金额
      },
      applyDateRadio: 'month', // 融资申请时间维度 month year
      applyMonth: moment().format(), // 选择的月份，未选择时为00，初始化月份选择器
      applyYear: moment().format('YYYY'), // 选择的年份
      applyDateRadioToggle: false, // 时间维度默认值为月，初次切换到年时触发修改，避免切换时间维度时重复查询
      applyDayBarData: {
        xAxis: [],
        series: [],
        legend: []
      },
      applyMonthBarData: {
        xAxis: [],
        series: [],
        legend: []
      },

      // 累计放款图表相关数据
      loanInfo: {
        totalCount: '0', // 累计放款总笔数
        totalAmount: '0', // 累计放款总金额
        sumCount: '0', // 统计区间累计放款笔数
        sumAmount: '0' // 统计区间累计放款金额
      },
      loanDateRadio: 'month', // 放款时间维度 month year
      loanMonth: moment().format(), // 选择的月份，未选择时为00，初始化月份选择器
      loanYear: moment().format('YYYY'), // 选择的年份
      loanDateRadioToggle: false, // 时间维度默认值为月，初次切换到年时触发修改，避免切换时间维度时重复查询
      loanDayBarData: {
        xAxis: [],
        series: [],
        legend: []
      },
      loanMonthBarData: {
        xAxis: [],
        series: [],
        legend: []
      }
      // 饼图
      // pieTitleMoney: '放款金额统计',
      // pieTitleCredit: '用信统计',
      // creditPieChartData: {
      //   legend: [],
      //   series: []
      // },
      // loanPieChartData: {
      //   legend: [],
      //   series: []
      // }
    }
  },
  created() {},
  mounted() {
    // this.dayBarChartData = dayBarChartData // mock数据，dayBarChartData来自../components/Mock.js
    this.getStatisticsInfo(0)
    this.$store.dispatch('GetNotice')
    this.$store.dispatch('GetBacklog')
  },
  methods: {
    /**
     * 获取融资申请和累计放款统计信息(初始化和切换统计时间时调用)
     * @param {nulber} type 查询类型 0：查询融资申请和累计放款两个图表的数据 1:只查询融资申请图表 2:只查询累计放款图表
     */
    getStatisticsInfo(searchType) {
      const params = {
        entNo: this.currentUser.entNo || '001', // 企业编号
        type: searchType,
        month: '00', // 全年时为00
        year: moment().format('YYYY') || '' // 年份
      }
      // 初始化时为0，各自查询时为1或2
      switch (searchType) {
        case 0:
          params.month = moment().format('MM')
          params.year = moment().format('YYYY')
          break
        case 1:
          // 月份时传年和月
          if (this.applyDateRadio === 'month') {
            if (this.applyMonth) {
              params.year = moment(this.applyMonth).format('YYYY')
              params.month = moment(this.applyMonth).format('MM')
            } else {
              params.year = moment().format('YYYY')
              params.month = moment().format('MM')
            }
            // 年份时传年和'00'月
          } else if (this.applyDateRadio === 'year') {
            params.year = this.applyYear || moment().format('YYYY')
          }
          break
        case 2:
          if (this.loanDateRadio === 'month') {
            if (this.loanMonth) {
              params.year = moment(this.loanMonth).format('YYYY')
              params.month = moment(this.loanMonth).format('MM')
            } else {
              params.year = moment().format('YYYY')
              params.month = moment().format('MM')
            }
          } else if (this.loanDateRadio === 'year') {
            params.year = this.loanYear || moment().format('YYYY')
          }
          break
        default:
          return false
      }
      getFinancierChartData(params)
        .then(res => {
          if (res.status === 200) {
            let barChartData = {
              xAxis: [],
              series: [
                {
                  name: '申请融资金额',
                  type: 'line',
                  yAxisIndex: 0,
                  data: []
                },
                {
                  name: '申请融资笔数',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: []
                }
              ],
              legend: ['申请融资金额', '申请融资笔数']
            }
            switch (searchType) {
              case 0:
                // 初始化逻辑待优化
                if (res.data.applyFinanceDatas) {
                  barChartData.series[0].data = res.data.applyFinanceDatas.map(item => item.amount)
                  barChartData.series[1].data = res.data.applyFinanceDatas.map(item => item.count)
                  if (this.applyDateRadio === 'month' && res.data.dayList) {
                    barChartData.xAxis = res.data.dayList.map(item => `${params.month}-${item}`)
                    this.applyDayBarData = barChartData
                  } else if (this.applyDateRadio === 'year' && res.data.monthList) {
                    barChartData.xAxis = res.data.monthList.map(item => `${item}月`)
                    this.applyMonthBarData = barChartData
                  }
                  this.applyFinanceInfo.sumCount = res.data.applyFinanceSumCount
                  this.applyFinanceInfo.sumAmount = res.data.applyFinanceSumAmount
                }
                this.applyFinanceInfo.totalCount = res.data.applyFinanceTotalCount
                this.applyFinanceInfo.totalAmount = res.data.applyFinanceTotalAmount
                if (res.data.loanDatas) {
                  barChartData = {
                    xAxis: [],
                    series: [
                      {
                        name: '收款金额',
                        type: 'line',
                        yAxisIndex: 0,
                        data: []
                      },
                      {
                        name: '收款笔数',
                        type: 'bar',
                        yAxisIndex: 1,
                        data: []
                      }
                    ],
                    legend: ['收款金额', '收款笔数']
                  }
                  barChartData.series[0].data = res.data.loanDatas.map(item => item.amount)
                  barChartData.series[1].data = res.data.loanDatas.map(item => item.count)
                  if (this.loanDateRadio === 'month' && res.data.dayList) {
                    barChartData.xAxis = res.data.dayList.map(item => `${params.month}-${item}`)
                    this.loanDayBarData = barChartData
                  } else if (this.loanDateRadio === 'year' && res.data.monthList) {
                    barChartData.xAxis = res.data.monthList.map(item => `${item}月`)
                    this.loanMonthBarData = barChartData
                  }

                  this.loanInfo.sumCount = res.data.loanSumCount
                  this.loanInfo.sumAmount = res.data.loanSumAmount
                }
                this.loanInfo.totalCount = res.data.loanTotalCount
                this.loanInfo.totalAmount = res.data.loanTotalAmount
                break
              case 1:
                if (res.data.applyFinanceDatas) {
                  barChartData.series[0].data = res.data.applyFinanceDatas.map(item => item.amount)
                  barChartData.series[1].data = res.data.applyFinanceDatas.map(item => item.count)
                  if (this.applyDateRadio === 'month' && res.data.dayList) {
                    barChartData.xAxis = res.data.dayList.map(item => `${params.month}-${item}`)
                    this.applyDayBarData = barChartData
                  } else if (this.applyDateRadio === 'year' && res.data.monthList) {
                    barChartData.xAxis = res.data.monthList.map(item => `${item}月`)
                    this.applyMonthBarData = barChartData
                  }
                  this.applyFinanceInfo.sumCount = res.data.applyFinanceSumCount
                  this.applyFinanceInfo.sumAmount = res.data.applyFinanceSumAmount
                }
                this.applyFinanceInfo.totalCount = res.data.applyFinanceTotalCount
                this.applyFinanceInfo.totalAmount = res.data.applyFinanceTotalAmount
                break
              case 2:
                barChartData = {
                  xAxis: [],
                  series: [
                    {
                      name: '收款金额',
                      type: 'line',
                      yAxisIndex: 0,
                      data: []
                    },
                    {
                      name: '收款笔数',
                      type: 'bar',
                      yAxisIndex: 1,
                      data: []
                    }
                  ],
                  legend: ['收款金额', '收款笔数']
                }
                if (res.data.loanDatas) {
                  barChartData.series[0].data = res.data.loanDatas.map(item => item.amount)
                  barChartData.series[1].data = res.data.loanDatas.map(item => item.count)
                  if (this.loanDateRadio === 'month' && res.data.dayList) {
                    barChartData.xAxis = res.data.dayList.map(item => `${params.month}-${item}`)
                    this.loanDayBarData = barChartData
                  } else if (this.loanDateRadio === 'year' && res.data.monthList) {
                    barChartData.xAxis = res.data.monthList.map(item => `${item}月`)
                    this.loanMonthBarData = barChartData
                  }

                  this.loanInfo.sumCount = res.data.loanSumCount
                  this.loanInfo.sumAmount = res.data.loanSumAmount
                }
                this.loanInfo.totalCount = res.data.loanTotalCount
                this.loanInfo.totalAmount = res.data.loanTotalAmount
                break
              default:
                break
            }
          } else {
            this.$message.error(res.message || '获取保单统计信息失败')
          }
        })
        .catch(err => {
          this.$message.error(err || '获取保单统计信息异常')
        })
    },
    // 仅在初次进入年维度时触发查询
    applyTimeTypeChange() {
      if (this.applyDateRadio === 'year' && this.applyDateRadioToggle === false) {
        this.applyDateRadioToggle = true
        this.getStatisticsInfo(1)
      }
    },
    // 仅在初次进入年维度时触发查询
    loanTimeTypeChange() {
      if (this.loanDateRadio === 'year' && this.loanDateRadioToggle === false) {
        this.loanDateRadioToggle = true
        this.getStatisticsInfo(2)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.financer-dashboard {
  .svg-icon {
    width: 24px;
    height: 24px;
    vertical-align: -6px;
  }
  .box-header {
    font-size: 16px;
    font-weight: bold;
    color: #59676f;
    span {
      margin-left: 5px;
    }
    .right-content {
      float: right;
      margin-top: -5px;
    }
  }
  .user-data-card {
    .box-content {
      display: flex;
      align-items: center;
      width: 100%;
      // padding: 0 58px;
      border-radius: 8px;
      color: #f2f2f2;
      .item {
        flex: 1;
        height: 110px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(82, 145, 247, 0.17);
        margin-top: 30px;
        margin-bottom: 30px;
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon {
          width: 60px;
          height: 60px;
          margin-left: 10px;
          margin-right: 10px;
        }
        .text-content {
          line-height: 30px;
          min-width: 130px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: #868C98;
        }
      }
      .computer-img {
        height: 110px;
        // margin-left: 2%;
        // margin-top: 8px;
      }
      .total {
        width: 130px;
        height: 120px;
        background-color: #0045a5;
        border-radius: 8px;
        margin-left: auto; // 居右
        text-align: center;
        .num {
          padding: 20px 0 4px 0;
          font-size: 20px;
          color: #ffe800;
        }
        .unit {
          color: #ffe800;
        }
        .text {
          font-size: 12px;
          padding-top: 18px;
        }
      }
    }
    .operation {
      // margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
<style lang="scss">
.financer-dashboard {
  .el-card__body {
    padding: 30px 32px;
  }
  .el-card.is-always-shadow {
    box-shadow: 0px 2px 13px 0px rgba(226, 226, 226, 0.5);
  }
  .user-data-card {
    .el-card__body {
      padding: 0 0 10px;
    }
  }
  .bar-card {
    .el-card__body {
      padding: 20px 20px 30px 20px;
    }
  }
  .pie-card {
    .el-card__body {
      padding: 20px 0 30px 0;
    }
  }
  .message-card {
    .el-card__body {
      padding: 0 20px;
    }
    .column-left {
      text-align: left;
    }
    .column-right {
      text-align: right;
    }
  }
  .el-button {
    width: 80px;
    height: 30px;
    margin-left: 10px;
  }
  .el-button--info {
    margin-left: 50px;
  }

  // 日期选择器展示输入框的宽度
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 150px !important;
  }
  .el-date-editor .el-range-separator {
    padding: 0;
  }
  .statics-item {
    height: 75px;
    background: rgba(250, 251, 252, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    .key {
      font-size: 14px;
      line-height: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(127, 143, 164, 1);
      text-align: center;
    }
  }
}
</style>
