### 介绍

将表格查询常用的功能进行了整合封装，能高效完成常规业务开发

### API

#### 表格属性

_表格除以下属性外，可以自定义属性_

| 参数        | 说明                             | 类型                     | 默认值  |
| ----------- | -------------------------------- | ------------------------ | ------- |
| columns     | 表头数据,详见字段属性说明          | `Array<Object>`          | `[]`    |
| dataSource  | 表格数据,详见字段属性说明          | `Array<Object>`          | `[]`    |
| options     | 单选框复选框序号，详见字段说明      | `Object`                | `{}`     |
| exportBut   | 导出等的button，详见下方描述       | `Array`                 | `[]`     |
| operates    | 操作框里 编辑删除，详见下方描述     | `Array`                 | `[]`     |
| slotcontent | 自定义操作按钮                     | `Boolean`               | `false`  |
| loading     | Element-UI的v-loading指令         | `Boolean`               | `false`  |
| border      | 表格边框                          | `Boolean`               | `false`  |


| pagination  | 分页配置项, 详见字段说明          | `Object`                 | `{}`    |
| dataTotal   | 分页后数据总条数                 | `Number`                 | `0`     |
| current     | 分页后当前页码                   | `Number`                 | `1`     |


#### 表格事件

_表格除了以下事件外，可以使用 element ui 表格组件的其他所有事件_
| 事件名 | 说明 | 参数
-|-|-
| handleSelectionChange | 复选框选中项，参考elementui 表格的 @selection-change | `value`
| handleChangePage      | 分页触发事件，参考elementui 的 @current-change       | `value`
| handleChangePageSize  | 分页页码事件，参考elementui 的@size-change           | `value`
| handlePrevPage        | 参考elementui 分页的@prev-click                     |  -
| handleNextPage        | 参考elementui分页的@next-click                      | -

##### operates type []

列表操作列对象描述，使用用法：

| 参数     | 说明                                                                     | 类型                    | 默认值 | 必填项 |
| -------- | ------------------------------------------------------------------------ | ----------------------- | ------ | ------ |
| label    | 列文本显示                                                               | String                  | -      | 否     |
| type     | [button 按钮类型](https://element.eleme.cn/2.8/#/zh-CN/component/button) | String                  | text   | 否     |
| icon     | [按钮 icon 图标](https://element.eleme.cn/2.8/#/zh-CN/component/icon)    | String                  | -      | 否     |
| plain    | 是否朴素按钮                                                             | Boolean                 | false  | 否     |
| isShow   | 依据状态是否显示，第一个参数当前行数据，第二个参数当前行索引             | Function(row, index) {} | -      | 否     |
| disabled | 是否禁用状态                                                             | Function(row, index) {} | -      | 否     |
| method   | event 事件                                                               | Function(row, index) {} | -      | 否     |


###### exportBut type[]

列表导出等对象操作描述，使用用法：

| 参数   | 说明         | 类型          | 默认值 | 必填项 |
| ------ | ------------ | ------------- | ------ | ------ |
| title  | 按钮文本显示 | String        | -      | 是     |
| href   | 下载链接     | String        | -      | 否     |
| method | event 事件   | Function() {} | -      | 否     |


##### tableSearch type []

列表搜索条件对象描述，同 FormItem API 相同，同理在 props 中填写。使用用法：

| 参数         | 说明                                   | 类型              | 默认值   | 必填项 |
| ------------ | -------------------------------------- | ----------------- | -------- | ------ |
| label        | 表单 label 名称                        | String            | -        | 是     |
| value        | 表单名称对应的 key                     | String            | -        | 是     |
| type         | 表单类型(可选：select/picker/cascader) | String            | input    | 否     |
| inputType    | input type: number                     | String            | 'number' | 否     |
| maxlength    | 最大输入的长度                         | 'string' 'number' | -        | 否     |
| rulesLength  | 输入文本校验长度控制                   | Boolean           | -        | 否     |
| children     | 展示有子选项值 type:select             | Array\[]          | -        | 否     |
| props        | 任意表单的属性扩展                     | Object            | -        | 否     |
| rules        | 是否添加搜索条件的校验                 | Object            | -        | 否     |
| handleSearch | 数据验证成功后回调事件                 | Function(e:Event) | -        | 否     |

