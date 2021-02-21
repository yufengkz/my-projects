<template>
  <div class="container">
    <!-- app-container -->
    <el-form :model="ruleForm" ref="ruleForm" size="mini" label-position="right" label-width="130px">
      <!-- 中心信息 -->
      <v-form title="产品详情">
        <template slot="header-btns">
          <div>
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="goTo">修改</el-button>
            <el-button size="mini" plain @click="goBack">返回</el-button>
          </div>
        </template>
        <template slot="content">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="productType" label="产品类型：">
                <span>{{ ruleForm.productType }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="name" label="产品名称：">
                <span>{{ ruleForm.name }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="userType" label="业务受众：">
                <span>{{ ruleForm.userType }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="interestRate" label="产品利率：">
                <span>{{ ruleForm.interestRate }}%</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="maxCreditLimit" label="客户授信限额：">
                <span>{{ ruleForm.maxCreditLimit }}万元</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="status" label="启用状态：">
                <span>{{ +ruleForm.status === 1 ? '启用' : '禁用' }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="guaranteeFlag" label="是否绑定合作企业：">
                <span>{{ ruleForm.guaranteeFlag === 'Y' ? '是' : '否' }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="guaranteeCompany" label="选择合作企业：">
                <span>{{ ruleForm.guaranteeCompany }}</span>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item label="产品号：">
                <span>{{ ruleForm.productCode }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </v-form>
    </el-form>
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import { getLoanProductInfo } from '@/api/loan'
export default {
  components: {
    VForm
  },
  data() {
    return {
      type: '',
      id: '',
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
      }
    }
  },
  created() {
    // type = 0 创建 1 查看 2 编辑
    this.type = this.$route.query.type
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
        // 更改产品名称
        let productName
        this.$store.state.base.prodects.forEach(item => {
          if (item.value === data.productType) {
            productName = item.label
          }
        })
        // 更改业务受众
        let userTypeName
        this.$store.state.base.userType.forEach(item => {
          if (item.value === data.userType) {
            userTypeName = item.label
          }
        })
        // 更改合作企业code值的name code -> name
        let company
        this.$store.state.base.cooperativeEnterprise.forEach(item => {
          if (item.value === data.guaranteeCompany) {
            company = item.label
          }
        })
        this.ruleForm = {
          productType: productName,
          name: data.name,
          userType: userTypeName,
          interestRate: data.interestRate,
          maxCreditLimit: data.maxCreditLimit,
          status: data.status,
          guaranteeFlag: data.guaranteeFlag,
          guaranteeCompany: company || '-',
          productCode: data.productCode
        }
      }
    },
    goTo() {
      this.$router.push(`/loan-apply/edit?id=${this.id}&type=2`)
    },
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped></style>
