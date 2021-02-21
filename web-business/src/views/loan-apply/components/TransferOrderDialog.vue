<template>
  <div>
    <el-button
      type="primary"
      class="wide-button"
      size="mini"
      v-show="changeMapStatus !== '0' && changeMapStatus !== '2'"
      @click="handleOpenDialog"
    >申请转单</el-button>
    <el-button type="primary" class="wide-button" size="mini" v-show="changeMapStatus === '0'" disabled>转单审批中···</el-button>
    <el-button
      type="primary"
      class="wide-button"
      size="mini"
      v-show="changeMapStatus === '2'"
      @click="handleFail"
    >转单审批失败</el-button>
    <el-dialog
      :title="changeMapStatus === '2'?'转单审批失败':'申请转单'"
      :center="true"
      :close-on-press-escape="true"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        v-show="changeMapStatus !== '0' && changeMapStatus !== '2'"
        ref="Form"
        :model="Form"
        :rules="FormRules"
        label-width="130px"
        size="mini"
      >
        <el-form-item label="选择接收MAP中心" prop="mapId">
          <el-select clearable v-model="Form.mapId" placeholder="请选择">
            <el-option v-for="(item,index) in mapList" :key="index" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转单原因" prop="cause">
          <el-input type="textarea" v-model="Form.cause" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
      <el-row v-show="changeMapStatus === '2'">
        <el-col>
          <DescriptionList :col="24">
            <Description label="审批时间">{{rejectReasonInfo.updateTime}}</Description>
            <Description label="拒绝原因">{{rejectReasonInfo.orderChangeCauseNo}}</Description>
          </DescriptionList>
        </el-col>
        <el-col></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { querycMapInfoList, getMapCreditApplyInfo } from '@/api/loan-apply'
export default {
  components: {
    DescriptionList: () => import('@/components/DescriptionList')
  },
  data() {
    return {
      Form: {
        mapId: '',
        cause: ''
      },
      FormRules: {
        mapId: [{ required: true, message: '请选择', trigger: 'change' }],
        cause: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      mapList: '',
      changeMapStatus: '',
      rejectReasonInfo: '',
      dialogVisible: false
    }
  },
  props: {
    mapInParameter: {
      type: Object,
      default: () => []
    },
    customerCode: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.getReasonInfo()
  },
  methods: {
    handleOpenDialog() {
      querycMapInfoList(this.mapInParameter).then(res => {
        if (res.status === 200) {
          this.dialogVisible = true
          this.mapList = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    getReasonInfo() {
      if (this.customerCode.changeMapFlowNo !== null) {
        getMapCreditApplyInfo(this.customerCode).then(res => {
          if (res.status === 200) {
            this.rejectReasonInfo = res.data
            this.changeMapStatus = res.data.result
          }
        })
      }
    },
    handleClose(done) {
      done()
      this.Form = {
        mapId: '',
        cause: ''
      }
    },
    handleFail() {
      this.dialogVisible = true
    },
    handleSubmit() {
      this.$refs.Form.validate(valid => {
        if (valid) {
          this.$emit('TransferOrderSubmit', this.Form)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style>
</style>
