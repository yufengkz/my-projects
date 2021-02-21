/* 风险信息提示组件 */
<template>
  <div class="riskInfo">
    <div class="titleCont">
      <div class="title">借款人</div>
      <DescriptionList :content="self" class="m-l-20">
        <Description label="征信授权模式">{{ self.authPattern$FICDictName }}</Description>
        <Description label="风险等级">{{ self.riskGrade }}</Description>
        <Description label="风险评分">{{ self.riskScore }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">共借人授权</div>
      <DescriptionList :content="common" class="m-l-20">
        <Description label="姓名">{{ common.customerName }}</Description>
        <Description label="身份证号">{{ common.idCardNo }}</Description>
        <Description label="手机号码">{{ common.mobile }}</Description>
        <Description label="征信授权模式">{{ common.authPattern$FICDictName }}</Description>
        <Description label="风险等级">{{ common.riskGrade }}</Description>
        <Description label="风险评分">{{ common.riskScore }}</Description>
        <Description label="与借款人关系">{{ common.relation$FICDictName }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div v-if="guarantee" class="title">担保人授权</div>
      <div v-for="(item, index) in guarantee" :key="item.mobile">
        <div class="guarantee">担保人{{ index ? '二' : '一' }} <span class="relationText">与借款人关系：</span> {{item.relation$FICDictName}}</div>
        <DescriptionList :content="item" class="m-l-20">
          <Description label="姓名">{{ item.customerName }}</Description>
          <Description label="身份证号">{{ item.idCardNo }}</Description>
          <Description label="手机号码">{{ item.mobile }}</Description>
          <Description label="征信授权模式">{{ item.authPattern$FICDictName }}</Description>
          <Description label="风险等级">{{ item.riskGrade }}</Description>
          <Description label="风险评分">{{ item.riskScore }}</Description>
        </DescriptionList>
        <div v-if="item.guaranteeSpouseOutVo" class="guarantee">担保人{{ index ? '二' : '一' }}配偶 </div>
        <DescriptionList v-if="item.guaranteeSpouseOutVo" :content="item.guaranteeSpouseOutVo" class="m-l-20">
          <Description label="姓名">{{ item.guaranteeSpouseOutVo.customerName }}</Description>
          <Description label="身份证号">{{ item.guaranteeSpouseOutVo.idCardNo }}</Description>
          <Description label="手机号码">{{ item.guaranteeSpouseOutVo.mobile }}</Description>
          <Description label="征信授权模式">{{ item.guaranteeSpouseOutVo.authPattern$FICDictName }}</Description>
          <Description label="风险等级">{{ item.guaranteeSpouseOutVo.riskGrade }}</Description>
          <Description label="风险评分">{{ item.guaranteeSpouseOutVo.riskScore }}</Description>
        </DescriptionList>
      </div>
    </div>
  </div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'

export default {
  name: 'RiskInfo',
  components: {
    DescriptionList
  },
  props: {
    self: {
      type: Object,
      default() {
        return {
          authPattern: '',
          authorizeTime: '',
          riskGrade: '',
          riskScore: ''
        }
      }
    },
    common: {
      type: Object,
      default() {
        return {
          relation: '',
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: '',
          riskGrade: '',
          riskScore: ''
        }
      }
    },
    guarantee: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  watch: {
  },
  created() {},
  mounted() {
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.riskInfo {
  .tabsLarge {
    position: relative;
    padding-left: 15px;
    color: #5a5a5a;
  }
  .titleCont {
    .title {
      font-size: 14px;
      padding-left: 6px;
      line-height: 14px;
      border-left: 3px solid #08b448;
      color: #08b448;
      font-weight: 600;
      margin: 10px 0 15px;
    }
    .guarantee {
      color: #323030;
      font-size: 12px;
      line-height: 22px;
      padding-bottom: 16px;
      margin-right: 8px;
      white-space: nowrap;
      display: table-cell;
    }
    .relationText {
      color: #666666;
      margin-left: 10px;
    }
  }
}
</style>
