#### 工程目录

```
web-business
├─ .browserslistrc
├─ .editorconfig
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ README.md
├─ babel.config.js
├─ changelog.md
├─ docker   // 部署配置
│  ├─ dev
│  │  ├─ Dockerfile
│  │  └─ nginx.conf // 开发环境nginx配置、 暂时无用
│  └─ sit
│     ├─ Dockerfile
│     └─ nginx.conf // sit环境nginx配置
├─ jsconfig.json
├─ package.json
├─ postcss.config.js
├─ project.md   // 开发文档
├─ public
│  ├─ favicon.ico
│  └─ index.html
├─ sh.exe.stackdump
├─ sonar-project.properties // sonar配置文件
├─ src
│  ├─ App.vue   // 主视图
│  ├─ api   // 接口
│  │  ├─ business-common.js
│  │  ├─ common.js
│  │  ├─ cosigner-manage.js
│  │  ├─ dashboard.js
│  │  ├─ loan-apply-lilin.js
│  │  ├─ loan-apply.js
│  │  └─ login.js
│  ├─ assets    // 静态资源 图片
│  │  ├─ 404_images
│  │  │  ├─ 404.png
│  │  │  └─ 404_cloud.png
│  │  ├─ SinoCapital-bk.png
│  │  ├─ SinoCapital-logo.png
│  │  ├─ SinoCapital-logo@2x.png
│  │  ├─ SinoCapital.png
│  │  ├─ dashboard
│  │  │  ├─ apply_count.png
│  │  │  ├─ apply_money.png
│  │  │  ├─ background-no-shadow-bk.png
│  │  │  ├─ background-no-shadow.png
│  │  │  ├─ background.png
│  │  │  ├─ computer.png
│  │  │  ├─ receivable_count.png
│  │  │  └─ receivable_money.png
│  │  ├─ detail
│  │  │  ├─ examine.png
│  │  │  ├─ givup.png
│  │  │  ├─ manager.png
│  │  │  └─ notarize.png
│  │  ├─ errorPic.png
│  │  ├─ login-background-bk.jpg
│  │  ├─ login-background.jpg
│  │  ├─ login-left.png
│  │  ├─ pdf.jpeg
│  │  ├─ renlianshibie.jpg
│  │  ├─ shenfenzhengfanmian.png
│  │  ├─ shenfenzhengzhengmian.png
│  │  ├─ successForget.png
│  │  ├─ yingyezhizhao.jpg
│  │  ├─ zip.jpeg
│  │  └─ 暂无担保人.png
│  ├─ components    // 公共组件
│  │  ├─ ApproveReject.vue
│  │  ├─ BackToTop
│  │  │  ├─ BackToTop.vue
│  │  │  └─ index.js
│  │  ├─ Breadcrumb
│  │  │  └─ index.vue
│  │  ├─ BusinessDetail // 借款详情组件 非公共
│  │  │  ├─ BasicInfo.vue
│  │  │  ├─ CognizanceDialog.vue
│  │  │  ├─ CreditInfo.vue
│  │  │  ├─ GrowInfo.vue
│  │  │  ├─ ImageInfo.vue
│  │  │  └─ RiskInfo.vue
│  │  ├─ ChunkUploadDialog // 影像批量上传组件
│  │  │  ├─ Upload.vue
│  │  │  └─ index.vue
│  │  ├─ ChunkUploadExcelItem.vue
│  │  ├─ ChunkUploadItem.vue
│  │  ├─ CommonFooter.vue
│  │  ├─ CosignerConfirmationDialog.vue
│  │  ├─ CosignerDetailDialog.vue 详情页-右上角查看日志
│  │  ├─ CreditTypeChooseDialog.vue
│  │  ├─ DescriptionList
│  │  │  └─ index.vue
│  │  ├─ EmptyTemplate.vue
│  │  ├─ FamilyYearIncomeExpendDia.vue
│  │  ├─ Footer.vue
│  │  ├─ GrowInfoDialog.vue
│  │  ├─ GuarantorIncomeDialog.vue
│  │  ├─ GuarantorPossessionsDialog.vue
│  │  ├─ Hamburger
│  │  │  └─ index.vue
│  │  ├─ ImageInfoTabs // 影像标签返显组件
│  │  │  └─ index.vue
│  │  ├─ ImageMaterial.vue 影像标签返显组件
│  │  ├─ ImageUpload // 影像上传组件
│  │  │  ├─ Detail.vue
│  │  │  └─ index.vue
│  │  ├─ InvoiceSelectModal.vue
│  │  ├─ ItrusSign.vue
│  │  ├─ Layout
│  │  │  ├─ components
│  │  │  │  ├─ AppMain.vue
│  │  │  │  ├─ Navbar.vue
│  │  │  │  ├─ Sidebar
│  │  │  │  │  ├─ Item.vue
│  │  │  │  │  ├─ Link.vue
│  │  │  │  │  ├─ SidebarItem.vue
│  │  │  │  │  └─ index.vue
│  │  │  │  └─ index.js
│  │  │  ├─ index.vue
│  │  │  └─ mixin
│  │  │     └─ ResizeHandler.js
│  │  ├─ MortgageInfoDetailsDialog.vue
│  │  ├─ MortgageInfoDialog.vue
│  │  ├─ MortgageTypeChooseDialog.vue
│  │  ├─ PDFReader.vue
│  │  ├─ PledgeInfoDetailsDialog.vue
│  │  ├─ PledgeInfoDialog.vue
│  │  ├─ PledgeTypeChooseDialog.vue
│  │  ├─ ShowMore.vue
│  │  ├─ SvgIcon
│  │  │  └─ index.vue
│  │  ├─ TableEdit 列表组件
│  │  │  ├─ fields
│  │  │  │  └─ select.js
│  │  │  ├─ index.js
│  │  │  ├─ index.scss
│  │  │  └─ readme.md
│  │  ├─ Tables 列表-搜索组件和表格组件
│  │  │  ├─ Search.vue
│  │  │  └─ TableList.vue
│  │  ├─ Transfer.vue
│  │  ├─ TransferPledge.vue
│  │  ├─ UploadDialog
│  │  │  ├─ UploadItem.vue
│  │  │  └─ index.vue
│  │  ├─ VForm
│  │  │  └─ index.vue
│  │  ├─ demo.vue
│  │  ├─ familyIncomeExpendTabs.vue
│  │  ├─ familyIncomeTabs.vue
│  │  ├─ familyPropertyTabs.vue
│  │  └─ fileUpload.vue
│  ├─ directive // 指令
│  │  ├─ drag
│  │  │  └─ index.js
│  │  └─ index.js
│  ├─ icons // svg文件
│  │  ├─ index.js
│  │  └─ svg
│  │     ├─ add.svg
│  │     ├─ backtotop.svg
│  │        ...
│  │     └─ 返回箭头.svg
│  ├─ main.js  // 入口文件
│  ├─ mock
│  │  ├─ index.js
│  │  └─ mock.js
│  ├─ permission.js
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ getters.js
│  │  ├─ index.js
│  │  └─ modules
│  │     ├─ app.js
│  │     ├─ common.js
│  │     ├─ message.js
│  │     ├─ permission.js
│  │     ├─ route-info-new.js
│  │     ├─ route-info-server-approval.js
│  │     ├─ route-info-server-approval.json
│  │     ├─ route-info-server-business.js
│  │     ├─ route-info-server-business.json
│  │     ├─ route-permission.js
│  │     └─ user.js
│  ├─ styles
│  │  ├─ element-ui.scss
│  │  ├─ index.scss
│  │  ├─ mixin.scss
│  │  ├─ sidebar.scss
│  │  ├─ theme
│  │  │  ├─ fonts
│  │  │  │  ├─ element-icons.ttf
│  │  │  │  └─ element-icons.woff
│  │  │  └─ index.css
│  │  ├─ transition.scss
│  │  └─ variables.scss
│  ├─ utils
│  │  ├─ auth.js
│  │  ├─ collapse.js
│  │  ├─ fileUpload.js
│  │  ├─ filter.js
│  │  ├─ format.js
│  │  ├─ index.js
│  │  ├─ request.js
│  │  ├─ tool.js
│  │  └─ validate.js
│  └─ views
│     ├─ 404.vue
│     ├─ cosigner-manage
│     │  ├─ legal 法人担保
│     │  │  ├─ Add.vue 新建法人担保申请页面
│     │  │  ├─ Detail.vue 法人详情查看页面
│     │  │  ├─ components
│     │  │  │  ├─ AllList.vue 列表页面-全部列表 暂未用
│     │  │  │  ├─ ApproveReject.vue 
│     │  │  │  ├─ BacklogList.vue 列表页面-待审批列表
│     │  │  │  ├─ FinishedList.vue 列表-已完成列表
│     │  │  │  ├─ GuaranteeApproval.vue 新建页面-担保审批页面
│     │  │  │  ├─ GuarantorInfo.vue 详情页面-担保人信息
│     │  │  │  ├─ ImageMaterial.vue 详情页面-影像资料返显
│     │  │  │  ├─ ImageTab.vue 新建页面-影像资料上传与返显
│     │  │  │  ├─ LegalInfo.vue 新建页面-表单填写
│     │  │  │  └─ UnderwayList.vue 列表页面-已审批列表
│     │  │  └─ index.vue 列表页面 包含待审批、已审批、已完成
│     │  └─ natural
│     │     ├─ Add.vue
│     │     ├─ Detail.vue
│     │     ├─ components
│     │     │  ├─ AllList.vue
│     │     │  ├─ BacklogList.vue
│     │     │  ├─ FinishedList.vue
│     │     │  ├─ GuarantorApproval.vue
│     │     │  ├─ Step1Detail.vue
│     │     │  ├─ Step1Edit.vue
│     │     │  ├─ Step2.vue
│     │     │  ├─ Tab2
│     │     │  │  ├─ GuarantorInfo.vue
│     │     │  │  └─ RiskInfo.vue
│     │     │  └─ UnderwayList.vue
│     │     └─ index.vue
│     ├─ dashboard
│     │  ├─ components
│     │  │  ├─ BarChart.vue
│     │  │  ├─ Mock.js
│     │  │  ├─ PieChart.vue
│     │  │  └─ mixins
│     │  │     └─ resize.js
│     │  ├─ debtor
│     │  │  └─ index.vue
│     │  ├─ factoring
│     │  │  └─ index.vue
│     │  ├─ financier
│     │  │  └─ index.vue
│     │  └─ index.vue
│     ├─ loan-apply
│     │  ├─ Add.vue
│     │  ├─ Detail.vue
│     │  ├─ components
│     │  │  ├─ AllList.vue
│     │  │  ├─ ApprovalInformation.vue
│     │  │  ├─ BacklogList.vue
│     │  │  ├─ FinishedList.vue
│     │  │  ├─ Step1Detail.vue
│     │  │  ├─ Step1Edit.vue
│     │  │  ├─ Step2.vue
│     │  │  ├─ StepApproval.vue
│     │  │  ├─ TransferOrderDialog.vue
│     │  │  ├─ UnderwayList.vue
│     │  │  └─ step2
│     │  │     ├─ BasicInfo.vue
│     │  │     ├─ CreditInfo.vue
│     │  │     ├─ GrowInfo.vue
│     │  │     └─ ImageInfo.vue
│     │  └─ index.vue
│     ├─ login
│     │  ├─ ChangePwd.vue
│     │  ├─ ForgetPwd.vue
│     │  ├─ Register.vue
│     │  ├─ components
│     │  │  ├─ ContentLeft.vue
│     │  │  ├─ ContentWrapper.vue
│     │  │  ├─ Footer.vue
│     │  │  ├─ HeadersNav.vue
│     │  │  ├─ RegisterStepOne.vue
│     │  │  ├─ RegisterStepThree.vue
│     │  │  └─ RegisterStepTwo.vue
│     │  └─ index.vue
│     └─ redirect
│        └─ index.vue
└─ vue.config.js

```
#### 项目架构
* 底层架构基于订单贷系统改造，同于审批系统、运管平台。 后面计划整理出PC管理系统通用方案 FIC-admin
#### 技术栈
Vue + vue-router +  vuex + elementUI
#### 技术点
* 路由：实现了路由按需加载， 此系统并不需要动态路由
* 请求：axios的二次封装 （请求队列、白名单、请求超时时间、缓存、拦截器、统一处理请求响应、）/src/utils/request.js
* 视图：按模块划分，每个模块是单独的文件夹
* 全局状态管理：Vuex 划分module
* mock： 模拟接口数据
* 权限控制： permission.js
* 图片上传组件：大文件分片上传
* 样式： scss
#### 项目描述
* MAP金农展业平台 
* 核心功能： 借款申请准入信息填写、自然人担保管理、法人担保管理。 （其中借款申请tab可以看到所有借款单子并支持查看详情， 详情内容包括基本信息、借款人、共借人、担保人、风险预判信息、业务基本信息、增信信息、种植信息、影像信息）
* 借款申请列表根据单子状态划分为：代办、已办、已办结， 支持模糊搜索、操作、查看详情
* 自然人担保管理：
* 法人担保管理：代办、已办、已办结， 支持模糊搜索、操作、查看详情
    - 新建页面的返显是使用了详情接口返回的数据
    - 新建和更新使用的是一个接口，根据id值来判断新建操作还是更新操作
    - 代办列表的操作都是去处理，但是根据编号的流转状态决定跳转到新建页面或者详情页面
    - 查看详情中日志的样式和状态需要根据当前编号的流转状态和登录账号的角色显示不同的样式
#### 功能点
* 单文件上传
* 模版下载
* 批量上传
* 局部刷新


*** 展业平台较为复杂的逻辑都在信息完善模块（填写基本信息、种植信息、增信信息的逻辑） ***

#### 备注
* 导航烂固定的样式已存在，需要时添加class即可
* 枚举关系都是从接口取
* 图标用的是阿里iconfont
* 全局配置可以加在.env文件中
* 开发环境时刻关注sonar数据并修复
* 测试环境nginx配置在docker文件夹里

#### 遗留问题
* 表格导入、导出
* 两个人担保人的情况 展示顺序随机。 原因：两个接口 响应是异步的
* 编辑和详情可以优化 用一套代码
* components文件夹的公共组件是没有用到的。可删除

#### 可优化点
* component组件抽离
* 冗余代码清理
* 接口出参数据清洗
* 添加vuex subscribe，页面刷新store不丢失

#### 你需要了解的
* vue全家桶、webpack、scss、nginx、Jenkins、docker