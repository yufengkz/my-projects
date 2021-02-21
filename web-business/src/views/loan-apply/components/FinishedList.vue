/* 「已办」列表Tab */
<template>
  <div class="app-container LoanApplyFinishedList">
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
import TableList from '@/components/Tables/TableList'
import Search from '@/components/Tables/Search'
import { creditApplyInfoList, getProductInfo } from '@/api/loan-apply'
import { queryByType, alreadyCreditApply } from '@/api/common'

// import { mapState } from 'vuex'
// 搜索框数据
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
    label: '提交时间',
    value: 'mapSubmitTime'
  },
  {
    label: '产品类型',
    value: 'productType',
    type: 'select',
    children: []
  },
  {
    label: '产品名称',
    value: 'productId',
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
    type: 'input',
    label: '申请额度',
    valueLow: 'applySumSmall',
    valueHeight: 'applySumMax',
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
/*
  columns  表头数据
  options  是否需要单选框 复选框  序号
  exportBut  按钮
  dataSource  表格里的数据
  operates  扩展性按钮  eg:操作框里 编辑删除
  pagination  分页
  handleSelectionChange 复选框选中项
  handleChangePage  分页触发事件
  */
// table表格 表头数据
const columns = [
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
    label: '客户身份证',
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
    width: '150px',
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
    prop: 'mapSubmitTime',
    label: '提交时间',
    align: 'center'
  },
  {
    prop: 'proposedCreditLine',
    label: '申请额度',
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
  name: 'LoanApplyFinishedList',
  components: {
    Search,
    TableList
  },
  data() {
    return {
      tableSearch,
      columns,
      dataSource, // 表格里数据
      dataTotal: 0,
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
      ],
      searchForm: {
        orderNo: '', // 申请编号
        customerName: '', // 客户姓名
        customerMobile: '', // 客户手机号
        queryStatus: '2', // 状态
        endTime: '',
        startTime: '',
        centerId: '', // 所属MAP
        productType: '', // 产品类型
        productId: '',
        newUserFlag: '', // 是否新客户
        applySumMax: '', // 申请额度最大
        applySumSmall: '', // 申请额度最小
        current: 1,
        pageSize: 10
      }
    }
  },
  computed: {},
  mounted() {
    const mapList = JSON.parse(JSON.stringify(this.$store.getters.MAPList))
    this.tableSearch[9].children = Object.values(mapList).map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    this.initProductList()
    this.getPrereviewList(1)
  },
  methods: {
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
          this.dataSource = res.data.records
          this.dataTotal = res.data.total
        } else {
          this.$message.error('查询出错')
          this.dataSource = []
          this.dataTotal = 0
        }
      })
    },
    // 获取 产品类型、 状态、产品名称
    initProductList() {
      queryByType({
        type: 'productType'
      }).then(resp => {
        if (resp.status === 200) {
          this.tableSearch[5].children = resp.data.map(element => {
            return {
              label: element.value,
              value: element.code
            }
          })
        }
      })
      alreadyCreditApply().then(res => {
        if (res.status === 200) {
          // res.data.forEach(item => {
          //   item.label = item.message
          //   item.value = item.code
          //   this.tableSearch[3].children.push(item)
          // })
          this.tableSearch[3].children = res.data.map(item => {
            return {
              label: item.message,
              value: item.code
            }
          })
        }
      })
      getProductInfo().then(res => {
        if (res.status === 200) {
          this.tableSearch[6].children = res.data.map(iton => {
            return {
              label: iton.name,
              value: iton.id
            }
          })
        }
      })
    },
    handleSearch(val) {
      // console.log(val)
      this.searchForm.orderNo = val.orderNo
      this.searchForm.customerName = val.customerName
      this.searchForm.customerMobile = val.customerMobile
      this.searchForm.applyStatus = val.applyStatus
      if (val.mapSubmitTime) {
        this.searchForm.mapSubmitTimeStart = val.mapSubmitTime[0]
        this.searchForm.mapSubmitTimeEnd = val.mapSubmitTime[1]
      } else {
        this.searchForm.mapSubmitTimeStart = ''
        this.searchForm.mapSubmitTimeEnd = ''
      }
      this.searchForm.centerId = val.centerId
      this.searchForm.productType = val.productType
      this.searchForm.productId = val.productId
      this.searchForm.applySumMax = val.applySumMax
      this.searchForm.applySumSmall = val.applySumSmall
      this.searchForm.newUserFlag = val.newUserFlag
      this.getPrereviewList(1)
    },
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
    handleEdit(row) {
      // console.log(row)
    },
    handleDel(row) {
      // console.log(row)
    },
    toggleRowSelection(that) {
      return that.clearSelection()
    },
    // 复选框选中项
    handleSelectionChange(val) {
      // console.log(val)
    },
    handleChangePage(val) {
      // this.searchForm.current = val
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
.LoanApplyFinishedList {
  .header {
    margin-top: 40px;
  }
}
</style>
