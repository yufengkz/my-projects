<template>
  <div class="app-container">
    <v-form title="业务风险预判" tips>
      <template slot="content">
        <el-divider></el-divider>
        <span class="all-subtitle">担保人</span>
        <DescriptionList class="m-l-20 p-t-20" :content="personInfoDetail">
          <Description label="征信授权模式">
            {{personInfoDetail.creditAuthType === 'outline' ? '线下签署' : '线上签署'}}
            <tag v-if="personInfoDetail.creditAuth === 'Y'">已签署</tag>
            <tag v-else-if="personInfoDetail.creditAuth === 'N'" type="warning">签署失败</tag>
            <tag v-else-if="personInfoDetail.creditAuth === null" type="info">未签署</tag>
          </Description>
          <Description label="风险等级">{{personInfoDetail.riskLevel}}</Description>
          <Description label="风险评分">{{personInfoDetail.riskScore}}</Description>
        </DescriptionList>
        <template v-if="personInfoDetail.spouse">
          <el-divider></el-divider>
          <span class="all-subtitle">担保人配偶</span>
          <DescriptionList class="m-l-20 p-t-20" :content="personInfoDetail.spouse"  >
            <Description label="征信授权模式">
              {{personInfoDetail.spouse.creditAuthType === 'outline' ? '线下签署' : '线上签署'}}
              <tag v-if="personInfoDetail.spouse.creditAuthPass === 'Y'">已签署</tag>
              <tag v-else-if="personInfoDetail.spouse.creditAuthPass === 'N'" type="warning">签署失败</tag>
              <tag v-else-if="personInfoDetail.spouse.creditAuthPass === null" type="info">未签署</tag>
            </Description>
          <Description label="风险等级">{{personInfoDetail.spouse.riskLevel}}</Description>
          <Description label="风险评分">{{personInfoDetail.spouse.riskScore}}</Description>
        </DescriptionList>
        </template>
      </template>
    </v-form>
    <div class="text-right">
      <el-button v-if="btnFlag" @click="submitStep1" type="text" class="wide-button" size="mini">修改并重新风险预判</el-button>
    </div>
    <el-divider></el-divider>
    <el-row class="p-b-30 text-right">
      <el-col :span="12">
        <el-button v-if="btnFlag" @click="submitStep2" type="primary" class="wide-button" size="mini">完善担保人信息</el-button>
        <el-button v-else @click="submitStep1" type="primary" class="wide-button" size="mini">修改并重新风险预判</el-button>
      </el-col>
      <el-col :span="12">
        <el-button style='textAlign:center' type="text" class="wide-button" size="mini" @click="submitStep2" >跳过，去完善信息</el-button>
      </el-col>
    </el-row>
    <el-footer class="el_footer">【温馨提示】在提交贷款审批前，必须完成征信查询授权签署和风险试算，如有特殊情况，可先行跳过进行信息完善。</el-footer>
  </div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'
import VForm from '@/components/VForm'
export default {
  name: 'component_name',
  components: {
    DescriptionList,
    VForm
  },
  props: {
    personInfoDetail: Object,
    btnFlag: Boolean
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    submitStep1() {
      this.$emit('stepDetailChild1', 0)
    },
    submitStep2() {
      this.$emit('stepDetailChild2', 1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
