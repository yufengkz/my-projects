# map-web-business

> 农业小贷展业系统

## 使用

```
$ git clone http://192.168.4.22:2270/agricultural-finance/web-business.git
$ cd web-business
$ git checkout -b trunk origin/trunk

# 如果本机已配置私服可直接安装
$ npm install

# 使用私服安装命令
$ npm install --registry=http://npm.fic/repository/npm-group/

# 如果出现node-sass安装异常，使用安装命令
$ npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/ --registry=http://npm.fic/repository/npm-group/

# 启动
npm start
OR
npm run dev

# 打包-开发及测试环境
npm run build:sit

# 打包-准生产及生产环境
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

#### 部分开发规则

##### git

* 代码提交时必须做相应描述，开发阶段和联调阶段以本次提交实现的功能为主。测试阶段可以以JIRA的内容为主。

##### 无用代码删除

##### 按钮宽度

wide-button样式设置宽按钮

##### el-select统一添加clearable属性

## 版本历史

<!-- * [Tags](http://gitlab.fic/fecode/business-finance-management/tags)

* [Changelog](http://gitlab.fic/fecode/business-finance-management/blob/trunk/changelog.md) -->

## 开发人员

#### 账号密码

测试环境地址：http://10.145.5.25:32036/loan-apply

17100000000    abc123456

13800000003    abc123456

18100000000    abc123456

13910000001    abc123456

13111000003    abc123456
