<template>
  <div>
    <el-dialog
      title="添加种植物"
      top="5vh"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="90%"
      class="grow-info-dialog"
      @close="clearDialog"
      @open="dialogOpen"
    >
      <el-divider></el-divider>
      <div class="m-t-20">
        <el-form
          size="mini"
          :model="form"
          status-icon
          ref="form"
          :rules="rules"
          label-position="right"
          label-width="auto"
          class="m-t-20 block-el-select"
        >
          <!-- 作物经济类型 -->
          <div>
            <span class="all-main-tit all-tit-bar"></span>
            <span class="all-main-tit all-tit-con">{{corpTypeSubTitle}}</span>
            <el-row :gutter="10" class="m-t-30">
              <el-col :span="8" v-if=" this.cropsType !== '4' ">
                <el-form-item label="作物种类:" prop="varietyType">
                  <el-select v-model="form.varietyType" :clearable="true" placeholder="请选择">
                    <el-option v-for="item in this.commonEnum.varietyTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-else>
                <el-form-item label="作物类型:" prop="cropsType">
                  <span>棉花</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预计种植周期:" prop="growCycle">
                  <el-date-picker
                    v-model="form.growCycle"
                    type="monthrange"
                    range-separator="-"
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    size="mini"
                    value-format="yyyy-MM-dd HH-mm-ss"
                    style="max-width:230px;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="种植经验:" prop="experience">
                  <el-select v-model="form.experience" :clearable="true" placeholder="请选择">
                    <el-option v-for="item in this.commonEnum.experienceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="上年度种植面积:" prop="lastYearPlantarea">
                  <el-input v-model="form.lastYearPlantarea" placeholder="请输入" type="number" min="0" maxlength="50">
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本年度种植面积:" prop="thisYearPlanarea">
                  <el-input v-model="form.thisYearPlanarea" placeholder="请输入" type="number" min="0" maxlength="50">
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上年度亩产量:" prop="lastYearAvgYield">
                  <el-input v-model="form.lastYearAvgYield" placeholder="请输入" type="number" min="0" maxlength="50">
                    <template slot="append">公斤</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="上年度销售均价:" prop="lastYearSalePrice">
                  <el-input v-model="form.lastYearSalePrice" placeholder="请输入" type="number" min="0" maxlength="10">
                    <template slot="append">元/公斤</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="近三年销售均价:" prop="lastThyearAvgPrice">
                  <el-input v-model="form.lastThyearAvgPrice" placeholder="请输入" type="number" min="0" maxlength="10">
                    <template slot="append">元/公斤</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="农产品销售方式:" prop="salesModeOfAgriculturalProducts">
                  <el-select
                    v-model="form.salesModeOfAgriculturalProducts"
                    multiple
                    :clearable="true"
                    placeholder="请选择"
                  >
                    <el-option v-for="item in this.commonEnum.salesModeOfAgriculturalProductsOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">

              <el-col :span="8">
                <el-form-item label="种植机械化程度:" prop="mechanizedDegree">
                  <el-select v-model="form.mechanizedDegree" :clearable="true" placeholder="请选择">
                    <el-option v-for="item in this.commonEnum.mechanizedDegreeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="cropsType ==='4'">
                <el-form-item label="种子供应方式:" multiple prop="seedSupplyMode">
                  <el-select v-model="form.seedSupplyMode" :clearable="true" placeholder="请选择">
                    <el-option v-for="item in this.commonEnum.seedSupplyModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="cropsType === '2'">
              <el-col :span="8">
                <el-form-item label="农产品是否加工:" prop="temporary">
                  <el-radio-group v-model="form.temporary" @change="temporaryChange">
                    <el-radio :label="'N'">否</el-radio>
                    <el-radio :label="'Y'">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="form.temporary === 'Y'">
                <el-form-item label="农产品加工方式:" prop="processingMode">
                  <el-select
                    v-model="form.processingMode"
                    multiple
                    :clearable="true"
                    @change="changeProcessingMode"
                    placeholder="请选择"
                  >
                    <el-option v-for="item in this.commonEnum.processingModeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="其他加工方式:" v-if="processingModeOtherStatus && form.temporary === 'Y'" prop="processingModeOtherInfo">
                  <el-input
                    style="width: 220px"
                    v-model="form.processingModeOtherInfo"
                    placeholder="请输入农产品加工方式"
                    maxlength="50"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="是否投农业保险:" prop="insuranceFlag">
                  <el-radio-group v-model="form.insuranceFlag">
                    <el-radio :label="'N'">否</el-radio>
                    <el-radio :label="'Y'">是</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="form.insuranceFlag === 'Y'">
              <el-col v-if="form.insuranceCompanyCode != '99'" :span="8">
                <el-form-item prop="insuranceCompanyCode">
                  <el-select v-model="form.insuranceCompanyCode" :clearable="true" placeholder="请选择保险公司">
                    <el-option v-for="item in this.commonEnum.insuranceCompanyCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-else :span="6">
                <el-form-item prop="insuranceCompanyCode">
                  <el-select v-model="form.insuranceCompanyCode" :clearable="true" placeholder="请选择保险公司">
                    <el-option v-for="item in this.commonEnum.insuranceCompanyCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-input
                  v-if="form.insuranceCompanyCode == '99'"
                  v-model="form.insuranceCompanyOther"
                  placeholder="请输入保险公司名称"
                  maxlength="50"
                  size="mini"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="insurancePremium" label-width="0px">
                  <el-input v-model="form.insurancePremium" placeholder="请输入保费" maxlength="50">
                    <template slot="append">元/亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="insuranceAmount" label-width="0px">
                  <el-input v-model="form.insuranceAmount" placeholder="最高可赔额度" maxlength="50">
                    <template slot="append">元/亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.mechanizedDegree !== '3'">
              <el-col :span="24">
                <el-form-item prop="selfMachine" label="是否自有农机">
                  <el-radio-group v-model="form.selfMachine">
                    <el-radio :label="'N'">否</el-radio>
                    <el-radio :label="'Y'">是</el-radio>
                  </el-radio-group>
                  <el-form-item v-if="form.selfMachine == 'Y'" prop="machineType">
                    <el-checkbox-group v-model="form.machineType" @change="changeMachineryTypes">
                      <el-checkbox
                        v-for="item in this.commonEnum.machineTypeOptions"
                        :label="item.label"
                        :key="item.value"
                      >{{item.label}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item
                    v-if="otherMachineryTypesStatus == true && form.selfMachine == 'Y'"
                    prop="machineOtherInfo"
                  >
                    <el-input
                      style="width: 220px"
                      v-model="form.machineOtherInfo"
                      placeholder="请输入农机类型"
                      maxlength="50"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item prop="diseaseStatus" :label="this.cropsTypeDes">
                  <el-radio-group v-model="form.diseaseStatus" @change="changeDiseaseStatus" size="mini">
                    <el-radio v-for="item in diseaseStatusOptions" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-checkbox-group v-model="form.disease" @change="changeDisease" size="mini">
                    <el-checkbox v-for="item in diseaseOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="otherDiseaseTypesStatus" prop="diseaseOther">
                  <el-input
                    v-show="otherDiseaseTypesStatus"
                    v-model="form.diseaseOther"
                    placeholder="请输入病害"
                    maxlength="50"
                    style="width: 220px"
                    size="mini"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-divider></el-divider>
          <!-- 种植地块 -->
          <div class="plot-content">
            <span class="all-main-tit all-tit-bar"></span>
            <span class="all-main-tit all-tit-con">种植地块</span>
            <el-table :data="form.plantAreas" ref="table" border size="mini" class="m-t-20">
              <el-table-column label="地块位置" min-width="130">
                <template slot-scope="scope">
                  <!-- <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>-->
                  <el-row :span="24" v-if="scope.row.editStatus == true">
                    <!-- <el-form-item> -->
                    <span>{{ scope.row.plantAreaProvince }}</span>
                    <!-- <el-select
                    size="mini"
                    v-model="locationForm.selectedProvince"
                    @change="handleProvinceChange"
                    filterable
                    placeholder="省"
                    clearable
                  >
                    <el-option
                      v-for="item in locationForm.provinceOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>-->
                    <!-- </el-select> -->
                    <el-select
                      size="mini"
                      v-model="scope.row.plantAreaCity"
                      filterable
                      placeholder="市"
                      clearable
                      @change="handleCityChange(scope)"
                    >
                      <el-option
                        v-for="item in locationForm.cityOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <el-select
                      size="mini"
                      v-model="scope.row.plantAreaCounty"
                      filterable
                      placeholder="县/区"
                      :disabled="scope.row.plantAreaCity.length === 0"
                      clearable
                      @change="handleAreaChange(scope)"
                    >
                      <el-option
                        v-for="item in locationForm.areaOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <el-select
                      size="mini"
                      v-model="scope.row.plantAreaTown"
                      filterable
                      placeholder="乡/镇"
                      :disabled="scope.row.plantAreaCounty.length === 0"
                      clearable
                      @change="handleTownsChange(scope)"
                    >
                      <el-option
                        v-for="item in locationForm.townsOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                  </el-row>
                  <el-row v-else>
                    <span>{{ scope.row.plantAreaProvince }}</span>
                    <span>{{ scope.row.plantAreaCity }}</span>
                    <span>{{ scope.row.plantAreaCounty }}</span>
                    <span>{{ scope.row.plantAreaTown }}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column v-if="cropsType === '4' && businessType === '001'" label="土地发包方" min-width="120">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.editStatus == true">
                    <el-select size="mini" v-model="scope.row.areaEmployer" filterable placeholder="请选择" clearable>
                      <el-option
                        v-for="item in areaEmployerOptions"
                        :key="item.code"
                        :label="item.code"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-row>
                  <el-row v-else>
                    <span>{{ scope.row.areaEmployer }}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column v-if="businessType === '002'" label="是否申贷地块" width="120">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.editStatus == true">
                    <el-select size="mini" v-model="scope.row.applyAreaFlag" filterable placeholder="请选择" clearable>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-row>
                  <el-row v-else>
                    <span>{{ scope.row.applyAreaFlag === 1 ? '是' : '否' }}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="土地性质" min-width="130">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.editStatus == true">
                    <el-select size="mini" v-model="scope.row.landNature" filterable placeholder="请选择" clearable>
                      <el-option
                        v-for="item in landNatureOptions"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-if="scope.row.landNature === '99'"
                      placeholder="请输入土地性质"
                      maxlength="50"
                      size="mini"
                      v-model="scope.row.landNatureOtherInfo"
                    ></el-input>
                  </el-row>
                  <el-row v-else>
                    <span>{{scope.row.landNature || "--"}}</span>
                    <span>{{scope.row.landNatureOtherInfo}}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="权属类型" min-width="130">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.editStatus == true">
                    <el-select size="mini" v-model="scope.row.ownershipType" filterable placeholder="请选择" clearable>
                      <el-option
                        v-for="item in ownershipTypeOptions"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-row>
                  <el-row v-else>
                    <span>{{scope.row.ownershipType || "--"}}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="土地流转费用(元/年/亩)" min-width="130">
                <template slot-scope="scope">
                  <div v-if="scope.row.ownershipType === '1'">
                    <span>--</span>
                  </div>
                  <div v-else>
                    <div v-if="scope.row.editStatus == true">
                      <el-input
                        type="number"
                        v-model="scope.row.areaFee"
                        size="mini"
                        placeholder="请输入土地流转费用"
                        min="0"
                        maxlength="50"
                      >
                        <!-- <template slot="append">元/亩/年</template> -->
                      </el-input>
                    </div>
                    <div v-else>
                      <span>{{scope.row.areaFee || "--"}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="地租缴纳期限" min-width="200">
                <template slot-scope="scope">
                  <div v-if="scope.row.ownershipType === '1'">
                    <span>--</span>
                  </div>
                  <div v-else>
                    <!-- <el-input v-model="scope.row.areaFee" placeholder="请输入土地流转费用" maxlength="50">
                    <template slot="append">元/亩/年</template>
                    </el-input>-->
                    <div v-if="scope.row.editStatus == true">
                      <el-date-picker
                        size="mini"
                        v-model="scope.row.timeLimit"
                        type="monthrange"
                        range-separator="-"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        value-format="yyyy-MM-dd HH-mm-ss"
                      ></el-date-picker>
                    </div>
                    <div v-else>
                      <span>{{scope.row.timeLimit || "--"}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="水源分类" min-width="130">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.editStatus == true">
                    <el-select size="mini" v-model="scope.row.waterNature" filterable placeholder="请选择" clearable>
                      <el-option
                        v-for="item in waterNatureOptions"
                        :key="item.code"
                        :label="item.value"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-show="scope.row.waterNature === '99'"
                      placeholder="请输入水源分类"
                      maxlength="50"
                      size="mini"
                      v-model="scope.row.waterNatureOtherInfo"
                    ></el-input>
                  </el-row>
                  <el-row v-else>
                    <span>{{scope.row.waterNature || "--"}}</span>
                    <span>{{scope.row.waterNatureOtherInfo}}</span>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="水费(元/亩)" min-width="130">
                <template slot-scope="scope">
                  <!-- <div v-if="scope.row.landOwnership === '自有确权'">
                  <span>--</span>
                </div>
                  <div v-else>-->

                  <div v-if="scope.row.editStatus">
                    <el-input
                      type="number"
                      v-model="scope.row.waterFee"
                      size="mini"
                      placeholder="请输入水费"
                      min="0"
                      maxlength="50"
                    >
                      <!-- <template slot="append">元/亩</template> -->
                    </el-input>
                  </div>
                  <div v-else>
                    <span>
                      <span>{{scope.row.waterFee || "--"}}</span>
                    </span>
                  </div>
                  <!-- </div> -->
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="160">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    v-if="scope.row.editStatus == false"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button size="mini" v-else @click="handleSave(scope.$index, scope.row)">保存</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="btns-center-box">
              <el-button size="mini" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- MAP服务信息 -->
          <div>
            <span class="all-main-tit all-tit-bar"></span>
            <span class="all-main-tit all-tit-con">MAP服务信息</span>
            <el-row>
              <el-col :span="8">
                <el-form-item label="合作面积:" prop="plantServiceArea">
                  <el-input
                    type="number"
                    v-model="form.plantServiceArea"
                    placeholder="请输入"
                    maxlength="50"
                    min="0"
                    clearable
                  >
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务价格:" prop="mapServicePrice">
                  <el-input
                    type="number"
                    v-model="form.mapServicePrice"
                    placeholder="请输入"
                    maxlength="50"
                    min="0"
                    clearable
                  >
                    <template slot="append">元/亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已缴纳定金:" prop="payFee">
                  <el-input type="number" v-model="form.payFee" placeholder="请输入" maxlength="50" min="0" clearable>
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" class="wide-button" @click="submitForm('form')">保存</el-button>
        <el-button size="mini" class="wide-button" @click="dialogCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { handelDigital } from '@/utils/format.js'
import { mapGetters } from 'vuex'
export default {
  name: 'GrowInfo',
  props: {
    currentProvince: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 外部传入所有收入的对象
     *  businessType 0011农资贷  002 农地贷
     *  cropsType  1 粮食作物 2 经济作物 3特作  4棉花
     *
     */
    outCheckSource: {
      type: Object
    }
  },
  data() {
    const validatediseaseStatus = (rule, value, callback) => {
      if (this.form.diseaseStatus === '' && this.form.disease.length === 0) {
        return callback(new Error('请选择' + this.cropsTypeDes))
      } else {
        callback()
      }
    }
    return {
      cropsTypeDes: this.cropsType === '4' ? '近三年病害情况:' : '病害情况',
      areaEmployerOptions: [
        {
          type: 'areaEmployer',
          typeDesc: '土地发包方',
          code: '1',
          value: '兵团'
        },
        {
          type: 'areaEmployer',
          typeDesc: '土地发包方',
          code: '2',
          value: '村委'
        },
        {
          type: 'areaEmployer',
          typeDesc: '土地发包方',
          code: '3',
          value: '村民'
        }
      ],
      ownershipTypeOptions: [
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '1',
          value: '自有确权'
        },
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '2',
          value: '短期流转（每年流转一次）'
        },
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '3',
          value: '长期流转（租赁期1-5年，每年付地租）'
        },
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '4',
          value: '长期流转（租赁期1-5年，一次性趸交地租)'
        },
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '5',
          value: '长期流转（租赁期5年以上，每年付地租）'
        },
        {
          type: 'ownershipType',
          typeDesc: '土地权属类型',
          code: '6',
          value: '长期流转（租赁期5年以上，一次性趸交地租）'
        }
      ],
      waterNatureOptions: [
        {
          type: 'waterNature',
          typeDesc: '水源性质',
          code: '1',
          value: '河水'
        },
        {
          type: 'waterNature',
          typeDesc: '水源性质',
          code: '2',
          value: '自打井水'
        },
        {
          type: 'waterNature',
          typeDesc: '水源性质',
          code: '3',
          value: '集体供水'
        },
        {
          type: 'waterNature',
          typeDesc: '水源性质',
          code: '4',
          value: '蓄水池供水'
        },
        {
          type: 'waterNature',
          typeDesc: '水源性质',
          code: '99',
          value: '其他'
        }
      ],
      landNatureOptions: [
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '1',
          value: '标准耕地（水田/旱田）'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '2',
          value: '开荒地（3年内）'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '3',
          value: '山地'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '4',
          value: '河滩地'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '5',
          value: '盐碱地'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '6',
          value: '沙地'
        },
        {
          type: 'landNature',
          typeDesc: '种植地块土地性质',
          code: '99',
          value: '其他'
        }
      ],
      cropsType: {
        type: String,
        default: '4'
      }, // 作物类型 4代表棉花
      businessType: {
        type: String,
        default: '001'
      }, // 001 农资贷 002 农地贷
      locationForm: {
        selectedProvince: this.currentProvince, // 选中的省份
        selectedCity: '', // 选中的城市
        selectedArea: '', // 选中的县区
        selectedTowns: '', // 选中的乡镇
        provinceOptions: [], // 省份下拉框
        cityOptions: [
          {
            id: 1,
            name: '北京'
          }
        ], // 城市下拉框
        areaOptions: [
          {
            id: 11,
            name: '昌平'
          }
        ], // 县区下拉框
        townsOptions: [
          {
            id: 111,
            name: '11111'
          },
          {
            id: 222,
            name: '222222'
          }
        ] // 乡镇下拉框
      },
      // 是否选择了自有农机
      otherMachineryTypesStatus: false,
      /**
       * 加工方式是否包含其他
       */
      processingModeOtherStatus: false,
      /** 是否病害情况包含其他 */
      otherDiseaseTypesStatus: false,
      form: {
        id: '',
        varietyType: '', // 作物类型
        growCycle: '', // 种植周期
        experience: '', // 种植经验
        lastYearPlantarea: '', // 上一年种植面积
        thisYearPlanarea: '', // 本年度种植面积
        lastYearAvgYield: '', // 上一年度亩产量
        lastYearSalePrice: '', // 上一年度销售均价
        lastThyearAvgPrice: '', // 近三年销售均价
        salesModeOfAgriculturalProducts: [], // 销售方式
        temporary: 'N', // 农产品是否加工
        processingMode: [], // 农产品加工方式
        processingModeOtherInfo: '', // 农产品其他加工方式
        mechanizedDegree: '', // 机械化程度
        insuranceFlag: 'N', // 是否投农业保险
        insuranceCompanyCode: '', // 保险公司
        insuranceCompanyOther: '', // 输入的保险公司名称
        insurancePremium: '', // 保险费
        insuranceAmount: '', // 最高赔偿额
        selfMachine: 'N', // 是否自有农机
        machineType: [], // 农机类型
        machineOtherInfo: '', // 输入的农机类型
        seedSupplyMode: [], // 种子供应方式
        diseaseStatus: '', // 病害情况
        disease: [], // 病害
        diseaseOther: '', // 编辑的其他病害
        plantServiceArea: '', // MAP服务信息 合作面积
        mapServicePrice: '', // 服务价格
        payFee: '', // 定金
        plantAreas: [] // 种植地块
      },
      rules: {
        varietyType: [{ required: true, message: '请选择作物类型', trigger: 'change' }],
        growCycle: [{ required: true, message: '请选择种植周期', trigger: 'change' }],
        experience: [{ required: true, message: '请选择种植经验', trigger: 'change' }],
        lastYearPlantarea: [{ required: true, message: '请输入上年度种植面积', trigger: 'blur' }],
        thisYearPlanarea: [{ required: true, message: '请输入本年度种植面积', trigger: 'blur' }],
        lastYearAvgYield: [{ required: true, message: '请输入上年度亩产量', trigger: 'blur' }],
        lastYearSalePrice: [
          { required: true, message: '请输入上年度销售均价', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的上年度销售均价'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        lastThyearAvgPrice: [{ required: true, message: '请输入近三年销售均价', trigger: 'blur' }],
        salesModeOfAgriculturalProducts: [{ required: true, message: '请选择农产品销售方式', trigger: 'change' }],
        temporary: [{ required: true, message: '请选择农产品是否加工', trigger: 'change' }],
        processingMode: [{ required: true, message: '请选择农产品加工方式', trigger: 'change' }],
        processingModeOtherInfo: [{ required: true, message: '请输入其他加工方式', trigger: 'blur' }],
        mechanizedDegree: [{ required: true, message: '请选择种植机械化程度', trigger: 'change' }],
        seedSupplyMode: [{ required: true, message: '请选择种子供应方式', trigger: 'change' }],
        insuranceFlag: [{ required: true, message: '请选择是否投农业保险', trigger: 'change' }],
        insuranceCompanyCode: [{ required: true, message: '请选择保险公司', trigger: 'change' }],
        insurancePremium: [{ required: true, message: '请请输入保费', trigger: 'blur' }],
        insuranceAmount: [{ required: true, message: '请输入最高可赔额度', trigger: 'blur' }],
        selfMachine: [{ required: true, message: '请选择是否自有农机', trigger: 'change' }],
        machineType: [{ required: true, message: '请选择农机类型', trigger: 'change' }],
        machineOtherInfo: [{ required: true, message: '请输入农机类型', trigger: 'blur' }],
        diseaseStatus: [{ required: true, validator: validatediseaseStatus, trigger: 'change' }],
        diseaseOther: [{ required: true, message: '请输入病害', trigger: 'blur' }],
        plantServiceArea: [{ required: true, message: '请输入合作面积', trigger: 'blur' }],
        mapServicePrice: [{ required: true, message: '请输入服务价格', trigger: 'blur' }],
        payFee: [{ required: true, message: '请输入已缴纳定金', trigger: 'blur' }]
      },
      cottonDiseaseOptions: [],
      otherDiseaseOptions: [],
      cottonDiseaseStatus: [],
      otherDiseaseStatus: []
    }
  },
  created() {
    this.cottonDiseaseOptions = this.commonEnum.diseaseCottonOptions
    this.otherDiseaseOptions = this.commonEnum.diseaseEconomicsOptions
    this.cottonDiseaseStatus = this.cottonDiseaseOptions.splice(0, 2)
    this.otherDiseaseStatus = this.otherDiseaseOptions.splice(0, 2)
    this.getProvinceListFun()
  },
  computed: {
    corpTypeSubTitle() {
      if (this.cropsType === '4') {
        return '作物经济类型：棉花'
      } else if (this.cropsType === '1') {
        return '作物经济类型：粮作'
      } else if (this.cropsType === '2') {
        return '作物经济类型：经作'
      } else {
        return '作物经济类型：特作'
      }
    },
    diseaseOptions() {
      return this.cropsType === '4' ? this.cottonDiseaseOptions : this.otherDiseaseOptions
    },
    diseaseStatusOptions() {
      return this.cropsType === '4' ? this.cottonDiseaseStatus : this.otherDiseaseStatus
    },
    ...mapGetters(['commonEnum'])
  },
  mounted() {},
  methods: {
    dialogOpen() {
      this.$nextTick(() => {
        this.cropsType = this.outCheckSource.cropsType
        this.businessType = this.outCheckSource.businessType
        if (this.outCheckSource.info) {
          this.form = Object.assign({}, this.outCheckSource.info)
          this.form.plantAreas.forEach(item => {
            item.editStatus = false
          })
        }
      })
    },
    dialogCancel() {
      this.form = {
        id: '',
        varietyType: '', // 作物类型
        growCycle: '', // 种植周期
        experience: '', // 种植经验
        lastYearPlantarea: '', // 上一年种植面积
        thisYearPlanarea: '', // 本年度种植面积
        lastYearAvgYield: '', // 上一年度亩产量
        lastYearSalePrice: '', // 上一年度销售均价
        lastThyearAvgPrice: '', // 近三年销售均价
        salesModeOfAgriculturalProducts: [], // 销售方式
        temporary: 'N', // 农产品是否加工
        processingMode: [], // 农产品加工方式
        processingModeOtherInfo: '', // 农产品其他加工方式
        mechanizedDegree: '', // 机械化程度
        insuranceFlag: 'N', // 是否投农业保险
        insuranceCompanyCode: '', // 保险公司
        insuranceCompanyOther: '', // 输入的保险公司名称
        insurancePremium: '', // 保险费
        insuranceAmount: '', // 最高赔偿额
        selfMachine: 'N', // 是否自有农机
        machineType: [], // 农机类型
        machineOtherInfo: '', // 输入的农机类型
        seedSupplyMode: [], // 种子供应方式
        diseaseStatus: '', // 病害情况
        disease: [], // 病害
        diseaseOther: '', // 编辑的其他病害
        plantServiceArea: '', // MAP服务信息 合作面积
        mapServicePrice: '', // 服务价格
        payFee: '', // 定金
        plantAreas: [] // 种植地块
      }
      this.$refs.form.resetFields()
      this.$emit('dialogCancel')
    },
    /**
     * cycleStart cycleEnd 种植开始时间——农产品收获时间
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.plantAreas.length > 0) {
            const obj = this.form.plantAreas.find(subItem => subItem.editStatus === true)
            if (obj) {
              this.$message.error('请保存种植地块信息')
            } else {
              let disease = []
              if (this.form.diseaseStatus !== '') {
                disease = [this.form.diseaseStatus]
              } else {
                disease = this.form.disease
              }
              this.form.disease = disease
              const saveDict = Object.assign({
                cropsType: this.cropsType.default,
                cycleStart: this.form.growCycle[0],
                cycleEnd: this.form.growCycle[1],
                customerId: '1da2ab04007b41b2820aa220304819e6',
                orderNo: 'c2da0042-1e7a-439f-8881-26ca6e0fada2'
              }, this.form)
              delete saveDict.growCycle
              saveDict.processingMode = saveDict.processingMode.join(',')
              saveDict.machineType = saveDict.machineType.join(',')
              saveDict.seedSupplyMode = saveDict.seedSupplyMode.join(',')
              saveDict.disease = saveDict.disease.join(',')
              saveDict.salesModeOfAgriculturalProducts = saveDict.salesModeOfAgriculturalProducts.join(',')
              this.$emit('growInfoSaveInfo', saveDict)
            }
          } else {
            this.$message.error('请添加种植地块')
          }
        } else {
          return false
        }
      })
    },
    clearDialog() {
      this.$refs.form.resetFields()
    },
    temporaryChange(v) {
      if (v === 'N') {
        this.form.processingMode = []
        this.form.processingModeOtherInfo = ''
      }
    },
    // 选中农机类型
    changeMachineryTypes(item) {
      this.otherMachineryTypesStatus = this.form.machineType.includes('99')
      if (this.otherMachineryTypesStatus === false) {
        this.form.machineOtherInfo = ''
      }
    },
    // 移除农机类型
    removeMachinneryTypes() {
      this.otherMachineryTypesStatus = this.form.machineType.includes('99')
      if (this.otherMachineryTypesStatus === false) {
        this.form.machineOtherInfo = ''
      }
    },
    // 农产品加工方式选择
    changeProcessingMode() {
      this.processingModeOtherStatus = this.form.processingMode.includes('99')
      if (this.processingModeOtherStatus === false) {
        this.form.processingModeOtherInfo = ''
      }
    },
    // 病害情况
    changeDiseaseStatus(item) {
      // this.form.diseaseStatus = item
      this.form.disease = []
      this.form.diseaseOther = ''
      this.otherDiseaseTypesStatus = false
    },
    // 具体病害
    changeDisease(item) {
      if (item.length > 0) {
        this.form.diseaseStatus = ''
        this.otherDiseaseTypesStatus = item.includes('99')
      } else {
        this.form.diseaseStatus = ''
        this.otherDiseaseTypesStatus = false
        this.form.diseaseOther = ''
      }
    },
    // 查询省下拉框
    getProvinceListFun() {
      // getProvinceList().then(res => {
      //   if (res.status === 200) {
      //     this.locationForm.provinceOptions = res.data
      //   } else {
      //     this.$message.error(res.message || '查询省份出错')
      //   }
      // })
    },
    // 切换省份
    handleProvinceChange() {
      // this.locationForm.selectedCity = ''
      // if (this.locationForm.selectedProvince === '') {
      //   this.locationForm.cityOptions = []
      // } else {
      //   this.getCitylistFun(this.locationForm.selectedProvince)
      // }
    },
    handleCityChange(scope) {
      // 根据scope.$index 判断位置
      this.locationForm.selectedCity = scope.plantAreaCity
      this.form.plantAreas[scope.$index].plantAreaCounty = ''
      this.form.plantAreas[scope.$index].plantAreaTown = ''
      this.locationForm.selectedArea = ''
      this.locationForm.selectedTowns = ''
      if (this.locationForm.selectedCity === '') {
        this.locationForm.areaOptions = []
        this.locationForm.townsOptions = []
      } else {
        this.getArealistFun(this.locationForm.selectedCity)
        this.locationForm.townsOptions = []
      }
    },
    handleAreaChange(scope) {
      this.form.plantAreas[scope.$index].plantAreaTown = ''
      this.locationForm.selectedCity = scope.plantAreaCity
      this.locationForm.selectedArea = scope.plantAreaCounty
      this.locationForm.selectedTowns = ''
      if (this.locationForm.selectedArea === '') {
        this.locationForm.townsOptions = []
      } else {
        this.getTownslistFun(this.locationForm.selectedArea)
      }
    },
    handleTownsChange(scope) {},
    // 根据省份id查询城市下拉框
    getCitylistFun(provinceId) {
      // getCityList({ id: provinceId }).then(res => {
      //   if (res.status === 200) {
      //     this.locationForm.cityOptions = res.data
      //   } else {
      //     this.$message.error(res.message || '查询城市出错')
      //   }
      // })
      this.locationForm.cityOptions = [
        {
          id: 10000,
          name: '武汉'
        },
        {
          id: 20000,
          name: '津南'
        }
      ]
    },
    // 根据城市id查询区县下拉框
    getArealistFun(cityId) {
      this.locationForm.areaOptions = [
        {
          id: 11,
          name: '11'
        },
        {
          id: 22,
          name: '22'
        }
      ]
      // getCityList({ id: provinceId }).then(res => {
      //   if (res.status === 200) {
      //     this.locationForm.cityOptions = res.data
      //   } else {
      //     this.$message.error(res.message || '查询城市出错')
      //   }
      // })
    },
    // 根据区县id查询乡镇下拉框
    getTownslistFun(areaId) {
      this.locationForm.townsOptions = [
        {
          id: 111,
          name: '11111'
        },
        {
          id: 222,
          name: '222222'
        }
      ]
      // getCityList({ id: provinceId }).then(res => {
      //   if (res.status === 200) {
      //     this.locationForm.cityOptions = res.data
      //   } else {
      //     this.$message.error(res.message || '查询城市出错')
      //   }
      // })
    },
    // 添加地块
    handleAdd() {
      this.form.plantAreas.push({
        plantAreaProvince: this.currentProvince,
        plantAreaCity: '',
        plantAreaCounty: '',
        plantAreaTown: '',
        areaEmployer: '',
        applyAreaFlag: '',
        landNature: '',
        landNatureOtherInfo: '',
        ownershipType: '',
        areaFee: '',
        timeLimit: '',
        waterNature: '',
        waterNatureOtherInfo: '',
        waterFee: '',
        editStatus: true
      })
    },
    // 种植地块编辑
    handleEdit(index, item) {
      this.form.plantAreas = this.form.plantAreas.map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
      })
    },
    // 种植地块保存
    /*
     plantAreaProvince: '河北省', // 省
          plantAreaCity: '', // 市
          plantArearea: '', // 区/县
          plantAreaTown: '', // 乡/镇
          areaEmployer: '', // 土地发包方
          applyAreaFlag:'是否申贷地块'
          landNature: '', // 土地性质
          landNatureOtherInfo: '', // 输入土地性质
          ownershipType: '', // 权属类型
          areaFee: '', // 土地流转费用
          timeLimit: '', // 地租缴纳期限
          waterNature: '', // 水源分类
          waterNatureOtherInfo: '', // 编辑水源分类
           waterFee:'', // 水费
          editStatus: true, // 是否可编辑
     */
    handleSave(index, item) {
      let isVerifyCode = true
      if (item.plantAreaCity.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地块位置市' })
      } else if (item.plantAreaCounty.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地块位置县/区' })
      } else if (item.plantAreaTown.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地块位置乡/镇' })
      } else if (this.cropsType === '3' && this.businessType === '001' && item.areaEmployer.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择土地发包方' })
      } else if (this.businessType === '002' && item.applyAreaFlag.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择是否为申贷地块' })
      } else if (item.landNature.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择土地性质' })
      } else if (item.landNature === '其他' && item.landNatureOtherInfo.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入土地性质' })
      } else if (item.ownershipType.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择权属类型' })
      } else if (item.ownershipType !== '1' && item.areaFee.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入土地流转费' })
      } else if (item.ownershipType !== '1' && item.timeLimit.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地租缴纳期限' })
      } else if (item.waterNature.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择水源分类' })
      } else if (item.waterNature === '99' && item.waterNatureOtherInfo.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入水源分类' })
      } else if (item.waterFee.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入水费' })
      }

      if (isVerifyCode) {
        this.form.plantAreas = this.form.plantAreas.map(item1 => {
          if (item === item1) {
            item1.editStatus = false
          }
          return item1
        })
      }

      // this.$refs.table.endEditRow(indexVue, (valid, result, oldRow) => {
      //   if (valid) {
      //     console.log('修改之后的数据', result)
      //     console.log('原始数据', oldRow)
      //     // const index1 = this.editIds.findIndex(item => item === row.id)
      //     // this.editIds.splice(index, 1)
      //     // 添加到新的数组中
      //     // this.data = this.data.map(item => {
      //     //   if (result.id === item.id) {
      //     //     return result
      //     //   }
      //     //   return item
      //     // })
      //   } else {
      //     // 如果校验失败，则返回校验的第一个输入框的异常信息
      //     console.log(result)
      //     this.$message.error(result.message)
      //   }
      // })
    },
    // 种植地块删除
    handleDelete(index, item) {
      this.form.plantAreas.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.grow-info-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    height: 0px;
  }
  .el-dialog__title {
    // padding-left: 33px; // 53 - 20
    // font-size: 18px;
    // line-height: 34px;
    color: #08b448;
  }
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  // 多选框间距调整
  .el-checkbox-group {
    .el-checkbox {
      margin-right: 5px;
      margin-left: 0px;
    }
  }
  // 编辑表格中的月份范围选择框调整
  .plot-content {
    .el-date-editor--monthrange.el-input,
    .el-date-editor--monthrange.el-input__inner {
      width: 168px;
    }
    .el-date-editor .el-range-separator {
      width: 10%;
    }
  }

  .footer {
    margin-top: 40px;
    padding-bottom: 34px;
    button {
      width: 135px;
    }
    .el-button + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
