# web-signature-management 身份认证及电子签章平台用运管系统

## 使用
```
$ git clone http://192.168.4.22:2270/fecode/vue-element-base.git
$ cd vue-element-base
$ git checkout -b trunk origin/trunk

# 安装依赖
$ npm install

# 可以直接使用cnpm安装，可能出现eslint报错问题
$ cnpm install

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
代码提交时必须做相应描述，开发阶段和联调阶段以本次提交实现的功能为主。测试阶段可以以JIRA的内容为主。
##### 按钮宽度
wide-button样式设置宽按钮
##### el-select统一添加clearable属性

## 版本历史
* [Tags](http://gitlab.fic/fecode/vue-element-base/tags)

* [Changelog](http://gitlab.fic/fecode/vue-element-base/blob/trunk/changelog.md)

## 开发人员
* 刘东阁
* 闫文波
* 张亚辉
* 范康康
