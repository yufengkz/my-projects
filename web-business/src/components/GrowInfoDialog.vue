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
                <div v-if="this.cropsType === '1'">
                  <el-form-item label="作物种类:" prop="varietyType">
                    <el-select v-model="form.varietyType" :clearable="true" placeholder="请选择">
                      <el-option
                        v-for="item in this.commonEnum.varietyTypeGrainOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else-if="this.cropsType === '2'">
                  <el-form-item label="作物种类:" prop="varietyType">
                    <el-select v-model="form.varietyType" :clearable="true" placeholder="请选择">
                      <el-option
                        v-for="item in this.commonEnum.varietyTypeEconomicsOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-if="this.cropsType === '3'">
                  <el-form-item label="作物种类:" prop="varietyType">
                    <el-select v-model="form.varietyType" :clearable="true" placeholder="请选择">
                      <el-option
                        v-for="item in this.commonEnum.varietyTypeSpecialOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
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
                    start-placeholder="开始月份"
                    end-placeholder="结束月份"
                    size="mini"
                    format="yyyy年MM月"
                    value-format="yyyy年MM月"
                    style="max-width:230px;"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <div v-if="outCheckSource.loanCustomerType !== '1'">
                  <el-form-item label="种植经验:" prop="experience">
                    <el-select v-model="form.experience" :clearable="true" placeholder="请选择">
                      <el-option
                        v-for="item in this.commonEnum.experienceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item label="种植经验:">
                    <el-select v-model="form.experience" :clearable="true" placeholder="请选择">
                      <el-option
                        v-for="item in this.commonEnum.experienceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="上年度种植面积:" prop="lastYearPlantarea">
                  <el-input
                    v-model="form.lastYearPlantarea"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'lastYearPlantarea',99999999999)"
                    @change="numberChange($event,'lastYearPlantarea',99999999999)"
                  >
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="本年度种植面积:" prop="thisYearPlanarea">
                  <el-input
                    v-model="form.thisYearPlanarea"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'thisYearPlanarea',99999999999)"
                    @change="numberChange($event,'thisYearPlanarea',99999999999)"
                  >
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="上年度亩产量:" prop="lastYearAvgYield">
                  <el-input
                    v-model="form.lastYearAvgYield"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'lastYearAvgYield',99999999999)"
                    @change="numberChange($event,'lastYearAvgYield',99999999999)"
                  >
                    <template slot="append">公斤</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="上年度销售均价:" prop="lastYearSalePrice">
                  <el-input
                    v-model="form.lastYearSalePrice"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'lastYearSalePrice',99999999999)"
                    @change="numberChange($event,'lastYearSalePrice',99999999999)"
                  >
                    <template slot="append">元/公斤</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="近三年销售均价:" prop="lastThyearAvgPrice">
                  <el-input
                    v-model="form.lastThyearAvgPrice"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'lastThyearAvgPrice',99999999999)"
                    @change="numberChange($event,'lastThyearAvgPrice',99999999999)"
                  >
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
                    <el-option
                      v-for="item in this.commonEnum.salesModeOfAgriculturalProductsOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="种植机械化程度:" prop="mechanizedDegree">
                  <el-select
                    v-model="form.mechanizedDegree"
                    :clearable="true"
                    @change="changeMechanizedDegree"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in this.commonEnum.mechanizedDegreeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="cropsType ==='4'">
                <el-form-item label="种子供应方式:" multiple prop="seedSupplyMode">
                  <el-select v-model="form.seedSupplyMode" multiple :clearable="true" placeholder="请选择">
                    <el-option
                      v-for="item in this.commonEnum.seedSupplyModeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
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
                        :label="item.value"
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
                <el-form-item label="加工方式:" prop="processingMode">
                  <el-select
                    v-model="form.processingMode"
                    multiple
                    :clearable="true"
                    @change="changeProcessingMode"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in processingModeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="其他加工方式:"
                  v-if="processingModeOtherStatus && form.temporary === 'Y'"
                  prop="processingModeOtherInfo"
                >
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
              <el-table :data="form.plantInsuranceList" ref="InsuranceTable" border size="mini" class="m-t-20">
                <el-table-column label="保险公司" min-width="130">
                  <template slot-scope="scope">
                    <el-row>
                      <el-select
                        v-model="scope.row.insuranceCompanyCode"
                        :clearable="true"
                        placeholder="请选择保险公司"
                        size="mini"
                        :disabled="scope.row.editStatus == false"
                      >
                        <el-option
                          v-for="item in commonEnum.insuranceCompanyCodeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                      <el-input
                        v-if="scope.row.insuranceCompanyCode === '99'"
                        placeholder="请输入保险公司名称"
                        maxlength="50"
                        size="mini"
                        v-model="scope.row.insuranceCompanyOther"
                        :disabled="scope.row.editStatus == false"
                      ></el-input>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="保费(元/亩)" min-width="130">
                  <template slot-scope="scope">
                    <el-input
                      size="mini"
                      v-model="scope.row.insurancePremium"
                      placeholder="请输入"
                      maxlength="11"
                      clearable
                       @input="numberInsuranceChange($event, scope,'insurancePremium',99999999999)"
                       @change="numberInsuranceChange($event, scope,'insurancePremium',99999999999)"
                      :disabled="scope.row.editStatus == false"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="最高可赔额(元/亩)" min-width="130">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.insuranceAmount"
                      size="mini"
                      placeholder="请输入"
                      maxlength="11"
                     @input="numberInsuranceChange($event, scope,'insuranceAmount',99999999999)"
                    @change="numberInsuranceChange($event, scope,'insuranceAmount',99999999999)"
                      :disabled="scope.row.editStatus == false"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="160">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      v-if="scope.row.editStatus == false"
                      @click="handleInsuranceEdit(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button size="mini" v-else @click="handleInsuranceSave(scope.$index, scope.row)">保存</el-button>
                    <el-button size="mini" type="danger" @click="handleInsuranceDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="handleInsuranceAdd">添加</el-button>
              </div>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="cropsType === '2' || cropsType === '4'">
                <el-form-item prop="diseaseStatus" :label="this.cropsTypeDes">
                  <el-radio-group v-model="form.diseaseStatus" @change="changeDiseaseStatus" size="mini">
                    <el-radio v-for="item in diseaseStatusOptions" :label="item.value" :key="item.value">{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-checkbox-group v-model="form.disease" @change="changeDisease" size="mini">
                    <el-checkbox v-for="item in diseaseOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item v-if="otherDiseaseTypesStatus === true" prop="diseaseOther">
                  <el-input
                    v-if="otherDiseaseTypesStatus === true"
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
              <el-table-column label="地块位置" min-width="260">
                <template slot-scope="scope">
                  <el-cascader
                    v-model="scope.row.plantAreaLocation"
                    :options="addressCascader"
                    :props="cityProps"
                    size="mini"
                    @change="addressChange(scope)"
                    clearable
                    :disabled="scope.row.editStatus == false"
                  ></el-cascader>
                </template>
              </el-table-column>
              <el-table-column v-if="cropsType === '4' && businessType === '1'" label="土地发包方" min-width="120">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.areaEmployer"
                    filterable
                    placeholder="请选择"
                    clearable
                    :disabled="scope.row.editStatus == false"
                  >
                    <el-option
                      v-for="item in commonEnum.areaEmployerOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="土地性质" min-width="130">
                <template slot-scope="scope">
                  <el-row>
                    <el-select
                      size="mini"
                      v-model="scope.row.landNature"
                      filterable
                      placeholder="请选择"
                      clearable
                      :disabled="scope.row.editStatus == false"
                    >
                      <el-option
                        v-for="item in commonEnum.landNatureOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-if="scope.row.landNature === '99'"
                      placeholder="请输入土地性质"
                      maxlength="50"
                      size="mini"
                      v-model="scope.row.landNatureOtherInfo"
                      :disabled="scope.row.editStatus == false"
                    ></el-input>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="权属类型" min-width="130">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    v-model="scope.row.ownershipType"
                    filterable
                    placeholder="请选择"
                    clearable
                    :disabled="scope.row.editStatus == false"
                    @change="ownershipChange(scope)"
                  >
                    <el-option
                      v-for="item in commonEnum.ownershipTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="土地流转费用(元/年/亩)" min-width="130">
                <template slot-scope="scope">
                  <div v-if="scope.row.ownershipType === '1'">
                    <span>--</span>
                  </div>
                  <div v-else>
                    <el-input
                      v-model="scope.row.areaFee"
                      size="mini"
                      placeholder="请输入土地流转费用"
                      min="0"
                      maxlength="11"
                      v-number-input.float="2"
                      @input="numberPlantChange($event,scope,'areaFee',99999999999)"
                      @change="numberPlantChange($event,scope,'areaFee',99999999999)"
                      :disabled="scope.row.editStatus == false"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="地租缴纳期限" min-width="250">
                <template slot-scope="scope">
                  <div v-if="scope.row.ownershipType === '1' || scope.row.ownershipType === '2'">
                    <span>--</span>
                  </div>
                  <div class="picker" v-else>
                    <el-date-picker
                      size="mini"
                      @change="leaseTermChange(scope)"
                      v-model="scope.row.landRentStart"
                      type="year"
                      placeholder="开始年份"
                      format="yyyy年"
                      value-format="yyyy年"
                      :disabled="scope.row.editStatus == false"
                      clearable
                      style="width: 120px;"
                    ></el-date-picker>
                    -
                    <el-date-picker
                      size="mini"
                      @change="leaseTermChange(scope)"
                      v-model="scope.row.landRentEnd"
                      type="year"
                      placeholder="结束年份"
                      format="yyyy年"
                      value-format="yyyy年"
                      :disabled="scope.row.editStatus == false"
                      clearable
                      style="width: 120px;"
                    ></el-date-picker>
                  </div>
                </template>
              </el-table-column>
              <el-table-column v-if="businessType === '2'" label="是否申贷地块" width="120">
                <template slot-scope="scope">
                  <div v-if="hiddenApplyAreaFlayFun(scope.row)">
                    <span>--</span>
                  </div>
                  <div v-else>
                    <el-select
                      size="mini"
                      v-model="scope.row.applyAreaFlag"
                      filterable
                      placeholder="请选择"
                      clearable
                      :disabled="scope.row.editStatus == false"
                    >
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="水源分类" min-width="130">
                <template slot-scope="scope">
                  <el-row>
                    <el-select
                      size="mini"
                      v-model="scope.row.waterNature"
                      filterable
                      placeholder="请选择"
                      clearable
                      :disabled="scope.row.editStatus == false"
                    >
                      <el-option
                        v-for="item in commonEnum.waterNatureOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-input
                      v-if="scope.row.waterNature === '99'"
                      placeholder="请输入水源分类"
                      maxlength="50"
                      size="mini"
                      v-model="scope.row.waterNatureOtherInfo"
                      :disabled="scope.row.editStatus == false"
                    ></el-input>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="水费(元/亩)" min-width="130">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.waterFee"
                    size="mini"
                    placeholder="请输入水费"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberPlantChange($event, scope,'waterFee',99999999999)"
                    @change="numberPlantChange($event, scope,'waterFee',99999999999)"
                    :disabled="scope.row.editStatus == false"
                  ></el-input>
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
                    v-model="form.plantServiceArea"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'plantServiceArea',99999999999)"
                    @change="numberChange($event,'plantServiceArea',99999999999)"
                    clearable
                  >
                    <template slot="append">亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="服务价格:" prop="mapServicePrice">
                  <el-input
                    v-model="form.mapServicePrice"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'mapServicePrice',99999999999)"
                    @change="numberChange($event,'mapServicePrice',99999999999)"
                    clearable
                  >
                    <template slot="append">元/亩</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="已缴纳定金:" prop="payFee">
                  <el-input
                    v-model="form.payFee"
                    placeholder="请输入"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberChange($event,'payFee',99999999999)"
                    @change="numberChange($event,'payFee',99999999999)"
                    clearable
                  >
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
import { queryAreaByAreaId, queryProvinceInfoByAreaId } from '@/api/common.js'
import NP from 'number-precision'
import { validateNum, validateNumGreatEqualZero } from '@/utils/validate'

export default {
  name: 'GrowInfo',
  props: {
    provinceId: {
      type: Number,
      default: 0
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 外部传入所有收入的对象
     *  businessType 1农资贷  2 农地贷
     *  cropsType  1 粮食作物 2 经济作物 3特作  4棉花
     *
     */
    outCheckSource: {
      type: Object
    }
  },
  data() {
    // // 输入数字校验
    // const validateNumRule = (rule, value, callback) => {
    //   var message = ''
    //   if (rule.field === 'housingValue') {
    //     message = '房产价值'
    //   } else if (rule.field === 'housingArea') {
    //     message = '房产面积'
    //   } else if (rule.field === 'othreAssertValue') {
    //     message = '资产价值'
    //   }
    //   if (value === '') {
    //     callback(new Error('请输入' + message))
    //   } else if (parseFloat(value) <= 0) {
    //     callback(new Error('请输入正确的' + message + '(不能输入负数或0)'))
    //   } else if (!validateNum(value)) {
    //     callback(new Error('请输入正确的' + message + '(不能输入负数或0)'))
    //   } else {
    //     callback()
    //   }
    // }
    const validatediseaseStatus = (rule, value, callback) => {
      if (this.form.diseaseStatus === '' && this.form.disease.length === 0) {
        return callback(new Error('请选择' + this.cropsTypeDes))
      } else {
        callback()
      }
    }
    return {
      cropsTypeDes: '',
      // landNatureOptions: this.commonEnum.landNatureOptions,
      cropsType: {
        type: String,
        default: '4'
      }, // 作物类型 4代表棉花
      businessType: {
        type: String,
        default: '1'
      }, // 1 农资贷 2 农地贷
      cityProps: {
        children: 'list',
        label: 'areaName',
        value: 'areaId'
      },
      addressCascader: [],
      currentProvinceId: '',
      currentProvinceName: '',
      locationForm: {
        // selectedProvince: '', // 选中的省份
        // selectedCity: '', // 选中的城市
        // selectedArea: '', // 选中的县区
        // selectedTowns: '', // 选中的乡镇
        selectedProvinceId: '', // 选中的省份
        selectedCityId: '', // 选中的城市
        selectedAreaId: '', // 选中的县区
        selectedTownsId: '', // 选中的乡镇
        provinceOptions: [], // 省份下拉框
        cityOptions: [], // 城市下拉框
        areaOptions: [], // 县区下拉框
        townsOptions: [] // 乡镇下拉框
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
        growCycle: [], // 种植周期
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
        plantInsuranceList: [],
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
        lastYearPlantarea: [
          { required: true, message: '请输入上年度种植面积', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的年度种植面积'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        thisYearPlanarea: [
          { required: true, message: '请输入本年度种植面积', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的本年度种植面积'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
        lastYearAvgYield: [
          { required: true, message: '请输入上年度亩产量', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的上年度亩产量'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
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
        selfMachine: [{ required: true, message: '请选择是否自有农机', trigger: 'change' }],
        machineType: [{ required: true, message: '请选择农机类型', trigger: 'change' }],
        machineOtherInfo: [{ required: true, message: '请输入农机类型', trigger: 'blur' }],
        diseaseStatus: [{ required: true, validator: validatediseaseStatus, trigger: 'change' }],
        diseaseOther: [{ required: true, message: '请输入病害', trigger: 'blur' }],
        plantServiceArea: [{ required: true, message: '请输入合作面积', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的合作面积'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
        mapServicePrice: [{ required: true, message: '请输入服务价格', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的服务价格'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }],
        payFee: [{ required: true, message: '请输入已缴纳定金', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              const newValue = handelDigital(value, true, '2')
              if (value === '') {
                callback()
              } else if (/^(([1-9]{1}\d{0,10})|(0{1}))(\.\d{1,2})?$/.test(newValue) === false) {
                callback(new Error('请输入正确的已缴纳定金'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
      },
      cottonDiseaseOptions: [],
      otherDiseaseOptions: [],
      diseaseOptions: [],
      diseaseStatusOptions: [],
      cottonDiseaseStatus: [],
      otherDiseaseStatus: [],
      // 加工方式
      processingModeOptions: [],
      // 种植周期时间配置
      pickerOptions: {
        disabledDate(time) {
          const _now = new Date()
          // 判断种植时间不能填写小于当前的时间
          if (time.getFullYear() > _now.getFullYear()) {
            return false
          } else if (time.getFullYear() === _now.getFullYear()) {
            return time.getMonth() + 1 < _now.getMonth() + 1
          } else {
            return true
          }
        }
      }
    }
  },
  created() {
    this.cottonDiseaseOptions = this.commonEnum.diseaseCottonOptions.slice(2)

    this.otherDiseaseOptions = this.commonEnum.diseaseEconomicsOptions.slice(2)

    this.cottonDiseaseStatus = this.commonEnum.diseaseCottonOptions.slice(0, 2)

    this.otherDiseaseStatus = this.commonEnum.diseaseEconomicsOptions.slice(0, 2)

    this.processingModeOptions = this.commonEnum.processingModeOptions.slice(1)
    this.getProvinceInfoFun()
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
    ...mapGetters(['commonEnum'])
  },
  mounted() {},
  methods: {
    dialogOpen() {
      this.form = {
        id: '',
        varietyType: '', // 作物类型
        growCycle: [], // 种植周期
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
        plantInsuranceList: [], // 保险公司
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
      this.getCitylistFun(this.provinceId)
      this.cropsType = this.outCheckSource.cropsType

      this.form.plantInsuranceList = []

      this.diseaseOptions = this.cropsType === '4' ? this.cottonDiseaseOptions : this.otherDiseaseOptions

      this.diseaseStatusOptions = this.cropsType === '4' ? this.cottonDiseaseStatus : this.otherDiseaseStatus

      this.cropsTypeDes = this.cropsType === '4' ? '近三年病害情况:' : '病害情况'

      this.form.varietyType = this.cropsType === '4' ? '0' : ''

      this.$nextTick(() => {
        this.businessType = this.outCheckSource.businessType
        if (this.outCheckSource.info) {
          this.form = Object.assign({}, this.outCheckSource.info)
          this.otherDiseaseTypesStatus = this.outCheckSource.info.disease.includes('99') > 0
          this.otherMachineryTypesStatus = this.outCheckSource.info.machineType.includes('99') > 0
          this.form.plantAreas.forEach(item => {
            item.plantAreaLocation = [Number(item.plantAreaProvince), Number(item.plantAreaCity), Number(item.plantAreaCounty), Number(item.plantAreaTown)]
            // item.timeLimit = item.landRentStart && item.landRentStart.length > 0 ? [item.landRentStart, item.landRentEnd] : []
            item.editStatus = false
          })
          this.form.plantInsuranceList.forEach(item => {
            item.editStatus = false
          })
        }
      })
    },
    dialogCancel() {
      this.form = {
        id: '',
        varietyType: '', // 作物类型
        growCycle: [], // 种植周期
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
        plantInsuranceList: [], // 保险公司
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
      if (this.form.insuranceFlag === 'Y' && this.form.plantInsuranceList.length === 0) {
        this.$message.error('请添加保险公司')
        return
      }

      if (this.form.insuranceFlag === 'Y' && this.form.plantInsuranceList.length > 0) {
        var obj = []
        this.form.plantInsuranceList.map(item => {
          if (item.editStatus === true) {
            obj.push(item)
          }
        })
        if (obj.length > 0) {
          this.$message.error('请保存保险公司')
          return
        }
      }

      if (this.form.plantAreas.length === 0) {
        this.$message.error('请添加种植地块')
        return
      }

      if (this.form.plantAreas.length > 0) {
        var array = []
        this.form.plantAreas.map(item => {
          if (item.editStatus === true) {
            array.push(item)
          }
        })
        if (array.length > 0) {
          this.$message.error('请保存种植地块信息')
          return
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.insuranceFlag === 'N') {
            this.form.plantInsuranceList = []
          }
          let disease = []
          if (this.form.diseaseStatus !== '') {
            disease = [this.form.diseaseStatus]
          } else {
            disease = this.form.disease
          }
          this.form.disease = disease
          // const objArr = this.form.plantAreas.map(item => {
          //   item.landRentStart = item.landRentStart.substring(0, item.landRentStart.indexOf('年'))
          //   item.landRentEnd = item.landRentEnd.substring(0, item.landRentEnd.indexOf('年'))
          // })
          var obj = JSON.parse(JSON.stringify(this.form))
          obj.plantAreas.map(item => {
            item.landRentEnd = item.landRentEnd.replace(/[\u4e00-\u9fa5]/g, '')
            item.landRentStart = item.landRentStart.replace(/[\u4e00-\u9fa5]/g, '')
          })
          const saveDict = Object.assign(
            {
              cropsType: this.cropsType.default,
              cycleStart: this.form.growCycle[0],
              cycleEnd: this.form.growCycle[1],
              orderNo: this.$route.query.orderNo,
              customerId: this.$route.query.customerId
            },
            obj
          )
          delete saveDict.growCycle
          saveDict.processingMode = saveDict.processingMode && saveDict.processingMode.join()
          saveDict.machineType = saveDict.machineType && saveDict.machineType.join()
          saveDict.seedSupplyMode = saveDict.seedSupplyMode && saveDict.seedSupplyMode.join()
          saveDict.disease = saveDict.disease && saveDict.disease.join()
          saveDict.salesModeOfAgriculturalProducts = saveDict.salesModeOfAgriculturalProducts && saveDict.salesModeOfAgriculturalProducts.join()
          this.$emit('growInfoSaveInfo', saveDict)
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
    // 添加保险
    addInsurance() {
      this.form.plantInsuranceList.push({
        insuranceAmount: '',
        insuranceCompanyCode: '',
        insuranceCompanyOther: '',
        insurancePremium: ''
      })
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
    // 选择机械化程度
    changeMechanizedDegree(val) {
      this.form.selfMachine = this.form.mechanizedDegree === '3' ? 'N' : 'Y'
      if (!self.selfMachine) {
        this.form.machineType = []
        this.form.machineOtherInfo = ''
      }
    },
    // 查询省下拉框
    getProvinceInfoFun() {
      queryProvinceInfoByAreaId({ areaId: this.provinceId }).then(res => {
        if (res.status === 200) {
          this.addressCascader = [res.data]
        } else {
          this.$message.error(res.message || '查询城市出错')
        }
      })
    },
    // 城市选择器
    addressChange(val) {
      if (this.form.plantAreas.length > 0) {
        this.form.plantAreas[val.$index].plantAreaProvince = val.row.plantAreaLocation[0]
        this.form.plantAreas[val.$index].plantAreaCity = val.row.plantAreaLocation[1]
        this.form.plantAreas[val.$index].plantAreaCounty = val.row.plantAreaLocation[2]
        this.form.plantAreas[val.$index].plantAreaTown = val.row.plantAreaLocation[3]
      }
    },

    // 根据省份id查询城市下拉框
    getCitylistFun(provinceId) {
      queryAreaByAreaId({ areaId: provinceId }).then(res => {
        if (res.status === 200) {
          if (String(res.data.areaId) === String(provinceId)) {
            this.locationForm.selectedProvinceName = res.data.areaName
            this.currentProvinceName = res.data.areaName
            this.currentProvinceId = res.data.areaId
          }
          this.locationForm.cityOptions = res.data.list
        } else {
          this.$message.error(res.message || '查询城市出错')
        }
      })
    },
    /**
     * 租赁期限选择
     *
     *  const a = val.row.waterNature
     * this.$set(this.form.plantAreas[val.$index], 'waterNature', '')
     * this.$set(this.form.plantAreas[val.$index], 'waterNature', a)
     * 这个的写法是因为修改时间后 dataPicker不显示修改后的值  使用取巧方法可实现效果
     */
    leaseTermChange(val) {
      // if (this.form.plantAreas[val.$index].timeLimit && this.form.plantAreas[val.$index].timeLimit.length > 0) {
      //   this.form.plantAreas[val.$index].landRentStart = this.form.plantAreas[val.$index].timeLimit[0]
      //   this.form.plantAreas[val.$index].landRentEnd = this.form.plantAreas[val.$index].timeLimit[1]
      //   this.$set(this.form.plantAreas[val.$index], 'timeLimit', [this.form.plantAreas[val.$index].landRentStart, this.form.plantAreas[val.$index].landRentEnd])
      // } else {
      //   this.form.plantAreas[val.$index].landRentStart = ''
      //   this.form.plantAreas[val.$index].landRentEnd = ''
      //   this.$set(this.form.plantAreas[val.$index], 'timeLimit', [])
      // }
      const a = val.row.waterNature
      this.$set(this.form.plantAreas[val.$index], 'waterNature', '')
      this.$set(this.form.plantAreas[val.$index], 'waterNature', a)
      this.hiddenApplyAreaFlayFun(val.row)
    },
    // 是否可以选择是否申购地块
    hiddenApplyAreaFlayFun(val) {
      // 非自有权属
      if (val.ownershipType === '1') {
        // 自有的不需要
        val.applyAreaFlag = ''
        return true
      } else if (val.ownershipType === '2' || val.ownershipType === '3' || val.ownershipType === '5') {
        return false
      } else if (val.ownershipType === '4' || val.ownershipType === '6') {
        // if (val.timeLimit.length === 0) {
        if (!val.landRentStart || !val.landRentEnd) {
          val.applyAreaFlag = ''
          return true
        } else {
          // if(val.landRentStart.slice(0,4) )
          // if (val.timeLimit.length === 0) {
          if (!val.landRentStart || !val.landRentEnd) {
            val.applyAreaFlag = ''
            return true
          } else {
            const startYear = val.landRentStart
            const nowYear = new Date().getFullYear()
            if (NP.minus(Number(nowYear), Number(startYear)) > 0) {
              val.applyAreaFlag = ''
              return true
            } else {
              return false
            }
          }
        }
      } else {
        val.applyAreaFlag = ''
        return true
      }
    },

    /**
     * 权属类型选择
     */
    ownershipChange(scope) {
      if (scope.row.ownershipType === '1' || scope.row.ownershipType === '2') {
        this.form.plantAreas[scope.$index].timeLimit = []
        this.form.plantAreas[scope.$index].landRentStart = ''
        this.form.plantAreas[scope.$index].landRentEnd = ''
      }
    },
    numberPlantChange(e, scope, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.form.plantAreas[scope.$index], val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.form.plantAreas[scope.$index], val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.form.plantAreas[scope.$index], val, newValue)
        })
      }
    },
    numberInsuranceChange(e, scope, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.form.plantInsuranceList[scope.$index], val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.form.plantInsuranceList[scope.$index], val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.form.plantInsuranceList[scope.$index], val, newValue)
        })
      }
    },
    /**
     * 保险公司添加
     */
    handleInsuranceAdd() {
      this.form.plantInsuranceList.push({
        insuranceAmount: '',
        insuranceCompanyCode: '',
        insuranceCompanyOther: '',
        insurancePremium: '',
        editStatus: true
      })
    },
    // 添加地块
    handleAdd() {
      this.form.plantAreas.push({
        plantAreaProvince: this.currentProvinceId,
        plantAreaCity: '',
        plantAreaCounty: '',
        plantAreaTown: '',
        areaEmployer: '',
        applyAreaFlag: '',
        landNature: '',
        landNatureOtherInfo: '',
        ownershipType: '',
        areaFee: '',
        // timeLimit: [],
        landRentStart: '',
        landRentEnd: '',
        waterNature: '',
        waterNatureOtherInfo: '',
        waterFee: '',
        editStatus: true
      })
    },
    // 保险公司编辑
    handleInsuranceEdit(index, item) {
      this.form.plantInsuranceList = this.form.plantInsuranceList.map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
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
      if ((item.plantAreaLocation && item.plantAreaLocation.length <= 0) || !item.plantAreaLocation) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地块位置' })
      } else if (this.cropsType === '4' && this.businessType === '1' && item.areaEmployer.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择土地发包方' })
      } else if (this.businessType === '2' && !this.hiddenApplyAreaFlayFun(item) && item.applyAreaFlag.length <= 0) {
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
      } else if (item.ownershipType !== '1' && item.areaFee.length > 0 && !validateNum(item.areaFee)) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确的土地流转费（不能输入负数或0）' })
      } else if (item.ownershipType !== '1' && item.ownershipType !== '2' && (!item.landRentStart || !item.landRentEnd)) {
        isVerifyCode = false
        this.$message.error({ message: '请选择地租缴纳期限' })
      } else if (item.landRentEnd.replace(/[\u4e00-\u9fa5]/g, '') * 1 < item.landRentStart.replace(/[\u4e00-\u9fa5]/g, '') * 1) {
        isVerifyCode = false
        this.$message.error({ message: '地租缴纳期限结束年份不可小于开始年份' })
      } else if (item.waterNature.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择水源分类' })
      } else if (item.waterNature === '99' && item.waterNatureOtherInfo.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入水源分类' })
      } else if (item.waterFee.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入水费' })
      } else if (item.waterFee.length > 0 && !validateNumGreatEqualZero(item.waterFee)) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确的水费（不能输入负数）' })
      }
      if (isVerifyCode) {
        this.form.plantAreas = this.form.plantAreas.map(item1 => {
          if (item === item1) {
            item1.editStatus = false
          }
          return item1
        })
      }
    },
    numberChange(e, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.form, val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.form, val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.form, val, newValue)
        })
      }
    },
    // 种植地块删除
    handleDelete(index, item) {
      this.form.plantAreas.splice(index, 1)
    },
    handleInsuranceSave(index, item) {
      let isVerifyCode = true
      if (item.insuranceCompanyCode.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请选择保险公司' })
      } else if (this.insuranceCompanyCode === '99' && item.insuranceCompanyOther.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入保险公司名称' })
      } else if (item.insurancePremium.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入保费' })
      } else if (item.insurancePremium.length > 0 && !validateNum(item.insurancePremium)) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确的保费（不能输入负数或0）' })
      } else if (item.insuranceAmount.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入最高可赔额度' })
      } else if (item.insuranceAmount.length > 0 && !validateNum(item.insuranceAmount)) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确的最高可赔额度（不能输入负数或0）' })
      }
      if (isVerifyCode) {
        this.form.plantInsuranceList = this.form.plantInsuranceList.map(item1 => {
          if (item === item1) {
            item1.editStatus = false
          }
          return item1
        })
      }
    },
    // 种植地块删除
    handleInsuranceDelete(index, item) {
      this.form.plantInsuranceList.splice(index, 1)
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
  .picker {
    display: flex;
  }
}
</style>
