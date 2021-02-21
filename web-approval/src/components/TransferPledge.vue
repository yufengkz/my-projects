<template>
  <div class="app-container">
    <el-transfer
      v-model="tranValue"
      :data="trandData"
      style="text-align: left; display: inline-block"
      :titles="[title[0], title[1]]"
      @change="handleChange"
    >
      <div class="text-right" slot="right-footer" style="padding:4px 10px;">
        <el-button
          type="primary"
          class="transfer-footer wide-button footer-btn"
          icon="el-icon-plus"
          size="small"
          @click="addNewInfo()"
        >新增质押信息</el-button>
      </div>
      <template slot-scope="scope">
        <el-row v-for="(item,index) in scope" :key="index" class="p_father">
          <div v-if="item.twoLevelType === 'legal_right'">
            <el-col class="p_son">
              <el-col
                class="p_b"
                style="color:#333;"
              >{{guanranteeEnum.twoTypePledgeTypeEnum[item.twoLevelType]}}</el-col>
              <el-col class="p_b" style="color:#bcbcbc;">资产总额及占比:{{item.totalAssets}}万元，{{item.proportion}}%</el-col>
              <el-col class="p_b" style="color:#bcbcbc;">认定价值:{{item.identifyValue}}</el-col>
            </el-col>
            <el-col>
              <el-row class="rows">
                <el-col :span="12" style="color:#333;">权属：{{item.ownerRole$FICDictName}}</el-col>
                <el-col :span="12" class="text-right">
                  <el-button
                    class="wide-button"
                    type="success"
                    size="mini"
                    style="background-color: #e6f7ec;color: #08b347;border:none;"
                    @click="infoDetails(item)"
                    round
                  >查看详情</el-button>
                </el-col>
              </el-row>
            </el-col>
          </div>
          <div v-else>
            <el-col class="p_son">
              <el-col
                class="p_b"
                style="color:#333;"
              >{{guanranteeEnum.twoTypePledgeTypeEnum[item.twoLevelType]}}</el-col>
              <el-col class="p_b" style="color:#bcbcbc;">约定账期:{{item.createTime}}{{item.detailAddress}}</el-col>
              <el-col class="p_b" style="color:#bcbcbc;">认定价值:{{item.identifyValue}}</el-col>
            </el-col>
            <el-col>
              <el-row class="rows">
                <el-col :span="12" style="color:#333;">权属：{{item.ownerRole$FICDictName}}</el-col>
                <el-col :span="12" class="text-right">
                  <el-button
                    class="wide-button"
                    type="success"
                    size="mini"
                    style="background-color: #e6f7ec;color: #08b347;border:none;"
                    @click="infoDetails(item)"
                    round
                  >查看详情</el-button>
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-row>
      </template>
    </el-transfer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  props: {
    TranData: {
      type: Array,
      default: null
    },
    checkTranData: {
      type: Array,
      default: null
    },

    title: {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapGetters(['guanranteeEnum']),
    trandData() {
      // var arr1 = []
      return this.TranData
    }

  },

  data() {
    return {
      tranValue: this.checkTranData
    }
  },
  watch: {
    checkTranData(newVal, oldVal) {
      this.tranValue = newVal
    }
  },

  updated() {
    // 调试专用 上线前删除 gyw
    console.log('checkTranData', this.checkTranData[0])
    console.log(this.trandData.length)
  },
  methods: {
    addNewInfo() {
      this.$emit('addNewInfo')
    },
    infoDetails(item) {
      this.$emit('infoDetails', item)
    },
    handleChange(val) {
      this.$emit('transferChange', val)
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.el-transfer-panel {
  width: 360px !important;
}
/deep/.el-transfer-panel__list {
  // height:206px !important;
  padding: 6px 0 29px 0px;
}
/deep/ .el-transfer-panel__item.el-checkbox,
.el-checkbox__label {
  overflow: auto !important;
  display: flex;
  line-height: none;
  padding-right: 5px;
}
/deep/ .el-checkbox,
.el-transfer-panel__item {
  width: 100%;
  height: 150px;
}
.p_father {
  background: #fbfbfb;
  border: 1px #dcdfe6 dashed;
}
.p_b {
  width: 100%;
  margin: 0;
  padding: 0;
}
/deep/ .el-checkbox__label {
  display: inline-block;
}
.p_son {
  padding-top: 8px;
  padding-left: 5px;
}
.rows {
  border-top: 1px #dcdfe6 dashed;
  padding: 5px;
}
.text-right {
  text-align: right !important;
}
.footer-btn {
  background-color: #e6f7ec;
  border: 1px dashed #08b347;
  color: #08b347;
}
</style>
