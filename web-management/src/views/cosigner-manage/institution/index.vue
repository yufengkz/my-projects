<template>
  <div class="container">
    <v-form title="合作机构担保" :subTitle="null">
      <template slot="header-btns">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="create">新增机构担保</el-button>
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

import { getCompanyList } from '@/api/cosigner-manage'

export default {
  data() {
    return {
      // 列表表头
      columns: [
        {
          prop: 'name',
          label: '机构名称',
          align: 'center'
        },
        {
          prop: 'creditCode',
          label: '统一社会信用代码',
          align: 'center'
        },
        {
          prop: 'type$FICDictName',
          label: '机构类型',
          align: 'center'
        },
        {
          prop: 'role$FICDictName',
          label: '机构角色',
          align: 'center'
        },
        {
          prop: 'endDate',
          label: '截至日期',
          align: 'center',
          render: (h, params) => h('span', params.row.endDate || '--')
        },
        {
          prop: 'guaranteeStatus$FICDictName',
          label: '担保情况',
          align: 'center'
        }
      ],
      // 搜索框数据
      tableSearch: [
        {
          label: '统一社会信用代码',
          type: 'text',
          value: 'creditCode'
        },
        {
          label: '机构名称',
          type: 'text',
          value: 'name'
        },
        // {
        //   label: '状态',
        //   value: 'status',
        //   type: 'select',
        //   children: this.$store.state.base.approvalStatus
        // },
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
        },
        {
          label: '截至日期',
          type: 'daterange',
          value: 'times'
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '查看',
          method: (row, index) => {
            // type = 0 创建 1 查看 2 编辑
            this.$router.push(`/cosigner-manage/institution/detail?id=${row.id}&type=1`)
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
      this.$router.push({ path: '/cosigner-manage/institution/add?type=0' })
    },
    // 获取列表数据
    async getSourceData(params) {
      const { data } = await getCompanyList(params)
      this.dataTotal = data.total || 0
      this.dataSource = data.records || []
    },
    // 搜索
    handleSearch(params) {
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        creditCode: params.creditCode,
        name: params.name,
        createTime: params.times && params.times[0],
        endDate: params.times && params.times[1],
        guaranteeStatus: params.guaranteeStatus,
        status: params.status
      }
      this.pagination = {
        ...this.pagination,
        currentPage: 1
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
    handleReset(val) {
      delete this.seaerchData.creditCode
      delete this.seaerchData.name
      delete this.seaerchData.createTime
      delete this.seaerchData.endDate
      delete this.seaerchData.guaranteeStatus
      delete this.seaerchData.status
      this.getSourceData(this.seaerchData)
    }
  },
  components: {
    VForm,
    Search,
    TableList
  }
}
</script>

<style lang="scss" scoped></style>
