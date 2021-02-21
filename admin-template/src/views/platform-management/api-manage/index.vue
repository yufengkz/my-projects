<template>
    <div class="container">
        <v-form title="" :subTitle="null">
            <template slot="header-btns">
                <el-button size="mini" type="primary" icon="el-icon-plus" @click="create">新增接口</el-button>
            </template>
            <template slot="content">
                <!-- 搜索 -->
                <Search :tableSearch="tableSearch" @handleSearch="handleSearch" ref="search" />
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
    </div>
</template>

<script>
import VForm from '@/components/VForm'
import Search from '@/components/Tables/Search'
import TableList from '@/components/Tables/TableList'

export default {
    components: {
        VForm,
        Search,
        TableList
    },
    data() {
        return {
            // 搜索框数据
            tableSearch: [
                {
                    label: '接口名称',
                    type: 'text',
                    value: 'name'
                },
                {
                    label: '服务业务',
                    value: 'serviceType',
                    type: 'select',
                    children: []
                },
                {
                    label: '是否开业',
                    value: 'businessFlag',
                    type: 'select',
                    children: [
                        {
                            label: '已开业',
                            value: 'Y'
                        },
                        {
                            label: '未开业',
                            value: 'N'
                        }
                    ]
                },
                {
                    type: 'region',
                    label: '中心地址',
                    options: [],
                    value: 'cascader'
                },
                {
                    label: '启用状态',
                    value: 'status',
                    type: 'select',
                    children: [
                        {
                            label: '启用',
                            value: 1
                        },
                        {
                            label: '禁用',
                            value: 0
                        }
                    ]
                }
            ],
            // 列表表头
            columns: [
                {
                    prop: 'code',
                    label: '接口编号',
                    align: 'center'
                },
                {
                    prop: 'name',
                    label: '接口名称',
                    align: 'center'
                },
                {
                    prop: 'province$FICDictName',
                    label: '接口地址',
                    align: 'center'
                },
                {
                    prop: 'city$FICDictName',
                    label: '市',
                    align: 'center'
                },
                {
                    prop: 'county$FICDictName',
                    label: '县',
                    align: 'center'
                },
                {
                    prop: 'serviceType',
                    label: '服务类型',
                    align: 'center'
                    //   render: (h, params) => {
                    //     let text = ''
                    //     this.$store.state.MAP.service.map(item => {
                    //       if (item.value === params.row.serviceType) {
                    //         text = item.label
                    //       }
                    //     })
                    //     return h('span', text)
                    //   }
                },
                {
                    prop: 'status',
                    label: '启用状态',
                    align: 'center',
                    render: (h, params) => {
                        const status = Number(params.row.status)
                        let text
                        if (status === 1) {
                            text = '启用'
                        } else if (status === 0) {
                            text = '禁用'
                        } else {
                            text = '-'
                        }
                        return h('span', text)
                    }
                }
            ],
            // 扩展性操作按钮
            operates: [
                {
                    label: '查看',
                    method: (row, index) => {
                        // type = 0 创建 1 查看 2 编辑
                        this.$router.push(`/platform-management/api-edit?id=${row.id}&type=1`)
                    }
                }
                // {
                //   label: '编辑',
                //   method: (row, index) => {
                //     // type = 0 创建 1 查看 2 编辑
                //     this.$router.push(`/map/edit?id=${row.id}&type=2`)
                //   }
                // },
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
            ]
        }
    },
    mounted() {
        this.getSourceData(this.seaerchData)
    },
    methods: {
        // 获取列表数据
        async getSourceData(params) {
            //   const { data } = await getMapList(params)
            this.dataTotal = 10
            this.dataSource = [
                {
                    id: '1',
                    code: '1',
                    name: '1',
                    province: '1',
                    city: '1',
                    county: '1',
                    serviceType: '1',
                    businessFlag: '1',
                    status: '1' // 0关 1开
                }
            ]
        },
        // 新增
        create() {
            // type = 0 创建 1 查看 2 编辑
            this.$router.push({ path: '/platform-management/api-edit', query: { type: 0 } })
        },
        // 搜索
        handleSearch(params) {
            console.log('搜索:', params)
            this.seaerchData = {
                ...this.seaerchData,
                current: 1,
                code: params.code,
                name: params.name,
                province: params.cascader && params.cascader[0],
                city: params.cascader && params.cascader[1],
                county: params.cascader && params.cascader[2],
                serviceType: params.serviceType,
                businessFlag: params.businessFlag,
                status: params.status // 0关 1开
            }
            this.pagination = {
                ...this.pagination,
                currentPage: 1
            }
            this.getSourceData(this.seaerchData)
        },
        // 启用 禁用 (调用不同的接口)
        async handleTableClick(params) {
            this.$confirm('确定修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const { status } = params
                if (Number(status) === 0) {
                    //   mapInfoEnable({ id }).then(res => {
                    //     if (res.status === 200) {
                    //       this.$message.success('操作成功')
                    //       this.getSourceData(this.seaerchData)
                    //     } else {
                    //       this.$message.error('操作失败' + res.message)
                    //     }
                    //   })
                } else if (Number(status) === 1) {
                    // console.log('%c 🥓 status: ', 'font-size:12px;background-color: #F5CE50;color:#fff;', status)
                    //   mapInfoDisable({ id }).then(res => {
                    //     if (res.status === 200) {
                    //       this.$message.success('操作成功')
                    //       this.getSourceData(this.seaerchData)
                    //     } else {
                    //       this.$message.error('操作失败' + res.message)
                    //     }
                    //   })
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
                pageSize
            }
            this.seaerchData = {
                ...this.seaerchData,
                size: pageSize
            }
            this.getSourceData(this.seaerchData)
        },
        handleReset(val) {
            delete this.seaerchData.code
            delete this.seaerchData.name
            delete this.seaerchData.province
            delete this.seaerchData.city
            delete this.seaerchData.county
            delete this.seaerchData.serviceType
            delete this.seaerchData.businessFlag
            delete this.seaerchData.status
            this.getSourceData(this.seaerchData)
        }
    }
}
</script>

<style lang="scss" scoped></style>
