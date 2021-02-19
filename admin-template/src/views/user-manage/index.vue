<template>
    <div class="container">
        <v-form title="角色配置" :subTitle="null">
            <template slot="header">
                <el-button size="mini" type="primary" icon="el-icon-plus" @click="create">添加角色</el-button>
            </template>
            <template slot="content">
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
        <!-- 增加编辑dialog  -->
        <el-dialog
            class="el-dialog-tree"
            width="65%"
            :title="dialogTitle"
            :visible="dialog"
            v-if="dialog"
            :show-close="false"
            @closed="resetSubmitForm"
        >
            <el-form :model="submitForm" :rules="rules" ref="submitForm" size="mini">
                <el-row>
                    <el-col :span="20" :offset="1">
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
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetSubmitForm" size="mini">取 消</el-button>
                <el-button type="primary" @click="submit" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import VForm from '@/components/VForm'
import TableList from '@/components/Tables/TableList'

import { getRoleList, getMenuTree, updateRole, deleteRole, addRole, getRoleInfoById } from '@/api/user'

export default {
    components: {
        VForm,
        TableList
    },
    data() {
        return {
            // 列表表头
            columns: [
                {
                    prop: 'roleName',
                    label: '角色名称',
                    align: 'center'
                },
                {
                    prop: 'createTime',
                    label: '添加时间',
                    align: 'center'
                },
                {
                    prop: 'status',
                    label: '操作状态',
                    align: 'center',
                    render: (h, params) => {
                        // 0启用 1禁用 2锁定
                        const status = Number(params.row.status)
                        let text
                        if (status === 0) {
                            text = '启用'
                        } else if (status === 1) {
                            text = '禁用'
                        } else if (status === 2) {
                            text = '锁定'
                        }
                        return h('span', text)
                    }
                }
            ],
            // 扩展性操作按钮
            operates: [
                {
                    label: '编辑',
                    method: (row, index) => {
                        this.editRole(row)
                    }
                },
                {
                    label: '删除',
                    method: (row, index) => {
                        this.delRole(row)
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
                size: 10,
                current: 1,
                pages: 0
            },
            dataSource: [],
            //
            menuTree: [],
            copyMenuTree: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            childNumObj: {},
            dialog: false,
            dialogTitle: '新增角色',
            submitForm: {
                roleId: '', // 角色ID
                resourcesIds: '', // 资源id
                roleName: '' // 角色名称
            },
            defaultCheckedKeys: [], // tree默认选中节点
            defalutHalfCheckedKeys: [], // tree默认选中节点中，子节点未全选的父节点
            checkedKeys: [], // 已选择的节点key集合
            halfCheckedKeys: [], // 未全选中的父节点key集合，接口传参时使用
            rules: {
                roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
                resourcesIds: [{ required: true, message: '请选择菜单权限', trigger: 'blur' }]
            },
            radioRoleList: []
        }
    },
    created() {
        this.getMenuTree()
    },
    mounted() {
        this.getSourceData(this.seaerchData)
    },
    watch: {},
    methods: {
        // 获取原始菜单树
        getMenuTree() {
            getMenuTree().then(res => {
                if (res.status === 200) {
                    this.menuTree = res.data
                    this.copyMenuTree = JSON.parse(JSON.stringify(res.data))
                    this.childNumObj = this.getEachNodeChildNum(this.menuTree)
                } else {
                    this.$message.error(res.message || '获取菜单权限树失败，请稍后重试')
                }
            })
        },
        // 自定义树
        renderContent(h, { node, data, store }) {
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
        // 单选框选中
        changePermission(id, data) {
            const arr = {}
            arr[data.id] = id
            // 去重 👇
            this.radioRoleList = {
                ...this.radioRoleList,
                ...arr
            }
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
        // 获取列表数据
        async getSourceData(params) {
            const res = await getRoleList(params)

            this.dataTotal = res.data.total || 0
            this.dataSource = res.data.records
        },
        // 点击新增角色按钮触发
        create() {
            this.dialogTitle = '新增角色'
            this.dialog = true
            this.menuTree = this.copyMenuTree
        },
        // 点击编辑按钮触发
        editRole(row) {
            this.dialog = true
            this.dialogTitle = '编辑角色'
            getRoleInfoById(row.id).then(res => {
                if (res.status === 200) {
                    this.submitForm.roleId = row.id // 角色ID
                    this.submitForm.roleName = row.roleName // 角色名称
                    if (res.data && res.data.length > 0) {
                        this.defaultCheckedKeys = this.getOriginRoleId(res.data)
                        this.$refs.roleTree.setCheckedKeys(this.defaultCheckedKeys)
                        // 审批等级回显数据
                        this.resetMenuTree(res.data)
                        this.checkedKeys = this.$refs.roleTree.getCheckedKeys()
                        this.halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()

                        this.defaultCheckedKeys = this.$refs.roleTree.getCheckedKeys()

                        this.defalutHalfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
                    }
                } else {
                    this.$message.error(res.message || '获取角色信息，请稍后重试')
                }
            })
        },
        // 获取接口返回的角色权限结构中的id，供tree组件默认勾选赋值使用
        // 子节点未全部勾选的父节点id不存入 checkedKeys
        getOriginRoleId(list, keysArr = []) {
            list.forEach(({ id, checked, children }) => {
                if (children) {
                    this.getOriginRoleId(children, keysArr)
                } else if (checked) {
                    keysArr.push(id)
                }
            })
            return keysArr
        },
        // 重新设置树形菜单
        resetMenuTree(checkedMenu) {
            this.menuTree = checkedMenu || []
        },
        // 点击时重新赋值 其实没用 submit的时候重新获取了
        handleChecked(current, checked) {
            this.checkedKeys = this.$refs.roleTree.getCheckedKeys()
            this.halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
            this.defaultCheckedKeys = this.$refs.roleTree.getCheckedKeys()
            this.defalutHalfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
        },
        // 点击弹窗表单确认按钮触发
        submit() {
            // const loading = this.$loading({})
            this.checkedKeys = this.$refs.roleTree.getCheckedKeys()
            this.halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
            this.defaultCheckedKeys = this.$refs.roleTree.getCheckedKeys()
            this.defalutHalfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
            const allCheckKeys = this.checkedKeys.concat(this.halfCheckedKeys)
            const hasKey = [] // 当前所有选中或半选中含有的id/key
            const radioKey = [] // 当前选中的审批权限项
            const roles = [] // 添加角色权限 一级审批、二级审批...
            Object.keys(this.radioRoleList).map(key => {
                if (this.radioRoleList[key]) {
                    radioKey.push(+key) // 当前选中单选框对应的父级id/key
                    roles.push(this.radioRoleList[key]) // 要保存的审批单选框的key
                    allCheckKeys.includes(+key) && hasKey.push(+key)
                }
            })
            // 如果没有选择菜单但选择了审批权限则阻止执行
            if (hasKey.sort().toString() !== radioKey.sort().toString()) {
                this.$message.warning('请选择菜单项')
                return
            }
            // checkedKeys中有值时代表用户操作了tree，否则代表未操作直接点击了确认按钮
            // 之前的逻辑 ?
            if (this.checkedKeys.length > 0) {
                this.submitForm.resourcesIds = this.checkedKeys
                    .concat(this.halfCheckedKeys)
                    .concat(roles)
                    .toString()
            } else {
                this.submitForm.resourcesIds = this.defaultCheckedKeys
                    .concat(this.defalutHalfCheckedKeys)
                    .concat(roles)
                    .toString()
            }

            this.$refs.submitForm.validate(valid => {
                if (valid) {
                    if (this.dialogTitle === '新增角色') {
                        addRole(this.submitForm).then(res => {
                            if (res.status === 200) {
                                this.$message.success('新增成功')
                                this.seaerchData = {
                                    ...this.seaerchData,
                                    current: 1
                                }
                                this.pagination = {
                                    currentPage: 1,
                                    pageSize: 10
                                }
                                this.getSourceData(this.seaerchData)
                                this.resetSubmitForm()
                            } else {
                                this.$message.error(res.message || '新增失败，请稍后重试')
                            }
                        })
                    } else {
                        updateRole(this.submitForm).then(res => {
                            if (res.status === 200) {
                                this.$message.success('修改成功')
                                this.seaerchData = {
                                    ...this.seaerchData,
                                    current: 1
                                }
                                this.pagination = {
                                    currentPage: 1,
                                    pageSize: 10
                                }
                                this.getSourceData(this.seaerchData)
                                this.resetSubmitForm()
                            } else {
                                this.$message.error(res.message || '修改失败，请稍后重试')
                            }
                        })
                    }
                } else {
                    this.$message.error('必要信息没有填写或选择')
                }
            })
        },
        // 重置提交表单
        resetSubmitForm() {
            this.submitForm = {
                roleId: '', // 角色ID
                resourcesIds: [], // 资源id
                roleName: '' // 角色名称
            }
            this.defaultCheckedKeys = [] // tree默认选中节点
            this.defalutHalfCheckedKeys = [] // tree默认选中节点中，子节点未全选的父节点
            this.checkedKeys = []
            this.halfCheckedKeys = []
            this.$refs.roleTree.setCheckedKeys([])
            this.$refs.submitForm.resetFields()
            this.getMenuTree()
            this.dialog = false
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
                        if (res.status === 200) {
                            this.$message.success('删除成功')
                            this.getSourceData(this.seaerchData)
                        } else {
                            this.$message.error(res.message || '删除失败')
                        }
                    })
                }
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
                pageSize: pageSize
            }
            this.seaerchData = {
                ...this.seaerchData,
                size: pageSize
            }
            this.getSourceData(this.seaerchData)
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
/deep/ .el-tree-node__expand-icon {
    font-size: 18px;
}
</style>
