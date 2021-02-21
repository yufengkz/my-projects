<template>
  <div class="app-container">
    <el-form
      ref="basicForm"
      :model="basicForm"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <div class="top">
        <span class="all-title all-star">业务MAP中心：</span>
        <el-form-item prop="mapId" >
          <el-select v-model="basicForm.mapId" placeholder="选择map中心" clearable>
            <el-option v-for="item in RoleMapList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <!-- 法人保证基本信息 -->
      <span class="all-title all-star">法人保证基本信息</span>
      <!-- <el-divider></el-divider> -->
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="organName" label="机构名称:" label-width="100px">
            <el-input v-model="basicForm.organName" placeholder="请输入" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditCode" class="creditCode" label="统一社会信用代码:" label-width="130px">
            <el-input v-model="basicForm.creditCode" placeholder="请输入" maxlength="18"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="registerCurrency" label="注册资本币种:" label-width="100px">
            <el-select v-model="basicForm.registerCurrency" placeholder="请选择" clearable>
              <el-option v-for="item in currencyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="registerCapital" label="注册资本:" label-width="100px">
            <el-input type="text" v-model="basicForm.registerCapital" placeholder="请输入" maxlength="11" v-number-input.float="0">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item  prop="mainBusiness" label="主营业务:" label-width="100px" style="margin-left:-20px;">
            <el-input v-model="basicForm.mainBusiness" placeholder="请输入" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col style="padding-left: 0px"> -->
          <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :span="9" style="padding-left: 0px">
            <el-form-item prop="registerAddress" label="住址:" label-width="100px">
                <el-input v-model="basicForm.registerAddress" placeholder="请输入地址"></el-input>
                <el-cascader v-model="basicForm.registerAddress" :options="addressCascader" size="mini" clearable></el-cascader>
              </el-form-item>
          </el-col> -->
          <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="margin-left: -52px">
            <el-form-item prop="registerAddress" label="住址:" label-width="100px">
              <el-input v-model="basicForm.registerDetailAddress" placeholder="请输入详细地址"></el-input>
            </el-form-item>
          </el-col> -->
        <!-- </el-col> -->
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" style="padding-left: 0px; margin-left: -30px !important">
          <el-form-item prop="registerAddress" label="注册地址:" label-width="100px">
             <el-input v-model="basicForm.registerAddress" placeholder="请输入注册地址" maxlength="100"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 法人信息-->
      <span class="all-title all-star">法人信息</span>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="legalName" label="姓名:" label-width="100px">
            <el-input v-model="basicForm.legalName" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="legalCertificatesType" label="证件类型:" label-width="100px">
            <el-select v-model="basicForm.legalCertificatesType" placeholder="请选择" clearable>
              <el-option v-for="item in this.certificateType" :key="item.code" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="legalIdNo" label="证件号码:" label-width="120px">
            <el-input v-model="basicForm.legalIdNo" placeholder="请输入" maxlength="18"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="legalMobile" label="联系电话:" label-width="100px">
            <el-input v-model="basicForm.legalMobile" placeholder="请输入" maxlength="11" v-number-input.float="0"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <span class="all-title all-star">实际控制人信息</span>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="controllerName" label="姓名:" label-width="100px">
            <el-input v-model="basicForm.controllerName" placeholder="请输入" maxlength="20"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="controllerCertificatesType" label="证件类型:" label-width="100px">
            <el-select v-model="basicForm.controllerCertificatesType" placeholder="请选择" clearable>
              <el-option v-for="item in certificateType" :key="item.code" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="controllerIdNo" label="证件号码:" label-width="120px">
            <el-input v-model="basicForm.controllerIdNo" placeholder="请输入" maxlength="18"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="controllerMobile" label="联系电话:" label-width="100px">
            <el-input v-model="basicForm.controllerMobile" placeholder="请输入" maxlength="11" v-number-input.float="0"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 股东信息-->
      <span class="all-title all-star">股东信息</span>
      <!-- <el-divider></el-divider> -->
      <el-row :gutter="40">
        <el-col class="imageData" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <TableEdit ref="shareholderTable" :columns="shareholder" :data="basicForm.shareholders">
            <template #button="scope">
              <template v-if="scope.id === 'add'"></template>
            </template>
          </TableEdit>
          <div class="btns-center-box">
            <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('shareholder')">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <!-- 财务信息-->
      <span class="all-title all-star">财务信息</span>
      <!-- <el-divider></el-divider> -->
      <el-row :gutter="40">
        <el-col class="imageData" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <TableEdit ref="financeTable" :columns="finance" :data="basicForm.finances">
            <template #button="scope">
              <template v-if="scope.id === 'add'"></template>
            </template>
          </TableEdit>
          <div class="btns-center-box">
            <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('finance')">添加</el-button>
          </div>
        </el-col>
      </el-row>
      <span class="all-title all-star">联系人信息</span>
      <!-- <el-divider></el-divider> -->
      <el-row :gutter="40">
        <el-col class="imageData" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-table :data="tableData" ref="linkmanTable" border size="mini" class="m-t-20">
            <el-table-column label="姓名" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.editStatus">
                  <el-input type="text" v-model="scope.row.name" size="mini" placeholder="请输入姓名"></el-input>
                </div>
                <div v-else>
                  <span>
                    <span>{{scope.row.name || "--"}}</span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="通信地址" min-width="300">
              <template slot-scope="scope">
                <el-row :span="24" v-if="scope.row.editStatus == true">
                  <el-input type="text" v-model="scope.row.address" size="mini" placeholder="请输入详细地址"></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.address }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="邮编" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.editStatus">
                  <el-input type="text" v-model="scope.row.postcode" size="mini" placeholder="请输入邮编"></el-input>
                </div>
                <div v-else>
                  <span>
                    <span>{{scope.row.postcode || "--"}}</span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="传真（非必填）" min-width="120">
              <template slot-scope="scope">
                <div v-if="scope.row.editStatus">
                  <el-input type="text" v-model="scope.row.fax" size="mini" placeholder="请输入传真"></el-input>
                </div>
                <div v-else>
                  <span>
                    <span>{{scope.row.fax || "--"}}</span>
                  </span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="180">
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
        </el-col>
      </el-row>
      <!-- 建议担保额度-->
      <span class="all-title all-star">建议担保额度</span>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="proposalLimit" label="担保额度:" label-width="120px">
            <el-input type="text" v-model="basicForm.proposalLimit" placeholder="请输入" maxlength="11">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="submit">
        <el-button size="medium" @click="submitSave" type="primary">保存</el-button>
      </el-row>
      <!-- 影像资料 -->
      <div class="btns-center-box" style="display: flex;justifyContent: space-between;">
        <span class="all-title">影像资料</span>
        <div>
          <el-button size="mini" plain type="primary" icon="el-icon-upload" @click="downloadTemplate">模板下载</el-button>
          <el-button size="mini" plain type="primary" icon="el-icon-upload" @click="importExcel">批量上传</el-button>
          <el-button size="mini" plain type="primary" icon="load" @click="reloadImageData">刷新</el-button>
        </div>
      </div>
      <el-row :gutter="40">
        <el-col class="imageData" :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="imageData">
            <ImageTab
              :imageData="imageData"
              :activeImageName="activeImageName"
              :tabPaneData="tabPaneData"
              @handleClickImage="handleClickImage"
              @handleChangeImageImg="handleChangeImageImg"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn">
      <el-button @click="submitApprove" type="primary" class="wide-button" size="medium">提交审批</el-button>
    </div>
    <!-- 批量上传 -->
    <UploadDialog :chunkUploadUrl="chunkUploadUrl" :applyNo="basicForm.id" dialogTitle="批量上传" :dialogVisible="dialogVisible" @closeDialog="closeDialog"></UploadDialog>
  </div>
</template>

<script>
import { legalPersonCreate, legalPersonDetail, legalPersonSubmitApprove, batchUpload, getLegalImageList, getQueryEnumMap, releaseLegalPersonOccupyRemove } from '@/api/cosigner-manage'
import { v4 as uuidv4 } from 'uuid'
import { mapGetters } from 'vuex'
import TableEdit from '@/components/TableEdit'
import { queryByType, downloadLegalTemplateImage } from '@/api/common'
export default {
  name: 'LegalInfo',
  components: {
    TableEdit,
    ImageTab: () => import('./ImageTab'),
    UploadDialog: () => import('@/components/ChunkUploadDialog/index')
  },
  data() {
    return {
      shareholderType: [], // 股东类型
      otherYearOptions: [], // 财务年份选择
      tabPaneData: [], // 影像资料Tab 表头数据
      isChange: false, // 是否修改了信息
      chunkUploadUrl: batchUpload(), // 批量上传接口
      imageData: {}, // 保存影像资料的数据 key value 形式保存
      dialogVisible: false, // 批量上传显示开关
      isVerifyCode: true, // 联系人保存开关
      activeImageName: 'legal_company_constitution',
      tableData: [], // 联系人信息
      tableDataLinkman: [], // 联系人信息
      basicForm: {
        organName: '', // 机构名称 ~
        creditCode: '', // 统一社会信用代码 ~
        registerCurrency: '', // 注册资本币种 ~
        registerCapital: null, // 注册资本 ~
        mainBusiness: '', // 主营业务 ~
        registerAddress: '', // 住址 ~
        legalName: '', // 法人姓名 ~
        legalCertificatesType: '', // 企业法人证件类型 ~
        legalIdNo: '', // 法人身份证 ~
        legalMobile: '', // 法人联系电话 ~
        controllerName: '', // 实际控制人姓名 ~
        controllerCertificatesType: '', // 实际控制人证件类型 ~
        controllerIdNo: '', // 企业实控人证件号 ~
        controllerMobile: '', // 实际控制人联系电话 ~
        proposalLimit: '', // 担保额度, ~
        applyNo: '',
        mapId: '', // map中心编码
        id: null, // 判断是更新还是新建
        // 财务信息
        finances: [
          //    {
          //       * year 年份
          //  * totalAssets 企业总资产
          //  * grossLiability 企业总负债
          //  * ownerEquity 所有者权益
          //  * taking 营业收入
          //  * operatingCosts 营业成本
          //  * totalProfit 利润总额
          //    }
        ],
        // 股东信息
        shareholders: [
          //     {
          //  * shareholderType 股东类型
          //  * name 姓名
          //  * certificateType 证件类型
          //  * idCard 证件号码
          //  * investmentType 出资形式
          //  * ratio 出资比例
          //  * contributiveMoney 出资金额
          //     }
        ],
        // 联系人信息
        contacts: [],
        // 影像信息
        listMap: {}
      },
      basicFormRules: {
        organName: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        registerCurrency: [{ required: true, message: '请输入注册资本币种', trigger: 'change' }],
        registerCapital: [{ required: true, message: '请输入注册资本', trigger: 'blur' }],
        mainBusiness: [{ required: true, message: '请输入主营业务', trigger: 'blur' }],
        registerAddress: [{ required: true, message: '请录入住址', trigger: ['blur', 'change'] }],
        legalName: [{ required: true, message: '请输入法人姓名', trigger: 'blur' }],
        legalCertificatesType: [{ required: true, message: '请输入证件类型', trigger: 'change' }],
        legalIdNo: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
        legalMobile: [{ required: true, message: '请输入法人联系电话', trigger: 'blur' }, { pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/, message: '请输入正确的电话号码', trigger: 'blur' }],
        controllerName: [{ required: true, message: '请输入实际控制人姓名', trigger: 'blur' }],
        controllerCertificatesType: [{ required: true, message: '请输入实际控制人证件类型', trigger: 'change' }],
        controllerIdNo: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
        controllerMobile: [{ required: true, message: '请输入实际控制人联系电话', trigger: 'blur' }, { pattern: /^((13|14|15|16|17|18)[0-9]{1}\d{8})|((166|199|198)[0-9]{1}\d{7})$/, message: '请输入正确的电话号码', trigger: 'blur' }],
        proposalLimit: [{ required: true, message: '请输入担保额度', trigger: 'blur' }, { pattern: /^([1-9]\d{3,})([.]\d{1,2})?$/, message: '输入金额最小为1000,支持小数点后两位', trigger: 'blur' }],
        mapId: [{ required: true, message: '请选择map中心', trigger: 'change' }]
      },
      currencyOptions: [], // 注册资本币种
      certificateType: [], // 证件类型
      waysOfInvestment: [], // 出资形式
      financeEditIds: [],
      shareholderEditIds: [],
      linkmanEditIds: [],
      /**
       * shareholderType 股东类型
       * name 姓名
       * certificateType 证件类型
       * idCard 证件号码
       * investmentType 出资形式
       * ratio 出资比例
       * contributiveMoney 出资金额
       */
      // 股东信息表格编辑
      shareholder: Object.freeze([
        {
          label: '股东类型',
          prop: 'type',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 'legal_person' ? '法人' : '自然人'
          },
          editable: true,
          field: {
            componentType: 'select',
            placeholder: '请选择',
            options: this.shareholderType,
            rules: [
              {
                required: true,
                message: '请选择类型'
              }
            ]
          }
        },
        {
          label: '姓名',
          prop: 'name',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入姓名',
            // min: 0,
            // max: 20,
            rules: [
              {
                // validator: nameValidator
                required: true,
                message: '请输入姓名'
              },
              {
                min: 0,
                max: 20,
                message: '姓名最多可输入20个字符',
                trigger: 'blur'
              }
            ]
          }
        },
        {
          label: '证件类型',
          prop: 'certificatesType',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 'id_no' ? '身份证' : cellValue === 'passport' ? '护照' : cellValue === 'formosa_certificate' ? '台胞证' : '其它证件类型'
          },
          editable: true,
          field: {
            componentType: 'select',
            message: '请输入证件类型',
            options: this.certificateType,
            rules: [
              {
                required: true,
                message: '请输入证件类型'
              }
            ]
          }
        },
        {
          label: '证件号码',
          prop: 'idNo',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入证件号码',
            rules: [
              {
                required: true,
                message: '请输入证件号码'
              },
              {
                min: 0,
                max: 18,
                message: '请输入正确的证件号码',
                trigger: 'blur'
              }
            ]
          }
        },
        {
          label: '出资形式',
          prop: 'investmentForm',
          // 格式化表格,与element-ui 的表格属性相同
          formatter(row, column, cellValue) {
            return cellValue === 'knowledge_right' ? '知识产权' : cellValue === 'land_right' ? '土地使用权' : cellValue === 'land_right' ? '土地使用权' : cellValue === 'goods' ? '实物' : '货币'
          },
          editable: true,
          field: {
            componentType: 'select',
            message: '请输入出资形式',
            options: this.waysOfInvestment,
            rules: [
              {
                required: true,
                message: '请输入出资形式'
              }
            ]
          }
        },
        {
          label: '出资比例(%)',
          prop: 'shareholdRatio',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入出资比例',
            rules: [
              {
                required: true,
                message: '请输入出资比例'
              }
            ]
          }
        },
        {
          label: '出资金额(万元)',
          prop: 'investmentAmount',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入出资金额',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入出资金额'
              }
              // {
              //   validator: validateNumber
              // }
            ]
          }
        },
        {
          label: '操作',
          width: 200,
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.shareholderEditIds.includes(row.id, 'shareholder'),
              click: row => this.$_handleEdit(row, 'shareholder')
            },
            {
              id: 'save',
              rowKey: 'id',
              text: '保存',
              before: row => this.shareholderEditIds.includes(row.id, 'shareholder'),
              click: row => this.$_handleSave(row, 'shareholder')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'shareholder')
            }
          ]
        }
      ]),
      /**
       * name 姓名
       * address 通信地址
       * postcode 邮编
       * facsimile 传真（非必填
       */
      // 联系人信息表格编辑
      linkman: Object.freeze([
        {
          label: '姓名',
          prop: 'name',
          editable: true,
          field: {
            componentType: 'text',
            placeholder: '请选择',
            rules: [
              {
                required: true,
                message: '请输入姓名'
              }
            ]
          }
        },
        {
          label: '通信地址',
          prop: 'address',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入通信地址',
            min: 0,
            max: 100,
            rules: [
              {
                required: true,
                message: '请输入通信地址'
              }
              // {
              //   max: 100,
              //   message: '地址最多可输入100个字符'
              // }
            ]
          }
        },
        {
          label: '邮编',
          prop: 'postcode',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入邮编',
            rules: [
              // {
              //   required: true,
              //   message: '请输入邮编'
              // }
              // {
              //   max: 6,
              //   message: '邮编最多可输入6位'
              // }
            ]
          }
        },
        {
          label: '传真（非必填)',
          prop: 'fax',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入传真',
            rules: [
              {
                required: false,
                message: '请输入传真'
              }
            ]
          }
        },
        {
          label: '操作',
          width: 200,
          actions: [
            {
              id: 'edit',
              text: '编辑',
              click: row => this.$_handleEdit(row, 'linkman')
            },
            {
              id: 'save',
              text: '保存',
              click: row => this.$_handleSave(row, 'linkman')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'linkman')
            }
          ]
        }
      ])
    }
  },
  created () {
    // 财务信息选择年份
    var myDate = new Date()
    const presentYear = myDate.getFullYear()
    var startYear = myDate.getFullYear() - 100 // 起始年份
    for (var i = startYear; i <= presentYear; i++) {
      this.otherYearOptions.unshift({ code: i, value: String(i) })
    }
  },
  mounted () {
    // 判断是新建页面还是详情页面
    this.applyNo = this.$route.query.applyNo
    if (this.applyNo) {
      this.detailsInitSearch()
    }
    // 获取其它下拉状态
    getQueryEnumMap().then(res => {
      if (res.status === 200) {
        this.currencyOptions = res.data.CurrencyEnum // 注册币种
        const arr = res.data.CertificatesEnum.splice(1)
        arr.push(res.data.CertificatesEnum[0])
        this.certificateType = arr // 证件类型
        this.shareholder[0].field.options = res.data.ShareholderTypeEnum // 股东类型
        this.shareholder[2].field.options = arr // 证件类型
        this.shareholder[4].field.options = res.data.InvestmentFormEnum // 出资形式
      }
    })
    // 获取影像tab
    queryByType({ type: 'legalGuaranteeImageType' }).then(res => {
      if (res.status === 200) {
        this.tabPaneData = res.data
        this.activeImageName = this.tabPaneData[0].code
        // this.$set(this.activeImageName, this.tabPaneData[0].code)
      }
    })
  },
  computed: {
    ...mapGetters(['RoleMapList']),
    /**
       * year 年份
       * totalAssets 企业总资产
       * grossLiability 企业总负债
       * ownerEquity 所有者权益
       * taking 营业收入
       * operatingCosts 营业成本
       * totalProfit 利润总额
       */
    // 财务信息
    finance() {
      return [
        {
          label: '年份',
          prop: 'specificYear',
          editable: true,
          field: {
            componentType: 'select',
            placeholder: '请选择',
            options: this.otherYearOptions,
            rules: [
              {
                required: true,
                message: '请选择年份'
              }
            ]
          }
        },
        {
          label: '企业总资产(万元)',
          prop: 'totalAssets',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入企业总资产',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入企业总资产'
              }
            ]
          }
        },
        {
          label: '企业总负债(万元)',
          prop: 'totalLiabilities',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入企业总负债',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入企业总负债'
              }
            ]
          }
        },
        {
          label: '所有者权益(万元)',
          prop: 'ownerRights',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入所有者权益',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入所有者权益'
              }
            ]
          }
        },
        {
          label: '营业收入(万元)',
          prop: 'businessIncome',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入营业收入',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入营业收入'
              }
            ]
          }
        },
        {
          label: '营业成本(万元)',
          prop: 'businessCost',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入营业成本',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入营业成本'
              }
            ]
          }
        },
        {
          label: '利润总额(万元)',
          prop: 'totalProfit',
          editable: true,
          field: {
            componentType: 'number',
            message: '请输入利润总额',
            min: 0,
            max: 99999999999,
            rules: [
              {
                required: true,
                message: '请输入利润总额'
              }
            ]
          }
        },
        {
          label: '操作',
          width: 200,
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.financeEditIds.includes(row.id, 'finance'),
              click: row => this.$_handleEdit(row, 'finance')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.financeEditIds.includes(row.id, 'finance'),
              click: row => this.$_handleSave(row, 'finance')
            },
            {
              id: 'edit',
              text: '删除',
              // click: this.$_handleDel
              click: row => this.$_handleDel(row, 'finance')
            }
          ]
        }
      ]
    }
  },
  watch: {
    // 监视路由地址是否发生变化
    $route() {
      this.detailsInitSearch()
    },
    basicForm: {
      handler(newVal, oldVal) {
        if (oldVal.applyNo) {
          this.isChange = true
        }
      },
      deep: true
    },
    'basicForm.legalCertificatesType'(val, oldVal) {
      // this.legalNum()
      if (oldVal && this.basicForm.legalIdNo) {
        this.$refs['basicForm'].validateField('legalIdNo')
      }
    },
    'basicForm.controllerCertificatesType'(val, oldVal) {
      if (oldVal && this.basicForm.controllerIdNo) {
        this.$refs['basicForm'].validateField('controllerIdNo')
      }
    }
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false
    },
    // 调用法人详情接口
    detailsInitSearch() {
      legalPersonDetail(this.$route.query.applyNo).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.contacts.map(item => {
            item.editStatus = false
            return item
          })
          this.imageData = res.data.listMap
          this.basicForm = res.data
          const isHas = this.RoleMapList && this.RoleMapList.find(item => item.id === res.data.mapId)
          if (!isHas) { this.basicForm.mapId = '' }
          // 保存后将applyNo传给父组件
          // this.$emit('legalInfoEditChild', 0, this.basicForm.applyNo)
          this.isChange = false
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 添加联系人信息
    handleAdd() {
      const id = uuidv4()
      this.tableData.push({
        id,
        name: '',
        address: '',
        postcode: '',
        fax: '',
        editStatus: true
      })
      this.linkmanEditIds.push(id)
    },
    // 联系人信息编辑
    handleEdit(index, item) {
      this.tableData = this.tableData.map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
      })
    },
    // 联系人信息保存
    handleSave(index, item) {
      // let isVerifyCode = true
      if (item.name.length <= 0 || item.name.length > 20) {
        this.isVerifyCode = false
        if (item.name.length <= 0) {
          this.$message.error({ message: '请输入姓名' })
        }
        if (item.name.length > 20) {
          this.$message.error({ message: '姓名最多可输入20个字符' })
        }
      } else if (!item.address || item.address.length <= 0 || item.address.length > 100) {
        this.isVerifyCode = false
        if (item.address.length <= 0) {
          this.$message.error({ message: '请输入通信  地址' })
        }
        if (item.address.length > 100) {
          this.$message.error({ message: '地址最多可输入100个字符' })
        }
      } else if (item.postcode.length <= 0 || item.postcode.length > 6) {
        this.isVerifyCode = false
        if (item.postcode.length <= 0) {
          this.$message.error({ message: '请输入邮编' })
        }
        if (item.postcode.length > 6) {
          this.$message.error({ message: '邮编最多可输入6个字符' })
        }
      }
      if (this.isVerifyCode) {
        this.tableData = this.tableData.map(item1 => {
          if (item === item1) {
            item1.editStatus = false
          }
          // item1.address = `${item1.city},${item1.area},${item1.towns}`
          return item1
        })
      }
      this.isVerifyCode = true
    },
    // 联系人信息删除
    handleDelete(index, item) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      })
    },
    // --修改影响资料的下标参数
    handleClickImage(val) {
      this.activeImageName = val
    },
    // 关闭pii两上传弹窗触发
    closeUploadDialog() {
      this.dialogVisible = false
    },
    // 批量上传 导入
    importExcel() {
      if (this.basicForm.applyNo) {
        this.dialogVisible = true
      } else {
        this.$message('请先保存在批量上传图片')
      }
    },
    // 上传图片后的图片数据
    handleChangeImageImg(value) {
      this.$set(this.imageData, value.name, value.list)
    },
    removeId(data) {
      const items = ['finances', 'shareholders', 'contacts']
      items.forEach(item => {
        data[item].forEach(row => {
          delete row.id
        })
      })
    },
    // 保存
    submitSave() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs.basicForm.validate(valid1 => {
          if (valid1) {
            resolve()
          }
        })
      })
      Promise.all([p1]).then(() => {
        const obj = {
          shareholders: this.shareholderEditIds, // 股东信息
          finances: this.financeEditIds // 财务信息
        }
        for (const item in obj) {
          if (obj[item].length > 0) {
            let str = ''
            if (item === 'finances') {
              str = '财务信息'
            } else if (item === 'shareholders') {
              str = '股东信息'
            }
            this.$message.warning({ message: '请保存' + str })
            this.next = false
            return
          }
        }
        // 判断联系人信息 是否校验通过
        if (this.linkmanValidate()) return
        // 将联系人信息的资料赋值到basicForm对象中
        this.basicForm.contacts = this.tableData
        this.basicForm.listMap = this.imageData
        const newObj = JSON.parse(JSON.stringify(this.basicForm))
        if (!this.basicForm.id) {
          this.removeId(this.basicForm)
          legalPersonCreate(this.basicForm).then(res => {
            if (res.status === 200) {
              this.$message.success('保存成功')
              this.removeId(this.basicForm)
              this.$router.push(`/cosigner-manage/legal/add?applyNo=${res.data}`)
              this.basicForm.applyNo = ''
            } else {
              this.$message.error(res.message || '查询失败，请稍后重试')
              this.basicForm = newObj
            }
          })
        } else {
          this.removeId(this.basicForm)
          legalPersonCreate(this.basicForm).then(res => {
            if (res.status === 200) {
              this.$message.success('更新成功')
              this.basicForm.applyNo = ''
              this.detailsInitSearch()
            } else {
              this.$message.error(res.message || '查询失败，请稍后重试')
              this.basicForm = newObj
            }
          })
        }
      })
    },
    // 提交审批
    submitApprove() {
      if (this.isChange) {
        this.$message('请先保存再提交')
        return
      }
      if (this.basicForm.id) { // 判断是否保存之后才提交的
        const p1 = new Promise((resolve, reject) => {
          this.$refs.basicForm.validate(valid1 => {
            if (valid1) {
              resolve()
            }
          })
        })
        Promise.all([p1]).then(() => {
          const obj = {
            shareholder: this.shareholderEditIds,
            finance: this.financeEditIds
          }
          for (const item in obj) {
            if (obj[item].length > 0) {
              let str = ''
              if (item === 'finance') {
                str = '财务信息'
              } else if (item === 'shareholder') {
                str = '股东信息'
              }
              this.$message.warning({ message: '请保存' + str })
              this.next = false
              return
            }
          }
          if (this.linkmanValidate()) return // 联系人验证
          this.basicForm.contacts = this.tableData
          const data = {
            applyNo: this.basicForm.applyNo,
            proposalLimit: this.basicForm.proposalLimit
          }
          // 调用审批接口
          legalPersonSubmitApprove(data).then(res => {
            if (res.status === 200) {
              // 审批通过之后显示担保审批页面
              this.$emit('legalInfoEditChild', 1)
              // 释放担保法人占用
              releaseLegalPersonOccupyRemove(this.basicForm.applyNo).then(result => {
                if (result.status === 200) {
                  this.$message.success(result.message, '解除占用成功')
                } else {
                  this.$message.error(result.message)
                }
              })
            } else {
              this.$message.warning(res.message || '提交审批失败')
            }
          })
        })
      } else {
        this.$message('请先保存再提交审批')
      }
    },
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row, type) {
      // 通过调用 startEditRow 可以开启行编辑
      this.$refs[`${type}Table`].startEditRow(row.id)
      // 记录开启了行编辑的id
      this[`${type}EditIds`].push(row.id)
    },
    // 保存一行
    $_handleSave(row, type) {
      this.$refs[`${type}Table`].endEditRow(row.id, (valid, result, oldRow) => {
        if (valid) {
          const index = this[`${type}EditIds`].findIndex(item => item === row.id)
          this[`${type}EditIds`].splice(index, 1)
          // 添加到新的数组中
          this.basicForm[`${type}s`] = this.basicForm[`${type}s`].map(item => {
            if (result.id === item.id) {
              return result
            }
            return item
          })
        } else {
          // 如果校验失败，则返回校验的第一个输入框的异常信息
          this.$message.error(result.message)
        }
      })
    },
    // 添加一行
    $_handleAdd(type) {
      if (type === 'finance') { // 财务信息
        const id = uuidv4()
        this.basicForm[`${type}s`].push({
          id,
          specificYear: '',
          totalAssets: '',
          totalLiabilities: '',
          ownerRights: '',
          businessIncome: '',
          businessCost: '',
          totalProfit: ''
        })
        this.$refs[`${type}Table`].startEditRow(id)
        this[`${type}EditIds`].push(id)
      } else if (type === 'shareholder') { // 股东信息
        const id = uuidv4()
        this.basicForm[`${type}s`].push({
          id,
          type: '',
          name: '',
          certificatesType: '',
          idNo: '',
          investmentForm: '',
          shareholdRatio: '',
          investmentAmount: ''
        })
        this.$refs[`${type}Table`].startEditRow(id)
        this[`${type}EditIds`].push(id)
      }
    },
    // 删除一行
    $_handleDel(row, type) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.basicForm[`${type}s`] = this.basicForm[`${type}s`].filter(item => {
          if (item.id !== row.id) {
            return item
          }
        })
        const index = this[`${type}EditIds`].findIndex(item => item.id === row.id)
        this[`${type}EditIds`].splice(index, 1)
      })
    },
    // 联系人信息验证是否保存 函数返回结果为true是没保存
    linkmanValidate() {
      if (!this.tableData.every(item => !item.editStatus)) {
        this.$message.warning({ message: '请保存联系人信息' })
        return true
      }
    },
    // 模板下载
    downloadTemplate() {
      window.location.href = downloadLegalTemplateImage()
    },
    // 影像局部刷新
    reloadImageData() {
      getLegalImageList(this.basicForm.id).then(res => {
        if (res.status === 200) {
          this.imageData = res.data.fileMap
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.app-container {
  .imageData {
    width: 100%;
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
    }
  }
  .all-title {
    margin: 12px 0;
  }
  .all-star::before {
    // display: inline-block;
    content: '*';
    color: #f5303a;
    font-size: 16px;
    font-weight: normal;
    margin-right: 6px;
  }
  /deep/ .el-form {
    /deep/ .el-row:nth-of-type(1) {
      position: relative;
      /deep/ .el-form-item{
        /deep/ .el-form-item__label {
          border: 1px solid #eeeeee;
          margin-top: 4px;
          /deep/ .el-form-item__label::before {
            border: 1px solid red;
            color: blue !important;
          }
          .all-title {
            position: absolute;
            top: 0px;
          }
        }
        /deep/ .el-form-item__content {
          margin-top: 5px;
        }
      }
    }
  }
  .top {
    display: flex;
    /deep/ .el-form-item__content {
      margin-left: 0 !important;
      /deep/ .el-select {
        margin-top: 2px;
        .el-input, .el-input__inner {
          width: 273px !important;
          height: 30px !important;
          line-height: 30px !important;
          &::placeholder {
            font-size: 12px;
          }
          .el-input__icon {
            line-height: 30px !important;
          }
        }
      }
    }
  }
  .btns-center-box {
    /deep/.el-button {
      float: none;
      margin-top: 0;
    }
  }
  .submit {
    margin: 10px 0;
    /deep/ .el-button {
      width: 180px;
      height: 40px;
      float: right;
    }
  }
  .btn {
    margin: 10px 0;
    text-align: center;
    /deep/ .el-button {
      width: 180px;
      height: 40px;
    }
  }
}
</style>
