/* 全部列表 */
<template>
  <div class="app-container LoanApplyBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <TableList
      border
      :columns="columns"
      :dataSource="dataSource"
      :operates="operates"
      :pagination="pagination"
      :dataTotal="total"
      @toggleRowSelection="toggleRowSelection"
      @handleChangePageSize="handleChangePageSize"
      @handleChangePage="handleChangePage"
    />
  </div>
</template>

<script>
import { legalPersonSearch } from '@/api/cosigner-manage'
const TableSearch = [
  {
    label: '申请编号',
    value: 'applyNo',
    type: 'text'
  },
  {
    label: '机构名称',
    value: 'organName',
    type: 'text'
  },
  {
    label: '统一社会信用代码',
    value: 'creditCode',
    type: 'text'
  },
  {
    label: '状态',
    value: 'approvalStatus',
    type: 'select',
    children: [
      {
        label: '待展业',
        value: 1
      },
      {
        label: '待完善资料',
        value: 2
      },
      {
        label: '待金融经理审核提交',
        value: 3
      },
      {
        label: '金融经理驳回',
        value: 4
      },
      {
        label: '待风险审批',
        value: 5
      },
      {
        label: '审批退回待提交',
        value: 6
      },
      {
        label: '审批拒绝待复议',
        value: 7
      }
    ]
  },
  {
    label: '申请时间',
    value: 'dateOption',
    type: 'daterange'
  },
  {
    label: '办结时间',
    value: 'finishTime',
    type: 'daterange'
  },
  {
    label: '法人姓名',
    value: 'legalName',
    type: 'text'
  },
  {
    label: '法人手机号',
    value: 'legalMobile',
    type: 'text'
  }
]
const Columns = [
  {
    prop: 'applyNo',
    label: '申请编号',
    align: 'center'
  },
  {
    prop: 'organName',
    label: '机构名称',
    align: 'center'
  },
  {
    prop: 'creditCode',
    label: '统一社会信用代码',
    align: 'center'
  },
  {
    prop: 'legalName',
    label: '法人姓名',
    align: 'center'
  },
  {
    prop: 'legalMobile',
    label: '法人手机号',
    align: 'center'
  },
  {
    prop: 'legalIdNo',
    label: '法人客户身份证号',
    align: 'center'
  },

  {
    prop: 'approvalStatus',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'finishTime',
    label: '办结时间',
    align: 'center'
  }
]

export default {
  name: 'AllList',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: {},
  data() {
    return {
      tableSearch: TableSearch,
      columns: Columns,
      dataSource: [], // 列表数据
      total: 0,
      formSearch: {
        applyNo: '', // 申请编号
        organName: '', // 机构名称
        creditCode: '', // 统一社会信用代码
        legalName: '', // 法人姓名
        legalMobile: '', // 法人手机号
        legalIdNo: '', // 法人客户身份证号
        applyTime: '', // 申请时间
        finishTime: '', // 办结时间
        approvalStatus: '' // 状态
      },
      pagination: {
        current: 1,
        size: 10
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [
        {
          label: '去查看',
          isShow: (row, index) => row.state !== 1,
          method: (row, index) => {
            this.handleShow(row, index)
          }
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    formSearchProcessing() {
      this.formSearch = Object.assign({
        applyNo: '', // 申请编号
        organName: '', // 机构名称
        creditCode: '', // 统一社会信用代码
        legalName: '', // 法人姓名
        legalMobile: '', // 法人手机号
        dateOption: '', // 申请时间
        finishTime: '', // 办结时间
        approvalStatus: '', // 状态
        queryType: 'all'
      }, this.pagination)
      this.getList(this.formSearch)
    },
    handleSearch(val) {
      this.formSearch = Object.assign({
        applyNo: '', // 申请编号
        organName: '', // 机构名称
        creditCode: '', // 统一社会信用代码
        legalName: '', // 法人姓名
        legalMobile: '', // 法人手机号
        dateOption: '', // 申请时间
        finishTime: '', // 办结时间
        approvalStatus: '', // 状态
        queryType: 'all'
      }, this.pagination, val)
      this.getList(this.formSearch)
    },
    getList(data) {
      // 担保人分页查询接口
      legalPersonSearch(data).then(res => {
        if (res.status === 200) {
          res.data.records.forEach(item => {
            if (item.approvalStatus === '1') {
              item.approvalStatus = '待展业'
            } else if (item.approvalStatus === '2') {
              item.approvalStatus = '待完善资料'
            } else if (item.approvalStatus === '3') {
              item.approvalStatus = '待金融经理审核提交'
            } else if (item.approvalStatus === '5') {
              item.approvalStatus = '待风险审批'
            } else if (item.approvalStatus === '6') {
              item.approvalStatus = '审批退回待提交'
            } else if (item.approvalStatus === '7') {
              item.approvalStatus = '审批拒绝待复议'
            } else if (item.approvalStatus === '4') {
              item.approvalStatus = '金融经理驳回'
            }
          })
          // sj: 请求成功之后，保存响应内容的列表数据
          this.dataSource = (res.data && res.data.records) || []
          this.total = (res.data && res.data.total) || 0
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
          this.dataSource = []
          this.total = 0
        }
      })
    },
    toggleRowSelection() {},
    handleChangePageSize(val) {
      this.formSearch.current = 1
      this.formSearch.size = val
      this.getList(this.formSearch)
    },
    handleChangePage(val) {
      this.formSearch.current = val
      this.getList(this.formSearch)
    },
    // 操作 查看
    handleShow(index, tableData) {
      this.$router.push({ path: '/cosigner-manage/legal/detail', query: { applyNo: index.applyNo } })
    }
  }
}
</script>

<style lang="scss">
.LoanApplyBacklogList {
  .header {
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  .red {
    font-size: 20px;
    color: #f5222d;
  }

  .green {
    font-size: 20px;
    color: #1890ff;
  }
}
</style>
