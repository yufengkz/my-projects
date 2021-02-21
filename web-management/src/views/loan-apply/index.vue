<template>
  <div class="container">
    <v-form title="借款产品管理" :subTitle="null">
      <template slot="header-btns">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="create">新增产品</el-button>
      </template>
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

import { getLoanList, editLoanStatu } from '@/api/loan'

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
          label: '产品名称',
          type: 'text',
          value: 'name'
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          children: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        },
        {
          label: '产品类型',
          value: 'productType',
          type: 'select',
          children: this.$store.state.base.prodects
        },
        {
          label: '业务受众',
          value: 'userType',
          type: 'select',
          children: this.$store.state.base.userType
        },
        {
          label: '产品号',
          type: 'text',
          value: 'productCode'
        }
      ],
      // 列表表头
      columns: [
        {
          prop: 'productCode',
          label: '产品号',
          align: 'center'
        },
        {
          prop: 'productType',
          label: '产品类型',
          align: 'center',
          render: (h, params) => {
            const productType = params.row.productType || ''
            let text
            this.$store.state.base.prodects.map(item => {
              if (item.value === productType) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'name',
          label: '产品名称',
          align: 'center'
        },
        {
          prop: 'userType',
          label: '业务受众',
          align: 'center',
          render: (h, params) => {
            const userType = params.row.userType || ''
            let text
            this.$store.state.base.userType.map(item => {
              if (item.value === userType) {
                text = item.label
              }
            })
            return h('span', text)
          }
        },
        {
          prop: 'interestRate',
          label: '产品利率（%）',
          align: 'center',
          render: (h, params) => h('span', params.row.interestRate ? params.row.interestRate + '%' : '--')
        },
        {
          prop: 'maxCreditLimit',
          label: '客户产品限额（万元）',
          align: 'center'
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center',
          render: (h, params) => {
            const status = params.row.status || ''
            let text
            if (+status === 1) {
              text = '启用'
            } else if (+status === 0) {
              text = '禁用'
            } else {
              text = '-'
            }
            return h('span', text)
          }
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '查看',
          method: (row, index) => {
            // type = 0 创建 1 查看 2 编辑
            this.$router.push(`/loan-apply/detail?id=${row.id}&type=2`)
          }
        },
        {
          label: '启用',
          isShow: (row, index) => {
            const status = +row.status
            return status === 0
          },
          method: (row, index) => {
            // 0关 1开
            this.handleTableClick(row, index)
          }
        },
        {
          label: '禁用',
          isShow: (row, index) => {
            const status = +row.status
            return status === 1
          },
          method: (row, index) => {
            // 0关 1开
            this.handleTableClick(row, index)
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
    // 新增
    create() {
      // type = 0 创建 1 查看 2 编辑
      this.$router.push({ path: '/loan-apply/edit?type=0' })
    },
    // 获取列表数据
    async getSourceData(params) {
      const { data } = await getLoanList(params)
      this.dataTotal = data.total || 0
      this.dataSource = data.records || []
    },
    // 搜索
    handleSearch(params) {
      console.log('搜索:', params)
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        guaranteeCompany: params.guaranteeCompany,
        status: params.status,
        name: params.name,
        guaranteeStatus: params.guaranteeStatus,
        productType: params.productType,
        userType: params.userType,
        productCode: params.productCode
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
      delete this.seaerchData.guaranteeCompany
      delete this.seaerchData.status
      delete this.seaerchData.productType
      delete this.seaerchData.userType
      delete this.seaerchData.productCode
      this.getSourceData(this.seaerchData)
    },
    async handleTableClick(params) {
      this.$confirm('确定修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { status, id } = params
        // 1 启用 0禁用 => 当前状态为1则改为0 反之....
        status = +status === 1 ? 0 : 1
        editLoanStatu({ id, status }).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.getSourceData(this.seaerchData)
            // 停用、启用后刷新store中的贷款产品数据列表
            this.$store.dispatch('GetLoanProducts')
          } else {
            this.$message.error('操作失败' + res.message)
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
