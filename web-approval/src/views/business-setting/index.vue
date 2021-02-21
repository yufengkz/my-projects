/* 审批业务设置页面 */
<template>
  <div class="businessSetting">
    <!-- 授信业务审批设置 -->
    <el-form
      ref="Form"
      :model="basicForm"
      :rules="rules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <div class="all-title">授信业务审批设置</div>
      <el-divider></el-divider>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">分案规则设置:</div>
          <el-form-item prop label>
            <DescriptionList class="m-l-20">
              <Description label="规则条件">按案件数量分配</Description>
              <Description label="分配方式">平均分配</Description>
            </DescriptionList>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">审批权限设置:</div>
          <el-form-item prop>
            <DescriptionList class="m-l-20">
              <Description label="权限条件">授信审批金额（万元）</Description>
            </DescriptionList>
            <div class="divisionalContext">
              <span>条件内容</span>
              <el-col :span="20">
                <el-table :data="basicForm.creditData" ref="creditTable" border size="mini" class="m-t-20">
                  <el-table-column label="三级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveThree"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveThree || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="二级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveTwo"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveTwo || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="一级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveOne"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveOne || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column label="贷审会" min-width="100">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.creditReview"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.creditReview || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == false"
                        @click="handleEdit(scope.$index, scope.row,'credit')"
                      >编辑</el-button>
                      <el-button size="mini" v-else @click="handleSave(scope.$index, scope.row,'credit')">保存</el-button>
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == true"
                        type="danger"
                        @click="handleCancel(scope.$index, scope.row,'credit')"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 担保审批设置 naturalApproval  -->
    <el-form
      ref="Form"
      :model="basicForm"
      :rules="rules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <div class="all-title">担保审批设置</div>
      <el-divider></el-divider>
      <!-- 自然担保人审批设置 -->
      <div class="title">自然人担保审批设置</div>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">分案规则设置:</div>
          <el-form-item prop label>
            <DescriptionList class="m-l-20">
              <Description label="规则条件">按案件数量分配</Description>
              <Description label="分配方式">平均分配</Description>
            </DescriptionList>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">审批权限设置:</div>
          <el-form-item prop>
            <DescriptionList class="m-l-20">
              <Description label="权限条件">担保审批金额（万元）</Description>
            </DescriptionList>
            <div class="divisionalContext">
              <span>条件内容</span>
              <el-col :span="20">
                <el-table :data="basicForm.naturalData" ref="naturalTable" border size="mini" class="m-t-20">
                  <el-table-column label="三级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveThree"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveThree || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="二级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveTwo"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveTwo || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="一级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveOne"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveOne || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>

                  <el-table-column label="贷审会" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.creditReview"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.creditReview || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == false"
                        @click="handleEdit(scope.$index, scope.row,'natural')"
                      >编辑</el-button>
                      <el-button size="mini" v-else @click="handleSave(scope.$index, scope.row,'natural')">保存</el-button>
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == true"
                        type="danger"
                        @click="handleCancel(scope.$index, scope.row,'natural')"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 法人担保审批设置 -->
    <el-form
      ref="Form"
      :model="basicForm"
      :rules="rules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <el-divider></el-divider>
      <div class="title">法人担保审批设置</div>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">分案规则设置:</div>
          <el-form-item prop label>
            <DescriptionList class="m-l-20">
              <Description label="规则条件">按案件数量分配</Description>
              <Description label="分配方式">平均分配</Description>
            </DescriptionList>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="20">
          <div class="my-el-title">审批权限设置:</div>
          <el-form-item prop>
            <DescriptionList class="m-l-20">
              <Description label="权限条件">担保审批金额（万元）</Description>
            </DescriptionList>
            <div class="divisionalContext">
              <span>条件内容</span>
              <el-col :span="20">
                <el-table :data="basicForm.personData" ref="personTable" border size="mini" class="m-t-20">
                  <el-table-column label="三级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveThree"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveThree || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="二级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveTwo"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveTwo || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="一级审批" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.approveOne"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.approveOne || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="贷审会" min-width="80">
                    <template slot-scope="scope">
                      <div v-if="scope.row.editStatus">
                        <el-input
                          type="text"
                          v-model="scope.row.creditReview"
                          maxlength="16"
                          size="mini"
                          placeholder="请输入金额"
                        ></el-input>
                      </div>
                      <div v-else>
                        <span>
                          <span>{{scope.row.creditReview || "--"}}</span>
                        </span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" min-width="150">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == false"
                        @click="handleEdit(scope.$index, scope.row,'person')"
                      >编辑</el-button>
                      <el-button size="mini" v-else @click="handleSave(scope.$index, scope.row,'person')">保存</el-button>
                      <el-button
                        size="mini"
                        v-if="scope.row.editStatus == true"
                        type="danger"
                        @click="handleCancel(scope.$index, scope.row,'person')"
                      >取消</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 查证审批设置 -->
    <el-form
      ref="Form"
      :model="basicForm"
      :rules="rules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <div class="all-title">查证审批设置</div>
      <el-divider></el-divider>
      <div class="title">查证审批设置</div>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="my-el-title">分案规则设置:</div>
          <el-form-item prop label>
            <DescriptionList class="m-l-20">
              <Description label="规则条件">按案件数量分配</Description>
              <Description label="分配方式">平均分配</Description>
            </DescriptionList>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>

import { approveBusSettingSave, approveBusSettingQuery } from '@/api/approval'

export default {
  name: 'BusinessSetting',
  components: {
    DescriptionList: () => import('@/components/DescriptionList')
  },
  data() {
    return {
      creditRecordData: [], // 保存授信业务默认的数据
      naturalRecordData: [], // 保存授信自然人默认的数据
      personRecordData: [], // 保存授信法人默认的数据
      basicForm: {
        // table 表格数据
        creditData: [{ id: 1, approveThree: 0, approveTwo: 0, approveOne: 0, creditReview: 0, editStatus: true }], //  // 授信表单数据
        naturalData: [{ id: 21, approveThree: 0, approveTwo: 0, approveOne: 0, creditReview: 0, editStatus: true }], // 担保表单数据
        personData: [{ id: 2, approveThree: 0, approveTwo: 0, approveOne: 0, creditReview: 0, editStatus: true }] // 自然人表单数据
      },
      rules: {},
      credit: Object.freeze([
        {
          label: '三级审批',
          prop: 'approveThree',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入三级审批',
            rules: [
              {
                required: true,
                message: '请输入三级审批'
              }
            ]
          }
        },
        {
          label: '二级审批',
          prop: 'approveTwo',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入二级审批',
            rules: [
              {
                required: true,
                message: '请输入二级审批'
              }
            ]
          }
        },
        {
          label: '一级审批',
          prop: 'approveOne',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入一级审批',
            rules: [
              {
                required: true,
                message: '请输入一级审批'
              }
            ]
          }
        },
        {
          label: '贷审会',
          prop: 'creditReview',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入贷审会',
            rules: [
              {
                required: true,
                message: '请输入贷审会'
              }
            ]
          }
        }
      ]),
      natural: Object.freeze([
        {
          label: '三级审批',
          prop: 'approveThree',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入三级审批',
            rules: [
              {
                required: true,
                message: '请输入三级审批'
              }
            ]
          }
        },
        {
          label: '二级审批',
          prop: 'approveTwo',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入二级审批',
            rules: [
              {
                required: true,
                message: '请输入二级审批'
              }
            ]
          }
        },
        {
          label: '一级审批',
          prop: 'approveOne',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入一级审批',
            rules: [
              {
                required: true,
                trigger: 'change',
                message: '请输入一级审批'
              }
            ]
          }
        },
        {
          label: '贷审会',
          prop: 'creditReview',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入贷审会',
            rules: [
              {
                required: true,
                message: '请输入贷审会'
              }
            ]
          }
        }
      ]),
      person: Object.freeze([
        {
          label: '三级审批',
          prop: 'approveThree',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入三级审批',
            rules: [
              {
                required: true,
                message: '请输入三级审批'
              }
            ]
          }
        },
        {
          label: '二级审批',
          prop: 'approveTwo',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入二级审批',
            rules: [
              {
                required: true,
                message: '请输入二级审批'
              }
            ]
          }
        },
        {
          label: '一级审批',
          prop: 'approveOne',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入一级审批',
            rules: [
              {
                required: true,
                message: '请输入一级审批'
              }
            ]
          }
        },
        {
          label: '贷审会',
          prop: 'creditReview',
          align: 'center',
          editable: true,
          field: {
            componentType: 'text',
            message: '请输入贷审会',
            rules: [
              {
                required: true,
                message: '请输入贷审会'
              }
            ]
          }
        }
      ])
    }
  },
  created() {
    this.approveBusSettingQueryFun()
  },
  mounted() {},
  methods: {
    // 取消按钮
    handleCancel(index, item, type) {
      this.basicForm[`${type}Data`] = this[`${type}RecordData`].map(item1 => {
        return { ...item1, editStatus: false }
      })
    },
    // 编辑按钮
    handleEdit(index, item, type) {
      this.basicForm[`${type}Data`] = this.basicForm[`${type}Data`].map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
      })
      this.recordDataFun(type)
    },
    // 保存按钮
    handleSave(index, item, type) {
      let isVerifyCode = true
      const newVal = this.$refs[`${type}Table`].data[0] // 获取到修改后的值
      const Zero = Number(newVal.creditReview) // 贷审会
      const One = Number(newVal.approveOne) // 一级审批
      const Two = Number(newVal.approveTwo) // 二级审批
      const Three = Number(newVal.approveThree) // 三级审批
      // 一. 贷审会 大于 1 、2、 3 级
      if (Zero > One && Zero > Two && Zero > Three) {
        // 二. 一级审批 必须 大于 2、 3 级 并且小于贷审会
        if (One > Two && One > Three) {
          if (Two > Three) {
            this.$message.success({ message: 'ok' })
          } else {
            // 二级审批 必须 大于3 级
            isVerifyCode = false
            this.$message.error({ message: '后一级必须大于前一级' })
          }
        } else {
          // 一级审批 必须 大于 2、 3 级
          isVerifyCode = false
          this.$message.error({ message: '后一级必须大于前一级' })
        }
      } else {
        isVerifyCode = false
        this.$message.error({ message: '后一级必须大于前一级' })
      }
      if (isVerifyCode) {
        // 如果成立 修改显示编辑状态的开关
        this.basicForm[`${type}Data`] = this.basicForm[`${type}Data`].map(item1 => {
          if (item === item1) {
            item1.editStatus = false
          }
          return item1
        })
        var params = []
        var busType = (type === 'credit' ? 'C01' : (type === 'natural' ? 'C02' : 'C03'))
        for (var i = 0; i < 4; i++) {
          // var condtionContentSub = '0'
          var condtionContentSub
          if (i === 0) {
            condtionContentSub = item.creditReview
          } else if (i === 1) {
            condtionContentSub = item.approveOne
          } else if (i === 2) {
            condtionContentSub = item.approveTwo
          } else {
            condtionContentSub = item.approveThree
          }
          params.push({
            busType,
            conditionType: 'LV' + String(i),
            condtionContent: condtionContentSub
          })
        }
        this.approveBusSettingSaveFun(params)
      }
    },
    // 记录保存没修改之前的数据方法
    recordDataFun(type) {
      const data = this.basicForm[`${type}Data`] && JSON.parse(JSON.stringify(this.basicForm[`${type}Data`]))
      this[`${type}RecordData`] = data
    },
    // 保存
    approveBusSettingSaveFun(params) {
      approveBusSettingSave(params).then(res => {
        if (res.status === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.message || '保存失败，请稍后重试')
        }
      })
    },
    // 查询
    approveBusSettingQueryFun() {
      approveBusSettingQuery().then(res => {
        if (res.status === 200) {
          if (res.data.length !== 0) {
            res.data.forEach(item => {
              if (item.busType === 'C01') {
                if (item.conditionType === 'LV0') {
                  this.basicForm.creditData[0].creditReview = item.condtionContent
                } else if (item.conditionType === 'LV1') {
                  this.basicForm.creditData[0].approveOne = item.condtionContent
                } else if (item.conditionType === 'LV2') {
                  this.basicForm.creditData[0].approveTwo = item.condtionContent
                } else if (item.conditionType === 'LV3') {
                  this.basicForm.creditData[0].approveThree = item.condtionContent
                }
              } else if (item.busType === 'C02') {
                if (item.conditionType === 'LV0') {
                  this.basicForm.naturalData[0].creditReview = item.condtionContent
                } else if (item.conditionType === 'LV1') {
                  this.basicForm.naturalData[0].approveOne = item.condtionContent
                } else if (item.conditionType === 'LV2') {
                  this.basicForm.naturalData[0].approveTwo = item.condtionContent
                } else if (item.conditionType === 'LV3') {
                  this.basicForm.naturalData[0].approveThree = item.condtionContent
                }
              } else {
                if (item.conditionType === 'LV0') {
                  this.basicForm.personData[0].creditReview = item.condtionContent
                } else if (item.conditionType === 'LV1') {
                  this.basicForm.personData[0].approveOne = item.condtionContent
                } else if (item.conditionType === 'LV2') {
                  this.basicForm.personData[0].approveTwo = item.condtionContent
                } else if (item.conditionType === 'LV3') {
                  this.basicForm.personData[0].approveThree = item.condtionContent
                }
              }
            })
            this.$nextTick(() => {
              this.recordDataFun('credit')
              this.recordDataFun('natural')
              this.recordDataFun('person')
            })
          }
        } else {
          this.$message.error(res.message || '请稍后重试')
          this.recordDataFun('credit')
          this.recordDataFun('natural')
          this.recordDataFun('person')
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.businessSetting {
  padding: 0;
  background: #f2f2f2;
  .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    margin-left: 10px;
    padding: 10px 0;
  }
  .el-form:nth-child(1) {
    margin-top: 0px !important;
  }
  .el-form:nth-child(3) {
    margin-top: 0px !important;
  }
  .el-form {
    background: #fff;
    padding-top: 20px;
    margin-top: 20px !important;
    margin-left: 0 !important;
    /deep/ .m-t-20 {
      margin-top: 0 !important;
    }
  }
  /deep/ .my-el-title {
    font-size: 12px;
    padding: 0 8px;
    margin: 10px 10px;
    border-left: 2px solid #08b448;
  }
  /deep/ .el-form-item__content {
    margin-left: 0 !important;
    margin-top: 10px;
  }
  /deep/ .el-form thead .is-leaf {
    background: #f2f2f2 !important;
  }
  .el-divider {
    margin: 10px 0;
  }

  .divisionalContext {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 20px;
    /deep/ .el-col {
      padding-left: 0 !important;
    }
    > span::after {
      content: ':';
      margin: 0 8px 0 2px;
      position: relative;
      top: -0.5px;
    }
  }
}
</style>
