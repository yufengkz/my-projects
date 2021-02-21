/* [自然担保人审批详情] 历史审批记录组件 */
<template>
  <div class="historicalApprovalRecord">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <template v-for="(item, index) in TabData">
            <el-tab-pane :label="item.label" :name="item.name" :key="index">
              <Search :tableSearch="item.tableSearch" @handleSearch="handleSearch" />
              <TableList
                border
                :columns="item.columns"
                :dataSource="item.dataSource"
                :operates="item.operates"
                :pagination="item.pagination"
                :dataTotal="item.pagination.dataTotal"
                @toggleRowSelection="toggleRowSelection"
                @handleSelectionChange="handleSelectionChange"
                @handleChangePage="handleChangePage"
                @handleChangePageSize="handleChangePageSize"
              />
            </el-tab-pane>
          </template>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  historyCreditSelect,
  historyEnsureSelect,
  getQueryApproveResult
  // getQueryMAP
  // getQueryProduct
} from '@/api/approval'
import { mapGetters } from 'vuex'

export default {
  name: 'HistoricalApprovalRecord',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      activeName: 'first',
      TabData: [
        {
          label: '授信审批记录',
          name: 'first',
          fromSearch: {
            current: 1,
            size: 10,
            customerId: this.$route.query.customerId // 客户id 需要添加动态的
          },
          tableSearch: [
            { label: '申请编号', value: 'applyNo', type: 'text' },
            {
              label: '所属MAP',
              value: 'mapStationCode',
              type: 'select',
              children: []
            },
            { label: '申请人', value: 'applyCommiter', type: 'text' },
            { label: '终审人', value: 'submitName', type: 'text' },
            {
              label: '审批结果',
              value: 'statusType',
              type: 'select',
              children: []
            },
            {
              label: '产品',
              value: 'productName',
              type: 'select',
              children: []
            }
          ],
          columns: [
            { prop: 'applyNo', label: '申请编号', align: 'center' },
            { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
            { prop: 'productName', label: '产品', align: 'center' },
            { prop: 'approveAmount', label: '审批金额', align: 'center', ansFormatter: true },
            { prop: 'mapStationName', label: '所属MAP', align: 'center' },
            { prop: 'updatedTime', label: '审批时间', align: 'center' },
            { prop: 'submitName', label: '终审人', align: 'center' },
            {
              prop: 'status',
              label: '审核结果',
              align: 'center'
            }
          ],
          dataSource: [],
          pagination: {
            current: 1,
            pageSize: 10,
            dataTotal: 0
          },
          operates: [
            {
              label: '查看',
              isShow: (row, index) => row !== 1,
              method: (row, index) => {
                this.$router.push({ path: '/approval/credit/detail', query: { applyNo: row.applyNo, isShow: '2', customerId: this.$route.query.customerId } })
              }
            }
          ]
        },
        {
          label: '担保审批记录',
          name: 'second',
          fromSearch: {
            current: 1,
            size: 10,
            customerId: this.$route.query.customerId
          },
          tableSearch: [
            { label: '申请编号', value: 'applyNo', type: 'text' },
            {
              label: '所属MAP',
              value: 'mapStationCode',
              type: 'select',
              children: []
            },
            { label: '申请人', value: 'applyCommiter', type: 'text' },
            { label: '终审人', value: 'submitName', type: 'text' },
            {
              label: '审批结果',
              value: 'statusType',
              type: 'select',
              children: []
            }
          ],
          columns: [
            { prop: 'applyNo', label: '申请编号', align: 'center' },
            { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
            { prop: 'approveAmount', label: '担保金额', align: 'center', ansFormatter: true },
            { prop: 'mapStationName', label: '所属MAP', align: 'center' },
            { prop: 'updatedTime', label: '审批时间', align: 'center' },
            { prop: 'submitName', label: '终审人', align: 'center' },
            { prop: 'status', label: '审核结果', align: 'center' }
          ],
          dataSource: [],
          pagination: {
            current: 1,
            pageSize: 10,
            dataTotal: 0
          },
          operates: [
            {
              label: '查看',
              isShow: (row, index) => row !== 1,
              method: (row, index) => {
                // this.$router.push({ path: '/approval/natural/detail', query: { applyNo: '204002775823560704', isShow: '2' } })
                this.$router.push({ path: '/approval/natural/detail', query: { applyNo: row.applyNo, isShow: '2' } })
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['mapProducts', 'MAPList'])
  },
  created() {
    // 授信审批
    this.getHistiryCreditInfo()
    // 担保审批
    this.getHistiryEnsureInfo()
    // // 下拉框数据
    this.initSelectList()
  },
  // 根据用户获取当前map中心
  async mounted() {
    await this.$store.dispatch('GetMAPProducts')
    await this.$store.dispatch('GetMAPList')
    this.mapProductsOptions = this.mapProducts.map(item => {
      // 查询条件通过name查询
      return {
        label: item.name,
        value: item.name
      }
    })
    this.mapOptions = this.MAPList
    // 设置下拉列表
    this.TabData[0].tableSearch = this.TabData[0].tableSearch.map(item => {
      if (item.value === 'productName') {
        return {
          ...item,
          children: this.mapProductsOptions
        }
      } else if (item.value === 'mapStationCode') {
        return {
          ...item,
          children: this.mapOptions
        }
      }
      return item
    })
    this.TabData[1].tableSearch = this.TabData[1].tableSearch.map(item => {
      if (item.value === 'mapStationCode') {
        return {
          ...item,
          children: this.mapOptions
        }
      }
      return item
    })
  },
  methods: {
    // 获取状态下拉框 map中心下拉框的数据
    initSelectList() {
      Promise.all([getQueryApproveResult()]).then(
        ([resultList, mapList]) => {
          if (resultList.status === 200) {
            // 修改授信审批search select的数据
            // this.TabData[0].tableSearch[1].children = mapList.data && mapList.data.map(item => {
            //   return { ...item, label: item.name, value: item.code }
            // })
            this.TabData[0].tableSearch[4].children = resultList.data && Object.keys(resultList.data).map(item => {
              return { label: resultList.data[item], value: item }
            })
            // this.TabData[0].tableSearch[5].children = productList.data && productList.data.map(item => {
            //   return { ...item, label: item.productName, value: item.type }
            // })
            // 修改担保审批search select的数据
            // this.TabData[1].tableSearch[1].children = mapList.data && mapList.data.map(item => {
            //   return { ...item, label: item.name, value: item.code }
            // })
            this.TabData[1].tableSearch[4].children = resultList.data && Object.keys(resultList.data).map(item => {
              return { label: resultList.data[item], value: item }
            })
          }
        }
      )
    },
    // 获取授信审批历史记录信息
    async getHistiryCreditInfo() {
      const result = await historyCreditSelect(this.TabData[0].fromSearch)
      if (result.status === 200) {
        this.TabData[0].dataSource = result.data.records || []
        this.TabData[0].pagination.dataTotal = result.data.total || 0
      } else {
        this.$message.error(result.message || '失败了')
        this.TabData[0].dataSource = []
      }
    },
    // 获取担保审批历史记录信息
    async getHistiryEnsureInfo() {
      const result = await historyEnsureSelect(this.TabData[1].fromSearch)
      if (result.status === 200) {
        this.TabData[1].dataSource = result.data.records || []
        this.TabData[1].pagination.dataTotal = result.data.total || 0
      } else {
        this.TabData[1].dataSource = []
        this.$message.error(result.message || '失败了')
      }
    },
    handleSearch(val) {
      // first 是授信审批 其他是担保审批
      if (this.activeName === 'first') {
        this.TabData[0].fromSearch = {
          ...this.TabData[0].fromSearch,
          applyCommiter: val.applyCommiter,
          applyNo: val.applyNo,
          mapStationCode: val.mapStationCode,
          productName: val.productName,
          statusType: val.statusType,
          submitName: val.submitName
        }
        this.getHistiryCreditInfo()
      } else {
        this.TabData[1].fromSearch = {
          ...this.TabData[1].fromSearch,
          applyNo: val.applyNo,
          applyCommiter: val.applyCommiter,
          mapStationCode: val.mapStationCode,
          statusType: val.statusType,
          submitName: val.submitName
        }
        this.getHistiryEnsureInfo()
      }
    },
    handleClick(tab, event) {},
    toggleRowSelection() {},
    handleSelectionChange() {},
    // 切换页码
    handleChangePage(page) {
      if (this.activeName === 'first') {
        this.TabData[0].pagination = {
          ...this.TabData[0].pagination,
          current: page
        }
        this.TabData[0].fromSearch = {
          ...this.TabData[0].fromSearch,
          current: page
        }
        this.getHistiryCreditInfo()
      } else {
        this.TabData[1].pagination = {
          ...this.TabData[1].pagination,
          current: page
        }
        this.TabData[1].fromSearch = {
          ...this.TabData[1].fromSearch,
          current: page
        }
        this.getHistiryEnsureInfo()
      }
    },
    // 切换每页显示的条数
    handleChangePageSize(pageSize) {
      if (this.activeName === 'first') {
        this.TabData[0].pagination = {
          ...this.TabData[0].pagination,
          pageSize
        }
        this.TabData[0].fromSearch = {
          ...this.TabData[0].fromSearch,
          size: pageSize,
          current: 1
        }
        this.getHistiryCreditInfo()
      } else {
        this.TabData[1].pagination = {
          ...this.TabData[1].pagination,
          pageSize
        }
        this.TabData[1].fromSearch = {
          ...this.TabData[1].fromSearch,
          size: pageSize,
          current: 1
        }
        this.getHistiryEnsureInfo()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.historicalApprovalRecord {
  /deep/ .el-col-xl-6 {
    min-width: 30%;
  }
  /deep/ .el-form {
    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form-item {
        .el-form-item__label {
          min-width: 70px;
        }
        .el-form-item__content {
          min-width: 128px;
        }
      }
    }
  }
}
</style>
