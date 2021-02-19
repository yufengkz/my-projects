/** * 查询条件组件 */
<template>
  <div class="formSearch">
    <div class="table-header" v-if="tableSearch && tableSearch.length > 0">
      <el-form
        :rules="rules"
        :model="formSearch"
        :inline="true"
        ref="formSearch"
        label-position="right"
        v-bind="{ 'label-width': '30%', ...(options && options.formProps) }"
        size="mini"
      >
        <el-row :gutter="40">
          <template v-for="(item, index) in tableSearch">
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6" :key="item.label">
              <!--区间类型的表单，需给予两个value名称-->
              <el-form-item
                v-if="item.apply === 'section'"
                class="table-header-item"
                :label="item.label"
                :prop="item.value"
                :key="index"
                v-bind="item.labelProps"
              >
                <!--  申请额度范围 最低 -->
                <el-row>
                  <el-col :span="11">
                    <el-input
                      class="halfWidth"
                      clearable
                      v-bind="item.props"
                      :type="item.inputType || 'text'"
                      v-model="formSearch[item.valueLow]"
                      :maxlength="item.maxlength"
                      @keyup.enter.native="handleSearch"
                      :oninput="handleChangeInput(item)"
                    >
                      <template slot="append" v-if="item.units">{{ item.units }}</template>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="text-align:center;">
                    <span>~</span>
                  </el-col>
                  <el-col :span="11">
                    <!--  申请额度范围 最高  -->
                    <el-input
                      class="halfWidth"
                      clearable
                      v-bind="item.props"
                      :type="item.inputType || 'text'"
                      v-model="formSearch[item.valueHeight]"
                      :maxlength="item.maxlength"
                      @keyup.enter.native="handleSearch"
                      :oninput="handleChangeInput(item)"
                    >
                      <template slot="append" v-if="item.units">{{ item.units }}</template>
                    </el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item v-else class="table-header-item" :label="item.label" :prop="item.value" :key="index" v-bind="item.labelProps">
                <!-- 下拉 -->
                <el-select
                  clearable
                  v-bind="item.props"
                  v-if="item.type === 'select'"
                  v-model="formSearch[item.value]"
                  :placeholder="`请选择${item.placeholder || item.label}`"
                >
                  <el-option v-for="(option, index) in item.children" :key="index" :value="option.value" :label="option.label" />
                  <!-- v-for="option in commonEnum.creditStatusOptions"
                  :key="option.value"-->
                </el-select>
                <!-- 级联 -->
                <el-date-picker
                  clearable
                  style="width: 100%;"
                  placeholder="选择日期"
                  v-bind="item.props || { type: 'date' }"
                  v-else-if="item.type === 'picker'"
                  v-model="formSearch[item.value]"
                />
                <!-- 时间范围 -->
                <el-date-picker
                  clearable
                  style="width: 100%;"
                  placeholder="选择日期"
                  v-bind="item.props || { type: 'daterange' }"
                  v-else-if="item.type === 'daterange'"
                  v-model="formSearch[item.value]"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                />
                <!-- 级联选择器 -->
                <el-cascader v-else-if="item.type === 'cascader'" v-model="formSearch[item.value]" :options="item.options"></el-cascader>
                <!--数字 -->
                <el-input
                  v-if="item.inputType === 'number'"
                  clearable
                  v-bind="item.props"
                  v-model="formSearch[item.value]"
                  :placeholder="`请输入${item.placeholder || item.label}`"
                  :maxlength="item.maxlength"
                  @keyup.enter.native="handleSearch"
                  :oninput="handleChangeInput(item)"
                />
                <!--文本-->
                <el-input
                  v-if="item.type === 'text'"
                  clearable
                  v-bind="item.props"
                  v-model="formSearch[item.value]"
                  :placeholder="`请输入${item.placeholder || item.label}`"
                  :maxlength="item.maxlength"
                  @keyup.enter.native="handleSearch"
                  :oninput="handleChangeInput(item)"
                />
              </el-form-item>
            </el-col>
          </template>
          <el-col :xs="w" :sm="w" :md="w" :lg="w" :xl="w" class="table-item-btns-box">
            <el-form-item>
              <el-button type="primary" _icon="el-icon-search" @click="handleSearch" class="wide-button lvsige">
                查询
              </el-button>
              <el-button plain _icon="el-icon-refresh-right" @click="handleReset('formSearch')" class="wide-button">
                重置
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { convertParams } from '@/utils/tool'
// import { mapGetters } from 'vuex'
export default {
  name: 'FormSearch',
  props: {
    // 搜索栏数据
    tableSearch: {
      type: Array
    },
    rules: {
      type: Object
    },
    value: {
      type: Object
    },
    reset: {
      type: Boolean
    },
    rulesLength: {
      type: Boolean
    },
    options: Object
  },
  data() {
    return {
      formSearch: {
        ...this.value
      },
      w: 0
    }
  },
  mounted() {
    // :xs="24" :sm="12" :md="12" :lg="8" :xl="6"
    //   768     1200       1200            1920
    // const arr = ['xs', 'sm', 'md', 'lg', 'xl']
    const s = document.body.clientWidth
    let n = 3
    if (s < 768) {
      n = 1
    } else if (s > 768 && s < 1200) {
      n = 2
    } else if (s > 1200 && s < 1912) {
      n = 3
    } else if (s >= 1912) {
      n = 4
    }

    const r = this.tableSearch.length % n
    if (n === 1) {
      this.w = 24
    } else if (n === 2) {
      if (r === 0) this.w = 24
      if (r === 1) this.w = 12
    } else if (n === 3) {
      if (r === 0) this.w = 24
      if (r === 1) this.w = 16
      if (r === 2) this.w = 8
    } else if (n === 4) {
      if (r === 0) this.w = 24
      if (r === 1) this.w = 18
      if (r === 2) this.w = 12
      if (r === 3) this.w = 6
    }
  },
  watch: {
    value(val) {
      console.log('watch val', val)
      if (val) return (this.formSearch = { ...this.value })
    }
  },
  methods: {
    // 搜索查询按钮
    handleSearch() {
      // console.log('查询')
      if (this.rules) {
        return this.$refs['formSearch'].validate(valid => {
          if (!valid) return false
          this.$emit('handleSearch', convertParams(Object.assign({}, this.formSearch)))
        })
      }
      this.$emit('handleSearch', convertParams(Object.assign({}, this.formSearch)))
    },
    // 搜索重置按钮
    handleReset(formName) {
      this.$refs[formName].resetFields()
      // this.$refs.cascader.clearCheckedNodes()
      this.formSearch = this.reset ? { ...this.value } : {}
      // 重置: 项目中选择时间 必须手动清除
      // this.formSearch = {
      //   updatedTime: [],
      //   updateTime: [],
      //   createTime: [],
      //   applyTime: [],
      //   doneTime: []
      // }
      // 范围项无法一起清空，需要手动处理
      Object.assign(this.formSearch, {})
      this.$emit('handleReset')
      if (this.reset) return false
      this.handleSearch()
    },
    // input为number校验
    handleChangeInput(item) {
      return item.inputType === 'number' ? this.handleOnInput(this.formSearch[item.value], item.value, item.rulesLength) : null
    },
    // input渲染长度校验
    handleOnInput(val, label, rulesLength) {
      if (val && Number(val) <= 0) {
        this.formSearch[label] = 0
      }
      if (rulesLength && val && val.length > 11) {
        this.formSearch[label] = this.formSearch[label].slice(0, 11)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.lvsige {
  margin-left: -65% !important;
}
/deep/.halfWidth {
  width: 100% !important;
}
.table-header {
  padding-top: 10px;
  /deep/ .el-form-item {
    display: flex;
    margin-bottom: 12px;
    .el-form-item__content {
      width: 70%;
      // min-width: 200px;
      .el-cascader {
        width: 100%;
      }
    }
    .el-select {
      width: 100%;
    }
    .el-form-item__label {
      font-size: 12px;
      min-width: 120px;
    }
  }
  .table-item-btns-box {
    text-align: right;
    /deep/ .el-form-item__content {
      width: 100%;
      // min-width: 200px;
      text-align: right;
    }
  }
  /deep/.el-input--suffix .el-input__inner {
    padding-right: 0;
  }
  /deep/ .el-form-item__content {
    height: 28px;
  }
  /deep/ .el-range-separator {
    width: 20px;
  }
}
</style>
