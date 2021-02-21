/**借款修改、添加 - 一页多用 */
<template>
  <div class="container">
    <!-- app-container -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" size="mini" label-position="right" label-width="130px">
      <!-- 中心信息 -->
      <v-form :title="+type === 0 ? '新增产品' : '修改产品'">
        <template slot="content">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="productType" label="产品类型">
                <el-select v-model="ruleForm.productType" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in $store.state.base.prodects"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="name" label="产品名称">
                <el-input
                  v-model="ruleForm.name"
                  placeholder="请输入"
                  :disabled="+type === 0 ? false : true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="userType" label="业务受众">
                <el-select v-model="ruleForm.userType" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in $store.state.base.userType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="interestRate" label="产品利率">
                <el-input v-model="ruleForm.interestRate" placeholder="请输入">
                  <template slot="suffix">%(年化)</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="maxCreditLimit" label="客户授信限额">
                <el-input v-model="ruleForm.maxCreditLimit" placeholder="请输入">
                  <template slot="suffix">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="status" label="启用状态">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                  <el-option label="启用" value="1"></el-option>
                  <el-option label="禁用" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="guaranteeFlag" label="是否绑定合作企业">
                <el-radio-group v-model="ruleForm.guaranteeFlag" @change="handleChenge">
                  <el-radio label="N">否</el-radio>
                  <el-radio label="Y">是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item
                prop="guaranteeCompany"
                label="选择合作企业"
                :rules="
                  ruleForm.guaranteeFlag === 'Y'
                    ? [{ required: true, message: '请选择合作企业', trigger: 'change' }]
                    : []
                "
              >
                <el-select
                  v-model="ruleForm.guaranteeCompany"
                  placeholder="请选择"
                  :disabled="ruleForm.guaranteeFlag === 'Y' ? false : true"
                >
                  <el-option
                    v-for="(item, index) in $store.state.base.cooperativeEnterprise"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="type !== 0">
              <el-form-item label="产品号">
                <span>{{ ruleForm.productCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </v-form>
      <div class="btns-center-box">
        <el-button @click="goBack" size="mini">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import { getLoanProductInfo, addOrUpdProductInfo } from '@/api/loan'
export default {
  components: {
    VForm
  },
  data() {
    return {
      type: '',
      id: '',
      company: '',
      ruleForm: {
        productType: '',
        name: '',
        userType: '',
        interestRate: '',
        maxCreditLimit: '',
        status: '',
        guaranteeFlag: '',
        guaranteeCompany: '',
        productCode: ''
      },
      rules: {
        productType: [{ required: true, message: '请选择产品类型', trigger: 'change' }],
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        userType: [{ required: true, message: '请选择业务受众', trigger: 'change' }],
        interestRate: [{ required: true, message: '请输入产品利率', trigger: 'blur' }],
        maxCreditLimit: [{ required: true, message: '请输入客户授信限额', trigger: 'blur' }],
        status: [{ required: true, message: '请选择启用状态', trigger: 'change' }],
        guaranteeFlag: [{ required: true, message: '请选择是否绑定合作企业', trigger: 'change' }]
      }
    }
  },
  created() {
    // type = 0 创建 1 查看 2 编辑
    this.type = +this.$route.query.type
    this.id = this.$route.query.id
    if (this.id) this.getSourceData({ id: this.id })
  },
  methods: {
    // 获取数据
    async getSourceData(params) {
      const { status, data } = await getLoanProductInfo(params)
      if (+status === 200) {
        console.log(data)
        // this.ruleForm = data
        this.ruleForm = {
          productType: data.productType,
          name: data.name,
          userType: data.userType,
          interestRate: data.interestRate,
          maxCreditLimit: data.maxCreditLimit,
          status: data.status,
          guaranteeFlag: data.guaranteeFlag,
          guaranteeCompany: data.guaranteeCompany,
          productCode: data.productCode
        }
        this.company = data.guaranteeCompany
      }
    },
    // 提交
    submitForm() {
      // 当guaranteeFlag = Y时验证全部参数
      if (this.ruleForm.guaranteeFlag === 'Y') {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            console.log('submit!', this.ruleForm)
            addOrUpdProductInfo({ ...this.ruleForm, id: this.id }).then(res => {
              if (+res.status === 200) {
                this.$message.success('操作成功')
                // 添加成功后刷新store中的贷款产品数据列表
                this.$store.dispatch('GetLoanProducts')
                this.goBack()
              } else {
                this.$message.error('操作失败 ' + res.message)
              }
            })
          }
        })
      } else {
        // 验证部分参数
        const validateArr = [
          'productType',
          'name',
          'userType',
          'interestRate',
          'maxCreditLimit',
          'status',
          'guaranteeFlag'
        ]
        Promise.all(
          validateArr.map(item => {
            return new Promise((resolve, reject) => {
              this.$refs.ruleForm.validateField(item, error => {
                resolve(error)
              })
            })
          })
        ).then(res => {
          // res 里是各个字段的验证错误信息, 如果为空串则认为验证通过, 如果数组里全为空串则所有验证通过
          // 判断res 里是否全是空串
          console.info(res)
          if (!res.join('')) {
            this.ruleForm.guaranteeCompany = ''
            addOrUpdProductInfo({ ...this.ruleForm, id: this.id }).then(res => {
              if (+res.status === 200) {
                this.$message.success('操作成功')
                // 添加成功后刷新store中的贷款产品数据列表
                this.$store.dispatch('GetLoanProducts')
                this.goBack()
              } else {
                this.$message.warning('操作失败 ' + res.message)
              }
            })
          } else {
            console.log('this.company = ', this.company)
            this.$message.error('请输入必填信息')
          }
        })
      }
    },
    // 单选框选择
    handleChenge() {
      if (this.ruleForm.guaranteeFlag === 'Y') {
        this.guaranteeCompany = this.company
      } else {
        this.guaranteeCompany = ''
      }
      this.$refs.ruleForm.clearValidate('guaranteeCompany')
    },
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped></style>
