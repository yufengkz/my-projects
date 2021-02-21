<template>
    <div>
      <!-- 房产 -->
      <template v-if="data.twoLevelType === 'house' || data.twoLevelType === 'build_land' || data.twoLevelType === 'countryside_land'">
        {{ data.oneLevelType$FICDictName }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}{{ data.fourLevelType$FICDictName ? '_' + data.fourLevelType$FICDictName : '' }}{{ data.fourLevelTypeOther ? '_' + data.fourLevelTypeOther : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        地址：{{ data.addressName }}{{ data.detailAddress }}，
        面积{{ data.area }}㎡，
        权证编号：{{ data.warrantNo ? data.warrantNo : '--' }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
      <!-- 专用设备 -->
      <template v-if="data.twoLevelType === 'special_machine'">
        {{ data.oneLevelType$FICDictName }}{{ data.twoLevelType$FICDictName ? '_' + data.twoLevelType$FICDictName : '' }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        权证编号：{{ data.warrantNo ? data.warrantNo : '--' }}，
        购买时间：{{ timeFun(data.buyTime) }}，
        购买价格：{{ data.buyPrice }}万元，
        设备所在地：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
      <!-- 农副产品 -->
      <template v-if="data.twoLevelType === 'agriculture_product'">
        {{ data.oneLevelType$FICDictName }}{{ data.twoLevelType$FICDictName ? '_' + data.twoLevelType$FICDictName : '' }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}{{ data.fourLevelTypeOther ? '_' + data.fourLevelTypeOther : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        他项权利证书编号：{{ data.otherCertificateNo ? data.otherCertificateNo : '--' }}，
        数量：{{ data.number }}公斤，
        品质：{{ data.quality$FICDictName }}，
        单价：{{ data.unitPrice }}元/公斤，
        存储地址：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
      <!-- 机器设备 -->
      <template v-if="data.twoLevelType === 'equipment'">
        {{ data.oneLevelType$FICDictName }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}{{ data.fourLevelType$FICDictName ? '_' + data.fourLevelType$FICDictName : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        发动机编号：{{ data.warrantNo }} ，
        购买时间：{{ timeFun(data.buyTime) }}，
        购买价格：{{ data.buyPrice }}万元，
        设备所在地：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}；
      </template>
      <!-- 生物资产 -->
      <template v-if="data.twoLevelType === 'breed'">
        {{ data.oneLevelType$FICDictName }}{{ data.twoLevelType$FICDictName ? '_' + data.twoLevelType$FICDictName : '' }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        数量：{{ data.number }}头，
        品质：{{ data.quality$FICDictName }}，
        <!--单价：{{ data.unitPrice }}元/头，-->
        养殖地址：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}，
        他项权利证书编号：{{ data.otherCertificateNo ? data.otherCertificateNo : '--' }}；
      </template>
      <!-- 农村土地承包经营权 -->
      <template v-if="data.twoLevelType === 'land_contract'">
        {{ data.oneLevelType$FICDictName }}{{ data.twoLevelType$FICDictName ? '_' + data.twoLevelType$FICDictName : '' }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        面积：{{ data.area }}亩，
        承包期限：{{ timeFun(data.contractingStart) }}-{{ timeFun(data.contractingEnd) }}，
        地址：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}，
        他项权利证书编号：{{ data.otherCertificateNo ? data.otherCertificateNo : '--' }}；
      </template>
      <!-- 林权 -->
      <template v-if="data.twoLevelType === 'forestry'">
        {{ data.oneLevelType$FICDictName }}{{ data.twoLevelType$FICDictName ? '_' + data.twoLevelType$FICDictName : '' }}{{ data.threeLevelType$FICDictName ? '_' + data.threeLevelType$FICDictName : '' }}，
        权属：{{ data.ownerRole$FICDictName }}_{{ data.ownerName }}，
        面积：{{ data.area }}亩，
        树种：{{ data.treeSpecies }}，
        承包期限：{{ timeFun(data.contractingStart) }}-{{ timeFun(data.contractingEnd) }}，
        地址：{{ data.addressName }}{{ data.detailAddress }}，
        认定价值：{{ data.identifyValue }}万元，
        价值认定机构：{{ data.identifyOrgan }}，
        他项权利证书编号：{{ data.otherCertificateNo ? data.otherCertificateNo : '--' }}；
      </template>
    </div>
</template>

<script>
export default {
  name: 'mortgage',
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
