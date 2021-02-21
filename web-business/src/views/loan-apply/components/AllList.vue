/* 「全部」列表Tab */
<template>
  <div class="app-container LoanApplyUnderwayList">
    <!--      输入框 组件-->
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch"/>
    <!--  表格组件-->
    <div class="header">
      <TableList
        border
        :columns="columns"
        :dataSource="dataSource"
        :operates="operates"
        :pagination="pagination"
        :dataTotal="dataSource.length"
        @toggleRowSelection="toggleRowSelection"
        @handleSelectionChange="handleSelectionChange"
        @handleChangePage="handleChangePage"
      />
    </div>
  </div>
</template>
<script>
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'
// 输入框数据
const tableSearch = [
  {
    label: '申请编号',
    value: 'applyNum',
    type: 'text'
  },
  {
    label: '客户姓名',
    value: 'name',
    type: 'text'
  },
  {
    label: '客户手机号',
    value: 'customTel',
    type: 'text'
  },
  {
    label: '状态',
    value: 'status',
    type: 'select',
    children: [
      {
        label: '待征信授权审批',
        value: 1
      },
      {
        label: '已提交审批',
        value: 2
      }
    ]
  },
  {
    type: 'picker',
    label: '办结时间',
    value: 'picker'
  },
  {
    label: '产品类型',
    value: 'product',
    type: 'select',
    children: [
      {
        label: '农资贷',
        value: 1
      },
      {
        label: '农地贷',
        value: 2
      }
    ]
  },
  {
    label: '产品名称',
    value: 'product',
    type: 'select',
    children: [
      {
        label: '农资贷001',
        value: 1
      },
      {
        label: '农地贷001',
        value: 2
      }
    ]
  },
  {
    label: '是否新客户',
    value: 'newOrOld',
    type: 'select',
    children: [
      {
        label: '是',
        value: 1
      },
      {
        label: '否',
        value: 2
      }
    ]
  },
  {
    type: 'input',
    label: '授信额度',
    valueLow: 'applyLow',
    valueHeight: 'valueHeight',
    apply: 'section'
  },
  {
    label: '所属MAP',
    value: 'belongToMAP',
    type: 'select',
    children: [
      {
        label: '农资贷001',
        value: 1
      },
      {
        label: '农地贷001',
        value: 2
      }
    ]
  }]
// 表格 表头数据
const dataSource = [
  {
    edit: true,
    applyNumber: '0000000000',
    name: '张穆庭',
    userTel: '19145867548',
    userID: '548751546897412548',
    productBig: '农资贷',
    productSon: '农资贷001',
    newOrOld: '是',
    status: '审批通过',
    submitTime: '2020-10-8 10:10:10',
    belongToMAP: '河北沧州泊头_00012345'
  },
  {
    edit: true,
    applyNumber: '1111111111',
    name: '王一萱',
    userTel: '181458745556',
    userID: '242221199502548796',
    productBig: '农资贷',
    productSon: '农资贷001',
    newOrOld: '否',
    status: '审批拒绝',
    submitTime: '2020-10-8 10:10:10',
    belongToMAP: '河北沧州泊头_00012345'
  }
]
export default {
  name: 'LoanApplyUnderwayList',
  components: {
    Search, TableList
  },
  data() {
    return {
      tableSearch,
      dataSource,
      isAdmin: 'm', // m-经理 c-专员  假数据，需改
      columns: [ // 表格表头项
        {
          prop: 'applyNumber',
          label: '申请编号',
          align: 'center'
        },
        {
          prop: 'name',
          label: '客户姓名',
          align: 'center'
        },
        {
          prop: 'userTel',
          label: '客户手机号',
          align: 'center'
        },
        {
          prop: 'userID',
          label: '客户身份证',
          align: 'center'
        },
        {
          prop: 'productBig',
          label: '产品大类',
          align: 'center'
        },
        {
          prop: 'productSon',
          label: '产品子类',
          align: 'center'
        },
        {
          prop: 'newOrOld',
          label: '是否新客户',
          align: 'center'
        },
        {
          prop: 'status',
          label: '状态',
          align: 'center'
        },
        {
          prop: 'submitTime',
          label: '办结时间',
          align: 'center'
        },
        {
          prop: 'belongToMAP',
          label: '所属MAP',
          align: 'center'
        }
      ],
      // 分页
      pagination: {
        currentPage: 1,
        pageSize: 15,
        dataTotal: 20
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => this.handleDetails(row, index)
        }
      ]
    }
  },
  created() {
    this.isAdminHandle()
  },
  mounted() {},
  methods: {
    // 判断用户身份
    isAdminHandle() {
      if (this.isAdmin === 'c') {
        this.tableSearch.splice(-1, 1)
      }
    },
    handleSearch(val) {},
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage() {}
  }
}
</script>
<style lang="scss">
  .LoanApplyUnderwayList {
    .header {
      margin-top: 40px;
    }
    overflow: hidden;
    .btn-operates {
      margin-bottom: 6px;
      text-align: right;
      a {
        color: #fff;
        text-decoration: none;
        display: inline-block;
        margin-left: 15px;
      }
    }
  }
  .table-header {
    padding-top: 10px;
    .table-header_button {
      text-align: right;
      float: right;
      margin-bottom: 12px;
      line-height: 40px;
    }
  }
  .newjump {
    text-decoration: none;
    color: dodgerblue;
  }
  .operate-group {
    .operate-group-item {
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -2px;
        transform: translateY(-50%);
        height: 80%;
        border-left: solid 1px #ccc;
      }
    }
    & :last-child {
      &::after {
        content: '';
        height: 0;
      }
    }
  }
</style>
