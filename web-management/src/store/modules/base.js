import { getMapList } from '@/api/map'
import { getLoanList, getCooperativeEnterprise } from '@/api/loan'
import { getProvince, getCity, getCounty, getRegions, getStatusEnum } from '@/api/common'
export default {
  state: {
    // 产品类型
    prodects: [
      {
        label: '农资贷',
        value: '1'
      },
      {
        label: '农地贷',
        value: '2'
      }
    ],
    // MAP中心产品
    mapProducts: [],
    // 借款产品数据
    loanProducts: [],
    // 流程状态
    approvalStatus: [
      {
        label: '正常',
        value: 'EXAMINATION_APPROVAL',
        key: '8,9'
      },
      {
        label: '审批拒绝',
        value: 'REJECT',
        key: '11'
      },
      {
        label: '已过期',
        value: 'PASTDUE',
        key: '12'
      }
    ],
    approvalStates: [
      {
        label: '正常',
        value: 'REJECT',
        key: '8'
      },
      {
        label: '正常',
        value: 'PASTDUE',
        key: '9'
      },
      {
        label: '审批拒绝',
        value: 'REJECT',
        key: '11'
      },
      {
        label: '已过期',
        value: 'PASTDUE',
        key: '12'
      }
    ],
    // 业务中心产品状态
    applyStatus: [
      // 1.成功 2失败 3.处理中，4金融专员提交 5提交审批
      {
        label: '成功',
        value: 1
      },
      {
        label: '失败',
        value: 2
      },
      {
        label: '处理中',
        value: 3
      },
      {
        label: '金融专员提交',
        value: 4
      },
      {
        label: '提交审批',
        value: 5
      }
    ],
    // 展业状态
    businessStatus: [],
    // 客户状态 '客户状态 1、正常  2、冻结   3、删除',
    customerStatus: [
      {
        label: '正常',
        value: 1
      },
      {
        label: '冻结',
        value: 2
      }
      // {
      //   label: '删除',
      //   value: 3
      // }
    ],
    // 担保公司role枚举
    companyRole: [
      // {
      //   label: '资金提供方',
      //   value: 'fund_provide'
      // },
      // {
      //   label: '借款服务机构',
      //   value: 'loan_service'
      // },
      // {
      //   label: '代理收付机构',
      //   value: 'payment_agent'
      // },
      // {
      //   label: '评级机构',
      //   value: 'grade_organ'
      // },
      // {
      //   label: '借款类业务合作机构',
      //   value: 'loan_cooperation'
      // },
      // {
      //   label: '期货经纪人',
      //   value: 'futures_agent'
      // },
      {
        label: '担保机构',
        value: 'guarantee_organ'
      }
    ],
    // 担保公司类型type枚举
    companyType: [
      {
        label: '担保公司',
        value: 'guarantee'
      }
      // {
      //   label: '银行',
      //   value: 'bank'
      // },
      // {
      //   label: '信托公司',
      //   value: 'trust'
      // },
      // {
      //   label: '保险公司',
      //   value: 'insurance'
      // },
      // {
      //   label: '期货公司',
      //   value: 'futures'
      // },
      // {
      //   label: '证券公司',
      //   value: 'bond'
      // },
      // {
      //   label: '金融资产管理公司',
      //   value: 'finance_asset'
      // },
      // {
      //   label: '金融租赁公司',
      //   value: 'finance_rent'
      // },
      // {
      //   label: '保理公司',
      //   value: 'factoring'
      // },
      // {
      //   label: '小额借款公司',
      //   value: 'small_loan'
      // },
      // {
      //   label: 'SGC',
      //   value: 'sgc'
      // }
    ],
    // 受众业务 // P个人E企业
    userType: [
      {
        label: '个人业务',
        value: 'P'
      },
      {
        label: '对公业务',
        value: 'E'
      }
    ],
    // 是否新用户
    newUserFlag: [],
    // 合作企业查询 getCooperativeEnterprise
    cooperativeEnterprise: [],

    regions: [], // 所有地区信息
    province: [], // 省
    city: [], // 市
    county: [], // 县/区
    street: [], // 街道
    // 影响资料 tab 标头数据
    imageTabs: [
      { name: '企业章程及变更决议', value: 'legal_company_constitution' },
      { name: '法人身份证', value: 'legal_id_card' },
      { name: '实际控制人身份证', value: 'legal_controller_id_card' },
      { name: '股东身份证', value: 'legal_shareholder_id_card' },
      { name: '同意担保股东/股东会（成员）决议', value: 'legal_resolution' },
      { name: '实际控制人及配偶结婚证明', value: 'legal_controller_marriage_certificate' },
      { name: '金融经理与法定代表人合影', value: 'legal_group_photo' },
      { name: '现场调查照片', value: 'legal_scene_photo' },
      { name: '企业简介', value: 'legal_company_introduction' },
      { name: '开户明细', value: 'legal_account_details' },
      { name: '借贷明细', value: 'legal_loan_details' },
      { name: '投资明细', value: 'legal_investment_details' },
      { name: '上下游交易明细', value: 'legal_trade_investment' },
      { name: '最新月度财务报表', value: 'legal_month_report' },
      { name: '最近连续两年年度报告', value: 'legal_year_report' },
      { name: '库存明细', value: 'legal_stock_details' },
      { name: '银行流水', value: 'person_bank_statement' },
      { name: '法定代表人、实际控制人征信查询授权书或《详版人行个人征信报告》', value: 'legal_credit_report' },
      { name: '企业征信查询授权书或《企业征信报告》', value: 'legal_company_credit_report' },
      { name: '企业验资报告', value: 'legal_verification_report' },
      { name: '法人及配偶结婚证明', value: 'legal_marriage_certificate' },
      { name: '担保明细', value: 'legal_guarantee_details' },
      { name: '企业征信申请书', value: 'legal_credit_apply' },
      { name: '其他', value: 'legal_other' }
    ]
  },

  mutations: {
    // MAP中心产品类型
    SET_PRODUCTS_TYPE: (state, payload) => {
      state.prodects = payload
    },
    // MAP中心产品  prodects
    SET_MAP_PRODUCTS: (state, payload) => {
      state.mapProducts = payload
    },
    // 借款产品数据
    SET_LOAN_PRODUCTS: (state, payload) => {
      state.loanProducts = payload
    },
    // 流程状态
    SET_APPROVAL_STATUS: (state, payload) => {
      state.approvalStatus = payload
    },
    // 展业状态
    SET_BUSINESS_STATUS: (state, payload) => {
      state.businessStatus = payload
    },
    // 合作企业列表数据
    SET_COOPERATIVE_ENTERPRISE: (state, payload) => {
      state.cooperativeEnterprise = payload
    },
    // 获取所有省市区信息
    SET_REGIONS: (state, payload) => {
      state.regions = payload
    },
    // 根据区域id查询当前区域信息 省
    SET_PROVINCE: (state, payload) => {
      state.province = payload
    },
    // 根据区域id查询当前区域信息 市
    SET_CITY: (state, payload) => {
      state.city = payload
    },
    // 根据区域id查询当前区域信息 县/区
    SET_COUNTY: (state, payload) => {
      state.county = payload
    },
    // 根据区域id查询当前区域信息 街道
    SET_STREET: (state, payload) => {
      state.street = payload
    },
    // 是否新用户
    SET_NEW_USER_FLAG: (state, payload) => {
      state.newUserFlag = payload
    }
  },
  actions: {
    // MAP中心产品类型
    async GetProdectsType({ commit }, params) {
      let { data } = await getStatusEnum(params)
      data =
        data &&
        data.map(item => {
          return {
            ...item,
            label: item.value,
            value: item.code
          }
        })
      commit('SET_PRODUCTS_TYPE', data)
    },
    // 获取MAP中心产品列表
    async GetMAPProducts({ commit }, payload) {
      let { status, data } = await getMapList({
        current: 1,
        pages: 0,
        size: 10000
      })
      if (+status === 200) {
        data =
          data &&
          data.records.map(item => {
            return {
              ...item,
              label: item.name,
              value: item.id + ''
            }
          })
        commit('SET_MAP_PRODUCTS', data)
      } else {
        commit('SET_MAP_PRODUCTS', [])
      }
    },
    // 获取借款产品列表
    async GetLoanProducts({ commit }, payload) {
      let { data } = await getLoanList({
        current: 1,
        pages: 0,
        size: 100000,
        status: 1
      })
      data =
        data &&
        data.records.map(item => {
          return {
            ...item,
            productName: item.name,
            label: item.name,
            value: item.id + ''
          }
        })

      commit('SET_LOAN_PRODUCTS', data)
    },
    // 展业状态
    async GetStatusEnmu({ commit }, params) {
      let { data } = await getStatusEnum(params)
      data =
        data &&
        data.map(item => {
          return {
            ...item,
            label: item.value,
            value: item.code
          }
        })
      commit('SET_BUSINESS_STATUS', data)
    },
    // 获取合作企业列表
    async GetCooperativeEnterprise({ commit }, payload) {
      let { data } = await getCooperativeEnterprise()
      data =
        data &&
        data.map(item => {
          return {
            ...item,
            value: item.id + '',
            label: item.name
          }
        })
      commit('SET_COOPERATIVE_ENTERPRISE', data)
    },
    // 获取所有省市区信息
    async GetRegions({ commit }, payload) {
      const { data } = await getRegions()
      commit('SET_REGIONS', data.list)
      return data.list
    },
    // 获取省
    async GetProvince({ commit }, payload) {
      const { data } = await getProvince()
      commit('SET_PROVINCE', data)
      return data
    },
    // 获取市
    async GetCity({ commit }, payload) {
      const { data } = await getCity(payload)
      commit('SET_CITY', data.list)
      return data
    },
    // 获取县
    async GetCounty({ commit }, payload) {
      const { data } = await getCounty(payload)
      commit('SET_COUNTY', data.list)
      return data
    },
    // 是否新用户
    async GetNewUserFlag({ commit }, params) {
      let { data } = await getStatusEnum(params)
      data =
        data &&
        data.map(item => {
          return {
            ...item,
            label: item.value,
            value: item.code
          }
        })
      commit('SET_NEW_USER_FLAG', data)
    }
  }
}

// approvalStatus: [
//   {
//     label: '待展业',
//     value: 1
//   },
//   {
//     label: '待完善资料',
//     value: 2
//   },
//   {
//     label: '待金融经理提交',
//     value: 3
//   },
//   {
//     label: '金融经理驳回',
//     value: 4
//   },
//   {
//     label: '待风险审批',
//     value: 5
//   },
//   {
//     label: '审批退回待提交',
//     value: 6
//   },
//   {
//     label: '审批拒绝复议',
//     value: 7
//   },
//   {
//     label: '有条件审批通过',
//     value: 8
//   },
//   {
//     label: '审批通过',
//     value: 9
//   },
//   {
//     label: '放弃展业',
//     value: 10
//   },
//   {
//     label: '审批拒绝',
//     value: 11
//   }
// ]
