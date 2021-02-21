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

import { getList } from '@/api/customer'

export default {
  components: {
    VForm,
    Search,
    TableList
  },
  computed: {
    ...mapGetters(['mapProducts', 'customerStatus'])
  },
  data() {
    return {
      // 搜索框数据
      tableSearch: [],
      // 列表表头
      columns: [
        {
          prop: 'customerId',
          label: '客户编号',
          align: 'center'
        },
        {
          prop: 'customerName',
          label: '客户姓名',
          align: 'center'
        },
        {
          prop: 'mobile',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'idCardNo',
          label: '身份证号',
          align: 'center'
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          render: (h, context) => {
            let text = ''
            this.$store.state.base.customerStatus.map(item => {
              if (item.value === +context.row.status) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'sourceName',
          label: '来源渠道',
          align: 'center',
          render: (h, params) => h('span', params.row.sourceName || '--')
        },
        {
          prop: 'registerTime',
          label: '注册时间',
          align: 'center',
          render: (h, params) => h('span', params.row.registerTime || '--')
        },
        // {
        //   prop: 'productName',
        //   label: '开通产品',
        //   align: 'center',
        //   render: (h, params) => h('span', params.row.productName || '--')
        // },
        {
          prop: 'roleName',
          label: '角色',
          align: 'center',
          render: (h, params) => h('span', params.row.roleName || '--')
        }
      ],
      // 扩展性操作按钮
      operates: [],
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
    // 初始化tableSearch
    this.tableSearch = [
      {
        label: '客户编号',
        type: 'text',
        value: 'customerId'
      },
      {
        label: '客户姓名',
        type: 'text',
        value: 'customerName'
      },
      {
        label: '客户手机号',
        type: 'text',
        value: 'mobile'
      },
      {
        label: '身份证号',
        type: 'text',
        value: 'idCardNo'
      },
      {
        label: '来源渠道',
        value: 'source',
        type: 'select',
        children: this.mapProducts
      },
      {
        label: '客户状态',
        value: 'status',
        type: 'select',
        children: this.customerStatus
      }
    ]
    // mapProducts  loanProducts
    this.getSourceData(this.seaerchData)
  },
  methods: {
    // 获取列表数据
    async getSourceData(params) {
      const res = await getList(params)

      this.dataTotal = (res.data && res.data.total) || 0
      this.dataSource = (res.data && res.data.records) || []
    },
    // 搜索
    handleSearch(params) {
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        customerId: params.customerId,
        customerName: params.customerName,
        mobile: params.mobile,
        idCardNo: params.idCardNo,
        source: params.source,
        status: params.status
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
      delete this.seaerchData.customerId
      delete this.seaerchData.customerName
      delete this.seaerchData.mobile
      delete this.seaerchData.idCardNo
      delete this.seaerchData.source
      delete this.seaerchData.status
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
