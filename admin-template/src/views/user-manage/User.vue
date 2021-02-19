<template>
  <div class="app-container">
    <span class="all-main-tit all-tit-bar"></span>
    <span class="all-main-tit all-tit-con">用户配置</span>
    <!--      输入框 组件-->
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!--      表格组件-->
    <div class="m-t-30">
      <TableList
        border
        :options="options"
        :columns="columns"
        :dataSource="dataSource"
        :operates="operates"
        :pagination="pagination"
        :dataTotal="dataTotal"
        :exportBut="exportBut"
        @toggleRowSelection="toggleRowSelection"
        @handleSelectionChange="handleSelectionChange"
        @handleChangePage="handleChangePage"
        @handleChangePageSize="handleChangePageSize"
      />
    </div>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dialogTitle" :visible="dialogVisible" :show-close="false" @closed="resetSubmitForm">
      <el-form :model="submitForm" :rules="rules" ref="submitForm">
        <el-row :gutter="40">
          <el-col :span="22" :offset="1">
            <el-form-item label="用户名" prop="userName" label-width="120px">
              <el-input v-model="submitForm.userName" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="22" :offset="1">
            <el-form-item label="手机号" prop="mobileNo" label-width="120px">
              <el-input v-model="submitForm.mobileNo" placeholder="请输入" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="22" :offset="1">
            <el-form-item label="角色" prop="roleIds" label-width="120px">
              <el-radio-group v-model="submitForm.roleIds">
                <el-radio v-for="item in roleOptions" :label="item.id" :value="item.id" :key="item.id">{{item.roleName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableList from '@/components/Tables/TableList'
import Search from '@/components/Tables/Search'
import { validateMobile } from '@/utils/validate'
import { getUserList } from '@/api/user'
import { getRoleOptions } from '@/api/mock'

// 搜索框数据
const tableSearch = [
  {
    label: '申请编号',
    value: 'id',
    type: 'text'
  },
  {
    label: '客户姓名',
    value: 'userName',
    type: 'text'
  },
  {
    label: '客户手机号',
    value: 'mobileNo',
    type: 'text'
  },
  {
    label: '角色',
    value: 'roleIds',
    type: 'select',
    children: []
  },
  {
    type: 'daterange',
    label: '提交时间',
    value: 'applyTime'
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
    prop: 'realName',
    label: '客户姓名',
    align: 'center'
  },
  {
    prop: 'mobileNo',
    label: '客户手机号',
    align: 'center'
  },
  {
    prop: 'creditCode',
    label: '客户身份证',
    align: 'center'
  },
  {
    prop: 'statusName',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '提交时间',
    align: 'center'
  },
  {
    prop: 'roleName',
    label: '角色名称',
    align: 'center'
  }
]
const dataSource = []
export default {
  components: {
    Search,
    TableList
  },
  data() {
    // 手机号校验
    const validateMobileNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
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
          label: '编辑',
          isShow: (row, index) => true,
          method: (row, index) => {
            this.editUser(row)
          }
        }
      ],
      // 序号、单选、多选...
      options: {
        index: true,
        isShow: (row, index) => true
      },
      exportBut: [
        {
          title: '新增用户',
          icon: 'el-icon-circle-plus-outline',
          method: () => {
            this.addUser()
          }
        }
      ],
      roleOptions: [], // 角色下拉框选项
      searchForm: {
        userName: '',
        mobileNo: '',
        roleId: '',
        current: 1,
        size: 10
      },
      submitForm: {
        userId: '',
        userName: '',
        mobileNo: '',
        roleIds: ''
      },
      dialogTitle: '', // 弹窗标题
      dialogVisible: false,
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, message: '长度2个字符以上', trigger: 'blur' }
        ],
        mobileNo: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { required: true, trigger: 'blur', validator: validateMobileNo }
        ],
        roleIds: [{ required: true, trigger: 'blur', message: '请选择角色' }]
      }
    }
  },
  created() {
    getRoleOptions().then(res => {
      if (res.code === 200) {
        this.roleOptions = res.data
        res.data.forEach(item => {
          this.tableSearch[3].children.push({
            value: item.id,
            label: item.roleName
          })
        })
      } else {
        this.$message.error(res.message || '获取角色信息失败，请稍后重试')
      }
    })
    this.getListData(1)
  },
  methods: {
    // 获取用户分页列表
    getListData(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      getUserList(this.searchForm).then(res => {
        if (res.code === 200) {
          this.dataSource = res.data.records
          this.dataTotal = res.data.total
          this.tableData = (res.data && res.data.records) || []
          this.total = (res.data && res.data.total) || 0
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
          this.dataSource = []
          this.dataTotal = 0
          this.tableData = []
          this.total = 0
        }
      })
    },
    // 点击新增用户按钮触发
    addUser() {
      this.dialogVisible = true
      this.dialogTitle = '新增用户'
    },
    // 点击编辑按钮触发
    editUser(row) {
      this.dialogVisible = true
      this.dialogTitle = '编辑用户'
      this.submitForm = {
        userId: row.id,
        userName: row.userName,
        mobileNo: row.mobileNo,
        roleIds: Number(row.roleId) || row.roleId
      }
    },
    // 点击弹窗表单确认按钮触发
    submit() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增用户') {
            // addUser(this.submitForm).then(res => {
            //   if (res.code === 200) {
            this.$message.success('新增成功')
            this.getListData(1)
            //   } else {
            //     this.$message.error(res.message || '新增失败，请稍后重试')
            //   }
            // })
          } else {
            // updateUser(this.submitForm).then(res => {
            // if (res.code === 200) {
            this.$message.success('修改成功')
            this.getListData(1)
            // } else {
            // this.$message.error(res.message || '修改失败，请稍后重试')
          }
          // })
          // }
          this.dialogVisible = false
        }
      })
    },
    handleSearch(val) {
      this.searchForm = Object.assign({}, val)
      this.getListData(1)
    },
    // 删除用户
    delUser(rowContent) {
      this.$msgbox({
        title: '用户删除',
        message: '请确认是否删除该用户？',
        showCancelButton: true,
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        closeOnClickModal: false,
        type: 'warning',
        center: true,
        customClass: 'msgbox'
      }).then(action => {
        if (action === 'confirm') {
          // deleteUser(rowContent.id).then(res => {
          //   if (res.code === 200) {
          //     this.$message.success('删除成功')
          //     this.getListData(1)
          //   } else {
          //     this.$message.error(res.message || '删除失败')
          //   }
          // })
        }
      })
    },
    toggleRowSelection(that) {
      return that.clearSelection()
    },
    // 复选框选中项
    handleSelectionChange(val) {
      console.log(val)
    },
    handleChangePage(val) {
      this.searchForm.current = val
      this.getListData(val)
    },
    handleChangePageSize(val) {
      this.searchForm.current = 1
      this.searchForm.size = val
      this.getListData(1)
    },
    // 重置提交表单
    resetSubmitForm() {
      this.submitForm = {
        userId: '',
        userName: '',
        mobileNo: '',
        roleIds: ''
      }
      this.$refs.submitForm.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
