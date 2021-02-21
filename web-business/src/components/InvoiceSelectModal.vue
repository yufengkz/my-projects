<!--存量发票选择弹出框 -->
<template>
  <el-dialog title="添加发票" width="60%" :before-close="handleClose" :visible.sync="visible" custom-class="invoice-dialog">
    <div class="invoice_list">
      <el-form :model="searchForm" label-width="130px">
        <div class="search_content">
          <el-col :span="8">
            <el-form-item label="发票号码">
              <el-input v-model="searchForm.invoiceNo" placeholder="请输入发票号码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票代码">
              <el-input v-model="searchForm.invoiceCode" placeholder="请输入发票代码" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="验证真伪">
              <el-select v-model="searchForm.isFake" style="width:100%;">
                <el-option v-for="item in invoiceFakeSearchDic" :key="item.code" :label="item.name" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="发票日期区间">
              <el-date-picker
                style="width:100%;"
                v-model="searchForm.invoiceDate"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="text-align: right;">
            <el-button size="small" type="primary" class="wide-button" @click="searchInvoice">查询</el-button>
          </el-col>
        </div>
      </el-form>
      <el-row>
        <el-col>
          <el-button size="small" type="primary" class="wide-button" @click="selectInvoice">发票确定</el-button>
        </el-col>
      </el-row>
      <div class="table_box">
        <el-table
          ref="multipleTable"
          :data="invoiceTableData"
          size="mini"
          border
          class="fui-table"
          @selection-change="getSelectionChange"
          :row-key="getRowKey"
          style="width: 100%; text-align:center;"
        >
          <el-table-column type="selection" :reserve-selection="true" width="50" fixed :selectable="judgeSelectable"></el-table-column>
          <el-table-column label="验证真伪" width="100">
            <template slot-scope="scope">
              <span>{{invoiceFakeDic[scope.row.isFake]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="invoiceNo" label="发票号码" width="120"></el-table-column>
          <el-table-column prop="invoiceCode" label="发票代码" width="120"></el-table-column>
          <el-table-column prop="invoiceAmount" label="发票金额" :formatter="amountFormatter" width="120"></el-table-column>
          <el-table-column prop="invoiceAvailableAmount" label="发票可用金额" :formatter="amountFormatter" width="120"></el-table-column>
          <el-table-column prop="invoiceDate" label="发票日期" width="120"></el-table-column>
          <el-table-column prop="buyerName" label="购方名称" width="120"></el-table-column>
          <el-table-column prop="sellerName" label="销方名称" width="120"></el-table-column>
          <el-table-column prop="total" label="合计金额" :formatter="amountFormatter" width="120"></el-table-column>
          <el-table-column prop="totalTax" label="合计税额" :formatter="amountFormatter" width="120"></el-table-column>
          <el-table-column prop="checkCode" label="验证码后六位" width="120"></el-table-column>
          <el-table-column label="发票附件" width="120">
            <template slot-scope="scope">
              <a target="_blank" :href="scope.row.dataPath + '?attname=' + scope.row.realName">{{scope.row.realName}}</a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <span slot="footer">
      <el-button size="small" class="wide-button cancel-btn"  @click="closeDialog">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import api from '@/api/common.js'
import { ansFormatter } from '@/utils/tool.js'
export default {
  name: 'InvoiceSelectModal',
  props: {
    visible: {
      // 是否打开弹窗
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      detailId: String, // 使用应付账款详情接口返回的ID主键，避免路由传入的id未福金号导致的接口异常
      // outAlreadySelection: Array, // 发票表格已选择的发票合集
      currentPage: 1, // 当前页
      limit: 5, // 每页条数
      total: null, // 分页器显示的总条数
      searchForm: {
        invoiceNo: '', // 发票号码
        invoiceCode: '', // 发票代码
        invoiceDate: null, // 发票日期
        isFake: '' // 发票真伪
      },
      invoiceFakeSearchDic: [
        // 发票验证查询类型下拉框数据
        { name: '全部', code: '' },
        { name: '验证不通过', code: '0' },
        { name: '验证通过', code: '1' },
        { name: '无法验证', code: '2' },
        { name: '验证中', code: '3' }
      ],
      invoiceFakeDic: {
        // 发票验证类型数据字典
        0: '验证不通过',
        1: '验证通过',
        2: '无法验证',
        3: '验证中'
      },
      invoiceTableData: [], // 待选发票信息表格当前页数据
      alreadySelection: [], // 发票弹窗已选择的发票合集
      outInvoiceTableData: [] // 向外发送的发票信息表格数据
    }
  },
  created() {
    this.alreadySelection = this.$store.state.invoiceTable.outInvoiceData
    setTimeout(() => {
      this.$refs.multipleTable.store.states.selection = this.copyArr(this.alreadySelection)
      this.getInvoiceList()
    }, 500)
  },
  methods: {
    /* 深拷贝数组 */
    copyArr(arr) {
      return arr.map(e => {
        if (typeof e === 'object') {
          return Object.assign({}, e)
        } else {
          return e
        }
      })
    },
    /* 点击查询按钮 */
    searchInvoice() {
      this.currentPage = 1
      this.getInvoiceList()
    },
    /* 可用发票列表查询 */
    getInvoiceList() {
      api
        .getInvoiceList({
          accountPayableId: this.$store.state.invoiceTable.detailId, // 使用应付账款详情接口返回的ID主键，避免路由传入的id未福金号导致的接口异常
          invoiceNo: this.searchForm.invoiceNo,
          invoiceCode: this.searchForm.invoiceCode,
          invoiceDateFrom: this.searchForm.invoiceDate === null ? '' : this.searchForm.invoiceDate[0],
          invoiceDateTo: this.searchForm.invoiceDate === null ? '' : this.searchForm.invoiceDate[1],
          isFake: this.searchForm.isFake,
          limit: this.limit,
          page: this.currentPage
        })
        .then(res => {
          if (res.status === 200) {
            this.invoiceTableData = res.data.rows
            // 删除自定义字段invoiceAmountRemain，使用接口返回值invoiceAvailableAmount来表示发票可用余额-liudg-20190226
            // this.invoiceTableData.forEach(item => {
            //   item.invoiceAmountRemain = NP.plus(NP.minus(Number(item.invoiceAmount), Number(item.invoiceUsedAmount)), Number(item.usedAmount))
            //   item.tip = ''
            // })
            this.total = res.total
          } else {
            if (res.message) {
              this.$message.error(res.message)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    /* 确认发票 */
    selectInvoice() {
      this.dialogCancel()
      if (this.alreadySelection.length > 0) {
        // // 有勾选发票，需要查询发票对应信息
        // let idMap = ''
        // this.alreadySelection.forEach(item => {
        //   idMap += item.id + ','
        // })
        // this.queryInvoiceMap(idMap.substr(0, idMap.length - 1))
        this.handleInvoice()
        this.$emit('listenToInvoiceTableData', { isSelect: true, outInvoiceTableData: this.outInvoiceTableData })
      } else {
        // 未勾选发票，外部表格只需保留本次手动添加发票
        for (let i = this.outInvoiceTableData.length - 1; i >= 0; i--) {
          const oItem = this.outInvoiceTableData[i]
          if (oItem.id !== undefined) {
            // id存在则为勾选的发票，全部删除
            this.outInvoiceTableData.splice(i, 1)
          }
        }
        this.$emit('listenToInvoiceTableData', { isSelect: false, outInvoiceTableData: this.outInvoiceTableData })
      }
    },
    /* 查询使用该发票的所有应付账款的业务编号 */
    // queryInvoiceMap(idMap) {
    //   api
    //     .queryInvoiceMap({
    //       ids: idMap
    //     })
    //     .then(res => {
    //       if (res.status === 200) {
    //         const idArr = res.data.rows
    //         this.alreadySelection.forEach(mapItem => {
    //           const idItem = idArr.find(arrItem => arrItem.invoiceId === mapItem.id)
    //           if (idItem.businessNos.length > 0) {
    //             // 该发票有对应的应付账款业务编号
    //             let tipStr = ''
    //             idItem.businessNos.forEach(busItem => {
    //               tipStr += busItem + ','
    //             })
    //             // mapItem.tip = '该发票同时被应付账款业务编号' + tipStr.substr(0, tipStr.length - 1) + '使用'
    //             mapItem.tip = `该发票同时被应付账款业务编号${tipStr.substr(0, tipStr.length - 1)}使用`
    //           }
    //         })
    //       } else {
    //         if (res.message) {
    //           this.$message.error(res.message)
    //         }
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    /* 确认发票后向外部表格增删数据 */
    handleInvoice() {
      // 删除未勾选的
      for (let i = this.outInvoiceTableData.length - 1; i >= 0; i--) {
        const oItem = this.outInvoiceTableData[i]
        const tempItem = this.alreadySelection.find(aItem => aItem.id === oItem.id)
        if (tempItem === undefined && oItem.id !== undefined) {
          // 没找到 // 有id，说明非手动添加，需删除
          this.outInvoiceTableData.splice(i, 1)
        }
      }
      this.alreadySelection.forEach(aItem => {
        // 增加已勾选的
        const tempItem = this.outInvoiceTableData.find(oItem => aItem.id === oItem.id)
        if (tempItem === undefined) {
          // 没找到
          aItem.usedAmount = aItem.invoiceAvailableAmount // 将当前发票使用金额置为剩余可用金额的值
          this.outInvoiceTableData.push(aItem)
        }
      })
    },
    /* 向外发射发票表格数据 */
    emitInvoiceTableData(slef) {},
    /* 获取当次对话框所有已选发票，勾选项有修改时才有效 */
    getSelectionChange(selection) {
      this.alreadySelection = selection
    },
    /* 翻页 */
    handleCurrentChange(val) {
      this.currentPage = val
      this.getInvoiceList() // 获取企业列表
    },
    /* 金额格式化 */
    amountFormatter(row, column, cellValue, index) {
      return ansFormatter(cellValue)
    },
    /* 发票多选框是否可选择 */
    judgeSelectable(row, index) {
      if (row.isFake === 1 || row.isFake === '1') {
        // 发票验证通过
        return 1 // 可勾选
      } else {
        return 0 // 不可勾选
      }
    },
    // 弹窗取消
    dialogCancel() {
      this.$emit('dialogCancel')
    },
    getRowKey(row) {
      return row.id
    },
    /* 点击弹窗右上角x */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit('dialogCancel')
        })
        .catch(_ => {})
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.$emit('dialogCancel')
    },
    // 弹窗确定
    dialogOk() {
      this.$emit('dialogOk', this.selectedRow)
    },
    // 点击右上角x
    handleBeforeClose() {
      this.$emit('dialogCancel')
    }
  }
}
</script>
<style lang="scss">
.invoice_list {
  .search_content {
    overflow: hidden;
    // margin: 0 20px 0 -40px;
  }
  .search_button {
    text-align: center;
  }
  .table_box {
    margin-top: 10px;
  }
}
</style>
