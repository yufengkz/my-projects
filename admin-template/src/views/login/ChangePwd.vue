<template>
    <div>
        <el-dialog
            :title="dialogTitle"
            :visible="dialogVisible"
            :append-to-body="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            width="518px"
            class="change-pwd"
            @close="clearDialog"
        >
            <el-form :model="form" status-icon ref="form" :rules="rules" label-position="top" label-width="8px">
                <el-form-item label="手机号" prop="mobileNo">
                    <el-input v-model="form.mobileNo" v-if="$route.path === '/login'" maxlength="11" placeholder="请输入手机号"></el-input>
                    <el-input v-model="form.mobileNo" v-else disabled></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPassword">
                    <el-input type="password" v-model="form.confirmPassword" autocomplete="off" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="图形验证码" prop="verifyCode">
                    <el-input v-model="form.verifyCode" placeholder="请输入图形验证码" maxlength="4"></el-input>
                    <span class="forget-imgUrl" @click="getImgCodeFunc">
                        <img :src="verifyImgUrl" alt="验证码" />
                    </span>
                </el-form-item>
                <el-form-item label="验证码" prop="smsVerCode" scope-slot="error">
                    <el-input v-model="form.smsVerCode" autocomplete="off" placeholder="请输入4位验证码" maxlength="4">
                        <el-button slot="append" v-if="smsTime < 60">{{ smsTime + '秒后重新获取' }}</el-button>
                        <el-button slot="append" v-else @click="checkImageCode">{{ smsText }}</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item class="footer text-center">
                    <el-button type="primary" @click="submitForm('form')">确认</el-button>
                    <el-button @click="closeDialog()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import { getImgCode, checkImgCode, sendSmsCode, resetPassword } from '@/api/login.js'
import { validateMobile, validatePassword } from '@/utils/validate'
import { mapGetters } from 'vuex'
const Base64 = require('js-base64').Base64

export default {
    name: 'ChangePwd',
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        userMobile: {
            type: String
        }
    },
    data() {
        // 手机号校验
        const validateMobileNo = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'))
            } else if (!validateMobile(value)) {
                callback(new Error('请输入正确的手机号'))
            } else {
                callback()
            }
        }
        // 新密码校验
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'))
            } else if (value.length < 8 || value.length > 16) {
                callback(new Error('请录入8~16位密码'))
            } else if (!validatePassword(value)) {
                callback(new Error('密码至少包含英文字母和数字两种字符'))
            } else {
                if (this.form.confirmPassword !== '') {
                    this.$refs.form.validateField('confirmPassword')
                }
                callback()
            }
        }
        // 确认新密码校验
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'))
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致，请重新输入'))
            } else {
                callback()
            }
        }
        return {
            verifyImgUrl: '',
            verifyCodeId: '', // 图形验证码id
            dialogTitle: '修改密码', // 对话框标题
            // getCodeBtn: true, // 获取验证码按钮是否可点
            smsTime: 60, // 倒计时时间
            smsText: '获取短信验证码',
            timer: null, // 倒计时计时器
            form: {
                mobileNo: '',
                password: '',
                confirmPassword: '',
                smsVerCode: '',
                verifyCode: '' // 图形验证码
            },
            rules: {
                mobileNo: [{ required: true, validator: validateMobileNo, trigger: 'blur' }],
                verifyCode: [
                    { required: true, message: '请输入图形验证码', trigger: 'blur' },
                    { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }
                ],
                password: [{ required: true, validator: validatePass, trigger: 'blur' }],
                confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
                smsVerCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min: 4, message: '请输入四位验证码', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        // 获取图形验证码
        this.getImgCodeFunc()
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    mounted() {
        this.form.mobileNo = this.currentUser.mobileNo
    },
    methods: {
        // 点击取消按钮，关闭对话框
        closeDialog() {
            this.$emit('closeDialog')
        },
        // 对话框关闭时触发，清空表单数据，重置验证码按钮和计时器
        clearDialog() {
            this.$refs.form.resetFields()
            this.passError = '' // 重置
            // this.getCodeBtn = true
            this.countDown = 60
            // 清空计时器
            if (this.countDownInterval) {
                window.clearInterval(this.countDownInterval)
                this.countDownInterval = null
            }
        },
        // 获取图形验证码
        getImgCodeFunc() {
            getImgCode().then(res => {
                if (res.code === 200) {
                    this.verifyImgUrl = res.data.imgBase64
                    this.verifyCodeId = res.data.imgId
                }
            })
        },
        // 校验图形验证码，并获取短信验证码
        checkImageCode() {
            let isVerifyCode = true
            this.$refs.form.validateField('verifyCode', error => {
                if (error) {
                    this.$message.warning({ message: '请输入正确的图形验证码' })
                    isVerifyCode = false
                }
            })
            if (isVerifyCode) {
                checkImgCode({
                    verifyCodeId: this.verifyCodeId,
                    verifyCode: this.form.verifyCode
                }).then(res => {
                    if (res.code === 200) {
                        // 获取短信验证码
                        sendSmsCode({ mobileNo: this.form.mobileNo }).then(res => {
                            if (res.code === 200) {
                                this.$message.success('手机验证码已发送')
                                // 开始倒计时
                                this.resetTime()
                            } else {
                                // 刷新图形验证码
                                this.getImgCodeFunc()
                                this.$message.error(res.message || '获取手机验证码异常')
                            }
                        })
                    } else {
                        this.$message.error(res.message || '图形验证码错误，请重新输入')
                        this.getImgCodeFunc()
                    }
                })
            }
        },
        // 手机验证码倒计时60s
        resetTime() {
            if (this.timer) this.timer = null
            this.timer = setInterval(() => {
                if (this.smsTime > 1) {
                    this.smsTime -= 1
                } else {
                    clearInterval(this.timer)
                    this.smsTime = 60
                    this.smsText = '重新发送验证码'
                    this.timer = null
                }
            }, 1000)
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    resetPassword({
                        mobileNo: this.form.mobileNo,
                        password: Base64.encode(this.form.password),
                        smsVerCode: this.form.smsVerCode
                    }).then(res => {
                        if (res.code === 200) {
                            // 登出重新登陆
                            this.$store.dispatch('LogOut').then(() => {
                                location.reload()
                            })
                        } else {
                            this.$message.error(res.message || '重置密码失败')
                        }
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss">
.change-pwd {
    // 对话框样式调整
    .el-dialog {
        border-radius: 8px;
    }
    .el-dialog__title {
        padding-left: 33px; // 53 - 20
        font-size: 20px;
        line-height: 34px;
        color: #59676f;
    }
    .el-dialog__body {
        padding: 0 54px 0 53px;
    }
    // 表单样式调整
    .el-form-item {
        margin-bottom: 0;
    }
    .el-form-item__label {
        font-size: 14px;
        color: #59676f;
        line-height: 40px;
        padding: 0;
    }
    // 校验信息样式：居右、文字大小
    .el-form-item__error {
        right: 0;
        text-align: right;
        font-size: 14px;
    }
    .footer {
        margin-top: 40px;
        padding-bottom: 34px;
        button {
            width: 135px;
        }
        .el-button + .el-button {
            margin-left: 40px;
        }
    }
    .forget-imgUrl {
        position: absolute;
        line-height: 10px;
        top: 5px;
        right: 5px;
        background: -webkit-linear-gradient(180deg, #d8d8d8, #eeeeee);
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
    // .el-form :nth-last-child(1) {
    //   margin: 20px 0;
    // }
}
</style>
