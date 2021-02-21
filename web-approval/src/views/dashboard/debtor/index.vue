<template>
  <div class="debtor-dashboard">
    <el-card class="user-data-card">
      <div slot="header" class="box-header">
        <span>
          <svg-icon icon-class="dashboard-pie"/>
          <span>应付账款确权统计概览</span>
        </span>
      </div>
      <div class="box-content">
        <img src="@/assets/dashboard/computer.png" alt="computer_img" class="computer-img">
        <span class="text-content">
          您好，{{currentUser.fullName}}，欢迎登录中化资本福金业务平台！
          <br>
          <span style="font-size: 18px;">
            <strong>目前累计确权应付账款转让 {{totalCount}} 笔，金额 {{totalAmount}} 元</strong>
          </span>
        </span>
        <div class="total">
          <section class="num">{{totalAmount}}</section>
          <section class="unit">元</section>
          <section class="text">确权应付账款</section>
        </div>
      </div>
    </el-card>
    <el-card class="bar-card" style="margin-top: 20px">
      <div slot="header" class="box-header clearable">
        <span>
          <svg-icon icon-class="dashboard-money"/>
          <span>应付账款确权统计详情</span>
        </span>
        <div class="right-content">
          <el-radio-group v-model="dateRadio" size="mini" @change="timeTypeChange" style="margin-right: 10px;">
            <el-radio-button label="month">月</el-radio-button>
            <el-radio-button label="year">年</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="dateRadio==='month'"
            v-model="month"
            size="small"
            type="month"
            value-format="yyyy-MM"
            format="yyyy 年 MM 月"
            style="top: 1px;"
          ></el-date-picker>
          <el-date-picker
            v-show="dateRadio==='year'"
            v-model="year"
            size="small"
            type="year"
            format="yyyy 年"
            value-format="yyyy"
            style="top: 1px;"
          ></el-date-picker>
          <el-button type="primary" size="small" @click="getStatisticsInfo">查询</el-button>
        </div>
      </div>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="18">
          <!-- 以日为维度的图表 -->
          <BarChart :barChartData="dayBarChartData" v-if="dateRadio==='month'"></BarChart>
          <!-- 以月为维度的图表 -->
          <BarChart :barChartData="monthBarChartData" v-if="dateRadio==='year'"></BarChart>
        </el-col>
        <el-col :xs="24" :sm="24" :md="6">
          <div class="statistics-layout">
            <el-row :gutter="20" class="item">
              <el-col :span="12">
                <span class="key">统计区间确权应付账款转让总金额（元）</span>
              </el-col>
              <el-col :span="1">
                <span class="divider">|</span>
              </el-col>
              <el-col :span="11">
                <span class="value">{{sumAmount | ansFormatter()}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="item">
              <el-col :span="12">
                <span class="key">统计区间总笔数(笔)</span>
              </el-col>
              <el-col :span="1">
                <span class="divider">|</span>
              </el-col>
              <el-col :span="11">
                <span class="value">{{sumCount}}</span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :sm="24" :md="12">
        <el-card class="message-card">
          <div slot="header" class="box-header clearable">
            <span>
              <svg-icon icon-class="dashboard-clock"/>
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
              <svg-icon icon-class="dashboard-notice"/>
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
import { getDebtorChartData } from '@/api/dashboard'
export default {
  name: 'DebtorDashboard',
  components: {
    BarChart
  },
  computed: {
    ...mapGetters(['currentUser', 'backlogList', 'noticeList'])
  },
  data() {
    return {
      totalCount: '0', // 累计确权总笔数
      totalAmount: '0', // 累计确权总金额
      sumCount: '0', // 统计区间累计确权笔数
      sumAmount: '0', // 统计区间累计确权金额
      dateRadio: 'month', // 时间维度 month year
      dateRadioToggle: false, // 时间维度默认值为天，初次切换到月时触发修改，避免切换时间维度时重复查询
      month: moment().format(), // 选择的月份，未选择时为00，初始化月份选择器
      year: moment().format('YYYY'), // 选择的年份
      dayBarChartData: {
        xAxis: [],
        series: [
          {
            name: '确权金额',
            type: 'line',
            yAxisIndex: 0,
            data: []
          },
          {
            name: '确权笔数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ],
        legend: []
      },
      monthBarChartData: {
        xAxis: [],
        series: [
          {
            name: '确权金额',
            type: 'line',
            yAxisIndex: 0,
            data: []
          },
          {
            name: '确权笔数',
            type: 'bar',
            yAxisIndex: 1,
            data: []
          }
        ],
        legend: []
      }
    }
  },
  created() {
  },
  mounted() {
    // this.dayBarChartData = dayBarChartData // mock数据，dayBarChartData来自../components/Mock.js
    this.getStatisticsInfo()
    this.$store.dispatch('GetNotice')
    this.$store.dispatch('GetBacklog')
  },
  methods: {
    /**
     *
     */
    getStatisticsInfo() {
      const params = {
        entNo: this.currentUser.entNo || '001', // 企业编号
        month: '00', // 全年时为00
        year: moment().format('YYYY') || '' // 年份
      }
      if (this.dateRadio === 'month') {
        const month = this.month && this.month.length > 2 ? moment(this.month).format('MM') : this.month
        params.month = month || moment().format('MM')
      } else if (this.dateRadio === 'year') {
        params.year = this.year || moment().format('YYYY')
      } else {
        return false
      }
      getDebtorChartData(params)
        .then(res => {
          if (res.status === 200) {
            const barChartData = {
              xAxis: [],
              series: [
                {
                  name: '确权金额',
                  type: 'line',
                  yAxisIndex: 0,
                  data: []
                },
                {
                  name: '确权笔数',
                  type: 'bar',
                  yAxisIndex: 1,
                  data: []
                }
              ],
              legend: ['确权金额', '确权笔数']
            }
            if (res.data.authRightDatas) {
              // 不为空的判断-todo
              // res.data.authRightDatas结构为[{amount: 10, count:1}]
              barChartData.series[0].data = res.data.authRightDatas.map(item => item.amount)
              barChartData.series[1].data = res.data.authRightDatas.map(item => item.count)

              if (this.dateRadio === 'month' && res.data.dayList) {
                barChartData.xAxis = res.data.dayList.map(item => `${params.month}-${item}`)
              } else if (this.dateRadio === 'year' && res.data.monthList) {
                barChartData.xAxis = res.data.monthList.map(item => `${item}月`)
              }
              this.totalCount = res.data.authRightTotalCount
              this.totalAmount = res.data.authRightTotalAmount
              this.sumCount = res.data.authRightSumCount
              this.sumAmount = res.data.authRightSumAmount
            }
            // 给柱状图赋值
            if (this.dateRadio === 'month') {
              this.dayBarChartData = barChartData
            } else if (this.dateRadio === 'year') {
              this.monthBarChartData = barChartData
            }
          } else {
            this.$message.error(res.message || '获取统计信息失败')
          }
        })
        .catch(err => {
          this.$message.error(err || '获取统计信息异常')
        })
    },
    // 仅在某个时间维度初次进入时触发查询
    timeTypeChange() {
      if (this.dateRadio === 'year' && this.dateRadioToggle === false) {
        this.dateRadioToggle = true
        this.getStatisticsInfo()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.debtor-dashboard {
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
      // justify-content: space-around;
      // justify-content: space-between;
      width: 100%;
      height: 200px;
      // padding: 0 58px;
      padding: 0 6% 0 8%;
      background-image: url('~@/assets/dashboard/background.png');
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      border-radius: 8px;
      color: #f2f2f2;
      .computer-img {
        height: 110px;
        // margin-left: 2%;
        // margin-top: 8px;
      }
      .text-content {
        line-height: 30px;
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
  }
}
</style>
<style lang="scss">
.debtor-dashboard {
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
    padding-top: 6px;
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
  .statistics-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    .item {
      height: 60px;
      justify-content: center;
      margin-top: 11px;
      background-color: #fafbfc;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      .key {
        font-size: 12px;
        line-height: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(127, 143, 164, 1);
      }
      .divider {
        width: 1px;
        height: 40px;
        color: #eeeeee;
      }
      .value {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 700;
        color: #354052;
        align-content: center;
        align-items: center;
        align-self: center;
      }
    }
  }
}
</style>
