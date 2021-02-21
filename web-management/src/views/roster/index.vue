<template>
  <div class="container">
    <el-row>
      <el-tabs v-model="state.seaerchData.type" @tab-click="handleClick">
        <el-tab-pane label="黑名单" name="1"></el-tab-pane>
        <el-tab-pane label="灰名单" name="2"></el-tab-pane>
      </el-tabs>
      <div class="indexBottom">
        <el-button size="small" type="plain" icon="el-icon-upload" @click="state.uploadDialogVisible = true">
          批量导入
        </el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="state.rosterDialog = true">
          新增名单
        </el-button>
      </div>
    </el-row>
    <v-form title="" :subTitle="null">
      <template slot="content">
        <!-- 搜索 -->
        <Search ref="formSearch" :tableSearch="state.tableSearch" @handleSearch="handleSearch" @handleReset="handleReset" />
        <!-- 列表 -->
        <TableList
          border
          :columns="state.columns"
          :dataSource="state.dataSource"
          :operates="state.operates"
          :pagination="state.pagination"
          :dataTotal="state.dataTotal"
          @handleChangePage="handleChangePage"
          @handleChangePageSize="handleChangePageSize"
        />
      </template>
    </v-form>
    <!-- 批量上传 -->
    <UploadDialog
      :type="1"
      dialogTitle="导入"
      :dialogVisible="state.uploadDialogVisible"
      @closeDialog="closeUpFileDialog"
      filename="blackListImportTemplate.xlsx"
    ></UploadDialog>
    <!-- 增加、编辑名单弹框 -->
    <el-dialog title="名单" :visible.sync="state.rosterDialog" width="30%">
      <el-form :model="state.rosterForm" :rules="state.rosterFormRules" ref="rosterForm" label-width="130px" size="mini">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="state.rosterForm.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNo">
          <el-input v-model="state.rosterForm.idNo"></el-input>
        </el-form-item>
        <el-form-item label="入名单原因" prop="reason">
          <el-input v-model="state.rosterForm.reason"></el-input>
        </el-form-item>
        <el-form-item label="请选择名单类型" prop="type">
          <el-radio-group v-model="state.rosterForm.type">
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
import { ref, reactive, onMounted } from '@vue/composition-api'
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
  setup(props, ctx) {
    const { $confirm, $message } = ctx.root
    const rosterForm = ref(null)
    const formSearch = ref(null)
    const state = reactive({
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
            state.rosterForm = row
            state.rosterDialog = true
          }
        },
        {
          label: '移除',
          method: row => {
            handleDel(row)
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
      dataSource: [],
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
    })

    // 获取列表数据
    const getSourceData = async params => {
      const res = await getRosterList(params)
      state.dataTotal = res.data.total
      state.dataSource = res.data.records
    }
    // 搜索
    const handleSearch = params => {
      state.seaerchData = {
        ...state.seaerchData,
        current: 1,
        name: params.name,
        idNo: params.idNo,
        startTime: params.times && params.times[0],
        endTime: params.times && params.times[1]
      }
      state.pagination = {
        ...state.pagination,
        currentPage: 1
      }
      getSourceData(state.seaerchData)
    }
    // 新增\修改名单
    const submitRosterForm = () => {
      rosterForm.value.validate(valid => {
        if (valid) {
          if (state.rosterForm.id) {
            editRoster(state.rosterForm).then(res => {
              if (res.status === 200) {
                $message.success('操作成功')
                getSourceData(state.seaerchData)
                // 成功之后清空数据
                closeDialog()
              } else {
                $message.error('操作失败' + res.message)
              }
            })
          } else {
            addRoster(state.rosterForm).then(res => {
              if (res.status === 200) {
                getSourceData(state.seaerchData)
                $message.success('操作成功')
                // 成功之后清空数据
                closeDialog()
              } else {
                $message.error('操作失败' + res.message)
              }
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // 删除
    const handleDel = item => {
      $confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delRoster(item.id).then(res => {
            if (res.status === 200) {
              $message.success('操作成功')
              getSourceData(state.seaerchData)
            } else {
              $message.error('操作失败' + res.message)
              // MessageBox.error('操作失败' + res.message)
            }
          })
        })
        .catch(_ => {})
    }
    // 分页触发事件
    const handleChangePage = val => {
      state.pagination = {
        ...state.pagination,
        currentPage: val
      }
      state.seaerchData = {
        ...state.seaerchData,
        current: val
      }
      getSourceData(state.seaerchData)
    }
    const handleChangePageSize = pageSize => {
      state.pagination = {
        ...state.pagination,
        pageSize
      }
      state.seaerchData = {
        ...state.seaerchData,
        size: pageSize
      }
      getSourceData(state.seaerchData)
    }
    const handleReset = () => {
      state.seaerchData.name = ''
      state.seaerchData.idNo = ''
      state.seaerchData.startTime = ''
      state.seaerchData.endTime = ''
      getSourceData({ ...state.seaerchData })
    }
    // 名单切换
    const handleClick = (tab, event) => {
      document.getElementById('resetBtn').click()
      // handleReset()
      // formSearch.value.$refs.formSearch.resetFields() //有bug？
    }
    // 弹框
    const closeDialog = () => {
      state.rosterDialog = false
      // 移除校验值
      rosterForm.value.resetFields()
      state.rosterForm = {
        name: '',
        idNo: '',
        reason: '',
        type: ''
      }
    }
    const closeUpFileDialog = () => {
      state.uploadDialogVisible = false
      getSourceData({
        type: '1',
        size: 10,
        current: 1,
        pages: 0
      })
    }

    onMounted(() => {
      getSourceData(state.seaerchData)
    })

    return {
      state,
      getSourceData,
      handleClick,
      handleSearch,
      submitRosterForm,
      handleDel,
      handleChangePage,
      handleChangePageSize,
      handleReset,
      closeDialog,
      closeUpFileDialog,
      rosterForm,
      formSearch
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
