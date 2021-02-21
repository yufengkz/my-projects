/* 风险信息提示 */
<template>
  <div class="riskInformation">
    <el-row>
      <el-col :span="24">
        <div class="tabsLarge" v-if="riskInformationData">
          <div class="titleCont">
            <div class="title">风险信息概况</div>
            <div class="msgCont">
              <div>
                风险等级：
                <span class="bold">{{riskInformationData.riskStatement||'--'}}</span>
              </div>
              <div>
                风险评分：
                <span class="bold">{{riskInformationData.scoreCalculation||'--'}}</span>
              </div>
            </div>
          </div>
          <div class="titleCont">
            <div class="title">黑/灰名单</div>
            <div class="msgCont">
              <div>
                是否命中：
                <span class="bold">{{riskInformationData.isBlacklist ||'--'}}</span>
              </div>
            </div>
          </div>
          <div class="titleCont">
            <div class="title">反欺诈</div>
            <div class="msgCont">
              <div>
                反欺诈结果：
                <span class="bold">{{riskInformationData.baiRongDTO ? riskInformationData.baiRongDTO.antiFraudName : '--'}}</span>
              </div>
              <div>
                反欺诈分值：
                <span class="bold">{{riskInformationData.baiRongDTO ? riskInformationData.baiRongDTO.antiFraudScore : '--'}}</span>
              </div>
            </div>
            <TableList border :columns="antiFraudColumns" :dataSource="antiFraudList" :options="options" />
          </div>
          <div class="titleCont">
            <div class="title">人行征信评级</div>
            <div class="msgCont"  >
              <div>
                人行征信评级：
                <span
                  class="bold"
                >{{riskInformationData.baiRongDTO && riskInformationData.baiRongDTO.creditRate || '--'}}</span>
              </div>
              <div>
                人行征信评级分值：
                <span
                  class="bold"
                >{{riskInformationData.baiRongDTO && riskInformationData.baiRongDTO.creditRateScore || '--'}}</span>
              </div>
            </div>
          </div>
          <div class="titleCont">
            <div class="title">汇法网</div>
            <div>
              <el-tabs v-model="hfActiveName" @tab-click="hfHandleClick">
                <template v-for="item in hfTabPaneList">
                  <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
                    <TableList border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
                  </el-tab-pane>
                </template>
              </el-tabs>
            </div>
          </div>
          <div class="titleCont">
            <div class="title">算话网</div>
            <div>
              <el-tabs v-model="shActiveName" @tab-click="shHandleClick">
                <template v-for="item in shTabPaneList">
                  <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
                    <TableList border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
                  </el-tab-pane>
                </template>
              </el-tabs>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'RiskInformation',
  props: {
    riskInformationData: {
      type: Object
    },
    hfTabPaneList: {
      type: Array
    },
    shTabPaneList: {
      type: Array
    },
    antiFraudList: {
      type: Array // 反欺诈数据
    }
  },
  components: {
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      hfActiveName: 'first', // 汇法网tab
      shActiveName: 'first', // 算话网tab
      options: {
        index: true
      },
      antiFraudColumns: [{ prop: 'mag', label: '规则大类', align: 'center' }]
    }
  },
  methods: {
    hfHandleClick(tab, event) {
      // console.log(tab, event)
    },
    shHandleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>

<style lang='scss' scoped>
.riskInformation {
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
}
</style>
