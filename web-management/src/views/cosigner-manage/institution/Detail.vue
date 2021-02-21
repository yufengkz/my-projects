/**借款修改、添加 - 一页多用 */
<template>
  <div class="container">
    <!-- app-container -->
    <div class="fixd-btn">
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEdit">
        编辑
      </el-button>
      <el-button plain size="mini" @click="goBack">
        返回
      </el-button>
    </div>
    <el-form :model="ruleForm" disabled ref="ruleForm" size="mini" label-position="right" label-width="130px">
      <!-- 中心信息 -->
      <v-form title="详情">
        <template slot="content">
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="name" label="机构名称">
                <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="role" label="机构角色">
                <el-select v-model="ruleForm.role" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in $store.state.base.companyRole"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="type" label="机构类型">
                <el-select v-model="ruleForm.type" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in $store.state.base.companyType"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="approvalLimit" label="合作额度">
                <el-input v-model="ruleForm.approvalLimit" placeholder="请输入">
                  <template slot="suffix">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="rate" label="合作利率">
                <el-input v-model="ruleForm.rate" placeholder="请输入">
                  <template slot="suffix">%(年化)</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="creditCode" label="统一社会信用代码">
                <el-input v-model="ruleForm.creditCode" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="endDate" label="合作截至日期">
                <el-date-picker
                  v-model="ruleForm.endDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </v-form>
      <!-- <div class="btns-center-box">
        <el-button @click="goBack" size="mini">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')" size="mini">保存</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import VForm from '@/components/VForm'
import { getCompanyDetail, updateCompany, addCompany } from '@/api/cosigner-manage'
export default {
  components: {
    VForm
  },
  data() {
    return {
      type: '',
      companyId: '',
      ruleForm: {
        name: '',
        role: '',
        type: '',
        approvalLimit: '', // 合作额度
        rate: '',
        creditCode: '',
        endDate: ''
      },
      rules: {
        name: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        role: [{ required: true, message: '请选择合作机构角色', trigger: 'change' }],
        type: [{ required: true, message: '请选择合作机构类型', trigger: 'change' }],
        approvalLimit: [{ required: true, message: '请输入合作额度', trigger: 'blur' }],
        rate: [{ required: true, message: '请输入合作利率', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        endDate: [{ required: true, message: '请输入合作截止日期', trigger: 'change' }]
      }
    }
  },
  created() {
    // type = 0 创建 1 查看 2 编辑
    this.type = this.$route.query.type
    this.companyId = this.$route.query.id
    if (this.companyId) this.getSourceData({ id: this.companyId })
  },
  methods: {
    // 获取数据
    async getSourceData(params) {
      const { status, data } = await getCompanyDetail(params)
      if (+status === 200) {
        // this.ruleForm = data
        this.ruleForm = {
          name: data.name,
          role: data.role,
          type: data.type,
          approvalLimit: data.approvalLimit, // 合作额度
          rate: data.rate,
          creditCode: data.creditCode,
          endDate: data.endDate
        }
      }
    },
    // 提交
    submitForm() {
      if (+this.ruleForm.rate > 100) {
        return this.$message.error('合作利率不能大于合作额度 ')
      } else if (+this.ruleForm.rate < 0) {
        return this.$message.error('合作利率不能为负值 ')
      }
      //
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (+this.type === 2) {
            // 编辑、修改
            updateCompany({ ...this.ruleForm, companyId: this.companyId }).then(res => {
              if (+res.status === 200) {
                this.$message.success('操作成功')
              } else {
                this.$message.error('操作失败 ' + res.message)
              }
            })
          } else {
            addCompany(this.ruleForm).then(res => {
              if (+res.status === 200) {
                this.$message.success('操作成功')
              } else {
                this.$message.error('操作失败 ' + res.message)
              }
            })
          }
        }
      })
    },
    handleEdit() {
      // type = 0 创建 1 查看 2 编辑
      this.$router.push({ path: `/cosigner-manage/institution/add?id=${this.companyId}&type=2` })
    },
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-input.is-disabled .el-input__inner {
  background: #fff;
  cursor: inherit;
}

.fixd-btn {
  position: absolute;
  top: 14px;
  right: 20px;
}
</style>
