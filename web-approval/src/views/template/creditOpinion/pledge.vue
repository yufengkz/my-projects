<template>
    <div>
      <!-- 应收账款 -->
      <template v-if="data.twoLevelType === 'receivable_account' || data.twoLevelType === 'receivable_rent'">
        {{ data.twoLevelType$FICDictName }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        应收金额：{{ data.receivableAmount }}万元，
        约定期限：{{ timeFun(data.accountStart) }}-{{ timeFun(data.accountEnd) }}，
        甲方名称：{{ data.firstPartyName }}，
        乙方名称：{{ data.secondPartyName }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
      <!-- 法人股权 -->
      <template v-if="data.twoLevelType === 'legal_right'">
        {{ data.twoLevelType$FICDictName }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        企业注册资本金：{{ data.registerCapital }}万元，
        企业资产总额：{{ data.totalAssets }}万元，
        权属人股权占比：{{ data.proportion }}%，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
    </div>
</template>

<script>
export default {
  name: 'pledge',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    timeFun(v) {
      const val = v.split(' ')[0].split('-')
      return `${val[0]}年${val[1]}月${val[2]}日`
    }
  }
}
</script>

<style scoped>

</style>
