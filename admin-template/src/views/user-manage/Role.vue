<template>
    <div class="app-container">
        <span class="all-main-tit all-tit-bar"></span>
        <span class="all-main-tit all-tit-con">权限配置</span>
        <div>
            <el-button class="m-t-20" size="mini" plain type="primary" icon="el-icon-circle-plus-outline" @click="addRole()">
                新增角色
            </el-button>
        </div>
        <div class="m-t-30">
            <TableList
                border
                :options="options"
                :columns="columns"
                :dataSource="dataSource"
                :operates="operates"
                :pagination="pagination"
                :dataTotal="dataTotal"
                @toggleRowSelection="toggleRowSelection"
                @handleSelectionChange="handleSelectionChange"
                @handleChangePage="handleChangePage"
                @handleChangePageSize="handleChangePageSize"
            />
        </div>
        <!-- 增加编辑dialog  -->
        <el-dialog class="el-dialog-tree" :title="dialogTitle" :visible="dialogVisible" :show-close="false" @closed="resetSubmitForm">
            <el-form :model="submitForm" :rules="rules" ref="submitForm" size="mini">
                <el-form-item label="角色名称" prop="roleName" label-width="80px">
                    <el-input v-model="submitForm.roleName" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="菜单权限" prop="resourcesIds" label-width="80px">
                    <el-tree
                        ref="roleTree"
                        :data="menuTree"
                        node-key="id"
                        show-checkbox
                        :expand-on-click-node="false"
                        :default-checked-keys="checkedKeys"
                        :default-expand-all="true"
                        :props="defaultProps"
                        @check="handleChecked"
                        :render-content="renderContent"
                        :check-on-click-node="false"
                    ></el-tree>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import { getMenuTree, getUserList, getRoleInfoById } from '@/api/user'
import TableList from '@/components/Tables/TableList'
const columns = [
    {
        prop: 'roleName',
        label: '角色名称',
        align: 'center'
    },
    {
        prop: 'createTime',
        label: '添加时间',
        align: 'center'
    }
]
export default {
    components: {
        TableList
    },
    data() {
        return {
            columns,
            menuTree: [],
            childNumObj: {},
            searchForm: {
                current: 1,
                size: 10
            },
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
                        this.editRole(row, index)
                    }
                },
                {
                    label: '删除',
                    isShow: (row, index) => true,
                    method: (row, index) => {
                        this.handleDelete(row, index)
                    }
                }
            ],
            // 序号、单选、多选...
            options: {
                index: true,
                isShow: (row, index) => true
            },
            dataSource: [],
            dataTotal: 0,
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
        this.getMenuTree()
    },
    mounted() {
        this.getListData(1)
    },
    methods: {
        getMenuTree() {
            getMenuTree().then(res => {
                if (res.code === 200) {
                    this.menuTree = res.data
                    this.childNumObj = this.getEachNodeChildNum(this.menuTree)
                } else {
                    this.$message.error(res.message || '获取菜单权限树失败，请稍后重试')
                }
            })
        },
        // 自定义树
        renderContent(h, { node, data, store }) {
            // 渲染按钮权限
            if (data && data.role) {
                // 装在原始选中数据
                this.radioRoleList[data.id] = data.isRole ? data.isRole : ''
                return (
                    <div class='custom-tree-node' style='flex: 1; display: flex; justify-content: space-between'>
                        <span class='label-span'>{node.label}</span>
                        <div>
                            <el-radio-group v-model={data.isRole} on-change={() => this.changePermission(data.isRole, data)}>
                                {data.role.map(item => {
                                    return <el-radio label={item.id}>{item.title}</el-radio>
                                })}
                            </el-radio-group>
                            <el-link class='m-l-40' type='primary' underline={false} on-click={() => (data.isRole = '')}>
                                重置
                            </el-link>
                        </div>
                    </div>
                )
            }
            return (
                <span class='custom-tree-node'>
                    <span>{node.label}</span>
                </span>
            )
        },
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
            getUserList(this.searchForm).then(res => {
                if (res.code === 200) {
                    this.dataSource = res.data.records
                    this.dataTotal = res.data.total
                } else {
                    this.$message.error(res.message || '查询失败，请稍后重试')
                    this.dataSource = []
                    this.dataTotal = 0
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
            this.getListData(val)
        },
        handleChangePageSize(val) {
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

        // 删除
        handleDelete() {},
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
                        // addRole(this.submitForm).then(res => {
                        //   if (res.code === 200) {
                        //     this.$message.success('新增成功')
                        //     this.getListData(1)
                        //   } else {
                        //     this.$message.error(res.message || '新增失败，请稍后重试')
                        //   }
                        // })
                    } else {
                        // updateRole(this.submitForm).then(res => {
                        //   if (res.code === 200) {
                        //     this.$message.success('修改成功')
                        //     this.getListData(1)
                        //   } else {
                        //     this.$message.error(res.message || '修改失败，请稍后重试')
                        //   }
                        // })
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
        delRole() {
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
                    // deleteRole(rowContent.id).then(res => {
                    //   if (res.code === 200) {
                    //     this.$message.success('删除成功')
                    //     this.getListData(1)
                    //   } else {
                    //     this.$message.error(res.message || '删除失败')
                    //   }
                    // })
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped></style>
