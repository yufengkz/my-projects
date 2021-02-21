<template>
  <el-form ref="form" class="register-content-form step-two" :rules="rules" :model="form">
    <h4>账户信息</h4>
    <el-form-item prop="userName">
      <i class="el-icon-user ele-icon"></i>
      <el-input type="text" ref="userName" placeholder="请输入用户名" v-model="form.userName" maxlength="16"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <i class="el-icon-lock ele-icon"></i>
      <el-input type="password" ref="password" placeholder="请输入密码" v-model="form.password" auto-complete="new-password"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword">
      <i class="el-icon-unlock ele-icon"></i>
      <el-input type="password" placeholder="请再次输入密码" v-model="form.confirmPassword" auto-complete="new-password"></el-input>
    </el-form-item>
    <h4 style="margin-top:30px;">用户信息</h4>
    <el-form-item prop="sinochemOwned">
      <i class="el-icon-guide ele-icon"></i>
      <el-select
        v-model="form.sinochemOwned"
        placeholder="请选择是否中化成员单位"
        @change="handleSinochemOwnedChange"
        style="width:100%;"
      >
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="fullName">
      <i class="el-icon-postcard ele-icon"></i>
      <el-input type="text" ref="fullName" placeholder="请输入姓名" v-model="form.fullName" maxlength="40"></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <i class="el-icon-message ele-icon"></i>
      <el-input type="text" ref="email" placeholder="请输入公司邮箱" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item :prop="form.sinochemOwned===1?'entId':'entName'">
      <i class="el-icon-office-building ele-icon"></i>
      <el-autocomplete
        v-show="form.sinochemOwned!==1"
        class="inline-input"
        v-model="form.entName"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        placeholder="请输入公司名称"
        @select="handleSelect"
        style="width:100%;"
      ></el-autocomplete>
      <el-select v-model="form.entId" placeholder="请选择所在单位" v-show="form.sinochemOwned===1">
        <el-option v-for="item in interEntOptions" :key="item.id" :label="item.entName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="department">
      <i class="el-icon-copy-document ele-icon"></i>
      <el-input type="text" placeholder="请输入部门名称" v-model="form.department" maxlength="40"></el-input>
    </el-form-item>
    <div class="register-content-button">
      <div class="register-checked">
        <!-- <input type="checkbox" ref="isChecked" id="item1" name="item" />
        <label for="item1"></label>
        <span>
          同意
          <em>"服务条款"</em> 和
          <em>"隐私相关政策"</em>
        </span>-->
        <button type="button" @click="submitForm">注册</button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { entSearch, getEnts, doRegister } from '@/api/login.js'

export default {
  name: 'RegisterStepTwo',
  data() {
    // 确认新密码校验
    const confirmPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('密码与确认密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      options: [
        {
          value: 1,
          label: '中化成员单位'
        },
        {
          value: 0,
          label: '非中化成员单位'
        }
      ],
      // 中化成员公司列表
      interEntOptions: [],
      form: {
        userName: '',
        fullName: '',
        password: '',
        sinochemOwned: null,
        confirmPassword: '',
        email: '',
        entId: null,
        entName: '',
        department: '',
        validatePwd: null
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z]{1}[[a-zA-Z0-9]{5,15}$/, message: '请输入字母、数字组合，6-16个字符，以字母开头', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z!@#$%^&*]{6,18}$/, message: '请输入字母、数字、符号，6-18个字符', trigger: 'blur' }
        ],
        confirmPassword: [{ required: true, validator: confirmPasswordValidator, trigger: 'blur' }],
        sinochemOwned: [{ required: true, message: '请选择是否中化成员单位', trigger: ['blur', 'change'] }],
        fullName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5—a-zA-Z][\u4e00-\u9fa5a-zA-Z\s]*[\u4e00-\u9fa5a-zA-Z]?$/, message: '只能输入中文、英文', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入公司邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        entName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { max: 40, message: '请输入40个字符以内', trigger: 'blur' }
        ],
        entId: [{ required: true, message: '请选择所在单位', trigger: 'blur' }],
        department: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { pattern: /^[\u4e00-\u9fa5]+$/, message: '只能输入中文', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    userId: {
      type: Number
    },
    version: {
      type: Number
    }
  },
  computed: {
    registerBtnDisabled() {
      // return this.form.userName === '' || this.form.password === '' || this.form.setpwdAgain === '' || this.form.name === '' || this.form.email === ''
      return true
    }
  },
  methods: {
    // 提交注册
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        const { userName, sinochemOwned, password, fullName, entName, entId, email, department } = this.form
        const {userId, version} = this
        doRegister({ userId, version, userName, sinochemOwned, password, fullName, entName, entId, email, department })
          .then(res => {
            if (res.status === 200) {
              // 与父级通信
              this.$emit('StepTwoSuccess', sinochemOwned)
            } else {
              this.$message.error(res.message || '注册异常，请稍后再试')
            }
          })
          .catch(() => {
            this.$message.error('注册异常，请稍后再试')
          })
      })
    },
    // 是否中化成员单位
    handleSinochemOwnedChange(val) {
      this.form.entId = ''
      this.form.entName = ''
      this.$refs.form.clearValidate('entId')
      this.$refs.form.clearValidate('entName')
      // 1-中化成员单位
      if (val === 1 && this.interEntOptions.length === 0) {
        this.getInterEnts()
      }
    },
    handleSelect(item) {
      this.form.entName = item.ENTNAME
    },
    // 非中化成员公司名称模糊查询
    querySearch(queryString, cb) {
      let results = []
      if (queryString) {
        entSearch({ key: queryString })
          .then(res => {
            if (res.status === 200) {
              results = res.data.map(v => {
                return { value: v.ENTNAME, AREACODE: v.AREACODE, NAME: v.NAME, ID: v.ID, ENTNAME: v.ENTNAME }
              })
            } else {
              results = []
            }
            cb(results)
          })
          .catch(err => {
            console.info(err)
            results = []
            cb(results)
          })
      }
      // 调用 callback 返回建议列表的数据
    },
    // 中化成员公司列表
    getInterEnts() {
      getEnts()
        .then(res => {
          if (res.status === 200) {
            this.interEntOptions = res.data.rows
          } else {
            this.interEntOptions = []
          }
        })
        .catch(() => {
          this.interEntOptions = []
        })
    }
  }
}
</script>

<style lang="scss">
$theme-font: #4a90e2;

.register-content-form.step-two {
  margin-top: -20px;
  .el-form-item {
    margin-bottom: 12px !important;
    .el-form-item__content {
      line-height: 0;
      height: 36px;
    }
    .ele-icon {
      color: #d1d1d1;
      font-size: 25px;
      position: absolute;
      top: 6px;
    }
    .icon {
      margin-bottom: -11px !important;
    }
    .el-input {
      bottom: 25px !important;
    }
    .el-select {
      width: 100%;
      .el-input {
        bottom: 0px !important;
      }
    }
    .el-autocomplete {
      .el-input {
        bottom: 0px !important;
      }
    }
    .ele-icon + .el-input {
      bottom: 0px !important;
    }
  }
  .register-content-button {
    margin-top: 10px;
    .register-checked {
      // padding-left: 33%;
      margin-bottom: 20px;
      input {
        display: none;
      }
      label {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        border: 1px solid #287bff;
        background-image: white;
      }
      input:checked ~ label {
        border: 0px solid #287bff;
        background-image: linear-gradient(54deg, #2177ff 0%, #6ba4ff 100%);
      }
      span {
        color: $theme-font;
        font-size: 14px;
        em {
          font-style: normal;
          color: #16b9fe;
        }
      }
    }
    .button-disabled {
      background-image: linear-gradient(54deg, rgba(33, 119, 255, 0.6) 0%, rgba(107, 164, 255, 0.6) 100%);
      color: white;
    }
    button {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      cursor: pointer;
      color: #ffffff;
      border: 0;
      font-size: 20px;
      background-image: linear-gradient(90deg, #0565ff 0%, #0099ff 100%);
    }
  }
}
</style>
