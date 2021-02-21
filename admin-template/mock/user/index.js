const { menu } = require('./menu.js')

// POST入参：const { xxx } = config.body
// GET入参：const { xxx } = config.query
module.exports = [
    // 获取图形验证码
    {
        url: '/api/login/img-verify-code',
        type: 'get',
        response: _config => {
            return {
                isOk: true,
                code: 200,
                message: '/api/login/img-verify-code',
                data: {
                    imgBase64:
                        'data:image/png;base64,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',
                    imgId: 'b1b3f84d-f705-4459-819a-fa184f31305b'
                }
            }
        }
    },

    // 登录
    {
        url: '/api/login/login',
        type: 'post',
        response: _config => {
            // mobileNo: "18600793025"
            // password: "YWExMjMxMjM="
            // verifyCode: "1234"
            // verifyCodeId: "b1b3f84d-f705-4459-819a-fa184f31305b"
            return {
                isOk: true,
                code: 200,
                message: '成功',
                data: 'SUZQQzpMT0dJTl9UT0tFTl8xODYwMDc5MzAyNWZjMzhhOTBkYjRlZjRlMzBiN2IwMzgwMTQyMzY1MWY0MjAyMDEyMTQxMDAwNDAyMjE='
            }
        }
    },

    // 获取用户信息
    {
        url: '/api/operate-role',
        type: 'get',
        response: _ => {
            return {
                isOk: true,
                code: 200,
                message: '成功',
                data: {
                    status: '0',
                    createTime: null,
                    lastUpdTime: null,
                    loginTime: '2020-12-07T14:27:56.283+0800',
                    resourcesListTreeList: menu,
                    currentUserDTO: {
                        id: 38,
                        mobileNo: '18600793025',
                        userName: '罗权限',
                        password: null,
                        status: 0,
                        currentRoleId: null,
                        loginTime: '2020-12-07 14:27:56',
                        token: 'IFPC:LOGIN_TOKEN_1860079302507201ea98ddc4d1191123106602c637020201207142756942',
                        resourcesList: null
                    },
                    roleId: 1
                }
            }
        }
    },
    // 退出
    {
        url: '/api/login/logout',
        type: 'post',
        response: _config => {
            return {
                code: 200,
                message: '退出成功mock'
            }
        }
    },

    // 表格数据
    {
        url: '/api/whiteList/list',
        type: 'get',
        response: _config => {
            return {
                code: 200,
                data: {
                    current: 1,
                    records: [
                        {
                            createTime: '2020-11-05 17:27:31',
                            id: 407,
                            mobileNo: '18310290760',
                            realName: '罗十',
                            creditCode: '110101198307010072',
                            status: 0,
                            applySum: 1000,
                            statusName: '认证成功'
                        },
                        {
                            createTime: '2020-07-07 17:27:31',
                            id: 406,
                            mobileNo: '18310290760',
                            realName: '罗十一',
                            creditCode: '110101198307010072',
                            status: 0,
                            applySum: 20000,
                            statusName: '认证成功'
                        },
                        {
                            createTime: '2020-09-07 17:27:31',
                            id: 405,
                            mobileNo: '18310290760',
                            realName: '罗十五',
                            creditCode: '110101198307010072',
                            status: 2,
                            applySum: 10000,
                            statusName: '认证失败'
                        },
                        {
                            createTime: '2020-10-07 17:27:31',
                            id: 404,
                            mobileNo: '18310290760',
                            realName: '罗十三',
                            creditCode: '110101198307010072',
                            status: 1,
                            applySum: 200,
                            statusName: '未认证'
                        },
                        {
                            createTime: '2020-12-02 17:27:31',
                            id: 403,
                            mobileNo: '18310290760',
                            realName: '罗十人',
                            creditCode: '110101198307010072',
                            status: 1,
                            applySum: 20,
                            statusName: '未认证'
                        }
                    ],
                    size: 10,
                    total: 35
                },
                isOk: true,
                message: '成功'
            }
        }
    },

    // 图片浏览
    {
        url: '/api/fileCommon/downloadFileByObsKey',
        type: 'get',
        response: _config => {
            return {
                isOk: true,
                code: 200,
                message: '成功',
                data:
                    'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=994221d4a58b87d65017a31937380400/a5c27d1ed21b0ef4318b0bbbd9c451da80cb3ef7.jpg'
            }
        }
    },

    // 详情示例
    {
        url: '/api/user',
        type: 'get',
        response: _config => {
            return {
                isOk: true,
                code: 200,
                message: '成功',
                data: {
                    realName: '陈翠云',
                    mobileNo: '18811020646',
                    idNo: '110101198307010072',
                    cardFacadeFile:
                        'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=994221d4a58b87d65017a31937380400/a5c27d1ed21b0ef4318b0bbbd9c451da80cb3ef7.jpg',
                    cardFacadeFileObsKey: 'sit/e4e145239ece4969adaec6ff43fb5729.jpg',
                    cardBackFile:
                        'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=994221d4a58b87d65017a31937380400/a5c27d1ed21b0ef4318b0bbbd9c451da80cb3ef7.jpg',
                    cardBackFileObsKey: 'sit/d29cb09759894977a304d7eb569ba56e.jpg',
                    status: 0,
                    identityStatus: null,
                    identityStatusName: null,
                    threeStatus: 'Y',
                    threeStatusName: '通过',
                    threeMessage: null,
                    faceStatus: 'Y',
                    faceStatusName: '通过',
                    file:
                        'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=994221d4a58b87d65017a31937380400/a5c27d1ed21b0ef4318b0bbbd9c451da80cb3ef7.jpg',
                    fileObsKey: 'sit/0cb28bce9e5e4171bb8d5da01ab50431.jpg',
                    faceMessage: null,
                    faceTime: '2020-12-08 10:00:20',
                    createTime: '2020-12-08 09:47:21',
                    companyAuthOutDTOList: [
                        {
                            companyId: 250,
                            creditCode: '91611105MA71249777',
                            companyName: '陕西化繁云数据科技有限公司',
                            companyFile:
                                'https://gss0.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=994221d4a58b87d65017a31937380400/a5c27d1ed21b0ef4318b0bbbd9c451da80cb3ef7.jpg',
                            companyFileObsKey: 'sit/3f767359cf0643059a0ee5ae7687fe2e.jpg',
                            companyStatus: 1,
                            companyStatusName: '已认证',
                            companyAuthDetailOutDTOList: [
                                {
                                    roleType: 'corporate',
                                    roleTypeName: '法定代表人',
                                    status: 0,
                                    statusName: '未认证',
                                    authenticationTime: '2020-12-08 10:05:30'
                                },
                                {
                                    roleType: 'corporate_controller',
                                    roleTypeName: '实际控制人',
                                    status: 0,
                                    statusName: '未认证',
                                    authenticationTime: '2020-12-08 10:06:03'
                                },
                                {
                                    roleType: 'manager',
                                    roleTypeName: '经办人',
                                    status: 0,
                                    statusName: '未认证',
                                    authenticationTime: '2020-12-08 10:06:10'
                                }
                            ],
                            handleDate: null
                        }
                    ]
                }
            }
        }
    },

    // Enum 字典
    {
        url: '/api/enum/enum',
        type: 'get',
        response: _config => {
            return {
                isOk: true,
                code: 200,
                message: '成功',
                data: {
                    adjustEnum: {
                        '0': '有效',
                        '1': '已冻结',
                        '2': '已过期'
                    },
                    amountStatus: null,
                    authRecordType: {
                        Y: '通过',
                        N: '未通过'
                    },
                    authStatus: {
                        '0': '未认证',
                        '1': '已认证',
                        '2': '认证失败'
                    },
                    authType: {
                        share_code_id_validator: '邀请码实名信息认证',
                        three_factor_authenticate: '运营商三要素认证',
                        corporate_volitional_authenticate: '法人意愿认证',
                        face_authenticate: '人脸认证',
                        corporate_authenticate: '法人认证',
                        company_authenticate: '企业认证',
                        corporate_controller_authenticate: '实控人认证'
                    },
                    billStatus: {
                        '0': '待缴费',
                        '1': '正常缴清',
                        '2': '部分缴清',
                        '3': '逾期',
                        '4': '部分逾期',
                        '5': '逾期缴清',
                        '6': '未出账单',
                        '7': '已缴费'
                    },
                    creditApplyApprovalStatus: null,
                    creditApplyStatus: {
                        '-2': '银行批复不通过',
                        '1': '已申请授信',
                        '-3': '额度失效',
                        '2': '已出额，待银行批复',
                        '-4': '过期不可支用',
                        '3': '银行批复通过',
                        '5': '签约完成',
                        '6': '已支用',
                        '7': '已结清'
                    },
                    customerStatus: {
                        '0': '认证成功',
                        '1': '认证失败',
                        '2': '未认证'
                    },
                    excelImportSource: {
                        '1': '核心企业组织架构',
                        '2': '核心企业业务员',
                        '3': '核心企业业务员的融资客户',
                        '4': '服务费缴费信息',
                        '5': '白名单联系人信息'
                    },
                    financingWillingnessStatus: {
                        '0': '融资中',
                        '1': '已融资结束'
                    },
                    hasLoanEnum: {
                        '0': '否',
                        '1': '是'
                    },
                    messageStatus: {
                        '0': '未读',
                        '1': '已读',
                        '2': '发送失败'
                    },
                    roleStatus: {
                        '0': '启用',
                        '1': '等待接受',
                        '2': '已解除'
                    },
                    roleType: {
                        manager: '经办人',
                        corporate: '法定代表人',
                        corporate_controller_spouse: '实际控制人配偶',
                        corporate_controller: '实际控制人'
                    },
                    signStatus: {
                        '0': '未签署',
                        '1': '有效',
                        '2': '已过期',
                        '3': '有效已变更'
                    },
                    userRoleEnum: {
                        '1': '管理员',
                        '2': '业务员'
                    },
                    userStatus: {
                        '0': '启用',
                        '1': '关闭',
                        '2': '未激活'
                    },
                    whiteListStatus: {
                        '0': '白名单',
                        '1': '白名单过期'
                    },
                    withdrawalStatus: {
                        '0': '否',
                        '1': '是'
                    },
                    orderAuditStatus: {
                        '0': '已提交OA审批',
                        '1': '审批完成',
                        '2': '待批准状态'
                    },
                    loanReceiptStatus: {
                        '-1': '审批不通过',
                        '0': '已申请',
                        '-2': '放款失败',
                        '1': '审批通过',
                        '2': '已放款',
                        '3': '已还清'
                    },
                    companyAuthStatus: {
                        '0': '未认证',
                        '1': '已认证',
                        '2': '认证失败'
                    },
                    operateAuthAcceptStatus: {
                        '0': '否',
                        '1': '是'
                    },
                    contractType: {
                        CORPORATE_CONTROLLER_AUTHORIZE: '业务授权协议-对实控人',
                        CORPORATE_CONTROLLER_GUARANTEE: '声明与保证',
                        CORPORATE_CONTROLLER_SPOUSE_GUARANTEE: '实控人配偶保证合同',
                        PLATFORM_SERVICE_FEE_AGREEMENT: '平台服务合同',
                        PERSONAL_CREDIT_AUTHORIZATION: '个人征信与数据信息处理授权书',
                        MANAGER_AUTHORIZE: '业务授权协议-对经办人',
                        LOAN_CONTRACT: '声明与保证',
                        CREDIT_AUTHORIZATION: '企业征信与数据处理授权书'
                    },
                    operateRoleType: {
                        funding: '金融机构',
                        manager: '经办人',
                        corporate: '法定代表人',
                        corporate_controller_spouse: '实际控制人配偶',
                        company: '企业',
                        corporate_controller: '实际控制人'
                    },
                    userRoleInvitationStatus: {
                        '0': '未使用',
                        '1': '已使用',
                        '2': '已过期'
                    },
                    operateWarnStatus: {
                        '1': '融资权限冻结',
                        '2': '不处理',
                        '4': '待人工处理'
                    },
                    operateWarnEnum: {
                        '1': '待处理',
                        '2': '待审批',
                        '3': '驳回待处理',
                        '5': '审批结束'
                    },
                    operateWarnLevelEnum: {
                        '1': '一级',
                        '2': '二级',
                        '3': '三级',
                        '4': '正常'
                    },
                    companyWithdrawalStatus: {
                        '0': '开启',
                        '1': '关闭'
                    },
                    frozeStatus: {
                        '0': '未冻结',
                        '1': '已冻结'
                    },
                    frozeRemark: {
                        LOAN_WARN: '贷后一级预警',
                        WITHDRAWAL_RULE_REJECT: '支用规则被拒',
                        CONTROLLER_UNBIND: '实控人解绑',
                        PERSON_OPERATE: '人工处理',
                        LEGALPERSON_UNBIND: '法人解绑',
                        AUDIT_RULE_REJECT: '授权规则被拒',
                        CONTROLLER_SPOUSE_UNBIND: '实控人配偶解绑'
                    },
                    operateFrozeType: {
                        '1': '系统自动',
                        '2': '人工操作'
                    },
                    blackListStatus: {
                        '0': '否',
                        '1': '是'
                    },
                    applyUnfroze: {
                        '0': '否',
                        '1': '是'
                    },
                    operateForzeStatus: {
                        '1': '待处理',
                        '2': '待审批',
                        '3': '驳回待处理'
                    },
                    creditSignStatus: {
                        '1': '未签约',
                        '2': '已签约'
                    },
                    creditResultStatus: {
                        '1': '授信中',
                        '2': '授信成功',
                        '3': '授信失败',
                        '4': '授信过期'
                    },
                    signRoleType: {
                        funding: '金融机构',
                        manager: '经办人',
                        corporate: '法定代表人',
                        corporate_controller_spouse: '实际控制人配偶',
                        company: '企业',
                        corporate_controller: '实际控制人'
                    },
                    companyStatus: {
                        '1': '白名单过期',
                        '2': '意向客户',
                        '3': '已申请授信',
                        '4': '已出额，待银行批复',
                        '5': '银行批复通过',
                        '6': '银行批复不通过',
                        '7': '额度失效',
                        '8': '过期不可支用',
                        '9': '签约完成',
                        '10': '支用规则不通过',
                        '11': '支用规则通过，待银行审批',
                        '12': '银行支用审批通过',
                        '13': '银行支用审批不通过',
                        '14': '完成借据合同签约',
                        '15': '已放款，还款计划待更新',
                        '16': '已放款，还款计划已更新'
                    },
                    withdrawalState: {
                        '-1': '支用规则未通过',
                        '-2': '银行支用审批未通过',
                        '1': '支用规则通过，待银行审批',
                        '-3': '过期不可支用',
                        '2': '银行支用审批通过',
                        '3': '完成借款借据合同签约',
                        '4': '已放款',
                        '5': '已放款，还款计划已更新',
                        '6': '已结清'
                    },
                    guaranteeType: {
                        cc_spouse: '实际控制人及配偶连带保证',
                        corporate_controller: '实际控制人连带保证'
                    },
                    loanWithdrawalStatus: {
                        '3': '完成借款借据合同签约',
                        '4': '已放款',
                        '5': '已放款，还款计划已更新'
                    },
                    moneyType: {
                        principal: '本金',
                        penalty_interest: '罚息',
                        interest: '利息'
                    },
                    flowType: {
                        '1': '上浮',
                        '2': '下浮'
                    }
                }
            }
        }
    },

    // 穿梭框 mock数据
    {
        url: '/api/mock/Transfer',
        type: 'get',
        response: _config => {
            return {
                isOk: true,
                status: 200,
                code: '',
                message: '成功',
                data: [
                    {
                        id: 114,
                        ownerId: 'C526175427283267584',
                        ownerName: '蛋白',
                        ownerRole: '3',
                        ownerRole$FICDictName: '担保人',
                        oneLevelType: 'unmovable',
                        oneLevelType$FICDictName: '不动产抵押',
                        twoLevelType: 'house',
                        twoLevelType$FICDictName: '房产',
                        threeLevelType: 'live_house',
                        threeLevelType$FICDictName: '居住房产',
                        fourLevelType: 'normal_house',
                        fourLevelType$FICDictName: '普通住宅',
                        fourLevelTypeOther: null,
                        warrantNo: '12',
                        address: '14,1403,140302',
                        addressName: '山西省阳泉市城区',
                        detailAddress: '山西',
                        area: '12',
                        identifyValue: '12',
                        identifyOrgan: '12',
                        identifiedValue: null,
                        hasLease: 'Y',
                        hasLease$FICDictName: '是',
                        leaseTermStart: '2020-12-29 00:00:00',
                        leaseTermEnd: '2021-01-19 00:00:00',
                        rent: '1212',
                        otherCertificateNo: '12',
                        buyTime: null,
                        buyPrice: null,
                        number: null,
                        quality: null,
                        unitPrice: null,
                        contractingStart: null,
                        contractingEnd: null,
                        annualRent: null,
                        treeSpecies: null,
                        treeAge: null,
                        status: null,
                        createBy: '143',
                        createTime: null,
                        updatedBy: '143',
                        updatedTime: null,
                        majorGuarantee: null,
                        approveRiskValue: null,
                        pledgeType: '0'
                    }
                ]
            }
        }
    },

    // 可编辑表格数据
    {
        url: '/api/editTable/list',
        type: 'get',
        response: _config => {
            return {
                code: 200,
                data: {
                    current: 1,
                    records: [
                        {
                            typeA: 'power',
                            typeAOther: '',
                            typeB: '123',
                            typeC: '罗十',
                            typeD: ['unmovable', 'house'],
                            typeE: '2020-12-12',
                            typeF: '11:00',
                            typeG: '',
                            typeH: ''
                        },
                        {
                            typeA: '99',
                            typeAOther: '其他',
                            typeB: '123',
                            typeC: '罗十',
                            typeD: ['movable', 'equipment'],
                            typeE: '2020-12-12',
                            typeF: '11:00',
                            typeG: '',
                            typeH: ''
                        }
                    ],
                    size: 10,
                    total: 35
                },
                isOk: true,
                message: '成功'
            }
        }
    }
]
