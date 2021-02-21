<template>
  <div class="container">
    <el-row>
      <el-tabs v-model="seaerchData.type" @tab-click="handleClick">
        <el-tab-pane label="黑名单" name="1"></el-tab-pane>
        <el-tab-pane label="灰名单" name="2"></el-tab-pane>
      </el-tabs>
      <div class="indexBottom">
        <el-button size="small" type="plain" icon="el-icon-upload" @click="uploadDialogVisible = true">
          批量导入
        </el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="rosterDialog = true">
          新增名单
        </el-button>
      </div>
    </el-row>
    <v-form title="" :subTitle="null">
      <template slot="content">
        <!-- 搜索 -->
        <Search ref="formSearch" :tableSearch="tableSearch" @handleSearch="handleSearch" @handleReset="handleReset" />
        <!-- 列表 -->
        <TableList
          border
          :columns="columns"
          :dataSource="dataSource"
          :operates="operates"
          :pagination="pagination"
          :dataTotal="dataTotal"
          @handleChangePage="handleChangePage"
          @handleChangePageSize="handleChangePageSize"
        />
      </template>
    </v-form>
    <!-- 批量上传 -->
    <!-- <UploadDialog
      :type="1"
      dialogTitle="批量导入"
      fiilApi="/operate/api/black-list/batch"
      :dialogVisible="uploadDialogVisible"
      @closeDialog="uploadDialogVisible = false"
    ></UploadDialog> -->
    <!-- 批量上传 -->
    <UploadDialog :type="1" dialogTitle="导入" :dialogVisible="uploadDialogVisible" @closeDialog="closeUpFileDialog"></UploadDialog>
    <!-- 增加、编辑名单弹框 -->
    <el-dialog title="名单" :visible.sync="rosterDialog" width="30%">
      <el-form :model="rosterForm" :rules="rosterFormRules" ref="rosterForm" label-width="130px" size="mini">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="rosterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="rosterForm.idNo"></el-input>
        </el-form-item>
        <el-form-item label="入名单原因" prop="reason">
          <el-input v-model="rosterForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="请选择名单类型" prop="type">
          <el-radio-group v-model="rosterForm.type">
            <el-radio label="1">黑名单</el-radio>
            <el-radio label="2">灰名单</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitRosterForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'

import { getRosterList, addRoster, delRoster, editRoster } from '@/api/roster'

export default {
  components: {
    VForm,
    Search,
    TableList,
    UploadDialog: () => import('@/components/UploadDialog')
  },
  data() {
    return {
      uploadDialogVisible: false,
      // 搜索框数据
      tableSearch: [
        {
          label: '姓名',
          type: 'number',
          value: 'name'
        },
        {
          label: '身份证号',
          type: 'text',
          value: 'idNo'
        },
        {
          label: '入名单时间',
          value: 'times',
          type: 'daterange'
        }
      ],
      // 列表表头
      columns: [
        {
          prop: 'name',
          label: '姓名',
          align: 'center'
        },
        {
          prop: 'idNo',
          label: '身份证号',
          align: 'center'
        },
        {
          prop: 'inputTime',
          label: '入名单时间',
          align: 'center'
        },
        {
          prop: 'reason',
          label: '入名单原因',
          align: 'center'
        }
      ],
      // 扩展性操作按钮
      operates: [
        {
          label: '变更',
          method: (row, index) => {
            this.rosterForm = row
            this.rosterDialog = true
          }
        },
        {
          label: '移除',
          method: (row, index) => {
            this.handleDel(row, index)
          }
        }
      ],
      selection: false,
      pagination: {
        currentPage: 1,
        pageSize: 10
      },
      dataTotal: 0,
      // 查询参数
      seaerchData: {
        type: '1',
        size: 10,
        current: 1,
        pages: 0
      },
      dataSource: [
        // {
        //   id: '',
        //   code: '',
        //   name: '',
        //   province: '',
        //   city: '',
        //   county: '',
        //   serviceType: '',
        //   businessFlag: '',
        //   status: '' // 0关 1开
        // }
      ],
      // 添加名单弹框数据 👇
      rosterDialog: false,
      rosterForm: {
        name: '',
        idNo: '',
        reason: '',
        type: '' // 1黑名单 2灰名单
      },
      rosterFormRules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        reason: [{ required: true, message: '请输入入单原因', trigger: 'blur' }],
        type: [{ required: true, message: '请选择名单类型', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getSourceData(this.seaerchData)
  },
  methods: {
    // 获取列表数据
    async getSourceData(params) {
      const res = await getRosterList(params)
      this.dataTotal = res.data.total
      this.dataSource = res.data.records
    },
    // 名单切换
    handleClick(tab, event) {
      // this.handleReset()
      document.getElementById('resetBtn').click()
      // this.$refs.formSearch.$refs.formSearch.resetFields()
      // this.seaerchData = { ...this.seaerchData }
      // this.getSourceData(this.seaerchData)
    },
    // 搜索
    handleSearch(params) {
      console.log('%c 🍑 params: ', 'font-size:20px;background-color: #B03734;color:#fff;', params)
      this.seaerchData = {
        ...this.seaerchData,
        current: 1,
        name: params.name,
        idNo: params.idNo,
        startTime: params.times && params.times[0],
        endTime: params.times && params.times[1]
      }
      this.getSourceData(this.seaerchData)
    },
    // 新增\修改名单
    submitRosterForm() {
      this.$refs.rosterForm.validate(valid => {
        if (valid) {
          if (this.rosterForm.id) {
            editRoster(this.rosterForm).then(res => {
              if (res.status === 200) {
                this.getSourceData(this.seaerchData)
                this.$message.success('操作成功')
                // 成功之后清空数据
                this.closeDialog()
              } else {
                this.$message.error('操作失败' + res.message)
              }
            })
          } else {
            addRoster(this.rosterForm).then(res => {
              if (res.status === 200) {
                this.getSourceData(this.seaerchData)
                this.$message.success('操作成功')
                // 成功之后清空数据
                this.closeDialog()
              } else {
                this.$message.error('操作失败' + res.message)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    handleDel(item) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoster(item.id).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.getSourceData(this.seaerchData)
          } else {
            this.$message.error('操作失败' + res.message)
          }
        })
      })
    },
    // 分页触发事件
    handleChangePage(val) {
      this.pagination = {
        ...this.pagination,
        currentPage: val
      }
      this.seaerchData = {
        ...this.seaerchData,
        current: val
      }
      this.getSourceData(this.seaerchData)
    },
    handleChangePageSize(pageSize) {
      this.pagination = {
        ...this.pagination,
        pageSize
      }
      this.seaerchData = {
        ...this.seaerchData,
        size: pageSize
      }
      this.getSourceData(this.seaerchData)
    },
    handleReset() {
      delete this.seaerchData.name
      delete this.seaerchData.idNo
      delete this.seaerchData.startTime
      delete this.seaerchData.endTime
      this.getSourceData(this.seaerchData)
    },
    // 弹框
    closeDialog() {
      this.rosterDialog = false
      // 移除校验值
      this.$refs.rosterForm.resetFields()
      this.rosterForm = {
        name: '',
        idNo: '',
        reason: '',
        type: ''
      }
    },
    closeUpFileDialog() {
      this.uploadDialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-tabs__header {
  padding: 10px 20px 0 21px !important;
  position: relative;
  margin: 0 !important;
  background: #fff !important;
}
.indexTop {
  position: relative;
  width: 100%;
  /*height: 500px;*/
}
.indexBottom {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
