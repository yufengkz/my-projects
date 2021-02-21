<template>
  <div class="app-container">
    <v-form title="基本信息补充">
      <template slot="content">
        <el-form
          ref="basicForm"
          :model="basicForm"
          :rules="basicFormRules"
          size="mini"
          class="m-t-20 p-l-10 block-el-select"
          label-position="right"
          label-width="140px"
        >
          <el-row :gutter="20" class="m-l-0">
            <el-col :span="6">
              <el-form-item prop="loanCustomerType" label="客户类型:" label-width="100px">
                <el-select v-model="basicForm.loanCustomerType" placeholder="请选择" clearable @change="handleChageCustomerType">
                  <el-option v-for="(item, key) in commonEnum.loanCustomerType" :key="key" :label="item" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" v-if="basicForm.loanCustomerType === '2'">
              <el-form-item prop="loanCustomerTypeOne" label label-width="0px">
                <el-select v-model="basicForm.loanCustomerTypeOne" placeholder="请选择" clearable>
                  <el-option
                    v-for="(item, key) in this.commonEnum.loanCustomerTypeOne"
                    :key="key"
                    :label="item"
                    :value="key"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="newMapFlag" label="是否首次与MAP合作:" label-width="150px">
                <el-select v-model="basicForm.newMapFlag" placeholder="请选择" clearable>
                  <el-option v-for="(item, key) in commonEnum.newUserFlag" :key="key" :label="item" :value="key"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="m-l-0">
            <el-col :span="6">
              <el-form-item prop="productId" label="选择申请产品:" label-width="100px">
                <el-select v-model="basicForm.productId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in productList"
                    :key="item.id"
                    :label="item.productName"
                    :value="item.productName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </v-form>
    <v-form title="业务风险预判">
      <template slot="content">
        <span class="all-subtitle m-l-20">借款人</span>
        <div class="m-t-10 m-l-30">
          <DescriptionList :content="self" class="m-l-30">
            <Description label="征信授权模式">
              <!-- TODO: 查证审批拒绝、 查征审批拒绝 待改 11.09 -->
              {{ self.authPattern$FICDictName }}
              <tag v-show="self.authFlag === 'Y'">已签署</tag>
              <el-tooltip v-show="self.authFlag === 'A'" class="item" effect="dark" content="拒绝原因" placement="right">
                <tag type="danger">查征审批拒绝</tag>
              </el-tooltip>
              <tag v-show="self.authFlag === 'N'" type="warning">签署失败</tag>
              <tag v-show="self.authFlag === null" type="info">未签署</tag>
            </Description>
            <Description label="风险等级">{{ self.riskGrade }}</Description>
            <Description label="风险评分">{{ self.riskScore }}</Description>
          </DescriptionList>
        </div>
      </template>
    </v-form>
    <!-- 共借人 -->
    <v-form title="共借人授权">
      <template slot="content">
        <el-form
          ref="commonForm"
          :model="commonForm"
          :rules="commonFormRules"
          size="mini"
          class="m-t-20 p-l-10 block-el-select"
          label-position="right"
          label-width="140px"
        >
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="与借款人关系:" label-width="130px" prop="relation">
                <el-select v-model="commonForm.relation" placeholder="请选择" :disabled="relationDisable" clearable>
                  <el-option
                    v-for="item in commonEnum.relationshipOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="customerName" label="姓名:" label-width="130px">
                <el-input v-model="commonForm.customerName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="idCardNo" label="身份证号:" label-width="130px">
                <el-input v-model="commonForm.idCardNo" placeholder="请输入" maxlength="18"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="mobile" label="手机号码:" label-width="130px">
                <el-input v-model="commonForm.mobile" placeholder="请输入" maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item prop="authPattern" label="征信授权模式:" label-width="130px">
                <el-radio-group v-model="commonForm.authPattern">
                  <el-radio v-for="(item, key) in this.commonEnum.authPattern" :key="key" :label="key">{{ item }}</el-radio>
                </el-radio-group>&nbsp;&nbsp;&nbsp;
                <el-tag v-show="commonForm.authFlag === 'Y'" size="small">已签署</el-tag>
                <el-tooltip
                  v-show="commonForm.authFlag === 'A'"
                  class="item"
                  effect="dark"
                  content="拒绝原因"
                  placement="right"
                >
                  <el-tag size="small" type="danger">查征审批拒绝</el-tag>
                </el-tooltip>
                <el-tag v-show="commonForm.authFlag === 'N'" size="small" type="warning">签署失败</el-tag>
                <el-tag v-show="commonForm.authFlag === null" size="small" type="info">未签署</el-tag>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="commonForm.authPattern === 'outline'">
              <el-form-item prop="authorizeTime" label="签署日期:" label-width="130px">
                <el-date-picker
                  type="date"
                  placeholder="请选择"
                  v-model="commonForm.authorizeTime"
                  value-format="yyyy-MM-dd"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24" v-if="commonForm.authPattern === 'outline'">
              <el-form-item prop="info" label="授权证明:" label-width="130px">
                <ImageUpload @updateChild="commonFormUpload" :imageList="commonFormImageData"></ImageUpload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </v-form>
    <v-form title="担保人授权" tips="（担保人最多可填写2位，若无担保人，无需填写）">
      <template slot="content">
        <el-form
          :model="guaranteeFrom"
          ref="guaranteeFrom"
          :rules="guaranteeFromRules"
          size="mini"
          class="m-t-20 p-l-10 block-el-select"
          label-position="right"
          label-width="140px"
        >
          <!-- 担保人一 -->
          <span class="all-subtitle">担保人一</span>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="relation" label="与借款人关系:" label-width="130px">
                <el-select v-model="guaranteeFrom.relation" placeholder="请选择" clearable @clear="handleGuaranteeClear">
                  <el-option
                    v-for="item in commonEnum.relationshipOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="guaranteeFrom.relation">
            <el-row :gutter="40">
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="customerName" label="姓名" label-width="130px">
                  <el-input v-model="guaranteeFrom.customerName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="idCardNo" label="身份证号:" label-width="130px">
                  <el-input v-model="guaranteeFrom.idCardNo" placeholder="请输入"  maxlength="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="mobile" label="手机号码:" label-width="130px">
                  <el-input v-model="guaranteeFrom.mobile" placeholder="请输入" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="marriage" label="婚姻状况:" label-width="130px">
                  <el-select v-model="guaranteeFrom.marriage" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in commonEnum.marriageOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="authPattern" label="征信授权模式:" label-width="130px">
                  <el-radio-group v-model="guaranteeFrom.authPattern">
                    <el-radio v-for="(item, key) in commonEnum.authPattern" :key="key" :label="key">{{ item }}</el-radio>&nbsp;&nbsp;&nbsp;
                    <el-tag v-show="guaranteeFrom.authFlag === 'Y'" size="small">已签署</el-tag>
                    <el-tooltip
                      v-show="guaranteeFrom.authFlag === 'A'"
                      class="item"
                      effect="dark"
                      content="拒绝原因"
                      placement="right"
                    >
                      <el-tag size="small" type="danger">查征审批拒绝</el-tag>
                    </el-tooltip>
                    <el-tag v-show="guaranteeFrom.authFlag === 'N'" size="small" type="warning">签署失败</el-tag>
                    <el-tag v-show="guaranteeFrom.authFlag === null" size="small" type="info">未签署</el-tag>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="guaranteeFrom.authPattern === 'outline'">
                <el-form-item prop="authorizeTime" label="签署日期:" label-width="130px">
                  <el-date-picker
                    type="date"
                    placeholder="请选择"
                    v-model="guaranteeFrom.authorizeTime"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="guaranteeFrom.authPattern === 'outline'">
                <el-form-item prop="info" label="授权证明:" label-width="130px">
                  <ImageUpload @updateChild="guaranteeFormUpload" :imageList="guaranteeFormImageData"></ImageUpload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 担保人一配偶 信息-->
            <div v-if="guaranteeFrom.marriage === '2'">
              <span class="all-subtitle">担保人一配偶</span>
              <el-row :gutter="40">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.customerName" label="姓名:" label-width="130px">
                    <el-input v-model="guaranteeFrom.guaranteeSpouseOutVo.customerName" placeholder="请输入"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.idCardNo" label="身份证号:" label-width="130px">
                    <el-input v-model="guaranteeFrom.guaranteeSpouseOutVo.idCardNo" placeholder="请输入" maxlength="18"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.mobile" label="手机号码:" label-width="130px">
                    <el-input v-model="guaranteeFrom.guaranteeSpouseOutVo.mobile" placeholder="请输入" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 担保人一 配偶 征信授权模式 -->
              <el-row :gutter="40">
                <el-col :span="24">
                  <el-form-item prop="guaranteeSpouseOutVo.authPattern" label="征信授权模式:" label-width="130px">
                    <el-radio-group v-model="guaranteeFrom.guaranteeSpouseOutVo.authPattern">
                      <el-radio v-for="(item, key) in commonEnum.authPattern" :key="key" :label="key">{{ item }}</el-radio>&nbsp;&nbsp;&nbsp;
                      <el-tag v-show="guaranteeFrom.guaranteeSpouseOutVo.authFlag === 'Y'" size="small">已签署</el-tag>
                      <el-tooltip
                        v-show="guaranteeFrom.guaranteeSpouseOutVo.authFlag === 'A'"
                        class="item"
                        effect="dark"
                        content="拒绝原因"
                        placement="right"
                      >
                        <el-tag size="small" type="danger">查征审批拒绝</el-tag>
                      </el-tooltip>
                      <el-tag
                        v-show="guaranteeFrom.guaranteeSpouseOutVo.authFlag === 'N'"
                        size="small"
                        type="warning"
                      >签署失败</el-tag>
                      <el-tag v-show="guaranteeFrom.guaranteeSpouseOutVo.authFlag === null" size="small" type="info">未签署</el-tag>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="8"
                  v-if="
                    guaranteeFrom.guaranteeSpouseOutVo.authPattern === 'outline'
                  "
                >
                  <el-form-item prop="guaranteeSpouseOutVo.authorizeTime" label="签署日期:" label-width="130px">
                    <el-date-picker
                      type="date"
                      placeholder="请选择"
                      v-model="guaranteeFrom.guaranteeSpouseOutVo.authorizeTime"
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="24"
                  v-if="
                    guaranteeFrom.guaranteeSpouseOutVo.authPattern === 'outline'
                  "
                >
                  <el-form-item prop="spouseFirstImage" label="授权证明:" label-width="130px">
                    <ImageUpload @updateChild="guaranteeSpouseUpload" :imageList="guaranteeSpouseImageData"></ImageUpload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <el-form
          :model="secondGuaranteeFrom"
          ref="secondGuaranteeFrom"
          :rules="secondGuaranteeFromRules"
          size="mini"
          class="m-t-20 p-l-10 block-el-select"
          label-position="right"
          label-width="140px"
        >
          <!-- 担保人二 -->
          <span class="all-subtitle">担保人二</span>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="relation" label="与借款人关系:" label-width="130px">
                <el-select
                  v-model="secondGuaranteeFrom.relation"
                  placeholder="请选择"
                  clearable
                  @clear="handleSecondGuaranteeClearClear"
                >
                  <el-option
                    v-for="item in commonEnum.relationshipOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="secondGuaranteeFrom.relation">
            <el-row :gutter="40">
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="customerName" label="姓名" label-width="130px">
                  <el-input v-model="secondGuaranteeFrom.customerName" placeholder="请输入"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="idCardNo" label="身份证号:" label-width="130px">
                  <el-input v-model="secondGuaranteeFrom.idCardNo" placeholder="请输入" maxlength="18"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="mobile" label="手机号码:" label-width="130px">
                  <el-input v-model="secondGuaranteeFrom.mobile" placeholder="请输入" maxlength="11"></el-input>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="marriage" label="婚姻状况:" label-width="130px">
                  <el-select v-model="secondGuaranteeFrom.marriage" placeholder="请选择" clearable>
                    <el-option
                      v-for="item in commonEnum.marriageOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                <el-form-item prop="authPattern" label="征信授权模式:" label-width="130px">
                  <el-radio-group v-model="secondGuaranteeFrom.authPattern">
                    <el-radio v-for="(item, key) in commonEnum.authPattern" :key="key" :label="key">{{ item }}</el-radio>&nbsp;&nbsp;&nbsp;
                    <el-tag v-show="secondGuaranteeFrom.authFlag === 'Y'" size="small">已签署</el-tag>
                    <el-tooltip
                      v-show="secondGuaranteeFrom.authFlag === 'A'"
                      class="item"
                      effect="dark"
                      content="拒绝原因"
                      placement="right"
                    >
                      <el-tag size="small" type="danger">查征审批拒绝</el-tag>
                    </el-tooltip>
                    <el-tag v-show="secondGuaranteeFrom.authFlag === 'N'" size="small" type="warning">签署失败</el-tag>
                    <el-tag v-show="secondGuaranteeFrom.authFlag === null" size="small" type="info">未签署</el-tag>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" v-if="secondGuaranteeFrom.authPattern === 'outline'">
                <el-form-item prop="authorizeTime" label="签署日期:" label-width="130px">
                  <el-date-picker
                    type="date"
                    placeholder="请选择"
                    v-model="secondGuaranteeFrom.authorizeTime"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="secondGuaranteeFrom.authPattern === 'outline'">
                <el-form-item prop="info" label="授权证明:" label-width="130px">
                  <ImageUpload @updateChild="secondGuaranteeUpload" :imageList="secondGuaranteeImageData"></ImageUpload>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 担保人二配偶 信息-->
            <div v-if="secondGuaranteeFrom.marriage === '2'">
              <span class="all-subtitle">担保人二配偶</span>
              <el-row :gutter="40">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.customerName" label="姓名:" label-width="130px">
                    <el-input
                      v-model="
                        secondGuaranteeFrom.guaranteeSpouseOutVo.customerName
                      "
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.idCardNo" label="身份证号:" label-width="130px">
                    <el-input
                      v-model="
                        secondGuaranteeFrom.guaranteeSpouseOutVo.idCardNo
                      "
                      placeholder="请输入"
                      maxlength="18"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                  <el-form-item prop="guaranteeSpouseOutVo.mobile" label="手机号码:" label-width="130px">
                    <el-input v-model="secondGuaranteeFrom.guaranteeSpouseOutVo.mobile" placeholder="请输入" maxlength="11"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 担保人二 配偶 征信授权模式 -->
              <el-row :gutter="40">
                <el-col :span="24">
                  <el-form-item prop="guaranteeSpouseOutVo.authPattern" label="征信授权模式:" label-width="130px">
                    <el-radio-group
                      v-model="
                        secondGuaranteeFrom.guaranteeSpouseOutVo.authPattern
                      "
                    >
                      <el-radio v-for="(item, key) in commonEnum.authPattern" :key="key" :label="key">{{ item }}</el-radio>&nbsp;&nbsp;&nbsp;
                      <el-tag v-show="secondGuaranteeFrom.guaranteeSpouseOutVo.authFlag === 'Y'" size="small">已签署</el-tag>
                      <el-tooltip
                        v-show="secondGuaranteeFrom.guaranteeSpouseOutVo.authFlag === 'A'"
                        class="item"
                        effect="dark"
                        content="拒绝原因"
                        placement="right"
                      >
                        <el-tag size="small" type="danger">查征审批拒绝</el-tag>
                      </el-tooltip>
                      <el-tag
                        v-show="secondGuaranteeFrom.guaranteeSpouseOutVo.authFlag === 'N'"
                        size="small"
                        type="warning"
                      >签署失败</el-tag>
                      <el-tag
                        v-show="secondGuaranteeFrom.guaranteeSpouseOutVo.authFlag === null"
                        size="small"
                        type="info"
                      >未签署</el-tag>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="8"
                  v-if="
                    secondGuaranteeFrom.guaranteeSpouseOutVo.authPattern ===
                      'outline'
                  "
                >
                  <el-form-item prop="guaranteeSpouseOutVo.authorizeTime" label="签署日期:" label-width="130px">
                    <el-date-picker
                      type="date"
                      placeholder="请选择"
                      v-model="
                        secondGuaranteeFrom.guaranteeSpouseOutVo.authorizeTime
                      "
                      value-format="yyyy-MM-dd"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col
                  :span="24"
                  v-if="
                    secondGuaranteeFrom.guaranteeSpouseOutVo.authPattern ===
                      'outline'
                  "
                >
                  <el-form-item prop="spouseFirstImage" label="授权证明:" label-width="130px">
                    <ImageUpload @updateChild="guaranteeSecondSpouseUpload" :imageList="guaranteeSecondSpouseImageData"></ImageUpload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </template>
    </v-form>
    <el-row class="text-right">
      <el-col :span="12">
        <el-button @click="submitStep1" type="primary" class="wide-button" size="mini">保存并提交</el-button>
      </el-col>
      <el-col :span="12">
        <el-button @click="goToInfo" type="text" class="wide-button" size="mini">跳过，去完善信息</el-button>
      </el-col>
    </el-row>
    <el-footer class="el_footer m-t-20">【温馨提示】在提交贷款审批前，必须完成征信查询授权签署和风险试算，如有特殊情况，可先行跳过进行信息完善。</el-footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getrReadyInfo, creditApplySaveCreditApply, creditApplyListProductByProductType } from '@/api/loan-apply'
export default {
  name: 'LoanApplyStep1Edit',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    VForm: () => import('@/components/VForm'),
    ImageUpload: () => import('@/components/ImageUpload')
  },
  props: {
    centerId: {
      type: String
    }
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },

  data() {
    return {
      // 基本信息补充
      basicForm: {
        loanCustomerType: '',
        loanCustomerTypeOne: '',
        newMapFlag: '',
        productId: ''
      },
      // 存放初始化进入页面的产品id
      productIdOld: '',
      // 基本信息补充校验规则
      basicFormRules: {
        loanCustomerType: [{ required: true, message: '请选择客户类型', trigger: 'blur' }],
        loanCustomerTypeOne: [{ required: true, message: '请选择站长类型', trigger: 'blur' }],
        newMapFlag: [{ required: true, message: '请输入是否首次与MAP合作', trigger: 'blur' }],
        productId: [{ required: true, message: '请选择申请产品', trigger: 'blur' }]
      },
      // 借款人
      self: {
        authFlag: '',
        authPattern$FICDictName: '',
        riskGrade: '',
        riskScore: ''
      },
      // 共借人以及表单校验规则
      commonForm: {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        authorizeTime: ''
      },
      commonFormRules: {
        customerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        authPattern: [{ required: true, message: '请选择征信授权模式', trigger: 'change' }],
        authorizeTime: [{ required: true, message: '请选择签署日期', trigger: 'change' }]
      },
      // 担保人一
      guaranteeFrom: {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        authorizeTime: '',
        guaranteeSpouseOutVo: {
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: ''
        }
      },
      guaranteeFromRules: {
        customerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        authPattern: [{ required: true, message: '请选择征信授权模式', trigger: 'change' }],
        marriage: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
        authorizeTime: [{ required: true, message: '请选择签署日期', trigger: 'change' }],
        'guaranteeSpouseOutVo.customerName': [{ required: true, message: '请输入配偶姓名', trigger: 'change' }],
        'guaranteeSpouseOutVo.idCardNo': [{ required: true, message: '请输入配偶身份证号', trigger: 'blur' }],
        'guaranteeSpouseOutVo.mobile': [{ required: true, message: '请输入配偶手机号', trigger: 'blur' }],
        'guaranteeSpouseOutVo.authPattern': [{ required: true, message: '请选择配偶征信授权模式', trigger: 'change' }],
        'guaranteeSpouseOutVo.authorizeTime': [{ required: true, message: '请选择签署日期', trigger: 'change' }]
      },
      // 担保人二
      secondGuaranteeFrom: {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        authorizeTime: '',
        guaranteeSpouseOutVo: {
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: ''
        }
      },
      secondGuaranteeFromRules: {
        customerName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        idCardNo: [{ required: true, message: '请输入身份证号', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        authPattern: [{ required: true, message: '请选择征信授权模式', trigger: 'change' }],
        marriage: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
        authorizeTime: [{ required: true, message: '请选择签署日期', trigger: 'change' }],
        'guaranteeSpouseOutVo.customerName': [{ required: true, message: '请输入配偶姓名', trigger: 'change' }],
        'guaranteeSpouseOutVo.idCardNo': [{ required: true, message: '请输入配偶身份证号', trigger: 'blur' }],
        'guaranteeSpouseOutVo.mobile': [{ required: true, message: '请输入配偶手机号', trigger: 'blur' }],
        'guaranteeSpouseOutVo.authPattern': [{ required: true, message: '请选择配偶征信授权模式', trigger: 'change' }],
        'guaranteeSpouseOutVo.authorizeTime': [{ required: true, message: '请选择签署日期', trigger: 'change' }]
      },
      // 共借人授权证明图片列表
      commonFormImageData: [],
      // 担保人一授权证明图片列表
      guaranteeFormImageData: [],
      // 担保人一配偶授权证明图片列表
      guaranteeSpouseImageData: [],
      // 担保人二授权证明图片
      secondGuaranteeImageData: [],
      // 担保人二配偶 授权证明图片
      guaranteeSecondSpouseImageData: [],
      // 选择申请产品列表
      productList: [],
      // 借款人已婚 共借人为配偶 不可修改
      relationDisable: false
    }
  },
  created() {
    this.getInfo()
    this.queryProductList()
  },
  mounted() { },
  methods: {
    getInfo() {
      const creditApplyInfoVo = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      getrReadyInfo(creditApplyInfoVo).then(res => {
        if (res.status === 200) {
          // 反显
          // 基本信息补充
          this.basicForm.loanCustomerType = res.data.loanCustomerType
          this.basicForm.loanCustomerTypeOne = res.data.loanCustomerTypeOne
          this.basicForm.newMapFlag = res.data.newMapFlag
          // this.basicForm.productId = res.data.productId
          this.basicForm.productId = res.data.productName // 如果产品禁用后 还展示之前的数据 提交时会提示报错
          this.productIdOld = res.data.productId
          // 借款人业务风险预判
          this.self = res.data.self || {}
          // 共借人
          this.commonForm = res.data.common || { authPattern: 'online' }
          // 借款人为已婚时 共借人只能是配偶
          if (res.data.marriage === '2') {
            this.commonForm.relation = 'spouse'
            this.relationDisable = true
          }
          // 共借人线下授权证明图片
          if (res.data.common && res.data.common.file) {
            this.commonFormImageData = res.data.common.file.map(item => {
              return {
                fileUrl: item.fileKey$FICDictName,
                fileKey: item.fileKey
              }
            })
          }
          // 担保人一
          if (res.data.guarantee && res.data.guarantee[0]) {
            this.guaranteeFrom = res.data.guarantee[0]
            if (!this.guaranteeFrom.guaranteeSpouseOutVo) {
              this.guaranteeFrom.guaranteeSpouseOutVo = {
                customerName: '',
                idCardNo: '',
                mobile: '',
                authPattern: '',
                authorizeTime: ''
              }
            }
          }
          // 担保人一 线下授权证明图片
          this.guaranteeFormImageData = this.guaranteeFrom.file
            ? this.guaranteeFrom.file.map(item => {
              return {
                fileUrl: item.fileKey$FICDictName,
                fileKey: item.fileKey
              }
            })
            : []
          // 担保人一配偶 线下授权证明图片
          this.guaranteeSpouseImageData = this.guaranteeFrom.guaranteeSpouseOutVo.file
            ? this.guaranteeFrom.guaranteeSpouseOutVo.file.map(item => {
              return {
                fileUrl: item.fileKey$FICDictName,
                fileKey: item.fileKey
              }
            })
            : []
          // 担保人二
          if (res.data.guarantee && res.data.guarantee[1]) {
            this.secondGuaranteeFrom = res.data.guarantee[1]
            if (!this.secondGuaranteeFrom.guaranteeSpouseOutVo) {
              this.secondGuaranteeFrom.guaranteeSpouseOutVo = {
                customerName: '',
                idCardNo: '',
                mobile: '',
                authPattern: '',
                authorizeTime: ''
              }
            }
          }
          this.secondGuaranteeImageData = this.secondGuaranteeFrom.file
            ? this.secondGuaranteeFrom.file.map(item => {
              return {
                fileUrl: item.fileKey$FICDictName,
                fileKey: item.fileKey
              }
            })
            : []
          this.guaranteeSecondSpouseImageData = this.secondGuaranteeFrom.guaranteeSpouseOutVo.file
            ? this.secondGuaranteeFrom.guaranteeSpouseOutVo.file.map(item => {
              return {
                fileUrl: item.fileKey$FICDictName,
                fileKey: item.fileKey
              }
            })
            : []
        }
      })
    },
    // change
    handleChageCustomerType(val) {
      this.basicForm.productId = ''
      this.queryProductList()
    },
    queryProductList() {
      creditApplyListProductByProductType({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo,
        loanCustomerType: this.basicForm.loanCustomerType === '2' ? 2 : ''
      }).then(res => {
        this.productList = res.data
      })
    },
    submitStep1() {
      // 基本信息补充
      const p1 = new Promise((resolve, reject) => {
        this.$refs.basicForm.validate(valid1 => {
          if (valid1) {
            resolve()
          }
        })
      })
      // 共借人
      const p2 = new Promise((resolve, reject) => {
        this.$refs.commonForm.validate(valid2 => {
          if (valid2) {
            resolve()
          }
        })
      })
      // 担保人一
      const p3 = new Promise((resolve, reject) => {
        this.$refs.guaranteeFrom.validate(valid3 => {
          if (valid3) {
            resolve()
          }
        })
      })
      // 担保人二
      const p4 = new Promise((resolve, reject) => {
        this.$refs.secondGuaranteeFrom.validate(valid4 => {
          if (valid4) {
            resolve()
          }
        })
      })
      Promise.all([p1, p2, p3, p4]).then(() => {
        const guarantee = []
        // 担保人一
        if (this.guaranteeFrom.relation) {
          guarantee.push({
            ...this.guaranteeFrom,
            guaranteeSpouseInVo: {
              ...this.guaranteeFrom.guaranteeSpouseOutVo,
              file: this.guaranteeSpouseImageData.map(item => item)
            },
            file: this.guaranteeFormImageData.map(item => item)
          })
        }
        // 担保人二
        if (this.secondGuaranteeFrom.relation) {
          guarantee.push({
            ...this.secondGuaranteeFrom,
            guaranteeSpouseInVo: {
              ...this.secondGuaranteeFrom.guaranteeSpouseOutVo,
              file: this.guaranteeSecondSpouseImageData.map(item => item)
            },
            file: this.secondGuaranteeImageData.map(item => item)
          })
        }
        const isHas = this.productList.findIndex(item => item.productName === this.basicForm.productId) // this.basicForm.productId 存的是产品的名字 判断当前产品value是否在列表存在
        const params = {
          guarantee,
          customerId: this.$route.query.customerId,
          orderNo: this.$route.query.orderNo,
          loanCustomerType: this.basicForm.loanCustomerType,
          loanCustomerTypeOne: this.basicForm.loanCustomerType === '2' ? this.basicForm.loanCustomerTypeOne : '',
          newMapFlag: this.basicForm.newMapFlag,
          centerId: this.centerId,
          productId: isHas >= 0 ? this.productList[isHas].productId : this.productIdOld,
          self: this.self,
          common: {
            ...this.commonForm,
            file: this.commonFormImageData.map(item => item)
          }
        }
        creditApplySaveCreditApply(params).then(res => {
          if (res.status === 200) {
            this.$message.success('业务准备信息保存成功')
            this.$emit('stepEditChild', { status: false, loanCustomerType: this.basicForm.loanCustomerType })
          } else {
            this.$message.error(res.message || '系统错误')
          }
        })
      })
    },
    handleGuaranteeClear() {
      // 担保人一
      this.guaranteeFrom = {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        guaranteeSpouseOutVo: {
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: ''
        }
      }
      // 担保人一授权证明图片列表
      this.guaranteeFormImageData = []
      // 担保人一配偶授权证明图片列表
      this.guaranteeSpouseImageData = []
    },

    // 点击清空
    handleSecondGuaranteeClearClear() {
      this.secondGuaranteeFrom = {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        guaranteeSpouseOutVo: {
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: ''
        }
      }
      // 担保人二授权证明图片
      this.secondGuaranteeImageData = []
      // 担保人二配偶 授权证明图片
      this.guaranteeSecondSpouseImageData = []
    },
    goToInfo() {
      this.$emit('stepEditJump', 1)
    },
    commonFormUpload(commonList) {
      this.commonFormImageData = commonList
    },
    guaranteeFormUpload(guaranImageList) {
      this.guaranteeFormImageData = guaranImageList
    },
    guaranteeSpouseUpload(list) {
      this.guaranteeSpouseImageData = list
    },
    secondGuaranteeUpload(list) {
      this.secondGuaranteeImageData = list
    },
    guaranteeSecondSpouseUpload(list) {
      this.guaranteeSecondSpouseImageData = list
    }
  }
}
</script>
<style lang="scss" scoped></style>
