<template>
  <div class="riskInfo">
    <div class="titleCont">
      <div class="title">担保人</div>
      <DescriptionList :content="self" class="m-l-20">
        <Description label="征信授权模式">
          {{ self.creditAuthType }}
          <tag v-if="self.creditAuth === 'Y'">已签署</tag>
          <tag v-else-if="self.creditAuth === 'N'" type="warning">签署失败</tag>
          <tag v-else-if="self.creditAuth === null" type="info">未签署</tag>
        </Description>
        <Description label="风险等级">{{ self.riskLevel }}</Description>
        <Description label="风险评分">{{ self.riskScore }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont" v-if="Object.keys(spouse).length">
      <div class="title" >担保人配偶</div>
      <DescriptionList :content="spouse" class="m-l-20">
        <Description label="姓名"> {{spouse.name}} </Description>
        <Description label="身份证号"> {{spouse.idNo}} </Description>
        <Description label="手机号码"> {{spouse.mobile}}</Description>
        <Description label="征信授权模式">
          {{ spouse.creditAuthType$FICDictName }}
          <tag v-if="spouse.creditAuthPass === 'Y'">已签署</tag>
          <tag v-else-if="spouse.creditAuthPass === 'N'" type="warning">签署失败</tag>
          <tag v-else-if="spouse.creditAuthPass === null || spouse.creditAuthPass === ''" type="info">未签署</tag>
        </Description>
        <Description label="风险等级">{{ spouse.riskLevel }}</Description>
        <Description label="风险评分">{{ spouse.riskScore }}</Description>
      </DescriptionList>
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
      default () {
        return {
          creditAuthType: '',
          creditAuth: '',
          riskLevel: '',
          riskScore: ''
        }
      }
    },
    spouse: {
      type: Object,
      default () {
        return {
          name: '--',
          idNo: '--',
          mobile: '--',
          riskLevel: '--',
          riskScore: '--',
          creditAuthPass: '--'
        }
      }
    }
  },
  data() {
    return {}
  },
  watch: { },
  created() {},
  mounted() {},
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
