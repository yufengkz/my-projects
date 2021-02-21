<template>
  <div>
    <el-form
      ref="basicForm"
      :model="basicForm"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="left"
      label-width="140px"
    >
      <!-- 种植作物信息：可能多个 -->
      <div v-for="(item, index) in growInfoDetails.plants" :key="item.id">
        <!-- <span class="all-main-tit all-tit-bar"></span> -->
        <span class="all-title">种植作物{{index+1}}</span>
        <el-button class="m-l-30" size="mini" type="primary" @click="growInfoEdit(item)">编辑</el-button>
        <el-button size="mini" type="danger" @click="growInfoDelete(item.id)">删除</el-button>
        <el-divider></el-divider>
        <!-- 作物经济类型 -->
        <!-- todo: 详情展示内容修改，注意区分农作粮作 -->
        <div class="m-l-20">
          <span class="all-subtitle">作物经济类型：{{item.cropsType$FICDictName}}</span>
          <DescriptionList :content="item" class="m-t-10 m-l-10">
            <Description label="选择作物种类">{{item.varietyType$FICDictName}}</Description>
            <Description label="种植经验">{{item.experience$FICDictName}}</Description>
            <Description v-if="item.cropsType === '4'" label="种子供应方式">{{item.seedSupplyMode$FICDictName}}</Description>
            <Description label="上年度种植面积">{{item.lastYearPlantarea}}亩</Description>
            <Description label="本年度种植面积">{{item.thisYearPlanarea}}亩</Description>
            <Description label="上年度亩产量">{{ item.lastYearAvgYield }}公斤</Description>
            <Description label="上年度销售均价">{{ item.lastYearSalePrice }}元/公斤</Description>
            <Description label="近三年销售均价">{{item.lastThyearAvgPrice}}元/公斤</Description>
            <Description v-if="item.cropsType === '2'" label="加工方式">{{item.processingModeDes}}</Description>
            <Description label="农产品销售方式">{{item.salesModeOfAgriculturalProducts$FICDictName}}</Description>
            <Description label="预计种植周期">{{item.cycleStart}}至{{item.cycleEnd}}</Description>
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
            <Description label="合作面积">{{ item.plantServiceArea }}亩</Description>
            <Description label="服务价格">{{ item.mapServicePrice }}元/亩</Description>
            <Description label="已缴纳定金">{{ item.payFee }}元</Description>
            <!--<Description label="合作MAP"></Description>-->
          </DescriptionList>
        </div>
      </div>
      <el-button size="mini" type="primary" icon="el-icon-plus" @click="add">新增种植作物</el-button>
      <el-divider></el-divider>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12">
          <div v-if="loanCustomerType !== '1'">
            <el-form-item prop="serviceForArea" label="本年度为MAP引流面积:" label-width="150px">
              <el-input v-model="basicForm.serviceForArea" placeholder="请输入">
                <template slot="append">亩</template>
              </el-input>
            </el-form-item>
          </div>
          <!-- <div v-else>
            <el-form-item label="本年度为MAP引流面积:" label-width="150px">
              <el-input v-model="basicForm.serviceForArea" placeholder="请输入">
                <template slot="append">亩</template>
              </el-input>
            </el-form-item>
          </div> -->
        </el-col>
      </el-row>
      <el-divider v-if="loanCustomerType !== '1'" ></el-divider>

      <!-- 近三年种植物信息 -->
      <!-- todo：这里是详情信息，待改为编辑信息 -->
      <div>
        <span class="all-title">近三年种植物信息</span>
        <el-row class="m-t-20 m-l-20">
          <el-col :span="14">
            <el-form-item prop="somePlantFlag" label="近三年种植物是否一致:" label-width="160px">
              <el-radio-group v-model="basicForm.somePlantFlag">
                <el-radio v-for="item in threePlantOptions" :key="item.value" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <div v-show="basicForm.somePlantFlag === 'N'">
            <el-col :span="14">
              <p class="m-b-10" style="font-size:12px;">{{new Date().getFullYear() - 1}}年度</p>
              <!-- eg: 三元运算 否则后的 语句不能为空 【firstYearPlan1】是乱写的 -->
              <el-form-item :prop="basicForm.somePlantFlag === 'N'?'firstYearPlan':'firstYearPlan1'" label="种植作物种类:" label-width="100px">
                <el-cascader
                  v-model="basicForm.firstYearPlan"
                  :options="options"
                  :props="cascaderProps"
                  clearable
                  size="mini"
                  @blur="handleBlur('1')"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <p class="m-b-10" style="font-size:12px;">{{new Date().getFullYear() - 2}}年度</p>
              <el-form-item :prop="basicForm.somePlantFlag === 'N'?'secondYearPlan':'secondYearPlan1'" label="种植作物种类:" label-width="100px">
                <el-cascader
                  v-model="basicForm.secondYearPlan"
                  :options="options"
                  :props="cascaderProps"
                  clearable
                  size="mini"
                  @blur="handleBlur('2')"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <p class="m-b-10" style="font-size:12px;">{{new Date().getFullYear() - 3}}年度</p>
              <el-form-item :prop="basicForm.somePlantFlag === 'N'?'thirdYearPlan':'thirdYearPlan1'" label="种植作物种类:" label-width="100px">
                <el-cascader
                  v-model="basicForm.thirdYearPlan"
                  :options="options"
                  :props="cascaderProps"
                  clearable
                  size="mini"
                  @blur="handleBlur('3')"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </div>
        </el-row>
      </div>
    </el-form>
    <!-- 保存信息 -->
    <el-row class="m-t-10">
      <el-col :span="24" class="text-right">
        <el-button type="primary" class="wide-button" size="small" @click="HandleGrowInfo">保存种植信息</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <GrowInfoDialog
      :dialogVisible="growInfoDialogVisible"
      @dialogCancel="growInfoDialogVisible=false"
      :outCheckSource="checkSource"
      @growInfoSaveInfo="growInfoSaveInfo"
      :provinceId="provinceId"
    ></GrowInfoDialog>
  </div>
</template>
<script>
import { addOrUpdPlant, plantInfo, deletePlant, addOrUpdPlantCorpsApp } from '@/api/loan-apply-lilin'
import { mapGetters } from 'vuex'
export default {
  name: 'LoanApplyStep2GrowInfo',
  props: {
    provinceId: {
      type: Number,
      default: 0
    },
    loanCustomerType: {
      type: String,
      default: '1'
    }
  },
  components: {
    TableList: () => import('@/components/Tables/TableList'),
    DescriptionList: () => import('@/components/DescriptionList'),
    GrowInfoDialog: () => import('@/components/GrowInfoDialog')
  },
  filters: {
    newOldFilter(val) {
      return val === 'Y' ? '是' : '否'
    }
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  data() {
    return {
      growInfoDialogVisible: false,
      growInfoDetails: {},
      basicForm: {
        serviceForArea: '',
        somePlantFlag: 'N',
        firstYearPlan: '',
        secondYearPlan: '',
        thirdYearPlan: ''
      },
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
      ],

      basicFormRules: {
        serviceForArea: [{ required: true, message: '请输入引流面积', trigger: 'blur' }],
        somePlantFlag: [{ required: true, message: '请选择近三年种植物是否一致', trigger: 'change' }],
        firstYearPlan: [{ required: true, message: '请选择种植作物种类', trigger: 'blur' }],
        secondYearPlan: [{ required: true, message: '请选择种植作物种类', trigger: 'blur' }],
        thirdYearPlan: [{ required: true, message: '请选择种植作物种类', trigger: 'blur' }]
      },
      checkSource: {
        cropsType: String(this.$route.query.cropsType),
        businessType: String(this.businessType),
        loanCustomerType: this.loanCustomerType
      },
      threePlantOptions: [
        {
          value: 'Y',
          label: '是'
        },
        {
          value: 'N',
          label: '否'
        }
      ],
      // 种植物  多选  级联选择器
      cascaderProps: { multiple: true },
      options: []
    }
  },
  created() {
    this.options = this.commonEnum.cropsTypeOptions
    this.options[0].children = this.commonEnum.varietyTypeGrainOptions
    this.options[1].children = this.commonEnum.varietyTypeEconomicsOptions
    this.options[2].children = this.commonEnum.varietyTypeSpecialOptions
    this.options[3].children = [
      {
        label: '棉花',
        value: '0'
      }
    ]
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo
    this.customerId = this.$route.query.customerId
    this.businessType = String(this.$route.query.productType)
    this.plantInfoFun()
  },
  methods: {
    handleBlur(val) {
      if (val === '1') {
        this.$refs.basicForm.clearValidate('firstYearPlan')
      } else if (val === '2') {
        this.$refs.basicForm.clearValidate('secondYearPlan')
      } else if (val === '3') {
        this.$refs.basicForm.clearValidate('thirdYearPlan')
      }
    },
    applyPlaceFilter(row, column, cellValue, index) {
      return cellValue
    },
    add() {
      this.checkSource = {
        cropsType: String(this.$route.query.cropsType),
        businessType: String(this.businessType),
        loanCustomerType: this.loanCustomerType
      }
      this.growInfoDialogVisible = true
    },
    HandleGrowInfo() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          const plantCorpsArr = []
          if (this.basicForm.somePlantFlag === 'N') {
            const threeArr = [this.basicForm.firstYearPlan, this.basicForm.secondYearPlan, this.basicForm.thirdYearPlan]
            threeArr.forEach((item, key) => {
              const obj = {}
              if (key === 0) {
                obj.year = new Date().getFullYear() - 1
              }
              if (key === 1) {
                obj.year = new Date().getFullYear() - 2
              }
              if (key === 2) {
                obj.year = new Date().getFullYear() - 3
              }
              if (item !== '') {
                const arr = {}
                item.forEach(i => {
                  if (!arr[i[0]]) {
                    arr[i[0]] = []
                  }
                  arr[i[0]].push(i[1])
                })
                const plantCorp = []
                for (const b in arr) {
                  if (Object.prototype.hasOwnProperty.call(arr, b)) {
                    plantCorp.push({
                      cropsType: b,
                      cropsSpecies: arr[b].join(',')
                    })
                  }
                }
                obj.plantCorp = plantCorp
              }
              plantCorpsArr.push(obj)
            })
          }
          const data = {
            customerId: this.customerId,
            orderNo: this.orderNo,
            serviceForArea: this.basicForm.serviceForArea,
            somePlantFlag: this.basicForm.somePlantFlag,
            plantCorps: plantCorpsArr
          }
          addOrUpdPlantCorpsApp(data).then(rep => {
            if (rep.status === 200) {
              this.$store.state.app.saveToastFlag && this.$message.success(rep.message || '保存成功')
              !this.$store.state.app.saveToastFlag && this.$emit('applyCredit')
              this.$store.dispatch('ToggleToastFlag', true)
            } else {
              this.$message.error(rep.message)
              this.$store.dispatch('ToggleToastFlag', true)
            }
          })
        } else {
          this.$store.dispatch('ToggleToastFlag', true)
        }
      })
    },
    // 根据订单号及客户id,查询 种植信息列表 详情
    plantInfoFun() {
      plantInfo({
        customerId: this.customerId,
        orderNo: this.orderNo
      }).then(rep => {
        if (rep.status === 200) {
          rep.data.plants.forEach(item => {
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
                subItem.landRentStart = subItem.landRentStart + '年'
                subItem.landRentEnd = subItem.landRentEnd + '年'
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
          const data = rep.data
          this.growInfoDetails = data
          this.basicForm.somePlantFlag = data.somePlantFlag || 'N'
          this.basicForm.serviceForArea = data.serviceForArea
          const plantCorps = data.plantCorps.plantCorps
          plantCorps.forEach(item => {
            const arrHandle = []
            item.plantCorp.forEach(i => {
              const arr = i.cropsSpecies.split(',')
              arr.forEach(a => {
                arrHandle.push([i.cropsType, a])
              })
            })
            if (item.year === String(new Date().getFullYear() - 1)) {
              this.basicForm.firstYearPlan = arrHandle
            }
            if (item.year === String(new Date().getFullYear() - 2)) {
              this.basicForm.secondYearPlan = arrHandle
            }
            if (item.year === String(new Date().getFullYear() - 3)) {
              this.basicForm.thirdYearPlan = arrHandle
            }
          })
        }
      })
    },
    growInfoSaveInfo(val) {
      addOrUpdPlant(val).then(rep => {
        if (rep.status === 200) {
          this.growInfoDialogVisible = false
          this.growInfoDetails = ''
          this.plantInfoFun()
          this.$message.success(rep.message || '保存成功')
        } else {
          this.$message.error(rep.message || '保存失败')
        }
      })
    },
    growInfoEdit(item) {
      //  cropsType  1 粮食作物 2 经济作物 3特作  4棉花
      const info = Object.assign({}, item)
      info.growCycle = [info.cycleStart, info.cycleEnd]
      const processingMode = info.processingMode
      if (processingMode === '' || processingMode === '1') {
        info.temporary = 'N'
      } else {
        info.temporary = 'Y'
      }
      if (info.disease.includes('11') || info.disease.includes('12') || info.disease.includes('21') || info.disease.includes('22')) {
        info.diseaseStatus = info.disease
      }
      info.processingMode = typeof info.processingMode === 'string' ? (info.processingMode.length > 0 ? info.processingMode.split(',') : []) : info.processingMode
      info.machineType = typeof info.machineType === 'string' ? (info.machineType.length > 0 ? info.machineType.split(',') : []) : info.machineType
      info.seedSupplyMode = typeof info.seedSupplyMode === 'string' ? (info.seedSupplyMode.length > 0 ? info.seedSupplyMode.split(',') : []) : info.seedSupplyMode
      info.disease = typeof info.disease === 'string' ? (info.disease.length > 0 ? info.disease.split(',') : []) : info.disease
      info.salesModeOfAgriculturalProducts =
        typeof info.salesModeOfAgriculturalProducts === 'string'
          ? info.salesModeOfAgriculturalProducts.length > 0
            ? info.salesModeOfAgriculturalProducts.split(',')
            : []
          : info.salesModeOfAgriculturalProducts
      this.checkSource = Object.assign(
        {},
        {
          info,
          cropsType: String(this.$route.query.cropsType),
          businessType: String(this.businessType),
          loanCustomerType: String(this.loanCustomerType)
        }
      )
      this.growInfoDialogVisible = true
    },
    growInfoDelete(id) {
      this.$confirm('确认删除当前种植作物信息？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlant({
          customerId: this.customerId,
          orderNo: this.orderNo,
          plantId: id
        }).then(rep => {
          if (rep.status === 200) {
            this.growInfoDetails = ''
            this.plantInfoFun()
            this.$message.success(rep.message)
          } else {
            this.$message.error(rep.message)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.tableList {
  padding-top: 10px;
}
</style>
