<template>
  <div>
    <table-edit
      ref="table"
      :columns="columns"
      :data="productData"
      :pagination="false"
      :selectable="selectable"
      :sequence="sequence"
      row-key="uuid"
    />
    <div class="btns-center-box">
      <el-button class="btns-center-add" size="mini" icon="el-icon-plus" @click="dialogVisible = true">添加</el-button>
    </div>
    <el-dialog title="添加贷款产品信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" style="width:100%;">
        <el-form-item label="贷款产品" prop="selectProduct">
          <el-select v-model="form.selectProduct" placeholder="请选择贷款产品" style="width:80%;">
            <el-option
              v-for="item in $store.state.base.mapProducts"
              :key="item.id"
              :label="item.productName"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="$_handleAddLoan">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import TableEdit from '@/components/TableEdit'
import { editMapProducts } from '@/api/map'

export default {
  components: { TableEdit },
  props: {
    id: {
      type: String,
      default: ''
    },
    mapProductInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        selectProduct: ''
      },
      columns: Object.freeze([
        {
          label: '产品名称',
          prop: 'productName'
        },
        {
          label: '产品编号',
          prop: 'productCode'
        },
        {
          label: ' 设置限额（元）',
          prop: 'personLimit',
          editable: true,
          field: {
            componentType: 'input',
            rules: [
              {
                required: true,
                message: '请设置限额'
              }
            ]
          }
        },
        {
          label: '操作',
          width: '200',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.loanEditIds.includes(row.uuid),
              click: this.$_handleEditLoan
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.loanEditIds.includes(row.uuid),
              click: this.$_handleSaveLoan
            },
            {
              id: 'save',
              text: '取消',
              before: row => this.loanEditIds.includes(row.uuid),
              click: this.$_handleCancelLoan
            }
            // {
            //   id: 'edit',
            //   text: '删除',
            //   click: this.$_handleDelLoan
            // }
          ]
        }
      ]),
      productData: [],
      // 是否显示多选框
      selectable: false,
      // 是否显示序号列
      sequence: true,
      loanloanEditIds: []
    }
  },
  mounted() {
    // console.log(
    //   '%c 🥑 res: ',
    //   'font-size:20px;background-color: #7F2B82;color:#fff;',
    //   this.$store.state.base.loanProducts
    // )
    console.log(
      '%c 🥚 this.mapProductInfo: ',
      'font-size:20px;background-color: #2EAFB0;color:#fff;',
      this.mapProductInfo
    )
    //
    this.productData = JSON.parse(JSON.stringify(this.mapProductInfo)).map(item => {
      return {
        ...item,
        uuid: uuidv4(),
        label: item.productName,
        value: item.id + ''
      }
    })
    console.log('%c 🍗 this.productData: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', this.productData)
  },
  methods: {
    // 添加一行贷款产品
    $_handleAddLoan() {
      const pId = this.form.selectProduct.id
      if (!pId) return

      const obj = JSON.parse(JSON.stringify(this.form.selectProduct))

      obj.productId = pId
      delete obj.id
      const uuid = uuidv4()
      this.productData.push({
        ...obj,
        uuid
      })
      console.log('%c 🧀 this.productData: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', this.productData)
      this.dialogVisible = false
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.table.startEditRow(uuid)
      // 记录开启了行编辑的id
      this.loanEditIds.push(uuid)
      this.form.selectProduct = {}
    },
    $_handleEditLoan(row) {
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.table.startEditRow(row.uuid)
      // 记录开启了行编辑的id
      this.loanEditIds.push(row.uuid)
    },
    $_handleSaveLoan(row) {
      this.$refs.table.endEditRow(row.uuid, (valid, result, oldRow) => {
        if (valid) {
          // console.log('修改之后的数据', result)
          // console.log('原始数据', oldRow)
          const index = this.loanEditIds.findIndex(item => item === row.uuid)
          this.loanEditIds.splice(index, 1)
          // 添加到新的数组中
          console.log('修改之后的数据', result)
          this.productData = this.productData.map(item => {
            if (result.uuid === item.uuid) {
              console.log('%c 🍪 result: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', result)
              return result
            }
            return item
          })
          // 调用接口
          editMapProducts({ mapInfoId: this.id, ...result }).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          // 如果校验失败，则返回校验的第一个输入框的异常信息
          console.log(result)
          this.$message.error(result.message)
        }
      })
    },
    // 取消编辑
    $_handleCancelLoan(row) {
      console.log(row)
      // this.productData = this.productData.filter(item => {
      //   if (item.uuid !== row.uuid) {
      //     return item
      //   }
      // })
      this.$refs.table.cancelEditRow(row.uuid)
      const index = this.loanEditIds.findIndex(item => item === row.uuid)
      this.loanEditIds.splice(index, 1)
    },
    // 删除一行
    $_handleDelLoan(row) {
      this.productData = this.productData.filter(item => {
        if (item.uuid !== row.uuid) {
          return item
        }
      })
      const index = this.loanEditIds.findIndex(item => item === row.uuid)
      this.loanEditIds.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
