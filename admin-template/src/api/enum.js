export const enumObj = {
  adjustEnumOptions: [
    { code: '0', value: '有效' },
    { code: '1', value: '已冻结' },
    { code: '2', value: '已过期' }
  ],
  amountStatusOptions: [],
  authRecordTypeOptions: [
    { code: 'Y', value: '通过' },
    { code: 'N', value: '未通过' }
  ],
  authStatusOptions: [
    { code: '0', value: '未认证' },
    { code: '1', value: '已认证' },
    { code: '2', value: '认证失败' }
  ],
  authTypeOptions: [
    { code: 'share_code_id_validator', value: '邀请码实名信息认证' },
    { code: 'three_factor_authenticate', value: '运营商三要素认证' },
    { code: 'corporate_volitional_authenticate', value: '法人意愿认证' },
    { code: 'face_authenticate', value: '人脸认证' },
    { code: 'corporate_authenticate', value: '法人认证' },
    { code: 'company_authenticate', value: '企业认证' },
    { code: 'corporate_controller_authenticate', value: '实控人认证' }
  ],
  billStatusOptions: [
    { code: '0', value: '待缴费' },
    { code: '1', value: '正常结清' },
    { code: '2', value: '部分缴清' },
    { code: '3', value: '逾期' },
    { code: '4', value: '部分逾期' },
    { code: '5', value: '逾期缴清' },
    { code: '6', value: '未出账单' },
    { code: '7', value: '已缴费' }
  ],
  creditApplyApprovalStatusOptions: [],
  creditApplyStatusOptions: [
    { code: '1', value: '已申请授信' },
    { code: '2', value: '已出额，待银行批复' },
    { code: '3', value: '银行批复通过' },
    { code: '5', value: '签约完成' },
    { code: '6', value: '已支用' },
    { code: '7', value: '已结清' },
    { code: '-2', value: '银行批复不通过' },
    { code: '-3', value: '额度失效' },
    { code: '-4', value: '过期不可支用' }
  ],
  customerStatusOptions: [
    { code: '0', value: '认证成功' },
    { code: '1', value: '认证失败' },
    { code: '2', value: '未认证' }
  ],
  excelImportSourceOptions: [
    { code: '1', value: '核心企业组织架构' },
    { code: '2', value: '核心企业业务员' },
    { code: '3', value: '核心企业业务员的融资客户' },
    { code: '4', value: '服务费缴费信息' },
    { code: '5', value: '白名单联系人信息' }
  ],
  financingWillingnessStatusOptions: [
    { code: '0', value: '融资中' },
    { code: '1', value: '已融资结束' }
  ],
  hasLoanEnumOptions: [
    { code: '0', value: '否' },
    { code: '1', value: '是' }
  ],
  messageStatusOptions: [
    { code: '0', value: '未读' },
    { code: '1', value: '已读' },
    { code: '2', value: '发送失败' }
  ],
  roleStatusOptions: [
    { code: '0', value: '启用' },
    { code: '1', value: '等待接受' },
    { code: '2', value: '已解除' }
  ],
  roleTypeOptions: [
    { code: 'manager', value: '经办人' },
    { code: 'corporate', value: '法定代表人' },
    { code: 'corporate_controller_spouse', value: '实际控制人配偶' },
    { code: 'corporate_controller', value: '实际控制人' }
  ],
  signStatusOptions: [
    { code: '0', value: '未签署' },
    { code: '1', value: '有效' },
    { code: '2', value: '已过期' },
    { code: '3', value: '有效已变更' }
  ],
  userRoleEnumOptions: [
    { code: '1', value: '管理员' },
    { code: '2', value: '业务员' }
  ],
  userStatusOptions: [
    { code: '0', value: '启用' },
    { code: '1', value: '关闭' },
    { code: '2', value: '未激活' }
  ],
  whiteListStatusOptions: [
    { code: '0', value: '白名单' },
    { code: '1', value: '白名单过期' }
  ],
  withdrawalStatusOptions: [
    { code: '0', value: '否' },
    { code: '1', value: '是' }
  ],
  orderAuditStatusOptions: [
    { code: '0', value: '已提交OA审批' },
    { code: '1', value: '审批完成' },
    { code: '2', value: '待批准状态' }
  ],
  loanReceiptStatusOptions: [
    { code: '0', value: '已申请' },
    { code: '1', value: '审批通过' },
    { code: '2', value: '已放款' },
    { code: '3', value: '已还清' },
    { code: '-1', value: '审批不通过' },
    { code: '-2', value: '放款失败' }
  ],
  companyAuthStatusOptions: [
    { code: '0', value: '未认证' },
    { code: '1', value: '已认证' },
    { code: '2', value: '认证失败' }
  ],
  operateAuthAcceptStatusOptions: [
    { code: '0', value: '否' },
    { code: '1', value: '是' }
  ],
  contractTypeOptions: [
    { code: 'CORPORATE_CONTROLLER_AUTHORIZE', value: '实控人授权书' },
    { code: 'CORPORATE_CONTROLLER_GUARANTEE', value: '实控人保证合同' },
    { code: 'CORPORATE_CONTROLLER_SPOUSE_GUARANTEE', value: '实控人配偶保证合同' },
    { code: 'PLATFORM_SERVICE_FEE_AGREEMENT', value: '平台服务费协议' },
    { code: 'PERSONAL_CREDIT_AUTHORIZATION', value: '个人征信查询授权书' },
    { code: 'MANAGER_AUTHORIZE', value: '经办人授权书' },
    { code: 'LOAN_CONTRACT', value: '借款合同' },
    { code: 'CREDIT_AUTHORIZATION', value: '企业征信授权查询书' }
  ],
  operateRoleTypeOptions: [
    { code: 'funding', value: '金融机构' },
    { code: 'manager', value: '经办人' },
    { code: 'corporate', value: '法定代表人' },
    { code: 'corporate_controller_spouse', value: '实际控制人配偶' },
    { code: 'company', value: '企业' },
    { code: 'corporate_controller', value: '实际控制人' }
  ],
  userRoleInvitationStatusOptions: [
    { code: '0', value: '未使用' },
    { code: '1', value: '已使用' },
    { code: '2', value: '已过期' }
  ],
  operateWarnStatusOptions: [
    { code: '1', value: '融资权限冻结' },
    { code: '2', value: '不处理' },
    { code: '4', value: '待人工处理' }
  ],
  operateWarnEnumOptions: [
    { code: '1', value: '待处理' },
    { code: '2', value: '待审批' },
    { code: '3', value: '驳回待处理' },
    { code: '5', value: '审批结束' }
  ],
  operateWarnLevelEnumOptions: [
    { code: '1', value: '一级' },
    { code: '2', value: '二级' },
    { code: '3', value: '三级' },
    { code: '4', value: '正常' }
  ],
  companyWithdrawalStatusOptions: [
    { code: '0', value: '开启' },
    { code: '1', value: '关闭' }
  ],
  frozeStatusOptions: [
    { code: '0', value: '未冻结' },
    { code: '1', value: '已冻结' }
  ],
  frozeRemarkOptions: [
    { code: 'LOAN_WARN', value: '贷后一级预警' },
    { code: 'WITHDRAWAL_RULE_REJECT', value: '支用规则被拒' },
    { code: 'CONTROLLER_UNBIND', value: '实控人解绑' },
    { code: 'PERSON_OPERATE', value: '人工处理' },
    { code: 'LEGALPERSON_UNBIND', value: '法人解绑' },
    { code: 'AUDIT_RULE_REJECT', value: '授权规则被拒' },
    { code: 'CONTROLLER_SPOUSE_UNBIND', value: '实控人配偶解绑' }
  ],
  operateFrozeTypeOptions: [
    { code: '1', value: '系统自动' },
    { code: '2', value: '人工操作' }
  ],
  blackListStatusOptions: [
    { code: '0', value: '否' },
    { code: '1', value: '是' }
  ],
  applyUnfrozeOptions: [
    { code: '0', value: '否' },
    { code: '1', value: '是' }
  ],
  operateForzeStatusOptions: [
    { code: '1', value: '待处理' },
    { code: '2', value: '待审批' },
    { code: '3', value: '驳回待处理' }
  ],
  creditSignStatusOptions: [
    { code: '1', value: '未签约' },
    { code: '2', value: '已签约' }
  ],
  creditResultStatusOptions: [
    { code: '1', value: '授信中' },
    { code: '2', value: '授信成功' },
    { code: '3', value: '授信失败' },
    { code: '4', value: '授信过期' }
  ],
  signRoleTypeOptions: [
    { code: 'funding', value: '金融机构' },
    { code: 'manager', value: '经办人' },
    { code: 'corporate', value: '法定代表人' },
    { code: 'corporate_controller_spouse', value: '实际控制人配偶' },
    { code: 'company', value: '企业' },
    { code: 'corporate_controller', value: '实际控制人' }
  ],
  companyStatusOptions: [
    { code: '1', value: '白名单过期' },
    { code: '2', value: '意向客户' },
    { code: '3', value: '已申请授信' },
    { code: '4', value: '已出额，待银行批复' },
    { code: '5', value: '银行批复通过' },
    { code: '6', value: '银行批复不通过' },
    { code: '7', value: '额度失效' },
    { code: '8', value: '过期不可支用' },
    { code: '9', value: '签约完成' },
    { code: '10', value: '支用规则不通过' },
    { code: '11', value: '支用规则通过，待银行审批' },
    { code: '12', value: '银行支用审批通过' },
    { code: '13', value: '银行支用审批不通过' },
    { code: '14', value: '完成借据合同签约' },
    { code: '15', value: '已放款，还款计划待更新' },
    { code: '16', value: '已放款，还款计划已更新' }
  ],
  withdrawalStateOptions: [
    { code: '0', value: '支用申请提交' },
    { code: '1', value: '支用规则通过，待银行审批' },
    { code: '2', value: '银行支用审批通过' },
    { code: '3', value: '完成借款借据合同签约' },
    { code: '4', value: '已放款，还款计划待更新' },
    { code: '5', value: '已放款，还款计划已更新' },
    { code: '6', value: '已结清' },
    { code: '-1', value: '支用规则不通过' },
    { code: '-2', value: '银行支用审批不通过' },
    { code: '-3', value: '过期不可支用' }
  ],
  guaranteeTypeOptions: [
    { code: 'cc_spouse', value: '实际控制人及配偶连带保证' },
    { code: 'corporate_controller', value: '实际控制人连带保证' }
  ],
  authResultOptions: [
    { code: 'Y', value: '通过' },
    { code: 'N', value: '未通过' },
    { code: '0', value: '无' }
  ],
  flowTypeOptions: [
    { code: '1', value: '上浮' },
    { code: '2', value: '下浮' }
  ],
  adjustEnum: { 0: '有效', 1: '已冻结', 2: '已过期' },
  amountStatus: null,
  authRecordType: { Y: '通过', N: '未通过' },
  authStatus: { 0: '未认证', 1: '已认证', 2: '认证失败' },
  authType: {
    share_code_id_validator: '邀请码实名信息认证',
    three_factor_authenticate: '运营商三要素认证',
    corporate_volitional_authenticate: '法人意愿认证',
    face_authenticate: '人脸认证',
    corporate_authenticate: '法人认证',
    company_authenticate: '企业认证',
    corporate_controller_authenticate: '实控人认证'
  },
  billStatus: { 0: '待缴费', 1: '正常结清', 2: '部分缴清', 3: '逾期', 4: '部分逾期', 5: '逾期缴清', 6: '未出账单', 7: '已缴费' },
  creditApplyApprovalStatus: null,
  creditApplyStatus: {
    1: '已申请授信',
    2: '已出额，待银行批复',
    3: '银行批复通过',
    5: '签约完成',
    6: '已支用',
    7: '已结清',
    '-2': '银行批复不通过',
    '-3': '额度失效',
    '-4': '过期不可支用'
  },
  customerStatus: { 0: '认证成功', 1: '认证失败', 2: '未认证' },
  excelImportSource: { 1: '核心企业组织架构', 2: '核心企业业务员', 3: '核心企业业务员的融资客户', 4: '服务费缴费信息', 5: '白名单联系人信息' },
  financingWillingnessStatus: { 0: '融资中', 1: '已融资结束' },
  hasLoanEnum: { 0: '否', 1: '是' },
  messageStatus: { 0: '未读', 1: '已读', 2: '发送失败' },
  roleStatus: { 0: '启用', 1: '等待接受', 2: '已解除' },
  roleType: { manager: '经办人', corporate: '法定代表人', corporate_controller_spouse: '实际控制人配偶', corporate_controller: '实际控制人' },
  signStatus: { 0: '未签署', 1: '有效', 2: '已过期', 3: '有效已变更' },
  userRoleEnum: { 1: '管理员', 2: '业务员' },
  userStatus: { 0: '启用', 1: '关闭', 2: '未激活' },
  whiteListStatus: { 0: '白名单', 1: '白名单过期' },
  withdrawalStatus: { 0: '否', 1: '是' },
  orderAuditStatus: { 0: '已提交OA审批', 1: '审批完成', 2: '待批准状态' },
  loanReceiptStatus: { 0: '已申请', 1: '审批通过', 2: '已放款', 3: '已还清', '-1': '审批不通过', '-2': '放款失败' },
  companyAuthStatus: { 0: '未认证', 1: '已认证', 2: '认证失败' },
  operateAuthAcceptStatus: { 0: '否', 1: '是' },
  contractType: {
    CORPORATE_CONTROLLER_AUTHORIZE: '实控人授权书',
    CORPORATE_CONTROLLER_GUARANTEE: '实控人保证合同',
    CORPORATE_CONTROLLER_SPOUSE_GUARANTEE: '实控人配偶保证合同',
    PLATFORM_SERVICE_FEE_AGREEMENT: '平台服务费协议',
    PERSONAL_CREDIT_AUTHORIZATION: '个人征信查询授权书',
    MANAGER_AUTHORIZE: '经办人授权书',
    LOAN_CONTRACT: '借款合同',
    CREDIT_AUTHORIZATION: '企业征信授权查询书'
  },
  operateRoleType: {
    funding: '金融机构',
    manager: '经办人',
    corporate: '法定代表人',
    corporate_controller_spouse: '实际控制人配偶',
    company: '企业',
    corporate_controller: '实际控制人'
  },
  userRoleInvitationStatus: { 0: '未使用', 1: '已使用', 2: '已过期' },
  operateWarnStatus: { 1: '融资权限冻结', 2: '不处理', 4: '待人工处理' },
  operateWarnEnum: { 1: '待处理', 2: '待审批', 3: '驳回待处理', 5: '审批结束' },
  operateWarnLevelEnum: { 1: '一级', 2: '二级', 3: '三级', 4: '正常' },
  companyWithdrawalStatus: { 0: '开启', 1: '关闭' },
  frozeStatus: { 0: '未冻结', 1: '已冻结' },
  frozeRemark: {
    LOAN_WARN: '贷后一级预警',
    WITHDRAWAL_RULE_REJECT: '支用规则被拒',
    CONTROLLER_UNBIND: '实控人解绑',
    PERSON_OPERATE: '人工处理',
    LEGALPERSON_UNBIND: '法人解绑',
    AUDIT_RULE_REJECT: '授权规则被拒',
    CONTROLLER_SPOUSE_UNBIND: '实控人配偶解绑'
  },
  operateFrozeType: { 1: '系统自动', 2: '人工操作' },
  blackListStatus: { 0: '否', 1: '是' },
  applyUnfroze: { 0: '否', 1: '是' },
  operateForzeStatus: { 1: '待处理', 2: '待审批', 3: '驳回待处理' },
  creditSignStatus: { 1: '未签约', 2: '已签约' },
  creditResultStatus: { 1: '授信中', 2: '授信成功', 3: '授信失败', 4: '授信过期' },
  signRoleType: {
    funding: '金融机构',
    manager: '经办人',
    corporate: '法定代表人',
    corporate_controller_spouse: '实际控制人配偶',
    company: '企业',
    corporate_controller: '实际控制人'
  },
  companyStatus: {
    1: '白名单过期',
    2: '意向客户',
    3: '已申请授信',
    4: '已出额，待银行批复',
    5: '银行批复通过',
    6: '银行批复不通过',
    7: '额度失效',
    8: '过期不可支用',
    9: '签约完成',
    10: '支用规则不通过',
    11: '支用规则通过，待银行审批',
    12: '银行支用审批通过',
    13: '银行支用审批不通过',
    14: '完成借据合同签约',
    15: '已放款，还款计划待更新',
    16: '已放款，还款计划已更新'
  },
  withdrawalState: {
    0: '支用申请提交',
    1: '支用规则通过，待银行审批',
    2: '银行支用审批通过',
    3: '完成借款借据合同签约',
    4: '已放款，还款计划待更新',
    5: '已放款，还款计划已更新',
    6: '已结清',
    '-1': '支用规则不通过',
    '-2': '银行支用审批不通过',
    '-3': '过期不可支用'
  },
  guaranteeType: { cc_spouse: '实际控制人及配偶连带保证', corporate_controller: '实际控制人连带保证' },
  flowType: { 1: '上浮', 2: '下浮' }
}
