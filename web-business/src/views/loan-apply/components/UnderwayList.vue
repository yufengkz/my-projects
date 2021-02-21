/* 「已办结」列表Tab */
<template>
  <div class="app-container LoanApplyAllList">
    <!--      输入框 组件-->
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!--      表格组件-->
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
import { creditApplyInfoList, getProductInfo } from '@/api/loan-apply'
import { queryByType, beOverCreditApply } from '@/api/common'

// 输入框数据
const tableSearch = [
  {
    label: '申请编号',
    value: 'orderNo',
    type: 'text'
  },
  {
    label: '客户号',
    value: 'customerId',
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
    label: '办结时间',
    value: 'updateTime'
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
  },
  {
    label: '产品名称',
    value: 'productId',
    type: 'select',
    children: []
  },
  {
    type: 'input',
    label: '审批额度',
    valueLow: 'grantSumSmall',
    valueHeight: 'grantSumMax',
    apply: 'section',
    units: '元'
  },
  {
    label: '所属MAP',
    value: 'centerId',
    type: 'select',
    children: []
  }
]
// 表格 表头数据
const columns = [
  {
    prop: 'orderNo',
    label: '申请编号',
    width: '160px',
    align: 'center'
  },
  {
    prop: 'customerId',
    label: '客户号',
    width: '160px',
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
    width: '100px',
    align: 'center'
  },
  {
    prop: 'certNo',
    label: '客户身份证',
    width: '120px',
    align: 'center'
  },
  {
    prop: 'grantAmount',
    width: '120px',
    label: '审批额度',
    align: 'center'
  },
  {
    prop: 'productTypeName',
    width: '120px',
    label: '产品类型',
    align: 'center'
  },
  {
    prop: 'productName',
    width: '120px',
    label: '产品名称',
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
    prop: 'updatedTime',
    label: '办结时间',
    width: '150px',
    align: 'center'
  },
  {
    prop: 'centerName',
    label: '所属MAP',
    width: '150px',
    align: 'center'
  }
]
const dataSource = []
export default {
  name: 'LoanApplyAllList',
  components: {
    Search,
    TableList
  },
  data() {
    return {
      tableSearch,
      columns,
      dataSource,
      dataTotal: 0,
      searchForm: {
        orderNo: '', // 申请编号
        customerName: '', // 客户姓名
        customerId: '', // 客户号
        customerMobile: '', // 客户手机号
        applyStatus: '',
        queryStatus: '3', // 列表的状态
        updateStartTime: '', // 办结开始时间
        updateEndTime: '', // 办结结束时间
        centerId: '', // 所属MAP
        productType: '', // 产品类型
        productId: '',
        newUserFlag: '', // 是否新客户
        grantSumMax: '', // 申请额度最大
        grantSumSmall: '', // 申请额度最小
        current: 1,
        pageSize: 10
      },
      // 分页
      pagination: {
        current: 1,
        pageSize: 10
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => {
            this.handleDetails(row, index)
          }
        }
      ]
    }
  },
  created() {},
  mounted() {
    this.initProductList()
    this.getPrereviewList(1)
    const mapList = JSON.parse(JSON.stringify(this.$store.getters.MAPList))
    this.tableSearch[10].children = Object.values(mapList).map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
  },
  methods: {
    handleDetails(row) {
      this.$router.push({
        path: '/loan-apply/detail',
        query: {
          customerId: row.customerId,
          orderNo: row.orderNo,
          productType: row.productType,
          cropsType: row.cropsType
        }
      })
    },
    // 列表查询
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      creditApplyInfoList(this.searchForm).then(res => {
        if (res.status === 200) {
          res.data.records.forEach(item => {
            if (item.productType$FICDictName === '农资贷') {
              item.productTypeName = `${item.productType$FICDictName}(${item.productTagType$FICDictName})`
            } else {
              item.productTypeName = `${item.productType$FICDictName}`
            }
          })
          this.dataSource = res.data.records.map(item => {
            item.proposedCreditLine = (item.applyStatus === '11' || item.applyStatus === '10') ? '-- ' : item.proposedCreditLine
            return item
          })
          this.dataTotal = res.data.total
        } else {
          this.$message.error('查询出错')
          this.dataSource = []
          this.dataTotal = 0
        }
      })
    },
    // 获取 产品类型 、 状态、产品名称
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
      beOverCreditApply().then(res => {
        if (res.status === 200) {
          // res.data.forEach(item => {
          //   item.label = item.message
          //   item.value = item.code
          //   this.tableSearch[4].children.push(item)
          // })
          this.tableSearch[4].children = res.data.map(item => {
            return {
              label: item.message,
              value: item.code
            }
          })
        }
      })
      getProductInfo().then(res => {
        if (res.status === 200) {
          // res.data.forEach(iton => {
          //   iton.label = iton.name
          //   iton.value = iton.id
          //   this.tableSearch[8].children.push(iton)
          // })
          this.tableSearch[8].children = res.data.map(iton => {
            return {
              label: iton.name,
              value: iton.id
            }
          })
        }
      })
    },
    handleSearch(val) {
      this.searchForm.orderNo = val.orderNo // 申请编号
      this.searchForm.customerName = val.customerName // 客户姓名
      this.searchForm.customerId = val.customerId // 客户号
      this.searchForm.customerMobile = val.customerMobile // 客户手机号
      if (val.updateTime) {
        this.searchForm.updateStartTime = val.updateTime[0] // 办结开始时间
        this.searchForm.updateEndTime = val.updateTime[1] // 办结结束时间
      } else {
        this.searchForm.updateStartTime = '' // 清空办结开始时间
        this.searchForm.updateEndTime = '' // 清空办结结束时间
      }
      this.searchForm.applyStatus = val.applyStatus // 状态
      this.searchForm.centerId = val.centerId // 所属MAP
      this.searchForm.productType = val.productType // 产品类型
      this.searchForm.productId = val.productId // 产品名称
      this.searchForm.newUserFlag = val.newUserFlag // 是否新客户
      this.searchForm.grantSumMax = val.grantSumMax // 申请额度最大
      this.searchForm.grantSumSmall = val.grantSumSmall // 申请额度最小
      this.getPrereviewList(1)
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage(val) {
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.current = 1
      this.searchForm.pageSize = val
      this.getPrereviewList(1)
    }
  }
}
</script>
<style lang="scss">
.LoanApplyAllList {
  .header {
    margin-top: 40px;
  }
}
</style>
