<!-- 人员设置  author：yangdawei-->
<template>
  <div class="app-container">
    <span class="all-main-tit all-tit-bar"></span>
    <span class="all-main-tit all-tit-con">权限配置</span>
    <div>
      <el-button
        class="m-t-20"
        size="small"
        plain
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="addRole()"
      >新增角色</el-button>
    </div>
    <el-table :data="tableData" border="" style="width: 100%;" size="medium" class="m-t-30">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="createTime" label="添加时间" min-width="100"></el-table-column>
      <el-table-column prop="status" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editRole(scope.row)">编辑</el-button>
          <span style="color:#D0E1FF">|</span>
          <el-button type="text" size="small" @click="delRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加编辑dialog  -->
    <el-dialog
      class="el-dialog-tree"
      :title="dialogTitle"
      :visible="dialogVisible"
      :show-close="false"
      @closed="resetSubmitForm"
    >
      <el-form :model="submitForm" :rules="rules" ref="submitForm">
        <el-row>
          <el-col :span="16" :offset="4">
            <el-form-item label="角色名称" prop="roleName" label-width="80px">
              <el-input v-model="submitForm.roleName" maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="菜单权限" prop="resourcesIds" label-width="80px">
              <el-tree
                ref="roleTree"
                :data="menuTree"
                node-key="id"
                show-checkbox
                expand-on-click-node
                :default-checked-keys="checkedKeys"
                :default-expand-all="false"
                :props="defaultProps"
                @check="handleChecked"
              ></el-tree>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取 消</el-button>
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
import { getRoleList, getMenuTree, getRoleInfoById, addRole, updateRole, deleteRole } from '@/api/user'
export default {
  data() {
    return {
      menuTree: [],
      childNumObj: {},
      searchForm: {
        current: 1,
        size: 10
      },
      tableData: [],
      total: 0,
      submitForm: {
        roleId: 0, // 角色ID
        resourcesIds: '', // 资源id
        roleName: '' // 角色名称
      },
      defaultCheckedKeys: [], // tree默认选中节点
      defalutHalfCheckedKeys: [], // tree默认选中节点中，子节点未全选的父节点
      checkedKeys: [], // 已选择的节点key集合
      halfCheckedKeys: [], // 未全选中的父节点key集合，接口传参时使用
      dialogVisible: false,
      dialogTitle: '',
      rules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        resourcesIds: [{ required: true, message: '请选择菜单权限', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    getMenuTree().then(res => {
      if (res.code === 200) {
        this.menuTree = res.data
        this.childNumObj = this.getEachNodeChildNum(this.menuTree)
      } else {
        this.$message.error(res.message || '获取菜单权限树失败，请稍后重试')
      }
    })
    this.getListData(1)
  },
  methods: {
    getEachNodeChildNum(list, childNumObj = {}) {
      list.forEach(({ id, children }) => {
        if (children) {
          childNumObj[id] = children.length
          this.getEachNodeChildNum(children, childNumObj)
        }
      })
      return childNumObj
    },
    // 获取角色分页列表
    getListData(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      getRoleList(this.searchForm).then(res => {
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
    // 点击新增角色按钮触发
    addRole() {
      this.dialogVisible = true
      this.dialogTitle = '新增角色'
    },
    // 点击编辑按钮触发
    editRole(row) {
      this.dialogVisible = true
      this.dialogTitle = '编辑角色'
      getRoleInfoById(row.id).then(res => {
        if (res.code === 200) {
          this.submitForm.roleId = res.data.roleId // 角色ID
          this.submitForm.roleName = row.roleName // 角色名称
          if (res.data.resourcesListTreeList && res.data.resourcesListTreeList.length > 0) {
            // this.checkedKeys = res.data.resourcesListTreeList.map(item => item.roleId)
            this.defaultCheckedKeys = this.getOriginRoleId(res.data.resourcesListTreeList)
            this.$refs.roleTree.setCheckedKeys(this.defaultCheckedKeys)
          }
        } else {
          this.$message.error(res.message || '获取角色信息，请稍后重试')
        }
      })
    },
    // 获取接口返回的角色权限结构中的id，供tree组件默认勾选赋值使用
    // 子节点未全部勾选的父节点id不存入 checkedKeys
    getOriginRoleId(list, keysArr = []) {
      list.forEach(({ roleId, children }) => {
        if (children) {
          // children的length代表拥有子节点的个数，对比基本资源改节点原有的子节点个数是否相等。
          // 子节点未全部勾选的父节点id不存入
          if (this.childNumObj[roleId] === children.length) {
            keysArr.push(roleId)
          } else {
            this.defalutHalfCheckedKeys.push(roleId)
          }
          this.getOriginRoleId(children, keysArr)
        } else {
          keysArr.push(roleId)
        }
      })
      return keysArr
    },
    // 树形结构复选框点击时触发
    // current为点击节点对应的对象
    // checked为树结构目前选中的对象：包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
    handleChecked(current, checked) {
      this.checkedKeys = checked.checkedKeys
      // 记录未全选的父节点，接口传参时也一起传过去
      if (checked.halfCheckedKeys && checked.halfCheckedKeys.length > 0) {
        checked.halfCheckedKeys.forEach(item => {
          if (!this.halfCheckedKeys.includes(item)) {
            this.halfCheckedKeys.push(item)
          }
        })
      }
    },
    // 点击弹窗表单确认按钮触发
    submit() {
      // checkedKeys中有值时代表用户操作了tree，否则代表未操作直接点击了确认按钮
      if (this.checkedKeys.length > 0) {
        this.submitForm.resourcesIds = this.checkedKeys.concat(this.halfCheckedKeys).toString()
      } else {
        this.submitForm.resourcesIds = this.defaultCheckedKeys.concat(this.defalutHalfCheckedKeys).toString()
      }
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增角色') {
            addRole(this.submitForm).then(res => {
              if (res.code === 200) {
                this.$message.success('新增成功')
                this.getListData(1)
              } else {
                this.$message.error(res.message || '新增失败，请稍后重试')
              }
            })
          } else {
            updateRole(this.submitForm).then(res => {
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
        roleId: 0, // 角色ID
        resourcesIds: [], // 资源id
        roleName: '' // 角色名称
      }
      this.defaultCheckedKeys = [] // tree默认选中节点
      this.defalutHalfCheckedKeys = [] // tree默认选中节点中，子节点未全选的父节点
      this.checkedKeys = []
      this.halfCheckedKeys = []
      this.$refs.roleTree.setCheckedKeys([])
      this.$refs.submitForm.resetFields()
    },
    // 删除角色
    delRole(rowContent) {
      this.$msgbox({
        title: '角色删除',
        message: '请确认是否删除该角色？',
        showCancelButton: true,
        confirmButtonText: '确 定',
        cancelButtonText: '取 消',
        closeOnClickModal: false,
        type: 'warning',
        center: true,
        customClass: 'msgbox'
      }).then(action => {
        if (action === 'confirm') {
          deleteRole(rowContent.id).then(res => {
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
<style lang="scss" scoped>
</style>
