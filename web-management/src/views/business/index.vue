<template>
  <div class="container">
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

import { getList } from '@/api/business'

export default {
  components: {
    VForm,
    Search,
    TableList
  },
  computed: {
    ...mapGetters(['mapProducts', 'prodects', 'loanProducts', 'businessStatus'])
  },
  data() {
    return {
      // 搜索框数据
      tableSearch: [],
      // 列表表头
      columns: [
        {
          prop: 'orderNo',
          label: '申请编号',
          align: 'center'
        },
        {
          prop: 'customerName',
          label: '客户姓名',
          align: 'center'
        },
        {
          prop: 'customerMobile',
          label: '客户手机号',
          align: 'center'
        },
        {
          prop: 'certNo',
          label: '客户身份证号',
          align: 'center'
        },
        {
          prop: 'newUserFlag',
          label: '新客户',
          align: 'center',
          render: (h, params) => {
            let text
            this.$store.state.base.newUserFlag.map(item => {
              if (item.value === params.row.newUserFlag) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'acceptCase$FICDictName',
          label: '领案',
          align: 'center',
          render: (h, params) => h('span', params.row.acceptCase$FICDictName || '--')
        },
        {
          prop: 'productType$FICDictName',
          label: '产品大类',
          align: 'center',
          render: (h, params) => h('span', params.row.productType$FICDictName || '--')
        },
        {
          prop: 'productName',
          label: '产品名称',
          align: 'center',
          render: (h, params) => h('span', params.row.productName || '--')
        },
        {
          prop: 'applyStatus',
          label: '状态',
          align: 'center',
          render: (h, params) => {
            let text = ''
            this.businessStatus.map(item => {
              if (+params.row.applyStatus === +item.value) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'createTime',
          label: '创建时间',
          align: 'center'
        },
        {
          prop: 'updatedTime',
          label: '更新时间',
          align: 'center'
        },
        {
          prop: 'centerName',
          label: '所属MAP',
          align: 'center',
          render: (h, params) => h('span', params.row.centerName || '--')
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '去查看',
          method: (row, index) => {
            this.$router.push({ path: '/business/detail', query: { customerId: row.customerId, orderNo: row.orderNo } })
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
        size: 10,
        current: 1,
        pages: 0
      },
      dataSource: []
    }
  },
  mounted() {
    this.tableSearch = [
      {
        label: '申请编号',
        type: 'text',
        value: 'orderNo'
      },
      {
        label: '客户姓名',
        type: 'text',
        value: 'customerName'
      },
      {
        label: '客户手机号',
        type: 'text',
        value: 'customerMobile'
      },
      {
        label: '状态',
        value: 'applyStatus',
        type: 'select',
        children: this.businessStatus
      },
      {
        label: '创建时间',
        type: 'daterange',
        value: 'times1'
      },
      {
        label: '更新时间',
        type: 'daterange',
        value: 'times'
      },
      {
        label: '产品类型',
        value: 'productType',
        type: 'select',
        children: this.prodects
      },
      {
        label: '产品名称',
        value: 'productId',
        type: 'select',
        children: this.loanProducts
      },
      {
        label: '所属MAP',
        value: 'centerId',
        type: 'select',
        children: this.mapProducts
      }
    ]
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
        orderNo: params.orderNo,
        customerName: params.customerName,
        customerMobile: params.customerMobile,
        applyStatus: params.applyStatus,
        productType: params.productType,
        productId: params.productId,
        centerId: params.centerId,
        startTime: params.times1 && params.times1[0], // 申请开始时间
        endTime: params.times1 && params.times1[1], // 申请结束时间
        updateStartTime: params.times && params.times[0], // 办结开始时间
        updateEndTime: params.times && params.times[1] // 办结结束时间
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
      delete this.seaerchData.changeMapFlowNo
      delete this.seaerchData.customerName
      delete this.seaerchData.customerMobile
      delete this.seaerchData.applyStatus
      delete this.seaerchData.productType
      delete this.seaerchData.productId
      delete this.seaerchData.centerId
      delete this.seaerchData.startTime
      delete this.seaerchData.endTime
      delete this.seaerchData.updateStartTime
      delete this.seaerchData.updateEndTime
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
