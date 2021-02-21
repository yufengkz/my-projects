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
      class="pledge-info-dialog"
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
              <el-form
                v-if="item.value === 'receivable_account'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="receivable_accountRules"
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
                      <el-form-item label="甲方姓名:" prop="firstPartyName">
                        <el-input
                          v-model="checkedPossessionsDatas[index].firstPartyName"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="乙方姓名:" prop="secondPartyName">
                        <el-input
                          v-model="checkedPossessionsDatas[index].secondPartyName"
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
                      <el-form-item label="合同金额:" prop="contractAmount">
                        <el-input
                          v-model="checkedPossessionsDatas[index].contractAmount"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'contractAmount',99999999999)"
                          @change="numberChange($event,index,'contractAmount',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="应收金额:" prop="receivableAmount">
                        <el-input
                          v-model="checkedPossessionsDatas[index].receivableAmount"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'receivableAmount',99999999999)"
                          @change="numberChange($event,index,'receivableAmount',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
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
                      <el-form-item label="约定期限:" prop="time">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].time"
                          type="monthrange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="dataPickerChange(index)"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile="UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 应收租金 -->
              <el-form
                v-if="item.value === 'receivable_rent'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="receivable_rentRules"
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
                      <el-form-item label="甲方姓名:" prop="firstPartyName">
                        <el-input
                          v-model="checkedPossessionsDatas[index].firstPartyName"
                          placeholder="请输入"
                          type="text"
                          min="0"
                          maxlength="50"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="乙方姓名:" prop="secondPartyName">
                        <el-input
                          v-model="checkedPossessionsDatas[index].secondPartyName"
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
                      <el-form-item label="合同金额:" prop="contractAmount">
                        <el-input
                          v-model="checkedPossessionsDatas[index].contractAmount"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'contractAmount',99999999999)"
                          @change="numberChange($event,index,'contractAmount',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="应收金额:" prop="receivableAmount">
                        <el-input
                          v-model="checkedPossessionsDatas[index].receivableAmount"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'receivableAmount',99999999999)"
                          @change="numberChange($event,index,'receivableAmount',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="认定价值:" prop="identifyValue">
                        <el-input
                          v-model="checkedPossessionsDatas[index].identifyValue"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'identifyValue',99999999999)"
                          @change="numberChange($event,index,'identifyValue',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
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
                      <el-form-item label="约定期限:" prop="time">
                        <el-date-picker
                          v-model="checkedPossessionsDatas[index].time"
                          type="monthrange"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="dataPickerChange(index)"
                          value-format="yyyy-MM-dd"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile="UploadFile"></ImageUpload> -->
                    <ImageInfoTabs
                      :tabsData="checkedPossessionsDatas[index].tabsData"
                      :imageData="checkedPossessionsDatas[index].listMap"
                      @updateChild="updateImageData"
                    ></ImageInfoTabs>
                  </el-row>
                </div>
              </el-form>
              <!-- 股份股权 -->
              <el-form
                v-if="item.value === 'legal_right'"
                size="mini"
                :model="checkedPossessionsDatas[index]"
                :ref="`form${index}`"
                :rules="legal_rightRules"
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
                      <el-form-item label="企业注册资本金:" prop="registerCapital">
                        <el-input
                          v-model="checkedPossessionsDatas[index].registerCapital"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'registerCapital',99999999999)"
                          @change="numberChange($event,index,'registerCapital',99999999999)"
                        >
                          <template slot="append">万元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="企业资产总额:" prop="totalAssets">
                        <el-input
                          v-model="checkedPossessionsDatas[index].totalAssets"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'totalAssets',99999999999)"
                          @change="numberChange($event,index,'totalAssets',99999999999)"
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
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="11"
                          v-number-input.float="2"
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
                      <el-form-item label="股权占比(%)" prop="proportion">
                        <el-input
                          v-model="checkedPossessionsDatas[index].proportion"
                          placeholder="请输入"
                          type="number"
                          @mousewheel.native.prevent
                          min="0"
                          maxlength="5"
                          max="100"
                          v-number-input.float="2"
                           @input="numberChange($event,index,'proportion',100)"
                          @change="numberChange($event,index,'proportion',100)"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-form-item label="股东名单:" required></el-form-item>
                    <TableEdit
                      style="margin-left:60px; margin-right:60px"
                      :ref="`shareholdersTable${index}`"
                      :columns="checkedPossessionsDatas[index].shareholdersColumns"
                      :data="checkedPossessionsDatas[index].shareholderInfo"
                      :buttons="checkedPossessionsDatas[index].shareholdersButtons"
                      row-key="tmpid"
                    ></TableEdit>
                    <div class="btns-center-box">
                      <el-button
                        v-show="checkedPossessionsDatas[index].showShareholdersAddButton"
                        size="mini"
                        icon="el-icon-plus"
                        @click="$_handleAdd()"
                      >添加</el-button>
                    </div>
                  </el-row>
                  <el-row :gutter="10">
                    <el-form-item label="影像资料上传:" required></el-form-item>
                    <!-- <ImageUpload :searchData="checkedPossessionsDatas[index].imageData" @UploadFile="UploadFile"></ImageUpload> -->
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
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { pledgeCreate } from '@/api/business-common'
import { handelDigital } from '@/utils/format.js'
import NP from 'number-precision'

export default {
  components: {
    // ImageUpload: () => import('@/components/demo'),
    ImageInfoTabs: () => import('@/components/ImageInfoTabs'),
    TableEdit: () => import('@/components/TableEdit')
  },
  name: 'PledgeInfoDialog',
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
          {
          value: 'receivable_account',
          label: '应收账款质押'
        },
        {
          value: 'receivable_rent',
          label: '应收租金质押'
        },
        {
          value: 'legal_right',
          label: '法人股权质押'
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
    }
  },
  mounted() {},
  data() {
    return {
      // cascaderOptions: this.authResultOptions, // 省市区三级联动
      editableTabsValue: '',
      tabIndex: 0,
      currentTabIndex: 0,
      checkedPossessionsTypes: [],
      owerTypeSource: [],
      /**
       *
       * 应收账款
       * receivable_accountForm: {
        owner: '', // 所属权属
        firstPartyName: '', // 甲方
        secondPartyName: '', // 乙方
        contractAmount: '', // 合同金额
        receivableAmount: '', // 应收金额
        time: '', // 约定期限
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
      },
      * 应收租金
       * receivable_rentForm: {
        owner: '', // 所属权属
        firstPartyName: '', // 甲方
        secondPartyName: '', // 乙方
        contractAmount: '', // 合同金额
        receivableAmount: '', // 应收金额
        time: '', // 约定期限
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
      },
       * 法人股权
       * legal_rightForm: {
        owner: '', // 所属权属
        registerCapital: '', // 注册资本
        totalAssets: '', // 资产
        identifyValue: '', // 认定价值
        identifyOrgan: '', // 认定机构
      }
       */
      checkedPossessionsDatas: [],
      receivable_accountImageData: [
        {
          code: 1,
          companyName: '合同照片'
        },
        {
          code: 2,
          companyName: '人行征信中心应收账款质押登记受理截图'
        },
        {
          code: 3,
          companyName: '他项权利证书照片'
        }
      ],
      legal_rightImageData: [],
      receivable_accountRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        firstPartyName: [{ required: true, message: '请输入甲方名称', trigger: 'blur' }],
        secondPartyName: [{ required: true, message: '请输入乙方名称', trigger: 'blur' }],
        contractAmount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
        receivableAmount: [{ required: true, message: '请输入应收金额', trigger: 'blur' }],
        time: [{ required: true, message: '请选择约定期限', trigger: 'blur' }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }]
      },
      receivable_rentRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        firstPartyName: [{ required: true, message: '请输入甲方名称', trigger: 'blur' }],
        secondPartyName: [{ required: true, message: '请输入乙方名称', trigger: 'blur' }],
        contractAmount: [{ required: true, message: '请输入合同金额', trigger: 'blur' }],
        receivableAmount: [{ required: true, message: '请输入应收金额', trigger: 'blur' }],
        time: [{ required: true, message: '请选择约定期限', trigger: 'blur' }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }]
      },
      // 股东股权
      legal_rightRules: {
        owner: [{ required: true, message: '请选择所属权属', trigger: 'blur' }],
        registerCapital: [{ required: true, message: '请输入企业注册资本金', trigger: 'blur' }],
        totalAssets: [{ required: true, message: '请输入企业资产总额', trigger: 'blur' }],
        identifyValue: [{ required: true, message: '请输入认定价值', trigger: 'blur' }],
        identifyOrgan: [{ required: true, message: '请输入认定机构', trigger: 'blur' }],
        proportion: [{ required: true, message: '请输入股权占比', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['authResultOptions']),
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
      this.pushEmptData(this.outCheckSource.value, this.checkedPossessionsTypes.length - 1)
      this.editableTabsValue = newTabName
    },
    // 选择日期
    dataPickerChange(val) {
      this.checkedPossessionsDatas[val].accountStart = this.checkedPossessionsDatas[val].time[0]
      this.checkedPossessionsDatas[val].accountEnd = this.checkedPossessionsDatas[val].time[1]
    },
    // 修改权属
    changeOwner(val) {
      var strs = [] // 定义一数组
      strs = this.checkedPossessionsDatas[val].owner.split('_') // 字符分割
      this.checkedPossessionsDatas[val].ownerId = strs[1]
      this.checkedPossessionsDatas[val].ownerRole = strs[0]
    },

    addNewTab(targetName) {
      const newTabName = this.outCheckSource.label + ++this.tabIndex
      this.checkedPossessionsTypes.push({
        label: newTabName,
        value: this.outCheckSource.value
      })
      this.pushEmptData(this.outCheckSource.value, this.checkedPossessionsTypes.length - 1)
      this.editableTabsValue = newTabName
      this.currentTabIndex = this.checkedPossessionsTypes.length - 1
    },

    pushEmptData(modelType, index) {
      if (modelType === 'receivable_account') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          firstPartyName: '', // 甲方名称
          secondPartyName: '', // 乙方名称
          // otherNo: '', // 他项权利编号
          contractAmount: '', // 合同金额
          receivableAmount: '', // 应收金额
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          oneLevelType: 'power',
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'pledge_contract',
              tabName: '合同照片'
            },
            {
              code: 'pledge_receivable_receipt',
              tabName: '人行征信中心应收账款质押登记受理截图'
            },
            {
              code: 'pledge_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'receivable_rent') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属产权
          firstPartyName: '', // 甲方名称
          secondPartyName: '', // 乙方名称
          // otherNo: '', // 他项权利编号
          contractAmount: '', // 合同金额
          receivableAmount: '', // 应收金额
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          oneLevelType: 'power',
          twoLevelType: this.outCheckSource.value,
          tabsData: [
            {
              code: 'pledge_contract',
              tabName: '合同照片'
            },
            {
              code: 'pledge_receivable_receipt',
              tabName: '人行征信中心应收账款质押登记受理截图'
            },
            {
              code: 'pledge_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
      } else if (modelType === 'legal_right') {
        this.checkedPossessionsDatas.push({
          owner: '', // 所属权属
          registerCapital: '', // 注册资本
          asstotalAssetsets: '', // 资产
          identifyValue: '', // 认定价值
          identifyOrgan: '', // 认定机构
          shareholdersEditIds: [],
          oneLevelType: 'power',
          // 是否显示股东名单添加按钮
          showShareholdersAddButton: true,
          maxRatio: 100,
          twoLevelType: this.outCheckSource.value,
          shareholdersButtons: Object.freeze([]),
          shareholderInfo: [],
          tabsData: [
            {
              code: 'pledge_license',
              tabName: '营业执照'
            },
            {
              code: 'pledge_receipt',
              tabName: '入押回执'
            },
            {
              code: 'pledge_other_warrant',
              tabName: '他项权利证书照片'
            }
          ],
          listMap: {}
        })
        this.checkedPossessionsDatas[index]['shareholdersColumns'] = Object.freeze([
          {
            label: '股东名称',
            prop: 'name',
            editable: true,
            field: {
              componentType: 'input',
              placeholder: '请输入股东名称',
              rules: [
                {
                  required: true,
                  message: '请输入股东名称'
                }
              ]
            }
          },
          {
            label: '股权占比(%)',
            prop: 'rate',
            editable: true,
            field: {
              componentType: 'number',
              placeholder: '请输入股权占比',
              max: Number(this.checkedPossessionsDatas[this.currentTabIndex].maxRatio),
              min: 0,
              rules: [
                {
                  required: true,
                  message: '请输入股权占比'
                }
              ]
            }
          },
          {
            label: '操作',
            actions: [
              {
                id: 'edit',
                rowKey: 'tmpid',
                text: '编辑',
                before: row => {
                  return (
                    this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds &&
                    !this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.includes(row.tmpid)
                  )
                },
                click: row => this.$_handleEdit(row)
              },
              {
                id: 'save',
                rowKey: 'tmpid',
                text: '保存',
                before: row => {
                  return (
                    this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds &&
                    this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.includes(row.tmpid)
                  )
                },
                click: row => this.$_handleSave(row)
              },
              {
                id: 'edit',
                rowKey: 'tmpid',
                text: '删除',
                click: row => this.$_handleDel(row)
              }
            ]
          }
        ])
      }
    },
    updateImageData(params) {
      const index = this.checkedPossessionsTypes.findIndex((item, index) => item.label === this.editableTabsValue)
      this.$set(this.checkedPossessionsDatas[index].listMap, params.key, params.val)
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
      // 判断table是否正在编辑
      const obj = {}
      var pResult = {}
      var rateObj = {}
      for (let i = 0; i < this.checkedPossessionsDatas.length; i++) {
        if (this.outCheckSource.value === 'legal_right') {
          this.checkedPossessionsDatas[i].shareholdersEditIds.find(subItem => {
            obj[`shareholdersColumns${i}`] = i
            return subItem
          })
          var number = 0
          this.checkedPossessionsDatas[i].shareholderInfo.forEach(item => {
            number = NP.plus(Number(number), Number(item.rate))
          })
          number = NP.plus(Number(number), Number(this.checkedPossessionsDatas[i].proportion))
          if (number > 100) {
            rateObj[`shareholdersColumns${i}`] = i
          }
        }
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
      if (this.outCheckSource.value === 'legal_right') {
        for (const resultItem in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, resultItem) && obj[resultItem]) {
            this.$message.warning({ message: `请保存${this.checkedPossessionsTypes[obj[resultItem]].label}股东名单` })
            this.editableTabsValue = this.checkedPossessionsTypes[obj[resultItem]].label
            return
          }
        }
        for (const resultItem1 in rateObj) {
          if (Object.prototype.hasOwnProperty.call(rateObj, resultItem1)) {
            this.$message.warning({ message: `请确认${this.checkedPossessionsTypes[rateObj[resultItem1]].label}股权占比` })
            this.editableTabsValue = this.checkedPossessionsTypes[rateObj[resultItem1]].label
            return
          }
        }
      }

      Promise.all(Object.values(pResult))
        .then(() => {
          // // 保存
          var saveDict = {
            pledges: this.checkedPossessionsDatas
          }
          pledgeCreate(this.outCheckSource.value, saveDict).then(res => {
            if (res.status === 200) {
              this.$message.success('添加成功')
              // this.$emit('mortgageSaveInfo', saveDict)
              this.checkedPossessionsTypes = []
              this.checkedPossessionsDatas = []
              this.$emit('pledgeSaveInfo', res.data)
            } else {
              this.$message.error(res.message || '创建失败，请稍后重试')
            }
          })
        })
        .catch(value => {
          this.$message.error(`请填写${value}必填字段`)
        })
    },
    // 点击tab
    clickTab(targetName) {
      let nextIndex
      this.checkedPossessionsTypes.forEach((tab, index) => {
        if (tab.label === targetName.label) {
          nextIndex = index
        }
      })
      this.currentTabIndex = nextIndex
    },
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
        this.currentTabIndex = this.checkedPossessionsTypes.length - 1
      })
    },
    numberChange(e, index, val, max) {
      const newValue = handelDigital(e, true, '2')
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
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row) {
      this.$refs[`shareholdersTable${this.currentTabIndex}`][0].startEditRow(row.tmpid)
      this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.push(row.tmpid)
    },
    // 保存一行
    $_handleSave(row) {
      this.$refs[`shareholdersTable${this.currentTabIndex}`][0].endEditRow(row.tmpid, (valid, result, oldRow) => {
        if (valid) {
          const index = this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.findIndex(item => item === row.tmpid)
          this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.splice(index, 1)
          // 添加到新的数组中
          this.checkedPossessionsDatas[this.currentTabIndex].shareholderInfo = this.checkedPossessionsDatas[this.currentTabIndex].shareholderInfo.map(item => {
            if (result.tmpid === item.tmpid) {
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
    $_handleAdd() {
      const tmpid = uuidv4()
      this.checkedPossessionsDatas[this.currentTabIndex].shareholderInfo.push({
        tmpid,
        name: '',
        rate: ''
      })
      this.checkedPossessionsDatas[this.currentTabIndex].shareholdersEditIds.push(tmpid)
      this.$refs[`shareholdersTable${this.currentTabIndex}`][0].startEditRow(tmpid)
    },
    // 删除一行
    $_handleDel(row, type) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this[`${type}Data`] = this[`${type}Data`].filter(item => {
          if (item.tmpid !== row.tmpid) {
            return item
          }
        })
        const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
        this[`${type}EditIds`].splice(index, 1)
      })
    }
  }
}
</script>
<style lang="scss">
.pledge-info-dialog {
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
