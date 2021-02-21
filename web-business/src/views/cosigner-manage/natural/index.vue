/* 自然担保人页面 */
<template>
  <div class="commonHeader">
    <el-row>
      <el-col :span="24">
        <div class="indexTop">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
            <el-tab-pane label="待办" name="first">
              <BacklogList v-if="activeName === 'first'"></BacklogList>
            </el-tab-pane>
            <el-tab-pane label="已办" name="second">
              <UnderwayList v-if="activeName === 'second'"></UnderwayList>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="third">
              <FinishedList v-if="activeName === 'third'"></FinishedList>
            </el-tab-pane>
            <!-- <el-tab-pane label="全部" name="fourth">
              <AllList></AllList>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </el-col>
      <div class="indexBottom">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加担保人申请</el-button>
      </div>
    </el-row>
    <el-dialog
      title="新增自然人担保申请"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      width="480"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="applyForm"
        :model="applyForm"
        :rules="applyFormRules"
        size="mini"
        class="m-t-20 p-l-10 block-el-select"
        label-position="right"
        label-width="140px"
      >
        <el-row :gutter="20">
          <el-col>
            <el-form-item prop="name" label="姓名:" label-width="120px">
              <el-input v-model="applyForm.name" placeholder="请录入" maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="idNo" label="身份证号:" label-width="120px" >
              <el-input v-model="applyForm.idNo" placeholder="请录入" maxlength="18"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="mobile" label="手机号:" label-width="120px" >
              <el-input v-model="applyForm.mobile" placeholder="请录入" maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="marriage" label="婚姻状况:" label-width="120px">
              <el-select v-model="applyForm.marriage" placeholder="请选择" clearable>
                <el-option v-for="(item,key) in this.guanranteeEnum.marriageTypeEnum" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col>
            <el-form-item prop="mapId" label="MAP中心:" label-width="120px">
              <div>
              <el-select v-model="applyForm.mapId" placeholder="请选择" clearable>
                <el-option v-for="item in RoleMapList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" class="wide-button" @click="handleCreate">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import BacklogList from './components/BacklogList'
import FinishedList from './components/FinishedList'
import UnderwayList from './components/UnderwayList'
// import AllList from './components/AllList'
import { applyCreate } from '@/api/cosigner-manage'
import { mapGetters } from 'vuex'
const mobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/ // 手机号验证
const idCard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/ // 身份证号验证
// const length = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/ // 字符长度最少为2 最多为8
const length = /^[^ ]{2,20}$/

export default {
  name: 'CosignerManageNatural',
  components: {
    BacklogList,
    FinishedList,
    UnderwayList
  },
  computed: {
    ...mapGetters(['commonEnum', 'guanranteeEnum', 'currentUser', 'MAPList', 'RoleMapList'])
  },
  data() {
    return {
      dialogFormVisible: false,
      activeName: 'first',
      applyForm: {
        name: '',
        idNo: '',
        mobile: '',
        marriage: '',
        mapId: ''
      },
      applyFormRules: {
        name: [{ required: true, message: '请录入姓名', trigger: 'blur' }, { pattern: length, message: '请输入正确的姓名', trigger: 'blur' }],
        idNo: [{ required: true, message: '请录入身份证', trigger: 'blur' }, { pattern: idCard, message: '请输入正确的身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请录入手机号', trigger: 'blur' }, { pattern: mobile, message: '请输入正确的手机号', trigger: 'blur' }],
        marriage: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
        mapId: [{ required: true, message: '请选择Map中心', trigger: 'change' }]
      },
      mapCenterOptions: [{
        type: 'mapId',
        typeDesc: 'MAP中心',
        code: '8',
        value: '河北沧州泊头MAP中心'
      }]
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    handleClick(tab, event) { },
    handiecor() {},
    handleCreate() {
      this.$refs.applyForm.validate(valid => {
        if (valid) {
          applyCreate(this.applyForm).then(res => {
            if (res.status === 200) {
              this.$message.success(res.message || '创建成功')
              this.$router.push({ path: '/cosigner-manage/natural/add', query: { applyNo: res.data } })
            } else {
              this.$message.error(res.message || '失败了')
            }
          })
        }
      })
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
</style>
