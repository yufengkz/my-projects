<template>
  <div class="container">
    <el-row>
      <el-tabs v-model="seaerchData.changeMapStatus" @tab-click="handleClick">
        <el-tab-pane label="待审批" name="1"></el-tab-pane>
        <el-tab-pane label="已完成" name="2,3"></el-tab-pane>
      </el-tabs>
    </el-row>
    <v-form title="" :subTitle="null">
      <template slot="content">
        <!-- 搜索 -->
        <Search :tableSearch="tableSearch" @handleSearch="handleSearch" @handleReset="handleReset" />
        <!-- 列表 -->
        <TableList
          border
          :columns="columns"
          :dataSource="dataSource"
          :operates="operates"
          :pagination="pagination"
          :dataTotal="dataTotal"
          @handleChangePage="handleChangePage"
          @handleChangePageSize="handleChangePageSize"
        />
      </template>
    </v-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VForm from '@/components/VForm'
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'

import { getList } from '@/api/orders'

export default {
  components: {
    VForm,
    Search,
    TableList
  },
  computed: {
    ...mapGetters(['mapProducts', 'loanProducts'])
  },
  data() {
    return {
      // 搜索框数据
      tableSearch: [],
      // 列表表头
      columns: [
        {
          prop: 'flowNo',
          label: '流水号',
          align: 'center'
        },
        {
          prop: 'applyTime',
          label: '提交时间',
          align: 'center'
        },
        {
          prop: 'centerName',
          label: '来源MAP中心',
          align: 'center'
        },
        {
          prop: 'changeMapStatus$FICDictName',
          label: '状态',
          align: 'center'
          // 0.未转过 1发起审批 2.审批通过,3不通过 {0，2，3都可以发起}
        },
        {
          prop: 'customerName',
          label: '客户姓名',
          align: 'center'
        },
        {
          prop: 'customerMobile',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'productName',
          label: '产品',
          align: 'center'
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '去审批',
          isShow: (row, index) => +this.seaerchData.changeMapStatus === 1,
          method: (row, index) => {
            this.$router.push({
              path: '/orders/edit',
              query: {
                customerId: row.customerId,
                orderNo: row.orderNo,
                changeMapFlowNo: row.flowNo,
                changeMapStatus: this.seaerchData.changeMapStatus
              }
            })
          }
        },
        {
          label: '去查看',
          isShow: (row, index) => +this.seaerchData.changeMapStatus !== 1,
          method: (row, index) => {
            this.$router.push({
              path: '/orders/edit',
              query: {
                customerId: row.customerId,
                orderNo: row.orderNo,
                changeMapFlowNo: row.flowNo,
                changeMapStatus: this.seaerchData.changeMapStatus
              }
            })
          }
        }
      ],
      selection: false,
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      dataTotal: 0,
      // 查询参数
      seaerchData: {
        changeMapStatus: '1',
        size: 10,
        current: 1,
        pages: 0
      },
      dataSource: []
    }
  },
  created() {},
  mounted() {
    // 初始化tableSearch
    this.tableSearch = [
      {
        label: '流水号',
        type: 'text',
        value: 'flowNo'
      },
      {
        label: '客户名称',
        type: 'text',
        value: 'customerName'
      },
      {
        label: '客户手机号',
        type: 'text',
        value: 'customerMobile'
      },
      {
        label: '产品',
        value: 'productId',
        type: 'select',
        children: this.loanProducts
      },
      {
        label: '提交时间',
        type: 'daterange',
        value: 'times'
      },
      {
        label: '所属MAP',
        value: 'centerId',
        type: 'select',
        children: this.mapProducts
      }
    ]
    // 获取列表数据
    this.getSourceData(this.seaerchData)
  },
  methods: {
    // 获取列表数据
    async getSourceData(params) {
      const res = await getList(params)

      this.dataTotal = res.data.total || 0
      this.dataSource = res.data.records
    },
    // 名单切换
    handleClick(tab, event) {
      this.seaerchData = { ...this.seaerchData }
      this.getSourceData(this.seaerchData)
    },
    // 搜索
    handleSearch(params) {
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        flowNo: params.flowNo,
        customerName: params.customerName,
        customerMobile: params.customerMobile,
        productId: params.productId,
        centerId: params.centerId,
        startTime: params.times && params.times[0],
        endTime: params.times && params.times[1]
      }
      this.pagination = {
        ...this.pagination,
        currentPage: 1
      }
      this.getSourceData(this.seaerchData)
    },
    // 分页触发事件
    handleChangePage(val) {
      this.pagination = {
        ...this.pagination,
        currentPage: val
      }
      this.seaerchData = {
        ...this.seaerchData,
        current: val
      }
      this.getSourceData(this.seaerchData)
    },
    handleChangePageSize(pageSize) {
      this.pagination = {
        ...this.pagination,
        pageSize
      }
      this.seaerchData = {
        ...this.seaerchData,
        size: pageSize
      }
      this.getSourceData(this.seaerchData)
    },
    handleReset() {
      delete this.seaerchData.flowNo
      delete this.seaerchData.customerName
      delete this.seaerchData.customerMobile
      delete this.seaerchData.productId
      delete this.seaerchData.centerId
      delete this.seaerchData.startTime
      delete this.seaerchData.endTime
      this.getSourceData(this.seaerchData)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-tabs__header {
  padding: 10px 20px 0 21px !important;
  position: relative;
  margin: 0 !important;
  background: #fff !important;
}
.indexTop {
  position: relative;
  width: 100%;
  /*height: 500px;*/
}
.indexBottom {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
