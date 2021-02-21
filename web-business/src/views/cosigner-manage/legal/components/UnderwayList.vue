/* 「已办」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!--      表格组件-->
    <div>
      <TableList
        border
        :columns="columns"
        :dataSource="dataSource"
        :operates="operates"
        :pagination="pagination"
        :dataTotal="dataTotal"
        @toggleRowSelection="toggleRowSelection"
        @handleSelectionChange="handleSelectionChange"
        @handleChangePage="handleChangePage"
        @handleChangePageSize="handleChangePageSize"
      />
    </div>
  </div>
</template>

<script>
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'
import { alreadyCreditApply } from '@/api/common'
import { legalPersonSearch } from '@/api/cosigner-manage'
import { mapGetters } from 'vuex'
const tableSearch = [
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
    children: []
  },
  {
    label: '创建时间',
    value: 'createTime',
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
// table表格 表头数据
const columns = [
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
    prop: 'approvalStatus$FICDictName',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '创建时间',
    align: 'center'
  }
]
const dataSource = []
export default {
  name: 'LoanApplyBacklogList',
  components: {
    Search,
    TableList
  },
  data() {
    return {
      // 搜索框数据
      tableSearch,
      columns,
      dataSource,
      // 分页
      pagination: {
        current: 1,
        pageSize: 10
      },
      searchForm: {
        applyNo: '', // 申请编号
        organName: '', // 机构名称
        creditCode: '', // 统一社会信用代码
        legalName: '', // 法人姓名
        legalMobile: '', // 法人手机号
        // legalIdNo: '', // 法人客户身份证号
        applyTime: '', // 申请时间
        approvalStatus: '', // 状态
        createTimeStart: '',
        createTimeEnd: '',
        queryType: 'done',
        current: 1,
        pageSize: 10
      },
      //  扩展性按钮  eg:操作框里 去查看
      operates: [
        {
          label: '去查看',
          isShow: (row, index) => row.state !== 1,
          method: (row, index) => {
            this.handleDetails(row, index)
          }
        }
      ],
      dataTotal: 0 // 总计
    }
  },
  created() {
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  watch: {
  },
  methods: {
    handleDelete(index) {},
    // 根据搜索条件获取列表数据
    handleSearch(val) {
      this.searchForm.applyNo = val.applyNo
      this.searchForm.organName = val.organName
      this.searchForm.creditCode = val.creditCode
      this.searchForm.approvalStatus = val.approvalStatus
      this.searchForm.createTimeStart = (val.createTime && val.createTime.length) ? val.createTime[0] + ' 00:00:00' : ''
      this.searchForm.createTimeEnd = (val.createTime && val.createTime.length) ? val.createTime[1] + ' 23:59:59' : ''
      this.searchForm.legalName = val.legalName
      this.searchForm.legalMobile = val.legalMobile
      this.pagination = {
        ...this.pagination,
        current: 1
      }
      this.getPrereviewList(1)
    },
    // 获取列表数据
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      legalPersonSearch(this.searchForm).then(res => {
        if (res.status === 200) {
          this.dataSource = (res.data && res.data.records) || []
          this.dataTotal = (res.data && res.data.total) || 0
        } else {
          this.$message.error('查询出错123 ')
          this.dataSource = []
          this.dataTotal = 0
        }
      })
    },
    toggleRowSelection(that) {
      return that.clearSelection()
    },
    handleSelectionChange() {},
    // 切换页码
    handleChangePage(val) {
      this.getPrereviewList(val)
    },
    // 切换每页显示的数量
    handleChangePageSize(val) {
      this.searchForm.current = 1
      this.searchForm.pageSize = val
      this.getPrereviewList(1)
    },
    // 操作 去处理，去查看
    handleDetails(row, index) {
      this.$router.push({ path: '/cosigner-manage/legal/detail', query: { applyNo: row.applyNo } })
    },
    // 获取下拉列表状态
    getStatus() {
      alreadyCreditApply().then(result => {
        if (result.status === 200) {
          if (result.data.length) {
            this.tableSearch[3].children = result.data.map(item => {
              return {
                ...item,
                label: item.message,
                value: item.code
              }
            })
          } else {
            this.tableSearch[3].children = []
          }
        }
      })
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
