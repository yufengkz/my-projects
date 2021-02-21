/* 「待办」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!-- 表格组件-->
    <div class="header">
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
import { creditApplyInfoList, editCreditApplyInfoRemove, editCreditApplyInfo } from '@/api/loan-apply'
import { queryByType, notCreditApply } from '@/api/common'
// 给 字段添加一个是否显示 "编" 标识
const formentTitle = (h, params) => {
  return h('div', [
    h(
      'title',
      params.row.editFlag === 'Y' && params.row.editAccountId !== params.row.ids
        ? {
          style: { padding: '0 5px', display: 'inline-block', border: '1px solid #F59A23', borderRadius: '4px', color: '#F59A23' },
          attrs: {
            title: `${params.row.editRoleId$FICDictName ? params.row.editRoleId$FICDictName + '_' : ''}${params.row.editAccountName}正在编辑`
          }
        }
        : '',
      params.row.editFlag === 'Y' && params.row.editAccountId !== params.row.ids ? '编' : ''
    ),
    h('span', { style: { padding: '0 5px' } }, params.row.orderNo)
  ])
}
// 搜索框
const tableSearch = [
  {
    label: '申请编号',
    value: 'orderNo',
    type: 'text'
  },
  {
    label: '客户姓名',
    value: 'customerName',
    type: 'text'
  },
  {
    label: '客户手机号',
    value: 'customerMobile',
    type: 'text'
  },
  {
    label: '状态',
    value: 'applyStatus',
    type: 'select',
    children: []
  },
  {
    type: 'daterange',
    label: '申请时间',
    value: 'applyTime'
  },
  {
    label: '所属MAP',
    value: 'centerId',
    type: 'select',
    children: []
  },
  {
    label: '产品类型',
    value: 'productType',
    type: 'select',
    children: []
  },
  {
    label: '是否新客户',
    value: 'newUserFlag',
    type: 'select',
    children: [
      {
        label: '是',
        value: 'Y'
      },
      {
        label: '否',
        value: 'N'
      }
    ]
  }
]
// table表格 表头数据
const columns = [
  {
    prop: 'orderNo',
    label: '申请编号',
    align: 'center',
    render: formentTitle
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
    label: '客户身份证',
    align: 'center'
  },
  {
    prop: 'productTypeName', // 子组件中处理逻辑
    width: '120px',
    label: '产品类型',
    align: 'center'
  },
  {
    prop: 'newUserFlag$FICDictName',
    label: '是否新客户',
    align: 'center'
  },
  {
    prop: 'applyStatus$FICDictName',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '申请时间',
    align: 'center'
  },
  {
    prop: 'centerName',
    label: '所属MAP',
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
  // filters: {
  //   newOldFilter(val) {
  //     return val === 'Y' ? '是' : '否'
  //   },
  //   statusFilter(val) {
  //     return val === '1' ? '待初审验证' : '退回待处理'
  //   }
  // },
  mounted() {
    const mapList = JSON.parse(JSON.stringify(this.$store.getters.MAPList))
    this.tableSearch[5].children = Object.values(mapList).map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    this.initProductList()
    this.getPrereviewList(1)
  },
  data() {
    return {
      // 搜索框数据
      tableSearch,
      columns,
      dataSource,
      dataTotal: 0, // 总计
      // 分页
      pagination: {
        current: 1,
        pageSize: 10
      },
      searchForm: {
        orderNo: '', // 申请编号
        customerName: '', // 客户姓名
        customerMobile: '', // 客户手机号
        applyStatus: '',
        queryStatus: '1', // 区分 待办，已办，已完成状态
        endTime: '',
        startTime: '',
        centerId: '', // 所属MAP
        productType: '', // 产品类型
        newUserFlag: '', // 是否新客户
        current: 1,
        pageSize: 10
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [
        {
          label: '去处理',
          disabled: (row, index) => row.editFlag === 'Y' && row.editAccountId !== row.ids,
          isShow: (row, index) => true,
          method: (row, index) => {
            this.handleClick(row, index)
          }
        },
        {
          label: '解除占用',
          isShow: (row, index) => row.editFlag === 'Y' && row.editAccountId === row.ids,
          method: (row, index) => {
            this.handleRemoveOccupy(row, index)
          }
        }
      ]
    }
  },
  created() {},
  methods: {
    // 去处理
    handleClick(row) {
      const obj = {
        customerId: row.customerId,
        orderNo: row.orderNo
      }
      editCreditApplyInfo(obj).then(res => {
        if (res.status === 200) {
          if (row.applyStatus$FICDictName !== '待展业' && row.applyStatus$FICDictName !== '待完善资料') {
            this.$router.push({
              path: '/loan-apply/detail',
              query: {
                customerId: row.customerId,
                orderNo: row.orderNo,
                changeMapFlowNo: row.changeMapFlowNo,
                productType: row.productType,
                cropsType: row.cropsType
              }
            })
          } else {
            this.$router.push({
              path: '/loan-apply/add',
              query: {
                customerId: row.customerId,
                orderNo: row.orderNo,
                changeMapFlowNo: row.changeMapFlowNo,
                productType: row.productType,
                cropsType: row.cropsType
              }
            })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleRemoveOccupy(row, index) {
      const obj = {
        customerId: row.customerId,
        orderNo: row.orderNo
      }
      editCreditApplyInfoRemove(obj).then(res => {
        if (res.status === 200) {
          this.getPrereviewList(1)
          this.$message.success('解除成功')
        }
      })
    },
    handleDelete(index) {},
    // 搜索按钮
    handleSearch(val) {
      this.searchForm.orderNo = val.orderNo
      this.searchForm.customerName = val.customerName
      this.searchForm.customerMobile = val.customerMobile
      this.searchForm.applyStatus = val.applyStatus
      if (val.applyTime) {
        this.searchForm.startTime = val.applyTime[0]
        this.searchForm.endTime = val.applyTime[1]
      } else {
        this.searchForm.startTime = ''
        this.searchForm.endTime = ''
      }
      this.searchForm.centerId = val.centerId
      this.searchForm.productType = val.productType
      this.searchForm.newUserFlag = val.newUserFlag
      this.getPrereviewList(1)
    },
    // 列表数据
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      creditApplyInfoList(this.searchForm).then(res => {
        if (res.status === 200) {
          res.data.records.forEach(item => {
            if (item) {
              item.ids = this.$store.getters.currentUser.id
            }
          })
          res.data.records.forEach(item => {
            if (item.productType$FICDictName === '农资贷') {
              item.productTypeName = `${item.productType$FICDictName}(${item.productTagType$FICDictName})`
            } else {
              item.productTypeName = `${item.productType$FICDictName}`
            }
          })
          this.dataSource = res.data.records
          this.dataTotal = res.data.total
        } else {
          this.$message.error('查询出错')
          this.dataSource = []
          this.dataTotal = 0
        }
      })
    },
    toggleRowSelection(that) {
      return that.clearSelection()
    },
    handleSelectionChange() {},
    handleChangePage(val) {
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.current = 1
      this.searchForm.pageSize = val
      this.getPrereviewList(1)
    },
    // 操作 去处理
    // toDetail(index, tableData) {
    //   this.$router.push({
    //     path: '/loan-apply/add',
    //     query: {
    //       customerId: tableData[index].customerId,
    //       orderNo: tableData[index].orderNo,
    //       productType: tableData[index].productType,
    //       cropsType: tableData[index].cropsType
    //     }
    //   })
    // },
    // 获取产品类型、状态
    initProductList() {
      queryByType({
        type: 'productType'
      }).then(resp => {
        if (resp.status === 200) {
          this.tableSearch[6].children = resp.data.map(element => {
            return {
              label: element.value,
              value: element.code
            }
          })
        }
      })
      notCreditApply().then(res => {
        if (res.status === 200) {
          this.tableSearch[3].children = res.data.map(item => {
            return {
              label: item.message,
              value: item.code
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.LoanApplyBacklogList {
  .header {
    margin-top: 40px;
  }
  // .red {
  //   font-size: 20px;
  //   color: #f5222d;
  // }

  // .green {
  //   font-size: 20px;
  //   color: #1890ff;
  // }
  #testid:hover {
    color: red;
  }
}
</style>
