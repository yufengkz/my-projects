<template>
  <div class="container">
    <v-form title="自然人担保" :subTitle="null">
      <template slot="content">
        <!-- 搜索 -->
        <Search :tableSearch="tableSearch" @handleSearch="handleSearch" ref="search" />
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
import VForm from '@/components/VForm'
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'

import { getNaturalPersonList } from '@/api/cosigner-manage'

export default {
  components: {
    VForm,
    Search,
    TableList
  },
  data() {
    return {
      // 搜索框数据
      tableSearch: [
        {
          label: '客户号',
          type: 'text',
          value: 'customerId'
        },
        {
          label: '姓名',
          type: 'text',
          value: 'name'
        },
        {
          label: '手机号',
          type: 'text',
          value: 'mobile'
        },
        {
          label: '额度截至日期',
          type: 'daterange',
          value: 'times'
        },
        {
          label: '状态',
          value: 'approvalStatus',
          type: 'select',
          children: this.$store.state.base.approvalStatus
        },
        {
          label: '担保情况',
          value: 'guaranteeStatus',
          type: 'select',
          children: [
            {
              label: '担保中',
              value: '1'
            },
            {
              label: '未担保',
              value: '0'
            }
          ]
        }
      ],
      // 列表表头
      columns: [
        {
          prop: 'customerId',
          label: '客户号',
          align: 'center'
        },
        {
          prop: 'name',
          label: '姓名',
          align: 'center'
        },
        {
          prop: 'mobile',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'idNo',
          label: '客户身份证号',
          align: 'center'
        },
        {
          prop: 'deadline',
          label: '截至日期',
          align: 'center',
          render: (h, params) => h('span', params.row.deadline || '--')
        },
        {
          prop: 'approvalStatus',
          label: '状态',
          align: 'center',
          render: (h, params) => {
            const approvalStatus = params.row.approvalStatus || ''
            let text = ''
            this.$store.state.base.approvalStates.map(item => {
              if (item.key === approvalStatus) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'guaranteeStatus$FICDictName',
          label: '担保情况',
          align: 'center'
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '查看',
          method: (row, index) => {
            this.$router.push(`/cosigner-manage/natural/detail?applyNo=${row.applyNo}`)
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
    this.getSourceData(this.seaerchData)
  },
  methods: {
    // 获取列表数据
    async getSourceData(params) {
      const { data } = await getNaturalPersonList(params)
      this.dataTotal = data.total || 0
      this.dataSource = data.records || []
    },
    // 搜索
    handleSearch(params) {
      console.log('搜索:', params)
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        customerId: params.customerId,
        name: params.name,
        mobile: params.mobile,
        deadline: params.times && params.times[0],
        deadlineEnd: params.times && params.times[1],
        approvalStatus: params.approvalStatus,
        guaranteeStatus: params.guaranteeStatus
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
    handleReset(val) {
      delete this.seaerchData.customerId
      delete this.seaerchData.name
      delete this.seaerchData.mobile
      delete this.seaerchData.deadline
      // delete this.seaerchData.deadlineEnd
      delete this.seaerchData.approvalStatus
      delete this.seaerchData.guaranteeStatus
      this.getSourceData(this.seaerchData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
