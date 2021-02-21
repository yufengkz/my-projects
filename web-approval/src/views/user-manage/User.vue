<template>
  <div class="app-container">
    <span class="all-main-tit all-tit-bar"></span>
    <span class="all-main-tit all-tit-con">用户配置</span>
    <el-form
      ref="searchForm"
      :model="searchForm"
      size="small"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="姓名" prop="userName" label-width="60px">
            <el-input v-model="searchForm.userName" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobileNo" label-width="80px">
            <el-input v-model="searchForm.mobileNo" placeholder="请输入" maxlength="11"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item label="角色" prop="roleId" label-width="60px">
            <el-select v-model="searchForm.roleId" placeholder="请选择" clearable>
              <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div class="text-right">
            <el-button type="primary" class="wide-button" size="small" @click="getListData(1)">查询</el-button>
            <el-button size="small" plain class="wide-button" @click="resetForm('searchForm')">重置</el-button>
            <el-button size="small" plain type="primary" icon="el-icon-circle-plus-outline" @click="addUser">
              新增用户
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData" border="" style="width: 100%;" size="medium" class="m-t-30">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="mobileNo" label="手机号"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" min-width="100px"></el-table-column>
      <el-table-column prop="status" label="操作" min-width="100px">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUser(scope.row)">编辑</el-button>
          <span style="color:#D0E1FF">|</span>
          <el-button type="text" size="small" @click="delUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
                <el-radio v-for="item in roleOptions" :label="item.id" :value="item.id" :key="item.id">
                  {{ item.roleName }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="searchForm.pageNum"
      :page-size="searchForm.size"
      :page-sizes="[10, 20, 50]"
      layout="total,prev, pager, next, sizes, jumper"
      :total="total"
      background=""
      :small="true"
      class="m-t-20 text-center"
    ></el-pagination>
  </div>
</template>

<script>
import { validateMobile } from '@/utils/validate'
import { getRoleOptions, getUserList, addUser, updateUser, deleteUser } from '@/api/user'
export default {
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
      roleOptions: [], // 角色下拉框选项
      searchForm: {
        userName: '',
        mobileNo: '',
        roleId: '',
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
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
      } else {
        this.$message.error(res.message || '获取角色信息失败，请稍后重试')
      }
    })
    this.getListData(1)
  },
  methods: {
    // 重置form
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取用户分页列表
    getListData(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      getUserList(this.searchForm).then(res => {
        if (res.code === 200) {
          this.tableData = (res.data && res.data.records) || []
          this.total = (res.data && res.data.total) || 0
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
          this.tableData = []
          this.total = 0
        }
      })
    },
    handlePageChange(val) {
      this.getListData(val)
    },
    handleSizeChange(val) {
      this.searchForm.current = 1
      this.searchForm.size = val
      this.getListData(1)
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
            addUser(this.submitForm).then(res => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                this.getListData(1)
              } else {
                this.$message.error(res.message || '新增失败，请稍后重试')
              }
            })
          } else {
            updateUser(this.submitForm).then(res => {
              if (res.code === 200) {
                this.$message.success('修改成功')
                this.getListData(1)
              } else {
                this.$message.error(res.message || '修改失败，请稍后重试')
              }
            })
          }
          this.dialogVisible = false
        }
      })
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
          deleteUser(rowContent.id).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getListData(1)
            } else {
              this.$message.error(res.message || '删除失败')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
