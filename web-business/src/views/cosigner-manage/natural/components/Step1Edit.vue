<template>
  <div class="app-container">
    <div>
      <v-form title="担保人授权">
        <template slot="content">
          <el-form
            ref="form1"
            :model="form1"
            :rules="form1Rules"
            size="mini"
            class="m-t-20 p-l-10 block-el-select"
            label-position="right"
            label-width="140px"
          >
            <el-row :gutter="40">
              <!-- 担保人信息 -->
              <el-col :span="24">
                <el-form-item prop="guaranteePerson.creditAuthType" label="征信授权模式:" label-width="130px">
                  <el-radio-group v-model="form1.guaranteePerson.creditAuthType" size="mini">
                    <el-radio
                      v-for="(item,key) in this.guanranteeEnum.creditAuthTypeEnum"
                      :key="key"
                      :label="key"
                    >{{item}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="form1.guaranteePerson.creditAuthType==='outline'">
                <el-form-item prop="guaranteePerson.signDate" label="签署日期:" label-width="130px">
                  <el-date-picker
                    type="date"
                    placeholder="请选择"
                    v-model="form1.guaranteePerson.signDate"
                    value-format="yyyy-MM-dd"
                    style="width: 25%;"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item prop="guaranteePerson.fileKey" label="授权证明:" label-width="130px">
                  <ImageUpload @updateChild="updateChildGuaranteePerson" :imageList="GuaranteeFileList"></ImageUpload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 担保人配偶 -->
            <div v-if="this.form1.guaranteePerson.marriage == '2'">
              <span class="all-subtitle">担保人配偶</span>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteePerson.spouseReq.name" label="姓名:" label-width="130px">
                    <el-input v-model="form1.guaranteePerson.spouseReq.name" placeholder="请输入" maxlength="20"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteePerson.spouseReq.idNo" label="身份证号:" label-width="130px">
                    <el-input v-model="form1.guaranteePerson.spouseReq.idNo" placeholder="请输入" maxlength="18"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteePerson.spouseReq.mobile" label="手机号码:" label-width="130px">
                    <el-input v-model="form1.guaranteePerson.spouseReq.mobile" placeholder="请输入" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item prop="guaranteePerson.spouseReq.creditAuthType" label="征信授权模式:" label-width="130px">
                    <el-radio-group v-model="form1.guaranteePerson.spouseReq.creditAuthType" size="mini">
                      <el-radio
                        v-for="(item,key) in this.guanranteeEnum.creditAuthTypeEnum"
                        :key="key"
                        :label="key"
                      >{{item}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24" v-if="form1.guaranteePerson.spouseReq.creditAuthType == 'outline'">
                  <el-form-item prop="guaranteePerson.spouseReq.signDate" label="签署日期:" label-width="130px">
                    <el-date-picker
                      type="date"
                      placeholder="请选择"
                      v-model="form1.guaranteePerson.spouseReq.signDate"
                      value-format="yyyy-MM-dd"
                      style="width: 25%;"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item prop="guaranteePerson.spouseReq.fileKey" label="授权证明:" label-width="130px">
                    <ImageUpload @updateChild="updateChildSpouseReq" :imageList="spouseReqFileList"></ImageUpload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
        </template>
      </v-form>
      <el-row class="p-b-30 text-right">
        <el-col :span="12">
          <el-button @click="submitStep1" type="primary" class="wide-button" size="mini">保存提交</el-button>
        </el-col>
        <el-col :span="12">
          <el-button type="text" class="wide-button" size="mini" @click="goToInfo">跳过，去完善信息</el-button>
        </el-col>
      </el-row>
      <el-footer class="el_footer">【温馨提示】在提交贷款审批前，必须完成征信查询授权签署和风险试算，如有特殊情况，可先行跳过进行信息完善。</el-footer>
    </div>
  </div>
</template>
<script>
import { submitApplyAccess } from '@/api/cosigner-manage'
import { mapGetters } from 'vuex'
const mobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机号验证
const idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ // 身份证号验证
const length = /^[^ ]{2,20}$/
export default {
  name: 'LoanApplyStep1Edit',
  components: {
    // DescriptionList: () => import('@/components/DescriptionList'),
    VForm: () => import('@/components/VForm'),
    ImageUpload: () => import('@/components/ImageUpload')
  },
  props: {
    applyNo: {
      type: String,
      default: ''
    },
    reSign: {
      type: String,
      default: 'N'
    },
    personInfo: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(['guanranteeEnum'])
  },
  data() {
    const valiFile = (rule, value, callback) => {
      // 图片验证
      if (value == null || value === '') {
        callback(new Error('请上传授权证明'))
      } else {
        callback()
      }
    }
    return {
      GuaranteeFileList: [],
      spouseReqFileList: [],
      form1: {
        applyNo: this.applyNo,
        guaranteePerson: {
          creditAuthType: '',
          fileKey: '',
          marriage: '',
          signDate: '',
          spouseReq: {
            creditAuthType: '',
            fileKey: '',
            idNo: '',
            mobile: '',
            name: '',
            id: null,
            signDate: ''
          }
        }
      },
      form1Rules: {
        'guaranteePerson.creditAuthType': [{ required: true, message: '请选择征信授权模式', trigger: 'blur' }],
        'guaranteePerson.fileKey': [{ required: true, validator: valiFile, trigger: 'change' }], // 图片验证
        'guaranteePerson.spouseReq.creditAuthType': [{ required: true, message: '请选择配偶征信授权模式', trigger: 'blur' }],
        'guaranteePerson.spouseReq.fileKey': [{ required: true, validator: valiFile, trigger: 'change' }], // 图片验证
        'guaranteePerson.spouseReq.name': [{ required: true, message: '请输入正确的姓名', trigger: 'blur' }, { pattern: length, message: '请输入正确的姓名', trigger: 'blur' }],
        'guaranteePerson.spouseReq.idNo': [{ required: true, message: '请输入正确的身份证号', trigger: 'blur' }, { pattern: idCard, message: '请输入正确的身份证号', trigger: 'blur' }],
        'guaranteePerson.spouseReq.mobile': [{ required: true, message: '请输入正确的手机号', trigger: 'blur' }, { pattern: mobile, message: '请输入正确的手机号', trigger: 'blur' }],
        'guaranteePerson.spouseReq.signDate': [{ required: true, message: '请输入日期', trigger: 'change' }],
        'guaranteePerson.signDate': [{ required: true, message: '请输入日期', trigger: 'change' }]
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // 配偶线下部署
    updateChildSpouseReq(list) {
      this.spouseReqFileList = list
      const str = list.map(item => item.fileKey)
      this.form1.guaranteePerson.spouseReq.fileKey = ''
      this.form1.guaranteePerson.spouseReq.fileKey = str.toString()
    },
    // 个人线下部署
    updateChildGuaranteePerson(list) {
      this.GuaranteeFileList = list
      const str = list.map(item => item.fileKey)
      this.form1.guaranteePerson.fileKey = ''
      this.form1.guaranteePerson.fileKey = str.toString()
    },
    goToInfo() {
      this.$emit('stepEditJump', 1)
    },
    submitStep1() {
      // 切换到线上 清空fileKey
      if (this.form1.guaranteePerson.creditAuthType === 'online') {
        this.form1.guaranteePerson.fileKey = ''
        this.form1.guaranteePerson.signDate = ''
      }
      if (this.form1.guaranteePerson.spouseReq.creditAuthType === 'online') {
        this.form1.guaranteePerson.spouseReq.fileKey = ''
        this.form1.guaranteePerson.spouseReq.signDate = ''
        this.form1.guaranteePerson.spouseReq.creditFileKey = ''
      }
      this.$refs.form1.validate(valid1 => {
        if (valid1) {
          const obj = {
            ...this.form1
          }
          submitApplyAccess(obj).then(res => {
            if (res.status === 200) {
              this.$emit('stepEditChild', false)
              this.$message.success('成功')
            } else {
              this.$message.error(res.message || '失败')
            }
          })
        }
      })
    }
  },
  watch: {
    personInfo(newVal, oldVal) {
      if (newVal) {
        this.form1.guaranteePerson.spouseReq.signDate = newVal.spouse && newVal.spouse.authInDTO && newVal.spouse.authInDTO.signDate
        this.form1.guaranteePerson.spouseReq.creditAuthType = newVal.spouse && newVal.spouse.creditAuthType
        this.form1.guaranteePerson.spouseReq.name = newVal.spouse && newVal.spouse.name
        this.form1.guaranteePerson.spouseReq.idNo = newVal.spouse && newVal.spouse.idNo
        this.form1.guaranteePerson.spouseReq.id = newVal.spouse && newVal.spouse.id
        this.form1.guaranteePerson.spouseReq.mobile = newVal.spouse && newVal.spouse.mobile
        this.form1.guaranteePerson.spouseReq.creditFileKey = newVal.spouse && newVal.spouse.creditFileKey
        this.form1.guaranteePerson.spouseReq.fileKey = newVal.spouse && newVal.spouse.authInDTO && newVal.spouse.authInDTO.fileKey
        this.form1.guaranteePerson.creditAuthType = newVal.creditAuthType // 征信授权类型
        this.form1.guaranteePerson.fileKey = newVal.authInDTO && newVal.authInDTO.fileKey // 征信授权文件列表
        this.form1.guaranteePerson.marriage = newVal.personBaseRep && newVal.personBaseRep.marriage // 配偶
        this.form1.guaranteePerson.signDate = newVal.authInDTO && newVal.authInDTO.signDate
        this.GuaranteeFileList = newVal.customerFileList // fileData 需要更换 目前接口没有返回
        this.spouseReqFileList = newVal.spouseFileList
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
