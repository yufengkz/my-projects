<!-- 登录、注册、忘记密码的主内容区 -->
<template>
    <div class="wrapper-bg">
        <HeadersNav />
        <div class="wrapper">
            <el-row class="wrapper-content">
                <el-col :xs="24" :sm="24" :md="14">
                    <ContentLeft />
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" class="flexible">
                    <div class="wrapper-right">
                        <div class="wrapper-title">{{ contentTitle }}</div>
                        <slot name="content"></slot>
                    </div>
                </el-col>
            </el-row>
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    name: 'ContentWrapper',
    components: {
        HeadersNav: () => import('./HeadersNav.vue'),
        ContentLeft: () => import('./ContentLeft.vue'),
        Footer: () => import('./Footer.vue')
    },
    data() {
        return {}
    },
    props: {
        contentTitle: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped lang="scss">
.wrapper-bg {
    background-image: url('~@/assets/login-background.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    min-height: 100vh;
    height: 100%;
}
.wrapper {
    width: 100%;
    min-height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
}
.wrapper-content {
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.wrapper-right {
    width: 380px;
    background: #fff;
    padding: 0 42px;
    box-shadow: 0px 18px 36px -2px rgba(20, 64, 145, 0.66);
    border-radius: 6px;
    .wrapper-title {
        font-size: 30px;
        color: #2475f7;
        line-height: 60px;
        font-weight: bold;
        padding-top: 20px;
        margin-bottom: 20px;
    }
}

@media screen and (max-width: 992px) {
    .wrapper {
        z-index: 1;
        .wrapper-content {
            top: 40px;
            display: block;
            margin: 20px auto;
            .wrapper-right {
                max-width: 320px;
                padding: 0 20px;
                .wrapper-title {
                    font-size: 18px;
                    line-height: 20px;
                }
            }
            .flexible {
                margin-top: 30px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>
