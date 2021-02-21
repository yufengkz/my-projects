<template>
  <div class="container">
    <!-- app-container -->
    <div class="fixd-btn">
      <el-button v-show="type" size="mini" type="primary" icon="el-icon-edit" @click="handleEdit">
        编辑
      </el-button>
      <el-button plain size="mini" @click="goBack">返回</el-button>
    </div>
    <el-form
      :disabled="type"
      :model="mapInfoForm"
      :rules="mapInfoRules"
      ref="mapInfoForm"
      size="mini"
      label-position="right"
      label-width="130px"
    >
      <!-- 中心信息 -->
      <v-form title="中心信息">
        <!-- <template slot="header-btns">
          <el-button plain size="mini" @click="goBack" v-show="!type">返回</el-button>
        </template> -->
        <template slot="content">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="businessFlag" label="开业状态">
                <el-select v-model="mapInfoForm.businessFlag" placeholder="请选择">
                  <el-option label="已开业" value="Y"></el-option>
                  <el-option label="未开业" value="N"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="name" label="中心名称">
                <el-input v-model="mapInfoForm.name" maxlength="20" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="code" label="中心编号">
                <el-input v-model="mapInfoForm.code" _maxlength="6" placeholder="请输入6位数字"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="serviceType" label="服务业务">
                <el-select v-model="mapInfoForm.serviceType" placeholder="请选择">
                  <el-option v-for="item in service" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
              <el-row>
                <el-col :span="14">
                  <el-form-item prop="region" label="中心地址:">
                    <el-cascader
                      :disabled="type"
                      clearable
                      ref="region"
                      v-model="mapInfoForm.region"
                      :options="options"
                      :props="regionProps"
                      @change="$forceUpdate()"
                    ></el-cascader>
                    <!-- forceUpdate强制render 绑定值和新值相等不改变强制更改 -->
                  </el-form-item>
                </el-col>
                <el-col :span="9" :offset="1">
                  <el-form-item prop="address" label-width="0">
                    <el-input v-model="mapInfoForm.address" maxlength="50" size="mini" placeholder="详细地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="totalLimit" label="中心额度">
                <el-input v-model="mapInfoForm.totalLimit" placeholder="请输入">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="status" label="是否启用">
                <el-select v-model="mapInfoForm.status" placeholder="请选择" disabled>
                  <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value + ''"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="btns-center-box">
            <!-- <el-button>返回</el-button> -->
            <el-button v-show="!type" type="primary" @click="submitMapInfoForm('mapInfoForm')" size="mini">
              保存
            </el-button>
          </div>
        </template>
      </v-form>
    </el-form>
    <!-- 借款产品信息 -->
    <v-form title="借款产品信息" style="margin-top: 20px;">
      <template slot="content">
        <!-- <loan-info v-if="mapProductInfo.length" :id="id" :mapProductInfo="mapProductInfo"></loan-info> -->
        <TableEdit ref="tableLoan" :columns="loan" :data="productData" row-key="uuid" />
        <div class="btns-center-box">
          <el-button v-show="!type" class="btns-center-add" size="mini" icon="el-icon-plus" @click="dialogVisible = true">
            添加
          </el-button>
        </div>
      </template>
    </v-form>
    <!-- 人员信息 -->
    <v-form title="人员信息" style="margin-top: 20px;">
      <template slot="content">
        <TableEdit ref="tableUsers" :columns="users" :data="userForm" row-key="keyId" :disabled="type">
          <template #button="scope">
            <template v-if="scope.id === 'add'"></template>
          </template>
        </TableEdit>
        <div class="btns-center-box">
          <el-button v-show="!type" class="btns-center-add" size="mini" icon="el-icon-plus" @click="$_handleAdd">
            添加
          </el-button>
        </div>
        <!-- <div class="btns-center-box">
          <el-button type="primary" @click="submitUsers('1111')" size="mini">保存</el-button>
        </div> -->
      </template>
    </v-form>
    <!-- 借款信息弹框 -->
    <el-dialog title="添加借款产品信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" size="mini" style="width:100%;">
        <el-form-item label="借款产品" prop="selectProduct">
          <el-select v-model="form.selectProduct" placeholder="请选择借款产品" style="width:80%;">
            <el-option v-for="item in $store.state.base.loanProducts" :key="item.id" :label="item.productName" :value="item"></el-option>
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
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import VForm from '@/components/VForm'
import TableEdit from '@/components/TableEdit'

import { getMapInfo, addOrUpdMapInfo, addOrUpdMapUserInfo, delMapUserInfo, editMapProducts, editMapLoanProductsStatus } from '@/api/map'
import { sortFnLargeToSmall } from '@/utils/tool'

const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ // 邮箱
const money = /^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/ // 钱 最小2位小数 最大10位
const mobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机号验证
const length = /^[^ ]{2,8}$/ // 字符长度最少为2 最多为8
// const num = /^\d{6}$/ // 6位数字

export default {
  components: {
    VForm,
    TableEdit
  },
  computed: {
    ...mapGetters(['regions'])
  },
  data() {
    return {
      type: '',
      id: '',
      // 联动选择器
      options: [],
      regionProps: {
        value: 'areaId',
        label: 'areaName',
        children: 'list'
      },
      // 服务业务
      service: this.$store.state.MAP.service,
      // 启用、禁用状态
      status: Object.assign({}, this.$store.state.MAP.status),
      // 中心信息数据
      mapInfoForm: {
        businessFlag: '', // 开业状态 1 开 0关
        name: '', // 中心名称
        code: '', // 中心编号
        serviceType: '', // 服务业务
        // 中心地址
        region: '',
        // province: '',
        // city: '',
        // county: '',
        address: '',
        totalLimit: '', // 中心额度
        status: '0' // 是否启用 默认禁用
      },
      mapInfoRules: {
        businessFlag: [{ required: true, message: '请选择开业状态', trigger: 'change' }],
        name: [{ required: true, message: '请输入中心名称', trigger: 'blur' }],
        code: [
          { required: true, message: '请输入中心编号', trigger: 'blur' }
          // { pattern: num, message: '请输入正确的中心编号', trigger: 'blur' }
        ],
        serviceType: [{ required: true, message: '请选择服务业务类型', trigger: 'change' }],
        region: [{ type: 'array', required: true, message: '请选择中心地址', trigger: 'change' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        totalLimit: [
          { required: true, message: '请输入中心额度', trigger: 'blur' },
          { pattern: money, message: '请输入正确的金额', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择是否启用', trigger: 'change' }]
        // cascaders: [{ type: 'array', required: true, message: '请选择中心地址', trigger: 'change' }],
        // loan: [{ type: 'array', required: true, validator: validateOblect, trigger: 'change' }]
      },
      // 表格编辑
      editIds: [],
      // 人员信息
      // 表格编辑
      users: Object.freeze([
        {
          label: '角色',
          prop: 'cname'
        },
        {
          label: '姓名',
          prop: 'name',
          editable: true,
          field: {
            componentType: 'input',
            rules: [
              {
                required: true,
                message: '请输入姓名'
              },
              {
                pattern: length,
                message: '请输入正确的姓名'
              }
            ]
          }
        },
        {
          label: '手机号',
          prop: 'mobile',
          editable: true,
          field: {
            componentType: 'input',
            rules: [
              {
                required: true,
                message: '请输入手机号'
              },
              {
                pattern: mobile,
                message: '请输入正确的手机号'
              }
            ]
          }
        },
        {
          label: '邮箱',
          prop: 'email',
          editable: true,
          field: {
            componentType: 'input',
            rules: [
              {
                required: true,
                message: '请输入邮箱'
              },
              {
                pattern: email,
                message: '请输入正确的邮箱'
              }
            ]
          }
        },
        {
          label: '操作',
          width: 200,
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.editIds.includes(row.keyId) && !this.type,
              click: this.$_handleEdit
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.editIds.includes(row.keyId),
              click: this.$_handleSave
            },
            {
              id: 'save',
              text: '取消',
              before: row => this.editIds.includes(row.keyId),
              click: this.$_handleCancel
            },
            {
              id: 'edit',
              text: '删除',
              before: row => {
                // 002不可以删除
                // if ((row.role === '002' && !this.type) || (row.role === '003' && !this.type)) {
                // 002可以删除
                if (row.role === '003' && !this.type) {
                  return false
                }
                return !this.type
              },
              click: this.$_handleDel
            }
          ]
        }
      ]),
      userForm: [
        {
          // 必须指定rowKey字段，默认是id,如果修改为其他字段，需要给表格指定row-key="字段名"
          role: '003',
          keyId: 1,
          cname: '金融经理',
          name: '',
          mobile: '',
          email: ''
        },
        {
          role: '002',
          keyId: 2,
          cname: '金融专员',
          name: '',
          mobile: '',
          email: ''
        }
      ],
      // 借款产品数据
      mapProductInfo: [],
      dialogVisible: false,
      form: {
        selectProduct: ''
      },
      loan: Object.freeze([
        {
          label: '产品名称',
          prop: 'productName'
        },
        {
          label: '产品编号',
          prop: 'productCode'
        },
        {
          label: ' 设置限额（万元）',
          prop: 'personLimit',
          editable: true,
          formatter(row, column, status) {
            return row.personLimit.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
          },
          field: {
            componentType: 'number',
            rules: [
              {
                required: true,
                message: '请设置限额'
              },
              {
                pattern: money,
                message: '请输入正确的限额'
              }
            ]
            // min: 0,
            // precision: 0
          }
        },
        {
          label: '状态',
          prop: 'status',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, status) {
            let txt = ''
            if (+row.status === 1) {
              txt = '启用'
            } else if (+status === 0) {
              txt = '禁用'
            }
            return txt
          }
        },
        {
          label: '操作',
          width: '200',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.loanEditIds.includes(row.uuid) && !this.type,
              click: this.$_handleEditLoan
            },
            {
              id: 'status',
              text: '启用',
              before: row => +row.status === 0 && !this.loanEditIds.includes(row.uuid) && !this.type,
              click: this.$_handleEditLoanStatus
            },
            {
              id: 'status',
              text: '禁用',
              before: row => +row.status === 1 && !this.loanEditIds.includes(row.uuid) && !this.type,
              click: this.$_handleEditLoanStatus
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.loanEditIds.includes(row.uuid),
              click: this.$_handleSaveLoan
            },
            {
              id: 'del',
              text: '取消',
              before: row => this.loanEditIds.includes(row.uuid),
              click: this.$_handleCancelLoan
            }
            // {
            //   id: 'edit',
            //   text: '删除',
            //   click: this.$_handleDel
            // }
          ]
        }
      ]),
      productData: [],
      // 是否显示多选框
      selectable: false,
      // 是否显示序号列
      sequence: true,
      loanEditIds: []
    }
  },
  watch: {
    $route: {
      handler() {
        // 监听路由变化
        // type = 0 创建 1 查看 2 编辑  很多地方用了
        this.type = +this.$route.query.type === 1
        this.$refs.mapInfoForm.clearValidate()
        this.getSourceData()
        // 深度监听，同时也可监听到param参数变化
      },
      deep: true
    },
    regions: {
      handler(val) {
        this.options = this.regions
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    // type = 0 创建 1 查看 2 编辑  很多地方用了
    this.type = +this.$route.query.type === 1
    this.id = this.$route.query.id || ''
    if (this.id) this.getSourceData()
  },
  mounted() {},
  methods: {
    async getSourceData() {
      this.id = this.$route.query.id || ''
      const { data } = await getMapInfo({
        id: this.id
      })
      // 基本信息
      this.mapInfoForm = data.mapInfo || {}
      // province: '',
      // city: '',
      // county: '',
      this.mapInfoForm.region = [
        data.mapInfo.province && +data.mapInfo.province,
        data.mapInfo.city && +data.mapInfo.city,
        data.mapInfo.county && +data.mapInfo.county
      ]
      // 借款信息
      // this.mapProductInfo = data.mapProductInfo || []
      // 借款信息数据处理
      this.productData = data.mapProductInfo.map(item => {
        return {
          ...item,
          uuid: uuidv4(),
          label: item.productName,
          value: item.id + ''
        }
      })
      // 人员信息
      // 判断当前信息中是否含有001金融经理
      let flag003 = false
      data.mapUserInfo.find(item => (flag003 = item.role === '003'))
      if (!flag003) {
        // 不含002
        data.mapUserInfo.push({
          role: '003',
          keyId: 1,
          cname: '金融经理',
          name: '',
          mobile: '',
          email: ''
        })
      }
      // 判断当前信息中是否含有002金融专员
      // let flag002 = false
      // data.mapUserInfo.find(item => {
      //   return (flag002 = item.role === '002')
      // })
      // if (!flag002) {
      //   // 不含002
      //   data.mapUserInfo.push({
      //     role: '002',
      //     keyId: 2,
      //     cname: '金融专员',
      //     name: '',
      //     mobile: '',
      //     email: ''
      //   })
      // }
      // 排序 从大到小 003 002 001
      data.mapUserInfo.sort(sortFnLargeToSmall('role'))
      const obj = []
      data.mapUserInfo.map(item => {
        if (item.role === '001') {
          obj.push({
            ...item,
            keyId: uuidv4(),
            cname: '农艺师'
          })
        } else if (item.role === '002') {
          obj.push({
            ...item,
            keyId: 2,
            cname: '金融专员'
          })
        } else if (item.role === '003') {
          obj.push({
            ...item,
            keyId: 1,
            cname: '金融经理'
          })
        }
      })
      this.userForm = obj
    },
    // 提交中心信息
    submitMapInfoForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addOrUpdMapInfo({
            ...this.mapInfoForm,
            province: this.mapInfoForm.region[0],
            city: this.mapInfoForm.region[1],
            county: this.mapInfoForm.region[2]
          }).then(res => {
            if (res.status === 200) {
              // this.getSourceData()
              this.$message.success('操作成功')
              // 新增成功后刷新MAP中心借款产品列表
              this.$store.dispatch('GetMAPProducts')
              // 新增成功之后 当作编辑去新增
              if (+this.id !== +res.data.id) {
                // id不变的话不跳转
                this.$router.replace(`/map/edit?id=${res.data.id}&type=2`)
              }
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          this.$message.error('请输入必填信息')
          return false
        }
      })
    },
    // 监听联动事件
    listenProvice(val) {
      // 如果有值 清楚对他的校验
      if (val) {
        this.$refs.mapInfoForm.clearValidate('province')
      }
      this.mapInfoForm.province = val
    },
    listenCity(val) {
      this.mapInfoForm.city = val
    },
    listenArea(val) {
      this.mapInfoForm.county = val
    },
    // 人员信息方法   =========================分割线============================
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row) {
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.tableUsers.startEditRow(row.keyId)
      // 记录开启了行编辑的id
      this.editIds.push(row.keyId)
    },
    // 取消编辑
    $_handleCancel(row) {
      if (!row.id && row.role !== '003') {
        // 取消的是没有保存的数据 则直接删掉
        this.userForm = this.userForm.filter(item => {
          if (item.keyId !== row.keyId) {
            return item
          }
        })
      }
      // 取消的是保存的数据则取消改行编辑
      this.$refs.tableUsers.cancelEditRow(row.keyId)
      const index = this.editIds.findIndex(item => item === row.keyId)
      this.editIds.splice(index, 1)
    },
    // 保存一行
    $_handleSave(row) {
      if (!this.id) {
        this.$message.error('请先填写基本信息创建MAP中心')
        return
      }
      this.$refs.tableUsers.endEditRow(row.keyId, (valid, result, oldRow) => {
        if (valid) {
          addOrUpdMapUserInfo({
            ...result,
            mapInfoId: this.id
          }).then(res => {
            const index = this.editIds.findIndex(item => item === row.keyId)
            this.editIds.splice(index, 1)
            if (res.status === 200) {
              // // 回填数据 防止修改时没有id
              this.userForm = this.userForm.map(item => {
                if (result.keyId === item.keyId) {
                  return {
                    ...result,
                    ...res.data
                  }
                }
                return item
              })
              this.$message.success('操作成功')
              // this.getSourceData()
            } else {
              // 操作失败 保持在编辑状态
              // 后台报错 不删除不处理 但是处于编辑状态
              this.userForm = this.userForm.map(item => {
                if (oldRow.keyId === item.keyId) {
                  return result
                }
                return item
              })
              this.$nextTick(() => {
                this.$refs.tableUsers.startEditRow(row.keyId)
                this.editIds.push(row.keyId)
              })
              this.$message.error(`操作失败${res.message}`)
            }
          })
        } else {
          // 如果校验失败，则返回校验的第一个输入框的异常信息
          console.log(result)
          this.$message.error(result.message)
        }
      })
    },
    // 添加一行
    $_handleAdd() {
      let keyId = ''
      const flag002 = this.userForm.find(item => item.role === '002')

      if (flag002) {
        // 找到了
        keyId = uuidv4()
        this.userForm.push({
          keyId,
          role: '001',
          cname: '农艺师',
          name: '',
          mobile: '',
          email: ''
        })
      } else {
        keyId = 2
        this.userForm.push({
          keyId: 2,
          role: '002',
          cname: '金融专员',
          name: '',
          mobile: '',
          email: ''
        })
      }
      // 排序 从大到小 003 002 001
      this.userForm.sort(sortFnLargeToSmall('role'))
      // 开启某行编辑状态
      this.$refs.tableUsers.startEditRow(keyId)
      this.editIds.push(keyId)
    },
    // 删除一行
    $_handleDel(row) {
      if (!row.id) {
        // 取消编辑状态
        const index = this.editIds.findIndex(item => item === row.keyId)
        this.editIds.splice(index, 1)

        this.userForm = this.userForm.filter(item => {
          if (item.keyId !== row.keyId) {
            return item
          }
        })
        return
      }
      //
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delMapUserInfo({
          id: row.id
        }).then(res => {
          if (res.status === 200) {
            this.$message.success('操作成功')
            this.userForm = this.userForm.filter(item => {
              if (item.keyId !== row.keyId) {
                return item
              }
            })
            const index = this.editIds.findIndex(item => item === row.keyId)
            this.editIds.splice(index, 1)
          } else {
            // 操作失败 保持在编辑状态
            this.$refs.tableUsers.startEditRow(row.keyId)
            this.editIds.push(row.keyId)
            this.$message.error(`操作失败${res.message}`)
          }
        })
      })
    },
    // 用户类方法   =========================分割线============================
    // 借款类方法   =========================分割线============================
    // 添加一行借款产品 👇👇👇👇👇👇👇👇👇
    $_handleAddLoan() {
      const pId = this.form.selectProduct.id
      if (!pId) {
        this.$message.error('请选择产品')
        return
      }
      // 不允许添加重复产品
      let flag = false
      this.productData.map(item => {
        if (+item.productId === +pId) {
          flag = true
        }
      })
      if (flag) {
        this.$message.error('当前map中心已存在该产品信息 不可重复添加')
        return
      }
      const obj = JSON.parse(JSON.stringify(this.form.selectProduct))
      obj.productId = pId
      delete obj.id
      const uuid = uuidv4()
      this.productData.push({
        ...obj,
        uuid
      })
      this.dialogVisible = false
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.tableLoan.startEditRow(uuid)
      // 记录开启了行编辑的id
      this.loanEditIds.push(uuid)
      this.form.selectProduct = {}
    },
    $_handleEditLoan(row) {
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs.tableLoan.startEditRow(row.uuid)
      // 记录开启了行编辑的id
      this.loanEditIds.push(row.uuid)
    },
    $_handleEditLoanStatus(row) {
      if (row.id) {
        this.$confirm('确定修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let status = row.status
          if (+status === 0) {
            status = 1
          } else {
            status = 0
          }
          editMapLoanProductsStatus({ id: row.id, status }).then(res => {
            if (res.status === 200) {
              this.$message.success('操作成功')
              this.getSourceData()
            } else {
              this.$message.warning(res.message)
            }
          })
        })
      }
    },
    $_handleSaveLoan(row) {
      if (!this.id) {
        this.$message.error('请先填写基本信息创建MAP中心')
        return
      }
      this.$refs.tableLoan.endEditRow(row.uuid, (valid, result, oldRow) => {
        if (valid) {
          // console.log('修改之后的数据', result)
          // console.log('原始数据', oldRow)
          const index = this.loanEditIds.findIndex(item => item === row.uuid)
          this.loanEditIds.splice(index, 1)
          // 添加到新的数组中
          this.productData = this.productData.map(item => {
            if (result.uuid === item.uuid) {
              return result
            }
            return item
          })
          // 调用接口
          editMapProducts({
            mapInfoId: this.id,
            ...result
          }).then(res => {
            if (+res.status === 200) {
              this.$message.success('操作成功')
              // 回填数据 防止修改时没有id
              this.productData = this.productData.map(item => {
                if (result.uuid === item.uuid) {
                  return {
                    ...result,
                    ...res.data
                  }
                }
                return item
              })
              // this.getSourceData()
            } else {
              this.$message.error(res.message)
              // 操作失败 保持在编辑状态
              // 通过调用 startEditRow 可以开启行编辑
              this.$refs.tableLoan.startEditRow(row.uuid)
              // 记录开启了行编辑的id
              this.loanEditIds.push(row.uuid)
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
      if (!row.id) {
        // 取消的是没有保存的数据 则直接删掉
        this.productData = this.productData.filter(item => {
          if (item.uuid !== row.uuid) {
            return item
          }
        })
      }
      this.$refs.tableLoan.cancelEditRow(row.uuid)
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
    },
    handleEdit() {
      // type = 0 创建 1 查看 2 编辑
      this.$router.push({
        path: `/map/edit?id=${this.id}&type=2`
      })
    },
    // 借款类方法   =========================分割线============================
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.fixd-btn {
  position: absolute;
  top: 14px;
  right: 20px;
}
</style>
