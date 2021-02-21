<template>
  <div class="container">
    <v-form title="用户配置" :subTitle="null">
      <template slot="header-btns">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addUser">
          新增用户
        </el-button>
      </template>
      <template slot="content">
        <el-form ref="searchForm" :model="searchForm" size="mini" class="m-t-20 block-el-select" label-position="right" label-width="140px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="userName" label-width="30%">
                <el-input v-model="searchForm.userName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号" prop="mobileNo" label-width="30%">
                <el-input v-model="searchForm.mobileNo" placeholder="请输入" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="邮箱" prop="email" label-width="30%">
                <el-input v-model="searchForm.email" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" prop="status" label-width="30%">
                <el-select v-model="searchForm.status" placeholder="请选择" clearable>
                  <!-- 状态0启用 1禁用 2锁定 -->
                  <el-option label="启用" value="0"></el-option>
                  <el-option label="禁用" value="1"></el-option>
                  <!-- <el-option label="锁定" value="2"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="角色" prop="roleId" label-width="30%">
                <el-select v-model="searchForm.roleId" placeholder="请选择" clearable>
                  <el-option v-for="item in roleOptions" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="text-right">
                <el-button type="primary" class="wide-button" size="mini" @click="getListData(1)">查询</el-button>
                <el-button size="mini" plain class="wide-button" @click="resetForm('searchForm')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="tableData" border="" style="width: 100%;" size="mini">
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column prop="userName" label="姓名"></el-table-column>
          <el-table-column prop="mobileNo" label="手机号"></el-table-column>
          <el-table-column prop="email" label="邮箱" min-width="120px"></el-table-column>
          <el-table-column prop="roleName" label="角色"></el-table-column>
          <el-table-column prop="department" label="部门">
            <template slot-scope="scope">
              <p>{{ scope.row.department ? scope.row.department : '--' }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span>{{ scope.row.status | formt }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updatedTime" label="更新时间" min-width="100px"></el-table-column>
          <el-table-column prop="status" label="操作" min-width="100px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="editUser(scope.row)">修改</el-button>
              <span style="color:#D0E1FF">|</span>
              <!-- 状态0启用 1禁用 2锁定 -->
              <el-button v-if="+scope.row.status === 0" type="text" size="mini" @click="stopUser(scope.row)">
                禁用
              </el-button>
              <el-button v-if="+scope.row.status === 1" type="text" size="mini" @click="startUser(scope.row)">
                启用
              </el-button>
              <!-- <span style="color:#D0E1FF">|</span>
          <el-button type="text" size="mini" @click="lockUser(scope.row)">锁定</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="searchForm.pageNum"
          :page-size="searchForm.size"
          :page-sizes="[10, 20, 50]"
          layout="total,prev, pager, next, sizes, jumper"
          :total="total"
          background=""
          :mini="true"
          class="m-t-20"
        ></el-pagination>
      </template>
    </v-form>
    <!-- 新增/编辑弹窗 -->
    <el-dialog :title="dialogTitle" :visible="dialogVisible" :show-close="false" @closed="resetSubmitForm" width="40%">
      <el-form :model="submitForm" :rules="rules" ref="submitForm" size="mini">
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
              <el-input v-model="submitForm.mobileNo" placeholder="请输入手机号" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="22" :offset="1">
            <el-form-item label="邮箱" prop="email" label-width="120px">
              <el-input v-model="submitForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="22" :offset="1">
            <el-form-item label="部门" prop="department" label-width="120px">
              <el-input v-model="submitForm.department" placeholder="请输入部门"></el-input>
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
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submit" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import { validateMobile } from '@/utils/validate'
import { getRoleOptions, getUserList, addUser, updateUser, stopUser, startUser } from '@/api/user'
export default {
  components: { VForm },
  filters: {
    formt: status => {
      let txt = ''
      if (+status === 0) {
        txt = '启用'
      } else if (+status === 1) {
        txt = '禁用'
      } else if (+status === 2) {
        txt = '锁定'
      }
      return txt
    }
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
      roleOptions: [], // 角色下拉框选项
      searchForm: {
        status,
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
        email: '',
        department: '',
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
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
        roleIds: [{ required: true, trigger: 'blur', message: '请选择角色' }]
      }
    }
  },
  created() {
    getRoleOptions().then(res => {
      if (res.status === 200) {
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
        if (res.status === 200) {
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
        email: row.email,
        department: row.department,
        roleIds: Number(row.roleId) || row.roleId
      }
    },
    // 点击弹窗表单确认按钮触发
    submit() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增用户') {
            addUser(this.submitForm).then(res => {
              if (res.status === 200) {
                this.$message.success('新增成功')
                this.getListData(1)
              } else {
                this.$message.error(res.message || '新增失败，请稍后重试')
              }
            })
          } else {
            updateUser(this.submitForm).then(res => {
              if (res.status === 200) {
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
        email: '',
        status: '',
        roleIds: ''
      }
      this.$refs.submitForm.resetFields()
    },
    // 停用用户
    stopUser(rowContent) {
      this.$msgbox({
        title: '用户编辑',
        message: '请确认是否禁用该用户？',
        showCancelButton: true,
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        closeOnClickModal: false,
        type: 'warning',
        center: true,
        customClass: 'msgbox'
      }).then(action => {
        if (action === 'confirm') {
          stopUser(rowContent.id).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getListData(1)
            } else {
              this.$message.error(res.message || '操作失败')
            }
          })
        }
      })
    },
    // 启用用户
    startUser(rowContent) {
      this.$msgbox({
        title: '用户编辑',
        message: '请确认是否启用该用户？',
        showCancelButton: true,
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        closeOnClickModal: false,
        type: 'warning',
        center: true,
        customClass: 'msgbox'
      }).then(action => {
        if (action === 'confirm') {
          startUser(rowContent.id).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getListData(1)
            } else {
              this.$message.error(res.message || '操作失败')
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-radio {
  padding: 5px 0;
}
</style>
