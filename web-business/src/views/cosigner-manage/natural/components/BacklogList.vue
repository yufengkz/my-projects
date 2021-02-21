/* 「待办」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <TableList
      border
      :columns="columns"
      :dataSource="tableData"
      :operates="operates"
      :pagination="pagination"
      :dataTotal="pagination.dataTotal"
      @toggleRowSelection="toggleRowSelection"
      @handleSelectionChange="handleSelectionChange"
      @handleChangePage="handleChangePage"
      @handleChangePageSize="handleChangePageSize"
    ></TableList>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { guaranteeMortgageList, releaseOccupyRemove, releaseOccupyAdd } from '@/api/cosigner-manage'
import { notCreditApply } from '@/api/common'

export default {
  name: 'BacklogList',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: {},
  data() {
    return {
      tableData: [],
      columns: [
        {
          prop: 'applyNo',
          label: '申请编号',
          align: 'center',
          // 给applyNo 字段添加一个是否显示转案标识
          render: (h, params) => {
            return h('div', [
              h(
                'title',
                params.row.occupyUser && Number(params.row.occupyUser) !== (this.currentUser && Number(this.currentUser.id)) && ((params.row.source === 'credit_apply' || params.row.source === 'person_add') && !params.row.sourceCode)
                  ? {
                    style: { padding: '0 5px', display: 'inline-block', border: '1px solid #F59A23', borderRadius: '4px', color: '#F59A23' },
                    attrs: {
                      title: `${params.row.occupyRole$FICDictName ? params.row.occupyRole$FICDictName + '_' : ''}${params.row.occupyUserName}正在编辑`
                    }
                  }
                  : '',
                params.row.occupyUser && Number(params.row.occupyUser) !== (this.currentUser && Number(this.currentUser.id)) && !params.row.sourceCode ? '编' : ''
              ),
              h('span', { style: { padding: '0 5px' } }, params.row.applyNo)
            ])
          }
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
          prop: 'isNew$FICDictName',
          label: '是否是新客户',
          align: 'center'
        },
        {
          prop: 'approvalStatus',
          label: '状态',
          align: 'center',
          formatter: (row, column, cellValue) => {
            const value = this.commonEnum.creditStatusOptions && this.commonEnum.creditStatusOptions.find(item => row.approvalStatus === item.value)
            return value && value.label
          }
        },
        {
          prop: 'applyTime',
          label: '申请时间',
          align: 'center'
        }
      ],
      tableSearch: [
        {
          label: '申请编号',
          value: 'applyNo',
          type: 'text'
        },
        {
          label: '姓名',
          value: 'name',
          type: 'text'
        },
        {
          label: '手机号',
          value: 'mobile',
          type: 'text'
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          children: [
            {
              label: '待完善资料',
              value: 2
            },
            {
              label: '待金融经理审核提交',
              value: 3
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
          value: 'applyTime',
          type: 'daterange'
        }
      ],
      searchForm: {
        queryType: 'todo',
        applyNo: '', // '申请编号',
        name: '', // '姓名',
        mobile: '', // '手机号',
        status: '', // '状态',
        applyTime: '', // '申请时间'
        current: 1,
        size: 10
      },
      pagination: {
        current: 1,
        pageSize: 10,
        dataTotal: 0
      },
      operates: [
        {
          label: '去处理',
          disabled: (row, index) => {
            if (row.occupyUser && row.occupyUser === this.currentUser.id.toString()) {
              return false
            } else if (!row.occupyUser) {
              // 如果occupyUser 不存在 就是没有操作过的数据 此时显示去处理
              return false
            } else if (row.approvalStatus === '3') {
              return false
            } else {
              return true
            }
          },
          isShow: (row, index) => {
            if (row.approvalStatus === '1' && (row.source === 'person_add' || !row.sourceCode)) {
              return true
            } else if (row.approvalStatus === '2' && (row.source === 'person_add' || !row.sourceCode)) {
              return true
            } else if (row.approvalStatus === '3' && (row.source === 'person_add' || !row.sourceCode)) {
              return true
            } else if (row.approvalStatus === '6' && (row.source === 'person_add' || !row.sourceCode)) {
              return true
            } else if (row.approvalStatus === '7' && (row.source === 'person_add' || !row.sourceCode)) {
              return true
            } else if (row.approvalStatus === '4' && (row.source === 'person_add' || !row.sourceCode) && this.currentUser.role === '金融专员') {
              return true
            } else {
              return false
            }
          },
          method: (row, index) => {
            releaseOccupyAdd(row.applyNo).then(result => {
              if (result.status === 200) {
                if (row.approvalStatus === '3' || row.approvalStatus === '4' || row.approvalStatus === '6' || row.approvalStatus === '7') {
                  this.$router.push({ path: '/cosigner-manage/natural/detail', query: { applyNo: row.applyNo } })
                } else {
                  this.$router.push({ path: '/cosigner-manage/natural/add', query: { applyNo: row.applyNo } })
                }
                this.$message.success(result.message)
              } else {
                this.$message.error(result.message)
              }
            })
          }
        },
        {
          label: '去查看',
          isShow: (row, index) => {
            if (row.source !== 'person_add' && row.sourceCode) {
              return true
            } else if (row.approvalStatus === '1') {
              return false
            } else if (row.approvalStatus === '2') {
              return false
            } else if (row.approvalStatus === '3') {
              return false
            } else if (row.approvalStatus === '6') {
              return false
            } else if (row.approvalStatus === '7') {
              return false
            } else if (row.approvalStatus === '4' && this.currentUser.role === '金融专员') {
              return false
            } else {
              return true
            }
          },
          method: (row, index) => {
            this.$router.push({ path: '/cosigner-manage/natural/detail', query: { applyNo: row.applyNo } })
          }
        },
        {
          label: '解除占用',
          // isShow: (row, index) => row.source === 'person_add' && Number(row.occupyUser) === Number(this.currentUser.id), // 判断如果row.source === 'person_add' 代表可以去处理的数据
          isShow: (row, index) => Number(row.occupyUser) === Number(this.currentUser.id) && ((row.source === 'credit_apply' || row.source === 'person_add') && !row.sourceCode),
          method: (row, index) => {
            releaseOccupyRemove(row.applyNo).then(result => {
              if (result.status === 200) {
                this.$message.success(result.message)
                this.getPrereviewList(this.searchForm.current)
              }
            })
          }
        }
      ]
    }
  },
  mounted() {
    this.getStatus()
  },
  computed: {
    ...mapGetters(['commonEnum', 'currentUser'])
  },
  created() {
    this.getPrereviewList(1)
  },
  methods: {
    // 搜索按钮
    handleSearch(val) {
      this.searchForm.applyNo = val.applyNo
      this.searchForm.name = val.name
      this.searchForm.mobile = val.mobile
      this.searchForm.status = val.status
      // this.searchForm.applyTime = val.applyTime
      if (val.applyTime && val.applyTime.length) {
        this.searchForm.createTimeStart = val.applyTime[0] + ' 00:00:00'
        this.searchForm.createTimeEnd = val.applyTime[1] + ' 23:59:59'
      } else {
        this.searchForm.createTimeStart = ''
        this.searchForm.createTimeEnd = ''
      }
      this.pagination.current = 1
      this.getPrereviewList(1)
    },
    // 列表查询
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      guaranteeMortgageList(this.searchForm).then(res => {
        if (res.status === 200) {
          this.pagination.dataTotal = res.data.total
          this.tableData = res.data.records || []
        } else {
          this.$message.error('查询出错')
          this.tableData = []
          this.pagination.dataTotal = 0
        }
      })
    },
    // 获取下拉状态
    getStatus() {
      notCreditApply().then(result => {
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
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage(val) {
      this.searchForm.current = val
      this.pagination.current = val
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.size = val
      this.pagination.pageSize = val
      this.getPrereviewList(1)
    }
  },
  watch: {}
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
