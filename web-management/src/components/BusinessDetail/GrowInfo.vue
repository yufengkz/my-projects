<template>
  <div>
    <!-- 种植作物信息：可能多个 -->
    <div v-for="(item, index) in plants" :key="item.id">
      <span class="all-title">种植作物{{index+1}}</span>
      <!--<el-divider></el-divider>-->
      <!-- 作物经济类型 -->
      <!-- todo: 详情展示内容修改，注意区分农作粮作 -->
      <div class="m-l-20">
        <span class="all-subtitle p-t-20">作物经济类型：{{ item.cropsType$FICDictName }}</span>
        <DescriptionList :content="item" class="m-t-10 m-l-10">
            <Description label="作物种类">{{item.varietyType$FICDictName}}</Description>
            <Description label="种植经验">{{item.experience$FICDictName}}</Description>
            <Description v-if="item.cropsType === '4'" label="种子供应方式">{{item.seedSupplyMode$FICDictName}}</Description>
            <Description label="上年度种植面积">{{item.lastYearPlantarea ? item.lastYearPlantarea + '亩' : '--'}}</Description>
            <Description label="本年度种植面积">{{item.thisYearPlanarea ? item.thisYearPlanarea + '亩' : '--' }}</Description>
            <Description label="上年度亩产量">{{ item.lastYearAvgYield ? item.lastYearAvgYield + '公斤' : '--' }}</Description>
            <Description label="上年度销售均价">{{ item.lastYearSalePrice ? item.lastYearSalePrice + '元/公斤' : '--'}}</Description>
            <Description label="近三年销售均价">{{item.lastThyearAvgPrice ? item.lastThyearAvgPrice + '元/公斤' : '--'}}</Description>
            <Description v-if="item.cropsType === '2'" label="加工方式">{{item.processingModeDes}}</Description>
            <Description label="农产品销售方式">{{item.salesModeOfAgriculturalProducts$FICDictName}}</Description>
            <Description label="预计种植周期">{{(item.cycleStart && item.cycleEnd) ?item.cycleStart + '至' + item.cycleEnd : '--'}}</Description>
            <Description label="种植机械化程度">{{item.mechanizedDegree$FICDictName}}</Description>
            <Description v-if="item.mechanizedDegree !== '3'" label="自有农机">{{item.selfMachine | newOldFilter}}</Description>
            <Description
              v-if="item.selfMachine === 'Y' && item.mechanizedDegree !== '3'"
              label="农机类型"
            >{{item.machineTypeDes}}</Description>
            <Description v-if="item.cropsType === '4'" label="近三年病害情况">{{item.diseaseTypeDes}}</Description>
            <Description v-if="item.cropsType === '2'" label="病害情况">{{item.diseaseTypeDes}}</Description>
            <Description label="是否投农业保险">{{item.insuranceFlag | newOldFilter}}</Description>
          </DescriptionList>
        <div v-if="(item.insuranceFlag === 'Y')" class="tableInsurannceList">
            <span class="all-subtitle">投保信息</span>
            <TableList border :columns="plantInsuranceColumns" :dataSource="item.plantInsuranceList" :options="option" />
          </div>
          <span class="all-subtitle">种植地块</span>
          <div class="tableList">
            <div v-if="businessType === '2'">
            <TableList border :columns="productType2columns" :dataSource="item.plantAreas" :options="option" />
            </div>
            <div v-else>
              <div v-if="item.cropsType === '4'">
                <TableList border :columns="cottonsColumns" :dataSource="item.plantAreas" :options="option" />
              </div>
              <div v-else>
                <TableList border :columns="columns" :dataSource="item.plantAreas" :options="option" />
              </div>
            </div>
          </div>
        <span class="all-subtitle">MAP服务信息</span>
        <DescriptionList :content="item" class="m-t-10 m-l-10">
          <Description label="合作面积">{{ item.plantServiceArea ? item.plantServiceArea + '亩' : '--' }}</Description>
          <Description label="服务价格">{{ item.mapServicePrice ? item.mapServicePrice + '元/亩' : '--' }}</Description>
          <Description label="已缴纳定金">{{ item.payFee ? item.payFee + '元' : '--'}}</Description>
        </DescriptionList>
      </div>
    </div>
    <!-- 近三年种植物信息 -->
    <div>
      <span class="all-title">近三年种植物信息</span>
      <DescriptionList :content="creditApplyPlant" class="m-t-10 m-l-10" :col="24">
        <Description label="近三年种植物是否一致">{{ creditApplyPlant.somePlantFlag | newOldFilter }}</Description>
        <Description v-for="plant in creditApplyPlant.plantCorps" :key="plant.id" :label="plant.year + '年'">{{ (plant.cropsType$FICDictName && plant.cropsSpecies$FICDictName) ? plant.cropsType$FICDictName + '-' + plant.cropsSpecies$FICDictName : '--'}}</Description>
      </DescriptionList>
    </div>
  </div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'
import TableList from '@/components/Tables/TableList'

export default {
  name: 'GrowInfo',
  components: {
    DescriptionList,
    TableList
  },
  props: {
    creditApplyPlant: {
      type: Object
    }
  },
  data() {
    return {
      plants: [], // 种植作物数组对象
      option: {
        index: true
      },
      plantInsuranceColumns: [
        { prop: 'insuranceCompanyDes', label: '保险公司', align: 'center', content: '--' },
        { prop: 'insurancePremium', label: '最高可赔额度(元/亩)', align: 'center' },
        { prop: 'insuranceAmount', label: '保费(元/亩)', align: 'center' }
      ],
      // 农地贷
      productType2columns: [
        { prop: 'plantArea', label: '位置', align: 'center', content: '--' },
        { prop: 'landNatureDes', label: '土地性质', align: 'center', content: '--' },
        { prop: 'ownershipType$FICDictName', label: '种植地权属性质', align: 'center' },
        { prop: 'areaFee', label: '土地流流转费(元/亩/年)', align: 'center', content: '--' },
        { prop: 'landRent', label: '地租缴纳期限', align: 'center', content: '--' },
        {
          prop: 'applyAreaFlag',
          label: '是否申贷地块',
          align: 'center',
          content: '--',
          formatter (row, column, cellValue) {
            if (row.applyAreaFlag === '1') {
              return '是'
            } else {
              return '否'
            }
          }
        },
        { prop: 'waterNatureDes', label: '水源分类', align: 'center', content: '--' },
        { prop: 'waterFee', label: '水费（元/亩）', align: 'center', content: '--' }
      ],
      columns: [
        { prop: 'plantArea', label: '位置', align: 'center', content: '--' },
        { prop: 'landNatureDes', label: '土地性质', align: 'center', content: '--' },
        { prop: 'ownershipType$FICDictName', label: '种植地权属性质', align: 'center' },
        { prop: 'areaFee', label: '土地流流转费(元/亩/年)', align: 'center', content: '--' },
        { prop: 'landRent', label: '地租缴纳期限', align: 'center', content: '--' },
        { prop: 'waterNatureDes', label: '水源分类', align: 'center', content: '--' },
        { prop: 'waterFee', label: '水费（元/亩）', align: 'center', content: '--' }
      ],
      cottonsColumns: [
        { prop: 'plantArea', label: '位置', align: 'center', content: '--' },
        { prop: 'areaEmployer', label: '土地发包方', align: 'center', content: '--' },
        { prop: 'landNatureDes', label: '土地性质', align: 'center', content: '--' },
        { prop: 'ownershipType$FICDictName', label: '种植地权属性质', align: 'center' },
        { prop: 'areaFee', label: '土地流流转费(元/亩/年)', align: 'center', content: '--' },
        { prop: 'landRent', label: '地租缴纳期限', align: 'center', content: '--' },
        { prop: 'waterNatureDes', label: '水源分类', align: 'center', content: '--' },
        { prop: 'waterFee', label: '水费（元/亩）', align: 'center', content: '--' }
      ]
    }
  },
  watch: {
    creditApplyPlant(v) {
      this.plants = v.plants
      this.plants.forEach(item => {
        item.temporary = 'N'
        item.diseaseStatus = ''
        item.machineTypeDes = ''
        if (item.machineType) {
          if (item.machineType.includes('99')) {
            const re = /其他/gi
            item.machineTypeDes = item.machineType$FICDictName.replace(re, item.machineOtherInfo)
          } else {
            item.machineTypeDes = item.machineType$FICDictName
          }
        }

        if (item.disease) {
          if (item.disease.includes('99')) {
            const re1 = /其他/gi
            item.diseaseTypeDes = item.disease$FICDictName.replace(re1, item.diseaseOther)
          } else {
            item.diseaseTypeDes = item.disease$FICDictName
          }
        }

        if (item.cropsType === '2' && item.processingMode) {
          if (item.processingMode.includes('99')) {
            const re2 = /其他/gi
            item.processingModeDes = item.processingMode$FICDictName.replace(re2, item.processingModeOtherInfo)
          } else {
            item.processingModeDes = item.processingMode$FICDictName
          }
        }

        item.plantAreas.forEach(subItem => {
          subItem.plantArea =
                subItem.plantAreaProvince$FICDictName +
                '-' +
                subItem.plantAreaCity$FICDictName +
                '-' +
                subItem.plantAreaCounty$FICDictName +
                '-' +
                subItem.plantAreaTown$FICDictName
          if (subItem.landRentStart && subItem.landRentStart.length > 0) {
            subItem.landRent = subItem.landRentStart + '至' + subItem.landRentEnd
          } else {
            subItem.landRent = ''
          }
          if (subItem.landNature !== '99') {
            subItem.landNatureDes = subItem.landNature$FICDictName
          } else {
            subItem.landNatureDes = subItem.landNatureOtherInfo
          }

          if (subItem.waterNature !== '99') {
            subItem.waterNatureDes = subItem.waterNature$FICDictName
          } else {
            subItem.waterNatureDes = subItem.waterNatureOtherInfo
          }
        })

        item.plantInsuranceList.forEach(subItem => {
          if (subItem.insuranceCompanyCode !== '99') {
            subItem.insuranceCompanyDes = subItem.insuranceCompanyCode$FICDictName
          } else {
            subItem.insuranceCompanyDes = subItem.insuranceCompanyOther
          }
        })
      })
    }
  },
  created() {},
  filters: {
    newOldFilter(val) {
      return val === 'Y' ? '是' : '否'
    }
  },
  mounted() {
    this.businessType = String(this.$route.query.productType)
  },
  methods: {}
}
</script>
<style lang="scss" scoped></style>
