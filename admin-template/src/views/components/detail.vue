<!-- 融资企业注册用户详情-->
<template>
    <div class="app-container registered-enterprise-detail">
        <div>
            <span class="detail-module-title">{{ customerInfo.realName }}</span>
            <!-- 0：成功，1：失败，2：未认证 -->
            <span>
                <el-tag type="success" class="el-icon-check m-l-20">实名认证成功</el-tag>
            </span>
        </div>
        <el-divider></el-divider>
        <!-- 身份信息 -->
        <span class="detail-module-title m-t-30">身份信息</span>
        <el-row class="m-t-30">
            <el-col :span="12">
                <DescriptionList class="m-l-20" :col="24">
                    <Description label="身份证号">{{ customerInfo.idNo }}</Description>
                    <Description label="手机号">
                        <template slot="content">
                            {{ customerInfo.mobileNo }}
                            <el-tag v-if="customerInfo.threeStatus === 'Y'" type="success" class="el-icon-check m-l-15" size="mini">
                                运营商三要素验证
                            </el-tag>
                            <el-tag v-else type="danger" class="el-icon-close m-l-15" size="mini">运营商三要素验证</el-tag>
                        </template>
                    </Description>
                    <Description label="注册时间">{{ customerInfo.createTime }}</Description>
                </DescriptionList>
            </el-col>
            <el-col :span="12">
                <ImageUploadDetail v-show="idCardFileList && idCardFileList.length > 0" :fileList="idCardFileList"></ImageUploadDetail>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- 人脸识别 -->
        <span class="detail-module-title m-t-30">人脸识别</span>
        <el-row class="m-t-30" v-if="customerInfo.faceTime">
            <el-col :span="12">
                <DescriptionList class="m-l-20" :col="24">
                    <Description label="人脸识别结果">
                        <template slot="content">
                            {{ customerInfo.faceStatusName }}
                            <el-tag v-if="customerInfo.faceStatus === 'Y'" type="success" class="el-icon-check m-l-15" size="mini">
                                人脸识别校验
                            </el-tag>
                            <el-tag v-else type="danger" class="el-icon-close m-l-15" size="mini">人脸识别校验</el-tag>
                        </template>
                    </Description>
                    <Description label="人脸识别时间">{{ customerInfo.faceTime }}</Description>
                </DescriptionList>
            </el-col>
            <el-col :span="12">
                <ImageUploadDetail
                    v-show="faceAuthFileList && faceAuthFileList.length > 0"
                    :fileList="faceAuthFileList"
                ></ImageUploadDetail>
            </el-col>
        </el-row>
        <el-row class="m-t-30" v-else>
            <el-col>
                <DescriptionList class="m-l-20" :col="24">
                    <Description label="人脸识别">无</Description>
                </DescriptionList>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <!-- 所属企业 -->
        <span class="detail-module-title m-t-30">所属企业</span>
        <div v-if="enterpriseList && enterpriseList.length > 0">
            <el-row class="m-t-30" v-for="(item, index) in enterpriseList" :key="index">
                <el-col :span="24">
                    <DescriptionList class="m-l-20" :col="24">
                        <Description label="所属企业">
                            <template slot="content">
                                <el-button size="mini" type="text" @click="goToHandle(item)">{{ item.companyName }}</el-button>
                                <el-tag v-if="item.companyStatus === 1" type="success" class="el-icon-check m-l-15" size="mini">
                                    企业认证
                                </el-tag>
                                <el-tag v-else type="danger" class="el-icon-close m-l-15" size="mini">企业认证</el-tag>
                            </template>
                        </Description>
                    </DescriptionList>
                </el-col>
                <el-col :span="12">
                    <DescriptionList class="m-l-20" :col="24">
                        <Description v-for="(val, key) in item.companyAuthDetailOutDTOList" :key="key" :label="val.label">
                            <template slot="content">
                                {{ val.value }}
                                <el-tag v-if="val.label === '角色'" type="success" class="el-icon-check m-l-15" size="mini">
                                    身份信息认证
                                </el-tag>
                            </template>
                        </Description>
                        <Description label="最近一次贷后信息">{{ item.handleDate }}</Description>
                    </DescriptionList>
                </el-col>
                <el-col :span="12">
                    <ImageUploadDetail
                        v-show="item.companyFileObsKey"
                        :fileList="[{ fileKey: item.companyFileObsKey, fileUrl: item.companyFile }]"
                    ></ImageUploadDetail>
                </el-col>
            </el-row>
        </div>
        <el-row class="m-t-30" v-else>
            <el-col>
                <DescriptionList class="m-l-20" :col="24">
                    <Description label="所属企业">无</Description>
                </DescriptionList>
            </el-col>
        </el-row>
        <span class="detail-module-title m-t-30">ShowMore表格</span>
        <show-more :showHeight="200" :watchData="billData">
            <div class="m-t-20">
                <el-table :data="billData" border size="mini">
                    <el-table-column type="index" label="序号" width="50"></el-table-column>
                    <el-table-column prop="createTime" label="日期"></el-table-column>
                    <el-table-column prop="id" label="金融产品"></el-table-column>
                    <el-table-column label="姓名">
                        <template slot-scope="scope">{{ scope.row.realName }}</template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template slot-scope="scope">{{ scope.row.mobileNo }}</template>
                    </el-table-column>
                    <el-table-column label="身份证号">
                        <template slot-scope="scope">{{ scope.row.creditCode }}</template>
                    </el-table-column>
                </el-table>
            </div>
        </show-more>
    </div>
</template>
<script>
import { getDetail } from '@/api/registered'
import { getWhiteList } from '@/api/white-list'

export default {
    components: {
        DescriptionList: () => import('@/components/DescriptionList/index.js'),
        ImageUploadDetail: () => import('@/components/ImageUpload/Detail'),
        ShowMore: () => import('@/components/ShowMore')
    },
    name: 'EnterpriseUserDetail',
    data() {
        return {
            customerInfo: {},
            enterpriseList: [],
            idCardFileList: [], // 身份信息图片数组
            faceAuthFileList: [], // 人脸识别图片数组
            billData: []
        }
    },
    created() {
        this.getInfo()
    },
    mounted() {},
    methods: {
        // 获取信息
        getInfo() {
            // 列表
            getWhiteList({ current: 1, size: 10 }).then(res => {
                if (res.code === 200) {
                    this.billData = res.data.records
                } else {
                    this.$message.error('查询出错')
                    this.billData = []
                }
            })
            getDetail(250).then(res => {
                if (res.code === 200) {
                    this.customerInfo = res.data || {}
                    this.enterpriseList =
                        (res.data.companyAuthOutDTOList &&
                            res.data.companyAuthOutDTOList.map(item => {
                                const roleList = []
                                item.companyAuthDetailOutDTOList.forEach(role => {
                                    roleList.push(
                                        {
                                            label: '角色',
                                            value: role.roleTypeName
                                        },
                                        {
                                            label: '接受角色时间',
                                            value: role.authenticationTime
                                        }
                                    )
                                })
                                return Object.assign({}, item, { companyAuthDetailOutDTOList: roleList })
                            })) ||
                        []
                    // 清空身份信息图片数组并赋值
                    this.idCardFileList.splice(1, this.idCardFileList.length)
                    if (res.data.cardFacadeFileObsKey) {
                        this.idCardFileList.push({
                            fileUrl: res.data.cardFacadeFile,
                            fileKey: res.data.cardFacadeFileObsKey
                        })
                    }
                    if (res.data.cardBackFileObsKey) {
                        this.idCardFileList.push({
                            fileUrl: res.data.cardBackFile,
                            fileKey: res.data.cardBackFileObsKey
                        })
                    }
                    // 清空人脸识别图片数组并赋值
                    this.faceAuthFileList.splice(1, this.faceAuthFileList.length)
                    if (res.data.fileObsKey) {
                        this.faceAuthFileList.push({
                            fileUrl: res.data.file,
                            fileKey: res.data.fileObsKey
                        })
                    }
                } else {
                    this.$message.error(res.message || '查询失败，请稍后重试')
                }
            })
        },
        // 所属机构跳转
        goToHandle(row) {
            this.$router.push({ path: `/business/enterprise/detail?id=${row.companyId}&code=${row.creditCode}` })
        }
    }
}
</script>
<style lang="scss" scoped>
.registered-enterprise-detail {
    /deep/ .el-icon-check:before {
        padding-right: 4px;
    }
    /deep/ .el-icon-close:before {
        padding-right: 4px;
    }
}
</style>
