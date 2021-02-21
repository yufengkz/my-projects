<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="880px"
      class="mortgage-info-dialog"
      @open="dialogOpen"
    >
      <!-- 信息填写 -->
      <div class="content-container">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          :closable="tabCloseStatus"
          @tab-remove="removeTab"
          @tab-click="clickTab"
        >
          <el-tab-pane
            :key="item.label"
            v-for="(item,index) in checkedPossessionsTypes"
            :label="item.label"
            :name="item.label"
          >
            <div class="m-t-20">
              <!-- 房产 -->
              <el-form
                v-if="item.value === 'house'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="houseRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="房产类型:" prop="type">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].type"
                          :options="houseTypeSource"
                          size="mini"
                          @change="checkedTypeChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房产面积:" prop="area">
                        <el-input
                          v-model="checkedPossessionsDatas[index].area"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                          @input="numberChange($event,index,'area',99999999999)"
                          @change="numberChange($event,index,'area',99999999999)"
                        >
                          <template slot="append">m²</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="租赁情况:" prop="hasLease">
                        <el-radio-group v-model="checkedPossessionsDatas[index].hasLease">
                          <el-radio label="N">否</el-radio>
                          <el-radio label="Y">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item v-if="checkedPossessionsDatas[index].hasLease === 'Y'" label="租赁金额" prop="rent">
                        <el-input
                          v-model="checkedPossessionsDatas[index].rent"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                          @input="numberChange($event,index,'rent',99999999999)"
                          @change="numberChange($event,index,'rent',99999999999)"
                        >
                          <template slot="append">元/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        v-if="checkedPossessionsDatas[index].hasLease === 'Y'"
                        label="租赁期限"
                        prop="leaseTerm"
                      >
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].leaseTerm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="leaseTermChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="房产地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 建设用地使用权 -->
              <el-form
                v-if="item.value === 'build_land'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="build_landRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="土地类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in build_landTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="checkedPossessionsDatas[index].type === 'other_land'" :span="8">
                      <el-form-item label="其他土地类型:" prop="fourLevelTypeOther">
                        <el-input
                          v-model="checkedPossessionsDatas[index].fourLevelTypeOther"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                        <!-- <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in build_landTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房产面积:" prop="area">
                        <el-input
                          v-model="checkedPossessionsDatas[index].area"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'area',99999999999)"
                          @change="numberChange($event,index,'area',99999999999)"
                        >
                          <template slot="append">m²</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="租赁情况:" prop="hasLease">
                        <el-radio-group v-model="checkedPossessionsDatas[index].hasLease">
                          <el-radio label="N">否</el-radio>
                          <el-radio label="Y">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item v-if="checkedPossessionsDatas[index].hasLease === 'Y'" label="租赁金额" prop="rent">
                        <el-input
                          v-model="checkedPossessionsDatas[index].rent"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'rent',99999999999)"
                          @change="numberChange($event,index,'rent',99999999999)"
                        >
                          <template slot="append">元/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        v-if="checkedPossessionsDatas[index].hasLease === 'Y'"
                        label="租赁期限"
                        prop="leaseTerm"
                      >
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].leaseTerm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="leaseTermChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="房产地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 农村地产 -->
              <el-form
                v-if="item.value === 'countryside_land'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="build_landRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="土地类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in countryside_landTypeSource"
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
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="房产面积:" prop="area">
                        <el-input
                          v-model="checkedPossessionsDatas[index].area"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'area',99999999999)"
                          @change="numberChange($event,index,'area',99999999999)"
                        >
                          <template slot="append">m²</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="租赁情况:" prop="hasLease">
                        <el-radio-group v-model="checkedPossessionsDatas[index].hasLease">
                          <el-radio label="N">否</el-radio>
                          <el-radio label="Y">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item v-if="checkedPossessionsDatas[index].hasLease === 'Y'" label="租赁金额" prop="rent">
                        <el-input
                          v-model="checkedPossessionsDatas[index].rent"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'rent',99999999999)"
                          @change="numberChange($event,index,'rent',99999999999)"
                        >
                          <template slot="append">元/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        v-if="checkedPossessionsDatas[index].hasLease === 'Y'"
                        label="租赁期限"
                        prop="leaseTerm"
                      >
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].leaseTerm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="leaseTermChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="房产地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 专用设备 -->
              <el-form
                v-if="item.value === 'special_machine'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="special_machineRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="设备类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in special_machineTypeSource"
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
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="购买时间:" prop="buyTime">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].buyTime"
                          value-format="yyyy-MM-dd 00:00:00"
                          type="date"
                          style="width:100%"
                          placeholder="选择日期"
                          :picker-options="buyPickerOptions"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="购买价格:" prop="buyPrice">
                        <el-input
                          v-model="checkedPossessionsDatas[index].buyPrice"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'buyPrice',99999999999)"
                          @change="numberChange($event,index,'buyPrice',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="设备所在地:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 农副产品 -->
              <el-form
                v-if="item.value === 'agriculture_product'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="agriculture_productRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="产品类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in agricultureTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col v-if="checkedPossessionsDatas[index].type === 'other_product'" :span="8">
                      <el-form-item label="其他产品类型:" prop="fourLevelTypeOther">
                        <el-input
                          v-model="checkedPossessionsDatas[index].fourLevelTypeOther"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="数量:" prop="number">
                        <el-input
                          v-model="checkedPossessionsDatas[index].number"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="11"
                          v-number-input.float="0"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'number',99999999999)"
                          @change="numberChange($event,index,'number',99999999999)"
                        >
                          <template slot="append">公斤</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="品质:" prop="quality">
                        <!-- <el-input
                          v-model="checkedPossessionsDatas[index].quality"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>-->
                        <el-select v-model="checkedPossessionsDatas[index].quality" :clearable="true" placeholder="请选择">
                          <el-option
                            v-for="item in guanranteeEnum.queryTypeEnumOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="单价:" prop="unitPrice">
                        <el-input
                          v-model="checkedPossessionsDatas[index].unitPrice"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'unitPrice',99999999999)"
                          @change="numberChange($event,index,'unitPrice',99999999999)"
                        > <template slot="append">元/公斤</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="存储地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 机器设备 -->
              <el-form
                v-if="item.value === 'equipment'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="equipmentRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="16">
                      <el-form-item label="设备类型:" prop="type">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].type"
                          :options="equipmentTypeSource"
                          size="mini"
                          @change="checkedTypeChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="发动机编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="30"
                        ></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="购买时间:" prop="buyTime">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].buyTime"
                          value-format="yyyy-MM-dd 00:00:00"
                          type="date"
                           style="width:100%"
                          placeholder="选择日期"
                          :picker-options="buyPickerOptions"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="购买价格:" prop="buyPrice">
                        <el-input
                          v-model="checkedPossessionsDatas[index].buyPrice"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'buyPrice',99999999999)"
                          @change="numberChange($event,index,'buyPrice',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="50"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="租赁情况:" prop="hasLease">
                        <el-radio-group v-model="checkedPossessionsDatas[index].hasLease">
                          <el-radio label="N">否</el-radio>
                          <el-radio label="Y">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item v-if="checkedPossessionsDatas[index].hasLease === 'Y'" label="租赁金额" prop="rent">
                        <el-input
                          v-model="checkedPossessionsDatas[index].rent"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="50"
                        >
                          <template slot="append">元/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        v-if="checkedPossessionsDatas[index].hasLease === 'Y'"
                        label="租赁期限"
                        prop="leaseTerm"
                      >
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].leaseTerm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="leaseTermChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="设备所在地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 生物资产 -->
              <el-form
                v-if="item.value === 'breed'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="breedRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="资产类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in breedTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="品质:" prop="quality">
                        <el-select v-model="checkedPossessionsDatas[index].quality" :clearable="true" placeholder="请选择">
                          <el-option
                            v-for="item in guanranteeEnum.queryTypeEnumOptions"
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
                      <el-form-item label="数量:" prop="number">
                        <el-input
                          v-model="checkedPossessionsDatas[index].number"
                          placeholder="请输入"
                          min="0"
                          maxlength="11"
                          @input='(e)=>{changeNumberPoint(e,index)}'
                          @mousewheel.native.prevent
                        >
                          <!-- v-number-input.float="0" -->
                          <template slot="append">头</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                          @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="养殖地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <!-- <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>-->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 农村土地承包经营权 -->
              <el-form
                v-if="item.value === 'land_contract'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="land_contractRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经营权类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in land_contractTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="面积:" prop="area">
                        <el-input
                          v-model="checkedPossessionsDatas[index].area"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'area',99999999999)"
                          @change="numberChange($event,index,'area',99999999999)"
                        >
                          <template slot="append">亩</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="承包期限:" prop="contractingTime">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].contractingTime"
                          type="monthrange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="contractingChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="租赁情况:" prop="hasLease">
                        <el-radio-group v-model="checkedPossessionsDatas[index].hasLease">
                          <el-radio label="N">否</el-radio>
                          <el-radio label="Y">是</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item v-if="checkedPossessionsDatas[index].hasLease === 'Y'" label="租赁金额" prop="rent">
                        <el-input
                          v-model="checkedPossessionsDatas[index].rent"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'rent',99999999999)"
                          @change="numberChange($event,index,'rent',99999999999)"
                        >
                          <template slot="append">元/年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        v-if="checkedPossessionsDatas[index].hasLease === 'Y'"
                        label="租赁期限"
                        prop="leaseTerm"
                      >
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].leaseTerm"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="leaseTermChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 林权 -->
              <el-form
                v-if="item.value === 'forestry'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="forestryRules"
                label-position="right"
                label-width="120px"
                class="m-t-20 block-el-select"
              >
                <div>
                  <el-row :gutter="10" class="m-t-30">
                    <el-col :span="8">
                      <el-form-item label="所属权属:" prop="owner">
                        <el-select
                          v-model="checkedPossessionsDatas[index].owner"
                          @change="changeOwner(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in owerTypeSource"
                            :key="item.roleCustomerId"
                            :label="item.roleCustomerName"
                            :value="item.roleCustomerId"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="经营权类型:" prop="type">
                        <el-select
                          v-model="checkedPossessionsDatas[index].type"
                          @change="checkedSingleTypeChange(index)"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in forestryTypeSource"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="面积:" prop="area">
                        <el-input
                          v-model="checkedPossessionsDatas[index].area"
                          placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'area',99999999999)"
                          @change="numberChange($event,index,'area',99999999999)"
                        >
                          <template slot="append">m²</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="权证编号:" prop="warrantNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].warrantNo"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="树龄:" prop="treeAge">
                        <el-input
                          v-model="checkedPossessionsDatas[index].treeAge"
                          placeholder="请输入"
                          min="0"
                          maxlength="4"
                          @input='(e)=>{changeNumber(e,index)}'
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                        >
                          <!-- @input='(e)=>{changeNumber(e,index)}' -->
                          <template slot="append">年</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="树种" prop="treeSpecies">
                        <el-input
                          v-model="checkedPossessionsDatas[index].treeSpecies"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                        <!-- <el-select
                          v-model="checkedPossessionsDatas[index].treeSpecies"
                          :clearable="true"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in guanranteeEnum.treeSpeciesEnumOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="他项权利证书编号:" prop="otherCertificateNo">
                        <el-input
                          v-model="checkedPossessionsDatas[index].otherCertificateNo"
                          placeholder="请输入"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                         placeholder="请输入"
                          type="number"
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                          @mousewheel.native.prevent
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定机构" prop="identifyOrgan">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyOrgan"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="承包期限:" prop="contractingTime">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].contractingTime"
                          type="daterange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="contractingChange(index)"
                          value-format="yyyy-MM-dd 00:00:00"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10">
                      <el-form-item prop="chooseAddress" label="地址:">
                        <el-cascader
                          v-model="checkedPossessionsDatas[index].chooseAddress"
                          :options="addressCascader"
                          :props="cityProps"
                          size="mini"
                          @change="addressChange(index)"
                          clearable
                        ></el-cascader>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="detailAddress" label label-width="0px">
                        <el-input v-model="checkedPossessionsDatas[index].detailAddress" placeholder="详细地址" maxLength = '50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile = "UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-button size="mini" class="wide-button" @click="addNewTab(editableTabsValue)">添加</el-button>
          <el-button size="mini" type="primary" class="wide-button" @click="submitForm()">保存</el-button>
          <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getcentral } from '@/api/core-enterprise'
import { handelDigital } from '@/utils/format.js'
import { mortgageCreate } from '@/api/business-common'
import { mapGetters } from 'vuex'

export default {
  components: {
    // ImageUpload: () => import('@/components/demo')
    ImageInfoTabs: () => import('@/components/ImageInfoTabs')
  },
  name: 'MortgageInfoDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 外部传入所有收入的对象
     * {
        label: '不动产抵押',
        value: 'unmovable',
        options: [
          {
            value: 'house',
            label: '房产'
          },
          {
            value: 'build_land',
            label: '建设用地使用权'
          },
          {
            value: 'countryside_land',
            label: '农村地产'
          },
          {
            value: 'special_machine',
            label: '专业设备'
          }
        ]
      },
      {
        label: '动产抵押',
        value: 'movable',
        options: [
          {
            value: 'agriculture_product',
            label: '农副产品'
          },
          {
            value: 'equipment',
            label: '机器设备'
          },
          {
            value: 'breed',
            label: '生物资产'
          }
        ]
      },
      {
        label: '权力抵押',
        value: 'power',
        options: [
          {
            value: 'land_contract',
            label: '农村土地承包经营权'
          },
          {
            value: 'forestry',
            label: '林权'
          }
        ]
      }
     */
    outCheckSource: {
      type: Object
    },
    /**
     *  外部传入的所属权属
     */
    outOwerTypeSource: {
      type: Array
    },
    /**
     * 联级选择数据源
     * 内部mapGetters获取报无法找到属性和方法
     * 现只能通过属性外部传值
     */
    // TODO: 尝试别的方式
    cascaderOptions: {
      type: Array
    },
    cascaderCityOptions: {
      type: Array
    }
  },
  mounted() {},
  data() {
    const validatorFun = (rule, value, callback) => {
      const newValue = handelDigital(value, true, '2')
      if (newValue === '') {
        callback(new Error('请输入参数'))
      } else if (Number(newValue) === 0) {
        callback(new Error('输入参数不能为零'))
      } else if (/^([0-9]\d{0,})([.]\d{1,2})?$/.test(value) === false) {
        callback(new Error('输入参数必须是整数或小数'))
      } else {
        callback()
      }
    }
    return {
      editableTabsValue: '',
      tabIndex: 0,
      currentTabIndex: '0',
      checkedPossessionsTypes: [],
      owerTypeSource: [],
      buyPickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      cityProps: {
        children: 'list',
        label: 'areaName',
        value: 'areaId'
      },
      // owerTypeSource: [
      //   {
      //     code: '1',
      //     label: '借款人'
      //   },
      //   {
      //     code: '3',
      //     label: '担保人'
      //   }
      // ],
      /**
       *
       * houseForm: {
        owner: '', // 所属权属
        ownerId
        ownerRole
        type: '', // 房产类型
        warrantNo: '', // 权证编号
        otherCertificateNo: '', // 他项权利编号
        area: '', // 房产面积
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
        hasLease: N, // 租赁情况
        rent: '', // 租赁价格
        leaseTerm: '', // 租赁期限
        chooseAddress: '', // 省市区
        detailAddress: '' // 详情地址
      },
       // 建设用地使用权
      build_landForm: {
        owner: '', // 所属权属
         ownerId
        ownerRole
        type: '', // 土地类型
        area: '', // 房产面积
        warrantNo: '', // 权证编号
        otherCertificateNo: '', // 他项权利编号
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
        hasLease: N, // 租赁情况
        rent: '', // 租赁价格
        leaseTerm: '', // 租赁期限
        chooseAddress: '', // 省市区
        detailAddress: '' // 详情地址
      },
      // 农村地产
    countryside_landForm:{
        owner: '', // 所属权属
         ownerId
        ownerRole
        type: '', // 土地类型
        area: '', // 房产面积
        warrantNo: '', // 权证编号
        otherCertificateNo: '', // 他项权利编号
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
        hasLease: N, // 租赁情况
        rent: '', // 租赁价格
        leaseTerm: '', // 租赁期限
        chooseAddress: '', // 省市区
        detailAddress: '' // 详情地址
      }
      // 专用设备
      special_machineForm:{
        owner: '', // 所属权属
         ownerId
        ownerRole
        type: '', // 设备类型
        buyTime: '', // 购买时间
        warrantNo: '', // 权证编号
        buyPrice: '', // 购买价格
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
        // hasLease: N, // 租赁情况
        // rent: '', // 租赁价格
        // leaseTerm: '', // 租赁期限
        chooseAddress: '', // 设备所在地省市区
        detailAddress: '' // 详情地址
      }
       */
      checkedPossessionsDatas: [],
      houseTypeSource: [
        {
          label: '居住房产',
          value: 'live_house',
          children: [
            {
              value: 'normal_house',
              label: '普通住宅'
            },
            {
              value: 'apartment_house',
              label: '高档公寓'
            },
            {
              value: 'villa_house',
              label: '别墅'
            },
            {
              value: 'affordable_house',
              label: '经济适用房(限价房、保障房)'
            },
            {
              value: 'other_house',
              label: '其他居住用房(非农村宅基地)'
            }
          ]
        },
        {
          label: '商业房产',
          value: 'business_house',
          children: [
            {
              value: 'market',
              label: '商铺、商场'
            },
            {
              value: 'hotel',
              label: '宾馆酒店'
            },
            {
              value: 'workshop',
              label: '工业厂房'
            },
            {
              value: 'storage',
              label: '仓储'
            },
            {
              value: 'multi_office',
              label: '多层办公楼'
            },
            {
              value: 'high_office',
              label: '高层办公楼'
            },
            {
              value: 'apartment_office',
              label: '公寓式办公楼'
            },
            {
              value: 'other_business',
              label: '其他商业用房'
            },
            {
              value: 'other_building',
              label: '其他房屋构筑物或地上附着物'
            }
          ]
        }
      ],
      build_landTypeSource: [
        {
          value: 'live_land',
          label: '居住用地'
        },
        {
          value: 'business_land',
          label: '商业用地'
        },
        {
          value: 'industry_land',
          label: '工业用地'
        },
        {
          value: 'group_land',
          label: '农村集体建设用地'
        },
        {
          value: 'other_land',
          label: '其他用地'
        }
      ],
      agricultureTypeSource: [
        {
          value: 'corn',
          label: '玉米'
        },
        {
          value: 'cotton',
          label: '棉花'
        },
        {
          value: 'potato',
          label: '马铃薯'
        },
        {
          value: 'wheat',
          label: '小麦'
        },
        {
          value: 'silage',
          label: '青贮'
        },
        {
          value: 'rice',
          label: '水稻'
        },
        {
          value: 'apple',
          label: '苹果'
        },
        {
          value: 'other_product',
          label: '其他'
        }
      ],
      countryside_landTypeSource: [
        {
          value: 'house_land',
          label: '乡镇、村企业房屋及用地'
        },
        {
          value: 'homestead_land',
          label: '农村宅基地'
        },
        {
          value: 'greenhouse_land',
          label: '大棚(产权证)'
        },
        {
          value: 'cold_storage_land',
          label: '冷库(产权证)'
        }
      ],
      special_machineTypeSource: [
        {
          value: 'drying_tower',
          label: '烘干塔'
        },
        {
          value: 'rice_process',
          label: '稻米加工设备'
        },
        {
          value: 'corn_process',
          label: '玉米加工设备'
        },
        {
          value: 'wheat_process',
          label: '小麦加工设备'
        },
        {
          value: 'weighbridge',
          label: '地磅'
        },
        {
          value: 'machine_well',
          label: '机井'
        }
      ],
      equipmentTypeSource: [
        {
          label: '交通运输工具',
          value: 'transportation_tool',
          children: [
            {
              value: 'family_car',
              label: '家用汽车'
            },
            {
              value: 'goods_car',
              label: '货运汽车'
            },
            {
              value: 'guest_car',
              label: '客运汽车'
            }
          ]
        },
        {
          label: '农业机械',
          value: 'agricultural_machinery',
          children: [
            {
              value: 'domestic_machine',
              label: '国产农机及配套农具'
            },
            {
              value: 'import_machine',
              label: '进口农机及配套农具'
            },
            {
              value: 'unmanned_machine',
              label: '无人机及配套设备'
            }
          ]
        }
      ],
      breedTypeSource: [
        {
          value: 'breed_pig',
          label: '种猪'
        },
        {
          value: 'sows',
          label: '母猪'
        },
        {
          value: 'commercial_pig',
          label: '商品猪'
        },
        {
          value: 'cattle',
          label: '肉牛'
        },
        {
          value: 'cow',
          label: '奶牛'
        }
      ],
      land_contractTypeSource: [
        {
          value: 'household_contract',
          label: '以家庭承包方式取得的土地承包经营权'
        },
        {
          value: 'auction_contract',
          label: '以招标、拍卖、公开协商等方式取得的土地承包经营权'
        },
        {
          value: 'circulation_contract',
          label: '以流转方式取得的土地承包经营权'
        },
        {
          value: 'ground_attachment',
          label: '地上附着物'
        }
      ],
      forestryTypeSource: [
        {
          value: 'wood_tree',
          label: '林地使用权和林木所有权'
        },
        {
          value: 'fruit_tree',
          label: '果树所有权'
        }
      ],
      addressCascader: [],
      houseRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择房产类型', trigger: 'blur' }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        area: [
          { required: true, message: '请输入房产面积', trigger: 'blur' },
          {
            validator: validatorFun,
            trigger: 'blur'
          }
        ],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        hasLease: [{ required: true, message: '请选择是否', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入租赁金额', trigger: 'blur' }],
        leaseTerm: [{ required: true, message: '请输入租赁期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择房产地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入房产详细地址', trigger: 'blur' }]
      },
      build_landRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择土地类型', trigger: 'blur' }],
        fourLevelTypeOther: [{ required: true, message: '请输入土地类型', trigger: 'blur' }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        area: [{ required: true, message: '请输入土地面积', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        hasLease: [{ required: true, message: '请选择是否', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入租赁金额', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        leaseTerm: [{ required: true, message: '请输入租赁期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择房产地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入房产详细地址', trigger: 'blur' }]
      },
      countryside_landRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择土地类型', trigger: 'blur' }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        area: [{ required: true, message: '请输入土地面积', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        hasLease: [{ required: true, message: '请选择是否', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入租赁金额', trigger: 'blur' }],
        leaseTerm: [{ required: true, message: '请输入租赁期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择房产地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入房产详细地址', trigger: 'blur' }]
      },
      special_machineRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        buyTime: [{ required: true, message: '请输入购买时间', trigger: 'blur' }],
        buyPrice: [{ required: true, message: '请输入购买价格', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择设备所在地', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入设备详细地址', trigger: 'blur' }]
      },
      agriculture_productRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择产品类型', trigger: 'blur' }],
        fourLevelTypeOther: [{ required: true, message: '请输入其他类型', trigger: 'blur' }],
        number: [{ required: true, message: '请输入产品数量', trigger: 'blur' }],
        quality: [{ required: true, message: '请输入品质', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择存储地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入存储详细地址', trigger: 'blur' }]
      },
      // 机器设备
      equipmentRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择设备类型', trigger: 'blur' }],
        warrantNo: [{ required: true, message: '请输入发动机编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        buyTime: [{ required: true, message: '请输入购买时间', trigger: 'blur' }],
        buyPrice: [{ required: true, message: '请输入购买价格', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        hasLease: [{ required: true, message: '请选择是否', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入租赁金额', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        leaseTerm: [{ required: true, message: '请输入租赁期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择设备所在地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入设备所在详细地址', trigger: 'blur' }]
      },
      // 生物资产
      breedRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择资产类型', trigger: 'blur' }],
        quality: [{ required: true, message: '请选择品质', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        number: [{ required: true, message: '请输入数量', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择养殖地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入养殖详细地址', trigger: 'blur' }]
      },
      // 农村土地承包经营权
      land_contractRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择经营权类型', trigger: 'blur' }],
        contractingTime: [{ required: true, message: '请选择承包期限', trigger: 'blur' }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        area: [{ required: true, message: '请输入房产面积', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        hasLease: [{ required: true, message: '请选择是否', trigger: 'blur' }],
        rent: [{ required: true, message: '请输入租赁金额', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        leaseTerm: [{ required: true, message: '请输入租赁期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      // 林权
      forestryRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        type: [{ required: true, message: '请选择经营权类型', trigger: 'blur' }],
        treeSpecies: [{ required: true, message: '请选择树种', trigger: 'blur' }],
        treeAge: [{ required: true, message: '请输入树龄', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        warrantNo: [{ required: false, message: '请输入权证编号', trigger: 'blur' }],
        otherCertificateNo: [{ required: false, message: '请输入他项权利编号', trigger: 'blur' }],
        area: [{ required: true, message: '请输入房产面积', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }, {
          validator: validatorFun,
          trigger: 'blur'
        }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        contractingTime: [{ required: true, message: '请选择承包期限', trigger: 'blur' }],
        chooseAddress: [{ required: true, message: '请选择房产地址', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入房产详细地址', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['guanranteeEnum']),
    tabCloseStatus() {
      return this.checkedPossessionsTypes.length > 1
    }
  },
  created() {
    // getcentral().then(res => {
    //   if (res.code === 200) {
    //     this.cascaderOptions = res.data
    //   }
    // })
  },
  methods: {
    changeNumber(e, index) {
      if (!isNaN(Number(e))) {
        if (e.indexOf('.') !== -1) {
          this.checkedPossessionsDatas[index].treeAge = e
        } else {
          this.checkedPossessionsDatas[index].treeAge = Number(e)
        }
      }
    },
    changeNumberPoint(e, index) {
      this.checkedPossessionsDatas[index].number = e && e.replace(/\D/g, '')
    },
    // 弹窗打开时赋值
    dialogOpen() {
      this.checkedPossessionsTypesFun()
      this.owerTypeSource = this.outOwerTypeSource
    },
    checkedPossessionsTypesFun() {
      const newTabName = this.outCheckSource.label + ++this.tabIndex
      this.checkedPossessionsTypes.push({
        label: newTabName,
        value: this.outCheckSource.value
      })
      this.pushEmptData(this.outCheckSource.value)
      this.editableTabsValue = newTabName
      this.addressCascader = this.cascaderOptions
    },
    // 修改权属
    changeOwner(val) {
      if (this.checkedPossessionsDatas.length > 0) {
        var strs = [] // 定义一数组
        strs = this.checkedPossessionsDatas[val].owner.split('_') // 字符分割
        this.checkedPossessionsDatas[val].ownerId = strs[1]
        this.checkedPossessionsDatas[val].ownerRole = strs[0]
      }
    },
    // 联机选择器 类型
    checkedTypeChange(val) {
      if (this.checkedPossessionsDatas.length > 0) {
        this.checkedPossessionsDatas[val].threeLevelType = this.checkedPossessionsDatas[val].type[0]
        this.checkedPossessionsDatas[val].fourLevelType = this.checkedPossessionsDatas[val].type[1]
      }
    },
    //  单级选择器
    checkedSingleTypeChange(val) {
      if (this.checkedPossessionsDatas.length > 0) {
        this.checkedPossessionsDatas[val].threeLevelType = this.checkedPossessionsDatas[val].type
      }

      if (!(this.checkedPossessionsDatas[val].type === 'other_land' || this.checkedPossessionsDatas[val].type === 'other_product')) {
        this.checkedPossessionsDatas[val].fourLevelTypeOther = ''
      }
    },
    // 城市选择器
    addressChange(val) {
      if (this.checkedPossessionsDatas.length > 0) {
        this.checkedPossessionsDatas[val].address = this.checkedPossessionsDatas[val].chooseAddress.toString()
      }
    },
    /**
     * 租赁期限选择
     */
    leaseTermChange(val) {
      this.checkedPossessionsDatas[val].leaseTermStart = this.checkedPossessionsDatas[val].leaseTerm[0]
      this.checkedPossessionsDatas[val].leaseTermEnd = this.checkedPossessionsDatas[val].leaseTerm[1]
    },
    /**
     * 承包期限
     */
    contractingChange(val) {
      this.checkedPossessionsDatas[val].contractingStart = this.checkedPossessionsDatas[val].contractingTime[0]
      this.checkedPossessionsDatas[val].contractingEnd = this.checkedPossessionsDatas[val].contractingTime[1]
    },
    updateImageData(params) {
      const index = this.checkedPossessionsTypes.findIndex((item, index) => item.label === this.editableTabsValue)
      this.$set(this.checkedPossessionsDatas[index].listMap, params.key, params.val)
    },
    // 上传文件
    UploadFile(val) {},
    addNewTab(targetName) {
      const newTabName = this.outCheckSource.label + ++this.tabIndex
      this.checkedPossessionsTypes.push({
        label: newTabName,
        value: this.outCheckSource.value
      })
      this.pushEmptData(this.outCheckSource.value)
      this.editableTabsValue = newTabName
    },

    pushEmptData(modelType) {
      if (modelType === 'house') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 房产类型
          warrantNo: '', // 权证编号
          otherCertificateNo: '', // 他项权利编号
          area: '', // 房产面积
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          hasLease: 'N', // 租赁情况
          rent: '', // 租赁价格
          leaseTerm: '', // 租赁期限
          leaseTermStart: '', // 租赁期限开始
          leaseTermEnd: '', // 租赁期结束
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'build_land') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 土地类型
          fourLevelTypeOther: '', // 土地类型
          warrantNo: '', // 权证编号
          otherCertificateNo: '', // 他项权利编号
          area: '', // 土地面积
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          hasLease: 'N', // 租赁情况
          rent: '', // 租赁价格
          leaseTerm: '', // 租赁期限
          leaseTermStart: '', // 租赁期限开始
          leaseTermEnd: '', // 租赁期结束
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'countryside_land') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 土地类型
          warrantNo: '', // 权证编号
          otherCertificateNo: '', // 他项权利编号
          area: '', // 土地面积
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          hasLease: 'N', // 租赁情况
          rent: '', // 租赁价格
          leaseTerm: '', // 租赁期限
          leaseTermStart: '', // 租赁期限开始
          leaseTermEnd: '', // 租赁期结束
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'special_machine') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属权属
          type: '', // 设备类型
          warrantNo: '', // 权证编号
          buyTime: '', // 购买时间
          buyPrice: '', // 购买价格
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_contract_invoice',
              tabName: '购买合同及发票'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'agriculture_product') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '',
          fourLevelTypeOther: '', // 类型
          number: '', // 数量
          quality: '', // 品质
          otherCertificateNo: '', // 他项权利编号
          unitPrice: '', // 单价
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_buy_receipt',
              tabName: '购买凭证或自有产权证明照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'equipment') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 设备类型
          warrantNo: '', // 发动机编号
          otherCertificateNo: '', // 他项权利编号
          buyTime: '', // 购买时间
          buyPrice: '',
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          hasLease: 'N', // 租赁情况
          rent: '', // 租赁价格
          leaseTerm: '', // 租赁期限
          leaseTermStart: '', // 租赁期限开始
          leaseTermEnd: '', // 租赁期结束
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_contract_invoice',
              tabName: '购买合同及发票'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_drive_license',
              tabName: '驾驶证照片'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'breed') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 设备类型
          quality: '', // 品质
          otherCertificateNo: '', // 他项权利编号
          number: '', // 数量
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_buy_receipt',
              tabName: '购买凭证或自有证明'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            },
            {
              code: 'mortgage_breed_insure',
              tabName: '生物资产投保证明'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'land_contract') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 经营权类型
          contractingTime: '', // 承包期限
          warrantNo: '', // 权证编号
          otherCertificateNo: '', // 他项权利编号
          area: '', // 房产面积
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          hasLease: 'N', // 租赁情况
          rent: '', // 租赁价格
          leaseTerm: '', // 租赁期限
          leaseTermStart: '', // 租赁期限开始
          leaseTermEnd: '', // 租赁期结束
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片',
              imageUrls: []
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'forestry') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          type: '', // 经营权类型
          treeSpecies: '', // 树种
          treeAge: '', // 树龄
          contractingTime: '', // 承包期限
          warrantNo: '', // 权证编号
          otherCertificateNo: '', // 他项权利编号
          area: '', // 房产面积
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          chooseAddress: '', // 省市区
          detailAddress: '', // 详情地址
          oneLevelType: this.outCheckSource.group,
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'mortgage_file',
              tabName: '抵押物照片'
            },
            {
              code: 'mortgage_warrant',
              tabName: '权证照片'
            },
            {
              code: 'mortgage_receipt',
              tabName: '入押回执'
            },
            {
              code: 'mortgage_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      }
    },
    // 关闭弹窗触发
    dialogCancel() {
      this.$confirm('关闭弹窗将丢失当前维护数据，是否关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 初始化数据
        this.checkedPossessionsTypes = []
        this.checkedPossessionsDatas = []
        this.tabIndex = 0
        // 通知父组件关闭
        this.$emit('dialogCancel')
      })
    },
    /** 保存 */
    submitForm() {
      var pResult = {}
      for (let i = 0; i < this.checkedPossessionsDatas.length; i++) {
        var varName = 'p' + i // 动态定义变量名
        pResult[varName] = new Promise((resolve, reject) => {
          this.$refs[`form${i}`][0].validate(valid => {
            if (valid) {
              var fileStatu = false
              const keys = Object.keys(this.checkedPossessionsDatas[i].listMap)
              for (const key of Object.values(keys)) {
                if (this.checkedPossessionsDatas[i].listMap[key].length > 0) {
                  fileStatu = true
                }
              }
              if (fileStatu) {
                resolve()
              } else {
                reject(this.checkedPossessionsTypes[i].label + '影像资料')
              }
            } else {
              reject(this.checkedPossessionsTypes[i].label)
            }
          })
        })
      }
      Promise.all(Object.values(pResult))
        .then(() => {
          // // 保存
          var saveDict = {
            mortgages: this.checkedPossessionsDatas
          }
          mortgageCreate(this.outCheckSource.value, saveDict).then(res => {
            if (res.status === 200) {
              this.$emit('mortgageSaveInfo', res.data)
              this.checkedPossessionsTypes = []
              this.checkedPossessionsDatas = []
            } else {
              this.$message.error(res.message || '创建失败，请稍后重试')
            }
          })
        })
        .catch(value => {
          this.$message.error(`请填写${value}必填字段`)
        })
    },
    numberChange(e, index, val, max) {
      const newValue = Number(handelDigital(e, true, '2'))
      if (newValue === 0) {
        this.$set(this.checkedPossessionsDatas[index], val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.checkedPossessionsDatas[index], val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.checkedPossessionsDatas[index], val, newValue)
        })
      }
    },
    // 点击tab
    clickTab(targetName) {},
    // 删除tab
    removeTab(targetName) {
      this.$confirm(`是否移除${targetName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tabs = this.checkedPossessionsTypes
        let activeName = this.editableTabsValue
        let currentIndex
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.label === targetName) {
              currentIndex = index
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.label
              }
            }
          })
        }
        // 删除所在tab的数据
        this.checkedPossessionsDatas.splice(currentIndex, 1)
        this.checkedPossessionsTypes = tabs.filter(tab => tab.label !== targetName)
        this.editableTabsValue = activeName
      })
    }
  }
}
</script>
<style lang="scss">
.mortgage-info-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    height: 0px;
  }
  .el-dialog__title {
    color: #59676f;
  }
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .app-container {
    padding: 10px;
  }
  .content-container {
    padding: 30px 0px;
  }
  // .dialog-section-bar {
  //   color: $primary;
  // }
  // .dialog-section {
  //   color: black;
  // }
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  // // 表单样式调整
  // .el-form-item {
  //   margin-bottom: 0;
  //   margin-left: 10px;
  // }
  // .el-form-item__label {
  //   font-size: 14px;
  //   color: #59676f;
  //   line-height: 40px;
  //   padding: 0;
  // }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }
  .el-checkbox-group {
    .el-checkbox {
      // margin-right: 5px;
      margin-left: 30px;
      margin-top: 30px;
      width: 200px;
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
